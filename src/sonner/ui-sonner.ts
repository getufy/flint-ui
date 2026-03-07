import { LitElement, unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiToasterStyles from './ui-toaster.css?inline';

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
    /** Override the auto-generated id. Useful for updating an existing toast. */
    id?: string;
    /** Secondary text displayed below the message. */
    description?: string;
    /**
     * Auto-dismiss duration in milliseconds.
     * Pass `Infinity` to keep the toast until manually dismissed.
     * Default: inherits from `<ui-toaster duration="…">` (4000 ms).
     */
    duration?: number;
    /** An action button rendered inside the toast. */
    action?: ToastAction;
    /**
     * Whether the ✕ close button is shown.
     * Default: `true`.
     */
    dismissible?: boolean;
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
const _uid = (): string => `ui-toast-${++_seq}`;

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
 * Place `<ui-toaster>` once in your app (e.g. in `<body>`), then call
 * `toast()` anywhere.
 *
 * @example
 * ```ts
 * import { toast } from './ui-sonner.js';
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
/*  ui-toaster                                                          */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Toast container. Place **once** in your application (typically in `<body>`).
 * Toasts are created imperatively via the `toast()` function.
 *
 * @example
 * ```html
 * <!-- In your app shell -->
 * <ui-toaster position="bottom-right"></ui-toaster>
 * ```
 *
 * @attr {string} position       - Stack position: top-left | top-center | top-right |
 *                                  bottom-left | bottom-center | bottom-right.
 *                                  Default: `bottom-right`.
 * @attr {number} duration       - Default auto-dismiss duration in ms. Default: `4000`.
 * @attr {number} visible-toasts - Max number of toasts visible at once. Default: `3`.
 *
 * @cssprop --ui-toast-z-index      - Stack order (default: 9999).
 * @cssprop --ui-toast-width        - Max width of the toaster area (default: 356px).
 * @cssprop --ui-toast-gap          - Gap between toasts (default: 8px).
 * @cssprop --ui-toast-padding      - Outer padding of the toaster (default: 16px).
 * @cssprop --ui-toast-bg           - Toast background (default: surface-1 / #fff).
 * @cssprop --ui-toast-color        - Toast text color (default: text-color).
 * @cssprop --ui-toast-border       - Toast border (default: 1px solid border-color).
 * @cssprop --ui-toast-radius       - Toast border-radius (default: border-radius-lg).
 * @cssprop --ui-toast-shadow       - Toast box-shadow (default: shadow-lg).
 * @cssprop --ui-toast-success-icon-color - Icon color for success type.
 * @cssprop --ui-toast-error-icon-color   - Icon color for error type.
 * @cssprop --ui-toast-warning-icon-color - Icon color for warning type.
 * @cssprop --ui-toast-info-icon-color    - Icon color for info type.
 */
@customElement('ui-toaster')
export class UiToaster extends LitElement {
    static styles = unsafeCSS(uiToasterStyles);

    /** Position of the toast stack relative to the viewport. */
    @property({ type: String, reflect: true }) position: ToastPosition = 'bottom-right';

    /** Default auto-dismiss duration in milliseconds. */
    @property({ type: Number }) duration = 4000;

    /** Maximum number of toasts visible simultaneously. */
    @property({ type: Number, attribute: 'visible-toasts' }) visibleToasts = 3;

    private _toasts: _ToastData[] = [];
    private _timers = new Map<string, ReturnType<typeof setTimeout>>();

    private _listener = (): void => {
        this._toasts = [..._store.toasts];
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

    private _renderToast(t: _ToastData) {
        const ariaLive = t.type === 'error' ? 'assertive' : t.type === 'loading' ? 'off' : 'polite';
        return html`
            <div
                class="toast toast--${t.type}"
                role="status"
                aria-live=${ariaLive}
                aria-atomic="true"
                data-toast-id=${t.id}
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
        // Slice the most recent N toasts; for top positions newest renders first.
        const visible = this._toasts.slice(-this.visibleToasts);
        const ordered = isTop ? [...visible].reverse() : visible;
        return html`
            <div class="toaster ${isTop ? 'toaster--top' : 'toaster--bottom'}">
                ${ordered.map(t => this._renderToast(t))}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-toaster': UiToaster;
    }
}
