# Fab

<Demo label="Sizes" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><flint-fab size=&quot;small&quot; position=&quot;static&quot;>  <svg slot=&quot;icon&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg></flint-fab><flint-fab position=&quot;static&quot;>  <svg slot=&quot;icon&quot; width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg></flint-fab><flint-fab size=&quot;large&quot; position=&quot;static&quot;>  <svg slot=&quot;icon&quot; width=&quot;28&quot; height=&quot;28&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg></flint-fab></div>" />

<Demo label="Extended" html="<flint-fab extended position=&quot;static&quot;>  <svg slot=&quot;icon&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><line x1=&quot;12&quot; y1=&quot;5&quot; x2=&quot;12&quot; y2=&quot;19&quot;></line><line x1=&quot;5&quot; y1=&quot;12&quot; x2=&quot;19&quot; y2=&quot;12&quot;></line></svg>  Add Item</flint-fab>" />

A floating action button (FAB) represents the primary action of a screen.

- **Tag**: `<flint-fab>`
- **Class**: `FlintFab`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintFab } from 'flint-ui';
```

### Usage

```html
<flint-fab></flint-fab>
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
| `--flint-fab-size` | — |
| `--flint-fab-radius` | — |
| `--flint-fab-background` | — |
| `--flint-fab-color` | — |
| `--flint-fab-shadow` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-shadow-lg` | — |
| `--flint-shadow-xl` | — |
| `--flint-font-family` | — |

---
