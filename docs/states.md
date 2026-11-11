# System States

Functional states for transitions, data availability, and error recovery.

## 1. Loading

Full-screen or section-level loading uses the **Breathe·Tidal** spinner.
- **Anatomy:** The Kluvs mark with a 4s box-breathing animation.
- **Rules:** Never spin the mark; only use the breathe-and-fade animation.
- **See also:** `docs/spinner-kluvs.md` for full platform implementation.

## 2. Error

Full-screen "couldn't load this" state — a load failure, not an empty-but-healthy screen.
Communicates the failure and provides a recovery path.

- **Anatomy:** Reuses the **Fragmented Hex Grid** shell from § Empty State below — same
  illustration, heading, and body layout — with two differences: the hex grid strokes render
  in `--kluvs-danger` instead of the quiet `--kluvs-warm-fg-disabled` tone, and the action is
  always present (never optional, since "try again" is the only real next step on a load
  failure). Superseded the earlier icon-based anatomy (red circle + exclamation mark) so a
  failure and an empty collection read as variations of one visual language rather than two
  unrelated components.
- **Heading:** Short, generic, and constant across screens (e.g. "Something went wrong.") —
  it does not vary per failure the way the body does.
- **Body:** The failure detail, drawn from a closed error vocabulary (`AppError` on mobile) —
  never the raw exception or HTTP diagnostic text. Failures the backend can describe cleanly
  (not found, validation, conflict) may show that detail directly; server/unknown failures
  always fall back to generic copy, since 5xx bodies can leak raw database error text.
- **Action:** `PrimaryButton` labeled "Retry", centered beneath the body — heavier weight than
  Empty State's optional `SecondaryButton`, since retrying is the single, always-available path
  forward here.
- **Tokens:** `--kluvs-danger` for the hex grid stroke; see § Fragmented Hex Grid for the base
  illustration spec (algorithm, stroke width, safe zone) shared with Empty State.
- **Components:** `ErrorScreen` (`kluvs-mobile/designsystem/.../components/ErrorScreen.kt`,
  Android — delegates to `EmptyState` with `lineColor = KluvsTheme.colors.danger`), `ErrorView`
  (`kluvs-mobile/iosApp/iosApp/Components/ErrorView.swift`, iOS — same delegation to
  `DesignSystem`'s `EmptyState`).
- **Scope:** For full-screen load failures only (a screen's primary data couldn't be fetched at
  all). Secondary/action failures (a mutation fails while the screen already has content — e.g.
  a failed login attempt, a failed save) use § Snackbar below instead, so one bad request
  doesn't blow away a screen the user is already looking at.

## 3. Empty State

Page-level "nothing here" state, used whenever a collection or section has no content —
an empty club list, a shelf with nothing on it, a club with no other members yet, and so on.
One reusable illustration; only the heading, body, and optional action change per screen.

| Property | Value |
|---|---|
| Heading | Italic EB Garamond 500, 22px |
| Body | 13px IBM Plex Sans, line-height 1.6, max-width ~240px |
| Illustration | **Fragmented Hex Grid** — see below |
| Action (optional) | `SecondaryButton` (see `docs/buttons.md`), centered, only when there's a real next step |

Heading and body sit centered in the middle of the illustration area — not below it — so
there's no extra eye travel between the graphic and the text. The heading reads in full
foreground contrast (`content`/`warm-fg-primary`); the illustration stays quiet, one step
above the surface it sits on (`warm-fg-disabled` / `divider`). Reserve a blank row beneath
the body for the optional action button; states with no real destination (e.g. a "no search
results yet" state) simply leave that row empty rather than adding a button with nowhere
useful to go.

### Fragmented Hex Grid

Not a static image — a deterministic pattern generated from a real tessellating hexagon
grid, so it can be regenerated at any container size (phone, tablet, web) without
re-drawing it by hand, and always stays aligned to the same underlying grid.

Shared verbatim between Empty State and § Error above — same algorithm, same seed, same
safe zone. Error is the one variant that overrides the stroke color (`--kluvs-danger`
instead of `--kluvs-warm-fg-disabled`); every other property below applies to both.

**Algorithm:**
1. Tile the container with pointy-top hexagons of a fixed size (**hex radius 34px** at
   phone scale — center to vertex), covering the full area plus a margin so edge hexagons
   bleed off all four sides.
2. Carve out a **safe zone** in the center of the container (reserved for the heading/body/
   action) and drop any hexagon or edge that falls inside it, padded by one hex radius.
3. Of the remaining hexagon cells, randomly activate **26%** of them.
4. For each active cell, keep **60%** of its 6 edges (chosen independently per edge) — this
   is what makes the result read as fragments of real hexagons (shared, connected corners)
   rather than disconnected floating lines, which is what independently sampling every edge
   in the grid produces.
5. Render the kept edges only — no fills, no complete hexagon outlines by design; the
   pattern should look like a hive with most of it missing, not a grid with a filter on it.
6. Fixed seed (**44** is the canonical reference, used in `assets/illustration-empty-hexagons.svg`
   and the preview card) — the layout is baked once per platform port, not regenerated at
   runtime or on every app launch.

**Style:**
| Property | Value |
|---|---|
| Stroke | `--kluvs-warm-fg-disabled` (`#4D4033`) — muted content token, not a surface/divider token |
| Stroke width | 1.75px at phone scale |
| Fill | none |
| Line caps | round |

Reference asset: `assets/illustration-empty-hexagons.svg` (360×620 viewBox, phone content-area scale).
Non-phone containers should regenerate the pattern at the same hex size and density rather
than stretching the reference SVG.

---

## 4. Snackbar

Transient, non-blocking feedback for the result of an action already in flight — a save
succeeded, a mutation failed, a login attempt was rejected. Floats above existing content at
the bottom of the screen and auto-dismisses; never blocks interaction the way a modal/dialog
does. This is the standard surface for **secondary/action failures** referenced in § Error
above (a mutation fails while the screen already has content) — and, as of this spec, for
**all** transient feedback across the app, including form-level failures like login, replacing
the per-screen ad hoc banners/toasts that predate this doc.

| Property | Value |
|---|---|
| Position | Bottom-anchored, above safe-area/nav chrome, horizontal margin 16px |
| Shape | Rounded rect, 12px corner radius |
| Duration | 4s auto-dismiss (no user action required); a message that changes while one is showing restarts the timer rather than queuing |
| Max width | Full width minus margins on phone; does not stretch on tablet/wide layouts — cap around 400px, centered |

**Anatomy:** Leading icon (variant-dependent) + message text (single line, truncate rather than
wrap for anything absurdly long). No action slot and no close button — dismissal is purely
time-based, superseded by the next message if one arrives first.

### Variants

| | Success (default) | Danger |
|---|---|---|
| Use for | Positive/success feedback — "Club created", "Invite link copied" | Action failed — "Couldn't save changes", login rejected, mutation `AppError`/`AuthError` |
| Background | `success`, fully opaque | `danger`, fully opaque |
| Border | none | none |
| Icon | `IconType.Check`, `onAccent` tint | `IconType.Error`, `onAccent` tint |
| Text | `onAccent` | `onAccent` |

Only two variants exist — no separate "neutral/informational" case, since every message this
app actually shows is either confirming something worked or reporting that it didn't. Both use
a solid, fully opaque fill (not a translucent wash) with `onAccent` (white) icon/text — the same
"opaque saturated surface + white content" pattern `PrimaryButton` uses for its copper fill,
applied to the status colors instead of the brand color. A subtle tint works for a banner pinned
inline on a known, fixed background (see `ErrorBanner`'s `dangerSubtle` treatment); a snackbar
floats over arbitrary content below it and needs to read clearly regardless of what's behind it.

**Components:** `KluvsSnackbar` (`kluvs-mobile/designsystem/.../components/KluvsSnackbar.kt`,
Android — passed as the `snackbar` composable to M3's `SnackbarHost`, so existing
`SnackbarHostState` plumbing is unchanged), `Snackbar`
(`kluvs-mobile/iosApp/DesignSystem/Sources/DesignSystem/Components/Snackbar.swift`, iOS —
replaces the earlier ad hoc `Toast` component).

## 5. Reading Progress (`.kluvs-progress-*`)

`ProgressBar` is the bar itself — a plain pill-shaped track with a pill-shaped fill, nothing
else. No gap or seam between the filled and unfilled portion, and no "stop indicator" dot at
the end — some UI toolkits' default progress bar draws both by default; this spec has neither.

| Property | Token | Value |
|---|---|---|
| Height | — | 4px |
| Track Color | `surface.warm-dark.card-2` | `#332B24` (dark) |
| Fill Color | `brand.primary` | Copper `#D16D30` |

`OwnProgressRow` is the composite built from it: the bar, a status label pair, and a small
`.kluvs-btn-secondary` "Update" action, used on cards and detail views.

### Web

```html
<div style="display:flex;align-items:center;gap:10px">
  <div class="kluvs-progress-track" style="flex:1">
    <div class="kluvs-progress-fill" style="width:47%"></div>
  </div>
  <button class="kluvs-btn-secondary kluvs-btn-secondary--sm">Update</button>
</div>
```

---

## 6. Offline Banner

Persistent, non-dismissible notice that the app cannot reach the network, so what the user is
looking at may be saved data. Unlike a Snackbar (a transient result of one action) it stays for as
long as the condition lasts and disappears on its own once the network is back. Unlike the Error
screen it never replaces content: the screen underneath keeps showing its saved data.

| Property | Value |
|---|---|
| Position | Top of the main tab shell, full width, above the tab content. Pushes content down; never overlays it |
| Fill | `wine` `#4F000C` — same on dark and light |
| Text | `onWine` `#F2EDE5`, Label family (14px IBM Plex Sans Medium), single line, centered |
| Height | 32px band. The host extends the same wine fill under the status-bar inset so the band and the status bar read as one, and switches the status-bar icons to light while it shows (they are dark on the light theme, unreadable on wine) |
| Shape | Rectangle, no radius, no border, no shadow — a full-bleed band, not a floating card |
| Copy | "You're offline. Showing saved data." Sentence case, no icon, no action, no dismiss |
| Motion | Slide down + fade in, 250ms, identity easing `cubic-bezier(0.2, 0.8, 0.2, 1)`; reversed on exit. With reduced motion, fade only |

**When it shows:** only when the network is unreachable (a request failed to connect or timed
out). Any HTTP response, even a 4xx or 5xx, means the network is reachable and the banner stays
hidden — server failures are the Error screen's and Snackbar's job. It clears on the next
request that gets a response, or when a background connectivity check finds the internet is back
(first after 5s, backing off to every 30s, and only while the banner is showing).

**Scope:** the main tab shell only. Full-screen flows outside it (auth, settings, invite join) do
not show it.

**Contrast:** text on wine is 13.5:1 (passes AA and AAA). The band against its neighbours is a
different matter: ~13.9:1 against the light bar, but only ~1.2:1 against the warm-dark bar,
because both are dark. On dark it therefore separates by hue, and the state is carried by the
text, never by the fill alone. Do not lighten the fill to chase a lightness ratio: a wine light
enough to reach 3:1 on dark reads as `danger` red, and offline is a state, not an error.

**iOS status bar:** the host passes `extendsUnderStatusBar: true`, so the wine fill carries up
under the status bar exactly as on Android. SwiftUI cannot set the status-bar icon style on its
own (screens hide their navigation bar, so `toolbarColorScheme` has no effect), so the host also
forces light icons while the banner shows, by overriding the root hosting controller's status bar
style. Without that, the dark icons of the light theme are unreadable on wine. The component alone
defaults to `extendsUnderStatusBar: false`, which leaves the band below the status bar.

**Accessibility:** announce as a polite live region (Android `liveRegion = Polite`; iOS
`accessibilityAddTraits(.isStaticText)` plus an announcement on appear) so screen readers say it
once when it appears, without stealing focus. No icon, so nothing needs a content description.

**Do not:** use `danger` or copper for it; add a dismiss control (it reflects live state); show
it for server errors; stack it with a Snackbar in the same place (the Snackbar is bottom-anchored,
so they do not collide).

**Tokens:** `color.status.wine`, `color.status.on-wine`; roles `offline` / `onOffline`
(`docs/colors.md`).

**Components:** `OfflineBanner`
(`kluvs-mobile/designsystem/.../components/OfflineBanner.kt`, Android),
`OfflineBanner`
(`kluvs-mobile/iosApp/DesignSystem/Sources/DesignSystem/Components/States/OfflineBanner.swift`, iOS).
