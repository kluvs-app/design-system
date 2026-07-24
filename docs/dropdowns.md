# Dropdowns

Pill-shaped value selectors — a trigger that displays the current selection (or a placeholder
when none) and reveals a popover list of options on tap. Distinct from both the Pill family
(`docs/buttons.md`'s `TriggerPill`/`TogglePill`, which don't reveal a list) and Segmented
Control (`ToggleControl`/`AttendanceControl`, which render every option inline instead of in
an overlay): a Dropdown shows one value at a time and hides the rest until opened.

## Dropdown (`Dropdown`)

Generic single-select trigger + popover list.

| Property | Value |
|---|---|
| Trigger shape | fully rounded (pill), border only, no fill |
| Default | grey border / grey text / grey chevron |
| Selected | copper border / copper text / copper chevron |
| Chevron | rotates 180° when open |
| Clear option | optional leading menu item (e.g. "None") that unsets the selection |

**Rules:**
- Owns its own open/closed state — callers only supply `options`, `selected`, `onSelect`.
- The selected item shows a trailing checkmark in the popover list.
- Use a `clearLabel` only when "no selection" is a valid, distinct state (e.g. a book's shelf
  status) — omit it when a selection is mandatory once made.

## Web note

No dedicated `.kluvs-*` CSS class exists for this pattern yet — the frontend's reference
implementation (`ShelfPill` in `BooksPage.tsx`) is a page-local Tailwind component, not a
shared class in `colors_and_type.css`. Treat the properties above as the canonical spec;
formalizing a shared web class is future work, not yet done.
