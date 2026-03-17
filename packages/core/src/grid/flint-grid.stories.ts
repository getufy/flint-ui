import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-grid';

const meta: Meta = {
  title: 'Layout/Grid',
  component: 'flint-grid',
  parameters: {
      docs: {
            description: {
                component: `
A responsive **12-column grid system** for building adaptive layouts.

Each \`<flint-grid>\` element acts as either a **container** (flex parent) or an **item** (sized child).
Set \`container\` on the outer element, then use breakpoint props (\`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`) on child items to control column span at each viewport width.

#### Quick start

\`\`\`html
<flint-grid container spacing="2">
  <flint-grid xs="12" md="8"><div>Main content</div></flint-grid>
  <flint-grid xs="12" md="4"><div>Sidebar</div></flint-grid>
</flint-grid>
\`\`\`

#### Key concepts

- **12 columns** (configurable via \`columns\` prop). Assign 1–12 to span that many columns.
- **Breakpoints cascade up**: \`xs="6"\` applies to sm, md, lg, xl unless overridden.
- **Spacing**: 1 unit = 8px. \`spacing={2}\` = 16px gaps. Override per-axis with \`rowSpacing\` / \`columnSpacing\`.
- **Auto sizing**: \`.xs=\${true}\` fills remaining space equally; \`xs="auto"\` sizes to content.
- **Responsive spacing/order**: pass objects like \`{ xs: 1, md: 3 }\` for per-breakpoint control.

#### Breakpoint thresholds

| Breakpoint | Min-width | CSS override variable |
|---|---|---|
| xs | 0px | \`--flint-breakpoint-xs\` |
| sm | 600px | \`--flint-breakpoint-sm\` |
| md | 900px | \`--flint-breakpoint-md\` |
| lg | 1200px | \`--flint-breakpoint-lg\` |
| xl | 1536px | \`--flint-breakpoint-xl\` |
                `,
            },
        },
  },
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
  args: {
    container: true,
    spacing: 2,
    direction: 'row',
    wrap: 'wrap',
  },
};

export default meta;
type Story = StoryObj;

const itemStyle = 'background-color: #dbeafe; border: 1px solid #1e40af; padding: 16px; text-align: center; color: #1e40af; font-family: monospace; box-sizing: border-box;';
const altItemStyle = 'background-color: #fce7f3; border: 1px solid #9d174d; padding: 16px; text-align: center; color: #9d174d; font-family: monospace; box-sizing: border-box;';
const greenItemStyle = 'background-color: #dcfce7; border: 1px solid #166534; padding: 16px; text-align: center; color: #166534; font-family: monospace; box-sizing: border-box;';

// -----------------------------------------------------------------------------
// Basic
// -----------------------------------------------------------------------------

export const Basic: Story = {
  render: (args) => html`
        <flint-grid ?container=${args.container} .spacing=${args.spacing} .direction=${args.direction} .wrap=${args.wrap}>
            <flint-grid xs="8">
                <div style="${itemStyle}">xs=8</div>
            </flint-grid>
            <flint-grid xs="4">
                <div style="${itemStyle}">xs=4</div>
            </flint-grid>
            <flint-grid xs="4">
                <div style="${itemStyle}">xs=4</div>
            </flint-grid>
            <flint-grid xs="8">
                <div style="${itemStyle}">xs=8</div>
            </flint-grid>
        </flint-grid>
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
        <flint-grid container spacing="2">
            <flint-grid xs="6" md="8">
                <div style="${itemStyle}">xs=6 md=8</div>
            </flint-grid>
            <flint-grid xs="6" md="4">
                <div style="${itemStyle}">xs=6 md=4</div>
            </flint-grid>
            <flint-grid xs="6" md="4">
                <div style="${itemStyle}">xs=6 md=4</div>
            </flint-grid>
            <flint-grid xs="6" md="8">
                <div style="${itemStyle}">xs=6 md=8</div>
            </flint-grid>
        </flint-grid>
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
        <flint-grid container .spacing=${args.spacing}>
            <flint-grid xs="6">
                <div style="${itemStyle}">Item 1</div>
            </flint-grid>
            <flint-grid xs="6">
                <div style="${itemStyle}">Item 2</div>
            </flint-grid>
        </flint-grid>
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
        <flint-grid container .rowSpacing=${1} .columnSpacing=${4}>
            <flint-grid xs="6"><div style="${itemStyle}">A</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">B</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">C</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">D</div></flint-grid>
        </flint-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 12px;">
            rowSpacing=4 (32px) · columnSpacing=1 (8px) — wider vertical gaps
        </p>
        <flint-grid container .rowSpacing=${4} .columnSpacing=${1}>
            <flint-grid xs="6"><div style="${itemStyle}">A</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">B</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">C</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">D</div></flint-grid>
        </flint-grid>
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
        <flint-grid container spacing="3" .rowSpacing=${0}>
            <flint-grid xs="6"><div style="${itemStyle}">Row 1 · Col 1</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">Row 1 · Col 2</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">Row 2 · Col 1</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">Row 2 · Col 2</div></flint-grid>
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Auto Layout
// -----------------------------------------------------------------------------

export const AutoLayout: Story = {
  render: () => html`
        <flint-grid container spacing="3">
            <flint-grid .xs=${true}>
                <div style="${itemStyle}">xs (auto)</div>
            </flint-grid>
            <flint-grid xs="6">
                <div style="${itemStyle}">xs=6</div>
            </flint-grid>
            <flint-grid .xs=${true}>
                <div style="${itemStyle}">xs (auto)</div>
            </flint-grid>
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Variable Width (auto size)
// -----------------------------------------------------------------------------

export const VariableWidth: Story = {
  render: () => html`
        <flint-grid container spacing="3" .justifyContent=${'center'}>
            <flint-grid xs="auto">
                <div style="${itemStyle}; width: 100px;">Variable width content</div>
            </flint-grid>
            <flint-grid xs="6">
                <div style="${itemStyle}">xs=6</div>
            </flint-grid>
            <flint-grid xs="auto">
                <div style="${itemStyle}; width: 120px;">More content</div>
            </flint-grid>
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Nested Grid
// -----------------------------------------------------------------------------

export const NestedGrid: Story = {
  render: () => html`
        <flint-grid container spacing="2">
            <flint-grid xs="12" md="6">
                <div style="${itemStyle}">Item 1 (xs=12, md=6)</div>
            </flint-grid>
            <flint-grid xs="12" md="6">
                <flint-grid container spacing="1">
                    <flint-grid xs="6">
                        <div style="${altItemStyle}">Nested 1</div>
                    </flint-grid>
                    <flint-grid xs="6">
                        <div style="${altItemStyle}">Nested 2</div>
                    </flint-grid>
                </flint-grid>
            </flint-grid>
        </flint-grid>
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
        <flint-grid container columns="16" spacing="2">
            <flint-grid xs="8">
                <div style="${itemStyle}">size=8 (of 16 cols)</div>
            </flint-grid>
            <flint-grid xs="8">
                <div style="${itemStyle}">size=8 (of 16 cols)</div>
            </flint-grid>
            <flint-grid xs="4">
                <div style="${itemStyle}">size=4 (25%)</div>
            </flint-grid>
            <flint-grid xs="12">
                <div style="${itemStyle}">size=12 (75%)</div>
            </flint-grid>
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Offset
// -----------------------------------------------------------------------------

export const Offset: Story = {
  render: () => html`
        <flint-grid container spacing="2">
            <flint-grid xs="4">
                <div style="${itemStyle}">xs=4</div>
            </flint-grid>
            <flint-grid xs="4" .offset=${{ xs: 4 }}>
                <div style="${itemStyle}">xs=4, offset=4</div>
            </flint-grid>
            <flint-grid xs="4" .offset=${{ xs: 'auto' }}>
                <div style="${itemStyle}">xs=4, offset=auto</div>
            </flint-grid>
        </flint-grid>
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
        <flint-grid container direction="column" spacing="2" style="height: 300px;">
            <flint-grid xs="auto">
                <div style="${itemStyle}">Item 1</div>
            </flint-grid>
            <flint-grid xs="auto">
                <div style="${itemStyle}">Item 2</div>
            </flint-grid>
            <flint-grid xs="auto">
                <div style="${itemStyle}">Item 3</div>
            </flint-grid>
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Wrap Modes
// Shows nowrap (items overflow) and wrap-reverse (items wrap upward).
// -----------------------------------------------------------------------------

export const WrapModes: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 8px;">wrap="wrap" (default)</p>
        <flint-grid container spacing="2">
            ${[1, 2, 3, 4, 5].map(n => html`
                <flint-grid xs="4">
                    <div style="${itemStyle}">${n}</div>
                </flint-grid>
            `)}
        </flint-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">wrap="nowrap" — items overflow</p>
        <div style="overflow-x: auto;">
            <flint-grid container spacing="2" wrap="nowrap">
                ${[1, 2, 3, 4, 5].map(n => html`
                    <flint-grid xs="4">
                        <div style="${itemStyle}">${n}</div>
                    </flint-grid>
                `)}
            </flint-grid>
        </div>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">wrap="wrap-reverse" — overflow wraps upward</p>
        <flint-grid container spacing="2" wrap="wrap-reverse">
            ${[1, 2, 3, 4, 5].map(n => html`
                <flint-grid xs="4">
                    <div style="${itemStyle}">${n}</div>
                </flint-grid>
            `)}
        </flint-grid>
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
        <flint-grid container spacing="2">
            <flint-grid xs="12" md="8" .order=${{ xs: 1, md: 0 }}>
                <div style="${itemStyle}">Main content (order: xs=1, md=0)</div>
            </flint-grid>
            <flint-grid xs="12" md="4" .order=${{ xs: 2, md: -1 }}>
                <div style="${altItemStyle}">Sidebar (order: xs=2, md=-1)</div>
            </flint-grid>
        </flint-grid>
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
        <flint-grid container spacing="2">
            <flint-grid xs="5"><div style="${itemStyle}">xs=5</div></flint-grid>
            <flint-grid xs="5"><div style="${itemStyle}">xs=5</div></flint-grid>
            <flint-grid xs="5"><div style="${altItemStyle}">xs=5 (wraps)</div></flint-grid>
        </flint-grid>
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
        <flint-grid container spacing="2">
            <flint-grid .xs=${true}><div style="${greenItemStyle}">auto (property)</div></flint-grid>
            <flint-grid xs="6"><div style="${greenItemStyle}">xs=6</div></flint-grid>
            <flint-grid .xs=${true}><div style="${greenItemStyle}">auto (property)</div></flint-grid>
        </flint-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">
            ✅ <code>xs="true"</code> (string attribute) — also works due to coercion
        </p>
        <flint-grid container spacing="2">
            <flint-grid xs="true"><div style="${itemStyle}">auto (string "true")</div></flint-grid>
            <flint-grid xs="6"><div style="${itemStyle}">xs=6</div></flint-grid>
            <flint-grid xs="true"><div style="${itemStyle}">auto (string "true")</div></flint-grid>
        </flint-grid>

        <p style="font-family: monospace; color: #555; margin: 16px 0 8px;">
            ⚠️ <code>xs</code> (bare attribute, empty string) — does NOT trigger auto layout
        </p>
        <flint-grid container spacing="2">
            <flint-grid xs><div style="${altItemStyle}">bare xs (broken)</div></flint-grid>
            <flint-grid xs="6"><div style="${altItemStyle}">xs=6</div></flint-grid>
            <flint-grid xs><div style="${altItemStyle}">bare xs (broken)</div></flint-grid>
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Responsive Viewport Variants
// -----------------------------------------------------------------------------

export const MobileViewport: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => html`
        <flint-grid container spacing="2">
            <flint-grid xs="12" md="6">
                <div style="${itemStyle}">xs=12 md=6 (full width on mobile)</div>
            </flint-grid>
            <flint-grid xs="12" md="6">
                <div style="${itemStyle}">xs=12 md=6 (full width on mobile)</div>
            </flint-grid>
            <flint-grid xs="6" md="4">
                <div style="${altItemStyle}">xs=6 md=4</div>
            </flint-grid>
            <flint-grid xs="6" md="4">
                <div style="${altItemStyle}">xs=6 md=4</div>
            </flint-grid>
            <flint-grid xs="12" md="4">
                <div style="${greenItemStyle}">xs=12 md=4</div>
            </flint-grid>
        </flint-grid>
    `,
};

export const TabletViewport: Story = {
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
  render: () => html`
        <flint-grid container spacing="2">
            <flint-grid xs="12" sm="6" md="4">
                <div style="${itemStyle}">xs=12 sm=6 md=4</div>
            </flint-grid>
            <flint-grid xs="12" sm="6" md="4">
                <div style="${itemStyle}">xs=12 sm=6 md=4</div>
            </flint-grid>
            <flint-grid xs="12" sm="12" md="4">
                <div style="${altItemStyle}">xs=12 sm=12 md=4</div>
            </flint-grid>
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Responsive Cards
// Cards reflow from 1-column (mobile) to 2-column (sm) to 3-column (md) to
// 4-column (lg). Resize the viewport to see the layout adapt.
// -----------------------------------------------------------------------------

const cardStyle = 'background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,.1); font-family: system-ui;';

export const ResponsiveCards: Story = {
  render: () => html`
        <p style="font-family: monospace; color: #555; margin: 0 0 12px;">
            Resize viewport: xs 1-col, sm 2-col, md 3-col, lg 4-col
        </p>
        <flint-grid container spacing="3">
            ${[1, 2, 3, 4, 5, 6, 7, 8].map(n => html`
                <flint-grid xs="12" sm="6" md="4" lg="3">
                    <div style="${cardStyle}">
                        <div style="font-weight: 600; margin-bottom: 8px;">Card ${n}</div>
                        <div style="color: #6b7280; font-size: 14px;">
                            xs=12 sm=6 md=4 lg=3
                        </div>
                    </div>
                </flint-grid>
            `)}
        </flint-grid>
    `,
};

// -----------------------------------------------------------------------------
// Common Layouts
// Demonstrates sidebar+content, holy grail, and dashboard patterns that
// developers frequently need.
// -----------------------------------------------------------------------------

const sectionStyle = (bg: string) => `background: ${bg}; border-radius: 6px; padding: 16px; font-family: system-ui; color: #fff; min-height: 60px; display: flex; align-items: center; justify-content: center; box-sizing: border-box;`;

export const CommonLayouts: Story = {
  render: () => html`
        <!-- Sidebar + Content -->
        <p style="font-family: monospace; color: #555; margin: 0 0 8px; font-weight: 600;">
            Sidebar + Content (stacks on mobile)
        </p>
        <flint-grid container spacing="2" style="margin-bottom: 32px;">
            <flint-grid xs="12" md="3">
                <div style="${sectionStyle('#4f46e5')}">Sidebar</div>
            </flint-grid>
            <flint-grid xs="12" md="9">
                <div style="${sectionStyle('#2563eb')}">Content</div>
            </flint-grid>
        </flint-grid>

        <!-- Holy Grail -->
        <p style="font-family: monospace; color: #555; margin: 0 0 8px; font-weight: 600;">
            Holy Grail (header, left nav, content, right aside, footer)
        </p>
        <flint-grid container spacing="2" style="margin-bottom: 32px;">
            <flint-grid xs="12">
                <div style="${sectionStyle('#0f172a')}">Header</div>
            </flint-grid>
            <flint-grid xs="12" md="2">
                <div style="${sectionStyle('#4f46e5')}">Nav</div>
            </flint-grid>
            <flint-grid xs="12" md="8">
                <div style="${sectionStyle('#2563eb')}; min-height: 120px;">Main Content</div>
            </flint-grid>
            <flint-grid xs="12" md="2">
                <div style="${sectionStyle('#7c3aed')}">Aside</div>
            </flint-grid>
            <flint-grid xs="12">
                <div style="${sectionStyle('#0f172a')}">Footer</div>
            </flint-grid>
        </flint-grid>

        <!-- Dashboard -->
        <p style="font-family: monospace; color: #555; margin: 0 0 8px; font-weight: 600;">
            Dashboard (mixed card sizes)
        </p>
        <flint-grid container spacing="2">
            <flint-grid xs="12" md="8">
                <div style="${sectionStyle('#075985')}; min-height: 160px;">Chart (wide)</div>
            </flint-grid>
            <flint-grid xs="12" md="4">
                <div style="${sectionStyle('#0f766e')}; min-height: 160px;">Summary</div>
            </flint-grid>
            <flint-grid xs="6" md="3">
                <div style="${sectionStyle('#b45309')}">Metric 1</div>
            </flint-grid>
            <flint-grid xs="6" md="3">
                <div style="${sectionStyle('#b91c1c')}">Metric 2</div>
            </flint-grid>
            <flint-grid xs="6" md="3">
                <div style="${sectionStyle('#7c3aed')}">Metric 3</div>
            </flint-grid>
            <flint-grid xs="6" md="3">
                <div style="${sectionStyle('#047857')}">Metric 4</div>
            </flint-grid>
        </flint-grid>
    `,
};