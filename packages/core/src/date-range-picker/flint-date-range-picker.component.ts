import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import { FlintDialog, FlintDialogTitle, FlintDialogContent, FlintDialogActions } from '../dialog/flint-dialog.component.js';
import { FlintPopup } from '../popup/flint-popup.component.js';
import { LocalizeController } from '../utilities/localize.js';
import { FlintSingleInputDateRangeField } from './flint-single-input-date-range-field.component.js';
import { FlintDateRangeCalendar } from './flint-date-range-calendar.component.js';
import {
    isoToDisplay,
    defaultShortcuts,
    type DateRange, EMPTY_RANGE,
    type Shortcut,
} from './date-range-helpers.js';
import uiDateRangePickerStyles from './flint-date-range-picker.css?inline';

/**
 * A date range picker combining a segmented field and a dual-month calendar.
 *
 * Variants:
 * - `desktop`  — calendar in a popover (default)
 * - `mobile`   — calendar in a modal dialog with Cancel/OK
 * - `static`   — always-visible calendar, no field
 * - `auto`     — desktop on pointer:fine, mobile on pointer:coarse
 *
 * @fires flint-date-range-picker-change - { detail: { value: DateRange } } when range is committed
 * @csspart base - The component's base wrapper element.
 * @csspart popover - The popover element.
 * @csspart shortcuts - The shortcuts element.
 */
export class FlintDateRangePicker extends FlintElement {
    static styles = unsafeCSS(uiDateRangePickerStyles);
    private _localize = new LocalizeController(this);
    static dependencies = {
        'flint-dialog': FlintDialog as unknown as typeof FlintElement,
        'flint-dialog-title': FlintDialogTitle as unknown as typeof FlintElement,
        'flint-dialog-content': FlintDialogContent as unknown as typeof FlintElement,
        'flint-dialog-actions': FlintDialogActions as unknown as typeof FlintElement,
        'flint-single-input-date-range-field': FlintSingleInputDateRangeField as unknown as typeof FlintElement,
        'flint-date-range-calendar': FlintDateRangeCalendar as unknown as typeof FlintElement,
        'flint-popup': FlintPopup as unknown as typeof FlintElement,
    };

    // ── Props ─────────────────────────────────────────────────────────────────

    /** Selected range [startISO, endISO]. Empty strings mean unset. */
    @property({ type: Array }) value: DateRange = [...EMPTY_RANGE];

    /** Label shown above the field. */
    @property({ type: String }) label = 'Date Range';

    /** Variant: 'desktop' | 'mobile' | 'static' | 'auto'. */
    @property({ type: String }) variant: 'desktop' | 'mobile' | 'static' | 'auto' = 'desktop';

    /** Use a multi-input field (two separate fields) instead of single-input. Currently shows two simple text displays. */
    @property({ type: Boolean, attribute: 'multi-input' }) multiInput = false;

    /** Show shortcuts panel. */
    @property({ type: Boolean }) shortcuts = false;

    /** Custom shortcuts list. Defaults to built-in shortcuts when shortcuts=true. */
    @property({ type: Array }) shortcutItems: Shortcut[] = [];

    /** Minimum selectable date (ISO YYYY-MM-DD). */
    @property({ type: String }) min = '';
    /** Maximum selectable date (ISO YYYY-MM-DD). */
    @property({ type: String }) max = '';
    /** Form field name for hidden inputs. */
    @property({ type: String }) name = '';
    /** BCP 47 locale for date formatting and month/day names (e.g. "en-US", "fr"). Uses browser default when unset. */
    @property({ type: String }) locale = '';

    /** Disables the picker and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Makes the picker read-only (visible but not editable). */
    @property({ type: Boolean, reflect: true }) readonly = false;
    /** Displays the picker in an error state. */
    @property({ type: Boolean, reflect: true }) error = false;
    /** Helper text shown below the field. */
    @property({ type: String, attribute: 'helper-text' }) helperText = '';
    /** Error message displayed below the field when in error state. */
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';

    // ── State ─────────────────────────────────────────────────────────────────

    @state() private _open = false;
    @state() private _pendingValue: DateRange = [...EMPTY_RANGE];
    @state() private _activeShortcut = '';

    // ── Computed ──────────────────────────────────────────────────────────────

    private get _resolvedVariant(): 'desktop' | 'mobile' | 'static' {
        if (this.variant === 'auto') {
            return window.matchMedia('(pointer: coarse)').matches ? 'mobile' : 'desktop';
        }
        return this.variant as 'desktop' | 'mobile' | 'static';
    }

    private get _effectiveShortcuts(): Shortcut[] {
        return this.shortcutItems.length ? this.shortcutItems : defaultShortcuts();
    }

    // ── Open / close ──────────────────────────────────────────────────────────

    private _openPicker = () => {
        if (this.disabled || this.readonly || this._open) return;
        this._pendingValue = [...this.value];
        this._open = true;
    };

    private _closePicker = () => {
        this._open = false;
    };

    // ── Event handlers ────────────────────────────────────────────────────────

    private _handleCalendarSelect = (e: CustomEvent) => {
        const range = e.detail.value as DateRange;
        this._pendingValue = range;
        this._activeShortcut = '';

        const v = this._resolvedVariant;
        // Auto-commit on desktop once full range is selected
        if (v === 'desktop' && range[0] && range[1]) {
            this._commit(range);
        }
    };

    private _handleFieldRangeChange = (e: CustomEvent) => {
        const range = e.detail.value as DateRange;
        this._commit(range);
    };

    private _handleShortcut = async (shortcut: Shortcut) => {
        const range = shortcut.getValue();
        this._pendingValue = range;
        this._activeShortcut = shortcut.label;

        const v = this._resolvedVariant;
        // Desktop and static commit immediately; mobile waits for OK
        if (v === 'desktop' || v === 'static') {
            this._commit(range);
        }

        // Navigate the calendar to show the start month of the shortcut range
        if (range[0]) {
            await this.updateComplete;
            const cal = this.shadowRoot?.querySelector('flint-date-range-calendar') as { navigateTo?: (iso: string) => void } | null;
            cal?.navigateTo?.(range[0]);
        }
    };

    private _handleStaticSelect = (e: CustomEvent) => {
        const range = e.detail.value as DateRange;
        this._commit(range);
    };

    private _commit = (range: DateRange) => {
        const [ps, pe] = this.value;
        const [ns, ne] = range;
        if (ns === ps && ne === pe) { this._closePicker(); return; }
        this.value = range;
        this.emit('flint-date-range-picker-change', { value: range });
        if (range[0] && range[1]) this._closePicker();
    };

    private _handleMobileOk = () => {
        this._commit(this._pendingValue[0] && this._pendingValue[1]
            ? this._pendingValue
            : this.value);
    };

    private _handleMobileCancel = () => {
        this._pendingValue = [...this.value];
        this._activeShortcut = '';
        this._closePicker();
    };

    // ── Render helpers ────────────────────────────────────────────────────────

    private _formatRange(range: DateRange): string {
        const [s, e] = range;
        if (!s && !e) return '';
        const loc = this.locale || undefined;
        const start = isoToDisplay(s, loc) || '?';
        const end = isoToDisplay(e, loc) || '?';
        return `${start} – ${end}`;
    }

    private _renderShortcuts() {
        if (!this.shortcuts) return nothing;
        return html`
      <div class="shortcuts-panel" part="shortcuts">
        ${this._effectiveShortcuts.map(sc => html`
          <button
            class="shortcut-btn ${this._activeShortcut === sc.label ? 'active' : ''}"
            @click=${() => this._handleShortcut(sc)}
          >${sc.label}</button>
        `)}
      </div>
    `;
    }

    private _renderCalendar(value: DateRange, onSelect: (e: CustomEvent) => void) {
        return html`
      <flint-date-range-calendar
        .value=${value}
        .min=${this.min}
        .max=${this.max}
        .locale=${this.locale}
        ?disabled=${this.disabled}
        @flint-date-range-picker-select=${onSelect}
      ></flint-date-range-calendar>
    `;
    }

    private _renderField() {
        return html`
      ${this.label ? html`<label class="field-label">${this.label}</label>` : nothing}
      <flint-single-input-date-range-field
        .value=${this.value}
        .min=${this.min}
        .max=${this.max}
        .name=${this.name}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?error=${this.error}
        @flint-date-range-picker-change=${this._handleFieldRangeChange}
        @focus=${this._openPicker}
      ></flint-single-input-date-range-field>
      ${this.error && this.errorMessage
          ? html`<p class="helper-text error-text" role="alert">${this.errorMessage}</p>`
          : this.helperText
              ? html`<p class="helper-text">${this.helperText}</p>`
              : nothing}
    `;
    }

    private _renderMobileField() {
        const formatted = this._formatRange(this.value);
        return html`
      ${this.label ? html`<label class="field-label">${this.label}</label>` : nothing}
      <div class="mobile-field"
        role="button"
        tabindex=${this.disabled ? -1 : 0}
        aria-label=${this._localize.term('selectDateRange')}
        aria-haspopup="dialog"
        aria-expanded=${this._open ? 'true' : 'false'}
        @click=${this._openPicker}
        @keydown=${(e: KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && this._openPicker()}
      >
        ${formatted
                ? html`<span>${formatted}</span>`
                : html`<span class="mobile-field-placeholder">Start date – End date</span>`}
        <span class="mobile-field-icon">📅</span>
      </div>
      ${this.error && this.errorMessage
          ? html`<p class="helper-text error-text" role="alert">${this.errorMessage}</p>`
          : this.helperText
              ? html`<p class="helper-text">${this.helperText}</p>`
              : nothing}
    `;
    }

    // ── Variant renders ───────────────────────────────────────────────────────

    private _renderDesktop() {
        const pending = this._pendingValue[0] || this._pendingValue[1]
            ? this._pendingValue
            : this.value;

        return html`
      <div>
        <flint-popup
          .active=${this._open}
          placement="bottom-start"
          strategy="fixed"
          .distance=${4}
          flip
          shift
        >
          <div slot="anchor" class="popover-anchor">
            ${this._renderField()}
          </div>
          <div class="click-away ${this._open ? 'open' : ''}" @click=${this._closePicker}></div>
          <div class="popover" role="dialog" aria-label=${this._localize.term('dateRangePicker')} part="popover">
            ${this._renderShortcuts()}
            <div class="popover-body">
              ${this._renderCalendar(pending, (e: CustomEvent) => this._handleCalendarSelect(e))}
            </div>
          </div>
        </flint-popup>
      </div>
    `;
    }

    private _renderMobile() {
        const pending = this._pendingValue[0] || this._pendingValue[1]
            ? this._pendingValue
            : this.value;

        return html`
      <div>
        ${this._renderMobileField()}
        <flint-dialog
          .open=${this._open}
          disable-backdrop-close
          @flint-dialog-close=${this._closePicker}
          style="--flint-dialog-width:640px"
        >
          <flint-dialog-title>${this._localize.term('selectDateRange')}</flint-dialog-title>
          <flint-dialog-content style="padding:0 12px 4px;display:flex;">
            ${this._renderShortcuts()}
            ${this._renderCalendar(pending, (e: CustomEvent) => this._handleCalendarSelect(e))}
          </flint-dialog-content>
          <flint-dialog-actions>
            <button class="action-btn cancel" @click=${this._handleMobileCancel}>${this._localize.term('cancel')}</button>
            <button class="action-btn ok"
              ?disabled=${!this._pendingValue[0] || !this._pendingValue[1]}
              @click=${this._handleMobileOk}>${this._localize.term('ok')}</button>
          </flint-dialog-actions>
        </flint-dialog>
      </div>
    `;
    }

    private _renderStatic() {
        return html`
      <div class="static-wrapper" part="base">
        ${this.shortcuts ? html`
          <div style="display:flex;">
            ${this._renderShortcuts()}
            ${this._renderCalendar(this.value, (e: CustomEvent) => this._handleStaticSelect(e))}
          </div>
        ` : this._renderCalendar(this.value, (e: CustomEvent) => this._handleStaticSelect(e))}
      </div>
    `;
    }

    render() {
        const v = this._resolvedVariant;
        if (v === 'static') return this._renderStatic();
        if (v === 'mobile') return this._renderMobile();
        return this._renderDesktop();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-date-range-picker': FlintDateRangePicker;
    }
}
