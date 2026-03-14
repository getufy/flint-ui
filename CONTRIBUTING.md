# Contributing to Flint UI

Thanks for your interest in contributing to Flint UI! This guide will help you get set up and understand the project conventions.

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd storybook-lit

# Install dependencies
npm install

# Start Storybook dev server
npm run storybook
```

## Project Structure

```
packages/
  core/          # Lit web components (flint-ui)
  react/         # React wrappers (flint-ui-react)
scripts/         # Codegen (build entries, React wrappers)
docs/            # VitePress documentation site
```

Each component lives in `packages/core/src/<name>/` with these files:

| File | Purpose |
|------|---------|
| `flint-<name>.ts` | LitElement component |
| `flint-<name>.stories.ts` | Storybook stories |
| `flint-<name>.test.ts` | Vitest unit tests |

## Development Workflow

### Running Tests

```bash
npm test                    # All tests (jsdom + Storybook browser)
npm run test:watch          # Watch mode
npm run build-coverage      # Unit tests with coverage report
```

To run a single test file:

```bash
cd packages/core
NODE_OPTIONS='--no-warnings' vitest run src/button/flint-button.test.ts
```

### Linting

```bash
npm run lint    # ESLint — target is 0 errors, 0 warnings
```

### Building

```bash
npm run build        # Build both core and react packages
npm run build:core   # Build core only
npm run build:react  # Build react wrappers only
```

### Documentation

```bash
npm run docs:dev      # Start VitePress dev server
npm run docs:build    # Build docs site
npm run docs:preview  # Preview built docs
```

## Conventions

### Naming

- Custom elements use the `flint-` prefix: `<flint-button>`
- Classes use PascalCase with Flint prefix: `FlintButton`
- CSS custom properties use `--flint-*` prefix

### Component Patterns

- **State initialization**: Use `willUpdate()` with a `_firstUpdate` flag for `defaultX` props
- **Inter-component communication**: Children call `this.closest('flint-parent')?.method()` to communicate upward; parents use `_syncChildren()` to push state down
- **Shadow DOM events**: Listeners that must avoid retargeting go on `this.shadowRoot`, not `this`

### Adding a New Component

1. Create `packages/core/src/<name>/flint-<name>.ts`
2. Export from `packages/core/src/index.ts`
3. Run `npm run build:exports` to update package.json exports
4. Add stories in `flint-<name>.stories.ts`
5. Add tests in `flint-<name>.test.ts`
6. Run `npm run gen:react` to generate React wrappers
7. Add a documentation page at `docs/components/<name>.md`

### Test Guidelines

- Use `@open-wc/testing` fixtures and helpers
- `shadowRoot.textContent` includes `<style>` — filter to `TEXT_NODE` nodes for text assertions
- `reflect: true` attribute updates need `await el.updateComplete` before `hasAttribute()`
- Guard `scrollIntoView`: `if (typeof el.scrollIntoView === 'function')`
- CSS custom properties don't compute in jsdom/happy-dom — test structure, not computed values

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes following the conventions above
3. Ensure `npm run lint` passes with 0 errors
4. Ensure `npm test` passes
5. Open a PR with a clear description of what changed and why

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
