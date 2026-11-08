// Store screenshot copy + config.
// One entry per screenshot, in listing order. Edit copy here; templates read it.
//
//   id       — capture number: raw/android/screen-<id>.png, raw/ios/ios-screen<id>.png
//   eyebrow  — short ALL-CAPS label (copper — the one accent in the frame)
//   headline — EB Garamond, sentence case, ends with a period, no exclamation marks
//   sub      — IBM Plex Sans, one short sentence
//
// SURFACE applies to the whole set: "light" (cream — the marketing surface)
// or "dark" (warm-dark — the product surface). A per-shot `surface` overrides it.
window.KLUVS_SURFACE = "light";

window.KLUVS_SHOTS = [
  {
    id: "1",
    eyebrow: "Your reading",
    headline: "Everything you're reading, at a glance.",
    sub: "Your clubs, your shelf and what's up next.",
  },
  {
    id: "2",
    eyebrow: "Your Kluvs",
    headline: "All your book clubs in one place.",
    sub: "Start a club, or join one with a code.",
  },
  {
    id: "3",
    eyebrow: "Active session",
    headline: "Read together, at your own pace.",
    sub: "See how far along you are, and how the club is doing.",
  },
  {
    id: "4",
    eyebrow: "Discussions",
    headline: "Never miss the next discussion.",
    sub: "Every meeting on one timeline, with RSVPs built in.",
  },
  {
    id: "5",
    eyebrow: "Members",
    headline: "Know who's reading with you.",
    sub: "Owners, admins and members, all in one list.",
  },
  {
    id: "6",
    eyebrow: "Your shelf",
    headline: "Keep every book you've read.",
    sub: "What you're reading now, and everything you've finished.",
  },
];

// Output sizes. `raw` builds the capture path for a shot id.
window.KLUVS_SIZES = {
  "play":   { w: 1080, h: 1920, raw: id => `raw/android/screen-${id}.png`, label: "Google Play — phone" },
  "ios":    { w: 1206, h: 2622, raw: id => `raw/ios/ios-screen${id}.png`,  label: "App Store — 6.1\" / 6.3\" iPhone" },
};
