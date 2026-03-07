import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-navigation-menu.js';
import './ui-navigation-menu-list.js';
import './ui-navigation-menu-item.js';
import './ui-navigation-menu-trigger.js';
import './ui-navigation-menu-content.js';
import './ui-navigation-menu-link.js';

type Story = StoryObj;

const meta: Meta = {
    title: 'Navigation/Navigation Menu',
    component: 'ui-navigation-menu',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'A comprehensive navigation menu component with support for nested menus, keyboard navigation, and accessibility features.',
            },
        },
    },
};

export default meta;

export const Basic: Story = {
    render: () => html`
        <ui-navigation-menu>
            <ui-navigation-menu-list>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="docs-content">
                        Documentation
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="docs-content">
                        <div style="padding: 8px 0;">
                            <ui-navigation-menu-link href="/docs">
                                <div>
                                    <div style="font-weight: 600;">Getting Started</div>
                                    <div style="font-size: 12px; color: #666;">
                                        Learn the basics
                                    </div>
                                </div>
                            </ui-navigation-menu-link>
                            <ui-navigation-menu-link href="/docs/api">
                                <div>
                                    <div style="font-weight: 600;">API Reference</div>
                                    <div style="font-size: 12px; color: #666;">
                                        Complete API docs
                                    </div>
                                </div>
                            </ui-navigation-menu-link>
                        </div>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="components-content">
                        Components
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="components-content">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                            <ui-navigation-menu-link href="/components/button">
                                <div>
                                    <div style="font-weight: 600;">Button</div>
                                    <div style="font-size: 12px; color: #666;">Click action</div>
                                </div>
                            </ui-navigation-menu-link>
                            <ui-navigation-menu-link href="/components/input">
                                <div>
                                    <div style="font-weight: 600;">Input</div>
                                    <div style="font-size: 12px; color: #666;">Text input field</div>
                                </div>
                            </ui-navigation-menu-link>
                            <ui-navigation-menu-link href="/components/modal">
                                <div>
                                    <div style="font-weight: 600;">Modal</div>
                                    <div style="font-size: 12px; color: #666;">Dialog box</div>
                                </div>
                            </ui-navigation-menu-link>
                            <ui-navigation-menu-link href="/components/dropdown">
                                <div>
                                    <div style="font-weight: 600;">Dropdown</div>
                                    <div style="font-size: 12px; color: #666;">Select options</div>
                                </div>
                            </ui-navigation-menu-link>
                        </div>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="/blog">Blog</ui-navigation-menu-link>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

export const WithCustomStyling: Story = {
    render: () => html`
        <ui-navigation-menu style="
            --ui-navigation-menu-padding: 12px;
            --ui-navigation-menu-bg: #f8fafc;
            --ui-navigation-menu-border: 1px solid #e2e8f0;
            --ui-navigation-menu-border-radius: 8px;
        ">
            <ui-navigation-menu-list gap="12">
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger
                        content-id="custom-content"
                        style="
                            --ui-navigation-menu-trigger-padding: 10px 16px;
                            --ui-navigation-menu-trigger-font-size: 15px;
                            --ui-navigation-menu-trigger-bg: white;
                            --ui-navigation-menu-trigger-hover-bg: #f1f5f9;
                        "
                    >
                        Menu
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content
                        id="custom-content"
                        style="
                            --ui-navigation-menu-content-bg: white;
                            --ui-navigation-menu-content-border: 1px solid #cbd5e1;
                            --ui-navigation-menu-content-border-radius: 10px;
                            --ui-navigation-menu-content-shadow: 0 10px 25px rgba(0,0,0,0.1);
                            --ui-navigation-menu-content-padding: 20px;
                        "
                    >
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="margin-bottom: 8px;">
                                <ui-navigation-menu-link href="#" style="
                                    --ui-navigation-menu-link-padding: 10px 12px;
                                    --ui-navigation-menu-link-border-radius: 8px;
                                ">
                                    Home
                                </ui-navigation-menu-link>
                            </li>
                            <li style="margin-bottom: 8px;">
                                <ui-navigation-menu-link href="#" style="
                                    --ui-navigation-menu-link-padding: 10px 12px;
                                    --ui-navigation-menu-link-border-radius: 8px;
                                ">
                                    About
                                </ui-navigation-menu-link>
                            </li>
                            <li>
                                <ui-navigation-menu-link href="#" style="
                                    --ui-navigation-menu-link-padding: 10px 12px;
                                    --ui-navigation-menu-link-border-radius: 8px;
                                ">
                                    Contact
                                </ui-navigation-menu-link>
                            </li>
                        </ul>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

export const MultipleMenus: Story = {
    render: () => html`
        <ui-navigation-menu>
            <ui-navigation-menu-list gap="4">
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="menu1">Menu 1</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="menu1">
                        <ui-navigation-menu-link href="#">Option 1.1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Option 1.2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="menu2">Menu 2</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="menu2">
                        <ui-navigation-menu-link href="#">Option 2.1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Option 2.2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="menu3">Menu 3</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="menu3">
                        <ui-navigation-menu-link href="#">Option 3.1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Option 3.2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

export const DisabledItems: Story = {
    render: () => html`
        <ui-navigation-menu>
            <ui-navigation-menu-list>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="enabled-content">
                        Enabled
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="enabled-content">
                        <ui-navigation-menu-link href="#">Item 1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Item 2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger
                        content-id="disabled-content"
                        disabled
                    >
                        Disabled
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="disabled-content">
                        <ui-navigation-menu-link href="#">Item 1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Item 2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">Normal Link</ui-navigation-menu-link>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#" disabled>
                        Disabled Link
                    </ui-navigation-menu-link>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

export const ResponsiveLayout: Story = {
    render: () => html`
        <style>
            @media (max-width: 768px) {
                ui-navigation-menu-list {
                    --ui-navigation-menu-list-direction: column;
                    --ui-navigation-menu-list-gap: 0;
                }
                ui-navigation-menu-item {
                    width: 100%;
                }
                ui-navigation-menu-trigger,
                ui-navigation-menu-link {
                    width: 100%;
                }
            }
        </style>
        <ui-navigation-menu>
            <ui-navigation-menu-list direction="row" gap="0">
                <ui-navigation-menu-item style="flex: 1;">
                    <ui-navigation-menu-trigger
                        content-id="resp-1"
                        style="width: 100%; justify-content: center;"
                    >
                        Section 1
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="resp-1">
                        <ui-navigation-menu-link href="#">Item 1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Item 2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item style="flex: 1;">
                    <ui-navigation-menu-trigger
                        content-id="resp-2"
                        style="width: 100%; justify-content: center;"
                    >
                        Section 2
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="resp-2">
                        <ui-navigation-menu-link href="#">Item 1</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Item 2</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};
