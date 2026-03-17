import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-button';

const meta: Meta = {
    title: 'Inputs/Button',
    component: 'flint-button',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-button-group>\`

- **Tag**: \`<flint-button-group>\`
- **Class**: \`FlintButtonGroup\`

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-border-radius-md\` | \`6px\` |
| \`--flint-font-family\` | — |
| \`--flint-shadow-sm\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-primary-color-hover\` | — |
| \`--flint-primary-color-active\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-active-color\` | — |
| \`--flint-destructive-color\` | — |
| \`--flint-destructive-color-hover\` | — |
| \`--flint-destructive-color-active\` | — |
| \`--flint-success-color\` | \`#16a34a\` |
| \`--flint-success-color-hover\` | \`#15803d\` |
| \`--flint-success-color-active\` | \`#166534\` |
| \`--flint-warning-color\` | \`#f59e0b\` |
| \`--flint-warning-color-hover\` | \`#d97706\` |
| \`--flint-warning-color-active\` | \`#b45309\` |
| \`--flint-neutral-color\` | \`#6b7280\` |
| \`--flint-neutral-color-hover\` | \`#4b5563\` |
| \`--flint-neutral-color-active\` | \`#374151\` |

---

#### \`<flint-button>\`

- **Tag**: \`<flint-button>\`
- **Class**: \`FlintButton\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`appearance\` | \`appearance\` | \`'filled' \\| 'outlined' \\| 'text' \\| 'ghost'\` | \`'filled'\` | Visual appearance (structural style). |
| \`color\` | \`color\` | \`'primary' \\| 'neutral' \\| 'destructive' \\| 'success' \\| 'warning'\` | \`'primary'\` | Semantic color. |
| \`size\` | \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Size of the button. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the button. |
| \`fullWidth\` | \`full-width\` | \`boolean\` | \`false\` | Stretches to container width. |
| \`type\` | \`type\` | \`'button' \\| 'submit' \\| 'reset'\` | \`'button'\` | Button type for form participation. |
| \`label\` | \`label\` | \`string\` | \`''\` | Accessible label (aria-label) for icon-only buttons. |
| \`loading\` | \`loading\` | \`boolean\` | \`false\` | Shows a spinner and disables interaction. |
| \`href\` | \`href\` | \`string\` | \`''\` | When set, renders an \`<a>\` tag instead. |
| \`target\` | \`target\` | \`string\` | \`''\` | Link target attribute (when href is set). |
| \`shape\` | \`shape\` | \`'default' \\| 'pill' \\| 'circle'\` | \`'default'\` | Shape variant of the button. |
| \`variant\` | \`variant\` | _(deprecated)_ | \`''\` | Legacy shorthand — use \`appearance\` + \`color\` instead. |

#### CSS Parts

| Part | Description |
|---|---|
| \`base\` | The button/anchor element. |
| \`prefix\` | The prefix icon slot wrapper. |
| \`suffix\` | The suffix icon slot wrapper. |
| \`label\` | The label slot wrapper. |
| \`spinner\` | The loading spinner container. |

#### Slots

| Name | Description |
|---|---|
| (default) | Button label content. |
| \`prefix\` | Icon or content before the label. |
| \`suffix\` | Icon or content after the label. |

---

#### \`<flint-toggle-button-group>\`

Toggle Button Group: manages exclusive or multi-select toggle buttons.

- **Tag**: \`<flint-toggle-button-group>\`
- **Class**: \`FlintToggleButtonGroup\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string \\| string[]\` | \`''\` | Currently selected value(s). A string when exclusive, an array otherwise. |
| \`defaultValue\` | \`default-value\` | \`string \\| string[]\` | \`''\` | Initial selected value(s) for uncontrolled usage. |
| \`exclusive\` | \`exclusive\` | \`boolean\` | \`true\` | Whether only one button can be selected at a time. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-toggle-button-group-change\` | — | Fired when the group's selected value(s) change. |

---

#### \`<flint-toggle-button>\`

Toggle Button: a button that can be toggled on/off.

- **Tag**: \`<flint-toggle-button>\`
- **Class**: \`FlintToggleButton\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`selected\` | \`selected\` | \`boolean\` | \`false\` | Whether the button is currently selected (pressed). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the button is disabled. |
| \`value\` | \`value\` | \`string\` | \`''\` | Value associated with this toggle button. |
| \`size\` | \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Size variant of the toggle button. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-toggle-button-change\` | — | Fired when the button's selected state changes. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-toggle-button-font-size\` | \`14px\` |
| \`--flint-toggle-button-padding\` | \`8px 16px\` |
| \`--flint-toggle-button-gap\` | \`8px\` |
| \`--flint-toggle-button-border-radius\` | \`var(--flint-border-radius-md\` |
| \`--flint-toggle-button-selected-bg\` | \`var(--flint-active-color\` |
| \`--flint-toggle-button-selected-color\` | \`var(--flint-primary-color\` |
| \`--flint-toggle-button-selected-border-color\` | \`var(--flint-primary-color\` |
                `,
            },
        },
    },
    argTypes: {
        appearance: {
            control: 'select',
            options: ['filled', 'outlined', 'text', 'ghost'],
        },
        color: {
            control: 'select',
            options: ['primary', 'neutral', 'destructive', 'success', 'warning'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        shape: {
            control: 'select',
            options: ['default', 'pill', 'circle'],
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
        },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
        content: { control: 'text' },
        label: { control: 'text' },
        href: { control: 'text' },
        target: { control: 'text' },
    },
    args: {
        content: 'Button Text',
        appearance: 'filled',
        color: 'primary',
        size: 'md',
        shape: 'default',
        type: 'button',
        disabled: false,
        loading: false,
        label: '',
        href: '',
        target: '',
    },
    render: (args: Record<string, unknown>) => html`
    <flint-button
      appearance=${args.appearance}
      color=${args.color}
      size=${args.size}
      shape=${args.shape}
      type=${args.type}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      label=${args.label || ''}
      href=${args.href || ''}
      target=${args.target || ''}
    >
      ${args.content}
    </flint-button>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

Default.play = async ({ canvasElement }) => {
    const button = canvasElement.querySelector('flint-button') as HTMLElement;
    const inner = button.shadowRoot!.querySelector('button') as HTMLButtonElement;

    // Button is rendered and enabled
    await waitFor(() => {
        expect(inner).toBeTruthy();
        expect(inner.disabled).toBe(false);
    });

    // Click the button
    await userEvent.click(inner);
};

export const AllAppearancesAndColors: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 24px; font-family: var(--flint-font-family);">
            ${(['filled', 'outlined', 'text', 'ghost'] as const).map(appearance => html`
                <div>
                    <p style="margin: 0 0 12px 0; font-weight: 600; text-transform: capitalize;">${appearance}</p>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        ${(['primary', 'neutral', 'destructive', 'success', 'warning'] as const).map(color => html`
                            <flint-button appearance=${appearance} color=${color} size="md">${color}</flint-button>
                        `)}
                        <flint-button appearance=${appearance} color="primary" size="md" disabled>Disabled</flint-button>
                    </div>
                </div>
            `)}
        </div>
    `
};

export const LoadingState: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <flint-button appearance="filled" color="primary" loading label="Saving">Saving...</flint-button>
            <flint-button appearance="outlined" color="neutral" loading label="Loading">Loading</flint-button>
            <flint-button appearance="filled" color="destructive" loading label="Deleting">Deleting</flint-button>
            <flint-button appearance="filled" color="success" loading label="Confirming">Confirming</flint-button>
        </div>
    `
};

export const WithPrefixAndSuffixIcons: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <flint-button appearance="filled" color="primary" size="md">
                <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3.793l2.146 2.147a.5.5 0 0 1-.708.707L7.5 8.707V4.5A.5.5 0 0 1 8 4z"></path>
                </svg>
                Schedule
            </flint-button>
            <flint-button appearance="outlined" color="neutral" size="md">
                Download
                <svg slot="suffix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
                </svg>
            </flint-button>
            <flint-button appearance="filled" color="primary" size="md">
                <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
                Add Item
                <svg slot="suffix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                </svg>
            </flint-button>
        </div>
    `
};

export const IconOnlyButton: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <flint-button appearance="filled" color="primary" shape="circle" size="sm" label="Add item">
                <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
            </flint-button>
            <flint-button appearance="outlined" color="neutral" shape="circle" size="md" label="Settings">
                <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
                </svg>
            </flint-button>
            <flint-button appearance="filled" color="destructive" shape="circle" size="lg" label="Delete">
                <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H5.5l1-1h3l1 1h2.5a1 1 0 0 1 1 1v1z"></path>
                </svg>
            </flint-button>
        </div>
    `
};

export const PillShape: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <flint-button appearance="filled" color="primary" shape="pill" size="sm">Small Pill</flint-button>
            <flint-button appearance="outlined" color="neutral" shape="pill" size="md">Medium Pill</flint-button>
            <flint-button appearance="filled" color="destructive" shape="pill" size="lg">Large Pill</flint-button>
            <flint-button appearance="filled" color="success" shape="pill">Success Pill</flint-button>
        </div>
    `
};

export const LinkButton: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <flint-button appearance="filled" color="primary" href="https://example.com">Visit Site</flint-button>
            <flint-button appearance="outlined" color="neutral" href="https://example.com" target="_blank">Open in New Tab</flint-button>
            <flint-button appearance="filled" color="primary" href="https://example.com" disabled>Disabled Link</flint-button>
        </div>
    `
};

export const FormContext: Story = {
    render: () => html`
        <form @submit=${(e: Event) => { e.preventDefault(); alert('Form submitted!'); }}>
            <div style="max-width: 400px; padding: 20px; background: var(--flint-surface-background); border-radius: 8px; box-shadow: var(--flint-shadow-md);">
                <h3 style="margin-top: 0; margin-bottom: 20px; font-family: var(--flint-font-family);">Contact Us</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <input type="text" placeholder="Name" style="padding: 8px; border: 1px solid var(--flint-input-border-color); border-radius: 4px;" />
                    <input type="email" placeholder="Email" style="padding: 8px; border: 1px solid var(--flint-input-border-color); border-radius: 4px;" />
                    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px;">
                        <flint-button appearance="outlined" color="neutral" type="reset">Reset</flint-button>
                        <flint-button appearance="filled" color="primary" type="submit">Submit</flint-button>
                    </div>
                </div>
            </div>
        </form>
    `
};

export const ToolbarContext: Story = {
    render: () => html`
        <div style="padding: 12px; background: var(--flint-surface-background-flat); border-radius: 8px; display: flex; gap: 8px;">
            <flint-button appearance="outlined" color="neutral" size="sm">Edit</flint-button>
            <flint-button appearance="outlined" color="neutral" size="sm">Share</flint-button>
            <div style="flex-grow: 1;"></div>
            <flint-button appearance="filled" color="primary" size="sm">Save</flint-button>
        </div>
    `
};

export const ModalContext: Story = {
    render: () => html`
        <div style="position: relative; padding: 24px; background: var(--flint-surface-background); border-radius: 12px; box-shadow: var(--flint-shadow-lg); max-width: 450px;">
            <h2 style="margin-top: 0; margin-bottom: 12px; font-family: var(--flint-font-family); font-size: 1.25rem;">Delete Account?</h2>
            <p style="margin-top: 0; margin-bottom: 24px; color: var(--flint-text-color-muted); font-family: var(--flint-font-family); line-height: 1.5;">This action cannot be undone. All your data will be permanently removed.</p>
            <div style="display: flex; justify-content: flex-end; gap: 12px;">
                <flint-button appearance="outlined" color="neutral" size="md">Cancel</flint-button>
                <flint-button appearance="filled" color="destructive" size="md">Delete</flint-button>
            </div>
        </div>
    `
};

export const ActionCardContext: Story = {
    render: () => html`
        <div style="padding: 24px; background: var(--flint-surface-background); border: 1px solid var(--flint-border-color); border-radius: 8px; width: 300px;">
            <div style="width: 40px; height: 40px; background: #e0e7ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #4f46e5; font-weight: bold;">
                UI
            </div>
            <h3 style="margin: 0 0 8px 0; font-family: var(--flint-font-family);">Pro Plan</h3>
            <p style="margin: 0 0 24px 0; color: var(--flint-text-color-muted); font-size: 14px; font-family: var(--flint-font-family);">Unlock premium features and advanced analytics.</p>
            <flint-button appearance="filled" color="primary" size="md" full-width>Upgrade Now</flint-button>
        </div>
    `
};

export const DisabledContext: Story = {
    render: () => html`
        <div style="display: flex; gap: 16px;">
             <flint-button appearance="filled" color="primary" size="md" disabled>Primary Disabled</flint-button>
             <flint-button appearance="outlined" color="neutral" size="md" disabled>Outlined Disabled</flint-button>
        </div>
    `
};

DisabledContext.play = async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll('flint-button');
    for (const button of buttons) {
        const inner = button.shadowRoot!.querySelector('button, a') as HTMLElement;
        await waitFor(() => expect(inner.hasAttribute('disabled') || inner.getAttribute('aria-disabled') === 'true').toBeTruthy());
    }
};

export const WithIcon: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <flint-button appearance="filled" color="primary" size="md">
                <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3.793l2.146 2.147a.5.5 0 0 1-.708.707L7.5 8.707V4.5A.5.5 0 0 1 8 4z"></path>
                </svg>
                Schedule
            </flint-button>
            <flint-button appearance="outlined" color="neutral" size="md">
                <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
                </svg>
                Confirm
            </flint-button>
        </div>
    `
};
