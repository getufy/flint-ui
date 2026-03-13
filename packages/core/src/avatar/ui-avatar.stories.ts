import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-avatar';
import '../button/ui-button';

const meta: Meta = {
    title: 'Data Display/Avatar',
    component: 'ui-avatar',
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
        <ui-avatar
            .src=${args.src ?? ''}
            .alt=${args.alt ?? ''}
            .initials=${args.initials ?? ''}
            .variant=${args.variant}
            .size=${args.size}
        ></ui-avatar>
    `,
};

export const WithInitials: Story = {
    args: {
        initials: 'JD',
        src: '',
    },
    render: (args) => html`
        <ui-avatar
            .initials=${args.initials ?? ''}
            .variant=${args.variant}
            .size=${args.size}
            style="--ui-avatar-bg: #dbeafe; --ui-avatar-color: #1d4ed8;"
        ></ui-avatar>
    `,
};

export const Initials: Story = {
    args: { initials: 'JD' },
    render: (args) => html`
        <div style="display: flex; gap: 1rem; align-items: center;">
            <ui-avatar .initials=${args.initials ?? ''} size="small" .variant=${args.variant} style="--ui-avatar-bg: #fee2e2; --ui-avatar-color: #ef4444;"></ui-avatar>
            <ui-avatar .initials=${args.initials ?? ''} size="medium" .variant=${args.variant} style="--ui-avatar-bg: #dcfce7; --ui-avatar-color: #22c55e;"></ui-avatar>
            <ui-avatar .initials=${args.initials ?? ''} size="large" .variant=${args.variant} style="--ui-avatar-bg: #dbeafe; --ui-avatar-color: #3b82f6;"></ui-avatar>
            <ui-avatar .initials=${args.initials ?? ''} size="xlarge" .variant=${args.variant} style="--ui-avatar-bg: #ede9fe; --ui-avatar-color: #7c3aed;"></ui-avatar>
        </div>
    `,
};

export const Sizes: Story = {
    args: { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    render: (args) => html`
        <div style="display: flex; gap: 1rem; align-items: center;">
            <ui-avatar size="small" .src=${args.src ?? ''} .variant=${args.variant}></ui-avatar>
            <ui-avatar size="medium" .src=${args.src ?? ''} .variant=${args.variant}></ui-avatar>
            <ui-avatar size="large" .src=${args.src ?? ''} .variant=${args.variant}></ui-avatar>
            <ui-avatar size="xlarge" .src=${args.src ?? ''} .variant=${args.variant}></ui-avatar>
        </div>
    `,
};

export const Variants: Story = {
    args: { src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
    render: (args) => html`
        <div style="display: flex; gap: 1.5rem; align-items: center;">
            <div style="text-align: center; font-family: system-ui; font-size: 12px; color: #6b7280;">
                <ui-avatar variant="circle" .src=${args.src ?? ''} .size=${args.size}></ui-avatar>
                <div style="margin-top: 6px;">circle</div>
            </div>
            <div style="text-align: center; font-family: system-ui; font-size: 12px; color: #6b7280;">
                <ui-avatar variant="rounded" .src=${args.src ?? ''} .size=${args.size}></ui-avatar>
                <div style="margin-top: 6px;">rounded</div>
            </div>
            <div style="text-align: center; font-family: system-ui; font-size: 12px; color: #6b7280;">
                <ui-avatar variant="square" .src=${args.src ?? ''} .size=${args.size}></ui-avatar>
                <div style="margin-top: 6px;">square</div>
            </div>
        </div>
    `,
};

export const Fallbacks: Story = {
    render: () => html`
        <div style="display: flex; gap: 1rem; align-items: center; font-family: system-ui; font-size: 12px; color: #6b7280;">
            <div style="text-align: center;">
                <ui-avatar src="/invalid.png" initials="F"></ui-avatar>
                <div style="margin-top: 6px;">broken src → initials</div>
            </div>
            <div style="text-align: center;">
                <ui-avatar></ui-avatar>
                <div style="margin-top: 6px;">no src or initials → icon</div>
            </div>
        </div>
    `,
};

export const AvatarGroup: Story = {
    render: () => html`
        <div style="display: flex; align-items: center;">
            <ui-avatar size="medium" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&amp;h=80&amp;fit=crop" style="margin-right: -10px; z-index: 5; position: relative;"></ui-avatar>
            <ui-avatar size="medium" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&amp;h=80&amp;fit=crop" style="margin-right: -10px; z-index: 4; position: relative;"></ui-avatar>
            <ui-avatar size="medium" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&amp;h=80&amp;fit=crop" style="margin-right: -10px; z-index: 3; position: relative;"></ui-avatar>
            <ui-avatar size="medium" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&amp;h=80&amp;fit=crop" style="margin-right: 8px; z-index: 2; position: relative;"></ui-avatar>
            <ui-avatar size="medium" initials="+3" style="z-index: 1; --ui-avatar-bg: #f3f4f6; --ui-avatar-color: #6b7280;"></ui-avatar>
        </div>
    `,
};

export const CustomSize: Story = {
    render: () => html`
        <div style="display: flex; gap: 1.5rem; align-items: center;">
            <ui-avatar initials="XS" style="--ui-avatar-size: 24px; --ui-avatar-bg: #fef3c7; --ui-avatar-color: #d97706;"></ui-avatar>
            <ui-avatar initials="SM" style="--ui-avatar-size: 48px; --ui-avatar-bg: #dcfce7; --ui-avatar-color: #16a34a;"></ui-avatar>
            <ui-avatar initials="LG" style="--ui-avatar-size: 64px; --ui-avatar-bg: #ede9fe; --ui-avatar-color: #7c3aed;"></ui-avatar>
            <ui-avatar initials="XL" style="--ui-avatar-size: 96px; --ui-avatar-bg: #fce7f3; --ui-avatar-color: #db2777;"></ui-avatar>
        </div>
    `,
};

export const ProfileCardExample: Story = {
    render: () => html`
        <div style="max-width: 300px; padding: 24px; background: var(--ui-surface-background); border-radius: 16px; box-shadow: var(--ui-shadow-lg); font-family: var(--ui-font-family); text-align: center;">
            <ui-avatar size="xlarge" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&amp;h=200&amp;fit=crop" style="margin-bottom: 16px; border: 4px solid var(--ui-primary-color); padding: 4px;"></ui-avatar>
            <h3 style="margin: 0; font-size: 20px;">Alex Johnson</h3>
            <p style="margin: 4px 0 16px; color: var(--ui-text-color-muted); font-size: 14px;">Senior Product Designer</p>
            <div style="display: flex; justify-content: center; gap: 8px;">
                <ui-button variant="primary" size="small">Follow</ui-button>
                <ui-button variant="secondary" size="small">Message</ui-button>
            </div>
        </div>
    `,
};
