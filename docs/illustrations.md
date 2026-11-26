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
- Flat color only: every area is exactly one of the three inks below. No tints, no blending,
  no paper texture, no vignette.
- **Subjects:** wooden objects from a reading life: shelves, presses, desks, lecterns,
  crates, lamps, books. One clear subject per illustration.
- **Mood:** calm and crafted. Quiet or slightly melancholic is fine; never comic, never
  alarming.

## Palette: paper and inks

The screen background is the **paper**: the illustration has no background of its own, and
the surface it sits on shows through. An illustration is **drawn** with three inks:

| Ink | Used for |
|---|---|
| Ink | All primary shapes (the wood) |
| Soft ink | Depth only: shadows, inner faces, background objects, secondary grain |
| Accent | The focal detail (see below). Optional |

The carved lines between the shapes, plus a thin outline around the subject, form a fourth
layer: the **cut**.

**One illustration serves both surfaces.** Light mode is not a negative of dark mode: it is
the same woodcut printed on cream paper. Each surface shows or hides layers and colors them
from existing color roles (`docs/colors.md`):

| Layer | Dark | Light |
|---|---|---|
| Ink | `labelVariant` | hidden (the paper shows through) |
| Cut | hidden (the paper shows through) | `labelVariant` |
| Soft ink | `contentMuted` | `contentMuted` |
| Accent | `secondary` | `secondary` |

So dark mode shows cream wood with the carved lines in the background color, and light mode
shows chocolate carved lines and outline on cream wood. Never generate or draw a separate
light version: swapping every color instead (cream wood → chocolate wood) produces a heavy
photo-negative and is not allowed.

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

- **File:** one SVG per illustration, square, text-free. It has exactly four top-level
  groups, `<g id="ink-soft">`, `<g id="ink">`, `<g id="cut">`, `<g id="accent">`, painted in
  that order. Each group sets its color with a plain `fill` attribute (no `<style>` block:
  Android's SVG importer ignores CSS), so clients apply the table above by changing four
  fills. The defaults are the dark-surface colors, with `cut` set to `fill="none"`.
- **Safe zone:** the subject stays within the centered square defined by
  `component.illustration.safe-zone`, so clients can scale it down or crop slightly without
  cutting into the drawing.
- **Size on screen:** `component.illustration.size`.
- **Layout:** illustration on top; heading, body and action **below** it, centered, separated
  by `component.illustration.gap`. Text never overlaps the illustration.
- **Location:** `assets/illustrations/<name>.svg`. The generated image it was traced from is
  kept, as downloaded, in `assets/illustrations/source/<name>.<png|jpg>`, so it can be
  re-traced.

## Catalog

One illustration per screen. "Something went wrong" and 404 share one.

| Name | Screen | Concept | Focal detail (accent) |
|---|---|---|---|
| `force-update` | Force update | A wooden bookbinding press with a book clamped in it: a new edition is being bound | The book's spine and ribbon |
| `empty-clubs` | No clubs yet | Open — exploring | |
| `empty-shelf` | No books on the shelf | Open — exploring | |
| `empty-discussions` | No upcoming discussions | Open — exploring | |
| `empty-members` | No other members yet | Open — exploring | |
| `error` | Something went wrong / 404 | Open — exploring | |
| `connection-error` | Full-screen load failure with no connection | Open — exploring | |

The offline state is a bar (`docs/states.md`), not an illustrated screen.

Until a screen has its illustration, it keeps the **Fragmented Hex Grid** layout from
`docs/states.md`. The hex grid is phased out as illustrations replace it.

## Generating an illustration

Illustrations are generated **at design time** from this repo and committed as assets.
Clients only consume the committed SVGs; nothing is generated at runtime.

1. **Three concepts.** Generate one image for each of three different concepts for the
   screen, all in the locked style below. Pick one.
2. **Three renders (optional).** Generate three renders of the chosen concept and pick the
   best.
3. **Trace.** Vectorize the chosen image into SVG and check it on both surfaces:
   - Snap every pixel to the nearest of the four dark-surface colors (paper and three inks)
     at the generated resolution.
   - Derive the cut layer from that full-resolution result: background-colored areas inside
     the subject, plus a thin outline around it.
   - Only then shrink each layer to half resolution (512 for a 1024 image) and trace it with
     integer coordinates, dropping specks of a few pixels. Shrinking before snapping erases
     the carved lines.
   - Aim for roughly 150 KB or less per SVG.
4. **Commit** the SVG and its source PNG, and add the concept to the catalog above.

Generate on the dark palette: dark is the product's default surface, and the light version
comes from the role swap, not from a second generation.

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

The hex values in the prompt are the dark-surface values of `labelVariant`, `contentMuted`
and `secondary`. Keep them in sync with `tokens.json`.
