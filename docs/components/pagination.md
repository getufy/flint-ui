# Pagination

<Demo label="Pages" html='<flint-pagination count="10" page="1"></flint-pagination>' />

<Demo label="Middle Page" html='<flint-pagination count="20" page="10"></flint-pagination>' />

Pagination component enabling the user to select a specific page from
a range of pages.

- **Tag**: `<flint-pagination>`
- **Class**: `FlintPagination`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintPagination } from '@getufy/flint-ui';
```

### Usage

```html
<flint-pagination></flint-pagination>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `count` | `count` | `number` | `1` | Total number of pages. |
| `page` | `page` | `number` | `1` | The current page (1-based). In controlled mode, update this from the flint-pagination-change event. |
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
| `flint-pagination-change` | — | &#123; page: number &#125; when the active page changes. |

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
| `--flint-pagination-gap` | `4px` |
| `--flint-pagination-btn-size` | `36px` |
| `--flint-pagination-btn-radius` | `4px` |
| `--flint-pagination-btn-font-size` | `0.875rem` |
| `--flint-pagination-focus-ring-color` | `var(--flint-primary-color` |
| `--flint-pagination-active-bg` | `var(--flint-primary-color` |
| `--flint-pagination-active-color` | `var(--flint-text-color-on-primary` |
| `--flint-pagination-disabled-opacity` | `0.38` |
| `--flint-pagination-outlined-border` | `var(--flint-border-color` |
| `--flint-pagination-outlined-hover-bg` | `var(--flint-primary-color-light` |
| `--flint-pagination-outlined-hover-border` | `var(--flint-primary-color` |
| `--flint-pagination-active-bg-secondary` | `var(--flint-secondary-color` |
| `--flint-pagination-active-bg-standard` | `var(--flint-text-color` |
| `--flint-pagination-btn-radius-rounded` | `8px` |
| `--flint-pagination-btn-size-sm` | `28px` |
| `--flint-pagination-btn-font-size-sm` | `0.8125rem` |
| `--flint-pagination-btn-size-lg` | `44px` |
| `--flint-pagination-btn-font-size-lg` | `0.9375rem` |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |
| `--flint-text-color-muted` | — |

---
