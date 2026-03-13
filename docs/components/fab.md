# Fab

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
