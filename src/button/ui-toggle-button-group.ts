import { LitElement, unsafeCSS, html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UiToggleButton } from './ui-toggle-button.js';
import uiToggleButtonGroupStyles from './ui-toggle-button-group.css?inline';

@customElement('ui-toggle-button-group')
export class UiToggleButtonGroup extends LitElement {
    static styles = unsafeCSS(uiToggleButtonGroupStyles);

    @property({ type: String }) value: string | string[] = '';
    @property({ type: Boolean }) exclusive = true;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('toggle-click', this._handleToggleClick as EventListener);
        this._updateChildren();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('toggle-click', this._handleToggleClick as EventListener);
    }

    private _handleToggleClick(e: CustomEvent) {
        const { value, selected } = e.detail;

        if (this.exclusive) {
            this.value = selected ? value : '';
        } else {
            const values = Array.isArray(this.value) ? [...this.value] : (this.value ? [this.value] : []);
            if (selected) {
                if (!values.includes(value)) values.push(value);
            } else {
                const index = values.indexOf(value);
                if (index > -1) values.splice(index, 1);
            }
            this.value = values;
        }

        this._updateChildren();

        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    private _updateChildren() {
        const children = Array.from(this.querySelectorAll('ui-toggle-button'));
        children.forEach((child, index) => {
            const button = child as UiToggleButton;
            const isSelected = this.exclusive
                ? this.value === button.value
                : (Array.isArray(this.value) && this.value.includes(button.value));

            button.selected = isSelected;

            // Handle border radius via data attributes
            if (index === 0) {
                button.setAttribute('data-first', '');
            } else {
                button.removeAttribute('data-first');
            }

            if (index === children.length - 1) {
                button.setAttribute('data-last', '');
            } else {
                button.removeAttribute('data-last');
            }
        });
    }

    updated(changedProperties: PropertyValues) {
        if (changedProperties.has('value')) {
            this._updateChildren();
        }
    }

    render() {
        return html`<slot @slotchange=${this._updateChildren}></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-toggle-button-group': UiToggleButtonGroup;
    }
}
