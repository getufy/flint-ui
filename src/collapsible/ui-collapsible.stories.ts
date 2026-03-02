import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-collapsible';
import '../button/ui-button.js';

const meta: Meta = {
    title: 'Display/Collapsible',
    component: 'ui-collapsible',
    parameters: {
        docs: {
            description: {
                component: `
An interactive panel that expands and collapses, built from three composable sub-components.

### Components
- **\`ui-collapsible\`** — Root. Manages open/closed state. Fires \`ui-collapsible-change\`.
- **\`ui-collapsible-trigger\`** — Toggle button. Wires up to the nearest \`ui-collapsible\` ancestor automatically.
- **\`ui-collapsible-content\`** — Animated panel. Collapses to zero height using a CSS grid transition.

### Usage
\`\`\`html
<ui-collapsible>
  <ui-collapsible-trigger>Click to expand</ui-collapsible-trigger>
  <ui-collapsible-content>
    <p>Hidden content revealed on click.</p>
  </ui-collapsible-content>
</ui-collapsible>
\`\`\`

### Controlled usage
\`\`\`html
<ui-collapsible open @ui-collapsible-change="\${e => el.open = e.detail.open}">
  ...
</ui-collapsible>
\`\`\`

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-collapsible-duration\` | \`200ms\` | Expand/collapse animation duration |
| \`--ui-collapsible-easing\`   | \`ease\`   | Animation easing function |
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
    font-family: var(--ui-font-family, system-ui, sans-serif); overflow: hidden;
`;
const triggerRowStyle = `
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; font-size: 0.9375rem; font-weight: 500;
    color: var(--ui-text-color, #111827); width: 100%;
`;
const contentBodyStyle = `
    padding: 0 16px 14px; font-size: 0.875rem; line-height: 1.6;
    color: var(--ui-text-color-muted, #6b7280);
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    render: (args) => html`
        <div style="max-width: 480px; padding: 24px;">
            <ui-collapsible
                ?open=${args.open}
                ?disabled=${args.disabled}
                @ui-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                    const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                }}
            >
                <div style=${cardStyle}>
                    <ui-collapsible-trigger>
                        <div style=${triggerRowStyle}>
                            <span>What is a collapsible?</span>
                            ${chevronDownIcon}
                        </div>
                    </ui-collapsible-trigger>
                    <ui-collapsible-content>
                        <div style=${contentBodyStyle}>
                            A collapsible is an interactive component that reveals or hides
                            content when a trigger is activated. Use it to progressively
                            disclose information and keep interfaces uncluttered.
                        </div>
                    </ui-collapsible-content>
                </div>
            </ui-collapsible>
        </div>
    `,
};

/* ── DefaultOpen ─────────────────────────────────────────────────── */
export const DefaultOpen: Story = {
    name: 'Default Open',
    render: () => html`
        <div style="max-width: 480px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Starts open via <code>default-open</code> attribute (uncontrolled).
            </p>
            <ui-collapsible default-open
                @ui-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                    const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                }}
            >
                <div style=${cardStyle}>
                    <ui-collapsible-trigger>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; font-size: 0.9375rem; font-weight: 500; color: var(--ui-text-color, #111827); width: 100%;">
                            <span>Already expanded</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                 style="transition: transform 200ms ease; transform: rotate(180deg); flex-shrink: 0;">
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </div>
                    </ui-collapsible-trigger>
                    <ui-collapsible-content>
                        <div style=${contentBodyStyle}>
                            This panel was open from the moment the page loaded, thanks to
                            <code>default-open</code>. The component manages its own state
                            without any external controller.
                        </div>
                    </ui-collapsible-content>
                </div>
            </ui-collapsible>
        </div>
    `,
};

/* ── Disabled ────────────────────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`
        <div style="max-width: 480px; padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Trigger is inert when <code>disabled</code> is set.
            </p>
            <ui-collapsible disabled>
                <div style=${cardStyle}>
                    <ui-collapsible-trigger>
                        <div style=${triggerRowStyle}>
                            <span>Cannot be toggled</span>
                            ${chevronDownIcon}
                        </div>
                    </ui-collapsible-trigger>
                    <ui-collapsible-content>
                        <div style=${contentBodyStyle}>
                            You should not see this.
                        </div>
                    </ui-collapsible-content>
                </div>
            </ui-collapsible>
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
                    @peduarte starred 3 repos
                </h3>
                <ui-collapsible
                    @ui-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                        const btn = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('ui-button');
                        if (btn) btn.textContent = e.detail.open ? 'Show less' : 'Show more';
                    }}
                >
                    <ui-collapsible-trigger>
                        <ui-button variant="secondary" size="small">Show more</ui-button>
                    </ui-collapsible-trigger>
                    <ui-collapsible-content>
                        <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 8px;">
                            <div style="
                                display: flex; align-items: center; gap: 8px;
                                padding: 10px 12px; background: #f9fafb; border: 1px solid #e5e7eb;
                                border-radius: 6px; font-size: 0.8125rem; font-family: system-ui; color: #374151;
                            ">
                                ${starIcon} radix-ui/primitives
                            </div>
                            <div style="
                                display: flex; align-items: center; gap: 8px;
                                padding: 10px 12px; background: #f9fafb; border: 1px solid #e5e7eb;
                                border-radius: 6px; font-size: 0.8125rem; font-family: system-ui; color: #374151;
                            ">
                                ${starIcon} radix-ui/colors
                            </div>
                        </div>
                    </ui-collapsible-content>
                </ui-collapsible>
            </div>
            <div style="
                display: flex; align-items: center; gap: 8px;
                padding: 10px 12px; background: #f9fafb; border: 1px solid #e5e7eb;
                border-radius: 6px; font-size: 0.8125rem; font-family: system-ui; color: #374151;
            ">
                ${starIcon} stitches-css/stitches
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
            <ui-collapsible
                @ui-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                    const target = e.currentTarget as HTMLElement;
                    if (e.target !== target) return; // ignore nested events
                    const chevron = target.querySelector<HTMLElement>(':scope > div > ui-collapsible-trigger svg');
                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                }}
            >
                <div style=${cardStyle}>
                    <ui-collapsible-trigger>
                        <div style=${triggerRowStyle}>
                            <span>Outer collapsible</span>
                            ${chevronDownIcon}
                        </div>
                    </ui-collapsible-trigger>
                    <ui-collapsible-content>
                        <div style="padding: 8px 16px 14px;">
                            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                                Always-visible inner text. The nested collapsible below is independent.
                            </p>
                            <ui-collapsible
                                @ui-collapsible-change=${(e: CustomEvent<{ open: boolean }>) => {
                                    e.stopPropagation();
                                    const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
                                    if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
                                }}
                            >
                                <div style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                                    <ui-collapsible-trigger>
                                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; font-size: 0.875rem; font-weight: 500; color: var(--ui-text-color, #111827); width: 100%;">
                                            <span>Inner collapsible</span>
                                            ${chevronDownIcon}
                                        </div>
                                    </ui-collapsible-trigger>
                                    <ui-collapsible-content>
                                        <div style="padding: 0 12px 10px; font-size: 0.8125rem; color: #6b7280; font-family: system-ui;">
                                            Inner content, independently controlled.
                                        </div>
                                    </ui-collapsible-content>
                                </div>
                            </ui-collapsible>
                        </div>
                    </ui-collapsible-content>
                </div>
            </ui-collapsible>
        </div>
    `,
};

/* ── Controlled ──────────────────────────────────────────────────── */
export const Controlled: Story = {
    render: () => {
        let isOpen = false;

        const toggle = (e: Event) => {
            const host = (e.currentTarget as HTMLElement).closest('div')!;
            const collapsible = host.querySelector('ui-collapsible') as HTMLElement & { open: boolean };
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
                <ui-collapsible>
                    <div style=${cardStyle}>
                        <div style="padding: 14px 16px; font-size: 0.9375rem; font-weight: 500; color: #111827; font-family: system-ui; border-bottom: 1px solid #f3f4f6;">
                            Controlled panel
                        </div>
                        <ui-collapsible-content>
                            <div style=${contentBodyStyle}>
                                This panel's open state is set by the button below, not by a
                                <code>ui-collapsible-trigger</code>. Useful when the toggle lives
                                elsewhere in the UI.
                            </div>
                        </ui-collapsible-content>
                    </div>
                </ui-collapsible>
                <ui-button variant="secondary" size="small" @click=${toggle}>
                    <span id="ctrl-label">Open</span>
                </ui-button>
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
                a: 'Yes. Use --ui-collapsible-duration and --ui-collapsible-easing CSS custom properties to control the transition.',
            },
            {
                q: 'Does it support nested collapsibles?',
                a: 'Yes. Each ui-collapsible only controls its own direct trigger and content children.',
            },
        ];

        const handleChange = (e: CustomEvent<{ open: boolean }>) => {
            const chevron = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('svg');
            if (chevron) chevron.style.transform = e.detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
        };

        return html`
            <div style="max-width: 560px; padding: 24px; display: flex; flex-direction: column; gap: 0;">
                ${items.map((item, i) => html`
                    <ui-collapsible
                        style="border-bottom: 1px solid #e5e7eb; ${i === 0 ? 'border-top: 1px solid #e5e7eb;' : ''}"
                        @ui-collapsible-change=${handleChange}
                    >
                        <ui-collapsible-trigger>
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; font-size: 0.9375rem; font-weight: 500; color: #111827; font-family: system-ui; width: 100%;">
                                <span>${item.q}</span>
                                ${chevronDownIcon}
                            </div>
                        </ui-collapsible-trigger>
                        <ui-collapsible-content>
                            <p style="margin: 0 0 16px; font-size: 0.875rem; line-height: 1.6; color: #6b7280; font-family: system-ui;">
                                ${item.a}
                            </p>
                        </ui-collapsible-content>
                    </ui-collapsible>
                `)}
            </div>
        `;
    },
};
