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
    },
};

export default meta;

type Story = StoryObj;

/**
 * Basic snackbar with a message.
 */
export const Basic: Story = {
    args: {
        open: false,
        message: 'Note archived',
        anchorOrigin: 'bottom-center',
        autoHideDuration: 6000,
    },
    render: (args) => html`
        <div>
            <ui-button variant="secondary" @click=${() => {
            const sb = document.querySelector('ui-snackbar') as UiSnackbar;
            if (sb) sb.open = true;
        }}>
                Show Snackbar
            </ui-button>
            <ui-snackbar 
                ?open=${args.open} 
                .message=${args.message} 
                .anchorOrigin=${args.anchorOrigin}
                .autoHideDuration=${args.autoHideDuration}
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
            <ui-button variant="primary" @click=${() => {
            const sb = document.getElementById('with-alert-sb') as UiSnackbar;
            if (sb) sb.open = true;
        }}>
                Success Notification
            </ui-button>
            <ui-snackbar 
                id="with-alert-sb"
                ?open=${args.open} 
                anchorOrigin="bottom-right"
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

                <ui-snackbar id="tl" anchor-origin="top-left" message="Top Left Notification" .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="tc" anchor-origin="top-center" message="Top Center Notification" .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="tr" anchor-origin="top-right" message="Top Right Notification" .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="bl" anchor-origin="bottom-left" message="Bottom Left Notification" .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="bc" anchor-origin="bottom-center" message="Bottom Center Notification" .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
                <ui-snackbar id="br" anchor-origin="bottom-right" message="Bottom Right Notification" .autoHideDuration=${3000} @ui-snackbar-close=${(e: Event) => (e.target as UiSnackbar).open = false}></ui-snackbar>
            </div>
        `;
    }
};
