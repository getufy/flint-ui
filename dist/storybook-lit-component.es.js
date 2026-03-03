import { css as p, LitElement as c, html as l, nothing as x } from "lit";
import { property as s, customElement as d, query as Mt, state as m, queryAssignedElements as Kr } from "lit/decorators.js";
import { classMap as u } from "lit/directives/class-map.js";
import { repeat as xt } from "lit/directives/repeat.js";
import { ifDefined as yi } from "lit/directives/if-defined.js";
import { styleMap as pt } from "lit/directives/style-map.js";
import { literal as C, html as Vr, unsafeStatic as Wr } from "lit/static-html.js";
var Xr = Object.defineProperty, Gr = Object.getOwnPropertyDescriptor, li = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Gr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Xr(t, r, i), i;
};
let Je = class extends c {
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
Je.styles = p`
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
li([
  s({ type: String })
], Je.prototype, "variant", 2);
li([
  s({ type: String })
], Je.prototype, "size", 2);
li([
  s({ type: Boolean })
], Je.prototype, "disabled", 2);
li([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], Je.prototype, "fullWidth", 2);
Je = li([
  d("ui-button")
], Je);
var Jr = Object.getOwnPropertyDescriptor, Qr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Jr(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let Fi = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Fi.styles = p`
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
Fi = Qr([
  d("ui-button-group")
], Fi);
var Zr = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, Ar = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? eo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Zr(t, r, i), i;
};
let Ht = class extends c {
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
Ht.styles = p`
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
Ar([
  s({ type: String, reflect: !0 })
], Ht.prototype, "variant", 2);
Ar([
  s({ type: Boolean, reflect: !0 })
], Ht.prototype, "interactive", 2);
Ht = Ar([
  d("ui-card")
], Ht);
var to = Object.defineProperty, io = Object.getOwnPropertyDescriptor, Tr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? io(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && to(t, r, i), i;
};
let Kt = class extends c {
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
Kt.styles = p`
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
Tr([
  s({ type: String })
], Kt.prototype, "title", 2);
Tr([
  s({ type: String })
], Kt.prototype, "subtitle", 2);
Kt = Tr([
  d("ui-card-header")
], Kt);
var ro = Object.getOwnPropertyDescriptor, oo = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ro(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let Yi = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Yi.styles = p`
    :host {
      display: block;
      padding: var(--ui-card-content-padding, 16px 24px);
      font-size: var(--ui-card-content-size, 1rem);
      color: var(--ui-card-content-color, #4b5563);
      line-height: 1.5;
    }
  `;
Yi = oo([
  d("ui-card-content")
], Yi);
var so = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, Di = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ao(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && so(t, r, i), i;
};
let _t = class extends c {
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
_t.styles = p`
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
Di([
  s({ type: String })
], _t.prototype, "image", 2);
Di([
  s({ type: String })
], _t.prototype, "alt", 2);
Di([
  s({ type: String })
], _t.prototype, "height", 2);
_t = Di([
  d("ui-card-media")
], _t);
var no = Object.getOwnPropertyDescriptor, lo = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? no(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let qi = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
qi.styles = p`
    :host {
      display: flex;
      padding: var(--ui-card-actions-padding, 8px 16px);
      align-items: center;
      gap: 8px;
    }
  `;
qi = lo([
  d("ui-card-actions")
], qi);
var co = Object.getOwnPropertyDescriptor, po = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? co(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = n(i) || i);
  return i;
};
let Hi = class extends c {
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
Hi.styles = p`
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
Hi = po([
  d("ui-card-action-area")
], Hi);
var ho = Object.defineProperty, uo = Object.getOwnPropertyDescriptor, zi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? uo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ho(t, r, i), i;
};
let wt = class extends c {
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
wt.styles = p`
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
zi([
  s({ type: Number, reflect: !0 })
], wt.prototype, "elevation", 2);
zi([
  s({ type: Boolean, reflect: !0 })
], wt.prototype, "square", 2);
zi([
  s({ type: String, reflect: !0 })
], wt.prototype, "variant", 2);
wt = zi([
  d("ui-paper")
], wt);
var fo = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, ye = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? bo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && fo(t, r, i), i;
};
let ee = class extends c {
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
ee.styles = p`
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
ye([
  s({ type: String })
], ee.prototype, "label", 2);
ye([
  s({ type: String })
], ee.prototype, "value", 2);
ye([
  s({ type: String })
], ee.prototype, "type", 2);
ye([
  s({ type: String })
], ee.prototype, "placeholder", 2);
ye([
  s({ type: String })
], ee.prototype, "helpText", 2);
ye([
  s({ type: Boolean })
], ee.prototype, "error", 2);
ye([
  s({ type: String })
], ee.prototype, "errorMessage", 2);
ye([
  s({ type: Boolean })
], ee.prototype, "disabled", 2);
ye([
  Mt("input")
], ee.prototype, "inputElement", 2);
ee = ye([
  d("ui-input")
], ee);
var vo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, Ye = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? mo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && vo(t, r, i), i;
};
let de = class extends c {
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
            
            ${this.multiple ? xt(e, (t) => t.value, (t) => l`
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
          ` : xt(this.options, (t) => t.value, (t) => {
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
de.styles = p`
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
Ye([
  s({ type: String })
], de.prototype, "label", 2);
Ye([
  s({ type: Array })
], de.prototype, "options", 2);
Ye([
  s({ type: Array })
], de.prototype, "value", 2);
Ye([
  s({ type: Boolean })
], de.prototype, "multiple", 2);
Ye([
  s({ type: String })
], de.prototype, "placeholder", 2);
Ye([
  s({ type: Boolean, reflect: !0 })
], de.prototype, "disabled", 2);
Ye([
  m()
], de.prototype, "isOpen", 2);
de = Ye([
  d("ui-select")
], de);
var go = Object.defineProperty, yo = Object.getOwnPropertyDescriptor, ci = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? yo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && go(t, r, i), i;
};
let Qe = class extends c {
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
        aria-label="${yi(this.extended ? void 0 : this.label)}"
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
Qe.styles = p`
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
ci([
  s({ type: Boolean, reflect: !0 })
], Qe.prototype, "extended", 2);
ci([
  s({ type: Boolean, reflect: !0 })
], Qe.prototype, "disabled", 2);
ci([
  s({ type: String })
], Qe.prototype, "label", 2);
ci([
  s({ type: String })
], Qe.prototype, "position", 2);
Qe = ci([
  d("ui-fab")
], Qe);
var xo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, xe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? _o(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && xo(t, r, i), i;
};
let te = class extends c {
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
te.styles = p`
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
xe([
  s({ type: Array })
], te.prototype, "options", 2);
xe([
  s({ type: Boolean })
], te.prototype, "freeSolo", 2);
xe([
  s({ type: Boolean })
], te.prototype, "disabled", 2);
xe([
  s({ type: String })
], te.prototype, "value", 2);
xe([
  s({ type: String })
], te.prototype, "placeholder", 2);
xe([
  m()
], te.prototype, "_isOpen", 2);
xe([
  m()
], te.prototype, "_inputValue", 2);
xe([
  m()
], te.prototype, "_filteredOptions", 2);
xe([
  m()
], te.prototype, "_activeIndex", 2);
te = xe([
  d("ui-autocomplete")
], te);
var wo = Object.defineProperty, ko = Object.getOwnPropertyDescriptor, qe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ko(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && wo(t, r, i), i;
};
let pe = class extends c {
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
pe.styles = p`
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
qe([
  s({ type: Boolean, reflect: !0 })
], pe.prototype, "checked", 2);
qe([
  s({ type: Boolean })
], pe.prototype, "indeterminate", 2);
qe([
  s({ type: Boolean, reflect: !0 })
], pe.prototype, "disabled", 2);
qe([
  s({ type: Boolean })
], pe.prototype, "required", 2);
qe([
  s({ type: String })
], pe.prototype, "label", 2);
qe([
  s({ type: String })
], pe.prototype, "name", 2);
qe([
  s({ type: String })
], pe.prototype, "value", 2);
pe = qe([
  d("ui-checkbox")
], pe);
var $o = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, Pe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Co(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && $o(t, r, i), i;
};
let Wt = class extends c {
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
Wt.styles = p`
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
Pe([
  s({ type: String })
], Wt.prototype, "name", 2);
Pe([
  s({ type: String })
], Wt.prototype, "value", 2);
Wt = Pe([
  d("ui-radio-group")
], Wt);
let Te = class extends c {
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
Te.styles = p`
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
Pe([
  s({ type: Boolean, reflect: !0 })
], Te.prototype, "checked", 2);
Pe([
  s({ type: Boolean })
], Te.prototype, "disabled", 2);
Pe([
  s({ type: String })
], Te.prototype, "name", 2);
Pe([
  s({ type: String })
], Te.prototype, "value", 2);
Pe([
  s({ type: String })
], Te.prototype, "label", 2);
Te = Pe([
  d("ui-radio")
], Te);
var Io = Object.defineProperty, So = Object.getOwnPropertyDescriptor, Ut = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? So(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Io(t, r, i), i;
};
let je = class extends c {
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
je.styles = p`
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
Ut([
  s({ type: Number })
], je.prototype, "value", 2);
Ut([
  s({ type: Number })
], je.prototype, "max", 2);
Ut([
  s({ type: Boolean })
], je.prototype, "readonly", 2);
Ut([
  s({ type: String })
], je.prototype, "name", 2);
Ut([
  m()
], je.prototype, "_hoverValue", 2);
je = Ut([
  d("ui-rating")
], je);
var Po = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, Bi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Oo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Po(t, r, i), i;
};
let kt = class extends c {
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
kt.styles = p`
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
Bi([
  s({ type: Boolean, reflect: !0 })
], kt.prototype, "checked", 2);
Bi([
  s({ type: Boolean, reflect: !0 })
], kt.prototype, "disabled", 2);
Bi([
  s({ type: String })
], kt.prototype, "label", 2);
kt = Bi([
  d("ui-switch")
], kt);
var Eo = Object.defineProperty, Do = Object.getOwnPropertyDescriptor, ht = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Do(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Eo(t, r, i), i;
};
let we = class extends c {
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
            ${xt(e, (r) => r.value, (r) => l`
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
            ${xt(t, (r) => r.value, (r) => l`
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
we.styles = p`
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
ht([
  s({ type: Array })
], we.prototype, "options", 2);
ht([
  s({ type: Array })
], we.prototype, "value", 2);
ht([
  s({ type: String })
], we.prototype, "leftTitle", 2);
ht([
  s({ type: String })
], we.prototype, "rightTitle", 2);
ht([
  m()
], we.prototype, "leftChecked", 2);
ht([
  m()
], we.prototype, "rightChecked", 2);
we = ht([
  d("ui-transfer-list")
], we);
var zo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Rt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Bo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && zo(t, r, i), i;
};
let Le = class extends c {
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
Le.styles = p`
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
Rt([
  s({ type: String })
], Le.prototype, "content", 2);
Rt([
  s({ type: Boolean })
], Le.prototype, "dot", 2);
Rt([
  s({ type: Boolean })
], Le.prototype, "invisible", 2);
Rt([
  s({ type: String })
], Le.prototype, "variant", 2);
Rt([
  s({ type: Number })
], Le.prototype, "max", 2);
Le = Rt([
  d("ui-badge")
], Le);
var Ao = Object.defineProperty, To = Object.getOwnPropertyDescriptor, Ai = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? To(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ao(t, r, i), i;
};
let $t = class extends c {
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
$t.styles = p`
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
Ai([
  s({ type: String })
], $t.prototype, "severity", 2);
Ai([
  s({ type: String })
], $t.prototype, "title", 2);
Ai([
  s({ type: Boolean })
], $t.prototype, "dismissible", 2);
$t = Ai([
  d("ui-alert")
], $t);
var jo = Object.defineProperty, Lo = Object.getOwnPropertyDescriptor, Nt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Lo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && jo(t, r, i), i;
};
let Me = class extends c {
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
                style=${pt(e)}
                aria-hidden="true"
            ></span>
        `;
  }
};
Me.styles = p`
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
Nt([
  s({ type: Boolean, reflect: !0 })
], Me.prototype, "dark", 2);
Nt([
  s({ type: String })
], Me.prototype, "animation", 2);
Nt([
  s({ type: String })
], Me.prototype, "variant", 2);
Nt([
  s({ type: String })
], Me.prototype, "width", 2);
Nt([
  s({ type: String })
], Me.prototype, "height", 2);
Me = Nt([
  d("ui-skeleton")
], Me);
var Mo = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, di = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Uo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Mo(t, r, i), i;
};
let Ze = class extends c {
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
Ze.styles = p`
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
di([
  s({ type: Boolean, reflect: !0 })
], Ze.prototype, "open", 2);
di([
  s({ type: String })
], Ze.prototype, "message", 2);
di([
  s({ type: Number })
], Ze.prototype, "autoHideDuration", 2);
di([
  s({ type: String, attribute: "anchor-origin" })
], Ze.prototype, "anchorOrigin", 2);
Ze = di([
  d("ui-snackbar")
], Ze);
var Ro = Object.defineProperty, No = Object.getOwnPropertyDescriptor, pi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? No(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ro(t, r, i), i;
};
let et = class extends c {
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
et.styles = p`
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
pi([
  s({ type: String, reflect: !0 })
], et.prototype, "orientation", 2);
pi([
  s({ type: String })
], et.prototype, "variant", 2);
pi([
  s({ type: String })
], et.prototype, "weight", 2);
pi([
  s({ type: String })
], et.prototype, "textAlign", 2);
et = pi([
  d("ui-divider")
], et);
var Vo = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, Oe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Fo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Vo(t, r, i), i;
};
let oe = class extends c {
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
            style=${pt(t)}
            aria-label=${this.label || "Slider"}
            aria-orientation=${this.vertical ? "vertical" : "horizontal"}
          >
        </div>
      </div>
    `;
  }
};
oe.styles = p`
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
Oe([
  s({ type: Number })
], oe.prototype, "value", 2);
Oe([
  s({ type: Number })
], oe.prototype, "min", 2);
Oe([
  s({ type: Number })
], oe.prototype, "max", 2);
Oe([
  s({ type: Number })
], oe.prototype, "step", 2);
Oe([
  s({ type: Boolean })
], oe.prototype, "disabled", 2);
Oe([
  s({ type: String })
], oe.prototype, "label", 2);
Oe([
  s({ type: Boolean })
], oe.prototype, "showValue", 2);
Oe([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "vertical", 2);
oe = Oe([
  d("ui-slider")
], oe);
var Yo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, ae = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? qo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Yo(t, r, i), i;
};
let W = class extends c {
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
W.styles = p`
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
ae([
  s({ type: String })
], W.prototype, "label", 2);
ae([
  s({ type: String })
], W.prototype, "value", 2);
ae([
  s({ type: String })
], W.prototype, "placeholder", 2);
ae([
  s({ type: String })
], W.prototype, "type", 2);
ae([
  s({ type: String })
], W.prototype, "variant", 2);
ae([
  s({ type: Boolean })
], W.prototype, "disabled", 2);
ae([
  s({ type: Boolean })
], W.prototype, "error", 2);
ae([
  s({ type: String })
], W.prototype, "helperText", 2);
ae([
  s({ type: String })
], W.prototype, "errorMessage", 2);
ae([
  m()
], W.prototype, "_focused", 2);
W = ae([
  d("ui-text-field")
], W);
var Ho = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, Ti = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ko(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ho(t, r, i), i;
};
let Ct = class extends c {
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
Ct.styles = p`
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
Ti([
  s({ type: Boolean, reflect: !0 })
], Ct.prototype, "selected", 2);
Ti([
  s({ type: Boolean, reflect: !0 })
], Ct.prototype, "disabled", 2);
Ti([
  s({ type: String })
], Ct.prototype, "value", 2);
Ct = Ti([
  d("ui-toggle-button")
], Ct);
var Wo = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, jr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Xo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Wo(t, r, i), i;
};
let Xt = class extends c {
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
Xt.styles = p`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }
  `;
jr([
  s({ type: String })
], Xt.prototype, "value", 2);
jr([
  s({ type: Boolean })
], Xt.prototype, "exclusive", 2);
Xt = jr([
  d("ui-toggle-button-group")
], Xt);
var Go = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, He = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Jo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Go(t, r, i), i;
};
let he = class extends c {
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
he.styles = p`
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
He([
  s({ type: String })
], he.prototype, "src", 2);
He([
  s({ type: String })
], he.prototype, "alt", 2);
He([
  s({ type: String })
], he.prototype, "initials", 2);
He([
  s({ type: String })
], he.prototype, "variant", 2);
He([
  s({ type: String, reflect: !0 })
], he.prototype, "size", 2);
He([
  m()
], he.prototype, "_hasError", 2);
He([
  m()
], he.prototype, "_isLoading", 2);
he = He([
  d("ui-avatar")
], he);
var Qo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, ut = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Zo(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Qo(t, r, i), i;
};
let ke = class extends c {
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
        role=${yi(this.clickable ? "button" : void 0)}
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
ke.styles = p`
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
ut([
  s({ type: String })
], ke.prototype, "label", 2);
ut([
  s({ type: String })
], ke.prototype, "variant", 2);
ut([
  s({ type: String })
], ke.prototype, "color", 2);
ut([
  s({ type: Boolean })
], ke.prototype, "clickable", 2);
ut([
  s({ type: Boolean })
], ke.prototype, "deletable", 2);
ut([
  s({ type: Boolean, reflect: !0 })
], ke.prototype, "disabled", 2);
ke = ut([
  d("ui-chip")
], ke);
var es = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, Ee = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ts(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && es(t, r, i), i;
};
let Ki = class extends c {
  render() {
    return l`<ul role="list" style="margin: 0; padding: 0; list-style: none;"><slot></slot></ul>`;
  }
};
Ki.styles = p`
    :host {
      display: block;
      padding: 8px 0;
      margin: 0;
      list-style: none;
      background-color: var(--ui-surface-background, white);
    }
  `;
Ki = Ee([
  d("ui-list")
], Ki);
let Wi = class extends c {
  render() {
    return l`<li role="listitem"><slot></slot></li>`;
  }
};
Wi.styles = p`
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
Wi = Ee([
  d("ui-list-item")
], Wi);
let Xi = class extends c {
  render() {
    return l`<li role="button" tabindex="0"><slot></slot></li>`;
  }
};
Xi.styles = p`
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
Xi = Ee([
  d("ui-list-item-button")
], Xi);
let Gi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Gi.styles = p`
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
Gi = Ee([
  d("ui-list-item-icon")
], Gi);
let Ji = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ji.styles = p`
    :host {
      display: inline-flex;
      min-width: 56px;
      flex-shrink: 0;
    }
  `;
Ji = Ee([
  d("ui-list-item-avatar")
], Ji);
let Gt = class extends c {
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
Gt.styles = p`
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
Ee([
  s({ type: String })
], Gt.prototype, "primary", 2);
Ee([
  s({ type: String })
], Gt.prototype, "secondary", 2);
Gt = Ee([
  d("ui-list-item-text")
], Gt);
let Qi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Qi.styles = p`
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
Qi = Ee([
  d("ui-list-subheader")
], Qi);
var is = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, ne = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? rs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && is(t, r, i), i;
};
let xi = class extends c {
  constructor() {
    super(...arguments), this.shadow = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
xi.styles = p`
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
ne([
  s({ type: Boolean, reflect: !0 })
], xi.prototype, "shadow", 2);
xi = ne([
  d("ui-table-container")
], xi);
let Zi = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Zi.styles = p`
    :host {
      display: table;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }
  `;
Zi = ne([
  d("ui-table")
], Zi);
let er = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
er.styles = p`
    :host {
      display: table-header-group;
    }
  `;
er = ne([
  d("ui-table-head")
], er);
let tr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
tr.styles = p`
    :host {
      display: table-row-group;
    }
  `;
tr = ne([
  d("ui-table-body")
], tr);
let _i = class extends c {
  constructor() {
    super(...arguments), this.selected = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
_i.styles = p`
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
ne([
  s({ type: Boolean, reflect: !0 })
], _i.prototype, "selected", 2);
_i = ne([
  d("ui-table-row")
], _i);
let Jt = class extends c {
  constructor() {
    super(...arguments), this.header = !1, this.align = "left";
  }
  render() {
    return l`<slot></slot>`;
  }
};
Jt.styles = p`
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
ne([
  s({ type: Boolean, reflect: !0 })
], Jt.prototype, "header", 2);
ne([
  s({ type: String, reflect: !0 })
], Jt.prototype, "align", 2);
Jt = ne([
  d("ui-table-cell")
], Jt);
let ir = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
ir.styles = p`
    :host {
      display: table-footer-group;
    }
  `;
ir = ne([
  d("ui-table-footer")
], ir);
var os = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, Lr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ss(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && os(t, r, i), i;
};
let Qt = class extends c {
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
Qt.styles = p`
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
Lr([
  s({ type: Boolean, reflect: !0 })
], Qt.prototype, "active", 2);
Lr([
  s({ type: String })
], Qt.prototype, "direction", 2);
Qt = Lr([
  d("ui-table-sort-label")
], Qt);
var as = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, hi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ns(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && as(t, r, i), i;
};
let tt = class extends c {
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
tt.styles = p`
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
hi([
  s({ type: Number })
], tt.prototype, "count", 2);
hi([
  s({ type: Number })
], tt.prototype, "page", 2);
hi([
  s({ type: Number })
], tt.prototype, "rowsPerPage", 2);
hi([
  s({ type: Array })
], tt.prototype, "rowsPerPageOptions", 2);
tt = hi([
  d("ui-table-pagination")
], tt);
var ls = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, Vt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? cs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ls(t, r, i), i;
};
let Ue = class extends c {
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
Ue.styles = p`
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
Vt([
  s({ type: String })
], Ue.prototype, "label", 2);
Vt([
  s({ type: String })
], Ue.prototype, "placement", 2);
Vt([
  s({ type: Boolean })
], Ue.prototype, "arrow", 2);
Vt([
  s({ type: Boolean, reflect: !0 })
], Ue.prototype, "disabled", 2);
Vt([
  m()
], Ue.prototype, "_visible", 2);
Ue = Vt([
  d("ui-tooltip")
], Ue);
var ds = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, ji = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ps(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ds(t, r, i), i;
};
let It = class extends c {
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
It.styles = p`
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
ji([
  s({ type: Boolean, reflect: !0 })
], It.prototype, "open", 2);
ji([
  s({ type: Boolean })
], It.prototype, "invisible", 2);
ji([
  s({ type: Boolean, reflect: !0 })
], It.prototype, "container", 2);
It = ji([
  d("ui-backdrop")
], It);
var hs = Object.defineProperty, us = Object.getOwnPropertyDescriptor, De = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? us(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && hs(t, r, i), i;
};
const Be = [];
let St = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.transition = "scale", this.disableBackdropClose = !1, this._handleKeyDown = (e) => {
      e.key === "Escape" && this.open && Be[Be.length - 1] === this && this.requestClose();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._handleKeyDown);
  }
  updated(e) {
    if (super.updated(e), e.has("open"))
      if (this.open)
        Be.includes(this) || Be.push(this);
      else {
        const t = Be.indexOf(this);
        t !== -1 && Be.splice(t, 1);
      }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._handleKeyDown);
    const e = Be.indexOf(this);
    e !== -1 && Be.splice(e, 1);
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
St.styles = p`
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
De([
  s({ type: Boolean, reflect: !0 })
], St.prototype, "open", 2);
De([
  s({ type: String })
], St.prototype, "transition", 2);
De([
  s({ type: Boolean, attribute: "disable-backdrop-close" })
], St.prototype, "disableBackdropClose", 2);
St = De([
  d("ui-dialog")
], St);
let rr = class extends c {
  render() {
    return l`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
  }
};
rr.styles = p`
    :host {
      display: block;
      padding: 20px 24px 12px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ui-text-color, #111827);
    }
  `;
rr = De([
  d("ui-dialog-title")
], rr);
let or = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
or.styles = p`
    :host {
      display: block;
      padding: 0 24px 20px 24px;
      flex: 1 1 auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;
or = De([
  d("ui-dialog-content")
], or);
let sr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
sr.styles = p`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 8px;
    }
  `;
sr = De([
  d("ui-dialog-content-text")
], sr);
let wi = class extends c {
  constructor() {
    super(...arguments), this.align = "end";
  }
  render() {
    return l`<slot></slot>`;
  }
};
wi.styles = p`
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
De([
  s({ type: String, reflect: !0 })
], wi.prototype, "align", 2);
wi = De([
  d("ui-dialog-actions")
], wi);
var fs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, ui = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? bs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && fs(t, r, i), i;
};
let it = class extends c {
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
it.styles = p`
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
ui([
  s({ type: String })
], it.prototype, "variant", 2);
ui([
  s({ type: Number })
], it.prototype, "value", 2);
ui([
  s({ type: Number })
], it.prototype, "size", 2);
ui([
  s({ type: Number })
], it.prototype, "thickness", 2);
it = ui([
  d("ui-circular-progress")
], it);
var vs = Object.defineProperty, ms = Object.getOwnPropertyDescriptor, Mr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ms(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && vs(t, r, i), i;
};
let Zt = class extends c {
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
Zt.styles = p`
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
Mr([
  s({ type: String })
], Zt.prototype, "variant", 2);
Mr([
  s({ type: Number })
], Zt.prototype, "value", 2);
Zt = Mr([
  d("ui-linear-progress")
], Zt);
var gs = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, Ft = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ys(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && gs(t, r, i), i;
};
let ei = class extends c {
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
ei.styles = p`
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
Ft([
  s({ type: Boolean, reflect: !0 })
], ei.prototype, "expanded", 2);
Ft([
  s({ type: Boolean, reflect: !0 })
], ei.prototype, "disabled", 2);
ei = Ft([
  d("ui-accordion")
], ei);
let ar = class extends c {
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
ar.styles = p`
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
ar = Ft([
  d("ui-accordion-summary")
], ar);
let nr = class extends c {
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
nr.styles = p`
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
nr = Ft([
  d("ui-accordion-details")
], nr);
let lr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
lr.styles = p`
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
lr = Ft([
  d("ui-accordion-actions")
], lr);
var xs = Object.defineProperty, _s = Object.getOwnPropertyDescriptor, Li = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? _s(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && xs(t, r, i), i;
};
let Pt = class extends c {
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
Pt.styles = p`
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
Li([
  s({ type: String })
], Pt.prototype, "title", 2);
Li([
  s({ type: String, reflect: !0 })
], Pt.prototype, "position", 2);
Li([
  s({ type: String, reflect: !0 })
], Pt.prototype, "variant", 2);
Pt = Li([
  d("ui-app-bar")
], Pt);
var ws = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, fi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ks(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ws(t, r, i), i;
};
let Re = class extends c {
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
Re.styles = p`
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
fi([
  s({ type: String })
], Re.prototype, "label", 2);
fi([
  s()
], Re.prototype, "value", 2);
fi([
  s({ type: Boolean, reflect: !0 })
], Re.prototype, "active", 2);
fi([
  s({ type: Boolean })
], Re.prototype, "showLabel", 2);
Re = fi([
  d("ui-bottom-navigation-action")
], Re);
var $s = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, Mi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Cs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && $s(t, r, i), i;
};
let Ot = class extends c {
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
      (r) => r instanceof Re
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
Ot.styles = p`
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
Mi([
  s()
], Ot.prototype, "value", 2);
Mi([
  s({ type: Boolean, attribute: "show-labels" })
], Ot.prototype, "showLabels", 2);
Mi([
  Kr({ selector: "ui-bottom-navigation-action" })
], Ot.prototype, "_actions", 2);
Ot = Mi([
  d("ui-bottom-navigation")
], Ot);
var Is = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, Ke = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ss(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Is(t, r, i), i;
};
let ue = class extends c {
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
ue.styles = p`
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
Ke([
  s({ type: Number, attribute: "max-items" })
], ue.prototype, "maxItems", 2);
Ke([
  s({ type: Number, attribute: "items-before" })
], ue.prototype, "itemsBefore", 2);
Ke([
  s({ type: Number, attribute: "items-after" })
], ue.prototype, "itemsAfter", 2);
Ke([
  s({ type: String })
], ue.prototype, "separator", 2);
Ke([
  m()
], ue.prototype, "_expanded", 2);
Ke([
  m()
], ue.prototype, "_itemsCount", 2);
Ke([
  m()
], ue.prototype, "_separatorNode", 2);
ue = Ke([
  d("ui-breadcrumbs")
], ue);
var Ps = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, ft = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Os(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ps(t, r, i), i;
};
let $e = class extends c {
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
$e.styles = p`
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
ft([
  s({ type: Boolean, reflect: !0 })
], $e.prototype, "open", 2);
ft([
  s({ type: String, reflect: !0 })
], $e.prototype, "anchor", 2);
ft([
  s({ type: String, reflect: !0 })
], $e.prototype, "variant", 2);
ft([
  s({ type: Boolean, reflect: !0 })
], $e.prototype, "edge", 2);
ft([
  s({ type: Boolean, reflect: !0 })
], $e.prototype, "container", 2);
ft([
  s({ type: String })
], $e.prototype, "label", 2);
$e = ft([
  d("ui-drawer")
], $e);
var Es = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, _e = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ds(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Es(t, r, i), i;
};
let ie = class extends c {
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
                aria-label=${yi(this.label)}
                download=${yi(this.download)}
                aria-disabled=${this.disabled}
            >
                <slot></slot>
            </a>
        `;
  }
};
ie.styles = p`
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
_e([
  s({ type: String })
], ie.prototype, "href", 2);
_e([
  s({ type: String })
], ie.prototype, "target", 2);
_e([
  s({ type: String })
], ie.prototype, "rel", 2);
_e([
  s({ type: String, reflect: !0 })
], ie.prototype, "color", 2);
_e([
  s({ type: String, reflect: !0 })
], ie.prototype, "underline", 2);
_e([
  s({ type: String, reflect: !0 })
], ie.prototype, "variant", 2);
_e([
  s({ type: Boolean, reflect: !0 })
], ie.prototype, "disabled", 2);
_e([
  s({ type: String })
], ie.prototype, "download", 2);
_e([
  s({ type: String })
], ie.prototype, "label", 2);
ie = _e([
  d("ui-link")
], ie);
var zs = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, We = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Bs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && zs(t, r, i), i;
};
let fe = class extends c {
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
    return Vr`<${e} class="${t}"><slot></slot></${e}>`;
  }
};
fe.styles = p`
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
We([
  s({ type: String, reflect: !0 })
], fe.prototype, "variant", 2);
We([
  s({ type: String, reflect: !0 })
], fe.prototype, "color", 2);
We([
  s({ type: String })
], fe.prototype, "component", 2);
We([
  s({ type: String, reflect: !0 })
], fe.prototype, "align", 2);
We([
  s({ type: Boolean, reflect: !0 })
], fe.prototype, "noWrap", 2);
We([
  s({ type: Boolean, reflect: !0 })
], fe.prototype, "gutterBottom", 2);
We([
  s({ type: Boolean, reflect: !0 })
], fe.prototype, "paragraph", 2);
fe = We([
  d("ui-typography")
], fe);
var As = Object.defineProperty, Ts = Object.getOwnPropertyDescriptor, F = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ts(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && As(t, r, i), i;
};
let be = class extends c {
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
be.styles = p`
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
], be.prototype, "selected", 2);
F([
  s({ type: Boolean, reflect: !0 })
], be.prototype, "disabled", 2);
F([
  s({ type: Boolean, reflect: !0 })
], be.prototype, "dense", 2);
F([
  s({ type: Boolean, reflect: !0 })
], be.prototype, "divider", 2);
F([
  s({ type: String, reflect: !0 })
], be.prototype, "value", 2);
F([
  m()
], be.prototype, "_hasIcon", 2);
F([
  m()
], be.prototype, "_hasEndIcon", 2);
be = F([
  d("ui-menu-item")
], be);
let cr = class extends c {
  render() {
    return l``;
  }
};
cr.styles = p`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
    `;
cr = F([
  d("ui-menu-divider")
], cr);
let rt = class extends c {
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
rt.styles = p`
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
], rt.prototype, "open", 2);
F([
  s({ type: String, reflect: !0 })
], rt.prototype, "placement", 2);
F([
  s({ type: Boolean, attribute: "close-on-select" })
], rt.prototype, "closeOnSelect", 2);
F([
  s({ type: Boolean })
], rt.prototype, "scrollable", 2);
rt = F([
  d("ui-menu")
], rt);
var js = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, A = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ls(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && js(t, r, i), i;
};
const Ms = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`, Us = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`, Rs = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`, Ns = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`, Vs = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
function Vi(e, t) {
  return Array.from({ length: t - e + 1 }, (r, o) => e + o);
}
function Fs(e, t, r, o) {
  const i = Vi(1, Math.min(o, e)), a = Vi(Math.max(e - o + 1, o + 1), e), n = Math.max(
    Math.min(t - r, e - o - r * 2 - 1),
    o + 2
  ), h = Math.min(
    Math.max(t + r, o + r * 2 + 2),
    a.length > 0 ? a[0] - 2 : e - 1
  ), v = [
    ...i,
    ...n > o + 2 ? ["start-ellipsis"] : o + 1 < e - o ? [o + 1] : [],
    ...Vi(n, h),
    ...h < e - o - 1 ? ["end-ellipsis"] : e - o > o ? [e - o] : [],
    ...a
  ], g = /* @__PURE__ */ new Set();
  return v.filter((b) => {
    const $ = String(b);
    return g.has($) ? !1 : (g.add($), !0);
  });
}
let E = class extends c {
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
    const e = Fs(this.count, this.page, this.siblingCount, this.boundaryCount), t = this.prevIcon ? l`<span .innerHTML=${this.prevIcon}></span>` : Rs, r = this.nextIcon ? l`<span .innerHTML=${this.nextIcon}></span>` : Ns, o = this.firstIcon ? l`<span .innerHTML=${this.firstIcon}></span>` : Ms, i = this.lastIcon ? l`<span .innerHTML=${this.lastIcon}></span>` : Us;
    return l`
            ${this._renderNavBtn("Go to first page", o, () => this._go(1), this.page === 1, !this.showFirstButton)}
            ${this._renderNavBtn("Go to previous page", t, () => this._go(this.page - 1), this.page === 1, this.hidePrevButton)}

            ${e.map((a) => {
      if (a === "start-ellipsis" || a === "end-ellipsis")
        return l`<button class="page-btn ellipsis" tabindex="-1" aria-hidden="true">${Vs}</button>`;
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
E.styles = p`
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
], E.prototype, "count", 2);
A([
  s({ type: Number })
], E.prototype, "page", 2);
A([
  s({ type: String, reflect: !0 })
], E.prototype, "variant", 2);
A([
  s({ type: String, reflect: !0 })
], E.prototype, "shape", 2);
A([
  s({ type: String, reflect: !0 })
], E.prototype, "size", 2);
A([
  s({ type: String, reflect: !0 })
], E.prototype, "color", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "show-first-button" })
], E.prototype, "showFirstButton", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "show-last-button" })
], E.prototype, "showLastButton", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "hide-prev-button" })
], E.prototype, "hidePrevButton", 2);
A([
  s({ type: Boolean, reflect: !0, attribute: "hide-next-button" })
], E.prototype, "hideNextButton", 2);
A([
  s({ type: Number, attribute: "sibling-count" })
], E.prototype, "siblingCount", 2);
A([
  s({ type: Number, attribute: "boundary-count" })
], E.prototype, "boundaryCount", 2);
A([
  s({ type: Boolean, reflect: !0 })
], E.prototype, "disabled", 2);
A([
  s({ type: String, attribute: "prev-icon" })
], E.prototype, "prevIcon", 2);
A([
  s({ type: String, attribute: "next-icon" })
], E.prototype, "nextIcon", 2);
A([
  s({ type: String, attribute: "first-icon" })
], E.prototype, "firstIcon", 2);
A([
  s({ type: String, attribute: "last-icon" })
], E.prototype, "lastIcon", 2);
E = A([
  d("ui-pagination")
], E);
var Ys = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, Y = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? qs(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ys(t, r, i), i;
};
let Ne = class extends c {
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
Ne.styles = p`
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
], Ne.prototype, "tooltipTitle", 2);
Y([
  s({ type: Boolean, attribute: "tooltip-open" })
], Ne.prototype, "tooltipOpen", 2);
Y([
  s({ type: String, reflect: !0, attribute: "tooltip-placement" })
], Ne.prototype, "tooltipPlacement", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], Ne.prototype, "disabled", 2);
Y([
  m()
], Ne.prototype, "_hovered", 2);
Ne = Y([
  d("ui-speed-dial-action")
], Ne);
let ve = class extends c {
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
ve.styles = p`
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
], ve.prototype, "open", 2);
Y([
  s({ type: String, reflect: !0 })
], ve.prototype, "direction", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], ve.prototype, "hidden", 2);
Y([
  s({ type: Boolean, attribute: "persistent-tooltips" })
], ve.prototype, "persistentTooltips", 2);
Y([
  s({ type: String, attribute: "close-icon" })
], ve.prototype, "closeIcon", 2);
Y([
  s({ type: String, attribute: "aria-label" })
], ve.prototype, "ariaLabel", 2);
Y([
  s({ type: Boolean, attribute: "is-touch" })
], ve.prototype, "isTouch", 2);
ve = Y([
  d("ui-speed-dial")
], ve);
var Hs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, w = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ks(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Hs(t, r, i), i;
};
const Ws = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`, Xs = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
let ti = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.completed = !1;
  }
  render() {
    return l`<div class="line ${u({ completed: this.completed })}"></div>`;
  }
};
ti.styles = p`
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
], ti.prototype, "orientation", 2);
w([
  s({ type: Boolean })
], ti.prototype, "completed", 2);
ti = w([
  d("ui-step-connector")
], ti);
let Et = class extends c {
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
Et.styles = p`
        :host { display: block; }
        .label { font-size: .875rem; font-weight: 500; color: var(--ui-text-color, #111827); font-family: var(--ui-font-family,'Inter',sans-serif); line-height: 1.4; }
        .optional { font-size: .75rem; color: #9ca3af; font-style: italic; }
        :host([active])   .label { color: var(--ui-primary-color, #3b82f6); font-weight: 600; }
        :host([disabled]) .label { color: #9ca3af; }
        :host([error])    .label { color: var(--ui-error-color, #ef4444); }
    `;
w([
  s({ type: Boolean, reflect: !0 })
], Et.prototype, "active", 2);
w([
  s({ type: Boolean, reflect: !0 })
], Et.prototype, "disabled", 2);
w([
  s({ type: Boolean, reflect: !0 })
], Et.prototype, "error", 2);
Et = w([
  d("ui-step-label")
], Et);
let dr = class extends c {
  render() {
    return l`<div class="content"><slot></slot></div>`;
  }
};
dr.styles = p`
        :host { display: block; overflow: hidden; }
        .content {
            padding: 8px 16px 16px;
            font-size: .875rem;
            color: var(--ui-text-color, #374151);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
    `;
dr = w([
  d("ui-step-content")
], dr);
let V = class extends c {
  constructor() {
    super(...arguments), this.active = !1, this.completed = !1, this.disabled = !1, this.optional = !1, this.error = !1, this.last = !1, this.clickable = !1, this.orientation = "horizontal", this.alternativeLabel = !1, this.stepIndex = 0, this.optionalLabel = "Optional";
  }
  _fire() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-step-click", { detail: { index: this.stepIndex }, bubbles: !0, composed: !0 }));
  }
  _icon() {
    const e = { "icon-circle": !0, active: this.active, completed: this.completed, error: this.error }, t = this.error ? Xs : this.completed ? Ws : l`<slot name="icon">${this.stepIndex + 1}</slot>`;
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
let ot = class extends c {
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
ot.styles = p`
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
], ot.prototype, "activeStep", 2);
w([
  s({ type: String, reflect: !0 })
], ot.prototype, "orientation", 2);
w([
  s({ type: Boolean, attribute: "alternative-label" })
], ot.prototype, "alternativeLabel", 2);
w([
  s({ type: Boolean, attribute: "non-linear" })
], ot.prototype, "nonLinear", 2);
ot = w([
  d("ui-stepper")
], ot);
let st = class extends c {
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
st.styles = p`
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
], st.prototype, "steps", 2);
w([
  s({ type: Number, attribute: "active-step" })
], st.prototype, "activeStep", 2);
w([
  s({ type: String })
], st.prototype, "variant", 2);
w([
  s({ type: String, reflect: !0 })
], st.prototype, "position", 2);
st = w([
  d("ui-mobile-stepper")
], st);
var Gs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, k = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Js(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Gs(t, r, i), i;
};
const Ui = (e) => l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${e}"/></svg>`, Qs = () => Ui("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"), Zs = () => Ui("M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"), ea = () => Ui("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"), ta = () => Ui("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
let Ce = class extends c {
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
Ce.styles = p`
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
], Ce.prototype, "value", 2);
k([
  s({ type: Boolean, reflect: !0 })
], Ce.prototype, "disabled", 2);
k([
  s({ type: Boolean, reflect: !0 })
], Ce.prototype, "selected", 2);
k([
  s({ attribute: "icon-position", reflect: !0 })
], Ce.prototype, "iconPosition", 2);
k([
  s()
], Ce.prototype, "href", 2);
k([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], Ce.prototype, "fullWidth", 2);
Ce = k([
  d("ui-tab")
], Ce);
let ki = class extends c {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return l`<div class="panel" role="tabpanel"><slot></slot></div>`;
  }
};
ki.styles = p`
        :host         { display: block; background: var(--ui-surface-background, #fff); }
        :host([hidden]){ display: none !important; }
        .panel        { padding: 24px; font-family: var(--ui-font-family,'Inter',sans-serif);
                        font-size: .875rem; color: #374151; line-height: 1.6; }
    `;
k([
  s({ reflect: !0 })
], ki.prototype, "value", 2);
ki = k([
  d("ui-tab-panel")
], ki);
let X = class extends c {
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
                ${t ? ea() : Qs()}
            </button>` : x, o = e ? l`
            <button class="scroll-btn" aria-label="Scroll forward"
                ?disabled=${!this._canFwd}
                @click=${() => this._scroll(200)}>
                ${t ? ta() : Zs()}
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
X.styles = p`
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
], X.prototype, "orientation", 2);
k([
  s({ reflect: !0 })
], X.prototype, "variant", 2);
k([
  s({ type: Boolean, reflect: !0 })
], X.prototype, "centered", 2);
k([
  s({ attribute: "scroll-buttons" })
], X.prototype, "scrollButtons", 2);
k([
  m()
], X.prototype, "_canBack", 2);
k([
  m()
], X.prototype, "_canFwd", 2);
k([
  Mt(".scroll-area")
], X.prototype, "_area", 2);
k([
  Mt(".tabs-row")
], X.prototype, "_row", 2);
k([
  Mt(".indicator")
], X.prototype, "_ind", 2);
k([
  Mt("slot")
], X.prototype, "_slot", 2);
X = k([
  d("ui-tab-list")
], X);
let me = class extends c {
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
me.styles = p`
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
], me.prototype, "value", 2);
k([
  s({ reflect: !0 })
], me.prototype, "orientation", 2);
k([
  s()
], me.prototype, "variant", 2);
k([
  s({ type: Boolean })
], me.prototype, "centered", 2);
k([
  s({ attribute: "scroll-buttons" })
], me.prototype, "scrollButtons", 2);
k([
  s({ attribute: "text-color" })
], me.prototype, "textColor", 2);
k([
  s({ attribute: "indicator-color" })
], me.prototype, "indicatorColor", 2);
me = k([
  d("ui-tabs")
], me);
var ia = Object.defineProperty, ra = Object.getOwnPropertyDescriptor, _ = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ra(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ia(t, r, i), i;
};
const oa = /* @__PURE__ */ new Set([
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
    return oa.has(this.component) ? this.component : (console.warn(`[ui-box] Unknown component tag "${this.component}", falling back to "div".`), "div");
  }
  _getStyles() {
    const e = {};
    return this.m && (e.margin = this.m), this.mx && (e.marginLeft = this.mx, e.marginRight = this.mx), this.my && (e.marginTop = this.my, e.marginBottom = this.my), this.mt && (e.marginTop = this.mt), this.mr && (e.marginRight = this.mr), this.mb && (e.marginBottom = this.mb), this.ml && (e.marginLeft = this.ml), this.p && (e.padding = this.p), this.px && (e.paddingLeft = this.px, e.paddingRight = this.px), this.py && (e.paddingTop = this.py, e.paddingBottom = this.py), this.pt && (e.paddingTop = this.pt), this.pr && (e.paddingRight = this.pr), this.pb && (e.paddingBottom = this.pb), this.pl && (e.paddingLeft = this.pl), this.display && (e.display = this.display), this.flexDirection && (e.flexDirection = this.flexDirection), this.alignItems && (e.alignItems = this.alignItems), this.justifyContent && (e.justifyContent = this.justifyContent), this.flexWrap && (e.flexWrap = this.flexWrap), this.flexBasis && (e.flexBasis = this.flexBasis), this.flexGrow && (e.flexGrow = this.flexGrow), this.flexShrink && (e.flexShrink = this.flexShrink), this.gap && (e.gap = this.gap), this.bgcolor && (e.backgroundColor = this.bgcolor === "primary" ? "var(--ui-primary-color)" : this.bgcolor === "secondary" ? "var(--ui-secondary-color)" : this.bgcolor), this.color && (e.color = this.color === "primary" ? "var(--ui-primary-color)" : this.color === "secondary" ? "var(--ui-secondary-color)" : this.color), this.border && (e.border = this.border), this.borderRadius && (e.borderRadius = this.borderRadius), this.boxShadow && (e.boxShadow = this.boxShadow), this.width && (e.width = this.width), this.height && (e.height = this.height), e;
  }
  render() {
    const e = Wr(this._safeComponent);
    return Vr`
      <${e} style=${pt(this._getStyles())}>
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
var sa = Object.defineProperty, aa = Object.getOwnPropertyDescriptor, Ri = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? aa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && sa(t, r, i), i;
};
let Dt = class extends c {
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
Dt.styles = p`
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
Ri([
  s({
    attribute: "max-width",
    reflect: !0,
    converter: {
      fromAttribute: (e) => e === null || e === "false" ? !1 : e,
      toAttribute: (e) => e === !1 ? null : e
    }
  })
], Dt.prototype, "maxWidth", 2);
Ri([
  s({ type: Boolean, attribute: "disable-gutters", reflect: !0 })
], Dt.prototype, "disableGutters", 2);
Ri([
  s({ type: Boolean, reflect: !0 })
], Dt.prototype, "fixed", 2);
Dt = Ri([
  d("ui-container")
], Dt);
var na = Object.defineProperty, la = Object.getOwnPropertyDescriptor, T = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? la(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && na(t, r, i), i;
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
    })} style=${pt(r)}>
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
  m()
], D.prototype, "_currentWidth", 2);
D = T([
  d("ui-grid")
], D);
var ca = Object.defineProperty, da = Object.getOwnPropertyDescriptor, bt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? da(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ca(t, r, i), i;
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
        style=${pt(n)}
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
bt([
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
bt([
  s({ type: Object })
], N.prototype, "spacing", 2);
bt([
  s({ type: String })
], N.prototype, "alignItems", 2);
bt([
  s({ type: String })
], N.prototype, "justifyContent", 2);
bt([
  s({ type: Boolean })
], N.prototype, "useFlexGap", 2);
bt([
  m()
], N.prototype, "_currentWidth", 2);
N = bt([
  d("ui-stack")
], N);
var pa = Object.defineProperty, ha = Object.getOwnPropertyDescriptor, Yt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ha(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && pa(t, r, i), i;
};
let Ve = class extends c {
  constructor() {
    super(...arguments), this.variant = "standard", this.cols = 3, this.gap = 4, this.rowHeight = 164, this.autoRows = !1;
  }
  render() {
    const e = this.variant === "masonry", t = {};
    return e ? (t["--ui-image-list-cols"] = String(this.cols), t["column-count"] = String(this.cols), t["column-gap"] = `${this.gap}px`) : (t["grid-template-columns"] = `repeat(${this.cols}, 1fr)`, t.gap = `${this.gap}px`, t["--ui-image-list-row-height"] = `${this.rowHeight}px`, t["grid-auto-rows"] = this.autoRows ? "auto" : `${this.rowHeight}px`), t["--ui-image-list-variant"] = this.variant, t["--ui-image-list-gap"] = `${this.gap}px`, l`
      <ul class="image-list variant-${this.variant}" style="${pt(t)}" role="list">
        <slot></slot>
      </ul>
    `;
  }
};
Ve.styles = p`
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
Yt([
  s({ type: String })
], Ve.prototype, "variant", 2);
Yt([
  s({ type: Number })
], Ve.prototype, "cols", 2);
Yt([
  s({ type: Number })
], Ve.prototype, "gap", 2);
Yt([
  s({ type: Number })
], Ve.prototype, "rowHeight", 2);
Yt([
  s({ type: Boolean })
], Ve.prototype, "autoRows", 2);
Ve = Yt([
  d("ui-image-list")
], Ve);
var ua = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, bi = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? fa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ua(t, r, i), i;
};
let at = class extends c {
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
      <li class="item-wrapper" style="${pt(e)}">
        <slot name="img"><slot></slot></slot>
        <slot name="bar"></slot>
      </li>
    `;
  }
};
at.styles = p`
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
bi([
  s({ type: Number })
], at.prototype, "rows", 2);
bi([
  s({ type: Number })
], at.prototype, "cols", 2);
bi([
  s({ type: String, attribute: "bar-position", reflect: !0 })
], at.prototype, "barPosition", 2);
bi([
  s({ type: String })
], at.prototype, "weave", 2);
at = bi([
  d("ui-image-list-item")
], at);
var ba = Object.defineProperty, va = Object.getOwnPropertyDescriptor, Fr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? va(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ba(t, r, i), i;
};
let $i = class extends c {
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
$i.styles = p`
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
Fr([
  s({ type: String, reflect: !0 })
], $i.prototype, "position", 2);
$i = Fr([
  d("ui-image-list-item-bar")
], $i);
var ma = Object.defineProperty, ga = Object.getOwnPropertyDescriptor, S = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ga(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ma(t, r, i), i;
};
const ya = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Rr = [
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
function Ge(e) {
  if (!e) return null;
  const [t, r, o] = e.split("-").map(Number);
  return !t || !r || !o ? null : new Date(t, r - 1, o);
}
function gi(e) {
  const t = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${t}-${r}-${o}`;
}
function xa(e) {
  const t = Ge(e);
  return t ? `${String(t.getMonth() + 1).padStart(2, "0")}/${String(t.getDate()).padStart(2, "0")}/${t.getFullYear()}` : "";
}
function _a() {
  return gi(/* @__PURE__ */ new Date());
}
function gt(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function wa(e, t, r, o, i) {
  const a = [], n = new Date(e, t, 1), h = _a(), v = Ge(h), g = r ? Ge(r) : null, b = o ? Ge(o) : null, $ = i ? Ge(i) : null, Z = n.getDay();
  for (let K = Z - 1; K >= 0; K--) {
    const O = new Date(e, t, -K), qt = gi(O);
    a.push({
      date: O,
      iso: qt,
      day: O.getDate(),
      isCurrentMonth: !1,
      isToday: gt(O, v),
      isSelected: g ? gt(O, g) : !1,
      isDisabled: (b ? O < b : !1) || ($ ? O > $ : !1)
    });
  }
  const H = new Date(e, t + 1, 0).getDate();
  for (let K = 1; K <= H; K++) {
    const O = new Date(e, t, K), qt = gi(O);
    a.push({
      date: O,
      iso: qt,
      day: K,
      isCurrentMonth: !0,
      isToday: gt(O, v),
      isSelected: g ? gt(O, g) : !1,
      isDisabled: (b ? O < b : !1) || ($ ? O > $ : !1)
    });
  }
  const Hr = 42 - a.length;
  for (let K = 1; K <= Hr; K++) {
    const O = new Date(e, t + 1, K), qt = gi(O);
    a.push({
      date: O,
      iso: qt,
      day: K,
      isCurrentMonth: !1,
      isToday: gt(O, v),
      isSelected: g ? gt(O, g) : !1,
      isDisabled: (b ? O < b : !1) || ($ ? O > $ : !1)
    });
  }
  return a;
}
let ge = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this._viewYear = (/* @__PURE__ */ new Date()).getFullYear(), this._viewMonth = (/* @__PURE__ */ new Date()).getMonth(), this._mode = "day";
  }
  connectedCallback() {
    if (super.connectedCallback(), this.value) {
      const e = Ge(this.value);
      e && (this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth());
    }
  }
  /** Navigate to the month/year of a given ISO date programmatically. */
  navigateTo(e) {
    const t = Ge(e);
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
    const e = wa(this._viewYear, this._viewMonth, this.value ?? null, this.min ?? null, this.max ?? null);
    return l`
      <div class="header">
        <button class="nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="header-label" @click=${() => this._mode = "month"} role="button" tabindex="0"
          @keydown=${(t) => t.key === "Enter" && (this._mode = "month")}
        >
          ${Rr[this._viewMonth]} ${this._viewYear}
        </span>
        <button class="nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>
      <div class="dow-row">${ya.map((t) => l`<span class="dow-cell">${t}</span>`)}</div>
      <div class="day-grid" role="grid" aria-label="Calendar">
        ${xt(e, (t) => t.iso, (t) => l`
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
        ${Rr.map((e, t) => l`
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
ge.styles = p`
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
], ge.prototype, "value", 2);
S([
  s({ type: String })
], ge.prototype, "min", 2);
S([
  s({ type: String })
], ge.prototype, "max", 2);
S([
  s({ type: Boolean })
], ge.prototype, "disabled", 2);
S([
  m()
], ge.prototype, "_viewYear", 2);
S([
  m()
], ge.prototype, "_viewMonth", 2);
S([
  m()
], ge.prototype, "_mode", 2);
ge = S([
  d("ui-date-picker-calendar")
], ge);
let M = class extends c {
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
          .value=${xa(this.value)}
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
M.styles = p`
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
], M.prototype, "value", 2);
S([
  s({ type: String })
], M.prototype, "label", 2);
S([
  s({ type: String })
], M.prototype, "placeholder", 2);
S([
  s({ type: String })
], M.prototype, "name", 2);
S([
  s({ type: String })
], M.prototype, "variant", 2);
S([
  s({ type: String })
], M.prototype, "min", 2);
S([
  s({ type: String })
], M.prototype, "max", 2);
S([
  s({ type: Boolean, reflect: !0 })
], M.prototype, "disabled", 2);
S([
  s({ type: Boolean, reflect: !0 })
], M.prototype, "readonly", 2);
S([
  s({ type: Boolean, reflect: !0 })
], M.prototype, "error", 2);
S([
  s({ type: String, attribute: "helper-text" })
], M.prototype, "helperText", 2);
S([
  m()
], M.prototype, "_open", 2);
S([
  m()
], M.prototype, "_pendingValue", 2);
M = S([
  d("ui-date-picker")
], M);
var ka = Object.defineProperty, $a = Object.getOwnPropertyDescriptor, U = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? $a(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && ka(t, r, i), i;
};
function vi(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
function mi(e, t) {
  return e < 1 || e > 12 ? 31 : new Date(t || 2e3, e, 0).getDate();
}
function Ca(e) {
  if (!e) return { m: null, d: null, y: null };
  const t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return t ? { y: parseInt(t[1]), m: parseInt(t[2]), d: parseInt(t[3]) } : { m: null, d: null, y: null };
}
function Nr(e, t, r) {
  return e === null || t === null || r === null ? "" : `${String(r).padStart(4, "0")}-${String(e).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
const Ae = ["month", "day", "year"];
let z = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "", this.name = "", this.min = "", this.max = "", this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._internals = this.attachInternals(), this._month = null, this._day = null, this._year = null, this._active = null, this._focused = !1, this._buf = "";
  }
  // digit accumulation buffer for the active segment
  // Sync controlled value → segments before each render (willUpdate avoids a double-render cycle)
  willUpdate(e) {
    if (e.has("value")) {
      const { m: t, d: r, y: o } = Ca(this.value);
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
    const e = Nr(this._month, this._day, this._year);
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
        const t = mi(this._month ?? 1, this._year ?? 2e3);
        e >= 1 && e <= t && (this._day = e);
      }
    }
  }
  _nextSegment() {
    if (!this._active) {
      this._setActive("month");
      return;
    }
    const e = Ae.indexOf(this._active);
    e < Ae.length - 1 && this._setActive(Ae[e + 1]);
  }
  _prevSegment() {
    if (!this._active) return;
    const e = Ae.indexOf(this._active);
    e > 0 && this._setActive(Ae[e - 1]);
  }
  _canGoNext() {
    return this._active ? Ae.indexOf(this._active) < Ae.length - 1 : !0;
  }
  _canGoPrev() {
    return this._active ? Ae.indexOf(this._active) > 0 : !1;
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
      const o = mi(this._month ?? 1, this._year ?? 2e3);
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
        this._month = vi(r + e, 1, 12), this._day !== null && (this._day = vi(this._day, 1, mi(this._month, this._year ?? 2e3)));
      } else if (t === "day") {
        const r = mi(this._month ?? 1, this._year ?? 2e3), o = this._day ?? (e > 0 ? 0 : r + 1);
        this._day = vi(o + e, 1, r);
      } else if (t === "year") {
        const r = this._year ?? (/* @__PURE__ */ new Date()).getFullYear();
        this._year = vi(r + e, 1, 9999);
      }
      this._checkAndEmit();
    }
  }
  // ── Internal: emit when a full date is ready ──────────────────────────────
  _checkAndEmit() {
    const e = Nr(this._month, this._day, this._year);
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
  m()
], z.prototype, "_month", 2);
U([
  m()
], z.prototype, "_day", 2);
U([
  m()
], z.prototype, "_year", 2);
U([
  m()
], z.prototype, "_active", 2);
U([
  m()
], z.prototype, "_focused", 2);
U([
  m()
], z.prototype, "_buf", 2);
z = U([
  d("ui-date-field")
], z);
var Ia = Object.defineProperty, Sa = Object.getOwnPropertyDescriptor, f = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Sa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ia(t, r, i), i;
};
function j(e) {
  return String(e).padStart(2, "0");
}
function Ni(e) {
  if (!e) return null;
  const t = e.split(":").map(Number);
  return t.length < 2 || t.some(isNaN) ? null : { h: t[0], m: t[1], s: t[2] ?? 0 };
}
function Fe(e, t, r = 0) {
  return `${j(e)}:${j(t)}:${j(r)}`;
}
function ce(e) {
  return { hour: e % 12 || 12, ampm: e < 12 ? "AM" : "PM" };
}
function yt(e, t) {
  return t === "AM" ? e === 12 ? 0 : e : e === 12 ? 12 : e + 12;
}
function Pa(e, t, r = !1) {
  const o = Ni(e);
  if (!o) return "";
  const i = t ? ce(o.h).hour : o.h, a = t ? ` ${ce(o.h).ampm}` : "";
  return `${j(i)}:${j(o.m)}${r ? ":" + j(o.s) : ""}${a}`;
}
function Oa(e, t, r, o = 140, i = 140) {
  const a = (e / t - 0.25) * Math.PI * 2;
  return { x: o + r * Math.cos(a), y: i + r * Math.sin(a) };
}
function Ea(e, t, r = 140, o = 140) {
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
      const t = Ni(this.value);
      if (t) {
        const { hour: r, ampm: o } = ce(t.h);
        this._h = this.ampm ? r : t.h, this._m = t.m, this._s = t.s, this._mer = o;
      }
    }
  }
  clear() {
    this._h = null, this._m = null, this._s = null, this._buf = "", this.dispatchEvent(new CustomEvent("clear", { bubbles: !0, composed: !0 }));
  }
  _emit() {
    if (this._h === null || this._m === null) return;
    const e = this.ampm ? yt(this._h, this._mer) : this._h, t = Fe(e, this._m, this._s ?? 0);
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
  m()
], B.prototype, "_h", 2);
f([
  m()
], B.prototype, "_m", 2);
f([
  m()
], B.prototype, "_s", 2);
f([
  m()
], B.prototype, "_mer", 2);
f([
  m()
], B.prototype, "_active", 2);
f([
  m()
], B.prototype, "_focused", 2);
f([
  m()
], B.prototype, "_buf", 2);
B = f([
  d("ui-time-field")
], B);
let zt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.step = 30, this.ampm = !0;
  }
  _items() {
    const e = [];
    for (let t = 0; t < 1440; t += this.step) {
      const r = Math.floor(t / 60), o = t % 60;
      e.push(Fe(r, o));
    }
    return e;
  }
  _label(e) {
    return Pa(e, this.ampm);
  }
  updated() {
    const e = this.shadowRoot?.querySelector(".selected");
    e && typeof e.scrollIntoView == "function" && e.scrollIntoView({ block: "center" });
  }
  render() {
    const e = this._items();
    return l`
      <div class="clock" role="listbox" aria-label="Select time">
        ${xt(e, (t) => t, (t) => l`
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
zt.styles = p`
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
], zt.prototype, "value", 2);
f([
  s({ type: Number })
], zt.prototype, "step", 2);
f([
  s({ type: Boolean })
], zt.prototype, "ampm", 2);
zt = f([
  d("ui-digital-clock")
], zt);
let Bt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  _t() {
    return Ni(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  _set(e, t, r) {
    const o = Fe(e, t, r);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _col(e) {
    const t = this._t(), r = ce(t.h);
    if (e === "mer")
      return l`
        <div class="col">
          <div class="col-header">AM/PM</div>
          ${["AM", "PM"].map((n) => l`
            <button class=${u({ item: !0, sel: r.ampm === n })}
              @click=${() => this._set(yt(r.hour, n), t.m, t.s)}>${n}</button>
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
        const g = this.ampm ? yt(v, r.ampm) : v;
        this._set(g, t.m, t.s);
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
Bt.styles = p`
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
], Bt.prototype, "value", 2);
f([
  s({ type: Boolean })
], Bt.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], Bt.prototype, "seconds", 2);
Bt = f([
  d("ui-multi-section-digital-clock")
], Bt);
let nt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1, this.view = "hours";
  }
  get _t() {
    return Ni(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  _emit(e, t, r) {
    const o = Fe(e, t, r);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _switchView(e) {
    this.view = e, this.dispatchEvent(new CustomEvent("view-change", { detail: { view: e }, bubbles: !0, composed: !0 }));
  }
  _handleClick(e) {
    const r = this.shadowRoot.querySelector("svg").getBoundingClientRect(), o = 280 / r.width, i = 280 / r.height, a = (e.clientX - r.left) * o, n = (e.clientY - r.top) * i, h = 140, v = 140, g = Ea(a, n, h, v), b = this._t;
    if (this.view === "hours") {
      const $ = Math.sqrt((a - h) ** 2 + (n - v) ** 2), Z = !this.ampm && $ < 82;
      let H = Math.round(g / 30) % 12;
      Z ? H = H === 0 ? 0 : H + 12 : (H = H || 12, this.ampm && (H = yt(H, ce(b.h).ampm))), this._emit(H, b.m, b.s), this._switchView("minutes");
    } else if (this.view === "minutes") {
      const $ = Math.round(g / 6) % 60;
      this._emit(b.h, $, b.s), this.seconds && this._switchView("seconds");
    } else {
      const $ = Math.round(g / 6) % 60;
      this._emit(b.h, b.m, $);
    }
  }
  _renderFace() {
    const r = this._t;
    let o = 0, i = 100;
    if (this.view === "hours") {
      let b;
      this.ampm ? b = ce(r.h).hour : b = r.h === 0 || r.h > 12 ? r.h % 12 : r.h, o = b / 12 * 360, i = this.ampm ? 100 : r.h === 0 || r.h > 12 ? 64 : 100;
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
    const g = 12;
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
      const $ = b.inner ? b.val % 12 : b.val, Z = Oa($, g, b.r, 140, 140), H = this.view === "hours" ? this.ampm ? ce(r.h).hour === b.val : r.h === b.val : this.view === "minutes" ? r.m === b.val : r.s === b.val;
      return l`
          <circle cx=${Z.x} cy=${Z.y} r="17" class=${u({ "num-bg": !0, selected: H })}></circle>
          <text x=${Z.x} y=${Z.y} class=${u({ num: !0, selected: H, "inner-label": !!b.inner })}>${b.label}</text>
        `;
    })}
      </svg>
    `;
  }
  render() {
    const e = this._t, { hour: t, ampm: r } = ce(e.h), o = this.ampm ? j(t) : j(e.h);
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
      this._emit(yt(ce(i.h).hour, "AM"), i.m, i.s);
    }}>AM</button>
            <button class=${u({ "am-pm-btn": !0, sel: r === "PM" })} @click=${() => {
      const i = this._t;
      this._emit(yt(ce(i.h).hour, "PM"), i.m, i.s);
    }}>PM</button>
          </div>
        ` : x}
        ${this._renderFace()}
      </div>
    `;
  }
};
nt.styles = p`
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
], nt.prototype, "value", 2);
f([
  s({ type: Boolean })
], nt.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], nt.prototype, "seconds", 2);
f([
  s({ type: String })
], nt.prototype, "view", 2);
nt = f([
  d("ui-time-clock")
], nt);
const Yr = p`
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
let re = class extends c {
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
          <ui-multi-section-digital-clock .value=${this.value || Fe(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
            @change=${(e) => {
      this.value = e.detail.value;
    }}
          ></ui-multi-section-digital-clock>
          <div class="actions">
            <button class="btn btn-cancel" @click=${() => this._open = !1}>Cancel</button>
            <button class="btn btn-ok" @click=${() => this._commit(this.value || Fe(12, 0))}>OK</button>
          </div>
        </div>
      </div>
    `;
  }
};
re.styles = [Yr];
f([
  s({ type: String })
], re.prototype, "value", 2);
f([
  s({ type: String })
], re.prototype, "label", 2);
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
], re.prototype, "readonly", 2);
f([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "error", 2);
f([
  s({ type: String, attribute: "helper-text" })
], re.prototype, "helperText", 2);
f([
  m()
], re.prototype, "_open", 2);
re = f([
  d("ui-desktop-time-picker")
], re);
let G = class extends c {
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
          <ui-time-clock .value=${this._pending || this.value || Fe(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds} .view=${this._view}
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
G.styles = [Yr];
f([
  s({ type: String })
], G.prototype, "value", 2);
f([
  s({ type: String })
], G.prototype, "label", 2);
f([
  s({ type: Boolean })
], G.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], G.prototype, "seconds", 2);
f([
  s({ type: Boolean, reflect: !0 })
], G.prototype, "disabled", 2);
f([
  s({ type: Boolean, reflect: !0 })
], G.prototype, "error", 2);
f([
  s({ type: String, attribute: "helper-text" })
], G.prototype, "helperText", 2);
f([
  m()
], G.prototype, "_open", 2);
f([
  m()
], G.prototype, "_pending", 2);
f([
  m()
], G.prototype, "_view", 2);
G = f([
  d("ui-mobile-time-picker")
], G);
let At = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  render() {
    return l`
      <div class="surface">
        <ui-multi-section-digital-clock .value=${this.value || Fe(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
          @change=${(e) => {
      this.value = e.detail.value, this.dispatchEvent(new CustomEvent("change", { detail: e.detail, bubbles: !0, composed: !0 }));
    }}
        ></ui-multi-section-digital-clock>
      </div>
    `;
  }
};
At.styles = p`
    :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .surface {
      border-radius:var(--ui-border-radius-xl,12px);
      box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px var(--ui-border-color,#e5e7eb);
      overflow:hidden; display:inline-block;
    }
  `;
f([
  s({ type: String })
], At.prototype, "value", 2);
f([
  s({ type: Boolean })
], At.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], At.prototype, "seconds", 2);
At = f([
  d("ui-static-time-picker")
], At);
let se = class extends c {
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
se.styles = p`:host { display:inline-block; }`;
f([
  s({ type: String })
], se.prototype, "value", 2);
f([
  s({ type: String })
], se.prototype, "label", 2);
f([
  s({ type: String })
], se.prototype, "variant", 2);
f([
  s({ type: Boolean })
], se.prototype, "ampm", 2);
f([
  s({ type: Boolean })
], se.prototype, "seconds", 2);
f([
  s({ type: Boolean, reflect: !0 })
], se.prototype, "disabled", 2);
f([
  s({ type: Boolean, reflect: !0 })
], se.prototype, "error", 2);
f([
  s({ type: String, attribute: "helper-text" })
], se.prototype, "helperText", 2);
se = f([
  d("ui-time-picker")
], se);
var Da = Object.defineProperty, za = Object.getOwnPropertyDescriptor, le = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? za(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Da(t, r, i), i;
};
let J = class extends c {
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
J.styles = p`
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
le([
  s({ type: String, attribute: "item-id", reflect: !0 })
], J.prototype, "itemId", 2);
le([
  s({ type: String })
], J.prototype, "label", 2);
le([
  s({ type: Boolean, reflect: !0 })
], J.prototype, "disabled", 2);
le([
  s({ type: Boolean, reflect: !0 })
], J.prototype, "expanded", 2);
le([
  s({ type: Boolean, attribute: "has-children", reflect: !0 })
], J.prototype, "hasChildren", 2);
le([
  m()
], J.prototype, "_isDraggable", 2);
le([
  m()
], J.prototype, "_handleOnly", 2);
le([
  s({ type: String, attribute: "drop-position", reflect: !0 })
], J.prototype, "dropPosition", 2);
le([
  s({ type: Boolean, attribute: "show-drag-handle" })
], J.prototype, "showDragHandle", 2);
le([
  m()
], J.prototype, "_hasSlottedChildren", 2);
J = le([
  d("ui-tree-item")
], J);
var Ba = Object.defineProperty, Aa = Object.getOwnPropertyDescriptor, vt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Aa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ba(t, r, i), i;
};
let Ie = class extends c {
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
              (g) => g.label.toLowerCase().startsWith(a)
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
Ie.styles = p`
    :host {
      display: block;
      font-family: var(--ui-font-family, system-ui, sans-serif);
    }

    .tree-root {
      padding: 4px 0;
    }
  `;
vt([
  s({ type: Boolean, attribute: "disabled-items-focusable" })
], Ie.prototype, "disabledItemsFocusable", 2);
vt([
  s({ attribute: !1 })
], Ie.prototype, "onItemClick", 2);
vt([
  s({ attribute: !1 })
], Ie.prototype, "expandedItems", 2);
vt([
  s({ attribute: !1 })
], Ie.prototype, "defaultExpandedItems", 2);
vt([
  s({ attribute: !1 })
], Ie.prototype, "onExpandedItemsChange", 2);
vt([
  s({ type: String, attribute: "expansion-trigger" })
], Ie.prototype, "expansionTrigger", 2);
Ie = vt([
  d("ui-simple-tree-view")
], Ie);
var Ta = Object.defineProperty, ja = Object.getOwnPropertyDescriptor, P = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ja(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ta(t, r, i), i;
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
              (g) => g.label.toLowerCase().startsWith(a)
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
        ${a.map((g) => this._renderItem(g, t + 1))}
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
      const v = i.item, g = this.getItemChildren(v), b = Object.keys(v).find((Z) => v[Z] === g) || "children";
      v[b] || (v[b] = []);
      const $ = v[b];
      $.push(o.item), n = t, h = $.length - 1;
    } else {
      const v = this._findItemAndParentInTree(t, this._orderedItems);
      if (!v) return;
      const g = r === "before" ? v.index : v.index + 1;
      v.parentList.splice(g, 0, o.item), n = v.parentId, h = g;
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
  m()
], I.prototype, "_orderedItems", 2);
P([
  m()
], I.prototype, "_draggedItemId", 2);
P([
  m()
], I.prototype, "_dropTargetId", 2);
P([
  m()
], I.prototype, "_dropPosition", 2);
I = P([
  d("ui-rich-tree-view")
], I);
var La = Object.defineProperty, Ma = Object.getOwnPropertyDescriptor, L = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ma(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && La(t, r, i), i;
};
let pr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
pr.styles = p`
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
pr = L([
  d("ui-command-shortcut")
], pr);
let hr = class extends c {
  render() {
    return l``;
  }
};
hr.styles = p`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
        :host([hidden]) { display: none !important; }
    `;
hr = L([
  d("ui-command-separator")
], hr);
let lt = class extends c {
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
lt.styles = p`
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
L([
  s({ type: String, reflect: !0 })
], lt.prototype, "value", 2);
L([
  s({ type: Boolean, reflect: !0 })
], lt.prototype, "disabled", 2);
L([
  s({ type: Boolean, reflect: !0 })
], lt.prototype, "highlighted", 2);
L([
  m()
], lt.prototype, "_hasIcon", 2);
lt = L([
  d("ui-command-item")
], lt);
let ur = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
ur.styles = p`
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
ur = L([
  d("ui-command-empty")
], ur);
let Ci = class extends c {
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
Ci.styles = p`
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
L([
  s({ type: String, reflect: !0 })
], Ci.prototype, "heading", 2);
Ci = L([
  d("ui-command-group")
], Ci);
let fr = class extends c {
  render() {
    return l`
            <div class="list" role="listbox" tabindex="0" aria-label="Command results">
                <slot></slot>
            </div>
        `;
  }
};
fr.styles = p`
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
fr = L([
  d("ui-command-list")
], fr);
let ii = class extends c {
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
ii.styles = p`
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
L([
  s({ type: String })
], ii.prototype, "placeholder", 2);
L([
  s({ type: String, reflect: !0 })
], ii.prototype, "value", 2);
ii = L([
  d("ui-command-input")
], ii);
let br = class extends c {
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
      const v = (h.value || h.textContent || "").toLowerCase().trim(), g = t === "" || v.includes(t);
      h.hidden = !g, g && o++;
    }
    const i = [...this.querySelectorAll("ui-command-group")];
    for (const h of i) {
      const v = [...h.querySelectorAll("ui-command-item")];
      h.hidden = v.length === 0 || v.every((g) => g.hidden);
    }
    const a = this.querySelector("ui-command-empty");
    a && (a.hidden = o > 0);
    const n = this.querySelector("ui-command-list");
    if (n) {
      const h = [...n.children], v = (g) => g.tagName.toLowerCase() !== "ui-command-separator" && g.tagName.toLowerCase() !== "ui-command-empty" && !g.hidden;
      for (const g of h) {
        if (g.tagName.toLowerCase() !== "ui-command-separator") continue;
        const b = h.indexOf(g), $ = h.slice(0, b).some(v), Z = h.slice(b + 1).some(v);
        g.hidden = !$ || !Z;
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
br.styles = p`
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
br = L([
  d("ui-command")
], br);
let Ii = class extends c {
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
Ii.styles = p`
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
L([
  s({ type: Boolean, reflect: !0 })
], Ii.prototype, "open", 2);
Ii = L([
  d("ui-command-dialog")
], Ii);
var Ua = Object.defineProperty, Ra = Object.getOwnPropertyDescriptor, R = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ra(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ua(t, r, i), i;
};
const qr = p`
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
let Tt = class extends c {
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
Tt.styles = p`
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
], Tt.prototype, "index", 2);
R([
  s({ type: Number, attribute: "items-per-view" })
], Tt.prototype, "itemsPerView", 2);
R([
  s({ reflect: !0 })
], Tt.prototype, "orientation", 2);
Tt = R([
  d("ui-carousel-content")
], Tt);
let vr = class extends c {
  render() {
    return l`
      <div class="item" role="group" aria-roledescription="slide">
        <slot></slot>
      </div>
    `;
  }
};
vr.styles = p`
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
vr = R([
  d("ui-carousel-item")
], vr);
let ri = class extends c {
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
ri.styles = qr;
R([
  s({ type: Boolean, reflect: !0 })
], ri.prototype, "disabled", 2);
R([
  s({ reflect: !0 })
], ri.prototype, "orientation", 2);
ri = R([
  d("ui-carousel-previous")
], ri);
let oi = class extends c {
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
oi.styles = qr;
R([
  s({ type: Boolean, reflect: !0 })
], oi.prototype, "disabled", 2);
R([
  s({ reflect: !0 })
], oi.prototype, "orientation", 2);
oi = R([
  d("ui-carousel-next")
], oi);
let ct = class extends c {
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
ct.styles = p`
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
], ct.prototype, "loop", 2);
R([
  s({ reflect: !0 })
], ct.prototype, "orientation", 2);
R([
  s({ type: Number })
], ct.prototype, "autoplay", 2);
R([
  s({ type: Number, attribute: "items-per-view" })
], ct.prototype, "itemsPerView", 2);
ct = R([
  d("ui-carousel")
], ct);
var Na = Object.defineProperty, Va = Object.getOwnPropertyDescriptor, mt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Va(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Na(t, r, i), i;
};
let mr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
mr.styles = p`
        :host {
            display: block;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.4;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            margin: 0;
        }
    `;
mr = mt([
  d("ui-empty-title")
], mr);
let gr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
gr.styles = p`
        :host {
            display: block;
            font-size: 0.875rem;
            line-height: 1.5;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            margin: 0;
        }
    `;
gr = mt([
  d("ui-empty-description")
], gr);
let Si = class extends c {
  constructor() {
    super(...arguments), this.variant = "default";
  }
  render() {
    return l`
            <div class=${u({ media: !0, "media--icon": this.variant === "icon" })}>
                <slot></slot>
            </div>
        `;
  }
};
Si.styles = p`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media--icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: var(--ui-empty-media-bg, #f3f4f6);
            color: var(--ui-empty-media-color, #6b7280);
        }

        ::slotted(svg),
        ::slotted([data-icon]) {
            width: 24px;
            height: 24px;
        }
    `;
mt([
  s({ reflect: !0 })
], Si.prototype, "variant", 2);
Si = mt([
  d("ui-empty-media")
], Si);
let yr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
yr.styles = p`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-align: center;
        }
    `;
yr = mt([
  d("ui-empty-header")
], yr);
let xr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
xr.styles = p`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
    `;
xr = mt([
  d("ui-empty-content")
], xr);
let _r = class extends c {
  render() {
    return l`
            <div class="container" part="container">
                <slot></slot>
            </div>
        `;
  }
};
_r.styles = p`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--ui-empty-gap, 16px);
            padding: var(--ui-empty-padding, 32px);
            max-width: var(--ui-empty-max-width, 480px);
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
_r = mt([
  d("ui-empty")
], _r);
var Fa = Object.defineProperty, Ya = Object.getOwnPropertyDescriptor, ze = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ya(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Fa(t, r, i), i;
};
let si = class extends c {
  constructor() {
    super(...arguments), this.expanded = !1, this.disabled = !1;
  }
  _handleClick() {
    if (this.disabled) return;
    this.closest("ui-collapsible")?.toggle();
  }
  render() {
    return l`
            <button
                class="trigger"
                aria-expanded=${this.expanded}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
            >
                <slot></slot>
            </button>
        `;
  }
};
si.styles = p`
        :host { display: block; }

        .trigger {
            display: flex;
            align-items: center;
            width: 100%;
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            font: inherit;
            color: inherit;
            text-align: left;
        }

        :host([disabled]) .trigger {
            cursor: not-allowed;
            opacity: 0.5;
        }
    `;
ze([
  s({ type: Boolean, reflect: !0 })
], si.prototype, "expanded", 2);
ze([
  s({ type: Boolean, reflect: !0 })
], si.prototype, "disabled", 2);
si = ze([
  d("ui-collapsible-trigger")
], si);
let Pi = class extends c {
  constructor() {
    super(...arguments), this.open = !1;
  }
  render() {
    return l`
            <div class="panel" aria-hidden=${!this.open}>
                <div class="panel-inner">
                    <slot></slot>
                </div>
            </div>
        `;
  }
};
Pi.styles = p`
        :host { display: block; }

        .panel {
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            transition:
                grid-template-rows var(--ui-collapsible-duration, 200ms) var(--ui-collapsible-easing, ease);
        }

        :host([open]) .panel {
            grid-template-rows: 1fr;
        }

        .panel-inner {
            overflow: hidden;
        }
    `;
ze([
  s({ type: Boolean, reflect: !0 })
], Pi.prototype, "open", 2);
Pi = ze([
  d("ui-collapsible-content")
], Pi);
let jt = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.defaultOpen = !1, this.disabled = !1, this._firstUpdate = !0;
  }
  willUpdate(e) {
    this._firstUpdate && (this._firstUpdate = !1, this.defaultOpen && !this.open && (this.open = !0));
  }
  updated(e) {
    (e.has("open") || e.has("disabled")) && this._syncChildren();
  }
  /** Toggle the open state and fire `ui-collapsible-change`. */
  toggle() {
    this.disabled || (this.open = !this.open, this.dispatchEvent(new CustomEvent("ui-collapsible-change", {
      detail: { open: this.open },
      bubbles: !0,
      composed: !0
    })));
  }
  _syncChildren() {
    this.querySelectorAll("ui-collapsible-content").forEach((e) => {
      e.closest("ui-collapsible") === this && (e.open = this.open);
    }), this.querySelectorAll("ui-collapsible-trigger").forEach((e) => {
      e.closest("ui-collapsible") === this && (e.expanded = this.open, e.disabled = this.disabled);
    });
  }
  render() {
    return l`<slot @slotchange=${() => this._syncChildren()}></slot>`;
  }
};
jt.styles = p`
        :host { display: block; }
    `;
ze([
  s({ type: Boolean, reflect: !0 })
], jt.prototype, "open", 2);
ze([
  s({ type: Boolean, attribute: "default-open" })
], jt.prototype, "defaultOpen", 2);
ze([
  s({ type: Boolean, reflect: !0 })
], jt.prototype, "disabled", 2);
jt = ze([
  d("ui-collapsible")
], jt);
var qa = Object.defineProperty, Ha = Object.getOwnPropertyDescriptor, Xe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ha(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && qa(t, r, i), i;
};
let wr = class extends c {
  constructor() {
    super(...arguments), this._handleMouseEnter = () => this._getRoot()?.handleTriggerEnter(), this._handleMouseLeave = () => this._getRoot()?.handleTriggerLeave(), this._handleFocusIn = () => this._getRoot()?.handleTriggerEnter(), this._handleFocusOut = () => this._getRoot()?.handleTriggerLeave();
  }
  _getRoot() {
    return this.closest("ui-hover-card");
  }
  render() {
    return l`
            <div
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
                @focusin=${this._handleFocusIn}
                @focusout=${this._handleFocusOut}
            >
                <slot></slot>
            </div>
        `;
  }
};
wr.styles = p`
        :host { display: inline-block; }
    `;
wr = Xe([
  d("ui-hover-card-trigger")
], wr);
let Lt = class extends c {
  constructor() {
    super(...arguments), this.side = "bottom", this.align = "center", this.open = !1, this._handleMouseEnter = () => this._getRoot()?.handleContentEnter(), this._handleMouseLeave = () => this._getRoot()?.handleContentLeave();
  }
  _getRoot() {
    return this.closest("ui-hover-card");
  }
  firstUpdated() {
    this._applyPosition();
  }
  updated(e) {
    (e.has("side") || e.has("align")) && this._applyPosition();
  }
  /** Applies absolute positioning inline styles based on `side` and `align`. */
  _applyPosition() {
    const { side: e, align: t } = this, r = "var(--ui-hovercard-offset, 8px)";
    this.style.removeProperty("top"), this.style.removeProperty("bottom"), this.style.removeProperty("left"), this.style.removeProperty("right"), this.style.removeProperty("transform"), e === "bottom" || e === "top" ? (this.style.setProperty(
      e === "bottom" ? "top" : "bottom",
      `calc(100% + ${r})`
    ), t === "start" ? this.style.setProperty("left", "0") : t === "end" ? this.style.setProperty("right", "0") : (this.style.setProperty("left", "50%"), this.style.setProperty("transform", "translateX(-50%)"))) : (this.style.setProperty(
      e === "right" ? "left" : "right",
      `calc(100% + ${r})`
    ), t === "start" ? this.style.setProperty("top", "0") : t === "end" ? this.style.setProperty("bottom", "0") : (this.style.setProperty("top", "50%"), this.style.setProperty("transform", "translateY(-50%)")));
  }
  render() {
    return l`
            <div
                class="card"
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
            >
                <slot></slot>
            </div>
        `;
  }
};
Lt.styles = p`
        :host {
            display: block;
            position: absolute;
            z-index: var(--ui-hovercard-z-index, 1000);
            opacity: 0;
            visibility: hidden;
            transition:
                opacity var(--ui-hovercard-duration, 150ms) ease,
                visibility var(--ui-hovercard-duration, 150ms) ease;
            pointer-events: none;
        }

        :host([open]) {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        .card {
            background: var(--ui-hovercard-bg, #fff);
            border: 1px solid var(--ui-hovercard-border-color, #e5e7eb);
            border-radius: var(--ui-hovercard-radius, 8px);
            box-shadow: var(--ui-hovercard-shadow, 0 4px 16px rgba(0, 0, 0, 0.12));
            padding: var(--ui-hovercard-padding, 16px);
            min-width: var(--ui-hovercard-min-width, 200px);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            font-size: var(--ui-hovercard-font-size, 0.875rem);
            color: var(--ui-hovercard-color, #111827);
            line-height: 1.5;
        }
    `;
Xe([
  s({ type: String, reflect: !0 })
], Lt.prototype, "side", 2);
Xe([
  s({ type: String, reflect: !0 })
], Lt.prototype, "align", 2);
Xe([
  s({ type: Boolean, reflect: !0 })
], Lt.prototype, "open", 2);
Lt = Xe([
  d("ui-hover-card-content")
], Lt);
let ai = class extends c {
  constructor() {
    super(...arguments), this.openDelay = 700, this.closeDelay = 300, this._isOpen = !1, this._openTimer = null, this._closeTimer = null;
  }
  /** Whether the card is currently open. */
  get isOpen() {
    return this._isOpen;
  }
  /** Called by `ui-hover-card-trigger` when the pointer/focus enters. */
  handleTriggerEnter() {
    this._cancelClose(), this._isOpen || (this._openTimer = setTimeout(() => this._setOpen(!0), this.openDelay));
  }
  /** Called by `ui-hover-card-trigger` when the pointer/focus leaves. */
  handleTriggerLeave() {
    this._cancelOpen(), this._closeTimer = setTimeout(() => this._setOpen(!1), this.closeDelay);
  }
  /** Called by `ui-hover-card-content` when the pointer enters the card. */
  handleContentEnter() {
    this._cancelClose();
  }
  /** Called by `ui-hover-card-content` when the pointer leaves the card. */
  handleContentLeave() {
    this._closeTimer = setTimeout(() => this._setOpen(!1), this.closeDelay);
  }
  _cancelOpen() {
    this._openTimer !== null && (clearTimeout(this._openTimer), this._openTimer = null);
  }
  _cancelClose() {
    this._closeTimer !== null && (clearTimeout(this._closeTimer), this._closeTimer = null);
  }
  _setOpen(e) {
    this._isOpen !== e && (this._isOpen = e, this._syncChildren(), this.dispatchEvent(new CustomEvent(
      e ? "ui-hover-card-open" : "ui-hover-card-close",
      { bubbles: !0, composed: !0 }
    )));
  }
  _syncChildren() {
    this.querySelectorAll("ui-hover-card-content").forEach((e) => {
      e.closest("ui-hover-card") === this && (e.open = this._isOpen);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cancelOpen(), this._cancelClose();
  }
  render() {
    return l`<slot @slotchange=${() => this._syncChildren()}></slot>`;
  }
};
ai.styles = p`
        :host {
            display: inline-block;
            position: relative;
        }
    `;
Xe([
  s({ type: Number, attribute: "open-delay" })
], ai.prototype, "openDelay", 2);
Xe([
  s({ type: Number, attribute: "close-delay" })
], ai.prototype, "closeDelay", 2);
ai = Xe([
  d("ui-hover-card")
], ai);
var Ka = Object.defineProperty, Wa = Object.getOwnPropertyDescriptor, q = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Wa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ka(t, r, i), i;
};
let kr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
kr.styles = p`
        :host {
            display: inline-flex;
            align-items: center;
        }
    `;
kr = q([
  d("ui-input-otp-group")
], kr);
let $r = class extends c {
  render() {
    return l`<div class="bar"></div>`;
  }
};
$r.styles = p`
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
$r = q([
  d("ui-input-otp-separator")
], $r);
let dt = class extends c {
  constructor() {
    super(...arguments), this.index = 0, this.char = "", this.active = !1, this.invalid = !1;
  }
  render() {
    return this.char ? l`${this.char}` : this.active ? l`<div class="cursor"></div>` : l``;
  }
};
dt.styles = p`
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
q([
  s({ type: Number })
], dt.prototype, "index", 2);
q([
  s()
], dt.prototype, "char", 2);
q([
  s({ type: Boolean, reflect: !0 })
], dt.prototype, "active", 2);
q([
  s({ type: Boolean, reflect: !0 })
], dt.prototype, "invalid", 2);
dt = q([
  d("ui-input-otp-slot")
], dt);
let Se = class extends c {
  constructor() {
    super(), this.value = "", this.defaultValue = "", this.maxLength = 6, this.pattern = "", this.disabled = !1, this._internalValue = "", this._focused = !1, this._cursorIndex = 0, this._firstUpdate = !0, this.addEventListener("click", (e) => {
      if (this.disabled) return;
      const r = e.target.closest("ui-input-otp-slot");
      this._hiddenInput?.focus(), r && (this._cursorIndex = Math.min(r.index, this._internalValue.length), this._syncSlots());
    });
  }
  willUpdate(e) {
    if (this._firstUpdate) {
      this._firstUpdate = !1, this.defaultValue && !this.value ? (this._internalValue = this.defaultValue.slice(0, this.maxLength), this.value = this._internalValue) : this._internalValue = this.value.slice(0, this.maxLength), this._cursorIndex = Math.min(this._internalValue.length, this.maxLength - 1);
      return;
    }
    e.has("value") && this.value !== this._internalValue && (this._internalValue = this.value.slice(0, this.maxLength), this._cursorIndex = Math.min(this._cursorIndex, Math.max(0, this._internalValue.length)));
  }
  updated(e) {
    (e.has("value") || e.has("maxLength")) && (this._syncSlots(), this._hiddenInput && this._hiddenInput.value !== this._internalValue && (this._hiddenInput.value = this._internalValue));
  }
  _getAllSlots() {
    return Array.from(this.querySelectorAll("ui-input-otp-slot"));
  }
  _syncSlots() {
    const e = this._getAllSlots(), t = this._internalValue.length, r = this._focused ? this._cursorIndex : -1;
    for (const o of e) {
      const i = o.index;
      o.char = i < t ? this._internalValue[i] : "", o.active = i === r;
    }
  }
  _filterByPattern(e) {
    if (!this.pattern) return e;
    const t = new RegExp(this.pattern);
    return e.split("").filter((r) => t.test(r)).join("");
  }
  /** Store a new value and fire change/complete events. Does NOT call _syncSlots. */
  _commit(e) {
    this._internalValue = e, this.value = e, this._hiddenInput && (this._hiddenInput.value = e), this.dispatchEvent(new CustomEvent("ui-otp-change", {
      detail: { value: e },
      bubbles: !0,
      composed: !0
    })), e.length === this.maxLength && this.dispatchEvent(new CustomEvent("ui-otp-complete", {
      detail: { value: e },
      bubbles: !0,
      composed: !0
    }));
  }
  // ── keyboard operations ──────────────────────────────────────────
  /**
   * Insert (or replace) a character at the current cursor position, then
   * advance the cursor by one slot.
   */
  _insertChar(e) {
    if (this.pattern && !new RegExp(this.pattern).test(e)) return;
    const t = this._cursorIndex, r = this._internalValue;
    let o;
    if (t < r.length)
      o = r.slice(0, t) + e + r.slice(t + 1);
    else if (r.length < this.maxLength)
      o = r + e;
    else
      return;
    this._commit(o), this._cursorIndex = Math.min(t + 1, this.maxLength - 1), this._syncSlots();
  }
  /** Delete the character at the cursor (standard Backspace). */
  _deleteBackward() {
    if (this._internalValue.length === 0) return;
    const e = this._cursorIndex, t = this._internalValue;
    if (e !== 0) {
      if (e < t.length) {
        const r = t.slice(0, e);
        this._commit(r);
      } else {
        const r = t.slice(0, -1);
        this._commit(r), this._cursorIndex = Math.max(0, r.length);
      }
      this._syncSlots();
    }
  }
  /** Delete the character at the cursor (Delete key). */
  _deleteForward() {
    const e = this._cursorIndex, t = this._internalValue;
    if (e >= t.length) return;
    const r = t.slice(0, e) + t.slice(e + 1);
    this._commit(r), this._syncSlots();
  }
  /** Move cursor left or right, clamped to the filled region. */
  _moveCursor(e) {
    const t = Math.min(this._internalValue.length, this.maxLength - 1);
    this._cursorIndex = Math.max(0, Math.min(this._cursorIndex + e, t)), this._syncSlots();
  }
  // ── event handlers ───────────────────────────────────────────────
  _handleKeydown(e) {
    if (!(e.key === "Tab" || e.metaKey || e.ctrlKey)) {
      if (e.key === "ArrowLeft") {
        e.preventDefault(), this._moveCursor(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault(), this._moveCursor(1);
        return;
      }
      if (e.key === "Home") {
        e.preventDefault(), this._cursorIndex = 0, this._syncSlots();
        return;
      }
      if (e.key === "End") {
        e.preventDefault(), this._cursorIndex = Math.min(this._internalValue.length, this.maxLength - 1), this._syncSlots();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault(), this._deleteBackward();
        return;
      }
      if (e.key === "Delete") {
        e.preventDefault(), this._deleteForward();
        return;
      }
      e.key.length === 1 && (e.preventDefault(), this._insertChar(e.key));
    }
  }
  _handlePaste(e) {
    e.preventDefault();
    const t = e.clipboardData?.getData("text") ?? "", r = this._filterByPattern(t).slice(0, this.maxLength);
    this._commit(r), this._cursorIndex = Math.min(r.length, this.maxLength - 1), this._syncSlots();
  }
  _handleFocus() {
    this._focused = !0, this._cursorIndex = Math.min(this._internalValue.length, this.maxLength - 1), this._syncSlots();
  }
  _handleBlur() {
    this._focused = !1, this._syncSlots();
  }
  _handleSlotChange() {
    this._syncSlots();
  }
  render() {
    return l`
            <input
                class="hidden-input"
                type="text"
                autocomplete="one-time-code"
                inputmode="numeric"
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
};
Se.styles = p`
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
q([
  s({ reflect: !0 })
], Se.prototype, "value", 2);
q([
  s({ attribute: "default-value" })
], Se.prototype, "defaultValue", 2);
q([
  s({ type: Number, attribute: "max-length" })
], Se.prototype, "maxLength", 2);
q([
  s()
], Se.prototype, "pattern", 2);
q([
  s({ type: Boolean, reflect: !0 })
], Se.prototype, "disabled", 2);
q([
  Mt(".hidden-input")
], Se.prototype, "_hiddenInput", 2);
Se = q([
  d("ui-input-otp")
], Se);
var Xa = Object.defineProperty, Ga = Object.getOwnPropertyDescriptor, Q = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ga(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Xa(t, r, i), i;
};
let Cr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Cr.styles = p`
        :host {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1.4;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
Cr = Q([
  d("ui-item-title")
], Cr);
let Ir = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ir.styles = p`
        :host {
            display: block;
            font-size: 0.8125rem;
            line-height: 1.5;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
Ir = Q([
  d("ui-item-description")
], Ir);
let Oi = class extends c {
  constructor() {
    super(...arguments), this.variant = "default";
  }
  render() {
    return l`
            <div class=${u({
      media: !0,
      "media--icon": this.variant === "icon",
      "media--image": this.variant === "image"
    })}>
                <slot></slot>
            </div>
        `;
  }
};
Oi.styles = p`
        :host {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
        }

        .media {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media--icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: var(--ui-item-media-icon-bg, #f3f4f6);
            color: var(--ui-item-media-icon-color, #6b7280);
        }

        .media--image {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
        }

        ::slotted(svg),
        ::slotted([data-icon]) {
            width: 20px;
            height: 20px;
        }

        ::slotted(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    `;
Q([
  s({ reflect: !0 })
], Oi.prototype, "variant", 2);
Oi = Q([
  d("ui-item-media")
], Oi);
let Sr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Sr.styles = p`
        :host {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-width: 0;
            gap: 2px;
        }
    `;
Sr = Q([
  d("ui-item-content")
], Sr);
let Pr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Pr.styles = p`
        :host {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            gap: 8px;
            margin-left: auto;
        }
    `;
Pr = Q([
  d("ui-item-actions")
], Pr);
let Or = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Or.styles = p`
        :host {
            display: block;
            /* Stretch to fill item width including its padding */
            flex: 0 0 calc(100% + 2 * var(--ui-item-padding, 16px));
            margin-left: calc(-1 * var(--ui-item-padding, 16px));
            margin-right: calc(-1 * var(--ui-item-padding, 16px));
            margin-top: calc(-1 * var(--ui-item-padding, 16px));
            margin-bottom: 0;
            overflow: hidden;
            line-height: 0;
        }

        ::slotted(img) {
            width: 100%;
            display: block;
            object-fit: cover;
        }
    `;
Or = Q([
  d("ui-item-header")
], Or);
let Er = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Er.styles = p`
        :host {
            display: block;
            flex: 0 0 calc(100% + 2 * var(--ui-item-padding, 16px));
            margin-left: calc(-1 * var(--ui-item-padding, 16px));
            margin-right: calc(-1 * var(--ui-item-padding, 16px));
            margin-bottom: calc(-1 * var(--ui-item-padding, 16px));
            margin-top: 0;
            padding: 10px var(--ui-item-padding, 16px);
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
            background: var(--ui-item-footer-bg, transparent);
            box-sizing: border-box;
            font-size: 0.8125rem;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
Er = Q([
  d("ui-item-footer")
], Er);
let Dr = class extends c {
  render() {
    return l``;
  }
};
Dr.styles = p`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
        }
    `;
Dr = Q([
  d("ui-item-separator")
], Dr);
let zr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
zr.styles = p`
        :host {
            display: flex;
            flex-direction: column;
            gap: var(--ui-item-group-gap, 4px);
        }
    `;
zr = Q([
  d("ui-item-group")
], zr);
let ni = class extends c {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "default";
  }
  render() {
    return l`<slot></slot>`;
  }
};
ni.styles = p`
        :host {
            /* Sizing custom properties — read by sub-components too */
            --ui-item-padding: 16px;
            --ui-item-gap: 12px;

            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: var(--ui-item-gap);
            padding: var(--ui-item-padding);
            border-radius: 8px;
            box-sizing: border-box;
            overflow: hidden;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }

        /* Size variants — override sizing custom properties */
        :host([size='sm']) {
            --ui-item-padding: 12px;
            --ui-item-gap: 8px;
        }

        :host([size='xs']) {
            --ui-item-padding: 8px;
            --ui-item-gap: 6px;
        }

        /* Visual variants */
        :host([variant='outline']) {
            border: 1px solid var(--ui-border-color, #e5e7eb);
        }

        :host([variant='muted']) {
            background: var(--ui-muted-bg, #f9fafb);
        }
    `;
Q([
  s({ reflect: !0 })
], ni.prototype, "variant", 2);
Q([
  s({ reflect: !0 })
], ni.prototype, "size", 2);
ni = Q([
  d("ui-item")
], ni);
var Ja = Object.defineProperty, Qa = Object.getOwnPropertyDescriptor, Ur = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Qa(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (i = (o ? n(t, r, i) : n(i)) || i);
  return o && i && Ja(t, r, i), i;
};
let Ei = class extends c {
  constructor() {
    super(...arguments), this.size = "default";
  }
  render() {
    return l`
            <kbd class=${u({ [`size-${this.size}`]: !0 })}>
                <slot></slot>
            </kbd>
        `;
  }
};
Ei.styles = p`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        kbd {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-family: var(--ui-kbd-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: 0.8125rem;
            font-weight: 500;
            line-height: 1;
            color: var(--ui-kbd-color, #374151);
            background: var(--ui-kbd-bg, #f9fafb);
            border: 1px solid var(--ui-kbd-border-color, #e5e7eb);
            border-bottom-width: 2px;
            border-radius: var(--ui-kbd-radius, 4px);
            box-shadow: 0 1px 0 0 var(--ui-kbd-shadow-color, #d1d5db);
            padding: 2px 6px;
            white-space: nowrap;
            user-select: none;
        }

        /* size variants */
        :host([size="sm"]) kbd {
            font-size: 0.6875rem;
            padding: 1px 4px;
        }

        :host([size="lg"]) kbd {
            font-size: 0.9375rem;
            padding: 4px 10px;
        }
    `;
Ur([
  s({ reflect: !0 })
], Ei.prototype, "size", 2);
Ei = Ur([
  d("ui-kbd")
], Ei);
let Br = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Br.styles = p`
        :host {
            display: inline-flex;
            align-items: center;
            gap: var(--ui-kbd-group-gap, 4px);
        }
    `;
Br = Ur([
  d("ui-kbd-group")
], Br);
export {
  ei as UiAccordion,
  lr as UiAccordionActions,
  nr as UiAccordionDetails,
  ar as UiAccordionSummary,
  $t as UiAlert,
  Pt as UiAppBar,
  te as UiAutocomplete,
  he as UiAvatar,
  It as UiBackdrop,
  Le as UiBadge,
  Ot as UiBottomNavigation,
  Re as UiBottomNavigationAction,
  y as UiBox,
  ue as UiBreadcrumbs,
  Je as UiButton,
  Fi as UiButtonGroup,
  Ht as UiCard,
  Hi as UiCardActionArea,
  qi as UiCardActions,
  Yi as UiCardContent,
  Kt as UiCardHeader,
  _t as UiCardMedia,
  ct as UiCarousel,
  Tt as UiCarouselContent,
  vr as UiCarouselItem,
  oi as UiCarouselNext,
  ri as UiCarouselPrevious,
  pe as UiCheckbox,
  ke as UiChip,
  it as UiCircularProgress,
  jt as UiCollapsible,
  Pi as UiCollapsibleContent,
  si as UiCollapsibleTrigger,
  br as UiCommand,
  Ii as UiCommandDialog,
  ur as UiCommandEmpty,
  Ci as UiCommandGroup,
  ii as UiCommandInput,
  lt as UiCommandItem,
  fr as UiCommandList,
  hr as UiCommandSeparator,
  pr as UiCommandShortcut,
  Dt as UiContainer,
  z as UiDateField,
  M as UiDatePicker,
  ge as UiDatePickerCalendar,
  re as UiDesktopTimePicker,
  St as UiDialog,
  wi as UiDialogActions,
  or as UiDialogContent,
  sr as UiDialogContentText,
  rr as UiDialogTitle,
  zt as UiDigitalClock,
  et as UiDivider,
  $e as UiDrawer,
  _r as UiEmpty,
  xr as UiEmptyContent,
  gr as UiEmptyDescription,
  yr as UiEmptyHeader,
  Si as UiEmptyMedia,
  mr as UiEmptyTitle,
  Qe as UiFab,
  D as UiGrid,
  ai as UiHoverCard,
  Lt as UiHoverCardContent,
  wr as UiHoverCardTrigger,
  Ve as UiImageList,
  at as UiImageListItem,
  $i as UiImageListItemBar,
  ee as UiInput,
  Se as UiInputOtp,
  kr as UiInputOtpGroup,
  $r as UiInputOtpSeparator,
  dt as UiInputOtpSlot,
  ni as UiItem,
  Pr as UiItemActions,
  Sr as UiItemContent,
  Ir as UiItemDescription,
  Er as UiItemFooter,
  zr as UiItemGroup,
  Or as UiItemHeader,
  Oi as UiItemMedia,
  Dr as UiItemSeparator,
  Cr as UiItemTitle,
  Ei as UiKbd,
  Br as UiKbdGroup,
  Zt as UiLinearProgress,
  ie as UiLink,
  Ki as UiList,
  Wi as UiListItem,
  Ji as UiListItemAvatar,
  Xi as UiListItemButton,
  Gi as UiListItemIcon,
  Gt as UiListItemText,
  Qi as UiListSubheader,
  rt as UiMenu,
  cr as UiMenuDivider,
  be as UiMenuItem,
  st as UiMobileStepper,
  G as UiMobileTimePicker,
  Bt as UiMultiSectionDigitalClock,
  E as UiPagination,
  wt as UiPaper,
  Te as UiRadio,
  Wt as UiRadioGroup,
  je as UiRating,
  I as UiRichTreeView,
  de as UiSelect,
  Ie as UiSimpleTreeView,
  Me as UiSkeleton,
  oe as UiSlider,
  Ze as UiSnackbar,
  ve as UiSpeedDial,
  Ne as UiSpeedDialAction,
  N as UiStack,
  At as UiStaticTimePicker,
  V as UiStep,
  ti as UiStepConnector,
  dr as UiStepContent,
  Et as UiStepLabel,
  ot as UiStepper,
  kt as UiSwitch,
  Ce as UiTab,
  X as UiTabList,
  ki as UiTabPanel,
  Zi as UiTable,
  tr as UiTableBody,
  Jt as UiTableCell,
  xi as UiTableContainer,
  ir as UiTableFooter,
  er as UiTableHead,
  tt as UiTablePagination,
  _i as UiTableRow,
  Qt as UiTableSortLabel,
  me as UiTabs,
  W as UiTextField,
  nt as UiTimeClock,
  B as UiTimeField,
  se as UiTimePicker,
  Ct as UiToggleButton,
  Xt as UiToggleButtonGroup,
  Ue as UiTooltip,
  we as UiTransferList,
  J as UiTreeItem,
  fe as UiTypography
};
