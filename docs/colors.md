# Color Roles

`colors_and_type.css` and `tokens.json` define the raw color scale (warm-dark stack,
web-canonical stack, brand, status — see the README's token namespacing section). This doc
defines the **semantic role layer** on top of that scale: names for what a color *represents*
(card, bar, divider, muted text) rather than its raw value, so components ask for a role, not
a hex.

Do not read raw tokens directly from component code on any platform — always go through the
role layer below. This is what lets a component swap dark/light (or a future re-tint) without
touching call sites.

## Roles

| Role | Represents | Dark token | Light token |
|---|---|---|---|
| `background` | Page/screen background | `--kluvs-warm-dark-base` | `--kluvs-surface-light` |
| `bar` | Modal/dialog/sheet/app-bar chrome — one rung between background and card | `--kluvs-warm-dark-bar` | `--kluvs-surface-light-bar` |
| `card` | Standard raised surface — cards, inputs | `--kluvs-warm-dark-card` | `--kluvs-surface-light-raised` |
| `cardAlt` | Card-on-card / secondary raised surface | `--kluvs-warm-dark-card-2` | `--kluvs-surface-light-deep` |
| `divider` | Hairlines, borders, unfocused field outlines | `--kluvs-warm-dark-card-2` | `--kluvs-divider-light` |
| `content` | Primary body/label text on a surface | `--kluvs-content-dark-primary` | `--kluvs-content-light-primary` |
| `contentMuted` | Meta/supporting text (captions, unfocused labels) | `--kluvs-warm-fg-tertiary` | `--kluvs-content-light-tertiary` |
| `labelVariant` | Wordmark, avatar initials, role labels, input labels | `--kluvs-warm-fg-primary` | `--kluvs-content-light-label-variant`¹ |
| `placeholder` | Placeholder text | `--kluvs-warm-fg-placeholder` | `--kluvs-content-light-placeholder` |
| `disabled` | Disabled text/content | `--kluvs-warm-fg-disabled` | `--kluvs-content-light-disabled` |
| `accent` | Copper — primary CTA, active state (one per view) | `--kluvs-primary` | `--kluvs-primary` |
| `onAccent` | Text/icon on an `accent` surface | `--kluvs-on-primary` | `--kluvs-on-primary` |
| `secondary` | Success/"joined" accent | `--kluvs-secondary` | `--kluvs-secondary` |
| `tertiary` | Admin role / info accent | `--kluvs-tertiary` | `--kluvs-tertiary` |
| `danger` | Destructive actions, error state | `--kluvs-danger` | `--kluvs-danger` |
| `dangerSubtle` | Danger-tinted fill (destructive warning boxes) | `--kluvs-danger-subtle` | `--kluvs-danger-subtle` |
| `success` | Success state | `--kluvs-success` | `--kluvs-success` |
| `successSubtle` | Success-tinted fill (e.g. pressed "yes" RSVP) | `--kluvs-success-subtle` | `--kluvs-success-subtle` |

¹ Not yet a named CSS custom property — `colors_and_type.css` currently only defines this
inverse pairing in a comment (`--kluvs-warm-fg-primary`: "inverts to ... dark chocolate on
light surfaces"). Value is `#140F0D` (same as `--kluvs-warm-dark-base`). Should get a real
`--kluvs-content-light-label-variant` custom property next time this file is touched — flagged
here, not fixed as part of a docs-only pass.

`accent`/`onAccent`/`secondary`/`tertiary`/`danger`/`success` (and their subtle variants) don't
switch between dark/light — same brand/status values on both surfaces, per the BRAND and
STATUS blocks in `colors_and_type.css`.

## Platform implementations

- **Android** (`kluvs-mobile/designsystem/.../theme/KluvsColors.kt`): `KluvsColors` data class,
  `kluvsColorsDark`/`kluvsColorsLight` instances, exposed as `KluvsTheme.colors.<role>`. Ships
  as of `kluvs-mobile`'s Android `:designsystem` module (2026-07-23) — see the pending-
  propagation note in `CLAUDE.md`. M3's own `ColorScheme` (`MaterialTheme.colorScheme`) is kept
  only as a compat shim for stock M3 widgets that read it internally (Button, TextField,
  Scaffold) — new Kluvs component code should never read `colorScheme` directly.
- **Web**: not yet a discrete role layer — components read the raw `--kluvs-*` custom
  properties in this table's Dark/Light columns directly. Formalizing a web-side role
  abstraction (e.g. a Tailwind theme extension) is unstarted, tracked in `CLAUDE.md`'s
  pending-propagation section alongside the typography/button model.
- **iOS**: no theme object of any kind yet (`Colors.swift` is static color constants only) —
  out of scope until the iOS design-system phase begins.
