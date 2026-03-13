# Kbd

<Demo label="Combinations" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap;align-items:center&quot;><span><ui-kbd>Ctrl</ui-kbd> + <ui-kbd>C</ui-kbd></span><span><ui-kbd>Ctrl</ui-kbd> + <ui-kbd>V</ui-kbd></span><span><ui-kbd>Shift</ui-kbd> + <ui-kbd>Enter</ui-kbd></span><ui-kbd>Esc</ui-kbd></div>" />

## `<ui-kbd>`

Displays a single keyboard key or modifier symbol. Renders a semantic `<kbd>` element for accessibility.

- **Tag**: `<ui-kbd>`
- **Class**: `UiKbd`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiKbd } from 'storybook-lit';
```

### Usage

```html
<ui-kbd></ui-kbd>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Visual size of the key. |
| `variant` | `variant` | `'raised' \| 'flat'` | `'raised'` | Visual style: `raised` (default, bottom border + shadow) or `flat` (no raised effect). |
| `label` | `label` | `string` | `''` | Accessible label forwarded as `aria-label` on the inner `<kbd>` element. Useful for symbol keys like ⌘. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Key label: text, symbol (⌘ ⇧ ⌥ ⌃ ⏎), or any inline content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-kbd-group-gap` | `4px` |
| `--ui-kbd-font-family` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |
| `--ui-kbd-color` | `var(--ui-label-color` |
| `--ui-kbd-bg` | `var(--ui-surface-2` |
| `--ui-kbd-border-color` | `var(--ui-border-color` |
| `--ui-kbd-radius` | `var(--ui-border-radius-sm` |
| `--ui-kbd-shadow-color` | `var(--ui-input-border-color` |

---

## `<ui-kbd-group>`

Groups multiple `ui-kbd` elements in a row. Provides a flex container with tight spacing for key combos.

- **Tag**: `<ui-kbd-group>`
- **Class**: `UiKbdGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiKbdGroup } from 'storybook-lit';
```

### Usage

```html
<ui-kbd-group></ui-kbd-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `ui-kbd` elements, separators (e.g. `<span>+</span>`), or text. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-kbd-group-gap` | `4px` |

---
