# Carousel

<Demo html="<div style=&quot;width:100%;max-width:500px&quot;><flint-carousel>  <flint-carousel-content>    <flint-carousel-item><div style=&quot;background:#e0e7ff;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#3730a3&quot;>Slide 1</div></flint-carousel-item>    <flint-carousel-item><div style=&quot;background:#dbeafe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#1e40af&quot;>Slide 2</div></flint-carousel-item>    <flint-carousel-item><div style=&quot;background:#e0f2fe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#0369a1&quot;>Slide 3</div></flint-carousel-item>  </flint-carousel-content>  <flint-carousel-previous></flint-carousel-previous>  <flint-carousel-next></flint-carousel-next></flint-carousel></div>" />

## `<flint-carousel-content>`

- **Tag**: `<flint-carousel-content>`
- **Class**: `FlintCarouselContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCarouselContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-carousel-content></flint-carousel-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `index` | `index` | `number` | `0` | Zero-based index of the first visible slide. |
| `itemsPerView` | `items-per-view` | `number` | `1` | Number of slides visible at once. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slide direction axis. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-primary-color` | — |
| `--flint-border-radius-md` | — |

---

## `<flint-carousel-item>`

- **Tag**: `<flint-carousel-item>`
- **Class**: `FlintCarouselItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCarouselItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-carousel-item></flint-carousel-item>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-carousel-items-per-view` | `1` |

---

## `<flint-carousel-previous>`

- **Tag**: `<flint-carousel-previous>`
- **Class**: `FlintCarouselPrevious`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCarouselPrevious } from '@getufy/flint-ui';
```

### Usage

```html
<flint-carousel-previous></flint-carousel-previous>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Whether the previous button is disabled. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slide direction axis, inherited from the parent carousel. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-carousel-next>`

- **Tag**: `<flint-carousel-next>`
- **Class**: `FlintCarouselNext`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCarouselNext } from '@getufy/flint-ui';
```

### Usage

```html
<flint-carousel-next></flint-carousel-next>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Whether the next button is disabled. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slide direction axis, inherited from the parent carousel. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-carousel>`

Carousel: a slideshow component for cycling through content.

- **Tag**: `<flint-carousel>`
- **Class**: `FlintCarousel`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCarousel } from '@getufy/flint-ui';
```

### Usage

```html
<flint-carousel></flint-carousel>
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
| `flint-carousel-change` | — | Fired when the active slide changes. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-carousel-gap` | `0px` |
| `--flint-carousel-duration` | `0.35s` |
| `--flint-carousel-ease` | `cubic-bezier(0.25, 0.1, 0.25, 1` |
| `--flint-carousel-height` | `320px` |
| `--flint-carousel-items-per-view` | `1` |

### Methods

| Method | Description |
| --- | --- |
| `next()` | Advance to the next slide. |
| `previous()` | Go to the previous slide. |
| `goTo(index: number)` | Jump to a specific slide (0-based index). |
| `currentIndex(): unknown` | Current slide index (read-only). |
| `total(): unknown` | Total number of slides (read-only). |

---
