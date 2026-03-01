import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridSize = number | 'auto' | boolean;
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

@customElement('ui-grid')
export class UiGrid extends LitElement {
    static styles = css`
    :host {
      display: block;
    }

    .grid-wrapper {
      box-sizing: border-box;
      display: block;
    }

    /* FIX 1: When container, display must be flex — was overridden by display:block above */
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

    @property({ type: Boolean, reflect: true }) container = false;
    @property({ type: String, reflect: true }) direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
    @property({ type: String, reflect: true }) wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'wrap';
    @property({ type: String, attribute: 'align-items', reflect: true }) alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    @property({ type: String, attribute: 'justify-content', reflect: true }) justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

    /** Total number of columns. Default is 12. */
    @property({ type: Number }) columns = 12;

    /** Spacing between items. 1 unit = 8px. */
    @property({ type: Object }) spacing: ResponsiveValue<number | string> = 0;
    @property({ type: Object }) rowSpacing: ResponsiveValue<number | string> = 0;
    @property({ type: Object }) columnSpacing: ResponsiveValue<number | string> = 0;

    /** Breakpoint sizes */
    @property() xs?: GridSize;
    @property() sm?: GridSize;
    @property() md?: GridSize;
    @property() lg?: GridSize;
    @property() xl?: GridSize;

    /** Offsets */
    @property({ type: Object }) offset?: Partial<Record<Breakpoint, number | 'auto'>>;

    @state() private _currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    // FIX 2: Use window resize listener instead of ResizeObserver on body
    private _onResize = () => {
        this._currentWidth = window.innerWidth;
    };

    private static _breakPoints: Record<string, number> = {};

    private _getBreakpointValue(name: string, fallback: number): number {
        if (UiGrid._breakPoints[name]) return UiGrid._breakPoints[name];

        if (typeof window !== 'undefined') {
            const val = getComputedStyle(document.documentElement).getPropertyValue(`--ui-breakpoint-${name}`);
            if (val && val.trim()) {
                UiGrid._breakPoints[name] = parseInt(val, 10);
                return UiGrid._breakPoints[name];
            }
        }
        return fallback;
    }

    connectedCallback() {
        super.connectedCallback();
        // FIX 2: Listen to window resize for reliable viewport width tracking
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this._onResize);
            this._currentWidth = window.innerWidth;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // FIX 2: Clean up window listener
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this._onResize);
        }
    }

    private _getBreakpoint(): Breakpoint {
        const w = this._currentWidth;
        if (w >= this._getBreakpointValue('xl', 1536)) return 'xl';
        if (w >= this._getBreakpointValue('lg', 1200)) return 'lg';
        if (w >= this._getBreakpointValue('md', 900)) return 'md';
        if (w >= this._getBreakpointValue('sm', 600)) return 'sm';
        return 'xs';
    }

    private _getEffectiveSize(bp: Breakpoint): GridSize | undefined {
        const bps: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
        const idx = bps.indexOf(bp);
        for (let i = idx; i >= 0; i--) {
            const val = (this as unknown as Record<Breakpoint, GridSize | undefined>)[bps[i]];
            if (val !== undefined) {
                if (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '') {
                    return Number(val);
                }
                if ((val as unknown) === 'true') return true;
                if ((val as unknown) === 'false') return false;
                return val;
            }
        }
        return undefined;
    }

    private _getEffectiveOffset(bp: Breakpoint): number | 'auto' | undefined {
        if (!this.offset) return undefined;
        const bps: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
        const idx = bps.indexOf(bp);
        for (let i = idx; i >= 0; i--) {
            const val = this.offset[bps[i]];
            if (val !== undefined) {
                if (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '') {
                    return Number(val);
                }
                return val;
            }
        }
        return undefined;
    }

    private _resolveResponsive(val: ResponsiveValue<number | string>, bp: Breakpoint): number | string {
        if (typeof val === 'object' && val !== null) {
            const bps: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
            const idx = bps.indexOf(bp);
            for (let i = idx; i >= 0; i--) {
                const v = (val as Partial<Record<Breakpoint, number | string>>)[bps[i]];
                if (v !== undefined) return v;
            }
            return 0;
        }
        if (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '') {
            return Number(val);
        }
        return val;
    }

    private _toPx(v: number | string): string {
        return typeof v === 'number' ? `${v * 8}px` : v;
    }

    private _getSpacingStyles(bp: Breakpoint): Record<string, string> {
        if (!this.container) return {};

        const s = this._resolveResponsive(this.spacing, bp);
        const rs = this.rowSpacing !== 0 ? this._resolveResponsive(this.rowSpacing, bp) : s;
        const cs = this.columnSpacing !== 0 ? this._resolveResponsive(this.columnSpacing, bp) : s;

        return {
            gap: `${this._toPx(rs)} ${this._toPx(cs)}`
        };
    }

    private _getItemStyles(bp: Breakpoint): Record<string, string> {
        const size = this._getEffectiveSize(bp);
        const offset = this._getEffectiveOffset(bp);

        const styles: Record<string, string> = {};

        if (size === true) {
            styles['flex-grow'] = '1';
            styles['flex-basis'] = '0%';
            styles['max-width'] = '100%';
        } else if (size === 'auto') {
            styles['flex-grow'] = '0';
            styles['flex-basis'] = 'auto';
            styles['width'] = 'auto';
            styles['max-width'] = 'none';
        } else if (typeof size === 'number') {
            const pct = (size / this.columns) * 100;

            // FIX 3: Account for column gap in flex-basis so items don't overflow.
            // We need to find the effective column spacing from the nearest ancestor container.
            // We pass it via a CSS custom property set on the container, or fall back to 0.
            // The container sets --ui-grid-column-gap on itself via styleMap (see render()).
            styles['flex-grow'] = '0';
            // Use calc to subtract the proportional share of the total column gap.
            // For n columns, there are (n-1) gaps total. Each item of size k spans
            // k columns and (k-1) internal gaps, so it "owns" k/columns of the total width
            // minus (k-1) gaps it contains plus the gaps surrounding it absorbed by flexbox.
            // The simplest correct approach: use calc(pct% - gap * (columns - size) / columns)
            styles['flex-basis'] = `calc(${pct}% - var(--ui-grid-column-gap, 0px) * ${(this.columns - size) / this.columns})`;
            styles['max-width'] = `calc(${pct}% - var(--ui-grid-column-gap, 0px) * ${(this.columns - size) / this.columns})`;
        } else if (!this.container) {
            styles['flex-grow'] = '0';
            styles['flex-basis'] = 'auto';
            styles['width'] = '100%';
        }

        if (offset === 'auto') {
            styles['margin-left'] = 'auto';
        } else if (typeof offset === 'number') {
            const pct = (offset / this.columns) * 100;
            styles['margin-left'] = `${pct}%`;
        }

        return styles;
    }

    protected updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);
        this._applyItemStyles();
    }

    private _applyItemStyles() {
        const bp = this._getBreakpoint();
        const itemStyles = this._getItemStyles(bp);

        // Reset host styles that might have been set prevously
        this.style.flexGrow = '';
        this.style.flexBasis = '';
        this.style.maxWidth = '';
        this.style.width = '';
        this.style.marginLeft = '';

        Object.entries(itemStyles).forEach(([prop, val]) => {
            this.style.setProperty(prop, val);
        });

        // Set the column gap variable on the host if it's a container
        if (this.container) {
            const spacingStyles = this._getSpacingStyles(bp);
            if (spacingStyles['gap']) {
                const parts = spacingStyles['gap'].split(' ');
                const colGap = parts.length === 2 ? parts[1] : parts[0];
                this.style.setProperty('--ui-grid-column-gap', colGap);
            }
        }
    }

    render() {
        const bp = this._getBreakpoint();
        const spacingStyles = this._getSpacingStyles(bp);

        const styles = {
            ...spacingStyles,
            'align-items': this.alignItems || '',
            'justify-content': this.justifyContent || ''
        };

        return html`
      <div class=${classMap({
            'grid-wrapper': true,
            container: this.container,
            [`direction-${this.direction}`]: this.container,
            [`wrap-${this.wrap}`]: this.container && this.wrap !== 'wrap',
        })} style=${styleMap(styles)}>
        <slot></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-grid': UiGrid;
    }
}