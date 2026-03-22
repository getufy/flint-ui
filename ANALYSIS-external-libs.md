# Analysis: Can External Libraries Replace Complex Flint UI Components?

## Context

Flint UI has several complex components with large test suites. The question: could smaller external libraries handle the core logic (like `@floating-ui/dom` did for positioning), reducing custom code and test burden?

## Component Complexity Snapshot

| Component | Component LOC | Test LOC | Ratio | Key Complexity |
|-----------|---|---|---|---|
| date-range-picker | 1,111 | 5,461 | 4.9:1 | Calendar math, dual-month, shortcuts |
| navigation-menu | 1,067 | 2,139 | 2.0:1 | 6 sub-components, keyboard nav |
| menubar | 1,036 | 3,432 | 3.3:1 | Nested menus, keyboard, a11y |
| time-picker | 982 | 3,623 | 3.7:1 | Analog/digital clock, 8 sub-components |
| select | 772 | 1,265 | 1.6:1 | Multi-select, filtering, keyboard |
| resizable | 714 | 1,930 | 2.7:1 | 3 sub-components, collapse/expand, overshoot |
| command | 677 | 1,368 | 2.0:1 | Fuzzy search, keyboard, grouping |
| tabs | 590 | 1,268 | 2.1:1 | Keyboard, scroll overflow, orientation |
| split-panel | 550 | 1,006 | 1.8:1 | Drag resize, snap points, primary panel |
| carousel | 535 | 1,115 | 2.1:1 | Autoplay, touch, infinite loop |
| scroll-area | 491 | 1,296 | 2.6:1 | Custom scrollbar overlay, thumb sizing |
| virtual-scroll | 137 | 199 | 1.5:1 | Fixed-height item virtualization |

---

## Library-by-Library Evaluation

### Split Panel -- `Split.js` (~2 KB gzip)

**Result: NOT VIABLE**

- Split.js creates gutter divs as siblings between elements -- incompatible with shadow DOM
- It would only replace ~80 LOC of pointer-drag math out of 550 total
- Missing: snap points, keyboard nav, primary panel, CSS min/max, ARIA, RTL
- Bundle savings: none (Split.js ~2 KB vs component ~2-3 KB compiled)

### Resizable -- no viable candidate exists

**Result: NOTHING TO REPLACE IT**

- The group-based collapse/expand pattern with overshoot accumulation is unique
- `interact.js` does single-element resize, not multi-panel group layouts
- `re-resizable`, `react-resizable` -- React-only
- `@column-resizer/core` -- column-specific, no collapse/expand
- No framework-agnostic library provides: group panels + collapse API + keyboard + RTL + ARIA

### Scroll Area -- `simplebar` (~6 KB) / `overlayscrollbars` (~15 KB)

**Result: NOT VIABLE -- shadow DOM incompatible**

- Both inject wrapper divs and styles into document head
- Cannot reach inside shadow root to render custom scrollbar thumbs
- Would require maintaining a fork, worse than maintaining 491 LOC

### Virtual Scroll -- `@lit-labs/virtualizer` (~8-10 KB gzip)

**Result: NOT WORTH IT**

- Current implementation: 137 LOC, fixed-height items, works perfectly
- Library adds 8-10 KB (60-70x the current compiled size) for features not used
- Still under `@lit-labs` experimental label -- API may change
- Revisit only if variable-height or grid virtualization becomes needed

### Command Palette fuzzy search -- `fuse.js` (~3.5-5 KB gzip)

**Result: NOT WORTH IT (unless match highlighting is planned)**

- Current `fuzzy-score.ts`: 117 LOC, purpose-built, well-tested
- fuse.js adds 3.5-5 KB to replace ~100 lines compiling to <0.5 KB
- One advantage: fuse.js returns match character indices for highlighting
- If match highlighting is on the roadmap, fuse.js becomes attractive

### Date utilities -- `date-fns` (~7 KB tree-shaken gzip)

**Result: NOT WORTH IT -- but duplicated code should be consolidated**

- Total unique date math: ~80 LOC (isoToDate, dateToIso, sameDay, buildMonthGrid, etc.)
- date-fns would replace ~50 of those lines at 7 KB cost
- Display formatting already uses `Intl.DateTimeFormat` (zero bundle cost)
- Calendar grid builders (`buildMonthGrid`, `buildRangeMonthGrid`) are custom either way
- Real problem: date-picker duplicates helpers from `date-range-helpers.ts`

### `@zag-js/*` state machines -- for menubar, tabs, select, nav-menu

**Result: NOT VIABLE -- shadow DOM fundamentally incompatible**

- Zag uses `document.getElementById()`, `document.activeElement`, `element.querySelector()` -- none traverse shadow DOM
- Lit templates lack JSX prop-spreading, so glue code would be nearly as large as current code
- Would add ~20-30 KB for menubar+tabs+select+combobox
- Monitor for future shadow DOM support, but not usable today

---

## Summary Matrix

| Library | Target | Bundle Cost | Shadow DOM? | LOC Replaced | Verdict |
|---|---|---|---|---|---|
| `Split.js` | split-panel (550) | ~2 KB | No | ~80 | NO |
| (none exists) | resizable (714) | -- | -- | -- | NO candidate |
| `simplebar` | scroll-area (491) | ~6 KB | No | ~300 | NO |
| `overlayscrollbars` | scroll-area (491) | ~15 KB | No | ~300 | NO |
| `@lit-labs/virtualizer` | virtual-scroll (137) | ~8-10 KB | Yes | ~100 | NO -- 10x bundle |
| `fuse.js` | command scorer (117) | ~3.5-5 KB | Yes | ~100 | NO -- 10x bundle |
| `date-fns` | date utils (~80) | ~7 KB | Yes | ~50 | NO -- trivial math |
| `@zag-js/*` | menubar/tabs/select | ~20-30 KB | No | ~1,500 | NO -- shadow DOM |

---

## Why This Is Different from `@floating-ui/dom`

The `@floating-ui/dom` adoption worked because:
1. Positioning math is genuinely hard -- flipping, shifting, auto-update across scroll containers
2. Zero DOM opinions -- takes coordinates in, returns coordinates out
3. Shadow DOM agnostic -- uses `getBoundingClientRect()` only
4. High ROI -- replaced duplicated logic across 8 components

The candidates above fail because component complexity lives in DOM interaction, keyboard navigation, ARIA management, and Lit lifecycle -- areas where external libs either can't help (shadow DOM barrier) or cost more than they save.

---

## Actionable Refactoring

### 1. Extract shared date utilities (eliminates ~60 LOC duplication)
- `date-picker` duplicates `isoToDate`, `dateToIso`, `sameDay`, `buildMonthGrid` from `date-range-helpers.ts`
- Create `src/utilities/date-utils.ts` with the canonical implementations
- Both date-picker and date-range-picker import from it

### 2. Extract keyboard roving-index utility (reduces duplication across 5-6 components)
- ArrowUp/Down/Home/End keyboard nav repeats in: command, menubar, tabs, select, combobox, tree-view
- A shared `createRovingIndex()` or `handleListKeyboard()` utility (~40 LOC) would DRY this up
- Does not remove tests, but reduces component LOC and centralizes the keyboard logic

### 3. Monitor for future opportunities
- `@zag-js`: re-evaluate if shadow DOM support ships (menubar + tabs = highest ROI)
- `@lit-labs/virtualizer`: re-evaluate if it graduates to stable and variable-height is needed
- `fuse.js`: re-evaluate if match highlighting is added to command palette

---

## Bottom Line

Split panel and resizable should stay custom. Shadow DOM is the #1 blocker -- most UI utility libraries assume light DOM access. The components are well-engineered with strong test coverage, and no external library matches their feature set for the web component context.

The real wins are internal refactoring: consolidating duplicated date utils and extracting shared keyboard navigation patterns. These reduce code without adding dependencies.
