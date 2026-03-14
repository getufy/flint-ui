# Divider

<Demo label="Horizontal" html="<div style=&quot;width:100%;max-width:400px&quot;><p style=&quot;margin:0 0 8px&quot;>Content above</p><flint-divider></flint-divider><p style=&quot;margin:8px 0 0&quot;>Content below</p></div>" />

<Demo label="Vertical" html="<div style=&quot;display:flex;align-items:center;gap:12px;height:40px&quot;><span>Left</span><flint-divider orientation=&quot;vertical&quot;></flint-divider><span>Right</span></div>" />

A divider component that provides a thin line for grouping elements.

- **Tag**: `<flint-divider>`
- **Class**: `FlintDivider`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintDivider } from 'flint-ui';
```

### Usage

```html
<flint-divider></flint-divider>
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
| `--flint-divider-margin` | — |
| `--flint-divider-thickness` | — |
| `--flint-divider-color` | — |
| `--flint-border-color` | — |
| `--flint-font-family` | — |
| `--flint-text-color-muted` | — |

---

## Accessibility

- **ARIA**: `role="separator"`.
- **Screen reader**: announced as separator.
