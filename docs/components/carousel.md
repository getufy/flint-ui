# Carousel

<Demo html="<div style=&quot;width:100%;max-width:500px&quot;><ui-carousel>  <ui-carousel-content>    <ui-carousel-item><div style=&quot;background:#e0e7ff;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#3730a3&quot;>Slide 1</div></ui-carousel-item>    <ui-carousel-item><div style=&quot;background:#dbeafe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#1e40af&quot;>Slide 2</div></ui-carousel-item>    <ui-carousel-item><div style=&quot;background:#e0f2fe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#0369a1&quot;>Slide 3</div></ui-carousel-item>  </ui-carousel-content>  <ui-carousel-previous></ui-carousel-previous>  <ui-carousel-next></ui-carousel-next></ui-carousel></div>" />

## `<ui-carousel-content>`

- **Tag**: `<ui-carousel-content>`
- **Class**: `UiCarouselContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCarouselContent } from 'storybook-lit';
```

### Usage

```html
<ui-carousel-content></ui-carousel-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `index` | `index` | `number` | `0` |  |
| `itemsPerView` | `items-per-view` | `number` | `1` | Number of slides visible at once. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-primary-color` | — |
| `--ui-border-radius-md` | — |

---

## `<ui-carousel-item>`

- **Tag**: `<ui-carousel-item>`
- **Class**: `UiCarouselItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCarouselItem } from 'storybook-lit';
```

### Usage

```html
<ui-carousel-item></ui-carousel-item>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-carousel-items-per-view` | `1` |

---

## `<ui-carousel-previous>`

- **Tag**: `<ui-carousel-previous>`
- **Class**: `UiCarouselPrevious`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCarouselPrevious } from 'storybook-lit';
```

### Usage

```html
<ui-carousel-previous></ui-carousel-previous>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-carousel-next>`

- **Tag**: `<ui-carousel-next>`
- **Class**: `UiCarouselNext`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCarouselNext } from 'storybook-lit';
```

### Usage

```html
<ui-carousel-next></ui-carousel-next>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-carousel>`

- **Tag**: `<ui-carousel>`
- **Class**: `UiCarousel`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCarousel } from 'storybook-lit';
```

### Usage

```html
<ui-carousel></ui-carousel>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `loop` | `loop` | `boolean` | `false` | When true, navigation wraps from last slide back to first and vice versa. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slide direction axis. |
| `autoplay` | `autoplay` | `number` | `0` | Auto-advance interval in milliseconds. Set to 0 to disable. |
| `itemsPerView` | `items-per-view` | `number` | `1` | Number of slides visible simultaneously. |
| `label` | `label` | `string` | `'Carousel'` | Accessible label for the carousel region. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-carousel-change` | `{ index: this._currentIndex, total: this._total }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-carousel-gap` | `0px` |
| `--ui-carousel-duration` | `0.35s` |
| `--ui-carousel-ease` | `cubic-bezier(0.25, 0.1, 0.25, 1` |
| `--ui-carousel-height` | `320px` |
| `--ui-carousel-items-per-view` | `1` |

### Methods

| Method | Description |
| --- | --- |
| `next()` | Advance to the next slide. |
| `previous()` | Go to the previous slide. |
| `goTo(index: number)` | Jump to a specific slide (0-based index). |
| `currentIndex()` |  |
| `total()` |  |

---
