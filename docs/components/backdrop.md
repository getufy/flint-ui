# Backdrop

<Demo html="<ui-button onclick=&quot;var b=this.nextElementSibling;b.open=true;b.addEventListener('close',function(){b.open=false},{once:true})&quot;>Show Backdrop</ui-button><ui-backdrop>  <div style=&quot;background:white;padding:24px;border-radius:8px;text-align:center&quot;>    <p style=&quot;margin:0 0 16px&quot;>Click outside or press Escape to close</p>    <ui-button onclick=&quot;this.closest('ui-backdrop').open=false&quot;>Close</ui-button>  </div></ui-backdrop>" />

A backdrop component that narrows the user's focus to a particular element.

- **Tag**: `<ui-backdrop>`
- **Class**: `UiBackdrop`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBackdrop } from 'storybook-lit';
```

### Usage

```html
<ui-backdrop></ui-backdrop>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` |  |
| `invisible` | `invisible` | `boolean` | `false` |  |
| `container` | `container` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `close` | — | Dispatched when the backdrop is clicked or Escape is pressed. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to display in the foreground. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-backdrop-position` | `fixed` |
| `--ui-backdrop-color` | — |
| `--ui-backdrop-z-index` | — |

---
