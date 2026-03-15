# Visually Hidden

<Demo html='<p style="margin:0;color:#374151">The link below has visually hidden text for screen readers:</p><a href="#" style="color:var(--flint-primary-color)">  Download Report  <flint-visually-hidden>(opens in a new tab)</flint-visually-hidden></a>' />

Makes content accessible to assistive devices (screen readers) without
displaying it visually on screen.

- **Tag**: `<flint-visually-hidden>`
- **Class**: `FlintVisuallyHidden`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintVisuallyHidden } from '@getufy/flint-ui';
```

### Usage

```html
<flint-visually-hidden></flint-visually-hidden>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `notFocusable` | `not-focusable` | `boolean` | `false` | When true, disables the focus-reveal behaviour. Useful for pure SR-only text (e.g. "opens in a new window") that should never become visible, even when a containing element is focused. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The content to be visually hidden. |

---
