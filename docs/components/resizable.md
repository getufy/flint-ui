# Resizable

<Demo label="Horizontal" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-resizable-group orientation=&quot;horizontal&quot; style=&quot;height:200px;border:1px solid var(--flint-border-color, #e5e7eb);border-radius:8px;overflow:hidden&quot;>  <flint-resizable-panel default-size=&quot;40&quot;>    <div style=&quot;padding:16px;height:100%;background:var(--flint-primary-color-light, rgba(59,130,246,0.1));display:flex;align-items:center;justify-content:center;color:var(--flint-text-color, #111827)&quot;>Panel A</div>  </flint-resizable-panel>  <flint-resizable-handle with-handle></flint-resizable-handle>  <flint-resizable-panel default-size=&quot;60&quot;>    <div style=&quot;padding:16px;height:100%;background:var(--flint-hover-color, rgba(0,0,0,0.04));display:flex;align-items:center;justify-content:center;color:var(--flint-text-color, #111827)&quot;>Panel B</div>  </flint-resizable-panel></flint-resizable-group></div>" />

<Demo label="Three Panels" html="<div style=&quot;width:100%;max-width:600px&quot;><flint-resizable-group orientation=&quot;horizontal&quot; style=&quot;height:180px;border:1px solid var(--flint-border-color, #e5e7eb);border-radius:8px;overflow:hidden&quot;>  <flint-resizable-panel default-size=&quot;25&quot;>    <div style=&quot;padding:12px;height:100%;background:var(--flint-primary-color-light, rgba(59,130,246,0.1));display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--flint-text-color, #111827)&quot;>Sidebar</div>  </flint-resizable-panel>  <flint-resizable-handle with-handle></flint-resizable-handle>  <flint-resizable-panel default-size=&quot;50&quot;>    <div style=&quot;padding:12px;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--flint-text-color, #111827)&quot;>Main</div>  </flint-resizable-panel>  <flint-resizable-handle with-handle></flint-resizable-handle>  <flint-resizable-panel default-size=&quot;25&quot;>    <div style=&quot;padding:12px;height:100%;background:var(--flint-hover-color, rgba(0,0,0,0.04));display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--flint-text-color, #111827)&quot;>Detail</div>  </flint-resizable-panel></flint-resizable-group></div>" />

## `<flint-resizable-group>`

- **Tag**: `<flint-resizable-group>`
- **Class**: `FlintResizableGroup`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintResizableGroup } from 'flint-ui';
```

### Usage

```html
<flint-resizable-group></flint-resizable-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction — 'horizontal' (row) or 'vertical' (column). |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction for RTL support. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-resizable-collapse` | `{ index: idx, layout: this.getLayout() }` |  |
| `flint-resizable-expand` | `{ index: idx, layout: this.getLayout() }` |  |
| `flint-resizable-change` | `{ layout: this.getLayout() }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `host([orientation='vertical'])` |  |
| `getLayout(): number[]` | Returns a snapshot of panel sizes as percentages (0-100). |

---

## `<flint-resizable-panel>`

- **Tag**: `<flint-resizable-panel>`
- **Class**: `FlintResizablePanel`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintResizablePanel } from 'flint-ui';
```

### Usage

```html
<flint-resizable-panel></flint-resizable-panel>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | `size` | `number` | `0` | Current size as percentage (0–100). |
| `defaultSize` | `default-size` | `number` | `0` | Default size — applied once on first update. |
| `minSize` | `min-size` | `number` | `0` | Minimum size percentage (0–100). |
| `maxSize` | `max-size` | `number` | `100` | Maximum size percentage (0–100). |
| `collapsible` | `collapsible` | `boolean` | `false` | Whether the panel can collapse to zero size via drag. |
| `collapsed` | `collapsed` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `collapse()` |  |
| `expand()` |  |
| `toggle()` | * Toggle between collapsed and expanded states. |

---

## `<flint-resizable-handle>`

- **Tag**: `<flint-resizable-handle>`
- **Class**: `FlintResizableHandle`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintResizableHandle } from 'flint-ui';
```

### Usage

```html
<flint-resizable-handle></flint-resizable-handle>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `withHandle` | `with-handle` | `boolean` | `false` | Show a visible drag grip. |
| `disabled` | `disabled` | `boolean` | `false` | Disable interaction. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | @internal – set by parent group, reflects to attribute for CSS. |

### Methods

| Method | Description |
| --- | --- |
| `host(:hover)` |  |

---
