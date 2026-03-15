# Snackbar

<Demo label="Basic" html="<flint-button onclick=&quot;this.nextElementSibling.open=true&quot;>Show Snackbar</flint-button><flint-snackbar message=&quot;This is a snackbar message&quot; auto-hide-duration=&quot;3000&quot;></flint-snackbar>" />

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
| `defaultOpen` | `default-open` | `boolean` | `false` | Initial open state for uncontrolled usage. Has no effect after the element has connected to the DOM. |
| `message` | `message` | `string` | `''` | The message to display (slot fallback). |
| `autoHideDuration` | `auto-hide-duration` | `number` | `5000` | Duration in milliseconds before the snackbar auto-closes. Set to 0 to disable auto-close. |
| `anchorOrigin` | `anchor-origin` | `'top-left' \| 'top-center' \| 'top-right' \|         'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-center'` | Position of the snackbar. Format: 'vertical-horizontal' e.g. 'bottom-center', 'top-right' |
| `pauseOnHover` | `pause-on-hover` | `boolean` | `true` | Pause the auto-hide timer while the user hovers over the snackbar. |
| `closable` | `closable` | `boolean` | `false` | Show a dismiss (✕) button. |
| `variant` | `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Visual style variant. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-snackbar-open` | `{ open: true }` |  |
| `flint-snackbar-close` | `{ open: false }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `action` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-snackbar-z-index` | `1400` |
| `--flint-snackbar-offset` | `24px` |
| `--flint-snackbar-bg` | `#313131` |
| `--flint-snackbar-color` | `#ffffff` |
| `--flint-snackbar-min-width` | `288px` |
| `--flint-snackbar-max-width` | `560px` |
| `--flint-snackbar-bg-info` | `#0288d1` |
| `--flint-snackbar-bg-success` | `#2e7d32` |
| `--flint-snackbar-bg-warning` | `#ed6c02` |
| `--flint-snackbar-bg-error` | `#d32f2f` |
| `--flint-font-family` | — |
| `--flint-border-radius-md` | — |
| `--flint-shadow-lg` | — |

### Methods

| Method | Description |
| --- | --- |
| `close()` | Closes the snackbar. |

---
