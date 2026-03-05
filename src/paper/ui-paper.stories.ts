import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-paper';

const meta: Meta = {
    title: 'Surfaces/Paper',
    component: 'ui-paper',
    parameters: {
        docs: {
            description: {
                component: 'The Paper component is a container for displaying content on an elevated surface. Shadow styles are heavily influenced by their real-world physical counterparts.',
            },
        },
    },
    argTypes: {
        elevation: {
            control: { type: 'select' },
            options: [0, 1, 2, 3, 4, 6, 8, 12, 16, 24],
            description: 'Shadow depth. Supported values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24.',
        },
        variant: {
            control: { type: 'radio' },
            options: ['elevated', 'outlined', 'flat'],
            description: 'Visual variant of the paper surface.',
        },
        square: {
            control: 'boolean',
            description: 'If true, corners are square (border-radius: 0).',
        },
    },
};

export default meta;

type Story = StoryObj;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
    args: {
        elevation: 2,
        variant: 'elevated',
        square: false,
    },
    render: (args) => html`
        <div style="padding: 48px; background-color: #f5f5f5; display: flex; justify-content: center;">
            <ui-paper
                .elevation=${args.elevation}
                .variant=${args.variant}
                ?square=${args.square}
                style="--ui-paper-padding: 24px; width: 280px; line-height: 1.6;"
            >
                <p style="margin: 0 0 8px; font-weight: 600;">Interactive Paper</p>
                <p style="margin: 0; color: #555; font-size: 14px;">
                    Use the controls below to explore elevation, variant, and square modes.
                </p>
            </ui-paper>
        </div>
    `,
};

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Basic: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #f5f5f5; display: flex; justify-content: center;">
            <ui-paper style="--ui-paper-padding: 24px; width: 200px; text-align: center;">
                Elevated (default)
            </ui-paper>
        </div>
    `,
};

// ── All Elevations ────────────────────────────────────────────────────────────

export const Elevations: Story = {
    render: () => html`
        <div style="padding: 40px; display: flex; flex-wrap: wrap; gap: 32px; background-color: #f5f5f5;">
            ${[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map(e => html`
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <ui-paper
                        .elevation=${e}
                        style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;"
                    >
                        e=${e}
                    </ui-paper>
                </div>
            `)}
        </div>
    `,
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Outlined: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #fff; display: flex; gap: 24px; flex-wrap: wrap;">
            <ui-paper variant="outlined" style="--ui-paper-padding: 20px; width: 140px; text-align: center;">
                Outlined
            </ui-paper>
            <ui-paper variant="outlined" square style="--ui-paper-padding: 20px; width: 140px; text-align: center;">
                Outlined + Square
            </ui-paper>
        </div>
    `,
};

export const Flat: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #f0f0f0; display: flex; gap: 24px; flex-wrap: wrap;">
            <ui-paper variant="flat" style="--ui-paper-padding: 20px; width: 140px; text-align: center;">
                Flat
            </ui-paper>
            <ui-paper variant="flat" square style="--ui-paper-padding: 20px; width: 140px; text-align: center;">
                Flat + Square
            </ui-paper>
        </div>
    `,
};

// ── Square ────────────────────────────────────────────────────────────────────

export const Square: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #f5f5f5; display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                <ui-paper elevation="3" style="width: 100px; height: 80px; display: flex; align-items: center; justify-content: center;">Rounded</ui-paper>
                rounded (default)
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                <ui-paper elevation="3" square style="width: 100px; height: 80px; display: flex; align-items: center; justify-content: center;">Square</ui-paper>
                square
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                <ui-paper variant="outlined" square style="width: 100px; height: 80px; display: flex; align-items: center; justify-content: center;">Outlined</ui-paper>
                outlined + square
            </div>
        </div>
    `,
};

// ── Custom Padding ────────────────────────────────────────────────────────────

export const CustomPadding: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #f0f0f0; display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
            ${[0, 8, 16, 24, 40].map(p => html`
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                    <ui-paper
                        elevation="2"
                        style=${`--ui-paper-padding: ${p}px;`}
                    >
                        <div style="background: rgba(59,130,246,0.15); font-size: 13px;">content</div>
                    </ui-paper>
                    padding: ${p}px
                </div>
            `)}
        </div>
    `,
};

// ── Composed (card-like) ──────────────────────────────────────────────────────

export const Composed: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #f5f5f5; display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
            <!-- Card with header / body / footer -->
            <ui-paper elevation="2" style="max-width: 320px; overflow: hidden;">
                <div style="padding: 16px 20px; border-bottom: 1px solid rgba(0,0,0,0.08); font-weight: 600; font-size: 15px;">
                    Card Header
                </div>
                <div style="padding: 20px; font-size: 14px; line-height: 1.6; color: #444;">
                    Paper used as a card surface. Slot any HTML inside — headers, body text,
                    images, or actions.
                </div>
                <div style="padding: 12px 20px; border-top: 1px solid rgba(0,0,0,0.08); display: flex; justify-content: flex-end; gap: 8px;">
                    <button style="padding: 6px 12px; border: 1px solid #ccc; background: #fff; border-radius: 4px; cursor: pointer;">Cancel</button>
                    <button style="padding: 6px 12px; border: none; background: #3b82f6; color: #fff; border-radius: 4px; cursor: pointer;">Confirm</button>
                </div>
            </ui-paper>

            <!-- Outlined variant as a form panel -->
            <ui-paper variant="outlined" style="--ui-paper-padding: 20px; max-width: 280px;">
                <p style="margin: 0 0 12px; font-weight: 600;">Settings Panel</p>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px;">
                    <input type="checkbox" /> Enable notifications
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; margin-top: 8px;">
                    <input type="checkbox" checked /> Auto-save
                </label>
            </ui-paper>
        </div>
    `,
};

// ── Dark Mode simulation ──────────────────────────────────────────────────────

export const DarkMode: Story = {
    render: () => html`
        <div
            style="
                padding: 40px;
                background-color: #121212;
                display: flex;
                flex-wrap: wrap;
                gap: 32px;
            "
        >
            ${[0, 1, 3, 8, 16, 24].map(e => html`
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <ui-paper
                        .elevation=${e}
                        style="
                            --ui-surface-background: #1e1e1e;
                            --ui-text-color: #e5e7eb;
                            width: 80px;
                            height: 80px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 13px;
                            font-weight: 600;
                        "
                    >
                        e=${e}
                    </ui-paper>
                    <span style="color: #aaa; font-size: 11px;">e=${e}</span>
                </div>
            `)}
        </div>
    `,
};

// ── Padding via content ───────────────────────────────────────────────────────

export const PaperWithPadding: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #f0f0f0;">
            <ui-paper elevation="3" style="--ui-paper-padding: 24px; max-width: 400px; line-height: 1.6;">
                <h3 style="margin-top: 0;">Physical Surfaces</h3>
                <p>The Paper component mimics physical surfaces. Higher elevation implies that the paper is closer to the viewer and casts a larger shadow.</p>
                <p style="margin-bottom: 0;">This behavior follows the principles of Material Design and real-world lighting.</p>
            </ui-paper>
        </div>
    `,
};
