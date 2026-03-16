# Accordion Component Rename (v0.4 to v0.5)

The Accordion sub-components were renamed in v0.5 to follow the HTML `<details>`/`<summary>` naming convention. This better communicates each element's role and aligns with the native disclosure pattern that the accordion implements.

## What changed

The `flint-accordion` wrapper element is **unchanged**. Its three child elements were renamed:

| v0.4 Tag Name | v0.5 Tag Name | v0.4 Class | v0.5 Class |
|---|---|---|---|
| `flint-accordion-item` | _(removed -- children are now slotted directly into `flint-accordion`)_ | `FlintAccordionItem` | -- |
| `flint-accordion-trigger` | `flint-accordion-summary` | `FlintAccordionTrigger` | `FlintAccordionSummary` |
| `flint-accordion-content` | `flint-accordion-details` | `FlintAccordionContent` | `FlintAccordionDetails` |
| _(none)_ | `flint-accordion-actions` | -- | `FlintAccordionActions` |

Key differences:

- **`flint-accordion-item` was removed.** In v0.4, each collapsible section was wrapped in `<flint-accordion-item>`. In v0.5, `<flint-accordion-summary>` and `<flint-accordion-details>` are slotted directly inside `<flint-accordion>`.
- **`flint-accordion-trigger` became `flint-accordion-summary`.** The clickable header element.
- **`flint-accordion-content` became `flint-accordion-details`.** The collapsible body element.
- **`flint-accordion-actions` is new in v0.5.** An optional footer area for action buttons.

### Events

| v0.4 Event | v0.5 Event |
|---|---|
| `flint-accordion-item-change` | `flint-accordion-change` (now on `<flint-accordion>`) |
| `flint-accordion-trigger-click` | `flint-accordion-toggle` (now on `<flint-accordion-summary>`) |

### React event props

| v0.4 Prop | v0.5 Prop |
|---|---|
| `onFlintAccordionItemChange` | `onFlintAccordionChange` |
| `onFlintAccordionTriggerClick` | `onFlintAccordionToggle` |

## Before / After: HTML (Lit / Vanilla JS)

### v0.4

```html
<flint-accordion>
  <flint-accordion-item expanded>
    <flint-accordion-trigger>Section 1</flint-accordion-trigger>
    <flint-accordion-content>
      Content of section 1.
    </flint-accordion-content>
  </flint-accordion-item>
  <flint-accordion-item>
    <flint-accordion-trigger>Section 2</flint-accordion-trigger>
    <flint-accordion-content>
      Content of section 2.
    </flint-accordion-content>
  </flint-accordion-item>
</flint-accordion>
```

### v0.5

```html
<flint-accordion expanded
    @flint-accordion-change=${(e) => (e.target.expanded = e.detail.expanded)}>
  <flint-accordion-summary>Section 1</flint-accordion-summary>
  <flint-accordion-details>
    Content of section 1.
  </flint-accordion-details>
</flint-accordion>
<flint-accordion
    @flint-accordion-change=${(e) => (e.target.expanded = e.detail.expanded)}>
  <flint-accordion-summary>Section 2</flint-accordion-summary>
  <flint-accordion-details>
    Content of section 2.
  </flint-accordion-details>
</flint-accordion>
```

Note that in v0.5 each `<flint-accordion>` is an independent collapsible section (there is no `item` wrapper). To group multiple sections visually, place them adjacent in the DOM and use the `expanded` property plus event handlers to implement single-expansion (mutex) behavior.

### v0.5 with actions

```html
<flint-accordion expanded
    @flint-accordion-change=${(e) => (e.target.expanded = e.detail.expanded)}>
  <flint-accordion-summary>User Agreement</flint-accordion-summary>
  <flint-accordion-details>
    Please read and accept the terms.
  </flint-accordion-details>
  <flint-accordion-actions>
    <flint-button variant="secondary" size="small">Cancel</flint-button>
    <flint-button variant="primary" size="small">Agree</flint-button>
  </flint-accordion-actions>
</flint-accordion>
```

## Before / After: React

### v0.4

```tsx
import {
  FlintAccordion,
  FlintAccordionItem,
  FlintAccordionTrigger,
  FlintAccordionContent,
} from '@getufy/flint-ui-react/accordion';

function FAQ() {
  return (
    <FlintAccordion>
      <FlintAccordionItem expanded>
        <FlintAccordionTrigger>Section 1</FlintAccordionTrigger>
        <FlintAccordionContent>
          Content of section 1.
        </FlintAccordionContent>
      </FlintAccordionItem>
      <FlintAccordionItem>
        <FlintAccordionTrigger>Section 2</FlintAccordionTrigger>
        <FlintAccordionContent>
          Content of section 2.
        </FlintAccordionContent>
      </FlintAccordionItem>
    </FlintAccordion>
  );
}
```

### v0.5

```tsx
import {
  FlintAccordion,
  FlintAccordionSummary,
  FlintAccordionDetails,
} from '@getufy/flint-ui-react/accordion';

function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <>
      <FlintAccordion
        expanded={expanded === 0}
        onFlintAccordionChange={(e) => setExpanded(e.detail.expanded ? 0 : null)}
      >
        <FlintAccordionSummary>Section 1</FlintAccordionSummary>
        <FlintAccordionDetails>
          Content of section 1.
        </FlintAccordionDetails>
      </FlintAccordion>
      <FlintAccordion
        expanded={expanded === 1}
        onFlintAccordionChange={(e) => setExpanded(e.detail.expanded ? 1 : null)}
      >
        <FlintAccordionSummary>Section 2</FlintAccordionSummary>
        <FlintAccordionDetails>
          Content of section 2.
        </FlintAccordionDetails>
      </FlintAccordion>
    </>
  );
}
```

## Search-and-replace patterns

Run these in order. Review each change before committing.

### 1. Remove `flint-accordion-item` wrappers (HTML / Lit templates)

The `<flint-accordion-item>` wrapper is no longer needed. Manually unwrap children, moving `expanded` and event handlers up to `<flint-accordion>`.

```bash
# Find all accordion-item usages
grep -rn 'flint-accordion-item' src/ --include='*.ts' --include='*.html'
```

### 2. Rename tags (HTML / Lit templates)

```
Search:  flint-accordion-trigger
Replace: flint-accordion-summary

Search:  flint-accordion-content
Replace: flint-accordion-details
```

### 3. Rename events (HTML / Lit templates)

```
Search:  flint-accordion-item-change
Replace: flint-accordion-change

Search:  flint-accordion-trigger-click
Replace: flint-accordion-toggle
```

### 4. Rename React imports

```
Search:  FlintAccordionTrigger
Replace: FlintAccordionSummary

Search:  FlintAccordionContent
Replace: FlintAccordionDetails

Search:  FlintAccordionItem
Replace: (remove — no replacement; unwrap the children)
```

### 5. Rename React event props

```
Search:  onFlintAccordionItemChange
Replace: onFlintAccordionChange

Search:  onFlintAccordionTriggerClick
Replace: onFlintAccordionToggle
```

### 6. Update JS/TS class references

```
Search:  FlintAccordionTrigger
Replace: FlintAccordionSummary

Search:  FlintAccordionContent
Replace: FlintAccordionDetails
```

### 7. Let TypeScript catch the rest

After updating the packages, run:

```bash
npx tsc --noEmit
```

The v0.5 type definitions will flag any remaining references to removed or renamed exports as compile errors.
