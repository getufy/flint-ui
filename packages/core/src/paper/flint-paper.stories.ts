import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-paper';
import '../box/flint-box';
import '../button/flint-button';

const meta: Meta = {
    title: 'Surfaces/Paper',
    component: 'flint-paper',
    parameters: {
        docs: {
            description: {
                component: `
The Paper component is a container for displaying content on an elevated surface. Shadow styles are influenced by real-world physical counterparts. Supported elevation values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24. Other numeric values are accepted but produce no visible shadow.

- **Tag**: \`<flint-paper>\`
- **Class**: \`FlintPaper\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`elevation\` | \`elevation\` | \`number\` | \`1\` | Shadow depth. Supported values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24. Other numeric values are accepted but produce no visible shadow. |
| \`square\` | \`square\` | \`boolean\` | \`false\` | If true, the paper will have square corners (border-radius: 0). |
| \`variant\` | \`variant\` | \`'elevated' \\| 'outlined' \\| 'flat'\` | \`'elevated'\` | Visual variant. - \`elevated\`: raises the surface with a box-shadow (default) - \`outlined\`: flat surface with a visible border and no shadow - \`flat\`: flat surface with no shadow and no border |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-paper-padding\` | \`0\` |
| \`--flint-surface-1\` | — |
| \`--flint-text-color\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-border-color\` | — |
| \`--flint-surface-background-flat\` | — |
                `,
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
    args: {
        elevation: 2,
        variant: 'elevated',
        square: false,
    },
};

export default meta;

type Story = StoryObj;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
    render: (args) => html`
        <flint-box p="48px" bgcolor="var(--flint-muted-background, #f5f5f5)" display="flex" justifyContent="center">
            <flint-paper
                .elevation=${args.elevation}
                .variant=${args.variant}
                ?square=${args.square}
                style="--flint-paper-padding: 24px; width: 280px; line-height: 1.6;"
            >
                <p style="margin: 0 0 8px; font-weight: 600;">Interactive Paper</p>
                <p style="margin: 0; color: #555; font-size: 14px;">
                    Use the controls below to explore elevation, variant, and square modes.
                </p>
            </flint-paper>
        </div>
    `,
};

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Basic: Story = {
    render: () => html`
        <flint-box p="40px" bgcolor="var(--flint-muted-background, #f5f5f5)" display="flex" justifyContent="center">
            <flint-paper style="--flint-paper-padding: 24px; width: 200px; text-align: center;">
                Elevated (default)
            </flint-paper>
        </flint-box>
    `,
};

// ── All Elevations ────────────────────────────────────────────────────────────

export const Elevations: Story = {
    render: () => html`
        <flint-box p="40px" display="flex" flexWrap="wrap" gap="32px" bgcolor="var(--flint-muted-background, #f5f5f5)">
            ${[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map(e => html`
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <flint-paper
                        .elevation=${e}
                        style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;"
                    >
                        e=${e}
                    </flint-paper>
                </div>
            `)}
        </div>
    `,
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Outlined: Story = {
    render: () => html`
        <flint-box p="40px" bgcolor="var(--flint-background, #fff)" display="flex" gap="24px" flexWrap="wrap">
            <flint-paper variant="outlined" style="--flint-paper-padding: 20px; width: 140px; text-align: center;">
                Outlined
            </flint-paper>
            <flint-paper variant="outlined" square style="--flint-paper-padding: 20px; width: 140px; text-align: center;">
                Outlined + Square
            </flint-paper>
        </div>
    `,
};

export const Flat: Story = {
    render: () => html`
        <flint-box p="40px" bgcolor="var(--flint-muted-background, #f0f0f0)" display="flex" gap="24px" flexWrap="wrap">
            <flint-paper variant="flat" style="--flint-paper-padding: 20px; width: 140px; text-align: center;">
                Flat
            </flint-paper>
            <flint-paper variant="flat" square style="--flint-paper-padding: 20px; width: 140px; text-align: center;">
                Flat + Square
            </flint-paper>
        </div>
    `,
};

// ── Square ────────────────────────────────────────────────────────────────────

export const Square: Story = {
    render: () => html`
        <flint-box p="40px" bgcolor="var(--flint-muted-background, #f5f5f5)" display="flex" gap="24px" flexWrap="wrap">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                <flint-paper elevation="3" style="width: 100px; height: 80px; display: flex; align-items: center; justify-content: center;">Rounded</flint-paper>
                rounded (default)
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                <flint-paper elevation="3" square style="width: 100px; height: 80px; display: flex; align-items: center; justify-content: center;">Square</flint-paper>
                square
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                <flint-paper variant="outlined" square style="width: 100px; height: 80px; display: flex; align-items: center; justify-content: center;">Outlined</flint-paper>
                outlined + square
            </div>
        </div>
    `,
};

// ── Custom Padding ────────────────────────────────────────────────────────────

export const CustomPadding: Story = {
    render: () => html`
        <flint-box p="40px" bgcolor="var(--flint-muted-background, #f0f0f0)" display="flex" gap="24px" flexWrap="wrap" alignItems="flex-start">
            ${[0, 8, 16, 24, 40].map(p => html`
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: #666;">
                    <flint-paper
                        elevation="2"
                        style=${`--flint-paper-padding: ${p}px;`}
                    >
                        <flint-box bgcolor="rgba(59,130,246,0.15)" style="font-size: 13px;">content</flint-box>
                    </flint-paper>
                    padding: ${p}px
                </div>
            `)}
        </div>
    `,
};

// ── Composed (card-like) ──────────────────────────────────────────────────────

export const Composed: Story = {
    render: () => html`
        <flint-box p="40px" bgcolor="var(--flint-muted-background, #f5f5f5)" display="flex" gap="24px" flexWrap="wrap" alignItems="flex-start">
            <!-- Card with header / body / footer -->
            <flint-paper elevation="2" style="max-width: 320px; overflow: hidden;">
                <flint-box p="16px 20px" borderBottom="1px solid rgba(0,0,0,0.08)" fontWeight="600" fontSize="15px">
                    Card Header
                </flint-box>
                <flint-box p="20px" fontSize="14px" lineHeight="1.6" color="#444">
                    Paper used as a card surface. Slot any HTML inside — headers, body text,
                    images, or actions.
                </flint-box>
                <flint-stack direction="row" p="12px 20px" borderTop="1px solid rgba(0,0,0,0.08)" justifyContent="flex-end" gap="8px">
                    <flint-button variant="outlined">Cancel</flint-button>
                    <flint-button variant="primary">Confirm</flint-button>
                </flint-stack>
            </flint-paper>

            <!-- Outlined variant as a form panel -->
            <flint-paper variant="outlined" style="--flint-paper-padding: 20px; max-width: 280px;">
                <p style="margin: 0 0 12px; font-weight: 600;">Settings Panel</p>
                <flint-stack direction="row" alignItems="center" gap="8px" fontSize="14px">
                    <input type="checkbox" /> Enable notifications
                </flint-stack>
                <flint-stack direction="row" alignItems="center" gap="8px" fontSize="14px" mt="8px">
                    <input type="checkbox" checked /> Auto-save
                </flint-stack>
            </flint-paper>
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
                    <flint-paper
                        .elevation=${e}
                        style="
                            --flint-surface-background: #1e1e1e;
                            --flint-text-color: #e5e7eb;
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
                    </flint-paper>
                    <span style="color: #aaa; font-size: 11px;">e=${e}</span>
                </div>
            `)}
        </div>
    `,
};

// ── Padding via content ───────────────────────────────────────────────────────

export const PaperWithPadding: Story = {
    render: () => html`
        <flint-box p="40px" bgcolor="var(--flint-muted-background, #f0f0f0)">
            <flint-paper elevation="3" style="--flint-paper-padding: 24px; max-width: 400px; line-height: 1.6;">
                <h3 style="margin-top: 0;">Physical Surfaces</h3>
                <p>The Paper component mimics physical surfaces. Higher elevation implies that the paper is closer to the viewer and casts a larger shadow.</p>
                <p style="margin-bottom: 0;">This behavior follows the principles of Material Design and real-world lighting.</p>
            </flint-paper>
        </div>
    `,
};
