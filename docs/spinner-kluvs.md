# Kluvs Loading Spinner — Developer Guide

Breathe·Tidal variant. The Kluvs three-hexagon mark with a 4-second box-breathing
animation: inhale (rotate 120°, scale up, full opacity) → hold → exhale (rotate another
120°, scale down, dimmed) → hold → repeat. Every 120° step lands on a visually
identical pose (the mark has 3-fold symmetry), so the loop is seamless.

## File map

| File | Target platform | What it is |
|---|---|---|
| `spinner-kluvs.svg` | Web | Self-contained animated SVG. Drop into `<img>` or inline. Animation, keyframes, and color are all embedded. |
| `android/drawable/spinner_kluvs.xml` | Android | Static VectorDrawable — the mark's shapes with the pivot point set. Never used directly; referenced by the animation wrapper. |
| `android/drawable/spinner_kluvs_animation.xml` | Android | AnimatedVectorDrawable wrapper. This is what you point `ImageView` or Compose at. |
| `android/animator/spinner_kluvs_group.xml` | Android | Keyframe animator for the `<group>`: rotation, scaleX, scaleY — five keyframes, exact timing. |
| `android/animator/spinner_kluvs_root.xml` | Android | Keyframe animator for the root `<vector>`: alpha (opacity). |
| `android/interpolator/kluvs_breathe_tidal.xml` | Android | Path interpolator matching `cubic-bezier(0.4, 0, 0.4, 1)` — the easing used on the inhale and exhale transitions. |
| `ios/KluvsSpinner.swift` | iOS / SwiftUI | Drop-in SwiftUI view. Requires iOS 17+. Respects `accessibilityReduceMotion`. |

---

## Web

### As `<img>` (simplest)

```html
<img src="assets/spinner-kluvs.svg" alt="Loading" width="32" height="32">
```

The SVG is self-contained: keyframes, easing, and color (`#D16D30`) are all inside the
file. Works in Chrome and Firefox. Safari does not run CSS animations inside `<img>` SVGs
— see the inline option below if Safari support is required.

### Inline SVG (full browser support, CSS token wiring)

Copy the SVG markup inline and drive the animation from your page stylesheet.
Add this to your CSS:

```css
@keyframes spinBreatheTidal {
  0%   { transform: rotate(0deg)   scale(0.96); opacity: 0.94; animation-timing-function: cubic-bezier(0.4, 0, 0.4, 1); }
  35%  { transform: rotate(120deg) scale(1.08); opacity: 1;    animation-timing-function: linear; }
  50%  { transform: rotate(120deg) scale(1.08); opacity: 1;    animation-timing-function: cubic-bezier(0.4, 0, 0.4, 1); }
  85%  { transform: rotate(240deg) scale(0.96); opacity: 0.94; animation-timing-function: linear; }
  100% { transform: rotate(240deg) scale(0.96); opacity: 0.94; }
}
.kluvs-spinner {
  transform-origin: 50% 50%;
  animation: spinBreatheTidal 4000ms infinite;
}
@media (prefers-reduced-motion: reduce) {
  .kluvs-spinner {
    animation: none;
    transform: rotate(0deg) scale(0.96);
    opacity: 0.94;
  }
}
```

Then inline the SVG — the `class="kluvs-spinner"` goes on the root `<svg>`:

```html
<svg class="kluvs-spinner"
     viewBox="-52.79 -74 500 500"
     width="32" height="32"
     xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Loading">
  <g fill="var(--kluvs-primary, #D16D30)"
     stroke="var(--kluvs-primary, #D16D30)"
     stroke-width="14" stroke-linejoin="round" stroke-linecap="round">
    <polygon fill="none"   points="11,68.51 110.6,11 197.21,61 283.81,11 383.41,68.51 383.41,183.52 296.81,233.52 296.81,333.52 197.21,391.02 97.6,333.52 97.6,233.52 11,183.52"/>
    <polygon stroke="none" points="191.58,79.26 191.58,172.76 110.6,219.51 29.63,172.76 29.63,79.26 110.6,32.51"/>
    <polygon stroke="none" points="364.78,79.26 364.78,172.76 283.81,219.51 202.83,172.76 202.83,79.26 283.81,32.51"/>
    <polygon stroke="none" points="278.18,229.26 278.18,322.76 197.21,369.51 116.23,322.76 116.23,229.26 197.21,182.51"/>
  </g>
</svg>
```

When inline, `fill="var(--kluvs-primary, #D16D30)"` resolves from the page's CSS token,
so it stays in sync with any future token changes automatically.

### Sizes

| Context | Size |
|---|---|
| Inline within text / table cell | 16 px |
| Button loading state, list row | 32 px (default) |
| Section / panel takeover | 64 px |
| Full-screen page loading | 128 px max |

---

## Android

### Step 1 — Copy files into the project

The `android/` folder in this bundle mirrors the `res/` structure of a standard Android
project. Copy each subfolder into `app/src/main/res/`:

```
design-system/assets/android/          →   app/src/main/res/
  drawable/spinner_kluvs.xml           →     drawable/spinner_kluvs.xml
  drawable/spinner_kluvs_animation.xml →     drawable/spinner_kluvs_animation.xml
  animator/spinner_kluvs_group.xml     →     animator/spinner_kluvs_group.xml
  animator/spinner_kluvs_root.xml      →     animator/spinner_kluvs_root.xml
  interpolator/kluvs_breathe_tidal.xml →     interpolator/kluvs_breathe_tidal.xml
```

Create `res/animator/` and `res/interpolator/` if they don't already exist in the project.

### Step 2 — XML layout (View system)

```xml
<ImageView
    android:id="@+id/loadingSpinner"
    android:layout_width="32dp"
    android:layout_height="32dp"
    android:src="@drawable/spinner_kluvs_animation"
    android:contentDescription="@string/loading" />
```

### Step 3 — Start / stop in Kotlin (View system)

```kotlin
import androidx.vectordrawable.graphics.drawable.AnimatedVectorDrawableCompat

// In your Fragment / Activity:
val spinner = binding.loadingSpinner
val avd = AnimatedVectorDrawableCompat.create(requireContext(), R.drawable.spinner_kluvs_animation)
spinner.setImageDrawable(avd)

// Show and start
spinner.isVisible = true
avd?.start()

// Hide and stop (e.g. when data loads)
avd?.stop()
spinner.isVisible = false
```

> Use `AnimatedVectorDrawableCompat` (from `androidx.vectordrawable`) rather than the
> framework `AnimatedVectorDrawable` — the compat version handles API-level differences
> and works down to API 21.

### Step 4 — Jetpack Compose

Compose doesn't natively start infinite AVD loops, so wrap it in an `AndroidView`:

```kotlin
import androidx.compose.ui.viewinterop.AndroidView
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import android.widget.ImageView
import androidx.vectordrawable.graphics.drawable.AnimatedVectorDrawableCompat

@Composable
fun KluvsSpinner(
    modifier: Modifier = Modifier,
    size: Dp = 32.dp
) {
    AndroidView(
        factory = { context ->
            ImageView(context).apply {
                val avd = AnimatedVectorDrawableCompat.create(
                    context,
                    R.drawable.spinner_kluvs_animation
                )
                setImageDrawable(avd)
                avd?.start()
            }
        },
        modifier = modifier.size(size)
    )
}
```

### Step 5 — Reduced motion

Check Android's animator duration scale before starting the animation. A scale of 0
means the user has turned off animations in Accessibility settings.

```kotlin
import android.provider.Settings

fun isReduceMotionEnabled(context: Context): Boolean {
    val scale = Settings.Global.getFloat(
        context.contentResolver,
        Settings.Global.ANIMATOR_DURATION_SCALE,
        1f
    )
    return scale == 0f
}

// Usage:
if (!isReduceMotionEnabled(requireContext())) {
    avd?.start()
}
// When reduced motion is on, the static drawable (spinner_kluvs.xml)
// renders the mark at rest pose (scale 0.96, opacity 0.94) — no changes needed.
```

---

## iOS — SwiftUI

### Step 1 — Add the SVG asset

Add `spinner-kluvs.svg` to the Xcode asset catalog under the name **`spinner-kluvs`**.
The SVG's embedded animation CSS is ignored by the asset catalog (static render only) —
SwiftUI drives the motion instead.

### Step 2 — Copy the Swift file

Copy `ios/KluvsSpinner.swift` into your iOS target. No additional dependencies required.
Requires **iOS 17+** (uses `KeyframeAnimator`).

### Step 3 — Use it

```swift
// Default size (32 pt)
KluvsSpinner()

// Custom size
KluvsSpinner(size: 64)

// In context
VStack(spacing: 16) {
    KluvsSpinner()
    Text("Loading…")
        .foregroundStyle(.secondary)
}
```

Reduced motion is handled automatically via `@Environment(\.accessibilityReduceMotion)`.
When enabled, the mark renders static at the rest pose (scale 0.96, opacity 0.94).

---

## Animation spec (all platforms)

| Property | Rest / exhale | Apex / inhale |
|---|---|---|
| Rotation | +240° per full cycle (2 × 120° steps) | — |
| Scale | 0.96 | 1.08 |
| Opacity | 0.94 | 1.00 |
| Duration | 4 000 ms per cycle | — |
| Easing (transitions) | `cubic-bezier(0.4, 0, 0.4, 1)` | — |
| Easing (holds) | `linear` | — |
| Reduced motion | Static rest pose — no animation | — |

The mark has 3-fold rotational symmetry, so every 120° step is visually identical to
the start — the loop seam is invisible.
