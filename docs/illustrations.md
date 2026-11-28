# Illustrations

Spot illustrations for screens that would otherwise be empty: empty states, full-screen
errors, force update, and similar. They make a dead end feel intentional and on-brand.

Items marked **Open — exploring** are working rules, not final decisions. Follow them, but
expect them to change.

## Style: woodcut print

Every illustration looks like a **woodcut / linocut print**, in the spirit of
19th-century book frontispieces.

- Bold, carved shapes. Lines look hand-cut and slightly irregular, never machine-perfect.
- Wood grain, shading and depth come from **carved parallel lines**, never from gradients,
  noise, or soft shadows.
- Flat color only: every area is exactly one of the colors below. No tints, no blending,
  no paper texture, no vignette.
- **Subjects:** wooden objects from a reading life: shelves, presses, desks, lecterns,
  crates, lamps, books. One clear subject per illustration.
- **Mood:** calm and crafted. Quiet or slightly melancholic is fine; never comic, never
  alarming.

## Palette

An illustration is printed in five fixed colors, and the **same image is used on both
surfaces**: cream wood with dark carved lines reads as a print on a dark page in dark mode,
and as the same print on a cream page in light mode. Nothing is recolored, inverted or
swapped per surface.

| Color | Token | Used for |
|---|---|---|
| Background | `color.warm-dark.base` | The generation background. Outside the subject it becomes transparent; inside it stays as the carved lines and a thin outline |
| Ink | `color.foreground-warm.primary` | All primary shapes (the wood) |
| Soft ink | `color.foreground-warm.tertiary` | Depth only: shadows, inner faces, background objects, secondary grain |
| Accent | `color.brand.secondary` | The focal detail (see below). Optional |

Because the carved lines and outline are the dark page color, an illustration must sit
directly on the screen background (the `background` role in `docs/colors.md`), never on a
card or bar: on a lighter dark surface the outline shows as a dark ring.

Copper (`accent`) and blue-teal (`tertiary`) are **never** used in illustrations. Copper
belongs to the screen's CTA (one per view), and blue-teal is too dim on dark surfaces.

### The accent marks the focal point — Open — exploring

Each illustration has one focal detail that tells the screen's story (the book being
re-bound on force update, the single book on an empty shelf). The accent goes **only** on
that detail, at small scale.

- One focal detail per illustration, so the accent appears in one place.
- The accent is not decoration. Don't use it on plants, borders or background objects
  unless that object *is* the focal detail.
- On error screens, the accent goes on the hopeful or next-step element, never on the
  broken thing: `secondary` reads as success in the rest of the UI.
- An illustration may have no accent at all.

## Hexagons

The hexagon of the Kluvs mark appears in every illustration as a **hidden detail**: a
hexagonal nut, a hexagon carved into a panel, a knot in the grain. Two or three small
instances, noticeable once you know, invisible if you don't. Never a hex grid or a
hexagon-shaped frame.

## What never appears

- People, faces, hands or animals.
- Text, letters, numbers, logos or the wordmark. Clients set all copy as real text.
- Frames, borders, or a background fill.
- Gradients, blur, glow, drop shadows, photographic texture.
- Emoji or emoji-like icons.

## Format and layout

- **File:** one PNG per illustration, square, text-free, with a transparent background
  outside the subject. Exported at `component.illustration.export-size` from the generated
  image, with every color snapped to the tokens above. Clients show it as a plain image on
  both surfaces, with no tinting.
- **Safe zone:** the subject stays within the centered square defined by
  `component.illustration.safe-zone`, so clients can scale it down or crop slightly without
  cutting into the drawing.
- **Size on screen:** `component.illustration.size`.
- **Layout:** illustration on top; heading, body and action **below** it, centered, separated
  by `component.illustration.gap`. Text never overlaps the illustration.
- **Location:** `assets/illustrations/<name>.png`. The generated image it was exported from
  is kept, as downloaded, in `assets/illustrations/source/<name>.<png|jpg>`, so it can be
  re-exported.

## Catalog

One illustration per screen. "Something went wrong" and 404 share one.

| Name | Screen | Concept | Focal detail (accent) | Export |
|---|---|---|---|---|
| `force-update` | Force update | A wooden bookbinding press with a book clamped in it: a new edition is being bound | The book's spine and ribbon | default |
| `empty-clubs` | No clubs yet | A round wooden table with four empty chairs tucked in and one closed book at its center, waiting for a group to sit down | The book | default |
| `empty-shelf` | No books on the shelf | A long plank shelf between two carved scroll brackets, bare from end to end, with only a loose ribbon bookmark lying across it: room for the first book | The ribbon bookmark | default |
| `empty-discussions` | No upcoming discussions | A carved wooden hourglass stand whose sand has all run out into a small mound, the upper bulb empty: waiting to be turned over for the next one | The sand | default |
| `empty-members` | No other members yet | A carved wooden key rack with a row of empty hooks and a single old key hanging from the first one: one member so far, room for more | The key | default |
| `error` | Something went wrong / 404 | A bookshelf knocked over by a library ladder, books spilled across the floor: something fell, and the ladder is how it gets put back | The ladder | `--loose-strokes` |
| `connection-error` | Full-screen load failure with no connection | Open — exploring | | |

The offline state is a bar (`docs/states.md`), not an illustrated screen.

Until a screen has its illustration, it keeps the **Fragmented Hex Grid** layout from
`docs/states.md`. The hex grid is phased out as illustrations replace it.

## Generating an illustration

Illustrations are generated **at design time** from this repo and committed as assets.
Clients only consume the committed PNGs; nothing is generated at runtime.

`/illustration-create <name>` runs these steps with the `illustrations` MCP server
(`ai-tooling/mcp-illustrations`).

1. **Three concepts.** Generate one image for each of three different concepts for the
   screen, all in the locked style below. Pick one.
2. **Three renders (optional).** Generate three renders of the chosen concept and pick the
   best.
3. **Export** with `scripts/export-illustration.py <source> <name>`: it snaps every pixel to
   the palette, makes the background outside the subject transparent (keeping the carved
   lines and a thin outline), writes `assets/illustrations/<name>.png`, and writes a preview
   of it on both surfaces to `temp/illustrations/<name>/preview.html`. Check the preview.
   The script needs Pillow and NumPy, kept in a virtualenv at `temp/illustrations/.venv`
   (`/illustration-create` creates it on first run). To create it by hand, from the KLUVS
   folder: `python3 -m venv temp/illustrations/.venv && temp/illustrations/.venv/bin/pip install pillow numpy`.
4. **Commit** the PNG and its source image, and add the concept to the catalog above.

By default the export treats background showing through dense strokes as part of the
subject, which keeps carved grain intact. A scene with a hatched floor or other loose strokes
around the subject needs `--loose-strokes` instead, or those gaps print as dark blocks on the
light surface: it makes them transparent and prints the loose strokes in soft ink. Don't use
it on heavily carved subjects, whose grain would fall apart. Record the export setting in the
catalog so a re-export reproduces the same PNG.

### Locked style prompt

Every generation starts with this block. Only the scene changes.

```
A woodcut / linocut print illustration, in the style of 19th-century book
frontispieces. Bold carved shapes, wood grain expressed as carved parallel lines,
lines feel hand-cut and slightly irregular. No shading gradients, no texture
noise, no photorealism. Completely flat colors, strictly limited palette, every
pixel is one of the listed colors exactly.

Scene: <one wooden subject and its focal detail>. Hide two or three small
hexagons as carved details. Centered composition with generous empty margin
around the subject. No people, no hands, no animals, no text, no letters, no
logos, no frame or border.

Palette:
- Background: solid flat #140F0D, edge to edge
- Main ink: #F2EDE5 (all primary shapes and carved lines)
- Second ink: #8C8073 (depth only: shadows, inner faces, secondary grain)
- Accent: #48A480, used ONLY on <the focal detail>, small area

Square 1:1 image.
```

The hex values in the prompt are the palette tokens above. Keep them in sync with
`tokens.json`.
