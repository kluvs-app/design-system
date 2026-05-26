# Kluvs Modal — Developer Guide

Every dialog in Kluvs — edit forms, confirmations, destructive actions — shares the same three-zone shell. The shell is purely presentational; it carries no state and imposes no behavioral contract.

## Anatomy

```
┌─────────────────────────────────────────┐  ← radius.modal (16px)
│  EYEBROW LABEL                    [×]   │  ← Header  (px-6 pt-5 pb-5)  border-bottom
├─────────────────────────────────────────┤
│  {form fields / body content}           │
│                                         │  ← Body    (px-6 pt-6 pb-6)
│  ┌ DANGER ZONE ─────────────────────┐   │
│  │ [Delete club]                    │   │  ← Danger zone box — OPTIONAL, bottom of body
│  └──────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  Cancel                      [Action]   │  ← Footer  (px-6 py-4)    border-top
└─────────────────────────────────────────┘
```

---

## Container

| Property     | Token                                               | Value     |
|---|---|---|
| Background   | `color.dark-web.raised` → `--kluvs-surface-dark-raised` | `#141414` |
| Border       | `color.dark-web.divider` → `--kluvs-divider-dark`       | `1px solid #2A2A2A` |
| Corner radius | `radius.modal` → `--kluvs-radius-modal`                | `16px` |
| Max width    | `component.modal.container.max-width`                    | `384px` |
| Overflow     | —                                                        | `hidden` (clips children to border-radius) |
| Backdrop     | `color.overlay.dark` → `--kluvs-overlay-dark`           | `rgba(0,0,0,0.70)` |
| Backdrop (light surface) | `color.overlay.light` → `--kluvs-overlay-light` | `rgba(0,0,0,0.50)` |

---

## Header

The header identifies the modal type via an **eyebrow label** — not a heading element. The eyebrow label is the `aria-labelledby` target.

| Property        | Token                                                          | Value |
|---|---|---|
| Font family     | `typography.font-family.sans`                                  | IBM Plex Sans |
| Font size       | `typography.modal-label.size` → `--kluvs-modal-label-size`    | `11px` |
| Font weight     | `typography.modal-label.weight`                                | `500` |
| Letter spacing  | `typography.modal-label.tracking` → `--kluvs-modal-label-tracking` | `0.14em` |
| Text transform  | `typography.modal-label.transform`                             | `uppercase` |
| CSS class       | `.kluvs-modal-label`                                           | — |
| Padding         | —                                                              | `px-6 pt-5 pb-5` |
| Border bottom   | `color.dark-web.divider`                                       | `1px solid` |

The eyebrow label style is intentionally different from `.kluvs-eyebrow` (12px / 0.1em). The tighter size and wider tracking signal "you are inside a focused dialog" — a notch below panel labels in the visual hierarchy.

### Label color — variants

The label color communicates intent before the user reads any body copy:

| Variant       | Use when                                        | Color    | Token |
|---|---|---|---|
| `default`     | Edit forms, info dialogs, settings              | Copper   | `color.brand.primary` → `--kluvs-primary` (`#D16D30`) |
| `destructive` | Delete, remove, or any irreversible action      | Danger   | `color.status.danger` → `--kluvs-danger` (`#EF4444`) |

The × close button color is always `color.dark-web.content-secondary` (`#B0B0B0`).

---

## Body

Free-form content zone. Padding: `px-6 pt-6 pb-6`. Stack children with `gap: 20px`.

### Field labels within the body

Labels for form fields inside the body use the same modal-label style but in secondary text color — not the accent:

```
font:            IBM Plex Sans, 11px, weight 500
letter-spacing:  0.14em
text-transform:  uppercase
color:           color.dark-web.content-secondary → --kluvs-content-dark-secondary (#B0B0B0)
```

This produces a clear hierarchy: header eyebrow in copper → field labels in muted grey.

### Warning / consequence boxes

Use when an action has side-effects that require acknowledgment.

**Copper warning box** — advisory (soft action with consequences, e.g. disconnecting a service):

| Property      | Token                                                         | Value |
|---|---|---|
| Background    | `color.status.primary-subtle` → `--kluvs-primary-subtle`     | `rgba(209,109,48,0.08)` |
| Border        | `color.status.primary-border-soft` → `--kluvs-primary-border-soft` | `1px solid rgba(209,109,48,0.25)` |
| Text color    | `color.brand.primary` → `--kluvs-primary`                    | `#D16D30` |
| Corner radius | `radius.input` → `--kluvs-radius-input`                      | `8px` |
| Padding       | —                                                             | `px-4 py-3` |

**Danger warning box** — destructive (permanent consequences, e.g. what gets deleted):

| Property      | Token                                                          | Value |
|---|---|---|
| Background    | `color.status.danger-subtle` → `--kluvs-danger-subtle`        | `rgba(239,68,68,0.08)` |
| Border        | `color.status.danger-border-soft` → `--kluvs-danger-border-soft` | `1px solid rgba(239,68,68,0.20)` |
| Label color   | `color.status.danger` → `--kluvs-danger`                      | `#EF4444` |
| Content color | `color.dark-web.content-secondary`                             | `#B0B0B0` |
| Corner radius | `radius.input` → `--kluvs-radius-input`                       | `8px` |
| Padding       | —                                                              | `px-4 py-3` |

---

## Danger zone box (optional)

When an edit modal contains a secondary destructive action (e.g. "Delete club" inside Edit Club), place a danger zone box at the **bottom of the body** — not between body and footer. It sits inside the body's content flow, clearly separated from the Save/Cancel pair.

| Property      | Token                                                          | Value |
|---|---|---|
| Background    | `color.status.danger-subtle` → `--kluvs-danger-subtle`        | `rgba(239,68,68,0.08)` |
| Border        | `color.status.danger-border-soft` → `--kluvs-danger-border-soft` | `1px solid rgba(239,68,68,0.20)` |
| Corner radius | `radius.input` → `--kluvs-radius-input`                       | `8px` |
| Padding       | —                                                              | `px-4 py-3` |

Inside the box:
- **Eyebrow label** — "DANGER ZONE" in `color.dark-web.content-secondary` (`#B0B0B0`), same modal-label style (11px / 0.14em / uppercase)
- **Outlined muted button** — `background: transparent`, `border: 1px solid color.dark-web.content-secondary`, `color: color.dark-web.content-secondary`, `radius.btn` (12px), label "Delete club" (no ellipsis). Transitions to `color.status.danger` border and text on hover.

The box carries the danger signal; the contents stay quiet. This avoids stacking multiple layers of red on top of an already-red-tinted surface.

---

## Footer

Cancel is always on the left; primary action is always on the right. The footer is separated from its neighbor by a top divider.

| Zone              | Style |
|---|---|
| Cancel button     | Ghost text: `text-sm font-medium`, `color.dark-web.content-secondary`, hover → `content-primary` |
| Action button     | Filled: `bg-primary hover:bg-primary-hover rounded-btn px-5 py-2 text-sm font-medium text-white` |
| Destructive CTA   | Filled danger: `bg-danger hover:bg-danger-hover rounded-btn px-5 py-2 text-sm font-medium text-white` |
| Loading state     | Inline `KluvsSpinner size=14 color="#ffffff"` + ellipsis suffix (e.g. "Saving…", "Deleting…") |
| Disabled state    | `opacity-40 cursor-not-allowed` on the action button |

---

## Behavior rules

| Rule | Detail |
|---|---|
| Escape key | Closes the modal — unless `loading` is active |
| Overlay click | Not implemented — intentional. Kluvs modals require an explicit Cancel or ×. |
| Loading lock | When `loading` is true: Escape disabled, Cancel disabled, action button disabled, × disabled |
| Body scroll | Modal body does not scroll. Keep content concise; break complex flows across steps, not within a scrollable body. |
| Focus on open | First interactive field receives `autoFocus`; in confirmation-only modals, focus the action button. |
| `aria-modal` | Set `role="dialog" aria-modal="true" aria-labelledby="{header-id}"` on the container. |

---

## Platform implementation notes

### Web — `BaseModal.tsx` (React / Tailwind)

Use `position: fixed; inset: 0; z-index: 50` for the backdrop div. The modal container is `w-full max-w-sm rounded-2xl overflow-hidden`. Map design system tokens through the Tailwind CSS variable bridge (`var(--color-*)` aliases → `--kluvs-*`).

The `BaseModal` compound component should expose: `BaseModal`, `BaseModal.Header`, `BaseModal.Body`, `BaseModal.DangerZone`, and `BaseModal.Footer`. The header `variant` prop drives the label color (`"default"` → copper, `"destructive"` → danger). All behavioral state (loading, Escape handler) lives in the consuming component.

### Mobile (Android + iOS)

Mobile uses a **platform-native pattern split** based on action weight. The floating centered modal is reserved exclusively for hard confirmations.

| Modal type | Mobile pattern | Rationale |
|---|---|---|
| Edit forms, settings (Edit Club, Edit Profile, Add Club…) | **Bottom sheet** | Multi-field forms benefit from vertical canvas; bottom-up swipe-to-dismiss is the native gesture. |
| Hard confirmations (Delete Club, Sign Out, Delete Member…) | **Centered dialog** | Brief, intentionally interruptive. Centered placement signals "you must decide this now." |

#### Centered dialog (confirmations)

Android: M3 `AlertDialog`. iOS: `UIAlertController` (`.alert` style) or a SwiftUI `.alert` modifier.

Apply the same token values as the web shell — the visual language (danger-red eyebrow, danger tint box, Cancel/Delete button pair) should be as close as the native component allows.

#### Bottom sheet (edit/form flows)

Android: M3 `ModalBottomSheet`. iOS: `UISheetPresentationController` (`.medium` / `.large` detent) or SwiftUI `.sheet`.

The three-zone anatomy still applies inside the sheet — Header with eyebrow label at the top, body content, footer with Cancel/Save. The sheet's drag handle replaces the × close button. Apply `radius.modal` (16px) to the top corners.

#### Token mapping

| DS token | Android | iOS |
|---|---|---|
| `radius.modal` (16px) | `RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp)` (sheet) · `RoundedCornerShape(16.dp)` (dialog) | `.clipShape(RoundedRectangle(cornerRadius: 16))` |
| `color.dark-web.raised` (#141414) | `containerColor = Color(0xFF141414)` | `.presentationBackground(Color(hex: "#141414"))` |
| `color.dark-web.divider` (#2A2A2A) | `HorizontalDivider(color = Color(0xFF2A2A2A))` | `Divider().overlay(Color(hex: "#2A2A2A"))` |
| Eyebrow label | `fontSize = 11.sp`, `fontWeight = Medium`, `letterSpacing = 0.14.em`, `textTransform = Uppercase` | `.font(.custom("IBMPlexSans-Medium", size: 11)).tracking(1.54).textCase(.uppercase)` |
| `color.status.danger-subtle` | `Color(0x14EF4444)` (0.08 × 255 ≈ 0x14) | `Color(hex: "#EF4444").opacity(0.08)` |
| `color.status.danger-border-soft` | `Color(0x33EF4444)` (0.20 × 255 ≈ 0x33) | `Color(hex: "#EF4444").opacity(0.20)` |
| `color.status.primary-subtle` | `Color(0x14D16D30)` | `Color(hex: "#D16D30").opacity(0.08)` |
| `color.status.primary-border-soft` | `Color(0x40D16D30)` (0.25 × 255 ≈ 0x40) | `Color(hex: "#D16D30").opacity(0.25)` |

---

## Anti-patterns

- **Do not** use a large serif heading as the modal title — the eyebrow label is the title.
- **Do not** put a filled "Delete" button in the footer of an edit modal — use the danger zone box at the bottom of the body instead.
- **Do not** use the copper accent for both the header label AND the action button in a destructive modal — pick danger or copper, never both.
- **Do not** use `rgba(var(--color-danger-rgb) / 0.08)` — there is no `-rgb` channel token. Use `--kluvs-danger-subtle` directly.
- **Do not** hardcode `#D16D30` — always use `--kluvs-primary` or `var(--color-primary)`.
- **Do not** scroll the modal body — if content overflows, the design needs rethinking, not a scrollbar.
