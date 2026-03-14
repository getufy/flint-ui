# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.2.1]: https://github.com/getufy/flint-ui/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/getufy/flint-ui/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/getufy/flint-ui/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/getufy/flint-ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/getufy/flint-ui/releases/tag/v0.1.0
