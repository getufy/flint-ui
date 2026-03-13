# Autocomplete

<Demo html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><ui-autocomplete label=&quot;Movie&quot; placeholder=&quot;Search movies...&quot; style=&quot;width:260px&quot; data-options=&quot;shawshank:The Shawshank Redemption,godfather:The Godfather,dark-knight:The Dark Knight,pulp-fiction:Pulp Fiction,forrest-gump:Forrest Gump,inception:Inception,matrix:The Matrix,interstellar:Interstellar&quot;></ui-autocomplete><ui-autocomplete label=&quot;Disabled&quot; disabled placeholder=&quot;Disabled&quot; style=&quot;width:260px&quot;></ui-autocomplete></div>" />

- **Tag**: `<ui-autocomplete>`
- **Class**: `UiAutocomplete`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAutocomplete } from 'storybook-lit';
```

### Usage

```html
<ui-autocomplete></ui-autocomplete>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `options` | `options` | `AutocompleteOption[]` | `[]` |  |
| `freeSolo` | `free-solo` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `value` | `value` | `string` | `''` |  |
| `placeholder` | `placeholder` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: this.value, label: this.value }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-autocomplete-dropdown-max-height` | `250px` |
| `--ui-autocomplete-z-index` | `10` |
| `--ui-autocomplete-option-padding` | `10px 12px` |
| `--ui-font-family` | — |
| `--ui-input-border-color` | — |
| `--ui-input-border-radius` | — |
| `--ui-text-color` | — |
| `--ui-input-bg` | — |
| `--ui-primary-color` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-text-color-subtle` | — |
| `--ui-surface-1` | — |
| `--ui-hover-color` | — |
| `--ui-text-color-muted` | — |

---
