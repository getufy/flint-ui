(function(t,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("lit"),require("lit/decorators.js"),require("lit/directives/class-map.js"),require("lit/directives/repeat.js"),require("lit/directives/if-defined.js"),require("lit/directives/style-map.js"),require("lit/static-html.js")):typeof define=="function"&&define.amd?define(["exports","lit","lit/decorators.js","lit/directives/class-map.js","lit/directives/repeat.js","lit/directives/if-defined.js","lit/directives/style-map.js","lit/static-html.js"],a):(t=typeof globalThis<"u"?globalThis:t||self,a(t.StorybookLitComponent={},t.lit,t.litDecorators,t.litClassMap,t.repeat_js,t.ifDefined_js,t.styleMap_js,t.staticHtml_js))})(this,(function(t,a,n,h,ue,Te,ne,w){"use strict";var ot=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,ke=(l,e,i,o)=>{for(var r=o>1?void 0:o?nt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&ot(e,i,r),r};t.UiButton=class extends a.LitElement{constructor(){super(...arguments),this.variant="primary",this.size="medium",this.disabled=!1,this.fullWidth=!1}render(){const e={primary:this.variant==="primary",secondary:this.variant==="secondary",destructive:this.variant==="destructive",small:this.size==="small",medium:this.size==="medium",large:this.size==="large"};return a.html`
      <button
        type="button"
        class=${h.classMap(e)}
        ?disabled=${this.disabled}
        part="button"
      >
        <slot></slot>
      </button>
    `}},t.UiButton.styles=a.css`
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
  `,ke([n.property({type:String})],t.UiButton.prototype,"variant",2),ke([n.property({type:String})],t.UiButton.prototype,"size",2),ke([n.property({type:Boolean})],t.UiButton.prototype,"disabled",2),ke([n.property({type:Boolean,reflect:!0,attribute:"full-width"})],t.UiButton.prototype,"fullWidth",2),t.UiButton=ke([n.customElement("ui-button")],t.UiButton);var at=Object.getOwnPropertyDescriptor,st=(l,e,i,o)=>{for(var r=o>1?void 0:o?at(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=c(r)||r);return r};t.UiButtonGroup=class extends a.LitElement{render(){return a.html`
      <slot></slot>
    `}},t.UiButtonGroup.styles=a.css`
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
  `,t.UiButtonGroup=st([n.customElement("ui-button-group")],t.UiButtonGroup);var lt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,Ye=(l,e,i,o)=>{for(var r=o>1?void 0:o?ct(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&lt(e,i,r),r};t.UiCard=class extends a.LitElement{constructor(){super(...arguments),this.variant="elevated",this.interactive=!1}render(){const e={card:!0,[`variant-${this.variant}`]:!0,interactive:this.interactive};return a.html`
      <div class=${h.classMap(e)} part="card">
        <slot></slot>
      </div>
    `}},t.UiCard.styles=a.css`
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
  `,Ye([n.property({type:String,reflect:!0})],t.UiCard.prototype,"variant",2),Ye([n.property({type:Boolean,reflect:!0})],t.UiCard.prototype,"interactive",2),t.UiCard=Ye([n.customElement("ui-card")],t.UiCard);var pt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,Ke=(l,e,i,o)=>{for(var r=o>1?void 0:o?dt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&pt(e,i,r),r};t.UiCardHeader=class extends a.LitElement{constructor(){super(...arguments),this.title="",this.subtitle=""}render(){return a.html`
      <div class="header" part="header">
        <slot name="avatar"></slot>
        <div class="content" part="content">
          ${this.title?a.html`<h3 class="title" part="title">${this.title}</h3>`:""}
          ${this.subtitle?a.html`<p class="subtitle" part="subtitle">${this.subtitle}</p>`:""}
          <slot></slot>
        </div>
        <slot name="action"></slot>
      </div>
    `}},t.UiCardHeader.styles=a.css`
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
  `,Ke([n.property({type:String})],t.UiCardHeader.prototype,"title",2),Ke([n.property({type:String})],t.UiCardHeader.prototype,"subtitle",2),t.UiCardHeader=Ke([n.customElement("ui-card-header")],t.UiCardHeader);var ht=Object.getOwnPropertyDescriptor,ut=(l,e,i,o)=>{for(var r=o>1?void 0:o?ht(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=c(r)||r);return r};t.UiCardContent=class extends a.LitElement{render(){return a.html`
      <slot></slot>
    `}},t.UiCardContent.styles=a.css`
    :host {
      display: block;
      padding: var(--ui-card-content-padding, 16px 24px);
      font-size: var(--ui-card-content-size, 1rem);
      color: var(--ui-card-content-color, #4b5563);
      line-height: 1.5;
    }
  `,t.UiCardContent=ut([n.customElement("ui-card-content")],t.UiCardContent);var mt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,De=(l,e,i,o)=>{for(var r=o>1?void 0:o?ft(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&mt(e,i,r),r};t.UiCardMedia=class extends a.LitElement{constructor(){super(...arguments),this.image="",this.alt="",this.height=""}render(){if(this.image){const e=this.height?isNaN(Number(this.height))?this.height:`${this.height}px`:"",i=e?`height: ${e}`:"";return a.html`
                <div class="media" part="media" style=${i}>
                    <img src="${this.image}" alt="${this.alt}" part="img" loading="lazy" />
                </div>
            `}return a.html`<slot></slot>`}},t.UiCardMedia.styles=a.css`
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
  `,De([n.property({type:String})],t.UiCardMedia.prototype,"image",2),De([n.property({type:String})],t.UiCardMedia.prototype,"alt",2),De([n.property({type:String})],t.UiCardMedia.prototype,"height",2),t.UiCardMedia=De([n.customElement("ui-card-media")],t.UiCardMedia);var bt=Object.getOwnPropertyDescriptor,gt=(l,e,i,o)=>{for(var r=o>1?void 0:o?bt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=c(r)||r);return r};t.UiCardActions=class extends a.LitElement{render(){return a.html`
      <slot></slot>
    `}},t.UiCardActions.styles=a.css`
    :host {
      display: flex;
      padding: var(--ui-card-actions-padding, 8px 16px);
      align-items: center;
      gap: 8px;
    }
  `,t.UiCardActions=gt([n.customElement("ui-card-actions")],t.UiCardActions);var vt=Object.getOwnPropertyDescriptor,yt=(l,e,i,o)=>{for(var r=o>1?void 0:o?vt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=c(r)||r);return r};t.UiCardActionArea=class extends a.LitElement{render(){return a.html`
      <div class="action-area" part="action-area" @keydown=${this._handleKeyDown} tabindex="0" role="button">
        <slot></slot>
      </div>
    `}_handleKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())}},t.UiCardActionArea.styles=a.css`
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
  `,t.UiCardActionArea=yt([n.customElement("ui-card-action-area")],t.UiCardActionArea);var wt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,Le=(l,e,i,o)=>{for(var r=o>1?void 0:o?xt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&wt(e,i,r),r};t.UiPaper=class extends a.LitElement{constructor(){super(...arguments),this.elevation=1,this.square=!1,this.variant="elevated"}render(){return a.html`
            <div class="paper" role="region">
                <slot></slot>
            </div>
        `}},t.UiPaper.styles=a.css`
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
    `,Le([n.property({type:Number,reflect:!0})],t.UiPaper.prototype,"elevation",2),Le([n.property({type:Boolean,reflect:!0})],t.UiPaper.prototype,"square",2),Le([n.property({type:String,reflect:!0})],t.UiPaper.prototype,"variant",2),t.UiPaper=Le([n.customElement("ui-paper")],t.UiPaper);var kt=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,V=(l,e,i,o)=>{for(var r=o>1?void 0:o?Ut(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&kt(e,i,r),r};t.UiInput=class extends a.LitElement{constructor(){super(...arguments),this.label="",this.value="",this.type="text",this.placeholder="",this.helpText="",this.error=!1,this.errorMessage="",this.disabled=!1}render(){const e=this.error||!!this.errorMessage;return a.html`
      <div class="input-wrapper ${h.classMap({error:e})}" part="wrapper">
        ${this.label?a.html`<label part="label">${this.label}</label>`:""}
        
        <input
          part="input"
          .type=${this.type}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        
        ${e&&this.errorMessage?a.html`<p class="help-text error-text" part="error-text">${this.errorMessage}</p>`:this.helpText?a.html`<p class="help-text" part="help-text">${this.helpText}</p>`:""}
      </div>
    `}_handleInput(e){this.value=e.target.value,this.dispatchEvent(new CustomEvent("ui-input-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleChange(e){this.value=e.target.value,this.dispatchEvent(new CustomEvent("ui-input-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}},t.UiInput.styles=a.css`
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
  `,V([n.property({type:String})],t.UiInput.prototype,"label",2),V([n.property({type:String})],t.UiInput.prototype,"value",2),V([n.property({type:String})],t.UiInput.prototype,"type",2),V([n.property({type:String})],t.UiInput.prototype,"placeholder",2),V([n.property({type:String})],t.UiInput.prototype,"helpText",2),V([n.property({type:Boolean})],t.UiInput.prototype,"error",2),V([n.property({type:String})],t.UiInput.prototype,"errorMessage",2),V([n.property({type:Boolean})],t.UiInput.prototype,"disabled",2),V([n.query("input")],t.UiInput.prototype,"inputElement",2),t.UiInput=V([n.customElement("ui-input")],t.UiInput);var _t=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,J=(l,e,i,o)=>{for(var r=o>1?void 0:o?$t(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&_t(e,i,r),r};t.UiSelect=class extends a.LitElement{constructor(){super(...arguments),this.label="",this.options=[],this.value=[],this.multiple=!1,this.placeholder="Select an option",this.disabled=!1,this.isOpen=!1,this._handleOutsideClick=e=>{this.isOpen&&!this.contains(e.target)&&(this.isOpen=!1)}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleOutsideClick)}_toggleDropdown(){this.disabled||(this.isOpen=!this.isOpen)}_handleOptionClick(e,i){if(i.stopPropagation(),this.multiple){const o=[...this.value],r=o.indexOf(e.value);r>-1?o.splice(r,1):o.push(e.value),this.value=o}else this.value=[e.value],this.isOpen=!1;this._dispatchChange()}_removeValue(e,i){i.stopPropagation(),this.value=this.value.filter(o=>o!==e),this._dispatchChange()}_dispatchChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.multiple?this.value:this.value[0]},bubbles:!0,composed:!0}))}render(){const e=this.options.filter(i=>this.value.includes(i.value));return a.html`
      <div class="wrapper">
        ${this.label?a.html`<label>${this.label}</label>`:""}
        
        <div 
          class="select-trigger ${h.classMap({focused:this.isOpen,disabled:this.disabled,has_value:e.length>0})}"
          @click=${this._toggleDropdown}
          role="combobox"
          aria-expanded="${this.isOpen}"
          aria-haspopup="listbox"
        >
          <slot name="icon"></slot>
          
          <div class="value-container">
            ${e.length===0?a.html`
              <span class="placeholder">${this.placeholder}</span>
            `:""}
            
            ${this.multiple?ue.repeat(e,i=>i.value,i=>a.html`
                <span class="chip">
                  ${i.label}
                  <span class="chip-remove" @click=${o=>this._removeValue(i.value,o)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </span>
                </span>
              `):e[0]?a.html`
                <span class="single-value">${e[0].label}</span>
              `:""}
          </div>

          <div class="arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div class="dropdown ${h.classMap({open:this.isOpen})}" role="listbox">
          ${this.options.length===0?a.html`
            <div class="option" style="cursor: default; opacity: 0.5;">No options available</div>
          `:ue.repeat(this.options,i=>i.value,i=>{const o=this.value.includes(i.value);return a.html`
              <div 
                class="option ${h.classMap({selected:o})}"
                @click=${r=>this._handleOptionClick(i,r)}
                role="option"
                aria-selected="${o}"
              >
                <span>${i.label}</span>
                <div class="check-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}},t.UiSelect.styles=a.css`
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
  `,J([n.property({type:String})],t.UiSelect.prototype,"label",2),J([n.property({type:Array})],t.UiSelect.prototype,"options",2),J([n.property({type:Array})],t.UiSelect.prototype,"value",2),J([n.property({type:Boolean})],t.UiSelect.prototype,"multiple",2),J([n.property({type:String})],t.UiSelect.prototype,"placeholder",2),J([n.property({type:Boolean,reflect:!0})],t.UiSelect.prototype,"disabled",2),J([n.state()],t.UiSelect.prototype,"isOpen",2),t.UiSelect=J([n.customElement("ui-select")],t.UiSelect);var Ct=Object.defineProperty,It=Object.getOwnPropertyDescriptor,Ue=(l,e,i,o)=>{for(var r=o>1?void 0:o?It(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ct(e,i,r),r};t.UiFab=class extends a.LitElement{constructor(){super(...arguments),this.extended=!1,this.disabled=!1,this.label="Action",this.position="bottom-right"}updated(e){e.has("position")&&this._applyPositionToHost()}_applyPositionToHost(){if(this.style.top="",this.style.bottom="",this.style.left="",this.style.right="",this.style.position="",this.position==="static"){this.style.position="static";return}const e={"bottom-right":["","24px","24px",""],"bottom-left":["","24px","","24px"],"top-right":["24px","","24px",""],"top-left":["24px","","","24px"]},[i,o,r,s]=e[this.position]??e["bottom-right"];this.style.position="fixed",this.style.top=i,this.style.bottom=o,this.style.right=r,this.style.left=s}render(){const e={fab:!0,extended:this.extended};return a.html`
      <button
        class="${h.classMap(e)}"
        ?disabled="${this.disabled}"
        aria-label="${Te.ifDefined(this.extended?void 0:this.label)}"
      >
        <span class="icon-slot">
          <slot name="icon"></slot>
          <slot></slot>
        </span>
        ${this.extended?a.html`<span class="label-slot"><slot name="label"></slot></span>`:""}
      </button>
    `}},t.UiFab.styles=a.css`
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
  `,Ue([n.property({type:Boolean,reflect:!0})],t.UiFab.prototype,"extended",2),Ue([n.property({type:Boolean,reflect:!0})],t.UiFab.prototype,"disabled",2),Ue([n.property({type:String})],t.UiFab.prototype,"label",2),Ue([n.property({type:String})],t.UiFab.prototype,"position",2),t.UiFab=Ue([n.customElement("ui-fab")],t.UiFab);var Et=Object.defineProperty,St=Object.getOwnPropertyDescriptor,N=(l,e,i,o)=>{for(var r=o>1?void 0:o?St(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Et(e,i,r),r};t.UiAutocomplete=class extends a.LitElement{constructor(){super(...arguments),this.options=[],this.freeSolo=!1,this.disabled=!1,this.value="",this.placeholder="",this._isOpen=!1,this._inputValue="",this._filteredOptions=[],this._activeIndex=-1,this._handleOutsideClick=e=>{if(!this.contains(e.target)&&(this._isOpen=!1,this._activeIndex=-1,!this.freeSolo)){const i=this.options.find(o=>o.value===this.value);this._inputValue=i?i.label:""}}}connectedCallback(){super.connectedCallback(),this._inputValue=this.value,document.addEventListener("click",this._handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleOutsideClick)}willUpdate(e){if(e.has("options")&&(this._filterOptions(),this._activeIndex=-1),e.has("value")&&!e.has("_inputValue")){const i=this.options.find(o=>o.value===this.value);i?this._inputValue=i.label:this.freeSolo?this._inputValue=this.value:this._inputValue=""}}_handleInput(e){const i=e.target;this._inputValue=i.value,this._activeIndex=-1,this.freeSolo&&(this.value=this._inputValue,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,label:this.value}}))),this._filterOptions(),this._isOpen=!0}_filterOptions(){const e=this._inputValue.toLowerCase();this._filteredOptions=this.options.filter(i=>i.label.toLowerCase().includes(e))}_handleFocus(){this.disabled||(this._filterOptions(),this._isOpen=!0,this._activeIndex=-1)}_handleKeyDown(e){const i=this._filteredOptions.length;if(!this._isOpen){(e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),this._filterOptions(),this._isOpen=!0,this._activeIndex=e.key==="ArrowDown"?0:i-1);return}switch(e.key){case"ArrowDown":e.preventDefault(),this._activeIndex=Math.min(this._activeIndex+1,i-1),this._scrollActiveIntoView();break;case"ArrowUp":e.preventDefault(),this._activeIndex=Math.max(this._activeIndex-1,-1),this._scrollActiveIntoView();break;case"Enter":this._activeIndex>=0&&this._filteredOptions[this._activeIndex]&&(e.preventDefault(),this._selectOption(this._filteredOptions[this._activeIndex]));break;case"Escape":if(e.preventDefault(),this._isOpen=!1,this._activeIndex=-1,!this.freeSolo){const o=this.options.find(r=>r.value===this.value);this._inputValue=o?o.label:""}break;case"Tab":this._isOpen=!1,this._activeIndex=-1;break}}_scrollActiveIntoView(){this.updateComplete.then(()=>{if(this._activeIndex<0)return;const i=this.shadowRoot?.querySelectorAll(".option")?.[this._activeIndex];i&&typeof i.scrollIntoView=="function"&&i.scrollIntoView({block:"nearest"})})}_selectOption(e){this.value=e.value,this._inputValue=e.label,this._isOpen=!1,this._activeIndex=-1,this.dispatchEvent(new CustomEvent("change",{detail:{value:e.value,label:e.label}}))}render(){const e=this._isOpen&&(this._filteredOptions.length>0||!this.freeSolo);return a.html`
      <div class="input-wrapper">
        <input
          type="text"
          role="combobox"
          aria-expanded=${e?"true":"false"}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-activedescendant=${this._activeIndex>=0?`option-${this._activeIndex}`:""}
          .value=${this._inputValue}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @keydown=${this._handleKeyDown}
        />
        <div
          role="listbox"
          class=${h.classMap({dropdown:!0,open:e})}
        >
          ${this._filteredOptions.length>0?this._filteredOptions.map((i,o)=>a.html`
                  <div
                    id="option-${o}"
                    role="option"
                    aria-selected=${o===this._activeIndex?"true":"false"}
                    class=${h.classMap({option:!0,active:o===this._activeIndex})}
                    @mousedown=${r=>r.preventDefault()}
                    @click=${()=>this._selectOption(i)}
                  >
                    ${i.label}
                  </div>
                `):a.html`<div class="no-options">No options</div>`}
        </div>
      </div>
    `}},t.UiAutocomplete.styles=a.css`
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
  `,N([n.property({type:Array})],t.UiAutocomplete.prototype,"options",2),N([n.property({type:Boolean})],t.UiAutocomplete.prototype,"freeSolo",2),N([n.property({type:Boolean})],t.UiAutocomplete.prototype,"disabled",2),N([n.property({type:String})],t.UiAutocomplete.prototype,"value",2),N([n.property({type:String})],t.UiAutocomplete.prototype,"placeholder",2),N([n.state()],t.UiAutocomplete.prototype,"_isOpen",2),N([n.state()],t.UiAutocomplete.prototype,"_inputValue",2),N([n.state()],t.UiAutocomplete.prototype,"_filteredOptions",2),N([n.state()],t.UiAutocomplete.prototype,"_activeIndex",2),t.UiAutocomplete=N([n.customElement("ui-autocomplete")],t.UiAutocomplete);var Pt=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,Q=(l,e,i,o)=>{for(var r=o>1?void 0:o?Tt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Pt(e,i,r),r};t.UiCheckbox=class extends a.LitElement{constructor(){super(...arguments),this.checked=!1,this.indeterminate=!1,this.disabled=!1,this.required=!1,this.label="",this.name="",this.value=""}_handleChange(e){if(this.disabled)return;const i=e.target;this.checked=i.checked,this.indeterminate=!1,this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked,value:this.value,indeterminate:!1},bubbles:!0,composed:!0}))}render(){return a.html`
      <label class=${h.classMap({wrapper:!0,disabled:this.disabled})}>
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name||a.nothing}
          .value=${this.value}
          @change=${this._handleChange}
        >
        <div class=${h.classMap({checkbox:!0,checked:this.checked,indeterminate:this.indeterminate})}>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            ${this.indeterminate?a.html`<line x1="4" y1="12" x2="20" y2="12"></line>`:a.html`<polyline points="20 6 9 17 4 12"></polyline>`}
          </svg>
        </div>
        ${this.label?a.html`<span class="label">${this.label}</span>`:a.html`<slot class="label"></slot>`}
      </label>
    `}},t.UiCheckbox.styles=a.css`
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
  `,Q([n.property({type:Boolean,reflect:!0})],t.UiCheckbox.prototype,"checked",2),Q([n.property({type:Boolean})],t.UiCheckbox.prototype,"indeterminate",2),Q([n.property({type:Boolean,reflect:!0})],t.UiCheckbox.prototype,"disabled",2),Q([n.property({type:Boolean})],t.UiCheckbox.prototype,"required",2),Q([n.property({type:String})],t.UiCheckbox.prototype,"label",2),Q([n.property({type:String})],t.UiCheckbox.prototype,"name",2),Q([n.property({type:String})],t.UiCheckbox.prototype,"value",2),t.UiCheckbox=Q([n.customElement("ui-checkbox")],t.UiCheckbox);var Dt=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,G=(l,e,i,o)=>{for(var r=o>1?void 0:o?Lt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Dt(e,i,r),r};t.UiRadioGroup=class extends a.LitElement{constructor(){super(...arguments),this.name="",this.value=""}connectedCallback(){super.connectedCallback(),this.addEventListener("radio-changed",this._handleRadioChange)}_handleRadioChange(e){const{value:i}=e.detail;this.value=i,this.querySelectorAll("ui-radio").forEach(r=>{const s=r;s.checked=s.value===i}),this.dispatchEvent(new CustomEvent("change",{detail:{value:i},bubbles:!0,composed:!0}))}updated(e){e.has("value")&&this.querySelectorAll("ui-radio").forEach(o=>{const r=o;r.checked=r.value===this.value}),e.has("name")&&this.querySelectorAll("ui-radio").forEach(o=>{const r=o;r.name=this.name})}render(){return a.html`
      <div class="group-container" role="radiogroup">
        <slot></slot>
      </div>
    `}},t.UiRadioGroup.styles=a.css`
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
  `,G([n.property({type:String})],t.UiRadioGroup.prototype,"name",2),G([n.property({type:String})],t.UiRadioGroup.prototype,"value",2),t.UiRadioGroup=G([n.customElement("ui-radio-group")],t.UiRadioGroup),t.UiRadio=class extends a.LitElement{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.name="",this.value="",this.label=""}_handleChange(){this.disabled||this.checked||this.dispatchEvent(new CustomEvent("radio-changed",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){return a.html`
            <label class=${h.classMap({wrapper:!0,disabled:this.disabled})}>
                <input 
                    type="radio" 
                    .name=${this.name}
                    .value=${this.value}
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    @change=${this._handleChange}
                >
                <div class=${h.classMap({"radio-circle":!0,checked:this.checked})}></div>
                <span class="label">
                    ${this.label||a.html`<slot></slot>`}
                </span>
            </label>
        `}},t.UiRadio.styles=a.css`
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
    `,G([n.property({type:Boolean,reflect:!0})],t.UiRadio.prototype,"checked",2),G([n.property({type:Boolean})],t.UiRadio.prototype,"disabled",2),G([n.property({type:String})],t.UiRadio.prototype,"name",2),G([n.property({type:String})],t.UiRadio.prototype,"value",2),G([n.property({type:String})],t.UiRadio.prototype,"label",2),t.UiRadio=G([n.customElement("ui-radio")],t.UiRadio);var Ot=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,me=(l,e,i,o)=>{for(var r=o>1?void 0:o?Bt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ot(e,i,r),r};t.UiRating=class extends a.LitElement{constructor(){super(...arguments),this.value=0,this.max=5,this.readonly=!1,this.name="",this._hoverValue=-1}_handleMouseEnter(e){this.readonly||(this._hoverValue=e)}_handleMouseLeave(){this.readonly||(this._hoverValue=-1)}_handleClick(e){this.readonly||(this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}render(){const e=[];for(let i=1;i<=this.max;i++){const o=this._hoverValue>=i,r=this.value>=i&&this._hoverValue===-1;e.push(a.html`
            <span 
                class=${h.classMap({"star-wrapper":!0,active:r,hover:o,readonly:this.readonly})}
                @mouseenter=${()=>this._handleMouseEnter(i)}
                @mouseleave=${this._handleMouseLeave}
                @click=${()=>this._handleClick(i)}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            </span>
        `)}return a.html`
      <div class=${h.classMap({"rating-container":!0,readonly:this.readonly})} role="slider" 
           aria-valuemin="0" aria-valuemax=${this.max} aria-valuenow=${this.value}>
        ${e}
      </div>
    `}},t.UiRating.styles=a.css`
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
  `,me([n.property({type:Number})],t.UiRating.prototype,"value",2),me([n.property({type:Number})],t.UiRating.prototype,"max",2),me([n.property({type:Boolean})],t.UiRating.prototype,"readonly",2),me([n.property({type:String})],t.UiRating.prototype,"name",2),me([n.state()],t.UiRating.prototype,"_hoverValue",2),t.UiRating=me([n.customElement("ui-rating")],t.UiRating);var At=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,Oe=(l,e,i,o)=>{for(var r=o>1?void 0:o?zt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&At(e,i,r),r};t.UiSwitch=class extends a.LitElement{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.label=""}_handleClick(){this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked},bubbles:!0,composed:!0})))}render(){return a.html`
      <div class="wrapper" @click=${this._handleClick}>
        <div 
          class="switch ${h.classMap({checked:this.checked,disabled:this.disabled})}"
          role="switch"
          aria-checked="${this.checked}"
          aria-disabled="${this.disabled}"
          tabindex="${this.disabled?"-1":"0"}"
          @keydown=${e=>(e.key===" "||e.key==="Enter")&&this._handleClick()}
        >
          <div class="thumb">
            <div class="icon-wrapper">
              ${this.checked?a.html`<slot name="icon-on"></slot>`:a.html`<slot name="icon-off"></slot>`}
            </div>
          </div>
        </div>
        ${this.label?a.html`<span class="label">${this.label}</span>`:a.html`<slot></slot>`}
      </div>
    `}},t.UiSwitch.styles=a.css`
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
  `,Oe([n.property({type:Boolean,reflect:!0})],t.UiSwitch.prototype,"checked",2),Oe([n.property({type:Boolean,reflect:!0})],t.UiSwitch.prototype,"disabled",2),Oe([n.property({type:String})],t.UiSwitch.prototype,"label",2),t.UiSwitch=Oe([n.customElement("ui-switch")],t.UiSwitch);var Mt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,ae=(l,e,i,o)=>{for(var r=o>1?void 0:o?Rt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Mt(e,i,r),r};t.UiTransferList=class extends a.LitElement{constructor(){super(...arguments),this.options=[],this.value=[],this.leftTitle="Options",this.rightTitle="Selected",this.leftChecked=[],this.rightChecked=[]}_toggleChecked(e,i){i==="left"?this.leftChecked.indexOf(e)>-1?this.leftChecked=this.leftChecked.filter(r=>r!==e):this.leftChecked=[...this.leftChecked,e]:this.rightChecked.indexOf(e)>-1?this.rightChecked=this.rightChecked.filter(r=>r!==e):this.rightChecked=[...this.rightChecked,e]}_moveRight(){this.value=[...this.value,...this.leftChecked],this.leftChecked=[],this._dispatchChange()}_moveLeft(){this.value=this.value.filter(e=>!this.rightChecked.includes(e)),this.rightChecked=[],this._dispatchChange()}_moveAllRight(){this.value=this.options.map(e=>e.value),this.leftChecked=[],this.rightChecked=[],this._dispatchChange()}_moveAllLeft(){this.value=[],this.leftChecked=[],this.rightChecked=[],this._dispatchChange()}_dispatchChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){const e=this.options.filter(o=>!this.value.includes(o.value)),i=this.options.filter(o=>this.value.includes(o.value));return a.html`
      <div class="container">
        <!-- Left List -->
        <div class="list-wrapper">
          <div class="list-title">${this.leftTitle}</div>
          <div class="list-box">
            ${ue.repeat(e,o=>o.value,o=>a.html`
              <div 
                class="list-item ${h.classMap({selected:this.leftChecked.includes(o.value)})}"
                @click=${()=>this._toggleChecked(o.value,"left")}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${o.label}</span>
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
            ?disabled=${this.leftChecked.length===0}
            @click=${this._moveRight}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <button 
            class="action-button" 
            title="Move selected left" 
            ?disabled=${this.rightChecked.length===0}
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
            ${ue.repeat(i,o=>o.value,o=>a.html`
              <div 
                class="list-item ${h.classMap({selected:this.rightChecked.includes(o.value)})}"
                @click=${()=>this._toggleChecked(o.value,"right")}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${o.label}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `}},t.UiTransferList.styles=a.css`
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
  `,ae([n.property({type:Array})],t.UiTransferList.prototype,"options",2),ae([n.property({type:Array})],t.UiTransferList.prototype,"value",2),ae([n.property({type:String})],t.UiTransferList.prototype,"leftTitle",2),ae([n.property({type:String})],t.UiTransferList.prototype,"rightTitle",2),ae([n.state()],t.UiTransferList.prototype,"leftChecked",2),ae([n.state()],t.UiTransferList.prototype,"rightChecked",2),t.UiTransferList=ae([n.customElement("ui-transfer-list")],t.UiTransferList);var Ft=Object.defineProperty,Vt=Object.getOwnPropertyDescriptor,fe=(l,e,i,o)=>{for(var r=o>1?void 0:o?Vt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ft(e,i,r),r};t.UiBadge=class extends a.LitElement{constructor(){super(...arguments),this.content="",this.dot=!1,this.invisible=!1,this.variant="primary",this.max=99}get _displayContent(){if(this.dot)return"";const e=Number(this.content);return!isNaN(e)&&e>this.max?`${this.max}+`:this.content}render(){const e=!this.invisible&&(this.dot||this.content!=="");return a.html`
      <slot></slot>
      <span
        class="badge ${h.classMap({hidden:!e,dot:this.dot,[this.variant]:!0})}"
        role="status"
        aria-hidden="${e?"false":"true"}"
      >
        ${this._displayContent}
      </span>
    `}},t.UiBadge.styles=a.css`
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
  `,fe([n.property({type:String})],t.UiBadge.prototype,"content",2),fe([n.property({type:Boolean})],t.UiBadge.prototype,"dot",2),fe([n.property({type:Boolean})],t.UiBadge.prototype,"invisible",2),fe([n.property({type:String})],t.UiBadge.prototype,"variant",2),fe([n.property({type:Number})],t.UiBadge.prototype,"max",2),t.UiBadge=fe([n.customElement("ui-badge")],t.UiBadge);var Nt=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,Be=(l,e,i,o)=>{for(var r=o>1?void 0:o?qt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Nt(e,i,r),r};t.UiAlert=class extends a.LitElement{constructor(){super(...arguments),this.severity="info",this.title="",this.dismissible=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._closeTimer)}_handleClose(){this.dispatchEvent(new CustomEvent("ui-alert-close",{bubbles:!0,composed:!0,detail:{severity:this.severity}})),this.style.opacity="0",this.style.transform="translateY(-4px)",this.style.transition="opacity 0.2s ease, transform 0.2s ease",this._closeTimer=setTimeout(()=>{this.remove()},200)}_getIcon(){switch(this.severity){case"success":return a.html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;case"warning":return a.html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;case"error":return a.html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;default:return a.html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`}}render(){return a.html`
            <div class="alert ${h.classMap({[this.severity]:!0})}" role="alert">
                <div class="icon">
                    <slot name="icon">${this._getIcon()}</slot>
                </div>
                <div class="content">
                    ${this.title?a.html`<div class="title">${this.title}</div>`:""}
                    <div class="message">
                        <slot></slot>
                    </div>
                </div>
                ${this.dismissible?a.html`
                    <button class="close-button" @click=${this._handleClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                `:""}
            </div>
        `}},t.UiAlert.styles=a.css`
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
    `,Be([n.property({type:String})],t.UiAlert.prototype,"severity",2),Be([n.property({type:String})],t.UiAlert.prototype,"title",2),Be([n.property({type:Boolean})],t.UiAlert.prototype,"dismissible",2),t.UiAlert=Be([n.customElement("ui-alert")],t.UiAlert);var Ht=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,be=(l,e,i,o)=>{for(var r=o>1?void 0:o?Gt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ht(e,i,r),r};t.UiSkeleton=class extends a.LitElement{constructor(){super(...arguments),this.dark=!1,this.animation="pulse",this.variant="text",this.width="",this.height=""}render(){const e={width:this.width||(this.variant==="text"?"100%":""),height:this.height||(this.variant==="text"?"0.8em":""),marginTop:this.variant==="text"?"0.3em":"",marginBottom:this.variant==="text"?"0.3em":""};return a.html`
            <span 
                class="skeleton ${this.animation} ${this.variant}" 
                style=${ne.styleMap(e)}
                aria-hidden="true"
            ></span>
        `}},t.UiSkeleton.styles=a.css`
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
    `,be([n.property({type:Boolean,reflect:!0})],t.UiSkeleton.prototype,"dark",2),be([n.property({type:String})],t.UiSkeleton.prototype,"animation",2),be([n.property({type:String})],t.UiSkeleton.prototype,"variant",2),be([n.property({type:String})],t.UiSkeleton.prototype,"width",2),be([n.property({type:String})],t.UiSkeleton.prototype,"height",2),t.UiSkeleton=be([n.customElement("ui-skeleton")],t.UiSkeleton);var Yt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,_e=(l,e,i,o)=>{for(var r=o>1?void 0:o?Kt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Yt(e,i,r),r};t.UiSnackbar=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this.message="",this.autoHideDuration=5e3,this.anchorOrigin="bottom-center",this._timer=null}updated(e){e.has("open")&&(this.open?this._startTimer():this._clearTimer())}_startTimer(){this._clearTimer(),this.autoHideDuration>0&&(this._timer=setTimeout(()=>{this.close()},this.autoHideDuration))}_clearTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null)}close(){this.open=!1,this.dispatchEvent(new CustomEvent("ui-snackbar-close",{bubbles:!0,composed:!0}))}render(){const e={snackbar:!0,open:this.open};return a.html`
            <div class=${h.classMap(e)} role="presentation">
                <div class="message">
                    <slot>${this.message}</slot>
                </div>
                <div class="action">
                    <slot name="action"></slot>
                </div>
            </div>
        `}},t.UiSnackbar.styles=a.css`
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
    `,_e([n.property({type:Boolean,reflect:!0})],t.UiSnackbar.prototype,"open",2),_e([n.property({type:String})],t.UiSnackbar.prototype,"message",2),_e([n.property({type:Number})],t.UiSnackbar.prototype,"autoHideDuration",2),_e([n.property({type:String,attribute:"anchor-origin"})],t.UiSnackbar.prototype,"anchorOrigin",2),t.UiSnackbar=_e([n.customElement("ui-snackbar")],t.UiSnackbar);var Wt=Object.defineProperty,Xt=Object.getOwnPropertyDescriptor,$e=(l,e,i,o)=>{for(var r=o>1?void 0:o?Xt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Wt(e,i,r),r};t.UiDivider=class extends a.LitElement{constructor(){super(...arguments),this.orientation="horizontal",this.variant="full",this.weight="light",this.textAlign="center"}render(){return a.html`
      <div 
        class="divider-container ${h.classMap({[`variant-${this.variant}`]:!0,[`weight-${this.weight}`]:!0})}"
        role="separator"
        aria-orientation="${this.orientation}"
      >
        ${this.textAlign!=="left"||this.orientation==="vertical"?a.html`<div class="divider-line"></div>`:""}
        
        <slot class="divider-content"></slot>
        
        ${this.textAlign!=="right"||this.orientation==="vertical"?a.html`<div class="divider-line"></div>`:""}
      </div>
    `}},t.UiDivider.styles=a.css`
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
  `,$e([n.property({type:String,reflect:!0})],t.UiDivider.prototype,"orientation",2),$e([n.property({type:String})],t.UiDivider.prototype,"variant",2),$e([n.property({type:String})],t.UiDivider.prototype,"weight",2),$e([n.property({type:String})],t.UiDivider.prototype,"textAlign",2),t.UiDivider=$e([n.customElement("ui-divider")],t.UiDivider);var Jt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,Y=(l,e,i,o)=>{for(var r=o>1?void 0:o?Qt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Jt(e,i,r),r};t.UiSlider=class extends a.LitElement{constructor(){super(...arguments),this.value=50,this.min=0,this.max=100,this.step=1,this.disabled=!1,this.label="",this.showValue=!1,this.vertical=!1}_handleInput(e){const i=e.target;this.value=Number(i.value),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){const e=(this.value-this.min)/(this.max-this.min)*100,i=this.vertical?{background:`linear-gradient(to left, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${e}%, var(--ui-input-border-color, #d1d5db) ${e}%, var(--ui-input-border-color, #d1d5db) 100%)`}:{background:`linear-gradient(to right, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${e}%, var(--ui-input-border-color, #d1d5db) ${e}%, var(--ui-input-border-color, #d1d5db) 100%)`},o={"slider-wrapper":!0,vertical:this.vertical},r={"label-row":!0,vertical:this.vertical},s={"track-container":!0,vertical:this.vertical},c={vertical:this.vertical};return a.html`
      <div class=${h.classMap(o)}>
        <div class=${h.classMap(r)}>
          ${this.label?a.html`<label class=${h.classMap({"disabled-label":this.disabled})}>${this.label}</label>`:""}
          ${this.showValue?a.html`<span class="value-display">${this.value}</span>`:""}
        </div>
        <div class=${h.classMap(s)}>
          <input
            type="range"
            class=${h.classMap(c)}
            .min=${this.min.toString()}
            .max=${this.max.toString()}
            .step=${this.step.toString()}
            .value=${this.value.toString()}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            style=${ne.styleMap(i)}
            aria-label=${this.label||"Slider"}
            aria-orientation=${this.vertical?"vertical":"horizontal"}
          >
        </div>
      </div>
    `}},t.UiSlider.styles=a.css`
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
  `,Y([n.property({type:Number})],t.UiSlider.prototype,"value",2),Y([n.property({type:Number})],t.UiSlider.prototype,"min",2),Y([n.property({type:Number})],t.UiSlider.prototype,"max",2),Y([n.property({type:Number})],t.UiSlider.prototype,"step",2),Y([n.property({type:Boolean})],t.UiSlider.prototype,"disabled",2),Y([n.property({type:String})],t.UiSlider.prototype,"label",2),Y([n.property({type:Boolean})],t.UiSlider.prototype,"showValue",2),Y([n.property({type:Boolean,reflect:!0})],t.UiSlider.prototype,"vertical",2),t.UiSlider=Y([n.customElement("ui-slider")],t.UiSlider);var Zt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,M=(l,e,i,o)=>{for(var r=o>1?void 0:o?jt(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Zt(e,i,r),r};t.UiTextField=class extends a.LitElement{constructor(){super(...arguments),this.label="",this.value="",this.placeholder="",this.type="text",this.variant="outlined",this.disabled=!1,this.error=!1,this.helperText="",this.errorMessage="",this._focused=!1}_handleInput(e){this.value=e.target.value,this.dispatchEvent(new CustomEvent("input",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleChange(e){this.value=e.target.value,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleFocus(){this._focused=!0}_handleBlur(){this._focused=!1}render(){const e=this.error||!!this.errorMessage;return a.html`
      <div class=${h.classMap({"field-container":!0,filled:this.variant==="filled"})}>
        ${this.label?a.html`<label class="label">${this.label}</label>`:""}
        
        <div class=${h.classMap({"input-wrapper":!0,focused:this._focused,error:e,disabled:this.disabled})}>
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
            aria-invalid=${e?"true":"false"}
          />

          <div class="icon-trailing" part="trailing-icon">
            <slot name="trailing"></slot>
          </div>
        </div>

        ${e&&this.errorMessage?a.html`<span class="helper-text error-text">${this.errorMessage}</span>`:this.helperText?a.html`<span class="helper-text">${this.helperText}</span>`:""}
      </div>
    `}},t.UiTextField.styles=a.css`
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
  `,M([n.property({type:String})],t.UiTextField.prototype,"label",2),M([n.property({type:String})],t.UiTextField.prototype,"value",2),M([n.property({type:String})],t.UiTextField.prototype,"placeholder",2),M([n.property({type:String})],t.UiTextField.prototype,"type",2),M([n.property({type:String})],t.UiTextField.prototype,"variant",2),M([n.property({type:Boolean})],t.UiTextField.prototype,"disabled",2),M([n.property({type:Boolean})],t.UiTextField.prototype,"error",2),M([n.property({type:String})],t.UiTextField.prototype,"helperText",2),M([n.property({type:String})],t.UiTextField.prototype,"errorMessage",2),M([n.state()],t.UiTextField.prototype,"_focused",2),t.UiTextField=M([n.customElement("ui-text-field")],t.UiTextField);var ei=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,Ae=(l,e,i,o)=>{for(var r=o>1?void 0:o?ti(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&ei(e,i,r),r};t.UiToggleButton=class extends a.LitElement{constructor(){super(...arguments),this.selected=!1,this.disabled=!1,this.value=""}_handleClick(){this.disabled||this.dispatchEvent(new CustomEvent("toggle-click",{detail:{value:this.value,selected:!this.selected},bubbles:!0,composed:!0}))}render(){return a.html`
      <button 
        type="button"
        class=${h.classMap({selected:this.selected})}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        aria-pressed=${this.selected}
      >
        <slot></slot>
      </button>
    `}},t.UiToggleButton.styles=a.css`
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
  `,Ae([n.property({type:Boolean,reflect:!0})],t.UiToggleButton.prototype,"selected",2),Ae([n.property({type:Boolean,reflect:!0})],t.UiToggleButton.prototype,"disabled",2),Ae([n.property({type:String})],t.UiToggleButton.prototype,"value",2),t.UiToggleButton=Ae([n.customElement("ui-toggle-button")],t.UiToggleButton);var ii=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,We=(l,e,i,o)=>{for(var r=o>1?void 0:o?ri(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&ii(e,i,r),r};t.UiToggleButtonGroup=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.exclusive=!0}connectedCallback(){super.connectedCallback(),this.addEventListener("toggle-click",this._handleToggleClick),this._updateChildren()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("toggle-click",this._handleToggleClick)}_handleToggleClick(e){const{value:i,selected:o}=e.detail;if(this.exclusive)this.value=o?i:"";else{const r=Array.isArray(this.value)?[...this.value]:this.value?[this.value]:[];if(o)r.includes(i)||r.push(i);else{const s=r.indexOf(i);s>-1&&r.splice(s,1)}this.value=r}this._updateChildren(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_updateChildren(){const e=Array.from(this.querySelectorAll("ui-toggle-button"));e.forEach((i,o)=>{const r=i,s=this.exclusive?this.value===r.value:Array.isArray(this.value)&&this.value.includes(r.value);r.selected=s,o===0?r.setAttribute("data-first",""):r.removeAttribute("data-first"),o===e.length-1?r.setAttribute("data-last",""):r.removeAttribute("data-last")})}updated(e){e.has("value")&&this._updateChildren()}render(){return a.html`<slot @slotchange=${this._updateChildren}></slot>`}},t.UiToggleButtonGroup.styles=a.css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }
  `,We([n.property({type:String})],t.UiToggleButtonGroup.prototype,"value",2),We([n.property({type:Boolean})],t.UiToggleButtonGroup.prototype,"exclusive",2),t.UiToggleButtonGroup=We([n.customElement("ui-toggle-button-group")],t.UiToggleButtonGroup);var oi=Object.defineProperty,ni=Object.getOwnPropertyDescriptor,Z=(l,e,i,o)=>{for(var r=o>1?void 0:o?ni(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&oi(e,i,r),r};t.UiAvatar=class extends a.LitElement{constructor(){super(...arguments),this.src="",this.alt="",this.initials="",this.variant="circle",this.size="medium",this._hasError=!1,this._isLoading=!1}willUpdate(e){e.has("src")&&(this._hasError=!1,this._isLoading=!!this.src)}_handleError(){this._hasError=!0,this._isLoading=!1}_handleLoad(){this._isLoading=!1}render(){const e={avatar:!0,square:this.variant==="square",rounded:this.variant==="rounded",loading:this._isLoading};return a.html`
      <div class=${h.classMap(e)} part="base">
        ${this.src&&!this._hasError?a.html`<img src=${this.src} alt=${this.alt} @error=${this._handleError} @load=${this._handleLoad} style=${this._isLoading?"display:none":a.nothing} part="image" />`:this.initials?a.html`<span class="initials" part="initials">${this.initials.substring(0,2)}</span>`:a.html`<slot><svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></slot>`}
      </div>
    `}},t.UiAvatar.styles=a.css`
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
  `,Z([n.property({type:String})],t.UiAvatar.prototype,"src",2),Z([n.property({type:String})],t.UiAvatar.prototype,"alt",2),Z([n.property({type:String})],t.UiAvatar.prototype,"initials",2),Z([n.property({type:String})],t.UiAvatar.prototype,"variant",2),Z([n.property({type:String,reflect:!0})],t.UiAvatar.prototype,"size",2),Z([n.state()],t.UiAvatar.prototype,"_hasError",2),Z([n.state()],t.UiAvatar.prototype,"_isLoading",2),t.UiAvatar=Z([n.customElement("ui-avatar")],t.UiAvatar);var ai=Object.defineProperty,si=Object.getOwnPropertyDescriptor,se=(l,e,i,o)=>{for(var r=o>1?void 0:o?si(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&ai(e,i,r),r};t.UiChip=class extends a.LitElement{constructor(){super(...arguments),this.label="",this.variant="filled",this.color="default",this.clickable=!1,this.deletable=!1,this.disabled=!1}_handleClick(e){e.stopPropagation(),!(this.disabled||!this.clickable)&&this.dispatchEvent(new CustomEvent("click",{bubbles:!0,composed:!0}))}_handleKeyDown(e){e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),!this.disabled&&this.clickable&&this.dispatchEvent(new CustomEvent("click",{bubbles:!0,composed:!0})))}_handleDelete(e){e.stopPropagation(),!this.disabled&&this.dispatchEvent(new CustomEvent("delete",{bubbles:!0,composed:!0}))}_handleDeleteKeyDown(e){e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),e.stopPropagation(),this.disabled||this.dispatchEvent(new CustomEvent("delete",{bubbles:!0,composed:!0})))}render(){const e={chip:!0,clickable:this.clickable,disabled:this.disabled,outlined:this.variant==="outlined",primary:this.color==="primary",secondary:this.color==="secondary"};return a.html`
      <div
        class=${h.classMap(e)}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        role=${Te.ifDefined(this.clickable?"button":void 0)}
        tabindex=${this.clickable&&!this.disabled?"0":"-1"}
        aria-disabled=${this.disabled?"true":"false"}
      >
        <slot name="avatar"></slot>
        <slot name="icon"></slot>
        <span class="label">${this.label}</span>
        ${this.deletable?a.html`
          <span
            class="delete-icon"
            @click=${this._handleDelete}
            @keydown=${this._handleDeleteKeyDown}
            tabindex=${this.disabled?"-1":"0"}
            role="button"
            aria-label="Remove ${this.label}"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          </span>
        `:""}
      </div>
    `}},t.UiChip.styles=a.css`
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
  `,se([n.property({type:String})],t.UiChip.prototype,"label",2),se([n.property({type:String})],t.UiChip.prototype,"variant",2),se([n.property({type:String})],t.UiChip.prototype,"color",2),se([n.property({type:Boolean})],t.UiChip.prototype,"clickable",2),se([n.property({type:Boolean})],t.UiChip.prototype,"deletable",2),se([n.property({type:Boolean,reflect:!0})],t.UiChip.prototype,"disabled",2),t.UiChip=se([n.customElement("ui-chip")],t.UiChip);var li=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,K=(l,e,i,o)=>{for(var r=o>1?void 0:o?ci(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&li(e,i,r),r};t.UiList=class extends a.LitElement{render(){return a.html`<ul role="list" style="margin: 0; padding: 0; list-style: none;"><slot></slot></ul>`}},t.UiList.styles=a.css`
    :host {
      display: block;
      padding: 8px 0;
      margin: 0;
      list-style: none;
      background-color: var(--ui-surface-background, white);
    }
  `,t.UiList=K([n.customElement("ui-list")],t.UiList),t.UiListItem=class extends a.LitElement{render(){return a.html`<li role="listitem"><slot></slot></li>`}},t.UiListItem.styles=a.css`
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
  `,t.UiListItem=K([n.customElement("ui-list-item")],t.UiListItem),t.UiListItemButton=class extends a.LitElement{render(){return a.html`<li role="button" tabindex="0"><slot></slot></li>`}},t.UiListItemButton.styles=a.css`
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
  `,t.UiListItemButton=K([n.customElement("ui-list-item-button")],t.UiListItemButton),t.UiListItemIcon=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiListItemIcon.styles=a.css`
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
  `,t.UiListItemIcon=K([n.customElement("ui-list-item-icon")],t.UiListItemIcon),t.UiListItemAvatar=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiListItemAvatar.styles=a.css`
    :host {
      display: inline-flex;
      min-width: 56px;
      flex-shrink: 0;
    }
  `,t.UiListItemAvatar=K([n.customElement("ui-list-item-avatar")],t.UiListItemAvatar),t.UiListItemText=class extends a.LitElement{constructor(){super(...arguments),this.primary="",this.secondary=""}render(){return a.html`
      <span class="primary">${this.primary}<slot name="primary"></slot></span>
      ${this.secondary?a.html`<span class="secondary">${this.secondary}<slot name="secondary"></slot></span>`:""}
    `}},t.UiListItemText.styles=a.css`
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
  `,K([n.property({type:String})],t.UiListItemText.prototype,"primary",2),K([n.property({type:String})],t.UiListItemText.prototype,"secondary",2),t.UiListItemText=K([n.customElement("ui-list-item-text")],t.UiListItemText),t.UiListSubheader=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiListSubheader.styles=a.css`
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
  `,t.UiListSubheader=K([n.customElement("ui-list-subheader")],t.UiListSubheader);var pi=Object.defineProperty,di=Object.getOwnPropertyDescriptor,R=(l,e,i,o)=>{for(var r=o>1?void 0:o?di(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&pi(e,i,r),r};t.UiTableContainer=class extends a.LitElement{constructor(){super(...arguments),this.shadow=!1}render(){return a.html`<slot></slot>`}},t.UiTableContainer.styles=a.css`
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
  `,R([n.property({type:Boolean,reflect:!0})],t.UiTableContainer.prototype,"shadow",2),t.UiTableContainer=R([n.customElement("ui-table-container")],t.UiTableContainer),t.UiTable=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiTable.styles=a.css`
    :host {
      display: table;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }
  `,t.UiTable=R([n.customElement("ui-table")],t.UiTable),t.UiTableHead=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiTableHead.styles=a.css`
    :host {
      display: table-header-group;
    }
  `,t.UiTableHead=R([n.customElement("ui-table-head")],t.UiTableHead),t.UiTableBody=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiTableBody.styles=a.css`
    :host {
      display: table-row-group;
    }
  `,t.UiTableBody=R([n.customElement("ui-table-body")],t.UiTableBody),t.UiTableRow=class extends a.LitElement{constructor(){super(...arguments),this.selected=!1}render(){return a.html`<slot></slot>`}},t.UiTableRow.styles=a.css`
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
  `,R([n.property({type:Boolean,reflect:!0})],t.UiTableRow.prototype,"selected",2),t.UiTableRow=R([n.customElement("ui-table-row")],t.UiTableRow),t.UiTableCell=class extends a.LitElement{constructor(){super(...arguments),this.header=!1,this.align="left"}render(){return a.html`<slot></slot>`}},t.UiTableCell.styles=a.css`
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
  `,R([n.property({type:Boolean,reflect:!0})],t.UiTableCell.prototype,"header",2),R([n.property({type:String,reflect:!0})],t.UiTableCell.prototype,"align",2),t.UiTableCell=R([n.customElement("ui-table-cell")],t.UiTableCell),t.UiTableFooter=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiTableFooter.styles=a.css`
    :host {
      display: table-footer-group;
    }
  `,t.UiTableFooter=R([n.customElement("ui-table-footer")],t.UiTableFooter);var hi=Object.defineProperty,ui=Object.getOwnPropertyDescriptor,Xe=(l,e,i,o)=>{for(var r=o>1?void 0:o?ui(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&hi(e,i,r),r};t.UiTableSortLabel=class extends a.LitElement{constructor(){super(...arguments),this.active=!1,this.direction="asc"}render(){return a.html`
      <slot></slot>
      <svg class=${h.classMap({icon:!0,asc:this.direction==="asc",desc:this.direction==="desc"})} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    `}},t.UiTableSortLabel.styles=a.css`
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
  `,Xe([n.property({type:Boolean,reflect:!0})],t.UiTableSortLabel.prototype,"active",2),Xe([n.property({type:String})],t.UiTableSortLabel.prototype,"direction",2),t.UiTableSortLabel=Xe([n.customElement("ui-table-sort-label")],t.UiTableSortLabel);var mi=Object.defineProperty,fi=Object.getOwnPropertyDescriptor,Ce=(l,e,i,o)=>{for(var r=o>1?void 0:o?fi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&mi(e,i,r),r};t.UiTablePagination=class extends a.LitElement{constructor(){super(...arguments),this.count=0,this.page=0,this.rowsPerPage=10,this.rowsPerPageOptions=[5,10,25]}_handlePageChange(e){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:this.page+e},bubbles:!0,composed:!0}))}_handleRowChange(e){const i=e.target.value;this.dispatchEvent(new CustomEvent("rows-per-page-change",{detail:{rowsPerPage:parseInt(i)},bubbles:!0,composed:!0}))}render(){const e=this.page*this.rowsPerPage+1,i=Math.min(this.count,(this.page+1)*this.rowsPerPage);return a.html`
      <div class="spacer"></div>
      <div class="actions">
        <span>Rows per page:</span>
        <select @change=${this._handleRowChange}>
          ${this.rowsPerPageOptions.map(o=>a.html`
            <option value=${o} ?selected=${this.rowsPerPage===o}>${o}</option>
          `)}
        </select>
        <span>${e}-${i} of ${this.count}</span>
        <div class="nav-buttons">
          <button ?disabled=${this.page===0} @click=${()=>this._handlePageChange(-1)} aria-label="Previous page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button ?disabled=${i>=this.count} @click=${()=>this._handlePageChange(1)} aria-label="Next page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </div>
    `}},t.UiTablePagination.styles=a.css`
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
  `,Ce([n.property({type:Number})],t.UiTablePagination.prototype,"count",2),Ce([n.property({type:Number})],t.UiTablePagination.prototype,"page",2),Ce([n.property({type:Number})],t.UiTablePagination.prototype,"rowsPerPage",2),Ce([n.property({type:Array})],t.UiTablePagination.prototype,"rowsPerPageOptions",2),t.UiTablePagination=Ce([n.customElement("ui-table-pagination")],t.UiTablePagination);var bi=Object.defineProperty,gi=Object.getOwnPropertyDescriptor,ge=(l,e,i,o)=>{for(var r=o>1?void 0:o?gi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&bi(e,i,r),r};t.UiTooltip=class extends a.LitElement{constructor(){super(...arguments),this.label="",this.placement="top",this.arrow=!1,this.disabled=!1,this._visible=!1}_show(){this.disabled||!this.label||(this._visible=!0)}_hide(){this._visible=!1}render(){return a.html`
      <div 
        class="tooltip-container"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
      >
        <slot></slot>
        <div class=${h.classMap({"tooltip-popup":!0,[this.placement]:!0,visible:this._visible})}>
          ${this.label}
          ${this.arrow?a.html`<div class="arrow"></div>`:""}
        </div>
      </div>
    `}},t.UiTooltip.styles=a.css`
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
  `,ge([n.property({type:String})],t.UiTooltip.prototype,"label",2),ge([n.property({type:String})],t.UiTooltip.prototype,"placement",2),ge([n.property({type:Boolean})],t.UiTooltip.prototype,"arrow",2),ge([n.property({type:Boolean,reflect:!0})],t.UiTooltip.prototype,"disabled",2),ge([n.state()],t.UiTooltip.prototype,"_visible",2),t.UiTooltip=ge([n.customElement("ui-tooltip")],t.UiTooltip);var vi=Object.defineProperty,yi=Object.getOwnPropertyDescriptor,ze=(l,e,i,o)=>{for(var r=o>1?void 0:o?yi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&vi(e,i,r),r};t.UiBackdrop=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this.invisible=!1,this.container=!1}_handleClick(e){e.target===e.currentTarget&&this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return a.html`
      <div 
        class="${h.classMap({backdrop:!0,open:this.open,invisible:this.invisible})}" 
        @click="${this._handleClick}"
        aria-hidden="${this.open?a.nothing:"true"}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}},t.UiBackdrop.styles=a.css`
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
  `,ze([n.property({type:Boolean,reflect:!0})],t.UiBackdrop.prototype,"open",2),ze([n.property({type:Boolean})],t.UiBackdrop.prototype,"invisible",2),ze([n.property({type:Boolean,reflect:!0})],t.UiBackdrop.prototype,"container",2),t.UiBackdrop=ze([n.customElement("ui-backdrop")],t.UiBackdrop);var wi=Object.defineProperty,xi=Object.getOwnPropertyDescriptor,W=(l,e,i,o)=>{for(var r=o>1?void 0:o?xi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&wi(e,i,r),r};const j=[];t.UiDialog=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this.transition="scale",this.disableBackdropClose=!1,this._handleKeyDown=e=>{e.key==="Escape"&&this.open&&j[j.length-1]===this&&this.requestClose()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._handleKeyDown)}updated(e){if(super.updated(e),e.has("open"))if(this.open)j.includes(this)||j.push(this);else{const i=j.indexOf(this);i!==-1&&j.splice(i,1)}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleKeyDown);const e=j.indexOf(this);e!==-1&&j.splice(e,1)}requestClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_handleBackdropClose(e){e.stopPropagation(),this.disableBackdropClose||this.requestClose()}render(){const e=h.classMap({"dialog-panel":!0,open:this.open,[`transition-${this.transition}`]:this.transition!=="scale"});return a.html`
      <ui-backdrop .open=${this.open} @close=${this._handleBackdropClose}>
        <div
          class=${e}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${i=>i.stopPropagation()}
        >
          <slot></slot>
        </div>
      </ui-backdrop>
    `}},t.UiDialog.styles=a.css`
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
  `,W([n.property({type:Boolean,reflect:!0})],t.UiDialog.prototype,"open",2),W([n.property({type:String})],t.UiDialog.prototype,"transition",2),W([n.property({type:Boolean,attribute:"disable-backdrop-close"})],t.UiDialog.prototype,"disableBackdropClose",2),t.UiDialog=W([n.customElement("ui-dialog")],t.UiDialog),t.UiDialogTitle=class extends a.LitElement{render(){return a.html`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`}},t.UiDialogTitle.styles=a.css`
    :host {
      display: block;
      padding: 20px 24px 12px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ui-text-color, #111827);
    }
  `,t.UiDialogTitle=W([n.customElement("ui-dialog-title")],t.UiDialogTitle),t.UiDialogContent=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiDialogContent.styles=a.css`
    :host {
      display: block;
      padding: 0 24px 20px 24px;
      flex: 1 1 auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `,t.UiDialogContent=W([n.customElement("ui-dialog-content")],t.UiDialogContent),t.UiDialogContentText=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiDialogContentText.styles=a.css`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 8px;
    }
  `,t.UiDialogContentText=W([n.customElement("ui-dialog-content-text")],t.UiDialogContentText),t.UiDialogActions=class extends a.LitElement{constructor(){super(...arguments),this.align="end"}render(){return a.html`<slot></slot>`}},t.UiDialogActions.styles=a.css`
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
  `,W([n.property({type:String,reflect:!0})],t.UiDialogActions.prototype,"align",2),t.UiDialogActions=W([n.customElement("ui-dialog-actions")],t.UiDialogActions);var ki=Object.defineProperty,Ui=Object.getOwnPropertyDescriptor,Ie=(l,e,i,o)=>{for(var r=o>1?void 0:o?Ui(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&ki(e,i,r),r};t.UiCircularProgress=class extends a.LitElement{constructor(){super(...arguments),this.variant="indeterminate",this.value=0,this.size=40,this.thickness=3.6}render(){const e=this.variant==="determinate",i=20,o=2*Math.PI*i,r=o-this.value/100*o;return a.html`
      <div 
        class="circular-root ${h.classMap({determinate:e,indeterminate:!e})}"
        style="--ui-circular-progress-size: ${this.size}px; --ui-circular-progress-thickness: ${this.thickness}"
        role="progressbar"
        aria-valuenow="${e?this.value:void 0}"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <svg viewBox="22 22 44 44">
          <circle 
            class="circle"
            cx="44" 
            cy="44" 
            r="${i}" 
            fill="none" 
            stroke-width="${this.thickness}"
            style="${e?`stroke-dasharray: ${o}; stroke-dashoffset: ${r}px`:""}"
          ></circle>
        </svg>
      </div>
    `}},t.UiCircularProgress.styles=a.css`
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
  `,Ie([n.property({type:String})],t.UiCircularProgress.prototype,"variant",2),Ie([n.property({type:Number})],t.UiCircularProgress.prototype,"value",2),Ie([n.property({type:Number})],t.UiCircularProgress.prototype,"size",2),Ie([n.property({type:Number})],t.UiCircularProgress.prototype,"thickness",2),t.UiCircularProgress=Ie([n.customElement("ui-circular-progress")],t.UiCircularProgress);var _i=Object.defineProperty,$i=Object.getOwnPropertyDescriptor,Je=(l,e,i,o)=>{for(var r=o>1?void 0:o?$i(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&_i(e,i,r),r};t.UiLinearProgress=class extends a.LitElement{constructor(){super(...arguments),this.variant="indeterminate",this.value=0}render(){const e=this.variant==="determinate";return a.html`
      <div 
        class="root ${h.classMap({determinate:e,indeterminate:!e})}"
        role="progressbar"
        aria-valuenow="${e?this.value:void 0}"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        ${e?a.html`
          <div class="bar" style="transform: scaleX(${this.value/100})"></div>
        `:a.html`
          <div class="bar bar1"></div>
          <div class="bar bar2"></div>
        `}
      </div>
    `}},t.UiLinearProgress.styles=a.css`
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
  `,Je([n.property({type:String})],t.UiLinearProgress.prototype,"variant",2),Je([n.property({type:Number})],t.UiLinearProgress.prototype,"value",2),t.UiLinearProgress=Je([n.customElement("ui-linear-progress")],t.UiLinearProgress);var Ci=Object.defineProperty,Ii=Object.getOwnPropertyDescriptor,ve=(l,e,i,o)=>{for(var r=o>1?void 0:o?Ii(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ci(e,i,r),r};t.UiAccordion=class extends a.LitElement{constructor(){super(),this.expanded=!1,this.disabled=!1,this._handleToggle=()=>{this.disabled||(this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("ui-accordion-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0})))},this.addEventListener("ui-accordion-toggle",this._handleToggle)}updated(e){(e.has("expanded")||e.has("disabled"))&&this.querySelectorAll("ui-accordion-summary, ui-accordion-details, ui-accordion-actions").forEach(i=>{this.expanded?i.setAttribute("expanded",""):i.removeAttribute("expanded"),this.disabled?i.setAttribute("disabled",""):i.removeAttribute("disabled")})}render(){return a.html`
            <div class="accordion-container" role="region">
                <slot></slot>
            </div>
        `}},t.UiAccordion.styles=a.css`
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
    `,ve([n.property({type:Boolean,reflect:!0})],t.UiAccordion.prototype,"expanded",2),ve([n.property({type:Boolean,reflect:!0})],t.UiAccordion.prototype,"disabled",2),t.UiAccordion=ve([n.customElement("ui-accordion")],t.UiAccordion),t.UiAccordionSummary=class extends a.LitElement{constructor(){super(),this._handleActivate=()=>{this.dispatchEvent(new CustomEvent("ui-accordion-toggle",{bubbles:!0,composed:!0}))},this._handleKeyDown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._handleActivate())},this.addEventListener("click",this._handleActivate),this.addEventListener("keydown",this._handleKeyDown)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}render(){return a.html`
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
        `}},t.UiAccordionSummary.styles=a.css`
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
    `,t.UiAccordionSummary=ve([n.customElement("ui-accordion-summary")],t.UiAccordionSummary),t.UiAccordionDetails=class extends a.LitElement{render(){return a.html`
            <div class="details-inner">
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `}},t.UiAccordionDetails.styles=a.css`
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
    `,t.UiAccordionDetails=ve([n.customElement("ui-accordion-details")],t.UiAccordionDetails),t.UiAccordionActions=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiAccordionActions.styles=a.css`
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
    `,t.UiAccordionActions=ve([n.customElement("ui-accordion-actions")],t.UiAccordionActions);var Ei=Object.defineProperty,Si=Object.getOwnPropertyDescriptor,Me=(l,e,i,o)=>{for(var r=o>1?void 0:o?Si(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ei(e,i,r),r};t.UiAppBar=class extends a.LitElement{constructor(){super(...arguments),this.title="",this.position="static",this.variant="regular"}render(){return a.html`
      <header class="${h.classMap({"variant-outlined":this.variant==="outlined"})}">
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
    `}},t.UiAppBar.styles=a.css`
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
  `,Me([n.property({type:String})],t.UiAppBar.prototype,"title",2),Me([n.property({type:String,reflect:!0})],t.UiAppBar.prototype,"position",2),Me([n.property({type:String,reflect:!0})],t.UiAppBar.prototype,"variant",2),t.UiAppBar=Me([n.customElement("ui-app-bar")],t.UiAppBar);var Pi=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,Ee=(l,e,i,o)=>{for(var r=o>1?void 0:o?Ti(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Pi(e,i,r),r};t.UiBottomNavigationAction=class extends a.LitElement{constructor(){super(...arguments),this.label="",this.active=!1,this.showLabel=!0,this._handleKeydown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","tab"),this.hasAttribute("tabindex")||(this.tabIndex=0),this.addEventListener("keydown",this._handleKeydown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeydown)}updated(e){e.has("active")&&this.setAttribute("aria-selected",String(this.active))}render(){return a.html`
            <div class="icon-container" aria-hidden="true">
                <slot name="icon"></slot>
                <slot></slot>
            </div>
            <span class="${h.classMap({label:!0,hidden:!this.showLabel})}">
                ${this.label}
            </span>
        `}},t.UiBottomNavigationAction.styles=a.css`
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
    `,Ee([n.property({type:String})],t.UiBottomNavigationAction.prototype,"label",2),Ee([n.property()],t.UiBottomNavigationAction.prototype,"value",2),Ee([n.property({type:Boolean,reflect:!0})],t.UiBottomNavigationAction.prototype,"active",2),Ee([n.property({type:Boolean})],t.UiBottomNavigationAction.prototype,"showLabel",2),t.UiBottomNavigationAction=Ee([n.customElement("ui-bottom-navigation-action")],t.UiBottomNavigationAction);var Di=Object.defineProperty,Li=Object.getOwnPropertyDescriptor,Re=(l,e,i,o)=>{for(var r=o>1?void 0:o?Li(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Di(e,i,r),r};t.UiBottomNavigation=class extends a.LitElement{constructor(){super(...arguments),this.showLabels=!1}updated(e){(e.has("value")||e.has("showLabels"))&&this._updateActions()}_handleSlotChange(){this._updateActions()}_updateActions(){const e=this._actions.length,i=this.showLabels||e<=3;this._actions.forEach(o=>{o.active=o.value===this.value,o.showLabel=i||o.active})}_handleActionChange(e){const i=e.composedPath().find(o=>o instanceof t.UiBottomNavigationAction);!i||i.value===this.value||(this.value=i.value,this.dispatchEvent(new CustomEvent("ui-bottom-navigation-change",{detail:{value:i.value},bubbles:!0,composed:!0})))}render(){return a.html`
            <div class="container" role="tablist" @click=${this._handleActionChange}>
                <slot @slotchange=${this._handleSlotChange}></slot>
            </div>
        `}},t.UiBottomNavigation.styles=a.css`
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
    `,Re([n.property()],t.UiBottomNavigation.prototype,"value",2),Re([n.property({type:Boolean,attribute:"show-labels"})],t.UiBottomNavigation.prototype,"showLabels",2),Re([n.queryAssignedElements({selector:"ui-bottom-navigation-action"})],t.UiBottomNavigation.prototype,"_actions",2),t.UiBottomNavigation=Re([n.customElement("ui-bottom-navigation")],t.UiBottomNavigation);var Oi=Object.defineProperty,Bi=Object.getOwnPropertyDescriptor,ee=(l,e,i,o)=>{for(var r=o>1?void 0:o?Bi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Oi(e,i,r),r};t.UiBreadcrumbs=class extends a.LitElement{constructor(){super(...arguments),this.maxItems=8,this.itemsBefore=1,this.itemsAfter=1,this.separator="/",this._expanded=!1,this._itemsCount=0,this._separatorNode=null}_handleSlotChange(){const i=Array.from(this.children).filter(o=>!o.slot||o.slot.startsWith("breadcrumb-item-"));i.forEach((o,r)=>{const s=`breadcrumb-item-${r}`;o.getAttribute("slot")!==s&&o.setAttribute("slot",s)}),this._itemsCount=i.length}_handleSeparatorSlotChange(e){const o=e.target.assignedNodes({flatten:!0});this._separatorNode=o.length>0?o[0].cloneNode(!0):null}_renderSeparator(){return a.html`
            <span class="separator" aria-hidden="true">
                ${this._separatorNode?this._separatorNode.cloneNode(!0):this.separator}
            </span>
        `}_renderItem(e,i){return a.html`
            <li class="breadcrumb-li">
                <slot name="breadcrumb-item-${e}"></slot>
                ${i?"":this._renderSeparator()}
            </li>
        `}_renderCollapsed(){const e=this._itemsCount;if(e===0)return a.html``;if(e<=this.maxItems||this._expanded)return Array.from({length:e}).map((c,p)=>this._renderItem(p,p===e-1));const i=Math.min(this.itemsBefore,e),o=Math.min(this.itemsAfter,e-i);if(i+o>=e)return Array.from({length:e}).map((c,p)=>this._renderItem(p,p===e-1));const r=Array.from({length:i}).map((c,p)=>p),s=Array.from({length:o}).map((c,p)=>e-o+p);return a.html`
            ${r.map(c=>this._renderItem(c,!1))}
            <li class="breadcrumb-li">
                <button class="collapsed-button" @click=${()=>this._expanded=!0} aria-label="Show all breadcrumbs">
                    ...
                </button>
                ${this._renderSeparator()}
            </li>
            ${s.map((c,p)=>this._renderItem(c,p===s.length-1))}
        `}render(){return a.html`
            <nav aria-label="breadcrumb">
                <ol class="breadcrumbs-ol">
                    ${this._renderCollapsed()}
                </ol>
            </nav>
            <div style="display: none" aria-hidden="true">
                <slot @slotchange=${this._handleSlotChange}></slot>
                <slot name="separator" @slotchange=${this._handleSeparatorSlotChange}></slot>
            </div>
        `}},t.UiBreadcrumbs.styles=a.css`
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
    `,ee([n.property({type:Number,attribute:"max-items"})],t.UiBreadcrumbs.prototype,"maxItems",2),ee([n.property({type:Number,attribute:"items-before"})],t.UiBreadcrumbs.prototype,"itemsBefore",2),ee([n.property({type:Number,attribute:"items-after"})],t.UiBreadcrumbs.prototype,"itemsAfter",2),ee([n.property({type:String})],t.UiBreadcrumbs.prototype,"separator",2),ee([n.state()],t.UiBreadcrumbs.prototype,"_expanded",2),ee([n.state()],t.UiBreadcrumbs.prototype,"_itemsCount",2),ee([n.state()],t.UiBreadcrumbs.prototype,"_separatorNode",2),t.UiBreadcrumbs=ee([n.customElement("ui-breadcrumbs")],t.UiBreadcrumbs);var Ai=Object.defineProperty,zi=Object.getOwnPropertyDescriptor,le=(l,e,i,o)=>{for(var r=o>1?void 0:o?zi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ai(e,i,r),r};t.UiDrawer=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this.anchor="left",this.variant="temporary",this.edge=!1,this.container=!1,this.label="Drawer",this._lastFocused=null,this._boundKeyDown=e=>{e.defaultPrevented||this.open&&e.key==="Escape"&&this.variant==="temporary"&&(e.preventDefault(),this._close())}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._boundKeyDown)}disconnectedCallback(){window.removeEventListener("keydown",this._boundKeyDown),super.disconnectedCallback()}updated(e){e.has("open")&&this.variant==="temporary"&&(this.open?(this._lastFocused=document.activeElement,this.shadowRoot?.querySelector(".paper")?.focus()):(this._lastFocused?.focus(),this._lastFocused=null))}_close(){this.dispatchEvent(new CustomEvent("ui-drawer-close",{bubbles:!0,composed:!0}))}render(){const e=this.variant==="temporary",i=this.edge&&!this.open&&e,o=this.variant==="mini"?"false":String(!this.open);return a.html`
            ${e?a.html`
                <div
                    class="backdrop ${this.open?"open":""}"
                    @click=${this._close}
                    aria-hidden="true"
                ></div>
            `:""}

            ${i?a.html`
                <div class="edge edge-${this.anchor}" @click=${()=>{this.open=!0}}>
                    <div class="edge-handle"></div>
                </div>
            `:""}

            <div
                class="paper ${this.open?"open":""}"
                role=${e?"dialog":"complementary"}
                aria-modal=${e?String(this.open):"false"}
                aria-label=${this.label}
                aria-hidden=${o}
                tabindex="-1"
            >
                <slot></slot>
            </div>
        `}},t.UiDrawer.styles=a.css`
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
    `,le([n.property({type:Boolean,reflect:!0})],t.UiDrawer.prototype,"open",2),le([n.property({type:String,reflect:!0})],t.UiDrawer.prototype,"anchor",2),le([n.property({type:String,reflect:!0})],t.UiDrawer.prototype,"variant",2),le([n.property({type:Boolean,reflect:!0})],t.UiDrawer.prototype,"edge",2),le([n.property({type:Boolean,reflect:!0})],t.UiDrawer.prototype,"container",2),le([n.property({type:String})],t.UiDrawer.prototype,"label",2),t.UiDrawer=le([n.customElement("ui-drawer")],t.UiDrawer);var Mi=Object.defineProperty,Ri=Object.getOwnPropertyDescriptor,q=(l,e,i,o)=>{for(var r=o>1?void 0:o?Ri(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Mi(e,i,r),r};t.UiLink=class extends a.LitElement{constructor(){super(...arguments),this.href="",this.target="_self",this.rel="",this.color="primary",this.underline="always",this.variant="inherit",this.disabled=!1}_computedRel(){if(this.target==="_blank"){const e=this.rel||"",i=new Set(e.split(" ").filter(Boolean));return i.add("noopener"),i.add("noreferrer"),Array.from(i).join(" ")}return this.rel||""}render(){const e=h.classMap({link:!0});return a.html`
            <a
                class="${e}"
                href=${this.disabled?"javascript:void(0)":this.href}
                target=${this.target}
                rel=${this._computedRel()}
                aria-label=${Te.ifDefined(this.label)}
                download=${Te.ifDefined(this.download)}
                aria-disabled=${this.disabled}
            >
                <slot></slot>
            </a>
        `}},t.UiLink.styles=a.css`
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
    `,q([n.property({type:String})],t.UiLink.prototype,"href",2),q([n.property({type:String})],t.UiLink.prototype,"target",2),q([n.property({type:String})],t.UiLink.prototype,"rel",2),q([n.property({type:String,reflect:!0})],t.UiLink.prototype,"color",2),q([n.property({type:String,reflect:!0})],t.UiLink.prototype,"underline",2),q([n.property({type:String,reflect:!0})],t.UiLink.prototype,"variant",2),q([n.property({type:Boolean,reflect:!0})],t.UiLink.prototype,"disabled",2),q([n.property({type:String})],t.UiLink.prototype,"download",2),q([n.property({type:String})],t.UiLink.prototype,"label",2),t.UiLink=q([n.customElement("ui-link")],t.UiLink);var Fi=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor,te=(l,e,i,o)=>{for(var r=o>1?void 0:o?Vi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Fi(e,i,r),r};t.UiTypography=class extends a.LitElement{constructor(){super(...arguments),this.variant="body1",this.color="textPrimary",this.align="left",this.noWrap=!1,this.gutterBottom=!1,this.paragraph=!1}_literalTag(){const e=this.component;return e?{h1:w.literal`h1`,h2:w.literal`h2`,h3:w.literal`h3`,h4:w.literal`h4`,h5:w.literal`h5`,h6:w.literal`h6`,p:w.literal`p`,span:w.literal`span`,div:w.literal`div`}[e]??w.literal`p`:{h1:w.literal`h1`,h2:w.literal`h2`,h3:w.literal`h3`,h4:w.literal`h4`,h5:w.literal`h5`,h6:w.literal`h6`,subtitle1:w.literal`h6`,subtitle2:w.literal`h6`,body1:w.literal`p`,body2:w.literal`p`,caption:w.literal`span`,overline:w.literal`span`,inherit:w.literal`p`}[this.variant]??w.literal`p`}render(){const e=this._literalTag(),i=`typography ${this.variant!=="inherit"?this.variant:""}`;return w.html`<${e} class="${i}"><slot></slot></${e}>`}},t.UiTypography.styles=a.css`
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
    `,te([n.property({type:String,reflect:!0})],t.UiTypography.prototype,"variant",2),te([n.property({type:String,reflect:!0})],t.UiTypography.prototype,"color",2),te([n.property({type:String})],t.UiTypography.prototype,"component",2),te([n.property({type:String,reflect:!0})],t.UiTypography.prototype,"align",2),te([n.property({type:Boolean,reflect:!0})],t.UiTypography.prototype,"noWrap",2),te([n.property({type:Boolean,reflect:!0})],t.UiTypography.prototype,"gutterBottom",2),te([n.property({type:Boolean,reflect:!0})],t.UiTypography.prototype,"paragraph",2),t.UiTypography=te([n.customElement("ui-typography")],t.UiTypography);var Ni=Object.defineProperty,qi=Object.getOwnPropertyDescriptor,T=(l,e,i,o)=>{for(var r=o>1?void 0:o?qi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ni(e,i,r),r};t.UiMenuItem=class extends a.LitElement{constructor(){super(...arguments),this.selected=!1,this.disabled=!1,this.dense=!1,this.divider=!1,this._hasIcon=!1,this._hasEndIcon=!1}_onIconSlotChange(e){const i=e.target;this._hasIcon=i.assignedNodes({flatten:!0}).length>0}_onEndIconSlotChange(e){const i=e.target;this._hasEndIcon=i.assignedNodes({flatten:!0}).length>0}_handleClick(){if(this.disabled)return;const e=this.textContent?.trim()??"";this.dispatchEvent(new CustomEvent("ui-menu-item-select",{bubbles:!0,composed:!0,detail:{value:this.value??this.getAttribute("value")??e,label:e}}))}render(){return a.html`
            <div
                class="item"
                role="menuitem"
                aria-disabled=${this.disabled?"true":"false"}
                tabindex=${this.disabled?-1:0}
                @click=${this._handleClick}
                @keydown=${e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._handleClick())}}
            >
                <span class="icon-wrap" ?hidden=${!this._hasIcon}>
                    <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
                </span>
                <span class="label"><slot></slot></span>
                <span class="end-icon-wrap" ?hidden=${!this._hasEndIcon}>
                    <slot name="end-icon" @slotchange=${this._onEndIconSlotChange}></slot>
                </span>
            </div>
        `}},t.UiMenuItem.styles=a.css`
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
    `,T([n.property({type:Boolean,reflect:!0})],t.UiMenuItem.prototype,"selected",2),T([n.property({type:Boolean,reflect:!0})],t.UiMenuItem.prototype,"disabled",2),T([n.property({type:Boolean,reflect:!0})],t.UiMenuItem.prototype,"dense",2),T([n.property({type:Boolean,reflect:!0})],t.UiMenuItem.prototype,"divider",2),T([n.property({type:String,reflect:!0})],t.UiMenuItem.prototype,"value",2),T([n.state()],t.UiMenuItem.prototype,"_hasIcon",2),T([n.state()],t.UiMenuItem.prototype,"_hasEndIcon",2),t.UiMenuItem=T([n.customElement("ui-menu-item")],t.UiMenuItem),t.UiMenuDivider=class extends a.LitElement{render(){return a.html``}},t.UiMenuDivider.styles=a.css`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
    `,t.UiMenuDivider=T([n.customElement("ui-menu-divider")],t.UiMenuDivider),t.UiMenu=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this.placement="bottom-start",this.closeOnSelect=!0,this.scrollable=!1,this._boundKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this._close())}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._boundKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._boundKeyDown)}_close(){this.dispatchEvent(new CustomEvent("ui-menu-close",{bubbles:!0,composed:!0}))}_handleItemSelect(){this.closeOnSelect&&this._close()}render(){const e=h.classMap({"menu-paper":!0,open:this.open,[`pos-${this.placement}`]:!!this.placement,scrollable:this.scrollable}),i=h.classMap({backdrop:!0,open:this.open});return a.html`
            <div class=${i} @click=${this._close} aria-hidden="true"></div>
            <div
                class=${e}
                role="menu"
                aria-hidden=${this.open?"false":"true"}
                @ui-menu-item-select=${this._handleItemSelect}
            >
                <slot></slot>
            </div>
        `}},t.UiMenu.styles=a.css`
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
    `,T([n.property({type:Boolean,reflect:!0})],t.UiMenu.prototype,"open",2),T([n.property({type:String,reflect:!0})],t.UiMenu.prototype,"placement",2),T([n.property({type:Boolean,attribute:"close-on-select"})],t.UiMenu.prototype,"closeOnSelect",2),T([n.property({type:Boolean})],t.UiMenu.prototype,"scrollable",2),t.UiMenu=T([n.customElement("ui-menu")],t.UiMenu);var Hi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,_=(l,e,i,o)=>{for(var r=o>1?void 0:o?Gi(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Hi(e,i,r),r};const Yi=a.html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`,Ki=a.html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`,Wi=a.html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`,Xi=a.html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`,Ji=a.html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;function Qe(l,e){return Array.from({length:e-l+1},(i,o)=>l+o)}function Qi(l,e,i,o){const r=Qe(1,Math.min(o,l)),s=Qe(Math.max(l-o+1,o+1),l),c=Math.max(Math.min(e-i,l-o-i*2-1),o+2),p=Math.min(Math.max(e+i,o+i*2+2),s.length>0?s[0]-2:l-1),d=[...r,...c>o+2?["start-ellipsis"]:o+1<l-o?[o+1]:[],...Qe(c,p),...p<l-o-1?["end-ellipsis"]:l-o>o?[l-o]:[],...s],f=new Set;return d.filter(b=>{const m=String(b);return f.has(m)?!1:(f.add(m),!0)})}t.UiPagination=class extends a.LitElement{constructor(){super(...arguments),this.count=1,this.page=1,this.variant="text",this.shape="circular",this.size="medium",this.color="primary",this.showFirstButton=!1,this.showLastButton=!1,this.hidePrevButton=!1,this.hideNextButton=!1,this.siblingCount=1,this.boundaryCount=1,this.disabled=!1,this.prevIcon="",this.nextIcon="",this.firstIcon="",this.lastIcon=""}_emit(e){this.dispatchEvent(new CustomEvent("ui-pagination-change",{detail:{page:e},bubbles:!0,composed:!0}))}_go(e){e<1||e>this.count||e===this.page||this._emit(e)}_renderNavBtn(e,i,o,r,s){return s?a.nothing:a.html`
            <button
                class="page-btn nav"
                aria-label=${e}
                ?disabled=${r||this.disabled}
                @click=${o}
            >${i}</button>
        `}render(){const e=Qi(this.count,this.page,this.siblingCount,this.boundaryCount),i=this.prevIcon?a.html`<span .innerHTML=${this.prevIcon}></span>`:Wi,o=this.nextIcon?a.html`<span .innerHTML=${this.nextIcon}></span>`:Xi,r=this.firstIcon?a.html`<span .innerHTML=${this.firstIcon}></span>`:Yi,s=this.lastIcon?a.html`<span .innerHTML=${this.lastIcon}></span>`:Ki;return a.html`
            ${this._renderNavBtn("Go to first page",r,()=>this._go(1),this.page===1,!this.showFirstButton)}
            ${this._renderNavBtn("Go to previous page",i,()=>this._go(this.page-1),this.page===1,this.hidePrevButton)}

            ${e.map(c=>{if(c==="start-ellipsis"||c==="end-ellipsis")return a.html`<button class="page-btn ellipsis" tabindex="-1" aria-hidden="true">${Ji}</button>`;const p=c===this.page;return a.html`
                    <button
                        class=${h.classMap({"page-btn":!0,active:p})}
                        aria-label=${"Page "+c}
                        aria-current=${p?"page":a.nothing}
                        ?disabled=${this.disabled}
                        @click=${()=>this._go(c)}
                    >${c}</button>
                `})}

            ${this._renderNavBtn("Go to next page",o,()=>this._go(this.page+1),this.page===this.count,this.hideNextButton)}
            ${this._renderNavBtn("Go to last page",s,()=>this._go(this.count),this.page===this.count,!this.showLastButton)}
        `}},t.UiPagination.styles=a.css`
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
    `,_([n.property({type:Number})],t.UiPagination.prototype,"count",2),_([n.property({type:Number})],t.UiPagination.prototype,"page",2),_([n.property({type:String,reflect:!0})],t.UiPagination.prototype,"variant",2),_([n.property({type:String,reflect:!0})],t.UiPagination.prototype,"shape",2),_([n.property({type:String,reflect:!0})],t.UiPagination.prototype,"size",2),_([n.property({type:String,reflect:!0})],t.UiPagination.prototype,"color",2),_([n.property({type:Boolean,reflect:!0,attribute:"show-first-button"})],t.UiPagination.prototype,"showFirstButton",2),_([n.property({type:Boolean,reflect:!0,attribute:"show-last-button"})],t.UiPagination.prototype,"showLastButton",2),_([n.property({type:Boolean,reflect:!0,attribute:"hide-prev-button"})],t.UiPagination.prototype,"hidePrevButton",2),_([n.property({type:Boolean,reflect:!0,attribute:"hide-next-button"})],t.UiPagination.prototype,"hideNextButton",2),_([n.property({type:Number,attribute:"sibling-count"})],t.UiPagination.prototype,"siblingCount",2),_([n.property({type:Number,attribute:"boundary-count"})],t.UiPagination.prototype,"boundaryCount",2),_([n.property({type:Boolean,reflect:!0})],t.UiPagination.prototype,"disabled",2),_([n.property({type:String,attribute:"prev-icon"})],t.UiPagination.prototype,"prevIcon",2),_([n.property({type:String,attribute:"next-icon"})],t.UiPagination.prototype,"nextIcon",2),_([n.property({type:String,attribute:"first-icon"})],t.UiPagination.prototype,"firstIcon",2),_([n.property({type:String,attribute:"last-icon"})],t.UiPagination.prototype,"lastIcon",2),t.UiPagination=_([n.customElement("ui-pagination")],t.UiPagination);var Zi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,D=(l,e,i,o)=>{for(var r=o>1?void 0:o?ji(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Zi(e,i,r),r};t.UiSpeedDialAction=class extends a.LitElement{constructor(){super(...arguments),this.tooltipTitle="",this.tooltipOpen=!1,this.tooltipPlacement="left",this.disabled=!1,this._hovered=!1}_handleClick(){this.disabled||this.dispatchEvent(new CustomEvent("ui-speed-dial-action-click",{bubbles:!0,composed:!0,detail:{tooltipTitle:this.tooltipTitle}}))}get _tooltipVisible(){return this.tooltipOpen||this._hovered}render(){return a.html`
            <button
                class="action-btn"
                role="menuitem"
                aria-label=${this.tooltipTitle}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
                @mouseenter=${()=>{this._hovered=!0}}
                @mouseleave=${()=>{this._hovered=!1}}
                @focus=${()=>{this._hovered=!0}}
                @blur=${()=>{this._hovered=!1}}
            >
                <slot></slot>
            </button>
            ${this.tooltipTitle?a.html`
                <div class="tooltip ${h.classMap({visible:this._tooltipVisible})}">
                    ${this.tooltipTitle}
                </div>
            `:a.nothing}
        `}},t.UiSpeedDialAction.styles=a.css`
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
    `,D([n.property({type:String,attribute:"tooltip-title"})],t.UiSpeedDialAction.prototype,"tooltipTitle",2),D([n.property({type:Boolean,attribute:"tooltip-open"})],t.UiSpeedDialAction.prototype,"tooltipOpen",2),D([n.property({type:String,reflect:!0,attribute:"tooltip-placement"})],t.UiSpeedDialAction.prototype,"tooltipPlacement",2),D([n.property({type:Boolean,reflect:!0})],t.UiSpeedDialAction.prototype,"disabled",2),D([n.state()],t.UiSpeedDialAction.prototype,"_hovered",2),t.UiSpeedDialAction=D([n.customElement("ui-speed-dial-action")],t.UiSpeedDialAction),t.UiSpeedDial=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this.direction="up",this.hidden=!1,this.persistentTooltips=!1,this.closeIcon="",this.ariaLabel="Speed dial",this.isTouch=!1,this._onHostKeyDown=e=>{const{key:i}=e,o=this.shadowRoot?.activeElement?.classList.contains("fab")??!1,r=this._focusedActionIndex(),s=r!==-1;if(i==="Escape"){this.open&&(e.preventDefault(),e.stopPropagation(),this._setOpen(!1),this._focusFab());return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(i)){if(e.preventDefault(),!this.open){const p=i==="ArrowDown"||i==="ArrowRight";this._setOpen(!0),this.updateComplete.then(()=>{const d=this._actionButtons();d[p?0:d.length-1]?.focus()});return}if(s){const p=i==="ArrowUp"||i==="ArrowLeft";this._focusActionAt(p?r-1:r+1)}else if(o){const p=this._actionButtons();p[i==="ArrowDown"||i==="ArrowRight"?0:p.length-1]?.focus()}}}}connectedCallback(){super.connectedCallback(),!this.hasAttribute("is-touch")&&typeof window.matchMedia=="function"&&(this.isTouch=window.matchMedia("(hover: none) and (pointer: coarse)").matches),this.addEventListener("keydown",this._onHostKeyDown)}disconnectedCallback(){this.removeEventListener("keydown",this._onHostKeyDown),super.disconnectedCallback()}_actionButtons(){return Array.from(this.querySelectorAll("ui-speed-dial-action")).filter(e=>!e.hasAttribute("disabled")).map(e=>e.shadowRoot?.querySelector(".action-btn")).filter(e=>!!e)}_focusedActionIndex(){return Array.from(this.querySelectorAll("ui-speed-dial-action")).findIndex(i=>i.shadowRoot?.activeElement?.classList.contains("action-btn"))}_focusActionAt(e){const i=this._actionButtons();i.length&&i[Math.max(0,Math.min(e,i.length-1))]?.focus()}_focusFab(){this.shadowRoot?.querySelector(".fab")?.focus()}_setOpen(e){this.open=e,this._updateActionTooltips(),this.dispatchEvent(new CustomEvent(e?"ui-speed-dial-open":"ui-speed-dial-close",{bubbles:!0,composed:!0}))}_toggle(){this._setOpen(!this.open)}_onFabFocus(e){e.relatedTarget!==null&&!this.open&&this._setOpen(!0)}_onActionClick(){this._setOpen(!1),this._focusFab()}_updateActionTooltips(){const e=this.querySelectorAll("ui-speed-dial-action"),i=this.persistentTooltips||this.isTouch,o=this._tooltipPlacement();e.forEach((r,s)=>{r.setAttribute("tooltip-placement",o),i&&this.open?r.setAttribute("tooltip-open",""):r.removeAttribute("tooltip-open"),r.style.transitionDelay=this.open?`${s*40}ms`:`${(e.length-1-s)*30}ms`})}_tooltipPlacement(){switch(this.direction){case"up":return"left";case"down":return"left";case"left":return"top";case"right":return"top";default:return"left"}}updated(e){(e.has("open")||e.has("direction")||e.has("persistentTooltips")||e.has("isTouch"))&&this._updateActionTooltips()}_onOpenIconSlotChange(){}render(){return a.html`
            <!-- Click-away backdrop -->
            <div class="backdrop" @click=${()=>this._setOpen(!1)}></div>

            <!-- Actions — action-click events bubble up here -->
            <div
                class="actions"
                role="menu"
                aria-label="Speed dial actions"
            >
                <slot
                    @slotchange=${()=>this._updateActionTooltips()}
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
                        ${this.closeIcon?a.html`<span style="line-height:1;font-size:1.5rem;">${this.closeIcon}</span>`:a.html`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`}
                    </slot>
                </span>
            </button>
        `}},t.UiSpeedDial.styles=a.css`
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
    `,D([n.property({type:Boolean,reflect:!0})],t.UiSpeedDial.prototype,"open",2),D([n.property({type:String,reflect:!0})],t.UiSpeedDial.prototype,"direction",2),D([n.property({type:Boolean,reflect:!0})],t.UiSpeedDial.prototype,"hidden",2),D([n.property({type:Boolean,attribute:"persistent-tooltips"})],t.UiSpeedDial.prototype,"persistentTooltips",2),D([n.property({type:String,attribute:"close-icon"})],t.UiSpeedDial.prototype,"closeIcon",2),D([n.property({type:String,attribute:"aria-label"})],t.UiSpeedDial.prototype,"ariaLabel",2),D([n.property({type:Boolean,attribute:"is-touch"})],t.UiSpeedDial.prototype,"isTouch",2),t.UiSpeedDial=D([n.customElement("ui-speed-dial")],t.UiSpeedDial);var er=Object.defineProperty,tr=Object.getOwnPropertyDescriptor,v=(l,e,i,o)=>{for(var r=o>1?void 0:o?tr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&er(e,i,r),r};const ir=a.html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,rr=a.html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;t.UiStepConnector=class extends a.LitElement{constructor(){super(...arguments),this.orientation="horizontal",this.completed=!1}render(){return a.html`<div class="line ${h.classMap({completed:this.completed})}"></div>`}},t.UiStepConnector.styles=a.css`
        :host { display: block; }
        .line {
            background: var(--connector-color, #e5e7eb);
            border-radius: 2px;
            transition: background 0.3s;
        }
        .line.completed { background: var(--ui-primary-color, #3b82f6); }
        :host([orientation="horizontal"]) .line { height: 2px; width: 100%; }
        :host([orientation="vertical"])   .line { width: 2px; min-height: 24px; margin: 0 auto; }
    `,v([n.property({reflect:!0})],t.UiStepConnector.prototype,"orientation",2),v([n.property({type:Boolean})],t.UiStepConnector.prototype,"completed",2),t.UiStepConnector=v([n.customElement("ui-step-connector")],t.UiStepConnector),t.UiStepLabel=class extends a.LitElement{constructor(){super(...arguments),this.active=!1,this.disabled=!1,this.error=!1}render(){return a.html`
        <div class="label"><slot></slot></div>
        <div class="optional"><slot name="optional"></slot></div>
    `}},t.UiStepLabel.styles=a.css`
        :host { display: block; }
        .label { font-size: .875rem; font-weight: 500; color: var(--ui-text-color, #111827); font-family: var(--ui-font-family,'Inter',sans-serif); line-height: 1.4; }
        .optional { font-size: .75rem; color: #9ca3af; font-style: italic; }
        :host([active])   .label { color: var(--ui-primary-color, #3b82f6); font-weight: 600; }
        :host([disabled]) .label { color: #9ca3af; }
        :host([error])    .label { color: var(--ui-error-color, #ef4444); }
    `,v([n.property({type:Boolean,reflect:!0})],t.UiStepLabel.prototype,"active",2),v([n.property({type:Boolean,reflect:!0})],t.UiStepLabel.prototype,"disabled",2),v([n.property({type:Boolean,reflect:!0})],t.UiStepLabel.prototype,"error",2),t.UiStepLabel=v([n.customElement("ui-step-label")],t.UiStepLabel),t.UiStepContent=class extends a.LitElement{render(){return a.html`<div class="content"><slot></slot></div>`}},t.UiStepContent.styles=a.css`
        :host { display: block; overflow: hidden; }
        .content {
            padding: 8px 16px 16px;
            font-size: .875rem;
            color: var(--ui-text-color, #374151);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
    `,t.UiStepContent=v([n.customElement("ui-step-content")],t.UiStepContent),t.UiStep=class extends a.LitElement{constructor(){super(...arguments),this.active=!1,this.completed=!1,this.disabled=!1,this.optional=!1,this.error=!1,this.last=!1,this.clickable=!1,this.orientation="horizontal",this.alternativeLabel=!1,this.stepIndex=0,this.optionalLabel="Optional"}_fire(){this.disabled||this.dispatchEvent(new CustomEvent("ui-step-click",{detail:{index:this.stepIndex},bubbles:!0,composed:!0}))}_icon(){const e={"icon-circle":!0,active:this.active,completed:this.completed,error:this.error},i=this.error?rr:this.completed?ir:a.html`<slot name="icon">${this.stepIndex+1}</slot>`;return a.html`<div class=${h.classMap(e)}>${i}</div>`}_label(){return a.html`
            <ui-step-label ?active=${this.active} ?disabled=${this.disabled} ?error=${this.error}>
                <slot name="label"></slot>
                ${this.optional?a.html`<span slot="optional">${this.optionalLabel}</span>`:a.nothing}
            </ui-step-label>`}_connector(e=!1){return a.html`<ui-step-connector orientation=${this.orientation} ?completed=${e}></ui-step-connector>`}render(){const e=this.stepIndex>0,i=this.completed||!this.active&&this.stepIndex>0&&!this.disabled;if(this.orientation==="vertical"){const r=this.clickable?a.html`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active?"step":"false"}>${this._icon()} ${this._label()}</button>`:a.html`<div class="step-header">${this._icon()} ${this._label()}</div>`;return a.html`
                ${r}
                <div class="v-body">
                    <div class="v-line ${h.classMap({completed:this.completed})}"></div>
                    <div class="v-content"><slot></slot></div>
                </div>`}if(this.alternativeLabel){const r=this.clickable?a.html`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active?"step":"false"}>${this._icon()}</button>`:this._icon();return a.html`
                <div class="alt-top">
                    ${e?a.html`<div class="conn-fill">${this._connector(i)}</div>`:a.nothing}
                    ${r}
                    ${this.last?a.nothing:a.html`<div class="conn-fill"></div>`}
                </div>
                <div class="alt-label-row">${this._label()}</div>`}const o=this.clickable?a.html`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active?"step":"false"}>${this._icon()} ${this._label()}</button>`:a.html`<div class="step-header">${this._icon()} ${this._label()}</div>`;return a.html`
            ${e?a.html`<div class="conn-wrap">${this._connector(i)}</div>`:a.nothing}
            ${o}`}},t.UiStep.styles=a.css`
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
    `,v([n.property({type:Boolean,reflect:!0})],t.UiStep.prototype,"active",2),v([n.property({type:Boolean,reflect:!0})],t.UiStep.prototype,"completed",2),v([n.property({type:Boolean,reflect:!0})],t.UiStep.prototype,"disabled",2),v([n.property({type:Boolean,reflect:!0})],t.UiStep.prototype,"optional",2),v([n.property({type:Boolean,reflect:!0})],t.UiStep.prototype,"error",2),v([n.property({type:Boolean,reflect:!0})],t.UiStep.prototype,"last",2),v([n.property({type:Boolean,reflect:!0})],t.UiStep.prototype,"clickable",2),v([n.property({type:String,reflect:!0})],t.UiStep.prototype,"orientation",2),v([n.property({type:Boolean,reflect:!0,attribute:"alternative-label"})],t.UiStep.prototype,"alternativeLabel",2),v([n.property({type:Number,attribute:"step-index"})],t.UiStep.prototype,"stepIndex",2),v([n.property({type:String,attribute:"optional-label"})],t.UiStep.prototype,"optionalLabel",2),t.UiStep=v([n.customElement("ui-step")],t.UiStep),t.UiStepper=class extends a.LitElement{constructor(){super(...arguments),this.activeStep=0,this.orientation="horizontal",this.alternativeLabel=!1,this.nonLinear=!1,this._onStepClick=e=>{this.activeStep=e.detail.index,this.dispatchEvent(new CustomEvent("ui-step-change",{detail:{step:e.detail.index},bubbles:!0,composed:!0})),this._syncSteps()}}_syncSteps(){const e=Array.from(this.querySelectorAll(":scope > ui-step"));e.forEach((i,o)=>{i.stepIndex=o,i.last=o===e.length-1,i.orientation=this.orientation,i.alternativeLabel=this.alternativeLabel,i.active=o===this.activeStep,this.nonLinear?(i.disabled=!1,i.clickable=!0):(i.completed||(i.disabled=o>this.activeStep),i.clickable=!1)})}updated(e){(e.has("activeStep")||e.has("orientation")||e.has("alternativeLabel")||e.has("nonLinear"))&&this._syncSteps()}connectedCallback(){super.connectedCallback(),this.addEventListener("ui-step-click",this._onStepClick)}disconnectedCallback(){this.removeEventListener("ui-step-click",this._onStepClick),super.disconnectedCallback()}render(){const e=`stepper ${this.orientation}${this.alternativeLabel?" alt":""}`;return a.html`
            <div class=${e}>
                <slot @slotchange=${()=>{this._syncSteps(),this.requestUpdate()}}></slot>
            </div>`}},t.UiStepper.styles=a.css`
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
    `,v([n.property({type:Number,attribute:"active-step"})],t.UiStepper.prototype,"activeStep",2),v([n.property({type:String,reflect:!0})],t.UiStepper.prototype,"orientation",2),v([n.property({type:Boolean,attribute:"alternative-label"})],t.UiStepper.prototype,"alternativeLabel",2),v([n.property({type:Boolean,attribute:"non-linear"})],t.UiStepper.prototype,"nonLinear",2),t.UiStepper=v([n.customElement("ui-stepper")],t.UiStepper),t.UiMobileStepper=class extends a.LitElement{constructor(){super(...arguments),this.steps=0,this.activeStep=0,this.variant="dots",this.position="static"}_emit(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_progress(){if(this.variant==="text")return a.html`<span class="text">Step ${this.activeStep+1} of ${this.steps}</span>`;if(this.variant==="dots")return a.html`<div class="dots">${Array.from({length:this.steps},(i,o)=>a.html`<div class="dot ${o===this.activeStep?"active":""}"></div>`)}</div>`;const e=this.steps>1?this.activeStep/(this.steps-1)*100:100;return a.html`<div class="bar-track"><div class="bar-fill" style="width:${e}%"></div></div>`}render(){return a.html`
            <slot name="back-button">
                <button class="nav-btn back" ?disabled=${this.activeStep===0}
                    @click=${()=>this._emit("ui-mobile-step-back")}>Back</button>
            </slot>
            <div class="progress">${this._progress()}</div>
            <slot name="next-button">
                <button class="nav-btn next" ?disabled=${this.activeStep>=this.steps-1}
                    @click=${()=>this._emit("ui-mobile-step-next")}>Next</button>
            </slot>`}},t.UiMobileStepper.styles=a.css`
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
    `,v([n.property({type:Number})],t.UiMobileStepper.prototype,"steps",2),v([n.property({type:Number,attribute:"active-step"})],t.UiMobileStepper.prototype,"activeStep",2),v([n.property({type:String})],t.UiMobileStepper.prototype,"variant",2),v([n.property({type:String,reflect:!0})],t.UiMobileStepper.prototype,"position",2),t.UiMobileStepper=v([n.customElement("ui-mobile-stepper")],t.UiMobileStepper);var or=Object.defineProperty,nr=Object.getOwnPropertyDescriptor,y=(l,e,i,o)=>{for(var r=o>1?void 0:o?nr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&or(e,i,r),r};const Fe=l=>a.html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${l}"/></svg>`,ar=()=>Fe("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"),sr=()=>Fe("M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"),lr=()=>Fe("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"),cr=()=>Fe("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");t.UiTab=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.disabled=!1,this.selected=!1,this.iconPosition="start",this.href="",this.fullWidth=!1}setTabIndex(e){const i=this.shadowRoot?.querySelector("button,a");i&&(i.tabIndex=e)}focusInner(){this.shadowRoot?.querySelector("button,a")?.focus()}_fire(){this.disabled||this.dispatchEvent(new CustomEvent("ui-tab-click",{detail:{value:this.value},bubbles:!0,composed:!0}))}_inner(){return a.html`
            <span class="icon-slot"><slot name="icon"></slot></span>
            <slot></slot>`}render(){const e=h.classMap({tab:!0,[`icon-${this.iconPosition}`]:!0});return this.href?a.html`<a class=${e} href=${this.href}
                role="tab"
                aria-selected=${this.selected?"true":"false"}
                aria-disabled=${this.disabled?"true":"false"}
                tabindex=${this.selected?"0":"-1"}
                @click=${this._fire}>${this._inner()}</a>`:a.html`<button class=${e}
            role="tab"
            ?disabled=${this.disabled}
            aria-selected=${this.selected?"true":"false"}
            tabindex=${this.selected?"0":"-1"}
            @click=${this._fire}>${this._inner()}</button>`}},t.UiTab.styles=a.css`
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
    `,y([n.property({reflect:!0})],t.UiTab.prototype,"value",2),y([n.property({type:Boolean,reflect:!0})],t.UiTab.prototype,"disabled",2),y([n.property({type:Boolean,reflect:!0})],t.UiTab.prototype,"selected",2),y([n.property({attribute:"icon-position",reflect:!0})],t.UiTab.prototype,"iconPosition",2),y([n.property()],t.UiTab.prototype,"href",2),y([n.property({type:Boolean,reflect:!0,attribute:"full-width"})],t.UiTab.prototype,"fullWidth",2),t.UiTab=y([n.customElement("ui-tab")],t.UiTab),t.UiTabPanel=class extends a.LitElement{constructor(){super(...arguments),this.value=""}render(){return a.html`<div class="panel" role="tabpanel"><slot></slot></div>`}},t.UiTabPanel.styles=a.css`
        :host         { display: block; background: var(--ui-surface-background, #fff); }
        :host([hidden]){ display: none !important; }
        .panel        { padding: 24px; font-family: var(--ui-font-family,'Inter',sans-serif);
                        font-size: .875rem; color: #374151; line-height: 1.6; }
    `,y([n.property({reflect:!0})],t.UiTabPanel.prototype,"value",2),t.UiTabPanel=y([n.customElement("ui-tab-panel")],t.UiTabPanel),t.UiTabList=class extends a.LitElement{constructor(){super(...arguments),this.orientation="horizontal",this.variant="standard",this.centered=!1,this.scrollButtons="auto",this._canBack=!1,this._canFwd=!1}connectedCallback(){super.connectedCallback()}firstUpdated(){typeof ResizeObserver<"u"&&(this._ro=new ResizeObserver(()=>{this._checkScroll(),this.syncIndicator()}),this._ro.observe(this._area)),this._area.addEventListener("scroll",()=>this._checkScroll(),{passive:!0}),this._checkScroll(),requestAnimationFrame(()=>this.syncIndicator())}disconnectedCallback(){this._ro?.disconnect(),super.disconnectedCallback()}_tabs(){return this._slot?this._slot.assignedElements({flatten:!0}).filter(e=>e.tagName==="UI-TAB"):[]}_checkScroll(){const e=this._area;e&&(this.orientation==="horizontal"?(this._canBack=e.scrollLeft>1,this._canFwd=e.scrollLeft<e.scrollWidth-e.clientWidth-1):(this._canBack=e.scrollTop>1,this._canFwd=e.scrollTop<e.scrollHeight-e.clientHeight-1))}syncIndicator(){const e=this._tabs().find(r=>r.selected);if(!e||!this._ind||!this._row)return;const i=this._row.getBoundingClientRect(),o=e.getBoundingClientRect();!o.width&&!o.height||(this.orientation==="horizontal"?(this._ind.style.left=`${o.left-i.left}px`,this._ind.style.width=`${o.width}px`,this._ind.style.top="",this._ind.style.height=""):(this._ind.style.top=`${o.top-i.top}px`,this._ind.style.height=`${o.height}px`,this._ind.style.left="",this._ind.style.width=""),this._ind.style.opacity="1")}_scroll(e){this.orientation==="horizontal"?this._area.scrollBy({left:e,behavior:"smooth"}):this._area.scrollBy({top:e,behavior:"smooth"})}_onKey(e){const i=this.orientation==="horizontal",o=i?"ArrowLeft":"ArrowUp",r=i?"ArrowRight":"ArrowDown";if(![o,r,"Home","End"].includes(e.key))return;e.preventDefault();const s=this._tabs().filter(d=>!d.disabled),c=s.findIndex(d=>d.contains(document.activeElement)||d===document.activeElement);let p=c<0?0:c;e.key===o&&(p=(p-1+s.length)%s.length),e.key===r&&(p=(p+1)%s.length),e.key==="Home"&&(p=0),e.key==="End"&&(p=s.length-1),s[p]?.focusInner(),s[p]?.dispatchEvent(new CustomEvent("ui-tab-click",{detail:{value:s[p].value},bubbles:!0,composed:!0}))}_onSlotChange(){this._checkScroll(),requestAnimationFrame(()=>this.syncIndicator())}render(){const e=this.variant==="scrollable"&&this.scrollButtons!=="false",i=this.orientation==="vertical",o=e?a.html`
            <button class="scroll-btn" aria-label="Scroll back"
                ?disabled=${!this._canBack}
                @click=${()=>this._scroll(-200)}>
                ${i?lr():ar()}
            </button>`:a.nothing,r=e?a.html`
            <button class="scroll-btn" aria-label="Scroll forward"
                ?disabled=${!this._canFwd}
                @click=${()=>this._scroll(200)}>
                ${i?cr():sr()}
            </button>`:a.nothing;return a.html`
            <div class="container">
                ${o}
                <div class="scroll-area" @keydown=${this._onKey}>
                    <div class="tabs-row" role="tablist">
                        <slot @slotchange=${this._onSlotChange}></slot>
                        <div class="indicator"></div>
                    </div>
                </div>
                ${r}
            </div>`}},t.UiTabList.styles=a.css`
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
    `,y([n.property({reflect:!0})],t.UiTabList.prototype,"orientation",2),y([n.property({reflect:!0})],t.UiTabList.prototype,"variant",2),y([n.property({type:Boolean,reflect:!0})],t.UiTabList.prototype,"centered",2),y([n.property({attribute:"scroll-buttons"})],t.UiTabList.prototype,"scrollButtons",2),y([n.state()],t.UiTabList.prototype,"_canBack",2),y([n.state()],t.UiTabList.prototype,"_canFwd",2),y([n.query(".scroll-area")],t.UiTabList.prototype,"_area",2),y([n.query(".tabs-row")],t.UiTabList.prototype,"_row",2),y([n.query(".indicator")],t.UiTabList.prototype,"_ind",2),y([n.query("slot")],t.UiTabList.prototype,"_slot",2),t.UiTabList=y([n.customElement("ui-tab-list")],t.UiTabList),t.UiTabs=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.orientation="horizontal",this.variant="standard",this.centered=!1,this.scrollButtons="auto",this.textColor="primary",this.indicatorColor="primary",this._onTabClick=e=>{this.value=e.detail.value,this.dispatchEvent(new CustomEvent("ui-tab-change",{detail:{value:e.detail.value},bubbles:!0,composed:!0})),this._syncAll()}}connectedCallback(){super.connectedCallback(),this.addEventListener("ui-tab-click",this._onTabClick)}disconnectedCallback(){this.removeEventListener("ui-tab-click",this._onTabClick),super.disconnectedCallback()}_resolveColor(e){return e==="primary"?"#3b82f6":e==="secondary"?"#8b5cf6":e==="inherit"?"currentColor":e}_syncAll(){const e=this.querySelector("ui-tab-list"),i=Array.from(this.querySelectorAll("ui-tab")),o=Array.from(this.querySelectorAll("ui-tab-panel"));let r=this.value;if(!r){const p=i.find(d=>!d.disabled);p&&(r=p.value)}e&&(e.orientation=this.orientation,e.variant=this.variant,e.centered=this.centered,e.scrollButtons=this.scrollButtons,e.style.setProperty("--ui-tabs-ind-color",this._resolveColor(this.indicatorColor)));const s=this._resolveColor(this.textColor),c=this.textColor==="inherit"?"currentColor":"#6b7280";i.forEach(p=>{p.selected=p.value===r,p.fullWidth=this.variant==="fullWidth",p.style.setProperty("--ui-tab-active",s),p.style.setProperty("--ui-tab-inactive",c),p.setAttribute("id",`tab-${p.value}`),p.setAttribute("aria-controls",`panel-${p.value}`)}),o.forEach(p=>{p.setAttribute("id",`panel-${p.value}`),p.setAttribute("aria-labelledby",`tab-${p.value}`),p.value===r?p.removeAttribute("hidden"):p.setAttribute("hidden","")}),requestAnimationFrame(()=>e?.syncIndicator())}updated(e){["value","orientation","variant","centered","scrollButtons","textColor","indicatorColor"].some(o=>e.has(o))&&this._syncAll()}render(){return a.html`
            <div class="root">
                <slot @slotchange=${()=>this._syncAll()}></slot>
            </div>`}},t.UiTabs.styles=a.css`
        :host { display: block; font-family: var(--ui-font-family,'Inter',sans-serif);
                background: var(--ui-surface-background, #fff); }
        /* Vertical: stretch the root div so panels fill available height */
        :host([orientation="vertical"]) .root {
            display: flex; flex-direction: row;
            height: 100%; min-height: inherit;
        }
        .root { display: block; }
    `,y([n.property({reflect:!0})],t.UiTabs.prototype,"value",2),y([n.property({reflect:!0})],t.UiTabs.prototype,"orientation",2),y([n.property()],t.UiTabs.prototype,"variant",2),y([n.property({type:Boolean})],t.UiTabs.prototype,"centered",2),y([n.property({attribute:"scroll-buttons"})],t.UiTabs.prototype,"scrollButtons",2),y([n.property({attribute:"text-color"})],t.UiTabs.prototype,"textColor",2),y([n.property({attribute:"indicator-color"})],t.UiTabs.prototype,"indicatorColor",2),t.UiTabs=y([n.customElement("ui-tabs")],t.UiTabs);var pr=Object.defineProperty,dr=Object.getOwnPropertyDescriptor,g=(l,e,i,o)=>{for(var r=o>1?void 0:o?dr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&pr(e,i,r),r};const hr=new Set(["div","span","section","article","header","footer","main","aside","nav","ul","ol","li","p","form","fieldset","label","figure","figcaption","address","blockquote","details","summary","dialog"]);t.UiBox=class extends a.LitElement{constructor(){super(...arguments),this.component="div"}get _safeComponent(){return hr.has(this.component)?this.component:(console.warn(`[ui-box] Unknown component tag "${this.component}", falling back to "div".`),"div")}_getStyles(){const e={};return this.m&&(e.margin=this.m),this.mx&&(e.marginLeft=this.mx,e.marginRight=this.mx),this.my&&(e.marginTop=this.my,e.marginBottom=this.my),this.mt&&(e.marginTop=this.mt),this.mr&&(e.marginRight=this.mr),this.mb&&(e.marginBottom=this.mb),this.ml&&(e.marginLeft=this.ml),this.p&&(e.padding=this.p),this.px&&(e.paddingLeft=this.px,e.paddingRight=this.px),this.py&&(e.paddingTop=this.py,e.paddingBottom=this.py),this.pt&&(e.paddingTop=this.pt),this.pr&&(e.paddingRight=this.pr),this.pb&&(e.paddingBottom=this.pb),this.pl&&(e.paddingLeft=this.pl),this.display&&(e.display=this.display),this.flexDirection&&(e.flexDirection=this.flexDirection),this.alignItems&&(e.alignItems=this.alignItems),this.justifyContent&&(e.justifyContent=this.justifyContent),this.flexWrap&&(e.flexWrap=this.flexWrap),this.flexBasis&&(e.flexBasis=this.flexBasis),this.flexGrow&&(e.flexGrow=this.flexGrow),this.flexShrink&&(e.flexShrink=this.flexShrink),this.gap&&(e.gap=this.gap),this.bgcolor&&(e.backgroundColor=this.bgcolor==="primary"?"var(--ui-primary-color)":this.bgcolor==="secondary"?"var(--ui-secondary-color)":this.bgcolor),this.color&&(e.color=this.color==="primary"?"var(--ui-primary-color)":this.color==="secondary"?"var(--ui-secondary-color)":this.color),this.border&&(e.border=this.border),this.borderRadius&&(e.borderRadius=this.borderRadius),this.boxShadow&&(e.boxShadow=this.boxShadow),this.width&&(e.width=this.width),this.height&&(e.height=this.height),e}render(){const e=w.unsafeStatic(this._safeComponent);return w.html`
      <${e} style=${ne.styleMap(this._getStyles())}>
        <slot></slot>
      </${e}>
    `}},t.UiBox.styles=a.css`
    :host {
      display: block;
    }
  `,g([n.property({type:String})],t.UiBox.prototype,"component",2),g([n.property({type:String})],t.UiBox.prototype,"m",2),g([n.property({type:String})],t.UiBox.prototype,"mt",2),g([n.property({type:String})],t.UiBox.prototype,"mr",2),g([n.property({type:String})],t.UiBox.prototype,"mb",2),g([n.property({type:String})],t.UiBox.prototype,"ml",2),g([n.property({type:String})],t.UiBox.prototype,"mx",2),g([n.property({type:String})],t.UiBox.prototype,"my",2),g([n.property({type:String})],t.UiBox.prototype,"p",2),g([n.property({type:String})],t.UiBox.prototype,"pt",2),g([n.property({type:String})],t.UiBox.prototype,"pr",2),g([n.property({type:String})],t.UiBox.prototype,"pb",2),g([n.property({type:String})],t.UiBox.prototype,"pl",2),g([n.property({type:String})],t.UiBox.prototype,"px",2),g([n.property({type:String})],t.UiBox.prototype,"py",2),g([n.property({type:String})],t.UiBox.prototype,"display",2),g([n.property({type:String})],t.UiBox.prototype,"flexDirection",2),g([n.property({type:String})],t.UiBox.prototype,"alignItems",2),g([n.property({type:String})],t.UiBox.prototype,"justifyContent",2),g([n.property({type:String})],t.UiBox.prototype,"flexWrap",2),g([n.property({type:String})],t.UiBox.prototype,"flexBasis",2),g([n.property({type:String})],t.UiBox.prototype,"flexGrow",2),g([n.property({type:String})],t.UiBox.prototype,"flexShrink",2),g([n.property({type:String})],t.UiBox.prototype,"gap",2),g([n.property({type:String})],t.UiBox.prototype,"bgcolor",2),g([n.property({type:String})],t.UiBox.prototype,"color",2),g([n.property({type:String})],t.UiBox.prototype,"border",2),g([n.property({type:String})],t.UiBox.prototype,"borderRadius",2),g([n.property({type:String})],t.UiBox.prototype,"boxShadow",2),g([n.property({type:String})],t.UiBox.prototype,"width",2),g([n.property({type:String})],t.UiBox.prototype,"height",2),t.UiBox=g([n.customElement("ui-box")],t.UiBox);var ur=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,Ve=(l,e,i,o)=>{for(var r=o>1?void 0:o?mr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&ur(e,i,r),r};t.UiContainer=class extends a.LitElement{constructor(){super(...arguments),this.maxWidth="lg",this.disableGutters=!1,this.fixed=!1}render(){return a.html`
      <div class=${h.classMap({container:!0,[`max-width-${this.maxWidth}`]:this.maxWidth!==!1,"disable-gutters":this.disableGutters,fixed:this.fixed})}>
        <slot></slot>
      </div>
    `}},t.UiContainer.styles=a.css`
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
  `,Ve([n.property({attribute:"max-width",reflect:!0,converter:{fromAttribute:l=>l===null||l==="false"?!1:l,toAttribute:l=>l===!1?null:l}})],t.UiContainer.prototype,"maxWidth",2),Ve([n.property({type:Boolean,attribute:"disable-gutters",reflect:!0})],t.UiContainer.prototype,"disableGutters",2),Ve([n.property({type:Boolean,reflect:!0})],t.UiContainer.prototype,"fixed",2),t.UiContainer=Ve([n.customElement("ui-container")],t.UiContainer);var fr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,$=(l,e,i,o)=>{for(var r=o>1?void 0:o?br(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&fr(e,i,r),r};t.UiGrid=class extends a.LitElement{constructor(){super(...arguments),this.container=!1,this.direction="row",this.wrap="wrap",this.columns=12,this.spacing=0,this._currentWidth=typeof window<"u"?window.innerWidth:1200,this._onResize=()=>{this._currentWidth=window.innerWidth},this._breakpointCache={}}_getBreakpointValue(e,i){if(this._breakpointCache[e]!==void 0)return this._breakpointCache[e];if(typeof window<"u"){const o=getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${e}`);if(o&&o.trim())return this._breakpointCache[e]=parseInt(o,10),this._breakpointCache[e]}return i}connectedCallback(){super.connectedCallback(),typeof window<"u"&&(window.addEventListener("resize",this._onResize),this._currentWidth=window.innerWidth)}disconnectedCallback(){super.disconnectedCallback(),typeof window<"u"&&window.removeEventListener("resize",this._onResize)}_getBreakpoint(){const e=this._currentWidth;return e>=this._getBreakpointValue("xl",1536)?"xl":e>=this._getBreakpointValue("lg",1200)?"lg":e>=this._getBreakpointValue("md",900)?"md":e>=this._getBreakpointValue("sm",600)?"sm":"xs"}_getEffectiveSize(e){const i=["xs","sm","md","lg","xl"],o=i.indexOf(e);for(let r=o;r>=0;r--){const s=this[i[r]];if(s!==void 0)return typeof s=="string"&&!isNaN(Number(s))&&s.trim()!==""?Number(s):s==="true"?!0:s==="false"?!1:s}}_getEffectiveOffset(e){if(!this.offset)return;const i=["xs","sm","md","lg","xl"],o=i.indexOf(e);for(let r=o;r>=0;r--){const s=this.offset[i[r]];if(s!==void 0)return typeof s=="string"&&!isNaN(Number(s))&&s.trim()!==""?Number(s):s}}_resolveResponsive(e,i){if(typeof e=="object"&&e!==null){const o=["xs","sm","md","lg","xl"],r=o.indexOf(i);for(let s=r;s>=0;s--){const c=e[o[s]];if(c!==void 0)return c}return 0}return typeof e=="string"&&!isNaN(Number(e))&&e.trim()!==""?Number(e):e}_resolveResponsiveOrder(e,i){if(typeof e=="object"&&e!==null){const o=["xs","sm","md","lg","xl"],r=o.indexOf(i);for(let s=r;s>=0;s--){const c=e[o[s]];if(c!==void 0)return c}return}return e}_toPx(e){return typeof e=="number"?`${e*8}px`:e}_getSpacingStyles(e){if(!this.container)return{};const i=this._resolveResponsive(this.spacing,e),o=this.rowSpacing!==void 0?this._resolveResponsive(this.rowSpacing,e):i,r=this.columnSpacing!==void 0?this._resolveResponsive(this.columnSpacing,e):i;return{gap:`${this._toPx(o)} ${this._toPx(r)}`}}_getEffectiveColumns(){if(this.container)return this.columns;const e=getComputedStyle(this).getPropertyValue("--ui-grid-columns").trim();return e&&!isNaN(Number(e))?Number(e):this.columns}_getItemStyles(e){const i=this.xs!==void 0||this.sm!==void 0||this.md!==void 0||this.lg!==void 0||this.xl!==void 0,o=!!this.offset,r=this.order!==void 0;if(!i&&!o&&!r)return{};const s=this._getEffectiveSize(e),c=this._getEffectiveOffset(e),p=this._getEffectiveColumns(),d={};if(s===!0)d["flex-grow"]="1",d["flex-basis"]="0%",d["max-width"]="100%";else if(s==="auto")d["flex-grow"]="0",d["flex-basis"]="auto",d.width="auto",d["max-width"]="none";else if(typeof s=="number"){const f=s/p*100;d["flex-grow"]="0",d["flex-basis"]=`calc(${f}% - var(--ui-grid-column-gap, 0px) * ${(p-s)/p})`,d["max-width"]=`calc(${f}% - var(--ui-grid-column-gap, 0px) * ${(p-s)/p})`}else this.container||(d["flex-grow"]="0",d["flex-basis"]="auto",d.width="100%");if(c==="auto")d["margin-left"]="auto";else if(typeof c=="number"){const f=c/p*100;d["margin-left"]=`${f}%`}if(this.order!==void 0){const f=this._resolveResponsiveOrder(this.order,e);f!==void 0&&(d.order=String(f))}return d}updated(e){super.updated(e),this._applyItemStyles()}_applyItemStyles(){const e=this._getBreakpoint(),i=this._getItemStyles(e);if(this.style.flexGrow="",this.style.flexBasis="",this.style.maxWidth="",this.style.width="",this.style.marginLeft="",this.style.order="",Object.entries(i).forEach(([o,r])=>{this.style.setProperty(o,r)}),this.container){const o=this._getSpacingStyles(e);if(o.gap){const r=o.gap.split(" "),s=r.length===2?r[1]:r[0];this.style.setProperty("--ui-grid-column-gap",s)}this.style.setProperty("--ui-grid-columns",String(this.columns))}}render(){const e=this._getBreakpoint(),o={...this._getSpacingStyles(e),"align-items":this.alignItems||"","justify-content":this.justifyContent||""};return a.html`
      <div class=${h.classMap({"grid-wrapper":!0,container:this.container,[`direction-${this.direction}`]:this.container,[`wrap-${this.wrap}`]:this.container&&this.wrap!=="wrap"})} style=${ne.styleMap(o)}>
        <slot></slot>
      </div>
    `}},t.UiGrid.styles=a.css`
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
  `,$([n.property({type:Boolean,reflect:!0})],t.UiGrid.prototype,"container",2),$([n.property({type:String,reflect:!0})],t.UiGrid.prototype,"direction",2),$([n.property({type:String,reflect:!0})],t.UiGrid.prototype,"wrap",2),$([n.property({type:String,attribute:"align-items",reflect:!0})],t.UiGrid.prototype,"alignItems",2),$([n.property({type:String,attribute:"justify-content",reflect:!0})],t.UiGrid.prototype,"justifyContent",2),$([n.property({type:Number})],t.UiGrid.prototype,"columns",2),$([n.property({type:Object})],t.UiGrid.prototype,"spacing",2),$([n.property({type:Object})],t.UiGrid.prototype,"rowSpacing",2),$([n.property({type:Object})],t.UiGrid.prototype,"columnSpacing",2),$([n.property()],t.UiGrid.prototype,"xs",2),$([n.property()],t.UiGrid.prototype,"sm",2),$([n.property()],t.UiGrid.prototype,"md",2),$([n.property()],t.UiGrid.prototype,"lg",2),$([n.property()],t.UiGrid.prototype,"xl",2),$([n.property({type:Object})],t.UiGrid.prototype,"offset",2),$([n.property({type:Object})],t.UiGrid.prototype,"order",2),$([n.state()],t.UiGrid.prototype,"_currentWidth",2),t.UiGrid=$([n.customElement("ui-grid")],t.UiGrid);var gr=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,ce=(l,e,i,o)=>{for(var r=o>1?void 0:o?vr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&gr(e,i,r),r};t.UiStack=class extends a.LitElement{constructor(){super(...arguments),this.direction="column",this.spacing=0,this.useFlexGap=!0,this._currentWidth=typeof window<"u"?window.innerWidth:1200,this._onResize=()=>{this._currentWidth=window.innerWidth,this.requestUpdate()}}_getBreakpointValue(e,i){if(t.UiStack._breakPoints[e])return t.UiStack._breakPoints[e];if(typeof window<"u"){const o=getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${e}`);if(o&&o.trim())return t.UiStack._breakPoints[e]=parseInt(o,10),t.UiStack._breakPoints[e]}return i}connectedCallback(){super.connectedCallback(),typeof window<"u"&&(window.addEventListener("resize",this._onResize),this._currentWidth=window.innerWidth)}disconnectedCallback(){super.disconnectedCallback(),typeof window<"u"&&window.removeEventListener("resize",this._onResize)}updated(e){super.updated(e),this._updateDividers()}_updateDividers(){const e=this._getBreakpoint(),i=this._resolveResponsive(this.direction,e);if(!i)return;const o=i.startsWith("row")?"vertical":"horizontal";this.querySelectorAll("ui-divider").forEach(r=>{r.getAttribute("orientation")!==o&&r.setAttribute("orientation",o)})}_getBreakpoint(){const e=this._currentWidth;return e>=this._getBreakpointValue("xl",1536)?"xl":e>=this._getBreakpointValue("lg",1200)?"lg":e>=this._getBreakpointValue("md",900)?"md":e>=this._getBreakpointValue("sm",600)?"sm":"xs"}_resolveResponsive(e,i){if(typeof e=="object"&&e!==null&&!Array.isArray(e)){const o=["xs","sm","md","lg","xl"],r=o.indexOf(i);for(let p=r;p>=0;p--){const d=e[o[p]];if(d!==void 0)return d}const s=e,c=s.xs;return c!==void 0?c:s[Object.keys(e)[0]]}return e}_getSpacingPx(e){return typeof e=="number"?`${e*8}px`:e}render(){const e=this._getBreakpoint(),i=this._resolveResponsive(this.direction,e),o=this._resolveResponsive(this.spacing,e),r=this._getSpacingPx(o),s=i??"column",c=s.startsWith("column")?"stretch":"center",p={"flex-direction":s,"align-items":this.alignItems||c,"justify-content":this.justifyContent||"flex-start",gap:this.useFlexGap?r:"0","--ui-stack-spacing":r};return a.html`
      <div
        class="stack-wrapper direction-${i} ${this.useFlexGap?"":"no-flex-gap"}"
        style=${ne.styleMap(p)}
      >
        <slot></slot>
      </div>
    `}},t.UiStack.styles=a.css`
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
  `,t.UiStack._breakPoints={},ce([n.property({converter:{fromAttribute:l=>{if(!l)return"column";try{return JSON.parse(l)}catch{return l}}}})],t.UiStack.prototype,"direction",2),ce([n.property({type:Object})],t.UiStack.prototype,"spacing",2),ce([n.property({type:String})],t.UiStack.prototype,"alignItems",2),ce([n.property({type:String})],t.UiStack.prototype,"justifyContent",2),ce([n.property({type:Boolean})],t.UiStack.prototype,"useFlexGap",2),ce([n.state()],t.UiStack.prototype,"_currentWidth",2),t.UiStack=ce([n.customElement("ui-stack")],t.UiStack);var yr=Object.defineProperty,wr=Object.getOwnPropertyDescriptor,ye=(l,e,i,o)=>{for(var r=o>1?void 0:o?wr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&yr(e,i,r),r};t.UiImageList=class extends a.LitElement{constructor(){super(...arguments),this.variant="standard",this.cols=3,this.gap=4,this.rowHeight=164,this.autoRows=!1}render(){const e=this.variant==="masonry",i={};return e?(i["--ui-image-list-cols"]=String(this.cols),i["column-count"]=String(this.cols),i["column-gap"]=`${this.gap}px`):(i["grid-template-columns"]=`repeat(${this.cols}, 1fr)`,i.gap=`${this.gap}px`,i["--ui-image-list-row-height"]=`${this.rowHeight}px`,i["grid-auto-rows"]=this.autoRows?"auto":`${this.rowHeight}px`),i["--ui-image-list-variant"]=this.variant,i["--ui-image-list-gap"]=`${this.gap}px`,a.html`
      <ul class="image-list variant-${this.variant}" style="${ne.styleMap(i)}" role="list">
        <slot></slot>
      </ul>
    `}},t.UiImageList.styles=a.css`
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
  `,ye([n.property({type:String})],t.UiImageList.prototype,"variant",2),ye([n.property({type:Number})],t.UiImageList.prototype,"cols",2),ye([n.property({type:Number})],t.UiImageList.prototype,"gap",2),ye([n.property({type:Number})],t.UiImageList.prototype,"rowHeight",2),ye([n.property({type:Boolean})],t.UiImageList.prototype,"autoRows",2),t.UiImageList=ye([n.customElement("ui-image-list")],t.UiImageList);var xr=Object.defineProperty,kr=Object.getOwnPropertyDescriptor,Se=(l,e,i,o)=>{for(var r=o>1?void 0:o?kr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&xr(e,i,r),r};t.UiImageListItem=class extends a.LitElement{constructor(){super(...arguments),this.rows=1,this.cols=1,this.barPosition="overlay",this.weave="odd"}connectedCallback(){super.connectedCallback(),this._applyGridSpan()}updated(e){super.updated(e),this._applyGridSpan()}_applyGridSpan(){this.rows>1&&(this.style.gridRow=`span ${this.rows}`),this.cols>1&&(this.style.gridColumn=`span ${this.cols}`);const e=this.closest("ui-image-list");e&&e.getAttribute("variant")==="masonry"?this.classList.add("masonry"):this.classList.remove("masonry"),e&&e.getAttribute("variant")==="woven"&&(this.style.gridRow=this.weave==="odd"?"span 2":"span 1")}render(){const e={};return this.rows>1&&(e["grid-row"]=`span ${this.rows}`),this.cols>1&&(e["grid-column"]=`span ${this.cols}`),a.html`
      <li class="item-wrapper" style="${ne.styleMap(e)}">
        <slot name="img"><slot></slot></slot>
        <slot name="bar"></slot>
      </li>
    `}},t.UiImageListItem.styles=a.css`
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
  `,Se([n.property({type:Number})],t.UiImageListItem.prototype,"rows",2),Se([n.property({type:Number})],t.UiImageListItem.prototype,"cols",2),Se([n.property({type:String,attribute:"bar-position",reflect:!0})],t.UiImageListItem.prototype,"barPosition",2),Se([n.property({type:String})],t.UiImageListItem.prototype,"weave",2),t.UiImageListItem=Se([n.customElement("ui-image-list-item")],t.UiImageListItem);var Ur=Object.defineProperty,_r=Object.getOwnPropertyDescriptor,je=(l,e,i,o)=>{for(var r=o>1?void 0:o?_r(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Ur(e,i,r),r};t.UiImageListItemBar=class extends a.LitElement{constructor(){super(...arguments),this.position="bottom"}render(){return a.html`
      <div class="bar-inner">
        <div class="bar-text">
          <div class="bar-title"><slot></slot></div>
          <div class="bar-subtitle"><slot name="subtitle"></slot></div>
        </div>
        <div class="bar-action">
          <slot name="action"></slot>
        </div>
      </div>
    `}},t.UiImageListItemBar.styles=a.css`
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
  `,je([n.property({type:String,reflect:!0})],t.UiImageListItemBar.prototype,"position",2),t.UiImageListItemBar=je([n.customElement("ui-image-list-item-bar")],t.UiImageListItemBar);var $r=Object.defineProperty,Cr=Object.getOwnPropertyDescriptor,x=(l,e,i,o)=>{for(var r=o>1?void 0:o?Cr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&$r(e,i,r),r};const Ir=["Su","Mo","Tu","We","Th","Fr","Sa"],et=["January","February","March","April","May","June","July","August","September","October","November","December"];function pe(l){if(!l)return null;const[e,i,o]=l.split("-").map(Number);return!e||!i||!o?null:new Date(e,i-1,o)}function Ne(l){const e=l.getFullYear(),i=String(l.getMonth()+1).padStart(2,"0"),o=String(l.getDate()).padStart(2,"0");return`${e}-${i}-${o}`}function Er(l){const e=pe(l);return e?`${String(e.getMonth()+1).padStart(2,"0")}/${String(e.getDate()).padStart(2,"0")}/${e.getFullYear()}`:""}function Sr(){return Ne(new Date)}function we(l,e){return l.getFullYear()===e.getFullYear()&&l.getMonth()===e.getMonth()&&l.getDate()===e.getDate()}function Pr(l,e,i,o,r){const s=[],c=new Date(l,e,1),p=Sr(),d=pe(p),f=i?pe(i):null,b=o?pe(o):null,m=r?pe(r):null,E=c.getDay();for(let A=E-1;A>=0;A--){const U=new Date(l,e,-A),Pe=Ne(U);s.push({date:U,iso:Pe,day:U.getDate(),isCurrentMonth:!1,isToday:we(U,d),isSelected:f?we(U,f):!1,isDisabled:(b?U<b:!1)||(m?U>m:!1)})}const z=new Date(l,e+1,0).getDate();for(let A=1;A<=z;A++){const U=new Date(l,e,A),Pe=Ne(U);s.push({date:U,iso:Pe,day:A,isCurrentMonth:!0,isToday:we(U,d),isSelected:f?we(U,f):!1,isDisabled:(b?U<b:!1)||(m?U>m:!1)})}const B=42-s.length;for(let A=1;A<=B;A++){const U=new Date(l,e+1,A),Pe=Ne(U);s.push({date:U,iso:Pe,day:A,isCurrentMonth:!1,isToday:we(U,d),isSelected:f?we(U,f):!1,isDisabled:(b?U<b:!1)||(m?U>m:!1)})}return s}t.UiDatePickerCalendar=class extends a.LitElement{constructor(){super(...arguments),this.disabled=!1,this._viewYear=new Date().getFullYear(),this._viewMonth=new Date().getMonth(),this._mode="day"}connectedCallback(){if(super.connectedCallback(),this.value){const e=pe(this.value);e&&(this._viewYear=e.getFullYear(),this._viewMonth=e.getMonth())}}navigateTo(e){const i=pe(e);i&&(this._viewYear=i.getFullYear(),this._viewMonth=i.getMonth())}_prevMonth(){this._viewMonth===0?(this._viewMonth=11,this._viewYear--):this._viewMonth--}_nextMonth(){this._viewMonth===11?(this._viewMonth=0,this._viewYear++):this._viewMonth++}_selectDay(e){e.isDisabled||this.disabled||this.dispatchEvent(new CustomEvent("date-select",{detail:{value:e.iso},bubbles:!0,composed:!0}))}_selectYear(e){this._viewYear=e,this._mode="month"}_selectMonth(e){this._viewMonth=e,this._mode="day"}_renderDayView(){const e=Pr(this._viewYear,this._viewMonth,this.value??null,this.min??null,this.max??null);return a.html`
      <div class="header">
        <button class="nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="header-label" @click=${()=>this._mode="month"} role="button" tabindex="0"
          @keydown=${i=>i.key==="Enter"&&(this._mode="month")}
        >
          ${et[this._viewMonth]} ${this._viewYear}
        </span>
        <button class="nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>
      <div class="dow-row">${Ir.map(i=>a.html`<span class="dow-cell">${i}</span>`)}</div>
      <div class="day-grid" role="grid" aria-label="Calendar">
        ${ue.repeat(e,i=>i.iso,i=>a.html`
          <button
            class=${h.classMap({"day-cell":!0,"other-month":!i.isCurrentMonth,today:i.isToday,selected:i.isSelected,disabled:i.isDisabled})}
            aria-label=${i.date.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
            aria-selected=${i.isSelected}
            aria-disabled=${i.isDisabled}
            tabindex=${i.isCurrentMonth&&!i.isDisabled?0:-1}
            @click=${()=>this._selectDay(i)}
          >${i.day}</button>
        `)}
      </div>
    `}_renderMonthView(){return a.html`
      <div class="header">
        <button class="nav-btn" @click=${()=>this._viewYear--} aria-label="Previous year">‹</button>
        <span class="header-label" @click=${()=>this._mode="year"} role="button" tabindex="0">${this._viewYear}</span>
        <button class="nav-btn" @click=${()=>this._viewYear++} aria-label="Next year">›</button>
      </div>
      <div class="month-grid">
        ${et.map((e,i)=>a.html`
          <button class=${h.classMap({"month-btn":!0,"selected-month":i===this._viewMonth})}
            @click=${()=>this._selectMonth(i)}>${e.slice(0,3)}</button>
        `)}
      </div>
    `}_renderYearView(){const e=new Date().getFullYear(),i=Array.from({length:201},(o,r)=>e-100+r);return a.html`
      <div class="header">
        <span class="header-label" style="cursor:default">Select Year</span>
      </div>
      <div class="year-grid">
        ${i.map(o=>a.html`
          <button class=${h.classMap({"year-btn":!0,"selected-year":o===this._viewYear})}
            @click=${()=>this._selectYear(o)}>${o}</button>
        `)}
      </div>
    `}render(){return a.html`
      <div class="calendar">
        ${this._mode==="day"?this._renderDayView():this._mode==="month"?this._renderMonthView():this._renderYearView()}
      </div>
    `}},t.UiDatePickerCalendar.styles=a.css`
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
  `,x([n.property({type:String})],t.UiDatePickerCalendar.prototype,"value",2),x([n.property({type:String})],t.UiDatePickerCalendar.prototype,"min",2),x([n.property({type:String})],t.UiDatePickerCalendar.prototype,"max",2),x([n.property({type:Boolean})],t.UiDatePickerCalendar.prototype,"disabled",2),x([n.state()],t.UiDatePickerCalendar.prototype,"_viewYear",2),x([n.state()],t.UiDatePickerCalendar.prototype,"_viewMonth",2),x([n.state()],t.UiDatePickerCalendar.prototype,"_mode",2),t.UiDatePickerCalendar=x([n.customElement("ui-date-picker-calendar")],t.UiDatePickerCalendar),t.UiDatePicker=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.label="Date",this.placeholder="MM/DD/YYYY",this.name="",this.variant="desktop",this.min="",this.max="",this.disabled=!1,this.readonly=!1,this.error=!1,this.helperText="",this._open=!1,this._pendingValue=""}get _resolvedVariant(){return this.variant==="auto"?window.matchMedia("(pointer: coarse)").matches?"mobile":"desktop":this.variant}_openPicker(){this.disabled||this._open||(this._pendingValue=this.value,this._open=!0)}_closePicker(){this._open=!1}_handleCalendarSelect(e){const i=e.detail.value,o=this._resolvedVariant;o==="desktop"?(this._pendingValue=i,this._commit(i)):o==="mobile"&&(this._pendingValue=i)}_handleStaticSelect(e){const i=e.detail.value;this._commit(i)}_commit(e){if(e===this.value){this._closePicker();return}this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0,composed:!0})),this._closePicker()}_handleMobileOk(){this._commit(this._pendingValue||this.value)}_handleMobileCancel(){this._pendingValue=this.value,this._closePicker()}_handleFieldInput(e){if(this.readonly)return;const o=e.target.value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(o){const r=`${o[3]}-${o[1]}-${o[2]}`;if(isNaN(new Date(r).getTime())||this.min&&r<this.min||this.max&&r>this.max)return;this._commit(r)}}_renderField(){return a.html`
      ${this.label?a.html`<label class="field-label" for="dp-input">${this.label}</label>`:a.nothing}
      <div class="field-wrapper">
        <input
          id="dp-input"
          class="field-input"
          type="text"
          .value=${Er(this.value)}
          placeholder=${this.placeholder}
          name=${this.name||a.nothing}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-label=${this.label||"Date"}
          aria-haspopup="true"
          aria-expanded=${this._open}
          @input=${this._handleFieldInput}
          @focus=${()=>{this.readonly&&this._openPicker()}}
        />
        <button
          class="calendar-icon-btn"
          aria-label="Open date picker"
          aria-haspopup="true"
          tabindex=${this.disabled?-1:0}
          @click=${this._openPicker}
        >
          📅
        </button>
      </div>
      ${this.helperText?a.html`<p class="helper-text">${this.helperText}</p>`:a.nothing}
    `}_renderDesktop(){return a.html`
      <div>
        <div class="popover-anchor">
          ${this._renderField()}
          <div class="click-away ${this._open?"open":""}" @click=${this._closePicker}></div>
          <div class="popover ${this._open?"open":""}" role="dialog" aria-label="Date picker">
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
    `}_renderMobile(){return a.html`
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
              .value=${this._pendingValue||this.value}
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
    `}_renderStatic(){return a.html`
      <div class="static-wrapper">
        <ui-date-picker-calendar
          .value=${this.value}
          .min=${this.min}
          .max=${this.max}
          ?disabled=${this.disabled}
          @date-select=${this._handleStaticSelect}
        ></ui-date-picker-calendar>
      </div>
    `}render(){const e=this._resolvedVariant;return e==="static"?this._renderStatic():e==="mobile"?this._renderMobile():this._renderDesktop()}},t.UiDatePicker.styles=a.css`
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
  `,x([n.property({type:String})],t.UiDatePicker.prototype,"value",2),x([n.property({type:String})],t.UiDatePicker.prototype,"label",2),x([n.property({type:String})],t.UiDatePicker.prototype,"placeholder",2),x([n.property({type:String})],t.UiDatePicker.prototype,"name",2),x([n.property({type:String})],t.UiDatePicker.prototype,"variant",2),x([n.property({type:String})],t.UiDatePicker.prototype,"min",2),x([n.property({type:String})],t.UiDatePicker.prototype,"max",2),x([n.property({type:Boolean,reflect:!0})],t.UiDatePicker.prototype,"disabled",2),x([n.property({type:Boolean,reflect:!0})],t.UiDatePicker.prototype,"readonly",2),x([n.property({type:Boolean,reflect:!0})],t.UiDatePicker.prototype,"error",2),x([n.property({type:String,attribute:"helper-text"})],t.UiDatePicker.prototype,"helperText",2),x([n.state()],t.UiDatePicker.prototype,"_open",2),x([n.state()],t.UiDatePicker.prototype,"_pendingValue",2),t.UiDatePicker=x([n.customElement("ui-date-picker")],t.UiDatePicker);var Tr=Object.defineProperty,Dr=Object.getOwnPropertyDescriptor,S=(l,e,i,o)=>{for(var r=o>1?void 0:o?Dr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Tr(e,i,r),r};function qe(l,e,i){return Math.min(Math.max(l,e),i)}function He(l,e){return l<1||l>12?31:new Date(e||2e3,l,0).getDate()}function Lr(l){if(!l)return{m:null,d:null,y:null};const e=l.match(/^(\d{4})-(\d{2})-(\d{2})$/);return e?{y:parseInt(e[1]),m:parseInt(e[2]),d:parseInt(e[3])}:{m:null,d:null,y:null}}function tt(l,e,i){return l===null||e===null||i===null?"":`${String(i).padStart(4,"0")}-${String(l).padStart(2,"0")}-${String(e).padStart(2,"0")}`}const ie=["month","day","year"];t.UiDateField=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.label="",this.name="",this.min="",this.max="",this.disabled=!1,this.readonly=!1,this.error=!1,this.helperText="",this._internals=this.attachInternals(),this._month=null,this._day=null,this._year=null,this._active=null,this._focused=!1,this._buf=""}willUpdate(e){if(e.has("value")){const{m:i,d:o,y:r}=Lr(this.value);this._month=i,this._day=o,this._year=r}}updated(){this._syncFormValue()}clear(){this._month=null,this._day=null,this._year=null,this._buf="",this._internals.setFormValue?.(null),this.dispatchEvent(new CustomEvent("clear",{bubbles:!0,composed:!0}))}_syncFormValue(){const e=tt(this._month,this._day,this._year);this._internals.setFormValue?.(e||null)}_setActive(e){this.disabled||this.readonly||(this._commitPartialBuffer(),this._active=e,this._buf="")}_commitPartialBuffer(){if(!this._buf||!this._active)return;const e=parseInt(this._buf);if(!isNaN(e)){if(this._active==="month"&&e>=1&&e<=12)this._month=e;else if(this._active==="day"){const i=He(this._month??1,this._year??2e3);e>=1&&e<=i&&(this._day=e)}}}_nextSegment(){if(!this._active){this._setActive("month");return}const e=ie.indexOf(this._active);e<ie.length-1&&this._setActive(ie[e+1])}_prevSegment(){if(!this._active)return;const e=ie.indexOf(this._active);e>0&&this._setActive(ie[e-1])}_canGoNext(){return this._active?ie.indexOf(this._active)<ie.length-1:!0}_canGoPrev(){return this._active?ie.indexOf(this._active)>0:!1}_handleDigit(e){this._active||this._setActive("month");const i=this._active,o=this._buf+String(e);if(i==="month")if(o.length===1)e>=2&&e<=9?(this._month=e,this._buf="",this._nextSegment()):this._buf=o;else{const r=parseInt(o);r>=1&&r<=12?(this._month=r,this._buf="",this._nextSegment()):(this._buf=String(e),e>=2&&e<=9&&(this._month=e,this._buf="",this._nextSegment()))}else if(i==="day"){const r=He(this._month??1,this._year??2e3);if(o.length===1)e>=4&&e<=9?(this._day=e,this._buf="",this._nextSegment()):this._buf=o;else{const s=parseInt(o);s>=1&&s<=r?(this._day=s,this._buf="",this._nextSegment()):(this._buf=String(e),e>=4&&e<=9&&(this._day=e,this._buf="",this._nextSegment()))}}else i==="year"&&(this._buf=o.slice(-4),this._buf.length===4&&(this._year=parseInt(this._buf),this._buf="",this._checkAndEmit()))}_adjust(e){const i=this._active;if(i){if(this._buf="",i==="month"){const o=this._month??(e>0?0:13);this._month=qe(o+e,1,12),this._day!==null&&(this._day=qe(this._day,1,He(this._month,this._year??2e3)))}else if(i==="day"){const o=He(this._month??1,this._year??2e3),r=this._day??(e>0?0:o+1);this._day=qe(r+e,1,o)}else if(i==="year"){const o=this._year??new Date().getFullYear();this._year=qe(o+e,1,9999)}this._checkAndEmit()}}_checkAndEmit(){const e=tt(this._month,this._day,this._year);e&&e!==this.value&&(this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0,composed:!0})))}_handleKeyDown(e){if(!(this.disabled||this.readonly)){if(e.key>="0"&&e.key<="9"){e.preventDefault(),e.stopPropagation(),this._active||this._setActive("month"),this._handleDigit(parseInt(e.key));return}switch(e.key){case"ArrowLeft":e.preventDefault(),e.stopPropagation(),this._prevSegment();break;case"ArrowRight":case"/":e.preventDefault(),e.stopPropagation(),this._nextSegment();break;case"ArrowUp":e.preventDefault(),e.stopPropagation(),this._active||this._setActive("month"),this._adjust(1);break;case"ArrowDown":e.preventDefault(),e.stopPropagation(),this._active||this._setActive("month"),this._adjust(-1);break;case"Tab":!e.shiftKey&&this._canGoNext()?(e.preventDefault(),e.stopPropagation(),this._nextSegment()):e.shiftKey&&this._canGoPrev()&&(e.preventDefault(),e.stopPropagation(),this._prevSegment());break;case"Backspace":case"Delete":e.preventDefault(),e.stopPropagation(),this._buf="",this._active==="month"?this._month=null:this._active==="day"?this._day=null:this._active==="year"&&(this._year=null);break;case"Escape":e.preventDefault(),e.stopPropagation(),this.clear();break}}}_handleFocus(){this._focused=!0,this._active||this._setActive("month")}_handleBlur(e){this.shadowRoot?.contains(e.relatedTarget)||(this._commitPartialBuffer(),this._focused=!1,this._active=null,this._buf="")}_handleContainerClick(e){if(this.disabled||this.readonly)return;e.target.classList.contains("segments")&&(this._setActive("month"),this.shadowRoot?.querySelector(".segments")?.focus())}_segmentText(e){const i=this._active===e&&!this.disabled;return e==="month"?i&&this._buf?{text:this._buf.padEnd(2,"_"),isPlaceholder:!1}:this._month!==null?{text:String(this._month).padStart(2,"0"),isPlaceholder:!1}:{text:"MM",isPlaceholder:!0}:e==="day"?i&&this._buf?{text:this._buf.padEnd(2,"_"),isPlaceholder:!1}:this._day!==null?{text:String(this._day).padStart(2,"0"),isPlaceholder:!1}:{text:"DD",isPlaceholder:!0}:i&&this._buf?{text:this._buf.padEnd(4,"_"),isPlaceholder:!1}:this._year!==null?{text:String(this._year).padStart(4,"0"),isPlaceholder:!1}:{text:"YYYY",isPlaceholder:!0}}_hasValue(){return this._month!==null||this._day!==null||this._year!==null}render(){const e=h.classMap({"field-label":!0,focused:this._focused}),i=h.classMap({"field-container":!0,focused:this._focused}),o=(r,s="")=>{const{text:c,isPlaceholder:p}=this._segmentText(r);return a.html`<span
        class=${h.classMap({segment:!0,[r]:!0,active:this._active===r,placeholder:p,[`segment-${r}`]:!0,[s]:!!s})}
        @click=${d=>{d.stopPropagation(),this._setActive(r),this.shadowRoot?.querySelector(".segments")?.focus()}}
      >${c}</span>`};return a.html`
      ${this.label?a.html`<label class=${e}>${this.label}</label>`:a.nothing}

      <div class=${i} @click=${this._handleContainerClick}>

        <div
          class="segments"
          role="group"
          aria-label=${this.label||"Date"}
          tabindex=${this.disabled?-1:0}
          @keydown=${this._handleKeyDown}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        >
          ${o("month")}
          <span class="separator">/</span>
          ${o("day")}
          <span class="separator">/</span>
          ${o("year","segment-year")}
        </div>

        <div class="field-actions">
          ${this._hasValue()&&!this.disabled&&!this.readonly?a.html`
            <button class="icon-btn" aria-label="Clear date" tabindex="-1"
              @click=${r=>{r.stopPropagation(),this.clear()}}>✕</button>
          `:a.nothing}
        </div>
      </div>

      ${this.helperText?a.html`<small class="helper">${this.helperText}</small>`:a.nothing}
    `}},t.UiDateField.formAssociated=!0,t.UiDateField.styles=a.css`
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
  `,S([n.property({type:String})],t.UiDateField.prototype,"value",2),S([n.property({type:String})],t.UiDateField.prototype,"label",2),S([n.property({type:String,reflect:!0})],t.UiDateField.prototype,"name",2),S([n.property({type:String})],t.UiDateField.prototype,"min",2),S([n.property({type:String})],t.UiDateField.prototype,"max",2),S([n.property({type:Boolean,reflect:!0})],t.UiDateField.prototype,"disabled",2),S([n.property({type:Boolean,reflect:!0})],t.UiDateField.prototype,"readonly",2),S([n.property({type:Boolean,reflect:!0})],t.UiDateField.prototype,"error",2),S([n.property({type:String,attribute:"helper-text"})],t.UiDateField.prototype,"helperText",2),S([n.state()],t.UiDateField.prototype,"_month",2),S([n.state()],t.UiDateField.prototype,"_day",2),S([n.state()],t.UiDateField.prototype,"_year",2),S([n.state()],t.UiDateField.prototype,"_active",2),S([n.state()],t.UiDateField.prototype,"_focused",2),S([n.state()],t.UiDateField.prototype,"_buf",2),t.UiDateField=S([n.customElement("ui-date-field")],t.UiDateField);var Or=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,u=(l,e,i,o)=>{for(var r=o>1?void 0:o?Br(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Or(e,i,r),r};function C(l){return String(l).padStart(2,"0")}function Ge(l){if(!l)return null;const e=l.split(":").map(Number);return e.length<2||e.some(isNaN)?null:{h:e[0],m:e[1],s:e[2]??0}}function re(l,e,i=0){return`${C(l)}:${C(e)}:${C(i)}`}function H(l){return{hour:l%12||12,ampm:l<12?"AM":"PM"}}function xe(l,e){return e==="AM"?l===12?0:l:l===12?12:l+12}function Ar(l,e,i=!1){const o=Ge(l);if(!o)return"";const r=e?H(o.h).hour:o.h,s=e?` ${H(o.h).ampm}`:"";return`${C(r)}:${C(o.m)}${i?":"+C(o.s):""}${s}`}function zr(l,e,i,o=140,r=140){const s=(l/e-.25)*Math.PI*2;return{x:o+i*Math.cos(s),y:r+i*Math.sin(s)}}function Mr(l,e,i=140,o=140){let r=Math.atan2(e-o,l-i)*180/Math.PI+90;return r<0&&(r+=360),r}t.UiTimeField=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.label="",this.ampm=!0,this.seconds=!1,this.disabled=!1,this.readonly=!1,this.error=!1,this.helperText="",this._h=null,this._m=null,this._s=null,this._mer="AM",this._active=null,this._focused=!1,this._buf=""}get _segs(){const e=["hour","minute"];return this.seconds&&e.push("second"),this.ampm&&e.push("meridiem"),e}willUpdate(e){if(e.has("value")&&this.value){const i=Ge(this.value);if(i){const{hour:o,ampm:r}=H(i.h);this._h=this.ampm?o:i.h,this._m=i.m,this._s=i.s,this._mer=r}}}clear(){this._h=null,this._m=null,this._s=null,this._buf="",this.dispatchEvent(new CustomEvent("clear",{bubbles:!0,composed:!0}))}_emit(){if(this._h===null||this._m===null)return;const e=this.ampm?xe(this._h,this._mer):this._h,i=re(e,this._m,this._s??0);i!==this.value&&(this.value=i,this.dispatchEvent(new CustomEvent("change",{detail:{value:i},bubbles:!0,composed:!0})))}_commitBuf(){if(!this._buf||!this._active)return;const e=parseInt(this._buf);if(isNaN(e))return;const i=this.ampm?12:23;this._active==="hour"&&e>=(this.ampm?1:0)&&e<=i?this._h=e:this._active==="minute"&&e>=0&&e<=59?this._m=e:this._active==="second"&&e>=0&&e<=59&&(this._s=e),this._emit()}_setActive(e){this._commitBuf(),this._active=e,this._buf=""}_next(){const e=this._segs,i=e.indexOf(this._active);i<e.length-1&&this._setActive(e[i+1])}_prev(){const e=this._segs,i=e.indexOf(this._active);i>0&&this._setActive(e[i-1])}_canNext(){const e=this._segs;return e.indexOf(this._active)<e.length-1}_canPrev(){return this._segs.indexOf(this._active)>0}_digit(e){if(this._active||this._setActive("hour"),this._active==="meridiem")return;const i=this._buf+e,o=this.ampm?12:23;if(this._active==="hour")if(i.length===1){const r=this.ampm?2:3;e>=r?(this._h=e,this._buf="",this._next()):this._buf=i}else{const r=parseInt(i);r>=(this.ampm?1:0)&&r<=o?(this._h=r,this._buf="",this._next()):(this._buf=String(e),e>=(this.ampm?2:3)&&(this._h=e,this._buf="",this._next()))}else if(this._active==="minute"||this._active==="second")if(i.length===1)e>=6?(this[this._active==="minute"?"_m":"_s"]=e,this._buf="",this._next()):this._buf=i;else{const r=parseInt(i);r>=0&&r<=59?(this[this._active==="minute"?"_m":"_s"]=r,this._buf="",this._next()):(this._buf=String(e),e>=6&&(this[this._active==="minute"?"_m":"_s"]=e,this._buf="",this._next()))}this._emit()}_adjust(e){this._buf="";const i=this.ampm?12:23,o=this.ampm?1:0;this._active==="hour"?this._h=Math.min(i,Math.max(o,(this._h??(e>0?o-1:i+1))+e)):this._active==="minute"?this._m=((this._m??(e>0?-1:60))+e+60)%60:this._active==="second"?this._s=((this._s??(e>0?-1:60))+e+60)%60:this._active==="meridiem"&&(this._mer=this._mer==="AM"?"PM":"AM"),this._emit()}_onKey(e){if(!(this.disabled||this.readonly)){if(e.key>="0"&&e.key<="9"){e.preventDefault(),e.stopPropagation(),this._active||this._setActive("hour"),this._digit(+e.key);return}if((e.key==="a"||e.key==="A")&&this.ampm&&!e.metaKey){e.preventDefault(),e.stopPropagation(),this._mer="AM",this._emit();return}if((e.key==="p"||e.key==="P")&&this.ampm&&!e.metaKey){e.preventDefault(),e.stopPropagation(),this._mer="PM",this._emit();return}switch(e.key){case"ArrowLeft":e.preventDefault(),e.stopPropagation(),this._prev();break;case"ArrowRight":case":":e.preventDefault(),e.stopPropagation(),this._next();break;case"ArrowUp":e.preventDefault(),e.stopPropagation(),this._active||this._setActive("hour"),this._adjust(1);break;case"ArrowDown":e.preventDefault(),e.stopPropagation(),this._active||this._setActive("hour"),this._adjust(-1);break;case"Tab":!e.shiftKey&&this._canNext()?(e.preventDefault(),e.stopPropagation(),this._next()):e.shiftKey&&this._canPrev()&&(e.preventDefault(),e.stopPropagation(),this._prev());break;case"Backspace":case"Delete":e.preventDefault(),e.stopPropagation(),this._buf="",this._active==="hour"?this._h=null:this._active==="minute"?this._m=null:this._active==="second"&&(this._s=null);break;case"Escape":e.preventDefault(),e.stopPropagation(),this.clear();break}}}_segText(e){const i=this._active===e;if(e==="meridiem")return{text:this._mer,ph:!1};if(i&&this._buf){const o=(e==="hour"&&this.ampm,2);return{text:this._buf.padEnd(o,"_"),ph:!1}}return e==="hour"?this._h!==null?{text:C(this._h),ph:!1}:{text:"HH",ph:!0}:e==="minute"?this._m!==null?{text:C(this._m),ph:!1}:{text:"MM",ph:!0}:this._s!==null?{text:C(this._s),ph:!1}:{text:"SS",ph:!0}}render(){const e=this._h!==null||this._m!==null;return a.html`
      ${this.label?a.html`<label class="label ${this._focused?"focused":""}">${this.label}</label>`:a.nothing}
      <div class="container ${this._focused?"focused":""}">
        <div class="segments" tabindex=${this.disabled?-1:0} role="group" aria-label=${this.label||"Time"}
          @keydown=${this._onKey}
          @focus=${()=>{this._focused=!0,this._active||this._setActive("hour")}}
          @blur=${i=>{this.shadowRoot?.contains(i.relatedTarget)||(this._focused=!1,this._active=null,this._buf="")}}
        >
          ${this._segs.map((i,o)=>{const{text:r,ph:s}=this._segText(i),c=o>0&&i!=="meridiem"?a.html`<span class="sep">:</span>`:i==="meridiem"?a.html`<span class="sep"> </span>`:a.nothing;return a.html`${c}<span
              class=${h.classMap({seg:!0,active:this._active===i,placeholder:s,meridiem:i==="meridiem"})}
              @click=${p=>{p.stopPropagation(),this._setActive(i),this.shadowRoot?.querySelector(".segments")?.focus()}}
            >${r}</span>`})}
        </div>
        ${e&&!this.disabled?a.html`<button class="icon-btn" tabindex="-1" aria-label="Clear" @click=${i=>{i.stopPropagation(),this.clear()}}>✕</button>`:a.nothing}
      </div>
      ${this.helperText?a.html`<small class="helper">${this.helperText}</small>`:a.nothing}
    `}},t.UiTimeField.styles=a.css`
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
  `,u([n.property({type:String})],t.UiTimeField.prototype,"value",2),u([n.property({type:String})],t.UiTimeField.prototype,"label",2),u([n.property({type:Boolean})],t.UiTimeField.prototype,"ampm",2),u([n.property({type:Boolean})],t.UiTimeField.prototype,"seconds",2),u([n.property({type:Boolean,reflect:!0})],t.UiTimeField.prototype,"disabled",2),u([n.property({type:Boolean,reflect:!0})],t.UiTimeField.prototype,"readonly",2),u([n.property({type:Boolean,reflect:!0})],t.UiTimeField.prototype,"error",2),u([n.property({type:String,attribute:"helper-text"})],t.UiTimeField.prototype,"helperText",2),u([n.state()],t.UiTimeField.prototype,"_h",2),u([n.state()],t.UiTimeField.prototype,"_m",2),u([n.state()],t.UiTimeField.prototype,"_s",2),u([n.state()],t.UiTimeField.prototype,"_mer",2),u([n.state()],t.UiTimeField.prototype,"_active",2),u([n.state()],t.UiTimeField.prototype,"_focused",2),u([n.state()],t.UiTimeField.prototype,"_buf",2),t.UiTimeField=u([n.customElement("ui-time-field")],t.UiTimeField),t.UiDigitalClock=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.step=30,this.ampm=!0}_items(){const e=[];for(let i=0;i<1440;i+=this.step){const o=Math.floor(i/60),r=i%60;e.push(re(o,r))}return e}_label(e){return Ar(e,this.ampm)}updated(){const e=this.shadowRoot?.querySelector(".selected");e&&typeof e.scrollIntoView=="function"&&e.scrollIntoView({block:"center"})}render(){const e=this._items();return a.html`
      <div class="clock" role="listbox" aria-label="Select time">
        ${ue.repeat(e,i=>i,i=>a.html`
          <button class=${h.classMap({item:!0,selected:i===this.value})}
            role="option" aria-selected=${i===this.value}
            @click=${()=>{this.dispatchEvent(new CustomEvent("change",{detail:{value:i},bubbles:!0,composed:!0}))}}
          >${this._label(i)}</button>
        `)}
      </div>
    `}},t.UiDigitalClock.styles=a.css`
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
  `,u([n.property({type:String})],t.UiDigitalClock.prototype,"value",2),u([n.property({type:Number})],t.UiDigitalClock.prototype,"step",2),u([n.property({type:Boolean})],t.UiDigitalClock.prototype,"ampm",2),t.UiDigitalClock=u([n.customElement("ui-digital-clock")],t.UiDigitalClock),t.UiMultiSectionDigitalClock=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.ampm=!0,this.seconds=!1}_t(){return Ge(this.value)??{h:0,m:0,s:0}}_set(e,i,o){const r=re(e,i,o);this.dispatchEvent(new CustomEvent("change",{detail:{value:r},bubbles:!0,composed:!0}))}_col(e){const i=this._t(),o=H(i.h);if(e==="mer")return a.html`
        <div class="col">
          <div class="col-header">AM/PM</div>
          ${["AM","PM"].map(p=>a.html`
            <button class=${h.classMap({item:!0,sel:o.ampm===p})}
              @click=${()=>this._set(xe(o.hour,p),i.m,i.s)}>${p}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `;const r=Array.from({length:12},(p,d)=>d+1),s=Array.from({length:24},(p,d)=>d),c=Array.from({length:60},(p,d)=>d);if(e==="h"){const p=this.ampm?r:s,d=this.ampm?o.hour:i.h;return a.html`
        <div class="col">
          <div class="col-header">Hr</div>
          ${p.map(f=>a.html`
            <button class=${h.classMap({item:!0,sel:d===f})}
              @click=${()=>{const b=this.ampm?xe(f,o.ampm):f;this._set(b,i.m,i.s)}}>${C(f)}</button>
          `)}
          <div class="col-spacer"></div>
        </div>
      `}return e==="m"?a.html`
      <div class="col">
        <div class="col-header">Min</div>
        ${c.map(p=>a.html`
          <button class=${h.classMap({item:!0,sel:i.m===p})}
            @click=${()=>this._set(i.h,p,i.s)}>${C(p)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    `:a.html`
      <div class="col">
        <div class="col-header">Sec</div>
        ${c.map(p=>a.html`
          <button class=${h.classMap({item:!0,sel:i.s===p})}
            @click=${()=>this._set(i.h,i.m,p)}>${C(p)}</button>
        `)}
        <div class="col-spacer"></div>
      </div>
    `}updated(){this.shadowRoot?.querySelectorAll(".col").forEach(e=>{const i=e.querySelector(".sel");i&&typeof i.scrollIntoView=="function"&&i.scrollIntoView({block:"center"})})}render(){return a.html`
      <div class="msdc">
        ${this._col("h")}
        ${this._col("m")}
        ${this.seconds?this._col("s"):a.nothing}
        ${this.ampm?this._col("mer"):a.nothing}
      </div>
    `}},t.UiMultiSectionDigitalClock.styles=a.css`
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
  `,u([n.property({type:String})],t.UiMultiSectionDigitalClock.prototype,"value",2),u([n.property({type:Boolean})],t.UiMultiSectionDigitalClock.prototype,"ampm",2),u([n.property({type:Boolean})],t.UiMultiSectionDigitalClock.prototype,"seconds",2),t.UiMultiSectionDigitalClock=u([n.customElement("ui-multi-section-digital-clock")],t.UiMultiSectionDigitalClock),t.UiTimeClock=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.ampm=!0,this.seconds=!1,this.view="hours"}get _t(){return Ge(this.value)??{h:0,m:0,s:0}}_emit(e,i,o){const r=re(e,i,o);this.dispatchEvent(new CustomEvent("change",{detail:{value:r},bubbles:!0,composed:!0}))}_switchView(e){this.view=e,this.dispatchEvent(new CustomEvent("view-change",{detail:{view:e},bubbles:!0,composed:!0}))}_handleClick(e){const o=this.shadowRoot.querySelector("svg").getBoundingClientRect(),r=280/o.width,s=280/o.height,c=(e.clientX-o.left)*r,p=(e.clientY-o.top)*s,d=140,f=140,b=Mr(c,p,d,f),m=this._t;if(this.view==="hours"){const E=Math.sqrt((c-d)**2+(p-f)**2),z=!this.ampm&&E<82;let B=Math.round(b/30)%12;z?B=B===0?0:B+12:(B=B||12,this.ampm&&(B=xe(B,H(m.h).ampm))),this._emit(B,m.m,m.s),this._switchView("minutes")}else if(this.view==="minutes"){const E=Math.round(b/6)%60;this._emit(m.h,E,m.s),this.seconds&&this._switchView("seconds")}else{const E=Math.round(b/6)%60;this._emit(m.h,m.m,E)}}_renderFace(){const o=this._t;let r=0,s=100;if(this.view==="hours"){let m;this.ampm?m=H(o.h).hour:m=o.h===0||o.h>12?o.h%12:o.h,r=m/12*360,s=this.ampm?100:o.h===0||o.h>12?64:100}else this.view==="minutes"?(r=o.m/60*360,s=100):(r=o.s/60*360,s=100);const c=m=>(m-90)*Math.PI/180,p=140+s*Math.cos(c(r)),d=140+s*Math.sin(c(r)),f=[];if(this.view==="hours")if(this.ampm)for(let m=1;m<=12;m++)f.push({val:m,label:String(m),r:100});else{for(let m=1;m<=12;m++)f.push({val:m,label:String(m),r:100});for(let m=13;m<=24;m++)f.push({val:m%24,label:m===24?"00":String(m),r:64,inner:!0})}else for(let m=0;m<12;m++){const E=m*5;f.push({val:E,label:C(E),r:100})}const b=12;return a.html`
      <svg width="280" height="280" viewBox="0 0 280 280" @click=${this._handleClick}>
        <circle cx=${140} cy=${140} r="125" class="face"/>
        ${this.view==="hours"&&!this.ampm?a.html`<circle cx=${140} cy=${140} r="82" class="face-inner"></circle>`:a.nothing}
        <!-- hand -->
        <line x1=${140} y1=${140} x2=${p} y2=${d} class="hand"/>
        <circle cx=${p} cy=${d} r="18" class="hand-tip"/>
        <circle cx=${140} cy=${140} r="4" class="hand-center"/>
        <!-- numbers -->
        ${f.map(m=>{const E=m.inner?m.val%12:m.val,z=zr(E,b,m.r,140,140),B=this.view==="hours"?this.ampm?H(o.h).hour===m.val:o.h===m.val:this.view==="minutes"?o.m===m.val:o.s===m.val;return a.html`
          <circle cx=${z.x} cy=${z.y} r="17" class=${h.classMap({"num-bg":!0,selected:B})}></circle>
          <text x=${z.x} y=${z.y} class=${h.classMap({num:!0,selected:B,"inner-label":!!m.inner})}>${m.label}</text>
        `})}
      </svg>
    `}render(){const e=this._t,{hour:i,ampm:o}=H(e.h),r=this.ampm?C(i):C(e.h);return a.html`
      <div class="clock-wrap">
        <div class="clock-header">
          <span class=${h.classMap({"clock-seg":!0,active:this.view==="hours"})} @click=${()=>this._switchView("hours")}>${r}</span>
          <span class="clock-sep">:</span>
          <span class=${h.classMap({"clock-seg":!0,active:this.view==="minutes"})} @click=${()=>this._switchView("minutes")}>${C(e.m)}</span>
          ${this.seconds?a.html`<span class="clock-sep">:</span><span class=${h.classMap({"clock-seg":!0,active:this.view==="seconds"})} @click=${()=>this._switchView("seconds")}>${C(e.s)}</span>`:a.nothing}
          ${this.ampm?a.html`<span class="clock-sep" style="font-size:1rem;align-self:flex-end;margin-bottom:6px;">${o}</span>`:a.nothing}
        </div>
        ${this.ampm?a.html`
          <div class="am-pm">
            <button class=${h.classMap({"am-pm-btn":!0,sel:o==="AM"})} @click=${()=>{const s=this._t;this._emit(xe(H(s.h).hour,"AM"),s.m,s.s)}}>AM</button>
            <button class=${h.classMap({"am-pm-btn":!0,sel:o==="PM"})} @click=${()=>{const s=this._t;this._emit(xe(H(s.h).hour,"PM"),s.m,s.s)}}>PM</button>
          </div>
        `:a.nothing}
        ${this._renderFace()}
      </div>
    `}},t.UiTimeClock.styles=a.css`
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
  `,u([n.property({type:String})],t.UiTimeClock.prototype,"value",2),u([n.property({type:Boolean})],t.UiTimeClock.prototype,"ampm",2),u([n.property({type:Boolean})],t.UiTimeClock.prototype,"seconds",2),u([n.property({type:String})],t.UiTimeClock.prototype,"view",2),t.UiTimeClock=u([n.customElement("ui-time-clock")],t.UiTimeClock);const it=a.css`
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
`;t.UiDesktopTimePicker=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.label="Time",this.ampm=!0,this.seconds=!1,this.disabled=!1,this.readonly=!1,this.error=!1,this.helperText="",this._open=!1}_commit(e){this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0,composed:!0})),this._open=!1}render(){return a.html`
      <div class="popover-anchor">
        <ui-time-field .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds}
          ?disabled=${this.disabled} ?readonly=${this.readonly} ?error=${this.error} helper-text=${this.helperText}
          @change=${e=>this._commit(e.detail.value)}
          @focus=${()=>{!this.disabled&&!this.readonly&&(this._open=!0)}}
        ></ui-time-field>
        <div class="click-away ${this._open?"open":""}" @click=${()=>this._open=!1}></div>
        <div class="popover ${this._open?"open":""}" role="dialog" aria-label="Time picker">
          <ui-multi-section-digital-clock .value=${this.value||re(12,0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
            @change=${e=>{this.value=e.detail.value}}
          ></ui-multi-section-digital-clock>
          <div class="actions">
            <button class="btn btn-cancel" @click=${()=>this._open=!1}>Cancel</button>
            <button class="btn btn-ok" @click=${()=>this._commit(this.value||re(12,0))}>OK</button>
          </div>
        </div>
      </div>
    `}},t.UiDesktopTimePicker.styles=[it],u([n.property({type:String})],t.UiDesktopTimePicker.prototype,"value",2),u([n.property({type:String})],t.UiDesktopTimePicker.prototype,"label",2),u([n.property({type:Boolean})],t.UiDesktopTimePicker.prototype,"ampm",2),u([n.property({type:Boolean})],t.UiDesktopTimePicker.prototype,"seconds",2),u([n.property({type:Boolean,reflect:!0})],t.UiDesktopTimePicker.prototype,"disabled",2),u([n.property({type:Boolean,reflect:!0})],t.UiDesktopTimePicker.prototype,"readonly",2),u([n.property({type:Boolean,reflect:!0})],t.UiDesktopTimePicker.prototype,"error",2),u([n.property({type:String,attribute:"helper-text"})],t.UiDesktopTimePicker.prototype,"helperText",2),u([n.state()],t.UiDesktopTimePicker.prototype,"_open",2),t.UiDesktopTimePicker=u([n.customElement("ui-desktop-time-picker")],t.UiDesktopTimePicker),t.UiMobileTimePicker=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.label="Time",this.ampm=!0,this.seconds=!1,this.disabled=!1,this.error=!1,this.helperText="",this._open=!1,this._pending="",this._view="hours"}render(){return a.html`
      <ui-time-field .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds}
        ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} readonly
        @focus=${()=>{this.disabled||(this._pending=this.value,this._view="hours",this._open=!0)}}
        @change=${e=>{this.value=e.detail.value,this.dispatchEvent(new CustomEvent("change",{detail:e.detail,bubbles:!0,composed:!0}))}}
      ></ui-time-field>
      <ui-dialog .open=${this._open} disable-backdrop-close @close=${()=>this._open=!1} style="--ui-dialog-width:320px">
        <ui-dialog-title>Select Time</ui-dialog-title>
        <ui-dialog-content style="padding:12px;display:flex;justify-content:center;">
          <ui-time-clock .value=${this._pending||this.value||re(12,0)} ?ampm=${this.ampm} ?seconds=${this.seconds} .view=${this._view}
            @change=${e=>{this._pending=e.detail.value}}
            @view-change=${e=>{this._view=e.detail.view}}
          ></ui-time-clock>
        </ui-dialog-content>
        <ui-dialog-actions>
          <button class="btn btn-cancel" @click=${()=>{this._pending=this.value,this._open=!1}}>Cancel</button>
          <button class="btn btn-ok" @click=${()=>{const e=this._pending||this.value;this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0,composed:!0})),this._open=!1}}>OK</button>
        </ui-dialog-actions>
      </ui-dialog>
    `}},t.UiMobileTimePicker.styles=[it],u([n.property({type:String})],t.UiMobileTimePicker.prototype,"value",2),u([n.property({type:String})],t.UiMobileTimePicker.prototype,"label",2),u([n.property({type:Boolean})],t.UiMobileTimePicker.prototype,"ampm",2),u([n.property({type:Boolean})],t.UiMobileTimePicker.prototype,"seconds",2),u([n.property({type:Boolean,reflect:!0})],t.UiMobileTimePicker.prototype,"disabled",2),u([n.property({type:Boolean,reflect:!0})],t.UiMobileTimePicker.prototype,"error",2),u([n.property({type:String,attribute:"helper-text"})],t.UiMobileTimePicker.prototype,"helperText",2),u([n.state()],t.UiMobileTimePicker.prototype,"_open",2),u([n.state()],t.UiMobileTimePicker.prototype,"_pending",2),u([n.state()],t.UiMobileTimePicker.prototype,"_view",2),t.UiMobileTimePicker=u([n.customElement("ui-mobile-time-picker")],t.UiMobileTimePicker),t.UiStaticTimePicker=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.ampm=!0,this.seconds=!1}render(){return a.html`
      <div class="surface">
        <ui-multi-section-digital-clock .value=${this.value||re(12,0)} ?ampm=${this.ampm} ?seconds=${this.seconds}
          @change=${e=>{this.value=e.detail.value,this.dispatchEvent(new CustomEvent("change",{detail:e.detail,bubbles:!0,composed:!0}))}}
        ></ui-multi-section-digital-clock>
      </div>
    `}},t.UiStaticTimePicker.styles=a.css`
    :host { display:inline-block; font-family:var(--ui-font-family,'Inter',sans-serif); }
    .surface {
      border-radius:var(--ui-border-radius-xl,12px);
      box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px var(--ui-border-color,#e5e7eb);
      overflow:hidden; display:inline-block;
    }
  `,u([n.property({type:String})],t.UiStaticTimePicker.prototype,"value",2),u([n.property({type:Boolean})],t.UiStaticTimePicker.prototype,"ampm",2),u([n.property({type:Boolean})],t.UiStaticTimePicker.prototype,"seconds",2),t.UiStaticTimePicker=u([n.customElement("ui-static-time-picker")],t.UiStaticTimePicker),t.UiTimePicker=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.label="Time",this.variant="desktop",this.ampm=!0,this.seconds=!1,this.disabled=!1,this.error=!1,this.helperText=""}get _v(){return this.variant==="auto"?window.matchMedia("(pointer:coarse)").matches?"mobile":"desktop":this.variant}_onChange(e){this.value=e.detail.value,this.dispatchEvent(new CustomEvent("change",{detail:e.detail,bubbles:!0,composed:!0}))}render(){const e=this._v;return e==="static"?a.html`<ui-static-time-picker .value=${this.value} ?ampm=${this.ampm} ?seconds=${this.seconds} @change=${this._onChange}></ui-static-time-picker>`:e==="mobile"?a.html`<ui-mobile-time-picker .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-mobile-time-picker>`:a.html`<ui-desktop-time-picker .value=${this.value} .label=${this.label} ?ampm=${this.ampm} ?seconds=${this.seconds} ?disabled=${this.disabled} ?error=${this.error} helper-text=${this.helperText} @change=${this._onChange}></ui-desktop-time-picker>`}},t.UiTimePicker.styles=a.css`:host { display:inline-block; }`,u([n.property({type:String})],t.UiTimePicker.prototype,"value",2),u([n.property({type:String})],t.UiTimePicker.prototype,"label",2),u([n.property({type:String})],t.UiTimePicker.prototype,"variant",2),u([n.property({type:Boolean})],t.UiTimePicker.prototype,"ampm",2),u([n.property({type:Boolean})],t.UiTimePicker.prototype,"seconds",2),u([n.property({type:Boolean,reflect:!0})],t.UiTimePicker.prototype,"disabled",2),u([n.property({type:Boolean,reflect:!0})],t.UiTimePicker.prototype,"error",2),u([n.property({type:String,attribute:"helper-text"})],t.UiTimePicker.prototype,"helperText",2),t.UiTimePicker=u([n.customElement("ui-time-picker")],t.UiTimePicker);var Rr=Object.defineProperty,Fr=Object.getOwnPropertyDescriptor,F=(l,e,i,o)=>{for(var r=o>1?void 0:o?Fr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Rr(e,i,r),r};t.UiTreeItem=class extends a.LitElement{constructor(){super(...arguments),this.itemId="",this.label="",this.disabled=!1,this.expanded=!1,this.hasChildren=!1,this._isDraggable=!1,this._handleOnly=!1,this.dropPosition=null,this.showDragHandle=!1,this._hasSlottedChildren=!1}setDraggable(e,i=!1){this._isDraggable=e,this._handleOnly=i}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1")}updated(e){super.updated(e),this._hasSlottedChildren||this.hasChildren?this.setAttribute("aria-expanded",String(this.expanded)):this.removeAttribute("aria-expanded"),this.setAttribute("aria-disabled",String(this.disabled))}_onSlotChange(e){const r=e.target.assignedElements({flatten:!0}).some(s=>s.tagName==="UI-TREE-ITEM");r!==this._hasSlottedChildren&&(this._hasSlottedChildren=r)}_toggleExpand(e){e.stopPropagation(),!this.disabled&&this.dispatchEvent(new CustomEvent("ui-tree-item-toggle",{detail:{itemId:this.itemId,expanded:!this.expanded},bubbles:!0,composed:!0}))}_handleRowClick(){this.disabled||this.dispatchEvent(new CustomEvent("ui-tree-item-click",{detail:{itemId:this.itemId},bubbles:!0,composed:!0}))}get _level(){let e=0,i=this.parentElement;for(;i;){if(i.tagName==="UI-TREE-ITEM")e++;else if(i.tagName==="UI-SIMPLE-TREE-VIEW")break;i=i.parentElement}return e}render(){const e=this._level*24+8,i=this._hasSlottedChildren||this.hasChildren;return a.html`
      <div
        class=${h.classMap({"item-row":!0,"is-draggable":this._isDraggable&&!this._handleOnly})}
        style="padding-left: ${e}px"
        draggable=${this._isDraggable&&!this._handleOnly?"true":"false"}
        @click=${this._handleRowClick}
      >
        ${this.showDragHandle?a.html`
          <div
            class="drag-handle"
            data-drag-handle="true"
            draggable=${this._handleOnly?"true":"false"}
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
        `:a.nothing}

        ${i?a.html`
              <button
                class=${h.classMap({"expand-btn":!0,expanded:this.expanded})}
                tabindex="-1"
                aria-hidden="true"
                @click=${this._toggleExpand}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M3 1.5L7 5 3 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            `:a.html`<span class="expand-placeholder"></span>`}

        <span class="item-label">${this.label}</span>
        ${this.label?a.nothing:a.html`<slot name="label"></slot>`}
      </div>

      <div class="children-container" ?hidden=${!this.expanded} role="group">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `}},t.UiTreeItem.styles=a.css`
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
  `,F([n.property({type:String,attribute:"item-id",reflect:!0})],t.UiTreeItem.prototype,"itemId",2),F([n.property({type:String})],t.UiTreeItem.prototype,"label",2),F([n.property({type:Boolean,reflect:!0})],t.UiTreeItem.prototype,"disabled",2),F([n.property({type:Boolean,reflect:!0})],t.UiTreeItem.prototype,"expanded",2),F([n.property({type:Boolean,attribute:"has-children",reflect:!0})],t.UiTreeItem.prototype,"hasChildren",2),F([n.state()],t.UiTreeItem.prototype,"_isDraggable",2),F([n.state()],t.UiTreeItem.prototype,"_handleOnly",2),F([n.property({type:String,attribute:"drop-position",reflect:!0})],t.UiTreeItem.prototype,"dropPosition",2),F([n.property({type:Boolean,attribute:"show-drag-handle"})],t.UiTreeItem.prototype,"showDragHandle",2),F([n.state()],t.UiTreeItem.prototype,"_hasSlottedChildren",2),t.UiTreeItem=F([n.customElement("ui-tree-item")],t.UiTreeItem);var Vr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,de=(l,e,i,o)=>{for(var r=o>1?void 0:o?Nr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Vr(e,i,r),r};t.UiSimpleTreeView=class extends a.LitElement{constructor(){super(...arguments),this.disabledItemsFocusable=!1,this.defaultExpandedItems=[],this.expansionTrigger="content",this._internalExpandedItems=new Set,this._expansionInitialized=!1,this._handleKeydown=e=>{const i=e.target;if(i.tagName!=="UI-TREE-ITEM")return;const o=i,r=this._getFocusableItems(),s=r.indexOf(o);switch(e.key){case"ArrowDown":{e.preventDefault();const c=r[s+1];c&&this._focusItem(c);break}case"ArrowUp":{e.preventDefault();const c=r[s-1];c&&this._focusItem(c);break}case"ArrowRight":{if(e.preventDefault(),o.disabled)break;if(!o.expanded&&this._itemHasChildren(o))this._handleToggle(o,!0);else if(o.expanded){const c=this._getFocusableItems(),p=c.indexOf(o),d=c[p+1];d&&this._focusItem(d)}break}case"ArrowLeft":{if(e.preventDefault(),o.disabled)break;if(o.expanded)this._handleToggle(o,!1);else{const c=o.parentElement;c&&c.tagName==="UI-TREE-ITEM"&&this._focusItem(c)}break}case"Home":{e.preventDefault();const c=r[0];c&&this._focusItem(c);break}case"End":{e.preventDefault();const c=r[r.length-1];c&&this._focusItem(c);break}case"Enter":case" ":{if(e.preventDefault(),o.disabled)break;this._itemHasChildren(o)&&this._handleToggle(o,!o.expanded),this.onItemClick?.(o.itemId),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:o.itemId},bubbles:!1}));break}default:if(e.key.length===1){const c=e.key.toLowerCase(),p=s<0?0:s+1,f=[...r.slice(p),...r.slice(0,p)].find(b=>b.label.toLowerCase().startsWith(c));f&&this._focusItem(f)}}}}get _isControlled(){return this.expandedItems!==void 0}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeydown),this.addEventListener("ui-tree-item-click",this._handleItemClick),this.addEventListener("ui-tree-item-toggle",this._handleUiToggle),this.addEventListener("focusin",this._handleFocusIn)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeydown),this.removeEventListener("ui-tree-item-click",this._handleItemClick),this.removeEventListener("ui-tree-item-toggle",this._handleUiToggle),this.removeEventListener("focusin",this._handleFocusIn)}updated(e){super.updated(e),e.has("disabledItemsFocusable")&&this._initRovingTabindex(),e.has("expandedItems")&&this._syncExpansion()}_getAllItems(){return Array.from(this.querySelectorAll("ui-tree-item"))}_getVisibleItems(){return this._getAllItems().filter(e=>this._isVisible(e))}_isVisible(e){let i=e.parentElement;for(;i&&i!==this;){if(i.tagName==="UI-TREE-ITEM"&&!i.expanded)return!1;i=i.parentElement}return!0}_getFocusableItems(){const e=this._getVisibleItems();return this.disabledItemsFocusable?e:e.filter(i=>!i.disabled)}_itemHasChildren(e){return Array.from(e.children).some(i=>i.tagName==="UI-TREE-ITEM")}_initExpansion(){this._expansionInitialized||(this._expansionInitialized=!0,!this._isControlled&&this.defaultExpandedItems.length>0&&(this._internalExpandedItems=new Set(this.defaultExpandedItems)))}_syncExpansion(){const e=this._isControlled?new Set(this.expandedItems):this._internalExpandedItems;this._getAllItems().forEach(i=>{const o=e.has(i.itemId);i.expanded!==o&&(i.expanded=o)})}_handleToggle(e,i){if(this._isControlled){const o=new Set(this.expandedItems);i?o.add(e.itemId):o.delete(e.itemId);const r=Array.from(o);this.onExpandedItemsChange?.(r),this.dispatchEvent(new CustomEvent("expanded-items-change",{detail:{expandedItems:r},bubbles:!1})),this._syncExpansion()}else i?this._internalExpandedItems.add(e.itemId):this._internalExpandedItems.delete(e.itemId),this._syncExpansion()}_initRovingTabindex(){const e=this._getAllItems();if(e.length===0)return;if(!e.some(o=>o.getAttribute("tabindex")==="0")){const o=this.disabledItemsFocusable?e[0]:e.find(r=>!r.disabled);o&&o.setAttribute("tabindex","0")}}_focusItem(e){this._getAllItems().forEach(i=>i.setAttribute("tabindex","-1")),e.setAttribute("tabindex","0"),e.focus()}_handleFocusIn(e){const i=e.target;i.tagName==="UI-TREE-ITEM"&&(this._getAllItems().forEach(o=>o.setAttribute("tabindex","-1")),i.setAttribute("tabindex","0"))}_handleUiToggle(e){const{itemId:i,expanded:o}=e.detail,r=this.getItemDOMElement(i);r&&this._handleToggle(r,o)}_handleItemClick(e){const{itemId:i}=e.detail;if(this.expansionTrigger==="content"){const o=this.getItemDOMElement(i);o&&this._itemHasChildren(o)&&this._handleToggle(o,!o.expanded)}this.onItemClick?.(i),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:i},bubbles:!1}))}getItemDOMElement(e){return this._getAllItems().find(o=>o.itemId===e)??null}_onSlotChange(){this._initRovingTabindex(),this._initExpansion(),this._syncExpansion()}render(){return a.html`
      <div class="tree-root" role="tree">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `}},t.UiSimpleTreeView.styles=a.css`
    :host {
      display: block;
      font-family: var(--ui-font-family, system-ui, sans-serif);
    }

    .tree-root {
      padding: 4px 0;
    }
  `,de([n.property({type:Boolean,attribute:"disabled-items-focusable"})],t.UiSimpleTreeView.prototype,"disabledItemsFocusable",2),de([n.property({attribute:!1})],t.UiSimpleTreeView.prototype,"onItemClick",2),de([n.property({attribute:!1})],t.UiSimpleTreeView.prototype,"expandedItems",2),de([n.property({attribute:!1})],t.UiSimpleTreeView.prototype,"defaultExpandedItems",2),de([n.property({attribute:!1})],t.UiSimpleTreeView.prototype,"onExpandedItemsChange",2),de([n.property({type:String,attribute:"expansion-trigger"})],t.UiSimpleTreeView.prototype,"expansionTrigger",2),t.UiSimpleTreeView=de([n.customElement("ui-simple-tree-view")],t.UiSimpleTreeView);var qr=Object.defineProperty,Hr=Object.getOwnPropertyDescriptor,k=(l,e,i,o)=>{for(var r=o>1?void 0:o?Hr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&qr(e,i,r),r};t.UiRichTreeView=class extends a.LitElement{constructor(){super(...arguments),this.items=[],this.getItemId=e=>e.id,this.getItemLabel=e=>e.label,this.getItemChildren=e=>e.children,this.isItemDisabled=()=>!1,this.disabledItemsFocusable=!1,this.expansionTrigger="content",this.defaultExpandedItems=[],this.itemsReordering=!1,this.itemsReorderingHandle=!1,this._internalExpandedItems=new Set,this._expansionInitialized=!1,this._disabledOverrides=new Map,this._lazyChildren=new Map,this._loading=new Set,this._orderedItems=null,this._draggedItemId=null,this._dropTargetId=null,this._dropPosition=null,this._handleFocusIn=e=>{const i=e.target;i.tagName==="UI-TREE-ITEM"&&(this._getAllItems().forEach(o=>o.setAttribute("tabindex","-1")),i.setAttribute("tabindex","0"))},this._handleUiToggle=e=>{const{itemId:i,expanded:o}=e.detail,r=this.getItemDOMElement(i);r&&this._handleToggle(r,o)},this._handleItemClick=e=>{const{itemId:i}=e.detail;if(this.expansionTrigger==="content"){const o=this.getItemDOMElement(i);o&&this._itemHasChildren(o)&&this._handleToggle(o,!o.expanded)}this.onItemClick?.(i),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:i},bubbles:!1}))},this._handleKeydown=e=>{const i=e.target;if(i.tagName!=="UI-TREE-ITEM")return;const o=i,r=this._getFocusableItems(),s=r.indexOf(o);switch(e.key){case"ArrowDown":{e.preventDefault();const c=r[s+1];c&&this._focusItem(c);break}case"ArrowUp":{e.preventDefault();const c=r[s-1];c&&this._focusItem(c);break}case"ArrowRight":{if(e.preventDefault(),o.disabled)break;if(!o.expanded&&this._itemHasChildren(o))this._handleToggle(o,!0);else if(o.expanded){const c=this._getFocusableItems(),p=c.indexOf(o),d=c[p+1];d&&this._focusItem(d)}break}case"ArrowLeft":{if(e.preventDefault(),o.disabled)break;if(o.expanded)this._handleToggle(o,!1);else{const c=o.parentElement;c&&c.tagName==="UI-TREE-ITEM"&&this._focusItem(c)}break}case"Home":{e.preventDefault();const c=r[0];c&&this._focusItem(c);break}case"End":{e.preventDefault();const c=r[r.length-1];c&&this._focusItem(c);break}case"Enter":case" ":{if(e.preventDefault(),o.disabled)break;this._itemHasChildren(o)&&this._handleToggle(o,!o.expanded),this.onItemClick?.(o.itemId),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:o.itemId},bubbles:!1}));break}default:if(e.key.length===1){const c=e.key.toLowerCase(),p=s<0?0:s+1,f=[...r.slice(p),...r.slice(0,p)].find(b=>b.label.toLowerCase().startsWith(c));f&&this._focusItem(f)}}},this._handleDragStart=e=>{if(!this.itemsReordering)return;const i=this._getTreeItemFromEvent(e);if(i){if(this.itemsReorderingHandle&&!e.composedPath().some(s=>s instanceof HTMLElement&&s.hasAttribute("data-drag-handle"))){e.preventDefault();return}if(this.isItemReorderable&&!this.isItemReorderable(i.itemId)){e.preventDefault();return}this._draggedItemId=i.itemId,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",i.itemId)),this._orderedItems||(this._orderedItems=this._cloneItemsTree(this.items)),i.setAttribute("dragging","")}},this._handleDragOver=e=>{if(!this.itemsReordering||!this._draggedItemId)return;const i=this._getTreeItemFromEvent(e);if(!i)return;e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move");const o=i.itemId;if(o===this._draggedItemId){this._clearDropTarget();return}if(this._isAncestorOf(this._draggedItemId,o,this._getEffectiveItems())){this._clearDropTarget();return}const r=i.getBoundingClientRect(),s=e.clientY-r.top,c=r.height;let p="inside";if(s<c*.25?p="before":s>c*.75&&(p="after"),this.canMoveItemToNewPosition&&!this.canMoveItemToNewPosition({itemId:this._draggedItemId,targetId:o,position:p})){this._clearDropTarget();return}(this._dropTargetId!==o||this._dropPosition!==p)&&(this._dropTargetId=o,this._dropPosition=p,this._updateItemDropStates())},this._handleDragEnd=e=>{const i=this._getTreeItemFromEvent(e);i&&i.removeAttribute("dragging"),this._draggedItemId=null,this._clearDropTarget()},this._handleDrop=e=>{if(!this.itemsReordering||!this._draggedItemId||!this._dropTargetId||!this._dropPosition)return;e.preventDefault();const i=this._draggedItemId,o=this._dropTargetId,r=this._dropPosition;this._moveItem(i,o,r),this._draggedItemId=null,this._clearDropTarget()}}get _isControlled(){return this.expandedItems!==void 0}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("keydown",this._handleKeydown),this.shadowRoot.addEventListener("ui-tree-item-click",this._handleItemClick),this.shadowRoot.addEventListener("ui-tree-item-toggle",this._handleUiToggle),this.shadowRoot.addEventListener("focusin",this._handleFocusIn),this.shadowRoot.addEventListener("dragstart",this._handleDragStart),this.shadowRoot.addEventListener("dragover",this._handleDragOver),this.shadowRoot.addEventListener("dragend",this._handleDragEnd),this.shadowRoot.addEventListener("drop",this._handleDrop)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.removeEventListener("keydown",this._handleKeydown),this.shadowRoot.removeEventListener("ui-tree-item-click",this._handleItemClick),this.shadowRoot.removeEventListener("ui-tree-item-toggle",this._handleUiToggle),this.shadowRoot.removeEventListener("focusin",this._handleFocusIn),this.shadowRoot.removeEventListener("dragstart",this._handleDragStart),this.shadowRoot.removeEventListener("dragover",this._handleDragOver),this.shadowRoot.removeEventListener("dragend",this._handleDragEnd),this.shadowRoot.removeEventListener("drop",this._handleDrop)}updated(e){super.updated(e),e.has("dataSource")&&(this._lazyChildren.clear(),this._loading.clear()),e.has("disabledItemsFocusable")&&this._initRovingTabindex(),e.has("expandedItems")&&this._syncExpansion(),e.has("items")&&(this._expansionInitialized?(this._syncExpansion(),this._initRovingTabindex()):this._initExpansion()),this.dataSource&&this.items.length===0&&!this._lazyChildren.has(null)&&!this._loading.has(null)&&this._loadChildren(null),this.itemsReordering&&this._getAllItems().forEach(i=>{const o=this.isItemReorderable?this.isItemReorderable(i.itemId):!0;i.setDraggable(o,this.itemsReorderingHandle)})}async _loadChildren(e){if(!(!this.dataSource||this._loading.has(e)||this._lazyChildren.has(e))){this._loading.add(e),this.requestUpdate();try{const i=await this.dataSource.getTreeItems(e);this._lazyChildren.set(e,i)}catch(i){console.error("[ui-rich-tree-view] Failed to load children for",e,i)}finally{this._loading.delete(e),this.requestUpdate(),await this.updateComplete,this._syncExpansion(),this._initRovingTabindex()}}}_getEffectiveDisabled(e){const i=this.getItemId(e);return this._disabledOverrides.has(i)?this._disabledOverrides.get(i):this.isItemDisabled(e)}_findItemById(e,i){for(const o of i){if(this.getItemId(o)===e)return o;const r=this.getItemChildren(o)??[],s=this._findItemById(e,r);if(s)return s}return null}_getEffectiveItems(){return this.itemsReordering&&this._orderedItems?this._orderedItems:this.items}_cloneItemsTree(e){return e.map(i=>{const o={...i},r=this.getItemChildren(i);if(r){const s=Object.keys(i).find(c=>i[c]===r)||"children";o[s]=this._cloneItemsTree(r)}return o})}_findItemAndParentInTree(e,i,o=null){for(let r=0;r<i.length;r++){const s=i[r];if(this.getItemId(s)===e)return{item:s,parentList:i,index:r,parentId:o};const c=this.getItemChildren(s)??[],p=this._findItemAndParentInTree(e,c,this.getItemId(s));if(p)return p}return null}_isAncestorOf(e,i,o){for(const r of o){if(this.getItemId(r)===e)return!!this._findItemById(i,this.getItemChildren(r)??[]);if(this._isAncestorOf(e,i,this.getItemChildren(r)??[]))return!0}return!1}_getAllItems(){return Array.from(this.shadowRoot.querySelectorAll("ui-tree-item"))}_getVisibleItems(){return this._getAllItems().filter(e=>this._isVisible(e))}_isVisible(e){let i=e.parentElement;for(;i!==null;){if(i.tagName==="UI-TREE-ITEM"&&!i.expanded)return!1;i=i.parentElement}return!0}_getFocusableItems(){const e=this._getVisibleItems();return this.disabledItemsFocusable?e:e.filter(i=>!i.disabled)}_itemHasChildren(e){return e.hasChildren?!0:Array.from(e.children).some(i=>i.tagName==="UI-TREE-ITEM")}_initExpansion(){this._expansionInitialized||(this._expansionInitialized=!0,!this._isControlled&&this.defaultExpandedItems.length>0&&(this._internalExpandedItems=new Set(this.defaultExpandedItems)),this._syncExpansion(),this._initRovingTabindex())}_syncExpansion(){const e=this._isControlled?new Set(this.expandedItems):this._internalExpandedItems;this._getAllItems().forEach(i=>{const o=e.has(i.itemId);i.expanded!==o&&(i.expanded=o)})}_handleToggle(e,i){if(i&&this.dataSource&&!this._lazyChildren.has(e.itemId)&&!this._loading.has(e.itemId)&&this._loadChildren(e.itemId),this._isControlled){const o=new Set(this.expandedItems);i?o.add(e.itemId):o.delete(e.itemId);const r=Array.from(o);this.onExpandedItemsChange?.(r),this.dispatchEvent(new CustomEvent("expanded-items-change",{detail:{expandedItems:r},bubbles:!1})),this._syncExpansion()}else i?this._internalExpandedItems.add(e.itemId):this._internalExpandedItems.delete(e.itemId),this._syncExpansion()}_initRovingTabindex(){const e=this._getAllItems();if(e.length===0)return;if(!e.some(o=>o.getAttribute("tabindex")==="0")){const o=this.disabledItemsFocusable?e[0]:e.find(r=>!r.disabled);o&&o.setAttribute("tabindex","0")}}_focusItem(e){this._getAllItems().forEach(i=>i.setAttribute("tabindex","-1")),e.setAttribute("tabindex","0"),e.focus()}getItem(e){return this._findItemById(e,this._getEffectiveItems())}getItemDOMElement(e){return this._getAllItems().find(i=>i.itemId===e)??null}getItemTree(){return this._getEffectiveItems()}getItemOrderedChildrenIds(e){const i=this._getEffectiveItems();if(e===null)return i.map(s=>this.getItemId(s));const o=this._findItemById(e,i);return o?(this.getItemChildren(o)??[]).map(s=>this.getItemId(s)):[]}setIsItemDisabled(e,i){this._disabledOverrides.set(e,i),this.requestUpdate()}_renderItem(e,i=0){const o=this.getItemId(e),r=this.getItemLabel(e),s=this._getEffectiveDisabled(e);let c=[],p=!1,d=!1;this.dataSource?this._lazyChildren.has(o)?(c=this._lazyChildren.get(o),d=c.length>0):(p=this._loading.has(o),d=this.dataSource.getChildrenCount(e)!==0):(c=this.getItemChildren(e)??[],d=c.length>0);const f=(i+1)*24+8;return a.html`
      <ui-tree-item
        item-id=${o}
        label=${r}
        ?disabled=${s}
        ?has-children=${d}
        ?show-drag-handle=${this.itemsReordering&&this.itemsReorderingHandle}
      >
        ${p?a.html`
          <div class="lazy-indicator" style="padding-left:${f}px">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        `:a.nothing}
        ${c.map(b=>this._renderItem(b,i+1))}
      </ui-tree-item>
    `}render(){const e=this._getEffectiveItems(),i=this.dataSource&&e.length===0?this._lazyChildren.get(null)??[]:e,o=this.dataSource!==void 0&&this.items.length===0&&this._loading.has(null);return a.html`
      <div class="tree-root" role="tree">
        ${o?a.html`
          <div class="lazy-indicator lazy-root">
            <span class="lazy-spinner"></span>
            <span>Loading…</span>
          </div>
        `:a.nothing}
        ${i.map(r=>this._renderItem(r))}
      </div>
    `}_getTreeItemFromEvent(e){const i=e.composedPath();for(const s of i)if(s instanceof HTMLElement&&s.tagName==="UI-TREE-ITEM")return s;const o=e.target;return o&&o.tagName==="UI-TREE-ITEM"?o:o?.closest?.("ui-tree-item")??null}_clearDropTarget(){this._dropTargetId=null,this._dropPosition=null,this._updateItemDropStates()}_updateItemDropStates(){this._getAllItems().forEach(e=>{e.itemId===this._dropTargetId?e.dropPosition=this._dropPosition:e.dropPosition=null})}_moveItem(e,i,o){if(!this._orderedItems)return;const r=this._findItemAndParentInTree(e,this._orderedItems),s=this._findItemAndParentInTree(i,this._orderedItems);if(!r||!s)return;r.parentList.splice(r.index,1);let p=null,d=0;if(o==="inside"){const f=s.item,b=this.getItemChildren(f),m=Object.keys(f).find(z=>f[z]===b)||"children";f[m]||(f[m]=[]);const E=f[m];E.push(r.item),p=i,d=E.length-1}else{const f=this._findItemAndParentInTree(i,this._orderedItems);if(!f)return;const b=o==="before"?f.index:f.index+1;f.parentList.splice(b,0,r.item),p=f.parentId,d=b}this._orderedItems=[...this._orderedItems],this.onItemPositionChange?.({itemId:e,newParentId:p,newIndex:d}),this.dispatchEvent(new CustomEvent("item-position-change",{detail:{itemId:e,newParentId:p,newIndex:d},bubbles:!0,composed:!0}))}},t.UiRichTreeView.styles=a.css`
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
  `,k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"items",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"dataSource",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"getItemId",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"getItemLabel",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"getItemChildren",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"isItemDisabled",2),k([n.property({type:Boolean,attribute:"disabled-items-focusable"})],t.UiRichTreeView.prototype,"disabledItemsFocusable",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"onItemClick",2),k([n.property({type:String,attribute:"expansion-trigger"})],t.UiRichTreeView.prototype,"expansionTrigger",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"expandedItems",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"defaultExpandedItems",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"onExpandedItemsChange",2),k([n.property({type:Boolean,attribute:"items-reordering"})],t.UiRichTreeView.prototype,"itemsReordering",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"isItemReorderable",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"canMoveItemToNewPosition",2),k([n.property({type:Boolean,attribute:"items-reordering-handle"})],t.UiRichTreeView.prototype,"itemsReorderingHandle",2),k([n.property({attribute:!1})],t.UiRichTreeView.prototype,"onItemPositionChange",2),k([n.state()],t.UiRichTreeView.prototype,"_orderedItems",2),k([n.state()],t.UiRichTreeView.prototype,"_draggedItemId",2),k([n.state()],t.UiRichTreeView.prototype,"_dropTargetId",2),k([n.state()],t.UiRichTreeView.prototype,"_dropPosition",2),t.UiRichTreeView=k([n.customElement("ui-rich-tree-view")],t.UiRichTreeView);var Gr=Object.defineProperty,Yr=Object.getOwnPropertyDescriptor,I=(l,e,i,o)=>{for(var r=o>1?void 0:o?Yr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Gr(e,i,r),r};t.UiCommandShortcut=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiCommandShortcut.styles=a.css`
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
    `,t.UiCommandShortcut=I([n.customElement("ui-command-shortcut")],t.UiCommandShortcut),t.UiCommandSeparator=class extends a.LitElement{render(){return a.html``}},t.UiCommandSeparator.styles=a.css`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
            margin: 4px 0;
        }
        :host([hidden]) { display: none !important; }
    `,t.UiCommandSeparator=I([n.customElement("ui-command-separator")],t.UiCommandSeparator),t.UiCommandItem=class extends a.LitElement{constructor(){super(...arguments),this.value="",this.disabled=!1,this.highlighted=!1,this._hasIcon=!1}_onIconSlotChange(e){const i=e.target;this._hasIcon=i.assignedNodes({flatten:!0}).length>0}scrollIntoViewIfNeeded(){typeof this.scrollIntoView=="function"&&this.scrollIntoView({block:"nearest"})}_handleClick(){this.disabled||this.dispatchEvent(new CustomEvent("ui-command-item-select",{bubbles:!0,composed:!0,detail:{value:this.value||this.textContent?.trim()||""}}))}render(){return a.html`
            <div
                class="item"
                role="option"
                aria-selected=${this.highlighted?"true":"false"}
                aria-disabled=${this.disabled?"true":"false"}
                tabindex="-1"
                @click=${this._handleClick}
            >
                <span class="icon" ?hidden=${!this._hasIcon}>
                    <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
                </span>
                <span class="label"><slot></slot></span>
                <slot name="shortcut"></slot>
            </div>
        `}},t.UiCommandItem.styles=a.css`
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
    `,I([n.property({type:String,reflect:!0})],t.UiCommandItem.prototype,"value",2),I([n.property({type:Boolean,reflect:!0})],t.UiCommandItem.prototype,"disabled",2),I([n.property({type:Boolean,reflect:!0})],t.UiCommandItem.prototype,"highlighted",2),I([n.state()],t.UiCommandItem.prototype,"_hasIcon",2),t.UiCommandItem=I([n.customElement("ui-command-item")],t.UiCommandItem),t.UiCommandEmpty=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiCommandEmpty.styles=a.css`
        :host {
            display: block;
            padding: 24px 8px;
            text-align: center;
            font-size: 0.875rem;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
        :host([hidden]) { display: none !important; }
    `,t.UiCommandEmpty=I([n.customElement("ui-command-empty")],t.UiCommandEmpty),t.UiCommandGroup=class extends a.LitElement{constructor(){super(...arguments),this.heading=""}render(){return a.html`
            <div class="heading">${this.heading}</div>
            <slot></slot>
        `}},t.UiCommandGroup.styles=a.css`
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
    `,I([n.property({type:String,reflect:!0})],t.UiCommandGroup.prototype,"heading",2),t.UiCommandGroup=I([n.customElement("ui-command-group")],t.UiCommandGroup),t.UiCommandList=class extends a.LitElement{render(){return a.html`
            <div class="list" role="listbox" tabindex="0" aria-label="Command results">
                <slot></slot>
            </div>
        `}},t.UiCommandList.styles=a.css`
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
    `,t.UiCommandList=I([n.customElement("ui-command-list")],t.UiCommandList),t.UiCommandInput=class extends a.LitElement{constructor(){super(...arguments),this.placeholder="Type a command or search...",this.value=""}_handleInput(e){const i=e.target;this.value=i.value,this.dispatchEvent(new CustomEvent("_cmd-filter",{bubbles:!0,composed:!0,detail:{query:i.value}}))}focus(){this.shadowRoot?.querySelector("input")?.focus()}reset(){const e=this.shadowRoot?.querySelector("input");e&&(e.value=""),this.value="",this.dispatchEvent(new CustomEvent("_cmd-filter",{bubbles:!0,composed:!0,detail:{query:""}}))}render(){return a.html`
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
        `}},t.UiCommandInput.styles=a.css`
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
    `,I([n.property({type:String})],t.UiCommandInput.prototype,"placeholder",2),I([n.property({type:String,reflect:!0})],t.UiCommandInput.prototype,"value",2),t.UiCommandInput=I([n.customElement("ui-command-input")],t.UiCommandInput),t.UiCommand=class extends a.LitElement{constructor(){super(...arguments),this._query="",this._highlightedItem=null,this._handleFilter=e=>{this._applyFilter(e.detail.query)},this._handleKeyDown=e=>{const i=this._getNavigableItems();if(i.length===0)return;const o=this._highlightedItem?i.indexOf(this._highlightedItem):-1;switch(e.key){case"ArrowDown":e.preventDefault(),this._setHighlight(i[(o+1)%i.length]);break;case"ArrowUp":e.preventDefault(),this._setHighlight(i[(o-1+i.length)%i.length]);break;case"Enter":e.preventDefault(),this._highlightedItem&&this._activateItem(this._highlightedItem);break;case"Home":e.preventDefault(),this._setHighlight(i[0]);break;case"End":e.preventDefault(),this._setHighlight(i[i.length-1]);break}}}connectedCallback(){super.connectedCallback(),this.addEventListener("_cmd-filter",this._handleFilter),this.addEventListener("keydown",this._handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("_cmd-filter",this._handleFilter),this.removeEventListener("keydown",this._handleKeyDown)}_getNavigableItems(){return[...this.querySelectorAll("ui-command-item")].filter(e=>!e.hidden&&!e.disabled)}_setHighlight(e){this._highlightedItem&&(this._highlightedItem.highlighted=!1),this._highlightedItem=e,e&&(e.highlighted=!0,e.scrollIntoViewIfNeeded())}_activateItem(e){e.dispatchEvent(new CustomEvent("ui-command-item-select",{bubbles:!0,composed:!0,detail:{value:e.value||e.textContent?.trim()||""}}))}_applyFilter(e){this._query=e;const i=e.toLowerCase(),o=[...this.querySelectorAll("ui-command-item")];let r=0;for(const d of o){const f=(d.value||d.textContent||"").toLowerCase().trim(),b=i===""||f.includes(i);d.hidden=!b,b&&r++}const s=[...this.querySelectorAll("ui-command-group")];for(const d of s){const f=[...d.querySelectorAll("ui-command-item")];d.hidden=f.length===0||f.every(b=>b.hidden)}const c=this.querySelector("ui-command-empty");c&&(c.hidden=r>0);const p=this.querySelector("ui-command-list");if(p){const d=[...p.children],f=b=>b.tagName.toLowerCase()!=="ui-command-separator"&&b.tagName.toLowerCase()!=="ui-command-empty"&&!b.hidden;for(const b of d){if(b.tagName.toLowerCase()!=="ui-command-separator")continue;const m=d.indexOf(b),E=d.slice(0,m).some(f),z=d.slice(m+1).some(f);b.hidden=!E||!z}}this._setHighlight(this._getNavigableItems()[0]??null)}_onSlotChange(){this._applyFilter(this._query)}reset(){const e=this.querySelector("ui-command-input");e?e.reset():this._applyFilter("")}render(){return a.html`
            <div class="command" part="command">
                <slot @slotchange=${this._onSlotChange}></slot>
            </div>
        `}},t.UiCommand.styles=a.css`
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
    `,t.UiCommand=I([n.customElement("ui-command")],t.UiCommand),t.UiCommandDialog=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this._boundKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this._close())}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._boundKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._boundKeyDown)}updated(e){e.has("open")&&(this.open?requestAnimationFrame(()=>{this.querySelector("ui-command-input")?.focus()}):this.querySelector("ui-command")?.reset())}_close(){this.dispatchEvent(new CustomEvent("ui-command-dialog-close",{bubbles:!0,composed:!0}))}_handleBackdropClick(e){e.target===e.currentTarget&&this._close()}render(){return a.html`
            <div
                class=${h.classMap({backdrop:!0,open:this.open})}
                aria-hidden=${this.open?"false":"true"}
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
        `}},t.UiCommandDialog.styles=a.css`
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
    `,I([n.property({type:Boolean,reflect:!0})],t.UiCommandDialog.prototype,"open",2),t.UiCommandDialog=I([n.customElement("ui-command-dialog")],t.UiCommandDialog);var Kr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,P=(l,e,i,o)=>{for(var r=o>1?void 0:o?Wr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Kr(e,i,r),r};const rt=a.css`
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
`;t.UiCarouselContent=class extends a.LitElement{constructor(){super(...arguments),this.index=0,this.itemsPerView=1,this.orientation="horizontal"}updated(e){e.has("itemsPerView")&&this.style.setProperty("--ui-carousel-items-per-view",String(this.itemsPerView))}render(){const o=`calc((100% + var(--ui-carousel-gap, 0px)) / ${this.itemsPerView})`,r=`calc(-${this.index} * ${o})`,s=this.orientation==="vertical"?`translateY(${r})`:`translateX(${r})`;return a.html`
      <div
        class="track"
        style="transform: ${s}"
        aria-live="polite"
        aria-atomic="false"
      >
        <slot></slot>
      </div>
    `}},t.UiCarouselContent.styles=a.css`
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
  `,P([n.property({type:Number})],t.UiCarouselContent.prototype,"index",2),P([n.property({type:Number,attribute:"items-per-view"})],t.UiCarouselContent.prototype,"itemsPerView",2),P([n.property({reflect:!0})],t.UiCarouselContent.prototype,"orientation",2),t.UiCarouselContent=P([n.customElement("ui-carousel-content")],t.UiCarouselContent),t.UiCarouselItem=class extends a.LitElement{render(){return a.html`
      <div class="item" role="group" aria-roledescription="slide">
        <slot></slot>
      </div>
    `}},t.UiCarouselItem.styles=a.css`
    :host {
      display: block;
      flex-shrink: 0;
      min-width: 0;
    }
    .item {
      width: 100%;
      height: 100%;
    }
  `,t.UiCarouselItem=P([n.customElement("ui-carousel-item")],t.UiCarouselItem),t.UiCarouselPrevious=class extends a.LitElement{constructor(){super(...arguments),this.disabled=!1,this.orientation="horizontal",this._handleClick=()=>{this.closest("ui-carousel")?.previous()}}render(){const e=this.orientation==="vertical"?a.html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>`:a.html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`;return a.html`
      <button
        type="button"
        part="button"
        ?disabled=${this.disabled}
        aria-label="Go to previous slide"
        @click=${this._handleClick}
      >
        <slot>${e}</slot>
      </button>
    `}},t.UiCarouselPrevious.styles=rt,P([n.property({type:Boolean,reflect:!0})],t.UiCarouselPrevious.prototype,"disabled",2),P([n.property({reflect:!0})],t.UiCarouselPrevious.prototype,"orientation",2),t.UiCarouselPrevious=P([n.customElement("ui-carousel-previous")],t.UiCarouselPrevious),t.UiCarouselNext=class extends a.LitElement{constructor(){super(...arguments),this.disabled=!1,this.orientation="horizontal",this._handleClick=()=>{this.closest("ui-carousel")?.next()}}render(){const e=this.orientation==="vertical"?a.html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`:a.html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;return a.html`
      <button
        type="button"
        part="button"
        ?disabled=${this.disabled}
        aria-label="Go to next slide"
        @click=${this._handleClick}
      >
        <slot>${e}</slot>
      </button>
    `}},t.UiCarouselNext.styles=rt,P([n.property({type:Boolean,reflect:!0})],t.UiCarouselNext.prototype,"disabled",2),P([n.property({reflect:!0})],t.UiCarouselNext.prototype,"orientation",2),t.UiCarouselNext=P([n.customElement("ui-carousel-next")],t.UiCarouselNext),t.UiCarousel=class extends a.LitElement{constructor(){super(...arguments),this.loop=!1,this.orientation="horizontal",this.autoplay=0,this.itemsPerView=1,this._currentIndex=0,this._total=0,this._observer=null,this._autoplayTimer=null,this._handleKeydown=e=>{const i=this.orientation==="vertical",o=i?"ArrowUp":"ArrowLeft",r=i?"ArrowDown":"ArrowRight";e.key===o?(e.preventDefault(),this.previous()):e.key===r&&(e.preventDefault(),this.next())}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=null,this._stopAutoplay()}firstUpdated(){this._countItems(),this._syncNavigation();const e=this.querySelector("ui-carousel-content");e&&(this._observer=new MutationObserver(()=>{this._countItems(),this._syncNavigation()}),this._observer.observe(e,{childList:!0})),this.autoplay>0&&this._startAutoplay()}updated(e){e.has("autoplay")&&(this._stopAutoplay(),this.autoplay>0&&this._startAutoplay()),(e.has("orientation")||e.has("loop")||e.has("itemsPerView"))&&this._syncNavigation()}_countItems(){const e=this.querySelector("ui-carousel-content"),i=e?e.querySelectorAll("ui-carousel-item").length:0;i!==this._total&&(this._total=i,this._currentIndex=Math.min(this._currentIndex,Math.max(0,i-1)))}_syncNavigation(){const e=this.querySelector("ui-carousel-content"),i=this.querySelector("ui-carousel-previous"),o=this.querySelector("ui-carousel-next"),r=Math.max(0,this._total-this.itemsPerView);e&&(e.index=this._currentIndex,e.orientation=this.orientation,e.itemsPerView=this.itemsPerView),i&&(i.disabled=!this.loop&&this._currentIndex===0,i.orientation=this.orientation),o&&(o.disabled=!this.loop&&(this._total===0||this._currentIndex>=r),o.orientation=this.orientation)}_fireChange(){this.dispatchEvent(new CustomEvent("ui-carousel-change",{detail:{index:this._currentIndex,total:this._total},bubbles:!0,composed:!0}))}next(){if(this._total===0)return;const e=Math.max(0,this._total-this.itemsPerView);!this.loop&&this._currentIndex>=e||(this._currentIndex=this.loop?(this._currentIndex+1)%this._total:this._currentIndex+1,this._syncNavigation(),this._fireChange())}previous(){this._total!==0&&(!this.loop&&this._currentIndex<=0||(this._currentIndex=this.loop?(this._currentIndex-1+this._total)%this._total:this._currentIndex-1,this._syncNavigation(),this._fireChange()))}goTo(e){e<0||e>=this._total||e===this._currentIndex||(this._currentIndex=e,this._syncNavigation(),this._fireChange())}get currentIndex(){return this._currentIndex}get total(){return this._total}_startAutoplay(){this._stopAutoplay(),this._autoplayTimer=setInterval(()=>{const e=Math.max(0,this._total-this.itemsPerView);this.loop||this._currentIndex<e?this.next():this._stopAutoplay()},this.autoplay)}_stopAutoplay(){this._autoplayTimer!==null&&(clearInterval(this._autoplayTimer),this._autoplayTimer=null)}render(){return a.html`
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
    `}},t.UiCarousel.styles=a.css`
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
  `,P([n.property({type:Boolean})],t.UiCarousel.prototype,"loop",2),P([n.property({reflect:!0})],t.UiCarousel.prototype,"orientation",2),P([n.property({type:Number})],t.UiCarousel.prototype,"autoplay",2),P([n.property({type:Number,attribute:"items-per-view"})],t.UiCarousel.prototype,"itemsPerView",2),t.UiCarousel=P([n.customElement("ui-carousel")],t.UiCarousel);var Xr=Object.defineProperty,Jr=Object.getOwnPropertyDescriptor,he=(l,e,i,o)=>{for(var r=o>1?void 0:o?Jr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Xr(e,i,r),r};t.UiEmptyTitle=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiEmptyTitle.styles=a.css`
        :host {
            display: block;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.4;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            margin: 0;
        }
    `,t.UiEmptyTitle=he([n.customElement("ui-empty-title")],t.UiEmptyTitle),t.UiEmptyDescription=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiEmptyDescription.styles=a.css`
        :host {
            display: block;
            font-size: 0.875rem;
            line-height: 1.5;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            margin: 0;
        }
    `,t.UiEmptyDescription=he([n.customElement("ui-empty-description")],t.UiEmptyDescription),t.UiEmptyMedia=class extends a.LitElement{constructor(){super(...arguments),this.variant="default"}render(){return a.html`
            <div class=${h.classMap({media:!0,"media--icon":this.variant==="icon"})}>
                <slot></slot>
            </div>
        `}},t.UiEmptyMedia.styles=a.css`
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
    `,he([n.property({reflect:!0})],t.UiEmptyMedia.prototype,"variant",2),t.UiEmptyMedia=he([n.customElement("ui-empty-media")],t.UiEmptyMedia),t.UiEmptyHeader=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiEmptyHeader.styles=a.css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-align: center;
        }
    `,t.UiEmptyHeader=he([n.customElement("ui-empty-header")],t.UiEmptyHeader),t.UiEmptyContent=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiEmptyContent.styles=a.css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
    `,t.UiEmptyContent=he([n.customElement("ui-empty-content")],t.UiEmptyContent),t.UiEmpty=class extends a.LitElement{render(){return a.html`
            <div class="container" part="container">
                <slot></slot>
            </div>
        `}},t.UiEmpty.styles=a.css`
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
    `,t.UiEmpty=he([n.customElement("ui-empty")],t.UiEmpty);var Qr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,X=(l,e,i,o)=>{for(var r=o>1?void 0:o?Zr(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&Qr(e,i,r),r};t.UiCollapsibleTrigger=class extends a.LitElement{constructor(){super(...arguments),this.expanded=!1,this.disabled=!1}_handleClick(){if(this.disabled)return;this.closest("ui-collapsible")?.toggle()}render(){return a.html`
            <button
                class="trigger"
                aria-expanded=${this.expanded}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
            >
                <slot></slot>
            </button>
        `}},t.UiCollapsibleTrigger.styles=a.css`
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
    `,X([n.property({type:Boolean,reflect:!0})],t.UiCollapsibleTrigger.prototype,"expanded",2),X([n.property({type:Boolean,reflect:!0})],t.UiCollapsibleTrigger.prototype,"disabled",2),t.UiCollapsibleTrigger=X([n.customElement("ui-collapsible-trigger")],t.UiCollapsibleTrigger),t.UiCollapsibleContent=class extends a.LitElement{constructor(){super(...arguments),this.open=!1}render(){return a.html`
            <div class="panel" aria-hidden=${!this.open}>
                <div class="panel-inner">
                    <slot></slot>
                </div>
            </div>
        `}},t.UiCollapsibleContent.styles=a.css`
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
    `,X([n.property({type:Boolean,reflect:!0})],t.UiCollapsibleContent.prototype,"open",2),t.UiCollapsibleContent=X([n.customElement("ui-collapsible-content")],t.UiCollapsibleContent),t.UiCollapsible=class extends a.LitElement{constructor(){super(...arguments),this.open=!1,this.defaultOpen=!1,this.disabled=!1,this._firstUpdate=!0}willUpdate(e){this._firstUpdate&&(this._firstUpdate=!1,this.defaultOpen&&!this.open&&(this.open=!0))}updated(e){(e.has("open")||e.has("disabled"))&&this._syncChildren()}toggle(){this.disabled||(this.open=!this.open,this.dispatchEvent(new CustomEvent("ui-collapsible-change",{detail:{open:this.open},bubbles:!0,composed:!0})))}_syncChildren(){this.querySelectorAll("ui-collapsible-content").forEach(e=>{e.closest("ui-collapsible")===this&&(e.open=this.open)}),this.querySelectorAll("ui-collapsible-trigger").forEach(e=>{e.closest("ui-collapsible")===this&&(e.expanded=this.open,e.disabled=this.disabled)})}render(){return a.html`<slot @slotchange=${()=>this._syncChildren()}></slot>`}},t.UiCollapsible.styles=a.css`
        :host { display: block; }
    `,X([n.property({type:Boolean,reflect:!0})],t.UiCollapsible.prototype,"open",2),X([n.property({type:Boolean,attribute:"default-open"})],t.UiCollapsible.prototype,"defaultOpen",2),X([n.property({type:Boolean,reflect:!0})],t.UiCollapsible.prototype,"disabled",2),t.UiCollapsible=X([n.customElement("ui-collapsible")],t.UiCollapsible);var jr=Object.defineProperty,eo=Object.getOwnPropertyDescriptor,oe=(l,e,i,o)=>{for(var r=o>1?void 0:o?eo(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&jr(e,i,r),r};t.UiHoverCardTrigger=class extends a.LitElement{constructor(){super(...arguments),this._handleMouseEnter=()=>this._getRoot()?.handleTriggerEnter(),this._handleMouseLeave=()=>this._getRoot()?.handleTriggerLeave(),this._handleFocusIn=()=>this._getRoot()?.handleTriggerEnter(),this._handleFocusOut=()=>this._getRoot()?.handleTriggerLeave()}_getRoot(){return this.closest("ui-hover-card")}render(){return a.html`
            <div
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
                @focusin=${this._handleFocusIn}
                @focusout=${this._handleFocusOut}
            >
                <slot></slot>
            </div>
        `}},t.UiHoverCardTrigger.styles=a.css`
        :host { display: inline-block; }
    `,t.UiHoverCardTrigger=oe([n.customElement("ui-hover-card-trigger")],t.UiHoverCardTrigger),t.UiHoverCardContent=class extends a.LitElement{constructor(){super(...arguments),this.side="bottom",this.align="center",this.open=!1,this._handleMouseEnter=()=>this._getRoot()?.handleContentEnter(),this._handleMouseLeave=()=>this._getRoot()?.handleContentLeave()}_getRoot(){return this.closest("ui-hover-card")}firstUpdated(){this._applyPosition()}updated(e){(e.has("side")||e.has("align"))&&this._applyPosition()}_applyPosition(){const{side:e,align:i}=this,o="var(--ui-hovercard-offset, 8px)";this.style.removeProperty("top"),this.style.removeProperty("bottom"),this.style.removeProperty("left"),this.style.removeProperty("right"),this.style.removeProperty("transform"),e==="bottom"||e==="top"?(this.style.setProperty(e==="bottom"?"top":"bottom",`calc(100% + ${o})`),i==="start"?this.style.setProperty("left","0"):i==="end"?this.style.setProperty("right","0"):(this.style.setProperty("left","50%"),this.style.setProperty("transform","translateX(-50%)"))):(this.style.setProperty(e==="right"?"left":"right",`calc(100% + ${o})`),i==="start"?this.style.setProperty("top","0"):i==="end"?this.style.setProperty("bottom","0"):(this.style.setProperty("top","50%"),this.style.setProperty("transform","translateY(-50%)")))}render(){return a.html`
            <div
                class="card"
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
            >
                <slot></slot>
            </div>
        `}},t.UiHoverCardContent.styles=a.css`
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
    `,oe([n.property({type:String,reflect:!0})],t.UiHoverCardContent.prototype,"side",2),oe([n.property({type:String,reflect:!0})],t.UiHoverCardContent.prototype,"align",2),oe([n.property({type:Boolean,reflect:!0})],t.UiHoverCardContent.prototype,"open",2),t.UiHoverCardContent=oe([n.customElement("ui-hover-card-content")],t.UiHoverCardContent),t.UiHoverCard=class extends a.LitElement{constructor(){super(...arguments),this.openDelay=700,this.closeDelay=300,this._isOpen=!1,this._openTimer=null,this._closeTimer=null}get isOpen(){return this._isOpen}handleTriggerEnter(){this._cancelClose(),this._isOpen||(this._openTimer=setTimeout(()=>this._setOpen(!0),this.openDelay))}handleTriggerLeave(){this._cancelOpen(),this._closeTimer=setTimeout(()=>this._setOpen(!1),this.closeDelay)}handleContentEnter(){this._cancelClose()}handleContentLeave(){this._closeTimer=setTimeout(()=>this._setOpen(!1),this.closeDelay)}_cancelOpen(){this._openTimer!==null&&(clearTimeout(this._openTimer),this._openTimer=null)}_cancelClose(){this._closeTimer!==null&&(clearTimeout(this._closeTimer),this._closeTimer=null)}_setOpen(e){this._isOpen!==e&&(this._isOpen=e,this._syncChildren(),this.dispatchEvent(new CustomEvent(e?"ui-hover-card-open":"ui-hover-card-close",{bubbles:!0,composed:!0})))}_syncChildren(){this.querySelectorAll("ui-hover-card-content").forEach(e=>{e.closest("ui-hover-card")===this&&(e.open=this._isOpen)})}disconnectedCallback(){super.disconnectedCallback(),this._cancelOpen(),this._cancelClose()}render(){return a.html`<slot @slotchange=${()=>this._syncChildren()}></slot>`}},t.UiHoverCard.styles=a.css`
        :host {
            display: inline-block;
            position: relative;
        }
    `,oe([n.property({type:Number,attribute:"open-delay"})],t.UiHoverCard.prototype,"openDelay",2),oe([n.property({type:Number,attribute:"close-delay"})],t.UiHoverCard.prototype,"closeDelay",2),t.UiHoverCard=oe([n.customElement("ui-hover-card")],t.UiHoverCard);var to=Object.defineProperty,io=Object.getOwnPropertyDescriptor,L=(l,e,i,o)=>{for(var r=o>1?void 0:o?io(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&to(e,i,r),r};t.UiInputOtpGroup=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiInputOtpGroup.styles=a.css`
        :host {
            display: inline-flex;
            align-items: center;
        }
    `,t.UiInputOtpGroup=L([n.customElement("ui-input-otp-group")],t.UiInputOtpGroup),t.UiInputOtpSeparator=class extends a.LitElement{render(){return a.html`<div class="bar"></div>`}},t.UiInputOtpSeparator.styles=a.css`
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
    `,t.UiInputOtpSeparator=L([n.customElement("ui-input-otp-separator")],t.UiInputOtpSeparator),t.UiInputOtpSlot=class extends a.LitElement{constructor(){super(...arguments),this.index=0,this.char="",this.active=!1,this.invalid=!1}render(){return this.char?a.html`${this.char}`:this.active?a.html`<div class="cursor"></div>`:a.html``}},t.UiInputOtpSlot.styles=a.css`
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
    `,L([n.property({type:Number})],t.UiInputOtpSlot.prototype,"index",2),L([n.property()],t.UiInputOtpSlot.prototype,"char",2),L([n.property({type:Boolean,reflect:!0})],t.UiInputOtpSlot.prototype,"active",2),L([n.property({type:Boolean,reflect:!0})],t.UiInputOtpSlot.prototype,"invalid",2),t.UiInputOtpSlot=L([n.customElement("ui-input-otp-slot")],t.UiInputOtpSlot),t.UiInputOtp=class extends a.LitElement{constructor(){super(),this.value="",this.defaultValue="",this.maxLength=6,this.pattern="",this.disabled=!1,this._internalValue="",this._focused=!1,this._cursorIndex=0,this._firstUpdate=!0,this.addEventListener("click",e=>{if(this.disabled)return;const o=e.target.closest("ui-input-otp-slot");this._hiddenInput?.focus(),o&&(this._cursorIndex=Math.min(o.index,this._internalValue.length),this._syncSlots())})}willUpdate(e){if(this._firstUpdate){this._firstUpdate=!1,this.defaultValue&&!this.value?(this._internalValue=this.defaultValue.slice(0,this.maxLength),this.value=this._internalValue):this._internalValue=this.value.slice(0,this.maxLength),this._cursorIndex=Math.min(this._internalValue.length,this.maxLength-1);return}e.has("value")&&this.value!==this._internalValue&&(this._internalValue=this.value.slice(0,this.maxLength),this._cursorIndex=Math.min(this._cursorIndex,Math.max(0,this._internalValue.length)))}updated(e){(e.has("value")||e.has("maxLength"))&&(this._syncSlots(),this._hiddenInput&&this._hiddenInput.value!==this._internalValue&&(this._hiddenInput.value=this._internalValue))}_getAllSlots(){return Array.from(this.querySelectorAll("ui-input-otp-slot"))}_syncSlots(){const e=this._getAllSlots(),i=this._internalValue.length,o=this._focused?this._cursorIndex:-1;for(const r of e){const s=r.index;r.char=s<i?this._internalValue[s]:"",r.active=s===o}}_filterByPattern(e){if(!this.pattern)return e;const i=new RegExp(this.pattern);return e.split("").filter(o=>i.test(o)).join("")}_commit(e){this._internalValue=e,this.value=e,this._hiddenInput&&(this._hiddenInput.value=e),this.dispatchEvent(new CustomEvent("ui-otp-change",{detail:{value:e},bubbles:!0,composed:!0})),e.length===this.maxLength&&this.dispatchEvent(new CustomEvent("ui-otp-complete",{detail:{value:e},bubbles:!0,composed:!0}))}_insertChar(e){if(this.pattern&&!new RegExp(this.pattern).test(e))return;const i=this._cursorIndex,o=this._internalValue;let r;if(i<o.length)r=o.slice(0,i)+e+o.slice(i+1);else if(o.length<this.maxLength)r=o+e;else return;this._commit(r),this._cursorIndex=Math.min(i+1,this.maxLength-1),this._syncSlots()}_deleteBackward(){if(this._internalValue.length===0)return;const e=this._cursorIndex,i=this._internalValue;if(e!==0){if(e<i.length){const o=i.slice(0,e);this._commit(o)}else{const o=i.slice(0,-1);this._commit(o),this._cursorIndex=Math.max(0,o.length)}this._syncSlots()}}_deleteForward(){const e=this._cursorIndex,i=this._internalValue;if(e>=i.length)return;const o=i.slice(0,e)+i.slice(e+1);this._commit(o),this._syncSlots()}_moveCursor(e){const i=Math.min(this._internalValue.length,this.maxLength-1);this._cursorIndex=Math.max(0,Math.min(this._cursorIndex+e,i)),this._syncSlots()}_handleKeydown(e){if(!(e.key==="Tab"||e.metaKey||e.ctrlKey)){if(e.key==="ArrowLeft"){e.preventDefault(),this._moveCursor(-1);return}if(e.key==="ArrowRight"){e.preventDefault(),this._moveCursor(1);return}if(e.key==="Home"){e.preventDefault(),this._cursorIndex=0,this._syncSlots();return}if(e.key==="End"){e.preventDefault(),this._cursorIndex=Math.min(this._internalValue.length,this.maxLength-1),this._syncSlots();return}if(e.key==="Backspace"){e.preventDefault(),this._deleteBackward();return}if(e.key==="Delete"){e.preventDefault(),this._deleteForward();return}e.key.length===1&&(e.preventDefault(),this._insertChar(e.key))}}_handlePaste(e){e.preventDefault();const i=e.clipboardData?.getData("text")??"",o=this._filterByPattern(i).slice(0,this.maxLength);this._commit(o),this._cursorIndex=Math.min(o.length,this.maxLength-1),this._syncSlots()}_handleFocus(){this._focused=!0,this._cursorIndex=Math.min(this._internalValue.length,this.maxLength-1),this._syncSlots()}_handleBlur(){this._focused=!1,this._syncSlots()}_handleSlotChange(){this._syncSlots()}render(){return a.html`
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
        `}},t.UiInputOtp.styles=a.css`
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
    `,L([n.property({reflect:!0})],t.UiInputOtp.prototype,"value",2),L([n.property({attribute:"default-value"})],t.UiInputOtp.prototype,"defaultValue",2),L([n.property({type:Number,attribute:"max-length"})],t.UiInputOtp.prototype,"maxLength",2),L([n.property()],t.UiInputOtp.prototype,"pattern",2),L([n.property({type:Boolean,reflect:!0})],t.UiInputOtp.prototype,"disabled",2),L([n.query(".hidden-input")],t.UiInputOtp.prototype,"_hiddenInput",2),t.UiInputOtp=L([n.customElement("ui-input-otp")],t.UiInputOtp);var ro=Object.defineProperty,oo=Object.getOwnPropertyDescriptor,O=(l,e,i,o)=>{for(var r=o>1?void 0:o?oo(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&ro(e,i,r),r};t.UiItemTitle=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiItemTitle.styles=a.css`
        :host {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1.4;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `,t.UiItemTitle=O([n.customElement("ui-item-title")],t.UiItemTitle),t.UiItemDescription=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiItemDescription.styles=a.css`
        :host {
            display: block;
            font-size: 0.8125rem;
            line-height: 1.5;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `,t.UiItemDescription=O([n.customElement("ui-item-description")],t.UiItemDescription),t.UiItemMedia=class extends a.LitElement{constructor(){super(...arguments),this.variant="default"}render(){return a.html`
            <div class=${h.classMap({media:!0,"media--icon":this.variant==="icon","media--image":this.variant==="image"})}>
                <slot></slot>
            </div>
        `}},t.UiItemMedia.styles=a.css`
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
    `,O([n.property({reflect:!0})],t.UiItemMedia.prototype,"variant",2),t.UiItemMedia=O([n.customElement("ui-item-media")],t.UiItemMedia),t.UiItemContent=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiItemContent.styles=a.css`
        :host {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-width: 0;
            gap: 2px;
        }
    `,t.UiItemContent=O([n.customElement("ui-item-content")],t.UiItemContent),t.UiItemActions=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiItemActions.styles=a.css`
        :host {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            gap: 8px;
            margin-left: auto;
        }
    `,t.UiItemActions=O([n.customElement("ui-item-actions")],t.UiItemActions),t.UiItemHeader=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiItemHeader.styles=a.css`
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
    `,t.UiItemHeader=O([n.customElement("ui-item-header")],t.UiItemHeader),t.UiItemFooter=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiItemFooter.styles=a.css`
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
    `,t.UiItemFooter=O([n.customElement("ui-item-footer")],t.UiItemFooter),t.UiItemSeparator=class extends a.LitElement{render(){return a.html``}},t.UiItemSeparator.styles=a.css`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
        }
    `,t.UiItemSeparator=O([n.customElement("ui-item-separator")],t.UiItemSeparator),t.UiItemGroup=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiItemGroup.styles=a.css`
        :host {
            display: flex;
            flex-direction: column;
            gap: var(--ui-item-group-gap, 4px);
        }
    `,t.UiItemGroup=O([n.customElement("ui-item-group")],t.UiItemGroup),t.UiItem=class extends a.LitElement{constructor(){super(...arguments),this.variant="default",this.size="default"}render(){return a.html`<slot></slot>`}},t.UiItem.styles=a.css`
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
    `,O([n.property({reflect:!0})],t.UiItem.prototype,"variant",2),O([n.property({reflect:!0})],t.UiItem.prototype,"size",2),t.UiItem=O([n.customElement("ui-item")],t.UiItem);var no=Object.defineProperty,ao=Object.getOwnPropertyDescriptor,Ze=(l,e,i,o)=>{for(var r=o>1?void 0:o?ao(e,i):e,s=l.length-1,c;s>=0;s--)(c=l[s])&&(r=(o?c(e,i,r):c(r))||r);return o&&r&&no(e,i,r),r};t.UiKbd=class extends a.LitElement{constructor(){super(...arguments),this.size="default"}render(){return a.html`
            <kbd class=${h.classMap({[`size-${this.size}`]:!0})}>
                <slot></slot>
            </kbd>
        `}},t.UiKbd.styles=a.css`
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
    `,Ze([n.property({reflect:!0})],t.UiKbd.prototype,"size",2),t.UiKbd=Ze([n.customElement("ui-kbd")],t.UiKbd),t.UiKbdGroup=class extends a.LitElement{render(){return a.html`<slot></slot>`}},t.UiKbdGroup.styles=a.css`
        :host {
            display: inline-flex;
            align-items: center;
            gap: var(--ui-kbd-group-gap, 4px);
        }
    `,t.UiKbdGroup=Ze([n.customElement("ui-kbd-group")],t.UiKbdGroup),Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));
