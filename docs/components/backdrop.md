# Backdrop

<Demo html="<flint-button onclick=&quot;var b=this.nextElementSibling;b.open=true;b.addEventListener('flint-backdrop-close',function(){b.open=false},{once:true})&quot;>Show Backdrop</flint-button><flint-backdrop>  <div style=&quot;background:white;padding:24px;border-radius:8px;text-align:center&quot;>    <p style=&quot;margin:0 0 16px&quot;>Click outside or press Escape to close</p>    <flint-button onclick=&quot;this.closest('flint-backdrop').open=false&quot;>Close</flint-button>  </div></flint-backdrop>" />

A backdrop component that narrows the user's focus to a particular element.

- **Tag**: `<flint-backdrop>`
- **Class**: `FlintBackdrop`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintBackdrop } from '@getufy/flint-ui';
```

### Usage

```html
<flint-backdrop></flint-backdrop>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the backdrop is visible and active. |
| `invisible` | `invisible` | `boolean` | `false` | When true, the backdrop overlay is transparent. |
| `container` | `container` | `boolean` | `false` | When true, the backdrop is scoped to its parent container instead of the viewport. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-backdrop-close` | — | Dispatched when the backdrop is clicked or Escape is pressed. detail: `{ open: false }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to display in the foreground. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-backdrop-position` | `fixed` |
| `--flint-backdrop-color` | — |
| `--flint-backdrop-z-index` | — |

---
