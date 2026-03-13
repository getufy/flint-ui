# Image Comparer

- **Tag**: `<ui-image-comparer>`
- **Class**: `UiImageComparer`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiImageComparer } from 'storybook-lit';
```

### Usage

```html
<ui-image-comparer></ui-image-comparer>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `position` | `position` | `number` | `50` | The position of the divider as a percentage (0–100). |
| `disabled` | `disabled` | `boolean` | `false` | Whether the comparer is disabled. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-image-comparer-change` | `{ position: clamped }` |  |

### Slots

| Name | Description |
| --- | --- |
| `after` |  |
| `before` |  |
| `handle` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-image-comparer-border-radius` | `var(--ui-border-radius-md` |
| `--ui-image-comparer-aspect-ratio` | `16 / 9` |
| `--ui-image-comparer-divider-width` | `2px` |
| `--ui-image-comparer-divider-color` | `var(--ui-color-white` |
| `--ui-image-comparer-handle-size` | `40px` |
| `--ui-image-comparer-handle-bg` | `var(--ui-color-white` |
| `--ui-image-comparer-handle-border-color` | `rgba(0, 0, 0, 0.15` |
| `--ui-image-comparer-handle-icon-color` | `var(--ui-text-color-muted` |
| `--ui-border-radius-full` | — |
| `--ui-shadow-md` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-shadow-lg` | — |

---
