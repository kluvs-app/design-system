# Avatar

Circular, generated member avatar. Shows an uploaded image if present, otherwise initials on a deterministic background color.

## Anatomy

| Property | Token | Value |
|---|---|---|
| Shape | `component.avatar.shape` | circle |
| Initials | `component.avatar.initials` | 1-2 letters, EB Garamond, white |
| Own-user color | `component.avatar.own-color` | Copper `#D16D30` (locked) |
| Hue palette | `component.avatar.hue-palette` | 12 thematic hues (chocolate on dark, cream on light) |

Role is **never** shown on the avatar — no ring, no corner badge. Role identification is handled entirely by **Role Eyebrow** (see `docs/members.md`).

## Sizes

| Size | Dimension | Font size |
|---|---|---|
| `sm`  | 20px  | 8px |
| `md`  | 24px  | 10px |
| `lg`  | 40px  | 12px |
| `xl`  | 88px  | 35px |
| `2xl` | 112px | 45px |

## Web

Use `.kluvs-avatar` with inline width/height or custom size classes. Use `.kluvs-avatar--primary` for the current user. Other users use `.kluvs-avatar--hue-[0-11]`.

```html
<!-- Own user avatar -->
<div class="kluvs-avatar kluvs-avatar--primary" style="width:40px;height:40px;font-size:12px;">ME</div>

<!-- Member avatar with thematic hue -->
<div class="kluvs-avatar kluvs-avatar--hue-3" style="width:40px;height:40px;font-size:12px;">JD</div>
```

---

# Avatar Stack

Overlapping row of avatars with a `+N` overflow chip, used for member previews.

| Property | Token | Value |
|---|---|---|
| Overlap | `component.avatar-stack.overlap` | `-8px` margin-left on all but first |
| Stack order | `component.avatar-stack.stack-order` | first avatar on top, descending z-index thereafter |
| Ring | `component.avatar-stack.ring` | `2px solid` matching surface color |
| Max shown | `component.avatar-stack.max-shown` | 3 |
| Overflow chip | `component.avatar-stack.overflow-chip` | same size as `md` avatar, `+N` |

## Web

Use the `.kluvs-avatar-stack` container.

```html
<div class="kluvs-avatar-stack">
  <div class="kluvs-avatar kluvs-avatar--hue-0" style="width:24px;height:24px;font-size:10px;">AB</div>
  <div class="kluvs-avatar kluvs-avatar--hue-1" style="width:24px;height:24px;font-size:10px;">CD</div>
  <div class="kluvs-avatar kluvs-avatar--primary" style="width:24px;height:24px;font-size:10px;">EF</div>
  <div class="kluvs-avatar-stack__overflow">+2</div>
</div>
```
