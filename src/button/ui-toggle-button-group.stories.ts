import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-toggle-button';
import './ui-toggle-button-group';

const meta: Meta = {
    title: 'Inputs/Toggle Button Group',
    component: 'ui-toggle-button-group',
    argTypes: {
        exclusive: { control: 'boolean' },
        value: { control: 'text' },
    },
    args: {
        exclusive: true,
        value: 'left',
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <ui-toggle-button-group 
            .exclusive=${args.exclusive} 
            .value=${args.value}
            @change=${(e: Event) => console.log('Selection changed:', (e as CustomEvent).detail.value)}
        >
            <ui-toggle-button value="left">Left</ui-toggle-button>
            <ui-toggle-button value="center">Center</ui-toggle-button>
            <ui-toggle-button value="right">Right</ui-toggle-button>
        </ui-toggle-button-group>
    `
};

export const MultipleSelection: Story = {
    args: {
        exclusive: false,
        value: ['bold', 'italic'],
    },
    render: (args) => html`
        <ui-toggle-button-group 
            .exclusive=${args.exclusive} 
            .value=${args.value}
        >
            <ui-toggle-button value="bold">&lt;b&gt;B&lt;/b&gt;</ui-toggle-button>
            <ui-toggle-button value="italic">&lt;i&gt;I&lt;/i&gt;</ui-toggle-button>
            <ui-toggle-button value="underline">&lt;u&gt;U&lt;/u&gt;</ui-toggle-button>
        </ui-toggle-button-group>
    `
};

export const DeviceAlignment: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--ui-font-family);">
            <div>
                <h4 style="margin-bottom: 8px;">Exclusive Selection (Alignment)</h4>
                <ui-toggle-button-group value="left">
                    <ui-toggle-button value="left">Left</ui-toggle-button>
                    <ui-toggle-button value="center">Center</ui-toggle-button>
                    <ui-toggle-button value="right">Right</ui-toggle-button>
                    <ui-toggle-button value="justify">Justify</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
            
            <div>
                <h4 style="margin-bottom: 8px;">Multiple Selection (Formatting)</h4>
                <ui-toggle-button-group .exclusive=${false} .value=${['bold']}>
                    <ui-toggle-button value="bold">B</ui-toggle-button>
                    <ui-toggle-button value="italic">I</ui-toggle-button>
                    <ui-toggle-button value="underline">U</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
        </div>
    `
};

export const WithIcons: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--ui-font-family);">
            <div>
                <h4 style="margin-bottom: 8px;">View Mode</h4>
                <ui-toggle-button-group value="grid">
                    <ui-toggle-button value="list">☰ List</ui-toggle-button>
                    <ui-toggle-button value="grid">⊞ Grid</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
            <div>
                <h4 style="margin-bottom: 8px;">Two Options</h4>
                <ui-toggle-button-group value="2">
                    <ui-toggle-button value="1">Option 1</ui-toggle-button>
                    <ui-toggle-button value="2">Option 2</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
        </div>
    `
};

export const Disabled: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--ui-font-family);">
            <div>
                <h4 style="margin-bottom: 8px;">Individual buttons disabled</h4>
                <ui-toggle-button-group value="left">
                    <ui-toggle-button value="left">Left</ui-toggle-button>
                    <ui-toggle-button value="center" disabled>Center</ui-toggle-button>
                    <ui-toggle-button value="right" disabled>Right</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
            <div>
                <h4 style="margin-bottom: 8px;">Multiple selection with disabled</h4>
                <ui-toggle-button-group .exclusive=${false} .value=${['bold']}>
                    <ui-toggle-button value="bold">Bold</ui-toggle-button>
                    <ui-toggle-button value="italic" disabled>Italic</ui-toggle-button>
                    <ui-toggle-button value="underline">Underline</ui-toggle-button>
                </ui-toggle-button-group>
            </div>
        </div>
    `
};
