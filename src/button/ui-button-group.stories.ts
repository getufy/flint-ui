import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-button-group';
import './ui-button';

const meta: Meta = {
    title: 'Inputs/Button Group',
    component: 'ui-button-group',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Secondary</h4>
                <ui-button-group>
                    <ui-button variant="secondary" size="medium">One</ui-button>
                    <ui-button variant="secondary" size="medium">Two</ui-button>
                    <ui-button variant="secondary" size="medium">Three</ui-button>
                </ui-button-group>
            </div>
            
            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Primary</h4>
                <ui-button-group>
                    <ui-button variant="primary" size="medium">One</ui-button>
                    <ui-button variant="primary" size="medium">Two</ui-button>
                    <ui-button variant="primary" size="medium">Three</ui-button>
                </ui-button-group>
            </div>

            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Small</h4>
                <ui-button-group>
                    <ui-button variant="secondary" size="small">Left</ui-button>
                    <ui-button variant="secondary" size="small">Center</ui-button>
                    <ui-button variant="secondary" size="small">Right</ui-button>
                </ui-button-group>
            </div>
        </div>
    `
};
