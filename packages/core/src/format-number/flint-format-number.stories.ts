import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-format-number';

const meta: Meta = {
    title: 'Utilities/Format Number',
    component: 'flint-format-number',
    parameters: {
        docs: {
            description: {
                component: `
Formats a number using the specified locale and options.
Localization is handled by the browser's \`Intl.NumberFormat\` API — no language packs required.

### Components
- **\`flint-format-number\`** — Renders an inline \`<span>\` with a formatted number.

### Props
| Prop | Attribute | Values | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | number | \`0\` | The number to format |
| \`type\` | \`type\` | \`'currency'\` \`'decimal'\` \`'percent'\` \`'unit'\` | \`'decimal'\` | Formatting style |
| \`noGrouping\` | \`no-grouping\` | boolean | \`false\` | Disable grouping separators |
| \`currency\` | \`currency\` | ISO 4217 string | \`'USD'\` | Currency code (used when type='currency') |
| \`currencyDisplay\` | \`currency-display\` | \`'symbol'\` \`'narrowSymbol'\` \`'code'\` \`'name'\` | \`'symbol'\` | How to display the currency |
| \`notation\` | \`notation\` | \`'standard'\` \`'scientific'\` \`'engineering'\` \`'compact'\` | \`'standard'\` | Number notation |
| \`compactDisplay\` | \`compact-display\` | \`'short'\` \`'long'\` | \`'short'\` | Compact form (used when notation='compact') |
| \`signDisplay\` | \`sign-display\` | \`'auto'\` \`'never'\` \`'always'\` \`'exceptZero'\` | \`'auto'\` | When to show the sign |
| \`unit\` | \`unit\` | ECMA-402 unit string | \`''\` | Unit identifier (used when type='unit') |
| \`unitDisplay\` | \`unit-display\` | \`'short'\` \`'long'\` \`'narrow'\` | \`'short'\` | How to display the unit |
| \`minimumIntegerDigits\` | \`minimum-integer-digits\` | 1–21 | — | Minimum integer digits |
| \`minimumFractionDigits\` | \`minimum-fraction-digits\` | 0–20 | — | Minimum fraction digits |
| \`maximumFractionDigits\` | \`maximum-fraction-digits\` | 0–20 | — | Maximum fraction digits |
| \`minimumSignificantDigits\` | \`minimum-significant-digits\` | 1–21 | — | Minimum significant digits |
| \`maximumSignificantDigits\` | \`maximum-significant-digits\` | 1–21 | — | Maximum significant digits |
| \`lang\` | \`lang\` | BCP 47 string | document locale | Formatting locale |

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--flint-format-number-color\` | \`inherit\` | Text color |
| \`--flint-format-number-font-size\` | \`inherit\` | Font size |
| \`--flint-format-number-font-weight\` | \`inherit\` | Font weight |
| \`--flint-format-number-font-family\` | \`inherit\` | Font family |
| \`--flint-format-number-positive-color\` | \`inherit\` | Color applied when value > 0 |
| \`--flint-format-number-negative-color\` | \`inherit\` | Color applied when value < 0 |

### data-sign attribute
The inner \`<span>\` receives a \`data-sign\` attribute (\`"positive"\`, \`"negative"\`, or \`"zero"\`) that
you can target via CSS selectors or read from JS for additional styling logic.
                `,
            },
        },
    },
    argTypes: {
        value: { control: 'number', description: 'The number to format' },
        type: {
            control: 'select',
            options: ['decimal', 'currency', 'percent', 'unit'],
            description: 'Formatting style',
        },
        noGrouping: { control: 'boolean', description: 'Disable grouping separators' },
        currency: { control: 'text', description: 'ISO 4217 currency code (used when type=currency)' },
        currencyDisplay: {
            control: 'select',
            options: ['symbol', 'narrowSymbol', 'code', 'name'],
            description: 'How to display the currency',
        },
        notation: {
            control: 'select',
            options: ['standard', 'scientific', 'engineering', 'compact'],
            description: 'Number notation style',
        },
        compactDisplay: {
            control: 'select',
            options: ['short', 'long'],
            description: 'Compact display form (used when notation=compact)',
        },
        signDisplay: {
            control: 'select',
            options: ['auto', 'never', 'always', 'exceptZero'],
            description: 'When to show the sign',
        },
        unit: { control: 'text', description: 'ECMA-402 unit (used when type=unit, e.g. "kilometer")' },
        unitDisplay: {
            control: 'select',
            options: ['short', 'long', 'narrow'],
            description: 'How to display the unit',
        },
        minimumIntegerDigits: { control: 'number', description: 'Minimum integer digits (1–21)' },
        minimumFractionDigits: { control: 'number', description: 'Minimum fraction digits (0–20)' },
        maximumFractionDigits: { control: 'number', description: 'Maximum fraction digits (0–20)' },
        minimumSignificantDigits: { control: 'number', description: 'Minimum significant digits (1–21)' },
        maximumSignificantDigits: { control: 'number', description: 'Maximum significant digits (1–21)' },
        lang: { control: 'text', description: 'BCP 47 locale (e.g. "en", "de", "ru")' },
    },
    args: {
        value: 1000,
        type: 'decimal',
        noGrouping: false,
        currency: 'USD',
        currencyDisplay: 'symbol',
        notation: 'standard',
        compactDisplay: 'short',
        signDisplay: 'auto',
        unit: '',
        unitDisplay: 'short',
        lang: 'en',
    },
};

export default meta;
type Story = StoryObj;

/* ── Playground ──────────────────────────────────────────────────── */
export const Playground: Story = {
    render: (args) => html`
        <flint-format-number
            .value=${args['value']}
            .type=${args['type']}
            ?no-grouping=${args['noGrouping']}
            .currency=${args['currency']}
            .currencyDisplay=${args['currencyDisplay']}
            .notation=${args['notation']}
            .compactDisplay=${args['compactDisplay']}
            .signDisplay=${args['signDisplay']}
            .unit=${args['unit'] ?? ''}
            .unitDisplay=${args['unitDisplay']}
            .minimumIntegerDigits=${args['minimumIntegerDigits']}
            .minimumFractionDigits=${args['minimumFractionDigits']}
            .maximumFractionDigits=${args['maximumFractionDigits']}
            .minimumSignificantDigits=${args['minimumSignificantDigits']}
            .maximumSignificantDigits=${args['maximumSignificantDigits']}
            lang=${args['lang'] ?? ''}
        ></flint-format-number>
    `,
};

/* ── Notation ────────────────────────────────────────────────────── */
export const Notation: Story = {
    name: 'Notation',
    render: () => {
        const values = [1234567, 0.000042, 1500000];
        const notations: Array<'standard' | 'scientific' | 'engineering' | 'compact'> = [
            'standard', 'scientific', 'engineering', 'compact',
        ];
        return html`
            <div style="font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div style="display: grid; grid-template-columns: 120px repeat(${notations.length}, 1fr); gap: 8px 16px; align-items: center;">
                    <span style="color: #6b7280; font-weight: 600;">value</span>
                    ${notations.map(n => html`<span style="color: #6b7280; font-weight: 600;">${n}</span>`)}
                    ${values.map(v => html`
                        <code style="color: #6b7280;">${v}</code>
                        ${notations.map(n => html`
                            <flint-format-number .value=${v} .notation=${n} lang="en"></flint-format-number>
                        `)}
                    `)}
                </div>
            </div>
        `;
    },
};

/* ── Compact Display ─────────────────────────────────────────────── */
export const CompactDisplay: Story = {
    name: 'Compact Display',
    render: () => {
        const values = [1200, 45000, 3200000, 8100000000];
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div style="display: grid; grid-template-columns: 140px 1fr 1fr; gap: 8px 16px;">
                    <span style="color: #6b7280; font-weight: 600;">value</span>
                    <span style="color: #6b7280; font-weight: 600;">short</span>
                    <span style="color: #6b7280; font-weight: 600;">long</span>
                    ${values.map(v => html`
                        <code style="color: #6b7280;">${v.toLocaleString('en')}</code>
                        <flint-format-number .value=${v} notation="compact" compact-display="short" lang="en"></flint-format-number>
                        <flint-format-number .value=${v} notation="compact" compact-display="long" lang="en"></flint-format-number>
                    `)}
                </div>
            </div>
        `;
    },
};

/* ── Sign Display ────────────────────────────────────────────────── */
export const SignDisplay: Story = {
    name: 'Sign Display',
    render: () => {
        const values = [-500, 0, 250];
        const modes: Array<'auto' | 'never' | 'always' | 'exceptZero'> = [
            'auto', 'never', 'always', 'exceptZero',
        ];
        return html`
            <div style="font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div style="display: grid; grid-template-columns: 80px repeat(${modes.length}, 1fr); gap: 8px 16px; align-items: center;">
                    <span style="color: #6b7280; font-weight: 600;">value</span>
                    ${modes.map(m => html`<span style="color: #6b7280; font-weight: 600;">${m}</span>`)}
                    ${values.map(v => html`
                        <code style="color: #6b7280;">${v}</code>
                        ${modes.map(m => html`
                            <flint-format-number .value=${v} .signDisplay=${m} lang="en"></flint-format-number>
                        `)}
                    `)}
                </div>
            </div>
        `;
    },
};

/* ── Units ───────────────────────────────────────────────────────── */
export const Units: Story = {
    name: 'Units',
    render: () => {
        const entries = [
            { value: 42, unit: 'kilometer', label: 'Distance' },
            { value: 75.5, unit: 'kilogram', label: 'Weight' },
            { value: 100, unit: 'kilometer-per-hour', label: 'Speed' },
            { value: 22, unit: 'celsius', label: 'Temperature' },
            { value: 1.5, unit: 'liter', label: 'Volume' },
            { value: 250, unit: 'milligram', label: 'Medicine' },
            { value: 8, unit: 'hour', label: 'Duration' },
            { value: 1024, unit: 'megabyte', label: 'Storage' },
        ];
        return html`
            <div style="font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div style="display: grid; grid-template-columns: 120px 1fr 1fr 1fr; gap: 8px 16px; align-items: center;">
                    <span style="color: #6b7280; font-weight: 600;">label</span>
                    <span style="color: #6b7280; font-weight: 600;">short</span>
                    <span style="color: #6b7280; font-weight: 600;">long</span>
                    <span style="color: #6b7280; font-weight: 600;">narrow</span>
                    ${entries.map(({ value, unit, label }) => html`
                        <span style="color: #6b7280;">${label}</span>
                        <flint-format-number .value=${value} type="unit" .unit=${unit} unit-display="short" lang="en"></flint-format-number>
                        <flint-format-number .value=${value} type="unit" .unit=${unit} unit-display="long" lang="en"></flint-format-number>
                        <flint-format-number .value=${value} type="unit" .unit=${unit} unit-display="narrow" lang="en"></flint-format-number>
                    `)}
                </div>
            </div>
        `;
    },
};

/* ── Positive / Negative Colors ──────────────────────────────────── */
export const PositiveNegativeColors: Story = {
    name: 'Positive / Negative Colors',
    render: () => {
        const changes = [
            { label: 'Revenue', value: 12480.5 },
            { label: 'Expenses', value: -3200 },
            { label: 'Net', value: 9280.5 },
            { label: 'Returns', value: -450.25 },
            { label: 'Tax liability', value: 0 },
        ];
        return html`
            <div style="
                font-family: system-ui; font-size: 0.875rem;
                --flint-format-number-positive-color: #16a34a;
                --flint-format-number-negative-color: #dc2626;
            ">
                <p style="color: #6b7280; margin: 0 0 12px 0; font-size: 0.75rem;">
                    Set <code>--flint-format-number-positive-color</code> and
                    <code>--flint-format-number-negative-color</code> on a parent.
                </p>
                <div style="display: flex; flex-direction: column; gap: 6px; max-width: 300px;">
                    ${changes.map(({ label, value }) => html`
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
                            <span style="color: #374151;">${label}</span>
                            <flint-format-number
                                .value=${value}
                                type="currency"
                                currency="USD"
                                .signDisplay=${'exceptZero'}
                                style="font-weight: 600;"
                                lang="en"
                            ></flint-format-number>
                        </div>
                    `)}
                </div>
            </div>
        `;
    },
};

/* ── Percentages ─────────────────────────────────────────────────── */
export const Percentages: Story = {
    name: 'Percentages',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
            ${[0, 0.25, 0.5, 0.75, 1].map(v => html`
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 60px; color: #6b7280;">${v}</code>
                    <flint-format-number .value=${v} type="percent" lang="en"></flint-format-number>
                </div>
            `)}
        </div>
    `,
};

/* ── Localization ────────────────────────────────────────────────── */
export const Localization: Story = {
    name: 'Localization',
    render: () => {
        const locales = [
            { lang: 'en', label: 'English' },
            { lang: 'de', label: 'German' },
            { lang: 'ru', label: 'Russian' },
            { lang: 'fr', label: 'French' },
            { lang: 'ja', label: 'Japanese' },
            { lang: 'ar', label: 'Arabic' },
            { lang: 'hi', label: 'Hindi' },
            { lang: 'zh', label: 'Chinese' },
        ];
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                ${locales.map(({ lang, label }) => html`
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <span style="min-width: 80px; color: #6b7280;">${label}:</span>
                        <flint-format-number .value=${2000} .minimumFractionDigits=${2} lang=${lang}></flint-format-number>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── Currency ────────────────────────────────────────────────────── */
export const Currency: Story = {
    name: 'Currency',
    render: () => {
        const entries = [
            { currency: 'USD', lang: 'en', label: 'USD (English)' },
            { currency: 'GBP', lang: 'en-GB', label: 'GBP (British)' },
            { currency: 'EUR', lang: 'de', label: 'EUR (German)' },
            { currency: 'RUB', lang: 'ru', label: 'RUB (Russian)' },
            { currency: 'JPY', lang: 'ja', label: 'JPY (Japanese)' },
            { currency: 'INR', lang: 'hi', label: 'INR (Hindi)' },
        ];
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                ${entries.map(({ currency, lang, label }) => html`
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <span style="min-width: 140px; color: #6b7280;">${label}:</span>
                        <flint-format-number .value=${2000} type="currency" .currency=${currency} lang=${lang}></flint-format-number>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── Currency Display ────────────────────────────────────────────── */
export const CurrencyDisplay: Story = {
    name: 'Currency Display',
    render: () => {
        const displays: Array<'symbol' | 'narrowSymbol' | 'code' | 'name'> = ['symbol', 'narrowSymbol', 'code', 'name'];
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                ${displays.map(d => html`
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <code style="min-width: 140px; color: #6b7280;">${d}</code>
                        <flint-format-number .value=${2000} type="currency" currency="EUR" .currencyDisplay=${d} lang="en"></flint-format-number>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── No Grouping ─────────────────────────────────────────────────── */
export const NoGrouping: Story = {
    name: 'No Grouping',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
            <div style="display: flex; align-items: center; gap: 16px;">
                <span style="min-width: 160px; color: #6b7280;">with grouping:</span>
                <flint-format-number .value=${1000000} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <span style="min-width: 160px; color: #6b7280;">no-grouping:</span>
                <flint-format-number .value=${1000000} no-grouping lang="en"></flint-format-number>
            </div>
        </div>
    `,
};

/* ── Fraction Digits ─────────────────────────────────────────────── */
export const FractionDigits: Story = {
    name: 'Fraction Digits',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 220px; color: #6b7280;">no fraction options</code>
                <flint-format-number .value=${1234.5678} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 220px; color: #6b7280;">minimum-fraction-digits=2</code>
                <flint-format-number .value=${1234.5} .minimumFractionDigits=${2} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 220px; color: #6b7280;">maximum-fraction-digits=2</code>
                <flint-format-number .value=${1234.5678} .maximumFractionDigits=${2} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 220px; color: #6b7280;">min=2 max=4</code>
                <flint-format-number .value=${1234.5} .minimumFractionDigits=${2} .maximumFractionDigits=${4} lang="en"></flint-format-number>
            </div>
        </div>
    `,
};

/* ── Significant Digits ──────────────────────────────────────────── */
export const SignificantDigits: Story = {
    name: 'Significant Digits',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 260px; color: #6b7280;">minimum-significant-digits=3</code>
                <flint-format-number .value=${1.5} .minimumSignificantDigits=${3} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 260px; color: #6b7280;">maximum-significant-digits=3</code>
                <flint-format-number .value=${123456.789} .maximumSignificantDigits=${3} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 260px; color: #6b7280;">min=2 max=4 significant</code>
                <flint-format-number .value=${0.00123} .minimumSignificantDigits=${2} .maximumSignificantDigits=${4} lang="en"></flint-format-number>
            </div>
        </div>
    `,
};

/* ── Integer Digits ──────────────────────────────────────────────── */
export const IntegerDigits: Story = {
    name: 'Minimum Integer Digits',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 220px; color: #6b7280;">minimum-integer-digits=1</code>
                <flint-format-number .value=${7} .minimumIntegerDigits=${1} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 220px; color: #6b7280;">minimum-integer-digits=3</code>
                <flint-format-number .value=${7} .minimumIntegerDigits=${3} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <code style="min-width: 220px; color: #6b7280;">minimum-integer-digits=5</code>
                <flint-format-number .value=${42} .minimumIntegerDigits=${5} lang="en"></flint-format-number>
            </div>
        </div>
    `,
};

/* ── Custom Styles ───────────────────────────────────────────────── */
export const CustomStyles: Story = {
    name: 'Custom CSS Properties',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui; font-size: 0.875rem;">
            <div>
                <span style="color: #6b7280; margin-right: 8px;">default:</span>
                <flint-format-number .value=${1234567} lang="en"></flint-format-number>
            </div>
            <div>
                <span style="color: #6b7280; margin-right: 8px;">primary color:</span>
                <flint-format-number
                    .value=${1234567}
                    lang="en"
                    style="--flint-format-number-color: #3b82f6;"
                ></flint-format-number>
            </div>
            <div>
                <span style="color: #6b7280; margin-right: 8px;">large + accent:</span>
                <flint-format-number
                    .value=${1234567}
                    lang="en"
                    style="--flint-format-number-color: #8b5cf6; --flint-format-number-font-size: 1.5rem; --flint-format-number-font-weight: 700;"
                ></flint-format-number>
            </div>
            <div>
                <span style="color: #6b7280; margin-right: 8px;">monospace font:</span>
                <flint-format-number
                    .value=${9007199254740991}
                    lang="en"
                    style="--flint-format-number-font-family: 'Courier New', monospace; --flint-format-number-font-size: 0.9rem;"
                ></flint-format-number>
            </div>
        </div>
    `,
};

/* ── Edge Cases ──────────────────────────────────────────────────── */
export const EdgeCases: Story = {
    name: 'Edge Cases',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="min-width: 200px; color: #6b7280;">zero:</span>
                <flint-format-number .value=${0} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="min-width: 200px; color: #6b7280;">negative:</span>
                <flint-format-number .value=${-1234.56} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="min-width: 200px; color: #6b7280;">very large:</span>
                <flint-format-number .value=${9007199254740991} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="min-width: 200px; color: #6b7280;">very small (0.000001):</span>
                <flint-format-number .value=${0.000001} .maximumSignificantDigits=${3} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="min-width: 200px; color: #6b7280;">Infinity:</span>
                <flint-format-number .value=${Infinity} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="min-width: 200px; color: #6b7280;">NaN:</span>
                <flint-format-number .value=${NaN} lang="en"></flint-format-number>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="min-width: 200px; color: #6b7280;">negative zero:</span>
                <flint-format-number .value=${-0} lang="en"></flint-format-number>
            </div>
        </div>
    `,
};

/* ── In Context ──────────────────────────────────────────────────── */
export const InContext: Story = {
    name: 'In Context',
    render: () => {
        const stats = [
            { label: 'Monthly Revenue', value: 48250.75, currency: 'USD' },
            { label: 'Active Users', value: 12489, currency: null },
            { label: 'Conversion Rate', value: 0.0342, currency: null, percent: true },
            { label: 'Avg. Order Value', value: 119.99, currency: 'USD' },
            { label: 'Churn Rate', value: -0.022, currency: null, percent: true },
            { label: 'Net Promoter Score', value: 42, currency: null },
        ];
        return html`
            <div style="
                display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
                font-family: system-ui; max-width: 600px;
                --flint-format-number-negative-color: #dc2626;
                --flint-format-number-positive-color: #16a34a;
            ">
                ${stats.map(s => html`
                    <div style="
                        border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;
                    ">
                        <div style="font-size: 0.75rem; color: #6b7280; margin-bottom: 4px;">${s.label}</div>
                        <div style="font-size: 1.25rem; font-weight: 600; color: #111827;">
                            ${s.percent
                                ? html`<flint-format-number .value=${s.value} type="percent" .minimumFractionDigits=${1} sign-display="exceptZero" lang="en"></flint-format-number>`
                                : s.currency
                                    ? html`<flint-format-number .value=${s.value} type="currency" .currency=${s.currency} lang="en"></flint-format-number>`
                                    : html`<flint-format-number .value=${s.value} notation="compact" lang="en"></flint-format-number>`
                            }
                        </div>
                    </div>
                `)}
            </div>
        `;
    },
};
