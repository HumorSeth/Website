# The Quiet Atlas · A Visual Travel Journal

A static personal travel showcase website (site name **The Quiet Atlas**): multi-page, cinematic visuals, an immersive logo intro animation, and a photography-portfolio-style layout.
Pure HTML5 + CSS3 + vanilla JavaScript — no framework, no build step, no backend — deployable to any static host.

---

> The travel stories, observations, and statistics on the site are placeholder demo text, easy to replace: simply rewrite the relevant paragraphs in each page's HTML (long-form text lives in `destinations/*.html` under `.story`, and `places.html` under `.place-story`).

## 1. Running Locally

Double-click `index.html` to preview directly (some browsers handle image lazy-loading / fonts slightly differently over `file://`). For best results, use any static server:

```bash
# Python (built-in)
cd seth-travels
python -m http.server 8788
# then open http://localhost:8788/

# or Node.js
npx serve .
```

## 2. Directory Structure

```
seth-travels/
├── index.html            Home: intro → hero → manifesto → featured destinations → feature → journal → photo strip
├── destinations.html     Destinations overview (9 destinations)
├── destinations/         Destination detail pages (one per destination)
│   ├── kyoto.html        Kyoto
│   ├── iceland.html      Iceland
│   ├── alps.html         Swiss Alps
│   ├── amalfi.html       Amalfi Coast
│   ├── paris.html        Paris
│   ├── nyc.html          New York
│   ├── tokyo.html        Tokyo
│   ├── venice.html       Venice
│   └── santorini.html    Santorini
├── places.html           Notable places & landmarks (12, with anchors, reachable from destination pages)
├── journal.html          Travel journal (3 entries, three distinct layouts)
├── gallery.html          Photography gallery (25 images, lightbox viewer)
├── about.html            About, travel philosophy, preferences, and contact
├── interests.html        Travel preferences (illustrated sub-page of the 10 interest buttons on About)
├── 404.html              404 error page (reuses nav/footer, includes a back-home entry)
├── assets/
│   ├── css/main.css      Design system: variables, typography, motion, responsive
│   ├── css/fonts.css     Self-hosted fonts (Cormorant Garamond + Inter)
│   ├── fonts/            woff2 font files
│   ├── js/main.js        Intro animation, navigation, scroll reveal, parallax, page transitions, dynamic year
│   └── js/gallery.js     Gallery lightbox (keyboard / touch / focus management)
├── robots.txt            Crawler rules
├── sitemap.xml           Sitemap (16 pages)
└── README.md
```

## 3. Deploying to Static Hosting

- **GitHub Pages**: push everything inside `seth-travels/` to the repository root (or `/docs`), then choose the branch and directory under Settings → Pages. The site uses relative paths, so it also works from a subdirectory.
- **Cloudflare Pages / Netlify / Vercel**: leave the build command empty, and set the publish directory to `seth-travels` (or the repository root).
- No environment variables, no Node version requirements, no server-side rendering.

## 4. How to Make It Yours

| What to change | Where |
| --- | --- |
| Site name (browser title) | Each HTML `<title>`, in the form `PAGE — Section \| The Quiet Atlas` |
| Site name (intro wordmark) | The `The Quiet Atlas` text that fades in below the logo in the intro, in each page's `<p class="intro-brand">` (15 pages have an intro layer; `interests.html` has none) |
| Personal name (About page & home body) | `<em>Seth</em>` in `about.html`, the `— Seth` signature and `About Seth` button in `index.html` |
| Graphic logo (Horizon compass mark) | Inline SVG (three places per page: `.intro` intro, `.nav-logo`, `.footer-logo`), unified class `.logo-horizon`, 9 `.stage` groups drawn from outside inward. The SVG source is defined in the `logo-horizon` section of `assets/css/main.css` (drawing animation, timing `--at`, easing all adjustable there); `<link rel="icon">` points to `assets/img/favicon.png` and `assets/img/favicon.ico`. To change the mark, replace each page's `<svg class="logo-horizon">…</svg>` and the two favicons |
| Contact email | Search `onion@humorseth.com`: appears in the centered `CONTACT` button in the footer (`.footer-contact`, `class="btn"`) and in the mobile menu's `CONTACT · 联系我` — both use a standard `mailto:` (the footer button pre-fills the subject `Hello Seth`) |
| Copyright year | Nothing to change: the footer `<span data-year>` is written by `main.js` using `new Date()` each year (auto-follows 2026 → 2027) |
| Long-form travel writing | The 5 body paragraphs inside `<div class="story">` in `destinations/*.html`; each row's `<p class="place-story">` in `places.html`; each detail page's `.story` also contains a `<figure class="story-figure">` illustration (centered spacing controlled by `.story-figure`) |
| Theme colors / fonts / spacing | The `:root` custom properties at the top of `assets/css/main.css` (`--ink`, `--paper`, `--accent`, `--serif`, `--sans`, `--mono`, `--ease-*`, etc.) |
| Animation duration & easing | Same place — the `--ease-*` variables in `:root`; the drawing animation timing lives in each page's `.stage` `--at` and `--line-duration` (see the `logo-horizon` section of `main.css`) |
| Images | All localized in `assets/img/` (51 `.jpg` + 1 `.png`, direct relative-path references, no remote image dependencies). Replace by overwriting the same filename; `.frame`, `.g-item`, and `.place-media` handle cropping automatically |
| Destination / place / journal content | Edit the HTML text paragraphs directly — keep the structure and class names unchanged to inherit all styles |
| About page & statistics | `about.html` (the numbers in `.stat-num b[data-count]` are read by the count-up animation) |

## 5. Design & Technical Notes

- **Intro logo animation** (≈10s, pure CSS + a little JS, no dependencies): on a deep blue-black background, the Horizon compass draws itself stroke by stroke from outside inward (9 `.stage`s, `stroke-dashoffset` drawing + a warm `trace-head` pen tip + core/pole-star/guide accents); once all lines are drawn (driven by the `animationend` event, not a fixed timer), the site name `The Quiet Atlas` fades in, the two hold briefly, then the whole screen fades out to reveal the homepage. Plays once per browser session (`sessionStorage`), skippable on click, and auto-skips under the system "reduce motion" setting. Use `index.html?intro=1` to force replay for debugging (`?introtest=1` slows it down for observation).
- **Footer** (three centered rows): graphic logo + site name → tagline → six sections centered horizontally → thin divider → centered `CONTACT` button (`mailto:`) → centered copyright line (year written by script); `TOP ↑` sits separately in the bottom-right. On mobile it automatically switches to a centered, flowing layout.
- **Page transitions**: multi-page structure + a lightweight exit transition; browser back/forward, opening any URL directly, and refresh all work (`pageshow` cleans up the transition state, bfcache-compatible).
- **Motion performance**: only `transform` and `opacity` are animated; scroll reveal uses `IntersectionObserver`; parallax is throttled via `requestAnimationFrame`.
- **Accessibility**: semantic markup, skip-to-content link, image `alt`, visible focus styles, `aria-current` marks the current page, the lightbox supports `Esc`/`←`/`→`/`Tab` focus cycling, and respects `prefers-reduced-motion`.
- **Image strategy**: the hero uses a CSS background; other images have fixed aspect ratios (`width`/`height` attributes + `aspect-ratio`) to avoid layout shift, plus `loading="lazy"` + `decoding="async"`, degrading gracefully to a tonal placeholder on load failure. All images are localized — no external image services.
- **Fonts**: Cormorant Garamond + Inter are self-hosted in `assets/css/fonts.css` (`assets/fonts/*.woff2`, Google Fonts latin subset) — zero external font dependencies, with a graceful fallback to system serif/sans stacks.
- **Image licensing**: 51 demo images in `assets/img/` (no remote image host). Roughly 35 come from [Unsplash](https://unsplash.com) (Unsplash License: free for commercial and non-commercial use, no attribution required, but images may not be resold as-is), saved locally; 16 come from [Wikimedia Commons](https://commons.wikimedia.org) (free licenses, see the attribution list below). For production release, replace them with your own or properly licensed photos.
- **Graphic mark**: the logo is an inline-SVG Horizon compass (compass ring, star flare, portal pillars, horizon, orbit and planet, mountains, river, and other elements, with a drawing animation). The nav and footer icons are the same SVG (`class="logo-replay"`), drawing once on hover and stopping; the intro is the auto-playing version of the same SVG (`class="playing"`). To change the mark, replace each page's inline SVG and `assets/img/favicon.png`.
- **Local images** (`assets/img/`, all from [Wikimedia Commons](https://commons.wikimedia.org), free licenses; verify attribution on the original file pages before release):
  - `amalfi-coast.jpg` (Amalfi Coast), `santorini.jpg` (Santorini, Oia), `louvre.jpg` (Louvre Pyramid at night)
  - `kyoto-path.jpg` (mallards in the canal along the Philosopher's Path, by KimonBerlin, CC BY-SA 2.0)
  - `amalfi-lemon.jpg` (lemon pergola on an Amalfi hillside, by Jensens, Public domain)
  - `amalfi-town.jpg` (Amalfi town and the Cathedral of St. Andrew seen from the sea, by Bernard Gagnon, CC BY 4.0)
  - `paris-quay.jpg` (bookstalls on the Quai Saint-Michel with Notre-Dame, by Daniel Villafruela, CC BY-SA 4.0)
  - `tokyo-night.jpg` (Shinjuku south exit at night, by 康复 calvision, CC0)
  - `tokyo-crossing.jpg` (Shibuya scramble crossing, by Benh LIEU SONG, CC BY-SA 2.0)
  - `tokyo-sensoji.jpg` (Sensō-ji, by Balon Greyjoy, CC0)
  - `venice-canal.jpg` (Grand Canal and Santa Maria della Salute, by Wolfgang Moroder, CC BY-SA 3.0)
  - `venice-sunset.jpg` (Venice canal at dusk, by Satyajitc, CC BY-SA 3.0)
  - `venice-rain.jpg` (Rialto Bridge after rain, by Ввласенко, CC BY-SA 3.0)
  - `santorini-oia.jpg` (Oia blue-domed church, by palindrome6996, CC BY 2.0)
  - `santorini-sunset.jpg` (Oia sunset, by Anna.Tsolidou, CC BY-SA 4.0)
  - `santorini-fira.jpg` (Fira white houses and clock tower, by Dietmar Rabich, CC BY-SA 4.0)
