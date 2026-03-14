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
| `spacing` | `spacing` | `ResponsiveValue&lt;number \| string&gt;` | `0` | Flex direction of the stack layout. */ converter: { fromAttribute: (value: string \| null) =&gt; { if (!value) return 'column'; try { return JSON.parse(value); } catch { return value; } } } }) direction: ResponsiveValue&lt;'row' \| 'row-reverse' \| 'column' \| 'column-reverse'&gt; = 'column'; /** Space between child items (1 unit = 8px). |
| `alignItems` | `align-items` | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline'` | — | Cross-axis alignment of stack children. |
| `justifyContent` | `justify-content` | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | — | Main-axis alignment of stack children. |
| `useFlexGap` | `use-flex-gap` | `boolean` | `true` | Whether to use CSS flex gap for spacing. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stack-spacing` | `0px` |

---
