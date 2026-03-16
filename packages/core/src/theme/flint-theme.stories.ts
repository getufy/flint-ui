import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-theme';

const meta: Meta = {
    title: 'Utilities/Theme',
    component: 'flint-theme',
    parameters: {
        docs: {
            description: {
                component: `
Scopes CSS custom properties to a subtree for nested theme overrides.

- **Tag**: \`<flint-theme>\`
- **Class**: \`FlintTheme\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`mode\` | \`mode\` | \`'light' \\| 'dark' \\| 'auto'\` | \`'auto'\` | Color mode override for this subtree. |
| \`palette\` | \`palette\` | \`string\` | — | Palette override — swaps primary color tokens. Options: \`rose\`, \`teal\`, \`violet\`, \`amber\`, \`emerald\`, \`slate\`. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for child content. |
                `,
            },
        },
    },
    argTypes: {
        mode:    { control: 'select', options: ['auto', 'light', 'dark'] },
        palette: { control: 'select', options: ['', 'rose', 'teal', 'violet', 'amber', 'emerald', 'slate'] },
    },
    args: {
        mode: 'auto',
        palette: '',
    },
};

export default meta;
type Story = StoryObj;

const cardStyle = `
    padding: 20px; border-radius: 8px;
    background: var(--flint-surface-1, #ffffff);
    border: 1px solid var(--flint-border-color, #e5e7eb);
    font-family: var(--flint-font-family, system-ui, sans-serif);
    color: var(--flint-text-color, #111827);
`;

const swatchStyle = `
    display: inline-block; width: 40px; height: 40px; border-radius: 6px;
    border: 1px solid var(--flint-border-color, #e5e7eb);
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    render: (args) => html`
        <flint-theme .mode=${args.mode} .palette=${args.palette || undefined}>
            <div style="padding: 24px;">
                <div style=${cardStyle}>
                    <p style="margin: 0 0 12px; font-size: 0.9375rem; font-weight: 500;">
                        Theme Provider
                    </p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">
                        This card inherits tokens from the wrapping
                        <code>&lt;flint-theme&gt;</code>. Use the controls to change
                        <code>mode</code> and <code>palette</code>.
                    </p>
                    <div style="margin-top: 16px; display: flex; gap: 8px;">
                        <div style="${swatchStyle} background: var(--flint-primary-color, #3b82f6);"></div>
                        <div style="${swatchStyle} background: var(--flint-primary-color-hover, #2563eb);"></div>
                        <div style="${swatchStyle} background: var(--flint-primary-color-active, #1d4ed8);"></div>
                    </div>
                </div>
            </div>
        </flint-theme>
    `,
};

/* ── Dark Mode ───────────────────────────────────────────────────── */
export const DarkMode: Story = {
    name: 'Dark Mode',
    args: { mode: 'dark' },
    render: () => html`
        <flint-theme mode="dark">
            <div style="padding: 24px; background: var(--flint-background, #09090b); border-radius: 8px;">
                <div style=${cardStyle}>
                    <p style="margin: 0 0 8px; font-size: 0.9375rem; font-weight: 500;">
                        Dark Mode
                    </p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #a1a1aa);">
                        All child components pick up dark surface and text tokens.
                    </p>
                    <div style="margin-top: 16px; display: flex; gap: 8px;">
                        <div style="${swatchStyle} background: var(--flint-primary-color, #60a5fa);"></div>
                        <div style="${swatchStyle} background: var(--flint-surface-1, #18181b);"></div>
                        <div style="${swatchStyle} background: var(--flint-surface-2, #27272a);"></div>
                    </div>
                </div>
            </div>
        </flint-theme>
    `,
};

/* ── Light Mode ──────────────────────────────────────────────────── */
export const LightMode: Story = {
    name: 'Light Mode',
    args: { mode: 'light' },
    render: () => html`
        <flint-theme mode="light">
            <div style="padding: 24px;">
                <div style=${cardStyle}>
                    <p style="margin: 0 0 8px; font-size: 0.9375rem; font-weight: 500;">
                        Light Mode
                    </p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #52525b);">
                        Explicitly forces light tokens regardless of system preference.
                    </p>
                    <div style="margin-top: 16px; display: flex; gap: 8px;">
                        <div style="${swatchStyle} background: var(--flint-primary-color, #2563eb);"></div>
                        <div style="${swatchStyle} background: var(--flint-surface-1, #ffffff);"></div>
                        <div style="${swatchStyle} background: var(--flint-surface-2, #fafafa);"></div>
                    </div>
                </div>
            </div>
        </flint-theme>
    `,
};

/* ── Rose Palette ────────────────────────────────────────────────── */
export const RosePalette: Story = {
    name: 'Rose Palette',
    args: { palette: 'rose' },
    render: () => html`
        <flint-theme palette="rose">
            <div style="padding: 24px;">
                <div style=${cardStyle}>
                    <p style="margin: 0 0 8px; font-size: 0.9375rem; font-weight: 500;">
                        Rose Palette
                    </p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">
                        Primary color tokens are overridden to rose.
                    </p>
                    <div style="margin-top: 16px; display: flex; gap: 8px;">
                        <div style="${swatchStyle} background: var(--flint-primary-color, #e11d48);"></div>
                        <div style="${swatchStyle} background: var(--flint-primary-color-hover, #be123c);"></div>
                        <div style="${swatchStyle} background: var(--flint-primary-color-active, #9f1239);"></div>
                    </div>
                </div>
            </div>
        </flint-theme>
    `,
};

/* ── Teal Palette ────────────────────────────────────────────────── */
export const TealPalette: Story = {
    name: 'Teal Palette',
    args: { palette: 'teal' },
    render: () => html`
        <flint-theme palette="teal">
            <div style="padding: 24px;">
                <div style=${cardStyle}>
                    <p style="margin: 0 0 8px; font-size: 0.9375rem; font-weight: 500;">
                        Teal Palette
                    </p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">
                        Primary color tokens are overridden to teal.
                    </p>
                    <div style="margin-top: 16px; display: flex; gap: 8px;">
                        <div style="${swatchStyle} background: var(--flint-primary-color, #0d9488);"></div>
                        <div style="${swatchStyle} background: var(--flint-primary-color-hover, #0f766e);"></div>
                        <div style="${swatchStyle} background: var(--flint-primary-color-active, #115e59);"></div>
                    </div>
                </div>
            </div>
        </flint-theme>
    `,
};

/* ── Nested Themes ───────────────────────────────────────────────── */
export const NestedThemes: Story = {
    name: 'Nested Themes',
    render: () => html`
        <flint-theme mode="light">
            <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                <div style=${cardStyle}>
                    <p style="margin: 0 0 8px; font-size: 0.9375rem; font-weight: 500;">
                        Light parent
                    </p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">
                        This outer section uses light mode.
                    </p>
                </div>

                <flint-theme mode="dark">
                    <div style="padding: 24px; background: var(--flint-background, #09090b); border-radius: 8px;">
                        <div style=${cardStyle}>
                            <p style="margin: 0 0 8px; font-size: 0.9375rem; font-weight: 500;">
                                Dark nested section
                            </p>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #a1a1aa);">
                                This inner section overrides to dark mode.
                            </p>
                        </div>

                        <flint-theme palette="rose" style="display: block; margin-top: 16px;">
                            <div style=${cardStyle}>
                                <p style="margin: 0 0 8px; font-size: 0.9375rem; font-weight: 500;">
                                    Dark + Rose palette
                                </p>
                                <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #a1a1aa);">
                                    Nested again with a palette override on top of dark mode.
                                </p>
                                <div style="margin-top: 12px; display: flex; gap: 8px;">
                                    <div style="${swatchStyle} background: var(--flint-primary-color, #e11d48);"></div>
                                </div>
                            </div>
                        </flint-theme>
                    </div>
                </flint-theme>
            </div>
        </flint-theme>
    `,
};
