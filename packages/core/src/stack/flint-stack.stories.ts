import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-stack';
import '../divider/flint-divider';
import '../box/flint-box';

const meta: Meta = {
    title: 'Layout/Stack',
    component: 'flint-stack',
    parameters: {
        docs: {
            description: {
                component: `
- **Tag**: \`<flint-stack>\`
- **Class**: \`FlintStack\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`direction\` | \`direction\` | \`ResponsiveValue&lt;'row' \\| 'row-reverse' \\| 'column' \\| 'column-reverse'&gt;\` | \`'column'\` | Flex direction of the stack layout. |
| \`spacing\` | \`spacing\` | \`ResponsiveValue&lt;number \\| string&gt;\` | \`0\` | Space between child items (1 unit = 8px). |
| \`alignItems\` | \`alignItems\` | \`'flex-start' \\| 'center' \\| 'flex-end' \\| 'stretch' \\| 'baseline' \\| undefined\` | — | Cross-axis alignment of stack children. |
| \`justifyContent\` | \`justifyContent\` | \`'flex-start' \\| 'center' \\| 'flex-end' \\| 'space-between' \\| 'space-around' \\| 'space-evenly' \\| undefined\` | — | Main-axis alignment of stack children. |
| \`useFlexGap\` | \`useFlexGap\` | \`boolean\` | \`true\` | Whether to use CSS flex gap for spacing. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-stack-spacing\` | \`0px\` |
                `,
            },
        },
    },
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
    <flint-box bgcolor="var(--flint-demo-item-background, #dbeafe)" border="1px solid #1e40af" p="16px" textAlign="center" color="#1e40af" borderRadius="4px" style="font-family: system-ui;">
        ${label}
    </flint-box>
`;

/* ── Playground ─────────────────────────────────────────────────────────── */

export const Playground: Story = {
    render: (args) => html`
        <flint-stack
            .direction=${args.direction}
            .spacing=${args.spacing}
            .alignItems=${args.alignItems}
            .justifyContent=${args.justifyContent}
            .useFlexGap=${args.useFlexGap}
        >
            ${item('Item 1')}
            ${item('Item 2')}
            ${item('Item 3')}
        </flint-stack>
    `,
};

/* ── Directions ─────────────────────────────────────────────────────────── */

export const Vertical: Story = {
    name: 'Direction: Column (default)',
    args: { direction: 'column', spacing: 2 },
    render: (args) => html`
        <flint-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('Item 1')}
            ${item('Item 2')}
            ${item('Item 3')}
        </flint-stack>
    `,
};

export const Horizontal: Story = {
    name: 'Direction: Row',
    args: { direction: 'row', spacing: 2 },
    render: (args) => html`
        <flint-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('Item 1')}
            ${item('Item 2')}
            ${item('Item 3')}
        </flint-stack>
    `,
};

export const ColumnReverse: Story = {
    name: 'Direction: Column Reverse',
    args: { direction: 'column-reverse', spacing: 2 },
    render: (args) => html`
        <flint-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('First in DOM')}
            ${item('Second in DOM')}
            ${item('Third in DOM (shows first)')}
        </flint-stack>
    `,
};

export const RowReverse: Story = {
    name: 'Direction: Row Reverse',
    args: { direction: 'row-reverse', spacing: 2 },
    render: (args) => html`
        <flint-stack .direction=${args.direction} .spacing=${args.spacing}>
            ${item('1')}
            ${item('2')}
            ${item('3')}
        </flint-stack>
    `,
};

/* ── Spacing ─────────────────────────────────────────────────────────────── */

export const SpacingScale: Story = {
    name: 'Spacing: Scale values',
    render: () => html`
        <flint-stack direction="column" gap="32px" style="font-family:system-ui;">
            ${[0, 0.5, 1, 2, 3, 4].map(
                (s) => html`
                <div>
                    <p style="margin:0 0 8px;color:#666;font-size:12px;">spacing=${s} → ${s * 8}px</p>
                    <flint-stack direction="row" .spacing=${s}>
                        ${item('A')}
                        ${item('B')}
                        ${item('C')}
                    </flint-stack>
                </div>
            `)}
        </flint-stack>
    `,
};

export const StringSpacing: Story = {
    name: 'Spacing: String value (CSS)',
    render: () => html`
        <p style="font-family:system-ui;font-size:12px;color:#666;margin:0 0 8px;">spacing="2rem" — string values are passed directly to CSS gap</p>
        <flint-stack direction="row" .spacing=${'2rem'}>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;color:#1e40af;border-radius:4px;">Item 1</div>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;color:#1e40af;border-radius:4px;">Item 2</div>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;color:#1e40af;border-radius:4px;">Item 3</div>
        </flint-stack>
    `,
};

/* ── Alignment ───────────────────────────────────────────────────────────── */

export const AlignItems: Story = {
    name: 'Alignment: alignItems',
    render: () => html`
        <flint-stack direction="column" gap="24px" style="font-family:system-ui;">
            ${(['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const).map(
                (a) => html`
                <div>
                    <p style="margin:0 0 6px;font-size:12px;color:#666;">alignItems="${a}"</p>
                    <flint-stack direction="row" .spacing=${2} .alignItems=${a} style="height:80px;background:var(--flint-muted-background, #f5f5f5);border-radius:4px;">
                        <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:8px 16px;color:#1e40af;border-radius:4px;">Short</div>
                        <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:24px 16px;color:#1e40af;border-radius:4px;">Tall</div>
                        <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:8px 16px;color:#1e40af;border-radius:4px;">Short</div>
                    </flint-stack>
                </div>
            `)}
        </flint-stack>
    `,
};

export const JustifyContent: Story = {
    name: 'Alignment: justifyContent',
    render: () => html`
        <flint-stack direction="column" gap="24px" style="font-family:system-ui;">
            ${(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map(
                (j) => html`
                <div>
                    <p style="margin:0 0 6px;font-size:12px;color:#666;">justifyContent="${j}"</p>
                    <flint-stack direction="row" .justifyContent=${j} style="background:var(--flint-muted-background, #f5f5f5);border-radius:4px;padding:8px;">
                        <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:8px 16px;color:#1e40af;border-radius:4px;">A</div>
                        <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:8px 16px;color:#1e40af;border-radius:4px;">B</div>
                        <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:8px 16px;color:#1e40af;border-radius:4px;">C</div>
                    </flint-stack>
                </div>
            `)}
        </flint-stack>
    `,
};

/* ── Dividers ────────────────────────────────────────────────────────────── */

export const WithDividers: Story = {
    name: 'With Dividers (column)',
    args: { direction: 'column', spacing: 2 },
    render: (args) => html`
        <flint-stack .direction=${args.direction} .spacing=${args.spacing}>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 1</div>
            <flint-divider></flint-divider>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 2</div>
            <flint-divider></flint-divider>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 3</div>
        </flint-stack>
    `,
};

export const WithDividersRow: Story = {
    name: 'With Dividers (row)',
    args: { direction: 'row', spacing: 2 },
    render: (args) => html`
        <flint-stack .direction=${args.direction} .spacing=${args.spacing}>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 1</div>
            <flint-divider></flint-divider>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 2</div>
            <flint-divider></flint-divider>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 3</div>
        </flint-stack>
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
        <flint-stack .direction=${args.direction} .spacing=${args.spacing} .useFlexGap=${args.useFlexGap}>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 1</div>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 2</div>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;color:#1e40af;font-family:system-ui;border-radius:4px;">Item 3</div>
        </flint-stack>
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
        <flint-stack .direction=${args.direction} .spacing=${args.spacing}>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Responsive 1</div>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Responsive 2</div>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Responsive 3</div>
        </flint-stack>
    `,
};

/* ── Nesting ─────────────────────────────────────────────────────────────── */

export const Nested: Story = {
    name: 'Nested stacks',
    render: () => html`
        <flint-stack .spacing=${3}>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Top item</div>
            <flint-stack direction="row" .spacing=${2}>
                <div style="background:var(--flint-demo-item-background-green, #dcfce7);border:1px solid #166534;padding:16px;flex:1;text-align:center;color:#166534;font-family:system-ui;border-radius:4px;">Left</div>
                <div style="background:var(--flint-demo-item-background-green, #dcfce7);border:1px solid #166534;padding:16px;flex:1;text-align:center;color:#166534;font-family:system-ui;border-radius:4px;">Center</div>
                <div style="background:var(--flint-demo-item-background-green, #dcfce7);border:1px solid #166534;padding:16px;flex:1;text-align:center;color:#166534;font-family:system-ui;border-radius:4px;">Right</div>
            </flint-stack>
            <div style="background:var(--flint-demo-item-background, #dbeafe);border:1px solid #1e40af;padding:16px;text-align:center;color:#1e40af;font-family:system-ui;border-radius:4px;">Bottom item</div>
        </flint-stack>
    `,
};
