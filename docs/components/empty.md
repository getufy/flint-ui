# Empty

<Demo>

<div style="width:100%;max-width:400px">
<ui-empty>
  <ui-empty-title>No results found</ui-empty-title>
  <ui-empty-description>Try adjusting your search or filter criteria.</ui-empty-description>
  <ui-empty-content>
    <ui-button variant="secondary" size="small">Clear Filters</ui-button>
  </ui-empty-content>
</ui-empty>
</div>

</Demo>

## `<ui-empty-title>`

Displays the heading of an empty state.

- **Tag**: `<ui-empty-title>`
- **Class**: `UiEmptyTitle`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiEmptyTitle } from 'storybook-lit';
```

### Usage

```html
<ui-empty-title></ui-empty-title>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Title text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-text-color-muted` | — |
| `--ui-font-family` | — |
| `--ui-text-color` | — |

---

## `<ui-empty-description>`

Displays the descriptive text of an empty state.

- **Tag**: `<ui-empty-description>`
- **Class**: `UiEmptyDescription`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiEmptyDescription } from 'storybook-lit';
```

### Usage

```html
<ui-empty-description></ui-empty-description>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Description text. |

---

## `<ui-empty-media>`

Displays the media area of an empty state (icon, image, or avatar).

- **Tag**: `<ui-empty-media>`
- **Class**: `UiEmptyMedia`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiEmptyMedia } from 'storybook-lit';
```

### Usage

```html
<ui-empty-media></ui-empty-media>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'default' \| 'icon'` | `'default'` | Visual treatment for the media container. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Media content: icon, image, or avatar elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-empty-media-bg` | `var(--ui-surface-2` |
| `--ui-empty-media-color` | `var(--ui-text-color-muted` |

---

## `<ui-empty-header>`

Groups the media, title, and description of an empty state.

- **Tag**: `<ui-empty-header>`
- **Class**: `UiEmptyHeader`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiEmptyHeader } from 'storybook-lit';
```

### Usage

```html
<ui-empty-header></ui-empty-header>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-empty-media`, `ui-empty-title`, `ui-empty-description`. |

---

## `<ui-empty-content>`

Displays action content for an empty state (buttons, inputs, links).

- **Tag**: `<ui-empty-content>`
- **Class**: `UiEmptyContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiEmptyContent } from 'storybook-lit';
```

### Usage

```html
<ui-empty-content></ui-empty-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Action elements such as buttons or inputs. |

---

## `<ui-empty>`

Root container for an empty state. Wraps `ui-empty-header` and `ui-empty-content` in a vertically centred flex column.

- **Tag**: `<ui-empty>`
- **Class**: `UiEmpty`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiEmpty } from 'storybook-lit';
```

### Usage

```html
<ui-empty></ui-empty>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-empty-header`, `ui-empty-content`, and any extra |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-empty-media-bg` | `var(--ui-surface-2` |
| `--ui-empty-media-color` | `var(--ui-text-color-muted` |
| `--ui-empty-gap` | `16px` |
| `--ui-empty-padding` | `32px` |
| `--ui-empty-max-width` | `480px` |

---
