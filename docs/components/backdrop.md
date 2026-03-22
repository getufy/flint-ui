# Backdrop

<Demo html='<flint-button onclick="var b=this.nextElementSibling;b.open=true;b.addEventListener(&#39;flint-backdrop-close&#39;,function(){b.open=false},{once:true})">Show Backdrop</flint-button><flint-backdrop>  <div style="background:white;padding:24px;border-radius:8px;text-align:center">    <p style="margin:0 0 16px">Click outside or press Escape to close</p>    <flint-button onclick="this.closest(&#39;flint-backdrop&#39;).open=false">Close</flint-button>  </div></flint-backdrop>' />

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
| `flint-backdrop-close` | `&#123; open: false &#125;` | Dispatched when the backdrop is clicked or Escape is pressed. detail: `&#123; open: false &#125;` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to display in the foreground. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |
| `content` | The content container. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-backdrop-position` | `fixed` |
| `--flint-backdrop-color` | — |
| `--flint-backdrop-z-index` | — |
| `--flint-z-modal` | `1060` |

---
