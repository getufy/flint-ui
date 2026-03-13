# Collapsible

## `<ui-collapsible-trigger>`

Toggle button for a collapsible. Place inside `ui-collapsible`. Automatically wires up to the nearest `ui-collapsible` ancestor.

- **Tag**: `<ui-collapsible-trigger>`
- **Class**: `UiCollapsibleTrigger`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCollapsibleTrigger } from 'storybook-lit';
```

### Usage

```html
<ui-collapsible-trigger></ui-collapsible-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `expanded` | `expanded` | `boolean` | `false` | Reflects the parent collapsible's open state. Set by `ui-collapsible`. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the trigger. Set by `ui-collapsible` or directly. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Trigger label or any content (icon, text, avatar…). |

---

## `<ui-collapsible-content>`

The collapsible panel. Animates open/closed with a CSS grid transition. Place inside `ui-collapsible`; its `open` state is managed automatically.

- **Tag**: `<ui-collapsible-content>`
- **Class**: `UiCollapsibleContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCollapsibleContent } from 'storybook-lit';
```

### Usage

```html
<ui-collapsible-content></ui-collapsible-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the panel is visible. Managed by the parent `ui-collapsible`. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Content to reveal when expanded. |

---

## `<ui-collapsible>`

Root container for a collapsible panel. Manages open/closed state and coordinates child trigger and content.

- **Tag**: `<ui-collapsible>`
- **Class**: `UiCollapsible`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCollapsible } from 'storybook-lit';
```

### Usage

```html
<ui-collapsible></ui-collapsible>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the panel is open. Reflects to attribute for CSS targeting. |
| `defaultOpen` | `default-open` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` | Disables the trigger, preventing user interaction. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-collapsible-change` | — | Fired when the open state changes. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-collapsible-trigger`, `ui-collapsible-content`, and any |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-collapsible-duration` | `200ms` |
| `--ui-collapsible-easing` | `ease` |

### Methods

| Method | Description |
| --- | --- |
| `toggle()` | Toggle the open state and fire `ui-collapsible-change`. |

---
