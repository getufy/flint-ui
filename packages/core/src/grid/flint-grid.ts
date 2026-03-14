import { LitElement, unsafeCSS, html, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import uiGridStyles from './flint-grid.css?inline';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridSize = number | 'auto' | boolean;
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

@customElement('flint-grid')
export class FlintGrid extends LitElement {
    static styles = unsafeCSS(uiGridStyles);

    @property({ type: Boolean, reflect: true }) container = false;
    @property({ type: String, reflect: true }) direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
    @property({ type: String, reflect: true }) wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'wrap';
    @property({ type: String, attribute: 'align-items', reflect: true }) alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    @property({ type: String, attribute: 'justify-content', reflect: true }) justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

    /** Total number of columns. Default is 12. */
    @property({ type: Number }) columns = 12;

    /**
     * Spacing between items. 1 unit = 8px.
     * Accepts a number, a string pixel value, or a responsive object.
     */
    @property({ type: Object }) spacing: ResponsiveValue<number | string> = 0;

    /**
     * Row spacing override. When explicitly set to a non-undefined value it
     * takes precedence over `spacing` for the row axis.
     * FIX: previously `rowSpacing !== 0` was used as the guard, which meant
     * an intentional `rowSpacing="0"` (remove row gap) was impossible.
     */
    @property({ type: Object }) rowSpacing?: ResponsiveValue<number | string>;
    @property({ type: Object }) columnSpacing?: ResponsiveValue<number | string>;

    /** Breakpoint sizes */
    @property() xs?: GridSize;
    @property() sm?: GridSize;
    @property() md?: GridSize;
    @property() lg?: GridSize;
    @property() xl?: GridSize;

    /** Offsets per breakpoint */
    @property({ type: Object }) offset?: Partial<Record<Breakpoint, number | 'auto'>>;

    /**
     * Flex order. Supports responsive values so items can be reordered at
     * specific breakpoints (e.g. push a sidebar above content on mobile).
     */
    @property({ type: Object }) order?: ResponsiveValue<number>;

    @state() private _currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    private _onResize = () => {
        this._currentWidth = window.innerWidth;
    };

    /**
     * Breakpoint pixel cache. Scoped per-instance (not static) so that
     * elements in different shadow roots / CSS scopes don't share stale values.
     */
    private _breakpointCache: Record<string, number> = {};

    private _getBreakpointValue(name: string, fallback: number): number {
        if (this._breakpointCache[name] !== undefined) return this._breakpointCache[name];

        if (typeof window !== 'undefined') {
            const val = getComputedStyle(document.documentElement).getPropertyValue(`--flint-breakpoint-${name}`);
            if (val && val.trim()) {
                this._breakpointCache[name] = parseInt(val, 10);
                return this._breakpointCache[name];
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

    private _resolveResponsiveOrder(val: ResponsiveValue<number>, bp: Breakpoint): number | undefined {
        if (typeof val === 'object' && val !== null) {
            const bps: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
            const idx = bps.indexOf(bp);
            for (let i = idx; i >= 0; i--) {
                const v = (val as Partial<Record<Breakpoint, number>>)[bps[i]];
                if (v !== undefined) return v;
            }
            return undefined;
        }
        return val as number;
    }

    private _toPx(v: number | string): string {
        return typeof v === 'number' ? `${v * 8}px` : v;
    }

    private _getSpacingStyles(bp: Breakpoint): Record<string, string> {
        if (!this.container) return {};

        const s = this._resolveResponsive(this.spacing, bp);

        // FIX: Use undefined check so rowSpacing/columnSpacing = 0 works correctly.
        const rs = this.rowSpacing !== undefined
            ? this._resolveResponsive(this.rowSpacing, bp)
            : s;
        const cs = this.columnSpacing !== undefined
            ? this._resolveResponsive(this.columnSpacing, bp)
            : s;

        return {
            gap: `${this._toPx(rs)} ${this._toPx(cs)}`
        };
    }

    private _getEffectiveColumns(): number {
        // Read inherited column count from nearest ancestor container via CSS variable,
        // but only if this element is NOT itself a container (containers define the column grid).
        if (this.container) return this.columns;
        const inherited = getComputedStyle(this).getPropertyValue('--flint-grid-columns').trim();
        if (inherited && !isNaN(Number(inherited))) return Number(inherited);
        return this.columns;
    }

    private _getItemStyles(bp: Breakpoint): Record<string, string> {
        // Perf guard: pure containers with no size props set don't need item styles.
        const hasSize = this.xs !== undefined || this.sm !== undefined || this.md !== undefined
            || this.lg !== undefined || this.xl !== undefined;
        const hasOffset = !!this.offset;
        const hasOrder = this.order !== undefined;

        if (!hasSize && !hasOffset && !hasOrder) return {};

        const size = this._getEffectiveSize(bp);
        const offset = this._getEffectiveOffset(bp);
        const columns = this._getEffectiveColumns();

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
            const pct = (size / columns) * 100;
            styles['flex-grow'] = '0';
            styles['flex-basis'] = `calc(${pct}% - var(--flint-grid-column-gap, 0px) * ${(columns - size) / columns})`;
            styles['max-width'] = `calc(${pct}% - var(--flint-grid-column-gap, 0px) * ${(columns - size) / columns})`;
        } else if (!this.container) {
            styles['flex-grow'] = '0';
            styles['flex-basis'] = 'auto';
            styles['width'] = '100%';
        }

        if (offset === 'auto') {
            styles['margin-left'] = 'auto';
        } else if (typeof offset === 'number') {
            const pct = (offset / columns) * 100;
            styles['margin-left'] = `${pct}%`;
        }

        if (this.order !== undefined) {
            const o = this._resolveResponsiveOrder(this.order, bp);
            if (o !== undefined) {
                styles['order'] = String(o);
            }
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

        // Reset previously applied host styles
        this.style.flexGrow = '';
        this.style.flexBasis = '';
        this.style.maxWidth = '';
        this.style.width = '';
        this.style.marginLeft = '';
        this.style.order = '';

        Object.entries(itemStyles).forEach(([prop, val]) => {
            this.style.setProperty(prop, val);
        });

        if (this.container) {
            const spacingStyles = this._getSpacingStyles(bp);
            if (spacingStyles['gap']) {
                const parts = spacingStyles['gap'].split(' ');
                const colGap = parts.length === 2 ? parts[1] : parts[0];
                this.style.setProperty('--flint-grid-column-gap', colGap);
            }
            // Propagate column count to children via CSS custom property so nested
            // items without an explicit `columns` prop calculate percentages correctly.
            this.style.setProperty('--flint-grid-columns', String(this.columns));
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
        'flint-grid': FlintGrid;
    }
}