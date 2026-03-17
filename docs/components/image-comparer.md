# Image Comparer

<Demo html='<flint-image-comparer position="50" style="width:100%;max-width:500px">  <div slot="before" style="width:100%;height:250px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px">Before</div>  <div slot="after" style="width:100%;height:250px;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px">After</div></flint-image-comparer>' />

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
| `flint-image-comparer-change` | `&#123; position: number &#125;` | Fired when the position changes. Detail: `&#123; position: number &#125;`. |

### Slots

| Name | Description |
| --- | --- |
| `before` | The before image (`&lt;img&gt;` or `&lt;svg&gt;`). |
| `after` | The after image (`&lt;img&gt;` or `&lt;svg&gt;`). |
| `handle` | Custom handle content (replaces the default arrows icon). |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper. |
| `before` | The container that wraps the before image. |
| `after` | The container that wraps the after image. |
| `divider` | The divider line that separates the images. |
| `handle` | The draggable handle. |

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
