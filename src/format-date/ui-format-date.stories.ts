import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-format-date';

const meta: Meta = {
    title: 'Utilities/Format Date',
    component: 'ui-format-date',
    parameters: {
        docs: {
            description: {
                component: `
Formats a date/time using the specified locale and options.
Localization is handled by the browser's \`Intl.DateTimeFormat\` API — no language packs required.

### Components
- **\`ui-format-date\`** — Renders a semantic \`<time>\` element with formatted date/time text.

### Props
| Prop | Attribute | Values | Default | Description |
|---|---|---|---|---|
| \`date\` | \`date\` | \`Date\` or ISO string | \`new Date()\` | The date/time to format |
| \`weekday\` | \`weekday\` | \`'narrow'\` | \`'short'\` | \`'long'\` | — | Weekday format |
| \`era\` | \`era\` | \`'narrow'\` | \`'short'\` | \`'long'\` | — | Era format |
| \`year\` | \`year\` | \`'numeric'\` | \`'2-digit'\` | — | Year format |
| \`month\` | \`month\` | \`'numeric'\` | \`'2-digit'\` | \`'narrow'\` | \`'short'\` | \`'long'\` | — | Month format |
| \`day\` | \`day\` | \`'numeric'\` | \`'2-digit'\` | — | Day format |
| \`hour\` | \`hour\` | \`'numeric'\` | \`'2-digit'\` | — | Hour format |
| \`minute\` | \`minute\` | \`'numeric'\` | \`'2-digit'\` | — | Minute format |
| \`second\` | \`second\` | \`'numeric'\` | \`'2-digit'\` | — | Second format |
| \`timeZoneName\` | \`time-zone-name\` | \`'short'\` | \`'long'\` | \`'shortOffset'\` | \`'longOffset'\` | \`'shortGeneric'\` | \`'longGeneric'\` | — | Time zone name format |
| \`timeZone\` | \`time-zone\` | string | — | Time zone (e.g. \`"UTC"\`, \`"America/New_York"\`) |
| \`fractionalSecondDigits\` | \`fractional-second-digits\` | \`1\` | \`2\` | \`3\` | — | Sub-second digits |
| \`dateStyle\` | \`date-style\` | \`'full'\` | \`'long'\` | \`'medium'\` | \`'short'\` | — | Shorthand date style (cannot mix with individual date fields) |
| \`timeStyle\` | \`time-style\` | \`'full'\` | \`'long'\` | \`'medium'\` | \`'short'\` | — | Shorthand time style (cannot mix with individual time fields) |
| \`hourFormat\` | \`hour-format\` | \`'auto'\` | \`'12'\` | \`'24'\` | \`'auto'\` | Force 12/24-hour clock |
| \`lang\` | \`lang\` | BCP 47 string | document locale | Formatting locale |

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-format-date-color\` | \`inherit\` | Text color |
| \`--ui-format-date-font-size\` | \`inherit\` | Font size |
                `,
            },
        },
    },
    argTypes: {
        date: { control: 'text', description: 'ISO 8601 date string or Date object' },
        weekday: {
            control: 'select',
            options: [undefined, 'narrow', 'short', 'long'],
            description: 'Weekday format',
        },
        era: {
            control: 'select',
            options: [undefined, 'narrow', 'short', 'long'],
            description: 'Era format',
        },
        year: {
            control: 'select',
            options: [undefined, 'numeric', '2-digit'],
            description: 'Year format',
        },
        month: {
            control: 'select',
            options: [undefined, 'numeric', '2-digit', 'narrow', 'short', 'long'],
            description: 'Month format',
        },
        day: {
            control: 'select',
            options: [undefined, 'numeric', '2-digit'],
            description: 'Day format',
        },
        hour: {
            control: 'select',
            options: [undefined, 'numeric', '2-digit'],
            description: 'Hour format',
        },
        minute: {
            control: 'select',
            options: [undefined, 'numeric', '2-digit'],
            description: 'Minute format',
        },
        second: {
            control: 'select',
            options: [undefined, 'numeric', '2-digit'],
            description: 'Second format',
        },
        timeZoneName: {
            control: 'select',
            options: [undefined, 'short', 'long', 'shortOffset', 'longOffset', 'shortGeneric', 'longGeneric'],
            description: 'Time zone name format',
        },
        timeZone: { control: 'text', description: 'Time zone (e.g. "UTC", "America/New_York")' },
        fractionalSecondDigits: {
            control: 'select',
            options: [undefined, 1, 2, 3],
            description: 'Sub-second digits (1–3)',
        },
        dateStyle: {
            control: 'select',
            options: [undefined, 'full', 'long', 'medium', 'short'],
            description: 'Shorthand date style (cannot mix with individual date fields)',
        },
        timeStyle: {
            control: 'select',
            options: [undefined, 'full', 'long', 'medium', 'short'],
            description: 'Shorthand time style (cannot mix with individual time fields)',
        },
        hourFormat: {
            control: 'select',
            options: ['auto', '12', '24'],
            description: 'Hour format (auto / 12 / 24)',
        },
        lang: { control: 'text', description: 'BCP 47 locale (e.g. "en", "fr", "ru")' },
    },
};

export default meta;
type Story = StoryObj;

/* ── Playground ──────────────────────────────────────────────────── */
export const Playground: Story = {
    args: {
        date: '2020-07-15T13:17:00.000Z',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hourFormat: 'auto',
    },
    render: (args) => html`
        <ui-format-date
            .date=${args['date']}
            .weekday=${args['weekday']}
            .era=${args['era']}
            .year=${args['year']}
            .month=${args['month']}
            .day=${args['day']}
            .hour=${args['hour']}
            .minute=${args['minute']}
            .second=${args['second']}
            .timeZoneName=${args['timeZoneName']}
            .timeZone=${args['timeZone']}
            .fractionalSecondDigits=${args['fractionalSecondDigits']}
            .dateStyle=${args['dateStyle']}
            .timeStyle=${args['timeStyle']}
            hour-format=${args['hourFormat']}
            lang=${args['lang'] ?? ''}
        ></ui-format-date>
    `,
};

/* ── DateTime Formatting ─────────────────────────────────────────── */
export const DateTimeFormatting: Story = {
    name: 'Date & Time Formatting',
    render: () => {
        const date = new Date('2026-03-07T14:30:00.000Z');
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 220px; color: #6b7280;">year=numeric month=long day=numeric</code>
                    <ui-format-date .date=${date} year="numeric" month="long" day="numeric"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 220px; color: #6b7280;">hour=numeric minute=numeric</code>
                    <ui-format-date .date=${date} hour="numeric" minute="numeric"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 220px; color: #6b7280;">weekday=long</code>
                    <ui-format-date .date=${date} weekday="long"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 220px; color: #6b7280;">month=long</code>
                    <ui-format-date .date=${date} month="long"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 220px; color: #6b7280;">year=numeric</code>
                    <ui-format-date .date=${date} year="numeric"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 220px; color: #6b7280;">(no options — numeric date)</code>
                    <ui-format-date .date=${date}></ui-format-date>
                </div>
            </div>
        `;
    },
};

/* ── Hour Formatting ─────────────────────────────────────────────── */
export const HourFormatting: Story = {
    name: 'Hour Formatting',
    render: () => {
        const date = new Date('2026-03-07T14:30:00.000Z');
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 140px; color: #6b7280;">hour-format="auto"</code>
                    <ui-format-date .date=${date} hour="numeric" minute="numeric" hour-format="auto"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 140px; color: #6b7280;">hour-format="12"</code>
                    <ui-format-date .date=${date} hour="numeric" minute="numeric" hour-format="12"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 140px; color: #6b7280;">hour-format="24"</code>
                    <ui-format-date .date=${date} hour="numeric" minute="numeric" hour-format="24"></ui-format-date>
                </div>
            </div>
        `;
    },
};

/* ── Localization ────────────────────────────────────────────────── */
export const Localization: Story = {
    name: 'Localization',
    render: () => {
        const date = new Date('2026-03-07T14:30:00.000Z');
        const locales = [
            { lang: 'en', label: 'English' },
            { lang: 'fr', label: 'French' },
            { lang: 'ru', label: 'Russian' },
            { lang: 'de', label: 'German' },
            { lang: 'ja', label: 'Japanese' },
            { lang: 'zh', label: 'Chinese' },
            { lang: 'ar', label: 'Arabic' },
        ];
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                ${locales.map(({ lang, label }) => html`
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <span style="min-width: 80px; color: #6b7280;">${label}:</span>
                        <ui-format-date .date=${date} lang=${lang}></ui-format-date>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── Full Date Time ──────────────────────────────────────────────── */
export const FullDateTime: Story = {
    name: 'Full Date & Time',
    render: () => {
        const date = new Date('2026-03-07T14:30:00.000Z');
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 320px; color: #6b7280;">weekday=long, year=numeric, month=long, day=numeric</code>
                    <ui-format-date .date=${date} weekday="long" year="numeric" month="long" day="numeric"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 320px; color: #6b7280;">year=numeric, month=short, day=numeric, hour=numeric, minute=2-digit</code>
                    <ui-format-date .date=${date} year="numeric" month="short" day="numeric" hour="numeric" minute="2-digit"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 320px; color: #6b7280;">hour=numeric, minute=2-digit, second=2-digit, timeZoneName=short</code>
                    <ui-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" time-zone-name="short"></ui-format-date>
                </div>
            </div>
        `;
    },
};

/* ── Custom Styles ───────────────────────────────────────────────── */
export const CustomStyles: Story = {
    name: 'Custom CSS Properties',
    render: () => {
        const date = new Date('2026-03-07T14:30:00.000Z');
        return html`
            <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui; font-size: 0.875rem;">
                <div>
                    <span style="color: #6b7280; margin-right: 8px;">default:</span>
                    <ui-format-date .date=${date} year="numeric" month="long" day="numeric"></ui-format-date>
                </div>
                <div>
                    <span style="color: #6b7280; margin-right: 8px;">primary color:</span>
                    <ui-format-date
                        .date=${date}
                        year="numeric" month="long" day="numeric"
                        style="--ui-format-date-color: #3b82f6;"
                    ></ui-format-date>
                </div>
                <div>
                    <span style="color: #6b7280; margin-right: 8px;">large + accent:</span>
                    <ui-format-date
                        .date=${date}
                        year="numeric" month="long" day="numeric"
                        style="--ui-format-date-color: #8b5cf6; --ui-format-date-font-size: 1.25rem; font-weight: 600;"
                    ></ui-format-date>
                </div>
            </div>
        `;
    },
};

/* ── Edge Cases ──────────────────────────────────────────────────── */
export const EdgeCases: Story = {
    name: 'Edge Cases',
    render: () => {
        const epoch = new Date(0);
        const farFuture = new Date('2099-12-31T23:59:59Z');
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 180px; color: #6b7280;">invalid date string:</span>
                    <ui-format-date date="not-a-date" year="numeric" month="long" day="numeric"></ui-format-date>
                    <span style="color: #9ca3af; font-size: 0.75rem;">(renders nothing)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 180px; color: #6b7280;">Unix epoch (1970):</span>
                    <ui-format-date .date=${epoch} year="numeric" month="long" day="numeric"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 180px; color: #6b7280;">far future (2099):</span>
                    <ui-format-date .date=${farFuture} year="numeric" month="long" day="numeric"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="min-width: 180px; color: #6b7280;">no options (numeric fallback):</span>
                    <ui-format-date .date=${new Date('2024-03-15T10:30:00Z')}></ui-format-date>
                </div>
            </div>
        `;
    },
};

/* ── Time Zones ──────────────────────────────────────────────────── */
export const TimeZones: Story = {
    name: 'Time Zones',
    render: () => {
        const date = new Date('2026-03-07T14:30:00.000Z');
        const zones = [
            { tz: 'UTC', label: 'UTC' },
            { tz: 'America/New_York', label: 'New York' },
            { tz: 'Europe/Paris', label: 'Paris' },
            { tz: 'Asia/Tokyo', label: 'Tokyo' },
            { tz: 'Australia/Sydney', label: 'Sydney' },
        ];
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                ${zones.map(({ tz, label }) => html`
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <span style="min-width: 120px; color: #6b7280;">${label}:</span>
                        <ui-format-date
                            .date=${date}
                            hour="numeric"
                            minute="2-digit"
                            time-zone-name="short"
                            time-zone=${tz}
                            lang="en"
                        ></ui-format-date>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── Era ─────────────────────────────────────────────────────────── */
export const Era: Story = {
    name: 'Era',
    render: () => {
        const adDate = new Date('0001-06-15T00:00:00.000Z');
        return html`
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 140px; color: #6b7280;">era="long"</code>
                    <ui-format-date .date=${adDate} era="long" year="numeric" month="long" day="numeric" lang="en"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 140px; color: #6b7280;">era="short"</code>
                    <ui-format-date .date=${adDate} era="short" year="numeric" month="long" day="numeric" lang="en"></ui-format-date>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <code style="min-width: 140px; color: #6b7280;">era="narrow"</code>
                    <ui-format-date .date=${adDate} era="narrow" year="numeric" month="long" day="numeric" lang="en"></ui-format-date>
                </div>
            </div>
        `;
    },
};

/* ── Date Style / Time Style ─────────────────────────────────────── */
export const DateTimeStyle: Story = {
    name: 'Date Style & Time Style',
    render: () => {
        const date = new Date('2026-03-07T14:30:00.000Z');
        const dateStyles = ['full', 'long', 'medium', 'short'] as const;
        const timeStyles = ['full', 'long', 'medium', 'short'] as const;
        return html`
            <div style="display: flex; flex-direction: column; gap: 16px; font-family: system-ui; font-size: 0.875rem; color: var(--ui-text-color, #111827);">
                <div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #374151;">dateStyle</div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${dateStyles.map(s => html`
                            <div style="display: flex; align-items: center; gap: 16px;">
                                <code style="min-width: 100px; color: #6b7280;">${s}</code>
                                <ui-format-date .date=${date} date-style=${s} lang="en"></ui-format-date>
                            </div>
                        `)}
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #374151;">timeStyle</div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${timeStyles.map(s => html`
                            <div style="display: flex; align-items: center; gap: 16px;">
                                <code style="min-width: 100px; color: #6b7280;">${s}</code>
                                <ui-format-date .date=${date} time-style=${s} time-zone="UTC" lang="en"></ui-format-date>
                            </div>
                        `)}
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #374151;">dateStyle + timeStyle combined</div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <code style="min-width: 180px; color: #6b7280;">full + short</code>
                            <ui-format-date .date=${date} date-style="full" time-style="short" time-zone="UTC" lang="en"></ui-format-date>
                        </div>
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <code style="min-width: 180px; color: #6b7280;">medium + medium</code>
                            <ui-format-date .date=${date} date-style="medium" time-style="medium" time-zone="UTC" lang="en"></ui-format-date>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};

/* ── In Context ──────────────────────────────────────────────────── */
export const InContext: Story = {
    name: 'In Context',
    render: () => {
        const events = [
            { title: 'Design Review', date: new Date('2026-03-10T09:00:00') },
            { title: 'Sprint Planning', date: new Date('2026-03-11T14:00:00') },
            { title: 'Release v2.0', date: new Date('2026-03-20T10:00:00') },
        ];
        return html`
            <div style="
                border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;
                font-family: system-ui; font-size: 0.875rem; max-width: 400px;
            ">
                ${events.map((ev, i) => html`
                    <div style="
                        display: flex; align-items: center; justify-content: space-between;
                        padding: 12px 16px;
                        border-top: ${i > 0 ? '1px solid #f3f4f6' : 'none'};
                    ">
                        <span style="font-weight: 500; color: #111827;">${ev.title}</span>
                        <ui-format-date
                            .date=${ev.date}
                            month="short"
                            day="numeric"
                            hour="numeric"
                            minute="2-digit"
                            style="color: #6b7280; flex-shrink: 0; margin-left: 12px;"
                        ></ui-format-date>
                    </div>
                `)}
            </div>
        `;
    },
};
