# Autocomplete

<Demo html='<div style="display:flex;gap:16px;flex-wrap:wrap"><flint-autocomplete label="Movie" placeholder="Search movies..." style="width:260px" data-options="shawshank:The Shawshank Redemption,godfather:The Godfather,dark-knight:The Dark Knight,pulp-fiction:Pulp Fiction,forrest-gump:Forrest Gump,inception:Inception,matrix:The Matrix,interstellar:Interstellar"></flint-autocomplete><flint-autocomplete label="Disabled" disabled placeholder="Disabled" style="width:260px"></flint-autocomplete></div>' />

Autocomplete: a text input with a dropdown of selectable suggestions.

- **Tag**: `<flint-autocomplete>`
- **Class**: `FlintAutocomplete`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintAutocomplete } from '@getufy/flint-ui';
```

### Usage

```html
<flint-autocomplete></flint-autocomplete>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `shadowRootOptions` | `shadowRootOptions` | `object` | `&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;` |  |
| `dependencies` | `dependencies` | `Record&lt;string, typeof FlintElement&gt;` | `&#123; 'flint-popup': FlintPopup as unknown as typeof FlintElement &#125;` |  |
| `options` | `options` | `(AutocompleteOption \| string)[]` | `[]` | The list of selectable options. Accepts `AutocompleteOption[]` or `string[]`. |
| `freeSolo` | `freeSolo` | `boolean` | `false` | When true, allows arbitrary values that are not in the options list. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the autocomplete input is disabled. |
| `value` | `value` | `string` | `''` | The current selected value. |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the input is empty. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `required` | `required` | `boolean` | `false` | Marks the autocomplete as required for form validation. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage. |
| `hoist` | `hoist` | `boolean` | `true` | When true, the dropdown uses `position: fixed` so it can escape |
| `popupDistance` | `popup-distance` | `number` | `4` | Distance between the input and the dropdown popup (px). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-autocomplete-change` | `&#123; value: string, label: string &#125;` | Fired when the selected value changes. detail: `&#123; value: string, label: string &#125;` |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |
| `dropdown` | The dropdown container. |
| `input` | The native input element. |
| `option` | An individual option element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-autocomplete-dropdown-max-height` | `250px` |
| `--flint-autocomplete-z-index` | `1000` |
| `--flint-autocomplete-option-padding` | `10px 12px` |
| `--flint-font-family` | — |
| `--flint-input-border-color` | — |
| `--flint-input-border-radius` | — |
| `--flint-text-color` | — |
| `--flint-input-bg` | — |
| `--flint-primary-color` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-text-color-subtle` | — |
| `--flint-surface-1` | — |
| `--flint-shadow-md` | — |
| `--flint-hover-color` | — |
| `--flint-text-color-muted` | — |

---
