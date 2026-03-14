# Image Comparer

<Demo html="<flint-image-comparer position=&quot;50&quot; style=&quot;width:100%;max-width:500px&quot;>  <div slot=&quot;before&quot; style=&quot;width:100%;height:250px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px&quot;>Before</div>  <div slot=&quot;after&quot; style=&quot;width:100%;height:250px;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px&quot;>After</div></flint-image-comparer>" />

- **Tag**: `<flint-image-comparer>`
- **Class**: `FlintImageComparer`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintImageComparer } from '@getufy/flint-ui';
```

### Usage

```html
<flint-image-comparer></flint-image-comparer>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `position` | `position` | `number` | `50` | The position of the divider as a percentage (0–100). |
| `disabled` | `disabled` | `boolean` | `false` | Whether the comparer is disabled. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-image-comparer-change` | `{ position: clamped }` |  |

### Slots

| Name | Description |
| --- | --- |
| `after` |  |
| `before` |  |
| `handle` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-image-comparer-border-radius` | `var(--flint-border-radius-md` |
| `--flint-image-comparer-aspect-ratio` | `16 / 9` |
| `--flint-image-comparer-divider-width` | `2px` |
| `--flint-image-comparer-divider-color` | `var(--flint-color-white` |
| `--flint-image-comparer-handle-size` | `40px` |
| `--flint-image-comparer-handle-bg` | `var(--flint-color-white` |
| `--flint-image-comparer-handle-border-color` | `rgba(0, 0, 0, 0.15` |
| `--flint-image-comparer-handle-icon-color` | `var(--flint-text-color-muted` |
| `--flint-border-radius-full` | — |
| `--flint-shadow-md` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-shadow-lg` | — |

---
