# Autocomplete

<Demo>

<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-autocomplete label="Movie" placeholder="Search movies..." style="width:260px"></ui-autocomplete>
<ui-autocomplete label="Disabled" disabled style="width:260px"></ui-autocomplete>
</div>

</Demo>

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
