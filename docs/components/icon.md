# Icon

An icon component with a resolver pattern for swappable icon sets.

- **Tag**: `<flint-icon>`
- **Class**: `FlintIcon`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintIcon } from '@getufy/flint-ui';
```

### Usage

```html
<flint-icon></flint-icon>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `name` | `string` | `''` | Icon name resolved through the registered icon resolver. |
| `src` | `src` | `string` | `''` | Direct URL to an SVG file. Overrides the resolver. |
| `size` | `size` | `IconSize` | `'md'` | Size variant. |
| `label` | `label` | `string` | `''` | Accessible label. When set, applies `role="img"`; otherwise `aria-hidden="true"`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-load` | — | Emitted when the SVG has been successfully loaded and rendered. |
| `flint-error` | — | Emitted when the SVG fails to load. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The outer container element. |
| `svg` | The inner container wrapping the inline SVG or `&lt;use&gt;` element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-icon-size` | — |
| `--flint-icon-color` | — |

---
