# Scroll Area

<Demo html="<flint-scroll-area style=&quot;height:200px;width:100%;max-width:350px;border:1px solid #e5e7eb;border-radius:8px&quot;>  <div style=&quot;padding:16px&quot;>    <p style=&quot;margin:0 0 12px&quot;><strong>Scrollable Content</strong></p>    <p style=&quot;margin:0 0 12px&quot;>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>    <p style=&quot;margin:0 0 12px&quot;>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>    <p style=&quot;margin:0 0 12px&quot;>Ut enim ad minim veniam, quis nostrud exercitation.</p>    <p style=&quot;margin:0 0 12px&quot;>Duis aute irure dolor in reprehenderit in voluptate.</p>    <p style=&quot;margin:0 0 12px&quot;>Excepteur sint occaecat cupidatat non proident.</p>    <p style=&quot;margin:0&quot;>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>  </div></flint-scroll-area>" />

## `<flint-scroll-bar>`

Custom overlay scrollbar. Place inside `flint-scroll-area` with `slot="scrollbar"` for an explicit horizontal or second-axis bar. The parent `flint-scroll-area` calls `setThumb()` and `setVisible()` to keep this element in sync with the viewport's scroll position.

- **Tag**: `<flint-scroll-bar>`
- **Class**: `FlintScrollBar`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintScrollBar } from 'flint-ui';
```

### Usage

```html
<flint-scroll-bar></flint-scroll-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Which axis this scrollbar controls. Reflects to attribute. |

### Slots

| Name | Description |
| --- | --- |
| `—` | none (fully shadow DOM) |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-scrollbar-track-color` | `transparent` |
| `--flint-scrollbar-thumb-radius` | `9999px` |
| `--flint-scrollbar-size` | `8px` |
| `--flint-scrollbar-thumb-color` | `rgba(0, 0, 0, 0.35` |
| `--flint-scrollbar-thumb-hover-color` | `rgba(0, 0, 0, 0.5` |

### Methods

| Method | Description |
| --- | --- |
| `setThumb(pos: number, size: number)` | Push updated thumb geometry from the parent scroll area. |
| `setVisible(visible: boolean)` | Show or hide the scrollbar (parent controls visibility). |

---

## `<flint-scroll-area>`

- **Tag**: `<flint-scroll-area>`
- **Class**: `FlintScrollArea`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintScrollArea } from 'flint-ui';
```

### Usage

```html
<flint-scroll-area></flint-scroll-area>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | `type` | `'auto' \| 'always' \| 'scroll' \| 'hover'` | `'hover'` |  |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction. `'rtl'` flips the vertical bar to the left side. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `scrollbar` |  |

### Methods

| Method | Description |
| --- | --- |
| `scrollTo(optionsOrX?: ScrollToOptions \| number, y?: number)` |  |
| `scrollBy(optionsOrX?: ScrollToOptions \| number, y?: number)` |  |

---
