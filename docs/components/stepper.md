# Stepper

<Demo label="Step 2 of 3" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-stepper active-step=&quot;1&quot;>  <flint-step completed>    <flint-step-label>Account</flint-step-label>  </flint-step>  <flint-step>    <flint-step-label>Details</flint-step-label>  </flint-step>  <flint-step>    <flint-step-label>Review</flint-step-label>  </flint-step></flint-stepper></div>" />

<Demo label="All Complete" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-stepper active-step=&quot;3&quot;>  <flint-step completed>    <flint-step-label>Account</flint-step-label>  </flint-step>  <flint-step completed>    <flint-step-label>Details</flint-step-label>  </flint-step>  <flint-step completed>    <flint-step-label>Review</flint-step-label>  </flint-step></flint-stepper></div>" />

<Demo label="Vertical" html="<div style=&quot;width:100%;max-width:400px&quot;><flint-stepper orientation=&quot;vertical&quot; active-step=&quot;1&quot;>  <flint-step completed>    <flint-step-label>Create account</flint-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Account created successfully.</p>  </flint-step>  <flint-step>    <flint-step-label>Personal details</flint-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Fill in your name, email, and phone number.</p>  </flint-step>  <flint-step>    <flint-step-label>Review & submit</flint-step-label>  </flint-step></flint-stepper></div>" />

## `<flint-step-connector>`

- **Tag**: `<flint-step-connector>`
- **Class**: `FlintStepConnector`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepConnector } from 'flint-ui';
```

### Usage

```html
<flint-step-connector></flint-step-connector>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the connector line. |
| `completed` | `completed` | `boolean` | `false` | Renders the connector in the primary (completed) color. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-surface-1` | — |
| `--flint-font-family` | — |
| `--flint-border-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-input-border-color` | — |
| `--flint-primary-color` | — |
| `--flint-text-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-error-color` | — |
| `--flint-primary-focus-ring` | — |

---

## `<flint-step-label>`

- **Tag**: `<flint-step-label>`
- **Class**: `FlintStepLabel`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepLabel } from 'flint-ui';
```

### Usage

```html
<flint-step-label></flint-step-label>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Whether the label is styled as active (current step). |
| `disabled` | `disabled` | `boolean` | `false` | Whether the label is styled as disabled. |
| `error` | `error` | `boolean` | `false` | Whether the label is styled as an error state. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `optional` | Secondary text shown below the label (e.g. "Optional"). |

---

## `<flint-step-content>`

- **Tag**: `<flint-step-content>`
- **Class**: `FlintStepContent`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepContent } from 'flint-ui';
```

### Usage

```html
<flint-step-content></flint-step-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `true` | Whether the content is visible. Defaults true so standalone usage always shows. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-step>`

- **Tag**: `<flint-step>`
- **Class**: `FlintStep`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStep } from 'flint-ui';
```

### Usage

```html
<flint-step></flint-step>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Whether this step is the current active step. |
| `completed` | `completed` | `boolean` | `false` | Whether this step has been completed. |
| `disabled` | `disabled` | `boolean` | `false` | Whether this step is disabled and non-interactive. |
| `optional` | `optional` | `boolean` | `false` | Marks this step as optional and shows the optional label. |
| `error` | `error` | `boolean` | `false` | Displays the step in an error state with a warning icon. |
| `last` | `last` | `boolean` | `false` | Whether this is the last step (hides trailing connector). |
| `clickable` | `clickable` | `boolean` | `false` | Makes the step clickable to navigate directly to it. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the step (set by the parent stepper). |
| `alternativeLabel` | `alternative-label` | `boolean` | `false` | Places labels below the step icons instead of beside them. |
| `stepIndex` | `step-index` | `number` | `0` | Zero-based index of this step (set by the parent stepper). |
| `optionalLabel` | `optional-label` | `string` | `'Optional'` | Text shown below the label when `optional` is true. |
| `prevCompleted` | `prev-completed` | `boolean` | `false` | Whether the preceding step is completed (colors the leading connector). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-step-click` | `{ index: this.stepIndex }` | Fired when a clickable step is clicked. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `icon` | Custom icon to replace the default step number. |
| `label` | Step label content (typically a `flint-step-label`). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stepper-connector-color` | — |
| `--flint-stepper-icon-size` | `32px` |

---

## `<flint-stepper>`

- **Tag**: `<flint-stepper>`
- **Class**: `FlintStepper`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepper } from 'flint-ui';
```

### Usage

```html
<flint-stepper></flint-stepper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `activeStep` | `active-step` | `number` | `0` | Index of the currently active step (0-based). |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the stepper. |
| `alternativeLabel` | `alternative-label` | `boolean` | `false` | Places step labels below the icons instead of beside them. |
| `nonLinear` | `non-linear` | `boolean` | `false` | Allows clicking any step to navigate (non-sequential). |
| `label` | `label` | `string` | `'steps'` | Accessible label for the stepper landmark (maps to aria-label on the list element). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-step-change` | `{ step: e.detail.index }` | Fired when the active step changes via a step click. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stepper-connector-color` | — |
| `--flint-stepper-icon-size` | `32px` |

---

## `<flint-mobile-stepper>`

- **Tag**: `<flint-mobile-stepper>`
- **Class**: `FlintMobileStepper`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMobileStepper } from 'flint-ui';
```

### Usage

```html
<flint-mobile-stepper></flint-mobile-stepper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `steps` | `steps` | `number` | `0` | Total number of steps. |
| `activeStep` | `active-step` | `number` | `0` | Index of the currently active step (0-based). |
| `variant` | `variant` | `'text' \| 'dots' \| 'progress'` | `'dots'` | Progress indicator style: text label, dots, or progress bar. |
| `position` | `position` | `'top' \| 'bottom' \| 'static'` | `'static'` | Fixed positioning of the stepper bar. |
| `backLabel` | `back-label` | `string` | `'Back'` | Label text for the Back navigation button (supports i18n). |
| `nextLabel` | `next-label` | `string` | `'Next'` | Label text for the Next navigation button (supports i18n). |

### Slots

| Name | Description |
| --- | --- |
| `back-button` | Custom back navigation button content. |
| `next-button` | Custom next navigation button content. |

---
