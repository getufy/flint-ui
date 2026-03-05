import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-snackbar';
import { UiSnackbar } from './ui-snackbar';
import '../button/ui-button';
import '../alert/ui-alert';

const meta: Meta = {
    title: 'Feedback/Snackbar',
    component: 'ui-snackbar',
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
};

export default meta;

type Story = StoryObj;

/**
 * Basic snackbar with a message and an action button.
 */
export const Basic: Story = {
    args: {
        open: false,
        message: 'Note archived',
        anchorOrigin: 'bottom-center',
        autoHideDuration: 6000,
        pauseOnHover: true,
        closable: false,
        variant: 'default',
    },
    render: (args) => html`
        <div>
            <ui-button variant="secondary" @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('ui-snackbar') as UiSnackbar;
                if (sb) sb.open = true;
            }}>
                Show Snackbar
            </ui-button>
            <ui-snackbar
                ?open=${args.open}
                .message=${args.message}
                .anchorOrigin=${args.anchorOrigin}
                .autoHideDuration=${args.autoHideDuration}
                ?pause-on-hover=${args.pauseOnHover}
                ?closable=${args.closable}
                .variant=${args.variant}
                @ui-snackbar-close=${(e: Event) => { (e.target as UiSnackbar).open = false; }}
            >
                <ui-button slot="action" size="small" style="color: #bb86fc; font-weight: 600;" @click=${(e: Event) => {
                    const sb = (e.target as HTMLElement).closest('ui-snackbar') as UiSnackbar;
                    if (sb) sb.open = false;
                    alert('Action: Undo triggered!');
                }}>
                    UNDO
                </ui-button>
            </ui-snackbar>
        </div>
    `,
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
            <ui-button variant="primary" @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('ui-snackbar') as UiSnackbar;
                if (sb) sb.open = true;
            }}>
                Success Notification
            </ui-button>
            <ui-snackbar
                ?open=${args.open}
                .anchorOrigin=${'bottom-right'}
                .autoHideDuration=${3000}
                @ui-snackbar-close=${(e: Event) => { (e.target as UiSnackbar).open = false; }}
            >
                <ui-alert severity="success" title="Success" dismissible @ui-alert-close=${(e: Event) => {
                    const sb = (e.target as HTMLElement).closest('ui-snackbar') as UiSnackbar;
                    if (sb) sb.open = false;
                }}>
                    Your profile has been saved successfully.
                </ui-alert>
            </ui-snackbar>
        </div>
    `,
};

/**
 * Multiple positions demonstration.
 */
export const Positions: Story = {
    render: () => {
        const show = (id: string) => {
            const sb = document.getElementById(id) as UiSnackbar;
            if (sb) sb.open = true;
        };

        return html`
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <ui-button size="small" @click=${() => show('tl')}>Top-Left</ui-button>
                <ui-button size="small" @click=${() => show('tc')}>Top-Center</ui-button>
                <ui-button size="small" @click=${() => show('tr')}>Top-Right</ui-button>
                <ui-button size="small" @click=${() => show('bl')}>Bottom-Left</ui-button>
                <ui-button size="small" @click=${() => show('bc')}>Bottom-Center</ui-button>
                <ui-button size="small" @click=${() => show('br')}>Bottom-Right</ui-button>

                <ui-snackbar id="tl" .anchorOrigin=${'top-left'}     .message=${'Top Left Notification'}     .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="tc" .anchorOrigin=${'top-center'}   .message=${'Top Center Notification'}   .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="tr" .anchorOrigin=${'top-right'}    .message=${'Top Right Notification'}    .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="bl" .anchorOrigin=${'bottom-left'}  .message=${'Bottom Left Notification'}  .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="bc" .anchorOrigin=${'bottom-center'} .message=${'Bottom Center Notification'} .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="br" .anchorOrigin=${'bottom-right'} .message=${'Bottom Right Notification'} .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
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
            <ui-button @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('ui-snackbar') as UiSnackbar;
                if (sb) sb.open = true;
            }}>Show Persistent Snackbar</ui-button>
            <ui-snackbar
                .message=${'This will not auto-dismiss. Click DISMISS to close.'}
                .autoHideDuration=${0}
                @ui-snackbar-close=${(e: Event) => { (e.target as UiSnackbar).open = false; }}
            >
                <ui-button slot="action" size="small" style="color: #bb86fc; font-weight: 600;" @click=${(e: Event) => {
                    const sb = (e.target as HTMLElement).closest('ui-snackbar') as UiSnackbar;
                    if (sb) sb.close();
                }}>DISMISS</ui-button>
            </ui-snackbar>
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
                    <ui-button size="small" @click=${() => {
                        variants.forEach(other => {
                            const other_sb = document.getElementById(`variant-sb-${other}`) as UiSnackbar;
                            if (other_sb && other_sb.open) other_sb.open = false;
                        });
                        const sb = document.getElementById(`variant-sb-${v}`) as UiSnackbar;
                        if (sb) sb.open = true;
                    }}>Show ${v}</ui-button>
                `)}
                ${variants.map(v => html`
                    <ui-snackbar
                        id=${`variant-sb-${v}`}
                        .variant=${v}
                        .anchorOrigin=${'bottom-center'}
                        .message=${labels[v]}
                        .autoHideDuration=${4000}
                        closable
                        @ui-snackbar-close=${(e: Event) => { (e.target as UiSnackbar).open = false; }}
                    ></ui-snackbar>
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
            <ui-button @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('ui-snackbar') as UiSnackbar;
                if (sb) sb.open = true;
            }}>Show Closable Snackbar</ui-button>
            <ui-snackbar
                .message=${'You have a new message from Alex.'}
                .autoHideDuration=${0}
                closable
                @ui-snackbar-close=${(e: Event) => { (e.target as UiSnackbar).open = false; }}
            ></ui-snackbar>
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
            <ui-button @click=${(e: Event) => {
                const sb = (e.target as HTMLElement).closest('div')!.querySelector('ui-snackbar') as UiSnackbar;
                if (sb) sb.open = true;
            }}>Show (8 s timer — hover to pause)</ui-button>
            <ui-snackbar
                .message=${'Hover over me to pause the 8 second timer!'}
                .autoHideDuration=${8000}
                pause-on-hover
                closable
                @ui-snackbar-close=${(e: Event) => { (e.target as UiSnackbar).open = false; }}
            ></ui-snackbar>
        </div>
    `,
};
