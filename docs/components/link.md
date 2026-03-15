# Link

<Demo label="Underline Styles" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-link href="#">Default</flint-link><flint-link href="#" underline="always">Always</flint-link><flint-link href="#" underline="none">None</flint-link></div>' />

<Demo label="Colors" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-link href="#" color="primary">Primary</flint-link><flint-link href="#" color="secondary">Secondary</flint-link><flint-link href="#" color="inherit">Inherit</flint-link></div>' />

The Link component allows you to easily customize anchor elements
with theme colors and typography styles.

- **Tag**: `<flint-link>`
- **Class**: `FlintLink`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintLink } from '@getufy/flint-ui';
```

### Usage

```html
<flint-link></flint-link>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `href` | `href` | `string` | `''` | The URL of the link. |
| `target` | `target` | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'` | Where to open the link. |
| `rel` | `rel` | `string` | `''` | Specifies the relationship of the target object. |
| `color` | `color` | `\| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info'         \| 'textPrimary' \| 'textSecondary' \| 'inherit'` | `'primary'` | The color of the link. |
| `underline` | `underline` | `'none' \| 'hover' \| 'always'` | `'always'` | Controls the underline behavior. |
| `variant` | `variant` | `\| 'inherit' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'         \| 'subtitle1' \| 'subtitle2' \| 'body1' \| 'body2' \| 'caption' \| 'overline'` | `'inherit'` | Applies typography variant styles. |
| `disabled` | `disabled` | `boolean` | `false` | If true, the link is disabled. |
| `download` | `download` | `string \| undefined` | — | The download attribute. |
| `label` | `label` | `string \| undefined` | — | The ARIA label. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Link text or content. Native click events propagate from the shadow DOM anchor element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-link-color` | — |
| `--flint-link-color-visited` | — |
| `--flint-link-color-hover` | `var(--flint-primary-color-hover)` |
| `--flint-primary-color` | — |
| `--flint-primary-color-hover` | — |
| `--flint-secondary-color` | — |
| `--flint-font-family` | — |
| `--flint-success-color` | — |
| `--flint-error-color` | — |
| `--flint-warning-color` | — |
| `--flint-info-icon-color` | — |
| `--flint-text-color` | — |
| `--flint-text-color-muted` | — |

---
