# TODO — Flint UI Roadmap

---

## Completed (v0.3.0 DX Report)

- [x] #1 FlintTextField `input`/`change` → `flint-text-field-input`/`flint-text-field-change`
- [x] #2 TimePicker/DatePicker/Chip/Select/TransferList event renames to `flint-{component}-{event}`
- [x] #3 Missing suppress-warnings JS build entry
- [x] #4 FlintSelect detail type always returns `string[]`
- [x] #5 Card `overflow: hidden` → `overflow: clip`
- [x] #6 Menu min-width 200px, `width: max-content`, text color fix
- [x] #7 Typed events in React wrappers (tuple support, `@fires` JSDoc fallback in codegen)
- [x] #8 FlintGrid/FlintContainer prop interfaces
- [x] #9 FlintTableContainer already has `overflow-x: auto`
- [x] #10 TextField margin → `var(--flint-text-field-margin-bottom, 0)`
- [x] #11 Dialog `overflow: hidden` → `overflow: clip`
- [x] #12 Menu `overflow: hidden` → `overflow: visible`
- [x] #13 InputOtp focus listener moved to `connectedCallback`/`disconnectedCallback`
- [x] #14 FlintTabs vertical orientation — prop present in wrapper
- [x] #15 FlintMobileStepper — all props in wrapper
- [x] #16 FlintSpeedDial — events now mapped via `@fires` JSDoc fallback
- [x] #17 Menu item `width: 100%` → `min-width: 100%`
- [x] #18 FlintDrawer anchor — prop present in wrapper

## Completed (v0.4.0 Architecture)

- [x] Two-file split: `.component.ts` (pure class) + `.ts` (registration) for all 95 components
- [x] `FlintElement` base class with `static dependencies` + `static define()` (Shoelace pattern)
- [x] Autoloader (`src/autoloader.ts`) — MutationObserver-based lazy registration
- [x] Removed `sideEffects: ["*.css"]` from package.json (was tree-shaking registrations)
- [x] `hoist` property on FlintSelect — `position: fixed` dropdown escapes overflow containers
- [x] Namespaced all custom events (`flint-{component}-{event}`)
- [x] Form-associated custom elements via `FormAssociated` mixin + `ElementInternals`
- [x] Three-layer theming system (`--flint-*` tokens, semantic tokens, component vars)
- [x] i18n via native `Intl` APIs (FlintFormatDate, FlintFormatNumber, FlintRelativeTime)
- [x] `prefers-reduced-motion` respected globally
- [x] Comprehensive ARIA + keyboard navigation across components
- [x] Dual test setup (jsdom unit tests + Storybook browser tests)
- [x] React wrappers via `@lit/react` `createComponent()`

---

## Completed (v0.5.0 DX Report Fixes)

### Critical
- [x] Fix FlintTabs React wrapper `tagName` bug — `FlintTabs.tsx`, `FlintTabPanel.tsx`, `FlintTabList.tsx` corrected from `'flint-tab'` to their actual tag names
- [x] Fix FlintDialog double-render animation — Removed CSS transitions from `.dialog-panel` and backdrop; added `_visuallyOpen` state for deferred close; parallelized panel+overlay animations
- [x] Fix FlintDialog `aria-dialog-name` a11y violation — replaced cross-shadow `aria-labelledby` with dynamic `aria-label` from slotted `<flint-dialog-title>` via `slotchange` handler
- [x] Fix date-range-picker storybook test `pointer-events: none` — `userEvent.setup({ pointerEventsCheck: 0 })` for interactions inside deeply nested shadow DOM dialogs

### Medium
- [x] Fix FlintRangeSlider `value` prop missing from React types — relaxed `parse-cem.ts` `convertMember()` filter to include `attribute: false` props; added kebab-case member guard
- [x] Migrate 8 components from `@customElement` to `FlintElement.define()` — FlintButton, FlintCard, FlintDatePicker, FlintHoverCard, FlintInput, FlintSwitch, FlintTabs, FlintTooltip; ported missing `hoist` code to `.component.ts` files

### Won't Fix / By Design (v0.5.0)
- FlintBottomNavigation `value` type `number | string` — correct behavior, supports both
- FlintCard `overflow: clip` — mitigated by `hoist` on FlintSelect; low impact for other popup components
- FlintGrid/FlintContainer bare `createComponent` wrappers — works via React 19 native CE support
- FlintDialog request-close pattern — intentional architecture (consumer veto power)
- FlintTable requires FlintTableContainer for responsive — documented pattern

### Nice to Have (v0.5.0 DX Report)
- [x] `hoist={true}` as default for FlintSelect (most real-world usage is inside cards/dialogs)
- [x] Add playground / sandbox — StackBlitz template at `examples/stackblitz/` + `.stackblitzrc`
- [x] `<FlintFormField>` wrapper — label/helper/error layout, cross-shadow-DOM label syncing, state passthrough to slotted controls (31 unit + 8 storybook tests)
- [x] `data-theme="dark"` attribute for programmatic dark mode — `[data-theme="dark"]` added alongside `.flint-theme-dark`; `[data-theme="light"]` added alongside `.flint-theme-light` in `@media` block
- [x] Extend axe-core a11y tests to 15 more components (radio, textarea, slider, date-picker, autocomplete, menu, navigation-menu, accordion, collapsible, drawer, tooltip, hover-card, command, pagination, empty)
- [x] React property mappings for FlintGrid/FlintContainer — investigated; `@lit/react` v1 already detects properties via `propName in elementClass.prototype`; no code change needed

### Breaking Change Communication (v0.5.0)
- [ ] Write migration guide for v0.4.0 → v0.5.0 (accordion rename, tabs `flint-tab-list` wrapper, `label` → slotted content)
- [ ] Document FlintAccordion rename: `flint-accordion-item`/`trigger`/`content` → removed/`summary`/`details`
- [ ] Document FlintTabs `flint-tab-list` wrapper requirement + `label` attribute removal

---

## Remaining Work (v0.3 → v0.4 carryover)

### Breaking Change Communication
- [ ] Write migration guide for v0.3.0 → v0.4.0 (event renames, two-file split, FlintElement base class)
- [x] Update CHANGELOG with all breaking changes — v0.3.0–v0.6.0 added to CHANGELOG.md
- [ ] Add changeset for the event rename breaking changes

### Testing Gaps (carryover)
- [x] Add integration tests verifying React wrappers forward renamed events correctly — 37 tests covering event constants, barrel re-exports, naming conventions, uniqueness across 9 components
- [x] Add tests for FlintSpeedDial open/close events in React context — event detail type tests for `flint-speed-dial-open` / `flint-speed-dial-close`
- [x] Verify Storybook browser tests work with renamed events — covered by playbook integration tests

### Codegen
- [x] Fix `gen:react` bug: wrappers now import and use event constant files (e.g. `FlintSwitchEvents.CHANGE`)

---

## Completed — Quick Wins

### Hoist on remaining overflow-vulnerable components
- [x] FlintTooltip — `hoist` property, reposition on scroll/resize, 8 tests
- [x] FlintHoverCard — `hoist` property synced to content, 5 tests
- [x] FlintDatePicker (desktop dropdown) — `hoist` property, 5 tests

### axe-core automated a11y testing
- [x] Added `axe-core` devDependency + `src/test-utils/axe.ts` helper (`expectAccessible()`)
- [x] a11y tests on Button, Dialog, Select, Tabs, Input, Checkbox, Switch, Table (10 tests)
- [x] Extended axe-core tests to 15 more components: radio, textarea, slider, date-picker, autocomplete, menu, navigation-menu, accordion, collapsible, drawer, tooltip, hover-card, command, pagination, empty
- [x] Already in CI — `npm run validate` runs `npm test` which includes all axe tests

### `::part()` exposure on high-use components
- [x] FlintButton — `base`, `label`
- [x] FlintInput — `base`, `input`, `label`, `help-text`, `error-message`
- [x] FlintSelect — `trigger`, `dropdown`, `chip`, `placeholder`, `label`, `option`, `error-message`
- [x] FlintDialog — `panel`
- [x] FlintTabs — `base` (tabs), `tab` (tab), `panel` (tab-panel), `nav`, `indicator` (tab-list)
- [x] FlintCard — `base`
- [x] Extended `::part()` to 15 more components: Accordion, Checkbox, Radio, Switch, Slider, Drawer, Tooltip, Menu, Pagination, Alert, Autocomplete, Chip, Badge, HoverCard, Collapsible

---

## Completed — Next Sprint

### FormControlController (shared reactive controller)
- [x] Created `src/controllers/form-control.ts` — dirty/touched/pristine tracking, validation
- [x] Data attributes: `data-valid/invalid`, `data-user-valid/user-invalid`, `data-dirty/pristine`, `data-touched/untouched`, `data-required/optional`, `data-disabled`
- [x] `src/utilities/form.ts` — `serialize(form)` utility
- [x] Migrated FlintSwitch as proof of concept (31 tests)
- [x] Migrated Select, Input, Checkbox to FormControlController (TextField, InputOtp, DatePicker, TimePicker need FormAssociated mixin first)

### String localization (reactive controller)
- [x] Created `src/utilities/localize.ts` — `LocalizeController` + `registerTranslation()`
- [x] Created `src/translations/en.ts` — English default with all component strings
- [x] Hierarchical lang resolution: host → ancestor → document → navigator → 'en'
- [x] MutationObserver on `<html lang>` for live switching
- [x] Migrated FlintSelect as proof of concept (15 tests)
- [x] Migrated Carousel, Command, DatePicker, DateRangePicker, Pagination to LocalizeController (Dialog has no hardcoded UI strings)

### Animation registry
- [x] Created `src/utilities/animation-registry.ts` — `setDefaultAnimation()`, `setAnimation()`, `getAnimation()`, `animateTo()`, `stopAnimations()`
- [x] Created `src/utilities/animation-presets.ts` — presets for dialog, drawer, tooltip, snackbar, dropdown
- [x] RTL support via `rtlKeyframes`, `prefers-reduced-motion` auto-disable
- [x] Migrated FlintDialog as proof of concept (18 tests)
- [x] Migrated Drawer, Tooltip, Snackbar, Select dropdown to animation registry

---

## v0.6.0 DX Report

### Completed

#### High Priority
- [x] #18 FlintChip children don't render — Added default `<slot>` inside `.label` span; `<FlintChip>Hello</FlintChip>` works naturally alongside the `label` prop

#### Medium Priority
- [x] #1/#20 Inconsistent CustomEvent typing — Added `detail:` annotations to `@fires` JSDoc on 8 components (checkbox, input, slider, tabs, carousel, toggle-button-group, radio-group, radio); rebuilt CEM; regenerated React wrappers with typed `CustomEvent<Detail>` generics
- [x] #2 FlintInput controlled value pattern — Mitigated by #1 fix; `e.detail.value` is now typed (developers no longer need `e.target` casting)
- [x] #10 Peer dependency version mismatch — Fixed README `@getufy/flint-ui ^0.2.2` → `^0.6.0`
- [x] #13 README incorrect FlintButton variant — Fixed `variant="filled"` → `variant="primary"`
- [x] #14 Core package missing `sideEffects` — Added granular `sideEffects` array to `packages/core/package.json` (CSS and suppress-warnings only); enables tree-shaking from barrel import
- [x] #19 Dark theme activation undocumented — Added "Dark mode" section to React README: import, activation (`class`/`data-theme`), `prefers-color-scheme` auto-detection
- [x] #22 No `prefers-color-scheme` auto-detection documented — Covered in #19 dark mode section

### Won't Fix / By Design (v0.6.0)
- #3 No unified `onFlintChange` across form components — By design; component-specific event names prevent ambiguity and match web component conventions
- #11 Undocumented subpath exports — `form-field` and `flint-range-slider` ARE listed in the README subpath table

### Low Priority / Nice to Have (v0.6.0)
- [x] #4 FlintAlert severity default — Added `@default` JSDoc annotations to non-obvious prop defaults across 20 components (button, input, select, checkbox, switch, slider, tabs, dialog, drawer, card, chip, badge, pagination, menu, tooltip, snackbar, progress, divider, stack, alert)
- [x] #5 FlintDivider vertical orientation — Already supported via `orientation="vertical"` prop; added `@default` JSDoc annotations
- [x] #6 FlintStack spacing unit — Expanded JSDoc to explain 8px multiplier, string pass-through, and responsive object syntax; added `@default 0`
- [x] #7 suppress-warnings re-export from React package — Added `@getufy/flint-ui-react/suppress-warnings` subpath export
- [x] #8 README copy-paste recipes (form, card layout, dialog) — Added login form, card grid, and confirmation dialog recipes to React README
- [x] #9 CSS custom properties list / THEMING.md — Created comprehensive THEMING.md with all three token layers, component-specific tokens, dark mode, and preset palettes
- [x] #12 Document `custom-elements.json` manifest in README — Added CEM section with VS Code, JetBrains, Storybook, and docs tooling references
- [x] #15 Runtime theme switching utility (`setFlintTheme()`) — Created `utilities/theme.ts` with `setFlintTheme(mode, palette?)` and `getFlintTheme()`; exported from barrel and subpath
- [x] #16 CHANGELOG / migration guide shipped with package — Added v0.3.0 through v0.6.0 entries to CHANGELOG.md
- [x] #17 SSR / Next.js documentation (App Router `'use client'` directives) — Added SSR section to React README covering Next.js App Router, Astro, Remix, and known limitations
- [x] #21 FlintAppBar `startContent`/`endContent` named slots — Added `start-content` and `end-content` slot aliases alongside existing `navigation` and `actions` slots
- [x] #23 FlintCard `cursor: pointer` on clickable cards — Moved `cursor: pointer` from `.interactive:hover` to `.interactive` so it shows immediately

---

## Improvements — Strategic

### Custom Elements Manifest (CEM)
- [x] Installed `@custom-elements-manifest/analyzer` v0.11.0, added to build pipeline
- [x] Created CEM config (`packages/core/custom-elements-manifest.config.mjs`) with Lit plugin
- [x] Ships `dist/custom-elements.json` (95 modules), declared in package.json `"customElements"` field
- [x] Added `npm run cem` / `npm run gen:cem` scripts, chained into `npm run build`
- [x] Generate React wrappers from CEM (`parse-cem.ts` + AST detail type augmentation)
- [x] Generate VS Code custom data (`dist/vscode.html-custom-data.json`) for autocompletion
- [x] Generate JetBrains web-types (`dist/web-types.json`) for WebStorm support
- [x] Drive docs generation from CEM (replaced regex parsing in `generate-docs.ts`)
> **Why:** Single source of truth for component metadata. Fixes `gen:react` event file bug. Enables IDE autocompletion for all consumers (not just React). Both Shoelace and the broader web component ecosystem standardize on CEM.

### SSR / Lit SSR + Declarative Shadow DOM
- [x] Audit all components for top-level DOM API access (move to `connectedCallback`)
- [x] Audit for imperative slot detection (`querySelector` for slot presence)
- [x] Test with `@lit-labs/ssr` for server-rendered output
- [x] Document SSR limitations and workarounds for Next.js / Astro / Remix
> **Why:** Blocks adoption in server-rendered frameworks (Next.js, Astro, Remix). Shoelace/Web Awesome is actively working on this. Lit SSR + Declarative Shadow DOM is the path forward but still maturing.

### Skin / preset theme system
- [x] Created 6 preset palettes: teal, violet, rose, amber, emerald, slate
- [x] Each preset is a single CSS file (`theme-<name>.css`) overriding `--flint-*` color tokens
- [x] Apply via class (`.flint-theme-<name>`) or data attribute (`data-theme="<name>"`) on any container
- [x] Added to package.json exports and files array
- [x] Document in theming guide — THEMING.md created with full token reference (visual preview not yet added)
> **Why:** Currently users must override 5+ CSS vars to rebrand. AgnosticUI ships 15+ skins as single-class overrides. Instant theming for prototyping and quick adoption.

### Playbook-style integration tests
- [x] Create realistic multi-component test scenarios:
  - Login form (FlintTextField + FlintButton + FlintCheckbox + FlintSwitch — form validation, shadow DOM input filling)
  - Settings page (FlintTabs + FlintSwitch + FlintSelect — tab navigation, state persistence across tab switches)
  - Data explorer (FlintDialog + FlintButton + FlintPagination — dialog open/close, pagination state)
  - Dashboard layout (FlintCard + FlintGrid + FlintBadge + FlintAlert — component composition, alert dismissal)
- [x] Run as Storybook browser tests (Playwright) — 4 stories in `src/playbooks/`
- [x] Use to validate inter-component communication, focus management, form submission
> **Why:** AgnosticUI found that unit tests alone miss composition bugs. Playbooks test real user flows and catch issues at component boundaries.
