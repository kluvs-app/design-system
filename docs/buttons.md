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

## Button sizes

Every button is **40 high** on every platform (the Material 3 container height), with a **48 touch target**: the visible button stays 40 and the extra tappable area is invisible. On web the 48 applies on touch screens only (`@media (pointer: coarse)`); with a mouse the visible size is the click target. Values live in `tokens.json` under `component.button.*`.

| Button | Visible size | Radius | Side padding | Touch target |
|---|---|---|---|---|
| Primary, Secondary, Outlined | 40 high | 12 | 24 | 48 |
| Text / Ghost | 40 high | — | 12 | 48 |
| Social | 40 high, icon 20 | 12 | — | 48 |
| Icon-only | 24 icon | — | — | 48 |
| Outlined icon | 40 × 40, icon 20 | 12 | — | 48 |

Outlined borders are 1px. Social buttons keep the provider's fixed colors and logo, which the provider's own guidelines require.

---

## Pills

Two independent components, not two states of one — both fully rounded, but distinct in
behavior: `TriggerPill` fires a one-shot action, `TogglePill` holds persistent on/off state.

### Trigger (`TriggerPill` / `.kluvs-btn-pill`)

Tiny rounded-full outlined chip for compact one-shot actions (e.g., "Copy Club ID"). Supports
a transient "success" state that reverts on its own after a short delay.

| Property | Token | Value |
|---|---|---|
| Height | `component.button.pill.height` | `32` (Material chip), side padding 16 |
| Touch target | `component.button.pill.touch-target` | `48` |
| Radius | `radius.pill` | `9999px` |
| Font | `typography.fine-print` | Fine print family (12px) — matches mobile `TriggerPill` |
| Default | — | grey border / grey text |
| Success | — | green border / green text |

### Toggle (`TogglePill`)

Circular icon-only toggle for a persistent binary state (e.g., like/unlike a book). Copper
border/icon when active, grey otherwise. Not a member of the Segmented Control family below —
segmented controls pick one of several options; `TogglePill` is strictly on/off, one icon.

| Property | Value |
|---|---|
| Shape | circle, 36dp |
| Icon size | 16dp |
| Touch target | 48dp (the circle stays 36) |
| Default | grey border / grey icon |
| Active | copper border / copper icon |

---

## Segmented Control (`.kluvs-segmented`)

Pill-shaped multi-option toggle: a single container with a hairline divider between segments
(none before the first), never separate gapped buttons.

Sizes: the text variant is 34 high; the icon variant uses 28 × 28 segments. In both, every segment has a 48 invisible touch target (`component.segmented-control.touch-target`).

### Filled variant — Track-By (`ToggleControl`)
Used for Page / Percent toggles. Active segment fills with brand primary, `onPrimary` text.

### Status-icon variant — RSVP (`AttendanceControl`)
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
