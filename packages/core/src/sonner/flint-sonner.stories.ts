import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-sonner.js';
import { toast } from './flint-sonner.js';
import '../button/flint-button.js';

const meta: Meta = {
    title: 'Feedback/Sonner',
    component: 'flint-toaster',
    parameters: {
        docs: {
            description: {
                component: `
Toast container. Place **once** in your application (typically in \`<body>\`).
Toasts are created imperatively via the \`toast()\` function.

- **Tag**: \`<flint-toaster>\`
- **Class**: \`FlintToaster\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`position\` | \`position\` | \`ToastPosition\` | \`'bottom-right'\` | Position of the toast stack relative to the viewport. |
| \`duration\` | \`duration\` | \`number\` | \`4000\` | Default auto-dismiss duration in milliseconds. |
| \`visibleToasts\` | \`visible-toasts\` | \`number\` | \`3\` | Maximum number of toasts visible simultaneously. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-toast-z-index\` | — |
| \`--flint-toast-width\` | — |
| \`--flint-toast-gap\` | — |
| \`--flint-toast-padding\` | — |
| \`--flint-toast-bg\` | — |
| \`--flint-toast-color\` | — |
| \`--flint-toast-border\` | — |
| \`--flint-toast-radius\` | — |
| \`--flint-toast-shadow\` | — |
| \`--flint-toast-stack-gap\` | — |
| \`--flint-toast-success-icon-color\` | — |
| \`--flint-toast-error-icon-color\` | — |
| \`--flint-toast-warning-icon-color\` | — |
| \`--flint-toast-info-icon-color\` | — |
| \`--flint-font-family\` | \`system-ui, sans-serif\` |
| \`--flint-text-color-muted\` | \`#4b5563\` |
| \`--flint-border-color\` | \`#e4e4e7\` |
| \`--flint-border-radius-md\` | \`0.375rem\` |
| \`--flint-hover-color\` | \`rgba(0, 0, 0, 0.04\` |
| \`--flint-primary-focus-ring\` | \`rgba(59, 130, 246, 0.5\` |
| \`--flint-text-color-subtle\` | \`#4b5563\` |
| \`--flint-border-radius-sm\` | \`0.125rem\` |
| \`--flint-text-color\` | \`#111827\` |
                `,
            },
        },
    },
    argTypes: {
        position: {
            control: 'select',
            options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
        },
        duration:     { control: 'number' },
        visibleToasts: { control: 'number' },
    },
    args: {
        position:      'bottom-right',
        duration:      4000,
        visibleToasts: 3,
    },
};

export default meta;
type Story = StoryObj;

/* ── Playground ──────────────────────────────────────────────────── */
export const Playground: Story = {
    render: (args) => html`
        <flint-toaster
            .position=${args.position}
            .duration=${args.duration}
            .visibleToasts=${args.visibleToasts}
        ></flint-toaster>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <flint-button variant="secondary" @click=${() => toast('Event has been created')}>
                Default
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.success('Event has been created')}>
                Success
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.error('Event has not been created')}>
                Error
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.info('Be at the area 10 minutes before the event time')}>
                Info
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.warning('Event start time cannot be earlier than 8am')}>
                Warning
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.loading('Uploading file…', { duration: Infinity })}>
                Loading
            </flint-button>
        </div>
    `,
};

/* ── Types ───────────────────────────────────────────────────────── */
export const Types: Story = {
    name: 'All Types',
    render: () => html`
        <flint-toaster position="bottom-right"></flint-toaster>
        <div style="display: flex; flex-direction: column; gap: 8px; padding: 24px; max-width: 320px; font-family: var(--flint-font-family, system-ui);">
            <p style="margin: 0 0 8px; font-size: 0.875rem; color: #4b5563;">
                Click each button to see the corresponding toast type.
            </p>
            <flint-button variant="secondary" @click=${() => toast('Event has been created')}>
                Default
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.success('Event has been created')}>
                Success
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.info('Be at the area 10 minutes before the event time')}>
                Info
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.warning('Event start time cannot be earlier than 8am')}>
                Warning
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.error('Event has not been created')}>
                Error
            </flint-button>
            <flint-button variant="secondary" @click=${() =>
                toast.promise<{ name: string }>(
                    new Promise(resolve => setTimeout(() => resolve({ name: 'Sonner Demo' }), 2000)),
                    {
                        loading: 'Loading…',
                        success: (data) => `${data.name} has been created`,
                        error: 'Error',
                    },
                )
            }>
                Promise
            </flint-button>
        </div>
    `,
};

/* ── Description ─────────────────────────────────────────────────── */
export const Description: Story = {
    render: () => html`
        <flint-toaster position="bottom-right"></flint-toaster>
        <div style="padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <flint-button
                variant="secondary"
                @click=${() =>
                    toast('Event has been created', {
                        description: 'Sunday, December 03, 2023 at 9:00 AM',
                    })
                }
            >
                Show Toast with Description
            </flint-button>
        </div>
    `,
};

/* ── Action ──────────────────────────────────────────────────────── */
export const WithAction: Story = {
    name: 'With Action',
    render: () => html`
        <flint-toaster position="bottom-right"></flint-toaster>
        <div style="padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <flint-button
                variant="secondary"
                @click=${() =>
                    toast('Event has been created', {
                        description: 'Sunday, December 03, 2023 at 9:00 AM',
                        action: {
                            label: 'Undo',
                            onClick: () => toast.info('Action undone'),
                        },
                    })
                }
            >
                Show Toast with Action
            </flint-button>
        </div>
    `,
};

/* ── Position ────────────────────────────────────────────────────── */
export const Position: Story = {
    render: () => html`
        <flint-toaster position="top-left"></flint-toaster>
        <flint-toaster position="top-center"></flint-toaster>
        <flint-toaster position="top-right"></flint-toaster>
        <flint-toaster position="bottom-left"></flint-toaster>
        <flint-toaster position="bottom-center"></flint-toaster>
        <flint-toaster position="bottom-right"></flint-toaster>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <flint-button variant="secondary"
                @click=${() => toast('Top Left', { position: 'top-left' })}>
                Top Left
            </flint-button>
            <flint-button variant="secondary"
                @click=${() => toast('Top Center', { position: 'top-center' })}>
                Top Center
            </flint-button>
            <flint-button variant="secondary"
                @click=${() => toast('Top Right', { position: 'top-right' })}>
                Top Right
            </flint-button>
            <flint-button variant="secondary"
                @click=${() => toast('Bottom Left', { position: 'bottom-left' })}>
                Bottom Left
            </flint-button>
            <flint-button variant="secondary"
                @click=${() => toast('Bottom Center', { position: 'bottom-center' })}>
                Bottom Center
            </flint-button>
            <flint-button variant="secondary"
                @click=${() => toast('Bottom Right', { position: 'bottom-right' })}>
                Bottom Right
            </flint-button>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: 'Six `<flint-toaster>` elements — one per corner. Each button routes its toast to the matching toaster via `{ position: "…" }`. Unrouted `toast()` calls appear in every toaster; routed calls appear only in the matching one.',
            },
        },
    },
};

/* ── Promise ─────────────────────────────────────────────────────── */
export const PromiseToast: Story = {
    name: 'Promise',
    render: () => html`
        <flint-toaster position="bottom-right"></flint-toaster>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <flint-button
                variant="secondary"
                @click=${() =>
                    toast.promise<{ name: string }>(
                        new Promise(resolve =>
                            setTimeout(() => resolve({ name: 'Event' }), 2000),
                        ),
                        {
                            loading: 'Creating event…',
                            success: (data) => `${data.name} has been created`,
                            error: 'Failed to create event',
                        },
                    )
                }
            >
                Resolve (2s)
            </flint-button>
            <flint-button
                variant="secondary"
                @click=${() =>
                    toast.promise(
                        new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('network error')), 2000),
                        ),
                        {
                            loading: 'Uploading file…',
                            success: 'Upload complete',
                            error: (err) => `Upload failed: ${(err as Error).message}`,
                        },
                    )
                }
            >
                Reject (2s)
            </flint-button>
        </div>
    `,
};

/* ── Persistent ──────────────────────────────────────────────────── */
export const Persistent: Story = {
    render: () => {
        let loadingId: string | undefined;
        return html`
            <flint-toaster position="bottom-right"></flint-toaster>
            <div style="display: flex; gap: 8px; padding: 24px; font-family: var(--flint-font-family, system-ui);">
                <flint-button
                    variant="secondary"
                    @click=${() => {
                        loadingId = toast.loading('Processing in background…', { duration: Infinity });
                    }}
                >
                    Start Loading
                </flint-button>
                <flint-button
                    variant="secondary"
                    @click=${() => {
                        if (loadingId) {
                            toast.dismiss(loadingId);
                            loadingId = undefined;
                        }
                    }}
                >
                    Stop Loading
                </flint-button>
                <flint-button
                    variant="secondary"
                    @click=${() =>
                        toast('This will not auto-dismiss', {
                            duration: Infinity,
                            description: 'Close it manually with the ✕ button.',
                        })
                    }
                >
                    Persistent Toast
                </flint-button>
            </div>
        `;
    },
};

/* ── Dismiss ─────────────────────────────────────────────────────── */
export const DismissAll: Story = {
    name: 'Dismiss All',
    render: () => html`
        <flint-toaster position="bottom-right"></flint-toaster>
        <div style="display: flex; gap: 8px; padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <flint-button
                variant="secondary"
                @click=${() => {
                    toast('First toast');
                    toast.success('Second toast');
                    toast.info('Third toast');
                }}
            >
                Add 3 Toasts
            </flint-button>
            <flint-button variant="secondary" @click=${() => toast.dismiss()}>
                Dismiss All
            </flint-button>
        </div>
    `,
};

/* ── Stacked ─────────────────────────────────────────────────────── */
export const Stacked: Story = {
    name: 'Card Stack (hover to expand)',
    render: () => html`
        <flint-toaster position="bottom-right"></flint-toaster>
        <div style="padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563;">
                When multiple toasts are active they collapse into a card deck.
                Hover the stack in the bottom-right to expand all toasts.
            </p>
            <flint-button
                variant="secondary"
                @click=${() => {
                    toast('Event has been created');
                    toast.success('Changes saved successfully');
                    toast.info('3 items were updated');
                }}
            >
                Show 3 Toasts
            </flint-button>
        </div>
    `,
};

/* ── VisibleToasts ───────────────────────────────────────────────── */
export const VisibleToastsLimit: Story = {
    name: 'Visible Toasts Limit',
    render: () => html`
        <flint-toaster position="bottom-right" visible-toasts="2"></flint-toaster>
        <div style="padding: 24px; font-family: var(--flint-font-family, system-ui);">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563;">
                <code>visible-toasts="2"</code> — only the 2 most recent toasts are displayed.
            </p>
            <flint-button
                variant="secondary"
                @click=${() => toast(`Toast ${Date.now()}`)}
            >
                Add Toast
            </flint-button>
        </div>
    `,
};
