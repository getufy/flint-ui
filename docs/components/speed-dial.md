# Speed Dial

<Demo html="<div style=&quot;position:relative;height:200px;width:100%&quot;><flint-speed-dial style=&quot;position:absolute;bottom:16px;right:16px&quot; aria-label=&quot;Actions&quot;>  <flint-speed-dial-action tooltip-title=&quot;Copy&quot;>    <svg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><rect x=&quot;9&quot; y=&quot;9&quot; width=&quot;13&quot; height=&quot;13&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><path d=&quot;M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1&quot;></path></svg>  </flint-speed-dial-action>  <flint-speed-dial-action tooltip-title=&quot;Share&quot;>    <svg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><circle cx=&quot;18&quot; cy=&quot;5&quot; r=&quot;3&quot;></circle><circle cx=&quot;6&quot; cy=&quot;12&quot; r=&quot;3&quot;></circle><circle cx=&quot;18&quot; cy=&quot;19&quot; r=&quot;3&quot;></circle><line x1=&quot;8.59&quot; y1=&quot;13.51&quot; x2=&quot;15.42&quot; y2=&quot;17.49&quot;></line><line x1=&quot;15.41&quot; y1=&quot;6.51&quot; x2=&quot;8.59&quot; y2=&quot;10.49&quot;></line></svg>  </flint-speed-dial-action>  <flint-speed-dial-action tooltip-title=&quot;Print&quot;>    <svg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot;><polyline points=&quot;6 9 6 2 18 2 18 9&quot;></polyline><path d=&quot;M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2&quot;></path><rect x=&quot;6&quot; y=&quot;14&quot; width=&quot;12&quot; height=&quot;8&quot;></rect></svg>  </flint-speed-dial-action></flint-speed-dial></div>" />

## `<flint-speed-dial-action>`

A single action item inside a `flint-speed-dial`.

- **Tag**: `<flint-speed-dial-action>`
- **Class**: `FlintSpeedDialAction`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSpeedDialAction } from '@getufy/flint-ui';
```

### Usage

```html
<flint-speed-dial-action></flint-speed-dial-action>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `name` | `string` | `''` | Programmatic identifier for this action, included in the click event detail. |
| `tooltipTitle` | `tooltip-title` | `string` | `''` | Tooltip text shown alongside the action and used as aria-label. |
| `tooltipOpen` | `tooltip-open` | `boolean` | `false` | Forces the tooltip to be visible regardless of hover state. |
| `tooltipPlacement` | `tooltip-placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Tooltip placement relative to the action button. |
| `disabled` | `disabled` | `boolean` | `false` | If true, the action button is disabled. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-speed-dial-action-click` | — | Fired when the action button is clicked. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Icon content for the action button. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-speed-dial-action-size` | — |
| `--flint-speed-dial-action-gap` | — |
| `--flint-surface-1` | — |
| `--flint-text-color` | — |
| `--flint-surface-2` | — |
| `--flint-primary-color` | — |
| `--flint-tooltip-bg` | — |
| `--flint-tooltip-text-color` | — |
| `--flint-font-family` | — |
| `--flint-text-color-on-primary` | — |

---

## `<flint-speed-dial>`

Speed Dial — a FAB that reveals 3-6 related actions when pressed.

- **Tag**: `<flint-speed-dial>`
- **Class**: `FlintSpeedDial`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSpeedDial } from '@getufy/flint-ui';
```

### Usage

```html
<flint-speed-dial></flint-speed-dial>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the speed dial is open (controlled). |
| `defaultOpen` | `default-open` | `boolean` | `false` | Initial open state for uncontrolled usage. Sets `open` once on first render. |
| `direction` | `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Direction in which actions expand from the FAB (default 'up'). |
| `hidden` | `hidden` | `boolean` | `false` | Hides the entire speed dial component. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the FAB and prevents opening. |
| `persistentTooltips` | `persistent-tooltips` | `boolean` | `false` | When true, tooltips on all actions are always visible (good for touch/a11y). |
| `closeIcon` | `close-icon` | `string` | `''` | Custom char/text rendered as the ✕ close icon on the FAB. Falls back to built-in SVG. |
| `ariaLabel` | `aria-label` | `string` | `'Speed dial'` | ARIA label for the main FAB button. |
| `isTouch` | `is-touch` | `boolean` | `false` | True on touch-only devices (auto-detected unless explicitly set). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-speed-dial-open` | — | Fired when the dial opens. |
| `flint-speed-dial-close` | — | Fired when the dial closes. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `flint-speed-dial-action` elements. |
| `icon` | Icon shown on the FAB when closed (default: + SVG). |
| `open-icon` | Icon shown on the FAB when open (default: ✕ SVG). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-speed-dial-action-size` | — |
| `--flint-speed-dial-action-gap` | — |
| `--flint-speed-dial-size` | — |
| `--flint-speed-dial-bg` | — |
| `--flint-speed-dial-color` | — |
| `--flint-speed-dial-bg-hover` | `var(--flint-primary-color-hover` |

---
