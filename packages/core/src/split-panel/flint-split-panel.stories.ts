import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-split-panel.js';
import '../stack/flint-stack';
import '../box/flint-box';
import type { FlintSplitPanel, SnapFunction } from './flint-split-panel.js';

const meta: Meta = {
    title: 'Layout/Split Panel',
    component: 'flint-split-panel',
    parameters: {
        docs: {
            description: {
                component: `
\`flint-split-panel\` — Two adjacent panels separated by a draggable divider.

- **Tag**: \`<flint-split-panel>\`
- **Class**: \`FlintSplitPanel\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`position\` | \`position\` | \`number\` | \`50\` | Divider position as a percentage (0–100). Defaults to 50. |
| \`positionInPixels\` | \`position-in-pixels\` | \`number\` | \`-1\` | Divider position in pixels from the primary panel's edge. |
| \`vertical\` | \`vertical\` | \`boolean\` | \`false\` | Vertical layout — start/end panels are stacked top/bottom. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Prevent the divider from being repositioned. |
| \`primary\` | \`primary\` | \`'start' \\| 'end' \\| undefined\` | — | Designates a primary panel that maintains its pixel size when the |
| \`snap\` | \`snap\` | \`string \\| SnapFunction\` | \`''\` | Space-separated snap positions (\`Npx\`, \`N%\`, \`repeat(Npx)\`, \`repeat(N%)\`), |
| \`snapThreshold\` | \`snap-threshold\` | \`number\` | \`12\` | How close (px) the divider must be to a snap point before snapping. Default: 12. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-split-panel-reposition\` | \`{ position: number; positionInPixels: number }\` | Emitted when the divider position changes. Detail: \`{ position: number; positionInPixels: number }\`. |

#### Slots

| Name | Description |
|---|---|
| \`start\` | Content for the start (left/top) panel. |
| \`end\` | Content for the end (right/bottom) panel. |
| \`divider\` | Custom handle icon rendered inside the divider. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-split-panel-divider-width\` | — |
| \`--flint-split-panel-divider-hit-area\` | — |
| \`--flint-split-panel-divider-color\` | — |
| \`--flint-split-panel-divider-hover-color\` | — |
| \`--flint-split-panel-min\` | — |
| \`--flint-split-panel-max\` | — |
                `,
            },
        },
    },
    argTypes: {
        position: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        positionInPixels: { control: { type: 'number' } },
        vertical: { control: 'boolean' },
        disabled: { control: 'boolean' },
        primary: { control: 'select', options: ['', 'start', 'end'] },
        snapThreshold: { control: { type: 'number' } },
    },
    args: {
        position: 50,
        positionInPixels: -1,
        vertical: false,
        disabled: false,
        primary: '',
        snapThreshold: 12,
    },
};

export default meta;
type Story = StoryObj;

/* ── shared helpers ────────────────────────────────────────────────── */

const panelStyle =
    'display:flex;align-items:center;justify-content:center;height:100%;padding:24px;' +
    'font-weight:600;font-family:system-ui;color:var(--flint-text-color,#111827);';

const wrapStyle =
    'height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);' +
    'border-radius:8px;overflow:hidden;';

/* ── Playground ────────────────────────────────────────────────────── */

export const Playground: Story = {
    render: (args) => html`
        <div style="${wrapStyle}">
            <flint-split-panel
                .position=${args.position as number}
                .positionInPixels=${args.positionInPixels as number}
                ?vertical=${args.vertical as boolean}
                ?disabled=${args.disabled as boolean}
                .primary=${(args.primary as string) || undefined}
                .snapThreshold=${args.snapThreshold as number}
                style="height:100%;"
            >
                <div slot="start" style="${panelStyle}">Start</div>
                <div slot="end" style="${panelStyle}">End</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Initial Position ──────────────────────────────────────────────── */

export const InitialPosition: Story = {
    name: 'Initial Position (30%)',
    render: () => html`
        <div style="${wrapStyle}">
            <flint-split-panel position="30" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start (30%)</div>
                <div slot="end" style="${panelStyle}">End</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Initial Position in Pixels ────────────────────────────────────── */

export const InitialPositionInPixels: Story = {
    name: 'Initial Position in Pixels (200px)',
    render: () => html`
        <div style="${wrapStyle}">
            <flint-split-panel position-in-pixels="200" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start (200px)</div>
                <div slot="end" style="${panelStyle}">End</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Vertical ──────────────────────────────────────────────────────── */

export const Vertical: Story = {
    render: () => html`
        <div
            style="height:350px;max-width:400px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;"
        >
            <flint-split-panel vertical style="height:100%;">
                <div slot="start" style="${panelStyle}">Start (Top)</div>
                <div slot="end" style="${panelStyle}">End (Bottom)</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Disabled ──────────────────────────────────────────────────────── */

export const Disabled: Story = {
    render: () => html`
        <div style="${wrapStyle}">
            <flint-split-panel disabled position="40" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start (Fixed)</div>
                <div slot="end" style="${panelStyle}">End (Fixed)</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Primary Panel ─────────────────────────────────────────────────── */

export const PrimaryPanel: Story = {
    name: 'Primary Panel',
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Resize your browser window. The primary start panel keeps its pixel size.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel primary="start" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start (primary)</div>
                <div slot="end" style="${panelStyle}">End (flexible)</div>
            </flint-split-panel>
        </div>
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin:16px 0 8px;"
        >
            Primary end — the end panel keeps its size.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel primary="end" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start (flexible)</div>
                <div slot="end" style="${panelStyle}">End (primary)</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Min & Max ─────────────────────────────────────────────────────── */

export const MinMax: Story = {
    name: 'Min & Max',
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Both panels have a minimum of 150px via <code>--flint-split-panel-min</code> and
            <code>--flint-split-panel-max</code>.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel
                primary="start"
                style="height:100%; --flint-split-panel-min: 150px; --flint-split-panel-max: calc(100% - 150px);"
            >
                <div slot="start" style="${panelStyle}">Start (min 150px)</div>
                <div slot="end" style="${panelStyle}">End (min 150px)</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Snapping ──────────────────────────────────────────────────────── */

export const Snapping: Story = {
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Snaps at 100px and 50% — <code>snap="100px 50%"</code>.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel snap="100px 50%" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start</div>
                <div slot="end" style="${panelStyle}">End</div>
            </flint-split-panel>
        </div>
    `,
};

export const SnappingRepeat: Story = {
    name: 'Snapping (repeat)',
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Snaps every 100px and at 50% — <code>snap="repeat(100px) 50%"</code>.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel snap="repeat(100px) 50%" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start</div>
                <div slot="end" style="${panelStyle}">End</div>
            </flint-split-panel>
        </div>
    `,
};

export const CustomSnapFunction: Story = {
    name: 'Custom Snap Function',
    render: () => {
        const snapFn: SnapFunction = ({ pos, size }) =>
            pos < size / 2 ? 100 : size - 100;

        return html`
            <p
                style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
            >
                Snaps to either 100px from the left or 100px from the right.
            </p>
            <div style="${wrapStyle}">
                <flint-split-panel
                    .snap=${snapFn}
                    style="height:100%;"
                >
                    <div slot="start" style="${panelStyle}">Start</div>
                    <div slot="end" style="${panelStyle}">End</div>
                </flint-split-panel>
            </div>
        `;
    },
};

/* ── Nested ────────────────────────────────────────────────────────── */

export const Nested: Story = {
    render: () => html`
        <div
            style="height:300px;max-width:700px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;"
        >
            <flint-split-panel style="height:100%;">
                <div slot="start" style="${panelStyle}">Start</div>
                <flint-split-panel slot="end" vertical style="height:100%;width:100%;">
                    <div slot="start" style="${panelStyle}">Top</div>
                    <div slot="end" style="${panelStyle}">Bottom</div>
                </flint-split-panel>
            </flint-split-panel>
        </div>
    `,
};

/* ── Custom Divider ────────────────────────────────────────────────── */

export const CustomDivider: Story = {
    name: 'Custom Divider',
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Custom handle via the <code>divider</code> slot and CSS custom properties.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel
                style="
                    height:100%;
                    --flint-split-panel-divider-width: 2px;
                    --flint-split-panel-divider-color: var(--flint-primary-color, #3b82f6);
                    --flint-split-panel-divider-hover-color: var(--flint-primary-color-hover, #2563eb);
                "
            >
                <div slot="start" style="${panelStyle}">Start</div>
                <div slot="end" style="${panelStyle}">End</div>
                <flint-box
                    slot="divider"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style="
                        width:20px;height:40px;
                        background:var(--flint-primary-color,#2563eb);
                        border-radius:4px;
                        color:#fff;font-size:10px;letter-spacing:1px;
                    "
                >
                    &#x2195;
                </flint-box>
            </flint-split-panel>
        </div>
    `,
};

/* ── Event Logging ─────────────────────────────────────────────────── */

export const EventLogging: Story = {
    name: 'Event Logging',
    render: () => html`
        <div style="${wrapStyle}">
            <flint-split-panel
                style="height:100%;"
                @flint-split-panel-reposition=${(e: CustomEvent) => {
                    const el = document.getElementById('split-log');
                    if (el) {
                        el.textContent =
                            `position: ${e.detail.position.toFixed(1)}% ` +
                            `| positionInPixels: ${e.detail.positionInPixels.toFixed(0)}px`;
                    }
                }}
            >
                <div slot="start" style="${panelStyle}">Start</div>
                <div slot="end" style="${panelStyle}">End</div>
            </flint-split-panel>
        </div>
        <div
            style="margin-top:12px;padding:8px 12px;font-family:monospace;font-size:13px;
                   background:var(--flint-muted,#f4f4f5);color:var(--flint-text-color,#111827);
                   border:1px solid var(--flint-border-color,#e4e4e7);border-radius:6px;"
        >
            <span id="split-log">Drag the divider to see events</span>
        </div>
    `,
};

/* ── Three Panes ──────────────────────────────────────────────────── */

export const ThreePanes: Story = {
    name: 'Three Panes',
    render: () => html`
        <div
            style="height:250px;max-width:800px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;"
        >
            <flint-split-panel position="33" style="height:100%;">
                <div slot="start" style="${panelStyle}background:var(--flint-demo-panel-blue, #eff6ff);">Panel 1</div>
                <flint-split-panel slot="end" position="50" style="height:100%;width:100%;">
                    <div slot="start" style="${panelStyle}background:var(--flint-demo-panel-green, #f0fdf4);">Panel 2</div>
                    <div slot="end" style="${panelStyle}background:var(--flint-demo-panel-yellow, #fef3c7);">Panel 3</div>
                </flint-split-panel>
            </flint-split-panel>
        </div>
    `,
};

/* ── Vertical Snapping ────────────────────────────────────────────── */

export const VerticalSnapping: Story = {
    name: 'Vertical with Snapping',
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Vertical layout snapping at 33% and 66%.
        </p>
        <div
            style="height:350px;max-width:400px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;"
        >
            <flint-split-panel vertical snap="33% 66%" style="height:100%;">
                <div slot="start" style="${panelStyle}">Top</div>
                <div slot="end" style="${panelStyle}">Bottom</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Custom Styling ───────────────────────────────────────────────── */

export const CustomStyling: Story = {
    name: 'Custom Styling',
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Demonstrates CSS custom properties for divider customization.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel
                style="
                    height:100%;
                    --flint-split-panel-divider-width: 8px;
                    --flint-split-panel-divider-hit-area: 20px;
                    --flint-split-panel-divider-color: #e0e7ff;
                    --flint-split-panel-divider-hover-color: #6366f1;
                "
            >
                <div slot="start" style="${panelStyle}background:var(--flint-demo-panel-purple, #f5f3ff);">Start</div>
                <div slot="end" style="${panelStyle}background:var(--flint-demo-panel-pink, #fdf2f8);">End</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Collapsible Sidebar ──────────────────────────────────────────── */

export const CollapsibleSidebar: Story = {
    name: 'Collapsible Sidebar',
    render: () => html`
        <p
            style="font-family:system-ui;font-size:13px;color:var(--flint-text-color-muted,#4b5563);margin-bottom:12px;"
        >
            Snaps to 0px or 200px — drag past the midpoint to collapse or expand.
        </p>
        <div style="${wrapStyle}">
            <flint-split-panel
                .snap=${'0px 200px'}
                .snapThreshold=${100}
                position-in-pixels="200"
                primary="start"
                style="height:100%; --flint-split-panel-min: 0;"
            >
                <div slot="start" style="${panelStyle}background:var(--flint-demo-panel-green, #f0fdf4);font-size:13px;">
                    Sidebar
                </div>
                <div slot="end" style="${panelStyle}">Main Content</div>
            </flint-split-panel>
        </div>
    `,
};

/* ── Controlled ────────────────────────────────────────────────────── */

export const Controlled: Story = {
    render: () => html`
        <flint-stack direction="row" gap="8px" style="margin-bottom:12px;flex-wrap:wrap;">
            <button
                style="padding:6px 14px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:6px;
                       background:var(--flint-background,#fff);cursor:pointer;font-family:system-ui;font-size:13px;"
                @click=${() => {
                    const p = document.getElementById('controlled-panel') as FlintSplitPanel | null;
                    if (p) p.position = 25;
                }}
            >
                25%
            </button>
            <button
                style="padding:6px 14px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:6px;
                       background:var(--flint-background,#fff);cursor:pointer;font-family:system-ui;font-size:13px;"
                @click=${() => {
                    const p = document.getElementById('controlled-panel') as FlintSplitPanel | null;
                    if (p) p.position = 50;
                }}
            >
                50%
            </button>
            <button
                style="padding:6px 14px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:6px;
                       background:var(--flint-background,#fff);cursor:pointer;font-family:system-ui;font-size:13px;"
                @click=${() => {
                    const p = document.getElementById('controlled-panel') as FlintSplitPanel | null;
                    if (p) p.position = 75;
                }}
            >
                75%
            </button>
        </flint-stack>
        <div style="${wrapStyle}">
            <flint-split-panel id="controlled-panel" style="height:100%;">
                <div slot="start" style="${panelStyle}">Start</div>
                <div slot="end" style="${panelStyle}">End</div>
            </flint-split-panel>
        </div>
    `,
};
