# Theme CSS — Color Palette Refactor

## Status Legend
- [ ] todo
- [x] done
- [-] skipped / not applicable

---

## theme.css Changes

- [x] Add quick-rebrand comment block (5 variables to restyle the library)
- [x] Add Layer 1: primitive palette (blue, zinc, slate, red, emerald, amber scales)
- [x] Refactor Layer 2 semantic tokens to reference primitives via `var(--ui-color-*)`
- [x] Add new surface elevation tokens: `--ui-surface-1`, `--ui-surface-2`, `--ui-surface-3`, `--ui-background`
- [x] Add `--ui-text-color-subtle` (subtler than muted, for hints/disabled)
- [x] Add `--ui-muted-background` (for muted variant backgrounds)
- [x] Keep backward-compat aliases: `--ui-surface-background`, `--ui-surface-background-flat`, `--ui-card-background`, `--ui-card-background-flat`, `--ui-input-bg`
- [x] Add dark mode value cache (`--_dark-*` private vars) — define all dark values ONCE in `:root`
- [x] Dark mode class block (`.dark`, `[data-theme="dark"]`) references cache vars — no hardcoded values
- [x] Dark mode media block (`@media prefers-color-scheme: dark`) references the same cache vars
- [x] Switch dark surfaces from Tailwind Gray → Zinc (zinc-950/900/800/700)
- [x] Fix missing dark override: `--ui-stepper-connector-color`
- [x] Fix missing dark override: `--ui-surface-variant`  (was absent from @media block before)
- [x] Fix missing dark override: `--ui-card-border-color`
- [x] Fix missing dark override: `--ui-text-color-subtle`

## Follow-up / Future

- [ ] Audit each component CSS file to replace hardcoded hex values with `--ui-*` tokens where missing
- [ ] Add `--ui-accent-color` / `--ui-accent-foreground` tokens if an accent (non-primary tint) is needed
- [ ] Consider adding `--ui-border-radius-full` (9999px) for pill shapes
- [ ] Document token API in README or Storybook docs page
- [ ] Validate WCAG AA contrast ratios for all text/background token pairs in both modes
