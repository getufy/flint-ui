# Sonner

<Demo label="Toast Types" html="<flint-toaster position=&quot;bottom-right&quot;></flint-toaster><div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-button variant=&quot;secondary&quot; onclick=&quot;window.__storybook_lit.toast('Default toast message')&quot;>Default</flint-button><flint-button variant=&quot;primary&quot; onclick=&quot;window.__storybook_lit.toast.success('Operation successful!')&quot;>Success</flint-button><flint-button variant=&quot;destructive&quot; onclick=&quot;window.__storybook_lit.toast.error('Something went wrong')&quot;>Error</flint-button><flint-button variant=&quot;secondary&quot; onclick=&quot;window.__storybook_lit.toast.info('Here is some info')&quot;>Info</flint-button><flint-button variant=&quot;secondary&quot; onclick=&quot;window.__storybook_lit.toast.warning('Careful with that!')&quot;>Warning</flint-button></div>" />

- **Tag**: `<flint-toaster>`
- **Class**: `FlintToaster`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintToaster } from 'flint-ui';
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
| `--flint-toast-z-index` | `9999` |
| `--flint-toast-width` | `356px` |
| `--flint-toast-padding` | `16px` |
| `--flint-toast-bg` | `var(--flint-surface-1, #ffffff` |
| `--flint-toast-border` | `1px solid var(--flint-border-color, #e4e4e7` |
| `--flint-toast-radius` | `var(--flint-border-radius-lg, 0.5rem` |
| `--flint-toast-shadow` | `var(--flint-shadow-lg, 0 10px 15px -3px rgba(0,0,0,.10` |
| `--flint-toast-color` | `var(--flint-text-color, #111827` |
| `--flint-font-family` | `system-ui, sans-serif` |
| `--flint-toast-gap` | `8px` |
| `--flint-toast-success-icon-color` | `var(--flint-success-color, #10b981` |
| `--flint-toast-error-icon-color` | `var(--flint-error-color,   #ef4444` |
| `--flint-toast-warning-icon-color` | `var(--flint-warning-color, #f59e0b` |
| `--flint-toast-info-icon-color` | `var(--flint-primary-color, #3b82f6` |
| `--flint-text-color-muted` | `#71717a` |
| `--flint-border-color` | `#e4e4e7` |
| `--flint-border-radius-md` | `0.375rem` |
| `--flint-hover-color` | `rgba(0, 0, 0, 0.04` |
| `--flint-primary-focus-ring` | `rgba(59, 130, 246, 0.5` |
| `--flint-text-color-subtle` | `#a1a1aa` |
| `--flint-border-radius-sm` | `0.125rem` |
| `--flint-text-color` | `#111827` |

---
