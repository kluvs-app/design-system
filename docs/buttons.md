# Buttons

Action triggers used throughout the app. Kluvs uses a hierarchy of action weights to keep the interface quiet and focused.

## Action Hierarchy

### 1. Primary (`.btn-primary`)
The single most important action on a screen. High-contrast copper fill.
- **Rules:** Only one primary CTA per view (exception: Login/SignUp pairs).
- **Style:** Copper `#D16D30` fill, white text, 12px radius.

### 2. Secondary / Outlined (`.kluvs-btn-secondary`)
Supporting actions or secondary options.
- **Style:** Outlined copper (active) or grey (muted), 12px radius.

### 3. Ghost / Text (`.btn-ghost`)
Low-emphasis actions like "Forgot password?" or "Cancel."
- **Style:** No container, copper or grey text.

### 4. Social / OAuth (`.btn-social`)
Fixed brand-branded buttons for authentication.
- **Providers:** Discord (`#5865F2`), Google (`#F2F2F2` / `#1F1F1F`), Apple (`#0F0F0F`).

---

## Pill Button (`.kluvs-btn-pill`)

Tiny rounded-full outlined chip for compact inline actions (e.g., "Copy Club ID"). Supports a transient "success" state.

| Property | Token | Value |
|---|---|---|
| Radius | `radius.pill` | `9999px` |
| Font | — | 11px, 500 weight, 0.04em tracking |
| Default | — | grey border / grey text |
| Success | — | green border / green text |

---

## Segmented Control (`.kluvs-segmented`)

Pill-shaped multi-option toggle.

### Filled variant (Track-By)
Used for Page / Percent toggles. Active segment fills with brand primary.

### Status-icon variant (RSVP)
Used for attendance (Yes / Maybe / No). Icon-only segments tinted by status.

| Segment | Active Background | Active Color |
|---|---|---|
| Yes   | `--kluvs-success-subtle` | `--kluvs-success` |
| Maybe | `--kluvs-warm-dark-card-2` | `--kluvs-warm-fg-primary` |
| No    | `--kluvs-danger-subtle` | `--kluvs-danger` |

## Web Snippets

```html
<!-- Primary -->
<button class="btn-primary">Continue</button>

<!-- Pill -->
<button class="kluvs-btn-pill">Copy ID</button>

<!-- Segmented -->
<div class="kluvs-segmented">
  <button class="kluvs-segmented__option kluvs-segmented__option--active">Page</button>
  <button class="kluvs-segmented__option">Percent</button>
</div>
```
