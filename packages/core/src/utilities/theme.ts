/**
 * Runtime theme switching utility.
 *
 * @example
 * ```ts
 * import { setFlintTheme } from '@getufy/flint-ui/utilities/theme';
 *
 * setFlintTheme('dark');           // activate dark mode
 * setFlintTheme('light');          // force light mode
 * setFlintTheme('auto');           // follow system preference
 * setFlintTheme('teal');           // apply a preset palette
 * setFlintTheme('dark', 'rose');   // dark mode + rose palette
 * ```
 */

export type FlintColorMode = 'light' | 'dark' | 'auto';
export type FlintPalette = 'default' | 'teal' | 'violet' | 'rose' | 'amber' | 'emerald' | 'slate';

const THEME_CLASSES = ['flint-theme-dark', 'flint-theme-light'] as const;
const PALETTE_CLASSES = [
    'flint-theme-teal',
    'flint-theme-violet',
    'flint-theme-rose',
    'flint-theme-amber',
    'flint-theme-emerald',
    'flint-theme-slate',
] as const;

/**
 * Sets the Flint UI theme on the document root.
 *
 * @param mode - `'light'`, `'dark'`, or `'auto'` (follow `prefers-color-scheme`).
 * @param palette - Optional color palette preset. Pass `'default'` to reset.
 */
export function setFlintTheme(mode: FlintColorMode, palette?: FlintPalette): void;
/**
 * Applies a palette preset without changing the color mode.
 *
 * @param palette - A named preset palette (e.g. `'teal'`, `'rose'`).
 */
export function setFlintTheme(palette: FlintPalette): void;
export function setFlintTheme(modeOrPalette: FlintColorMode | FlintPalette, palette?: FlintPalette): void {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;

    // Detect if first arg is a palette (not a mode)
    const modes: string[] = ['light', 'dark', 'auto'];
    let mode: FlintColorMode | undefined;
    let pal: FlintPalette | undefined;

    if (modes.includes(modeOrPalette)) {
        mode = modeOrPalette as FlintColorMode;
        pal = palette;
    } else {
        pal = modeOrPalette as FlintPalette;
    }

    // Apply color mode
    if (mode !== undefined) {
        el.classList.remove(...THEME_CLASSES);
        el.removeAttribute('data-theme');

        if (mode === 'dark') {
            el.classList.add('flint-theme-dark');
            el.setAttribute('data-theme', 'dark');
        } else if (mode === 'light') {
            el.classList.add('flint-theme-light');
            el.setAttribute('data-theme', 'light');
        }
        // 'auto' — remove all overrides, let @media (prefers-color-scheme) take over
    }

    // Apply palette
    if (pal !== undefined) {
        el.classList.remove(...PALETTE_CLASSES);
        if (pal !== 'default') {
            el.classList.add(`flint-theme-${pal}`);
        }
    }
}

/**
 * Returns the currently active color mode based on classes/attributes on `<html>`.
 */
export function getFlintTheme(): { mode: FlintColorMode; palette: FlintPalette } {
    if (typeof document === 'undefined') return { mode: 'auto', palette: 'default' };
    const el = document.documentElement;

    let mode: FlintColorMode = 'auto';
    if (el.classList.contains('flint-theme-dark') || el.getAttribute('data-theme') === 'dark') {
        mode = 'dark';
    } else if (el.classList.contains('flint-theme-light') || el.getAttribute('data-theme') === 'light') {
        mode = 'light';
    }

    let palette: FlintPalette = 'default';
    for (const cls of PALETTE_CLASSES) {
        if (el.classList.contains(cls)) {
            palette = cls.replace('flint-theme-', '') as FlintPalette;
            break;
        }
    }

    return { mode, palette };
}
