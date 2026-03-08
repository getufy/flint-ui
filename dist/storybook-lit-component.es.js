import { unsafeCSS as h, LitElement as c, html as l, nothing as v, svg as _t, css as Ie } from "lit";
import { property as s, customElement as d, state as b, queryAssignedElements as rs, query as zt } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { repeat as Lt } from "lit/directives/repeat.js";
import { ifDefined as re } from "lit/directives/if-defined.js";
import { styleMap as Ti } from "lit/directives/style-map.js";
import { literal as S, html as Xo, unsafeStatic as os } from "lit/static-html.js";
const ss = ":host{display:inline-block}:host([full-width]){display:block}button{font-family:var(--ui-font-family);font-weight:600;border:none;border-radius:var(--ui-button-border-radius, var(--ui-border-radius-md));cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;transition:all .2s ease;box-shadow:var(--ui-shadow-sm)}.primary{background-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.primary:hover{background-color:var(--ui-primary-color-hover)}.primary:active{background-color:var(--ui-primary-color-active)}.secondary{background-color:var(--ui-surface-1);color:var(--ui-text-color);border:1px solid var(--ui-input-border-color)}.secondary:hover{background-color:var(--ui-hover-color)}.secondary:active{background-color:var(--ui-active-color)}.destructive{background-color:var(--ui-destructive-color);color:var(--ui-text-color-on-primary)}.destructive:hover{background-color:var(--ui-destructive-color-hover)}.destructive:active{background-color:var(--ui-destructive-color-active)}.small{padding:6px 12px;font-size:14px}.medium{padding:10px 16px;font-size:14px}.large{padding:14px 20px;font-size:16px}button:disabled{opacity:.6;cursor:not-allowed}";
var as = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, ar = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ns(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && as(t, i, r), r;
};
let Ut = class extends c {
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
        class=${f(e)}
        ?disabled=${this.disabled}
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }
};
Ut.styles = h(ss);
ar([
  s({ type: String })
], Ut.prototype, "variant", 2);
ar([
  s({ type: String })
], Ut.prototype, "size", 2);
ar([
  s({ type: Boolean })
], Ut.prototype, "disabled", 2);
ar([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], Ut.prototype, "fullWidth", 2);
Ut = ar([
  d("ui-button")
], Ut);
const ls = ":host{display:inline-flex;border-radius:var(--ui-border-radius-md, 6px)}::slotted(ui-button){position:relative}::slotted(ui-button:hover),::slotted(ui-button:focus-within),::slotted(ui-button:active){z-index:1}::slotted(ui-button:not(:first-child)){margin-left:-1px}::slotted(ui-button){--ui-button-border-radius: 0}::slotted(ui-button:first-child){--ui-button-border-radius: var(--ui-border-radius-md, 6px) 0 0 var(--ui-border-radius-md, 6px)}::slotted(ui-button:last-child){--ui-button-border-radius: 0 var(--ui-border-radius-md, 6px) var(--ui-border-radius-md, 6px) 0}::slotted(ui-button:first-child:last-child){--ui-button-border-radius: var(--ui-border-radius-md, 6px)}";
var cs = Object.getOwnPropertyDescriptor, ds = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let Zr = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Zr.styles = h(ls);
Zr = ds([
  d("ui-button-group")
], Zr);
const hs = ":host{display:block;font-family:Inter,sans-serif}.card{background:var(--ui-card-background);border-radius:var(--ui-card-border-radius);box-shadow:var(--ui-card-shadow);border:1px solid var(--ui-card-border-color);overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .3s ease,border-color .3s ease;padding:var(--ui-card-padding, 0)}.card.interactive:hover{box-shadow:var(--ui-card-shadow-hover);cursor:pointer}.card.variant-outlined{box-shadow:none;border:1px solid var(--ui-card-border-color)}.card.variant-flat{box-shadow:none;border:none;background:var(--ui-card-background-flat)}";
var ps = Object.defineProperty, us = Object.getOwnPropertyDescriptor, No = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? us(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ps(t, i, r), r;
};
let Ni = class extends c {
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
      <div class=${f(e)} part="card">
        <slot></slot>
      </div>
    `;
  }
};
Ni.styles = h(hs);
No([
  s({ type: String, reflect: !0 })
], Ni.prototype, "variant", 2);
No([
  s({ type: Boolean, reflect: !0 })
], Ni.prototype, "interactive", 2);
Ni = No([
  d("ui-card")
], Ni);
const fs = ":host{display:block;padding:var(--ui-card-header-padding, 16px 24px)}.header{display:flex;align-items:center;gap:16px}.content{flex:1 1 auto}.title{margin:0;font-size:var(--ui-card-title-size, 1.25rem);font-weight:700;color:var(--ui-text-color);line-height:1.4}.subtitle{margin:4px 0 0;font-size:var(--ui-card-subtitle-size, .875rem);color:var(--ui-text-color-muted);font-weight:500}";
var vs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, Vo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? bs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && vs(t, i, r), r;
};
let Vi = class extends c {
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
Vi.styles = h(fs);
Vo([
  s({ type: String })
], Vi.prototype, "title", 2);
Vo([
  s({ type: String })
], Vi.prototype, "subtitle", 2);
Vi = Vo([
  d("ui-card-header")
], Vi);
const gs = ":host{display:block;padding:var(--ui-card-content-padding, 16px 24px);font-size:var(--ui-card-content-size, 1rem);color:var(--ui-text-color-muted);line-height:1.5}";
var ms = Object.getOwnPropertyDescriptor, ys = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ms(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let Jr = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Jr.styles = h(gs);
Jr = ys([
  d("ui-card-content")
], Jr);
const xs = ":host{display:block;width:100%;overflow:hidden}.media{width:100%;height:var(--ui-card-media-height, 200px);background-size:cover;background-position:center;background-repeat:no-repeat}img{width:100%;height:100%;object-fit:cover;display:block}";
var _s = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, Mr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ws(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _s(t, i, r), r;
};
let di = class extends c {
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
di.styles = h(xs);
Mr([
  s({ type: String })
], di.prototype, "image", 2);
Mr([
  s({ type: String })
], di.prototype, "alt", 2);
Mr([
  s({ type: String })
], di.prototype, "height", 2);
di = Mr([
  d("ui-card-media")
], di);
const ks = ":host{display:flex;padding:var(--ui-card-actions-padding, 8px 16px);align-items:center;gap:8px}";
var $s = Object.getOwnPropertyDescriptor, Ss = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? $s(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let Qr = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
Qr.styles = h(ks);
Qr = Ss([
  d("ui-card-actions")
], Qr);
const Cs = ":host{display:block;width:100%;cursor:pointer;position:relative}.action-area{transition:background-color .2s}.action-area:hover{background-color:var(--ui-card-action-area-hover, var(--ui-hover-color))}.action-area:active{background-color:var(--ui-card-action-area-active, var(--ui-active-color))}.action-area:focus-visible{outline:2px solid var(--ui-card-action-area-focus-ring, var(--ui-primary-color));outline-offset:-2px}";
var Is = Object.getOwnPropertyDescriptor, Ps = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Is(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let eo = class extends c {
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
eo.styles = h(Cs);
eo = Ps([
  d("ui-card-action-area")
], eo);
const zs = ':host{display:block;box-sizing:border-box;background-color:var(--ui-surface-1);color:var(--ui-text-color);border-radius:var(--ui-border-radius-md);padding:var(--ui-paper-padding, 0);transition:box-shadow .25s cubic-bezier(.4,0,.2,1),border-color .25s cubic-bezier(.4,0,.2,1),background-color .25s cubic-bezier(.4,0,.2,1);border:1px solid transparent}:host([square]){border-radius:0}:host([variant="outlined"]){border:1px solid var(--ui-border-color);box-shadow:none!important}:host([variant="flat"]){border:none;box-shadow:none}:host([variant="elevated"][elevation="0"]){box-shadow:none}:host([variant="elevated"][elevation="1"]){box-shadow:0 2px 4px #0000000d}:host([variant="elevated"][elevation="2"]){box-shadow:0 3px 6px #00000012}:host([variant="elevated"][elevation="3"]){box-shadow:0 4px 12px #00000014}:host([variant="elevated"][elevation="4"]){box-shadow:0 8px 16px #00000017}:host([variant="elevated"][elevation="6"]){box-shadow:0 12px 24px #0000001a}:host([variant="elevated"][elevation="8"]){box-shadow:0 16px 32px #0000001c}:host([variant="elevated"][elevation="12"]){box-shadow:0 20px 40px #0000001f}:host([variant="elevated"][elevation="16"]){box-shadow:0 24px 48px #00000021}:host([variant="elevated"][elevation="24"]){box-shadow:0 32px 64px #00000026}@media(prefers-color-scheme:dark){:host{background-color:var(--ui-surface-background-flat)}:host([variant="elevated"][elevation="0"]){box-shadow:none}:host([variant="elevated"][elevation="1"]){box-shadow:0 2px 4px #0000004d}:host([variant="elevated"][elevation="2"]){box-shadow:0 3px 6px #00000059}:host([variant="elevated"][elevation="3"]){box-shadow:0 4px 12px #0006}:host([variant="elevated"][elevation="4"]){box-shadow:0 8px 16px #00000073}:host([variant="elevated"][elevation="6"]){box-shadow:0 12px 24px #00000080}:host([variant="elevated"][elevation="8"]){box-shadow:0 16px 32px #0000008c}:host([variant="elevated"][elevation="12"]){box-shadow:0 20px 40px #0009}:host([variant="elevated"][elevation="16"]){box-shadow:0 24px 48px #000000a6}:host([variant="elevated"][elevation="24"]){box-shadow:0 32px 64px #000000b3}}';
var Ds = Object.defineProperty, Es = Object.getOwnPropertyDescriptor, Lr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Es(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ds(t, i, r), r;
};
let hi = class extends c {
  constructor() {
    super(...arguments), this.elevation = 1, this.square = !1, this.variant = "elevated";
  }
  render() {
    return l`<slot></slot>`;
  }
};
hi.styles = h(zs);
Lr([
  s({ type: Number, reflect: !0 })
], hi.prototype, "elevation", 2);
Lr([
  s({ type: Boolean, reflect: !0 })
], hi.prototype, "square", 2);
Lr([
  s({ type: String, reflect: !0 })
], hi.prototype, "variant", 2);
hi = Lr([
  d("ui-paper")
], hi);
const Os = ':host{display:block;font-family:var(--ui-font-family)}.input-wrapper{display:flex;flex-direction:column;gap:6px}label{font-size:14px;font-weight:500;color:var(--ui-label-color)}input{font-family:inherit;width:100%;box-sizing:border-box;padding:10px 14px;font-size:14px;border-radius:var(--ui-input-border-radius);border:1px solid var(--ui-input-border-color);background-color:var(--ui-input-bg);color:var(--ui-text-color);transition:border-color .2s,box-shadow .2s;outline:none}:host([size="sm"]) input{padding:6px 10px;font-size:13px}:host([size="lg"]) input{padding:12px 16px;font-size:16px}input::placeholder{color:var(--ui-input-placeholder-color)}input:hover:not(:disabled):not(.error-input){border-color:var(--ui-input-border-hover-color)}input:focus-visible{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}input[aria-invalid=true]{border-color:var(--ui-error-color)}input[aria-invalid=true]:focus-visible{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}input:disabled{background-color:var(--ui-input-disabled-bg);color:var(--ui-input-disabled-color);cursor:not-allowed;opacity:1}input[readonly]{background-color:var(--ui-input-readonly-bg);cursor:default}.help-text{font-size:12px;color:var(--ui-help-text-color);margin:0}.error-text{color:var(--ui-error-color)}';
var Ts = Object.defineProperty, As = Object.getOwnPropertyDescriptor, ce = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? As(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ts(t, i, r), r;
};
let Bs = 0, X = class extends c {
  constructor() {
    super(...arguments), this._inputId = `ui-input-${++Bs}`, this.label = "", this.value = "", this.type = "text", this.placeholder = "", this.helpText = "", this.error = !1, this.errorMessage = "", this.disabled = !1, this.required = !1, this.readonly = !1, this.name = "", this.autocomplete = "", this.size = "default";
  }
  /** Expose the internal <input> for direct access */
  get inputElement() {
    return this.shadowRoot.querySelector("input");
  }
  render() {
    const e = this.error || !!this.errorMessage, t = e && this.errorMessage || this.helpText ? `${this._inputId}-desc` : void 0;
    return l`
      <div class="input-wrapper" part="wrapper">
        ${this.label ? l`<label for=${this._inputId} part="label">${this.label}</label>` : ""}

        <input
          id=${this._inputId}
          part="input"
          .type=${this.type}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${e ? "true" : "false"}
          aria-describedby=${t ?? ""}
          name=${this.name}
          autocomplete=${this.autocomplete}
          class=${f({ "error-input": e })}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />

        ${e && this.errorMessage ? l`<p id=${t} class="help-text error-text" part="error-text" role="alert">${this.errorMessage}</p>` : this.helpText ? l`<p id=${t} class="help-text" part="help-text">${this.helpText}</p>` : ""}
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
X.styles = h(Os);
ce([
  s({ type: String })
], X.prototype, "label", 2);
ce([
  s({ type: String })
], X.prototype, "value", 2);
ce([
  s({ type: String })
], X.prototype, "type", 2);
ce([
  s({ type: String })
], X.prototype, "placeholder", 2);
ce([
  s({ type: String, attribute: "help-text" })
], X.prototype, "helpText", 2);
ce([
  s({ type: Boolean })
], X.prototype, "error", 2);
ce([
  s({ type: String, attribute: "error-message" })
], X.prototype, "errorMessage", 2);
ce([
  s({ type: Boolean, reflect: !0 })
], X.prototype, "disabled", 2);
ce([
  s({ type: Boolean, reflect: !0 })
], X.prototype, "required", 2);
ce([
  s({ type: Boolean, reflect: !0 })
], X.prototype, "readonly", 2);
ce([
  s({ type: String })
], X.prototype, "name", 2);
ce([
  s({ type: String })
], X.prototype, "autocomplete", 2);
ce([
  s({ type: String, reflect: !0 })
], X.prototype, "size", 2);
X = ce([
  d("ui-input")
], X);
const Ms = ':host{display:block;--_h: 40px;--_px: 12px;--_font: .875rem;--ui-select-bg: var(--ui-input-bg);--ui-select-border: var(--ui-input-border-color);--ui-select-radius: var(--ui-input-border-radius);--ui-select-focus-color: var(--ui-primary-color);--ui-select-error-color: var(--ui-error-color);font-family:var(--ui-font-family)}:host([size="sm"]){--_h: 32px;--_px: 8px;--_font: .8125rem}:host([size="md"]){--_h: 40px;--_px: 12px;--_font: .875rem}:host([size="lg"]){--_h: 48px;--_px: 16px;--_font: .9375rem}.wrapper{display:flex;flex-direction:column;gap:6px;position:relative}label{font-size:.875rem;font-weight:500;color:var(--ui-label-color);margin-left:2px}.select-trigger{display:flex;align-items:center;min-height:var(--_h);padding:0 var(--_px);background-color:var(--ui-select-bg);border:1.5px solid var(--ui-select-border);border-radius:var(--ui-select-radius);cursor:pointer;transition:border-color .2s,box-shadow .2s;position:relative;gap:10px;-webkit-user-select:none;user-select:none;outline:none}.select-trigger:hover:not(.disabled):not(.readonly){border-color:var(--ui-input-border-hover-color)}.select-trigger.focused{border-color:var(--ui-select-focus-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([error]) .select-trigger{border-color:var(--ui-select-error-color)}:host([error]) .select-trigger.focused{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}.select-trigger.disabled{opacity:.6;cursor:not-allowed;background-color:var(--ui-input-disabled-bg)}.select-trigger.readonly{cursor:default;background-color:var(--ui-input-readonly-bg)}.value-container{flex:1;display:flex;flex-wrap:wrap;gap:6px;padding:6px 0;min-height:24px;align-items:center;overflow:hidden}.placeholder{color:var(--ui-input-placeholder-color);font-size:var(--_font)}.single-value{color:var(--ui-text-color);font-size:var(--_font);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chip{background-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary);padding:2px 8px 2px 10px;border-radius:16px;font-size:.75rem;font-weight:600;display:flex;align-items:center;gap:4px;animation:chip-in .2s ease-out}@keyframes chip-in{0%{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}.chip-remove{display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.8;transition:opacity .2s;background:none;border:none;padding:0;color:inherit;line-height:0}.chip-remove:hover{opacity:1}.arrow{display:flex;align-items:center;justify-content:center;transition:transform .3s ease;color:var(--ui-text-color-muted);flex-shrink:0}.select-trigger.open .arrow{transform:rotate(180deg);color:var(--ui-select-focus-color)}.dropdown{position:absolute;left:0;right:0;background-color:var(--ui-select-bg);border-radius:var(--ui-select-radius);box-shadow:var(--ui-shadow-lg);border:1px solid var(--ui-border-color);z-index:1000;max-height:260px;overflow-y:auto;opacity:0;pointer-events:none;transition:opacity .15s,transform .15s}.dropdown.below{top:calc(100% + 6px);transform:translateY(-8px)}.dropdown.above{bottom:calc(100% + 6px);transform:translateY(8px)}.dropdown.open{opacity:1;transform:translateY(0);pointer-events:auto}.option{padding:10px 14px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;color:var(--ui-text-color);transition:background-color .15s;font-size:var(--_font)}.option.highlighted{background-color:var(--ui-hover-color)}.option.selected{background-color:var(--ui-primary-color-light);color:var(--ui-primary-color);font-weight:600}.option.option-disabled{opacity:.4;cursor:not-allowed;pointer-events:none}.check-icon{color:var(--ui-primary-color);opacity:0;transition:opacity .15s;flex-shrink:0}.option.selected .check-icon{opacity:1}.no-options{padding:12px 16px;color:var(--ui-text-color-muted);font-size:.875rem;cursor:default}.error-message{font-size:.75rem;color:var(--ui-select-error-color);margin-left:2px}.dropdown::-webkit-scrollbar{width:6px}.dropdown::-webkit-scrollbar-track{background:transparent}.dropdown::-webkit-scrollbar-thumb{background:var(--ui-border-color);border-radius:3px}';
var Ls = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, R = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Us(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ls(t, i, r), r;
};
let js = 0, E = class extends c {
  constructor() {
    super(), this.label = "", this.options = [], this.value = [], this.multiple = !1, this.placeholder = "Select an option", this.disabled = !1, this.readonly = !1, this.required = !1, this.error = !1, this.errorMessage = "", this.name = "", this.size = "md", this.defaultValue = "", this._isOpen = !1, this._highlightedIndex = -1, this._isFocused = !1, this._opensUp = !1, this._uid = `ui-select-${++js}`, this._firstUpdate = !0, this._handleOutsideClick = (e) => {
      if (!this._isOpen) return;
      const t = e.composedPath();
      (t.length > 0 ? t.includes(this) : this.contains(e.target)) || (this._isOpen = !1, this._highlightedIndex = -1);
    }, this._handleKeydown = (e) => {
      const t = this.options.map((i, o) => ({ o: i, i: o })).filter(({ o: i }) => !i.disabled);
      switch (e.key) {
        case "ArrowDown": {
          if (e.preventDefault(), !this._isOpen)
            this._toggleDropdown(), this._highlightedIndex === -1 && t.length > 0 && (this._highlightedIndex = t[0].i);
          else {
            const i = t.findIndex(({ i: r }) => r === this._highlightedIndex), o = t[i + 1];
            o && (this._highlightedIndex = o.i, this._scrollOptionIntoView(o.i));
          }
          break;
        }
        case "ArrowUp": {
          if (e.preventDefault(), this._isOpen) {
            const i = t.findIndex(({ i: r }) => r === this._highlightedIndex), o = i > 0 ? t[i - 1] : null;
            o && (this._highlightedIndex = o.i, this._scrollOptionIntoView(o.i));
          }
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault(), this._isOpen ? this._highlightedIndex >= 0 && this._handleOptionClick(this.options[this._highlightedIndex], e) : this._toggleDropdown();
          break;
        }
        case "Escape": {
          this._isOpen && (e.preventDefault(), this._isOpen = !1, this._highlightedIndex = -1);
          break;
        }
        case "Tab": {
          this._isOpen && (this._isOpen = !1, this._highlightedIndex = -1);
          break;
        }
      }
    };
    try {
      this._internals = this.attachInternals();
    } catch {
    }
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._handleOutsideClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._handleOutsideClick);
  }
  willUpdate(e) {
    this._firstUpdate && (this._firstUpdate = !1, this.defaultValue && this.value.length === 0 && (this.value = [this.defaultValue])), (e.has("value") || e.has("name") || e.has("required")) && this._updateFormValue();
  }
  _updateFormValue() {
    if (!(!this._internals || typeof this._internals.setFormValue != "function")) {
      if (this.multiple) {
        const e = new FormData();
        this.value.forEach((t) => e.append(this.name || "select", t)), this._internals.setFormValue(e);
      } else
        this._internals.setFormValue(this.value[0] ?? "");
      this.required && this.value.length === 0 ? this._internals.setValidity({ valueMissing: !0 }, "Please select an option") : this._internals.setValidity({});
    }
  }
  _toggleDropdown() {
    if (!(this.disabled || this.readonly)) {
      if (this._isOpen)
        this._highlightedIndex = -1;
      else {
        const e = this.getBoundingClientRect();
        this._opensUp = window.innerHeight - e.bottom < 280, this._highlightedIndex = this.value.length > 0 ? this.options.findIndex((t) => t.value === this.value[0]) : -1;
      }
      this._isOpen = !this._isOpen;
    }
  }
  _handleOptionClick(e, t) {
    if (!e.disabled) {
      if (t.stopPropagation(), this.multiple) {
        const i = [...this.value], o = i.indexOf(e.value);
        o > -1 ? i.splice(o, 1) : i.push(e.value), this.value = i;
      } else
        this.value = [e.value], this._isOpen = !1, this._highlightedIndex = -1;
      this._dispatchChange();
    }
  }
  _removeValue(e, t) {
    t.stopPropagation(), this.value = this.value.filter((i) => i !== e), this._dispatchChange(), this.shadowRoot?.querySelector(".select-trigger")?.focus();
  }
  _dispatchChange() {
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.multiple ? this.value : this.value[0] ?? null },
      bubbles: !0,
      composed: !0
    }));
  }
  _scrollOptionIntoView(e) {
    this.updateComplete.then(() => {
      const t = this.shadowRoot?.querySelector(`#${this._uid}-opt-${e}`);
      t && typeof t.scrollIntoView == "function" && t.scrollIntoView({ block: "nearest" });
    });
  }
  render() {
    const e = this.options.filter((r) => this.value.includes(r.value)), t = `${this._uid}-label`, i = `${this._uid}-listbox`, o = this._highlightedIndex >= 0 ? `${this._uid}-opt-${this._highlightedIndex}` : "";
    return l`
      <div class="wrapper">
        ${this.label ? l`<label id=${t}>${this.label}</label>` : v}

        <div
          class=${f({
      "select-trigger": !0,
      focused: this._isOpen || this._isFocused,
      open: this._isOpen,
      disabled: this.disabled,
      readonly: this.readonly,
      "has-value": e.length > 0
    })}
          tabindex=${this.disabled ? "-1" : "0"}
          role="combobox"
          aria-expanded=${this._isOpen ? "true" : "false"}
          aria-haspopup="listbox"
          aria-controls=${i}
          aria-labelledby=${this.label ? t : v}
          aria-activedescendant=${o || v}
          aria-disabled=${this.disabled ? "true" : v}
          aria-required=${this.required ? "true" : v}
          @click=${this._toggleDropdown}
          @keydown=${this._handleKeydown}
          @focus=${() => {
      this._isFocused = !0;
    }}
          @blur=${() => {
      this._isFocused = !1;
    }}
        >
          <slot name="icon"></slot>

          <div class="value-container">
            ${e.length === 0 ? l`
              <span class="placeholder">${this.placeholder}</span>
            ` : v}

            ${this.multiple ? Lt(e, (r) => r.value, (r) => l`
                  <span class="chip">
                    ${r.label}
                    <button
                      type="button"
                      class="chip-remove"
                      aria-label="Remove ${r.label}"
                      @click=${(a) => this._removeValue(r.value, a)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </span>
                `) : e[0] ? l`
                  <span class="single-value">${e[0].label}</span>
                ` : v}
          </div>

          <div class="arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div
          id=${i}
          class=${f({
      dropdown: !0,
      open: this._isOpen,
      above: this._opensUp,
      below: !this._opensUp
    })}
          role="listbox"
          aria-multiselectable=${this.multiple ? "true" : "false"}
        >
          ${this.options.length === 0 ? l`<div class="no-options">No options available</div>` : Lt(this.options, (r) => r.value, (r, a) => {
      const n = this.value.includes(r.value);
      return l`
                  <div
                    id=${`${this._uid}-opt-${a}`}
                    class=${f({
        option: !0,
        selected: n,
        highlighted: a === this._highlightedIndex,
        "option-disabled": !!r.disabled
      })}
                    @click=${(p) => this._handleOptionClick(r, p)}
                    @mouseenter=${() => {
        r.disabled || (this._highlightedIndex = a);
      }}
                    role="option"
                    aria-selected=${n ? "true" : "false"}
                    aria-disabled=${r.disabled ? "true" : v}
                  >
                    <span>${r.label}</span>
                    <div class="check-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                `;
    })}
        </div>

        ${this.error && this.errorMessage ? l`
          <span class="error-message" role="alert">${this.errorMessage}</span>
        ` : v}
      </div>
    `;
  }
};
E.formAssociated = !0;
E.styles = h(Ms);
R([
  s({ type: String })
], E.prototype, "label", 2);
R([
  s({ type: Array })
], E.prototype, "options", 2);
R([
  s({ type: Array })
], E.prototype, "value", 2);
R([
  s({ type: Boolean })
], E.prototype, "multiple", 2);
R([
  s({ type: String })
], E.prototype, "placeholder", 2);
R([
  s({ type: Boolean, reflect: !0 })
], E.prototype, "disabled", 2);
R([
  s({ type: Boolean, reflect: !0 })
], E.prototype, "readonly", 2);
R([
  s({ type: Boolean, reflect: !0 })
], E.prototype, "required", 2);
R([
  s({ type: Boolean, reflect: !0 })
], E.prototype, "error", 2);
R([
  s({ type: String, attribute: "error-message" })
], E.prototype, "errorMessage", 2);
R([
  s({ type: String })
], E.prototype, "name", 2);
R([
  s({ type: String, reflect: !0 })
], E.prototype, "size", 2);
R([
  s({ type: String, attribute: "default-value" })
], E.prototype, "defaultValue", 2);
R([
  b()
], E.prototype, "_isOpen", 2);
R([
  b()
], E.prototype, "_highlightedIndex", 2);
R([
  b()
], E.prototype, "_isFocused", 2);
R([
  b()
], E.prototype, "_opensUp", 2);
E = R([
  d("ui-select")
], E);
const Rs = ":host{--ui-fab-size: 56px;--ui-fab-background: var(--ui-primary-color);--ui-fab-color: var(--ui-text-color-on-primary);--ui-fab-shadow: var(--ui-shadow-lg);--ui-fab-radius: 50%;display:inline-block;position:fixed;z-index:100}.fab{display:flex;align-items:center;justify-content:center;width:var(--ui-fab-size);height:var(--ui-fab-size);border-radius:var(--ui-fab-radius);background-color:var(--ui-fab-background);color:var(--ui-fab-color);box-shadow:var(--ui-fab-shadow);border:none;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);padding:0;overflow:hidden;outline:none}.fab:hover:not(:disabled){box-shadow:var(--ui-shadow-xl);filter:brightness(1.1);transform:translateY(-2px)}.fab:active:not(:disabled){transform:translateY(0);filter:brightness(.9)}.fab:focus-visible{outline:3px solid var(--ui-fab-background);outline-offset:3px}.fab:disabled{opacity:.4;cursor:not-allowed}.fab.extended{width:auto;min-width:80px;padding:0 20px;border-radius:28px;height:56px}.fab.extended .icon-slot{margin-right:12px}.icon-slot{display:flex;align-items:center;justify-content:center;font-size:24px}.label-slot{font-family:var(--ui-font-family);font-weight:500;font-size:.875rem;letter-spacing:.1px;text-transform:uppercase}";
var Ns = Object.defineProperty, Vs = Object.getOwnPropertyDescriptor, nr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Vs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ns(t, i, r), r;
};
let jt = class extends c {
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
    }, [t, i, o, r] = e[this.position] ?? e["bottom-right"];
    this.style.position = "fixed", this.style.top = t, this.style.bottom = i, this.style.right = o, this.style.left = r;
  }
  render() {
    const e = {
      fab: !0,
      extended: this.extended
    };
    return l`
      <button
        class="${f(e)}"
        ?disabled="${this.disabled}"
        aria-label="${re(this.extended ? void 0 : this.label)}"
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
jt.styles = h(Rs);
nr([
  s({ type: Boolean, reflect: !0 })
], jt.prototype, "extended", 2);
nr([
  s({ type: Boolean, reflect: !0 })
], jt.prototype, "disabled", 2);
nr([
  s({ type: String })
], jt.prototype, "label", 2);
nr([
  s({ type: String })
], jt.prototype, "position", 2);
jt = nr([
  d("ui-fab")
], jt);
const Fs = ":host{display:inline-block;position:relative;font-family:var(--ui-font-family);width:100%}.input-wrapper{position:relative}input{width:100%;padding:8px 12px;border:1px solid var(--ui-input-border-color);border-radius:var(--ui-input-border-radius);font-size:14px;box-sizing:border-box;outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit;color:var(--ui-text-color);background:var(--ui-input-bg)}input:focus{border-color:var(--ui-primary-color);box-shadow:0 0 0 1px var(--ui-primary-color)}input:disabled{background-color:var(--ui-input-disabled-bg);color:var(--ui-text-color-subtle);cursor:not-allowed}.dropdown{position:absolute;top:100%;left:0;right:0;max-height:250px;overflow-y:auto;background:var(--ui-surface-1);border:1px solid var(--ui-input-border-color);border-radius:var(--ui-input-border-radius);margin-top:4px;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f;z-index:10;display:none}.dropdown.open{display:block}.option{padding:10px 12px;cursor:pointer;font-size:14px;transition:background-color .15s;color:var(--ui-text-color)}.option:hover,.option.active{background-color:var(--ui-hover-color)}.no-options{padding:10px 12px;font-size:14px;color:var(--ui-text-color-muted)}";
var qs = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, Ze = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Hs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && qs(t, i, r), r;
};
let we = class extends c {
  constructor() {
    super(...arguments), this.options = [], this.freeSolo = !1, this.disabled = !1, this.value = "", this.placeholder = "", this._isOpen = !1, this._inputValue = "", this._filteredOptions = [], this._activeIndex = -1, this._handleOutsideClick = (e) => {
      if (!this.contains(e.target) && (this._isOpen = !1, this._activeIndex = -1, !this.freeSolo)) {
        const t = this.options.find((i) => i.value === this.value);
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
      const t = this.options.find((i) => i.value === this.value);
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
          const i = this.options.find((o) => o.value === this.value);
          this._inputValue = i ? i.label : "";
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
          class=${f({ dropdown: !0, open: e })}
        >
          ${this._filteredOptions.length > 0 ? this._filteredOptions.map(
      (t, i) => l`
                  <div
                    id="option-${i}"
                    role="option"
                    aria-selected=${i === this._activeIndex ? "true" : "false"}
                    class=${f({ option: !0, active: i === this._activeIndex })}
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
we.styles = h(Fs);
Ze([
  s({ type: Array })
], we.prototype, "options", 2);
Ze([
  s({ type: Boolean })
], we.prototype, "freeSolo", 2);
Ze([
  s({ type: Boolean })
], we.prototype, "disabled", 2);
Ze([
  s({ type: String })
], we.prototype, "value", 2);
Ze([
  s({ type: String })
], we.prototype, "placeholder", 2);
Ze([
  b()
], we.prototype, "_isOpen", 2);
Ze([
  b()
], we.prototype, "_inputValue", 2);
Ze([
  b()
], we.prototype, "_filteredOptions", 2);
Ze([
  b()
], we.prototype, "_activeIndex", 2);
we = Ze([
  d("ui-autocomplete")
], we);
const Ys = ":host{display:inline-block;font-family:var(--ui-font-family);color:var(--ui-text-color)}.wrapper{display:inline-flex;align-items:center;cursor:pointer}.wrapper.disabled{opacity:.5;cursor:not-allowed}.checkbox{position:relative;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border:2px solid var(--ui-input-border-color);border-radius:var(--ui-border-radius-sm);background-color:var(--ui-surface-1);transition:all .2s ease;margin-right:8px}.wrapper:hover:not(.disabled) .checkbox{border-color:var(--ui-primary-color)}.checkbox.checked,.checkbox.indeterminate{background-color:var(--ui-primary-color);border-color:var(--ui-primary-color)}.icon{fill:none;stroke:var(--ui-text-color-on-primary);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;width:12px;height:12px;opacity:0;transform:scale(.5);transition:all .2s cubic-bezier(.175,.885,.32,1.275)}.checked .icon,.indeterminate .icon{opacity:1;transform:scale(1)}input{position:absolute;opacity:0;width:0;height:0;margin:0}input:focus-visible+.checkbox{outline:2px solid var(--ui-primary-color);outline-offset:2px}.label{font-size:14px;line-height:1.5;-webkit-user-select:none;user-select:none}::slotted(*),.label{cursor:inherit}";
var Ks = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, Dt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ws(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ks(t, i, r), r;
};
let Ve = class extends c {
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
      <label class=${f({ wrapper: !0, disabled: this.disabled })}>
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name || v}
          .value=${this.value}
          @change=${this._handleChange}
        >
        <div class=${f({ checkbox: !0, checked: this.checked, indeterminate: this.indeterminate })}>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            ${this.indeterminate ? l`<line x1="4" y1="12" x2="20" y2="12"></line>` : l`<polyline points="20 6 9 17 4 12"></polyline>`}
          </svg>
        </div>
        ${this.label ? l`<span class="label">${this.label}</span>` : l`<slot class="label"></slot>`}
      </label>
    `;
  }
};
Ve.styles = h(Ys);
Dt([
  s({ type: Boolean, reflect: !0 })
], Ve.prototype, "checked", 2);
Dt([
  s({ type: Boolean })
], Ve.prototype, "indeterminate", 2);
Dt([
  s({ type: Boolean, reflect: !0 })
], Ve.prototype, "disabled", 2);
Dt([
  s({ type: Boolean })
], Ve.prototype, "required", 2);
Dt([
  s({ type: String })
], Ve.prototype, "label", 2);
Dt([
  s({ type: String })
], Ve.prototype, "name", 2);
Dt([
  s({ type: String })
], Ve.prototype, "value", 2);
Ve = Dt([
  d("ui-checkbox")
], Ve);
const Gs = ':host{display:block;font-family:var(--ui-font-family);color:var(--ui-text-color)}:host([disabled]){opacity:.5;pointer-events:none}.group-container{display:flex;flex-direction:column;gap:var(--ui-radio-group-gap, 8px)}:host([orientation="horizontal"]) .group-container{flex-direction:row;flex-wrap:wrap}', Xs = ':host{display:inline-block;cursor:pointer}:host([disabled]){cursor:not-allowed}.wrapper{display:inline-flex;align-items:center;cursor:pointer}.wrapper.disabled{opacity:.5;cursor:not-allowed}.radio-circle{position:relative;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border:2px solid var(--ui-input-border-color);border-radius:50%;background-color:var(--ui-surface-1);transition:all .2s ease;margin-right:8px;flex-shrink:0}:host([size="sm"]) .radio-circle{width:14px;height:14px}:host([size="lg"]) .radio-circle{width:22px;height:22px}.wrapper:hover:not(.disabled) .radio-circle{border-color:var(--ui-primary-color)}.radio-circle.checked{border-color:var(--ui-primary-color)}.radio-circle:after{content:"";width:8px;height:8px;border-radius:50%;background-color:var(--ui-primary-color);opacity:0;transform:scale(.5);transition:all .2s cubic-bezier(.175,.885,.32,1.275)}:host([size="sm"]) .radio-circle:after{width:6px;height:6px}:host([size="lg"]) .radio-circle:after{width:10px;height:10px}.checked:after{opacity:1;transform:scale(1)}input{position:absolute;opacity:0;width:0;height:0;margin:0}input:focus-visible+.radio-circle{outline:2px solid var(--ui-primary-color);outline-offset:2px}.label{font-size:14px;line-height:1.5;-webkit-user-select:none;user-select:none}:host([size="sm"]) .label{font-size:12px}:host([size="lg"]) .label{font-size:16px}';
var Zs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, q = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Js(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Zs(t, i, r), r;
};
let Ee = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.name = "", this.value = "", this.defaultValue = "", this.disabled = !1, this.required = !1, this.orientation = "vertical", this.size = "md", this._firstUpdate = !0, this._boundHandleRadioSelect = this._handleRadioSelect.bind(this), this._boundHandleKeyDown = this._handleKeyDown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("ui-radio-select", this._boundHandleRadioSelect), this.addEventListener("keydown", this._boundHandleKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("ui-radio-select", this._boundHandleRadioSelect), this.removeEventListener("keydown", this._boundHandleKeyDown);
  }
  willUpdate() {
    this._firstUpdate && (this._firstUpdate = !1, this.defaultValue && !this.value && (this.value = this.defaultValue));
  }
  updated(e) {
    (e.has("value") || e.has("name") || e.has("size") || e.has("required")) && this._syncChildren();
  }
  _getRadios() {
    return Array.from(this.querySelectorAll("ui-radio"));
  }
  _getEnabledRadios() {
    return this._getRadios().filter((e) => !e.disabled);
  }
  _handleRadioSelect(e) {
    if (this.disabled) return;
    const { value: t } = e.detail;
    this.value = t, this._syncChildren(), this.dispatchEvent(new CustomEvent("ui-radio-group-change", {
      detail: { value: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleKeyDown(e) {
    if (this.disabled || !["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const t = this._getEnabledRadios();
    if (!t.length) return;
    const i = e.composedPath(), o = t.find((u) => i.includes(u)), r = o ? t.indexOf(o) : t.findIndex((u) => u.value === this.value), a = r >= 0 ? r : 0;
    e.preventDefault();
    const n = e.key === "ArrowDown" || e.key === "ArrowRight" ? (a + 1) % t.length : (a - 1 + t.length) % t.length, p = t[n];
    p.focus(), this.value = p.value, this._syncChildren(), this.dispatchEvent(new CustomEvent("ui-radio-group-change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _syncChildren() {
    this._getRadios().forEach((e) => {
      e.checked = e.value === this.value, this.name && (e.name = this.name), e.size = this.size, e.required = this.required;
    });
  }
  _handleSlotChange() {
    this._syncChildren();
  }
  render() {
    return l`
            <div
                class="group-container"
                role="radiogroup"
                aria-label=${re(this.label || void 0)}
                aria-disabled=${re(this.disabled ? "true" : void 0)}
                aria-required=${re(this.required ? "true" : void 0)}
            >
                <slot @slotchange=${this._handleSlotChange}></slot>
            </div>
        `;
  }
};
Ee.styles = h(Gs);
q([
  s({ type: String })
], Ee.prototype, "label", 2);
q([
  s({ type: String })
], Ee.prototype, "name", 2);
q([
  s({ type: String })
], Ee.prototype, "value", 2);
q([
  s({ type: String, attribute: "default-value" })
], Ee.prototype, "defaultValue", 2);
q([
  s({ type: Boolean, reflect: !0 })
], Ee.prototype, "disabled", 2);
q([
  s({ type: Boolean, reflect: !0 })
], Ee.prototype, "required", 2);
q([
  s({ type: String, reflect: !0 })
], Ee.prototype, "orientation", 2);
q([
  s({ type: String, reflect: !0 })
], Ee.prototype, "size", 2);
Ee = q([
  d("ui-radio-group")
], Ee);
let Fe = class extends c {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.required = !1, this.name = "", this.value = "", this.label = "", this.size = "md";
  }
  focus(e) {
    this.shadowRoot?.querySelector("input")?.focus(e);
  }
  _handleChange() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-radio-select", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return l`
            <label class=${f({ wrapper: !0, disabled: this.disabled })}>
                <input
                    type="radio"
                    .name=${this.name}
                    .value=${this.value}
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    @change=${this._handleChange}
                >
                <div class=${f({ "radio-circle": !0, checked: this.checked })}></div>
                <span class="label">
                    ${this.label ? this.label : l`<slot></slot>`}
                </span>
            </label>
        `;
  }
};
Fe.styles = h(Xs);
q([
  s({ type: Boolean, reflect: !0 })
], Fe.prototype, "checked", 2);
q([
  s({ type: Boolean, reflect: !0 })
], Fe.prototype, "disabled", 2);
q([
  s({ type: Boolean, reflect: !0 })
], Fe.prototype, "required", 2);
q([
  s({ type: String })
], Fe.prototype, "name", 2);
q([
  s({ type: String })
], Fe.prototype, "value", 2);
q([
  s({ type: String })
], Fe.prototype, "label", 2);
q([
  s({ type: String, reflect: !0 })
], Fe.prototype, "size", 2);
Fe = q([
  d("ui-radio")
], Fe);
const Qs = ':host{display:inline-block;font-family:var(--ui-font-family);--ui-rating-color: #ffb400;--ui-rating-empty-color: #faaf0033;--ui-rating-size: 2rem;font-size:var(--ui-rating-size)}:host([size="sm"]){--ui-rating-size: 1.25rem}:host([size="md"]){--ui-rating-size: 2rem}:host([size="lg"]){--ui-rating-size: 2.75rem}:host([disabled]){opacity:.4;cursor:not-allowed}:host([readonly]) .rating-container{cursor:default}.rating-container{display:inline-flex;position:relative;cursor:pointer;font-size:1em;line-height:1;gap:.1em}.rating-container:focus{outline:none}.star-wrapper{position:relative;display:inline-flex;transition:transform .1s ease;outline:none}.star-wrapper:focus-visible{border-radius:2px;box-shadow:0 0 0 2px var(--ui-rating-color)}.star-wrapper:not(.readonly):not(.disabled):hover{transform:scale(1.1)}svg{width:1em;height:1em;fill:var(--ui-rating-empty-color);stroke:var(--ui-rating-color);stroke-width:1;transition:fill .2s ease,stroke .2s ease;overflow:visible}.active svg{fill:var(--ui-rating-color)}.hover svg{fill:var(--ui-rating-color);opacity:.7}.half svg .star-full{display:none}.half svg .star-half{display:block}.star-half{display:none}.hidden-input{position:absolute;opacity:0;width:0;height:0;margin:0;pointer-events:none}';
var ea = Object.defineProperty, ta = Object.getOwnPropertyDescriptor, Pe = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ta(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ea(t, i, r), r;
};
let ne = class extends c {
  constructor() {
    super(...arguments), this.value = 0, this.max = 5, this.readonly = !1, this.disabled = !1, this.clearable = !1, this.defaultValue = 0, this.size = "md", this.name = "", this.label = "Rating", this.precision = 1, this._hoverValue = -1, this._firstUpdate = !0;
  }
  willUpdate(e) {
    this._firstUpdate && this.defaultValue !== 0 && (this.value = this.defaultValue), this._firstUpdate = !1, (e.has("value") || e.has("name")) && this._syncHiddenInput();
  }
  _syncHiddenInput() {
    const e = this.shadowRoot?.querySelector(".hidden-input");
    e && (e.name = this.name, e.value = String(this.value));
  }
  firstUpdated() {
    this._syncHiddenInput();
  }
  _isInteractive() {
    return !this.readonly && !this.disabled;
  }
  _handleMouseEnter(e) {
    this._isInteractive() && (this._hoverValue = e);
  }
  _handleMouseLeave() {
    this._isInteractive() && (this._hoverValue = -1);
  }
  _handleMouseMove(e, t) {
    if (!this._isInteractive() || this.precision !== 0.5) return;
    const i = e.currentTarget, { left: o, width: r } = i.getBoundingClientRect(), a = e.clientX - o < r / 2;
    this._hoverValue = a ? t - 0.5 : t;
  }
  _handleClick(e) {
    if (!this._isInteractive()) return;
    const t = this.clearable && this.value === e ? 0 : e;
    this.value = t, this.dispatchEvent(new CustomEvent("ui-rating-change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleKeydown(e, t) {
    if (!this._isInteractive()) return;
    const i = this.precision === 0.5 ? 0.5 : 1;
    let o = this.value;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault(), o = Math.min(this.max, this.value + i);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault(), o = Math.max(0, this.value - i);
        break;
      case "Home":
        e.preventDefault(), o = 0;
        break;
      case "End":
        e.preventDefault(), o = this.max;
        break;
      case " ":
      case "Enter":
        e.preventDefault(), this._handleClick(t);
        return;
      default:
        return;
    }
    o !== this.value && (this.value = o, this.dispatchEvent(new CustomEvent("ui-rating-change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    })));
  }
  _starSvg(e) {
    const t = "ui-rating-half";
    return _t`
            <svg viewBox="0 0 24 24" aria-hidden="true">
                ${e === "half" ? _t`
                    <defs>
                        <linearGradient id="${t}">
                            <stop offset="50%" stop-color="var(--ui-rating-color)"></stop>
                            <stop offset="50%" stop-color="var(--ui-rating-empty-color)"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#${t})" stroke="var(--ui-rating-color)" stroke-width="1"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                ` : _t`
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                `}
            </svg>
        `;
  }
  render() {
    const e = Math.ceil(this.value) || 1, t = [];
    for (let i = 1; i <= this.max; i++) {
      const o = this._hoverValue !== -1 ? this._hoverValue : this.value, r = this.precision === 0.5 && o >= i - 0.5 && o < i, a = o >= i, n = this._hoverValue !== -1;
      let p;
      r ? p = "half" : a ? p = "full" : p = "empty";
      const u = {
        "star-wrapper": !0,
        active: p === "full" && !n,
        hover: p === "full" && n,
        half: p === "half",
        readonly: this.readonly,
        disabled: this.disabled
      };
      t.push(l`
                <span
                    class=${f(u)}
                    role="radio"
                    aria-label="${i} ${i === 1 ? "star" : "stars"}"
                    aria-checked=${this.value >= i ? "true" : "false"}
                    tabindex=${i === e && !this.disabled ? "0" : "-1"}
                    @mouseenter=${() => this._handleMouseEnter(i)}
                    @mousemove=${(y) => this._handleMouseMove(y, i)}
                    @click=${() => this._handleClick(this._hoverValue !== -1 ? this._hoverValue : i)}
                    @keydown=${(y) => this._handleKeydown(y, i)}
                >
                    ${this._starSvg(p)}
                </span>
            `);
    }
    return l`
            <input class="hidden-input" type="hidden" .name=${this.name} .value=${String(this.value)}>
            <div
                class="rating-container"
                role="radiogroup"
                aria-label=${this.label}
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-readonly=${this.readonly ? "true" : "false"}
                @mouseleave=${this._handleMouseLeave}
            >
                ${t}
            </div>
        `;
  }
};
ne.styles = h(Qs);
Pe([
  s({ type: Number })
], ne.prototype, "value", 2);
Pe([
  s({ type: Number })
], ne.prototype, "max", 2);
Pe([
  s({ type: Boolean, reflect: !0 })
], ne.prototype, "readonly", 2);
Pe([
  s({ type: Boolean, reflect: !0 })
], ne.prototype, "disabled", 2);
Pe([
  s({ type: Boolean })
], ne.prototype, "clearable", 2);
Pe([
  s({ type: Number })
], ne.prototype, "defaultValue", 2);
Pe([
  s({ type: String, reflect: !0 })
], ne.prototype, "size", 2);
Pe([
  s({ type: String })
], ne.prototype, "name", 2);
Pe([
  s({ type: String })
], ne.prototype, "label", 2);
Pe([
  s({ type: Number })
], ne.prototype, "precision", 2);
Pe([
  b()
], ne.prototype, "_hoverValue", 2);
ne = Pe([
  d("ui-rating")
], ne);
const ia = ':host{display:inline-block;--ui-switch-width: 52px;--ui-switch-height: 32px;--ui-switch-thumb-size: 24px;--ui-switch-thumb-offset: 4px;--ui-switch-bg: var(--ui-secondary-color);--ui-switch-bg-on: var(--ui-primary-color);--ui-switch-thumb-bg: var(--ui-switch-thumb-color);font-family:var(--ui-font-family);cursor:pointer}:host([disabled]){cursor:not-allowed}:host([size="sm"]){--ui-switch-width: 36px;--ui-switch-height: 22px;--ui-switch-thumb-size: 16px;--ui-switch-thumb-offset: 3px}:host([size="lg"]){--ui-switch-width: 64px;--ui-switch-height: 38px;--ui-switch-thumb-size: 30px;--ui-switch-thumb-offset: 4px}.wrapper{display:flex;align-items:center;gap:12px;-webkit-user-select:none;user-select:none}.switch{position:relative;width:var(--ui-switch-width);height:var(--ui-switch-height);background-color:var(--ui-switch-bg);border-radius:calc(var(--ui-switch-height) / 2);transition:background-color .3s cubic-bezier(.4,0,.2,1);flex-shrink:0}.switch.checked{background-color:var(--ui-switch-bg-on)}.thumb{position:absolute;top:var(--ui-switch-thumb-offset);left:var(--ui-switch-thumb-offset);width:var(--ui-switch-thumb-size);height:var(--ui-switch-thumb-size);background-color:var(--ui-switch-thumb-bg);border-radius:50%;box-shadow:var(--ui-shadow-sm);transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;justify-content:center;color:var(--ui-text-color-muted)}.switch.checked .thumb{transform:translate(calc(var(--ui-switch-width) - var(--ui-switch-thumb-size) - (var(--ui-switch-thumb-offset) * 2)));color:var(--ui-primary-color)}.label{font-size:.9375rem;font-weight:500;color:var(--ui-text-color)}.label.disabled{cursor:not-allowed;opacity:.5}.switch.disabled{opacity:.5;cursor:not-allowed}.switch:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}.icon-wrapper{font-size:14px;display:flex;align-items:center;justify-content:center}';
var ra = Object.defineProperty, oa = Object.getOwnPropertyDescriptor, Je = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? oa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ra(t, i, r), r;
};
let Ko = 0, ve = class extends c {
  constructor() {
    super(), this.checked = !1, this.disabled = !1, this.required = !1, this.size = "md", this.label = "", this.name = "", this.value = "on", this.defaultChecked = !1, this.ariaLabel = null, this._internals = null, this._firstUpdate = !0, Ko++, this._labelId = `ui-switch-label-${Ko}`, typeof this.attachInternals == "function" && (this._internals = this.attachInternals());
  }
  willUpdate(e) {
    super.willUpdate(e), this._firstUpdate && (this._firstUpdate = !1, this.defaultChecked && (this.checked = !0));
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("value")) && this._internals?.setFormValue?.(this.checked ? this.value : null), (e.has("checked") || e.has("required")) && (this.required && !this.checked ? this._internals?.setValidity?.({ valueMissing: !0 }, "Please check this switch.") : this._internals?.setValidity?.({}));
  }
  _handleClick() {
    this.disabled || (this.checked = !this.checked, this.dispatchEvent(new CustomEvent("ui-switch-change", {
      detail: { checked: this.checked },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    const e = !!this.label;
    return l`
      <div class="wrapper" @click=${this._handleClick}>
        <div
          class=${f({ switch: !0, checked: this.checked, disabled: this.disabled })}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-required=${this.required ? "true" : "false"}
          aria-label=${this.ariaLabel ?? v}
          aria-labelledby=${e ? this._labelId : v}
          .tabIndex=${this.disabled ? -1 : 0}
          @keydown=${(t) => (t.key === " " || t.key === "Enter") && this._handleClick()}
        >
          <div class="thumb">
            <div class="icon-wrapper">
              ${this.checked ? l`<slot name="icon-on"></slot>` : l`<slot name="icon-off"></slot>`}
            </div>
          </div>
        </div>
        ${e ? l`<span id=${this._labelId} class=${f({ label: !0, disabled: this.disabled })}>${this.label}</span>` : l`<slot></slot>`}
      </div>
    `;
  }
};
ve.formAssociated = !0;
ve.styles = h(ia);
Je([
  s({ type: Boolean, reflect: !0 })
], ve.prototype, "checked", 2);
Je([
  s({ type: Boolean, reflect: !0 })
], ve.prototype, "disabled", 2);
Je([
  s({ type: Boolean, reflect: !0 })
], ve.prototype, "required", 2);
Je([
  s({ type: String, reflect: !0 })
], ve.prototype, "size", 2);
Je([
  s({ type: String })
], ve.prototype, "label", 2);
Je([
  s({ type: String })
], ve.prototype, "name", 2);
Je([
  s({ type: String })
], ve.prototype, "value", 2);
Je([
  s({ type: Boolean, attribute: "default-checked" })
], ve.prototype, "defaultChecked", 2);
Je([
  s({ type: String, attribute: "aria-label" })
], ve.prototype, "ariaLabel", 2);
ve = Je([
  d("ui-switch")
], ve);
const sa = ':host{display:block;font-family:var(--ui-font-family)}.textarea-wrapper{display:flex;flex-direction:column;gap:6px}label{font-size:14px;font-weight:500;color:var(--ui-label-color)}textarea{font-family:inherit;width:100%;box-sizing:border-box;padding:10px 14px;font-size:14px;line-height:1.5;border-radius:var(--ui-input-border-radius);border:1px solid var(--ui-input-border-color);background-color:var(--ui-input-bg);color:var(--ui-text-color);transition:border-color .2s,box-shadow .2s;outline:none;resize:vertical;min-height:var(--ui-textarea-min-height, 80px)}:host([resize="none"]) textarea{resize:none}:host([resize="both"]) textarea{resize:both}:host([resize="horizontal"]) textarea{resize:horizontal}:host([resize="vertical"]) textarea{resize:vertical}:host([resize="auto"]) textarea{resize:none;overflow:hidden}:host([size="sm"]) textarea{padding:6px 10px;font-size:13px}:host([size="lg"]) textarea{padding:12px 16px;font-size:16px}textarea::placeholder{color:var(--ui-input-placeholder-color)}textarea:hover:not(:disabled):not(.error-textarea){border-color:var(--ui-input-border-hover-color)}textarea:focus-visible{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}textarea[aria-invalid=true]{border-color:var(--ui-error-color)}textarea[aria-invalid=true]:focus-visible{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}textarea:disabled{background-color:var(--ui-input-disabled-bg);color:var(--ui-input-disabled-color);cursor:not-allowed;opacity:1}textarea[readonly]{background-color:var(--ui-input-readonly-bg);cursor:default}.help-text{font-size:12px;color:var(--ui-help-text-color);margin:0}.error-text{color:var(--ui-error-color)}';
var aa = Object.defineProperty, na = Object.getOwnPropertyDescriptor, L = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? na(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && aa(t, i, r), r;
};
let Wr = 0, I = class extends c {
  constructor() {
    super(), this.value = "", this.placeholder = "", this.disabled = !1, this.readonly = !1, this.required = !1, this.error = !1, this.errorMessage = "", this.helpText = "", this.label = "", this.size = "default", this.rows = 3, this.maxlength = void 0, this.minlength = void 0, this.name = "", this.autocomplete = "", this.resize = "vertical", this.defaultValue = "", this.ariaLabel = null, this._internals = null, this._firstUpdate = !0, Wr++, this._textareaId = `ui-textarea-${Wr}`, this._descId = `ui-textarea-desc-${Wr}`, typeof this.attachInternals == "function" && (this._internals = this.attachInternals());
  }
  /** Direct access to the internal <textarea> element. */
  get textareaElement() {
    return this.shadowRoot?.querySelector("textarea") ?? null;
  }
  willUpdate(e) {
    super.willUpdate(e), this._firstUpdate && (this._firstUpdate = !1, this.defaultValue && !this.value && (this.value = this.defaultValue));
  }
  updated(e) {
    super.updated(e), e.has("value") && (this._internals?.setFormValue?.(this.value), this.resize === "auto" && this._autoResize()), (e.has("required") || e.has("value")) && (this.required && !this.value ? this._internals?.setValidity?.({ valueMissing: !0 }, "Please fill in this field.") : this._internals?.setValidity?.({}));
  }
  _autoResize() {
    const e = this.textareaElement;
    e && (e.style.height = "auto", e.style.height = `${e.scrollHeight}px`);
  }
  _handleInput(e) {
    this.value = e.target.value, this.dispatchEvent(new CustomEvent("ui-textarea-input", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleChange(e) {
    this.value = e.target.value, this.dispatchEvent(new CustomEvent("ui-textarea-change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this.error || !!this.errorMessage, t = e && !!this.errorMessage || !!this.helpText;
    return l`
      <div class="textarea-wrapper" part="wrapper">
        ${this.label ? l`
          <label for=${this._textareaId} part="label">${this.label}</label>
        ` : v}

        <textarea
          id=${this._textareaId}
          part="textarea"
          class=${f({ "error-textarea": e })}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          rows=${this.rows}
          maxlength=${re(this.maxlength)}
          minlength=${re(this.minlength)}
          name=${this.name}
          autocomplete=${this.autocomplete || v}
          aria-invalid=${e ? "true" : "false"}
          aria-describedby=${t ? this._descId : v}
          aria-label=${this.ariaLabel ?? v}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>

        ${e && this.errorMessage ? l`<p id=${this._descId} class="help-text error-text" part="error-text" role="alert">${this.errorMessage}</p>` : this.helpText ? l`<p id=${this._descId} class="help-text" part="help-text">${this.helpText}</p>` : v}
      </div>
    `;
  }
};
I.formAssociated = !0;
I.styles = h(sa);
L([
  s({ type: String })
], I.prototype, "value", 2);
L([
  s({ type: String })
], I.prototype, "placeholder", 2);
L([
  s({ type: Boolean, reflect: !0 })
], I.prototype, "disabled", 2);
L([
  s({ type: Boolean, reflect: !0 })
], I.prototype, "readonly", 2);
L([
  s({ type: Boolean, reflect: !0 })
], I.prototype, "required", 2);
L([
  s({ type: Boolean })
], I.prototype, "error", 2);
L([
  s({ type: String, attribute: "error-message" })
], I.prototype, "errorMessage", 2);
L([
  s({ type: String, attribute: "help-text" })
], I.prototype, "helpText", 2);
L([
  s({ type: String })
], I.prototype, "label", 2);
L([
  s({ type: String, reflect: !0 })
], I.prototype, "size", 2);
L([
  s({ type: Number })
], I.prototype, "rows", 2);
L([
  s({ type: Number })
], I.prototype, "maxlength", 2);
L([
  s({ type: Number })
], I.prototype, "minlength", 2);
L([
  s({ type: String })
], I.prototype, "name", 2);
L([
  s({ type: String })
], I.prototype, "autocomplete", 2);
L([
  s({ type: String, reflect: !0 })
], I.prototype, "resize", 2);
L([
  s({ type: String, attribute: "default-value" })
], I.prototype, "defaultValue", 2);
L([
  s({ type: String, attribute: "aria-label" })
], I.prototype, "ariaLabel", 2);
I = L([
  d("ui-textarea")
], I);
const la = ":host{display:block;--ui-transfer-list-height: 300px;--ui-transfer-list-width: 200px;font-family:var(--ui-font-family);color:var(--ui-text-color)}.container{display:flex;align-items:center;gap:16px}.list-wrapper{display:flex;flex-direction:column;gap:8px}.list-title{font-size:.875rem;font-weight:600;color:var(--ui-text-color-muted);margin-bottom:4px}.list-box{width:var(--ui-transfer-list-width);height:var(--ui-transfer-list-height);background:var(--ui-surface-1);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-lg);overflow-y:auto;display:flex;flex-direction:column;box-shadow:var(--ui-shadow-sm)}.list-item{display:flex;align-items:center;padding:10px 12px;cursor:pointer;transition:background-color .2s;gap:10px;-webkit-user-select:none;user-select:none}.list-item:hover{background-color:var(--ui-hover-color)}.list-item.selected{background-color:var(--ui-primary-color-light)}.checkbox{width:18px;height:18px;border:2px solid var(--ui-border-color);border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}.list-item.selected .checkbox{background-color:var(--ui-primary-color);border-color:var(--ui-primary-color)}.check-icon{color:var(--ui-text-color-on-primary);opacity:0;transform:scale(.5);transition:all .2s}.list-item.selected .check-icon{opacity:1;transform:scale(1)}.item-label{font-size:.9375rem}.actions{display:flex;flex-direction:column;gap:12px}.action-button{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--ui-border-color);background:var(--ui-surface-1);border-radius:8px;cursor:pointer;color:var(--ui-text-color);transition:all .2s}.action-button:hover:not(:disabled){border-color:var(--ui-primary-color);color:var(--ui-primary-color);box-shadow:var(--ui-shadow-md);transform:translateY(-1px)}.action-button:active:not(:disabled){transform:translateY(0)}.action-button:disabled{opacity:.4;cursor:not-allowed;background-color:var(--ui-surface-2)}.list-box::-webkit-scrollbar{width:6px}.list-box::-webkit-scrollbar-track{background:transparent}.list-box::-webkit-scrollbar-thumb{background:var(--ui-border-color);border-radius:3px}";
var ca = Object.defineProperty, da = Object.getOwnPropertyDescriptor, Jt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? da(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ca(t, i, r), r;
};
let tt = class extends c {
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
    const e = this.options.filter((i) => !this.value.includes(i.value)), t = this.options.filter((i) => this.value.includes(i.value));
    return l`
      <div class="container">
        <!-- Left List -->
        <div class="list-wrapper">
          <div class="list-title">${this.leftTitle}</div>
          <div class="list-box">
            ${Lt(e, (i) => i.value, (i) => l`
              <div 
                class="list-item ${f({ selected: this.leftChecked.includes(i.value) })}"
                @click=${() => this._toggleChecked(i.value, "left")}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${i.label}</span>
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
            ${Lt(t, (i) => i.value, (i) => l`
              <div 
                class="list-item ${f({ selected: this.rightChecked.includes(i.value) })}"
                @click=${() => this._toggleChecked(i.value, "right")}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${i.label}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
};
tt.styles = h(la);
Jt([
  s({ type: Array })
], tt.prototype, "options", 2);
Jt([
  s({ type: Array })
], tt.prototype, "value", 2);
Jt([
  s({ type: String })
], tt.prototype, "leftTitle", 2);
Jt([
  s({ type: String })
], tt.prototype, "rightTitle", 2);
Jt([
  b()
], tt.prototype, "leftChecked", 2);
Jt([
  b()
], tt.prototype, "rightChecked", 2);
tt = Jt([
  d("ui-transfer-list")
], tt);
const ha = ":host{display:inline-flex;position:relative;vertical-align:middle;flex-shrink:0}.badge{display:flex;flex-wrap:wrap;place-content:center;align-items:center;position:absolute;box-sizing:border-box;font-family:var(--ui-font-family);font-weight:600;font-size:.75rem;min-width:20px;line-height:1;padding:0 6px;height:20px;border-radius:10px;z-index:1;transition:transform .2s cubic-bezier(.4,0,.2,1);background-color:var(--ui-badge-background, var(--ui-primary-color));color:var(--ui-badge-color, var(--ui-text-color-on-primary));top:0;right:0;transform:scale(1) translate(50%,-50%);transform-origin:100% 0%;border:2px solid var(--ui-surface-1)}.badge.hidden{transform:scale(0) translate(50%,-50%)}.badge.dot{min-width:8px;height:8px;padding:0;border-radius:4px}.primary{background-color:var(--ui-primary-color)}.secondary{background-color:var(--ui-secondary-color)}.error{background-color:var(--ui-error-color);color:var(--ui-text-color-on-primary)}.success{background-color:var(--ui-success-color);color:var(--ui-text-color-on-primary)}.warning{background-color:var(--ui-warning-color);color:var(--ui-text-color-on-primary)}";
var pa = Object.defineProperty, ua = Object.getOwnPropertyDescriptor, Ai = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ua(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && pa(t, i, r), r;
};
let wt = class extends c {
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
        class="badge ${f({
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
wt.styles = h(ha);
Ai([
  s({ type: String })
], wt.prototype, "content", 2);
Ai([
  s({ type: Boolean })
], wt.prototype, "dot", 2);
Ai([
  s({ type: Boolean })
], wt.prototype, "invisible", 2);
Ai([
  s({ type: String })
], wt.prototype, "variant", 2);
Ai([
  s({ type: Number })
], wt.prototype, "max", 2);
wt = Ai([
  d("ui-badge")
], wt);
const fa = ":host{display:block;width:100%;font-family:var(--ui-font-family);margin-bottom:1rem}.alert{display:flex;align-items:flex-start;padding:12px 16px;border-radius:var(--ui-border-radius-md);gap:12px;border:1px solid transparent;position:relative;box-sizing:border-box;animation:fadeIn .3s ease-out}@keyframes fadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.info{background-color:var(--ui-info-bg);border-color:var(--ui-info-border-color);color:var(--ui-info-text-color)}.info .icon{color:var(--ui-info-icon-color)}.success{background-color:var(--ui-success-bg);border-color:var(--ui-success-border-color);color:var(--ui-success-text-color)}.success .icon{color:var(--ui-success-icon-color)}.warning{background-color:var(--ui-warning-bg);border-color:var(--ui-warning-border-color);color:var(--ui-warning-text-color)}.warning .icon{color:var(--ui-warning-icon-color)}.error{background-color:var(--ui-error-bg);border-color:var(--ui-error-border-color);color:var(--ui-error-text-color)}.error .icon{color:var(--ui-error-icon-color)}.icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:20px;height:20px;margin-top:2px}.content{flex-grow:1}.title{font-weight:600;font-size:.875rem;margin-bottom:2px}.message{font-size:.875rem;line-height:1.5}.close-button{flex-shrink:0;cursor:pointer;padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center;width:28px;height:28px;margin-top:-6px;margin-right:-10px;color:currentColor;opacity:.6;transition:all .2s ease;border:none;background:transparent}.close-button:hover{opacity:1;background-color:var(--ui-active-color)}.close-button:active{transform:scale(.92)}.icon svg,.close-button svg{width:100%;height:100%}";
var va = Object.defineProperty, ba = Object.getOwnPropertyDescriptor, Ur = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ba(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && va(t, i, r), r;
};
let pi = class extends c {
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
            <div class="alert ${f({ [this.severity]: !0 })}" role="alert">
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
pi.styles = h(fa);
Ur([
  s({ type: String })
], pi.prototype, "severity", 2);
Ur([
  s({ type: String })
], pi.prototype, "title", 2);
Ur([
  s({ type: Boolean })
], pi.prototype, "dismissible", 2);
pi = Ur([
  d("ui-alert")
], pi);
const ga = ':host{display:block}.skeleton{display:block;background-color:var(--ui-skeleton-bg, var(--ui-surface-3));position:relative;overflow:hidden}@media(prefers-color-scheme:dark){.skeleton{background-color:var(--ui-skeleton-bg-dark, rgba(255, 255, 255, .13))}}:host([dark]) .skeleton{background-color:var(--ui-skeleton-bg-dark, rgba(255, 255, 255, .13))}.skeleton.pulse{animation:pulse var(--ui-skeleton-animation-duration, 1.5s) ease-in-out .5s infinite}.skeleton.wave:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,var(--ui-skeleton-wave-color, rgba(255, 255, 255, .4)),transparent);animation:wave var(--ui-skeleton-animation-duration, 1.6s) linear infinite;transform:translate(-100%)}@keyframes pulse{0%{opacity:1}50%{opacity:.4}to{opacity:1}}@keyframes wave{0%{transform:translate(-100%)}to{transform:translate(100%)}}.text{border-radius:var(--ui-border-radius-sm)}.circular{border-radius:50%}.rectangular{border-radius:var(--ui-border-radius-md)}.rounded{border-radius:var(--ui-border-radius-lg)}@media(prefers-reduced-motion:reduce){.skeleton.pulse{animation:none}.skeleton.wave:after{display:none}}';
var ma = Object.defineProperty, ya = Object.getOwnPropertyDescriptor, Qt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ya(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ma(t, i, r), r;
};
let it = class extends c {
  constructor() {
    super(...arguments), this.dark = !1, this.animation = "pulse", this.variant = "text", this.width = "", this.height = "", this.label = "Loading...";
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "status"), this._syncLabel();
  }
  updated(e) {
    e.has("label") && this._syncLabel();
  }
  _syncLabel() {
    this.label ? this.setAttribute("aria-label", this.label) : this.removeAttribute("aria-label");
  }
  render() {
    const e = this.variant === "text", t = this.animation !== "none" ? this.animation : "", i = {
      width: this.width || (e ? "100%" : ""),
      height: this.height || (e ? "0.8em" : ""),
      marginTop: e ? "0.3em" : "",
      marginBottom: e ? "0.3em" : ""
    };
    return l`
            <span
                part="skeleton"
                class="skeleton ${t} ${this.variant}"
                style=${Ti(i)}
                aria-hidden="true"
            ></span>
        `;
  }
};
it.styles = h(ga);
Qt([
  s({ type: Boolean, reflect: !0 })
], it.prototype, "dark", 2);
Qt([
  s({ type: String, reflect: !0 })
], it.prototype, "animation", 2);
Qt([
  s({ type: String, reflect: !0 })
], it.prototype, "variant", 2);
Qt([
  s({ type: String })
], it.prototype, "width", 2);
Qt([
  s({ type: String })
], it.prototype, "height", 2);
Qt([
  s({ type: String })
], it.prototype, "label", 2);
it = Qt([
  d("ui-skeleton")
], it);
const xa = ':host{display:flex;align-items:center;justify-content:center;pointer-events:none;position:fixed;z-index:var(--ui-snackbar-z-index, 1400);transition:all .3s cubic-bezier(.4,0,.2,1)}:host([anchor-origin*="bottom"]){bottom:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="top"]){top:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="left"]){left:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="right"]){right:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="center"]){left:50%;transform:translate(-50%)}.snackbar{background-color:var(--ui-snackbar-bg, #313131);color:var(--ui-snackbar-color, #ffffff);font-family:var(--ui-font-family);font-size:.875rem;line-height:1.43;letter-spacing:.01071em;display:flex;align-items:center;padding:6px 16px;border-radius:var(--ui-border-radius-md);box-shadow:var(--ui-shadow-lg);min-width:var(--ui-snackbar-min-width, 288px);max-width:var(--ui-snackbar-max-width, 560px);pointer-events:auto;opacity:0;transform:scale(.85);transition:opacity 225ms cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1);visibility:hidden}.snackbar.open{opacity:1;transform:scale(1);visibility:visible}:host([variant="info"]) .snackbar{background-color:var(--ui-snackbar-bg-info, #0288d1)}:host([variant="success"]) .snackbar{background-color:var(--ui-snackbar-bg-success, #2e7d32)}:host([variant="warning"]) .snackbar{background-color:var(--ui-snackbar-bg-warning, #ed6c02)}:host([variant="error"]) .snackbar{background-color:var(--ui-snackbar-bg-error, #d32f2f)}.message{padding:8px 0;flex-grow:1}.action{display:flex;align-items:center;margin-left:8px;margin-right:-8px;padding-left:16px}.action.hidden{display:none}.close-btn{background:none;border:none;color:inherit;cursor:pointer;padding:4px 8px;margin-left:8px;margin-right:-8px;opacity:.8;display:flex;align-items:center;border-radius:2px;line-height:0}.close-btn:hover{opacity:1}::slotted(ui-alert){margin-bottom:0!important;width:100%;min-width:288px}';
var _a = Object.defineProperty, wa = Object.getOwnPropertyDescriptor, ut = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _a(t, i, r), r;
};
let Oe = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.message = "", this.autoHideDuration = 5e3, this.anchorOrigin = "bottom-center", this.pauseOnHover = !0, this.closable = !1, this.variant = "default", this._hasAction = !1, this._timer = null, this._remainingTime = 0, this._timerStartedAt = 0;
  }
  updated(e) {
    e.has("open") && (this.open ? (this._remainingTime = this.autoHideDuration, this._startTimer(this._remainingTime), this.dispatchEvent(new CustomEvent("ui-snackbar-open", { bubbles: !0, composed: !0 }))) : (this._clearTimer(), this.dispatchEvent(new CustomEvent("ui-snackbar-close", { bubbles: !0, composed: !0 }))));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearTimer();
  }
  _startTimer(e) {
    this._clearTimer(), e > 0 && (this._timerStartedAt = Date.now(), this._timer = setTimeout(() => this.close(), e));
  }
  _clearTimer() {
    this._timer && (clearTimeout(this._timer), this._timer = null);
  }
  _handleMouseEnter() {
    if (!this.pauseOnHover || !this.open || this._timer === null) return;
    const e = Date.now() - this._timerStartedAt;
    this._remainingTime = Math.max(0, this._remainingTime - e), this._clearTimer();
  }
  _handleMouseLeave() {
    !this.pauseOnHover || !this.open || this._startTimer(this._remainingTime);
  }
  _handleActionSlotChange(e) {
    const t = e.target;
    this._hasAction = t.assignedNodes({ flatten: !0 }).length > 0;
  }
  /** Closes the snackbar. */
  close() {
    this.open = !1;
  }
  render() {
    const e = { snackbar: !0, open: this.open }, t = { action: !0, hidden: !this._hasAction };
    return l`
            <div
                class=${f(e)}
                part="snackbar"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
            >
                <div class="message">
                    <slot>${this.message}</slot>
                </div>
                <div class=${f(t)}>
                    <slot name="action" @slotchange=${this._handleActionSlotChange}></slot>
                </div>
                ${this.closable ? l`
                    <button class="close-btn" aria-label="Close" @click=${() => this.close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                ` : ""}
            </div>
        `;
  }
};
Oe.styles = h(xa);
ut([
  s({ type: Boolean, reflect: !0 })
], Oe.prototype, "open", 2);
ut([
  s({ type: String })
], Oe.prototype, "message", 2);
ut([
  s({ type: Number, attribute: "auto-hide-duration" })
], Oe.prototype, "autoHideDuration", 2);
ut([
  s({ type: String, attribute: "anchor-origin", reflect: !0 })
], Oe.prototype, "anchorOrigin", 2);
ut([
  s({ type: Boolean, attribute: "pause-on-hover" })
], Oe.prototype, "pauseOnHover", 2);
ut([
  s({ type: Boolean, reflect: !0 })
], Oe.prototype, "closable", 2);
ut([
  s({ type: String, reflect: !0 })
], Oe.prototype, "variant", 2);
ut([
  b()
], Oe.prototype, "_hasAction", 2);
Oe = ut([
  d("ui-snackbar")
], Oe);
const ka = ':host{display:block;--ui-divider-color: var(--ui-border-color);--ui-divider-margin: 16px;--ui-divider-thickness: 1px}.divider-container{display:flex;align-items:center;width:100%;box-sizing:border-box;margin:var(--ui-divider-margin) 0}.divider-line{flex-grow:1;height:var(--ui-divider-thickness);background-color:var(--ui-divider-color);border:none}.divider-content{padding:0 16px;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);white-space:nowrap}:host([orientation="vertical"]){display:flex;align-self:stretch;margin:0;width:auto;min-width:var(--ui-divider-thickness)}:host([orientation="vertical"]) .divider-container{flex-direction:column;height:100%;width:auto;min-width:var(--ui-divider-thickness);margin:0}:host([orientation="vertical"]) .divider-line{width:var(--ui-divider-thickness);height:auto;flex:1;min-height:24px}.variant-middle{margin-left:32px;margin-right:32px;width:auto}.variant-inset{margin-left:72px}.weight-light{--ui-divider-thickness: 1px}.weight-medium{--ui-divider-thickness: 2px}.weight-heavy{--ui-divider-thickness: 4px}';
var $a = Object.defineProperty, Sa = Object.getOwnPropertyDescriptor, lr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Sa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && $a(t, i, r), r;
};
let Rt = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.variant = "full", this.weight = "light", this.textAlign = "center";
  }
  render() {
    return l`
      <div 
        class="divider-container ${f({
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
Rt.styles = h(ka);
lr([
  s({ type: String, reflect: !0 })
], Rt.prototype, "orientation", 2);
lr([
  s({ type: String })
], Rt.prototype, "variant", 2);
lr([
  s({ type: String })
], Rt.prototype, "weight", 2);
lr([
  s({ type: String })
], Rt.prototype, "textAlign", 2);
Rt = lr([
  d("ui-divider")
], Rt);
const Ca = ':host{display:block;padding:12px 0;font-family:var(--ui-font-family);color:var(--ui-text-color);--_track-height: 6px;--_thumb-size: 20px;--_font-size: 14px}:host([size="sm"]){--_track-height: 4px;--_thumb-size: 14px;--_font-size: 12px}:host([size="lg"]){--_track-height: 8px;--_thumb-size: 24px;--_font-size: 16px}:host([vertical]){padding:0 12px;display:inline-flex;height:var(--ui-slider-vertical-height, 200px)}.slider-wrapper{display:flex;flex-direction:column;gap:8px}.slider-wrapper.vertical{flex-direction:column-reverse;align-items:center;gap:12px;width:100%;height:100%;justify-content:flex-end}.label-row{display:flex;justify-content:space-between;align-items:center;font-size:var(--_font-size);font-weight:500}.label-row.vertical{flex-direction:column;align-items:center;gap:2px;flex-shrink:0}.value-display{font-weight:600;color:var(--ui-primary-color)}.track-container{flex:1;display:flex;align-items:center;justify-content:center;width:100%}.track-container.vertical{flex:1;min-height:0;width:auto;height:100%;display:flex;align-items:center;justify-content:center}input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:var(--_track-height);background:var(--ui-input-border-color);border-radius:3px;outline:none;margin:10px 0;cursor:pointer;transition:all .2s ease}input[type=range].vertical{writing-mode:vertical-lr;direction:rtl;width:var(--_track-height);height:100%;margin:0;appearance:slider-vertical;-webkit-appearance:slider-vertical}@supports not (appearance: slider-vertical){input[type=range].vertical{writing-mode:vertical-lr;direction:rtl;width:var(--_track-height);height:100%;margin:0}}input[type=range]:disabled{cursor:not-allowed;opacity:.5}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:var(--_thumb-size);height:var(--_thumb-size);border-radius:50%;background:var(--ui-surface-1);border:2px solid var(--ui-primary-color);box-shadow:var(--ui-shadow-sm);cursor:pointer;transition:transform .1s ease,box-shadow .1s ease}input[type=range]::-moz-range-thumb{width:calc(var(--_thumb-size) - 2px);height:calc(var(--_thumb-size) - 2px);border-radius:50%;background:var(--ui-surface-1);border:2px solid var(--ui-primary-color);box-shadow:var(--ui-shadow-sm);cursor:pointer}input[type=range]::-moz-range-progress{background:var(--ui-primary-color);height:var(--_track-height);border-radius:3px}input[type=range]:focus-visible::-webkit-slider-thumb{outline:2px solid var(--ui-primary-color);outline-offset:4px}input[type=range]:not(:disabled):hover::-webkit-slider-thumb{transform:scale(1.1);box-shadow:var(--ui-shadow-md)}input[type=range]:active::-webkit-slider-thumb{transform:scale(.95)}.disabled-label{color:var(--ui-text-color-muted)}';
var Ia = Object.defineProperty, Pa = Object.getOwnPropertyDescriptor, xe = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Pa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ia(t, i, r), r;
};
let Z = class extends c {
  constructor() {
    super(), this._internals = null, this.value = 50, this.defaultValue = void 0, this.min = 0, this.max = 100, this.step = 1, this.disabled = !1, this.label = "", this.showValue = !1, this.vertical = !1, this.size = "md", this.name = "", this.formatValue = void 0, this._firstUpdate = !0, typeof this.attachInternals == "function" && (this._internals = this.attachInternals());
  }
  // ── Safe value getters ────────────────────────────────────────────────────
  get _safeMin() {
    return this.min < this.max ? this.min : 0;
  }
  get _safeMax() {
    return this.max > this.min ? this.max : this._safeMin + 100;
  }
  get _safeValue() {
    return Math.min(this._safeMax, Math.max(this._safeMin, this.value));
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  willUpdate(e) {
    this._firstUpdate && this.defaultValue !== void 0 && (this.value = this.defaultValue), this._firstUpdate = !1, (e.has("value") || e.has("name")) && typeof this._internals?.setFormValue == "function" && this._internals.setFormValue(this._safeValue.toString());
  }
  // ── Event handler ─────────────────────────────────────────────────────────
  _handleInput(e) {
    const t = e.target;
    this.value = Number(t.value), this.dispatchEvent(new CustomEvent("ui-slider-change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  // ── Render ────────────────────────────────────────────────────────────────
  render() {
    const e = this._safeValue, t = this._safeMin, i = this._safeMax, o = (e - t) / (i - t) * 100, r = this.formatValue ? this.formatValue(e) : String(e), a = this.vertical ? {
      background: `linear-gradient(to left, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${o}%, var(--ui-input-border-color, #d1d5db) ${o}%, var(--ui-input-border-color, #d1d5db) 100%)`
    } : {
      background: `linear-gradient(to right, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${o}%, var(--ui-input-border-color, #d1d5db) ${o}%, var(--ui-input-border-color, #d1d5db) 100%)`
    }, n = { "slider-wrapper": !0, vertical: this.vertical }, p = { "label-row": !0, vertical: this.vertical }, u = { "track-container": !0, vertical: this.vertical }, y = { vertical: this.vertical }, g = "slider-input";
    return l`
      <div class=${f(n)}>
        <div class=${f(p)}>
          ${this.label ? l`<label
                for=${g}
                class=${f({ "disabled-label": this.disabled })}
              >${this.label}</label>` : ""}
          ${this.showValue ? l`<span class="value-display">${r}</span>` : ""}
        </div>
        <div class=${f(u)}>
          <input
            id=${g}
            type="range"
            class=${f(y)}
            .min=${t.toString()}
            .max=${i.toString()}
            .step=${this.step.toString()}
            .value=${e.toString()}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            style=${Ti(a)}
            aria-label=${this.label || "Slider"}
            aria-orientation=${this.vertical ? "vertical" : "horizontal"}
            aria-valuetext=${this.formatValue ? r : ""}
          >
        </div>
      </div>
    `;
  }
};
Z.formAssociated = !0;
Z.styles = h(Ca);
xe([
  s({ type: Number })
], Z.prototype, "value", 2);
xe([
  s({ type: Number, attribute: "default-value" })
], Z.prototype, "defaultValue", 2);
xe([
  s({ type: Number })
], Z.prototype, "min", 2);
xe([
  s({ type: Number })
], Z.prototype, "max", 2);
xe([
  s({ type: Number })
], Z.prototype, "step", 2);
xe([
  s({ type: Boolean, reflect: !0 })
], Z.prototype, "disabled", 2);
xe([
  s({ type: String })
], Z.prototype, "label", 2);
xe([
  s({ type: Boolean, attribute: "show-value" })
], Z.prototype, "showValue", 2);
xe([
  s({ type: Boolean, reflect: !0 })
], Z.prototype, "vertical", 2);
xe([
  s({ type: String, reflect: !0 })
], Z.prototype, "size", 2);
xe([
  s({ type: String })
], Z.prototype, "name", 2);
xe([
  s({ attribute: !1 })
], Z.prototype, "formatValue", 2);
Z = xe([
  d("ui-slider")
], Z);
const za = ":host{display:block;font-family:var(--ui-font-family);margin-bottom:1rem}.field-container{display:flex;flex-direction:column;gap:.5rem}.label{font-size:.875rem;font-weight:500;color:var(--ui-label-color);transition:color .2s}.input-wrapper{position:relative;display:flex;align-items:center;background-color:var(--ui-input-bg);border:1px solid var(--ui-input-border-color);border-radius:var(--ui-input-border-radius);transition:all .2s ease;overflow:hidden}.input-wrapper:hover:not(.disabled):not(.error){border-color:var(--ui-input-border-hover-color)}.input-wrapper.focused:not(.error){border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}.input-wrapper.error{border-color:var(--ui-error-color)}.input-wrapper.error.focused{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}.input-wrapper.disabled{background-color:var(--ui-input-disabled-bg);cursor:not-allowed;opacity:.7}input{flex:1;width:100%;padding:.625rem .875rem;font-size:1rem;font-family:inherit;color:inherit;background:transparent;border:none;outline:none}input:disabled{cursor:not-allowed}input::placeholder{color:var(--ui-input-placeholder-color)}.icon-leading,.icon-trailing{display:flex;align-items:center;justify-content:center;color:var(--ui-text-color-muted);padding:0 .75rem}.icon-leading{padding-right:0}.icon-trailing{padding-left:0}.helper-text{font-size:.75rem;color:var(--ui-help-text-color)}.error-text{color:var(--ui-error-color)}.filled .input-wrapper{background-color:var(--ui-surface-2);border-bottom:2px solid var(--ui-input-border-color);border-top:none;border-left:none;border-right:none;border-radius:4px 4px 0 0}.filled .input-wrapper.focused{border-bottom-color:var(--ui-primary-color);background-color:var(--ui-hover-color)}";
var Da = Object.defineProperty, Ea = Object.getOwnPropertyDescriptor, Ue = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ea(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Da(t, i, r), r;
};
let be = class extends c {
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
      <div class=${f({ "field-container": !0, filled: this.variant === "filled" })}>
        ${this.label ? l`<label class="label">${this.label}</label>` : ""}
        
        <div class=${f({
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
be.styles = h(za);
Ue([
  s({ type: String })
], be.prototype, "label", 2);
Ue([
  s({ type: String })
], be.prototype, "value", 2);
Ue([
  s({ type: String })
], be.prototype, "placeholder", 2);
Ue([
  s({ type: String })
], be.prototype, "type", 2);
Ue([
  s({ type: String })
], be.prototype, "variant", 2);
Ue([
  s({ type: Boolean })
], be.prototype, "disabled", 2);
Ue([
  s({ type: Boolean })
], be.prototype, "error", 2);
Ue([
  s({ type: String })
], be.prototype, "helperText", 2);
Ue([
  s({ type: String })
], be.prototype, "errorMessage", 2);
Ue([
  b()
], be.prototype, "_focused", 2);
be = Ue([
  d("ui-text-field")
], be);
const Oa = ":host{display:inline-block}button{font-family:var(--ui-font-family);font-weight:500;font-size:14px;padding:8px 16px;border:1px solid var(--ui-input-border-color);background-color:var(--ui-surface-1);color:var(--ui-text-color);cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center;gap:8px;outline:none}button:hover:not(:disabled){background-color:var(--ui-hover-color)}button.selected{background-color:var(--ui-active-color);color:var(--ui-primary-color);border-color:var(--ui-primary-color);z-index:1}button:disabled{opacity:.5;cursor:not-allowed}button:focus-visible{box-shadow:0 0 0 2px var(--ui-primary-color);z-index:2}:host([data-first]) button{border-top-left-radius:var(--ui-border-radius-md);border-bottom-left-radius:var(--ui-border-radius-md)}:host([data-last]) button{border-top-right-radius:var(--ui-border-radius-md);border-bottom-right-radius:var(--ui-border-radius-md)}:host(:not([data-first])) button{margin-left:-1px}";
var Ta = Object.defineProperty, Aa = Object.getOwnPropertyDescriptor, jr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Aa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ta(t, i, r), r;
};
let ui = class extends c {
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
        class=${f({ selected: this.selected })}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        aria-pressed=${this.selected}
      >
        <slot></slot>
      </button>
    `;
  }
};
ui.styles = h(Oa);
jr([
  s({ type: Boolean, reflect: !0 })
], ui.prototype, "selected", 2);
jr([
  s({ type: Boolean, reflect: !0 })
], ui.prototype, "disabled", 2);
jr([
  s({ type: String })
], ui.prototype, "value", 2);
ui = jr([
  d("ui-toggle-button")
], ui);
const Ba = ":host{display:inline-flex;vertical-align:middle}";
var Ma = Object.defineProperty, La = Object.getOwnPropertyDescriptor, Fo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? La(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ma(t, i, r), r;
};
let Fi = class extends c {
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
    const { value: t, selected: i } = e.detail;
    if (this.exclusive)
      this.value = i ? t : "";
    else {
      const o = Array.isArray(this.value) ? [...this.value] : this.value ? [this.value] : [];
      if (i)
        o.includes(t) || o.push(t);
      else {
        const r = o.indexOf(t);
        r > -1 && o.splice(r, 1);
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
    e.forEach((t, i) => {
      const o = t, r = this.exclusive ? this.value === o.value : Array.isArray(this.value) && this.value.includes(o.value);
      o.selected = r, i === 0 ? o.setAttribute("data-first", "") : o.removeAttribute("data-first"), i === e.length - 1 ? o.setAttribute("data-last", "") : o.removeAttribute("data-last");
    });
  }
  updated(e) {
    e.has("value") && this._updateChildren();
  }
  render() {
    return l`<slot @slotchange=${this._updateChildren}></slot>`;
  }
};
Fi.styles = h(Ba);
Fo([
  s({ type: String })
], Fi.prototype, "value", 2);
Fo([
  s({ type: Boolean })
], Fi.prototype, "exclusive", 2);
Fi = Fo([
  d("ui-toggle-button-group")
], Fi);
const Ua = ':host{display:inline-block;vertical-align:middle;line-height:1}.avatar{position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--ui-avatar-size, 40px);height:var(--ui-avatar-size, 40px);font-family:var(--ui-font-family);font-size:calc(var(--ui-avatar-size, 40px) / 2.5);font-weight:600;border-radius:50%;overflow:hidden;-webkit-user-select:none;user-select:none;background-color:var(--ui-avatar-bg, var(--ui-surface-3));color:var(--ui-avatar-color, var(--ui-text-color-muted));transition:all .2s ease}.avatar.square{border-radius:0}.avatar.rounded{border-radius:var(--ui-border-radius-md)}img{width:100%;height:100%;object-fit:cover;display:block}.initials{text-transform:uppercase}:host([size="small"]){--ui-avatar-size: 32px}:host([size="medium"]){--ui-avatar-size: 40px}:host([size="large"]){--ui-avatar-size: 56px}:host([size="xlarge"]){--ui-avatar-size: 80px}.avatar.loading{background:linear-gradient(90deg,var(--ui-surface-2) 25%,var(--ui-surface-3) 50%,var(--ui-surface-2) 75%);background-size:200% 100%;animation:loading 1.5s infinite}@keyframes loading{0%{background-position:200% 0}to{background-position:-200% 0}}';
var ja = Object.defineProperty, Ra = Object.getOwnPropertyDescriptor, Et = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ra(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ja(t, i, r), r;
};
let qe = class extends c {
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
      <div class=${f(e)} part="base">
        ${this.src && !this._hasError ? l`<img src=${this.src} alt=${this.alt} @error=${this._handleError} @load=${this._handleLoad} style=${this._isLoading ? "display:none" : v} part="image" />` : this.initials ? l`<span class="initials" part="initials">${this.initials.substring(0, 2)}</span>` : l`<slot><svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></slot>`}
      </div>
    `;
  }
};
qe.styles = h(Ua);
Et([
  s({ type: String })
], qe.prototype, "src", 2);
Et([
  s({ type: String })
], qe.prototype, "alt", 2);
Et([
  s({ type: String })
], qe.prototype, "initials", 2);
Et([
  s({ type: String })
], qe.prototype, "variant", 2);
Et([
  s({ type: String, reflect: !0 })
], qe.prototype, "size", 2);
Et([
  b()
], qe.prototype, "_hasError", 2);
Et([
  b()
], qe.prototype, "_isLoading", 2);
qe = Et([
  d("ui-avatar")
], qe);
const Na = ':host{display:inline-block;vertical-align:middle;font-family:var(--ui-font-family)}.chip{display:inline-flex;align-items:center;height:32px;padding:0 12px;border-radius:16px;font-size:14px;font-weight:500;white-space:nowrap;transition:all .2s ease;background-color:var(--ui-surface-2);color:var(--ui-text-color);border:1px solid transparent;-webkit-user-select:none;user-select:none;gap:8px;outline:none;overflow:hidden}.chip.clickable{cursor:pointer}.chip.clickable:hover:not(.disabled){background-color:var(--ui-hover-color)}.chip.clickable:active:not(.disabled){background-color:var(--ui-active-color)}.chip.outlined{background-color:transparent;border-color:var(--ui-input-border-color)}.chip.primary:not(.outlined){background-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.chip.secondary:not(.outlined){background-color:var(--ui-secondary-color);color:var(--ui-text-color-on-primary)}.chip.outlined.primary{color:var(--ui-primary-color);border-color:var(--ui-primary-color)}.chip.outlined.secondary{color:var(--ui-secondary-color);border-color:var(--ui-secondary-color)}.chip.primary.clickable:hover:not(.disabled){filter:brightness(.9);box-shadow:var(--ui-shadow-sm)}.chip.secondary.clickable:hover:not(.disabled){filter:brightness(.9);box-shadow:var(--ui-shadow-sm)}.chip.disabled{opacity:.5;cursor:not-allowed}.chip:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}.delete-icon{display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;margin-right:-4px;cursor:pointer;color:inherit;opacity:.7;transition:opacity .2s,background-color .2s;outline:none}.delete-icon:hover{opacity:1;background-color:var(--ui-active-color)}.delete-icon:focus-visible{opacity:1;outline:2px solid currentColor;outline-offset:1px}.chip.disabled .delete-icon{cursor:not-allowed;pointer-events:none}::slotted([slot="avatar"]){--ui-avatar-size: 24px;width:24px;height:24px;margin-left:-8px;border-radius:50%;overflow:hidden;flex-shrink:0}::slotted([slot="icon"]){display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;margin-left:-4px;flex-shrink:0;line-height:1}';
var Va = Object.defineProperty, Fa = Object.getOwnPropertyDescriptor, ei = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Fa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Va(t, i, r), r;
};
let rt = class extends c {
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
        class=${f(e)}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        role=${re(this.clickable ? "button" : void 0)}
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
rt.styles = h(Na);
ei([
  s({ type: String })
], rt.prototype, "label", 2);
ei([
  s({ type: String })
], rt.prototype, "variant", 2);
ei([
  s({ type: String })
], rt.prototype, "color", 2);
ei([
  s({ type: Boolean })
], rt.prototype, "clickable", 2);
ei([
  s({ type: Boolean })
], rt.prototype, "deletable", 2);
ei([
  s({ type: Boolean, reflect: !0 })
], rt.prototype, "disabled", 2);
rt = ei([
  d("ui-chip")
], rt);
const qa = ":host{display:block;padding:8px 0;margin:0;list-style:none;background-color:var(--ui-surface-background, white)}:host([disable-padding]){padding:0}:host([dense]){--ui-list-item-padding: 4px 16px;--ui-list-item-gap: 8px}", Ha = ":host{display:block;box-sizing:border-box}li{display:flex;align-items:center;padding:var(--ui-list-item-padding, 8px 16px);gap:var(--ui-list-item-gap, 16px);list-style:none}", Ya = ":host{display:block;box-sizing:border-box}li{display:flex;align-items:center;padding:var(--ui-list-item-padding, 8px 16px);gap:var(--ui-list-item-gap, 16px);cursor:pointer;transition:background-color .2s ease;-webkit-user-select:none;user-select:none;list-style:none;outline:none}li:hover{background-color:var(--ui-hover-color)}li:active{background-color:var(--ui-active-color)}li:focus-visible{background-color:var(--ui-hover-color);box-shadow:inset 0 0 0 2px var(--ui-primary-color)}:host([selected]) li{background-color:var(--ui-primary-color-light);color:var(--ui-primary-color)}:host([disabled]) li{opacity:.5;cursor:default;pointer-events:none}", Ka = ":host{display:inline-flex;min-width:40px;color:var(--ui-text-color-muted);flex-shrink:0}::slotted(*){width:24px;height:24px}", Wa = ":host{display:inline-flex;min-width:56px;flex-shrink:0}", Ga = ":host{flex:1 1 auto;margin-top:4px;margin-bottom:4px}.primary{display:block;font-family:var(--ui-font-family);font-size:1rem;color:var(--ui-text-color);line-height:1.5}.secondary{display:block;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);line-height:1.43}", Xa = ":host{display:block;padding:16px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--ui-text-color-muted);font-family:var(--ui-font-family);line-height:1}";
var Za = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, de = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ja(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Za(t, i, r), r;
};
let qi = class extends c {
  constructor() {
    super(...arguments), this.disablePadding = !1, this.dense = !1;
  }
  render() {
    return l`<ul role="list" style="margin: 0; padding: 0; list-style: none;"><slot></slot></ul>`;
  }
};
qi.styles = h(qa);
de([
  s({ type: Boolean, reflect: !0, attribute: "disable-padding" })
], qi.prototype, "disablePadding", 2);
de([
  s({ type: Boolean, reflect: !0 })
], qi.prototype, "dense", 2);
qi = de([
  d("ui-list")
], qi);
let to = class extends c {
  render() {
    return l`<li role="listitem"><slot></slot></li>`;
  }
};
to.styles = h(Ha);
to = de([
  d("ui-list-item")
], to);
let Hi = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this.selected = !1, this._handleKeydown = (e) => {
      this.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.click());
    };
  }
  render() {
    return l`
      <li
        role="button"
        tabindex=${this.disabled ? "-1" : "0"}
        aria-disabled=${this.disabled ? "true" : v}
        aria-current=${this.selected ? "true" : v}
        @keydown=${this._handleKeydown}
      ><slot></slot></li>
    `;
  }
};
Hi.styles = h(Ya);
de([
  s({ type: Boolean, reflect: !0 })
], Hi.prototype, "disabled", 2);
de([
  s({ type: Boolean, reflect: !0 })
], Hi.prototype, "selected", 2);
Hi = de([
  d("ui-list-item-button")
], Hi);
let io = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
io.styles = h(Ka);
io = de([
  d("ui-list-item-icon")
], io);
let ro = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
ro.styles = h(Wa);
ro = de([
  d("ui-list-item-avatar")
], ro);
let fi = class extends c {
  constructor() {
    super(...arguments), this.primary = "", this.secondary = "", this._hasSecondarySlot = !1;
  }
  _onSecondarySlotChange(e) {
    const t = e.target;
    this._hasSecondarySlot = t.assignedNodes({ flatten: !0 }).length > 0;
  }
  render() {
    const e = !!this.secondary || this._hasSecondarySlot;
    return l`
      <span class="primary">${this.primary}<slot name="primary"></slot></span>
      <span class="secondary" style=${e ? "" : "display:none"}>
        ${this.secondary}<slot name="secondary" @slotchange=${this._onSecondarySlotChange}></slot>
      </span>
    `;
  }
};
fi.styles = h(Ga);
de([
  s({ type: String })
], fi.prototype, "primary", 2);
de([
  s({ type: String })
], fi.prototype, "secondary", 2);
de([
  b()
], fi.prototype, "_hasSecondarySlot", 2);
fi = de([
  d("ui-list-item-text")
], fi);
let oo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
oo.styles = h(Xa);
oo = de([
  d("ui-list-subheader")
], oo);
const Qa = ":host{display:block;width:100%;overflow-x:auto;background-color:var(--ui-table-container-bg, var(--ui-surface-background, white));border-radius:var(--ui-table-border-radius, var(--ui-border-radius-lg, 8px));box-shadow:var(--ui-table-shadow, var(--ui-shadow-sm));border:1px solid var(--ui-table-border-color, var(--ui-border-color))}:host([shadow]){box-shadow:var(--ui-table-shadow-elevated, var(--ui-shadow-md))}:host([sticky-header]) ui-table-head,:host([sticky-header]) ::slotted(ui-table-head){position:sticky;top:0;z-index:2}", en = ':host{display:table;width:100%;border-collapse:collapse;border-spacing:0;font-family:var(--ui-font-family);color:var(--ui-text-color)}:host([size="small"]){--ui-table-cell-padding-y: var(--ui-table-cell-padding-y-dense, 6px);--ui-table-cell-padding-x: var(--ui-table-cell-padding-x-dense, 16px)}', tn = ":host{display:table-header-group}", rn = ":host{display:table-row-group}:host([striped]) ::slotted(ui-table-row:nth-child(even)){background-color:var(--ui-table-striped-bg, var(--ui-surface-2))}", on = ":host{display:table-row;vertical-align:middle;outline:0;transition:background-color .2s ease}:host(:hover){background-color:var(--ui-table-row-hover-bg, var(--ui-hover-color, rgba(0, 0, 0, .04)))}:host([selected]){background-color:var(--ui-table-row-selected-bg, var(--ui-primary-color-light, rgba(59, 130, 246, .08)))}:host([hover]){background-color:var(--ui-table-row-hover-bg, var(--ui-hover-color, rgba(0, 0, 0, .04)))}", sn = ':host{display:table-cell;padding:var(--ui-table-cell-padding-y, 16px) var(--ui-table-cell-padding-x, 16px);font-size:.875rem;text-align:left;vertical-align:middle;border-bottom:1px solid var(--ui-table-border-color, var(--ui-border-color))}:host([header]){background-color:var(--ui-table-header-bg, transparent);color:var(--ui-table-header-color, var(--ui-text-color-muted));font-weight:600;line-height:1.5rem;white-space:nowrap}:host([align="right"]){text-align:right}:host([align="center"]){text-align:center}:host([padding="checkbox"]){width:48px;padding:0 0 0 4px}:host([padding="none"]){padding:0}', an = ":host{display:table-footer-group}";
var nn = Object.defineProperty, ln = Object.getOwnPropertyDescriptor, Q = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ln(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && nn(t, i, r), r;
};
let Yi = class extends c {
  constructor() {
    super(...arguments), this.shadow = !1, this.stickyHeader = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
Yi.styles = h(Qa);
Q([
  s({ type: Boolean, reflect: !0 })
], Yi.prototype, "shadow", 2);
Q([
  s({ type: Boolean, reflect: !0, attribute: "sticky-header" })
], Yi.prototype, "stickyHeader", 2);
Yi = Q([
  d("ui-table-container")
], Yi);
let gr = class extends c {
  constructor() {
    super(...arguments), this.size = "medium";
  }
  render() {
    return l`<slot></slot>`;
  }
};
gr.styles = h(en);
Q([
  s({ type: String, reflect: !0 })
], gr.prototype, "size", 2);
gr = Q([
  d("ui-table")
], gr);
let so = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
so.styles = h(tn);
so = Q([
  d("ui-table-head")
], so);
let mr = class extends c {
  constructor() {
    super(...arguments), this.striped = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
mr.styles = h(rn);
Q([
  s({ type: Boolean, reflect: !0 })
], mr.prototype, "striped", 2);
mr = Q([
  d("ui-table-body")
], mr);
let Ki = class extends c {
  constructor() {
    super(...arguments), this.selected = !1, this.hover = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
Ki.styles = h(on);
Q([
  s({ type: Boolean, reflect: !0 })
], Ki.prototype, "selected", 2);
Q([
  s({ type: Boolean, reflect: !0 })
], Ki.prototype, "hover", 2);
Ki = Q([
  d("ui-table-row")
], Ki);
let vi = class extends c {
  constructor() {
    super(...arguments), this.header = !1, this.align = "left", this.padding = "normal";
  }
  render() {
    return l`<slot></slot>`;
  }
};
vi.styles = h(sn);
Q([
  s({ type: Boolean, reflect: !0 })
], vi.prototype, "header", 2);
Q([
  s({ type: String, reflect: !0 })
], vi.prototype, "align", 2);
Q([
  s({ type: String, reflect: !0 })
], vi.prototype, "padding", 2);
vi = Q([
  d("ui-table-cell")
], vi);
let ao = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
ao.styles = h(an);
ao = Q([
  d("ui-table-footer")
], ao);
const cn = ":host{display:inline-flex;align-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;transition:color .2s}:host(:hover){color:var(--ui-text-color)}:host([active]){color:var(--ui-text-color);font-weight:700}.icon{margin-left:4px;width:18px;height:18px;transition:transform .2s ease,opacity .2s;opacity:0}:host(:hover) .icon,:host([active]) .icon{opacity:1}.icon.desc{transform:rotate(180deg)}";
var dn = Object.defineProperty, hn = Object.getOwnPropertyDescriptor, qo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? hn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && dn(t, i, r), r;
};
let Wi = class extends c {
  constructor() {
    super(...arguments), this.active = !1, this.direction = "asc";
  }
  render() {
    return l`
      <slot></slot>
      <svg class=${f({ icon: !0, asc: this.direction === "asc", desc: this.direction === "desc" })} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    `;
  }
};
Wi.styles = h(cn);
qo([
  s({ type: Boolean, reflect: !0 })
], Wi.prototype, "active", 2);
qo([
  s({ type: String })
], Wi.prototype, "direction", 2);
Wi = qo([
  d("ui-table-sort-label")
], Wi);
const pn = ":host{display:flex;align-items:center;justify-content:flex-end;padding:8px 16px;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);border-top:1px solid var(--ui-border-color)}.spacer{flex:1 1 100%}.actions{display:flex;align-items:center;gap:16px}.nav-buttons{display:flex;gap:4px}button{background:transparent;border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ui-text-color);transition:background-color .2s}button:hover:not(:disabled){background-color:var(--ui-hover-color)}button:disabled{color:var(--ui-text-color-muted);cursor:not-allowed}select{border:none;background:transparent;font-family:inherit;font-size:inherit;color:inherit;cursor:pointer;padding:4px;outline:none}";
var un = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, je = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && un(t, i, r), r;
};
let ge = class extends c {
  constructor() {
    super(...arguments), this.count = 0, this.page = 0, this.rowsPerPage = 10, this.rowsPerPageOptions = [5, 10, 25], this.defaultPage = 0, this.defaultRowsPerPage = -1, this.showFirstLast = !1, this.labelRowsPerPage = "Rows per page:", this._page = 0, this._rowsPerPage = 10, this._firstUpdate = !0;
  }
  willUpdate(e) {
    if (this._firstUpdate) {
      this._firstUpdate = !1, this._page = this.defaultPage > 0 ? this.defaultPage : this.page, this._rowsPerPage = this.defaultRowsPerPage > 0 ? this.defaultRowsPerPage : this.rowsPerPage;
      return;
    }
    e.has("page") && (this._page = this.page), e.has("rowsPerPage") && (this._rowsPerPage = this.rowsPerPage);
  }
  _go(e) {
    const t = this._page + e;
    this._page = t, this.dispatchEvent(new CustomEvent("page-change", {
      detail: { page: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _goTo(e) {
    this._page = e, this.dispatchEvent(new CustomEvent("page-change", {
      detail: { page: e },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleRowChange(e) {
    const t = parseInt(e.target.value);
    this._rowsPerPage = t, this._page = 0, this.dispatchEvent(new CustomEvent("rows-per-page-change", {
      detail: { rowsPerPage: t },
      bubbles: !0,
      composed: !0
    }));
  }
  get _lastPage() {
    return Math.max(0, Math.ceil(this.count / this._rowsPerPage) - 1);
  }
  render() {
    const e = this._page * this._rowsPerPage + 1, t = Math.min(this.count, (this._page + 1) * this._rowsPerPage), i = this._page === 0, o = t >= this.count;
    return l`
      <div class="spacer"></div>
      <div class="actions">
        <span>${this.labelRowsPerPage}</span>
        <select @change=${this._handleRowChange} aria-label="${this.labelRowsPerPage}">
          ${this.rowsPerPageOptions.map((r) => l`
            <option value=${r} ?selected=${this._rowsPerPage === r}>${r}</option>
          `)}
        </select>
        <span>${e}-${t} of ${this.count}</span>
        <div class="nav-buttons">
          ${this.showFirstLast ? l`
            <button ?disabled=${i} @click=${() => this._goTo(0)} aria-label="First page">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>
            </button>
          ` : ""}
          <button ?disabled=${i} @click=${() => this._go(-1)} aria-label="Previous page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button ?disabled=${o} @click=${() => this._go(1)} aria-label="Next page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
          ${this.showFirstLast ? l`
            <button ?disabled=${o} @click=${() => this._goTo(this._lastPage)} aria-label="Last page">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>
            </button>
          ` : ""}
        </div>
      </div>
    `;
  }
};
ge.styles = h(pn);
je([
  s({ type: Number })
], ge.prototype, "count", 2);
je([
  s({ type: Number })
], ge.prototype, "page", 2);
je([
  s({ type: Number })
], ge.prototype, "rowsPerPage", 2);
je([
  s({ type: Array })
], ge.prototype, "rowsPerPageOptions", 2);
je([
  s({ type: Number, attribute: "default-page" })
], ge.prototype, "defaultPage", 2);
je([
  s({ type: Number, attribute: "default-rows-per-page" })
], ge.prototype, "defaultRowsPerPage", 2);
je([
  s({ type: Boolean, attribute: "show-first-last" })
], ge.prototype, "showFirstLast", 2);
je([
  s({ type: String, attribute: "label-rows-per-page" })
], ge.prototype, "labelRowsPerPage", 2);
je([
  b()
], ge.prototype, "_page", 2);
je([
  b()
], ge.prototype, "_rowsPerPage", 2);
ge = je([
  d("ui-table-pagination")
], ge);
const vn = ":host{display:inline-block;position:relative}.tooltip-container{display:inline-block}.tooltip-popup{position:absolute;background-color:var(--ui-tooltip-bg);color:var(--ui-tooltip-color);padding:4px 8px;border-radius:var(--ui-border-radius-sm);font-size:.75rem;font-family:var(--ui-font-family);line-height:1.4;max-width:var(--ui-tooltip-max-width, 300px);white-space:nowrap;overflow-wrap:break-word;z-index:1000;opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s,transform .2s;pointer-events:none;box-shadow:var(--ui-shadow-sm)}.tooltip-popup.top{bottom:100%;left:50%;transform:translate(-50%) translateY(0);margin-bottom:8px}.tooltip-popup.top.visible{transform:translate(-50%) translateY(-4px)}.tooltip-popup.bottom{top:100%;left:50%;transform:translate(-50%) translateY(0);margin-top:8px}.tooltip-popup.bottom.visible{transform:translate(-50%) translateY(4px)}.tooltip-popup.left{right:100%;top:50%;transform:translateY(-50%) translate(0);margin-right:8px}.tooltip-popup.left.visible{transform:translateY(-50%) translate(-4px)}.tooltip-popup.right{left:100%;top:50%;transform:translateY(-50%) translate(0);margin-left:8px}.tooltip-popup.right.visible{transform:translateY(-50%) translate(4px)}.tooltip-popup.visible{opacity:1;visibility:visible}.arrow{position:absolute;width:0;height:0;border-style:solid}.tooltip-popup.top .arrow{top:100%;left:50%;transform:translate(-50%);border-width:5px 5px 0 5px;border-color:var(--ui-tooltip-bg) transparent transparent transparent}.tooltip-popup.bottom .arrow{bottom:100%;left:50%;transform:translate(-50%);border-width:0 5px 5px 5px;border-color:transparent transparent var(--ui-tooltip-bg) transparent}.tooltip-popup.left .arrow{left:100%;top:50%;transform:translateY(-50%);border-width:5px 0 5px 5px;border-color:transparent transparent transparent var(--ui-tooltip-bg)}.tooltip-popup.right .arrow{right:100%;top:50%;transform:translateY(-50%);border-width:5px 5px 5px 0;border-color:transparent var(--ui-tooltip-bg) transparent transparent}";
var bn = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, ft = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? gn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && bn(t, i, r), r;
};
const mn = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
let yn = 0, Te = class extends c {
  constructor() {
    super(...arguments), this.label = "", this.placement = "top", this.arrow = !1, this.disabled = !1, this.openDelay = 0, this.closeDelay = 0, this._visible = !1, this._activePlacement = this.placement, this._tooltipId = `ui-tooltip-${yn++}`, this._openTimer = null, this._closeTimer = null;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearTimers();
  }
  _clearTimers() {
    this._openTimer !== null && (clearTimeout(this._openTimer), this._openTimer = null), this._closeTimer !== null && (clearTimeout(this._closeTimer), this._closeTimer = null);
  }
  _show() {
    if (!(this.disabled || !this.label))
      if (this._closeTimer !== null && (clearTimeout(this._closeTimer), this._closeTimer = null), this.openDelay > 0) {
        if (this._openTimer !== null) return;
        this._openTimer = setTimeout(() => {
          this._openTimer = null, this._applyAutoFlip(), this._visible = !0;
        }, this.openDelay);
      } else
        this._applyAutoFlip(), this._visible = !0;
  }
  _hide() {
    if (this._openTimer !== null && (clearTimeout(this._openTimer), this._openTimer = null), this.closeDelay > 0) {
      if (this._closeTimer !== null) return;
      this._closeTimer = setTimeout(() => {
        this._closeTimer = null, this._visible = !1;
      }, this.closeDelay);
    } else
      this._visible = !1;
  }
  _handleKeydown(e) {
    e.key === "Escape" && this._visible && (this._clearTimers(), this._visible = !1);
  }
  /** Check if the tooltip fits within the viewport, flip if not. */
  _applyAutoFlip() {
    const e = this.getBoundingClientRect(), t = this.shadowRoot?.querySelector(".tooltip-popup");
    if (!t) {
      this._activePlacement = this.placement;
      return;
    }
    const i = t.getBoundingClientRect(), o = i.width || 100, r = i.height || 30, a = 8;
    let n = !0;
    switch (this.placement) {
      case "top":
        n = e.top - r - a >= 0;
        break;
      case "bottom":
        n = e.bottom + r + a <= window.innerHeight;
        break;
      case "left":
        n = e.left - o - a >= 0;
        break;
      case "right":
        n = e.right + o + a <= window.innerWidth;
        break;
    }
    this._activePlacement = n ? this.placement : mn[this.placement];
  }
  render() {
    const e = this._visible ? this._activePlacement : this.placement;
    return l`
      <div
        class="tooltip-container"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
        @keydown=${this._handleKeydown}
      >
        <slot></slot>
        <div
          id=${this._tooltipId}
          role="tooltip"
          aria-hidden=${!this._visible}
          class=${f({
      "tooltip-popup": !0,
      [e]: !0,
      visible: this._visible
    })}
        >
          ${this.label}
          ${this.arrow ? l`<div class="arrow"></div>` : v}
        </div>
      </div>
    `;
  }
};
Te.styles = h(vn);
ft([
  s({ type: String })
], Te.prototype, "label", 2);
ft([
  s({ type: String })
], Te.prototype, "placement", 2);
ft([
  s({ type: Boolean })
], Te.prototype, "arrow", 2);
ft([
  s({ type: Boolean, reflect: !0 })
], Te.prototype, "disabled", 2);
ft([
  s({ type: Number, attribute: "open-delay" })
], Te.prototype, "openDelay", 2);
ft([
  s({ type: Number, attribute: "close-delay" })
], Te.prototype, "closeDelay", 2);
ft([
  b()
], Te.prototype, "_visible", 2);
ft([
  b()
], Te.prototype, "_activePlacement", 2);
Te = ft([
  d("ui-tooltip")
], Te);
const xn = ":host{display:block;--ui-backdrop-color: rgba(0, 0, 0, .5);--ui-backdrop-z-index: 1200}.backdrop{position:var(--ui-backdrop-position, fixed);display:flex;align-items:center;justify-content:center;inset:0;background-color:var(--ui-backdrop-color);z-index:var(--ui-backdrop-z-index);-webkit-tap-highlight-color:transparent;opacity:0;visibility:hidden;transition:opacity .3s cubic-bezier(.4,0,.2,1),visibility .3s}:host([container]){--ui-backdrop-position: absolute}.backdrop.open{opacity:1;visibility:visible}.backdrop.invisible{background-color:transparent}.content{z-index:calc(var(--ui-backdrop-z-index) + 1)}";
var _n = Object.defineProperty, wn = Object.getOwnPropertyDescriptor, Rr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _n(t, i, r), r;
};
let bi = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.invisible = !1, this.container = !1;
  }
  _handleClick(e) {
    e.target === e.currentTarget && this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  render() {
    return l`
      <div 
        class="${f({
      backdrop: !0,
      open: this.open,
      invisible: this.invisible
    })}" 
        @click="${this._handleClick}"
        aria-hidden="${this.open ? v : "true"}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
bi.styles = h(xn);
Rr([
  s({ type: Boolean, reflect: !0 })
], bi.prototype, "open", 2);
Rr([
  s({ type: Boolean })
], bi.prototype, "invisible", 2);
Rr([
  s({ type: Boolean, reflect: !0 })
], bi.prototype, "container", 2);
bi = Rr([
  d("ui-backdrop")
], bi);
const kn = ":host{display:block}.dialog-panel{position:relative;background-color:var(--ui-surface-background, white);border-radius:var(--ui-border-radius-xl, 12px);box-shadow:var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, .1));max-width:90vw;max-height:var(--ui-dialog-max-height, 90vh);width:var(--ui-dialog-width, 444px);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:scale(.9);transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1);pointer-events:none}.dialog-panel.open{opacity:1;transform:scale(1);pointer-events:auto}.dialog-panel.transition-slide-up{transform:translateY(40px)}.dialog-panel.transition-slide-up.open{transform:translateY(0)}.dialog-panel.transition-slide-down{transform:translateY(-40px)}.dialog-panel.transition-slide-down.open{transform:translateY(0)}", $n = ":host{display:block;padding:20px 24px 12px;font-family:var(--ui-font-family);font-size:1.25rem;font-weight:600;color:var(--ui-text-color)}", Sn = ":host{display:block;padding:0 24px 20px;flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch}", Cn = ":host{display:block;font-family:var(--ui-font-family);font-size:.9375rem;line-height:1.6;color:var(--ui-text-color-muted);margin-bottom:8px}", In = ':host{display:flex;align-items:center;justify-content:flex-end;padding:8px 16px 16px;gap:8px;border-top:1px solid var(--ui-border-color)}:host([align="start"]){justify-content:flex-start}:host([align="center"]){justify-content:center}:host([align="space-between"]){justify-content:space-between}';
var Pn = Object.defineProperty, zn = Object.getOwnPropertyDescriptor, vt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Pn(t, i, r), r;
};
const mt = [];
let gi = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.transition = "scale", this.disableBackdropClose = !1, this._handleKeyDown = (e) => {
      e.key === "Escape" && this.open && mt[mt.length - 1] === this && this.requestClose();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._handleKeyDown);
  }
  updated(e) {
    if (super.updated(e), e.has("open"))
      if (this.open)
        mt.includes(this) || mt.push(this);
      else {
        const t = mt.indexOf(this);
        t !== -1 && mt.splice(t, 1);
      }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._handleKeyDown);
    const e = mt.indexOf(this);
    e !== -1 && mt.splice(e, 1);
  }
  /** Programmatically request the dialog to close (fires the 'close' event). */
  requestClose() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _handleBackdropClose(e) {
    e.stopPropagation(), this.disableBackdropClose || this.requestClose();
  }
  render() {
    const e = f({
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
gi.styles = h(kn);
vt([
  s({ type: Boolean, reflect: !0 })
], gi.prototype, "open", 2);
vt([
  s({ type: String })
], gi.prototype, "transition", 2);
vt([
  s({ type: Boolean, attribute: "disable-backdrop-close" })
], gi.prototype, "disableBackdropClose", 2);
gi = vt([
  d("ui-dialog")
], gi);
let no = class extends c {
  render() {
    return l`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
  }
};
no.styles = h($n);
no = vt([
  d("ui-dialog-title")
], no);
let lo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
lo.styles = h(Sn);
lo = vt([
  d("ui-dialog-content")
], lo);
let co = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
co.styles = h(Cn);
co = vt([
  d("ui-dialog-content-text")
], co);
let yr = class extends c {
  constructor() {
    super(...arguments), this.align = "end";
  }
  render() {
    return l`<slot></slot>`;
  }
};
yr.styles = h(In);
vt([
  s({ type: String, reflect: !0 })
], yr.prototype, "align", 2);
yr = vt([
  d("ui-dialog-actions")
], yr);
const Dn = ":host{display:inline-block;--ui-circular-progress-size: 40px;--ui-circular-progress-color: var(--ui-primary-color);--ui-circular-progress-thickness: 3.6}.circular-root{width:var(--ui-circular-progress-size);height:var(--ui-circular-progress-size);display:inline-block;animation:rotate 1.4s linear infinite}.circular-root.determinate{animation:none;transform:rotate(-90deg)}svg{display:block}circle{stroke:var(--ui-circular-progress-color);stroke-linecap:round;transition:stroke-dashoffset .3s ease}.indeterminate circle{animation:dash 1.4s ease-in-out infinite;stroke-dasharray:80,200;stroke-dashoffset:0}@keyframes rotate{to{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}";
var En = Object.defineProperty, On = Object.getOwnPropertyDescriptor, ti = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? On(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && En(t, i, r), r;
};
let ke = class extends c {
  constructor() {
    super(...arguments), this.variant = "indeterminate", this.value = 0, this.size = 40, this.thickness = 3.6, this.color = "primary", this.label = "";
  }
  get _safeValue() {
    return Math.min(100, Math.max(0, this.value));
  }
  render() {
    const e = this.variant === "determinate", t = 20 - this.thickness / 2, i = 2 * Math.PI * t, o = i - this._safeValue / 100 * i, r = ke._colorMap[this.color] ?? ke._colorMap.primary;
    return l`
      <div
        class="circular-root ${f({ determinate: e, indeterminate: !e })}"
        style="--ui-circular-progress-size: ${this.size}px; --ui-circular-progress-thickness: ${this.thickness}; --ui-circular-progress-color: ${r}"
        role="progressbar"
        aria-valuenow="${e ? this._safeValue : v}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || v}"
      >
        <svg viewBox="22 22 44 44">
          <circle
            class="circle"
            cx="44"
            cy="44"
            r="${t}"
            fill="none"
            stroke-width="${this.thickness}"
            style="${e ? `stroke-dasharray: ${i}; stroke-dashoffset: ${o}px` : ""}"
          ></circle>
        </svg>
      </div>
    `;
  }
};
ke.styles = h(Dn);
ke._colorMap = {
  primary: "#3b82f6",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b"
};
ti([
  s({ type: String, reflect: !0 })
], ke.prototype, "variant", 2);
ti([
  s({ type: Number, reflect: !0 })
], ke.prototype, "value", 2);
ti([
  s({ type: Number })
], ke.prototype, "size", 2);
ti([
  s({ type: Number })
], ke.prototype, "thickness", 2);
ti([
  s({ type: String, reflect: !0 })
], ke.prototype, "color", 2);
ti([
  s({ type: String })
], ke.prototype, "label", 2);
ke = ti([
  d("ui-circular-progress")
], ke);
const Tn = ":host{display:block;width:100%;--ui-linear-progress-height: 4px;--ui-linear-progress-color: var(--ui-primary-color);--ui-linear-progress-bg: var(--ui-primary-color-light)}.root{position:relative;overflow:hidden;height:var(--ui-linear-progress-height);background-color:var(--ui-linear-progress-bg);border-radius:calc(var(--ui-linear-progress-height) / 2)}.bar{width:100%;position:absolute;left:0;bottom:0;top:0;transition:transform .4s linear;transform-origin:left;background-color:var(--ui-linear-progress-color);border-radius:inherit}.indeterminate .bar1{width:auto;animation:indeterminate1 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.indeterminate .bar2{width:auto;animation:indeterminate2 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}@keyframes indeterminate1{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes indeterminate2{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}";
var An = Object.defineProperty, Bn = Object.getOwnPropertyDescriptor, Bi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && An(t, i, r), r;
};
let Ae = class extends c {
  constructor() {
    super(...arguments), this.variant = "indeterminate", this.value = 0, this.height = 4, this.color = "primary", this.label = "";
  }
  get _safeValue() {
    return Math.min(100, Math.max(0, this.value));
  }
  render() {
    const e = this.variant === "determinate", t = Ae._colorMap[this.color] ?? Ae._colorMap.primary, i = [
      `--ui-linear-progress-height: ${this.height}px`,
      `--ui-linear-progress-color: ${t}`
    ].join("; ");
    return l`
      <div
        class="root ${f({ determinate: e, indeterminate: !e })}"
        role="progressbar"
        aria-valuenow="${e ? this._safeValue : v}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || v}"
        style="${i}"
      >
        ${e ? l`
          <div class="bar" style="transform: scaleX(${this._safeValue / 100})"></div>
        ` : l`
          <div class="bar bar1"></div>
          <div class="bar bar2"></div>
        `}
      </div>
    `;
  }
};
Ae.styles = h(Tn);
Ae._colorMap = {
  primary: "#3b82f6",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b"
};
Bi([
  s({ type: String, reflect: !0 })
], Ae.prototype, "variant", 2);
Bi([
  s({ type: Number, reflect: !0 })
], Ae.prototype, "value", 2);
Bi([
  s({ type: Number })
], Ae.prototype, "height", 2);
Bi([
  s({ type: String, reflect: !0 })
], Ae.prototype, "color", 2);
Bi([
  s({ type: String })
], Ae.prototype, "label", 2);
Ae = Bi([
  d("ui-linear-progress")
], Ae);
const Mn = ":host{display:block;border-top:1px solid var(--ui-border-color);background-color:var(--ui-surface-1);color:var(--ui-text-color);transition:margin .15s cubic-bezier(.4,0,.2,1)}:host(:first-of-type){border-top:none;border-top-left-radius:var(--ui-border-radius-md);border-top-right-radius:var(--ui-border-radius-md)}:host(:last-of-type){border-bottom-left-radius:var(--ui-border-radius-md);border-bottom-right-radius:var(--ui-border-radius-md)}:host([expanded]){margin:16px 0;border-top:none;box-shadow:var(--ui-shadow-md)}:host([expanded]:first-of-type){margin-top:0}:host([expanded]:last-of-type){margin-bottom:0}.accordion-container{display:flex;flex-direction:column}", Ln = ":host{display:flex;align-items:center;padding:0 16px;min-height:48px;cursor:pointer;-webkit-user-select:none;user-select:none;transition:min-height .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}:host(:focus-visible){outline:2px solid var(--ui-primary-color);outline-offset:-2px}:host(:hover){background-color:var(--ui-hover-color)}:host([expanded]){min-height:64px}:host([disabled]){cursor:default;opacity:.5;pointer-events:none}.content{display:flex;flex-grow:1;margin:12px 0;font-family:var(--ui-font-family);font-weight:500}.expand-icon{display:flex;padding:8px;border-radius:50%;color:var(--ui-text-color-muted);transition:transform .15s cubic-bezier(.4,0,.2,1)}:host([expanded]) .expand-icon{transform:rotate(180deg)}", Un = ":host{display:grid;grid-template-rows:0fr;transition:grid-template-rows .15s cubic-bezier(.4,0,.2,1);overflow:hidden}:host([expanded]){grid-template-rows:1fr}.details-inner{min-height:0}.content{padding:8px 16px 16px;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color)}", jn = ":host{display:none;padding:8px 16px 16px;justify-content:flex-end;gap:8px;border-top:1px solid var(--ui-border-color)}:host([expanded]){display:flex}";
var Rn = Object.defineProperty, Nn = Object.getOwnPropertyDescriptor, Mi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Nn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Rn(t, i, r), r;
};
let Gi = class extends c {
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
Gi.styles = h(Mn);
Mi([
  s({ type: Boolean, reflect: !0 })
], Gi.prototype, "expanded", 2);
Mi([
  s({ type: Boolean, reflect: !0 })
], Gi.prototype, "disabled", 2);
Gi = Mi([
  d("ui-accordion")
], Gi);
let ho = class extends c {
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
ho.styles = h(Ln);
ho = Mi([
  d("ui-accordion-summary")
], ho);
let po = class extends c {
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
po.styles = h(Un);
po = Mi([
  d("ui-accordion-details")
], po);
let uo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
uo.styles = h(jn);
uo = Mi([
  d("ui-accordion-actions")
], uo);
const Vn = ':host{display:block;position:relative;--ui-app-bar-height: 64px;--ui-app-bar-bg: var(--ui-primary-color);--ui-app-bar-color: var(--ui-text-color-on-primary);--ui-app-bar-shadow: var(--ui-shadow-md);z-index:1100}:host([position="fixed"]){position:fixed;top:0;left:0;right:0}:host([position="absolute"]){position:absolute;top:0;left:0;right:0}:host([position="sticky"]){position:sticky;top:0}header{display:flex;align-items:center;box-sizing:border-box;width:100%;height:var(--ui-app-bar-height);padding:0 16px;background-color:var(--ui-app-bar-bg);color:var(--ui-app-bar-color);box-shadow:var(--ui-app-bar-shadow);position:relative}header.variant-outlined{background-color:var(--ui-surface-1);color:var(--ui-text-color);border-bottom:1px solid var(--ui-border-color);box-shadow:none}.title{flex-grow:1;min-width:0;margin:0 16px;font-family:var(--ui-font-family);font-size:1.25rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.left-section,.right-section{display:flex;align-items:center;flex-shrink:0;gap:8px}';
var Fn = Object.defineProperty, qn = Object.getOwnPropertyDescriptor, Nr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Fn(t, i, r), r;
};
let mi = class extends c {
  constructor() {
    super(...arguments), this.title = "", this.position = "static", this.variant = "regular";
  }
  render() {
    return l`
      <header class="${f({
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
mi.styles = h(Vn);
Nr([
  s({ type: String })
], mi.prototype, "title", 2);
Nr([
  s({ type: String, reflect: !0 })
], mi.prototype, "position", 2);
Nr([
  s({ type: String, reflect: !0 })
], mi.prototype, "variant", 2);
mi = Nr([
  d("ui-app-bar")
], mi);
const Hn = ":host{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 12px 8px;color:var(--ui-text-color-muted);cursor:pointer;transition:color .25s cubic-bezier(.4,0,.2,1),padding .25s cubic-bezier(.4,0,.2,1);-webkit-user-select:none;user-select:none;min-width:80px;max-width:168px}:host(:hover){background-color:var(--ui-hover-color)}:host([active]){color:var(--ui-primary-color);padding-top:8px}.icon-container{display:flex;align-items:center;justify-content:center;height:24px;margin-bottom:2px;transition:transform .25s cubic-bezier(.4,0,.2,1)}:host([active]) .icon-container{transform:scale(1.1)}.label{font-family:var(--ui-font-family);font-size:.75rem;transition:font-size .25s cubic-bezier(.4,0,.2,1),opacity .25s cubic-bezier(.4,0,.2,1);opacity:1}:host([active]) .label{font-size:.875rem}.label.hidden{opacity:0;font-size:0;pointer-events:none}";
var Yn = Object.defineProperty, Kn = Object.getOwnPropertyDescriptor, cr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Kn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Yn(t, i, r), r;
};
let kt = class extends c {
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
            <span class="${f({ label: !0, hidden: !this.showLabel })}">
                ${this.label}
            </span>
        `;
  }
};
kt.styles = h(Hn);
cr([
  s({ type: String })
], kt.prototype, "label", 2);
cr([
  s()
], kt.prototype, "value", 2);
cr([
  s({ type: Boolean, reflect: !0 })
], kt.prototype, "active", 2);
cr([
  s({ type: Boolean })
], kt.prototype, "showLabel", 2);
kt = cr([
  d("ui-bottom-navigation-action")
], kt);
const Wn = ":host{display:flex;justify-content:center;height:56px;background-color:var(--ui-surface-1);box-shadow:var(--ui-shadow-lg);position:relative;width:100%}.container{display:flex;flex:1;max-width:100%}";
var Gn = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, Vr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Gn(t, i, r), r;
};
let yi = class extends c {
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
    this._actions.forEach((i) => {
      i.active = i.value === this.value, i.showLabel = t || i.active;
    });
  }
  _handleActionChange(e) {
    const t = e.composedPath().find(
      (i) => i instanceof kt
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
yi.styles = h(Wn);
Vr([
  s()
], yi.prototype, "value", 2);
Vr([
  s({ type: Boolean, attribute: "show-labels" })
], yi.prototype, "showLabels", 2);
Vr([
  rs({ selector: "ui-bottom-navigation-action" })
], yi.prototype, "_actions", 2);
yi = Vr([
  d("ui-bottom-navigation")
], yi);
const Zn = ':host{display:block}.breadcrumbs-ol{display:flex;flex-wrap:wrap;align-items:center;padding:0;margin:0;list-style:none}.breadcrumb-li{display:flex;align-items:center}.separator{display:flex;-webkit-user-select:none;user-select:none;margin-left:8px;margin-right:8px;color:var(--ui-text-color-muted)}::slotted(*){font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);text-decoration:none;transition:color .2s}::slotted(a:hover){text-decoration:underline;color:var(--ui-text-color)}::slotted([aria-current="page"]),::slotted(.active){color:var(--ui-text-color);font-weight:500;pointer-events:none}.collapsed-button{display:flex;align-items:center;justify-content:center;background:var(--ui-hover-color);border:none;border-radius:4px;cursor:pointer;padding:4px 8px;font-size:1rem;line-height:1;color:var(--ui-text-color-muted);transition:background-color .2s}.collapsed-button:hover{background-color:var(--ui-active-color)}';
var Jn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, Ot = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Qn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Jn(t, i, r), r;
};
let He = class extends c {
  constructor() {
    super(...arguments), this.maxItems = 8, this.itemsBefore = 1, this.itemsAfter = 1, this.separator = "/", this._expanded = !1, this._itemsCount = 0, this._separatorNode = null;
  }
  _handleSlotChange() {
    const t = Array.from(this.children).filter((i) => !i.slot || i.slot.startsWith("breadcrumb-item-"));
    t.forEach((i, o) => {
      const r = `breadcrumb-item-${o}`;
      i.getAttribute("slot") !== r && i.setAttribute("slot", r);
    }), this._itemsCount = t.length;
  }
  _handleSeparatorSlotChange(e) {
    const i = e.target.assignedNodes({ flatten: !0 });
    this._separatorNode = i.length > 0 ? i[0].cloneNode(!0) : null;
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
    const t = Math.min(this.itemsBefore, e), i = Math.min(this.itemsAfter, e - t);
    if (t + i >= e)
      return Array.from({ length: e }).map((a, n) => this._renderItem(n, n === e - 1));
    const o = Array.from({ length: t }).map((a, n) => n), r = Array.from({ length: i }).map((a, n) => e - i + n);
    return l`
            ${o.map((a) => this._renderItem(a, !1))}
            <li class="breadcrumb-li">
                <button class="collapsed-button" @click=${() => this._expanded = !0} aria-label="Show all breadcrumbs">
                    ...
                </button>
                ${this._renderSeparator()}
            </li>
            ${r.map((a, n) => this._renderItem(a, n === r.length - 1))}
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
He.styles = h(Zn);
Ot([
  s({ type: Number, attribute: "max-items" })
], He.prototype, "maxItems", 2);
Ot([
  s({ type: Number, attribute: "items-before" })
], He.prototype, "itemsBefore", 2);
Ot([
  s({ type: Number, attribute: "items-after" })
], He.prototype, "itemsAfter", 2);
Ot([
  s({ type: String })
], He.prototype, "separator", 2);
Ot([
  b()
], He.prototype, "_expanded", 2);
Ot([
  b()
], He.prototype, "_itemsCount", 2);
Ot([
  b()
], He.prototype, "_separatorNode", 2);
He = Ot([
  d("ui-breadcrumbs")
], He);
const el = ':host{display:contents;--ui-drawer-width: 250px;--ui-drawer-mini-width: 72px;--ui-drawer-height: auto;--ui-drawer-bg: var(--ui-surface-1);--ui-drawer-z-index: 1200;--ui-drawer-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)}.backdrop{position:fixed;inset:0;background:var(--ui-backdrop-color);z-index:calc(var(--ui-drawer-z-index) - 1);opacity:0;pointer-events:none;transition:opacity .25s}:host([container]) .backdrop{position:absolute}.backdrop.open{opacity:1;pointer-events:auto}.paper{position:fixed;background:var(--ui-drawer-bg);z-index:var(--ui-drawer-z-index);display:flex;flex-direction:column;overflow-y:auto;outline:none}:host([container]) .paper{position:absolute}:host(:not([variant])) .paper,:host([variant="temporary"]) .paper{top:0;bottom:0;left:0;width:var(--ui-drawer-width);box-shadow:var(--ui-drawer-shadow);transform:translate(-100%);transition:transform .225s cubic-bezier(0,0,.2,1)}:host(:not([variant])[open]) .paper,:host([variant="temporary"][open]) .paper{transform:translate(0)}:host([variant="temporary"][anchor="right"]) .paper{left:auto;right:0;transform:translate(100%)}:host([variant="temporary"][anchor="right"][open]) .paper{transform:translate(0)}:host([variant="temporary"][anchor="top"]) .paper{inset:0 0 auto;width:auto;height:var(--ui-drawer-height);transform:translateY(-100%)}:host([variant="temporary"][anchor="top"][open]) .paper{transform:translateY(0)}:host([variant="temporary"][anchor="bottom"]) .paper{inset:auto 0 0;width:auto;height:var(--ui-drawer-height);transform:translateY(100%)}:host([variant="temporary"][anchor="bottom"][open]) .paper{transform:translateY(0)}:host([variant="persistent"]) .paper{position:relative;transform:none;box-shadow:none;transition:none;border-right:1px solid var(--ui-border-color)}:host([variant="persistent"][anchor="right"]) .paper{border-right:none;border-left:1px solid var(--ui-border-color)}:host([variant="persistent"]) .paper:not(.open){display:none}:host([variant="mini"]){display:flex}:host([variant="mini"]) .paper{position:relative;transform:none;box-shadow:none;border-right:1px solid var(--ui-border-color);width:var(--ui-drawer-mini-width);overflow-x:hidden;white-space:nowrap;transition:width .225s cubic-bezier(.4,0,.6,1);flex-shrink:0}:host([variant="mini"][anchor="right"]) .paper{border-right:none;border-left:1px solid var(--ui-border-color)}:host([variant="mini"][open]) .paper{width:var(--ui-drawer-width)}:host([variant="mini"]:not([open])) ::slotted([data-drawer-hide-mini]){opacity:0;pointer-events:none}::slotted([data-drawer-hide-mini]){transition:opacity .18s}.edge{display:none;position:fixed;background:var(--ui-drawer-bg);border:1px solid var(--ui-border-color);box-shadow:0 1px 3px #0000001f;cursor:pointer;z-index:var(--ui-drawer-z-index);align-items:center;justify-content:center}:host([container]) .edge{position:absolute}:host([edge]:not([variant])) .edge,:host([edge][variant="temporary"]) .edge{display:flex}.edge-left{left:0;top:0;bottom:0;width:16px;border-radius:0 8px 8px 0}.edge-right{right:0;top:0;bottom:0;width:16px;border-radius:8px 0 0 8px}.edge-top{top:0;left:0;right:0;height:16px;border-radius:0 0 8px 8px}.edge-bottom{bottom:0;left:0;right:0;height:16px;border-radius:8px 8px 0 0}.edge-handle{width:4px;height:32px;background:var(--ui-border-color);border-radius:2px}.edge-top .edge-handle,.edge-bottom .edge-handle{width:32px;height:4px}';
var tl = Object.defineProperty, il = Object.getOwnPropertyDescriptor, ii = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? il(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && tl(t, i, r), r;
};
let ot = class extends c {
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
    const e = this.variant === "temporary", t = this.edge && !this.open && e, i = this.variant === "mini" ? "false" : String(!this.open);
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
                aria-hidden=${i}
                tabindex="-1"
            >
                <slot></slot>
            </div>
        `;
  }
};
ot.styles = h(el);
ii([
  s({ type: Boolean, reflect: !0 })
], ot.prototype, "open", 2);
ii([
  s({ type: String, reflect: !0 })
], ot.prototype, "anchor", 2);
ii([
  s({ type: String, reflect: !0 })
], ot.prototype, "variant", 2);
ii([
  s({ type: Boolean, reflect: !0 })
], ot.prototype, "edge", 2);
ii([
  s({ type: Boolean, reflect: !0 })
], ot.prototype, "container", 2);
ii([
  s({ type: String })
], ot.prototype, "label", 2);
ot = ii([
  d("ui-drawer")
], ot);
const rl = ':host{display:inline;--ui-link-color: var(--ui-primary-color);--ui-link-color-hover: var(--ui-primary-color-hover);--ui-link-color-visited: var(--ui-secondary-color)}a{color:var(--ui-link-color);font-family:var(--ui-font-family);font-size:inherit;font-weight:inherit;line-height:inherit;cursor:pointer;display:inline;transition:color .15s ease,opacity .15s ease}:host([color="inherit"]) a{color:inherit}:host([color="primary"]) a{color:var(--ui-primary-color)}:host([color="secondary"]) a{color:var(--ui-secondary-color)}:host([color="success"]) a{color:var(--ui-success-color)}:host([color="error"]) a{color:var(--ui-error-color)}:host([color="warning"]) a{color:var(--ui-warning-color)}:host([color="info"]) a{color:var(--ui-info-icon-color)}:host([color="textPrimary"]) a{color:var(--ui-text-color)}:host([color="textSecondary"]) a{color:var(--ui-text-color-muted)}:host([underline="none"]) a{text-decoration:none}:host([underline="hover"]) a{text-decoration:none}:host([underline="hover"]) a:hover{text-decoration:underline}:host([underline="always"]) a{text-decoration:underline}:host([underline="always"]) a:hover{text-decoration:underline}a{text-decoration:underline}a:hover{opacity:.8}a:visited{color:var(--ui-link-color-visited)}:host([color="inherit"]) a:visited{color:inherit}:host([variant="h1"]) a{font-size:6rem;font-weight:300;letter-spacing:-1.5px;line-height:1.167}:host([variant="h2"]) a{font-size:3.75rem;font-weight:300;letter-spacing:-.5px;line-height:1.2}:host([variant="h3"]) a{font-size:3rem;font-weight:400;line-height:1.167}:host([variant="h4"]) a{font-size:2.125rem;font-weight:400;letter-spacing:.25px;line-height:1.235}:host([variant="h5"]) a{font-size:1.5rem;font-weight:400;line-height:1.334}:host([variant="h6"]) a{font-size:1.25rem;font-weight:500;letter-spacing:.15px;line-height:1.6}:host([variant="subtitle1"]) a{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.75}:host([variant="subtitle2"]) a{font-size:.875rem;font-weight:500;letter-spacing:.1px;line-height:1.57}:host([variant="body1"]) a{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.5}:host([variant="body2"]) a{font-size:.875rem;font-weight:400;letter-spacing:.15px;line-height:1.43}:host([variant="caption"]) a{font-size:.75rem;font-weight:400;letter-spacing:.4px;line-height:1.66}:host([variant="overline"]) a{font-size:.75rem;font-weight:400;letter-spacing:1px;line-height:2.66;text-transform:uppercase}:host([disabled]) a{opacity:.38;cursor:not-allowed;pointer-events:none}';
var ol = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, Qe = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? sl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ol(t, i, r), r;
};
let $e = class extends c {
  constructor() {
    super(...arguments), this.href = "", this.target = "_self", this.rel = "", this.color = "primary", this.underline = "always", this.variant = "inherit", this.disabled = !1;
  }
  _computedRel() {
    if (this.target === "_blank") {
      const e = this.rel || "", t = new Set(e.split(" ").filter(Boolean));
      return t.add("noopener"), t.add("noreferrer"), Array.from(t).join(" ");
    }
    return this.rel || void 0;
  }
  _handleClick(e) {
    this.disabled && e.preventDefault();
  }
  render() {
    return l`
            <a
                class="link"
                href=${re(this.disabled ? void 0 : this.href || void 0)}
                target=${re(this.target !== "_self" ? this.target : void 0)}
                rel=${re(this._computedRel())}
                aria-label=${re(this.label)}
                download=${re(this.download)}
                aria-disabled=${this.disabled}
                tabindex=${this.disabled ? "-1" : "0"}
                @click=${this._handleClick}
            >
                <slot></slot>
            </a>
        `;
  }
};
$e.styles = h(rl);
Qe([
  s({ type: String })
], $e.prototype, "href", 2);
Qe([
  s({ type: String })
], $e.prototype, "target", 2);
Qe([
  s({ type: String })
], $e.prototype, "rel", 2);
Qe([
  s({ type: String, reflect: !0 })
], $e.prototype, "color", 2);
Qe([
  s({ type: String, reflect: !0 })
], $e.prototype, "underline", 2);
Qe([
  s({ type: String, reflect: !0 })
], $e.prototype, "variant", 2);
Qe([
  s({ type: Boolean, reflect: !0 })
], $e.prototype, "disabled", 2);
Qe([
  s({ type: String })
], $e.prototype, "download", 2);
Qe([
  s({ type: String })
], $e.prototype, "label", 2);
$e = Qe([
  d("ui-link")
], $e);
const al = ':host{display:block;font-family:var(--ui-font-family);color:var(--ui-text-color)}.typography{margin:0;padding:0}.h1{font-size:6rem;font-weight:300;letter-spacing:-1.5px;line-height:1.167}.h2{font-size:3.75rem;font-weight:300;letter-spacing:-.5px;line-height:1.2}.h3{font-size:3rem;font-weight:400;line-height:1.167}.h4{font-size:2.125rem;font-weight:400;letter-spacing:.25px;line-height:1.235}.h5{font-size:1.5rem;font-weight:400;line-height:1.334}.h6{font-size:1.25rem;font-weight:500;letter-spacing:.15px;line-height:1.6}.subtitle1{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.75}.subtitle2{font-size:.875rem;font-weight:500;letter-spacing:.1px;line-height:1.57}.body1{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.5}.body2{font-size:.875rem;font-weight:400;letter-spacing:.15px;line-height:1.43}.caption{font-size:.75rem;font-weight:400;letter-spacing:.4px;line-height:1.66}.overline{font-size:.75rem;font-weight:400;letter-spacing:1px;line-height:2.66;text-transform:uppercase}:host([color="primary"]) .typography{color:var(--ui-primary-color)}:host([color="secondary"]) .typography{color:var(--ui-secondary-color)}:host([color="success"]) .typography{color:var(--ui-success-color)}:host([color="error"]) .typography{color:var(--ui-error-color)}:host([color="warning"]) .typography{color:var(--ui-warning-color)}:host([color="info"]) .typography{color:var(--ui-info-icon-color)}:host([color="textPrimary"]) .typography{color:var(--ui-text-color)}:host([color="textSecondary"]) .typography{color:var(--ui-text-color-muted)}:host([color="inherit"]) .typography{color:inherit}:host([align="left"]) .typography{text-align:left}:host([align="center"]) .typography{text-align:center}:host([align="right"]) .typography{text-align:right}:host([align="justify"]) .typography{text-align:justify}:host([noWrap]) .typography{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([gutterBottom]) .typography{margin-bottom:.35em}:host([paragraph]) .typography{margin-bottom:16px}';
var nl = Object.defineProperty, ll = Object.getOwnPropertyDescriptor, Tt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ll(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && nl(t, i, r), r;
};
let Ye = class extends c {
  constructor() {
    super(...arguments), this.variant = "body1", this.color = "textPrimary", this.align = "left", this.noWrap = !1, this.gutterBottom = !1, this.paragraph = !1;
  }
  _literalTag() {
    const e = this.component;
    return e ? {
      h1: S`h1`,
      h2: S`h2`,
      h3: S`h3`,
      h4: S`h4`,
      h5: S`h5`,
      h6: S`h6`,
      p: S`p`,
      span: S`span`,
      div: S`div`
    }[e] ?? S`p` : {
      h1: S`h1`,
      h2: S`h2`,
      h3: S`h3`,
      h4: S`h4`,
      h5: S`h5`,
      h6: S`h6`,
      subtitle1: S`h6`,
      subtitle2: S`h6`,
      body1: S`p`,
      body2: S`p`,
      caption: S`span`,
      overline: S`span`,
      inherit: S`p`
    }[this.variant] ?? S`p`;
  }
  render() {
    const e = this._literalTag(), t = `typography ${this.variant !== "inherit" ? this.variant : ""}`;
    return Xo`<${e} class="${t}"><slot></slot></${e}>`;
  }
};
Ye.styles = h(al);
Tt([
  s({ type: String, reflect: !0 })
], Ye.prototype, "variant", 2);
Tt([
  s({ type: String, reflect: !0 })
], Ye.prototype, "color", 2);
Tt([
  s({ type: String })
], Ye.prototype, "component", 2);
Tt([
  s({ type: String, reflect: !0 })
], Ye.prototype, "align", 2);
Tt([
  s({ type: Boolean, reflect: !0 })
], Ye.prototype, "noWrap", 2);
Tt([
  s({ type: Boolean, reflect: !0 })
], Ye.prototype, "gutterBottom", 2);
Tt([
  s({ type: Boolean, reflect: !0 })
], Ye.prototype, "paragraph", 2);
Ye = Tt([
  d("ui-typography")
], Ye);
const cl = ":host{display:block;font-family:var(--ui-font-family)}.item{display:flex;align-items:center;gap:12px;padding:8px 16px;min-height:40px;cursor:pointer;-webkit-user-select:none;user-select:none;font-size:.9375rem;color:var(--ui-text-color);background:transparent;border:none;width:100%;text-align:left;box-sizing:border-box;transition:background .12s;position:relative;outline:none;border-radius:0}.item:hover{background:var(--ui-hover-color)}.item:active{background:var(--ui-active-color)}.item:focus-visible{background:var(--ui-hover-color);outline:2px solid var(--ui-primary-color);outline-offset:-2px}:host([selected]) .item{background:var(--ui-primary-color-light);color:var(--ui-primary-color);font-weight:600}:host([selected]) .item:hover{background:var(--ui-primary-color-light-hover)}:host([disabled]) .item{opacity:.38;cursor:not-allowed;pointer-events:none}[hidden]{display:none!important}.icon-wrap{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;color:var(--ui-text-color-muted)}:host([selected]) .icon-wrap{color:var(--ui-primary-color)}.end-icon-wrap{display:flex;align-items:center;margin-left:auto;padding-left:16px;color:var(--ui-text-color-muted);font-size:.75rem}.label{flex:1;line-height:1.5}:host([dense]) .item{padding:4px 16px;min-height:32px;font-size:.875rem}:host([divider]){border-bottom:1px solid var(--ui-border-color);padding-bottom:4px;margin-bottom:4px}", dl = ":host{display:block;height:1px;background:var(--ui-border-color);margin:4px 0}", hl = ":host{display:block}.group-label{padding:6px 16px 2px;font-size:.6875rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ui-text-color-muted);-webkit-user-select:none;user-select:none}", pl = ":host{display:block;position:relative;--ui-menu-z-index: 1300;--ui-menu-min-width: 120px}.backdrop{display:none;position:fixed;inset:0;z-index:calc(var(--ui-menu-z-index) - 1)}.backdrop.open{display:block}.menu-paper{position:absolute;background:var(--ui-surface-1);border-radius:var(--ui-border-radius-md);box-shadow:var(--ui-shadow-md),var(--ui-shadow-lg);min-width:var(--ui-menu-min-width);z-index:var(--ui-menu-z-index);overflow:hidden;transform-origin:top left;transform:scale(.85);opacity:0;visibility:hidden;pointer-events:none;transition:transform .15s cubic-bezier(.4,0,.2,1),opacity .15s cubic-bezier(.4,0,.2,1),visibility .15s;padding:4px 0}.menu-paper.open{transform:scale(1);opacity:1;visibility:visible;pointer-events:auto}.pos-bottom-start{top:100%;left:0;transform-origin:top left}.pos-bottom-end{top:100%;right:0;transform-origin:top right}.pos-top-start{bottom:100%;left:0;transform-origin:bottom left}.pos-top-end{bottom:100%;right:0;transform-origin:bottom right}.pos-right-start{left:100%;top:0;transform-origin:top left}.pos-left-start{right:100%;top:0;transform-origin:top right}.menu-paper.scrollable{max-height:var(--ui-menu-max-height, 300px);overflow-y:auto}";
var ul = Object.defineProperty, fl = Object.getOwnPropertyDescriptor, H = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ul(t, i, r), r;
};
let Ke = class extends c {
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
  /** Returns only the default-slot label text, excluding icon slots. */
  _getLabelText() {
    return this.shadowRoot?.querySelector("slot:not([name])")?.assignedNodes({ flatten: !0 }).map((t) => t.textContent ?? "").join("").trim() ?? "";
  }
  _handleClick() {
    if (this.disabled) return;
    const e = this._getLabelText();
    this.dispatchEvent(new CustomEvent("ui-menu-item-select", {
      bubbles: !0,
      composed: !0,
      detail: {
        value: this.value !== void 0 ? this.value : e,
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
Ke.styles = h(cl);
H([
  s({ type: Boolean, reflect: !0 })
], Ke.prototype, "selected", 2);
H([
  s({ type: Boolean, reflect: !0 })
], Ke.prototype, "disabled", 2);
H([
  s({ type: Boolean, reflect: !0 })
], Ke.prototype, "dense", 2);
H([
  s({ type: Boolean, reflect: !0 })
], Ke.prototype, "divider", 2);
H([
  s({ type: String, reflect: !0 })
], Ke.prototype, "value", 2);
H([
  b()
], Ke.prototype, "_hasIcon", 2);
H([
  b()
], Ke.prototype, "_hasEndIcon", 2);
Ke = H([
  d("ui-menu-item")
], Ke);
let fo = class extends c {
  render() {
    return l``;
  }
};
fo.styles = h(dl);
fo = H([
  d("ui-menu-divider")
], fo);
let xr = class extends c {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return l`
            <div role="group" aria-label=${re(this.label || void 0)}>
                ${this.label ? l`<div class="group-label">${this.label}</div>` : ""}
                <slot></slot>
            </div>
        `;
  }
};
xr.styles = h(hl);
H([
  s({ type: String })
], xr.prototype, "label", 2);
xr = H([
  d("ui-menu-group")
], xr);
let $t = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.placement = "bottom-start", this.closeOnSelect = !0, this.scrollable = !1, this._boundKeyDown = (e) => {
      this.open && e.key === "Escape" && (e.stopPropagation(), this._close());
    }, this._boundNavKeyDown = (e) => {
      this.open && this._handleNavKeyDown(e);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._boundKeyDown), this.addEventListener("keydown", this._boundNavKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._boundKeyDown), this.removeEventListener("keydown", this._boundNavKeyDown);
  }
  // ── Focus management ───────────────────────────────────────────────────
  updated(e) {
    e.has("open") && this.open && setTimeout(() => {
      const t = this._getEnabledItems();
      t.length && this._focusItem(t[0]);
    }, 0);
  }
  // ── Navigation helpers ─────────────────────────────────────────────────
  _getEnabledItems() {
    return Array.from(this.querySelectorAll("ui-menu-item")).filter((e) => !e.disabled);
  }
  _focusItem(e) {
    const t = e.shadowRoot?.querySelector(".item") ?? e;
    typeof t.focus == "function" && (t.focus(), typeof t.scrollIntoView == "function" && t.scrollIntoView({ block: "nearest" }));
  }
  _handleNavKeyDown(e) {
    const t = this._getEnabledItems();
    if (!t.length) return;
    const i = t.findIndex(
      (o) => o.shadowRoot?.activeElement != null || document.activeElement === o
    );
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const o = i < 0 || i >= t.length - 1 ? 0 : i + 1;
        this._focusItem(t[o]);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const o = i <= 0 ? t.length - 1 : i - 1;
        this._focusItem(t[o]);
        break;
      }
      case "Home":
        e.preventDefault(), this._focusItem(t[0]);
        break;
      case "End":
        e.preventDefault(), this._focusItem(t[t.length - 1]);
        break;
      default:
        if (e.key.length === 1) {
          const o = e.key.toLowerCase(), r = i < 0 ? 0 : (i + 1) % t.length, n = [...t.slice(r), ...t.slice(0, r)].find((p) => (p.shadowRoot?.querySelector("slot:not([name])")?.assignedNodes({ flatten: !0 }).map((g) => g.textContent ?? "").join("").trim().toLowerCase() ?? "").startsWith(o));
          n && this._focusItem(n);
        }
    }
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
    const e = f({
      "menu-paper": !0,
      open: this.open,
      [`pos-${this.placement}`]: !!this.placement,
      scrollable: this.scrollable
    }), t = f({ backdrop: !0, open: this.open });
    return l`
            <div class=${t} @click=${this._close} aria-hidden="true"></div>
            <div
                class=${e}
                role="menu"
                aria-label=${re(this.label)}
                aria-hidden=${this.open ? "false" : "true"}
                @ui-menu-item-select=${this._handleItemSelect}
            >
                <slot></slot>
            </div>
        `;
  }
};
$t.styles = h(pl);
H([
  s({ type: Boolean, reflect: !0 })
], $t.prototype, "open", 2);
H([
  s({ type: String, reflect: !0 })
], $t.prototype, "placement", 2);
H([
  s({ type: Boolean, attribute: "close-on-select" })
], $t.prototype, "closeOnSelect", 2);
H([
  s({ type: Boolean })
], $t.prototype, "scrollable", 2);
H([
  s({ type: String })
], $t.prototype, "label", 2);
$t = H([
  d("ui-menu")
], $t);
const vl = ':host{display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px;font-family:var(--ui-font-family)}nav,ol,li{display:contents}.page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:36px;padding:0 6px;border-radius:4px;border:none;background:transparent;color:var(--ui-text-color);font-family:inherit;font-size:.875rem;font-weight:400;cursor:pointer;transition:background .15s,color .15s,border-color .15s;-webkit-user-select:none;user-select:none;box-sizing:border-box;outline:none;text-decoration:none}.page-btn:hover:not(:disabled){background:var(--ui-hover-color)}.page-btn:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}.page-btn.active{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:600}.page-btn:disabled{opacity:.38;cursor:default;pointer-events:none}.page-btn.ellipsis{cursor:default;pointer-events:none;color:var(--ui-text-color-muted)}:host([variant="outlined"]) .page-btn{border:1px solid var(--ui-border-color)}:host([variant="outlined"]) .page-btn.active{border-color:var(--ui-primary-color);background:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}:host([variant="outlined"]) .page-btn:hover:not(:disabled):not(.active){background:var(--ui-primary-color-light);border-color:var(--ui-primary-color)}:host([color="secondary"]) .page-btn.active{background:var(--ui-secondary-color)}:host([color="secondary"][variant="outlined"]) .page-btn.active{background:var(--ui-secondary-color);border-color:var(--ui-secondary-color)}:host([color="standard"]) .page-btn.active{background:var(--ui-text-color);color:var(--ui-text-color-on-primary)}:host([shape="rounded"]) .page-btn{border-radius:8px}:host([shape="circular"]) .page-btn{border-radius:50%;min-width:36px;aspect-ratio:1}:host([size="small"]) .page-btn{min-width:28px;height:28px;font-size:.8125rem}:host([size="small"][shape="circular"]) .page-btn{min-width:28px}:host([size="large"]) .page-btn{min-width:44px;height:44px;font-size:.9375rem}:host([disabled]) .page-btn{opacity:.38;pointer-events:none}svg{display:block}';
var bl = Object.defineProperty, gl = Object.getOwnPropertyDescriptor, ee = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? gl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && bl(t, i, r), r;
};
const ml = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`, yl = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`, xl = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`, _l = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`, wl = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
function Gr(e, t) {
  return Array.from({ length: t - e + 1 }, (i, o) => e + o);
}
function kl(e, t, i, o) {
  const r = Gr(1, Math.min(o, e)), a = Gr(Math.max(e - o + 1, o + 1), e), n = Math.max(
    Math.min(t - i, e - o - i * 2 - 1),
    o + 2
  ), p = Math.min(
    Math.max(t + i, o + i * 2 + 2),
    a.length > 0 ? a[0] - 2 : e - 1
  ), u = [
    ...r,
    ...n > o + 2 ? ["start-ellipsis"] : o + 1 < e - o ? [o + 1] : [],
    ...Gr(n, p),
    ...p < e - o - 1 ? ["end-ellipsis"] : e - o > o ? [e - o] : [],
    ...a
  ], y = /* @__PURE__ */ new Set();
  return u.filter((g) => {
    const T = String(g);
    return y.has(T) ? !1 : (y.add(T), !0);
  });
}
let U = class extends c {
  constructor() {
    super(...arguments), this.count = 1, this.page = 1, this.defaultPage = 1, this.label = "", this.variant = "text", this.shape = "circular", this.size = "medium", this.color = "primary", this.showFirstButton = !1, this.showLastButton = !1, this.hidePrevButton = !1, this.hideNextButton = !1, this.siblingCount = 1, this.boundaryCount = 1, this.disabled = !1, this._firstUpdate = !0;
  }
  willUpdate() {
    this._firstUpdate && this.defaultPage !== 1 && (this.page = this.defaultPage), this._firstUpdate = !1;
  }
  get _safeCount() {
    return Math.max(1, this.count);
  }
  get _safePage() {
    return Math.min(Math.max(1, this.page), this._safeCount);
  }
  _emit(e) {
    this.dispatchEvent(new CustomEvent("ui-pagination-change", {
      detail: { page: e },
      bubbles: !0,
      composed: !0
    }));
  }
  _go(e) {
    const t = this._safeCount, i = this._safePage;
    e < 1 || e > t || e === i || (this.page = e, this._emit(e));
  }
  _renderNavBtn(e, t, i, o, r, a) {
    return a ? v : l`
            <li>
                <button
                    class="page-btn"
                    aria-label=${e}
                    ?disabled=${r || this.disabled}
                    @click=${o}
                ><slot name=${t}>${i}</slot></button>
            </li>
        `;
  }
  render() {
    const e = this._safeCount, t = this._safePage, i = kl(e, t, this.siblingCount, this.boundaryCount), o = this.label || "pagination navigation";
    return l`
            <nav aria-label=${o}>
                <ol>
                    ${this._renderNavBtn("Go to first page", "first-icon", ml, () => this._go(1), t === 1, !this.showFirstButton)}
                    ${this._renderNavBtn("Go to previous page", "prev-icon", xl, () => this._go(t - 1), t === 1, this.hidePrevButton)}

                    ${i.map((r) => {
      if (r === "start-ellipsis" || r === "end-ellipsis")
        return l`
                            <li>
                                <button class="page-btn ellipsis" tabindex="-1" aria-hidden="true">
                                    <slot name="ellipsis-icon">${wl}</slot>
                                </button>
                            </li>`;
      const a = r === t;
      return l`
                        <li>
                            <button
                                class=${f({ "page-btn": !0, active: a })}
                                aria-label=${"Page " + r}
                                aria-current=${a ? "page" : v}
                                ?disabled=${this.disabled}
                                @click=${() => this._go(r)}
                            >${r}</button>
                        </li>
                    `;
    })}

                    ${this._renderNavBtn("Go to next page", "next-icon", _l, () => this._go(t + 1), t === e, this.hideNextButton)}
                    ${this._renderNavBtn("Go to last page", "last-icon", yl, () => this._go(e), t === e, !this.showLastButton)}
                </ol>
            </nav>
        `;
  }
};
U.styles = h(vl);
ee([
  s({ type: Number })
], U.prototype, "count", 2);
ee([
  s({ type: Number })
], U.prototype, "page", 2);
ee([
  s({ type: Number, attribute: "default-page" })
], U.prototype, "defaultPage", 2);
ee([
  s({ type: String })
], U.prototype, "label", 2);
ee([
  s({ type: String, reflect: !0 })
], U.prototype, "variant", 2);
ee([
  s({ type: String, reflect: !0 })
], U.prototype, "shape", 2);
ee([
  s({ type: String, reflect: !0 })
], U.prototype, "size", 2);
ee([
  s({ type: String, reflect: !0 })
], U.prototype, "color", 2);
ee([
  s({ type: Boolean, reflect: !0, attribute: "show-first-button" })
], U.prototype, "showFirstButton", 2);
ee([
  s({ type: Boolean, reflect: !0, attribute: "show-last-button" })
], U.prototype, "showLastButton", 2);
ee([
  s({ type: Boolean, reflect: !0, attribute: "hide-prev-button" })
], U.prototype, "hidePrevButton", 2);
ee([
  s({ type: Boolean, reflect: !0, attribute: "hide-next-button" })
], U.prototype, "hideNextButton", 2);
ee([
  s({ type: Number, attribute: "sibling-count" })
], U.prototype, "siblingCount", 2);
ee([
  s({ type: Number, attribute: "boundary-count" })
], U.prototype, "boundaryCount", 2);
ee([
  s({ type: Boolean, reflect: !0 })
], U.prototype, "disabled", 2);
U = ee([
  d("ui-pagination")
], U);
const $l = ':host{display:flex;align-items:center;position:relative;--action-size: 40px}.action-btn{display:inline-flex;align-items:center;justify-content:center;width:var(--action-size);height:var(--action-size);border-radius:50%;background:var(--ui-surface-1);color:var(--ui-text-color);border:none;cursor:pointer;box-shadow:0 3px 5px -1px #0003,0 6px 10px #00000024;transition:background .15s,box-shadow .15s,transform .15s;flex-shrink:0;outline:none;font-size:1.25rem}.action-btn:hover{background:var(--ui-surface-2);box-shadow:0 5px 8px -1px #00000040,0 8px 12px #00000029;transform:scale(1.08)}.action-btn:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:3px}:host([disabled]) .action-btn{opacity:.38;pointer-events:none}.tooltip{position:absolute;background:var(--ui-tooltip-bg);color:var(--ui-tooltip-text-color);font-family:var(--ui-font-family);font-size:.75rem;font-weight:500;letter-spacing:.02em;padding:4px 10px;border-radius:5px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}.tooltip.visible{opacity:1}:host([tooltip-placement="left"]) .tooltip{right:calc(100% + 10px);top:50%;transform:translateY(-50%)}:host([tooltip-placement="right"]) .tooltip{left:calc(100% + 10px);top:50%;transform:translateY(-50%)}:host([tooltip-placement="top"]) .tooltip{bottom:calc(100% + 10px);left:50%;transform:translate(-50%)}:host([tooltip-placement="bottom"]) .tooltip{top:calc(100% + 10px);left:50%;transform:translate(-50%)}', Sl = ':host{display:inline-flex;flex-direction:column;align-items:center;position:relative;--fab-size: 56px;--fab-bg: var(--ui-primary-color);--fab-color: var(--ui-text-color-on-primary);--action-gap: 12px}.actions{display:flex;align-items:center;gap:var(--action-gap)}:host([direction="up"]) .actions{flex-direction:column-reverse;margin-bottom:var(--action-gap)}:host([direction="down"]) .actions{flex-direction:column;margin-top:var(--action-gap)}:host([direction="left"]) .actions{flex-direction:row-reverse;margin-right:var(--action-gap)}:host([direction="right"]) .actions{flex-direction:row;margin-left:var(--action-gap)}:host([direction="up"]),:host([direction="down"]){flex-direction:column;align-items:center}:host([direction="left"]),:host([direction="right"]){flex-direction:row;align-items:center}:host([direction="up"]){flex-direction:column-reverse}.fab{display:inline-flex;align-items:center;justify-content:center;width:var(--fab-size);height:var(--fab-size);border-radius:50%;background:var(--fab-bg);color:var(--fab-color);border:none;cursor:pointer;box-shadow:0 6px 10px -2px #00000040,0 4px 5px #00000024;outline:none;font-size:1.5rem;transition:box-shadow .2s,background .2s;flex-shrink:0;position:relative;z-index:1}.fab:hover{box-shadow:0 8px 14px -2px #0000004d,0 6px 8px #00000029;background:var(--fab-bg-hover, var(--ui-primary-color-hover))}.fab:focus-visible{outline:3px solid var(--ui-primary-color);outline-offset:3px}.fab-icon{display:flex;align-items:center;justify-content:center;transition:transform .25s cubic-bezier(.4,0,.2,1),opacity .2s}.fab-icon.close-icon{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:rotate(-45deg)}:host([open]) .fab-icon.open-icon{opacity:0;transform:rotate(45deg)}:host([open]) .fab-icon.close-icon{opacity:1;transform:rotate(0)}::slotted(ui-speed-dial-action){opacity:0;transform:scale(.6);transition:opacity .18s ease,transform .18s cubic-bezier(.4,0,.2,1);pointer-events:none}:host([open]) ::slotted(ui-speed-dial-action){opacity:1;transform:scale(1);pointer-events:auto}.backdrop{display:none;position:fixed;inset:0;z-index:-1}:host([open]) .backdrop{display:block}:host([disabled]) .fab{opacity:.38;pointer-events:none;cursor:default}:host([hidden]){display:none!important}svg{display:block}';
var Cl = Object.defineProperty, Il = Object.getOwnPropertyDescriptor, Y = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Il(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Cl(t, i, r), r;
};
let st = class extends c {
  constructor() {
    super(...arguments), this.name = "", this.tooltipTitle = "", this.tooltipOpen = !1, this.tooltipPlacement = "left", this.disabled = !1, this._hovered = !1;
  }
  _handleClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-speed-dial-action-click", {
      bubbles: !0,
      composed: !0,
      detail: { name: this.name, tooltipTitle: this.tooltipTitle }
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
                <div class="tooltip ${f({ visible: this._tooltipVisible })}">
                    ${this.tooltipTitle}
                </div>
            ` : v}
        `;
  }
};
st.styles = h($l);
Y([
  s({ type: String })
], st.prototype, "name", 2);
Y([
  s({ type: String, attribute: "tooltip-title" })
], st.prototype, "tooltipTitle", 2);
Y([
  s({ type: Boolean, attribute: "tooltip-open" })
], st.prototype, "tooltipOpen", 2);
Y([
  s({ type: String, reflect: !0, attribute: "tooltip-placement" })
], st.prototype, "tooltipPlacement", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], st.prototype, "disabled", 2);
Y([
  b()
], st.prototype, "_hovered", 2);
st = Y([
  d("ui-speed-dial-action")
], st);
let Se = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.defaultOpen = !1, this.direction = "up", this.hidden = !1, this.disabled = !1, this.persistentTooltips = !1, this.closeIcon = "", this.ariaLabel = "Speed dial", this.isTouch = !1, this._firstUpdate = !0, this._onHostKeyDown = (e) => {
      if (this.disabled) return;
      const { key: t } = e, i = this.shadowRoot?.activeElement?.classList.contains("fab") ?? !1, o = this._focusedActionIndex(), r = o !== -1;
      if (t === "Escape") {
        this.open && (e.preventDefault(), e.stopPropagation(), this._setOpen(!1), this._focusFab());
        return;
      }
      if ((t === "Home" || t === "End") && this.open && r) {
        e.preventDefault();
        const n = this._actionButtons();
        n.length && n[t === "Home" ? 0 : n.length - 1].focus();
        return;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t)) {
        if (e.preventDefault(), !this.open) {
          const n = t === "ArrowDown" || t === "ArrowRight";
          this._setOpen(!0), this.updateComplete.then(() => {
            const p = this._actionButtons();
            p[n ? 0 : p.length - 1]?.focus();
          });
          return;
        }
        if (r) {
          const n = t === "ArrowUp" || t === "ArrowLeft";
          this._focusActionAt(n ? o - 1 : o + 1);
        } else if (i) {
          const n = this._actionButtons();
          n[t === "ArrowDown" || t === "ArrowRight" ? 0 : n.length - 1]?.focus();
        }
      }
    }, this._suppressNextOpen = !1, this._onHostFocusOut = (e) => {
      this.open && !this.contains(e.relatedTarget) && this._setOpen(!1);
    };
  }
  /* ── Lifecycle ───────────────────────────────────────────────── */
  willUpdate(e) {
    this._firstUpdate && this.defaultOpen && (this.open = !0), this._firstUpdate && (this._firstUpdate = !1);
  }
  connectedCallback() {
    super.connectedCallback(), !this.hasAttribute("is-touch") && typeof window.matchMedia == "function" && (this.isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches), this.addEventListener("keydown", this._onHostKeyDown), this.addEventListener("focusout", this._onHostFocusOut);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onHostKeyDown), this.removeEventListener("focusout", this._onHostFocusOut), super.disconnectedCallback();
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
    this.disabled || this._setOpen(!this.open);
  }
  /** Opens the dial when FAB receives keyboard focus from outside the component. */
  _onFabFocus(e) {
    this._suppressNextOpen || e.relatedTarget !== null && !this.open && this._setOpen(!0);
  }
  /* ── Action click → close ────────────────────────────────────── */
  _onActionClick() {
    this._suppressNextOpen = !0, this._setOpen(!1), this._focusFab(), Promise.resolve().then(() => {
      this._suppressNextOpen = !1;
    });
  }
  /* ── Tooltip helpers ─────────────────────────────────────────── */
  /** True for directions where the first DOM action is visually farthest from the FAB. */
  _isReversedDirection() {
    return this.direction === "up" || this.direction === "left";
  }
  _updateActionTooltips() {
    const e = this.querySelectorAll("ui-speed-dial-action"), t = this.persistentTooltips || this.isTouch, i = this._tooltipPlacement(), o = this._isReversedDirection(), r = e.length;
    e.forEach((a, n) => {
      a.setAttribute("tooltip-placement", i), t && this.open ? a.setAttribute("tooltip-open", "") : a.removeAttribute("tooltip-open");
      const p = o ? r - 1 - n : n, u = o ? n : r - 1 - n;
      a.style.transitionDelay = this.open ? `${p * 40}ms` : `${u * 30}ms`;
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
  /* ── Render ──────────────────────────────────────────────────── */
  render() {
    return l`
            <!-- Click-away backdrop -->
            <div class="backdrop" @click=${() => this._setOpen(!1)}></div>

            <!-- Actions — action-click events bubble up here -->
            <div
                id="sd-menu"
                class="actions"
                role="menu"
                aria-label="Speed dial actions"
                aria-hidden=${this.open ? "false" : "true"}
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
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="menu"
                aria-controls="sd-menu"
                aria-disabled=${this.disabled ? "true" : v}
                ?disabled=${this.disabled}
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
                    <slot name="open-icon">
                        ${this.closeIcon ? l`<span style="line-height:1;font-size:1.5rem;">${this.closeIcon}</span>` : l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`}
                    </slot>
                </span>
            </button>
        `;
  }
};
Se.styles = h(Sl);
Y([
  s({ type: Boolean, reflect: !0 })
], Se.prototype, "open", 2);
Y([
  s({ type: Boolean, attribute: "default-open" })
], Se.prototype, "defaultOpen", 2);
Y([
  s({ type: String, reflect: !0 })
], Se.prototype, "direction", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], Se.prototype, "hidden", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], Se.prototype, "disabled", 2);
Y([
  s({ type: Boolean, attribute: "persistent-tooltips" })
], Se.prototype, "persistentTooltips", 2);
Y([
  s({ type: String, attribute: "close-icon" })
], Se.prototype, "closeIcon", 2);
Y([
  s({ type: String, attribute: "aria-label" })
], Se.prototype, "ariaLabel", 2);
Y([
  s({ type: Boolean, attribute: "is-touch" })
], Se.prototype, "isTouch", 2);
Se = Y([
  d("ui-speed-dial")
], Se);
const Pl = ':host{display:block}.line{background:var(--ui-stepper-connector-color);border-radius:2px;transition:background .3s}.line.completed{background:var(--ui-primary-color)}:host([orientation="horizontal"]) .line{height:2px;width:100%}:host([orientation="vertical"]) .line{width:2px;min-height:24px;margin:0 auto}', zl = ":host{display:block}.label{font-size:.875rem;font-weight:500;color:var(--ui-text-color);font-family:var(--ui-font-family);line-height:1.4}.optional{font-size:.75rem;color:var(--ui-text-color-muted);font-style:italic}:host([active]) .label{color:var(--ui-primary-color);font-weight:600}:host([disabled]) .label{color:var(--ui-text-color-muted)}:host([error]) .label{color:var(--ui-error-color)}", Dl = ":host{display:block;overflow:hidden}.panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .25s ease}.panel.open{grid-template-rows:1fr}.inner{overflow:hidden;padding:0 16px;transition:padding .25s ease}.panel.open .inner{padding:8px 16px 16px}.content{font-size:.875rem;color:var(--ui-text-color);font-family:var(--ui-font-family)}", El = ':host{display:flex;flex:1 1 0;min-width:0;font-family:var(--ui-font-family)}:host([orientation="horizontal"]){align-items:flex-start;padding-top:4px}:host([orientation="vertical"]){flex-direction:column;flex:none;width:100%}:host([alternative-label]){flex-direction:column;align-items:center;flex:1;min-width:0}.conn-wrap{flex:1 1 auto;min-width:12px;display:flex;align-items:flex-start;padding-top:15px}.conn-wrap ui-step-connector{flex:1}.alt-top{display:flex;align-items:center;width:100%}.alt-top .conn-fill{flex:1;display:flex;align-items:center}.alt-top .conn-fill ui-step-connector{flex:1}.step-header{display:flex;align-items:flex-start;gap:14px;min-width:0}.step-header ui-step-label,.step-btn ui-step-label{padding-top:5px;min-width:0}:host([alternative-label]) .alt-label-row{margin-top:8px;text-align:center;min-width:0;width:100%}.step-btn{background:none;border:none;padding:0;cursor:pointer;font-family:inherit;border-radius:6px;outline:none;display:flex;align-items:flex-start;gap:14px;min-width:0;text-align:left}.step-btn:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:3px}:host([disabled]) .step-btn{cursor:default}:host([alternative-label]) .step-btn{flex-direction:column;align-items:center;gap:0}.v-body{display:flex;margin-left:15px;min-height:16px}.v-line{width:2px;background:var(--ui-stepper-connector-color);border-radius:2px;flex-shrink:0;transition:background .3s;margin-right:14px}.v-line.completed{background:var(--ui-primary-color)}:host([last]) .v-line{background:transparent}.v-content{flex:1;padding-bottom:8px;min-width:0}.icon-circle{width:var(--ui-stepper-icon-size, 32px);height:var(--ui-stepper-icon-size, 32px);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8125rem;font-weight:700;border:2px solid var(--ui-input-border-color);color:var(--ui-text-color-muted);background:transparent;transition:all .2s;flex-shrink:0;box-sizing:border-box}.icon-circle.active{background:var(--ui-primary-color);border-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary);box-shadow:0 0 0 4px var(--ui-primary-focus-ring)}.icon-circle.completed{background:var(--ui-primary-color);border-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.icon-circle.error{border-color:var(--ui-error-color);color:var(--ui-error-color)}:host([disabled]) .icon-circle{opacity:.4}', Ol = ":host{display:block;font-family:var(--ui-font-family)}.stepper{display:flex;padding:16px 24px;background:var(--ui-surface-1)}.stepper.horizontal{align-items:stretch;flex-direction:row}.stepper.vertical{flex-direction:column;gap:0}.stepper.alt{align-items:flex-start}", Tl = ':host{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;gap:8px;background:var(--ui-surface-1);font-family:var(--ui-font-family)}:host([position="static"]){border:1px solid var(--ui-border-color);border-radius:8px}:host([position="bottom"]){border-top:1px solid var(--ui-border-color)}:host([position="top"]){border-bottom:1px solid var(--ui-border-color)}.progress{display:flex;align-items:center;justify-content:center;flex:1;gap:0}.text{font-size:.8rem;color:var(--ui-text-color-muted)}.dots{display:flex;gap:6px}.dot{width:10px;height:10px;border-radius:50%;background:var(--ui-input-border-color);transition:background .2s}.dot.active{background:var(--ui-primary-color)}.bar-track{flex:1;height:4px;background:var(--ui-border-color);border-radius:2px;overflow:hidden}.bar-fill{height:100%;background:var(--ui-primary-color);border-radius:2px;transition:width .3s}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.nav-btn{padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;cursor:pointer;transition:opacity .15s}.nav-btn:disabled{opacity:.38;cursor:default}.nav-btn.back{background:var(--ui-surface-1);color:var(--ui-text-color);border:1px solid var(--ui-border-color)}.nav-btn.next{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);border:none}';
var Al = Object.defineProperty, Bl = Object.getOwnPropertyDescriptor, _ = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Al(t, i, r), r;
};
const Ml = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`, Ll = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
let Xi = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.completed = !1;
  }
  render() {
    return l`<div class="line ${f({ completed: this.completed })}"></div>`;
  }
};
Xi.styles = h(Pl);
_([
  s({ reflect: !0 })
], Xi.prototype, "orientation", 2);
_([
  s({ type: Boolean })
], Xi.prototype, "completed", 2);
Xi = _([
  d("ui-step-connector")
], Xi);
let xi = class extends c {
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
xi.styles = h(zl);
_([
  s({ type: Boolean, reflect: !0 })
], xi.prototype, "active", 2);
_([
  s({ type: Boolean, reflect: !0 })
], xi.prototype, "disabled", 2);
_([
  s({ type: Boolean, reflect: !0 })
], xi.prototype, "error", 2);
xi = _([
  d("ui-step-label")
], xi);
let _r = class extends c {
  constructor() {
    super(...arguments), this.open = !0;
  }
  render() {
    return l`
            <div
                class="panel ${f({ open: this.open })}"
                aria-hidden=${this.open ? "false" : "true"}
            >
                <div class="inner">
                    <div class="content"><slot></slot></div>
                </div>
            </div>`;
  }
};
_r.styles = h(Dl);
_([
  s({ type: Boolean, reflect: !0 })
], _r.prototype, "open", 2);
_r = _([
  d("ui-step-content")
], _r);
let oe = class extends c {
  constructor() {
    super(...arguments), this.active = !1, this.completed = !1, this.disabled = !1, this.optional = !1, this.error = !1, this.last = !1, this.clickable = !1, this.orientation = "horizontal", this.alternativeLabel = !1, this.stepIndex = 0, this.optionalLabel = "Optional", this.prevCompleted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "listitem");
  }
  _fire() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-step-click", { detail: { index: this.stepIndex }, bubbles: !0, composed: !0 }));
  }
  _icon() {
    const e = { "icon-circle": !0, active: this.active, completed: this.completed, error: this.error }, t = this.error ? Ll : this.completed ? Ml : l`<slot name="icon">${this.stepIndex + 1}</slot>`;
    return l`<div class=${f(e)}>${t}</div>`;
  }
  _label() {
    return l`
            <ui-step-label ?active=${this.active} ?disabled=${this.disabled} ?error=${this.error}>
                <slot name="label"></slot>
                ${this.optional ? l`<span slot="optional">${this.optionalLabel}</span>` : v}
            </ui-step-label>`;
  }
  _connector(e = !1) {
    return l`<ui-step-connector orientation=${this.orientation} ?completed=${e}></ui-step-connector>`;
  }
  render() {
    const e = this.stepIndex > 0;
    if (this.orientation === "vertical") {
      const i = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : v}>${this._icon()} ${this._label()}</button>` : l`<div class="step-header">${this._icon()} ${this._label()}</div>`;
      return l`
                ${i}
                <div class="v-body">
                    <div class="v-line ${f({ completed: this.completed })}"></div>
                    <div class="v-content"><slot></slot></div>
                </div>`;
    }
    if (this.alternativeLabel) {
      const i = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : v}>${this._icon()}</button>` : this._icon();
      return l`
                <div class="alt-top">
                    <div class="conn-fill">${e ? this._connector(this.prevCompleted) : v}</div>
                    ${i}
                    <div class="conn-fill"></div>
                </div>
                <div class="alt-label-row">${this._label()}</div>`;
    }
    const t = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : v}>${this._icon()} ${this._label()}</button>` : l`<div class="step-header">${this._icon()} ${this._label()}</div>`;
    return l`
            ${e ? l`<div class="conn-wrap">${this._connector(this.prevCompleted)}</div>` : v}
            ${t}`;
  }
};
oe.styles = h(El);
_([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "active", 2);
_([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "completed", 2);
_([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "disabled", 2);
_([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "optional", 2);
_([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "error", 2);
_([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "last", 2);
_([
  s({ type: Boolean, reflect: !0 })
], oe.prototype, "clickable", 2);
_([
  s({ type: String, reflect: !0 })
], oe.prototype, "orientation", 2);
_([
  s({ type: Boolean, reflect: !0, attribute: "alternative-label" })
], oe.prototype, "alternativeLabel", 2);
_([
  s({ type: Number, attribute: "step-index" })
], oe.prototype, "stepIndex", 2);
_([
  s({ type: String, attribute: "optional-label" })
], oe.prototype, "optionalLabel", 2);
_([
  s({ type: Boolean, attribute: "prev-completed" })
], oe.prototype, "prevCompleted", 2);
oe = _([
  d("ui-step")
], oe);
let St = class extends c {
  constructor() {
    super(...arguments), this.activeStep = 0, this.orientation = "horizontal", this.alternativeLabel = !1, this.nonLinear = !1, this.label = "steps", this._onStepClick = (e) => {
      this.activeStep = e.detail.index, this.dispatchEvent(new CustomEvent("ui-step-change", { detail: { step: e.detail.index }, bubbles: !0, composed: !0 })), this._syncSteps();
    };
  }
  _syncSteps() {
    const e = Array.from(this.querySelectorAll(":scope > ui-step"));
    e.forEach((t, i) => {
      t.stepIndex = i, t.last = i === e.length - 1, t.orientation = this.orientation, t.alternativeLabel = this.alternativeLabel, t.active = i === this.activeStep, t.prevCompleted = i > 0 && e[i - 1].completed, this.nonLinear ? (t.disabled = !1, t.clickable = !0) : (t.completed || (t.disabled = i > this.activeStep), t.clickable = !1);
    });
  }
  firstUpdated() {
    this._syncSteps();
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
            <div class=${e} role="list" aria-label=${this.label}>
                <slot @slotchange=${() => {
      this._syncSteps(), this.requestUpdate();
    }}></slot>
            </div>`;
  }
};
St.styles = h(Ol);
_([
  s({ type: Number, attribute: "active-step" })
], St.prototype, "activeStep", 2);
_([
  s({ type: String, reflect: !0 })
], St.prototype, "orientation", 2);
_([
  s({ type: Boolean, attribute: "alternative-label" })
], St.prototype, "alternativeLabel", 2);
_([
  s({ type: Boolean, attribute: "non-linear" })
], St.prototype, "nonLinear", 2);
_([
  s({ type: String })
], St.prototype, "label", 2);
St = _([
  d("ui-stepper")
], St);
let at = class extends c {
  constructor() {
    super(...arguments), this.steps = 0, this.activeStep = 0, this.variant = "dots", this.position = "static", this.backLabel = "Back", this.nextLabel = "Next";
  }
  /** Guards against steps=0 (divide-by-zero, nonsensical UI). */
  get _safeSteps() {
    return Math.max(1, this.steps);
  }
  _emit(e) {
    this.dispatchEvent(new CustomEvent(e, { bubbles: !0, composed: !0 }));
  }
  _progress() {
    const e = this.activeStep + 1, t = this._safeSteps;
    if (this.variant === "text")
      return l`<span class="text" aria-live="polite">Step ${e} of ${t}</span>`;
    if (this.variant === "dots")
      return l`
                <div class="dots" aria-label="Step ${e} of ${t}">
                    <span class="sr-only" aria-live="polite">Step ${e} of ${t}</span>
                    ${Array.from({ length: t }, (o, r) => l`<div class="dot ${r === this.activeStep ? "active" : ""}"></div>`)}
                </div>`;
    const i = t > 1 ? this.activeStep / (t - 1) * 100 : 100;
    return l`
            <div
                class="bar-track"
                role="progressbar"
                aria-valuenow=${e}
                aria-valuemin="1"
                aria-valuemax=${t}
                aria-label="Step ${e} of ${t}"
            >
                <div class="bar-fill" style="width:${i}%"></div>
            </div>`;
  }
  render() {
    return l`
            <slot name="back-button">
                <button
                    class="nav-btn back"
                    ?disabled=${this.activeStep === 0}
                    aria-label="Go to previous step"
                    @click=${() => this._emit("ui-mobile-step-back")}
                >${this.backLabel}</button>
            </slot>
            <div class="progress">${this._progress()}</div>
            <slot name="next-button">
                <button
                    class="nav-btn next"
                    ?disabled=${this.activeStep >= this._safeSteps - 1}
                    aria-label="Go to next step"
                    @click=${() => this._emit("ui-mobile-step-next")}
                >${this.nextLabel}</button>
            </slot>`;
  }
};
at.styles = h(Tl);
_([
  s({ type: Number })
], at.prototype, "steps", 2);
_([
  s({ type: Number, attribute: "active-step" })
], at.prototype, "activeStep", 2);
_([
  s({ type: String })
], at.prototype, "variant", 2);
_([
  s({ type: String, reflect: !0 })
], at.prototype, "position", 2);
_([
  s({ type: String, attribute: "back-label" })
], at.prototype, "backLabel", 2);
_([
  s({ type: String, attribute: "next-label" })
], at.prototype, "nextLabel", 2);
at = _([
  d("ui-mobile-stepper")
], at);
const Ul = ":host{display:inline-flex;position:relative;background:var(--ui-background)}:host([full-width]){flex:1}.tab{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:var(--ui-tab-padding-y, 10px) var(--ui-tab-padding-x, 16px);min-height:var(--ui-tab-min-height, 48px);border:none;background:none;cursor:pointer;font-family:var(--ui-font-family);font-size:var(--ui-tab-font-size, .875rem);font-weight:var(--ui-tab-font-weight, 500);line-height:1.25;color:var(--ui-tab-inactive-color);white-space:nowrap;border-radius:0;outline:none;transition:color .2s,background .15s;box-sizing:border-box;width:100%;text-decoration:none;-webkit-tap-highlight-color:transparent}.tab:hover:not(:disabled):not([aria-disabled=true]){color:var(--ui-tab-active-color);background:var(--ui-tab-hover-bg, var(--ui-primary-color-light))}.tab:focus-visible{outline:2px solid var(--ui-tab-active-color);outline-offset:-2px}:host([selected]) .tab{color:var(--ui-tab-active-color);font-weight:var(--ui-tab-font-weight-active, 600)}.tab:disabled{opacity:var(--ui-tab-disabled-opacity, .38);cursor:not-allowed}.icon-top{flex-direction:column;min-height:var(--ui-tab-icon-min-height, 72px)}.icon-bottom{flex-direction:column-reverse;min-height:var(--ui-tab-icon-min-height, 72px)}.icon-start{flex-direction:row}.icon-end{flex-direction:row-reverse}.icon-slot{display:contents;line-height:0}", jl = ":host{display:block;background:var(--ui-background)}:host([hidden]){display:none!important}.panel{padding:var(--ui-tab-panel-padding, 24px);font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color);line-height:1.6}", Rl = ':host{display:block;position:relative;background:var(--ui-background)}:host([orientation="vertical"]){height:100%}:host([orientation="vertical"]) .container{height:100%}.container{display:flex;align-items:center;position:relative;border-bottom:1px solid var(--ui-tab-border-color, var(--ui-border-color))}:host([orientation="vertical"]) .container{flex-direction:column;border-bottom:none;border-right:1px solid var(--ui-tab-border-color, var(--ui-border-color));align-items:stretch}.scroll-btn{flex-shrink:0;display:flex;align-items:center;justify-content:center;border:none;background:none;cursor:pointer;color:var(--ui-text-color-muted);border-radius:4px;padding:0;transition:color .15s,background .15s}:host(:not([orientation="vertical"])) .scroll-btn{width:var(--ui-tab-scroll-btn-size, 40px);height:var(--ui-tab-scroll-btn-size, 40px)}:host([orientation="vertical"]) .scroll-btn{width:100%;height:var(--ui-tab-scroll-btn-size, 40px)}.scroll-btn:hover:not(:disabled){color:var(--ui-text-color);background:var(--ui-hover-color)}.scroll-btn:disabled{opacity:.38;cursor:default}.scroll-area{flex:1;position:relative;min-height:0;scrollbar-width:none;-ms-overflow-style:none}.scroll-area::-webkit-scrollbar{display:none}:host(:not([orientation="vertical"])) .scroll-area{overflow-x:auto;overflow-y:hidden}:host([orientation="vertical"]) .scroll-area{overflow-y:auto;overflow-x:hidden}.tabs-row{display:flex;position:relative;min-width:max-content}:host([orientation="vertical"]) .tabs-row{flex-direction:column;min-width:unset;min-height:max-content}:host([variant="fullWidth"]) .tabs-row{min-width:100%}:host([variant="fullWidth"]) ::slotted(ui-tab){flex:1}:host([centered]) .tabs-row{justify-content:center;min-width:100%}.indicator{position:absolute;pointer-events:none;opacity:0;background:var(--ui-tab-indicator-color, var(--ui-tabs-ind-color, var(--ui-primary-color)));border-radius:var(--ui-tab-indicator-radius, 3px);transition:left .25s cubic-bezier(.4,0,.2,1),width .25s cubic-bezier(.4,0,.2,1),top .25s cubic-bezier(.4,0,.2,1),height .25s cubic-bezier(.4,0,.2,1),opacity .15s}:host(:not([orientation="vertical"])) .indicator{bottom:0;height:var(--ui-tab-indicator-height, 3px)}:host([orientation="vertical"]) .indicator{right:0;width:var(--ui-tab-indicator-width, 3px)}', Nl = ':host{display:block;font-family:var(--ui-font-family);background:var(--ui-background)}:host([orientation="vertical"]) .root{display:flex;flex-direction:row;height:100%;min-height:inherit}.root{display:block}';
var Vl = Object.defineProperty, Fl = Object.getOwnPropertyDescriptor, $ = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Fl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Vl(t, i, r), r;
};
const Fr = (e) => l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${e}"/></svg>`, ql = () => Fr("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"), Hl = () => Fr("M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"), Yl = () => Fr("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"), Kl = () => Fr("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
let nt = class extends c {
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
    const e = f({ tab: !0, [`icon-${this.iconPosition}`]: !0 });
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
nt.styles = h(Ul);
$([
  s({ reflect: !0 })
], nt.prototype, "value", 2);
$([
  s({ type: Boolean, reflect: !0 })
], nt.prototype, "disabled", 2);
$([
  s({ type: Boolean, reflect: !0 })
], nt.prototype, "selected", 2);
$([
  s({ attribute: "icon-position", reflect: !0 })
], nt.prototype, "iconPosition", 2);
$([
  s()
], nt.prototype, "href", 2);
$([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], nt.prototype, "fullWidth", 2);
nt = $([
  d("ui-tab")
], nt);
let wr = class extends c {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return l`<div class="panel" role="tabpanel"><slot></slot></div>`;
  }
};
wr.styles = h(jl);
$([
  s({ reflect: !0 })
], wr.prototype, "value", 2);
wr = $([
  d("ui-tab-panel")
], wr);
let le = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.variant = "standard", this.centered = !1, this.scrollButtons = "auto", this.ariaLabel = "", this._canBack = !1, this._canFwd = !1;
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
    const t = this._row.getBoundingClientRect(), i = e.getBoundingClientRect();
    !i.width && !i.height || (this.orientation === "horizontal" ? (this._ind.style.left = `${i.left - t.left}px`, this._ind.style.width = `${i.width}px`, this._ind.style.top = "", this._ind.style.height = "") : (this._ind.style.top = `${i.top - t.top}px`, this._ind.style.height = `${i.height}px`, this._ind.style.left = "", this._ind.style.width = ""), this._ind.style.opacity = "1");
  }
  _scroll(e) {
    this.orientation === "horizontal" ? this._area.scrollBy({ left: e, behavior: "smooth" }) : this._area.scrollBy({ top: e, behavior: "smooth" });
  }
  /** Keyboard navigation across tabs */
  _onKey(e) {
    const t = this.orientation === "horizontal", i = t ? "ArrowLeft" : "ArrowUp", o = t ? "ArrowRight" : "ArrowDown";
    if (![i, o, "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const r = this._tabs().filter((p) => !p.disabled), a = r.findIndex((p) => p.shadowRoot?.activeElement != null || p === document.activeElement);
    let n = a < 0 ? 0 : a;
    e.key === i && (n = (n - 1 + r.length) % r.length), e.key === o && (n = (n + 1) % r.length), e.key === "Home" && (n = 0), e.key === "End" && (n = r.length - 1), r[n]?.focusInner(), typeof r[n].scrollIntoView == "function" && r[n].scrollIntoView({ block: "nearest", inline: "nearest" }), r[n]?.dispatchEvent(new CustomEvent("ui-tab-click", {
      detail: { value: r[n].value },
      bubbles: !0,
      composed: !0
    }));
  }
  _onSlotChange() {
    this._checkScroll(), requestAnimationFrame(() => this.syncIndicator());
  }
  render() {
    const e = this.variant === "scrollable" && this.scrollButtons !== "false", t = this.orientation === "vertical", i = e ? l`
            <button class="scroll-btn" aria-label="Scroll back"
                ?disabled=${!this._canBack}
                @click=${() => this._scroll(-200)}>
                ${t ? Yl() : ql()}
            </button>` : v, o = e ? l`
            <button class="scroll-btn" aria-label="Scroll forward"
                ?disabled=${!this._canFwd}
                @click=${() => this._scroll(200)}>
                ${t ? Kl() : Hl()}
            </button>` : v;
    return l`
            <div class="container">
                ${i}
                <div class="scroll-area" @keydown=${this._onKey}>
                    <div class="tabs-row" role="tablist" aria-label=${this.ariaLabel || v}>
                        <slot @slotchange=${this._onSlotChange}></slot>
                        <div class="indicator"></div>
                    </div>
                </div>
                ${o}
            </div>`;
  }
};
le.styles = h(Rl);
$([
  s({ reflect: !0 })
], le.prototype, "orientation", 2);
$([
  s({ reflect: !0 })
], le.prototype, "variant", 2);
$([
  s({ type: Boolean, reflect: !0 })
], le.prototype, "centered", 2);
$([
  s({ attribute: "scroll-buttons" })
], le.prototype, "scrollButtons", 2);
$([
  s({ attribute: "aria-label" })
], le.prototype, "ariaLabel", 2);
$([
  b()
], le.prototype, "_canBack", 2);
$([
  b()
], le.prototype, "_canFwd", 2);
$([
  zt(".scroll-area")
], le.prototype, "_area", 2);
$([
  zt(".tabs-row")
], le.prototype, "_row", 2);
$([
  zt(".indicator")
], le.prototype, "_ind", 2);
$([
  zt("slot")
], le.prototype, "_slot", 2);
le = $([
  d("ui-tab-list")
], le);
let Be = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.orientation = "horizontal", this.variant = "standard", this.centered = !1, this.scrollButtons = "auto", this.textColor = "primary", this.indicatorColor = "primary", this.defaultValue = "", this._firstUpdate = !0, this._onTabClick = (e) => {
      this.value = e.detail.value, this.dispatchEvent(new CustomEvent("ui-tab-change", {
        detail: { value: e.detail.value },
        bubbles: !0,
        composed: !0
      })), this._syncAll();
    };
  }
  willUpdate() {
    this._firstUpdate && this.defaultValue && !this.value && (this.value = this.defaultValue), this._firstUpdate && (this._firstUpdate = !1);
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
    const e = this.querySelector("ui-tab-list"), t = Array.from(this.querySelectorAll("ui-tab")), i = Array.from(this.querySelectorAll("ui-tab-panel"));
    let o = this.value;
    if (!o) {
      const n = t.find((p) => !p.disabled);
      n && (o = n.value, this.value = n.value);
    }
    e && (e.orientation = this.orientation, e.variant = this.variant, e.centered = this.centered, e.scrollButtons = this.scrollButtons, e.style.setProperty("--ui-tabs-ind-color", this._resolveColor(this.indicatorColor)));
    const r = this._resolveColor(this.textColor), a = this.textColor === "inherit" ? "currentColor" : "#6b7280";
    t.forEach((n) => {
      n.selected = n.value === o, n.fullWidth = this.variant === "fullWidth", n.style.setProperty("--ui-tab-active", r), n.style.setProperty("--ui-tab-inactive", a), n.setAttribute("id", `tab-${n.value}`), n.setAttribute("aria-controls", `panel-${n.value}`);
    }), i.forEach((n) => {
      n.setAttribute("id", `panel-${n.value}`), n.setAttribute("aria-labelledby", `tab-${n.value}`), n.value === o ? n.removeAttribute("hidden") : n.setAttribute("hidden", "");
    }), requestAnimationFrame(() => e?.syncIndicator());
  }
  updated(e) {
    ["value", "orientation", "variant", "centered", "scrollButtons", "textColor", "indicatorColor"].some((i) => e.has(i)) && this._syncAll();
  }
  render() {
    return l`
            <div class="root">
                <slot @slotchange=${() => this._syncAll()}></slot>
            </div>`;
  }
};
Be.styles = h(Nl);
$([
  s({ reflect: !0 })
], Be.prototype, "value", 2);
$([
  s({ reflect: !0 })
], Be.prototype, "orientation", 2);
$([
  s()
], Be.prototype, "variant", 2);
$([
  s({ type: Boolean })
], Be.prototype, "centered", 2);
$([
  s({ attribute: "scroll-buttons" })
], Be.prototype, "scrollButtons", 2);
$([
  s({ attribute: "text-color" })
], Be.prototype, "textColor", 2);
$([
  s({ attribute: "indicator-color" })
], Be.prototype, "indicatorColor", 2);
$([
  s({ attribute: "default-value" })
], Be.prototype, "defaultValue", 2);
Be = $([
  d("ui-tabs")
], Be);
const Wl = ":host{display:block}";
var Gl = Object.defineProperty, Xl = Object.getOwnPropertyDescriptor, k = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Gl(t, i, r), r;
};
const Zl = /* @__PURE__ */ new Set([
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
let w = class extends c {
  constructor() {
    super(...arguments), this.component = "div";
  }
  get _safeComponent() {
    return Zl.has(this.component) ? this.component : (console.warn(`[ui-box] Unknown component tag "${this.component}", falling back to "div".`), "div");
  }
  _getStyles() {
    const e = {};
    return this.m && (e.margin = this.m), this.mx && (e.marginLeft = this.mx, e.marginRight = this.mx), this.my && (e.marginTop = this.my, e.marginBottom = this.my), this.mt && (e.marginTop = this.mt), this.mr && (e.marginRight = this.mr), this.mb && (e.marginBottom = this.mb), this.ml && (e.marginLeft = this.ml), this.p && (e.padding = this.p), this.px && (e.paddingLeft = this.px, e.paddingRight = this.px), this.py && (e.paddingTop = this.py, e.paddingBottom = this.py), this.pt && (e.paddingTop = this.pt), this.pr && (e.paddingRight = this.pr), this.pb && (e.paddingBottom = this.pb), this.pl && (e.paddingLeft = this.pl), this.display && (e.display = this.display), this.flexDirection && (e.flexDirection = this.flexDirection), this.alignItems && (e.alignItems = this.alignItems), this.justifyContent && (e.justifyContent = this.justifyContent), this.flexWrap && (e.flexWrap = this.flexWrap), this.flexBasis && (e.flexBasis = this.flexBasis), this.flexGrow && (e.flexGrow = this.flexGrow), this.flexShrink && (e.flexShrink = this.flexShrink), this.gap && (e.gap = this.gap), this.bgcolor && (e.backgroundColor = this.bgcolor === "primary" ? "var(--ui-primary-color)" : this.bgcolor === "secondary" ? "var(--ui-secondary-color)" : this.bgcolor), this.color && (e.color = this.color === "primary" ? "var(--ui-primary-color)" : this.color === "secondary" ? "var(--ui-secondary-color)" : this.color), this.border && (e.border = this.border), this.borderRadius && (e.borderRadius = this.borderRadius), this.boxShadow && (e.boxShadow = this.boxShadow), this.width && (e.width = this.width), this.height && (e.height = this.height), e;
  }
  render() {
    const e = os(this._safeComponent);
    return Xo`
      <${e} style=${Ti(this._getStyles())}>
        <slot></slot>
      </${e}>
    `;
  }
};
w.styles = h(Wl);
k([
  s({ type: String })
], w.prototype, "component", 2);
k([
  s({ type: String })
], w.prototype, "m", 2);
k([
  s({ type: String })
], w.prototype, "mt", 2);
k([
  s({ type: String })
], w.prototype, "mr", 2);
k([
  s({ type: String })
], w.prototype, "mb", 2);
k([
  s({ type: String })
], w.prototype, "ml", 2);
k([
  s({ type: String })
], w.prototype, "mx", 2);
k([
  s({ type: String })
], w.prototype, "my", 2);
k([
  s({ type: String })
], w.prototype, "p", 2);
k([
  s({ type: String })
], w.prototype, "pt", 2);
k([
  s({ type: String })
], w.prototype, "pr", 2);
k([
  s({ type: String })
], w.prototype, "pb", 2);
k([
  s({ type: String })
], w.prototype, "pl", 2);
k([
  s({ type: String })
], w.prototype, "px", 2);
k([
  s({ type: String })
], w.prototype, "py", 2);
k([
  s({ type: String })
], w.prototype, "display", 2);
k([
  s({ type: String })
], w.prototype, "flexDirection", 2);
k([
  s({ type: String })
], w.prototype, "alignItems", 2);
k([
  s({ type: String })
], w.prototype, "justifyContent", 2);
k([
  s({ type: String })
], w.prototype, "flexWrap", 2);
k([
  s({ type: String })
], w.prototype, "flexBasis", 2);
k([
  s({ type: String })
], w.prototype, "flexGrow", 2);
k([
  s({ type: String })
], w.prototype, "flexShrink", 2);
k([
  s({ type: String })
], w.prototype, "gap", 2);
k([
  s({ type: String })
], w.prototype, "bgcolor", 2);
k([
  s({ type: String })
], w.prototype, "color", 2);
k([
  s({ type: String })
], w.prototype, "border", 2);
k([
  s({ type: String })
], w.prototype, "borderRadius", 2);
k([
  s({ type: String })
], w.prototype, "boxShadow", 2);
k([
  s({ type: String })
], w.prototype, "width", 2);
k([
  s({ type: String })
], w.prototype, "height", 2);
w = k([
  d("ui-box")
], w);
const Jl = ":host{display:block}.container{width:100%;margin-left:auto;margin-right:auto;box-sizing:border-box;padding-left:var(--ui-container-padding, 16px);padding-right:var(--ui-container-padding, 16px)}@media(min-width:600px){.container{padding-left:var(--ui-container-padding-sm, 24px);padding-right:var(--ui-container-padding-sm, 24px)}}.disable-gutters{padding-left:0;padding-right:0}.max-width-xs{max-width:var(--ui-container-xs, 444px)}.max-width-sm{max-width:var(--ui-container-sm, 600px)}.max-width-md{max-width:var(--ui-container-md, 900px)}.max-width-lg{max-width:var(--ui-container-lg, 1200px)}.max-width-xl{max-width:var(--ui-container-xl, 1536px)}.fixed{max-width:var(--ui-container-xs, 444px)}@media(min-width:600px){.fixed{max-width:var(--ui-container-sm, 600px)}}@media(min-width:900px){.fixed{max-width:var(--ui-container-md, 900px)}}@media(min-width:1200px){.fixed{max-width:var(--ui-container-lg, 1200px)}}@media(min-width:1536px){.fixed{max-width:var(--ui-container-xl, 1536px)}}@media(min-width:600px){.fixed.max-width-xs{max-width:var(--ui-container-xs, 444px)}}@media(min-width:900px){.fixed.max-width-sm{max-width:var(--ui-container-sm, 600px)}}@media(min-width:1200px){.fixed.max-width-md{max-width:var(--ui-container-md, 900px)}}@media(min-width:1536px){.fixed.max-width-lg{max-width:var(--ui-container-lg, 1200px)}}";
var Ql = Object.defineProperty, ec = Object.getOwnPropertyDescriptor, qr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ec(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ql(t, i, r), r;
};
let _i = class extends c {
  constructor() {
    super(...arguments), this.maxWidth = "lg", this.disableGutters = !1, this.fixed = !1;
  }
  render() {
    return l`
      <div class=${f({
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
_i.styles = h(Jl);
qr([
  s({
    attribute: "max-width",
    reflect: !0,
    converter: {
      fromAttribute: (e) => e === null || e === "false" ? !1 : e,
      toAttribute: (e) => e === !1 ? null : e
    }
  })
], _i.prototype, "maxWidth", 2);
qr([
  s({ type: Boolean, attribute: "disable-gutters", reflect: !0 })
], _i.prototype, "disableGutters", 2);
qr([
  s({ type: Boolean, reflect: !0 })
], _i.prototype, "fixed", 2);
_i = qr([
  d("ui-container")
], _i);
const tc = ":host{display:block}.grid-wrapper{box-sizing:border-box;display:block}.grid-wrapper.container{display:flex;flex-wrap:wrap;width:100%}.direction-row{flex-direction:row}.direction-row-reverse{flex-direction:row-reverse}.direction-column{flex-direction:column}.direction-column-reverse{flex-direction:column-reverse}.wrap-nowrap{flex-wrap:nowrap}.wrap-wrap-reverse{flex-wrap:wrap-reverse}.grid-item{box-sizing:border-box;margin:0}";
var ic = Object.defineProperty, rc = Object.getOwnPropertyDescriptor, N = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? rc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ic(t, i, r), r;
};
let O = class extends c {
  constructor() {
    super(...arguments), this.container = !1, this.direction = "row", this.wrap = "wrap", this.columns = 12, this.spacing = 0, this._currentWidth = typeof window < "u" ? window.innerWidth : 1200, this._onResize = () => {
      this._currentWidth = window.innerWidth;
    }, this._breakpointCache = {};
  }
  _getBreakpointValue(e, t) {
    if (this._breakpointCache[e] !== void 0) return this._breakpointCache[e];
    if (typeof window < "u") {
      const i = getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${e}`);
      if (i && i.trim())
        return this._breakpointCache[e] = parseInt(i, 10), this._breakpointCache[e];
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
    const t = ["xs", "sm", "md", "lg", "xl"], i = t.indexOf(e);
    for (let o = i; o >= 0; o--) {
      const r = this[t[o]];
      if (r !== void 0)
        return typeof r == "string" && !isNaN(Number(r)) && r.trim() !== "" ? Number(r) : r === "true" ? !0 : r === "false" ? !1 : r;
    }
  }
  _getEffectiveOffset(e) {
    if (!this.offset) return;
    const t = ["xs", "sm", "md", "lg", "xl"], i = t.indexOf(e);
    for (let o = i; o >= 0; o--) {
      const r = this.offset[t[o]];
      if (r !== void 0)
        return typeof r == "string" && !isNaN(Number(r)) && r.trim() !== "" ? Number(r) : r;
    }
  }
  _resolveResponsive(e, t) {
    if (typeof e == "object" && e !== null) {
      const i = ["xs", "sm", "md", "lg", "xl"], o = i.indexOf(t);
      for (let r = o; r >= 0; r--) {
        const a = e[i[r]];
        if (a !== void 0) return a;
      }
      return 0;
    }
    return typeof e == "string" && !isNaN(Number(e)) && e.trim() !== "" ? Number(e) : e;
  }
  _resolveResponsiveOrder(e, t) {
    if (typeof e == "object" && e !== null) {
      const i = ["xs", "sm", "md", "lg", "xl"], o = i.indexOf(t);
      for (let r = o; r >= 0; r--) {
        const a = e[i[r]];
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
    const t = this._resolveResponsive(this.spacing, e), i = this.rowSpacing !== void 0 ? this._resolveResponsive(this.rowSpacing, e) : t, o = this.columnSpacing !== void 0 ? this._resolveResponsive(this.columnSpacing, e) : t;
    return {
      gap: `${this._toPx(i)} ${this._toPx(o)}`
    };
  }
  _getEffectiveColumns() {
    if (this.container) return this.columns;
    const e = getComputedStyle(this).getPropertyValue("--ui-grid-columns").trim();
    return e && !isNaN(Number(e)) ? Number(e) : this.columns;
  }
  _getItemStyles(e) {
    const t = this.xs !== void 0 || this.sm !== void 0 || this.md !== void 0 || this.lg !== void 0 || this.xl !== void 0, i = !!this.offset, o = this.order !== void 0;
    if (!t && !i && !o) return {};
    const r = this._getEffectiveSize(e), a = this._getEffectiveOffset(e), n = this._getEffectiveColumns(), p = {};
    if (r === !0)
      p["flex-grow"] = "1", p["flex-basis"] = "0%", p["max-width"] = "100%";
    else if (r === "auto")
      p["flex-grow"] = "0", p["flex-basis"] = "auto", p.width = "auto", p["max-width"] = "none";
    else if (typeof r == "number") {
      const u = r / n * 100;
      p["flex-grow"] = "0", p["flex-basis"] = `calc(${u}% - var(--ui-grid-column-gap, 0px) * ${(n - r) / n})`, p["max-width"] = `calc(${u}% - var(--ui-grid-column-gap, 0px) * ${(n - r) / n})`;
    } else this.container || (p["flex-grow"] = "0", p["flex-basis"] = "auto", p.width = "100%");
    if (a === "auto")
      p["margin-left"] = "auto";
    else if (typeof a == "number") {
      const u = a / n * 100;
      p["margin-left"] = `${u}%`;
    }
    if (this.order !== void 0) {
      const u = this._resolveResponsiveOrder(this.order, e);
      u !== void 0 && (p.order = String(u));
    }
    return p;
  }
  updated(e) {
    super.updated(e), this._applyItemStyles();
  }
  _applyItemStyles() {
    const e = this._getBreakpoint(), t = this._getItemStyles(e);
    if (this.style.flexGrow = "", this.style.flexBasis = "", this.style.maxWidth = "", this.style.width = "", this.style.marginLeft = "", this.style.order = "", Object.entries(t).forEach(([i, o]) => {
      this.style.setProperty(i, o);
    }), this.container) {
      const i = this._getSpacingStyles(e);
      if (i.gap) {
        const o = i.gap.split(" "), r = o.length === 2 ? o[1] : o[0];
        this.style.setProperty("--ui-grid-column-gap", r);
      }
      this.style.setProperty("--ui-grid-columns", String(this.columns));
    }
  }
  render() {
    const e = this._getBreakpoint(), i = {
      ...this._getSpacingStyles(e),
      "align-items": this.alignItems || "",
      "justify-content": this.justifyContent || ""
    };
    return l`
      <div class=${f({
      "grid-wrapper": !0,
      container: this.container,
      [`direction-${this.direction}`]: this.container,
      [`wrap-${this.wrap}`]: this.container && this.wrap !== "wrap"
    })} style=${Ti(i)}>
        <slot></slot>
      </div>
    `;
  }
};
O.styles = h(tc);
N([
  s({ type: Boolean, reflect: !0 })
], O.prototype, "container", 2);
N([
  s({ type: String, reflect: !0 })
], O.prototype, "direction", 2);
N([
  s({ type: String, reflect: !0 })
], O.prototype, "wrap", 2);
N([
  s({ type: String, attribute: "align-items", reflect: !0 })
], O.prototype, "alignItems", 2);
N([
  s({ type: String, attribute: "justify-content", reflect: !0 })
], O.prototype, "justifyContent", 2);
N([
  s({ type: Number })
], O.prototype, "columns", 2);
N([
  s({ type: Object })
], O.prototype, "spacing", 2);
N([
  s({ type: Object })
], O.prototype, "rowSpacing", 2);
N([
  s({ type: Object })
], O.prototype, "columnSpacing", 2);
N([
  s()
], O.prototype, "xs", 2);
N([
  s()
], O.prototype, "sm", 2);
N([
  s()
], O.prototype, "md", 2);
N([
  s()
], O.prototype, "lg", 2);
N([
  s()
], O.prototype, "xl", 2);
N([
  s({ type: Object })
], O.prototype, "offset", 2);
N([
  s({ type: Object })
], O.prototype, "order", 2);
N([
  b()
], O.prototype, "_currentWidth", 2);
O = N([
  d("ui-grid")
], O);
const oc = ":host{display:block}.stack-wrapper{display:flex;box-sizing:border-box}.stack-wrapper.direction-column,.stack-wrapper.direction-column-reverse{width:100%}::slotted(ui-divider){margin:0!important}.stack-wrapper.no-flex-gap.direction-column ::slotted(*:not(:first-child)){margin-top:var(--ui-stack-spacing, 0px)}.stack-wrapper.no-flex-gap.direction-column-reverse ::slotted(*:not(:last-child)){margin-bottom:var(--ui-stack-spacing, 0px)}.stack-wrapper.no-flex-gap.direction-row ::slotted(*:not(:first-child)){margin-left:var(--ui-stack-spacing, 0px)}.stack-wrapper.no-flex-gap.direction-row-reverse ::slotted(*:not(:last-child)){margin-right:var(--ui-stack-spacing, 0px)}";
var sc = Object.defineProperty, ac = Object.getOwnPropertyDescriptor, ri = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ac(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && sc(t, i, r), r;
};
let ae = class extends c {
  constructor() {
    super(...arguments), this.direction = "column", this.spacing = 0, this.useFlexGap = !0, this._currentWidth = typeof window < "u" ? window.innerWidth : 1200, this._onResize = () => {
      this._currentWidth = window.innerWidth, this.requestUpdate();
    };
  }
  _getBreakpointValue(e, t) {
    if (ae._breakPoints[e]) return ae._breakPoints[e];
    if (typeof window < "u") {
      const i = getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${e}`);
      if (i && i.trim())
        return ae._breakPoints[e] = parseInt(i, 10), ae._breakPoints[e];
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
    const i = t.startsWith("row") ? "vertical" : "horizontal";
    this.querySelectorAll("ui-divider").forEach((o) => {
      o.getAttribute("orientation") !== i && o.setAttribute("orientation", i);
    });
  }
  _getBreakpoint() {
    const e = this._currentWidth;
    return e >= this._getBreakpointValue("xl", 1536) ? "xl" : e >= this._getBreakpointValue("lg", 1200) ? "lg" : e >= this._getBreakpointValue("md", 900) ? "md" : e >= this._getBreakpointValue("sm", 600) ? "sm" : "xs";
  }
  _resolveResponsive(e, t) {
    if (typeof e == "object" && e !== null && !Array.isArray(e)) {
      const i = ["xs", "sm", "md", "lg", "xl"], o = i.indexOf(t);
      for (let n = o; n >= 0; n--) {
        const p = e[i[n]];
        if (p !== void 0) return p;
      }
      const r = e, a = r.xs;
      return a !== void 0 ? a : r[Object.keys(e)[0]];
    }
    return e;
  }
  _getSpacingPx(e) {
    return typeof e == "number" ? `${e * 8}px` : e;
  }
  render() {
    const e = this._getBreakpoint(), t = this._resolveResponsive(this.direction, e), i = this._resolveResponsive(this.spacing, e), o = this._getSpacingPx(i), r = t ?? "column", a = r.startsWith("column") ? "stretch" : "center", n = {
      "flex-direction": r,
      "align-items": this.alignItems || a,
      "justify-content": this.justifyContent || "flex-start",
      gap: this.useFlexGap ? o : "0",
      "--ui-stack-spacing": o
    };
    return l`
      <div
        class="stack-wrapper direction-${t} ${this.useFlexGap ? "" : "no-flex-gap"}"
        style=${Ti(n)}
      >
        <slot></slot>
      </div>
    `;
  }
};
ae.styles = h(oc);
ae._breakPoints = {};
ri([
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
], ae.prototype, "direction", 2);
ri([
  s({ type: Object })
], ae.prototype, "spacing", 2);
ri([
  s({ type: String })
], ae.prototype, "alignItems", 2);
ri([
  s({ type: String })
], ae.prototype, "justifyContent", 2);
ri([
  s({ type: Boolean })
], ae.prototype, "useFlexGap", 2);
ri([
  b()
], ae.prototype, "_currentWidth", 2);
ae = ri([
  d("ui-stack")
], ae);
const nc = ":host{display:block}.image-list{display:grid;overflow:hidden;box-sizing:border-box}.variant-standard,.variant-quilted,.variant-woven{grid-auto-rows:var(--ui-image-list-row-height, 164px)}.variant-masonry{display:block}";
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, Li = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && lc(t, i, r), r;
};
let Ct = class extends c {
  constructor() {
    super(...arguments), this.variant = "standard", this.cols = 3, this.gap = 4, this.rowHeight = 164, this.autoRows = !1;
  }
  render() {
    const e = this.variant === "masonry", t = {};
    return e ? (t["column-count"] = String(this.cols), t["column-gap"] = `${this.gap}px`) : (t["grid-template-columns"] = `repeat(${this.cols}, 1fr)`, t.gap = `${this.gap}px`, t["--ui-image-list-row-height"] = `${this.rowHeight}px`, t["grid-auto-rows"] = this.autoRows ? "auto" : `${this.rowHeight}px`), t["--ui-image-list-gap"] = `${this.gap}px`, l`
      <ul class="image-list variant-${this.variant}" style="${Ti(t)}" role="list">
        <slot></slot>
      </ul>
    `;
  }
};
Ct.styles = h(nc);
Li([
  s({ type: String })
], Ct.prototype, "variant", 2);
Li([
  s({ type: Number })
], Ct.prototype, "cols", 2);
Li([
  s({ type: Number })
], Ct.prototype, "gap", 2);
Li([
  s({ type: Number })
], Ct.prototype, "rowHeight", 2);
Li([
  s({ type: Boolean })
], Ct.prototype, "autoRows", 2);
Ct = Li([
  d("ui-image-list")
], Ct);
const dc = ':host{display:block;position:relative;overflow:hidden}:host([bar-position="below"]){display:flex;flex-direction:column;overflow:visible}:host(.masonry){break-inside:avoid;margin-bottom:var(--ui-image-list-gap, 4px)}.item-wrapper{width:100%;height:100%;position:relative;overflow:hidden}:host([bar-position="below"]) .item-wrapper{flex:1 1 auto;overflow:hidden}:host(.masonry) .item-wrapper{height:auto}::slotted(img){width:100%;height:100%;object-fit:var(--ui-image-fit, cover);display:block}:host(.masonry) ::slotted(img){height:auto}::slotted(ui-image-list-item-bar){position:absolute;bottom:0;left:0;right:0}::slotted(ui-image-list-item-bar[position="top"]){bottom:auto;top:0}:host([bar-position="below"]) ::slotted(ui-image-list-item-bar){position:static}';
var hc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, oi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && hc(t, i, r), r;
};
let lt = class extends c {
  constructor() {
    super(...arguments), this.rows = 1, this.cols = 1, this.barPosition = "overlay", this.weave = "odd", this.aspectRatio = "auto", this.fit = "cover";
  }
  connectedCallback() {
    super.connectedCallback(), this._applyHostStyles();
  }
  updated(e) {
    super.updated(e), this._applyHostStyles();
  }
  _applyHostStyles() {
    const t = this.closest("ui-image-list")?.getAttribute("variant");
    t === "woven" ? this.style.gridRow = this.weave === "odd" ? "span 2" : "span 1" : this.rows > 1 ? this.style.gridRow = `span ${this.rows}` : this.style.gridRow = "", this.cols > 1 ? this.style.gridColumn = `span ${this.cols}` : this.style.gridColumn = "", t === "masonry" ? this.classList.add("masonry") : this.classList.remove("masonry"), this.style.aspectRatio = this.aspectRatio !== "auto" ? this.aspectRatio : "", this.style.setProperty("--ui-image-fit", this.fit);
  }
  render() {
    return l`
      <div class="item-wrapper">
        <slot></slot>
      </div>
      <slot name="bar"></slot>
    `;
  }
};
lt.styles = h(dc);
oi([
  s({ type: Number })
], lt.prototype, "rows", 2);
oi([
  s({ type: Number })
], lt.prototype, "cols", 2);
oi([
  s({ type: String, attribute: "bar-position", reflect: !0 })
], lt.prototype, "barPosition", 2);
oi([
  s({ type: String })
], lt.prototype, "weave", 2);
oi([
  s({ type: String, attribute: "aspect-ratio", reflect: !0 })
], lt.prototype, "aspectRatio", 2);
oi([
  s({ type: String })
], lt.prototype, "fit", 2);
lt = oi([
  d("ui-image-list-item")
], lt);
const uc = ':host{display:block;box-sizing:border-box;background:linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.3) 70%,transparent 100%);color:var(--ui-image-bar-overlay-text, var(--ui-text-color-on-primary));padding:12px 12px 8px;font-family:var(--ui-font-family)}:host([position="top"]){background:linear-gradient(to bottom,rgba(0,0,0,.7) 0%,rgba(0,0,0,.3) 70%,transparent 100%);padding:8px 12px 12px}:host([position="below"]){background:var(--ui-surface-1);color:var(--ui-text-color);border-top:1px solid var(--ui-border-color);padding:8px 12px}.bar-inner{display:flex;align-items:center;gap:8px}.bar-text{flex:1;min-width:0}.bar-title{font-size:.875rem;font-weight:600;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar-subtitle{font-size:.75rem;font-weight:400;opacity:.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px}.bar-action{flex-shrink:0;display:flex;align-items:center}::slotted([slot="action"]){color:var(--ui-image-bar-overlay-text, var(--ui-text-color-on-primary))}:host([position="below"]) ::slotted([slot="action"]){color:var(--ui-text-color)}';
var fc = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, Zo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? vc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && fc(t, i, r), r;
};
let kr = class extends c {
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
kr.styles = h(uc);
Zo([
  s({ type: String, reflect: !0 })
], kr.prototype, "position", 2);
kr = Zo([
  d("ui-image-list-item-bar")
], kr);
const bc = ':host{display:inline-block;font-family:var(--ui-font-family);-webkit-user-select:none;user-select:none}.calendar{width:296px;background:var(--ui-surface-1);border-radius:var(--ui-border-radius-xl);overflow:hidden}.header{display:flex;align-items:center;justify-content:space-between;padding:12px 8px 8px}.header-label{font-size:.9375rem;font-weight:600;color:var(--ui-text-color);cursor:pointer;padding:4px 8px;border-radius:6px;transition:background .12s}.header-label:hover{background:var(--ui-hover-color)}.nav-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);font-size:1rem;transition:background .12s}.nav-btn:hover{background:var(--ui-hover-color)}.nav-btn:disabled{opacity:.3;cursor:default}.dow-row{display:grid;grid-template-columns:repeat(7,1fr);padding:0 8px;margin-bottom:4px}.dow-cell{text-align:center;font-size:.6875rem;font-weight:600;color:var(--ui-text-color-muted);padding:4px 0;text-transform:uppercase;letter-spacing:.04em}.day-grid{display:grid;grid-template-columns:repeat(7,1fr);padding:0 8px 12px;gap:2px 0}.day-cell{display:flex;align-items:center;justify-content:center;height:36px;width:100%;border:none;background:transparent;cursor:pointer;border-radius:50%;font-size:.8125rem;color:var(--ui-text-color);transition:background .1s,color .1s;position:relative}.day-cell:hover:not(.disabled):not(.selected){background:var(--ui-hover-color)}.day-cell.other-month{color:var(--ui-text-color-muted)}.day-cell.today:not(.selected){color:var(--ui-primary-color);font-weight:700}.day-cell.today:not(.selected):after{content:"";position:absolute;bottom:4px;left:50%;transform:translate(-50%);width:4px;height:4px;border-radius:50%;background:var(--ui-primary-color)}.day-cell.selected{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700}.day-cell.selected:hover{background:var(--ui-primary-color-hover)}.day-cell.disabled{opacity:.35;cursor:not-allowed;pointer-events:none}.year-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px;max-height:220px;overflow-y:auto}.year-btn{padding:8px 4px;border:none;background:transparent;cursor:pointer;border-radius:6px;font-size:.875rem;color:var(--ui-text-color);transition:background .12s}.year-btn:hover{background:var(--ui-hover-color)}.year-btn.selected-year{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700}.month-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px}.month-btn{padding:10px 4px;border:none;background:transparent;cursor:pointer;border-radius:6px;font-size:.8125rem;color:var(--ui-text-color);transition:background .12s}.month-btn:hover{background:var(--ui-hover-color)}.month-btn.selected-month{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700}', gc = ":host{display:inline-block;font-family:var(--ui-font-family)}.field-wrapper{position:relative;display:inline-flex;align-items:center}.field-label{display:block;font-size:.75rem;font-weight:500;color:var(--ui-text-color-muted);margin-bottom:4px}.field-input{font-family:inherit;font-size:.9375rem;color:var(--ui-text-color);background:var(--ui-input-bg);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-md);padding:10px 44px 10px 14px;width:180px;outline:none;transition:border-color .15s,box-shadow .15s;box-sizing:border-box;cursor:text}.field-input::placeholder{color:var(--ui-input-placeholder-color)}.field-input:focus{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([disabled]) .field-input{background:var(--ui-input-disabled-bg);color:var(--ui-text-color-muted);cursor:not-allowed;border-color:var(--ui-border-color)}:host([readonly]) .field-input{cursor:default}.calendar-icon-btn{position:absolute;right:10px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);transition:background .12s,color .12s;font-size:1rem}.calendar-icon-btn:hover{background:var(--ui-hover-color);color:var(--ui-primary-color)}:host([disabled]) .calendar-icon-btn{pointer-events:none;opacity:.4}:host([readonly]) .calendar-icon-btn{pointer-events:none}:host([error]) .field-input{border-color:var(--ui-error-color)}:host([error]) .field-input:focus{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}.helper-text{font-size:.75rem;margin-top:4px;color:var(--ui-text-color-muted)}:host([error]) .helper-text{color:var(--ui-error-color)}.popover-anchor{position:relative;display:inline-block}.popover{position:absolute;top:calc(100% + 6px);left:0;z-index:1400;background:var(--ui-surface-1);border-radius:var(--ui-border-radius-xl);box-shadow:var(--ui-shadow-lg);transform-origin:top left;transform:scale(.94) translateY(-4px);opacity:0;visibility:hidden;transition:transform .15s cubic-bezier(.4,0,.2,1),opacity .15s,visibility .15s;pointer-events:none}.popover.open{transform:scale(1) translateY(0);opacity:1;visibility:visible;pointer-events:auto}.popover-actions{display:flex;justify-content:flex-end;gap:8px;padding:4px 12px 12px;border-top:1px solid var(--ui-border-color)}.action-btn{font-family:inherit;font-size:.875rem;font-weight:600;padding:6px 14px;border:none;border-radius:6px;cursor:pointer;transition:background .12s}.action-btn.cancel{background:transparent;color:var(--ui-text-color-muted)}.action-btn.cancel:hover{background:var(--ui-hover-color)}.action-btn.ok{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.action-btn.ok:hover{background:var(--ui-primary-color-hover)}.static-wrapper{display:inline-block;border-radius:var(--ui-border-radius-xl);box-shadow:var(--ui-shadow-sm),0 0 0 1px var(--ui-border-color);overflow:hidden}.click-away{display:none;position:fixed;inset:0;z-index:1399}.click-away.open{display:block}";
var mc = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, P = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && mc(t, i, r), r;
};
const xc = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Wo = [
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
function Mt(e) {
  if (!e) return null;
  const [t, i, o] = e.split("-").map(Number);
  return !t || !i || !o ? null : new Date(t, i - 1, o);
}
function br(e) {
  const t = e.getFullYear(), i = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${t}-${i}-${o}`;
}
function _c(e) {
  const t = Mt(e);
  return t ? `${String(t.getMonth() + 1).padStart(2, "0")}/${String(t.getDate()).padStart(2, "0")}/${t.getFullYear()}` : "";
}
function wc() {
  return br(/* @__PURE__ */ new Date());
}
function li(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function kc(e, t, i, o, r) {
  const a = [], n = new Date(e, t, 1), p = wc(), u = Mt(p), y = i ? Mt(i) : null, g = o ? Mt(o) : null, T = r ? Mt(r) : null, Ne = n.getDay();
  for (let ue = Ne - 1; ue >= 0; ue--) {
    const D = new Date(e, t, -ue), Ri = br(D);
    a.push({
      date: D,
      iso: Ri,
      day: D.getDate(),
      isCurrentMonth: !1,
      isToday: li(D, u),
      isSelected: y ? li(D, y) : !1,
      isDisabled: (g ? D < g : !1) || (T ? D > T : !1)
    });
  }
  const ur = new Date(e, t + 1, 0).getDate();
  for (let ue = 1; ue <= ur; ue++) {
    const D = new Date(e, t, ue), Ri = br(D);
    a.push({
      date: D,
      iso: Ri,
      day: ue,
      isCurrentMonth: !0,
      isToday: li(D, u),
      isSelected: y ? li(D, y) : !1,
      isDisabled: (g ? D < g : !1) || (T ? D > T : !1)
    });
  }
  const is = 42 - a.length;
  for (let ue = 1; ue <= is; ue++) {
    const D = new Date(e, t + 1, ue), Ri = br(D);
    a.push({
      date: D,
      iso: Ri,
      day: ue,
      isCurrentMonth: !1,
      isToday: li(D, u),
      isSelected: y ? li(D, y) : !1,
      isDisabled: (g ? D < g : !1) || (T ? D > T : !1)
    });
  }
  return a;
}
let We = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this._viewYear = (/* @__PURE__ */ new Date()).getFullYear(), this._viewMonth = (/* @__PURE__ */ new Date()).getMonth(), this._mode = "day";
  }
  connectedCallback() {
    if (super.connectedCallback(), this.value) {
      const e = Mt(this.value);
      e && (this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth());
    }
  }
  /** Navigate to the month/year of a given ISO date programmatically. */
  navigateTo(e) {
    const t = Mt(e);
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
    const e = kc(this._viewYear, this._viewMonth, this.value ?? null, this.min ?? null, this.max ?? null);
    return l`
      <div class="header">
        <button class="nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="header-label" @click=${() => this._mode = "month"} role="button" tabindex="0"
          @keydown=${(t) => t.key === "Enter" && (this._mode = "month")}
        >
          ${Wo[this._viewMonth]} ${this._viewYear}
        </span>
        <button class="nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>
      <div class="dow-row">${xc.map((t) => l`<span class="dow-cell">${t}</span>`)}</div>
      <div class="day-grid" role="grid" aria-label="Calendar">
        ${Lt(e, (t) => t.iso, (t) => l`
          <button
            class=${f({
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
        ${Wo.map((e, t) => l`
          <button class=${f({ "month-btn": !0, "selected-month": t === this._viewMonth })}
            @click=${() => this._selectMonth(t)}>${e.slice(0, 3)}</button>
        `)}
      </div>
    `;
  }
  _renderYearView() {
    const e = (/* @__PURE__ */ new Date()).getFullYear(), t = Array.from({ length: 201 }, (i, o) => e - 100 + o);
    return l`
      <div class="header">
        <span class="header-label" style="cursor:default">Select Year</span>
      </div>
      <div class="year-grid">
        ${t.map((i) => l`
          <button class=${f({ "year-btn": !0, "selected-year": i === this._viewYear })}
            @click=${() => this._selectYear(i)}>${i}</button>
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
We.styles = h(bc);
P([
  s({ type: String })
], We.prototype, "value", 2);
P([
  s({ type: String })
], We.prototype, "min", 2);
P([
  s({ type: String })
], We.prototype, "max", 2);
P([
  s({ type: Boolean })
], We.prototype, "disabled", 2);
P([
  b()
], We.prototype, "_viewYear", 2);
P([
  b()
], We.prototype, "_viewMonth", 2);
P([
  b()
], We.prototype, "_mode", 2);
We = P([
  d("ui-date-picker-calendar")
], We);
let J = class extends c {
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
    const t = e.detail.value, i = this._resolvedVariant;
    i === "desktop" ? (this._pendingValue = t, this._commit(t)) : i === "mobile" && (this._pendingValue = t);
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
    const i = e.target.value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (i) {
      const o = `${i[3]}-${i[1]}-${i[2]}`;
      if (isNaN(new Date(o).getTime()) || this.min && o < this.min || this.max && o > this.max) return;
      this._commit(o);
    }
  }
  // ── Field ───────────────────────────────────────────────────────────────
  _renderField() {
    return l`
      ${this.label ? l`<label class="field-label" for="dp-input">${this.label}</label>` : v}
      <div class="field-wrapper">
        <input
          id="dp-input"
          class="field-input"
          type="text"
          .value=${_c(this.value)}
          placeholder=${this.placeholder}
          name=${this.name || v}
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
      ${this.helperText ? l`<p class="helper-text">${this.helperText}</p>` : v}
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
J.styles = h(gc);
P([
  s({ type: String })
], J.prototype, "value", 2);
P([
  s({ type: String })
], J.prototype, "label", 2);
P([
  s({ type: String })
], J.prototype, "placeholder", 2);
P([
  s({ type: String })
], J.prototype, "name", 2);
P([
  s({ type: String })
], J.prototype, "variant", 2);
P([
  s({ type: String })
], J.prototype, "min", 2);
P([
  s({ type: String })
], J.prototype, "max", 2);
P([
  s({ type: Boolean, reflect: !0 })
], J.prototype, "disabled", 2);
P([
  s({ type: Boolean, reflect: !0 })
], J.prototype, "readonly", 2);
P([
  s({ type: Boolean, reflect: !0 })
], J.prototype, "error", 2);
P([
  s({ type: String, attribute: "helper-text" })
], J.prototype, "helperText", 2);
P([
  b()
], J.prototype, "_open", 2);
P([
  b()
], J.prototype, "_pendingValue", 2);
J = P([
  d("ui-date-picker")
], J);
const $c = ":host{display:inline-block;font-family:var(--ui-font-family)}.field-label{display:block;font-size:.75rem;font-weight:500;letter-spacing:.01em;color:var(--ui-text-color-muted);margin-bottom:5px;transition:color .15s}:host([error]) .field-label{color:var(--ui-error-color)}.field-label.focused{color:var(--ui-primary-color)}:host([error]) .field-label.focused{color:var(--ui-error-color)}.field-container{display:inline-flex;align-items:center;gap:4px;background:var(--ui-input-bg);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-md);padding:0 10px;height:44px;min-width:200px;cursor:text;box-sizing:border-box;transition:border-color .15s,box-shadow .15s;position:relative}.field-container.focused{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([error]) .field-container{border-color:var(--ui-error-color)}:host([error]) .field-container.focused{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}:host([disabled]) .field-container{background:var(--ui-input-disabled-bg);border-color:var(--ui-border-color);cursor:not-allowed}:host([readonly]) .field-container{cursor:default}.segments{display:flex;align-items:center;flex:1;gap:1px;outline:none;min-height:100%}.segment{display:inline-flex;align-items:center;justify-content:center;border-radius:4px;padding:2px 4px;font-size:.9375rem;font-variant-numeric:tabular-nums;color:var(--ui-text-color);min-width:2ch;line-height:1;transition:background .1s;cursor:text;-webkit-user-select:none;user-select:none}.segment.placeholder{color:var(--ui-input-placeholder-color)}.segment.active{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);border-radius:3px}:host([disabled]) .segment{color:var(--ui-text-color-muted)}:host([disabled]) .segment.active{background:var(--ui-border-color);color:var(--ui-text-color-muted)}.segment-year{min-width:4ch}.separator{color:var(--ui-text-color-muted);font-size:.9375rem;pointer-events:none;line-height:1}.field-actions{display:flex;align-items:center;gap:2px;margin-left:auto}.icon-btn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);font-size:.875rem;transition:background .12s,color .12s;flex-shrink:0;padding:0}.icon-btn:hover{background:var(--ui-hover-color);color:var(--ui-text-color)}:host([disabled]) .icon-btn{pointer-events:none;opacity:0}.helper{display:block;font-size:.75rem;margin-top:5px;color:var(--ui-text-color-muted)}:host([error]) .helper{color:var(--ui-error-color)}";
var Sc = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, te = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Cc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Sc(t, i, r), r;
};
function fr(e, t, i) {
  return Math.min(Math.max(e, t), i);
}
function vr(e, t) {
  return e < 1 || e > 12 ? 31 : new Date(t || 2e3, e, 0).getDate();
}
function Ic(e) {
  if (!e) return { m: null, d: null, y: null };
  const t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return t ? { y: parseInt(t[1]), m: parseInt(t[2]), d: parseInt(t[3]) } : { m: null, d: null, y: null };
}
function Go(e, t, i) {
  return e === null || t === null || i === null ? "" : `${String(i).padStart(4, "0")}-${String(e).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
const yt = ["month", "day", "year"];
let A = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "", this.name = "", this.min = "", this.max = "", this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._internals = this.attachInternals(), this._month = null, this._day = null, this._year = null, this._active = null, this._focused = !1, this._buf = "";
  }
  // digit accumulation buffer for the active segment
  // Sync controlled value → segments before each render (willUpdate avoids a double-render cycle)
  willUpdate(e) {
    if (e.has("value")) {
      const { m: t, d: i, y: o } = Ic(this.value);
      this._month = t, this._day = i, this._year = o;
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
    const e = Go(this._month, this._day, this._year);
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
        const t = vr(this._month ?? 1, this._year ?? 2e3);
        e >= 1 && e <= t && (this._day = e);
      }
    }
  }
  _nextSegment() {
    if (!this._active) {
      this._setActive("month");
      return;
    }
    const e = yt.indexOf(this._active);
    e < yt.length - 1 && this._setActive(yt[e + 1]);
  }
  _prevSegment() {
    if (!this._active) return;
    const e = yt.indexOf(this._active);
    e > 0 && this._setActive(yt[e - 1]);
  }
  _canGoNext() {
    return this._active ? yt.indexOf(this._active) < yt.length - 1 : !0;
  }
  _canGoPrev() {
    return this._active ? yt.indexOf(this._active) > 0 : !1;
  }
  // ── Internal: digit handling ─────────────────────────────────────────────
  _handleDigit(e) {
    this._active || this._setActive("month");
    const t = this._active, i = this._buf + String(e);
    if (t === "month")
      if (i.length === 1)
        e >= 2 && e <= 9 ? (this._month = e, this._buf = "", this._nextSegment()) : this._buf = i;
      else {
        const o = parseInt(i);
        o >= 1 && o <= 12 ? (this._month = o, this._buf = "", this._nextSegment()) : (this._buf = String(e), e >= 2 && e <= 9 && (this._month = e, this._buf = "", this._nextSegment()));
      }
    else if (t === "day") {
      const o = vr(this._month ?? 1, this._year ?? 2e3);
      if (i.length === 1)
        e >= 4 && e <= 9 ? (this._day = e, this._buf = "", this._nextSegment()) : this._buf = i;
      else {
        const r = parseInt(i);
        r >= 1 && r <= o ? (this._day = r, this._buf = "", this._nextSegment()) : (this._buf = String(e), e >= 4 && e <= 9 && (this._day = e, this._buf = "", this._nextSegment()));
      }
    } else t === "year" && (this._buf = i.slice(-4), this._buf.length === 4 && (this._year = parseInt(this._buf), this._buf = "", this._checkAndEmit()));
  }
  // ── Internal: increment / decrement ──────────────────────────────────────
  _adjust(e) {
    const t = this._active;
    if (t) {
      if (this._buf = "", t === "month") {
        const i = this._month ?? (e > 0 ? 0 : 13);
        this._month = fr(i + e, 1, 12), this._day !== null && (this._day = fr(this._day, 1, vr(this._month, this._year ?? 2e3)));
      } else if (t === "day") {
        const i = vr(this._month ?? 1, this._year ?? 2e3), o = this._day ?? (e > 0 ? 0 : i + 1);
        this._day = fr(o + e, 1, i);
      } else if (t === "year") {
        const i = this._year ?? (/* @__PURE__ */ new Date()).getFullYear();
        this._year = fr(i + e, 1, 9999);
      }
      this._checkAndEmit();
    }
  }
  // ── Internal: emit when a full date is ready ──────────────────────────────
  _checkAndEmit() {
    const e = Go(this._month, this._day, this._year);
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
    const e = f({ "field-label": !0, focused: this._focused }), t = f({ "field-container": !0, focused: this._focused }), i = (o, r = "") => {
      const { text: a, isPlaceholder: n } = this._segmentText(o);
      return l`<span
        class=${f({
        segment: !0,
        [o]: !0,
        active: this._active === o,
        placeholder: n,
        [`segment-${o}`]: !0,
        [r]: !!r
      })}
        @click=${(p) => {
        p.stopPropagation(), this._setActive(o), this.shadowRoot?.querySelector(".segments")?.focus();
      }}
      >${a}</span>`;
    };
    return l`
      ${this.label ? l`<label class=${e}>${this.label}</label>` : v}

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
          ${i("month")}
          <span class="separator">/</span>
          ${i("day")}
          <span class="separator">/</span>
          ${i("year", "segment-year")}
        </div>

        <div class="field-actions">
          ${this._hasValue() && !this.disabled && !this.readonly ? l`
            <button class="icon-btn" aria-label="Clear date" tabindex="-1"
              @click=${(o) => {
      o.stopPropagation(), this.clear();
    }}>✕</button>
          ` : v}
        </div>
      </div>

      ${this.helperText ? l`<small class="helper">${this.helperText}</small>` : v}
    `;
  }
};
A.formAssociated = !0;
A.styles = h($c);
te([
  s({ type: String })
], A.prototype, "value", 2);
te([
  s({ type: String })
], A.prototype, "label", 2);
te([
  s({ type: String, reflect: !0 })
], A.prototype, "name", 2);
te([
  s({ type: String })
], A.prototype, "min", 2);
te([
  s({ type: String })
], A.prototype, "max", 2);
te([
  s({ type: Boolean, reflect: !0 })
], A.prototype, "disabled", 2);
te([
  s({ type: Boolean, reflect: !0 })
], A.prototype, "readonly", 2);
te([
  s({ type: Boolean, reflect: !0 })
], A.prototype, "error", 2);
te([
  s({ type: String, attribute: "helper-text" })
], A.prototype, "helperText", 2);
te([
  b()
], A.prototype, "_month", 2);
te([
  b()
], A.prototype, "_day", 2);
te([
  b()
], A.prototype, "_year", 2);
te([
  b()
], A.prototype, "_active", 2);
te([
  b()
], A.prototype, "_focused", 2);
te([
  b()
], A.prototype, "_buf", 2);
A = te([
  d("ui-date-field")
], A);
const Pc = ":host{display:inline-block;font-family:var(--ui-font-family)}.label{display:block;font-size:.75rem;font-weight:500;color:var(--ui-text-color-muted);margin-bottom:5px}.label.focused{color:var(--ui-primary-color)}:host([error]) .label{color:var(--ui-error-color)}.container{display:inline-flex;align-items:center;gap:4px;background:var(--ui-input-bg);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-md);padding:0 10px;height:var(--ui-time-field-height,44px);min-width:var(--ui-time-field-min-width,160px);cursor:text;box-sizing:border-box;transition:border-color .15s,box-shadow .15s}.container.focused{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([error]) .container{border-color:var(--ui-error-color)}:host([disabled]) .container{background:var(--ui-input-disabled-bg);border-color:var(--ui-border-color);cursor:not-allowed}.segments{display:flex;align-items:center;flex:1;gap:1px;outline:none;min-height:100%}.seg{display:inline-flex;align-items:center;justify-content:center;border-radius:3px;padding:2px 4px;font-size:.9375rem;font-variant-numeric:tabular-nums;color:var(--ui-text-color);min-width:2ch;line-height:1;cursor:text;-webkit-user-select:none;user-select:none;transition:background .1s}.seg.active{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.seg.placeholder{color:var(--ui-text-color-muted)}.seg.meridiem{min-width:3ch}.sep{color:var(--ui-text-color-muted);font-size:.9375rem;pointer-events:none}.icon-btn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);font-size:.875rem;margin-left:auto;transition:background .12s}.icon-btn:hover{background:var(--ui-hover-color)}.helper{display:block;font-size:.75rem;margin-top:5px;color:var(--ui-text-color-muted)}:host([error]) .helper{color:var(--ui-error-color)}", zc = ":host{display:block;font-family:var(--ui-font-family)}.clock{overflow-y:auto;max-height:var(--ui-digital-clock-height,300px);padding:4px 0;scrollbar-width:thin}.item{display:flex;align-items:center;justify-content:center;padding:10px 16px;font-size:.9375rem;color:var(--ui-text-color);cursor:pointer;border:none;background:transparent;width:100%;box-sizing:border-box;transition:background .1s;font-family:inherit;border-radius:0;font-variant-numeric:tabular-nums}.item:hover{background:var(--ui-hover-color)}.item.selected{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:600;border-radius:6px}", Dc = ":host{display:inline-block;font-family:var(--ui-font-family)}.msdc{display:flex;gap:0;border-radius:var(--ui-border-radius-xl);overflow:hidden}.col{display:flex;flex-direction:column;overflow-y:auto;width:72px;max-height:var(--ui-msdc-height,240px);position:relative;scrollbar-width:none}.col::-webkit-scrollbar{display:none}.col+.col{border-left:1px solid var(--ui-border-color)}.col-header{position:sticky;top:0;background:var(--ui-surface-1);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ui-text-color-muted);text-align:center;padding:6px 0 4px;border-bottom:1px solid var(--ui-border-color);z-index:1}.item{display:flex;align-items:center;justify-content:center;padding:8px 4px;font-size:.9375rem;font-variant-numeric:tabular-nums;color:var(--ui-text-color);cursor:pointer;border:none;background:transparent;font-family:inherit;width:100%;line-height:1;transition:background .1s}.item:hover{background:var(--ui-hover-color)}.item.sel{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700;border-radius:6px}.col-spacer{min-height:80px}", Ec = ":host{display:inline-block;-webkit-user-select:none;user-select:none}.clock-wrap{display:flex;flex-direction:column;align-items:center;gap:12px}.clock-header{display:flex;gap:4px;font-size:2rem;font-weight:700;font-family:var(--ui-font-family);color:var(--ui-text-color, #111827)}.clock-seg{padding:4px 10px;border-radius:8px;cursor:pointer;transition:background .12s,color .12s}.clock-seg.active{background:var(--ui-primary-color, #3b82f6);color:var(--ui-text-color-on-primary, #fff);border-radius:8px}.clock-seg:hover:not(.active){background:var(--ui-hover-color, rgba(0,0,0,.06))}.clock-sep{color:var(--ui-text-color-muted, #6b7280)}.clock-mer{font-size:1rem;font-weight:600;align-self:flex-end;margin-bottom:6px;color:var(--ui-text-color-muted, #6b7280)}svg{touch-action:none;cursor:pointer;outline:none}svg.dragging{cursor:grabbing}svg:focus-visible{outline:2px solid var(--ui-primary-color, #3b82f6);outline-offset:4px;border-radius:50%}.face{fill:var(--ui-time-clock-face-bg, var(--ui-surface-variant, #f1f5f9))}.face-inner{fill:var(--ui-time-clock-inner-bg, rgba(0,0,0,.04));stroke:var(--ui-time-clock-inner-border, var(--ui-border-color, #e5e7eb));stroke-width:1}.hand{stroke:var(--ui-time-clock-hand-color, var(--ui-primary-color, #3b82f6));stroke-width:2;stroke-linecap:round}.hand-center,.hand-tip{fill:var(--ui-time-clock-hand-color, var(--ui-primary-color, #3b82f6))}.num{font-size:var(--ui-time-clock-num-size, 14px);font-weight:500;font-family:var(--ui-font-family, system-ui, sans-serif);fill:var(--ui-text-color, #111827);text-anchor:middle;pointer-events:none}.num.inner-label{font-size:var(--ui-time-clock-inner-num-size, 12px);fill:var(--ui-text-color-muted, #6b7280)}.num.selected{fill:var(--ui-text-color-on-primary, #fff);font-weight:700}.num-bg{fill:transparent;cursor:pointer}.num-bg.selected{fill:var(--ui-primary-color, #3b82f6)}.am-pm{display:inline-flex;border-radius:var(--ui-time-clock-ampm-radius, 20px);overflow:hidden;border:1.5px solid var(--ui-border-color, #e5e7eb)}.am-pm-btn{padding:5px 18px;border:none;cursor:pointer;font-size:.875rem;font-weight:500;font-family:inherit;background:transparent;color:var(--ui-text-color, #111827);transition:all .12s;position:relative}.am-pm-btn:first-child{border-right:1.5px solid var(--ui-border-color, #e5e7eb)}.am-pm-btn.sel{background:var(--ui-primary-color, #3b82f6);color:var(--ui-text-color-on-primary, #fff);border-color:var(--ui-primary-color, #3b82f6)}.am-pm-btn:hover:not(.sel){background:var(--ui-hover-color, rgba(0,0,0,.06))}", Oc = ":host{display:inline-block;font-family:var(--ui-font-family)}.surface{border-radius:var(--ui-border-radius-xl);box-shadow:0 1px 4px #00000014,0 0 0 1px var(--ui-border-color);overflow:hidden;display:inline-block}", Tc = ":host{display:inline-block}";
var Ac = Object.defineProperty, Bc = Object.getOwnPropertyDescriptor, m = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ac(t, i, r), r;
};
function F(e) {
  return String(e).padStart(2, "0");
}
function xt(e) {
  if (!e) return null;
  const t = e.split(":").map(Number);
  return t.length < 2 || t.some(isNaN) ? null : { h: t[0], m: t[1], s: t[2] ?? 0 };
}
function De(e, t, i = 0) {
  return `${F(e)}:${F(t)}:${F(i)}`;
}
function fe(e) {
  return { hour: e % 12 || 12, ampm: e < 12 ? "AM" : "PM" };
}
function et(e, t) {
  return t === "AM" ? e === 12 ? 0 : e : e === 12 ? 12 : e + 12;
}
function Mc(e, t, i = !1) {
  const o = xt(e);
  if (!o) return "";
  const r = t ? fe(o.h).hour : o.h, a = t ? ` ${fe(o.h).ampm}` : "";
  return `${F(r)}:${F(o.m)}${i ? ":" + F(o.s) : ""}${a}`;
}
function Lc(e, t, i, o = 140, r = 140) {
  const a = (e / t - 0.25) * Math.PI * 2;
  return { x: o + i * Math.cos(a), y: r + i * Math.sin(a) };
}
function Uc(e, t, i = 140, o = 140) {
  let r = Math.atan2(t - o, e - i) * 180 / Math.PI + 90;
  return r < 0 && (r += 360), r;
}
let j = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "", this.ampm = !0, this.seconds = !1, this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._h = null, this._m = null, this._s = null, this._mer = "AM", this._active = null, this._focused = !1, this._buf = "";
  }
  get _segs() {
    const e = ["hour", "minute"];
    return this.seconds && e.push("second"), this.ampm && e.push("meridiem"), e;
  }
  willUpdate(e) {
    if (e.has("value") && this.value) {
      const t = xt(this.value);
      if (t) {
        const { hour: i, ampm: o } = fe(t.h);
        this._h = this.ampm ? i : t.h, this._m = t.m, this._s = t.s, this._mer = o;
      }
    }
  }
  clear() {
    this._h = null, this._m = null, this._s = null, this._buf = "", this.dispatchEvent(new CustomEvent("clear", { bubbles: !0, composed: !0 }));
  }
  _emit() {
    if (this._h === null || this._m === null) return;
    const e = this.ampm ? et(this._h, this._mer) : this._h, t = De(e, this._m, this._s ?? 0);
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
    const t = this._buf + e, i = this.ampm ? 12 : 23;
    if (this._active === "hour")
      if (t.length === 1) {
        const o = this.ampm ? 2 : 3;
        e >= o ? (this._h = e, this._buf = "", this._next()) : this._buf = t;
      } else {
        const o = parseInt(t);
        o >= (this.ampm ? 1 : 0) && o <= i ? (this._h = o, this._buf = "", this._next()) : (this._buf = String(e), e >= (this.ampm ? 2 : 3) && (this._h = e, this._buf = "", this._next()));
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
    const t = this.ampm ? 12 : 23, i = this.ampm ? 1 : 0;
    this._active === "hour" ? this._h = Math.min(t, Math.max(i, (this._h ?? (e > 0 ? i - 1 : t + 1)) + e)) : this._active === "minute" ? this._m = ((this._m ?? (e > 0 ? -1 : 60)) + e + 60) % 60 : this._active === "second" ? this._s = ((this._s ?? (e > 0 ? -1 : 60)) + e + 60) % 60 : this._active === "meridiem" && (this._mer = this._mer === "AM" ? "PM" : "AM"), this._emit();
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
      const i = (e === "hour" && this.ampm, 2);
      return { text: this._buf.padEnd(i, "_"), ph: !1 };
    }
    return e === "hour" ? this._h !== null ? { text: F(this._h), ph: !1 } : { text: "HH", ph: !0 } : e === "minute" ? this._m !== null ? { text: F(this._m), ph: !1 } : { text: "MM", ph: !0 } : this._s !== null ? { text: F(this._s), ph: !1 } : { text: "SS", ph: !0 };
  }
  render() {
    const e = this._h !== null || this._m !== null;
    return l`
      ${this.label ? l`<label class="label ${this._focused ? "focused" : ""}">${this.label}</label>` : v}
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
          ${this._segs.map((t, i) => {
      const { text: o, ph: r } = this._segText(t), a = i > 0 && t !== "meridiem" ? l`<span class="sep">:</span>` : t === "meridiem" ? l`<span class="sep"> </span>` : v;
      return l`${a}<span
              class=${f({ seg: !0, active: this._active === t, placeholder: r, meridiem: t === "meridiem" })}
              @click=${(n) => {
        n.stopPropagation(), this._setActive(t), this.shadowRoot?.querySelector(".segments")?.focus();
      }}
            >${o}</span>`;
    })}
        </div>
        ${e && !this.disabled ? l`<button class="icon-btn" tabindex="-1" aria-label="Clear" @click=${(t) => {
      t.stopPropagation(), this.clear();
    }}>✕</button>` : v}
      </div>
      ${this.helperText ? l`<small class="helper">${this.helperText}</small>` : v}
    `;
  }
};
j.styles = h(Pc);
m([
  s({ type: String })
], j.prototype, "value", 2);
m([
  s({ type: String })
], j.prototype, "label", 2);
m([
  s({ type: Boolean })
], j.prototype, "ampm", 2);
m([
  s({ type: Boolean })
], j.prototype, "seconds", 2);
m([
  s({ type: Boolean, reflect: !0 })
], j.prototype, "disabled", 2);
m([
  s({ type: Boolean, reflect: !0 })
], j.prototype, "readonly", 2);
m([
  s({ type: Boolean, reflect: !0 })
], j.prototype, "error", 2);
m([
  s({ type: String, attribute: "helper-text" })
], j.prototype, "helperText", 2);
m([
  b()
], j.prototype, "_h", 2);
m([
  b()
], j.prototype, "_m", 2);
m([
  b()
], j.prototype, "_s", 2);
m([
  b()
], j.prototype, "_mer", 2);
m([
  b()
], j.prototype, "_active", 2);
m([
  b()
], j.prototype, "_focused", 2);
m([
  b()
], j.prototype, "_buf", 2);
j = m([
  d("ui-time-field")
], j);
let wi = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.step = 30, this.ampm = !0;
  }
  _items() {
    const e = [];
    for (let t = 0; t < 1440; t += this.step) {
      const i = Math.floor(t / 60), o = t % 60;
      e.push(De(i, o));
    }
    return e;
  }
  _label(e) {
    return Mc(e, this.ampm);
  }
  _select(e) {
    this.dispatchEvent(new CustomEvent("change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
  _onItemKeyDown(e, t) {
    const i = this._items(), o = i.indexOf(t);
    let r = -1;
    if (e.key === "ArrowDown")
      e.preventDefault(), r = Math.min(o + 1, i.length - 1);
    else if (e.key === "ArrowUp")
      e.preventDefault(), r = Math.max(o - 1, 0);
    else if (e.key === "Home")
      e.preventDefault(), r = 0;
    else if (e.key === "End")
      e.preventDefault(), r = i.length - 1;
    else return;
    r >= 0 && r !== o && (this._select(i[r]), this.updateComplete.then(() => {
      const a = this.shadowRoot?.querySelectorAll(".item")[r];
      a?.focus(), a && typeof a.scrollIntoView == "function" && a.scrollIntoView({ block: "nearest" });
    }));
  }
  updated() {
    const e = this.shadowRoot?.querySelector(".selected");
    e && typeof e.scrollIntoView == "function" && e.scrollIntoView({ block: "center" });
  }
  render() {
    const e = this._items();
    return l`
      <div class="clock" role="listbox" aria-label="Select time">
        ${Lt(e, (t) => t, (t) => l`
          <button class=${f({ item: !0, selected: t === this.value })}
            role="option" aria-selected=${t === this.value}
            @click=${() => this._select(t)}
            @keydown=${(i) => this._onItemKeyDown(i, t)}
          >${this._label(t)}</button>
        `)}
      </div>
    `;
  }
};
wi.styles = h(zc);
m([
  s({ type: String })
], wi.prototype, "value", 2);
m([
  s({ type: Number })
], wi.prototype, "step", 2);
m([
  s({ type: Boolean })
], wi.prototype, "ampm", 2);
wi = m([
  d("ui-digital-clock")
], wi);
let ki = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  _t() {
    return xt(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  _set(e, t, i) {
    const o = De(e, t, i);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _colKeyDown(e, t) {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const i = this._t(), o = e.key === "ArrowDown" ? 1 : -1;
    if (t === "h")
      if (this.ampm) {
        const { hour: r, ampm: a } = fe(i.h), n = (r - 1 + o + 12) % 12 + 1;
        this._set(et(n, a), i.m, i.s);
      } else
        this._set((i.h + o + 24) % 24, i.m, i.s);
    else if (t === "m")
      this._set(i.h, (i.m + o + 60) % 60, i.s);
    else if (t === "s")
      this._set(i.h, i.m, (i.s + o + 60) % 60);
    else if (t === "mer") {
      const { hour: r, ampm: a } = fe(i.h);
      this._set(et(r, a === "AM" ? "PM" : "AM"), i.m, i.s);
    }
  }
  _col(e) {
    const t = this._t(), i = fe(t.h);
    if (e === "mer")
      return l`
        <div class="col" @keydown=${(n) => this._colKeyDown(n, "mer")}>
          <div class="col-header">AM/PM</div>
          ${["AM", "PM"].map((n) => l`
            <button class=${f({ item: !0, sel: i.ampm === n })}
              @click=${() => this._set(et(i.hour, n), t.m, t.s)}>${n}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;
    const o = Array.from({ length: 12 }, (n, p) => p + 1), r = Array.from({ length: 24 }, (n, p) => p), a = Array.from({ length: 60 }, (n, p) => p);
    if (e === "h") {
      const n = this.ampm ? o : r, p = this.ampm ? i.hour : t.h;
      return l`
        <div class="col" @keydown=${(u) => this._colKeyDown(u, "h")}>
          <div class="col-header">Hr</div>
          ${n.map((u) => l`
            <button class=${f({ item: !0, sel: p === u })}
              @click=${() => {
        const y = this.ampm ? et(u, i.ampm) : u;
        this._set(y, t.m, t.s);
      }}>${F(u)}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;
    }
    return e === "m" ? l`
      <div class="col" @keydown=${(n) => this._colKeyDown(n, "m")}>
        <div class="col-header">Min</div>
        ${a.map((n) => l`
          <button class=${f({ item: !0, sel: t.m === n })}
            @click=${() => this._set(t.h, n, t.s)}>${F(n)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    ` : l`
      <div class="col" @keydown=${(n) => this._colKeyDown(n, "s")}>
        <div class="col-header">Sec</div>
        ${a.map((n) => l`
          <button class=${f({ item: !0, sel: t.s === n })}
            @click=${() => this._set(t.h, t.m, n)}>${F(n)}</button>
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
        ${this.seconds ? this._col("s") : v}
        ${this.ampm ? this._col("mer") : v}
      </div>
    `;
  }
};
ki.styles = h(Dc);
m([
  s({ type: String })
], ki.prototype, "value", 2);
m([
  s({ type: Boolean })
], ki.prototype, "ampm", 2);
m([
  s({ type: Boolean })
], ki.prototype, "seconds", 2);
ki = m([
  d("ui-multi-section-digital-clock")
], ki);
let ct = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1, this.view = "hours", this._isDragging = !1, this._liveValue = "", this._onPointerDown = (e) => {
      e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId), this._isDragging = !0;
      const { mx: t, my: i } = this._getSvgCoords(e);
      this._liveValue = this._calcValue(t, i);
      const o = xt(this._liveValue);
      o && this._emit(o.h, o.m, o.s);
    }, this._onPointerMove = (e) => {
      if (!this._isDragging) return;
      const { mx: t, my: i } = this._getSvgCoords(e);
      this._liveValue = this._calcValue(t, i);
      const o = xt(this._liveValue);
      o && this._emit(o.h, o.m, o.s);
    }, this._onPointerUp = (e) => {
      if (!this._isDragging) return;
      this._isDragging = !1;
      const { mx: t, my: i } = this._getSvgCoords(e), o = this._calcValue(t, i);
      this._liveValue = "";
      const r = xt(o);
      r && this._emit(r.h, r.m, r.s), this.view === "hours" ? this._switchView("minutes") : this.view === "minutes" && this.seconds && this._switchView("seconds");
    };
  }
  get _t() {
    return xt(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  // During drag use the live (unconfirmed) value for rendering so the hand follows the pointer immediately.
  get _renderT() {
    const e = this._isDragging && this._liveValue ? this._liveValue : this.value;
    return xt(e) ?? { h: 0, m: 0, s: 0 };
  }
  _emit(e, t, i) {
    const o = De(e, t, i);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _switchView(e) {
    this.view = e, this.dispatchEvent(new CustomEvent("view-change", { detail: { view: e }, bubbles: !0, composed: !0 }));
  }
  _getSvgCoords(e) {
    const i = this.shadowRoot.querySelector("svg").getBoundingClientRect();
    return {
      mx: (e.clientX - i.left) * (280 / i.width),
      my: (e.clientY - i.top) * (280 / i.height)
    };
  }
  _calcValue(e, t) {
    const r = Uc(e, t, 140, 140), a = this._t;
    if (this.view === "hours") {
      const n = Math.sqrt((e - 140) ** 2 + (t - 140) ** 2), p = !this.ampm && n < 82;
      let u = Math.round(r / 30) % 12;
      return p ? u = u === 0 ? 0 : u + 12 : (u = u || 12, this.ampm && (u = et(u, fe(a.h).ampm))), De(u, a.m, a.s);
    } else if (this.view === "minutes") {
      const n = Math.round(r / 6) % 60;
      return De(a.h, n, a.s);
    } else {
      const n = Math.round(r / 6) % 60;
      return De(a.h, a.m, n);
    }
  }
  _onClockKeyDown(e) {
    const t = this._t;
    let i = 0;
    if (e.key === "ArrowRight" || e.key === "ArrowUp")
      e.preventDefault(), i = 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
      e.preventDefault(), i = -1;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(), this.view === "hours" ? this._switchView("minutes") : this.view === "minutes" && this.seconds && this._switchView("seconds");
      return;
    } else return;
    if (this.view === "hours")
      if (this.ampm) {
        const { hour: o, ampm: r } = fe(t.h), a = (o - 1 + i + 12) % 12 + 1;
        this._emit(et(a, r), t.m, t.s);
      } else
        this._emit((t.h + i + 24) % 24, t.m, t.s);
    else this.view === "minutes" ? this._emit(t.h, (t.m + i + 60) % 60, t.s) : this._emit(t.h, t.m, (t.s + i + 60) % 60);
  }
  _renderFace() {
    const i = this._renderT;
    let o = 0, r = 100;
    if (this.view === "hours") {
      let g;
      this.ampm ? g = fe(i.h).hour : g = i.h === 0 || i.h > 12 ? i.h % 12 : i.h, o = g / 12 * 360, r = this.ampm ? 100 : i.h === 0 || i.h > 12 ? 64 : 100;
    } else this.view === "minutes" ? (o = i.m / 60 * 360, r = 100) : (o = i.s / 60 * 360, r = 100);
    const a = (g) => (g - 90) * Math.PI / 180, n = 140 + r * Math.cos(a(o)), p = 140 + r * Math.sin(a(o)), u = [];
    if (this.view === "hours")
      if (this.ampm)
        for (let g = 1; g <= 12; g++) u.push({ val: g, label: String(g), r: 100 });
      else {
        for (let g = 1; g <= 12; g++) u.push({ val: g, label: String(g), r: 100 });
        for (let g = 13; g <= 24; g++) u.push({ val: g % 24, label: g === 24 ? "00" : String(g), r: 64, inner: !0 });
      }
    else
      for (let g = 0; g < 12; g++) {
        const T = g * 5;
        u.push({ val: T, label: F(T), r: 100 });
      }
    const y = this.view === "hours" ? 12 : 60;
    return l`
      <svg width="280" height="280" viewBox="0 0 280 280" tabindex="0"
        class=${this._isDragging ? "dragging" : ""}
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @keydown=${this._onClockKeyDown}>
        <circle cx=${140} cy=${140} r="125" class="face"></circle>
        ${this.view === "hours" && !this.ampm ? _t`<circle cx=${140} cy=${140} r="82" class="face-inner"></circle>` : v}
        <line x1=${140} y1=${140} x2=${n} y2=${p} class="hand"></line>
        <circle cx=${n} cy=${p} r="17" class="hand-tip"></circle>
        <circle cx=${140} cy=${140} r="4" class="hand-center"></circle>
        ${u.map((g) => {
      const T = g.inner ? g.val % 12 : g.val, Ne = Lc(T, y, g.r, 140, 140), ur = this.view === "hours" ? this.ampm ? fe(i.h).hour === g.val : i.h === g.val : this.view === "minutes" ? i.m === g.val : i.s === g.val;
      return _t`
          <circle cx=${Ne.x} cy=${Ne.y} r="17" class=${f({ "num-bg": !0, selected: ur })}></circle>
          <text x=${Ne.x} y=${Ne.y} dominant-baseline="central" class=${f({ num: !0, selected: ur, "inner-label": !!g.inner })}>${g.label}</text>
        `;
    })}
      </svg>
    `;
  }
  render() {
    const e = this._t, { hour: t, ampm: i } = fe(e.h), o = this.ampm ? F(t) : F(e.h);
    return l`
      <div class="clock-wrap">
        <div class="clock-header">
          <span class=${f({ "clock-seg": !0, active: this.view === "hours" })} @click=${() => this._switchView("hours")}>${o}</span>
          <span class="clock-sep">:</span>
          <span class=${f({ "clock-seg": !0, active: this.view === "minutes" })} @click=${() => this._switchView("minutes")}>${F(e.m)}</span>
          ${this.seconds ? l`<span class="clock-sep">:</span><span class=${f({ "clock-seg": !0, active: this.view === "seconds" })} @click=${() => this._switchView("seconds")}>${F(e.s)}</span>` : v}
          ${this.ampm ? l`<span class="clock-mer">${i}</span>` : v}
        </div>
        ${this.ampm ? l`
          <div class="am-pm">
            <button class=${f({ "am-pm-btn": !0, sel: i === "AM" })} @click=${() => {
      const r = this._t;
      this._emit(et(fe(r.h).hour, "AM"), r.m, r.s);
    }}>AM</button>
            <button class=${f({ "am-pm-btn": !0, sel: i === "PM" })} @click=${() => {
      const r = this._t;
      this._emit(et(fe(r.h).hour, "PM"), r.m, r.s);
    }}>PM</button>
          </div>
        ` : v}
        ${this._renderFace()}
      </div>
    `;
  }
};
ct.styles = h(Ec);
m([
  s({ type: String })
], ct.prototype, "value", 2);
m([
  s({ type: Boolean })
], ct.prototype, "ampm", 2);
m([
  s({ type: Boolean })
], ct.prototype, "seconds", 2);
m([
  s({ type: String })
], ct.prototype, "view", 2);
m([
  b()
], ct.prototype, "_isDragging", 2);
m([
  b()
], ct.prototype, "_liveValue", 2);
ct = m([
  d("ui-time-clock")
], ct);
const Jo = Ie`
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
let Ce = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "Time", this.ampm = !0, this.seconds = !1, this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._open = !1;
  }
  _commit(e) {
    this.value = e, this.dispatchEvent(new CustomEvent("change", { detail: { value: e }, bubbles: !0, composed: !0 })), this._open = !1;
  }
  render() {
    return l`
      <div class="popover-anchor">
        <ui-time-field .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds}
          ?disabled=${this.disabled} ?readonly=${this.readonly} ?error=${this.error} helper-text=${this.helperText}
          @change=${(e) => this._commit(e.detail.value)}
          @focus=${() => {
      !this.disabled && !this.readonly && (this._open = !0);
    }}
        ></ui-time-field>
        <div class="click-away ${this._open ? "open" : ""}" @click=${() => this._open = !1}></div>
        <div class="popover ${this._open ? "open" : ""}" role="dialog" aria-label="Time picker">
          <ui-multi-section-digital-clock .value=${this.value || De(12, 0)} .ampm=${this.ampm} ?seconds=${this.seconds}
            @change=${(e) => {
      this.value = e.detail.value;
    }}
          ></ui-multi-section-digital-clock>
          <div class="actions">
            <button class="btn btn-cancel" @click=${() => this._open = !1}>Cancel</button>
            <button class="btn btn-ok" @click=${() => this._commit(this.value || De(12, 0))}>OK</button>
          </div>
        </div>
      </div>
    `;
  }
};
Ce.styles = [Jo];
m([
  s({ type: String })
], Ce.prototype, "value", 2);
m([
  s({ type: String })
], Ce.prototype, "label", 2);
m([
  s({ type: Boolean })
], Ce.prototype, "ampm", 2);
m([
  s({ type: Boolean })
], Ce.prototype, "seconds", 2);
m([
  s({ type: Boolean, reflect: !0 })
], Ce.prototype, "disabled", 2);
m([
  s({ type: Boolean, reflect: !0 })
], Ce.prototype, "readonly", 2);
m([
  s({ type: Boolean, reflect: !0 })
], Ce.prototype, "error", 2);
m([
  s({ type: String, attribute: "helper-text" })
], Ce.prototype, "helperText", 2);
m([
  b()
], Ce.prototype, "_open", 2);
Ce = m([
  d("ui-desktop-time-picker")
], Ce);
let me = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "Time", this.ampm = !0, this.seconds = !1, this.disabled = !1, this.error = !1, this.helperText = "", this._open = !1, this._pending = "", this._view = "hours";
  }
  render() {
    return l`
      <ui-time-field .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds}
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
          <ui-time-clock .value=${this._pending || this.value || De(12, 0)} .ampm=${this.ampm} ?seconds=${this.seconds} .view=${this._view}
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
me.styles = [Jo];
m([
  s({ type: String })
], me.prototype, "value", 2);
m([
  s({ type: String })
], me.prototype, "label", 2);
m([
  s({ type: Boolean })
], me.prototype, "ampm", 2);
m([
  s({ type: Boolean })
], me.prototype, "seconds", 2);
m([
  s({ type: Boolean, reflect: !0 })
], me.prototype, "disabled", 2);
m([
  s({ type: Boolean, reflect: !0 })
], me.prototype, "error", 2);
m([
  s({ type: String, attribute: "helper-text" })
], me.prototype, "helperText", 2);
m([
  b()
], me.prototype, "_open", 2);
m([
  b()
], me.prototype, "_pending", 2);
m([
  b()
], me.prototype, "_view", 2);
me = m([
  d("ui-mobile-time-picker")
], me);
let $i = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  render() {
    return l`
      <div class="surface">
        <ui-multi-section-digital-clock .value=${this.value || De(12, 0)} .ampm=${this.ampm} ?seconds=${this.seconds}
          @change=${(e) => {
      this.value = e.detail.value, this.dispatchEvent(new CustomEvent("change", { detail: e.detail, bubbles: !0, composed: !0 }));
    }}
        ></ui-multi-section-digital-clock>
      </div>
    `;
  }
};
$i.styles = h(Oc);
m([
  s({ type: String })
], $i.prototype, "value", 2);
m([
  s({ type: Boolean })
], $i.prototype, "ampm", 2);
m([
  s({ type: Boolean })
], $i.prototype, "seconds", 2);
$i = m([
  d("ui-static-time-picker")
], $i);
let Me = class extends c {
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
    return e === "static" ? l`<ui-static-time-picker .value=${this.value} .ampm=${this.ampm} ?seconds=${this.seconds} @change=${this._onChange}></ui-static-time-picker>` : e === "mobile" ? l`<ui-mobile-time-picker .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-mobile-time-picker>` : l`<ui-desktop-time-picker .value=${this.value} .label=${this.label} .ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-desktop-time-picker>`;
  }
};
Me.styles = h(Tc);
m([
  s({ type: String })
], Me.prototype, "value", 2);
m([
  s({ type: String })
], Me.prototype, "label", 2);
m([
  s({ type: String })
], Me.prototype, "variant", 2);
m([
  s({ type: Boolean })
], Me.prototype, "ampm", 2);
m([
  s({ type: Boolean })
], Me.prototype, "seconds", 2);
m([
  s({ type: Boolean, reflect: !0 })
], Me.prototype, "disabled", 2);
m([
  s({ type: Boolean, reflect: !0 })
], Me.prototype, "error", 2);
m([
  s({ type: String, attribute: "helper-text" })
], Me.prototype, "helperText", 2);
Me = m([
  d("ui-time-picker")
], Me);
const jc = ':host{display:block;outline:none;font-family:var(--ui-font-family)}:host(:focus-visible) .item-row{outline:2px solid var(--ui-primary-color);outline-offset:-2px}.item-row{display:flex;align-items:center;min-height:36px;padding-right:8px;border-radius:var(--ui-border-radius-sm);cursor:pointer;-webkit-user-select:none;user-select:none;color:var(--ui-text-color);font-size:14px;transition:background-color .15s ease;position:relative}:host(:not([disabled])) .item-row:hover{background-color:var(--ui-hover-color)}:host([disabled]) .item-row{opacity:.38;cursor:default}.expand-btn{width:28px;height:28px;min-width:28px;display:flex;align-items:center;justify-content:center;background:none;border:none;padding:0;border-radius:50%;cursor:pointer;color:inherit;transition:transform .2s ease,background-color .15s}.expand-btn:hover{background-color:var(--ui-active-color)}.expand-btn.expanded{transform:rotate(90deg)}.expand-placeholder{width:28px;min-width:28px}.item-label{flex:1;line-height:1.5}.children-container{display:block}.children-container[hidden]{display:none!important}.item-row.is-draggable{cursor:grab}.item-row.is-draggable:active{cursor:grabbing}:host([drop-position="before"]) .item-row:before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background-color:var(--ui-primary-color);z-index:10;border-radius:2px}:host([drop-position="after"]) .item-row:after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background-color:var(--ui-primary-color);z-index:10;border-radius:2px}:host([drop-position="inside"]) .item-row{background-color:var(--ui-primary-color-light);outline:2px solid var(--ui-primary-color);outline-offset:-2px}:host([dragging]){opacity:.4}.drag-handle{display:flex;align-items:center;justify-content:center;width:24px;height:24px;cursor:grab;color:var(--ui-text-color-muted);margin-right:4px;flex-shrink:0}.drag-handle:active{cursor:grabbing}';
var Rc = Object.defineProperty, Nc = Object.getOwnPropertyDescriptor, Re = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Nc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Rc(t, i, r), r;
};
let ye = class extends c {
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
    const o = e.target.assignedElements({ flatten: !0 }).some((r) => r.tagName === "UI-TREE-ITEM");
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
        class=${f({ "item-row": !0, "is-draggable": this._isDraggable && !this._handleOnly })}
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
        ` : v}

        ${t ? l`
              <button
                class=${f({ "expand-btn": !0, expanded: this.expanded })}
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
        ${this.label ? v : l`<slot name="label"></slot>`}
      </div>

      <div class="children-container" ?hidden=${!this.expanded} role="group">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
ye.styles = h(jc);
Re([
  s({ type: String, attribute: "item-id", reflect: !0 })
], ye.prototype, "itemId", 2);
Re([
  s({ type: String })
], ye.prototype, "label", 2);
Re([
  s({ type: Boolean, reflect: !0 })
], ye.prototype, "disabled", 2);
Re([
  s({ type: Boolean, reflect: !0 })
], ye.prototype, "expanded", 2);
Re([
  s({ type: Boolean, attribute: "has-children", reflect: !0 })
], ye.prototype, "hasChildren", 2);
Re([
  b()
], ye.prototype, "_isDraggable", 2);
Re([
  b()
], ye.prototype, "_handleOnly", 2);
Re([
  s({ type: String, attribute: "drop-position", reflect: !0 })
], ye.prototype, "dropPosition", 2);
Re([
  s({ type: Boolean, attribute: "show-drag-handle" })
], ye.prototype, "showDragHandle", 2);
Re([
  b()
], ye.prototype, "_hasSlottedChildren", 2);
ye = Re([
  d("ui-tree-item")
], ye);
const Vc = ":host{display:block;font-family:var(--ui-font-family, system-ui, sans-serif)}.tree-root{padding:4px 0}";
var Fc = Object.defineProperty, qc = Object.getOwnPropertyDescriptor, si = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Fc(t, i, r), r;
};
let dt = class extends c {
  constructor() {
    super(...arguments), this.disabledItemsFocusable = !1, this.defaultExpandedItems = [], this.expansionTrigger = "content", this._internalExpandedItems = /* @__PURE__ */ new Set(), this._expansionInitialized = !1, this._handleKeydown = (e) => {
      const t = e.target;
      if (t.tagName !== "UI-TREE-ITEM") return;
      const i = t, o = this._getFocusableItems(), r = o.indexOf(i);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const a = o[r + 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const a = o[r - 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowRight": {
          if (e.preventDefault(), i.disabled) break;
          if (!i.expanded && this._itemHasChildren(i))
            this._handleToggle(i, !0);
          else if (i.expanded) {
            const a = this._getFocusableItems(), n = a.indexOf(i), p = a[n + 1];
            p && this._focusItem(p);
          }
          break;
        }
        case "ArrowLeft": {
          if (e.preventDefault(), i.disabled) break;
          if (i.expanded)
            this._handleToggle(i, !1);
          else {
            const a = i.parentElement;
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
          if (e.preventDefault(), i.disabled) break;
          this._itemHasChildren(i) && this._handleToggle(i, !i.expanded), this.onItemClick?.(i.itemId), this.dispatchEvent(new CustomEvent("item-click", {
            detail: { itemId: i.itemId },
            bubbles: !1
          }));
          break;
        }
        default:
          if (e.key.length === 1) {
            const a = e.key.toLowerCase(), n = r < 0 ? 0 : r + 1, u = [
              ...o.slice(n),
              ...o.slice(0, n)
            ].find(
              (y) => y.label.toLowerCase().startsWith(a)
            );
            u && this._focusItem(u);
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
      const i = e.has(t.itemId);
      t.expanded !== i && (t.expanded = i);
    });
  }
  /**
   * Central expansion dispatcher.
   * In controlled mode: fires callbacks but resets to the controlled state.
   * In uncontrolled mode: updates internal tracking and syncs items.
   */
  _handleToggle(e, t) {
    if (this._isControlled) {
      const i = new Set(this.expandedItems);
      t ? i.add(e.itemId) : i.delete(e.itemId);
      const o = Array.from(i);
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
    if (!e.some((i) => i.getAttribute("tabindex") === "0")) {
      const i = this.disabledItemsFocusable ? e[0] : e.find((o) => !o.disabled);
      i && i.setAttribute("tabindex", "0");
    }
  }
  _focusItem(e) {
    this._getAllItems().forEach((t) => t.setAttribute("tabindex", "-1")), e.setAttribute("tabindex", "0"), e.focus();
  }
  // ─── Event handlers ──────────────────────────────────────────────────────────
  _handleFocusIn(e) {
    const t = e.target;
    t.tagName === "UI-TREE-ITEM" && (this._getAllItems().forEach((i) => i.setAttribute("tabindex", "-1")), t.setAttribute("tabindex", "0"));
  }
  /** Handles the `ui-tree-item-toggle` event from the expand icon button. */
  _handleUiToggle(e) {
    const { itemId: t, expanded: i } = e.detail, o = this.getItemDOMElement(t);
    o && this._handleToggle(o, i);
  }
  /** Handles `ui-tree-item-click` (row click). Also triggers expansion in content mode. */
  _handleItemClick(e) {
    const { itemId: t } = e.detail;
    if (this.expansionTrigger === "content") {
      const i = this.getItemDOMElement(t);
      i && this._itemHasChildren(i) && this._handleToggle(i, !i.expanded);
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
    return this._getAllItems().find((i) => i.itemId === e) ?? null;
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
dt.styles = h(Vc);
si([
  s({ type: Boolean, attribute: "disabled-items-focusable" })
], dt.prototype, "disabledItemsFocusable", 2);
si([
  s({ attribute: !1 })
], dt.prototype, "onItemClick", 2);
si([
  s({ attribute: !1 })
], dt.prototype, "expandedItems", 2);
si([
  s({ attribute: !1 })
], dt.prototype, "defaultExpandedItems", 2);
si([
  s({ attribute: !1 })
], dt.prototype, "onExpandedItemsChange", 2);
si([
  s({ type: String, attribute: "expansion-trigger" })
], dt.prototype, "expansionTrigger", 2);
dt = si([
  d("ui-simple-tree-view")
], dt);
const Hc = ":host{display:block;font-family:var(--ui-font-family)}.tree-root{padding:4px 0}.lazy-indicator{display:flex;align-items:center;gap:8px;min-height:32px;font-size:14px;color:var(--ui-text-color)}.lazy-root{padding:8px}@keyframes ui-spin{to{transform:rotate(360deg)}}.lazy-spinner{width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:ui-spin .7s linear infinite;flex-shrink:0;opacity:.55}ui-tree-item[dragging]{opacity:.4}ui-tree-item[drop-position=before]{box-shadow:0 -2px 0 0 var(--ui-primary-color)}ui-tree-item[drop-position=after]{box-shadow:0 2px 0 0 var(--ui-primary-color)}ui-tree-item[drop-position=inside]{outline:2px solid var(--ui-primary-color);outline-offset:-1px;border-radius:4px}";
var Yc = Object.defineProperty, Kc = Object.getOwnPropertyDescriptor, z = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Kc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Yc(t, i, r), r;
};
let C = class extends c {
  constructor() {
    super(...arguments), this.items = [], this.getItemId = (e) => e.id, this.getItemLabel = (e) => e.label, this.getItemChildren = (e) => e.children, this.isItemDisabled = () => !1, this.disabledItemsFocusable = !1, this.expansionTrigger = "content", this.defaultExpandedItems = [], this.itemsReordering = !1, this.itemsReorderingHandle = !1, this._internalExpandedItems = /* @__PURE__ */ new Set(), this._expansionInitialized = !1, this._disabledOverrides = /* @__PURE__ */ new Map(), this._lazyChildren = /* @__PURE__ */ new Map(), this._loading = /* @__PURE__ */ new Set(), this._orderedItems = null, this._draggedItemId = null, this._dropTargetId = null, this._dropPosition = null, this._handleFocusIn = (e) => {
      const t = e.target;
      t.tagName === "UI-TREE-ITEM" && (this._getAllItems().forEach((i) => i.setAttribute("tabindex", "-1")), t.setAttribute("tabindex", "0"));
    }, this._handleUiToggle = (e) => {
      const { itemId: t, expanded: i } = e.detail, o = this.getItemDOMElement(t);
      o && this._handleToggle(o, i);
    }, this._handleItemClick = (e) => {
      const { itemId: t } = e.detail;
      if (this.expansionTrigger === "content") {
        const i = this.getItemDOMElement(t);
        i && this._itemHasChildren(i) && this._handleToggle(i, !i.expanded);
      }
      this.onItemClick?.(t), this.dispatchEvent(new CustomEvent("item-click", {
        detail: { itemId: t },
        bubbles: !1
      }));
    }, this._handleKeydown = (e) => {
      const t = e.target;
      if (t.tagName !== "UI-TREE-ITEM") return;
      const i = t, o = this._getFocusableItems(), r = o.indexOf(i);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const a = o[r + 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const a = o[r - 1];
          a && this._focusItem(a);
          break;
        }
        case "ArrowRight": {
          if (e.preventDefault(), i.disabled) break;
          if (!i.expanded && this._itemHasChildren(i))
            this._handleToggle(i, !0);
          else if (i.expanded) {
            const a = this._getFocusableItems(), n = a.indexOf(i), p = a[n + 1];
            p && this._focusItem(p);
          }
          break;
        }
        case "ArrowLeft": {
          if (e.preventDefault(), i.disabled) break;
          if (i.expanded)
            this._handleToggle(i, !1);
          else {
            const a = i.parentElement;
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
          if (e.preventDefault(), i.disabled) break;
          this._itemHasChildren(i) && this._handleToggle(i, !i.expanded), this.onItemClick?.(i.itemId), this.dispatchEvent(new CustomEvent("item-click", {
            detail: { itemId: i.itemId },
            bubbles: !1
          }));
          break;
        }
        default:
          if (e.key.length === 1) {
            const a = e.key.toLowerCase(), n = r < 0 ? 0 : r + 1, u = [
              ...o.slice(n),
              ...o.slice(0, n)
            ].find(
              (y) => y.label.toLowerCase().startsWith(a)
            );
            u && this._focusItem(u);
          }
      }
    }, this._handleDragStart = (e) => {
      if (!this.itemsReordering) return;
      const t = this._getTreeItemFromEvent(e);
      if (t) {
        if (this.itemsReorderingHandle && !e.composedPath().some(
          (r) => r instanceof HTMLElement && r.hasAttribute("data-drag-handle")
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
      const i = t.itemId;
      if (i === this._draggedItemId) {
        this._clearDropTarget();
        return;
      }
      if (this._isAncestorOf(this._draggedItemId, i, this._getEffectiveItems())) {
        this._clearDropTarget();
        return;
      }
      const o = t.getBoundingClientRect(), r = e.clientY - o.top, a = o.height;
      let n = "inside";
      if (r < a * 0.25 ? n = "before" : r > a * 0.75 && (n = "after"), this.canMoveItemToNewPosition && !this.canMoveItemToNewPosition({
        itemId: this._draggedItemId,
        targetId: i,
        position: n
      })) {
        this._clearDropTarget();
        return;
      }
      (this._dropTargetId !== i || this._dropPosition !== n) && (this._dropTargetId = i, this._dropPosition = n, this._updateItemDropStates());
    }, this._handleDragEnd = (e) => {
      const t = this._getTreeItemFromEvent(e);
      t && t.removeAttribute("dragging"), this._draggedItemId = null, this._clearDropTarget();
    }, this._handleDrop = (e) => {
      if (!this.itemsReordering || !this._draggedItemId || !this._dropTargetId || !this._dropPosition)
        return;
      e.preventDefault();
      const t = this._draggedItemId, i = this._dropTargetId, o = this._dropPosition;
      this._moveItem(t, i, o), this._draggedItemId = null, this._clearDropTarget();
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
      const i = this.isItemReorderable ? this.isItemReorderable(t.itemId) : !0;
      t.setDraggable(i, this.itemsReorderingHandle);
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
    for (const i of t) {
      if (this.getItemId(i) === e) return i;
      const o = this.getItemChildren(i) ?? [], r = this._findItemById(e, o);
      if (r) return r;
    }
    return null;
  }
  _getEffectiveItems() {
    return this.itemsReordering && this._orderedItems ? this._orderedItems : this.items;
  }
  _cloneItemsTree(e) {
    return e.map((t) => {
      const i = { ...t }, o = this.getItemChildren(t);
      if (o) {
        const r = Object.keys(t).find((a) => t[a] === o) || "children";
        i[r] = this._cloneItemsTree(o);
      }
      return i;
    });
  }
  /** Find an item and its parent list/index within a tree structure. */
  _findItemAndParentInTree(e, t, i = null) {
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      if (this.getItemId(r) === e)
        return { item: r, parentList: t, index: o, parentId: i };
      const a = this.getItemChildren(r) ?? [], n = this._findItemAndParentInTree(e, a, this.getItemId(r));
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
  _isAncestorOf(e, t, i) {
    for (const o of i) {
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
      const i = e.has(t.itemId);
      t.expanded !== i && (t.expanded = i);
    });
  }
  _handleToggle(e, t) {
    if (t && this.dataSource && !this._lazyChildren.has(e.itemId) && !this._loading.has(e.itemId) && this._loadChildren(e.itemId), this._isControlled) {
      const i = new Set(this.expandedItems);
      t ? i.add(e.itemId) : i.delete(e.itemId);
      const o = Array.from(i);
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
    if (!e.some((i) => i.getAttribute("tabindex") === "0")) {
      const i = this.disabledItemsFocusable ? e[0] : e.find((o) => !o.disabled);
      i && i.setAttribute("tabindex", "0");
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
      return t.map((r) => this.getItemId(r));
    const i = this._findItemById(e, t);
    return i ? (this.getItemChildren(i) ?? []).map((r) => this.getItemId(r)) : [];
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
    const i = this.getItemId(e), o = this.getItemLabel(e), r = this._getEffectiveDisabled(e);
    let a = [], n = !1, p = !1;
    this.dataSource ? this._lazyChildren.has(i) ? (a = this._lazyChildren.get(i), p = a.length > 0) : (n = this._loading.has(i), p = this.dataSource.getChildrenCount(e) !== 0) : (a = this.getItemChildren(e) ?? [], p = a.length > 0);
    const u = (t + 1) * 24 + 8;
    return l`
      <ui-tree-item
        item-id=${i}
        label=${o}
        ?disabled=${r}
        ?has-children=${p}
        ?show-drag-handle=${this.itemsReordering && this.itemsReorderingHandle}
      >
        ${n ? l`
          <div class="lazy-indicator" style="padding-left:${u}px">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        ` : v}
        ${a.map((y) => this._renderItem(y, t + 1))}
      </ui-tree-item>
    `;
  }
  render() {
    const e = this._getEffectiveItems(), t = this.dataSource && e.length === 0 ? this._lazyChildren.get(null) ?? [] : e, i = this.dataSource !== void 0 && this.items.length === 0 && this._loading.has(null);
    return l`
      <div class="tree-root" role="tree">
        ${i ? l`
          <div class="lazy-indicator lazy-root">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        ` : v}
        ${t.map((o) => this._renderItem(o))}
      </div>
    `;
  }
  // ─── Drag & Drop Handlers ─────────────────────────────────────────────────
  _getTreeItemFromEvent(e) {
    const t = e.composedPath();
    for (const r of t)
      if (r instanceof HTMLElement && r.tagName === "UI-TREE-ITEM")
        return r;
    const i = e.target;
    return i && i.tagName === "UI-TREE-ITEM" ? i : i?.closest?.("ui-tree-item") ?? null;
  }
  _clearDropTarget() {
    this._dropTargetId = null, this._dropPosition = null, this._updateItemDropStates();
  }
  _updateItemDropStates() {
    this._getAllItems().forEach((e) => {
      e.itemId === this._dropTargetId ? e.dropPosition = this._dropPosition : e.dropPosition = null;
    });
  }
  _moveItem(e, t, i) {
    if (!this._orderedItems) return;
    const o = this._findItemAndParentInTree(e, this._orderedItems), r = this._findItemAndParentInTree(t, this._orderedItems);
    if (!o || !r) return;
    o.parentList.splice(o.index, 1);
    let n = null, p = 0;
    if (i === "inside") {
      const u = r.item, y = this.getItemChildren(u), g = Object.keys(u).find((Ne) => u[Ne] === y) || "children";
      u[g] || (u[g] = []);
      const T = u[g];
      T.push(o.item), n = t, p = T.length - 1;
    } else {
      const u = this._findItemAndParentInTree(t, this._orderedItems);
      if (!u) return;
      const y = i === "before" ? u.index : u.index + 1;
      u.parentList.splice(y, 0, o.item), n = u.parentId, p = y;
    }
    this._orderedItems = [...this._orderedItems], this.onItemPositionChange?.({
      itemId: e,
      newParentId: n,
      newIndex: p
    }), this.dispatchEvent(new CustomEvent("item-position-change", {
      detail: { itemId: e, newParentId: n, newIndex: p },
      bubbles: !0,
      composed: !0
    }));
  }
};
C.styles = h(Hc);
z([
  s({ attribute: !1 })
], C.prototype, "items", 2);
z([
  s({ attribute: !1 })
], C.prototype, "dataSource", 2);
z([
  s({ attribute: !1 })
], C.prototype, "getItemId", 2);
z([
  s({ attribute: !1 })
], C.prototype, "getItemLabel", 2);
z([
  s({ attribute: !1 })
], C.prototype, "getItemChildren", 2);
z([
  s({ attribute: !1 })
], C.prototype, "isItemDisabled", 2);
z([
  s({ type: Boolean, attribute: "disabled-items-focusable" })
], C.prototype, "disabledItemsFocusable", 2);
z([
  s({ attribute: !1 })
], C.prototype, "onItemClick", 2);
z([
  s({ type: String, attribute: "expansion-trigger" })
], C.prototype, "expansionTrigger", 2);
z([
  s({ attribute: !1 })
], C.prototype, "expandedItems", 2);
z([
  s({ attribute: !1 })
], C.prototype, "defaultExpandedItems", 2);
z([
  s({ attribute: !1 })
], C.prototype, "onExpandedItemsChange", 2);
z([
  s({ type: Boolean, attribute: "items-reordering" })
], C.prototype, "itemsReordering", 2);
z([
  s({ attribute: !1 })
], C.prototype, "isItemReorderable", 2);
z([
  s({ attribute: !1 })
], C.prototype, "canMoveItemToNewPosition", 2);
z([
  s({ type: Boolean, attribute: "items-reordering-handle" })
], C.prototype, "itemsReorderingHandle", 2);
z([
  s({ attribute: !1 })
], C.prototype, "onItemPositionChange", 2);
z([
  b()
], C.prototype, "_orderedItems", 2);
z([
  b()
], C.prototype, "_draggedItemId", 2);
z([
  b()
], C.prototype, "_dropTargetId", 2);
z([
  b()
], C.prototype, "_dropPosition", 2);
C = z([
  d("ui-rich-tree-view")
], C);
const Wc = ":host{display:inline-flex;align-items:center;margin-left:auto;padding-left:8px;font-size:.6875rem;letter-spacing:.05em;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", Gc = ":host{display:block;height:1px;background:var(--ui-border-color);margin:4px 0}:host([hidden]){display:none!important}", Xc = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s}:host([highlighted]) .item{background:var(--ui-command-highlight-bg, var(--ui-hover-color));color:var(--ui-command-highlight-color, var(--ui-text-color))}.item:hover{background:var(--ui-hover-color)}:host([highlighted]) .item:hover{background:var(--ui-command-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.38;cursor:not-allowed;pointer-events:none}.icon{display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:var(--ui-text-color-muted)}.label{flex:1}[hidden]{display:none!important}", Zc = ":host{display:block;padding:24px 8px;text-align:center;font-size:.875rem;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}:host([hidden]){display:none!important}", Jc = ":host{display:block;font-family:var(--ui-font-family)}:host([hidden]){display:none!important}.heading{padding:6px 8px 2px;font-size:.6875rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ui-text-color-muted)}.heading:empty{display:none}", Qc = ":host{display:block;overflow-y:auto;max-height:var(--ui-command-list-max-height, 300px)}.list{padding:4px;outline:none}.list:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:-2px}", ed = ":host{display:block;font-family:var(--ui-font-family)}.input-wrap{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--ui-border-color)}.search-icon{flex-shrink:0;color:var(--ui-text-color-muted);display:flex;align-items:center}input{flex:1;border:none;outline:none;background:transparent;font-size:.9375rem;color:var(--ui-text-color);font-family:inherit;min-width:0}input::placeholder{color:var(--ui-text-color-muted)}input[type=search]::-webkit-search-cancel-button{display:none}input[type=search]::-webkit-search-decoration{display:none}", td = ":host{display:block;font-family:var(--ui-font-family);background:var(--ui-surface-1);border-radius:var(--ui-border-radius-md);overflow:hidden}.command{display:flex;flex-direction:column}", id = ":host{display:block}.backdrop{position:fixed;inset:0;background:#00000080;z-index:var(--ui-command-z-index, 1400);display:flex;align-items:flex-start;justify-content:center;padding-top:12vh;opacity:0;pointer-events:none;transition:opacity .18s ease}.backdrop.open{opacity:1;pointer-events:auto}.panel{width:100%;max-width:var(--ui-command-dialog-width, 512px);background:var(--ui-surface-1);border-radius:var(--ui-border-radius-md);box-shadow:0 20px 25px -5px #00000026,0 10px 10px -5px #0000000f;overflow:hidden;transform:scale(.94) translateY(-8px);transition:transform .18s cubic-bezier(.4,0,.2,1)}.backdrop.open .panel{transform:scale(1) translateY(0)}";
var rd = Object.defineProperty, od = Object.getOwnPropertyDescriptor, K = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? od(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && rd(t, i, r), r;
};
let vo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
vo.styles = h(Wc);
vo = K([
  d("ui-command-shortcut")
], vo);
let bo = class extends c {
  render() {
    return l``;
  }
};
bo.styles = h(Gc);
bo = K([
  d("ui-command-separator")
], bo);
let Nt = class extends c {
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
Nt.styles = h(Xc);
K([
  s({ type: String, reflect: !0 })
], Nt.prototype, "value", 2);
K([
  s({ type: Boolean, reflect: !0 })
], Nt.prototype, "disabled", 2);
K([
  s({ type: Boolean, reflect: !0 })
], Nt.prototype, "highlighted", 2);
K([
  b()
], Nt.prototype, "_hasIcon", 2);
Nt = K([
  d("ui-command-item")
], Nt);
let go = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
go.styles = h(Zc);
go = K([
  d("ui-command-empty")
], go);
let $r = class extends c {
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
$r.styles = h(Jc);
K([
  s({ type: String, reflect: !0 })
], $r.prototype, "heading", 2);
$r = K([
  d("ui-command-group")
], $r);
let mo = class extends c {
  render() {
    return l`
            <div class="list" role="listbox" tabindex="0" aria-label="Command results">
                <slot></slot>
            </div>
        `;
  }
};
mo.styles = h(Qc);
mo = K([
  d("ui-command-list")
], mo);
let Zi = class extends c {
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
Zi.styles = h(ed);
K([
  s({ type: String })
], Zi.prototype, "placeholder", 2);
K([
  s({ type: String, reflect: !0 })
], Zi.prototype, "value", 2);
Zi = K([
  d("ui-command-input")
], Zi);
let yo = class extends c {
  constructor() {
    super(...arguments), this._query = "", this._highlightedItem = null, this._handleFilter = (e) => {
      this._applyFilter(e.detail.query);
    }, this._handleKeyDown = (e) => {
      const t = this._getNavigableItems();
      if (t.length === 0) return;
      const i = this._highlightedItem ? t.indexOf(this._highlightedItem) : -1;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(), this._setHighlight(t[(i + 1) % t.length]);
          break;
        case "ArrowUp":
          e.preventDefault(), this._setHighlight(t[(i - 1 + t.length) % t.length]);
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
  _setHighlight(e, t = !0) {
    this._highlightedItem && (this._highlightedItem.highlighted = !1), this._highlightedItem = e, e && (e.highlighted = !0, t && e.scrollIntoViewIfNeeded());
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
    const t = e.toLowerCase(), i = [...this.querySelectorAll("ui-command-item")];
    let o = 0;
    for (const p of i) {
      const u = (p.value || p.textContent || "").toLowerCase().trim(), y = t === "" || u.includes(t);
      p.hidden = !y, y && o++;
    }
    const r = [...this.querySelectorAll("ui-command-group")];
    for (const p of r) {
      const u = [...p.querySelectorAll("ui-command-item")];
      p.hidden = u.length === 0 || u.every((y) => y.hidden);
    }
    const a = this.querySelector("ui-command-empty");
    a && (a.hidden = o > 0);
    const n = this.querySelector("ui-command-list");
    if (n) {
      const p = [...n.children], u = (y) => y.tagName.toLowerCase() !== "ui-command-separator" && y.tagName.toLowerCase() !== "ui-command-empty" && !y.hidden;
      for (const y of p) {
        if (y.tagName.toLowerCase() !== "ui-command-separator") continue;
        const g = p.indexOf(y), T = p.slice(0, g).some(u), Ne = p.slice(g + 1).some(u);
        y.hidden = !T || !Ne;
      }
    }
    this._setHighlight(this._getNavigableItems()[0] ?? null, !1);
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
yo.styles = h(td);
yo = K([
  d("ui-command")
], yo);
let Sr = class extends c {
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
                class=${f({ backdrop: !0, open: this.open })}
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
Sr.styles = h(id);
K([
  s({ type: Boolean, reflect: !0 })
], Sr.prototype, "open", 2);
Sr = K([
  d("ui-command-dialog")
], Sr);
const sd = ':host{display:block;overflow:hidden;width:100%}.track{display:flex;flex-wrap:nowrap;height:100%;gap:var(--ui-carousel-gap, 0px);will-change:transform;transition:transform var(--ui-carousel-duration, .35s) var(--ui-carousel-ease, cubic-bezier(.25, .1, .25, 1))}:host([orientation="vertical"]){height:var(--ui-carousel-height, 320px)}:host([orientation="vertical"]) .track{flex-direction:column}::slotted(ui-carousel-item){flex:0 0 calc((100% - (var(--ui-carousel-items-per-view, 1) - 1) * var(--ui-carousel-gap, 0px)) / var(--ui-carousel-items-per-view, 1));min-width:0;min-height:0}:host([orientation="vertical"]) ::slotted(ui-carousel-item){flex:0 0 calc((var(--ui-carousel-height, 320px) - (var(--ui-carousel-items-per-view, 1) - 1) * var(--ui-carousel-gap, 0px)) / var(--ui-carousel-items-per-view, 1));min-height:0}', ad = ":host{display:block;flex-shrink:0;min-width:0}.item{width:100%;height:100%}", nd = ":host{display:block;position:relative}.carousel{position:relative;width:100%;outline:none}.carousel:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:4px;border-radius:var(--ui-border-radius-md)}";
var ld = Object.defineProperty, cd = Object.getOwnPropertyDescriptor, ie = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cd(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ld(t, i, r), r;
};
const Qo = Ie`
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
let Si = class extends c {
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
    const i = `calc((100% + var(--ui-carousel-gap, 0px)) / ${this.itemsPerView})`, o = `calc(-${this.index} * ${i})`, r = this.orientation === "vertical" ? `translateY(${o})` : `translateX(${o})`;
    return l`
      <div
        class="track"
        style="transform: ${r}"
        aria-live="polite"
        aria-atomic="false"
      >
        <slot></slot>
      </div>
    `;
  }
};
Si.styles = h(sd);
ie([
  s({ type: Number })
], Si.prototype, "index", 2);
ie([
  s({ type: Number, attribute: "items-per-view" })
], Si.prototype, "itemsPerView", 2);
ie([
  s({ reflect: !0 })
], Si.prototype, "orientation", 2);
Si = ie([
  d("ui-carousel-content")
], Si);
let xo = class extends c {
  render() {
    return l`
      <div class="item" role="group" aria-roledescription="slide">
        <slot></slot>
      </div>
    `;
  }
};
xo.styles = h(ad);
xo = ie([
  d("ui-carousel-item")
], xo);
let Ji = class extends c {
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
Ji.styles = Qo;
ie([
  s({ type: Boolean, reflect: !0 })
], Ji.prototype, "disabled", 2);
ie([
  s({ reflect: !0 })
], Ji.prototype, "orientation", 2);
Ji = ie([
  d("ui-carousel-previous")
], Ji);
let Qi = class extends c {
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
Qi.styles = Qo;
ie([
  s({ type: Boolean, reflect: !0 })
], Qi.prototype, "disabled", 2);
ie([
  s({ reflect: !0 })
], Qi.prototype, "orientation", 2);
Qi = ie([
  d("ui-carousel-next")
], Qi);
let Vt = class extends c {
  constructor() {
    super(...arguments), this.loop = !1, this.orientation = "horizontal", this.autoplay = 0, this.itemsPerView = 1, this._currentIndex = 0, this._total = 0, this._observer = null, this._autoplayTimer = null, this._handleKeydown = (e) => {
      const t = this.orientation === "vertical", i = t ? "ArrowUp" : "ArrowLeft", o = t ? "ArrowDown" : "ArrowRight";
      e.key === i ? (e.preventDefault(), this.previous()) : e.key === o && (e.preventDefault(), this.next());
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
    ), i = this.querySelector(
      "ui-carousel-next"
    ), o = Math.max(0, this._total - this.itemsPerView);
    e && (e.index = this._currentIndex, e.orientation = this.orientation, e.itemsPerView = this.itemsPerView), t && (t.disabled = !this.loop && this._currentIndex === 0, t.orientation = this.orientation), i && (i.disabled = !this.loop && (this._total === 0 || this._currentIndex >= o), i.orientation = this.orientation);
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
Vt.styles = h(nd);
ie([
  s({ type: Boolean })
], Vt.prototype, "loop", 2);
ie([
  s({ reflect: !0 })
], Vt.prototype, "orientation", 2);
ie([
  s({ type: Number })
], Vt.prototype, "autoplay", 2);
ie([
  s({ type: Number, attribute: "items-per-view" })
], Vt.prototype, "itemsPerView", 2);
Vt = ie([
  d("ui-carousel")
], Vt);
const dd = ":host{display:block;font-size:1rem;font-weight:600;line-height:1.4;color:var(--ui-text-color);font-family:var(--ui-font-family);margin:0}", hd = ":host{display:block;font-size:.875rem;line-height:1.5;color:var(--ui-text-color-muted);font-family:var(--ui-font-family);margin:0}", pd = ":host{display:flex;align-items:center;justify-content:center}.media{display:flex;align-items:center;justify-content:center}.media--icon{width:48px;height:48px;border-radius:12px;background:var(--ui-empty-media-bg, var(--ui-surface-2));color:var(--ui-empty-media-color, var(--ui-text-color-muted))}::slotted(svg),::slotted([data-icon]){width:24px;height:24px}", ud = ":host{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}", fd = ":host{display:flex;flex-direction:column;align-items:center;gap:8px}", vd = ":host{display:flex;flex-direction:column;align-items:center;justify-content:center}.container{display:flex;flex-direction:column;align-items:center;gap:var(--ui-empty-gap, 16px);padding:var(--ui-empty-padding, 32px);max-width:var(--ui-empty-max-width, 480px);width:100%;box-sizing:border-box;text-align:center;font-family:var(--ui-font-family, system-ui, sans-serif)}";
var bd = Object.defineProperty, gd = Object.getOwnPropertyDescriptor, ai = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? gd(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && bd(t, i, r), r;
};
let _o = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
_o.styles = h(dd);
_o = ai([
  d("ui-empty-title")
], _o);
let wo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
wo.styles = h(hd);
wo = ai([
  d("ui-empty-description")
], wo);
let Cr = class extends c {
  constructor() {
    super(...arguments), this.variant = "default";
  }
  render() {
    return l`
            <div class=${f({ media: !0, "media--icon": this.variant === "icon" })}>
                <slot></slot>
            </div>
        `;
  }
};
Cr.styles = h(pd);
ai([
  s({ reflect: !0 })
], Cr.prototype, "variant", 2);
Cr = ai([
  d("ui-empty-media")
], Cr);
let ko = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
ko.styles = h(ud);
ko = ai([
  d("ui-empty-header")
], ko);
let $o = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
$o.styles = h(fd);
$o = ai([
  d("ui-empty-content")
], $o);
let So = class extends c {
  render() {
    return l`
            <div class="container" part="container">
                <slot></slot>
            </div>
        `;
  }
};
So.styles = h(vd);
So = ai([
  d("ui-empty")
], So);
const md = ":host{display:block}.trigger{display:flex;align-items:center;width:100%;background:none;border:none;padding:0;margin:0;cursor:pointer;font:inherit;color:inherit;text-align:left}:host([disabled]) .trigger{cursor:not-allowed;opacity:.5}", yd = ":host{display:block}.panel{display:grid;grid-template-rows:0fr;overflow:hidden;transition:grid-template-rows var(--ui-collapsible-duration, .2s) var(--ui-collapsible-easing, ease)}:host([open]) .panel{grid-template-rows:1fr}.panel-inner{overflow:hidden}", xd = ":host{display:block}";
var _d = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, bt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wd(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _d(t, i, r), r;
};
let er = class extends c {
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
er.styles = h(md);
bt([
  s({ type: Boolean, reflect: !0 })
], er.prototype, "expanded", 2);
bt([
  s({ type: Boolean, reflect: !0 })
], er.prototype, "disabled", 2);
er = bt([
  d("ui-collapsible-trigger")
], er);
let Ir = class extends c {
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
Ir.styles = h(yd);
bt([
  s({ type: Boolean, reflect: !0 })
], Ir.prototype, "open", 2);
Ir = bt([
  d("ui-collapsible-content")
], Ir);
let Ci = class extends c {
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
Ci.styles = h(xd);
bt([
  s({ type: Boolean, reflect: !0 })
], Ci.prototype, "open", 2);
bt([
  s({ type: Boolean, attribute: "default-open" })
], Ci.prototype, "defaultOpen", 2);
bt([
  s({ type: Boolean, reflect: !0 })
], Ci.prototype, "disabled", 2);
Ci = bt([
  d("ui-collapsible")
], Ci);
const kd = ":host{display:inline-block}", $d = ":host{display:block;position:absolute;z-index:var(--ui-hovercard-z-index, 1000);opacity:0;visibility:hidden;transition:opacity var(--ui-hovercard-duration, .15s) ease,visibility var(--ui-hovercard-duration, .15s) ease;pointer-events:none}:host([open]){opacity:1;visibility:visible;pointer-events:auto}.card{background:var(--ui-hovercard-bg, var(--ui-surface-1));border:1px solid var(--ui-hovercard-border-color, var(--ui-border-color));border-radius:var(--ui-hovercard-radius, 8px);box-shadow:var(--ui-hovercard-shadow, 0 4px 16px rgba(0, 0, 0, .12));padding:var(--ui-hovercard-padding, 16px);min-width:var(--ui-hovercard-min-width, 200px);font-family:var(--ui-font-family);font-size:var(--ui-hovercard-font-size, .875rem);color:var(--ui-hovercard-color, var(--ui-text-color));line-height:1.5}", Sd = ":host{display:inline-block;position:relative}";
var Cd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, At = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Id(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Cd(t, i, r), r;
};
let Co = class extends c {
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
Co.styles = h(kd);
Co = At([
  d("ui-hover-card-trigger")
], Co);
let Ii = class extends c {
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
    const { side: e, align: t } = this, i = "var(--ui-hovercard-offset, 8px)";
    this.style.removeProperty("top"), this.style.removeProperty("bottom"), this.style.removeProperty("left"), this.style.removeProperty("right"), this.style.removeProperty("transform"), e === "bottom" || e === "top" ? (this.style.setProperty(
      e === "bottom" ? "top" : "bottom",
      `calc(100% + ${i})`
    ), t === "start" ? this.style.setProperty("left", "0") : t === "end" ? this.style.setProperty("right", "0") : (this.style.setProperty("left", "50%"), this.style.setProperty("transform", "translateX(-50%)"))) : (this.style.setProperty(
      e === "right" ? "left" : "right",
      `calc(100% + ${i})`
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
Ii.styles = h($d);
At([
  s({ type: String, reflect: !0 })
], Ii.prototype, "side", 2);
At([
  s({ type: String, reflect: !0 })
], Ii.prototype, "align", 2);
At([
  s({ type: Boolean, reflect: !0 })
], Ii.prototype, "open", 2);
Ii = At([
  d("ui-hover-card-content")
], Ii);
let tr = class extends c {
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
    this._cancelOpen(), this._cancelClose(), this._closeTimer = setTimeout(() => this._setOpen(!1), this.closeDelay);
  }
  /** Called by `ui-hover-card-content` when the pointer enters the card. */
  handleContentEnter() {
    this._cancelClose();
  }
  /** Called by `ui-hover-card-content` when the pointer leaves the card. */
  handleContentLeave() {
    this._cancelClose(), this._closeTimer = setTimeout(() => this._setOpen(!1), this.closeDelay);
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
tr.styles = h(Sd);
At([
  s({ type: Number, attribute: "open-delay" })
], tr.prototype, "openDelay", 2);
At([
  s({ type: Number, attribute: "close-delay" })
], tr.prototype, "closeDelay", 2);
tr = At([
  d("ui-hover-card")
], tr);
const Pd = ":host{display:inline-flex;align-items:center}", zd = ":host{display:inline-flex;align-items:center;padding:0 6px;color:var(--ui-text-color, #111827)}.bar{width:8px;height:2px;background:currentColor;border-radius:1px;opacity:.4}", Dd = ":host{position:relative;display:inline-flex;align-items:center;justify-content:center;width:40px;height:48px;font-size:1.25rem;font-family:var(--ui-font-family);font-weight:500;color:var(--ui-text-color);background:var(--ui-input-bg);border:1px solid var(--ui-input-border-color);margin-left:-1px;cursor:text;-webkit-user-select:none;user-select:none;transition:border-color .15s ease,box-shadow .15s ease}:host(:first-child){margin-left:0;border-radius:6px 0 0 6px}:host(:last-child){border-radius:0 6px 6px 0}:host([active]){z-index:1;border-color:var(--ui-primary-color);box-shadow:0 0 0 2px var(--ui-primary-focus-ring)}:host([invalid]){border-color:var(--ui-error-color)}:host([invalid][active]){border-color:var(--ui-error-color);box-shadow:0 0 0 2px var(--ui-error-focus-ring)}.cursor{width:2px;height:1.2em;background:var(--ui-text-color);border-radius:1px;animation:otp-blink 1.2s step-end infinite}@keyframes otp-blink{0%,to{opacity:1}50%{opacity:0}}", Ed = ":host{display:inline-flex;align-items:center;gap:8px;position:relative;cursor:text;font-family:var(--ui-font-family, system-ui, sans-serif)}:host([disabled]){opacity:.5;cursor:not-allowed;pointer-events:none}.hidden-input{position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;top:0;left:0;border:none;outline:none;padding:0;margin:0}";
var Od = Object.defineProperty, Td = Object.getOwnPropertyDescriptor, he = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Td(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Od(t, i, r), r;
};
let Io = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Io.styles = h(Pd);
Io = he([
  d("ui-input-otp-group")
], Io);
let Po = class extends c {
  render() {
    return l`<div class="bar"></div>`;
  }
};
Po.styles = h(zd);
Po = he([
  d("ui-input-otp-separator")
], Po);
let Ft = class extends c {
  constructor() {
    super(...arguments), this.index = 0, this.char = "", this.active = !1, this.invalid = !1;
  }
  render() {
    return this.char ? l`${this.char}` : this.active ? l`<div class="cursor"></div>` : l``;
  }
};
Ft.styles = h(Dd);
he([
  s({ type: Number })
], Ft.prototype, "index", 2);
he([
  s()
], Ft.prototype, "char", 2);
he([
  s({ type: Boolean, reflect: !0 })
], Ft.prototype, "active", 2);
he([
  s({ type: Boolean, reflect: !0 })
], Ft.prototype, "invalid", 2);
Ft = he([
  d("ui-input-otp-slot")
], Ft);
let ht = class extends c {
  constructor() {
    super(), this.value = "", this.defaultValue = "", this.maxLength = 6, this.pattern = "", this.disabled = !1, this._internalValue = "", this._focused = !1, this._cursorIndex = 0, this._firstUpdate = !0, this.addEventListener("click", (e) => {
      if (this.disabled) return;
      const i = e.target.closest("ui-input-otp-slot");
      this._hiddenInput?.focus(), i && (this._cursorIndex = Math.min(i.index, this._internalValue.length), this._syncSlots());
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
    const e = this._getAllSlots(), t = this._internalValue.length, i = this._focused ? this._cursorIndex : -1;
    for (const o of e) {
      const r = o.index;
      o.char = r < t ? this._internalValue[r] : "", o.active = r === i;
    }
  }
  _filterByPattern(e) {
    if (!this.pattern) return e;
    const t = new RegExp(this.pattern);
    return e.split("").filter((i) => t.test(i)).join("");
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
    const t = this._cursorIndex, i = this._internalValue;
    let o;
    if (t < i.length)
      o = i.slice(0, t) + e + i.slice(t + 1);
    else if (i.length < this.maxLength)
      o = i + e;
    else
      return;
    this._commit(o), this._cursorIndex = Math.min(t + 1, this.maxLength - 1), this._syncSlots();
  }
  /** Delete the character at the cursor (standard Backspace). */
  _deleteBackward() {
    if (this._internalValue.length === 0) return;
    const e = this._cursorIndex;
    if (e === 0) return;
    const t = this._internalValue, i = t.slice(0, e - 1) + t.slice(e);
    this._commit(i), this._cursorIndex = e - 1, this._syncSlots();
  }
  /** Delete the character at the cursor (Delete key). */
  _deleteForward() {
    const e = this._cursorIndex, t = this._internalValue;
    if (e >= t.length) return;
    const i = t.slice(0, e) + t.slice(e + 1);
    this._commit(i), this._syncSlots();
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
    const t = e.clipboardData?.getData("text") ?? "", i = this._filterByPattern(t).slice(0, this.maxLength);
    this._commit(i), this._cursorIndex = Math.min(i.length, this.maxLength - 1), this._syncSlots();
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
  /**
   * Compute the appropriate mobile keyboard type.
   * Returns 'numeric' for digit-only patterns (or no pattern), 'text' otherwise.
   */
  get _computedInputMode() {
    if (!this.pattern) return "numeric";
    try {
      return new RegExp(this.pattern).test("a") ? "text" : "numeric";
    } catch {
      return "text";
    }
  }
  render() {
    return l`
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
};
ht.styles = h(Ed);
he([
  s({ reflect: !0 })
], ht.prototype, "value", 2);
he([
  s({ attribute: "default-value" })
], ht.prototype, "defaultValue", 2);
he([
  s({ type: Number, attribute: "max-length" })
], ht.prototype, "maxLength", 2);
he([
  s()
], ht.prototype, "pattern", 2);
he([
  s({ type: Boolean, reflect: !0 })
], ht.prototype, "disabled", 2);
he([
  zt(".hidden-input")
], ht.prototype, "_hiddenInput", 2);
ht = he([
  d("ui-input-otp")
], ht);
const Ad = ":host{display:block;font-size:.875rem;font-weight:500;line-height:1.4;color:var(--ui-text-color);font-family:var(--ui-font-family)}", Bd = ":host{display:block;font-size:.8125rem;line-height:1.5;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", Md = ":host{display:flex;flex-shrink:0;align-items:center;justify-content:center}.media{display:flex;align-items:center;justify-content:center}.media--icon{width:40px;height:40px;border-radius:8px;background:var(--ui-item-media-icon-bg, var(--ui-surface-2));color:var(--ui-item-media-icon-color, var(--ui-text-color-muted))}.media--image{width:40px;height:40px;border-radius:6px;overflow:hidden;flex-shrink:0}::slotted(svg),::slotted([data-icon]){width:20px;height:20px}::slotted(img){width:100%;height:100%;object-fit:cover;display:block}", Ld = ":host{display:flex;flex-direction:column;flex:1 1 auto;min-width:0;gap:2px}", Ud = ":host{display:flex;flex-shrink:0;align-items:center;gap:8px;margin-left:auto}", jd = ":host{display:block;flex:0 0 calc(100% + 2 * var(--ui-item-padding, 16px));margin-left:calc(-1 * var(--ui-item-padding, 16px));margin-right:calc(-1 * var(--ui-item-padding, 16px));margin-top:calc(-1 * var(--ui-item-padding, 16px));margin-bottom:0;overflow:hidden;line-height:0}::slotted(img){width:100%;display:block;object-fit:cover}", Rd = ":host{display:block;flex:0 0 calc(100% + 2 * var(--ui-item-padding, 16px));margin-left:calc(-1 * var(--ui-item-padding, 16px));margin-right:calc(-1 * var(--ui-item-padding, 16px));margin-bottom:calc(-1 * var(--ui-item-padding, 16px));margin-top:0;padding:10px var(--ui-item-padding, 16px);border-top:1px solid var(--ui-border-color);background:var(--ui-item-footer-bg, transparent);box-sizing:border-box;font-size:.8125rem;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", Nd = ":host{display:block;height:1px;background:var(--ui-border-color)}", Vd = ":host{display:flex;flex-direction:column;gap:var(--ui-item-group-gap, 4px)}", Fd = ':host{--ui-item-padding: 16px;--ui-item-gap: 12px;display:flex;flex-wrap:wrap;align-items:center;gap:var(--ui-item-gap);padding:var(--ui-item-padding);border-radius:8px;box-sizing:border-box;overflow:hidden;font-family:var(--ui-font-family)}:host([size="sm"]){--ui-item-padding: 12px;--ui-item-gap: 8px}:host([size="xs"]){--ui-item-padding: 8px;--ui-item-gap: 6px}:host([variant="outline"]){border:1px solid var(--ui-border-color)}:host([variant="muted"]){background:var(--ui-muted-bg, var(--ui-muted-background))}';
var qd = Object.defineProperty, Hd = Object.getOwnPropertyDescriptor, _e = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Hd(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && qd(t, i, r), r;
};
let zo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
zo.styles = h(Ad);
zo = _e([
  d("ui-item-title")
], zo);
let Do = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Do.styles = h(Bd);
Do = _e([
  d("ui-item-description")
], Do);
let Pr = class extends c {
  constructor() {
    super(...arguments), this.variant = "default";
  }
  render() {
    return l`
            <div class=${f({
      media: !0,
      "media--icon": this.variant === "icon",
      "media--image": this.variant === "image"
    })}>
                <slot></slot>
            </div>
        `;
  }
};
Pr.styles = h(Md);
_e([
  s({ reflect: !0 })
], Pr.prototype, "variant", 2);
Pr = _e([
  d("ui-item-media")
], Pr);
let Eo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Eo.styles = h(Ld);
Eo = _e([
  d("ui-item-content")
], Eo);
let Oo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Oo.styles = h(Ud);
Oo = _e([
  d("ui-item-actions")
], Oo);
let To = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
To.styles = h(jd);
To = _e([
  d("ui-item-header")
], To);
let Ao = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ao.styles = h(Rd);
Ao = _e([
  d("ui-item-footer")
], Ao);
let Bo = class extends c {
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "separator"), this.hasAttribute("aria-orientation") || this.setAttribute("aria-orientation", "horizontal");
  }
  render() {
    return l``;
  }
};
Bo.styles = h(Nd);
Bo = _e([
  d("ui-item-separator")
], Bo);
let Mo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Mo.styles = h(Vd);
Mo = _e([
  d("ui-item-group")
], Mo);
let ir = class extends c {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "default";
  }
  render() {
    return l`<slot></slot>`;
  }
};
ir.styles = h(Fd);
_e([
  s({ reflect: !0 })
], ir.prototype, "variant", 2);
_e([
  s({ reflect: !0 })
], ir.prototype, "size", 2);
ir = _e([
  d("ui-item")
], ir);
const Yd = ':host{display:inline-flex;align-items:center;justify-content:center}kbd{display:inline-flex;align-items:center;justify-content:center;font-family:var(--ui-kbd-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);font-size:.8125rem;font-weight:500;line-height:1;color:var(--ui-kbd-color, var(--ui-label-color));background:var(--ui-kbd-bg, var(--ui-surface-2));border:1px solid var(--ui-kbd-border-color, var(--ui-border-color));border-bottom-width:2px;border-radius:var(--ui-kbd-radius, var(--ui-border-radius-sm));box-shadow:0 1px 0 0 var(--ui-kbd-shadow-color, var(--ui-input-border-color));padding:2px 6px;white-space:nowrap;-webkit-user-select:none;user-select:none}:host([size="sm"]) kbd{font-size:.6875rem;padding:1px 4px}:host([size="lg"]) kbd{font-size:.9375rem;padding:4px 10px}:host([variant="flat"]) kbd{border-bottom-width:1px;box-shadow:none}', Kd = ":host{display:inline-flex;align-items:center;gap:var(--ui-kbd-group-gap, 4px)}";
var Wd = Object.defineProperty, Gd = Object.getOwnPropertyDescriptor, dr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Gd(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Wd(t, i, r), r;
};
let Pi = class extends c {
  constructor() {
    super(...arguments), this.size = "default", this.variant = "raised", this.label = "";
  }
  render() {
    return l`
            <kbd aria-label=${this.label || v}>
                <slot></slot>
            </kbd>
        `;
  }
};
Pi.styles = h(Yd);
dr([
  s({ reflect: !0 })
], Pi.prototype, "size", 2);
dr([
  s({ reflect: !0 })
], Pi.prototype, "variant", 2);
dr([
  s({ reflect: !0 })
], Pi.prototype, "label", 2);
Pi = dr([
  d("ui-kbd")
], Pi);
let Lo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Lo.styles = h(Kd);
Lo = dr([
  d("ui-kbd-group")
], Lo);
const Xd = ":host{display:inline-flex;align-items:center;margin-left:auto;padding-left:16px;font-size:.6875rem;letter-spacing:.05em;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", Zd = ":host{display:block;height:1px;background:var(--ui-border-color);margin:4px -4px}:host([hidden]){display:none!important}", Jd = ":host{display:block}.heading{padding:6px 8px 4px;font-size:.6875rem;font-weight:600;color:var(--ui-text-color-muted);font-family:var(--ui-font-family);-webkit-user-select:none;user-select:none}", Qd = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s}:host([inset]) .item{padding-left:32px}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none;cursor:default}", eh = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px 6px 32px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s;position:relative}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none}.check{position:absolute;left:8px;top:50%;transform:translateY(-50%);width:16px;height:16px;display:flex;align-items:center;justify-content:center}", th = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px 6px 32px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s;position:relative}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none}.dot{position:absolute;left:8px;top:50%;transform:translateY(-50%);width:16px;height:16px;display:flex;align-items:center;justify-content:center}", ih = ":host{display:block}", rh = ":host{display:none;position:absolute;left:100%;top:-4px;z-index:1001}:host([open]){display:block}.panel{min-width:180px;background:var(--ui-menubar-content-bg, var(--ui-surface-1));border:1px solid var(--ui-border-color);border-radius:6px;padding:4px;box-shadow:0 4px 16px #0000001f;animation:menubar-sub-in .12s ease-out}@keyframes menubar-sub-in{0%{opacity:0;transform:translate(-4px)}to{opacity:1;transform:translate(0)}}", oh = ":host{display:block}.item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s}:host([inset]) .item{padding-left:32px}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none}.arrow{margin-left:auto;width:14px;height:14px;color:var(--ui-text-color-muted)}", sh = ":host{display:block;position:relative}", ah = ":host{display:none;position:absolute;top:100%;left:0;z-index:1000;padding-top:4px}:host([open]){display:block}.panel{min-width:200px;background:var(--ui-menubar-content-bg, var(--ui-surface-1));border:1px solid var(--ui-border-color);border-radius:6px;padding:4px;box-shadow:0 4px 16px #0000001f;animation:menubar-in .12s ease-out}@keyframes menubar-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}", nh = ":host{display:inline-flex}.trigger{display:inline-flex;align-items:center;justify-content:center;padding:4px 10px;border:none;background:transparent;border-radius:4px;font-size:.875rem;font-weight:500;line-height:1.5;color:var(--ui-text-color);font-family:var(--ui-font-family);cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap;transition:background .1s}.trigger:hover,:host([active]) .trigger{background:var(--ui-menubar-trigger-hover-bg, var(--ui-hover-color))}.trigger:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:-2px}.trigger:disabled,:host([disabled]) .trigger{opacity:.5;cursor:default;pointer-events:none}", lh = ":host{display:inline-block;position:relative}", ch = ":host{display:inline-flex;align-items:center;background:var(--ui-menubar-bg, var(--ui-surface-1));border:1px solid var(--ui-border-color);border-radius:6px;padding:3px;gap:2px;font-family:var(--ui-font-family)}";
var dh = Object.defineProperty, hh = Object.getOwnPropertyDescriptor, x = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? hh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && dh(t, i, r), r;
};
let Uo = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Uo.styles = h(Xd);
Uo = x([
  d("ui-menubar-shortcut")
], Uo);
let jo = class extends c {
  render() {
    return l``;
  }
};
jo.styles = h(Zd);
jo = x([
  d("ui-menubar-separator")
], jo);
let zr = class extends c {
  constructor() {
    super(...arguments), this.heading = "";
  }
  render() {
    return l`
            ${this.heading ? l`<div class="heading" role="presentation">${this.heading}</div>` : v}
            <div role="group" aria-label=${this.heading || v}>
                <slot></slot>
            </div>
        `;
  }
};
zr.styles = h(Jd);
x([
  s({ reflect: !0 })
], zr.prototype, "heading", 2);
zr = x([
  d("ui-menubar-group")
], zr);
let qt = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this.highlighted = !1, this.inset = !1, this.value = "";
  }
  /** Returns label text from direct text nodes only (excludes shortcut element content). */
  _labelText() {
    return Array.from(this.childNodes).filter((e) => e.nodeType === Node.TEXT_NODE).map((e) => e.textContent ?? "").join("").trim();
  }
  /** Activate the item — fires select event. */
  select() {
    this.disabled || this.dispatchEvent(new CustomEvent("ui-menubar-item-select", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value || this._labelText() }
    }));
  }
  render() {
    return l`<div class="item" role="menuitem" aria-disabled=${this.disabled}><slot></slot></div>`;
  }
};
qt.styles = h(Qd);
x([
  s({ reflect: !0, type: Boolean })
], qt.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], qt.prototype, "highlighted", 2);
x([
  s({ reflect: !0, type: Boolean })
], qt.prototype, "inset", 2);
x([
  s({ reflect: !0 })
], qt.prototype, "value", 2);
qt = x([
  d("ui-menubar-item")
], qt);
let Ht = class extends c {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.highlighted = !1, this.value = "";
  }
  _labelText() {
    return Array.from(this.childNodes).filter((e) => e.nodeType === Node.TEXT_NODE).map((e) => e.textContent ?? "").join("").trim();
  }
  toggle() {
    this.disabled || (this.checked = !this.checked, this.dispatchEvent(new CustomEvent("ui-menubar-checkbox-change", {
      bubbles: !0,
      composed: !0,
      detail: { checked: this.checked, value: this.value || this._labelText() }
    })));
  }
  render() {
    return l`
            <div class="item" role="menuitemcheckbox" aria-checked=${this.checked} aria-disabled=${this.disabled}>
                <span class="check">
                    ${this.checked ? l`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>` : v}
                </span>
                <slot></slot>
            </div>
        `;
  }
};
Ht.styles = h(eh);
x([
  s({ reflect: !0, type: Boolean })
], Ht.prototype, "checked", 2);
x([
  s({ reflect: !0, type: Boolean })
], Ht.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], Ht.prototype, "highlighted", 2);
x([
  s({ reflect: !0 })
], Ht.prototype, "value", 2);
Ht = x([
  d("ui-menubar-checkbox-item")
], Ht);
let Yt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.checked = !1, this.disabled = !1, this.highlighted = !1;
  }
  select() {
    this.disabled || this.dispatchEvent(new CustomEvent("_menubar-radio-select", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value }
    }));
  }
  render() {
    return l`
            <div class="item" role="menuitemradio" aria-checked=${this.checked} aria-disabled=${this.disabled}>
                <span class="dot">
                    ${this.checked ? l`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"></circle></svg>` : v}
                </span>
                <slot></slot>
            </div>
        `;
  }
};
Yt.styles = h(th);
x([
  s({ reflect: !0 })
], Yt.prototype, "value", 2);
x([
  s({ reflect: !0, type: Boolean })
], Yt.prototype, "checked", 2);
x([
  s({ reflect: !0, type: Boolean })
], Yt.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], Yt.prototype, "highlighted", 2);
Yt = x([
  d("ui-menubar-radio-item")
], Yt);
let Dr = class extends c {
  constructor() {
    super(...arguments), this.value = "", this._handleRadioSelect = (e) => {
      const t = e;
      t.stopPropagation(), this.value = t.detail.value, this._syncChecked(), this.dispatchEvent(new CustomEvent("ui-menubar-radio-change", {
        bubbles: !0,
        composed: !0,
        detail: { value: this.value }
      }));
    }, this._onSlotChange = () => {
      this._syncChecked();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("_menubar-radio-select", this._handleRadioSelect);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("_menubar-radio-select", this._handleRadioSelect);
  }
  updated(e) {
    e.has("value") && this._syncChecked();
  }
  _syncChecked() {
    this.querySelectorAll("ui-menubar-radio-item").forEach((t) => {
      t.checked = t.value === this.value;
    });
  }
  render() {
    return l`<div role="group"><slot @slotchange=${this._onSlotChange}></slot></div>`;
  }
};
Dr.styles = h(ih);
x([
  s({ reflect: !0 })
], Dr.prototype, "value", 2);
Dr = x([
  d("ui-menubar-radio-group")
], Dr);
let Er = class extends c {
  constructor() {
    super(...arguments), this.open = !1;
  }
  updated(e) {
    e.has("open") && this.open && requestAnimationFrame(() => {
      this.getBoundingClientRect().right > window.innerWidth ? (this.style.left = "auto", this.style.right = "100%") : (this.style.left = "", this.style.right = "");
    });
  }
  render() {
    return l`<div class="panel" role="menu"><slot></slot></div>`;
  }
};
Er.styles = h(rh);
x([
  s({ reflect: !0, type: Boolean })
], Er.prototype, "open", 2);
Er = x([
  d("ui-menubar-sub-content")
], Er);
let Kt = class extends c {
  constructor() {
    super(...arguments), this.highlighted = !1, this.disabled = !1, this.inset = !1, this.expanded = !1;
  }
  render() {
    return l`
            <div class="item"
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded=${this.expanded}
                aria-disabled=${this.disabled}>
                <slot></slot>
                <svg class="arrow" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        `;
  }
};
Kt.styles = h(oh);
x([
  s({ reflect: !0, type: Boolean })
], Kt.prototype, "highlighted", 2);
x([
  s({ reflect: !0, type: Boolean })
], Kt.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], Kt.prototype, "inset", 2);
x([
  s({ reflect: !0, type: Boolean })
], Kt.prototype, "expanded", 2);
Kt = x([
  d("ui-menubar-sub-trigger")
], Kt);
let Ro = class extends c {
  constructor() {
    super(...arguments), this._open = !1, this._openTimer = null, this._closeTimer = null, this._handleMouseEnter = () => {
      this.show();
    }, this._handleMouseLeave = () => {
      this.hide();
    };
  }
  get open() {
    return this._open;
  }
  show() {
    this._closeTimer && (clearTimeout(this._closeTimer), this._closeTimer = null), this._openTimer = setTimeout(() => {
      this._open = !0, this._syncState();
    }, 80);
  }
  /** Opens the sub-menu immediately without the hover delay. Use for keyboard interactions. */
  showImmediate() {
    this._openTimer && (clearTimeout(this._openTimer), this._openTimer = null), this._closeTimer && (clearTimeout(this._closeTimer), this._closeTimer = null), this._open = !0, this._syncState();
  }
  hide() {
    this._openTimer && (clearTimeout(this._openTimer), this._openTimer = null), this._closeTimer = setTimeout(() => {
      this._open = !1, this._syncState();
    }, 60);
  }
  hideImmediate() {
    this._openTimer && (clearTimeout(this._openTimer), this._openTimer = null), this._closeTimer && (clearTimeout(this._closeTimer), this._closeTimer = null), this._open = !1, this._syncState();
  }
  _syncState() {
    const e = this.querySelector(":scope > ui-menubar-sub-content");
    e && (e.open = this._open);
    const t = this.querySelector(":scope > ui-menubar-sub-trigger");
    t && (t.highlighted = this._open, t.expanded = this._open);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("mouseenter", this._handleMouseEnter), this.addEventListener("mouseleave", this._handleMouseLeave);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mouseenter", this._handleMouseEnter), this.removeEventListener("mouseleave", this._handleMouseLeave), this._openTimer && clearTimeout(this._openTimer), this._closeTimer && clearTimeout(this._closeTimer);
  }
  render() {
    return l`<slot></slot>`;
  }
};
Ro.styles = h(sh);
Ro = x([
  d("ui-menubar-sub")
], Ro);
let Or = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this._highlightIndex = -1, this._handleClick = (e) => {
      const t = e.target, i = t.closest("ui-menubar-item");
      if (i && !i.disabled) {
        i.select(), this._requestClose();
        return;
      }
      const o = t.closest("ui-menubar-checkbox-item");
      if (o && !o.disabled) {
        o.toggle();
        return;
      }
      const r = t.closest("ui-menubar-radio-item");
      if (r && !r.disabled) {
        r.select();
        return;
      }
    }, this._handleMouseOver = (e) => {
      const i = e.target.closest("ui-menubar-item, ui-menubar-checkbox-item, ui-menubar-radio-item, ui-menubar-sub-trigger");
      if (i && !i.disabled) {
        this._clearHighlight(), i.highlighted = !0;
        const o = this._getNavigableItems();
        this._highlightIndex = o.indexOf(i);
      }
    };
  }
  /** Get all navigable items (items, checkbox items, radio items, sub-triggers). */
  _getNavigableItems() {
    const e = [
      "ui-menubar-item:not([disabled]):not([hidden])",
      "ui-menubar-checkbox-item:not([disabled]):not([hidden])",
      "ui-menubar-radio-item:not([disabled]):not([hidden])",
      "ui-menubar-sub-trigger:not([disabled]):not([hidden])"
    ].join(",");
    return Array.from(this.querySelectorAll(e));
  }
  _clearHighlight() {
    this._getNavigableItems().forEach((t) => t.highlighted = !1), this._highlightIndex = -1;
  }
  _highlightItem(e) {
    const t = this._getNavigableItems();
    if (t.length === 0) return;
    this._clearHighlight(), this._highlightIndex = (e % t.length + t.length) % t.length;
    const i = t[this._highlightIndex];
    i.highlighted = !0;
  }
  /** Handle keyboard navigation inside the content panel. */
  handleKeyDown(e) {
    const t = this._getNavigableItems();
    switch (e.key) {
      case "ArrowDown": {
        if (e.preventDefault(), t.length === 0) return;
        this._highlightItem(this._highlightIndex + 1);
        break;
      }
      case "ArrowUp": {
        if (e.preventDefault(), t.length === 0) return;
        this._highlightItem(this._highlightIndex - 1);
        break;
      }
      case "Home": {
        if (e.preventDefault(), t.length === 0) return;
        this._highlightItem(0);
        break;
      }
      case "End": {
        if (e.preventDefault(), t.length === 0) return;
        this._highlightItem(t.length - 1);
        break;
      }
      case "Enter":
      case " ": {
        if (e.preventDefault(), this._highlightIndex >= 0 && this._highlightIndex < t.length) {
          const i = t[this._highlightIndex];
          if (i.tagName === "UI-MENUBAR-ITEM")
            i.select(), this._requestClose();
          else if (i.tagName === "UI-MENUBAR-CHECKBOX-ITEM")
            i.toggle();
          else if (i.tagName === "UI-MENUBAR-RADIO-ITEM")
            i.select();
          else if (i.tagName === "UI-MENUBAR-SUB-TRIGGER") {
            const o = i.closest("ui-menubar-sub");
            o && o.showImmediate();
          }
        }
        break;
      }
      case "ArrowRight": {
        if (this._highlightIndex >= 0 && this._highlightIndex < t.length) {
          const i = t[this._highlightIndex];
          if (i.tagName === "UI-MENUBAR-SUB-TRIGGER") {
            e.preventDefault();
            const o = i.closest("ui-menubar-sub");
            if (o) {
              o.showImmediate();
              const r = o.querySelector("ui-menubar-sub-content");
              if (r) {
                const a = Array.from(r.querySelectorAll(
                  "ui-menubar-item:not([disabled]),ui-menubar-checkbox-item:not([disabled]),ui-menubar-radio-item:not([disabled]),ui-menubar-sub-trigger:not([disabled])"
                ));
                a.length > 0 && (a[0].highlighted = !0);
              }
            }
            return;
          }
        }
        break;
      }
      case "ArrowLeft": {
        const i = Array.from(this.querySelectorAll("ui-menubar-sub")).find((o) => o.open);
        if (i) {
          e.preventDefault(), i.hideImmediate();
          return;
        }
        break;
      }
      case "Escape": {
        e.preventDefault(), this._requestClose();
        break;
      }
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          if (t.length === 0) return;
          e.preventDefault();
          const i = e.key.toLowerCase(), o = this._highlightIndex >= 0 ? this._highlightIndex + 1 : 0;
          for (let r = 0; r < t.length; r++) {
            const a = (o + r) % t.length;
            if ((t[a].textContent?.trim().toLowerCase() ?? "").startsWith(i)) {
              this._highlightItem(a);
              break;
            }
          }
        }
    }
  }
  _requestClose() {
    this.dispatchEvent(new CustomEvent("_menubar-request-close", {
      bubbles: !0,
      composed: !0
    }));
  }
  resetHighlight() {
    this._clearHighlight();
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this._handleClick), this.addEventListener("mouseover", this._handleMouseOver);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this._handleClick), this.removeEventListener("mouseover", this._handleMouseOver);
  }
  render() {
    return l`<div class="panel" role="menu"><slot></slot></div>`;
  }
};
Or.styles = h(ah);
x([
  s({ reflect: !0, type: Boolean })
], Or.prototype, "open", 2);
Or = x([
  d("ui-menubar-content")
], Or);
let zi = class extends c {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this._focusable = !1;
  }
  setFocusable(e) {
    this._focusable = e;
  }
  render() {
    return l`
            <button class="trigger"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded=${this.active}
                ?disabled=${this.disabled}
                tabindex=${this._focusable ? "0" : "-1"}>
                <slot></slot>
            </button>
        `;
  }
};
zi.styles = h(nh);
x([
  s({ reflect: !0, type: Boolean })
], zi.prototype, "active", 2);
x([
  s({ reflect: !0, type: Boolean })
], zi.prototype, "disabled", 2);
x([
  b()
], zi.prototype, "_focusable", 2);
zi = x([
  d("ui-menubar-trigger")
], zi);
let Tr = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1;
  }
  get trigger() {
    return this.querySelector(":scope > ui-menubar-trigger");
  }
  get content() {
    return this.querySelector(":scope > ui-menubar-content");
  }
  updated(e) {
    if (e.has("disabled")) {
      const t = this.trigger;
      t && (t.disabled = this.disabled);
    }
  }
  open() {
    if (this.disabled) return;
    const e = this.trigger, t = this.content;
    e && (e.active = !0), t && (t.open = !0, t.resetHighlight());
  }
  close() {
    const e = this.trigger, t = this.content;
    e && (e.active = !1), t && (t.open = !1, t.resetHighlight(), this.querySelectorAll("ui-menubar-sub").forEach((i) => i.hideImmediate()));
  }
  get isOpen() {
    return this.content?.open ?? !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
Tr.styles = h(lh);
x([
  s({ reflect: !0, type: Boolean })
], Tr.prototype, "disabled", 2);
Tr = x([
  d("ui-menubar-menu")
], Tr);
let Ar = class extends c {
  constructor() {
    super(...arguments), this._activeIndex = -1, this.label = "", this._handleTriggerClick = (e) => {
      const t = e.target.closest?.("ui-menubar-trigger");
      if (!t) return;
      const i = t.closest("ui-menubar-menu");
      if (!i || i.disabled) return;
      const r = this._getMenus().indexOf(i);
      r !== -1 && (this._activeIndex === r ? this.closeAll() : this._openMenu(r));
    }, this._handleTriggerMouseEnter = (e) => {
      if (this._activeIndex === -1) return;
      const t = e.target.closest?.("ui-menubar-trigger");
      if (!t) return;
      const i = t.closest("ui-menubar-menu");
      if (!i || i.disabled) return;
      const r = this._getMenus().indexOf(i);
      r !== -1 && r !== this._activeIndex && this._openMenu(r);
    }, this._handleKeyDown = (e) => {
      const t = this._getMenus();
      switch (e.key) {
        case "ArrowRight": {
          if (this._activeIndex === -1) return;
          const i = t[this._activeIndex]?.content;
          if (i && Array.from(i.querySelectorAll(
            "ui-menubar-item, ui-menubar-checkbox-item, ui-menubar-radio-item, ui-menubar-sub-trigger"
          )).find((a) => a.highlighted)?.tagName === "UI-MENUBAR-SUB-TRIGGER") {
            i.handleKeyDown(e);
            return;
          }
          e.preventDefault(), this._navigate(1);
          break;
        }
        case "ArrowLeft": {
          if (this._activeIndex === -1) return;
          const i = t[this._activeIndex]?.content;
          if (i && Array.from(i.querySelectorAll("ui-menubar-sub")).find((r) => r.open)) {
            i.handleKeyDown(e);
            return;
          }
          e.preventDefault(), this._navigate(-1);
          break;
        }
        case "ArrowDown": {
          if (this._activeIndex === -1) {
            e.preventDefault();
            const i = t.findIndex((r) => !r.disabled);
            if (i === -1) return;
            this._openMenu(i);
            const o = t[i]?.content;
            o && o.handleKeyDown(e);
          } else {
            const i = t[this._activeIndex]?.content;
            i && i.handleKeyDown(e);
          }
          break;
        }
        case "ArrowUp":
        case "Home":
        case "End":
        case "Enter":
        case " ": {
          if (this._activeIndex >= 0) {
            const i = t[this._activeIndex]?.content;
            i && i.handleKeyDown(e);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const i = this.querySelector('ui-menubar-trigger[tabindex="0"]');
            if (i) {
              const o = i.closest("ui-menubar-menu");
              if (o) {
                const r = t.indexOf(o);
                r !== -1 && this._openMenu(r);
              }
            }
          }
          break;
        }
        case "Escape": {
          if (this._activeIndex >= 0) {
            e.preventDefault();
            const i = this._activeIndex;
            this.closeAll();
            const r = t[i]?.trigger?.shadowRoot?.querySelector("button");
            r && r.focus();
          }
          break;
        }
        case "Tab": {
          this._activeIndex >= 0 && this.closeAll();
          break;
        }
        default:
          if (this._activeIndex >= 0 && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const i = t[this._activeIndex]?.content;
            i && i.handleKeyDown(e);
          }
      }
    }, this._handleRequestClose = () => {
      const e = this._activeIndex;
      this.closeAll();
      const o = this._getMenus()[e]?.trigger?.shadowRoot?.querySelector("button");
      o && o.focus();
    }, this._handleOutsideClick = (e) => {
      if (this._activeIndex === -1) return;
      e.composedPath().includes(this) || this.closeAll();
    }, this._onSlotChange = () => {
      this._updateTabFocus();
    };
  }
  /** Index of the currently open menu, or -1 if all closed. */
  get activeIndex() {
    return this._activeIndex;
  }
  _getMenus() {
    return Array.from(this.querySelectorAll(":scope > ui-menubar-menu"));
  }
  /**
   * Updates the roving tabindex so exactly one trigger button is reachable via Tab.
   * The focusable trigger is the active (open) one, or the first non-disabled one when all closed.
   */
  _updateTabFocus() {
    const e = this._getMenus(), t = e.findIndex((i) => !i.disabled);
    e.forEach((i, o) => {
      const r = i.trigger;
      r && r.setFocusable(
        this._activeIndex === -1 ? o === t : o === this._activeIndex
      );
    });
  }
  /** Open a menu by index and close others. Skips disabled menus. */
  _openMenu(e) {
    const t = this._getMenus();
    t[e]?.disabled || (t.forEach((i, o) => {
      o === e ? i.open() : i.close();
    }), this._activeIndex = e, this._updateTabFocus());
  }
  /** Close all menus. */
  closeAll() {
    this._getMenus().forEach((t) => t.close()), this._activeIndex = -1, this._updateTabFocus();
  }
  /** Navigate to the next or previous menu, skipping disabled menus. */
  _navigate(e) {
    const t = this._getMenus();
    if (t.length === 0) return;
    let i = this._activeIndex;
    for (let o = 0; o < t.length && (i = ((i + e) % t.length + t.length) % t.length, !!t[i].disabled); o++)
      ;
    t[i].disabled || this._openMenu(i);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this._handleTriggerClick), this.addEventListener("mouseover", this._handleTriggerMouseEnter), this.addEventListener("keydown", this._handleKeyDown), this.addEventListener("_menubar-request-close", this._handleRequestClose), document.addEventListener("click", this._handleOutsideClick, !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this._handleTriggerClick), this.removeEventListener("mouseover", this._handleTriggerMouseEnter), this.removeEventListener("keydown", this._handleKeyDown), this.removeEventListener("_menubar-request-close", this._handleRequestClose), document.removeEventListener("click", this._handleOutsideClick, !0);
  }
  firstUpdated() {
    this._updateTabFocus();
  }
  render() {
    return l`
            <div part="bar" role="menubar" aria-label=${this.label || "Menu bar"}>
                <slot @slotchange=${this._onSlotChange}></slot>
            </div>
        `;
  }
};
Ar.styles = h(ch);
x([
  s({ reflect: !0 })
], Ar.prototype, "label", 2);
Ar = x([
  d("ui-menubar")
], Ar);
const ph = ':host{display:block;position:relative;overflow:hidden}.root{position:relative;width:100%;height:100%}.viewport{overflow:scroll;scrollbar-width:none;-ms-overflow-style:none;width:100%;height:100%}.viewport::-webkit-scrollbar{display:none}.scrollbar{position:absolute;z-index:10;opacity:0;transition:opacity .15s ease;background:var(--ui-scrollbar-track-color, transparent);touch-action:none;-webkit-user-select:none;user-select:none;border-radius:var(--ui-scrollbar-thumb-radius, 9999px)}.scrollbar--y{top:0;right:0;bottom:0;width:var(--ui-scrollbar-size, 8px)}.scrollbar--x{bottom:0;left:0;right:var(--ui-scrollbar-size, 8px);height:var(--ui-scrollbar-size, 8px)}:host([dir="rtl"]) .scrollbar--y{right:auto;left:0}:host([dir="rtl"]) .scrollbar--x{left:var(--ui-scrollbar-size, 8px);right:0}:host([type="always"]) .scrollbar{opacity:1}:host([type="auto"]) .scrollbar--visible{opacity:1}:host([type="hover"]) .root:hover .scrollbar--visible{opacity:1}:host([type="scroll"]) .scrollbar--visible.scrollbar--active{opacity:1}.thumb{position:absolute;border-radius:var(--ui-scrollbar-thumb-radius, 9999px);background:var(--ui-scrollbar-thumb-color, rgba(0, 0, 0, .35));transition:background .15s ease;cursor:grab}.thumb:active,.thumb--dragging{cursor:grabbing;background:var(--ui-scrollbar-thumb-hover-color, rgba(0, 0, 0, .5))}.scrollbar:hover .thumb{background:var(--ui-scrollbar-thumb-hover-color, rgba(0, 0, 0, .5))}.thumb--y{left:2px;right:2px;min-height:20px}.thumb--x{top:2px;bottom:2px;min-width:20px}', uh = ':host{display:block;position:absolute;z-index:10;touch-action:none;-webkit-user-select:none;user-select:none;background:var(--ui-scrollbar-track-color, transparent);border-radius:var(--ui-scrollbar-thumb-radius, 9999px);opacity:0;transition:opacity .15s ease}:host([data-visible]){opacity:1}:host([orientation="vertical"]){top:0;right:0;bottom:0;width:var(--ui-scrollbar-size, 8px)}:host([orientation="horizontal"]){bottom:0;left:0;right:var(--ui-scrollbar-size, 8px);height:var(--ui-scrollbar-size, 8px)}.track{position:relative;width:100%;height:100%;cursor:pointer}.thumb{position:absolute;border-radius:var(--ui-scrollbar-thumb-radius, 9999px);background:var(--ui-scrollbar-thumb-color, rgba(0, 0, 0, .35));transition:background .15s ease;cursor:grab}.thumb:active,.thumb--dragging{cursor:grabbing;background:var(--ui-scrollbar-thumb-hover-color, rgba(0, 0, 0, .5))}:host(:hover) .thumb{background:var(--ui-scrollbar-thumb-hover-color, rgba(0, 0, 0, .5))}:host([orientation="vertical"]) .thumb{left:2px;right:2px;min-height:20px}:host([orientation="horizontal"]) .thumb{top:2px;bottom:2px;min-width:20px}';
var fh = Object.defineProperty, vh = Object.getOwnPropertyDescriptor, V = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? vh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && fh(t, i, r), r;
};
let Wt = class extends c {
  constructor() {
    super(...arguments), this.orientation = "vertical", this._thumbPos = 0, this._thumbSize = 100, this._dragging = !1, this._dragStart = 0, this._scrollStart = 0;
  }
  /** Push updated thumb geometry from the parent scroll area. */
  setThumb(e, t) {
    this._thumbPos = e, this._thumbSize = t;
  }
  /** Show or hide the scrollbar (parent controls visibility). */
  setVisible(e) {
    this.toggleAttribute("data-visible", e);
  }
  get _area() {
    return this.closest("ui-scroll-area");
  }
  _onPointerDown(e) {
    e.preventDefault(), this._dragging = !0, this._dragStart = this.orientation === "vertical" ? e.clientY : e.clientX, this._scrollStart = this._area?._getScrollPos(this.orientation) ?? 0, e.currentTarget.setPointerCapture(e.pointerId);
  }
  _onPointerMove(e) {
    if (!this._dragging) return;
    const t = this._area;
    if (!t) return;
    const i = this.orientation === "vertical" ? e.clientY - this._dragStart : e.clientX - this._dragStart, o = this.orientation === "vertical" ? this.offsetHeight : this.offsetWidth;
    if (o === 0) return;
    const r = t._getScrollRange(this.orientation);
    t._setScrollPos(
      this.orientation,
      this._scrollStart + i / o * r
    );
  }
  _onPointerUp(e) {
    this._dragging && (this._dragging = !1, e.currentTarget.releasePointerCapture(e.pointerId));
  }
  render() {
    const t = this.orientation === "vertical" ? `height: ${this._thumbSize}%; top: ${this._thumbPos}%;` : `width: ${this._thumbSize}%; left: ${this._thumbPos}%;`;
    return l`
            <div
                class="track"
                role="scrollbar"
                aria-orientation=${this.orientation}
                aria-valuenow=${Math.round(this._thumbPos)}
                aria-valuemin="0"
                aria-valuemax="100"
                @pointerdown=${this._onPointerDown}
                @pointermove=${this._onPointerMove}
                @pointerup=${this._onPointerUp}
                @pointercancel=${this._onPointerUp}
            >
                <div
                    class="thumb ${this._dragging ? "thumb--dragging" : ""}"
                    style=${t}
                ></div>
            </div>
        `;
  }
};
Wt.styles = h(uh);
V([
  s({ reflect: !0 })
], Wt.prototype, "orientation", 2);
V([
  b()
], Wt.prototype, "_thumbPos", 2);
V([
  b()
], Wt.prototype, "_thumbSize", 2);
V([
  b()
], Wt.prototype, "_dragging", 2);
Wt = V([
  d("ui-scroll-bar")
], Wt);
let se = class extends c {
  constructor() {
    super(...arguments), this.type = "hover", this.dir = "ltr", this._thumbYPos = 0, this._thumbYSize = 100, this._thumbXPos = 0, this._thumbXSize = 100, this._hasOverflowY = !1, this._hasOverflowX = !1, this._isScrolling = !1, this._hideTimer = null, this._draggingY = !1, this._dragYStart = 0, this._scrollYStart = 0, this._draggingX = !1, this._dragXStart = 0, this._scrollXStart = 0;
  }
  firstUpdated() {
    typeof ResizeObserver < "u" && (this._resizeObserver = new ResizeObserver(() => {
      this._updateOverflow(), this._syncScrollBars();
    }), this._resizeObserver.observe(this._viewport)), this._updateOverflow(), this._syncScrollBars();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver?.disconnect(), this._hideTimer && clearTimeout(this._hideTimer);
  }
  scrollTo(e, t) {
    typeof this._viewport?.scrollTo == "function" && (typeof e == "number" ? this._viewport.scrollTo(e, t ?? 0) : this._viewport.scrollTo(e));
  }
  scrollBy(e, t) {
    typeof this._viewport?.scrollBy == "function" && (typeof e == "number" ? this._viewport.scrollBy(e, t ?? 0) : this._viewport.scrollBy(e));
  }
  // ── Scroll pos / range helpers (called by UiScrollBar drag) ────────
  _getScrollPos(e) {
    return this._viewport ? e === "vertical" ? this._viewport.scrollTop : this._viewport.scrollLeft : 0;
  }
  _getScrollRange(e) {
    return this._viewport ? e === "vertical" ? this._viewport.scrollHeight - this._viewport.clientHeight : this._viewport.scrollWidth - this._viewport.clientWidth : 0;
  }
  _setScrollPos(e, t) {
    if (!this._viewport) return;
    const i = this._getScrollRange(e), o = Math.max(0, Math.min(t, i));
    e === "vertical" ? this._viewport.scrollTop = o : this._viewport.scrollLeft = o;
  }
  // ── Internal helpers ───────────────────────────────────────────────
  _onScroll() {
    this._updateOverflow(), this._syncScrollBars(), this.type === "scroll" && (this._isScrolling = !0, this._hideTimer && clearTimeout(this._hideTimer), this._hideTimer = setTimeout(() => {
      this._isScrolling = !1;
    }, 600));
  }
  _updateOverflow() {
    const e = this._viewport;
    e && (this._hasOverflowY = e.scrollHeight > e.clientHeight + 1, this._hasOverflowX = e.scrollWidth > e.clientWidth + 1);
  }
  _computeThumb(e) {
    const t = this._viewport;
    if (!t) return { pos: 0, size: 100 };
    const i = e === "vertical" ? t.scrollHeight : t.scrollWidth, o = e === "vertical" ? t.clientHeight : t.clientWidth, r = this._getScrollPos(e), a = this._getScrollRange(e);
    if (i <= o || a <= 0)
      return { pos: 0, size: 100 };
    const n = Math.max(10, o / i * 100);
    return { pos: r / a * (100 - n), size: n };
  }
  _syncScrollBars() {
    const { pos: e, size: t } = this._computeThumb("vertical"), { pos: i, size: o } = this._computeThumb("horizontal");
    this._thumbYPos = e, this._thumbYSize = t, this._thumbXPos = i, this._thumbXSize = o, this.querySelectorAll("ui-scroll-bar").forEach((r) => {
      if (r.closest("ui-scroll-area") !== this) return;
      const a = r;
      a.orientation === "vertical" ? (a.setThumb(e, t), a.setVisible(this._shouldShowBar("vertical"))) : (a.setThumb(i, o), a.setVisible(this._shouldShowBar("horizontal")));
    });
  }
  _shouldShowBar(e) {
    const t = e === "vertical" ? this._hasOverflowY : this._hasOverflowX;
    switch (this.type) {
      case "always":
        return !0;
      case "auto":
        return t;
      case "scroll":
        return this._isScrolling && t;
      case "hover":
        return t;
      // CSS :hover triggers show
      default:
        return t;
    }
  }
  _scrollbarClasses(e) {
    const t = e === "vertical" ? "y" : "x", i = this._shouldShowBar(e) ? "scrollbar--visible" : "", o = this._isScrolling ? "scrollbar--active" : "";
    return `scrollbar scrollbar--${t} ${i} ${o}`.trim();
  }
  // ── Internal Y-thumb drag ──────────────────────────────────────────
  _onThumbYDown(e) {
    e.preventDefault(), this._draggingY = !0, this._dragYStart = e.clientY, this._scrollYStart = this._getScrollPos("vertical"), e.currentTarget.setPointerCapture(e.pointerId), this.requestUpdate();
  }
  _onThumbYMove(e) {
    if (!this._draggingY) return;
    const t = this._scrollbarY?.offsetHeight ?? 0;
    if (t === 0) return;
    const i = e.clientY - this._dragYStart;
    this._setScrollPos(
      "vertical",
      this._scrollYStart + i / t * this._getScrollRange("vertical")
    );
  }
  _onThumbYUp(e) {
    this._draggingY && (this._draggingY = !1, e.currentTarget.releasePointerCapture(e.pointerId), this.requestUpdate());
  }
  // ── Internal X-thumb drag ──────────────────────────────────────────
  _onThumbXDown(e) {
    e.preventDefault(), this._draggingX = !0, this._dragXStart = e.clientX, this._scrollXStart = this._getScrollPos("horizontal"), e.currentTarget.setPointerCapture(e.pointerId), this.requestUpdate();
  }
  _onThumbXMove(e) {
    if (!this._draggingX) return;
    const t = this._scrollbarX?.offsetWidth ?? 0;
    if (t === 0) return;
    const i = e.clientX - this._dragXStart;
    this._setScrollPos(
      "horizontal",
      this._scrollXStart + i / t * this._getScrollRange("horizontal")
    );
  }
  _onThumbXUp(e) {
    this._draggingX && (this._draggingX = !1, e.currentTarget.releasePointerCapture(e.pointerId), this.requestUpdate());
  }
  // ── Slot change ────────────────────────────────────────────────────
  _onSlotChange() {
    this._resizeObserver && this.shadowRoot.querySelector(
      "slot:not([name])"
    )?.assignedElements({ flatten: !0 }).forEach((t) => {
      this._resizeObserver.observe(t);
    }), this._updateOverflow(), this._syncScrollBars();
  }
  render() {
    const e = `height: ${this._thumbYSize}%; top: ${this._thumbYPos}%;`, t = `width: ${this._thumbXSize}%; left: ${this._thumbXPos}%;`;
    return l`
            <div class="root">
                <div class="viewport" dir=${this.dir} @scroll=${this._onScroll}>
                    <slot @slotchange=${this._onSlotChange}></slot>
                </div>

                <!-- built-in vertical scrollbar -->
                <div
                    class=${this._scrollbarClasses("vertical")}
                    role="scrollbar"
                    aria-orientation="vertical"
                    aria-valuenow=${Math.round(this._thumbYPos)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        class="thumb thumb--y ${this._draggingY ? "thumb--dragging" : ""}"
                        style=${e}
                        @pointerdown=${this._onThumbYDown}
                        @pointermove=${this._onThumbYMove}
                        @pointerup=${this._onThumbYUp}
                        @pointercancel=${this._onThumbYUp}
                    ></div>
                </div>

                <!-- built-in horizontal scrollbar -->
                <div
                    class=${this._scrollbarClasses("horizontal")}
                    role="scrollbar"
                    aria-orientation="horizontal"
                    aria-valuenow=${Math.round(this._thumbXPos)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        class="thumb thumb--x ${this._draggingX ? "thumb--dragging" : ""}"
                        style=${t}
                        @pointerdown=${this._onThumbXDown}
                        @pointermove=${this._onThumbXMove}
                        @pointerup=${this._onThumbXUp}
                        @pointercancel=${this._onThumbXUp}
                    ></div>
                </div>

                <!-- slot for user-provided ui-scroll-bar elements -->
                <slot
                    name="scrollbar"
                    @slotchange=${() => this._syncScrollBars()}
                ></slot>
            </div>
        `;
  }
};
se.styles = h(ph);
V([
  s({ reflect: !0 })
], se.prototype, "type", 2);
V([
  s({ reflect: !0 })
], se.prototype, "dir", 2);
V([
  zt(".viewport")
], se.prototype, "_viewport", 2);
V([
  zt(".scrollbar--y")
], se.prototype, "_scrollbarY", 2);
V([
  zt(".scrollbar--x")
], se.prototype, "_scrollbarX", 2);
V([
  b()
], se.prototype, "_thumbYPos", 2);
V([
  b()
], se.prototype, "_thumbYSize", 2);
V([
  b()
], se.prototype, "_thumbXPos", 2);
V([
  b()
], se.prototype, "_thumbXSize", 2);
V([
  b()
], se.prototype, "_hasOverflowY", 2);
V([
  b()
], se.prototype, "_hasOverflowX", 2);
V([
  b()
], se.prototype, "_isScrolling", 2);
se = V([
  d("ui-scroll-area")
], se);
var bh = Object.defineProperty, gh = Object.getOwnPropertyDescriptor, Ho = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? gh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && bh(t, i, r), r;
};
let rr = class extends c {
  constructor() {
    super(...arguments), this.dir = "ltr", this._openContentId = null, this._handleContentToggle = (e) => {
      const t = e.detail;
      t.open ? (this._closeAllContent(), this._openContentId = t.contentId) : this._openContentId === t.contentId && (this._openContentId = null);
    }, this._closeAllContent = () => {
      this.querySelectorAll("ui-navigation-menu-content").forEach((e) => {
        e.open = !1;
      });
    }, this._handleDocumentClick = (e) => {
      const t = e.target;
      this.contains(t) || (this._closeAllContent(), this._openContentId = null);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("ui-navigation-menu-trigger-click", this._handleContentToggle), this.addEventListener("ui-navigation-menu-content-toggle", this._handleContentToggle), document.addEventListener("pointerdown", this._handleDocumentClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("ui-navigation-menu-trigger-click", this._handleContentToggle), this.removeEventListener("ui-navigation-menu-content-toggle", this._handleContentToggle), document.removeEventListener("pointerdown", this._handleDocumentClick);
  }
  /** Get the currently open content item ID */
  get openContentId() {
    return this._openContentId;
  }
  /** Manually open a content item by ID */
  openContent(e) {
    this._closeAllContent(), this._openContentId = e;
    const t = this.querySelector(
      `ui-navigation-menu-content[id="${e}"]`
    );
    t && (t.open = !0);
  }
  /** Close all open content */
  closeAll() {
    this._closeAllContent(), this._openContentId = null;
  }
  render() {
    return l`
            <div class="menu" part="root">
                <slot></slot>
            </div>
        `;
  }
};
rr.styles = Ie`
        :host {
            display: block;
            position: relative;
            --ui-navigation-menu-padding: 0;
            --ui-navigation-menu-gap: 8px;
            --ui-navigation-menu-bg: transparent;
            --ui-navigation-menu-border: none;
            --ui-navigation-menu-border-radius: 0;
        }

        .menu {
            padding: var(--ui-navigation-menu-padding);
            background: var(--ui-navigation-menu-bg);
            border: var(--ui-navigation-menu-border);
            border-radius: var(--ui-navigation-menu-border-radius);
        }
    `;
Ho([
  s({ type: String, reflect: !0 })
], rr.prototype, "dir", 2);
Ho([
  b()
], rr.prototype, "_openContentId", 2);
rr = Ho([
  d("ui-navigation-menu")
], rr);
var mh = Object.defineProperty, yh = Object.getOwnPropertyDescriptor, Hr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && mh(t, i, r), r;
};
let Di = class extends c {
  constructor() {
    super(...arguments), this.gap = 4, this.direction = "row", this.ariaLabel = "Main navigation";
  }
  connectedCallback() {
    super.connectedCallback(), this._updateStyles();
  }
  willUpdate(e) {
    (e.has("gap") || e.has("direction")) && this._updateStyles();
  }
  _updateStyles() {
    this.style.setProperty("--ui-navigation-menu-list-gap", `${this.gap}px`), this.style.setProperty("--ui-navigation-menu-list-direction", this.direction), this.style.setProperty("--ui-navigation-menu-list-align", this.direction === "column" ? "stretch" : "center");
  }
  render() {
    return l`
            <nav class="list" part="root" role="menubar" aria-label=${this.ariaLabel}>
                <slot></slot>
            </nav>
        `;
  }
};
Di.styles = Ie`
        :host {
            display: flex;
            --ui-navigation-menu-list-gap: 4px;
            --ui-navigation-menu-list-direction: row;
            --ui-navigation-menu-list-align: center;
        }

        .list {
            display: flex;
            align-items: var(--ui-navigation-menu-list-align);
            flex-direction: var(--ui-navigation-menu-list-direction);
            gap: var(--ui-navigation-menu-list-gap);
            list-style: none;
            margin: 0;
            padding: 0;
            width: 100%;
        }
    `;
Hr([
  s({ type: Number })
], Di.prototype, "gap", 2);
Hr([
  s({ type: String })
], Di.prototype, "direction", 2);
Hr([
  s({ type: String, attribute: "aria-label" })
], Di.prototype, "ariaLabel", 2);
Di = Hr([
  d("ui-navigation-menu-list")
], Di);
var xh = Object.defineProperty, _h = Object.getOwnPropertyDescriptor, hr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? _h(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && xh(t, i, r), r;
};
let Gt = class extends c {
  constructor() {
    super(...arguments), this.itemId = "", this.disabled = !1, this.openDelay = 100, this.closeDelay = 150, this._openTimer = null, this._closeTimer = null, this._handleMouseEnter = () => {
      this.disabled || (this._cancelClose(), this._openTimer = setTimeout(() => {
        this._openTimer = null, this._openContent();
      }, this.openDelay));
    }, this._handleMouseLeave = () => {
      this._cancelOpen(), this._closeTimer = setTimeout(() => {
        this._closeTimer = null, this._closeContent();
      }, this.closeDelay);
    }, this._syncChildren = () => {
      const e = this.querySelectorAll("ui-navigation-menu-trigger"), t = this.querySelectorAll("ui-navigation-menu-link");
      e.forEach((i) => {
        i.closest("ui-navigation-menu-item") === this && (i.disabled = this.disabled);
      }), t.forEach((i) => {
        i.closest("ui-navigation-menu-item") === this && (i.disabled = this.disabled);
      });
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("mouseenter", this._handleMouseEnter), this.addEventListener("mouseleave", this._handleMouseLeave), this.shadowRoot.addEventListener("slotchange", this._syncChildren);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mouseenter", this._handleMouseEnter), this.removeEventListener("mouseleave", this._handleMouseLeave), this.shadowRoot.removeEventListener("slotchange", this._syncChildren), this._clearTimers();
  }
  updated(e) {
    e.has("disabled") && this._syncChildren();
  }
  _cancelOpen() {
    this._openTimer !== null && (clearTimeout(this._openTimer), this._openTimer = null);
  }
  _cancelClose() {
    this._closeTimer !== null && (clearTimeout(this._closeTimer), this._closeTimer = null);
  }
  _clearTimers() {
    this._cancelOpen(), this._cancelClose();
  }
  _openContent() {
    const e = this.querySelector("ui-navigation-menu-trigger");
    if (!e || e.disabled) return;
    const t = e.contentId;
    if (!t) return;
    const i = this.querySelector(`[id="${t}"]`);
    i && (e.dispatchEvent(
      new CustomEvent("ui-navigation-menu-trigger-click", {
        detail: { contentId: t, open: !0 },
        bubbles: !0,
        composed: !0
      })
    ), i.open = !0);
  }
  _closeContent() {
    const e = this.querySelector("ui-navigation-menu-trigger");
    if (!e) return;
    const t = e.contentId;
    if (!t) return;
    const i = this.querySelector(`[id="${t}"]`);
    !i || !i.open || (i.open = !1, i.dispatchEvent(
      new CustomEvent("ui-navigation-menu-content-toggle", {
        detail: { contentId: t, open: !1 },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return l`
            <div class="item" part="root" role="none">
                <slot></slot>
            </div>
        `;
  }
};
Gt.styles = Ie`
        :host {
            display: flex;
            position: relative;
            --ui-navigation-menu-item-padding: 0;
        }

        .item {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: var(--ui-navigation-menu-item-padding);
            position: relative;
            width: 100%;
        }
    `;
hr([
  s({ type: String })
], Gt.prototype, "itemId", 2);
hr([
  s({ type: Boolean, reflect: !0 })
], Gt.prototype, "disabled", 2);
hr([
  s({ type: Number, attribute: "open-delay" })
], Gt.prototype, "openDelay", 2);
hr([
  s({ type: Number, attribute: "close-delay" })
], Gt.prototype, "closeDelay", 2);
Gt = hr([
  d("ui-navigation-menu-item")
], Gt);
var wh = Object.defineProperty, kh = Object.getOwnPropertyDescriptor, Yr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? kh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && wh(t, i, r), r;
};
let Ei = class extends c {
  constructor() {
    super(...arguments), this.contentId = "", this.disabled = !1, this._isOpen = !1, this._contentObserver = null, this._handleClick = () => {
      this.disabled || this._toggle();
    }, this._handleKeydown = (e) => {
      if (!this.disabled)
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault(), this._toggle();
            break;
          case "ArrowDown":
            e.preventDefault(), this._focusFirstContentItem();
            break;
        }
    }, this._toggle = () => {
      this._isOpen = !this._isOpen, this._emitEvents(), this._syncContent();
    }, this._emitEvents = () => {
      const e = { contentId: this.contentId, open: this._isOpen };
      this.dispatchEvent(
        new CustomEvent("ui-navigation-menu-trigger-click", {
          detail: e,
          bubbles: !0,
          composed: !0
        })
      );
    }, this._syncContent = () => {
      const e = this._getContent();
      e && (e.open = this._isOpen);
    }, this._getContent = () => {
      if (!this.contentId) return null;
      const e = this.closest("ui-navigation-menu-item");
      if (e) {
        const o = e.querySelector(`[id="${this.contentId}"]`);
        if (o) return o;
      }
      const t = this.closest("ui-navigation-menu");
      if (t) {
        const o = t.querySelector(`[id="${this.contentId}"]`);
        if (o) return o;
      }
      const i = this.parentElement;
      if (i) {
        const o = i.querySelector(`[id="${this.contentId}"]`);
        if (o) return o;
      }
      return document.getElementById(this.contentId);
    }, this._focusFirstContentItem = () => {
      const e = this._getContent();
      if (e) {
        const t = e.querySelector('[role="menuitem"]');
        t && t.focus();
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this._handleClick), this.addEventListener("keydown", this._handleKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this._handleClick), this.removeEventListener("keydown", this._handleKeydown), this._contentObserver?.disconnect(), this._contentObserver = null;
  }
  firstUpdated() {
    this._observeContent();
  }
  updated(e) {
    e.has("contentId") && this._observeContent();
  }
  /** Watch content's open attribute so _isOpen stays in sync when closed externally */
  _observeContent() {
    this._contentObserver?.disconnect();
    const e = this._getContent();
    e && (this._contentObserver = new MutationObserver(() => {
      const t = e.hasAttribute("open");
      this._isOpen !== t && (this._isOpen = t);
    }), this._contentObserver.observe(e, { attributes: !0, attributeFilter: ["open"] }));
  }
  render() {
    return l`
            <button
                class="trigger"
                part="button"
                ?disabled=${this.disabled}
                aria-expanded=${this._isOpen}
                aria-haspopup="true"
                aria-controls=${this.contentId}
            >
                <slot></slot>
                <span class="icon" part="icon">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="1 4 6 9 11 4"></polyline>
                    </svg>
                </span>
            </button>
        `;
  }
};
Ei.styles = Ie`
        :host {
            display: flex;
            --ui-navigation-menu-trigger-padding: 8px 14px;
            --ui-navigation-menu-trigger-font-size: 14px;
            --ui-navigation-menu-trigger-color: var(--ui-text-color, #111827);
            --ui-navigation-menu-trigger-bg: transparent;
            --ui-navigation-menu-trigger-hover-bg: #f3f4f6;
            --ui-navigation-menu-trigger-active-bg: #f3f4f6;
            --ui-navigation-menu-trigger-border-radius: 6px;
        }

        .trigger {
            display: flex;
            align-items: center;
            gap: 4px;
            height: 36px;
            flex: 1;
            padding: var(--ui-navigation-menu-trigger-padding);
            font-size: var(--ui-navigation-menu-trigger-font-size);
            font-weight: 500;
            font-family: inherit;
            color: var(--ui-navigation-menu-trigger-color);
            background: var(--ui-navigation-menu-trigger-bg);
            border: none;
            border-radius: var(--ui-navigation-menu-trigger-border-radius);
            cursor: pointer;
            transition: background 0.15s ease, color 0.15s ease;
            outline: none;
            white-space: nowrap;
            user-select: none;
        }

        .trigger:hover:not(:disabled) {
            background: var(--ui-navigation-menu-trigger-hover-bg);
        }

        .trigger:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 2px;
        }

        .trigger:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .trigger[aria-expanded="true"] {
            background: var(--ui-navigation-menu-trigger-active-bg);
        }

        .icon {
            width: 14px;
            height: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.7;
            transition: transform 0.2s ease;
            flex-shrink: 0;
        }

        .trigger[aria-expanded="true"] .icon {
            transform: rotate(180deg);
        }
    `;
Yr([
  s({ type: String, reflect: !0, attribute: "content-id" })
], Ei.prototype, "contentId", 2);
Yr([
  s({ type: Boolean, reflect: !0 })
], Ei.prototype, "disabled", 2);
Yr([
  b()
], Ei.prototype, "_isOpen", 2);
Ei = Yr([
  d("ui-navigation-menu-trigger")
], Ei);
var $h = Object.defineProperty, Sh = Object.getOwnPropertyDescriptor, pr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Sh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && $h(t, i, r), r;
};
let Xt = class extends c {
  constructor() {
    super(...arguments), this.id = "", this.open = !1, this.dir = "ltr", this.gap = 12, this._handleKeydown = (e) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault(), this._close(), this._focusTrigger();
          break;
        case "Tab":
          this._close();
          break;
        case "ArrowUp":
          e.preventDefault(), this._focusPreviousItem();
          break;
        case "ArrowDown":
          e.preventDefault(), this._focusNextItem();
          break;
        case "Home":
          e.preventDefault(), this._focusFirstItem();
          break;
        case "End":
          e.preventDefault(), this._focusLastItem();
          break;
      }
    }, this._close = () => {
      this.open = !1, this.dispatchEvent(
        new CustomEvent("ui-navigation-menu-content-toggle", {
          detail: { contentId: this.id, open: !1 },
          bubbles: !0,
          composed: !0
        })
      );
    }, this._focusTrigger = () => {
      const e = this.closest("ui-navigation-menu");
      if (e) {
        const i = e.querySelector(
          `ui-navigation-menu-trigger[content-id="${this.id}"]`
        );
        if (i) {
          i.focus();
          return;
        }
      }
      const t = document.querySelector(
        `ui-navigation-menu-trigger[content-id="${this.id}"]`
      );
      t && t.focus();
    }, this._getAllItems = () => Array.from(
      this.querySelectorAll('ui-navigation-menu-link, [role="menuitem"]')
    ), this._focusFirstItem = () => {
      const e = this._getAllItems();
      e.length > 0 && e[0].focus();
    }, this._focusLastItem = () => {
      const e = this._getAllItems();
      e.length > 0 && e[e.length - 1].focus();
    }, this._findFocusedIndex = (e) => {
      const t = this.ownerDocument.activeElement;
      return e.findIndex(
        (i) => i === t || i.shadowRoot?.contains(t)
      );
    }, this._focusNextItem = () => {
      const e = this._getAllItems();
      if (e.length === 0) return;
      const t = this._findFocusedIndex(e), i = t >= e.length - 1 ? 0 : t + 1;
      e[i].focus();
    }, this._focusPreviousItem = () => {
      const e = this._getAllItems();
      if (e.length === 0) return;
      const t = this._findFocusedIndex(e), i = t <= 0 ? e.length - 1 : t - 1;
      e[i].focus();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this._handleKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this._handleKeydown);
  }
  willUpdate(e) {
    e.has("gap") && this.style.setProperty("--ui-navigation-menu-content-gap", `${this.gap}px`), e.has("dir") && this.setAttribute("dir", this.dir);
  }
  render() {
    return l`
            <div class="panel" part="panel" role="menu">
                <slot></slot>
            </div>
        `;
  }
};
Xt.styles = Ie`
        :host {
            display: none;
            position: absolute;
            top: calc(100% + 6px);
            inset-inline-start: 0;
            z-index: var(--ui-navigation-menu-content-z-index, 1000);
        }

        :host([open]) {
            display: block;
            animation: slideDown 0.15s ease-out;
        }

        .panel {
            background: var(--ui-navigation-menu-content-bg, #ffffff);
            border: var(--ui-navigation-menu-content-border, 1px solid #e5e7eb);
            border-radius: var(--ui-navigation-menu-content-border-radius, 8px);
            padding: var(--ui-navigation-menu-content-padding, 12px);
            box-shadow: var(
                --ui-navigation-menu-content-shadow,
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -2px rgba(0, 0, 0, 0.06)
            );
            min-width: var(--ui-navigation-menu-content-min-width, 200px);
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-6px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            :host([open]) {
                animation: none;
            }
        }

        ::slotted(*) {
            display: block;
        }

        ::slotted(ui-navigation-menu-link) {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }
    `;
pr([
  s({ type: String })
], Xt.prototype, "id", 2);
pr([
  s({ type: Boolean, reflect: !0 })
], Xt.prototype, "open", 2);
pr([
  s({ type: String })
], Xt.prototype, "dir", 2);
pr([
  s({ type: Number })
], Xt.prototype, "gap", 2);
Xt = pr([
  d("ui-navigation-menu-content")
], Xt);
var Ch = Object.defineProperty, Ih = Object.getOwnPropertyDescriptor, Ui = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ih(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ch(t, i, r), r;
};
let It = class extends c {
  constructor() {
    super(...arguments), this.href = "", this.target = "", this.title = "", this.disabled = !1, this.active = !1, this._handleClick = (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      this.closest("ui-navigation-menu")?.closeAll?.();
    }, this._handleKeydown = (e) => {
      this.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.shadowRoot?.querySelector("a")?.click());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this._handleClick), this.addEventListener("keydown", this._handleKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this._handleClick), this.removeEventListener("keydown", this._handleKeydown);
  }
  /** Delegate focus to the inner anchor element */
  focus(e) {
    const t = this.shadowRoot?.querySelector("a");
    t ? t.focus(e) : super.focus(e);
  }
  render() {
    return l`
            <a
                class="link ${this.active ? "link--active" : ""}"
                part="link"
                href=${this.href}
                target=${this.target}
                title=${this.title}
                role="menuitem"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-current=${this.active ? "page" : v}
            >
                <slot></slot>
            </a>
        `;
  }
};
It.styles = Ie`
        :host {
            display: flex;
            --ui-navigation-menu-link-padding: 8px 14px;
            --ui-navigation-menu-link-font-size: 14px;
            --ui-navigation-menu-link-color: var(--ui-text-color, #111827);
            --ui-navigation-menu-link-text-decoration: none;
            --ui-navigation-menu-link-bg: transparent;
            --ui-navigation-menu-link-hover-bg: #f3f4f6;
            --ui-navigation-menu-link-border-radius: 6px;
            --ui-navigation-menu-link-active-bg: #eff6ff;
            --ui-navigation-menu-link-active-color: var(--ui-primary-color, #3b82f6);
        }

        .link {
            display: flex;
            align-items: center;
            height: 36px;
            flex: 1;
            padding: var(--ui-navigation-menu-link-padding);
            font-size: var(--ui-navigation-menu-link-font-size);
            font-weight: 500;
            font-family: inherit;
            color: var(--ui-navigation-menu-link-color);
            text-decoration: var(--ui-navigation-menu-link-text-decoration);
            background: var(--ui-navigation-menu-link-bg);
            border-radius: var(--ui-navigation-menu-link-border-radius);
            cursor: pointer;
            transition: background 0.15s ease, color 0.15s ease;
            border: none;
            white-space: nowrap;
            user-select: none;
            outline: none;
        }

        .link:hover {
            background: var(--ui-navigation-menu-link-hover-bg);
        }

        .link:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 2px;
        }

        .link[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .link--active {
            background: var(--ui-navigation-menu-link-active-bg);
            color: var(--ui-navigation-menu-link-active-color);
        }
    `;
Ui([
  s({ type: String })
], It.prototype, "href", 2);
Ui([
  s({ type: String })
], It.prototype, "target", 2);
Ui([
  s({ type: String })
], It.prototype, "title", 2);
Ui([
  s({ type: Boolean, reflect: !0 })
], It.prototype, "disabled", 2);
Ui([
  s({ type: Boolean, reflect: !0 })
], It.prototype, "active", 2);
It = Ui([
  d("ui-navigation-menu-link")
], It);
const Ph = ":host{display:inline-block;--ui-copy-button-size: 32px;--ui-copy-button-icon-size: 16px;font-family:var(--ui-font-family)}:host([disabled]){cursor:not-allowed}.copy-button{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--ui-copy-button-size);height:var(--ui-copy-button-size);padding:0;border:1px solid var(--ui-border-color);border-radius:var(--ui-border-radius-md);background:var(--ui-surface-1);color:var(--ui-text-color-muted);cursor:pointer;transition:color .15s ease,background-color .15s ease,border-color .15s ease}.copy-button:hover:not(:disabled){background:var(--ui-hover-color);color:var(--ui-text-color)}.copy-button:active:not(:disabled){background:var(--ui-active-color)}.copy-button:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}.copy-button:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.icon{display:flex;align-items:center;justify-content:center;width:var(--ui-copy-button-icon-size);height:var(--ui-copy-button-icon-size)}.icon svg{width:100%;height:100%}.icon--success{color:var(--ui-copy-button-success-color, var(--ui-success-color))}.icon--error{color:var(--ui-copy-button-error-color, var(--ui-error-color))}.tooltip{position:absolute;z-index:10;padding:4px 8px;border-radius:var(--ui-border-radius-sm);background:var(--ui-tooltip-bg);color:var(--ui-tooltip-text-color);font-size:.75rem;line-height:1;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s ease}.tooltip--visible{opacity:1}.tooltip--top{bottom:calc(100% + 6px);left:50%;transform:translate(-50%)}.tooltip--bottom{top:calc(100% + 6px);left:50%;transform:translate(-50%)}.tooltip--left{right:calc(100% + 6px);top:50%;transform:translateY(-50%)}.tooltip--right{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}";
var zh = Object.defineProperty, Dh = Object.getOwnPropertyDescriptor, gt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Dh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && zh(t, i, r), r;
};
let Eh = 0;
const Oh = _t`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"></rect><path d="M10.5 5.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h2.5"></path></svg>`, Th = _t`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5 8.5 6.5 11.5 12.5 4.5"></polyline></svg>`, Ah = _t`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4" x2="12" y2="12"></line><line x1="12" y1="4" x2="4" y2="12"></line></svg>`;
let Le = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.from = "", this.disabled = !1, this.copyLabel = "Copy", this.successLabel = "Copied!", this.errorLabel = "Error", this.feedbackDuration = 1e3, this.tooltipPlacement = "top", this._state = "idle", this._feedbackTimer = null, this._showTooltip = !1, this._tooltipId = `ui-copy-tooltip-${Eh++}`;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._feedbackTimer !== null && (clearTimeout(this._feedbackTimer), this._feedbackTimer = null);
  }
  /** Resolves the text to copy from the `from` attribute. */
  _resolveFromValue() {
    if (!this.from) return null;
    const e = this.from.match(/^(.+)\[(.+)\]$/);
    if (e) {
      const o = document.getElementById(e[1]);
      return o ? o.getAttribute(e[2]) : null;
    }
    const t = this.from.match(/^(.+)\.(.+)$/);
    if (t) {
      const o = document.getElementById(t[1]);
      if (!o) return null;
      const r = o[t[2]];
      return r != null ? String(r) : null;
    }
    const i = document.getElementById(this.from);
    return i ? i.textContent ?? null : null;
  }
  /** Returns the text to be copied. `from` takes precedence over `value`. */
  _getTextToCopy() {
    return this.from ? this._resolveFromValue() ?? "" : this.value;
  }
  async _handleClick() {
    if (this.disabled) return;
    const e = this._getTextToCopy();
    if (!e) {
      this._showFeedback("error"), this.dispatchEvent(new CustomEvent("ui-copy-error", {
        detail: { reason: "empty" },
        bubbles: !0,
        composed: !0
      }));
      return;
    }
    try {
      await navigator.clipboard.writeText(e), this._showFeedback("success"), this.dispatchEvent(new CustomEvent("ui-copy", {
        detail: { value: e },
        bubbles: !0,
        composed: !0
      }));
    } catch {
      this._showFeedback("error"), this.dispatchEvent(new CustomEvent("ui-copy-error", {
        detail: { reason: "clipboard" },
        bubbles: !0,
        composed: !0
      }));
    }
  }
  _showFeedback(e) {
    this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._state = e, this._showTooltip = !0, this.requestUpdate(), this._feedbackTimer = setTimeout(() => {
      this._state = "idle", this._showTooltip = !1, this._feedbackTimer = null, this.requestUpdate();
    }, this.feedbackDuration);
  }
  _handleMouseEnter() {
    this._state === "idle" && (this._showTooltip = !0, this.requestUpdate());
  }
  _handleMouseLeave() {
    this._state === "idle" && (this._showTooltip = !1, this.requestUpdate());
  }
  _handleFocus() {
    this._state === "idle" && (this._showTooltip = !0, this.requestUpdate());
  }
  _handleBlur() {
    this._state === "idle" && (this._showTooltip = !1, this.requestUpdate());
  }
  _renderIcon() {
    switch (this._state) {
      case "success":
        return l`<span class="icon icon--success" part="success-icon"><slot name="success-icon">${Th}</slot></span>`;
      case "error":
        return l`<span class="icon icon--error" part="error-icon"><slot name="error-icon">${Ah}</slot></span>`;
      default:
        return l`<span class="icon" part="copy-icon"><slot name="copy-icon">${Oh}</slot></span>`;
    }
  }
  _getTooltipLabel() {
    switch (this._state) {
      case "success":
        return this.successLabel;
      case "error":
        return this.errorLabel;
      default:
        return this.copyLabel;
    }
  }
  render() {
    const e = this._getTooltipLabel();
    return l`
            <button
                class="copy-button"
                part="button"
                aria-label=${e || v}
                aria-describedby=${this._showTooltip && e ? this._tooltipId : v}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
                @focus=${this._handleFocus}
                @blur=${this._handleBlur}
            >
                ${this._renderIcon()}
                ${e ? l`
                    <span
                        id=${this._tooltipId}
                        class=${f({
      tooltip: !0,
      "tooltip--visible": this._showTooltip,
      [`tooltip--${this.tooltipPlacement}`]: !0
    })}
                        role="tooltip"
                    >${e}</span>
                ` : v}
            </button>
        `;
  }
};
Le.styles = h(Ph);
gt([
  s({ type: String })
], Le.prototype, "value", 2);
gt([
  s({ type: String })
], Le.prototype, "from", 2);
gt([
  s({ type: Boolean, reflect: !0 })
], Le.prototype, "disabled", 2);
gt([
  s({ type: String, attribute: "copy-label" })
], Le.prototype, "copyLabel", 2);
gt([
  s({ type: String, attribute: "success-label" })
], Le.prototype, "successLabel", 2);
gt([
  s({ type: String, attribute: "error-label" })
], Le.prototype, "errorLabel", 2);
gt([
  s({ type: Number, attribute: "feedback-duration" })
], Le.prototype, "feedbackDuration", 2);
gt([
  s({ type: String, attribute: "tooltip-placement" })
], Le.prototype, "tooltipPlacement", 2);
Le = gt([
  d("ui-copy-button")
], Le);
const Bh = ':host{position:fixed;z-index:var(--ui-toast-z-index, 9999);display:block;max-width:var(--ui-toast-width, 356px);width:100%;padding:var(--ui-toast-padding, 16px);box-sizing:border-box;pointer-events:none;overflow:visible}:host,:host([position="bottom-right"]){bottom:0;right:0}:host([position="bottom-left"]){bottom:0;left:0;right:auto}:host([position="bottom-center"]){bottom:0;left:50%;right:auto;transform:translate(-50%)}:host([position="top-right"]){top:0;right:0;bottom:auto}:host([position="top-left"]){inset:0 auto auto 0}:host([position="top-center"]){inset:0 auto auto 50%;transform:translate(-50%)}.toaster{position:relative;overflow:visible;display:flex;flex-direction:column;width:100%;gap:0;pointer-events:auto}.toast{pointer-events:auto;display:flex;align-items:flex-start;gap:10px;padding:14px 12px 14px 14px;background:var(--ui-toast-bg, var(--ui-surface-1, #ffffff));border:var(--ui-toast-border, 1px solid var(--ui-border-color, #e4e4e7));border-radius:var(--ui-toast-radius, var(--ui-border-radius-lg, .5rem));box-shadow:var(--ui-toast-shadow, var(--ui-shadow-lg, 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)));color:var(--ui-toast-color, var(--ui-text-color, #111827));font-family:var(--ui-font-family, system-ui, sans-serif);font-size:.875rem;line-height:1.4;will-change:transform,opacity;transition:transform .4s cubic-bezier(.16,1,.3,1),opacity .3s ease,box-shadow .2s ease;animation:ui-toast-in-bottom .24s cubic-bezier(.16,1,.3,1)}.toaster--top .toast{animation-name:ui-toast-in-top}@keyframes ui-toast-in-bottom{0%{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes ui-toast-in-top{0%{opacity:0;transform:translateY(-12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}.toast[data-front-index="0"]{z-index:3}.toast[data-front-index="1"]{z-index:2}.toast[data-front-index="2"]{z-index:1}.toaster:not(.toaster--expanded) .toast[data-front-index="1"],.toaster:not(.toaster--expanded) .toast[data-front-index="2"]{position:absolute;width:100%;animation:none;pointer-events:none}.toaster--bottom:not(.toaster--expanded) .toast[data-front-index="1"],.toaster--bottom:not(.toaster--expanded) .toast[data-front-index="2"]{bottom:0}.toaster--top:not(.toaster--expanded) .toast[data-front-index="1"],.toaster--top:not(.toaster--expanded) .toast[data-front-index="2"]{top:0}.toaster--bottom:not(.toaster--expanded) .toast{transform:scale(var(--_stack-scale, 1)) translateY(calc(-1 * var(--_stack-offset, 0) * 1px));opacity:var(--_stack-opacity, 1)}.toaster--top:not(.toaster--expanded) .toast{transform:scale(var(--_stack-scale, 1)) translateY(calc(var(--_stack-offset, 0) * 1px));opacity:var(--_stack-opacity, 1)}.toaster--expanded{gap:var(--ui-toast-gap, 8px)}.toaster--expanded .toast{position:relative;transform:scale(1) translateY(0);opacity:1;z-index:auto;pointer-events:auto;animation-name:none}.toast__icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:1px}.toast__icon--success{color:var(--ui-toast-success-icon-color, var(--ui-success-color, #10b981))}.toast__icon--error{color:var(--ui-toast-error-icon-color, var(--ui-error-color, #ef4444))}.toast__icon--warning{color:var(--ui-toast-warning-icon-color, var(--ui-warning-color, #f59e0b))}.toast__icon--info{color:var(--ui-toast-info-icon-color, var(--ui-primary-color, #3b82f6))}.toast__icon--loading{color:var(--ui-text-color-muted, #71717a)}.spinner{display:block;width:16px;height:16px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:ui-toast-spin .65s linear infinite}@keyframes ui-toast-spin{to{transform:rotate(360deg)}}.toast__body{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.toast__message{font-weight:500}.toast__description{font-size:.8125rem;color:var(--ui-text-color-muted, #71717a);line-height:1.5;margin-top:2px}.toast__action{margin-top:8px;align-self:flex-start;padding:3px 10px;font-size:.8125rem;font-weight:500;border:1px solid var(--ui-border-color, #e4e4e7);border-radius:var(--ui-border-radius-md, .375rem);background:transparent;color:inherit;cursor:pointer;font-family:inherit;line-height:1.5;transition:background .12s ease}.toast__action:hover{background:var(--ui-hover-color, rgba(0, 0, 0, .04))}.toast__action:focus-visible{outline:2px solid var(--ui-primary-focus-ring, rgba(59, 130, 246, .5));outline-offset:1px}.toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;border:none;background:transparent;color:var(--ui-text-color-subtle, #a1a1aa);cursor:pointer;border-radius:var(--ui-border-radius-sm, .125rem);transition:background .12s ease,color .12s ease;margin-left:auto}.toast__close:hover{background:var(--ui-hover-color, rgba(0, 0, 0, .06));color:var(--ui-text-color, #111827)}.toast__close:focus-visible{outline:2px solid var(--ui-primary-focus-ring, rgba(59, 130, 246, .5));outline-offset:1px}';
var Mh = Object.defineProperty, Lh = Object.getOwnPropertyDescriptor, Kr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Lh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Mh(t, i, r), r;
};
const ze = {
  toasts: [],
  listeners: /* @__PURE__ */ new Set(),
  add(e) {
    const t = this.toasts.findIndex((i) => i.id === e.id);
    t >= 0 ? this.toasts = this.toasts.map((i, o) => o === t ? { ...i, ...e } : i) : this.toasts = [...this.toasts, e], this._notify();
  },
  update(e, t) {
    this.toasts = this.toasts.map((i) => i.id === e ? { ...i, ...t } : i), this._notify();
  },
  remove(e) {
    this.toasts = this.toasts.filter((t) => t.id !== e), this._notify();
  },
  clear() {
    this.toasts = [], this._notify();
  },
  _notify() {
    this.listeners.forEach((e) => e());
  }
};
let Uh = 0;
const es = () => `ui-toast-${++Uh}`;
function ci(e, t, i = {}) {
  const o = i.id ?? es();
  return ze.add({
    ...i,
    id: o,
    type: t,
    message: e,
    dismissible: i.dismissible !== !1
  }), o;
}
const kp = Object.assign(
  (e, t) => ci(e, "default", t),
  {
    /** Show a success toast. */
    success: (e, t) => ci(e, "success", t),
    /** Show an error toast. */
    error: (e, t) => ci(e, "error", t),
    /** Show an info toast. */
    info: (e, t) => ci(e, "info", t),
    /** Show a warning toast. */
    warning: (e, t) => ci(e, "warning", t),
    /** Show a persistent loading toast (duration = Infinity). */
    loading: (e, t) => ci(e, "loading", { ...t, duration: 1 / 0 }),
    /**
     * Track a Promise with automatic loading → success/error transitions.
     *
     * @returns The toast id (same id throughout the lifecycle).
     */
    promise(e, t, i) {
      const o = i?.id ?? es();
      return ze.add({
        ...i,
        id: o,
        type: "loading",
        message: t.loading,
        duration: 1 / 0,
        dismissible: !1
      }), e.then((r) => {
        const a = typeof t.success == "function" ? t.success(r) : t.success;
        ze.update(o, {
          type: "success",
          message: a,
          dismissible: !0,
          duration: i?.duration
        });
      }).catch((r) => {
        const a = t.error ?? "Something went wrong", n = typeof a == "function" ? a(r) : a;
        ze.update(o, {
          type: "error",
          message: n,
          dismissible: !0,
          duration: i?.duration
        });
      }), o;
    },
    /**
     * Dismiss a specific toast by id, or all toasts when called with no argument.
     */
    dismiss(e) {
      e !== void 0 ? ze.remove(e) : ze.clear();
    }
  }
), jh = l`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"></path>
    </svg>
`, Rh = l`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m15 9-6 6"></path>
        <path d="m9 9 6 6"></path>
    </svg>
`, Nh = l`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
    </svg>
`, Vh = l`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
    </svg>
`, Fh = l`
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
`;
let Oi = class extends c {
  constructor() {
    super(...arguments), this.position = "bottom-right", this.duration = 4e3, this.visibleToasts = 3, this._toasts = [], this._timers = /* @__PURE__ */ new Map(), this._expanded = !1, this._listener = () => {
      this._toasts = [...ze.toasts], this.requestUpdate();
    }, this._handleExpand = () => {
      this._expanded = !0, this.requestUpdate();
    }, this._handleCollapse = () => {
      this._expanded = !1, this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback(), ze.listeners.add(this._listener), this._toasts = [...ze.toasts];
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ze.listeners.delete(this._listener), this._timers.forEach((e) => clearTimeout(e)), this._timers.clear();
  }
  updated(e) {
    const t = new Set(this._toasts.map((i) => i.id));
    this._timers.forEach((i, o) => {
      t.has(o) || (clearTimeout(i), this._timers.delete(o));
    }), this._toasts.forEach((i) => {
      if (this._timers.has(i.id)) return;
      const o = i.duration !== void 0 ? i.duration : this.duration;
      Number.isFinite(o) && o > 0 && this._timers.set(i.id, setTimeout(() => this._dismiss(i.id), o));
    });
  }
  _dismiss(e) {
    clearTimeout(this._timers.get(e)), this._timers.delete(e), ze.remove(e);
  }
  _pauseTimer(e) {
    const t = this._timers.get(e);
    t !== void 0 && (clearTimeout(t), this._timers.delete(e));
  }
  _resumeTimer(e) {
    if (this._timers.has(e.id)) return;
    const t = e.duration !== void 0 ? e.duration : this.duration;
    Number.isFinite(t) && t > 0 && this._timers.set(e.id, setTimeout(() => this._dismiss(e.id), t));
  }
  _icon(e) {
    switch (e) {
      case "success":
        return l`<span class="toast__icon toast__icon--success">${jh}</span>`;
      case "error":
        return l`<span class="toast__icon toast__icon--error">${Rh}</span>`;
      case "warning":
        return l`<span class="toast__icon toast__icon--warning">${Vh}</span>`;
      case "info":
        return l`<span class="toast__icon toast__icon--info">${Nh}</span>`;
      case "loading":
        return l`<span class="toast__icon toast__icon--loading"><span class="spinner"></span></span>`;
      default:
        return v;
    }
  }
  /**
   * Render a single toast.
   *
   * @param t          - Toast data.
   * @param frontIndex - 0 = most-recent / front card; higher = further back.
   */
  _renderToast(e, t) {
    const i = e.type === "error" ? "assertive" : e.type === "loading" ? "off" : "polite", o = +(1 - t * 0.05).toFixed(3), r = t * 6, a = +Math.max(1 - t * 0.2, 0).toFixed(3);
    return l`
            <div
                class="toast toast--${e.type}"
                role="status"
                aria-live=${i}
                aria-atomic="true"
                data-toast-id=${e.id}
                data-front-index=${t}
                style="--_stack-scale:${o};--_stack-offset:${r};--_stack-opacity:${a}"
                @mouseenter=${() => this._pauseTimer(e.id)}
                @mouseleave=${() => this._resumeTimer(e)}
            >
                ${this._icon(e.type)}
                <div class="toast__body">
                    <div class="toast__message">${e.message}</div>
                    ${e.description ? l`<div class="toast__description">${e.description}</div>` : v}
                    ${e.action ? l`
                            <button
                                class="toast__action"
                                @click=${() => {
      e.action.onClick(), this._dismiss(e.id);
    }}
                            >${e.action.label}</button>
                          ` : v}
                </div>
                ${e.dismissible !== !1 ? l`
                        <button
                            class="toast__close"
                            aria-label="Dismiss notification"
                            @click=${() => this._dismiss(e.id)}
                        >${Fh}</button>
                      ` : v}
            </div>
        `;
  }
  render() {
    const e = this.position.startsWith("top"), i = this._toasts.filter(
      (a) => a.position === void 0 || a.position === this.position
    ).slice(-this.visibleToasts), o = e ? [...i].reverse() : i, r = o.length;
    return l`
            <div
                class="toaster toaster--${e ? "top" : "bottom"} ${this._expanded ? "toaster--expanded" : ""}"
                @mouseenter=${this._handleExpand}
                @mouseleave=${this._handleCollapse}
            >
                ${Lt(o, (a) => a.id, (a, n) => {
      const p = e ? n : r - 1 - n;
      return this._renderToast(a, p);
    })}
            </div>
        `;
  }
};
Oi.styles = h(Bh);
Kr([
  s({ type: String, reflect: !0 })
], Oi.prototype, "position", 2);
Kr([
  s({ type: Number })
], Oi.prototype, "duration", 2);
Kr([
  s({ type: Number, attribute: "visible-toasts" })
], Oi.prototype, "visibleToasts", 2);
Oi = Kr([
  d("ui-toaster")
], Oi);
const qh = ':host{display:inline-flex;font-family:var(--ui-font-family)}:host([disabled]){cursor:not-allowed;pointer-events:none}.toggle{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:var(--ui-toggle-border-radius, var(--ui-border-radius-md));padding:var(--ui-toggle-padding-y, .5rem) var(--ui-toggle-padding-x, .75rem);min-width:var(--ui-toggle-min-width, 2.25rem);min-height:var(--ui-toggle-min-height, 2.25rem);font-size:var(--ui-toggle-font-size, .875rem);font-weight:500;font-family:inherit;color:var(--ui-toggle-color, var(--ui-text-color));background-color:var(--ui-toggle-bg, transparent);border:1px solid transparent;cursor:pointer;transition:background-color .15s ease,color .15s ease,border-color .15s ease;-webkit-user-select:none;user-select:none;white-space:nowrap;line-height:1;text-decoration:none;box-sizing:border-box}.toggle:hover:not([disabled]){background-color:var(--ui-toggle-bg-hover, var(--ui-muted-background));color:var(--ui-toggle-color-hover, var(--ui-text-color))}.toggle[aria-pressed=true]{background-color:var(--ui-toggle-bg-pressed, var(--ui-primary-color-light));color:var(--ui-toggle-color-pressed, var(--ui-primary-color))}.toggle[aria-pressed=true]:hover:not([disabled]){background-color:var(--ui-toggle-bg-pressed-hover, var(--ui-primary-color-light-hover))}.toggle[disabled]{opacity:.5;cursor:not-allowed;pointer-events:none}.toggle:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}:host([size="sm"]) .toggle{padding:var(--ui-toggle-padding-y-sm, .375rem) var(--ui-toggle-padding-x-sm, .625rem);min-width:2rem;min-height:2rem;font-size:.8125rem}:host([size="lg"]) .toggle{padding:var(--ui-toggle-padding-y-lg, .625rem) var(--ui-toggle-padding-x-lg, 1rem);min-width:2.75rem;min-height:2.75rem;font-size:1rem}:host([variant="outline"]) .toggle{border-color:var(--ui-toggle-border-color, var(--ui-border-color));background-color:var(--ui-toggle-bg, var(--ui-surface-1))}:host([variant="outline"]) .toggle:hover:not([disabled]){background-color:var(--ui-toggle-bg-hover, var(--ui-muted-background));border-color:var(--ui-toggle-border-color, var(--ui-border-color))}:host([variant="outline"]) .toggle[aria-pressed=true]{background-color:var(--ui-toggle-bg-pressed, var(--ui-primary-color-light));color:var(--ui-toggle-color-pressed, var(--ui-primary-color));border-color:var(--ui-toggle-border-pressed-color, var(--ui-primary-color-light-hover))}:host([variant="outline"]) .toggle[aria-pressed=true]:hover:not([disabled]){background-color:var(--ui-toggle-bg-pressed-hover, var(--ui-primary-color-light-hover))}:host([dir="rtl"]) .toggle{direction:rtl}';
var Hh = Object.defineProperty, Yh = Object.getOwnPropertyDescriptor, ni = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Yh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Hh(t, i, r), r;
};
let pt = class extends c {
  constructor() {
    super(...arguments), this.pressed = !1, this.disabled = !1, this.variant = "default", this.size = "default", this.dir = "ltr", this.defaultPressed = !1, this._firstUpdate = !0;
  }
  willUpdate(e) {
    super.willUpdate(e), this._firstUpdate && (this._firstUpdate = !1, this.defaultPressed && (this.pressed = !0));
  }
  _handleClick() {
    this.disabled || (this.pressed = !this.pressed, this.dispatchEvent(new CustomEvent("ui-toggle-change", {
      detail: { pressed: this.pressed },
      bubbles: !0,
      composed: !0
    })));
  }
  _handleKeydown(e) {
    (e.key === " " || e.key === "Enter") && (e.preventDefault(), this._handleClick());
  }
  render() {
    return l`
            <button
                class="toggle"
                type="button"
                aria-pressed=${this.pressed ? "true" : "false"}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
                @keydown=${this._handleKeydown}
            >
                <slot></slot>
            </button>
        `;
  }
};
pt.styles = h(qh);
ni([
  s({ type: Boolean, reflect: !0 })
], pt.prototype, "pressed", 2);
ni([
  s({ type: Boolean, reflect: !0 })
], pt.prototype, "disabled", 2);
ni([
  s({ type: String, reflect: !0 })
], pt.prototype, "variant", 2);
ni([
  s({ type: String, reflect: !0 })
], pt.prototype, "size", 2);
ni([
  s({ type: String, reflect: !0 })
], pt.prototype, "dir", 2);
ni([
  s({ type: Boolean, attribute: "default-pressed" })
], pt.prototype, "defaultPressed", 2);
pt = ni([
  d("ui-toggle")
], pt);
var Kh = Object.defineProperty, Wh = Object.getOwnPropertyDescriptor, pe = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Wh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Kh(t, i, r), r;
};
let or = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.dir = "ltr", this._panels = [], this._handles = [], this._collapsibleAtDragStart = /* @__PURE__ */ new Set();
  }
  /* ---- public API ---- */
  /** Returns a snapshot of panel sizes as percentages (0-100). */
  getLayout() {
    return this._panels.map((e) => e.size);
  }
  /* ---- child management ---- */
  _collectChildren() {
    const e = [], t = [], i = this.querySelectorAll(
      "ui-resizable-panel, ui-resizable-handle"
    );
    for (const o of i)
      o.closest("ui-resizable-group") === this && (o instanceof Ge ? e.push(o) : o instanceof Zt && t.push(o));
    this._panels = e, this._handles = t, this._syncChildren();
  }
  _syncChildren() {
    for (const e of this._panels)
      e._orientation = this.orientation;
    for (const e of this._handles)
      e.orientation = this.orientation, e._dir = this.dir;
    this.style.setProperty("--_rg-handle-total", this._computeHandleTotal()), this._distributeDefaultSizes(), this._syncAriaOnHandles();
  }
  /**
   * Builds the CSS value for `--_rg-handle-total` — the sum of all handle
   * pixel sizes (honouring `with-handle` vs plain).  Panels use this in
   * `calc()` so their `flex-basis` never pushes a handle off-screen.
   */
  _computeHandleTotal() {
    if (this._handles.length === 0) return "0px";
    const e = this._handles.map(
      (t) => t.withHandle ? "var(--ui-resizable-handle-active-size, 12px)" : "var(--ui-resizable-handle-size, 4px)"
    );
    return e.length === 1 ? e[0] : `calc(${e.join(" + ")})`;
  }
  _distributeDefaultSizes() {
    for (const i of this._panels)
      !i._hasExplicitSize && i.defaultSize > 0 ? (i.size = i.defaultSize, i._hasExplicitSize = !0) : i.size > 0 && (i._hasExplicitSize = !0);
    let e = 0, t = 0;
    for (const i of this._panels)
      i._hasExplicitSize ? e += i.size : t++;
    if (t > 0) {
      const o = Math.max(0, 100 - e) / t;
      for (const r of this._panels)
        r._hasExplicitSize || (r.size = o, r._hasExplicitSize = !0);
    }
    for (const i of this._panels)
      i._applySize();
  }
  _syncAriaOnHandles() {
    for (let e = 0; e < this._handles.length; e++) {
      const t = this._handles[e], i = this._panels[e], o = this._panels[e + 1];
      !i || !o || (t.setAttribute("aria-valuenow", String(Math.round(i.size))), t.setAttribute("aria-valuemin", String(Math.round(i.minSize))), t.setAttribute("aria-valuemax", String(Math.round(i.maxSize))), t.setAttribute("aria-orientation", this.orientation));
    }
  }
  /* ---- drag session tracking ---- */
  /** @internal – called by handle on pointerdown */
  _startDrag() {
    this._collapsibleAtDragStart.clear();
    for (const e of this._panels)
      e.collapsible && e.size <= e.minSize && this._collapsibleAtDragStart.add(e);
  }
  /** @internal – called by handle on pointerup / cancel / lost */
  _endDrag() {
    this._collapsibleAtDragStart.clear();
  }
  /* ---- collapse / expand API ---- */
  /** @internal – called by UiResizablePanel.collapse() */
  _collapsePanel(e) {
    const t = this._panels.indexOf(e);
    if (t === -1 || e.collapsed) return;
    const i = this._panels[t + 1] ?? this._panels[t - 1];
    i && (i.size += e.size, e.size = 0, e.collapsed = !0, e._applySize(), i._applySize(), this._syncAriaOnHandles(), this._fireChange(), this.dispatchEvent(
      new CustomEvent("ui-resizable-collapse", {
        bubbles: !0,
        composed: !0,
        detail: { index: t, layout: this.getLayout() }
      })
    ));
  }
  /** @internal – called by UiResizablePanel.expand() */
  _expandPanel(e) {
    const t = this._panels.indexOf(e);
    if (t === -1 || !e.collapsed) return;
    const i = this._panels[t + 1] ?? this._panels[t - 1];
    if (!i) return;
    const o = e._restoreSize > 0 ? e._restoreSize : Math.max(e.minSize > 0 ? e.minSize : 0, e.defaultSize > 0 ? e.defaultSize : 20), r = i.size - i.minSize, a = Math.min(o, Math.max(0, r));
    a <= 0 || (e.size = a, i.size = Math.max(i.minSize, i.size - a), e.collapsed = !1, e._applySize(), i._applySize(), this._syncAriaOnHandles(), this._fireChange(), this.dispatchEvent(
      new CustomEvent("ui-resizable-expand", {
        bubbles: !0,
        composed: !0,
        detail: { index: t, layout: this.getLayout() }
      })
    ));
  }
  /* ---- resize logic (called from handle) ---- */
  /** @internal */
  _handleResize(e, t) {
    const i = this._handles.indexOf(e);
    if (i === -1) return;
    const o = this._panels[i], r = this._panels[i + 1];
    if (!o || !r) return;
    const a = this.orientation === "horizontal" && this.dir === "rtl" ? -t : t, n = this.orientation === "horizontal" ? this.getBoundingClientRect().width : this.getBoundingClientRect().height;
    if (n === 0) return;
    const p = a / n * 100;
    let u = o.size + p, y = r.size - p;
    if (u < o.minSize)
      if (this._collapsibleAtDragStart.has(o) && u < o.minSize / 2)
        y += u, u = 0;
      else {
        const g = o.minSize - u;
        u = o.minSize, y -= g;
      }
    if (y < r.minSize)
      if (this._collapsibleAtDragStart.has(r) && y < r.minSize / 2)
        u += y, y = 0;
      else {
        const g = r.minSize - y;
        y = r.minSize, u -= g;
      }
    if (o.maxSize < 100 && u > o.maxSize) {
      const g = u - o.maxSize;
      u = o.maxSize, y += g;
    }
    if (r.maxSize < 100 && y > r.maxSize) {
      const g = y - r.maxSize;
      y = r.maxSize, u += g;
    }
    u = Math.max(0, Math.min(100, u)), y = Math.max(0, Math.min(100, y)), o.size = u, r.size = y, o._applySize(), r._applySize(), this._syncAriaOnHandles(), this._fireChange();
  }
  /** @internal – keyboard step resize */
  _handleKeyResize(e, t) {
    const i = getComputedStyle(this).getPropertyValue("--ui-resizable-step").trim(), o = i ? parseFloat(i) : 5;
    this._handleResize(e, t * ((this.orientation === "horizontal" ? this.getBoundingClientRect().width : this.getBoundingClientRect().height) * o / 100));
  }
  _fireChange() {
    this.dispatchEvent(
      new CustomEvent("ui-resizable-change", {
        bubbles: !0,
        composed: !0,
        detail: { layout: this.getLayout() }
      })
    );
  }
  /* ---- lifecycle ---- */
  updated(e) {
    (e.has("orientation") || e.has("dir")) && this._syncChildren();
  }
  render() {
    return l`<slot @slotchange=${() => this._collectChildren()}></slot>`;
  }
};
or.styles = Ie`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;
      /* Internal: total pixel width/height of all handles — set by JS. */
      --_rg-handle-total: 0px;
    }
    :host([orientation='vertical']) {
      flex-direction: column;
    }
  `;
pe([
  s({ reflect: !0 })
], or.prototype, "orientation", 2);
pe([
  s({ reflect: !0 })
], or.prototype, "dir", 2);
or = pe([
  d("ui-resizable-group")
], or);
let Ge = class extends c {
  constructor() {
    super(...arguments), this.size = 0, this.defaultSize = 0, this.minSize = 0, this.maxSize = 100, this.collapsible = !1, this.collapsed = !1, this._restoreSize = 0, this._orientation = "horizontal", this._hasExplicitSize = !1, this._firstUpdate = !0;
  }
  willUpdate(e) {
    this._firstUpdate && (this._firstUpdate = !1, this.defaultSize > 0 && this.size === 0 && (this.size = this.defaultSize, this._hasExplicitSize = !0)), e.has("size") && this._applySize();
  }
  /** @internal */
  _applySize() {
    this.size > 0 && (this._restoreSize = this.size), this.style.flexBasis = `calc(${this.size} * (1% - var(--_rg-handle-total, 0px) / 100))`;
  }
  connectedCallback() {
    super.connectedCallback(), this.size > 0 && (this._hasExplicitSize = !0, this._applySize());
  }
  /* ---- programmatic collapse / expand API ---- */
  /**
   * Collapse this panel to zero size, transferring its space to the adjacent
   * sibling. Sets `collapsed = true` and stores the current size for `expand()`.
   * No-op if already collapsed.
   */
  collapse() {
    this.closest("ui-resizable-group")?._collapsePanel(this);
  }
  /**
   * Expand this panel back to its previous size (or `defaultSize` as fallback).
   * Sets `collapsed = false`. No-op if not currently collapsed.
   */
  expand() {
    this.closest("ui-resizable-group")?._expandPanel(this);
  }
  /**
   * Toggle between collapsed and expanded states.
   */
  toggle() {
    this.collapsed ? this.expand() : this.collapse();
  }
  render() {
    return l`<slot></slot>`;
  }
};
Ge.styles = Ie`
    :host {
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      flex-grow: 0;
    }
  `;
pe([
  s({ type: Number })
], Ge.prototype, "size", 2);
pe([
  s({ type: Number, attribute: "default-size" })
], Ge.prototype, "defaultSize", 2);
pe([
  s({ type: Number, attribute: "min-size" })
], Ge.prototype, "minSize", 2);
pe([
  s({ type: Number, attribute: "max-size" })
], Ge.prototype, "maxSize", 2);
pe([
  s({ type: Boolean })
], Ge.prototype, "collapsible", 2);
pe([
  s({ type: Boolean, reflect: !0 })
], Ge.prototype, "collapsed", 2);
Ge = pe([
  d("ui-resizable-panel")
], Ge);
let Zt = class extends c {
  constructor() {
    super(...arguments), this.withHandle = !1, this.disabled = !1, this.orientation = "horizontal", this._dir = "ltr", this._dragging = !1, this._startPos = 0, this._onPointerDown = (e) => {
      this.disabled || e.button !== 0 || (e.preventDefault(), this._dragging = !0, this._startPos = this.orientation === "horizontal" ? e.clientX : e.clientY, this.setPointerCapture(e.pointerId), this.closest("ui-resizable-group")?._startDrag());
    }, this._onPointerMove = (e) => {
      if (!this._dragging) return;
      if (e.buttons === 0) {
        this._dragging = !1;
        return;
      }
      const t = this.orientation === "horizontal" ? e.clientX : e.clientY, i = t - this._startPos;
      this._startPos = t, this.closest("ui-resizable-group")?._handleResize(this, i);
    }, this._onPointerUp = (e) => {
      this._dragging && (this._dragging = !1, this.releasePointerCapture(e.pointerId), this.closest("ui-resizable-group")?._endDrag());
    }, this._onPointerCancel = (e) => {
      this._dragging && (this._dragging = !1, this.releasePointerCapture(e.pointerId), this.closest("ui-resizable-group")?._endDrag());
    }, this._onLostPointerCapture = () => {
      this._dragging = !1, this.closest("ui-resizable-group")?._endDrag();
    }, this._onKeyDown = (e) => {
      if (this.disabled) return;
      const t = this.closest("ui-resizable-group");
      if (!t) return;
      let i = 0;
      this.orientation === "horizontal" ? e.key === "ArrowLeft" ? i = -1 : e.key === "ArrowRight" && (i = 1) : e.key === "ArrowUp" ? i = -1 : e.key === "ArrowDown" && (i = 1), e.key === "Home" ? i = -100 : e.key === "End" && (i = 100), i !== 0 && (e.preventDefault(), t._handleKeyResize(this, i));
    };
  }
  /* ---- lifecycle ---- */
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "separator"), this.setAttribute("tabindex", "0"), this.addEventListener("pointerdown", this._onPointerDown), this.addEventListener("pointermove", this._onPointerMove), this.addEventListener("pointerup", this._onPointerUp), this.addEventListener("pointercancel", this._onPointerCancel), this.addEventListener("lostpointercapture", this._onLostPointerCapture), this.addEventListener("keydown", this._onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("pointerdown", this._onPointerDown), this.removeEventListener("pointermove", this._onPointerMove), this.removeEventListener("pointerup", this._onPointerUp), this.removeEventListener("pointercancel", this._onPointerCancel), this.removeEventListener("lostpointercapture", this._onLostPointerCapture), this.removeEventListener("keydown", this._onKeyDown);
  }
  render() {
    return l`<div class="grip"><div class="grip-dots">${this._renderDots()}</div></div>`;
  }
  _renderDots() {
    const t = [];
    for (let i = 0; i < 5; i++)
      t.push(l`<div class="grip-dot"></div>`);
    return t;
  }
};
Zt.styles = Ie`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      outline: none;
      background: var(--ui-resizable-handle-bg, var(--ui-border-color, #e4e4e7));
      transition: background var(--ui-resizable-handle-transition, 150ms) ease;
    }
    :host(:hover),
    :host(:focus-visible) {
      background: var(--ui-resizable-handle-hover-bg, var(--ui-primary-color, #3b82f6));
    }
    :host([orientation='horizontal']) {
      width: var(--ui-resizable-handle-size, 4px);
      cursor: col-resize;
      touch-action: none;
    }
    :host([orientation='vertical']) {
      height: var(--ui-resizable-handle-size, 4px);
      cursor: row-resize;
      touch-action: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }

    .grip {
      display: none;
      border-radius: var(--ui-border-radius-sm, 2px);
      background: var(--ui-resizable-grip-bg, var(--ui-background, #fff));
      z-index: 1;
    }
    :host([with-handle]) .grip {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host([orientation='horizontal'][with-handle]) .grip {
      width: var(--ui-resizable-grip-width, 12px);
      height: var(--ui-resizable-grip-height, 24px);
    }
    :host([orientation='vertical'][with-handle]) .grip {
      width: var(--ui-resizable-grip-height, 24px);
      height: var(--ui-resizable-grip-width, 12px);
    }
    :host([orientation='horizontal'][with-handle]) {
      width: var(--ui-resizable-handle-active-size, 12px);
    }
    :host([orientation='vertical'][with-handle]) {
      height: var(--ui-resizable-handle-active-size, 12px);
    }

    .grip-dots {
      display: flex;
      gap: 1px;
    }
    :host([orientation='horizontal']) .grip-dots {
      flex-direction: column;
    }
    :host([orientation='vertical']) .grip-dots {
      flex-direction: row;
    }
    .grip-dot {
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background: var(--ui-resizable-grip-dot-color, var(--ui-text-color-muted, #71717a));
    }
  `;
pe([
  s({ type: Boolean, reflect: !0, attribute: "with-handle" })
], Zt.prototype, "withHandle", 2);
pe([
  s({ type: Boolean, reflect: !0 })
], Zt.prototype, "disabled", 2);
pe([
  s({ reflect: !0 })
], Zt.prototype, "orientation", 2);
Zt = pe([
  d("ui-resizable-handle")
], Zt);
const Gh = ":host{display:block;position:relative;overflow:hidden;user-select:none;-webkit-user-select:none;touch-action:none;border-radius:var(--ui-image-comparer-border-radius, var(--ui-border-radius-md));aspect-ratio:var(--ui-image-comparer-aspect-ratio, 16 / 9)}.base{position:relative;width:100%;height:100%;overflow:hidden}.before,.after{position:absolute;inset:0;overflow:hidden}.after ::slotted(img),.after ::slotted(svg),.before ::slotted(img),.before ::slotted(svg){display:block;width:100%;height:100%;object-fit:cover;max-width:none;pointer-events:none}.before{z-index:1}.divider{position:absolute;top:0;height:100%;z-index:2;width:var(--ui-image-comparer-divider-width, 2px);background:var(--ui-image-comparer-divider-color, var(--ui-color-white));transform:translate(-50%);pointer-events:none;box-shadow:0 0 4px #0000004d}.handle{position:absolute;top:50%;z-index:3;display:flex;align-items:center;justify-content:center;width:var(--ui-image-comparer-handle-size, 40px);height:var(--ui-image-comparer-handle-size, 40px);border-radius:var(--ui-border-radius-full);background:var(--ui-image-comparer-handle-bg, var(--ui-color-white));border:2px solid var(--ui-image-comparer-handle-border-color, rgba(0, 0, 0, .15));box-shadow:var(--ui-shadow-md);transform:translate(-50%,-50%);cursor:ew-resize;outline:none;transition:box-shadow .15s ease}.handle:focus-visible{box-shadow:var(--ui-shadow-md),0 0 0 3px var(--ui-primary-focus-ring)}.handle:hover{box-shadow:var(--ui-shadow-lg)}.handle svg{width:20px;height:20px;color:var(--ui-image-comparer-handle-icon-color, var(--ui-text-color-muted));flex-shrink:0}:host([disabled]){opacity:.5;pointer-events:none}";
var Xh = Object.defineProperty, Zh = Object.getOwnPropertyDescriptor, Yo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Zh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Xh(t, i, r), r;
};
let sr = class extends c {
  constructor() {
    super(...arguments), this.position = 50, this.disabled = !1, this._dragging = !1, this._onPointerDown = (e) => {
      this.disabled || (e.preventDefault(), this._dragging = !0, this.setPointerCapture(e.pointerId), this._setPosition(this._getPositionFromPointer(e)), this.shadowRoot?.querySelector(".handle")?.focus(), this.addEventListener("pointermove", this._onPointerMove), this.addEventListener("pointerup", this._onPointerUp), this.addEventListener("pointercancel", this._onPointerUp));
    }, this._onPointerMove = (e) => {
      if (this._dragging) {
        if (e.buttons === 0) {
          this._stopDrag();
          return;
        }
        this._setPosition(this._getPositionFromPointer(e));
      }
    }, this._onPointerUp = (e) => {
      this.releasePointerCapture(e.pointerId), this._stopDrag();
    }, this._onKeyDown = (e) => {
      if (this.disabled) return;
      const t = e.shiftKey ? 10 : 1;
      let i = !0;
      switch (e.key) {
        case "ArrowLeft":
          this._setPosition(this.position - t);
          break;
        case "ArrowRight":
          this._setPosition(this.position + t);
          break;
        case "Home":
          this._setPosition(0);
          break;
        case "End":
          this._setPosition(100);
          break;
        default:
          i = !1;
      }
      i && (e.preventDefault(), e.stopPropagation());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("pointerdown", this._onPointerDown), this.addEventListener("keydown", this._onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("pointerdown", this._onPointerDown), this.removeEventListener("keydown", this._onKeyDown), this._stopDrag();
  }
  _clamp(e) {
    return Math.min(100, Math.max(0, e));
  }
  _setPosition(e) {
    const t = this._clamp(e);
    t !== this.position && (this.position = t, this.dispatchEvent(
      new CustomEvent("ui-image-comparer-change", {
        detail: { position: t },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _getPositionFromPointer(e) {
    const t = this.getBoundingClientRect();
    return (e.clientX - t.left) / t.width * 100;
  }
  _stopDrag() {
    this._dragging = !1, this.removeEventListener("pointermove", this._onPointerMove), this.removeEventListener("pointerup", this._onPointerUp), this.removeEventListener("pointercancel", this._onPointerUp);
  }
  /* ── Render ────────────────────────────────────────────────── */
  render() {
    const e = this._clamp(this.position);
    return l`
            <div class="base" part="base">
                <div class="after" part="after">
                    <slot name="after"></slot>
                </div>

                <div
                    class="before"
                    part="before"
                    style="clip-path: inset(0 ${100 - e}% 0 0)"
                >
                    <slot name="before"></slot>
                </div>

                <div
                    class="divider"
                    part="divider"
                    style="left: ${e}%"
                ></div>

                <div
                    class="handle"
                    part="handle"
                    role="slider"
                    tabindex="${this.disabled ? -1 : 0}"
                    aria-label="Image comparison slider"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${e}"
                    aria-disabled="${this.disabled}"
                    style="left: ${e}%"
                >
                    <slot name="handle">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M15 18l6-6-6-6M9 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                        </svg>
                    </slot>
                </div>
            </div>
        `;
  }
};
sr.styles = h(Gh);
Yo([
  s({ type: Number })
], sr.prototype, "position", 2);
Yo([
  s({ type: Boolean, reflect: !0 })
], sr.prototype, "disabled", 2);
sr = Yo([
  d("ui-image-comparer")
], sr);
var Jh = Object.defineProperty, Qh = Object.getOwnPropertyDescriptor, Bt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Qh(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Jh(t, i, r), r;
};
function ep(e, t) {
  const i = [], o = tp(e);
  for (const r of o) {
    const a = /^repeat\((\d+(?:\.\d+)?)(px|%)\)$/.exec(r);
    if (a) {
      const u = parseFloat(a[1]), y = a[2] === "px" ? u : u / 100 * t;
      if (y > 0)
        for (let g = y; g < t; g += y)
          i.push(g);
      continue;
    }
    const n = /^(\d+(?:\.\d+)?)px$/.exec(r);
    if (n) {
      i.push(parseFloat(n[1]));
      continue;
    }
    const p = /^(\d+(?:\.\d+)?)%$/.exec(r);
    if (p) {
      i.push(parseFloat(p[1]) / 100 * t);
      continue;
    }
  }
  return i;
}
function tp(e) {
  const t = [];
  let i = 0, o = "";
  for (const r of e.trim())
    r === "(" ? (i++, o += r) : r === ")" ? (i--, o += r) : r === " " && i === 0 ? o && (t.push(o), o = "") : o += r;
  return o && t.push(o), t;
}
let Xe = class extends c {
  constructor() {
    super(...arguments), this.position = 50, this.positionInPixels = -1, this.vertical = !1, this.disabled = !1, this.snap = "", this.snapThreshold = 12, this._positionPx = -1, this._cachedSize = 0, this._dragging = !1, this._internalUpdate = !1, this._onDividerPointerDown = (e) => {
      this.disabled || e.button !== 0 || (e.preventDefault(), this._dragging = !0, this.setPointerCapture(e.pointerId), this.addEventListener("pointermove", this._onPointerMove), this.addEventListener("pointerup", this._onPointerUp), this.addEventListener("pointercancel", this._onPointerUp));
    }, this._onPointerMove = (e) => {
      if (!this._dragging) return;
      if (e.buttons === 0) {
        this._stopDrag();
        return;
      }
      const t = this.getBoundingClientRect();
      let i = this.vertical ? e.clientY - t.top : e.clientX - t.left;
      i = this._applySnap(i), i = this._clampPx(i), this._positionPx = i, this._internalUpdate = !0, this.position = this._cachedSize > 0 ? i / this._cachedSize * 100 : 50, this.positionInPixels = i, this._internalUpdate = !1, this._emitReposition(), this.requestUpdate();
    }, this._onPointerUp = (e) => {
      this.releasePointerCapture(e.pointerId), this._stopDrag();
    }, this._onKeyDown = (e) => {
      if (this.disabled) return;
      const t = e.shiftKey ? 10 : 1;
      let i = 0, o = !1, r = 0;
      this.vertical ? e.key === "ArrowUp" ? i = -t : e.key === "ArrowDown" ? i = t : e.key === "Home" ? (o = !0, r = 0) : e.key === "End" && (o = !0, r = this._cachedSize) : e.key === "ArrowLeft" ? i = -t : e.key === "ArrowRight" ? i = t : e.key === "Home" ? (o = !0, r = 0) : e.key === "End" && (o = !0, r = this._cachedSize), (i !== 0 || o) && (e.preventDefault(), this._moveTo(o ? r : this._positionPx + i));
    };
  }
  /* ── Lifecycle ──────────────────────────────────────────────── */
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver((e) => {
      for (const t of e) {
        const i = this.vertical ? t.contentRect.height : t.contentRect.width;
        this._handleContainerResize(i);
      }
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver.disconnect(), this._stopDrag();
  }
  firstUpdated() {
    const e = this._getSize();
    this._cachedSize = e, this.positionInPixels >= 0 ? this._positionPx = this.positionInPixels : this._positionPx = this.position / 100 * e, this._clampPosition(), this._cachedSize > 0 && this.requestUpdate();
  }
  updated(e) {
    this._dragging || this._internalUpdate || (e.has("positionInPixels") && this.positionInPixels >= 0 && this._positionPx >= 0 ? (this._positionPx = this.positionInPixels, this._clampPosition(), this._cachedSize > 0 && this.requestUpdate()) : e.has("position") && !e.has("positionInPixels") && this._positionPx >= 0 && (this._positionPx = this.position / 100 * this._cachedSize, this._clampPosition(), this._cachedSize > 0 && this.requestUpdate()));
  }
  /* ── Resize handling ────────────────────────────────────────── */
  _handleContainerResize(e) {
    if (!(e <= 0)) {
      if (this._positionPx < 0) {
        this._cachedSize = e;
        return;
      }
      if (this.primary !== "start") {
        if (this.primary === "end") {
          const t = this._cachedSize - this._positionPx;
          this._positionPx = e - t;
        } else if (this._cachedSize > 0) {
          const t = this._positionPx / this._cachedSize;
          this._positionPx = t * e;
        }
      }
      this._cachedSize = e, this._clampPosition(), this.requestUpdate();
    }
  }
  /* ── Position utilities ─────────────────────────────────────── */
  _getSize() {
    const e = this.getBoundingClientRect();
    return this.vertical ? e.height : e.width;
  }
  /** Actual pixel size of the divider element. */
  _getDividerSize() {
    const e = this.shadowRoot?.querySelector(".divider");
    return e ? this.vertical ? e.offsetHeight : e.offsetWidth : 0;
  }
  _clampPosition() {
    if (this._cachedSize <= 0) return;
    const e = this._parseSizeToken(
      getComputedStyle(this).getPropertyValue("--ui-split-panel-min").trim(),
      0
    ), t = this._parseSizeToken(
      getComputedStyle(this).getPropertyValue("--ui-split-panel-max").trim(),
      this._cachedSize
    ), i = this._cachedSize - this._getDividerSize();
    this._positionPx = Math.max(e, Math.min(t, this._positionPx)), this._positionPx = Math.max(0, Math.min(i, this._positionPx)), this._internalUpdate = !0, this.position = this._cachedSize > 0 ? this._positionPx / this._cachedSize * 100 : 50, this.positionInPixels = this._positionPx, this._internalUpdate = !1;
  }
  _parseSizeToken(e, t) {
    return e ? e === "0" ? 0 : e.endsWith("px") ? parseFloat(e) : e.endsWith("%") ? parseFloat(e) / 100 * this._cachedSize : t : t;
  }
  _applySnap(e) {
    const { snap: t, snapThreshold: i } = this;
    if (!t) return e;
    if (typeof t == "function")
      return t({ pos: e, size: this._cachedSize, snapThreshold: i });
    const o = ep(t, this._cachedSize);
    if (!o.length) return e;
    let r = e, a = 1 / 0;
    for (const n of o) {
      const p = Math.abs(e - n);
      p < a && (a = p, r = n);
    }
    return a <= i ? r : e;
  }
  _stopDrag() {
    this._dragging && (this._dragging = !1, this.removeEventListener("pointermove", this._onPointerMove), this.removeEventListener("pointerup", this._onPointerUp), this.removeEventListener("pointercancel", this._onPointerUp));
  }
  _moveTo(e) {
    e = this._clampPx(e), this._positionPx = e, this._internalUpdate = !0, this.position = this._cachedSize > 0 ? e / this._cachedSize * 100 : 50, this.positionInPixels = e, this._internalUpdate = !1, this._emitReposition(), this.requestUpdate();
  }
  _clampPx(e) {
    const t = this._parseSizeToken(
      getComputedStyle(this).getPropertyValue("--ui-split-panel-min").trim(),
      0
    ), i = this._parseSizeToken(
      getComputedStyle(this).getPropertyValue("--ui-split-panel-max").trim(),
      this._cachedSize
    ), o = this._cachedSize - this._getDividerSize();
    return Math.max(0, Math.min(o, Math.max(t, Math.min(i, e))));
  }
  /* ── Event ──────────────────────────────────────────────────── */
  _emitReposition() {
    this.dispatchEvent(
      new CustomEvent("ui-split-panel-reposition", {
        bubbles: !0,
        composed: !0,
        detail: { position: this.position, positionInPixels: this.positionInPixels }
      })
    );
  }
  /* ── Render ─────────────────────────────────────────────────── */
  render() {
    const e = this._positionPx >= 0 ? `${this._positionPx}px` : `${this.position}%`, t = this.vertical ? `height: ${e};` : `width: ${e};`;
    return l`
            <div class="start" part="panel start" style="${t}">
                <slot name="start"></slot>
            </div>

            <div
                class="divider"
                part="divider"
                role="separator"
                tabindex="${this.disabled ? -1 : 0}"
                aria-valuenow="${Math.round(this.position)}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-orientation="${this.vertical ? "vertical" : "horizontal"}"
                aria-disabled="${this.disabled ? "true" : v}"
                @pointerdown=${this._onDividerPointerDown}
                @keydown=${this._onKeyDown}
            >
                <slot name="divider"></slot>
            </div>

            <div class="end" part="panel end">
                <slot name="end"></slot>
            </div>
        `;
  }
};
Xe.styles = Ie`
        :host {
            display: flex;
            position: relative;
            overflow: hidden;
            flex-direction: row;
        }
        :host([vertical]) {
            flex-direction: column;
        }

        /* ── Panels ──────────────────────────────────────────────── */
        .start,
        .end {
            overflow: auto;
            position: relative;
        }
        .start {
            flex: 0 0 auto;
        }
        .end {
            flex: 1 1 0;
            min-width: 0;
            min-height: 0;
        }

        /* ── Divider ─────────────────────────────────────────────── */
        .divider {
            position: relative;
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ui-split-panel-divider-color, var(--ui-border-color, #e4e4e7));
            transition: background 150ms ease;
            z-index: 1;
            outline: none;
            user-select: none;
            -webkit-user-select: none;
        }
        :host(:not([vertical])) .divider {
            width: var(--ui-split-panel-divider-width, 4px);
            cursor: col-resize;
            touch-action: none;
        }
        :host([vertical]) .divider {
            height: var(--ui-split-panel-divider-width, 4px);
            cursor: row-resize;
            touch-action: none;
        }
        .divider:hover,
        .divider:focus-visible {
            background: var(
                --ui-split-panel-divider-hover-color,
                var(--ui-primary-color, #3b82f6)
            );
        }
        :host([disabled]) .divider {
            cursor: not-allowed;
            opacity: 0.5;
            pointer-events: none;
        }
        :host([disabled]) .divider:hover {
            background: var(--ui-split-panel-divider-color, var(--ui-border-color, #e4e4e7));
        }
        .divider:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 2px;
        }

        /* Extended hit area via ::before pseudo-element */
        .divider::before {
            content: '';
            position: absolute;
            z-index: -1;
        }
        :host(:not([vertical])) .divider::before {
            top: 0;
            bottom: 0;
            left: calc(
                (var(--ui-split-panel-divider-hit-area, 12px) -
                    var(--ui-split-panel-divider-width, 4px)) / -2
            );
            right: calc(
                (var(--ui-split-panel-divider-hit-area, 12px) -
                    var(--ui-split-panel-divider-width, 4px)) / -2
            );
        }
        :host([vertical]) .divider::before {
            left: 0;
            right: 0;
            top: calc(
                (var(--ui-split-panel-divider-hit-area, 12px) -
                    var(--ui-split-panel-divider-width, 4px)) / -2
            );
            bottom: calc(
                (var(--ui-split-panel-divider-hit-area, 12px) -
                    var(--ui-split-panel-divider-width, 4px)) / -2
            );
        }
    `;
Bt([
  s({ type: Number })
], Xe.prototype, "position", 2);
Bt([
  s({ type: Number, attribute: "position-in-pixels" })
], Xe.prototype, "positionInPixels", 2);
Bt([
  s({ type: Boolean, reflect: !0 })
], Xe.prototype, "vertical", 2);
Bt([
  s({ type: Boolean, reflect: !0 })
], Xe.prototype, "disabled", 2);
Bt([
  s({ reflect: !0 })
], Xe.prototype, "primary", 2);
Bt([
  s()
], Xe.prototype, "snap", 2);
Bt([
  s({ type: Number, attribute: "snap-threshold" })
], Xe.prototype, "snapThreshold", 2);
Xe = Bt([
  d("ui-split-panel")
], Xe);
const ip = ":host{display:inline}time{font:inherit;color:var(--ui-relative-time-color, inherit);font-size:var(--ui-relative-time-font-size, inherit)}";
var rp = Object.defineProperty, op = Object.getOwnPropertyDescriptor, ji = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? op(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && rp(t, i, r), r;
};
const Xr = [
  { unit: "year", seconds: 31536e3 },
  { unit: "month", seconds: 2592e3 },
  { unit: "day", seconds: 86400 },
  { unit: "hour", seconds: 3600 },
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 }
];
function sp(e) {
  for (const t of Xr)
    if (e >= t.seconds) return t;
  return Xr[Xr.length - 1];
}
let Pt = class extends c {
  constructor() {
    super(...arguments), this.date = /* @__PURE__ */ new Date(), this.format = "long", this.numeric = "auto", this.sync = !1, this.lang = "", this._timer = null;
  }
  updated(e) {
    (e.has("sync") || e.has("date") || e.has("format") || e.has("numeric")) && (this.sync ? this._scheduleSync() : this._clearTimer());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearTimer();
  }
  _clearTimer() {
    this._timer !== null && (clearTimeout(this._timer), this._timer = null);
  }
  _scheduleSync() {
    if (this._clearTimer(), !this.sync) return;
    const e = this._msUntilNextChange();
    this._timer = setTimeout(() => {
      this.requestUpdate(), this._scheduleSync();
    }, e);
  }
  /** Returns how many ms to wait before the displayed value will change. */
  _msUntilNextChange() {
    const e = this._parseDate();
    if (!e) return 6e4;
    const t = Math.abs((e.getTime() - Date.now()) / 1e3);
    return t < 60 ? 1e3 : t < 3600 ? 6e4 : 36e5;
  }
  _parseDate() {
    let e;
    return this.date instanceof Date ? e = this.date : typeof this.date == "number" ? e = new Date(this.date) : e = new Date(this.date), isNaN(e.getTime()) ? null : e;
  }
  _formatText(e) {
    const t = (e.getTime() - Date.now()) / 1e3, i = Math.abs(t), { unit: o, seconds: r } = sp(i), a = Math.round(t / r), n = this.lang || document.documentElement.lang || navigator.language || "en";
    try {
      return new Intl.RelativeTimeFormat(n, {
        numeric: this.numeric,
        style: this.format
      }).format(a, o);
    } catch {
      return "";
    }
  }
  render() {
    const e = this._parseDate(), t = e ? this._formatText(e) : "", i = e ? e.toLocaleString() : v;
    return l`
            <time
                datetime=${e ? e.toISOString() : v}
                title=${i}
                aria-label=${i}
            >${t}</time>
        `;
  }
};
Pt.styles = h(ip);
ji([
  s()
], Pt.prototype, "date", 2);
ji([
  s({ reflect: !0 })
], Pt.prototype, "format", 2);
ji([
  s({ reflect: !0 })
], Pt.prototype, "numeric", 2);
ji([
  s({ type: Boolean, reflect: !0 })
], Pt.prototype, "sync", 2);
ji([
  s({ attribute: "lang", reflect: !0 })
], Pt.prototype, "lang", 2);
Pt = ji([
  d("ui-relative-time")
], Pt);
const ap = ":host{display:inline}time{font:inherit;color:var(--ui-format-date-color, inherit);font-size:var(--ui-format-date-font-size, inherit)}";
var np = Object.defineProperty, lp = Object.getOwnPropertyDescriptor, W = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? lp(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && np(t, i, r), r;
};
function cp(e) {
  let t;
  return e instanceof Date ? t = e : t = new Date(e), isNaN(t.getTime()) ? null : t;
}
let B = class extends c {
  constructor() {
    super(...arguments), this.date = /* @__PURE__ */ new Date(), this.weekday = void 0, this.era = void 0, this.year = void 0, this.month = void 0, this.day = void 0, this.hour = void 0, this.minute = void 0, this.second = void 0, this.timeZoneName = void 0, this.timeZone = void 0, this.fractionalSecondDigits = void 0, this.dateStyle = void 0, this.timeStyle = void 0, this.hourFormat = "auto", this.lang = "";
  }
  _parseDate() {
    return cp(this.date);
  }
  _formatDate(e) {
    const t = {};
    this.timeZone && (t.timeZone = this.timeZone), this.timeZoneName && (t.timeZoneName = this.timeZoneName), this.hourFormat === "12" ? t.hour12 = !0 : this.hourFormat === "24" && (t.hour12 = !1), this.dateStyle || this.timeStyle ? (this.dateStyle && (t.dateStyle = this.dateStyle), this.timeStyle && (t.timeStyle = this.timeStyle)) : (this.weekday && (t.weekday = this.weekday), this.era && (t.era = this.era), this.year && (t.year = this.year), this.month && (t.month = this.month), this.day && (t.day = this.day), this.hour && (t.hour = this.hour), this.minute && (t.minute = this.minute), this.second && (t.second = this.second), this.fractionalSecondDigits && (t.fractionalSecondDigits = this.fractionalSecondDigits), this.weekday || this.era || this.year || this.month || this.day || this.hour || this.minute || this.second || this.fractionalSecondDigits || (t.year = "numeric", t.month = "numeric", t.day = "numeric"));
    const i = this.lang || document.documentElement.lang || navigator.language || "en";
    try {
      return new Intl.DateTimeFormat(i, t).format(e);
    } catch {
      return "";
    }
  }
  _localeString(e) {
    const t = this.lang || void 0, i = this.timeZone ? { timeZone: this.timeZone } : void 0;
    try {
      return e.toLocaleString(t, i);
    } catch {
      return e.toLocaleString();
    }
  }
  render() {
    const e = this._parseDate(), t = e ? this._formatDate(e) : "", i = e ? e.toISOString() : v, o = e ? this._localeString(e) : v;
    return l`
            <time
                datetime=${i}
                title=${o}
                aria-label=${o}
            >${t}</time>
        `;
  }
};
B.styles = h(ap);
W([
  s()
], B.prototype, "date", 2);
W([
  s()
], B.prototype, "weekday", 2);
W([
  s()
], B.prototype, "era", 2);
W([
  s()
], B.prototype, "year", 2);
W([
  s()
], B.prototype, "month", 2);
W([
  s()
], B.prototype, "day", 2);
W([
  s()
], B.prototype, "hour", 2);
W([
  s()
], B.prototype, "minute", 2);
W([
  s()
], B.prototype, "second", 2);
W([
  s({ attribute: "time-zone-name" })
], B.prototype, "timeZoneName", 2);
W([
  s({ attribute: "time-zone" })
], B.prototype, "timeZone", 2);
W([
  s({ attribute: "fractional-second-digits", type: Number })
], B.prototype, "fractionalSecondDigits", 2);
W([
  s({ attribute: "date-style" })
], B.prototype, "dateStyle", 2);
W([
  s({ attribute: "time-style" })
], B.prototype, "timeStyle", 2);
W([
  s({ attribute: "hour-format", reflect: !0 })
], B.prototype, "hourFormat", 2);
W([
  s({ attribute: "lang", reflect: !0 })
], B.prototype, "lang", 2);
B = W([
  d("ui-format-date")
], B);
const dp = ":host{display:inline}span{font:inherit;color:var(--ui-format-number-color, inherit);font-size:var(--ui-format-number-font-size, inherit);font-weight:var(--ui-format-number-font-weight, inherit);font-family:var(--ui-format-number-font-family, inherit)}span[data-sign=negative]{color:var(--ui-format-number-negative-color, var(--ui-format-number-color, inherit))}span[data-sign=positive]{color:var(--ui-format-number-positive-color, var(--ui-format-number-color, inherit))}";
var hp = Object.defineProperty, pp = Object.getOwnPropertyDescriptor, G = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pp(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && hp(t, i, r), r;
};
let M = class extends c {
  constructor() {
    super(...arguments), this.value = 0, this.type = "decimal", this.noGrouping = !1, this.currency = "USD", this.currencyDisplay = "symbol", this.notation = "standard", this.compactDisplay = "short", this.signDisplay = "auto", this.unit = "", this.unitDisplay = "short", this.minimumIntegerDigits = void 0, this.minimumFractionDigits = void 0, this.maximumFractionDigits = void 0, this.minimumSignificantDigits = void 0, this.maximumSignificantDigits = void 0, this.lang = "";
  }
  /** The most recently formatted string value. Useful for aria-label or title attributes. */
  get formattedValue() {
    return this._format();
  }
  _sign() {
    if (!(isNaN(this.value) || !isFinite(this.value)))
      return this.value < 0 ? "negative" : this.value > 0 ? "positive" : "zero";
  }
  _format() {
    const e = {
      style: this.type
    };
    this.noGrouping && (e.useGrouping = !1), e.notation = this.notation, this.notation === "compact" && (e.compactDisplay = this.compactDisplay), this.signDisplay !== "auto" && (e.signDisplay = this.signDisplay), this.type === "currency" && (e.currency = this.currency, e.currencyDisplay = this.currencyDisplay), this.type === "unit" && this.unit && (e.unit = this.unit, e.unitDisplay = this.unitDisplay), this.minimumSignificantDigits !== void 0 || this.maximumSignificantDigits !== void 0 ? (this.minimumSignificantDigits !== void 0 && (e.minimumSignificantDigits = this.minimumSignificantDigits), this.maximumSignificantDigits !== void 0 && (e.maximumSignificantDigits = this.maximumSignificantDigits)) : (this.minimumIntegerDigits !== void 0 && (e.minimumIntegerDigits = this.minimumIntegerDigits), this.minimumFractionDigits !== void 0 && (e.minimumFractionDigits = this.minimumFractionDigits), this.maximumFractionDigits !== void 0 && (e.maximumFractionDigits = this.maximumFractionDigits));
    const t = this.lang || document.documentElement.lang || navigator.language || "en";
    try {
      return new Intl.NumberFormat(t, e).format(this.value);
    } catch {
      return String(this.value);
    }
  }
  render() {
    return l`<span data-sign=${re(this._sign())}>${this._format()}</span>`;
  }
};
M.styles = h(dp);
G([
  s({ type: Number })
], M.prototype, "value", 2);
G([
  s({ type: String })
], M.prototype, "type", 2);
G([
  s({ type: Boolean, attribute: "no-grouping" })
], M.prototype, "noGrouping", 2);
G([
  s({ type: String })
], M.prototype, "currency", 2);
G([
  s({ type: String, attribute: "currency-display" })
], M.prototype, "currencyDisplay", 2);
G([
  s({ type: String })
], M.prototype, "notation", 2);
G([
  s({ type: String, attribute: "compact-display" })
], M.prototype, "compactDisplay", 2);
G([
  s({ type: String, attribute: "sign-display" })
], M.prototype, "signDisplay", 2);
G([
  s({ type: String })
], M.prototype, "unit", 2);
G([
  s({ type: String, attribute: "unit-display" })
], M.prototype, "unitDisplay", 2);
G([
  s({ type: Number, attribute: "minimum-integer-digits" })
], M.prototype, "minimumIntegerDigits", 2);
G([
  s({ type: Number, attribute: "minimum-fraction-digits" })
], M.prototype, "minimumFractionDigits", 2);
G([
  s({ type: Number, attribute: "maximum-fraction-digits" })
], M.prototype, "maximumFractionDigits", 2);
G([
  s({ type: Number, attribute: "minimum-significant-digits" })
], M.prototype, "minimumSignificantDigits", 2);
G([
  s({ type: Number, attribute: "maximum-significant-digits" })
], M.prototype, "maximumSignificantDigits", 2);
G([
  s({ attribute: "lang", reflect: !0 })
], M.prototype, "lang", 2);
M = G([
  d("ui-format-number")
], M);
const up = ":host{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;clip-path:inset(50%)!important;white-space:nowrap!important;border:0!important}:host(:not([not-focusable])):focus-within{position:static!important;width:auto!important;height:auto!important;padding:revert!important;margin:revert!important;overflow:visible!important;clip:auto!important;clip-path:unset!important;white-space:normal!important}";
var fp = Object.defineProperty, vp = Object.getOwnPropertyDescriptor, ts = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? vp(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && fp(t, i, r), r;
};
let Br = class extends c {
  constructor() {
    super(...arguments), this.notFocusable = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
Br.styles = h(up);
ts([
  s({ type: Boolean, reflect: !0, attribute: "not-focusable" })
], Br.prototype, "notFocusable", 2);
Br = ts([
  d("ui-visually-hidden")
], Br);
export {
  Gi as UiAccordion,
  uo as UiAccordionActions,
  po as UiAccordionDetails,
  ho as UiAccordionSummary,
  pi as UiAlert,
  mi as UiAppBar,
  we as UiAutocomplete,
  qe as UiAvatar,
  bi as UiBackdrop,
  wt as UiBadge,
  yi as UiBottomNavigation,
  kt as UiBottomNavigationAction,
  w as UiBox,
  He as UiBreadcrumbs,
  Ut as UiButton,
  Zr as UiButtonGroup,
  Ni as UiCard,
  eo as UiCardActionArea,
  Qr as UiCardActions,
  Jr as UiCardContent,
  Vi as UiCardHeader,
  di as UiCardMedia,
  Vt as UiCarousel,
  Si as UiCarouselContent,
  xo as UiCarouselItem,
  Qi as UiCarouselNext,
  Ji as UiCarouselPrevious,
  Ve as UiCheckbox,
  rt as UiChip,
  ke as UiCircularProgress,
  Ci as UiCollapsible,
  Ir as UiCollapsibleContent,
  er as UiCollapsibleTrigger,
  yo as UiCommand,
  Sr as UiCommandDialog,
  go as UiCommandEmpty,
  $r as UiCommandGroup,
  Zi as UiCommandInput,
  Nt as UiCommandItem,
  mo as UiCommandList,
  bo as UiCommandSeparator,
  vo as UiCommandShortcut,
  _i as UiContainer,
  Le as UiCopyButton,
  A as UiDateField,
  J as UiDatePicker,
  We as UiDatePickerCalendar,
  Ce as UiDesktopTimePicker,
  gi as UiDialog,
  yr as UiDialogActions,
  lo as UiDialogContent,
  co as UiDialogContentText,
  no as UiDialogTitle,
  wi as UiDigitalClock,
  Rt as UiDivider,
  ot as UiDrawer,
  So as UiEmpty,
  $o as UiEmptyContent,
  wo as UiEmptyDescription,
  ko as UiEmptyHeader,
  Cr as UiEmptyMedia,
  _o as UiEmptyTitle,
  jt as UiFab,
  B as UiFormatDate,
  M as UiFormatNumber,
  O as UiGrid,
  tr as UiHoverCard,
  Ii as UiHoverCardContent,
  Co as UiHoverCardTrigger,
  sr as UiImageComparer,
  Ct as UiImageList,
  lt as UiImageListItem,
  kr as UiImageListItemBar,
  X as UiInput,
  ht as UiInputOtp,
  Io as UiInputOtpGroup,
  Po as UiInputOtpSeparator,
  Ft as UiInputOtpSlot,
  ir as UiItem,
  Oo as UiItemActions,
  Eo as UiItemContent,
  Do as UiItemDescription,
  Ao as UiItemFooter,
  Mo as UiItemGroup,
  To as UiItemHeader,
  Pr as UiItemMedia,
  Bo as UiItemSeparator,
  zo as UiItemTitle,
  Pi as UiKbd,
  Lo as UiKbdGroup,
  Ae as UiLinearProgress,
  $e as UiLink,
  qi as UiList,
  to as UiListItem,
  ro as UiListItemAvatar,
  Hi as UiListItemButton,
  io as UiListItemIcon,
  fi as UiListItemText,
  oo as UiListSubheader,
  $t as UiMenu,
  fo as UiMenuDivider,
  xr as UiMenuGroup,
  Ke as UiMenuItem,
  Ar as UiMenubar,
  Ht as UiMenubarCheckboxItem,
  Or as UiMenubarContent,
  zr as UiMenubarGroup,
  qt as UiMenubarItem,
  Tr as UiMenubarMenu,
  Dr as UiMenubarRadioGroup,
  Yt as UiMenubarRadioItem,
  jo as UiMenubarSeparator,
  Uo as UiMenubarShortcut,
  Ro as UiMenubarSub,
  Er as UiMenubarSubContent,
  Kt as UiMenubarSubTrigger,
  zi as UiMenubarTrigger,
  at as UiMobileStepper,
  me as UiMobileTimePicker,
  ki as UiMultiSectionDigitalClock,
  rr as UiNavigationMenu,
  Xt as UiNavigationMenuContent,
  Gt as UiNavigationMenuItem,
  It as UiNavigationMenuLink,
  Di as UiNavigationMenuList,
  Ei as UiNavigationMenuTrigger,
  U as UiPagination,
  hi as UiPaper,
  Fe as UiRadio,
  Ee as UiRadioGroup,
  ne as UiRating,
  Pt as UiRelativeTime,
  or as UiResizableGroup,
  Zt as UiResizableHandle,
  Ge as UiResizablePanel,
  C as UiRichTreeView,
  se as UiScrollArea,
  Wt as UiScrollBar,
  E as UiSelect,
  dt as UiSimpleTreeView,
  it as UiSkeleton,
  Z as UiSlider,
  Oe as UiSnackbar,
  Se as UiSpeedDial,
  st as UiSpeedDialAction,
  Xe as UiSplitPanel,
  ae as UiStack,
  $i as UiStaticTimePicker,
  oe as UiStep,
  Xi as UiStepConnector,
  _r as UiStepContent,
  xi as UiStepLabel,
  St as UiStepper,
  ve as UiSwitch,
  nt as UiTab,
  le as UiTabList,
  wr as UiTabPanel,
  gr as UiTable,
  mr as UiTableBody,
  vi as UiTableCell,
  Yi as UiTableContainer,
  ao as UiTableFooter,
  so as UiTableHead,
  ge as UiTablePagination,
  Ki as UiTableRow,
  Wi as UiTableSortLabel,
  Be as UiTabs,
  be as UiTextField,
  I as UiTextarea,
  ct as UiTimeClock,
  j as UiTimeField,
  Me as UiTimePicker,
  Oi as UiToaster,
  pt as UiToggle,
  ui as UiToggleButton,
  Fi as UiToggleButtonGroup,
  Te as UiTooltip,
  tt as UiTransferList,
  ye as UiTreeItem,
  Ye as UiTypography,
  Br as UiVisuallyHidden,
  cp as parseDate,
  ep as parseSnapPoints,
  kp as toast
};
