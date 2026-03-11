import type { Meta, StoryObj } from '@storybook/web-components';
import '../button/ui-button';
import { html } from 'lit';
import '../button/ui-button';
import './ui-chip';
import '../button/ui-button';
import '../avatar/ui-avatar';
import '../button/ui-button';

const meta: Meta = {
    title: 'Data Display/Chip',
    component: 'ui-chip',
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
        <ui-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
        ></ui-chip>
    `
};

export const Clickable: Story = {
    args: {
        label: 'Clickable Chip',
        clickable: true,
    },
    render: (args) => html`
        <ui-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
            @click=${() => console.log('Chip clicked!')}
        ></ui-chip>
    `
};

export const Deletable: Story = {
    args: {
        label: 'Deletable Chip',
        deletable: true,
    },
    render: (args) => html`
        <ui-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
            @delete=${() => console.log('Delete clicked!')}
        ></ui-chip>
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
        <ui-chip
            .label=${args.label}
            .variant=${args.variant}
            .color=${args.color}
            ?clickable=${args.clickable}
            ?deletable=${args.deletable}
            ?disabled=${args.disabled}
            @click=${() => console.log('Chip clicked!')}
            @delete=${() => console.log('Chip deleted!')}
        ></ui-chip>
    `
};

export const Disabled: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-chip label="Default" disabled></ui-chip>
            <ui-chip label="Clickable" clickable disabled></ui-chip>
            <ui-chip label="Deletable" deletable disabled></ui-chip>
            <ui-chip label="Primary" color="primary" disabled></ui-chip>
            <ui-chip label="Outlined" variant="outlined" disabled></ui-chip>
        </div>
    `
};

export const Variants: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ui-chip label="Default Filled"></ui-chip>
            <ui-chip label="Default Outlined" variant="outlined"></ui-chip>
            <ui-chip label="Primary Filled" color="primary"></ui-chip>
            <ui-chip label="Primary Outlined" color="primary" variant="outlined"></ui-chip>
            <ui-chip label="Secondary Filled" color="secondary"></ui-chip>
            <ui-chip label="Secondary Outlined" color="secondary" variant="outlined"></ui-chip>
        </div>
    `
};

export const WithAvatar: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; align-items: center;">
            <ui-chip label="Jane Doe">
                <ui-avatar slot="avatar" style="--ui-avatar-size: 24px;" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&amp;h=64&amp;fit=crop"></ui-avatar>
            </ui-chip>
            <ui-chip label="Jane Doe" clickable deletable>
                <ui-avatar slot="avatar" style="--ui-avatar-size: 24px;" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&amp;h=64&amp;fit=crop"></ui-avatar>
            </ui-chip>
        </div>
    `
};

export const WithIcon: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <ui-chip label="Developer">
                <span slot="icon">💻</span>
            </ui-chip>
            <ui-chip label="Developer" variant="outlined" deletable>
                <span slot="icon">💻</span>
            </ui-chip>
            <ui-chip label="On Fire" color="primary" clickable>
                <span slot="icon">🔥</span>
            </ui-chip>
        </div>
    `
};

export const FilterExample: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--ui-font-family);">
            <h4 style="margin: 0;">Selected Filters</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <ui-chip label="Price: $10 - $50" deletable clickable @delete=${() => console.log('removed price filter')}></ui-chip>
                <ui-chip label="Size: Medium" deletable clickable @delete=${() => console.log('removed size filter')}></ui-chip>
                <ui-chip label="Color: Blue" deletable clickable @delete=${() => console.log('removed color filter')}></ui-chip>
                <ui-chip label="In Stock Only" color="primary" clickable></ui-chip>
            </div>
            <div>
                <ui-button variant="outlined" style="border-style: dashed;">+ Add Filter</ui-button>
            </div>
        </div>
    `
};

export const KeyboardNavigation: Story = {
    name: 'Keyboard Navigation',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--ui-font-family);">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Tab to focus chips. Press <kbd>Enter</kbd> or <kbd>Space</kbd> to activate. The delete button (✕) is separately focusable via Tab.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <ui-chip label="Click me" clickable color="primary" @click=${() => console.log('clicked')}></ui-chip>
                <ui-chip label="Delete me" deletable @delete=${() => console.log('deleted')}></ui-chip>
                <ui-chip label="Both" clickable deletable color="primary" @click=${() => console.log('clicked')} @delete=${() => console.log('deleted')}></ui-chip>
                <ui-chip label="Disabled" clickable disabled></ui-chip>
            </div>
        </div>
    `
};
