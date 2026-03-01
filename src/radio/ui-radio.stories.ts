import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-radio';

const meta: Meta = {
    title: 'Inputs/Radio Group',
    component: 'ui-radio-group',
    argTypes: {
        name: { control: 'text' },
        value: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => html`
        <ui-radio-group name="gender" value="female" @change=${(e: CustomEvent) => console.log('Selection changed:', e.detail.value)}>
            <ui-radio value="female" label="Female"></ui-radio>
            <ui-radio value="male" label="Male"></ui-radio>
            <ui-radio value="other" label="Other"></ui-radio>
        </ui-radio-group>
    `
};

export const RowDirection: Story = {
    render: () => html`
        <ui-radio-group name="options" value="1" style="--ui-radio-group-direction: row; --ui-radio-group-gap: 24px;">
            <ui-radio value="1" label="Option 1"></ui-radio>
            <ui-radio value="2" label="Option 2"></ui-radio>
            <ui-radio value="3" label="Option 3"></ui-radio>
        </ui-radio-group>
    `
};

export const DisabledOptions: Story = {
    render: () => html`
        <ui-radio-group name="disabled-test" value="active">
            <ui-radio value="active" label="Active Option"></ui-radio>
            <ui-radio value="disabled" label="Disabled Option" disabled></ui-radio>
        </ui-radio-group>
    `
};

export const CustomLabel: Story = {
    render: () => html`
        <ui-radio-group name="plan" value="pro">
            <ui-radio value="basic">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">Basic Plan</span>
                    <span style="font-size: 12px; color: var(--ui-text-color-muted);">Free for individuals</span>
                </div>
            </ui-radio>
            <ui-radio value="pro">
                 <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">Pro Plan</span>
                    <span style="font-size: 12px; color: var(--ui-text-color-muted);">$19/month for teams</span>
                </div>
            </ui-radio>
        </ui-radio-group>
    `
};
