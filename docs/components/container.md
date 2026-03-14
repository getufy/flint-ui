# Container

<Demo label="Max Widths" html="<div style=&quot;width:100%;display:flex;flex-direction:column;gap:8px&quot;><flint-container max-width=&quot;sm&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>sm</flint-paper></flint-container><flint-container max-width=&quot;md&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>md</flint-paper></flint-container><flint-container max-width=&quot;lg&quot;><flint-paper elevation=&quot;1&quot; style=&quot;padding:12px;text-align:center&quot;>lg</flint-paper></flint-container></div>" />

- **Tag**: `<flint-container>`
- **Class**: `FlintContainer`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintContainer } from 'flint-ui';
```

### Usage

```html
<flint-container></flint-container>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disableGutters` | `disable-gutters` | `boolean` | `false` | * If `true`, the left and right padding is removed. |
| `fixed` | `fixed` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-container-padding` | `16px` |
| `--flint-container-padding-sm` | `24px` |
| `--flint-container-xs` | `444px` |
| `--flint-container-sm` | `600px` |
| `--flint-container-md` | `900px` |
| `--flint-container-lg` | `1200px` |
| `--flint-container-xl` | `1536px` |

---
