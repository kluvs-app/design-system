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

### Added
- Typography tier system documented in README: four-tier hierarchy (section headers → primary content → supporting details → fine print) with M3 role mappings for mobile and web utility class equivalents
- `index.html` — hosted style guide homepage: dark sidebar nav, inline color swatches (brand / warm-dark / light / roles / providers), type specimens, spacing + radius visuals, icon grid, brand asset showcase, component status table, mobile kit link

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

[Unreleased]: https://github.com/kluvs-app/design-system/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/kluvs-app/design-system/releases/tag/v1.0.0
