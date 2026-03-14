# App Bar

<Demo label="Regular" html="<div style=&quot;width:100%;max-width:600px&quot;><flint-app-bar title=&quot;My Application&quot; position=&quot;static&quot;>  <span slot=&quot;navigation&quot; style=&quot;font-size:20px;cursor:pointer&quot;>&#9776;</span>  <div slot=&quot;actions&quot;>    <flint-button variant=&quot;secondary&quot; size=&quot;small&quot;>Login</flint-button>  </div></flint-app-bar></div>" />

<Demo label="Dense" html="<div style=&quot;width:100%;max-width:600px&quot;><flint-app-bar title=&quot;Dense Bar&quot; position=&quot;static&quot; variant=&quot;dense&quot;>  <div slot=&quot;actions&quot;>    <flint-button variant=&quot;secondary&quot; size=&quot;small&quot;>Action</flint-button>  </div></flint-app-bar></div>" />

flint-app-bar: The top App bar provides content and actions related to the current screen.

- **Tag**: `<flint-app-bar>`
- **Class**: `FlintAppBar`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintAppBar } from 'flint-ui';
```

### Usage

```html
<flint-app-bar></flint-app-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `title` | `string` | `''` | The title text displayed in the app bar. |
| `position` | `position` | `'static' \| 'fixed' \| 'absolute' \| 'sticky'` | `'static'` | The CSS positioning strategy for the app bar. |
| `variant` | `variant` | `'regular' \| 'outlined'` | `'regular'` | The visual style variant of the app bar. |

### Slots

| Name | Description |
| --- | --- |
| `navigation` | Left-side content, typically a menu or back button. |
| `title` | Custom title content to replace the title property text. |
| `actions` | Right-side content, typically action buttons or icons. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-app-bar-height` | — |
| `--flint-app-bar-bg` | — |
| `--flint-app-bar-color` | — |
| `--flint-app-bar-shadow` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-shadow-md` | — |
| `--flint-surface-1` | — |
| `--flint-text-color` | — |
| `--flint-border-color` | — |
| `--flint-font-family` | — |

---
