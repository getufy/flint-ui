# Box

<Demo label="Styles">

<ui-box bgcolor="primary" color="white" p="16px" border-radius="8px">Primary Box</ui-box>
<ui-box bgcolor="#f3f4f6" p="16px" border-radius="8px">Gray Box</ui-box>
<ui-box p="16px" border-radius="8px" style="border:2px dashed #d1d5db">Dashed Border</ui-box>

</Demo>

- **Tag**: `<ui-box>`
- **Class**: `UiBox`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBox } from 'storybook-lit';
```

### Usage

```html
<ui-box></ui-box>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `component` | `component` | `string` | `'div'` | The component tag to render |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-box-bg` | `transparent` |
| `--ui-box-color` | `inherit` |
| `--ui-box-border` | `none` |
| `--ui-box-border-radius` | `0` |
| `--ui-box-shadow` | `none` |
| `--ui-box-padding` | `0` |

---
