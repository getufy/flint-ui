import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-chip';
import '../button/flint-button';
import '../avatar/flint-avatar';

const meta: Meta = {
    title: 'Data Display/Chip',
    component: 'flint-chip',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'nested-interactive', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
- **Tag**: \`<flint-chip>\`
- **Class**: \`FlintChip\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` | Text content displayed inside the chip. |
| \`variant\` | \`variant\` | \`'filled' \\| 'outlined'\` | \`'filled'\` | Visual style variant of the chip. |
| \`color\` | \`color\` | \`'default' \\| 'primary' \\| 'secondary'\` | \`'default'\` | Color theme applied to the chip. |
| \`size\` | \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Size of the chip. |
| \`clickable\` | \`clickable\` | \`boolean\` | \`false\` | Whether the chip responds to click interactions. |
| \`deletable\` | \`deletable\` | \`boolean\` | \`false\` | Whether the chip shows a delete icon. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the chip and prevents interaction. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`click\` | — |  |
| \`flint-chip-delete\` | — |  |

#### Slots

| Name | Description |
|---|---|
| \`avatar\` |  |
| \`icon\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-chip-height\` | \`32px\` |
| \`--flint-chip-padding-x\` | \`12px\` |
| \`--flint-chip-border-radius\` | \`16px\` |
| \`--flint-chip-font-size\` | \`0.875rem\` |
| \`--flint-chip-gap\` | \`8px\` |
| \`--flint-chip-height-sm\` | \`24px\` |
| \`--flint-chip-padding-x-sm\` | \`8px\` |
| \`--flint-chip-font-size-sm\` | \`0.75rem\` |
| \`--flint-chip-border-radius-sm\` | \`12px\` |
| \`--flint-chip-height-lg\` | \`40px\` |
| \`--flint-chip-padding-x-lg\` | \`16px\` |
| \`--flint-chip-font-size-lg\` | \`1rem\` |
| \`--flint-chip-border-radius-lg\` | \`20px\` |
| \`--flint-font-family\` | — |
| \`--flint-surface-2\` | — |
| \`--flint-text-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-active-color\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-secondary-color\` | — |
| \`--flint-shadow-sm\` | — |
| \`--flint-avatar-size\` | \`24px\` |
                `,
            },
        },
    },
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
            @flint-chip-delete=${() => console.log('Delete clicked!')}
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
            @flint-chip-delete=${() => console.log('Chip deleted!')}
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
                <flint-chip label="Price: $10 - $50" deletable clickable @flint-chip-delete=${() => console.log('removed price filter')}></flint-chip>
                <flint-chip label="Size: Medium" deletable clickable @flint-chip-delete=${() => console.log('removed size filter')}></flint-chip>
                <flint-chip label="Color: Blue" deletable clickable @flint-chip-delete=${() => console.log('removed color filter')}></flint-chip>
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
            <p style="margin: 0; font-size: 14px; color: #4b5563;">
                Tab to focus chips. Press <kbd>Enter</kbd> or <kbd>Space</kbd> to activate. The delete button (✕) is separately focusable via Tab.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <flint-chip label="Click me" clickable color="primary" @click=${() => console.log('clicked')}></flint-chip>
                <flint-chip label="Delete me" deletable @flint-chip-delete=${() => console.log('deleted')}></flint-chip>
                <flint-chip label="Both" clickable deletable color="primary" @click=${() => console.log('clicked')} @flint-chip-delete=${() => console.log('deleted')}></flint-chip>
                <flint-chip label="Disabled" clickable disabled></flint-chip>
            </div>
        </div>
    `
};
