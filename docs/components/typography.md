# Typography

<Demo label="Headings" html="<div style=&quot;display:flex;flex-direction:column;gap:4px;width:100%&quot;><flint-typography variant=&quot;h1&quot;>Heading 1</flint-typography><flint-typography variant=&quot;h2&quot;>Heading 2</flint-typography><flint-typography variant=&quot;h3&quot;>Heading 3</flint-typography><flint-typography variant=&quot;h4&quot;>Heading 4</flint-typography><flint-typography variant=&quot;h5&quot;>Heading 5</flint-typography><flint-typography variant=&quot;h6&quot;>Heading 6</flint-typography></div>" />

<Demo label="Body & Caption" html="<div style=&quot;display:flex;flex-direction:column;gap:4px;width:100%&quot;><flint-typography variant=&quot;body1&quot;>Body 1 — The quick brown fox jumps over the lazy dog.</flint-typography><flint-typography variant=&quot;body2&quot;>Body 2 — A smaller body text variant for secondary content.</flint-typography><flint-typography variant=&quot;caption&quot; color=&quot;secondary&quot;>Caption — Small helper text</flint-typography><flint-typography variant=&quot;overline&quot;>OVERLINE TEXT</flint-typography></div>" />

Typography component for displaying text with consistent theme styles.

- **Tag**: `<flint-typography>`
- **Class**: `FlintTypography`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTypography } from 'flint-ui';
```

### Usage

```html
<flint-typography></flint-typography>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `\| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'         \| 'subtitle1' \| 'subtitle2'         \| 'body1' \| 'body2'         \| 'caption' \| 'overline'         \| 'inherit'` | `'body1'` | Variant of the typography. |
| `color` | `color` | `\| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info'         \| 'textPrimary' \| 'textSecondary' \| 'inherit'` | `'textPrimary'` | The color of the text. |
| `component` | `component` | `string` | — | Override the rendered HTML tag. |
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
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-primary-color` | — |
| `--flint-secondary-color` | — |
| `--flint-success-color` | — |
| `--flint-error-color` | — |
| `--flint-warning-color` | — |
| `--flint-info-icon-color` | — |
| `--flint-text-color-muted` | — |

---
