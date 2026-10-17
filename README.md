# The Quiet Atlas

> *The world, quietly kept.*

**The Quiet Atlas** is a cinematic personal travel portfolio — not a travel guide, not an agency site, but a curated visual journal of landscapes, cities, and journeys. Built as a static site with a restrained editorial aesthetic: deep charcoal, graphite, and warm ivory, large-format photography, and magazine-style typography.

## Highlights

- **Cinematic brand intro** — a hand-drawn "Horizon compass" logo traces itself stroke by stroke on a deep-blue backdrop, followed by a fade-in of the wordmark and a unified fade-out into the homepage. Plays once per session, skippable, and respects `prefers-reduced-motion`.
- **Six fully functional sections** — HOME / DESTINATIONS / PLACES / JOURNAL / GALLERY / ABOUT, each a standalone page with browser back/forward and deep-link support.
- **Editorial-grade motion** — unified easing curves, scroll-triggered reveal and clip animations, restrained parallax, and a gallery lightbox with keyboard, touch, and focus management.
- **Zero external dependencies** — all imagery, fonts, and icons are self-hosted. No backend, no framework, no build step.
- **Responsive & accessible** — desktop, tablet, and mobile; semantic HTML, image `alt` text, visible focus states, and reduced-motion fallbacks throughout.

## Tech Stack

HTML5 · CSS3 (Grid, Flexbox, custom properties) · Vanilla JavaScript (IntersectionObserver, sessionStorage) · No build step

## Pages

- **HOME** — intro sequence, hero, manifesto, featured destinations, journal preview
- **DESTINATIONS** — 9 destinations, each with its own detail page
- **PLACES** — 12 notable locations and landmarks
- **JOURNAL** — personal travel notes in three distinct editorial layouts
- **GALLERY** — a photography archive with a full-featured lightbox
- **ABOUT** — philosophy, regions explored, and contact

## Deployment

This is a fully static site. Deploy to GitHub Pages, Cloudflare Pages, Netlify, or Vercel with no configuration:

- **Cloudflare Pages** — connect the repository, leave both the build command and output directory empty.
- All paths are relative, so the site works from the domain root or any subdirectory/subdomain.

## Local Development

```bash
cd seth-travels
python -m http.server 8788
# open http://localhost:8788/
---

*Demo content: travel stories, observations, and statistics are placeholder text, provided as examples and easily replaceable.*
