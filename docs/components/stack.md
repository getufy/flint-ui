# Stack

<Demo label="Row">

<ui-stack direction="row" gap="2" align-items="center">
  <ui-paper elevation="1" style="padding:12px">Item 1</ui-paper>
  <ui-paper elevation="1" style="padding:12px">Item 2</ui-paper>
  <ui-paper elevation="1" style="padding:12px">Item 3</ui-paper>
</ui-stack>

</Demo>

<Demo label="Column">

<ui-stack direction="column" gap="2" style="width:100%;max-width:200px">
  <ui-paper elevation="1" style="padding:12px;text-align:center">Item 1</ui-paper>
  <ui-paper elevation="1" style="padding:12px;text-align:center">Item 2</ui-paper>
  <ui-paper elevation="1" style="padding:12px;text-align:center">Item 3</ui-paper>
</ui-stack>

</Demo>

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
