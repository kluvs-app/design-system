import SwiftUI

// Kluvs Loading Spinner — Breathe·Tidal variant.
//
// Requires "spinner-kluvs" SVG added to the Xcode asset catalog.
// Use assets/spinner-kluvs.svg from the design system — its recentered
// viewBox (-22.79 -44 440 440) places the mark's rotation centroid at
// exactly 50% 50%, so SwiftUI's default .center anchor rotates correctly.
//
// Minimum: 16 pt  |  Default: 32 pt  |  Large: 64 pt  |  Max: 128 pt
//
// Requires iOS 17+ (KeyframeAnimator). For iOS 16 fallback, replace the
// KeyframeAnimator block with a simple withAnimation(.linear(duration: 4.0)
// .repeatForever()) rotation — lower fidelity but functional.

public struct KluvsSpinner: View {
    public var size: CGFloat = 32

    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    public init(size: CGFloat = 32) {
        self.size = size
    }

    public var body: some View {
        Group {
            if reduceMotion {
                // Static rest pose — no motion, respects user preference.
                Image("spinner-kluvs")
                    .resizable()
                    .scaledToFit()
                    .scaleEffect(0.96)
                    .opacity(0.94)
            } else {
                KeyframeAnimator(
                    initialValue: SpinnerState(),
                    repeating: true
                ) { state in
                    Image("spinner-kluvs")
                        .resizable()
                        .scaledToFit()
                        .rotationEffect(.degrees(state.rotation))
                        .scaleEffect(state.scale)
                        .opacity(state.opacity)
                } keyframes: { _ in
                    // Rotation: 0° → 120° (inhale) → hold → 240° (exhale) → hold
                    // 240° per cycle. The mark has 3-fold symmetry, so
                    // 240° ≡ 0° visually — the loop seam is invisible.
                    KeyframeTrack(\.rotation) {
                        MoveKeyframe(0)
                        CubicKeyframe(120, duration: 1.4)   // inhale
                        LinearKeyframe(120, duration: 0.6)  // hold
                        CubicKeyframe(240, duration: 1.4)   // exhale
                        LinearKeyframe(240, duration: 0.6)  // hold
                    }
                    KeyframeTrack(\.scale) {
                        MoveKeyframe(0.96)
                        CubicKeyframe(1.08, duration: 1.4)
                        LinearKeyframe(1.08, duration: 0.6)
                        CubicKeyframe(0.96, duration: 1.4)
                        LinearKeyframe(0.96, duration: 0.6)
                    }
                    KeyframeTrack(\.opacity) {
                        MoveKeyframe(0.94)
                        CubicKeyframe(1.0, duration: 1.4)
                        LinearKeyframe(1.0, duration: 0.6)
                        CubicKeyframe(0.94, duration: 1.4)
                        LinearKeyframe(0.94, duration: 0.6)
                    }
                }
            }
        }
        .frame(width: size, height: size)
    }
}

// NOTE: CubicKeyframe uses SwiftUI's natural cubic spline interpolation,
// which is a close approximation of the spec's cubic-bezier(0.4, 0, 0.4, 1).
// The perceptual difference is negligible for this slow breathing motion.

private struct SpinnerState {
    var rotation: Double = 0
    var scale: Double = 0.96
    var opacity: Double = 0.94
}

#Preview {
    VStack(spacing: 32) {
        KluvsSpinner(size: 16)
        KluvsSpinner(size: 32)
        KluvsSpinner(size: 64)
    }
    .padding(40)
    .background(Color(red: 0.078, green: 0.059, blue: 0.051)) // #140F0D warm dark
}
