# Breadcrumbs

<Demo>

<ui-breadcrumbs>
  <a href="#">Home</a>
  <a href="#">Products</a>
  <span>Current Page</span>
</ui-breadcrumbs>

</Demo>

Breadcrumbs provide a navigational aid showing the current page's location within a site hierarchy, allowing users to navigate back up the trail.

- **Tag**: `<ui-breadcrumbs>`
- **Class**: `UiBreadcrumbs`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBreadcrumbs } from 'storybook-lit';
```

### Usage

```html
<ui-breadcrumbs></ui-breadcrumbs>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `maxItems` | `max-items` | `number` | `8` | * Max number of items to display before collapsing. |
| `itemsBefore` | `items-before` | `number` | `1` | * Number of items to show before the ellipsis. |
| `itemsAfter` | `items-after` | `number` | `1` | * Number of items to show after the ellipsis. |
| `separator` | `separator` | `string` | `'/'` | * The character or string used as a separator (fallback when no separator slot is provided). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Breadcrumb items (links or text), distributed in order. |
| `separator` | Custom separator element rendered between each item. |
| `breadcrumb-item-${index}` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-breadcrumb-separator-margin` | `8px` |
| `--ui-breadcrumb-color` | `var(--ui-text-color-muted` |
| `--ui-font-family` | — |
| `--ui-breadcrumb-font-size` | `0.875rem` |
| `--ui-breadcrumb-color-active` | `var(--ui-text-color` |
| `--ui-breadcrumb-collapsed-bg` | `var(--ui-hover-color` |
| `--ui-breadcrumb-collapsed-radius` | `var(--ui-border-radius-md` |
| `--ui-breadcrumb-collapsed-hover-bg` | `var(--ui-active-color` |
| `--ui-primary-color` | — |

---
