# Cards

The primary container for content and event summaries in the Kluvs interface.

## 1. Variants

### Standard Card
Used for list items and section details.
- **Dark Style:** `warm-dark-card` background, no border.
- **Light Style:** White background, subtle shadow (`0 1px 2px`), 1px grey border.
- **Radius:** 12px.

### Highlighted Card
Used for the "Next Discussion" or featured items.
- **Dark Style:** `warm-dark-accent` (`#382112`) background, 1.5px copper border.
- **Light Style:** Copper-tinted background, 1.5px copper border.

## 2. Typical Content Structure

| Layer | Style |
|---|---|
| Eyebrow | Eyebrow family (11px, uppercase, 0.14em) |
| Heading | Title M (card or list title; `feature` allowed) |
| Subtitle | Body M |
| Divider | 1px horizontal line, `card-2` on dark / `divider` on light |
| Meta | Fine print, muted |
