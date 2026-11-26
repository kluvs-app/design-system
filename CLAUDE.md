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
| `docs/illustrations.md` | Woodcut spot illustrations — style, inks, accent rule, layout, catalog, and the locked generation prompt. |
| `docs/inputs.md` | Form field states and anatomy. |
| `docs/members.md` | Member rows and Role Eyebrow identification. |
| `docs/modal.md` | Modal anatomy spec — three-zone layout and platform notes. |
| `docs/navigation.md` | App shell navigation — TopBar, Tabs, and BottomNav. |
| `docs/states.md` | Functional states — Loading, Error, Empty Shelf, and Progress. |
| `docs/spinner-kluvs.md` | Spinner integration guide — web, Android, and iOS with snippets. |
| `preview/` | Standalone HTML cards, one per token group. Browser-viewable; useful as visual reference. |
| `store/` | Store listing graphics (Play + App Store). HTML templates + `render.sh` → upload-ready PNGs in `store/export/`; raw captures in `store/raw/`. Also store copy (`store/listing/`) and Top.gg pages (`store/topgg/`). This repo is the home for **all** public-facing design and copy; commit rendered exports alongside their sources (they are deliverables, not build artifacts — don't gitignore them). See `store/README.md`. |

## Token namespacing

The CSS has two surface stacks — **do not mix them**:

- `--kluvs-surface-*` / `--kluvs-content-*` — **web-canonical**, neutral dark (`#0A0A0A` base). Use for web/marketing contexts.
- `--kluvs-warm-dark-*` / `--kluvs-warm-fg-*` — \*\*warm-dark stack\*\*, brown-tinted near-black (`#140F0D` base). Use for dark product surfaces on any platform.

The back-compat alias block at the bottom of `colors_and_type.css` maps older `--kluvs-surface-dark-*` names to the warm-dark tokens — it exists to keep the preview cards working. Don't add to it.

## Source of truth (read before editing anything)

This repo is the **only** reference for clients. Clients must never be told to "look at mobile/web" — if a screen needs a rule that isn't here, add it here first.

| Kind of fact | Lives in — and only in |
|---|---|
| Values (color, size, weight, line height, tracking, radius, spacing, motion) | `tokens.json` (mirrored by `colors_and_type.css` for web artifacts) |
| Usage rules (which family/variant for which role, modifiers, migration/mapping, exemptions) | `docs/<topic>.md` |
| Brand voice, rationale, contrast | `README.md` |
| Agent entry point | `SKILL.md` — points to the above, restates nothing |
| Status of client adoption | "Pending propagation" below (maintained by `/propagation-audit`) |

Rules for editing:
- **One home per fact.** If it is a value, it goes in `tokens.json`; everywhere else *links* to it. Do not copy numbers or rules into `README.md`, `SKILL.md` or this file.
- **`docs/*.md` are prescriptive, platform-agnostic specs.** Never annotate them with which platform has or hasn't implemented something (no "Android `X`", no "not yet on iOS/web"). Adoption status belongs only in "Pending propagation" below.
- **Phrase rules narrowly.** State exactly what a rule covers and what it does not (an overly broad "never X" has already misled an agent).
- **Check before you change a spec.** When a spec disagrees with what a client ships, decide deliberately which is right; then fix the DS *and* record the decision in `CHANGELOG.md`. The DS leads; clients converge to it.
- **Audit before release.** Run `/repo-audit` and fix findings first; cut the release only when the work is complete.

## Brand rules (non-negotiable)

- **Accent:** copper `#D16D30` — one per view, on the primary CTA and active state only.
- **Type:** EB Garamond (serif) + IBM Plex Sans (sans), mono reserved. Everything else about type — sizes, weights, italic, line height, tracking — is defined only in `tokens.json` and `docs/typography.md`; do not restate it elsewhere.
- **No emoji.** None in the Figma source; don't introduce them.
- **No gradients, no images, no blur.** Surfaces are flat solid steps. The one exception is spot illustrations, which follow `docs/illustrations.md` only.
- **Casing:** Title Case for screen titles and interactive tabs; Sentence case for body; ALL-CAPS for brand wordmarks (KLUVS) and eyebrow labels only.
- **Both surfaces supported everywhere.** Warm-dark and light are both valid on mobile and web.

## Pending propagation to client repos

These are confirmed design system decisions that have not yet been applied to `kluvs-mobile` or `kluvs-frontend`:

- **Component sizes (2026-11-20)** — Mobile: iOS Primary/Secondary ~42, Outlined ~34, Text unsized, inputs/search ~38; Android input 56; Outlined side padding 8 on both; no padded 48 touch target on pills, dropdown, segmented, social, outlined icon (iOS buttons too); snackbar 54, avatar initials 0.3, 2px colored avatar ring on both; iOS sheet handle 36×5, dialog 400 (Notion ticket filed). Frontend: inputs on set-new-password (42) and landing (38), BooksPage search (42, icon 16), avatar stack ring/overlap/max, tab strip 47, bottom nav 64, offline banner 35 and not wine, chrome bar 64, segmented opts out of touch target; snackbar, bottom sheet, toggle pill not built.
- **Mobile call sites (2026-11-20)** — iOS: 6 files on raw `Button` (9 sites), 10 raw system fonts, approximated line height, legacy `Font.kluvs*` dead code; Android: legacy `Type.kt` shim and 4 hardcoded sizes. iOS color roles on 41/75 files. No named light label-variant token.
- **Frontend color roles (2026-11-20)** — accent/status roles still read Tailwind statics; `bg-raised` doesn't map to the DS `bar` role in light (modal, top bar, bottom nav).

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
- EB Garamond and IBM Plex Sans are loaded from the Google Fonts CDN — no local `.ttf` bundle.
- **Loading state:** full-page/section loading uses the Breathe·Tidal spinner (`assets/spinner-kluvs.svg`). Button loading state still uses appended "…" to the label (e.g. "Saving…") — the spinner is too large for inline button use.
- **Button text on primary:** canonical value is white `#FFFFFF` (`color.brand.on-primary`). Mobile experiment using `colorScheme.background` (adaptive near-black on dark) was evaluated — white retained for consistency and because both approaches fail AA on light surfaces equally.
