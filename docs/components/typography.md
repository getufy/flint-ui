# Typography

Typography component for displaying text with consistent theme styles.

- **Tag**: `<ui-typography>`
- **Class**: `UiTypography`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTypography } from 'storybook-lit';
```

### Usage

```html
<ui-typography></ui-typography>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `\| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'         \| 'subtitle1' \| 'subtitle2'         \| 'body1' \| 'body2'         \| 'caption' \| 'overline'         \| 'inherit'` | `'body1'` |  |
| `color` | `color` | `\| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info'         \| 'textPrimary' \| 'textSecondary' \| 'inherit'` | `'textPrimary'` |  |
| `align` | `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment. |
| `noWrap` | `no-wrap` | `boolean` | `false` | If true, text is truncated with an ellipsis. |
| `gutterBottom` | `gutter-bottom` | `boolean` | `false` | If true, adds a bottom margin. |
| `paragraph` | `paragraph` | `boolean` | `false` | If true, adds paragraph margin bottom. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The text content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-primary-color` | — |
| `--ui-secondary-color` | — |
| `--ui-success-color` | — |
| `--ui-error-color` | — |
| `--ui-warning-color` | — |
| `--ui-info-icon-color` | — |
| `--ui-text-color-muted` | — |

---
