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
| `docs/avatars.md` | Avatar and Avatar Stack specifications — sizes and 12-hue palette rules. |
| `docs/book-cover.md` | Book Cover components — sizes, scaled ribbons, and the hexagon hive grid fallback. |
| `docs/buttons.md` | Button hierarchy — Primary, Secondary, Pill, and Segmented controls. |
| `docs/cards.md` | Card containers — Standard and Highlighted variants. |
| `docs/colors.md` | Semantic color-role layer — role names (`card`, `bar`, `divider`, etc.) mapped to raw tokens per platform. |
| `docs/dropdowns.md` | Dropdown value selector — pill trigger + popover option list. |
| `docs/inputs.md` | Form field states and anatomy. |
| `docs/members.md` | Member rows and Role Eyebrow identification. |
| `docs/modal.md` | Modal anatomy spec — three-zone layout and platform notes. |
| `docs/navigation.md` | App shell navigation — TopBar, Tabs, and BottomNav. |
| `docs/states.md` | Functional states — Loading, Error, Empty Shelf, and Progress. |
| `docs/spinner-kluvs.md` | Spinner integration guide — web, Android, and iOS with snippets. |
| `preview/` | 27 standalone HTML cards, one per token group. Browser-viewable; useful as visual reference. |

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

- **Typography/button model propagation (2026-08-25)** — `kluvs-mobile` now has full family/rung/modifier typography and full button-family parity on **both** Android and iOS (`:designsystem`'s `KluvsTypography`/button set; iOS's `KluvsTypography.swift` + matching button components) — only call-site migration remains (Android: 5 files on raw M3 buttons, 1 on raw M3 typography; iOS: 6 files on raw buttons, iOS also still runs a legacy parallel type scale for un-migrated call sites). `kluvs-frontend` has not started — `tailwind.config.js`'s `fontSize` keys are still the pre-v2 four-tier names, and only Ghost/Text has a discrete button component.
- **Color-role layer propagation (2026-08-25)** — `kluvs-mobile` has the full role model (`docs/colors.md`) on both Android and iOS; only iOS call-site migration remains (41/76 files). `kluvs-frontend` has a real switching-role layer in `src/index.css` (background/bar/card/content/etc. — not "nothing," as previously logged) but non-switching roles (accent/success/danger) still read raw Tailwind statics, so it isn't applied end-to-end. `docs/colors.md` also flags one raw-token gap surfaced while writing it: light-mode `labelVariant` has no named CSS custom property yet (`--kluvs-content-light-label-variant`), only a comment describing the inverse pairing — needs a real token next time `colors_and_type.css` is touched.
- **Frontend book cover / nav shell not yet formalized** — Avatar hue palette values are already in sync (`src/index.css` matches `colors_and_type.css` byte-for-byte); book cover (`BookCover.tsx`/`CoverSlot.tsx`) remains genuinely un-formalized and has a live bug: `CoverSlot.tsx:38`'s `rounded-sm` resolves to Tailwind's default 2px, not the DS's 4px `radius.sm` token, because that token was never added to `tailwind.config.js`.
- **Frontend hardcoded hex bypassing token** — `BaseModal.tsx:36` hardcodes `#D16D30` directly instead of reading `var(--color-primary)`; value is correct but the pattern violates the repo's own "don't hardcode color values" rule.

## Working with this system

**To preview tokens:** open any file in `preview/` directly in a browser.

**To add a new preview card:** copy the pattern from an existing card in `preview/`, link `../../colors_and_type.css`, and use the existing CSS custom property names.

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
- **Icons:** Canonical icon set is Material Symbols (weight 600, Grade 0, 24px SVG). Drop exports into `assets/icons/`.
- Inter is loaded from Google Fonts CDN — no local `.ttf` bundle. Font family for production is TBD.
- The four-tier typography system is documented in README; mobile M3 implementation and web utility class mapping are pending alignment.
- **Loading state:** full-page/section loading uses the Breathe·Tidal spinner (`assets/spinner-kluvs.svg`). Button loading state still uses appended "…" to the label (e.g. "Saving…") — the spinner is too large for inline button use.
- **Button text on primary:** canonical value is white `#FFFFFF` (`color.brand.on-primary`). Mobile experiment using `colorScheme.background` (adaptive near-black on dark) was evaluated — white retained for consistency and because both approaches fail AA on light surfaces equally.
