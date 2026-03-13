# Container

- **Tag**: `<ui-container>`
- **Class**: `UiContainer`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiContainer } from 'storybook-lit';
```

### Usage

```html
<ui-container></ui-container>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disableGutters` | `disable-gutters` | `boolean` | `false` | * If `true`, the left and right padding is removed. |
| `fixed` | `fixed` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-container-padding` | `16px` |
| `--ui-container-padding-sm` | `24px` |
| `--ui-container-xs` | `444px` |
| `--ui-container-sm` | `600px` |
| `--ui-container-md` | `900px` |
| `--ui-container-lg` | `1200px` |
| `--ui-container-xl` | `1536px` |

---
