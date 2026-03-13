# Card

<Demo>

<div style="max-width:360px;width:100%">
<ui-card>
  <ui-card-header title="Card Title" subtitle="Subtitle text"></ui-card-header>
  <ui-card-content>
    <p style="margin:0;color:#374151">This is a card with header, content, and action buttons.</p>
  </ui-card-content>
  <ui-card-actions>
    <ui-button variant="secondary" size="small">Cancel</ui-button>
    <ui-button size="small">Action</ui-button>
  </ui-card-actions>
</ui-card>
</div>

</Demo>

## `<ui-card-action-area>`

- **Tag**: `<ui-card-action-area>`
- **Class**: `UiCardActionArea`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCardActionArea } from 'storybook-lit';
```

### Usage

```html
<ui-card-action-area></ui-card-action-area>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-card-action-area-hover` | `var(--ui-hover-color` |
| `--ui-card-action-area-active` | `var(--ui-active-color` |
| `--ui-card-action-area-focus-ring` | `var(--ui-primary-color` |
| `--ui-text-color-muted` | — |
| `--ui-text-color` | — |

---

## `<ui-card-actions>`

- **Tag**: `<ui-card-actions>`
- **Class**: `UiCardActions`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCardActions } from 'storybook-lit';
```

### Usage

```html
<ui-card-actions></ui-card-actions>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-card-actions-padding` | `8px 16px` |

---

## `<ui-card-content>`

- **Tag**: `<ui-card-content>`
- **Class**: `UiCardContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCardContent } from 'storybook-lit';
```

### Usage

```html
<ui-card-content></ui-card-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-card-content-padding` | `16px 24px` |
| `--ui-card-content-size` | `1rem` |

---

## `<ui-card-header>`

- **Tag**: `<ui-card-header>`
- **Class**: `UiCardHeader`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCardHeader } from 'storybook-lit';
```

### Usage

```html
<ui-card-header></ui-card-header>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `title` | `string` | `''` |  |
| `subtitle` | `subtitle` | `string` | `''` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `avatar` |  |
| `action` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-card-header-padding` | `16px 24px` |

---

## `<ui-card-media>`

- **Tag**: `<ui-card-media>`
- **Class**: `UiCardMedia`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCardMedia } from 'storybook-lit';
```

### Usage

```html
<ui-card-media></ui-card-media>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `image` | `image` | `string` | `''` |  |
| `alt` | `alt` | `string` | `''` |  |
| `height` | `height` | `string` | `''` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-card-media-height` | `200px` |

---

## `<ui-card>`

- **Tag**: `<ui-card>`
- **Class**: `UiCard`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCard } from 'storybook-lit';
```

### Usage

```html
<ui-card></ui-card>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` |  |
| `interactive` | `interactive` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-card-action-area-hover` | `var(--ui-hover-color` |
| `--ui-card-action-area-active` | `var(--ui-active-color` |
| `--ui-card-action-area-focus-ring` | `var(--ui-primary-color` |
| `--ui-card-actions-padding` | `8px 16px` |
| `--ui-card-content-padding` | `16px 24px` |
| `--ui-card-content-size` | `1rem` |
| `--ui-card-header-padding` | `16px 24px` |
| `--ui-card-title-size` | `1.25rem` |
| `--ui-card-subtitle-size` | `0.875rem` |
| `--ui-card-media-height` | `200px` |
| `--ui-card-background` | — |
| `--ui-card-border-radius` | — |
| `--ui-card-shadow` | — |
| `--ui-card-border-color` | — |
| `--ui-card-padding` | `0` |
| `--ui-card-shadow-hover` | — |
| `--ui-card-background-flat` | — |

---
