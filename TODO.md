# Theme CSS — Color Palette Refactor

## Status Legend
- [ ] todo
- [x] done
- [-] skipped / not applicable

---

## theme.css Changes

- [x] Add quick-rebrand comment block (5 variables to restyle the library)
- [x] Add Layer 1: primitive palette (blue, zinc, slate, red, emerald, amber scales)
- [x] Refactor Layer 2 semantic tokens to reference primitives via `var(--flint-color-*)`
- [x] Add new surface elevation tokens: `--flint-surface-1`, `--flint-surface-2`, `--flint-surface-3`, `--flint-background`
- [x] Add `--flint-text-color-subtle` (subtler than muted, for hints/disabled)
- [x] Add `--flint-muted-background` (for muted variant backgrounds)
- [x] Keep backward-compat aliases: `--flint-surface-background`, `--flint-surface-background-flat`, `--flint-card-background`, `--flint-card-background-flat`, `--flint-input-bg`
- [x] Add dark mode value cache (`--_dark-*` private vars) — define all dark values ONCE in `:root`
- [x] Dark mode class block (`.dark`, `[data-theme="dark"]`) references cache vars — no hardcoded values
- [x] Dark mode media block (`@media prefers-color-scheme: dark`) references the same cache vars
- [x] Switch dark surfaces from Tailwind Gray → Zinc (zinc-950/900/800/700)
- [x] Fix missing dark override: `--flint-stepper-connector-color`
- [x] Fix missing dark override: `--flint-surface-variant`  (was absent from @media block before)
- [x] Fix missing dark override: `--flint-card-border-color`
- [x] Fix missing dark override: `--flint-text-color-subtle`

---

## Component CSS Audit

**Goal per file — two passes:**
- **Pass A — drop stale fallbacks**: `var(--flint-token, #hex)` → `var(--flint-token)` (theme.css is now the single source of truth)
- **Pass B — tokenize bare hex**: any `#hex` not inside a `var()` → map to the correct `--flint-*` token

**619 hardcoded hex occurrences across 118 files** (57 in theme.css itself are intentional — those are the Layer 1 palette primitives).

---

### P1 — Core (highest traffic, fix first)

- [x] `src/button/flint-button.css`
- [x] `src/button/flint-toggle-button.css`
- [x] `src/input/flint-input.css`
- [x] `src/text-field/flint-text-field.css`
- [x] `src/select/flint-select.css`
- [x] `src/card/flint-card.css`
- [x] `src/card/flint-card-header.css`
- [x] `src/card/flint-card-content.css`
- [x] `src/card/flint-card-action-area.css`
- [x] `src/typography/flint-typography.css`
- [x] `src/badge/flint-badge.css`
- [x] `src/chip/flint-chip.css`
- [x] `src/alert/flint-alert.css`
- [x] `src/link/flint-link.css`
- [x] `src/checkbox/flint-checkbox.css`
- [x] `src/radio/flint-radio.css`
- [x] `src/radio/flint-radio-group.css`
- [x] `src/switch/flint-switch.css`

### P2 — Common UI

- [x] `src/dialog/flint-dialog-title.css`
- [x] `src/dialog/flint-dialog-content-text.css`
- [x] `src/dialog/flint-dialog-actions.css`
- [x] `src/tabs/flint-tabs.css`
- [x] `src/tabs/flint-tab-list.css`
- [x] `src/tabs/flint-tab.css`
- [x] `src/tabs/flint-tab-panel.css`
- [x] `src/accordion/flint-accordion.css`
- [x] `src/accordion/flint-accordion-summary.css`
- [x] `src/accordion/flint-accordion-details.css`
- [x] `src/accordion/flint-accordion-actions.css`
- [x] `src/menu/flint-menu.css`
- [x] `src/menu/flint-menu-item.css`
- [x] `src/menu/flint-menu-divider.css`
- [x] `src/menu/flint-menu-group.css`
- [x] `src/list/flint-list-item-button.css`
- [x] `src/list/flint-list-item-text.css`
- [x] `src/list/flint-list-item-icon.css`
- [x] `src/list/flint-list-subheader.css`
- [x] `src/pagination/flint-pagination.css`
- [x] `src/tooltip/flint-tooltip.css`
- [x] `src/snackbar/flint-snackbar.css`
- [x] `src/progress/flint-linear-progress.css`
- [x] `src/progress/flint-circular-progress.css`
- [x] `src/skeleton/flint-skeleton.css`
- [x] `src/avatar/flint-avatar.css`
- [x] `src/divider/flint-divider.css`
- [x] `src/breadcrumbs/flint-breadcrumbs.css`
- [x] `src/kbd/flint-kbd.css`
- [x] `src/paper/flint-paper.css`
- [x] `src/drawer/flint-drawer.css`
- [x] `src/fab/flint-fab.css`
- [x] `src/rating/flint-rating.css`
- [x] `src/app-bar/flint-app-bar.css`
- [x] `src/bottom-navigation/flint-bottom-navigation.css`
- [x] `src/bottom-navigation/flint-bottom-navigation-action.css`

### P3 — Form / Input components

- [x] `src/date-field/flint-date-field.css` (22)
- [x] `src/date-picker/flint-date-picker.css` (21)
- [x] `src/date-picker/flint-date-picker-calendar.css` (17)
- [x] `src/date-range-picker/flint-single-input-date-range-field.css` (21)
- [x] `src/date-range-picker/flint-date-range-picker.css` (25)
- [x] `src/date-range-picker/flint-date-range-calendar.css` (14)
- [x] `src/time-picker/flint-time-field.css` (15)
- [x] `src/time-picker/flint-time-clock.css` (18)
- [x] `src/time-picker/flint-multi-section-digital-clock.css` (6)
- [x] `src/time-picker/flint-digital-clock.css` (2)
- [x] `src/time-picker/flint-static-time-picker.css` (1)
- [x] `src/slider/flint-slider.css` (7)
- [x] `src/flint-range-slider/flint-range-slider.css` (9)
- [x] `src/input-otp/flint-input-otp-slot.css` (7)
- [x] `src/input-otp/flint-input-otp-separator.css` (1)
- [x] `src/autocomplete/flint-autocomplete.css` (12)

### P4 — Data / Complex components

- [x] `src/table/flint-table.css` (1)
- [x] `src/table/flint-table-cell.css` (2)
- [x] `src/table/flint-table-pagination.css` (4)
- [x] `src/table/flint-table-sort-label.css` (2)
- [x] `src/tree-view/flint-tree-item.css` (6)
- [x] `src/tree-view/flint-rich-tree-view.css` (4)
- [x] `src/stepper/flint-stepper.css` (1)
- [x] `src/stepper/flint-step.css` (8)
- [x] `src/stepper/flint-step-label.css` (5)
- [x] `src/stepper/flint-step-connector.css` (2)
- [x] `src/stepper/flint-step-content.css` (1)
- [x] `src/stepper/flint-mobile-stepper.css` (11)
- [x] `src/transfer-list/flint-transfer-list.css` (14)
- [x] `src/menubar/flint-menubar.css` (2)
- [x] `src/menubar/flint-menubar-trigger.css` (2)
- [x] `src/menubar/flint-menubar-content.css` (2)
- [x] `src/menubar/flint-menubar-item.css` (1)
- [x] `src/menubar/flint-menubar-sub-trigger.css` (2)
- [x] `src/menubar/flint-menubar-sub-content.css` (2)
- [x] `src/menubar/flint-menubar-separator.css` (1)
- [x] `src/menubar/flint-menubar-shortcut.css` (1)
- [x] `src/menubar/flint-menubar-group.css` (1)
- [x] `src/menubar/flint-menubar-checkbox-item.css` (1)
- [x] `src/menubar/flint-menubar-radio-item.css` (1)
- [x] `src/command/flint-command.css` (1)
- [x] `src/command/flint-command-input.css` (4)
- [x] `src/command/flint-command-list.css` (1)
- [x] `src/command/flint-command-group.css` (1)
- [x] `src/command/flint-command-item.css` (3)
- [x] `src/command/flint-command-empty.css` (1)
- [x] `src/command/flint-command-separator.css` (1)
- [x] `src/command/flint-command-shortcut.css` (1)
- [x] `src/command/flint-command-dialog.css` (1)

### P5 — Smaller / Structural components

- [x] `src/speed-dial/flint-speed-dial.css` (4)
- [x] `src/speed-dial/flint-speed-dial-action.css` (5)
- [x] `src/image-list/flint-image-list-item-bar.css` (6)
- [x] `src/hover-card/flint-hover-card-content.css` (3)
- [x] `src/carousel/flint-carousel.css` (1)
- [x] `src/item/flint-item.css` (2)
- [x] `src/item/flint-item-title.css` (1)
- [x] `src/item/flint-item-description.css` (1)
- [x] `src/item/flint-item-media.css` (2)
- [x] `src/item/flint-item-footer.css` (2)
- [x] `src/item/flint-item-separator.css` (1)
- [x] `src/empty/flint-empty-title.css` (1)
- [x] `src/empty/flint-empty-description.css` (1)
- [x] `src/empty/flint-empty-media.css` (2)

---

## Token Mapping Reference

Quick lookup when doing Pass B (bare hex → token):

| Hex value | Correct token |
|-----------|---------------|
| `#3b82f6`, `#2563eb`, `#1d4ed8` | `--flint-primary-color`, `--flint-primary-color-hover`, `--flint-primary-color-active` |
| `#ef4444`, `#dc2626`, `#b91c1c` | `--flint-destructive-color`, `--flint-destructive-color-hover`, `--flint-destructive-color-active` |
| `#111827`, `#0f172a` | `--flint-text-color` |
| `#6b7280`, `#71717a` | `--flint-text-color-muted` |
| `#9ca3af`, `#a1a1aa` | `--flint-text-color-subtle` |
| `#374151` (labels) | `--flint-label-color` |
| `#ffffff`, `white` | `--flint-background` or `--flint-surface-1` or `--flint-text-color-on-primary` (context-dependent) |
| `#f3f4f6`, `#f4f4f5`, `#fafafa` | `--flint-surface-2` |
| `#e5e7eb`, `#e4e4e7` | `--flint-border-color` |
| `#d1d5db`, `#d4d4d8` | `--flint-input-border-color` |
| `#9ca3af` (placeholder) | `--flint-input-placeholder-color` |
| `rgba(0,0,0,0.04)` | `--flint-hover-color` |
| `rgba(0,0,0,0.08)` | `--flint-active-color` |

---

## Follow-up / Future

- [x] Add `--flint-accent-color` / `--flint-accent-foreground` tokens if an accent (non-primary tint) is needed
- [x] Consider adding `--flint-border-radius-full` (9999px) for pill shapes
- [x] Document token API in README or Storybook docs page
- [x] Validate WCAG AA contrast ratios for all text/background token pairs in both modes
