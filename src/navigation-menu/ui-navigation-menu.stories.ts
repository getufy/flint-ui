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

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
    args: {
        dir: 'ltr',
        ariaLabel: 'Main navigation',
    },
    argTypes: {
        dir: { control: 'select', options: ['ltr', 'rtl'] },
        ariaLabel: { control: 'text' },
    },
    render: ({ dir, ariaLabel }) => html`
        <ui-navigation-menu dir=${dir}>
            <ui-navigation-menu-list aria-label=${ariaLabel}>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="pg-docs">Documentation</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="pg-docs">
                        <ui-navigation-menu-link href="#">Getting Started</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">API Reference</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Examples</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="pg-components">Components</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="pg-components">
                        <ui-navigation-menu-link href="#">Button</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Input</ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">Modal</ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#" active>Blog</ui-navigation-menu-link>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Active / Current State
// ---------------------------------------------------------------------------

export const ActiveCurrentState: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `active` prop on `ui-navigation-menu-link` to mark the current page. Sets `aria-current="page"` and applies distinct active styles.',
            },
        },
    },
    render: () => html`
        <ui-navigation-menu>
            <ui-navigation-menu-list>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">Home</ui-navigation-menu-link>
                </ui-navigation-menu-item>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#" active>Components</ui-navigation-menu-link>
                </ui-navigation-menu-item>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">Blog</ui-navigation-menu-link>
                </ui-navigation-menu-item>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">About</ui-navigation-menu-link>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

// ---------------------------------------------------------------------------
// With Icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Slot any content (including SVG icons) inside triggers and links.',
            },
        },
    },
    render: () => html`
        <ui-navigation-menu>
            <ui-navigation-menu-list>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="icons-docs">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        Docs
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="icons-docs">
                        <ui-navigation-menu-link href="#">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 8 12 12 14 14"></polyline>
                            </svg>
                            Quick Start
                        </ui-navigation-menu-link>
                        <ui-navigation-menu-link href="#">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px">
                                <polyline points="16 18 22 12 16 6"></polyline>
                                <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                            API Reference
                        </ui-navigation-menu-link>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Home
                    </ui-navigation-menu-link>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Contact
                    </ui-navigation-menu-link>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

// ---------------------------------------------------------------------------
// Vertical Sidebar
// ---------------------------------------------------------------------------

export const VerticalSidebar: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set `direction="column"` on the list for sidebar or mobile navigation. Content panels expand inline.',
            },
        },
    },
    render: () => html`
        <div style="width: 240px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px;">
            <ui-navigation-menu style="--ui-navigation-menu-bg: transparent">
                <ui-navigation-menu-list direction="column" gap="2" style="width: 100%">
                    <ui-navigation-menu-item style="width: 100%">
                        <ui-navigation-menu-link href="#" active
                            style="width: 100%; --ui-navigation-menu-link-border-radius: 6px;">
                            Dashboard
                        </ui-navigation-menu-link>
                    </ui-navigation-menu-item>

                    <ui-navigation-menu-item style="width: 100%">
                        <ui-navigation-menu-trigger content-id="v-components"
                            style="width: 100%; justify-content: space-between; --ui-navigation-menu-trigger-border-radius: 6px;">
                            Components
                        </ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="v-components"
                            style="position: static; margin-top: 0; --ui-navigation-menu-content-shadow: none; --ui-navigation-menu-content-border: none; --ui-navigation-menu-content-border-radius: 0; --ui-navigation-menu-content-padding: 4px 0 4px 12px; --ui-navigation-menu-content-bg: transparent;">
                            <ui-navigation-menu-link href="#"
                                style="--ui-navigation-menu-link-border-radius: 6px;">Button</ui-navigation-menu-link>
                            <ui-navigation-menu-link href="#"
                                style="--ui-navigation-menu-link-border-radius: 6px;">Input</ui-navigation-menu-link>
                            <ui-navigation-menu-link href="#"
                                style="--ui-navigation-menu-link-border-radius: 6px;">Select</ui-navigation-menu-link>
                        </ui-navigation-menu-content>
                    </ui-navigation-menu-item>

                    <ui-navigation-menu-item style="width: 100%">
                        <ui-navigation-menu-link href="#"
                            style="width: 100%; --ui-navigation-menu-link-border-radius: 6px;">
                            Settings
                        </ui-navigation-menu-link>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        </div>
    `,
};

// ---------------------------------------------------------------------------
// Mega Menu
// ---------------------------------------------------------------------------

export const MegaMenu: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Wide content panel with a multi-column grid — great for large sites with many categories.',
            },
        },
    },
    render: () => html`
        <ui-navigation-menu style="--ui-navigation-menu-bg: #fff; --ui-navigation-menu-border: 1px solid #e5e7eb; --ui-navigation-menu-border-radius: 8px; --ui-navigation-menu-padding: 8px 16px;">
            <ui-navigation-menu-list>
                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="mega-products">Products</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="mega-products"
                        style="--ui-navigation-menu-content-min-width: 600px; --ui-navigation-menu-content-padding: 24px;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Design</div>
                                <ui-navigation-menu-link href="#">UI Components</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Icon Library</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Figma Plugin</ui-navigation-menu-link>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Develop</div>
                                <ui-navigation-menu-link href="#">React Library</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Web Components</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">CLI Tools</ui-navigation-menu-link>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Deploy</div>
                                <ui-navigation-menu-link href="#">Hosting</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">CI/CD</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Analytics</ui-navigation-menu-link>
                            </div>
                        </div>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-trigger content-id="mega-resources">Resources</ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="mega-resources"
                        style="--ui-navigation-menu-content-min-width: 400px; --ui-navigation-menu-content-padding: 24px;">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Learn</div>
                                <ui-navigation-menu-link href="#">Documentation</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Tutorials</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Blog</ui-navigation-menu-link>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Community</div>
                                <ui-navigation-menu-link href="#">GitHub</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Discord</ui-navigation-menu-link>
                                <ui-navigation-menu-link href="#">Forum</ui-navigation-menu-link>
                            </div>
                        </div>
                    </ui-navigation-menu-content>
                </ui-navigation-menu-item>

                <ui-navigation-menu-item>
                    <ui-navigation-menu-link href="#">Pricing</ui-navigation-menu-link>
                </ui-navigation-menu-item>
            </ui-navigation-menu-list>
        </ui-navigation-menu>
    `,
};

// ---------------------------------------------------------------------------
// Programmatic Control
// ---------------------------------------------------------------------------

export const ProgrammaticControl: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the public API: `openContent(id)` and `closeAll()`. Useful for programmatic control from external code.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="document.getElementById('prog-menu').openContent('prog-c1')"
                    style="padding: 6px 12px; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-size: 13px;">
                    Open Menu 1
                </button>
                <button onclick="document.getElementById('prog-menu').openContent('prog-c2')"
                    style="padding: 6px 12px; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-size: 13px;">
                    Open Menu 2
                </button>
                <button onclick="document.getElementById('prog-menu').closeAll()"
                    style="padding: 6px 12px; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-size: 13px;">
                    Close All
                </button>
            </div>

            <ui-navigation-menu id="prog-menu">
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="prog-c1">Menu 1</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="prog-c1">
                            <ui-navigation-menu-link href="#">Option 1.1</ui-navigation-menu-link>
                            <ui-navigation-menu-link href="#">Option 1.2</ui-navigation-menu-link>
                        </ui-navigation-menu-content>
                    </ui-navigation-menu-item>

                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="prog-c2">Menu 2</ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="prog-c2">
                            <ui-navigation-menu-link href="#">Option 2.1</ui-navigation-menu-link>
                            <ui-navigation-menu-link href="#">Option 2.2</ui-navigation-menu-link>
                        </ui-navigation-menu-content>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        </div>
    `,
};

// ---------------------------------------------------------------------------
// Existing stories
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// ShadcnStyle — closest to the shadcn/ui NavigationMenu demo
// ---------------------------------------------------------------------------

export const ShadcnStyle: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Replicates the shadcn/ui NavigationMenu demo with Getting Started and Components dropdowns.',
            },
        },
    },
    render: () => html`
        <div style="padding: 24px; background: #fff; min-height: 120px;">
            <ui-navigation-menu>
                <ui-navigation-menu-list>
                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="sc-getting-started">
                            Getting started
                        </ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="sc-getting-started"
                            style="--ui-navigation-menu-content-min-width: 320px;">
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <ui-navigation-menu-link href="/docs"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Introduction</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            Re-usable components built using Lit and CSS.
                                        </div>
                                    </div>
                                </ui-navigation-menu-link>
                                <ui-navigation-menu-link href="/docs/installation"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Installation</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            How to install dependencies and structure your app.
                                        </div>
                                    </div>
                                </ui-navigation-menu-link>
                                <ui-navigation-menu-link href="/docs/typography"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Typography</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            Styles for headings, paragraphs, lists etc.
                                        </div>
                                    </div>
                                </ui-navigation-menu-link>
                            </div>
                        </ui-navigation-menu-content>
                    </ui-navigation-menu-item>

                    <ui-navigation-menu-item>
                        <ui-navigation-menu-trigger content-id="sc-components">
                            Components
                        </ui-navigation-menu-trigger>
                        <ui-navigation-menu-content id="sc-components"
                            style="--ui-navigation-menu-content-min-width: 520px; --ui-navigation-menu-content-padding: 16px;">
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
                                <ui-navigation-menu-link href="/docs/alert-dialog"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Alert Dialog</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">A modal dialog that interrupts the user with important content.</div>
                                    </div>
                                </ui-navigation-menu-link>
                                <ui-navigation-menu-link href="/docs/hover-card"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Hover Card</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">For sighted users to preview content available behind a link.</div>
                                    </div>
                                </ui-navigation-menu-link>
                                <ui-navigation-menu-link href="/docs/progress"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Progress</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">Displays an indicator showing the completion progress of a task.</div>
                                    </div>
                                </ui-navigation-menu-link>
                                <ui-navigation-menu-link href="/docs/scroll-area"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Scroll-area</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">Visually or semantically separates content.</div>
                                    </div>
                                </ui-navigation-menu-link>
                                <ui-navigation-menu-link href="/docs/tabs"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Tabs</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">A set of layered sections of content displayed one at a time.</div>
                                    </div>
                                </ui-navigation-menu-link>
                                <ui-navigation-menu-link href="/docs/tooltip"
                                    style="--ui-navigation-menu-link-padding: 10px 12px; height: auto; --ui-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Tooltip</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">A popup that displays information related to an element.</div>
                                    </div>
                                </ui-navigation-menu-link>
                            </div>
                        </ui-navigation-menu-content>
                    </ui-navigation-menu-item>

                    <ui-navigation-menu-item>
                        <ui-navigation-menu-link href="/docs">Docs</ui-navigation-menu-link>
                    </ui-navigation-menu-item>
                </ui-navigation-menu-list>
            </ui-navigation-menu>
        </div>
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

                <ui-navigation-menu-item disabled>
                    <ui-navigation-menu-trigger content-id="disabled-content">
                        Disabled (Item)
                    </ui-navigation-menu-trigger>
                    <ui-navigation-menu-content id="disabled-content">
                        <ui-navigation-menu-link href="#">Item 1</ui-navigation-menu-link>
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
