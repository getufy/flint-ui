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
| `m` | `m` | `string \| undefined` | — | Margin on all sides. |
| `mt` | `mt` | `string \| undefined` | — | Margin top. |
| `mr` | `mr` | `string \| undefined` | — | Margin right. |
| `mb` | `mb` | `string \| undefined` | — | Margin bottom. |
| `ml` | `ml` | `string \| undefined` | — | Margin left. |
| `mx` | `mx` | `string \| undefined` | — | Margin on the horizontal (left and right) axis. |
| `my` | `my` | `string \| undefined` | — | Margin on the vertical (top and bottom) axis. |
| `p` | `p` | `string \| undefined` | — | Padding on all sides. |
| `pt` | `pt` | `string \| undefined` | — | Padding top. |
| `pr` | `pr` | `string \| undefined` | — | Padding right. |
| `pb` | `pb` | `string \| undefined` | — | Padding bottom. |
| `pl` | `pl` | `string \| undefined` | — | Padding left. |
| `px` | `px` | `string \| undefined` | — | Padding on the horizontal (left and right) axis. |
| `py` | `py` | `string \| undefined` | — | Padding on the vertical (top and bottom) axis. |
| `display` | `display` | `string \| undefined` | — | CSS display value. |
| `flexDirection` | `flexDirection` | `string \| undefined` | — | CSS flex-direction value. |
| `alignItems` | `alignItems` | `string \| undefined` | — | CSS align-items value. |
| `justifyContent` | `justifyContent` | `string \| undefined` | — | CSS justify-content value. |
| `flexWrap` | `flexWrap` | `string \| undefined` | — | CSS flex-wrap value. |
| `flexBasis` | `flexBasis` | `string \| undefined` | — | CSS flex-basis value. |
| `flexGrow` | `flexGrow` | `string \| undefined` | — | CSS flex-grow value. |
| `flexShrink` | `flexShrink` | `string \| undefined` | — | CSS flex-shrink value. |
| `gap` | `gap` | `string \| undefined` | — | CSS gap between flex or grid items. |
| `bgcolor` | `bgcolor` | `string \| undefined` | — | Background color. Supports theme tokens 'primary' and 'secondary'. |
| `color` | `color` | `string \| undefined` | — | Text color. Supports theme tokens 'primary' and 'secondary'. |
| `border` | `border` | `string \| undefined` | — | CSS border shorthand value. |
| `borderRadius` | `borderRadius` | `string \| undefined` | — | CSS border-radius value. |
| `boxShadow` | `boxShadow` | `string \| undefined` | — | CSS box-shadow value. |
| `width` | `width` | `string \| undefined` | — | CSS width value. |
| `height` | `height` | `string \| undefined` | — | CSS height value. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-box-warning` | — | Dispatched when an unknown component tag is used and falls back to div. |

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
