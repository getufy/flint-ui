# Kbd

<Demo label="Combinations" html='<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center"><span><flint-kbd>Ctrl</flint-kbd> + <flint-kbd>C</flint-kbd></span><span><flint-kbd>Ctrl</flint-kbd> + <flint-kbd>V</flint-kbd></span><span><flint-kbd>Shift</flint-kbd> + <flint-kbd>Enter</flint-kbd></span><flint-kbd>Esc</flint-kbd></div>' />

## `<flint-kbd>`

Displays a single keyboard key or modifier symbol.
Renders a semantic `<kbd>` element for accessibility.

- **Tag**: `<flint-kbd>`
- **Class**: `FlintKbd`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintKbd } from '@getufy/flint-ui';
```

### Usage

```html
<flint-kbd></flint-kbd>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | `size` | `Size` | `'md'` | Visual size of the key. |
| `variant` | `variant` | `'raised' \| 'flat'` | `'raised'` | Visual style: `raised` (default, bottom border + shadow) or `flat` (no raised effect). |
| `label` | `label` | `string` | `''` | Accessible label forwarded as `aria-label` on the inner `&lt;kbd&gt;` element. Useful for symbol keys like ⌘. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Key label: text, symbol (⌘ ⇧ ⌥ ⌃ ⏎), or any inline content. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-kbd-bg` | — |
| `--flint-kbd-border-color` | — |
| `--flint-kbd-color` | — |
| `--flint-kbd-font-family` | — |
| `--flint-kbd-radius` | — |
| `--flint-kbd-shadow-color` | — |
| `--flint-kbd-group-gap` | `4px` |

---

## `<flint-kbd-group>`

Groups multiple `flint-kbd` elements in a row.
Provides a flex container with tight spacing for key combos.

- **Tag**: `<flint-kbd-group>`
- **Class**: `FlintKbdGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintKbdGroup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-kbd-group></flint-kbd-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `flint-kbd` elements, separators (e.g. `&lt;span&gt;+&lt;/span&gt;`), or text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-kbd-group-gap` | — |

---
