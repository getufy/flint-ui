# Format Number

<Demo label="Formats" html="<div style=&quot;display:flex;flex-direction:column;gap:8px&quot;><span>Currency: <flint-format-number value=&quot;1234567.89&quot; style=&quot;currency&quot; currency=&quot;USD&quot;></flint-format-number></span><span>Percent: <flint-format-number value=&quot;0.856&quot; style=&quot;percent&quot;></flint-format-number></span><span>Decimal: <flint-format-number value=&quot;1234567.89&quot; style=&quot;decimal&quot;></flint-format-number></span></div>" />

- **Tag**: `<flint-format-number>`
- **Class**: `FlintFormatNumber`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintFormatNumber } from '@getufy/flint-ui';
```

### Usage

```html
<flint-format-number></flint-format-number>
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
| `signDisplay` | `sign-display` | `'auto' \| 'never' \| 'always' \| 'exceptZero'` | `'auto'` | When to show the sign. - 'auto': sign for negatives only (default) - 'always': always show sign (+/−) - 'never': never show sign - 'exceptZero': show sign for non-zero values |
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
| `--flint-format-number-color` | `inherit` |
| `--flint-format-number-font-size` | `inherit` |
| `--flint-format-number-font-weight` | `inherit` |
| `--flint-format-number-font-family` | `inherit` |
| `--flint-format-number-negative-color` | `var(--flint-format-number-color, inherit` |
| `--flint-format-number-positive-color` | `var(--flint-format-number-color, inherit` |

### Methods

| Method | Description |
| --- | --- |
| `formattedValue(): string` | The most recently formatted string value. Useful for aria-label or title attributes. |

---
