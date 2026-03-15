# Typography

<Demo label="Headings" html='<div style="display:flex;flex-direction:column;gap:4px;width:100%"><flint-typography variant="h1">Heading 1</flint-typography><flint-typography variant="h2">Heading 2</flint-typography><flint-typography variant="h3">Heading 3</flint-typography><flint-typography variant="h4">Heading 4</flint-typography><flint-typography variant="h5">Heading 5</flint-typography><flint-typography variant="h6">Heading 6</flint-typography></div>' />

<Demo label="Body & Caption" html='<div style="display:flex;flex-direction:column;gap:4px;width:100%"><flint-typography variant="body1">Body 1 — The quick brown fox jumps over the lazy dog.</flint-typography><flint-typography variant="body2">Body 2 — A smaller body text variant for secondary content.</flint-typography><flint-typography variant="caption" color="secondary">Caption — Small helper text</flint-typography><flint-typography variant="overline">OVERLINE TEXT</flint-typography></div>' />

Typography component for displaying text with consistent theme styles.

- **Tag**: `<flint-typography>`
- **Class**: `FlintTypography`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTypography } from '@getufy/flint-ui';
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
| `component` | `component` | `string \| undefined` | — | Override the rendered HTML tag. |
| `align` | `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment. |
| `noWrap` | `noWrap` | `boolean` | `false` | If true, text is truncated with an ellipsis. |
| `gutterBottom` | `gutterBottom` | `boolean` | `false` | If true, adds a bottom margin. |
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
