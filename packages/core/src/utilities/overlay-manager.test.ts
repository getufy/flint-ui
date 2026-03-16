import { describe, it, expect, beforeEach } from 'vitest';
import { overlayManager } from './overlay-manager.js';

describe('overlay manager', () => {
    beforeEach(() => {
        overlayManager.clear();
    });

    // ── add() ───────────────────────────────────────────────────────────────

    it('add() returns a z-index', () => {
        const el = document.createElement('div');
        const z = overlayManager.add(el);
        expect(z).toBe(1040);
    });

    it('add() same element twice returns same z-index (no duplicates)', () => {
        const el = document.createElement('div');
        const z1 = overlayManager.add(el);
        const z2 = overlayManager.add(el);
        expect(z1).toBe(z2);
        expect(overlayManager.size).toBe(1);
    });

    it('base z-index starts at 1040', () => {
        const el = document.createElement('div');
        expect(overlayManager.add(el)).toBe(1040);
    });

    it('z-increment is 10', () => {
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        overlayManager.add(el1);
        const z2 = overlayManager.add(el2);
        expect(z2).toBe(1050);
    });

    it('add() sets inline z-index on the element', () => {
        const el = document.createElement('div');
        overlayManager.add(el);
        expect(el.style.zIndex).toBe('1040');
    });

    // ── remove() ────────────────────────────────────────────────────────────

    it('remove() clears z-index from element', () => {
        const el = document.createElement('div');
        overlayManager.add(el);
        overlayManager.remove(el);
        expect(el.style.zIndex).toBe('');
    });

    it('remove() re-indexes remaining entries', () => {
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        const el3 = document.createElement('div');
        overlayManager.add(el1);
        overlayManager.add(el2);
        overlayManager.add(el3);

        // Remove the middle one
        overlayManager.remove(el2);

        // el3 should be re-indexed to position 1 (1040 + 1*10 = 1050)
        expect(overlayManager.getZIndex(el1)).toBe(1040);
        expect(overlayManager.getZIndex(el3)).toBe(1050);
        expect(el3.style.zIndex).toBe('1050');
    });

    it('remove() does nothing for unknown elements', () => {
        const el = document.createElement('div');
        // Should not throw
        overlayManager.remove(el);
        expect(overlayManager.size).toBe(0);
    });

    // ── isTopmost() ─────────────────────────────────────────────────────────

    it('isTopmost() returns true for last added', () => {
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        overlayManager.add(el1);
        overlayManager.add(el2);
        expect(overlayManager.isTopmost(el2)).toBe(true);
    });

    it('isTopmost() returns false for non-topmost', () => {
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        overlayManager.add(el1);
        overlayManager.add(el2);
        expect(overlayManager.isTopmost(el1)).toBe(false);
    });

    it('isTopmost() returns false when stack is empty', () => {
        const el = document.createElement('div');
        expect(overlayManager.isTopmost(el)).toBe(false);
    });

    // ── getTopmost() ────────────────────────────────────────────────────────

    it('getTopmost() returns the last element', () => {
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        overlayManager.add(el1);
        overlayManager.add(el2);
        expect(overlayManager.getTopmost()).toBe(el2);
    });

    it('getTopmost() returns undefined when empty', () => {
        expect(overlayManager.getTopmost()).toBeUndefined();
    });

    // ── getZIndex() ─────────────────────────────────────────────────────────

    it('getZIndex() returns assigned z-index', () => {
        const el = document.createElement('div');
        overlayManager.add(el);
        expect(overlayManager.getZIndex(el)).toBe(1040);
    });

    it('getZIndex() returns undefined for unknown elements', () => {
        const el = document.createElement('div');
        expect(overlayManager.getZIndex(el)).toBeUndefined();
    });

    // ── getBackdropZIndex() ─────────────────────────────────────────────────

    it('getBackdropZIndex() returns z-index minus 1', () => {
        const el = document.createElement('div');
        overlayManager.add(el);
        expect(overlayManager.getBackdropZIndex(el)).toBe(1039);
    });

    it('getBackdropZIndex() returns undefined for unknown elements', () => {
        const el = document.createElement('div');
        expect(overlayManager.getBackdropZIndex(el)).toBeUndefined();
    });

    // ── size ────────────────────────────────────────────────────────────────

    it('size returns correct count', () => {
        expect(overlayManager.size).toBe(0);
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        overlayManager.add(el1);
        expect(overlayManager.size).toBe(1);
        overlayManager.add(el2);
        expect(overlayManager.size).toBe(2);
    });

    // ── stack ───────────────────────────────────────────────────────────────

    it('stack returns readonly snapshot', () => {
        const el = document.createElement('div');
        overlayManager.add(el);
        const stack = overlayManager.stack;
        expect(stack).toHaveLength(1);
        expect(stack[0]!.element).toBe(el);
        expect(stack[0]!.zIndex).toBe(1040);
    });

    // ── clear() ─────────────────────────────────────────────────────────────

    it('clear() removes all entries', () => {
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        overlayManager.add(el1);
        overlayManager.add(el2);

        overlayManager.clear();

        expect(overlayManager.size).toBe(0);
        expect(overlayManager.getTopmost()).toBeUndefined();
        expect(el1.style.zIndex).toBe('');
        expect(el2.style.zIndex).toBe('');
    });
});
