# Snackbar

- **Tag**: `<ui-snackbar>`
- **Class**: `UiSnackbar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSnackbar } from 'storybook-lit';
```

### Usage

```html
<ui-snackbar></ui-snackbar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the snackbar is open. |
| `message` | `message` | `string` | `''` | The message to display (slot fallback). |
| `autoHideDuration` | `auto-hide-duration` | `number` | `5000` |  |
| `anchorOrigin` | `anchor-origin` | `'top-left' \| 'top-center' \| 'top-right' \|         'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-center'` |  |
| `pauseOnHover` | `pause-on-hover` | `boolean` | `true` | Pause the auto-hide timer while the user hovers over the snackbar. |
| `closable` | `closable` | `boolean` | `false` | Show a dismiss (✕) button. |
| `variant` | `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Visual style variant. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-snackbar-open` | — |  |
| `ui-snackbar-close` | — |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `action` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-snackbar-z-index` | `1400` |
| `--ui-snackbar-offset` | `24px` |
| `--ui-snackbar-bg` | `#313131` |
| `--ui-snackbar-color` | `#ffffff` |
| `--ui-snackbar-min-width` | `288px` |
| `--ui-snackbar-max-width` | `560px` |
| `--ui-snackbar-bg-info` | `#0288d1` |
| `--ui-snackbar-bg-success` | `#2e7d32` |
| `--ui-snackbar-bg-warning` | `#ed6c02` |
| `--ui-snackbar-bg-error` | `#d32f2f` |
| `--ui-font-family` | — |
| `--ui-border-radius-md` | — |
| `--ui-shadow-lg` | — |

### Methods

| Method | Description |
| --- | --- |
| `close()` | Closes the snackbar. |

---
