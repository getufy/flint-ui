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
        width: { control: 'text' },
        height: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj;

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
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <p>Circular</p>
                <ui-skeleton variant="circular" width="40px" height="40px"></ui-skeleton>
            </div>
            <div>
                <p>Text</p>
                <ui-skeleton variant="text" width="60%"></ui-skeleton>
            </div>
            <div>
                <p>Rectangular</p>
                <ui-skeleton variant="rectangular" width="200px" height="100px"></ui-skeleton>
            </div>
            <div>
                <p>Rounded</p>
                <ui-skeleton variant="rounded" width="200px" height="100px"></ui-skeleton>
            </div>
        </div>
    `,
};

export const Animations: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <p>Pulse (Default)</p>
                <ui-skeleton variant="rectangular" width="300px" height="40px" animation="pulse"></ui-skeleton>
            </div>
            <div>
                <p>Wave</p>
                <ui-skeleton variant="rectangular" width="300px" height="40px" animation="wave"></ui-skeleton>
            </div>
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
