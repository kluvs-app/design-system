---
name: kluvs-design
description: Use this skill to generate well-branded interfaces and assets for Kluvs (a book-club mobile app — warm dark UI, copper accent, Inter type), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

## What to read

Load these files in order — stop when you have enough context for the task:

1. `README.md` — brand overview, content voice, visual foundations, iconography rules, typography tier system. Always read this first.
2. `colors_and_type.css` — every color, spacing, radius, motion, and type token as CSS custom properties. Import this in any HTML artifact you produce.
3. `assets/` — brand marks, role badges, OAuth glyphs, and icon SVGs. Reference by relative path; do not inline or re-encode SVG content.
4. `ui_kits/mobile/components.jsx` — primitive component library (KluvsTopBar, KluvsCard, KluvsButton, KluvsInput, KluvsIcon, etc.).
5. `ui_kits/mobile/screens.jsx` — assembled screens (Login, Clubs, Profile) for reference when recreating or extending screens.

**Do not read:** `index.html` (site entry point), `preview/` (token swatches for the hosted style guide), `CHANGELOG.md`, `VERSION`, or anything in `docs/`. These are website infrastructure, not design guidance.

## What to do

If the user invokes this skill without other guidance, ask what they want to build or design, then act as an expert Kluvs designer. Output:
- **HTML artifacts** for mocks, prototypes, or throwaway slides — link `colors_and_type.css` and reference assets by path.
- **Production code** (React, Kotlin Compose, Swift) — apply the token values and tier system directly; no CSS import needed.

## Non-negotiable brand rules

- Copper `#D16D30` is the only accent. One per view, on the primary CTA and active state only.
- Dark surfaces (product): `#140F0D` → `#1A140F` → `#241C17`; `#332B24` is the hairline.
- Light surfaces (auth/marketing only): `#FAFAFC` → `#FFFFFF`.
- Type: Inter 700 / 500 / 400. No serifs, no italic, no monospace.
- Radius: 2 (chips), 8 (inputs/timeline), 12 (cards/buttons), 9999 (pill/avatars).
- No emoji. No gradients. No decorative illustration. No backdrop blur.
- Gold `#EFBF04` (owner badge) is dark-surface-first — never use as text color.
- Icons: Material Symbols, weight 600, Grade 0, 24px SVG. `ui_kits/mobile/` uses Lucide as a placeholder only.
