import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-layer';

const meta: Meta = {
    title: 'Utilities/Layer',
    component: 'flint-layer',
    parameters: {
        docs: {
            description: {
                component: `
A contextual layer component that bumps surface/background colors
for nested card-in-card or panel-in-panel patterns [§38.1].

- **Tag**: \`<flint-layer>\`
- **Class**: \`FlintLayer\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for child content. |
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj;

const cardStyle = `
    padding: 20px; border-radius: 8px;
    background: var(--flint-surface-color, #ffffff);
    border: 1px solid var(--flint-border-color, #e5e7eb);
    font-family: var(--flint-font-family, system-ui, sans-serif);
    color: var(--flint-text-color, #111827);
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    render: () => html`
        <div style="padding: 24px;">
            <flint-layer>
                <div style=${cardStyle}>
                    <p style="margin: 0; font-size: 0.9375rem;">
                        This card sits inside a <code>&lt;flint-layer&gt;</code> and uses
                        <code>--flint-surface-color</code> for its background.
                    </p>
                </div>
            </flint-layer>
        </div>
    `,
};

/* ── Nested Layers ───────────────────────────────────────────────── */
export const NestedLayers: Story = {
    name: 'Nested Layers',
    render: () => html`
        <div style="padding: 24px;">
            <flint-layer>
                <div style=${cardStyle}>
                    <p style="margin: 0 0 16px; font-size: 0.9375rem; font-weight: 500;">
                        Layer 1 — Surface 1
                    </p>
                    <flint-layer>
                        <div style=${cardStyle}>
                            <p style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 500;">
                                Layer 2 — Surface 2
                            </p>
                            <flint-layer>
                                <div style=${cardStyle}>
                                    <p style="margin: 0; font-size: 0.8125rem; font-weight: 500;">
                                        Layer 3 — Surface 3
                                    </p>
                                </div>
                            </flint-layer>
                        </div>
                    </flint-layer>
                </div>
            </flint-layer>
        </div>
    `,
};

/* ── With Cards ──────────────────────────────────────────────────── */
export const WithCards: Story = {
    name: 'With Cards',
    render: () => html`
        <div style="padding: 24px; max-width: 600px;">
            <flint-layer>
                <div style="${cardStyle} display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="margin: 0; font-size: 1rem; font-weight: 600;">Dashboard Panel</h3>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">
                        A container card with nested content cards at the next surface level.
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <flint-layer>
                            <div style=${cardStyle}>
                                <p style="margin: 0 0 4px; font-size: 0.8125rem; font-weight: 500;">Revenue</p>
                                <p style="margin: 0; font-size: 1.25rem; font-weight: 700;">$12,340</p>
                            </div>
                        </flint-layer>
                        <flint-layer>
                            <div style=${cardStyle}>
                                <p style="margin: 0 0 4px; font-size: 0.8125rem; font-weight: 500;">Users</p>
                                <p style="margin: 0; font-size: 1.25rem; font-weight: 700;">1,204</p>
                            </div>
                        </flint-layer>
                    </div>
                </div>
            </flint-layer>
        </div>
    `,
};
