# Kluvs Design System

> A book-club mobile app design system, v1.0 · Android + iOS · Kotlin Multiplatform

## What is Kluvs?

Kluvs ("Kluv" = a club) is a small, focused mobile app for running real-world book clubs. The product centres on three things: **finding your club**, **showing what you're reading right now**, and **knowing when the next discussion is**. The brand is warm, literary and a little vintage — copper-orange on warm-black surfaces, set in clean Inter typography. It feels like a hardcover book on a reading lamp at night, not a slick consumer app.

The app's surface model is **dark-by-default in product, light in auth/marketing**. Cards, lists, top bars and bottom nav all sit on a near-black, slightly warm `#140F0D` page. The single accent — copper `#D16E30` — picks out the active tab, primary CTAs, the next discussion, the active timeline node, and brand wordmarks.

## Sources

- **Figma file:** `Kluvs Design System.fig` (mounted as a virtual filesystem during generation; not redistributed here).
  - Pages: `Cover`, `Getting-Started` (22 frames), `Foundations` (60 frames), `Components` (22 frames), `Mobile-Auth`, `Mobile-Clubs`, `Mobile-Profile`, plus an empty `Web-TBD`.
  - Top components: `MemberAvatar` (Owner / Admin / Member × sm / md / lg), `InputField` (default / focused / error / disabled), `SocialButton` (Discord / Google / Apple), `TextDivider`, `LoadingScreen`, `ErrorScreen`, `NextDiscussionCard`.
- **Codebase:** none provided. The Figma JSX export is the source of truth.
- **Imagery / illustration:** none in the file (zero raster images registered in metadata). The brand carries entirely on type, color and surface.

## Index

| File / folder | What's in it |
|---|---|
| `README.md` | This document. Brand summary, content + visual + iconography rules, manifest. |
| `SKILL.md` | Cross-compatible Agent Skill front-matter so this folder works as a skill in Claude Code. |
| `colors_and_type.css` | Single source of truth for color, spacing, radius and type tokens. CSS custom properties + utility classes. |
| `assets/` | Brand mark, role badges, social-provider glyphs (SVG). Drop-in. |
| `preview/` | One small HTML card per token group — fed to the Design System review tab. |
| `ui_kits/mobile/` | High-fidelity recreation of the mobile product (auth → club → profile). React + JSX components + an interactive `index.html`. |

## Content fundamentals

The voice is **plain, warm and a little understated**. Sentences are short. The product never shouts.

- **Tone:** literary-casual. "Welcome back" / "Sign in to continue to your book clubs" / "And more…" — friendly without being chirpy. No exclamation marks anywhere in the figma source.
- **Person:** **second-person** addressing the reader ("Sign in to continue to **your** book clubs", "**Your** Statistics"). Profile screen header is just "**Me**" — first-person framing for self-views, second-person for system messages.
- **Casing:** **Title Case** for screen titles, section headers and tabs ("Active Session", "Next Discussion", "Currently Reading", "Help & Support"). **Sentence case** for body and metadata ("In person", "Founded in 2026", "Member since 2026"). All-caps reserved for **brand wordmarks only** (KLUVS) and the occasional eyebrow ("NEXT DISCUSSION" 10px tracked label on the discussion card).
- **Numbers + dates:** abbreviated dates use month name ("Apr 12, 2026 · 7:00 PM"), long-form for in-app event titles ("March 2, 2026 at 5:00 PM"). Counts always shown with a noun ("6 members", "23 books read", "3 clubs").
- **Microcopy patterns:**
  - "Continue with {Provider}" for OAuth.
  - "Don't have an account? Sign up" — link is just the verb, in primary copper.
  - "Forgot password?" — sentence-case, never "Forgot Password?".
  - Errors: "Error: this field is required" — prefixed with the literal word "Error:".
  - Empty/loading: "Loading…" / "Something went wrong" + "Please try again".
- **No emoji.** None appear in the figma source. Don't add them.
- **Vibe:** the app trusts its content. Big quiet surfaces, small confident type, one warm accent. When in doubt write less.

## Visual foundations

### Color
A **monochrome warm-black scale** (five surfaces from `#0F0D0A` bottom-nav up to `#332B24` cards-2) carries everything in product; **light cream `#F2EDE5`** is the primary text on dark; **copper `#D16E30`** is the only chromatic accent. Auth and marketing flip to a light `#FAFAFC` page with near-black `#1A1A1A` text. There is no secondary brand color.

Role accents are rare and reserved: **owner** = goldenrod `#F0BF05`, **admin** = teal `#006682`, **member** = no decoration. Error red `#E53333` is desaturated and used only for inline form errors.

### Type
**Inter only**, three weights: Regular 400, Medium 500, Bold 700. Six text styles in figma — `titleLarge 22 / titleMedium 16M / bodyLarge 16 / bodyMedium 14 / labelMedium 12M / labelSmall 11M`. Plus three display sizes for brand surfaces (96 / 48 / 32). All tokens line-height 100% in figma; we relax to 1.4 for paragraphs in our utilities. No serifs, no italic, no monospace. Tracking is default.

### Spacing & radius
Spacing scale is a strict **4 / 8 / 12 / 16 / 24**. Page gutters are 20px. Card internal padding is 16px. Vertical rhythm between sections is 16–24px.

Radius scale is **4 (sm) / 8 (md) / 16 (lg)**. In practice product surfaces use a tight subset: cards & primary CTAs at **10**, inputs at **8**, status indicators / 16-px squares at **2**, avatars and circular badges at **9999**. Pills (selected bottom-nav indicator) use the pill radius over a 36×72 capsule.

### Backgrounds
**No imagery, no gradients, no textures.** Surfaces are flat, solid colors stepped by ~5% lightness. The cover frame's only decoration is a **6-px copper top-edge bleed** + small orange dot punctuating the wordmark. The product never uses full-bleed photography or illustration.

### Animation
Not specified in figma. House style implied by the surface model: **soft fades, no bounces.** Suggested: 150–200ms ease-out for hover/press, 250ms for screen transitions, identity easing `cubic-bezier(0.2, 0.8, 0.2, 1)`. Never spin a logo. Loading uses a static stroked ring with a 1.2s linear rotate.

### Hover & press states
Targets a **mobile** product, so press matters most.
- **Press on filled CTA:** the CTA shifts to copper `rgba(209,110,48,0.85)` overlay; no shrink.
- **Press on dark card:** background steps up one surface (`#241C17` → `#332B24`).
- **Press on light list row:** background goes to `--kluvs-surface-muted` (`#F5F5F5`).
- **Selected tab:** copper text + 2-px copper underline (130 px wide, radius 1).
- **Selected bottom-nav:** copper-tinted pill `rgba(209,110,48,0.18)` behind the icon, copper label underneath.

### Borders & strokes
- Inputs: 1-px stroke `#B0B0B0`, focused → 2-px copper, error → 1-px error-red.
- Cards on dark: no border by default. Highlighted cards (Next Discussion) get **1.5-px copper** + a deeper warm fill `#382112`.
- Dividers on dark: `#332B24` 1-px line. On light: `#E0E0E0`.

### Shadows
The figma metadata records `rgba(0,0,0,0.05)` shadows 12×, all on light surfaces. **Elevation is whisper-quiet.** Use `0 1px 2px rgba(0,0,0,0.05)` for cards on light. Dark cards earn elevation via lighter fills, not shadows.

### Transparency & blur
Used in exactly two places in the figma:
1. The selected bottom-nav pill (copper at 18% opacity).
2. Provider button glyph slabs (white at 60% over the colored fill — placeholder where a real logo would sit).

No backdrop-blur, no glassmorphism.

### Imagery vibe
There is no imagery in the source. If imagery is added later: **warm, slightly desaturated, dim-room book photography** would fit. Avoid cool blues, neon, or stock-flat illustration.

### Cards
Square-ish, **10-px radius**, **no border on dark** / 1-px stroke on light if needed, **16-px internal padding**, no shadow on dark. Highlighted variant: copper border + warm tinted fill. Sections separate with 1-px divider rather than separate cards where possible.

### Layout rules
- Mobile canvas: **390 × 844** (iPhone 14).
- Top app-bar: 52 px tall, fills `--kluvs-surface-dark-bar`, 22-px Bold cream wordmark/title at 20-px gutter.
- Sub-bar (showcase row): 40 px tall, same fill.
- Tab strip: 42 px tall, 13-px tab labels, 2-px copper underline on the active tab.
- Bottom nav: 80 px tall, sits on `--kluvs-surface-dark-nav`, two items, copper pill on selected.
- Cards: 350 × variable, gutters at 20 px.
- Status bar mocks: 44 px.

## Iconography

**Status:** the figma file does **not** ship a real icon set. Every "icon" in the JSX is a 12–20-px rounded rectangle (radius 1–4) acting as a placeholder. There is no icon font, no SVG sprite, no PNG icon library, and no emoji.

**Approach for this design system:** we standardize on **[Lucide](https://lucide.dev)** as the substitution layer — same metric (24-px viewBox), 1.5-px stroke, rounded line caps, monoline. This matches the figma's monoline, slightly soft-edged placeholder vibe better than Heroicons or Material Symbols. In the UI kit we link Lucide via CDN.

> ⚠️ **Substitution flag:** Lucide is a stand-in. The Kluvs Figma file lists no shipped icons; if/when the team decides on a final set (custom or otherwise), drop it into `assets/icons/` and replace the Lucide references in `ui_kits/mobile/`.

**Glyph use beyond icons:**
- Status-bar mocks use unicode dots and a triangle: `●  ▲  80%`. Treat these as decorative, not as an icon system.
- Brand wordmark "KLUVS" is **typographic** (Inter Bold). The only graphic flourish is a single 14-px copper dot used as punctuation next to the wordmark on the cover frame, and an 8-px copper underline beneath the wordmark on the auth screen.
- **Emoji: never.**

**Where we do ship assets** (in `assets/`):
- `kluvs-wordmark-light.svg` / `kluvs-wordmark-dark.svg` — typographic logo, two themes.
- `kluvs-mark.svg` — a compact KL-with-dot mark for app icon / favicon use.
- `role-badge-owner.svg`, `role-badge-admin.svg` — gold and teal badge dots.
- `provider-discord.svg`, `provider-google.svg`, `provider-apple.svg` — official-style provider glyphs sized for the social buttons.

## UI kits

| Kit | Path | Surfaces |
|---|---|---|
| Mobile (iOS / Android) | `ui_kits/mobile/` | Login → Clubs (General / Active Session / Members) → Profile. Click-thru prototype. |

Web is left out — the Figma's `Web-TBD` page is intentionally empty.

## Caveats / open questions

- The figma file is a foundation pass: 26 variables, 6 text styles, 8 components. **There is no full button system yet** (only the social-button and the inline filled-rectangle CTA on auth). I've expressed both forms in the UI kit and grouped them together; flag if/when a real `Button` component lands.
- **No web frames** — `Web-TBD` is empty. Don't extrapolate the dark mobile palette to a marketing site without a designer's review.
- **No icon set** (see Iconography above). Lucide is a flagged substitute.
- **No motion spec.** Defaults are conservative best-guesses.
- **Inter** is loaded from Google Fonts CDN; we did not find a hosted `.ttf` to copy locally. If the team wants a fully offline kit, drop Inter `.ttf`s into `fonts/` and adjust `colors_and_type.css`.
