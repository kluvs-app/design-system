# Navigation

The primary structural anchors of the Kluvs application.

## 1. Top Bar (`TopAppBar`)

Editorial page header — not a fixed wordmark bar. An eyebrow-style **header** label (e.g.
"Profile", "Club", "Library" — Eyebrow family, uppercase, tracked) always shown in the top
row, optionally paired with a big serif **title** underneath (Headline family — the actual
name/value: a profile name, a club name, "My Shelf").

- **Height:** 56px header row; +64px when a title is present.
- **Two modalities, one component:** passing a title puts the bar in its full two-row form;
  omitting it collapses the bar to the single header row. Not two separate components — a
  screen picks the mode by whether it has a title to show, the same way a detail screen has
  something to name and a settings screen doesn't.
- **Back button:** optional, leading, in the header row.
- **Action:** optional, trailing, in the header row — a single icon or an arbitrary composable
  (e.g. a button), not a fixed slot type.

Distinct from the Sub Bar/Tab Strip below, and from the FAB (§5) — the top bar's trailing
action is a screen-level utility (search, overflow), never a primary creation action.

### Search (`SearchTopAppBar`)

`TopAppBar` with search baked in. Tapping the search action unfurls a search field in from the
right (scale-x reveal), fading the header/title out and collapsing the bar down to its
single-row height for the duration of the search — regardless of whether the bar was in
one-row or two-row mode beforehand. See `docs/inputs.md`'s `SearchField` for the field itself.

---

## 2. Sub Bar

Secondary context header (e.g. Club Name).
- **Height:** 32px.
- **Style:** Subtle border top/bottom, 12px IBM Plex Sans Medium.

---

## 3. Tab Strip

- **Height:** 42px.
- **Style:** 13px labels, 2px copper underline on the active tab.

---

## 4. Bottom Nav

Primary mobile-first navigation anchor.
- **Height:** 80px.
- **Selected State:** Copper-tinted pill (`primary-soft`) behind the icon + copper label.
- **Idle State:** Muted grey icon and label.

### Destination set

Bottom nav holds only true top-level, always-reachable destinations — not every feature area. A destination earns a tab when a user would expect to jump to it directly from anywhere in the app, not just from within a flow that leads to it.

- **Clubs** — the club list / switcher.
- **Books** — the personal shelf. Book detail and search are pushed destinations reached *from* this tab, not tabs themselves.
- **Me** — profile and account.

Grow the tab count deliberately, not by default — a screen that's only ever reached through one flow (e.g. Book Search, reached from Books) stays a pushed destination, never its own tab.

---

## 5. Floating Action Button (FAB)

Primary creation actions on a list-root screen (e.g. "New Club") use a FAB, not a top-bar icon. The top bar's trailing slot is reserved for a screen-level utility (search, filter) — conflating "create" with "utility" in the same slot reads ambiguous. One FAB per screen, bottom-right, `radius.lg` (16px), copper fill, white icon.

---

## 6. Screen-level shortcuts (skip the sheet)

Not every action needs a modal or bottom sheet — some are cheaper done inline or handed off to the OS. Reach for a sheet only after ruling these out:

| Action | Pattern instead of a sheet | Why |
|---|---|---|
| Avatar / photo change | OS image picker, launched directly on tap | The picker *is* the flow — a form step in front of it just adds a tap. |
| Editing a short field (name, handle) | Inline tap-to-edit in place | A one- or two-field edit doesn't need to leave the screen. |
| Sharing a club / link | OS share sheet (`Intent.ACTION_SEND` / `UIActivityViewController`) | The platform's share surface already does this better than a custom "copy link" dialog. |
| Small numeric bumps (reading progress by one chapter/percent) | Inline stepper on the row itself | Covers the common case; the full entry form (page/percent toggle, exact value) stays available as a sheet for precise edits. |

See `docs/modal.md` for the sheet-vs-dialog decision once you've ruled out an inline/native alternative.
