---
name: kluvs-design
description: Use this skill to generate well-branded interfaces and assets for Kluvs (a book-club mobile app — warm dark UI, copper accent, Inter type), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick map of what's here:
- `README.md` — brand overview, content fundamentals, visual foundations, iconography, file index
- `colors_and_type.css` — CSS custom properties for the full color + type system; import this first
- `assets/` — Kluvs wordmark + mark, OAuth provider glyphs (Discord/Google/Apple), member-role badges
- `ui_kits/mobile/` — React (JSX-via-Babel) recreation of every Figma screen; `components.jsx` is the primitive library, `screens.jsx` is the assembled screens, `index.html` is the click-thru demo. The iOS frame in `ios-frame.jsx` is available if you need a device bezel around a screen.
- `preview/` — small swatches/specimens used by the Design System tab; useful as visual reference even if you don't render them

Defaults to lean on:
- Copper `#D16E30` is the only accent. One per view, mostly on the primary action and active state.
- Dark surfaces stack `#140F0D` → `#1A140F` → `#241C17`; `#332B24` is the hairline.
- Light surfaces (auth only) stack `#FAFAFC` → `#FFFFFF`.
- Type is Inter at 700 / 500 / 400. Display is the bare wordmark — KLUVS at 48px with a copper underline pill.
- Radius scale: 2 (chips), 8 (timeline), 10 (cards/buttons), pill (nav).
- No emoji, no gradients beyond the copper-on-copper accent card, no decorative illustration.
