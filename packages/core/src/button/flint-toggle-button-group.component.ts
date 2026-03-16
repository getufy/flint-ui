import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import { FlintToggleButton } from './flint-toggle-button.component.js';
import uiToggleButtonGroupStyles from './flint-toggle-button-group.css?inline';

/**
 * Toggle Button Group: manages exclusive or multi-select toggle buttons.
 *
 * @fires flint-toggle-button-group-change - Fired when the group's selected value(s) change. detail: `{ value: string | string[] }`
 */
export class FlintToggleButtonGroup extends FlintElement {
    static styles = unsafeCSS(uiToggleButtonGroupStyles);

    static dependencies = {
        'flint-toggle-button': FlintToggleButton as unknown as typeof FlintElement
    };

    /** Currently selected value(s). A string when exclusive, an array otherwise. */
    @property({ type: String }) value: string | string[] = '';
    /**
     * Initial selected value(s) for uncontrolled usage.
     * Has no effect after the element has connected to the DOM.
     */
    @property({ attribute: 'default-value' }) defaultValue: string | string[] = '';
    /** Whether only one button can be selected at a time. */
    @property({ type: Boolean }) exclusive = true;

    private _firstUpdate = true;

    override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue !== '') {
                this.value = this.defaultValue;
            }
        }
        void changed;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('flint-toggle-button-change', this._handleToggleClick as EventListener);
        this._updateChildren();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('flint-toggle-button-change', this._handleToggleClick as EventListener);
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

        this.dispatchEvent(new CustomEvent('flint-toggle-button-group-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    private _updateChildren() {
        const children = Array.from(this.querySelectorAll('flint-toggle-button'));
        children.forEach((child, index) => {
            const button = child as FlintToggleButton;
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
        'flint-toggle-button-group': FlintToggleButtonGroup;
    }
}
