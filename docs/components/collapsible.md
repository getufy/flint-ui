# Collapsible

<Demo label="Default Closed" html="<div style=&quot;width:100%;max-width:400px&quot;><flint-collapsible>  <flint-collapsible-trigger>    <flint-button variant=&quot;secondary&quot; style=&quot;width:100%&quot;>Click to expand</flint-button>  </flint-collapsible-trigger>  <flint-collapsible-content>    <div style=&quot;padding:12px 0;color:#374151&quot;>This content is revealed when you click the trigger above.</div>  </flint-collapsible-content></flint-collapsible></div>" />

<Demo label="Default Open" html="<div style=&quot;width:100%;max-width:400px&quot;><flint-collapsible default-open>  <flint-collapsible-trigger>    <flint-button variant=&quot;secondary&quot; style=&quot;width:100%&quot;>Click to collapse</flint-button>  </flint-collapsible-trigger>  <flint-collapsible-content>    <div style=&quot;padding:12px 0;color:#374151&quot;>This content starts visible and can be collapsed.</div>  </flint-collapsible-content></flint-collapsible></div>" />

## `<flint-collapsible-trigger>`

Toggle button for a collapsible. Place inside `flint-collapsible`. Automatically wires up to the nearest `flint-collapsible` ancestor.

- **Tag**: `<flint-collapsible-trigger>`
- **Class**: `FlintCollapsibleTrigger`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCollapsibleTrigger } from 'flint-ui';
```

### Usage

```html
<flint-collapsible-trigger></flint-collapsible-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `expanded` | `expanded` | `boolean` | `false` | Reflects the parent collapsible's open state. Set by `flint-collapsible`. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the trigger. Set by `flint-collapsible` or directly. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Trigger label or any content (icon, text, avatar…). |

---

## `<flint-collapsible-content>`

The collapsible panel. Animates open/closed with a CSS grid transition. Place inside `flint-collapsible`; its `open` state is managed automatically.

- **Tag**: `<flint-collapsible-content>`
- **Class**: `FlintCollapsibleContent`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCollapsibleContent } from 'flint-ui';
```

### Usage

```html
<flint-collapsible-content></flint-collapsible-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the panel is visible. Managed by the parent `flint-collapsible`. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to reveal when expanded. |

---

## `<flint-collapsible>`

Root container for a collapsible panel. Manages open/closed state and coordinates child trigger and content.

- **Tag**: `<flint-collapsible>`
- **Class**: `FlintCollapsible`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCollapsible } from 'flint-ui';
```

### Usage

```html
<flint-collapsible></flint-collapsible>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the panel is open. Reflects to attribute for CSS targeting. |
| `defaultOpen` | `default-open` | `boolean` | `false` | Sets the initial open state on first render. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the trigger, preventing user interaction. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-collapsible-change` | — | Fired when the open state changes. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-collapsible-trigger`, `flint-collapsible-content`, and any |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-collapsible-duration` | `200ms` |
| `--flint-collapsible-easing` | `ease` |

### Methods

| Method | Description |
| --- | --- |
| `toggle()` | Toggle the open state and fire `flint-collapsible-change`. |

---
