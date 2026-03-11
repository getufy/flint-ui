import type { Meta, StoryObj } from '@storybook/web-components';
import '../button/ui-button';
import { html } from 'lit';
import '../button/ui-button';
import './ui-radio';
import '../button/ui-button';

const meta: Meta = {
    title: 'Inputs/Radio Group',
    component: 'ui-radio-group',
    argTypes: {
        name: { control: 'text' },
        value: { control: 'text' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        orientation: { control: 'select', options: ['vertical', 'horizontal'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
    args: {
        name: 'playground',
        value: 'b',
        label: 'Choose an option',
        disabled: false,
        required: false,
        orientation: 'vertical',
        size: 'md',
    },
    render: (args) => html`
        <ui-radio-group
            .name=${args['name']}
            .value=${args['value']}
            .label=${args['label']}
            ?disabled=${args['disabled']}
            ?required=${args['required']}
            .orientation=${args['orientation']}
            .size=${args['size']}
            @ui-radio-group-change=${(e: CustomEvent) => console.log('Changed:', e.detail.value)}
        >
            <ui-radio value="a" label="Option A"></ui-radio>
            <ui-radio value="b" label="Option B"></ui-radio>
            <ui-radio value="c" label="Option C"></ui-radio>
        </ui-radio-group>
    `,
};

export const Default: Story = {
    render: () => html`
        <ui-radio-group name="gender" value="female" @ui-radio-group-change=${(e: CustomEvent) => console.log('Selection changed:', e.detail.value)}>
            <ui-radio value="female" label="Female"></ui-radio>
            <ui-radio value="male" label="Male"></ui-radio>
            <ui-radio value="other" label="Other"></ui-radio>
        </ui-radio-group>
    `,
};

export const Orientation: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Vertical (default)</p>
                <ui-radio-group name="vert" value="1">
                    <ui-radio value="1" label="Option 1"></ui-radio>
                    <ui-radio value="2" label="Option 2"></ui-radio>
                    <ui-radio value="3" label="Option 3"></ui-radio>
                </ui-radio-group>
            </div>
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Horizontal</p>
                <ui-radio-group name="horiz" value="1" orientation="horizontal">
                    <ui-radio value="1" label="Option 1"></ui-radio>
                    <ui-radio value="2" label="Option 2"></ui-radio>
                    <ui-radio value="3" label="Option 3"></ui-radio>
                </ui-radio-group>
            </div>
        </div>
    `,
};

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Small</p>
                <ui-radio-group name="sm" value="1" size="sm">
                    <ui-radio value="1" label="Option 1"></ui-radio>
                    <ui-radio value="2" label="Option 2"></ui-radio>
                </ui-radio-group>
            </div>
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Medium (default)</p>
                <ui-radio-group name="md" value="1" size="md">
                    <ui-radio value="1" label="Option 1"></ui-radio>
                    <ui-radio value="2" label="Option 2"></ui-radio>
                </ui-radio-group>
            </div>
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Large</p>
                <ui-radio-group name="lg" value="1" size="lg">
                    <ui-radio value="1" label="Option 1"></ui-radio>
                    <ui-radio value="2" label="Option 2"></ui-radio>
                </ui-radio-group>
            </div>
        </div>
    `,
};

export const DisabledOption: Story = {
    render: () => html`
        <ui-radio-group name="disabled-option" value="active">
            <ui-radio value="active" label="Active Option"></ui-radio>
            <ui-radio value="disabled" label="Disabled Option" disabled></ui-radio>
            <ui-radio value="other" label="Another Option"></ui-radio>
        </ui-radio-group>
    `,
};

export const GroupDisabled: Story = {
    render: () => html`
        <ui-radio-group name="group-disabled" value="b" disabled>
            <ui-radio value="a" label="Option A"></ui-radio>
            <ui-radio value="b" label="Option B"></ui-radio>
            <ui-radio value="c" label="Option C"></ui-radio>
        </ui-radio-group>
    `,
};

export const Required: Story = {
    render: () => html`
        <form @submit=${(e: Event) => { e.preventDefault(); alert('Submitted!'); }}>
            <ui-radio-group name="plan" required label="Choose a plan">
                <ui-radio value="free" label="Free"></ui-radio>
                <ui-radio value="pro" label="Pro"></ui-radio>
                <ui-radio value="enterprise" label="Enterprise"></ui-radio>
            </ui-radio-group>
            <ui-button type="submit" style="margin-top: 12px;">Submit</ui-button>
        </form>
    `,
};

export const Uncontrolled: Story = {
    render: () => html`
        <ui-radio-group name="uncontrolled" default-value="b" @ui-radio-group-change=${(e: CustomEvent) => console.log('Changed:', e.detail.value)}>
            <ui-radio value="a" label="Option A"></ui-radio>
            <ui-radio value="b" label="Option B (default)"></ui-radio>
            <ui-radio value="c" label="Option C"></ui-radio>
        </ui-radio-group>
    `,
};

export const Controlled: Story = {
    render: () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<p style="margin: 0 0 8px; font-size: 14px;">Selected: <strong id="display">b</strong></p>`;
        const group = document.createElement('ui-radio-group') as HTMLElement & { value: string };
        group.setAttribute('name', 'controlled');
        group.setAttribute('value', 'b');
        group.innerHTML = `
            <ui-radio value="a" label="Option A"></ui-radio>
            <ui-radio value="b" label="Option B"></ui-radio>
            <ui-radio value="c" label="Option C"></ui-radio>
        `;
        group.addEventListener('ui-radio-group-change', (e: Event) => {
            const ce = e as CustomEvent;
            group.value = ce.detail.value;
            wrapper.querySelector('#display')!.textContent = ce.detail.value;
        });
        wrapper.appendChild(group);
        return wrapper;
    },
};

export const CustomLabel: Story = {
    render: () => html`
        <ui-radio-group name="plan" value="pro">
            <ui-radio value="basic">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">Basic Plan</span>
                    <span style="font-size: 12px; color: var(--ui-text-color-muted, #6b7280);">Free for individuals</span>
                </div>
            </ui-radio>
            <ui-radio value="pro">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">Pro Plan</span>
                    <span style="font-size: 12px; color: var(--ui-text-color-muted, #6b7280);">$19/month for teams</span>
                </div>
            </ui-radio>
        </ui-radio-group>
    `,
};
