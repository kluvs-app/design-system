# Changelog

All notable changes to the Kluvs Design System are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html) — adapted for design systems:

| Bump | When |
|---|---|
| **MAJOR** | Breaking token renames, removed components, color value changes that affect rendered output |
| **MINOR** | New tokens, new components, new assets — backwards-compatible additions |
| **PATCH** | Documentation corrections, discrepancy fixes, non-visual tweaks |

---

## [Unreleased]

## [2.7.0] — 2026-08-25

### Added — Snackbar

- **`docs/states.md`** — Snackbar spec (§4): transient bottom-anchored feedback, Success/Danger
  variants, opaque fill + `onAccent` icon/text, 4s auto-dismiss, no action slot. Formalizes the
  standard surface for all transient feedback app-wide, replacing per-screen ad hoc
  banners/toasts. Also updates the Error state to reuse the Fragmented Hex Grid shell.
- **`preview/components-states.html`** — Snackbar showcase card (Success/Danger), matching the
  `kluvs-mobile` `KluvsSnackbar` implementation.
- **`docs/states.md`** — Empty Shelf now uses the Fragmented Hex Grid pattern in place of the
  earlier Stacked Covers treatment (`assets/illustration-empty-hexagons.svg`).

### Added — Assets

- Showcase avatars and book covers for beta store listing assets, including a new Quixote book
  cover.
- Android `LoadingSpinner` clipping and linear-only easing fix.

### Added — Docs

- **`docs/inputs.md`** — documents `PasswordField` and `InputField` keyboard actions.

### Fixed — Repo tooling

- **`SKILL.md`** — the `docs/` read list only named 5 of 13 guides; added the missing entries
  (`states`, `buttons`, `cards`, `inputs`, `dropdowns`, `avatars`, `book-cover`, `members`).
- **`preview/colors-roles.html`** — removed. Hardcoded role-color hex values had drifted from
  the current tokens (owner and admin both stale), the card was orphaned (not linked from
  `index.html`'s nav), and the pattern it showed (avatar ring/badge) has been superseded by the
  Role Eyebrow, already correctly shown in `components-members.html`.
- **New: `.claude/commands/repo-audit.md`** — internal skill (`/repo-audit`) that checks release
  hygiene, token/doc consistency, preview showcase coverage, asset usage, and README/CLAUDE.md
  fact drift. Read-only; reports findings without fixing.

## [2.6.0] — 2026-07-24

### Added — Color role layer (docs only)

- **New: `docs/colors.md`** — semantic color-role model (`background`, `bar`, `card`, `cardAlt`,
  `divider`, `content`, `contentMuted`, `labelVariant`, `placeholder`, `disabled`, `accent`,
  `onAccent`, `secondary`, `tertiary`, `danger`, `success`, plus subtle variants), mapping each
  role to its raw dark/light token. Formalizes the role layer that `kluvs-mobile`'s Android
  `:designsystem` module (`KluvsColors`/`KluvsTheme.colors`) now implements, mirroring how
  `docs/typography.md` formalized the family/rung/modifier model.
- **`CLAUDE.md`** — `docs/colors.md` added to the file map; pending-propagation section updated
  with the Android color-role-layer status (shipped in `:designsystem`, not yet propagated to
  every `composeApp` call site; web and iOS role layers not started).
- **`SKILL.md`** — `docs/colors.md` added to the per-component read list (parallel to
  `docs/typography.md`); non-negotiable light-surface swatch corrected from a stale placeholder
  (`#FAFAFC`→`#FFFFFF`) to the real cream scale (`#F2EDE5`→`#F6F0E7`→`#FAF6EF`→`#E8DECC`).
- Flagged, not fixed: light-mode `labelVariant` has no named `--kluvs-*` custom property yet in
  `colors_and_type.css` — only a comment describing the dark/light inverse pairing.

### Added — Component docs (mobile-driven, backfilled from `kluvs-mobile` Android build-out)

- **Dropdown** (`docs/dropdowns.md`, new) — pill-shaped value-selector pattern (trigger +
  popover option list), split out as its own family distinct from Pills and Segmented Control.
- **Pills** (was "Pill Button") split into two independent components: `TriggerPill` (one-shot
  action, transient success state) and `TogglePill` (persistent binary icon toggle).
- **Segmented Control** entries named to their concrete components: `ToggleControl` (filled
  Track-By variant) and `AttendanceControl` (status-icon RSVP variant).
- **Buttons** — Secondary/Outlined reframed as two independent standalone components
  (`SecondaryButton` copper / `OutlinedButton` grey) instead of one component with two states,
  matching the real Android implementation; documents `TextButton`'s `emphasized` flag and adds
  `IconButton` as a fifth entry (tappable icon, not part of the filled/outlined/text hierarchy).
- **Inputs** split into `InputField` (editable — plain, prefix/suffix, multiline, keyboard type)
  and `PickerField` (read-only, opens a picker on tap, drops the raised background to signal
  "tap, don't type").
- **SearchField** documented — label-less filter-as-you-type field, distinct from `InputField`
  (always labeled) and from the separate, unbuilt search-and-select combobox (reserved package
  name `.search`, distinct from `.fields`).
- **Reading Progress** clarified: `ProgressBar` (primitive, no gap/stop-indicator dot) vs.
  `OwnProgressRow` (composite) — the gap/dot being the actual Android M3 `LinearProgressIndicator`
  default-styling bug this distinction was written to prevent.
- **Top Bar** — `TopAppBar`/`SearchTopAppBar` documented as the canonical editorial
  eyebrow+title header (two-modality: title present = two-row, absent = single-row), grounded in
  real web masthead patterns (Profile/Club/Books) and mobile's existing `ClubsScreen` header. The
  wordmark/avatar/kebab persistent chrome bar is retained alongside it as a separate, coexisting
  component (a prior pass mistakenly framed `TopAppBar` as replacing it).
- **Modal** — `ConfirmationDialog`/`BottomSheet`/`BottomSheetFooter`/`DangerZoneBox` named
  inline; documents the deliberate Android platform adaptation (plain tinted text buttons in
  `ConfirmationDialog`, matching native `AlertDialog` convention, vs. web's filled-button footer)
  and that both components use the warm-dark "bar" surface tier, distinct from the "card" tier
  already claimed by inputs/cards.
- **Navigation** — new §2 "Action Menu" section documents `ActionMenu`: a small anchored popover
  distinct from `Dropdown` (persisted value vs. one-shot command) and from the Top Bar/Modal
  families (no header/body/footer shell, no scrim); Eyebrow-styled items, real usage capped at
  1-3 plain-text actions. Remaining Navigation sections renumbered to stay sequential.
- `Rename spinner's Compose sample from KluvsSpinner to LoadingSpinner` — matches the
  no-app-prefix naming convention already established for `Icon` and the button family.
- **Docs are prescriptive, not trackers**: dropped "Android has X" / "not yet implemented on Y"
  adoption-status annotations from `buttons.md`/`typography.md` — that status belongs in
  `CLAUDE.md`'s pending-propagation notes, not in specs client repos and agents read as the
  canonical build target.

### Removed

- `preview/components-modal.html` — stale, unreferenced duplicate of `components-modals.html`
  (hardcoded hex colors, no light/dark toggle, predates tokenization). Confirmed orphaned before
  deletion: no link from `index.html` or any other preview page.

## [2.5.0] — 2026-07-22

### Added — Typography v2: family/rung/modifier model (docs only, not yet propagated)

Retires the four-tier (`tier.1-section-header`→`4-fine-print`) / type-scale split, which mapped Kluvs values directly into Material 3's `Typography` roles and lost real distinctions Material has no concept of (register-switching between serif/sans, italic-as-emphasis). Derived from a ground-up audit of `kluvs-frontend`'s actual authenticated app screens (Profile, Clubs, Club Detail, Books, Discussions, Members, all modals) — not from the design system's prior docs, which turned out to be mostly dead code the frontend never imported, and not from frontend's own shipped implementation either, which was itself inconsistently applied. This is a normalization of real recurring shapes, not a transcription of an existing clean system.

- **New: `docs/typography.md`** — full model: 9 families (Display, Headline, Title, Body, Caption, Eyebrow, Label, Fine print, Mono), each a fixed font/weight/style shape with 1–3 sized rungs (S/M/L), plus two modifiers layered on top instead of being their own tiers — `feature` (roman→italic register flip; Headline/Title/Caption) and `highlight` (step up one rung within the same family for the singular emphasized item in a repeating list; confirmed on Title, creates no new token). Documents the cross-platform sizing principle: the numeric scale is universal, platforms differ in which rungs they reach for (mobile never uses Display), not in what a rung is worth.
- **`tokens.json`** — `typography` object restructured: `tier`/`scale` replaced by `family` (the 9 families above) and a new `modifier` object (`feature`, `highlight`). Added `font-family.mono` (system-stack placeholder, no dedicated typeface chosen yet).
- **`index.html`** — Typography section rebuilt to preview the new families and both modifiers directly (roman-vs-italic and step-up-highlight shown side by side), replacing the old Content Tiers / Type Scale cards.
- **`README.md`** — Typography section rewritten to point at `docs/typography.md`; eyebrow spec corrected to match real usage (11px / 0.14em — the old text said 12px/`helper-sm`/0.1em, which didn't match any real instance found in the audit).
- **`SKILL.md`** — `docs/typography.md` added to the per-component read list, flagged as relevant whenever any text style is being implemented, not only when typography is explicitly the task.
- **`CLAUDE.md`** — pending-propagation note corrected (Android's `Type.kt`/`Theme.kt` already bundle both fonts and a full M3 scale, contradicting the previous note that it "only defines bodyLarge"/"uses system fonts" — the real gap is that it's Material-*shaped*, not incomplete) and repointed at this new model.
- **Not yet done, by design**: `colors_and_type.css`'s `.kluvs-*` typography classes and `kluvs-frontend`'s `tailwind.config.js` `fontSize` keys both still reflect the pre-v2 model — reconciling those is separate follow-up work (Android or web adoption), deliberately sequenced after this spec, not bundled into it.

## [2.4.0] — 2026-07-18

### Added — Android screen composition patterns, formalized from the kluvs-mobile screen audit

`kluvs-mobile`'s Android target has shipped Clubs and Me with no documented screen-composition rules — the following formalizes the decisions made while planning its five core screens (Me, Clubs list, Club detail, Book Shelves, Book Search) against the more feature-complete `kluvs-frontend` mobile-web experience. Token propagation to `kluvs-mobile` (see `CLAUDE.md`'s pending-propagation list) and the actual Compose implementation are separate, not-yet-scheduled work — this release is docs only.

- **`docs/navigation.md`** — new sections: Top Bar contextual modes (Root vs. Detail, derived from back-stack depth, not set per-screen), Bottom Nav destination-set rule (a screen earns a tab only if it's a true top-level always-reachable destination — Books qualifies, Book Search does not), Floating Action Button usage (primary creation actions on a list-root screen use a FAB, not a top-bar icon, to avoid conflating "create" with the top bar's "utility" slot), and Screen-level shortcuts that skip a modal entirely (OS image picker for avatar change, inline tap-to-edit for short fields, OS share sheet for sharing, inline stepper for small numeric bumps alongside the full-precision sheet).
- **`docs/modal.md`** — new "Applied decisions" table under the existing Mobile section, mapping every Clubs/Books/Me create/edit/delete action to sheet vs. dialog vs. inline, including the corrected call on the discussion "food for thought" note (bottom sheet, drag-to-expand — it holds structured lists and cross-references, not a caption).
- **`SKILL.md`** — `docs/navigation.md` added to the per-component read list (was previously unlisted despite existing).

### Added — 1:1 Dark/Light surface and foreground parity

The Color section's dark and light panels are now structured as direct mirrors of each other, role for role, with exactly 6 swatches each — no extra, unmirrored colors on either side, and one consolidated name per token.

- **New light surface tokens**: `--kluvs-surface-light-bar` (`#F6F0E7`, mirrors `warm-dark-bar`) and `--kluvs-surface-light-accent` (`rgba(209,109,48,0.04)`, mirrors `warm-dark-accent`). `--kluvs-surface-light-deep` (`#E8DECC`) is now framed as the light "Nav" surface (mirrors `warm-dark-nav`).
- **Retired `--kluvs-surface-light-elevated` (`#F0E9DC`)** — it was the one unmirrored "extra" light color, used only for input wells. Dark already reuses its Card tier (`--kluvs-warm-dark-card`) for input wells, so light now does the same: input fields, the input-mock preview, and disabled-input states all use `--kluvs-surface-light-raised` (Mayonnaise). The avatar-stack overflow chip and bottom-nav, which used the old elevated token for different reasons, now use `--kluvs-divider-light` (Hairline, mirrors dark's Card-2 usage) and `--kluvs-surface-light-deep` (Nav, mirrors dark's Nav usage) respectively. The `--kluvs-surface-muted` back-compat alias (book cover / cover placeholder) now points to `--kluvs-surface-light-bar`, mirroring their dark `--kluvs-warm-dark-bar` usage.
- **`--kluvs-divider-light` changed from `#E0E0E0` (cool grey) to `#E5DCCB`** (warm, mirrors `warm-dark-card-2`/hairline). Propagated to `colors_and_type.css`, `tokens.json` (4 component specs referencing `color.light.divider`), `preview/components-modals.html`, `preview/components-states.html`, `preview/components-inputs.html`.
- **New light foreground tokens**: `--kluvs-content-light-tertiary` (`#7A6C5E`), `--kluvs-content-light-placeholder` (`#9A8C7E`), `--kluvs-content-light-disabled` (`#C2B6A8`) — mirror `warm-fg-tertiary`/`placeholder`/`disabled`. The existing Cream/Dark-Chocolate label swap fills the "Label" role on both sides.
- **Consolidated swatch names** — every dual-named swatch now has one name, shared by both modes: "Card 2 / Hairline" → **Hairline**, "Label / Variant (...)" → **Label (...)**, "Tertiary / Meta" → **Tertiary**.
- **`index.html`**: removed the outdated "— Mobile / Product" subtitle from "Warm Dark Surfaces"; added Primary (`#FFFFFF`)/Secondary (`#B0B0B0`) swatches to "Warm Foreground" so it has 6 roles matching the new light panel; split the old mixed "Light Surfaces" card into a 6-swatch "Light Surfaces" panel (Nav, Base, Bar, Card, Hairline, Accent Fill) and a new 6-swatch "Light Foreground" panel (Primary, Secondary, Label, Tertiary, Placeholder, Disabled) — both now directly comparable, swatch-for-swatch, with their dark counterparts.
- `tokens.json` — added `color.light.bar`, `color.light.accent-fill`, `color.foreground-light.label-variant`/`tertiary`/`placeholder`/`disabled`; renamed `color.light.elevated` → `color.light.deep` and removed `color.light.raised` (`#F0E9DC`, the retired token); updated `color.light.divider`.

### Fixed — Light Surfaces/Foreground cards and Member role swatch

- **`.card-pinned-light` now always renders on a Cream background**, in both page modes. Previously it only pinned to Cream when the page itself was in dark mode (`main.dark-surface .card-pinned-light` override); in light mode it fell through to the default `.card` background (Mayonnaise), so the "Light Surfaces"/"Light Foreground" panels' base color changed depending on the page's own surface toggle — same bug the rest of this release was fixing, just on the light side. `site.css`.
- **Reordered Roles & Status**: Member now sits right after Admin (was last, after Success).
- **Member swatch now actually swaps color with the page surface** — cream (`#F2EDE5`) on dark, dark chocolate (`#140F0D`) on light, matching `--kluvs-role-member-label`'s real behavior — instead of a static cream swatch with a "#F2EDE5 on dark · #140F0D on light" caption. New `.swatch-role-member` rule in `site.css`.

### Added — formalizing patterns from `kluvs-frontend`

`kluvs-frontend` has shipped ~30 PRs since v2.2.0. The following new patterns and discrepancies were audited and formalized:

- **`component.read-ribbon` / `component.read-badge`** in `tokens.json`, `.kluvs-read-ribbon`(`--compact`/`--full`) and `.kluvs-read-badge` classes in `colors_and_type.css`, plus `docs/read-indicators.md` and `preview/components-read-indicators.html` — covers the "read"/finished book indicators (`KluvsReadRibbon`, `KluvsReadBadge`) shipped in the frontend.
- **`component.button.secondary`** in `tokens.json` + `.kluvs-btn-secondary` (`--sm` modifier) in `colors_and_type.css` — documents the ghost/outlined secondary button pattern (frontend's `GhostButton`) alongside the existing primary button spec.
- **`--kluvs-role-admin-on-dark`** (`#7BA8B8`) and **`--kluvs-role-member-label`** (`#48A480`) — new role-label text colors. `--kluvs-role-admin` (`#006781`) fails AA as text on dark and should only be used for the badge/dot; admin label text and member label text needed their own tokens.
- **`color.status.success-subtle`** / `--kluvs-success-subtle` (`rgba(72,164,128,0.15)`) — success tint for pressed states (e.g. "yes" in a segmented RSVP control), mirroring the existing danger/primary subtle tokens.

### Propagated to `kluvs-frontend`

- `tailwind.config.js` — added `role.admin` (`#006781`), `role['admin-on-dark']` (`#7BA8B8`), `role['member-label']` (`#48A480`), matching the new DS role tokens. `success`/`danger` Tailwind colors already existed and now back the success/danger token aliases.
- `RoleEyebrow.tsx` — replaced hardcoded `#C9900A`/`#7BA8B8`/`#48A480`/`#006781` with `text-role-owner`/`text-role-admin-on-dark`/`text-role-member-label`/`bg-role-owner`/`bg-role-admin`.
- `AttendanceControl.tsx` — replaced raw `green-500`/`red-500`/`green-400`/`red-400` with `success`/`danger` (using Tailwind's `/opacity` modifier for the subtle tints, equivalent to `--kluvs-success-subtle`/`--kluvs-danger-subtle`).

### Added — second pass of composite patterns from `kluvs-frontend`

- **`docs/composite-components.md`** + **`preview/components-composite.html`** — formalizes six more shipped patterns:
  - **Avatar / Avatar Stack** (`component.avatar`, `component.avatar-stack`) — generated avatar (10-color hue palette, sizes sm–2xl) and the overlapping member-avatar row with `+N` overflow chip. `.kluvs-avatar`, `.kluvs-avatar-stack` in `colors_and_type.css`.
  - **Progress Bar** (`component.progress-bar`) — the *currently shipped* `ProgressRow` (4px fill bar + label row + secondary "Update" action). `.kluvs-progress-track` / `.kluvs-progress-fill`. Explicitly scoped to today's version — `preview/explore-reading-progress.html` redesign is still undecided.
  - **Pill Button** (`component.button.pill`) — tiny rounded-full outlined chip (e.g. "Copy Club ID") with a transient success state. `.kluvs-btn-pill` / `.kluvs-btn-pill--success`.
  - **Segmented Control** (`component.segmented-control`) — generalizes two shipped patterns: the filled Track-By (Page/Percent) toggle and the icon-only, status-tinted RSVP control. `.kluvs-segmented`, `.kluvs-segmented--icon`.
  - **Role Eyebrow** (`component.role-eyebrow`) — uppercase role label + optional dot, using the new role-label tokens from the previous entry. `.kluvs-role-eyebrow`. **Supersedes** the avatar-ring + corner-dot pattern in `preview/components-member-row.html`, which was never shipped.
  - **Empty States + Book Cover Placeholder** (`component.empty-state`, `component.book-cover-placeholder`) — page-level "nothing here" state (stacked tilted placeholder covers + italic heading + body + CTA) and the single-cover diagonal-stripe "no cover" fallback. `.kluvs-empty-covers`, `.kluvs-empty-heading`, `.kluvs-empty-body`, `.kluvs-cover-placeholder`.

### Fixed — light-surface support for second-pass composite patterns

The second pass above shipped with hardcoded dark-stack tokens (`--kluvs-divider-dark`, `--kluvs-content-dark-*`, `--kluvs-surface-dark-elevated`) and no light-surface equivalents — Kluvs is dark-first, not dark-only, and these components needed to work on light surfaces too.

- Added `[data-surface="light"]`-scoped overrides in `colors_and_type.css` for `.kluvs-btn-secondary`, `.kluvs-btn-pill`(`--success`), `.kluvs-segmented`(`--icon`), `.kluvs-progress-track`, `.kluvs-avatar-stack`(`__overflow`), `.kluvs-role-eyebrow--admin`, `.kluvs-empty-covers__cover`, `.kluvs-empty-heading`/`.kluvs-empty-body`, and `.kluvs-cover-placeholder`(`__label`).
- Added matching `light-surface` sub-objects to the relevant `component.*` groups in `tokens.json` (`button.secondary`, `button.pill`, `segmented-control`, `avatar-stack`, `progress-bar`, `role-eyebrow`, `empty-state`(`.stacked-covers`), `book-cover-placeholder`).
- `role-eyebrow--admin`: light surface uses `--kluvs-role-admin` (#006781) directly instead of `--kluvs-role-admin-on-dark` (#7BA8B8), which fails AA on light backgrounds.
- Fixed `.kluvs-segmented--icon` (RSVP variant) stretching to the parent's full `width: 100%` — icon segments now size to content (`width: auto` on the container).

### Site (`index.html`) — restructured to surface new patterns in their natural homes

The standalone "Composite" section dumped all eight second-pass patterns together, dark-only, with no clear identity. Redistributed:

- **Pill Button** + **Segmented Control** → moved into the **Buttons** section (both surfaces), with an annotation clarifying the pill's low-emphasis styling is intentional, not a disabled state.
- **Avatar Stack** → added to the **Avatars** section (both surfaces).
- **Role Eyebrow** → added to the **Members** section (both surfaces), with a note that it supersedes the avatar-ring + corner-badge pattern shown above it.
- **Progress Bar** → de-duplicated. The States section's existing "Currently Reading" bar now uses the real `.kluvs-progress-track`/`.kluvs-progress-fill` classes instead of one-off inline styles, and the standalone Composite copy was removed.
- **Read Indicators**, **Book Cover Placeholder** (renamed "No-Cover Fallback"), and **Empty State** → kept together as a new **"Book Cover States"** section (both surfaces), replacing "Composite". Switched its wrapper from a custom `background:#0A0A0A` box to the standard `.comp-surface-dark`/`.comp-surface-light` cards used everywhere else, fixing the overly-bright divider contrast above the section.

### Fixed — Avatars and Members sections were never accurate to the shipped app

The "Avatar — 3 Roles × 3 Sizes" block used an undefined `.avatar-ring` class (no CSS rule existed anywhere — these rendered as bare, unstyled divs), wrong sizes (48/36/24px instead of the real sm/md/lg/xl/2xl scale), and a role-colored-ring legend that has never existed in `kluvs-frontend`. The Members section showed the same broken `.avatar-ring` plus `role-badge-*.svg` icons that are not used by any shipped member row, with Role Eyebrow demoted to a disconnected swatch list below.

- **Avatars**: replaced `.avatar-ring` with `.kluvs-avatar` (EB Garamond Medium initials, hue-palette backgrounds) at the correct sizes (sm 20px/8px, md 24px/10px, lg 40px/12px, xl 88px/35px), added a hue-palette swatch row, and removed the fictitious role-ring legend. Annotation now explicitly states role is never shown on the avatar.
- **Avatar Stack**: fixed the "+N" overflow chip rendering smaller than its siblings (avatars were 32px, the chip's CSS default is 24px — now both use 24px/md). Added `z-index` stacking (`.kluvs-avatar-stack > *:nth-child(1..4)`, descending) so the first avatar sits on top, matching `ProfilePage`'s `AvatarStack`.
- **Members**: removed `.avatar-ring` and the unused `role-badge-*.svg` icons from MemberRow; rows now use `.kluvs-avatar` (lg, hue colors) with **Role Eyebrow inline at the trailing edge** — matching how `ClubDetailPage` actually places `RoleEyebrow` next to a member's name — instead of as a separate swatch block underneath.
- `tokens.json`: added `component.avatar-stack.stack-order` documenting the new z-index convention, and clarified `component.avatar.$description` that role is never encoded on the avatar.

### Fixed — States section's "Currently Reading" progress bar didn't match the shipped `ProgressRow`

The track had a "47%" label floating at its trailing end — `ProgressRow` doesn't render a bare percentage there at all. The real layout is: track + small secondary "Update" button on one row, then a copper status label (`"X of Y pages"` / `"Z% complete"` / `"Finished"`, depending on the club's tracking type) right-aligned on the row below.

- `index.html` States section now renders `.kluvs-progress-track`/`.kluvs-progress-fill` beside a `.kluvs-btn-secondary--sm` "Update" button, with the "203 of 432 pages" status label below, for both surfaces.
- `docs/composite-components.md` Progress Bar spec rewritten to document the action-beside-track layout and the three status-label variants (page / percent / finished).
- Progress Bar remains documented as its own `component.progress-bar` token group (already the case) but isn't broken out into its own site section — it's shown in context as part of the "Currently Reading" card, which matches how it's actually used.

### Added — Book Cover component formalized

`ui/BookCover.tsx`'s standardized 2:3 cover slot is now a named design system component, with proportionally-scaled read indicators and a redesigned "no cover" fallback.

- **`component.book-cover`** in `tokens.json` + `.kluvs-book-cover` (`--sm` 56×84, `--md` 80×120, `--lg` 128×192, optional `--shadow` modifier) in `colors_and_type.css` — strict 2:3 aspect ratio, `radius.sm`, surface-aware fill/border.
- **Read ribbon rescale** — `.kluvs-read-ribbon--compact`/`--full` renamed to `--sm`/`--md`/`--lg` and resized (12×21 / 16×28 / 24×42) to read as a proportional bookmark (~15–20% of cover width) on each book cover size, instead of two fixed sizes independent of the cover.
- **Hexagon "hive" fallback** — `.kluvs-cover-placeholder` now pairs with an inline tessellating hexagon-grid SVG pattern (instead of a diagonal stripe gradient), stroked with `currentColor` so it adapts per-surface (`card-2` on dark, `divider` on light); `docs/book-cover.md` documents the markup for client repos (don't recreate with CSS gradients).
- New `preview/components-book-cover.html` and `docs/book-cover.md` consolidate Read Indicators + No-Cover Fallback under a single "Book Cover" site section (previously the dangling "Book Cover States"/"Composite" section).

### Changed — Avatar hue palette redesigned with 12 thematic hues

The original 10-color saturated palette (blues/purples/greens) didn't match the warm chocolate/cream Kluvs palette.

- `--kluvs-avatar-hue-0` through `-11` — 12 chocolate tones on dark surfaces, 12 cream tones on light surfaces (`[data-surface="light"]` override), plus `.kluvs-avatar--hue-0..11` and `.kluvs-avatar--primary` classes.
- `component.avatar.hue-palette` in `tokens.json` updated to the 12-entry palette (`userId % 12`); `docs/avatars.md` updated to match.
- Avatar initials color now resolves to `--kluvs-warm-fg-primary` / `--kluvs-content-light-primary` instead of hardcoded `#FFFFFF`, so it adapts per-surface.

### Changed — Site overhaul: high-fidelity component sections with reactive previews

- Each component group (Navigation, Buttons, Inputs, Cards, Avatars, Members, States, Modals, Book Cover) is now its own top-level `<section>` with an eyebrow/title/description, replacing the single catch-all "Components" section and its inline `.comp-group-title` headers.
- Removed the static `.comp-anno` description blocks beneath each preview — component specimens in `preview/*.html` are now self-contained and reactive to the surface toggle.
- `site.js` — added a preview-embed loader: fetches `preview/*.html`, rewrites `../assets/` → `assets/` for production, renders into a shadow root with `colors_and_type.css` injected, and syncs `data-surface` with the site-wide dark/light toggle.

### Removed — deprecated mobile UI kit and Lucide placeholders

`ui_kits/mobile/` was an early Figma-generation artifact, superseded by the shipped `kluvs-frontend`/`kluvs-mobile` code as the source of truth for formalizing patterns.

- Deleted `ui_kits/mobile/` (`components.jsx`, `screens.jsx`, `ios-frame.jsx`, `index.html`) and all references in `CLAUDE.md`, `README.md`, `SKILL.md`, and `tokens.json`.
- Removed the Lucide-as-placeholder notes in `README.md`/`SKILL.md`/`tokens.json` — Material Symbols (weight 600, Grade 0, 24px SVG) is the sole canonical icon system, with no remaining caveats.

### Docs — modularized into per-component files, 1:1 with site sections

- Split `docs/composite-components.md` and `docs/read-indicators.md` into nine per-component guides: `docs/avatars.md`, `docs/book-cover.md`, `docs/buttons.md`, `docs/cards.md`, `docs/inputs.md`, `docs/members.md`, `docs/modal.md`, `docs/navigation.md`, `docs/states.md`.
- `CLAUDE.md` and `README.md` file maps updated to list the new per-component docs instead of the two combined files.

### Changed — light surfaces redesigned from white/grey to a cream scale

- `--kluvs-surface-light` (`#FFFFFF` → `#F2EDE5`, cream), `--kluvs-surface-light-raised` (`#FAFAFC` → `#FAF6EF`, mayonnaise), `--kluvs-surface-light-elevated` (`#F5F5F5` → `#F0E9DC`), and new `--kluvs-surface-light-deep` (`#E8DECC`) — light mode now mirrors the warm-dark scale (dark-chocolate base / chocolate raised) using a cream base / mayonnaise raised pairing instead of neutral white/grey. Back-compat aliases (`--kluvs-surface-default`, `--kluvs-surface-card`, `--kluvs-surface-muted`) updated to match.
- `.kluvs-avatar` text on `[data-surface="light"]` now uses `--kluvs-warm-dark-base` (`#140F0D`, dark chocolate) instead of `#1A1A1A` — the inverse of the dark-mode pairing, where the same role uses cream (`#F2EDE5`) text on a dark-chocolate background.
- `tokens.json` — `color.light` group updated to the cream scale with descriptions documenting the inverse relationship to `color.warm-dark`; `component.avatar.initials` updated to describe the cream/dark-chocolate swap.
- Propagated across `index.html` (Light Surfaces swatches, Accessibility table contrast pairings recalculated against the new cream background), `site.css` (shell, chips, cards, status tables, inputs, `.card-pinned-light`), and all light-mode component previews (Navigation, Modals, Inputs, States, Cards, Members, Avatars, Buttons, Composite, Book Cover) — replacing hardcoded `#FFFFFF`/`#F5F5F5`/`#FAFAFC` backgrounds with the new surface tokens. Navigation's bar hierarchy (shell/bars/bottom-nav) now mirrors the dark-mode layering using cream → mayonnaise → deeper-cream tones.
- Recalculated WCAG contrast ratios for cream-background text pairings: Near-black on Cream 14.94:1 (AAA), Secondary text on Cream 4.93:1 (AA), Admin Teal on Cream 5.54:1 (AA), Error Red on Cream 3.23:1 (Exception, unchanged rationale), Gold on Cream 1.49:1 (by design).

### Named the brand palette and fixed a primary-text mislabel

- **Color naming** — Brand and role colors now have human-meaningful names alongside hex values, documented in `index.html`'s Color section: Primary = Copper (`#D16D30`), Secondary = Jade (`#48A480`), Tertiary = Teal (`#006781`), Dark Chocolate (`#140F0D`), Chocolate (`#241C17`), Cream (`#F2EDE5`), Mayonnaise (`#FAF6EF`), Owner = Mustard (`#C9900A`), Admin = Teal (same as Tertiary), Danger = Coral (`#EF4444`), Success = Jade.
- **Fixed Owner swatch** — the "Owner" swatch in `index.html` rendered the old gold `#EFBF04` while its label already said `#C9900A` (Mustard); the swatch now matches the label. `CLAUDE.md`'s "Pending propagation" note about Gold `#EFBF04` updated to reflect that the canonical owner color is Mustard `#C9900A` (mobile/iOS `Color.kt`/`Colors.swift` still need updating to match).
- **`--kluvs-role-member-label`** changed from Jade (`#48A480`) to Cream (`#F2EDE5`) on dark / Dark Chocolate (`#140F0D`) on light — same swap as avatar initials. Updated in `colors_and_type.css`, `tokens.json`, `docs/members.md`.
- **Fixed primary-text mislabel** — `--kluvs-warm-fg-primary` (`#F2EDE5`, Cream) was documented as "primary body text" on dark surfaces, but `kluvs-frontend` (source of truth) uses white (`#FFFFFF`) for primary dark text; Cream is actually the label/variant/accent role (wordmark, avatar initials, member role label, input labels, card subtitles), which inverts to Dark Chocolate (`#140F0D`) on light. Retired `--kluvs-warm-fg-label` (`#C9BDA8`, unused in `kluvs-frontend`) entirely — its three usages (card subtitles, input labels, modal labels, avatar-stack overflow) now use the cream/dark-chocolate label-variant pairing instead. Updated `colors_and_type.css`, `tokens.json`, `site.css`, `README.md`, and affected previews (`components-cards.html`, `components-inputs.html`, `components-modals.html`).
- Fixed two more leftover `#F5F5F5`/`#FFFFFF` light-mode backgrounds found during this pass: `.kluvs-avatar-stack__overflow` now uses `--kluvs-surface-light-elevated` / `--kluvs-surface-light-raised`.

### Known follow-ups

- **Token-naming consolidation** — adopt human-meaningful names ("dark chocolate", "chocolate", "cream", "mayonnaise") alongside or instead of hex-derived names for the warm-dark and light surface scales, now that both follow the same paired structure.
- **`preview/components-member-row.html`** — documents the unshipped ring/corner-dot avatar role pattern; should be updated or replaced to reflect `component.role-eyebrow` in a future pass.
- **Reading progress row** (`ProgressRow.tsx`) — an in-progress exploration of richer progress treatments lives in `preview/explore-reading-progress.html` (untracked) — reconcile before specing `component.reading-progress` updates.
- **App navigation shell** (`AppSidebar.tsx` + `MobileTopBar.tsx`) — first real implementation of the Material Symbols icon system from `README.md`; worth a future icon-sourcing convention doc.

---

## [2.2.0] — 2026-05-26

Modal pattern — anatomy spec, new tokens, and preview card. Establishes the three-zone modal shell as a named, cross-platform design system pattern.

### Added
- **Modal anatomy spec** (`docs/modal.md`) — full developer guide covering container, Header, Body, Footer, optional DangerZone, warning boxes, behavior rules, and platform implementation notes for web (React/Tailwind), Android (M3), and iOS (SwiftUI).
- **`component.modal`** in `tokens.json` — named component token group with container, header, and footer sub-tokens; mirrors the existing `component.button` structure.
- **New color tokens** — warning-box tints for both copper and danger contexts:
  - `color.status.primary-subtle` / `--kluvs-primary-subtle` — `rgba(209,109,48,0.08)` copper tinted fill
  - `color.status.primary-border-soft` / `--kluvs-primary-border-soft` — `rgba(209,109,48,0.25)` copper soft border
  - `color.status.danger-subtle` / `--kluvs-danger-subtle` — `rgba(239,68,68,0.08)` danger tinted fill
  - `color.status.danger-border-soft` / `--kluvs-danger-border-soft` — `rgba(239,68,68,0.20)` danger soft border
- **New overlay tokens** — backdrop colors for modals and drawers:
  - `color.overlay.light` / `--kluvs-overlay-light` — `rgba(0,0,0,0.50)` light-surface backdrop
  - `color.overlay.dark` / `--kluvs-overlay-dark` — `rgba(0,0,0,0.70)` dark-surface backdrop
- **`radius.modal`** / `--kluvs-radius-modal` — `16px`; semantic alias of `radius.lg` for dialog/sheet containers
- **Typography tokens for modal label** — `typography.modal-label` group in `tokens.json`; `--kluvs-modal-label-size` (11px) and `--kluvs-modal-label-tracking` (0.14em) in CSS; `.kluvs-modal-label` utility class
- `preview/components-modal.html` — preview card showing both default (copper eyebrow) and destructive (danger eyebrow) variants on a dark background

### Changed
- `SKILL.md` — step 4a updated to document `docs/` as the home for per-component integration guides; "Do not read" corrected to allow targeted doc reads

---

## [2.1.0] — 2026-05-22

Loading spinner — Breathe·Tidal — shipped across all three platforms. Establishes `docs/` as the design system's integration guide home.

### Added
- **Loading spinner — Breathe·Tidal variant.** Kluvs mark (three hexagons) with a 4s box-breathing animation: 120° step on inhale (scale 0.96→1.08, opacity 0.94→1), hold, 120° step on exhale, hold. Easing: `cubic-bezier(0.4, 0, 0.4, 1)` on transitions, `linear` on holds. Reduced-motion fallback: static rest pose (no animation). Three platform exports:
  - `assets/spinner-kluvs.svg` — self-contained animated SVG for web (CSS animation + `prefers-reduced-motion` rule)
  - `assets/android/drawable/spinner_kluvs.xml` + `spinner_kluvs_animation.xml` — AnimatedVectorDrawable with full keyframe fidelity via `assets/android/animator/` + `assets/android/interpolator/kluvs_breathe_tidal.xml`
  - `assets/ios/KluvsSpinner.swift` — SwiftUI view using `KeyframeAnimator` (iOS 17+); respects `accessibilityReduceMotion`
- `preview/components-spinner.html` — spinner preview card with size specimens (16/32/64 px, both surfaces), usage table, and animation spec summary
- `docs/spinner-kluvs.md` — developer guide covering web (`<img>` and inline SVG), Android (file placement, XML layout, Kotlin View system, Jetpack Compose, reduced motion), and iOS (SwiftUI) with copy-paste snippets. Establishes `docs/` as the home for all future per-component integration guides.

### Changed
- `index.html` States specimen: replaced placeholder border-spin `<div>` with `<img src="assets/spinner-kluvs.svg">` on both warm-dark and light surfaces
- `site.css`: removed `@keyframes spin` and `.spinner` border-ring class; replaced with `.kluvs-spinner` sizing-only class (animation is self-contained in the SVG)
- `README.md`: animation section updated — loading spinner is now Breathe·Tidal, not a static stroked ring
- `CLAUDE.md`: loading state open item resolved; file map expanded with spinner and `docs/` entries

---

## [2.0.0] — 2026-05-17

Two-register typography system replaces Inter as the sole typeface. Breaking change: `--kluvs-font-sans` now resolves to IBM Plex Sans; any hardcoded Inter references in client repos must be updated.

### Changed
- `--kluvs-font-sans` updated from Inter to IBM Plex Sans (400/500/700)
- Heading utility classes (`.kluvs-display-*`, `.kluvs-page-heading`, `.kluvs-section-heading`, `.kluvs-card-heading`) updated to use EB Garamond serif; card heading is now italic
- Wordmark assets (`kluvs-wordmark-dark/light.svg`) updated from Inter to EB Garamond

### Added
- `--kluvs-font-serif`: EB Garamond (400/500/700 + italic 400/500) — literary register for headings and book titles
- `.kluvs-eyebrow` utility class: IBM Plex Sans, 12px, medium, uppercase, 0.1em tracking — for section labels within UI panels and tabs
- `kluvs-lockup-dark.svg` / `kluvs-lockup-light.svg`: combined mark + KLUVS wordmark assets at canonical 42px mark / 36px text ratio

### Migration
- Replace `font-family: Inter` with `font-family: var(--kluvs-font-sans)` (IBM Plex Sans)
- Add `font-family: var(--kluvs-font-serif)` to wordmarks, display text, page headings, section headings, and book titles
- Replace `font-semibold` (600) with `font-bold` (700) for headings/badges or `font-medium` (500) for UI labels
- Replace within-tab section headings with `.kluvs-eyebrow` pattern

---

## [1.0.2] — 2026-05-16

Major style guide overhaul. The hosted site at design.kluvs.com now supports a full surface toggle, dual-surface component specimens, responsive mobile layout, and correct dark mode rendering throughout.

### Added
- `site.css` and `site.js` extracted from `index.html` (was 3969 lines → now ~2400)
- Surface toggle: dark/light preview mode switching chrome and component specimens simultaneously; defaults to dark
- Full button system: Primary, Outlined, Text/Ghost, Text Destructive, Social — all on both surfaces
- Dual-surface specimens for all component groups: Navigation, Inputs, Cards, Avatars, Members, States
- Light variant for Avatars (white fill, role rings preserved) and States (white cards, adjusted progress/timeline colors)
- Light Surfaces swatch card pinned to white in dark mode; all other color cards respond to toggle
- Accessibility section dark mode: table text, exception headings, paragraphs, and dividers all correctly styled
- Responsive mobile layout with slide-in nav drawer

### Changed
- `tokens.json`: removed all surface/platform restrictions ("mobile-only", "dark-only", "auth-only", etc.)
- All documentation: principle updated to "both surfaces supported everywhere"
- Social OAuth buttons: removed light-only assumption; fixed provider colors work on any surface
- Navigation: removed "dark-only in the product" claim
- Warm-dark token description: reworded from "mobile/Figma" to "warm-dark stack"
- Component status table: Button Primary promoted Partial → Done; Outlined, Text, Destructive added as Done
- `SKILL.md`: tightened reading list with explicit do-not-read list for site infrastructure

### Fixed
- Copper hex in README corrected to `#D16D30` (unanimous across all codebases)
- Card radius corrected to 12px in README
- Gold: `#F0BF05` → `#EFBF04` in CSS (matches both mobile platforms)
- Admin teal: `#006682` → `#006781` in README
- Error red: `#E53333` → `#EF4444` in README
- iOS Google button text documented as pending fix (`#757575` → `#1F1F1F`)
- Surface toggle CSS specificity: `!important` on visibility rules to override inline `display:flex`
- Orphaned `comp-grid` wrapper removed from inputs section after refactor

### Added
- Full button system: Primary (filled), Outlined, Text/Ghost, Text Destructive, Social — all five variants with live specimens on both warm-dark and light surfaces
- Surface toggle in sidebar — flips the style guide chrome between light and warm-dark to preview component behaviour in each context
- Button tokens in `tokens.json` (`component.button.*`) covering shape, padding, typography, and loading pattern
- CLAUDE.md: documented canonical button text color (white, not adaptive `colorScheme.background`) and loading state pattern

### Changed
- Component status: Button — Primary promoted from Partial → Done; Outlined, Text, Text Destructive added as Done

---

## [1.0.1] — 2026-05-16

Cross-repo audit against `kluvs-frontend` and `kluvs-mobile` reconciled all token values against the original Notion design doc. Five README/CSS discrepancies corrected, iconography canonicalized, typography tier system documented, and the hosted style guide launched at design.kluvs.com.

### Fixed
- Copper hex: README corrected from `#D16E30` to `#D16D30` — unanimous across CSS, web, mobile, and original design doc
- Card radius: README corrected from 10px to 12px — matches `--kluvs-radius-card` and web Tailwind config
- Gold (owner role): `--kluvs-role-owner` corrected from `#F0BF05` to `#EFBF04` — matches Android `Color.kt` and iOS `Colors.swift`
- Admin teal: README corrected from `#006682` to `#006781` — matches CSS, web Tailwind, mobile, and original design doc
- Error red: README corrected from `#E53333` to `#EF4444` — matches `--kluvs-danger` and web Tailwind config

### Changed
- Iconography section: replaced Lucide with Material Symbols as the canonical icon system (weight 600, Grade 0, Optical Size 24px, SVG). Lucide remains in `ui_kits/mobile/` as a placeholder pending migration.
- `assets/` icon SVGs now documented in README index (previously undocumented)
- Gold usage note added: dark-surface-first, never use as text color
- `SKILL.md` hardened with an explicit reading list and do-not-read list — immune to repo growth

### Added
- Typography tier system documented in README: four-tier hierarchy (section headers → primary content → supporting details → fine print) with M3 role mappings for mobile and web utility class equivalents
- `index.html` — hosted style guide at design.kluvs.com: dark sidebar nav, inline color swatches, type specimens, spacing + radius visuals, icon grid, brand asset showcase, live component specimens (Navigation, Buttons, Inputs, Cards, Avatars, Members, States), component status table, mobile kit embed. Fully responsive with slide-in mobile nav drawer.

---

## [1.0.0] — 2026-05-16

Initial design system foundation, generated from the Kluvs Figma file.

### Added
- `colors_and_type.css` — full token set: color (brand, surface-dark, surface-light, warm-dark, roles, status), spacing, radius, motion, and type
- `assets/` — brand marks (wordmark light/dark, mark, app icon), role badges (owner, admin), OAuth provider glyphs (Discord, Google, Apple), icon SVGs
- `preview/` — 27 standalone HTML swatches covering every token category
- `ui_kits/mobile/` — complete mobile UI kit (Login → Clubs → Profile) as React/Babel components with an interactive click-through demo
- `README.md` — brand guide: voice, visual foundations (color, type, spacing, radius, animation, states, borders, shadows), iconography, and open caveats
- `SKILL.md` — Claude Code skill front-matter enabling the `/kluvs-design` skill

---

[Unreleased]: https://github.com/kluvs-app/design-system/compare/v2.3.0...HEAD
[2.3.0]: https://github.com/kluvs-app/design-system/compare/v2.2.0...v2.3.0
[2.1.0]: https://github.com/kluvs-app/design-system/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/kluvs-app/design-system/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/kluvs-app/design-system/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/kluvs-app/design-system/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kluvs-app/design-system/releases/tag/v1.0.0
