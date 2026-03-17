# Card

<Demo label="Default" html='<div style="max-width:360px;width:100%"><flint-card>  <flint-card-header title="Card Title" subtitle="Subtitle text"></flint-card-header>  <flint-card-content>    <p style="margin:0;color:#374151">This is a card with header, content, and action buttons.</p>  </flint-card-content>  <flint-card-actions>    <flint-button variant="secondary" size="small">Cancel</flint-button>    <flint-button size="small">Action</flint-button>  </flint-card-actions></flint-card></div>' />

<Demo label="Outlined" html='<div style="max-width:360px;width:100%"><flint-card variant="outlined">  <flint-card-header title="Outlined Card" subtitle="With border instead of shadow"></flint-card-header>  <flint-card-content>    <p style="margin:0;color:#374151">Useful for less prominent content areas.</p>  </flint-card-content></flint-card></div>' />

## `<flint-card-action-area>`

- **Tag**: `<flint-card-action-area>`
- **Class**: `FlintCardActionArea`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCardActionArea } from '@getufy/flint-ui';
```

### Usage

```html
<flint-card-action-area></flint-card-action-area>
```

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-action-area-hover` | `var(--flint-hover-color` |
| `--flint-card-action-area-active` | `var(--flint-active-color` |
| `--flint-card-action-area-focus-ring` | `var(--flint-primary-color` |
| `--flint-text-color-muted` | — |
| `--flint-text-color` | — |
| `--flint-spacing-2` | `0.5rem` |
| `--flint-spacing-3` | `0.75rem` |

---

## `<flint-card-actions>`

- **Tag**: `<flint-card-actions>`
- **Class**: `FlintCardActions`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCardActions } from '@getufy/flint-ui';
```

### Usage

```html
<flint-card-actions></flint-card-actions>
```

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
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCardContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-card-content></flint-card-content>
```

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-content-padding` | `16px 24px` |
| `--flint-card-content-size` | `1rem` |

---

## `<flint-card-header>`

Card Header: the header section of a card.

- **Tag**: `<flint-card-header>`
- **Class**: `FlintCardHeader`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCardHeader } from '@getufy/flint-ui';
```

### Usage

```html
<flint-card-header></flint-card-header>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `title` | `string` | `''` | Plain text title. For rich content (icons, links), use the default slot instead. |
| `subtitle` | `subtitle` | `string` | `''` | Plain text subtitle. For rich content, use the `subtitle` named slot instead. |

### Slots

| Name | Description |
| --- | --- |
| `avatar` | Avatar or icon element. |
| `action` | Action element like an icon button. |
| `(default)` | Header text content. |

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
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCardMedia } from '@getufy/flint-ui';
```

### Usage

```html
<flint-card-media></flint-card-media>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `image` | `image` | `string` | `''` |  |
| `alt` | `alt` | `string` | `''` |  |
| `height` | `height` | `string` | `''` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-card-media-height` | `200px` |
| `--flint-card-media-object-fit` | `cover` |

---

## `<flint-card>`

A card container with optional interactive behavior.

- **Tag**: `<flint-card>`
- **Class**: `FlintCard`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintCard } from '@getufy/flint-ui';
```

### Usage

```html
<flint-card></flint-card>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Visual style variant of the card. |
| `interactive` | `interactive` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-card-click` | — | Fired when an interactive card is clicked or activated via keyboard (Enter/Space). |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Card content (header, content, actions, media sub-components). |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The card wrapper div. |

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
| `--flint-card-media-object-fit` | `cover` |
| `--flint-card-background` | — |
| `--flint-card-border-radius` | — |
| `--flint-card-shadow` | — |
| `--flint-card-border-color` | — |
| `--flint-card-overflow` | `visible` |
| `--flint-card-padding` | `0` |
| `--flint-card-shadow-hover` | — |
| `--flint-card-background-flat` | — |

---
