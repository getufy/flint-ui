import { unsafeCSS as p, LitElement as c, html as l, nothing as g, svg as ar, css as ao } from "lit";
import { property as s, customElement as d, state as m, queryAssignedElements as uo, query as wi } from "lit/decorators.js";
import { classMap as u } from "lit/directives/class-map.js";
import { repeat as At } from "lit/directives/repeat.js";
import { ifDefined as pe } from "lit/directives/if-defined.js";
import { styleMap as ei } from "lit/directives/style-map.js";
import { literal as C, html as no, unsafeStatic as fo } from "lit/static-html.js";
const bo = ":host{display:inline-block}:host([full-width]){display:block}button{font-family:var(--ui-font-family);font-weight:600;border:none;border-radius:var(--ui-button-border-radius, var(--ui-border-radius-md));cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;transition:all .2s ease;box-shadow:var(--ui-shadow-sm)}.primary{background-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.primary:hover{background-color:var(--ui-primary-color-hover)}.primary:active{background-color:var(--ui-primary-color-active)}.secondary{background-color:var(--ui-surface-1);color:var(--ui-text-color);border:1px solid var(--ui-input-border-color)}.secondary:hover{background-color:var(--ui-hover-color)}.secondary:active{background-color:var(--ui-active-color)}.destructive{background-color:var(--ui-destructive-color);color:var(--ui-text-color-on-primary)}.destructive:hover{background-color:var(--ui-destructive-color-hover)}.destructive:active{background-color:var(--ui-destructive-color-active)}.small{padding:6px 12px;font-size:14px}.medium{padding:10px 16px;font-size:14px}.large{padding:14px 20px;font-size:16px}button:disabled{opacity:.6;cursor:not-allowed}";
var vo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, ki = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? mo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && vo(t, i, r), r;
};
let pt = class extends c {
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
pt.styles = p(bo);
ki([
  s({ type: String })
], pt.prototype, "variant", 2);
ki([
  s({ type: String })
], pt.prototype, "size", 2);
ki([
  s({ type: Boolean })
], pt.prototype, "disabled", 2);
ki([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], pt.prototype, "fullWidth", 2);
pt = ki([
  d("ui-button")
], pt);
const go = ":host{display:inline-flex;border-radius:var(--ui-border-radius-md, 6px)}::slotted(ui-button){position:relative}::slotted(ui-button:hover),::slotted(ui-button:focus-within),::slotted(ui-button:active){z-index:1}::slotted(ui-button:not(:first-child)){margin-left:-1px}::slotted(ui-button){--ui-button-border-radius: 0}::slotted(ui-button:first-child){--ui-button-border-radius: var(--ui-border-radius-md, 6px) 0 0 var(--ui-border-radius-md, 6px)}::slotted(ui-button:last-child){--ui-button-border-radius: 0 var(--ui-border-radius-md, 6px) var(--ui-border-radius-md, 6px) 0}::slotted(ui-button:first-child:last-child){--ui-button-border-radius: var(--ui-border-radius-md, 6px)}";
var yo = Object.getOwnPropertyDescriptor, xo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let lr = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
lr.styles = p(go);
lr = xo([
  d("ui-button-group")
], lr);
const _o = ":host{display:block;font-family:Inter,sans-serif}.card{background:var(--ui-card-background);border-radius:var(--ui-card-border-radius);box-shadow:var(--ui-card-shadow);border:1px solid var(--ui-card-border-color);overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .3s ease,border-color .3s ease;padding:var(--ui-card-padding, 0)}.card.interactive:hover{box-shadow:var(--ui-card-shadow-hover);cursor:pointer}.card.variant-outlined{box-shadow:none;border:1px solid var(--ui-card-border-color)}.card.variant-flat{box-shadow:none;border:none;background:var(--ui-card-background-flat)}";
var wo = Object.defineProperty, ko = Object.getOwnPropertyDescriptor, Qr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ko(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && wo(t, i, r), r;
};
let ni = class extends c {
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
ni.styles = p(_o);
Qr([
  s({ type: String, reflect: !0 })
], ni.prototype, "variant", 2);
Qr([
  s({ type: Boolean, reflect: !0 })
], ni.prototype, "interactive", 2);
ni = Qr([
  d("ui-card")
], ni);
const $o = ":host{display:block;padding:var(--ui-card-header-padding, 16px 24px)}.header{display:flex;align-items:center;gap:16px}.content{flex:1 1 auto}.title{margin:0;font-size:var(--ui-card-title-size, 1.25rem);font-weight:700;color:var(--ui-text-color);line-height:1.4}.subtitle{margin:4px 0 0;font-size:var(--ui-card-subtitle-size, .875rem);color:var(--ui-text-color-muted);font-weight:500}";
var So = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, eo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Co(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && So(t, i, r), r;
};
let li = class extends c {
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
li.styles = p($o);
eo([
  s({ type: String })
], li.prototype, "title", 2);
eo([
  s({ type: String })
], li.prototype, "subtitle", 2);
li = eo([
  d("ui-card-header")
], li);
const Io = ":host{display:block;padding:var(--ui-card-content-padding, 16px 24px);font-size:var(--ui-card-content-size, 1rem);color:var(--ui-text-color-muted);line-height:1.5}";
var Eo = Object.getOwnPropertyDescriptor, Po = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Eo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let cr = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
cr.styles = p(Io);
cr = Po([
  d("ui-card-content")
], cr);
const Oo = ":host{display:block;width:100%;overflow:hidden}.media{width:100%;height:var(--ui-card-media-height, 200px);background-size:cover;background-position:center;background-repeat:no-repeat}img{width:100%;height:100%;object-fit:cover;display:block}";
var Do = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, Xi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Do(t, i, r), r;
};
let Bt = class extends c {
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
Bt.styles = p(Oo);
Xi([
  s({ type: String })
], Bt.prototype, "image", 2);
Xi([
  s({ type: String })
], Bt.prototype, "alt", 2);
Xi([
  s({ type: String })
], Bt.prototype, "height", 2);
Bt = Xi([
  d("ui-card-media")
], Bt);
const To = ":host{display:flex;padding:var(--ui-card-actions-padding, 8px 16px);align-items:center;gap:8px}";
var Ao = Object.getOwnPropertyDescriptor, Bo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ao(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let dr = class extends c {
  render() {
    return l`
      <slot></slot>
    `;
  }
};
dr.styles = p(To);
dr = Bo([
  d("ui-card-actions")
], dr);
const Mo = ":host{display:block;width:100%;cursor:pointer;position:relative}.action-area{transition:background-color .2s}.action-area:hover{background-color:var(--ui-card-action-area-hover, var(--ui-hover-color))}.action-area:active{background-color:var(--ui-card-action-area-active, var(--ui-active-color))}.action-area:focus-visible{outline:2px solid var(--ui-card-action-area-focus-ring, var(--ui-primary-color));outline-offset:-2px}";
var Lo = Object.getOwnPropertyDescriptor, jo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Lo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = n(r) || r);
  return r;
};
let pr = class extends c {
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
pr.styles = p(Mo);
pr = jo([
  d("ui-card-action-area")
], pr);
const Uo = ':host{display:block;box-sizing:border-box;background-color:var(--ui-surface-1);color:var(--ui-text-color);border-radius:var(--ui-border-radius-md);padding:var(--ui-paper-padding, 0);transition:box-shadow .25s cubic-bezier(.4,0,.2,1),border-color .25s cubic-bezier(.4,0,.2,1),background-color .25s cubic-bezier(.4,0,.2,1);border:1px solid transparent}:host([square]){border-radius:0}:host([variant="outlined"]){border:1px solid var(--ui-border-color);box-shadow:none!important}:host([variant="flat"]){border:none;box-shadow:none}:host([variant="elevated"][elevation="0"]){box-shadow:none}:host([variant="elevated"][elevation="1"]){box-shadow:0 2px 4px #0000000d}:host([variant="elevated"][elevation="2"]){box-shadow:0 3px 6px #00000012}:host([variant="elevated"][elevation="3"]){box-shadow:0 4px 12px #00000014}:host([variant="elevated"][elevation="4"]){box-shadow:0 8px 16px #00000017}:host([variant="elevated"][elevation="6"]){box-shadow:0 12px 24px #0000001a}:host([variant="elevated"][elevation="8"]){box-shadow:0 16px 32px #0000001c}:host([variant="elevated"][elevation="12"]){box-shadow:0 20px 40px #0000001f}:host([variant="elevated"][elevation="16"]){box-shadow:0 24px 48px #00000021}:host([variant="elevated"][elevation="24"]){box-shadow:0 32px 64px #00000026}@media(prefers-color-scheme:dark){:host{background-color:var(--ui-surface-background-flat)}:host([variant="elevated"][elevation="0"]){box-shadow:none}:host([variant="elevated"][elevation="1"]){box-shadow:0 2px 4px #0000004d}:host([variant="elevated"][elevation="2"]){box-shadow:0 3px 6px #00000059}:host([variant="elevated"][elevation="3"]){box-shadow:0 4px 12px #0006}:host([variant="elevated"][elevation="4"]){box-shadow:0 8px 16px #00000073}:host([variant="elevated"][elevation="6"]){box-shadow:0 12px 24px #00000080}:host([variant="elevated"][elevation="8"]){box-shadow:0 16px 32px #0000008c}:host([variant="elevated"][elevation="12"]){box-shadow:0 20px 40px #0009}:host([variant="elevated"][elevation="16"]){box-shadow:0 24px 48px #000000a6}:host([variant="elevated"][elevation="24"]){box-shadow:0 32px 64px #000000b3}}';
var Ro = Object.defineProperty, Vo = Object.getOwnPropertyDescriptor, Ji = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Vo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ro(t, i, r), r;
};
let Mt = class extends c {
  constructor() {
    super(...arguments), this.elevation = 1, this.square = !1, this.variant = "elevated";
  }
  render() {
    return l`<slot></slot>`;
  }
};
Mt.styles = p(Uo);
Ji([
  s({ type: Number, reflect: !0 })
], Mt.prototype, "elevation", 2);
Ji([
  s({ type: Boolean, reflect: !0 })
], Mt.prototype, "square", 2);
Ji([
  s({ type: String, reflect: !0 })
], Mt.prototype, "variant", 2);
Mt = Ji([
  d("ui-paper")
], Mt);
const No = ':host{display:block;font-family:var(--ui-font-family)}.input-wrapper{display:flex;flex-direction:column;gap:6px}label{font-size:14px;font-weight:500;color:var(--ui-label-color)}input{font-family:inherit;width:100%;box-sizing:border-box;padding:10px 14px;font-size:14px;border-radius:var(--ui-input-border-radius);border:1px solid var(--ui-input-border-color);background-color:var(--ui-input-bg);color:var(--ui-text-color);transition:border-color .2s,box-shadow .2s;outline:none}:host([size="sm"]) input{padding:6px 10px;font-size:13px}:host([size="lg"]) input{padding:12px 16px;font-size:16px}input::placeholder{color:var(--ui-input-placeholder-color)}input:hover:not(:disabled):not(.error-input){border-color:var(--ui-input-border-hover-color)}input:focus-visible{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}input[aria-invalid=true]{border-color:var(--ui-error-color)}input[aria-invalid=true]:focus-visible{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}input:disabled{background-color:var(--ui-input-disabled-bg);color:var(--ui-input-disabled-color);cursor:not-allowed;opacity:1}input[readonly]{background-color:var(--ui-input-readonly-bg);cursor:default}.help-text{font-size:12px;color:var(--ui-help-text-color);margin:0}.error-text{color:var(--ui-error-color)}';
var Fo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, Z = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Fo(t, i, r), r;
};
let Ho = 0, F = class extends c {
  constructor() {
    super(...arguments), this._inputId = `ui-input-${++Ho}`, this.label = "", this.value = "", this.type = "text", this.placeholder = "", this.helpText = "", this.error = !1, this.errorMessage = "", this.disabled = !1, this.required = !1, this.readonly = !1, this.name = "", this.autocomplete = "", this.size = "default";
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
          class=${u({ "error-input": e })}
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
F.styles = p(No);
Z([
  s({ type: String })
], F.prototype, "label", 2);
Z([
  s({ type: String })
], F.prototype, "value", 2);
Z([
  s({ type: String })
], F.prototype, "type", 2);
Z([
  s({ type: String })
], F.prototype, "placeholder", 2);
Z([
  s({ type: String, attribute: "help-text" })
], F.prototype, "helpText", 2);
Z([
  s({ type: Boolean })
], F.prototype, "error", 2);
Z([
  s({ type: String, attribute: "error-message" })
], F.prototype, "errorMessage", 2);
Z([
  s({ type: Boolean, reflect: !0 })
], F.prototype, "disabled", 2);
Z([
  s({ type: Boolean, reflect: !0 })
], F.prototype, "required", 2);
Z([
  s({ type: Boolean, reflect: !0 })
], F.prototype, "readonly", 2);
Z([
  s({ type: String })
], F.prototype, "name", 2);
Z([
  s({ type: String })
], F.prototype, "autocomplete", 2);
Z([
  s({ type: String, reflect: !0 })
], F.prototype, "size", 2);
F = Z([
  d("ui-input")
], F);
const Ko = ':host{display:block;--_h: 40px;--_px: 12px;--_font: .875rem;--ui-select-bg: var(--ui-input-bg);--ui-select-border: var(--ui-input-border-color);--ui-select-radius: var(--ui-input-border-radius);--ui-select-focus-color: var(--ui-primary-color);--ui-select-error-color: var(--ui-error-color);font-family:var(--ui-font-family)}:host([size="sm"]){--_h: 32px;--_px: 8px;--_font: .8125rem}:host([size="md"]){--_h: 40px;--_px: 12px;--_font: .875rem}:host([size="lg"]){--_h: 48px;--_px: 16px;--_font: .9375rem}.wrapper{display:flex;flex-direction:column;gap:6px;position:relative}label{font-size:.875rem;font-weight:500;color:var(--ui-label-color);margin-left:2px}.select-trigger{display:flex;align-items:center;min-height:var(--_h);padding:0 var(--_px);background-color:var(--ui-select-bg);border:1.5px solid var(--ui-select-border);border-radius:var(--ui-select-radius);cursor:pointer;transition:border-color .2s,box-shadow .2s;position:relative;gap:10px;-webkit-user-select:none;user-select:none;outline:none}.select-trigger:hover:not(.disabled):not(.readonly){border-color:var(--ui-input-border-hover-color)}.select-trigger.focused{border-color:var(--ui-select-focus-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([error]) .select-trigger{border-color:var(--ui-select-error-color)}:host([error]) .select-trigger.focused{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}.select-trigger.disabled{opacity:.6;cursor:not-allowed;background-color:var(--ui-input-disabled-bg)}.select-trigger.readonly{cursor:default;background-color:var(--ui-input-readonly-bg)}.value-container{flex:1;display:flex;flex-wrap:wrap;gap:6px;padding:6px 0;min-height:24px;align-items:center;overflow:hidden}.placeholder{color:var(--ui-input-placeholder-color);font-size:var(--_font)}.single-value{color:var(--ui-text-color);font-size:var(--_font);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chip{background-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary);padding:2px 8px 2px 10px;border-radius:16px;font-size:.75rem;font-weight:600;display:flex;align-items:center;gap:4px;animation:chip-in .2s ease-out}@keyframes chip-in{0%{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}.chip-remove{display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.8;transition:opacity .2s;background:none;border:none;padding:0;color:inherit;line-height:0}.chip-remove:hover{opacity:1}.arrow{display:flex;align-items:center;justify-content:center;transition:transform .3s ease;color:var(--ui-text-color-muted);flex-shrink:0}.select-trigger.open .arrow{transform:rotate(180deg);color:var(--ui-select-focus-color)}.dropdown{position:absolute;left:0;right:0;background-color:var(--ui-select-bg);border-radius:var(--ui-select-radius);box-shadow:var(--ui-shadow-lg);border:1px solid var(--ui-border-color);z-index:1000;max-height:260px;overflow-y:auto;opacity:0;pointer-events:none;transition:opacity .15s,transform .15s}.dropdown.below{top:calc(100% + 6px);transform:translateY(-8px)}.dropdown.above{bottom:calc(100% + 6px);transform:translateY(8px)}.dropdown.open{opacity:1;transform:translateY(0);pointer-events:auto}.option{padding:10px 14px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;color:var(--ui-text-color);transition:background-color .15s;font-size:var(--_font)}.option.highlighted{background-color:var(--ui-hover-color)}.option.selected{background-color:var(--ui-primary-color-light);color:var(--ui-primary-color);font-weight:600}.option.option-disabled{opacity:.4;cursor:not-allowed;pointer-events:none}.check-icon{color:var(--ui-primary-color);opacity:0;transition:opacity .15s;flex-shrink:0}.option.selected .check-icon{opacity:1}.no-options{padding:12px 16px;color:var(--ui-text-color-muted);font-size:.875rem;cursor:default}.error-message{font-size:.75rem;color:var(--ui-select-error-color);margin-left:2px}.dropdown::-webkit-scrollbar{width:6px}.dropdown::-webkit-scrollbar-track{background:transparent}.dropdown::-webkit-scrollbar-thumb{background:var(--ui-border-color);border-radius:3px}';
var Yo = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, M = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Go(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Yo(t, i, r), r;
};
let Wo = 0, D = class extends c {
  constructor() {
    super(), this.label = "", this.options = [], this.value = [], this.multiple = !1, this.placeholder = "Select an option", this.disabled = !1, this.readonly = !1, this.required = !1, this.error = !1, this.errorMessage = "", this.name = "", this.size = "md", this.defaultValue = "", this._isOpen = !1, this._highlightedIndex = -1, this._isFocused = !1, this._opensUp = !1, this._uid = `ui-select-${++Wo}`, this._firstUpdate = !0, this._handleOutsideClick = (e) => {
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
        ${this.label ? l`<label id=${t}>${this.label}</label>` : g}

        <div
          class=${u({
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
          aria-labelledby=${this.label ? t : g}
          aria-activedescendant=${o || g}
          aria-disabled=${this.disabled ? "true" : g}
          aria-required=${this.required ? "true" : g}
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
            ` : g}

            ${this.multiple ? At(e, (r) => r.value, (r) => l`
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
                ` : g}
          </div>

          <div class="arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div
          id=${i}
          class=${u({
      dropdown: !0,
      open: this._isOpen,
      above: this._opensUp,
      below: !this._opensUp
    })}
          role="listbox"
          aria-multiselectable=${this.multiple ? "true" : "false"}
        >
          ${this.options.length === 0 ? l`<div class="no-options">No options available</div>` : At(this.options, (r) => r.value, (r, a) => {
      const n = this.value.includes(r.value);
      return l`
                  <div
                    id=${`${this._uid}-opt-${a}`}
                    class=${u({
        option: !0,
        selected: n,
        highlighted: a === this._highlightedIndex,
        "option-disabled": !!r.disabled
      })}
                    @click=${(h) => this._handleOptionClick(r, h)}
                    @mouseenter=${() => {
        r.disabled || (this._highlightedIndex = a);
      }}
                    role="option"
                    aria-selected=${n ? "true" : "false"}
                    aria-disabled=${r.disabled ? "true" : g}
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
        ` : g}
      </div>
    `;
  }
};
D.formAssociated = !0;
D.styles = p(Ko);
M([
  s({ type: String })
], D.prototype, "label", 2);
M([
  s({ type: Array })
], D.prototype, "options", 2);
M([
  s({ type: Array })
], D.prototype, "value", 2);
M([
  s({ type: Boolean })
], D.prototype, "multiple", 2);
M([
  s({ type: String })
], D.prototype, "placeholder", 2);
M([
  s({ type: Boolean, reflect: !0 })
], D.prototype, "disabled", 2);
M([
  s({ type: Boolean, reflect: !0 })
], D.prototype, "readonly", 2);
M([
  s({ type: Boolean, reflect: !0 })
], D.prototype, "required", 2);
M([
  s({ type: Boolean, reflect: !0 })
], D.prototype, "error", 2);
M([
  s({ type: String, attribute: "error-message" })
], D.prototype, "errorMessage", 2);
M([
  s({ type: String })
], D.prototype, "name", 2);
M([
  s({ type: String, reflect: !0 })
], D.prototype, "size", 2);
M([
  s({ type: String, attribute: "default-value" })
], D.prototype, "defaultValue", 2);
M([
  m()
], D.prototype, "_isOpen", 2);
M([
  m()
], D.prototype, "_highlightedIndex", 2);
M([
  m()
], D.prototype, "_isFocused", 2);
M([
  m()
], D.prototype, "_opensUp", 2);
D = M([
  d("ui-select")
], D);
const Xo = ":host{--ui-fab-size: 56px;--ui-fab-background: var(--ui-primary-color);--ui-fab-color: var(--ui-text-color-on-primary);--ui-fab-shadow: var(--ui-shadow-lg);--ui-fab-radius: 50%;display:inline-block;position:fixed;z-index:100}.fab{display:flex;align-items:center;justify-content:center;width:var(--ui-fab-size);height:var(--ui-fab-size);border-radius:var(--ui-fab-radius);background-color:var(--ui-fab-background);color:var(--ui-fab-color);box-shadow:var(--ui-fab-shadow);border:none;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);padding:0;overflow:hidden;outline:none}.fab:hover:not(:disabled){box-shadow:var(--ui-shadow-xl);filter:brightness(1.1);transform:translateY(-2px)}.fab:active:not(:disabled){transform:translateY(0);filter:brightness(.9)}.fab:focus-visible{outline:3px solid var(--ui-fab-background);outline-offset:3px}.fab:disabled{opacity:.4;cursor:not-allowed}.fab.extended{width:auto;min-width:80px;padding:0 20px;border-radius:28px;height:56px}.fab.extended .icon-slot{margin-right:12px}.icon-slot{display:flex;align-items:center;justify-content:center;font-size:24px}.label-slot{font-family:var(--ui-font-family);font-weight:500;font-size:.875rem;letter-spacing:.1px;text-transform:uppercase}";
var Jo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, $i = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Zo(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Jo(t, i, r), r;
};
let ht = class extends c {
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
        class="${u(e)}"
        ?disabled="${this.disabled}"
        aria-label="${pe(this.extended ? void 0 : this.label)}"
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
ht.styles = p(Xo);
$i([
  s({ type: Boolean, reflect: !0 })
], ht.prototype, "extended", 2);
$i([
  s({ type: Boolean, reflect: !0 })
], ht.prototype, "disabled", 2);
$i([
  s({ type: String })
], ht.prototype, "label", 2);
$i([
  s({ type: String })
], ht.prototype, "position", 2);
ht = $i([
  d("ui-fab")
], ht);
const Qo = ":host{display:inline-block;position:relative;font-family:var(--ui-font-family);width:100%}.input-wrapper{position:relative}input{width:100%;padding:8px 12px;border:1px solid var(--ui-input-border-color);border-radius:var(--ui-input-border-radius);font-size:14px;box-sizing:border-box;outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit;color:var(--ui-text-color);background:var(--ui-input-bg)}input:focus{border-color:var(--ui-primary-color);box-shadow:0 0 0 1px var(--ui-primary-color)}input:disabled{background-color:var(--ui-input-disabled-bg);color:var(--ui-text-color-subtle);cursor:not-allowed}.dropdown{position:absolute;top:100%;left:0;right:0;max-height:250px;overflow-y:auto;background:var(--ui-surface-1);border:1px solid var(--ui-input-border-color);border-radius:var(--ui-input-border-radius);margin-top:4px;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f;z-index:10;display:none}.dropdown.open{display:block}.option{padding:10px 12px;cursor:pointer;font-size:14px;transition:background-color .15s;color:var(--ui-text-color)}.option:hover,.option.active{background-color:var(--ui-hover-color)}.no-options{padding:10px 12px;font-size:14px;color:var(--ui-text-color-muted)}";
var es = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, Ae = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ts(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && es(t, i, r), r;
};
let he = class extends c {
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
          class=${u({ dropdown: !0, open: e })}
        >
          ${this._filteredOptions.length > 0 ? this._filteredOptions.map(
      (t, i) => l`
                  <div
                    id="option-${i}"
                    role="option"
                    aria-selected=${i === this._activeIndex ? "true" : "false"}
                    class=${u({ option: !0, active: i === this._activeIndex })}
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
he.styles = p(Qo);
Ae([
  s({ type: Array })
], he.prototype, "options", 2);
Ae([
  s({ type: Boolean })
], he.prototype, "freeSolo", 2);
Ae([
  s({ type: Boolean })
], he.prototype, "disabled", 2);
Ae([
  s({ type: String })
], he.prototype, "value", 2);
Ae([
  s({ type: String })
], he.prototype, "placeholder", 2);
Ae([
  m()
], he.prototype, "_isOpen", 2);
Ae([
  m()
], he.prototype, "_inputValue", 2);
Ae([
  m()
], he.prototype, "_filteredOptions", 2);
Ae([
  m()
], he.prototype, "_activeIndex", 2);
he = Ae([
  d("ui-autocomplete")
], he);
const is = ":host{display:inline-block;font-family:var(--ui-font-family);color:var(--ui-text-color)}.wrapper{display:inline-flex;align-items:center;cursor:pointer}.wrapper.disabled{opacity:.5;cursor:not-allowed}.checkbox{position:relative;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border:2px solid var(--ui-input-border-color);border-radius:var(--ui-border-radius-sm);background-color:var(--ui-surface-1);transition:all .2s ease;margin-right:8px}.wrapper:hover:not(.disabled) .checkbox{border-color:var(--ui-primary-color)}.checkbox.checked,.checkbox.indeterminate{background-color:var(--ui-primary-color);border-color:var(--ui-primary-color)}.icon{fill:none;stroke:var(--ui-text-color-on-primary);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;width:12px;height:12px;opacity:0;transform:scale(.5);transition:all .2s cubic-bezier(.175,.885,.32,1.275)}.checked .icon,.indeterminate .icon{opacity:1;transform:scale(1)}input{position:absolute;opacity:0;width:0;height:0;margin:0}input:focus-visible+.checkbox{outline:2px solid var(--ui-primary-color);outline-offset:2px}.label{font-size:14px;line-height:1.5;-webkit-user-select:none;user-select:none}::slotted(*),.label{cursor:inherit}";
var rs = Object.defineProperty, os = Object.getOwnPropertyDescriptor, st = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? os(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && rs(t, i, r), r;
};
let Ce = class extends c {
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
          name=${this.name || g}
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
Ce.styles = p(is);
st([
  s({ type: Boolean, reflect: !0 })
], Ce.prototype, "checked", 2);
st([
  s({ type: Boolean })
], Ce.prototype, "indeterminate", 2);
st([
  s({ type: Boolean, reflect: !0 })
], Ce.prototype, "disabled", 2);
st([
  s({ type: Boolean })
], Ce.prototype, "required", 2);
st([
  s({ type: String })
], Ce.prototype, "label", 2);
st([
  s({ type: String })
], Ce.prototype, "name", 2);
st([
  s({ type: String })
], Ce.prototype, "value", 2);
Ce = st([
  d("ui-checkbox")
], Ce);
const ss = ':host{display:block;font-family:var(--ui-font-family);color:var(--ui-text-color)}:host([disabled]){opacity:.5;pointer-events:none}.group-container{display:flex;flex-direction:column;gap:var(--ui-radio-group-gap, 8px)}:host([orientation="horizontal"]) .group-container{flex-direction:row;flex-wrap:wrap}', as = ':host{display:inline-block;cursor:pointer}:host([disabled]){cursor:not-allowed}.wrapper{display:inline-flex;align-items:center;cursor:pointer}.wrapper.disabled{opacity:.5;cursor:not-allowed}.radio-circle{position:relative;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border:2px solid var(--ui-input-border-color);border-radius:50%;background-color:var(--ui-surface-1);transition:all .2s ease;margin-right:8px;flex-shrink:0}:host([size="sm"]) .radio-circle{width:14px;height:14px}:host([size="lg"]) .radio-circle{width:22px;height:22px}.wrapper:hover:not(.disabled) .radio-circle{border-color:var(--ui-primary-color)}.radio-circle.checked{border-color:var(--ui-primary-color)}.radio-circle:after{content:"";width:8px;height:8px;border-radius:50%;background-color:var(--ui-primary-color);opacity:0;transform:scale(.5);transition:all .2s cubic-bezier(.175,.885,.32,1.275)}:host([size="sm"]) .radio-circle:after{width:6px;height:6px}:host([size="lg"]) .radio-circle:after{width:10px;height:10px}.checked:after{opacity:1;transform:scale(1)}input{position:absolute;opacity:0;width:0;height:0;margin:0}input:focus-visible+.radio-circle{outline:2px solid var(--ui-primary-color);outline-offset:2px}.label{font-size:14px;line-height:1.5;-webkit-user-select:none;user-select:none}:host([size="sm"]) .label{font-size:12px}:host([size="lg"]) .label{font-size:16px}';
var ns = Object.defineProperty, ls = Object.getOwnPropertyDescriptor, U = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ls(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ns(t, i, r), r;
};
let ge = class extends c {
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
    const i = e.composedPath(), o = t.find((f) => i.includes(f)), r = o ? t.indexOf(o) : t.findIndex((f) => f.value === this.value), a = r >= 0 ? r : 0;
    e.preventDefault();
    const n = e.key === "ArrowDown" || e.key === "ArrowRight" ? (a + 1) % t.length : (a - 1 + t.length) % t.length, h = t[n];
    h.focus(), this.value = h.value, this._syncChildren(), this.dispatchEvent(new CustomEvent("ui-radio-group-change", {
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
                aria-label=${pe(this.label || void 0)}
                aria-disabled=${pe(this.disabled ? "true" : void 0)}
                aria-required=${pe(this.required ? "true" : void 0)}
            >
                <slot @slotchange=${this._handleSlotChange}></slot>
            </div>
        `;
  }
};
ge.styles = p(ss);
U([
  s({ type: String })
], ge.prototype, "label", 2);
U([
  s({ type: String })
], ge.prototype, "name", 2);
U([
  s({ type: String })
], ge.prototype, "value", 2);
U([
  s({ type: String, attribute: "default-value" })
], ge.prototype, "defaultValue", 2);
U([
  s({ type: Boolean, reflect: !0 })
], ge.prototype, "disabled", 2);
U([
  s({ type: Boolean, reflect: !0 })
], ge.prototype, "required", 2);
U([
  s({ type: String, reflect: !0 })
], ge.prototype, "orientation", 2);
U([
  s({ type: String, reflect: !0 })
], ge.prototype, "size", 2);
ge = U([
  d("ui-radio-group")
], ge);
let Ie = class extends c {
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
            <label class=${u({ wrapper: !0, disabled: this.disabled })}>
                <input
                    type="radio"
                    .name=${this.name}
                    .value=${this.value}
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    @change=${this._handleChange}
                >
                <div class=${u({ "radio-circle": !0, checked: this.checked })}></div>
                <span class="label">
                    ${this.label ? this.label : l`<slot></slot>`}
                </span>
            </label>
        `;
  }
};
Ie.styles = p(as);
U([
  s({ type: Boolean, reflect: !0 })
], Ie.prototype, "checked", 2);
U([
  s({ type: Boolean, reflect: !0 })
], Ie.prototype, "disabled", 2);
U([
  s({ type: Boolean, reflect: !0 })
], Ie.prototype, "required", 2);
U([
  s({ type: String })
], Ie.prototype, "name", 2);
U([
  s({ type: String })
], Ie.prototype, "value", 2);
U([
  s({ type: String })
], Ie.prototype, "label", 2);
U([
  s({ type: String, reflect: !0 })
], Ie.prototype, "size", 2);
Ie = U([
  d("ui-radio")
], Ie);
const cs = ':host{display:inline-block;font-family:var(--ui-font-family);--ui-rating-color: #ffb400;--ui-rating-empty-color: #faaf0033;--ui-rating-size: 2rem;font-size:var(--ui-rating-size)}:host([size="sm"]){--ui-rating-size: 1.25rem}:host([size="md"]){--ui-rating-size: 2rem}:host([size="lg"]){--ui-rating-size: 2.75rem}:host([disabled]){opacity:.4;cursor:not-allowed}:host([readonly]) .rating-container{cursor:default}.rating-container{display:inline-flex;position:relative;cursor:pointer;font-size:1em;line-height:1;gap:.1em}.rating-container:focus{outline:none}.star-wrapper{position:relative;display:inline-flex;transition:transform .1s ease;outline:none}.star-wrapper:focus-visible{border-radius:2px;box-shadow:0 0 0 2px var(--ui-rating-color)}.star-wrapper:not(.readonly):not(.disabled):hover{transform:scale(1.1)}svg{width:1em;height:1em;fill:var(--ui-rating-empty-color);stroke:var(--ui-rating-color);stroke-width:1;transition:fill .2s ease,stroke .2s ease;overflow:visible}.active svg{fill:var(--ui-rating-color)}.hover svg{fill:var(--ui-rating-color);opacity:.7}.half svg .star-full{display:none}.half svg .star-half{display:block}.star-half{display:none}.hidden-input{position:absolute;opacity:0;width:0;height:0;margin:0;pointer-events:none}';
var ds = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, me = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ps(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ds(t, i, r), r;
};
let J = class extends c {
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
    return ar`
            <svg viewBox="0 0 24 24" aria-hidden="true">
                ${e === "half" ? ar`
                    <defs>
                        <linearGradient id="${t}">
                            <stop offset="50%" stop-color="var(--ui-rating-color)"></stop>
                            <stop offset="50%" stop-color="var(--ui-rating-empty-color)"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#${t})" stroke="var(--ui-rating-color)" stroke-width="1"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                ` : ar`
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                `}
            </svg>
        `;
  }
  render() {
    const e = Math.ceil(this.value) || 1, t = [];
    for (let i = 1; i <= this.max; i++) {
      const o = this._hoverValue !== -1 ? this._hoverValue : this.value, r = this.precision === 0.5 && o >= i - 0.5 && o < i, a = o >= i, n = this._hoverValue !== -1;
      let h;
      r ? h = "half" : a ? h = "full" : h = "empty";
      const f = {
        "star-wrapper": !0,
        active: h === "full" && !n,
        hover: h === "full" && n,
        half: h === "half",
        readonly: this.readonly,
        disabled: this.disabled
      };
      t.push(l`
                <span
                    class=${u(f)}
                    role="radio"
                    aria-label="${i} ${i === 1 ? "star" : "stars"}"
                    aria-checked=${this.value >= i ? "true" : "false"}
                    tabindex=${i === e && !this.disabled ? "0" : "-1"}
                    @mouseenter=${() => this._handleMouseEnter(i)}
                    @mousemove=${(y) => this._handleMouseMove(y, i)}
                    @click=${() => this._handleClick(this._hoverValue !== -1 ? this._hoverValue : i)}
                    @keydown=${(y) => this._handleKeydown(y, i)}
                >
                    ${this._starSvg(h)}
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
J.styles = p(cs);
me([
  s({ type: Number })
], J.prototype, "value", 2);
me([
  s({ type: Number })
], J.prototype, "max", 2);
me([
  s({ type: Boolean, reflect: !0 })
], J.prototype, "readonly", 2);
me([
  s({ type: Boolean, reflect: !0 })
], J.prototype, "disabled", 2);
me([
  s({ type: Boolean })
], J.prototype, "clearable", 2);
me([
  s({ type: Number })
], J.prototype, "defaultValue", 2);
me([
  s({ type: String, reflect: !0 })
], J.prototype, "size", 2);
me([
  s({ type: String })
], J.prototype, "name", 2);
me([
  s({ type: String })
], J.prototype, "label", 2);
me([
  s({ type: Number })
], J.prototype, "precision", 2);
me([
  m()
], J.prototype, "_hoverValue", 2);
J = me([
  d("ui-rating")
], J);
const hs = ':host{display:inline-block;--ui-switch-width: 52px;--ui-switch-height: 32px;--ui-switch-thumb-size: 24px;--ui-switch-thumb-offset: 4px;--ui-switch-bg: var(--ui-secondary-color);--ui-switch-bg-on: var(--ui-primary-color);--ui-switch-thumb-bg: var(--ui-switch-thumb-color);font-family:var(--ui-font-family);cursor:pointer}:host([disabled]){cursor:not-allowed}:host([size="sm"]){--ui-switch-width: 36px;--ui-switch-height: 22px;--ui-switch-thumb-size: 16px;--ui-switch-thumb-offset: 3px}:host([size="lg"]){--ui-switch-width: 64px;--ui-switch-height: 38px;--ui-switch-thumb-size: 30px;--ui-switch-thumb-offset: 4px}.wrapper{display:flex;align-items:center;gap:12px;-webkit-user-select:none;user-select:none}.switch{position:relative;width:var(--ui-switch-width);height:var(--ui-switch-height);background-color:var(--ui-switch-bg);border-radius:calc(var(--ui-switch-height) / 2);transition:background-color .3s cubic-bezier(.4,0,.2,1);flex-shrink:0}.switch.checked{background-color:var(--ui-switch-bg-on)}.thumb{position:absolute;top:var(--ui-switch-thumb-offset);left:var(--ui-switch-thumb-offset);width:var(--ui-switch-thumb-size);height:var(--ui-switch-thumb-size);background-color:var(--ui-switch-thumb-bg);border-radius:50%;box-shadow:var(--ui-shadow-sm);transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;justify-content:center;color:var(--ui-text-color-muted)}.switch.checked .thumb{transform:translate(calc(var(--ui-switch-width) - var(--ui-switch-thumb-size) - (var(--ui-switch-thumb-offset) * 2)));color:var(--ui-primary-color)}.label{font-size:.9375rem;font-weight:500;color:var(--ui-text-color)}.label.disabled{cursor:not-allowed;opacity:.5}.switch.disabled{opacity:.5;cursor:not-allowed}.switch:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}.icon-wrapper{font-size:14px;display:flex;align-items:center;justify-content:center}';
var us = Object.defineProperty, fs = Object.getOwnPropertyDescriptor, Be = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && us(t, i, r), r;
};
let ro = 0, re = class extends c {
  constructor() {
    super(), this.checked = !1, this.disabled = !1, this.required = !1, this.size = "md", this.label = "", this.name = "", this.value = "on", this.defaultChecked = !1, this.ariaLabel = null, this._internals = null, this._firstUpdate = !0, ro++, this._labelId = `ui-switch-label-${ro}`, typeof this.attachInternals == "function" && (this._internals = this.attachInternals());
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
          class=${u({ switch: !0, checked: this.checked, disabled: this.disabled })}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-required=${this.required ? "true" : "false"}
          aria-label=${this.ariaLabel ?? g}
          aria-labelledby=${e ? this._labelId : g}
          .tabIndex=${this.disabled ? -1 : 0}
          @keydown=${(t) => (t.key === " " || t.key === "Enter") && this._handleClick()}
        >
          <div class="thumb">
            <div class="icon-wrapper">
              ${this.checked ? l`<slot name="icon-on"></slot>` : l`<slot name="icon-off"></slot>`}
            </div>
          </div>
        </div>
        ${e ? l`<span id=${this._labelId} class=${u({ label: !0, disabled: this.disabled })}>${this.label}</span>` : l`<slot></slot>`}
      </div>
    `;
  }
};
re.formAssociated = !0;
re.styles = p(hs);
Be([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "checked", 2);
Be([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "disabled", 2);
Be([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "required", 2);
Be([
  s({ type: String, reflect: !0 })
], re.prototype, "size", 2);
Be([
  s({ type: String })
], re.prototype, "label", 2);
Be([
  s({ type: String })
], re.prototype, "name", 2);
Be([
  s({ type: String })
], re.prototype, "value", 2);
Be([
  s({ type: Boolean, attribute: "default-checked" })
], re.prototype, "defaultChecked", 2);
Be([
  s({ type: String, attribute: "aria-label" })
], re.prototype, "ariaLabel", 2);
re = Be([
  d("ui-switch")
], re);
const bs = ":host{display:block;--ui-transfer-list-height: 300px;--ui-transfer-list-width: 200px;font-family:var(--ui-font-family);color:var(--ui-text-color)}.container{display:flex;align-items:center;gap:16px}.list-wrapper{display:flex;flex-direction:column;gap:8px}.list-title{font-size:.875rem;font-weight:600;color:var(--ui-text-color-muted);margin-bottom:4px}.list-box{width:var(--ui-transfer-list-width);height:var(--ui-transfer-list-height);background:var(--ui-surface-1);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-lg);overflow-y:auto;display:flex;flex-direction:column;box-shadow:var(--ui-shadow-sm)}.list-item{display:flex;align-items:center;padding:10px 12px;cursor:pointer;transition:background-color .2s;gap:10px;-webkit-user-select:none;user-select:none}.list-item:hover{background-color:var(--ui-hover-color)}.list-item.selected{background-color:var(--ui-primary-color-light)}.checkbox{width:18px;height:18px;border:2px solid var(--ui-border-color);border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}.list-item.selected .checkbox{background-color:var(--ui-primary-color);border-color:var(--ui-primary-color)}.check-icon{color:var(--ui-text-color-on-primary);opacity:0;transform:scale(.5);transition:all .2s}.list-item.selected .check-icon{opacity:1;transform:scale(1)}.item-label{font-size:.9375rem}.actions{display:flex;flex-direction:column;gap:12px}.action-button{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--ui-border-color);background:var(--ui-surface-1);border-radius:8px;cursor:pointer;color:var(--ui-text-color);transition:all .2s}.action-button:hover:not(:disabled){border-color:var(--ui-primary-color);color:var(--ui-primary-color);box-shadow:var(--ui-shadow-md);transform:translateY(-1px)}.action-button:active:not(:disabled){transform:translateY(0)}.action-button:disabled{opacity:.4;cursor:not-allowed;background-color:var(--ui-surface-2)}.list-box::-webkit-scrollbar{width:6px}.list-box::-webkit-scrollbar-track{background:transparent}.list-box::-webkit-scrollbar-thumb{background:var(--ui-border-color);border-radius:3px}";
var vs = Object.defineProperty, ms = Object.getOwnPropertyDescriptor, kt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ms(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && vs(t, i, r), r;
};
let Le = class extends c {
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
            ${At(e, (i) => i.value, (i) => l`
              <div 
                class="list-item ${u({ selected: this.leftChecked.includes(i.value) })}"
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
            ${At(t, (i) => i.value, (i) => l`
              <div 
                class="list-item ${u({ selected: this.rightChecked.includes(i.value) })}"
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
Le.styles = p(bs);
kt([
  s({ type: Array })
], Le.prototype, "options", 2);
kt([
  s({ type: Array })
], Le.prototype, "value", 2);
kt([
  s({ type: String })
], Le.prototype, "leftTitle", 2);
kt([
  s({ type: String })
], Le.prototype, "rightTitle", 2);
kt([
  m()
], Le.prototype, "leftChecked", 2);
kt([
  m()
], Le.prototype, "rightChecked", 2);
Le = kt([
  d("ui-transfer-list")
], Le);
const gs = ":host{display:inline-flex;position:relative;vertical-align:middle;flex-shrink:0}.badge{display:flex;flex-wrap:wrap;place-content:center;align-items:center;position:absolute;box-sizing:border-box;font-family:var(--ui-font-family);font-weight:600;font-size:.75rem;min-width:20px;line-height:1;padding:0 6px;height:20px;border-radius:10px;z-index:1;transition:transform .2s cubic-bezier(.4,0,.2,1);background-color:var(--ui-badge-background, var(--ui-primary-color));color:var(--ui-badge-color, var(--ui-text-color-on-primary));top:0;right:0;transform:scale(1) translate(50%,-50%);transform-origin:100% 0%;border:2px solid var(--ui-surface-1)}.badge.hidden{transform:scale(0) translate(50%,-50%)}.badge.dot{min-width:8px;height:8px;padding:0;border-radius:4px}.primary{background-color:var(--ui-primary-color)}.secondary{background-color:var(--ui-secondary-color)}.error{background-color:var(--ui-error-color);color:var(--ui-text-color-on-primary)}.success{background-color:var(--ui-success-color);color:var(--ui-text-color-on-primary)}.warning{background-color:var(--ui-warning-color);color:var(--ui-text-color-on-primary)}";
var ys = Object.defineProperty, xs = Object.getOwnPropertyDescriptor, ti = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? xs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ys(t, i, r), r;
};
let Ze = class extends c {
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
Ze.styles = p(gs);
ti([
  s({ type: String })
], Ze.prototype, "content", 2);
ti([
  s({ type: Boolean })
], Ze.prototype, "dot", 2);
ti([
  s({ type: Boolean })
], Ze.prototype, "invisible", 2);
ti([
  s({ type: String })
], Ze.prototype, "variant", 2);
ti([
  s({ type: Number })
], Ze.prototype, "max", 2);
Ze = ti([
  d("ui-badge")
], Ze);
const _s = ":host{display:block;width:100%;font-family:var(--ui-font-family);margin-bottom:1rem}.alert{display:flex;align-items:flex-start;padding:12px 16px;border-radius:var(--ui-border-radius-md);gap:12px;border:1px solid transparent;position:relative;box-sizing:border-box;animation:fadeIn .3s ease-out}@keyframes fadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.info{background-color:var(--ui-info-bg);border-color:var(--ui-info-border-color);color:var(--ui-info-text-color)}.info .icon{color:var(--ui-info-icon-color)}.success{background-color:var(--ui-success-bg);border-color:var(--ui-success-border-color);color:var(--ui-success-text-color)}.success .icon{color:var(--ui-success-icon-color)}.warning{background-color:var(--ui-warning-bg);border-color:var(--ui-warning-border-color);color:var(--ui-warning-text-color)}.warning .icon{color:var(--ui-warning-icon-color)}.error{background-color:var(--ui-error-bg);border-color:var(--ui-error-border-color);color:var(--ui-error-text-color)}.error .icon{color:var(--ui-error-icon-color)}.icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:20px;height:20px;margin-top:2px}.content{flex-grow:1}.title{font-weight:600;font-size:.875rem;margin-bottom:2px}.message{font-size:.875rem;line-height:1.5}.close-button{flex-shrink:0;cursor:pointer;padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center;width:28px;height:28px;margin-top:-6px;margin-right:-10px;color:currentColor;opacity:.6;transition:all .2s ease;border:none;background:transparent}.close-button:hover{opacity:1;background-color:var(--ui-active-color)}.close-button:active{transform:scale(.92)}.icon svg,.close-button svg{width:100%;height:100%}";
var ws = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, Zi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ks(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ws(t, i, r), r;
};
let Lt = class extends c {
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
Lt.styles = p(_s);
Zi([
  s({ type: String })
], Lt.prototype, "severity", 2);
Zi([
  s({ type: String })
], Lt.prototype, "title", 2);
Zi([
  s({ type: Boolean })
], Lt.prototype, "dismissible", 2);
Lt = Zi([
  d("ui-alert")
], Lt);
const $s = ':host{display:block}.skeleton{display:block;background-color:var(--ui-skeleton-bg, var(--ui-surface-3));position:relative;overflow:hidden}@media(prefers-color-scheme:dark){.skeleton{background-color:var(--ui-skeleton-bg-dark, rgba(255, 255, 255, .13))}}:host([dark]) .skeleton{background-color:var(--ui-skeleton-bg-dark, rgba(255, 255, 255, .13))}.skeleton.pulse{animation:pulse var(--ui-skeleton-animation-duration, 1.5s) ease-in-out .5s infinite}.skeleton.wave:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,var(--ui-skeleton-wave-color, rgba(255, 255, 255, .4)),transparent);animation:wave var(--ui-skeleton-animation-duration, 1.6s) linear infinite;transform:translate(-100%)}@keyframes pulse{0%{opacity:1}50%{opacity:.4}to{opacity:1}}@keyframes wave{0%{transform:translate(-100%)}to{transform:translate(100%)}}.text{border-radius:var(--ui-border-radius-sm)}.circular{border-radius:50%}.rectangular{border-radius:var(--ui-border-radius-md)}.rounded{border-radius:var(--ui-border-radius-lg)}@media(prefers-reduced-motion:reduce){.skeleton.pulse{animation:none}.skeleton.wave:after{display:none}}';
var Ss = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, $t = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Cs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ss(t, i, r), r;
};
let je = class extends c {
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
                style=${ei(i)}
                aria-hidden="true"
            ></span>
        `;
  }
};
je.styles = p($s);
$t([
  s({ type: Boolean, reflect: !0 })
], je.prototype, "dark", 2);
$t([
  s({ type: String, reflect: !0 })
], je.prototype, "animation", 2);
$t([
  s({ type: String, reflect: !0 })
], je.prototype, "variant", 2);
$t([
  s({ type: String })
], je.prototype, "width", 2);
$t([
  s({ type: String })
], je.prototype, "height", 2);
$t([
  s({ type: String })
], je.prototype, "label", 2);
je = $t([
  d("ui-skeleton")
], je);
const Is = ':host{display:flex;align-items:center;justify-content:center;pointer-events:none;position:fixed;z-index:var(--ui-snackbar-z-index, 1400);transition:all .3s cubic-bezier(.4,0,.2,1)}:host([anchor-origin*="bottom"]){bottom:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="top"]){top:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="left"]){left:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="right"]){right:var(--ui-snackbar-offset, 24px)}:host([anchor-origin*="center"]){left:50%;transform:translate(-50%)}.snackbar{background-color:var(--ui-snackbar-bg, #313131);color:var(--ui-snackbar-color, #ffffff);font-family:var(--ui-font-family);font-size:.875rem;line-height:1.43;letter-spacing:.01071em;display:flex;align-items:center;padding:6px 16px;border-radius:var(--ui-border-radius-md);box-shadow:var(--ui-shadow-lg);min-width:var(--ui-snackbar-min-width, 288px);max-width:var(--ui-snackbar-max-width, 560px);pointer-events:auto;opacity:0;transform:scale(.85);transition:opacity 225ms cubic-bezier(.4,0,.2,1),transform .15s cubic-bezier(.4,0,.2,1);visibility:hidden}.snackbar.open{opacity:1;transform:scale(1);visibility:visible}:host([variant="info"]) .snackbar{background-color:var(--ui-snackbar-bg-info, #0288d1)}:host([variant="success"]) .snackbar{background-color:var(--ui-snackbar-bg-success, #2e7d32)}:host([variant="warning"]) .snackbar{background-color:var(--ui-snackbar-bg-warning, #ed6c02)}:host([variant="error"]) .snackbar{background-color:var(--ui-snackbar-bg-error, #d32f2f)}.message{padding:8px 0;flex-grow:1}.action{display:flex;align-items:center;margin-left:8px;margin-right:-8px;padding-left:16px}.action.hidden{display:none}.close-btn{background:none;border:none;color:inherit;cursor:pointer;padding:4px 8px;margin-left:8px;margin-right:-8px;opacity:.8;display:flex;align-items:center;border-radius:2px;line-height:0}.close-btn:hover{opacity:1}::slotted(ui-alert){margin-bottom:0!important;width:100%;min-width:288px}';
var Es = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, Ye = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ps(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Es(t, i, r), r;
};
let ye = class extends c {
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
                class=${u(e)}
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
                <div class=${u(t)}>
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
ye.styles = p(Is);
Ye([
  s({ type: Boolean, reflect: !0 })
], ye.prototype, "open", 2);
Ye([
  s({ type: String })
], ye.prototype, "message", 2);
Ye([
  s({ type: Number, attribute: "auto-hide-duration" })
], ye.prototype, "autoHideDuration", 2);
Ye([
  s({ type: String, attribute: "anchor-origin", reflect: !0 })
], ye.prototype, "anchorOrigin", 2);
Ye([
  s({ type: Boolean, attribute: "pause-on-hover" })
], ye.prototype, "pauseOnHover", 2);
Ye([
  s({ type: Boolean, reflect: !0 })
], ye.prototype, "closable", 2);
Ye([
  s({ type: String, reflect: !0 })
], ye.prototype, "variant", 2);
Ye([
  m()
], ye.prototype, "_hasAction", 2);
ye = Ye([
  d("ui-snackbar")
], ye);
const Os = ':host{display:block;--ui-divider-color: var(--ui-border-color);--ui-divider-margin: 16px;--ui-divider-thickness: 1px}.divider-container{display:flex;align-items:center;width:100%;box-sizing:border-box;margin:var(--ui-divider-margin) 0}.divider-line{flex-grow:1;height:var(--ui-divider-thickness);background-color:var(--ui-divider-color);border:none}.divider-content{padding:0 16px;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);white-space:nowrap}:host([orientation="vertical"]){display:flex;align-self:stretch;margin:0;width:auto;min-width:var(--ui-divider-thickness)}:host([orientation="vertical"]) .divider-container{flex-direction:column;height:100%;width:auto;min-width:var(--ui-divider-thickness);margin:0}:host([orientation="vertical"]) .divider-line{width:var(--ui-divider-thickness);height:auto;flex:1;min-height:24px}.variant-middle{margin-left:32px;margin-right:32px;width:auto}.variant-inset{margin-left:72px}.weight-light{--ui-divider-thickness: 1px}.weight-medium{--ui-divider-thickness: 2px}.weight-heavy{--ui-divider-thickness: 4px}';
var Ds = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, Si = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ds(t, i, r), r;
};
let ut = class extends c {
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
ut.styles = p(Os);
Si([
  s({ type: String, reflect: !0 })
], ut.prototype, "orientation", 2);
Si([
  s({ type: String })
], ut.prototype, "variant", 2);
Si([
  s({ type: String })
], ut.prototype, "weight", 2);
Si([
  s({ type: String })
], ut.prototype, "textAlign", 2);
ut = Si([
  d("ui-divider")
], ut);
const Ts = ':host{display:block;padding:12px 0;font-family:var(--ui-font-family);color:var(--ui-text-color);--_track-height: 6px;--_thumb-size: 20px;--_font-size: 14px}:host([size="sm"]){--_track-height: 4px;--_thumb-size: 14px;--_font-size: 12px}:host([size="lg"]){--_track-height: 8px;--_thumb-size: 24px;--_font-size: 16px}:host([vertical]){padding:0 12px;display:inline-flex;height:var(--ui-slider-vertical-height, 200px)}.slider-wrapper{display:flex;flex-direction:column;gap:8px}.slider-wrapper.vertical{flex-direction:column-reverse;align-items:center;gap:12px;width:100%;height:100%;justify-content:flex-end}.label-row{display:flex;justify-content:space-between;align-items:center;font-size:var(--_font-size);font-weight:500}.label-row.vertical{flex-direction:column;align-items:center;gap:2px;flex-shrink:0}.value-display{font-weight:600;color:var(--ui-primary-color)}.track-container{flex:1;display:flex;align-items:center;justify-content:center;width:100%}.track-container.vertical{flex:1;min-height:0;width:auto;height:100%;display:flex;align-items:center;justify-content:center}input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:var(--_track-height);background:var(--ui-input-border-color);border-radius:3px;outline:none;margin:10px 0;cursor:pointer;transition:all .2s ease}input[type=range].vertical{writing-mode:vertical-lr;direction:rtl;width:var(--_track-height);height:100%;margin:0;appearance:slider-vertical;-webkit-appearance:slider-vertical}@supports not (appearance: slider-vertical){input[type=range].vertical{writing-mode:vertical-lr;direction:rtl;width:var(--_track-height);height:100%;margin:0}}input[type=range]:disabled{cursor:not-allowed;opacity:.5}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:var(--_thumb-size);height:var(--_thumb-size);border-radius:50%;background:var(--ui-surface-1);border:2px solid var(--ui-primary-color);box-shadow:var(--ui-shadow-sm);cursor:pointer;transition:transform .1s ease,box-shadow .1s ease}input[type=range]::-moz-range-thumb{width:calc(var(--_thumb-size) - 2px);height:calc(var(--_thumb-size) - 2px);border-radius:50%;background:var(--ui-surface-1);border:2px solid var(--ui-primary-color);box-shadow:var(--ui-shadow-sm);cursor:pointer}input[type=range]::-moz-range-progress{background:var(--ui-primary-color);height:var(--_track-height);border-radius:3px}input[type=range]:focus-visible::-webkit-slider-thumb{outline:2px solid var(--ui-primary-color);outline-offset:4px}input[type=range]:not(:disabled):hover::-webkit-slider-thumb{transform:scale(1.1);box-shadow:var(--ui-shadow-md)}input[type=range]:active::-webkit-slider-thumb{transform:scale(.95)}.disabled-label{color:var(--ui-text-color-muted)}';
var As = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, le = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && As(t, i, r), r;
};
let q = class extends c {
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
    }, n = { "slider-wrapper": !0, vertical: this.vertical }, h = { "label-row": !0, vertical: this.vertical }, f = { "track-container": !0, vertical: this.vertical }, y = { vertical: this.vertical }, b = "slider-input";
    return l`
      <div class=${u(n)}>
        <div class=${u(h)}>
          ${this.label ? l`<label
                for=${b}
                class=${u({ "disabled-label": this.disabled })}
              >${this.label}</label>` : ""}
          ${this.showValue ? l`<span class="value-display">${r}</span>` : ""}
        </div>
        <div class=${u(f)}>
          <input
            id=${b}
            type="range"
            class=${u(y)}
            .min=${t.toString()}
            .max=${i.toString()}
            .step=${this.step.toString()}
            .value=${e.toString()}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            style=${ei(a)}
            aria-label=${this.label || "Slider"}
            aria-orientation=${this.vertical ? "vertical" : "horizontal"}
            aria-valuetext=${this.formatValue ? r : ""}
          >
        </div>
      </div>
    `;
  }
};
q.formAssociated = !0;
q.styles = p(Ts);
le([
  s({ type: Number })
], q.prototype, "value", 2);
le([
  s({ type: Number, attribute: "default-value" })
], q.prototype, "defaultValue", 2);
le([
  s({ type: Number })
], q.prototype, "min", 2);
le([
  s({ type: Number })
], q.prototype, "max", 2);
le([
  s({ type: Number })
], q.prototype, "step", 2);
le([
  s({ type: Boolean, reflect: !0 })
], q.prototype, "disabled", 2);
le([
  s({ type: String })
], q.prototype, "label", 2);
le([
  s({ type: Boolean, attribute: "show-value" })
], q.prototype, "showValue", 2);
le([
  s({ type: Boolean, reflect: !0 })
], q.prototype, "vertical", 2);
le([
  s({ type: String, reflect: !0 })
], q.prototype, "size", 2);
le([
  s({ type: String })
], q.prototype, "name", 2);
le([
  s({ attribute: !1 })
], q.prototype, "formatValue", 2);
q = le([
  d("ui-slider")
], q);
const Ms = ":host{display:block;font-family:var(--ui-font-family);margin-bottom:1rem}.field-container{display:flex;flex-direction:column;gap:.5rem}.label{font-size:.875rem;font-weight:500;color:var(--ui-label-color);transition:color .2s}.input-wrapper{position:relative;display:flex;align-items:center;background-color:var(--ui-input-bg);border:1px solid var(--ui-input-border-color);border-radius:var(--ui-input-border-radius);transition:all .2s ease;overflow:hidden}.input-wrapper:hover:not(.disabled):not(.error){border-color:var(--ui-input-border-hover-color)}.input-wrapper.focused:not(.error){border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}.input-wrapper.error{border-color:var(--ui-error-color)}.input-wrapper.error.focused{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}.input-wrapper.disabled{background-color:var(--ui-input-disabled-bg);cursor:not-allowed;opacity:.7}input{flex:1;width:100%;padding:.625rem .875rem;font-size:1rem;font-family:inherit;color:inherit;background:transparent;border:none;outline:none}input:disabled{cursor:not-allowed}input::placeholder{color:var(--ui-input-placeholder-color)}.icon-leading,.icon-trailing{display:flex;align-items:center;justify-content:center;color:var(--ui-text-color-muted);padding:0 .75rem}.icon-leading{padding-right:0}.icon-trailing{padding-left:0}.helper-text{font-size:.75rem;color:var(--ui-help-text-color)}.error-text{color:var(--ui-error-color)}.filled .input-wrapper{background-color:var(--ui-surface-2);border-bottom:2px solid var(--ui-input-border-color);border-top:none;border-left:none;border-right:none;border-radius:4px 4px 0 0}.filled .input-wrapper.focused{border-bottom-color:var(--ui-primary-color);background-color:var(--ui-hover-color)}";
var Ls = Object.defineProperty, js = Object.getOwnPropertyDescriptor, we = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? js(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ls(t, i, r), r;
};
let oe = class extends c {
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
oe.styles = p(Ms);
we([
  s({ type: String })
], oe.prototype, "label", 2);
we([
  s({ type: String })
], oe.prototype, "value", 2);
we([
  s({ type: String })
], oe.prototype, "placeholder", 2);
we([
  s({ type: String })
], oe.prototype, "type", 2);
we([
  s({ type: String })
], oe.prototype, "variant", 2);
we([
  s({ type: Boolean })
], oe.prototype, "disabled", 2);
we([
  s({ type: Boolean })
], oe.prototype, "error", 2);
we([
  s({ type: String })
], oe.prototype, "helperText", 2);
we([
  s({ type: String })
], oe.prototype, "errorMessage", 2);
we([
  m()
], oe.prototype, "_focused", 2);
oe = we([
  d("ui-text-field")
], oe);
const Us = ":host{display:inline-block}button{font-family:var(--ui-font-family);font-weight:500;font-size:14px;padding:8px 16px;border:1px solid var(--ui-input-border-color);background-color:var(--ui-surface-1);color:var(--ui-text-color);cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center;gap:8px;outline:none}button:hover:not(:disabled){background-color:var(--ui-hover-color)}button.selected{background-color:var(--ui-active-color);color:var(--ui-primary-color);border-color:var(--ui-primary-color);z-index:1}button:disabled{opacity:.5;cursor:not-allowed}button:focus-visible{box-shadow:0 0 0 2px var(--ui-primary-color);z-index:2}:host([data-first]) button{border-top-left-radius:var(--ui-border-radius-md);border-bottom-left-radius:var(--ui-border-radius-md)}:host([data-last]) button{border-top-right-radius:var(--ui-border-radius-md);border-bottom-right-radius:var(--ui-border-radius-md)}:host(:not([data-first])) button{margin-left:-1px}";
var Rs = Object.defineProperty, Vs = Object.getOwnPropertyDescriptor, Qi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Vs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Rs(t, i, r), r;
};
let jt = class extends c {
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
jt.styles = p(Us);
Qi([
  s({ type: Boolean, reflect: !0 })
], jt.prototype, "selected", 2);
Qi([
  s({ type: Boolean, reflect: !0 })
], jt.prototype, "disabled", 2);
Qi([
  s({ type: String })
], jt.prototype, "value", 2);
jt = Qi([
  d("ui-toggle-button")
], jt);
const Ns = ":host{display:inline-flex;vertical-align:middle}";
var Fs = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, to = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Fs(t, i, r), r;
};
let ci = class extends c {
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
ci.styles = p(Ns);
to([
  s({ type: String })
], ci.prototype, "value", 2);
to([
  s({ type: Boolean })
], ci.prototype, "exclusive", 2);
ci = to([
  d("ui-toggle-button-group")
], ci);
const Hs = ':host{display:inline-block;vertical-align:middle;line-height:1}.avatar{position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--ui-avatar-size, 40px);height:var(--ui-avatar-size, 40px);font-family:var(--ui-font-family);font-size:calc(var(--ui-avatar-size, 40px) / 2.5);font-weight:600;border-radius:50%;overflow:hidden;-webkit-user-select:none;user-select:none;background-color:var(--ui-avatar-bg, var(--ui-surface-3));color:var(--ui-avatar-color, var(--ui-text-color-muted));transition:all .2s ease}.avatar.square{border-radius:0}.avatar.rounded{border-radius:var(--ui-border-radius-md)}img{width:100%;height:100%;object-fit:cover;display:block}.initials{text-transform:uppercase}:host([size="small"]){--ui-avatar-size: 32px}:host([size="medium"]){--ui-avatar-size: 40px}:host([size="large"]){--ui-avatar-size: 56px}:host([size="xlarge"]){--ui-avatar-size: 80px}.avatar.loading{background:linear-gradient(90deg,var(--ui-surface-2) 25%,var(--ui-surface-3) 50%,var(--ui-surface-2) 75%);background-size:200% 100%;animation:loading 1.5s infinite}@keyframes loading{0%{background-position:200% 0}to{background-position:-200% 0}}';
var Ks = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, at = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ys(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ks(t, i, r), r;
};
let Ee = class extends c {
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
        ${this.src && !this._hasError ? l`<img src=${this.src} alt=${this.alt} @error=${this._handleError} @load=${this._handleLoad} style=${this._isLoading ? "display:none" : g} part="image" />` : this.initials ? l`<span class="initials" part="initials">${this.initials.substring(0, 2)}</span>` : l`<slot><svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></slot>`}
      </div>
    `;
  }
};
Ee.styles = p(Hs);
at([
  s({ type: String })
], Ee.prototype, "src", 2);
at([
  s({ type: String })
], Ee.prototype, "alt", 2);
at([
  s({ type: String })
], Ee.prototype, "initials", 2);
at([
  s({ type: String })
], Ee.prototype, "variant", 2);
at([
  s({ type: String, reflect: !0 })
], Ee.prototype, "size", 2);
at([
  m()
], Ee.prototype, "_hasError", 2);
at([
  m()
], Ee.prototype, "_isLoading", 2);
Ee = at([
  d("ui-avatar")
], Ee);
const Gs = ':host{display:inline-block;vertical-align:middle;font-family:var(--ui-font-family)}.chip{display:inline-flex;align-items:center;height:32px;padding:0 12px;border-radius:16px;font-size:14px;font-weight:500;white-space:nowrap;transition:all .2s ease;background-color:var(--ui-surface-2);color:var(--ui-text-color);border:1px solid transparent;-webkit-user-select:none;user-select:none;gap:8px;outline:none;overflow:hidden}.chip.clickable{cursor:pointer}.chip.clickable:hover:not(.disabled){background-color:var(--ui-hover-color)}.chip.clickable:active:not(.disabled){background-color:var(--ui-active-color)}.chip.outlined{background-color:transparent;border-color:var(--ui-input-border-color)}.chip.primary:not(.outlined){background-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.chip.secondary:not(.outlined){background-color:var(--ui-secondary-color);color:var(--ui-text-color-on-primary)}.chip.outlined.primary{color:var(--ui-primary-color);border-color:var(--ui-primary-color)}.chip.outlined.secondary{color:var(--ui-secondary-color);border-color:var(--ui-secondary-color)}.chip.primary.clickable:hover:not(.disabled){filter:brightness(.9);box-shadow:var(--ui-shadow-sm)}.chip.secondary.clickable:hover:not(.disabled){filter:brightness(.9);box-shadow:var(--ui-shadow-sm)}.chip.disabled{opacity:.5;cursor:not-allowed}.chip:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}.delete-icon{display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;margin-right:-4px;cursor:pointer;color:inherit;opacity:.7;transition:opacity .2s,background-color .2s;outline:none}.delete-icon:hover{opacity:1;background-color:var(--ui-active-color)}.delete-icon:focus-visible{opacity:1;outline:2px solid currentColor;outline-offset:1px}.chip.disabled .delete-icon{cursor:not-allowed;pointer-events:none}::slotted([slot="avatar"]){--ui-avatar-size: 24px;width:24px;height:24px;margin-left:-8px;border-radius:50%;overflow:hidden;flex-shrink:0}::slotted([slot="icon"]){display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;margin-left:-4px;flex-shrink:0;line-height:1}';
var Ws = Object.defineProperty, Xs = Object.getOwnPropertyDescriptor, St = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xs(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ws(t, i, r), r;
};
let Ue = class extends c {
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
        role=${pe(this.clickable ? "button" : void 0)}
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
Ue.styles = p(Gs);
St([
  s({ type: String })
], Ue.prototype, "label", 2);
St([
  s({ type: String })
], Ue.prototype, "variant", 2);
St([
  s({ type: String })
], Ue.prototype, "color", 2);
St([
  s({ type: Boolean })
], Ue.prototype, "clickable", 2);
St([
  s({ type: Boolean })
], Ue.prototype, "deletable", 2);
St([
  s({ type: Boolean, reflect: !0 })
], Ue.prototype, "disabled", 2);
Ue = St([
  d("ui-chip")
], Ue);
const Js = ":host{display:block;padding:8px 0;margin:0;list-style:none;background-color:var(--ui-surface-background, white)}:host([disable-padding]){padding:0}:host([dense]){--ui-list-item-padding: 4px 16px;--ui-list-item-gap: 8px}", Zs = ":host{display:block;box-sizing:border-box}li{display:flex;align-items:center;padding:var(--ui-list-item-padding, 8px 16px);gap:var(--ui-list-item-gap, 16px);list-style:none}", Qs = ":host{display:block;box-sizing:border-box}li{display:flex;align-items:center;padding:var(--ui-list-item-padding, 8px 16px);gap:var(--ui-list-item-gap, 16px);cursor:pointer;transition:background-color .2s ease;-webkit-user-select:none;user-select:none;list-style:none;outline:none}li:hover{background-color:var(--ui-hover-color)}li:active{background-color:var(--ui-active-color)}li:focus-visible{background-color:var(--ui-hover-color);box-shadow:inset 0 0 0 2px var(--ui-primary-color)}:host([selected]) li{background-color:var(--ui-primary-color-light);color:var(--ui-primary-color)}:host([disabled]) li{opacity:.5;cursor:default;pointer-events:none}", ea = ":host{display:inline-flex;min-width:40px;color:var(--ui-text-color-muted);flex-shrink:0}::slotted(*){width:24px;height:24px}", ta = ":host{display:inline-flex;min-width:56px;flex-shrink:0}", ia = ":host{flex:1 1 auto;margin-top:4px;margin-bottom:4px}.primary{display:block;font-family:var(--ui-font-family);font-size:1rem;color:var(--ui-text-color);line-height:1.5}.secondary{display:block;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);line-height:1.43}", ra = ":host{display:block;padding:16px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--ui-text-color-muted);font-family:var(--ui-font-family);line-height:1}";
var oa = Object.defineProperty, sa = Object.getOwnPropertyDescriptor, Q = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? sa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && oa(t, i, r), r;
};
let di = class extends c {
  constructor() {
    super(...arguments), this.disablePadding = !1, this.dense = !1;
  }
  render() {
    return l`<ul role="list" style="margin: 0; padding: 0; list-style: none;"><slot></slot></ul>`;
  }
};
di.styles = p(Js);
Q([
  s({ type: Boolean, reflect: !0, attribute: "disable-padding" })
], di.prototype, "disablePadding", 2);
Q([
  s({ type: Boolean, reflect: !0 })
], di.prototype, "dense", 2);
di = Q([
  d("ui-list")
], di);
let hr = class extends c {
  render() {
    return l`<li role="listitem"><slot></slot></li>`;
  }
};
hr.styles = p(Zs);
hr = Q([
  d("ui-list-item")
], hr);
let pi = class extends c {
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
        aria-disabled=${this.disabled ? "true" : g}
        aria-current=${this.selected ? "true" : g}
        @keydown=${this._handleKeydown}
      ><slot></slot></li>
    `;
  }
};
pi.styles = p(Qs);
Q([
  s({ type: Boolean, reflect: !0 })
], pi.prototype, "disabled", 2);
Q([
  s({ type: Boolean, reflect: !0 })
], pi.prototype, "selected", 2);
pi = Q([
  d("ui-list-item-button")
], pi);
let ur = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
ur.styles = p(ea);
ur = Q([
  d("ui-list-item-icon")
], ur);
let fr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
fr.styles = p(ta);
fr = Q([
  d("ui-list-item-avatar")
], fr);
let Ut = class extends c {
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
Ut.styles = p(ia);
Q([
  s({ type: String })
], Ut.prototype, "primary", 2);
Q([
  s({ type: String })
], Ut.prototype, "secondary", 2);
Q([
  m()
], Ut.prototype, "_hasSecondarySlot", 2);
Ut = Q([
  d("ui-list-item-text")
], Ut);
let br = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
br.styles = p(ra);
br = Q([
  d("ui-list-subheader")
], br);
const aa = ":host{display:block;width:100%;overflow-x:auto;background-color:var(--ui-surface-background, white);border-radius:var(--ui-border-radius-lg, 8px);box-shadow:var(--ui-shadow-sm, 0 1px 3px rgba(0,0,0,.1))}:host([shadow]){box-shadow:var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06))}", na = ":host{display:table;width:100%;border-collapse:collapse;border-spacing:0;font-family:var(--ui-font-family);color:var(--ui-text-color)}", la = ":host{display:table-header-group}", ca = ":host{display:table-row-group}", da = ":host{display:table-row;vertical-align:middle;outline:0;transition:background-color .2s ease}:host(:hover){background-color:var(--ui-hover-color, rgba(0, 0, 0, .04))}:host([selected]){background-color:var(--ui-active-color, rgba(59, 130, 246, .08))}", pa = ':host{display:table-cell;padding:16px;font-size:.875rem;text-align:left;border-bottom:1px solid var(--ui-border-color)}:host([header]){color:var(--ui-text-color-muted);font-weight:600;line-height:1.5rem}:host([align="right"]){text-align:right}:host([align="center"]){text-align:center}:host([padding="checkbox"]){width:48px;padding:0 0 0 4px}', ha = ":host{display:table-footer-group}";
var ua = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, ke = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ua(t, i, r), r;
};
let zi = class extends c {
  constructor() {
    super(...arguments), this.shadow = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
zi.styles = p(aa);
ke([
  s({ type: Boolean, reflect: !0 })
], zi.prototype, "shadow", 2);
zi = ke([
  d("ui-table-container")
], zi);
let vr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
vr.styles = p(na);
vr = ke([
  d("ui-table")
], vr);
let mr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
mr.styles = p(la);
mr = ke([
  d("ui-table-head")
], mr);
let gr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
gr.styles = p(ca);
gr = ke([
  d("ui-table-body")
], gr);
let Ti = class extends c {
  constructor() {
    super(...arguments), this.selected = !1;
  }
  render() {
    return l`<slot></slot>`;
  }
};
Ti.styles = p(da);
ke([
  s({ type: Boolean, reflect: !0 })
], Ti.prototype, "selected", 2);
Ti = ke([
  d("ui-table-row")
], Ti);
let hi = class extends c {
  constructor() {
    super(...arguments), this.header = !1, this.align = "left";
  }
  render() {
    return l`<slot></slot>`;
  }
};
hi.styles = p(pa);
ke([
  s({ type: Boolean, reflect: !0 })
], hi.prototype, "header", 2);
ke([
  s({ type: String, reflect: !0 })
], hi.prototype, "align", 2);
hi = ke([
  d("ui-table-cell")
], hi);
let yr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
yr.styles = p(ha);
yr = ke([
  d("ui-table-footer")
], yr);
const ba = ":host{display:inline-flex;align-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;transition:color .2s}:host(:hover){color:var(--ui-text-color)}:host(.active){color:var(--ui-text-color);font-weight:700}.icon{margin-left:4px;width:18px;height:18px;transition:transform .2s ease,opacity .2s;opacity:0}:host(:hover) .icon,:host(.active) .icon{opacity:1}.icon.desc{transform:rotate(180deg)}";
var va = Object.defineProperty, ma = Object.getOwnPropertyDescriptor, io = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ma(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && va(t, i, r), r;
};
let ui = class extends c {
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
ui.styles = p(ba);
io([
  s({ type: Boolean, reflect: !0 })
], ui.prototype, "active", 2);
io([
  s({ type: String })
], ui.prototype, "direction", 2);
ui = io([
  d("ui-table-sort-label")
], ui);
const ga = ":host{display:flex;align-items:center;justify-content:flex-end;padding:8px 16px;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);border-top:1px solid var(--ui-border-color)}.spacer{flex:1 1 100%}.actions{display:flex;align-items:center;gap:16px}.nav-buttons{display:flex;gap:4px}button{background:transparent;border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ui-text-color);transition:background-color .2s}button:hover:not(:disabled){background-color:var(--ui-hover-color)}button:disabled{color:var(--ui-text-color-muted);cursor:not-allowed}select{border:none;background:transparent;font-family:inherit;font-size:inherit;color:inherit;cursor:pointer;padding:4px;outline:none}";
var ya = Object.defineProperty, xa = Object.getOwnPropertyDescriptor, Ci = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? xa(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ya(t, i, r), r;
};
let ft = class extends c {
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
          ${this.rowsPerPageOptions.map((i) => l`
            <option value=${i} ?selected=${this.rowsPerPage === i}>${i}</option>
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
ft.styles = p(ga);
Ci([
  s({ type: Number })
], ft.prototype, "count", 2);
Ci([
  s({ type: Number })
], ft.prototype, "page", 2);
Ci([
  s({ type: Number })
], ft.prototype, "rowsPerPage", 2);
Ci([
  s({ type: Array })
], ft.prototype, "rowsPerPageOptions", 2);
ft = Ci([
  d("ui-table-pagination")
], ft);
const _a = ":host{display:inline-block;position:relative}.tooltip-container{display:inline-block}.tooltip-popup{position:absolute;background-color:var(--ui-tooltip-bg);color:var(--ui-tooltip-color);padding:4px 8px;border-radius:var(--ui-border-radius-sm);font-size:.75rem;font-family:var(--ui-font-family);line-height:1.4;white-space:nowrap;z-index:1000;opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s,transform .2s;pointer-events:none;box-shadow:var(--ui-shadow-sm)}.tooltip-popup.top{bottom:100%;left:50%;transform:translate(-50%) translateY(0);margin-bottom:8px}.tooltip-popup.top.visible{transform:translate(-50%) translateY(-4px)}.tooltip-popup.bottom{top:100%;left:50%;transform:translate(-50%) translateY(0);margin-top:8px}.tooltip-popup.bottom.visible{transform:translate(-50%) translateY(4px)}.tooltip-popup.left{right:100%;top:50%;transform:translateY(-50%) translate(0);margin-right:8px}.tooltip-popup.left.visible{transform:translateY(-50%) translate(-4px)}.tooltip-popup.right{left:100%;top:50%;transform:translateY(-50%) translate(0);margin-left:8px}.tooltip-popup.right.visible{transform:translateY(-50%) translate(4px)}.tooltip-popup.visible{opacity:1;visibility:visible}.arrow{position:absolute;width:0;height:0;border-style:solid}.tooltip-popup.top .arrow{top:100%;left:50%;transform:translate(-50%);border-width:5px 5px 0 5px;border-color:var(--ui-tooltip-bg) transparent transparent transparent}.tooltip-popup.bottom .arrow{bottom:100%;left:50%;transform:translate(-50%);border-width:0 5px 5px 5px;border-color:transparent transparent var(--ui-tooltip-bg) transparent}.tooltip-popup.left .arrow{left:100%;top:50%;transform:translateY(-50%);border-width:5px 0 5px 5px;border-color:transparent transparent transparent var(--ui-tooltip-bg)}.tooltip-popup.right .arrow{right:100%;top:50%;transform:translateY(-50%);border-width:5px 5px 5px 0;border-color:transparent var(--ui-tooltip-bg) transparent transparent}";
var wa = Object.defineProperty, ka = Object.getOwnPropertyDescriptor, ii = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ka(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && wa(t, i, r), r;
};
let Qe = class extends c {
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
Qe.styles = p(_a);
ii([
  s({ type: String })
], Qe.prototype, "label", 2);
ii([
  s({ type: String })
], Qe.prototype, "placement", 2);
ii([
  s({ type: Boolean })
], Qe.prototype, "arrow", 2);
ii([
  s({ type: Boolean, reflect: !0 })
], Qe.prototype, "disabled", 2);
ii([
  m()
], Qe.prototype, "_visible", 2);
Qe = ii([
  d("ui-tooltip")
], Qe);
const $a = ":host{display:block;--ui-backdrop-color: rgba(0, 0, 0, .5);--ui-backdrop-z-index: 1200}.backdrop{position:var(--ui-backdrop-position, fixed);display:flex;align-items:center;justify-content:center;inset:0;background-color:var(--ui-backdrop-color);z-index:var(--ui-backdrop-z-index);-webkit-tap-highlight-color:transparent;opacity:0;visibility:hidden;transition:opacity .3s cubic-bezier(.4,0,.2,1),visibility .3s}:host([container]){--ui-backdrop-position: absolute}.backdrop.open{opacity:1;visibility:visible}.backdrop.invisible{background-color:transparent}.content{z-index:calc(var(--ui-backdrop-z-index) + 1)}";
var Sa = Object.defineProperty, Ca = Object.getOwnPropertyDescriptor, er = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ca(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Sa(t, i, r), r;
};
let Rt = class extends c {
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
        aria-hidden="${this.open ? g : "true"}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
Rt.styles = p($a);
er([
  s({ type: Boolean, reflect: !0 })
], Rt.prototype, "open", 2);
er([
  s({ type: Boolean })
], Rt.prototype, "invisible", 2);
er([
  s({ type: Boolean, reflect: !0 })
], Rt.prototype, "container", 2);
Rt = er([
  d("ui-backdrop")
], Rt);
const Ia = ":host{display:block}.dialog-panel{position:relative;background-color:var(--ui-surface-background, white);border-radius:var(--ui-border-radius-xl, 12px);box-shadow:var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, .1));max-width:90vw;max-height:var(--ui-dialog-max-height, 90vh);width:var(--ui-dialog-width, 444px);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:scale(.9);transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1);pointer-events:none}.dialog-panel.open{opacity:1;transform:scale(1);pointer-events:auto}.dialog-panel.transition-slide-up{transform:translateY(40px)}.dialog-panel.transition-slide-up.open{transform:translateY(0)}.dialog-panel.transition-slide-down{transform:translateY(-40px)}.dialog-panel.transition-slide-down.open{transform:translateY(0)}", Ea = ":host{display:block;padding:20px 24px 12px;font-family:var(--ui-font-family);font-size:1.25rem;font-weight:600;color:var(--ui-text-color)}", Pa = ":host{display:block;padding:0 24px 20px;flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch}", Oa = ":host{display:block;font-family:var(--ui-font-family);font-size:.9375rem;line-height:1.6;color:var(--ui-text-color-muted);margin-bottom:8px}", Da = ':host{display:flex;align-items:center;justify-content:flex-end;padding:8px 16px 16px;gap:8px;border-top:1px solid var(--ui-border-color)}:host([align="start"]){justify-content:flex-start}:host([align="center"]){justify-content:center}:host([align="space-between"]){justify-content:space-between}';
var za = Object.defineProperty, Ta = Object.getOwnPropertyDescriptor, Ge = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ta(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && za(t, i, r), r;
};
const Xe = [];
let Vt = class extends c {
  constructor() {
    super(...arguments), this.open = !1, this.transition = "scale", this.disableBackdropClose = !1, this._handleKeyDown = (e) => {
      e.key === "Escape" && this.open && Xe[Xe.length - 1] === this && this.requestClose();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._handleKeyDown);
  }
  updated(e) {
    if (super.updated(e), e.has("open"))
      if (this.open)
        Xe.includes(this) || Xe.push(this);
      else {
        const t = Xe.indexOf(this);
        t !== -1 && Xe.splice(t, 1);
      }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._handleKeyDown);
    const e = Xe.indexOf(this);
    e !== -1 && Xe.splice(e, 1);
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
Vt.styles = p(Ia);
Ge([
  s({ type: Boolean, reflect: !0 })
], Vt.prototype, "open", 2);
Ge([
  s({ type: String })
], Vt.prototype, "transition", 2);
Ge([
  s({ type: Boolean, attribute: "disable-backdrop-close" })
], Vt.prototype, "disableBackdropClose", 2);
Vt = Ge([
  d("ui-dialog")
], Vt);
let xr = class extends c {
  render() {
    return l`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`;
  }
};
xr.styles = p(Ea);
xr = Ge([
  d("ui-dialog-title")
], xr);
let _r = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
_r.styles = p(Pa);
_r = Ge([
  d("ui-dialog-content")
], _r);
let wr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
wr.styles = p(Oa);
wr = Ge([
  d("ui-dialog-content-text")
], wr);
let Ai = class extends c {
  constructor() {
    super(...arguments), this.align = "end";
  }
  render() {
    return l`<slot></slot>`;
  }
};
Ai.styles = p(Da);
Ge([
  s({ type: String, reflect: !0 })
], Ai.prototype, "align", 2);
Ai = Ge([
  d("ui-dialog-actions")
], Ai);
const Aa = ":host{display:inline-block;--ui-circular-progress-size: 40px;--ui-circular-progress-color: var(--ui-primary-color);--ui-circular-progress-thickness: 3.6}.circular-root{width:var(--ui-circular-progress-size);height:var(--ui-circular-progress-size);display:inline-block;animation:rotate 1.4s linear infinite}.circular-root.determinate{animation:none;transform:rotate(-90deg)}svg{display:block}circle{stroke:var(--ui-circular-progress-color);stroke-linecap:round;transition:stroke-dashoffset .3s ease}.indeterminate circle{animation:dash 1.4s ease-in-out infinite;stroke-dasharray:80,200;stroke-dashoffset:0}@keyframes rotate{to{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}";
var Ba = Object.defineProperty, Ma = Object.getOwnPropertyDescriptor, Ct = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ma(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ba(t, i, r), r;
};
let ue = class extends c {
  constructor() {
    super(...arguments), this.variant = "indeterminate", this.value = 0, this.size = 40, this.thickness = 3.6, this.color = "primary", this.label = "";
  }
  get _safeValue() {
    return Math.min(100, Math.max(0, this.value));
  }
  render() {
    const e = this.variant === "determinate", t = 20 - this.thickness / 2, i = 2 * Math.PI * t, o = i - this._safeValue / 100 * i, r = ue._colorMap[this.color] ?? ue._colorMap.primary;
    return l`
      <div
        class="circular-root ${u({ determinate: e, indeterminate: !e })}"
        style="--ui-circular-progress-size: ${this.size}px; --ui-circular-progress-thickness: ${this.thickness}; --ui-circular-progress-color: ${r}"
        role="progressbar"
        aria-valuenow="${e ? this._safeValue : g}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || g}"
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
ue.styles = p(Aa);
ue._colorMap = {
  primary: "#3b82f6",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b"
};
Ct([
  s({ type: String, reflect: !0 })
], ue.prototype, "variant", 2);
Ct([
  s({ type: Number, reflect: !0 })
], ue.prototype, "value", 2);
Ct([
  s({ type: Number })
], ue.prototype, "size", 2);
Ct([
  s({ type: Number })
], ue.prototype, "thickness", 2);
Ct([
  s({ type: String, reflect: !0 })
], ue.prototype, "color", 2);
Ct([
  s({ type: String })
], ue.prototype, "label", 2);
ue = Ct([
  d("ui-circular-progress")
], ue);
const La = ":host{display:block;width:100%;--ui-linear-progress-height: 4px;--ui-linear-progress-color: var(--ui-primary-color);--ui-linear-progress-bg: var(--ui-primary-color-light)}.root{position:relative;overflow:hidden;height:var(--ui-linear-progress-height);background-color:var(--ui-linear-progress-bg);border-radius:calc(var(--ui-linear-progress-height) / 2)}.bar{width:100%;position:absolute;left:0;bottom:0;top:0;transition:transform .4s linear;transform-origin:left;background-color:var(--ui-linear-progress-color);border-radius:inherit}.indeterminate .bar1{width:auto;animation:indeterminate1 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.indeterminate .bar2{width:auto;animation:indeterminate2 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}@keyframes indeterminate1{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes indeterminate2{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}";
var ja = Object.defineProperty, Ua = Object.getOwnPropertyDescriptor, ri = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ua(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ja(t, i, r), r;
};
let xe = class extends c {
  constructor() {
    super(...arguments), this.variant = "indeterminate", this.value = 0, this.height = 4, this.color = "primary", this.label = "";
  }
  get _safeValue() {
    return Math.min(100, Math.max(0, this.value));
  }
  render() {
    const e = this.variant === "determinate", t = xe._colorMap[this.color] ?? xe._colorMap.primary, i = [
      `--ui-linear-progress-height: ${this.height}px`,
      `--ui-linear-progress-color: ${t}`
    ].join("; ");
    return l`
      <div
        class="root ${u({ determinate: e, indeterminate: !e })}"
        role="progressbar"
        aria-valuenow="${e ? this._safeValue : g}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || g}"
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
xe.styles = p(La);
xe._colorMap = {
  primary: "#3b82f6",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b"
};
ri([
  s({ type: String, reflect: !0 })
], xe.prototype, "variant", 2);
ri([
  s({ type: Number, reflect: !0 })
], xe.prototype, "value", 2);
ri([
  s({ type: Number })
], xe.prototype, "height", 2);
ri([
  s({ type: String, reflect: !0 })
], xe.prototype, "color", 2);
ri([
  s({ type: String })
], xe.prototype, "label", 2);
xe = ri([
  d("ui-linear-progress")
], xe);
const Ra = ":host{display:block;border-top:1px solid var(--ui-border-color);background-color:var(--ui-surface-1);color:var(--ui-text-color);transition:margin .15s cubic-bezier(.4,0,.2,1)}:host(:first-of-type){border-top:none;border-top-left-radius:var(--ui-border-radius-md);border-top-right-radius:var(--ui-border-radius-md)}:host(:last-of-type){border-bottom-left-radius:var(--ui-border-radius-md);border-bottom-right-radius:var(--ui-border-radius-md)}:host([expanded]){margin:16px 0;border-top:none;box-shadow:var(--ui-shadow-md)}:host([expanded]:first-of-type){margin-top:0}:host([expanded]:last-of-type){margin-bottom:0}.accordion-container{display:flex;flex-direction:column}", Va = ":host{display:flex;align-items:center;padding:0 16px;min-height:48px;cursor:pointer;-webkit-user-select:none;user-select:none;transition:min-height .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}:host(:focus-visible){outline:2px solid var(--ui-primary-color);outline-offset:-2px}:host(:hover){background-color:var(--ui-hover-color)}:host([expanded]){min-height:64px}:host([disabled]){cursor:default;opacity:.5;pointer-events:none}.content{display:flex;flex-grow:1;margin:12px 0;font-family:var(--ui-font-family);font-weight:500}.expand-icon{display:flex;padding:8px;border-radius:50%;color:var(--ui-text-color-muted);transition:transform .15s cubic-bezier(.4,0,.2,1)}:host([expanded]) .expand-icon{transform:rotate(180deg)}", Na = ":host{display:grid;grid-template-rows:0fr;transition:grid-template-rows .15s cubic-bezier(.4,0,.2,1);overflow:hidden}:host([expanded]){grid-template-rows:1fr}.details-inner{min-height:0}.content{padding:8px 16px 16px;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color)}", Fa = ":host{display:none;padding:8px 16px 16px;justify-content:flex-end;gap:8px;border-top:1px solid var(--ui-border-color)}:host([expanded]){display:flex}";
var qa = Object.defineProperty, Ha = Object.getOwnPropertyDescriptor, oi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ha(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && qa(t, i, r), r;
};
let fi = class extends c {
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
fi.styles = p(Ra);
oi([
  s({ type: Boolean, reflect: !0 })
], fi.prototype, "expanded", 2);
oi([
  s({ type: Boolean, reflect: !0 })
], fi.prototype, "disabled", 2);
fi = oi([
  d("ui-accordion")
], fi);
let kr = class extends c {
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
kr.styles = p(Va);
kr = oi([
  d("ui-accordion-summary")
], kr);
let $r = class extends c {
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
$r.styles = p(Na);
$r = oi([
  d("ui-accordion-details")
], $r);
let Sr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Sr.styles = p(Fa);
Sr = oi([
  d("ui-accordion-actions")
], Sr);
const Ka = ':host{display:block;position:relative;--ui-app-bar-height: 64px;--ui-app-bar-bg: var(--ui-primary-color);--ui-app-bar-color: var(--ui-text-color-on-primary);--ui-app-bar-shadow: var(--ui-shadow-md);z-index:1100}:host([position="fixed"]){position:fixed;top:0;left:0;right:0}:host([position="absolute"]){position:absolute;top:0;left:0;right:0}:host([position="sticky"]){position:sticky;top:0}header{display:flex;align-items:center;box-sizing:border-box;width:100%;height:var(--ui-app-bar-height);padding:0 16px;background-color:var(--ui-app-bar-bg);color:var(--ui-app-bar-color);box-shadow:var(--ui-app-bar-shadow);position:relative}header.variant-outlined{background-color:var(--ui-surface-1);color:var(--ui-text-color);border-bottom:1px solid var(--ui-border-color);box-shadow:none}.title{flex-grow:1;min-width:0;margin:0 16px;font-family:var(--ui-font-family);font-size:1.25rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.left-section,.right-section{display:flex;align-items:center;flex-shrink:0;gap:8px}';
var Ya = Object.defineProperty, Ga = Object.getOwnPropertyDescriptor, tr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ga(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ya(t, i, r), r;
};
let Nt = class extends c {
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
Nt.styles = p(Ka);
tr([
  s({ type: String })
], Nt.prototype, "title", 2);
tr([
  s({ type: String, reflect: !0 })
], Nt.prototype, "position", 2);
tr([
  s({ type: String, reflect: !0 })
], Nt.prototype, "variant", 2);
Nt = tr([
  d("ui-app-bar")
], Nt);
const Wa = ":host{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 12px 8px;color:var(--ui-text-color-muted);cursor:pointer;transition:color .25s cubic-bezier(.4,0,.2,1),padding .25s cubic-bezier(.4,0,.2,1);-webkit-user-select:none;user-select:none;min-width:80px;max-width:168px}:host(:hover){background-color:var(--ui-hover-color)}:host([active]){color:var(--ui-primary-color);padding-top:8px}.icon-container{display:flex;align-items:center;justify-content:center;height:24px;margin-bottom:2px;transition:transform .25s cubic-bezier(.4,0,.2,1)}:host([active]) .icon-container{transform:scale(1.1)}.label{font-family:var(--ui-font-family);font-size:.75rem;transition:font-size .25s cubic-bezier(.4,0,.2,1),opacity .25s cubic-bezier(.4,0,.2,1);opacity:1}:host([active]) .label{font-size:.875rem}.label.hidden{opacity:0;font-size:0;pointer-events:none}";
var Xa = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, Ii = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ja(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Xa(t, i, r), r;
};
let et = class extends c {
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
et.styles = p(Wa);
Ii([
  s({ type: String })
], et.prototype, "label", 2);
Ii([
  s()
], et.prototype, "value", 2);
Ii([
  s({ type: Boolean, reflect: !0 })
], et.prototype, "active", 2);
Ii([
  s({ type: Boolean })
], et.prototype, "showLabel", 2);
et = Ii([
  d("ui-bottom-navigation-action")
], et);
const Za = ":host{display:flex;justify-content:center;height:56px;background-color:var(--ui-surface-1);box-shadow:var(--ui-shadow-lg);position:relative;width:100%}.container{display:flex;flex:1;max-width:100%}";
var Qa = Object.defineProperty, en = Object.getOwnPropertyDescriptor, ir = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? en(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Qa(t, i, r), r;
};
let Ft = class extends c {
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
      (i) => i instanceof et
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
Ft.styles = p(Za);
ir([
  s()
], Ft.prototype, "value", 2);
ir([
  s({ type: Boolean, attribute: "show-labels" })
], Ft.prototype, "showLabels", 2);
ir([
  uo({ selector: "ui-bottom-navigation-action" })
], Ft.prototype, "_actions", 2);
Ft = ir([
  d("ui-bottom-navigation")
], Ft);
const tn = ':host{display:block}.breadcrumbs-ol{display:flex;flex-wrap:wrap;align-items:center;padding:0;margin:0;list-style:none}.breadcrumb-li{display:flex;align-items:center}.separator{display:flex;-webkit-user-select:none;user-select:none;margin-left:8px;margin-right:8px;color:var(--ui-text-color-muted)}::slotted(*){font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color-muted);text-decoration:none;transition:color .2s}::slotted(a:hover){text-decoration:underline;color:var(--ui-text-color)}::slotted([aria-current="page"]),::slotted(.active){color:var(--ui-text-color);font-weight:500;pointer-events:none}.collapsed-button{display:flex;align-items:center;justify-content:center;background:var(--ui-hover-color);border:none;border-radius:4px;cursor:pointer;padding:4px 8px;font-size:1rem;line-height:1;color:var(--ui-text-color-muted);transition:background-color .2s}.collapsed-button:hover{background-color:var(--ui-active-color)}';
var rn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, nt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? on(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && rn(t, i, r), r;
};
let Pe = class extends c {
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
Pe.styles = p(tn);
nt([
  s({ type: Number, attribute: "max-items" })
], Pe.prototype, "maxItems", 2);
nt([
  s({ type: Number, attribute: "items-before" })
], Pe.prototype, "itemsBefore", 2);
nt([
  s({ type: Number, attribute: "items-after" })
], Pe.prototype, "itemsAfter", 2);
nt([
  s({ type: String })
], Pe.prototype, "separator", 2);
nt([
  m()
], Pe.prototype, "_expanded", 2);
nt([
  m()
], Pe.prototype, "_itemsCount", 2);
nt([
  m()
], Pe.prototype, "_separatorNode", 2);
Pe = nt([
  d("ui-breadcrumbs")
], Pe);
const sn = ':host{display:contents;--ui-drawer-width: 250px;--ui-drawer-mini-width: 72px;--ui-drawer-height: auto;--ui-drawer-bg: var(--ui-surface-1);--ui-drawer-z-index: 1200;--ui-drawer-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)}.backdrop{position:fixed;inset:0;background:var(--ui-backdrop-color);z-index:calc(var(--ui-drawer-z-index) - 1);opacity:0;pointer-events:none;transition:opacity .25s}:host([container]) .backdrop{position:absolute}.backdrop.open{opacity:1;pointer-events:auto}.paper{position:fixed;background:var(--ui-drawer-bg);z-index:var(--ui-drawer-z-index);display:flex;flex-direction:column;overflow-y:auto;outline:none}:host([container]) .paper{position:absolute}:host(:not([variant])) .paper,:host([variant="temporary"]) .paper{top:0;bottom:0;left:0;width:var(--ui-drawer-width);box-shadow:var(--ui-drawer-shadow);transform:translate(-100%);transition:transform .225s cubic-bezier(0,0,.2,1)}:host(:not([variant])[open]) .paper,:host([variant="temporary"][open]) .paper{transform:translate(0)}:host([variant="temporary"][anchor="right"]) .paper{left:auto;right:0;transform:translate(100%)}:host([variant="temporary"][anchor="right"][open]) .paper{transform:translate(0)}:host([variant="temporary"][anchor="top"]) .paper{inset:0 0 auto;width:auto;height:var(--ui-drawer-height);transform:translateY(-100%)}:host([variant="temporary"][anchor="top"][open]) .paper{transform:translateY(0)}:host([variant="temporary"][anchor="bottom"]) .paper{inset:auto 0 0;width:auto;height:var(--ui-drawer-height);transform:translateY(100%)}:host([variant="temporary"][anchor="bottom"][open]) .paper{transform:translateY(0)}:host([variant="persistent"]) .paper{position:relative;transform:none;box-shadow:none;transition:none;border-right:1px solid var(--ui-border-color)}:host([variant="persistent"][anchor="right"]) .paper{border-right:none;border-left:1px solid var(--ui-border-color)}:host([variant="persistent"]) .paper:not(.open){display:none}:host([variant="mini"]){display:flex}:host([variant="mini"]) .paper{position:relative;transform:none;box-shadow:none;border-right:1px solid var(--ui-border-color);width:var(--ui-drawer-mini-width);overflow-x:hidden;white-space:nowrap;transition:width .225s cubic-bezier(.4,0,.6,1);flex-shrink:0}:host([variant="mini"][anchor="right"]) .paper{border-right:none;border-left:1px solid var(--ui-border-color)}:host([variant="mini"][open]) .paper{width:var(--ui-drawer-width)}:host([variant="mini"]:not([open])) ::slotted([data-drawer-hide-mini]){opacity:0;pointer-events:none}::slotted([data-drawer-hide-mini]){transition:opacity .18s}.edge{display:none;position:fixed;background:var(--ui-drawer-bg);border:1px solid var(--ui-border-color);box-shadow:0 1px 3px #0000001f;cursor:pointer;z-index:var(--ui-drawer-z-index);align-items:center;justify-content:center}:host([container]) .edge{position:absolute}:host([edge]:not([variant])) .edge,:host([edge][variant="temporary"]) .edge{display:flex}.edge-left{left:0;top:0;bottom:0;width:16px;border-radius:0 8px 8px 0}.edge-right{right:0;top:0;bottom:0;width:16px;border-radius:8px 0 0 8px}.edge-top{top:0;left:0;right:0;height:16px;border-radius:0 0 8px 8px}.edge-bottom{bottom:0;left:0;right:0;height:16px;border-radius:8px 8px 0 0}.edge-handle{width:4px;height:32px;background:var(--ui-border-color);border-radius:2px}.edge-top .edge-handle,.edge-bottom .edge-handle{width:32px;height:4px}';
var an = Object.defineProperty, nn = Object.getOwnPropertyDescriptor, It = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? nn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && an(t, i, r), r;
};
let Re = class extends c {
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
Re.styles = p(sn);
It([
  s({ type: Boolean, reflect: !0 })
], Re.prototype, "open", 2);
It([
  s({ type: String, reflect: !0 })
], Re.prototype, "anchor", 2);
It([
  s({ type: String, reflect: !0 })
], Re.prototype, "variant", 2);
It([
  s({ type: Boolean, reflect: !0 })
], Re.prototype, "edge", 2);
It([
  s({ type: Boolean, reflect: !0 })
], Re.prototype, "container", 2);
It([
  s({ type: String })
], Re.prototype, "label", 2);
Re = It([
  d("ui-drawer")
], Re);
const ln = ':host{display:inline;--ui-link-color: var(--ui-primary-color);--ui-link-color-hover: var(--ui-primary-color-hover);--ui-link-color-visited: var(--ui-secondary-color)}a{color:var(--ui-link-color);font-family:var(--ui-font-family);font-size:inherit;font-weight:inherit;line-height:inherit;cursor:pointer;display:inline;transition:color .15s ease,opacity .15s ease}:host([color="inherit"]) a{color:inherit}:host([color="primary"]) a{color:var(--ui-primary-color)}:host([color="secondary"]) a{color:var(--ui-secondary-color)}:host([color="success"]) a{color:var(--ui-success-color)}:host([color="error"]) a{color:var(--ui-error-color)}:host([color="warning"]) a{color:var(--ui-warning-color)}:host([color="info"]) a{color:var(--ui-info-icon-color)}:host([color="textPrimary"]) a{color:var(--ui-text-color)}:host([color="textSecondary"]) a{color:var(--ui-text-color-muted)}:host([underline="none"]) a{text-decoration:none}:host([underline="hover"]) a{text-decoration:none}:host([underline="hover"]) a:hover{text-decoration:underline}:host([underline="always"]) a{text-decoration:underline}:host([underline="always"]) a:hover{text-decoration:underline}a{text-decoration:underline}a:hover{opacity:.8}a:visited{color:var(--ui-link-color-visited)}:host([color="inherit"]) a:visited{color:inherit}:host([variant="h1"]) a{font-size:6rem;font-weight:300;letter-spacing:-1.5px;line-height:1.167}:host([variant="h2"]) a{font-size:3.75rem;font-weight:300;letter-spacing:-.5px;line-height:1.2}:host([variant="h3"]) a{font-size:3rem;font-weight:400;line-height:1.167}:host([variant="h4"]) a{font-size:2.125rem;font-weight:400;letter-spacing:.25px;line-height:1.235}:host([variant="h5"]) a{font-size:1.5rem;font-weight:400;line-height:1.334}:host([variant="h6"]) a{font-size:1.25rem;font-weight:500;letter-spacing:.15px;line-height:1.6}:host([variant="subtitle1"]) a{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.75}:host([variant="subtitle2"]) a{font-size:.875rem;font-weight:500;letter-spacing:.1px;line-height:1.57}:host([variant="body1"]) a{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.5}:host([variant="body2"]) a{font-size:.875rem;font-weight:400;letter-spacing:.15px;line-height:1.43}:host([variant="caption"]) a{font-size:.75rem;font-weight:400;letter-spacing:.4px;line-height:1.66}:host([variant="overline"]) a{font-size:.75rem;font-weight:400;letter-spacing:1px;line-height:2.66;text-transform:uppercase}:host([disabled]) a{opacity:.38;cursor:not-allowed;pointer-events:none}';
var cn = Object.defineProperty, dn = Object.getOwnPropertyDescriptor, Me = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? dn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && cn(t, i, r), r;
};
let fe = class extends c {
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
                href=${pe(this.disabled ? void 0 : this.href || void 0)}
                target=${pe(this.target !== "_self" ? this.target : void 0)}
                rel=${pe(this._computedRel())}
                aria-label=${pe(this.label)}
                download=${pe(this.download)}
                aria-disabled=${this.disabled}
                tabindex=${this.disabled ? "-1" : "0"}
                @click=${this._handleClick}
            >
                <slot></slot>
            </a>
        `;
  }
};
fe.styles = p(ln);
Me([
  s({ type: String })
], fe.prototype, "href", 2);
Me([
  s({ type: String })
], fe.prototype, "target", 2);
Me([
  s({ type: String })
], fe.prototype, "rel", 2);
Me([
  s({ type: String, reflect: !0 })
], fe.prototype, "color", 2);
Me([
  s({ type: String, reflect: !0 })
], fe.prototype, "underline", 2);
Me([
  s({ type: String, reflect: !0 })
], fe.prototype, "variant", 2);
Me([
  s({ type: Boolean, reflect: !0 })
], fe.prototype, "disabled", 2);
Me([
  s({ type: String })
], fe.prototype, "download", 2);
Me([
  s({ type: String })
], fe.prototype, "label", 2);
fe = Me([
  d("ui-link")
], fe);
const pn = ':host{display:block;font-family:var(--ui-font-family);color:var(--ui-text-color)}.typography{margin:0;padding:0}.h1{font-size:6rem;font-weight:300;letter-spacing:-1.5px;line-height:1.167}.h2{font-size:3.75rem;font-weight:300;letter-spacing:-.5px;line-height:1.2}.h3{font-size:3rem;font-weight:400;line-height:1.167}.h4{font-size:2.125rem;font-weight:400;letter-spacing:.25px;line-height:1.235}.h5{font-size:1.5rem;font-weight:400;line-height:1.334}.h6{font-size:1.25rem;font-weight:500;letter-spacing:.15px;line-height:1.6}.subtitle1{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.75}.subtitle2{font-size:.875rem;font-weight:500;letter-spacing:.1px;line-height:1.57}.body1{font-size:1rem;font-weight:400;letter-spacing:.15px;line-height:1.5}.body2{font-size:.875rem;font-weight:400;letter-spacing:.15px;line-height:1.43}.caption{font-size:.75rem;font-weight:400;letter-spacing:.4px;line-height:1.66}.overline{font-size:.75rem;font-weight:400;letter-spacing:1px;line-height:2.66;text-transform:uppercase}:host([color="primary"]) .typography{color:var(--ui-primary-color)}:host([color="secondary"]) .typography{color:var(--ui-secondary-color)}:host([color="success"]) .typography{color:var(--ui-success-color)}:host([color="error"]) .typography{color:var(--ui-error-color)}:host([color="warning"]) .typography{color:var(--ui-warning-color)}:host([color="info"]) .typography{color:var(--ui-info-icon-color)}:host([color="textPrimary"]) .typography{color:var(--ui-text-color)}:host([color="textSecondary"]) .typography{color:var(--ui-text-color-muted)}:host([color="inherit"]) .typography{color:inherit}:host([align="left"]) .typography{text-align:left}:host([align="center"]) .typography{text-align:center}:host([align="right"]) .typography{text-align:right}:host([align="justify"]) .typography{text-align:justify}:host([noWrap]) .typography{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([gutterBottom]) .typography{margin-bottom:.35em}:host([paragraph]) .typography{margin-bottom:16px}';
var hn = Object.defineProperty, un = Object.getOwnPropertyDescriptor, lt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? un(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && hn(t, i, r), r;
};
let Oe = class extends c {
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
    return no`<${e} class="${t}"><slot></slot></${e}>`;
  }
};
Oe.styles = p(pn);
lt([
  s({ type: String, reflect: !0 })
], Oe.prototype, "variant", 2);
lt([
  s({ type: String, reflect: !0 })
], Oe.prototype, "color", 2);
lt([
  s({ type: String })
], Oe.prototype, "component", 2);
lt([
  s({ type: String, reflect: !0 })
], Oe.prototype, "align", 2);
lt([
  s({ type: Boolean, reflect: !0 })
], Oe.prototype, "noWrap", 2);
lt([
  s({ type: Boolean, reflect: !0 })
], Oe.prototype, "gutterBottom", 2);
lt([
  s({ type: Boolean, reflect: !0 })
], Oe.prototype, "paragraph", 2);
Oe = lt([
  d("ui-typography")
], Oe);
const fn = ":host{display:block;font-family:var(--ui-font-family)}.item{display:flex;align-items:center;gap:12px;padding:8px 16px;min-height:40px;cursor:pointer;-webkit-user-select:none;user-select:none;font-size:.9375rem;color:var(--ui-text-color);background:transparent;border:none;width:100%;text-align:left;box-sizing:border-box;transition:background .12s;position:relative;outline:none;border-radius:0}.item:hover{background:var(--ui-hover-color)}.item:active{background:var(--ui-active-color)}.item:focus-visible{background:var(--ui-hover-color);outline:2px solid var(--ui-primary-color);outline-offset:-2px}:host([selected]) .item{background:var(--ui-primary-color-light);color:var(--ui-primary-color);font-weight:600}:host([selected]) .item:hover{background:var(--ui-primary-color-light-hover)}:host([disabled]) .item{opacity:.38;cursor:not-allowed;pointer-events:none}[hidden]{display:none!important}.icon-wrap{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;color:var(--ui-text-color-muted)}:host([selected]) .icon-wrap{color:var(--ui-primary-color)}.end-icon-wrap{display:flex;align-items:center;margin-left:auto;padding-left:16px;color:var(--ui-text-color-muted);font-size:.75rem}.label{flex:1;line-height:1.5}:host([dense]) .item{padding:4px 16px;min-height:32px;font-size:.875rem}:host([divider]){border-bottom:1px solid var(--ui-border-color);padding-bottom:4px;margin-bottom:4px}", bn = ":host{display:block;height:1px;background:var(--ui-border-color);margin:4px 0}", vn = ":host{display:block}.group-label{padding:6px 16px 2px;font-size:.6875rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ui-text-color-muted);-webkit-user-select:none;user-select:none}", mn = ":host{display:block;position:relative;--ui-menu-z-index: 1300;--ui-menu-min-width: 120px}.backdrop{display:none;position:fixed;inset:0;z-index:calc(var(--ui-menu-z-index) - 1)}.backdrop.open{display:block}.menu-paper{position:absolute;background:var(--ui-surface-1);border-radius:var(--ui-border-radius-md);box-shadow:var(--ui-shadow-md),var(--ui-shadow-lg);min-width:var(--ui-menu-min-width);z-index:var(--ui-menu-z-index);overflow:hidden;transform-origin:top left;transform:scale(.85);opacity:0;visibility:hidden;pointer-events:none;transition:transform .15s cubic-bezier(.4,0,.2,1),opacity .15s cubic-bezier(.4,0,.2,1),visibility .15s;padding:4px 0}.menu-paper.open{transform:scale(1);opacity:1;visibility:visible;pointer-events:auto}.pos-bottom-start{top:100%;left:0;transform-origin:top left}.pos-bottom-end{top:100%;right:0;transform-origin:top right}.pos-top-start{bottom:100%;left:0;transform-origin:bottom left}.pos-top-end{bottom:100%;right:0;transform-origin:bottom right}.pos-right-start{left:100%;top:0;transform-origin:top left}.pos-left-start{right:100%;top:0;transform-origin:top right}.menu-paper.scrollable{max-height:var(--ui-menu-max-height, 300px);overflow-y:auto}";
var gn = Object.defineProperty, yn = Object.getOwnPropertyDescriptor, R = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && gn(t, i, r), r;
};
let De = class extends c {
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
De.styles = p(fn);
R([
  s({ type: Boolean, reflect: !0 })
], De.prototype, "selected", 2);
R([
  s({ type: Boolean, reflect: !0 })
], De.prototype, "disabled", 2);
R([
  s({ type: Boolean, reflect: !0 })
], De.prototype, "dense", 2);
R([
  s({ type: Boolean, reflect: !0 })
], De.prototype, "divider", 2);
R([
  s({ type: String, reflect: !0 })
], De.prototype, "value", 2);
R([
  m()
], De.prototype, "_hasIcon", 2);
R([
  m()
], De.prototype, "_hasEndIcon", 2);
De = R([
  d("ui-menu-item")
], De);
let Cr = class extends c {
  render() {
    return l``;
  }
};
Cr.styles = p(bn);
Cr = R([
  d("ui-menu-divider")
], Cr);
let Bi = class extends c {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return l`
            <div role="group" aria-label=${pe(this.label || void 0)}>
                ${this.label ? l`<div class="group-label">${this.label}</div>` : ""}
                <slot></slot>
            </div>
        `;
  }
};
Bi.styles = p(vn);
R([
  s({ type: String })
], Bi.prototype, "label", 2);
Bi = R([
  d("ui-menu-group")
], Bi);
let tt = class extends c {
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
          const o = e.key.toLowerCase(), r = i < 0 ? 0 : (i + 1) % t.length, n = [...t.slice(r), ...t.slice(0, r)].find((h) => (h.shadowRoot?.querySelector("slot:not([name])")?.assignedNodes({ flatten: !0 }).map((b) => b.textContent ?? "").join("").trim().toLowerCase() ?? "").startsWith(o));
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
                aria-label=${pe(this.label)}
                aria-hidden=${this.open ? "false" : "true"}
                @ui-menu-item-select=${this._handleItemSelect}
            >
                <slot></slot>
            </div>
        `;
  }
};
tt.styles = p(mn);
R([
  s({ type: Boolean, reflect: !0 })
], tt.prototype, "open", 2);
R([
  s({ type: String, reflect: !0 })
], tt.prototype, "placement", 2);
R([
  s({ type: Boolean, attribute: "close-on-select" })
], tt.prototype, "closeOnSelect", 2);
R([
  s({ type: Boolean })
], tt.prototype, "scrollable", 2);
R([
  s({ type: String })
], tt.prototype, "label", 2);
tt = R([
  d("ui-menu")
], tt);
const xn = ':host{display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px;font-family:var(--ui-font-family)}nav,ol,li{display:contents}.page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:36px;padding:0 6px;border-radius:4px;border:none;background:transparent;color:var(--ui-text-color);font-family:inherit;font-size:.875rem;font-weight:400;cursor:pointer;transition:background .15s,color .15s,border-color .15s;-webkit-user-select:none;user-select:none;box-sizing:border-box;outline:none;text-decoration:none}.page-btn:hover:not(:disabled){background:var(--ui-hover-color)}.page-btn:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:2px}.page-btn.active{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:600}.page-btn:disabled{opacity:.38;cursor:default;pointer-events:none}.page-btn.ellipsis{cursor:default;pointer-events:none;color:var(--ui-text-color-muted)}:host([variant="outlined"]) .page-btn{border:1px solid var(--ui-border-color)}:host([variant="outlined"]) .page-btn.active{border-color:var(--ui-primary-color);background:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}:host([variant="outlined"]) .page-btn:hover:not(:disabled):not(.active){background:var(--ui-primary-color-light);border-color:var(--ui-primary-color)}:host([color="secondary"]) .page-btn.active{background:var(--ui-secondary-color)}:host([color="secondary"][variant="outlined"]) .page-btn.active{background:var(--ui-secondary-color);border-color:var(--ui-secondary-color)}:host([color="standard"]) .page-btn.active{background:var(--ui-text-color);color:var(--ui-text-color-on-primary)}:host([shape="rounded"]) .page-btn{border-radius:8px}:host([shape="circular"]) .page-btn{border-radius:50%;min-width:36px;aspect-ratio:1}:host([size="small"]) .page-btn{min-width:28px;height:28px;font-size:.8125rem}:host([size="small"][shape="circular"]) .page-btn{min-width:28px}:host([size="large"]) .page-btn{min-width:44px;height:44px;font-size:.9375rem}:host([disabled]) .page-btn{opacity:.38;pointer-events:none}svg{display:block}';
var _n = Object.defineProperty, wn = Object.getOwnPropertyDescriptor, K = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _n(t, i, r), r;
};
const kn = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`, $n = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`, Sn = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`, Cn = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`, In = l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
function nr(e, t) {
  return Array.from({ length: t - e + 1 }, (i, o) => e + o);
}
function En(e, t, i, o) {
  const r = nr(1, Math.min(o, e)), a = nr(Math.max(e - o + 1, o + 1), e), n = Math.max(
    Math.min(t - i, e - o - i * 2 - 1),
    o + 2
  ), h = Math.min(
    Math.max(t + i, o + i * 2 + 2),
    a.length > 0 ? a[0] - 2 : e - 1
  ), f = [
    ...r,
    ...n > o + 2 ? ["start-ellipsis"] : o + 1 < e - o ? [o + 1] : [],
    ...nr(n, h),
    ...h < e - o - 1 ? ["end-ellipsis"] : e - o > o ? [e - o] : [],
    ...a
  ], y = /* @__PURE__ */ new Set();
  return f.filter((b) => {
    const S = String(b);
    return y.has(S) ? !1 : (y.add(S), !0);
  });
}
let A = class extends c {
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
    return a ? g : l`
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
    const e = this._safeCount, t = this._safePage, i = En(e, t, this.siblingCount, this.boundaryCount), o = this.label || "pagination navigation";
    return l`
            <nav aria-label=${o}>
                <ol>
                    ${this._renderNavBtn("Go to first page", "first-icon", kn, () => this._go(1), t === 1, !this.showFirstButton)}
                    ${this._renderNavBtn("Go to previous page", "prev-icon", Sn, () => this._go(t - 1), t === 1, this.hidePrevButton)}

                    ${i.map((r) => {
      if (r === "start-ellipsis" || r === "end-ellipsis")
        return l`
                            <li>
                                <button class="page-btn ellipsis" tabindex="-1" aria-hidden="true">
                                    <slot name="ellipsis-icon">${In}</slot>
                                </button>
                            </li>`;
      const a = r === t;
      return l`
                        <li>
                            <button
                                class=${u({ "page-btn": !0, active: a })}
                                aria-label=${"Page " + r}
                                aria-current=${a ? "page" : g}
                                ?disabled=${this.disabled}
                                @click=${() => this._go(r)}
                            >${r}</button>
                        </li>
                    `;
    })}

                    ${this._renderNavBtn("Go to next page", "next-icon", Cn, () => this._go(t + 1), t === e, this.hideNextButton)}
                    ${this._renderNavBtn("Go to last page", "last-icon", $n, () => this._go(e), t === e, !this.showLastButton)}
                </ol>
            </nav>
        `;
  }
};
A.styles = p(xn);
K([
  s({ type: Number })
], A.prototype, "count", 2);
K([
  s({ type: Number })
], A.prototype, "page", 2);
K([
  s({ type: Number, attribute: "default-page" })
], A.prototype, "defaultPage", 2);
K([
  s({ type: String })
], A.prototype, "label", 2);
K([
  s({ type: String, reflect: !0 })
], A.prototype, "variant", 2);
K([
  s({ type: String, reflect: !0 })
], A.prototype, "shape", 2);
K([
  s({ type: String, reflect: !0 })
], A.prototype, "size", 2);
K([
  s({ type: String, reflect: !0 })
], A.prototype, "color", 2);
K([
  s({ type: Boolean, reflect: !0, attribute: "show-first-button" })
], A.prototype, "showFirstButton", 2);
K([
  s({ type: Boolean, reflect: !0, attribute: "show-last-button" })
], A.prototype, "showLastButton", 2);
K([
  s({ type: Boolean, reflect: !0, attribute: "hide-prev-button" })
], A.prototype, "hidePrevButton", 2);
K([
  s({ type: Boolean, reflect: !0, attribute: "hide-next-button" })
], A.prototype, "hideNextButton", 2);
K([
  s({ type: Number, attribute: "sibling-count" })
], A.prototype, "siblingCount", 2);
K([
  s({ type: Number, attribute: "boundary-count" })
], A.prototype, "boundaryCount", 2);
K([
  s({ type: Boolean, reflect: !0 })
], A.prototype, "disabled", 2);
A = K([
  d("ui-pagination")
], A);
const Pn = ':host{display:flex;align-items:center;position:relative;--action-size: 40px}.action-btn{display:inline-flex;align-items:center;justify-content:center;width:var(--action-size);height:var(--action-size);border-radius:50%;background:var(--ui-surface-1);color:var(--ui-text-color);border:none;cursor:pointer;box-shadow:0 3px 5px -1px #0003,0 6px 10px #00000024;transition:background .15s,box-shadow .15s,transform .15s;flex-shrink:0;outline:none;font-size:1.25rem}.action-btn:hover{background:var(--ui-surface-2);box-shadow:0 5px 8px -1px #00000040,0 8px 12px #00000029;transform:scale(1.08)}.action-btn:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:3px}:host([disabled]) .action-btn{opacity:.38;pointer-events:none}.tooltip{position:absolute;background:var(--ui-tooltip-bg);color:var(--ui-tooltip-text-color);font-family:var(--ui-font-family);font-size:.75rem;font-weight:500;letter-spacing:.02em;padding:4px 10px;border-radius:5px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}.tooltip.visible{opacity:1}:host([tooltip-placement="left"]) .tooltip{right:calc(100% + 10px);top:50%;transform:translateY(-50%)}:host([tooltip-placement="right"]) .tooltip{left:calc(100% + 10px);top:50%;transform:translateY(-50%)}:host([tooltip-placement="top"]) .tooltip{bottom:calc(100% + 10px);left:50%;transform:translate(-50%)}:host([tooltip-placement="bottom"]) .tooltip{top:calc(100% + 10px);left:50%;transform:translate(-50%)}', On = ':host{display:inline-flex;flex-direction:column;align-items:center;position:relative;--fab-size: 56px;--fab-bg: var(--ui-primary-color);--fab-color: var(--ui-text-color-on-primary);--action-gap: 12px}.actions{display:flex;align-items:center;gap:var(--action-gap)}:host([direction="up"]) .actions{flex-direction:column-reverse;margin-bottom:var(--action-gap)}:host([direction="down"]) .actions{flex-direction:column;margin-top:var(--action-gap)}:host([direction="left"]) .actions{flex-direction:row-reverse;margin-right:var(--action-gap)}:host([direction="right"]) .actions{flex-direction:row;margin-left:var(--action-gap)}:host([direction="up"]),:host([direction="down"]){flex-direction:column;align-items:center}:host([direction="left"]),:host([direction="right"]){flex-direction:row;align-items:center}:host([direction="up"]){flex-direction:column-reverse}.fab{display:inline-flex;align-items:center;justify-content:center;width:var(--fab-size);height:var(--fab-size);border-radius:50%;background:var(--fab-bg);color:var(--fab-color);border:none;cursor:pointer;box-shadow:0 6px 10px -2px #00000040,0 4px 5px #00000024;outline:none;font-size:1.5rem;transition:box-shadow .2s,background .2s;flex-shrink:0;position:relative;z-index:1}.fab:hover{box-shadow:0 8px 14px -2px #0000004d,0 6px 8px #00000029;background:var(--fab-bg-hover, var(--ui-primary-color-hover))}.fab:focus-visible{outline:3px solid var(--ui-primary-color);outline-offset:3px}.fab-icon{display:flex;align-items:center;justify-content:center;transition:transform .25s cubic-bezier(.4,0,.2,1),opacity .2s}.fab-icon.close-icon{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:rotate(-45deg)}:host([open]) .fab-icon.open-icon{opacity:0;transform:rotate(45deg)}:host([open]) .fab-icon.close-icon{opacity:1;transform:rotate(0)}::slotted(ui-speed-dial-action){opacity:0;transform:scale(.6);transition:opacity .18s ease,transform .18s cubic-bezier(.4,0,.2,1);pointer-events:none}:host([open]) ::slotted(ui-speed-dial-action){opacity:1;transform:scale(1);pointer-events:auto}.backdrop{display:none;position:fixed;inset:0;z-index:-1}:host([open]) .backdrop{display:block}:host([disabled]) .fab{opacity:.38;pointer-events:none;cursor:default}:host([hidden]){display:none!important}svg{display:block}';
var Dn = Object.defineProperty, zn = Object.getOwnPropertyDescriptor, V = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Dn(t, i, r), r;
};
let Ve = class extends c {
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
                <div class="tooltip ${u({ visible: this._tooltipVisible })}">
                    ${this.tooltipTitle}
                </div>
            ` : g}
        `;
  }
};
Ve.styles = p(Pn);
V([
  s({ type: String })
], Ve.prototype, "name", 2);
V([
  s({ type: String, attribute: "tooltip-title" })
], Ve.prototype, "tooltipTitle", 2);
V([
  s({ type: Boolean, attribute: "tooltip-open" })
], Ve.prototype, "tooltipOpen", 2);
V([
  s({ type: String, reflect: !0, attribute: "tooltip-placement" })
], Ve.prototype, "tooltipPlacement", 2);
V([
  s({ type: Boolean, reflect: !0 })
], Ve.prototype, "disabled", 2);
V([
  m()
], Ve.prototype, "_hovered", 2);
Ve = V([
  d("ui-speed-dial-action")
], Ve);
let be = class extends c {
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
            const h = this._actionButtons();
            h[n ? 0 : h.length - 1]?.focus();
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
      const h = o ? r - 1 - n : n, f = o ? n : r - 1 - n;
      a.style.transitionDelay = this.open ? `${h * 40}ms` : `${f * 30}ms`;
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
                aria-disabled=${this.disabled ? "true" : g}
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
be.styles = p(On);
V([
  s({ type: Boolean, reflect: !0 })
], be.prototype, "open", 2);
V([
  s({ type: Boolean, attribute: "default-open" })
], be.prototype, "defaultOpen", 2);
V([
  s({ type: String, reflect: !0 })
], be.prototype, "direction", 2);
V([
  s({ type: Boolean, reflect: !0 })
], be.prototype, "hidden", 2);
V([
  s({ type: Boolean, reflect: !0 })
], be.prototype, "disabled", 2);
V([
  s({ type: Boolean, attribute: "persistent-tooltips" })
], be.prototype, "persistentTooltips", 2);
V([
  s({ type: String, attribute: "close-icon" })
], be.prototype, "closeIcon", 2);
V([
  s({ type: String, attribute: "aria-label" })
], be.prototype, "ariaLabel", 2);
V([
  s({ type: Boolean, attribute: "is-touch" })
], be.prototype, "isTouch", 2);
be = V([
  d("ui-speed-dial")
], be);
const Tn = ':host{display:block}.line{background:var(--ui-stepper-connector-color);border-radius:2px;transition:background .3s}.line.completed{background:var(--ui-primary-color)}:host([orientation="horizontal"]) .line{height:2px;width:100%}:host([orientation="vertical"]) .line{width:2px;min-height:24px;margin:0 auto}', An = ":host{display:block}.label{font-size:.875rem;font-weight:500;color:var(--ui-text-color);font-family:var(--ui-font-family);line-height:1.4}.optional{font-size:.75rem;color:var(--ui-text-color-muted);font-style:italic}:host([active]) .label{color:var(--ui-primary-color);font-weight:600}:host([disabled]) .label{color:var(--ui-text-color-muted)}:host([error]) .label{color:var(--ui-error-color)}", Bn = ":host{display:block;overflow:hidden}.panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .25s ease}.panel.open{grid-template-rows:1fr}.inner{overflow:hidden;padding:0 16px;transition:padding .25s ease}.panel.open .inner{padding:8px 16px 16px}.content{font-size:.875rem;color:var(--ui-text-color);font-family:var(--ui-font-family)}", Mn = ':host{display:flex;flex:1 1 0;min-width:0;font-family:var(--ui-font-family)}:host([orientation="horizontal"]){align-items:flex-start;padding-top:4px}:host([orientation="vertical"]){flex-direction:column;flex:none;width:100%}:host([alternative-label]){flex-direction:column;align-items:center;flex:1;min-width:0}.conn-wrap{flex:1 1 auto;min-width:12px;display:flex;align-items:flex-start;padding-top:15px}.conn-wrap ui-step-connector{flex:1}.alt-top{display:flex;align-items:center;width:100%}.alt-top .conn-fill{flex:1;display:flex;align-items:center}.alt-top .conn-fill ui-step-connector{flex:1}.step-header{display:flex;align-items:flex-start;gap:14px;min-width:0}.step-header ui-step-label,.step-btn ui-step-label{padding-top:5px;min-width:0}:host([alternative-label]) .alt-label-row{margin-top:8px;text-align:center;min-width:0;width:100%}.step-btn{background:none;border:none;padding:0;cursor:pointer;font-family:inherit;border-radius:6px;outline:none;display:flex;align-items:flex-start;gap:14px;min-width:0;text-align:left}.step-btn:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:3px}:host([disabled]) .step-btn{cursor:default}:host([alternative-label]) .step-btn{flex-direction:column;align-items:center;gap:0}.v-body{display:flex;margin-left:15px;min-height:16px}.v-line{width:2px;background:var(--ui-stepper-connector-color);border-radius:2px;flex-shrink:0;transition:background .3s;margin-right:14px}.v-line.completed{background:var(--ui-primary-color)}:host([last]) .v-line{background:transparent}.v-content{flex:1;padding-bottom:8px;min-width:0}.icon-circle{width:var(--ui-stepper-icon-size, 32px);height:var(--ui-stepper-icon-size, 32px);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8125rem;font-weight:700;border:2px solid var(--ui-input-border-color);color:var(--ui-text-color-muted);background:transparent;transition:all .2s;flex-shrink:0;box-sizing:border-box}.icon-circle.active{background:var(--ui-primary-color);border-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary);box-shadow:0 0 0 4px var(--ui-primary-focus-ring)}.icon-circle.completed{background:var(--ui-primary-color);border-color:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.icon-circle.error{border-color:var(--ui-error-color);color:var(--ui-error-color)}:host([disabled]) .icon-circle{opacity:.4}', Ln = ":host{display:block;font-family:var(--ui-font-family)}.stepper{display:flex;padding:16px 24px;background:var(--ui-surface-1)}.stepper.horizontal{align-items:stretch;flex-direction:row}.stepper.vertical{flex-direction:column;gap:0}.stepper.alt{align-items:flex-start}", jn = ':host{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;gap:8px;background:var(--ui-surface-1);font-family:var(--ui-font-family)}:host([position="static"]){border:1px solid var(--ui-border-color);border-radius:8px}:host([position="bottom"]){border-top:1px solid var(--ui-border-color)}:host([position="top"]){border-bottom:1px solid var(--ui-border-color)}.progress{display:flex;align-items:center;justify-content:center;flex:1;gap:0}.text{font-size:.8rem;color:var(--ui-text-color-muted)}.dots{display:flex;gap:6px}.dot{width:10px;height:10px;border-radius:50%;background:var(--ui-input-border-color);transition:background .2s}.dot.active{background:var(--ui-primary-color)}.bar-track{flex:1;height:4px;background:var(--ui-border-color);border-radius:2px;overflow:hidden}.bar-fill{height:100%;background:var(--ui-primary-color);border-radius:2px;transition:width .3s}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.nav-btn{padding:6px 14px;border-radius:6px;font-size:.8rem;font-family:inherit;cursor:pointer;transition:opacity .15s}.nav-btn:disabled{opacity:.38;cursor:default}.nav-btn.back{background:var(--ui-surface-1);color:var(--ui-text-color);border:1px solid var(--ui-border-color)}.nav-btn.next{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);border:none}';
var Un = Object.defineProperty, Rn = Object.getOwnPropertyDescriptor, _ = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Rn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Un(t, i, r), r;
};
const Vn = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`, Nn = l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
let bi = class extends c {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.completed = !1;
  }
  render() {
    return l`<div class="line ${u({ completed: this.completed })}"></div>`;
  }
};
bi.styles = p(Tn);
_([
  s({ reflect: !0 })
], bi.prototype, "orientation", 2);
_([
  s({ type: Boolean })
], bi.prototype, "completed", 2);
bi = _([
  d("ui-step-connector")
], bi);
let qt = class extends c {
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
qt.styles = p(An);
_([
  s({ type: Boolean, reflect: !0 })
], qt.prototype, "active", 2);
_([
  s({ type: Boolean, reflect: !0 })
], qt.prototype, "disabled", 2);
_([
  s({ type: Boolean, reflect: !0 })
], qt.prototype, "error", 2);
qt = _([
  d("ui-step-label")
], qt);
let Mi = class extends c {
  constructor() {
    super(...arguments), this.open = !0;
  }
  render() {
    return l`
            <div
                class="panel ${u({ open: this.open })}"
                aria-hidden=${this.open ? "false" : "true"}
            >
                <div class="inner">
                    <div class="content"><slot></slot></div>
                </div>
            </div>`;
  }
};
Mi.styles = p(Bn);
_([
  s({ type: Boolean, reflect: !0 })
], Mi.prototype, "open", 2);
Mi = _([
  d("ui-step-content")
], Mi);
let W = class extends c {
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
    const e = { "icon-circle": !0, active: this.active, completed: this.completed, error: this.error }, t = this.error ? Nn : this.completed ? Vn : l`<slot name="icon">${this.stepIndex + 1}</slot>`;
    return l`<div class=${u(e)}>${t}</div>`;
  }
  _label() {
    return l`
            <ui-step-label ?active=${this.active} ?disabled=${this.disabled} ?error=${this.error}>
                <slot name="label"></slot>
                ${this.optional ? l`<span slot="optional">${this.optionalLabel}</span>` : g}
            </ui-step-label>`;
  }
  _connector(e = !1) {
    return l`<ui-step-connector orientation=${this.orientation} ?completed=${e}></ui-step-connector>`;
  }
  render() {
    const e = this.stepIndex > 0;
    if (this.orientation === "vertical") {
      const i = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : g}>${this._icon()} ${this._label()}</button>` : l`<div class="step-header">${this._icon()} ${this._label()}</div>`;
      return l`
                ${i}
                <div class="v-body">
                    <div class="v-line ${u({ completed: this.completed })}"></div>
                    <div class="v-content"><slot></slot></div>
                </div>`;
    }
    if (this.alternativeLabel) {
      const i = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : g}>${this._icon()}</button>` : this._icon();
      return l`
                <div class="alt-top">
                    <div class="conn-fill">${e ? this._connector(this.prevCompleted) : g}</div>
                    ${i}
                    <div class="conn-fill"></div>
                </div>
                <div class="alt-label-row">${this._label()}</div>`;
    }
    const t = this.clickable ? l`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? "step" : g}>${this._icon()} ${this._label()}</button>` : l`<div class="step-header">${this._icon()} ${this._label()}</div>`;
    return l`
            ${e ? l`<div class="conn-wrap">${this._connector(this.prevCompleted)}</div>` : g}
            ${t}`;
  }
};
W.styles = p(Mn);
_([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "active", 2);
_([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "completed", 2);
_([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "disabled", 2);
_([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "optional", 2);
_([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "error", 2);
_([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "last", 2);
_([
  s({ type: Boolean, reflect: !0 })
], W.prototype, "clickable", 2);
_([
  s({ type: String, reflect: !0 })
], W.prototype, "orientation", 2);
_([
  s({ type: Boolean, reflect: !0, attribute: "alternative-label" })
], W.prototype, "alternativeLabel", 2);
_([
  s({ type: Number, attribute: "step-index" })
], W.prototype, "stepIndex", 2);
_([
  s({ type: String, attribute: "optional-label" })
], W.prototype, "optionalLabel", 2);
_([
  s({ type: Boolean, attribute: "prev-completed" })
], W.prototype, "prevCompleted", 2);
W = _([
  d("ui-step")
], W);
let it = class extends c {
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
it.styles = p(Ln);
_([
  s({ type: Number, attribute: "active-step" })
], it.prototype, "activeStep", 2);
_([
  s({ type: String, reflect: !0 })
], it.prototype, "orientation", 2);
_([
  s({ type: Boolean, attribute: "alternative-label" })
], it.prototype, "alternativeLabel", 2);
_([
  s({ type: Boolean, attribute: "non-linear" })
], it.prototype, "nonLinear", 2);
_([
  s({ type: String })
], it.prototype, "label", 2);
it = _([
  d("ui-stepper")
], it);
let Ne = class extends c {
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
Ne.styles = p(jn);
_([
  s({ type: Number })
], Ne.prototype, "steps", 2);
_([
  s({ type: Number, attribute: "active-step" })
], Ne.prototype, "activeStep", 2);
_([
  s({ type: String })
], Ne.prototype, "variant", 2);
_([
  s({ type: String, reflect: !0 })
], Ne.prototype, "position", 2);
_([
  s({ type: String, attribute: "back-label" })
], Ne.prototype, "backLabel", 2);
_([
  s({ type: String, attribute: "next-label" })
], Ne.prototype, "nextLabel", 2);
Ne = _([
  d("ui-mobile-stepper")
], Ne);
const Fn = ":host{display:inline-flex;position:relative;background:var(--ui-background)}:host([full-width]){flex:1}.tab{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 16px;min-height:48px;border:none;background:none;cursor:pointer;font-family:var(--ui-font-family);font-size:.875rem;font-weight:500;line-height:1.25;color:var(--ui-tab-inactive-color);white-space:nowrap;border-radius:0;outline:none;transition:color .2s,background .15s;box-sizing:border-box;width:100%;text-decoration:none;-webkit-tap-highlight-color:transparent}.tab:hover:not(:disabled):not([aria-disabled=true]){color:var(--ui-tab-active-color);background:var(--ui-primary-color-light)}.tab:focus-visible{outline:2px solid var(--ui-tab-active-color);outline-offset:-2px}:host([selected]) .tab{color:var(--ui-tab-active-color);font-weight:600}.tab:disabled{opacity:.38;cursor:not-allowed}.icon-top{flex-direction:column;min-height:72px}.icon-bottom{flex-direction:column-reverse;min-height:72px}.icon-start{flex-direction:row}.icon-end{flex-direction:row-reverse}.icon-slot{display:contents;line-height:0}", qn = ":host{display:block;background:var(--ui-background)}:host([hidden]){display:none!important}.panel{padding:24px;font-family:var(--ui-font-family);font-size:.875rem;color:var(--ui-text-color);line-height:1.6}", Hn = ':host{display:block;position:relative;background:var(--ui-background)}:host([orientation="vertical"]){height:100%}:host([orientation="vertical"]) .container{height:100%}.container{display:flex;align-items:center;position:relative;border-bottom:1px solid var(--ui-border-color)}:host([orientation="vertical"]) .container{flex-direction:column;border-bottom:none;border-right:1px solid var(--ui-border-color);align-items:stretch}.scroll-btn{flex-shrink:0;display:flex;align-items:center;justify-content:center;border:none;background:none;cursor:pointer;color:var(--ui-text-color-muted);border-radius:4px;padding:0;transition:color .15s,background .15s}:host(:not([orientation="vertical"])) .scroll-btn{width:40px;height:40px}:host([orientation="vertical"]) .scroll-btn{width:100%;height:40px}.scroll-btn:hover:not(:disabled){color:var(--ui-text-color);background:var(--ui-hover-color)}.scroll-btn:disabled{opacity:.38;cursor:default}.scroll-area{flex:1;position:relative;min-height:0;scrollbar-width:none;-ms-overflow-style:none}.scroll-area::-webkit-scrollbar{display:none}:host(:not([orientation="vertical"])) .scroll-area{overflow-x:auto;overflow-y:hidden}:host([orientation="vertical"]) .scroll-area{overflow-y:auto;overflow-x:hidden}.tabs-row{display:flex;position:relative;min-width:max-content}:host([orientation="vertical"]) .tabs-row{flex-direction:column;min-width:unset;min-height:max-content}:host([variant="fullWidth"]) .tabs-row{min-width:100%}:host([variant="fullWidth"]) ::slotted(ui-tab){flex:1}:host([centered]) .tabs-row{justify-content:center;min-width:100%}.indicator{position:absolute;pointer-events:none;opacity:0;background:var(--ui-tabs-ind-color, var(--ui-primary-color));border-radius:3px;transition:left .25s cubic-bezier(.4,0,.2,1),width .25s cubic-bezier(.4,0,.2,1),top .25s cubic-bezier(.4,0,.2,1),height .25s cubic-bezier(.4,0,.2,1),opacity .15s}:host(:not([orientation="vertical"])) .indicator{bottom:0;height:3px}:host([orientation="vertical"]) .indicator{right:0;width:3px}', Kn = ':host{display:block;font-family:var(--ui-font-family);background:var(--ui-background)}:host([orientation="vertical"]) .root{display:flex;flex-direction:row;height:100%;min-height:inherit}.root{display:block}';
var Yn = Object.defineProperty, Gn = Object.getOwnPropertyDescriptor, $ = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Gn(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Yn(t, i, r), r;
};
const rr = (e) => l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${e}"/></svg>`, Wn = () => rr("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"), Xn = () => rr("M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"), Jn = () => rr("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"), Zn = () => rr("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
let Fe = class extends c {
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
Fe.styles = p(Fn);
$([
  s({ reflect: !0 })
], Fe.prototype, "value", 2);
$([
  s({ type: Boolean, reflect: !0 })
], Fe.prototype, "disabled", 2);
$([
  s({ type: Boolean, reflect: !0 })
], Fe.prototype, "selected", 2);
$([
  s({ attribute: "icon-position", reflect: !0 })
], Fe.prototype, "iconPosition", 2);
$([
  s()
], Fe.prototype, "href", 2);
$([
  s({ type: Boolean, reflect: !0, attribute: "full-width" })
], Fe.prototype, "fullWidth", 2);
Fe = $([
  d("ui-tab")
], Fe);
let Li = class extends c {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return l`<div class="panel" role="tabpanel"><slot></slot></div>`;
  }
};
Li.styles = p(qn);
$([
  s({ reflect: !0 })
], Li.prototype, "value", 2);
Li = $([
  d("ui-tab-panel")
], Li);
let se = class extends c {
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
    const r = this._tabs().filter((h) => !h.disabled), a = r.findIndex((h) => h.contains(document.activeElement) || h === document.activeElement);
    let n = a < 0 ? 0 : a;
    e.key === i && (n = (n - 1 + r.length) % r.length), e.key === o && (n = (n + 1) % r.length), e.key === "Home" && (n = 0), e.key === "End" && (n = r.length - 1), r[n]?.focusInner(), r[n]?.dispatchEvent(new CustomEvent("ui-tab-click", {
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
                ${t ? Jn() : Wn()}
            </button>` : g, o = e ? l`
            <button class="scroll-btn" aria-label="Scroll forward"
                ?disabled=${!this._canFwd}
                @click=${() => this._scroll(200)}>
                ${t ? Zn() : Xn()}
            </button>` : g;
    return l`
            <div class="container">
                ${i}
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
se.styles = p(Hn);
$([
  s({ reflect: !0 })
], se.prototype, "orientation", 2);
$([
  s({ reflect: !0 })
], se.prototype, "variant", 2);
$([
  s({ type: Boolean, reflect: !0 })
], se.prototype, "centered", 2);
$([
  s({ attribute: "scroll-buttons" })
], se.prototype, "scrollButtons", 2);
$([
  m()
], se.prototype, "_canBack", 2);
$([
  m()
], se.prototype, "_canFwd", 2);
$([
  wi(".scroll-area")
], se.prototype, "_area", 2);
$([
  wi(".tabs-row")
], se.prototype, "_row", 2);
$([
  wi(".indicator")
], se.prototype, "_ind", 2);
$([
  wi("slot")
], se.prototype, "_slot", 2);
se = $([
  d("ui-tab-list")
], se);
let ze = class extends c {
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
    const e = this.querySelector("ui-tab-list"), t = Array.from(this.querySelectorAll("ui-tab")), i = Array.from(this.querySelectorAll("ui-tab-panel"));
    let o = this.value;
    if (!o) {
      const n = t.find((h) => !h.disabled);
      n && (o = n.value);
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
ze.styles = p(Kn);
$([
  s({ reflect: !0 })
], ze.prototype, "value", 2);
$([
  s({ reflect: !0 })
], ze.prototype, "orientation", 2);
$([
  s()
], ze.prototype, "variant", 2);
$([
  s({ type: Boolean })
], ze.prototype, "centered", 2);
$([
  s({ attribute: "scroll-buttons" })
], ze.prototype, "scrollButtons", 2);
$([
  s({ attribute: "text-color" })
], ze.prototype, "textColor", 2);
$([
  s({ attribute: "indicator-color" })
], ze.prototype, "indicatorColor", 2);
ze = $([
  d("ui-tabs")
], ze);
const Qn = ":host{display:block}";
var el = Object.defineProperty, tl = Object.getOwnPropertyDescriptor, k = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? tl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && el(t, i, r), r;
};
const il = /* @__PURE__ */ new Set([
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
    return il.has(this.component) ? this.component : (console.warn(`[ui-box] Unknown component tag "${this.component}", falling back to "div".`), "div");
  }
  _getStyles() {
    const e = {};
    return this.m && (e.margin = this.m), this.mx && (e.marginLeft = this.mx, e.marginRight = this.mx), this.my && (e.marginTop = this.my, e.marginBottom = this.my), this.mt && (e.marginTop = this.mt), this.mr && (e.marginRight = this.mr), this.mb && (e.marginBottom = this.mb), this.ml && (e.marginLeft = this.ml), this.p && (e.padding = this.p), this.px && (e.paddingLeft = this.px, e.paddingRight = this.px), this.py && (e.paddingTop = this.py, e.paddingBottom = this.py), this.pt && (e.paddingTop = this.pt), this.pr && (e.paddingRight = this.pr), this.pb && (e.paddingBottom = this.pb), this.pl && (e.paddingLeft = this.pl), this.display && (e.display = this.display), this.flexDirection && (e.flexDirection = this.flexDirection), this.alignItems && (e.alignItems = this.alignItems), this.justifyContent && (e.justifyContent = this.justifyContent), this.flexWrap && (e.flexWrap = this.flexWrap), this.flexBasis && (e.flexBasis = this.flexBasis), this.flexGrow && (e.flexGrow = this.flexGrow), this.flexShrink && (e.flexShrink = this.flexShrink), this.gap && (e.gap = this.gap), this.bgcolor && (e.backgroundColor = this.bgcolor === "primary" ? "var(--ui-primary-color)" : this.bgcolor === "secondary" ? "var(--ui-secondary-color)" : this.bgcolor), this.color && (e.color = this.color === "primary" ? "var(--ui-primary-color)" : this.color === "secondary" ? "var(--ui-secondary-color)" : this.color), this.border && (e.border = this.border), this.borderRadius && (e.borderRadius = this.borderRadius), this.boxShadow && (e.boxShadow = this.boxShadow), this.width && (e.width = this.width), this.height && (e.height = this.height), e;
  }
  render() {
    const e = fo(this._safeComponent);
    return no`
      <${e} style=${ei(this._getStyles())}>
        <slot></slot>
      </${e}>
    `;
  }
};
w.styles = p(Qn);
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
const rl = ":host{display:block}.container{width:100%;margin-left:auto;margin-right:auto;box-sizing:border-box;padding-left:var(--ui-container-padding, 16px);padding-right:var(--ui-container-padding, 16px)}@media(min-width:600px){.container{padding-left:var(--ui-container-padding-sm, 24px);padding-right:var(--ui-container-padding-sm, 24px)}}.disable-gutters{padding-left:0;padding-right:0}.max-width-xs{max-width:var(--ui-container-xs, 444px)}.max-width-sm{max-width:var(--ui-container-sm, 600px)}.max-width-md{max-width:var(--ui-container-md, 900px)}.max-width-lg{max-width:var(--ui-container-lg, 1200px)}.max-width-xl{max-width:var(--ui-container-xl, 1536px)}.fixed{max-width:var(--ui-container-xs, 444px)}@media(min-width:600px){.fixed{max-width:var(--ui-container-sm, 600px)}}@media(min-width:900px){.fixed{max-width:var(--ui-container-md, 900px)}}@media(min-width:1200px){.fixed{max-width:var(--ui-container-lg, 1200px)}}@media(min-width:1536px){.fixed{max-width:var(--ui-container-xl, 1536px)}}@media(min-width:600px){.fixed.max-width-xs{max-width:var(--ui-container-xs, 444px)}}@media(min-width:900px){.fixed.max-width-sm{max-width:var(--ui-container-sm, 600px)}}@media(min-width:1200px){.fixed.max-width-md{max-width:var(--ui-container-md, 900px)}}@media(min-width:1536px){.fixed.max-width-lg{max-width:var(--ui-container-lg, 1200px)}}";
var ol = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, or = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? sl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ol(t, i, r), r;
};
let Ht = class extends c {
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
Ht.styles = p(rl);
or([
  s({
    attribute: "max-width",
    reflect: !0,
    converter: {
      fromAttribute: (e) => e === null || e === "false" ? !1 : e,
      toAttribute: (e) => e === !1 ? null : e
    }
  })
], Ht.prototype, "maxWidth", 2);
or([
  s({ type: Boolean, attribute: "disable-gutters", reflect: !0 })
], Ht.prototype, "disableGutters", 2);
or([
  s({ type: Boolean, reflect: !0 })
], Ht.prototype, "fixed", 2);
Ht = or([
  d("ui-container")
], Ht);
const al = ":host{display:block}.grid-wrapper{box-sizing:border-box;display:block}.grid-wrapper.container{display:flex;flex-wrap:wrap;width:100%}.direction-row{flex-direction:row}.direction-row-reverse{flex-direction:row-reverse}.direction-column{flex-direction:column}.direction-column-reverse{flex-direction:column-reverse}.wrap-nowrap{flex-wrap:nowrap}.wrap-wrap-reverse{flex-wrap:wrap-reverse}.grid-item{box-sizing:border-box;margin:0}";
var nl = Object.defineProperty, ll = Object.getOwnPropertyDescriptor, L = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ll(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && nl(t, i, r), r;
};
let z = class extends c {
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
    const r = this._getEffectiveSize(e), a = this._getEffectiveOffset(e), n = this._getEffectiveColumns(), h = {};
    if (r === !0)
      h["flex-grow"] = "1", h["flex-basis"] = "0%", h["max-width"] = "100%";
    else if (r === "auto")
      h["flex-grow"] = "0", h["flex-basis"] = "auto", h.width = "auto", h["max-width"] = "none";
    else if (typeof r == "number") {
      const f = r / n * 100;
      h["flex-grow"] = "0", h["flex-basis"] = `calc(${f}% - var(--ui-grid-column-gap, 0px) * ${(n - r) / n})`, h["max-width"] = `calc(${f}% - var(--ui-grid-column-gap, 0px) * ${(n - r) / n})`;
    } else this.container || (h["flex-grow"] = "0", h["flex-basis"] = "auto", h.width = "100%");
    if (a === "auto")
      h["margin-left"] = "auto";
    else if (typeof a == "number") {
      const f = a / n * 100;
      h["margin-left"] = `${f}%`;
    }
    if (this.order !== void 0) {
      const f = this._resolveResponsiveOrder(this.order, e);
      f !== void 0 && (h.order = String(f));
    }
    return h;
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
      <div class=${u({
      "grid-wrapper": !0,
      container: this.container,
      [`direction-${this.direction}`]: this.container,
      [`wrap-${this.wrap}`]: this.container && this.wrap !== "wrap"
    })} style=${ei(i)}>
        <slot></slot>
      </div>
    `;
  }
};
z.styles = p(al);
L([
  s({ type: Boolean, reflect: !0 })
], z.prototype, "container", 2);
L([
  s({ type: String, reflect: !0 })
], z.prototype, "direction", 2);
L([
  s({ type: String, reflect: !0 })
], z.prototype, "wrap", 2);
L([
  s({ type: String, attribute: "align-items", reflect: !0 })
], z.prototype, "alignItems", 2);
L([
  s({ type: String, attribute: "justify-content", reflect: !0 })
], z.prototype, "justifyContent", 2);
L([
  s({ type: Number })
], z.prototype, "columns", 2);
L([
  s({ type: Object })
], z.prototype, "spacing", 2);
L([
  s({ type: Object })
], z.prototype, "rowSpacing", 2);
L([
  s({ type: Object })
], z.prototype, "columnSpacing", 2);
L([
  s()
], z.prototype, "xs", 2);
L([
  s()
], z.prototype, "sm", 2);
L([
  s()
], z.prototype, "md", 2);
L([
  s()
], z.prototype, "lg", 2);
L([
  s()
], z.prototype, "xl", 2);
L([
  s({ type: Object })
], z.prototype, "offset", 2);
L([
  s({ type: Object })
], z.prototype, "order", 2);
L([
  m()
], z.prototype, "_currentWidth", 2);
z = L([
  d("ui-grid")
], z);
const cl = ":host{display:block}.stack-wrapper{display:flex;box-sizing:border-box}.stack-wrapper.direction-column,.stack-wrapper.direction-column-reverse{width:100%}::slotted(ui-divider){margin:0!important}.stack-wrapper.no-flex-gap.direction-column ::slotted(*:not(:first-child)){margin-top:var(--ui-stack-spacing, 0px)}.stack-wrapper.no-flex-gap.direction-column-reverse ::slotted(*:not(:last-child)){margin-bottom:var(--ui-stack-spacing, 0px)}.stack-wrapper.no-flex-gap.direction-row ::slotted(*:not(:first-child)){margin-left:var(--ui-stack-spacing, 0px)}.stack-wrapper.no-flex-gap.direction-row-reverse ::slotted(*:not(:last-child)){margin-right:var(--ui-stack-spacing, 0px)}";
var dl = Object.defineProperty, pl = Object.getOwnPropertyDescriptor, Et = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && dl(t, i, r), r;
};
let X = class extends c {
  constructor() {
    super(...arguments), this.direction = "column", this.spacing = 0, this.useFlexGap = !0, this._currentWidth = typeof window < "u" ? window.innerWidth : 1200, this._onResize = () => {
      this._currentWidth = window.innerWidth, this.requestUpdate();
    };
  }
  _getBreakpointValue(e, t) {
    if (X._breakPoints[e]) return X._breakPoints[e];
    if (typeof window < "u") {
      const i = getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${e}`);
      if (i && i.trim())
        return X._breakPoints[e] = parseInt(i, 10), X._breakPoints[e];
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
        const h = e[i[n]];
        if (h !== void 0) return h;
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
        style=${ei(n)}
      >
        <slot></slot>
      </div>
    `;
  }
};
X.styles = p(cl);
X._breakPoints = {};
Et([
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
], X.prototype, "direction", 2);
Et([
  s({ type: Object })
], X.prototype, "spacing", 2);
Et([
  s({ type: String })
], X.prototype, "alignItems", 2);
Et([
  s({ type: String })
], X.prototype, "justifyContent", 2);
Et([
  s({ type: Boolean })
], X.prototype, "useFlexGap", 2);
Et([
  m()
], X.prototype, "_currentWidth", 2);
X = Et([
  d("ui-stack")
], X);
const hl = ":host{display:block}.image-list{display:grid;overflow:hidden;box-sizing:border-box}.variant-standard,.variant-quilted,.variant-woven{grid-auto-rows:var(--ui-image-list-row-height, 164px)}.variant-masonry{display:block}";
var ul = Object.defineProperty, fl = Object.getOwnPropertyDescriptor, si = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ul(t, i, r), r;
};
let rt = class extends c {
  constructor() {
    super(...arguments), this.variant = "standard", this.cols = 3, this.gap = 4, this.rowHeight = 164, this.autoRows = !1;
  }
  render() {
    const e = this.variant === "masonry", t = {};
    return e ? (t["column-count"] = String(this.cols), t["column-gap"] = `${this.gap}px`) : (t["grid-template-columns"] = `repeat(${this.cols}, 1fr)`, t.gap = `${this.gap}px`, t["--ui-image-list-row-height"] = `${this.rowHeight}px`, t["grid-auto-rows"] = this.autoRows ? "auto" : `${this.rowHeight}px`), t["--ui-image-list-gap"] = `${this.gap}px`, l`
      <ul class="image-list variant-${this.variant}" style="${ei(t)}" role="list">
        <slot></slot>
      </ul>
    `;
  }
};
rt.styles = p(hl);
si([
  s({ type: String })
], rt.prototype, "variant", 2);
si([
  s({ type: Number })
], rt.prototype, "cols", 2);
si([
  s({ type: Number })
], rt.prototype, "gap", 2);
si([
  s({ type: Number })
], rt.prototype, "rowHeight", 2);
si([
  s({ type: Boolean })
], rt.prototype, "autoRows", 2);
rt = si([
  d("ui-image-list")
], rt);
const bl = ':host{display:block;position:relative;overflow:hidden}:host([bar-position="below"]){display:flex;flex-direction:column;overflow:visible}:host(.masonry){break-inside:avoid;margin-bottom:var(--ui-image-list-gap, 4px)}.item-wrapper{width:100%;height:100%;position:relative;overflow:hidden}:host([bar-position="below"]) .item-wrapper{flex:1 1 auto;overflow:hidden}:host(.masonry) .item-wrapper{height:auto}::slotted(img){width:100%;height:100%;object-fit:var(--ui-image-fit, cover);display:block}:host(.masonry) ::slotted(img){height:auto}::slotted(ui-image-list-item-bar){position:absolute;bottom:0;left:0;right:0}::slotted(ui-image-list-item-bar[position="top"]){bottom:auto;top:0}:host([bar-position="below"]) ::slotted(ui-image-list-item-bar){position:static}';
var vl = Object.defineProperty, ml = Object.getOwnPropertyDescriptor, Pt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ml(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && vl(t, i, r), r;
};
let qe = class extends c {
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
qe.styles = p(bl);
Pt([
  s({ type: Number })
], qe.prototype, "rows", 2);
Pt([
  s({ type: Number })
], qe.prototype, "cols", 2);
Pt([
  s({ type: String, attribute: "bar-position", reflect: !0 })
], qe.prototype, "barPosition", 2);
Pt([
  s({ type: String })
], qe.prototype, "weave", 2);
Pt([
  s({ type: String, attribute: "aspect-ratio", reflect: !0 })
], qe.prototype, "aspectRatio", 2);
Pt([
  s({ type: String })
], qe.prototype, "fit", 2);
qe = Pt([
  d("ui-image-list-item")
], qe);
const gl = ':host{display:block;box-sizing:border-box;background:linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.3) 70%,transparent 100%);color:var(--ui-image-bar-overlay-text, var(--ui-text-color-on-primary));padding:12px 12px 8px;font-family:var(--ui-font-family)}:host([position="top"]){background:linear-gradient(to bottom,rgba(0,0,0,.7) 0%,rgba(0,0,0,.3) 70%,transparent 100%);padding:8px 12px 12px}:host([position="below"]){background:var(--ui-surface-1);color:var(--ui-text-color);border-top:1px solid var(--ui-border-color);padding:8px 12px}.bar-inner{display:flex;align-items:center;gap:8px}.bar-text{flex:1;min-width:0}.bar-title{font-size:.875rem;font-weight:600;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar-subtitle{font-size:.75rem;font-weight:400;opacity:.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px}.bar-action{flex-shrink:0;display:flex;align-items:center}::slotted([slot="action"]){color:var(--ui-image-bar-overlay-text, var(--ui-text-color-on-primary))}:host([position="below"]) ::slotted([slot="action"]){color:var(--ui-text-color)}';
var yl = Object.defineProperty, xl = Object.getOwnPropertyDescriptor, lo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? xl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && yl(t, i, r), r;
};
let ji = class extends c {
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
ji.styles = p(gl);
lo([
  s({ type: String, reflect: !0 })
], ji.prototype, "position", 2);
ji = lo([
  d("ui-image-list-item-bar")
], ji);
const _l = ':host{display:inline-block;font-family:var(--ui-font-family);-webkit-user-select:none;user-select:none}.calendar{width:296px;background:var(--ui-surface-1);border-radius:var(--ui-border-radius-xl);overflow:hidden}.header{display:flex;align-items:center;justify-content:space-between;padding:12px 8px 8px}.header-label{font-size:.9375rem;font-weight:600;color:var(--ui-text-color);cursor:pointer;padding:4px 8px;border-radius:6px;transition:background .12s}.header-label:hover{background:var(--ui-hover-color)}.nav-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);font-size:1rem;transition:background .12s}.nav-btn:hover{background:var(--ui-hover-color)}.nav-btn:disabled{opacity:.3;cursor:default}.dow-row{display:grid;grid-template-columns:repeat(7,1fr);padding:0 8px;margin-bottom:4px}.dow-cell{text-align:center;font-size:.6875rem;font-weight:600;color:var(--ui-text-color-muted);padding:4px 0;text-transform:uppercase;letter-spacing:.04em}.day-grid{display:grid;grid-template-columns:repeat(7,1fr);padding:0 8px 12px;gap:2px 0}.day-cell{display:flex;align-items:center;justify-content:center;height:36px;width:100%;border:none;background:transparent;cursor:pointer;border-radius:50%;font-size:.8125rem;color:var(--ui-text-color);transition:background .1s,color .1s;position:relative}.day-cell:hover:not(.disabled):not(.selected){background:var(--ui-hover-color)}.day-cell.other-month{color:var(--ui-text-color-muted)}.day-cell.today:not(.selected){color:var(--ui-primary-color);font-weight:700}.day-cell.today:not(.selected):after{content:"";position:absolute;bottom:4px;left:50%;transform:translate(-50%);width:4px;height:4px;border-radius:50%;background:var(--ui-primary-color)}.day-cell.selected{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700}.day-cell.selected:hover{background:var(--ui-primary-color-hover)}.day-cell.disabled{opacity:.35;cursor:not-allowed;pointer-events:none}.year-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px;max-height:220px;overflow-y:auto}.year-btn{padding:8px 4px;border:none;background:transparent;cursor:pointer;border-radius:6px;font-size:.875rem;color:var(--ui-text-color);transition:background .12s}.year-btn:hover{background:var(--ui-hover-color)}.year-btn.selected-year{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700}.month-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px}.month-btn{padding:10px 4px;border:none;background:transparent;cursor:pointer;border-radius:6px;font-size:.8125rem;color:var(--ui-text-color);transition:background .12s}.month-btn:hover{background:var(--ui-hover-color)}.month-btn.selected-month{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700}', wl = ":host{display:inline-block;font-family:var(--ui-font-family)}.field-wrapper{position:relative;display:inline-flex;align-items:center}.field-label{display:block;font-size:.75rem;font-weight:500;color:var(--ui-text-color-muted);margin-bottom:4px}.field-input{font-family:inherit;font-size:.9375rem;color:var(--ui-text-color);background:var(--ui-input-bg);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-md);padding:10px 44px 10px 14px;width:180px;outline:none;transition:border-color .15s,box-shadow .15s;box-sizing:border-box;cursor:text}.field-input::placeholder{color:var(--ui-input-placeholder-color)}.field-input:focus{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([disabled]) .field-input{background:var(--ui-input-disabled-bg);color:var(--ui-text-color-muted);cursor:not-allowed;border-color:var(--ui-border-color)}:host([readonly]) .field-input{cursor:default}.calendar-icon-btn{position:absolute;right:10px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);transition:background .12s,color .12s;font-size:1rem}.calendar-icon-btn:hover{background:var(--ui-hover-color);color:var(--ui-primary-color)}:host([disabled]) .calendar-icon-btn{pointer-events:none;opacity:.4}:host([readonly]) .calendar-icon-btn{pointer-events:none}:host([error]) .field-input{border-color:var(--ui-error-color)}:host([error]) .field-input:focus{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}.helper-text{font-size:.75rem;margin-top:4px;color:var(--ui-text-color-muted)}:host([error]) .helper-text{color:var(--ui-error-color)}.popover-anchor{position:relative;display:inline-block}.popover{position:absolute;top:calc(100% + 6px);left:0;z-index:1400;background:var(--ui-surface-1);border-radius:var(--ui-border-radius-xl);box-shadow:var(--ui-shadow-lg);transform-origin:top left;transform:scale(.94) translateY(-4px);opacity:0;visibility:hidden;transition:transform .15s cubic-bezier(.4,0,.2,1),opacity .15s,visibility .15s;pointer-events:none}.popover.open{transform:scale(1) translateY(0);opacity:1;visibility:visible;pointer-events:auto}.popover-actions{display:flex;justify-content:flex-end;gap:8px;padding:4px 12px 12px;border-top:1px solid var(--ui-border-color)}.action-btn{font-family:inherit;font-size:.875rem;font-weight:600;padding:6px 14px;border:none;border-radius:6px;cursor:pointer;transition:background .12s}.action-btn.cancel{background:transparent;color:var(--ui-text-color-muted)}.action-btn.cancel:hover{background:var(--ui-hover-color)}.action-btn.ok{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.action-btn.ok:hover{background:var(--ui-primary-color-hover)}.static-wrapper{display:inline-block;border-radius:var(--ui-border-radius-xl);box-shadow:var(--ui-shadow-sm),0 0 0 1px var(--ui-border-color);overflow:hidden}.click-away{display:none;position:fixed;inset:0;z-index:1399}.click-away.open{display:block}";
var kl = Object.defineProperty, $l = Object.getOwnPropertyDescriptor, E = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? $l(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && kl(t, i, r), r;
};
const Sl = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], oo = [
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
function dt(e) {
  if (!e) return null;
  const [t, i, o] = e.split("-").map(Number);
  return !t || !i || !o ? null : new Date(t, i - 1, o);
}
function Di(e) {
  const t = e.getFullYear(), i = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${t}-${i}-${o}`;
}
function Cl(e) {
  const t = dt(e);
  return t ? `${String(t.getMonth() + 1).padStart(2, "0")}/${String(t.getDate()).padStart(2, "0")}/${t.getFullYear()}` : "";
}
function Il() {
  return Di(/* @__PURE__ */ new Date());
}
function zt(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function El(e, t, i, o, r) {
  const a = [], n = new Date(e, t, 1), h = Il(), f = dt(h), y = i ? dt(i) : null, b = o ? dt(o) : null, S = r ? dt(r) : null, de = n.getDay();
  for (let ie = de - 1; ie >= 0; ie--) {
    const O = new Date(e, t, -ie), ai = Di(O);
    a.push({
      date: O,
      iso: ai,
      day: O.getDate(),
      isCurrentMonth: !1,
      isToday: zt(O, f),
      isSelected: y ? zt(O, y) : !1,
      isDisabled: (b ? O < b : !1) || (S ? O > S : !1)
    });
  }
  const te = new Date(e, t + 1, 0).getDate();
  for (let ie = 1; ie <= te; ie++) {
    const O = new Date(e, t, ie), ai = Di(O);
    a.push({
      date: O,
      iso: ai,
      day: ie,
      isCurrentMonth: !0,
      isToday: zt(O, f),
      isSelected: y ? zt(O, y) : !1,
      isDisabled: (b ? O < b : !1) || (S ? O > S : !1)
    });
  }
  const ho = 42 - a.length;
  for (let ie = 1; ie <= ho; ie++) {
    const O = new Date(e, t + 1, ie), ai = Di(O);
    a.push({
      date: O,
      iso: ai,
      day: ie,
      isCurrentMonth: !1,
      isToday: zt(O, f),
      isSelected: y ? zt(O, y) : !1,
      isDisabled: (b ? O < b : !1) || (S ? O > S : !1)
    });
  }
  return a;
}
let Te = class extends c {
  constructor() {
    super(...arguments), this.disabled = !1, this._viewYear = (/* @__PURE__ */ new Date()).getFullYear(), this._viewMonth = (/* @__PURE__ */ new Date()).getMonth(), this._mode = "day";
  }
  connectedCallback() {
    if (super.connectedCallback(), this.value) {
      const e = dt(this.value);
      e && (this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth());
    }
  }
  /** Navigate to the month/year of a given ISO date programmatically. */
  navigateTo(e) {
    const t = dt(e);
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
    const e = El(this._viewYear, this._viewMonth, this.value ?? null, this.min ?? null, this.max ?? null);
    return l`
      <div class="header">
        <button class="nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="header-label" @click=${() => this._mode = "month"} role="button" tabindex="0"
          @keydown=${(t) => t.key === "Enter" && (this._mode = "month")}
        >
          ${oo[this._viewMonth]} ${this._viewYear}
        </span>
        <button class="nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>
      <div class="dow-row">${Sl.map((t) => l`<span class="dow-cell">${t}</span>`)}</div>
      <div class="day-grid" role="grid" aria-label="Calendar">
        ${At(e, (t) => t.iso, (t) => l`
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
        ${oo.map((e, t) => l`
          <button class=${u({ "month-btn": !0, "selected-month": t === this._viewMonth })}
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
          <button class=${u({ "year-btn": !0, "selected-year": i === this._viewYear })}
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
Te.styles = p(_l);
E([
  s({ type: String })
], Te.prototype, "value", 2);
E([
  s({ type: String })
], Te.prototype, "min", 2);
E([
  s({ type: String })
], Te.prototype, "max", 2);
E([
  s({ type: Boolean })
], Te.prototype, "disabled", 2);
E([
  m()
], Te.prototype, "_viewYear", 2);
E([
  m()
], Te.prototype, "_viewMonth", 2);
E([
  m()
], Te.prototype, "_mode", 2);
Te = E([
  d("ui-date-picker-calendar")
], Te);
let H = class extends c {
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
      ${this.label ? l`<label class="field-label" for="dp-input">${this.label}</label>` : g}
      <div class="field-wrapper">
        <input
          id="dp-input"
          class="field-input"
          type="text"
          .value=${Cl(this.value)}
          placeholder=${this.placeholder}
          name=${this.name || g}
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
      ${this.helperText ? l`<p class="helper-text">${this.helperText}</p>` : g}
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
H.styles = p(wl);
E([
  s({ type: String })
], H.prototype, "value", 2);
E([
  s({ type: String })
], H.prototype, "label", 2);
E([
  s({ type: String })
], H.prototype, "placeholder", 2);
E([
  s({ type: String })
], H.prototype, "name", 2);
E([
  s({ type: String })
], H.prototype, "variant", 2);
E([
  s({ type: String })
], H.prototype, "min", 2);
E([
  s({ type: String })
], H.prototype, "max", 2);
E([
  s({ type: Boolean, reflect: !0 })
], H.prototype, "disabled", 2);
E([
  s({ type: Boolean, reflect: !0 })
], H.prototype, "readonly", 2);
E([
  s({ type: Boolean, reflect: !0 })
], H.prototype, "error", 2);
E([
  s({ type: String, attribute: "helper-text" })
], H.prototype, "helperText", 2);
E([
  m()
], H.prototype, "_open", 2);
E([
  m()
], H.prototype, "_pendingValue", 2);
H = E([
  d("ui-date-picker")
], H);
const Pl = ":host{display:inline-block;font-family:var(--ui-font-family)}.field-label{display:block;font-size:.75rem;font-weight:500;letter-spacing:.01em;color:var(--ui-text-color-muted);margin-bottom:5px;transition:color .15s}:host([error]) .field-label{color:var(--ui-error-color)}.field-label.focused{color:var(--ui-primary-color)}:host([error]) .field-label.focused{color:var(--ui-error-color)}.field-container{display:inline-flex;align-items:center;gap:4px;background:var(--ui-input-bg);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-md);padding:0 10px;height:44px;min-width:200px;cursor:text;box-sizing:border-box;transition:border-color .15s,box-shadow .15s;position:relative}.field-container.focused{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([error]) .field-container{border-color:var(--ui-error-color)}:host([error]) .field-container.focused{box-shadow:0 0 0 3px var(--ui-error-focus-ring)}:host([disabled]) .field-container{background:var(--ui-input-disabled-bg);border-color:var(--ui-border-color);cursor:not-allowed}:host([readonly]) .field-container{cursor:default}.segments{display:flex;align-items:center;flex:1;gap:1px;outline:none;min-height:100%}.segment{display:inline-flex;align-items:center;justify-content:center;border-radius:4px;padding:2px 4px;font-size:.9375rem;font-variant-numeric:tabular-nums;color:var(--ui-text-color);min-width:2ch;line-height:1;transition:background .1s;cursor:text;-webkit-user-select:none;user-select:none}.segment.placeholder{color:var(--ui-input-placeholder-color)}.segment.active{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);border-radius:3px}:host([disabled]) .segment{color:var(--ui-text-color-muted)}:host([disabled]) .segment.active{background:var(--ui-border-color);color:var(--ui-text-color-muted)}.segment-year{min-width:4ch}.separator{color:var(--ui-text-color-muted);font-size:.9375rem;pointer-events:none;line-height:1}.field-actions{display:flex;align-items:center;gap:2px;margin-left:auto}.icon-btn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);font-size:.875rem;transition:background .12s,color .12s;flex-shrink:0;padding:0}.icon-btn:hover{background:var(--ui-hover-color);color:var(--ui-text-color)}:host([disabled]) .icon-btn{pointer-events:none;opacity:0}.helper{display:block;font-size:.75rem;margin-top:5px;color:var(--ui-text-color-muted)}:host([error]) .helper{color:var(--ui-error-color)}";
var Ol = Object.defineProperty, Dl = Object.getOwnPropertyDescriptor, Y = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Dl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ol(t, i, r), r;
};
function Pi(e, t, i) {
  return Math.min(Math.max(e, t), i);
}
function Oi(e, t) {
  return e < 1 || e > 12 ? 31 : new Date(t || 2e3, e, 0).getDate();
}
function zl(e) {
  if (!e) return { m: null, d: null, y: null };
  const t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return t ? { y: parseInt(t[1]), m: parseInt(t[2]), d: parseInt(t[3]) } : { m: null, d: null, y: null };
}
function so(e, t, i) {
  return e === null || t === null || i === null ? "" : `${String(i).padStart(4, "0")}-${String(e).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
const Je = ["month", "day", "year"];
let T = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "", this.name = "", this.min = "", this.max = "", this.disabled = !1, this.readonly = !1, this.error = !1, this.helperText = "", this._internals = this.attachInternals(), this._month = null, this._day = null, this._year = null, this._active = null, this._focused = !1, this._buf = "";
  }
  // digit accumulation buffer for the active segment
  // Sync controlled value → segments before each render (willUpdate avoids a double-render cycle)
  willUpdate(e) {
    if (e.has("value")) {
      const { m: t, d: i, y: o } = zl(this.value);
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
    const e = so(this._month, this._day, this._year);
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
        const t = Oi(this._month ?? 1, this._year ?? 2e3);
        e >= 1 && e <= t && (this._day = e);
      }
    }
  }
  _nextSegment() {
    if (!this._active) {
      this._setActive("month");
      return;
    }
    const e = Je.indexOf(this._active);
    e < Je.length - 1 && this._setActive(Je[e + 1]);
  }
  _prevSegment() {
    if (!this._active) return;
    const e = Je.indexOf(this._active);
    e > 0 && this._setActive(Je[e - 1]);
  }
  _canGoNext() {
    return this._active ? Je.indexOf(this._active) < Je.length - 1 : !0;
  }
  _canGoPrev() {
    return this._active ? Je.indexOf(this._active) > 0 : !1;
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
      const o = Oi(this._month ?? 1, this._year ?? 2e3);
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
        this._month = Pi(i + e, 1, 12), this._day !== null && (this._day = Pi(this._day, 1, Oi(this._month, this._year ?? 2e3)));
      } else if (t === "day") {
        const i = Oi(this._month ?? 1, this._year ?? 2e3), o = this._day ?? (e > 0 ? 0 : i + 1);
        this._day = Pi(o + e, 1, i);
      } else if (t === "year") {
        const i = this._year ?? (/* @__PURE__ */ new Date()).getFullYear();
        this._year = Pi(i + e, 1, 9999);
      }
      this._checkAndEmit();
    }
  }
  // ── Internal: emit when a full date is ready ──────────────────────────────
  _checkAndEmit() {
    const e = so(this._month, this._day, this._year);
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
    const e = u({ "field-label": !0, focused: this._focused }), t = u({ "field-container": !0, focused: this._focused }), i = (o, r = "") => {
      const { text: a, isPlaceholder: n } = this._segmentText(o);
      return l`<span
        class=${u({
        segment: !0,
        [o]: !0,
        active: this._active === o,
        placeholder: n,
        [`segment-${o}`]: !0,
        [r]: !!r
      })}
        @click=${(h) => {
        h.stopPropagation(), this._setActive(o), this.shadowRoot?.querySelector(".segments")?.focus();
      }}
      >${a}</span>`;
    };
    return l`
      ${this.label ? l`<label class=${e}>${this.label}</label>` : g}

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
          ` : g}
        </div>
      </div>

      ${this.helperText ? l`<small class="helper">${this.helperText}</small>` : g}
    `;
  }
};
T.formAssociated = !0;
T.styles = p(Pl);
Y([
  s({ type: String })
], T.prototype, "value", 2);
Y([
  s({ type: String })
], T.prototype, "label", 2);
Y([
  s({ type: String, reflect: !0 })
], T.prototype, "name", 2);
Y([
  s({ type: String })
], T.prototype, "min", 2);
Y([
  s({ type: String })
], T.prototype, "max", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], T.prototype, "disabled", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], T.prototype, "readonly", 2);
Y([
  s({ type: Boolean, reflect: !0 })
], T.prototype, "error", 2);
Y([
  s({ type: String, attribute: "helper-text" })
], T.prototype, "helperText", 2);
Y([
  m()
], T.prototype, "_month", 2);
Y([
  m()
], T.prototype, "_day", 2);
Y([
  m()
], T.prototype, "_year", 2);
Y([
  m()
], T.prototype, "_active", 2);
Y([
  m()
], T.prototype, "_focused", 2);
Y([
  m()
], T.prototype, "_buf", 2);
T = Y([
  d("ui-date-field")
], T);
const Tl = ":host{display:inline-block;font-family:var(--ui-font-family)}.label{display:block;font-size:.75rem;font-weight:500;color:var(--ui-text-color-muted);margin-bottom:5px}.label.focused{color:var(--ui-primary-color)}:host([error]) .label{color:var(--ui-error-color)}.container{display:inline-flex;align-items:center;gap:4px;background:var(--ui-input-bg);border:1.5px solid var(--ui-border-color);border-radius:var(--ui-border-radius-md);padding:0 10px;height:44px;min-width:160px;cursor:text;box-sizing:border-box;transition:border-color .15s,box-shadow .15s}.container.focused{border-color:var(--ui-primary-color);box-shadow:0 0 0 3px var(--ui-primary-focus-ring)}:host([error]) .container{border-color:var(--ui-error-color)}:host([disabled]) .container{background:var(--ui-input-disabled-bg);border-color:var(--ui-border-color);cursor:not-allowed}.segments{display:flex;align-items:center;flex:1;gap:1px;outline:none;min-height:100%}.seg{display:inline-flex;align-items:center;justify-content:center;border-radius:3px;padding:2px 4px;font-size:.9375rem;font-variant-numeric:tabular-nums;color:var(--ui-text-color);min-width:2ch;line-height:1;cursor:text;-webkit-user-select:none;user-select:none;transition:background .1s}.seg.active{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary)}.seg.placeholder{color:var(--ui-text-color-muted)}.seg.meridiem{min-width:3ch}.sep{color:var(--ui-text-color-muted);font-size:.9375rem;pointer-events:none}.icon-btn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:var(--ui-text-color-muted);font-size:.875rem;margin-left:auto;transition:background .12s}.icon-btn:hover{background:var(--ui-hover-color)}.helper{display:block;font-size:.75rem;margin-top:5px;color:var(--ui-text-color-muted)}:host([error]) .helper{color:var(--ui-error-color)}", Al = ":host{display:block;font-family:var(--ui-font-family)}.clock{overflow-y:auto;max-height:var(--ui-digital-clock-height,300px);padding:4px 0;scrollbar-width:thin}.item{display:flex;align-items:center;justify-content:center;padding:10px 16px;font-size:.9375rem;color:var(--ui-text-color);cursor:pointer;border:none;background:transparent;width:100%;box-sizing:border-box;transition:background .1s;font-family:inherit;border-radius:0;font-variant-numeric:tabular-nums}.item:hover{background:var(--ui-hover-color)}.item.selected{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:600;border-radius:6px}", Bl = ":host{display:inline-block;font-family:var(--ui-font-family)}.msdc{display:flex;gap:0;border-radius:var(--ui-border-radius-xl);overflow:hidden}.col{display:flex;flex-direction:column;overflow-y:auto;width:72px;max-height:var(--ui-msdc-height,240px);position:relative;scrollbar-width:none}.col::-webkit-scrollbar{display:none}.col+.col{border-left:1px solid var(--ui-border-color)}.col-header{position:sticky;top:0;background:var(--ui-surface-1);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ui-text-color-muted);text-align:center;padding:6px 0 4px;border-bottom:1px solid var(--ui-border-color);z-index:1}.item{display:flex;align-items:center;justify-content:center;padding:8px 4px;font-size:.9375rem;font-variant-numeric:tabular-nums;color:var(--ui-text-color);cursor:pointer;border:none;background:transparent;font-family:inherit;width:100%;line-height:1;transition:background .1s}.item:hover{background:var(--ui-hover-color)}.item.sel{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);font-weight:700;border-radius:6px}.col-spacer{min-height:80px}", Ml = ":host{display:inline-block;-webkit-user-select:none;user-select:none}.clock-wrap{display:flex;flex-direction:column;align-items:center;gap:12px}.clock-header{display:flex;gap:4px;font-size:2rem;font-weight:700;font-family:var(--ui-font-family);color:var(--ui-text-color)}.clock-seg{padding:4px 10px;border-radius:8px;cursor:pointer;transition:background .12s,color .12s}.clock-seg.active{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);border-radius:8px}.clock-seg:hover:not(.active){background:var(--ui-hover-color)}.clock-sep{color:var(--ui-text-color-muted)}svg{touch-action:none;cursor:pointer}.face{fill:var(--ui-surface-variant)}.face-inner{fill:#00000005;stroke:#0000000f;stroke-width:1;stroke-dasharray:4 4}.track{fill:none;stroke:var(--ui-border-color);stroke-width:2}.hand{stroke:var(--ui-primary-color);stroke-width:2;stroke-linecap:round}.hand-center,.hand-tip{fill:var(--ui-primary-color)}.num{font-size:13px;font-family:var(--ui-font-family);fill:var(--ui-text-color);dominant-baseline:central;text-anchor:middle;cursor:pointer}.num.inner-label{font-size:11px;fill:var(--ui-text-color-muted)}.num.selected{fill:var(--ui-text-color-on-primary)}.num-bg{fill:transparent;cursor:pointer}.num-bg.selected{fill:var(--ui-primary-color)}.tick{stroke:var(--ui-text-color-muted);stroke-width:1}.tick.major{stroke-width:2}.inner-ring-track{fill:none;stroke:var(--ui-primary-color);stroke-width:1.5;stroke-opacity:.2}.inner-tick{stroke:var(--ui-primary-color);stroke-width:1.5;stroke-opacity:.35;stroke-linecap:round}.am-pm{display:flex;gap:8px}.am-pm-btn{padding:4px 16px;border:1.5px solid var(--ui-border-color);border-radius:20px;cursor:pointer;font-size:.875rem;font-family:inherit;background:transparent;color:var(--ui-text-color);transition:all .12s}.am-pm-btn.sel{background:var(--ui-primary-color);color:var(--ui-text-color-on-primary);border-color:var(--ui-primary-color)}", Ll = ":host{display:inline-block;font-family:var(--ui-font-family)}.surface{border-radius:var(--ui-border-radius-xl);box-shadow:0 1px 4px #00000014,0 0 0 1px var(--ui-border-color);overflow:hidden;display:inline-block}", jl = ":host{display:inline-block}";
var Ul = Object.defineProperty, Rl = Object.getOwnPropertyDescriptor, v = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Rl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ul(t, i, r), r;
};
function j(e) {
  return String(e).padStart(2, "0");
}
function sr(e) {
  if (!e) return null;
  const t = e.split(":").map(Number);
  return t.length < 2 || t.some(isNaN) ? null : { h: t[0], m: t[1], s: t[2] ?? 0 };
}
function ot(e, t, i = 0) {
  return `${j(e)}:${j(t)}:${j(i)}`;
}
function Se(e) {
  return { hour: e % 12 || 12, ampm: e < 12 ? "AM" : "PM" };
}
function Tt(e, t) {
  return t === "AM" ? e === 12 ? 0 : e : e === 12 ? 12 : e + 12;
}
function Vl(e, t, i = !1) {
  const o = sr(e);
  if (!o) return "";
  const r = t ? Se(o.h).hour : o.h, a = t ? ` ${Se(o.h).ampm}` : "";
  return `${j(r)}:${j(o.m)}${i ? ":" + j(o.s) : ""}${a}`;
}
function Nl(e, t, i, o = 140, r = 140) {
  const a = (e / t - 0.25) * Math.PI * 2;
  return { x: o + i * Math.cos(a), y: r + i * Math.sin(a) };
}
function Fl(e, t, i = 140, o = 140) {
  let r = Math.atan2(t - o, e - i) * 180 / Math.PI + 90;
  return r < 0 && (r += 360), r;
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
      const t = sr(this.value);
      if (t) {
        const { hour: i, ampm: o } = Se(t.h);
        this._h = this.ampm ? i : t.h, this._m = t.m, this._s = t.s, this._mer = o;
      }
    }
  }
  clear() {
    this._h = null, this._m = null, this._s = null, this._buf = "", this.dispatchEvent(new CustomEvent("clear", { bubbles: !0, composed: !0 }));
  }
  _emit() {
    if (this._h === null || this._m === null) return;
    const e = this.ampm ? Tt(this._h, this._mer) : this._h, t = ot(e, this._m, this._s ?? 0);
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
    return e === "hour" ? this._h !== null ? { text: j(this._h), ph: !1 } : { text: "HH", ph: !0 } : e === "minute" ? this._m !== null ? { text: j(this._m), ph: !1 } : { text: "MM", ph: !0 } : this._s !== null ? { text: j(this._s), ph: !1 } : { text: "SS", ph: !0 };
  }
  render() {
    const e = this._h !== null || this._m !== null;
    return l`
      ${this.label ? l`<label class="label ${this._focused ? "focused" : ""}">${this.label}</label>` : g}
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
      const { text: o, ph: r } = this._segText(t), a = i > 0 && t !== "meridiem" ? l`<span class="sep">:</span>` : t === "meridiem" ? l`<span class="sep"> </span>` : g;
      return l`${a}<span
              class=${u({ seg: !0, active: this._active === t, placeholder: r, meridiem: t === "meridiem" })}
              @click=${(n) => {
        n.stopPropagation(), this._setActive(t), this.shadowRoot?.querySelector(".segments")?.focus();
      }}
            >${o}</span>`;
    })}
        </div>
        ${e && !this.disabled ? l`<button class="icon-btn" tabindex="-1" aria-label="Clear" @click=${(t) => {
      t.stopPropagation(), this.clear();
    }}>✕</button>` : g}
      </div>
      ${this.helperText ? l`<small class="helper">${this.helperText}</small>` : g}
    `;
  }
};
B.styles = p(Tl);
v([
  s({ type: String })
], B.prototype, "value", 2);
v([
  s({ type: String })
], B.prototype, "label", 2);
v([
  s({ type: Boolean })
], B.prototype, "ampm", 2);
v([
  s({ type: Boolean })
], B.prototype, "seconds", 2);
v([
  s({ type: Boolean, reflect: !0 })
], B.prototype, "disabled", 2);
v([
  s({ type: Boolean, reflect: !0 })
], B.prototype, "readonly", 2);
v([
  s({ type: Boolean, reflect: !0 })
], B.prototype, "error", 2);
v([
  s({ type: String, attribute: "helper-text" })
], B.prototype, "helperText", 2);
v([
  m()
], B.prototype, "_h", 2);
v([
  m()
], B.prototype, "_m", 2);
v([
  m()
], B.prototype, "_s", 2);
v([
  m()
], B.prototype, "_mer", 2);
v([
  m()
], B.prototype, "_active", 2);
v([
  m()
], B.prototype, "_focused", 2);
v([
  m()
], B.prototype, "_buf", 2);
B = v([
  d("ui-time-field")
], B);
let Kt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.step = 30, this.ampm = !0;
  }
  _items() {
    const e = [];
    for (let t = 0; t < 1440; t += this.step) {
      const i = Math.floor(t / 60), o = t % 60;
      e.push(ot(i, o));
    }
    return e;
  }
  _label(e) {
    return Vl(e, this.ampm);
  }
  updated() {
    const e = this.shadowRoot?.querySelector(".selected");
    e && typeof e.scrollIntoView == "function" && e.scrollIntoView({ block: "center" });
  }
  render() {
    const e = this._items();
    return l`
      <div class="clock" role="listbox" aria-label="Select time">
        ${At(e, (t) => t, (t) => l`
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
Kt.styles = p(Al);
v([
  s({ type: String })
], Kt.prototype, "value", 2);
v([
  s({ type: Number })
], Kt.prototype, "step", 2);
v([
  s({ type: Boolean })
], Kt.prototype, "ampm", 2);
Kt = v([
  d("ui-digital-clock")
], Kt);
let Yt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  _t() {
    return sr(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  _set(e, t, i) {
    const o = ot(e, t, i);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _col(e) {
    const t = this._t(), i = Se(t.h);
    if (e === "mer")
      return l`
        <div class="col">
          <div class="col-header">AM/PM</div>
          ${["AM", "PM"].map((n) => l`
            <button class=${u({ item: !0, sel: i.ampm === n })}
              @click=${() => this._set(Tt(i.hour, n), t.m, t.s)}>${n}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;
    const o = Array.from({ length: 12 }, (n, h) => h + 1), r = Array.from({ length: 24 }, (n, h) => h), a = Array.from({ length: 60 }, (n, h) => h);
    if (e === "h") {
      const n = this.ampm ? o : r, h = this.ampm ? i.hour : t.h;
      return l`
        <div class="col">
          <div class="col-header">Hr</div>
          ${n.map((f) => l`
            <button class=${u({ item: !0, sel: h === f })}
              @click=${() => {
        const y = this.ampm ? Tt(f, i.ampm) : f;
        this._set(y, t.m, t.s);
      }}>${j(f)}</button>
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
        ${this.seconds ? this._col("s") : g}
        ${this.ampm ? this._col("mer") : g}
      </div>
    `;
  }
};
Yt.styles = p(Bl);
v([
  s({ type: String })
], Yt.prototype, "value", 2);
v([
  s({ type: Boolean })
], Yt.prototype, "ampm", 2);
v([
  s({ type: Boolean })
], Yt.prototype, "seconds", 2);
Yt = v([
  d("ui-multi-section-digital-clock")
], Yt);
let bt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1, this.view = "hours";
  }
  get _t() {
    return sr(this.value) ?? { h: 0, m: 0, s: 0 };
  }
  _emit(e, t, i) {
    const o = ot(e, t, i);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: o }, bubbles: !0, composed: !0 }));
  }
  _switchView(e) {
    this.view = e, this.dispatchEvent(new CustomEvent("view-change", { detail: { view: e }, bubbles: !0, composed: !0 }));
  }
  _handleClick(e) {
    const i = this.shadowRoot.querySelector("svg").getBoundingClientRect(), o = 280 / i.width, r = 280 / i.height, a = (e.clientX - i.left) * o, n = (e.clientY - i.top) * r, h = 140, f = 140, y = Fl(a, n, h, f), b = this._t;
    if (this.view === "hours") {
      const S = Math.sqrt((a - h) ** 2 + (n - f) ** 2), de = !this.ampm && S < 82;
      let te = Math.round(y / 30) % 12;
      de ? te = te === 0 ? 0 : te + 12 : (te = te || 12, this.ampm && (te = Tt(te, Se(b.h).ampm))), this._emit(te, b.m, b.s), this._switchView("minutes");
    } else if (this.view === "minutes") {
      const S = Math.round(y / 6) % 60;
      this._emit(b.h, S, b.s), this.seconds && this._switchView("seconds");
    } else {
      const S = Math.round(y / 6) % 60;
      this._emit(b.h, b.m, S);
    }
  }
  _renderFace() {
    const i = this._t;
    let o = 0, r = 100;
    if (this.view === "hours") {
      let b;
      this.ampm ? b = Se(i.h).hour : b = i.h === 0 || i.h > 12 ? i.h % 12 : i.h, o = b / 12 * 360, r = this.ampm ? 100 : i.h === 0 || i.h > 12 ? 64 : 100;
    } else this.view === "minutes" ? (o = i.m / 60 * 360, r = 100) : (o = i.s / 60 * 360, r = 100);
    const a = (b) => (b - 90) * Math.PI / 180, n = 140 + r * Math.cos(a(o)), h = 140 + r * Math.sin(a(o)), f = [];
    if (this.view === "hours")
      if (this.ampm)
        for (let b = 1; b <= 12; b++) f.push({ val: b, label: String(b), r: 100 });
      else {
        for (let b = 1; b <= 12; b++) f.push({ val: b, label: String(b), r: 100 });
        for (let b = 13; b <= 24; b++) f.push({ val: b % 24, label: b === 24 ? "00" : String(b), r: 64, inner: !0 });
      }
    else
      for (let b = 0; b < 12; b++) {
        const S = b * 5;
        f.push({ val: S, label: j(S), r: 100 });
      }
    const y = 12;
    return l`
      <svg width="280" height="280" viewBox="0 0 280 280" @click=${this._handleClick}>
        <circle cx=${140} cy=${140} r="125" class="face"/>
        ${this.view === "hours" && !this.ampm ? l`<circle cx=${140} cy=${140} r="82" class="face-inner"></circle>` : g}
        <!-- hand -->
        <line x1=${140} y1=${140} x2=${n} y2=${h} class="hand"/>
        <circle cx=${n} cy=${h} r="18" class="hand-tip"/>
        <circle cx=${140} cy=${140} r="4" class="hand-center"/>
        <!-- numbers -->
        ${f.map((b) => {
      const S = b.inner ? b.val % 12 : b.val, de = Nl(S, y, b.r, 140, 140), te = this.view === "hours" ? this.ampm ? Se(i.h).hour === b.val : i.h === b.val : this.view === "minutes" ? i.m === b.val : i.s === b.val;
      return l`
          <circle cx=${de.x} cy=${de.y} r="17" class=${u({ "num-bg": !0, selected: te })}></circle>
          <text x=${de.x} y=${de.y} class=${u({ num: !0, selected: te, "inner-label": !!b.inner })}>${b.label}</text>
        `;
    })}
      </svg>
    `;
  }
  render() {
    const e = this._t, { hour: t, ampm: i } = Se(e.h), o = this.ampm ? j(t) : j(e.h);
    return l`
      <div class="clock-wrap">
        <div class="clock-header">
          <span class=${u({ "clock-seg": !0, active: this.view === "hours" })} @click=${() => this._switchView("hours")}>${o}</span>
          <span class="clock-sep">:</span>
          <span class=${u({ "clock-seg": !0, active: this.view === "minutes" })} @click=${() => this._switchView("minutes")}>${j(e.m)}</span>
          ${this.seconds ? l`<span class="clock-sep">:</span><span class=${u({ "clock-seg": !0, active: this.view === "seconds" })} @click=${() => this._switchView("seconds")}>${j(e.s)}</span>` : g}
          ${this.ampm ? l`<span class="clock-sep" style="font-size:1rem;align-self:flex-end;margin-bottom:6px;">${i}</span>` : g}
        </div>
        ${this.ampm ? l`
          <div class="am-pm">
            <button class=${u({ "am-pm-btn": !0, sel: i === "AM" })} @click=${() => {
      const r = this._t;
      this._emit(Tt(Se(r.h).hour, "AM"), r.m, r.s);
    }}>AM</button>
            <button class=${u({ "am-pm-btn": !0, sel: i === "PM" })} @click=${() => {
      const r = this._t;
      this._emit(Tt(Se(r.h).hour, "PM"), r.m, r.s);
    }}>PM</button>
          </div>
        ` : g}
        ${this._renderFace()}
      </div>
    `;
  }
};
bt.styles = p(Ml);
v([
  s({ type: String })
], bt.prototype, "value", 2);
v([
  s({ type: Boolean })
], bt.prototype, "ampm", 2);
v([
  s({ type: Boolean })
], bt.prototype, "seconds", 2);
v([
  s({ type: String })
], bt.prototype, "view", 2);
bt = v([
  d("ui-time-clock")
], bt);
const co = ao`
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
let ve = class extends c {
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
          <ui-multi-section-digital-clock .value=${this.value || ot(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
            @change=${(e) => {
      this.value = e.detail.value;
    }}
          ></ui-multi-section-digital-clock>
          <div class="actions">
            <button class="btn btn-cancel" @click=${() => this._open = !1}>Cancel</button>
            <button class="btn btn-ok" @click=${() => this._commit(this.value || ot(12, 0))}>OK</button>
          </div>
        </div>
      </div>
    `;
  }
};
ve.styles = [co];
v([
  s({ type: String })
], ve.prototype, "value", 2);
v([
  s({ type: String })
], ve.prototype, "label", 2);
v([
  s({ type: Boolean })
], ve.prototype, "ampm", 2);
v([
  s({ type: Boolean })
], ve.prototype, "seconds", 2);
v([
  s({ type: Boolean, reflect: !0 })
], ve.prototype, "disabled", 2);
v([
  s({ type: Boolean, reflect: !0 })
], ve.prototype, "readonly", 2);
v([
  s({ type: Boolean, reflect: !0 })
], ve.prototype, "error", 2);
v([
  s({ type: String, attribute: "helper-text" })
], ve.prototype, "helperText", 2);
v([
  m()
], ve.prototype, "_open", 2);
ve = v([
  d("ui-desktop-time-picker")
], ve);
let ae = class extends c {
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
          <ui-time-clock .value=${this._pending || this.value || ot(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds} .view=${this._view}
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
ae.styles = [co];
v([
  s({ type: String })
], ae.prototype, "value", 2);
v([
  s({ type: String })
], ae.prototype, "label", 2);
v([
  s({ type: Boolean })
], ae.prototype, "ampm", 2);
v([
  s({ type: Boolean })
], ae.prototype, "seconds", 2);
v([
  s({ type: Boolean, reflect: !0 })
], ae.prototype, "disabled", 2);
v([
  s({ type: Boolean, reflect: !0 })
], ae.prototype, "error", 2);
v([
  s({ type: String, attribute: "helper-text" })
], ae.prototype, "helperText", 2);
v([
  m()
], ae.prototype, "_open", 2);
v([
  m()
], ae.prototype, "_pending", 2);
v([
  m()
], ae.prototype, "_view", 2);
ae = v([
  d("ui-mobile-time-picker")
], ae);
let Gt = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.ampm = !0, this.seconds = !1;
  }
  render() {
    return l`
      <div class="surface">
        <ui-multi-section-digital-clock .value=${this.value || ot(12, 0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
          @change=${(e) => {
      this.value = e.detail.value, this.dispatchEvent(new CustomEvent("change", { detail: e.detail, bubbles: !0, composed: !0 }));
    }}
        ></ui-multi-section-digital-clock>
      </div>
    `;
  }
};
Gt.styles = p(Ll);
v([
  s({ type: String })
], Gt.prototype, "value", 2);
v([
  s({ type: Boolean })
], Gt.prototype, "ampm", 2);
v([
  s({ type: Boolean })
], Gt.prototype, "seconds", 2);
Gt = v([
  d("ui-static-time-picker")
], Gt);
let _e = class extends c {
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
_e.styles = p(jl);
v([
  s({ type: String })
], _e.prototype, "value", 2);
v([
  s({ type: String })
], _e.prototype, "label", 2);
v([
  s({ type: String })
], _e.prototype, "variant", 2);
v([
  s({ type: Boolean })
], _e.prototype, "ampm", 2);
v([
  s({ type: Boolean })
], _e.prototype, "seconds", 2);
v([
  s({ type: Boolean, reflect: !0 })
], _e.prototype, "disabled", 2);
v([
  s({ type: Boolean, reflect: !0 })
], _e.prototype, "error", 2);
v([
  s({ type: String, attribute: "helper-text" })
], _e.prototype, "helperText", 2);
_e = v([
  d("ui-time-picker")
], _e);
const ql = ':host{display:block;outline:none;font-family:var(--ui-font-family)}:host(:focus-visible) .item-row{outline:2px solid var(--ui-primary-color);outline-offset:-2px}.item-row{display:flex;align-items:center;min-height:36px;padding-right:8px;border-radius:var(--ui-border-radius-sm);cursor:pointer;-webkit-user-select:none;user-select:none;color:var(--ui-text-color);font-size:14px;transition:background-color .15s ease;position:relative}:host(:not([disabled])) .item-row:hover{background-color:var(--ui-hover-color)}:host([disabled]) .item-row{opacity:.38;cursor:default}.expand-btn{width:28px;height:28px;min-width:28px;display:flex;align-items:center;justify-content:center;background:none;border:none;padding:0;border-radius:50%;cursor:pointer;color:inherit;transition:transform .2s ease,background-color .15s}.expand-btn:hover{background-color:var(--ui-active-color)}.expand-btn.expanded{transform:rotate(90deg)}.expand-placeholder{width:28px;min-width:28px}.item-label{flex:1;line-height:1.5}.children-container{display:block}.children-container[hidden]{display:none!important}.item-row.is-draggable{cursor:grab}.item-row.is-draggable:active{cursor:grabbing}:host([drop-position="before"]) .item-row:before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background-color:var(--ui-primary-color);z-index:10;border-radius:2px}:host([drop-position="after"]) .item-row:after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background-color:var(--ui-primary-color);z-index:10;border-radius:2px}:host([drop-position="inside"]) .item-row{background-color:var(--ui-primary-color-light);outline:2px solid var(--ui-primary-color);outline-offset:-2px}:host([dragging]){opacity:.4}.drag-handle{display:flex;align-items:center;justify-content:center;width:24px;height:24px;cursor:grab;color:var(--ui-text-color-muted);margin-right:4px;flex-shrink:0}.drag-handle:active{cursor:grabbing}';
var Hl = Object.defineProperty, Kl = Object.getOwnPropertyDescriptor, $e = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Kl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Hl(t, i, r), r;
};
let ne = class extends c {
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
        ` : g}

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
        ${this.label ? g : l`<slot name="label"></slot>`}
      </div>

      <div class="children-container" ?hidden=${!this.expanded} role="group">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
ne.styles = p(ql);
$e([
  s({ type: String, attribute: "item-id", reflect: !0 })
], ne.prototype, "itemId", 2);
$e([
  s({ type: String })
], ne.prototype, "label", 2);
$e([
  s({ type: Boolean, reflect: !0 })
], ne.prototype, "disabled", 2);
$e([
  s({ type: Boolean, reflect: !0 })
], ne.prototype, "expanded", 2);
$e([
  s({ type: Boolean, attribute: "has-children", reflect: !0 })
], ne.prototype, "hasChildren", 2);
$e([
  m()
], ne.prototype, "_isDraggable", 2);
$e([
  m()
], ne.prototype, "_handleOnly", 2);
$e([
  s({ type: String, attribute: "drop-position", reflect: !0 })
], ne.prototype, "dropPosition", 2);
$e([
  s({ type: Boolean, attribute: "show-drag-handle" })
], ne.prototype, "showDragHandle", 2);
$e([
  m()
], ne.prototype, "_hasSlottedChildren", 2);
ne = $e([
  d("ui-tree-item")
], ne);
const Yl = ":host{display:block;font-family:var(--ui-font-family, system-ui, sans-serif)}.tree-root{padding:4px 0}";
var Gl = Object.defineProperty, Wl = Object.getOwnPropertyDescriptor, Ot = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Wl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Gl(t, i, r), r;
};
let He = class extends c {
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
            const a = this._getFocusableItems(), n = a.indexOf(i), h = a[n + 1];
            h && this._focusItem(h);
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
            const a = e.key.toLowerCase(), n = r < 0 ? 0 : r + 1, f = [
              ...o.slice(n),
              ...o.slice(0, n)
            ].find(
              (y) => y.label.toLowerCase().startsWith(a)
            );
            f && this._focusItem(f);
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
He.styles = p(Yl);
Ot([
  s({ type: Boolean, attribute: "disabled-items-focusable" })
], He.prototype, "disabledItemsFocusable", 2);
Ot([
  s({ attribute: !1 })
], He.prototype, "onItemClick", 2);
Ot([
  s({ attribute: !1 })
], He.prototype, "expandedItems", 2);
Ot([
  s({ attribute: !1 })
], He.prototype, "defaultExpandedItems", 2);
Ot([
  s({ attribute: !1 })
], He.prototype, "onExpandedItemsChange", 2);
Ot([
  s({ type: String, attribute: "expansion-trigger" })
], He.prototype, "expansionTrigger", 2);
He = Ot([
  d("ui-simple-tree-view")
], He);
const Xl = ":host{display:block;font-family:var(--ui-font-family)}.tree-root{padding:4px 0}.lazy-indicator{display:flex;align-items:center;gap:8px;min-height:32px;font-size:14px;color:var(--ui-text-color)}.lazy-root{padding:8px}@keyframes ui-spin{to{transform:rotate(360deg)}}.lazy-spinner{width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:ui-spin .7s linear infinite;flex-shrink:0;opacity:.55}ui-tree-item[dragging]{opacity:.4}ui-tree-item[drop-position=before]{box-shadow:0 -2px 0 0 var(--ui-primary-color)}ui-tree-item[drop-position=after]{box-shadow:0 2px 0 0 var(--ui-primary-color)}ui-tree-item[drop-position=inside]{outline:2px solid var(--ui-primary-color);outline-offset:-1px;border-radius:4px}";
var Jl = Object.defineProperty, Zl = Object.getOwnPropertyDescriptor, P = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Zl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Jl(t, i, r), r;
};
let I = class extends c {
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
            const a = this._getFocusableItems(), n = a.indexOf(i), h = a[n + 1];
            h && this._focusItem(h);
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
            const a = e.key.toLowerCase(), n = r < 0 ? 0 : r + 1, f = [
              ...o.slice(n),
              ...o.slice(0, n)
            ].find(
              (y) => y.label.toLowerCase().startsWith(a)
            );
            f && this._focusItem(f);
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
    let a = [], n = !1, h = !1;
    this.dataSource ? this._lazyChildren.has(i) ? (a = this._lazyChildren.get(i), h = a.length > 0) : (n = this._loading.has(i), h = this.dataSource.getChildrenCount(e) !== 0) : (a = this.getItemChildren(e) ?? [], h = a.length > 0);
    const f = (t + 1) * 24 + 8;
    return l`
      <ui-tree-item
        item-id=${i}
        label=${o}
        ?disabled=${r}
        ?has-children=${h}
        ?show-drag-handle=${this.itemsReordering && this.itemsReorderingHandle}
      >
        ${n ? l`
          <div class="lazy-indicator" style="padding-left:${f}px">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        ` : g}
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
        ` : g}
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
    let n = null, h = 0;
    if (i === "inside") {
      const f = r.item, y = this.getItemChildren(f), b = Object.keys(f).find((de) => f[de] === y) || "children";
      f[b] || (f[b] = []);
      const S = f[b];
      S.push(o.item), n = t, h = S.length - 1;
    } else {
      const f = this._findItemAndParentInTree(t, this._orderedItems);
      if (!f) return;
      const y = i === "before" ? f.index : f.index + 1;
      f.parentList.splice(y, 0, o.item), n = f.parentId, h = y;
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
I.styles = p(Xl);
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
const Ql = ":host{display:inline-flex;align-items:center;margin-left:auto;padding-left:8px;font-size:.6875rem;letter-spacing:.05em;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", ec = ":host{display:block;height:1px;background:var(--ui-border-color);margin:4px 0}:host([hidden]){display:none!important}", tc = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s}:host([highlighted]) .item{background:var(--ui-command-highlight-bg, var(--ui-hover-color));color:var(--ui-command-highlight-color, var(--ui-text-color))}.item:hover{background:var(--ui-hover-color)}:host([highlighted]) .item:hover{background:var(--ui-command-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.38;cursor:not-allowed;pointer-events:none}.icon{display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;color:var(--ui-text-color-muted)}.label{flex:1}[hidden]{display:none!important}", ic = ":host{display:block;padding:24px 8px;text-align:center;font-size:.875rem;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}:host([hidden]){display:none!important}", rc = ":host{display:block;font-family:var(--ui-font-family)}:host([hidden]){display:none!important}.heading{padding:6px 8px 2px;font-size:.6875rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ui-text-color-muted)}.heading:empty{display:none}", oc = ":host{display:block;overflow-y:auto;max-height:var(--ui-command-list-max-height, 300px)}.list{padding:4px;outline:none}.list:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:-2px}", sc = ":host{display:block;font-family:var(--ui-font-family)}.input-wrap{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--ui-border-color)}.search-icon{flex-shrink:0;color:var(--ui-text-color-muted);display:flex;align-items:center}input{flex:1;border:none;outline:none;background:transparent;font-size:.9375rem;color:var(--ui-text-color);font-family:inherit;min-width:0}input::placeholder{color:var(--ui-text-color-muted)}input[type=search]::-webkit-search-cancel-button{display:none}input[type=search]::-webkit-search-decoration{display:none}", ac = ":host{display:block;font-family:var(--ui-font-family);background:var(--ui-surface-1);border-radius:var(--ui-border-radius-md);overflow:hidden}.command{display:flex;flex-direction:column}", nc = ":host{display:block}.backdrop{position:fixed;inset:0;background:#00000080;z-index:var(--ui-command-z-index, 1400);display:flex;align-items:flex-start;justify-content:center;padding-top:12vh;opacity:0;pointer-events:none;transition:opacity .18s ease}.backdrop.open{opacity:1;pointer-events:auto}.panel{width:100%;max-width:var(--ui-command-dialog-width, 512px);background:var(--ui-surface-1);border-radius:var(--ui-border-radius-md);box-shadow:0 20px 25px -5px #00000026,0 10px 10px -5px #0000000f;overflow:hidden;transform:scale(.94) translateY(-8px);transition:transform .18s cubic-bezier(.4,0,.2,1)}.backdrop.open .panel{transform:scale(1) translateY(0)}";
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, N = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && lc(t, i, r), r;
};
let Ir = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ir.styles = p(Ql);
Ir = N([
  d("ui-command-shortcut")
], Ir);
let Er = class extends c {
  render() {
    return l``;
  }
};
Er.styles = p(ec);
Er = N([
  d("ui-command-separator")
], Er);
let vt = class extends c {
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
vt.styles = p(tc);
N([
  s({ type: String, reflect: !0 })
], vt.prototype, "value", 2);
N([
  s({ type: Boolean, reflect: !0 })
], vt.prototype, "disabled", 2);
N([
  s({ type: Boolean, reflect: !0 })
], vt.prototype, "highlighted", 2);
N([
  m()
], vt.prototype, "_hasIcon", 2);
vt = N([
  d("ui-command-item")
], vt);
let Pr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Pr.styles = p(ic);
Pr = N([
  d("ui-command-empty")
], Pr);
let Ui = class extends c {
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
Ui.styles = p(rc);
N([
  s({ type: String, reflect: !0 })
], Ui.prototype, "heading", 2);
Ui = N([
  d("ui-command-group")
], Ui);
let Or = class extends c {
  render() {
    return l`
            <div class="list" role="listbox" tabindex="0" aria-label="Command results">
                <slot></slot>
            </div>
        `;
  }
};
Or.styles = p(oc);
Or = N([
  d("ui-command-list")
], Or);
let vi = class extends c {
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
vi.styles = p(sc);
N([
  s({ type: String })
], vi.prototype, "placeholder", 2);
N([
  s({ type: String, reflect: !0 })
], vi.prototype, "value", 2);
vi = N([
  d("ui-command-input")
], vi);
let Dr = class extends c {
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
    for (const h of i) {
      const f = (h.value || h.textContent || "").toLowerCase().trim(), y = t === "" || f.includes(t);
      h.hidden = !y, y && o++;
    }
    const r = [...this.querySelectorAll("ui-command-group")];
    for (const h of r) {
      const f = [...h.querySelectorAll("ui-command-item")];
      h.hidden = f.length === 0 || f.every((y) => y.hidden);
    }
    const a = this.querySelector("ui-command-empty");
    a && (a.hidden = o > 0);
    const n = this.querySelector("ui-command-list");
    if (n) {
      const h = [...n.children], f = (y) => y.tagName.toLowerCase() !== "ui-command-separator" && y.tagName.toLowerCase() !== "ui-command-empty" && !y.hidden;
      for (const y of h) {
        if (y.tagName.toLowerCase() !== "ui-command-separator") continue;
        const b = h.indexOf(y), S = h.slice(0, b).some(f), de = h.slice(b + 1).some(f);
        y.hidden = !S || !de;
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
Dr.styles = p(ac);
Dr = N([
  d("ui-command")
], Dr);
let Ri = class extends c {
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
Ri.styles = p(nc);
N([
  s({ type: Boolean, reflect: !0 })
], Ri.prototype, "open", 2);
Ri = N([
  d("ui-command-dialog")
], Ri);
const dc = ':host{display:block;overflow:hidden;width:100%}.track{display:flex;flex-wrap:nowrap;height:100%;gap:var(--ui-carousel-gap, 0px);will-change:transform;transition:transform var(--ui-carousel-duration, .35s) var(--ui-carousel-ease, cubic-bezier(.25, .1, .25, 1))}:host([orientation="vertical"]){height:var(--ui-carousel-height, 320px)}:host([orientation="vertical"]) .track{flex-direction:column}::slotted(ui-carousel-item){flex:0 0 calc((100% - (var(--ui-carousel-items-per-view, 1) - 1) * var(--ui-carousel-gap, 0px)) / var(--ui-carousel-items-per-view, 1));min-width:0;min-height:0}:host([orientation="vertical"]) ::slotted(ui-carousel-item){flex:0 0 calc((var(--ui-carousel-height, 320px) - (var(--ui-carousel-items-per-view, 1) - 1) * var(--ui-carousel-gap, 0px)) / var(--ui-carousel-items-per-view, 1));min-height:0}', pc = ":host{display:block;flex-shrink:0;min-width:0}.item{width:100%;height:100%}", hc = ":host{display:block;position:relative}.carousel{position:relative;width:100%;outline:none}.carousel:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:4px;border-radius:var(--ui-border-radius-md)}";
var uc = Object.defineProperty, fc = Object.getOwnPropertyDescriptor, G = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && uc(t, i, r), r;
};
const po = ao`
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
let Wt = class extends c {
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
Wt.styles = p(dc);
G([
  s({ type: Number })
], Wt.prototype, "index", 2);
G([
  s({ type: Number, attribute: "items-per-view" })
], Wt.prototype, "itemsPerView", 2);
G([
  s({ reflect: !0 })
], Wt.prototype, "orientation", 2);
Wt = G([
  d("ui-carousel-content")
], Wt);
let zr = class extends c {
  render() {
    return l`
      <div class="item" role="group" aria-roledescription="slide">
        <slot></slot>
      </div>
    `;
  }
};
zr.styles = p(pc);
zr = G([
  d("ui-carousel-item")
], zr);
let mi = class extends c {
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
mi.styles = po;
G([
  s({ type: Boolean, reflect: !0 })
], mi.prototype, "disabled", 2);
G([
  s({ reflect: !0 })
], mi.prototype, "orientation", 2);
mi = G([
  d("ui-carousel-previous")
], mi);
let gi = class extends c {
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
gi.styles = po;
G([
  s({ type: Boolean, reflect: !0 })
], gi.prototype, "disabled", 2);
G([
  s({ reflect: !0 })
], gi.prototype, "orientation", 2);
gi = G([
  d("ui-carousel-next")
], gi);
let mt = class extends c {
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
mt.styles = p(hc);
G([
  s({ type: Boolean })
], mt.prototype, "loop", 2);
G([
  s({ reflect: !0 })
], mt.prototype, "orientation", 2);
G([
  s({ type: Number })
], mt.prototype, "autoplay", 2);
G([
  s({ type: Number, attribute: "items-per-view" })
], mt.prototype, "itemsPerView", 2);
mt = G([
  d("ui-carousel")
], mt);
const bc = ":host{display:block;font-size:1rem;font-weight:600;line-height:1.4;color:var(--ui-text-color);font-family:var(--ui-font-family);margin:0}", vc = ":host{display:block;font-size:.875rem;line-height:1.5;color:var(--ui-text-color-muted);font-family:var(--ui-font-family);margin:0}", mc = ":host{display:flex;align-items:center;justify-content:center}.media{display:flex;align-items:center;justify-content:center}.media--icon{width:48px;height:48px;border-radius:12px;background:var(--ui-empty-media-bg, var(--ui-surface-2));color:var(--ui-empty-media-color, var(--ui-text-color-muted))}::slotted(svg),::slotted([data-icon]){width:24px;height:24px}", gc = ":host{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}", yc = ":host{display:flex;flex-direction:column;align-items:center;gap:8px}", xc = ":host{display:flex;flex-direction:column;align-items:center;justify-content:center}.container{display:flex;flex-direction:column;align-items:center;gap:var(--ui-empty-gap, 16px);padding:var(--ui-empty-padding, 32px);max-width:var(--ui-empty-max-width, 480px);width:100%;box-sizing:border-box;text-align:center;font-family:var(--ui-font-family, system-ui, sans-serif)}";
var _c = Object.defineProperty, wc = Object.getOwnPropertyDescriptor, Dt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _c(t, i, r), r;
};
let Tr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Tr.styles = p(bc);
Tr = Dt([
  d("ui-empty-title")
], Tr);
let Ar = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ar.styles = p(vc);
Ar = Dt([
  d("ui-empty-description")
], Ar);
let Vi = class extends c {
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
Vi.styles = p(mc);
Dt([
  s({ reflect: !0 })
], Vi.prototype, "variant", 2);
Vi = Dt([
  d("ui-empty-media")
], Vi);
let Br = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Br.styles = p(gc);
Br = Dt([
  d("ui-empty-header")
], Br);
let Mr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Mr.styles = p(yc);
Mr = Dt([
  d("ui-empty-content")
], Mr);
let Lr = class extends c {
  render() {
    return l`
            <div class="container" part="container">
                <slot></slot>
            </div>
        `;
  }
};
Lr.styles = p(xc);
Lr = Dt([
  d("ui-empty")
], Lr);
const kc = ":host{display:block}.trigger{display:flex;align-items:center;width:100%;background:none;border:none;padding:0;margin:0;cursor:pointer;font:inherit;color:inherit;text-align:left}:host([disabled]) .trigger{cursor:not-allowed;opacity:.5}", $c = ":host{display:block}.panel{display:grid;grid-template-rows:0fr;overflow:hidden;transition:grid-template-rows var(--ui-collapsible-duration, .2s) var(--ui-collapsible-easing, ease)}:host([open]) .panel{grid-template-rows:1fr}.panel-inner{overflow:hidden}", Sc = ":host{display:block}";
var Cc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, We = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ic(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Cc(t, i, r), r;
};
let yi = class extends c {
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
yi.styles = p(kc);
We([
  s({ type: Boolean, reflect: !0 })
], yi.prototype, "expanded", 2);
We([
  s({ type: Boolean, reflect: !0 })
], yi.prototype, "disabled", 2);
yi = We([
  d("ui-collapsible-trigger")
], yi);
let Ni = class extends c {
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
Ni.styles = p($c);
We([
  s({ type: Boolean, reflect: !0 })
], Ni.prototype, "open", 2);
Ni = We([
  d("ui-collapsible-content")
], Ni);
let Xt = class extends c {
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
Xt.styles = p(Sc);
We([
  s({ type: Boolean, reflect: !0 })
], Xt.prototype, "open", 2);
We([
  s({ type: Boolean, attribute: "default-open" })
], Xt.prototype, "defaultOpen", 2);
We([
  s({ type: Boolean, reflect: !0 })
], Xt.prototype, "disabled", 2);
Xt = We([
  d("ui-collapsible")
], Xt);
const Ec = ":host{display:inline-block}", Pc = ":host{display:block;position:absolute;z-index:var(--ui-hovercard-z-index, 1000);opacity:0;visibility:hidden;transition:opacity var(--ui-hovercard-duration, .15s) ease,visibility var(--ui-hovercard-duration, .15s) ease;pointer-events:none}:host([open]){opacity:1;visibility:visible;pointer-events:auto}.card{background:var(--ui-hovercard-bg, var(--ui-surface-1));border:1px solid var(--ui-hovercard-border-color, var(--ui-border-color));border-radius:var(--ui-hovercard-radius, 8px);box-shadow:var(--ui-hovercard-shadow, 0 4px 16px rgba(0, 0, 0, .12));padding:var(--ui-hovercard-padding, 16px);min-width:var(--ui-hovercard-min-width, 200px);font-family:var(--ui-font-family);font-size:var(--ui-hovercard-font-size, .875rem);color:var(--ui-hovercard-color, var(--ui-text-color));line-height:1.5}", Oc = ":host{display:inline-block;position:relative}";
var Dc = Object.defineProperty, zc = Object.getOwnPropertyDescriptor, ct = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Dc(t, i, r), r;
};
let jr = class extends c {
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
jr.styles = p(Ec);
jr = ct([
  d("ui-hover-card-trigger")
], jr);
let Jt = class extends c {
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
Jt.styles = p(Pc);
ct([
  s({ type: String, reflect: !0 })
], Jt.prototype, "side", 2);
ct([
  s({ type: String, reflect: !0 })
], Jt.prototype, "align", 2);
ct([
  s({ type: Boolean, reflect: !0 })
], Jt.prototype, "open", 2);
Jt = ct([
  d("ui-hover-card-content")
], Jt);
let xi = class extends c {
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
xi.styles = p(Oc);
ct([
  s({ type: Number, attribute: "open-delay" })
], xi.prototype, "openDelay", 2);
ct([
  s({ type: Number, attribute: "close-delay" })
], xi.prototype, "closeDelay", 2);
xi = ct([
  d("ui-hover-card")
], xi);
const Tc = ":host{display:inline-flex;align-items:center}", Ac = ":host{display:inline-flex;align-items:center;padding:0 6px;color:var(--ui-text-color, #111827)}.bar{width:8px;height:2px;background:currentColor;border-radius:1px;opacity:.4}", Bc = ":host{position:relative;display:inline-flex;align-items:center;justify-content:center;width:40px;height:48px;font-size:1.25rem;font-family:var(--ui-font-family);font-weight:500;color:var(--ui-text-color);background:var(--ui-input-bg);border:1px solid var(--ui-input-border-color);margin-left:-1px;cursor:text;-webkit-user-select:none;user-select:none;transition:border-color .15s ease,box-shadow .15s ease}:host(:first-child){margin-left:0;border-radius:6px 0 0 6px}:host(:last-child){border-radius:0 6px 6px 0}:host([active]){z-index:1;border-color:var(--ui-primary-color);box-shadow:0 0 0 2px var(--ui-primary-focus-ring)}:host([invalid]){border-color:var(--ui-error-color)}:host([invalid][active]){border-color:var(--ui-error-color);box-shadow:0 0 0 2px var(--ui-error-focus-ring)}.cursor{width:2px;height:1.2em;background:var(--ui-text-color);border-radius:1px;animation:otp-blink 1.2s step-end infinite}@keyframes otp-blink{0%,to{opacity:1}50%{opacity:0}}", Mc = ":host{display:inline-flex;align-items:center;gap:8px;position:relative;cursor:text;font-family:var(--ui-font-family, system-ui, sans-serif)}:host([disabled]){opacity:.5;cursor:not-allowed;pointer-events:none}.hidden-input{position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;top:0;left:0;border:none;outline:none;padding:0;margin:0}";
var Lc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, ee = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? jc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Lc(t, i, r), r;
};
let Ur = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Ur.styles = p(Tc);
Ur = ee([
  d("ui-input-otp-group")
], Ur);
let Rr = class extends c {
  render() {
    return l`<div class="bar"></div>`;
  }
};
Rr.styles = p(Ac);
Rr = ee([
  d("ui-input-otp-separator")
], Rr);
let gt = class extends c {
  constructor() {
    super(...arguments), this.index = 0, this.char = "", this.active = !1, this.invalid = !1;
  }
  render() {
    return this.char ? l`${this.char}` : this.active ? l`<div class="cursor"></div>` : l``;
  }
};
gt.styles = p(Bc);
ee([
  s({ type: Number })
], gt.prototype, "index", 2);
ee([
  s()
], gt.prototype, "char", 2);
ee([
  s({ type: Boolean, reflect: !0 })
], gt.prototype, "active", 2);
ee([
  s({ type: Boolean, reflect: !0 })
], gt.prototype, "invalid", 2);
gt = ee([
  d("ui-input-otp-slot")
], gt);
let Ke = class extends c {
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
Ke.styles = p(Mc);
ee([
  s({ reflect: !0 })
], Ke.prototype, "value", 2);
ee([
  s({ attribute: "default-value" })
], Ke.prototype, "defaultValue", 2);
ee([
  s({ type: Number, attribute: "max-length" })
], Ke.prototype, "maxLength", 2);
ee([
  s()
], Ke.prototype, "pattern", 2);
ee([
  s({ type: Boolean, reflect: !0 })
], Ke.prototype, "disabled", 2);
ee([
  wi(".hidden-input")
], Ke.prototype, "_hiddenInput", 2);
Ke = ee([
  d("ui-input-otp")
], Ke);
const Uc = ":host{display:block;font-size:.875rem;font-weight:500;line-height:1.4;color:var(--ui-text-color);font-family:var(--ui-font-family)}", Rc = ":host{display:block;font-size:.8125rem;line-height:1.5;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", Vc = ":host{display:flex;flex-shrink:0;align-items:center;justify-content:center}.media{display:flex;align-items:center;justify-content:center}.media--icon{width:40px;height:40px;border-radius:8px;background:var(--ui-item-media-icon-bg, var(--ui-surface-2));color:var(--ui-item-media-icon-color, var(--ui-text-color-muted))}.media--image{width:40px;height:40px;border-radius:6px;overflow:hidden;flex-shrink:0}::slotted(svg),::slotted([data-icon]){width:20px;height:20px}::slotted(img){width:100%;height:100%;object-fit:cover;display:block}", Nc = ":host{display:flex;flex-direction:column;flex:1 1 auto;min-width:0;gap:2px}", Fc = ":host{display:flex;flex-shrink:0;align-items:center;gap:8px;margin-left:auto}", qc = ":host{display:block;flex:0 0 calc(100% + 2 * var(--ui-item-padding, 16px));margin-left:calc(-1 * var(--ui-item-padding, 16px));margin-right:calc(-1 * var(--ui-item-padding, 16px));margin-top:calc(-1 * var(--ui-item-padding, 16px));margin-bottom:0;overflow:hidden;line-height:0}::slotted(img){width:100%;display:block;object-fit:cover}", Hc = ":host{display:block;flex:0 0 calc(100% + 2 * var(--ui-item-padding, 16px));margin-left:calc(-1 * var(--ui-item-padding, 16px));margin-right:calc(-1 * var(--ui-item-padding, 16px));margin-bottom:calc(-1 * var(--ui-item-padding, 16px));margin-top:0;padding:10px var(--ui-item-padding, 16px);border-top:1px solid var(--ui-border-color);background:var(--ui-item-footer-bg, transparent);box-sizing:border-box;font-size:.8125rem;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", Kc = ":host{display:block;height:1px;background:var(--ui-border-color)}", Yc = ":host{display:flex;flex-direction:column;gap:var(--ui-item-group-gap, 4px)}", Gc = ':host{--ui-item-padding: 16px;--ui-item-gap: 12px;display:flex;flex-wrap:wrap;align-items:center;gap:var(--ui-item-gap);padding:var(--ui-item-padding);border-radius:8px;box-sizing:border-box;overflow:hidden;font-family:var(--ui-font-family)}:host([size="sm"]){--ui-item-padding: 12px;--ui-item-gap: 8px}:host([size="xs"]){--ui-item-padding: 8px;--ui-item-gap: 6px}:host([variant="outline"]){border:1px solid var(--ui-border-color)}:host([variant="muted"]){background:var(--ui-muted-bg, var(--ui-muted-background))}';
var Wc = Object.defineProperty, Xc = Object.getOwnPropertyDescriptor, ce = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Wc(t, i, r), r;
};
let Vr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Vr.styles = p(Uc);
Vr = ce([
  d("ui-item-title")
], Vr);
let Nr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Nr.styles = p(Rc);
Nr = ce([
  d("ui-item-description")
], Nr);
let Fi = class extends c {
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
Fi.styles = p(Vc);
ce([
  s({ reflect: !0 })
], Fi.prototype, "variant", 2);
Fi = ce([
  d("ui-item-media")
], Fi);
let Fr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Fr.styles = p(Nc);
Fr = ce([
  d("ui-item-content")
], Fr);
let qr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
qr.styles = p(Fc);
qr = ce([
  d("ui-item-actions")
], qr);
let Hr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Hr.styles = p(qc);
Hr = ce([
  d("ui-item-header")
], Hr);
let Kr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Kr.styles = p(Hc);
Kr = ce([
  d("ui-item-footer")
], Kr);
let Yr = class extends c {
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "separator"), this.hasAttribute("aria-orientation") || this.setAttribute("aria-orientation", "horizontal");
  }
  render() {
    return l``;
  }
};
Yr.styles = p(Kc);
Yr = ce([
  d("ui-item-separator")
], Yr);
let Gr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Gr.styles = p(Yc);
Gr = ce([
  d("ui-item-group")
], Gr);
let _i = class extends c {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "default";
  }
  render() {
    return l`<slot></slot>`;
  }
};
_i.styles = p(Gc);
ce([
  s({ reflect: !0 })
], _i.prototype, "variant", 2);
ce([
  s({ reflect: !0 })
], _i.prototype, "size", 2);
_i = ce([
  d("ui-item")
], _i);
const Jc = ':host{display:inline-flex;align-items:center;justify-content:center}kbd{display:inline-flex;align-items:center;justify-content:center;font-family:var(--ui-kbd-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);font-size:.8125rem;font-weight:500;line-height:1;color:var(--ui-kbd-color, var(--ui-label-color));background:var(--ui-kbd-bg, var(--ui-surface-2));border:1px solid var(--ui-kbd-border-color, var(--ui-border-color));border-bottom-width:2px;border-radius:var(--ui-kbd-radius, var(--ui-border-radius-sm));box-shadow:0 1px 0 0 var(--ui-kbd-shadow-color, var(--ui-input-border-color));padding:2px 6px;white-space:nowrap;-webkit-user-select:none;user-select:none}:host([size="sm"]) kbd{font-size:.6875rem;padding:1px 4px}:host([size="lg"]) kbd{font-size:.9375rem;padding:4px 10px}:host([variant="flat"]) kbd{border-bottom-width:1px;box-shadow:none}', Zc = ":host{display:inline-flex;align-items:center;gap:var(--ui-kbd-group-gap, 4px)}";
var Qc = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, Ei = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ed(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Qc(t, i, r), r;
};
let Zt = class extends c {
  constructor() {
    super(...arguments), this.size = "default", this.variant = "raised", this.label = "";
  }
  render() {
    return l`
            <kbd aria-label=${this.label || g}>
                <slot></slot>
            </kbd>
        `;
  }
};
Zt.styles = p(Jc);
Ei([
  s({ reflect: !0 })
], Zt.prototype, "size", 2);
Ei([
  s({ reflect: !0 })
], Zt.prototype, "variant", 2);
Ei([
  s({ reflect: !0 })
], Zt.prototype, "label", 2);
Zt = Ei([
  d("ui-kbd")
], Zt);
let Wr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Wr.styles = p(Zc);
Wr = Ei([
  d("ui-kbd-group")
], Wr);
const td = ":host{display:inline-flex;align-items:center;margin-left:auto;padding-left:16px;font-size:.6875rem;letter-spacing:.05em;color:var(--ui-text-color-muted);font-family:var(--ui-font-family)}", id = ":host{display:block;height:1px;background:var(--ui-border-color);margin:4px -4px}:host([hidden]){display:none!important}", rd = ":host{display:block}.heading{padding:6px 8px 4px;font-size:.6875rem;font-weight:600;color:var(--ui-text-color-muted);font-family:var(--ui-font-family);-webkit-user-select:none;user-select:none}", od = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s}:host([inset]) .item{padding-left:32px}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none;cursor:default}", sd = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px 6px 32px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s;position:relative}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none}.check{position:absolute;left:8px;top:50%;transform:translateY(-50%);width:16px;height:16px;display:flex;align-items:center;justify-content:center}", ad = ":host{display:block}:host([hidden]){display:none!important}.item{display:flex;align-items:center;gap:8px;padding:6px 8px 6px 32px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s;position:relative}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none}.dot{position:absolute;left:8px;top:50%;transform:translateY(-50%);width:16px;height:16px;display:flex;align-items:center;justify-content:center}", nd = ":host{display:block}", ld = ":host{display:none;position:absolute;left:100%;top:-4px;z-index:1001}:host([open]){display:block}.panel{min-width:180px;background:var(--ui-menubar-content-bg, var(--ui-surface-1));border:1px solid var(--ui-border-color);border-radius:6px;padding:4px;box-shadow:0 4px 16px #0000001f;animation:menubar-sub-in .12s ease-out}@keyframes menubar-sub-in{0%{opacity:0;transform:translate(-4px)}to{opacity:1;transform:translate(0)}}", cd = ":host{display:block}.item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:.875rem;line-height:1.25rem;color:var(--ui-text-color);font-family:var(--ui-font-family);outline:none;-webkit-user-select:none;user-select:none;transition:background .1s}:host([inset]) .item{padding-left:32px}:host([highlighted]) .item{background:var(--ui-menubar-highlight-bg, var(--ui-hover-color))}:host([disabled]) .item{opacity:.5;pointer-events:none}.arrow{margin-left:auto;width:14px;height:14px;color:var(--ui-text-color-muted)}", dd = ":host{display:block;position:relative}", pd = ":host{display:none;position:absolute;top:100%;left:0;z-index:1000;padding-top:4px}:host([open]){display:block}.panel{min-width:200px;background:var(--ui-menubar-content-bg, var(--ui-surface-1));border:1px solid var(--ui-border-color);border-radius:6px;padding:4px;box-shadow:0 4px 16px #0000001f;animation:menubar-in .12s ease-out}@keyframes menubar-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}", hd = ":host{display:inline-flex}.trigger{display:inline-flex;align-items:center;justify-content:center;padding:4px 10px;border:none;background:transparent;border-radius:4px;font-size:.875rem;font-weight:500;line-height:1.5;color:var(--ui-text-color);font-family:var(--ui-font-family);cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap;transition:background .1s}.trigger:hover,:host([active]) .trigger{background:var(--ui-menubar-trigger-hover-bg, var(--ui-hover-color))}.trigger:focus-visible{outline:2px solid var(--ui-primary-color);outline-offset:-2px}.trigger:disabled,:host([disabled]) .trigger{opacity:.5;cursor:default;pointer-events:none}", ud = ":host{display:inline-block;position:relative}", fd = ":host{display:inline-flex;align-items:center;background:var(--ui-menubar-bg, var(--ui-surface-1));border:1px solid var(--ui-border-color);border-radius:6px;padding:3px;gap:2px;font-family:var(--ui-font-family)}";
var bd = Object.defineProperty, vd = Object.getOwnPropertyDescriptor, x = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? vd(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && bd(t, i, r), r;
};
let Xr = class extends c {
  render() {
    return l`<slot></slot>`;
  }
};
Xr.styles = p(td);
Xr = x([
  d("ui-menubar-shortcut")
], Xr);
let Jr = class extends c {
  render() {
    return l``;
  }
};
Jr.styles = p(id);
Jr = x([
  d("ui-menubar-separator")
], Jr);
let qi = class extends c {
  constructor() {
    super(...arguments), this.heading = "";
  }
  render() {
    return l`
            ${this.heading ? l`<div class="heading" role="presentation">${this.heading}</div>` : g}
            <div role="group" aria-label=${this.heading || g}>
                <slot></slot>
            </div>
        `;
  }
};
qi.styles = p(rd);
x([
  s({ reflect: !0 })
], qi.prototype, "heading", 2);
qi = x([
  d("ui-menubar-group")
], qi);
let yt = class extends c {
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
yt.styles = p(od);
x([
  s({ reflect: !0, type: Boolean })
], yt.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], yt.prototype, "highlighted", 2);
x([
  s({ reflect: !0, type: Boolean })
], yt.prototype, "inset", 2);
x([
  s({ reflect: !0 })
], yt.prototype, "value", 2);
yt = x([
  d("ui-menubar-item")
], yt);
let xt = class extends c {
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
                    ${this.checked ? l`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>` : g}
                </span>
                <slot></slot>
            </div>
        `;
  }
};
xt.styles = p(sd);
x([
  s({ reflect: !0, type: Boolean })
], xt.prototype, "checked", 2);
x([
  s({ reflect: !0, type: Boolean })
], xt.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], xt.prototype, "highlighted", 2);
x([
  s({ reflect: !0 })
], xt.prototype, "value", 2);
xt = x([
  d("ui-menubar-checkbox-item")
], xt);
let _t = class extends c {
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
                    ${this.checked ? l`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"></circle></svg>` : g}
                </span>
                <slot></slot>
            </div>
        `;
  }
};
_t.styles = p(ad);
x([
  s({ reflect: !0 })
], _t.prototype, "value", 2);
x([
  s({ reflect: !0, type: Boolean })
], _t.prototype, "checked", 2);
x([
  s({ reflect: !0, type: Boolean })
], _t.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], _t.prototype, "highlighted", 2);
_t = x([
  d("ui-menubar-radio-item")
], _t);
let Hi = class extends c {
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
Hi.styles = p(nd);
x([
  s({ reflect: !0 })
], Hi.prototype, "value", 2);
Hi = x([
  d("ui-menubar-radio-group")
], Hi);
let Ki = class extends c {
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
Ki.styles = p(ld);
x([
  s({ reflect: !0, type: Boolean })
], Ki.prototype, "open", 2);
Ki = x([
  d("ui-menubar-sub-content")
], Ki);
let wt = class extends c {
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
wt.styles = p(cd);
x([
  s({ reflect: !0, type: Boolean })
], wt.prototype, "highlighted", 2);
x([
  s({ reflect: !0, type: Boolean })
], wt.prototype, "disabled", 2);
x([
  s({ reflect: !0, type: Boolean })
], wt.prototype, "inset", 2);
x([
  s({ reflect: !0, type: Boolean })
], wt.prototype, "expanded", 2);
wt = x([
  d("ui-menubar-sub-trigger")
], wt);
let Zr = class extends c {
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
Zr.styles = p(dd);
Zr = x([
  d("ui-menubar-sub")
], Zr);
let Yi = class extends c {
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
Yi.styles = p(pd);
x([
  s({ reflect: !0, type: Boolean })
], Yi.prototype, "open", 2);
Yi = x([
  d("ui-menubar-content")
], Yi);
let Qt = class extends c {
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
Qt.styles = p(hd);
x([
  s({ reflect: !0, type: Boolean })
], Qt.prototype, "active", 2);
x([
  s({ reflect: !0, type: Boolean })
], Qt.prototype, "disabled", 2);
x([
  m()
], Qt.prototype, "_focusable", 2);
Qt = x([
  d("ui-menubar-trigger")
], Qt);
let Gi = class extends c {
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
Gi.styles = p(ud);
x([
  s({ reflect: !0, type: Boolean })
], Gi.prototype, "disabled", 2);
Gi = x([
  d("ui-menubar-menu")
], Gi);
let Wi = class extends c {
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
Wi.styles = p(fd);
x([
  s({ reflect: !0 })
], Wi.prototype, "label", 2);
Wi = x([
  d("ui-menubar")
], Wi);
export {
  fi as UiAccordion,
  Sr as UiAccordionActions,
  $r as UiAccordionDetails,
  kr as UiAccordionSummary,
  Lt as UiAlert,
  Nt as UiAppBar,
  he as UiAutocomplete,
  Ee as UiAvatar,
  Rt as UiBackdrop,
  Ze as UiBadge,
  Ft as UiBottomNavigation,
  et as UiBottomNavigationAction,
  w as UiBox,
  Pe as UiBreadcrumbs,
  pt as UiButton,
  lr as UiButtonGroup,
  ni as UiCard,
  pr as UiCardActionArea,
  dr as UiCardActions,
  cr as UiCardContent,
  li as UiCardHeader,
  Bt as UiCardMedia,
  mt as UiCarousel,
  Wt as UiCarouselContent,
  zr as UiCarouselItem,
  gi as UiCarouselNext,
  mi as UiCarouselPrevious,
  Ce as UiCheckbox,
  Ue as UiChip,
  ue as UiCircularProgress,
  Xt as UiCollapsible,
  Ni as UiCollapsibleContent,
  yi as UiCollapsibleTrigger,
  Dr as UiCommand,
  Ri as UiCommandDialog,
  Pr as UiCommandEmpty,
  Ui as UiCommandGroup,
  vi as UiCommandInput,
  vt as UiCommandItem,
  Or as UiCommandList,
  Er as UiCommandSeparator,
  Ir as UiCommandShortcut,
  Ht as UiContainer,
  T as UiDateField,
  H as UiDatePicker,
  Te as UiDatePickerCalendar,
  ve as UiDesktopTimePicker,
  Vt as UiDialog,
  Ai as UiDialogActions,
  _r as UiDialogContent,
  wr as UiDialogContentText,
  xr as UiDialogTitle,
  Kt as UiDigitalClock,
  ut as UiDivider,
  Re as UiDrawer,
  Lr as UiEmpty,
  Mr as UiEmptyContent,
  Ar as UiEmptyDescription,
  Br as UiEmptyHeader,
  Vi as UiEmptyMedia,
  Tr as UiEmptyTitle,
  ht as UiFab,
  z as UiGrid,
  xi as UiHoverCard,
  Jt as UiHoverCardContent,
  jr as UiHoverCardTrigger,
  rt as UiImageList,
  qe as UiImageListItem,
  ji as UiImageListItemBar,
  F as UiInput,
  Ke as UiInputOtp,
  Ur as UiInputOtpGroup,
  Rr as UiInputOtpSeparator,
  gt as UiInputOtpSlot,
  _i as UiItem,
  qr as UiItemActions,
  Fr as UiItemContent,
  Nr as UiItemDescription,
  Kr as UiItemFooter,
  Gr as UiItemGroup,
  Hr as UiItemHeader,
  Fi as UiItemMedia,
  Yr as UiItemSeparator,
  Vr as UiItemTitle,
  Zt as UiKbd,
  Wr as UiKbdGroup,
  xe as UiLinearProgress,
  fe as UiLink,
  di as UiList,
  hr as UiListItem,
  fr as UiListItemAvatar,
  pi as UiListItemButton,
  ur as UiListItemIcon,
  Ut as UiListItemText,
  br as UiListSubheader,
  tt as UiMenu,
  Cr as UiMenuDivider,
  Bi as UiMenuGroup,
  De as UiMenuItem,
  Wi as UiMenubar,
  xt as UiMenubarCheckboxItem,
  Yi as UiMenubarContent,
  qi as UiMenubarGroup,
  yt as UiMenubarItem,
  Gi as UiMenubarMenu,
  Hi as UiMenubarRadioGroup,
  _t as UiMenubarRadioItem,
  Jr as UiMenubarSeparator,
  Xr as UiMenubarShortcut,
  Zr as UiMenubarSub,
  Ki as UiMenubarSubContent,
  wt as UiMenubarSubTrigger,
  Qt as UiMenubarTrigger,
  Ne as UiMobileStepper,
  ae as UiMobileTimePicker,
  Yt as UiMultiSectionDigitalClock,
  A as UiPagination,
  Mt as UiPaper,
  Ie as UiRadio,
  ge as UiRadioGroup,
  J as UiRating,
  I as UiRichTreeView,
  D as UiSelect,
  He as UiSimpleTreeView,
  je as UiSkeleton,
  q as UiSlider,
  ye as UiSnackbar,
  be as UiSpeedDial,
  Ve as UiSpeedDialAction,
  X as UiStack,
  Gt as UiStaticTimePicker,
  W as UiStep,
  bi as UiStepConnector,
  Mi as UiStepContent,
  qt as UiStepLabel,
  it as UiStepper,
  re as UiSwitch,
  Fe as UiTab,
  se as UiTabList,
  Li as UiTabPanel,
  vr as UiTable,
  gr as UiTableBody,
  hi as UiTableCell,
  zi as UiTableContainer,
  yr as UiTableFooter,
  mr as UiTableHead,
  ft as UiTablePagination,
  Ti as UiTableRow,
  ui as UiTableSortLabel,
  ze as UiTabs,
  oe as UiTextField,
  bt as UiTimeClock,
  B as UiTimeField,
  _e as UiTimePicker,
  jt as UiToggleButton,
  ci as UiToggleButtonGroup,
  Qe as UiTooltip,
  Le as UiTransferList,
  ne as UiTreeItem,
  Oe as UiTypography
};
