# Image Comparer

<Demo html="<flint-image-comparer position=&quot;50&quot; style=&quot;width:100%;max-width:500px&quot;>  <div slot=&quot;before&quot; style=&quot;width:100%;height:250px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px&quot;>Before</div>  <div slot=&quot;after&quot; style=&quot;width:100%;height:250px;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px&quot;>After</div></flint-image-comparer>" />

`flint-image-comparer` — Compare two images side-by-side with a draggable slider.

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
| `flint-image-comparer-change` | `{ position: number }` | Fired when the position changes. Detail: `{ position: number }`. |

### Slots

| Name | Description |
| --- | --- |
| `before` | The before image (`&lt;img&gt;` or `&lt;svg&gt;`). |
| `after` | The after image (`&lt;img&gt;` or `&lt;svg&gt;`). |
| `handle` | Custom handle content (replaces the default arrows icon). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-image-comparer-divider-width` | — |
| `--flint-image-comparer-divider-color` | — |
| `--flint-image-comparer-handle-size` | — |
| `--flint-image-comparer-handle-bg` | — |
| `--flint-image-comparer-handle-border-color` | — |
| `--flint-image-comparer-handle-icon-color` | — |
| `--flint-image-comparer-border-radius` | — |
| `--flint-image-comparer-aspect-ratio` | — |
| `--flint-border-radius-full` | — |
| `--flint-shadow-md` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-shadow-lg` | — |

---
