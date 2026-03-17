# Styling Components

Flint UI components use shadow DOM for style encapsulation. This means global CSS and inline `style` attributes on the host element cannot reach internal elements. There are three ways to customize component appearance.

## CSS Custom Properties

CSS custom properties (variables) pierce shadow DOM boundaries. Every Flint component documents its available custom properties.

```css
/* Global theme override */
:root {
  --flint-primary-color: #8b5cf6;
  --flint-border-radius-md: 8px;
}

/* Scoped to a single component */
flint-button {
  --flint-button-height: 48px;
}
```

See [Theming](/theming) for the full list of global tokens.

## CSS `::part()` Selectors

Most Flint components expose CSS parts via the `::part()` pseudo-element, giving you full CSS access to specific internal elements.

```css
/* Round all buttons */
flint-button::part(base) {
  border-radius: 9999px;
}

/* Style the input inside a text field */
flint-text-field::part(input) {
  font-family: monospace;
}

/* Target a specific instance */
flint-chip.custom::part(base) {
  background: var(--flint-primary-color);
  color: white;
}
```

Each component's documentation page lists its available part names. 93 of 102 components expose at least one part.

::: tip
`::part()` selectors have the same specificity as a pseudo-element (e.g. `::before`). They can be combined with classes and attributes on the host element for scoped overrides.
:::

## Why Inline Styles Don't Reach Shadow DOM

Setting styles directly on a web component's host element only affects the host — it cannot reach elements inside the shadow DOM. For example:

```html
<!-- ❌ This sets background on the host, not the internal chip element -->
<flint-chip style="background: red">Custom</flint-chip>

<!-- ✅ Use a CSS custom property -->
<flint-chip style="--flint-chip-bg: red">Custom</flint-chip>

<!-- ✅ Or use ::part() in a stylesheet -->
<style>
  flint-chip.red::part(base) { background: red; color: white; }
</style>
<flint-chip class="red">Custom</flint-chip>
```

## Quick Recipe: Custom Colored Chip

```css
/* Using CSS custom properties */
flint-chip.info {
  --flint-chip-bg: #dbeafe;
  --flint-chip-color: #1e40af;
}

/* Or using ::part() for full control */
flint-chip.info::part(base) {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}
```

```html
<flint-chip class="info">Information</flint-chip>
```

## React

In React, use the wrapper's `style` prop for CSS custom properties and a regular CSS file or CSS-in-JS for `::part()` selectors:

```tsx
// CSS custom properties work via style prop
<FlintChip
  style={{'--flint-chip-bg': '#dbeafe'} as React.CSSProperties}
>
  Info
</FlintChip>
```

```css
/* ::part() in a CSS file */
flint-chip.info::part(base) {
  background: #dbeafe;
  color: #1e40af;
}
```
