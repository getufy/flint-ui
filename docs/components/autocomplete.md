# Autocomplete

<Demo html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-autocomplete label=&quot;Movie&quot; placeholder=&quot;Search movies...&quot; style=&quot;width:260px&quot; data-options=&quot;shawshank:The Shawshank Redemption,godfather:The Godfather,dark-knight:The Dark Knight,pulp-fiction:Pulp Fiction,forrest-gump:Forrest Gump,inception:Inception,matrix:The Matrix,interstellar:Interstellar&quot;></flint-autocomplete><flint-autocomplete label=&quot;Disabled&quot; disabled placeholder=&quot;Disabled&quot; style=&quot;width:260px&quot;></flint-autocomplete></div>" />

- **Tag**: `<flint-autocomplete>`
- **Class**: `FlintAutocomplete`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintAutocomplete } from 'flint-ui';
```

### Usage

```html
<flint-autocomplete></flint-autocomplete>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `options` | `options` | `AutocompleteOption[]` | `[]` | The list of selectable options with label and value. |
| `freeSolo` | `free-solo` | `boolean` | `false` | If true, allows arbitrary input values not in the options list. |
| `disabled` | `disabled` | `boolean` | `false` | If true, disables the autocomplete input. |
| `value` | `value` | `string` | `''` | The currently selected option value. |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder text shown when the input is empty. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: this.value, label: this.value }` | Fired when an option is selected or the value changes in free-solo mode. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-autocomplete-dropdown-max-height` | `250px` |
| `--flint-autocomplete-z-index` | `10` |
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
| `--flint-hover-color` | — |
| `--flint-text-color-muted` | — |

---
