# Kluvs Composite Components — Developer Guide

These patterns were extracted from `kluvs-frontend` (shipped, in production) and formalized here. Web classes live in `colors_and_type.css`; token groups live in `tokens.json` under `component.*`.

**Both surfaces:** Kluvs is dark-first, not dark-only. Every class below has a light-surface override scoped via `[data-surface="light"] .kluvs-*` in `colors_and_type.css`, with the corresponding values documented in a `light-surface` sub-object on each `component.*` token group in `tokens.json`. Owner/member role colors and the copper read-ribbon/badge are validated AA on both surfaces and need no override.

---

## Avatar

Circular, generated member avatar. Shows an uploaded image if present, otherwise initials on a deterministic background color.

| Property | Token | Value |
|---|---|---|
| Shape | `component.avatar.shape` | circle |
| Initials | `component.avatar.initials` | 1-2 letters, EB Garamond, white |
| Own-user override | `component.avatar.own-color` → `--kluvs-primary` | copper |
| Hue palette | `component.avatar.hue-palette` | 10 fixed colors, picked by `userId % 10` |

Role is **never** shown on the avatar — no ring, no corner badge. Role identification is handled entirely by Role Eyebrow, placed next to the member's name (see below).

### Sizes

| Size | Dimension | Font size |
|---|---|---|
| `sm`  | 20px  | 8px |
| `md`  | 24px  | 10px |
| `lg`  | 40px  | 12px |
| `xl`  | 88px  | 35px |
| `2xl` | 112px | 45px |

### Web

```html
<div class="kluvs-avatar" style="width:24px;height:24px;font-size:10px;background:#5865F2">AB</div>
```

## Avatar Stack

Overlapping row of avatars (e.g. club member preview on a club card), with a `+N` overflow chip.

| Property | Token | Value |
|---|---|---|
| Overlap | `component.avatar-stack.overlap` | `-8px` margin-left on all but first |
| Stack order | `component.avatar-stack.stack-order` | first avatar on top, descending z-index thereafter |
| Ring | `component.avatar-stack.ring` | `2px solid` surface-elevated color, separates overlapping avatars |
| Max shown | `component.avatar-stack.max-shown` | 3 |
| Overflow chip | `component.avatar-stack.overflow-chip` | same size as `md` avatar, `+N` |

### Web

```html
<div class="kluvs-avatar-stack">
  <div class="kluvs-avatar" style="width:24px;height:24px;font-size:10px;background:#5865F2">AB</div>
  <div class="kluvs-avatar" style="width:24px;height:24px;font-size:10px;background:#5BAA5C">CD</div>
  <div class="kluvs-avatar" style="width:24px;height:24px;font-size:10px;background:#D16D30">EF</div>
  <div class="kluvs-avatar-stack__overflow">+2</div>
</div>
```

---

## Progress Bar

Thin reading-progress indicator: fill bar + a label row with an inline "Update" action. This is the **currently shipped** version (`ProgressRow`).

> A richer redesign (ring/dial, milestone ticks, card treatment) is being explored in `preview/explore-reading-progress.html` (untracked) — **not yet decided**. This spec covers only what's live today.

| Property | Token | Value |
|---|---|---|
| Track height | `component.progress-bar.track.height` | 4px |
| Track radius | `component.progress-bar.track.radius` | `radius.pill` |
| Track color | `component.progress-bar.track.background` | `--kluvs-divider-dark` |
| Fill color | `component.progress-bar.fill.background` | `--kluvs-primary` |
| Action | `component.progress-bar.action` | `component.button.secondary` (sm), label "Update", sits beside the track |
| Status label | `component.progress-bar.label` | copper, IBM Plex Sans medium 12px, right-aligned below the track. Text depends on `progress_type`: `"{current} of {total} pages"` (page-tracking), `"{percent}% complete"` (percent-tracking), or `"Finished"` once completed |
| Optional left label | `component.progress-bar.left-label` | italic EB Garamond book title, or an uppercase eyebrow — left-aligned on the same row as the status label |

### Web

```html
<div style="display:flex;align-items:center;gap:10px">
  <div class="kluvs-progress-track" style="flex:1">
    <div class="kluvs-progress-fill" style="width: 64%"></div>
  </div>
  <button class="kluvs-btn-secondary kluvs-btn-secondary--sm">Update</button>
</div>
<div style="display:flex;justify-content:space-between;margin-top:8px">
  <span style="font:italic 500 17px/1 var(--kluvs-font-serif);color:var(--kluvs-content-dark-secondary)">The Midnight Library</span>
  <span style="font:500 12px/1 var(--kluvs-font-sans);color:var(--kluvs-primary)">269 of 417 pages</span>
</div>
```

---

## Pill Button

Tiny rounded-full outlined chip for compact inline actions — e.g. "Copy Club ID". Smaller and fully rounded compared to `component.button.secondary`; supports a transient "success" state (e.g. "Copied!").

| Property | Token | Value |
|---|---|---|
| Padding | `component.button.pill.padding` | `4px 10px` |
| Radius | `component.button.pill.radius` | `radius.pill` |
| Font | `component.button.pill.font-size` | 11px, 500 weight, 0.04em tracking |
| Default border/text | `component.button.pill.border` / `.text` | `--kluvs-divider-dark` / `--kluvs-content-dark-secondary` |
| Success border/text | `component.button.pill.success-border` / `.success-text` | `--kluvs-success` |

### Web

```html
<button class="kluvs-btn-pill">Copy Club ID</button>
<button class="kluvs-btn-pill kluvs-btn-pill--success">Copied!</button>
```

---

## Segmented Control

Pill-shaped multi-option toggle — equal-width (or fixed-size icon) segments in a rounded-full bordered container, divided by 1px borders. Two known variants:

### Variant: Filled (Track-By toggle)

Used in the Reading Progress modal (Page / Percent). Active segment fills with brand primary.

```html
<div class="kluvs-segmented">
  <button class="kluvs-segmented__option kluvs-segmented__option--active">Page</button>
  <button class="kluvs-segmented__option">Percent</button>
</div>
```

### Variant: Status-icon (RSVP / attendance)

Used in `AttendanceControl`. Icon-only, fixed 28px square segments. Active segment is tinted by semantic status color:

| Segment | Active background | Active color |
|---|---|---|
| Yes   | `--kluvs-success-subtle` | `--kluvs-success` |
| Maybe | `--kluvs-surface-dark-elevated` | `--kluvs-content-dark-primary` |
| No    | `--kluvs-danger-subtle` | `--kluvs-danger` |

```html
<div class="kluvs-segmented kluvs-segmented--icon">
  <button class="kluvs-segmented__option kluvs-segmented__option--yes-active">✓</button>
  <button class="kluvs-segmented__option">?</button>
  <button class="kluvs-segmented__option">✕</button>
</div>
```

---

## Role Eyebrow

Uppercase role label with an optional leading dot. **This supersedes** the avatar-ring + corner-dot pattern shown in `preview/components-member-row.html`, which was never implemented — `RoleEyebrow` is the shipped pattern.

| Role | Label color | Dot |
|---|---|---|
| Owner  | `--kluvs-role-owner` (`#C9900A`) | yes, same color |
| Admin  | `--kluvs-role-admin-on-dark` (`#7BA8B8`) | yes, `--kluvs-role-admin` (`#006781`) |
| Member | `--kluvs-role-member-label` (`#48A480`) | no |

### Web

```html
<span class="kluvs-role-eyebrow kluvs-role-eyebrow--admin">
  <span class="kluvs-role-eyebrow__dot"></span> Admin
</span>
```

> `components-member-row.html` should be updated or replaced in a future pass — the ring/corner-dot avatar treatment it documents is not in production.

---

## Empty States

Page-level "nothing here" state: optional illustration, italic serif heading, helper body text, optional primary CTA. Centered, vertical, `gap: 24px`.

| Property | Token | Value |
|---|---|---|
| Heading | `component.empty-state.heading` | italic EB Garamond 500, 28px (34px on `lg`), `--kluvs-content-dark-secondary` |
| Body | `component.empty-state.body` | 13px IBM Plex Sans, `--kluvs-warm-fg-tertiary`, line-height 1.6, max-width 340px |
| CTA | `component.empty-state.cta` | `component.button.primary` |

### Stacked Covers illustration

For book-related empty states (e.g. "Nothing shelved yet"): three placeholder covers, diagonal-stripe fill, fanned out with slight tilts.

| Size | Container | Cover | Tilts (L/C/R) |
|---|---|---|---|
| `sm` | 110×110px | 62×88px | -6°/3°/9° |
| `lg` | 220×200px | 112×160px | -7°/4°/10° |

### Web

```html
<div class="flex flex-col items-center text-center gap-6">
  <div class="kluvs-empty-covers" style="width:220px;height:200px">
    <div class="kluvs-empty-covers__cover" style="width:112px;height:160px;transform:translate(-46px,4px) rotate(-7deg)"></div>
    <div class="kluvs-empty-covers__cover" style="width:112px;height:160px;transform:translate(0,-4px) rotate(4deg)"></div>
    <div class="kluvs-empty-covers__cover" style="width:112px;height:160px;transform:translate(46px,4px) rotate(10deg)"></div>
  </div>
  <div>
    <p class="kluvs-empty-heading">Nothing shelved yet.</p>
    <p class="kluvs-empty-body">Search for a book and add it to Want to Read, Read, or Not Finished — it'll show up here.</p>
  </div>
  <button class="kluvs-btn-primary">Search for a book</button>
</div>
```

---

## Book Cover Placeholder

"No cover available" fallback fill for a single `CoverSlot`/`BookCover` — a finer diagonal stripe than the empty-state stacked covers, with an optional small mono label (e.g. "NO COVER").

| Property | Token | Value |
|---|---|---|
| Fill | `component.book-cover-placeholder.fill` | `repeating-linear-gradient(45deg, divider 0 3px, surface-elevated 3px 6px)` |
| Label | `component.book-cover-placeholder.label` | 8px monospace, uppercase, 0.12em tracking, `--kluvs-warm-fg-tertiary`, 70% opacity |

### Web

```html
<div class="kluvs-cover-placeholder" style="width:80px;height:120px;border-radius:4px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px">
  <span class="kluvs-cover-placeholder__label">No cover</span>
</div>
```
