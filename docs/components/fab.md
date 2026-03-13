# Fab

<Demo label="Sizes" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><ui-fab size=&quot;small&quot;>  <svg slot=&quot;icon&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg></ui-fab><ui-fab>  <svg slot=&quot;icon&quot; width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg></ui-fab><ui-fab size=&quot;large&quot;>  <svg slot=&quot;icon&quot; width=&quot;28&quot; height=&quot;28&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg></ui-fab></div>" />

<Demo label="Extended" html="<ui-fab extended>  <svg slot=&quot;icon&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg>  Add Item</ui-fab>" />

A floating action button (FAB) represents the primary action of a screen.

- **Tag**: `<ui-fab>`
- **Class**: `UiFab`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiFab } from 'storybook-lit';
```

### Usage

```html
<ui-fab></ui-fab>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `extended` | `extended` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `label` | `label` | `string` | `'Action'` | Accessible label for icon-only (non-extended) FABs. |
| `position` | `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'static'` | `'bottom-right'` |  |

### Slots

| Name | Description |
| --- | --- |
| `icon` | The icon to display inside the FAB. |
| `(default)` | Default slot for icon content (icon-only FAB). |
| `label` | The label to display in the extended FAB. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-fab-size` | — |
| `--ui-fab-radius` | — |
| `--ui-fab-background` | — |
| `--ui-fab-color` | — |
| `--ui-fab-shadow` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-shadow-lg` | — |
| `--ui-shadow-xl` | — |
| `--ui-font-family` | — |

---
