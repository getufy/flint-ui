import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { FlintMenu } from './flint-menu';
import './flint-menu';
import '../box/flint-box';
import '../stack/flint-stack';
import '../button/flint-button';
import '../avatar/flint-avatar';

const meta: Meta = {
    title: 'Navigation/Menu',
    component: 'flint-menu',
    argTypes: {
        open: { control: 'boolean' },
        placement: {
            control: { type: 'select' },
            options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start'],
        },
        closeOnSelect: { control: 'boolean' },
        scrollable: { control: 'boolean' },
    },
    args: {
        open: false,
        placement: 'bottom-start',
        closeOnSelect: true,
        scrollable: false,
    },
    parameters: {
        docs: {
            description: {
                component: `
A composable dropdown menu built with LitElement.

**Components:**
- \`flint-menu\` — Root; manages open/close state, keyboard navigation, and positioning
- \`flint-menu-item\` — Interactive option (slots: \`icon\`, \`shortcut\`). Supports \`disabled\`
- \`flint-menu-group\` — Labeled group of items (set \`label\` for group heading)
- \`flint-menu-divider\` — Visual separator between items or groups

**Composition:** \`flint-menu\` > (\`flint-menu-item\` | \`flint-menu-group\` > \`flint-menu-item\`* | \`flint-menu-divider\`)*

**Keyboard navigation:** ↑ ↓ Arrow keys, Enter to select, Escape to close.
                `,
            },
        },
    },
};
export default meta;
type Story = StoryObj;

/* shared open/close helpers */
function toggle(e: Event) {
    const root = (e.currentTarget as HTMLElement).closest('.story-root');
    const menu = root?.querySelector('flint-menu') as FlintMenu | null;
    if (menu) menu.open = !menu.open;
}
function close(e: Event) {
    (e.target as FlintMenu).open = false;
}

const wrap = (content: unknown) => html`
    <flint-box class="story-root" p="48px 32px" bgcolor="var(--flint-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="font-family:Inter,sans-serif;min-height:220px;">
        ${content}
    </flint-box>
`;

/* ================================================================== */
/* Basic Menu                                                          */
/* ================================================================== */
export const Basic: Story = {
    render: (args) => wrap(html`
        <div style="position:relative;display:inline-block;">
            <flint-button @click=${toggle}>Open Menu</flint-button>

            <flint-menu
                .open=${args.open}
                .placement=${args.placement}
                ?closeOnSelect=${args.closeOnSelect}
                @flint-menu-close=${close}
            >
                <flint-menu-item>Profile</flint-menu-item>
                <flint-menu-item>My account</flint-menu-item>
                <flint-menu-item>Logout</flint-menu-item>
            </flint-menu>
        </div>
    `),
};

/* ================================================================== */
/* Icon Menu                                                           */
/* ================================================================== */
export const IconMenu: Story = {
    render: () => wrap(html`
        <div style="position:relative;display:inline-block;">
            <flint-button variant="outlined" @click=${toggle}>☰ Actions</flint-button>

            <flint-menu open placement="bottom-start" @flint-menu-close=${close}>
                <flint-menu-item>
                    <span slot="icon">📋</span>
                    Copy
                    <span slot="end-icon">⌘C</span>
                </flint-menu-item>
                <flint-menu-item>
                    <span slot="icon">✂️</span>
                    Cut
                    <span slot="end-icon">⌘X</span>
                </flint-menu-item>
                <flint-menu-item>
                    <span slot="icon">📌</span>
                    Paste
                    <span slot="end-icon">⌘V</span>
                </flint-menu-item>
                <flint-menu-divider></flint-menu-divider>
                <flint-menu-item>
                    <span slot="icon">🗑️</span>
                    Delete
                </flint-menu-item>
            </flint-menu>
        </div>
    `),
};

/* ================================================================== */
/* Selected Menu                                                       */
/* ================================================================== */
export const SelectedMenu: Story = {
    render: () => {
        const selected = 'Drafts';
        return html`
            <div class="story-root" style="padding:48px 32px;background:var(--flint-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;font-family:Inter,sans-serif;min-height:260px;">
                <p style="margin-bottom:12px;font-size:.875rem;color:#6b7280;">
                    Selected: <strong>${selected}</strong>
                </p>
                <div style="position:relative;display:inline-block;">
                    <flint-button variant="outlined" @click=${toggle}>Sort by: ${selected}</flint-button>

                    <flint-menu
                        open
                        placement="bottom-start"
                        @flint-menu-close=${(e: Event) => { (e.target as FlintMenu).open = false; }}
                        @flint-menu-item-select=${(e: CustomEvent) => {
                const root = (e.target as HTMLElement).closest('.story-root');
                const items = root?.querySelectorAll('flint-menu-item');
                const p = root?.querySelector('p strong');
                if (items && p) {
                    items.forEach(item => item.removeAttribute('selected'));
                    (e.target as HTMLElement).setAttribute('selected', '');
                    p.textContent = (e.target as HTMLElement).textContent?.trim() ?? '';
                }
            }}
                    >
                        ${['None', 'Inbox', 'Starred', 'Drafts', 'Sent Mail', 'Trash'].map(opt => html`
                            <flint-menu-item ?selected=${opt === selected}>${opt}</flint-menu-item>
                        `)}
                    </flint-menu>
                </div>
            </div>
        `;
    },
};

/* ================================================================== */
/* Positioned Menu                                                     */
/* ================================================================== */
export const PositionedMenu: Story = {
    render: () => html`
        <div class="story-root" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;padding:24px;background:var(--flint-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;font-family:Inter,sans-serif;">
            ${(['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const).map(placement => html`
                <flint-stack direction="column" alignItems="flex-start" gap="8px" style="padding:24px 0 0;">
                    <span style="font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;">${placement}</span>
                    <div data-menu-anchor style="position:relative;display:inline-block;margin-top:${placement.startsWith('top') ? '120px' : '0'}">
                        <flint-button variant="outlined" @click=${(e: Event) => {
            /* find the menu within THIS button's own anchor wrapper */
            const anchor = (e.currentTarget as HTMLElement).closest('[data-menu-anchor]');
            const menu = anchor?.querySelector('flint-menu') as FlintMenu | null;
            if (menu) menu.open = !menu.open;
        }}>${placement}</flint-button>
                        <flint-menu placement=${placement} @flint-menu-close=${close}>
                            <flint-menu-item>Option 1</flint-menu-item>
                            <flint-menu-item>Option 2</flint-menu-item>
                            <flint-menu-item>Option 3</flint-menu-item>
                        </flint-menu>
                    </div>
                </flint-stack>
            `)}
        </div>
    `,
};

/* ================================================================== */
/* Disabled Items                                                      */
/* ================================================================== */
export const DisabledItems: Story = {
    render: () => wrap(html`
        <div style="position:relative;display:inline-block;">
            <flint-button variant="outlined" @click=${toggle}>File</flint-button>

            <flint-menu open placement="bottom-start" @flint-menu-close=${close}>
                <flint-menu-item>
                    <span slot="icon">📄</span>
                    New File
                    <span slot="end-icon">⌘N</span>
                </flint-menu-item>
                <flint-menu-item>
                    <span slot="icon">📂</span>
                    Open…
                    <span slot="end-icon">⌘O</span>
                </flint-menu-item>
                <flint-menu-divider></flint-menu-divider>
                <flint-menu-item disabled>
                    <span slot="icon">💾</span>
                    Save
                    <span slot="end-icon">⌘S</span>
                </flint-menu-item>
                <flint-menu-item disabled>
                    <span slot="icon">🖨️</span>
                    Print
                    <span slot="end-icon">⌘P</span>
                </flint-menu-item>
                <flint-menu-divider></flint-menu-divider>
                <flint-menu-item>
                    <span slot="icon">🚪</span>
                    Quit
                    <span slot="end-icon">⌘Q</span>
                </flint-menu-item>
            </flint-menu>
        </div>

        <p style="margin-top:200px;font-size:.8rem;color:#94a3b8;">
            Disabled items are non-interactive and skipped during keyboard navigation.
        </p>
    `),
};

/* ================================================================== */
/* Dense Mode                                                          */
/* ================================================================== */
export const DenseMode: Story = {
    render: () => wrap(html`
        <flint-stack direction="row" gap="32px" alignItems="flex-start">
            <div>
                <p style="margin:0 0 8px;font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Default</p>
                <div style="position:relative;display:inline-block;">
                    <flint-button @click=${toggle}>Open</flint-button>
                    <flint-menu open placement="bottom-start" @flint-menu-close=${close}>
                        <flint-menu-item>Profile</flint-menu-item>
                        <flint-menu-item>Settings</flint-menu-item>
                        <flint-menu-item>Logout</flint-menu-item>
                    </flint-menu>
                </div>
            </div>

            <div style="flex: 1;">
                <p style="margin:0 0 8px;font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Dense</p>
                <div style="position:relative;display:inline-block;">
                    <flint-button @click=${(e: Event) => {
        const anchor = (e.currentTarget as HTMLElement).closest('div');
        const menu = anchor?.querySelector('flint-menu') as FlintMenu | null;
        if (menu) menu.open = !menu.open;
    }}>Open</flint-button>
                    <flint-menu open placement="bottom-start" @flint-menu-close=${close}>
                        <flint-menu-item dense>Profile</flint-menu-item>
                        <flint-menu-item dense>Settings</flint-menu-item>
                        <flint-menu-item dense>Logout</flint-menu-item>
                    </flint-menu>
                </div>
            </div>
        </flint-stack>
    `),
};

/* ================================================================== */
/* Grouped with Labels                                                 */
/* ================================================================== */
export const GroupedWithLabels: Story = {
    render: () => wrap(html`
        <div style="position:relative;display:inline-block;">
            <flint-button @click=${toggle}>My Account</flint-button>

            <flint-menu open placement="bottom-start" @flint-menu-close=${close} style="--flint-menu-min-width:200px;">
                <flint-menu-group label="Account">
                    <flint-menu-item>
                        <span slot="icon">👤</span>
                        Profile
                    </flint-menu-item>
                    <flint-menu-item>
                        <span slot="icon">🔔</span>
                        Notifications
                    </flint-menu-item>
                </flint-menu-group>

                <flint-menu-divider></flint-menu-divider>

                <flint-menu-group label="Settings">
                    <flint-menu-item>
                        <span slot="icon">⚙️</span>
                        Preferences
                    </flint-menu-item>
                    <flint-menu-item>
                        <span slot="icon">💳</span>
                        Billing
                    </flint-menu-item>
                    <flint-menu-item>
                        <span slot="icon">🔒</span>
                        Security
                    </flint-menu-item>
                </flint-menu-group>

                <flint-menu-divider></flint-menu-divider>

                <flint-menu-item>
                    <span slot="icon">🚪</span>
                    Logout
                </flint-menu-item>
            </flint-menu>
        </div>
    `),
};

/* ================================================================== */
/* Account Menu                                                        */
/* ================================================================== */
export const AccountMenu: Story = {
    render: () => wrap(html`
        <!-- position:relative + inline-block: the anchor context for the menu paper -->
        <div data-menu-anchor style="position:relative;display:inline-block;">

            <!-- The trigger button — its contents use flex via the slot -->
            <flint-button
                variant="text"
                style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:24px;"
                @click=${(e: Event) => {
            const anchor = (e.currentTarget as HTMLElement).closest('[data-menu-anchor]');
            const menu = anchor?.querySelector('flint-menu') as FlintMenu | null;
            if (menu) menu.open = !menu.open;
        }}
            >
                <flint-avatar name="Jane Doe" size="small"></flint-avatar>
                <span style="font-size:.9rem;font-weight:500;">Jane Doe</span>
                <span style="font-size:.7rem;opacity:.6;">▾</span>
            </flint-button>

            <!-- Menu is a sibling of the button, inside the same positioning context -->
            <flint-menu placement="bottom-end" @flint-menu-close=${close}>
                <!-- Profile header -->
                <flint-stack direction="row" alignItems="center" gap="12px" style="padding:16px;border-bottom:1px solid #e5e7eb;min-width:220px;">
                    <flint-avatar name="Jane Doe"></flint-avatar>
                    <div>
                        <div style="font-weight:600;font-size:.95rem;">Jane Doe</div>
                        <div style="font-size:.8rem;color:#6b7280;">jane@example.com</div>
                    </div>
                </flint-stack>

                <flint-menu-item>
                    <span slot="icon">👤</span>
                    Profile
                </flint-menu-item>
                <flint-menu-item>
                    <span slot="icon">⚙️</span>
                    Settings
                </flint-menu-item>
                <flint-menu-item>
                    <span slot="icon">💳</span>
                    Billing
                </flint-menu-item>
                <flint-menu-divider></flint-menu-divider>
                <flint-menu-item>
                    <span slot="icon">🚪</span>
                    Logout
                </flint-menu-item>
            </flint-menu>
        </div>
    `),
};

/* ================================================================== */
/* Long / Scrollable                                                   */
/* ================================================================== */
export const Scrollable: Story = {
    render: () => wrap(html`
        <div style="position:relative;display:inline-block;">
            <flint-button @click=${toggle}>Country</flint-button>

            <flint-menu placement="bottom-start" scrollable @flint-menu-close=${close}>
                ${[
            'Albania', 'Australia', 'Brazil', 'Canada', 'China', 'Denmark',
            'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'India',
            'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Portugal',
            'Russia', 'South Africa', 'Spain', 'Sweden', 'Switzerland',
            'Turkey', 'United Kingdom', 'United States',
        ].map(c => html`<flint-menu-item>${c}</flint-menu-item>`)}
            </flint-menu>
        </div>
    `),
};

/* ================================================================== */
/* Context Menu                                                        */
/* ================================================================== */
export const ContextMenu: Story = {
    render: () => {
        let menuEl: FlintMenu | null = null;

        const onContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            if (!menuEl) return;
            menuEl.style.setProperty('position', 'fixed');
            menuEl.style.setProperty('top', `${e.clientY}px`);
            menuEl.style.setProperty('left', `${e.clientX}px`);
            menuEl.open = true;
        };

        return html`
            <flint-box
                class="story-root"
                display="flex"
                alignItems="center"
                justifyContent="center"
                style="padding:48px 32px;background:var(--flint-muted-background, #f8fafc);border:2px dashed #cbd5e1;border-radius:8px;font-family:Inter,sans-serif;min-height:260px;cursor:context-menu;user-select:none;"
                @contextmenu=${onContextMenu}
            >
                <p style="color:#94a3b8;font-size:.9rem;pointer-events:none;">
                    Right-click anywhere in this area
                </p>
            </flint-box>

            <flint-menu
                placement="bottom-start"
                @flint-menu-close=${(e: Event) => { (e.target as FlintMenu).open = false; }}
                ${ref((el) => { menuEl = (el as FlintMenu) ?? null; })}
            >
                <flint-menu-item>
                    <span slot="icon">✏️</span>
                    Edit
                </flint-menu-item>
                <flint-menu-item>
                    <span slot="icon">📋</span>
                    Copy
                    <span slot="end-icon">⌘C</span>
                </flint-menu-item>
                <flint-menu-item>
                    <span slot="icon">📌</span>
                    Paste
                    <span slot="end-icon">⌘V</span>
                </flint-menu-item>
                <flint-menu-divider></flint-menu-divider>
                <flint-menu-item>
                    <span slot="icon">🗑️</span>
                    Delete
                </flint-menu-item>
            </flint-menu>
        `;
    },
};
