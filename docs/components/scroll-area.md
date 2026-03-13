# Scroll Area

## `<ui-scroll-bar>`

Custom overlay scrollbar. Place inside `ui-scroll-area` with `slot="scrollbar"` for an explicit horizontal or second-axis bar. The parent `ui-scroll-area` calls `setThumb()` and `setVisible()` to keep this element in sync with the viewport's scroll position.

- **Tag**: `<ui-scroll-bar>`
- **Class**: `UiScrollBar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiScrollBar } from 'storybook-lit';
```

### Usage

```html
<ui-scroll-bar></ui-scroll-bar>
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
| `--ui-scrollbar-track-color` | `transparent` |
| `--ui-scrollbar-thumb-radius` | `9999px` |
| `--ui-scrollbar-size` | `8px` |
| `--ui-scrollbar-thumb-color` | `rgba(0, 0, 0, 0.35` |
| `--ui-scrollbar-thumb-hover-color` | `rgba(0, 0, 0, 0.5` |

### Methods

| Method | Description |
| --- | --- |
| `setThumb(pos: number, size: number)` | Push updated thumb geometry from the parent scroll area. |
| `setVisible(visible: boolean)` | Show or hide the scrollbar (parent controls visibility). |

---

## `<ui-scroll-area>`

- **Tag**: `<ui-scroll-area>`
- **Class**: `UiScrollArea`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiScrollArea } from 'storybook-lit';
```

### Usage

```html
<ui-scroll-area></ui-scroll-area>
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
