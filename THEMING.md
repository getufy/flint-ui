# Theming Guide

Flint UI uses a three-layer CSS custom property system. Override tokens at any layer to customize the look and feel.

## Quick rebrand

Change these 5 variables to make the library yours:

```css
:root {
  --flint-primary-color:        #your-brand;
  --flint-primary-color-hover:  #your-brand-dark;
  --flint-primary-color-active: #your-brand-darker;
  --flint-border-radius-md:     0.375rem;   /* try 0 for sharp, 0.5rem for rounder */
  --flint-font-family:          'Your Font', sans-serif;
}
```

## Three-layer token system

### Layer 1 — Primitive palette

Raw color scales (never override inside theme blocks). Components don't reference these directly.

| Token pattern | Example | Description |
|---|---|---|
| `--flint-color-blue-{50-800}` | `--flint-color-blue-600` | Blue scale |
| `--flint-color-zinc-{50-950}` | `--flint-color-zinc-200` | Neutral surfaces |
| `--flint-color-slate-{50-950}` | `--flint-color-slate-900` | Primary text (cooler) |
| `--flint-color-red-{50-800}` | `--flint-color-red-600` | Red / error scale |
| `--flint-color-emerald-{50-800}` | `--flint-color-emerald-700` | Green / success scale |
| `--flint-color-amber-{50-800}` | `--flint-color-amber-500` | Amber / warning scale |
| `--flint-color-violet-{100-800}` | `--flint-color-violet-600` | Violet / accent scale |
| `--flint-color-white` / `--flint-color-black` | | |

### Layer 2 — Semantic tokens

Components reference only these. Override these to theme.

#### Primary / Accent / Secondary

| Token | Default (light) | Description |
|---|---|---|
| `--flint-primary-color` | `blue-600` | Primary brand color |
| `--flint-primary-color-hover` | `blue-700` | Primary hover state |
| `--flint-primary-color-active` | `blue-800` | Primary active/pressed state |
| `--flint-primary-color-light` | `rgba(37,99,235,0.10)` | Light primary tint (backgrounds) |
| `--flint-primary-color-light-hover` | `rgba(37,99,235,0.18)` | Hovered light primary tint |
| `--flint-primary-focus-ring` | `rgba(37,99,235,0.20)` | Focus ring color |
| `--flint-accent-color` | `violet-600` | Accent (non-primary) tint |
| `--flint-accent-color-hover` | `violet-700` | |
| `--flint-accent-color-light` | `rgba(124,58,237,0.10)` | |
| `--flint-accent-foreground` | `white` | Text on accent backgrounds |
| `--flint-secondary-color` | `zinc-500` | Secondary actions |
| `--flint-secondary-color-hover` | `zinc-600` | |
| `--flint-secondary-color-active` | `zinc-700` | |

#### Destructive / Error / Status

| Token | Default | Description |
|---|---|---|
| `--flint-destructive-color` | `red-600` | Destructive actions |
| `--flint-error-color` | `red-600` | Form error states |
| `--flint-error-focus-ring` | `rgba(239,68,68,0.20)` | Error focus ring |
| `--flint-success-color` | `emerald-700` | Success indicator |
| `--flint-warning-color` | `amber-800` | Warning indicator |

#### Status backgrounds (alerts, banners)

| Token | Description |
|---|---|
| `--flint-info-bg`, `--flint-info-border-color`, `--flint-info-text-color`, `--flint-info-icon-color` | Info alert styling |
| `--flint-success-bg`, `--flint-success-border-color`, `--flint-success-text-color`, `--flint-success-icon-color` | Success alert styling |
| `--flint-warning-bg`, `--flint-warning-border-color`, `--flint-warning-text-color`, `--flint-warning-icon-color` | Warning alert styling |
| `--flint-error-bg`, `--flint-error-border-color`, `--flint-error-text-color`, `--flint-error-icon-color` | Error alert styling |

#### Surfaces

| Token | Default | Description |
|---|---|---|
| `--flint-background` | `white` | Page / app shell background |
| `--flint-surface-1` | `white` | Cards, panels |
| `--flint-surface-2` | `zinc-50` | Inputs, subtle backgrounds |
| `--flint-surface-3` | `zinc-100` | Selected, active backgrounds |
| `--flint-surface-variant` | `slate-50` | Tinted backgrounds (SVG, etc.) |

#### Text

| Token | Default | Description |
|---|---|---|
| `--flint-text-color` | `slate-900` | Primary text |
| `--flint-text-color-muted` | `zinc-600` | Secondary text |
| `--flint-text-color-subtle` | `zinc-500` | Hints, disabled labels |
| `--flint-text-color-on-primary` | `white` | Text on primary-colored backgrounds |

#### Borders

| Token | Default | Description |
|---|---|---|
| `--flint-border-color` | `zinc-200` | General borders |
| `--flint-input-border-color` | `zinc-300` | Input borders |
| `--flint-input-border-hover-color` | `zinc-400` | Input hover borders |
| `--flint-card-border-color` | `zinc-100` | Card borders |

#### Interactive overlays

| Token | Default | Description |
|---|---|---|
| `--flint-hover-color` | `rgba(0,0,0,0.04)` | Hover overlay |
| `--flint-active-color` | `rgba(0,0,0,0.08)` | Active/pressed overlay |
| `--flint-backdrop-color` | `rgba(0,0,0,0.50)` | Dialog/drawer backdrop |

#### Shadows

| Token | Default |
|---|---|
| `--flint-shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` |
| `--flint-shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.10), ...` |
| `--flint-shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.10), ...` |
| `--flint-shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.10), ...` |
| `--flint-card-shadow` | `var(--flint-shadow-lg)` |
| `--flint-card-shadow-hover` | `var(--flint-shadow-xl)` |

#### Border radii

| Token | Default | |
|---|---|---|
| `--flint-border-radius-sm` | `0.125rem` | 2px |
| `--flint-border-radius-md` | `0.375rem` | 6px |
| `--flint-border-radius-lg` | `0.500rem` | 8px |
| `--flint-border-radius-xl` | `0.750rem` | 12px |
| `--flint-border-radius-full` | `9999px` | pill / circle |
| `--flint-card-border-radius` | `var(--flint-border-radius-xl)` | |
| `--flint-input-border-radius` | `var(--flint-border-radius-md)` | |

#### Typography

| Token | Default |
|---|---|
| `--flint-font-family` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', ...` |

#### Breakpoints (unitless px, for JS)

| Token | Default |
|---|---|
| `--flint-breakpoint-xs` | `0` |
| `--flint-breakpoint-sm` | `600` |
| `--flint-breakpoint-md` | `900` |
| `--flint-breakpoint-lg` | `1200` |
| `--flint-breakpoint-xl` | `1536` |

#### Container max-widths

| Token | Default |
|---|---|
| `--flint-container-xs` | `444px` |
| `--flint-container-sm` | `601px` |
| `--flint-container-md` | `901px` |
| `--flint-container-lg` | `1201px` |
| `--flint-container-xl` | `1537px` |

### Layer 2 — Component-specific tokens

These provide fine-grained control over individual components.

<details>
<summary>Tabs</summary>

| Token | Default |
|---|---|
| `--flint-tab-inactive-color` | `var(--flint-text-color-muted)` |
| `--flint-tab-active-color` | `var(--flint-primary-color)` |
| `--flint-tab-indicator-color` | `var(--flint-primary-color)` |
| `--flint-tab-indicator-height` | `3px` |
| `--flint-tab-min-height` | `48px` |
| `--flint-tab-padding-x` | `16px` |
| `--flint-tab-font-size` | `0.875rem` |
| `--flint-tab-font-weight` | `500` |
| `--flint-tab-font-weight-active` | `600` |
| `--flint-tab-panel-padding` | `24px` |
| `--flint-tab-hover-bg` | `var(--flint-primary-color-light)` |
</details>

<details>
<summary>Checkbox / Radio</summary>

| Token | Default |
|---|---|
| `--flint-checkbox-size` | `18px` |
| `--flint-checkbox-size-sm` / `lg` | `14px` / `22px` |
| `--flint-checkbox-border-radius` | `var(--flint-border-radius-sm)` |
| `--flint-radio-size` | `18px` |
| `--flint-radio-dot-size` | `8px` |
| `--flint-radio-group-gap` | `8px` |
</details>

<details>
<summary>Input / Textarea</summary>

| Token | Default |
|---|---|
| `--flint-label-color` | `zinc-700` |
| `--flint-input-placeholder-color` | `zinc-500` |
| `--flint-input-disabled-bg` | `zinc-100` |
| `--flint-input-readonly-bg` | `zinc-50` |
| `--flint-help-text-color` | `var(--flint-text-color-muted)` |
| `--flint-textarea-min-height` | `80px` |
</details>

<details>
<summary>Chip</summary>

| Token | Default |
|---|---|
| `--flint-chip-height` | `32px` |
| `--flint-chip-height-sm` / `lg` | `24px` / `40px` |
| `--flint-chip-border-radius` | `16px` |
| `--flint-chip-font-size` | `0.875rem` |
| `--flint-chip-padding-x` | `12px` |
</details>

<details>
<summary>Carousel</summary>

| Token | Default |
|---|---|
| `--flint-carousel-gap` | `0px` |
| `--flint-carousel-height` | `320px` |
| `--flint-carousel-duration` | `0.35s` |
| `--flint-carousel-nav-button-size` | `36px` |
</details>

<details>
<summary>Drawer</summary>

| Token | Default |
|---|---|
| `--flint-drawer-width` | `250px` |
| `--flint-drawer-mini-width` | `72px` |
| `--flint-drawer-bg` | `var(--flint-surface-1)` |
| `--flint-drawer-z-index` | `1200` |
</details>

<details>
<summary>Tooltip</summary>

| Token | Default |
|---|---|
| `--flint-tooltip-bg` | `rgba(15,23,42,0.88)` |
| `--flint-tooltip-text-color` | `white` |
| `--flint-tooltip-max-width` | `300px` |
</details>

<details>
<summary>Other components</summary>

See the full list in [`packages/core/src/theme.css`](./packages/core/src/theme.css). Each component section is clearly labeled with comments.
</details>

### Layer 3 — Dark mode overrides

Applied when `<html class="flint-theme-dark">`, `<html data-theme="dark">`, or via `@media (prefers-color-scheme: dark)`.

Import the dark theme CSS:

```ts
import '@getufy/flint-ui/theme.css';
import '@getufy/flint-ui/theme-dark.css';
```

Activate programmatically:

```ts
import { setFlintTheme } from '@getufy/flint-ui/utilities/theme';

setFlintTheme('dark');    // activate dark mode
setFlintTheme('light');   // force light mode
setFlintTheme('auto');    // follow system preference
```

Or manually:

```ts
document.documentElement.classList.add('flint-theme-dark');
// or
document.documentElement.setAttribute('data-theme', 'dark');
```

To opt out of automatic `prefers-color-scheme` detection, add `class="flint-theme-light"` or `data-theme="light"`.

## Preset palettes

Six built-in color palettes are available as single CSS imports:

| Palette | Import |
|---|---|
| Teal | `import '@getufy/flint-ui/theme-teal.css'` |
| Violet | `import '@getufy/flint-ui/theme-violet.css'` |
| Rose | `import '@getufy/flint-ui/theme-rose.css'` |
| Amber | `import '@getufy/flint-ui/theme-amber.css'` |
| Emerald | `import '@getufy/flint-ui/theme-emerald.css'` |
| Slate | `import '@getufy/flint-ui/theme-slate.css'` |

Apply via class (`.flint-theme-teal`) or switch at runtime:

```ts
import { setFlintTheme } from '@getufy/flint-ui/utilities/theme';

setFlintTheme('dark', 'rose');  // dark mode + rose palette
setFlintTheme('teal');          // teal palette, keep current mode
```

## `::part()` styling

High-use components expose shadow DOM parts for direct CSS targeting:

```css
flint-button::part(base) {
  text-transform: uppercase;
}

flint-input::part(input) {
  font-family: monospace;
}

flint-dialog::part(panel) {
  max-width: 600px;
}
```

See each component's documentation for the list of available parts.
