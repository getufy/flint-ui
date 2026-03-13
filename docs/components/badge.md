# Badge

<Demo label="Content">

<ui-badge content="4">
  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  </div>
</ui-badge>
<ui-badge content="99+" variant="error">
  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
  </div>
</ui-badge>

</Demo>

<Demo label="Variants">

<ui-badge content="3" variant="primary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="secondary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="success"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="warning"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>

</Demo>

<Demo label="Dot">

<ui-badge dot><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge dot variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>

</Demo>

A badge component that generates a small badge at the top-right of its children.

- **Tag**: `<ui-badge>`
- **Class**: `UiBadge`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiBadge } from 'storybook-lit';
```

### Usage

```html
<ui-badge></ui-badge>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `content` | `content` | `string` | `''` |  |
| `dot` | `dot` | `boolean` | `false` |  |
| `invisible` | `invisible` | `boolean` | `false` |  |
| `variant` | `variant` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning'` | `'primary'` |  |
| `max` | `max` | `number` | `99` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The content to which the badge is attached. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-badge-background` | `var(--ui-primary-color` |
| `--ui-badge-color` | `var(--ui-text-color-on-primary` |
| `--ui-font-family` | — |
| `--ui-surface-1` | — |
| `--ui-primary-color` | — |
| `--ui-secondary-color` | — |
| `--ui-error-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-success-color` | — |
| `--ui-warning-color` | — |

---
