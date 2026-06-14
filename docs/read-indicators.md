# Kluvs Read Indicators — Developer Guide

Two presentational patterns mark a book/session as **read / finished**. Both are decoration only — no state, no behavior.

## 1. Read Ribbon

A diagonal corner banner overlaid on a book cover.

```
┌──────────────┐
│           ◢█◣ │  ← notched banner, top-right corner
│  cover art  █ │
│            ◣█◢│
└──────────────┘
```

| Property   | Token                          | Value |
|---|---|---|
| Background | `component.read-ribbon.background` → `--kluvs-primary` | `#D16D30` |
| Shape      | `component.read-ribbon.shape`  | `clip-path: polygon(18% 0, 82% 0, 82% 50%, 100% 75%, 82% 100%, 18% 100%, 0% 75%, 18% 50%)` |
| Shadow     | `component.read-ribbon.shadow` | `drop-shadow(0 2px 4px rgba(0,0,0,0.35))` |
| Position   | absolute, `top: 0` |

### Sizes

| Variant | Width | Height | Offset (`right`) | Use |
|---|---|---|---|---|
| `compact` | 20px | 35px | 8px  | Small/list-row covers |
| `full`    | 30px | 52px | 14px | Card/detail covers |

### Web

```html
<div class="relative">
  <img class="cover" src="..." />
  <span class="kluvs-read-ribbon kluvs-read-ribbon--full" title="Read" aria-label="Read"></span>
</div>
```

Both classes are defined in `colors_and_type.css`. The ribbon is `position: absolute`, so its container must be `position: relative`.

## 2. Read Badge

A standalone circular badge with the Kluvs hexagon glyph — used where a corner ribbon doesn't fit (compact rows, lists without a cover thumbnail).

| Property | Token | Value |
|---|---|---|
| Size      | `component.read-badge.size` | `36px` |
| Shape     | circle (`radius.pill`) |
| Border    | `component.read-badge.border` → `--kluvs-primary`, 1px |
| Icon      | `component.read-badge.icon-color` → `--kluvs-primary`, 16px hexagon |

### Web

```html
<span class="kluvs-read-badge" title="Read" aria-label="Read">
  <!-- 16x16 hexagon SVG, fill: currentColor -->
</span>
```

## Platform notes

- **Android (Compose):** ribbon as a custom-drawn `Canvas` path or rotated `Box` with `clip`; badge as `OutlinedIconButton`-style circle, non-interactive.
- **iOS (SwiftUI):** ribbon via a custom `Shape` using the same polygon proportions; badge as a `Circle().stroke(Color.kluvsPrimary)` with the hexagon glyph centered.

## When to use which

- **Ribbon** — book covers in grids/shelves where the cover is the primary visual (personal shelves, club shelf).
- **Badge** — list rows / compact layouts where a cover may be small or absent (reading history, session summaries).

Both are mutually exclusive per item — never show both on the same book.
