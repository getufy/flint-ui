# Accordion

<Demo label="Basic" html='<div style="width:100%;max-width:500px"><flint-accordion expanded>  <flint-accordion-summary>Expanded by default</flint-accordion-summary>  <flint-accordion-details>This accordion starts open. Click the header to collapse it.</flint-accordion-details></flint-accordion><flint-accordion>  <flint-accordion-summary>Collapsed Item</flint-accordion-summary>  <flint-accordion-details>Click the header above to expand this content.</flint-accordion-details></flint-accordion><flint-accordion disabled>  <flint-accordion-summary>Disabled Item</flint-accordion-summary>  <flint-accordion-details>This item cannot be toggled.</flint-accordion-details></flint-accordion></div>' />

## `<flint-accordion>`

Accordion: the wrapper for grouping related components.

- **Tag**: `<flint-accordion>`
- **Class**: `FlintAccordion`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAccordion } from '@getufy/flint-ui';
```

### Usage

```html
<flint-accordion></flint-accordion>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `expanded` | `expanded` | `boolean` | `false` | If true, expands the accordion by default. |
| `defaultExpanded` | `default-expanded` | `boolean` | `false` | Initial expanded state for uncontrolled usage. |
| `disabled` | `disabled` | `boolean` | `false` | If true, the accordion is disabled. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-accordion-change` | — | Fired when the accordion's expanded state changes. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | FlintAccordionSummary and FlintAccordionDetails. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-border-color` | — |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-primary-color` | — |
| `--flint-hover-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-surface-1` | — |
| `--flint-border-radius-md` | — |
| `--flint-shadow-md` | — |

---

## `<flint-accordion-summary>`

Accordion Summary: the wrapper for the Accordion header.

- **Tag**: `<flint-accordion-summary>`
- **Class**: `FlintAccordionSummary`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAccordionSummary } from '@getufy/flint-ui';
```

### Usage

```html
<flint-accordion-summary></flint-accordion-summary>
```

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-accordion-toggle` | — | Fired when the summary is clicked or activated via keyboard. |

### Slots

| Name | Description |
| --- | --- |
| `expandIcon` | Custom expand/collapse icon. |
| `(default)` | Summary content. |

---

## `<flint-accordion-details>`

Accordion Details: the wrapper for the Accordion content.

- **Tag**: `<flint-accordion-details>`
- **Class**: `FlintAccordionDetails`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAccordionDetails } from '@getufy/flint-ui';
```

### Usage

```html
<flint-accordion-details></flint-accordion-details>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Detail content. |

---

## `<flint-accordion-actions>`

Accordion Actions: an optional wrapper that groups a set of buttons.

- **Tag**: `<flint-accordion-actions>`
- **Class**: `FlintAccordionActions`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAccordionActions } from '@getufy/flint-ui';
```

### Usage

```html
<flint-accordion-actions></flint-accordion-actions>
```

---
