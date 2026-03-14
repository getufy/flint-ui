# Menubar

<Demo html="<div style=&quot;width:100%;max-width:500px&quot;><flint-menubar>  <flint-menubar-menu>    <flint-menubar-trigger>File</flint-menubar-trigger>    <flint-menubar-content>      <flint-menubar-item>New <flint-menubar-shortcut>Ctrl+N</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Open <flint-menubar-shortcut>Ctrl+O</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Save <flint-menubar-shortcut>Ctrl+S</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-separator></flint-menubar-separator>      <flint-menubar-item>Exit</flint-menubar-item>    </flint-menubar-content>  </flint-menubar-menu>  <flint-menubar-menu>    <flint-menubar-trigger>Edit</flint-menubar-trigger>    <flint-menubar-content>      <flint-menubar-item>Undo <flint-menubar-shortcut>Ctrl+Z</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Redo <flint-menubar-shortcut>Ctrl+Y</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-separator></flint-menubar-separator>      <flint-menubar-item>Cut <flint-menubar-shortcut>Ctrl+X</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Copy <flint-menubar-shortcut>Ctrl+C</flint-menubar-shortcut></flint-menubar-item>      <flint-menubar-item>Paste <flint-menubar-shortcut>Ctrl+V</flint-menubar-shortcut></flint-menubar-item>    </flint-menubar-content>  </flint-menubar-menu>  <flint-menubar-menu>    <flint-menubar-trigger>View</flint-menubar-trigger>    <flint-menubar-content>      <flint-menubar-item>Zoom In</flint-menubar-item>      <flint-menubar-item>Zoom Out</flint-menubar-item>      <flint-menubar-separator></flint-menubar-separator>      <flint-menubar-item>Full Screen</flint-menubar-item>    </flint-menubar-content>  </flint-menubar-menu></flint-menubar></div>" />

## `<flint-menubar-shortcut>`

Displays a keyboard shortcut hint inside a menu item.

- **Tag**: `<flint-menubar-shortcut>`
- **Class**: `FlintMenubarShortcut`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarShortcut } from 'flint-ui';
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
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarSeparator } from 'flint-ui';
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
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarGroup } from 'flint-ui';
```

### Usage

```html
<flint-menubar-group></flint-menubar-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `heading` | `heading` | `string` | `''` | Visible label displayed above the grouped items. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-menubar-item>`

A single interactive option inside a menubar dropdown.

- **Tag**: `<flint-menubar-item>`
- **Class**: `FlintMenubarItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarItem } from 'flint-ui';
```

### Usage

```html
<flint-menubar-item></flint-menubar-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Disables the item, making it non-interactive. |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether this item is visually highlighted via keyboard navigation. |
| `inset` | `inset` | `boolean` | `false` | Adds left padding to align with items that have a check/radio indicator. |
| `value` | `value` | `string` | `''` | Explicit value for the select event. Falls back to label text (excludes shortcut). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-item-select` | — | Fired on activation. detail: `{ value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label text plus optional `<flint-menubar-shortcut>`. |

### Methods

| Method | Description |
| --- | --- |
| `select()` | Activate the item — fires select event. |

---

## `<flint-menubar-checkbox-item>`

A toggleable checkbox menu item.

- **Tag**: `<flint-menubar-checkbox-item>`
- **Class**: `FlintMenubarCheckboxItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarCheckboxItem } from 'flint-ui';
```

### Usage

```html
<flint-menubar-checkbox-item></flint-menubar-checkbox-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` | Whether the checkbox is currently checked. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the checkbox item, making it non-interactive. |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether this item is visually highlighted via keyboard navigation. |
| `value` | `value` | `string` | `''` | Explicit value for the change event. Falls back to label text (excludes shortcut). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-checkbox-change` | — | detail: `{ checked: boolean, value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `toggle()` | Toggles the checked state and fires the change event. |

---

## `<flint-menubar-radio-item>`

A radio option inside a `<flint-menubar-radio-group>`.

- **Tag**: `<flint-menubar-radio-item>`
- **Class**: `FlintMenubarRadioItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarRadioItem } from 'flint-ui';
```

### Usage

```html
<flint-menubar-radio-item></flint-menubar-radio-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | The value associated with this radio option. |
| `checked` | `checked` | `boolean` | `false` | Whether this radio item is currently selected. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the radio item, making it non-interactive. |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether this item is visually highlighted via keyboard navigation. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `_menubar-radio-select` | `{ value: this.value }` | Internal event fired when the radio item is selected. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `select()` | Activates the radio item and fires the internal select event. |

---

## `<flint-menubar-radio-group>`

Manages single-select radio items.

- **Tag**: `<flint-menubar-radio-group>`
- **Class**: `FlintMenubarRadioGroup`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarRadioGroup } from 'flint-ui';
```

### Usage

```html
<flint-menubar-radio-group></flint-menubar-radio-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | The currently selected radio value in the group. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-menubar-radio-change` | — | detail: `{ value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-menubar-sub-content>`

The dropdown panel of a sub-menu. Positioned to the right of the trigger. Auto-flips left when the panel would overflow the viewport edge.

- **Tag**: `<flint-menubar-sub-content>`
- **Class**: `FlintMenubarSubContent`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarSubContent } from 'flint-ui';
```

### Usage

```html
<flint-menubar-sub-content></flint-menubar-sub-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the sub-content panel is visible. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-menubar-sub-trigger>`

Trigger for a sub-menu. Shows an arrow indicator.

- **Tag**: `<flint-menubar-sub-trigger>`
- **Class**: `FlintMenubarSubTrigger`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarSubTrigger } from 'flint-ui';
```

### Usage

```html
<flint-menubar-sub-trigger></flint-menubar-sub-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `highlighted` | `highlighted` | `boolean` | `false` | Whether this trigger is visually highlighted via keyboard navigation. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the sub-trigger, making it non-interactive. |
| `inset` | `inset` | `boolean` | `false` | Adds left padding to align with items that have a check/radio indicator. |
| `expanded` | `expanded` | `boolean` | `false` | Set by the parent `flint-menubar-sub` to reflect open state for aria-expanded. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-menubar-sub>`

Wraps a sub-trigger and sub-content pair. Opens on hover/focus and ArrowRight; closes on ArrowLeft or blur.

- **Tag**: `<flint-menubar-sub>`
- **Class**: `FlintMenubarSub`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarSub } from 'flint-ui';
```

### Usage

```html
<flint-menubar-sub></flint-menubar-sub>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `open()` | Returns whether the sub-menu is currently open. |
| `show()` | Opens the sub-menu after a short hover delay. |
| `showImmediate()` | Opens the sub-menu immediately without the hover delay. Use for keyboard interactions. |
| `hide()` | Closes the sub-menu after a short delay. |
| `hideImmediate()` | Closes the sub-menu immediately without any delay. |

---

## `<flint-menubar-content>`

The dropdown content panel for a menubar menu. Positioned absolutely below the trigger.

- **Tag**: `<flint-menubar-content>`
- **Class**: `FlintMenubarContent`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarContent } from 'flint-ui';
```

### Usage

```html
<flint-menubar-content></flint-menubar-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Whether the dropdown content panel is visible. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `_menubar-request-close` | — | Internal event requesting the parent menubar to close this menu. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-menubar-content-bg` | `var(--flint-surface-1` |

### Methods

| Method | Description |
| --- | --- |
| `resetHighlight()` | Clears all item highlighting in the content panel. |

---

## `<flint-menubar-trigger>`

The trigger button for a menubar menu.

- **Tag**: `<flint-menubar-trigger>`
- **Class**: `FlintMenubarTrigger`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarTrigger } from 'flint-ui';
```

### Usage

```html
<flint-menubar-trigger></flint-menubar-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Whether the trigger's associated menu is currently open. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the trigger button. |

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
| `setFocusable(v: boolean)` | Sets whether this trigger is reachable via Tab (roving tabindex). |

---

## `<flint-menubar-menu>`

Wraps a trigger and content pair for a single menu in the menubar.

- **Tag**: `<flint-menubar-menu>`
- **Class**: `FlintMenubarMenu`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubarMenu } from 'flint-ui';
```

### Usage

```html
<flint-menubar-menu></flint-menubar-menu>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Disables this menu: the trigger is non-interactive and keyboard nav skips it. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `open()` | Opens this menu's dropdown content. |
| `close()` | Closes this menu's dropdown content and any open sub-menus. |
| `isOpen(): boolean` | Returns whether this menu's content is currently open. |

---

## `<flint-menubar>`

A visually persistent horizontal menu bar, common in desktop applications. Hosts one or more `<flint-menubar-menu>` children.

- **Tag**: `<flint-menubar>`
- **Class**: `FlintMenubar`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMenubar } from 'flint-ui';
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
| `(default)` | One or more `<flint-menubar-menu>` elements. |

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
| `activeIndex(): number` | Returns the index of the currently open menu, or -1 if all closed. |
| `closeAll()` | Close all menus. |

---
