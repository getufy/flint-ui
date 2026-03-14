import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-breadcrumbs';

const meta: Meta = {
    title: 'Navigation/Breadcrumbs',
    component: 'flint-breadcrumbs',
    parameters: {
        docs: {
            description: {
                component: `
Breadcrumbs provide a navigational aid showing the current page's location within a site hierarchy, allowing users to navigate back up the trail.

- **Tag**: \`<flint-breadcrumbs>\`
- **Class**: \`FlintBreadcrumbs\`

#### Properties

| Property | Attribute | Type | Default |
|---|---|---|---|
| \`maxItems\` | \`max-items\` | \`number\` | \`8\` |
| \`itemsBefore\` | \`items-before\` | \`number\` | \`1\` |
| \`itemsAfter\` | \`items-after\` | \`number\` | \`1\` |
| \`separator\` | \`separator\` | \`string\` | \`'/'\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Breadcrumb items (links or text), distributed in order. |
| \`separator\` | Custom separator element rendered between each item. |
| \`breadcrumb-item-\${index}\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-breadcrumb-separator-margin\` | \`8px\` |
| \`--flint-breadcrumb-color\` | \`var(--flint-text-color-muted\` |
| \`--flint-font-family\` | — |
| \`--flint-breadcrumb-font-size\` | \`0.875rem\` |
| \`--flint-breadcrumb-color-active\` | \`var(--flint-text-color\` |
| \`--flint-breadcrumb-collapsed-bg\` | \`var(--flint-hover-color\` |
| \`--flint-breadcrumb-collapsed-radius\` | \`var(--flint-border-radius-md\` |
| \`--flint-breadcrumb-collapsed-hover-bg\` | \`var(--flint-active-color\` |
| \`--flint-primary-color\` | — |
                `,
            },
        },
    },
    argTypes: {
        separator: { control: 'text' },
        maxItems: { control: 'number' },
        itemsBefore: { control: 'number' },
        itemsAfter: { control: 'number' },
        label1: { control: 'text', name: 'Item 1' },
        label2: { control: 'text', name: 'Item 2' },
        label3: { control: 'text', name: 'Item 3' },
        label4: { control: 'text', name: 'Item 4' },
        label5: { control: 'text', name: 'Item 5' },
    },
    args: {
        separator: '/',
        maxItems: 8,
        itemsBefore: 1,
        itemsAfter: 1,
        label1: 'Home',
        label2: 'Catalog',
        label3: 'Accessories',
        label4: 'New Collection',
        label5: 'Belts',
    },
};

export default meta;

type Story = StoryObj;

const icons = {
    home: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    user: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    folder: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
};

export const Basic: Story = {
    render: (args) => html`
        <flint-breadcrumbs .separator=${args.separator}>
            <a href="#">${args.label1}</a>
            <a href="#">${args.label2}</a>
            <span class="active">${args.label3}</span>
        </flint-breadcrumbs>
    `,
};

export const ActiveLast: Story = {
    args: { label1: 'Platform', label2: 'Components', label3: 'Navigation' },
    render: (args) => html`
        <flint-breadcrumbs .separator=${args.separator}>
            <a href="#">${args.label1}</a>
            <a href="#">${args.label2}</a>
            <span aria-current="page">${args.label3}</span>
        </flint-breadcrumbs>
    `,
};

export const CustomSeparator: Story = {
    args: { separator: '>' },
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <p style="font-size: 0.8rem; color: #666;">Using 'separator' property:</p>
            <flint-breadcrumbs .separator=${args.separator}>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span class="active">Accessories</span>
            </flint-breadcrumbs>

            <p style="font-size: 0.8rem; color: #666;">Using 'separator' slot for icons (cloned into each position):</p>
            <flint-breadcrumbs>
                <span slot="separator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span class="active">Accessories</span>
            </flint-breadcrumbs>
        </div>
    `,
};

export const WithIcons: Story = {
    render: () => html`
        <flint-breadcrumbs>
            <a href="#" style="display: flex; align-items: center;">
                ${icons.home} Home
            </a>
            <a href="#" style="display: flex; align-items: center;">
                ${icons.folder} Projects
            </a>
            <span style="display: flex; align-items: center;" class="active">
                ${icons.user} User Profile
            </span>
        </flint-breadcrumbs>
    `,
};

export const Collapsed: Story = {
    args: { maxItems: 2 },
    render: (args) => html`
        <flint-breadcrumbs
            .maxItems=${args.maxItems}
            .itemsBefore=${args.itemsBefore}
            .itemsAfter=${args.itemsAfter}
        >
            <a href="#">${args.label1}</a>
            <a href="#">${args.label2}</a>
            <a href="#">${args.label3}</a>
            <a href="#">${args.label4}</a>
            <span class="active">${args.label5}</span>
        </flint-breadcrumbs>
    `,
};

export const CondensedWithMenu: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="font-size: 0.8rem; color: #666;">Click the ellipsis to see the full path</p>
            <flint-breadcrumbs max-items="3">
                <a href="#">Root</a>
                <a href="#">Applications</a>
                <a href="#">System</a>
                <a href="#">Library</a>
                <a href="#">CoreServices</a>
                <span class="active">Finder</span>
            </flint-breadcrumbs>
        </div>
    `,
};
