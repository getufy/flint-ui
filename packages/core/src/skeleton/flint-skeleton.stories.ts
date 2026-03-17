import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-skeleton';

const meta: Meta = {
    title: 'Feedback/Skeleton',
    component: 'flint-skeleton',
    parameters: {
        docs: {
            description: {
                component: `
Skeletons display a placeholder preview of content before data gets loaded.

- **Tag**: \`<flint-skeleton>\`
- **Class**: \`FlintSkeleton\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`dark\` | \`dark\` | \`boolean\` | \`false\` | If true, applies dark-theme styles regardless of OS preference. |
| \`animation\` | \`animation\` | \`'pulse' \\| 'wave' \\| 'none'\` | \`'pulse'\` | The animation type. |
| \`shape\` | \`shape\` | \`'text' \\| 'circular' \\| 'rectangular' \\| 'rounded'\` | \`'text'\` | The shape of the skeleton. |
| \`variant\` | \`variant\` | \`'text' \\| 'circular' \\| 'rectangular' \\| 'rounded'\` | \`'text'\` |  |
| \`width\` | \`width\` | \`string\` | \`''\` | The width of the skeleton. Accepts any CSS length value (e.g. '200px', '50%'). |
| \`height\` | \`height\` | \`string\` | \`''\` | The height of the skeleton. Accepts any CSS length value. |
| \`label\` | \`label\` | \`string\` | \`'Loading...'\` | Accessible label announced by screen readers. Set to '' to silence. |

#### CSS Parts

| Name | Description |
|---|---|
| \`skeleton\` | The inner skeleton span element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-skeleton-bg\` | — |
| \`--flint-skeleton-bg-dark\` | — |
| \`--flint-skeleton-wave-color\` | — |
| \`--flint-skeleton-animation-duration\` | — |
| \`--flint-border-radius-sm\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-border-radius-lg\` | — |
                `,
            },
        },
    },
    argTypes: {
        shape: {
            control: 'select',
            options: ['text', 'circular', 'rectangular', 'rounded'],
            description: 'The shape of the skeleton.',
        },
        variant: {
            control: 'select',
            options: ['text', 'circular', 'rectangular', 'rounded'],
            description: '**Deprecated** — use `shape` instead.',
        },
        animation: {
            control: 'select',
            options: ['pulse', 'wave', 'none'],
            description: 'The animation type.',
        },
        width: { control: 'text', description: 'CSS length value, e.g. 200px or 50%.' },
        height: { control: 'text', description: 'CSS length value.' },
        dark: { control: 'boolean', description: 'Force dark-mode styles regardless of OS preference.' },
        label: { control: 'text', description: 'aria-label on host for screen readers. Set to empty to silence.' },
    },
    args: {
        shape: 'text',
        animation: 'pulse',
        width: '300px',
        height: '',
        dark: false,
        label: 'Loading...',
    },
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
    render: (args) => html`
        <flint-skeleton
            .shape=${args.shape}
            .animation=${args.animation}
            .width=${args.width}
            .height=${args.height}
            .label=${args.label}
            ?dark=${args.dark}>
        </flint-skeleton>`,
};

export const Basic: Story = {
    args: {
        shape: 'text',
        animation: 'pulse',
        width: '300px',
    },
    render: (args) => html`<flint-skeleton
        .shape=${args.shape}
        .animation=${args.animation}
        .width=${args.width}
        .height=${args.height}>
    </flint-skeleton>`,
};

export const Shapes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; font-family: sans-serif;">
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Circular</p>
                <flint-skeleton shape="circular" width="40px" height="40px"></flint-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Text</p>
                <flint-skeleton shape="text" width="60%"></flint-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Rectangular</p>
                <flint-skeleton shape="rectangular" width="200px" height="100px"></flint-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Rounded</p>
                <flint-skeleton shape="rounded" width="200px" height="100px"></flint-skeleton>
            </div>
        </div>
    `,
};

export const Animations: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; font-family: sans-serif;">
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Pulse (Default)</p>
                <flint-skeleton shape="rectangular" width="300px" height="40px" animation="pulse"></flint-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Wave</p>
                <flint-skeleton shape="rectangular" width="300px" height="40px" animation="wave"></flint-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">None (static)</p>
                <flint-skeleton shape="rectangular" width="300px" height="40px" animation="none"></flint-skeleton>
            </div>
        </div>
    `,
};

export const NoAnimation: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <flint-skeleton shape="text" width="80%" animation="none"></flint-skeleton>
            <flint-skeleton shape="text" width="60%" animation="none"></flint-skeleton>
            <flint-skeleton shape="rectangular" width="100%" height="120px" animation="none"></flint-skeleton>
        </div>
    `,
};

export const DarkMode: Story = {
    render: () => html`
        <div style="background: #121212; padding: 24px; border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <flint-skeleton dark shape="circular" width="44px" height="44px" animation="wave"></flint-skeleton>
                <div style="flex: 1;">
                    <flint-skeleton dark shape="text" width="70%" animation="wave"></flint-skeleton>
                    <flint-skeleton dark shape="text" width="40%" animation="wave"></flint-skeleton>
                </div>
            </div>
            <flint-skeleton dark shape="rectangular" width="100%" height="140px" animation="wave"></flint-skeleton>
            <flint-skeleton dark shape="text" width="100%" animation="wave" style="margin-top: 12px;"></flint-skeleton>
            <flint-skeleton dark shape="text" width="80%" animation="wave"></flint-skeleton>
        </div>
    `,
};

export const CardExample: Story = {
    render: () => html`
        <div style="width: 300px; padding: 16px; border: 1px solid #eee; border-radius: 8px; font-family: sans-serif;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <flint-skeleton shape="circular" width="40px" height="40px" animation="wave"></flint-skeleton>
                <div style="flex: 1;">
                    <flint-skeleton shape="text" width="80%" animation="wave"></flint-skeleton>
                    <flint-skeleton shape="text" width="40%" animation="wave"></flint-skeleton>
                </div>
            </div>
            <flint-skeleton shape="rectangular" width="100%" height="150px" animation="wave" style="margin-bottom: 12px;"></flint-skeleton>
            <flint-skeleton shape="text" width="100%" animation="wave"></flint-skeleton>
            <flint-skeleton shape="text" width="100%" animation="wave"></flint-skeleton>
            <flint-skeleton shape="text" width="60%" animation="wave"></flint-skeleton>
        </div>
    `,
};

export const ListSkeleton: Story = {
    render: () => html`
        <div style="width: 360px; font-family: sans-serif; display: flex; flex-direction: column; gap: 16px;">
            ${[0, 1, 2].map(() => html`
                <div style="display: flex; align-items: center; gap: 12px;">
                    <flint-skeleton shape="circular" width="44px" height="44px" animation="wave"></flint-skeleton>
                    <div style="flex: 1;">
                        <flint-skeleton shape="text" width="65%" animation="wave"></flint-skeleton>
                        <flint-skeleton shape="text" width="45%" animation="wave"></flint-skeleton>
                    </div>
                </div>
            `)}
        </div>
    `,
};

export const ArticleSkeleton: Story = {
    render: () => html`
        <div style="width: 480px; font-family: sans-serif;">
            <flint-skeleton shape="rectangular" width="100%" height="200px" animation="wave"></flint-skeleton>
            <flint-skeleton shape="text" width="70%" animation="wave" style="margin-top: 16px; height: 1.4em;"></flint-skeleton>
            <flint-skeleton shape="text" width="100%" animation="wave"></flint-skeleton>
            <flint-skeleton shape="text" width="100%" animation="wave"></flint-skeleton>
            <flint-skeleton shape="text" width="100%" animation="wave"></flint-skeleton>
            <flint-skeleton shape="text" width="85%" animation="wave"></flint-skeleton>
        </div>
    `,
};
