# Hover Card

<Demo html='<flint-hover-card>  <flint-hover-card-trigger>    <flint-link href="#">Hover over me</flint-link>  </flint-hover-card-trigger>  <flint-hover-card-content>    <div style="padding:12px">      <p style="margin:0;font-weight:600">Hover Card</p>      <p style="margin:4px 0 0;color:#6b7280;font-size:14px">Additional information shown on hover.</p>    </div>  </flint-hover-card-content></flint-hover-card>' />

## `<flint-hover-card-trigger>`

Trigger element for a hover card. Place inside `flint-hover-card`.
Automatically wires up to the nearest `flint-hover-card` ancestor.

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
| `--flint-font-family` | — |

---

## `<flint-hover-card-trigger>`

The floating card panel. Position is controlled via `side` and `align`.
Place inside `flint-hover-card`; its `open` state is managed by the parent.

- **Tag**: `<flint-hover-card-trigger>`
- **Class**: `FlintHoverCardContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintHoverCardContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-hover-card-trigger></flint-hover-card-trigger>
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
| `(default)` | Rich content displayed inside the card. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-hovercard-bg` | — |
| `--flint-hovercard-border-color` | — |
| `--flint-hovercard-radius` | — |
| `--flint-hovercard-shadow` | — |
| `--flint-hovercard-padding` | — |
| `--flint-hovercard-min-width` | — |
| `--flint-hovercard-font-size` | — |
| `--flint-hovercard-color` | — |
| `--flint-hovercard-offset` | — |
| `--flint-hovercard-duration` | — |
| `--flint-hovercard-z-index` | — |

---

## `<flint-hover-card-trigger>`

Root container for a hover card.
Manages open/closed state with configurable open and close delays.

- **Tag**: `<flint-hover-card-trigger>`
- **Class**: `FlintHoverCard`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintHoverCard } from '@getufy/flint-ui';
```

### Usage

```html
<flint-hover-card-trigger></flint-hover-card-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `openDelay` | `open-delay` | `number` | `700` | Delay in milliseconds before the hover card opens. |
| `closeDelay` | `close-delay` | `number` | `300` | Delay in milliseconds before the hover card closes. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-hover-card-open` | `&#123; open: true &#125;` | Fired when the card becomes visible. detail: `&#123; open: true &#125;` |
| `flint-hover-card-close` | `&#123; open: false &#125;` | Fired when the card is dismissed. detail: `&#123; open: false &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-hover-card-trigger` and `flint-hover-card-content`. |

### Methods

| Method | Description |
| --- | --- |
| `handleTriggerEnter(): void` | Called by `flint-hover-card-trigger` when the pointer/focus enters. |
| `handleTriggerLeave(): void` | Called by `flint-hover-card-trigger` when the pointer/focus leaves. |
| `handleContentEnter(): void` | Called by `flint-hover-card-content` when the pointer enters the card. |
| `handleContentLeave(): void` | Called by `flint-hover-card-content` when the pointer leaves the card. |

---
