import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import uiInputOtpGroupStyles from './flint-input-otp-group.css?inline';
import uiInputOtpSeparatorStyles from './flint-input-otp-separator.css?inline';
import uiInputOtpSlotStyles from './flint-input-otp-slot.css?inline';
import uiInputOtpStyles from './flint-input-otp.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-input-otp-group                                                 */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Visual grouping wrapper for `flint-input-otp-slot` elements.
 * Renders slots inline with shared borders.
 *
 * @slot - Accepts `flint-input-otp-slot` elements.
 */
export class FlintInputOtpGroup extends FlintElement {
    static styles = unsafeCSS(uiInputOtpGroupStyles);

    render() {
        return html`<slot></slot>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-input-otp-separator                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Visual separator between `flint-input-otp-group` elements.
 * Renders a short horizontal bar.
 */
export class FlintInputOtpSeparator extends FlintElement {
    static styles = unsafeCSS(uiInputOtpSeparatorStyles);

    render() {
        return html`<div class="bar"></div>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-input-otp-slot                                                  */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single character cell in an OTP input.
 * Place inside `flint-input-otp-group`. State is managed by `flint-input-otp`.
 *
 * @attr {number}  index   - Zero-based position of this slot.
 * @attr {string}  char    - Character currently displayed (set by `flint-input-otp`).
 * @attr {boolean} active  - Whether the text cursor is at this position.
 * @attr {boolean} invalid - Marks the slot as invalid (error state).
 */
export class FlintInputOtpSlot extends FlintElement {
    static styles = unsafeCSS(uiInputOtpSlotStyles);

    /** Zero-based position index of this slot. */
    @property({ type: Number }) index = 0;

    /** Character displayed. Set by the parent `flint-input-otp`. */
    @property() char = '';

    /** Whether the cursor is at this position. Set by the parent `flint-input-otp`. */
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
/*  flint-input-otp                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Accessible one-time password input with copy/paste support.
 * Manages a hidden native `<input>` and syncs each `flint-input-otp-slot`
 * with the appropriate character and active-cursor state.
 *
 * @slot - Accepts `flint-input-otp-group`, `flint-input-otp-separator`, and
 *         `flint-input-otp-slot` elements.
 *
 * @fires flint-otp-change   - Fired on every value change. `detail: { value: string }`.
 * @fires flint-otp-complete - Fired when `maxLength` chars have been entered.
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
export class FlintInputOtp extends FlintElement {
    static styles = unsafeCSS(uiInputOtpStyles);

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

    /** Accessible label for the hidden input (used as aria-label). */
    @property({ type: String }) label = 'One-time password';

    /** Optional description text for the hidden input (used as aria-describedby). */
    @property({ type: String }) description = '';

    @query('.hidden-input') private _hiddenInput!: HTMLInputElement;

    private _internalValue = '';
    private _focused = false;
    private _cursorIndex = 0;
    private _firstUpdate = true;

    private _handleClick = (e: Event) => {
        if (this.disabled) return;
        // Determine which slot was clicked so we can position the cursor there.
        const target = e.target as HTMLElement;
        const slot = target.closest('flint-input-otp-slot') as FlintInputOtpSlot | null;

        this._hiddenInput?.focus();
        // focus() calls _handleFocus synchronously (sets cursor to end).
        // Override with the clicked slot's index if applicable.
        if (slot) {
            this._cursorIndex = Math.min(slot.index, this._internalValue.length);
            this._syncSlots();
        }
    };

    private readonly _descId = `flint-input-otp-desc-${FlintInputOtp._uidCounter++}`;
    private static _uidCounter = 0;

    override connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'group');
        }
        this.addEventListener('click', this._handleClick);
    }

    override disconnectedCallback() {
        this.removeEventListener('click', this._handleClick);
        super.disconnectedCallback();
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
        }
    }

    private _getAllSlots(): FlintInputOtpSlot[] {
        return Array.from(this.querySelectorAll('flint-input-otp-slot')) as FlintInputOtpSlot[];
    }

    private _syncSlots() {
        const slots = this._getAllSlots();
        const len = this._internalValue.length;
        // _cursorIndex is shown only while focused.
        const activeIndex = this._focused ? this._cursorIndex : -1;

        for (const slot of slots) {
            const i = slot.index;
            slot.char = i < len ? this._internalValue[i]! : '';
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
        this._hiddenInput.value = newVal;

        this.dispatchEvent(new CustomEvent('flint-otp-change', {
            detail: { value: newVal },
            bubbles: true,
            composed: true,
        }));

        if (newVal.length === this.maxLength) {
            this.dispatchEvent(new CustomEvent('flint-otp-complete', {
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
        } else {
            // Cursor is at the first empty slot — append.
            // (val.length < maxLength is guaranteed since cursor ≤ maxLength-1 < val.length when full)
            newVal = val + char;
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
                aria-label=${this.label}
                aria-describedby=${this.description ? this._descId : nothing}
                .inputMode=${this._computedInputMode}
                .maxLength=${this.maxLength}
                .value=${this._internalValue}
                ?disabled=${this.disabled}
                @keydown=${this._handleKeydown}
                @paste=${this._handlePaste}
                @focus=${this._handleFocus}
                @blur=${this._handleBlur}
            />
            ${this.description ? html`<span id=${this._descId} class="sr-only">${this.description}</span>` : nothing}
            <slot @slotchange=${this._handleSlotChange}></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-input-otp': FlintInputOtp;
        'flint-input-otp-group': FlintInputOtpGroup;
        'flint-input-otp-separator': FlintInputOtpSeparator;
        'flint-input-otp-slot': FlintInputOtpSlot;
    }
}
