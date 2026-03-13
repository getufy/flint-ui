# Typography

<Demo label="Headings" html="<div style=&quot;display:flex;flex-direction:column;gap:4px;width:100%&quot;><ui-typography variant=&quot;h1&quot;>Heading 1</ui-typography><ui-typography variant=&quot;h2&quot;>Heading 2</ui-typography><ui-typography variant=&quot;h3&quot;>Heading 3</ui-typography><ui-typography variant=&quot;h4&quot;>Heading 4</ui-typography><ui-typography variant=&quot;h5&quot;>Heading 5</ui-typography><ui-typography variant=&quot;h6&quot;>Heading 6</ui-typography></div>" />

<Demo label="Body & Caption" html="<div style=&quot;display:flex;flex-direction:column;gap:4px;width:100%&quot;><ui-typography variant=&quot;body1&quot;>Body 1 — The quick brown fox jumps over the lazy dog.</ui-typography><ui-typography variant=&quot;body2&quot;>Body 2 — A smaller body text variant for secondary content.</ui-typography><ui-typography variant=&quot;caption&quot; color=&quot;secondary&quot;>Caption — Small helper text</ui-typography><ui-typography variant=&quot;overline&quot;>OVERLINE TEXT</ui-typography></div>" />

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
