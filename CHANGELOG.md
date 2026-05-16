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

[Unreleased]: https://github.com/kluvs-app/design-system/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/kluvs-app/design-system/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/kluvs-app/design-system/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kluvs-app/design-system/releases/tag/v1.0.0
