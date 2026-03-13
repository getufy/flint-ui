# Link

<Demo>

<ui-link href="#">Default Link</ui-link>
<ui-link href="#" underline="always">Always Underline</ui-link>
<ui-link href="#" color="secondary">Secondary</ui-link>

</Demo>

The Link component allows you to easily customize anchor elements with theme colors and typography styles.

- **Tag**: `<ui-link>`
- **Class**: `UiLink`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiLink } from 'storybook-lit';
```

### Usage

```html
<ui-link></ui-link>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `href` | `href` | `string` | `''` | The URL of the link. |
| `target` | `target` | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'` | Where to open the link. |
| `rel` | `rel` | `string` | `''` | Specifies the relationship of the target object. |
| `color` | `color` | `\| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info'         \| 'textPrimary' \| 'textSecondary' \| 'inherit'` | `'primary'` |  |
| `underline` | `underline` | `'none' \| 'hover' \| 'always'` | `'always'` |  |
| `variant` | `variant` | `\| 'inherit' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'         \| 'subtitle1' \| 'subtitle2' \| 'body1' \| 'body2' \| 'caption' \| 'overline'` | `'inherit'` |  |
| `disabled` | `disabled` | `boolean` | `false` | If true, the link is disabled. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `click` | — | Native click event. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Link text or content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-link-color` | — |
| `--ui-link-color-visited` | — |
| `--ui-link-color-hover` | `var(--ui-primary-color-hover)` |
| `--ui-primary-color` | — |
| `--ui-primary-color-hover` | — |
| `--ui-secondary-color` | — |
| `--ui-font-family` | — |
| `--ui-success-color` | — |
| `--ui-error-color` | — |
| `--ui-warning-color` | — |
| `--ui-info-icon-color` | — |
| `--ui-text-color` | — |
| `--ui-text-color-muted` | — |

---
