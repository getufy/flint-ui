import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-toggle';
import '../button/flint-button';
import '../paper/flint-paper';

const meta: Meta = {
    title: 'Inputs/Toggle',
    component: 'flint-toggle',
    parameters: {
        docs: {
            description: {
                component: `
A two-state button that can be either on (pressed) or off.

- **Tag**: \`<flint-toggle>\`
- **Class**: \`FlintToggle\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`pressed\` | \`pressed\` | \`boolean\` | \`false\` | Whether the toggle is currently pressed (on). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the toggle is disabled. |
| \`variant\` | \`variant\` | \`'default' \\| 'outline'\` | \`'default'\` | Visual variant of the toggle. |
| \`size\` | \`size\` | \`'sm' \\| 'default' \\| 'lg'\` | \`'default'\` | Size of the toggle. |
| \`dir\` | \`dir\` | \`'ltr' \\| 'rtl'\` | \`'ltr'\` | Text direction for the toggle. |
| \`defaultPressed\` | \`default-pressed\` | \`boolean\` | \`false\` | Initial pressed state for uncontrolled mode. |
| \`ariaLabel\` | \`aria-label\` | \`string \\| null\` | \`null\` | Accessible label for icon-only toggles. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-toggle-change\` | — | Dispatched when the pressed state changes. Detail: \`{ pressed: boolean }\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Content to render inside the toggle (text, icons, or both). |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-toggle-border-radius\` | \`var(--flint-border-radius-md\` |
| \`--flint-toggle-padding-y\` | \`0.5rem\` |
| \`--flint-toggle-padding-x\` | \`0.75rem\` |
| \`--flint-toggle-min-width\` | \`2.25rem\` |
| \`--flint-toggle-min-height\` | \`2.25rem\` |
| \`--flint-toggle-font-size\` | \`0.875rem\` |
| \`--flint-toggle-color\` | \`var(--flint-text-color\` |
| \`--flint-toggle-bg\` | \`transparent\` |
| \`--flint-toggle-bg-hover\` | \`var(--flint-muted-background\` |
| \`--flint-toggle-color-hover\` | \`var(--flint-text-color\` |
| \`--flint-toggle-bg-pressed\` | \`var(--flint-primary-color-light\` |
| \`--flint-toggle-color-pressed\` | \`var(--flint-primary-color\` |
| \`--flint-toggle-bg-pressed-hover\` | \`var(--flint-primary-color-light-hover\` |
| \`--flint-toggle-padding-y-sm\` | \`0.375rem\` |
| \`--flint-toggle-padding-x-sm\` | \`0.625rem\` |
| \`--flint-toggle-padding-y-lg\` | \`0.625rem\` |
| \`--flint-toggle-padding-x-lg\` | \`1rem\` |
| \`--flint-toggle-border-color\` | \`var(--flint-border-color\` |
| \`--flint-toggle-border-pressed-color\` | \`var(--flint-primary-color-light-hover\` |
| \`--flint-font-family\` | — |
| \`--flint-primary-color\` | — |
                `,
            },
        },
    },
    argTypes: {
        pressed:        { control: 'boolean' },
        disabled:       { control: 'boolean' },
        variant:        { control: 'select', options: ['default', 'outline'] },
        size:           { control: 'select', options: ['sm', 'default', 'lg'] },
        dir:            { control: 'select', options: ['ltr', 'rtl'] },
        defaultPressed: { control: 'boolean' },
    },
    args: {
        pressed:        false,
        disabled:       false,
        variant:        'default',
        size:           'default',
        dir:            'ltr',
        defaultPressed: false,
    },
};

export default meta;
type Story = StoryObj;

/* ── shared SVG icons ──────────────────────────────────────────────── */

const boldIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
    </svg>
`;

const italicIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="4" x2="10" y2="4"></line>
        <line x1="14" y1="20" x2="5" y2="20"></line>
        <line x1="15" y1="4" x2="9" y2="20"></line>
    </svg>
`;

const underlineIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
        <line x1="4" y1="20" x2="20" y2="20"></line>
    </svg>
`;

const bookmarkIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
    </svg>
`;

/* ── Playground ─────────────────────────────────────────────────── */

export const Playground: Story = {
    // Hide pressed/defaultPressed — binding them to args would override the
    // component's own state on every re-render (when any other control changes).
    // Use the Controlled/Uncontrolled stories to test those props.
    argTypes: {
        pressed:        { table: { disable: true } },
        defaultPressed: { table: { disable: true } },
    },
    render: (args) => html`
        <flint-toggle
            ?disabled=${args.disabled}
            variant=${args.variant}
            size=${args.size}
            dir=${args.dir}
            @flint-toggle-change=${(e: CustomEvent<{ pressed: boolean }>) =>
                console.log('flint-toggle-change:', e.detail)}
        >
            ${bookmarkIcon} Bookmark
        </flint-toggle>
    `,
};

/* ── Default ────────────────────────────────────────────────────── */

export const Default: Story = {
    name: 'Default',
    render: () => html`
        <div style="display: flex; align-items: center; gap: 8px; padding: 24px;">
            <flint-toggle aria-label="Toggle bold">
                ${boldIcon}
            </flint-toggle>
            <flint-toggle aria-label="Toggle italic">
                ${italicIcon}
            </flint-toggle>
            <flint-toggle aria-label="Toggle underline">
                ${underlineIcon}
            </flint-toggle>
        </div>
    `,
};

/* ── Outline ────────────────────────────────────────────────────── */

export const Outline: Story = {
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 24px;">
            <flint-toggle variant="outline" aria-label="Toggle italic">
                ${italicIcon} Italic
            </flint-toggle>
            <flint-toggle variant="outline" aria-label="Toggle bold">
                ${boldIcon} Bold
            </flint-toggle>
            <flint-toggle variant="outline" aria-label="Toggle underline">
                ${underlineIcon} Underline
            </flint-toggle>
        </div>
    `,
};

/* ── WithText ───────────────────────────────────────────────────── */

export const WithText: Story = {
    name: 'With Text',
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 24px;">
            <flint-toggle aria-label="Toggle italic">
                ${italicIcon} Italic
            </flint-toggle>
            <flint-toggle variant="outline" aria-label="Toggle bold">
                ${boldIcon} Bold
            </flint-toggle>
            <flint-toggle aria-label="Toggle bookmark" size="sm" variant="outline">
                ${bookmarkIcon} Bookmark
            </flint-toggle>
        </div>
    `,
};

/* ── Sizes ──────────────────────────────────────────────────────── */

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px; padding: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <flint-toggle variant="outline" aria-label="Small toggle" size="sm">
                    ${italicIcon} Small
                </flint-toggle>
                <code style="font-size: 11px; color: #4b5563;">size="sm"</code>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <flint-toggle variant="outline" aria-label="Default toggle" size="default">
                    ${italicIcon} Default
                </flint-toggle>
                <code style="font-size: 11px; color: #4b5563;">size="default"</code>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <flint-toggle variant="outline" aria-label="Large toggle" size="lg">
                    ${italicIcon} Large
                </flint-toggle>
                <code style="font-size: 11px; color: #4b5563;">size="lg"</code>
            </div>
        </div>
    `,
};

/* ── Disabled ───────────────────────────────────────────────────── */

export const Disabled: Story = {
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 24px;">
            <flint-toggle disabled aria-label="Disabled default">
                ${boldIcon} Disabled
            </flint-toggle>
            <flint-toggle variant="outline" disabled aria-label="Disabled outline">
                ${italicIcon} Disabled Outline
            </flint-toggle>
            <flint-toggle disabled pressed aria-label="Disabled pressed">
                ${underlineIcon} Disabled Pressed
            </flint-toggle>
        </div>
    `,
};

/* ── Uncontrolled ───────────────────────────────────────────────── */

export const Uncontrolled: Story = {
    name: 'Uncontrolled (defaultPressed)',
    render: () => html`
        <div style="display: flex; align-items: center; gap: 8px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
                Starts pressed via <code>default-pressed</code>. State is self-managed.
            </p>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 0 24px 24px;">
            <flint-toggle default-pressed variant="outline" aria-label="Toggle bookmark">
                ${bookmarkIcon} Bookmark
            </flint-toggle>
        </div>
    `,
};

/* ── Controlled ─────────────────────────────────────────────────── */

export const Controlled: Story = {
    render: () => {
        let pressed = false;

        const handleChange = (e: Event) => {
            const host = (e.currentTarget as HTMLElement).closest('div')!;
            const toggle = host.querySelector('flint-toggle') as HTMLElement & { pressed: boolean };
            pressed = !pressed;
            toggle.pressed = pressed;
            const status = host.querySelector<HTMLElement>('#ctrl-status');
            if (status) status.textContent = pressed ? 'On' : 'Off';
        };

        return html`
            <div style="display: flex; flex-direction: column; gap: 12px; padding: 24px;">
                <p style="margin: 0; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
                    Pressed state is controlled externally by the button below.
                </p>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <flint-toggle variant="outline" aria-label="Toggle italic">
                        ${italicIcon} Italic
                    </flint-toggle>
                    <span style="font-size: 0.875rem; font-family: system-ui; color: #374151;">
                        State: <strong id="ctrl-status">Off</strong>
                    </span>
                </div>
                <flint-button variant="outlined" style="align-self: flex-start; font-size: 0.8125rem;" @click=${handleChange}>
                    Toggle externally
                </flint-button>
            </div>
        `;
    },
};

/* ── Toolbar ────────────────────────────────────────────────────── */

export const Toolbar: Story = {
    name: 'Toolbar Example',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
                A formatting toolbar with independent toggle states. Each button manages its own state.
            </p>
            <flint-paper
                role="toolbar"
                aria-label="Text formatting"
                elevation="0"
                variant="outlined"
                style="display: inline-flex; align-items: center; gap: 2px; padding: 4px;"
            >
                <flint-toggle variant="outline" aria-label="Bold">
                    ${boldIcon}
                </flint-toggle>
                <flint-toggle variant="outline" aria-label="Italic">
                    ${italicIcon}
                </flint-toggle>
                <flint-toggle variant="outline" aria-label="Underline">
                    ${underlineIcon}
                </flint-toggle>
                <div style="width: 1px; height: 20px; background: #e5e7eb; margin: 0 4px;"></div>
                <flint-toggle variant="outline" size="sm" aria-label="Bookmark">
                    ${bookmarkIcon} Save
                </flint-toggle>
            </flint-paper>
        </div>
    `,
};

/* ── RTL ────────────────────────────────────────────────────────── */

export const RTL: Story = {
    name: 'RTL',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
                Right-to-left layout via <code>dir="rtl"</code>.
            </p>
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
                <flint-toggle dir="rtl" variant="outline" aria-label="إشارة مرجعية" size="sm">
                    ${bookmarkIcon} إشارة مرجعية
                </flint-toggle>
            </div>
        </div>
    `,
};
