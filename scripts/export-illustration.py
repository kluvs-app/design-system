"""Export a generated woodcut draft as the committed illustration PNG.

Usage:
    python3 scripts/export-illustration.py [--loose-strokes] <source image> <name>

Writes assets/illustrations/<name>.png (see docs/illustrations.md § Format and layout):
  1. Snaps every pixel to the nearest palette color.
  2. Keeps background-colored pixels inside the subject (the carved lines and a thin
     outline) and makes the background outside the subject transparent.
  3. Downsamples to component.illustration.export-size and stores it as a small
     indexed PNG.

--loose-strokes is for scenes with a hatched floor or other loose strokes around the
subject. Thin strokes outside the solid subject are treated as lines rather than part of
it: the gaps between them become transparent and they print in soft ink (cream would
vanish on the light surface). The area spanned by the accent is always kept solid, so a
thin part of the focal object (a ladder's back rail) isn't mistaken for a loose stroke.
Don't use it on heavily carved subjects: the slivers between grain lines would count as
loose strokes too.

Needs Pillow and NumPy (`pip install pillow numpy`, ideally in a virtualenv).
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

REPO = Path(__file__).resolve().parent.parent

CLOSE = 15   # px at 1024: fills carved lines, leaves open areas (between posts...) as background
OUTLINE = 9  # px at 1024: width of the outline kept around the subject
THIN = 7     # px at 1024, --loose-strokes: strokes thinner than this are loose
HULL = 91    # px at 1024, --loose-strokes: closes the accent's parts into one protected area


def token(tokens, path):
    node = tokens
    for key in path.split("."):
        node = node[key]
    return node["$value"]


def rgb(hex_value):
    h = hex_value.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def main():
    args = sys.argv[1:]
    loose_strokes = "--loose-strokes" in args
    args = [a for a in args if a != "--loose-strokes"]
    if len(args) != 2:
        sys.exit(__doc__)
    src, name = args

    tokens = json.loads((REPO / "tokens.json").read_text())
    palette = [
        rgb(token(tokens, "color.warm-dark.base")),            # background
        rgb(token(tokens, "color.foreground-warm.primary")),   # ink
        rgb(token(tokens, "color.foreground-warm.tertiary")),  # soft ink
        rgb(token(tokens, "color.brand.secondary")),           # accent
    ]
    size = int(token(tokens, "component.illustration.export-size").removesuffix("px"))

    img = Image.open(src).convert("RGB")
    scale = img.width / 1024
    img = img.filter(ImageFilter.MedianFilter(3))
    px = np.asarray(img).astype(np.int32)
    cols = np.array(palette)
    idx = ((px[:, :, None, :] - cols[None, None, :, :]) ** 2).sum(-1).argmin(-1)

    background = idx == 0
    odd = lambda n: max(3, int(n * scale) | 1)
    subject = Image.fromarray(np.where(background, 0, 255).astype(np.uint8))
    if loose_strokes:
        fg = np.asarray(subject)
        solid = subject.filter(ImageFilter.MinFilter(odd(THIN))).filter(ImageFilter.MaxFilter(odd(THIN)))
        accent = Image.fromarray(np.where(idx == 3, 255, 0).astype(np.uint8))
        hull = accent.filter(ImageFilter.MaxFilter(odd(HULL))).filter(ImageFilter.MinFilter(odd(HULL)))
        subject = Image.fromarray(np.maximum(np.asarray(solid), np.asarray(hull) & fg))
    subject = subject.filter(ImageFilter.MaxFilter(odd(CLOSE))).filter(ImageFilter.MinFilter(odd(CLOSE)))
    subject = subject.filter(ImageFilter.MaxFilter(odd(OUTLINE)))
    inside = np.asarray(subject) > 0
    if loose_strokes:
        idx = np.where(~background & ~inside & (idx == 1), 2, idx)

    rgba = np.zeros((*idx.shape, 4), np.uint8)
    rgba[..., :3] = cols[idx]
    rgba[..., 3] = np.where(background & ~inside, 0, 255)

    im = Image.fromarray(rgba)
    # Premultiplied resize, so transparent pixels don't bleed their color into the edges.
    im = im.convert("RGBa").resize((size, size), Image.LANCZOS).convert("RGBA")
    im = im.quantize(colors=64, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)

    out = REPO / "assets" / "illustrations" / f"{name}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, optimize=True)
    print(f"{out.relative_to(REPO)}: {size}x{size}, {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
