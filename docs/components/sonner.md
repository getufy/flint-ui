# Sonner

- **Tag**: `<ui-toaster>`
- **Class**: `UiToaster`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiToaster } from 'storybook-lit';
```

### Usage

```html
<ui-toaster></ui-toaster>
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
| `--ui-toast-z-index` | `9999` |
| `--ui-toast-width` | `356px` |
| `--ui-toast-padding` | `16px` |
| `--ui-toast-bg` | `var(--ui-surface-1, #ffffff` |
| `--ui-toast-border` | `1px solid var(--ui-border-color, #e4e4e7` |
| `--ui-toast-radius` | `var(--ui-border-radius-lg, 0.5rem` |
| `--ui-toast-shadow` | `var(--ui-shadow-lg, 0 10px 15px -3px rgba(0,0,0,.10` |
| `--ui-toast-color` | `var(--ui-text-color, #111827` |
| `--ui-font-family` | `system-ui, sans-serif` |
| `--ui-toast-gap` | `8px` |
| `--ui-toast-success-icon-color` | `var(--ui-success-color, #10b981` |
| `--ui-toast-error-icon-color` | `var(--ui-error-color,   #ef4444` |
| `--ui-toast-warning-icon-color` | `var(--ui-warning-color, #f59e0b` |
| `--ui-toast-info-icon-color` | `var(--ui-primary-color, #3b82f6` |
| `--ui-text-color-muted` | `#71717a` |
| `--ui-border-color` | `#e4e4e7` |
| `--ui-border-radius-md` | `0.375rem` |
| `--ui-hover-color` | `rgba(0, 0, 0, 0.04` |
| `--ui-primary-focus-ring` | `rgba(59, 130, 246, 0.5` |
| `--ui-text-color-subtle` | `#a1a1aa` |
| `--ui-border-radius-sm` | `0.125rem` |
| `--ui-text-color` | `#111827` |

---
