# Inputs

Kluvs form fields use a warm, high-fidelity style to match the literary brand. Components
are not variants of one another — they share visual chrome (radius, border, label, supporting
text) but represent different things: `InputField` is something you type into, `PasswordField`
is a categorically different typed input (masked by default, with a reveal toggle), `PickerField` is something you
tap to open a picker or dialog. Neither takes a `T`-generic option list — all are hollow,
single-purpose fields.

## Anatomy

- **Label:** 12px IBM Plex Sans Medium, copper (focused) or grey (default).
- **Field:** 8px radius, 14px text.
- **Validation:** Red border and label for error states — callers supply the full message,
  no "Error:" prefix is added by the component itself.
- **Helper text:** muted hint text below the field, distinct from an error message — shown
  only when there's no error.

## States

| State | Border | Background |
|---|---|---|
| Default | 1px grey | `warm-dark-card` (raised) |
| Focused | 2px copper | `warm-dark-card` (raised) |
| Error | 1px red | `warm-dark-card` (raised) |
| Disabled | 1px dark-grey | `warm-dark-base` |

## `InputField`

Editable text field. Covers every real editable shape as parameter combinations, not separate
components:

- **Prefix / suffix** — a fixed adornment glued to the field (e.g. `#` before a page number,
  `%` after a percentage). Not a separate "PrefixInputField"/"SuffixInputField" — same
  component, optional decoration, same relationship as a button's optional icon.
- **Multiline** — a textarea variant (`singleLine = false`), same chrome, grows with content.
- **Keyboard type** — numeric fields (page number, percentage) should request a numeric
  keyboard; email fields an email keyboard, etc.
- **Keyboard actions** — supports an IME action callback (e.g. `Done`/`Go` on the last field
  of a form submitting it, `Next` advancing focus) alongside `keyboardOptions`.

## `PasswordField`

Editable text field dedicated to password entry — a separate component from `InputField`,
not a boolean flag on it, matching the same categorical split `InputField` already draws
against `PickerField`. Always single-line and masked by default, with a trailing show/hide
reveal toggle. Shares `InputField`'s visual chrome exactly; only the masking behavior differs.
Supports the same keyboard-action callback as `InputField` for submitting a form on IME
`Go`/`Done`.

### Reveal toggle

- **Placement:** trailing icon inside the field, vertically centered; the touch target is at
  least 48dp / 44pt even though the glyph is 24px.
- **Icons:** `icon-visibility.svg` (eye open) and `icon-visibility-off.svg` (eye struck through),
  Material Symbols, weight 600, filled.
- **Icon shows the action, not the state:** while the password is masked the toggle shows
  `visibility` ("tap to show"); while revealed it shows `visibility-off` ("tap to hide").
- **Color:** `content-muted` — never copper; the accent stays reserved for the primary CTA and
  active state.
- **State:** always starts masked. Reveal state is local to the field instance (each password
  field in a form toggles independently) and is not persisted or shared with the caller.
- **Accessibility:** the toggle is labelled "Show password" / "Hide password" to match the
  action it will perform.
- **Disabled:** when the field is disabled the toggle is disabled too.
- **Keyboard:** revealing keeps the password keyboard type; it does not switch to a plain-text
  keyboard.

## `SearchField`

Label-less filter-as-you-type field — e.g. filtering an already-visible list from a top app
bar. Not an `InputField` mode: no label at all (vs. `InputField`'s always-present label), and
its icon is structural rather than optional decoration.

- **Leading icon:** search glyph by default; swapped for a small spinner while a search is in
  flight (`isLoading`).
- **Trailing:** a clear button, shown only when there's text to clear.
- **Not the same as** the search-and-select combobox (e.g. picking a book when creating a
  session) — that's a bigger, separate, async trigger→results→selection flow, not a field at
  all. Reserved package name for whenever that gets built: `search` (distinct from `fields`).

## `PickerField`

Read-only field that opens a picker or dialog on tap instead of accepting keyboard input —
e.g. a date/time chooser. Not an `InputField` mode: nothing is typed, there's no keyboard, the
displayed value is always externally computed.

- **Background:** unlike `InputField`, drops the raised `warm-dark-card` background in favor
  of the surrounding surface color — this is what visually signals "tap, don't type" at a
  glance, rather than a dedicated new color token.
- Shares `InputField`'s border/label/radius/error/helper-text treatment exactly.

## Web Snippet

```html
<div class="flex flex-col gap-1.5">
  <label class="text-xs font-medium">Email</label>
  <input class="kluvs-input" type="text" placeholder="name@example.com" />
</div>
```
