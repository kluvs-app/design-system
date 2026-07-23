# Buttons

Action triggers used throughout the app. Kluvs uses a hierarchy of action weights to keep the interface quiet and focused.

## Action Hierarchy

### 1. Primary (`PrimaryButton` / `.btn-primary`)
The single most important action on a screen. High-contrast copper fill.
- **Rules:** Only one primary CTA per view (exception: Login/SignUp pairs).
- **Style:** Copper `#D16D30` fill, white text, 12px radius.

### 2. Secondary / Outlined
Supporting actions or secondary options. Two independent components, not two states of one —
each usable on its own:
- **`SecondaryButton`** (`.kluvs-btn-secondary`) — outlined copper border/text. The "active"
  emphasis variant.
- **`OutlinedButton`** — outlined grey border/text. The "muted" variant. Distinct from the
  Ghost/Text role below, which has no container at all.
- **Style:** 12px radius on both.

### 3. Ghost / Text (`TextButton` / `.btn-ghost`)
Low-emphasis actions like "Forgot password?" or "Cancel."
- **Style:** No container. Copper or grey text, selected via an `emphasized` flag — `emphasized
  = true` for copper (e.g. "Forgot password?"), `false` (default) for grey (e.g. "Cancel").

### 4. Social / OAuth (`SocialButton` / `.btn-social`)
Fixed brand-branded buttons for authentication.
- **Providers:** Discord (`#5865F2`), Google (`#F2F2F2` / `#1F1F1F`), Apple (`#0F0F0F`).
- **Style:** 12px radius, brand fill is fixed regardless of light/dark theme.

### 5. Icon-only (`IconButton`)
A tappable icon with no container of its own — not a member of the filled/outlined/text
hierarchy above, just the icon made clickable, with a 48dp touch target and ripple.

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
