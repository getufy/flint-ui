# Speed Dial

<Demo>

<div style="position:relative;height:200px;width:100%">
<ui-speed-dial style="position:absolute;bottom:16px;right:16px" aria-label="Actions">
  <ui-speed-dial-action tooltip-title="Copy">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  </ui-speed-dial-action>
  <ui-speed-dial-action tooltip-title="Share">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  </ui-speed-dial-action>
  <ui-speed-dial-action tooltip-title="Print">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
  </ui-speed-dial-action>
</ui-speed-dial>
</div>

</Demo>

## `<ui-speed-dial-action>`

A single action item inside a `ui-speed-dial`.

- **Tag**: `<ui-speed-dial-action>`
- **Class**: `UiSpeedDialAction`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSpeedDialAction } from 'storybook-lit';
```

### Usage

```html
<ui-speed-dial-action></ui-speed-dial-action>
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
| `ui-speed-dial-action-click` | — | Fired when the action button is clicked. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Icon content for the action button. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-speed-dial-action-size` | — |
| `--ui-speed-dial-action-gap` | — |
| `--ui-surface-1` | — |
| `--ui-text-color` | — |
| `--ui-surface-2` | — |
| `--ui-primary-color` | — |
| `--ui-tooltip-bg` | — |
| `--ui-tooltip-text-color` | — |
| `--ui-font-family` | — |
| `--ui-text-color-on-primary` | — |

---

## `<ui-speed-dial>`

Speed Dial — a FAB that reveals 3-6 related actions when pressed.

- **Tag**: `<ui-speed-dial>`
- **Class**: `UiSpeedDial`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSpeedDial } from 'storybook-lit';
```

### Usage

```html
<ui-speed-dial></ui-speed-dial>
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
| `ui-speed-dial-open` | — | Fired when the dial opens. |
| `ui-speed-dial-close` | — | Fired when the dial closes. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `ui-speed-dial-action` elements. |
| `icon` | Icon shown on the FAB when closed (default: + SVG). |
| `open-icon` | Icon shown on the FAB when open (default: ✕ SVG). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-speed-dial-action-size` | — |
| `--ui-speed-dial-action-gap` | — |
| `--ui-speed-dial-size` | — |
| `--ui-speed-dial-bg` | — |
| `--ui-speed-dial-color` | — |
| `--ui-speed-dial-bg-hover` | `var(--ui-primary-color-hover` |

---
