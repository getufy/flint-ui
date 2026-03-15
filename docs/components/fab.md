# Fab

<Demo label="Sizes" html='<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-fab size="small">  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></flint-fab><flint-fab>  <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></flint-fab><flint-fab size="large">  <svg slot="icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></flint-fab></div>' />

<Demo label="Extended" html='<flint-fab extended>  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>  Add Item</flint-fab>' />

A floating action button (FAB) represents the primary action of a screen.

- **Tag**: `<flint-fab>`
- **Class**: `FlintFab`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintFab } from '@getufy/flint-ui';
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
