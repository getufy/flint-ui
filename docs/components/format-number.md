# Format Number

<Demo label="Formats">

<div style="display:flex;flex-direction:column;gap:8px">
<span>Currency: <ui-format-number value="1234567.89" style="currency" currency="USD"></ui-format-number></span>
<span>Percent: <ui-format-number value="0.856" style="percent"></ui-format-number></span>
<span>Decimal: <ui-format-number value="1234567.89" style="decimal"></ui-format-number></span>
</div>

</Demo>

- **Tag**: `<ui-format-number>`
- **Class**: `UiFormatNumber`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiFormatNumber } from 'storybook-lit';
```

### Usage

```html
<ui-format-number></ui-format-number>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `number` | `0` | The number to format. |
| `type` | `type` | `'currency' \| 'decimal' \| 'percent' \| 'unit'` | `'decimal'` | The formatting style to use. |
| `noGrouping` | `no-grouping` | `boolean` | `false` | Turns off grouping separators (e.g. thousands separator). |
| `currency` | `currency` | `string` | `'USD'` | The ISO 4217 currency code to use when formatting (e.g. 'USD', 'EUR', 'GBP'). |
| `currencyDisplay` | `currency-display` | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'` | `'symbol'` | How to display the currency. |
| `notation` | `notation` | `'standard' \| 'scientific' \| 'engineering' \| 'compact'` | `'standard'` | Number notation style. 'compact' renders e.g. "1.2K" or "3.4M". |
| `compactDisplay` | `compact-display` | `'short' \| 'long'` | `'short'` | How to display compact notation — 'short' (1K) or 'long' (1 thousand). |
| `signDisplay` | `sign-display` | `'auto' \| 'never' \| 'always' \| 'exceptZero'` | `'auto'` |  |
| `unit` | `unit` | `string` | `''` | ECMA-402 unit identifier (e.g. 'kilometer', 'kilogram', 'celsius'). Required when type='unit'. |
| `unitDisplay` | `unit-display` | `'short' \| 'long' \| 'narrow'` | `'short'` | How to display the unit when type='unit'. |
| `minimumIntegerDigits` | `minimum-integer-digits` | `number \| undefined` | `undefined` | The minimum number of integer digits (1–21). |
| `minimumFractionDigits` | `minimum-fraction-digits` | `number \| undefined` | `undefined` | The minimum number of fraction digits (0–20). |
| `maximumFractionDigits` | `maximum-fraction-digits` | `number \| undefined` | `undefined` | The maximum number of fraction digits (0–20). |
| `minimumSignificantDigits` | `minimum-significant-digits` | `number \| undefined` | `undefined` | The minimum number of significant digits (1–21). |
| `maximumSignificantDigits` | `maximum-significant-digits` | `number \| undefined` | `undefined` | The maximum number of significant digits (1–21). |
| `lang` | `lang` | `string` | `''` | BCP 47 language tag for formatting locale. Inherits from the document when unset. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-format-number-color` | `inherit` |
| `--ui-format-number-font-size` | `inherit` |
| `--ui-format-number-font-weight` | `inherit` |
| `--ui-format-number-font-family` | `inherit` |
| `--ui-format-number-negative-color` | `var(--ui-format-number-color, inherit` |
| `--ui-format-number-positive-color` | `var(--ui-format-number-color, inherit` |

### Methods

| Method | Description |
| --- | --- |
| `formattedValue(): string` |  |

---
