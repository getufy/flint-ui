# Homepage TODO

## Status Legend
- [ ] todo
- [~] in progress
- [x] done
- [-] skipped / not applicable

---

## Structure

- [x] Split App.tsx into section files (`sections/`, `tokens.ts`, `components/shared.tsx`)

---

## Dark Mode (cross-cutting)

- [x] **theme.css** — add `.ui-theme-dark` block overriding semantic surface/text/border tokens so Lit components flip
- [x] **tokens.ts** — export `getColors(dark: boolean)` so sections can get dark-aware inline style colors
- [x] **App.tsx** — create `ThemeContext` + `useTheme()` hook; lift dark state here
- [x] **App.tsx** — init dark state from `window.matchMedia('(prefers-color-scheme: dark)').matches` on mount
- [x] **App.tsx** — add `matchMedia` `change` listener to auto-follow system pref (unless user has manually overridden)

---

## Sections

### Header
- [x] Init dark toggle from system preference (reads `ThemeContext`)
- [ ] Add active nav link highlight on scroll
- [ ] Wire GitHub button to real repo URL

### Hero
- [x] Remove `<UiSwitch label="Dark mode" checked />` — static, unconnected, misleading
- [x] Replace that row with a `UiHoverCard` mini-demo (trigger avatar → popover on hover)
- [x] Wire "Browse Components" button to scroll to `#s-components`
- [ ] Wire "GitHub ↗" button to real repo URL

### Stats
- [x] Replace emoji icons with colored dot indicators — more visually cohesive
- [x] Fix grid to `repeat(auto-fit, minmax(140px, 1fr))` for mobile

### Showcase
- [x] Add `UiCarousel` ShowCard — visually impressive, not shown anywhere else
- [x] Add `UiCommand` ShowCard (`span2`) — flagship component missing from showcase
- [x] Remove duplicate `Skeleton` ShowCard (already in Data section)

### Forms
- [x] Add `UiInputOtp` card — logical home is Forms, currently only in Hero/Interactive
- [x] Remove `UiRating` from the live form — not a form field; already in Showcase

### Data
- [x] Replace duplicate `Skeleton` card with `UiRichTreeView` demo

### Overlays
- [x] Add `UiHoverCard` card — belongs here alongside Dialog/Snackbar/Tooltip
- [x] Adjust grid to 2×2 to accommodate 4 cards

### Flow
- [x] Add `UiCommandDialog` — wired to ⌘K/Ctrl+K globally and to "Open Palette" button

### Interactive
- [x] Connect "Settings Panel" dark switch to global `ThemeContext` — toggling it actually changes the page theme

### ComponentList
- [x] Add live `UiTextField` filter with match count and highlight — meta-demo of searching with the library's own component

### Footer
- [ ] Wire all links to real destinations (GitHub, Storybook, etc.)
- [ ] Ensure footer background works in both light and dark mode

---

## UX / Polish

- [ ] Mobile responsiveness — remaining grids are fixed columns, need breakpoints or `auto-fit`
- [ ] Smooth scroll for nav anchor links — verify all section `id`s match header nav hrefs
- [ ] Add a "back to top" button or floating action

---

## SEO / Meta

- [ ] Add `<meta name="description">` to `index.html`
- [ ] Add Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Add favicon

---

## Build

- [ ] Verify `dist-homepage/` build output is up to date
- [ ] Add homepage build script to package.json (e.g. `build:homepage`)
