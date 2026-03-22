# Speed Dial

<Demo html='<div style="position:relative;height:200px;width:100%"><flint-speed-dial style="position:absolute;bottom:16px;right:16px" aria-label="Actions">  <flint-speed-dial-action tooltip-title="Copy">    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>  </flint-speed-dial-action>  <flint-speed-dial-action tooltip-title="Share">    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>  </flint-speed-dial-action>  <flint-speed-dial-action tooltip-title="Print">    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>  </flint-speed-dial-action></flint-speed-dial></div>' />

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

### CSS Parts

| Name | Description |
| --- | --- |
| `button` | The button element. |
| `tooltip` | The tooltip element. |

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
| `closeIcon` | `close-icon` | `string` | `''` | Custom char/text rendered as the x close icon on the FAB. Falls back to built-in SVG. |
| `ariaLabel` | `aria-label` | `string` | `'Speed dial'` | ARIA label for the main FAB button. |
| `isTouch` | `is-touch` | `boolean` | `false` | True on touch-only devices (auto-detected unless explicitly set). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-speed-dial-open` | `&#123; open: true &#125;` | Fired when the dial opens. detail: `&#123; open: true &#125;` |
| `flint-speed-dial-close` | `&#123; open: false &#125;` | Fired when the dial closes. detail: `&#123; open: false &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `flint-speed-dial-action` elements. |
| `icon` | Icon shown on the FAB when closed (default: + SVG). |
| `open-icon` | Icon shown on the FAB when open (default: x SVG). |

### CSS Parts

| Name | Description |
| --- | --- |
| `actions` | The actions container. |
| `button` | The FAB button element. |

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
