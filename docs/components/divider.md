# Divider

A divider component that provides a thin line for grouping elements.

- **Tag**: `<ui-divider>`
- **Class**: `UiDivider`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDivider } from 'storybook-lit';
```

### Usage

```html
<ui-divider></ui-divider>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `variant` | `variant` | `'full' \| 'middle' \| 'inset'` | `'full'` |  |
| `weight` | `weight` | `'light' \| 'medium' \| 'heavy'` | `'light'` |  |
| `textAlign` | `text-align` | `'left' \| 'center' \| 'right'` | `'center'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Optional text or content to display within the divider. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-divider-margin` | — |
| `--ui-divider-thickness` | — |
| `--ui-divider-color` | — |
| `--ui-border-color` | — |
| `--ui-font-family` | — |
| `--ui-text-color-muted` | — |

---
