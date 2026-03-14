# Contributing to Flint UI

Thanks for your interest in contributing to Flint UI! This guide will help you get set up and understand the project conventions.

## Prerequisites

- **Node.js** >= 18
- **npm** (comes with Node)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/go-mihai/storybook-lit.git
cd storybook-lit

# Install dependencies
npm install

# Start Storybook dev server
npm run storybook
```

This installs dependencies for both packages (`packages/core` and `packages/react`) via npm workspaces. Storybook launches at [http://localhost:6006](http://localhost:6006).

## Project Structure

```
packages/
  core/          # Lit web components (flint-ui)
  react/         # Auto-generated React wrappers (flint-ui-react)
scripts/         # Codegen (build entries, React wrappers, docs)
docs/            # VitePress documentation site
```

Each component lives in `packages/core/src/<name>/` with these files:

| File | Purpose |
|------|---------|
| `flint-<name>.ts` | LitElement component |
| `flint-<name>.css` | Component styles (imported via `?inline`) |
| `flint-<name>.stories.ts` | Storybook stories |
| `flint-<name>.test.ts` | Vitest unit tests |

## Commands

| Command | Description |
|---------|-------------|
| `npm run storybook` | Start Storybook dev server (port 6006) |
| `npm test` | Run all tests (jsdom unit + Storybook browser) |
| `npm run test:watch` | Watch mode |
| `npm run build-coverage` | Unit tests with coverage report |
| `npm run lint` | ESLint — target is 0 errors, 0 warnings |
| `npm run build` | Build both core and React packages |
| `npm run build:core` | Build core only (Vite + tsc) |
| `npm run build:react` | Build React wrappers only (tsc) |
| `npm run gen:react` | Regenerate React wrappers from Lit components |
| `npm run type-check` | TypeScript type checking across all packages |
| `npm run validate` | Type check + lint + test (full CI check) |
| `npm run docs:dev` | Start VitePress dev server |
| `npm run docs:build` | Build docs site |

To run a single test file:

```bash
cd packages/core
NODE_OPTIONS='--no-warnings' vitest run src/button/flint-button.test.ts
```

## Adding a New Component

### 1. Create the component

Create a folder at `packages/core/src/<name>/` with the component file:

```ts
// packages/core/src/example/flint-example.ts
import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './flint-example.css?inline';

@customElement('flint-example')
export class FlintExample extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: String })
  label = '';

  render() {
    return html`<div>${this.label}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-example': FlintExample;
  }
}
```

### 2. Add styles

```css
/* packages/core/src/example/flint-example.css */
:host {
  display: block;
  font-family: var(--flint-font-family);
}
```

### 3. Export the component

Add the export to `packages/core/src/index.ts`:

```ts
export { FlintExample } from './example/flint-example.js';
```

Then update the package.json exports map:

```bash
npm run build:exports -w packages/core
```

### 4. Write stories

```ts
// packages/core/src/example/flint-example.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-example';

const meta: Meta = {
  title: 'Components/Example',
  component: 'flint-example',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`<flint-example label="Hello"></flint-example>`,
};
```

### 5. Write tests

```ts
// packages/core/src/example/flint-example.test.ts
import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-example';
import type { FlintExample } from './flint-example';

describe('flint-example', () => {
  it('renders with default properties', async () => {
    const el = await fixture<FlintExample>(
      html`<flint-example label="Hello"></flint-example>`
    );
    expect(el.label).toBe('Hello');
  });
});
```

### 6. Generate React wrappers

After adding or changing components/events:

```bash
npm run gen:react
```

### 7. Add documentation

Create a page at `docs/components/<name>.md`, then regenerate docs:

```bash
npm run gen:docs
```

## Conventions

### Naming

- Custom element tags: `flint-<name>` (e.g. `<flint-button>`)
- Class names: `FlintPascalCase` (e.g. `FlintButton`)
- CSS custom properties: `--flint-*` prefix

### Component Patterns

**State initialization** — use `willUpdate()` with a `_firstUpdate` flag for `defaultX` props. This batches into the current Lit update cycle and avoids "update after update" warnings:

```ts
private _firstUpdate = true;

willUpdate() {
  if (this._firstUpdate) {
    this._firstUpdate = false;
    this._value = this.defaultValue;
  }
}
```

**Inter-component communication** — parent owns state. Children communicate upward via:

```ts
this.closest('flint-parent')?.method();
```

Parents push state down with a `_syncChildren()` method.

**Shadow DOM events** — event listeners that must avoid shadow DOM retargeting go on `this.shadowRoot`, not `this`.

**Avoiding update loops** — for state written internally during update cycles, use plain private fields instead of `@state()` decorators.

## Test Guidelines

Two test projects are configured in `packages/core/vite.config.ts`:

- **`components`** — jsdom environment, runs `src/**/*.test.ts`
- **`storybook`** — Chromium via Playwright, runs stories with `@storybook/addon-vitest`

Key things to know:

- Use `@open-wc/testing`'s `fixture()` and `html` for rendering.
- Always `await el.updateComplete` before asserting on reflected attributes.
- `shadowRoot.textContent` includes `<style>` content — filter to `TEXT_NODE` nodes for text assertions.
- `getComputedStyle` and CSS custom properties don't work in jsdom/happy-dom — test structure, not computed values.
- Guard `scrollIntoView` calls: `if (typeof el.scrollIntoView === 'function')`.
- Don't use `${attrs}` in element position in lit-html (silently ignored) — use `.prop=${val}` or `?attr=${bool}` bindings.
- String HTML interpolated into `` html`...` `` is escaped — use real `` html`<flint-x>...</flint-x>` `` template nodes.

## Linting

The project uses ESLint with `@typescript-eslint`, `eslint-plugin-lit`, and `eslint-plugin-wc`. A few things to watch for:

- `CSS.escape` is not available in jsdom — avoid it in code that runs in tests.
- `eslint-disable-next-line` cannot suppress errors inside multi-line template literals — use block `/* eslint-disable */` comments instead.
- `wc/no-self-class` fires for `classList.add/remove` on the host element — suppress per-line.
- SVG tags in `html` templates must use explicit closing tags (e.g. `<circle></circle>`, not `<circle />`).
- Use property bindings for URLs with special characters: `.src=${url}` instead of `src="url?a=1&b=2"`.

## Pre-commit Hooks

The project uses [Husky](https://typicode.github.io/husky/) with [lint-staged](https://github.com/lint-staged/lint-staged). On commit, ESLint runs automatically on staged `.ts` files in `packages/core/src/`.

## Pull Requests

1. Create a feature branch from `main`.
2. Make your changes following the conventions above.
3. Run `npm run validate` to ensure type checks, linting, and tests all pass.
4. Open a PR against `main` with a clear description of what changed and why.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
