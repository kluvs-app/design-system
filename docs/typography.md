# Typography

A finite set of type "families" — each a fixed shape (font-family + weight + default style), with one to three named sizes ("rungs": small / medium / large) where real usage justifies more than one size. Two modifiers, `feature` and `highlight`, apply on top of specific families instead of being tiers of their own. See `tokens.json`'s `typography` object for the machine-readable version of everything below.

Naming is Material-*flavored* (small/medium/large rungs; Body, Label, Headline) without being Material-*shaped*: there is a register switch (serif vs. sans) and an italic modifier that Material has no concept of.

## Families

| Family | Font | Weight | Default style | Rungs (px) | `feature` (italic)? | `highlight` (step-up)? |
|---|---|---|---|---|---|---|
| **Display** | Serif | Bold | Roman | S 48 · M 64 · L 96 | marketing hero only | — |

**Display usage today:** only **Display S (48px)** is in use — the marketing hero (stepping up from Headline L on narrow widths). **Display M (64) and Display L (96) are reserved and unused**: they were tried on the web hero and masthead and are too large. Do not use them; if a layout seems to need one, ask for a DS update.
| **Headline** | Serif | Medium | Roman | S 30 · M 34 · L 40 | ✅ | plausible, unconfirmed |
| **Title** | Serif | Medium | Roman | S 15 · M 19 · L 24 | ✅ (heavily used) | ✅ confirmed |
| **Body** | Sans | Regular | — | L 16 · M 14 | — | — |
| **Caption** | Sans | Regular | — (muted color baked in) | 13 | ✅ | — |
| **Eyebrow** | Sans | Medium | Uppercase, 0.14em tracking | 11 | — | — |
| **Label** | Sans | Medium | Sentence case | 14 | — | — |
| **Fine print** | Sans | Regular | — (muted) | 12 | — | — |
| **Mono** | Mono (system stack) | Regular | — | 13 | — | — |

### Display, Headline, Title — identity content (serif)

These three are "this text names or identifies something," in decreasing scope: Display is page/hero-level editorial text with room to breathe (marketing hero); Headline is "this whole page is about X" (a profile name, a big stat number — a number is not a separate tier, it's a Headline rung applied to numeric content); Title is card/row-level identity (a club name in a list, a book title, a session title).

**`feature` (italic) on Headline/Title:** roman = structural identity ("this is the name of the thing"), italic = "this is the featured/current thing" — a book title, the active reading session, an empty-state headline ("Start reading together."). It is a font-*style* flip only — no change to size or weight.

**`highlight` (step up one rung) on Title:** for the single emphasized instance in an otherwise-repeating list — e.g. the next/upcoming discussion in a timeline of past and future ones. It reuses an existing rung one step up in the *same* family; it does not create a new value. Confirmed on Title; plausible but unconfirmed on Headline.

### Body, Caption — reading content and metadata (sans)

Body is plain prose — author names, list content, anything actually being *read*. Caption is smaller, secondary-colored metadata (counts, timestamps, "40% complete") — the color is baked into the family, unlike Body which takes color from context. Caption also takes the `feature` modifier for short muted italic notes (e.g. "Nothing here yet."). Note: the "N books in progress" aside is **Title S + `feature`**, not Caption — that is what mobile ships.

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

- **`feature`** — a boolean per rung: roman ↔ italic. Applies to Headline, Title, Caption, and to Display **only for the marketing hero** (the web landing/Discord hero is bold italic). Does not apply to other Display uses, Body, Eyebrow, Label, Fine print, or Mono (no observed case, and for the all-caps/tabular families there's no register to flip in the first place).
- **`highlight`** — a *usage rule*, not a token: render this one instance of a repeating list one rung larger within its own family. Confirmed on Title (the "next" item in a discussion timeline). Creates zero new values — it just reuses a size that already exists for another purpose.

Combining both modifiers on the same text run is untested — no real case has needed it yet.

## Cross-platform sizing

**The numeric scale is universal — every platform uses the same numbers for a given rung.** A platform differs in *which rungs it reaches for*, never in what a rung is worth. Concretely: `display.medium` is 64px whether it's rendered on a desktop browser or (hypothetically) referenced from mobile — but mobile screens don't have room for Display at all, so mobile clients simply never use that family, capping their biggest identity text at `headline.large` (40px) instead. This is the same principle behind Apple's Human Interface Guidelines keeping one fixed Dynamic Type ramp across iPhone and iPad (bigger screens get more layout — more columns, more whitespace — not bigger type), and how systems like IBM Carbon or Shopify Polaris handle responsive type: swap *which named style applies* at a breakpoint, never let the same name silently mean two different sizes.

Practical implication: Android and iOS should never invent their own pixel values for a family/rung that already has a defined size here — if a size doesn't fit, that's a signal to either use a different (adjacent) rung, or that a genuinely new rung is needed across *all* platforms, not just the one being implemented.

## Where each family is used

The canonical role → family map. Clients use this; they do not look at each other's code. (Derived from the shipped mobile screens; if a real screen needs something not listed, ask for a DS update rather than inventing a mapping.)

| Role | Family |
|---|---|
| Screen / page title (Clubs, Me, Join, Statistics heading) | Headline S (L for the profile name and stat numbers) |
| Hero identity of one featured thing (book detail title, auth masthead) | Headline S + `feature` |
| Empty-state headline; featured item on Overview / Up Next | Title L + `feature` |
| Card or list title (club in a list, active session, author section) | Title M |
| No-data heading; shelf row title | Title M + `feature` |
| Compact title (book card title, reading-log entry) | Title S (roman) |
| Featured row in a list (member row, own-progress row, "N books in progress", club list row, auth footer link text) | Title S + `feature` |
| Reading content (account/legal text, member names) | Body L |
| General supporting text, form and sheet copy | Body M |
| Metadata (book card author/year, counts, hints, snackbar/error banner text, progress rows, Up Next date) | Caption |
| Short muted italic note ("Nothing here yet.") | Caption + `feature` |
| Section headers, menu titles, sheet titles, badges | Eyebrow |
| Buttons, nav items, dropdown value, offline banner | Label |
| Credits, version, trigger pill text | Fine print |
| Share codes, ISBNs, dates in a tabular column | Mono |
| Marketing hero (landing, Discord page) | Headline L on narrow widths, Display S (+ `feature`, allowed here only) from `sm` up |
| Desktop club masthead | Headline L |
| Marketing section headings and FAQ headings | Headline M (S on narrow widths) |
| Sub-section titles under a page title (FAQ categories) | Title L |
| Page title on web | Headline S, stepping up to Headline M at `lg`; mobile stays Headline S |
| Secondary handle / role line under a name (sidebar, menus) | Caption |

### Web differences from the table above

Web may use a different existing rung than the table where listed here. No new sizes — every entry is a rung from this scale. Width-based entries use the `lg` breakpoint; other widths (tablet, foldables) reuse them or add their own entries.

**Depends on width:**

| Role | Narrow | `lg` and up |
|---|---|---|
| Page title | Headline S | Headline M (Clubs, Books, club name: Headline L) |
| Book card author / year | Fine print | Caption |
| Discussion card title | Title M | Title L |
| Empty-state headline (italic) | Headline S | Headline M |

**All web widths:**

| Role | Web uses | Table says |
|---|---|---|
| Secondary handles, counts, hints, form hints | Fine print | Caption |
| Member names | Label | Body L |
| Menu items (kebab menu) | Caption | Label |
| Book detail title | Title M + `feature` | Headline S + `feature` |
| Bottom-nav labels | Fine print | — |

## Line height and tracking

Every family carries a line height and tracking in `tokens.json` (`typography.family.<family>.line-height` / `.tracking`), alongside size and weight. All three platforms use these exact values, so a given family/rung renders the same shape everywhere.

| Family | Line height (px) | Tracking |
|---|---|---|
| Display S / M / L | 52 / 68 / 100 | 0 |
| Headline S / M / L | 36 / 40 / 46 | 0 |
| Title S / M / L | 20 / 24 / 30 | 0 |
| Body L / M | 24 / 20 | 0.5px / 0.25px |
| Caption | 18 | 0.2px |
| Eyebrow | 16 | 0.14em |
| Label | 18 | 0.1px |
| Fine print | 16 | 0.4px |
| Mono | 18 | 0 |

Line heights are absolute px, not ratios — web must not substitute `leading-snug`, `leading-5` or similar. Eyebrow is the only tracking expressed in `em`; the rest are px (points on iOS). These values were captured from the shipped Android/iOS implementation (which already agree with each other) and made canonical; web adopts them.

**Exception — long-form paragraphs on web.** Multi-line prose set in Body M (the book description and author bio) may use a 1.7 line height (`leading-[1.7]`) instead of 20px. This is the only sanctioned override; it applies to those long-form paragraphs on web, not to short Body text, other families, or other platforms.

## Mapping off-scale text

Rules for migrating existing UI (any platform) onto the families. The goal is that **every piece of text is a family/rung** — no raw px, no framework default sizes (Tailwind `text-sm`, etc.).

| Existing text | Maps to |
|---|---|
| Sans 14px on buttons, nav, menu items, names, or anything medium/semibold | **Label** |
| Sans 14px, other prose | **Body M** |
| Sans 15px prose | **Body M** (1px snap) |
| Sans 15px on a button | **Label** — button container/weight parity (15px/600 primary) is the Button spec's job, not typography's |
| Sans 16–18px | **Body L** |
| Sans 12px, Tailwind `text-xs` | **Fine print** |
| Sans 13px | **Caption** |
| Sans 8–10px (count badges, tiny metadata, diagram labels) | **Fine print**; **Eyebrow** if uppercase. The floor is 11px — nothing smaller exists |
| Uppercase + tracked text at any size | **Eyebrow** |
| Serif sizes | Nearest Headline/Title rung — **by role, not raw size**: page titles are Headline, Display (S only) is marketing hero only |
| Serif italic | add `feature` (Headline/Title only) |
| "N books in progress" aside | **Title S + `feature`** (matches mobile `ShelfSection`) |
| Short muted italic note ("Nothing here yet.") | **Caption + `feature`** |
| Serif italic (book titles, featured/current item, empty-state headlines) | **Headline or Title + `feature`** — this is the main use of italic; keep it |
| Any monospace (dates, ISBNs, IDs, handles) | **Mono** (13px) |
| Emphasized item in a repeating list | one **Title** rung up (`highlight`), e.g. next = Title L, rest = Title M |

**Weight:** the family sets it. Do not add `font-semibold`/`font-bold` on top — Bold (700) is Display-only; Medium covers all emphasis elsewhere.

**Responsive:** the scale is the same on every breakpoint; a layout may switch *rungs* (e.g. Title M → Title L at `lg`, Headline S → Headline M for web page titles) but never invents intermediate sizes.

**Not typography — leave alone:**
- Avatar initials — sized per Avatar spec (`docs/avatars.md`: 8/10/12/35/45px).
- Icon glyph sizes (Material Symbols `fontSize`/`!text-[18px]`).

**Cross-platform parity:** `tokens.json` is the only source of sizes and weights; web (`t-*` classes), Android (`KluvsTypography`) and iOS (`KluvsTypography.swift`) must all resolve the same family/rung to the same px and weight. Rungs a platform reaches for may differ (mobile never uses Display); values — size, weight, line height, tracking — may not.

## Open items / not yet decided

- **`label.large`** — hypothesized (possibly button-adjacent), not yet backed by a real observed case. Don't add it speculatively.
- **`highlight` on Headline** — plausible (would parallel the Title case) but unconfirmed; no real screen has exercised it yet.
- **Mono typeface** — currently system-stack only; a deliberate typeface choice (and possibly a bundled webfont/mobile font file) is future work, not yet scheped.
