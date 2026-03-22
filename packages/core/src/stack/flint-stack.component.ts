import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlintElement } from '../flint-element.js';
import type { Breakpoint, ResponsiveValue } from '../types.js';
import uiStackStyles from './flint-stack.css?inline';

export type { Breakpoint, ResponsiveValue };

/**
 * @csspart base - The component's base wrapper element.
 */
export class FlintStack extends FlintElement {
    static styles = unsafeCSS(uiStackStyles);

    /** Flex direction of the stack layout. */
    @property({
        converter: {
            fromAttribute: (value: string | null) => {
                if (!value) return 'column';
                try { return JSON.parse(value); } catch { return value; }
            }
        }
    }) direction: ResponsiveValue<'row' | 'row-reverse' | 'column' | 'column-reverse'> = 'column';

    /**
     * Space between child items. Numeric values use an 8px multiplier (e.g. `2` = 16px).
     * String values are used as-is (e.g. `'1rem'`). Supports responsive object syntax.
     * @default 0
     */
    @property({
        converter: {
            fromAttribute: (value: string | null) => {
                if (value === null || value === '') return 0;
                try { return JSON.parse(value); } catch { return value; }
            }
        }
    }) spacing: ResponsiveValue<number | string> = 0;

    /** Cross-axis alignment of stack children. */
    @property({ type: String }) alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    /** Main-axis alignment of stack children. */
    @property({ type: String }) justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

    /** Whether to use CSS flex gap for spacing. */
    @property({ type: Boolean }) useFlexGap = true;

    @state() private _currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    private _onResize = () => {
        if (typeof window !== 'undefined') this._currentWidth = window.innerWidth;
        this.requestUpdate();
    };

    private static _breakPoints: Record<string, number> = {};

    private _getBreakpointValue(name: string, fallback: number): number {
        if (FlintStack._breakPoints[name]) return FlintStack._breakPoints[name];
        if (typeof window !== 'undefined') {
            const val = getComputedStyle(document.documentElement).getPropertyValue(`--flint-breakpoint-${name}`);
            if (val && val.trim()) {
                FlintStack._breakPoints[name] = parseInt(val, 10);
                return FlintStack._breakPoints[name];
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
     * Automatically sets the orientation of any slotted flint-divider elements
     * based on the current resolved direction of the stack.
     */
    private _updateDividers() {
        const bp = this._getBreakpoint();
        const resolvedDirection = this._resolveResponsive(this.direction, bp);
        if (!resolvedDirection) return;
        const orientation = resolvedDirection.startsWith('row') ? 'vertical' : 'horizontal';

        this.querySelectorAll('flint-divider').forEach(divider => {
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
                const v = (val as Partial<Record<Breakpoint, T>>)[bps[i]!];
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
            '--flint-stack-spacing': spacingPx,
        };

        return html`
      <div
        class="stack-wrapper direction-${resolvedDirection} ${this.useFlexGap ? '' : 'no-flex-gap'}"
        part="base"
        style=${styleMap(styles)}
      >
        <slot></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-stack': FlintStack;
    }
}
