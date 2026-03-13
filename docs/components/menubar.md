# Menubar

<Demo>

<div style="width:100%;max-width:500px">
<ui-menubar>
  <ui-menubar-menu>
    <ui-menubar-trigger>File</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>New <ui-menubar-shortcut>Ctrl+N</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Open <ui-menubar-shortcut>Ctrl+O</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Save <ui-menubar-shortcut>Ctrl+S</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-separator></ui-menubar-separator>
      <ui-menubar-item>Exit</ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
  <ui-menubar-menu>
    <ui-menubar-trigger>Edit</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>Undo <ui-menubar-shortcut>Ctrl+Z</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Redo <ui-menubar-shortcut>Ctrl+Y</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-separator></ui-menubar-separator>
      <ui-menubar-item>Cut <ui-menubar-shortcut>Ctrl+X</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Copy <ui-menubar-shortcut>Ctrl+C</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Paste <ui-menubar-shortcut>Ctrl+V</ui-menubar-shortcut></ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
  <ui-menubar-menu>
    <ui-menubar-trigger>View</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>Zoom In</ui-menubar-item>
      <ui-menubar-item>Zoom Out</ui-menubar-item>
      <ui-menubar-separator></ui-menubar-separator>
      <ui-menubar-item>Full Screen</ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
</ui-menubar>
</div>

</Demo>

## `<ui-menubar-shortcut>`

Displays a keyboard shortcut hint inside a menu item.

- **Tag**: `<ui-menubar-shortcut>`
- **Class**: `UiMenubarShortcut`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarShortcut } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-shortcut></ui-menubar-shortcut>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Shortcut text, e.g. `⌘T` or `Ctrl+N`. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-text-color` | — |
| `--ui-font-family` | — |
| `--ui-border-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-primary-color` | — |

---

## `<ui-menubar-separator>`

A hairline separator between menu groups.

- **Tag**: `<ui-menubar-separator>`
- **Class**: `UiMenubarSeparator`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarSeparator } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-separator></ui-menubar-separator>
```

---

## `<ui-menubar-group>`

Groups related menu items. Optional `heading` shows a label.

- **Tag**: `<ui-menubar-group>`
- **Class**: `UiMenubarGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarGroup } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-group></ui-menubar-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `heading` | `heading` | `string` | `''` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-menubar-item>`

A single interactive option inside a menubar dropdown.

- **Tag**: `<ui-menubar-item>`
- **Class**: `UiMenubarItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarItem } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-item></ui-menubar-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `highlighted` | `highlighted` | `boolean` | `false` |  |
| `inset` | `inset` | `boolean` | `false` |  |
| `value` | `value` | `string` | `''` | Explicit value for the select event. Falls back to label text (excludes shortcut). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-menubar-item-select` | — | Fired on activation. detail: `{ value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label text plus optional `<ui-menubar-shortcut>`. |

### Methods

| Method | Description |
| --- | --- |
| `select()` | Activate the item — fires select event. |

---

## `<ui-menubar-checkbox-item>`

A toggleable checkbox menu item.

- **Tag**: `<ui-menubar-checkbox-item>`
- **Class**: `UiMenubarCheckboxItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarCheckboxItem } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-checkbox-item></ui-menubar-checkbox-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `highlighted` | `highlighted` | `boolean` | `false` |  |
| `value` | `value` | `string` | `''` | Explicit value for the change event. Falls back to label text (excludes shortcut). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-menubar-checkbox-change` | — | detail: `{ checked: boolean, value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `toggle()` |  |

---

## `<ui-menubar-radio-item>`

A radio option inside a `<ui-menubar-radio-group>`.

- **Tag**: `<ui-menubar-radio-item>`
- **Class**: `UiMenubarRadioItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarRadioItem } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-radio-item></ui-menubar-radio-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `checked` | `checked` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `highlighted` | `highlighted` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `_menubar-radio-select` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `select()` |  |

---

## `<ui-menubar-radio-group>`

Manages single-select radio items.

- **Tag**: `<ui-menubar-radio-group>`
- **Class**: `UiMenubarRadioGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarRadioGroup } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-radio-group></ui-menubar-radio-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-menubar-radio-change` | — | detail: `{ value: string }` |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-menubar-sub-content>`

The dropdown panel of a sub-menu. Positioned to the right of the trigger. Auto-flips left when the panel would overflow the viewport edge.

- **Tag**: `<ui-menubar-sub-content>`
- **Class**: `UiMenubarSubContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarSubContent } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-sub-content></ui-menubar-sub-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-menubar-sub-trigger>`

Trigger for a sub-menu. Shows an arrow indicator.

- **Tag**: `<ui-menubar-sub-trigger>`
- **Class**: `UiMenubarSubTrigger`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarSubTrigger } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-sub-trigger></ui-menubar-sub-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `highlighted` | `highlighted` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `inset` | `inset` | `boolean` | `false` |  |
| `expanded` | `expanded` | `boolean` | `false` | Set by the parent `ui-menubar-sub` to reflect open state for aria-expanded. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-menubar-sub>`

Wraps a sub-trigger and sub-content pair. Opens on hover/focus and ArrowRight; closes on ArrowLeft or blur.

- **Tag**: `<ui-menubar-sub>`
- **Class**: `UiMenubarSub`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarSub } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-sub></ui-menubar-sub>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `open()` |  |
| `show()` |  |
| `showImmediate()` | Opens the sub-menu immediately without the hover delay. Use for keyboard interactions. |
| `hide()` |  |
| `hideImmediate()` |  |

---

## `<ui-menubar-content>`

The dropdown content panel for a menubar menu. Positioned absolutely below the trigger.

- **Tag**: `<ui-menubar-content>`
- **Class**: `UiMenubarContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarContent } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-content></ui-menubar-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `_menubar-request-close` | — |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-menubar-content-bg` | `var(--ui-surface-1` |

### Methods

| Method | Description |
| --- | --- |
| `resetHighlight()` |  |

---

## `<ui-menubar-trigger>`

The trigger button for a menubar menu.

- **Tag**: `<ui-menubar-trigger>`
- **Class**: `UiMenubarTrigger`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarTrigger } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-trigger></ui-menubar-trigger>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Trigger label text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-menubar-trigger-hover-bg` | `var(--ui-hover-color` |

### Methods

| Method | Description |
| --- | --- |
| `setFocusable(v: boolean)` |  |

---

## `<ui-menubar-menu>`

Wraps a trigger and content pair for a single menu in the menubar.

- **Tag**: `<ui-menubar-menu>`
- **Class**: `UiMenubarMenu`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubarMenu } from 'storybook-lit';
```

### Usage

```html
<ui-menubar-menu></ui-menubar-menu>
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
| `open()` |  |
| `close()` |  |
| `isOpen(): boolean` |  |

---

## `<ui-menubar>`

A visually persistent horizontal menu bar, common in desktop applications. Hosts one or more `<ui-menubar-menu>` children.

- **Tag**: `<ui-menubar>`
- **Class**: `UiMenubar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMenubar } from 'storybook-lit';
```

### Usage

```html
<ui-menubar></ui-menubar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Accessible label for the menubar region. Defaults to "Menu bar". |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-menubar-item-select` | — | Bubbles from items. |
| `ui-menubar-checkbox-change` | — | Bubbles from checkbox items. |
| `ui-menubar-radio-change` | — | Bubbles from radio groups. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | One or more `<ui-menubar-menu>` elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-menubar-highlight-bg` | `var(--ui-hover-color` |
| `--ui-menubar-content-bg` | `var(--ui-surface-1` |
| `--ui-menubar-trigger-hover-bg` | `var(--ui-hover-color` |
| `--ui-menubar-bg` | `var(--ui-surface-1` |

### Methods

| Method | Description |
| --- | --- |
| `activeIndex(): number` |  |
| `closeAll()` | Close all menus. |

---
