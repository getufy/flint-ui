import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-snackbar';
import { FlintSnackbar } from './flint-snackbar';
import '../button/flint-button';
import '../alert/flint-alert';

const meta: Meta = {
    title: 'Feedback/Snackbar',
    component: 'flint-snackbar',
    parameters: {
        docs: {
            description: {
                component: `
Snackbars (also known as toasts) are used for brief notifications.
They appear temporarily and float above the UI.

- **Tag**: \`<flint-snackbar>\`
- **Class**: \`FlintSnackbar\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the snackbar is open. |
| \`defaultOpen\` | \`default-open\` | \`boolean\` | \`false\` | Initial open state for uncontrolled usage. |
| \`message\` | \`message\` | \`string\` | \`''\` | The message to display (slot fallback). |
| \`autoHideDuration\` | \`auto-hide-duration\` | \`number\` | \`5000\` | Duration in milliseconds before the snackbar auto-closes. |
| \`anchorOrigin\` | \`anchor-origin\` | \`'top-left' \\| 'top-center' \\| 'top-right' \\|         'bottom-left' \\| 'bottom-center' \\| 'bottom-right'\` | \`'bottom-center'\` | Position of the snackbar. |
| \`pauseOnHover\` | \`pause-on-hover\` | \`boolean\` | \`true\` | Pause the auto-hide timer while the user hovers over the snackbar. |
| \`closable\` | \`closable\` | \`boolean\` | \`false\` | Show a dismiss (✕) button. |
| \`variant\` | \`variant\` | \`'default' \\| 'info' \\| 'success' \\| 'warning' \\| 'error'\` | \`'default'\` | Visual style variant. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-snackbar-open\` | \`&#123; open: true &#125;\` | Fired when the snackbar opens (bubbles, composed). detail: \`&#123; open: true &#125;\` |
| \`flint-snackbar-close\` | \`&#123; open: false &#125;\` | Fired when the snackbar closes (bubbles, composed). detail: \`&#123; open: false &#125;\` |

#### Slots

| Name | Description |
|---|---|
| \`action\` | The action to display inside the snackbar. |
| \`(default)\` | Optional content to display inside the snackbar, such as a message or a flint-alert. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-snackbar-min-width\` | — |
| \`--flint-snackbar-max-width\` | — |
| \`--flint-snackbar-bg\` | — |
| \`--flint-snackbar-color\` | — |
| \`--flint-snackbar-z-index\` | — |
| \`--flint-snackbar-offset\` | — |
| \`--flint-snackbar-bg-info\` | — |
| \`--flint-snackbar-bg-success\` | — |
| \`--flint-snackbar-bg-warning\` | — |
| \`--flint-snackbar-bg-error\` | — |
| \`--flint-font-family\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-shadow-lg\` | — |

#### Methods

| Method | Description |
|---|---|
| \`close(): void\` | Closes the snackbar. |
                `,
            },
        },
    },
    argTypes: {
        open: { control: 'boolean' },
        message: { control: 'text' },
        autoHideDuration: { control: 'number' },
        anchorOrigin: {
            control: 'select',
            options: [
                'top-left', 'top-center', 'top-right',
                'bottom-left', 'bottom-center', 'bottom-right'
            ],
        },
        pauseOnHover: { control: 'boolean' },
        closable: { control: 'boolean' },
        variant: {
            control: 'select',
            options: ['default', 'info', 'success', 'warning', 'error'],
        },
    },
    args: {
        open: false,
        message: 'Note archived',
        anchorOrigin: 'bottom-center',
        autoHideDuration: 6000,
        pauseOnHover: true,
        closable: false,
        variant: 'default',
    },
};

export default meta;

type Story = StoryObj;

/**
 * Basic snackbar with a message and an action button.
 */
export const Basic: Story = {
    render: (args) => html`
        <div>
            <flint-button variant="secondary" @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('flint-snackbar') as FlintSnackbar;
                if (sb) sb.open = true;
            }}>
                Show Snackbar
            </flint-button>
            <flint-snackbar
                ?open=${args.open}
                .message=${args.message}
                .anchorOrigin=${args.anchorOrigin}
                .autoHideDuration=${args.autoHideDuration}
                ?pause-on-hover=${args.pauseOnHover}
                ?closable=${args.closable}
                .variant=${args.variant}
                @flint-snackbar-close=${(e: Event) => { (e.target as FlintSnackbar).open = false; }}
            >
                <flint-button slot="action" size="small" style="color: #bb86fc; font-weight: 600;" @click=${(e: Event) => {
                    const sb = (e.target as HTMLElement).closest('flint-snackbar') as FlintSnackbar;
                    if (sb) sb.open = false;
                    alert('Action: Undo triggered!');
                }}>
                    UNDO
                </flint-button>
            </flint-snackbar>
        </div>
    `,
};

Basic.play = async ({ canvasElement }) => {
    const btn = canvasElement.querySelector('flint-button') as HTMLElement;
    await waitFor(() => expect(btn).toBeTruthy());
    const sb = canvasElement.querySelector('flint-snackbar') as FlintSnackbar;
    await userEvent.click(btn);
    await waitFor(() => expect(sb.open).toBe(true));
};

/**
 * Using an Alert as a child of a Snackbar for more complex notifications.
 */
export const WithAlert: Story = {
    args: {
        open: false,
    },
    render: (args) => html`
        <div>
            <flint-button variant="primary" @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('flint-snackbar') as FlintSnackbar;
                if (sb) sb.open = true;
            }}>
                Success Notification
            </flint-button>
            <flint-snackbar
                ?open=${args.open}
                .anchorOrigin=${'bottom-right'}
                .autoHideDuration=${3000}
                @flint-snackbar-close=${(e: Event) => { (e.target as FlintSnackbar).open = false; }}
            >
                <flint-alert severity="success" title="Success" dismissible @flint-alert-close=${(e: Event) => {
                    const sb = (e.target as HTMLElement).closest('flint-snackbar') as FlintSnackbar;
                    if (sb) sb.open = false;
                }}>
                    Your profile has been saved successfully.
                </flint-alert>
            </flint-snackbar>
        </div>
    `,
};

/**
 * Multiple positions demonstration.
 */
export const Positions: Story = {
    render: () => {
        const show = (id: string) => {
            const sb = document.getElementById(id) as FlintSnackbar;
            if (sb) sb.open = true;
        };

        return html`
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <flint-button size="small" @click=${() => show('tl')}>Top-Left</flint-button>
                <flint-button size="small" @click=${() => show('tc')}>Top-Center</flint-button>
                <flint-button size="small" @click=${() => show('tr')}>Top-Right</flint-button>
                <flint-button size="small" @click=${() => show('bl')}>Bottom-Left</flint-button>
                <flint-button size="small" @click=${() => show('bc')}>Bottom-Center</flint-button>
                <flint-button size="small" @click=${() => show('br')}>Bottom-Right</flint-button>

                <flint-snackbar id="tl" .anchorOrigin=${'top-left'}     .message=${'Top Left Notification'}     .autoHideDuration=${3000} @flint-snackbar-close=${(e: Event) => (e.target as FlintSnackbar).open = false}></flint-snackbar>
                <flint-snackbar id="tc" .anchorOrigin=${'top-center'}   .message=${'Top Center Notification'}   .autoHideDuration=${3000} @flint-snackbar-close=${(e: Event) => (e.target as FlintSnackbar).open = false}></flint-snackbar>
                <flint-snackbar id="tr" .anchorOrigin=${'top-right'}    .message=${'Top Right Notification'}    .autoHideDuration=${3000} @flint-snackbar-close=${(e: Event) => (e.target as FlintSnackbar).open = false}></flint-snackbar>
                <flint-snackbar id="bl" .anchorOrigin=${'bottom-left'}  .message=${'Bottom Left Notification'}  .autoHideDuration=${3000} @flint-snackbar-close=${(e: Event) => (e.target as FlintSnackbar).open = false}></flint-snackbar>
                <flint-snackbar id="bc" .anchorOrigin=${'bottom-center'} .message=${'Bottom Center Notification'} .autoHideDuration=${3000} @flint-snackbar-close=${(e: Event) => (e.target as FlintSnackbar).open = false}></flint-snackbar>
                <flint-snackbar id="br" .anchorOrigin=${'bottom-right'} .message=${'Bottom Right Notification'} .autoHideDuration=${3000} @flint-snackbar-close=${(e: Event) => (e.target as FlintSnackbar).open = false}></flint-snackbar>
            </div>
        `;
    }
};

/**
 * A snackbar with `auto-hide-duration="0"` that stays open until the user
 * explicitly dismisses it — useful for important messages.
 */
export const Persistent: Story = {
    render: () => html`
        <div>
            <flint-button @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('flint-snackbar') as FlintSnackbar;
                if (sb) sb.open = true;
            }}>Show Persistent Snackbar</flint-button>
            <flint-snackbar
                .message=${'This will not auto-dismiss. Click DISMISS to close.'}
                .autoHideDuration=${0}
                @flint-snackbar-close=${(e: Event) => { (e.target as FlintSnackbar).open = false; }}
            >
                <flint-button slot="action" size="small" style="color: #bb86fc; font-weight: 600;" @click=${(e: Event) => {
                    const sb = (e.target as HTMLElement).closest('flint-snackbar') as FlintSnackbar;
                    if (sb) sb.close();
                }}>DISMISS</flint-button>
            </flint-snackbar>
        </div>
    `,
};

/**
 * Five visual variants: default, info, success, warning, error.
 */
export const Variants: Story = {
    render: () => {
        const variants = ['default', 'info', 'success', 'warning', 'error'] as const;
        const labels: Record<string, string> = {
            default: 'Default — note archived',
            info: 'Info — your session will expire in 5 minutes',
            success: 'Success — changes saved',
            warning: 'Warning — disk space is running low',
            error: 'Error — failed to save changes',
        };

        return html`
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
                ${variants.map(v => html`
                    <flint-button size="small" @click=${() => {
                        variants.forEach(other => {
                            const other_sb = document.getElementById(`variant-sb-${other}`) as FlintSnackbar;
                            if (other_sb && other_sb.open) other_sb.open = false;
                        });
                        const sb = document.getElementById(`variant-sb-${v}`) as FlintSnackbar;
                        if (sb) sb.open = true;
                    }}>Show ${v}</flint-button>
                `)}
                ${variants.map(v => html`
                    <flint-snackbar
                        id=${`variant-sb-${v}`}
                        .variant=${v}
                        .anchorOrigin=${'bottom-center'}
                        .message=${labels[v]}
                        .autoHideDuration=${4000}
                        closable
                        @flint-snackbar-close=${(e: Event) => { (e.target as FlintSnackbar).open = false; }}
                    ></flint-snackbar>
                `)}
            </div>
        `;
    },
};

/**
 * The `closable` prop adds a dismiss (✕) button so users can close the
 * snackbar without needing an action button.
 */
export const WithCloseButton: Story = {
    render: () => html`
        <div>
            <flint-button @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('flint-snackbar') as FlintSnackbar;
                if (sb) sb.open = true;
            }}>Show Closable Snackbar</flint-button>
            <flint-snackbar
                .message=${'You have a new message from Alex.'}
                .autoHideDuration=${0}
                closable
                @flint-snackbar-close=${(e: Event) => { (e.target as FlintSnackbar).open = false; }}
            ></flint-snackbar>
        </div>
    `,
};

/**
 * With `pause-on-hover` (default `true`), the auto-hide timer pauses when
 * the user hovers over the snackbar and resumes when they move away.
 * Hover over the snackbar before the 8 s timer expires to see it pause.
 */
export const PauseOnHover: Story = {
    render: () => html`
        <div>
            <flint-button @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('flint-snackbar') as FlintSnackbar;
                if (sb) sb.open = true;
            }}>Show (8 s timer — hover to pause)</flint-button>
            <flint-snackbar
                .message=${'Hover over me to pause the 8 second timer!'}
                .autoHideDuration=${8000}
                pause-on-hover
                closable
                @flint-snackbar-close=${(e: Event) => { (e.target as FlintSnackbar).open = false; }}
            ></flint-snackbar>
        </div>
    `,
};
