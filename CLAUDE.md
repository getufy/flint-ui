# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

Monorepo with npm workspaces:
- `packages/core` — Lit web components library (`storybook-lit`)
- `packages/react` — React wrappers using `@lit/react` (`storybook-lit-react`)
- `scripts/` — Codegen scripts (build entries, React wrapper generation)
- `docs/` — VitePress documentation site

## Commands

```bash
# Development
npm run storybook          # Start Storybook dev server on port 6006
npm run build              # Build both packages/core and packages/react
npm run build:core         # Build core only (vite + tsc)
npm run build:react        # Build React wrappers only (tsc)
npm run build-storybook    # Build static Storybook

# Testing (runs in packages/core)
npm test                   # Run all tests (jsdom unit tests + Storybook browser tests)
npm run test:watch         # Watch mode
npm run build-coverage     # Run unit tests with coverage (--project components)

# Run a single test file
NODE_OPTIONS='--no-warnings' vitest run src/button/ui-button.test.ts  # from packages/core/

# Lint
npm run lint               # ESLint on src/**/*.ts (target: 0 errors, 0 warnings)

# React wrapper codegen
npm run gen:react          # Regenerate React wrappers from Lit components

# Docs (VitePress)
npm run docs:dev           # Dev server
npm run docs:build         # Build docs site
npm run docs:preview       # Preview built docs
```

## Architecture

**Two test projects** (configured in `packages/core/vite.config.ts`):
- `components` — jsdom environment, runs `src/**/*.test.ts`
- `storybook` — Chromium/Playwright browser, runs stories via `@storybook/addon-vitest`

**Component structure**: one folder per component at `packages/core/src/<name>/`:
- `ui-<name>.ts` — LitElement component(s)
- `ui-<name>.stories.ts` — Storybook stories
- `ui-<name>.test.ts` — Vitest unit tests

All custom elements use the `ui-` tag prefix; classes use `UiPascalCase`. All public exports go through `packages/core/src/index.ts`.

**React wrappers**: auto-generated via `scripts/generate-react-wrappers.ts` using `@lit/react`'s `createComponent()`. Run `npm run gen:react` after adding/changing components or events.

**Inter-component communication pattern**: parent owns state; children call `this.closest('ui-parent')?.method()` to communicate upward. Parent uses `_syncChildren()` to push state down. Event listeners that must avoid shadow DOM retargeting go on `this.shadowRoot` (not `this`).

**State initialization**: use `willUpdate()` with a `_firstUpdate` flag for `defaultX` props — this batches into the current Lit update cycle and avoids "update after update" warnings.

**CSS**: all custom properties use `--ui-*` prefix. Key tokens: `--ui-primary-color: #3b82f6`, `--ui-text-color: #111827`, `--ui-font-family: system-ui`. CSS custom properties and `:host` shadow styles don't compute in jsdom/happy-dom — test structure, not computed values.

## ESLint Gotchas

- `CSS.escape` is not available in jsdom — avoid it (use manual iteration instead)
- `eslint-disable-next-line` cannot suppress errors inside multi-line template literals — use block `/* eslint-disable */`
- `wc/no-self-class` fires for `classList.add/remove` on host — suppress per-line
- SVG self-closing tags in nested `` html` `` templates → use explicit close tags `<circle></circle>`
- `&` in `html` attribute strings → use property binding `.src=${url}` (not `src="url?a=1&b=2"`)

## Test Gotchas

- `${attrs}` in element position in lit-html is silently ignored — use `.prop=${val}` or `?attr=${bool}` bindings
- String HTML interpolated into `` html`...` `` is escaped — use real `` html`<ui-x>...</ui-x>` `` nodes, not string concatenation
- `shadowRoot.textContent` includes `<style>` content — filter to `TEXT_NODE` nodes only for text assertions
- `scrollIntoView` must be guarded: `if (typeof this.scrollIntoView === 'function')`
- `style.setProperty('left', '0')` → happy-dom stores as `'0px'`, not `'0'`
- `reflect: true` attribute updates need `await el.updateComplete` before checking `hasAttribute()`
- For `ui-rich-tree-view`: query items via `tree.shadowRoot!.querySelector(...)`, and check focus via `tree.shadowRoot!.activeElement`
