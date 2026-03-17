# DX Report v0.9 — Development TODO (March 17, 2026)

## Summary

A DX review built two apps (React Pokedex + vanilla Weather) with 80+ components and surfaced:

- Dark mode broken on overlays (hardcoded CSS fallbacks)
- Drawer content clipping (missing box-sizing)
- Missing discoverability for toast API, `setFlintTheme()`, typed React events
- Autocomplete only accepts `{ label, value }[]` — should also accept `string[]`
- AppBar clips autocomplete dropdown — needs `hoist` support

## Tasks

- [x] **Task 1**: Add missing semantic tokens (`--flint-success-color-hover`, `--flint-warning-color-hover`, `--flint-neutral-color`, etc.) to `theme.css` + `theme-dark.css`
- [x] **Task 2**: Remove hardcoded CSS fallbacks from component files (dialog, button, form-field, command-dialog, autocomplete, and others)
- [x] **Task 3**: Fix drawer content clipping — add `box-sizing: border-box` and `overflow-x: hidden` to `.paper`
- [x] **Task 4**: Add `hoist` prop to `FlintAutocomplete` (mirrors `FlintSelect` pattern)
- [x] **Task 5**: Accept `string[]` in autocomplete options
- [x] **Task 6**: Documentation — improve discoverability of toast API, `setFlintTheme()`, typed React events, string options, and fix nextjs.md API call

## Commits

1. `feat: add missing semantic tokens for success/warning/neutral colors`
2. `fix: remove hardcoded CSS fallbacks that break dark mode on overlays`
3. `fix: prevent drawer content clipping with box-sizing border-box`
4. `feat: add hoist prop to autocomplete for overflow container support`
5. `feat: accept string array options in autocomplete`
6. `docs: improve discoverability of toast API, setFlintTheme, and typed React events`
