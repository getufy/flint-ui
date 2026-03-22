import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import uiToasterStyles from './flint-toaster.css?inline';
import { FlintElement } from '../flint-element.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  Types                                                               */
/* ─────────────────────────────────────────────────────────────────── */

export type ToastType =
    | 'default'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'loading';

export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface ToastAction {
    label: string;
    onClick: () => void;
}

export interface ToastOptions {
    /** Override the auto-generated id. Useful for updating an existing toast.
 * @csspart base - The component's base wrapper element.
 */
    id?: string;
    /** Secondary text displayed below the message. */
    description?: string;
    /**
     * Auto-dismiss duration in milliseconds.
     * Pass `Infinity` to keep the toast until manually dismissed.
     * Default: inherits from `<flint-toaster duration="…">` (4000 ms).
     */
    duration?: number;
    /** An action button rendered inside the toast. */
    action?: ToastAction;
    /**
     * Whether the ✕ close button is shown.
     * Default: `true`.
     */
    dismissible?: boolean;
    /**
     * Route this toast to the `<flint-toaster>` whose `position` attribute matches.
     * Leave unset to display in every mounted toaster.
     */
    position?: ToastPosition;
}

/** Internal extended shape stored in the singleton. */
interface _ToastData extends ToastOptions {
    id: string;
    type: ToastType;
    message: string;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Singleton store                                                     */
/* ─────────────────────────────────────────────────────────────────── */

type _Listener = () => void;

const _store = {
    toasts: [] as _ToastData[],
    listeners: new Set<_Listener>(),

    add(t: _ToastData): void {
        const idx = this.toasts.findIndex(x => x.id === t.id);
        if (idx >= 0) {
            this.toasts = this.toasts.map((x, i) => (i === idx ? { ...x, ...t } : x));
        } else {
            this.toasts = [...this.toasts, t];
        }
        this._notify();
    },

    update(id: string, patch: Partial<_ToastData>): void {
        this.toasts = this.toasts.map(t => (t.id === id ? { ...t, ...patch } : t));
        this._notify();
    },

    remove(id: string): void {
        this.toasts = this.toasts.filter(t => t.id !== id);
        this._notify();
    },

    clear(): void {
        this.toasts = [];
        this._notify();
    },

    _notify(): void {
        this.listeners.forEach(l => l());
    },
};

let _seq = 0;
const _uid = (): string => `flint-toast-${++_seq}`;

/* ─────────────────────────────────────────────────────────────────── */
/*  toast() imperative API                                              */
/* ─────────────────────────────────────────────────────────────────── */

function _create(message: string, type: ToastType, opts: ToastOptions = {}): string {
    const id = opts.id ?? _uid();
    _store.add({
        ...opts,
        id,
        type,
        message,
        dismissible: opts.dismissible !== false,
    });
    return id;
}

/**
 * Show a toast notification.
 *
 * Place `<flint-toaster>` once in your app (e.g. in `<body>`), then call
 * `toast()` anywhere.
 *
 * @example
 * ```ts
 * import { toast } from './flint-sonner.js';
 *
 * toast('Saved!');
 * toast.success('Profile updated', { description: 'Changes saved.' });
 * toast.promise(fetch('/api/save'), {
 *   loading: 'Saving…',
 *   success: 'Done!',
 *   error:   'Failed.',
 * });
 * ```
 */
export const toast = Object.assign(
    (message: string, opts?: ToastOptions): string => _create(message, 'default', opts),
    {
        /** Show a success toast. */
        success: (message: string, opts?: ToastOptions): string =>
            _create(message, 'success', opts),

        /** Show an error toast. */
        error: (message: string, opts?: ToastOptions): string =>
            _create(message, 'error', opts),

        /** Show an info toast. */
        info: (message: string, opts?: ToastOptions): string =>
            _create(message, 'info', opts),

        /** Show a warning toast. */
        warning: (message: string, opts?: ToastOptions): string =>
            _create(message, 'warning', opts),

        /** Show a persistent loading toast (duration = Infinity). */
        loading: (message: string, opts?: ToastOptions): string =>
            _create(message, 'loading', { ...opts, duration: Infinity }),

        /**
         * Track a Promise with automatic loading → success/error transitions.
         *
         * @returns The toast id (same id throughout the lifecycle).
         */
        promise<T>(
            promise: Promise<T>,
            messages: {
                loading: string;
                success: string | ((data: T) => string);
                error?: string | ((err: unknown) => string);
            },
            opts?: ToastOptions,
        ): string {
            const id = opts?.id ?? _uid();
            _store.add({
                ...opts,
                id,
                type: 'loading',
                message: messages.loading,
                duration: Infinity,
                dismissible: false,
            });
            promise
                .then((data: T) => {
                    const msg =
                        typeof messages.success === 'function'
                            ? messages.success(data)
                            : messages.success;
                    _store.update(id, {
                        type: 'success',
                        message: msg,
                        dismissible: true,
                        duration: opts?.duration,
                    });
                })
                .catch((err: unknown) => {
                    const raw = messages.error ?? 'Something went wrong';
                    const msg = typeof raw === 'function' ? raw(err) : raw;
                    _store.update(id, {
                        type: 'error',
                        message: msg,
                        dismissible: true,
                        duration: opts?.duration,
                    });
                });
            return id;
        },

        /**
         * Dismiss a specific toast by id, or all toasts when called with no argument.
         */
        dismiss(id?: string): void {
            if (id !== undefined) {
                _store.remove(id);
            } else {
                _store.clear();
            }
        },
    },
);

/* ─────────────────────────────────────────────────────────────────── */
/*  SVG icons (module-level, never change)                             */
/* ─────────────────────────────────────────────────────────────────── */

const _checkIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"></path>
    </svg>
`;

const _errorIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m15 9-6 6"></path>
        <path d="m9 9 6 6"></path>
    </svg>
`;

const _infoIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
    </svg>
`;

const _warningIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
    </svg>
`;

const _closeIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-toaster                                                          */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Toast container. Place **once** in your application (typically in `<body>`).
 * Toasts are created imperatively via the `toast()` function.
 *
 * Multiple toasts collapse into a card-deck stack when idle; hover expands them
 * into a full list so users can read all messages.
 *
 * @example
 * ```html
 * <!-- In your app shell -->
 * <flint-toaster position="bottom-right"></flint-toaster>
 * ```
 *
 * @attr {string} position       - Stack position: top-left | top-center | top-right |
 *                                  bottom-left | bottom-center | bottom-right.
 *                                  Default: `bottom-right`.
 * @attr {number} duration       - Default auto-dismiss duration in ms. Default: `4000`.
 * @attr {number} visible-toasts - Max number of toasts visible at once. Default: `3`.
 *
 * @cssprop --flint-toast-z-index      - Stack order (default: 9999).
 * @cssprop --flint-toast-width        - Max width of the toaster area (default: 356px).
 * @cssprop --flint-toast-gap          - Gap between toasts when expanded (default: 8px).
 * @cssprop --flint-toast-padding      - Outer padding of the toaster (default: 16px).
 * @cssprop --flint-toast-bg           - Toast background (default: surface-1 / #fff).
 * @cssprop --flint-toast-color        - Toast text color (default: text-color).
 * @cssprop --flint-toast-border       - Toast border (default: 1px solid border-color).
 * @cssprop --flint-toast-radius       - Toast border-radius (default: border-radius-lg).
 * @cssprop --flint-toast-shadow       - Toast box-shadow (default: shadow-lg).
 * @cssprop --flint-toast-stack-gap    - Peek offset per depth level when collapsed (default: 6px).
 * @cssprop --flint-toast-success-icon-color - Icon color for success type.
 * @cssprop --flint-toast-error-icon-color   - Icon color for error type.
 * @cssprop --flint-toast-warning-icon-color - Icon color for warning type.
 * @cssprop --flint-toast-info-icon-color    - Icon color for info type.
 */
export class FlintToaster extends FlintElement {
    static styles = unsafeCSS(uiToasterStyles);

    /** Position of the toast stack relative to the viewport. */
    @property({ type: String, reflect: true }) position: ToastPosition = 'bottom-right';

    /** Default auto-dismiss duration in milliseconds. */
    @property({ type: Number }) duration = 4000;

    /** Maximum number of toasts visible simultaneously. */
    @property({ type: Number, attribute: 'visible-toasts' }) visibleToasts = 3;

    private _toasts: _ToastData[] = [];
    private _timers = new Map<string, ReturnType<typeof setTimeout>>();

    /**
     * Whether the pointer is currently over the toaster.
     * `true`  → expanded (all toasts in full list)
     * `false` → collapsed (card-deck stack)
     */
    private _expanded = false;

    private _listener = (): void => {
        this._toasts = [..._store.toasts];
        this.requestUpdate();
    };

    /** Arrow functions keep `this` context when used as event listeners on `this`. */
    private _handleExpand = (): void => {
        this._expanded = true;
        this.requestUpdate();
    };

    private _handleCollapse = (): void => {
        this._expanded = false;
        this.requestUpdate();
    };

    override connectedCallback() {
        super.connectedCallback();
        _store.listeners.add(this._listener);
        this._toasts = [..._store.toasts];
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        _store.listeners.delete(this._listener);
        this._timers.forEach(t => clearTimeout(t));
        this._timers.clear();
    }

    override updated(changed: PropertyValues) {
        void changed;

        // Clear timers for toasts that no longer exist.
        const visibleIds = new Set(this._toasts.map(t => t.id));
        this._timers.forEach((timer, id) => {
            if (!visibleIds.has(id)) {
                clearTimeout(timer);
                this._timers.delete(id);
            }
        });

        // Start timers for new or updated toasts that need one.
        this._toasts.forEach(t => {
            if (this._timers.has(t.id)) return;
            const dur = t.duration !== undefined ? t.duration : this.duration;
            if (Number.isFinite(dur) && dur > 0) {
                this._timers.set(t.id, setTimeout(() => this._dismiss(t.id), dur));
            }
        });
    }

    private _dismiss(id: string): void {
        clearTimeout(this._timers.get(id));
        this._timers.delete(id);
        _store.remove(id);
    }

    private _pauseTimer(id: string): void {
        const timer = this._timers.get(id);
        if (timer !== undefined) {
            clearTimeout(timer);
            this._timers.delete(id);
        }
    }

    private _resumeTimer(t: _ToastData): void {
        if (this._timers.has(t.id)) return;
        const dur = t.duration !== undefined ? t.duration : this.duration;
        if (Number.isFinite(dur) && dur > 0) {
            this._timers.set(t.id, setTimeout(() => this._dismiss(t.id), dur));
        }
    }

    private _icon(type: ToastType) {
        switch (type) {
            case 'success': return html`<span class="toast__icon toast__icon--success">${_checkIcon}</span>`;
            case 'error':   return html`<span class="toast__icon toast__icon--error">${_errorIcon}</span>`;
            case 'warning': return html`<span class="toast__icon toast__icon--warning">${_warningIcon}</span>`;
            case 'info':    return html`<span class="toast__icon toast__icon--info">${_infoIcon}</span>`;
            case 'loading': return html`<span class="toast__icon toast__icon--loading"><span class="spinner"></span></span>`;
            default:        return nothing;
        }
    }

    /**
     * Render a single toast.
     *
     * @param t          - Toast data.
     * @param frontIndex - 0 = most-recent / front card; higher = further back.
     */
    private _renderToast(t: _ToastData, frontIndex: number) {
        const ariaLive = t.type === 'error' ? 'assertive' : t.type === 'loading' ? 'off' : 'polite';

        // CSS custom properties drive the card-deck transforms in the collapsed
        // state. The front toast (index 0) keeps scale=1 / offset=0 / opacity=1
        // and stays in normal flow; back toasts shift slightly and fade.
        const stackScale   = +(1 - frontIndex * 0.05).toFixed(3);
        const stackOffset  = frontIndex * 6;   // px peek offset per depth level
        const stackOpacity = +(Math.max(1 - frontIndex * 0.2, 0)).toFixed(3);

        return html`
            <div
                class="toast toast--${t.type}"
                role="status"
                aria-live=${ariaLive}
                aria-atomic="true"
                data-toast-id=${t.id}
                data-front-index=${frontIndex}
                style="--_stack-scale:${stackScale};--_stack-offset:${stackOffset};--_stack-opacity:${stackOpacity}"
                @mouseenter=${() => this._pauseTimer(t.id)}
                @mouseleave=${() => this._resumeTimer(t)}
            >
                ${this._icon(t.type)}
                <div class="toast__body">
                    <div class="toast__message">${t.message}</div>
                    ${t.description
                        ? html`<div class="toast__description">${t.description}</div>`
                        : nothing}
                    ${t.action
                        ? html`
                            <button
                                class="toast__action"
                                @click=${() => { t.action!.onClick(); this._dismiss(t.id); }}
                            >${t.action.label}</button>
                          `
                        : nothing}
                </div>
                ${t.dismissible !== false
                    ? html`
                        <button
                            class="toast__close"
                            aria-label="Dismiss notification"
                            @click=${() => this._dismiss(t.id)}
                        >${_closeIcon}</button>
                      `
                    : nothing}
            </div>
        `;
    }

    override render() {
        const isTop = this.position.startsWith('top');

        // Only show toasts targeted at this toaster's position (or unrouted ones).
        const filtered = this._toasts.filter(
            t => t.position === undefined || t.position === this.position,
        );

        // Slice the most-recent N toasts.
        // Bottom: ordered oldest→newest (newest = last in DOM = front card at bottom).
        // Top:    ordered newest→oldest (newest = first in DOM = front card at top).
        const visible = filtered.slice(-this.visibleToasts);
        const ordered = isTop ? [...visible].reverse() : visible;
        const total   = ordered.length;

        return html`
            <div
                class="toaster toaster--${isTop ? 'top' : 'bottom'} ${this._expanded ? 'toaster--expanded' : ''}"
                part="base"
                @mouseenter=${this._handleExpand}
                @mouseleave=${this._handleCollapse}
            >
                ${repeat(ordered, t => t.id, (t, i) => {
                    // frontIndex: 0 = newest/front, N-1 = oldest/back.
                    const frontIndex = isTop ? i : total - 1 - i;
                    return this._renderToast(t, frontIndex);
                })}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-toaster': FlintToaster;
    }
}
