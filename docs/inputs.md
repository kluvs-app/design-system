# Inputs

Kluvs form fields use a warm, high-fidelity style to match the literary brand. Two components,
not variants of one another — they share visual chrome (radius, border, label, supporting
text) but represent different things: `InputField` is something you type into, `PickerField`
is something you tap to open a picker or dialog. Neither takes a `T`-generic option list —
both are hollow, single-purpose fields.

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
