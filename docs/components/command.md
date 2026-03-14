# Command

<Demo html="<div style=&quot;width:100%;max-width:400px&quot;><flint-command style=&quot;border:1px solid #e5e7eb;border-radius:8px&quot;>  <flint-command-input placeholder=&quot;Type a command or search...&quot;></flint-command-input>  <flint-command-list>    <flint-command-group heading=&quot;Suggestions&quot;>      <flint-command-item value=&quot;calendar&quot;>Calendar</flint-command-item>      <flint-command-item value=&quot;search&quot;>Search</flint-command-item>      <flint-command-item value=&quot;settings&quot;>Settings</flint-command-item>    </flint-command-group>    <flint-command-separator></flint-command-separator>    <flint-command-group heading=&quot;Actions&quot;>      <flint-command-item value=&quot;copy&quot;>Copy</flint-command-item>      <flint-command-item value=&quot;paste&quot;>Paste</flint-command-item>    </flint-command-group>    <flint-command-empty>No results found.</flint-command-empty>  </flint-command-list></flint-command></div>" />

## `<flint-command-shortcut>`

Displays a keyboard shortcut hint inside a command item. Slot the shortcut string (e.g. `⌘P`) as default slot content.

- **Tag**: `<flint-command-shortcut>`
- **Class**: `FlintCommandShortcut`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandShortcut } from 'flint-ui';
```

### Usage

```html
<flint-command-shortcut></flint-command-shortcut>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Shortcut text, e.g. `⌘P` or `Ctrl+K`. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-border-radius-md` | — |
| `--flint-text-color-muted` | — |
| `--flint-font-family` | — |
| `--flint-border-color` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |
| `--flint-primary-color` | — |

---

## `<flint-command-separator>`

A hairline separator between command groups.

- **Tag**: `<flint-command-separator>`
- **Class**: `FlintCommandSeparator`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandSeparator } from 'flint-ui';
```

### Usage

```html
<flint-command-separator></flint-command-separator>
```

---

## `<flint-command-item>`

A single interactive option inside a command menu.

- **Tag**: `<flint-command-item>`
- **Class**: `FlintCommandItem`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandItem } from 'flint-ui';
```

### Usage

```html
<flint-command-item></flint-command-item>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Machine-readable value used for filter matching. Falls back to textContent. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the item — non-interactive and skipped in keyboard nav. |
| `highlighted` | `highlighted` | `boolean` | `false` | Set by parent `flint-command` to indicate keyboard focus. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-command-item-select` | — | Fired when the item is activated. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label text. |
| `icon` | Leading icon (16×16). |
| `shortcut` | Trailing shortcut hint; prefer `<flint-command-shortcut>`. |

### Methods

| Method | Description |
| --- | --- |
| `scrollIntoViewIfNeeded()` | Scroll this item into view (nearest ancestor scroll container). |

---

## `<flint-command-empty>`

Empty state message shown when no command items match the current query. Managed automatically by the parent `flint-command` element.

- **Tag**: `<flint-command-empty>`
- **Class**: `FlintCommandEmpty`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandEmpty } from 'flint-ui';
```

### Usage

```html
<flint-command-empty></flint-command-empty>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Message text, e.g. "No results found." |

---

## `<flint-command-group>`

A labeled group of command items. The parent `flint-command` automatically hides the whole group when all its items are filtered out.

- **Tag**: `<flint-command-group>`
- **Class**: `FlintCommandGroup`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandGroup } from 'flint-ui';
```

### Usage

```html
<flint-command-group></flint-command-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `heading` | `heading` | `string` | `''` | Label rendered above the group items. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `flint-command-item` elements. |

---

## `<flint-command-list>`

Scrollable list container for command items and groups.

- **Tag**: `<flint-command-list>`
- **Class**: `FlintCommandList`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandList } from 'flint-ui';
```

### Usage

```html
<flint-command-list></flint-command-list>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `flint-command-group`, `flint-command-item`, `flint-command-empty`, `flint-command-separator`. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-command-list-max-height` | `300px` |

---

## `<flint-command-input>`

Search input for the command menu. Dispatches `_cmd-filter` events that the parent `flint-command` intercepts to apply filtering.

- **Tag**: `<flint-command-input>`
- **Class**: `FlintCommandInput`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandInput } from 'flint-ui';
```

### Usage

```html
<flint-command-input></flint-command-input>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `placeholder` | `placeholder` | `string` | `'Type a command or search...'` | Placeholder text shown when input is empty. |
| `value` | `value` | `string` | `''` | Current input value. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `_cmd-filter` | `{ query: input.value }` | Internal event dispatched on input to trigger filtering. |

### Methods

| Method | Description |
| --- | --- |
| `focus()` | Focus the inner input element. |
| `reset()` | Reset the input value and broadcast an empty filter. |

---

## `<flint-command>`

Root command menu component. Manages search filtering and keyboard navigation. Compose it with `flint-command-input`, `flint-command-list`, `flint-command-group`, `flint-command-item`, `flint-command-separator`, and `flint-command-empty`.

- **Tag**: `<flint-command>`
- **Class**: `FlintCommand`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommand } from 'flint-ui';
```

### Usage

```html
<flint-command></flint-command>
```

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-command-item-select` | — | Bubbles up from activated items. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Command menu content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-command-backdrop-bg` | `rgba(0, 0, 0, 0.5` |
| `--flint-command-z-index` | `1400` |
| `--flint-command-dialog-width` | `512px` |
| `--flint-command-bg` | `var(--flint-surface-1` |
| `--flint-command-panel-border-color` | `var(--flint-border-color` |
| `--flint-command-highlight-bg` | `var(--flint-hover-color` |
| `--flint-command-highlight-color` | `var(--flint-text-color` |
| `--flint-command-list-max-height` | `300px` |
| `--flint-command-border-color` | `var(--flint-border-color` |

### Methods

| Method | Description |
| --- | --- |
| `reset()` | Reset search query and restore all items. |

---

## `<flint-command-dialog>`

Modal dialog wrapper for a command menu. Opens with a smooth backdrop + scale animation. Pressing `Escape` or clicking the backdrop fires `flint-command-dialog-close`.

- **Tag**: `<flint-command-dialog>`
- **Class**: `FlintCommandDialog`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintCommandDialog } from 'flint-ui';
```

### Usage

```html
<flint-command-dialog></flint-command-dialog>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Controls the open/closed state of the dialog. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-command-dialog-close` | — | Fired when the dialog should close. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Place a `flint-command` element here. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-command-dialog-width` | `512px` |

---
