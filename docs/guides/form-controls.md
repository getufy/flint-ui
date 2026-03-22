# Form Controls

Flint UI form components participate in native `<form>` submission and validation using the [Element Internals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals). They work like built-in `<input>` elements -- no wrappers, no JavaScript glue.

## Basic Form Submission

Flint form components report their values to the enclosing `<form>` automatically. Use standard `FormData` or the `serialize()` utility to read them.

```html
<form id="signup">
  <flint-input name="email" type="email" required></flint-input>
  <flint-text-field name="username" required min-length="3"></flint-text-field>
  <flint-select name="role">
    <flint-option value="admin">Admin</flint-option>
    <flint-option value="editor">Editor</flint-option>
  </flint-select>
  <flint-checkbox name="terms" required>I agree to the terms</flint-checkbox>
  <flint-button type="submit">Sign Up</flint-button>
</form>
```

```ts
import { serialize } from '@getufy/flint-ui';

document.querySelector('#signup')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = serialize(e.target as HTMLFormElement);
  console.log(data);
  // { email: 'alice@example.com', username: 'alice', role: 'admin', terms: 'on' }
});
```

The `serialize()` function converts `FormData` to a plain object. Multiple values with the same name become arrays.

## Validation

### Built-in Constraint Validation

Flint form controls support the same constraint attributes as native HTML:

| Attribute | Description |
|-----------|-------------|
| `required` | Field must have a value |
| `pattern` | Value must match a regex |
| `min` / `max` | Minimum / maximum value (numbers, dates) |
| `min-length` / `max-length` | Minimum / maximum character length |

When a constraint fails, the component sets the appropriate `ValidityState` flag and a human-readable message -- exactly like a native `<input>`.

```html
<flint-input name="zip" required pattern="[0-9]{5}" min-length="5" max-length="5">
</flint-input>
```

### Checking Validity Programmatically

Every Flint form control exposes the standard validation API:

```ts
const input = document.querySelector('flint-input');

input.checkValidity();      // returns true/false, fires 'invalid' event if invalid
input.reportValidity();     // like checkValidity() but shows the browser validation popup
input.setCustomValidity('Username already taken');  // set a custom error (empty string clears it)

input.validity;             // ValidityState object
input.validationMessage;    // current validation message string
input.willValidate;         // whether this control participates in validation
input.form;                 // the associated <form> element, or null
```

### Multi-Level Validation

Beyond pass/fail, Flint supports three validation levels:

| Level | Blocks submission? | Use case |
|-------|--------------------|----------|
| `error` | Yes | Required fields, format errors |
| `warning` | No | "This looks unusual" hints |
| `info` | No | Informational tips |

Warnings and info messages are advisory -- they don't prevent the form from submitting. Only `error` blocks submission.

To use multi-level validation, access the component's internal form controller:

```ts
const input = document.querySelector('flint-input');

// Error -- blocks form submission
input.setCustomValidity('This email is already registered');

// For warning/info, use the flint-form-field wrapper:
```

```html
<flint-form-field
  label="Username"
  helper-text="Letters and numbers only"
  error-message="Username is taken"
  error
>
  <flint-input name="username"></flint-input>
</flint-form-field>
```

## Data Attributes for CSS Styling

Flint form controls automatically set data attributes on themselves as the user interacts. Use these to style components based on their state -- no JavaScript needed.

### Validity

| Attribute | When set |
|-----------|----------|
| `data-valid` | The control's value satisfies all constraints |
| `data-invalid` | The control's value fails a constraint |
| `data-user-valid` | Valid **and** the user has interacted (touched) |
| `data-user-invalid` | Invalid **and** the user has interacted (touched) |

### Interaction

| Attribute | When set |
|-----------|----------|
| `data-dirty` | The user has changed the value |
| `data-pristine` | The user has not changed the value |
| `data-touched` | The user has interacted (blurred) the control |
| `data-untouched` | The user has not interacted with the control |

### Other

| Attribute | When set |
|-----------|----------|
| `data-required` | The `required` attribute is set |
| `data-optional` | The `required` attribute is not set |
| `data-disabled` | The control is disabled |
| `data-validation-error` | An error-level validation message is active |
| `data-validation-warning` | A warning-level validation message is active |
| `data-validation-info` | An info-level validation message is active |

### Styling with Data Attributes

```css
/* Red border after the user has interacted and the value is invalid */
flint-input[data-user-invalid]::part(input) {
  border-color: var(--flint-danger-color);
}

/* Green border after the user has interacted and the value is valid */
flint-input[data-user-valid]::part(input) {
  border-color: var(--flint-success-color);
}

/* Subtle highlight on dirty fields */
flint-input[data-dirty]::part(input) {
  background: var(--flint-primary-color-50);
}

/* Warning styling */
flint-input[data-validation-warning]::part(input) {
  border-color: var(--flint-warning-color);
}
```

::: tip
Use `data-user-invalid` instead of `data-invalid` for validation styling. `data-invalid` is set immediately (even before the user types), while `data-user-invalid` waits until the user has interacted -- giving a better UX.
:::

## Custom State Pseudo-Classes

In addition to data attributes, Flint form controls set [custom state pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet) on `ElementInternals.states`. These work like native pseudo-classes:

```css
/* These are equivalent to the data attribute selectors above */
flint-input:state(invalid) { /* ... */ }
flint-input:state(valid) { /* ... */ }
flint-input:state(dirty) { /* ... */ }
flint-input:state(touched) { /* ... */ }
flint-input:state(disabled) { /* ... */ }
flint-input:state(required) { /* ... */ }
flint-input:state(optional) { /* ... */ }
flint-input:state(validation-warning) { /* ... */ }
flint-input:state(validation-info) { /* ... */ }
flint-input:state(validation-error) { /* ... */ }
```

::: tip
Custom state pseudo-classes require browser support for `CustomStateSet`. Data attributes work everywhere and are the recommended approach for most projects.
:::

## Form Reset

Flint form controls respond to `<form>` reset events. When the form is reset, each control reverts to its `default-value` (or empty) and clears its dirty/touched state.

```html
<form>
  <flint-input name="search" default-value="initial"></flint-input>
  <flint-button type="reset">Reset</flint-button>
</form>
```

## The `flint-form-field` Wrapper

For consistent layout, use `flint-form-field` to wrap any form control with a label, helper text, and error message:

```html
<flint-form-field
  label="Email"
  helper-text="We'll never share your email"
  error-message="Please enter a valid email"
  required
>
  <flint-input name="email" type="email"></flint-input>
</flint-form-field>
```

`flint-form-field` automatically syncs its `required`, `disabled`, `error`, and `label` props to the slotted control.

| Property | Description |
|----------|-------------|
| `label` | Label text displayed above the control |
| `helper-text` | Helper text displayed below the control |
| `error-message` | Error message shown when `error` is true |
| `error` | Toggles error state |
| `required` | Shows required indicator and syncs to child |
| `disabled` | Disables the slotted control |
| `label-position` | `'top'` (default) or `'start'` |

## Form-Associated Components

These Flint components participate in form submission:

| Component | Value type |
|-----------|------------|
| `flint-input` | String |
| `flint-text-field` | String |
| `flint-textarea` | String |
| `flint-select` | String (or array for multi-select) |
| `flint-checkbox` | `'on'` when checked |
| `flint-radio` | String (selected radio's value) |
| `flint-switch` | `'on'` when checked |
| `flint-rating` | Number as string |
| `flint-slider` | Number as string |
| `flint-range-slider` | Two numbers |
| `flint-date-picker` | Date string |
| `flint-date-range-picker` | Date range string |
| `flint-time-picker` | Time string |
| `flint-input-otp` | String (concatenated digits) |
| `flint-autocomplete` | String |
| `flint-transfer-list` | Selected item values |

## Complete Example

```html
<form id="contact-form">
  <flint-form-field label="Name" required>
    <flint-input name="name" required min-length="2"></flint-input>
  </flint-form-field>

  <flint-form-field label="Email" required>
    <flint-input name="email" type="email" required></flint-input>
  </flint-form-field>

  <flint-form-field label="Department">
    <flint-select name="department">
      <flint-option value="engineering">Engineering</flint-option>
      <flint-option value="design">Design</flint-option>
      <flint-option value="marketing">Marketing</flint-option>
    </flint-select>
  </flint-form-field>

  <flint-form-field label="Message" required>
    <flint-textarea name="message" required min-length="10"></flint-textarea>
  </flint-form-field>

  <flint-checkbox name="subscribe">Subscribe to updates</flint-checkbox>

  <flint-button type="submit">Send</flint-button>
  <flint-button type="reset" appearance="outlined">Reset</flint-button>
</form>

<script type="module">
  import '@getufy/flint-ui/autoloader';
  import { serialize } from '@getufy/flint-ui';

  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;

    // Native validation check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = serialize(form);
    console.log('Submitting:', data);
  });
</script>
```

```css
/* Show validation only after user interaction */
flint-input[data-user-invalid]::part(input),
flint-textarea[data-user-invalid]::part(textarea) {
  border-color: var(--flint-danger-color);
}

flint-input[data-user-valid]::part(input),
flint-textarea[data-user-valid]::part(textarea) {
  border-color: var(--flint-success-color);
}
```
