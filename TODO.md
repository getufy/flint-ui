# Theme CSS — Color Palette Refactor

## Status Legend
- [ ] todo
- [x] done
- [-] skipped / not applicable

---

## theme.css Changes

- [x] Add quick-rebrand comment block (5 variables to restyle the library)
- [x] Add Layer 1: primitive palette (blue, zinc, slate, red, emerald, amber scales)
- [x] Refactor Layer 2 semantic tokens to reference primitives via `var(--ui-color-*)`
- [x] Add new surface elevation tokens: `--ui-surface-1`, `--ui-surface-2`, `--ui-surface-3`, `--ui-background`
- [x] Add `--ui-text-color-subtle` (subtler than muted, for hints/disabled)
- [x] Add `--ui-muted-background` (for muted variant backgrounds)
- [x] Keep backward-compat aliases: `--ui-surface-background`, `--ui-surface-background-flat`, `--ui-card-background`, `--ui-card-background-flat`, `--ui-input-bg`
- [x] Add dark mode value cache (`--_dark-*` private vars) — define all dark values ONCE in `:root`
- [x] Dark mode class block (`.dark`, `[data-theme="dark"]`) references cache vars — no hardcoded values
- [x] Dark mode media block (`@media prefers-color-scheme: dark`) references the same cache vars
- [x] Switch dark surfaces from Tailwind Gray → Zinc (zinc-950/900/800/700)
- [x] Fix missing dark override: `--ui-stepper-connector-color`
- [x] Fix missing dark override: `--ui-surface-variant`  (was absent from @media block before)
- [x] Fix missing dark override: `--ui-card-border-color`
- [x] Fix missing dark override: `--ui-text-color-subtle`

---

## Component CSS Audit

**Goal per file — two passes:**
- **Pass A — drop stale fallbacks**: `var(--ui-token, #hex)` → `var(--ui-token)` (theme.css is now the single source of truth)
- **Pass B — tokenize bare hex**: any `#hex` not inside a `var()` → map to the correct `--ui-*` token

**619 hardcoded hex occurrences across 118 files** (57 in theme.css itself are intentional — those are the Layer 1 palette primitives).

---

### P1 — Core (highest traffic, fix first)

- [x] `src/button/ui-button.css`
- [x] `src/button/ui-toggle-button.css`
- [x] `src/input/ui-input.css`
- [x] `src/text-field/ui-text-field.css`
- [x] `src/select/ui-select.css`
- [x] `src/card/ui-card.css`
- [x] `src/card/ui-card-header.css`
- [x] `src/card/ui-card-content.css`
- [x] `src/card/ui-card-action-area.css`
- [x] `src/typography/ui-typography.css`
- [x] `src/badge/ui-badge.css`
- [x] `src/chip/ui-chip.css`
- [x] `src/alert/ui-alert.css`
- [x] `src/link/ui-link.css`
- [x] `src/checkbox/ui-checkbox.css`
- [x] `src/radio/ui-radio.css`
- [x] `src/radio/ui-radio-group.css`
- [x] `src/switch/ui-switch.css`

### P2 — Common UI

- [x] `src/dialog/ui-dialog-title.css`
- [x] `src/dialog/ui-dialog-content-text.css`
- [x] `src/dialog/ui-dialog-actions.css`
- [x] `src/tabs/ui-tabs.css`
- [x] `src/tabs/ui-tab-list.css`
- [x] `src/tabs/ui-tab.css`
- [x] `src/tabs/ui-tab-panel.css`
- [x] `src/accordion/ui-accordion.css`
- [x] `src/accordion/ui-accordion-summary.css`
- [x] `src/accordion/ui-accordion-details.css`
- [x] `src/accordion/ui-accordion-actions.css`
- [x] `src/menu/ui-menu.css`
- [x] `src/menu/ui-menu-item.css`
- [x] `src/menu/ui-menu-divider.css`
- [x] `src/menu/ui-menu-group.css`
- [x] `src/list/ui-list-item-button.css`
- [x] `src/list/ui-list-item-text.css`
- [x] `src/list/ui-list-item-icon.css`
- [x] `src/list/ui-list-subheader.css`
- [x] `src/pagination/ui-pagination.css`
- [x] `src/tooltip/ui-tooltip.css`
- [x] `src/snackbar/ui-snackbar.css`
- [x] `src/progress/ui-linear-progress.css`
- [x] `src/progress/ui-circular-progress.css`
- [x] `src/skeleton/ui-skeleton.css`
- [x] `src/avatar/ui-avatar.css`
- [x] `src/divider/ui-divider.css`
- [x] `src/breadcrumbs/ui-breadcrumbs.css`
- [x] `src/kbd/ui-kbd.css`
- [x] `src/paper/ui-paper.css`
- [x] `src/drawer/ui-drawer.css`
- [x] `src/fab/ui-fab.css`
- [x] `src/rating/ui-rating.css`
- [x] `src/app-bar/ui-app-bar.css`
- [x] `src/bottom-navigation/ui-bottom-navigation.css`
- [x] `src/bottom-navigation/ui-bottom-navigation-action.css`

### P3 — Form / Input components

- [x] `src/date-field/ui-date-field.css` (22)
- [x] `src/date-picker/ui-date-picker.css` (21)
- [x] `src/date-picker/ui-date-picker-calendar.css` (17)
- [x] `src/date-range-picker/ui-single-input-date-range-field.css` (21)
- [x] `src/date-range-picker/ui-date-range-picker.css` (25)
- [x] `src/date-range-picker/ui-date-range-calendar.css` (14)
- [x] `src/time-picker/ui-time-field.css` (15)
- [x] `src/time-picker/ui-time-clock.css` (18)
- [x] `src/time-picker/ui-multi-section-digital-clock.css` (6)
- [x] `src/time-picker/ui-digital-clock.css` (2)
- [x] `src/time-picker/ui-static-time-picker.css` (1)
- [x] `src/slider/ui-slider.css` (7)
- [x] `src/ui-range-slider/ui-range-slider.css` (9)
- [x] `src/input-otp/ui-input-otp-slot.css` (7)
- [x] `src/input-otp/ui-input-otp-separator.css` (1)
- [x] `src/autocomplete/ui-autocomplete.css` (12)

### P4 — Data / Complex components

- [x] `src/table/ui-table.css` (1)
- [x] `src/table/ui-table-cell.css` (2)
- [x] `src/table/ui-table-pagination.css` (4)
- [x] `src/table/ui-table-sort-label.css` (2)
- [x] `src/tree-view/ui-tree-item.css` (6)
- [x] `src/tree-view/ui-rich-tree-view.css` (4)
- [x] `src/stepper/ui-stepper.css` (1)
- [x] `src/stepper/ui-step.css` (8)
- [x] `src/stepper/ui-step-label.css` (5)
- [x] `src/stepper/ui-step-connector.css` (2)
- [x] `src/stepper/ui-step-content.css` (1)
- [x] `src/stepper/ui-mobile-stepper.css` (11)
- [x] `src/transfer-list/ui-transfer-list.css` (14)
- [x] `src/menubar/ui-menubar.css` (2)
- [x] `src/menubar/ui-menubar-trigger.css` (2)
- [x] `src/menubar/ui-menubar-content.css` (2)
- [x] `src/menubar/ui-menubar-item.css` (1)
- [x] `src/menubar/ui-menubar-sub-trigger.css` (2)
- [x] `src/menubar/ui-menubar-sub-content.css` (2)
- [x] `src/menubar/ui-menubar-separator.css` (1)
- [x] `src/menubar/ui-menubar-shortcut.css` (1)
- [x] `src/menubar/ui-menubar-group.css` (1)
- [x] `src/menubar/ui-menubar-checkbox-item.css` (1)
- [x] `src/menubar/ui-menubar-radio-item.css` (1)
- [x] `src/command/ui-command.css` (1)
- [x] `src/command/ui-command-input.css` (4)
- [x] `src/command/ui-command-list.css` (1)
- [x] `src/command/ui-command-group.css` (1)
- [x] `src/command/ui-command-item.css` (3)
- [x] `src/command/ui-command-empty.css` (1)
- [x] `src/command/ui-command-separator.css` (1)
- [x] `src/command/ui-command-shortcut.css` (1)
- [x] `src/command/ui-command-dialog.css` (1)

### P5 — Smaller / Structural components

- [x] `src/speed-dial/ui-speed-dial.css` (4)
- [x] `src/speed-dial/ui-speed-dial-action.css` (5)
- [x] `src/image-list/ui-image-list-item-bar.css` (6)
- [x] `src/hover-card/ui-hover-card-content.css` (3)
- [x] `src/carousel/ui-carousel.css` (1)
- [x] `src/item/ui-item.css` (2)
- [x] `src/item/ui-item-title.css` (1)
- [x] `src/item/ui-item-description.css` (1)
- [x] `src/item/ui-item-media.css` (2)
- [x] `src/item/ui-item-footer.css` (2)
- [x] `src/item/ui-item-separator.css` (1)
- [x] `src/empty/ui-empty-title.css` (1)
- [x] `src/empty/ui-empty-description.css` (1)
- [x] `src/empty/ui-empty-media.css` (2)

---

## Token Mapping Reference

Quick lookup when doing Pass B (bare hex → token):

| Hex value | Correct token |
|-----------|---------------|
| `#3b82f6`, `#2563eb`, `#1d4ed8` | `--ui-primary-color`, `--ui-primary-color-hover`, `--ui-primary-color-active` |
| `#ef4444`, `#dc2626`, `#b91c1c` | `--ui-destructive-color`, `--ui-destructive-color-hover`, `--ui-destructive-color-active` |
| `#111827`, `#0f172a` | `--ui-text-color` |
| `#6b7280`, `#71717a` | `--ui-text-color-muted` |
| `#9ca3af`, `#a1a1aa` | `--ui-text-color-subtle` |
| `#374151` (labels) | `--ui-label-color` |
| `#ffffff`, `white` | `--ui-background` or `--ui-surface-1` or `--ui-text-color-on-primary` (context-dependent) |
| `#f3f4f6`, `#f4f4f5`, `#fafafa` | `--ui-surface-2` |
| `#e5e7eb`, `#e4e4e7` | `--ui-border-color` |
| `#d1d5db`, `#d4d4d8` | `--ui-input-border-color` |
| `#9ca3af` (placeholder) | `--ui-input-placeholder-color` |
| `rgba(0,0,0,0.04)` | `--ui-hover-color` |
| `rgba(0,0,0,0.08)` | `--ui-active-color` |

---

## Follow-up / Future

- [x] Add `--ui-accent-color` / `--ui-accent-foreground` tokens if an accent (non-primary tint) is needed
- [x] Consider adding `--ui-border-radius-full` (9999px) for pill shapes
- [x] Document token API in README or Storybook docs page
- [x] Validate WCAG AA contrast ratios for all text/background token pairs in both modes
