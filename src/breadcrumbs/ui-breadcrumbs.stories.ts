import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-breadcrumbs';

const meta: Meta = {
    title: 'Navigation/Breadcrumbs',
    component: 'ui-breadcrumbs',
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
};

export default meta;

type Story = StoryObj;

const icons = {
    home: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    user: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    folder: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
};

export const Basic: Story = {
    args: {
        separator: '/',
        label1: 'Home',
        label2: 'Catalog',
        label3: 'Accessories',
    },
    render: (args) => html`
        <ui-breadcrumbs .separator=${args.separator}>
            <a href="#">${args.label1}</a>
            <a href="#">${args.label2}</a>
            <span class="active">${args.label3}</span>
        </ui-breadcrumbs>
    `,
};

export const ActiveLast: Story = {
    render: () => html`
        <ui-breadcrumbs>
            <a href="#">Platform</a>
            <a href="#">Components</a>
            <span aria-current="page">Navigation</span>
        </ui-breadcrumbs>
    `,
};

export const CustomSeparator: Story = {
    args: {
        separator: '>',
    },
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <p style="font-size: 0.8rem; color: #666;">Using 'separator' property:</p>
            <ui-breadcrumbs .separator=${args.separator}>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span class="active">Accessories</span>
            </ui-breadcrumbs>

            <p style="font-size: 0.8rem; color: #666;">Using 'separator' slot for icons (cloned into each position):</p>
            <ui-breadcrumbs>
                <span slot="separator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
                <a href="#">Home</a>
                <a href="#">Catalog</a>
                <span class="active">Accessories</span>
            </ui-breadcrumbs>
        </div>
    `,
};

export const WithIcons: Story = {
    render: () => html`
        <ui-breadcrumbs>
            <a href="#" style="display: flex; align-items: center;">
                ${icons.home} Home
            </a>
            <a href="#" style="display: flex; align-items: center;">
                ${icons.folder} Projects
            </a>
            <span style="display: flex; align-items: center;" class="active">
                ${icons.user} User Profile
            </span>
        </ui-breadcrumbs>
    `,
};

export const Collapsed: Story = {
    args: {
        maxItems: 2,
        itemsBefore: 1,
        itemsAfter: 1,
        label1: 'Home',
        label2: 'Catalog',
        label3: 'Accessories',
        label4: 'New Collection',
        label5: 'Belts',
    },
    render: (args) => html`
        <ui-breadcrumbs
            .maxItems=${args.maxItems}
            .itemsBefore=${args.itemsBefore}
            .itemsAfter=${args.itemsAfter}
        >
            <a href="#">${args.label1}</a>
            <a href="#">${args.label2}</a>
            <a href="#">${args.label3}</a>
            <a href="#">${args.label4}</a>
            <span class="active">${args.label5}</span>
        </ui-breadcrumbs>
    `,
};

export const CondensedWithMenu: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="font-size: 0.8rem; color: #666;">Click the ellipsis to see the full path</p>
            <ui-breadcrumbs max-items="3">
                <a href="#">Root</a>
                <a href="#">Applications</a>
                <a href="#">System</a>
                <a href="#">Library</a>
                <a href="#">CoreServices</a>
                <span class="active">Finder</span>
            </ui-breadcrumbs>
        </div>
    `,
};
