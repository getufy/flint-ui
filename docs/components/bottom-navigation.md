# Bottom Navigation

<Demo label="With Labels">

<div style="width:100%;max-width:400px">
<ui-bottom-navigation value="recents" show-labels>
  <ui-bottom-navigation-action label="Recents" value="recents">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  </ui-bottom-navigation-action>
  <ui-bottom-navigation-action label="Favorites" value="favs">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  </ui-bottom-navigation-action>
  <ui-bottom-navigation-action label="Nearby" value="nearby">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  </ui-bottom-navigation-action>
</ui-bottom-navigation>
</div>

</Demo>

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
