# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

novacane.live is a personal blog by nova — a static, no-build-tool site deployed at [novacane.live](https://novacane.live) via GitHub Pages (CNAME configured). There is no framework, bundler, package manager, or test suite. Changes are made directly to HTML/CSS/JS files and pushed to `main`.

## Architecture

### Page hierarchy
- `index.html` — landing page with audio/image entrance animation
- `tapes.html` — journal hub (primary nav: blog entries, who, finance, archive)
- `who.html` — about page
- `finance.html` → `finance/cards.html`, `finance/invest.html`, `finance/cards/*.html` — credit card and investment guides
- `tapes/` — individual blog entry pages (numbered `01-` through `07-`, plus `allTapes.html`, `closedPhone.html`)

### Single JS file: `script.js`
All interactive behavior lives in one flat `script.js` at the root. It handles every page using `querySelector` guards (`if (element) { ... }`), so the same file is loaded on all pages without error. Sections in order:
1. Preloader (blocks scroll until `window.load`)
2. Home entrance animation (audio + cycling background images → auto-redirect to `tapes.html`)
3. Tapes intro video logic (plays `tapesVideoIntro.mp4` on desktop when arriving from index via `sessionStorage.cameFromIndex`)
4. Entry page scroll buttons, music play/pause, and interactive buttons (ass, ftp, let-go, divine-feminine, alc, luv/poem toggle)
5. Who page music gate
6. Finance page music gate + auto-scroll
7. Cards page music gate

### CSS structure
Each page loads `css/base.css` + its own page-specific CSS:
- `base.css` — CSS variables, font-face declarations, global resets, all shared `@keyframes`, and the preloader
- `home.css`, `tapes.css`, `who.css`, `finance.css`, `entry.css`, `cards.css` — page-scoped styles

CSS variables (defined in `base.css :root`): `--ghost-white`, `--electric-lavender`, `--lover-blue`, `--neon-aqua`, `--flipphone-heart`, `--truck-green`, `--truck-green-soft`.

Custom fonts (self-hosted under `fonts/`): Joystix Monospace, Speed Rusher, Game Paused, Orbitron Light, Unique, Shooting Star, MoonScape.

### Asset directories
- `audio/` — mp3/wav/flac files referenced directly in HTML `<audio>` elements or via `new Audio(...)` in `script.js`
- `images/` — png/jpg assets
- `videos/` — `tapesVideoIntro.mp4` (desktop), `tapesVideoIntro.mp4` (mobile), `tapesVideoBackground.mp4` (looping BG), `alc.mov`
- `fonts/` — self-hosted font files

### Cache-busting
All CSS links use `?v=110` query strings (e.g. `href="css/base.css?v=110"`). Bump this version number when deploying CSS changes.

### Navigation flow & sessionStorage
`sessionStorage` drives the intro experience:
- `cameFromIndex` — set on home `enter →` click; consumed by `tapes.html` to play the full video intro; cleared after intro ends
- `letgo` — set by the "let go" button in entries; consumed by `index.html` to show a welcome-back message

### Entry page structure
Blog entries under `tapes/` share a common layout: an `.entry` wrapper with `.entry-main` for scrollable content, a fixed set of icon buttons (back, home, call, scroll up/down, play/pause, ass, ftp, let-go, divine-feminine, alc, luv), and `<audio id="entry-music">` for per-entry music. All buttons are selected by class name in `script.js`.

### Analytics
Plausible analytics (`plausible.io`) is included on every page. Custom events use `plausible("event-name")` — currently used on the "let go" button.
