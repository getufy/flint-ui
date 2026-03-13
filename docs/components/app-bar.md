# App Bar

<Demo label="Regular">

<div style="width:100%;max-width:600px">
<ui-app-bar title="My Application" position="static">
  <span slot="navigation" style="font-size:20px;cursor:pointer">&#9776;</span>
  <div slot="actions">
    <ui-button variant="secondary" size="small">Login</ui-button>
  </div>
</ui-app-bar>
</div>

</Demo>

<Demo label="Dense">

<div style="width:100%;max-width:600px">
<ui-app-bar title="Dense Bar" position="static" variant="dense">
  <div slot="actions">
    <ui-button variant="secondary" size="small">Action</ui-button>
  </div>
</ui-app-bar>
</div>

</Demo>

ui-app-bar: The top App bar provides content and actions related to the current screen.

- **Tag**: `<ui-app-bar>`
- **Class**: `UiAppBar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAppBar } from 'storybook-lit';
```

### Usage

```html
<ui-app-bar></ui-app-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `title` | `string` | `''` |  |
| `position` | `position` | `'static' \| 'fixed' \| 'absolute' \| 'sticky'` | `'static'` |  |
| `variant` | `variant` | `'regular' \| 'outlined'` | `'regular'` |  |

### Slots

| Name | Description |
| --- | --- |
| `navigation` |  |
| `title` |  |
| `actions` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-app-bar-height` | — |
| `--ui-app-bar-bg` | — |
| `--ui-app-bar-color` | — |
| `--ui-app-bar-shadow` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-shadow-md` | — |
| `--ui-surface-1` | — |
| `--ui-text-color` | — |
| `--ui-border-color` | — |
| `--ui-font-family` | — |

---
