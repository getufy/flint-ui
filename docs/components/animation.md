# Animation

flint-animation: a declarative wrapper that applies Web Animations API
animations to its slotted content.

- **Tag**: `<flint-animation>`
- **Class**: `FlintAnimation`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAnimation } from '@getufy/flint-ui';
```

### Usage

```html
<flint-animation></flint-animation>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `name` | `string` | `'fade-in'` | Animation preset name (e.g., 'fade-in', 'slide-up', 'bounce') or |
| `duration` | `duration` | `number` | `300` | Duration in milliseconds. |
| `easing` | `easing` | `string` | `'ease'` | CSS easing function. |
| `iterations` | `iterations` | `number` | `1` | Number of iterations. Use `Infinity` for infinite looping. |
| `delay` | `delay` | `number` | `0` | Delay before the animation starts, in milliseconds. |
| `fill` | `fill` | `FillMode` | `'both'` | Animation fill mode. |
| `direction` | `direction` | `PlaybackDirection` | `'normal'` | Animation direction. |
| `play` | `play` | `boolean` | `false` | Set to true to trigger/play the animation. |
| `playOnConnect` | `play-on-connect` | `boolean` | `false` | Whether to play the animation automatically on first render. |
| `keyframes` | `keyframes` | `Keyframe[] \| null` | `null` | Custom keyframes. When provided, overrides the `name` preset. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-animation-finish` | — | Dispatched when the animation finishes. |
| `flint-animation-cancel` | — | Dispatched when the animation is cancelled. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to animate. |

### Methods

| Method | Description |
| --- | --- |
| `cancel(): void` | Programmatically cancel the running animation. |
| `restart(): void` | Restart the animation from the beginning. |

---
