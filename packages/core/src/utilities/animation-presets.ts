/**
 * Built-in animation presets for Flint UI components.
 *
 * Importing this module registers default animations in the global registry.
 * Components that use the animation system should import this file so that
 * sensible defaults are available out of the box.
 */
import { setDefaultAnimation } from './animation-registry.js';

// ── Dialog ──────────────────────────────────────────────────────────────────

setDefaultAnimation('dialog.show', {
    keyframes: [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' },
    ],
    options: { duration: 200, easing: 'ease-out' },
});

setDefaultAnimation('dialog.hide', {
    keyframes: [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.95)' },
    ],
    options: { duration: 150, easing: 'ease-in' },
});

setDefaultAnimation('dialog.overlay.show', {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 200 },
});

setDefaultAnimation('dialog.overlay.hide', {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: { duration: 150 },
});

// ── Drawer ──────────────────────────────────────────────────────────────────

setDefaultAnimation('drawer.show', {
    keyframes: [
        { opacity: 0, transform: 'translateX(-100%)' },
        { opacity: 1, transform: 'translateX(0)' },
    ],
    rtlKeyframes: [
        { opacity: 0, transform: 'translateX(100%)' },
        { opacity: 1, transform: 'translateX(0)' },
    ],
    options: { duration: 250, easing: 'ease-out' },
});

setDefaultAnimation('drawer.hide', {
    keyframes: [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(-100%)' },
    ],
    rtlKeyframes: [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(100%)' },
    ],
    options: { duration: 200, easing: 'ease-in' },
});

setDefaultAnimation('drawer.show.right', {
    keyframes: [
        { opacity: 0, transform: 'translateX(100%)' },
        { opacity: 1, transform: 'translateX(0)' },
    ],
    rtlKeyframes: [
        { opacity: 0, transform: 'translateX(-100%)' },
        { opacity: 1, transform: 'translateX(0)' },
    ],
    options: { duration: 250, easing: 'ease-out' },
});

setDefaultAnimation('drawer.hide.right', {
    keyframes: [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(100%)' },
    ],
    rtlKeyframes: [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(-100%)' },
    ],
    options: { duration: 200, easing: 'ease-in' },
});

setDefaultAnimation('drawer.show.top', {
    keyframes: [
        { opacity: 0, transform: 'translateY(-100%)' },
        { opacity: 1, transform: 'translateY(0)' },
    ],
    options: { duration: 250, easing: 'ease-out' },
});

setDefaultAnimation('drawer.hide.top', {
    keyframes: [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-100%)' },
    ],
    options: { duration: 200, easing: 'ease-in' },
});

setDefaultAnimation('drawer.show.bottom', {
    keyframes: [
        { opacity: 0, transform: 'translateY(100%)' },
        { opacity: 1, transform: 'translateY(0)' },
    ],
    options: { duration: 250, easing: 'ease-out' },
});

setDefaultAnimation('drawer.hide.bottom', {
    keyframes: [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(100%)' },
    ],
    options: { duration: 200, easing: 'ease-in' },
});

setDefaultAnimation('drawer.overlay.show', {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 250 },
});

setDefaultAnimation('drawer.overlay.hide', {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: { duration: 200 },
});

// ── Tooltip ─────────────────────────────────────────────────────────────────

setDefaultAnimation('tooltip.show', {
    keyframes: [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' },
    ],
    options: { duration: 120, easing: 'ease-out' },
});

setDefaultAnimation('tooltip.hide', {
    keyframes: [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.95)' },
    ],
    options: { duration: 100, easing: 'ease-in' },
});

// ── Snackbar / Alert ────────────────────────────────────────────────────────

setDefaultAnimation('snackbar.show', {
    keyframes: [
        { opacity: 0, transform: 'translateY(100%)' },
        { opacity: 1, transform: 'translateY(0)' },
    ],
    options: { duration: 200, easing: 'ease-out' },
});

setDefaultAnimation('snackbar.hide', {
    keyframes: [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(100%)' },
    ],
    options: { duration: 150, easing: 'ease-in' },
});

// ── Dropdown (select, date-picker, etc.) ────────────────────────────────────

setDefaultAnimation('dropdown.show', {
    keyframes: [
        { opacity: 0, transform: 'translateY(-4px)' },
        { opacity: 1, transform: 'translateY(0)' },
    ],
    options: { duration: 150, easing: 'ease-out' },
});

setDefaultAnimation('dropdown.hide', {
    keyframes: [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-4px)' },
    ],
    options: { duration: 100, easing: 'ease-in' },
});
