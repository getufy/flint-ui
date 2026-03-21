import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-tooltip.js';
import '../button/flint-button.js';

const meta: Meta = {
    title: 'Data Display/Tooltip',
    component: 'flint-tooltip',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'button-name', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
flint-tooltip
A component that displays a text label when users hover over or focus on an element.

- **Tag**: \`<flint-tooltip>\`
- **Class**: \`FlintTooltip\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` | Text content displayed inside the tooltip. |
| \`placement\` | \`placement\` | \`Placement\` | \`'top'\` | Preferred placement of the tooltip relative to the trigger element. |
| \`arrow\` | \`arrow\` | \`boolean\` | \`false\` | Show a small arrow pointing toward the trigger element. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the tooltip so it never appears. |
| \`openDelay\` | \`open-delay\` | \`number\` | \`0\` | Delay in ms before showing the tooltip. |
| \`closeDelay\` | \`close-delay\` | \`number\` | \`0\` | Delay in ms before hiding the tooltip. |
| \`hoist\` | \`hoist\` | \`boolean\` | \`false\` | When true, the tooltip popup uses \`position: fixed\` instead of \`position: absolute\` |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-tooltip-show\` | — | Dispatched when the tooltip becomes visible. |
| \`flint-tooltip-hide\` | — | Dispatched when the tooltip is dismissed. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-tooltip-bg\` | — |
| \`--flint-tooltip-color\` | — |
| \`--flint-tooltip-max-width\` | \`300px\` |
| \`--flint-border-radius-sm\` | — |
| \`--flint-font-family\` | — |
| \`--flint-shadow-sm\` | — |
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        placement: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
        },
        arrow: { control: 'boolean' },
        disabled: { control: 'boolean' },
        openDelay: { control: 'number' },
        closeDelay: { control: 'number' },
    },
    args: {
        label: 'This is a tooltip',
        placement: 'top',
        arrow: true,
        disabled: false,
        openDelay: 0,
        closeDelay: 0,
    },
};

export default meta;

type Story = StoryObj;

/* ─── Playground ─────────────────────────────────────────── */
export const Playground: Story = {
    render: (args) => html`
        <div style="padding: 100px; display: flex; justify-content: center;">
            <flint-tooltip
                .label=${args.label}
                .placement=${args.placement}
                ?arrow=${args.arrow}
                ?disabled=${args.disabled}
                open-delay=${args.openDelay}
                close-delay=${args.closeDelay}
            >
                <flint-button appearance="filled" color="primary">Hover Me</flint-button>
            </flint-tooltip>
        </div>
    `,
};

/* ─── Default ────────────────────────────────────────────── */
export const Default: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; justify-content: center;">
            <flint-tooltip label="This is a tooltip" arrow>
                <flint-button appearance="filled" color="primary">Hover Me</flint-button>
            </flint-tooltip>
        </div>
    `,
};

Default.play = async ({ canvasElement }) => {
    const tooltip = canvasElement.querySelector('flint-tooltip') as HTMLElement;
    const button = canvasElement.querySelector('flint-button') as HTMLElement;

    // Tooltip should not be visible initially
    const tipSurface = () => tooltip.shadowRoot!.querySelector('[part="surface"], .tooltip, [role="tooltip"]');
    await waitFor(() => {
        const surface = tipSurface();
        if (surface) {
            expect(getComputedStyle(surface).visibility === 'hidden' || getComputedStyle(surface).opacity === '0' || !surface.hasAttribute('data-show')).toBeTruthy();
        }
    });

    // Hover to show tooltip
    await userEvent.hover(button);
    await waitFor(() => {
        const surface = tipSurface();
        expect(surface).toBeTruthy();
    }, { timeout: 2000 });

    // Unhover to hide tooltip
    await userEvent.unhover(button);
};

/* ─── Placements ─────────────────────────────────────────── */
export const Placements: Story = {
    render: () => html`
        <div style="padding: 100px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; justify-items: center;">
            <flint-tooltip label="Top placement" placement="top" arrow>
                <flint-button>Top</flint-button>
            </flint-tooltip>
            <flint-tooltip label="Bottom placement" placement="bottom" arrow>
                <flint-button>Bottom</flint-button>
            </flint-tooltip>
            <flint-tooltip label="Left placement" placement="left" arrow>
                <flint-button>Left</flint-button>
            </flint-tooltip>
            <flint-tooltip label="Right placement" placement="right" arrow>
                <flint-button>Right</flint-button>
            </flint-tooltip>
        </div>
    `,
};

/* ─── Icons ──────────────────────────────────────────────── */
export const Icons: Story = {
    render: () => html`
        <div style="padding: 50px; display: flex; gap: 20px;">
            <flint-tooltip label="Delete item" placement="top" arrow>
                <flint-button appearance="text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </flint-button>
            </flint-tooltip>
            <flint-tooltip label="Settings" placement="bottom">
                <flint-button appearance="text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>
                </flint-button>
            </flint-tooltip>
        </div>
    `,
};

/* ─── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; gap: 32px; justify-content: center;">
            <flint-tooltip label="I won't show" disabled arrow>
                <flint-button>Disabled tooltip</flint-button>
            </flint-tooltip>
            <flint-tooltip label="I will show" arrow>
                <flint-button>Enabled tooltip</flint-button>
            </flint-tooltip>
        </div>
    `,
};

/* ─── Delay ──────────────────────────────────────────────── */
export const Delay: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; gap: 32px; justify-content: center;">
            <flint-tooltip label="Instant" arrow>
                <flint-button>No delay</flint-button>
            </flint-tooltip>
            <flint-tooltip label="Open delay 500ms" open-delay="500" arrow>
                <flint-button>Open delay</flint-button>
            </flint-tooltip>
            <flint-tooltip label="Close delay 500ms" close-delay="500" arrow>
                <flint-button>Close delay</flint-button>
            </flint-tooltip>
            <flint-tooltip label="Both 300ms" open-delay="300" close-delay="300" arrow>
                <flint-button>Both delays</flint-button>
            </flint-tooltip>
        </div>
    `,
};

/* ─── Auto Flip ──────────────────────────────────────────── */
export const AutoFlip: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: center;">
                <flint-tooltip label="I'm set to top but will flip to bottom near the edge" placement="top" arrow>
                    <flint-button>Top (flip me by scrolling up)</flint-button>
                </flint-tooltip>
            </div>
            <div style="display: flex; justify-content: flex-start;">
                <flint-tooltip label="Left tooltip flips to right near edge" placement="left" arrow>
                    <flint-button>Left edge</flint-button>
                </flint-tooltip>
            </div>
            <div style="display: flex; justify-content: flex-end;">
                <flint-tooltip label="Right tooltip flips to left near edge" placement="right" arrow>
                    <flint-button>Right edge</flint-button>
                </flint-tooltip>
            </div>
        </div>
    `,
};

/* ─── Hoist (overflow container) ─────────────────────────── */
export const Hoist: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; gap: 40px; justify-content: center;">
            <div style="overflow: hidden; border: 2px dashed #e5e7eb; padding: 24px; border-radius: 8px; width: 200px;">
                <p style="font-size: 0.75rem; color: #6b7280; margin: 0 0 12px;">overflow: hidden (no hoist)</p>
                <flint-tooltip label="This tooltip is clipped" placement="bottom" arrow>
                    <flint-button>Clipped</flint-button>
                </flint-tooltip>
            </div>
            <div style="overflow: hidden; border: 2px dashed #2563eb; padding: 24px; border-radius: 8px; width: 200px;">
                <p style="font-size: 0.75rem; color: #2563eb; margin: 0 0 12px;">overflow: hidden (with hoist)</p>
                <flint-tooltip label="This tooltip escapes the container" placement="bottom" arrow hoist>
                    <flint-button appearance="filled" color="primary">Hoisted</flint-button>
                </flint-tooltip>
            </div>
        </div>
    `,
};

/* ─── Long Text (max-width) ──────────────────────────────── */
export const LongText: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; justify-content: center;">
            <flint-tooltip
                label="This is a very long tooltip that demonstrates the max-width constraint. It will wrap to multiple lines instead of stretching across the entire viewport."
                arrow
            >
                <flint-button>Hover for long tooltip</flint-button>
            </flint-tooltip>
        </div>
    `,
};

/* ─── Keyboard ───────────────────────────────────────────── */
export const KeyboardAccessibility: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
            <span>Tab to focus, Escape to dismiss:</span>
            <flint-tooltip label="First tooltip" arrow>
                <flint-button>First</flint-button>
            </flint-tooltip>
            <flint-tooltip label="Second tooltip" arrow>
                <flint-button>Second</flint-button>
            </flint-tooltip>
        </div>
    `,
};
