# Pagination

<Demo label="Pages" html="<ui-pagination count=&quot;10&quot; page=&quot;1&quot;></ui-pagination>" />

<Demo label="Middle Page" html="<ui-pagination count=&quot;20&quot; page=&quot;10&quot;></ui-pagination>" />

Pagination component enabling the user to select a specific page from a range of pages.

- **Tag**: `<ui-pagination>`
- **Class**: `UiPagination`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiPagination } from 'storybook-lit';
```

### Usage

```html
<ui-pagination></ui-pagination>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `count` | `count` | `number` | `1` | Total number of pages. |
| `page` | `page` | `number` | `1` | The current page (1-based). In controlled mode, update this from the ui-pagination-change event. |
| `defaultPage` | `default-page` | `number` | `1` | Initial page for uncontrolled mode. Ignored after first render. |
| `label` | `label` | `string` | `''` | Accessible label for the nav landmark (aria-label). |
| `variant` | `variant` | `'text' \| 'outlined'` | `'text'` | Variant. |
| `shape` | `shape` | `'circular' \| 'rounded' \| 'square'` | `'circular'` | Shape. |
| `size` | `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| `color` | `color` | `'primary' \| 'secondary' \| 'standard'` | `'primary'` | Color. |
| `showFirstButton` | `show-first-button` | `boolean` | `false` | Show first-page button. |
| `showLastButton` | `show-last-button` | `boolean` | `false` | Show last-page button. |
| `hidePrevButton` | `hide-prev-button` | `boolean` | `false` | Hide previous button. |
| `hideNextButton` | `hide-next-button` | `boolean` | `false` | Hide next button. |
| `siblingCount` | `sibling-count` | `number` | `1` | Number of sibling pages around the current page. |
| `boundaryCount` | `boundary-count` | `number` | `1` | Number of pages always shown at start and end. |
| `disabled` | `disabled` | `boolean` | `false` | Disable the whole component. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-pagination-change` | — | { page: number } when the active page changes. |

### Slots

| Name | Description |
| --- | --- |
| `prev-icon` | Icon for the previous button (default: chevron left SVG). |
| `next-icon` | Icon for the next button (default: chevron right SVG). |
| `first-icon` | Icon for the first button (default: skip-to-start SVG). |
| `last-icon` | Icon for the last button (default: skip-to-end SVG). |
| `ellipsis-icon` | Icon for ellipsis items (default: three-dot SVG). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-pagination-gap` | `4px` |
| `--ui-pagination-btn-size` | `36px` |
| `--ui-pagination-btn-radius` | `4px` |
| `--ui-pagination-btn-font-size` | `0.875rem` |
| `--ui-pagination-focus-ring-color` | `var(--ui-primary-color` |
| `--ui-pagination-active-bg` | `var(--ui-primary-color` |
| `--ui-pagination-active-color` | `var(--ui-text-color-on-primary` |
| `--ui-pagination-disabled-opacity` | `0.38` |
| `--ui-pagination-outlined-border` | `var(--ui-border-color` |
| `--ui-pagination-outlined-hover-bg` | `var(--ui-primary-color-light` |
| `--ui-pagination-outlined-hover-border` | `var(--ui-primary-color` |
| `--ui-pagination-active-bg-secondary` | `var(--ui-secondary-color` |
| `--ui-pagination-active-bg-standard` | `var(--ui-text-color` |
| `--ui-pagination-btn-radius-rounded` | `8px` |
| `--ui-pagination-btn-size-sm` | `28px` |
| `--ui-pagination-btn-font-size-sm` | `0.8125rem` |
| `--ui-pagination-btn-size-lg` | `44px` |
| `--ui-pagination-btn-font-size-lg` | `0.9375rem` |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |
| `--ui-text-color-muted` | — |

### Methods

| Method | Description |
| --- | --- |
| `map(item => {             if (item === 'start-ellipsis' \|\| item === 'end-ellipsis')` |  |

---
