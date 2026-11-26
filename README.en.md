# The Quiet Atlas · Visual Travel Journal

> Language / 语言：English · [简体中文](README.md)

A static personal travel showcase website (site name **The Quiet Atlas**): multi-page, cinematic visuals, an immersive intro logo animation and a photography-portfolio-style layout.
Pure HTML5 + CSS3 + vanilla JavaScript — no framework, no build step, no backend, deployable to any static hosting.

---

> The travel stories, observations and statistics in the site are easily replaceable demo text: just rewrite the corresponding paragraphs in each page's HTML (long-form copy lives in `destinations/*.html` under `.story`, and in `places.html` under `.place-story`).

## 1. Running Locally

Just double-click `index.html` to preview (image lazy-loading / fonts may behave slightly differently under `file://` in some browsers). A static server is recommended:

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
├── index.html            Home: intro → hero → manifesto → featured destinations → features → journal → photo strip
├── destinations.html     Destinations overview (9 destinations)
├── destinations/         Destination detail pages (one page per destination)
│   ├── kyoto.html        Kyoto
│   ├── iceland.html      Iceland
│   ├── alps.html         Swiss Alps
│   ├── amalfi.html       Amalfi Coast
│   ├── paris.html        Paris
│   ├── nyc.html          New York
│   ├── tokyo.html        Tokyo
│   ├── venice.html       Venice
│   └── santorini.html    Santorini
├── places.html           Famous places & spots (12, with anchors, linked from destination pages)
├── journal.html          Travel journal (3 entries, three different layouts)
├── gallery.html          Photo gallery (25 photos, lightbox viewer)
├── about.html            Personal intro, travel philosophy, preferences & contact
├── interests.html        Travel preferences collection (image sub-pages for About's 10 interest buttons)
├── 404.html              404 page (reuses nav/footer, with a back-home entry)
├── assets/
│   ├── css/main.css      Design system: variables, typography, motion, responsive
│   ├── css/fonts.css     Self-hosted fonts (Cormorant Garamond + Inter)
│   ├── fonts/            woff2 font files
│   ├── js/main.js        Intro animation, nav, scroll reveal, parallax, page transitions, dynamic year
│   └── js/gallery.js     Gallery lightbox (keyboard / touch / focus management)
├── robots.txt            Search-engine crawl rules
├── sitemap.xml           Sitemap (16 pages)
└── README.md
```

## 3. Deploying to Static Hosting

- **GitHub Pages**: push everything inside `seth-travels/` to the repo root (or `/docs`), then pick the branch and directory under Settings → Pages. The site uses relative paths, so it also works in a subdirectory.
- **Cloudflare Pages / Netlify / Vercel**: leave the build command empty, set the publish directory to `seth-travels` (or the repo root).
- No environment variables, no Node version requirement, no server-side rendering.

## 4. Making It Your Own

| What to change | Where |
| --- | --- |
| Site name (browser title) | The `<title>` in each HTML, shaped like `PAGE — Section \| The Quiet Atlas` |
| Site name (intro wordmark) | The `The Quiet Atlas` text that fades in under the logo in the intro, located in each page's `<p class="intro-brand">` (the 15 pages with an intro layer; `interests.html` has none) |
| Personal name (About page & home body) | `<em>Seth</em>` in `about.html`, the `— Seth` signature and `About Seth` button in `index.html` |
| Graphic logo (Horizon compass mark) | Inline SVG (three spots per page: `.intro`, `.nav-logo`, `.footer-logo`), shared class `.logo-horizon`, 9 `.stage` groups drawn from outside in. The SVG source lives in the `logo-horizon` section of `assets/css/main.css` (draw animation, `--at` timing, easing are all tweakable there); `<link rel="icon">` points to `assets/img/favicon.png` and `assets/img/favicon.ico`. To swap the mark, replace each page's `<svg class="logo-horizon">…</svg>` and the two favicons |
| Contact email | Search `onion@humorseth.com`: appears in the footer's centered `CONTACT` button (`.footer-contact`, `class="btn"`) and the mobile menu's `CONTACT · 联系我` — both are standard `mailto:` (the footer button pre-fills the subject `Hello Seth`) |
| Copyright year | No change needed: the footer's `<span data-year>` is auto-written by `main.js` via `new Date()` (follows 2026 → 2027 automatically) |
| Long-form travel stories | The 5 body paragraphs inside `<div class="story">` in `destinations/*.html`; each row's `<p class="place-story">` in `places.html`; each detail page's `.story` also has a `<figure class="story-figure">` illustration (centered spacing controlled by `.story-figure`) |
| Theme colors / fonts / spacing | The `:root` custom properties at the top of `assets/css/main.css` (`--ink`, `--paper`, `--accent`, `--serif`, `--sans`, `--mono`, `--ease-*`, etc.) |
| Animation duration & easing | Same as above — the `--ease-*` variables in `:root` control it globally; draw-animation timing lives in each page's `.stage` `--at` and `--line-duration` (see the `logo-horizon` section of `main.css`) |
| Images | All localized under `assets/img/` (53 `.jpg` + 1 `.png`, referenced by relative path, no remote image dependency). To replace, overwrite with a same-name file; `.frame`, `.g-item`, `.place-media` handle cropping automatically |
| Destination / place / journal content | Edit the corresponding HTML text directly; keep the structure and class names unchanged to inherit all styling |
| Personal intro & statistics | `about.html` (the numbers in `.stat-num b[data-count]` are read by the count-up animation) |

## 5. Design & Technical Notes

- **Intro logo animation** (~10s, pure CSS + a little JS, no dependencies): on a deep blue-black background, the Horizon compass draws itself line by line from outside in (9 `.stage`s, `stroke-dashoffset` drawing + a warm `trace-head` pen tip + star core / pole star / guide-line accents); once every line is drawn (driven by the `animationend` event, not a fixed delay), the site name `The Quiet Atlas` fades in, both hold briefly, then the whole scene fades out to reveal the home page. It plays once per browser session (`sessionStorage`) and can be skipped by clicking; it auto-skips when the system's "reduce motion" is enabled. For debugging, use `index.html?intro=1` to force a replay (`?introtest=1` slows it down for inspection).
- **Footer** (three fully-centered rows): graphic logo + site name → tagline → six columns centered horizontally → divider → centered `CONTACT` button (`mailto:`) → centered copyright line (year written by script); `TOP ↑` sits alone in the bottom-right. Mobile automatically switches to a centered, flowing layout.
- **Page transitions**: multi-page structure + a lightweight leave transition; browser forward/back, opening any URL directly, and refresh all work (`pageshow` clears transition state, bfcache-compatible).
- **Motion performance**: only `transform` and `opacity` are animated; scroll reveal uses `IntersectionObserver`; parallax is throttled with `requestAnimationFrame`.
- **Accessibility**: semantic markup, skip-to-content link, image `alt`, visible focus styles, `aria-current` for the current page, lightbox supports `Esc`/`←`/`→`/`Tab` focus cycling, and respects `prefers-reduced-motion`.
- **Image strategy**: the hero uses a CSS background image; all other images have fixed aspect ratios (`width`/`height` attributes + `aspect-ratio`) to avoid layout shift, `loading="lazy"` + `decoding="async"`, with graceful fallback to a tonal placeholder on load failure. All images are localized — no external image service.
- **Fonts**: Cormorant Garamond + Inter are self-hosted in `assets/css/fonts.css` (`assets/fonts/*.woff2`, Google Fonts latin subset), zero external font dependency, with automatic fallback to system serif/sans-serif stacks on failure.
- **Image credits**: 53 demo images (`assets/img/`, no remote CDN). Roughly 37 come from [Unsplash](https://unsplash.com) (Unsplash License: free for commercial and non-commercial use, no attribution required, but don't resell the originals) and are stored locally; 16 come from [Wikimedia Commons](https://commons.wikimedia.org) (free licenses, see the attribution list below). For a real launch, replace them with your own or properly licensed photos.
- **Graphic mark**: the logo is an inline-SVG Horizon compass (compass ring, starburst, portal pillars, horizon, orbit & planet, mountains, river, etc., with a draw animation). The nav and footer mini-icons are the same SVG (`class="logo-replay"`) — it draws once on hover, then stops; the intro is the auto-playing version of the same SVG (`class="playing"`). To change the mark, replace each page's inline SVG and `assets/img/favicon.png`.
- **Local images** (`assets/img/`, all from [Wikimedia Commons](https://commons.wikimedia.org), free licenses; check the original file page for attribution requirements before publishing):
  - `amalfi-coast.jpg` (Amalfi Coast), `santorini.jpg` (Oia, Santorini), `louvre.jpg` (Louvre pyramid at night)
  - `kyoto-path.jpg` (mallard ducks in the canal by the Philosopher's Path, by KimonBerlin, CC BY-SA 2.0)
  - `amalfi-lemon.jpg` (lemon pergola on the Amalfi hillside, by Jensens, Public domain)
  - `amalfi-town.jpg` (Amalfi town and the Cathedral of St. Andrew seen from the sea, by Bernard Gagnon, CC BY 4.0)
  - `paris-quay.jpg` (bookstalls on the Quai Saint-Michel and Notre-Dame, by Daniel Villafruela, CC BY-SA 4.0)
  - `tokyo-night.jpg` (Shinjuku south exit at night, by 康复 calvision, CC0)
  - `tokyo-crossing.jpg` (Shibuya scramble crossing, by Benh LIEU SONG, CC BY-SA 2.0)
  - `tokyo-sensoji.jpg` (Sensō-ji, by Balon Greyjoy, CC0)
  - `venice-canal.jpg` (the Grand Canal and Santa Maria della Salute, by Wolfgang Moroder, CC BY-SA 3.0)
  - `venice-sunset.jpg` (Venice canal at dusk, by Satyajitc, CC BY-SA 3.0)
  - `venice-rain.jpg` (Rialto Bridge after rain, by Ввласенко, CC BY-SA 3.0)
  - `santorini-oia.jpg` (blue-domed churches of Oia, by palindrome6996, CC BY 2.0)
  - `santorini-sunset.jpg` (Oia sunset, by Anna.Tsolidou, CC BY-SA 4.0)
  - `santorini-fira.jpg` (Fira white houses bell tower, by Dietmar Rabich, CC BY-SA 4.0)
