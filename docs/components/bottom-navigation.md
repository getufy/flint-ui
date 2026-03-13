# Bottom Navigation

## `<ui-bottom-navigation-action>`

Bottom Navigation Action: Individual navigation item.

- **Tag**: `<ui-bottom-navigation-action>`
- **Class**: `UiBottomNavigationAction`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBottomNavigationAction } from 'storybook-lit';
```

### Usage

```html
<ui-bottom-navigation-action></ui-bottom-navigation-action>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | * Label text for the action. |
| `active` | `active` | `boolean` | `false` | * If true, this action is currently selected. (Internal property managed by parent) |
| `showLabel` | `show-label` | `boolean` | `true` | * Controls label visibility. (Internal property managed by parent) |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `icon` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-text-color-muted` | — |
| `--ui-hover-color` | — |
| `--ui-primary-color` | — |
| `--ui-font-family` | — |
| `--ui-surface-1` | — |
| `--ui-shadow-lg` | — |

---

## `<ui-bottom-navigation>`

Bottom Navigation bars allow movement between primary destinations in an app.

- **Tag**: `<ui-bottom-navigation>`
- **Class**: `UiBottomNavigation`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBottomNavigation } from 'storybook-lit';
```

### Usage

```html
<ui-bottom-navigation></ui-bottom-navigation>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `showLabels` | `show-labels` | `boolean` | `false` | * If true, all labels are shown at all times. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-bottom-navigation-change` | — | Dispatched when the selected value changes. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | destinations (ui-bottom-navigation-action). |

---
