# Accessibility

Flint UI components are designed with accessibility as a core concern. Each component follows WAI-ARIA authoring practices, provides keyboard navigation, and works with assistive technologies out of the box.

## Keyboard Navigation

Flint UI components implement standard keyboard interaction patterns:

- **Tab** -- Moves focus between interactive elements in the natural tab order. Composite widgets like tabs use a roving `tabindex` so that only the active item is in the tab sequence.
- **Enter / Space** -- Activates buttons, toggles switches, and confirms selections.
- **Arrow keys** -- Navigates within composite widgets. For example, `flint-tabs` uses `ArrowLeft` / `ArrowRight` in horizontal orientation and `ArrowUp` / `ArrowDown` in vertical orientation to move between tabs.
- **Home / End** -- Jumps to the first or last item in composite widgets such as tab lists and tree views.
- **Escape** -- Closes overlays. `flint-dialog` listens for Escape globally and only the topmost dialog in the stack responds, so nested dialogs behave correctly.

## ARIA Support

Components apply appropriate ARIA roles, states, and properties automatically:

- **Tabs** -- `flint-tab` renders with `role="tab"` and `aria-selected`. `flint-tab-list` contains a `role="tablist"` with an optional `aria-label`. `flint-tab-panel` uses `role="tabpanel"`. The parent `flint-tabs` component wires up `aria-controls` and `aria-labelledby` between tabs and panels.
- **Dialog** -- The dialog panel has `role="dialog"` and `aria-modal="true"`. The title sub-component provides an `id` that is referenced via `aria-labelledby` on the dialog panel.
- **Switch** -- Uses `role="switch"` (via the native toggle pattern) with `aria-checked` reflecting the current state. Supports a custom `aria-label` attribute for cases where a visible label is not present.
- **Buttons** -- `flint-button` renders a native `<button>` element in its shadow DOM, inheriting standard button semantics. The `disabled` property disables the inner button.
- **SVG icons** -- Decorative SVGs are marked with `aria-hidden="true"` so they are ignored by screen readers.

When a component accepts an `aria-label` property, pass it as an attribute on the host element:

```html
<flint-tab-list aria-label="Main navigation"></flint-tab-list>
<flint-switch aria-label="Enable notifications"></flint-switch>
```

## Form Components

Several Flint UI components are form-associated custom elements, using the `ElementInternals` API (`static formAssociated = true` and `attachInternals()`). This means they:

- Participate in `<form>` submission and are included in `FormData`.
- Support the `name` and `value` attributes like native form controls.
- Report validity state through the constraint validation API.
- Work with the `required` attribute for mandatory fields.

Form-associated components include `flint-switch`, `flint-input-otp`, and others. They call `setFormValue()` internally whenever their value changes, so no extra wiring is needed from the consumer.

For labeling, use the component's `label` property or provide an `aria-label`:

```html
<flint-switch label="Dark mode" name="darkMode"></flint-switch>
<flint-switch aria-label="Toggle dark mode" name="darkMode"></flint-switch>
```

## Focus Management

### Dialogs and Modals

`flint-dialog` uses `aria-modal="true"` to signal to assistive technologies that content behind the dialog is inert. Key focus management behaviors:

- **Escape to close** -- Pressing Escape fires a `close` event. A stack of open dialogs is maintained internally so that only the topmost dialog responds to the key.
- **Backdrop click** -- Clicking the backdrop closes the dialog by default. Set `disable-backdrop-close` to require an explicit user action (useful for confirmation dialogs).
- **Nested dialogs** -- Multiple dialogs can be open simultaneously. The internal stack ensures correct ordering of Escape handling.

### Composite Widgets

Components like `flint-tabs`, `flint-rich-tree-view`, and `flint-command` manage focus internally:

- **Roving tabindex** -- Only the active or focused item has `tabindex="0"`; all others have `tabindex="-1"`. This keeps the Tab key moving between widgets rather than through every item.
- **Focus follows selection** -- In tabs, arrow key navigation both moves focus and activates the tab in a single action.
- **Scroll into view** -- When keyboard navigation moves focus to an off-screen item, the component scrolls it into view (with a guard for environments where `scrollIntoView` is unavailable).

## Screen Readers

Tips for testing Flint UI components with screen readers:

- **macOS** -- Use VoiceOver (Cmd + F5) with Safari for the most reliable Web Component support.
- **Windows** -- NVDA with Firefox or JAWS with Chrome are both good choices.
- **Verify announcements** -- Check that role, state, and label are announced correctly. For example, a `flint-tab` should announce as "tab, selected" or "tab" depending on its state.
- **Check live regions** -- If your application uses `aria-live` regions around Flint UI components, verify that dynamic content changes are announced.
- **Shadow DOM** -- Flint UI uses open shadow roots. Modern screen readers traverse open shadow DOM correctly, but always test with your target browser and AT combination.

## Color and Contrast

Flint UI styles are built on CSS custom properties with the `--flint-` prefix. The default theme provides accessible color contrast, but when you customize these properties, you are responsible for maintaining sufficient contrast ratios:

- **Text contrast** -- WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (Level AA).
- **Interactive element contrast** -- Ensure buttons, links, and form controls have at least 3:1 contrast against their background.
- **Focus indicators** -- Flint UI components include visible focus styles. If you override focus styles via CSS custom properties or `::part()`, ensure focus remains clearly visible.

Key design tokens to be mindful of when customizing:

```css
:root {
  --flint-primary-color: #3b82f6;
  --flint-text-color: #111827;
  --flint-font-family: system-ui;
}
```

Use a contrast checker such as the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify your customized values meet WCAG guidelines.
