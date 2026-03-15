# Bottom Navigation

<Demo label="With Labels" html='<div style="width:100%;max-width:400px"><flint-bottom-navigation value="recents" show-labels>  <flint-bottom-navigation-action label="Recents" value="recents">    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>  </flint-bottom-navigation-action>  <flint-bottom-navigation-action label="Favorites" value="favs">    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg>  </flint-bottom-navigation-action>  <flint-bottom-navigation-action label="Nearby" value="nearby">    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>  </flint-bottom-navigation-action></flint-bottom-navigation></div>' />

## `<flint-bottom-navigation-action>`

Bottom Navigation Action: Individual navigation item.

- **Tag**: `<flint-bottom-navigation-action>`
- **Class**: `FlintBottomNavigationAction`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintBottomNavigationAction } from '@getufy/flint-ui';
```

### Usage

```html
<flint-bottom-navigation-action></flint-bottom-navigation-action>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Label text for the action. |
| `value` | `value` | `unknown` | — | Unique value for this action. |
| `active` | `active` | `boolean` | `false` | If true, this action is currently selected. (Internal property managed by parent) |
| `showLabel` | `showLabel` | `boolean` | `true` | Controls label visibility. (Internal property managed by parent) |

### Slots

| Name | Description |
| --- | --- |
| `icon` | Icon element. |
| `(default)` | Label text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-text-color-muted` | — |
| `--flint-hover-color` | — |
| `--flint-primary-color` | — |
| `--flint-font-family` | — |
| `--flint-surface-1` | — |
| `--flint-shadow-lg` | — |

---

## `<flint-bottom-navigation>`

Bottom Navigation bars allow movement between primary destinations in an app.

- **Tag**: `<flint-bottom-navigation>`
- **Class**: `FlintBottomNavigation`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintBottomNavigation } from '@getufy/flint-ui';
```

### Usage

```html
<flint-bottom-navigation></flint-bottom-navigation>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `unknown` | — | The value of the currently selected action. |
| `defaultValue` | `default-value` | `unknown \| undefined` | — | Initial selected value for uncontrolled usage. |
| `showLabels` | `show-labels` | `boolean` | `false` | If true, all labels are shown at all times. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-bottom-navigation-change` | `&#123; value: number \| string &#125;` | Dispatched when the selected value changes. detail: `&#123; value: number \| string &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | destinations (flint-bottom-navigation-action). |

---
