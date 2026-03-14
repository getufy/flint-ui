# Card

<Demo label="Default" html="<div style=&quot;max-width:360px;width:100%&quot;><flint-card>  <flint-card-header title=&quot;Card Title&quot; subtitle=&quot;Subtitle text&quot;></flint-card-header>  <flint-card-content>    <p style=&quot;margin:0;color:#374151&quot;>This is a card with header, content, and action buttons.</p>  </flint-card-content>  <flint-card-actions>    <flint-button variant=&quot;secondary&quot; size=&quot;small&quot;>Cancel</flint-button>    <flint-button size=&quot;small&quot;>Action</flint-button>  </flint-card-actions></flint-card></div>" />

<Demo label="Outlined" html="<div style=&quot;max-width:360px;width:100%&quot;><flint-card variant=&quot;outlined&quot;>  <flint-card-header title=&quot;Outlined Card&quot; subtitle=&quot;With border instead of shadow&quot;></flint-card-header>  <flint-card-content>    <p style=&quot;margin:0;color:#374151&quot;>Useful for less prominent content areas.</p>  </flint-card-content></flint-card></div>" />

## `<flint-card-action-area>`

- **Tag**: `<flint-card-action-area>`
- **Class**: `FlintCardActionArea`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCardActionArea } from 'flint-ui';
```

### Usage

```html
<flint-card-action-area></flint-card-action-area>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-action-area-hover` | `var(--flint-hover-color` |
| `--flint-card-action-area-active` | `var(--flint-active-color` |
| `--flint-card-action-area-focus-ring` | `var(--flint-primary-color` |
| `--flint-text-color-muted` | — |
| `--flint-text-color` | — |

---

## `<flint-card-actions>`

- **Tag**: `<flint-card-actions>`
- **Class**: `FlintCardActions`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCardActions } from 'flint-ui';
```

### Usage

```html
<flint-card-actions></flint-card-actions>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-actions-padding` | `8px 16px` |

---

## `<flint-card-content>`

- **Tag**: `<flint-card-content>`
- **Class**: `FlintCardContent`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCardContent } from 'flint-ui';
```

### Usage

```html
<flint-card-content></flint-card-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-content-padding` | `16px 24px` |
| `--flint-card-content-size` | `1rem` |

---

## `<flint-card-header>`

- **Tag**: `<flint-card-header>`
- **Class**: `FlintCardHeader`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCardHeader } from 'flint-ui';
```

### Usage

```html
<flint-card-header></flint-card-header>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `title` | `string` | `''` | Title text displayed in the card header. |
| `subtitle` | `subtitle` | `string` | `''` | Subtitle text displayed below the title. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `avatar` | Slot for an avatar or icon displayed before the title. |
| `action` | Slot for action elements displayed at the end of the header. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-header-padding` | `16px 24px` |

---

## `<flint-card-media>`

- **Tag**: `<flint-card-media>`
- **Class**: `FlintCardMedia`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCardMedia } from 'flint-ui';
```

### Usage

```html
<flint-card-media></flint-card-media>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `image` | `image` | `string` | `''` | URL of the image to display. |
| `alt` | `alt` | `string` | `''` | Alt text for the image. |
| `height` | `height` | `string` | `''` | Height of the media area (accepts numbers or CSS values). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-media-height` | `200px` |

---

## `<flint-card>`

- **Tag**: `<flint-card>`
- **Class**: `FlintCard`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCard } from 'flint-ui';
```

### Usage

```html
<flint-card></flint-card>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Visual style variant of the card. |
| `interactive` | `interactive` | `boolean` | `false` | When true, adds hover and focus styles for clickable cards. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-action-area-hover` | `var(--flint-hover-color` |
| `--flint-card-action-area-active` | `var(--flint-active-color` |
| `--flint-card-action-area-focus-ring` | `var(--flint-primary-color` |
| `--flint-card-actions-padding` | `8px 16px` |
| `--flint-card-content-padding` | `16px 24px` |
| `--flint-card-content-size` | `1rem` |
| `--flint-card-header-padding` | `16px 24px` |
| `--flint-card-title-size` | `1.25rem` |
| `--flint-card-subtitle-size` | `0.875rem` |
| `--flint-card-media-height` | `200px` |
| `--flint-card-background` | — |
| `--flint-card-border-radius` | — |
| `--flint-card-shadow` | — |
| `--flint-card-border-color` | — |
| `--flint-card-padding` | `0` |
| `--flint-card-shadow-hover` | — |
| `--flint-card-background-flat` | — |

---
