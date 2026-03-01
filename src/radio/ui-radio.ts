import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-radio-group')
export class UiRadioGroup extends LitElement {
    static styles = css`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }

    .group-container {
      display: flex;
      flex-direction: var(--ui-radio-group-direction, column);
      gap: var(--ui-radio-group-gap, 8px);
    }
  `;

    @property({ type: String }) name = '';
    @property({ type: String }) value = '';

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('radio-changed', this._handleRadioChange as EventListener);
    }

    private _handleRadioChange(e: CustomEvent) {
        const { value } = e.detail;
        this.value = value;

        // Update all children
        const radios = this.querySelectorAll('ui-radio');
        radios.forEach(radio => {
            const r = radio as UiRadio;
            r.checked = r.value === value;
        });

        this.dispatchEvent(new CustomEvent('change', {
            detail: { value },
            bubbles: true,
            composed: true
        }));
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('value')) {
            const radios = this.querySelectorAll('ui-radio');
            radios.forEach(radio => {
                const r = radio as UiRadio;
                r.checked = r.value === this.value;
            });
        }
        if (changedProperties.has('name')) {
            const radios = this.querySelectorAll('ui-radio');
            radios.forEach(radio => {
                const r = radio as UiRadio;
                r.name = this.name;
            });
        }
    }


    render() {
        return html`
      <div class="group-container" role="radiogroup">
        <slot></slot>
      </div>
    `;
    }
}

@customElement('ui-radio')
export class UiRadio extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            cursor: pointer;
        }

        .wrapper {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
        }

        .wrapper.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .radio-circle {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            border: 2px solid var(--ui-input-border-color, #d1d5db);
            border-radius: 50%;
            background-color: var(--ui-surface-background, white);
            transition: all 0.2s ease;
            margin-right: 8px;
        }

        .wrapper:hover:not(.disabled) .radio-circle {
            border-color: var(--ui-primary-color, #3b82f6);
        }

        .radio-circle.checked {
            border-color: var(--ui-primary-color, #3b82f6);
        }

        .radio-circle::after {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--ui-primary-color, #3b82f6);
            opacity: 0;
            transform: scale(0.5);
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .checked::after {
            opacity: 1;
            transform: scale(1);
        }

        input {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
            margin: 0;
        }

        input:focus-visible + .radio-circle {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 2px;
        }

        .label {
            font-size: 14px;
            line-height: 1.5;
            user-select: none;
        }
    `;

    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) name = '';
    @property({ type: String }) value = '';
    @property({ type: String }) label = '';

    private _handleChange() {
        if (this.disabled || this.checked) return;

        this.dispatchEvent(new CustomEvent('radio-changed', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <label class=${classMap({ wrapper: true, disabled: this.disabled })}>
                <input 
                    type="radio" 
                    .name=${this.name}
                    .value=${this.value}
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    @change=${this._handleChange}
                >
                <div class=${classMap({ 'radio-circle': true, checked: this.checked })}></div>
                <span class="label">
                    ${this.label || html`<slot></slot>`}
                </span>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-radio-group': UiRadioGroup;
        'ui-radio': UiRadio;
    }
}
