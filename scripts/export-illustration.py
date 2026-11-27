"""Export a generated woodcut draft as the committed illustration PNG.

Usage:
    python3 scripts/export-illustration.py <source image> <name>

Writes assets/illustrations/<name>.png (see docs/illustrations.md § Format and layout):
  1. Snaps every pixel to the nearest palette color.
  2. Keeps background-colored pixels inside the subject (the carved lines and a thin
     outline) and makes the background outside the subject transparent.
  3. Downsamples to component.illustration.export-size and stores it as a small
     indexed PNG.

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


def token(tokens, path):
    node = tokens
    for key in path.split("."):
        node = node[key]
    return node["$value"]


def rgb(hex_value):
    h = hex_value.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src, name = sys.argv[1], sys.argv[2]

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
    subject = subject.filter(ImageFilter.MaxFilter(odd(CLOSE))).filter(ImageFilter.MinFilter(odd(CLOSE)))
    subject = subject.filter(ImageFilter.MaxFilter(odd(OUTLINE)))
    inside = np.asarray(subject) > 0

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
