import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-relative-time';

const meta: Meta = {
    title: 'Utilities/Relative Time',
    component: 'flint-relative-time',
    parameters: {
        docs: {
            description: {
                component: `
Displays a localized time phrase relative to the current date and time.
Uses the browser's \`Intl.RelativeTimeFormat\` API — no language packs needed.

- **Tag**: \`<flint-relative-time>\`
- **Class**: \`FlintRelativeTime\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`date\` | \`date\` | \`Date \\| string \\| number\` | \`new Date()\` | The date to calculate time from. Accepts a Date, ISO string, or Unix ms timestamp. Defaults to the current date/time. |
| \`format\` | \`format\` | \`'long' \\| 'short' \\| 'narrow'\` | \`'long'\` | The formatting style to use. |
| \`numeric\` | \`numeric\` | \`'always' \\| 'auto'\` | \`'auto'\` | When \`auto\`, values such as "yesterday" and "tomorrow" will be shown when |
| \`sync\` | \`sync\` | \`boolean\` | \`false\` | Keep the displayed value up to date as time passes. |
| \`lang\` | \`lang\` | \`string\` | \`''\` | BCP 47 language tag for formatting (e.g. "en", "de", "ja"). Inherits from the document when unset. |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-relative-time-color\` | — |
| \`--flint-relative-time-font-size\` | — |
| \`--flint-relative-time-cursor\` | \`text\` |
| \`--flint-relative-time-font-weight\` | \`inherit\` |
| \`--flint-relative-time-text-decoration\` | \`none\` |
| \`--flint-relative-time-white-space\` | \`nowrap\` |
                `,
            },
        },
    },
    argTypes: {
        date: { control: 'text', description: 'ISO 8601 date string or Date object' },
        format: {
            control: 'select',
            options: ['long', 'short', 'narrow'],
            description: 'Formatting style',
        },
        numeric: {
            control: 'select',
            options: ['always', 'auto'],
            description: 'Numeric mode',
        },
        sync: { control: 'boolean', description: 'Auto-update as time passes' },
    },
    args: {
        date: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
        format: 'long',
        numeric: 'auto',
        sync: false,
    },
};

export default meta;
type Story = StoryObj;

/* ── Playground ──────────────────────────────────────────────────── */
export const Playground: Story = {
    render: (args) => html`
        <flint-relative-time
            .date=${args['date']}
            format=${args['format']}
            numeric=${args['numeric']}
            ?sync=${args['sync']}
        ></flint-relative-time>
    `,
};

/* ── Basic ───────────────────────────────────────────────────────── */
export const Basic: Story = {
    name: 'Basic',
    render: () => {
        const now = Date.now();
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div><flint-relative-time .date=${new Date(now - 20 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(20 seconds ago)</span></div>
                <div><flint-relative-time .date=${new Date(now - 3 * 60 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(3 minutes ago)</span></div>
                <div><flint-relative-time .date=${new Date(now - 2 * 3600 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(2 hours ago)</span></div>
                <div><flint-relative-time .date=${new Date(now - 3 * 86400 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(3 days ago)</span></div>
                <div><flint-relative-time .date=${new Date(now - 45 * 86400 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(45 days ago)</span></div>
                <div><flint-relative-time .date=${new Date(now - 400 * 86400 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(~1 year ago)</span></div>
            </div>
        `;
    },
};

/* ── Future ──────────────────────────────────────────────────────── */
export const Future: Story = {
    name: 'Future Dates',
    render: () => {
        const now = Date.now();
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div><flint-relative-time .date=${new Date(now + 30 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(in 30 seconds)</span></div>
                <div><flint-relative-time .date=${new Date(now + 5 * 60 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(in 5 minutes)</span></div>
                <div><flint-relative-time .date=${new Date(now + 3 * 3600 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(in 3 hours)</span></div>
                <div><flint-relative-time .date=${new Date(now + 2 * 86400 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(in 2 days)</span></div>
                <div><flint-relative-time .date=${new Date(now + 60 * 86400 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(in 60 days)</span></div>
                <div><flint-relative-time .date=${new Date(now + 500 * 86400 * 1000)}></flint-relative-time> <span style="color: #4b5563;">(in ~1.5 years)</span></div>
            </div>
        `;
    },
};

/* ── Sync ────────────────────────────────────────────────────────── */
export const Sync: Story = {
    name: 'Keeping Time in Sync',
    render: () => {
        const date = new Date(Date.now() - 60_000);
        return html`
            <div style="font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <p style="margin: 0 0 8px; color: #4b5563;">This value updates automatically as time passes:</p>
                <flint-relative-time .date=${date} sync></flint-relative-time>
            </div>
        `;
    },
};

/* ── Format ──────────────────────────────────────────────────────── */
export const Format: Story = {
    name: 'Formatting Styles',
    render: () => {
        const date = new Date(Date.now() - 400 * 86400 * 1000);
        return html`
            <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <code style="min-width: 72px; color: #4b5563;">narrow</code>
                    <flint-relative-time .date=${date} format="narrow"></flint-relative-time>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <code style="min-width: 72px; color: #4b5563;">short</code>
                    <flint-relative-time .date=${date} format="short"></flint-relative-time>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <code style="min-width: 72px; color: #4b5563;">long</code>
                    <flint-relative-time .date=${date} format="long"></flint-relative-time>
                </div>
            </div>
        `;
    },
};

/* ── Numeric ─────────────────────────────────────────────────────── */
export const Numeric: Story = {
    name: 'Numeric Mode',
    render: () => {
        const yesterday = new Date(Date.now() - 86400 * 1000);
        const tomorrow = new Date(Date.now() + 86400 * 1000);
        return html`
            <div style="display: flex; flex-direction: column; gap: 16px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div>
                    <p style="margin: 0 0 6px; font-weight: 600;">numeric="auto" (default)</p>
                    <div style="display: flex; flex-direction: column; gap: 4px; color: #374151;">
                        <div>yesterday → <flint-relative-time .date=${yesterday} numeric="auto"></flint-relative-time></div>
                        <div>tomorrow → <flint-relative-time .date=${tomorrow} numeric="auto"></flint-relative-time></div>
                    </div>
                </div>
                <div>
                    <p style="margin: 0 0 6px; font-weight: 600;">numeric="always"</p>
                    <div style="display: flex; flex-direction: column; gap: 4px; color: #374151;">
                        <div>yesterday → <flint-relative-time .date=${yesterday} numeric="always"></flint-relative-time></div>
                        <div>tomorrow → <flint-relative-time .date=${tomorrow} numeric="always"></flint-relative-time></div>
                    </div>
                </div>
            </div>
        `;
    },
};

/* ── Localization ────────────────────────────────────────────────── */
export const Localization: Story = {
    name: 'Localization',
    render: () => {
        const date = new Date(Date.now() - 400 * 86400 * 1000);
        const locales = [
            { lang: 'en', label: 'English' },
            { lang: 'zh', label: 'Chinese' },
            { lang: 'de', label: 'German' },
            { lang: 'el', label: 'Greek' },
            { lang: 'ru', label: 'Russian' },
            { lang: 'ja', label: 'Japanese' },
            { lang: 'ar', label: 'Arabic' },
            { lang: 'fr', label: 'French' },
        ];
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                ${locales.map(({ lang, label }) => html`
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="min-width: 80px; color: #4b5563;">${label}:</span>
                        <flint-relative-time .date=${date} lang=${lang}></flint-relative-time>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── InContext ────────────────────────────────────────────────────── */
export const InContext: Story = {
    name: 'In Context',
    render: () => {
        const now = Date.now();
        return html`
            <div style="
                border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;
                font-family: system-ui; font-size: 0.875rem; max-width: 360px;
            ">
                ${([
                    { user: 'Alice', action: 'commented on your post', ago: 2 * 60 * 1000 },
                    { user: 'Bob', action: 'liked your photo', ago: 45 * 60 * 1000 },
                    { user: 'Carol', action: 'followed you', ago: 3 * 3600 * 1000 },
                    { user: 'Dave', action: 'shared your link', ago: 2 * 86400 * 1000 },
                ] as const).map((item, i) => html`
                    <div style="
                        display: flex; align-items: center; justify-content: space-between;
                        padding: 12px 16px;
                        border-top: ${i > 0 ? '1px solid #f3f4f6' : 'none'};
                    ">
                        <div>
                            <span style="font-weight: 600; color: #111827;">${item.user}</span>
                            <span style="color: #4b5563;"> ${item.action}</span>
                        </div>
                        <flint-relative-time
                            .date=${new Date(now - item.ago)}
                            format="short"
                            style="color: #4b5563; flex-shrink: 0; margin-left: 12px;"
                        ></flint-relative-time>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── CustomStyles ────────────────────────────────────────────────── */
export const CustomStyles: Story = {
    name: 'Custom CSS Properties',
    render: () => {
        const date = new Date(Date.now() - 2 * 3600 * 1000);
        return html`
            <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui; font-size: 0.875rem;">
                <div>
                    <span style="color: #4b5563; margin-right: 8px;">default:</span>
                    <flint-relative-time .date=${date}></flint-relative-time>
                </div>
                <div>
                    <span style="color: #4b5563; margin-right: 8px;">primary color:</span>
                    <flint-relative-time
                        .date=${date}
                        style="--flint-relative-time-color: #2563eb;"
                    ></flint-relative-time>
                </div>
                <div>
                    <span style="color: #4b5563; margin-right: 8px;">large + accent:</span>
                    <flint-relative-time
                        .date=${date}
                        style="--flint-relative-time-color: #7c3aed; --flint-relative-time-font-size: 1.25rem; font-weight: 600;"
                    ></flint-relative-time>
                </div>
            </div>
        `;
    },
};

/* ── EdgeCases ───────────────────────────────────────────────────── */
export const EdgeCases: Story = {
    name: 'Edge Cases',
    render: () => {
        const epoch = new Date(0);                          // Unix epoch
        const farFuture = new Date('2099-12-31T23:59:59Z'); // Far future
        const unixTs = Date.now() - 10 * 60 * 1000;        // Number timestamp
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 160px; color: #4b5563;">invalid date string:</span>
                    <flint-relative-time date="not-a-date"></flint-relative-time>
                    <span style="color: #4b5563; font-size: 0.75rem;">(renders nothing)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 160px; color: #4b5563;">Unix epoch (1970):</span>
                    <flint-relative-time .date=${epoch}></flint-relative-time>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 160px; color: #4b5563;">far future (2099):</span>
                    <flint-relative-time .date=${farFuture}></flint-relative-time>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 160px; color: #4b5563;">number timestamp:</span>
                    <flint-relative-time .date=${unixTs}></flint-relative-time>
                    <span style="color: #4b5563; font-size: 0.75rem;">(10 min ago)</span>
                </div>
            </div>
        `;
    },
};

/* ── LiveCountdown ───────────────────────────────────────────────── */
export const LiveCountdown: Story = {
    name: 'Live Countdown (sync)',
    render: () => {
        const target = new Date(Date.now() + 90 * 1000); // 90 seconds from now
        return html`
            <div style="font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827);">
                <p style="margin: 0 0 12px; color: #4b5563;">
                    Counting down to <strong>${target.toLocaleTimeString()}</strong> — updates automatically:
                </p>
                <div style="
                    display: inline-flex; align-items: center; gap: 8px;
                    background: #f0fdf4; border: 1px solid #86efac;
                    border-radius: 6px; padding: 8px 14px; color: #166534;
                    font-weight: 600;
                ">
                    <span>⏱</span>
                    <flint-relative-time
                        .date=${target}
                        sync
                        style="--flint-relative-time-color: #166534;"
                    ></flint-relative-time>
                </div>
            </div>
        `;
    },
};

/* ── InlineText ──────────────────────────────────────────────────── */
export const InlineText: Story = {
    name: 'Inline Within Text',
    render: () => {
        const now = Date.now();
        return html`
            <div style="font-family: system-ui; font-size: 0.875rem; color: var(--flint-text-color, #111827); line-height: 1.75; max-width: 480px;">
                <p style="margin: 0 0 8px;">
                    This document was last edited
                    <flint-relative-time .date=${new Date(now - 7 * 60 * 1000)} style="font-weight: 600;"></flint-relative-time>
                    by Alice.
                </p>
                <p style="margin: 0 0 8px;">
                    The next scheduled review is
                    <flint-relative-time .date=${new Date(now + 3 * 86400 * 1000)} style="font-weight: 600;"></flint-relative-time>.
                </p>
                <p style="margin: 0; color: #4b5563; font-size: 0.75rem;">
                    Component uses <code>display: inline</code> — flows naturally inside prose.
                </p>
            </div>
        `;
    },
};
