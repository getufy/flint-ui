import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';

export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Scopes CSS custom properties to a subtree for nested theme overrides.
 *
 * @example
 * ```html
 * <flint-theme mode="dark">
 *   <flint-card>This card uses dark theme tokens</flint-card>
 * </flint-theme>
 *
 * <flint-theme palette="rose">
 *   <flint-button>Rose-themed button</flint-button>
 * </flint-theme>
 * ```
 *
 * @slot - Default slot for child content.
 */
export class FlintTheme extends FlintElement {
    static styles = css`
        :host {
            display: contents;
        }
        :host([mode="dark"]) {
            --flint-background:      var(--flint-color-zinc-950, #09090b);
            --flint-surface-1:       var(--flint-color-zinc-900, #18181b);
            --flint-surface-2:       var(--flint-color-zinc-800, #27272a);
            --flint-surface-3:       var(--flint-color-zinc-700, #3f3f46);
            --flint-surface-variant: var(--flint-color-zinc-900, #18181b);

            --flint-text-color:        var(--flint-color-zinc-50, #fafafa);
            --flint-text-color-muted:  var(--flint-color-zinc-400, #a1a1aa);
            --flint-text-color-subtle: var(--flint-color-zinc-500, #71717a);

            --flint-border-color:             var(--flint-color-zinc-700, #3f3f46);
            --flint-input-border-color:       var(--flint-color-zinc-600, #52525b);
            --flint-input-border-hover-color: var(--flint-color-zinc-500, #71717a);
            --flint-card-border-color:        var(--flint-color-zinc-800, #27272a);

            --flint-hover-color:  rgba(255, 255, 255, 0.06);
            --flint-active-color: rgba(255, 255, 255, 0.10);

            --flint-primary-color:        var(--flint-color-blue-400, #60a5fa);
            --flint-primary-color-hover:  var(--flint-color-blue-500, #3b82f6);
            --flint-primary-color-active: var(--flint-color-blue-600, #2563eb);
            --flint-primary-color-light:       rgba(96, 165, 250, 0.15);
            --flint-primary-color-light-hover: rgba(96, 165, 250, 0.25);
            --flint-primary-focus-ring:        rgba(96, 165, 250, 0.25);

            color-scheme: dark;
        }

        :host([mode="light"]) {
            --flint-background:      var(--flint-color-white, #ffffff);
            --flint-surface-1:       var(--flint-color-white, #ffffff);
            --flint-surface-2:       var(--flint-color-zinc-50, #fafafa);
            --flint-surface-3:       var(--flint-color-zinc-100, #f4f4f5);
            --flint-surface-variant: var(--flint-color-slate-50, #f8fafc);

            --flint-text-color:        var(--flint-color-slate-900, #0f172a);
            --flint-text-color-muted:  var(--flint-color-zinc-600, #52525b);
            --flint-text-color-subtle: var(--flint-color-zinc-500, #71717a);

            --flint-border-color:             var(--flint-color-zinc-200, #e4e4e7);
            --flint-input-border-color:       var(--flint-color-zinc-300, #d4d4d8);
            --flint-input-border-hover-color: var(--flint-color-zinc-400, #a1a1aa);
            --flint-card-border-color:        var(--flint-color-zinc-100, #f4f4f5);

            --flint-hover-color:  rgba(0, 0, 0, 0.04);
            --flint-active-color: rgba(0, 0, 0, 0.08);

            --flint-primary-color:        var(--flint-color-blue-600, #2563eb);
            --flint-primary-color-hover:  var(--flint-color-blue-700, #1d4ed8);
            --flint-primary-color-active: var(--flint-color-blue-800, #1e40af);
            --flint-primary-color-light:       rgba(37, 99, 235, 0.10);
            --flint-primary-color-light-hover: rgba(37, 99, 235, 0.18);
            --flint-primary-focus-ring:        rgba(37, 99, 235, 0.20);

            color-scheme: light;
        }

        /* ── Palette overrides ────────────────────────────────────────── */
        :host([palette="rose"]) {
            --flint-primary-color:        #e11d48;
            --flint-primary-color-hover:  #be123c;
            --flint-primary-color-active: #9f1239;
            --flint-primary-color-light:       rgba(225, 29, 72, 0.10);
            --flint-primary-color-light-hover: rgba(225, 29, 72, 0.18);
            --flint-primary-focus-ring:        rgba(225, 29, 72, 0.20);
        }
        :host([palette="teal"]) {
            --flint-primary-color:        #0d9488;
            --flint-primary-color-hover:  #0f766e;
            --flint-primary-color-active: #115e59;
            --flint-primary-color-light:       rgba(13, 148, 136, 0.10);
            --flint-primary-color-light-hover: rgba(13, 148, 136, 0.18);
            --flint-primary-focus-ring:        rgba(13, 148, 136, 0.20);
        }
        :host([palette="violet"]) {
            --flint-primary-color:        #7c3aed;
            --flint-primary-color-hover:  #6d28d9;
            --flint-primary-color-active: #5b21b6;
            --flint-primary-color-light:       rgba(124, 58, 237, 0.10);
            --flint-primary-color-light-hover: rgba(124, 58, 237, 0.18);
            --flint-primary-focus-ring:        rgba(124, 58, 237, 0.20);
        }
        :host([palette="amber"]) {
            --flint-primary-color:        #d97706;
            --flint-primary-color-hover:  #b45309;
            --flint-primary-color-active: #92400e;
            --flint-primary-color-light:       rgba(217, 119, 6, 0.10);
            --flint-primary-color-light-hover: rgba(217, 119, 6, 0.18);
            --flint-primary-focus-ring:        rgba(217, 119, 6, 0.20);
        }
        :host([palette="emerald"]) {
            --flint-primary-color:        #059669;
            --flint-primary-color-hover:  #047857;
            --flint-primary-color-active: #065f46;
            --flint-primary-color-light:       rgba(5, 150, 105, 0.10);
            --flint-primary-color-light-hover: rgba(5, 150, 105, 0.18);
            --flint-primary-focus-ring:        rgba(5, 150, 105, 0.20);
        }
        :host([palette="slate"]) {
            --flint-primary-color:        #475569;
            --flint-primary-color-hover:  #334155;
            --flint-primary-color-active: #1e293b;
            --flint-primary-color-light:       rgba(71, 85, 105, 0.10);
            --flint-primary-color-light-hover: rgba(71, 85, 105, 0.18);
            --flint-primary-focus-ring:        rgba(71, 85, 105, 0.20);
        }
    `;

    /**
     * Color mode override for this subtree.
     * @default 'auto'
     */
    @property({ type: String, reflect: true })
    mode: ThemeMode = 'auto';

    /**
     * Palette override — swaps primary color tokens.
     */
    @property({ type: String, reflect: true })
    palette?: string;

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-theme': FlintTheme;
    }
}
