# Changelog

All notable changes to the Kluvs Design System are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html) — adapted for design systems:

| Bump | When |
|---|---|
| **MAJOR** | Breaking token renames, removed components, color value changes that affect rendered output |
| **MINOR** | New tokens, new components, new assets — backwards-compatible additions |
| **PATCH** | Documentation corrections, discrepancy fixes, non-visual tweaks |

---

## [Unreleased]

### Added — formalizing patterns from `kluvs-frontend`

`kluvs-frontend` has shipped ~30 PRs since v2.2.0. The following new patterns and discrepancies were audited and formalized:

- **`component.read-ribbon` / `component.read-badge`** in `tokens.json`, `.kluvs-read-ribbon`(`--compact`/`--full`) and `.kluvs-read-badge` classes in `colors_and_type.css`, plus `docs/read-indicators.md` and `preview/components-read-indicators.html` — covers the "read"/finished book indicators (`KluvsReadRibbon`, `KluvsReadBadge`) shipped in the frontend.
- **`component.button.secondary`** in `tokens.json` + `.kluvs-btn-secondary` (`--sm` modifier) in `colors_and_type.css` — documents the ghost/outlined secondary button pattern (frontend's `GhostButton`) alongside the existing primary button spec.
- **`--kluvs-role-admin-on-dark`** (`#7BA8B8`) and **`--kluvs-role-member-label`** (`#48A480`) — new role-label text colors. `--kluvs-role-admin` (`#006781`) fails AA as text on dark and should only be used for the badge/dot; admin label text and member label text needed their own tokens.
- **`color.status.success-subtle`** / `--kluvs-success-subtle` (`rgba(72,164,128,0.15)`) — success tint for pressed states (e.g. "yes" in a segmented RSVP control), mirroring the existing danger/primary subtle tokens.

### Propagated to `kluvs-frontend`

- `tailwind.config.js` — added `role.admin` (`#006781`), `role['admin-on-dark']` (`#7BA8B8`), `role['member-label']` (`#48A480`), matching the new DS role tokens. `success`/`danger` Tailwind colors already existed and now back the success/danger token aliases.
- `RoleEyebrow.tsx` — replaced hardcoded `#C9900A`/`#7BA8B8`/`#48A480`/`#006781` with `text-role-owner`/`text-role-admin-on-dark`/`text-role-member-label`/`bg-role-owner`/`bg-role-admin`.
- `AttendanceControl.tsx` — replaced raw `green-500`/`red-500`/`green-400`/`red-400` with `success`/`danger` (using Tailwind's `/opacity` modifier for the subtle tints, equivalent to `--kluvs-success-subtle`/`--kluvs-danger-subtle`).

### Added — second pass of composite patterns from `kluvs-frontend`

- **`docs/composite-components.md`** + **`preview/components-composite.html`** — formalizes six more shipped patterns:
  - **Avatar / Avatar Stack** (`component.avatar`, `component.avatar-stack`) — generated avatar (10-color hue palette, sizes sm–2xl) and the overlapping member-avatar row with `+N` overflow chip. `.kluvs-avatar`, `.kluvs-avatar-stack` in `colors_and_type.css`.
  - **Progress Bar** (`component.progress-bar`) — the *currently shipped* `ProgressRow` (4px fill bar + label row + secondary "Update" action). `.kluvs-progress-track` / `.kluvs-progress-fill`. Explicitly scoped to today's version — `preview/explore-reading-progress.html` redesign is still undecided.
  - **Pill Button** (`component.button.pill`) — tiny rounded-full outlined chip (e.g. "Copy Club ID") with a transient success state. `.kluvs-btn-pill` / `.kluvs-btn-pill--success`.
  - **Segmented Control** (`component.segmented-control`) — generalizes two shipped patterns: the filled Track-By (Page/Percent) toggle and the icon-only, status-tinted RSVP control. `.kluvs-segmented`, `.kluvs-segmented--icon`.
  - **Role Eyebrow** (`component.role-eyebrow`) — uppercase role label + optional dot, using the new role-label tokens from the previous entry. `.kluvs-role-eyebrow`. **Supersedes** the avatar-ring + corner-dot pattern in `preview/components-member-row.html`, which was never shipped.
  - **Empty States + Book Cover Placeholder** (`component.empty-state`, `component.book-cover-placeholder`) — page-level "nothing here" state (stacked tilted placeholder covers + italic heading + body + CTA) and the single-cover diagonal-stripe "no cover" fallback. `.kluvs-empty-covers`, `.kluvs-empty-heading`, `.kluvs-empty-body`, `.kluvs-cover-placeholder`.

### Known follow-ups

- **Avatar hue palette** (`ui/Avatar.tsx`, `AVATAR_HUES`) — still hardcoded inline in `kluvs-frontend`, now documented in `tokens.json` but not yet referenced from a shared source. Lower priority; revisit if other clients need generated-avatar parity.
- **`preview/components-member-row.html`** — documents the unshipped ring/corner-dot avatar role pattern; should be updated or replaced to reflect `component.role-eyebrow` in a future pass.
- **Reading progress row** (`ProgressRow.tsx`) — an in-progress exploration of richer progress treatments lives in `preview/explore-reading-progress.html` (untracked) — reconcile before specing `component.reading-progress` updates.
- **App navigation shell** (`AppSidebar.tsx` + `MobileTopBar.tsx`) — first real implementation of the Material Symbols icon system from `README.md`; worth a future icon-sourcing convention doc.
- **BookCover / CoverSlot** (`ui/BookCover.tsx`) — standardized 2:3 cover slot (56×84 / 80×120 / 128×192) — candidate for a future `component.book-cover` token group.

---

## [2.2.0] — 2026-05-26

Modal pattern — anatomy spec, new tokens, and preview card. Establishes the three-zone modal shell as a named, cross-platform design system pattern.

### Added
- **Modal anatomy spec** (`docs/modal.md`) — full developer guide covering container, Header, Body, Footer, optional DangerZone, warning boxes, behavior rules, and platform implementation notes for web (React/Tailwind), Android (M3), and iOS (SwiftUI).
- **`component.modal`** in `tokens.json` — named component token group with container, header, and footer sub-tokens; mirrors the existing `component.button` structure.
- **New color tokens** — warning-box tints for both copper and danger contexts:
  - `color.status.primary-subtle` / `--kluvs-primary-subtle` — `rgba(209,109,48,0.08)` copper tinted fill
  - `color.status.primary-border-soft` / `--kluvs-primary-border-soft` — `rgba(209,109,48,0.25)` copper soft border
  - `color.status.danger-subtle` / `--kluvs-danger-subtle` — `rgba(239,68,68,0.08)` danger tinted fill
  - `color.status.danger-border-soft` / `--kluvs-danger-border-soft` — `rgba(239,68,68,0.20)` danger soft border
- **New overlay tokens** — backdrop colors for modals and drawers:
  - `color.overlay.light` / `--kluvs-overlay-light` — `rgba(0,0,0,0.50)` light-surface backdrop
  - `color.overlay.dark` / `--kluvs-overlay-dark` — `rgba(0,0,0,0.70)` dark-surface backdrop
- **`radius.modal`** / `--kluvs-radius-modal` — `16px`; semantic alias of `radius.lg` for dialog/sheet containers
- **Typography tokens for modal label** — `typography.modal-label` group in `tokens.json`; `--kluvs-modal-label-size` (11px) and `--kluvs-modal-label-tracking` (0.14em) in CSS; `.kluvs-modal-label` utility class
- `preview/components-modal.html` — preview card showing both default (copper eyebrow) and destructive (danger eyebrow) variants on a dark background

### Changed
- `SKILL.md` — step 4a updated to document `docs/` as the home for per-component integration guides; "Do not read" corrected to allow targeted doc reads

---

## [2.1.0] — 2026-05-22

Loading spinner — Breathe·Tidal — shipped across all three platforms. Establishes `docs/` as the design system's integration guide home.

### Added
- **Loading spinner — Breathe·Tidal variant.** Kluvs mark (three hexagons) with a 4s box-breathing animation: 120° step on inhale (scale 0.96→1.08, opacity 0.94→1), hold, 120° step on exhale, hold. Easing: `cubic-bezier(0.4, 0, 0.4, 1)` on transitions, `linear` on holds. Reduced-motion fallback: static rest pose (no animation). Three platform exports:
  - `assets/spinner-kluvs.svg` — self-contained animated SVG for web (CSS animation + `prefers-reduced-motion` rule)
  - `assets/android/drawable/spinner_kluvs.xml` + `spinner_kluvs_animation.xml` — AnimatedVectorDrawable with full keyframe fidelity via `assets/android/animator/` + `assets/android/interpolator/kluvs_breathe_tidal.xml`
  - `assets/ios/KluvsSpinner.swift` — SwiftUI view using `KeyframeAnimator` (iOS 17+); respects `accessibilityReduceMotion`
- `preview/components-spinner.html` — spinner preview card with size specimens (16/32/64 px, both surfaces), usage table, and animation spec summary
- `docs/spinner-kluvs.md` — developer guide covering web (`<img>` and inline SVG), Android (file placement, XML layout, Kotlin View system, Jetpack Compose, reduced motion), and iOS (SwiftUI) with copy-paste snippets. Establishes `docs/` as the home for all future per-component integration guides.

### Changed
- `index.html` States specimen: replaced placeholder border-spin `<div>` with `<img src="assets/spinner-kluvs.svg">` on both warm-dark and light surfaces
- `site.css`: removed `@keyframes spin` and `.spinner` border-ring class; replaced with `.kluvs-spinner` sizing-only class (animation is self-contained in the SVG)
- `README.md`: animation section updated — loading spinner is now Breathe·Tidal, not a static stroked ring
- `CLAUDE.md`: loading state open item resolved; file map expanded with spinner and `docs/` entries

---

## [2.0.0] — 2026-05-17

Two-register typography system replaces Inter as the sole typeface. Breaking change: `--kluvs-font-sans` now resolves to IBM Plex Sans; any hardcoded Inter references in client repos must be updated.

### Changed
- `--kluvs-font-sans` updated from Inter to IBM Plex Sans (400/500/700)
- Heading utility classes (`.kluvs-display-*`, `.kluvs-page-heading`, `.kluvs-section-heading`, `.kluvs-card-heading`) updated to use EB Garamond serif; card heading is now italic
- Wordmark assets (`kluvs-wordmark-dark/light.svg`) updated from Inter to EB Garamond

### Added
- `--kluvs-font-serif`: EB Garamond (400/500/700 + italic 400/500) — literary register for headings and book titles
- `.kluvs-eyebrow` utility class: IBM Plex Sans, 12px, medium, uppercase, 0.1em tracking — for section labels within UI panels and tabs
- `kluvs-lockup-dark.svg` / `kluvs-lockup-light.svg`: combined mark + KLUVS wordmark assets at canonical 42px mark / 36px text ratio

### Migration
- Replace `font-family: Inter` with `font-family: var(--kluvs-font-sans)` (IBM Plex Sans)
- Add `font-family: var(--kluvs-font-serif)` to wordmarks, display text, page headings, section headings, and book titles
- Replace `font-semibold` (600) with `font-bold` (700) for headings/badges or `font-medium` (500) for UI labels
- Replace within-tab section headings with `.kluvs-eyebrow` pattern

---

## [1.0.2] — 2026-05-16

Major style guide overhaul. The hosted site at design.kluvs.com now supports a full surface toggle, dual-surface component specimens, responsive mobile layout, and correct dark mode rendering throughout.

### Added
- `site.css` and `site.js` extracted from `index.html` (was 3969 lines → now ~2400)
- Surface toggle: dark/light preview mode switching chrome and component specimens simultaneously; defaults to dark
- Full button system: Primary, Outlined, Text/Ghost, Text Destructive, Social — all on both surfaces
- Dual-surface specimens for all component groups: Navigation, Inputs, Cards, Avatars, Members, States
- Light variant for Avatars (white fill, role rings preserved) and States (white cards, adjusted progress/timeline colors)
- Light Surfaces swatch card pinned to white in dark mode; all other color cards respond to toggle
- Accessibility section dark mode: table text, exception headings, paragraphs, and dividers all correctly styled
- Responsive mobile layout with slide-in nav drawer

### Changed
- `tokens.json`: removed all surface/platform restrictions ("mobile-only", "dark-only", "auth-only", etc.)
- All documentation: principle updated to "both surfaces supported everywhere"
- Social OAuth buttons: removed light-only assumption; fixed provider colors work on any surface
- Navigation: removed "dark-only in the product" claim
- Warm-dark token description: reworded from "mobile/Figma" to "warm-dark stack"
- Component status table: Button Primary promoted Partial → Done; Outlined, Text, Destructive added as Done
- `SKILL.md`: tightened reading list with explicit do-not-read list for site infrastructure

### Fixed
- Copper hex in README corrected to `#D16D30` (unanimous across all codebases)
- Card radius corrected to 12px in README
- Gold: `#F0BF05` → `#EFBF04` in CSS (matches both mobile platforms)
- Admin teal: `#006682` → `#006781` in README
- Error red: `#E53333` → `#EF4444` in README
- iOS Google button text documented as pending fix (`#757575` → `#1F1F1F`)
- Surface toggle CSS specificity: `!important` on visibility rules to override inline `display:flex`
- Orphaned `comp-grid` wrapper removed from inputs section after refactor

### Added
- Full button system: Primary (filled), Outlined, Text/Ghost, Text Destructive, Social — all five variants with live specimens on both warm-dark and light surfaces
- Surface toggle in sidebar — flips the style guide chrome between light and warm-dark to preview component behaviour in each context
- Button tokens in `tokens.json` (`component.button.*`) covering shape, padding, typography, and loading pattern
- CLAUDE.md: documented canonical button text color (white, not adaptive `colorScheme.background`) and loading state pattern

### Changed
- Component status: Button — Primary promoted from Partial → Done; Outlined, Text, Text Destructive added as Done

---

## [1.0.1] — 2026-05-16

Cross-repo audit against `kluvs-frontend` and `kluvs-mobile` reconciled all token values against the original Notion design doc. Five README/CSS discrepancies corrected, iconography canonicalized, typography tier system documented, and the hosted style guide launched at design.kluvs.com.

### Fixed
- Copper hex: README corrected from `#D16E30` to `#D16D30` — unanimous across CSS, web, mobile, and original design doc
- Card radius: README corrected from 10px to 12px — matches `--kluvs-radius-card` and web Tailwind config
- Gold (owner role): `--kluvs-role-owner` corrected from `#F0BF05` to `#EFBF04` — matches Android `Color.kt` and iOS `Colors.swift`
- Admin teal: README corrected from `#006682` to `#006781` — matches CSS, web Tailwind, mobile, and original design doc
- Error red: README corrected from `#E53333` to `#EF4444` — matches `--kluvs-danger` and web Tailwind config

### Changed
- Iconography section: replaced Lucide with Material Symbols as the canonical icon system (weight 600, Grade 0, Optical Size 24px, SVG). Lucide remains in `ui_kits/mobile/` as a placeholder pending migration.
- `assets/` icon SVGs now documented in README index (previously undocumented)
- Gold usage note added: dark-surface-first, never use as text color
- `SKILL.md` hardened with an explicit reading list and do-not-read list — immune to repo growth

### Added
- Typography tier system documented in README: four-tier hierarchy (section headers → primary content → supporting details → fine print) with M3 role mappings for mobile and web utility class equivalents
- `index.html` — hosted style guide at design.kluvs.com: dark sidebar nav, inline color swatches, type specimens, spacing + radius visuals, icon grid, brand asset showcase, live component specimens (Navigation, Buttons, Inputs, Cards, Avatars, Members, States), component status table, mobile kit embed. Fully responsive with slide-in mobile nav drawer.

---

## [1.0.0] — 2026-05-16

Initial design system foundation, generated from the Kluvs Figma file.

### Added
- `colors_and_type.css` — full token set: color (brand, surface-dark, surface-light, warm-dark, roles, status), spacing, radius, motion, and type
- `assets/` — brand marks (wordmark light/dark, mark, app icon), role badges (owner, admin), OAuth provider glyphs (Discord, Google, Apple), icon SVGs
- `preview/` — 27 standalone HTML swatches covering every token category
- `ui_kits/mobile/` — complete mobile UI kit (Login → Clubs → Profile) as React/Babel components with an interactive click-through demo
- `README.md` — brand guide: voice, visual foundations (color, type, spacing, radius, animation, states, borders, shadows), iconography, and open caveats
- `SKILL.md` — Claude Code skill front-matter enabling the `/kluvs-design` skill

---

[Unreleased]: https://github.com/kluvs-app/design-system/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/kluvs-app/design-system/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/kluvs-app/design-system/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/kluvs-app/design-system/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/kluvs-app/design-system/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kluvs-app/design-system/releases/tag/v1.0.0
