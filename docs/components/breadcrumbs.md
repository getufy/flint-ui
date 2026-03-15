# Breadcrumbs

<Demo html='<flint-breadcrumbs>  <a href="#">Home</a>  <a href="#">Products</a>  <span>Current Page</span></flint-breadcrumbs>' />

Breadcrumbs provide a navigational aid showing the current page's location
within a site hierarchy, allowing users to navigate back up the trail.

- **Tag**: `<flint-breadcrumbs>`
- **Class**: `FlintBreadcrumbs`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintBreadcrumbs } from '@getufy/flint-ui';
```

### Usage

```html
<flint-breadcrumbs></flint-breadcrumbs>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `maxItems` | `max-items` | `number` | `8` | Max number of items to display before collapsing. |
| `itemsBefore` | `items-before` | `number` | `1` | Number of items to show before the ellipsis. |
| `itemsAfter` | `items-after` | `number` | `1` | Number of items to show after the ellipsis. |
| `separator` | `separator` | `string` | `'/'` | The character or string used as a separator (fallback when no separator slot is provided). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Breadcrumb items (links or text), distributed in order. |
| `separator` | Custom separator element rendered between each item. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-breadcrumb-separator-margin` | `8px` |
| `--flint-breadcrumb-color` | `var(--flint-text-color-muted` |
| `--flint-font-family` | — |
| `--flint-breadcrumb-font-size` | `0.875rem` |
| `--flint-breadcrumb-color-active` | `var(--flint-text-color` |
| `--flint-breadcrumb-collapsed-bg` | `var(--flint-hover-color` |
| `--flint-breadcrumb-collapsed-radius` | `var(--flint-border-radius-md` |
| `--flint-breadcrumb-collapsed-hover-bg` | `var(--flint-active-color` |
| `--flint-primary-color` | — |

---
