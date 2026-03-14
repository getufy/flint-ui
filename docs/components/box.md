# Box

<Demo label="Styles" html="<flint-box bgcolor=&quot;primary&quot; color=&quot;white&quot; p=&quot;16px&quot; border-radius=&quot;8px&quot;>Primary Box</flint-box><flint-box bgcolor=&quot;#f3f4f6&quot; p=&quot;16px&quot; border-radius=&quot;8px&quot;>Gray Box</flint-box><flint-box p=&quot;16px&quot; border-radius=&quot;8px&quot; style=&quot;border:2px dashed #d1d5db&quot;>Dashed Border</flint-box>" />

- **Tag**: `<flint-box>`
- **Class**: `FlintBox`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintBox } from 'flint-ui';
```

### Usage

```html
<flint-box></flint-box>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `component` | `component` | `string` | `'div'` | The component tag to render |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-box-warning` | `{ message }` | Fired when an unknown component tag is used and falls back to `div`. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-box-bg` | `transparent` |
| `--flint-box-color` | `inherit` |
| `--flint-box-border` | `none` |
| `--flint-box-border-radius` | `0` |
| `--flint-box-shadow` | `none` |
| `--flint-box-padding` | `0` |

---
