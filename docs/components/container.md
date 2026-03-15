# Container

<Demo label="Max Widths" html='<div style="width:100%;display:flex;flex-direction:column;gap:8px"><flint-container max-width="sm"><flint-paper elevation="1" style="padding:12px;text-align:center">sm</flint-paper></flint-container><flint-container max-width="md"><flint-paper elevation="1" style="padding:12px;text-align:center">md</flint-paper></flint-container><flint-container max-width="lg"><flint-paper elevation="1" style="padding:12px;text-align:center">lg</flint-paper></flint-container></div>' />

- **Tag**: `<flint-container>`
- **Class**: `FlintContainer`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintContainer } from '@getufy/flint-ui';
```

### Usage

```html
<flint-container></flint-container>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `maxWidth` | `max-width` | `ContainerMaxWidth` | `'lg'` | Determine the max-width of the container. |
| `disableGutters` | `disable-gutters` | `boolean` | `false` | If `true`, the left and right padding is removed. |
| `fixed` | `fixed` | `boolean` | `false` | Set the max-width to match the min-width of the current breakpoint. |

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
