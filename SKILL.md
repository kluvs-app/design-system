---
name: kluvs-design
description: Use this skill to generate well-branded interfaces and assets for Kluvs (a book-club mobile app — warm dark UI, copper accent, EB Garamond + IBM Plex Sans two-register type), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

## What to read

Load these files in order — stop when you have enough context for the task:

1. `README.md` — brand overview, content voice, visual foundations, iconography rules, typography tier system. Always read this first.
2. `tokens.json` — every token as structured data with values, types, and usage descriptions (contrast notes, dark-surface constraints, tier mappings). **Read this for all client repo work** (mobile or web) — it is faster to parse than the CSS and includes the reasoning behind each value.
3. `colors_and_type.css` — tokens as CSS custom properties + utility classes. **Only needed when producing a web HTML artifact** that will link or import this file directly. Skip if working in a native (Kotlin / Swift) context.
4. `assets/` — brand marks, role badges, OAuth glyphs, icon SVGs, and the Breathe·Tidal loading spinner (`spinner-kluvs.svg`). Reference by relative path; do not inline or re-encode SVG content.
4a. `docs/spinner-kluvs.md` — copy-paste integration guide for the spinner (web, Android, iOS). Read when producing a loading state.
5. `ui_kits/mobile/components.jsx` — primitive component library (KluvsTopBar, KluvsCard, KluvsButton, KluvsInput, KluvsIcon, etc.).
6. `ui_kits/mobile/screens.jsx` — assembled screens (Login, Clubs, Profile) for reference when recreating or extending screens.

**Do not read:** `index.html` (site entry point), `preview/` (token swatches for the hosted style guide), `CHANGELOG.md`, `VERSION`, or anything in `docs/`. These are website infrastructure, not design guidance.

## What to do

If the user invokes this skill without other guidance, ask what they want to build or design, then act as an expert Kluvs designer. Output:
- **HTML artifacts** for mocks, prototypes, or throwaway slides — link `colors_and_type.css` and reference assets by path.
- **Production code** (React, Kotlin Compose, Swift) — apply the token values and tier system directly; no CSS import needed.

## Non-negotiable brand rules

- Copper `#D16D30` is the only accent. One per view, on the primary CTA and active state only.
- Dark surfaces (product): `#140F0D` → `#1A140F` → `#241C17`; `#332B24` is the hairline.
- Light surfaces: `#FAFAFC` → `#FFFFFF`.
- Type: **Two-register system.** EB Garamond (serif, 400/500/700 + italic 400/500) for wordmark, display, headings, and book titles — italic reserved for book titles only. IBM Plex Sans (sans, 400/500/700) for all UI chrome, body, labels, and eyebrow text. No other fonts, no monospace.
- Radius: 2 (chips), 8 (inputs/timeline), 12 (cards/buttons), 9999 (pill/avatars).
- No emoji. No gradients. No decorative illustration. No backdrop blur.
- Mustard `#C9900A` (owner badge) — graphical badge indicator on both light and dark surfaces (~7:1 on dark, ~3:1 on light).
- Icons: Material Symbols, weight 600, Grade 0, 24px SVG. `ui_kits/mobile/` uses Lucide as a placeholder only.
