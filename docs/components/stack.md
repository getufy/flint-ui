# Stack

<Demo label="Row" html='<flint-stack direction="row" gap="2" align-items="center">  <flint-paper elevation="1" style="padding:12px">Item 1</flint-paper>  <flint-paper elevation="1" style="padding:12px">Item 2</flint-paper>  <flint-paper elevation="1" style="padding:12px">Item 3</flint-paper></flint-stack>' />

<Demo label="Column" html='<flint-stack direction="column" gap="2" style="width:100%;max-width:200px">  <flint-paper elevation="1" style="padding:12px;text-align:center">Item 1</flint-paper>  <flint-paper elevation="1" style="padding:12px;text-align:center">Item 2</flint-paper>  <flint-paper elevation="1" style="padding:12px;text-align:center">Item 3</flint-paper></flint-stack>' />

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
| `spacing` | `spacing` | `ResponsiveValue&lt;number \| string&gt;` | `0` | Space between child items. Numeric values use an 8px multiplier (e.g. `2` = 16px). |
| `alignItems` | `alignItems` | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline' \| undefined` | — | Cross-axis alignment of stack children. |
| `justifyContent` | `justifyContent` | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' \| undefined` | — | Main-axis alignment of stack children. |
| `useFlexGap` | `useFlexGap` | `boolean` | `true` | Whether to use CSS flex gap for spacing. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stack-spacing` | `0px` |

---
