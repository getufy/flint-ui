import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FlintDrawer } from './flint-drawer';
import './flint-drawer';  // side-effect: ensures @customElement registers
import '../button/flint-button';
import '../box/flint-box';
import '../paper/flint-paper';
import '../stack/flint-stack';

const meta: Meta = {
    title: 'Navigation/Drawer',
    component: 'flint-drawer',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'aria-hidden-focus', enabled: false },
                    { id: 'aria-allowed-attr', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
Navigation drawers provide ergonomic access to destinations in a site or app.

- **Tag**: \`<flint-drawer>\`
- **Class**: \`FlintDrawer\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the drawer is open. |
| \`anchor\` | \`anchor\` | \`'left' \\| 'right' \\| 'top' \\| 'bottom'\` | \`'left'\` | Side from which the drawer slides in. |
| \`variant\` | \`variant\` | \`'temporary' \\| 'persistent' \\| 'mini'\` | \`'temporary'\` | Drawer behavior mode. |
| \`edge\` | \`edge\` | \`boolean\` | \`false\` | Whether the drawer uses edge spacing. |
| \`container\` | \`container\` | \`boolean\` | \`false\` | Whether the drawer is contained within its parent. |
| \`label\` | \`label\` | \`string\` | \`'Drawer'\` | Accessible label for the drawer panel (used as aria-label on the panel). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-drawer-close\` | — | Dispatched when the drawer requests to be closed (backdrop click or Escape). |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Drawer content. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-drawer-z-index\` | \`1200\` |
| \`--flint-drawer-bg\` | \`var(--flint-surface-1\` |
| \`--flint-drawer-width\` | \`250px\` |
| \`--flint-drawer-shadow\` | — |
| \`--flint-drawer-transition\` | \`.225s cubic-bezier(0, 0, .2, 1\` |
| \`--flint-drawer-height\` | \`auto\` |
| \`--flint-drawer-mini-width\` | \`72px\` |
| \`--flint-drawer-edge-width\` | \`16px\` |
| \`--flint-backdrop-color\` | — |
| \`--flint-border-color\` | — |
                `,
            },
        },
    },
    argTypes: {
        open: { control: 'boolean' },
        anchor: { control: { type: 'select' }, options: ['left', 'right', 'top', 'bottom'] },
        variant: { control: { type: 'select' }, options: ['temporary', 'persistent', 'mini'] },
        edge: { control: 'boolean' },
        container: { control: 'boolean' },
    },
    args: {
        open: false,
        anchor: 'left',
        variant: 'temporary',
        edge: false,
        container: false,
    },
};
export default meta;

type Story = StoryObj;

/** Open the nearest `flint-drawer` inside the closest `.story-root` ancestor. */
function openDrawer(e: Event) {
    const root = (e.currentTarget as HTMLElement).closest('.story-root');
    const d = root?.querySelector('flint-drawer') as FlintDrawer | null;
    if (d) d.open = true;
}

/** Toggle the nearest `flint-drawer` inside the closest `.story-root` ancestor. */
function toggleDrawer(e: Event) {
    const root = (e.currentTarget as HTMLElement).closest('.story-root');
    const d = root?.querySelector('flint-drawer') as FlintDrawer | null;
    if (d) d.open = !d.open;
}

/** Close the closest `flint-drawer` ancestor. */
function closeDrawer(e: Event) {
    const d = (e.currentTarget as HTMLElement).closest('flint-drawer') as FlintDrawer | null;
    if (d) d.open = false;
}

/** Close event from the drawer itself (e.target is the drawer). */
function onDrawerClose(e: Event) {
    (e.target as FlintDrawer).open = false;
}

/* Shared nav content */
const navItems = ['Inbox', 'Starred', 'Send Email', 'Drafts', 'All Mail', 'Trash', 'Spam'];

function navContent() {
    return html`
        <nav style="width:250px;padding:8px;">
            <div style="padding:12px 16px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;opacity:.5;">Navigation</div>
            ${navItems.map(i => html`
                <div style="padding:10px 16px;border-radius:6px;cursor:pointer;transition:background .15s;"
                     onmouseover="this.style.background='rgba(0,0,0,.06)'"
                     onmouseout="this.style.background=''">${i}</div>
            `)}
        </nav>
    `;
}

/* ================================================================== */
/*  Temporary                                                          */
/* ================================================================== */
export const Temporary: Story = {
    args: { open: false, anchor: 'left', variant: 'temporary' },
    render: (args) => html`
        <flint-box class="story-root" display="flex" alignItems="center" justifyContent="center" bgcolor="var(--flint-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="position:relative;height:320px;overflow:hidden;">

            <flint-drawer
                .open=${args.open}
                .anchor=${args.anchor}
                .variant=${'temporary'}
                container
                @flint-drawer-close=${onDrawerClose}
            >
                ${navContent()}
                <div style="padding:0 8px 12px;">
                    <flint-button @click=${closeDrawer} style="width:calc(100% - 16px);margin:0 8px;">Close</flint-button>
                </div>
            </flint-drawer>

            <flint-button @click=${openDrawer}>Open Drawer</flint-button>
            <p style="position:absolute;bottom:12px;left:0;right:0;text-align:center;font-size:.8rem;color:#475569;margin:0;">
                Click the button · click the overlay or press Esc to close
            </p>
        </flint-box>
    `,
};

/* ================================================================== */
/*  Persistent                                                         */
/* ================================================================== */
export const Persistent: Story = {
    args: { open: true, variant: 'persistent' },
    render: (args) => html`
        <flint-paper class="story-root" elevation="1" style="display:flex;height:360px;overflow:hidden;">

            <flint-drawer .open=${args.open} .variant=${'persistent'}>
                ${navContent()}
            </flint-drawer>

            <div style="flex:1;padding:24px;overflow-y:auto;">
                <flint-stack direction="row" alignItems="center" justifyContent="space-between" mb="16px">
                    <h2 style="margin:0;font-size:1.25rem;">Persistent Drawer</h2>
                    <flint-button variant="outlined" @click=${toggleDrawer}>Toggle</flint-button>
                </flint-stack>
                <p>The persistent drawer sits on the same surface as the content.
                   It's closed by clicking Toggle — it does not use a backdrop.</p>
                ${Array.from({ length: 6 }).map(() => html`
                    <p style="color:#475569;line-height:1.6;">
                        Content adapts and shifts width as the drawer opens and closes.
                        This is the recommended pattern for desktop-sized layouts.
                    </p>
                `)}
            </div>
        </flint-paper>
    `,
};

/* ================================================================== */
/*  Mini                                                               */
/* ================================================================== */
export const Mini: Story = {
    args: { open: false, variant: 'mini' },
    render: (args) => html`
        <flint-paper class="story-root" elevation="1" style="display:flex;height:360px;overflow:hidden;">

            <flint-drawer .open=${args.open} .variant=${'mini'}>
                <div style="width:250px;">
                    ${([
            { icon: '📥', label: 'Inbox' },
            { icon: '⭐', label: 'Starred' },
            { icon: '📝', label: 'Drafts' },
            { icon: '🗑️', label: 'Trash' },
            { icon: '⚙️', label: 'Settings' },
        ]).map(({ icon, label }) => html`
                        <flint-stack direction="row" alignItems="center" style="height:52px;cursor:pointer;transition:background .15s;"
                             onmouseover="this.style.background='rgba(0,0,0,.06)'"
                             onmouseout="this.style.background=''">
                            <span style="display:flex;align-items:center;justify-content:center;min-width:72px;font-size:22px;">${icon}</span>
                            <span data-drawer-hide-mini style="white-space:nowrap;font-size:.95rem;">${label}</span>
                        </flint-stack>
                    `)}
                </div>
            </flint-drawer>

            <div style="flex:1;padding:24px;overflow-y:auto;">
                <flint-stack direction="row" alignItems="center" justifyContent="space-between" mb="16px">
                    <h2 style="margin:0;font-size:1.25rem;">Mini Variant</h2>
                    <flint-button variant="outlined" @click=${toggleDrawer}>Toggle</flint-button>
                </flint-stack>
                <p>Icons are always visible. Expand to reveal full labels alongside them.</p>
                ${Array.from({ length: 8 }).map(() => html`
                    <p style="color:#475569;line-height:1.6;">
                        Content stays visible at all times and the drawer width animates smoothly.
                    </p>
                `)}
            </div>
        </flint-paper>
    `,
};

/* ================================================================== */
/*  Edge Drawer                                                        */
/* ================================================================== */
export const EdgeDrawer: Story = {
    args: { open: false, anchor: 'bottom', edge: true },
    render: (args) => html`
        <flint-box class="story-root" display="flex" alignItems="center" justifyContent="center" bgcolor="var(--flint-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="position:relative;height:360px;overflow:hidden;">

            <p style="text-align:center;color:#475569;">↓ Click the edge handle at the bottom to open</p>

            <flint-drawer
                .open=${args.open}
                .anchor=${'bottom'}
                ?edge=${args.edge}
                container
                @flint-drawer-close=${onDrawerClose}
            >
                <div style="padding:24px;min-height:180px;">
                    <h3 style="margin-top:0;">Swipeable Edge</h3>
                    <p>A small handle is visible when closed. Click it to open.</p>
                    <flint-button @click=${closeDrawer}>Close</flint-button>
                </div>
            </flint-drawer>
        </flint-box>
    `,
};

/* ================================================================== */
/*  Anchors                                                            */
/* ================================================================== */
export const Anchors: Story = {
    render: () => html`
        <flint-box class="story-root" display="flex" flexWrap="wrap" alignContent="flex-start" bgcolor="var(--flint-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" p="24px" style="position:relative;height:460px;overflow:hidden;gap:12px;">

            ${(['left', 'right', 'top', 'bottom'] as const).map(anchor => html`
                <flint-button variant="outlined"
                    @click=${(e: Event) => {
            const root = (e.currentTarget as HTMLElement).closest('.story-root');
            const d = root?.querySelector(`flint-drawer[data-anchor="${anchor}"]`) as FlintDrawer | null;
            if (d) d.open = true;
        }}
                >Open ${anchor}</flint-button>

                <flint-drawer
                    data-anchor=${anchor}
                    .anchor=${anchor}
                    container
                    @flint-drawer-close=${onDrawerClose}
                >
                    <div style="padding:24px;min-width:${anchor === 'left' || anchor === 'right' ? '240px' : 'auto'};min-height:${anchor === 'top' || anchor === 'bottom' ? '160px' : 'auto'};">
                        <h3 style="margin-top:0;">${anchor[0].toUpperCase() + anchor.slice(1)} Drawer</h3>
                        <p>Anchored to the <strong>${anchor}</strong> side of this container.</p>
                        <flint-button @click=${closeDrawer}>Close</flint-button>
                    </div>
                </flint-drawer>
            `)}

            <p style="position:absolute;bottom:12px;left:0;right:0;text-align:center;font-size:.8rem;color:#475569;margin:0;">
                All four anchors demonstrated — drawers are scoped to this container
            </p>
        </flint-box>
    `,
};
