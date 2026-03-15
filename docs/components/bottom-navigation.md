# Bottom Navigation

<Demo label="With Labels" html="<div style=&quot;width:100%;max-width:400px&quot;><flint-bottom-navigation value=&quot;recents&quot; show-labels>  <flint-bottom-navigation-action label=&quot;Recents&quot; value=&quot;recents&quot;>    <svg slot=&quot;icon&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot;></circle><polyline points=&quot;12 6 12 12 16 14&quot;></polyline></svg>  </flint-bottom-navigation-action>  <flint-bottom-navigation-action label=&quot;Favorites&quot; value=&quot;favs&quot;>    <svg slot=&quot;icon&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><path d=&quot;M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z&quot;></path></svg>  </flint-bottom-navigation-action>  <flint-bottom-navigation-action label=&quot;Nearby&quot; value=&quot;nearby&quot;>    <svg slot=&quot;icon&quot; width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><path d=&quot;M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z&quot;></path><circle cx=&quot;12&quot; cy=&quot;10&quot; r=&quot;3&quot;></circle></svg>  </flint-bottom-navigation-action></flint-bottom-navigation></div>" />

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
| `flint-bottom-navigation-change` | `{ value: number \| string }` | Dispatched when the selected value changes. detail: `{ value: number \| string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | destinations (flint-bottom-navigation-action). |

---
