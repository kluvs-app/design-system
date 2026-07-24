# Navigation

The primary structural anchors of the Kluvs application.

## 1. Top Bar

Two distinct components serving two distinct roles — not one replacing the other.

### Persistent chrome bar

Fixed application header carrying identity and global navigation, not page-specific content.
- **Height:** 52px.
- **Background:** `surface.warm-dark.bar` (`#1A140F`) on dark / White on light.
- **Content:** Brand wordmark "KLUVS" (Garamond, Bold, 20px), leading back affordance when
  drilled into a page, trailing avatar/overflow menu for global actions (edit profile,
  appearance, sign out).

### Editorial page header (`TopAppBar`)

Per-screen identity header, distinct from the persistent chrome bar above — the two can
coexist (the chrome bar stays fixed; `TopAppBar` is the page's own content underneath it). An
eyebrow-style **header** label (e.g. "Profile", "Club", "Library" — Eyebrow family, uppercase,
tracked) always shown in the top row, optionally paired with a big serif **title** underneath
(Headline family — the actual name/value: a profile name, a club name, "My Shelf").

- **Height:** 56px header row; +64px when a title is present.
- **Two modalities, one component:** passing a title puts the bar in its full two-row form;
  omitting it collapses the bar to the single header row. Not two separate components — a
  screen picks the mode by whether it has a title to show, the same way a detail screen has
  something to name and a settings screen doesn't.
- **Back button:** optional, leading, in the header row.
- **Action:** optional, trailing, in the header row — a single icon or an arbitrary composable
  (e.g. a button), not a fixed slot type.

Distinct from the Sub Bar/Tab Strip below, and from the FAB (§6) — the top bar's trailing
action is a screen-level utility (search, overflow), never a primary creation action.

### Search (`SearchTopAppBar`)

`TopAppBar` with search baked in. Tapping the search action unfurls a search field in from the
right (scale-x reveal), fading the header/title out and collapsing the bar down to its
single-row height for the duration of the search — regardless of whether the bar was in
one-row or two-row mode beforehand. See `docs/inputs.md`'s `SearchField` for the field itself.

---

## 2. Action Menu (`ActionMenu`)

Small anchored popover of plain-text actions (e.g. "Share"/"Edit"/"Delete", "Change Role"/
"Remove Member") — not a bottom sheet, not a modal. Real usage across the app is uniformly 1-3
items with no icons or subtext; a bottom-sheet action list is a different, heavier component
reserved for a genuinely longer or richer menu, not built until one is actually needed.

- **Trigger:** a "..." (overflow) icon button, or any icon.
- **Item style:** Eyebrow family (uppercase, tracked) — menu actions are interface chrome, not
  content, matching `TopAppBar`/modal headers. Destructive items (Delete, Remove) tint danger-red.
- **Width:** not overridden — inherits the platform menu's own default content-based clamp
  (112dp minimum, 280dp maximum), so a single short label doesn't render as an odd tiny square
  and a long one doesn't stretch edge-to-edge.
- Distinct from `Dropdown` (`docs/dropdowns.md`) — same anchored-popover mechanism, different
  represented concept: `Dropdown` picks a persisted value, `ActionMenu` fires a one-shot command.

---

## 3. Sub Bar

Secondary context header (e.g. Club Name).
- **Height:** 32px.
- **Style:** Subtle border top/bottom, 12px IBM Plex Sans Medium.

---

## 4. Tab Strip

- **Height:** 42px.
- **Style:** 13px labels, 2px copper underline on the active tab.

---

## 5. Bottom Nav

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

## 6. Floating Action Button (FAB)

Primary creation actions on a list-root screen (e.g. "New Club") use a FAB, not a top-bar icon. The top bar's trailing slot is reserved for a screen-level utility (search, filter) — conflating "create" with "utility" in the same slot reads ambiguous. One FAB per screen, bottom-right, `radius.lg` (16px), copper fill, white icon.

---

## 7. Screen-level shortcuts (skip the sheet)

Not every action needs a modal or bottom sheet — some are cheaper done inline or handed off to the OS. Reach for a sheet only after ruling these out:

| Action | Pattern instead of a sheet | Why |
|---|---|---|
| Avatar / photo change | OS image picker, launched directly on tap | The picker *is* the flow — a form step in front of it just adds a tap. |
| Editing a short field (name, handle) | Inline tap-to-edit in place | A one- or two-field edit doesn't need to leave the screen. |
| Sharing a club / link | OS share sheet (`Intent.ACTION_SEND` / `UIActivityViewController`) | The platform's share surface already does this better than a custom "copy link" dialog. |
| Small numeric bumps (reading progress by one chapter/percent) | Inline stepper on the row itself | Covers the common case; the full entry form (page/percent toggle, exact value) stays available as a sheet for precise edits. |

See `docs/modal.md` for the sheet-vs-dialog decision once you've ruled out an inline/native alternative.
