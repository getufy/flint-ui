# Sonner

<Demo label="Toast Types" html='<flint-toaster position="bottom-right"></flint-toaster><div style="display:flex;gap:8px;flex-wrap:wrap"><flint-button variant="secondary" onclick="window.__storybook_lit.toast(&#39;Default toast message&#39;)">Default</flint-button><flint-button variant="primary" onclick="window.__storybook_lit.toast.success(&#39;Operation successful!&#39;)">Success</flint-button><flint-button variant="destructive" onclick="window.__storybook_lit.toast.error(&#39;Something went wrong&#39;)">Error</flint-button><flint-button variant="secondary" onclick="window.__storybook_lit.toast.info(&#39;Here is some info&#39;)">Info</flint-button><flint-button variant="secondary" onclick="window.__storybook_lit.toast.warning(&#39;Careful with that!&#39;)">Warning</flint-button></div>' />

Toast container. Place **once** in your application (typically in `<body>`).
Toasts are created imperatively via the `toast()` function.

- **Tag**: `<flint-toaster>`
- **Class**: `FlintToaster`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintToaster } from '@getufy/flint-ui';
```

### Usage

```html
<flint-toaster></flint-toaster>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `position` | `position` | `ToastPosition` | `'bottom-right'` | Position of the toast stack relative to the viewport. |
| `duration` | `duration` | `number` | `4000` | Default auto-dismiss duration in milliseconds. |
| `visibleToasts` | `visible-toasts` | `number` | `3` | Maximum number of toasts visible simultaneously. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-toast-z-index` | — |
| `--flint-toast-width` | — |
| `--flint-toast-gap` | — |
| `--flint-toast-padding` | — |
| `--flint-toast-bg` | — |
| `--flint-toast-color` | — |
| `--flint-toast-border` | — |
| `--flint-toast-radius` | — |
| `--flint-toast-shadow` | — |
| `--flint-toast-stack-gap` | — |
| `--flint-toast-success-icon-color` | — |
| `--flint-toast-error-icon-color` | — |
| `--flint-toast-warning-icon-color` | — |
| `--flint-toast-info-icon-color` | — |
| `--flint-font-family` | — |
| `--flint-text-color-muted` | — |
| `--flint-border-color` | — |
| `--flint-border-radius-md` | — |
| `--flint-hover-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-text-color-subtle` | — |
| `--flint-border-radius-sm` | — |
| `--flint-text-color` | — |

---
