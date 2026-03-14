# Box

<Demo label="Styles" html="<flint-box bgcolor=&quot;primary&quot; color=&quot;white&quot; p=&quot;16px&quot; border-radius=&quot;8px&quot;>Primary Box</flint-box><flint-box bgcolor=&quot;#f3f4f6&quot; p=&quot;16px&quot; border-radius=&quot;8px&quot;>Gray Box</flint-box><flint-box p=&quot;16px&quot; border-radius=&quot;8px&quot; style=&quot;border:2px dashed #d1d5db&quot;>Dashed Border</flint-box>" />

- **Tag**: `<flint-box>`
- **Class**: `FlintBox`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintBox } from '@getufy/flint-ui';
```

### Usage

```html
<flint-box></flint-box>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `component` | `component` | `string` | `'div'` | The component tag to render |
| `m` | `m` | `string` | — | Margin on all sides. |
| `mt` | `mt` | `string` | — | Margin top. |
| `mr` | `mr` | `string` | — | Margin right. |
| `mb` | `mb` | `string` | — | Margin bottom. |
| `ml` | `ml` | `string` | — | Margin left. |
| `mx` | `mx` | `string` | — | Margin on the horizontal (left and right) axis. |
| `my` | `my` | `string` | — | Margin on the vertical (top and bottom) axis. |
| `p` | `p` | `string` | — | Padding on all sides. |
| `pt` | `pt` | `string` | — | Padding top. |
| `pr` | `pr` | `string` | — | Padding right. |
| `pb` | `pb` | `string` | — | Padding bottom. |
| `pl` | `pl` | `string` | — | Padding left. |
| `px` | `px` | `string` | — | Padding on the horizontal (left and right) axis. |
| `py` | `py` | `string` | — | Padding on the vertical (top and bottom) axis. |
| `display` | `display` | `string` | — | CSS display value. |
| `flexDirection` | `flex-direction` | `string` | — | CSS flex-direction value. |
| `alignItems` | `align-items` | `string` | — | CSS align-items value. |
| `justifyContent` | `justify-content` | `string` | — | CSS justify-content value. |
| `flexWrap` | `flex-wrap` | `string` | — | CSS flex-wrap value. |
| `flexBasis` | `flex-basis` | `string` | — | CSS flex-basis value. |
| `flexGrow` | `flex-grow` | `string` | — | CSS flex-grow value. |
| `flexShrink` | `flex-shrink` | `string` | — | CSS flex-shrink value. |
| `gap` | `gap` | `string` | — | CSS gap between flex or grid items. |
| `bgcolor` | `bgcolor` | `string` | — | Background color. Supports theme tokens 'primary' and 'secondary'. |
| `color` | `color` | `string` | — | Text color. Supports theme tokens 'primary' and 'secondary'. |
| `border` | `border` | `string` | — | CSS border shorthand value. |
| `borderRadius` | `border-radius` | `string` | — | CSS border-radius value. |
| `boxShadow` | `box-shadow` | `string` | — | CSS box-shadow value. |
| `width` | `width` | `string` | — | CSS width value. |
| `height` | `height` | `string` | — | CSS height value. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-box-warning` | — | Dispatched when an unknown component tag is used and falls back to div. |

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
