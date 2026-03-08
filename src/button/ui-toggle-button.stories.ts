import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-toggle-button';
import './ui-toggle-button-group';

const meta: Meta = {
    title: 'Inputs/Toggle Button',
    component: 'ui-toggle-button',
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
        <ui-toggle-button
            .selected=${args.selected as boolean}
            ?disabled=${args.disabled as boolean}
            .value=${args.value as string}
            size=${args.size as string}
            @ui-toggle-button-change=${(e: CustomEvent) =>
                console.log('ui-toggle-button-change', e.detail)}
        >${args.content}</ui-toggle-button>
    `,
};

export default meta;
type Story = StoryObj;

/* ─── Playground ──────────────────────────────────── */
export const Playground: Story = {};

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
        <div style="display: flex; gap: 12px; font-family: var(--ui-font-family);">
            <ui-toggle-button value="a" disabled>Disabled</ui-toggle-button>
            <ui-toggle-button value="b" selected disabled>Selected + Disabled</ui-toggle-button>
        </div>
    `,
};

/* ─── Sizes ───────────────────────────────────────── */
export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; align-items: center; gap: 12px; font-family: var(--ui-font-family);">
            <ui-toggle-button size="sm" value="sm">Small</ui-toggle-button>
            <ui-toggle-button size="md" value="md">Medium</ui-toggle-button>
            <ui-toggle-button size="lg" value="lg">Large</ui-toggle-button>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 12px; font-family: var(--ui-font-family);">
            <ui-toggle-button size="sm" value="sm" selected>Small (on)</ui-toggle-button>
            <ui-toggle-button size="md" value="md" selected>Medium (on)</ui-toggle-button>
            <ui-toggle-button size="lg" value="lg" selected>Large (on)</ui-toggle-button>
        </div>
    `,
};

/* ─── Standalone (no group) ───────────────────────── */
export const Standalone: Story = {
    render: () => {
        let isOn = false;
        const toggle = (host: HTMLElement) => {
            isOn = !isOn;
            const btn = host.querySelector('ui-toggle-button') as HTMLElement & { selected: boolean };
            if (btn) btn.selected = isOn;
        };
        return html`
            <div style="font-family: var(--ui-font-family);">
                <p style="margin-bottom: 12px; color: var(--ui-text-color-muted);">
                    Standalone toggle button — state managed by parent
                </p>
                <div @ui-toggle-button-change=${(e: Event) => toggle((e.currentTarget as HTMLElement))}>
                    <ui-toggle-button value="mute">Mute</ui-toggle-button>
                </div>
            </div>
        `;
    },
};

/* ─── With Icon ───────────────────────────────────── */
export const WithIcon: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; font-family: var(--ui-font-family);">
            <ui-toggle-button value="bold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h8a4 4 0 0 1 0 8H6zm0 8h9a4 4 0 0 1 0 8H6z"></path>
                </svg>
                Bold
            </ui-toggle-button>
            <ui-toggle-button value="italic" selected>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <line x1="19" y1="4" x2="10" y2="4" stroke="currentColor" stroke-width="2"></line>
                    <line x1="14" y1="20" x2="5" y2="20" stroke="currentColor" stroke-width="2"></line>
                    <line x1="15" y1="4" x2="9" y2="20" stroke="currentColor" stroke-width="2"></line>
                </svg>
                Italic
            </ui-toggle-button>
        </div>
    `,
};

/* ─── In a group ──────────────────────────────────── */
export const InGroup: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; font-family: var(--ui-font-family);">
            <div>
                <p style="margin: 0 0 8px 0; font-weight: 600;">Exclusive (radio)</p>
                <ui-toggle-button-group value="center"
                    @ui-toggle-button-group-change=${(e: CustomEvent) =>
                        console.log('group change', e.detail.value)}>
                    <ui-toggle-button value="left">Left</ui-toggle-button>
                    <ui-toggle-button value="center">Center</ui-toggle-button>
                    <ui-toggle-button value="right">Right</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
            <div>
                <p style="margin: 0 0 8px 0; font-weight: 600;">Multiple (checkbox)</p>
                <ui-toggle-button-group .exclusive=${false} .value=${['bold', 'underline']}>
                    <ui-toggle-button value="bold">B</ui-toggle-button>
                    <ui-toggle-button value="italic">I</ui-toggle-button>
                    <ui-toggle-button value="underline">U</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
        </div>
    `,
};

/* ─── Dark Mode ───────────────────────────────────── */
export const DarkMode: Story = {
    render: () => html`
        <div class="ui-theme-dark" style="
            background: var(--ui-surface-background);
            padding: 24px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            font-family: var(--ui-font-family);
        ">
            <div style="display: flex; gap: 12px;">
                <ui-toggle-button value="a">Default</ui-toggle-button>
                <ui-toggle-button value="b" selected>Selected</ui-toggle-button>
                <ui-toggle-button value="c" disabled>Disabled</ui-toggle-button>
            </div>
            <ui-toggle-button-group value="left">
                <ui-toggle-button value="left">Left</ui-toggle-button>
                <ui-toggle-button value="center">Center</ui-toggle-button>
                <ui-toggle-button value="right">Right</ui-toggle-button>
            </ui-toggle-button-group>
        </div>
    `,
};

/* ─── Accessibility ───────────────────────────────── */
export const Accessibility: Story = {
    render: () => html`
        <div style="font-family: var(--ui-font-family); display: flex; flex-direction: column; gap: 16px;">
            <p style="margin: 0; color: var(--ui-text-color-muted);">
                Each button renders <code>aria-pressed</code> and a native <code>&lt;button&gt;</code>
                — fully keyboard accessible (Tab + Space/Enter).
            </p>
            <div style="display: flex; gap: 12px;">
                <ui-toggle-button value="notifications" aria-label="Toggle notifications">
                    Notifications
                </ui-toggle-button>
                <ui-toggle-button value="notifications" selected aria-label="Toggle notifications (on)">
                    Notifications (on)
                </ui-toggle-button>
            </div>
        </div>
    `,
};
