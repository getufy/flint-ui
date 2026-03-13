import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './ui-format-number.css?inline';

/**
 * Formats a number using the specified locale and options.
 * Localization is handled by the browser's `Intl.NumberFormat` API — no language packs required.
 *
 * @attr {number} value                    - The number to format. Default: 0.
 * @attr {'currency'|'decimal'|'percent'|'unit'} type - The formatting style. Default: 'decimal'.
 * @attr {boolean} no-grouping             - Turns off grouping separators.
 * @attr {string}  currency               - ISO 4217 currency code (e.g. 'USD', 'EUR'). Default: 'USD'.
 * @attr {'symbol'|'narrowSymbol'|'code'|'name'} currency-display - How to display the currency. Default: 'symbol'.
 * @attr {'standard'|'scientific'|'engineering'|'compact'} notation - Number notation. Default: 'standard'.
 * @attr {'short'|'long'} compact-display  - Compact display form when notation='compact'. Default: 'short'.
 * @attr {'auto'|'never'|'always'|'exceptZero'} sign-display - When to show the sign. Default: 'auto'.
 * @attr {string} unit                    - ECMA-402 unit identifier (e.g. 'kilometer', 'kilogram'). Used when type='unit'.
 * @attr {'short'|'long'|'narrow'} unit-display - How to display the unit. Default: 'short'.
 * @attr {number} minimum-integer-digits   - Minimum integer digits (1–21).
 * @attr {number} minimum-fraction-digits  - Minimum fraction digits (0–20).
 * @attr {number} maximum-fraction-digits  - Maximum fraction digits (0–20).
 * @attr {number} minimum-significant-digits - Minimum significant digits (1–21).
 * @attr {number} maximum-significant-digits - Maximum significant digits (1–21).
 * @attr {string} lang                    - BCP 47 language tag for formatting locale.
 *
 * @cssprop --ui-format-number-color          - Text color (default: `inherit`).
 * @cssprop --ui-format-number-font-size      - Font size (default: `inherit`).
 * @cssprop --ui-format-number-font-weight    - Font weight (default: `inherit`).
 * @cssprop --ui-format-number-font-family    - Font family (default: `inherit`).
 * @cssprop --ui-format-number-positive-color - Color for positive values (default: `inherit`).
 * @cssprop --ui-format-number-negative-color - Color for negative values (default: `inherit`).
 */
@customElement('ui-format-number')
export class UiFormatNumber extends LitElement {
    static styles = unsafeCSS(styles);

    /** The number to format. */
    @property({ type: Number })
    value = 0;

    /** The formatting style to use. */
    @property({ type: String })
    type: 'currency' | 'decimal' | 'percent' | 'unit' = 'decimal';

    /** Turns off grouping separators (e.g. thousands separator). */
    @property({ type: Boolean, attribute: 'no-grouping' })
    noGrouping = false;

    /** The ISO 4217 currency code to use when formatting (e.g. 'USD', 'EUR', 'GBP'). */
    @property({ type: String })
    currency = 'USD';

    /** How to display the currency. */
    @property({ type: String, attribute: 'currency-display' })
    currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol';

    /** Number notation style. 'compact' renders e.g. "1.2K" or "3.4M". */
    @property({ type: String })
    notation: 'standard' | 'scientific' | 'engineering' | 'compact' = 'standard';

    /** How to display compact notation — 'short' (1K) or 'long' (1 thousand). */
    @property({ type: String, attribute: 'compact-display' })
    compactDisplay: 'short' | 'long' = 'short';

    /**
     * When to show the sign.
     * - 'auto': sign for negatives only (default)
     * - 'always': always show sign (+/−)
     * - 'never': never show sign
     * - 'exceptZero': show sign for non-zero values
     */
    @property({ type: String, attribute: 'sign-display' })
    signDisplay: 'auto' | 'never' | 'always' | 'exceptZero' = 'auto';

    /** ECMA-402 unit identifier (e.g. 'kilometer', 'kilogram', 'celsius'). Required when type='unit'. */
    @property({ type: String })
    unit = '';

    /** How to display the unit when type='unit'. */
    @property({ type: String, attribute: 'unit-display' })
    unitDisplay: 'short' | 'long' | 'narrow' = 'short';

    /** The minimum number of integer digits (1–21). */
    @property({ type: Number, attribute: 'minimum-integer-digits' })
    minimumIntegerDigits: number | undefined = undefined;

    /** The minimum number of fraction digits (0–20). */
    @property({ type: Number, attribute: 'minimum-fraction-digits' })
    minimumFractionDigits: number | undefined = undefined;

    /** The maximum number of fraction digits (0–20). */
    @property({ type: Number, attribute: 'maximum-fraction-digits' })
    maximumFractionDigits: number | undefined = undefined;

    /** The minimum number of significant digits (1–21). */
    @property({ type: Number, attribute: 'minimum-significant-digits' })
    minimumSignificantDigits: number | undefined = undefined;

    /** The maximum number of significant digits (1–21). */
    @property({ type: Number, attribute: 'maximum-significant-digits' })
    maximumSignificantDigits: number | undefined = undefined;

    /** BCP 47 language tag for formatting locale. Inherits from the document when unset. */
    @property({ attribute: 'lang', reflect: true })
    override lang = '';

    /** The most recently formatted string value. Useful for aria-label or title attributes. */
    get formattedValue(): string {
        return this._format();
    }

    private _sign(): 'negative' | 'positive' | 'zero' | undefined {
        if (isNaN(this.value) || !isFinite(this.value)) return undefined;
        if (this.value < 0) return 'negative';
        if (this.value > 0) return 'positive';
        return 'zero';
    }

    private _format(): string {
        const options: Intl.NumberFormatOptions = {
            style: this.type,
        };

        if (this.noGrouping) options.useGrouping = false;

        // Notation
        options.notation = this.notation;
        if (this.notation === 'compact') options.compactDisplay = this.compactDisplay;

        // Sign display
        if (this.signDisplay !== 'auto') options.signDisplay = this.signDisplay;

        // Currency options
        if (this.type === 'currency') {
            options.currency = this.currency;
            options.currencyDisplay = this.currencyDisplay;
        }

        // Unit options
        if (this.type === 'unit' && this.unit) {
            options.unit = this.unit;
            options.unitDisplay = this.unitDisplay;
        }

        // Significant digits and fraction digits are mutually exclusive groups.
        // If significant digit props are set, use them exclusively.
        if (this.minimumSignificantDigits !== undefined || this.maximumSignificantDigits !== undefined) {
            if (this.minimumSignificantDigits !== undefined) options.minimumSignificantDigits = this.minimumSignificantDigits;
            if (this.maximumSignificantDigits !== undefined) options.maximumSignificantDigits = this.maximumSignificantDigits;
        } else {
            if (this.minimumIntegerDigits !== undefined)  options.minimumIntegerDigits  = this.minimumIntegerDigits;
            if (this.minimumFractionDigits !== undefined) options.minimumFractionDigits = this.minimumFractionDigits;
            if (this.maximumFractionDigits !== undefined) options.maximumFractionDigits = this.maximumFractionDigits;
        }

        const locale = this.lang || document.documentElement.lang || navigator.language || 'en';

        try {
            return new Intl.NumberFormat(locale, options).format(this.value);
        } catch {
            return String(this.value);
        }
    }

    override render() {
        return html`<span data-sign=${ifDefined(this._sign())}>${this._format()}</span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-format-number': UiFormatNumber;
    }
}
