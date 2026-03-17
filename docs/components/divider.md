# Divider

<Demo label="Horizontal" html='<div style="width:100%;max-width:400px"><p style="margin:0 0 8px">Content above</p><flint-divider></flint-divider><p style="margin:8px 0 0">Content below</p></div>' />

<Demo label="Vertical" html='<div style="display:flex;align-items:center;gap:12px;height:40px"><span>Left</span><flint-divider orientation="vertical"></flint-divider><span>Right</span></div>' />

A divider component that provides a thin line for grouping elements.

- **Tag**: `<flint-divider>`
- **Class**: `FlintDivider`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDivider } from '@getufy/flint-ui';
```

### Usage

```html
<flint-divider></flint-divider>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `Orientation` | `'horizontal'` | Orientation of the divider line. |
| `variant` | `variant` | `'full' \| 'middle' \| 'inset'` | `'full'` | Inset variant controlling how far the divider extends. |
| `weight` | `weight` | `'light' \| 'medium' \| 'heavy'` | `'light'` | Thickness of the divider line. |
| `textAlign` | `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Alignment of text content within the divider. |

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
