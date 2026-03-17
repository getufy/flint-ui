# Theme

Scopes CSS custom properties to a subtree for nested theme overrides.

- **Tag**: `<flint-theme>`
- **Class**: `FlintTheme`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTheme } from '@getufy/flint-ui';
```

### Usage

```html
<flint-theme></flint-theme>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `mode` | `mode` | `ThemeMode` | `'auto'` | Color mode override for this subtree. |
| `palette` | `palette` | `string \| undefined` | — | Palette override — swaps primary color tokens. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for child content. |

---
