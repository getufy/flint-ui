# Empty

<Demo html='<div style="width:100%;max-width:400px"><flint-empty>  <flint-empty-title>No results found</flint-empty-title>  <flint-empty-description>Try adjusting your search or filter criteria.</flint-empty-description>  <flint-empty-content>    <flint-button variant="secondary" size="small">Clear Filters</flint-button>  </flint-empty-content></flint-empty></div>' />

## `<flint-empty-title>`

Displays the heading of an empty state.

- **Tag**: `<flint-empty-title>`
- **Class**: `FlintEmptyTitle`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintEmptyTitle } from '@getufy/flint-ui';
```

### Usage

```html
<flint-empty-title></flint-empty-title>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Title text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-text-color-muted` | — |
| `--flint-font-family` | — |
| `--flint-text-color` | — |

---

## `<flint-empty-description>`

Displays the descriptive text of an empty state.

- **Tag**: `<flint-empty-description>`
- **Class**: `FlintEmptyDescription`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintEmptyDescription } from '@getufy/flint-ui';
```

### Usage

```html
<flint-empty-description></flint-empty-description>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Description text. |

---

## `<flint-empty-media>`

Displays the media area of an empty state (icon, image, or avatar).

- **Tag**: `<flint-empty-media>`
- **Class**: `FlintEmptyMedia`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintEmptyMedia } from '@getufy/flint-ui';
```

### Usage

```html
<flint-empty-media></flint-empty-media>
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
| `--flint-empty-media-bg` | `var(--flint-surface-2` |
| `--flint-empty-media-color` | `var(--flint-text-color-muted` |

---

## `<flint-empty-header>`

Groups the media, title, and description of an empty state.

- **Tag**: `<flint-empty-header>`
- **Class**: `FlintEmptyHeader`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintEmptyHeader } from '@getufy/flint-ui';
```

### Usage

```html
<flint-empty-header></flint-empty-header>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-empty-media`, `flint-empty-title`, `flint-empty-description`. |

---

## `<flint-empty-content>`

Displays action content for an empty state (buttons, inputs, links).

- **Tag**: `<flint-empty-content>`
- **Class**: `FlintEmptyContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintEmptyContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-empty-content></flint-empty-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Action elements such as buttons or inputs. |

---

## `<flint-empty>`

Root container for an empty state. Wraps `flint-empty-header` and
`flint-empty-content` in a vertically centred flex column.

- **Tag**: `<flint-empty>`
- **Class**: `FlintEmpty`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintEmpty } from '@getufy/flint-ui';
```

### Usage

```html
<flint-empty></flint-empty>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-empty-header`, `flint-empty-content`, and any extra elements (e.g. a "Learn More" link). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-empty-padding` | — |
| `--flint-empty-gap` | — |
| `--flint-empty-max-width` | — |
| `--flint-empty-media-bg` | `var(--flint-surface-2` |
| `--flint-empty-media-color` | `var(--flint-text-color-muted` |

---
