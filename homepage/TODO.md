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

## Sections

- [ ] **Header** — add active nav link highlight on scroll
- [ ] **Header** — wire GitHub button to real repo URL
- [ ] **Hero** — "Browse Components" button should scroll to `#s-components`
- [ ] **Hero** — "GitHub ↗" button should link to real repo URL
- [ ] **Interactive** — Dark mode toggle should apply dark theme globally (not just the card)
- [ ] **ComponentList** — items should link to their Storybook story
- [ ] **Footer** — wire all links to real destinations (GitHub, Storybook, etc.)

---

## UX / Polish

- [ ] Mobile responsiveness — current grids are fixed columns, need breakpoints or `auto-fit`
- [ ] Smooth scroll for nav anchor links already set on `html`, verify all section `id`s match
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
