import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiSpeedDial } from './ui-speed-dial';
import './ui-speed-dial';

const meta: Meta = {
    title: 'Navigation/Speed Dial',
    component: 'ui-speed-dial',
    argTypes: {
        open: { control: 'boolean' },
        direction: { control: { type: 'select' }, options: ['up', 'down', 'left', 'right'] },
        hidden: { control: 'boolean' },
        persistentTooltips: { control: 'boolean' },
        isTouch: { control: 'boolean' },
        closeIcon: { control: 'text' },
    },
};
export default meta;
type Story = StoryObj;

/* ── Shared action set ──────────────────────────────────────────────── */
const actions = () => html`
    <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
    <ui-speed-dial-action tooltip-title="Print">🖨️</ui-speed-dial-action>
    <ui-speed-dial-action tooltip-title="Share">🔗</ui-speed-dial-action>
    <ui-speed-dial-action tooltip-title="Save">💾</ui-speed-dial-action>
`;


const stageCorner = (content: unknown, corner = 'bottom-right') => {
    const pos: Record<string, string> = {
        'bottom-right': 'bottom:24px;right:24px',
        'bottom-left': 'bottom:24px;left:24px',
        'top-right': 'top:24px;right:24px',
        'top-left': 'top:24px;left:24px',
        'center': 'top:50%;left:50%;transform:translate(-50%,-50%)',
    };
    return html`
        <div style="
            position:relative;
            height:280px;
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:8px;
            overflow:hidden;
            font-family:Inter,sans-serif;
        ">
            <div style="position:absolute;${pos[corner]}">
                ${content}
            </div>
        </div>
    `;
};

/* ================================================================== */
/* Playground                                                          */
/* ================================================================== */
export const Playground: Story = {
    args: {
        open: false, direction: 'up', hidden: false,
        persistentTooltips: false, isTouch: false, closeIcon: '',
    },
    render: (args) => stageCorner(html`
        <ui-speed-dial
            .open=${args.open}
            .direction=${args.direction as UiSpeedDial['direction']}
            ?hidden=${args.hidden}
            ?persistentTooltips=${args.persistentTooltips}
            ?isTouch=${args.isTouch}
            .closeIcon=${args.closeIcon}
            aria-label="Speed dial"
            @ui-speed-dial-open=${(e: Event) => { (e.target as UiSpeedDial).open = true; }}
            @ui-speed-dial-close=${(e: Event) => { (e.target as UiSpeedDial).open = false; }}
        >
            ${actions()}
        </ui-speed-dial>
    `, 'bottom-right'),
};

/* ================================================================== */
/* Basic (direction up)                                               */
/* ================================================================== */
export const Basic: Story = {
    render: () => stageCorner(html`
        <ui-speed-dial
            aria-label="Speed dial — basic"
            @ui-speed-dial-open=${(e: Event) => { (e.target as UiSpeedDial).open = true; }}
            @ui-speed-dial-close=${(e: Event) => { (e.target as UiSpeedDial).open = false; }}
        >
            ${actions()}
        </ui-speed-dial>
    `, 'bottom-right'),
};

/* ================================================================== */
/* Directions                                                          */
/* ================================================================== */
export const Directions: Story = {
    render: () => html`
        <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:16px;
            font-family:Inter,sans-serif;
        ">
            ${(['up', 'down', 'left', 'right'] as const).map(dir => html`
                <div style="
                    position:relative;
                    height:220px;
                    background:#f8fafc;
                    border:1px solid #e2e8f0;
                    border-radius:8px;
                    overflow:hidden;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                ">
                    <span style="
                        position:absolute;
                        top:8px;left:12px;
                        font-size:.7rem;color:#94a3b8;
                        text-transform:uppercase;letter-spacing:.06em;
                    ">${dir}</span>
                    <ui-speed-dial
                        direction=${dir}
                        open
                        aria-label=${'Direction ' + dir}
                    >
                        <ui-speed-dial-action tooltip-title="Copy">📋</ui-speed-dial-action>
                        <ui-speed-dial-action tooltip-title="Print">🖨️</ui-speed-dial-action>
                        <ui-speed-dial-action tooltip-title="Share">🔗</ui-speed-dial-action>
                    </ui-speed-dial>
                </div>
            `)}
        </div>
    `,
};

/* ================================================================== */
/* Controlled State                                                    */
/* ================================================================== */
export const Controlled: Story = {
    render: () => {
        /* ── shared sync helper ── */
        function syncLabel(open: boolean) {
            const label = document.getElementById('sd-state-label');
            if (label) label.textContent = open ? 'Open' : 'Closed';
        }

        function getSD() {
            return document.getElementById('sd-controlled') as UiSpeedDial | null;
        }

        return html`
            <div style="display:flex;flex-direction:column;gap:16px;font-family:Inter,sans-serif;">

                <!-- External controls row -->
                <div style="
                    display:flex;align-items:center;gap:12px;
                    padding:12px 16px;background:#fff;
                    border:1px solid #e2e8f0;border-radius:8px;
                ">
                    <span style="font-size:.875rem;color:#64748b;">State:</span>
                    <strong id="sd-state-label" style="font-size:.875rem;color:#374151;">Closed</strong>

                    <!-- Open button -->
                    <button
                        style="padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;
                               background:#3b82f6;color:#fff;border:none;cursor:pointer;"
                        @click=${() => {
                const sd = getSD();
                if (sd && !sd.open) { sd.open = true; syncLabel(true); }
            }}
                    >Open</button>

                    <!-- Close button -->
                    <button
                        style="padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;
                               background:#fff;color:#374151;border:1px solid #e2e8f0;cursor:pointer;"
                        @click=${() => {
                const sd = getSD();
                if (sd && sd.open) { sd.open = false; syncLabel(false); }
            }}
                    >Close</button>
                </div>

                <!-- Stage -->
                <div style="
                    position:relative;height:280px;
                    background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
                ">
                    <div style="position:absolute;bottom:24px;right:24px;">
                        <ui-speed-dial
                            id="sd-controlled"
                            aria-label="Controlled speed dial"
                            @ui-speed-dial-open=${() => syncLabel(true)}
                            @ui-speed-dial-close=${(e: Event) => {
                (e.target as UiSpeedDial).open = false;
                syncLabel(false);
            }}
                        >
                            ${actions()}
                        </ui-speed-dial>
                    </div>
                </div>
            </div>
        `;
    },
};


/* ================================================================== */
/* Custom Close Icon                                                   */
/* ================================================================== */
export const CustomCloseIcon: Story = {
    render: () => stageCorner(html`
        <ui-speed-dial
            aria-label="Custom close icon"
            close-icon="✖"
            @ui-speed-dial-open=${(e: Event) => { (e.target as UiSpeedDial).open = true; }}
            @ui-speed-dial-close=${(e: Event) => { (e.target as UiSpeedDial).open = false; }}
        >
            <!-- Custom FAB icon via slot -->
            <span slot="icon" style="font-size:1.4rem;">✏️</span>
            ${actions()}
        </ui-speed-dial>
    `, 'bottom-right'),
};

/* ================================================================== */
/* Persistent Tooltips (isTouch simulation)                           */
/* ================================================================== */
export const PersistentTooltips: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:16px;font-family:Inter,sans-serif;">
            <div style="
                padding:10px 14px;background:#eff6ff;border:1px solid #bfdbfe;
                border-radius:6px;font-size:.8rem;color:#1e40af;
            ">
                ℹ️ Tooltips are always shown when <code>persistent-tooltips</code> or <code>is-touch</code> is set — ideal for touch / accessibility.
            </div>
            <div style="
                position:relative;height:300px;
                background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
            ">
                <div style="position:absolute;bottom:24px;right:80px;">
                    <ui-speed-dial
                        persistent-tooltips
                        open
                        aria-label="Persistent tooltips speed dial"
                    >
                        <ui-speed-dial-action tooltip-title="Copy link">🔗</ui-speed-dial-action>
                        <ui-speed-dial-action tooltip-title="Edit">✏️</ui-speed-dial-action>
                        <ui-speed-dial-action tooltip-title="Delete">🗑️</ui-speed-dial-action>
                    </ui-speed-dial>
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Hidden                                                              */
/* ================================================================== */
export const Hidden: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:16px;font-family:Inter,sans-serif;">
            <div style="display:flex;align-items:center;gap:10px;">
                <button
                    style="
                        padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;
                        background:#3b82f6;color:#fff;border:none;cursor:pointer;
                    "
                    @click=${() => {
            const sd = document.getElementById('sd-hidden') as UiSpeedDial;
            if (sd) sd.hidden = !sd.hidden;
            const btn = document.querySelector('#sd-hidden-toggle') as HTMLButtonElement;
            if (btn) btn.textContent = sd?.hidden ? 'Show Speed Dial' : 'Hide Speed Dial';
        }}
                    id="sd-hidden-toggle"
                >Hide Speed Dial</button>
                <span style="font-size:.8rem;color:#94a3b8;">Toggle the hidden state</span>
            </div>

            <div style="
                position:relative;height:280px;
                background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
            ">
                <div style="position:absolute;bottom:24px;right:24px;">
                    <ui-speed-dial
                        id="sd-hidden"
                        aria-label="Hideable speed dial"
                        @ui-speed-dial-open=${(e: Event) => { (e.target as UiSpeedDial).open = true; }}
                        @ui-speed-dial-close=${(e: Event) => { (e.target as UiSpeedDial).open = false; }}
                    >
                        ${actions()}
                    </ui-speed-dial>
                </div>
            </div>
        </div>
    `,
};
