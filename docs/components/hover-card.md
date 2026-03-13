# Hover Card

<Demo html="<ui-hover-card>  <ui-hover-card-trigger>    <ui-link href=&quot;#&quot;>Hover over me</ui-link>  </ui-hover-card-trigger>  <ui-hover-card-content>    <div style=&quot;padding:12px&quot;>      <p style=&quot;margin:0;font-weight:600&quot;>Hover Card</p>      <p style=&quot;margin:4px 0 0;color:#6b7280;font-size:14px&quot;>Additional information shown on hover.</p>    </div>  </ui-hover-card-content></ui-hover-card>" />

## `<ui-hover-card-trigger>`

Trigger element for a hover card. Place inside `ui-hover-card`. Automatically wires up to the nearest `ui-hover-card` ancestor.

- **Tag**: `<ui-hover-card-trigger>`
- **Class**: `UiHoverCardTrigger`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiHoverCardTrigger } from 'storybook-lit';
```

### Usage

```html
<ui-hover-card-trigger></ui-hover-card-trigger>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The element that activates the hover card (link, button, avatar…). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-hovercard-z-index` | `1000` |
| `--ui-hovercard-duration` | `150ms` |
| `--ui-hovercard-bg` | `var(--ui-surface-1` |
| `--ui-hovercard-border-color` | `var(--ui-border-color` |
| `--ui-hovercard-radius` | `8px` |
| `--ui-hovercard-shadow` | `0 4px 16px rgba(0, 0, 0, 0.12` |
| `--ui-hovercard-padding` | `16px` |
| `--ui-hovercard-min-width` | `200px` |
| `--ui-font-family` | — |
| `--ui-hovercard-font-size` | `0.875rem` |
| `--ui-hovercard-color` | `var(--ui-text-color` |

---

## `<ui-hover-card-content>`

- **Tag**: `<ui-hover-card-content>`
- **Class**: `UiHoverCardContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiHoverCardContent } from 'storybook-lit';
```

### Usage

```html
<ui-hover-card-content></ui-hover-card-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `side` | `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Which side of the trigger to display the card on. |
| `align` | `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the card along the cross axis relative to the trigger. |
| `open` | `open` | `boolean` | `false` | Whether the card is visible. Managed by the parent `ui-hover-card`. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-hover-card>`

Root container for a hover card. Manages open/closed state with configurable open and close delays.

- **Tag**: `<ui-hover-card>`
- **Class**: `UiHoverCard`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiHoverCard } from 'storybook-lit';
```

### Usage

```html
<ui-hover-card></ui-hover-card>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `openDelay` | `open-delay` | `number` | `700` | Delay in milliseconds before the hover card opens. |
| `closeDelay` | `close-delay` | `number` | `300` | Delay in milliseconds before the hover card closes. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-hover-card-open` | — | Fired when the card becomes visible. |
| `ui-hover-card-close` | — | Fired when the card is dismissed. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-hover-card-trigger` and `ui-hover-card-content`. |

### Methods

| Method | Description |
| --- | --- |
| `isOpen(): boolean` |  |

---
