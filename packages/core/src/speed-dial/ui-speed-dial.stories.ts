import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiSpeedDial } from './ui-speed-dial';
import './ui-speed-dial';
import '../stack/ui-stack';
import '../box/ui-box';

const meta: Meta = {
    title: 'Navigation/Speed Dial',
    component: 'ui-speed-dial',
    argTypes: {
        open: { control: 'boolean' },
        direction: { control: { type: 'select' }, options: ['up', 'down', 'left', 'right'] },
        hidden: { control: 'boolean' },
        disabled: { control: 'boolean' },
        persistentTooltips: { control: 'boolean' },
        isTouch: { control: 'boolean' },
        closeIcon: { control: 'text' },
    },
    args: {
        open: false,
        direction: 'up',
        hidden: false,
        disabled: false,
        persistentTooltips: false,
        isTouch: false,
        closeIcon: '',
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
            background:var(--ui-muted-background, #f8fafc);
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
                <ui-box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style="
                        position:relative;
                        height:220px;
                        background:var(--ui-muted-background, #f8fafc);
                        border:1px solid #e2e8f0;
                        border-radius:8px;
                        overflow:hidden;
                    "
                >
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
                </ui-box>
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
            <ui-stack direction="column" gap="16px" style="font-family:Inter,sans-serif;">

                <!-- External controls row -->
                <ui-stack direction="row" alignItems="center" gap="12px" p="12px 16px" bgcolor="var(--ui-background, #fff)" border="1px solid #e2e8f0" borderRadius="8px">
                    <span style="font-size:.875rem;color:#64748b;">State:</span>
                    <strong id="sd-state-label" style="font-size:.875rem;color:#374151;">Closed</strong>

                    <!-- Open button -->
                    <button
                        style="padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;
                               background:var(--ui-primary-color, #3b82f6);color:#fff;border:none;cursor:pointer;"
                        @click=${() => {
                const sd = getSD();
                if (sd && !sd.open) { sd.open = true; syncLabel(true); }
            }}
                    >Open</button>

                    <!-- Close button -->
                    <button
                        style="padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;
                               background:var(--ui-background, #fff);color:#374151;border:1px solid #e2e8f0;cursor:pointer;"
                        @click=${() => {
                const sd = getSD();
                if (sd && sd.open) { sd.open = false; syncLabel(false); }
            }}
                    >Close</button>
                </ui-stack>

                <!-- Stage -->
                <div style="
                    position:relative;height:280px;
                    background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
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
        <ui-stack direction="column" gap="16px" style="font-family:Inter,sans-serif;">
            <div style="
                padding:10px 14px;background:var(--ui-info-background, #eff6ff);border:1px solid #bfdbfe;
                border-radius:6px;font-size:.8rem;color:#1e40af;
            ">
                ℹ️ Tooltips are always shown when <code>persistent-tooltips</code> or <code>is-touch</code> is set — ideal for touch / accessibility.
            </div>
            <div style="
                position:relative;height:300px;
                background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
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
        <ui-stack direction="column" gap="16px" style="font-family:Inter,sans-serif;">
            <ui-stack direction="row" alignItems="center" gap="10px">
                <button
                    style="
                        padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;
                        background:var(--ui-primary-color, #3b82f6);color:#fff;border:none;cursor:pointer;
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
            </ui-stack>

            <div style="
                position:relative;height:280px;
                background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
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

/* ================================================================== */
/* Disabled Actions                                                    */
/* ================================================================== */
export const DisabledActions: Story = {
    render: () => stageCorner(html`
        <ui-speed-dial
            open
            aria-label="Speed dial with disabled actions"
        >
            <ui-speed-dial-action tooltip-title="Copy" name="copy">📋</ui-speed-dial-action>
            <ui-speed-dial-action tooltip-title="Print (unavailable)" name="print" disabled>🖨️</ui-speed-dial-action>
            <ui-speed-dial-action tooltip-title="Share" name="share">🔗</ui-speed-dial-action>
            <ui-speed-dial-action tooltip-title="Delete (unavailable)" name="delete" disabled>🗑️</ui-speed-dial-action>
        </ui-speed-dial>
    `, 'center'),
};

/* ================================================================== */
/* Disabled Dial                                                       */
/* ================================================================== */
export const DisabledDial: Story = {
    render: () => stageCorner(html`
        <ui-speed-dial
            disabled
            aria-label="Disabled speed dial"
        >
            ${actions()}
        </ui-speed-dial>
    `, 'center'),
};

/* ================================================================== */
/* Touch Mode (persistent tooltips)                                    */
/* ================================================================== */
export const TouchMode: Story = {
    render: () => html`
        <ui-stack direction="column" gap="16px" style="font-family:Inter,sans-serif;">
            <div style="
                padding:10px 14px;background:var(--ui-info-background, #eff6ff);border:1px solid #bfdbfe;
                border-radius:6px;font-size:.8rem;color:#1e40af;
            ">
                ℹ️ <code>is-touch</code> simulates a touch device — tooltips are always visible when open,
                matching expected behaviour on mobile where hover is unavailable.
            </div>
            <div style="
                position:relative;height:300px;
                background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
            ">
                <div style="position:absolute;bottom:24px;right:80px;">
                    <ui-speed-dial
                        is-touch
                        open
                        aria-label="Touch mode speed dial"
                    >
                        <ui-speed-dial-action tooltip-title="Copy link" name="copy-link">🔗</ui-speed-dial-action>
                        <ui-speed-dial-action tooltip-title="Edit" name="edit">✏️</ui-speed-dial-action>
                        <ui-speed-dial-action tooltip-title="Delete" name="delete">🗑️</ui-speed-dial-action>
                    </ui-speed-dial>
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Custom Open Icon (slot="icon")                                      */
/* ================================================================== */
export const CustomOpenIcon: Story = {
    render: () => stageCorner(html`
        <ui-speed-dial
            aria-label="Custom open icon speed dial"
            @ui-speed-dial-open=${(e: Event) => { (e.target as UiSpeedDial).open = true; }}
            @ui-speed-dial-close=${(e: Event) => { (e.target as UiSpeedDial).open = false; }}
        >
            <!-- Override the default + icon shown when closed -->
            <span slot="icon" style="font-size:1.4rem;line-height:1;">✏️</span>
            <!-- Override the default ✕ icon shown when open -->
            <span slot="open-icon" style="font-size:1.4rem;line-height:1;">✖</span>
            ${actions()}
        </ui-speed-dial>
    `, 'center'),
};

/* ================================================================== */
/* With Names (programmatic click handling)                            */
/* ================================================================== */
export const WithNames: Story = {
    render: () => html`
        <ui-stack direction="column" gap="16px" style="font-family:Inter,sans-serif;">
            <div style="
                padding:10px 14px;background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:6px;
                font-size:.8rem;color:#64748b;
            ">
                Last action: <strong id="sd-last-action" style="color:#374151;">—</strong>
            </div>
            <div style="
                position:relative;height:280px;
                background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
            ">
                <div style="position:absolute;bottom:24px;right:24px;">
                    <ui-speed-dial
                        aria-label="Named actions speed dial"
                        @ui-speed-dial-open=${(e: Event) => { (e.target as UiSpeedDial).open = true; }}
                        @ui-speed-dial-close=${(e: Event) => { (e.target as UiSpeedDial).open = false; }}
                        @ui-speed-dial-action-click=${(e: CustomEvent) => {
                            const label = document.getElementById('sd-last-action');
                            if (label) label.textContent = `${e.detail.name} (${e.detail.tooltipTitle})`;
                        }}
                    >
                        <ui-speed-dial-action name="copy"  tooltip-title="Copy">📋</ui-speed-dial-action>
                        <ui-speed-dial-action name="print" tooltip-title="Print">🖨️</ui-speed-dial-action>
                        <ui-speed-dial-action name="share" tooltip-title="Share">🔗</ui-speed-dial-action>
                        <ui-speed-dial-action name="save"  tooltip-title="Save">💾</ui-speed-dial-action>
                    </ui-speed-dial>
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Keyboard Navigation (annotated)                                     */
/* ================================================================== */
export const KeyboardNavigation: Story = {
    render: () => html`
        <ui-stack direction="row" gap="24px" alignItems="flex-start" style="font-family:Inter,sans-serif;flex-wrap:wrap;">

            <!-- Cheat sheet -->
            <div style="
                flex:0 0 auto;padding:16px 20px;
                background:var(--ui-background, #fff);border:1px solid #e2e8f0;border-radius:8px;
                font-size:.8rem;color:#374151;min-width:220px;
            ">
                <div style="font-weight:600;margin-bottom:10px;color:#111827;">Keyboard shortcuts</div>
                <table style="border-collapse:collapse;width:100%;">
                    <tbody>
                        ${([
                            ['Tab', 'Focus the FAB → opens dial'],
                            ['Space / Enter', 'Toggle open / trigger action'],
                            ['↑ ↓ ← →', 'Navigate between actions'],
                            ['Home', 'Jump to first action'],
                            ['End', 'Jump to last action'],
                            ['Escape', 'Close dial, return focus'],
                            ['Tab away', 'Close dial automatically'],
                        ] as [string, string][]).map(([key, desc]) => html`
                            <tr>
                                <td style="padding:4px 8px 4px 0;white-space:nowrap;">
                                    <kbd style="
                                        background:var(--ui-muted-background-light, #f1f5f9);border:1px solid #cbd5e1;
                                        border-radius:4px;padding:1px 6px;font-size:.75rem;
                                        font-family:monospace;
                                    ">${key}</kbd>
                                </td>
                                <td style="padding:4px 0;color:#64748b;">${desc}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>

            <!-- Live demo -->
            <div style="flex:1 1 auto;">
                <div style="
                    position:relative;height:280px;min-width:200px;
                    background:var(--ui-muted-background, #f8fafc);border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;
                ">
                    <div style="position:absolute;bottom:24px;right:24px;">
                        <ui-speed-dial
                            aria-label="Keyboard navigation demo"
                            @ui-speed-dial-open=${(e: Event) => { (e.target as UiSpeedDial).open = true; }}
                            @ui-speed-dial-close=${(e: Event) => { (e.target as UiSpeedDial).open = false; }}
                        >
                            <ui-speed-dial-action name="copy"  tooltip-title="Copy">📋</ui-speed-dial-action>
                            <ui-speed-dial-action name="print" tooltip-title="Print">🖨️</ui-speed-dial-action>
                            <ui-speed-dial-action name="share" tooltip-title="Share">🔗</ui-speed-dial-action>
                        </ui-speed-dial>
                    </div>
                </div>
            </div>
        </div>
    `,
};
