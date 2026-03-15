# Snackbar

<Demo label="Basic" html='<flint-button onclick="this.nextElementSibling.open=true">Show Snackbar</flint-button><flint-snackbar message="This is a snackbar message" auto-hide-duration="3000"></flint-snackbar>' />

Snackbars (also known as toasts) are used for brief notifications.
They appear temporarily and float above the UI.

- **Tag**: `<flint-snackbar>`
- **Class**: `FlintSnackbar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSnackbar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-snackbar></flint-snackbar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the snackbar is open. |
| `defaultOpen` | `default-open` | `boolean` | `false` | Initial open state for uncontrolled usage. |
| `message` | `message` | `string` | `''` | The message to display (slot fallback). |
| `autoHideDuration` | `auto-hide-duration` | `number` | `5000` | Duration in milliseconds before the snackbar auto-closes. |
| `anchorOrigin` | `anchor-origin` | `'top-left' \| 'top-center' \| 'top-right' \|         'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-center'` | Position of the snackbar. |
| `pauseOnHover` | `pause-on-hover` | `boolean` | `true` | Pause the auto-hide timer while the user hovers over the snackbar. |
| `closable` | `closable` | `boolean` | `false` | Show a dismiss (✕) button. |
| `variant` | `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Visual style variant. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-snackbar-open` | `&#123; open: true &#125;` | Fired when the snackbar opens (bubbles, composed). detail: `&#123; open: true &#125;` |
| `flint-snackbar-close` | `&#123; open: false &#125;` | Fired when the snackbar closes (bubbles, composed). detail: `&#123; open: false &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `action` | The action to display inside the snackbar. |
| `(default)` | Optional content to display inside the snackbar, such as a message or a flint-alert. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-snackbar-min-width` | — |
| `--flint-snackbar-max-width` | — |
| `--flint-snackbar-bg` | — |
| `--flint-snackbar-color` | — |
| `--flint-snackbar-z-index` | — |
| `--flint-snackbar-offset` | — |
| `--flint-snackbar-bg-info` | — |
| `--flint-snackbar-bg-success` | — |
| `--flint-snackbar-bg-warning` | — |
| `--flint-snackbar-bg-error` | — |
| `--flint-font-family` | — |
| `--flint-border-radius-md` | — |
| `--flint-shadow-lg` | — |

### Methods

| Method | Description |
| --- | --- |
| `close(): void` | Closes the snackbar. |

---
