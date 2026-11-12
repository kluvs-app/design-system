# Store assets

Everything public-facing for Kluvs: Google Play and App Store listing graphics and copy, and (soon) the Top.gg bot and server pages. Graphics are HTML templates rendered to PNG at each portal's exact size. Everything here is committed — `export/` and `listing/` are what's live (or about to be).

## Layout

| Path | What |
|---|---|
| `raw/android/screen-<n>.png` | Raw device captures (Android, 1440×3120) |
| `raw/ios/ios-screen<n>.png` | Raw device captures (iPhone 6.9", 1320×2868) |
| `shots.js` | Screenshot order, eyebrow / headline / sub copy, surface, output sizes |
| `screenshot.html` | Screenshot template — `?shot=<n>&size=play\|ios[&surface=dark\|light]` |
| `feature-graphic.html` | Play feature graphic — four phones (screens 1, 4, 5, 6) |
| `render.sh` | Renders everything to `export/` via headless Chrome |
| `index.html` | Review gallery — open in a browser after rendering |
| `export/` | Upload-ready PNGs |
| `listing/app-store.md` | App Store copy — name, subtitle, promo text, description, keywords |
| `topgg/bot.md` | Top.gg bot page — short description, tags, notes |
| `topgg/bot-description.md` | Top.gg bot long description — paste-ready Markdown/HTML, no fences |
| `topgg/server.md` | Top.gg server page — short description, tags, notes |
| `topgg/server-description.md` | Top.gg server long description — paste-ready, no fences |
| `listing/google-play.md` | Play listing copy — name, short/full description, what's new |

## Outputs

| Folder | Portal slot | Size |
|---|---|---|
| `export/play/feature-graphic.png` | Play — feature graphic | 1024×500 |
| `export/play/screen-<n>.png` | Play — phone screenshots | 1080×1920 |
| `export/ios/screen-<n>.png` | App Store — 6.1" / 6.3" iPhone (the required slot) | 1206×2622 |

## Updating

1. **New captures:** replace the files in `raw/`, keeping the filenames. The capture order is 1 Me · 2 Clubs · 3 Club overview · 4 Discussions · 5 Members · 6 Shelf.
2. **Copy or order:** edit `shots.js`. Headlines use sentence case, end with a period and never use exclamation marks (see the voice rules in `../README.md`).
3. **Surface:** `KLUVS_SURFACE` in `shots.js` — `light` (cream marketing surface, current) or `dark`. Or try one-off: `SURFACE=dark ./render.sh`.
4. **Render:** `./render.sh` (all), or `./render.sh feature | play | ios`. Takes ~30s; needs Google Chrome (override the path with `CHROME=`).
5. Refresh `index.html` to review.

## Layout notes

- Screenshot sizing uses `--u`, a 9:16-normalised unit (1vw on Play, larger on taller iPhone canvases), so the phone crops off the bottom at the same point on every platform.
- No device-model frames, no imagery, no gradients — a flat bezel on a flat surface, with the 6px copper top-edge bleed from the brand cover frame. Copper otherwise appears only in the eyebrow.

## Listing copy

Each file in `listing/` holds paste-ready blocks, with the portal's character limit in the heading. Keep the voice rules from `../README.md`: sentence case, no emoji, no exclamation marks. When a feature ships or changes, update the copy here first, then paste it into the portal. Feature claims should match the screenshots in `shots.js`.
