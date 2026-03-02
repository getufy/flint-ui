import { css as p, LitElement as c, html as l, nothing as x } from "lit";
import { property as s, customElement as d, query as Xt, state as g, queryAssignedElements as ur } from "lit/decorators.js";
import { classMap as u } from "lit/directives/class-map.js";
import { repeat as ut } from "lit/directives/repeat.js";
import { ifDefined as ni } from "lit/directives/if-defined.js";
import { styleMap as st } from "lit/directives/style-map.js";
import { literal as C, html as lr, unsafeStatic as fr } from "lit/static-html.js";
var br = Object.defineProperty, vr = Object.getOwnPropertyDescriptor, Gt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? vr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && br(t, r, i), i;
};
let He = class extends c {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "medium", this.disabled = !1, this.fullWidth = !1;
  }
  render() {
    const e = {
      primary: this.variant === "primary",
      secondary: this.variant === "secondary",
      destructive: this.variant === "destructive",
      small: this.size === "small",
      medium: this.size === "medium",
      large: this.size === "large"
    };
    return l`
      <button
        type="button"
        class=${u(e)}
        ?disabled=${this.disabled}
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }
};
He.styles = p`
    :host {
      display: inline-block;
    }
    :host([full-width]) {
      display: block;
    }
    button {
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-weight: 600;
      border: none;
      border-radius: var(--ui-button-border-radius, var(--ui-border-radius-md, 6px));
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      transition: all 0.2s ease;
      box-shadow: var(--ui-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }
    .primary {
      background-color: var(--ui-primary-color, #3b82f6);
      color: var(--ui-text-color-on-primary, white);
    }
    .primary:hover {
      background-color: var(--ui-primary-color-hover, #2563eb);
    }
    .primary:active {
      background-color: var(--ui-primary-color-active, #1d4ed8);
    }
    .secondary {
      background-color: var(--ui-surface-background, white);
      color: var(--ui-text-color, #111827);
      border: 1px solid var(--ui-input-border-color, #d1d5db);
    }
    .secondary:hover {
      background-color: var(--ui-hover-color, #f3f4f6);
    }
    .secondary:active {
      background-color: var(--ui-active-color, #e5e7eb);
    }
    .destructive {
      background-color: var(--ui-destructive-color, #ef4444);
      color: var(--ui-text-color-on-primary, white);
    }
    .destructive:hover {
      background-color: var(--ui-destructive-color-hover, #dc2626);
    }
    .destructive:active {
      background-color: var(--ui-destructive-color-active, #b91c1c);
    }
    .small {
      padding: 6px 12px;
      font-size: 14px;
    }
    .medium {
      padding: 10px 16px;
      font-size: 14px;
    }
    .large {
      padding: 14px 20px;
      font-size: 16px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
Gt([
  s({ type: String })
], He.prototype, "variant", 2);
Gt([
  s({ type: String })
], He.prototype, "size", 2);
Gt([
  s({ type: Boolean })
], He.prototype, "disabled", 2);
Gt([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], He.prototype, "fullWidth", 2);
He = Gt([
  d("ui-button")
], He);
var gr = Object.getOwnPropertyDescriptor, mr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? gr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let Si = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Si.styles = p`
    :host {
      display: inline-flex;
      border-radius: var(--ui-border-radius-md, 6px);
    }
    
    ::slotted(ui-button) {
      position: relative;
    }

    ::slotted(ui-button:hover),
    ::slotted(ui-button:focus-within),
    ::slotted(ui-button:active) {
      z-index: 1;
    }

    ::slotted(ui-button:not(:first-child)) {
      margin-left: -1px;
    }

    /* Base state for grouped buttons - 0 border radius internally */
    ::slotted(ui-button) {
      --ui-button-border-radius: 0;
    }

    /* First child */
    ::slotted(ui-button:first-child) {
      --ui-button-border-radius: var(--ui-border-radius-md, 6px) 0 0 var(--ui-border-radius-md, 6px);
    }

    /* Last child */
    ::slotted(ui-button:last-child) {
      --ui-button-border-radius: 0 var(--ui-border-radius-md, 6px) var(--ui-border-radius-md, 6px) 0;
    }

    /* Only child - reset to full radius */
    ::slotted(ui-button:first-child:last-child) {
      --ui-button-border-radius: var(--ui-border-radius-md, 6px);
    }
  `;
Si = mr([
  d("ui-button-group")
], Si);
var yr = Object.defineProperty, xr = Object.getOwnPropertyDescriptor, tr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? xr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && yr(t, r, i), i;
};
let jt = class extends c {
  constructor() {
    super(...arguments), this.variant = "elevated", this.interactive = !1;
  }
  render() {
    const e = {
      card: !0,
      [`variant-${this.variant}`]: !0,
      interactive: this.interactive
    };
    return l`
      <div class=${u(e)} part="card">
        <slot></slot>
      </div>
    `;
  }
};
jt.styles = p`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }
    
    .card {
      background: var(--ui-card-background, white);
      border-radius: var(--ui-card-border-radius, 12px);
      box-shadow: var(--ui-card-shadow, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
      border: 1px solid var(--ui-card-border-color, #f3f4f6);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
      padding: var(--ui-card-padding, 0); /* Cards usually don't have padding at the root level if using content blocks */
    }

    /* Interactive Hover effect */
    .card.interactive:hover {
      box-shadow: var(--ui-card-shadow-hover, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
      cursor: pointer;
    }

    /* Variants */
    .card.variant-outlined {
      box-shadow: none;
      border: 1px solid var(--ui-card-border-color, #d1d5db);
    }
    
    .card.variant-flat {
      box-shadow: none;
      border: none;
      background: var(--ui-card-background-flat, #f3f4f6);
    }
  `;
tr([
  s({ type: String, reflect: !0 })
], jt.prototype, "variant", 2);
tr([
  s({ type: Boolean, reflect: !0 })
], jt.prototype, "interactive", 2);
jt = tr([
  d("ui-card")
], jt);
var _r = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, ir = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? wr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && _r(t, r, i), i;
};
let Mt = class extends c {
  constructor() {
    super(...arguments), this.title = "", this.subtitle = "";
  }
  render() {
    return l`
      <div class="header" part="header">
        <slot name="avatar"></slot>
        <div class="content" part="content">
          ${this.title ? l`<h3 class="title" part="title">${this.title}</h3>` : ""}
          ${this.subtitle ? l`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : ""}
          <slot></slot>
        </div>
        <slot name="action"></slot>
      </div>
    `;
  }
};
Mt.styles = p`
    :host {
      display: block;
      padding: var(--ui-card-header-padding, 16px 24px);
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .content {
      flex: 1 1 auto;
    }

    .title {
      margin: 0;
      font-size: var(--ui-card-title-size, 1.25rem);
      font-weight: 700;
      color: var(--ui-card-title-color, #111827);
      line-height: 1.4;
    }
    
    .subtitle {
      margin: 0;
      font-size: var(--ui-card-subtitle-size, 0.875rem);
      color: var(--ui-card-subtitle-color, #6b7280);
      font-weight: 500;
      margin-top: 4px;
    }
  `;
ir([
  s({ type: String })
], Mt.prototype, "title", 2);
ir([
  s({ type: String })
], Mt.prototype, "subtitle", 2);
Mt = ir([
  d("ui-card-header")
], Mt);
var kr = Object.getOwnPropertyDescriptor, $r = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? kr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let Pi = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Pi.styles = p`
    :host {
      display: block;
      padding: var(--ui-card-content-padding, 16px 24px);
      font-size: var(--ui-card-content-size, 1rem);
      color: var(--ui-card-content-color, #4b5563);
      line-height: 1.5;
    }
  `;
Pi = $r([
  d("ui-card-content")
], Pi);
var Cr = Object.defineProperty, Ir = Object.getOwnPropertyDescriptor, bi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ir(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Cr(t, r, i), i;
};
let ft = class extends c {
  constructor() {
    super(...arguments), this.image = "", this.alt = "", this.height = "";
  }
  render() {
    if (this.image) {
      const e = this.height ? isNaN(Number(this.height)) ? this.height : `${this.height}px` : "", t = e ? `height: ${e}` : "";
      return l`
                <div class="media" part="media" style=${t}>
                    <img src="${this.image}" alt="${this.alt}" part="img" loading="lazy" />
                </div>
            `;
    }
    return l`<slot></slot>`;
  }
};
ft.styles = p`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
    }
    
    .media {
      width: 100%;
      height: var(--ui-card-media-height, 200px);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `;
bi([
  s({ type: String })
], ft.prototype, "image", 2);
bi([
  s({ type: String })
], ft.prototype, "alt", 2);
bi([
  s({ type: String })
], ft.prototype, "height", 2);
ft = bi([
  d("ui-card-media")
], ft);
var Sr = Object.getOwnPropertyDescriptor, Pr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Sr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let Ei = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Ei.styles = p`
    :host {
      display: flex;
      padding: var(--ui-card-actions-padding, 8px 16px);
      align-items: center;
      gap: 8px;
    }
  `;
Ei = Pr([
  d("ui-card-actions")
], Ei);
var Er = Object.getOwnPropertyDescriptor, Or = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Er(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let Oi = class extends c {
  render() {
    return l`
      <div class="action-area" part="action-area" @keydown=${this._handleKeyDown} tabindex="0" role="button">
        <slot></slot>
      </div>
    `;
  }
  _handleKeyDown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.click());
  }
};
Oi.styles = p`
    :host {
      display: block;
      width: 100%;
      cursor: pointer;
      position: relative;
    }

    .action-area {
      transition: background-color 0.2s;
    }

    .action-area:hover {
      background-color: var(--ui-card-action-area-hover, rgba(0, 0, 0, 0.04));
    }

    .action-area:active {
      background-color: var(--ui-card-action-area-active, rgba(0, 0, 0, 0.08));
    }

    .action-area:focus-visible {
      outline: 2px solid var(--ui-card-action-area-focus-ring, #3b82f6);
      outline-offset: -2px;
    }
  `;
Oi = Or([
  d("ui-card-action-area")
], Oi);
var Dr = Object.defineProperty, zr = Object.getOwnPropertyDescriptor, vi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? zr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Dr(t, r, i), i;
};
let bt = class extends c {
  constructor() {
    super(...arguments), this.elevation = 1, this.square = !1, this.variant = "elevated";
  }
  render() {
    return l`
            <div class="paper" role="region">
                <slot></slot>
            </div>
        `;
  }
};
bt.styles = p`
        :host {
            display: block;
            box-sizing: border-box;
            background-color: var(--ui-surface-background, #ffffff);
            color: var(--ui-text-color, #111827);
            border-radius: var(--ui-border-radius-md, 8px);
            transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
        }

        :host([square]) {
            border-radius: 0;
        }

        :host([variant="outlined"]) {
            border: 1px solid var(--ui-border-color, rgba(0, 0, 0, 0.1));
            box-shadow: none !important;
        }

        .paper {
            padding: var(--ui-paper-padding, 0);
            border-radius: inherit;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }

        /* Elevation Styles - Moved to Host for better visibility and reliability */
        :host([variant="elevated"][elevation="0"]) { box-shadow: none; }
        :host([variant="elevated"][elevation="1"]) { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); }
        :host([variant="elevated"][elevation="2"]) { box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07); }
        :host([variant="elevated"][elevation="3"]) { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
        :host([variant="elevated"][elevation="4"]) { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.09); }
        :host([variant="elevated"][elevation="6"]) { box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); }
        :host([variant="elevated"][elevation="8"]) { box-shadow: 0 16px 32px rgba(0, 0, 0, 0.11); }
        :host([variant="elevated"][elevation="12"]) { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); }
        :host([variant="elevated"][elevation="16"]) { box-shadow: 0 24px 48px rgba(0, 0, 0, 0.13); }
        :host([variant="elevated"][elevation="24"]) { box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15); }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
            :host {
                background-color: var(--ui-surface-background-flat, #1e1e1e);
            }
            :host([variant="elevated"]) {
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            }
        }
    `;
vi([
  s({ type: Number, reflect: !0 })
], bt.prototype, "elevation", 2);
vi([
  s({ type: Boolean, reflect: !0 })
], bt.prototype, "square", 2);
vi([
  s({ type: String, reflect: !0 })
], bt.prototype, "variant", 2);
bt = vi([
  d("ui-paper")
], bt);
var Br = Object.defineProperty, Ar = Object.getOwnPropertyDescriptor, ge = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ar(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Br(t, r, i), i;
};
let Q = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.type = "text", this.placeholder = "", this.helpText = "", this.error = !1, this.errorMessage = "", this.disabled = !1;
  }
  render() {
    const e = this.error || !!this.errorMessage;
    return l`
      <div class="input-wrapper ${u({ error: e })}" part="wrapper">
        ${this.label ? l`<label part="label">${this.label}</label>` : ""}
        
        <input
          part="input"
          .type=${this.type}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        
        ${e && this.errorMessage ? l`<p class="help-text error-text" part="error-text">${this.errorMessage}</p>` : this.helpText ? l`<p class="help-text" part="help-text">${this.helpText}</p>` : ""}
      </div>
    `;
  }
  _handleInput(e) {
    this.value = e.target.value, this.dispatchEvent(
      new CustomEvent("ui-input-input", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleChange(e) {
    this.value = e.target.value, this.dispatchEvent(
      new CustomEvent("ui-input-change", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
Q.styles = p`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      margin-bottom: 16px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 14px;
      font-weight: 500;
      color: #374151; /* gray-700 */
    }

    input {
      font-family: inherit;
      padding: 10px 14px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid #d1d5db; /* gray-300 */
      background-color: #ffffff;
      color: #111827; /* gray-900 */
      transition: border-color 0.2s, box-shadow 0.2s, outline 0.2s;
      outline: none;
    }

    input::placeholder {
      color: #9ca3af; /* gray-400 */
    }

    input:hover:not(:disabled):not(.error) {
      border-color: #9ca3af;
    }

    input:focus {
      border-color: #3b82f6; /* blue-500 */
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    .error input {
      border-color: #ef4444; /* red-500 */
    }

    .error input:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
    
    input:disabled {
      background-color: #f3f4f6; /* gray-100 */
      color: #9ca3af;
      cursor: not-allowed;
    }

    .help-text {
      font-size: 12px;
      color: #6b7280; /* gray-500 */
      margin: 0;
    }

    .error-text {
      color: #ef4444;
    }
  `;
ge([
  s({ type: String })
], Q.prototype, "label", 2);
ge([
  s({ type: String })
], Q.prototype, "value", 2);
ge([
  s({ type: String })
], Q.prototype, "type", 2);
ge([
  s({ type: String })
], Q.prototype, "placeholder", 2);
ge([
  s({ type: String })
], Q.prototype, "helpText", 2);
ge([
  s({ type: Boolean })
], Q.prototype, "error", 2);
ge([
  s({ type: String })
], Q.prototype, "errorMessage", 2);
ge([
  s({ type: Boolean })
], Q.prototype, "disabled", 2);
ge([
  Xt("input")
], Q.prototype, "inputElement", 2);
Q = ge([
  d("ui-input")
], Q);
var Tr = Object.defineProperty, jr = Object.getOwnPropertyDescriptor, Re = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? jr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Tr(t, r, i), i;
};
let le = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.options = [], this.value = [], this.multiple = !1, this.placeholder = "Select an option", this.disabled = !1, this.isOpen = !1, this._handleOutsideClick = (e) => {
      this.isOpen && !this.contains(e.target) && (this.isOpen = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._handleOutsideClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._handleOutsideClick);
  }
  _toggleDropdown() {
    this.disabled || (this.isOpen = !this.isOpen);
  }
  _handleOptionClick(e, t) {
    if (t.stopPropagation(), this.multiple) {
      const r = [...this.value], o = r.indexOf(e.value);
      o > -1 ? r.splice(o, 1) : r.push(e.value), this.value = r;
    } else
      this.value = [e.value], this.isOpen = !1;
    this._dispatchChange();
  }
  _removeValue(e, t) {
    t.stopPropagation(), this.value = this.value.filter((r) => r !== e), this._dispatchChange();
  }
  _dispatchChange() {
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.multiple ? this.value : this.value[0] },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.options.filter((t) => this.value.includes(t.value));
    return l`
      <div class="wrapper">
        ${this.label ? l`<label>${this.label}</label>` : ""}
        
        <div 
          class="select-trigger ${u({
      focused: this.isOpen,
      disabled: this.disabled,
      has_value: e.length > 0
    })}"
          @click=${this._toggleDropdown}
          role="combobox"
          aria-expanded="${this.isOpen}"
          aria-haspopup="listbox"
        >
          <slot name="icon"></slot>
          
          <div class="value-container">
            ${e.length === 0 ? l`
              <span class="placeholder">${this.placeholder}</span>
            ` : ""}
            
            ${this.multiple ? ut(e, (t) => t.value, (t) => l`
                <span class="chip">
                  ${t.label}
                  <span class="chip-remove" @click=${(r) => this._removeValue(t.value, r)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </span>
                </span>
              `) : e[0] ? l`
                <span class="single-value">${e[0].label}</span>
              ` : ""}
          </div>

          <div class="arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div class="dropdown ${u({ open: this.isOpen })}" role="listbox">
          ${this.options.length === 0 ? l`
            <div class="option" style="cursor: default; opacity: 0.5;">No options available</div>
          ` : ut(this.options, (t) => t.value, (t) => {
      const r = this.value.includes(t.value);
      return l`
              <div 
                class="option ${u({ selected: r })}"
                @click=${(o) => this._handleOptionClick(t, o)}
                role="option"
                aria-selected="${r}"
              >
                <span>${t.label}</span>
                <div class="check-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
};
le.styles = p`
    :host {
      display: block;
      --ui-select-height: 48px;
      --ui-select-bg: var(--ui-surface-background, #ffffff);
      --ui-select-border: var(--ui-input-border-color, #d1d5db);
      --ui-select-radius: var(--ui-input-border-radius, 8px);
      --ui-select-focus-color: var(--ui-primary-color, #3b82f6);
      
      font-family: var(--ui-font-family, sans-serif);
      margin-bottom: 16px;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
      margin-left: 2px;
    }

    .select-trigger {
      display: flex;
      align-items: center;
      min-height: var(--ui-select-height);
      padding: 0 16px;
      background-color: var(--ui-select-bg);
      border: 1.5px solid var(--ui-select-border);
      border-radius: var(--ui-select-radius);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      gap: 12px;
      user-select: none;
    }

    .select-trigger:hover:not(.disabled) {
      border-color: var(--ui-secondary-color, #6b7280);
    }

    .select-trigger.focused {
      border-color: var(--ui-select-focus-color);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    }

    .select-trigger.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    .value-container {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 0;
      min-height: 24px;
      align-items: center;
      overflow: hidden;
    }

    .placeholder {
      color: var(--ui-text-color-muted, #6b7280);
      font-size: 0.9375rem;
    }

    .single-value {
      color: var(--ui-text-color, #111827);
      font-size: 0.9375rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chip {
      background-color: var(--ui-primary-color, #3b82f6);
      color: var(--ui-text-color-on-primary, #ffffff);
      padding: 4px 10px;
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      animation: chip-in 0.2s ease-out;
    }

    @keyframes chip-in {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .chip-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .chip-remove:hover {
      opacity: 1;
    }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .select-trigger.focused .arrow {
      transform: rotate(180deg);
      color: var(--ui-select-focus-color);
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      background-color: var(--ui-select-bg);
      border-radius: var(--ui-select-radius);
      box-shadow: var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      border: 1px solid var(--ui-border-color, #e5e7eb);
      z-index: 1000;
      max-height: 260px;
      overflow-y: auto;
      opacity: 0;
      transform: translateY(-10px);
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dropdown.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .option {
      padding: 12px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--ui-text-color, #111827);
      transition: background-color 0.2s;
      font-size: 0.9375rem;
    }

    .option:hover {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }

    .option.selected {
      background-color: rgba(59, 130, 246, 0.08);
      color: var(--ui-primary-color, #3b82f6);
      font-weight: 600;
    }

    .check-icon {
      color: var(--ui-primary-color, #3b82f6);
      opacity: 0;
      transition: opacity 0.2s;
    }

    .option.selected .check-icon {
      opacity: 1;
    }

    /* Scrollbar Styling */
    .dropdown::-webkit-scrollbar {
      width: 6px;
    }
    .dropdown::-webkit-scrollbar-track {
      background: transparent;
    }
    .dropdown::-webkit-scrollbar-thumb {
      background: var(--ui-border-color, #e5e7eb);
      border-radius: 3px;
    }
  `;
Re([
  s({ type: String })
], le.prototype, "label", 2);
Re([
  s({ type: Array })
], le.prototype, "options", 2);
Re([
  s({ type: Array })
], le.prototype, "value", 2);
Re([
  s({ type: Boolean })
], le.prototype, "multiple", 2);
Re([
  s({ type: String })
], le.prototype, "placeholder", 2);
Re([
  s({ type: Boolean, reflect: !0 })
], le.prototype, "disabled", 2);
Re([
  g()
], le.prototype, "isOpen", 2);
le = Re([
  d("ui-select")
], le);
var Mr = Object.defineProperty, Lr = Object.getOwnPropertyDescriptor, Jt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Lr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Mr(t, r, i), i;
};
let Ke = class extends c {
  constructor() {
    super(...arguments), this.extended = !1, this.disabled = !1, this.label = "Action", this.position = "bottom-right";
  }
  updated(e) {
    e.has("position") && this._applyPositionToHost();
  }
  _applyPositionToHost() {
    if (this.style.top = "", this.style.bottom = "", this.style.left = "", this.style.right = "", this.style.position = "", this.position === "static") {
      this.style.position = "static";
      return;
    }
    const e = {
      "bottom-right": ["", "24px", "24px", ""],
      "bottom-left": ["", "24px", "", "24px"],
      "top-right": ["24px", "", "24px", ""],
      "top-left": ["24px", "", "", "24px"]
    }, [t, r, o, i] = e[this.position] ?? e["bottom-right"];
    this.style.position = "fixed", this.style.top = t, this.style.bottom = r, this.style.right = o, this.style.left = i;
  }
  render() {
    const e = {
      fab: !0,
      extended: this.extended
    };
    return l`
      <button
        class="${u(e)}"
        ?disabled="${this.disabled}"
        aria-label="${ni(this.extended ? void 0 : this.label)}"
      >
        <span class="icon-slot">
          <slot name="icon"></slot>
          <slot></slot>
        </span>
        ${this.extended ? l`<span class="label-slot"><slot name="label"></slot></span>` : ""}
      </button>
    `;
  }
};
Ke.styles = p`
    :host {
      --ui-fab-size: 56px;
      --ui-fab-background: var(--ui-primary-color, #3b82f6);
      --ui-fab-color: var(--ui-text-color-on-primary, white);
      --ui-fab-shadow: var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      --ui-fab-radius: 50%;

      display: inline-block;
      position: fixed;
      z-index: 100;
    }

    .fab {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ui-fab-size);
      height: var(--ui-fab-size);
      border-radius: var(--ui-fab-radius);
      background-color: var(--ui-fab-background);
      color: var(--ui-fab-color);
      box-shadow: var(--ui-fab-shadow);
      border: none;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0;
      overflow: hidden;
      outline: none;
    }

    .fab:hover:not(:disabled) {
      box-shadow: var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      filter: brightness(1.1);
      transform: translateY(-2px);
    }

    .fab:active:not(:disabled) {
      transform: translateY(0);
      filter: brightness(0.9);
    }

    .fab:focus-visible {
      outline: 3px solid var(--ui-fab-background);
      outline-offset: 3px;
    }

    .fab:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .fab.extended {
      width: auto;
      min-width: 80px;
      padding: 0 20px;
      border-radius: 28px;
      height: 56px;
    }

    .fab.extended .icon-slot {
      margin-right: 12px;
    }

    .icon-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .label-slot {
      font-family: var(--ui-font-family, sans-serif);
      font-weight: 500;
      font-size: 0.875rem;
      letter-spacing: 0.1px;
      text-transform: uppercase;
    }
  `;
Jt([
  s({ type: Boolean, reflect: !0 })
], Ke.prototype, "extended", 2);
Jt([
  s({ type: Boolean, reflect: !0 })
], Ke.prototype, "disabled", 2);
Jt([
  s({ type: String })
], Ke.prototype, "label", 2);
Jt([
  s({ type: String })
], Ke.prototype, "position", 2);
Ke = Jt([
  d("ui-fab")
], Ke);
var Ur = Object.defineProperty, Rr = Object.getOwnPropertyDescriptor, me = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Rr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ur(t, r, i), i;
};
let Z = class extends c {
  constructor() {
    super(...arguments), this.options = [], this.freeSolo = !1, this.disabled = !1, this.value = "", this.placeholder = "", this._isOpen = !1, this._inputValue = "", this._filteredOptions = [], this._activeIndex = -1, this._handleOutsideClick = (e) => {
      if (!this.contains(e.target) && (this._isOpen = !1, this._activeIndex = -1, !this.freeSolo)) {
        const t = this.options.find((r) => r.value === this.value);
        this._inputValue = t ? t.label : "";
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._inputValue = this.value, document.addEventListener("click", this._handleOutsideClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._handleOutsideClick);
  }
  willUpdate(e) {
    if (e.has("options") && (this._filterOptions(), this._activeIndex = -1), e.has("value") && !e.has("_inputValue")) {
      const t = this.options.find((r) => r.value === this.value);
      t ? this._inputValue = t.label : this.freeSolo ? this._inputValue = this.value : this._inputValue = "";
    }
  }
  _handleInput(e) {
    const t = e.target;
    this._inputValue = t.value, this._activeIndex = -1, this.freeSolo && (this.value = this._inputValue, this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value, label: this.value } }))), this._filterOptions(), this._isOpen = !0;
  }
  _filterOptions() {
    const e = this._inputValue.toLowerCase();
    this._filteredOptions = this.options.filter(
      (t) => t.label.toLowerCase().includes(e)
    );
  }
  _handleFocus() {
    this.disabled || (this._filterOptions(), this._isOpen = !0, this._activeIndex = -1);
  }
  _handleKeyDown(e) {
    const t = this._filteredOptions.length;
    if (!this._isOpen) {
      (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), this._filterOptions(), this._isOpen = !0, this._activeIndex = e.key === "ArrowDown" ? 0 : t - 1);
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(), this._activeIndex = Math.min(this._activeIndex + 1, t - 1), this._scrollActiveIntoView();
        break;
      case "ArrowUp":
        e.preventDefault(), this._activeIndex = Math.max(this._activeIndex - 1, -1), this._scrollActiveIntoView();
        break;
      case "Enter":
        this._activeIndex >= 0 && this._filteredOptions[this._activeIndex] && (e.preventDefault(), this._selectOption(this._filteredOptions[this._activeIndex]));
        break;
      case "Escape":
        if (e.preventDefault(), this._isOpen = !1, this._activeIndex = -1, !this.freeSolo) {
          const r = this.options.find((o) => o.value === this.value);
          this._inputValue = r ? r.label : "";
        }
        break;
      case "Tab":
        this._isOpen = !1, this._activeIndex = -1;
        break;
    }
  }
  _scrollActiveIntoView() {
    this.updateComplete.then(() => {
      if (this._activeIndex < 0) return;
      const t = this.shadowRoot?.querySelectorAll(".option")?.[this._activeIndex];
      t && typeof t.scrollIntoView == "function" && t.scrollIntoView({ block: "nearest" });
    });
  }
  _selectOption(e) {
    this.value = e.value, this._inputValue = e.label, this._isOpen = !1, this._activeIndex = -1, this.dispatchEvent(new CustomEvent("change", { detail: { value: e.value, label: e.label } }));
  }
  render() {
    const e = this._isOpen && (this._filteredOptions.length > 0 || !this.freeSolo);
    return l`
      <div class="input-wrapper">
        <input
          type="text"
          role="combobox"
          aria-expanded=${e ? "true" : "false"}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-activedescendant=${this._activeIndex >= 0 ? `option-${this._activeIndex}` : ""}
          .value=${this._inputValue}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @keydown=${this._handleKeyDown}
        />
        <div
          role="listbox"
          class=${u({ dropdown: !0, open: e })}
        >
          ${this._filteredOptions.length > 0 ? this._filteredOptions.map(
      (t, r) => l`
                  <div
                    id="option-${r}"
                    role="option"
                    aria-selected=${r === this._activeIndex ? "true" : "false"}
                    class=${u({ option: !0, active: r === this._activeIndex })}
                    @mousedown=${(o) => o.preventDefault()}
                    @click=${() => this._selectOption(t)}
                  >
                    ${t.label}
                  </div>
                `
    ) : l`<div class="no-options">No options</div>`}
        </div>
      </div>
    `;
  }
};
Z.styles = p`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--ui-font-family, system-ui, sans-serif);
      width: 100%;
    }

    .input-wrapper {
      position: relative;
    }

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-input-border-radius, 4px);
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: inherit;
      color: var(--ui-text-color, #111827);
      background: var(--ui-surface-background, #fff);
    }

    input:focus {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 1px var(--ui-primary-color, #3b82f6);
    }

    input:disabled {
      background-color: var(--ui-disabled-background, #f9fafb);
      color: var(--ui-disabled-text-color, #9ca3af);
      cursor: not-allowed;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      max-height: 250px;
      overflow-y: auto;
      background: var(--ui-surface-background, #fff);
      border: 1px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-input-border-radius, 4px);
      margin-top: 4px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      z-index: 10;
      display: none;
    }

    .dropdown.open {
      display: block;
    }

    .option {
      padding: 10px 12px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.15s;
      color: var(--ui-text-color, #111827);
    }

    .option:hover,
    .option.active {
      background-color: var(--ui-hover-color, #f3f4f6);
    }

    .no-options {
      padding: 10px 12px;
      font-size: 14px;
      color: #6b7280;
    }
  `;
me([
  s({ type: Array })
], Z.prototype, "options", 2);
me([
  s({ type: Boolean })
], Z.prototype, "freeSolo", 2);
me([
  s({ type: Boolean })
], Z.prototype, "disabled", 2);
me([
  s({ type: String })
], Z.prototype, "value", 2);
me([
  s({ type: String })
], Z.prototype, "placeholder", 2);
me([
  g()
], Z.prototype, "_isOpen", 2);
me([
  g()
], Z.prototype, "_inputValue", 2);
me([
  g()
], Z.prototype, "_filteredOptions", 2);
me([
  g()
], Z.prototype, "_activeIndex", 2);
Z = me([
  d("ui-autocomplete")
], Z);
var Nr = Object.defineProperty, Vr = Object.getOwnPropertyDescriptor, Ne = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Vr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Nr(t, r, i), i;
};
let ce = class extends c {
  constructor() {
    super(...arguments), this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.required = !1, this.label = "", this.name = "", this.value = "";
  }
  _handleChange(e) {
    if (this.disabled) return;
    const t = e.target;
    this.checked = t.checked, this.indeterminate = !1, this.dispatchEvent(new CustomEvent("change", {
      detail: { checked: this.checked, value: this.value, indeterminate: !1 },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return l`
      <label class=${u({ wrapper: !0, disabled: this.disabled })}>
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name || x}
          .value=${this.value}
          @change=${this._handleChange}
        >
        <div class=${u({ checkbox: !0, checked: this.checked, indeterminate: this.indeterminate })}>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            ${this.indeterminate ? l`<line x1="4" y1="12" x2="20" y2="12"></line>` : l`<polyline points="20 6 9 17 4 12"></polyline>`}
          </svg>
        </div>
        ${this.label ? l`<span class="label">${this.label}</span>` : l`<slot class="label"></slot>`}
      </label>
    `;
  }
};
ce.styles = p`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
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

    .checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: 2px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-border-radius-sm, 4px);
      background-color: var(--ui-surface-background, white);
      transition: all 0.2s ease;
      margin-right: 8px;
    }

    .wrapper:hover:not(.disabled) .checkbox {
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .checkbox.checked, .checkbox.indeterminate {
      background-color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .icon {
      fill: none;
      stroke: var(--ui-text-color-on-primary, white);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      width: 12px;
      height: 12px;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .checked .icon, .indeterminate .icon {
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

    /* Focus ring for accessibility */
    input:focus-visible + .checkbox {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .label {
      font-size: 14px;
      line-height: 1.5;
      user-select: none;
    }

    /* Style when no label and no slot text is passed */
    ::slotted(*), .label {
      cursor: inherit;
    }
  `;
Ne([
  s({ type: Boolean, reflect: !0 })
], ce.prototype, "checked", 2);
Ne([
  s({ type: Boolean })
], ce.prototype, "indeterminate", 2);
Ne([
  s({ type: Boolean, reflect: !0 })
], ce.prototype, "disabled", 2);
Ne([
  s({ type: Boolean })
], ce.prototype, "required", 2);
Ne([
  s({ type: String })
], ce.prototype, "label", 2);
Ne([
  s({ type: String })
], ce.prototype, "name", 2);
Ne([
  s({ type: String })
], ce.prototype, "value", 2);
ce = Ne([
  d("ui-checkbox")
], ce);
var Fr = Object.defineProperty, Yr = Object.getOwnPropertyDescriptor, Ce = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Yr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Fr(t, r, i), i;
};
let Lt = class extends c {
  constructor() {
    super(...arguments), this.name = "", this.value = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("radio-changed", this._handleRadioChange);
  }
  _handleRadioChange(e) {
    const { value: t } = e.detail;
    this.value = t, this.querySelectorAll("ui-radio").forEach((o) => {
      const i = o;
      i.checked = i.value === t;
    }), this.dispatchEvent(new CustomEvent("change", {
      detail: { value: t },
      bubbles: !0,
      composed: !0
    }));
  }
  updated(e) {
    e.has("value") && this.querySelectorAll("ui-radio").forEach((r) => {
      const o = r;
      o.checked = o.value === this.value;
    }), e.has("name") && this.querySelectorAll("ui-radio").forEach((r) => {
      const o = r;
      o.name = this.name;
    });
  }
  render() {
    return l`
      <div class="group-container" role="radiogroup">
        <slot></slot>
      </div>
    `;
  }
};
Lt.styles = p`
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
Ce([
  s({ type: String })
], Lt.prototype, "name", 2);
Ce([
  s({ type: String })
], Lt.prototype, "value", 2);
Lt = Ce([
  d("ui-radio-group")
], Lt);
let De = class extends c {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.name = "", this.value = "", this.label = "";
  }
  _handleChange() {
    this.disabled || this.checked || this.dispatchEvent(new CustomEvent("radio-changed", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return l`
            <label class=${u({ wrapper: !0, disabled: this.disabled })}>
                <input 
                    type="radio" 
                    .name=${this.name}
                    .value=${this.value}
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    @change=${this._handleChange}
                >
                <div class=${u({ "radio-circle": !0, checked: this.checked })}></div>
                <span class="label">
                    ${this.label || l`<slot></slot>`}
                </span>
            </label>
        `;
  }
};
De.styles = p`
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
Ce([
  s({ type: Boolean, reflect: !0 })
], De.prototype, "checked", 2);
Ce([
  s({ type: Boolean })
], De.prototype, "disabled", 2);
Ce([
  s({ type: String })
], De.prototype, "name", 2);
Ce([
  s({ type: String })
], De.prototype, "value", 2);
Ce([
  s({ type: String })
], De.prototype, "label", 2);
De = Ce([
  d("ui-radio")
], De);
var qr = Object.defineProperty, Hr = Object.getOwnPropertyDescriptor, Et = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Hr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && qr(t, r, i), i;
};
let ze = class extends c {
  constructor() {
    super(...arguments), this.value = 0, this.max = 5, this.readonly = !1, this.name = "", this._hoverValue = -1;
  }
  _handleMouseEnter(e) {
    this.readonly || (this._hoverValue = e);
  }
  _handleMouseLeave() {
    this.readonly || (this._hoverValue = -1);
  }
  _handleClick(e) {
    this.readonly || (this.value = e, this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    const e = [];
    for (let t = 1; t <= this.max; t++) {
      const r = this._hoverValue >= t, o = this.value >= t && this._hoverValue === -1;
      e.push(l`
            <span 
                class=${u({
        "star-wrapper": !0,
        active: o,
        hover: r,
        readonly: this.readonly
      })}
                @mouseenter=${() => this._handleMouseEnter(t)}
                @mouseleave=${this._handleMouseLeave}
                @click=${() => this._handleClick(t)}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            </span>
        `);
    }
    return l`
      <div class=${u({ "rating-container": !0, readonly: this.readonly })} role="slider" 
           aria-valuemin="0" aria-valuemax=${this.max} aria-valuenow=${this.value}>
        ${e}
      </div>
    `;
  }
};
ze.styles = p`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      --ui-rating-color: #ffb400;
      --ui-rating-empty-color: #faaf0033;
    }

    .rating-container {
      display: inline-flex;
      position: relative;
      cursor: pointer;
      font-size: 2rem;
      line-height: 1;
    }

    .rating-container.readonly {
      cursor: default;
    }

    .star-wrapper {
        position: relative;
        display: inline-flex;
        transition: transform 0.1s ease;
    }

    .star-wrapper:not(.readonly):hover {
        transform: scale(1.1);
    }

    svg {
        width: 1em;
        height: 1em;
        fill: var(--ui-rating-empty-color);
        stroke: var(--ui-rating-color);
        stroke-width: 1;
        transition: fill 0.2s ease, stroke 0.2s ease;
    }

    .active svg {
        fill: var(--ui-rating-color);
    }
    
    .hover svg {
        fill: var(--ui-rating-color);
        opacity: 0.7;
    }

    .hidden-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
    }
  `;
Et([
  s({ type: Number })
], ze.prototype, "value", 2);
Et([
  s({ type: Number })
], ze.prototype, "max", 2);
Et([
  s({ type: Boolean })
], ze.prototype, "readonly", 2);
Et([
  s({ type: String })
], ze.prototype, "name", 2);
Et([
  g()
], ze.prototype, "_hoverValue", 2);
ze = Et([
  d("ui-rating")
], ze);
var Kr = Object.defineProperty, Wr = Object.getOwnPropertyDescriptor, gi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Wr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Kr(t, r, i), i;
};
let vt = class extends c {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "";
  }
  _handleClick() {
    this.disabled || (this.checked = !this.checked, this.dispatchEvent(new CustomEvent("change", {
      detail: { checked: this.checked },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    return l`
      <div class="wrapper" @click=${this._handleClick}>
        <div 
          class="switch ${u({ checked: this.checked, disabled: this.disabled })}"
          role="switch"
          aria-checked="${this.checked}"
          aria-disabled="${this.disabled}"
          tabindex="${this.disabled ? "-1" : "0"}"
          @keydown=${(e) => (e.key === " " || e.key === "Enter") && this._handleClick()}
        >
          <div class="thumb">
            <div class="icon-wrapper">
              ${this.checked ? l`<slot name="icon-on"></slot>` : l`<slot name="icon-off"></slot>`}
            </div>
          </div>
        </div>
        ${this.label ? l`<span class="label">${this.label}</span>` : l`<slot></slot>`}
      </div>
    `;
  }
};
vt.styles = p`
    :host {
      display: inline-block;
      --ui-switch-width: 52px;
      --ui-switch-height: 32px;
      --ui-switch-thumb-size: 24px;
      --ui-switch-thumb-offset: 4px;
      --ui-switch-bg: var(--ui-secondary-color, #6b7280);
      --ui-switch-bg-on: var(--ui-primary-color, #3b82f6);
      --ui-switch-thumb-bg: #ffffff;
      
      font-family: var(--ui-font-family, sans-serif);
      cursor: pointer;
    }

    .wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }

    .switch {
      position: relative;
      width: var(--ui-switch-width);
      height: var(--ui-switch-height);
      background-color: var(--ui-switch-bg);
      border-radius: calc(var(--ui-switch-height) / 2);
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }

    .switch.checked {
      background-color: var(--ui-switch-bg-on);
    }

    .thumb {
      position: absolute;
      top: var(--ui-switch-thumb-offset);
      left: var(--ui-switch-thumb-offset);
      width: var(--ui-switch-thumb-size);
      height: var(--ui-switch-thumb-size);
      background-color: var(--ui-switch-thumb-bg);
      border-radius: 50%;
      box-shadow: var(--ui-shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .switch.checked .thumb {
      transform: translateX(calc(var(--ui-switch-width) - var(--ui-switch-thumb-size) - (var(--ui-switch-thumb-offset) * 2)));
      color: var(--ui-primary-color, #3b82f6);
    }

    .label {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
    }

    .switch.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch:focus-visible {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .icon-wrapper {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
gi([
  s({ type: Boolean, reflect: !0 })
], vt.prototype, "checked", 2);
gi([
  s({ type: Boolean, reflect: !0 })
], vt.prototype, "disabled", 2);
gi([
  s({ type: String })
], vt.prototype, "label", 2);
vt = gi([
  d("ui-switch")
], vt);
var Xr = Object.defineProperty, Gr = Object.getOwnPropertyDescriptor, at = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Gr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Xr(t, r, i), i;
};
let xe = class extends c {
  constructor() {
    super(...arguments), this.options = [], this.value = [], this.leftTitle = "Options", this.rightTitle = "Selected", this.leftChecked = [], this.rightChecked = [];
  }
  _toggleChecked(e, t) {
    t === "left" ? this.leftChecked.indexOf(e) > -1 ? this.leftChecked = this.leftChecked.filter((o) => o !== e) : this.leftChecked = [...this.leftChecked, e] : this.rightChecked.indexOf(e) > -1 ? this.rightChecked = this.rightChecked.filter((o) => o !== e) : this.rightChecked = [...this.rightChecked, e];
  }
  _moveRight() {
    this.value = [...this.value, ...this.leftChecked], this.leftChecked = [], this._dispatchChange();
  }
  _moveLeft() {
    this.value = this.value.filter((e) => !this.rightChecked.includes(e)), this.rightChecked = [], this._dispatchChange();
  }
  _moveAllRight() {
    this.value = this.options.map((e) => e.value), this.leftChecked = [], this.rightChecked = [], this._dispatchChange();
  }
  _moveAllLeft() {
    this.value = [], this.leftChecked = [], this.rightChecked = [], this._dispatchChange();
  }
  _dispatchChange() {
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.options.filter((r) => !this.value.includes(r.value)), t = this.options.filter((r) => this.value.includes(r.value));
    return l`
      <div class="container">
        <!-- Left List -->
        <div class="list-wrapper">
          <div class="list-title">${this.leftTitle}</div>
          <div class="list-box">
            ${ut(e, (r) => r.value, (r) => l`
              <div 
                class="list-item ${u({ selected: this.leftChecked.includes(r.value) })}"
                @click=${() => this._toggleChecked(r.value, "left")}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${r.label}</span>
              </div>
            `)}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <button class="action-button" title="Move all right" @click=${this._moveAllRight}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
            </svg>
          </button>
          <button 
            class="action-button" 
            title="Move selected right" 
            ?disabled=${this.leftChecked.length === 0}
            @click=${this._moveRight}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <button 
            class="action-button" 
            title="Move selected left" 
            ?disabled=${this.rightChecked.length === 0}
            @click=${this._moveLeft}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button class="action-button" title="Move all left" @click=${this._moveAllLeft}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
            </svg>
          </button>
        </div>

        <!-- Right List -->
        <div class="list-wrapper">
          <div class="list-title">${this.rightTitle}</div>
          <div class="list-box">
            ${ut(t, (r) => r.value, (r) => l`
              <div 
                class="list-item ${u({ selected: this.rightChecked.includes(r.value) })}"
                @click=${() => this._toggleChecked(r.value, "right")}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${r.label}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
};
xe.styles = p`
    :host {
      display: block;
      --ui-transfer-list-height: 300px;
      --ui-transfer-list-width: 200px;
      
      font-family: var(--ui-font-family, sans-serif);
      color: var(--ui-text-color, #111827);
    }

    .container {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .list-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .list-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 4px;
    }

    .list-box {
      width: var(--ui-transfer-list-width);
      height: var(--ui-transfer-list-height);
      background: var(--ui-surface-background, #ffffff);
      border: 1.5px solid var(--ui-border-color, #e5e7eb);
      border-radius: var(--ui-border-radius-lg, 8px);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      box-shadow: var(--ui-shadow-sm);
    }

    .list-item {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      gap: 10px;
      user-select: none;
    }

    .list-item:hover {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }

    .list-item.selected {
      background-color: rgba(59, 130, 246, 0.08);
    }

    .checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid var(--ui-border-color, #d1d5db);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .list-item.selected .checkbox {
      background-color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .check-icon {
      color: white;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.2s;
    }

    .list-item.selected .check-icon {
      opacity: 1;
      transform: scale(1);
    }

    .item-label {
      font-size: 0.9375rem;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .action-button {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid var(--ui-border-color, #e5e7eb);
      background: var(--ui-surface-background, #ffffff);
      border-radius: 8px;
      cursor: pointer;
      color: var(--ui-text-color, #111827);
      transition: all 0.2s;
    }

    .action-button:hover:not(:disabled) {
      border-color: var(--ui-primary-color, #3b82f6);
      color: var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-md);
      transform: translateY(-1px);
    }

    .action-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .action-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    /* Scrollbar */
    .list-box::-webkit-scrollbar {
      width: 6px;
    }
    .list-box::-webkit-scrollbar-track {
      background: transparent;
    }
    .list-box::-webkit-scrollbar-thumb {
      background: var(--ui-border-color, #e5e7eb);
      border-radius: 3px;
    }
  `;
at([
  s({ type: Array })
], xe.prototype, "options", 2);
at([
  s({ type: Array })
], xe.prototype, "value", 2);
at([
  s({ type: String })
], xe.prototype, "leftTitle", 2);
at([
  s({ type: String })
], xe.prototype, "rightTitle", 2);
at([
  g()
], xe.prototype, "leftChecked", 2);
at([
  g()
], xe.prototype, "rightChecked", 2);
xe = at([
  d("ui-transfer-list")
], xe);
var Jr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, Ot = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Qr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Jr(t, r, i), i;
};
let Be = class extends c {
  constructor() {
    super(...arguments), this.content = "", this.dot = !1, this.invisible = !1, this.variant = "primary", this.max = 99;
  }
  get _displayContent() {
    if (this.dot) return "";
    const e = Number(this.content);
    return !isNaN(e) && e > this.max ? `${this.max}+` : this.content;
  }
  render() {
    const e = !this.invisible && (this.dot || this.content !== "");
    return l`
      <slot></slot>
      <span
        class="badge ${u({
      hidden: !e,
      dot: this.dot,
      [this.variant]: !0
    })}"
        role="status"
        aria-hidden="${e ? "false" : "true"}"
      >
        ${this._displayContent}
      </span>
    `;
  }
};
Be.styles = p`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
      flex-shrink: 0;
    }

    .badge {
      display: flex;
      flex-wrap: wrap;
      place-content: center;
      align-items: center;
      position: absolute;
      box-sizing: border-box;
      font-family: var(--ui-font-family, sans-serif);
      font-weight: 600;
      font-size: 0.75rem;
      min-width: 20px;
      line-height: 1;
      padding: 0 6px;
      height: 20px;
      border-radius: 10px;
      z-index: 1;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      background-color: var(--ui-badge-background, var(--ui-primary-color, #3b82f6));
      color: var(--ui-badge-color, var(--ui-text-color-on-primary, white));
      top: 0;
      right: 0;
      transform: scale(1) translate(50%, -50%);
      transform-origin: 100% 0%;
      border: 2px solid var(--ui-surface-background, white);
    }

    .badge.hidden {
      transform: scale(0) translate(50%, -50%);
    }

    .badge.dot {
      min-width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 4px;
    }

    /* Variants */
    .primary { background-color: var(--ui-primary-color, #3b82f6); }
    .secondary { background-color: var(--ui-secondary-color, #6b7280); }
    .error { background-color: #ef4444; }
    .success { background-color: #10b981; }
    .warning { background-color: #f59e0b; }
  `;
Ot([
  s({ type: String })
], Be.prototype, "content", 2);
Ot([
  s({ type: Boolean })
], Be.prototype, "dot", 2);
Ot([
  s({ type: Boolean })
], Be.prototype, "invisible", 2);
Ot([
  s({ type: String })
], Be.prototype, "variant", 2);
Ot([
  s({ type: Number })
], Be.prototype, "max", 2);
Be = Ot([
  d("ui-badge")
], Be);
var Zr = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, mi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? eo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Zr(t, r, i), i;
};
let gt = class extends c {
  constructor() {
    super(...arguments), this.severity = "info", this.title = "", this.dismissible = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(this._closeTimer);
  }
  _handleClose() {
    this.dispatchEvent(new CustomEvent("ui-alert-close", {
      bubbles: !0,
      composed: !0,
      detail: { severity: this.severity }
    })), this.style.opacity = "0", this.style.transform = "translateY(-4px)", this.style.transition = "opacity 0.2s ease, transform 0.2s ease", this._closeTimer = setTimeout(() => {
      this.remove();
    }, 200);
  }
  _getIcon() {
    switch (this.severity) {
      case "success":
        return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      case "warning":
        return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      case "error":
        return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
      default:
        return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }
  }
  render() {
    return l`
            <div class="alert ${u({ [this.severity]: !0 })}" role="alert">
                <div class="icon">
                    <slot name="icon">${this._getIcon()}</slot>
                </div>
                <div class="content">
                    ${this.title ? l`<div class="title">${this.title}</div>` : ""}
                    <div class="message">
                        <slot></slot>
                    </div>
                </div>
                ${this.dismissible ? l`
                    <button class="close-button" @click=${this._handleClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                ` : ""}
            </div>
        `;
  }
};
gt.styles = p`
        :host {
            display: block;
            width: 100%;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            margin-bottom: 1rem;
        }

        .alert {
            display: flex;
            align-items: flex-start;
            padding: 12px 16px;
            border-radius: var(--ui-border-radius-md, 6px);
            gap: 12px;
            border: 1px solid transparent;
            position: relative;
            box-sizing: border-box;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Severities */
        .info {
            background-color: #eff6ff;
            border-color: #bfdbfe;
            color: #1e40af;
        }
        .info .icon { color: #3b82f6; }

        .success {
            background-color: #f0fdf4;
            border-color: #bbf7d0;
            color: #166534;
        }
        .success .icon { color: #10b981; }

        .warning {
            background-color: #fffbeb;
            border-color: #fef3c7;
            color: #92400e;
        }
        .warning .icon { color: #f59e0b; }

        .error {
            background-color: #fef2f2;
            border-color: #fee2e2;
            color: #991b1b;
        }
        .error .icon { color: #ef4444; }

        .icon {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            margin-top: 2px;
        }

        .content {
            flex-grow: 1;
        }

        .title {
            font-weight: 600;
            font-size: 0.875rem;
            margin-bottom: 2px;
        }

        .message {
            font-size: 0.875rem;
            line-height: 1.5;
        }

        .close-button {
            flex-shrink: 0;
            cursor: pointer;
            padding: 6px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            margin-top: -6px;
            margin-right: -10px;
            color: currentColor;
            opacity: 0.6;
            transition: all 0.2s ease;
            border: none;
            background: transparent;
        }

        .close-button:hover {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.08);
        }

        .close-button:active {
            transform: scale(0.92);
        }

        .icon svg,
        .close-button svg {
            width: 100%;
            height: 100%;
        }
    `;
mi([
  s({ type: String })
], gt.prototype, "severity", 2);
mi([
  s({ type: String })
], gt.prototype, "title", 2);
mi([
  s({ type: Boolean })
], gt.prototype, "dismissible", 2);
gt = mi([
  d("ui-alert")
], gt);
var to = Object.defineProperty, io = Object.getOwnPropertyDescriptor, Dt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? io(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && to(t, r, i), i;
};
let Ae = class extends c {
  constructor() {
    super(...arguments), this.dark = !1, this.animation = "pulse", this.variant = "text", this.width = "", this.height = "";
  }
  render() {
    const e = {
      width: this.width || (this.variant === "text" ? "100%" : ""),
      height: this.height || (this.variant === "text" ? "0.8em" : ""),
      marginTop: this.variant === "text" ? "0.3em" : "",
      marginBottom: this.variant === "text" ? "0.3em" : ""
    };
    return l`
            <span 
                class="skeleton ${this.animation} ${this.variant}" 
                style=${st(e)}
                aria-hidden="true"
            ></span>
        `;
  }
};
Ae.styles = p`
        :host {
            display: block;
        }

        .skeleton {
            display: block;
            background-color: var(--ui-skeleton-bg, rgba(0, 0, 0, 0.11));
            position: relative;
            overflow: hidden;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .skeleton {
                background-color: var(--ui-skeleton-bg-dark, rgba(255, 255, 255, 0.13));
            }
        }

        /* Explicit dark attribute support */
        :host([dark]) .skeleton {
            background-color: var(--ui-skeleton-bg-dark, rgba(255, 255, 255, 0.13));
        }

        .skeleton.pulse {
            animation: pulse 1.5s ease-in-out 0.5s infinite;
        }

        .skeleton.wave::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.4),
                transparent
            );
            animation: wave 1.6s linear infinite;
            transform: translateX(-100%);
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
        }

        @keyframes wave {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .circular {
            border-radius: 50%;
        }

        .rectangular {
            border-radius: var(--ui-border-radius-md, 4px);
        }

        .rounded {
            border-radius: var(--ui-border-radius-lg, 8px);
        }
    `;
Dt([
  s({ type: Boolean, reflect: !0 })
], Ae.prototype, "dark", 2);
Dt([
  s({ type: String })
], Ae.prototype, "animation", 2);
Dt([
  s({ type: String })
], Ae.prototype, "variant", 2);
Dt([
  s({ type: String })
], Ae.prototype, "width", 2);
Dt([
  s({ type: String })
], Ae.prototype, "height", 2);
Ae = Dt([
  d("ui-skeleton")
], Ae);
var ro = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, Qt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? oo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ro(t, r, i), i;
};
let We = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.message = "", this.autoHideDuration = 5e3, this.anchorOrigin = "bottom-center", this._timer = null;
  }
  updated(e) {
    e.has("open") && (this.open ? this._startTimer() : this._clearTimer());
  }
  _startTimer() {
    this._clearTimer(), this.autoHideDuration > 0 && (this._timer = setTimeout(() => {
      this.close();
    }, this.autoHideDuration));
  }
  _clearTimer() {
    this._timer && (clearTimeout(this._timer), this._timer = null);
  }
  /**
   * Closes the snackbar.
   */
  close() {
    this.open = !1, this.dispatchEvent(new CustomEvent("ui-snackbar-close", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = {
      snackbar: !0,
      open: this.open
    };
    return l`
            <div class=${u(e)} role="presentation">
                <div class="message">
                    <slot>${this.message}</slot>
                </div>
                <div class="action">
                    <slot name="action"></slot>
                </div>
            </div>
        `;
  }
};
We.styles = p`
        :host {
            display: block;
            pointer-events: none;
            position: fixed;
            z-index: 1400;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Positions */
        :host([anchor-origin*="bottom"]) { bottom: 24px; }
        :host([anchor-origin*="top"]) { top: 24px; }
        :host([anchor-origin*="left"]) { left: 24px; }
        :host([anchor-origin*="right"]) { right: 24px; }
        :host([anchor-origin*="center"]) { 
            left: 50%;
            transform: translateX(-50%);
        }

        .snackbar {
            background-color: var(--ui-surface-background-flat, #313131);
            color: var(--ui-text-color-on-primary, #fff);
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: 0.875rem;
            line-height: 1.43;
            letter-spacing: 0.01071em;
            display: flex;
            align-items: center;
            padding: 6px 16px;
            border-radius: var(--ui-border-radius-md, 4px);
            box-shadow: var(--ui-shadow-lg, 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12));
            min-width: 288px;
            max-width: 560px;
            pointer-events: auto;
            opacity: 0;
            transform: scale(0.85);
            transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
            visibility: hidden;
        }

        .snackbar.open {
            opacity: 1;
            transform: scale(1);
            visibility: visible;
        }

        .message {
            padding: 8px 0;
            flex-grow: 1;
        }

        .action {
            display: flex;
            align-items: center;
            margin-left: 8px;
            margin-right: -8px;
            padding-left: 16px;
        }

        ::slotted(ui-alert) {
            margin-bottom: 0 !important;
            width: 100%;
            min-width: 288px;
        }
    `;
Qt([
  s({ type: Boolean, reflect: !0 })
], We.prototype, "open", 2);
Qt([
  s({ type: String })
], We.prototype, "message", 2);
Qt([
  s({ type: Number })
], We.prototype, "autoHideDuration", 2);
Qt([
  s({ type: String, attribute: "anchor-origin" })
], We.prototype, "anchorOrigin", 2);
We = Qt([
  d("ui-snackbar")
], We);
var so = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, Zt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ao(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && so(t, r, i), i;
};
let Xe = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.variant = "full", this.weight = "light", this.textAlign = "center";
  }
  render() {
    return l`
      <div 
        class="divider-container ${u({
      [`variant-${this.variant}`]: !0,
      [`weight-${this.weight}`]: !0
    })}"
        role="separator"
        aria-orientation="${this.orientation}"
      >
        ${this.textAlign !== "left" || this.orientation === "vertical" ? l`<div class="divider-line"></div>` : ""}
        
        <slot class="divider-content"></slot>
        
        ${this.textAlign !== "right" || this.orientation === "vertical" ? l`<div class="divider-line"></div>` : ""}
      </div>
    `;
  }
};
Xe.styles = p`
    :host {
      display: block;
      --ui-divider-color: var(--ui-border-color, #e5e7eb);
      --ui-divider-margin: 16px;
      --ui-divider-thickness: 1px;
    }

    .divider-container {
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      margin: var(--ui-divider-margin) 0;
    }

    .divider-line {
      flex-grow: 1;
      height: var(--ui-divider-thickness);
      background-color: var(--ui-divider-color);
      border: none;
    }

    .divider-content {
      padding: 0 16px;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      white-space: nowrap;
    }

    /* Vertical Orientation */
    :host([orientation="vertical"]) {
      display: flex;
      align-self: stretch;
      margin: 0;
      width: auto;
      min-width: var(--ui-divider-thickness);
    }

    :host([orientation="vertical"]) .divider-container {
      flex-direction: column;
      height: 100%;
      width: auto;        /* override the default width: 100% */
      min-width: var(--ui-divider-thickness);
      margin: 0;
    }

    :host([orientation="vertical"]) .divider-line {
      width: var(--ui-divider-thickness);
      height: auto;
      flex: 1;            /* stretch to fill the full height of the row */
      min-height: 24px;
    }

    /* Variants */
    .variant-middle {
      margin-left: 32px;
      margin-right: 32px;
      width: auto;
    }

    .variant-inset {
      margin-left: 72px;
    }

    /* Thickness weights */
    .weight-light { --ui-divider-thickness: 1px; }
    .weight-medium { --ui-divider-thickness: 2px; }
    .weight-heavy { --ui-divider-thickness: 4px; }
  `;
Zt([
  s({ type: String, reflect: !0 })
], Xe.prototype, "orientation", 2);
Zt([
  s({ type: String })
], Xe.prototype, "variant", 2);
Zt([
  s({ type: String })
], Xe.prototype, "weight", 2);
Zt([
  s({ type: String })
], Xe.prototype, "textAlign", 2);
Xe = Zt([
  d("ui-divider")
], Xe);
var no = Object.defineProperty, lo = Object.getOwnPropertyDescriptor, Ie = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? lo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && no(t, r, i), i;
};
let ie = class extends c {
  constructor() {
    super(...arguments), this.value = 50, this.min = 0, this.max = 100, this.step = 1, this.disabled = !1, this.label = "", this.showValue = !1, this.vertical = !1;
  }
  _handleInput(e) {
    const t = e.target;
    this.value = Number(t.value), this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = (this.value - this.min) / (this.max - this.min) * 100, t = this.vertical ? {
      background: `linear-gradient(to left, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${e}%, var(--ui-input-border-color, #d1d5db) ${e}%, var(--ui-input-border-color, #d1d5db) 100%)`
    } : {
      background: `linear-gradient(to right, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${e}%, var(--ui-input-border-color, #d1d5db) ${e}%, var(--ui-input-border-color, #d1d5db) 100%)`
    }, r = { "slider-wrapper": !0, vertical: this.vertical }, o = { "label-row": !0, vertical: this.vertical }, i = { "track-container": !0, vertical: this.vertical }, a = { vertical: this.vertical };
    return l`
      <div class=${u(r)}>
        <div class=${u(o)}>
          ${this.label ? l`<label class=${u({ "disabled-label": this.disabled })}>${this.label}</label>` : ""}
          ${this.showValue ? l`<span class="value-display">${this.value}</span>` : ""}
        </div>
        <div class=${u(i)}>
          <input
            type="range"
            class=${u(a)}
            .min=${this.min.toString()}
            .max=${this.max.toString()}
            .step=${this.step.toString()}
            .value=${this.value.toString()}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            style=${st(t)}
            aria-label=${this.label || "Slider"}
            aria-orientation=${this.vertical ? "vertical" : "horizontal"}
          >
        </div>
      </div>
    `;
  }
};
ie.styles = p`
    :host {
      display: block;
      padding: 12px 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }

    :host([vertical]) {
      /* The host IS the sizing boundary. Consumers set height on the host
         (or via --ui-slider-vertical-height). Internal layout fills it. */
      padding: 0 12px;
      display: inline-flex;
      height: var(--ui-slider-vertical-height, 200px);
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slider-wrapper.vertical {
      /* Fill the host completely; label row at top, track fills the rest */
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 100%;
      /* Move label/value to the bottom so the track has maximum room above */
      flex-direction: column-reverse;
      justify-content: flex-end;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
    }

    .label-row.vertical {
      flex-direction: column;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .value-display {
      font-weight: 600;
      color: var(--ui-primary-color, #3b82f6);
    }

    .track-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .track-container.vertical {
      /* Fill all remaining vertical space */
      flex: 1;
      min-height: 0;   /* critical: lets flex child shrink below content size */
      width: auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
      background: var(--ui-input-border-color, #d1d5db);
      border-radius: 3px;
      outline: none;
      margin: 10px 0;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    input[type='range'].vertical {
      writing-mode: vertical-lr;
      direction: rtl;
      /* Width/height are swapped in vertical writing mode:
         'width' here becomes the visual thickness of the track,
         'height' becomes the visual length. */
      width: 6px;
      height: 100%;
      margin: 0;
      appearance: slider-vertical;
      -webkit-appearance: slider-vertical;
    }

    @supports not (appearance: slider-vertical) {
      input[type='range'].vertical {
        writing-mode: vertical-lr;
        direction: rtl;
        width: 6px;
        height: 100%;
        margin: 0;
      }
    }

    input[type='range']:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Thumb Styling */
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    input[type='range']::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
    }

    input[type='range']:focus-visible::-webkit-slider-thumb {
        outline: 2px solid var(--ui-primary-color, #3b82f6);
        outline-offset: 4px;
    }

    input[type='range']:not(:disabled):hover::-webkit-slider-thumb {
        transform: scale(1.1);
        box-shadow: var(--ui-shadow-md);
    }

    input[type='range']:active::-webkit-slider-thumb {
        transform: scale(0.95);
    }

    .disabled-label {
        color: var(--ui-text-color-muted);
    }
  `;
Ie([
  s({ type: Number })
], ie.prototype, "value", 2);
Ie([
  s({ type: Number })
], ie.prototype, "min", 2);
Ie([
  s({ type: Number })
], ie.prototype, "max", 2);
Ie([
  s({ type: Number })
], ie.prototype, "step", 2);
Ie([
  s({ type: Boolean })
], ie.prototype, "disabled", 2);
Ie([
  s({ type: String })
], ie.prototype, "label", 2);
Ie([
  s({ type: Boolean })
], ie.prototype, "showValue", 2);
Ie([
  s({ type: Boolean, reflect: !0 })
], ie.prototype, "vertical", 2);
ie = Ie([
  d("ui-slider")
], ie);
var co = Object.defineProperty, po = Object.getOwnPropertyDescriptor, oe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? po(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && co(t, r, i), i;
};
let K = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.placeholder = "", this.type = "text", this.variant = "outlined", this.disabled = !1, this.error = !1, this.helperText = "", this.errorMessage = "", this._focused = !1;
  }
  _handleInput(e) {
    this.value = e.target.value, this.dispatchEvent(new CustomEvent("input", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleChange(e) {
    this.value = e.target.value, this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleFocus() {
    this._focused = !0;
  }
  _handleBlur() {
    this._focused = !1;
  }
  render() {
    const e = this.error || !!this.errorMessage;
    return l`
      <div class=${u({ "field-container": !0, filled: this.variant === "filled" })}>
        ${this.label ? l`<label class="label">${this.label}</label>` : ""}
        
        <div class=${u({
      "input-wrapper": !0,
      focused: this._focused,
      error: e,
      disabled: this.disabled
    })}>
          <div class="icon-leading" part="leading-icon">
            <slot name="leading"></slot>
          </div>

          <input
            .type=${this.type}
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            aria-invalid=${e ? "true" : "false"}
          />

          <div class="icon-trailing" part="trailing-icon">
            <slot name="trailing"></slot>
          </div>
        </div>

        ${e && this.errorMessage ? l`<span class="helper-text error-text">${this.errorMessage}</span>` : this.helperText ? l`<span class="helper-text">${this.helperText}</span>` : ""}
      </div>
    `;
  }
};
K.styles = p`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      margin-bottom: 1rem;
    }

    .field-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
      transition: color 0.2s;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--ui-surface-background, white);
      border: 1px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-input-border-radius, 6px);
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .input-wrapper:hover:not(.disabled):not(.error) {
      border-color: var(--ui-text-color-muted, #6b7280);
    }

    .input-wrapper.focused:not(.error) {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .input-wrapper.error {
      border-color: #ef4444;
    }

    .input-wrapper.error.focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }

    .input-wrapper.disabled {
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      cursor: not-allowed;
      opacity: 0.7;
    }

    input {
      flex: 1;
      width: 100%;
      padding: 0.625rem 0.875rem;
      font-size: 1rem;
      font-family: inherit;
      color: inherit;
      background: transparent;
      border: none;
      outline: none;
    }

    input:disabled {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--ui-text-color-muted, #9ca3af);
    }

    .icon-leading, .icon-trailing {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-text-color-muted, #6b7280);
      padding: 0 0.75rem;
    }

    .icon-leading {
      padding-right: 0;
    }

    .icon-trailing {
      padding-left: 0;
    }

    .helper-text {
      font-size: 0.75rem;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .error-text {
      color: #ef4444;
    }

    /* Outlined variant (default) */
    /* Filled variant */
    .filled .input-wrapper {
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      border-bottom: 2px solid var(--ui-input-border-color, #d1d5db);
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 4px 4px 0 0;
    }

    .filled .input-wrapper.focused {
      border-bottom-color: var(--ui-primary-color, #3b82f6);
      background-color: var(--ui-hover-color, rgba(0,0,0,0.02));
    }
  `;
oe([
  s({ type: String })
], K.prototype, "label", 2);
oe([
  s({ type: String })
], K.prototype, "value", 2);
oe([
  s({ type: String })
], K.prototype, "placeholder", 2);
oe([
  s({ type: String })
], K.prototype, "type", 2);
oe([
  s({ type: String })
], K.prototype, "variant", 2);
oe([
  s({ type: Boolean })
], K.prototype, "disabled", 2);
oe([
  s({ type: Boolean })
], K.prototype, "error", 2);
oe([
  s({ type: String })
], K.prototype, "helperText", 2);
oe([
  s({ type: String })
], K.prototype, "errorMessage", 2);
oe([
  g()
], K.prototype, "_focused", 2);
K = oe([
  d("ui-text-field")
], K);
var ho = Object.defineProperty, uo = Object.getOwnPropertyDescriptor, yi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? uo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ho(t, r, i), i;
};
let mt = class extends c {
  constructor() {
    super(...arguments), this.selected = !1, this.disabled = !1, this.value = "";
  }
  _handleClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("toggle-click", {
      detail: { value: this.value, selected: !this.selected },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return l`
      <button 
        type="button"
        class=${u({ selected: this.selected })}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        aria-pressed=${this.selected}
      >
        <slot></slot>
      </button>
    `;
  }
};
mt.styles = p`
    :host {
      display: inline-block;
    }
    
    button {
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-weight: 500;
      font-size: 14px;
      padding: 8px 16px;
      border: 1px solid var(--ui-input-border-color, #d1d5db);
      background-color: var(--ui-surface-background, white);
      color: var(--ui-text-color, #111827);
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      outline: none;
    }

    button:hover:not(:disabled) {
      background-color: var(--ui-hover-color, #f3f4f6);
    }

    button.selected {
      background-color: var(--ui-active-color, #e5e7eb);
      color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
      z-index: 1;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button:focus-visible {
      box-shadow: 0 0 0 2px var(--ui-primary-color, #3b82f6);
      z-index: 2;
    }

    /* Border radius management is usually handled by the group */
    :host([data-first]) button {
      border-top-left-radius: var(--ui-border-radius-md, 6px);
      border-bottom-left-radius: var(--ui-border-radius-md, 6px);
    }

    :host([data-last]) button {
      border-top-right-radius: var(--ui-border-radius-md, 6px);
      border-bottom-right-radius: var(--ui-border-radius-md, 6px);
    }

    :host(:not([data-first])) button {
      margin-left: -1px;
    }
  `;
yi([
  s({ type: Boolean, reflect: !0 })
], mt.prototype, "selected", 2);
yi([
  s({ type: Boolean, reflect: !0 })
], mt.prototype, "disabled", 2);
yi([
  s({ type: String })
], mt.prototype, "value", 2);
mt = yi([
  d("ui-toggle-button")
], mt);
var fo = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, rr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? bo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && fo(t, r, i), i;
};
let Ut = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.exclusive = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("toggle-click", this._handleToggleClick), this._updateChildren();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("toggle-click", this._handleToggleClick);
  }
  _handleToggleClick(e) {
    const { value: t, selected: r } = e.detail;
    if (this.exclusive)
      this.value = r ? t : "";
    else {
      const o = Array.isArray(this.value) ? [...this.value] : this.value ? [this.value] : [];
      if (r)
        o.includes(t) || o.push(t);
      else {
        const i = o.indexOf(t);
        i > -1 && o.splice(i, 1);
      }
      this.value = o;
    }
    this._updateChildren(), this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _updateChildren() {
    const e = Array.from(this.querySelectorAll("ui-toggle-button"));
    e.forEach((t, r) => {
      const o = t, i = this.exclusive ? this.value === o.value : Array.isArray(this.value) && this.value.includes(o.value);
      o.selected = i, r === 0 ? o.setAttribute("data-first", "") : o.removeAttribute("data-first"), r === e.length - 1 ? o.setAttribute("data-last", "") : o.removeAttribute("data-last");
    });
  }
  updated(e) {
    e.has("value") && this._updateChildren();
  }
  render() {
    return l`<slot @slotchange=${this._updateChildren}></slot>`;
  }
};
Ut.styles = p`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }
  `;
rr([
  s({ type: String })
], Ut.prototype, "value", 2);
rr([
  s({ type: Boolean })
], Ut.prototype, "exclusive", 2);
Ut = rr([
  d("ui-toggle-button-group")
], Ut);
var vo = Object.defineProperty, go = Object.getOwnPropertyDescriptor, Ve = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? go(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && vo(t, r, i), i;
};
let de = class extends c {
  constructor() {
    super(...arguments), this.src = "", this.alt = "", this.initials = "", this.variant = "circle", this.size = "medium", this._hasError = !1, this._isLoading = !1;
  }
  willUpdate(e) {
    e.has("src") && (this._hasError = !1, this._isLoading = !!this.src);
  }
  _handleError() {
    this._hasError = !0, this._isLoading = !1;
  }
  _handleLoad() {
    this._isLoading = !1;
  }
  render() {
    const e = {
      avatar: !0,
      square: this.variant === "square",
      rounded: this.variant === "rounded",
      loading: this._isLoading
    };
    return l`
      <div class=${u(e)} part="base">
        ${this.src && !this._hasError ? l`<img src=${this.src} alt=${this.alt} @error=${this._handleError} @load=${this._handleLoad} style=${this._isLoading ? "display:none" : x} part="image" />` : this.initials ? l`<span class="initials" part="initials">${this.initials.substring(0, 2)}</span>` : l`<slot><svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></slot>`}
      </div>
    `;
  }
};
de.styles = p`
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
Ve([
  s({ type: String })
], de.prototype, "src", 2);
Ve([
  s({ type: String })
], de.prototype, "alt", 2);
Ve([
  s({ type: String })
], de.prototype, "initials", 2);
Ve([
  s({ type: String })
], de.prototype, "variant", 2);
Ve([
  s({ type: String, reflect: !0 })
], de.prototype, "size", 2);
Ve([
  g()
], de.prototype, "_hasError", 2);
Ve([
  g()
], de.prototype, "_isLoading", 2);
de = Ve([
  d("ui-avatar")
], de);
var mo = Object.defineProperty, yo = Object.getOwnPropertyDescriptor, nt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? yo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && mo(t, r, i), i;
};
let _e = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.variant = "filled", this.color = "default", this.clickable = !1, this.deletable = !1, this.disabled = !1;
  }
  _handleClick(e) {
    e.stopPropagation(), !(this.disabled || !this.clickable) && this.dispatchEvent(new CustomEvent("click", {
      bubbles: !0,
      composed: !0
    }));
  }
  _handleKeyDown(e) {
    e.key !== "Enter" && e.key !== " " || (e.preventDefault(), !this.disabled && this.clickable && this.dispatchEvent(new CustomEvent("click", {
      bubbles: !0,
      composed: !0
    })));
  }
  _handleDelete(e) {
    e.stopPropagation(), !this.disabled && this.dispatchEvent(new CustomEvent("delete", {
      bubbles: !0,
      composed: !0
    }));
  }
  _handleDeleteKeyDown(e) {
    e.key !== "Enter" && e.key !== " " || (e.preventDefault(), e.stopPropagation(), this.disabled || this.dispatchEvent(new CustomEvent("delete", {
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    const e = {
      chip: !0,
      clickable: this.clickable,
      disabled: this.disabled,
      outlined: this.variant === "outlined",
      primary: this.color === "primary",
      secondary: this.color === "secondary"
    };
    return l`
      <div
        class=${u(e)}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        role=${ni(this.clickable ? "button" : void 0)}
        tabindex=${this.clickable && !this.disabled ? "0" : "-1"}
        aria-disabled=${this.disabled ? "true" : "false"}
      >
        <slot name="avatar"></slot>
        <slot name="icon"></slot>
        <span class="label">${this.label}</span>
        ${this.deletable ? l`
          <span
            class="delete-icon"
            @click=${this._handleDelete}
            @keydown=${this._handleDeleteKeyDown}
            tabindex=${this.disabled ? "-1" : "0"}
            role="button"
            aria-label="Remove ${this.label}"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          </span>
        ` : ""}
      </div>
    `;
  }
};
_e.styles = p`
    :host {
      display: inline-block;
      vertical-align: middle;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      transition: all 0.2s ease;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      color: var(--ui-text-color, #111827);
      border: 1px solid transparent;
      user-select: none;
      gap: 8px;
      outline: none;
      overflow: hidden;
    }

    .chip.clickable {
      cursor: pointer;
    }

    .chip.clickable:hover:not(.disabled) {
      background-color: var(--ui-hover-color, #e5e7eb);
    }

    .chip.clickable:active:not(.disabled) {
      background-color: var(--ui-active-color, #d1d5db);
    }

    .chip.outlined {
      background-color: transparent;
      border-color: var(--ui-input-border-color, #d1d5db);
    }

    .chip.primary:not(.outlined) {
      background-color: var(--ui-primary-color, #3b82f6);
      color: white;
    }

    .chip.secondary:not(.outlined) {
      background-color: var(--ui-secondary-color, #6b7280);
      color: white;
    }

    .chip.outlined.primary {
      color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .chip.outlined.secondary {
      color: var(--ui-secondary-color, #6b7280);
      border-color: var(--ui-secondary-color, #6b7280);
    }

    .chip.primary.clickable:hover:not(.disabled) {
      filter: brightness(0.9);
      box-shadow: var(--ui-shadow-sm);
    }

    .chip.secondary.clickable:hover:not(.disabled) {
      filter: brightness(0.9);
      box-shadow: var(--ui-shadow-sm);
    }

    .chip.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .chip:focus-visible {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .delete-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin-right: -4px;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      transition: opacity 0.2s, background-color 0.2s;
      outline: none;
    }

    .delete-icon:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .delete-icon:focus-visible {
      opacity: 1;
      outline: 2px solid currentColor;
      outline-offset: 1px;
    }

    .chip.disabled .delete-icon {
      cursor: not-allowed;
      pointer-events: none;
    }

    ::slotted([slot="avatar"]) {
      --ui-avatar-size: 24px;
      width: 24px;
      height: 24px;
      margin-left: -8px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    ::slotted([slot="icon"]) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-left: -4px;
      flex-shrink: 0;
      line-height: 1;
    }
  `;
nt([
  s({ type: String })
], _e.prototype, "label", 2);
nt([
  s({ type: String })
], _e.prototype, "variant", 2);
nt([
  s({ type: String })
], _e.prototype, "color", 2);
nt([
  s({ type: Boolean })
], _e.prototype, "clickable", 2);
nt([
  s({ type: Boolean })
], _e.prototype, "deletable", 2);
nt([
  s({ type: Boolean, reflect: !0 })
], _e.prototype, "disabled", 2);
_e = nt([
  d("ui-chip")
], _e);
var xo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, Se = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? _o(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && xo(t, r, i), i;
};
let Di = class extends c {
  render() {
    return l`<ul role="list" style="margin: 0; padding: 0; list-style: none;"><slot></slot></ul>`;
  }
};
Di.styles = p`
    :host {
      display: block;
      padding: 8px 0;
      margin: 0;
      list-style: none;
      background-color: var(--ui-surface-background, white);
    }
  `;
Di = Se([
  d("ui-list")
], Di);
let zi = class extends c {
  render() {
    return l`<li role="listitem"><slot></slot></li>`;
  }
};
zi.styles = p`
    :host {
      display: block;
      box-sizing: border-box;
    }
    li {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      gap: 16px;
      list-style: none;
    }
  `;
zi = Se([
  d("ui-list-item")
], zi);
let Bi = class extends c {
  render() {
    return l`<li role="button" tabindex="0"><slot></slot></li>`;
  }
};
Bi.styles = p`
    :host {
      display: block;
      box-sizing: border-box;
    }
    li {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      gap: 16px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      user-select: none;
      list-style: none;
      outline: none;
    }
    li:hover {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }
    li:active {
      background-color: var(--ui-active-color, rgba(0, 0, 0, 0.08));
    }
    li:focus-visible {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
      box-shadow: inset 0 0 0 2px var(--ui-primary-color, #3b82f6);
    }
  `;
Bi = Se([
  d("ui-list-item-button")
], Bi);
let Ai = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ai.styles = p`
    :host {
      display: inline-flex;
      min-width: 40px;
      color: var(--ui-text-color-muted, #6b7280);
      flex-shrink: 0;
    }
    ::slotted(*) {
        width: 24px;
        height: 24px;
    }
  `;
Ai = Se([
  d("ui-list-item-icon")
], Ai);
let Ti = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ti.styles = p`
    :host {
      display: inline-flex;
      min-width: 56px;
      flex-shrink: 0;
    }
  `;
Ti = Se([
  d("ui-list-item-avatar")
], Ti);
let Rt = class extends c {
  constructor() {
    super(...arguments), this.primary = "", this.secondary = "";
  }
  render() {
    return l`
      <span class="primary">${this.primary}<slot name="primary"></slot></span>
      ${this.secondary ? l`<span class="secondary">${this.secondary}<slot name="secondary"></slot></span>` : ""}
    `;
  }
};
Rt.styles = p`
    :host {
      flex: 1 1 auto;
      margin-top: 4px;
      margin-bottom: 4px;
    }
    .primary {
      display: block;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 1rem;
      color: var(--ui-text-color, #111827);
      line-height: 1.5;
    }
    .secondary {
      display: block;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      line-height: 1.43;
    }
  `;
Se([
  s({ type: String })
], Rt.prototype, "primary", 2);
Se([
  s({ type: String })
], Rt.prototype, "secondary", 2);
Rt = Se([
  d("ui-list-item-text")
], Rt);
let ji = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
ji.styles = p`
    :host {
      display: block;
      padding: 16px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ui-text-color-muted, #6b7280);
      font-family: var(--ui-font-family, sans-serif);
      line-height: 1;
    }
  `;
ji = Se([
  d("ui-list-subheader")
], ji);
var wo = Object.defineProperty, ko = Object.getOwnPropertyDescriptor, se = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ko(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && wo(t, r, i), i;
};
let li = class extends c {
  constructor() {
    super(...arguments), this.shadow = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
li.styles = p`
    :host {
      display: block;
      width: 100%;
      overflow-x: auto;
      background-color: var(--ui-surface-background, white);
      border-radius: var(--ui-border-radius-lg, 8px);
      box-shadow: var(--ui-shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
    }
    :host([shadow]) {
      box-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    }
  `;
se([
  s({ type: Boolean, reflect: !0 })
], li.prototype, "shadow", 2);
li = se([
  d("ui-table-container")
], li);
let Mi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Mi.styles = p`
    :host {
      display: table;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }
  `;
Mi = se([
  d("ui-table")
], Mi);
let Li = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Li.styles = p`
    :host {
      display: table-header-group;
    }
  `;
Li = se([
  d("ui-table-head")
], Li);
let Ui = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ui.styles = p`
    :host {
      display: table-row-group;
    }
  `;
Ui = se([
  d("ui-table-body")
], Ui);
let ci = class extends c {
  constructor() {
    super(...arguments), this.selected = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
ci.styles = p`
    :host {
      display: table-row;
      vertical-align: middle;
      outline: 0;
      transition: background-color 0.2s ease;
    }
    :host(:hover) {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }
    :host([selected]) {
      background-color: var(--ui-active-color, rgba(59, 130, 246, 0.08));
    }
  `;
se([
  s({ type: Boolean, reflect: !0 })
], ci.prototype, "selected", 2);
ci = se([
  d("ui-table-row")
], ci);
let Nt = class extends c {
  constructor() {
    super(...arguments), this.header = !1, this.align = "left";
  }
  render() {
    return l`<slot></slot>`;
  }
};
Nt.styles = p`
    :host {
      display: table-cell;
      padding: 16px;
      font-size: 0.875rem;
      text-align: left;
      border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
    }
    :host([header]) {
      color: var(--ui-text-color-muted, #6b7280);
      font-weight: 600;
      line-height: 1.5rem;
    }
    :host([align="right"]) { text-align: right; }
    :host([align="center"]) { text-align: center; }
    :host([padding="checkbox"]) { width: 48px; padding: 0 0 0 4px; }
  `;
se([
  s({ type: Boolean, reflect: !0 })
], Nt.prototype, "header", 2);
se([
  s({ type: String, reflect: !0 })
], Nt.prototype, "align", 2);
Nt = se([
  d("ui-table-cell")
], Nt);
let Ri = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ri.styles = p`
    :host {
      display: table-footer-group;
    }
  `;
Ri = se([
  d("ui-table-footer")
], Ri);
var $o = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, or = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Co(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && $o(t, r, i), i;
};
let Vt = class extends c {
  constructor() {
    super(...arguments), this.active = !1, this.direction = "asc";
  }
  render() {
    return l`
      <slot></slot>
      <svg class=${u({ icon: !0, asc: this.direction === "asc", desc: this.direction === "desc" })} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    `;
  }
};
Vt.styles = p`
    :host {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: color 0.2s;
    }
    :host(:hover) {
      color: var(--ui-text-color, #111827);
    }
    :host(.active) {
      color: var(--ui-text-color, #111827);
      font-weight: 700;
    }
    .icon {
      margin-left: 4px;
      width: 18px;
      height: 18px;
      transition: transform 0.2s ease, opacity 0.2s;
      opacity: 0;
    }
    :host(:hover) .icon, :host(.active) .icon {
      opacity: 1;
    }
    .icon.desc {
      transform: rotate(180deg);
    }
  `;
or([
  s({ type: Boolean, reflect: !0 })
], Vt.prototype, "active", 2);
or([
  s({ type: String })
], Vt.prototype, "direction", 2);
Vt = or([
  d("ui-table-sort-label")
], Vt);
var Io = Object.defineProperty, So = Object.getOwnPropertyDescriptor, ei = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? So(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Io(t, r, i), i;
};
let Ge = class extends c {
  constructor() {
    super(...arguments), this.count = 0, this.page = 0, this.rowsPerPage = 10, this.rowsPerPageOptions = [5, 10, 25];
  }
  _handlePageChange(e) {
    this.dispatchEvent(new CustomEvent("page-change", {
      detail: { page: this.page + e },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleRowChange(e) {
    const t = e.target.value;
    this.dispatchEvent(new CustomEvent("rows-per-page-change", {
      detail: { rowsPerPage: parseInt(t) },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.page * this.rowsPerPage + 1, t = Math.min(this.count, (this.page + 1) * this.rowsPerPage);
    return l`
      <div class="spacer"></div>
      <div class="actions">
        <span>Rows per page:</span>
        <select @change=${this._handleRowChange}>
          ${this.rowsPerPageOptions.map((r) => l`
            <option value=${r} ?selected=${this.rowsPerPage === r}>${r}</option>
          `)}
        </select>
        <span>${e}-${t} of ${this.count}</span>
        <div class="nav-buttons">
          <button ?disabled=${this.page === 0} @click=${() => this._handlePageChange(-1)} aria-label="Previous page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button ?disabled=${t >= this.count} @click=${() => this._handlePageChange(1)} aria-label="Next page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </div>
    `;
  }
};
Ge.styles = p`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 8px 16px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      border-top: 1px solid var(--ui-border-color, #e5e7eb);
    }
    .spacer {
      flex: 1 1 100%;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .nav-buttons {
      display: flex;
      gap: 4px;
    }
    button {
      background: transparent;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--ui-text-color, #111827);
      transition: background-color 0.2s;
    }
    button:hover:not(:disabled) {
      background-color: var(--ui-hover-color, rgba(0,0,0,0.04));
    }
    button:disabled {
      color: var(--ui-text-color-muted, #9ca3af);
      cursor: not-allowed;
    }
    select {
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      outline: none;
    }
  `;
ei([
  s({ type: Number })
], Ge.prototype, "count", 2);
ei([
  s({ type: Number })
], Ge.prototype, "page", 2);
ei([
  s({ type: Number })
], Ge.prototype, "rowsPerPage", 2);
ei([
  s({ type: Array })
], Ge.prototype, "rowsPerPageOptions", 2);
Ge = ei([
  d("ui-table-pagination")
], Ge);
var Po = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, zt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Eo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Po(t, r, i), i;
};
let Te = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.placement = "top", this.arrow = !1, this.disabled = !1, this._visible = !1;
  }
  _show() {
    this.disabled || !this.label || (this._visible = !0);
  }
  _hide() {
    this._visible = !1;
  }
  render() {
    return l`
      <div 
        class="tooltip-container"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
      >
        <slot></slot>
        <div class=${u({
      "tooltip-popup": !0,
      [this.placement]: !0,
      visible: this._visible
    })}>
          ${this.label}
          ${this.arrow ? l`<div class="arrow"></div>` : ""}
        </div>
      </div>
    `;
  }
};
Te.styles = p`
    :host {
      display: inline-block;
      position: relative;
    }

    .tooltip-container {
      display: inline-block;
    }

    .tooltip-popup {
      position: absolute;
      background-color: var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92));
      color: var(--ui-tooltip-color, #fff);
      padding: 4px 8px;
      border-radius: var(--ui-border-radius-sm, 4px);
      font-size: 0.75rem;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      line-height: 1.4;
      white-space: nowrap;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      pointer-events: none;
      box-shadow: var(--ui-shadow-sm, 0 2px 4px rgba(0,0,0,0.2));
    }

    /* Placements */
    .tooltip-popup.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      margin-bottom: 8px;
    }
    .tooltip-popup.top.visible {
      transform: translateX(-50%) translateY(-4px);
    }

    .tooltip-popup.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      margin-top: 8px;
    }
    .tooltip-popup.bottom.visible {
      transform: translateX(-50%) translateY(4px);
    }

    .tooltip-popup.left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(0);
      margin-right: 8px;
    }
    .tooltip-popup.left.visible {
      transform: translateY(-50%) translateX(-4px);
    }

    .tooltip-popup.right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(0);
      margin-left: 8px;
    }
    .tooltip-popup.right.visible {
      transform: translateY(-50%) translateX(4px);
    }

    .tooltip-popup.visible {
      opacity: 1;
      visibility: visible;
    }

    /* Arrow */
    .arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .tooltip-popup.top .arrow {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px 5px 0 5px;
      border-color: var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92)) transparent transparent transparent;
    }

    .tooltip-popup.bottom .arrow {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 5px 5px 5px;
      border-color: transparent transparent var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92)) transparent;
    }

    .tooltip-popup.left .arrow {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92));
    }

    .tooltip-popup.right .arrow {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px 5px 5px 0;
      border-color: transparent var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92)) transparent transparent;
    }
  `;
zt([
  s({ type: String })
], Te.prototype, "label", 2);
zt([
  s({ type: String })
], Te.prototype, "placement", 2);
zt([
  s({ type: Boolean })
], Te.prototype, "arrow", 2);
zt([
  s({ type: Boolean, reflect: !0 })
], Te.prototype, "disabled", 2);
zt([
  g()
], Te.prototype, "_visible", 2);
Te = zt([
  d("ui-tooltip")
], Te);
var Oo = Object.defineProperty, Do = Object.getOwnPropertyDescriptor, xi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Do(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Oo(t, r, i), i;
};
let yt = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.invisible = !1, this.container = !1;
  }
  _handleClick(e) {
    e.target === e.currentTarget && this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  render() {
    return l`
      <div 
        class="${u({
      backdrop: !0,
      open: this.open,
      invisible: this.invisible
    })}" 
        @click="${this._handleClick}"
        aria-hidden="${this.open ? x : "true"}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
yt.styles = p`
    :host {
      display: block;
      --ui-backdrop-color: rgba(0, 0, 0, 0.5);
      --ui-backdrop-z-index: 1200;
    }

    .backdrop {
      position: var(--ui-backdrop-position, fixed);
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background-color: var(--ui-backdrop-color);
      z-index: var(--ui-backdrop-z-index);
      -webkit-tap-highlight-color: transparent;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
    }

    :host([container]) {
      --ui-backdrop-position: absolute;
    }

    .backdrop.open {
      opacity: 1;
      visibility: visible;
    }

    .backdrop.invisible {
      background-color: transparent;
    }

    .content {
      z-index: calc(var(--ui-backdrop-z-index) + 1);
    }
  `;
xi([
  s({ type: Boolean, reflect: !0 })
], yt.prototype, "open", 2);
xi([
  s({ type: Boolean })
], yt.prototype, "invisible", 2);
xi([
  s({ type: Boolean, reflect: !0 })
], yt.prototype, "container", 2);
yt = xi([
  d("ui-backdrop")
], yt);
var zo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Pe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Bo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && zo(t, r, i), i;
};
const Ee = [];
let xt = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.transition = "scale", this.disableBackdropClose = !1, this._handleKeyDown = (e) => {
      e.key === "Escape" && this.open && Ee[Ee.length - 1] === this && this.requestClose();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._handleKeyDown);
  }
  updated(e) {
    if (super.updated(e), e.has("open"))
      if (this.open)
        Ee.includes(this) || Ee.push(this);
      else {
        const t = Ee.indexOf(this);
        t !== -1 && Ee.splice(t, 1);
      }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._handleKeyDown);
    const e = Ee.indexOf(this);
    e !== -1 && Ee.splice(e, 1);
  }
  /** Programmatically request the dialog to close (fires the 'close' event). */
  requestClose() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _handleBackdropClose(e) {
    e.stopPropagation(), this.disableBackdropClose || this.requestClose();
  }
  render() {
    const e = u({
      "dialog-panel": !0,
      open: this.open,
      [`transition-${this.transition}`]: this.transition !== "scale"
    });
    return l`
      <ui-backdrop .open=${this.open} @close=${this._handleBackdropClose}>
        <div
          class=${e}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${(t) => t.stopPropagation()}
        >
          <slot></slot>
        </div>
      </ui-backdrop>
    `;
  }
};
xt.styles = p`
    :host {
      display: block;
    }

    .dialog-panel {
      position: relative;
      background-color: var(--ui-surface-background, white);
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      max-width: 90vw;
      max-height: var(--ui-dialog-max-height, 90vh); /* ← bounds the panel so content scrolls */
      width: var(--ui-dialog-width, 444px);
      display: flex;
      flex-direction: column;
      overflow: hidden; /* clip panel; inner ui-dialog-content scrolls independently */

      /* Base state: hidden (scale transition) */
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    .dialog-panel.open {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    /* Slide-up: start below, animate to centre */
    .dialog-panel.transition-slide-up {
      transform: translateY(40px);
    }
    .dialog-panel.transition-slide-up.open {
      transform: translateY(0);
    }

    /* Slide-down: start above, animate to centre */
    .dialog-panel.transition-slide-down {
      transform: translateY(-40px);
    }
    .dialog-panel.transition-slide-down.open {
      transform: translateY(0);
    }
  `;
Pe([
  s({ type: Boolean, reflect: !0 })
], xt.prototype, "open", 2);
Pe([
  s({ type: String })
], xt.prototype, "transition", 2);
Pe([
  s({ type: Boolean, attribute: "disable-backdrop-close" })
], xt.prototype, "disableBackdropClose", 2);
xt = Pe([
  d("ui-dialog")
], xt);
let Ni = class extends c {
  render() {
    return l`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
  }
};
Ni.styles = p`
    :host {
      display: block;
      padding: 20px 24px 12px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ui-text-color, #111827);
    }
  `;
Ni = Pe([
  d("ui-dialog-title")
], Ni);
let Vi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Vi.styles = p`
    :host {
      display: block;
      padding: 0 24px 20px 24px;
      flex: 1 1 auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;
Vi = Pe([
  d("ui-dialog-content")
], Vi);
let Fi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Fi.styles = p`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 8px;
    }
  `;
Fi = Pe([
  d("ui-dialog-content-text")
], Fi);
let di = class extends c {
  constructor() {
    super(...arguments), this.align = "end";
  }
  render() {
    return l`<slot></slot>`;
  }
};
di.styles = p`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 8px 16px 16px;
      gap: 8px;
      border-top: 1px solid var(--ui-border-color, #f3f4f6);
    }

    :host([align="start"]) { justify-content: flex-start; }
    :host([align="center"]) { justify-content: center; }
    :host([align="space-between"]) { justify-content: space-between; }
  `;
Pe([
  s({ type: String, reflect: !0 })
], di.prototype, "align", 2);
di = Pe([
  d("ui-dialog-actions")
], di);
var Ao = Object.defineProperty, To = Object.getOwnPropertyDescriptor, ti = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? To(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ao(t, r, i), i;
};
let Je = class extends c {
  constructor() {
    super(...arguments), this.variant = "indeterminate", this.value = 0, this.size = 40, this.thickness = 3.6;
  }
  render() {
    const e = this.variant === "determinate", t = 20, r = 2 * Math.PI * t, o = r - this.value / 100 * r;
    return l`
      <div 
        class="circular-root ${u({ determinate: e, indeterminate: !e })}"
        style="--ui-circular-progress-size: ${this.size}px; --ui-circular-progress-thickness: ${this.thickness}"
        role="progressbar"
        aria-valuenow="${e ? this.value : void 0}"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <svg viewBox="22 22 44 44">
          <circle 
            class="circle"
            cx="44" 
            cy="44" 
            r="${t}" 
            fill="none" 
            stroke-width="${this.thickness}"
            style="${e ? `stroke-dasharray: ${r}; stroke-dashoffset: ${o}px` : ""}"
          ></circle>
        </svg>
      </div>
    `;
  }
};
Je.styles = p`
    :host {
      display: inline-block;
      --ui-circular-progress-size: 40px;
      --ui-circular-progress-color: var(--ui-primary-color, #3b82f6);
      --ui-circular-progress-thickness: 3.6;
    }

    .circular-root {
      width: var(--ui-circular-progress-size);
      height: var(--ui-circular-progress-size);
      display: inline-block;
      animation: rotate 1.4s linear infinite;
    }

    .circular-root.determinate {
      animation: none;
      transform: rotate(-90deg);
    }

    svg {
      display: block;
    }

    circle {
      stroke: var(--ui-circular-progress-color);
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    .indeterminate circle {
      animation: dash 1.4s ease-in-out infinite;
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  `;
ti([
  s({ type: String })
], Je.prototype, "variant", 2);
ti([
  s({ type: Number })
], Je.prototype, "value", 2);
ti([
  s({ type: Number })
], Je.prototype, "size", 2);
ti([
  s({ type: Number })
], Je.prototype, "thickness", 2);
Je = ti([
  d("ui-circular-progress")
], Je);
var jo = Object.defineProperty, Mo = Object.getOwnPropertyDescriptor, sr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Mo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && jo(t, r, i), i;
};
let Ft = class extends c {
  constructor() {
    super(...arguments), this.variant = "indeterminate", this.value = 0;
  }
  // 0-100
  render() {
    const e = this.variant === "determinate";
    return l`
      <div 
        class="root ${u({ determinate: e, indeterminate: !e })}"
        role="progressbar"
        aria-valuenow="${e ? this.value : void 0}"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        ${e ? l`
          <div class="bar" style="transform: scaleX(${this.value / 100})"></div>
        ` : l`
          <div class="bar bar1"></div>
          <div class="bar bar2"></div>
        `}
      </div>
    `;
  }
};
Ft.styles = p`
    :host {
      display: block;
      width: 100%;
      --ui-linear-progress-height: 4px;
      --ui-linear-progress-color: var(--ui-primary-color, #3b82f6);
      --ui-linear-progress-bg: rgba(59, 130, 246, 0.15);
    }

    .root {
      position: relative;
      overflow: hidden;
      height: var(--ui-linear-progress-height);
      background-color: var(--ui-linear-progress-bg);
      border-radius: calc(var(--ui-linear-progress-height) / 2);
    }

    .bar {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      transition: transform 0.4s linear;
      transform-origin: left;
      background-color: var(--ui-linear-progress-color);
      border-radius: inherit;
    }

    .indeterminate .bar1 {
      width: auto;
      animation: indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .indeterminate .bar2 {
      width: auto;
      animation: indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }

    @keyframes indeterminate1 {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }

    @keyframes indeterminate2 {
      0% {
        left: -200%;
        right: 100%;
      }
      60% {
        left: 107%;
        right: -8%;
      }
      100% {
        left: 107%;
        right: -8%;
      }
    }
  `;
sr([
  s({ type: String })
], Ft.prototype, "variant", 2);
sr([
  s({ type: Number })
], Ft.prototype, "value", 2);
Ft = sr([
  d("ui-linear-progress")
], Ft);
var Lo = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, Bt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Uo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Lo(t, r, i), i;
};
let Yt = class extends c {
  constructor() {
    super(), this.expanded = !1, this.disabled = !1, this._handleToggle = () => {
      this.disabled || (this.expanded = !this.expanded, this.dispatchEvent(new CustomEvent("ui-accordion-change", {
        detail: { expanded: this.expanded },
        bubbles: !0,
        composed: !0
      })));
    }, this.addEventListener("ui-accordion-toggle", this._handleToggle);
  }
  updated(e) {
    (e.has("expanded") || e.has("disabled")) && this.querySelectorAll("ui-accordion-summary, ui-accordion-details, ui-accordion-actions").forEach((t) => {
      this.expanded ? t.setAttribute("expanded", "") : t.removeAttribute("expanded"), this.disabled ? t.setAttribute("disabled", "") : t.removeAttribute("disabled");
    });
  }
  render() {
    return l`
            <div class="accordion-container" role="region">
                <slot></slot>
            </div>
        `;
  }
};
Yt.styles = p`
        :host {
            display: block;
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
            background-color: var(--ui-surface-background, #ffffff);
            color: var(--ui-text-color, #111827);
            transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(:first-of-type) {
            border-top: none;
            border-top-left-radius: var(--ui-border-radius-md, 4px);
            border-top-right-radius: var(--ui-border-radius-md, 4px);
        }

        :host(:last-of-type) {
            border-bottom-left-radius: var(--ui-border-radius-md, 4px);
            border-bottom-right-radius: var(--ui-border-radius-md, 4px);
        }

        :host([expanded]) {
            margin: 16px 0;
            border-top: none;
            box-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
        }

        :host([expanded]:first-of-type) {
            margin-top: 0;
        }

        :host([expanded]:last-of-type) {
            margin-bottom: 0;
        }

        .accordion-container {
            display: flex;
            flex-direction: column;
        }
    `;
Bt([
  s({ type: Boolean, reflect: !0 })
], Yt.prototype, "expanded", 2);
Bt([
  s({ type: Boolean, reflect: !0 })
], Yt.prototype, "disabled", 2);
Yt = Bt([
  d("ui-accordion")
], Yt);
let Yi = class extends c {
  constructor() {
    super(), this._handleActivate = () => {
      this.dispatchEvent(new CustomEvent("ui-accordion-toggle", {
        bubbles: !0,
        composed: !0
      }));
    }, this._handleKeyDown = (e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._handleActivate());
    }, this.addEventListener("click", this._handleActivate), this.addEventListener("keydown", this._handleKeyDown);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "button"), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0");
  }
  render() {
    return l`
            <div class="content">
                <slot></slot>
            </div>
            <div class="expand-icon">
                <slot name="expandIcon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </slot>
            </div>
        `;
  }
};
Yi.styles = p`
        :host {
            display: flex;
            align-items: center;
            padding: 0 16px;
            min-height: 48px;
            cursor: pointer;
            user-select: none;
            transition: min-height 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(:focus-visible) {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: -2px;
        }

        :host(:hover) {
            background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
        }

        :host([expanded]) {
            min-height: 64px;
        }

        :host([disabled]) {
            cursor: default;
            opacity: 0.5;
            pointer-events: none;
        }

        .content {
            display: flex;
            flex-grow: 1;
            margin: 12px 0;
            font-family: var(--ui-font-family, sans-serif);
            font-weight: 500;
        }

        .expand-icon {
            display: flex;
            padding: 8px;
            border-radius: 50%;
            color: var(--ui-text-color-muted, #6b7280);
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([expanded]) .expand-icon {
            transform: rotate(180deg);
        }
    `;
Yi = Bt([
  d("ui-accordion-summary")
], Yi);
let qi = class extends c {
  render() {
    return l`
            <div class="details-inner">
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
  }
};
qi.styles = p`
        :host {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 150ms cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }

        :host([expanded]) {
            grid-template-rows: 1fr;
        }

        .details-inner {
            min-height: 0;
        }

        .content {
            padding: 8px 16px 16px;
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.875rem;
            color: var(--ui-text-color, #111827);
        }
    `;
qi = Bt([
  d("ui-accordion-details")
], qi);
let Hi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Hi.styles = p`
        :host {
            display: none;
            padding: 8px 16px 16px;
            justify-content: flex-end;
            gap: 8px;
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
        }

        :host([expanded]) {
            display: flex;
        }
    `;
Hi = Bt([
  d("ui-accordion-actions")
], Hi);
var Ro = Object.defineProperty, No = Object.getOwnPropertyDescriptor, _i = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? No(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ro(t, r, i), i;
};
let _t = class extends c {
  constructor() {
    super(...arguments), this.title = "", this.position = "static", this.variant = "regular";
  }
  render() {
    return l`
      <header class="${u({
      "variant-outlined": this.variant === "outlined"
    })}">
        <div class="left-section">
          <slot name="navigation"></slot>
        </div>
        
        <div class="title">
          ${this.title}<slot name="title"></slot>
        </div>

        <div class="right-section">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
};
_t.styles = p`
    :host {
      display: block;
      position: relative;
      --ui-app-bar-height: 64px;
      --ui-app-bar-bg: var(--ui-primary-color, #3b82f6);
      --ui-app-bar-color: var(--ui-text-color-on-primary, #ffffff);
      --ui-app-bar-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      z-index: 1100;
    }

    :host([position="fixed"]) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    :host([position="absolute"]) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    :host([position="sticky"]) {
      position: sticky;
      top: 0;
    }

    header {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      height: var(--ui-app-bar-height);
      padding: 0 16px;
      background-color: var(--ui-app-bar-bg);
      color: var(--ui-app-bar-color);
      box-shadow: var(--ui-app-bar-shadow);
      position: relative;
    }

    header.variant-outlined {
      background-color: var(--ui-surface-background, #ffffff);
      color: var(--ui-text-color, #111827);
      border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
      box-shadow: none;
    }

    .title {
      flex-grow: 1;
      min-width: 0;
      margin: 0 16px;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 1.25rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .left-section, .right-section {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      gap: 8px;
    }
  `;
_i([
  s({ type: String })
], _t.prototype, "title", 2);
_i([
  s({ type: String, reflect: !0 })
], _t.prototype, "position", 2);
_i([
  s({ type: String, reflect: !0 })
], _t.prototype, "variant", 2);
_t = _i([
  d("ui-app-bar")
], _t);
var Vo = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, ii = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Fo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Vo(t, r, i), i;
};
let je = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.active = !1, this.showLabel = !0, this._handleKeydown = (e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.click());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "tab"), this.hasAttribute("tabindex") || (this.tabIndex = 0), this.addEventListener("keydown", this._handleKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this._handleKeydown);
  }
  updated(e) {
    e.has("active") && this.setAttribute("aria-selected", String(this.active));
  }
  render() {
    return l`
            <div class="icon-container" aria-hidden="true">
                <slot name="icon"></slot>
                <slot></slot>
            </div>
            <span class="${u({ label: !0, hidden: !this.showLabel })}">
                ${this.label}
            </span>
        `;
  }
};
je.styles = p`
        :host {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 6px 12px 8px;
            color: var(--ui-text-color-muted, #6b7280);
            cursor: pointer;
            transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1), padding 250ms cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
            min-width: 80px;
            max-width: 168px;
        }

        :host(:hover) {
            background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
        }

        :host([active]) {
            color: var(--ui-primary-color, #3b82f6);
            padding-top: 8px;
        }

        .icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            margin-bottom: 2px;
            transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([active]) .icon-container {
            transform: scale(1.1);
        }

        .label {
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.75rem;
            transition: font-size 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 1;
        }

        :host([active]) .label {
            font-size: 0.875rem;
        }

        .label.hidden {
            opacity: 0;
            font-size: 0;
            pointer-events: none;
        }
    `;
ii([
  s({ type: String })
], je.prototype, "label", 2);
ii([
  s()
], je.prototype, "value", 2);
ii([
  s({ type: Boolean, reflect: !0 })
], je.prototype, "active", 2);
ii([
  s({ type: Boolean })
], je.prototype, "showLabel", 2);
je = ii([
  d("ui-bottom-navigation-action")
], je);
var Yo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, wi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? qo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Yo(t, r, i), i;
};
let wt = class extends c {
  constructor() {
    super(...arguments), this.showLabels = !1;
  }
  updated(e) {
    (e.has("value") || e.has("showLabels")) && this._updateActions();
  }
  _handleSlotChange() {
    this._updateActions();
  }
  _updateActions() {
    const e = this._actions.length, t = this.showLabels || e <= 3;
    this._actions.forEach((r) => {
      r.active = r.value === this.value, r.showLabel = t || r.active;
    });
  }
  _handleActionChange(e) {
    const t = e.composedPath().find(
      (r) => r instanceof je
    );
    !t || t.value === this.value || (this.value = t.value, this.dispatchEvent(new CustomEvent("ui-bottom-navigation-change", {
      detail: { value: t.value },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    return l`
            <div class="container" role="tablist" @click=${this._handleActionChange}>
                <slot @slotchange=${this._handleSlotChange}></slot>
            </div>
        `;
  }
};
wt.styles = p`
        :host {
            display: flex;
            justify-content: center;
            height: 56px;
            background-color: var(--ui-surface-background, #ffffff);
            box-shadow: var(--ui-shadow-lg, 0 -1px 10px rgba(0, 0, 0, 0.1));
            position: relative;
            width: 100%;
        }

        .container {
            display: flex;
            flex: 1;
            max-width: 100%;
        }
    `;
wi([
  s()
], wt.prototype, "value", 2);
wi([
  s({ type: Boolean, attribute: "show-labels" })
], wt.prototype, "showLabels", 2);
wi([
  ur({ selector: "ui-bottom-navigation-action" })
], wt.prototype, "_actions", 2);
wt = wi([
  d("ui-bottom-navigation")
], wt);
var Ho = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, Fe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ko(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ho(t, r, i), i;
};
let pe = class extends c {
  constructor() {
    super(...arguments), this.maxItems = 8, this.itemsBefore = 1, this.itemsAfter = 1, this.separator = "/", this._expanded = !1, this._itemsCount = 0, this._separatorNode = null;
  }
  _handleSlotChange() {
    const t = Array.from(this.children).filter((r) => !r.slot || r.slot.startsWith("breadcrumb-item-"));
    t.forEach((r, o) => {
      const i = `breadcrumb-item-${o}`;
      r.getAttribute("slot") !== i && r.setAttribute("slot", i);
    }), this._itemsCount = t.length;
  }
  _handleSeparatorSlotChange(e) {
    const r = e.target.assignedNodes({ flatten: !0 });
    this._separatorNode = r.length > 0 ? r[0].cloneNode(!0) : null;
  }
  _renderSeparator() {
    return l`
            <span class="separator" aria-hidden="true">
                ${this._separatorNode ? this._separatorNode.cloneNode(!0) : this.separator}
            </span>
        `;
  }
  _renderItem(e, t) {
    return l`
            <li class="breadcrumb-li">
                <slot name="breadcrumb-item-${e}"></slot>
                ${t ? "" : this._renderSeparator()}
            </li>
        `;
  }
  _renderCollapsed() {
    const e = this._itemsCount;
    if (e === 0) return l``;
    if (e <= this.maxItems || this._expanded)
      return Array.from({ length: e }).map((a, n) => this._renderItem(n, n === e - 1));
    const t = Math.min(this.itemsBefore, e), r = Math.min(this.itemsAfter, e - t);
    if (t + r >= e)
      return Array.from({ length: e }).map((a, n) => this._renderItem(n, n === e - 1));
    const o = Array.from({ length: t }).map((a, n) => n), i = Array.from({ length: r }).map((a, n) => e - r + n);
    return l`
            ${o.map((a) => this._renderItem(a, !1))}
            <li class="breadcrumb-li">
                <button class="collapsed-button" @click=${() => this._expanded = !0} aria-label="Show all breadcrumbs">
                    ...
                </button>
                ${this._renderSeparator()}
            </li>
            ${i.map((a, n) => this._renderItem(a, n === i.length - 1))}
        `;
  }
  render() {
    return l`
            <nav aria-label="breadcrumb">
                <ol class="breadcrumbs-ol">
                    ${this._renderCollapsed()}
                </ol>
            </nav>
            <div style="display: none" aria-hidden="true">
                <slot @slotchange=${this._handleSlotChange}></slot>
                <slot name="separator" @slotchange=${this._handleSeparatorSlotChange}></slot>
            </div>
        `;
  }
};
pe.styles = p`
        :host {
            display: block;
        }

        .breadcrumbs-ol {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .breadcrumb-li {
            display: flex;
            align-items: center;
        }

        .separator {
            display: flex;
            user-select: none;
            margin-left: 8px;
            margin-right: 8px;
            color: var(--ui-text-color-muted, #6b7280);
        }

        ::slotted(*) {
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.875rem;
            color: var(--ui-text-color-muted, #6b7280);
            text-decoration: none;
            transition: color 200ms;
        }

        ::slotted(a:hover) {
            text-decoration: underline;
            color: var(--ui-text-color, #111827);
        }

        ::slotted([aria-current="page"]),
        ::slotted(.active) {
            color: var(--ui-text-color, #111827);
            font-weight: 500;
            pointer-events: none;
        }

        .collapsed-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
            border: none;
            border-radius: 4px;
            cursor: pointer;
            padding: 4px 8px;
            font-size: 1rem;
            line-height: 1;
            color: var(--ui-text-color-muted, #6b7280);
            transition: background-color 200ms;
        }

        .collapsed-button:hover {
            background-color: var(--ui-hover-color-strong, rgba(0, 0, 0, 0.08));
        }
    `;
Fe([
  s({ type: Number, attribute: "max-items" })
], pe.prototype, "maxItems", 2);
Fe([
  s({ type: Number, attribute: "items-before" })
], pe.prototype, "itemsBefore", 2);
Fe([
  s({ type: Number, attribute: "items-after" })
], pe.prototype, "itemsAfter", 2);
Fe([
  s({ type: String })
], pe.prototype, "separator", 2);
Fe([
  g()
], pe.prototype, "_expanded", 2);
Fe([
  g()
], pe.prototype, "_itemsCount", 2);
Fe([
  g()
], pe.prototype, "_separatorNode", 2);
pe = Fe([
  d("ui-breadcrumbs")
], pe);
var Wo = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, lt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Xo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Wo(t, r, i), i;
};
let we = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.anchor = "left", this.variant = "temporary", this.edge = !1, this.container = !1, this.label = "Drawer", this._lastFocused = null, this._boundKeyDown = (e) => {
      e.defaultPrevented || this.open && e.key === "Escape" && this.variant === "temporary" && (e.preventDefault(), this._close());
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._boundKeyDown);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._boundKeyDown), super.disconnectedCallback();
  }
  updated(e) {
    e.has("open") && this.variant === "temporary" && (this.open ? (this._lastFocused = document.activeElement, this.shadowRoot?.querySelector(".paper")?.focus()) : (this._lastFocused?.focus(), this._lastFocused = null));
  }
  _close() {
    this.dispatchEvent(new CustomEvent("ui-drawer-close", { bubbles: !0, composed: !0 }));
  }
  render() {
    const e = this.variant === "temporary", t = this.edge && !this.open && e, r = this.variant === "mini" ? "false" : String(!this.open);
    return l`
            ${e ? l`
                <div
                    class="backdrop ${this.open ? "open" : ""}"
                    @click=${this._close}
                    aria-hidden="true"
                ></div>
            ` : ""}

            ${t ? l`
                <div class="edge edge-${this.anchor}" @click=${() => {
      this.open = !0;
    }}>
                    <div class="edge-handle"></div>
                </div>
            ` : ""}

            <div
                class="paper ${this.open ? "open" : ""}"
                role=${e ? "dialog" : "complementary"}
                aria-modal=${e ? String(this.open) : "false"}
                aria-label=${this.label}
                aria-hidden=${r}
                tabindex="-1"
            >
                <slot></slot>
            </div>
        `;
  }
};
we.styles = p`
        :host {
            display: contents; /* transparent wrapper — doesn't affect layout */
            --ui-drawer-width: 250px;
            --ui-drawer-mini-width: 72px;
            --ui-drawer-height: auto;
            --ui-drawer-bg: var(--ui-surface-background, #ffffff);
            --ui-drawer-z-index: 1200;
            --ui-drawer-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
        }

        /* ── Backdrop ───────────────────────────────────────────────────── */
        /*
         * FIX: previously used display:none/.visible pattern which cancelled
         * the opacity transition on close (display:none fires instantly).
         * Now always in-flow with pointer-events disabled, so fade-out works.
         */
        .backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.5);
            z-index: calc(var(--ui-drawer-z-index) - 1);
            opacity: 0;
            pointer-events: none;
            transition: opacity .25s;
        }
        :host([container]) .backdrop { position: absolute; }
        .backdrop.open { opacity: 1; pointer-events: auto; }

        /* ── Paper ──────────────────────────────────────────────────────── */
        .paper {
            position: fixed;
            background: var(--ui-drawer-bg);
            z-index: var(--ui-drawer-z-index);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            outline: none; /* suppress focus ring from programmatic focus */
        }
        :host([container]) .paper { position: absolute; }

        /* Temporary – left (default) */
        :host(:not([variant])) .paper,
        :host([variant="temporary"]) .paper {
            top: 0; bottom: 0; left: 0;
            width: var(--ui-drawer-width);
            box-shadow: var(--ui-drawer-shadow);
            transform: translateX(-100%);
            transition: transform .225s cubic-bezier(0,.0,.2,1);
        }
        :host(:not([variant])[open]) .paper,
        :host([variant="temporary"][open]) .paper {
            transform: translateX(0);
        }

        /* Temporary – right */
        :host([variant="temporary"][anchor="right"]) .paper {
            left: auto; right: 0;
            transform: translateX(100%);
        }
        :host([variant="temporary"][anchor="right"][open]) .paper {
            transform: translateX(0);
        }

        /* Temporary – top */
        :host([variant="temporary"][anchor="top"]) .paper {
            top: 0; left: 0; right: 0; bottom: auto;
            width: auto;
            height: var(--ui-drawer-height);
            transform: translateY(-100%);
        }
        :host([variant="temporary"][anchor="top"][open]) .paper {
            transform: translateY(0);
        }

        /* Temporary – bottom */
        :host([variant="temporary"][anchor="bottom"]) .paper {
            top: auto; bottom: 0; left: 0; right: 0;
            width: auto;
            height: var(--ui-drawer-height);
            transform: translateY(100%);
        }
        :host([variant="temporary"][anchor="bottom"][open]) .paper {
            transform: translateY(0);
        }

        /* ── Persistent ─────────────────────────────────────────────────── */
        :host([variant="persistent"]) .paper {
            position: relative;
            transform: none;
            box-shadow: none;
            transition: none;
            border-right: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="persistent"][anchor="right"]) .paper {
            border-right: none;
            border-left: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="persistent"]) .paper:not(.open) {
            display: none;
        }

        /* ── Mini ───────────────────────────────────────────────────────── */
        :host([variant="mini"]) {
            display: flex; /* mini participates in flex layout of its parent */
        }
        :host([variant="mini"]) .paper {
            position: relative;
            transform: none;
            box-shadow: none;
            border-right: 1px solid var(--ui-border-color, #e5e7eb);
            width: var(--ui-drawer-mini-width);
            overflow-x: hidden;
            white-space: nowrap;
            transition: width .225s cubic-bezier(.4,0,.6,1);
            flex-shrink: 0;
        }
        :host([variant="mini"][anchor="right"]) .paper {
            border-right: none;
            border-left: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="mini"][open]) .paper {
            width: var(--ui-drawer-width);
        }
        /* Fade out labels when mini is collapsed */
        :host([variant="mini"]:not([open])) ::slotted([data-drawer-hide-mini]) {
            opacity: 0;
            pointer-events: none;
        }
        ::slotted([data-drawer-hide-mini]) { transition: opacity .18s; }

        /* ── Edge handle ─────────────────────────────────────────────────── */
        /*
         * FIX: Edge handle is only meaningful for temporary drawers (overlay
         * that slides in). For persistent/mini (position:relative), a fixed/
         * absolute edge handle floats detached from the drawer. Restrict it.
         */
        .edge {
            display: none;
            position: fixed;
            background: var(--ui-drawer-bg);
            border: 1px solid var(--ui-border-color, #e5e7eb);
            box-shadow: 0 1px 3px rgba(0,0,0,.12);
            cursor: pointer;
            z-index: var(--ui-drawer-z-index);
            align-items: center;
            justify-content: center;
        }
        :host([container]) .edge { position: absolute; }
        /* Only show edge for temporary variant */
        :host([edge]:not([variant])) .edge,
        :host([edge][variant="temporary"]) .edge { display: flex; }

        .edge-left   { left:0; top:0; bottom:0; width:16px; border-radius:0 8px 8px 0; }
        .edge-right  { right:0; top:0; bottom:0; width:16px; border-radius:8px 0 0 8px; }
        .edge-top    { top:0; left:0; right:0; height:16px; border-radius:0 0 8px 8px; }
        .edge-bottom { bottom:0; left:0; right:0; height:16px; border-radius:8px 8px 0 0; }

        .edge-handle { width:4px; height:32px; background:#cbd5e1; border-radius:2px; }
        .edge-top .edge-handle, .edge-bottom .edge-handle { width:32px; height:4px; }
    `;
lt([
  s({ type: Boolean, reflect: !0 })
], we.prototype, "open", 2);
lt([
  s({ type: String, reflect: !0 })
], we.prototype, "anchor", 2);
lt([
  s({ type: String, reflect: !0 })
], we.prototype, "variant", 2);
lt([
  s({ type: Boolean, reflect: !0 })
], we.prototype, "edge", 2);
lt([
  s({ type: Boolean, reflect: !0 })
], we.prototype, "container", 2);
lt([
  s({ type: String })
], we.prototype, "label", 2);
we = lt([
  d("ui-drawer")
], we);
var Go = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, ye = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Jo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Go(t, r, i), i;
};
let ee = class extends c {
  constructor() {
    super(...arguments), this.href = "", this.target = "_self", this.rel = "", this.color = "primary", this.underline = "always", this.variant = "inherit", this.disabled = !1;
  }
  _computedRel() {
    if (this.target === "_blank") {
      const e = this.rel || "", t = new Set(e.split(" ").filter(Boolean));
      return t.add("noopener"), t.add("noreferrer"), Array.from(t).join(" ");
    }
    return this.rel || "";
  }
  render() {
    const e = u({
      link: !0
    });
    return l`
            <a
                class="${e}"
                href=${this.disabled ? "javascript:void(0)" : this.href}
                target=${this.target}
                rel=${this._computedRel()}
                aria-label=${ni(this.label)}
                download=${ni(this.download)}
                aria-disabled=${this.disabled}
            >
                <slot></slot>
            </a>
        `;
  }
};
ee.styles = p`
        :host {
            display: inline;
            --ui-link-color: var(--ui-primary-color, #3b82f6);
            --ui-link-color-hover: var(--ui-primary-color-dark, #2563eb);
            --ui-link-color-visited: var(--ui-secondary-color, #7c3aed);
        }

        a {
            color: var(--ui-link-color);
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: inherit;
            font-weight: inherit;
            line-height: inherit;
            cursor: pointer;
            display: inline;
            transition: color 0.15s ease, opacity 0.15s ease;
        }

        /* Color variants */
        :host([color="inherit"]) a { color: inherit; }
        :host([color="primary"])  a { color: var(--ui-primary-color, #3b82f6); }
        :host([color="secondary"]) a { color: var(--ui-secondary-color, #7c3aed); }
        :host([color="success"])  a { color: var(--ui-success-color, #16a34a); }
        :host([color="error"])    a { color: var(--ui-error-color, #dc2626); }
        :host([color="warning"])  a { color: var(--ui-warning-color, #d97706); }
        :host([color="info"])     a { color: var(--ui-info-color, #0891b2); }
        :host([color="textPrimary"]) a   { color: var(--ui-text-color, #111827); }
        :host([color="textSecondary"]) a { color: var(--ui-text-color-muted, #6b7280); }

        /* Underline variants */
        :host([underline="none"])   a { text-decoration: none; }
        :host([underline="hover"])  a { text-decoration: none; }
        :host([underline="hover"])  a:hover { text-decoration: underline; }
        :host([underline="always"]) a { text-decoration: underline; }
        :host([underline="always"]) a:hover { text-decoration: underline; }

        /* Default underline (always) */
        a { text-decoration: underline; }

        /* Hover states */
        a:hover { opacity: 0.8; }

        /* Visited */
        a:visited {
            color: var(--ui-link-color-visited);
        }
        :host([color="inherit"]) a:visited { color: inherit; }

        /* Typography variants */
        :host([variant="h1"]) a { font-size: 6rem;   font-weight: 300; letter-spacing: -1.5px; line-height: 1.167; }
        :host([variant="h2"]) a { font-size: 3.75rem; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2; }
        :host([variant="h3"]) a { font-size: 3rem;   font-weight: 400; line-height: 1.167; }
        :host([variant="h4"]) a { font-size: 2.125rem; font-weight: 400; letter-spacing: 0.25px; line-height: 1.235; }
        :host([variant="h5"]) a { font-size: 1.5rem;  font-weight: 400; line-height: 1.334; }
        :host([variant="h6"]) a { font-size: 1.25rem; font-weight: 500; letter-spacing: 0.15px; line-height: 1.6; }
        :host([variant="subtitle1"]) a { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.75; }
        :host([variant="subtitle2"]) a { font-size: 0.875rem; font-weight: 500; letter-spacing: 0.1px;  line-height: 1.57; }
        :host([variant="body1"]) a { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.5; }
        :host([variant="body2"]) a { font-size: 0.875rem; font-weight: 400; letter-spacing: 0.15px; line-height: 1.43; }
        :host([variant="caption"]) a { font-size: 0.75rem;  font-weight: 400; letter-spacing: 0.4px;  line-height: 1.66; }
        :host([variant="overline"]) a { font-size: 0.75rem;  font-weight: 400; letter-spacing: 1px;   line-height: 2.66; text-transform: uppercase; }

        /* Disabled */
        :host([disabled]) a {
            opacity: 0.38;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;
ye([
  s({ type: String })
], ee.prototype, "href", 2);
ye([
  s({ type: String })
], ee.prototype, "target", 2);
ye([
  s({ type: String })
], ee.prototype, "rel", 2);
ye([
  s({ type: String, reflect: !0 })
], ee.prototype, "color", 2);
ye([
  s({ type: String, reflect: !0 })
], ee.prototype, "underline", 2);
ye([
  s({ type: String, reflect: !0 })
], ee.prototype, "variant", 2);
ye([
  s({ type: Boolean, reflect: !0 })
], ee.prototype, "disabled", 2);
ye([
  s({ type: String })
], ee.prototype, "download", 2);
ye([
  s({ type: String })
], ee.prototype, "label", 2);
ee = ye([
  d("ui-link")
], ee);
var Qo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, Ye = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Zo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Qo(t, r, i), i;
};
let he = class extends c {
  constructor() {
    super(...arguments), this.variant = "body1", this.color = "textPrimary", this.align = "left", this.noWrap = !1, this.gutterBottom = !1, this.paragraph = !1;
  }
  _literalTag() {
    const e = this.component;
    return e ? {
      h1: C`h1`,
      h2: C`h2`,
      h3: C`h3`,
      h4: C`h4`,
      h5: C`h5`,
      h6: C`h6`,
      p: C`p`,
      span: C`span`,
      div: C`div`
    }[e] ?? C`p` : {
      h1: C`h1`,
      h2: C`h2`,
      h3: C`h3`,
      h4: C`h4`,
      h5: C`h5`,
      h6: C`h6`,
      subtitle1: C`h6`,
      subtitle2: C`h6`,
      body1: C`p`,
      body2: C`p`,
      caption: C`span`,
      overline: C`span`,
      inherit: C`p`
    }[this.variant] ?? C`p`;
  }
  render() {
    const e = this._literalTag(), t = `typography ${this.variant !== "inherit" ? this.variant : ""}`;
    return lr`<${e} class="${t}"><slot></slot></${e}>`;
  }
};
he.styles = p`
        :host {
            display: block;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            color: var(--ui-text-color, #111827);
        }

        .typography {
            margin: 0;
            padding: 0;
        }

        /* Variants */
        .h1 { font-size: 6rem;    font-weight: 300; letter-spacing: -1.5px; line-height: 1.167; }
        .h2 { font-size: 3.75rem; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2;   }
        .h3 { font-size: 3rem;    font-weight: 400; line-height: 1.167; }
        .h4 { font-size: 2.125rem; font-weight: 400; letter-spacing: 0.25px; line-height: 1.235; }
        .h5 { font-size: 1.5rem;  font-weight: 400; line-height: 1.334; }
        .h6 { font-size: 1.25rem; font-weight: 500; letter-spacing: 0.15px; line-height: 1.6;   }
        .subtitle1 { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.75; }
        .subtitle2 { font-size: 0.875rem; font-weight: 500; letter-spacing: 0.1px;  line-height: 1.57; }
        .body1 { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.5;  }
        .body2 { font-size: 0.875rem; font-weight: 400; letter-spacing: 0.15px; line-height: 1.43; }
        .caption  { font-size: 0.75rem; font-weight: 400; letter-spacing: 0.4px; line-height: 1.66; }
        .overline { font-size: 0.75rem; font-weight: 400; letter-spacing: 1px;   line-height: 2.66; text-transform: uppercase; }

        /* Colors */
        :host([color="primary"])       .typography { color: var(--ui-primary-color, #3b82f6); }
        :host([color="secondary"])     .typography { color: var(--ui-secondary-color, #7c3aed); }
        :host([color="success"])       .typography { color: var(--ui-success-color, #16a34a); }
        :host([color="error"])         .typography { color: var(--ui-error-color, #dc2626); }
        :host([color="warning"])       .typography { color: var(--ui-warning-color, #d97706); }
        :host([color="info"])          .typography { color: var(--ui-info-color, #0891b2); }
        :host([color="textPrimary"])   .typography { color: var(--ui-text-color, #111827); }
        :host([color="textSecondary"]) .typography { color: var(--ui-text-color-muted, #6b7280); }
        :host([color="inherit"])       .typography { color: inherit; }

        /* Alignment */
        :host([align="left"])    .typography { text-align: left; }
        :host([align="center"])  .typography { text-align: center; }
        :host([align="right"])   .typography { text-align: right; }
        :host([align="justify"]) .typography { text-align: justify; }

        /* No wrapping */
        :host([noWrap]) .typography {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Gutter bottom — matches MUI spacing */
        :host([gutterBottom]) .typography { margin-bottom: 0.35em; }

        /* Paragraph adds bottom margin */
        :host([paragraph]) .typography { margin-bottom: 16px; }
    `;
Ye([
  s({ type: String, reflect: !0 })
], he.prototype, "variant", 2);
Ye([
  s({ type: String, reflect: !0 })
], he.prototype, "color", 2);
Ye([
  s({ type: String })
], he.prototype, "component", 2);
Ye([
  s({ type: String, reflect: !0 })
], he.prototype, "align", 2);
Ye([
  s({ type: Boolean, reflect: !0 })
], he.prototype, "noWrap", 2);
Ye([
  s({ type: Boolean, reflect: !0 })
], he.prototype, "gutterBottom", 2);
Ye([
  s({ type: Boolean, reflect: !0 })
], he.prototype, "paragraph", 2);
he = Ye([
  d("ui-typography")
], he);
var es = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, F = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ts(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && es(t, r, i), i;
};
let ue = class extends c {
  constructor() {
    super(...arguments), this.selected = !1, this.disabled = !1, this.dense = !1, this.divider = !1, this._hasIcon = !1, this._hasEndIcon = !1;
  }
  _onIconSlotChange(e) {
    const t = e.target;
    this._hasIcon = t.assignedNodes({ flatten: !0 }).length > 0;
  }
  _onEndIconSlotChange(e) {
    const t = e.target;
    this._hasEndIcon = t.assignedNodes({ flatten: !0 }).length > 0;
  }
  _handleClick() {
    if (this.disabled) return;
    const e = this.textContent?.trim() ?? "";
    this.dispatchEvent(new CustomEvent("ui-menu-item-select", {
      bubbles: !0,
      composed: !0,
      detail: {
        // value prop takes priority; fall back to visible label text
        value: this.value ?? this.getAttribute("value") ?? e,
        label: e
      }
    }));
  }
  render() {
    return l`
            <div
                class="item"
                role="menuitem"
                aria-disabled=${this.disabled ? "true" : "false"}
                tabindex=${this.disabled ? -1 : 0}
                @click=${this._handleClick}
                @keydown=${(e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._handleClick());
    }}
            >
                <span class="icon-wrap" ?hidden=${!this._hasIcon}>
                    <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
                </span>
                <span class="label"><slot></slot></span>
                <span class="end-icon-wrap" ?hidden=${!this._hasEndIcon}>
                    <slot name="end-icon" @slotchange=${this._onEndIconSlotChange}></slot>
                </span>
            </div>
        `;
  }
};
ue.styles = p`
        :host {
            display: block;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
        }

        .item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            min-height: 40px;
            cursor: pointer;
            user-select: none;
            font-size: 0.9375rem;
            color: var(--ui-text-color, #111827);
            background: transparent;
            border: none;
            width: 100%;
            text-align: left;
            box-sizing: border-box;
            transition: background 0.12s;
            position: relative;
            outline: none;
            border-radius: 0;
        }

        .item:hover  { background: rgba(0,0,0,.04); }
        .item:active { background: rgba(0,0,0,.08); }
        .item:focus-visible { background: rgba(0,0,0,.06); outline: 2px solid var(--ui-primary-color, #3b82f6); outline-offset: -2px; }

        :host([selected]) .item {
            background: var(--ui-primary-color-light, rgba(59,130,246,.12));
            color: var(--ui-primary-color, #3b82f6);
            font-weight: 600;
        }
        :host([selected]) .item:hover {
            background: var(--ui-primary-color-light, rgba(59,130,246,.18));
        }

        :host([disabled]) .item {
            opacity: 0.38;
            cursor: not-allowed;
            pointer-events: none;
        }

        /* Ensure [hidden] removes the element from layout inside Shadow DOM.
           The browser's UA [hidden]{display:none} doesn't pierce shadow roots in all
           environments, so we declare it explicitly here. */
        [hidden] { display: none !important; }

        .icon-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            color: var(--ui-text-color-muted, #6b7280);
        }
        :host([selected]) .icon-wrap { color: var(--ui-primary-color, #3b82f6); }


        .end-icon-wrap {
            display: flex;
            align-items: center;
            margin-left: auto;
            padding-left: 16px;
            color: var(--ui-text-color-muted, #6b7280);
            font-size: 0.75rem;
        }

        .label { flex: 1; line-height: 1.5; }

        /* Dense (desktop) */
        :host([dense]) .item { padding: 4px 16px; min-height: 32px; font-size: 0.875rem; }

        /* Divider below item */
        :host([divider]) {
            border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
            padding-bottom: 4px;
            margin-bottom: 4px;
        }
    `;
F([
  s({ type: Boolean, reflect: !0 })
], ue.prototype, "selected", 2);
F([
  s({ type: Boolean, reflect: !0 })
], ue.prototype, "disabled", 2);
F([
  s({ type: Boolean, reflect: !0 })
], ue.prototype, "dense", 2);
F([
  s({ type: Boolean, reflect: !0 })
], ue.prototype, "divider", 2);
F([
  s({ type: String, reflect: !0 })
], ue.prototype, "value", 2);
F([
  g()
], ue.prototype, "_hasIcon", 2);
F([
  g()
], ue.prototype, "_hasEndIcon", 2);
ue = F([
  d("ui-menu-item")
], ue);
let Ki = class extends c {
  render() {
    return l``;
  }
};
Ki.styles = p`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
    `;
Ki = F([
  d("ui-menu-divider")
], Ki);
let Qe = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.placement = "bottom-start", this.closeOnSelect = !0, this.scrollable = !1, this._boundKeyDown = (e) => {
      this.open && e.key === "Escape" && (e.stopPropagation(), this._close());
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._boundKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._boundKeyDown);
  }
  // ── Event dispatch ─────────────────────────────────────────────────────
  _close() {
    this.dispatchEvent(new CustomEvent("ui-menu-close", { bubbles: !0, composed: !0 }));
  }
  _handleItemSelect() {
    this.closeOnSelect && this._close();
  }
  // ── Render ─────────────────────────────────────────────────────────────
  render() {
    const e = u({
      "menu-paper": !0,
      open: this.open,
      [`pos-${this.placement}`]: !!this.placement,
      scrollable: this.scrollable
    }), t = u({ backdrop: !0, open: this.open });
    return l`
            <div class=${t} @click=${this._close} aria-hidden="true"></div>
            <div
                class=${e}
                role="menu"
                aria-hidden=${this.open ? "false" : "true"}
                @ui-menu-item-select=${this._handleItemSelect}
            >
                <slot></slot>
            </div>
        `;
  }
};
Qe.styles = p`
        :host {
            display: block;
            position: relative;
            --ui-menu-z-index: 1300;
            --ui-menu-min-width: 120px;
        }

        /* Invisible full-screen click-away layer */
        .backdrop {
            display: none;
            position: fixed;
            inset: 0;
            z-index: calc(var(--ui-menu-z-index) - 1);
        }
        .backdrop.open { display: block; }

        /* Menu surface */
        .menu-paper {
            position: absolute;
            background: var(--ui-surface-background, #fff);
            border-radius: var(--ui-border-radius-md, 8px);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 10px 15px -3px rgba(0,0,0,.1);
            min-width: var(--ui-menu-min-width);
            z-index: var(--ui-menu-z-index);
            overflow: hidden;
            transform-origin: top left;

            /* Closed state */
            transform: scale(0.85);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: transform 0.15s cubic-bezier(0.4,0,0.2,1),
                        opacity   0.15s cubic-bezier(0.4,0,0.2,1),
                        visibility 0.15s;
            padding: 4px 0;
        }

        /* Open state */
        .menu-paper.open {
            transform: scale(1);
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        /* Placement variants */
        .pos-bottom-start { top: 100%; left: 0;      transform-origin: top left;    }
        .pos-bottom-end   { top: 100%; right: 0;     transform-origin: top right;   }
        .pos-top-start    { bottom: 100%; left: 0;   transform-origin: bottom left; }
        .pos-top-end      { bottom: 100%; right: 0;  transform-origin: bottom right;}
        .pos-right-start  { left: 100%; top: 0;      transform-origin: top left;    }
        .pos-left-start   { right: 100%; top: 0;     transform-origin: top right;   }

        /* Scrollable list */
        .menu-paper.scrollable {
            max-height: var(--ui-menu-max-height, 300px);
            overflow-y: auto;
        }
    `;
F([
  s({ type: Boolean, reflect: !0 })
], Qe.prototype, "open", 2);
F([
  s({ type: String, reflect: !0 })
], Qe.prototype, "placement", 2);
F([
  s({ type: Boolean, attribute: "close-on-select" })
], Qe.prototype, "closeOnSelect", 2);
F([
  s({ type: Boolean })
], Qe.prototype, "scrollable", 2);
Qe = F([
  d("ui-menu")
], Qe);
var is = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, A = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? rs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && is(t, r, i), i;
};
const os = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`, ss = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`, as = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`, ns = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`, ls = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
function Ii(e, t) {
  return Array.from({ length: t - e + 1 }, (r, o) => e + o);
}
function cs(e, t, r, o) {
  const i = Ii(1, Math.min(o, e)), a = Ii(Math.max(e - o + 1, o + 1), e), n = Math.max(
    Math.min(t - r, e - o - r * 2 - 1),
    o + 2
  ), h = Math.min(
    Math.max(t + r, o + r * 2 + 2),
    a.length > 0 ? a[0] - 2 : e - 1
  ), v = [
    ...i,
    ...n > o + 2 ? ["start-ellipsis"] : o + 1 < e - o ? [o + 1] : [],
    ...Ii(n, h),
    ...h < e - o - 1 ? ["end-ellipsis"] : e - o > o ? [e - o] : [],
    ...a
  ], m = /* @__PURE__ */ new Set();
  return v.filter((b) => {
    const $ = String(b);
    return m.has($) ? !1 : (m.add($), !0);
  });
}
let O = class extends c {
  constructor() {
    super(...arguments), this.count = 1, this.page = 1, this.variant = "text", this.shape = "circular", this.size = "medium", this.color = "primary", this.showFirstButton = !1, this.showLastButton = !1, this.hidePrevButton = !1, this.hideNextButton = !1, this.siblingCount = 1, this.boundaryCount = 1, this.disabled = !1, this.prevIcon = "", this.nextIcon = "", this.firstIcon = "", this.lastIcon = "";
  }
  _emit(e) {
    this.dispatchEvent(new CustomEvent("ui-pagination-change", {
      detail: { page: e },
      bubbles: !0,
      composed: !0
    }));
  }
  _go(e) {
    e < 1 || e > this.count || e === this.page || this._emit(e);
  }
  _renderNavBtn(e, t, r, o, i) {
    return i ? x : l`
            <button
                class="page-btn nav"
                aria-label=${e}
                ?disabled=${o || this.disabled}
                @click=${r}
            >${t}</button>
        `;
  }
  render() {
    const e = cs(this.count, this.page, this.siblingCount, this.boundaryCount), t = this.prevIcon ? l`<span .innerHTML=${this.prevIcon}></span>` : as, r = this.nextIcon ? l`<span .innerHTML=${this.nextIcon}></span>` : ns, o = this.firstIcon ? l`<span .innerHTML=${this.firstIcon}></span>` : os, i = this.lastIcon ? l`<span .innerHTML=${this.lastIcon}></span>` : ss;
    return l`
            ${this._renderNavBtn("Go to first page", o, () => this._go(1), this.page === 1, !this.showFirstButton)}
            ${this._renderNavBtn("Go to previous page", t, () => this._go(this.page - 1), this.page === 1, this.hidePrevButton)}

            ${e.map((a) => {
      if (a === "start-ellipsis" || a === "end-ellipsis")
        return l`<button class="page-btn ellipsis" tabindex="-1" aria-hidden="true">${ls}</button>`;
      const n = a === this.page;
      return l`
                    <button
                        class=${u({ "page-btn": !0, active: n })}
                        aria-label=${"Page " + a}
                        aria-current=${n ? "page" : x}
                        ?disabled=${this.disabled}
                        @click=${() => this._go(a)}
                    >${a}</button>
                `;
    })}

            ${this._renderNavBtn("Go to next page", r, () => this._go(this.page + 1), this.page === this.count, this.hideNextButton)}
            ${this._renderNavBtn("Go to last page", i, () => this._go(this.count), this.page === this.count, !this.showLastButton)}
        `;
  }
};
O.styles = p`
        :host {
            display: inline-flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 4px;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
        }

        /* ── Base button ── */
        .page-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 36px;
            height: 36px;
            padding: 0 6px;
            border-radius: 4px;
            border: none;
            background: transparent;
            color: var(--ui-text-color, #111827);
            font-family: inherit;
            font-size: 0.875rem;
            font-weight: 400;
            cursor: pointer;
            transition: background 0.15s, color 0.15s, border-color 0.15s;
            user-select: none;
            box-sizing: border-box;
            outline: none;
            text-decoration: none;
        }
        .page-btn:hover:not(:disabled) {
            background: rgba(0,0,0,.06);
        }
        .page-btn:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 2px;
        }
        .page-btn.active {
            background: var(--ui-primary-color, #3b82f6);
            color: #fff;
            font-weight: 600;
        }
        .page-btn:disabled {
            opacity: 0.38;
            cursor: default;
            pointer-events: none;
        }
        .page-btn.ellipsis {
            cursor: default;
            pointer-events: none;
            color: var(--ui-text-color-muted, #6b7280);
        }

        /* ── Variants ── */
        :host([variant="outlined"]) .page-btn {
            border: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="outlined"]) .page-btn.active {
            border-color: var(--ui-primary-color, #3b82f6);
            background: var(--ui-primary-color, #3b82f6);
            color: #fff;
        }
        :host([variant="outlined"]) .page-btn:hover:not(:disabled):not(.active) {
            background: rgba(59,130,246,.06);
            border-color: var(--ui-primary-color, #3b82f6);
        }

        /* ── Color: secondary ── */
        :host([color="secondary"]) .page-btn.active {
            background: var(--ui-secondary-color, #7c3aed);
        }
        :host([color="secondary"][variant="outlined"]) .page-btn.active {
            background: var(--ui-secondary-color, #7c3aed);
            border-color: var(--ui-secondary-color, #7c3aed);
        }
        :host([color="standard"]) .page-btn.active {
            background: var(--ui-text-color, #111827);
            color: #fff;
        }

        /* ── Shape ── */
        :host([shape="rounded"]) .page-btn  { border-radius: 8px; }
        :host([shape="circular"]) .page-btn { border-radius: 50%; min-width: 36px; aspect-ratio: 1; }

        /* ── Size ── */
        :host([size="small"]) .page-btn    { min-width: 28px; height: 28px; font-size: 0.8125rem; }
        :host([size="small"]) :host([shape="circular"]) .page-btn { min-width: 28px; }
        :host([size="large"]) .page-btn    { min-width: 44px; height: 44px; font-size: 0.9375rem; }

        /* ── Disabled host ── */
        :host([disabled]) .page-btn {
            opacity: 0.38;
            pointer-events: none;
        }

        /* ── Nav icon size ── */
        svg { display: block; }
    `;
A([
  s({ type: Number })
], O.prototype, "count", 2);
A([
  s({ type: Number })
], O.prototype, "page", 2);
A([
  s({ type: String, reflect: !0 })
], O.prototype, "variant", 2);
A([
  s({ type: String, reflect: !0 })
], O.prototype, "shape", 2);
A([
  s({ type: String, reflect: !0 })
], O.prototype, "size", 2);
A([
  s({ type: String, reflect: !0 })
], O.prototype, "color", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "show-first-button" })
], O.prototype, "showFirstButton", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "show-last-button" })
], O.prototype, "showLastButton", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "hide-prev-button" })
], O.prototype, "hidePrevButton", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "hide-next-button" })
], O.prototype, "hideNextButton", 2);
A([
  s({ type: Number, attribute: "sibling-count" })
], O.prototype, "siblingCount", 2);
A([
  s({ type: Number, attribute: "boundary-count" })
], O.prototype, "boundaryCount", 2);
A([
  s({ type: Boolean, reflect: !0 })
], O.prototype, "disabled", 2);
A([
  s({ type: String, attribute: "prev-icon" })
], O.prototype, "prevIcon", 2);
A([
  s({ type: String, attribute: "next-icon" })
], O.prototype, "nextIcon", 2);
A([
  s({ type: String, attribute: "first-icon" })
], O.prototype, "firstIcon", 2);
A([
  s({ type: String, attribute: "last-icon" })
], O.prototype, "lastIcon", 2);
O = A([
  d("ui-pagination")
], O);
var ds = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, Y = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ps(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ds(t, r, i), i;
};
let Me = class extends c {
  constructor() {
    super(...arguments), this.tooltipTitle = "", this.tooltipOpen = !1, this.tooltipPlacement = "left", this.disabled = !1, this._hovered = !1;
  }
  _handleClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-speed-dial-action-click", {
      bubbles: !0,
      composed: !0,
      detail: { tooltipTitle: this.tooltipTitle }
    }));
  }
  get _tooltipVisible() {
    return this.tooltipOpen || this._hovered;
  }
  render() {
    return l`
            <button
                class="action-btn"
                role="menuitem"
                aria-label=${this.tooltipTitle}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
                @mouseenter=${() => {
      this._hovered = !0;
    }}
                @mouseleave=${() => {
      this._hovered = !1;
    }}
                @focus=${() => {
      this._hovered = !0;
    }}
                @blur=${() => {
      this._hovered = !1;
    }}
            >
                <slot></slot>
            </button>
            ${this.tooltipTitle ? l`
                <div class="tooltip ${u({ visible: this._tooltipVisible })}">
                    ${this.tooltipTitle}
                </div>
            ` : x}
        `;
  }
};
Me.styles = p`
        :host {
            display: flex;
            align-items: center;
            position: relative;
            --action-size: 40px;
        }

        /* ── Mini FAB ── */
        .action-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--action-size);
            height: var(--action-size);
            border-radius: 50%;
            background: var(--ui-surface-background, #fff);
            color: var(--ui-text-color, #374151);
            border: none;
            cursor: pointer;
            box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14);
            transition: background 0.15s, box-shadow 0.15s, transform 0.15s;
            flex-shrink: 0;
            outline: none;
            font-size: 1.25rem;
        }
        .action-btn:hover {
            background: var(--ui-surface-background-flat, #f3f4f6);
            box-shadow: 0 5px 8px -1px rgba(0,0,0,.25), 0 8px 12px 0 rgba(0,0,0,.16);
            transform: scale(1.08);
        }
        .action-btn:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 3px;
        }
        :host([disabled]) .action-btn {
            opacity: 0.38;
            pointer-events: none;
        }

        /* ── Tooltip ── */
        .tooltip {
            position: absolute;
            background: rgba(30,41,59,.88);
            color: #fff;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: .02em;
            padding: 4px 10px;
            border-radius: 5px;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.15s;
        }
        .tooltip.visible { opacity: 1; }

        :host([tooltip-placement="left"]) .tooltip {
            right: calc(100% + 10px);
            top: 50%;
            transform: translateY(-50%);
        }
        :host([tooltip-placement="right"]) .tooltip {
            left: calc(100% + 10px);
            top: 50%;
            transform: translateY(-50%);
        }
        :host([tooltip-placement="top"]) .tooltip {
            bottom: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%);
        }
        :host([tooltip-placement="bottom"]) .tooltip {
            top: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%);
        }
    `;
Y([
  s({ type: String, attribute: "tooltip-title" })
], Me.prototype, "tooltipTitle", 2);
Y([
  s({ type: Boolean, attribute: "tooltip-open" })
], Me.prototype, "tooltipOpen", 2);
Y([
  s({ type: String, reflect: !0, attribute: "tooltip-placement" })
], Me.prototype, "tooltipPlacement", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], Me.prototype, "disabled", 2);
Y([
  g()
], Me.prototype, "_hovered", 2);
Me = Y([
  d("ui-speed-dial-action")
], Me);
let fe = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.direction = "up", this.hidden = !1, this.persistentTooltips = !1, this.closeIcon = "", this.ariaLabel = "Speed dial", this.isTouch = !1, this._onHostKeyDown = (e) => {
      const { key: t } = e, r = this.shadowRoot?.activeElement?.classList.contains("fab") ?? !1, o = this._focusedActionIndex(), i = o !== -1;
      if (t === "Escape") {
        this.open && (e.preventDefault(), e.stopPropagation(), this._setOpen(!1), this._focusFab());
        return;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t)) {
        if (e.preventDefault(), !this.open) {
          const n = t === "ArrowDown" || t === "ArrowRight";
          this._setOpen(!0), this.updateComplete.then(() => {
            const h = this._actionButtons();
            h[n ? 0 : h.length - 1]?.focus();
          });
          return;
        }
        if (i) {
          const n = t === "ArrowUp" || t === "ArrowLeft";
          this._focusActionAt(n ? o - 1 : o + 1);
        } else if (r) {
          const n = this._actionButtons();
          n[t === "ArrowDown" || t === "ArrowRight" ? 0 : n.length - 1]?.focus();
        }
      }
    };
  }
  /* ── Lifecycle ───────────────────────────────────────────────── */
  connectedCallback() {
    super.connectedCallback(), !this.hasAttribute("is-touch") && typeof window.matchMedia == "function" && (this.isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches), this.addEventListener("keydown", this._onHostKeyDown);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onHostKeyDown), super.disconnectedCallback();
  }
  /* ── Private helpers ─────────────────────────────────────────── */
  /** All enabled action buttons (shadow DOM buttons inside slotted actions). */
  _actionButtons() {
    return Array.from(this.querySelectorAll("ui-speed-dial-action")).filter((e) => !e.hasAttribute("disabled")).map((e) => e.shadowRoot?.querySelector(".action-btn")).filter((e) => !!e);
  }
  /** Index of the currently focused action button, or -1. */
  _focusedActionIndex() {
    return Array.from(this.querySelectorAll("ui-speed-dial-action")).findIndex(
      (t) => t.shadowRoot?.activeElement?.classList.contains("action-btn")
    );
  }
  /** Move focus to the action at `idx`, clamped to valid range. */
  _focusActionAt(e) {
    const t = this._actionButtons();
    t.length && t[Math.max(0, Math.min(e, t.length - 1))]?.focus();
  }
  /** Move focus back to the FAB. */
  _focusFab() {
    this.shadowRoot?.querySelector(".fab")?.focus();
  }
  _setOpen(e) {
    this.open = e, this._updateActionTooltips(), this.dispatchEvent(new CustomEvent(
      e ? "ui-speed-dial-open" : "ui-speed-dial-close",
      { bubbles: !0, composed: !0 }
    ));
  }
  _toggle() {
    this._setOpen(!this.open);
  }
  /* ── FAB handlers ────────────────────────────────────────────── */
  /** Opening the dial on FAB keyboard focus (not mouse focus to avoid noise). */
  _onFabFocus(e) {
    e.relatedTarget !== null && !this.open && this._setOpen(!0);
  }
  /* ── Action click → close ────────────────────────────────────── */
  _onActionClick() {
    this._setOpen(!1), this._focusFab();
  }
  /* ── Tooltip helpers ─────────────────────────────────────────── */
  _updateActionTooltips() {
    const e = this.querySelectorAll("ui-speed-dial-action"), t = this.persistentTooltips || this.isTouch, r = this._tooltipPlacement();
    e.forEach((o, i) => {
      o.setAttribute("tooltip-placement", r), t && this.open ? o.setAttribute("tooltip-open", "") : o.removeAttribute("tooltip-open"), o.style.transitionDelay = this.open ? `${i * 40}ms` : `${(e.length - 1 - i) * 30}ms`;
    });
  }
  _tooltipPlacement() {
    switch (this.direction) {
      case "up":
        return "left";
      case "down":
        return "left";
      case "left":
        return "top";
      case "right":
        return "top";
      default:
        return "left";
    }
  }
  updated(e) {
    (e.has("open") || e.has("direction") || e.has("persistentTooltips") || e.has("isTouch")) && this._updateActionTooltips();
  }
  _onOpenIconSlotChange() {
  }
  /* ── Render ──────────────────────────────────────────────────── */
  render() {
    return l`
            <!-- Click-away backdrop -->
            <div class="backdrop" @click=${() => this._setOpen(!1)}></div>

            <!-- Actions — action-click events bubble up here -->
            <div
                class="actions"
                role="menu"
                aria-label="Speed dial actions"
            >
                <slot
                    @slotchange=${() => this._updateActionTooltips()}
                    @ui-speed-dial-action-click=${this._onActionClick}
                ></slot>
            </div>

            <!-- Main FAB -->
            <button
                class="fab"
                aria-label=${this.ariaLabel}
                aria-expanded=${this.open}
                aria-haspopup="true"
                @click=${this._toggle}
                @focus=${this._onFabFocus}
            >
                <!-- + icon: visible when closed -->
                <span class="fab-icon open-icon">
                    <slot name="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </slot>
                </span>

                <!-- ✕ icon: visible when open -->
                <span class="fab-icon close-icon">
                    <slot name="open-icon" @slotchange=${this._onOpenIconSlotChange}>
                        ${this.closeIcon ? l`<span style="line-height:1;font-size:1.5rem;">${this.closeIcon}</span>` : l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`}
                    </slot>
                </span>
            </button>
        `;
  }
};
fe.styles = p`
        :host {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            --fab-size: 56px;
            --fab-bg: var(--ui-primary-color, #3b82f6);
            --fab-color: #fff;
            --action-gap: 12px;
        }

        /* ── Actions list ── */
        .actions {
            display: flex;
            align-items: center;
            gap: var(--action-gap);
        }

        /* Direction layout */
        :host([direction="up"])    .actions { flex-direction: column-reverse; margin-bottom: var(--action-gap); }
        :host([direction="down"])  .actions { flex-direction: column;         margin-top:    var(--action-gap); }
        :host([direction="left"])  .actions { flex-direction: row-reverse;    margin-right:  var(--action-gap); }
        :host([direction="right"]) .actions { flex-direction: row;            margin-left:   var(--action-gap); }

        /* Container direction */
        :host([direction="up"]),
        :host([direction="down"]) { flex-direction: column; align-items: center; }
        :host([direction="left"]),
        :host([direction="right"]) { flex-direction: row; align-items: center; }
        :host([direction="up"]) { flex-direction: column-reverse; }

        /* ── Main FAB ── */
        .fab {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--fab-size);
            height: var(--fab-size);
            border-radius: 50%;
            background: var(--fab-bg);
            color: var(--fab-color);
            border: none;
            cursor: pointer;
            box-shadow: 0 6px 10px -2px rgba(0,0,0,.25), 0 4px 5px 0 rgba(0,0,0,.14);
            outline: none;
            font-size: 1.5rem;
            transition: box-shadow 0.2s, background 0.2s;
            flex-shrink: 0;
            position: relative;
            z-index: 1;
        }
        .fab:hover {
            box-shadow: 0 8px 14px -2px rgba(0,0,0,.3), 0 6px 8px 0 rgba(0,0,0,.16);
            background: var(--fab-bg-hover, var(--ui-primary-color-dark, #2563eb));
        }
        .fab:focus-visible {
            outline: 3px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 3px;
        }

        /* ── Icon crossfade ── */
        .fab-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s;
        }
        .fab-icon.close-icon {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: rotate(-45deg);
        }
        :host([open]) .fab-icon.open-icon  { opacity: 0; transform: rotate(45deg); }
        :host([open]) .fab-icon.close-icon { opacity: 1; transform: rotate(0deg); }

        /* ── Action entrance animation ── */
        ::slotted(ui-speed-dial-action) {
            opacity: 0;
            transform: scale(0.6);
            transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.4,0,0.2,1);
            pointer-events: none;
        }
        :host([open]) ::slotted(ui-speed-dial-action) {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
        }

        /* ── Backdrop ── */
        .backdrop {
            display: none;
            position: fixed;
            inset: 0;
            z-index: -1;
        }
        :host([open]) .backdrop { display: block; }

        /* ── Hidden ── */
        :host([hidden]) { display: none !important; }

        svg { display: block; }
    `;
Y([
  s({ type: Boolean, reflect: !0 })
], fe.prototype, "open", 2);
Y([
  s({ type: String, reflect: !0 })
], fe.prototype, "direction", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], fe.prototype, "hidden", 2);
Y([
  s({ type: Boolean, attribute: "persistent-tooltips" })
], fe.prototype, "persistentTooltips", 2);
Y([
  s({ type: String, attribute: "close-icon" })
], fe.prototype, "closeIcon", 2);
Y([
  s({ type: String, attribute: "aria-label" })
], fe.prototype, "ariaLabel", 2);
Y([
  s({ type: Boolean, attribute: "is-touch" })
], fe.prototype, "isTouch", 2);
fe = Y([
  d("ui-speed-dial")
], fe);
var hs = Object.defineProperty, us = Object.getOwnPropertyDescriptor, w = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? us(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && hs(t, r, i), i;
};
const fs = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`, bs = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
let qt = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.completed = !1;
  }
  render() {
    return l`<div class="line ${u({ completed: this.completed })}"></div>`;
  }
};
qt.styles = p`
        :host { display: block; }
        .line {
            background: var(--connector-color, #e5e7eb);
            border-radius: 2px;
            transition: background 0.3s;
        }
        .line.completed { background: var(--ui-primary-color, #3b82f6); }
        :host([orientation="horizontal"]) .line { height: 2px; width: 100%; }
        :host([orientation="vertical"])   .line { width: 2px; min-height: 24px; margin: 0 auto; }
    `;
w([
  s({ reflect: !0 })
], qt.prototype, "orientation", 2);
w([
  s({ type: Boolean })
], qt.prototype, "completed", 2);
qt = w([
  d("ui-step-connector")
], qt);
let kt = class extends c {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.error = !1;
  }
  render() {
    return l`
        <div class="label"><slot></slot></div>
        <div class="optional"><slot name="optional"></slot></div>
    `;
  }
};
kt.styles = p`
        :host { display: block; }
        .label { font-size: .875rem; font-weight: 500; color: var(--ui-text-color, #111827); font-family: var(--ui-font-family,'Inter',sans-serif); line-height: 1.4; }
        .optional { font-size: .75rem; color: #9ca3af; font-style: italic; }
        :host([active])   .label { color: var(--ui-primary-color, #3b82f6); font-weight: 600; }
        :host([disabled]) .label { color: #9ca3af; }
        :host([error])    .label { color: var(--ui-error-color, #ef4444); }
    `;
w([
  s({ type: Boolean, reflect: !0 })
], kt.prototype, "active", 2);
w([
  s({ type: Boolean, reflect: !0 })
], kt.prototype, "disabled", 2);
w([
  s({ type: Boolean, reflect: !0 })
], kt.prototype, "error", 2);
kt = w([
  d("ui-step-label")
], kt);
let Wi = class extends c {
  render() {
    return l`<div class="content"><slot></slot></div>`;
  }
};
Wi.styles = p`
        :host { display: block; overflow: hidden; }
        .content {
            padding: 8px 16px 16px;
            font-size: .875rem;
            color: var(--ui-text-color, #374151);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
    `;
Wi = w([
  d("ui-step-content")
], Wi);
let V = class extends c {
  constructor() {
    super(...arguments), this.active = !1, this.completed = !1, this.disabled = !1, this.optional = !1, this.error = !1, this.last = !1, this.clickable = !1, this.orientation = "horizontal", this.alternativeLabel = !1, this.stepIndex = 0, this.optionalLabel = "Optional";
  }
  _fire() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-step-click", { detail: { index: this.stepIndex }, bubbles: !0, composed: !0 }));
  }
  _icon() {
    const e = { "icon-circle": !0, active: this.active, completed: this.completed, error: this.error }, t = this.error ? bs : this.completed ? fs : l`<slot name="icon">${this.stepIndex + 1}</slot>`;
    return l`<div class=${u(e)}>${t}</div>`;
  }
  _label() {
    return l`
            <ui-step-label ?active=${this.active} ?disabled=${this.disabled} ?error=${this.error}>
                <slot name="label"></slot>
                ${this.optional ? l`<span slot="optional">${this.optionalLabel}</span>` : x}
            </ui-step-label>`;
  }
  _connector(e = !1) {
    return l`<ui-step-connector orientation=${this.orientation} ?completed=${e}></ui-step-connector>`;
  }
  render() {
    const e = this.stepIndex > 0, t = this.completed || !this.active && this.stepIndex > 0 && !this.disabled;
    if (this.orientation === "vertical") {
      const o = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : "false"}>${this._icon()} ${this._label()}</button>` : l`<div class="step-header">${this._icon()} ${this._label()}</div>`;
      return l`
                ${o}
                <div class="v-body">
                    <div class="v-line ${u({ completed: this.completed })}"></div>
                    <div class="v-content"><slot></slot></div>
                </div>`;
    }
    if (this.alternativeLabel) {
      const o = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : "false"}>${this._icon()}</button>` : this._icon();
      return l`
                <div class="alt-top">
                    ${e ? l`<div class="conn-fill">${this._connector(t)}</div>` : x}
                    ${o}
                    ${this.last ? x : l`<div class="conn-fill"></div>`}
                </div>
                <div class="alt-label-row">${this._label()}</div>`;
    }
    const r = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : "false"}>${this._icon()} ${this._label()}</button>` : l`<div class="step-header">${this._icon()} ${this._label()}</div>`;
    return l`
            ${e ? l`<div class="conn-wrap">${this._connector(t)}</div>` : x}
            ${r}`;
  }
};
V.styles = p`
        :host {
            display: flex;
            /*
             * flex: 1 1 0  ← key for equal columns:
             * '0' flex-basis means the available space is divided equally,
             * ignoring each step's content size.  Combined with min-width:0
             * this prevents longer labels from widening their column.
             */
            flex: 1 1 0;
            min-width: 0;
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }

        /* ── Horizontal ── */
        :host([orientation="horizontal"]) { align-items: flex-start; padding-top: 4px; }

        /* ── Vertical ── */
        :host([orientation="vertical"]) {
            flex-direction: column;
            flex: none;
            width: 100%;
        }

        /* ── Alternative label (horizontal) ── */
        :host([alternative-label]) {
            flex-direction: column;
            align-items: center;
            flex: 1;
            min-width: 0;
        }

        /* connector wrapper — fills the gap between steps */
        .conn-wrap {
            flex: 1 1 auto;
            min-width: 12px;
            display: flex;
            /*
             * flex-start so the connector stays anchored to the top
             * regardless of how tall a multi-line label makes the row.
             * padding-top places the 2px line exactly at the icon's center:
             *   host padding-top (4px) + half icon (16px) - 1px (half line) = 15px
             */
            align-items: flex-start;
            padding-top: 15px;
        }
        .conn-wrap ui-step-connector { flex: 1; }

        /* alt-label top row */
        .alt-top { display: flex; align-items: center; width: 100%; }
        .alt-top .conn-fill { flex: 1; display: flex; align-items: center; }
        .alt-top .conn-fill ui-step-connector { flex: 1; }

        /* ── Step header: icon + label ── */
        .step-header {
            display: flex;
            align-items: flex-start;   /* icon aligns to first line of label */
            gap: 14px;
            min-width: 0;              /* allow label to wrap instead of overflow */
        }
        /* Optically nudge label down so its baseline sits at the icon's centre */
        .step-header ui-step-label,
        .step-btn    ui-step-label {
            padding-top: 5px;          /* (32px icon − ~22px text) / 2 ≈ 5px */
            min-width: 0;
        }

        :host([alternative-label]) .alt-label-row {
            margin-top: 8px;
            text-align: center;
            min-width: 0;
            width: 100%;
        }

        /* clickable button mode */
        .step-btn {
            background: none; border: none; padding: 0; cursor: pointer;
            font-family: inherit; border-radius: 6px; outline: none;
            display: flex; align-items: flex-start; gap: 14px;
            min-width: 0;
            text-align: left;
        }
        .step-btn:focus-visible { outline: 2px solid var(--ui-primary-color, #3b82f6); outline-offset: 3px; }
        :host([disabled]) .step-btn { cursor: default; }
        :host([alternative-label]) .step-btn { flex-direction: column; align-items: center; gap: 0; }

        /* ── Vertical body ── */
        .v-body {
            display: flex;
            margin-left: 15px;
            min-height: 16px;
        }
        .v-line {
            width: 2px;
            background: var(--ui-border-color, #e5e7eb);
            border-radius: 2px;
            flex-shrink: 0;
            transition: background 0.3s;
            margin-right: 14px;
        }
        .v-line.completed { background: var(--ui-primary-color, #3b82f6); }
        :host([last]) .v-line { background: transparent; }
        .v-content { flex: 1; padding-bottom: 8px; min-width: 0; }

        /* ── Step icon circle ── */
        .icon-circle {
            width: 32px; height: 32px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: .8125rem; font-weight: 700;
            border: 2px solid #d1d5db;
            color: #9ca3af;
            background: transparent;
            transition: all .2s;
            /* Never shrink — it's a fixed-size indicator */
            flex-shrink: 0;
            box-sizing: border-box;
        }
        .icon-circle.active   { background: var(--ui-primary-color,#3b82f6); border-color: var(--ui-primary-color,#3b82f6); color:#fff; box-shadow:0 0 0 4px rgba(59,130,246,.15); }
        .icon-circle.completed{ background: var(--ui-primary-color,#3b82f6); border-color: var(--ui-primary-color,#3b82f6); color:#fff; }
        .icon-circle.error    { border-color: var(--ui-error-color,#ef4444); color: var(--ui-error-color,#ef4444); }
        :host([disabled]) .icon-circle { opacity: .4; }
    `;
w([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "active", 2);
w([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "completed", 2);
w([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "disabled", 2);
w([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "optional", 2);
w([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "error", 2);
w([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "last", 2);
w([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "clickable", 2);
w([
  s({ type: String, reflect: !0 })
], V.prototype, "orientation", 2);
w([
  s({ type: Boolean, reflect: !0, attribute: "alternative-label" })
], V.prototype, "alternativeLabel", 2);
w([
  s({ type: Number, attribute: "step-index" })
], V.prototype, "stepIndex", 2);
w([
  s({ type: String, attribute: "optional-label" })
], V.prototype, "optionalLabel", 2);
V = w([
  d("ui-step")
], V);
let Ze = class extends c {
  constructor() {
    super(...arguments), this.activeStep = 0, this.orientation = "horizontal", this.alternativeLabel = !1, this.nonLinear = !1, this._onStepClick = (e) => {
      this.activeStep = e.detail.index, this.dispatchEvent(new CustomEvent("ui-step-change", { detail: { step: e.detail.index }, bubbles: !0, composed: !0 })), this._syncSteps();
    };
  }
  _syncSteps() {
    const e = Array.from(this.querySelectorAll(":scope > ui-step"));
    e.forEach((t, r) => {
      t.stepIndex = r, t.last = r === e.length - 1, t.orientation = this.orientation, t.alternativeLabel = this.alternativeLabel, t.active = r === this.activeStep, this.nonLinear ? (t.disabled = !1, t.clickable = !0) : (t.completed || (t.disabled = r > this.activeStep), t.clickable = !1);
    });
  }
  updated(e) {
    (e.has("activeStep") || e.has("orientation") || e.has("alternativeLabel") || e.has("nonLinear")) && this._syncSteps();
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("ui-step-click", this._onStepClick);
  }
  disconnectedCallback() {
    this.removeEventListener("ui-step-click", this._onStepClick), super.disconnectedCallback();
  }
  render() {
    const e = `stepper ${this.orientation}${this.alternativeLabel ? " alt" : ""}`;
    return l`
            <div class=${e}>
                <slot @slotchange=${() => {
      this._syncSteps(), this.requestUpdate();
    }}></slot>
            </div>`;
  }
};
Ze.styles = p`
        :host { display: block; font-family: var(--ui-font-family,'Inter',sans-serif); }
        .stepper {
            display: flex;
            padding: 16px 24px;
            background: var(--ui-surface-background, #fff);
        }
        /* Horizontal: align-items:stretch lets each step be as tall as the tallest */
        .stepper.horizontal { align-items: stretch; flex-direction: row; }
        .stepper.vertical   { flex-direction: column; gap: 0; }
        /* alt-label: icons sit at the same height across all steps */
        .stepper.alt { align-items: flex-start; }

        /* Expose primary color to steps */
        ::slotted(ui-step) { /* overridden in child */ }
    `;
w([
  s({ type: Number, attribute: "active-step" })
], Ze.prototype, "activeStep", 2);
w([
  s({ type: String, reflect: !0 })
], Ze.prototype, "orientation", 2);
w([
  s({ type: Boolean, attribute: "alternative-label" })
], Ze.prototype, "alternativeLabel", 2);
w([
  s({ type: Boolean, attribute: "non-linear" })
], Ze.prototype, "nonLinear", 2);
Ze = w([
  d("ui-stepper")
], Ze);
let et = class extends c {
  constructor() {
    super(...arguments), this.steps = 0, this.activeStep = 0, this.variant = "dots", this.position = "static";
  }
  _emit(e) {
    this.dispatchEvent(new CustomEvent(e, { bubbles: !0, composed: !0 }));
  }
  _progress() {
    if (this.variant === "text")
      return l`<span class="text">Step ${this.activeStep + 1} of ${this.steps}</span>`;
    if (this.variant === "dots")
      return l`<div class="dots">${Array.from({ length: this.steps }, (t, r) => l`<div class="dot ${r === this.activeStep ? "active" : ""}"></div>`)}</div>`;
    const e = this.steps > 1 ? this.activeStep / (this.steps - 1) * 100 : 100;
    return l`<div class="bar-track"><div class="bar-fill" style="width:${e}%"></div></div>`;
  }
  render() {
    return l`
            <slot name="back-button">
                <button class="nav-btn back" ?disabled=${this.activeStep === 0}
                    @click=${() => this._emit("ui-mobile-step-back")}>Back</button>
            </slot>
            <div class="progress">${this._progress()}</div>
            <slot name="next-button">
                <button class="nav-btn next" ?disabled=${this.activeStep >= this.steps - 1}
                    @click=${() => this._emit("ui-mobile-step-next")}>Next</button>
            </slot>`;
  }
};
et.styles = p`
        :host {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 12px; gap: 8px;
            background: var(--ui-surface-background,#fff);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
        :host([position="static"]) { border:1px solid var(--ui-border-color,#e5e7eb); border-radius:8px; }
        :host([position="bottom"]) { border-top:1px solid var(--ui-border-color,#e5e7eb); }
        :host([position="top"])    { border-bottom:1px solid var(--ui-border-color,#e5e7eb); }

        .progress { display:flex; align-items:center; justify-content:center; flex:1; gap:0; }

        /* text */
        .text { font-size:.8rem; color:#6b7280; }

        /* dots */
        .dots { display:flex; gap:6px; }
        .dot  { width:10px; height:10px; border-radius:50%; background:#d1d5db; transition:background .2s; }
        .dot.active { background:var(--ui-primary-color,#3b82f6); }

        /* progress bar */
        .bar-track { flex:1; height:4px; background:#e5e7eb; border-radius:2px; overflow:hidden; }
        .bar-fill   { height:100%; background:var(--ui-primary-color,#3b82f6); border-radius:2px; transition:width .3s; }

        /* default nav buttons */
        .nav-btn {
            padding:6px 14px; border-radius:6px; font-size:.8rem; font-family:inherit; cursor:pointer;
            transition: opacity .15s;
        }
        .nav-btn:disabled { opacity:.38; cursor:default; }
        .nav-btn.back { background:#fff; color:#374151; border:1px solid #e2e8f0; }
        .nav-btn.next { background:var(--ui-primary-color,#3b82f6); color:#fff; border:none; }
    `;
w([
  s({ type: Number })
], et.prototype, "steps", 2);
w([
  s({ type: Number, attribute: "active-step" })
], et.prototype, "activeStep", 2);
w([
  s({ type: String })
], et.prototype, "variant", 2);
w([
  s({ type: String, reflect: !0 })
], et.prototype, "position", 2);
et = w([
  d("ui-mobile-stepper")
], et);
var vs = Object.defineProperty, gs = Object.getOwnPropertyDescriptor, k = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? gs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && vs(t, r, i), i;
};
const ki = (e) => l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${e}"/></svg>`, ms = () => ki("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"), ys = () => ki("M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"), xs = () => ki("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"), _s = () => ki("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
let ke = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.disabled = !1, this.selected = !1, this.iconPosition = "start", this.href = "", this.fullWidth = !1;
  }
  /** @internal – called by UiTabs */
  setTabIndex(e) {
    const t = this.shadowRoot?.querySelector("button,a");
    t && (t.tabIndex = e);
  }
  focusInner() {
    this.shadowRoot?.querySelector("button,a")?.focus();
  }
  _fire() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-tab-click", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _inner() {
    return l`
            <span class="icon-slot"><slot name="icon"></slot></span>
            <slot></slot>`;
  }
  render() {
    const e = u({ tab: !0, [`icon-${this.iconPosition}`]: !0 });
    return this.href ? l`<a class=${e} href=${this.href}
                role="tab"
                aria-selected=${this.selected ? "true" : "false"}
                aria-disabled=${this.disabled ? "true" : "false"}
                tabindex=${this.selected ? "0" : "-1"}
                @click=${this._fire}>${this._inner()}</a>` : l`<button class=${e}
            role="tab"
            ?disabled=${this.disabled}
            aria-selected=${this.selected ? "true" : "false"}
            tabindex=${this.selected ? "0" : "-1"}
            @click=${this._fire}>${this._inner()}</button>`;
  }
};
ke.styles = p`
        :host { display: inline-flex; position: relative; background: var(--ui-surface-background, #fff); }
        :host([full-width]) { flex: 1; }

        .tab {
            display: inline-flex; align-items: center; justify-content: center;
            gap: 6px; padding: 10px 16px; min-height: 48px;
            border: none; background: none; cursor: pointer;
            font-family: var(--ui-font-family,'Inter',sans-serif);
            font-size: .875rem; font-weight: 500; line-height: 1.25;
            color: var(--ui-tab-inactive, #6b7280);
            white-space: nowrap; border-radius: 0; outline: none;
            transition: color .2s, background .15s;
            box-sizing: border-box; width: 100%;
            text-decoration: none; -webkit-tap-highlight-color: transparent;
        }
        .tab:hover:not(:disabled):not([aria-disabled="true"]) {
            color: var(--ui-tab-active, #3b82f6);
            background: rgba(59,130,246,.04);
        }
        .tab:focus-visible {
            outline: 2px solid var(--ui-tab-active, #3b82f6);
            outline-offset: -2px;
        }
        :host([selected]) .tab { color: var(--ui-tab-active, #3b82f6); font-weight: 600; }
        .tab:disabled { color: rgba(0,0,0,.26); cursor: not-allowed; }

        /* icon positions */
        .icon-top    { flex-direction: column; min-height: 72px; }
        .icon-bottom { flex-direction: column-reverse; min-height: 72px; }
        .icon-start  { flex-direction: row; }
        .icon-end    { flex-direction: row-reverse; }

        .icon-slot { display: contents; line-height: 0; }
    `;
k([
  s({ reflect: !0 })
], ke.prototype, "value", 2);
k([
  s({ type: Boolean, reflect: !0 })
], ke.prototype, "disabled", 2);
k([
  s({ type: Boolean, reflect: !0 })
], ke.prototype, "selected", 2);
k([
  s({ attribute: "icon-position", reflect: !0 })
], ke.prototype, "iconPosition", 2);
k([
  s()
], ke.prototype, "href", 2);
k([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], ke.prototype, "fullWidth", 2);
ke = k([
  d("ui-tab")
], ke);
let pi = class extends c {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return l`<div class="panel" role="tabpanel"><slot></slot></div>`;
  }
};
pi.styles = p`
        :host         { display: block; background: var(--ui-surface-background, #fff); }
        :host([hidden]){ display: none !important; }
        .panel        { padding: 24px; font-family: var(--ui-font-family,'Inter',sans-serif);
                        font-size: .875rem; color: #374151; line-height: 1.6; }
    `;
k([
  s({ reflect: !0 })
], pi.prototype, "value", 2);
pi = k([
  d("ui-tab-panel")
], pi);
let W = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.variant = "standard", this.centered = !1, this.scrollButtons = "auto", this._canBack = !1, this._canFwd = !1;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    typeof ResizeObserver < "u" && (this._ro = new ResizeObserver(() => {
      this._checkScroll(), this.syncIndicator();
    }), this._ro.observe(this._area)), this._area.addEventListener("scroll", () => this._checkScroll(), { passive: !0 }), this._checkScroll(), requestAnimationFrame(() => this.syncIndicator());
  }
  disconnectedCallback() {
    this._ro?.disconnect(), super.disconnectedCallback();
  }
  _tabs() {
    return this._slot ? this._slot.assignedElements({ flatten: !0 }).filter((e) => e.tagName === "UI-TAB") : [];
  }
  _checkScroll() {
    const e = this._area;
    e && (this.orientation === "horizontal" ? (this._canBack = e.scrollLeft > 1, this._canFwd = e.scrollLeft < e.scrollWidth - e.clientWidth - 1) : (this._canBack = e.scrollTop > 1, this._canFwd = e.scrollTop < e.scrollHeight - e.clientHeight - 1));
  }
  syncIndicator() {
    const e = this._tabs().find((o) => o.selected);
    if (!e || !this._ind || !this._row) return;
    const t = this._row.getBoundingClientRect(), r = e.getBoundingClientRect();
    !r.width && !r.height || (this.orientation === "horizontal" ? (this._ind.style.left = `${r.left - t.left}px`, this._ind.style.width = `${r.width}px`, this._ind.style.top = "", this._ind.style.height = "") : (this._ind.style.top = `${r.top - t.top}px`, this._ind.style.height = `${r.height}px`, this._ind.style.left = "", this._ind.style.width = ""), this._ind.style.opacity = "1");
  }
  _scroll(e) {
    this.orientation === "horizontal" ? this._area.scrollBy({ left: e, behavior: "smooth" }) : this._area.scrollBy({ top: e, behavior: "smooth" });
  }
  /** Keyboard navigation across tabs */
  _onKey(e) {
    const t = this.orientation === "horizontal", r = t ? "ArrowLeft" : "ArrowUp", o = t ? "ArrowRight" : "ArrowDown";
    if (![r, o, "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const i = this._tabs().filter((h) => !h.disabled), a = i.findIndex((h) => h.contains(document.activeElement) || h === document.activeElement);
    let n = a < 0 ? 0 : a;
    e.key === r && (n = (n - 1 + i.length) % i.length), e.key === o && (n = (n + 1) % i.length), e.key === "Home" && (n = 0), e.key === "End" && (n = i.length - 1), i[n]?.focusInner(), i[n]?.dispatchEvent(new CustomEvent("ui-tab-click", {
      detail: { value: i[n].value },
      bubbles: !0,
      composed: !0
    }));
  }
  _onSlotChange() {
    this._checkScroll(), requestAnimationFrame(() => this.syncIndicator());
  }
  render() {
    const e = this.variant === "scrollable" && this.scrollButtons !== "false", t = this.orientation === "vertical", r = e ? l`
            <button class="scroll-btn" aria-label="Scroll back"
                ?disabled=${!this._canBack}
                @click=${() => this._scroll(-200)}>
                ${t ? xs() : ms()}
            </button>` : x, o = e ? l`
            <button class="scroll-btn" aria-label="Scroll forward"
                ?disabled=${!this._canFwd}
                @click=${() => this._scroll(200)}>
                ${t ? _s() : ys()}
            </button>` : x;
    return l`
            <div class="container">
                ${r}
                <div class="scroll-area" @keydown=${this._onKey}>
                    <div class="tabs-row" role="tablist">
                        <slot @slotchange=${this._onSlotChange}></slot>
                        <div class="indicator"></div>
                    </div>
                </div>
                ${o}
            </div>`;
  }
};
W.styles = p`
        :host { display: block; position: relative; background: var(--ui-surface-background, #fff); }
        /* In vertical mode the host must fill the height that flex-stretching gives it
           so .scroll-area has a bounded height and overflow:auto actually fires. */
        :host([orientation="vertical"]) { height: 100%; }
        :host([orientation="vertical"]) .container { height: 100%; }

        .container {
            display: flex; align-items: center; position: relative;
            border-bottom: 1px solid #e5e7eb;
        }
        :host([orientation="vertical"]) .container {
            flex-direction: column; border-bottom: none;
            border-right: 1px solid #e5e7eb; align-items: stretch;
        }

        /* scroll buttons */
        .scroll-btn {
            flex-shrink: 0; display: flex; align-items: center; justify-content: center;
            border: none; background: none; cursor: pointer; color: #6b7280;
            border-radius: 4px; padding: 0;
            transition: color .15s, background .15s;
        }
        /* Horizontal: fixed square on left/right of the scroll area */
        :host(:not([orientation="vertical"])) .scroll-btn { width: 40px; height: 40px; }
        /* Vertical: full-width bar on top/bottom — centres the chevron across the sidebar */
        :host([orientation="vertical"]) .scroll-btn     { width: 100%; height: 40px; }
        .scroll-btn:hover:not(:disabled) { color: #374151; background: rgba(0,0,0,.05); }
        .scroll-btn:disabled { opacity: .38; cursor: default; }

        /* scroll area – axis-locked so scroll events don't bleed to the page */
        .scroll-area {
            flex: 1; position: relative; min-height: 0;
            scrollbar-width: none; -ms-overflow-style: none;
        }
        .scroll-area::-webkit-scrollbar { display: none; }
        :host(:not([orientation="vertical"])) .scroll-area {
            overflow-x: auto; overflow-y: hidden;
        }
        :host([orientation="vertical"]) .scroll-area {
            overflow-y: auto; overflow-x: hidden;
        }

        /* tabs row */
        .tabs-row {
            display: flex; position: relative;
            min-width: max-content;
        }
        :host([orientation="vertical"]) .tabs-row {
            flex-direction: column; min-width: unset; min-height: max-content;
        }
        :host([variant="fullWidth"]) .tabs-row  { min-width: 100%; }
        :host([variant="fullWidth"]) ::slotted(ui-tab) { flex: 1; }
        :host([centered]) .tabs-row { justify-content: center; min-width: 100%; }

        /* indicator */
        .indicator {
            position: absolute; pointer-events: none; opacity: 0;
            background: var(--ui-tabs-ind-color, #3b82f6); border-radius: 3px;
            transition:
                left   .25s cubic-bezier(.4,0,.2,1),
                width  .25s cubic-bezier(.4,0,.2,1),
                top    .25s cubic-bezier(.4,0,.2,1),
                height .25s cubic-bezier(.4,0,.2,1),
                opacity .15s;
        }
        :host(:not([orientation="vertical"])) .indicator { bottom: 0; height: 3px; }
        :host([orientation="vertical"])       .indicator { right: 0;  width: 3px; }
    `;
k([
  s({ reflect: !0 })
], W.prototype, "orientation", 2);
k([
  s({ reflect: !0 })
], W.prototype, "variant", 2);
k([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "centered", 2);
k([
  s({ attribute: "scroll-buttons" })
], W.prototype, "scrollButtons", 2);
k([
  g()
], W.prototype, "_canBack", 2);
k([
  g()
], W.prototype, "_canFwd", 2);
k([
  Xt(".scroll-area")
], W.prototype, "_area", 2);
k([
  Xt(".tabs-row")
], W.prototype, "_row", 2);
k([
  Xt(".indicator")
], W.prototype, "_ind", 2);
k([
  Xt("slot")
], W.prototype, "_slot", 2);
W = k([
  d("ui-tab-list")
], W);
let be = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.orientation = "horizontal", this.variant = "standard", this.centered = !1, this.scrollButtons = "auto", this.textColor = "primary", this.indicatorColor = "primary", this._onTabClick = (e) => {
      this.value = e.detail.value, this.dispatchEvent(new CustomEvent("ui-tab-change", {
        detail: { value: e.detail.value },
        bubbles: !0,
        composed: !0
      })), this._syncAll();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("ui-tab-click", this._onTabClick);
  }
  disconnectedCallback() {
    this.removeEventListener("ui-tab-click", this._onTabClick), super.disconnectedCallback();
  }
  _resolveColor(e) {
    return e === "primary" ? "#3b82f6" : e === "secondary" ? "#8b5cf6" : e === "inherit" ? "currentColor" : e;
  }
  _syncAll() {
    const e = this.querySelector("ui-tab-list"), t = Array.from(this.querySelectorAll("ui-tab")), r = Array.from(this.querySelectorAll("ui-tab-panel"));
    let o = this.value;
    if (!o) {
      const n = t.find((h) => !h.disabled);
      n && (o = n.value);
    }
    e && (e.orientation = this.orientation, e.variant = this.variant, e.centered = this.centered, e.scrollButtons = this.scrollButtons, e.style.setProperty("--ui-tabs-ind-color", this._resolveColor(this.indicatorColor)));
    const i = this._resolveColor(this.textColor), a = this.textColor === "inherit" ? "currentColor" : "#6b7280";
    t.forEach((n) => {
      n.selected = n.value === o, n.fullWidth = this.variant === "fullWidth", n.style.setProperty("--ui-tab-active", i), n.style.setProperty("--ui-tab-inactive", a), n.setAttribute("id", `tab-${n.value}`), n.setAttribute("aria-controls", `panel-${n.value}`);
    }), r.forEach((n) => {
      n.setAttribute("id", `panel-${n.value}`), n.setAttribute("aria-labelledby", `tab-${n.value}`), n.value === o ? n.removeAttribute("hidden") : n.setAttribute("hidden", "");
    }), requestAnimationFrame(() => e?.syncIndicator());
  }
  updated(e) {
    ["value", "orientation", "variant", "centered", "scrollButtons", "textColor", "indicatorColor"].some((r) => e.has(r)) && this._syncAll();
  }
  render() {
    return l`
            <div class="root">
                <slot @slotchange=${() => this._syncAll()}></slot>
            </div>`;
  }
};
be.styles = p`
        :host { display: block; font-family: var(--ui-font-family,'Inter',sans-serif);
                background: var(--ui-surface-background, #fff); }
        /* Vertical: stretch the root div so panels fill available height */
        :host([orientation="vertical"]) .root {
            display: flex; flex-direction: row;
            height: 100%; min-height: inherit;
        }
        .root { display: block; }
    `;
k([
  s({ reflect: !0 })
], be.prototype, "value", 2);
k([
  s({ reflect: !0 })
], be.prototype, "orientation", 2);
k([
  s()
], be.prototype, "variant", 2);
k([
  s({ type: Boolean })
], be.prototype, "centered", 2);
k([
  s({ attribute: "scroll-buttons" })
], be.prototype, "scrollButtons", 2);
k([
  s({ attribute: "text-color" })
], be.prototype, "textColor", 2);
k([
  s({ attribute: "indicator-color" })
], be.prototype, "indicatorColor", 2);
be = k([
  d("ui-tabs")
], be);
var ws = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, _ = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ks(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ws(t, r, i), i;
};
const $s = /* @__PURE__ */ new Set([
  "div",
  "span",
  "section",
  "article",
  "header",
  "footer",
  "main",
  "aside",
  "nav",
  "ul",
  "ol",
  "li",
  "p",
  "form",
  "fieldset",
  "label",
  "figure",
  "figcaption",
  "address",
  "blockquote",
  "details",
  "summary",
  "dialog"
]);
let y = class extends c {
  constructor() {
    super(...arguments), this.component = "div";
  }
  get _safeComponent() {
    return $s.has(this.component) ? this.component : (console.warn(`[ui-box] Unknown component tag "${this.component}", falling back to "div".`), "div");
  }
  _getStyles() {
    const e = {};
    return this.m && (e.margin = this.m), this.mx && (e.marginLeft = this.mx, e.marginRight = this.mx), this.my && (e.marginTop = this.my, e.marginBottom = this.my), this.mt && (e.marginTop = this.mt), this.mr && (e.marginRight = this.mr), this.mb && (e.marginBottom = this.mb), this.ml && (e.marginLeft = this.ml), this.p && (e.padding = this.p), this.px && (e.paddingLeft = this.px, e.paddingRight = this.px), this.py && (e.paddingTop = this.py, e.paddingBottom = this.py), this.pt && (e.paddingTop = this.pt), this.pr && (e.paddingRight = this.pr), this.pb && (e.paddingBottom = this.pb), this.pl && (e.paddingLeft = this.pl), this.display && (e.display = this.display), this.flexDirection && (e.flexDirection = this.flexDirection), this.alignItems && (e.alignItems = this.alignItems), this.justifyContent && (e.justifyContent = this.justifyContent), this.flexWrap && (e.flexWrap = this.flexWrap), this.flexBasis && (e.flexBasis = this.flexBasis), this.flexGrow && (e.flexGrow = this.flexGrow), this.flexShrink && (e.flexShrink = this.flexShrink), this.gap && (e.gap = this.gap), this.bgcolor && (e.backgroundColor = this.bgcolor === "primary" ? "var(--ui-primary-color)" : this.bgcolor === "secondary" ? "var(--ui-secondary-color)" : this.bgcolor), this.color && (e.color = this.color === "primary" ? "var(--ui-primary-color)" : this.color === "secondary" ? "var(--ui-secondary-color)" : this.color), this.border && (e.border = this.border), this.borderRadius && (e.borderRadius = this.borderRadius), this.boxShadow && (e.boxShadow = this.boxShadow), this.width && (e.width = this.width), this.height && (e.height = this.height), e;
  }
  render() {
    const e = fr(this._safeComponent);
    return lr`
      <${e} style=${st(this._getStyles())}>
        <slot></slot>
      </${e}>
    `;
  }
};
y.styles = p`
    :host {
      display: block;
    }
  `;
_([
  s({ type: String })
], y.prototype, "component", 2);
_([
  s({ type: String })
], y.prototype, "m", 2);
_([
  s({ type: String })
], y.prototype, "mt", 2);
_([
  s({ type: String })
], y.prototype, "mr", 2);
_([
  s({ type: String })
], y.prototype, "mb", 2);
_([
  s({ type: String })
], y.prototype, "ml", 2);
_([
  s({ type: String })
], y.prototype, "mx", 2);
_([
  s({ type: String })
], y.prototype, "my", 2);
_([
  s({ type: String })
], y.prototype, "p", 2);
_([
  s({ type: String })
], y.prototype, "pt", 2);
_([
  s({ type: String })
], y.prototype, "pr", 2);
_([
  s({ type: String })
], y.prototype, "pb", 2);
_([
  s({ type: String })
], y.prototype, "pl", 2);
_([
  s({ type: String })
], y.prototype, "px", 2);
_([
  s({ type: String })
], y.prototype, "py", 2);
_([
  s({ type: String })
], y.prototype, "display", 2);
_([
  s({ type: String })
], y.prototype, "flexDirection", 2);
_([
  s({ type: String })
], y.prototype, "alignItems", 2);
_([
  s({ type: String })
], y.prototype, "justifyContent", 2);
_([
  s({ type: String })
], y.prototype, "flexWrap", 2);
_([
  s({ type: String })
], y.prototype, "flexBasis", 2);
_([
  s({ type: String })
], y.prototype, "flexGrow", 2);
_([
  s({ type: String })
], y.prototype, "flexShrink", 2);
_([
  s({ type: String })
], y.prototype, "gap", 2);
_([
  s({ type: String })
], y.prototype, "bgcolor", 2);
_([
  s({ type: String })
], y.prototype, "color", 2);
_([
  s({ type: String })
], y.prototype, "border", 2);
_([
  s({ type: String })
], y.prototype, "borderRadius", 2);
_([
  s({ type: String })
], y.prototype, "boxShadow", 2);
_([
  s({ type: String })
], y.prototype, "width", 2);
_([
  s({ type: String })
], y.prototype, "height", 2);
y = _([
  d("ui-box")
], y);
var Cs = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, $i = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Is(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Cs(t, r, i), i;
};
let $t = class extends c {
  constructor() {
    super(...arguments), this.maxWidth = "lg", this.disableGutters = !1, this.fixed = !1;
  }
  render() {
    return l`
      <div class=${u({
      container: !0,
      [`max-width-${this.maxWidth}`]: this.maxWidth !== !1,
      "disable-gutters": this.disableGutters,
      fixed: this.fixed
    })}>
        <slot></slot>
      </div>
    `;
  }
};
$t.styles = p`
    :host {
      display: block;
    }

    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
      padding-left: var(--ui-container-padding, 16px);
      padding-right: var(--ui-container-padding, 16px);
    }

    @media (min-width: 600px) {
      .container {
        padding-left: var(--ui-container-padding-sm, 24px);
        padding-right: var(--ui-container-padding-sm, 24px);
      }
    }

    .disable-gutters {
      padding-left: 0;
      padding-right: 0;
    }

    /* Max Widths */
    .max-width-xs { max-width: var(--ui-container-xs, 444px); }
    .max-width-sm { max-width: var(--ui-container-sm, 600px); }
    .max-width-md { max-width: var(--ui-container-md, 900px); }
    .max-width-lg { max-width: var(--ui-container-lg, 1200px); }
    .max-width-xl { max-width: var(--ui-container-xl, 1536px); }

    /* Fixed behavior: step through breakpoints */
    .fixed { max-width: var(--ui-container-xs, 444px); }
    @media (min-width: 600px) {
      .fixed { max-width: var(--ui-container-sm, 600px); }
    }
    @media (min-width: 900px) {
      .fixed { max-width: var(--ui-container-md, 900px); }
    }
    @media (min-width: 1200px) {
      .fixed { max-width: var(--ui-container-lg, 1200px); }
    }
    @media (min-width: 1536px) {
      .fixed { max-width: var(--ui-container-xl, 1536px); }
    }

    /* Cap fixed containers at their maxWidth (higher specificity = 2 classes) */
    @media (min-width: 600px) {
      .fixed.max-width-xs { max-width: var(--ui-container-xs, 444px); }
    }
    @media (min-width: 900px) {
      .fixed.max-width-sm { max-width: var(--ui-container-sm, 600px); }
    }
    @media (min-width: 1200px) {
      .fixed.max-width-md { max-width: var(--ui-container-md, 900px); }
    }
    @media (min-width: 1536px) {
      .fixed.max-width-lg { max-width: var(--ui-container-lg, 1200px); }
    }
  `;
$i([
  s({
    attribute: "max-width",
    reflect: !0,
    converter: {
      fromAttribute: (e) => e === null || e === "false" ? !1 : e,
      toAttribute: (e) => e === !1 ? null : e
    }
  })
], $t.prototype, "maxWidth", 2);
$i([
  s({ type: Boolean, attribute: "disable-gutters", reflect: !0 })
], $t.prototype, "disableGutters", 2);
$i([
  s({ type: Boolean, reflect: !0 })
], $t.prototype, "fixed", 2);
$t = $i([
  d("ui-container")
], $t);
var Ss = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, T = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ps(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ss(t, r, i), i;
};
let D = class extends c {
  constructor() {
    super(...arguments), this.container = !1, this.direction = "row", this.wrap = "wrap", this.columns = 12, this.spacing = 0, this._currentWidth = typeof window < "u" ? window.innerWidth : 1200, this._onResize = () => {
      this._currentWidth = window.innerWidth;
    }, this._breakpointCache = {};
  }
  _getBreakpointValue(e, t) {
    if (this._breakpointCache[e] !== void 0) return this._breakpointCache[e];
    if (typeof window < "u") {
      const r = getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${e}`);
      if (r && r.trim())
        return this._breakpointCache[e] = parseInt(r, 10), this._breakpointCache[e];
    }
    return t;
  }
  connectedCallback() {
    super.connectedCallback(), typeof window < "u" && (window.addEventListener("resize", this._onResize), this._currentWidth = window.innerWidth);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), typeof window < "u" && window.removeEventListener("resize", this._onResize);
  }
  _getBreakpoint() {
    const e = this._currentWidth;
    return e >= this._getBreakpointValue("xl", 1536) ? "xl" : e >= this._getBreakpointValue("lg", 1200) ? "lg" : e >= this._getBreakpointValue("md", 900) ? "md" : e >= this._getBreakpointValue("sm", 600) ? "sm" : "xs";
  }
  _getEffectiveSize(e) {
    const t = ["xs", "sm", "md", "lg", "xl"], r = t.indexOf(e);
    for (let o = r; o >= 0; o--) {
      const i = this[t[o]];
      if (i !== void 0)
        return typeof i == "string" && !isNaN(Number(i)) && i.trim() !== "" ? Number(i) : i === "true" ? !0 : i === "false" ? !1 : i;
    }
  }
  _getEffectiveOffset(e) {
    if (!this.offset) return;
    const t = ["xs", "sm", "md", "lg", "xl"], r = t.indexOf(e);
    for (let o = r; o >= 0; o--) {
      const i = this.offset[t[o]];
      if (i !== void 0)
        return typeof i == "string" && !isNaN(Number(i)) && i.trim() !== "" ? Number(i) : i;
    }
  }
  _resolveResponsive(e, t) {
    if (typeof e == "object" && e !== null) {
      const r = ["xs", "sm", "md", "lg", "xl"], o = r.indexOf(t);
      for (let i = o; i >= 0; i--) {
        const a = e[r[i]];
        if (a !== void 0) return a;
      }
      return 0;
    }
    return typeof e == "string" && !isNaN(Number(e)) && e.trim() !== "" ? Number(e) : e;
  }
  _resolveResponsiveOrder(e, t) {
    if (typeof e == "object" && e !== null) {
      const r = ["xs", "sm", "md", "lg", "xl"], o = r.indexOf(t);
      for (let i = o; i >= 0; i--) {
        const a = e[r[i]];
        if (a !== void 0) return a;
      }
      return;
    }
    return e;
  }
  _toPx(e) {
    return typeof e == "number" ? `${e * 8}px` : e;
  }
  _getSpacingStyles(e) {
    if (!this.container) return {};
    const t = this._resolveResponsive(this.spacing, e), r = this.rowSpacing !== void 0 ? this._resolveResponsive(this.rowSpacing, e) : t, o = this.columnSpacing !== void 0 ? this._resolveResponsive(this.columnSpacing, e) : t;
    return {
      gap: `${this._toPx(r)} ${this._toPx(o)}`
    };
  }
  _getEffectiveColumns() {
    if (this.container) return this.columns;
    const e = getComputedStyle(this).getPropertyValue("--ui-grid-columns").trim();
    return e && !isNaN(Number(e)) ? Number(e) : this.columns;
  }
  _getItemStyles(e) {
    const t = this.xs !== void 0 || this.sm !== void 0 || this.md !== void 0 || this.lg !== void 0 || this.xl !== void 0, r = !!this.offset, o = this.order !== void 0;
    if (!t && !r && !o) return {};
    const i = this._getEffectiveSize(e), a = this._getEffectiveOffset(e), n = this._getEffectiveColumns(), h = {};
    if (i === !0)
      h["flex-grow"] = "1", h["flex-basis"] = "0%", h["max-width"] = "100%";
    else if (i === "auto")
      h["flex-grow"] = "0", h["flex-basis"] = "auto", h.width = "auto", h["max-width"] = "none";
    else if (typeof i == "number") {
      const v = i / n * 100;
      h["flex-grow"] = "0", h["flex-basis"] = `calc(${v}% - var(--ui-grid-column-gap, 0px) * ${(n - i) / n})`, h["max-width"] = `calc(${v}% - var(--ui-grid-column-gap, 0px) * ${(n - i) / n})`;
    } else this.container || (h["flex-grow"] = "0", h["flex-basis"] = "auto", h.width = "100%");
    if (a === "auto")
      h["margin-left"] = "auto";
    else if (typeof a == "number") {
      const v = a / n * 100;
      h["margin-left"] = `${v}%`;
    }
    if (this.order !== void 0) {
      const v = this._resolveResponsiveOrder(this.order, e);
      v !== void 0 && (h.order = String(v));
    }
    return h;
  }
  updated(e) {
    super.updated(e), this._applyItemStyles();
  }
  _applyItemStyles() {
    const e = this._getBreakpoint(), t = this._getItemStyles(e);
    if (this.style.flexGrow = "", this.style.flexBasis = "", this.style.maxWidth = "", this.style.width = "", this.style.marginLeft = "", this.style.order = "", Object.entries(t).forEach(([r, o]) => {
      this.style.setProperty(r, o);
    }), this.container) {
      const r = this._getSpacingStyles(e);
      if (r.gap) {
        const o = r.gap.split(" "), i = o.length === 2 ? o[1] : o[0];
        this.style.setProperty("--ui-grid-column-gap", i);
      }
      this.style.setProperty("--ui-grid-columns", String(this.columns));
    }
  }
  render() {
    const e = this._getBreakpoint(), r = {
      ...this._getSpacingStyles(e),
      "align-items": this.alignItems || "",
      "justify-content": this.justifyContent || ""
    };
    return l`
      <div class=${u({
      "grid-wrapper": !0,
      container: this.container,
      [`direction-${this.direction}`]: this.container,
      [`wrap-${this.wrap}`]: this.container && this.wrap !== "wrap"
    })} style=${st(r)}>
        <slot></slot>
      </div>
    `;
  }
};
D.styles = p`
    :host {
      display: block;
    }

    .grid-wrapper {
      box-sizing: border-box;
      display: block;
    }

    .grid-wrapper.container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    /* Direction */
    .direction-row { flex-direction: row; }
    .direction-row-reverse { flex-direction: row-reverse; }
    .direction-column { flex-direction: column; }
    .direction-column-reverse { flex-direction: column-reverse; }

    /* Wrap */
    .wrap-nowrap { flex-wrap: nowrap; }
    .wrap-wrap-reverse { flex-wrap: wrap-reverse; }

    .grid-item {
      box-sizing: border-box;
      margin: 0;
    }
  `;
T([
  s({ type: Boolean, reflect: !0 })
], D.prototype, "container", 2);
T([
  s({ type: String, reflect: !0 })
], D.prototype, "direction", 2);
T([
  s({ type: String, reflect: !0 })
], D.prototype, "wrap", 2);
T([
  s({ type: String, attribute: "align-items", reflect: !0 })
], D.prototype, "alignItems", 2);
T([
  s({ type: String, attribute: "justify-content", reflect: !0 })
], D.prototype, "justifyContent", 2);
T([
  s({ type: Number })
], D.prototype, "columns", 2);
T([
  s({ type: Object })
], D.prototype, "spacing", 2);
T([
  s({ type: Object })
], D.prototype, "rowSpacing", 2);
T([
  s({ type: Object })
], D.prototype, "columnSpacing", 2);
T([
  s()
], D.prototype, "xs", 2);
T([
  s()
], D.prototype, "sm", 2);
T([
  s()
], D.prototype, "md", 2);
T([
  s()
], D.prototype, "lg", 2);
T([
  s()
], D.prototype, "xl", 2);
T([
  s({ type: Object })
], D.prototype, "offset", 2);
T([
  s({ type: Object })
], D.prototype, "order", 2);
T([
  g()
], D.prototype, "_currentWidth", 2);
D = T([
  d("ui-grid")
], D);
var Es = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, ct = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Os(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Es(t, r, i), i;
};
let N = class extends c {
  constructor() {
    super(...arguments), this.direction = "column", this.spacing = 0, this.useFlexGap = !0, this._currentWidth = typeof window < "u" ? window.innerWidth : 1200, this._onResize = () => {
      this._currentWidth = window.innerWidth, this.requestUpdate();
    };
  }
  _getBreakpointValue(e, t) {
    if (N._breakPoints[e]) return N._breakPoints[e];
    if (typeof window < "u") {
      const r = getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${e}`);
      if (r && r.trim())
        return N._breakPoints[e] = parseInt(r, 10), N._breakPoints[e];
    }
    return t;
  }
  connectedCallback() {
    super.connectedCallback(), typeof window < "u" && (window.addEventListener("resize", this._onResize), this._currentWidth = window.innerWidth);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), typeof window < "u" && window.removeEventListener("resize", this._onResize);
  }
  updated(e) {
    super.updated(e), this._updateDividers();
  }
  /**
   * Automatically sets the orientation of any slotted ui-divider elements
   * based on the current resolved direction of the stack.
   */
  _updateDividers() {
    const e = this._getBreakpoint(), t = this._resolveResponsive(this.direction, e);
    if (!t) return;
    const r = t.startsWith("row") ? "vertical" : "horizontal";
    this.querySelectorAll("ui-divider").forEach((o) => {
      o.getAttribute("orientation") !== r && o.setAttribute("orientation", r);
    });
  }
  _getBreakpoint() {
    const e = this._currentWidth;
    return e >= this._getBreakpointValue("xl", 1536) ? "xl" : e >= this._getBreakpointValue("lg", 1200) ? "lg" : e >= this._getBreakpointValue("md", 900) ? "md" : e >= this._getBreakpointValue("sm", 600) ? "sm" : "xs";
  }
  _resolveResponsive(e, t) {
    if (typeof e == "object" && e !== null && !Array.isArray(e)) {
      const r = ["xs", "sm", "md", "lg", "xl"], o = r.indexOf(t);
      for (let n = o; n >= 0; n--) {
        const h = e[r[n]];
        if (h !== void 0) return h;
      }
      const i = e, a = i.xs;
      return a !== void 0 ? a : i[Object.keys(e)[0]];
    }
    return e;
  }
  _getSpacingPx(e) {
    return typeof e == "number" ? `${e * 8}px` : e;
  }
  render() {
    const e = this._getBreakpoint(), t = this._resolveResponsive(this.direction, e), r = this._resolveResponsive(this.spacing, e), o = this._getSpacingPx(r), i = t ?? "column", a = i.startsWith("column") ? "stretch" : "center", n = {
      "flex-direction": i,
      "align-items": this.alignItems || a,
      "justify-content": this.justifyContent || "flex-start",
      gap: this.useFlexGap ? o : "0",
      "--ui-stack-spacing": o
    };
    return l`
      <div
        class="stack-wrapper direction-${t} ${this.useFlexGap ? "" : "no-flex-gap"}"
        style=${st(n)}
      >
        <slot></slot>
      </div>
    `;
  }
};
N.styles = p`
    :host {
      display: block;
    }

    .stack-wrapper {
      display: flex;
      box-sizing: border-box;
    }

    /* Column direction stacks fill full width */
    .stack-wrapper.direction-column,
    .stack-wrapper.direction-column-reverse {
      width: 100%;
    }

    /* Reset slotted divider margins so stack gap controls spacing */
    ::slotted(ui-divider) {
      margin: 0 !important;
    }

    /* Fallback margin-based spacing when useFlexGap=false */
    .stack-wrapper.no-flex-gap.direction-column ::slotted(*:not(:first-child)) {
      margin-top: var(--ui-stack-spacing, 0px);
    }
    .stack-wrapper.no-flex-gap.direction-column-reverse ::slotted(*:not(:last-child)) {
      margin-bottom: var(--ui-stack-spacing, 0px);
    }
    .stack-wrapper.no-flex-gap.direction-row ::slotted(*:not(:first-child)) {
      margin-left: var(--ui-stack-spacing, 0px);
    }
    .stack-wrapper.no-flex-gap.direction-row-reverse ::slotted(*:not(:last-child)) {
      margin-right: var(--ui-stack-spacing, 0px);
    }
  `;
N._breakPoints = {};
ct([
  s({
    converter: {
      fromAttribute: (e) => {
        if (!e) return "column";
        try {
          return JSON.parse(e);
        } catch {
          return e;
        }
      }
    }
  })
], N.prototype, "direction", 2);
ct([
  s({ type: Object })
], N.prototype, "spacing", 2);
ct([
  s({ type: String })
], N.prototype, "alignItems", 2);
ct([
  s({ type: String })
], N.prototype, "justifyContent", 2);
ct([
  s({ type: Boolean })
], N.prototype, "useFlexGap", 2);
ct([
  g()
], N.prototype, "_currentWidth", 2);
N = ct([
  d("ui-stack")
], N);
var Ds = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, At = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? zs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ds(t, r, i), i;
};
let Le = class extends c {
  constructor() {
    super(...arguments), this.variant = "standard", this.cols = 3, this.gap = 4, this.rowHeight = 164, this.autoRows = !1;
  }
  render() {
    const e = this.variant === "masonry", t = {};
    return e ? (t["--ui-image-list-cols"] = String(this.cols), t["column-count"] = String(this.cols), t["column-gap"] = `${this.gap}px`) : (t["grid-template-columns"] = `repeat(${this.cols}, 1fr)`, t.gap = `${this.gap}px`, t["--ui-image-list-row-height"] = `${this.rowHeight}px`, t["grid-auto-rows"] = this.autoRows ? "auto" : `${this.rowHeight}px`), t["--ui-image-list-variant"] = this.variant, t["--ui-image-list-gap"] = `${this.gap}px`, l`
      <ul class="image-list variant-${this.variant}" style="${st(t)}" role="list">
        <slot></slot>
      </ul>
    `;
  }
};
Le.styles = p`
    :host {
      display: block;
    }

    .image-list {
      display: grid;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* Standard: uniform grid, items crop to fill each cell */
    .variant-standard {
      grid-auto-rows: var(--ui-image-list-row-height, 164px);
    }

    /* Quilted: same column grid, items can span multiple rows/cols */
    .variant-quilted {
      grid-auto-rows: var(--ui-image-list-row-height, 164px);
    }

    /* Woven: alternating heights, set via nth-child in items */
    .variant-woven {
      grid-auto-rows: var(--ui-image-list-row-height, 164px);
    }

    /* Masonry: no grid rows — CSS columns-based layout */
    .variant-masonry {
      display: block;
      columns: var(--ui-image-list-cols, 3);
    }
  `;
At([
  s({ type: String })
], Le.prototype, "variant", 2);
At([
  s({ type: Number })
], Le.prototype, "cols", 2);
At([
  s({ type: Number })
], Le.prototype, "gap", 2);
At([
  s({ type: Number })
], Le.prototype, "rowHeight", 2);
At([
  s({ type: Boolean })
], Le.prototype, "autoRows", 2);
Le = At([
  d("ui-image-list")
], Le);
var Bs = Object.defineProperty, As = Object.getOwnPropertyDescriptor, ri = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? As(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Bs(t, r, i), i;
};
let tt = class extends c {
  constructor() {
    super(...arguments), this.rows = 1, this.cols = 1, this.barPosition = "overlay", this.weave = "odd";
  }
  connectedCallback() {
    super.connectedCallback(), this._applyGridSpan();
  }
  updated(e) {
    super.updated(e), this._applyGridSpan();
  }
  _applyGridSpan() {
    this.rows > 1 && (this.style.gridRow = `span ${this.rows}`), this.cols > 1 && (this.style.gridColumn = `span ${this.cols}`);
    const e = this.closest("ui-image-list");
    e && e.getAttribute("variant") === "masonry" ? this.classList.add("masonry") : this.classList.remove("masonry"), e && e.getAttribute("variant") === "woven" && (this.style.gridRow = this.weave === "odd" ? "span 2" : "span 1");
  }
  render() {
    const e = {};
    return this.rows > 1 && (e["grid-row"] = `span ${this.rows}`), this.cols > 1 && (e["grid-column"] = `span ${this.cols}`), l`
      <li class="item-wrapper" style="${st(e)}">
        <slot name="img"><slot></slot></slot>
        <slot name="bar"></slot>
      </li>
    `;
  }
};
tt.styles = p`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    /* bar-position below: switch host to column flex so bar sits below */
    :host([bar-position="below"]) {
      display: flex;
      flex-direction: column;
      overflow: visible;
    }

    .item-wrapper {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    /* Masonry: let height follow the image aspect ratio */
    :host(.masonry) .item-wrapper {
      height: auto;
      break-inside: avoid;
      margin-bottom: var(--ui-image-list-gap, 4px);
    }

    /* Default image slot styling */
    ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Masonry: images resize naturally */
    :host(.masonry) ::slotted(img) {
      height: auto;
      object-fit: contain;
    }

    /* Bar slot: pinned at bottom by default */
    ::slotted(ui-image-list-item-bar) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    /* Bar below: place bar outside the image area */
    :host([bar-position="below"]) {
      display: flex;
      flex-direction: column;
    }

    :host([bar-position="below"]) .item-wrapper {
      flex: 1;
    }

    :host([bar-position="below"]) ::slotted(ui-image-list-item-bar) {
      position: static;
    }
  `;
ri([
  s({ type: Number })
], tt.prototype, "rows", 2);
ri([
  s({ type: Number })
], tt.prototype, "cols", 2);
ri([
  s({ type: String, attribute: "bar-position", reflect: !0 })
], tt.prototype, "barPosition", 2);
ri([
  s({ type: String })
], tt.prototype, "weave", 2);
tt = ri([
  d("ui-image-list-item")
], tt);
var Ts = Object.defineProperty, js = Object.getOwnPropertyDescriptor, cr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? js(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ts(t, r, i), i;
};
let hi = class extends c {
  constructor() {
    super(...arguments), this.position = "bottom";
  }
  render() {
    return l`
      <div class="bar-inner">
        <div class="bar-text">
          <div class="bar-title"><slot></slot></div>
          <div class="bar-subtitle"><slot name="subtitle"></slot></div>
        </div>
        <div class="bar-action">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
};
hi.styles = p`
    :host {
      display: block;
      box-sizing: border-box;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
      color: #fff;
      padding: 12px 12px 8px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    /* Below-image mode: solid background, no gradient overlay */
    :host([position="below"]) {
      background: var(--ui-surface-color, #fff);
      color: var(--ui-text-color, #111827);
      border-top: 1px solid var(--ui-border-color, #e5e7eb);
      padding: 8px 12px;
    }

    /* Top position: gradient flows from bottom of bar area upward */
    :host([position="top"]) {
      background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
      top: 0;
      bottom: auto;
    }

    .bar-inner {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bar-text {
      flex: 1;
      min-width: 0;
    }

    .bar-title {
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bar-subtitle {
      font-size: 0.75rem;
      font-weight: 400;
      opacity: 0.8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 2px;
    }

    .bar-action {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    /* Action slot: make icon/button white */
    ::slotted([slot="action"]) {
      color: #fff;
    }

    :host([position="below"]) ::slotted([slot="action"]) {
      color: var(--ui-text-color, #111827);
    }
  `;
cr([
  s({ type: String, reflect: !0 })
], hi.prototype, "position", 2);
hi = cr([
  d("ui-image-list-item-bar")
], hi);
var Ms = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, S = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ls(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ms(t, r, i), i;
};
const Us = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], ar = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function qe(e) {
  if (!e) return null;
  const [t, r, o] = e.split("-").map(Number);
  return !t || !r || !o ? null : new Date(t, r - 1, o);
}
function ai(e) {
  const t = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${t}-${r}-${o}`;
}
function Rs(e) {
  const t = qe(e);
  return t ? `${String(t.getMonth() + 1).padStart(2, "0")}/${String(t.getDate()).padStart(2, "0")}/${t.getFullYear()}` : "";
}
function Ns() {
  return ai(/* @__PURE__ */ new Date());
}
function pt(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function Vs(e, t, r, o, i) {
  const a = [], n = new Date(e, t, 1), h = Ns(), v = qe(h), m = r ? qe(r) : null, b = o ? qe(o) : null, $ = i ? qe(i) : null, J = n.getDay();
  for (let H = J - 1; H >= 0; H--) {
    const E = new Date(e, t, -H), Tt = ai(E);
    a.push({
      date: E,
      iso: Tt,
      day: E.getDate(),
      isCurrentMonth: !1,
      isToday: pt(E, v),
      isSelected: m ? pt(E, m) : !1,
      isDisabled: (b ? E < b : !1) || ($ ? E > $ : !1)
    });
  }
  const q = new Date(e, t + 1, 0).getDate();
  for (let H = 1; H <= q; H++) {
    const E = new Date(e, t, H), Tt = ai(E);
    a.push({
      date: E,
      iso: Tt,
      day: H,
      isCurrentMonth: !0,
      isToday: pt(E, v),
      isSelected: m ? pt(E, m) : !1,
      isDisabled: (b ? E < b : !1) || ($ ? E > $ : !1)
    });
  }
  const hr = 42 - a.length;
  for (let H = 1; H <= hr; H++) {
    const E = new Date(e, t + 1, H), Tt = ai(E);
    a.push({
      date: E,
      iso: Tt,
      day: H,
      isCurrentMonth: !1,
      isToday: pt(E, v),
      isSelected: m ? pt(E, m) : !1,
      isDisabled: (b ? E < b : !1) || ($ ? E > $ : !1)
    });
  }
  return a;
}
let ve = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this._viewYear = (/* @__PURE__ */ new Date()).getFullYear(), this._viewMonth = (/* @__PURE__ */ new Date()).getMonth(), this._mode = "day";
  }
  connectedCallback() {
    if (super.connectedCallback(), this.value) {
      const e = qe(this.value);
      e && (this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth());
    }
  }
  /** Navigate to the month/year of a given ISO date programmatically. */
  navigateTo(e) {
    const t = qe(e);
    t && (this._viewYear = t.getFullYear(), this._viewMonth = t.getMonth());
  }
  _prevMonth() {
    this._viewMonth === 0 ? (this._viewMonth = 11, this._viewYear--) : this._viewMonth--;
  }
  _nextMonth() {
    this._viewMonth === 11 ? (this._viewMonth = 0, this._viewYear++) : this._viewMonth++;
  }
  _selectDay(e) {
    e.isDisabled || this.disabled || this.dispatchEvent(new CustomEvent("date-select", {
      detail: { value: e.iso },
      bubbles: !0,
      composed: !0
    }));
  }
  _selectYear(e) {
    this._viewYear = e, this._mode = "month";
  }
  _selectMonth(e) {
    this._viewMonth = e, this._mode = "day";
  }
  _renderDayView() {
    const e = Vs(this._viewYear, this._viewMonth, this.value ?? null, this.min ?? null, this.max ?? null);
    return l`
      <div class="header">
        <button class="nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="header-label" @click=${() => this._mode = "month"} role="button" tabindex="0"
          @keydown=${(t) => t.key === "Enter" && (this._mode = "month")}
        >
          ${ar[this._viewMonth]} ${this._viewYear}
        </span>
        <button class="nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>
      <div class="dow-row">${Us.map((t) => l`<span class="dow-cell">${t}</span>`)}</div>
      <div class="day-grid" role="grid" aria-label="Calendar">
        ${ut(e, (t) => t.iso, (t) => l`
          <button
            class=${u({
      "day-cell": !0,
      "other-month": !t.isCurrentMonth,
      today: t.isToday,
      selected: t.isSelected,
      disabled: t.isDisabled
    })}
            aria-label=${t.date.toLocaleDateString(void 0, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            aria-selected=${t.isSelected}
            aria-disabled=${t.isDisabled}
            tabindex=${t.isCurrentMonth && !t.isDisabled ? 0 : -1}
            @click=${() => this._selectDay(t)}
          >${t.day}</button>
        `)}
      </div>
    `;
  }
  _renderMonthView() {
    return l`
      <div class="header">
        <button class="nav-btn" @click=${() => this._viewYear--} aria-label="Previous year">‹</button>
        <span class="header-label" @click=${() => this._mode = "year"} role="button" tabindex="0">${this._viewYear}</span>
        <button class="nav-btn" @click=${() => this._viewYear++} aria-label="Next year">›</button>
      </div>
      <div class="month-grid">
        ${ar.map((e, t) => l`
          <button class=${u({ "month-btn": !0, "selected-month": t === this._viewMonth })}
            @click=${() => this._selectMonth(t)}>${e.slice(0, 3)}</button>
        `)}
      </div>
    `;
  }
  _renderYearView() {
    const e = (/* @__PURE__ */ new Date()).getFullYear(), t = Array.from({ length: 201 }, (r, o) => e - 100 + o);
    return l`
      <div class="header">
        <span class="header-label" style="cursor:default">Select Year</span>
      </div>
      <div class="year-grid">
        ${t.map((r) => l`
          <button class=${u({ "year-btn": !0, "selected-year": r === this._viewYear })}
            @click=${() => this._selectYear(r)}>${r}</button>
        `)}
      </div>
    `;
  }
  render() {
    return l`
      <div class="calendar">
        ${this._mode === "day" ? this._renderDayView() : this._mode === "month" ? this._renderMonthView() : this._renderYearView()}
      </div>
    `;
  }
};
ve.styles = p`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      user-select: none;
    }

    .calendar {
      width: 296px;
      background: var(--ui-surface-background, #fff);
      border-radius: var(--ui-border-radius-xl, 12px);
      overflow: hidden;
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 8px 8px;
    }
    .header-label {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--ui-text-color, #111827);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: background 0.12s;
    }
    .header-label:hover { background: rgba(0,0,0,.04); }

    .nav-btn {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%; color: var(--ui-text-color-muted, #6b7280);
      font-size: 1rem; transition: background 0.12s;
    }
    .nav-btn:hover { background: rgba(0,0,0,.06); }
    .nav-btn:disabled { opacity: 0.3; cursor: default; }

    /* Day-of-week row */
    .dow-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 8px;
      margin-bottom: 4px;
    }
    .dow-cell {
      text-align: center;
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--ui-text-color-muted, #9ca3af);
      padding: 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Day grid */
    .day-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 8px 12px;
      gap: 2px 0;
    }

    .day-cell {
      display: flex; align-items: center; justify-content: center;
      height: 36px;
      width: 100%;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%;
      font-size: 0.8125rem;
      color: var(--ui-text-color, #374151);
      transition: background 0.1s, color 0.1s;
      position: relative;
    }
    .day-cell:hover:not(.disabled):not(.selected) { background: rgba(0,0,0,.06); }
    .day-cell.other-month { color: var(--ui-text-color-muted, #d1d5db); }
    .day-cell.today:not(.selected) {
      color: var(--ui-primary-color, #3b82f6);
      font-weight: 700;
    }
    .day-cell.today:not(.selected)::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px;
      border-radius: 50%;
      background: var(--ui-primary-color, #3b82f6);
    }
    .day-cell.selected {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      font-weight: 700;
    }
    .day-cell.selected:hover { background: var(--ui-primary-color-dark, #2563eb); }
    .day-cell.disabled {
      opacity: 0.35;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Year picker overlay */
    .year-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 12px;
      max-height: 220px;
      overflow-y: auto;
    }
    .year-btn {
      padding: 8px 4px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 6px; font-size: 0.875rem;
      color: var(--ui-text-color, #374151);
      transition: background 0.12s;
    }
    .year-btn:hover { background: rgba(0,0,0,.06); }
    .year-btn.selected-year {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      font-weight: 700;
    }

    /* Month picker overlay */
    .month-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 12px;
    }
    .month-btn {
      padding: 10px 4px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 6px; font-size: 0.8125rem;
      color: var(--ui-text-color, #374151);
      transition: background 0.12s;
    }
    .month-btn:hover { background: rgba(0,0,0,.06); }
    .month-btn.selected-month {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      font-weight: 700;
    }
  `;
S([
  s({ type: String })
], ve.prototype, "value", 2);
S([
  s({ type: String })
], ve.prototype, "min", 2);
S([
  s({ type: String })
], ve.prototype, "max", 2);
S([
  s({ type: Boolean })
], ve.prototype, "disabled", 2);
S([
  g()
], ve.prototype, "_viewYear", 2);
S([
  g()
], ve.prototype, "_viewMonth", 2);
S([
  g()
], ve.prototype, "_mode", 2);
ve = S([
  d("ui-date-picker-calendar")
], ve);
let L = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "Date", this.placeholder = "MM/DD/YYYY", this.name = "", this.variant = "desktop", this.min = "", this.max = "", this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._open = !1, this._pendingValue = "";
  }
  // value being edited before OK is clicked
  // ── Computed variant ────────────────────────────────────────────────────
  get _resolvedVariant() {
    return this.variant === "auto" ? window.matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop" : this.variant;
  }
  _openPicker() {
    this.disabled || this._open || (this._pendingValue = this.value, this._open = !0);
  }
  _closePicker() {
    this._open = !1;
  }
  _handleCalendarSelect(e) {
    const t = e.detail.value, r = this._resolvedVariant;
    r === "desktop" ? (this._pendingValue = t, this._commit(t)) : r === "mobile" && (this._pendingValue = t);
  }
  _handleStaticSelect(e) {
    const t = e.detail.value;
    this._commit(t);
  }
  _commit(e) {
    if (e === this.value) {
      this._closePicker();
      return;
    }
    this.value = e, this.dispatchEvent(new CustomEvent("change", {
      detail: { value: e },
      bubbles: !0,
      composed: !0
    })), this._closePicker();
  }
  _handleMobileOk() {
    this._commit(this._pendingValue || this.value);
  }
  _handleMobileCancel() {
    this._pendingValue = this.value, this._closePicker();
  }
  _handleFieldInput(e) {
    if (this.readonly) return;
    const r = e.target.value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (r) {
      const o = `${r[3]}-${r[1]}-${r[2]}`;
      if (isNaN(new Date(o).getTime()) || this.min && o < this.min || this.max && o > this.max) return;
      this._commit(o);
    }
  }
  // ── Field ───────────────────────────────────────────────────────────────
  _renderField() {
    return l`
      ${this.label ? l`<label class="field-label" for="dp-input">${this.label}</label>` : x}
      <div class="field-wrapper">
        <input
          id="dp-input"
          class="field-input"
          type="text"
          .value=${Rs(this.value)}
          placeholder=${this.placeholder}
          name=${this.name || x}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-label=${this.label || "Date"}
          aria-haspopup="true"
          aria-expanded=${this._open}
          @input=${this._handleFieldInput}
          @focus=${() => {
      this.readonly && this._openPicker();
    }}
        />
        <button
          class="calendar-icon-btn"
          aria-label="Open date picker"
          aria-haspopup="true"
          tabindex=${this.disabled ? -1 : 0}
          @click=${this._openPicker}
        >
          📅
        </button>
      </div>
      ${this.helperText ? l`<p class="helper-text">${this.helperText}</p>` : x}
    `;
  }
  // ── Desktop variant ─────────────────────────────────────────────────────
  _renderDesktop() {
    return l`
      <div>
        <div class="popover-anchor">
          ${this._renderField()}
          <div class="click-away ${this._open ? "open" : ""}" @click=${this._closePicker}></div>
          <div class="popover ${this._open ? "open" : ""}" role="dialog" aria-label="Date picker">
            <ui-date-picker-calendar
              .value=${this.value}
              .min=${this.min}
              .max=${this.max}
              ?disabled=${this.disabled}
              @date-select=${this._handleCalendarSelect}
            ></ui-date-picker-calendar>
          </div>
        </div>
      </div>
    `;
  }
  // ── Mobile variant ──────────────────────────────────────────────────────
  _renderMobile() {
    return l`
      <div>
        ${this._renderField()}
        <ui-dialog
          .open=${this._open}
          disable-backdrop-close
          @close=${this._closePicker}
          style="--ui-dialog-width:320px"
        >
          <ui-dialog-title>Select Date</ui-dialog-title>
          <ui-dialog-content style="padding:0 12px 4px;">
            <ui-date-picker-calendar
              .value=${this._pendingValue || this.value}
              .min=${this.min}
              .max=${this.max}
              ?disabled=${this.disabled}
              @date-select=${this._handleCalendarSelect}
            ></ui-date-picker-calendar>
          </ui-dialog-content>
          <ui-dialog-actions>
            <button class="action-btn cancel" @click=${this._handleMobileCancel}>Cancel</button>
            <button class="action-btn ok" @click=${this._handleMobileOk}>OK</button>
          </ui-dialog-actions>
        </ui-dialog>
      </div>
    `;
  }
  // ── Static variant ──────────────────────────────────────────────────────
  _renderStatic() {
    return l`
      <div class="static-wrapper">
        <ui-date-picker-calendar
          .value=${this.value}
          .min=${this.min}
          .max=${this.max}
          ?disabled=${this.disabled}
          @date-select=${this._handleStaticSelect}
        ></ui-date-picker-calendar>
      </div>
    `;
  }
  render() {
    const e = this._resolvedVariant;
    return e === "static" ? this._renderStatic() : e === "mobile" ? this._renderMobile() : this._renderDesktop();
  }
};
L.styles = p`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    /* ── Field ─────────────────────────────────────────────────────── */
    .field-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .field-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 4px;
    }

    .field-input {
      font-family: inherit;
      font-size: 0.9375rem;
      color: var(--ui-text-color, #111827);
      background: var(--ui-surface-background, #fff);
      border: 1.5px solid var(--ui-border-color, #d1d5db);
      border-radius: var(--ui-border-radius-md, 8px);
      padding: 10px 44px 10px 14px;
      width: 180px;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      box-sizing: border-box;
      cursor: text;
    }
    .field-input::placeholder { color: var(--ui-text-color-muted, #9ca3af); }
    .field-input:focus {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59,130,246,.15);
    }
    :host([disabled]) .field-input {
      background: var(--ui-disabled-bg, #f9fafb);
      color: var(--ui-text-color-muted, #9ca3af);
      cursor: not-allowed;
      border-color: var(--ui-border-color, #e5e7eb);
    }
    :host([readonly]) .field-input { cursor: default; }

    .calendar-icon-btn {
      position: absolute;
      right: 10px;
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%; color: var(--ui-text-color-muted, #6b7280);
      transition: background 0.12s, color 0.12s;
      font-size: 1rem;
    }
    .calendar-icon-btn:hover { background: rgba(0,0,0,.06); color: var(--ui-primary-color, #3b82f6); }
    :host([disabled]) .calendar-icon-btn { pointer-events: none; opacity: 0.4; }
    :host([readonly]) .calendar-icon-btn { pointer-events: none; }

    /* Error state */
    :host([error]) .field-input {
      border-color: var(--ui-error-color, #ef4444);
    }
    :host([error]) .field-input:focus {
      box-shadow: 0 0 0 3px rgba(239,68,68,.15);
    }
    .helper-text {
      font-size: 0.75rem;
      margin-top: 4px;
      color: var(--ui-text-color-muted, #6b7280);
    }
    :host([error]) .helper-text { color: var(--ui-error-color, #ef4444); }

    /* ── Desktop popover ───────────────────────────────────────────── */
    .popover-anchor {
      position: relative;
      display: inline-block;
    }

    .popover {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 1400;
      background: var(--ui-surface-background, #fff);
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: 0 8px 24px -4px rgba(0,0,0,.18), 0 2px 8px -2px rgba(0,0,0,.1);
      transform-origin: top left;
      transform: scale(0.94) translateY(-4px);
      opacity: 0;
      visibility: hidden;
      transition: transform 0.15s cubic-bezier(0.4,0,.2,1),
                  opacity 0.15s, visibility 0.15s;
      pointer-events: none;
    }
    .popover.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    /* Popover actions row */
    .popover-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 4px 12px 12px;
      border-top: 1px solid var(--ui-border-color, #f3f4f6);
    }
    .action-btn {
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 6px 14px;
      border: none; border-radius: 6px; cursor: pointer;
      transition: background 0.12s;
    }
    .action-btn.cancel {
      background: transparent;
      color: var(--ui-text-color-muted, #6b7280);
    }
    .action-btn.cancel:hover { background: rgba(0,0,0,.06); }
    .action-btn.ok {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
    }
    .action-btn.ok:hover { background: var(--ui-primary-color-dark, #2563eb); }

    /* ── Static ─────────────────────────────────────────────────────── */
    .static-wrapper {
      display: inline-block;
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: 0 1px 4px rgba(0,0,0,.08), 0 0 0 1px var(--ui-border-color, #e5e7eb);
      overflow: hidden;
    }

    /* ── Click-away backdrop (desktop) ──────────────────────────────── */
    .click-away {
      display: none;
      position: fixed; inset: 0; z-index: 1399;
    }
    .click-away.open { display: block; }
  `;
S([
  s({ type: String })
], L.prototype, "value", 2);
S([
  s({ type: String })
], L.prototype, "label", 2);
S([
  s({ type: String })
], L.prototype, "placeholder", 2);
S([
  s({ type: String })
], L.prototype, "name", 2);
S([
  s({ type: String })
], L.prototype, "variant", 2);
S([
  s({ type: String })
], L.prototype, "min", 2);
S([
  s({ type: String })
], L.prototype, "max", 2);
S([
  s({ type: Boolean, reflect: !0 })
], L.prototype, "disabled", 2);
S([
  s({ type: Boolean, reflect: !0 })
], L.prototype, "readonly", 2);
S([
  s({ type: Boolean, reflect: !0 })
], L.prototype, "error", 2);
S([
  s({ type: String, attribute: "helper-text" })
], L.prototype, "helperText", 2);
S([
  g()
], L.prototype, "_open", 2);
S([
  g()
], L.prototype, "_pendingValue", 2);
L = S([
  d("ui-date-picker")
], L);
var Fs = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, U = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ys(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Fs(t, r, i), i;
};
function oi(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
function si(e, t) {
  return e < 1 || e > 12 ? 31 : new Date(t || 2e3, e, 0).getDate();
}
function qs(e) {
  if (!e) return { m: null, d: null, y: null };
  const t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return t ? { y: parseInt(t[1]), m: parseInt(t[2]), d: parseInt(t[3]) } : { m: null, d: null, y: null };
}
function nr(e, t, r) {
  return e === null || t === null || r === null ? "" : `${String(r).padStart(4, "0")}-${String(e).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
const Oe = ["month", "day", "year"];
let z = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "", this.name = "", this.min = "", this.max = "", this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._internals = this.attachInternals(), this._month = null, this._day = null, this._year = null, this._active = null, this._focused = !1, this._buf = "";
  }
  // digit accumulation buffer for the active segment
  // Sync controlled value → segments before each render (willUpdate avoids a double-render cycle)
  willUpdate(e) {
    if (e.has("value")) {
      const { m: t, d: r, y: o } = qs(this.value);
      this._month = t, this._day = r, this._year = o;
    }
  }
  updated() {
    this._syncFormValue();
  }
  // ── Public API ───────────────────────────────────────────────────────────
  /** Clears all three segments and fires 'clear'. */
  clear() {
    this._month = null, this._day = null, this._year = null, this._buf = "", this._internals.setFormValue?.(null), this.dispatchEvent(new CustomEvent("clear", { bubbles: !0, composed: !0 }));
  }
  // ── Form value sync ──────────────────────────────────────────────────────
  _syncFormValue() {
    const e = nr(this._month, this._day, this._year);
    this._internals.setFormValue?.(e || null);
  }
  // ── Internal: segment navigation ─────────────────────────────────────────
  _setActive(e) {
    this.disabled || this.readonly || (this._commitPartialBuffer(), this._active = e, this._buf = "");
  }
  _commitPartialBuffer() {
    if (!this._buf || !this._active) return;
    const e = parseInt(this._buf);
    if (!isNaN(e)) {
      if (this._active === "month" && e >= 1 && e <= 12)
        this._month = e;
      else if (this._active === "day") {
        const t = si(this._month ?? 1, this._year ?? 2e3);
        e >= 1 && e <= t && (this._day = e);
      }
    }
  }
  _nextSegment() {
    if (!this._active) {
      this._setActive("month");
      return;
    }
    const e = Oe.indexOf(this._active);
    e < Oe.length - 1 && this._setActive(Oe[e + 1]);
  }
  _prevSegment() {
    if (!this._active) return;
    const e = Oe.indexOf(this._active);
    e > 0 && this._setActive(Oe[e - 1]);
  }
  _canGoNext() {
    return this._active ? Oe.indexOf(this._active) < Oe.length - 1 : !0;
  }
  _canGoPrev() {
    return this._active ? Oe.indexOf(this._active) > 0 : !1;
  }
  // ── Internal: digit handling ─────────────────────────────────────────────
  _handleDigit(e) {
    this._active || this._setActive("month");
    const t = this._active, r = this._buf + String(e);
    if (t === "month")
      if (r.length === 1)
        e >= 2 && e <= 9 ? (this._month = e, this._buf = "", this._nextSegment()) : this._buf = r;
      else {
        const o = parseInt(r);
        o >= 1 && o <= 12 ? (this._month = o, this._buf = "", this._nextSegment()) : (this._buf = String(e), e >= 2 && e <= 9 && (this._month = e, this._buf = "", this._nextSegment()));
      }
    else if (t === "day") {
      const o = si(this._month ?? 1, this._year ?? 2e3);
      if (r.length === 1)
        e >= 4 && e <= 9 ? (this._day = e, this._buf = "", this._nextSegment()) : this._buf = r;
      else {
        const i = parseInt(r);
        i >= 1 && i <= o ? (this._day = i, this._buf = "", this._nextSegment()) : (this._buf = String(e), e >= 4 && e <= 9 && (this._day = e, this._buf = "", this._nextSegment()));
      }
    } else t === "year" && (this._buf = r.slice(-4), this._buf.length === 4 && (this._year = parseInt(this._buf), this._buf = "", this._checkAndEmit()));
  }
  // ── Internal: increment / decrement ──────────────────────────────────────
  _adjust(e) {
    const t = this._active;
    if (t) {
      if (this._buf = "", t === "month") {
        const r = this._month ?? (e > 0 ? 0 : 13);
        this._month = oi(r + e, 1, 12), this._day !== null && (this._day = oi(this._day, 1, si(this._month, this._year ?? 2e3)));
      } else if (t === "day") {
        const r = si(this._month ?? 1, this._year ?? 2e3), o = this._day ?? (e > 0 ? 0 : r + 1);
        this._day = oi(o + e, 1, r);
      } else if (t === "year") {
        const r = this._year ?? (/* @__PURE__ */ new Date()).getFullYear();
        this._year = oi(r + e, 1, 9999);
      }
      this._checkAndEmit();
    }
  }
  // ── Internal: emit when a full date is ready ──────────────────────────────
  _checkAndEmit() {
    const e = nr(this._month, this._day, this._year);
    e && e !== this.value && (this.value = e, this.dispatchEvent(new CustomEvent("change", {
      detail: { value: e },
      bubbles: !0,
      composed: !0
    })));
  }
  // ── Internal: keyboard handler ────────────────────────────────────────────
  _handleKeyDown(e) {
    if (!(this.disabled || this.readonly)) {
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault(), e.stopPropagation(), this._active || this._setActive("month"), this._handleDigit(parseInt(e.key));
        return;
      }
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault(), e.stopPropagation(), this._prevSegment();
          break;
        case "ArrowRight":
        case "/":
          e.preventDefault(), e.stopPropagation(), this._nextSegment();
          break;
        case "ArrowUp":
          e.preventDefault(), e.stopPropagation(), this._active || this._setActive("month"), this._adjust(1);
          break;
        case "ArrowDown":
          e.preventDefault(), e.stopPropagation(), this._active || this._setActive("month"), this._adjust(-1);
          break;
        case "Tab":
          !e.shiftKey && this._canGoNext() ? (e.preventDefault(), e.stopPropagation(), this._nextSegment()) : e.shiftKey && this._canGoPrev() && (e.preventDefault(), e.stopPropagation(), this._prevSegment());
          break;
        case "Backspace":
        case "Delete":
          e.preventDefault(), e.stopPropagation(), this._buf = "", this._active === "month" ? this._month = null : this._active === "day" ? this._day = null : this._active === "year" && (this._year = null);
          break;
        case "Escape":
          e.preventDefault(), e.stopPropagation(), this.clear();
          break;
      }
    }
  }
  _handleFocus() {
    this._focused = !0, this._active || this._setActive("month");
  }
  _handleBlur(e) {
    this.shadowRoot?.contains(e.relatedTarget) || (this._commitPartialBuffer(), this._focused = !1, this._active = null, this._buf = "");
  }
  _handleContainerClick(e) {
    if (this.disabled || this.readonly) return;
    e.target.classList.contains("segments") && (this._setActive("month"), this.shadowRoot?.querySelector(".segments")?.focus());
  }
  // ── Rendering ─────────────────────────────────────────────────────────────
  _segmentText(e) {
    const t = this._active === e && !this.disabled;
    return e === "month" ? t && this._buf ? { text: this._buf.padEnd(2, "_"), isPlaceholder: !1 } : this._month !== null ? { text: String(this._month).padStart(2, "0"), isPlaceholder: !1 } : { text: "MM", isPlaceholder: !0 } : e === "day" ? t && this._buf ? { text: this._buf.padEnd(2, "_"), isPlaceholder: !1 } : this._day !== null ? { text: String(this._day).padStart(2, "0"), isPlaceholder: !1 } : { text: "DD", isPlaceholder: !0 } : t && this._buf ? { text: this._buf.padEnd(4, "_"), isPlaceholder: !1 } : this._year !== null ? { text: String(this._year).padStart(4, "0"), isPlaceholder: !1 } : { text: "YYYY", isPlaceholder: !0 };
  }
  _hasValue() {
    return this._month !== null || this._day !== null || this._year !== null;
  }
  render() {
    const e = u({ "field-label": !0, focused: this._focused }), t = u({ "field-container": !0, focused: this._focused }), r = (o, i = "") => {
      const { text: a, isPlaceholder: n } = this._segmentText(o);
      return l`<span
        class=${u({
        segment: !0,
        [o]: !0,
        active: this._active === o,
        placeholder: n,
        [`segment-${o}`]: !0,
        [i]: !!i
      })}
        @click=${(h) => {
        h.stopPropagation(), this._setActive(o), this.shadowRoot?.querySelector(".segments")?.focus();
      }}
      >${a}</span>`;
    };
    return l`
      ${this.label ? l`<label class=${e}>${this.label}</label>` : x}

      <div class=${t} @click=${this._handleContainerClick}>

        <div
          class="segments"
          role="group"
          aria-label=${this.label || "Date"}
          tabindex=${this.disabled ? -1 : 0}
          @keydown=${this._handleKeyDown}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        >
          ${r("month")}
          <span class="separator">/</span>
          ${r("day")}
          <span class="separator">/</span>
          ${r("year", "segment-year")}
        </div>

        <div class="field-actions">
          ${this._hasValue() && !this.disabled && !this.readonly ? l`
            <button class="icon-btn" aria-label="Clear date" tabindex="-1"
              @click=${(o) => {
      o.stopPropagation(), this.clear();
    }}>✕</button>
          ` : x}
        </div>
      </div>

      ${this.helperText ? l`<small class="helper">${this.helperText}</small>` : x}
    `;
  }
};
z.formAssociated = !0;
z.styles = p`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    /* ── Label ────────────────────────────────────────────────────────── */
    .field-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 5px;
      transition: color 0.15s;
    }
    :host([error]) .field-label { color: var(--ui-error-color, #ef4444); }
    .field-label.focused { color: var(--ui-primary-color, #3b82f6); }
    :host([error]) .field-label.focused { color: var(--ui-error-color, #ef4444); }

    /* ── Field container ─────────────────────────────────────────────── */
    .field-container {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--ui-surface-background, #ffffff);
      border: 1.5px solid var(--ui-border-color, #d1d5db);
      border-radius: var(--ui-border-radius-md, 8px);
      padding: 0 10px;
      height: 44px;
      min-width: 200px;
      cursor: text;
      box-sizing: border-box;
      transition: border-color 0.15s, box-shadow 0.15s;
      position: relative;
    }
    .field-container.focused {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59,130,246,.15);
    }
    :host([error]) .field-container {
      border-color: var(--ui-error-color, #ef4444);
    }
    :host([error]) .field-container.focused {
      box-shadow: 0 0 0 3px rgba(239,68,68,.15);
    }
    :host([disabled]) .field-container {
      background: var(--ui-disabled-bg, #f9fafb);
      border-color: var(--ui-border-color, #e5e7eb);
      cursor: not-allowed;
    }
    :host([readonly]) .field-container { cursor: default; }

    /* ── Segments row ────────────────────────────────────────────────── */
    .segments {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 1px;
      outline: none;
      min-height: 100%;
    }

    .segment {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      padding: 2px 4px;
      font-size: 0.9375rem;
      font-variant-numeric: tabular-nums;
      color: var(--ui-text-color, #111827);
      min-width: 2ch;
      line-height: 1;
      transition: background 0.1s;
      cursor: text;
      user-select: none;
    }
    .segment.placeholder { color: var(--ui-text-color-muted, #9ca3af); }
    .segment.active {
      background: var(--ui-primary-color, #3b82f6);
      color: #fff;
      border-radius: 3px;
    }
    :host([disabled]) .segment {
      color: var(--ui-text-color-muted, #9ca3af);
    }
    :host([disabled]) .segment.active {
      background: var(--ui-border-color, #e5e7eb);
      color: var(--ui-text-color-muted, #9ca3af);
    }

    .segment-year { min-width: 4ch; }

    .separator {
      color: var(--ui-text-color-muted, #6b7280);
      font-size: 0.9375rem;
      pointer-events: none;
      line-height: 1;
    }

    /* ── Clear + Calendar icon ───────────────────────────────────────── */
    .field-actions {
      display: flex;
      align-items: center;
      gap: 2px;
      margin-left: auto;
    }

    .icon-btn {
      display: flex; align-items: center; justify-content: center;
      width: 24px; height: 24px;
      border: none; background: transparent; cursor: pointer;
      border-radius: 50%;
      color: var(--ui-text-color-muted, #6b7280);
      font-size: 0.875rem;
      transition: background 0.12s, color 0.12s;
      flex-shrink: 0;
      padding: 0;
    }
    .icon-btn:hover { background: rgba(0,0,0,.06); color: var(--ui-text-color, #374151); }
    :host([disabled]) .icon-btn { pointer-events: none; opacity: 0; }

    /* ── Helper text ─────────────────────────────────────────────────── */
    .helper {
      display: block;
      font-size: 0.75rem;
      margin-top: 5px;
      color: var(--ui-text-color-muted, #6b7280);
    }
    :host([error]) .helper { color: var(--ui-error-color, #ef4444); }
  `;
U([
  s({ type: String })
], z.prototype, "value", 2);
U([
  s({ type: String })
], z.prototype, "label", 2);
U([
  s({ type: String, reflect: !0 })
], z.prototype, "name", 2);
U([
  s({ type: String })
], z.prototype, "min", 2);
U([
  s({ type: String })
], z.prototype, "max", 2);
U([
  s({ type: Boolean, reflect: !0 })
], z.prototype, "disabled", 2);
U([
  s({ type: Boolean, reflect: !0 })
], z.prototype, "readonly", 2);
U([
  s({ type: Boolean, reflect: !0 })
], z.prototype, "error", 2);
U([
  s({ type: String, attribute: "helper-text" })
], z.prototype, "helperText", 2);
U([
  g()
], z.prototype, "_month", 2);
U([
  g()
], z.prototype, "_day", 2);
U([
  g()
], z.prototype, "_year", 2);
U([
  g()
], z.prototype, "_active", 2);
U([
  g()
], z.prototype, "_focused", 2);
U([
  g()
], z.prototype, "_buf", 2);
z = U([
  d("ui-date-field")
], z);
var Hs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, f = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ks(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Hs(t, r, i), i;
};
function j(e) {
  return String(e).padStart(2, "0");
}
function Ci(e) {
  if (!e) return null;
  const t = e.split(":").map(Number);
  return t.length < 2 || t.some(isNaN) ? null : { h: t[0], m: t[1], s: t[2] ?? 0 };
}
function Ue(e, t, r = 0) {
  return `${j(e)}:${j(t)}:${j(r)}`;
}
function ne(e) {
  return { hour: e % 12 || 12, ampm: e < 12 ? "AM" : "PM" };
}
function ht(e, t) {
  return t === "AM" ? e === 12 ? 0 : e : e === 12 ? 12 : e + 12;
}
function Ws(e, t, r = !1) {
  const o = Ci(e);
  if (!o) return "";
  const i = t ? ne(o.h).hour : o.h, a = t ? ` ${ne(o.h).ampm}` : "";
  return `${j(i)}:${j(o.m)}${r ? ":" + j(o.s) : ""}${a}`;
}
function Xs(e, t, r, o = 140, i = 140) {
  const a = (e / t - 0.25) * Math.PI * 2;
  return { x: o + r * Math.cos(a), y: i + r * Math.sin(a) };
}
function Gs(e, t, r = 140, o = 140) {
  let i = Math.atan2(t - o, e - r) * 180 / Math.PI + 90;
  return i < 0 && (i += 360), i;
}
let B = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "", this.ampm = !0, this.seconds = !1, this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._h = null, this._m = null, this._s = null, this._mer = "AM", this._active = null, this._focused = !1, this._buf = "";
  }
  get _segs() {
    const e = ["hour", "minute"];
    return this.seconds && e.push("second"), this.ampm && e.push("meridiem"), e;
  }
  willUpdate(e) {
    if (e.has("value") && this.value) {
      const t = Ci(this.value);
      if (t) {
        const { hour: r, ampm: o } = ne(t.h);
        this._h = this.ampm ? r : t.h, this._m = t.m, this._s = t.s, this._mer = o;
      }
    }
  }
  clear() {
    this._h = null, this._m = null, this._s = null, this._buf = "", this.dispatchEvent(new CustomEvent("clear", { bubbles: !0, composed: !0 }));
  }
  _emit() {
    if (this._h === null || this._m === null) return;
    const e = this.ampm ? ht(this._h, this._mer) : this._h, t = Ue(e, this._m, this._s ?? 0);
    t !== this.value && (this.value = t, this.dispatchEvent(new CustomEvent("change", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  _commitBuf() {
    if (!this._buf || !this._active) return;
    const e = parseInt(this._buf);
    if (isNaN(e)) return;
    const t = this.ampm ? 12 : 23;
    this._active === "hour" && e >= (this.ampm ? 1 : 0) && e <= t ? this._h = e : this._active === "minute" && e >= 0 && e <= 59 ? this._m = e : this._active === "second" && e >= 0 && e <= 59 && (this._s = e), this._emit();
  }
  _setActive(e) {
    this._commitBuf(), this._active = e, this._buf = "";
  }
  _next() {
    const e = this._segs, t = e.indexOf(this._active);
    t < e.length - 1 && this._setActive(e[t + 1]);
  }
  _prev() {
    const e = this._segs, t = e.indexOf(this._active);
    t > 0 && this._setActive(e[t - 1]);
  }
  _canNext() {
    const e = this._segs;
    return e.indexOf(this._active) < e.length - 1;
  }
  _canPrev() {
    return this._segs.indexOf(this._active) > 0;
  }
  _digit(e) {
    if (this._active || this._setActive("hour"), this._active === "meridiem") return;
    const t = this._buf + e, r = this.ampm ? 12 : 23;
    if (this._active === "hour")
      if (t.length === 1) {
        const o = this.ampm ? 2 : 3;
        e >= o ? (this._h = e, this._buf = "", this._next()) : this._buf = t;
      } else {
        const o = parseInt(t);
        o >= (this.ampm ? 1 : 0) && o <= r ? (this._h = o, this._buf = "", this._next()) : (this._buf = String(e), e >= (this.ampm ? 2 : 3) && (this._h = e, this._buf = "", this._next()));
      }
    else if (this._active === "minute" || this._active === "second")
      if (t.length === 1)
        e >= 6 ? (this[this._active === "minute" ? "_m" : "_s"] = e, this._buf = "", this._next()) : this._buf = t;
      else {
        const o = parseInt(t);
        o >= 0 && o <= 59 ? (this[this._active === "minute" ? "_m" : "_s"] = o, this._buf = "", this._next()) : (this._buf = String(e), e >= 6 && (this[this._active === "minute" ? "_m" : "_s"] = e, this._buf = "", this._next()));
      }
    this._emit();
  }
  _adjust(e) {
    this._buf = "";
    const t = this.ampm ? 12 : 23, r = this.ampm ? 1 : 0;
    this._active === "hour" ? this._h = Math.min(t, Math.max(r, (this._h ?? (e > 0 ? r - 1 : t + 1)) + e)) : this._active === "minute" ? this._m = ((this._m ?? (e > 0 ? -1 : 60)) + e + 60) % 60 : this._active === "second" ? this._s = ((this._s ?? (e > 0 ? -1 : 60)) + e + 60) % 60 : this._active === "meridiem" && (this._mer = this._mer === "AM" ? "PM" : "AM"), this._emit();
  }
  _onKey(e) {
    if (!(this.disabled || this.readonly)) {
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault(), e.stopPropagation(), this._active || this._setActive("hour"), this._digit(+e.key);
        return;
      }
      if ((e.key === "a" || e.key === "A") && this.ampm && !e.metaKey) {
        e.preventDefault(), e.stopPropagation(), this._mer = "AM", this._emit();
        return;
      }
      if ((e.key === "p" || e.key === "P") && this.ampm && !e.metaKey) {
        e.preventDefault(), e.stopPropagation(), this._mer = "PM", this._emit();
        return;
      }
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault(), e.stopPropagation(), this._prev();
          break;
        case "ArrowRight":
        case ":":
          e.preventDefault(), e.stopPropagation(), this._next();
          break;
        case "ArrowUp":
          e.preventDefault(), e.stopPropagation(), this._active || this._setActive("hour"), this._adjust(1);
          break;
        case "ArrowDown":
          e.preventDefault(), e.stopPropagation(), this._active || this._setActive("hour"), this._adjust(-1);
          break;
        case "Tab":
          !e.shiftKey && this._canNext() ? (e.preventDefault(), e.stopPropagation(), this._next()) : e.shiftKey && this._canPrev() && (e.preventDefault(), e.stopPropagation(), this._prev());
          break;
        case "Backspace":
        case "Delete":
          e.preventDefault(), e.stopPropagation(), this._buf = "", this._active === "hour" ? this._h = null : this._active === "minute" ? this._m = null : this._active === "second" && (this._s = null);
          break;
        case "Escape":
          e.preventDefault(), e.stopPropagation(), this.clear();
          break;
      }
    }
  }
  _segText(e) {
    const t = this._active === e;
    if (e === "meridiem") return { text: this._mer, ph: !1 };
    if (t && this._buf) {
      const r = (e === "hour" && this.ampm, 2);
      return { text: this._buf.padEnd(r, "_"), ph: !1 };
    }
    return e === "hour" ? this._h !== null ? { text: j(this._h), ph: !1 } : { text: "HH", ph: !0 } : e === "minute" ? this._m !== null ? { text: j(this._m), ph: !1 } : { text: "MM", ph: !0 } : this._s !== null ? { text: j(this._s), ph: !1 } : { text: "SS", ph: !0 };
  }
  render() {
    const e = this._h !== null || this._m !== null;
    return l`
      ${this.label ? l`<label class="label ${this._focused ? "focused" : ""}">${this.label}</label>` : x}
      <div class="container ${this._focused ? "focused" : ""}">
        <div class="segments" tabindex=${this.disabled ? -1 : 0} role="group" aria-label=${this.label || "Time"}
          @keydown=${this._onKey}
          @focus=${() => {
      this._focused = !0, this._active || this._setActive("hour");
    }}
          @blur=${(t) => {
      this.shadowRoot?.contains(t.relatedTarget) || (this._focused = !1, this._active = null, this._buf = "");
    }}
        >
          ${this._segs.map((t, r) => {
      const { text: o, ph: i } = this._segText(t), a = r > 0 && t !== "meridiem" ? l`<span class="sep">:</span>` : t === "meridiem" ? l`<span class="sep"> </span>` : x;
      return l`${a}<span
              class=${u({ seg: !0, active: this._active === t, placeholder: i, meridiem: t === "meridiem" })}
              @click=${(n) => {
        n.stopPropagation(), this._setActive(t), this.shadowRoot?.querySelector(".segments")?.focus();
      }}
            >${o}</span>`;
    })}
        </div>
        ${e && !this.disabled ? l`<button class="icon-btn" tabindex="-1" aria-label="Clear" @click=${(t) => {
      t.stopPropagation(), this.clear();
    }}>✕</button>` : x}
      </div>
      ${this.helperText ? l`<small class="helper">${this.helperText}</small>` : x}
    `;
  }
};
B.styles = p`
    :host { display: inline-block; font-family: var(--ui-font-family,'Inter',sans-serif); }
    .label { display:block; font-size:.75rem; font-weight:500; color:var(--ui-text-color-muted,#6b7280); margin-bottom:5px; }
    .label.focused { color:var(--ui-primary-color,#3b82f6); }
    :host([error]) .label { color:var(--ui-error-color,#ef4444); }
    .container {
      display:inline-flex; align-items:center; gap:4px;
      background:var(--ui-surface-background,#fff);
      border:1.5px solid var(--ui-border-color,#d1d5db);
      border-radius:var(--ui-border-radius-md,8px);
      padding:0 10px; height:44px; min-width:160px;
      cursor:text; box-sizing:border-box; transition:border-color .15s,box-shadow .15s;
    }
    .container.focused { border-color:var(--ui-primary-color,#3b82f6); box-shadow:0 0 0 3px rgba(59,130,246,.15); }
    :host([error]) .container { border-color:var(--ui-error-color,#ef4444); }
    :host([disabled]) .container { background:var(--ui-disabled-bg,#f9fafb); border-color:#e5e7eb; cursor:not-allowed; }
    .segments { display:flex; align-items:center; flex:1; gap:1px; outline:none; min-height:100%; }
    .seg {
      display:inline-flex; align-items:center; justify-content:center;
      border-radius:3px; padding:2px 4px; font-size:.9375rem;
      font-variant-numeric:tabular-nums; color:var(--ui-text-color,#111827);
      min-width:2ch; line-height:1; cursor:text; user-select:none; transition:background .1s;
    }
    .seg.active { background:var(--ui-primary-color,#3b82f6); color:#fff; }
    .seg.placeholder { color:var(--ui-text-color-muted,#9ca3af); }
    .seg.meridiem { min-width:3ch; }
    .sep { color:var(--ui-text-color-muted,#6b7280); font-size:.9375rem; pointer-events:none; }
    .icon-btn {
      display:flex; align-items:center; justify-content:center; width:24px; height:24px;
      border:none; background:transparent; cursor:pointer; border-radius:50%;
      color:var(--ui-text-color-muted,#6b7280); font-size:.875rem; margin-left:auto;
      transition:background .12s;
    }
    .icon-btn:hover { background:rgba(0,0,0,.06); }
    .helper { display:block; font-size:.75rem; margin-top:5px; color:var(--ui-text-color-muted,#6b7280); }
    :host([error]) .helper { color:var(--ui-error-color,#ef4444); }
  `;
f([
  s({ type: String })
], B.prototype, "value", 2);
f([
  s({ type: String })
], B.prototype, "label", 2);
f([
  s({ type: Boolean })
], B.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], B.prototype, "seconds", 2);
f([
  s({ type: Boolean, reflect: !0 })
], B.prototype, "disabled", 2);
f([
  s({ type: Boolean, reflect: !0 })
], B.prototype, "readonly", 2);
f([
  s({ type: Boolean, reflect: !0 })
], B.prototype, "error", 2);
f([
  s({ type: String, attribute: "helper-text" })
], B.prototype, "helperText", 2);
f([
  g()
], B.prototype, "_h", 2);
f([
  g()
], B.prototype, "_m", 2);
f([
  g()
], B.prototype, "_s", 2);
f([
  g()
], B.prototype, "_mer", 2);
f([
  g()
], B.prototype, "_active", 2);
f([
  g()
], B.prototype, "_focused", 2);
f([
  g()
], B.prototype, "_buf", 2);
B = f([
  d("ui-time-field")
], B);
let Ct = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.step = 30, this.ampm = !0;
  }
  _items() {
    const e = [];
    for (let t = 0; t < 1440; t += this.step) {
      const r = Math.floor(t / 60), o = t % 60;
      e.push(Ue(r, o));
    }
    return e;
  }
  _label(e) {
    return Ws(e, this.ampm);
  }
  updated() {
    const e = this.shadowRoot?.querySelector(".selected");
    e && typeof e.scrollIntoView == "function" && e.scrollIntoView({ block: "center" });
  }
  render() {
    const e = this._items();
    return l`
      <div class="clock" role="listbox" aria-label="Select time">
        ${ut(e, (t) => t, (t) => l`
          <button class=${u({ item: !0, selected: t === this.value })}
            role="option" aria-selected=${t === this.value}
            @click=${() => {
      this.dispatchEvent(new CustomEvent("change", { detail: { value: t }, bubbles: !0, composed: !0 }));
    }}
          >${this._label(t)}</button>
        `)}
      </div>
    `;
  }
};
Ct.styles = p`
    :host { display:block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .clock {
      overflow-y:auto; max-height:var(--ui-digital-clock-height,300px);
      padding:4px 0; scrollbar-width:thin;
    }
    .item {
      display:flex; align-items:center; justify-content:center;
      padding:10px 16px; font-size:.9375rem; color:var(--ui-text-color,#374151);
      cursor:pointer; border:none; background:transparent; width:100%;
      box-sizing:border-box; transition:background .1s; font-family:inherit;
      border-radius:0; font-variant-numeric:tabular-nums;
    }
    .item:hover { background:rgba(0,0,0,.05); }
    .item.selected {
      background:var(--ui-primary-color,#3b82f6); color:#fff; font-weight:600; border-radius:6px;
    }
  `;
f([
  s({ type: String })
], Ct.prototype, "value", 2);
f([
  s({ type: Number })
], Ct.prototype, "step", 2);
f([
  s({ type: Boolean })
], Ct.prototype, "ampm", 2);
Ct = f([
  d("ui-digital-clock")
], Ct);
let It = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  _t() {
    return Ci(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  _set(e, t, r) {
    const o = Ue(e, t, r);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _col(e) {
    const t = this._t(), r = ne(t.h);
    if (e === "mer")
      return l`
        <div class="col">
          <div class="col-header">AM/PM</div>
          ${["AM", "PM"].map((n) => l`
            <button class=${u({ item: !0, sel: r.ampm === n })}
              @click=${() => this._set(ht(r.hour, n), t.m, t.s)}>${n}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;
    const o = Array.from({ length: 12 }, (n, h) => h + 1), i = Array.from({ length: 24 }, (n, h) => h), a = Array.from({ length: 60 }, (n, h) => h);
    if (e === "h") {
      const n = this.ampm ? o : i, h = this.ampm ? r.hour : t.h;
      return l`
        <div class="col">
          <div class="col-header">Hr</div>
          ${n.map((v) => l`
            <button class=${u({ item: !0, sel: h === v })}
              @click=${() => {
        const m = this.ampm ? ht(v, r.ampm) : v;
        this._set(m, t.m, t.s);
      }}>${j(v)}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;
    }
    return e === "m" ? l`
      <div class="col">
        <div class="col-header">Min</div>
        ${a.map((n) => l`
          <button class=${u({ item: !0, sel: t.m === n })}
            @click=${() => this._set(t.h, n, t.s)}>${j(n)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    ` : l`
      <div class="col">
        <div class="col-header">Sec</div>
        ${a.map((n) => l`
          <button class=${u({ item: !0, sel: t.s === n })}
            @click=${() => this._set(t.h, t.m, n)}>${j(n)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    `;
  }
  updated() {
    this.shadowRoot?.querySelectorAll(".col").forEach((e) => {
      const t = e.querySelector(".sel");
      t && typeof t.scrollIntoView == "function" && t.scrollIntoView({ block: "center" });
    });
  }
  render() {
    return l`
      <div class="msdc">
        ${this._col("h")}
        ${this._col("m")}
        ${this.seconds ? this._col("s") : x}
        ${this.ampm ? this._col("mer") : x}
      </div>
    `;
  }
};
It.styles = p`
    :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .msdc { display:flex; gap:0; border-radius:var(--ui-border-radius-xl,12px); overflow:hidden; }
    .col {
      display:flex; flex-direction:column; overflow-y:auto; width:72px;
      max-height:var(--ui-msdc-height,240px); position:relative; scrollbar-width:none;
    }
    .col::-webkit-scrollbar { display:none; }
    .col + .col { border-left:1px solid var(--ui-border-color,#f3f4f6); }
    .col-header {
      position:sticky; top:0; background:var(--ui-surface-background,#fff);
      font-size:.65rem; font-weight:700; text-transform:uppercase;
      letter-spacing:.06em; color:var(--ui-text-color-muted,#9ca3af);
      text-align:center; padding:6px 0 4px; border-bottom:1px solid var(--ui-border-color,#f3f4f6);
      z-index:1;
    }
    .item {
      display:flex; align-items:center; justify-content:center;
      padding:8px 4px; font-size:.9375rem; font-variant-numeric:tabular-nums;
      color:var(--ui-text-color,#374151); cursor:pointer; border:none;
      background:transparent; font-family:inherit; width:100%; line-height:1; transition:background .1s;
    }
    .item:hover { background:rgba(0,0,0,.05); }
    .item.sel { background:var(--ui-primary-color,#3b82f6); color:#fff; font-weight:700; border-radius:6px; }
    .col-spacer { min-height:80px; }
  `;
f([
  s({ type: String })
], It.prototype, "value", 2);
f([
  s({ type: Boolean })
], It.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], It.prototype, "seconds", 2);
It = f([
  d("ui-multi-section-digital-clock")
], It);
let it = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1, this.view = "hours";
  }
  get _t() {
    return Ci(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  _emit(e, t, r) {
    const o = Ue(e, t, r);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _switchView(e) {
    this.view = e, this.dispatchEvent(new CustomEvent("view-change", { detail: { view: e }, bubbles: !0, composed: !0 }));
  }
  _handleClick(e) {
    const r = this.shadowRoot.querySelector("svg").getBoundingClientRect(), o = 280 / r.width, i = 280 / r.height, a = (e.clientX - r.left) * o, n = (e.clientY - r.top) * i, h = 140, v = 140, m = Gs(a, n, h, v), b = this._t;
    if (this.view === "hours") {
      const $ = Math.sqrt((a - h) ** 2 + (n - v) ** 2), J = !this.ampm && $ < 82;
      let q = Math.round(m / 30) % 12;
      J ? q = q === 0 ? 0 : q + 12 : (q = q || 12, this.ampm && (q = ht(q, ne(b.h).ampm))), this._emit(q, b.m, b.s), this._switchView("minutes");
    } else if (this.view === "minutes") {
      const $ = Math.round(m / 6) % 60;
      this._emit(b.h, $, b.s), this.seconds && this._switchView("seconds");
    } else {
      const $ = Math.round(m / 6) % 60;
      this._emit(b.h, b.m, $);
    }
  }
  _renderFace() {
    const r = this._t;
    let o = 0, i = 100;
    if (this.view === "hours") {
      let b;
      this.ampm ? b = ne(r.h).hour : b = r.h === 0 || r.h > 12 ? r.h % 12 : r.h, o = b / 12 * 360, i = this.ampm ? 100 : r.h === 0 || r.h > 12 ? 64 : 100;
    } else this.view === "minutes" ? (o = r.m / 60 * 360, i = 100) : (o = r.s / 60 * 360, i = 100);
    const a = (b) => (b - 90) * Math.PI / 180, n = 140 + i * Math.cos(a(o)), h = 140 + i * Math.sin(a(o)), v = [];
    if (this.view === "hours")
      if (this.ampm)
        for (let b = 1; b <= 12; b++) v.push({ val: b, label: String(b), r: 100 });
      else {
        for (let b = 1; b <= 12; b++) v.push({ val: b, label: String(b), r: 100 });
        for (let b = 13; b <= 24; b++) v.push({ val: b % 24, label: b === 24 ? "00" : String(b), r: 64, inner: !0 });
      }
    else
      for (let b = 0; b < 12; b++) {
        const $ = b * 5;
        v.push({ val: $, label: j($), r: 100 });
      }
    const m = 12;
    return l`
      <svg width="280" height="280" viewBox="0 0 280 280" @click=${this._handleClick}>
        <circle cx=${140} cy=${140} r="125" class="face"/>
        ${this.view === "hours" && !this.ampm ? l`<circle cx=${140} cy=${140} r="82" class="face-inner"></circle>` : x}
        <!-- hand -->
        <line x1=${140} y1=${140} x2=${n} y2=${h} class="hand"/>
        <circle cx=${n} cy=${h} r="18" class="hand-tip"/>
        <circle cx=${140} cy=${140} r="4" class="hand-center"/>
        <!-- numbers -->
        ${v.map((b) => {
      const $ = b.inner ? b.val % 12 : b.val, J = Xs($, m, b.r, 140, 140), q = this.view === "hours" ? this.ampm ? ne(r.h).hour === b.val : r.h === b.val : this.view === "minutes" ? r.m === b.val : r.s === b.val;
      return l`
          <circle cx=${J.x} cy=${J.y} r="17" class=${u({ "num-bg": !0, selected: q })}></circle>
          <text x=${J.x} y=${J.y} class=${u({ num: !0, selected: q, "inner-label": !!b.inner })}>${b.label}</text>
        `;
    })}
      </svg>
    `;
  }
  render() {
    const e = this._t, { hour: t, ampm: r } = ne(e.h), o = this.ampm ? j(t) : j(e.h);
    return l`
      <div class="clock-wrap">
        <div class="clock-header">
          <span class=${u({ "clock-seg": !0, active: this.view === "hours" })} @click=${() => this._switchView("hours")}>${o}</span>
          <span class="clock-sep">:</span>
          <span class=${u({ "clock-seg": !0, active: this.view === "minutes" })} @click=${() => this._switchView("minutes")}>${j(e.m)}</span>
          ${this.seconds ? l`<span class="clock-sep">:</span><span class=${u({ "clock-seg": !0, active: this.view === "seconds" })} @click=${() => this._switchView("seconds")}>${j(e.s)}</span>` : x}
          ${this.ampm ? l`<span class="clock-sep" style="font-size:1rem;align-self:flex-end;margin-bottom:6px;">${r}</span>` : x}
        </div>
        ${this.ampm ? l`
          <div class="am-pm">
            <button class=${u({ "am-pm-btn": !0, sel: r === "AM" })} @click=${() => {
      const i = this._t;
      this._emit(ht(ne(i.h).hour, "AM"), i.m, i.s);
    }}>AM</button>
            <button class=${u({ "am-pm-btn": !0, sel: r === "PM" })} @click=${() => {
      const i = this._t;
      this._emit(ht(ne(i.h).hour, "PM"), i.m, i.s);
    }}>PM</button>
          </div>
        ` : x}
        ${this._renderFace()}
      </div>
    `;
  }
};
it.styles = p`
    :host { display:inline-block; user-select:none; }
    .clock-wrap { display:flex; flex-direction:column; align-items:center; gap:12px; }
    .clock-header {
      display:flex; gap:4px; font-size:2rem; font-weight:700;
      font-family:var(--ui-font-family,'Inter',sans-serif); color:var(--ui-text-color,#111827);
    }
    .clock-seg { padding:4px 10px; border-radius:8px; cursor:pointer; transition:background .12s, color .12s; }
    .clock-seg.active { background:var(--ui-primary-color,#3b82f6); color:#fff; border-radius:8px; }
    .clock-seg:hover:not(.active) { background:rgba(0,0,0,.06); }
    .clock-sep { color:var(--ui-text-color-muted,#6b7280); }
    svg { touch-action:none; cursor:pointer; }
    .face { fill:var(--ui-surface-variant,#f1f5f9); }
    .face-inner { fill:rgba(0,0,0,.02); stroke:rgba(0,0,0,.06); stroke-width:1; stroke-dasharray:4 4; }
    .track { fill:none; stroke:var(--ui-border-color,#e2e8f0); stroke-width:2; }
    .hand { stroke:var(--ui-primary-color,#3b82f6); stroke-width:2; stroke-linecap:round; }
    .hand-center { fill:var(--ui-primary-color,#3b82f6); }
    .hand-tip { fill:var(--ui-primary-color,#3b82f6); }
    .num { font-size:13px; font-family:var(--ui-font-family,'Inter',sans-serif); fill:var(--ui-text-color,#374151); dominant-baseline:central; text-anchor:middle; cursor:pointer; }
    .num.inner-label { font-size:11px; fill:var(--ui-text-color-muted,#6b7280); }
    .num.selected { fill:#fff; }
    .num-bg { fill:transparent; cursor:pointer; }
    .num-bg.selected { fill:var(--ui-primary-color,#3b82f6); }
    .tick { stroke:var(--ui-text-color-muted,#cbd5e1); stroke-width:1; }
    .tick.major { stroke-width:2; }
    .inner-ring-track { fill:none; stroke:var(--ui-primary-color,#3b82f6); stroke-width:1.5; stroke-opacity:0.2; }
    .inner-tick { stroke:var(--ui-primary-color,#3b82f6); stroke-width:1.5; stroke-opacity:0.35; stroke-linecap:round; }
    .am-pm { display:flex; gap:8px; }
    .am-pm-btn {
      padding:4px 16px; border:1.5px solid var(--ui-border-color,#d1d5db);
      border-radius:20px; cursor:pointer; font-size:.875rem; font-family:inherit;
      background:transparent; color:var(--ui-text-color,#374151); transition:all .12s;
    }
    .am-pm-btn.sel { background:var(--ui-primary-color,#3b82f6); color:#fff; border-color:var(--ui-primary-color,#3b82f6); }
  `;
f([
  s({ type: String })
], it.prototype, "value", 2);
f([
  s({ type: Boolean })
], it.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], it.prototype, "seconds", 2);
f([
  s({ type: String })
], it.prototype, "view", 2);
it = f([
  d("ui-time-clock")
], it);
const dr = p`
  :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
  .popover-anchor { position:relative; display:inline-block; }
  .click-away { display:none; position:fixed; inset:0; z-index:1399; }
  .click-away.open { display:block; }
  .popover {
    position:absolute; top:calc(100% + 6px); left:0; z-index:1400;
    background:var(--ui-surface-background,#fff);
    border-radius:var(--ui-border-radius-xl,12px);
    box-shadow:0 8px 24px -4px rgba(0,0,0,.18), 0 2px 8px -2px rgba(0,0,0,.1);
    transform-origin:top left; transform:scale(.94) translateY(-4px);
    opacity:0; visibility:hidden; pointer-events:none;
    transition:transform .15s cubic-bezier(.4,0,.2,1), opacity .15s, visibility .15s;
  }
  .popover.open { transform:scale(1) translateY(0); opacity:1; visibility:visible; pointer-events:auto; }
  .actions {
    display:flex; justify-content:flex-end; gap:8px;
    padding:8px 12px 12px; border-top:1px solid var(--ui-border-color,#f3f4f6);
  }
  .btn { font-family:inherit; font-size:.875rem; font-weight:600; padding:6px 14px;
    border:none; border-radius:6px; cursor:pointer; transition:background .12s; }
  .btn-cancel { background:transparent; color:var(--ui-text-color-muted,#6b7280); }
  .btn-cancel:hover { background:rgba(0,0,0,.06); }
  .btn-ok { background:var(--ui-primary-color,#3b82f6); color:#fff; }
  .btn-ok:hover { background:var(--ui-primary-color-dark,#2563eb); }
`;
let te = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "Time", this.ampm = !0, this.seconds = !1, this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._open = !1;
  }
  _commit(e) {
    this.value = e, this.dispatchEvent(new CustomEvent("change", { detail: { value: e }, bubbles: !0, composed: !0 })), this._open = !1;
  }
  render() {
    return l`
      <div class="popover-anchor">
        <ui-time-field .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds}
          ?disabled=${this.disabled} ?readonly=${this.readonly} ?error=${this.error} helper-text=${this.helperText}
          @change=${(e) => this._commit(e.detail.value)}
          @focus=${() => {
      !this.disabled && !this.readonly && (this._open = !0);
    }}
        ></ui-time-field>
        <div class="click-away ${this._open ? "open" : ""}" @click=${() => this._open = !1}></div>
        <div class="popover ${this._open ? "open" : ""}" role="dialog" aria-label="Time picker">
          <ui-multi-section-digital-clock .value=${this.value || Ue(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
            @change=${(e) => {
      this.value = e.detail.value;
    }}
          ></ui-multi-section-digital-clock>
          <div class="actions">
            <button class="btn btn-cancel" @click=${() => this._open = !1}>Cancel</button>
            <button class="btn btn-ok" @click=${() => this._commit(this.value || Ue(12, 0))}>OK</button>
          </div>
        </div>
      </div>
    `;
  }
};
te.styles = [dr];
f([
  s({ type: String })
], te.prototype, "value", 2);
f([
  s({ type: String })
], te.prototype, "label", 2);
f([
  s({ type: Boolean })
], te.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], te.prototype, "seconds", 2);
f([
  s({ type: Boolean, reflect: !0 })
], te.prototype, "disabled", 2);
f([
  s({ type: Boolean, reflect: !0 })
], te.prototype, "readonly", 2);
f([
  s({ type: Boolean, reflect: !0 })
], te.prototype, "error", 2);
f([
  s({ type: String, attribute: "helper-text" })
], te.prototype, "helperText", 2);
f([
  g()
], te.prototype, "_open", 2);
te = f([
  d("ui-desktop-time-picker")
], te);
let X = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "Time", this.ampm = !0, this.seconds = !1, this.disabled = !1, this.error = !1, this.helperText = "", this._open = !1, this._pending = "", this._view = "hours";
  }
  render() {
    return l`
      <ui-time-field .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds}
        ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} readonly
        @focus=${() => {
      this.disabled || (this._pending = this.value, this._view = "hours", this._open = !0);
    }}
        @change=${(e) => {
      this.value = e.detail.value, this.dispatchEvent(new CustomEvent("change", { detail: e.detail, bubbles: !0, composed: !0 }));
    }}
      ></ui-time-field>
      <ui-dialog .open=${this._open} disable-backdrop-close @close=${() => this._open = !1} style="--ui-dialog-width:320px">
        <ui-dialog-title>Select Time</ui-dialog-title>
        <ui-dialog-content style="padding:12px;display:flex;justify-content:center;">
          <ui-time-clock .value=${this._pending || this.value || Ue(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds} .view=${this._view}
            @change=${(e) => {
      this._pending = e.detail.value;
    }}
            @view-change=${(e) => {
      this._view = e.detail.view;
    }}
          ></ui-time-clock>
        </ui-dialog-content>
        <ui-dialog-actions>
          <button class="btn btn-cancel" @click=${() => {
      this._pending = this.value, this._open = !1;
    }}>Cancel</button>
          <button class="btn btn-ok" @click=${() => {
      const e = this._pending || this.value;
      this.value = e, this.dispatchEvent(new CustomEvent("change", { detail: { value: e }, bubbles: !0, composed: !0 })), this._open = !1;
    }}>OK</button>
        </ui-dialog-actions>
      </ui-dialog>
    `;
  }
};
X.styles = [dr];
f([
  s({ type: String })
], X.prototype, "value", 2);
f([
  s({ type: String })
], X.prototype, "label", 2);
f([
  s({ type: Boolean })
], X.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], X.prototype, "seconds", 2);
f([
  s({ type: Boolean, reflect: !0 })
], X.prototype, "disabled", 2);
f([
  s({ type: Boolean, reflect: !0 })
], X.prototype, "error", 2);
f([
  s({ type: String, attribute: "helper-text" })
], X.prototype, "helperText", 2);
f([
  g()
], X.prototype, "_open", 2);
f([
  g()
], X.prototype, "_pending", 2);
f([
  g()
], X.prototype, "_view", 2);
X = f([
  d("ui-mobile-time-picker")
], X);
let St = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  render() {
    return l`
      <div class="surface">
        <ui-multi-section-digital-clock .value=${this.value || Ue(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
          @change=${(e) => {
      this.value = e.detail.value, this.dispatchEvent(new CustomEvent("change", { detail: e.detail, bubbles: !0, composed: !0 }));
    }}
        ></ui-multi-section-digital-clock>
      </div>
    `;
  }
};
St.styles = p`
    :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .surface {
      border-radius:var(--ui-border-radius-xl,12px);
      box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px var(--ui-border-color,#e5e7eb);
      overflow:hidden; display:inline-block;
    }
  `;
f([
  s({ type: String })
], St.prototype, "value", 2);
f([
  s({ type: Boolean })
], St.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], St.prototype, "seconds", 2);
St = f([
  d("ui-static-time-picker")
], St);
let re = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "Time", this.variant = "desktop", this.ampm = !0, this.seconds = !1, this.disabled = !1, this.error = !1, this.helperText = "";
  }
  get _v() {
    return this.variant === "auto" ? window.matchMedia("(pointer:coarse)").matches ? "mobile" : "desktop" : this.variant;
  }
  _onChange(e) {
    this.value = e.detail.value, this.dispatchEvent(new CustomEvent("change", { detail: e.detail, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = this._v;
    return e === "static" ? l`<ui-static-time-picker .value=${this.value} ?ampm=${this.ampm} ?seconds=${this.seconds} @change=${this._onChange}></ui-static-time-picker>` : e === "mobile" ? l`<ui-mobile-time-picker .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-mobile-time-picker>` : l`<ui-desktop-time-picker .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-desktop-time-picker>`;
  }
};
re.styles = p`:host { display:inline-block; }`;
f([
  s({ type: String })
], re.prototype, "value", 2);
f([
  s({ type: String })
], re.prototype, "label", 2);
f([
  s({ type: String })
], re.prototype, "variant", 2);
f([
  s({ type: Boolean })
], re.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], re.prototype, "seconds", 2);
f([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "disabled", 2);
f([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "error", 2);
f([
  s({ type: String, attribute: "helper-text" })
], re.prototype, "helperText", 2);
re = f([
  d("ui-time-picker")
], re);
var Js = Object.defineProperty, Qs = Object.getOwnPropertyDescriptor, ae = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Qs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Js(t, r, i), i;
};
let G = class extends c {
  constructor() {
    super(...arguments), this.itemId = "", this.label = "", this.disabled = !1, this.expanded = !1, this.hasChildren = !1, this._isDraggable = !1, this._handleOnly = !1, this.dropPosition = null, this.showDragHandle = !1, this._hasSlottedChildren = !1;
  }
  /**
   * Called by ui-rich-tree-view to set drag enabled state.
   * Uses a method + @state instead of a @property to avoid clobbering
   * the native `draggable` attribute on the host element.
   *
   * @param value       - Whether this item is draggable at all
   * @param handleOnly  - When true, only the drag handle icon initiates a drag,
   *                      not the whole row. The handle div gets draggable="true"
   *                      and the row stays non-draggable.
   */
  setDraggable(e, t = !1) {
    this._isDraggable = e, this._handleOnly = t;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "treeitem"), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "-1");
  }
  updated(e) {
    super.updated(e), this._hasSlottedChildren || this.hasChildren ? this.setAttribute("aria-expanded", String(this.expanded)) : this.removeAttribute("aria-expanded"), this.setAttribute("aria-disabled", String(this.disabled));
  }
  _onSlotChange(e) {
    const o = e.target.assignedElements({ flatten: !0 }).some((i) => i.tagName === "UI-TREE-ITEM");
    o !== this._hasSlottedChildren && (this._hasSlottedChildren = o);
  }
  _toggleExpand(e) {
    e.stopPropagation(), !this.disabled && this.dispatchEvent(new CustomEvent("ui-tree-item-toggle", {
      detail: { itemId: this.itemId, expanded: !this.expanded },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleRowClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-tree-item-click", {
      detail: { itemId: this.itemId },
      bubbles: !0,
      composed: !0
    }));
  }
  /** Computed indentation level based on nested depth */
  get _level() {
    let e = 0, t = this.parentElement;
    for (; t; ) {
      if (t.tagName === "UI-TREE-ITEM") e++;
      else if (t.tagName === "UI-SIMPLE-TREE-VIEW") break;
      t = t.parentElement;
    }
    return e;
  }
  render() {
    const e = this._level * 24 + 8, t = this._hasSlottedChildren || this.hasChildren;
    return l`
      <div
        class=${u({ "item-row": !0, "is-draggable": this._isDraggable && !this._handleOnly })}
        style="padding-left: ${e}px"
        draggable=${this._isDraggable && !this._handleOnly ? "true" : "false"}
        @click=${this._handleRowClick}
      >
        ${this.showDragHandle ? l`
          <div
            class="drag-handle"
            data-drag-handle="true"
            draggable=${this._handleOnly ? "true" : "false"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="5" r="1" fill="currentColor"/>
              <circle cx="9" cy="12" r="1" fill="currentColor"/>
              <circle cx="9" cy="19" r="1" fill="currentColor"/>
              <circle cx="15" cy="5" r="1" fill="currentColor"/>
              <circle cx="15" cy="12" r="1" fill="currentColor"/>
              <circle cx="15" cy="19" r="1" fill="currentColor"/>
            </svg>
          </div>
        ` : x}

        ${t ? l`
              <button
                class=${u({ "expand-btn": !0, expanded: this.expanded })}
                tabindex="-1"
                aria-hidden="true"
                @click=${this._toggleExpand}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M3 1.5L7 5 3 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            ` : l`<span class="expand-placeholder"></span>`}

        <span class="item-label">${this.label}</span>
        ${this.label ? x : l`<slot name="label"></slot>`}
      </div>

      <div class="children-container" ?hidden=${!this.expanded} role="group">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
G.styles = p`
    :host {
      display: block;
      outline: none;
      font-family: var(--ui-font-family, system-ui, sans-serif);
    }

    :host(:focus-visible) .item-row {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: -2px;
    }

    .item-row {
      display: flex;
      align-items: center;
      min-height: 36px;
      padding-right: 8px;
      border-radius: var(--ui-border-radius-sm, 4px);
      cursor: pointer;
      user-select: none;
      color: var(--ui-text-color, #111827);
      font-size: 14px;
      transition: background-color 0.15s ease;
      /* Needed so ::before/::after drop indicators position correctly */
      position: relative;
    }

    :host(:not([disabled])) .item-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    :host([disabled]) .item-row {
      color: rgba(0, 0, 0, 0.38);
      cursor: default;
    }

    .expand-btn {
      width: 28px;
      height: 28px;
      min-width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      padding: 0;
      border-radius: 50%;
      cursor: pointer;
      color: inherit;
      transition: transform 0.2s ease, background-color 0.15s;
    }

    .expand-btn:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    .expand-btn.expanded {
      transform: rotate(90deg);
    }

    .expand-placeholder {
      width: 28px;
      min-width: 28px;
    }

    .item-label {
      flex: 1;
      line-height: 1.5;
    }

    .children-container {
      display: block;
    }

    .children-container[hidden] {
      display: none !important;
    }

    /* ── Drag & Drop ──────────────────────────────────────────── */

    /*
     * FIX: draggable cursor on the row div (not the host) since that's
     * the element with draggable="true" after our fix.
     */
    .item-row.is-draggable {
      cursor: grab;
    }

    .item-row.is-draggable:active {
      cursor: grabbing;
    }

    /* Drop position indicators — driven by :host attribute (reflect: true) */
    :host([drop-position="before"]) .item-row::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--ui-primary-color, #3b82f6);
      z-index: 10;
      border-radius: 2px;
    }

    :host([drop-position="after"]) .item-row::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--ui-primary-color, #3b82f6);
      z-index: 10;
      border-radius: 2px;
    }

    :host([drop-position="inside"]) .item-row {
      background-color: rgba(59, 130, 246, 0.1);
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: -2px;
    }

    :host([dragging]) {
      opacity: 0.4;
    }

    .drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      cursor: grab;
      color: var(--ui-text-color-secondary, #6b7280);
      margin-right: 4px;
      flex-shrink: 0;
    }

    .drag-handle:active {
      cursor: grabbing;
    }
  `;
ae([
  s({ type: String, attribute: "item-id", reflect: !0 })
], G.prototype, "itemId", 2);
ae([
  s({ type: String })
], G.prototype, "label", 2);
ae([
  s({ type: Boolean, reflect: !0 })
], G.prototype, "disabled", 2);
ae([
  s({ type: Boolean, reflect: !0 })
], G.prototype, "expanded", 2);
ae([
  s({ type: Boolean, attribute: "has-children", reflect: !0 })
], G.prototype, "hasChildren", 2);
ae([
  g()
], G.prototype, "_isDraggable", 2);
ae([
  g()
], G.prototype, "_handleOnly", 2);
ae([
  s({ type: String, attribute: "drop-position", reflect: !0 })
], G.prototype, "dropPosition", 2);
ae([
  s({ type: Boolean, attribute: "show-drag-handle" })
], G.prototype, "showDragHandle", 2);
ae([
  g()
], G.prototype, "_hasSlottedChildren", 2);
G = ae([
  d("ui-tree-item")
], G);
var Zs = Object.defineProperty, ea = Object.getOwnPropertyDescriptor, dt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ea(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Zs(t, r, i), i;
};
let $e = class extends c {
  constructor() {
    super(...arguments), this.disabledItemsFocusable = !1, this.defaultExpandedItems = [], this.expansionTrigger = "content", this._internalExpandedItems = /* @__PURE__ */ new Set(), this._expansionInitialized = !1, this._handleKeydown = (e) => {
      const t = e.target;
      if (t.tagName !== "UI-TREE-ITEM") return;
      const r = t, o = this._getFocusableItems(), i = o.indexOf(r);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const a = o[i + 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const a = o[i - 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowRight": {
          if (e.preventDefault(), r.disabled) break;
          if (!r.expanded && this._itemHasChildren(r))
            this._handleToggle(r, !0);
          else if (r.expanded) {
            const a = this._getFocusableItems(), n = a.indexOf(r), h = a[n + 1];
            h && this._focusItem(h);
          }
          break;
        }
        case "ArrowLeft": {
          if (e.preventDefault(), r.disabled) break;
          if (r.expanded)
            this._handleToggle(r, !1);
          else {
            const a = r.parentElement;
            a && a.tagName === "UI-TREE-ITEM" && this._focusItem(a);
          }
          break;
        }
        case "Home": {
          e.preventDefault();
          const a = o[0];
          a && this._focusItem(a);
          break;
        }
        case "End": {
          e.preventDefault();
          const a = o[o.length - 1];
          a && this._focusItem(a);
          break;
        }
        case "Enter":
        case " ": {
          if (e.preventDefault(), r.disabled) break;
          this._itemHasChildren(r) && this._handleToggle(r, !r.expanded), this.onItemClick?.(r.itemId), this.dispatchEvent(new CustomEvent("item-click", {
            detail: { itemId: r.itemId },
            bubbles: !1
          }));
          break;
        }
        default:
          if (e.key.length === 1) {
            const a = e.key.toLowerCase(), n = i < 0 ? 0 : i + 1, v = [
              ...o.slice(n),
              ...o.slice(0, n)
            ].find(
              (m) => m.label.toLowerCase().startsWith(a)
            );
            v && this._focusItem(v);
          }
      }
    };
  }
  get _isControlled() {
    return this.expandedItems !== void 0;
  }
  // ─── Lifecycle ────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this._handleKeydown), this.addEventListener("ui-tree-item-click", this._handleItemClick), this.addEventListener("ui-tree-item-toggle", this._handleUiToggle), this.addEventListener("focusin", this._handleFocusIn);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this._handleKeydown), this.removeEventListener("ui-tree-item-click", this._handleItemClick), this.removeEventListener("ui-tree-item-toggle", this._handleUiToggle), this.removeEventListener("focusin", this._handleFocusIn);
  }
  updated(e) {
    super.updated(e), e.has("disabledItemsFocusable") && this._initRovingTabindex(), e.has("expandedItems") && this._syncExpansion();
  }
  // ─── Item queries ─────────────────────────────────────────────────────────
  _getAllItems() {
    return Array.from(this.querySelectorAll("ui-tree-item"));
  }
  /** Returns all items that are currently visible (no collapsed ancestor). */
  _getVisibleItems() {
    return this._getAllItems().filter((e) => this._isVisible(e));
  }
  _isVisible(e) {
    let t = e.parentElement;
    for (; t && t !== this; ) {
      if (t.tagName === "UI-TREE-ITEM" && !t.expanded)
        return !1;
      t = t.parentElement;
    }
    return !0;
  }
  /** Visible items that can receive focus based on `disabledItemsFocusable`. */
  _getFocusableItems() {
    const e = this._getVisibleItems();
    return this.disabledItemsFocusable ? e : e.filter((t) => !t.disabled);
  }
  _itemHasChildren(e) {
    return Array.from(e.children).some((t) => t.tagName === "UI-TREE-ITEM");
  }
  // ─── Expansion management ─────────────────────────────────────────────────
  /**
   * Runs once on first slot population.
   * Seeds `_internalExpandedItems` from `defaultExpandedItems` in uncontrolled mode.
   */
  _initExpansion() {
    this._expansionInitialized || (this._expansionInitialized = !0, !this._isControlled && this.defaultExpandedItems.length > 0 && (this._internalExpandedItems = new Set(this.defaultExpandedItems)));
  }
  /**
   * Reconciles every item's `expanded` prop with the current expanded set
   * (controlled: `expandedItems`; uncontrolled: `_internalExpandedItems`).
   */
  _syncExpansion() {
    const e = this._isControlled ? new Set(this.expandedItems) : this._internalExpandedItems;
    this._getAllItems().forEach((t) => {
      const r = e.has(t.itemId);
      t.expanded !== r && (t.expanded = r);
    });
  }
  /**
   * Central expansion dispatcher.
   * In controlled mode: fires callbacks but resets to the controlled state.
   * In uncontrolled mode: updates internal tracking and syncs items.
   */
  _handleToggle(e, t) {
    if (this._isControlled) {
      const r = new Set(this.expandedItems);
      t ? r.add(e.itemId) : r.delete(e.itemId);
      const o = Array.from(r);
      this.onExpandedItemsChange?.(o), this.dispatchEvent(new CustomEvent("expanded-items-change", {
        detail: { expandedItems: o },
        bubbles: !1
      })), this._syncExpansion();
    } else
      t ? this._internalExpandedItems.add(e.itemId) : this._internalExpandedItems.delete(e.itemId), this._syncExpansion();
  }
  // ─── Focus management (roving tabindex) ─────────────────────────────────────
  _initRovingTabindex() {
    const e = this._getAllItems();
    if (e.length === 0) return;
    if (!e.some((r) => r.getAttribute("tabindex") === "0")) {
      const r = this.disabledItemsFocusable ? e[0] : e.find((o) => !o.disabled);
      r && r.setAttribute("tabindex", "0");
    }
  }
  _focusItem(e) {
    this._getAllItems().forEach((t) => t.setAttribute("tabindex", "-1")), e.setAttribute("tabindex", "0"), e.focus();
  }
  // ─── Event handlers ──────────────────────────────────────────────────────────
  _handleFocusIn(e) {
    const t = e.target;
    t.tagName === "UI-TREE-ITEM" && (this._getAllItems().forEach((r) => r.setAttribute("tabindex", "-1")), t.setAttribute("tabindex", "0"));
  }
  /** Handles the `ui-tree-item-toggle` event from the expand icon button. */
  _handleUiToggle(e) {
    const { itemId: t, expanded: r } = e.detail, o = this.getItemDOMElement(t);
    o && this._handleToggle(o, r);
  }
  /** Handles `ui-tree-item-click` (row click). Also triggers expansion in content mode. */
  _handleItemClick(e) {
    const { itemId: t } = e.detail;
    if (this.expansionTrigger === "content") {
      const r = this.getItemDOMElement(t);
      r && this._itemHasChildren(r) && this._handleToggle(r, !r.expanded);
    }
    this.onItemClick?.(t), this.dispatchEvent(new CustomEvent("item-click", {
      detail: { itemId: t },
      bubbles: !1
    }));
  }
  // ─── Public API ──────────────────────────────────────────────────────────────
  /**
   * Returns the DOM element for the tree item with the given `itemId`,
   * or `null` if not found.
   */
  getItemDOMElement(e) {
    return this._getAllItems().find((r) => r.itemId === e) ?? null;
  }
  // ─── Render ──────────────────────────────────────────────────────────────────
  _onSlotChange() {
    this._initRovingTabindex(), this._initExpansion(), this._syncExpansion();
  }
  render() {
    return l`
      <div class="tree-root" role="tree">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
$e.styles = p`
    :host {
      display: block;
      font-family: var(--ui-font-family, system-ui, sans-serif);
    }

    .tree-root {
      padding: 4px 0;
    }
  `;
dt([
  s({ type: Boolean, attribute: "disabled-items-focusable" })
], $e.prototype, "disabledItemsFocusable", 2);
dt([
  s({ attribute: !1 })
], $e.prototype, "onItemClick", 2);
dt([
  s({ attribute: !1 })
], $e.prototype, "expandedItems", 2);
dt([
  s({ attribute: !1 })
], $e.prototype, "defaultExpandedItems", 2);
dt([
  s({ attribute: !1 })
], $e.prototype, "onExpandedItemsChange", 2);
dt([
  s({ type: String, attribute: "expansion-trigger" })
], $e.prototype, "expansionTrigger", 2);
$e = dt([
  d("ui-simple-tree-view")
], $e);
var ta = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, P = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ia(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ta(t, r, i), i;
};
let I = class extends c {
  constructor() {
    super(...arguments), this.items = [], this.getItemId = (e) => e.id, this.getItemLabel = (e) => e.label, this.getItemChildren = (e) => e.children, this.isItemDisabled = () => !1, this.disabledItemsFocusable = !1, this.expansionTrigger = "content", this.defaultExpandedItems = [], this.itemsReordering = !1, this.itemsReorderingHandle = !1, this._internalExpandedItems = /* @__PURE__ */ new Set(), this._expansionInitialized = !1, this._disabledOverrides = /* @__PURE__ */ new Map(), this._lazyChildren = /* @__PURE__ */ new Map(), this._loading = /* @__PURE__ */ new Set(), this._orderedItems = null, this._draggedItemId = null, this._dropTargetId = null, this._dropPosition = null, this._handleFocusIn = (e) => {
      const t = e.target;
      t.tagName === "UI-TREE-ITEM" && (this._getAllItems().forEach((r) => r.setAttribute("tabindex", "-1")), t.setAttribute("tabindex", "0"));
    }, this._handleUiToggle = (e) => {
      const { itemId: t, expanded: r } = e.detail, o = this.getItemDOMElement(t);
      o && this._handleToggle(o, r);
    }, this._handleItemClick = (e) => {
      const { itemId: t } = e.detail;
      if (this.expansionTrigger === "content") {
        const r = this.getItemDOMElement(t);
        r && this._itemHasChildren(r) && this._handleToggle(r, !r.expanded);
      }
      this.onItemClick?.(t), this.dispatchEvent(new CustomEvent("item-click", {
        detail: { itemId: t },
        bubbles: !1
      }));
    }, this._handleKeydown = (e) => {
      const t = e.target;
      if (t.tagName !== "UI-TREE-ITEM") return;
      const r = t, o = this._getFocusableItems(), i = o.indexOf(r);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const a = o[i + 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const a = o[i - 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowRight": {
          if (e.preventDefault(), r.disabled) break;
          if (!r.expanded && this._itemHasChildren(r))
            this._handleToggle(r, !0);
          else if (r.expanded) {
            const a = this._getFocusableItems(), n = a.indexOf(r), h = a[n + 1];
            h && this._focusItem(h);
          }
          break;
        }
        case "ArrowLeft": {
          if (e.preventDefault(), r.disabled) break;
          if (r.expanded)
            this._handleToggle(r, !1);
          else {
            const a = r.parentElement;
            a && a.tagName === "UI-TREE-ITEM" && this._focusItem(a);
          }
          break;
        }
        case "Home": {
          e.preventDefault();
          const a = o[0];
          a && this._focusItem(a);
          break;
        }
        case "End": {
          e.preventDefault();
          const a = o[o.length - 1];
          a && this._focusItem(a);
          break;
        }
        case "Enter":
        case " ": {
          if (e.preventDefault(), r.disabled) break;
          this._itemHasChildren(r) && this._handleToggle(r, !r.expanded), this.onItemClick?.(r.itemId), this.dispatchEvent(new CustomEvent("item-click", {
            detail: { itemId: r.itemId },
            bubbles: !1
          }));
          break;
        }
        default:
          if (e.key.length === 1) {
            const a = e.key.toLowerCase(), n = i < 0 ? 0 : i + 1, v = [
              ...o.slice(n),
              ...o.slice(0, n)
            ].find(
              (m) => m.label.toLowerCase().startsWith(a)
            );
            v && this._focusItem(v);
          }
      }
    }, this._handleDragStart = (e) => {
      if (!this.itemsReordering) return;
      const t = this._getTreeItemFromEvent(e);
      if (t) {
        if (this.itemsReorderingHandle && !e.composedPath().some(
          (i) => i instanceof HTMLElement && i.hasAttribute("data-drag-handle")
        )) {
          e.preventDefault();
          return;
        }
        if (this.isItemReorderable && !this.isItemReorderable(t.itemId)) {
          e.preventDefault();
          return;
        }
        this._draggedItemId = t.itemId, e.dataTransfer && (e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", t.itemId)), this._orderedItems || (this._orderedItems = this._cloneItemsTree(this.items)), t.setAttribute("dragging", "");
      }
    }, this._handleDragOver = (e) => {
      if (!this.itemsReordering || !this._draggedItemId) return;
      const t = this._getTreeItemFromEvent(e);
      if (!t) return;
      e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
      const r = t.itemId;
      if (r === this._draggedItemId) {
        this._clearDropTarget();
        return;
      }
      if (this._isAncestorOf(this._draggedItemId, r, this._getEffectiveItems())) {
        this._clearDropTarget();
        return;
      }
      const o = t.getBoundingClientRect(), i = e.clientY - o.top, a = o.height;
      let n = "inside";
      if (i < a * 0.25 ? n = "before" : i > a * 0.75 && (n = "after"), this.canMoveItemToNewPosition && !this.canMoveItemToNewPosition({
        itemId: this._draggedItemId,
        targetId: r,
        position: n
      })) {
        this._clearDropTarget();
        return;
      }
      (this._dropTargetId !== r || this._dropPosition !== n) && (this._dropTargetId = r, this._dropPosition = n, this._updateItemDropStates());
    }, this._handleDragEnd = (e) => {
      const t = this._getTreeItemFromEvent(e);
      t && t.removeAttribute("dragging"), this._draggedItemId = null, this._clearDropTarget();
    }, this._handleDrop = (e) => {
      if (!this.itemsReordering || !this._draggedItemId || !this._dropTargetId || !this._dropPosition)
        return;
      e.preventDefault();
      const t = this._draggedItemId, r = this._dropTargetId, o = this._dropPosition;
      this._moveItem(t, r, o), this._draggedItemId = null, this._clearDropTarget();
    };
  }
  get _isControlled() {
    return this.expandedItems !== void 0;
  }
  // ─── Lifecycle ────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot.addEventListener("keydown", this._handleKeydown), this.shadowRoot.addEventListener("ui-tree-item-click", this._handleItemClick), this.shadowRoot.addEventListener("ui-tree-item-toggle", this._handleUiToggle), this.shadowRoot.addEventListener("focusin", this._handleFocusIn), this.shadowRoot.addEventListener("dragstart", this._handleDragStart), this.shadowRoot.addEventListener("dragover", this._handleDragOver), this.shadowRoot.addEventListener("dragend", this._handleDragEnd), this.shadowRoot.addEventListener("drop", this._handleDrop);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.shadowRoot.removeEventListener("keydown", this._handleKeydown), this.shadowRoot.removeEventListener("ui-tree-item-click", this._handleItemClick), this.shadowRoot.removeEventListener("ui-tree-item-toggle", this._handleUiToggle), this.shadowRoot.removeEventListener("focusin", this._handleFocusIn), this.shadowRoot.removeEventListener("dragstart", this._handleDragStart), this.shadowRoot.removeEventListener("dragover", this._handleDragOver), this.shadowRoot.removeEventListener("dragend", this._handleDragEnd), this.shadowRoot.removeEventListener("drop", this._handleDrop);
  }
  updated(e) {
    super.updated(e), e.has("dataSource") && (this._lazyChildren.clear(), this._loading.clear()), e.has("disabledItemsFocusable") && this._initRovingTabindex(), e.has("expandedItems") && this._syncExpansion(), e.has("items") && (this._expansionInitialized ? (this._syncExpansion(), this._initRovingTabindex()) : this._initExpansion()), this.dataSource && this.items.length === 0 && !this._lazyChildren.has(null) && !this._loading.has(null) && this._loadChildren(null), this.itemsReordering && this._getAllItems().forEach((t) => {
      const r = this.isItemReorderable ? this.isItemReorderable(t.itemId) : !0;
      t.setDraggable(r, this.itemsReorderingHandle);
    });
  }
  // ─── Lazy loading ─────────────────────────────────────────────────────────
  async _loadChildren(e) {
    if (!(!this.dataSource || this._loading.has(e) || this._lazyChildren.has(e))) {
      this._loading.add(e), this.requestUpdate();
      try {
        const t = await this.dataSource.getTreeItems(e);
        this._lazyChildren.set(e, t);
      } catch (t) {
        console.error("[ui-rich-tree-view] Failed to load children for", e, t);
      } finally {
        this._loading.delete(e), this.requestUpdate(), await this.updateComplete, this._syncExpansion(), this._initRovingTabindex();
      }
    }
  }
  // ─── Item data helpers ────────────────────────────────────────────────────
  _getEffectiveDisabled(e) {
    const t = this.getItemId(e);
    return this._disabledOverrides.has(t) ? this._disabledOverrides.get(t) : this.isItemDisabled(e);
  }
  _findItemById(e, t) {
    for (const r of t) {
      if (this.getItemId(r) === e) return r;
      const o = this.getItemChildren(r) ?? [], i = this._findItemById(e, o);
      if (i) return i;
    }
    return null;
  }
  _getEffectiveItems() {
    return this.itemsReordering && this._orderedItems ? this._orderedItems : this.items;
  }
  _cloneItemsTree(e) {
    return e.map((t) => {
      const r = { ...t }, o = this.getItemChildren(t);
      if (o) {
        const i = Object.keys(t).find((a) => t[a] === o) || "children";
        r[i] = this._cloneItemsTree(o);
      }
      return r;
    });
  }
  /** Find an item and its parent list/index within a tree structure. */
  _findItemAndParentInTree(e, t, r = null) {
    for (let o = 0; o < t.length; o++) {
      const i = t[o];
      if (this.getItemId(i) === e)
        return { item: i, parentList: t, index: o, parentId: r };
      const a = this.getItemChildren(i) ?? [], n = this._findItemAndParentInTree(e, a, this.getItemId(i));
      if (n) return n;
    }
    return null;
  }
  /**
   * FIX #2: Replaced the broken _isDescendantOf() with _isAncestorOf().
   *
   * Old code checked if `parentId` had `childId` as a DIRECT child only,
   * and the call-site had the arguments backwards (checking if the dragged
   * item is a descendant of the target, instead of the other way around).
   *
   * New code: returns true if `ancestorId` is an ancestor of `targetId`
   * anywhere in the subtree (deep, recursive check).
   */
  _isAncestorOf(e, t, r) {
    for (const o of r) {
      if (this.getItemId(o) === e)
        return !!this._findItemById(t, this.getItemChildren(o) ?? []);
      if (this._isAncestorOf(e, t, this.getItemChildren(o) ?? []))
        return !0;
    }
    return !1;
  }
  // ─── DOM helpers ──────────────────────────────────────────────────────────
  /** Items live in shadow DOM, so we query from shadowRoot. */
  _getAllItems() {
    return Array.from(this.shadowRoot.querySelectorAll("ui-tree-item"));
  }
  _getVisibleItems() {
    return this._getAllItems().filter((e) => this._isVisible(e));
  }
  /**
   * An item is visible if no ancestor ui-tree-item is collapsed.
   * Traversal stops at null (shadow DOM root has no parentElement).
   */
  _isVisible(e) {
    let t = e.parentElement;
    for (; t !== null; ) {
      if (t.tagName === "UI-TREE-ITEM" && !t.expanded)
        return !1;
      t = t.parentElement;
    }
    return !0;
  }
  _getFocusableItems() {
    const e = this._getVisibleItems();
    return this.disabledItemsFocusable ? e : e.filter((t) => !t.disabled);
  }
  _itemHasChildren(e) {
    return e.hasChildren ? !0 : Array.from(e.children).some((t) => t.tagName === "UI-TREE-ITEM");
  }
  // ─── Expansion management ─────────────────────────────────────────────────
  _initExpansion() {
    this._expansionInitialized || (this._expansionInitialized = !0, !this._isControlled && this.defaultExpandedItems.length > 0 && (this._internalExpandedItems = new Set(this.defaultExpandedItems)), this._syncExpansion(), this._initRovingTabindex());
  }
  _syncExpansion() {
    const e = this._isControlled ? new Set(this.expandedItems) : this._internalExpandedItems;
    this._getAllItems().forEach((t) => {
      const r = e.has(t.itemId);
      t.expanded !== r && (t.expanded = r);
    });
  }
  _handleToggle(e, t) {
    if (t && this.dataSource && !this._lazyChildren.has(e.itemId) && !this._loading.has(e.itemId) && this._loadChildren(e.itemId), this._isControlled) {
      const r = new Set(this.expandedItems);
      t ? r.add(e.itemId) : r.delete(e.itemId);
      const o = Array.from(r);
      this.onExpandedItemsChange?.(o), this.dispatchEvent(new CustomEvent("expanded-items-change", {
        detail: { expandedItems: o },
        bubbles: !1
      })), this._syncExpansion();
    } else
      t ? this._internalExpandedItems.add(e.itemId) : this._internalExpandedItems.delete(e.itemId), this._syncExpansion();
  }
  // ─── Focus management (roving tabindex) ───────────────────────────────────
  _initRovingTabindex() {
    const e = this._getAllItems();
    if (e.length === 0) return;
    if (!e.some((r) => r.getAttribute("tabindex") === "0")) {
      const r = this.disabledItemsFocusable ? e[0] : e.find((o) => !o.disabled);
      r && r.setAttribute("tabindex", "0");
    }
  }
  _focusItem(e) {
    this._getAllItems().forEach((t) => t.setAttribute("tabindex", "-1")), e.setAttribute("tabindex", "0"), e.focus();
  }
  // ─── Public API ───────────────────────────────────────────────────────────
  /**
   * Returns the data item with the given ID, or `null` if not found.
   * Performs a depth-first search through the items tree.
   */
  getItem(e) {
    return this._findItemById(e, this._getEffectiveItems());
  }
  /**
   * Returns the DOM element for the tree item with the given ID, or `null`.
   */
  getItemDOMElement(e) {
    return this._getAllItems().find((t) => t.itemId === e) ?? null;
  }
  /**
   * Returns the current items tree. Returns the reordered tree if reordering is active.
   */
  getItemTree() {
    return this._getEffectiveItems();
  }
  /**
   * Returns the ordered child IDs for an item, or root items if null.
   */
  getItemOrderedChildrenIds(e) {
    const t = this._getEffectiveItems();
    if (e === null)
      return t.map((i) => this.getItemId(i));
    const r = this._findItemById(e, t);
    return r ? (this.getItemChildren(r) ?? []).map((i) => this.getItemId(i)) : [];
  }
  /**
   * Imperatively toggle the disabled state of an item by ID.
   * Overrides the `isItemDisabled` prop result for that specific item.
   */
  setIsItemDisabled(e, t) {
    this._disabledOverrides.set(e, t), this.requestUpdate();
  }
  // ─── Rendering ────────────────────────────────────────────────────────────
  _renderItem(e, t = 0) {
    const r = this.getItemId(e), o = this.getItemLabel(e), i = this._getEffectiveDisabled(e);
    let a = [], n = !1, h = !1;
    this.dataSource ? this._lazyChildren.has(r) ? (a = this._lazyChildren.get(r), h = a.length > 0) : (n = this._loading.has(r), h = this.dataSource.getChildrenCount(e) !== 0) : (a = this.getItemChildren(e) ?? [], h = a.length > 0);
    const v = (t + 1) * 24 + 8;
    return l`
      <ui-tree-item
        item-id=${r}
        label=${o}
        ?disabled=${i}
        ?has-children=${h}
        ?show-drag-handle=${this.itemsReordering && this.itemsReorderingHandle}
      >
        ${n ? l`
          <div class="lazy-indicator" style="padding-left:${v}px">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        ` : x}
        ${a.map((m) => this._renderItem(m, t + 1))}
      </ui-tree-item>
    `;
  }
  render() {
    const e = this._getEffectiveItems(), t = this.dataSource && e.length === 0 ? this._lazyChildren.get(null) ?? [] : e, r = this.dataSource !== void 0 && this.items.length === 0 && this._loading.has(null);
    return l`
      <div class="tree-root" role="tree">
        ${r ? l`
          <div class="lazy-indicator lazy-root">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        ` : x}
        ${t.map((o) => this._renderItem(o))}
      </div>
    `;
  }
  // ─── Drag & Drop Handlers ─────────────────────────────────────────────────
  _getTreeItemFromEvent(e) {
    const t = e.composedPath();
    for (const i of t)
      if (i instanceof HTMLElement && i.tagName === "UI-TREE-ITEM")
        return i;
    const r = e.target;
    return r && r.tagName === "UI-TREE-ITEM" ? r : r?.closest?.("ui-tree-item") ?? null;
  }
  _clearDropTarget() {
    this._dropTargetId = null, this._dropPosition = null, this._updateItemDropStates();
  }
  _updateItemDropStates() {
    this._getAllItems().forEach((e) => {
      e.itemId === this._dropTargetId ? e.dropPosition = this._dropPosition : e.dropPosition = null;
    });
  }
  _moveItem(e, t, r) {
    if (!this._orderedItems) return;
    const o = this._findItemAndParentInTree(e, this._orderedItems), i = this._findItemAndParentInTree(t, this._orderedItems);
    if (!o || !i) return;
    o.parentList.splice(o.index, 1);
    let n = null, h = 0;
    if (r === "inside") {
      const v = i.item, m = this.getItemChildren(v), b = Object.keys(v).find((J) => v[J] === m) || "children";
      v[b] || (v[b] = []);
      const $ = v[b];
      $.push(o.item), n = t, h = $.length - 1;
    } else {
      const v = this._findItemAndParentInTree(t, this._orderedItems);
      if (!v) return;
      const m = r === "before" ? v.index : v.index + 1;
      v.parentList.splice(m, 0, o.item), n = v.parentId, h = m;
    }
    this._orderedItems = [...this._orderedItems], this.onItemPositionChange?.({
      itemId: e,
      newParentId: n,
      newIndex: h
    }), this.dispatchEvent(new CustomEvent("item-position-change", {
      detail: { itemId: e, newParentId: n, newIndex: h },
      bubbles: !0,
      composed: !0
    }));
  }
};
I.styles = p`
    :host {
      display: block;
      font-family: var(--ui-font-family, system-ui, sans-serif);
    }

    .tree-root {
      padding: 4px 0;
    }

    /* ── Lazy loading indicators ───────────────────────────────── */

    .lazy-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 32px;
      font-size: 14px;
      color: var(--ui-text-color, #6b7280);
    }

    .lazy-root {
      padding: 8px 8px;
    }

    @keyframes ui-spin {
      to { transform: rotate(360deg); }
    }

    .lazy-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: ui-spin 0.7s linear infinite;
      flex-shrink: 0;
      opacity: 0.55;
    }

    /* ── Drag & Drop indicators ────────────────────────────────── */

    /* FIX #1: Added missing drag/drop CSS that was completely absent */

    ui-tree-item[dragging] {
      opacity: 0.4;
    }

    ui-tree-item[drop-position="before"] {
      box-shadow: 0 -2px 0 0 var(--ui-primary, #3b82f6);
    }

    ui-tree-item[drop-position="after"] {
      box-shadow: 0 2px 0 0 var(--ui-primary, #3b82f6);
    }

    ui-tree-item[drop-position="inside"] {
      outline: 2px solid var(--ui-primary, #3b82f6);
      outline-offset: -1px;
      border-radius: 4px;
    }
  `;
P([
  s({ attribute: !1 })
], I.prototype, "items", 2);
P([
  s({ attribute: !1 })
], I.prototype, "dataSource", 2);
P([
  s({ attribute: !1 })
], I.prototype, "getItemId", 2);
P([
  s({ attribute: !1 })
], I.prototype, "getItemLabel", 2);
P([
  s({ attribute: !1 })
], I.prototype, "getItemChildren", 2);
P([
  s({ attribute: !1 })
], I.prototype, "isItemDisabled", 2);
P([
  s({ type: Boolean, attribute: "disabled-items-focusable" })
], I.prototype, "disabledItemsFocusable", 2);
P([
  s({ attribute: !1 })
], I.prototype, "onItemClick", 2);
P([
  s({ type: String, attribute: "expansion-trigger" })
], I.prototype, "expansionTrigger", 2);
P([
  s({ attribute: !1 })
], I.prototype, "expandedItems", 2);
P([
  s({ attribute: !1 })
], I.prototype, "defaultExpandedItems", 2);
P([
  s({ attribute: !1 })
], I.prototype, "onExpandedItemsChange", 2);
P([
  s({ type: Boolean, attribute: "items-reordering" })
], I.prototype, "itemsReordering", 2);
P([
  s({ attribute: !1 })
], I.prototype, "isItemReorderable", 2);
P([
  s({ attribute: !1 })
], I.prototype, "canMoveItemToNewPosition", 2);
P([
  s({ type: Boolean, attribute: "items-reordering-handle" })
], I.prototype, "itemsReorderingHandle", 2);
P([
  s({ attribute: !1 })
], I.prototype, "onItemPositionChange", 2);
P([
  g()
], I.prototype, "_orderedItems", 2);
P([
  g()
], I.prototype, "_draggedItemId", 2);
P([
  g()
], I.prototype, "_dropTargetId", 2);
P([
  g()
], I.prototype, "_dropPosition", 2);
I = P([
  d("ui-rich-tree-view")
], I);
var ra = Object.defineProperty, oa = Object.getOwnPropertyDescriptor, M = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? oa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ra(t, r, i), i;
};
let Xi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Xi.styles = p`
        :host {
            display: inline-flex;
            align-items: center;
            margin-left: auto;
            padding-left: 8px;
            font-size: 0.6875rem;
            letter-spacing: 0.05em;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
Xi = M([
  d("ui-command-shortcut")
], Xi);
let Gi = class extends c {
  render() {
    return l``;
  }
};
Gi.styles = p`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
        :host([hidden]) { display: none !important; }
    `;
Gi = M([
  d("ui-command-separator")
], Gi);
let rt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.disabled = !1, this.highlighted = !1, this._hasIcon = !1;
  }
  _onIconSlotChange(e) {
    const t = e.target;
    this._hasIcon = t.assignedNodes({ flatten: !0 }).length > 0;
  }
  /** Scroll this item into view (nearest ancestor scroll container). */
  scrollIntoViewIfNeeded() {
    typeof this.scrollIntoView == "function" && this.scrollIntoView({ block: "nearest" });
  }
  _handleClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-command-item-select", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value || this.textContent?.trim() || "" }
    }));
  }
  render() {
    return l`
            <div
                class="item"
                role="option"
                aria-selected=${this.highlighted ? "true" : "false"}
                aria-disabled=${this.disabled ? "true" : "false"}
                tabindex="-1"
                @click=${this._handleClick}
            >
                <span class="icon" ?hidden=${!this._hasIcon}>
                    <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
                </span>
                <span class="label"><slot></slot></span>
                <slot name="shortcut"></slot>
            </div>
        `;
  }
};
rt.styles = p`
        :host { display: block; }
        :host([hidden]) { display: none !important; }

        .item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            outline: none;
            user-select: none;
            transition: background 0.1s;
        }

        :host([highlighted]) .item {
            background: var(--ui-command-highlight-bg, rgba(0, 0, 0, 0.06));
            color: var(--ui-command-highlight-color, var(--ui-text-color, #111827));
        }

        .item:hover {
            background: var(--ui-hover-bg, rgba(0, 0, 0, 0.04));
        }

        :host([highlighted]) .item:hover {
            background: var(--ui-command-highlight-bg, rgba(0, 0, 0, 0.06));
        }

        :host([disabled]) .item {
            opacity: 0.38;
            cursor: not-allowed;
            pointer-events: none;
        }

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            color: var(--ui-text-color-muted, #6b7280);
        }

        .label { flex: 1; }

        [hidden] { display: none !important; }
    `;
M([
  s({ type: String, reflect: !0 })
], rt.prototype, "value", 2);
M([
  s({ type: Boolean, reflect: !0 })
], rt.prototype, "disabled", 2);
M([
  s({ type: Boolean, reflect: !0 })
], rt.prototype, "highlighted", 2);
M([
  g()
], rt.prototype, "_hasIcon", 2);
rt = M([
  d("ui-command-item")
], rt);
let Ji = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ji.styles = p`
        :host {
            display: block;
            padding: 24px 8px;
            text-align: center;
            font-size: 0.875rem;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
        :host([hidden]) { display: none !important; }
    `;
Ji = M([
  d("ui-command-empty")
], Ji);
let ui = class extends c {
  constructor() {
    super(...arguments), this.heading = "";
  }
  render() {
    return l`
            <div class="heading">${this.heading}</div>
            <slot></slot>
        `;
  }
};
ui.styles = p`
        :host {
            display: block;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
        :host([hidden]) { display: none !important; }

        .heading {
            padding: 6px 8px 2px;
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--ui-text-color-muted, #6b7280);
        }

        .heading:empty { display: none; }
    `;
M([
  s({ type: String, reflect: !0 })
], ui.prototype, "heading", 2);
ui = M([
  d("ui-command-group")
], ui);
let Qi = class extends c {
  render() {
    return l`
            <div class="list" role="listbox" tabindex="0" aria-label="Command results">
                <slot></slot>
            </div>
        `;
  }
};
Qi.styles = p`
        :host {
            display: block;
            overflow-y: auto;
            max-height: var(--ui-command-list-max-height, 300px);
        }

        .list {
            padding: 4px;
            outline: none;
        }

        .list:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: -2px;
        }
    `;
Qi = M([
  d("ui-command-list")
], Qi);
let Ht = class extends c {
  constructor() {
    super(...arguments), this.placeholder = "Type a command or search...", this.value = "";
  }
  _handleInput(e) {
    const t = e.target;
    this.value = t.value, this.dispatchEvent(new CustomEvent("_cmd-filter", {
      bubbles: !0,
      composed: !0,
      detail: { query: t.value }
    }));
  }
  /** Focus the inner input element. */
  focus() {
    this.shadowRoot?.querySelector("input")?.focus();
  }
  /** Reset the input value and broadcast an empty filter. */
  reset() {
    const e = this.shadowRoot?.querySelector("input");
    e && (e.value = ""), this.value = "", this.dispatchEvent(new CustomEvent("_cmd-filter", {
      bubbles: !0,
      composed: !0,
      detail: { query: "" }
    }));
  }
  render() {
    return l`
            <div class="input-wrap">
                <span class="search-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <input
                    type="search"
                    .value=${this.value}
                    placeholder=${this.placeholder}
                    aria-label="Search commands"
                    @input=${this._handleInput}
                    autocomplete="off"
                    spellcheck="false"
                />
            </div>
        `;
  }
};
Ht.styles = p`
        :host {
            display: block;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }

        .input-wrap {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 12px;
            border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
        }

        .search-icon {
            flex-shrink: 0;
            color: var(--ui-text-color-muted, #6b7280);
            display: flex;
            align-items: center;
        }

        input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            font-size: 0.9375rem;
            color: var(--ui-text-color, #111827);
            font-family: inherit;
            min-width: 0;
        }

        input::placeholder {
            color: var(--ui-text-color-muted, #6b7280);
        }

        /* Hide the native clear button added by type="search" in WebKit. */
        input[type="search"]::-webkit-search-cancel-button { display: none; }
        input[type="search"]::-webkit-search-decoration      { display: none; }
    `;
M([
  s({ type: String })
], Ht.prototype, "placeholder", 2);
M([
  s({ type: String, reflect: !0 })
], Ht.prototype, "value", 2);
Ht = M([
  d("ui-command-input")
], Ht);
let Zi = class extends c {
  constructor() {
    super(...arguments), this._query = "", this._highlightedItem = null, this._handleFilter = (e) => {
      this._applyFilter(e.detail.query);
    }, this._handleKeyDown = (e) => {
      const t = this._getNavigableItems();
      if (t.length === 0) return;
      const r = this._highlightedItem ? t.indexOf(this._highlightedItem) : -1;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(), this._setHighlight(t[(r + 1) % t.length]);
          break;
        case "ArrowUp":
          e.preventDefault(), this._setHighlight(t[(r - 1 + t.length) % t.length]);
          break;
        case "Enter":
          e.preventDefault(), this._highlightedItem && this._activateItem(this._highlightedItem);
          break;
        case "Home":
          e.preventDefault(), this._setHighlight(t[0]);
          break;
        case "End":
          e.preventDefault(), this._setHighlight(t[t.length - 1]);
          break;
      }
    };
  }
  /* ── Lifecycle ─────────────────────────────────────────────────────────── */
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("_cmd-filter", this._handleFilter), this.addEventListener("keydown", this._handleKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("_cmd-filter", this._handleFilter), this.removeEventListener("keydown", this._handleKeyDown);
  }
  /* ── Private helpers ───────────────────────────────────────────────────── */
  /** Items that can receive keyboard highlight (visible + not disabled). */
  _getNavigableItems() {
    return [...this.querySelectorAll("ui-command-item")].filter(
      (e) => !e.hidden && !e.disabled
    );
  }
  _setHighlight(e) {
    this._highlightedItem && (this._highlightedItem.highlighted = !1), this._highlightedItem = e, e && (e.highlighted = !0, e.scrollIntoViewIfNeeded());
  }
  _activateItem(e) {
    e.dispatchEvent(new CustomEvent("ui-command-item-select", {
      bubbles: !0,
      composed: !0,
      detail: { value: e.value || e.textContent?.trim() || "" }
    }));
  }
  _applyFilter(e) {
    this._query = e;
    const t = e.toLowerCase(), r = [...this.querySelectorAll("ui-command-item")];
    let o = 0;
    for (const h of r) {
      const v = (h.value || h.textContent || "").toLowerCase().trim(), m = t === "" || v.includes(t);
      h.hidden = !m, m && o++;
    }
    const i = [...this.querySelectorAll("ui-command-group")];
    for (const h of i) {
      const v = [...h.querySelectorAll("ui-command-item")];
      h.hidden = v.length === 0 || v.every((m) => m.hidden);
    }
    const a = this.querySelector("ui-command-empty");
    a && (a.hidden = o > 0);
    const n = this.querySelector("ui-command-list");
    if (n) {
      const h = [...n.children], v = (m) => m.tagName.toLowerCase() !== "ui-command-separator" && m.tagName.toLowerCase() !== "ui-command-empty" && !m.hidden;
      for (const m of h) {
        if (m.tagName.toLowerCase() !== "ui-command-separator") continue;
        const b = h.indexOf(m), $ = h.slice(0, b).some(v), J = h.slice(b + 1).some(v);
        m.hidden = !$ || !J;
      }
    }
    this._setHighlight(this._getNavigableItems()[0] ?? null);
  }
  /* ── Slot change — initialise state once children are assigned ─────────── */
  _onSlotChange() {
    this._applyFilter(this._query);
  }
  /* ── Public API ────────────────────────────────────────────────────────── */
  /** Reset search query and restore all items. */
  reset() {
    const e = this.querySelector("ui-command-input");
    e ? e.reset() : this._applyFilter("");
  }
  render() {
    return l`
            <div class="command" part="command">
                <slot @slotchange=${this._onSlotChange}></slot>
            </div>
        `;
  }
};
Zi.styles = p`
        :host {
            display: block;
            font-family: var(--ui-font-family, system-ui, sans-serif);
            background: var(--ui-surface-background, #fff);
            border-radius: var(--ui-border-radius-md, 8px);
            overflow: hidden;
        }

        .command {
            display: flex;
            flex-direction: column;
        }
    `;
Zi = M([
  d("ui-command")
], Zi);
let fi = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this._boundKeyDown = (e) => {
      this.open && e.key === "Escape" && (e.stopPropagation(), this._close());
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._boundKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._boundKeyDown);
  }
  /* ── Open/close side-effects ──────────────────────────────────────────── */
  updated(e) {
    e.has("open") && (this.open ? requestAnimationFrame(() => {
      this.querySelector("ui-command-input")?.focus();
    }) : this.querySelector("ui-command")?.reset());
  }
  _close() {
    this.dispatchEvent(new CustomEvent("ui-command-dialog-close", {
      bubbles: !0,
      composed: !0
    }));
  }
  _handleBackdropClick(e) {
    e.target === e.currentTarget && this._close();
  }
  render() {
    return l`
            <div
                class=${u({ backdrop: !0, open: this.open })}
                aria-hidden=${this.open ? "false" : "true"}
                @click=${this._handleBackdropClick}
            >
                <div
                    class="panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Command menu"
                >
                    <slot></slot>
                </div>
            </div>
        `;
  }
};
fi.styles = p`
        :host { display: block; }

        .backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: var(--ui-command-z-index, 1400);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 12vh;

            opacity: 0;
            pointer-events: none;
            transition: opacity 0.18s ease;
        }

        .backdrop.open {
            opacity: 1;
            pointer-events: auto;
        }

        .panel {
            width: 100%;
            max-width: var(--ui-command-dialog-width, 512px);
            background: var(--ui-surface-background, #fff);
            border-radius: var(--ui-border-radius-md, 8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15),
                        0 10px 10px -5px rgba(0, 0, 0, 0.06);
            overflow: hidden;

            transform: scale(0.94) translateY(-8px);
            transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .backdrop.open .panel {
            transform: scale(1) translateY(0);
        }
    `;
M([
  s({ type: Boolean, reflect: !0 })
], fi.prototype, "open", 2);
fi = M([
  d("ui-command-dialog")
], fi);
var sa = Object.defineProperty, aa = Object.getOwnPropertyDescriptor, R = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? aa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && sa(t, r, i), i;
};
const pr = p`
  :host {
    display: inline-flex;
  }
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--ui-border-color, #e5e7eb);
    background: var(--ui-surface-background, #ffffff);
    color: var(--ui-text-color, #111827);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, border-color 0.2s;
    box-shadow: var(--ui-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }
  button:hover:not(:disabled) {
    background: var(--ui-surface-background-flat, #f3f4f6);
    border-color: var(--ui-input-border-color, #d1d5db);
  }
  button:focus-visible {
    outline: 2px solid var(--ui-primary-color, #3b82f6);
    outline-offset: 2px;
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
let Pt = class extends c {
  constructor() {
    super(...arguments), this.index = 0, this.itemsPerView = 1, this.orientation = "horizontal";
  }
  updated(e) {
    e.has("itemsPerView") && this.style.setProperty(
      "--ui-carousel-items-per-view",
      String(this.itemsPerView)
    );
  }
  render() {
    const r = `calc((100% + var(--ui-carousel-gap, 0px)) / ${this.itemsPerView})`, o = `calc(-${this.index} * ${r})`, i = this.orientation === "vertical" ? `translateY(${o})` : `translateX(${o})`;
    return l`
      <div
        class="track"
        style="transform: ${i}"
        aria-live="polite"
        aria-atomic="false"
      >
        <slot></slot>
      </div>
    `;
  }
};
Pt.styles = p`
    :host {
      display: block;
      overflow: hidden;
      width: 100%;
    }
    .track {
      display: flex;
      flex-wrap: nowrap;
      height: 100%;
      gap: var(--ui-carousel-gap, 0px);
      will-change: transform;
      transition:
        transform var(--ui-carousel-duration, 0.35s)
        var(--ui-carousel-ease, cubic-bezier(0.25, 0.1, 0.25, 1));
    }
    :host([orientation='vertical']) {
      height: var(--ui-carousel-height, 320px);
    }
    :host([orientation='vertical']) .track {
      flex-direction: column;
    }
    ::slotted(ui-carousel-item) {
      /* Width = (viewport - gaps between visible items) / items-per-view */
      flex: 0 0 calc(
        (100% - (var(--ui-carousel-items-per-view, 1) - 1) * var(--ui-carousel-gap, 0px))
        / var(--ui-carousel-items-per-view, 1)
      );
      min-width: 0;
      min-height: 0;
    }
    :host([orientation='vertical']) ::slotted(ui-carousel-item) {
      /* Height = (viewport - gaps between visible items) / items-per-view */
      flex: 0 0 calc(
        (var(--ui-carousel-height, 320px) - (var(--ui-carousel-items-per-view, 1) - 1) * var(--ui-carousel-gap, 0px))
        / var(--ui-carousel-items-per-view, 1)
      );
      min-height: 0;
    }
  `;
R([
  s({ type: Number })
], Pt.prototype, "index", 2);
R([
  s({ type: Number, attribute: "items-per-view" })
], Pt.prototype, "itemsPerView", 2);
R([
  s({ reflect: !0 })
], Pt.prototype, "orientation", 2);
Pt = R([
  d("ui-carousel-content")
], Pt);
let er = class extends c {
  render() {
    return l`
      <div class="item" role="group" aria-roledescription="slide">
        <slot></slot>
      </div>
    `;
  }
};
er.styles = p`
    :host {
      display: block;
      flex-shrink: 0;
      min-width: 0;
    }
    .item {
      width: 100%;
      height: 100%;
    }
  `;
er = R([
  d("ui-carousel-item")
], er);
let Kt = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this.orientation = "horizontal", this._handleClick = () => {
      this.closest("ui-carousel")?.previous();
    };
  }
  render() {
    const e = this.orientation === "vertical" ? l`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>` : l`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
    return l`
      <button
        type="button"
        part="button"
        ?disabled=${this.disabled}
        aria-label="Go to previous slide"
        @click=${this._handleClick}
      >
        <slot>${e}</slot>
      </button>
    `;
  }
};
Kt.styles = pr;
R([
  s({ type: Boolean, reflect: !0 })
], Kt.prototype, "disabled", 2);
R([
  s({ reflect: !0 })
], Kt.prototype, "orientation", 2);
Kt = R([
  d("ui-carousel-previous")
], Kt);
let Wt = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this.orientation = "horizontal", this._handleClick = () => {
      this.closest("ui-carousel")?.next();
    };
  }
  render() {
    const e = this.orientation === "vertical" ? l`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>` : l`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    return l`
      <button
        type="button"
        part="button"
        ?disabled=${this.disabled}
        aria-label="Go to next slide"
        @click=${this._handleClick}
      >
        <slot>${e}</slot>
      </button>
    `;
  }
};
Wt.styles = pr;
R([
  s({ type: Boolean, reflect: !0 })
], Wt.prototype, "disabled", 2);
R([
  s({ reflect: !0 })
], Wt.prototype, "orientation", 2);
Wt = R([
  d("ui-carousel-next")
], Wt);
let ot = class extends c {
  constructor() {
    super(...arguments), this.loop = !1, this.orientation = "horizontal", this.autoplay = 0, this.itemsPerView = 1, this._currentIndex = 0, this._total = 0, this._observer = null, this._autoplayTimer = null, this._handleKeydown = (e) => {
      const t = this.orientation === "vertical", r = t ? "ArrowUp" : "ArrowLeft", o = t ? "ArrowDown" : "ArrowRight";
      e.key === r ? (e.preventDefault(), this.previous()) : e.key === o && (e.preventDefault(), this.next());
    };
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer?.disconnect(), this._observer = null, this._stopAutoplay();
  }
  firstUpdated() {
    this._countItems(), this._syncNavigation();
    const e = this.querySelector("ui-carousel-content");
    e && (this._observer = new MutationObserver(() => {
      this._countItems(), this._syncNavigation();
    }), this._observer.observe(e, { childList: !0 })), this.autoplay > 0 && this._startAutoplay();
  }
  updated(e) {
    e.has("autoplay") && (this._stopAutoplay(), this.autoplay > 0 && this._startAutoplay()), (e.has("orientation") || e.has("loop") || e.has("itemsPerView")) && this._syncNavigation();
  }
  _countItems() {
    const e = this.querySelector("ui-carousel-content"), t = e ? e.querySelectorAll("ui-carousel-item").length : 0;
    t !== this._total && (this._total = t, this._currentIndex = Math.min(
      this._currentIndex,
      Math.max(0, t - 1)
    ));
  }
  _syncNavigation() {
    const e = this.querySelector(
      "ui-carousel-content"
    ), t = this.querySelector(
      "ui-carousel-previous"
    ), r = this.querySelector(
      "ui-carousel-next"
    ), o = Math.max(0, this._total - this.itemsPerView);
    e && (e.index = this._currentIndex, e.orientation = this.orientation, e.itemsPerView = this.itemsPerView), t && (t.disabled = !this.loop && this._currentIndex === 0, t.orientation = this.orientation), r && (r.disabled = !this.loop && (this._total === 0 || this._currentIndex >= o), r.orientation = this.orientation);
  }
  _fireChange() {
    this.dispatchEvent(
      new CustomEvent("ui-carousel-change", {
        detail: { index: this._currentIndex, total: this._total },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /** Advance to the next slide. */
  next() {
    if (this._total === 0) return;
    const e = Math.max(0, this._total - this.itemsPerView);
    !this.loop && this._currentIndex >= e || (this._currentIndex = this.loop ? (this._currentIndex + 1) % this._total : this._currentIndex + 1, this._syncNavigation(), this._fireChange());
  }
  /** Go to the previous slide. */
  previous() {
    this._total !== 0 && (!this.loop && this._currentIndex <= 0 || (this._currentIndex = this.loop ? (this._currentIndex - 1 + this._total) % this._total : this._currentIndex - 1, this._syncNavigation(), this._fireChange()));
  }
  /** Jump to a specific slide (0-based index). */
  goTo(e) {
    e < 0 || e >= this._total || e === this._currentIndex || (this._currentIndex = e, this._syncNavigation(), this._fireChange());
  }
  /** Current slide index (read-only). */
  get currentIndex() {
    return this._currentIndex;
  }
  /** Total number of slides (read-only). */
  get total() {
    return this._total;
  }
  _startAutoplay() {
    this._stopAutoplay(), this._autoplayTimer = setInterval(() => {
      const e = Math.max(0, this._total - this.itemsPerView);
      this.loop || this._currentIndex < e ? this.next() : this._stopAutoplay();
    }, this.autoplay);
  }
  _stopAutoplay() {
    this._autoplayTimer !== null && (clearInterval(this._autoplayTimer), this._autoplayTimer = null);
  }
  render() {
    return l`
      <div
        class="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        tabindex="0"
        @keydown=${this._handleKeydown}
      >
        <slot></slot>
      </div>
    `;
  }
};
ot.styles = p`
    :host {
      display: block;
      position: relative;
    }
    .carousel {
      position: relative;
      width: 100%;
      outline: none;
    }
    .carousel:focus-visible {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 4px;
      border-radius: var(--ui-border-radius-md, 6px);
    }
  `;
R([
  s({ type: Boolean })
], ot.prototype, "loop", 2);
R([
  s({ reflect: !0 })
], ot.prototype, "orientation", 2);
R([
  s({ type: Number })
], ot.prototype, "autoplay", 2);
R([
  s({ type: Number, attribute: "items-per-view" })
], ot.prototype, "itemsPerView", 2);
ot = R([
  d("ui-carousel")
], ot);
export {
  Yt as UiAccordion,
  Hi as UiAccordionActions,
  qi as UiAccordionDetails,
  Yi as UiAccordionSummary,
  gt as UiAlert,
  _t as UiAppBar,
  Z as UiAutocomplete,
  de as UiAvatar,
  yt as UiBackdrop,
  Be as UiBadge,
  wt as UiBottomNavigation,
  je as UiBottomNavigationAction,
  y as UiBox,
  pe as UiBreadcrumbs,
  He as UiButton,
  Si as UiButtonGroup,
  jt as UiCard,
  Oi as UiCardActionArea,
  Ei as UiCardActions,
  Pi as UiCardContent,
  Mt as UiCardHeader,
  ft as UiCardMedia,
  ot as UiCarousel,
  Pt as UiCarouselContent,
  er as UiCarouselItem,
  Wt as UiCarouselNext,
  Kt as UiCarouselPrevious,
  ce as UiCheckbox,
  _e as UiChip,
  Je as UiCircularProgress,
  Zi as UiCommand,
  fi as UiCommandDialog,
  Ji as UiCommandEmpty,
  ui as UiCommandGroup,
  Ht as UiCommandInput,
  rt as UiCommandItem,
  Qi as UiCommandList,
  Gi as UiCommandSeparator,
  Xi as UiCommandShortcut,
  $t as UiContainer,
  z as UiDateField,
  L as UiDatePicker,
  ve as UiDatePickerCalendar,
  te as UiDesktopTimePicker,
  xt as UiDialog,
  di as UiDialogActions,
  Vi as UiDialogContent,
  Fi as UiDialogContentText,
  Ni as UiDialogTitle,
  Ct as UiDigitalClock,
  Xe as UiDivider,
  we as UiDrawer,
  Ke as UiFab,
  D as UiGrid,
  Le as UiImageList,
  tt as UiImageListItem,
  hi as UiImageListItemBar,
  Q as UiInput,
  Ft as UiLinearProgress,
  ee as UiLink,
  Di as UiList,
  zi as UiListItem,
  Ti as UiListItemAvatar,
  Bi as UiListItemButton,
  Ai as UiListItemIcon,
  Rt as UiListItemText,
  ji as UiListSubheader,
  Qe as UiMenu,
  Ki as UiMenuDivider,
  ue as UiMenuItem,
  et as UiMobileStepper,
  X as UiMobileTimePicker,
  It as UiMultiSectionDigitalClock,
  O as UiPagination,
  bt as UiPaper,
  De as UiRadio,
  Lt as UiRadioGroup,
  ze as UiRating,
  I as UiRichTreeView,
  le as UiSelect,
  $e as UiSimpleTreeView,
  Ae as UiSkeleton,
  ie as UiSlider,
  We as UiSnackbar,
  fe as UiSpeedDial,
  Me as UiSpeedDialAction,
  N as UiStack,
  St as UiStaticTimePicker,
  V as UiStep,
  qt as UiStepConnector,
  Wi as UiStepContent,
  kt as UiStepLabel,
  Ze as UiStepper,
  vt as UiSwitch,
  ke as UiTab,
  W as UiTabList,
  pi as UiTabPanel,
  Mi as UiTable,
  Ui as UiTableBody,
  Nt as UiTableCell,
  li as UiTableContainer,
  Ri as UiTableFooter,
  Li as UiTableHead,
  Ge as UiTablePagination,
  ci as UiTableRow,
  Vt as UiTableSortLabel,
  be as UiTabs,
  K as UiTextField,
  it as UiTimeClock,
  B as UiTimeField,
  re as UiTimePicker,
  mt as UiToggleButton,
  Ut as UiToggleButtonGroup,
  Te as UiTooltip,
  xe as UiTransferList,
  G as UiTreeItem,
  he as UiTypography
};
