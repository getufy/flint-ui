# Menubar

<Demo html="<div style=&quot;width:100%;max-width:500px&quot;><flint-menubar>  <flint-menubar-menu>    <flint-menubar-trigger>File</flint-menubar-trigger>    <flint-menubar-content>      <flint-menubar-item>New <flint-menubar-shortcut>Ctrl+N</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Open <flint-menubar-shortcut>Ctrl+O</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Save <flint-menubar-shortcut>Ctrl+S</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-separator></flint-menubar-separator>      <flint-menubar-item>Exit</flint-menubar-item>    </flint-menubar-content>  </flint-menubar-menu>  <flint-menubar-menu>    <flint-menubar-trigger>Edit</flint-menubar-trigger>    <flint-menubar-content>      <flint-menubar-item>Undo <flint-menubar-shortcut>Ctrl+Z</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Redo <flint-menubar-shortcut>Ctrl+Y</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-separator></flint-menubar-separator>      <flint-menubar-item>Cut <flint-menubar-shortcut>Ctrl+X</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Copy <flint-menubar-shortcut>Ctrl+C</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Paste <flint-menubar-shortcut>Ctrl+V</flint-menubar-shortcut></flint-menubar-item>    </flint-menubar-content>  </flint-menubar-menu>  <flint-menubar-menu>    <flint-menubar-trigger>View</flint-menubar-trigger>    <flint-menubar-content>      <flint-menubar-item>Zoom In</flint-menubar-item>      <flint-menubar-item>Zoom Out</flint-menubar-item>      <flint-menubar-separator></flint-menubar-separator>      <flint-menubar-item>Full Screen</flint-menubar-item>    </flint-menubar-content>  </flint-menubar-menu></flint-menubar></div>" />

## `<flint-menubar-shortcut>`

Displays a keyboard shortcut hint inside a menu item.

- **Tag**: `<flint-menubar-shortcut>`
- **Class**: `FlintMenubarShortcut`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarShortcut } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-shortcut></flint-menubar-shortcut>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Shortcut text, e.g. `⌘T` or `Ctrl+N`. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-text-color` | — |
| `--flint-font-family` | — |
| `--flint-border-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-primary-color` | — |

---

## `<flint-menubar-separator>`

A hairline separator between menu groups.

- **Tag**: `<flint-menubar-separator>`
- **Class**: `FlintMenubarSeparator`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarSeparator } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-separator></flint-menubar-separator>
```

---

## `<flint-menubar-group>`

Groups related menu items. Optional `heading` shows a label.

- **Tag**: `<flint-menubar-group>`
- **Class**: `FlintMenubarGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarGroup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-group></flint-menubar-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `heading` | `heading` | `string` | `''` | Label text displayed above the group. |

---

## `<flint-menubar-item>`

A single interactive option inside a menubar dropdown.

- **Tag**: `<flint-menubar-item>`
- **Class**: `FlintMenubarItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-item></flint-menubar-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Whether the item is non-interactive. |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether the item is visually highlighted (e.g. via keyboard or hover). |
| `inset` | `inset` | `boolean` | `false` | Whether the item label is inset to align with checkbox/radio items. |
| `value` | `value` | `string` | `''` | Explicit value for the select event. Falls back to label text (excludes shortcut). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-item-select` | `{ value: string }` | Fired on activation. detail: `{ value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label text plus optional `&lt;flint-menubar-shortcut&gt;`. |

### Methods

| Method | Description |
| --- | --- |
| `select(): void` | Activate the item — fires select event. |

---

## `<flint-menubar-checkbox-item>`

A toggleable checkbox menu item.

- **Tag**: `<flint-menubar-checkbox-item>`
- **Class**: `FlintMenubarCheckboxItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarCheckboxItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-checkbox-item></flint-menubar-checkbox-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` | Whether the checkbox item is currently checked. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the item is non-interactive. |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether the item is visually highlighted (e.g. via keyboard or hover). |
| `value` | `value` | `string` | `''` | Explicit value for the change event. Falls back to label text (excludes shortcut). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-checkbox-change` | `{ checked: boolean, value: string }` | detail: `{ checked: boolean, value: string }` |

### Methods

| Method | Description |
| --- | --- |
| `toggle(): void` |  |

---

## `<flint-menubar-radio-item>`

A radio option inside a `<flint-menubar-radio-group>`.

- **Tag**: `<flint-menubar-radio-item>`
- **Class**: `FlintMenubarRadioItem`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarRadioItem } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-radio-item></flint-menubar-radio-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Value identifying this radio option within its group. |
| `checked` | `checked` | `boolean` | `false` | Whether this radio item is currently selected. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the item is non-interactive. |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether the item is visually highlighted (e.g. via keyboard or hover). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-radio-select` | — |  |

### Methods

| Method | Description |
| --- | --- |
| `select(): void` |  |

---

## `<flint-menubar-radio-group>`

Manages single-select radio items.

- **Tag**: `<flint-menubar-radio-group>`
- **Class**: `FlintMenubarRadioGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarRadioGroup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-radio-group></flint-menubar-radio-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | The value of the currently selected radio item. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-radio-change` | `{ value: string }` | detail: `{ value: string }` |

---

## `<flint-menubar-sub-content>`

The dropdown panel of a sub-menu. Positioned to the right of the trigger.
Auto-flips left when the panel would overflow the viewport edge.

- **Tag**: `<flint-menubar-sub-content>`
- **Class**: `FlintMenubarSubContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarSubContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-sub-content></flint-menubar-sub-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the sub-menu dropdown panel is visible. |

---

## `<flint-menubar-sub-trigger>`

Trigger for a sub-menu. Shows an arrow indicator.

- **Tag**: `<flint-menubar-sub-trigger>`
- **Class**: `FlintMenubarSubTrigger`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarSubTrigger } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-sub-trigger></flint-menubar-sub-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether the trigger is visually highlighted (e.g. via keyboard or hover). |
| `disabled` | `disabled` | `boolean` | `false` | Whether the trigger is non-interactive. |
| `inset` | `inset` | `boolean` | `false` | Whether the trigger label is inset to align with checkbox/radio items. |
| `expanded` | `expanded` | `boolean` | `false` | Set by the parent `flint-menubar-sub` to reflect open state for aria-expanded. |

---

## `<flint-menubar-sub>`

Wraps a sub-trigger and sub-content pair.
Opens on hover/focus and ArrowRight; closes on ArrowLeft or blur.

- **Tag**: `<flint-menubar-sub>`
- **Class**: `FlintMenubarSub`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarSub } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-sub></flint-menubar-sub>
```

### Methods

| Method | Description |
| --- | --- |
| `show(): void` |  |
| `showImmediate(): void` | Opens the sub-menu immediately without the hover delay. Use for keyboard interactions. |
| `hide(): void` |  |
| `hideImmediate(): void` |  |

---

## `<flint-menubar-content>`

The dropdown content panel for a menubar menu.
Positioned absolutely below the trigger.

- **Tag**: `<flint-menubar-content>`
- **Class**: `FlintMenubarContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-content></flint-menubar-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the content dropdown panel is visible. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-request-close` | — |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-menubar-content-bg` | `var(--flint-surface-1` |

### Methods

| Method | Description |
| --- | --- |
| `handleKeyDown(e: KeyboardEvent): void` | Handle keyboard navigation inside the content panel. |
| `resetHighlight(): void` |  |

---

## `<flint-menubar-trigger>`

The trigger button for a menubar menu.

- **Tag**: `<flint-menubar-trigger>`
- **Class**: `FlintMenubarTrigger`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarTrigger } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-trigger></flint-menubar-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Whether the trigger's associated menu is currently open. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the trigger is non-interactive. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Trigger label text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-menubar-trigger-hover-bg` | `var(--flint-hover-color` |

### Methods

| Method | Description |
| --- | --- |
| `setFocusable(v: boolean): void` |  |

---

## `<flint-menubar-menu>`

Wraps a trigger and content pair for a single menu in the menubar.

- **Tag**: `<flint-menubar-menu>`
- **Class**: `FlintMenubarMenu`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubarMenu } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar-menu></flint-menubar-menu>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Disables this menu: the trigger is non-interactive and keyboard nav skips it. |

### Methods

| Method | Description |
| --- | --- |
| `open(): void` |  |
| `close(): void` |  |

---

## `<flint-menubar>`

A visually persistent horizontal menu bar, common in desktop applications.
Hosts one or more `<flint-menubar-menu>` children.

- **Tag**: `<flint-menubar>`
- **Class**: `FlintMenubar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMenubar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-menubar></flint-menubar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Accessible label for the menubar region. Defaults to "Menu bar". |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-item-select` | — | Bubbles from items. |
| `flint-menubar-checkbox-change` | — | Bubbles from checkbox items. |
| `flint-menubar-radio-change` | — | Bubbles from radio groups. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | One or more `&lt;flint-menubar-menu&gt;` elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-menubar-highlight-bg` | `var(--flint-hover-color` |
| `--flint-menubar-content-bg` | `var(--flint-surface-1` |
| `--flint-menubar-trigger-hover-bg` | `var(--flint-hover-color` |
| `--flint-menubar-bg` | `var(--flint-surface-1` |

### Methods

| Method | Description |
| --- | --- |
| `closeAll(): void` | Close all menus. |

---
