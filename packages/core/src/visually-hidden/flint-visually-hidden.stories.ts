import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-visually-hidden';

const meta: Meta = {
    title: 'Utilities/Visually Hidden',
    component: 'flint-visually-hidden',
    parameters: {
        docs: {
            description: {
                component: `
Makes content accessible to assistive devices (screen readers) without
displaying it visually on screen.

- **Tag**: \`<flint-visually-hidden>\`
- **Class**: \`FlintVisuallyHidden\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`notFocusable\` | \`not-focusable\` | \`boolean\` | \`false\` | When true, disables the focus-reveal behaviour. Useful for pure SR-only text (e.g. "opens in a new window") that should never become visible, even when a containing element is focused. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | The content to be visually hidden. |
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj;

/* ── Playground ───────────────────────────────────────────────────── */
export const Playground: Story = {
    name: 'Playground',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px; max-width: 480px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                The component below is visually hidden but present in the accessibility tree.
                Open your browser DevTools to inspect the DOM.
            </p>
            <flint-visually-hidden>This text is hidden visually but accessible to screen readers.</flint-visually-hidden>
            <p style="
                font-size: 0.875rem; color: var(--flint-text-color, #111827);
                padding: 12px 16px;
                background: var(--flint-surface-2, #f9fafb);
                border: 1px solid var(--flint-border-color, #e5e7eb);
                border-radius: 8px;
            ">
                Visible content. The visually-hidden element above occupies no visible space.
            </p>
        </div>
    `,
};

/* ── SkipLink ─────────────────────────────────────────────────────── */
export const SkipLink: Story = {
    name: 'Skip to Main Content',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                Press <kbd style="
                    display: inline-block; padding: 2px 6px; font-size: 0.75rem;
                    background: var(--flint-surface-3, #f3f4f6); border: 1px solid var(--flint-border-color, #e5e7eb);
                    border-radius: 4px; font-family: monospace;
                ">Tab</kbd> to reveal the skip link.
            </p>
            <div style="min-height: 2rem; position: relative;">
                <flint-visually-hidden>
                    <a
                        href="#demo-main"
                        style="
                            display: inline-block; padding: 8px 16px;
                            background: var(--flint-primary-color, #2563eb);
                            color: #fff; border-radius: 4px;
                            font-size: 0.875rem; text-decoration: none;
                            outline-offset: 2px;
                        "
                    >
                        Skip to main content
                    </a>
                </flint-visually-hidden>
            </div>
            <main id="demo-main" style="
                margin-top: 12px; padding: 16px;
                background: var(--flint-surface-2, #f9fafb);
                border: 1px solid var(--flint-border-color, #e5e7eb);
                border-radius: 8px; font-size: 0.875rem;
                color: var(--flint-text-color, #111827);
            ">
                Main content area
            </main>
        </div>
    `,
};

/* ── NewWindowLink ────────────────────────────────────────────────── */
export const NewWindowLink: Story = {
    name: 'Links That Open in New Tabs',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px;">
            <p style="margin: 0 0 16px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                Screen readers will announce "opens in a new tab" even though the
                text is invisible to sighted users. The <code>not-focusable</code> attribute
                prevents the text from ever becoming visible.
            </p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="
                        display: inline-flex; align-items: center; gap: 6px;
                        font-size: 0.9375rem; color: var(--flint-primary-color, #2563eb);
                        text-decoration: underline;
                    "
                >
                    Annual Report (PDF)
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <flint-visually-hidden not-focusable>opens in a new tab</flint-visually-hidden>
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="
                        display: inline-flex; align-items: center; gap: 6px;
                        font-size: 0.9375rem; color: var(--flint-primary-color, #2563eb);
                        text-decoration: underline;
                    "
                >
                    Privacy Policy
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <flint-visually-hidden not-focusable>opens in a new tab</flint-visually-hidden>
                </a>
            </div>
        </div>
    `,
};

/* ── FormLabels ───────────────────────────────────────────────────── */
export const FormLabels: Story = {
    name: 'Content Conveyed By Context',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px; max-width: 360px;">
            <p style="margin: 0 0 16px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                Labels are hidden from sighted users but announced by screen readers
                to provide context for each field.
            </p>
            <fieldset style="
                border: 1px solid var(--flint-border-color, #e5e7eb);
                border-radius: 8px; padding: 20px; margin: 0;
            ">
                <legend style="
                    padding: 0 8px; font-size: 0.9375rem; font-weight: 600;
                    color: var(--flint-text-color, #111827);
                ">
                    Personal Info
                </legend>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 4px;">
                    <div>
                        <label style="display: block; margin-bottom: 4px;">
                            <flint-visually-hidden>Name</flint-visually-hidden>
                            <input
                                type="text"
                                placeholder="Name"
                                style="
                                    width: 100%; box-sizing: border-box; padding: 8px 12px;
                                    border: 1px solid var(--flint-input-border-color, #d1d5db);
                                    border-radius: 6px; font-size: 0.875rem;
                                    color: var(--flint-text-color, #111827);
                                    background: var(--flint-input-bg, #fff);
                                    outline: none;
                                "
                            />
                        </label>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 4px;">
                            <flint-visually-hidden>Email</flint-visually-hidden>
                            <input
                                type="email"
                                placeholder="Email"
                                style="
                                    width: 100%; box-sizing: border-box; padding: 8px 12px;
                                    border: 1px solid var(--flint-input-border-color, #d1d5db);
                                    border-radius: 6px; font-size: 0.875rem;
                                    color: var(--flint-text-color, #111827);
                                    background: var(--flint-input-bg, #fff);
                                    outline: none;
                                "
                            />
                        </label>
                    </div>
                </div>
            </fieldset>
        </div>
    `,
};

/* ── IconButton ───────────────────────────────────────────────────── */
export const IconButton: Story = {
    name: 'Icon-Only Buttons',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px;">
            <p style="margin: 0 0 16px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                Each icon button has a visually hidden label. Screen readers announce
                the action; sighted users see only the icon.
            </p>
            <div style="display: flex; gap: 8px;">
                <!-- Delete -->
                <button style="
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 36px; height: 36px; border: none; border-radius: 6px; cursor: pointer;
                    background: var(--flint-surface-3, #f3f4f6);
                    color: var(--flint-text-color, #111827);
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         aria-hidden="true">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        <path d="M10 11v6"></path><path d="M14 11v6"></path>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                    </svg>
                    <flint-visually-hidden not-focusable>Delete item</flint-visually-hidden>
                </button>

                <!-- Edit -->
                <button style="
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 36px; height: 36px; border: none; border-radius: 6px; cursor: pointer;
                    background: var(--flint-surface-3, #f3f4f6);
                    color: var(--flint-text-color, #111827);
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         aria-hidden="true">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <flint-visually-hidden not-focusable>Edit item</flint-visually-hidden>
                </button>

                <!-- Share -->
                <button style="
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 36px; height: 36px; border: none; border-radius: 6px; cursor: pointer;
                    background: var(--flint-surface-3, #f3f4f6);
                    color: var(--flint-text-color, #111827);
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         aria-hidden="true">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <flint-visually-hidden not-focusable>Share item</flint-visually-hidden>
                </button>
            </div>
        </div>
    `,
};

/* ── BreadcrumbSeparator ──────────────────────────────────────────── */
export const BreadcrumbSeparator: Story = {
    name: 'Breadcrumb Separators',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px;">
            <p style="margin: 0 0 16px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                Decorative separators are replaced with a meaningful SR-only label.
                Screen readers announce "breadcrumb" and the separator meaning
                without reading out slash characters.
            </p>
            <nav aria-label="breadcrumb">
                <ol style="
                    list-style: none; display: flex; align-items: center;
                    gap: 4px; margin: 0; padding: 0;
                    font-size: 0.875rem; color: var(--flint-text-color, #111827);
                ">
                    <li>
                        <a href="#" style="color: var(--flint-primary-color, #2563eb); text-decoration: none;">Home</a>
                    </li>
                    <li aria-hidden="true" style="color: var(--flint-text-color-muted, #4b5563); padding: 0 2px;">/</li>
                    <li>
                        <a href="#" style="color: var(--flint-primary-color, #2563eb); text-decoration: none;">Products</a>
                    </li>
                    <li aria-hidden="true" style="color: var(--flint-text-color-muted, #4b5563); padding: 0 2px;">/</li>
                    <li>
                        <span style="font-weight: 500;">
                            Wireless Headphones
                            <flint-visually-hidden not-focusable>(current page)</flint-visually-hidden>
                        </span>
                    </li>
                </ol>
            </nav>
        </div>
    `,
};

/* ── LiveAnnouncement ─────────────────────────────────────────────── */
export const LiveAnnouncement: Story = {
    name: 'Live Region Announcements',
    render: () => {
        let count = 0;
        return html`
            <div style="font-family: var(--flint-font-family, system-ui); padding: 24px; max-width: 400px;">
                <p style="margin: 0 0 16px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                    A hidden live region announces status updates to screen readers
                    without disrupting the visual layout.
                </p>
                <flint-visually-hidden not-focusable>
                    <div id="live-status" aria-live="polite" aria-atomic="true"></div>
                </flint-visually-hidden>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <button
                        @click=${(e: Event) => {
                            count++;
                            const btn = e.currentTarget as HTMLElement;
                            const root = btn.closest('div[style]')!.parentElement!;
                            const status = root.querySelector('#live-status') as HTMLElement;
                            if (status) status.textContent = `Item added. Cart now has ${count} item${count === 1 ? '' : 's'}.`;
                        }}
                        style="
                            padding: 8px 16px; font-size: 0.875rem; cursor: pointer;
                            background: var(--flint-primary-color, #2563eb); color: #fff;
                            border: none; border-radius: 6px;
                        "
                    >
                        Add to Cart
                    </button>
                    <span id="cart-display" style="
                        font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);
                    ">
                        Click to add items
                    </span>
                </div>
            </div>
        `;
    },
};

/* ── StatusIndicator ──────────────────────────────────────────────── */
export const StatusIndicator: Story = {
    name: 'Status Indicators',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px;">
            <p style="margin: 0 0 16px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                Visual states (active, selected, online) are communicated to screen
                readers via hidden text, not just colour or shape alone.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                <!-- Online user -->
                <li style="display: flex; align-items: center; gap: 10px; font-size: 0.9375rem; color: var(--flint-text-color, #111827);">
                    <span style="
                        position: relative; display: inline-flex;
                        width: 32px; height: 32px; border-radius: 50%;
                        background: var(--flint-primary-color, #2563eb);
                        color: #fff; align-items: center; justify-content: center;
                        font-size: 0.8125rem; font-weight: 600; flex-shrink: 0;
                    ">
                        AJ
                        <span style="
                            position: absolute; bottom: 1px; right: 1px;
                            width: 9px; height: 9px; border-radius: 50%;
                            background: #22c55e;
                            border: 2px solid var(--flint-surface-1, #fff);
                        " aria-hidden="true"></span>
                    </span>
                    Alex Johnson
                    <flint-visually-hidden not-focusable>(online)</flint-visually-hidden>
                </li>
                <!-- Away user -->
                <li style="display: flex; align-items: center; gap: 10px; font-size: 0.9375rem; color: var(--flint-text-color, #111827);">
                    <span style="
                        position: relative; display: inline-flex;
                        width: 32px; height: 32px; border-radius: 50%;
                        background: var(--flint-surface-3, #f3f4f6);
                        color: var(--flint-text-color-muted, #4b5563);
                        align-items: center; justify-content: center;
                        font-size: 0.8125rem; font-weight: 600; flex-shrink: 0;
                    ">
                        SK
                        <span style="
                            position: absolute; bottom: 1px; right: 1px;
                            width: 9px; height: 9px; border-radius: 50%;
                            background: #f59e0b;
                            border: 2px solid var(--flint-surface-1, #fff);
                        " aria-hidden="true"></span>
                    </span>
                    Sam Kim
                    <flint-visually-hidden not-focusable>(away)</flint-visually-hidden>
                </li>
                <!-- Offline user -->
                <li style="display: flex; align-items: center; gap: 10px; font-size: 0.9375rem; color: var(--flint-text-color, #111827);">
                    <span style="
                        position: relative; display: inline-flex;
                        width: 32px; height: 32px; border-radius: 50%;
                        background: var(--flint-surface-3, #f3f4f6);
                        color: var(--flint-text-color-muted, #4b5563);
                        align-items: center; justify-content: center;
                        font-size: 0.8125rem; font-weight: 600; flex-shrink: 0;
                    ">
                        ML
                        <span style="
                            position: absolute; bottom: 1px; right: 1px;
                            width: 9px; height: 9px; border-radius: 50%;
                            background: #4b5563;
                            border: 2px solid var(--flint-surface-1, #fff);
                        " aria-hidden="true"></span>
                    </span>
                    Morgan Lee
                    <flint-visually-hidden not-focusable>(offline)</flint-visually-hidden>
                </li>
            </ul>
        </div>
    `,
};

/* ── DataTable ────────────────────────────────────────────────────── */
export const DataTable: Story = {
    name: 'Data Table Context',
    render: () => html`
        <div style="font-family: var(--flint-font-family, system-ui); padding: 24px;">
            <p style="margin: 0 0 16px; font-size: 0.875rem; color: var(--flint-text-color-muted, #4b5563);">
                Sort direction and row context are conveyed to screen readers
                without duplicating visible text.
            </p>
            <table style="
                border-collapse: collapse; width: 100%; font-size: 0.875rem;
                color: var(--flint-text-color, #111827);
            ">
                <thead>
                    <tr style="border-bottom: 2px solid var(--flint-border-color, #e5e7eb);">
                        <th style="padding: 8px 12px; text-align: left; font-weight: 600;">
                            <button style="
                                background: none; border: none; cursor: pointer;
                                font: inherit; font-weight: 600; display: flex; align-items: center; gap: 4px;
                                color: var(--flint-text-color, #111827); padding: 0;
                            ">
                                Name
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="2" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                </svg>
                                <flint-visually-hidden not-focusable>sorted ascending</flint-visually-hidden>
                            </button>
                        </th>
                        <th style="padding: 8px 12px; text-align: left; font-weight: 600;">Role</th>
                        <th style="padding: 8px 12px; text-align: left; font-weight: 600;">Status</th>
                        <th style="padding: 8px 12px; text-align: right; font-weight: 600;">
                            <flint-visually-hidden not-focusable>Actions</flint-visually-hidden>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--flint-border-color, #e5e7eb);">
                        <td style="padding: 10px 12px;">Alex Johnson</td>
                        <td style="padding: 10px 12px;">Admin</td>
                        <td style="padding: 10px 12px;">
                            <span style="color: #15803d;">● <flint-visually-hidden not-focusable>Status:</flint-visually-hidden> Active</span>
                        </td>
                        <td style="padding: 10px 12px; text-align: right;">
                            <button style="
                                padding: 4px 10px; font-size: 0.8125rem; cursor: pointer;
                                border: 1px solid var(--flint-border-color, #d1d5db);
                                border-radius: 4px; background: none;
                                color: var(--flint-text-color, #111827);
                            ">
                                Edit
                                <flint-visually-hidden not-focusable>Alex Johnson</flint-visually-hidden>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 12px;">Sam Kim</td>
                        <td style="padding: 10px 12px;">Editor</td>
                        <td style="padding: 10px 12px;">
                            <span style="color: #92400e;">● <flint-visually-hidden not-focusable>Status:</flint-visually-hidden> Pending</span>
                        </td>
                        <td style="padding: 10px 12px; text-align: right;">
                            <button style="
                                padding: 4px 10px; font-size: 0.8125rem; cursor: pointer;
                                border: 1px solid var(--flint-border-color, #d1d5db);
                                border-radius: 4px; background: none;
                                color: var(--flint-text-color, #111827);
                            ">
                                Edit
                                <flint-visually-hidden not-focusable>Sam Kim</flint-visually-hidden>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
};
