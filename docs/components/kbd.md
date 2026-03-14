# Kbd

<Demo label="Combinations" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap;align-items:center&quot;><span><flint-kbd>Ctrl</flint-kbd> + <flint-kbd>C</flint-kbd></span><span><flint-kbd>Ctrl</flint-kbd> + <flint-kbd>V</flint-kbd></span><span><flint-kbd>Shift</flint-kbd> + <flint-kbd>Enter</flint-kbd></span><flint-kbd>Esc</flint-kbd></div>" />

## `<flint-kbd>`

Displays a single keyboard key or modifier symbol. Renders a semantic `<kbd>` element for accessibility.

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
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Visual size of the key. |
| `variant` | `variant` | `'raised' \| 'flat'` | `'raised'` | Visual style: `raised` (default, bottom border + shadow) or `flat` (no raised effect). |
| `label` | `label` | `string` | `''` | Accessible label forwarded as `aria-label` on the inner `&lt;kbd&gt;` element. Useful for symbol keys like ⌘. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Key label: text, symbol (⌘ ⇧ ⌥ ⌃ ⏎), or any inline content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-kbd-group-gap` | `4px` |
| `--flint-kbd-font-family` | `flint-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |
| `--flint-kbd-color` | `var(--flint-label-color` |
| `--flint-kbd-bg` | `var(--flint-surface-2` |
| `--flint-kbd-border-color` | `var(--flint-border-color` |
| `--flint-kbd-radius` | `var(--flint-border-radius-sm` |
| `--flint-kbd-shadow-color` | `var(--flint-input-border-color` |

---

## `<flint-kbd-group>`

Groups multiple `flint-kbd` elements in a row. Provides a flex container with tight spacing for key combos.

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
| `--flint-kbd-group-gap` | `4px` |

---
