# Accordion

<Demo label="Basic" html="<div style=&quot;width:100%;max-width:500px&quot;><ui-accordion expanded>  <ui-accordion-summary>Expanded by default</ui-accordion-summary>  <ui-accordion-details>This accordion starts open. Click the header to collapse it.</ui-accordion-details></ui-accordion><ui-accordion>  <ui-accordion-summary>Collapsed Item</ui-accordion-summary>  <ui-accordion-details>Click the header above to expand this content.</ui-accordion-details></ui-accordion><ui-accordion disabled>  <ui-accordion-summary>Disabled Item</ui-accordion-summary>  <ui-accordion-details>This item cannot be toggled.</ui-accordion-details></ui-accordion></div>" />

## `<ui-accordion>`

Accordion: the wrapper for grouping related components.

- **Tag**: `<ui-accordion>`
- **Class**: `UiAccordion`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAccordion } from 'storybook-lit';
```

### Usage

```html
<ui-accordion></ui-accordion>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `expanded` | `expanded` | `boolean` | `false` | * If true, expands the accordion by default. |
| `disabled` | `disabled` | `boolean` | `false` | * If true, the accordion is disabled. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-accordion-change` | `{ expanded: this.expanded }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-border-color` | — |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-primary-color` | — |
| `--ui-hover-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-surface-1` | — |
| `--ui-border-radius-md` | — |
| `--ui-shadow-md` | — |

---

## `<ui-accordion-summary>`

Accordion Summary: the wrapper for the Accordion header.

- **Tag**: `<ui-accordion-summary>`
- **Class**: `UiAccordionSummary`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAccordionSummary } from 'storybook-lit';
```

### Usage

```html
<ui-accordion-summary></ui-accordion-summary>
```

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-accordion-toggle` | — |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `expandIcon` |  |

---

## `<ui-accordion-details>`

Accordion Details: the wrapper for the Accordion content.

- **Tag**: `<ui-accordion-details>`
- **Class**: `UiAccordionDetails`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAccordionDetails } from 'storybook-lit';
```

### Usage

```html
<ui-accordion-details></ui-accordion-details>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-accordion-actions>`

Accordion Actions: an optional wrapper that groups a set of buttons.

- **Tag**: `<ui-accordion-actions>`
- **Class**: `UiAccordionActions`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAccordionActions } from 'storybook-lit';
```

### Usage

```html
<ui-accordion-actions></ui-accordion-actions>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
