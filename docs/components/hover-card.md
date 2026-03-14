# Hover Card

<Demo html="<flint-hover-card>  <flint-hover-card-trigger>    <flint-link href=&quot;#&quot;>Hover over me</flint-link>  </flint-hover-card-trigger>  <flint-hover-card-content>    <div style=&quot;padding:12px&quot;>      <p style=&quot;margin:0;font-weight:600&quot;>Hover Card</p>      <p style=&quot;margin:4px 0 0;color:#6b7280;font-size:14px&quot;>Additional information shown on hover.</p>    </div>  </flint-hover-card-content></flint-hover-card>" />

## `<flint-hover-card-trigger>`

Trigger element for a hover card. Place inside `flint-hover-card`. Automatically wires up to the nearest `flint-hover-card` ancestor.

- **Tag**: `<flint-hover-card-trigger>`
- **Class**: `FlintHoverCardTrigger`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintHoverCardTrigger } from '@getufy/flint-ui';
```

### Usage

```html
<flint-hover-card-trigger></flint-hover-card-trigger>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The element that activates the hover card (link, button, avatar…). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-hovercard-z-index` | `1000` |
| `--flint-hovercard-duration` | `150ms` |
| `--flint-hovercard-bg` | `var(--flint-surface-1` |
| `--flint-hovercard-border-color` | `var(--flint-border-color` |
| `--flint-hovercard-radius` | `8px` |
| `--flint-hovercard-shadow` | `0 4px 16px rgba(0, 0, 0, 0.12` |
| `--flint-hovercard-padding` | `16px` |
| `--flint-hovercard-min-width` | `200px` |
| `--flint-font-family` | — |
| `--flint-hovercard-font-size` | `0.875rem` |
| `--flint-hovercard-color` | `var(--flint-text-color` |

---

## `<flint-hover-card-content>`

- **Tag**: `<flint-hover-card-content>`
- **Class**: `FlintHoverCardContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintHoverCardContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-hover-card-content></flint-hover-card-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `side` | `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Which side of the trigger to display the card on. |
| `align` | `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the card along the cross axis relative to the trigger. |
| `open` | `open` | `boolean` | `false` | Whether the card is visible. Managed by the parent `flint-hover-card`. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-hover-card>`

Root container for a hover card. Manages open/closed state with configurable open and close delays.

- **Tag**: `<flint-hover-card>`
- **Class**: `FlintHoverCard`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintHoverCard } from '@getufy/flint-ui';
```

### Usage

```html
<flint-hover-card></flint-hover-card>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `openDelay` | `open-delay` | `number` | `700` | Delay in milliseconds before the hover card opens. |
| `closeDelay` | `close-delay` | `number` | `300` | Delay in milliseconds before the hover card closes. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-hover-card-open` | — | Fired when the card becomes visible. |
| `flint-hover-card-close` | — | Fired when the card is dismissed. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-hover-card-trigger` and `flint-hover-card-content`. |

### Methods

| Method | Description |
| --- | --- |
| `isOpen(): boolean` | Whether the card is currently open. |

---
