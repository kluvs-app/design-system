# Book Cover

Standardized components for book representation across the Kluvs ecosystem.

## 1. Cover Slot (`.kluvs-book-cover`)

A strict 2:3 aspect ratio container for cover imagery.

| Size | Width | Height | Radius |
|---|---|---|---|
| `sm` | 56px  | 84px  | 4px (`radius.sm`) |
| `md` | 80px  | 120px | 4px (`radius.sm`) |
| `lg` | 128px | 192px | 4px (`radius.sm`) |

- **Default background:** `surface.warm-dark.bar` (`#1A140F`).
- **Shadow:** Optional `0 3px 8px rgba(0,0,0,0.35)`.

---

## 2. No-Cover Fallback (`.kluvs-cover-placeholder`)

The "hive" pattern used when no cover image is available. 

- **Pattern:** A mathematically precise, tessellating hexagon grid.
- **Implementation:** Use the inline SVG pattern defined in the design system to ensure perfect scaling.
- **Colors:** Strokes use `currentColor` (mapped to `card-2` on dark, `divider` on light).

```html
<div class="kluvs-book-cover kluvs-book-cover--md kluvs-cover-placeholder">
  <svg width="100%" height="100%">
    <defs>
      <pattern id="honeycomb" width="28" height="48.4974" patternUnits="userSpaceOnUse" viewBox="0 0 28 48.4974">
        <path d="M14 0 l14 8.0829 v16.1645 l-14 8.0829 l-14 -8.0829 v-16.1645 z M0 24.2487 l14 8.0829 v16.1645 l-14 8.0829 l-14 -8.0829 v-16.1645 z M28 24.2487 l14 8.0829 v16.1645 l-14 8.0829 l-14 -8.0829 v-16.1645 z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#honeycomb)" />
  </svg>
  <span class="kluvs-cover-placeholder__label">No cover</span>
</div>
```

---

## 3. Read Ribbon (`.kluvs-read-ribbon`)

A corner "bookmark" overlaid on a cover to mark it as read.

| Variant | Width | Height | Offset (`right`) |
|---|---|---|---|
| `sm` | 12px | 21px | 6px |
| `md` | 16px | 28px | 8px |
| `lg` | 24px | 42px | 12px |

- **Style:** Copper fill, notched bottom, `drop-shadow(0 2px 4px rgba(0,0,0,0.35))`.

---

## 4. Read Badge (`.kluvs-read-badge`)

A circular circular badge with the Kluvs hexagon glyph for list rows.
- **Size:** 36px diameter.
- **Style:** 1px copper border, copper hexagon icon.
