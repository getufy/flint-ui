# Visually Hidden

<Demo html="<p style=&quot;margin:0;color:#374151&quot;>The link below has visually hidden text for screen readers:</p><a href=&quot;#&quot; style=&quot;color:var(--flint-primary-color)&quot;>  Download Report  <flint-visually-hidden>(opens in a new tab)</flint-visually-hidden></a>" />

- **Tag**: `<flint-visually-hidden>`
- **Class**: `FlintVisuallyHidden`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintVisuallyHidden } from 'flint-ui';
```

### Usage

```html
<flint-visually-hidden></flint-visually-hidden>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `notFocusable` | `not-focusable` | `boolean` | `false` | When `true`, the focus-reveal behaviour is disabled. The content stays hidden even if a focusable child receives keyboard focus. Set the `not-focusable` attribute (no value) to activate this mode. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
