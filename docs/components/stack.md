# Stack

<Demo label="Row" html="<flint-stack direction=&quot;row&quot; gap=&quot;2&quot; align-items=&quot;center&quot;>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 1</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 2</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 3</flint-paper></flint-stack>" />

<Demo label="Column" html="<flint-stack direction=&quot;column&quot; gap=&quot;2&quot; style=&quot;width:100%;max-width:200px&quot;>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 1</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 2</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 3</flint-paper></flint-stack>" />

- **Tag**: `<flint-stack>`
- **Class**: `FlintStack`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStack } from 'flint-ui';
```

### Usage

```html
<flint-stack></flint-stack>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `spacing` | `spacing` | `ResponsiveValue<number \| string>` | `0` | Gap between children; numbers are multiplied by 8px. |
| `useFlexGap` | `use-flex-gap` | `boolean` | `true` | Use CSS `gap` for spacing instead of margin-based fallback. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stack-spacing` | `0px` |

---
