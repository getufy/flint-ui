import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { UiMenu } from './ui-menu';
import './ui-menu';
import '../box/ui-box';
import '../stack/ui-stack';
import '../button/ui-button';
import '../avatar/ui-avatar';

const meta: Meta = {
    title: 'Navigation/Menu',
    component: 'ui-menu',
    argTypes: {
        open: { control: 'boolean' },
        placement: {
            control: { type: 'select' },
            options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start'],
        },
        closeOnSelect: { control: 'boolean' },
        scrollable: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj;

/* shared open/close helpers */
function toggle(e: Event) {
    const root = (e.currentTarget as HTMLElement).closest('.story-root');
    const menu = root?.querySelector('ui-menu') as UiMenu | null;
    if (menu) menu.open = !menu.open;
}
function close(e: Event) {
    (e.target as UiMenu).open = false;
}

const wrap = (content: unknown) => html`
    <ui-box class="story-root" p="48px 32px" bgcolor="var(--ui-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="font-family:Inter,sans-serif;min-height:220px;">
        ${content}
    </ui-box>
`;

/* ================================================================== */
/* Basic Menu                                                          */
/* ================================================================== */
export const Basic: Story = {
    args: { open: false, placement: 'bottom-start', closeOnSelect: true },
    render: (args) => wrap(html`
        <div style="position:relative;display:inline-block;">
            <ui-button @click=${toggle}>Open Menu</ui-button>

            <ui-menu
                .open=${args.open}
                .placement=${args.placement}
                ?closeOnSelect=${args.closeOnSelect}
                @ui-menu-close=${close}
            >
                <ui-menu-item>Profile</ui-menu-item>
                <ui-menu-item>My account</ui-menu-item>
                <ui-menu-item>Logout</ui-menu-item>
            </ui-menu>
        </div>
    `),
};

/* ================================================================== */
/* Icon Menu                                                           */
/* ================================================================== */
export const IconMenu: Story = {
    render: () => wrap(html`
        <div style="position:relative;display:inline-block;">
            <ui-button variant="outlined" @click=${toggle}>☰ Actions</ui-button>

            <ui-menu open placement="bottom-start" @ui-menu-close=${close}>
                <ui-menu-item>
                    <span slot="icon">📋</span>
                    Copy
                    <span slot="end-icon">⌘C</span>
                </ui-menu-item>
                <ui-menu-item>
                    <span slot="icon">✂️</span>
                    Cut
                    <span slot="end-icon">⌘X</span>
                </ui-menu-item>
                <ui-menu-item>
                    <span slot="icon">📌</span>
                    Paste
                    <span slot="end-icon">⌘V</span>
                </ui-menu-item>
                <ui-menu-divider></ui-menu-divider>
                <ui-menu-item>
                    <span slot="icon">🗑️</span>
                    Delete
                </ui-menu-item>
            </ui-menu>
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
            <div class="story-root" style="padding:48px 32px;background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;font-family:Inter,sans-serif;min-height:260px;">
                <p style="margin-bottom:12px;font-size:.875rem;color:#6b7280;">
                    Selected: <strong>${selected}</strong>
                </p>
                <div style="position:relative;display:inline-block;">
                    <ui-button variant="outlined" @click=${toggle}>Sort by: ${selected}</ui-button>

                    <ui-menu
                        open
                        placement="bottom-start"
                        @ui-menu-close=${(e: Event) => { (e.target as UiMenu).open = false; }}
                        @ui-menu-item-select=${(e: CustomEvent) => {
                const root = (e.target as HTMLElement).closest('.story-root');
                const items = root?.querySelectorAll('ui-menu-item');
                const p = root?.querySelector('p strong');
                if (items && p) {
                    items.forEach(item => item.removeAttribute('selected'));
                    (e.target as HTMLElement).setAttribute('selected', '');
                    p.textContent = (e.target as HTMLElement).textContent?.trim() ?? '';
                }
            }}
                    >
                        ${['None', 'Inbox', 'Starred', 'Drafts', 'Sent Mail', 'Trash'].map(opt => html`
                            <ui-menu-item ?selected=${opt === selected}>${opt}</ui-menu-item>
                        `)}
                    </ui-menu>
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
        <div class="story-root" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;padding:24px;background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;font-family:Inter,sans-serif;">
            ${(['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const).map(placement => html`
                <ui-stack direction="column" alignItems="flex-start" gap="8px" style="padding:24px 0 0;">
                    <span style="font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;">${placement}</span>
                    <div data-menu-anchor style="position:relative;display:inline-block;margin-top:${placement.startsWith('top') ? '120px' : '0'}">
                        <ui-button variant="outlined" @click=${(e: Event) => {
            /* find the menu within THIS button's own anchor wrapper */
            const anchor = (e.currentTarget as HTMLElement).closest('[data-menu-anchor]');
            const menu = anchor?.querySelector('ui-menu') as UiMenu | null;
            if (menu) menu.open = !menu.open;
        }}>${placement}</ui-button>
                        <ui-menu placement=${placement} @ui-menu-close=${close}>
                            <ui-menu-item>Option 1</ui-menu-item>
                            <ui-menu-item>Option 2</ui-menu-item>
                            <ui-menu-item>Option 3</ui-menu-item>
                        </ui-menu>
                    </div>
                </ui-stack>
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
            <ui-button variant="outlined" @click=${toggle}>File</ui-button>

            <ui-menu open placement="bottom-start" @ui-menu-close=${close}>
                <ui-menu-item>
                    <span slot="icon">📄</span>
                    New File
                    <span slot="end-icon">⌘N</span>
                </ui-menu-item>
                <ui-menu-item>
                    <span slot="icon">📂</span>
                    Open…
                    <span slot="end-icon">⌘O</span>
                </ui-menu-item>
                <ui-menu-divider></ui-menu-divider>
                <ui-menu-item disabled>
                    <span slot="icon">💾</span>
                    Save
                    <span slot="end-icon">⌘S</span>
                </ui-menu-item>
                <ui-menu-item disabled>
                    <span slot="icon">🖨️</span>
                    Print
                    <span slot="end-icon">⌘P</span>
                </ui-menu-item>
                <ui-menu-divider></ui-menu-divider>
                <ui-menu-item>
                    <span slot="icon">🚪</span>
                    Quit
                    <span slot="end-icon">⌘Q</span>
                </ui-menu-item>
            </ui-menu>
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
        <ui-stack direction="row" gap="32px" alignItems="flex-start">
            <div>
                <p style="margin:0 0 8px;font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Default</p>
                <div style="position:relative;display:inline-block;">
                    <ui-button @click=${toggle}>Open</ui-button>
                    <ui-menu open placement="bottom-start" @ui-menu-close=${close}>
                        <ui-menu-item>Profile</ui-menu-item>
                        <ui-menu-item>Settings</ui-menu-item>
                        <ui-menu-item>Logout</ui-menu-item>
                    </ui-menu>
                </div>
            </div>

            <div style="flex: 1;">
                <p style="margin:0 0 8px;font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Dense</p>
                <div style="position:relative;display:inline-block;">
                    <ui-button @click=${(e: Event) => {
        const anchor = (e.currentTarget as HTMLElement).closest('div');
        const menu = anchor?.querySelector('ui-menu') as UiMenu | null;
        if (menu) menu.open = !menu.open;
    }}>Open</ui-button>
                    <ui-menu open placement="bottom-start" @ui-menu-close=${close}>
                        <ui-menu-item dense>Profile</ui-menu-item>
                        <ui-menu-item dense>Settings</ui-menu-item>
                        <ui-menu-item dense>Logout</ui-menu-item>
                    </ui-menu>
                </div>
            </div>
        </ui-stack>
    `),
};

/* ================================================================== */
/* Grouped with Labels                                                 */
/* ================================================================== */
export const GroupedWithLabels: Story = {
    render: () => wrap(html`
        <div style="position:relative;display:inline-block;">
            <ui-button @click=${toggle}>My Account</ui-button>

            <ui-menu open placement="bottom-start" @ui-menu-close=${close} style="--ui-menu-min-width:200px;">
                <ui-menu-group label="Account">
                    <ui-menu-item>
                        <span slot="icon">👤</span>
                        Profile
                    </ui-menu-item>
                    <ui-menu-item>
                        <span slot="icon">🔔</span>
                        Notifications
                    </ui-menu-item>
                </ui-menu-group>

                <ui-menu-divider></ui-menu-divider>

                <ui-menu-group label="Settings">
                    <ui-menu-item>
                        <span slot="icon">⚙️</span>
                        Preferences
                    </ui-menu-item>
                    <ui-menu-item>
                        <span slot="icon">💳</span>
                        Billing
                    </ui-menu-item>
                    <ui-menu-item>
                        <span slot="icon">🔒</span>
                        Security
                    </ui-menu-item>
                </ui-menu-group>

                <ui-menu-divider></ui-menu-divider>

                <ui-menu-item>
                    <span slot="icon">🚪</span>
                    Logout
                </ui-menu-item>
            </ui-menu>
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
            <ui-button
                variant="text"
                style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:24px;"
                @click=${(e: Event) => {
            const anchor = (e.currentTarget as HTMLElement).closest('[data-menu-anchor]');
            const menu = anchor?.querySelector('ui-menu') as UiMenu | null;
            if (menu) menu.open = !menu.open;
        }}
            >
                <ui-avatar name="Jane Doe" size="small"></ui-avatar>
                <span style="font-size:.9rem;font-weight:500;">Jane Doe</span>
                <span style="font-size:.7rem;opacity:.6;">▾</span>
            </ui-button>

            <!-- Menu is a sibling of the button, inside the same positioning context -->
            <ui-menu placement="bottom-end" @ui-menu-close=${close}>
                <!-- Profile header -->
                <ui-stack direction="row" alignItems="center" gap="12px" style="padding:16px;border-bottom:1px solid #e5e7eb;min-width:220px;">
                    <ui-avatar name="Jane Doe"></ui-avatar>
                    <div>
                        <div style="font-weight:600;font-size:.95rem;">Jane Doe</div>
                        <div style="font-size:.8rem;color:#6b7280;">jane@example.com</div>
                    </div>
                </ui-stack>

                <ui-menu-item>
                    <span slot="icon">👤</span>
                    Profile
                </ui-menu-item>
                <ui-menu-item>
                    <span slot="icon">⚙️</span>
                    Settings
                </ui-menu-item>
                <ui-menu-item>
                    <span slot="icon">💳</span>
                    Billing
                </ui-menu-item>
                <ui-menu-divider></ui-menu-divider>
                <ui-menu-item>
                    <span slot="icon">🚪</span>
                    Logout
                </ui-menu-item>
            </ui-menu>
        </div>
    `),
};

/* ================================================================== */
/* Long / Scrollable                                                   */
/* ================================================================== */
export const Scrollable: Story = {
    render: () => wrap(html`
        <div style="position:relative;display:inline-block;">
            <ui-button @click=${toggle}>Country</ui-button>

            <ui-menu placement="bottom-start" scrollable @ui-menu-close=${close}>
                ${[
            'Albania', 'Australia', 'Brazil', 'Canada', 'China', 'Denmark',
            'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'India',
            'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Portugal',
            'Russia', 'South Africa', 'Spain', 'Sweden', 'Switzerland',
            'Turkey', 'United Kingdom', 'United States',
        ].map(c => html`<ui-menu-item>${c}</ui-menu-item>`)}
            </ui-menu>
        </div>
    `),
};

/* ================================================================== */
/* Context Menu                                                        */
/* ================================================================== */
export const ContextMenu: Story = {
    render: () => {
        let menuEl: UiMenu | null = null;

        const onContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            if (!menuEl) return;
            menuEl.style.setProperty('position', 'fixed');
            menuEl.style.setProperty('top', `${e.clientY}px`);
            menuEl.style.setProperty('left', `${e.clientX}px`);
            menuEl.open = true;
        };

        return html`
            <ui-box
                class="story-root"
                display="flex"
                alignItems="center"
                justifyContent="center"
                style="padding:48px 32px;background:var(--ui-muted-background, #f8fafc);border:2px dashed #cbd5e1;border-radius:8px;font-family:Inter,sans-serif;min-height:260px;cursor:context-menu;user-select:none;"
                @contextmenu=${onContextMenu}
            >
                <p style="color:#94a3b8;font-size:.9rem;pointer-events:none;">
                    Right-click anywhere in this area
                </p>
            </ui-box>

            <ui-menu
                placement="bottom-start"
                @ui-menu-close=${(e: Event) => { (e.target as UiMenu).open = false; }}
                ${ref((el) => { menuEl = (el as UiMenu) ?? null; })}
            >
                <ui-menu-item>
                    <span slot="icon">✏️</span>
                    Edit
                </ui-menu-item>
                <ui-menu-item>
                    <span slot="icon">📋</span>
                    Copy
                    <span slot="end-icon">⌘C</span>
                </ui-menu-item>
                <ui-menu-item>
                    <span slot="icon">📌</span>
                    Paste
                    <span slot="end-icon">⌘V</span>
                </ui-menu-item>
                <ui-menu-divider></ui-menu-divider>
                <ui-menu-item>
                    <span slot="icon">🗑️</span>
                    Delete
                </ui-menu-item>
            </ui-menu>
        `;
    },
};
