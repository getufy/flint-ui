import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiDrawer } from './ui-drawer';
import './ui-drawer';  // side-effect: ensures @customElement registers
import '../button/ui-button';
import '../box/ui-box';
import '../paper/ui-paper';
import '../stack/ui-stack';

const meta: Meta = {
    title: 'Navigation/Drawer',
    component: 'ui-drawer',
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

/** Open the nearest `ui-drawer` inside the closest `.story-root` ancestor. */
function openDrawer(e: Event) {
    const root = (e.currentTarget as HTMLElement).closest('.story-root');
    const d = root?.querySelector('ui-drawer') as UiDrawer | null;
    if (d) d.open = true;
}

/** Toggle the nearest `ui-drawer` inside the closest `.story-root` ancestor. */
function toggleDrawer(e: Event) {
    const root = (e.currentTarget as HTMLElement).closest('.story-root');
    const d = root?.querySelector('ui-drawer') as UiDrawer | null;
    if (d) d.open = !d.open;
}

/** Close the closest `ui-drawer` ancestor. */
function closeDrawer(e: Event) {
    const d = (e.currentTarget as HTMLElement).closest('ui-drawer') as UiDrawer | null;
    if (d) d.open = false;
}

/** Close event from the drawer itself (e.target is the drawer). */
function onDrawerClose(e: Event) {
    (e.target as UiDrawer).open = false;
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
        <ui-box class="story-root" display="flex" alignItems="center" justifyContent="center" bgcolor="var(--ui-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="position:relative;height:320px;overflow:hidden;">

            <ui-drawer
                .open=${args.open}
                .anchor=${args.anchor}
                .variant=${'temporary'}
                container
                @ui-drawer-close=${onDrawerClose}
            >
                ${navContent()}
                <div style="padding:0 8px 12px;">
                    <ui-button @click=${closeDrawer} style="width:calc(100% - 16px);margin:0 8px;">Close</ui-button>
                </div>
            </ui-drawer>

            <ui-button @click=${openDrawer}>Open Drawer</ui-button>
            <p style="position:absolute;bottom:12px;left:0;right:0;text-align:center;font-size:.8rem;color:#94a3b8;margin:0;">
                Click the button · click the overlay or press Esc to close
            </p>
        </ui-box>
    `,
};

/* ================================================================== */
/*  Persistent                                                         */
/* ================================================================== */
export const Persistent: Story = {
    args: { open: true, variant: 'persistent' },
    render: (args) => html`
        <ui-paper class="story-root" elevation="1" style="display:flex;height:360px;overflow:hidden;">

            <ui-drawer .open=${args.open} .variant=${'persistent'}>
                ${navContent()}
            </ui-drawer>

            <div style="flex:1;padding:24px;overflow-y:auto;">
                <ui-stack direction="row" alignItems="center" justifyContent="space-between" mb="16px">
                    <h2 style="margin:0;font-size:1.25rem;">Persistent Drawer</h2>
                    <ui-button variant="outlined" @click=${toggleDrawer}>Toggle</ui-button>
                </div>
                <p>The persistent drawer sits on the same surface as the content.
                   It's closed by clicking Toggle — it does not use a backdrop.</p>
                ${Array.from({ length: 6 }).map(() => html`
                    <p style="color:#64748b;line-height:1.6;">
                        Content adapts and shifts width as the drawer opens and closes.
                        This is the recommended pattern for desktop-sized layouts.
                    </p>
                `)}
            </div>
        </ui-paper>
    `,
};

/* ================================================================== */
/*  Mini                                                               */
/* ================================================================== */
export const Mini: Story = {
    args: { open: false, variant: 'mini' },
    render: (args) => html`
        <ui-paper class="story-root" elevation="1" style="display:flex;height:360px;overflow:hidden;">

            <ui-drawer .open=${args.open} .variant=${'mini'}>
                <div style="width:250px;">
                    ${([
            { icon: '📥', label: 'Inbox' },
            { icon: '⭐', label: 'Starred' },
            { icon: '📝', label: 'Drafts' },
            { icon: '🗑️', label: 'Trash' },
            { icon: '⚙️', label: 'Settings' },
        ]).map(({ icon, label }) => html`
                        <ui-stack direction="row" alignItems="center" style="height:52px;cursor:pointer;transition:background .15s;"
                             onmouseover="this.style.background='rgba(0,0,0,.06)'"
                             onmouseout="this.style.background=''">
                            <span style="display:flex;align-items:center;justify-content:center;min-width:72px;font-size:22px;">${icon}</span>
                            <span data-drawer-hide-mini style="white-space:nowrap;font-size:.95rem;">${label}</span>
                        </ui-stack>
                    `)}
                </div>
            </ui-drawer>

            <div style="flex:1;padding:24px;overflow-y:auto;">
                <ui-stack direction="row" alignItems="center" justifyContent="space-between" mb="16px">
                    <h2 style="margin:0;font-size:1.25rem;">Mini Variant</h2>
                    <ui-button variant="outlined" @click=${toggleDrawer}>Toggle</ui-button>
                </div>
                <p>Icons are always visible. Expand to reveal full labels alongside them.</p>
                ${Array.from({ length: 8 }).map(() => html`
                    <p style="color:#64748b;line-height:1.6;">
                        Content stays visible at all times and the drawer width animates smoothly.
                    </p>
                `)}
            </div>
        </ui-paper>
    `,
};

/* ================================================================== */
/*  Edge Drawer                                                        */
/* ================================================================== */
export const EdgeDrawer: Story = {
    args: { open: false, anchor: 'bottom', edge: true },
    render: (args) => html`
        <ui-box class="story-root" display="flex" alignItems="center" justifyContent="center" bgcolor="var(--ui-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="position:relative;height:360px;overflow:hidden;">

            <p style="text-align:center;color:#64748b;">↓ Click the edge handle at the bottom to open</p>

            <ui-drawer
                .open=${args.open}
                .anchor=${'bottom'}
                ?edge=${args.edge}
                container
                @ui-drawer-close=${onDrawerClose}
            >
                <div style="padding:24px;min-height:180px;">
                    <h3 style="margin-top:0;">Swipeable Edge</h3>
                    <p>A small handle is visible when closed. Click it to open.</p>
                    <ui-button @click=${closeDrawer}>Close</ui-button>
                </div>
            </ui-drawer>
        </ui-box>
    `,
};

/* ================================================================== */
/*  Anchors                                                            */
/* ================================================================== */
export const Anchors: Story = {
    render: () => html`
        <ui-box class="story-root" display="flex" flexWrap="wrap" alignContent="flex-start" bgcolor="var(--ui-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" p="24px" style="position:relative;height:460px;overflow:hidden;gap:12px;">

            ${(['left', 'right', 'top', 'bottom'] as const).map(anchor => html`
                <ui-button variant="outlined"
                    @click=${(e: Event) => {
            const root = (e.currentTarget as HTMLElement).closest('.story-root');
            const d = root?.querySelector(`ui-drawer[data-anchor="${anchor}"]`) as UiDrawer | null;
            if (d) d.open = true;
        }}
                >Open ${anchor}</ui-button>

                <ui-drawer
                    data-anchor=${anchor}
                    .anchor=${anchor}
                    container
                    @ui-drawer-close=${onDrawerClose}
                >
                    <div style="padding:24px;min-width:${anchor === 'left' || anchor === 'right' ? '240px' : 'auto'};min-height:${anchor === 'top' || anchor === 'bottom' ? '160px' : 'auto'};">
                        <h3 style="margin-top:0;">${anchor[0].toUpperCase() + anchor.slice(1)} Drawer</h3>
                        <p>Anchored to the <strong>${anchor}</strong> side of this container.</p>
                        <ui-button @click=${closeDrawer}>Close</ui-button>
                    </div>
                </ui-drawer>
            `)}

            <p style="position:absolute;bottom:12px;left:0;right:0;text-align:center;font-size:.8rem;color:#94a3b8;margin:0;">
                All four anchors demonstrated — drawers are scoped to this container
            </p>
        </ui-box>
    `,
};
