import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-skeleton';

const meta: Meta = {
    title: 'Feedback/Skeleton',
    component: 'ui-skeleton',
    argTypes: {
        variant: {
            control: 'select',
            options: ['text', 'circular', 'rectangular', 'rounded'],
            description: 'The shape of the skeleton.',
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
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
    args: {
        variant: 'text',
        animation: 'pulse',
        width: '300px',
        height: '',
        dark: false,
        label: 'Loading...',
    },
    render: (args) => html`
        <ui-skeleton
            .variant=${args.variant}
            .animation=${args.animation}
            .width=${args.width}
            .height=${args.height}
            .label=${args.label}
            ?dark=${args.dark}>
        </ui-skeleton>`,
};

export const Basic: Story = {
    args: {
        variant: 'text',
        animation: 'pulse',
        width: '300px',
    },
    render: (args) => html`<ui-skeleton
        .variant=${args.variant}
        .animation=${args.animation}
        .width=${args.width}
        .height=${args.height}>
    </ui-skeleton>`,
};

export const Shapes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; font-family: sans-serif;">
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Circular</p>
                <ui-skeleton variant="circular" width="40px" height="40px"></ui-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Text</p>
                <ui-skeleton variant="text" width="60%"></ui-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Rectangular</p>
                <ui-skeleton variant="rectangular" width="200px" height="100px"></ui-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Rounded</p>
                <ui-skeleton variant="rounded" width="200px" height="100px"></ui-skeleton>
            </div>
        </div>
    `,
};

export const Animations: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; font-family: sans-serif;">
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Pulse (Default)</p>
                <ui-skeleton variant="rectangular" width="300px" height="40px" animation="pulse"></ui-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">Wave</p>
                <ui-skeleton variant="rectangular" width="300px" height="40px" animation="wave"></ui-skeleton>
            </div>
            <div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #666;">None (static)</p>
                <ui-skeleton variant="rectangular" width="300px" height="40px" animation="none"></ui-skeleton>
            </div>
        </div>
    `,
};

export const NoAnimation: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <ui-skeleton variant="text" width="80%" animation="none"></ui-skeleton>
            <ui-skeleton variant="text" width="60%" animation="none"></ui-skeleton>
            <ui-skeleton variant="rectangular" width="100%" height="120px" animation="none"></ui-skeleton>
        </div>
    `,
};

export const DarkMode: Story = {
    render: () => html`
        <div style="background: #121212; padding: 24px; border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <ui-skeleton dark variant="circular" width="44px" height="44px" animation="wave"></ui-skeleton>
                <div style="flex: 1;">
                    <ui-skeleton dark variant="text" width="70%" animation="wave"></ui-skeleton>
                    <ui-skeleton dark variant="text" width="40%" animation="wave"></ui-skeleton>
                </div>
            </div>
            <ui-skeleton dark variant="rectangular" width="100%" height="140px" animation="wave"></ui-skeleton>
            <ui-skeleton dark variant="text" width="100%" animation="wave" style="margin-top: 12px;"></ui-skeleton>
            <ui-skeleton dark variant="text" width="80%" animation="wave"></ui-skeleton>
        </div>
    `,
};

export const CardExample: Story = {
    render: () => html`
        <div style="width: 300px; padding: 16px; border: 1px solid #eee; border-radius: 8px; font-family: sans-serif;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <ui-skeleton variant="circular" width="40px" height="40px" animation="wave"></ui-skeleton>
                <div style="flex: 1;">
                    <ui-skeleton variant="text" width="80%" animation="wave"></ui-skeleton>
                    <ui-skeleton variant="text" width="40%" animation="wave"></ui-skeleton>
                </div>
            </div>
            <ui-skeleton variant="rectangular" width="100%" height="150px" animation="wave" style="margin-bottom: 12px;"></ui-skeleton>
            <ui-skeleton variant="text" width="100%" animation="wave"></ui-skeleton>
            <ui-skeleton variant="text" width="100%" animation="wave"></ui-skeleton>
            <ui-skeleton variant="text" width="60%" animation="wave"></ui-skeleton>
        </div>
    `,
};

export const ListSkeleton: Story = {
    render: () => html`
        <div style="width: 360px; font-family: sans-serif; display: flex; flex-direction: column; gap: 16px;">
            ${[0, 1, 2].map(() => html`
                <div style="display: flex; align-items: center; gap: 12px;">
                    <ui-skeleton variant="circular" width="44px" height="44px" animation="wave"></ui-skeleton>
                    <div style="flex: 1;">
                        <ui-skeleton variant="text" width="65%" animation="wave"></ui-skeleton>
                        <ui-skeleton variant="text" width="45%" animation="wave"></ui-skeleton>
                    </div>
                </div>
            `)}
        </div>
    `,
};

export const ArticleSkeleton: Story = {
    render: () => html`
        <div style="width: 480px; font-family: sans-serif;">
            <ui-skeleton variant="rectangular" width="100%" height="200px" animation="wave"></ui-skeleton>
            <ui-skeleton variant="text" width="70%" animation="wave" style="margin-top: 16px; height: 1.4em;"></ui-skeleton>
            <ui-skeleton variant="text" width="100%" animation="wave"></ui-skeleton>
            <ui-skeleton variant="text" width="100%" animation="wave"></ui-skeleton>
            <ui-skeleton variant="text" width="100%" animation="wave"></ui-skeleton>
            <ui-skeleton variant="text" width="85%" animation="wave"></ui-skeleton>
        </div>
    `,
};
