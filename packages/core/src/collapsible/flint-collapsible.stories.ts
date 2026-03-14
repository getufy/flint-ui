import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-collapsible';
import '../button/flint-button.js';

const meta: Meta = {
    title: 'Surfaces/Collapsible',
    component: 'flint-collapsible',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-collapsible-trigger>\`

Toggle button for a collapsible. Place inside \`flint-collapsible\`. Automatically wires up to the nearest \`flint-collapsible\` ancestor.

- **Tag**: \`<flint-collapsible-trigger>\`
- **Class**: \`FlintCollapsibleTrigger\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`expanded\` | \`expanded\` | \`boolean\` | \`false\` | Reflects the parent collapsible's open state. Set by \`flint-collapsible\`. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the trigger. Set by \`flint-collapsible\` or directly. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Trigger label or any content (icon, text, avatar…). |

---

#### \`<flint-collapsible-content>\`

The collapsible panel. Animates open/closed with a CSS grid transition. Place inside \`flint-collapsible\`; its \`open\` state is managed automatically.

- **Tag**: \`<flint-collapsible-content>\`
- **Class**: \`FlintCollapsibleContent\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the panel is visible. Managed by the parent \`flint-collapsible\`. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Content to reveal when expanded. |

---

#### \`<flint-collapsible>\`

Root container for a collapsible panel. Manages open/closed state and coordinates child trigger and content.

- **Tag**: \`<flint-collapsible>\`
- **Class**: \`FlintCollapsible\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the panel is open. Reflects to attribute for CSS targeting. |
| \`defaultOpen\` | \`default-open\` | \`boolean\` | \`false\` | Initial open state for uncontrolled usage. Has no effect after the element has connected to the DOM. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the trigger, preventing user interaction. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-collapsible-change\` | — | Fired when the open state changes. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts \`flint-collapsible-trigger\`, \`flint-collapsible-content\`, and any |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-collapsible-duration\` | \`200ms\` |
| \`--flint-collapsible-easing\` | \`ease\` |

#### Methods

| Method | Description |
|---|---|
| \`toggle()\` | Toggle the open state and fire \`flint-collapsible-change\`. |
                `,
            },
        },
    },
    argTypes: {
        open:        { control: 'boolean' },
        disabled:    { control: 'boolean' },
        defaultOpen: { control: 'boolean' },
    },
    args: {
        open: false,
        disabled: false,
        defaultOpen: false,
    },
};

export default meta;
type Story = StoryObj;

/* ── shared SVG icons ──────────────────────────────────────────────── */

const chevronDownIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
         style="transition: transform 200ms ease; flex-shrink: 0;">
        <path d="m6 9 6 6 6-6"></path>
    </svg>
`;

const starIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
`;

const cardStyle = `
    border: 1px solid #e5e7eb; border-radius: 8px;
    font-family: var(--flint-font-family, system-ui, sans-serif); overflow: hidden;
`;
const triggerRowStyle = `
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; font-size: 0.9375rem; font-weight: 500;
    color: var(--flint-text-color, #111827); width: 100%;
`;
const contentBodyStyle = `
    padding: 0 16px 14px; font-size: 0.875rem; line-height: 1.6;
    color: var(--flint-text-color-muted, #6b7280);
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    render: (args) => html`
        <div style="max-width: 480px; padding: 24px;">
            <flint-collapsible
                ?open=${args.open}
                ?disabled=${args.disabled}
                @flint-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                    const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                }}
            >
                <div style=${cardStyle}>
                    <flint-collapsible-trigger>
                        <div style=${triggerRowStyle}>
                            <span>What is a collapsible?</span>
                            ${chevronDownIcon}
                        </div>
                    </flint-collapsible-trigger>
                    <flint-collapsible-content>
                        <div style=${contentBodyStyle}>
                            A collapsible is an interactive component that reveals or hides
                            content when a trigger is activated. Use it to progressively
                            disclose information and keep interfaces uncluttered.
                        </div>
                    </flint-collapsible-content>
                </div>
            </flint-collapsible>
        </div>
    `,
};

/* ── DefaultOpen ─────────────────────────────────────────────────── */
export const DefaultOpen: Story = {
    name: 'Default Open',
    args: { defaultOpen: true },
    render: (args) => html`
        <div style="max-width: 480px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Starts open via <code>default-open</code> attribute (uncontrolled).
            </p>
            <flint-collapsible ?default-open=${args.defaultOpen} ?disabled=${args.disabled}
                @flint-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                    const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                }}
            >
                <div style=${cardStyle}>
                    <flint-collapsible-trigger>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; font-size: 0.9375rem; font-weight: 500; color: var(--flint-text-color, #111827); width: 100%;">
                            <span>Already expanded</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                 style="transition: transform 200ms ease; transform: rotate(180deg); flex-shrink: 0;">
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </div>
                    </flint-collapsible-trigger>
                    <flint-collapsible-content>
                        <div style=${contentBodyStyle}>
                            This panel was open from the moment the page loaded, thanks to
                            <code>default-open</code>. The component manages its own state
                            without any external controller.
                        </div>
                    </flint-collapsible-content>
                </div>
            </flint-collapsible>
        </div>
    `,
};

/* ── Disabled ────────────────────────────────────────────────────── */
export const Disabled: Story = {
    args: { disabled: true },
    render: (args) => html`
        <div style="max-width: 480px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Trigger is inert when <code>disabled</code> is set.
            </p>
            <flint-collapsible ?disabled=${args.disabled}>
                <div style=${cardStyle}>
                    <flint-collapsible-trigger>
                        <div style=${triggerRowStyle}>
                            <span>Cannot be toggled</span>
                            ${chevronDownIcon}
                        </div>
                    </flint-collapsible-trigger>
                    <flint-collapsible-content>
                        <div style=${contentBodyStyle}>
                            You should not see this.
                        </div>
                    </flint-collapsible-content>
                </div>
            </flint-collapsible>
        </div>
    `,
};

/* ── WithActions ─────────────────────────────────────────────────── */
export const WithActions: Story = {
    name: 'With Actions',
    render: () => html`
        <div style="max-width: 480px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Mix always-visible content with a collapsible section.
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 0.9375rem; font-family: system-ui; color: #111827;">
                    User starred 3 projects
                </h3>
                <flint-collapsible
                    @flint-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                        const btn = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('flint-button');
                        if (btn) btn.textContent = e.detail.open ? 'Show less' : 'Show more';
                    }}
                >
                    <flint-collapsible-trigger>
                        <flint-button variant="secondary" size="small">Show more</flint-button>
                    </flint-collapsible-trigger>
                    <flint-collapsible-content>
                        <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 8px;">
                            <div style="
                                display: flex; align-items: center; gap: 8px;
                                padding: 10px 12px; background: #f9fafb; border: 1px solid #e5e7eb;
                                border-radius: 6px; font-size: 0.8125rem; font-family: system-ui; color: #374151;
                            ">
                                ${starIcon} component-system/core
                            </div>
                            <div style="
                                display: flex; align-items: center; gap: 8px;
                                padding: 10px 12px; background: #f9fafb; border: 1px solid #e5e7eb;
                                border-radius: 6px; font-size: 0.8125rem; font-family: system-ui; color: #374151;
                            ">
                                ${starIcon} component-system/utilities
                            </div>
                        </div>
                    </flint-collapsible-content>
                </flint-collapsible>
            </div>
            <div style="
                display: flex; align-items: center; gap: 8px;
                padding: 10px 12px; background: #f9fafb; border: 1px solid #e5e7eb;
                border-radius: 6px; font-size: 0.8125rem; font-family: system-ui; color: #374151;
            ">
                ${starIcon} design-system/themes
            </div>
        </div>
    `,
};

/* ── Nested ──────────────────────────────────────────────────────── */
export const Nested: Story = {
    render: () => html`
        <div style="max-width: 480px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Each collapsible is independent — outer state does not affect inner.
            </p>
            <flint-collapsible
                @flint-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                    const target = e.currentTarget as HTMLElement;
                    if (e.target !== target) return; // ignore nested events
                    const chevron = target.querySelector<HTMLElement>(':scope > div > flint-collapsible-trigger svg');
                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                }}
            >
                <div style=${cardStyle}>
                    <flint-collapsible-trigger>
                        <div style=${triggerRowStyle}>
                            <span>Outer collapsible</span>
                            ${chevronDownIcon}
                        </div>
                    </flint-collapsible-trigger>
                    <flint-collapsible-content>
                        <div style="padding: 8px 16px 14px;">
                            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                                Always-visible inner text. The nested collapsible below is independent.
                            </p>
                            <flint-collapsible
                                @flint-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                                    e.stopPropagation();
                                    const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
                                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                                }}
                            >
                                <div style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                                    <flint-collapsible-trigger>
                                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; font-size: 0.875rem; font-weight: 500; color: var(--flint-text-color, #111827); width: 100%;">
                                            <span>Inner collapsible</span>
                                            ${chevronDownIcon}
                                        </div>
                                    </flint-collapsible-trigger>
                                    <flint-collapsible-content>
                                        <div style="padding: 0 12px 10px; font-size: 0.8125rem; color: #6b7280; font-family: system-ui;">
                                            Inner content, independently controlled.
                                        </div>
                                    </flint-collapsible-content>
                                </div>
                            </flint-collapsible>
                        </div>
                    </flint-collapsible-content>
                </div>
            </flint-collapsible>
        </div>
    `,
};

/* ── Controlled ──────────────────────────────────────────────────── */
export const Controlled: Story = {
    render: () => {
        let isOpen = false;

        const toggle = (e: Event) => {
            const host = (e.currentTarget as HTMLElement).closest('div')!;
            const collapsible = host.querySelector('flint-collapsible') as HTMLElement & { open: boolean };
            isOpen = !isOpen;
            collapsible.open = isOpen;
            const label = host.querySelector<HTMLElement>('#ctrl-label');
            if (label) label.textContent = isOpen ? 'Close' : 'Open';
        };

        return html`
            <div style="max-width: 480px; padding: 24px; display: flex; flex-direction: column; gap: 12px;">
                <p style="margin: 0; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                    Open state is controlled externally via the button below.
                    The trigger inside the collapsible is hidden.
                </p>
                <flint-collapsible>
                    <div style=${cardStyle}>
                        <div style="padding: 14px 16px; font-size: 0.9375rem; font-weight: 500; color: #111827; font-family: system-ui; border-bottom: 1px solid #f3f4f6;">
                            Controlled panel
                        </div>
                        <flint-collapsible-content>
                            <div style=${contentBodyStyle}>
                                This panel's open state is set by the button below, not by a
                                <code>flint-collapsible-trigger</code>. Useful when the toggle lives
                                elsewhere in the UI.
                            </div>
                        </flint-collapsible-content>
                    </div>
                </flint-collapsible>
                <flint-button variant="secondary" size="small" @click=${toggle}>
                    <span id="ctrl-label">Open</span>
                </flint-button>
            </div>
        `;
    },
};

/* ── FAQ ─────────────────────────────────────────────────────────── */
export const FAQ: Story = {
    name: 'FAQ List',
    render: () => {
        const items = [
            {
                q: 'Is it accessible?',
                a: 'Yes. The trigger renders as a native <button> with aria-expanded reflecting the open state.',
            },
            {
                q: 'Can I animate the content?',
                a: 'Yes. Use --flint-collapsible-duration and --flint-collapsible-easing CSS custom properties to control the transition.',
            },
            {
                q: 'Does it support nested collapsibles?',
                a: 'Yes. Each flint-collapsible only controls its own direct trigger and content children.',
            },
        ];

        const handleChange = (e: CustomEvent<{ open: boolean }>) => {
            const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
            if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
        };

        return html`
            <div style="max-width: 560px; padding: 24px; display: flex; flex-direction: column; gap: 0;">
                ${items.map((item, i) => html`
                    <flint-collapsible
                        style="border-bottom: 1px solid #e5e7eb; ${i === 0 ? 'border-top: 1px solid #e5e7eb;' : ''}"
                        @flint-collapsible-change=${handleChange}
                    >
                        <flint-collapsible-trigger>
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; font-size: 0.9375rem; font-weight: 500; color: #111827; font-family: system-ui; width: 100%;">
                                <span>${item.q}</span>
                                ${chevronDownIcon}
                            </div>
                        </flint-collapsible-trigger>
                        <flint-collapsible-content>
                            <p style="margin: 0 0 16px; font-size: 0.875rem; line-height: 1.6; color: #6b7280; font-family: system-ui;">
                                ${item.a}
                            </p>
                        </flint-collapsible-content>
                    </flint-collapsible>
                `)}
            </div>
        `;
    },
};
