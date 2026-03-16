# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2026-03-16

### Added
- Typed `CustomEvent<Detail>` generics on React wrappers for 8 components (checkbox, input, slider, tabs, carousel, toggle-button-group, radio-group, radio)
- Default `<slot>` on FlintChip — `<FlintChip>Hello</FlintChip>` works alongside the `label` prop
- `sideEffects` field in core `package.json` for proper tree-shaking
- `@default` JSDoc annotations on 40+ props across 20 components for better IDE support
- `suppress-warnings` re-export from React package (`@getufy/flint-ui-react/suppress-warnings`)
- `start-content` / `end-content` slot aliases on FlintAppBar
- `setFlintTheme()` / `getFlintTheme()` runtime theme switching utility
- Dark mode documentation section in React README
- THEMING.md — comprehensive CSS custom properties reference
- SSR / Next.js usage documentation

### Fixed
- React README peer dependency version (`^0.2.2` → `^0.6.0`)
- React README FlintButton variant example (`"filled"` → `"primary"`)
- FlintCard `cursor: pointer` now shows immediately on interactive cards (not just on hover)

## [0.5.0] - 2026-03-16

### Added
- `FlintFormField` wrapper component — label/helper/error layout, cross-shadow-DOM label syncing, state passthrough (31 unit + 8 Storybook tests)
- Playbook-style integration tests — 4 realistic multi-component scenarios (login form, settings page, data explorer, dashboard layout)
- React event forwarding tests — 37 tests covering event constants, barrel re-exports, naming conventions
- `data-theme="dark"` / `data-theme="light"` attributes for programmatic dark mode
- axe-core a11y tests extended to 15 more components
- `hoist={true}` as default for FlintSelect

### Fixed
- FlintTabs React wrapper `tagName` bug — corrected from `'flint-tab'` to actual tag names
- FlintDialog double-render animation — deferred close via `_visuallyOpen` state
- FlintDialog `aria-dialog-name` a11y violation — dynamic `aria-label` from slotted title
- FlintRangeSlider `value` prop missing from React types
- Date-range-picker Storybook test `pointer-events: none` issue

### Changed
- Migrated 8 components from `@customElement` to `FlintElement.define()`

## [0.4.0] - 2026-03-15

### Added
- Two-file split architecture: `.component.ts` (pure class) + `.ts` (registration) for all 95 components
- `FlintElement` base class with `static dependencies` + `static define()` (Shoelace pattern)
- Autoloader (`src/autoloader.ts`) — MutationObserver-based lazy registration
- `hoist` property on FlintSelect, FlintTooltip, FlintHoverCard, FlintDatePicker
- Form-associated custom elements via `FormAssociated` mixin + `ElementInternals`
- `FormControlController` shared reactive controller (dirty/touched/pristine/validation)
- String localization via `LocalizeController` + `registerTranslation()`
- Animation registry with `setDefaultAnimation()`, `setAnimation()`, `getAnimation()`
- Three-layer theming system (`--flint-*` tokens, semantic tokens, component vars)
- 6 preset color palettes (teal, violet, rose, amber, emerald, slate)
- i18n via native `Intl` APIs (FlintFormatDate, FlintFormatNumber, FlintRelativeTime)
- `::part()` exposure on 20+ high-use components
- axe-core automated a11y testing on 23 components
- Custom Elements Manifest (CEM) generation + VS Code / JetBrains IDE integration
- React wrappers generated from CEM via `@lit/react` `createComponent()`
- Dual test setup (jsdom unit tests + Storybook browser tests)

### Changed
- Namespaced all custom events to `flint-{component}-{event}` format
- Removed `sideEffects: ["*.css"]` from package.json (was tree-shaking registrations)

## [0.3.0] - 2026-03-15

### Added
- Typed events in React wrappers (tuple support, `@fires` JSDoc fallback in codegen)
- FlintGrid/FlintContainer prop interfaces

### Fixed
- FlintTextField event renames to `flint-text-field-input` / `flint-text-field-change`
- TimePicker/DatePicker/Chip/Select/TransferList event renames to `flint-{component}-{event}`
- Missing suppress-warnings JS build entry
- FlintSelect detail type always returns `string[]`
- Card `overflow: hidden` → `overflow: clip`
- Menu min-width 200px, `width: max-content`, text color fix
- TextField margin → `var(--flint-text-field-margin-bottom, 0)`
- Dialog `overflow: hidden` → `overflow: clip`
- Menu `overflow: hidden` → `overflow: visible`
- InputOtp focus listener moved to `connectedCallback`/`disconnectedCallback`
- Menu item `width: 100%` → `min-width: 100%`

## [0.2.1] - 2026-03-15

### Fixed
- Changesets publish workflow configuration

## [0.2.0] - 2026-03-15

### Added
- Changesets integration for automated versioning and changelog generation
- Mutation testing with Stryker (scheduled weekly)
- Performance benchmarks CI workflow
- Bundle size reporting on pull requests
- Automatic PR/issue labeling
- Release drafter for GitHub releases
- Stale issues/PR automation
- Dependabot dependency grouping (lit, storybook, vitest, eslint)
- Accessibility audit fixes
- Snapshot testing support

### Changed
- Migrated packages to `@getufy` npm org scope
- Bundled React package with esbuild for smaller npm publish
- Upgraded jsdom to v28, ESLint to v10

### Fixed
- Browser test CI timeout caused by Storybook base path override
- Chromium connect timeout in CI with stability flags
- React wrappers size-limit by ignoring externalized dependencies
- Playwright browser path resolution

## [0.1.2] - 2026-03-15

### Added
- Package exports map for per-component tree-shaking
- Package metadata (homepage, repository, bugs, engines)
- `.editorconfig` for consistent formatting

### Changed
- Improved README with badges, browser support matrix, and project structure

## [0.1.1] - 2026-03-15

### Fixed
- Initial publish fixes and package configuration

## [0.1.0] - 2026-03-15

### Added
- 75+ LitElement web components with `flint-` prefix
- React wrappers via `@lit/react` (`@getufy/flint-ui-react`)
- Full theming system with `--flint-*` CSS custom properties
- Dark mode support (`theme-dark.css`)
- VitePress documentation site with component API reference
- Storybook playground with interactive examples
- Vitest unit test suite with 99.4% coverage
- Browser tests via Playwright and `@storybook/addon-vitest`
- CI pipeline with lint, type-check, test, and build jobs
- GitHub Pages deployment for Storybook and docs
- CONTRIBUTING guide with development workflow
- Accessibility documentation for all components

[0.6.0]: https://github.com/getufy/flint-ui/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/getufy/flint-ui/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/getufy/flint-ui/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/getufy/flint-ui/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/getufy/flint-ui/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/getufy/flint-ui/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/getufy/flint-ui/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/getufy/flint-ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/getufy/flint-ui/releases/tag/v0.1.0
