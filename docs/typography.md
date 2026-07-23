# Typography

A finite set of type "families" — each a fixed shape (font-family + weight + default style), with one to three named sizes ("rungs": small / medium / large) where real usage justifies more than one size. Two modifiers, `feature` and `highlight`, apply on top of specific families instead of being tiers of their own. See `tokens.json`'s `typography` object for the machine-readable version of everything below.

**This replaces the old four-tier system** (`tier.1-section-header` → `tier.4-fine-print`, mapped to M3 roles and web utility classes). That model borrowed Material 3's shape too literally — M3 has no concept of a register switch (serif vs. sans) or an italic modifier, so mapping Kluvs values into M3's `Typography` slots silently discarded real distinctions (e.g. Android's old `Type.kt` rendered every serif heading as bold-non-italic, when the design actually differentiates roman-identity vs. italic-featured content). This doc is deliberately Material-*flavored* in its naming (small/medium/large rungs, family names like Body/Label/Headline) without being Material-*shaped* underneath.

## Why this exists

This taxonomy was derived from a real, ground-up audit of `kluvs-frontend`'s authenticated app screens (Profile, Clubs, Club Detail, Books, Discussions, Members, and every modal) — not from the design-system's own prior docs, which turned out to be mostly dead code the frontend never actually imported. The frontend's *shipped implementation* was itself inconsistent (a parallel Tailwind naming scheme used only on marketing pages, ad hoc arbitrary pixel values everywhere else) — so this is a **normalization** of real recurring patterns, not a transcription of an existing clean system. Treat any specific pixel value here as a considered default, not an untouchable law — but the *shape* of the model (families, rungs, modifiers) is the part that should hold.

## Families

| Family | Font | Weight | Default style | Rungs (px) | `feature` (italic)? | `highlight` (step-up)? |
|---|---|---|---|---|---|---|
| **Display** | Serif | Bold | Roman | S 48 · M 64 · L 96 | not observed | — |
| **Headline** | Serif | Medium | Roman | S 30 · M 34 · L 40 | ✅ | plausible, unconfirmed |
| **Title** | Serif | Medium | Roman | S 15 · M 19 · L 24 | ✅ (heavily used) | ✅ confirmed |
| **Body** | Sans | Regular | — | L 16 · M 14 | — | — |
| **Caption** | Sans | Regular | — (muted color baked in) | 13 | ✅ | — |
| **Eyebrow** | Sans | Medium | Uppercase, 0.14em tracking | 11 | — | — |
| **Label** | Sans | Medium | Sentence case | 14 | — | — |
| **Fine print** | Sans | Regular | — (muted) | 12 | — | — |
| **Mono** | Mono (system stack) | Regular | — | 13 | — | — |

### Display, Headline, Title — identity content (serif)

These three are "this text names or identifies something," in decreasing scope: Display is page/hero-level editorial text with room to breathe (marketing hero, a desktop masthead); Headline is "this whole page is about X" (a profile name, a big stat number — a number is not a separate tier, it's a Headline rung applied to numeric content); Title is card/row-level identity (a club name in a list, a book title, a session title).

**`feature` (italic) on Headline/Title:** roman = structural identity ("this is the name of the thing"), italic = "this is the featured/current thing" — a book title, the active reading session, an empty-state headline ("Start reading together."). It is a font-*style* flip only — no change to size or weight.

**`highlight` (step up one rung) on Title:** for the single emphasized instance in an otherwise-repeating list — e.g. the next/upcoming discussion in a timeline of past and future ones. It reuses an existing rung one step up in the *same* family; it does not create a new value. Confirmed on Title; plausible but unconfirmed on Headline.

### Body, Caption — reading content and metadata (sans)

Body is plain prose — author names, list content, anything actually being *read*. Caption is smaller, secondary-colored metadata (counts, timestamps, "40% complete") — the color is baked into the family, unlike Body which takes color from context. Caption also takes the `feature` modifier for short "featured aside" text ("3 books in progress").

### Eyebrow, Label, Fine print — UI chrome (sans)

These are never "content being read" — they're interface furniture.

- **Eyebrow** is deliberately its own standalone family, not a rung of Label, even though both are sans/medium/UI-chrome. Its shape (uppercase + 0.14em tracking) has no equivalent at any other size in the system — putting it on a ladder next to Label's plain sentence-case text would misrepresent it as "the small version of Label" when it's really a completely different visual treatment. It is, by a wide margin, the most-reused shape in the whole app: section headers, modal titles, status/role badges (owner/admin), per-item tag labels, and the label half of every stat-value pairing. Color is always supplied externally — secondary/neutral by default, copper for active emphasis, role colors for owner/admin — never baked into the family.
  - *Historical note:* Material 2 had a dedicated `overline` style for exactly this shape; Material 3 folded it into `labelSmall`. Kluvs follows the Material 2 model here on purpose — this shape earns its own family.
- **Label** is plain sentence-case UI text — nav items and button/CTA text measured identically in real usage, so one rung covers both; no dedicated "button" style needed. A `large` rung is plausible for the future (nothing observed requires it yet) — don't invent one without a real case.
- **Fine print** is the smallest, most muted text in the system (version numbers, disclaimers) — its own standalone family for the same reason Eyebrow is: nothing else in the system shares its exact treatment.

### Mono — reserved

Confirmed recurring in real usage (timeline dates, ISBN numbers) but not yet a fully-designed family — there's no bundled mono webfont/typeface decision yet, just a system-stack fallback (`ui-monospace`/`SF Mono`). Kept as its own family because it's a genuine font-family swap (not a modifier), and because there's stated intent to lean into it further later.

## Modifiers

Two orthogonal behaviors, not tiers of their own — this keeps the system from combinatorially exploding as families/rungs grow:

- **`feature`** — a boolean per rung: roman ↔ italic. Applies to Headline, Title, Caption. Does not apply to Display, Body, Eyebrow, Label, Fine print, or Mono (no observed case, and for the all-caps/tabular families there's no register to flip in the first place).
- **`highlight`** — a *usage rule*, not a token: render this one instance of a repeating list one rung larger within its own family. Confirmed on Title (the "next" item in a discussion timeline). Creates zero new values — it just reuses a size that already exists for another purpose.

Combining both modifiers on the same text run is untested — no real case has needed it yet.

## Cross-platform sizing

**The numeric scale is universal — every platform uses the same numbers for a given rung.** A platform differs in *which rungs it reaches for*, never in what a rung is worth. Concretely: `display.medium` is 64px whether it's rendered on a desktop browser or (hypothetically) referenced from mobile — but mobile screens don't have room for Display at all, so mobile clients simply never use that family, capping their biggest identity text at `headline.large` (40px) instead. This is the same principle behind Apple's Human Interface Guidelines keeping one fixed Dynamic Type ramp across iPhone and iPad (bigger screens get more layout — more columns, more whitespace — not bigger type), and how systems like IBM Carbon or Shopify Polaris handle responsive type: swap *which named style applies* at a breakpoint, never let the same name silently mean two different sizes.

Practical implication: Android and iOS should never invent their own pixel values for a family/rung that already has a defined size here — if a size doesn't fit, that's a signal to either use a different (adjacent) rung, or that a genuinely new rung is needed across *all* platforms, not just the one being implemented.

## Open items / not yet decided

- **`label.large`** — hypothesized (possibly button-adjacent), not yet backed by a real observed case. Don't add it speculatively.
- **`highlight` on Headline** — plausible (would parallel the Title case) but unconfirmed; no real screen has exercised it yet.
- **Mono typeface** — currently system-stack only; a deliberate typeface choice (and possibly a bundled webfont/mobile font file) is future work, not yet scheped.
- **Frontend adoption** — none of this is implemented in `kluvs-frontend` yet (the frontend's *current* code was the input to this audit, not a consumer of it). `colors_and_type.css`'s `.kluvs-*` typography classes and `tailwind.config.js`'s parallel `fontSize` keys both still reflect the pre-v2 model and need to be reconciled once frontend work on this starts.
- **Mobile (`kluvs-mobile`) adoption** — Android's `Type.kt`/`Theme.kt` currently borrow Material 3's `Typography`/`ColorScheme` slots directly; none of this family/modifier model is implemented there yet. See `CLAUDE.md`'s pending-propagation list.
