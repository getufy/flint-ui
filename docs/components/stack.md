# Stack

<Demo label="Row" html="<ui-stack direction=&quot;row&quot; gap=&quot;2&quot; align-items=&quot;center&quot;>  <ui-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 1</ui-paper>  <ui-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 2</ui-paper>  <ui-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 3</ui-paper></ui-stack>" />

<Demo label="Column" html="<ui-stack direction=&quot;column&quot; gap=&quot;2&quot; style=&quot;width:100%;max-width:200px&quot;>  <ui-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 1</ui-paper>  <ui-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 2</ui-paper>  <ui-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 3</ui-paper></ui-stack>" />

- **Tag**: `<ui-stack>`
- **Class**: `UiStack`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiStack } from 'storybook-lit';
```

### Usage

```html
<ui-stack></ui-stack>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `spacing` | `spacing` | `ResponsiveValue<number \| string>` | `0` |  |
| `useFlexGap` | `use-flex-gap` | `boolean` | `true` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-stack-spacing` | `0px` |

---
