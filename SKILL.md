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
4a. `docs/` — per-component integration guides. Read the relevant guide when implementing that component:
  - `docs/spinner-kluvs.md` — loading state (web, Android, iOS copy-paste snippets)
  - `docs/modal.md` — dialog/modal/sheet anatomy, tokens, behavior rules, and platform notes; includes an applied sheet-vs-dialog decision table for the Clubs/Books/Me action set
  - `docs/navigation.md` — top bar contextual modes (root vs. detail), bottom nav destination rules, FAB usage, and screen-level shortcuts that skip a modal entirely (inline edit, OS image picker, OS share sheet)
  - `docs/typography.md` — the family/rung/modifier typography model (supersedes the old four-tier system) — read before implementing any text style, not just when "typography" is explicitly the task
  - `docs/colors.md` — the semantic color-role layer (`card`, `bar`, `divider`, `content`, etc.), mapped to raw dark/light tokens per platform — read before implementing any surface/text color, not just when "colors" is explicitly the task
  - `docs/states.md` — functional states: Loading, Error, Empty Shelf (Fragmented Hex Grid), Progress, and Snackbar (Success/Danger variants)
  - `docs/buttons.md` — button hierarchy: Primary, Secondary, Pill, and Segmented controls
  - `docs/cards.md` — Standard and Highlighted card containers
  - `docs/inputs.md` — form field anatomy and states, including PasswordField and InputField keyboard actions
  - `docs/dropdowns.md` — pill-trigger + popover option list value selector
  - `docs/avatars.md` — Avatar and Avatar Stack sizes and the 12-hue palette rules
  - `docs/book-cover.md` — Book Cover sizes, scaled ribbons, and the hexagon hive grid fallback
  - `docs/members.md` — member rows and Role Eyebrow identification

**Do not read:** `index.html` (site entry point), `preview/` (token swatches for the hosted style guide), `CHANGELOG.md`, or `VERSION`. Read `docs/<component>.md` only when implementing that specific component (see step 4a above).

## What to do

If the user invokes this skill without other guidance, ask what they want to build or design, then act as an expert Kluvs designer. Output:
- **HTML artifacts** for mocks, prototypes, or throwaway slides — link `colors_and_type.css` and reference assets by path.
- **Production code** (React, Kotlin Compose, Swift) — apply the token values and tier system directly; no CSS import needed.

## Non-negotiable brand rules

- Copper `#D16D30` is the only accent. One per view, on the primary CTA and active state only.
- Dark surfaces (product): `#140F0D` → `#1A140F` → `#241C17`; `#332B24` is the hairline.
- Light surfaces (cream): `#F2EDE5` (page) → `#F6F0E7` (bar) → `#FAF6EF` (card) → `#E8DECC` (deep/nav).
- Type: **Two-register system.** EB Garamond (serif, 400/500/700 + italic 400/500) for wordmark, display, headings, and book titles — italic reserved for book titles only. IBM Plex Sans (sans, 400/500/700) for all UI chrome, body, labels, and eyebrow text. No other fonts, no monospace.
- Radius: 2 (chips), 8 (inputs/timeline), 12 (cards/buttons), 9999 (pill/avatars).
- No emoji. No gradients. No decorative illustration. No backdrop blur.
- Mustard `#C9900A` (owner badge) — graphical badge indicator on both light and dark surfaces (~7:1 on dark, ~3:1 on light).
- Icons: Material Symbols, weight 600, Grade 0, 24px SVG.
