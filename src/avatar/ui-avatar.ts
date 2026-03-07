import { LitElement, unsafeCSS, html, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiAvatarStyles from './ui-avatar.css?inline';

@customElement('ui-avatar')
export class UiAvatar extends LitElement {
    static styles = unsafeCSS(uiAvatarStyles);

    @property({ type: String }) src = '';
    @property({ type: String }) alt = '';
    @property({ type: String }) initials = '';
    @property({ type: String }) variant: 'circle' | 'square' | 'rounded' = 'circle';
    @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

    @state() private _hasError = false;
    @state() private _isLoading = false;

    protected willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('src')) {
            this._hasError = false;
            this._isLoading = !!this.src;
        }
    }

    private _handleError() {
        this._hasError = true;
        this._isLoading = false;
    }

    private _handleLoad() {
        this._isLoading = false;
    }

    render() {
        const classes = {
            avatar: true,
            square: this.variant === 'square',
            rounded: this.variant === 'rounded',
            loading: this._isLoading,
        };

        return html`
      <div class=${classMap(classes)} part="base">
        ${this.src && !this._hasError
                ? html`<img src=${this.src} alt=${this.alt} @error=${this._handleError} @load=${this._handleLoad} style=${this._isLoading ? 'display:none' : nothing} part="image" />`
                : this.initials
                    ? html`<span class="initials" part="initials">${this.initials.substring(0, 2)}</span>`
                    : html`<slot><svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></slot>`
            }
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-avatar': UiAvatar;
    }
}
