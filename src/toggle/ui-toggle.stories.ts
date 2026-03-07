import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-toggle';

const meta: Meta = {
    title: 'Inputs/Toggle',
    component: 'ui-toggle',
    parameters: {
        docs: {
            description: {
                component: `
A two-state button that can be either on or off. Useful for formatting toolbars, settings panels, and any on/off action that lives in the UI without a separate label.

### Usage
\`\`\`html
<ui-toggle>Bold</ui-toggle>
<ui-toggle variant="outline" pressed>Italic</ui-toggle>
\`\`\`

### Controlled usage
\`\`\`html
<ui-toggle .pressed=\${value} @ui-toggle-change=\${e => value = e.detail.pressed}>
  Bold
</ui-toggle>
\`\`\`

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-toggle-bg\` | \`transparent\` | Default background |
| \`--ui-toggle-bg-hover\` | muted background | Hover background |
| \`--ui-toggle-bg-pressed\` | primary light | Pressed background |
| \`--ui-toggle-bg-pressed-hover\` | primary light hover | Pressed + hover background |
| \`--ui-toggle-color\` | text color | Default text/icon color |
| \`--ui-toggle-color-pressed\` | primary color | Pressed text/icon color |
| \`--ui-toggle-border-color\` | border color | Border (outline variant) |
| \`--ui-toggle-border-pressed-color\` | primary light hover | Border when pressed (outline) |
| \`--ui-toggle-border-radius\` | \`var(--ui-border-radius-md)\` | Border radius |
| \`--ui-toggle-font-size\` | \`0.875rem\` | Font size |
| \`--ui-toggle-padding-x\` | \`0.75rem\` | Horizontal padding |
| \`--ui-toggle-padding-y\` | \`0.5rem\` | Vertical padding |
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
        <ui-toggle
            ?disabled=${args.disabled}
            variant=${args.variant}
            size=${args.size}
            dir=${args.dir}
            @ui-toggle-change=${(e: CustomEvent<{ pressed: boolean }>) =>
                console.log('ui-toggle-change:', e.detail)}
        >
            ${bookmarkIcon} Bookmark
        </ui-toggle>
    `,
};

/* ── Default ────────────────────────────────────────────────────── */

export const Default: Story = {
    name: 'Default',
    render: () => html`
        <div style="display: flex; align-items: center; gap: 8px; padding: 24px;">
            <ui-toggle aria-label="Toggle bold">
                ${boldIcon}
            </ui-toggle>
            <ui-toggle aria-label="Toggle italic">
                ${italicIcon}
            </ui-toggle>
            <ui-toggle aria-label="Toggle underline">
                ${underlineIcon}
            </ui-toggle>
        </div>
    `,
};

/* ── Outline ────────────────────────────────────────────────────── */

export const Outline: Story = {
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 24px;">
            <ui-toggle variant="outline" aria-label="Toggle italic">
                ${italicIcon} Italic
            </ui-toggle>
            <ui-toggle variant="outline" aria-label="Toggle bold">
                ${boldIcon} Bold
            </ui-toggle>
            <ui-toggle variant="outline" aria-label="Toggle underline">
                ${underlineIcon} Underline
            </ui-toggle>
        </div>
    `,
};

/* ── WithText ───────────────────────────────────────────────────── */

export const WithText: Story = {
    name: 'With Text',
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 24px;">
            <ui-toggle aria-label="Toggle italic">
                ${italicIcon} Italic
            </ui-toggle>
            <ui-toggle variant="outline" aria-label="Toggle bold">
                ${boldIcon} Bold
            </ui-toggle>
            <ui-toggle aria-label="Toggle bookmark" size="sm" variant="outline">
                ${bookmarkIcon} Bookmark
            </ui-toggle>
        </div>
    `,
};

/* ── Sizes ──────────────────────────────────────────────────────── */

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px; padding: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <ui-toggle variant="outline" aria-label="Small toggle" size="sm">
                    ${italicIcon} Small
                </ui-toggle>
                <code style="font-size: 11px; color: #6b7280;">size="sm"</code>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <ui-toggle variant="outline" aria-label="Default toggle" size="default">
                    ${italicIcon} Default
                </ui-toggle>
                <code style="font-size: 11px; color: #6b7280;">size="default"</code>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <ui-toggle variant="outline" aria-label="Large toggle" size="lg">
                    ${italicIcon} Large
                </ui-toggle>
                <code style="font-size: 11px; color: #6b7280;">size="lg"</code>
            </div>
        </div>
    `,
};

/* ── Disabled ───────────────────────────────────────────────────── */

export const Disabled: Story = {
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 24px;">
            <ui-toggle disabled aria-label="Disabled default">
                ${boldIcon} Disabled
            </ui-toggle>
            <ui-toggle variant="outline" disabled aria-label="Disabled outline">
                ${italicIcon} Disabled Outline
            </ui-toggle>
            <ui-toggle disabled pressed aria-label="Disabled pressed">
                ${underlineIcon} Disabled Pressed
            </ui-toggle>
        </div>
    `,
};

/* ── Uncontrolled ───────────────────────────────────────────────── */

export const Uncontrolled: Story = {
    name: 'Uncontrolled (defaultPressed)',
    render: () => html`
        <div style="display: flex; align-items: center; gap: 8px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Starts pressed via <code>default-pressed</code>. State is self-managed.
            </p>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 0 24px 24px;">
            <ui-toggle default-pressed variant="outline" aria-label="Toggle bookmark">
                ${bookmarkIcon} Bookmark
            </ui-toggle>
        </div>
    `,
};

/* ── Controlled ─────────────────────────────────────────────────── */

export const Controlled: Story = {
    render: () => {
        let pressed = false;

        const handleChange = (e: Event) => {
            const host = (e.currentTarget as HTMLElement).closest('div')!;
            const toggle = host.querySelector('ui-toggle') as HTMLElement & { pressed: boolean };
            pressed = !pressed;
            toggle.pressed = pressed;
            const status = host.querySelector<HTMLElement>('#ctrl-status');
            if (status) status.textContent = pressed ? 'On' : 'Off';
        };

        return html`
            <div style="display: flex; flex-direction: column; gap: 12px; padding: 24px;">
                <p style="margin: 0; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                    Pressed state is controlled externally by the button below.
                </p>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <ui-toggle variant="outline" aria-label="Toggle italic">
                        ${italicIcon} Italic
                    </ui-toggle>
                    <span style="font-size: 0.875rem; font-family: system-ui; color: #374151;">
                        State: <strong id="ctrl-status">Off</strong>
                    </span>
                </div>
                <button
                    style="align-self: flex-start; padding: 6px 14px; border-radius: 6px; border: 1px solid #d1d5db; background: #f9fafb; font-size: 0.8125rem; cursor: pointer; font-family: system-ui;"
                    @click=${handleChange}
                >
                    Toggle externally
                </button>
            </div>
        `;
    },
};

/* ── Toolbar ────────────────────────────────────────────────────── */

export const Toolbar: Story = {
    name: 'Toolbar Example',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                A formatting toolbar with independent toggle states. Each button manages its own state.
            </p>
            <div
                role="toolbar"
                aria-label="Text formatting"
                style="display: inline-flex; align-items: center; gap: 2px; padding: 4px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff;"
            >
                <ui-toggle variant="outline" aria-label="Bold">
                    ${boldIcon}
                </ui-toggle>
                <ui-toggle variant="outline" aria-label="Italic">
                    ${italicIcon}
                </ui-toggle>
                <ui-toggle variant="outline" aria-label="Underline">
                    ${underlineIcon}
                </ui-toggle>
                <div style="width: 1px; height: 20px; background: #e5e7eb; margin: 0 4px;"></div>
                <ui-toggle variant="outline" size="sm" aria-label="Bookmark">
                    ${bookmarkIcon} Save
                </ui-toggle>
            </div>
        </div>
    `,
};

/* ── RTL ────────────────────────────────────────────────────────── */

export const RTL: Story = {
    name: 'RTL',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Right-to-left layout via <code>dir="rtl"</code>.
            </p>
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
                <ui-toggle dir="rtl" variant="outline" aria-label="إشارة مرجعية" size="sm">
                    ${bookmarkIcon} إشارة مرجعية
                </ui-toggle>
            </div>
        </div>
    `,
};
