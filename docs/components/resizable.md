# Resizable

<Demo label="Horizontal">

<div style="width:100%;max-width:500px">
<ui-resizable-group orientation="horizontal" style="height:200px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <ui-resizable-panel default-size="40">
    <div style="padding:16px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center">Panel A</div>
  </ui-resizable-panel>
  <ui-resizable-handle with-handle></ui-resizable-handle>
  <ui-resizable-panel default-size="60">
    <div style="padding:16px;height:100%;background:#fefce8;display:flex;align-items:center;justify-content:center">Panel B</div>
  </ui-resizable-panel>
</ui-resizable-group>
</div>

</Demo>

<Demo label="Three Panels">

<div style="width:100%;max-width:600px">
<ui-resizable-group orientation="horizontal" style="height:180px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <ui-resizable-panel default-size="25">
    <div style="padding:12px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center;font-size:14px">Sidebar</div>
  </ui-resizable-panel>
  <ui-resizable-handle with-handle></ui-resizable-handle>
  <ui-resizable-panel default-size="50">
    <div style="padding:12px;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px">Main</div>
  </ui-resizable-panel>
  <ui-resizable-handle with-handle></ui-resizable-handle>
  <ui-resizable-panel default-size="25">
    <div style="padding:12px;height:100%;background:#fef3c7;display:flex;align-items:center;justify-content:center;font-size:14px">Detail</div>
  </ui-resizable-panel>
</ui-resizable-group>
</div>

</Demo>

## `<ui-resizable-group>`

- **Tag**: `<ui-resizable-group>`
- **Class**: `UiResizableGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiResizableGroup } from 'storybook-lit';
```

### Usage

```html
<ui-resizable-group></ui-resizable-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction — 'horizontal' (row) or 'vertical' (column). |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction for RTL support. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-resizable-collapse` | `{ index: idx, layout: this.getLayout() }` |  |
| `ui-resizable-expand` | `{ index: idx, layout: this.getLayout() }` |  |
| `ui-resizable-change` | `{ layout: this.getLayout() }` |  |

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

## `<ui-resizable-panel>`

- **Tag**: `<ui-resizable-panel>`
- **Class**: `UiResizablePanel`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiResizablePanel } from 'storybook-lit';
```

### Usage

```html
<ui-resizable-panel></ui-resizable-panel>
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

## `<ui-resizable-handle>`

- **Tag**: `<ui-resizable-handle>`
- **Class**: `UiResizableHandle`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiResizableHandle } from 'storybook-lit';
```

### Usage

```html
<ui-resizable-handle></ui-resizable-handle>
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
