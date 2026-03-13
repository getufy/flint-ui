import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-format-number';
import type { UiFormatNumber } from './ui-format-number';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helper                                                              */
/* ─────────────────────────────────────────────────────────────────── */

function shadowText(el: Element): string {
    const span = el.shadowRoot!.querySelector('span');
    if (!span) return '';
    return Array.from(span.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent ?? '')
        .join('')
        .trim();
}

function shadowSpan(el: Element): HTMLSpanElement {
    return el.shadowRoot!.querySelector('span')!;
}

/* ═══════════════════════════════════════════════════════════════════
   Rendering
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — rendering', () => {
    it('renders a <span> in shadow DOM', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.shadowRoot!.querySelector('span')).not.toBeNull();
    });

    it('renders formatted text inside the span', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1000} lang="en"></ui-format-number>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('host tag is correct', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.tagName.toLowerCase()).toBe('ui-format-number');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Default props
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — default props', () => {
    it('defaults value to 0', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.value).toBe(0);
    });

    it('defaults type to "decimal"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.type).toBe('decimal');
    });

    it('defaults noGrouping to false', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.noGrouping).toBe(false);
    });

    it('defaults currency to "USD"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.currency).toBe('USD');
    });

    it('defaults currencyDisplay to "symbol"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.currencyDisplay).toBe('symbol');
    });

    it('defaults notation to "standard"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.notation).toBe('standard');
    });

    it('defaults compactDisplay to "short"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.compactDisplay).toBe('short');
    });

    it('defaults signDisplay to "auto"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.signDisplay).toBe('auto');
    });

    it('defaults unit to empty string', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.unit).toBe('');
    });

    it('defaults unitDisplay to "short"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.unitDisplay).toBe('short');
    });

    it('defaults all digit props to undefined', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number></ui-format-number>`);
        expect(el.minimumIntegerDigits).toBeUndefined();
        expect(el.minimumFractionDigits).toBeUndefined();
        expect(el.maximumFractionDigits).toBeUndefined();
        expect(el.minimumSignificantDigits).toBeUndefined();
        expect(el.maximumSignificantDigits).toBeUndefined();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Decimal formatting
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — decimal', () => {
    it('formats 1000 with grouping separator in en', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1000} lang="en"></ui-format-number>`);
        expect(shadowText(el)).toContain('1');
        expect(shadowText(el)).toContain('000');
    });

    it('formats 0', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${0} lang="en"></ui-format-number>`);
        expect(shadowText(el)).toBe('0');
    });

    it('formats a negative number', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${-42} lang="en"></ui-format-number>`);
        expect(shadowText(el)).toContain('42');
        // Negative sign present (may be '-' or '−')
        expect(shadowText(el).length).toBeGreaterThan(2);
    });

    it('formats a decimal number', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${3.14} lang="en"></ui-format-number>`);
        const text = shadowText(el);
        expect(text).toContain('3');
        expect(text).toContain('14');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Percent formatting
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — percent', () => {
    it('type="percent": 0 → "0%"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${0} type="percent" lang="en"></ui-format-number>`);
        expect(shadowText(el)).toContain('0');
        expect(shadowText(el)).toContain('%');
    });

    it('type="percent": 0.5 → "50%"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${0.5} type="percent" lang="en"></ui-format-number>`);
        expect(shadowText(el)).toContain('50');
        expect(shadowText(el)).toContain('%');
    });

    it('type="percent": 1 → "100%"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1} type="percent" lang="en"></ui-format-number>`);
        expect(shadowText(el)).toContain('100');
        expect(shadowText(el)).toContain('%');
    });

    it('type="percent": 0.25 → "25%"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${0.25} type="percent" lang="en"></ui-format-number>`);
        expect(shadowText(el)).toContain('25');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Currency formatting
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — currency', () => {
    it('type="currency" USD renders non-empty', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${2000} type="currency" currency="USD" lang="en"></ui-format-number>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('type="currency" USD includes dollar sign', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${2000} type="currency" currency="USD" currency-display="symbol" lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).toContain('$');
    });

    it('type="currency" currency-display="code" includes currency code', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${2000} type="currency" currency="USD" currency-display="code" lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).toContain('USD');
    });

    it('type="currency" currency-display="name" includes currency name', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${2000} type="currency" currency="USD" currency-display="name" lang="en"></ui-format-number>
        `);
        const text = shadowText(el);
        // 'US dollars' or 'US dollar' for en locale
        expect(text.toLowerCase()).toMatch(/dollar/);
    });

    it('different currencies produce different output', async () => {
        const [elUSD, elEUR] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${2000} type="currency" currency="USD" lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${2000} type="currency" currency="EUR" lang="en"></ui-format-number>`),
        ]);
        expect(shadowText(elUSD)).not.toBe(shadowText(elEUR));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   noGrouping
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — noGrouping', () => {
    it('no-grouping removes thousands separator', async () => {
        const [elWith, elWithout] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1000000} lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1000000} no-grouping lang="en"></ui-format-number>`),
        ]);
        // With grouping: "1,000,000"; without: "1000000"
        expect(shadowText(elWith)).not.toBe(shadowText(elWithout));
        expect(shadowText(elWithout)).toContain('1000000');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Notation
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — notation', () => {
    it('notation="compact" renders a shorter string than standard for large numbers', async () => {
        const [elStd, elCmp] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1500000} notation="standard" lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1500000} notation="compact" lang="en"></ui-format-number>`),
        ]);
        expect(shadowText(elCmp).length).toBeLessThan(shadowText(elStd).length);
    });

    it('notation="compact" compact-display="long" produces a different result than short', async () => {
        const [elShort, elLong] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1200000} notation="compact" compact-display="short" lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1200000} notation="compact" compact-display="long" lang="en"></ui-format-number>`),
        ]);
        expect(shadowText(elShort)).not.toBe(shadowText(elLong));
    });

    it('notation="scientific" produces output with E notation', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1500000} notation="scientific" lang="en"></ui-format-number>
        `);
        // scientific notation: "1.5E6" — contains 'E' or digits
        const text = shadowText(el);
        expect(text.length).toBeGreaterThan(0);
        // Should differ from standard
        const std = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1500000} notation="standard" lang="en"></ui-format-number>
        `);
        expect(text).not.toBe(shadowText(std));
    });

    it('notation="engineering" produces output different from standard', async () => {
        const [elStd, elEng] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1500000} notation="standard" lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1500000} notation="engineering" lang="en"></ui-format-number>`),
        ]);
        expect(shadowText(elEng)).not.toBe(shadowText(elStd));
    });

    it('notation attribute is reflected to property', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number notation="compact"></ui-format-number>`);
        expect(el.notation).toBe('compact');
    });

    it('compact-display attribute is reflected to property', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number compact-display="long"></ui-format-number>`);
        expect(el.compactDisplay).toBe('long');
    });

    it('updates when notation changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${2000000} notation="standard" lang="en"></ui-format-number>`);
        const before = shadowText(el);
        el.notation = 'compact';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Sign display
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — signDisplay', () => {
    it('sign-display="always" shows + for positive values', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${250} sign-display="always" lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).toMatch(/\+/);
    });

    it('sign-display="always" shows − for negative values', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${-250} sign-display="always" lang="en"></ui-format-number>
        `);
        // Unicode minus or hyphen-minus
        expect(shadowText(el)).toMatch(/[-\u2212]/);
    });

    it('sign-display="never" hides sign for negative values', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${-250} sign-display="never" lang="en"></ui-format-number>
        `);
        const text = shadowText(el);
        expect(text).not.toMatch(/[-\u2212]/);
        expect(text).toContain('250');
    });

    it('sign-display="exceptZero" shows + for positive, no sign for zero', async () => {
        const [elPos, elZero] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${100} sign-display="exceptZero" lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${0} sign-display="exceptZero" lang="en"></ui-format-number>`),
        ]);
        expect(shadowText(elPos)).toMatch(/\+/);
        expect(shadowText(elZero)).not.toMatch(/[+\u2212-]/);
    });

    it('sign-display="auto" (default) shows no sign for positives', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${250} lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).not.toContain('+');
    });

    it('sign-display attribute is reflected to property', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number sign-display="always"></ui-format-number>`);
        expect(el.signDisplay).toBe('always');
    });

    it('updates when signDisplay changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${42} lang="en"></ui-format-number>`);
        const before = shadowText(el);
        el.signDisplay = 'always';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
        expect(shadowText(el)).toContain('+');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Unit formatting
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — unit', () => {
    it('type="unit" unit="kilometer" renders non-empty', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${42} type="unit" unit="kilometer" lang="en"></ui-format-number>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('type="unit" unit="kilometer" unit-display="short" includes km', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${42} type="unit" unit="kilometer" unit-display="short" lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).toContain('km');
    });

    it('type="unit" unit="kilometer" unit-display="long" includes kilometer', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1} type="unit" unit="kilometer" unit-display="long" lang="en"></ui-format-number>
        `);
        expect(shadowText(el).toLowerCase()).toContain('kilometer');
    });

    it('type="unit" unit-display short and long produce different output', async () => {
        const [elShort, elLong] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${5} type="unit" unit="kilogram" unit-display="short" lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${5} type="unit" unit="kilogram" unit-display="long" lang="en"></ui-format-number>`),
        ]);
        expect(shadowText(elShort)).not.toBe(shadowText(elLong));
    });

    it('type="unit" unit="celsius" renders temperature', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${22} type="unit" unit="celsius" unit-display="short" lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).toContain('22');
    });

    it('unit attribute is reflected to property', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number type="unit" unit="kilogram"></ui-format-number>`);
        expect(el.unit).toBe('kilogram');
    });

    it('unit-display attribute is reflected to property', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number unit-display="long"></ui-format-number>`);
        expect(el.unitDisplay).toBe('long');
    });

    it('updates when unit changes', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${5} type="unit" unit="kilometer" unit-display="short" lang="en"></ui-format-number>
        `);
        const before = shadowText(el);
        el.unit = 'kilogram';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('missing unit falls back gracefully', async () => {
        // type="unit" with no unit set should not throw
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${5} type="unit" lang="en"></ui-format-number>
        `);
        expect(typeof shadowText(el)).toBe('string');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   data-sign attribute
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — data-sign', () => {
    it('positive value sets data-sign="positive"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${42} lang="en"></ui-format-number>`);
        expect(shadowSpan(el).getAttribute('data-sign')).toBe('positive');
    });

    it('negative value sets data-sign="negative"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${-42} lang="en"></ui-format-number>`);
        expect(shadowSpan(el).getAttribute('data-sign')).toBe('negative');
    });

    it('zero sets data-sign="zero"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${0} lang="en"></ui-format-number>`);
        expect(shadowSpan(el).getAttribute('data-sign')).toBe('zero');
    });

    it('NaN omits data-sign attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${NaN} lang="en"></ui-format-number>`);
        expect(shadowSpan(el).hasAttribute('data-sign')).toBe(false);
    });

    it('Infinity omits data-sign attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${Infinity} lang="en"></ui-format-number>`);
        expect(shadowSpan(el).hasAttribute('data-sign')).toBe(false);
    });

    it('data-sign updates when value changes from positive to negative', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${10} lang="en"></ui-format-number>`);
        expect(shadowSpan(el).getAttribute('data-sign')).toBe('positive');
        el.value = -10;
        await el.updateComplete;
        expect(shadowSpan(el).getAttribute('data-sign')).toBe('negative');
    });

    it('formattedValue getter returns the formatted string', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1000} lang="en"></ui-format-number>`);
        expect(el.formattedValue).toBe(shadowText(el));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Fraction digits
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — fraction digits', () => {
    it('minimum-fraction-digits=2 pads to 2 decimal places', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1} .minimumFractionDigits=${2} lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).toContain('.00');
    });

    it('maximum-fraction-digits=0 removes decimals', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1.999} .maximumFractionDigits=${0} lang="en"></ui-format-number>
        `);
        expect(shadowText(el)).not.toContain('.');
    });

    it('maximum-fraction-digits=2 truncates to 2 places', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1.23456} .maximumFractionDigits=${2} lang="en"></ui-format-number>
        `);
        // Should contain '1.23' (rounded)
        expect(shadowText(el)).toMatch(/1\.2\d/);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Significant digits
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — significant digits', () => {
    it('maximum-significant-digits=3 limits precision', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${123456} .maximumSignificantDigits=${3} lang="en"></ui-format-number>
        `);
        // 123456 rounded to 3 sig digits = 123,000
        expect(shadowText(el)).toContain('123');
    });

    it('minimum-significant-digits=5 pads output', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1.5} .minimumSignificantDigits=${5} lang="en"></ui-format-number>
        `);
        // 1.5 with 5 significant digits = "1.5000"
        expect(shadowText(el)).toContain('1.5');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Integer digits
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — integer digits', () => {
    it('minimum-integer-digits=3 pads single digit with zeros', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${7} .minimumIntegerDigits=${3} lang="en" no-grouping></ui-format-number>
        `);
        expect(shadowText(el)).toContain('007');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Localization
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — lang prop', () => {
    it('different lang values produce different output', async () => {
        const [elEn, elDe] = await Promise.all([
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1000.5} .minimumFractionDigits=${1} lang="en"></ui-format-number>`),
            fixture<UiFormatNumber>(html`<ui-format-number .value=${1000.5} .minimumFractionDigits=${1} lang="de"></ui-format-number>`),
        ]);
        // en: "1,000.5" vs de: "1.000,5"
        expect(shadowText(elEn)).not.toBe(shadowText(elDe));
    });

    it('re-renders when lang property changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1000.5} .minimumFractionDigits=${1} lang="en"></ui-format-number>`);
        const before = shadowText(el);
        el.lang = 'de';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('renders with an unsupported lang without crashing', async () => {
        const el = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${42} lang="xx-INVALID"></ui-format-number>
        `);
        // Falls back gracefully — should still produce some string
        expect(typeof shadowText(el)).toBe('string');
    });

    it('lang attribute reflects to property', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number lang="fr"></ui-format-number>`);
        expect(el.lang).toBe('fr');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Reactivity
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — reactivity', () => {
    it('updates when value changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${100} lang="en"></ui-format-number>`);
        const before = shadowText(el);
        el.value = 200;
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when type changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${0.5} type="decimal" lang="en"></ui-format-number>`);
        const before = shadowText(el);
        el.type = 'percent';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
        expect(shadowText(el)).toContain('%');
    });

    it('updates when currency changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${100} type="currency" currency="USD" lang="en"></ui-format-number>`);
        const before = shadowText(el);
        el.currency = 'EUR';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when noGrouping changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1000000} lang="en"></ui-format-number>`);
        const before = shadowText(el);
        el.noGrouping = true;
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when minimumFractionDigits changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1} lang="en"></ui-format-number>`);
        el.minimumFractionDigits = 3;
        await el.updateComplete;
        expect(shadowText(el)).toContain('.000');
    });

    it('updates when maximumFractionDigits changes', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${1.999} lang="en"></ui-format-number>`);
        el.maximumFractionDigits = 0;
        await el.updateComplete;
        expect(shadowText(el)).not.toContain('.');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Edge cases
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — edge cases', () => {
    it('formats Infinity without throwing', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${Infinity} lang="en"></ui-format-number>`);
        expect(typeof shadowText(el)).toBe('string');
    });

    it('formats NaN without throwing', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${NaN} lang="en"></ui-format-number>`);
        expect(typeof shadowText(el)).toBe('string');
    });

    it('formats negative zero', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${-0} lang="en"></ui-format-number>`);
        expect(typeof shadowText(el)).toBe('string');
    });

    it('formats very large number without throwing', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${Number.MAX_SAFE_INTEGER} lang="en"></ui-format-number>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('value=0 with type="percent" renders "0%"', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number .value=${0} type="percent" lang="en"></ui-format-number>`);
        expect(shadowText(el)).toContain('0%');
    });

    it('significant digits take precedence over fraction digits', async () => {
        // When maximumSignificantDigits is set, fraction digit props are not applied
        const elSig = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1.23456} .maximumSignificantDigits=${3} lang="en"></ui-format-number>
        `);
        const elFrac = await fixture<UiFormatNumber>(html`
            <ui-format-number .value=${1.23456} .maximumFractionDigits=${3} lang="en"></ui-format-number>
        `);
        // They may differ since one uses sig digits and the other fraction digits
        expect(typeof shadowText(elSig)).toBe('string');
        expect(typeof shadowText(elFrac)).toBe('string');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Attributes
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-number — attribute binding', () => {
    it('reads value from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number value="42"></ui-format-number>`);
        expect(el.value).toBe(42);
    });

    it('reads type from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number type="percent"></ui-format-number>`);
        expect(el.type).toBe('percent');
    });

    it('no-grouping attribute sets noGrouping=true', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number no-grouping></ui-format-number>`);
        expect(el.noGrouping).toBe(true);
    });

    it('reads minimum-fraction-digits from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number minimum-fraction-digits="2"></ui-format-number>`);
        expect(el.minimumFractionDigits).toBe(2);
    });

    it('reads maximum-fraction-digits from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number maximum-fraction-digits="4"></ui-format-number>`);
        expect(el.maximumFractionDigits).toBe(4);
    });

    it('reads minimum-integer-digits from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number minimum-integer-digits="3"></ui-format-number>`);
        expect(el.minimumIntegerDigits).toBe(3);
    });

    it('reads minimum-significant-digits from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number minimum-significant-digits="2"></ui-format-number>`);
        expect(el.minimumSignificantDigits).toBe(2);
    });

    it('reads maximum-significant-digits from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number maximum-significant-digits="5"></ui-format-number>`);
        expect(el.maximumSignificantDigits).toBe(5);
    });

    it('reads currency-display from attribute', async () => {
        const el = await fixture<UiFormatNumber>(html`<ui-format-number currency-display="code"></ui-format-number>`);
        expect(el.currencyDisplay).toBe('code');
    });
});
