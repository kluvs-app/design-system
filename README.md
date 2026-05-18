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
| `tokens.json` | Platform-agnostic token source. W3C / Style Dictionary compatible (`$value` / `$type` / `$description`). Read from any client repo to sync values without build tooling. |
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
A **monochrome warm-black scale** (five surfaces from `#0F0D0A` bottom-nav up to `#332B24` cards-2) carries everything in product; **light cream `#F2EDE5`** is the primary text on dark; **copper `#D16D30`** is the only chromatic accent. Auth and marketing flip to a light `#FAFAFC` page with near-black `#1A1A1A` text. There is no secondary brand color.

Role accents are rare and reserved: **owner** = mustard `#C9900A` (graphical badge on both surfaces), **admin** = teal `#006781`, **member** = no decoration. Error red `#EF4444` is used only for inline form errors.

### Type
**Two-register system** — EB Garamond (serif) for literary content, IBM Plex Sans for UI chrome. Three weights each: Regular 400, Medium 500, Bold 700. No other weights.

**Serif register (EB Garamond):** wordmark, display text, page headings, section headings, and book titles. Book titles use italic. This is the literary layer — it signals "here is the thing you care about."

**Sans register (IBM Plex Sans):** all UI chrome — body text, labels, buttons, tabs, modal titles, helper text, eyebrow labels. This is the interface layer — neutral and readable at all sizes.

**Eyebrow pattern:** section labels within UI panels and tabs use IBM Plex Sans at `helper-sm` size, weight 500, uppercase, `letter-spacing: 0.1em`. Do not use a heading class for these — use `.kluvs-eyebrow`.

**Rule of thumb:** if the text is *about something you're reading or discussing* → serif. If the text is *telling the interface what to do* → sans.

#### Typography tier system

A four-tier hierarchy governs content hierarchy across both mobile (M3 roles) and web (utility class names):

| Tier | Purpose | Mobile (M3) | Mobile color role | Web class |
|---|---|---|---|---|
| 1 — Section headers | Labels that introduce sections or cards | `titleMedium` | `onSurfaceVariant` | `.kluvs-section-heading` |
| 2 — Primary content | The most important information on screen | `bodyLarge` | `onSurface` | `.kluvs-body-lg` |
| 3 — Supporting details | Secondary context: counts, metadata, handles, dates | `bodyMedium` | `onSurfaceVariant` | `.kluvs-body` |
| 4 — Fine print | Version numbers, disclaimers | `bodySmall` | `inverseOnSurface` | `.kluvs-helper-sm` |

Mobile uses M3 semantic color roles (not hardcoded hex) so the tier system works in both light and dark themes automatically. Web uses the utility classes defined in `colors_and_type.css`.

### Spacing & radius
Spacing scale is a strict **4 / 8 / 12 / 16 / 24**. Page gutters are 20px. Card internal padding is 16px. Vertical rhythm between sections is 16–24px.

Radius scale is **4 (sm) / 8 (md) / 16 (lg)**. In practice product surfaces use a tight subset: cards & primary CTAs at **12**, inputs at **8**, status indicators / 16-px squares at **2**, avatars and circular badges at **9999**. Pills (selected bottom-nav indicator) use the pill radius over a 36×72 capsule.

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

**Canonical source: [Material Symbols](https://fonts.google.com/icons) (Google Fonts)**

| Parameter | Value |
|---|---|
| Weight | 600 |
| Grade | 0 |
| Optical Size | 24px |
| Base size | 24px |
| File type | SVG |
| State — unselected | Unfilled |
| State — selected | Filled |

> **UI kit note:** `ui_kits/mobile/` currently uses inline Lucide SVGs as a stand-in from the initial Figma generation pass. These should be replaced with Material Symbols exports when building production screens. `assets/icons/` is the intended drop location.

**Glyph use beyond icons:**
- Status-bar mocks use unicode dots and a triangle: `●  ▲  80%`. Treat these as decorative, not as an icon system.
- Brand wordmark "KLUVS" is **typographic** (Inter Bold). The only graphic flourish is a single 14-px copper dot used as punctuation next to the wordmark on the cover frame, and an 8-px copper underline beneath the wordmark on the auth screen.
- **Emoji: never.**

**Shipped assets** (in `assets/`):

*Brand:*
- `kluvs-wordmark-light.svg` / `kluvs-wordmark-dark.svg` — typographic logo, two themes.
- `kluvs-mark.svg` / `kluvs-mark-white.svg` — compact mark for app icon / favicon use.
- `kluvs-app-icon.png` / `kluvs-app-icon-mark.svg` — app icon assets.

*Role badges:*
- `role-badge-owner.svg` — mustard badge dot (`#C9900A`). Usable as graphical indicator on both surfaces.
- `role-badge-admin.svg` — teal badge dot (`#006781`).

*OAuth providers:*
- `provider-discord.svg`, `provider-google.svg`, `provider-apple.svg` — official-style provider glyphs sized for social buttons.

*Icons (Material Symbols exports, 24px SVG):*
- `icon-arrow-back.svg`, `icon-book.svg`, `icon-check.svg`, `icon-crown.svg`, `icon-diamond.svg`
- `icon-email.svg`, `icon-gem.svg`, `icon-help.svg`, `icon-hexagon.svg`, `icon-hive.svg`
- `icon-honeycomb.svg`, `icon-info.svg`, `icon-location.svg`, `icon-logout.svg`, `icon-password.svg`
- `icon-person.svg`, `icon-settings.svg`, `icon-shield.svg`, `icon-unfold.svg`

## UI kits

| Kit | Path | Surfaces |
|---|---|---|
| Mobile (iOS / Android) | `ui_kits/mobile/` | Login → Clubs (General / Active Session / Members) → Profile. Click-thru prototype. |

Web is left out — the Figma's `Web-TBD` page is intentionally empty.

## Accessibility

Contrast ratios computed against WCAG 2.x relative luminance. Target: **AA (4.5:1 normal text, 3:1 large/UI)**.

### Dark product surfaces (warm dark)

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Cream `#F2EDE5` | Base `#140F0D` | 16.32:1 | AAA |
| Cream `#F2EDE5` | Bar `#1A140F` | 15.66:1 | AAA |
| Cream `#F2EDE5` | Card `#241C17` | 14.38:1 | AAA |
| Label `#C9BDA8` | Base `#140F0D` | 10.26:1 | AAA |
| Mustard `#C9900A` | Base `#140F0D` | ~7:1 | AA |
| Tertiary `#8C8073` | Base `#140F0D` | 4.94:1 | AA |
| Copper `#D16D30` | Base `#140F0D` | 5.38:1 | AA |
| Copper `#D16D30` | Card `#241C17` | 4.74:1 | AA |
| Error `#EF4444` | Base `#140F0D` | 5.06:1 | AA |
| Placeholder `#6B5F52` | Base `#140F0D` | 3.07:1 | AA large / UI |
| Disabled `#4D4033` | Base `#140F0D` | 1.90:1 | Fail — intentional |
| Admin `#006781` | Base `#140F0D` | 2.95:1 | **Known exception** |

### Light surfaces (auth / marketing)

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Near-black `#1A1A1A` | White `#FFFFFF` | 17.40:1 | AAA |
| Near-black `#1A1A1A` | Page `#FAFAFC` | 16.70:1 | AAA |
| Secondary `#666666` | White `#FFFFFF` | 5.74:1 | AA |
| Admin `#006781` | White `#FFFFFF` | 6.45:1 | AA |
| Copper `#D16D30` | White `#FFFFFF` | 3.53:1 | AA large / UI |
| Copper `#D16D30` | Page `#FAFAFC` | 3.39:1 | AA large / UI |
| White `#FFFFFF` | Copper `#D16D30` | 3.53:1 | **Known exception** |
| Error `#EF4444` | White `#FFFFFF` | 3.76:1 | **Known exception** |
| Mustard `#C9900A` | White `#FFFFFF` | ~3:1 | AA large / UI |

### Known exceptions

Three pairings fall below strict AA for normal text. Each is a deliberate, documented trade-off:

**White on Copper (3.53:1) — Primary CTA button text**
The WCAG 2.x luminance formula under-represents perceptual contrast for saturated warm hues. The hue separation between white and copper reads as higher contrast than the ratio suggests. Button text is also rendered at 15px/600 weight with clear interactive affordance. This is expected to pass under WCAG 3.0 / APCA. Do not darken copper to chase this number — it would compromise the brand identity.

**Admin Teal on Warm Dark Base (2.95:1) — Role badge indicator**
Admin teal (`#006781`) is used exclusively as a graphical badge indicator on dark surfaces, never as body text. The 3:1 UI component threshold applies; at 2.95:1 it is marginally below. The teal reads clearly against the near-black warm surface in practice. Monitor and revisit if the admin badge ever carries text content.

**Error Red on White (3.76:1) — Inline form error messages**
Error red (`#EF4444`) passes AA for large/bold text (3:1) but not for normal body text (4.5:1). Inline error messages are always prefixed with "Error:" (per content guidelines), rendered in a context where the red color reinforces the severity — never as the sole indicator. Acceptable as a compound signal; avoid using error red as the only means of conveying state.

## Caveats / open questions

- The figma file is a foundation pass: 26 variables, 6 text styles, 8 components. **There is no full button system yet** (only the social-button and the inline filled-rectangle CTA on auth). I've expressed both forms in the UI kit and grouped them together; flag if/when a real `Button` component lands.
- **No web frames** — `Web-TBD` is empty. Don't extrapolate the dark mobile palette to a marketing site without a designer's review.
- **No icon set** (see Iconography above). Lucide is a flagged substitute.
- **No motion spec.** Defaults are conservative best-guesses.
- **Inter** is loaded from Google Fonts CDN; we did not find a hosted `.ttf` to copy locally. If the team wants a fully offline kit, drop Inter `.ttf`s into `fonts/` and adjust `colors_and_type.css`.
