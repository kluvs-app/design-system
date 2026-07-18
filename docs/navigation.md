# Navigation

The primary structural anchors of the Kluvs application.

## 1. Top Bar

Main application header.
- **Height:** 52px.
- **Background:** `surface.warm-dark.bar` (`#1A140F`) on dark / White on light.
- **Content:** Brand wordmark "KLUVS" (Garamond, Bold, 20px) + trailing context actions (e.g. Settings).

### Contextual modes

The top bar is not one fixed layout — it switches mode based on navigation depth:

| Mode | When | Content |
|---|---|---|
| **Root** | Top-level destinations (Clubs list, Books shelf, Me) | Wordmark or screen title, centered or leading, EB Garamond. No back affordance. Trailing icon reserved for a screen-level utility (e.g. search on Books) — not for creation, see FAB below. |
| **Detail** | Any screen reached by drilling in (Club detail, Book detail) | Back chevron leading, screen title in place of the wordmark (IBM Plex Sans, not serif), optional trailing kebab for overflow actions. |

Mode is derived from back-stack depth, not set per-screen ad hoc — a screen doesn't "decide" it's a detail screen, its position in the nav graph does.

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
