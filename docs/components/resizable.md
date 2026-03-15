# Resizable

<Demo label="Horizontal" html='<div style="width:100%;max-width:500px"><flint-resizable-group orientation="horizontal" style="height:200px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">  <flint-resizable-panel default-size="40">    <div style="padding:16px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center">Panel A</div>  </flint-resizable-panel>  <flint-resizable-handle with-handle></flint-resizable-handle>  <flint-resizable-panel default-size="60">    <div style="padding:16px;height:100%;background:#fefce8;display:flex;align-items:center;justify-content:center">Panel B</div>  </flint-resizable-panel></flint-resizable-group></div>' />

<Demo label="Three Panels" html='<div style="width:100%;max-width:600px"><flint-resizable-group orientation="horizontal" style="height:180px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">  <flint-resizable-panel default-size="25">    <div style="padding:12px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center;font-size:14px">Sidebar</div>  </flint-resizable-panel>  <flint-resizable-handle with-handle></flint-resizable-handle>  <flint-resizable-panel default-size="50">    <div style="padding:12px;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px">Main</div>  </flint-resizable-panel>  <flint-resizable-handle with-handle></flint-resizable-handle>  <flint-resizable-panel default-size="25">    <div style="padding:12px;height:100%;background:#fef3c7;display:flex;align-items:center;justify-content:center;font-size:14px">Detail</div>  </flint-resizable-panel></flint-resizable-group></div>' />

## `<flint-resizable-group>`

Resizable Group: a container that enables resizable panels with draggable handles.

- **Tag**: `<flint-resizable-group>`
- **Class**: `FlintResizableGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintResizableGroup } from '@getufy/flint-ui';
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
| `flint-resizable-collapse` | — | Fired when a panel is collapsed. |
| `flint-resizable-expand` | — | Fired when a collapsed panel is expanded. |
| `flint-resizable-change` | — | Fired when panel sizes change via drag or keyboard. |

### Methods

| Method | Description |
| --- | --- |
| `getLayout(): number[]` | Returns a snapshot of panel sizes as percentages (0-100). |

---

## `<flint-resizable-panel>`

- **Tag**: `<flint-resizable-panel>`
- **Class**: `FlintResizablePanel`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintResizablePanel } from '@getufy/flint-ui';
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
| `collapsed` | `collapsed` | `boolean` | `false` | Whether the panel is currently collapsed via the programmatic API. |

### Methods

| Method | Description |
| --- | --- |
| `collapse(): void` | Collapse this panel to zero size, transferring its space to the adjacent |
| `expand(): void` | Expand this panel back to its previous size (or `defaultSize` as fallback). |
| `toggle(): void` | Toggle between collapsed and expanded states. |

---

## `<flint-resizable-handle>`

- **Tag**: `<flint-resizable-handle>`
- **Class**: `FlintResizableHandle`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintResizableHandle } from '@getufy/flint-ui';
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

---
