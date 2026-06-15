# Members

Patterns for member representation and club role identification.

## 1. Member Row

The primary list-item pattern for member directories.

| Property | Rule |
|---|---|
| Avatar | `lg` (40px) size |
| Name | IBM Plex Sans, 14px, Medium |
| Meta | IBM Plex Sans, 12px, Regular, `--kluvs-warm-fg-tertiary` |
| Trailing | **Role Eyebrow** (anchored to the right edge) |

---

## 2. Role Eyebrow (`.kluvs-role-eyebrow`)

Uppercase semantic labels for role identification. **Supercedes** previous avatar-ring or badge experiments.

| Role | Color | Dot |
|---|---|---|
| Owner | Mustard `#C9900A` | Yes (Mustard) |
| Admin | Teal `#7BA8B8` (dark) / `#006781` (light) | Yes (Teal) |
| Member | Cream `#F2EDE5` (dark) / Dark Chocolate `#140F0D` (light) | No |

## Web Snippet

```html
<div class="flex items-center gap-3">
  <div class="kluvs-avatar kluvs-avatar--lg">AB</div>
  <div class="flex-1">
    <div class="text-sm font-medium">Jane Doe</div>
    <div class="text-xs text-meta">@janedoe</div>
  </div>
  <span class="kluvs-role-eyebrow kluvs-role-eyebrow--owner">
    <span class="kluvs-role-eyebrow__dot"></span> Owner
  </span>
</div>
```
