import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-sonner.js';
import { toast } from './ui-sonner.js';
import '../button/ui-button.js';

const meta: Meta = {
    title: 'Feedback/Sonner',
    component: 'ui-toaster',
    parameters: {
        docs: {
            description: {
                component: `
An opinionated, imperative toast notification system built on LitElement.

### Setup
Place \`<ui-toaster>\` **once** in your app shell (e.g. at the end of \`<body>\`):

\`\`\`html
<ui-toaster position="bottom-right"></ui-toaster>
\`\`\`

### Triggering toasts
\`\`\`ts
import { toast } from '@your-lib/ui-sonner';

toast('Event created');
toast.success('Profile saved', { description: 'All changes applied.' });
toast.error('Upload failed', { action: { label: 'Retry', onClick: retry } });
toast.promise(fetch('/api/save'), {
  loading: 'Saving…',
  success: (data) => \`Saved \${data.name}!\`,
  error: 'Save failed',
});
\`\`\`

### Components
- **\`<ui-toaster>\`** — Fixed-position container. One per app.

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-toast-z-index\`   | \`9999\`    | Stack order |
| \`--ui-toast-width\`     | \`356px\`   | Max width of toaster |
| \`--ui-toast-gap\`       | \`8px\`     | Gap between toasts |
| \`--ui-toast-padding\`   | \`16px\`    | Outer padding |
| \`--ui-toast-bg\`        | surface-1   | Toast background |
| \`--ui-toast-color\`     | text-color  | Toast text color |
| \`--ui-toast-border\`    | border-color| Toast border |
| \`--ui-toast-radius\`    | radius-lg   | Border radius |
| \`--ui-toast-shadow\`    | shadow-lg   | Box shadow |
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
        <ui-toaster
            .position=${args.position}
            .duration=${args.duration}
            .visibleToasts=${args.visibleToasts}
        ></ui-toaster>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <ui-button variant="secondary" @click=${() => toast('Event has been created')}>
                Default
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.success('Event has been created')}>
                Success
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.error('Event has not been created')}>
                Error
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.info('Be at the area 10 minutes before the event time')}>
                Info
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.warning('Event start time cannot be earlier than 8am')}>
                Warning
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.loading('Uploading file…', { duration: Infinity })}>
                Loading
            </ui-button>
        </div>
    `,
};

/* ── Types ───────────────────────────────────────────────────────── */
export const Types: Story = {
    name: 'All Types',
    render: () => html`
        <ui-toaster position="bottom-right"></ui-toaster>
        <div style="display: flex; flex-direction: column; gap: 8px; padding: 24px; max-width: 320px; font-family: var(--ui-font-family, system-ui);">
            <p style="margin: 0 0 8px; font-size: 0.875rem; color: #6b7280;">
                Click each button to see the corresponding toast type.
            </p>
            <ui-button variant="secondary" @click=${() => toast('Event has been created')}>
                Default
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.success('Event has been created')}>
                Success
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.info('Be at the area 10 minutes before the event time')}>
                Info
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.warning('Event start time cannot be earlier than 8am')}>
                Warning
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.error('Event has not been created')}>
                Error
            </ui-button>
            <ui-button variant="secondary" @click=${() =>
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
            </ui-button>
        </div>
    `,
};

/* ── Description ─────────────────────────────────────────────────── */
export const Description: Story = {
    render: () => html`
        <ui-toaster position="bottom-right"></ui-toaster>
        <div style="padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <ui-button
                variant="secondary"
                @click=${() =>
                    toast('Event has been created', {
                        description: 'Sunday, December 03, 2023 at 9:00 AM',
                    })
                }
            >
                Show Toast with Description
            </ui-button>
        </div>
    `,
};

/* ── Action ──────────────────────────────────────────────────────── */
export const WithAction: Story = {
    name: 'With Action',
    render: () => html`
        <ui-toaster position="bottom-right"></ui-toaster>
        <div style="padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <ui-button
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
            </ui-button>
        </div>
    `,
};

/* ── Position ────────────────────────────────────────────────────── */
export const Position: Story = {
    render: () => html`
        <ui-toaster position="top-left"></ui-toaster>
        <ui-toaster position="top-center"></ui-toaster>
        <ui-toaster position="top-right"></ui-toaster>
        <ui-toaster position="bottom-left"></ui-toaster>
        <ui-toaster position="bottom-center"></ui-toaster>
        <ui-toaster position="bottom-right"></ui-toaster>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <ui-button variant="secondary"
                @click=${() => toast('Top Left', { position: 'top-left' })}>
                Top Left
            </ui-button>
            <ui-button variant="secondary"
                @click=${() => toast('Top Center', { position: 'top-center' })}>
                Top Center
            </ui-button>
            <ui-button variant="secondary"
                @click=${() => toast('Top Right', { position: 'top-right' })}>
                Top Right
            </ui-button>
            <ui-button variant="secondary"
                @click=${() => toast('Bottom Left', { position: 'bottom-left' })}>
                Bottom Left
            </ui-button>
            <ui-button variant="secondary"
                @click=${() => toast('Bottom Center', { position: 'bottom-center' })}>
                Bottom Center
            </ui-button>
            <ui-button variant="secondary"
                @click=${() => toast('Bottom Right', { position: 'bottom-right' })}>
                Bottom Right
            </ui-button>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: 'Six `<ui-toaster>` elements — one per corner. Each button routes its toast to the matching toaster via `{ position: "…" }`. Unrouted `toast()` calls appear in every toaster; routed calls appear only in the matching one.',
            },
        },
    },
};

/* ── Promise ─────────────────────────────────────────────────────── */
export const PromiseToast: Story = {
    name: 'Promise',
    render: () => html`
        <ui-toaster position="bottom-right"></ui-toaster>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <ui-button
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
            </ui-button>
            <ui-button
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
            </ui-button>
        </div>
    `,
};

/* ── Persistent ──────────────────────────────────────────────────── */
export const Persistent: Story = {
    render: () => {
        let loadingId: string | undefined;
        return html`
            <ui-toaster position="bottom-right"></ui-toaster>
            <div style="display: flex; gap: 8px; padding: 24px; font-family: var(--ui-font-family, system-ui);">
                <ui-button
                    variant="secondary"
                    @click=${() => {
                        loadingId = toast.loading('Processing in background…', { duration: Infinity });
                    }}
                >
                    Start Loading
                </ui-button>
                <ui-button
                    variant="secondary"
                    @click=${() => {
                        if (loadingId) {
                            toast.dismiss(loadingId);
                            loadingId = undefined;
                        }
                    }}
                >
                    Stop Loading
                </ui-button>
                <ui-button
                    variant="secondary"
                    @click=${() =>
                        toast('This will not auto-dismiss', {
                            duration: Infinity,
                            description: 'Close it manually with the ✕ button.',
                        })
                    }
                >
                    Persistent Toast
                </ui-button>
            </div>
        `;
    },
};

/* ── Dismiss ─────────────────────────────────────────────────────── */
export const DismissAll: Story = {
    name: 'Dismiss All',
    render: () => html`
        <ui-toaster position="bottom-right"></ui-toaster>
        <div style="display: flex; gap: 8px; padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <ui-button
                variant="secondary"
                @click=${() => {
                    toast('First toast');
                    toast.success('Second toast');
                    toast.info('Third toast');
                }}
            >
                Add 3 Toasts
            </ui-button>
            <ui-button variant="secondary" @click=${() => toast.dismiss()}>
                Dismiss All
            </ui-button>
        </div>
    `,
};

/* ── Stacked ─────────────────────────────────────────────────────── */
export const Stacked: Story = {
    name: 'Card Stack (hover to expand)',
    render: () => html`
        <ui-toaster position="bottom-right"></ui-toaster>
        <div style="padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280;">
                When multiple toasts are active they collapse into a card deck.
                Hover the stack in the bottom-right to expand all toasts.
            </p>
            <ui-button
                variant="secondary"
                @click=${() => {
                    toast('Event has been created');
                    toast.success('Changes saved successfully');
                    toast.info('3 items were updated');
                }}
            >
                Show 3 Toasts
            </ui-button>
        </div>
    `,
};

/* ── VisibleToasts ───────────────────────────────────────────────── */
export const VisibleToastsLimit: Story = {
    name: 'Visible Toasts Limit',
    render: () => html`
        <ui-toaster position="bottom-right" visible-toasts="2"></ui-toaster>
        <div style="padding: 24px; font-family: var(--ui-font-family, system-ui);">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280;">
                <code>visible-toasts="2"</code> — only the 2 most recent toasts are displayed.
            </p>
            <ui-button
                variant="secondary"
                @click=${() => toast(`Toast ${Date.now()}`)}
            >
                Add Toast
            </ui-button>
        </div>
    `,
};
