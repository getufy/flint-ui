# Stack

<Demo label="Row" html="<flint-stack direction=&quot;row&quot; gap=&quot;2&quot; align-items=&quot;center&quot;>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 1</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 2</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px&quot;>Item 3</flint-paper></flint-stack>" />

<Demo label="Column" html="<flint-stack direction=&quot;column&quot; gap=&quot;2&quot; style=&quot;width:100%;max-width:200px&quot;>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 1</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 2</flint-paper>  <flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>Item 3</flint-paper></flint-stack>" />

- **Tag**: `<flint-stack>`
- **Class**: `FlintStack`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintStack } from '@getufy/flint-ui';
```

### Usage

```html
<flint-stack></flint-stack>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `direction` | `direction` | `ResponsiveValue&lt;'row' \| 'row-reverse' \| 'column' \| 'column-reverse'&gt;` | `'column'` | Flex direction of the stack layout. |
| `spacing` | `spacing` | `ResponsiveValue&lt;number \| string&gt;` | `0` | Space between child items (1 unit = 8px). |
| `alignItems` | `alignItems` | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline' \| undefined` | — | Cross-axis alignment of stack children. |
| `justifyContent` | `justifyContent` | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' \| undefined` | — | Main-axis alignment of stack children. |
| `useFlexGap` | `useFlexGap` | `boolean` | `true` | Whether to use CSS flex gap for spacing. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stack-spacing` | `0px` |

---
