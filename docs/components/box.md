# Box

<Demo label="Styles" html="<ui-box bgcolor=&quot;primary&quot; color=&quot;white&quot; p=&quot;16px&quot; border-radius=&quot;8px&quot;>Primary Box</ui-box><ui-box bgcolor=&quot;#f3f4f6&quot; p=&quot;16px&quot; border-radius=&quot;8px&quot;>Gray Box</ui-box><ui-box p=&quot;16px&quot; border-radius=&quot;8px&quot; style=&quot;border:2px dashed #d1d5db&quot;>Dashed Border</ui-box>" />

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
