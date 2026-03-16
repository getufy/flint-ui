# Theming

Flint UI is themed entirely through CSS custom properties (CSS variables). Every token uses the `--flint-*` prefix. You can override any token at the `:root` level, scope overrides to a section of the page, or target individual component instances.

## Quick Rebrand

Change these five variables to make the library yours. Everything else cascades from them automatically.

```css
:root {
  --flint-primary-color:        #your-brand;
  --flint-primary-color-hover:  #your-brand-dark;
  --flint-primary-color-active: #your-brand-darker;
  --flint-border-radius-md:     0.375rem; /* try 0 for sharp, 0.5rem for rounder */
  --flint-font-family:          'Your Font', sans-serif;
}
```

## Global Tokens

The theme system is organized in three layers.

### Layer 1 -- Primitive Palette

Raw color scales. Components never reference these directly; they feed into the semantic tokens in Layer 2. You should rarely need to override these.

| Scale | Example tokens |
|-------|---------------|
| Blue | `--flint-color-blue-50` through `--flint-color-blue-800` |
| Zinc | `--flint-color-zinc-50` through `--flint-color-zinc-950` |
| Slate | `--flint-color-slate-50`, `--flint-color-slate-900`, `--flint-color-slate-950` |
| Red | `--flint-color-red-50` through `--flint-color-red-800` |
| Emerald | `--flint-color-emerald-50` through `--flint-color-emerald-800` |
| Amber | `--flint-color-amber-50` through `--flint-color-amber-800` |
| Violet | `--flint-color-violet-100` through `--flint-color-violet-800` |
| White / Black | `--flint-color-white`, `--flint-color-black` |

### Layer 2 -- Semantic Tokens

These are the tokens components actually use. Override these to theme.

#### Primary, Accent, Secondary

| Token | Default (light) | Purpose |
|-------|-----------------|---------|
| `--flint-primary-color` | `#3b82f6` (blue-500) | Main brand color |
| `--flint-primary-color-hover` | `#2563eb` (blue-600) | Primary hover state |
| `--flint-primary-color-active` | `#1d4ed8` (blue-700) | Primary active/pressed state |
| `--flint-primary-color-light` | `rgba(59,130,246,0.10)` | Light primary tint for backgrounds |
| `--flint-primary-focus-ring` | `rgba(59,130,246,0.20)` | Focus ring color |
| `--flint-accent-color` | `#7c3aed` (violet-600) | Non-primary accent |
| `--flint-secondary-color` | `#71717a` (zinc-500) | Secondary / neutral actions |

#### Destructive and Status

| Token | Default | Purpose |
|-------|---------|---------|
| `--flint-destructive-color` | `#ef4444` (red-500) | Destructive actions |
| `--flint-error-color` | `#ef4444` (red-500) | Error state |
| `--flint-success-color` | `#10b981` (emerald-500) | Success state |
| `--flint-warning-color` | `#f59e0b` (amber-500) | Warning state |

Each status also has `--flint-{status}-bg`, `--flint-{status}-border-color`, `--flint-{status}-text-color`, and `--flint-{status}-icon-color` tokens.

#### Surfaces

Elevation layers from lowest to highest: `background < surface-1 < surface-2 < surface-3`.

| Token | Default (light) | Purpose |
|-------|-----------------|---------|
| `--flint-background` | `#ffffff` | Page / app shell background |
| `--flint-surface-1` | `#ffffff` | Cards, panels |
| `--flint-surface-2` | `#fafafa` (zinc-50) | Inputs, subtle backgrounds |
| `--flint-surface-3` | `#f4f4f5` (zinc-100) | Selected, active backgrounds |
| `--flint-surface-variant` | `#f8fafc` (slate-50) | Tinted backgrounds |

#### Text

| Token | Default (light) | Purpose |
|-------|-----------------|---------|
| `--flint-text-color` | `#0f172a` (slate-900) | Primary text |
| `--flint-text-color-muted` | `#71717a` (zinc-500) | Secondary / helper text |
| `--flint-text-color-subtle` | `#a1a1aa` (zinc-400) | Hints, disabled labels |
| `--flint-text-color-on-primary` | `#ffffff` | Text on primary-color backgrounds |

#### Borders

| Token | Default (light) | Purpose |
|-------|-----------------|---------|
| `--flint-border-color` | zinc-200 | General borders |
| `--flint-input-border-color` | zinc-300 | Input borders |
| `--flint-input-border-hover-color` | zinc-400 | Input border on hover |
| `--flint-card-border-color` | zinc-100 | Card borders |

#### Shadows

| Token | Value |
|-------|-------|
| `--flint-shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` |
| `--flint-shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.10), ...` |
| `--flint-shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.10), ...` |
| `--flint-shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.10), ...` |

#### Border Radii

| Token | Value |
|-------|-------|
| `--flint-border-radius-sm` | `0.125rem` (2px) |
| `--flint-border-radius-md` | `0.375rem` (6px) |
| `--flint-border-radius-lg` | `0.500rem` (8px) |
| `--flint-border-radius-xl` | `0.750rem` (12px) |
| `--flint-border-radius-full` | `9999px` (pill / circle) |

#### Typography

| Token | Default |
|-------|---------|
| `--flint-font-family` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` |

#### Interactive Overlays

| Token | Default (light) | Purpose |
|-------|-----------------|---------|
| `--flint-hover-color` | `rgba(0,0,0,0.04)` | Generic hover overlay |
| `--flint-active-color` | `rgba(0,0,0,0.08)` | Generic active/pressed overlay |
| `--flint-backdrop-color` | `rgba(0,0,0,0.50)` | Modal/drawer backdrop |

## Usage

### Global override at `:root`

Set variables on `:root` to apply across the entire page.

```css
:root {
  --flint-primary-color: #16a34a;
  --flint-primary-color-hover: #15803d;
  --flint-primary-color-active: #166534;
  --flint-font-family: 'Poppins', sans-serif;
  --flint-border-radius-md: 0.5rem;
}
```

### Scoped to a section

Wrap a section of the page in a container and override tokens there. All Flint components inside will pick up the overrides.

```html
<div class="admin-panel">
  <flint-button>Admin Action</flint-button>
</div>

<style>
  .admin-panel {
    --flint-primary-color: #9333ea;
    --flint-primary-color-hover: #7e22ce;
  }
</style>
```

### Per-component instance

Override tokens directly on a component using inline styles or a class.

```html
<flint-button style="--flint-primary-color: #dc2626;">
  Delete
</flint-button>
```

## Examples

### Dark Theme

Flint UI ships with a built-in dark mode. Add the `flint-theme-dark` class to the `<html>` element to activate it:

```html
<html class="flint-theme-dark">
```

The dark mode overrides all semantic tokens (surfaces, text, borders, overlays) automatically. Key changes include:

- Surfaces shift to zinc-800 through zinc-950
- Text becomes zinc-50 (light on dark)
- Borders shift to zinc-600/700
- Primary color lightens to blue-400 for better contrast on dark backgrounds
- Overlays use white alpha instead of black alpha

To toggle dark mode with JavaScript:

```js
function toggleDarkMode() {
  document.documentElement.classList.toggle('flint-theme-dark');
}
```

To follow the system preference:

```js
const mq = window.matchMedia('(prefers-color-scheme: dark)');
mq.addEventListener('change', (e) => {
  document.documentElement.classList.toggle('flint-theme-dark', e.matches);
});
// Apply on load
document.documentElement.classList.toggle('flint-theme-dark', mq.matches);
```

### Dark Mode Best Practices: Avoid Hardcoded Fallbacks

When writing custom CSS that references `--flint-*` tokens, do not provide hardcoded color fallbacks in `var()`. In dark-mode-aware UIs, hardcoded fallbacks can flash or persist when the CSS variable resolution is delayed (e.g., the dark theme stylesheet loads after initial paint, or a class toggle is applied asynchronously). The fallback value is a light-mode color that has no awareness of the current theme.

**Bad -- hardcoded fallback defeats dark mode:**

```css
/* The #f5f5f5 fallback is a light gray that will show in dark mode
   if --flint-surface-2 hasn't resolved yet */
.my-card {
  background: var(--flint-surface-2, #f5f5f5);
  color: var(--flint-text-color, #111827);
}
```

**Good -- no fallback; let the theme system handle it:**

```css
.my-card {
  background: var(--flint-surface-2);
  color: var(--flint-text-color);
}
```

The same applies to inline styles and component CSS:

```css
/* Bad -- hardcoded white ignores the active theme */
.label { color: #fff; }

/* Good -- uses the semantic token, works in both light and dark */
.label { color: var(--flint-text-color-on-primary); }
```

Flint UI's theme stylesheets (`theme.css` and `theme-dark.css`) define every semantic token for both light and dark modes. As long as you import both stylesheets, every `var(--flint-*)` reference will resolve correctly without a fallback.

### Custom Brand Colors

Here is an example that rebrands the entire library to use a green primary color and rounded corners:

```css
:root {
  /* Primary */
  --flint-primary-color: #16a34a;
  --flint-primary-color-hover: #15803d;
  --flint-primary-color-active: #166534;
  --flint-primary-color-light: rgba(22, 163, 74, 0.10);
  --flint-primary-color-light-hover: rgba(22, 163, 74, 0.18);
  --flint-primary-focus-ring: rgba(22, 163, 74, 0.20);

  /* Rounder corners */
  --flint-border-radius-sm: 0.25rem;
  --flint-border-radius-md: 0.5rem;
  --flint-border-radius-lg: 0.75rem;
  --flint-border-radius-xl: 1rem;

  /* Custom font */
  --flint-font-family: 'DM Sans', sans-serif;
}
```

For a fully sharp (no border radius) look:

```css
:root {
  --flint-border-radius-sm: 0;
  --flint-border-radius-md: 0;
  --flint-border-radius-lg: 0;
  --flint-border-radius-xl: 0;
  --flint-border-radius-full: 0;
}
```

## Component-Level Customization

Many components expose their own `--flint-*` custom properties for fine-grained control. For example, the Tabs component exposes tokens like `--flint-tab-indicator-color`, `--flint-tab-font-size`, and `--flint-tab-padding-x`.

These component-specific tokens are documented on each component's individual documentation page. Check the component page for the full list of available properties and their defaults.

The full set of component-specific tokens can also be found in the `theme.css` source file under `packages/core/src/theme.css`.
