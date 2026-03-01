import { LitElement, html, css, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-avatar')
export class UiAvatar extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }

    .avatar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--ui-avatar-size, 40px);
      height: var(--ui-avatar-size, 40px);
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: calc(var(--ui-avatar-size, 40px) / 2.5);
      font-weight: 600;
      border-radius: 50%;
      overflow: hidden;
      user-select: none;
      background-color: var(--ui-avatar-bg, #e5e7eb);
      color: var(--ui-avatar-color, #4b5563);
      transition: all 0.2s ease;
    }

    .avatar.square {
      border-radius: 0;
    }

    .avatar.rounded {
      border-radius: var(--ui-border-radius-md, 6px);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .initials {
      text-transform: uppercase;
    }

    /* Size variants */
    :host([size="small"]) { --ui-avatar-size: 32px; }
    :host([size="medium"]) { --ui-avatar-size: 40px; }
    :host([size="large"]) { --ui-avatar-size: 56px; }
    :host([size="xlarge"]) { --ui-avatar-size: 80px; }

    /* Skeleton state */
    .avatar.loading {
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;

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
