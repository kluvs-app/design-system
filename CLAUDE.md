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
| `assets/` | Brand marks, role badges, OAuth glyphs — all SVG. Drop-in, no processing needed. |
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
- `--kluvs-warm-dark-*` / `--kluvs-warm-fg-*` — **mobile/Figma**, warm near-black (`#140F0D` base). Use inside `ui_kits/mobile/` and any product screen.

The back-compat alias block at the bottom of `colors_and_type.css` maps older `--kluvs-surface-dark-*` names to the warm-dark tokens — it exists to keep the preview cards working. Don't add to it.

## Brand rules (non-negotiable)

- **Accent:** copper `#D16D30` — one per view, on the primary CTA and active state only.
- **Type:** Inter 400 / 500 / 700 only. No serifs, no italic, no monospace.
- **No emoji.** None in the Figma source; don't introduce them.
- **No gradients, no images, no blur.** Surfaces are flat solid steps.
- **Casing:** Title Case for screen titles and section headers; Sentence case for body; ALL-CAPS for brand wordmarks only (KLUVS).
- **Dark-by-default product; light for auth/marketing.** Don't apply the mobile warm-dark palette to a web marketing page.

## Pending propagation to client repos

These are confirmed design system decisions that have not yet been applied to `kluvs-mobile` or `kluvs-frontend`:

- **Gold `#EFBF04`** — design system updated; mobile `Color.kt` and iOS `Colors.swift` still have `#EFBF04` (already correct); `colors_and_type.css` now aligned.
- **iOS Google button text** — iOS `Colors.swift` has `googleTextGray: 0x757575`; correct value is `#1F1F1F` (matches Android + web).
- **Web Inter weight 600** — `kluvs-frontend` loads Inter weight 600 from Google Fonts; design system specifies 400/500/700 only. Weight 600 is unused — drop from the import.
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
5. Commit, then `git tag vX.Y.Z` and push both: `git push && git push --tags`.

The three pending discrepancy fixes (see above) are tracked in `[Unreleased]` in `CHANGELOG.md` and will become **v1.0.1** once resolved.

## Open items (from README)

- `Web-TBD` Figma page is intentionally empty — no web spec.
- **Icons:** `ui_kits/mobile/` uses Lucide inline SVGs as a placeholder from the initial generation pass. Canonical icon set is Material Symbols (weight 600, Grade 0, 24px SVG). Replace Lucide references when building production screens; drop exports into `assets/icons/`.
- Inter is loaded from Google Fonts CDN — no local `.ttf` bundle. Font family for production is TBD.
- The four-tier typography system is documented in README; mobile M3 implementation and web utility class mapping are pending alignment.
- **Loading state:** current pattern is appended "…" to button label (e.g. "Saving…"). Future improvement: animated vector drawable of the Kluvs mark rotating — deferred.
- **Button text on primary:** canonical value is white `#FFFFFF` (`color.brand.on-primary`). Mobile experiment using `colorScheme.background` (adaptive near-black on dark) was evaluated — white retained for consistency and because both approaches fail AA on light surfaces equally.
