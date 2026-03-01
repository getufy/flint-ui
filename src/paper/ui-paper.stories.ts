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
            description: 'The shadow depth of the paper.',
        },
        variant: {
            control: { type: 'radio' },
            options: ['elevated', 'outlined'],
            description: 'The visual variant of the paper.',
        },
        square: {
            control: 'boolean',
            description: 'If true, the paper corners will be square.',
        },
    },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    args: {
        elevation: 1,
        variant: 'elevated',
        square: false,
    },
    render: (args) => html`
        <div style="padding: 40px; background-color: #f5f5f5; display: flex; justify-content: center;">
            <ui-paper .elevation=${args.elevation} .variant=${args.variant} ?square=${args.square} style="width: 200px; height: 100px; display: flex; align-items: center; justify-content: center;">
                Paper Content
            </ui-paper>
        </div>
    `,
};

export const Elevations: Story = {
    render: () => html`
        <div style="padding: 40px; display: flex; flex-wrap: wrap; gap: 32px; background-color: #f5f5f5;">
            ${[0, 1, 3, 6, 12, 24].map(e => html`
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <ui-paper .elevation=${e} style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
                        e=${e}
                    </ui-paper>
                </div>
            `)}
        </div>
    `,
};

export const Outlined: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #fff; display: flex; gap: 24px;">
            <ui-paper variant="outlined" style="width: 150px; height: 100px; display: flex; align-items: center; justify-content: center;">
                Outlined Paper
            </ui-paper>
            <ui-paper variant="outlined" square style="width: 150px; height: 100px; display: flex; align-items: center; justify-content: center;">
                Square Corner
            </ui-paper>
        </div>
    `,
};

export const PaperWithPadding: Story = {
    render: () => html`
        <div style="padding: 40px; background-color: #f0f0f0;">
            <ui-paper elevation="3" style="--ui-paper-padding: 24px; max-width: 400px; line-height: 1.6;">
                <h3 style="margin-top: 0;">Physical Surfaces</h3>
                <p>The Paper component mimics physical surfaces. Higher elevation implies that the paper is closer to the viewer and casts a Larger shadow.</p>
                <p style="margin-bottom: 0;">This behavior follows the principles of Material Design and real-world lighting.</p>
            </ui-paper>
        </div>
    `,
};
