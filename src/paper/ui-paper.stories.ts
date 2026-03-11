import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-paper';
import '../box/ui-box';
import '../button/ui-button';

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
        <ui-box p="48px" bgcolor="var(--ui-muted-background, #f5f5f5)" display="flex" justifyContent="center">
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
        <ui-box p="40px" bgcolor="var(--ui-muted-background, #f5f5f5)" display="flex" justifyContent="center">
            <ui-paper style="--ui-paper-padding: 24px; width: 200px; text-align: center;">
                Elevated (default)
            </ui-paper>
        </ui-box>
    `,
};

// ── All Elevations ────────────────────────────────────────────────────────────

export const Elevations: Story = {
    render: () => html`
        <ui-box p="40px" display="flex" flexWrap="wrap" gap="32px" bgcolor="var(--ui-muted-background, #f5f5f5)">
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
        <ui-box p="40px" bgcolor="var(--ui-background, #fff)" display="flex" gap="24px" flexWrap="wrap">
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
        <ui-box p="40px" bgcolor="var(--ui-muted-background, #f0f0f0)" display="flex" gap="24px" flexWrap="wrap">
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
        <ui-box p="40px" bgcolor="var(--ui-muted-background, #f5f5f5)" display="flex" gap="24px" flexWrap="wrap">
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
        <ui-box p="40px" bgcolor="var(--ui-muted-background, #f0f0f0)" display="flex" gap="24px" flexWrap="wrap" alignItems="flex-start">
            ${[0, 8, 16, 24, 40].map(p => html`
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                    <ui-paper
                        elevation="2"
                        style=${`--ui-paper-padding: ${p}px;`}
                    >
                        <ui-box bgcolor="rgba(59,130,246,0.15)" style="font-size: 13px;">content</ui-box>
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
        <ui-box p="40px" bgcolor="var(--ui-muted-background, #f5f5f5)" display="flex" gap="24px" flexWrap="wrap" alignItems="flex-start">
            <!-- Card with header / body / footer -->
            <ui-paper elevation="2" style="max-width: 320px; overflow: hidden;">
                <ui-box p="16px 20px" borderBottom="1px solid rgba(0,0,0,0.08)" fontWeight="600" fontSize="15px">
                    Card Header
                </ui-box>
                <ui-box p="20px" fontSize="14px" lineHeight="1.6" color="#444">
                    Paper used as a card surface. Slot any HTML inside — headers, body text,
                    images, or actions.
                </ui-box>
                <ui-stack direction="row" p="12px 20px" borderTop="1px solid rgba(0,0,0,0.08)" justifyContent="flex-end" gap="8px">
                    <ui-button variant="outlined">Cancel</ui-button>
                    <ui-button variant="primary">Confirm</ui-button>
                </ui-stack>
            </ui-paper>

            <!-- Outlined variant as a form panel -->
            <ui-paper variant="outlined" style="--ui-paper-padding: 20px; max-width: 280px;">
                <p style="margin: 0 0 12px; font-weight: 600;">Settings Panel</p>
                <ui-stack direction="row" alignItems="center" gap="8px" fontSize="14px">
                    <input type="checkbox" /> Enable notifications
                </ui-stack>
                <ui-stack direction="row" alignItems="center" gap="8px" fontSize="14px" mt="8px">
                    <input type="checkbox" checked /> Auto-save
                </ui-stack>
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
        <ui-box p="40px" bgcolor="var(--ui-muted-background, #f0f0f0)">
            <ui-paper elevation="3" style="--ui-paper-padding: 24px; max-width: 400px; line-height: 1.6;">
                <h3 style="margin-top: 0;">Physical Surfaces</h3>
                <p>The Paper component mimics physical surfaces. Higher elevation implies that the paper is closer to the viewer and casts a larger shadow.</p>
                <p style="margin-bottom: 0;">This behavior follows the principles of Material Design and real-world lighting.</p>
            </ui-paper>
        </div>
    `,
};
