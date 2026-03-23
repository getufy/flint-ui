import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import type { Breakpoint, ResponsiveValue } from '../types.js';
import uiGridStyles from './flint-grid.css?inline';

export type { Breakpoint, ResponsiveValue };
export type GridSize = number | 'auto' | boolean;

/**
 * A responsive 12-column grid layout component inspired by Material UI's Grid.
 *
 * `<flint-grid>` serves two roles depending on the `container` prop:
 *
 * - **Container mode** (`container`): creates a flex row that distributes child
 *   `<flint-grid>` items across columns. Controls spacing, direction, wrapping,
 *   and alignment.
 * - **Item mode** (default): sizes itself within a parent container by specifying
 *   how many columns to span at each breakpoint (`xs`, `sm`, `md`, `lg`, `xl`).
 *
 * ### 12-column system
 * The grid divides available width into 12 equal columns (configurable via
 * `columns`). Assign a number 1-12 to breakpoint props to set the span.
 * Use `true` for equal-width auto-fill, or `"auto"` for content-based width.
 *
 * ### Responsive breakpoints
 * Breakpoint props cascade upward -- a value set at `xs` applies to all larger
 * breakpoints unless overridden:
 *
 * | Prop | Default min-width | CSS variable override        |
 * |------|-------------------|------------------------------|
 * | `xs` | 0px               | `--flint-breakpoint-xs`      |
 * | `sm` | 600px             | `--flint-breakpoint-sm`      |
 * | `md` | 900px             | `--flint-breakpoint-md`      |
 * | `lg` | 1200px            | `--flint-breakpoint-lg`      |
 * | `xl` | 1536px            | `--flint-breakpoint-xl`      |
 *
 * ### Spacing
 * The `spacing` prop uses a multiplier where **1 unit = 8px**. Set `spacing={2}`
 * for 16px gaps. Use `rowSpacing` / `columnSpacing` for independent axis control.
 * Spacing also accepts responsive objects: `{ xs: 1, md: 3 }`.
 *
 * @example
 * ```html
 * <flint-grid container spacing="2">
 *   <flint-grid xs="12" md="8"><div>Main</div></flint-grid>
 *   <flint-grid xs="12" md="4"><div>Sidebar</div></flint-grid>
 * </flint-grid>
 * ```
 *
 * @tag flint-grid
 * @csspart base - The inner wrapper div.
 * @cssprop [--flint-breakpoint-xs] - Override xs breakpoint (default: 0).
 * @cssprop [--flint-breakpoint-sm] - Override sm breakpoint (default: 600).
 * @cssprop [--flint-breakpoint-md] - Override md breakpoint (default: 900).
 * @cssprop [--flint-breakpoint-lg] - Override lg breakpoint (default: 1200).
 * @cssprop [--flint-breakpoint-xl] - Override xl breakpoint (default: 1536).
 * @cssprop [--flint-grid-columns] - Inherited column count from parent container.
 */
export class FlintGrid extends FlintElement {
    static styles = unsafeCSS(uiGridStyles);

    /** Whether this element acts as a grid container. */
    @property({ type: Boolean, reflect: true }) container = false;
    /** Flex direction of the grid container. */
    @property({ type: String, reflect: true }) direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
    /** Flex wrap behavior of the grid container. */
    @property({ type: String, reflect: true }) wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'wrap';
    /** Cross-axis alignment of grid items. */
    @property({ type: String, attribute: 'align-items', reflect: true }) alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    /** Main-axis alignment of grid items. */
    @property({ type: String, attribute: 'justify-content', reflect: true }) justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

    /** Total number of columns. Default is 12. */
    @property({ type: Number }) columns = 12;

    /**
     * Spacing between items. 1 unit = 8px.
     * Accepts a number, a string pixel value, or a responsive object.
     */
    @property({ type: Object }) spacing: ResponsiveValue<number | string> = 0;

    /** Row spacing override; takes precedence over `spacing` for the row axis. */
    @property({ type: Object }) rowSpacing?: ResponsiveValue<number | string>;
    /** Column spacing override; takes precedence over `spacing` for the column axis. */
    @property({ type: Object }) columnSpacing?: ResponsiveValue<number | string>;

    /** Number of columns to span at the xs breakpoint. */
    @property() xs?: GridSize;
    /** Number of columns to span at the sm breakpoint. */
    @property() sm?: GridSize;
    /** Number of columns to span at the md breakpoint. */
    @property() md?: GridSize;
    /** Number of columns to span at the lg breakpoint. */
    @property() lg?: GridSize;
    /** Number of columns to span at the xl breakpoint. */
    @property() xl?: GridSize;

    /** Offset per breakpoint, expressed in column units or 'auto'. */
    @property({ type: Object }) offset?: Partial<Record<Breakpoint, number | 'auto'>>;

    /**
     * Flex order. Supports responsive values so items can be reordered at
     * specific breakpoints (e.g. push a sidebar above content on mobile).
     */
    @property({ type: Object }) order?: ResponsiveValue<number>;

    @state() private _currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    /** Tracks which CSS properties were set by _applyItemStyles so only those are cleared. */
    private _appliedGridProps = new Set<string>();

    private _onResize = () => {
        if (typeof window !== 'undefined') this._currentWidth = window.innerWidth;
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
            const val = (this as unknown as Record<Breakpoint, GridSize | undefined>)[bps[i]!];
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
            const val = this.offset[bps[i]!];
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
                const v = (val as Partial<Record<Breakpoint, number | string>>)[bps[i]!];
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
                const v = (val as Partial<Record<Breakpoint, number>>)[bps[i]!];
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
        if (this.container || typeof window === 'undefined') return this.columns;
        const inherited = getComputedStyle(this).getPropertyValue('--flint-grid-columns').trim();
        if (inherited && !isNaN(Number(inherited))) return Number(inherited);
        return this.columns;
    }

    protected updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);
        this._applyItemStyles();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this._onResize);
        }
    }

    private _applyItemStyles() {
        // ── Read phase: batch ALL getComputedStyle / layout reads first ──
        // Cache breakpoint and column count to avoid redundant getComputedStyle
        // calls that would force layout recalculation.
        const bp = this._getBreakpoint();
        const columns = this._getEffectiveColumns();

        // Skip entirely if nothing changed since last apply
        const itemStyles = this._getItemStylesCached(bp, columns);

        let colGap: string | null = null;
        if (this.container) {
            const spacingStyles = this._getSpacingStyles(bp);
            if (spacingStyles['gap']) {
                const parts = spacingStyles['gap'].split(' ');
                colGap = parts.length === 2 ? parts[1]! : parts[0]!;
            }
        }

        // ── Write phase: batch all DOM mutations together ──
        // Only clear properties that were previously set by the component,
        // preserving any user-set inline styles (e.g. from React's style prop).
        for (const prop of this._appliedGridProps) {
            this.style.removeProperty(prop);
        }
        this._appliedGridProps.clear();

        Object.entries(itemStyles).forEach(([prop, val]) => {
            this.style.setProperty(prop, val);
            this._appliedGridProps.add(prop);
        });

        if (this.container) {
            if (colGap !== null) {
                this.style.setProperty('--flint-grid-column-gap', colGap);
            }
            // Propagate column count to children via CSS custom property so nested
            // items without an explicit `columns` prop calculate percentages correctly.
            this.style.setProperty('--flint-grid-columns', String(this.columns));
        }
    }

    /**
     * Compute item styles using pre-read column count to avoid
     * getComputedStyle during the write phase.
     */
    private _getItemStylesCached(bp: Breakpoint, columns: number): Record<string, string> {
        const hasSize = this.xs !== undefined || this.sm !== undefined || this.md !== undefined
            || this.lg !== undefined || this.xl !== undefined;
        const hasOffset = !!this.offset;
        const hasOrder = this.order !== undefined;

        if (!hasSize && !hasOffset && !hasOrder) return {};

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
        })} part="base" style=${styleMap(styles)}>
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
