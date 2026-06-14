# System States

Functional states for transitions, data availability, and error recovery.

## 1. Loading

Full-screen or section-level loading uses the **Breathe·Tidal** spinner.
- **Anatomy:** The Kluvs mark with a 4s box-breathing animation.
- **Rules:** Never spin the mark; only use the breathe-and-fade animation.
- **See also:** `docs/spinner-kluvs.md` for full platform implementation.

## 2. Error

Communicates failures and provides a recovery path.
- **Anatomy:** Red circle icon with exclamation mark + Error title + Helper text + "Try again" action.
- **Tokens:** `--kluvs-danger` for the icon and status signal.

## 3. Empty State

Page-level "nothing here" state, used when a collection (like a bookshelf) has no content.

| Property | Value |
|---|---|
| Heading | Italic EB Garamond 500, 28px |
| Body | 13px IBM Plex Sans, line-height 1.6, max-width 340px |
| Illustration | **Stacked Covers** — three tilted placeholder covers with hexagon hive fill. |

### Stacked Covers (md size)
- **Container:** 160×140px
- **Covers:** 80×114px (approx md scale)
- **Tilts:** -7° / 4° / 10°

---

## 4. Reading Progress (`.kluvs-progress-*`)

The **currently shipped** version (`ProgressRow`) used on cards and detail views.

| Property | Token | Value |
|---|---|---|
| Height | — | 4px |
| Track Color | `surface.warm-dark.card-2` | `#332B24` (dark) |
| Fill Color | `brand.primary` | Copper `#D16D30` |
| Action | — | small `.kluvs-btn-secondary` "Update" button |

### Web

```html
<div style="display:flex;align-items:center;gap:10px">
  <div class="kluvs-progress-track" style="flex:1">
    <div class="kluvs-progress-fill" style="width:47%"></div>
  </div>
  <button class="kluvs-btn-secondary kluvs-btn-secondary--sm">Update</button>
</div>
```
