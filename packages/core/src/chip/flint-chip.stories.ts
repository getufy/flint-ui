import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-chip';
import '../button/flint-button';
import '../avatar/flint-avatar';

const meta: Meta = {
    title: 'Data Display/Chip',
    component: 'flint-chip',
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: ['filled', 'outlined'] },
        color: { control: 'select', options: ['default', 'primary', 'secondary'] },
        clickable: { control: 'boolean' },
        deletable: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Chip',
        variant: 'filled',
        color: 'default',
        clickable: false,
        deletable: false,
        disabled: false,
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    args: {
        label: 'Basic Chip',
    },
    render: (args) => html`
        <flint-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
        ></flint-chip>
    `
};

export const Clickable: Story = {
    args: {
        label: 'Clickable Chip',
        clickable: true,
    },
    render: (args) => html`
        <flint-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
            @click=${() => console.log('Chip clicked!')}
        ></flint-chip>
    `
};

export const Deletable: Story = {
    args: {
        label: 'Deletable Chip',
        deletable: true,
    },
    render: (args) => html`
        <flint-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
            @delete=${() => console.log('Delete clicked!')}
        ></flint-chip>
    `
};

export const ClickableAndDeletable: Story = {
    name: 'Clickable + Deletable',
    args: {
        label: 'Technology',
        clickable: true,
        deletable: true,
    },
    render: (args) => html`
        <flint-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
            @click=${() => console.log('Chip clicked!')}
            @delete=${() => console.log('Chip deleted!')}
        ></flint-chip>
    `
};

export const Disabled: Story = {
    args: { disabled: true },
    render: (args) => html`
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <flint-chip .label=${'Default'} .variant=${args.variant} ?disabled=${args.disabled}></flint-chip>
            <flint-chip .label=${'Clickable'} .variant=${args.variant} ?clickable=${true} ?disabled=${args.disabled}></flint-chip>
            <flint-chip .label=${'Deletable'} .variant=${args.variant} ?deletable=${true} ?disabled=${args.disabled}></flint-chip>
            <flint-chip .label=${'Primary'} .variant=${args.variant} .color=${'primary'} ?disabled=${args.disabled}></flint-chip>
            <flint-chip .label=${'Outlined'} variant="outlined" ?disabled=${args.disabled}></flint-chip>
        </div>
    `
};

export const Variants: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <flint-chip label="Default Filled" ?clickable=${args.clickable} ?deletable=${args.deletable} ?disabled=${args.disabled}></flint-chip>
            <flint-chip label="Default Outlined" variant="outlined" ?clickable=${args.clickable} ?deletable=${args.deletable} ?disabled=${args.disabled}></flint-chip>
            <flint-chip label="Primary Filled" color="primary" ?clickable=${args.clickable} ?deletable=${args.deletable} ?disabled=${args.disabled}></flint-chip>
            <flint-chip label="Primary Outlined" color="primary" variant="outlined" ?clickable=${args.clickable} ?deletable=${args.deletable} ?disabled=${args.disabled}></flint-chip>
            <flint-chip label="Secondary Filled" color="secondary" ?clickable=${args.clickable} ?deletable=${args.deletable} ?disabled=${args.disabled}></flint-chip>
            <flint-chip label="Secondary Outlined" color="secondary" variant="outlined" ?clickable=${args.clickable} ?deletable=${args.deletable} ?disabled=${args.disabled}></flint-chip>
        </div>
    `
};

export const WithAvatar: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; align-items: center;">
            <flint-chip label="Jane Doe">
                <flint-avatar slot="avatar" style="--flint-avatar-size: 24px;" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&amp;h=64&amp;fit=crop"></flint-avatar>
            </flint-chip>
            <flint-chip label="Jane Doe" clickable deletable>
                <flint-avatar slot="avatar" style="--flint-avatar-size: 24px;" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&amp;h=64&amp;fit=crop"></flint-avatar>
            </flint-chip>
        </div>
    `
};

export const WithIcon: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <flint-chip label="Developer">
                <span slot="icon">💻</span>
            </flint-chip>
            <flint-chip label="Developer" variant="outlined" deletable>
                <span slot="icon">💻</span>
            </flint-chip>
            <flint-chip label="On Fire" color="primary" clickable>
                <span slot="icon">🔥</span>
            </flint-chip>
        </div>
    `
};

export const FilterExample: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <h4 style="margin: 0;">Selected Filters</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <flint-chip label="Price: $10 - $50" deletable clickable @delete=${() => console.log('removed price filter')}></flint-chip>
                <flint-chip label="Size: Medium" deletable clickable @delete=${() => console.log('removed size filter')}></flint-chip>
                <flint-chip label="Color: Blue" deletable clickable @delete=${() => console.log('removed color filter')}></flint-chip>
                <flint-chip label="In Stock Only" color="primary" clickable></flint-chip>
            </div>
            <div>
                <flint-button variant="outlined" style="border-style: dashed;">+ Add Filter</flint-button>
            </div>
        </div>
    `
};

export const KeyboardNavigation: Story = {
    name: 'Keyboard Navigation',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Tab to focus chips. Press <kbd>Enter</kbd> or <kbd>Space</kbd> to activate. The delete button (✕) is separately focusable via Tab.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <flint-chip label="Click me" clickable color="primary" @click=${() => console.log('clicked')}></flint-chip>
                <flint-chip label="Delete me" deletable @delete=${() => console.log('deleted')}></flint-chip>
                <flint-chip label="Both" clickable deletable color="primary" @click=${() => console.log('clicked')} @delete=${() => console.log('deleted')}></flint-chip>
                <flint-chip label="Disabled" clickable disabled></flint-chip>
            </div>
        </div>
    `
};
