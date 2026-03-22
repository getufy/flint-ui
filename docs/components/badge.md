# Badge

<Demo label="Content" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-badge content="4">  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>  </div></flint-badge><flint-badge content="99+" variant="error">  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>  </div></flint-badge></div>' />

<Demo label="Variants" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-badge content="3" variant="primary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge><flint-badge content="3" variant="secondary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge><flint-badge content="3" variant="success"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge><flint-badge content="3" variant="warning"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge><flint-badge content="3" variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge></div>' />

<Demo label="Dot" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-badge dot><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge><flint-badge dot variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge></div>' />

A badge component that generates a small badge at the top-right of its children.

- **Tag**: `<flint-badge>`
- **Class**: `FlintBadge`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintBadge } from '@getufy/flint-ui';
```

### Usage

```html
<flint-badge></flint-badge>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `content` | `content` | `string` | `''` | Text content displayed inside the badge. |
| `dot` | `dot` | `boolean` | `false` | Whether to display a small dot instead of content. |
| `invisible` | `invisible` | `boolean` | `false` | Whether the badge is hidden. |
| `variant` | `variant` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning'` | `'primary'` | Color variant of the badge. |
| `max` | `max` | `number` | `99` | Maximum numeric value before displaying "max+". |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The content to which the badge is attached. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-badge-background` | `var(--flint-primary-color` |
| `--flint-badge-color` | `var(--flint-text-color-on-primary` |
| `--flint-badge-border-color` | `var(--flint-background` |
| `--flint-font-family` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-secondary-color` | — |
| `--flint-text-color-on-secondary` | — |
| `--flint-error-color` | — |
| `--flint-success-color` | — |
| `--flint-warning-color` | — |

---
