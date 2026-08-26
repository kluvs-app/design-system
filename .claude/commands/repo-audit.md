---
description: Audit the design-system repo for release hygiene, internal token/doc consistency, preview showcase coverage, orphaned/missing assets, and README-CLAUDE.md fact drift. Reports findings as a checklist, does not fix anything.
---

# Repo Audit

Audit this repo against its own conventions (see `CLAUDE.md` and `CHANGELOG.md`'s versioning
table). This is a **read-only report** — do not edit files, bump `VERSION`, or touch the
changelog. Just surface discrepancies for the user to act on.

Run the checks below, then report a single Markdown checklist grouped by section: ✅ for things
that check out, ⚠️ for discrepancies, with a one-line description of each ⚠️ pointing at the
specific file/line. End with a short "if you want to fix these" next-step suggestion — don't
apply fixes yourself unless the user asks.

## 1. Release hygiene

- Read `VERSION` and the version stamp in the header comment of `colors_and_type.css`
  (`v{X.Y.Z}` on line ~2) and `version.js` (`window.KLUVS_VERSION`). All three must match.
- Read `CHANGELOG.md`. Confirm the top released heading (`## [X.Y.Z] — YYYY-MM-DD`) matches
  `VERSION`. Check whether `## [Unreleased]` has any content under it — if so, that's a hanging
  unreleased change (flag it, don't guess whether it warrants a release).
- Cross-check against git tags (`git tag --sort=-v:refname | head -5`) — does a tag exist for
  the current `VERSION`? Is the working tree clean / are there commits since that tag that look
  like they should have been part of a version bump (i.e. touched `colors_and_type.css`,
  `tokens.json`, `docs/`, or `assets/` but not `CHANGELOG.md`/`VERSION`)? Use
  `git log <last-tag>..HEAD --oneline` and `git diff <last-tag>..HEAD --stat`.

## 2. Internal consistency

- Diff token coverage between `tokens.json` and `colors_and_type.css`: every custom property
  defined in the CSS should have a corresponding entry in `tokens.json` (and vice versa),
  excluding the explicitly-noted back-compat alias block at the bottom of the CSS (per
  `CLAUDE.md`, that block is legacy-only and intentionally not mirrored).
- Spot-check that values referenced in `docs/*.md` (hex codes, token names) match what's
  actually defined in `colors_and_type.css` / `tokens.json` — docs describing a token that no
  longer exists, or citing a stale hex value, is a real discrepancy worth flagging.
- Check `CLAUDE.md`'s "Pending propagation to client repos" section — if any of those items
  read as already resolved based on what's in this repo alone (i.e. the design-system side is
  fully specified and nothing here looks half-done), note it, but do NOT go check
  `kluvs-mobile`/`kluvs-frontend` — that's out of scope for this repo-local audit.

## 3. Preview / showcase coverage

- List every `docs/*.md` component/token spec and every top-level section implied by
  `colors_and_type.css` (color groups, type scale, spacing, motion). For each, confirm there is
  a matching card in `preview/` (filenames are typically `components-<name>.html`,
  `colors-<name>.html`, `type-<name>.html`, `spacing-<name>.html`).
- Flag docs with no preview card (e.g. a new component documented in `docs/` but never given a
  showcase HTML file) and preview cards that reference tokens/components no longer documented.
- Check `index.html` / `site.js` to confirm newly added preview cards are actually linked into
  the showcase site's navigation, not just sitting in `preview/` unreferenced.
- Grep `preview/*.html` for bare hex literals (`#[0-9A-Fa-f]{6}`) outside of demo-chrome
  boilerplate (page `<body>` background, obvious placeholder grays like `#D9D9D9` avatar
  filler). A card hardcoding a value that also exists as a `--kluvs-*` token is exactly how a
  preview silently drifts from the token after the token's value changes (e.g. an old role
  color baked into a swatch instead of `var(--kluvs-role-owner)`). Flag each hit with the file,
  line, and which token it should probably be referencing instead.

## 4. Asset usage

- List every file under `assets/` (including `assets/showcase/`, `assets/android/`,
  `assets/ios/`) and check whether it's referenced anywhere from `preview/*.html`, `index.html`,
  `docs/*.md`, or `README.md`. An asset with zero references is either dead weight or a recent
  drop that never got wired into the showcase — flag it either way, don't guess which.
- Conversely, if any `docs/*.md` or `preview/*.html` references an asset path that doesn't
  exist, flag that as a broken reference.

## 5. README ↔ CLAUDE.md fact drift

`README.md` is the brand source of truth; `CLAUDE.md`'s "Brand rules (non-negotiable)" section
is a deliberately condensed cache of it, not a competing spec — don't recommend merging or
removing either file. Just check that the small set of concrete, literal facts stated in *both*
places still agree: the accent hex, the font names (EB Garamond / IBM Plex Sans) and their
weights, the emoji policy, and any hex values that appear in both (e.g. owner-role mustard).
If `README.md` states a value that `CLAUDE.md` doesn't match, that's drift worth flagging — but
don't flag things README covers in depth that CLAUDE.md simply omits; omission isn't drift.

## Output

Produce the checklist described above. If everything passes, say so plainly — don't invent
issues to seem thorough.
