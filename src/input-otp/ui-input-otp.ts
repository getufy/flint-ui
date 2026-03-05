import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-input-otp-group                                                 */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Visual grouping wrapper for `ui-input-otp-slot` elements.
 * Renders slots inline with shared borders.
 *
 * @slot - Accepts `ui-input-otp-slot` elements.
 */
@customElement('ui-input-otp-group')
export class UiInputOtpGroup extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-input-otp-separator                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Visual separator between `ui-input-otp-group` elements.
 * Renders a short horizontal bar.
 */
@customElement('ui-input-otp-separator')
export class UiInputOtpSeparator extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            padding: 0 6px;
            color: var(--ui-text-color, #111827);
        }

        .bar {
            width: 8px;
            height: 2px;
            background: currentColor;
            border-radius: 1px;
            opacity: 0.4;
        }
    `;

    render() {
        return html`<div class="bar"></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-input-otp-slot                                                  */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single character cell in an OTP input.
 * Place inside `ui-input-otp-group`. State is managed by `ui-input-otp`.
 *
 * @attr {number}  index   - Zero-based position of this slot.
 * @attr {string}  char    - Character currently displayed (set by `ui-input-otp`).
 * @attr {boolean} active  - Whether the text cursor is at this position.
 * @attr {boolean} invalid - Marks the slot as invalid (error state).
 */
@customElement('ui-input-otp-slot')
export class UiInputOtpSlot extends LitElement {
    static styles = css`
        :host {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 48px;
            font-size: 1.25rem;
            font-family: var(--ui-font-family, system-ui, sans-serif);
            font-weight: 500;
            color: var(--ui-text-color, #111827);
            background: #fff;
            border: 1px solid #d1d5db;
            margin-left: -1px;
            cursor: text;
            user-select: none;
            transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        :host(:first-child) {
            margin-left: 0;
            border-radius: 6px 0 0 6px;
        }

        :host(:last-child) {
            border-radius: 0 6px 6px 0;
        }

        :host([active]) {
            z-index: 1;
            border-color: var(--ui-primary-color, #3b82f6);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        :host([invalid]) {
            border-color: #ef4444;
        }

        :host([invalid][active]) {
            border-color: #ef4444;
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }

        .cursor {
            width: 2px;
            height: 1.2em;
            background: var(--ui-text-color, #111827);
            border-radius: 1px;
            animation: otp-blink 1.2s step-end infinite;
        }

        @keyframes otp-blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
        }
    `;

    /** Zero-based position index of this slot. */
    @property({ type: Number }) index = 0;

    /** Character displayed. Set by the parent `ui-input-otp`. */
    @property() char = '';

    /** Whether the cursor is at this position. Set by the parent `ui-input-otp`. */
    @property({ type: Boolean, reflect: true }) active = false;

    /** Error / invalid state. */
    @property({ type: Boolean, reflect: true }) invalid = false;

    render() {
        if (this.char) {
            return html`${this.char}`;
        }
        if (this.active) {
            return html`<div class="cursor"></div>`;
        }
        return html``;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-input-otp                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Accessible one-time password input with copy/paste support.
 * Manages a hidden native `<input>` and syncs each `ui-input-otp-slot`
 * with the appropriate character and active-cursor state.
 *
 * @slot - Accepts `ui-input-otp-group`, `ui-input-otp-separator`, and
 *         `ui-input-otp-slot` elements.
 *
 * @fires ui-otp-change   - Fired on every value change. `detail: { value: string }`.
 * @fires ui-otp-complete - Fired when `maxLength` chars have been entered.
 *                          `detail: { value: string }`.
 *
 * @attr {string}  value         - Current OTP value (controlled).
 * @attr {string}  default-value - Initial value for uncontrolled usage.
 * @attr {number}  max-length    - Number of digits/characters (default: 6).
 * @attr {string}  pattern       - Per-character regex tested against each input char.
 *                                 E.g. `"\\d"` for digits only, `"[a-zA-Z0-9]"` for
 *                                 alphanumeric. Empty string accepts everything.
 * @attr {boolean} disabled      - Disables the input.
 */
@customElement('ui-input-otp')
export class UiInputOtp extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            position: relative;
            cursor: text;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }

        :host([disabled]) {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .hidden-input {
            position: absolute;
            opacity: 0;
            pointer-events: none;
            width: 1px;
            height: 1px;
            top: 0;
            left: 0;
            border: none;
            outline: none;
            padding: 0;
            margin: 0;
        }
    `;

    /** Current OTP value. Reflects to attribute for external observation. */
    @property({ reflect: true }) value = '';

    /** Initial uncontrolled value. Has no effect after the first render. */
    @property({ attribute: 'default-value' }) defaultValue = '';

    /** Total number of character slots. */
    @property({ type: Number, attribute: 'max-length' }) maxLength = 6;

    /**
     * Per-character regex pattern string. Characters failing the test are
     * silently rejected on input and paste.
     * E.g. `"\\d"` accepts digits only; `"[a-zA-Z0-9]"` accepts alphanumeric.
     */
    @property() pattern = '';

    /** Disables the OTP input. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    @query('.hidden-input') private _hiddenInput!: HTMLInputElement;

    private _internalValue = '';
    private _focused = false;
    private _cursorIndex = 0;
    private _firstUpdate = true;

    constructor() {
        super();
        this.addEventListener('click', (e: Event) => {
            if (this.disabled) return;
            // Determine which slot was clicked so we can position the cursor there.
            const target = e.target as HTMLElement;
            const slot = target.closest('ui-input-otp-slot') as UiInputOtpSlot | null;

            this._hiddenInput?.focus();
            // focus() calls _handleFocus synchronously (sets cursor to end).
            // Override with the clicked slot's index if applicable.
            if (slot) {
                this._cursorIndex = Math.min(slot.index, this._internalValue.length);
                this._syncSlots();
            }
        });
    }

    override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue && !this.value) {
                this._internalValue = this.defaultValue.slice(0, this.maxLength);
                this.value = this._internalValue;
            } else {
                this._internalValue = this.value.slice(0, this.maxLength);
            }
            // Allow cursor to sit one past the last slot when value is full.
            this._cursorIndex = Math.min(this._internalValue.length, this.maxLength - 1);
            return;
        }
        if (changed.has('value') && this.value !== this._internalValue) {
            this._internalValue = this.value.slice(0, this.maxLength);
            // Keep cursor in bounds after an external value change.
            this._cursorIndex = Math.min(this._cursorIndex, Math.max(0, this._internalValue.length));
        }
    }

    override updated(changed: PropertyValues) {
        if (changed.has('value') || changed.has('maxLength')) {
            this._syncSlots();
            if (this._hiddenInput && this._hiddenInput.value !== this._internalValue) {
                this._hiddenInput.value = this._internalValue;
            }
        }
    }

    private _getAllSlots(): UiInputOtpSlot[] {
        return Array.from(this.querySelectorAll('ui-input-otp-slot')) as UiInputOtpSlot[];
    }

    private _syncSlots() {
        const slots = this._getAllSlots();
        const len = this._internalValue.length;
        // _cursorIndex is shown only while focused.
        const activeIndex = this._focused ? this._cursorIndex : -1;

        for (const slot of slots) {
            const i = slot.index;
            slot.char = i < len ? this._internalValue[i] : '';
            slot.active = i === activeIndex;
        }
    }

    private _filterByPattern(text: string): string {
        if (!this.pattern) return text;
        const re = new RegExp(this.pattern);
        return text.split('').filter(ch => re.test(ch)).join('');
    }

    /** Store a new value and fire change/complete events. Does NOT call _syncSlots. */
    private _commit(newVal: string) {
        this._internalValue = newVal;
        this.value = newVal;
        if (this._hiddenInput) this._hiddenInput.value = newVal;

        this.dispatchEvent(new CustomEvent('ui-otp-change', {
            detail: { value: newVal },
            bubbles: true,
            composed: true,
        }));

        if (newVal.length === this.maxLength) {
            this.dispatchEvent(new CustomEvent('ui-otp-complete', {
                detail: { value: newVal },
                bubbles: true,
                composed: true,
            }));
        }
    }

    // ── keyboard operations ──────────────────────────────────────────

    /**
     * Insert (or replace) a character at the current cursor position, then
     * advance the cursor by one slot.
     */
    private _insertChar(char: string) {
        if (this.pattern && !new RegExp(this.pattern).test(char)) return;

        const i = this._cursorIndex;
        const val = this._internalValue;
        let newVal: string;

        if (i < val.length) {
            // Replace the character at position i (no shifting).
            newVal = val.slice(0, i) + char + val.slice(i + 1);
        } else if (val.length < this.maxLength) {
            // Cursor is at the first empty slot — append.
            newVal = val + char;
        } else {
            return; // Full value and cursor at end; shouldn't be reachable.
        }

        this._commit(newVal);
        // Advance cursor to next slot, clamped to the last slot (maxLength - 1).
        // Keeping cursor within slot bounds ensures _deleteBackward always hits
        // the "cursor ON a filled slot" branch for a subsequent backspace.
        this._cursorIndex = Math.min(i + 1, this.maxLength - 1);
        this._syncSlots();
    }

    /** Delete the character at the cursor (standard Backspace). */
    private _deleteBackward() {
        if (this._internalValue.length === 0) return;

        const i = this._cursorIndex;
        if (i === 0) return; // Nothing before cursor.

        const val = this._internalValue;
        // Delete the char immediately before the cursor and shift remaining chars left.
        // Works uniformly whether the cursor is on a filled slot or past the filled region.
        const newVal = val.slice(0, i - 1) + val.slice(i);
        this._commit(newVal);
        this._cursorIndex = i - 1;
        this._syncSlots();
    }

    /** Delete the character at the cursor (Delete key). */
    private _deleteForward() {
        const i = this._cursorIndex;
        const val = this._internalValue;
        if (i >= val.length) return;

        // Splice out only the char at i, shifting the rest left.
        const newVal = val.slice(0, i) + val.slice(i + 1);
        this._commit(newVal);
        // Cursor stays at i.
        this._syncSlots();
    }

    /** Move cursor left or right, clamped to the filled region. */
    private _moveCursor(delta: number) {
        const maxIdx = Math.min(this._internalValue.length, this.maxLength - 1);
        this._cursorIndex = Math.max(0, Math.min(this._cursorIndex + delta, maxIdx));
        this._syncSlots();
    }

    // ── event handlers ───────────────────────────────────────────────

    private _handleKeydown(e: KeyboardEvent) {
        // Let Tab and modifier combos (Ctrl+C, Ctrl+A, Cmd+V, …) pass through.
        if (e.key === 'Tab' || e.metaKey || e.ctrlKey) return;

        if (e.key === 'ArrowLeft')  { e.preventDefault(); this._moveCursor(-1); return; }
        if (e.key === 'ArrowRight') { e.preventDefault(); this._moveCursor(1);  return; }
        if (e.key === 'Home')       { e.preventDefault(); this._cursorIndex = 0; this._syncSlots(); return; }
        if (e.key === 'End') {
            e.preventDefault();
            this._cursorIndex = Math.min(this._internalValue.length, this.maxLength - 1);
            this._syncSlots();
            return;
        }
        if (e.key === 'Backspace') { e.preventDefault(); this._deleteBackward(); return; }
        if (e.key === 'Delete')    { e.preventDefault(); this._deleteForward();  return; }

        if (e.key.length === 1) {
            e.preventDefault();
            this._insertChar(e.key);
        }
    }

    private _handlePaste(e: ClipboardEvent) {
        e.preventDefault();
        const pasted = e.clipboardData?.getData('text') ?? '';
        const filtered = this._filterByPattern(pasted).slice(0, this.maxLength);
        this._commit(filtered);
        this._cursorIndex = Math.min(filtered.length, this.maxLength - 1);
        this._syncSlots();
    }

    private _handleFocus() {
        this._focused = true;
        // Default: position cursor at the end of the current value.
        // Allow maxLength so backspace on a full value deletes the last char correctly.
        this._cursorIndex = Math.min(this._internalValue.length, this.maxLength - 1);
        this._syncSlots();
    }

    private _handleBlur() {
        this._focused = false;
        this._syncSlots();
    }

    private _handleSlotChange() {
        this._syncSlots();
    }

    /**
     * Compute the appropriate mobile keyboard type.
     * Returns 'numeric' for digit-only patterns (or no pattern), 'text' otherwise.
     */
    private get _computedInputMode(): string {
        if (!this.pattern) return 'numeric';
        try {
            // If the pattern can match the letter 'a', it accepts non-digit chars → text keyboard.
            return new RegExp(this.pattern).test('a') ? 'text' : 'numeric';
        } catch {
            return 'text';
        }
    }

    render() {
        return html`
            <input
                class="hidden-input"
                type="text"
                autocomplete="one-time-code"
                .inputMode=${this._computedInputMode}
                .maxLength=${this.maxLength}
                .value=${this._internalValue}
                ?disabled=${this.disabled}
                @keydown=${this._handleKeydown}
                @paste=${this._handlePaste}
                @focus=${this._handleFocus}
                @blur=${this._handleBlur}
            />
            <slot @slotchange=${this._handleSlotChange}></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-input-otp': UiInputOtp;
        'ui-input-otp-group': UiInputOtpGroup;
        'ui-input-otp-separator': UiInputOtpSeparator;
        'ui-input-otp-slot': UiInputOtpSlot;
    }
}