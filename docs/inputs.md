# Inputs

Kluvs form fields use a warm, high-fidelity style to match the literary brand.

## 1. Anatomy

- **Label:** 12px IBM Plex Sans Medium, copper (focused) or grey (default).
- **Field:** 8px radius, 14px text.
- **Validation:** Red border and text for error states, prefixed with "Error:".

## 2. States

| State | Border | Background |
|---|---|---|
| Default | 1px grey | `warm-dark-card` |
| Focused | 2px copper | `warm-dark-card` |
| Error | 1px red | `warm-dark-card` |
| Disabled | 1px dark-grey | `warm-dark-base` |

## Web Snippet

```html
<div class="flex flex-col gap-1.5">
  <label class="text-xs font-medium">Email</label>
  <input class="kluvs-input" type="text" placeholder="name@example.com" />
</div>
```
