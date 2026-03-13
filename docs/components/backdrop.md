# Backdrop

A backdrop component that narrows the user's focus to a particular element.

- **Tag**: `<ui-backdrop>`
- **Class**: `UiBackdrop`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBackdrop } from 'storybook-lit';
```

### Usage

```html
<ui-backdrop></ui-backdrop>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` |  |
| `invisible` | `invisible` | `boolean` | `false` |  |
| `container` | `container` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `close` | — | Dispatched when the backdrop is clicked. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to display in the foreground. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-backdrop-position` | `fixed` |
| `--ui-backdrop-color` | — |
| `--ui-backdrop-z-index` | — |

---
