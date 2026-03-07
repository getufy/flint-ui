import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-tooltip.js';
import '../button/ui-button.js';

const meta: Meta = {
    title: 'Data Display/Tooltip',
    component: 'ui-tooltip',
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
};

export default meta;

type Story = StoryObj;

/* ─── Playground ─────────────────────────────────────────── */
export const Playground: Story = {
    args: {
        label: 'This is a tooltip',
        placement: 'top',
        arrow: true,
        disabled: false,
        openDelay: 0,
        closeDelay: 0,
    },
    render: (args) => html`
        <div style="padding: 100px; display: flex; justify-content: center;">
            <ui-tooltip
                .label=${args.label}
                .placement=${args.placement}
                ?arrow=${args.arrow}
                ?disabled=${args.disabled}
                open-delay=${args.openDelay}
                close-delay=${args.closeDelay}
            >
                <ui-button variant="primary">Hover Me</ui-button>
            </ui-tooltip>
        </div>
    `,
};

/* ─── Default ────────────────────────────────────────────── */
export const Default: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; justify-content: center;">
            <ui-tooltip label="This is a tooltip" arrow>
                <ui-button variant="primary">Hover Me</ui-button>
            </ui-tooltip>
        </div>
    `,
};

/* ─── Placements ─────────────────────────────────────────── */
export const Placements: Story = {
    render: () => html`
        <div style="padding: 100px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; justify-items: center;">
            <ui-tooltip label="Top placement" placement="top" arrow>
                <ui-button>Top</ui-button>
            </ui-tooltip>
            <ui-tooltip label="Bottom placement" placement="bottom" arrow>
                <ui-button>Bottom</ui-button>
            </ui-tooltip>
            <ui-tooltip label="Left placement" placement="left" arrow>
                <ui-button>Left</ui-button>
            </ui-tooltip>
            <ui-tooltip label="Right placement" placement="right" arrow>
                <ui-button>Right</ui-button>
            </ui-tooltip>
        </div>
    `,
};

/* ─── Icons ──────────────────────────────────────────────── */
export const Icons: Story = {
    render: () => html`
        <div style="padding: 50px; display: flex; gap: 20px;">
            <ui-tooltip label="Delete item" placement="top" arrow>
                <button style="border:none; background:none; cursor:pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </button>
            </ui-tooltip>
            <ui-tooltip label="Settings" placement="bottom">
                <button style="border:none; background:none; cursor:pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>
                </button>
            </ui-tooltip>
        </div>
    `,
};

/* ─── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; gap: 32px; justify-content: center;">
            <ui-tooltip label="I won't show" disabled arrow>
                <ui-button>Disabled tooltip</ui-button>
            </ui-tooltip>
            <ui-tooltip label="I will show" arrow>
                <ui-button>Enabled tooltip</ui-button>
            </ui-tooltip>
        </div>
    `,
};

/* ─── Delay ──────────────────────────────────────────────── */
export const Delay: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; gap: 32px; justify-content: center;">
            <ui-tooltip label="Instant" arrow>
                <ui-button>No delay</ui-button>
            </ui-tooltip>
            <ui-tooltip label="Open delay 500ms" open-delay="500" arrow>
                <ui-button>Open delay</ui-button>
            </ui-tooltip>
            <ui-tooltip label="Close delay 500ms" close-delay="500" arrow>
                <ui-button>Close delay</ui-button>
            </ui-tooltip>
            <ui-tooltip label="Both 300ms" open-delay="300" close-delay="300" arrow>
                <ui-button>Both delays</ui-button>
            </ui-tooltip>
        </div>
    `,
};

/* ─── Auto Flip ──────────────────────────────────────────── */
export const AutoFlip: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: center;">
                <ui-tooltip label="I'm set to top but will flip to bottom near the edge" placement="top" arrow>
                    <ui-button>Top (flip me by scrolling up)</ui-button>
                </ui-tooltip>
            </div>
            <div style="display: flex; justify-content: flex-start;">
                <ui-tooltip label="Left tooltip flips to right near edge" placement="left" arrow>
                    <ui-button>Left edge</ui-button>
                </ui-tooltip>
            </div>
            <div style="display: flex; justify-content: flex-end;">
                <ui-tooltip label="Right tooltip flips to left near edge" placement="right" arrow>
                    <ui-button>Right edge</ui-button>
                </ui-tooltip>
            </div>
        </div>
    `,
};

/* ─── Long Text (max-width) ──────────────────────────────── */
export const LongText: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; justify-content: center;">
            <ui-tooltip
                label="This is a very long tooltip that demonstrates the max-width constraint. It will wrap to multiple lines instead of stretching across the entire viewport."
                arrow
            >
                <ui-button>Hover for long tooltip</ui-button>
            </ui-tooltip>
        </div>
    `,
};

/* ─── Keyboard ───────────────────────────────────────────── */
export const KeyboardAccessibility: Story = {
    render: () => html`
        <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
            <span>Tab to focus, Escape to dismiss:</span>
            <ui-tooltip label="First tooltip" arrow>
                <ui-button>First</ui-button>
            </ui-tooltip>
            <ui-tooltip label="Second tooltip" arrow>
                <ui-button>Second</ui-button>
            </ui-tooltip>
        </div>
    `,
};
