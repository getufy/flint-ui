import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-toggle-button';
import './flint-toggle-button-group';

const meta: Meta = {
    title: 'Inputs/Toggle Button Group',
    component: 'flint-toggle-button-group',
    argTypes: {
        exclusive: { control: 'boolean' },
        value: { control: 'text' },
    },
    args: {
        exclusive: true,
        value: 'left',
    },
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <flint-toggle-button-group 
            .exclusive=${args.exclusive} 
            .value=${args.value}
            @flint-toggle-button-group-change=${(e: Event) => console.log('Selection changed:', (e as CustomEvent).detail.value)}
        >
            <flint-toggle-button value="left">Left</flint-toggle-button>
            <flint-toggle-button value="center">Center</flint-toggle-button>
            <flint-toggle-button value="right">Right</flint-toggle-button>
        </flint-toggle-button-group>
    `
};

export const MultipleSelection: Story = {
    args: {
        exclusive: false,
        value: ['bold', 'italic'],
    },
    render: (args) => html`
        <flint-toggle-button-group 
            .exclusive=${args.exclusive} 
            .value=${args.value}
        >
            <flint-toggle-button value="bold">&lt;b&gt;B&lt;/b&gt;</flint-toggle-button>
            <flint-toggle-button value="italic">&lt;i&gt;I&lt;/i&gt;</flint-toggle-button>
            <flint-toggle-button value="underline">&lt;u&gt;U&lt;/u&gt;</flint-toggle-button>
        </flint-toggle-button-group>
    `
};

export const DeviceAlignment: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <div>
                <h4 style="margin-bottom: 8px;">Exclusive Selection (Alignment)</h4>
                <flint-toggle-button-group value="left">
                    <flint-toggle-button value="left">Left</flint-toggle-button>
                    <flint-toggle-button value="center">Center</flint-toggle-button>
                    <flint-toggle-button value="right">Right</flint-toggle-button>
                    <flint-toggle-button value="justify">Justify</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
            
            <div>
                <h4 style="margin-bottom: 8px;">Multiple Selection (Formatting)</h4>
                <flint-toggle-button-group .exclusive=${false} .value=${['bold']}>
                    <flint-toggle-button value="bold">B</flint-toggle-button>
                    <flint-toggle-button value="italic">I</flint-toggle-button>
                    <flint-toggle-button value="underline">U</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
        </div>
    `
};

export const WithIcons: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <div>
                <h4 style="margin-bottom: 8px;">View Mode</h4>
                <flint-toggle-button-group value="grid">
                    <flint-toggle-button value="list">☰ List</flint-toggle-button>
                    <flint-toggle-button value="grid">⊞ Grid</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
            <div>
                <h4 style="margin-bottom: 8px;">Two Options</h4>
                <flint-toggle-button-group value="2">
                    <flint-toggle-button value="1">Option 1</flint-toggle-button>
                    <flint-toggle-button value="2">Option 2</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
        </div>
    `
};

export const Disabled: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <div>
                <h4 style="margin-bottom: 8px;">Individual buttons disabled</h4>
                <flint-toggle-button-group value="left">
                    <flint-toggle-button value="left">Left</flint-toggle-button>
                    <flint-toggle-button value="center" disabled>Center</flint-toggle-button>
                    <flint-toggle-button value="right" disabled>Right</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
            <div>
                <h4 style="margin-bottom: 8px;">Multiple selection with disabled</h4>
                <flint-toggle-button-group .exclusive=${false} .value=${['bold']}>
                    <flint-toggle-button value="bold">Bold</flint-toggle-button>
                    <flint-toggle-button value="italic" disabled>Italic</flint-toggle-button>
                    <flint-toggle-button value="underline">Underline</flint-toggle-button>
                </flint-toggle-button-group>
            </div>
        </div>
    `
};
