# Sonner

<Demo label="Toast Types" html="<flint-toaster position=&quot;bottom-right&quot;></flint-toaster><div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-button variant=&quot;secondary&quot; onclick=&quot;window.__storybook_lit.toast('Default toast message')&quot;>Default</flint-button><flint-button variant=&quot;primary&quot; onclick=&quot;window.__storybook_lit.toast.success('Operation successful!')&quot;>Success</flint-button><flint-button variant=&quot;destructive&quot; onclick=&quot;window.__storybook_lit.toast.error('Something went wrong')&quot;>Error</flint-button><flint-button variant=&quot;secondary&quot; onclick=&quot;window.__storybook_lit.toast.info('Here is some info')&quot;>Info</flint-button><flint-button variant=&quot;secondary&quot; onclick=&quot;window.__storybook_lit.toast.warning('Careful with that!')&quot;>Warning</flint-button></div>" />

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
| `--flint-font-family` | `system-ui, sans-serif` |
| `--flint-text-color-muted` | `#4b5563` |
| `--flint-border-color` | `#e4e4e7` |
| `--flint-border-radius-md` | `0.375rem` |
| `--flint-hover-color` | `rgba(0, 0, 0, 0.04` |
| `--flint-primary-focus-ring` | `rgba(59, 130, 246, 0.5` |
| `--flint-text-color-subtle` | `#4b5563` |
| `--flint-border-radius-sm` | `0.125rem` |
| `--flint-text-color` | `#111827` |

---
