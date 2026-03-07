


We are currently writing a lit component. This component will be used by hundreds of people in different projects. Look into folder named "Format number" and update the component, the css file, the story and test files. Create, refine stories and tests. Look into theme.css or theme-dark.css for variables or add variables there.


We are currently writing a lit component. This component will be used by hundreds of people in different projects. Create a folder named "Format number" and create the component, the css file, the story and test files. Create, refine stories and tests. Look into theme.css or theme-dark.css for variables or add variables there.




Format Number
<sl-format-number> | SlFormatNumber
 
Formats a number using the specified locale and options.

Localization is handled by the browser’s Intl.NumberFormat API. No language packs are required.

1,000

Number to Format
1000
Source
HTML
React

Examples
Percentages
To get the value as a percent, set the type attribute to percent.

0%
25%
50%
75%
100%
Source
HTML
React

Localization
Use the lang attribute to set the number formatting locale.

English: 2,000.00
German: 2.000,00
Russian: 2 000,00
Source
HTML
React

Currency
To format a number as a monetary value, set the type attribute to currency and set the currency attribute to the desired ISO 4217 currency code. You should also specify lang to ensure the the number is formatted correctly for the target locale.

$2,000.00
£2,000.00
2.000,00 €
2 000,00 ₽
¥2,000.00
Source
HTML
React

Importing
If you’re using the autoloader or the traditional loader, you can ignore this section. Otherwise, feel free to use any of the following snippets to cherry pick this component.

To import this component from the CDN using a script tag:

<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/format-number/format-number.js"></script>

Properties
Name	Description	Reflects	Type	Default
value	The number to format.		number	0
type	The formatting style to use.		'currency' | 'decimal' | 'percent'	'decimal'
noGrouping
no-grouping	Turns off grouping separators.		boolean	false
currency	The ISO 4217 currency code to use when formatting.		string	'USD'
currencyDisplay
currency-display	How to display the currency.		'symbol' | 'narrowSymbol' | 'code' | 'name'	'symbol'
minimumIntegerDigits
minimum-integer-digits	The minimum number of integer digits to use. Possible values are 1–21.		number	-
minimumFractionDigits
minimum-fraction-digits	The minimum number of fraction digits to use. Possible values are 0–20.		number	-
maximumFractionDigits
maximum-fraction-digits	The maximum number of fraction digits to use. Possible values are 0–0.		number	-
minimumSignificantDigits
minimum-significant-digits	The minimum number of significant digits to use. Possible values are 1–21.		number	-
maximumSignificantDigits
maximum-significant-digits	The maximum number of significant digits to use,. Possible values are 1–21.		number	-
updateComplete	A read-only promise that resolves when the component has finished updating.			
Learn more about attributes and properties.