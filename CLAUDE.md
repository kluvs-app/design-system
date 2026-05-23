# Kluvs Design System — Claude Code Guide

## What this repo is

A **static design system** for Kluvs — a dark-themed book-club mobile app. No build step, no package.json, no framework dependency. Everything is plain HTML, CSS custom properties, and JSX-via-Babel (browser-compiled). The output targets designers and AI agents generating Kluvs-branded UI, not a runtime library.

## File map

| Path | Purpose |
|---|---|
| `README.md` | Brand source of truth — voice, color, type, spacing, iconography rules. Read this first. |
| `SKILL.md` | Claude Code skill front-matter for the `/kluvs-design` skill. |
| `colors_and_type.css` | **Single token source.** CSS custom properties for all color, spacing, radius, motion, and type. Import this before anything else. |
| `tokens.json` | **Platform-agnostic token source.** W3C/Style Dictionary compatible. Read this from any client repo to sync token values. |
| `assets/` | Brand marks, role badges, OAuth glyphs, and the loading spinner — all SVG. Drop-in, no processing needed. |
| `assets/spinner-kluvs.svg` | **Loading spinner** — Breathe·Tidal animated SVG. Use as `<img>` or inline. |
| `assets/android/` | Android AVD files (5 XML files). See `docs/spinner-kluvs.md` for import instructions. |
| `assets/ios/KluvsSpinner.swift` | SwiftUI loading spinner view (iOS 17+). |
| `docs/` | Developer guides — one file per component/asset. Start here when integrating anything into a client repo. |
| `docs/spinner-kluvs.md` | Spinner integration guide — web, Android, and iOS with copy-paste snippets. |
| `preview/` | 27 standalone HTML cards, one per token group. Browser-viewable; useful as visual reference. |
| `ui_kits/mobile/` | Full mobile UI kit (React via Babel CDN). See below. |

### `ui_kits/mobile/` breakdown

| File | Role |
|---|---|
| `components.jsx` | Primitive component library — `KluvsTopBar`, `KluvsCard`, `KluvsButton`, `KluvsInput`, `KluvsIcon`, etc. |
| `screens.jsx` | Assembled app screens — Login, Clubs (General / Active Session / Members), Profile. |
| `ios-frame.jsx` | Device bezel wrapper. Use when you need a phone frame around a screen. |
| `index.html` | Click-through demo. Open in a browser; tabs and bottom nav are interactive. |

## Token namespacing

The CSS has two surface stacks — **do not mix them**:

- `--kluvs-surface-*` / `--kluvs-content-*` — **web-canonical**, neutral dark (`#0A0A0A` base). Use for web/marketing contexts.
- `--kluvs-warm-dark-*` / `--kluvs-warm-fg-*` — \*\*warm-dark stack\*\*, brown-tinted near-black (`#140F0D` base). Use for dark product surfaces on any platform.

The back-compat alias block at the bottom of `colors_and_type.css` maps older `--kluvs-surface-dark-*` names to the warm-dark tokens — it exists to keep the preview cards working. Don't add to it.

## Brand rules (non-negotiable)

- **Accent:** copper `#D16D30` — one per view, on the primary CTA and active state only.
- **Type:** Two-register system. **EB Garamond** (serif, 400/500/700 + italic 400/500) for wordmark, display, headings, and book titles. **IBM Plex Sans** (sans, 400/500/700) for all UI chrome, body, labels, and eyebrow text. No other fonts. Italic is reserved for book titles in Garamond only.
- **No emoji.** None in the Figma source; don't introduce them.
- **No gradients, no images, no blur.** Surfaces are flat solid steps.
- **Casing:** Title Case for screen titles and interactive tabs; Sentence case for body; ALL-CAPS for brand wordmarks (KLUVS) and eyebrow labels only.
- **Both surfaces supported everywhere.** Warm-dark and light are both valid on mobile and web.

## Pending propagation to client repos

These are confirmed design system decisions that have not yet been applied to `kluvs-mobile` or `kluvs-frontend`:

- **Gold `#EFBF04`** — design system updated; mobile `Color.kt` and iOS `Colors.swift` still have `#EFBF04` (already correct); `colors_and_type.css` now aligned.
- **iOS Google button text** — iOS `Colors.swift` has `googleTextGray: 0x757575`; correct value is `#1F1F1F` (matches Android + web).
- **Mobile typography** — `kluvs-frontend` now uses IBM Plex Sans + EB Garamond (v2.0.0). Mobile (`kluvs-mobile`) still uses system fonts. A full typography pass on mobile is pending — apply the two-register system (EB Garamond for headings/book titles, IBM Plex Sans for body/UI).
- **Mobile M3 surface overrides** — `darkColorScheme` in `Theme.kt` only sets primary/secondary/tertiary. The warm-dark surfaces (`#140F0D`, `#1A140F`, `#241C17`, etc.) need to be explicitly set to match the Figma/design system intent.
- **Mobile typography** — `Type.kt` only defines `bodyLarge`; the full four-tier system (titleMedium → bodyLarge → bodyMedium → bodySmall) should be explicitly set rather than relying on M3 defaults.

## Working with this system

**To preview tokens:** open any file in `preview/` directly in a browser.

**To run the mobile UI kit:** open `ui_kits/mobile/index.html` in a browser. No server needed.

**To add a new preview card:** copy the pattern from an existing card in `preview/`, link `../../colors_and_type.css`, and use the existing CSS custom property names.

**To add a new UI component:** add primitives to `components.jsx` and composed screens to `screens.jsx`. Export to `window` at the end of `components.jsx` like the existing exports. Keep tokens from `colors_and_type.css` — never hardcode hex values that already have a token.

**To generate Kluvs-branded output:** invoke the `/kluvs-design` skill. It loads `README.md` and the token file and gives you a full design context.

## Versioning

This repo uses **Semantic Versioning** adapted for design systems. The current version is in `VERSION` and stamped in the header comment of `colors_and_type.css`.

| Bump | When |
|---|---|
| **MAJOR** | Breaking token renames, removed components, color value changes that affect rendered output |
| **MINOR** | New tokens, new components, new assets — backwards-compatible additions |
| **PATCH** | Documentation corrections, discrepancy fixes, non-visual tweaks |

**To cut a release:**
1. Move the `[Unreleased]` section in `CHANGELOG.md` to a new `[x.y.z] — YYYY-MM-DD` heading.
2. Add a new empty `[Unreleased]` section at the top.
3. Update the `VERSION` file.
4. Update the version stamp in the header comment of `colors_and_type.css`.
5. Update `version.js` — this is the browser-side source of truth; `index.html` reads from it automatically.
6. **Review `SKILL.md`** — if the release changes type, color, assets, or component rules visible to agents consuming the skill, update the frontmatter description and the non-negotiable rules section to match.
7. Commit, then `git tag vX.Y.Z` and push both: `git push && git push --tags`.

The three pending discrepancy fixes (see above) are tracked in `[Unreleased]` in `CHANGELOG.md` and will become **v1.0.1** once resolved.

## Open items (from README)

- `Web-TBD` Figma page is intentionally empty — no web spec.
- **Icons:** `ui_kits/mobile/` uses Lucide inline SVGs as a placeholder from the initial generation pass. Canonical icon set is Material Symbols (weight 600, Grade 0, 24px SVG). Replace Lucide references when building production screens; drop exports into `assets/icons/`.
- Inter is loaded from Google Fonts CDN — no local `.ttf` bundle. Font family for production is TBD.
- The four-tier typography system is documented in README; mobile M3 implementation and web utility class mapping are pending alignment.
- **Loading state:** full-page/section loading uses the Breathe·Tidal spinner (`assets/spinner-kluvs.svg`). Button loading state still uses appended "…" to the label (e.g. "Saving…") — the spinner is too large for inline button use.
- **Button text on primary:** canonical value is white `#FFFFFF` (`color.brand.on-primary`). Mobile experiment using `colorScheme.background` (adaptive near-black on dark) was evaluated — white retained for consistency and because both approaches fail AA on light surfaces equally.
