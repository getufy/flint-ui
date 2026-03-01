import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

@customElement('ui-stack')
export class UiStack extends LitElement {
    static styles = css`
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

    @property({
        converter: {
            fromAttribute: (value: string | null) => {
                if (!value) return 'column';
                try { return JSON.parse(value); } catch { return value; }
            }
        }
    }) direction: ResponsiveValue<'row' | 'row-reverse' | 'column' | 'column-reverse'> = 'column';

    @property({ type: Object }) spacing: ResponsiveValue<number | string> = 0;

    @property({ type: String }) alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    @property({ type: String }) justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

    @property({ type: Boolean }) useFlexGap = true;

    @state() private _currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    private _onResize = () => {
        this._currentWidth = window.innerWidth;
        this.requestUpdate();
    };

    private static _breakPoints: Record<string, number> = {};

    private _getBreakpointValue(name: string, fallback: number): number {
        if (UiStack._breakPoints[name]) return UiStack._breakPoints[name];
        if (typeof window !== 'undefined') {
            const val = getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${name}`);
            if (val && val.trim()) {
                UiStack._breakPoints[name] = parseInt(val, 10);
                return UiStack._breakPoints[name];
            }
        }
        return fallback;
    }

    connectedCallback() {
        super.connectedCallback();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this._onResize);
            this._currentWidth = window.innerWidth;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this._onResize);
        }
    }

    protected updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);
        this._updateDividers();
    }

    /**
     * Automatically sets the orientation of any slotted ui-divider elements
     * based on the current resolved direction of the stack.
     */
    private _updateDividers() {
        const bp = this._getBreakpoint();
        const resolvedDirection = this._resolveResponsive(this.direction, bp);
        if (!resolvedDirection) return;
        const orientation = resolvedDirection.startsWith('row') ? 'vertical' : 'horizontal';

        this.querySelectorAll('ui-divider').forEach(divider => {
            if (divider.getAttribute('orientation') !== orientation) {
                divider.setAttribute('orientation', orientation);
            }
        });
    }

    private _getBreakpoint(): Breakpoint {
        const w = this._currentWidth;
        if (w >= this._getBreakpointValue('xl', 1536)) return 'xl';
        if (w >= this._getBreakpointValue('lg', 1200)) return 'lg';
        if (w >= this._getBreakpointValue('md', 900)) return 'md';
        if (w >= this._getBreakpointValue('sm', 600)) return 'sm';
        return 'xs';
    }

    private _resolveResponsive<T>(val: ResponsiveValue<T>, bp: Breakpoint): T {
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            const bps: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
            const idx = bps.indexOf(bp);
            for (let i = idx; i >= 0; i--) {
                const v = (val as Partial<Record<Breakpoint, T>>)[bps[i]];
                if (v !== undefined) return v;
            }
            const obj = val as Partial<Record<Breakpoint, T>>;
            const fallback = obj.xs;
            return fallback !== undefined ? fallback : obj[Object.keys(val)[0] as Breakpoint] as T;
        }
        return val as T;
    }

    private _getSpacingPx(spacing: number | string): string {
        if (typeof spacing === 'number') return `${spacing * 8}px`;
        return spacing;
    }

    render() {
        const bp = this._getBreakpoint();
        const resolvedDirection = this._resolveResponsive(this.direction, bp);
        const resolvedSpacing = this._resolveResponsive(this.spacing, bp);
        const spacingPx = this._getSpacingPx(resolvedSpacing);

        // Default align-items: stretch for column (items fill width),
        // center for row (items align to their cross-axis midpoint).
        const dir = resolvedDirection ?? 'column';
        const defaultAlign = dir.startsWith('column') ? 'stretch' : 'center';

        const styles: Record<string, string> = {
            'flex-direction': dir,
            'align-items': this.alignItems || defaultAlign,
            'justify-content': this.justifyContent || 'flex-start',
            gap: this.useFlexGap ? spacingPx : '0',
            '--ui-stack-spacing': spacingPx,
        };

        return html`
      <div
        class="stack-wrapper direction-${resolvedDirection} ${this.useFlexGap ? '' : 'no-flex-gap'}"
        style=${styleMap(styles)}
      >
        <slot></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-stack': UiStack;
    }
}