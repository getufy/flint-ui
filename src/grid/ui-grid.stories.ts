import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-grid';

const meta: Meta = {
  title: 'Layout/Grid',
  component: 'ui-grid',
  decorators: [
    (story) => html`
            <div style="padding: 0; width: 100%; box-sizing: border-box;">
                ${story()}
            </div>
        `,
  ],
  argTypes: {
    container: { control: 'boolean' },
    spacing: { control: 'number' },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse']
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse']
    },
  },
};

export default meta;
type Story = StoryObj;

const itemStyle = 'background-color: #cfe8fc; border: 1px solid #1976d2; padding: 16px; text-align: center; color: #1976d2; font-family: monospace; box-sizing: border-box;';
const altItemStyle = 'background-color: #fce4ec; border: 1px solid #d81b60; padding: 16px; text-align: center; color: #d81b60; font-family: monospace; box-sizing: border-box;';
const greenItemStyle = 'background-color: #e8f5e9; border: 1px solid #388e3c; padding: 16px; text-align: center; color: #388e3c; font-family: monospace; box-sizing: border-box;';

// -----------------------------------------------------------------------------
// Basic
// -----------------------------------------------------------------------------

export const Basic: Story = {
  render: () => html`
        <ui-grid container spacing="2">
            <ui-grid xs="8">
                <div style="${itemStyle}">xs=8</div>
            </ui-grid>
            <ui-grid xs="4">
                <div style="${itemStyle}">xs=4</div>
            </ui-grid>
            <ui-grid xs="4">
                <div style="${itemStyle}">xs=4</div>
            </ui-grid>
            <ui-grid xs="8">
                <div style="${itemStyle}">xs=8</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Multiple Breakpoints
// Resize the viewport to see the layout switch between xs (6/6) and md (8/4).
// -----------------------------------------------------------------------------

export const MultipleBreakpoints: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            Resize viewport: xs → 6/6 split · md+ → 8/4 split
        </p>
        <ui-grid container spacing="2">
            <ui-grid xs="6" md="8">
                <div style="${itemStyle}">xs=6 md=8</div>
            </ui-grid>
            <ui-grid xs="6" md="4">
                <div style="${itemStyle}">xs=6 md=4</div>
            </ui-grid>
            <ui-grid xs="6" md="4">
                <div style="${itemStyle}">xs=6 md=4</div>
            </ui-grid>
            <ui-grid xs="6" md="8">
                <div style="${itemStyle}">xs=6 md=8</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Spacing
// -----------------------------------------------------------------------------

export const Spacing: Story = {
  args: {
    spacing: 2,
    container: true,
  },
  render: (args) => html`
        <ui-grid container .spacing=${args.spacing}>
            <ui-grid xs="6">
                <div style="${itemStyle}">Item 1</div>
            </ui-grid>
            <ui-grid xs="6">
                <div style="${itemStyle}">Item 2</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Row vs Column Spacing
// Demonstrates rowSpacing and columnSpacing being set independently.
// -----------------------------------------------------------------------------

export const RowVsColumnSpacing: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            rowSpacing=1 (8px) · columnSpacing=4 (32px) — notice wider horizontal gaps
        </p>
        <ui-grid container .rowSpacing=${1} .columnSpacing=${4}>
            <ui-grid xs="6"><div style="${itemStyle}">A</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">B</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">C</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">D</div></ui-grid>
        </ui-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 12px;">
            rowSpacing=4 (32px) · columnSpacing=1 (8px) — wider vertical gaps
        </p>
        <ui-grid container .rowSpacing=${4} .columnSpacing=${1}>
            <ui-grid xs="6"><div style="${itemStyle}">A</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">B</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">C</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">D</div></ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Zero Row Spacing Override
// Explicitly setting rowSpacing=0 removes vertical gaps even when spacing > 0.
// (This tests the FIX: rowSpacing !== 0 falsy guard was broken before.)
// -----------------------------------------------------------------------------

export const ZeroRowSpacingOverride: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            spacing=3, rowSpacing=0 — column gap present, no row gap
        </p>
        <ui-grid container spacing="3" .rowSpacing=${0}>
            <ui-grid xs="6"><div style="${itemStyle}">Row 1 · Col 1</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">Row 1 · Col 2</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">Row 2 · Col 1</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">Row 2 · Col 2</div></ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Auto Layout
// -----------------------------------------------------------------------------

export const AutoLayout: Story = {
  render: () => html`
        <ui-grid container spacing="3">
            <ui-grid .xs=${true}>
                <div style="${itemStyle}">xs (auto)</div>
            </ui-grid>
            <ui-grid xs="6">
                <div style="${itemStyle}">xs=6</div>
            </ui-grid>
            <ui-grid .xs=${true}>
                <div style="${itemStyle}">xs (auto)</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Variable Width (auto size)
// -----------------------------------------------------------------------------

export const VariableWidth: Story = {
  render: () => html`
        <ui-grid container spacing="3" .justifyContent=${'center'}>
            <ui-grid xs="auto">
                <div style="${itemStyle}; width: 100px;">Variable width content</div>
            </ui-grid>
            <ui-grid xs="6">
                <div style="${itemStyle}">xs=6</div>
            </ui-grid>
            <ui-grid xs="auto">
                <div style="${itemStyle}; width: 120px;">More content</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Nested Grid
// -----------------------------------------------------------------------------

export const NestedGrid: Story = {
  render: () => html`
        <ui-grid container spacing="2">
            <ui-grid xs="12" md="6">
                <div style="${itemStyle}">Item 1 (xs=12, md=6)</div>
            </ui-grid>
            <ui-grid xs="12" md="6">
                <ui-grid container spacing="1">
                    <ui-grid xs="6">
                        <div style="${altItemStyle}">Nested 1</div>
                    </ui-grid>
                    <ui-grid xs="6">
                        <div style="${altItemStyle}">Nested 2</div>
                    </ui-grid>
                </ui-grid>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Custom Column Count
// -----------------------------------------------------------------------------

export const Columns: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            columns=16 — items are 8/16 = 50% each
        </p>
        <ui-grid container columns="16" spacing="2">
            <ui-grid xs="8">
                <div style="${itemStyle}">size=8 (of 16 cols)</div>
            </ui-grid>
            <ui-grid xs="8">
                <div style="${itemStyle}">size=8 (of 16 cols)</div>
            </ui-grid>
            <ui-grid xs="4">
                <div style="${itemStyle}">size=4 (25%)</div>
            </ui-grid>
            <ui-grid xs="12">
                <div style="${itemStyle}">size=12 (75%)</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Offset
// -----------------------------------------------------------------------------

export const Offset: Story = {
  render: () => html`
        <ui-grid container spacing="2">
            <ui-grid xs="4">
                <div style="${itemStyle}">xs=4</div>
            </ui-grid>
            <ui-grid xs="4" .offset=${{ xs: 4 }}>
                <div style="${itemStyle}">xs=4, offset=4</div>
            </ui-grid>
            <ui-grid xs="4" .offset=${{ xs: 'auto' }}>
                <div style="${itemStyle}">xs=4, offset=auto</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Direction: Column
// Shows the grid as a vertical stack with spacing applied on the column axis.
// -----------------------------------------------------------------------------

export const DirectionColumn: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            direction="column" — items stack vertically
        </p>
        <ui-grid container direction="column" spacing="2" style="height: 300px;">
            <ui-grid xs="auto">
                <div style="${itemStyle}">Item 1</div>
            </ui-grid>
            <ui-grid xs="auto">
                <div style="${itemStyle}">Item 2</div>
            </ui-grid>
            <ui-grid xs="auto">
                <div style="${itemStyle}">Item 3</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Wrap Modes
// Shows nowrap (items overflow) and wrap-reverse (items wrap upward).
// -----------------------------------------------------------------------------

export const WrapModes: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 8px;">wrap="wrap" (default)</p>
        <ui-grid container spacing="2">
            ${[1, 2, 3, 4, 5].map(n => html`
                <ui-grid xs="4">
                    <div style="${itemStyle}">${n}</div>
                </ui-grid>
            `)}
        </ui-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">wrap="nowrap" — items overflow</p>
        <div style="overflow-x: auto;">
            <ui-grid container spacing="2" wrap="nowrap">
                ${[1, 2, 3, 4, 5].map(n => html`
                    <ui-grid xs="4">
                        <div style="${itemStyle}">${n}</div>
                    </ui-grid>
                `)}
            </ui-grid>
        </div>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">wrap="wrap-reverse" — overflow wraps upward</p>
        <ui-grid container spacing="2" wrap="wrap-reverse">
            ${[1, 2, 3, 4, 5].map(n => html`
                <ui-grid xs="4">
                    <div style="${itemStyle}">${n}</div>
                </ui-grid>
            `)}
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Order: Responsive Reordering
// On mobile the "sidebar" appears below the main content.
// On desktop (md+) the sidebar shifts to the left via order.
// Resize the Storybook viewport to see the effect.
// -----------------------------------------------------------------------------

export const ResponsiveOrder: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            Resize viewport: xs → content first, sidebar second ·
            md+ → sidebar first (order=-1), content second
        </p>
        <ui-grid container spacing="2">
            <ui-grid xs="12" md="8" .order=${{ xs: 1, md: 0 }}>
                <div style="${itemStyle}">Main content (order: xs=1, md=0)</div>
            </ui-grid>
            <ui-grid xs="12" md="4" .order=${{ xs: 2, md: -1 }}>
                <div style="${altItemStyle}">Sidebar (order: xs=2, md=-1)</div>
            </ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// Twelve Column Overflow
// When items exceed 12 columns they wrap onto the next row — intentional.
// -----------------------------------------------------------------------------

export const ColumnOverflow: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            3×5=15 columns — last item wraps to a new row
        </p>
        <ui-grid container spacing="2">
            <ui-grid xs="5"><div style="${itemStyle}">xs=5</div></ui-grid>
            <ui-grid xs="5"><div style="${itemStyle}">xs=5</div></ui-grid>
            <ui-grid xs="5"><div style="${altItemStyle}">xs=5 (wraps)</div></ui-grid>
        </ui-grid>
    `,
};

// -----------------------------------------------------------------------------
// API footgun: xs attribute vs .xs binding
// Documents that xs="true" (string attribute) and .xs=${true} (property) both work,
// but a bare xs attribute (empty string) does NOT trigger auto-layout.
// -----------------------------------------------------------------------------

export const AutoLayoutAttributeVsProperty: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 8px;">
            ✅ <code>.xs=\${true}</code> (property binding) — correct auto layout
        </p>
        <ui-grid container spacing="2">
            <ui-grid .xs=${true}><div style="${greenItemStyle}">auto (property)</div></ui-grid>
            <ui-grid xs="6"><div style="${greenItemStyle}">xs=6</div></ui-grid>
            <ui-grid .xs=${true}><div style="${greenItemStyle}">auto (property)</div></ui-grid>
        </ui-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">
            ✅ <code>xs="true"</code> (string attribute) — also works due to coercion
        </p>
        <ui-grid container spacing="2">
            <ui-grid xs="true"><div style="${itemStyle}">auto (string "true")</div></ui-grid>
            <ui-grid xs="6"><div style="${itemStyle}">xs=6</div></ui-grid>
            <ui-grid xs="true"><div style="${itemStyle}">auto (string "true")</div></ui-grid>
        </ui-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">
            ⚠️ <code>xs</code> (bare attribute, empty string) — does NOT trigger auto layout
        </p>
        <ui-grid container spacing="2">
            <ui-grid xs><div style="${altItemStyle}">bare xs (broken)</div></ui-grid>
            <ui-grid xs="6"><div style="${altItemStyle}">xs=6</div></ui-grid>
            <ui-grid xs><div style="${altItemStyle}">bare xs (broken)</div></ui-grid>
        </ui-grid>
    `,
};