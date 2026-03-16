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
- [x] Write migration guide for v0.4.0 → v0.5.0 — `docs/migration/v0.4-to-v0.5.md` covering accordion rename, tab-list wrapper, label removal, dialog a11y, select hoist, FlintElement.define()
- [x] Document FlintAccordion rename — `docs/migration/accordion-rename.md` with tag/class/event mapping, before/after examples, search-and-replace patterns
- [x] Document FlintTabs `flint-tab-list` wrapper requirement + `label` attribute removal — `docs/migration/tabs-tab-list.md` with structural changes, property relocation, before/after examples

---

## Remaining Work (v0.3 → v0.4 carryover)

### Breaking Change Communication
- [x] Write migration guide for v0.3.0 → v0.4.0 — `docs/migration/v0.3-to-v0.4.md` covering event renames, two-file split, FlintElement base class, sideEffects removal
- [x] Update CHANGELOG with all breaking changes — v0.3.0–v0.6.0 added to CHANGELOG.md
- [x] Add changeset for the event rename breaking changes — `.changeset/namespace-custom-events.md` (major bump for both core and react)

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

## Release Infrastructure

- [x] Migrate from `@changesets/cli` to `release-please` — conventional commits, linked-versions plugin, single workflow for version PR + npm publish
- [x] Fix `publish.yml` dual-publish conflict (changesets + tag-triggered publish were both trying to publish)
- [x] Fix release-drafter permissions — switched from `GITHUB_TOKEN` to `RELEASE_TOKEN` PAT
- [x] Revert accidental 1.0.0 version bump back to 0.6.1
- [x] Deprecate accidental `@getufy/flint-ui@1.0.0` and `@getufy/flint-ui-react@1.0.0` on npm
- [x] Publish `0.6.1` to npm — `@getufy/flint-ui@0.6.1` and `@getufy/flint-ui-react@0.6.1` published

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

---

## v0.6.1 DX Report (WeatherScope / Pokedex)

### Completed

#### Critical — React Event Forwarding (#20, #24, #25)
- [x] **Fix native DOM event forwarding in React wrappers** — `onClick`, `onKeyDown`, `onFocus`, etc. silently failed on ALL components because `@lit/react`'s `createComponent()` only maps events listed in `events:` config. 112 of 186 wrappers (60%) had zero event mappings. Fixed codegen (`scripts/lib/codegen.ts`) to always emit native DOM events in every wrapper's `events:` block. Affects FlintButton, FlintItem, FlintList, FlintLink, FlintCard, and all other components.

#### High — Drawer/Select Stacking Context (#3, #22)
- [x] **Fix FlintDrawer `overflow: hidden` trapping fixed-position children** — Changed to `overflow: clip` which clips off-screen content without creating a containing block for fixed-position descendants. FlintSelect's hoisted dropdown can now escape the drawer.
- [x] **Fix FlintSelect dropdown z-index** — Replaced hardcoded `z-index: 1000` with `var(--flint-select-dropdown-z-index, var(--flint-z-popover, 1300))`. Dropdown now renders above drawer (z-index 1040) by default.

#### High — Drawer Default Width (#2)
- [x] **Bump FlintDrawer default width from 250px to 320px** — `--flint-drawer-width` default increased. Previous 250px was too narrow for form content.

#### Medium — BottomNavigationAction (#4)
- [x] **Remove hardcoded `max-width: 168px` on FlintBottomNavigationAction** — Replaced with `var(--flint-bottom-nav-action-max-width, none)`. Actions now fill full width by default (standard mobile pattern).

#### Medium — Skeleton px Auto-Append (#21)
- [x] **Fix FlintSkeleton numeric width/height** — Added `_cssLength()` helper that auto-appends `px` for numeric strings (e.g., `height="120"` → `height: 120px`), matching FlintCardMedia behavior.

### Already Addressed / Exists

| # | Issue | Status |
|---|-------|--------|
| #1 | Dark mode dual mechanism confusion | `setFlintTheme()`, `<flint-theme>`, `data-theme` attributes all exist. Need better docs. |
| #5 | Dark mode toggle state sync | `getFlintTheme()` exists in `utilities/theme.ts` |
| #8 | No icon system | Already in TODO as P2 #35 (`flint-icon` component) |
| #9 | CSS custom properties not documented | `THEMING.md` created in v0.6.0 |
| #16 | Dark mode toggle helper | `setFlintTheme()` / `getFlintTheme()` shipped in v0.6.0 |

#### Medium — Dialog/Drawer Auto-Focus (#6)
- [x] **FlintDialog auto-focus first focusable element** — Now focuses first focusable child (piercing shadow DOM) instead of the panel container. Added `initialFocus` prop (CSS selector) for explicit control. Falls back to panel if no focusable elements.
- [x] **FlintDrawer auto-focus first focusable element** — Same behavior as dialog for temporary drawers. Added `initialFocus` prop.

#### Low — CardMedia Object-Fit (#19)
- [x] **FlintCardMedia `--flint-card-media-object-fit`** — Exposed CSS custom property for `object-fit` on the internal `<img>`. Default remains `cover`.

### Remaining — Merge into v0.7.0

#### Medium (fold into existing P0/P1 items)
- [ ] **#7 Export event detail types from React package** — Verify `FlintSelectChangeDetail` etc. are in barrel export. Related to P2 #43.
- [ ] **#17 Document: avoid hardcoded color fallbacks** — Add guidance to THEMING.md: always use `var(--flint-*)` without fallbacks in dark-mode-aware UIs.
- [ ] **#18 Event naming discoverability** — `onFlintPaginationChange` (not `onFlintPageChange`). Improve TypeScript strictness so unknown event props cause compile errors.

#### Low / Nice to Have
- [ ] **#10** Controlled vs uncontrolled documentation (JSDoc)
- [ ] **#11** FlintSelect `value` accept `string` for single select
- [ ] **#12** Responsive `direction`/`spacing` on FlintStack
- [ ] **#13** Toast/notification manager API (`useFlintToast()` hook)
- [ ] **#14** FlintAppBar React-idiomatic prop alternatives for slots
- [ ] **#15** FlintCard `onFlintCardClick` custom event for interactive cards
- [ ] **#19** FlintCardMedia `--flint-card-media-object-fit` CSS custom property
- [ ] **#23** FlintChip `clickable` event propagation in nested click handlers

---

## v0.7.0 — Consolidated Priority List

> Merged from ANALYSIS.md (4 parts, 40 sections) + prior TODO items. Deduplicated and ordered by impact.
> Reference: ANALYSIS.md sections noted in brackets.

---

### P0 — Ship-Blocking (must fix before v0.7.0 release)

- [ ] **1. Focus trap in Dialog/Drawer/CommandDialog** — WCAG 2.4.3 violation [§37.1]
  - Users can Tab out of modal dialogs into the page behind them
  - Options: `inert` on background, Tab cycling, or `focus-trap` library
  > **Why:** Every competing library (Shoelace, Spectrum, Lion, Vaadin, Carbon) has focus trapping. This is a legal accessibility risk.

- [ ] **2. SSR safety sweep** — 12 components crash during SSR [§17.1]
  - [ ] Add `typeof window !== 'undefined'` guards to: CommandDialog, ScrollArea, SplitPanel, Carousel, Dialog, Drawer, Menu, Tooltip, HoverCard, Select, Grid, Stack
  - [ ] Add SSR guard to `setFlintTheme()` / `getFlintTheme()` in `utilities/theme.ts` [§25.4]
  > **Why:** Crashes in Next.js/Astro/Remix. Blocks server-rendered framework adoption entirely.

- [ ] **3. Race condition fix** — async animation `.then()` fires on detached elements [§16.1]
  - [ ] Guard all `.then()` handlers with `if (!this.isConnected) return;`
  - Affected: Drawer, Tooltip, Dialog, RelativeTime recursive timer [§16.6]
  > **Why:** Rapid mount/unmount (route transitions) causes errors or memory leaks.

- [ ] **4. Dialog `_openDialogs` leak** — orphaned entries break Escape key [§16.2]
  - [ ] Wrap `_runOpenAnimation()` in try/catch
  - [ ] Remove from `_openDialogs` in `disconnectedCallback()`
  > **Why:** Escape key acts on wrong dialog when array has orphaned entries.

- [ ] **5. Button overhaul** — foundational component rated 3/10 [§2]
  - [ ] Add `type` prop (submit, reset, button) — currently hardcoded to "button"
  - [ ] Add `aria-label` prop — icon-only buttons inaccessible
  - [ ] Add `loading` state with spinner
  - [ ] Add icon slots (`prefix`, `suffix`)
  - [ ] Add `href` prop for link variant (renders `<a>`)
  - [ ] Add CSS parts: `prefix`, `suffix`, `spinner`
  - [ ] Add pill and circle shape variants
  - [ ] Add success, neutral, warning variants
  > **Why:** Can't submit forms, show loading, or render icons. Every competing library has these.

- [ ] **6. TextField: Add FormAssociated mixin** — text input can't participate in forms [§6, §19.2]
  - [ ] Add `static formAssociated = true` + ElementInternals
  - [ ] Add `aria-describedby` linking for error/helper text
  - [ ] Add `aria-invalid` attribute
  - [ ] Wire up `_internals.setFormValue()` and `formResetCallback()`
  > **Why:** Input and Textarea have FormAssociated. TextField is the odd one out.

- [ ] **7. `define()` error swallowing fix** in FlintElement base class [§25.1]
  - [ ] Only catch `DOMException` with `NotSupportedError`, re-throw everything else
  - [ ] Add console.warn for re-registration attempts
  > **Why:** Masks real bugs. Silent error swallowing hides registration failures.

---

### P1 — High Priority (next minor release, breaking changes bundled)

#### API Consistency (Breaking Changes)

- [ ] **8. Standardize size props** to `'sm' | 'md' | 'lg'` everywhere [§15.1]
  - Button uses `'small' | 'medium' | 'large'`, Input/Textarea/Toggle use `'sm' | 'default' | 'lg'`
  - Target: all components use `'sm' | 'md' | 'lg'` (majority pattern)

- [ ] **9. Standardize event patterns** [§15.2]
  - [ ] Add `flint-dialog-open` and `flint-drawer-open` events (currently only fire close)
  - [ ] Add Tooltip visibility events (`flint-tooltip-show` / `flint-tooltip-hide`)
  - [ ] Decide: HoverCard fires both open+close (good), Dialog/Drawer should match

- [ ] **10. Standardize placement/position prop** to `placement` everywhere [§15.4]
  - Drawer uses `anchor`, Tooltip uses `placement`, HoverCard uses `side`

- [ ] **11. Standardize variant naming** — `outlined` not `outline` [§15.5]
  - Toggle uses `'outline'`, Chip uses `'outlined'`

- [ ] **12. Standardize slot names** — pick `prefix`/`suffix` [§15.6]
  - TextField uses `leading`/`trailing`, Switch uses `icon-on`/`icon-off`

- [ ] **13. HoverCard: Add ARIA** — no role or label [§3]
  - [ ] Add `role` attribute, `aria-label`/`aria-describedby`, `aria-hidden` state

#### Form System

- [ ] **14. Form API completion** — missing 8 standard HTML form element APIs [§19.1]
  - [ ] Add to FormAssociated mixin: `form`, `validity`, `validationMessage`, `willValidate` getters
  - [ ] Add: `checkValidity()`, `reportValidity()`, `setCustomValidity()`, `formDisabledCallback()`
  > **Why:** `myInput.checkValidity()` and `myInput.validity.valid` don't work. Breaks form validation libraries.

- [ ] **15. Add `delegatesFocus: true`** to all interactive components [§19.5]
  - Zero components currently set this
  > **Why:** Clicking label area doesn't auto-focus inner input. Shoelace + AgnosticUI both use this.

#### Design Tokens

- [ ] **16. Spacing token scale** + migrate 350+ hardcoded values [§20.1]
  - Define `--flint-spacing-{0,1,2,3,4,5,6,8,10,12}` in `theme.css`
  - 90 occurrences of `8px`, 50 of `4px`, 50 of `16px`, 48 of `12px`, etc.

- [ ] **17. Typography token scale** — only `--flint-font-family` exists [§20.2]
  - Define `--flint-font-size-{xs,sm,md,lg,xl,2xl}`, line-height, font-weight tokens
  - Enforce `rem` units only (currently mixed `px` and `rem`)

- [ ] **18. Animation timing tokens** — 27+ unique hardcoded values [§20.3]
  - Define `--flint-transition-{fast,medium,slow}` and `--flint-ease-{default,in,out}`
  - Normalize `.2s` vs `0.2s` notation

- [ ] **19. Z-index token scale** [§20.4]
  - Define `--flint-z-{dropdown,sticky,overlay,modal,popover,tooltip}`
  - Fix Dialog (1200) / Drawer (1200) collision

#### Accessibility

- [ ] **20. Global reduced-motion CSS rule** [§37.4]
  - Only ~5 components have `@media (prefers-reduced-motion)` in CSS
  - Add global `animation-duration: 0.01ms !important` rule

- [ ] **21. Touch target audit** — ~40% of interactive components fail WCAG 2.5.8 [§35.4]
  - Button (small): ~24px, Checkbox: 14-22px, Radio: ~18px, Switch (sm): 36x22px
  - Minimum: 44x44px touch target

- [ ] **22. DateRangePicker keyboard navigation** — calendar cells have no arrow key nav [§29.3]

- [ ] **23. DateRangePicker i18n** — hardcoded `MM/DD/YYYY` and English month names [§29.3]
  - Use `Intl.DateTimeFormat` like other i18n components

#### TypeScript

- [ ] **24. Typed event maps** — `HTMLElementEventMap` augmentation [§26.3]
  - 163 `new CustomEvent()` calls across 63 files are untyped
  - Vanilla TS consumers get `any` for event details

- [ ] **25. Enable `noUncheckedIndexedAccess`** in tsconfig [§26.1]

#### Documentation

- [ ] **26. Update CONTRIBUTING.md** [§33.4]
  - References Changesets (outdated) → should reference release-please
  - Uses `@customElement` pattern → should document two-file split + `FlintElement.define()`

---

### P2 — Medium Priority (next quarter)

#### Styling & CSS Parts

- [ ] **27. CSS parts on 53 missing components** [§20.6]
  - Carousel, Slider, Collapsible, Badge, Tooltip, Input (expand), Rating, Progress, etc.
  > **Why:** 55% of components can't be deeply styled. Shoelace: 500+ parts.

#### Forms

- [ ] **28. Form-associate 5 more components** [§19.2]
  - Rating, InputOTP, Autocomplete, DatePicker, TimePicker — values missing from FormData

- [ ] **29. Constraint validation** [§19.3]
  - `pattern`, `min`, `max`, `minlength`, `maxlength` on form controls
  - `setCustomValidity()`, `reportValidity()`, `checkValidity()`
  > **Why:** Only `required` is supported. Real forms need more.

- [ ] **30. Custom state pseudo-classes** via `ElementInternals.states` [§19.4]
  - Enable `flint-input:state(invalid)` CSS selectors (currently uses `data-*` attributes)

#### Component Features

- [ ] **31. Select typeahead** — can't jump to options by typing [§29.1]
- [ ] **32. Select virtualization** — 1000+ options cause rendering lag [§29.1]
- [ ] **33. Command fuzzy search + debouncing** — currently substring-only, no debounce [§29.2]
- [ ] **34. Input UX patterns** — clearable button, password toggle, prefix/suffix slots
- [ ] **35. `flint-icon` component** with resolver pattern for swappable icon sets

#### Testing & CI

- [ ] **36. Enable Chromatic visual regression** — addon installed but not in CI [§9]
- [ ] **37. Storybook `.play()` interaction tests** — only 10% coverage (8/84 stories) [§27.3]
  - Target: 50% coverage on interactive components
- [ ] **38. RTL stories** — 68 stories reference RTL but 0% render `dir="rtl"` layouts [§27.4]
- [ ] **39. Automated a11y testing in CI** — no a11y regression detection [§38.1]
- [ ] **40. Pin CI action versions to commit SHAs** — currently floating `@v6` tags [§32.3]
- [ ] **41. Add `npm audit` scheduled workflow** [§32.4]

#### Infrastructure

- [ ] **42. CDN distribution** (UMD/ESM for jsDelivr/unpkg) [§10]
- [ ] **43. Export event detail types** from `index.ts` [§26.6]
- [ ] **44. React SSR documentation** (Next.js `'use client'` guide) [§24.4]
- [ ] **45. Autoloader cleanup API** — MutationObserver never disconnects [§25.2]
- [ ] **46. Performance fixes** [§18]
  - Grid layout thrashing (read-write cycle in `_applyItemStyles`)
  - Command DOM queries on every keystroke
  - Tabs syncs all children on any property change
- [ ] **47. Vue/Angular/Svelte integration guides** [§33.5]

---

### P3 — Backlog

#### Quick Fixes
- [ ] Cache compiled RegExp in InputOTP (`new RegExp()` on every keystroke) [§16.4]
- [ ] Guard `focus()` with `disabled` check on Radio and other components [§16.3]
- [ ] Fix `sideEffects: "**/*.css"` — overly broad, should specify exact files [§28.2]
- [ ] Granular `updated()` guards in Tabs (don't sync all children for color change) [§18.4]
- [ ] Source maps for production (`sourcemap: 'hidden'`) [§28.1]
- [ ] Fix PR template — still references Changesets [§32.5]

#### New Components
- [ ] `flint-button-group` — toolbar/action bar pattern
- [ ] Combobox — free-text input with suggestions (different from Select)
- [ ] Dialog size variants (small, medium, large, full)

#### Features
- [ ] Select option grouping (`<optgroup>` equivalent)
- [ ] Select async data loading (server-fetched options)
- [ ] Dialog scrollable content handling
- [ ] Carousel touch/swipe support
- [ ] `@watch()` decorator on FlintElement
- [ ] `<flint-animation>` declarative component with presets

#### Advanced (Industry Patterns)
- [ ] Centralized overlay manager (Spectrum/Lion pattern) [§38.1]
- [ ] Scale dimension theming (medium/large global switch) [§38.1]
- [ ] Contextual layer tokens (`<flint-layer>` for card-in-card) [§38.1]
- [ ] Multi-level form validation (error/warning/info) [§38.1]
- [ ] Data provider abstraction for lazy loading [§38.1]
- [ ] Virtual scrolling primitive [§38.1]
- [ ] Nested theme scoping (`<flint-theme>`) [§38.1]
- [ ] `forced-colors` media query support (Windows High Contrast) [§37.5]
- [ ] `:focus-visible` styles on all interactive components [§37.2]
- [ ] CSS `clamp()` for fluid typography [§35.3]
- [ ] `@container` queries for intrinsic layouts [§35.3]
- [ ] Generic value types on Select/Autocomplete (`Select<T>`) [§26.5]

#### Testing
- [ ] Cross-browser CI (Safari/WebKit, Firefox) [§12]
- [ ] RTL test suite [§9]
- [ ] Responsive Storybook stories (viewport decorator) [§27.4]
- [ ] Performance benchmarks in CI [§12]
- [ ] Code coverage reporting (Codecov) [§32.4]
- [ ] Add Prettier config
