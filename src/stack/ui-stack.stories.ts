import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-stack';
import '../divider/ui-divider';
import '../box/ui-box';

const meta: Meta = {
    title: 'Layout/Stack',
    component: 'ui-stack',
    argTypes: {
        direction: {
            control: 'select',
            options: ['column', 'row', 'column-reverse', 'row-reverse'],
            description: 'Flex direction — can also be a responsive object `{ xs: "column", md: "row" }`',
        },
        spacing: {
            control: 'number',
            description: 'Gap between items. Numbers are multiplied by 8px. Strings are used as-is.',
        },
        alignItems: {
            control: 'select',
            options: [undefined, 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
            description: 'CSS align-items. Defaults to "stretch" (column) or "center" (row).',
        },
        justifyContent: {
            control: 'select',
            options: [undefined, 'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
            description: 'CSS justify-content. Defaults to "flex-start".',
        },
        useFlexGap: {
            control: 'boolean',
            description: 'When false, uses margin-based spacing (for older browser support).',
        },
    },
    args: {
        direction: 'column',
        spacing: 2,
        useFlexGap: true,
    },
};

export default meta;
type Story = StoryObj;

const item = (label: string) => html`
    <ui-box bgcolor="#cfe8fc" border="1px solid #1976d2" p="16px" textAlign="center" color="#1976d2" borderRadius="4px" style="font-family: system-ui;">
        ${label}
    </ui-box>
`;

/* ── Playground ─────────────────────────────────────────────────────────── */

export const Playground: Story = {
    render: (args) => html`
        <ui-stack
            .direction=${args.direction}
            .spacing=${args.spacing}
            .alignItems=${args.alignItems}
            .justifyContent=${args.justifyContent}
            .useFlexGap=${args.useFlexGap}
        >
            ${item('Item 1')}
            ${item('Item 2')}
            ${item('Item 3')}
        </ui-stack>
    `,
};

/* ── Directions ─────────────────────────────────────────────────────────── */

export const Vertical: Story = {
    name: 'Direction: Column (default)',
    args: { direction: 'column', spacing: 2 },
    render: (args) => html`
        <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('Item 1')}
            ${item('Item 2')}
            ${item('Item 3')}
        </ui-stack>
    `,
};

export const Horizontal: Story = {
    name: 'Direction: Row',
    args: { direction: 'row', spacing: 2 },
    render: (args) => html`
        <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('Item 1')}
            ${item('Item 2')}
            ${item('Item 3')}
        </ui-stack>
    `,
};

export const ColumnReverse: Story = {
    name: 'Direction: Column Reverse',
    args: { direction: 'column-reverse', spacing: 2 },
    render: (args) => html`
        <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('First in DOM')}
            ${item('Second in DOM')}
            ${item('Third in DOM (shows first)')}
        </ui-stack>
    `,
};

export const RowReverse: Story = {
    name: 'Direction: Row Reverse',
    args: { direction: 'row-reverse', spacing: 2 },
    render: (args) => html`
        <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('1')}
            ${item('2')}
            ${item('3')}
        </ui-stack>
    `,
};

/* ── Spacing ─────────────────────────────────────────────────────────────── */

export const SpacingScale: Story = {
    name: 'Spacing: Scale values',
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:32px;font-family:system-ui;">
            ${[0, 0.5, 1, 2, 3, 4].map(
                (s) => html`
                <div>
                    <p style="margin:0 0 8px;color:#666;font-size:12px;">spacing=${s} → ${s * 8}px</p>
                    <ui-stack direction="row" .spacing=${s}>
                        ${item('A')}
                        ${item('B')}
                        ${item('C')}
                    </ui-stack>
                </div>
            `)}
        </div>
    `,
};

export const StringSpacing: Story = {
    name: 'Spacing: String value (CSS)',
    render: () => html`
        <p style="font-family:system-ui;font-size:12px;color:#666;margin:0 0 8px;">spacing="2rem" — string values are passed directly to CSS gap</p>
        <ui-stack direction="row" .spacing=${'2rem'}>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;color:#1976d2;border-radius:4px;">Item 1</div>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;color:#1976d2;border-radius:4px;">Item 2</div>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;color:#1976d2;border-radius:4px;">Item 3</div>
        </ui-stack>
    `,
};

/* ── Alignment ───────────────────────────────────────────────────────────── */

export const AlignItems: Story = {
    name: 'Alignment: alignItems',
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;font-family:system-ui;">
            ${(['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const).map(
                (a) => html`
                <div>
                    <p style="margin:0 0 6px;font-size:12px;color:#666;">alignItems="${a}"</p>
                    <ui-stack direction="row" .spacing=${2} .alignItems=${a} style="height:80px;background:#f5f5f5;border-radius:4px;">
                        <div style="background:#cfe8fc;border:1px solid #1976d2;padding:8px 16px;color:#1976d2;border-radius:4px;">Short</div>
                        <div style="background:#cfe8fc;border:1px solid #1976d2;padding:24px 16px;color:#1976d2;border-radius:4px;">Tall</div>
                        <div style="background:#cfe8fc;border:1px solid #1976d2;padding:8px 16px;color:#1976d2;border-radius:4px;">Short</div>
                    </ui-stack>
                </div>
            `)}
        </div>
    `,
};

export const JustifyContent: Story = {
    name: 'Alignment: justifyContent',
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;font-family:system-ui;">
            ${(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map(
                (j) => html`
                <div>
                    <p style="margin:0 0 6px;font-size:12px;color:#666;">justifyContent="${j}"</p>
                    <ui-stack direction="row" .justifyContent=${j} style="background:#f5f5f5;border-radius:4px;padding:8px;">
                        <div style="background:#cfe8fc;border:1px solid #1976d2;padding:8px 16px;color:#1976d2;border-radius:4px;">A</div>
                        <div style="background:#cfe8fc;border:1px solid #1976d2;padding:8px 16px;color:#1976d2;border-radius:4px;">B</div>
                        <div style="background:#cfe8fc;border:1px solid #1976d2;padding:8px 16px;color:#1976d2;border-radius:4px;">C</div>
                    </ui-stack>
                </div>
            `)}
        </div>
    `,
};

/* ── Dividers ────────────────────────────────────────────────────────────── */

export const WithDividers: Story = {
    name: 'With Dividers (column)',
    args: { direction: 'column', spacing: 2 },
    render: (args) => html`
        <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 1</div>
            <ui-divider></ui-divider>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 2</div>
            <ui-divider></ui-divider>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 3</div>
        </ui-stack>
    `,
};

export const WithDividersRow: Story = {
    name: 'With Dividers (row)',
    args: { direction: 'row', spacing: 2 },
    render: (args) => html`
        <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 1</div>
            <ui-divider></ui-divider>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 2</div>
            <ui-divider></ui-divider>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 3</div>
        </ui-stack>
    `,
};

/* ── Flex gap ────────────────────────────────────────────────────────────── */

export const NoFlexGap: Story = {
    name: 'useFlexGap: false (margin fallback)',
    args: { direction: 'row', spacing: 2, useFlexGap: false },
    render: (args) => html`
        <p style="font-family:system-ui;font-size:12px;color:#666;margin:0 0 8px;">
            Uses CSS margin instead of gap — useful when targeting older browsers.
        </p>
        <ui-stack .direction=${args.direction} .spacing=${args.spacing} .useFlexGap=${args.useFlexGap}>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 1</div>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 2</div>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;color:#1976d2;font-family:system-ui;border-radius:4px;">Item 3</div>
        </ui-stack>
    `,
};

/* ── Responsive ──────────────────────────────────────────────────────────── */

export const Responsive: Story = {
    name: 'Responsive direction + spacing',
    args: {
        direction: { xs: 'column', sm: 'row' },
        spacing: { xs: 1, sm: 2, md: 4 },
    },
    render: (args) => html`
        <p style="font-family:system-ui;font-size:12px;color:#666;margin:0 0 8px;">
            Resize the viewport: column below 600px, row above.
        </p>
        <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Responsive 1</div>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Responsive 2</div>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Responsive 3</div>
        </ui-stack>
    `,
};

/* ── Nesting ─────────────────────────────────────────────────────────────── */

export const Nested: Story = {
    name: 'Nested stacks',
    render: () => html`
        <ui-stack .spacing=${3}>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Top item</div>
            <ui-stack direction="row" .spacing=${2}>
                <div style="background:#e8f5e9;border:1px solid #388e3c;padding:16px;flex:1;text-align:center;color:#388e3c;font-family:system-ui;border-radius:4px;">Left</div>
                <div style="background:#e8f5e9;border:1px solid #388e3c;padding:16px;flex:1;text-align:center;color:#388e3c;font-family:system-ui;border-radius:4px;">Center</div>
                <div style="background:#e8f5e9;border:1px solid #388e3c;padding:16px;flex:1;text-align:center;color:#388e3c;font-family:system-ui;border-radius:4px;">Right</div>
            </ui-stack>
            <div style="background:#cfe8fc;border:1px solid #1976d2;padding:16px;text-align:center;color:#1976d2;font-family:system-ui;border-radius:4px;">Bottom item</div>
        </ui-stack>
    `,
};
