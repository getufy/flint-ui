# Command

<Demo>

<div style="width:100%;max-width:400px">
<ui-command style="border:1px solid #e5e7eb;border-radius:8px">
  <ui-command-input placeholder="Type a command or search..."></ui-command-input>
  <ui-command-list>
    <ui-command-group heading="Suggestions">
      <ui-command-item value="calendar">Calendar</ui-command-item>
      <ui-command-item value="search">Search</ui-command-item>
      <ui-command-item value="settings">Settings</ui-command-item>
    </ui-command-group>
    <ui-command-separator></ui-command-separator>
    <ui-command-group heading="Actions">
      <ui-command-item value="copy">Copy</ui-command-item>
      <ui-command-item value="paste">Paste</ui-command-item>
    </ui-command-group>
    <ui-command-empty>No results found.</ui-command-empty>
  </ui-command-list>
</ui-command>
</div>

</Demo>

## `<ui-command-shortcut>`

Displays a keyboard shortcut hint inside a command item. Slot the shortcut string (e.g. `⌘P`) as default slot content.

- **Tag**: `<ui-command-shortcut>`
- **Class**: `UiCommandShortcut`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandShortcut } from 'storybook-lit';
```

### Usage

```html
<ui-command-shortcut></ui-command-shortcut>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Shortcut text, e.g. `⌘P` or `Ctrl+K`. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-border-radius-md` | — |
| `--ui-text-color-muted` | — |
| `--ui-font-family` | — |
| `--ui-border-color` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |
| `--ui-primary-color` | — |

---

## `<ui-command-separator>`

A hairline separator between command groups.

- **Tag**: `<ui-command-separator>`
- **Class**: `UiCommandSeparator`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandSeparator } from 'storybook-lit';
```

### Usage

```html
<ui-command-separator></ui-command-separator>
```

---

## `<ui-command-item>`

A single interactive option inside a command menu.

- **Tag**: `<ui-command-item>`
- **Class**: `UiCommandItem`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandItem } from 'storybook-lit';
```

### Usage

```html
<ui-command-item></ui-command-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Machine-readable value used for filter matching. Falls back to textContent. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the item — non-interactive and skipped in keyboard nav. |
| `highlighted` | `highlighted` | `boolean` | `false` | Set by parent `ui-command` to indicate keyboard focus. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-command-item-select` | — | Fired when the item is activated. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label text. |
| `icon` | Leading icon (16×16). |
| `shortcut` | Trailing shortcut hint; prefer `<ui-command-shortcut>`. |

### Methods

| Method | Description |
| --- | --- |
| `scrollIntoViewIfNeeded()` | Scroll this item into view (nearest ancestor scroll container). |

---

## `<ui-command-empty>`

Empty state message shown when no command items match the current query. Managed automatically by the parent `ui-command` element.

- **Tag**: `<ui-command-empty>`
- **Class**: `UiCommandEmpty`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandEmpty } from 'storybook-lit';
```

### Usage

```html
<ui-command-empty></ui-command-empty>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Message text, e.g. "No results found." |

---

## `<ui-command-group>`

A labeled group of command items. The parent `ui-command` automatically hides the whole group when all its items are filtered out.

- **Tag**: `<ui-command-group>`
- **Class**: `UiCommandGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandGroup } from 'storybook-lit';
```

### Usage

```html
<ui-command-group></ui-command-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `heading` | `heading` | `string` | `''` | Label rendered above the group items. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `ui-command-item` elements. |

---

## `<ui-command-list>`

Scrollable list container for command items and groups.

- **Tag**: `<ui-command-list>`
- **Class**: `UiCommandList`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandList } from 'storybook-lit';
```

### Usage

```html
<ui-command-list></ui-command-list>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `ui-command-group`, `ui-command-item`, `ui-command-empty`, `ui-command-separator`. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-command-list-max-height` | `300px` |

---

## `<ui-command-input>`

Search input for the command menu. Dispatches `_cmd-filter` events that the parent `ui-command` intercepts to apply filtering.

- **Tag**: `<ui-command-input>`
- **Class**: `UiCommandInput`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandInput } from 'storybook-lit';
```

### Usage

```html
<ui-command-input></ui-command-input>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `placeholder` | `placeholder` | `string` | `'Type a command or search...'` | Placeholder text shown when input is empty. |
| `value` | `value` | `string` | `''` | Current input value. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `_cmd-filter` | `{ query: input.value }` |  |

### Methods

| Method | Description |
| --- | --- |
| `focus()` | Focus the inner input element. |
| `reset()` | Reset the input value and broadcast an empty filter. |

---

## `<ui-command>`

Root command menu component. Manages search filtering and keyboard navigation. Compose it with `ui-command-input`, `ui-command-list`, `ui-command-group`, `ui-command-item`, `ui-command-separator`, and `ui-command-empty`.

- **Tag**: `<ui-command>`
- **Class**: `UiCommand`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommand } from 'storybook-lit';
```

### Usage

```html
<ui-command></ui-command>
```

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-command-item-select` | — | Bubbles up from activated items. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Command menu content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-command-backdrop-bg` | `rgba(0, 0, 0, 0.5` |
| `--ui-command-z-index` | `1400` |
| `--ui-command-dialog-width` | `512px` |
| `--ui-command-bg` | `var(--ui-surface-1` |
| `--ui-command-panel-border-color` | `var(--ui-border-color` |
| `--ui-command-highlight-bg` | `var(--ui-hover-color` |
| `--ui-command-highlight-color` | `var(--ui-text-color` |
| `--ui-command-list-max-height` | `300px` |
| `--ui-command-border-color` | `var(--ui-border-color` |

### Methods

| Method | Description |
| --- | --- |
| `reset()` | Reset search query and restore all items. |

---

## `<ui-command-dialog>`

Modal dialog wrapper for a command menu. Opens with a smooth backdrop + scale animation. Pressing `Escape` or clicking the backdrop fires `ui-command-dialog-close`.

- **Tag**: `<ui-command-dialog>`
- **Class**: `UiCommandDialog`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiCommandDialog } from 'storybook-lit';
```

### Usage

```html
<ui-command-dialog></ui-command-dialog>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Controls the open/closed state of the dialog. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-command-dialog-close` | — | Fired when the dialog should close. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place a `ui-command` element here. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-command-dialog-width` | `512px` |

---
