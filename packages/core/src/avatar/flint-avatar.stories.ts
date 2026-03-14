import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-avatar';
import '../button/flint-button';

const meta: Meta = {
    title: 'Data Display/Avatar',
    component: 'flint-avatar',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
- **Tag**: \`<flint-avatar>\`
- **Class**: \`FlintAvatar\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`src\` | \`src\` | \`string\` | \`''\` | Image source URL for the avatar. |
| \`alt\` | \`alt\` | \`string\` | \`''\` | Alt text for the avatar image. |
| \`initials\` | \`initials\` | \`string\` | \`''\` | Initials to display when no image is provided. |
| \`variant\` | \`variant\` | \`'circle' \\| 'square' \\| 'rounded'\` | \`'circle'\` | Shape variant of the avatar. |
| \`size\` | \`size\` | \`'small' \\| 'medium' \\| 'large' \\| 'xlarge'\` | \`'medium'\` | Size of the avatar. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-avatar-size\` | \`40px\` |
| \`--flint-avatar-bg\` | \`var(--flint-surface-3\` |
| \`--flint-avatar-color\` | \`var(--flint-text-color-muted\` |
| \`--flint-font-family\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-surface-2\` | — |
| \`--flint-surface-3\` | — |
                `,
            },
        },
    },
    argTypes: {
        src: { control: 'text' },
        alt: { control: 'text' },
        initials: { control: 'text' },
        variant: { control: 'select', options: ['circle', 'square', 'rounded'] },
        size: { control: 'select', options: ['small', 'medium', 'large', 'xlarge'] },
    },
    args: {
        src: '',
        alt: '',
        variant: 'circle',
        size: 'medium',
        initials: '',
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
        alt: 'User profile',
    },
    render: (args) => html`
        <flint-avatar
            .src=${args.src ?? ''}
            .alt=${args.alt ?? ''}
            .initials=${args.initials ?? ''}
            .variant=${args.variant}
            .size=${args.size}
        ></flint-avatar>
    `,
};

export const WithInitials: Story = {
    args: {
        initials: 'JD',
        src: '',
    },
    render: (args) => html`
        <flint-avatar
            .initials=${args.initials ?? ''}
            .variant=${args.variant}
            .size=${args.size}
            style="--flint-avatar-bg: #dbeafe; --flint-avatar-color: #1d4ed8;"
        ></flint-avatar>
    `,
};

export const Initials: Story = {
    args: { initials: 'JD' },
    render: (args) => html`
        <div style="display: flex; gap: 1rem; align-items: center;">
            <flint-avatar .initials=${args.initials ?? ''} size="small" .variant=${args.variant} style="--flint-avatar-bg: #fee2e2; --flint-avatar-color: #dc2626;"></flint-avatar>
            <flint-avatar .initials=${args.initials ?? ''} size="medium" .variant=${args.variant} style="--flint-avatar-bg: #dcfce7; --flint-avatar-color: #15803d;"></flint-avatar>
            <flint-avatar .initials=${args.initials ?? ''} size="large" .variant=${args.variant} style="--flint-avatar-bg: #dbeafe; --flint-avatar-color: #1d4ed8;"></flint-avatar>
            <flint-avatar .initials=${args.initials ?? ''} size="xlarge" .variant=${args.variant} style="--flint-avatar-bg: #ede9fe; --flint-avatar-color: #7c3aed;"></flint-avatar>
        </div>
    `,
};

export const Sizes: Story = {
    args: { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    render: (args) => html`
        <div style="display: flex; gap: 1rem; align-items: center;">
            <flint-avatar size="small" .src=${args.src ?? ''} .variant=${args.variant}></flint-avatar>
            <flint-avatar size="medium" .src=${args.src ?? ''} .variant=${args.variant}></flint-avatar>
            <flint-avatar size="large" .src=${args.src ?? ''} .variant=${args.variant}></flint-avatar>
            <flint-avatar size="xlarge" .src=${args.src ?? ''} .variant=${args.variant}></flint-avatar>
        </div>
    `,
};

export const Variants: Story = {
    args: { src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
    render: (args) => html`
        <div style="display: flex; gap: 1.5rem; align-items: center;">
            <div style="text-align: center; font-family: system-ui; font-size: 12px; color: #4b5563;">
                <flint-avatar variant="circle" .src=${args.src ?? ''} .size=${args.size}></flint-avatar>
                <div style="margin-top: 6px;">circle</div>
            </div>
            <div style="text-align: center; font-family: system-ui; font-size: 12px; color: #4b5563;">
                <flint-avatar variant="rounded" .src=${args.src ?? ''} .size=${args.size}></flint-avatar>
                <div style="margin-top: 6px;">rounded</div>
            </div>
            <div style="text-align: center; font-family: system-ui; font-size: 12px; color: #4b5563;">
                <flint-avatar variant="square" .src=${args.src ?? ''} .size=${args.size}></flint-avatar>
                <div style="margin-top: 6px;">square</div>
            </div>
        </div>
    `,
};

export const Fallbacks: Story = {
    render: () => html`
        <div style="display: flex; gap: 1rem; align-items: center; font-family: system-ui; font-size: 12px; color: #4b5563;">
            <div style="text-align: center;">
                <flint-avatar src="/invalid.png" initials="F"></flint-avatar>
                <div style="margin-top: 6px;">broken src → initials</div>
            </div>
            <div style="text-align: center;">
                <flint-avatar></flint-avatar>
                <div style="margin-top: 6px;">no src or initials → icon</div>
            </div>
        </div>
    `,
};

export const AvatarGroup: Story = {
    render: () => html`
        <div style="display: flex; align-items: center;">
            <flint-avatar size="medium" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&amp;h=80&amp;fit=crop" style="margin-right: -10px; z-index: 5; position: relative;"></flint-avatar>
            <flint-avatar size="medium" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&amp;h=80&amp;fit=crop" style="margin-right: -10px; z-index: 4; position: relative;"></flint-avatar>
            <flint-avatar size="medium" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&amp;h=80&amp;fit=crop" style="margin-right: -10px; z-index: 3; position: relative;"></flint-avatar>
            <flint-avatar size="medium" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&amp;h=80&amp;fit=crop" style="margin-right: 8px; z-index: 2; position: relative;"></flint-avatar>
            <flint-avatar size="medium" initials="+3" style="z-index: 1; --flint-avatar-bg: #f3f4f6; --flint-avatar-color: #4b5563;"></flint-avatar>
        </div>
    `,
};

export const CustomSize: Story = {
    render: () => html`
        <div style="display: flex; gap: 1.5rem; align-items: center;">
            <flint-avatar initials="XS" style="--flint-avatar-size: 24px; --flint-avatar-bg: #fef3c7; --flint-avatar-color: #92400e;"></flint-avatar>
            <flint-avatar initials="SM" style="--flint-avatar-size: 48px; --flint-avatar-bg: #dcfce7; --flint-avatar-color: #15803d;"></flint-avatar>
            <flint-avatar initials="LG" style="--flint-avatar-size: 64px; --flint-avatar-bg: #ede9fe; --flint-avatar-color: #7c3aed;"></flint-avatar>
            <flint-avatar initials="XL" style="--flint-avatar-size: 96px; --flint-avatar-bg: #fce7f3; --flint-avatar-color: #db2777;"></flint-avatar>
        </div>
    `,
};

export const ProfileCardExample: Story = {
    render: () => html`
        <div style="max-width: 300px; padding: 24px; background: var(--flint-surface-background); border-radius: 16px; box-shadow: var(--flint-shadow-lg); font-family: var(--flint-font-family); text-align: center;">
            <flint-avatar size="xlarge" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&amp;h=200&amp;fit=crop" style="margin-bottom: 16px; border: 4px solid var(--flint-primary-color); padding: 4px;"></flint-avatar>
            <h3 style="margin: 0; font-size: 20px;">Alex Johnson</h3>
            <p style="margin: 4px 0 16px; color: var(--flint-text-color-muted); font-size: 14px;">Senior Product Designer</p>
            <div style="display: flex; justify-content: center; gap: 8px;">
                <flint-button variant="primary" size="small">Follow</flint-button>
                <flint-button variant="secondary" size="small">Message</flint-button>
            </div>
        </div>
    `,
};
