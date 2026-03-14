import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './flint-navigation-menu.js';
import './flint-navigation-menu-list.js';
import './flint-navigation-menu-item.js';
import './flint-navigation-menu-trigger.js';
import './flint-navigation-menu-content.js';
import './flint-navigation-menu-link.js';
import '../paper/flint-paper';

type Story = StoryObj;

const meta: Meta = {
    title: 'Navigation/Navigation Menu',
    component: 'flint-navigation-menu',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-navigation-menu-content>\`

- **Tag**: \`<flint-navigation-menu-content>\`
- **Class**: \`FlintNavigationMenuContent\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`id\` | \`id\` | \`string\` | \`''\` | Unique identifier for this content panel |
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the content is open/visible |
| \`dir\` | \`dir\` | \`'ltr' \\| 'rtl'\` | \`'ltr'\` | The direction (ltr or rtl) |
| \`gap\` | \`gap\` | \`number\` | \`12\` | Gap between items in the content |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-navigation-menu-content-toggle\` | \`{ contentId: this.id, open: false }\` |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-navigation-menu-item>\`

- **Tag**: \`<flint-navigation-menu-item>\`
- **Class**: \`FlintNavigationMenuItem\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`itemId\` | \`item-id\` | \`string\` | \`''\` | Unique identifier for this menu item |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether this item is disabled |
| \`openDelay\` | \`open-delay\` | \`number\` | \`100\` | Delay in ms before opening on hover |
| \`closeDelay\` | \`close-delay\` | \`number\` | \`150\` | Delay in ms before closing after mouse leaves |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-navigation-menu-trigger-click\` | \`{ contentId, open: true }\` |  |
| \`flint-navigation-menu-content-toggle\` | \`{ contentId, open: false }\` |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
| \`default\` | Item content (NavigationMenuTrigger and NavigationMenuContent) |

---

#### \`<flint-navigation-menu-link>\`

- **Tag**: \`<flint-navigation-menu-link>\`
- **Class**: \`FlintNavigationMenuLink\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`href\` | \`href\` | \`string\` | \`''\` | The link URL |
| \`target\` | \`target\` | \`string\` | \`''\` | The link target (e.g., '_blank') |
| \`title\` | \`title\` | \`string\` | \`''\` | Link title/tooltip |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the link is disabled |
| \`active\` | \`active\` | \`boolean\` | \`false\` | Whether this link represents the current page. Sets aria-current="page" and applies active styles. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### Methods

| Method | Description |
|---|---|
| \`focus(options?: FocusOptions)\` | Delegate focus to the inner anchor element |

---

#### \`<flint-navigation-menu-list>\`

- **Tag**: \`<flint-navigation-menu-list>\`
- **Class**: \`FlintNavigationMenuList\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`gap\` | \`gap\` | \`number\` | \`4\` | Gap between menu items |
| \`direction\` | \`direction\` | \`'row' \\| 'column'\` | \`'row'\` | Flex direction for the list |
| \`ariaLabel\` | \`aria-label\` | \`string\` | \`'Main navigation'\` | Accessible label for the navigation landmark. Required when multiple nav elements are on the same page. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
| \`default\` | Menu items (NavigationMenuItem elements) |

---

#### \`<flint-navigation-menu-trigger>\`

- **Tag**: \`<flint-navigation-menu-trigger>\`
- **Class**: \`FlintNavigationMenuTrigger\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`contentId\` | \`content-id\` | \`string\` | \`''\` | The ID of the associated content element |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the trigger is disabled |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-navigation-menu-trigger-click\` | — | Fired when trigger is clicked |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
| \`default\` | Trigger label/content |

---

#### \`<flint-navigation-menu>\`

- **Tag**: \`<flint-navigation-menu>\`
- **Class**: \`FlintNavigationMenu\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`dir\` | \`dir\` | \`'ltr' \\| 'rtl'\` | \`'ltr'\` | The direction of the menu (ltr or rtl) |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
| \`default\` | The menu content (NavigationMenuList) |

#### Methods

| Method | Description |
|---|---|
| \`openContentId(): unknown\` | Get the currently open content item ID |
| \`openContent(contentId: string)\` | Manually open a content item by ID. No-ops silently if the ID doesn't match any content element. |
| \`closeAll()\` | Close all open content |
                `,
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
        <flint-navigation-menu dir=${dir}>
            <flint-navigation-menu-list aria-label=${ariaLabel}>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="pg-docs">Documentation</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="pg-docs">
                        <flint-navigation-menu-link href="#">Getting Started</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">API Reference</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Examples</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="pg-components">Components</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="pg-components">
                        <flint-navigation-menu-link href="#">Button</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Input</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Modal</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#" active>Blog</flint-navigation-menu-link>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
    `,
};

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Basic: Story = {
    render: () => html`
        <flint-navigation-menu>
            <flint-navigation-menu-list>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="docs-content">
                        Documentation
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="docs-content">
                        <div style="padding: 8px 0;">
                            <flint-navigation-menu-link href="/docs">
                                <div>
                                    <div style="font-weight: 600;">Getting Started</div>
                                    <div style="font-size: 12px; color: #666;">
                                        Learn the basics
                                    </div>
                                </div>
                            </flint-navigation-menu-link>
                            <flint-navigation-menu-link href="/docs/api">
                                <div>
                                    <div style="font-weight: 600;">API Reference</div>
                                    <div style="font-size: 12px; color: #666;">
                                        Complete API docs
                                    </div>
                                </div>
                            </flint-navigation-menu-link>
                        </div>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="components-content">
                        Components
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="components-content">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                            <flint-navigation-menu-link href="/components/button">
                                <div>
                                    <div style="font-weight: 600;">Button</div>
                                    <div style="font-size: 12px; color: #666;">Click action</div>
                                </div>
                            </flint-navigation-menu-link>
                            <flint-navigation-menu-link href="/components/input">
                                <div>
                                    <div style="font-weight: 600;">Input</div>
                                    <div style="font-size: 12px; color: #666;">Text input field</div>
                                </div>
                            </flint-navigation-menu-link>
                            <flint-navigation-menu-link href="/components/modal">
                                <div>
                                    <div style="font-weight: 600;">Modal</div>
                                    <div style="font-size: 12px; color: #666;">Dialog box</div>
                                </div>
                            </flint-navigation-menu-link>
                            <flint-navigation-menu-link href="/components/dropdown">
                                <div>
                                    <div style="font-weight: 600;">Dropdown</div>
                                    <div style="font-size: 12px; color: #666;">Select options</div>
                                </div>
                            </flint-navigation-menu-link>
                        </div>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="/blog">Blog</flint-navigation-menu-link>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
    `,
};

// ---------------------------------------------------------------------------
// Active / Current State
// ---------------------------------------------------------------------------

export const ActiveCurrentState: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the `active` prop on `flint-navigation-menu-link` to mark the current page. Sets `aria-current="page"` and applies distinct active styles.',
            },
        },
    },
    render: () => html`
        <flint-navigation-menu>
            <flint-navigation-menu-list>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">Home</flint-navigation-menu-link>
                </flint-navigation-menu-item>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#" active>Components</flint-navigation-menu-link>
                </flint-navigation-menu-item>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">Blog</flint-navigation-menu-link>
                </flint-navigation-menu-item>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">About</flint-navigation-menu-link>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
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
        <flint-navigation-menu>
            <flint-navigation-menu-list>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="icons-docs">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        Docs
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="icons-docs">
                        <flint-navigation-menu-link href="#">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 8 12 12 14 14"></polyline>
                            </svg>
                            Quick Start
                        </flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px">
                                <polyline points="16 18 22 12 16 6"></polyline>
                                <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                            API Reference
                        </flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Home
                    </flint-navigation-menu-link>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Contact
                    </flint-navigation-menu-link>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
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
            <flint-navigation-menu>
                <flint-navigation-menu-list direction="column" gap="2">
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-link href="#" active>
                            Dashboard
                        </flint-navigation-menu-link>
                    </flint-navigation-menu-item>

                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="v-components"
                            style="justify-content: space-between;">
                            Components
                        </flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="v-components"
                            style="position: static; --flint-navigation-menu-content-shadow: none; --flint-navigation-menu-content-border: none; --flint-navigation-menu-content-border-radius: 0; --flint-navigation-menu-content-padding: 4px 0 4px 12px; --flint-navigation-menu-content-bg: transparent;">
                            <flint-navigation-menu-link href="#">Button</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Input</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Select</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>

                    <flint-navigation-menu-item>
                        <flint-navigation-menu-link href="#">
                            Settings
                        </flint-navigation-menu-link>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
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
        <flint-navigation-menu style="--flint-navigation-menu-bg: #fff; --flint-navigation-menu-border: 1px solid #e5e7eb; --flint-navigation-menu-border-radius: 8px; --flint-navigation-menu-padding: 8px 16px;">
            <flint-navigation-menu-list>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="mega-products">Products</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="mega-products"
                        style="--flint-navigation-menu-content-min-width: 600px; --flint-navigation-menu-content-padding: 24px;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Design</div>
                                <flint-navigation-menu-link href="#">UI Components</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Icon Library</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Figma Plugin</flint-navigation-menu-link>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Develop</div>
                                <flint-navigation-menu-link href="#">Component Library</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Web Components</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">CLI Tools</flint-navigation-menu-link>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Deploy</div>
                                <flint-navigation-menu-link href="#">Hosting</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">CI/CD</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Analytics</flint-navigation-menu-link>
                            </div>
                        </div>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="mega-resources">Resources</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="mega-resources"
                        style="--flint-navigation-menu-content-min-width: 400px; --flint-navigation-menu-content-padding: 24px;">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Learn</div>
                                <flint-navigation-menu-link href="#">Documentation</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Tutorials</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Blog</flint-navigation-menu-link>
                            </div>
                            <div>
                                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Community</div>
                                <flint-navigation-menu-link href="#">GitHub</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Discord</flint-navigation-menu-link>
                                <flint-navigation-menu-link href="#">Forum</flint-navigation-menu-link>
                            </div>
                        </div>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">Pricing</flint-navigation-menu-link>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
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

            <flint-navigation-menu id="prog-menu">
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="prog-c1">Menu 1</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="prog-c1">
                            <flint-navigation-menu-link href="#">Option 1.1</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Option 1.2</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>

                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="prog-c2">Menu 2</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="prog-c2">
                            <flint-navigation-menu-link href="#">Option 2.1</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Option 2.2</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
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
                story: 'Navigation menu with Getting Started and Components dropdowns in a modern design style.',
            },
        },
    },
    render: () => html`
        <flint-paper elevation="0" variant="flat" style="padding: 24px; min-height: 120px;">
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="sc-getting-started">
                            Getting started
                        </flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="sc-getting-started"
                            style="--flint-navigation-menu-content-min-width: 320px;">
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <flint-navigation-menu-link href="/docs"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Introduction</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            Re-usable components built using Lit and CSS.
                                        </div>
                                    </div>
                                </flint-navigation-menu-link>
                                <flint-navigation-menu-link href="/docs/installation"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Installation</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            How to install dependencies and structure your app.
                                        </div>
                                    </div>
                                </flint-navigation-menu-link>
                                <flint-navigation-menu-link href="/docs/typography"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Typography</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            Styles for headings, paragraphs, lists etc.
                                        </div>
                                    </div>
                                </flint-navigation-menu-link>
                            </div>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>

                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="sc-components">
                            Components
                        </flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="sc-components"
                            style="--flint-navigation-menu-content-min-width: 520px; --flint-navigation-menu-content-padding: 16px;">
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
                                <flint-navigation-menu-link href="/docs/alert-dialog"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Alert Dialog</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">A modal dialog that interrupts the user with important content.</div>
                                    </div>
                                </flint-navigation-menu-link>
                                <flint-navigation-menu-link href="/docs/hover-card"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Hover Card</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">For sighted users to preview content available behind a link.</div>
                                    </div>
                                </flint-navigation-menu-link>
                                <flint-navigation-menu-link href="/docs/progress"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Progress</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">Displays an indicator showing the completion progress of a task.</div>
                                    </div>
                                </flint-navigation-menu-link>
                                <flint-navigation-menu-link href="/docs/scroll-area"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Scroll-area</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">Visually or semantically separates content.</div>
                                    </div>
                                </flint-navigation-menu-link>
                                <flint-navigation-menu-link href="/docs/tabs"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Tabs</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">A set of layered sections of content displayed one at a time.</div>
                                    </div>
                                </flint-navigation-menu-link>
                                <flint-navigation-menu-link href="/docs/tooltip"
                                    style="--flint-navigation-menu-link-padding: 10px 12px; height: auto; --flint-navigation-menu-link-border-radius: 6px; align-items: flex-start;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Tooltip</div>
                                        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">A popup that displays information related to an element.</div>
                                    </div>
                                </flint-navigation-menu-link>
                            </div>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>

                    <flint-navigation-menu-item>
                        <flint-navigation-menu-link href="/docs">Docs</flint-navigation-menu-link>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        </flint-paper>
    `,
};


export const WithCustomStyling: Story = {
    render: () => html`
        <flint-navigation-menu style="
            --flint-navigation-menu-padding: 12px;
            --flint-navigation-menu-bg: #f8fafc;
            --flint-navigation-menu-border: 1px solid #e2e8f0;
            --flint-navigation-menu-border-radius: 8px;
        ">
            <flint-navigation-menu-list gap="12">
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger
                        content-id="custom-content"
                        style="
                            --flint-navigation-menu-trigger-padding: 10px 16px;
                            --flint-navigation-menu-trigger-font-size: 15px;
                            --flint-navigation-menu-trigger-bg: white;
                            --flint-navigation-menu-trigger-hover-bg: #f1f5f9;
                        "
                    >
                        Menu
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content
                        id="custom-content"
                        style="
                            --flint-navigation-menu-content-bg: white;
                            --flint-navigation-menu-content-border: 1px solid #cbd5e1;
                            --flint-navigation-menu-content-border-radius: 10px;
                            --flint-navigation-menu-content-shadow: 0 10px 25px rgba(0,0,0,0.1);
                            --flint-navigation-menu-content-padding: 20px;
                        "
                    >
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="margin-bottom: 8px;">
                                <flint-navigation-menu-link href="#" style="
                                    --flint-navigation-menu-link-padding: 10px 12px;
                                    --flint-navigation-menu-link-border-radius: 8px;
                                ">
                                    Home
                                </flint-navigation-menu-link>
                            </li>
                            <li style="margin-bottom: 8px;">
                                <flint-navigation-menu-link href="#" style="
                                    --flint-navigation-menu-link-padding: 10px 12px;
                                    --flint-navigation-menu-link-border-radius: 8px;
                                ">
                                    About
                                </flint-navigation-menu-link>
                            </li>
                            <li>
                                <flint-navigation-menu-link href="#" style="
                                    --flint-navigation-menu-link-padding: 10px 12px;
                                    --flint-navigation-menu-link-border-radius: 8px;
                                ">
                                    Contact
                                </flint-navigation-menu-link>
                            </li>
                        </ul>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
    `,
};

export const MultipleMenus: Story = {
    render: () => html`
        <flint-navigation-menu>
            <flint-navigation-menu-list gap="4">
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="menu1">Menu 1</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="menu1">
                        <flint-navigation-menu-link href="#">Option 1.1</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Option 1.2</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="menu2">Menu 2</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="menu2">
                        <flint-navigation-menu-link href="#">Option 2.1</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Option 2.2</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="menu3">Menu 3</flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="menu3">
                        <flint-navigation-menu-link href="#">Option 3.1</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Option 3.2</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
    `,
};

export const DisabledItems: Story = {
    render: () => html`
        <flint-navigation-menu>
            <flint-navigation-menu-list>
                <flint-navigation-menu-item>
                    <flint-navigation-menu-trigger content-id="enabled-content">
                        Enabled
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="enabled-content">
                        <flint-navigation-menu-link href="#">Item 1</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Item 2</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item disabled>
                    <flint-navigation-menu-trigger content-id="disabled-content">
                        Disabled (Item)
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="disabled-content">
                        <flint-navigation-menu-link href="#">Item 1</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#">Normal Link</flint-navigation-menu-link>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item>
                    <flint-navigation-menu-link href="#" disabled>
                        Disabled Link
                    </flint-navigation-menu-link>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
    `,
};

// ---------------------------------------------------------------------------
// RTL
// ---------------------------------------------------------------------------

export const RTL: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Set `dir="rtl"` on the root to flip dropdown positioning to the right side via logical CSS properties.',
            },
        },
    },
    render: () => html`
        <div dir="rtl" style="padding: 24px; min-height: 120px;">
            <flint-navigation-menu dir="rtl">
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="rtl-docs">توثيق</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="rtl-docs">
                            <flint-navigation-menu-link href="#">البدء السريع</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">مرجع API</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">أمثلة</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-link href="#" active>الرئيسية</flint-navigation-menu-link>
                    </flint-navigation-menu-item>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-link href="#">تواصل معنا</flint-navigation-menu-link>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        </div>
    `,
};

// ---------------------------------------------------------------------------
// AccessibilityShowcase
// ---------------------------------------------------------------------------

export const AccessibilityShowcase: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates full keyboard navigation: Tab to reach the trigger, Enter/Space to open, ArrowDown to move into the menu, ArrowUp/Down to navigate items, Home/End for first/last, Escape to close and return focus to trigger.',
            },
        },
    },
    render: () => html`
        <div style="padding: 24px; min-height: 200px;">
            <p style="font-size: 13px; color: #6b7280; margin-bottom: 16px;">
                Tab → trigger → Enter/Space to open → ArrowDown into menu → ArrowUp/Down to navigate →
                Home/End for first/last → Escape to close
            </p>
            <flint-navigation-menu>
                <flint-navigation-menu-list>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="a11y-1">File</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="a11y-1">
                            <flint-navigation-menu-link href="#">New</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Open</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Save</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#" disabled>Export (disabled)</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Close</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-trigger content-id="a11y-2">Edit</flint-navigation-menu-trigger>
                        <flint-navigation-menu-content id="a11y-2">
                            <flint-navigation-menu-link href="#">Undo</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Redo</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Cut</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Copy</flint-navigation-menu-link>
                            <flint-navigation-menu-link href="#">Paste</flint-navigation-menu-link>
                        </flint-navigation-menu-content>
                    </flint-navigation-menu-item>
                    <flint-navigation-menu-item>
                        <flint-navigation-menu-link href="#" active>Home</flint-navigation-menu-link>
                    </flint-navigation-menu-item>
                </flint-navigation-menu-list>
            </flint-navigation-menu>
        </div>
    `,
};

// ---------------------------------------------------------------------------

export const ResponsiveLayout: Story = {
    render: () => html`
        <style>
            @media (max-width: 768px) {
                flint-navigation-menu-list {
                    --flint-navigation-menu-list-direction: column;
                    --flint-navigation-menu-list-gap: 0;
                }
                flint-navigation-menu-item {
                    width: 100%;
                }
                flint-navigation-menu-trigger,
                flint-navigation-menu-link {
                    width: 100%;
                }
            }
        </style>
        <flint-navigation-menu>
            <flint-navigation-menu-list direction="row" gap="0">
                <flint-navigation-menu-item style="flex: 1;">
                    <flint-navigation-menu-trigger
                        content-id="resp-1"
                        style="width: 100%; justify-content: center;"
                    >
                        Section 1
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="resp-1">
                        <flint-navigation-menu-link href="#">Item 1</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Item 2</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>

                <flint-navigation-menu-item style="flex: 1;">
                    <flint-navigation-menu-trigger
                        content-id="resp-2"
                        style="width: 100%; justify-content: center;"
                    >
                        Section 2
                    </flint-navigation-menu-trigger>
                    <flint-navigation-menu-content id="resp-2">
                        <flint-navigation-menu-link href="#">Item 1</flint-navigation-menu-link>
                        <flint-navigation-menu-link href="#">Item 2</flint-navigation-menu-link>
                    </flint-navigation-menu-content>
                </flint-navigation-menu-item>
            </flint-navigation-menu-list>
        </flint-navigation-menu>
    `,
};
