import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-toggle-button';
import './flint-toggle-button-group';

const meta: Meta = {
    title: 'Inputs/Toggle Button',
    component: 'flint-toggle-button',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                ],
            },
        },
    },
    argTypes: {
        selected: { control: 'boolean' },
        disabled: { control: 'boolean' },
        value:    { control: 'text' },
        size:     { control: 'select', options: ['sm', 'md', 'lg'] },
        content:  { control: 'text' },
    },
    args: {
        selected: false,
        disabled: false,
        value:    'option',
        size:     'md',
        content:  'Toggle',
    },
    render: (args: Record<string, unknown>) => html`
        <flint-toggle-button
            .selected=${args.selected as boolean}
            ?disabled=${args.disabled as boolean}
            .value=${args.value as string}
            size=${args.size as string}
            @flint-toggle-button-change=${(e: CustomEvent) =>
                console.log('flint-toggle-button-change', e.detail)}
        >${args.content}</flint-toggle-button>
    `,
};

export default meta;
type Story = StoryObj;

/* ─── Playground ──────────────────────────────────── */
export const Playground: Story = {};

Playground.play = async ({ canvasElement }) => {
    const toggleBtn = canvasElement.querySelector('flint-toggle-button') as HTMLElement & { selected: boolean };
    await waitFor(() => expect(toggleBtn).toBeTruthy());
    await waitFor(() => expect(toggleBtn.selected).toBe(false));
    await userEvent.click(toggleBtn);
    await waitFor(() => expect(toggleBtn.selected).toBe(true));
    await userEvent.click(toggleBtn);
    await waitFor(() => expect(toggleBtn.selected).toBe(false));
};

/* ─── Default (unselected) ────────────────────────── */
export const Default: Story = {
    args: { selected: false, content: 'Bold' },
};

/* ─── Selected ────────────────────────────────────── */
export const Selected: Story = {
    args: { selected: true, content: 'Bold' },
};

/* ─── Disabled ────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; font-family: var(--flint-font-family);">
            <flint-toggle-button value="a" disabled>Disabled</flint-toggle-button>
            <flint-toggle-button value="b" selected disabled>Selected + Disabled</flint-toggle-button>
        </div>
    `,
};

/* ─── Sizes ───────────────────────────────────────── */
export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; align-items: center; gap: 12px; font-family: var(--flint-font-family);">
            <flint-toggle-button size="sm" value="sm">Small</flint-toggle-button>
            <flint-toggle-button size="md" value="md">Medium</flint-toggle-button>
            <flint-toggle-button size="lg" value="lg">Large</flint-toggle-button>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 12px; font-family: var(--flint-font-family);">
            <flint-toggle-button size="sm" value="sm" selected>Small (on)</flint-toggle-button>
            <flint-toggle-button size="md" value="md" selected>Medium (on)</flint-toggle-button>
            <flint-toggle-button size="lg" value="lg" selected>Large (on)</flint-toggle-button>
        </div>
    `,
};

/* ─── Standalone (no group) ───────────────────────── */
export const Standalone: Story = {
    render: () => {
        let isOn = false;
        const toggle = (host: HTMLElement) => {
            isOn = !isOn;
            const btn = host.querySelector('flint-toggle-button') as HTMLElement & { selected: boolean };
            if (btn) btn.selected = isOn;
        };
        return html`
            <div style="font-family: var(--flint-font-family);">
                <p style="margin-bottom: 12px; color: var(--flint-text-color-muted);">
                    Standalone toggle button — state managed by parent
                </p>
                <div @flint-toggle-button-change=${(e: Event) => toggle((e.currentTarget as HTMLElement))}>
                    <flint-toggle-button value="mute">Mute</flint-toggle-button>
                </div>
            </div>
        `;
    },
};

/* ─── With Icon ───────────────────────────────────── */
export const WithIcon: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; font-family: var(--flint-font-family);">
            <flint-toggle-button value="bold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h8a4 4 0 0 1 0 8H6zm0 8h9a4 4 0 0 1 0 8H6z"></path>
                </svg>
                Bold
            </flint-toggle-button>
            <flint-toggle-button value="italic" selected>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <line x1="19" y1="4" x2="10" y2="4" stroke="currentColor" stroke-width="2"></line>
                    <line x1="14" y1="20" x2="5" y2="20" stroke="currentColor" stroke-width="2"></line>
                    <line x1="15" y1="4" x2="9" y2="20" stroke="currentColor" stroke-width="2"></line>
                </svg>
                Italic
            </flint-toggle-button>
        </div>
    `,
};

/* ─── In a group ──────────────────────────────────── */
export const InGroup: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; font-family: var(--flint-font-family);">
            <div>
                <p style="margin: 0 0 8px 0; font-weight: 600;">Exclusive (radio)</p>
                <flint-toggle-button-group value="center"
                    @flint-toggle-button-group-change=${(e: CustomEvent) =>
                        console.log('group change', e.detail.value)}>
                    <flint-toggle-button value="left">Left</flint-toggle-button>
                    <flint-toggle-button value="center">Center</flint-toggle-button>
                    <flint-toggle-button value="right">Right</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
            <div>
                <p style="margin: 0 0 8px 0; font-weight: 600;">Multiple (checkbox)</p>
                <flint-toggle-button-group .exclusive=${false} .value=${['bold', 'underline']}>
                    <flint-toggle-button value="bold">B</flint-toggle-button>
                    <flint-toggle-button value="italic">I</flint-toggle-button>
                    <flint-toggle-button value="underline">U</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
        </div>
    `,
};

/* ─── Dark Mode ───────────────────────────────────── */
export const DarkMode: Story = {
    render: () => html`
        <div class="flint-theme-dark" style="
            background: var(--flint-surface-background);
            padding: 24px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            font-family: var(--flint-font-family);
        ">
            <div style="display: flex; gap: 12px;">
                <flint-toggle-button value="a">Default</flint-toggle-button>
                <flint-toggle-button value="b" selected>Selected</flint-toggle-button>
                <flint-toggle-button value="c" disabled>Disabled</flint-toggle-button>
            </div>
            <flint-toggle-button-group value="left">
                <flint-toggle-button value="left">Left</flint-toggle-button>
                <flint-toggle-button value="center">Center</flint-toggle-button>
                <flint-toggle-button value="right">Right</flint-toggle-button>
            </flint-toggle-button-group>
        </div>
    `,
};

/* ─── Accessibility ───────────────────────────────── */
export const Accessibility: Story = {
    render: () => html`
        <div style="font-family: var(--flint-font-family); display: flex; flex-direction: column; gap: 16px;">
            <p style="margin: 0; color: var(--flint-text-color-muted);">
                Each button renders <code>aria-pressed</code> and a native <code>&lt;button&gt;</code>
                — fully keyboard accessible (Tab + Space/Enter).
            </p>
            <div style="display: flex; gap: 12px;">
                <flint-toggle-button value="notifications" aria-label="Toggle notifications">
                    Notifications
                </flint-toggle-button>
                <flint-toggle-button value="notifications" selected aria-label="Toggle notifications (on)">
                    Notifications (on)
                </flint-toggle-button>
            </div>
        </div>
    `,
};
