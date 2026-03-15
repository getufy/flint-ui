# Stepper

<Demo label="Step 2 of 3" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-stepper active-step=&quot;1&quot;>  <flint-step completed>    <flint-step-label>Account</flint-step-label>  </flint-step>  <flint-step>    <flint-step-label>Details</flint-step-label>  </flint-step>  <flint-step>    <flint-step-label>Review</flint-step-label>  </flint-step></flint-stepper></div>" />

<Demo label="All Complete" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-stepper active-step=&quot;3&quot;>  <flint-step completed>    <flint-step-label>Account</flint-step-label>  </flint-step>  <flint-step completed>    <flint-step-label>Details</flint-step-label>  </flint-step>  <flint-step completed>    <flint-step-label>Review</flint-step-label>  </flint-step></flint-stepper></div>" />

<Demo label="Vertical" html="<div style=&quot;width:100%;max-width:400px&quot;><flint-stepper orientation=&quot;vertical&quot; active-step=&quot;1&quot;>  <flint-step completed>    <flint-step-label>Create account</flint-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Account created successfully.</p>  </flint-step>  <flint-step>    <flint-step-label>Personal details</flint-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Fill in your name, email, and phone number.</p>  </flint-step>  <flint-step>    <flint-step-label>Review & submit</flint-step-label>  </flint-step></flint-stepper></div>" />

## `<flint-step-connector>`

- **Tag**: `<flint-step-connector>`
- **Class**: `FlintStepConnector`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintStepConnector } from '@getufy/flint-ui';
```

### Usage

```html
<flint-step-connector></flint-step-connector>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the connector line. |
| `completed` | `completed` | `boolean` | `false` | Whether the connector represents a completed step transition. |

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

Step Label: the label for a step.

- **Tag**: `<flint-step-label>`
- **Class**: `FlintStepLabel`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintStepLabel } from '@getufy/flint-ui';
```

### Usage

```html
<flint-step-label></flint-step-label>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Whether the label's step is currently active. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the label's step is disabled. |
| `error` | `error` | `boolean` | `false` | Whether the label's step is in an error state. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Label text. |
| `optional` | Optional step text. |

---

## `<flint-step-content>`

Step Content: the collapsible content area for a step.

- **Tag**: `<flint-step-content>`
- **Class**: `FlintStepContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintStepContent } from '@getufy/flint-ui';
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
| `(default)` | Step content. |

---

## `<flint-step>`

Step: an individual step within a stepper.

- **Tag**: `<flint-step>`
- **Class**: `FlintStep`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintStep } from '@getufy/flint-ui';
```

### Usage

```html
<flint-step></flint-step>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Whether this step is the currently active step. |
| `completed` | `completed` | `boolean` | `false` | Whether this step has been completed. |
| `disabled` | `disabled` | `boolean` | `false` | Whether this step is disabled and non-interactive. |
| `optional` | `optional` | `boolean` | `false` | Whether this step is optional. |
| `error` | `error` | `boolean` | `false` | Whether this step is in an error state. |
| `last` | `last` | `boolean` | `false` | Whether this is the last step in the stepper. |
| `clickable` | `clickable` | `boolean` | `false` | Whether this step can be clicked to navigate to it. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the step. |
| `alternativeLabel` | `alternative-label` | `boolean` | `false` | Whether to display the label below the step icon instead of beside it. |
| `stepIndex` | `step-index` | `number` | `0` | Zero-based index of this step within the stepper. |
| `optionalLabel` | `optional-label` | `string` | `'Optional'` | Text shown below the label when the step is optional. |
| `prevCompleted` | `prev-completed` | `boolean` | `false` | Set by FlintStepper — true when the immediately preceding step is completed. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-step-click` | `{ step: number }` | Fired when a non-linear step is clicked. detail: `{ step: number }` |

### Slots

| Name | Description |
| --- | --- |
| `icon` | Custom step icon. |
| `label` | Custom label content. |
| `(default)` | Step content. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stepper-connector-color` | — |
| `--flint-stepper-icon-size` | `32px` |

---

## `<flint-stepper>`

Stepper: a multi-step progress indicator.

- **Tag**: `<flint-stepper>`
- **Class**: `FlintStepper`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintStepper } from '@getufy/flint-ui';
```

### Usage

```html
<flint-stepper></flint-stepper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `activeStep` | `active-step` | `number` | `0` | Zero-based index of the currently active step. |
| `defaultActiveStep` | `default-active-step` | `number \| undefined` | — | Initial active step for uncontrolled usage. |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the stepper. |
| `alternativeLabel` | `alternative-label` | `boolean` | `false` | Whether to display step labels below the icons instead of beside them. |
| `nonLinear` | `non-linear` | `boolean` | `false` | Whether steps can be navigated in any order (enables clickable steps). |
| `label` | `label` | `string` | `'steps'` | Accessible label for the stepper landmark (maps to aria-label on the list element). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-step-change` | — | Fired when the active step changes via step click. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stepper-connector-color` | — |
| `--flint-stepper-icon-size` | `32px` |

---

## `<flint-mobile-stepper>`

Mobile Stepper: a compact stepper for mobile layouts.

- **Tag**: `<flint-mobile-stepper>`
- **Class**: `FlintMobileStepper`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMobileStepper } from '@getufy/flint-ui';
```

### Usage

```html
<flint-mobile-stepper></flint-mobile-stepper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `steps` | `steps` | `number` | `0` | Total number of steps. |
| `activeStep` | `active-step` | `number` | `0` | Zero-based index of the currently active step. |
| `variant` | `variant` | `'text' \| 'dots' \| 'progress'` | `'dots'` | Progress indicator style: text counter, dot indicators, or a progress bar. |
| `position` | `position` | `'top' \| 'bottom' \| 'static'` | `'static'` | Positioning of the mobile stepper within its container. |
| `backLabel` | `back-label` | `string` | `'Back'` | Label text for the Back navigation button (supports i18n). |
| `nextLabel` | `next-label` | `string` | `'Next'` | Label text for the Next navigation button (supports i18n). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-mobile-step-back` | — | Fired when the back button is clicked. |
| `flint-mobile-step-next` | — | Fired when the next button is clicked. |

### Slots

| Name | Description |
| --- | --- |
| `back-button` | Back navigation button. |
| `next-button` | Next navigation button. |

---
