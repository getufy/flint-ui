/**
 * Centralized overlay manager [§38.1]
 *
 * A singleton that manages stacking of overlays (dialogs, drawers, menus,
 * tooltips). It tracks open overlays in a stack, assigns z-index values
 * from the token scale, and ensures new overlays are always on top.
 *
 * @example
 * ```ts
 * import { overlayManager } from '@getufy/flint-ui/utilities/overlay-manager';
 *
 * overlayManager.add(myDialogElement);   // push onto stack
 * overlayManager.remove(myDialogElement); // pop from stack
 * overlayManager.isTopmost(myDialogElement); // check if on top
 * ```
 */

export interface OverlayEntry {
    element: HTMLElement;
    zIndex: number;
}

const BASE_Z_INDEX = 1040; // matches --flint-z-overlay
const Z_INCREMENT = 10;

class OverlayManager {
    private _stack: OverlayEntry[] = [];

    /** The current overlay stack (read-only snapshot). */
    get stack(): readonly OverlayEntry[] {
        return this._stack;
    }

    /** Number of currently open overlays. */
    get size(): number {
        return this._stack.length;
    }

    /**
     * Add an overlay to the stack. Assigns the next z-index and
     * applies it to the element's inline style.
     */
    add(element: HTMLElement): number {
        // Don't add the same element twice
        const existing = this._stack.find(e => e.element === element);
        if (existing) return existing.zIndex;

        const zIndex = BASE_Z_INDEX + this._stack.length * Z_INCREMENT;
        const entry: OverlayEntry = { element, zIndex };
        this._stack.push(entry);
        element.style.zIndex = String(zIndex);
        return zIndex;
    }

    /**
     * Remove an overlay from the stack and clear its z-index.
     */
    remove(element: HTMLElement): void {
        const index = this._stack.findIndex(e => e.element === element);
        if (index === -1) return;
        this._stack.splice(index, 1);
        element.style.removeProperty('z-index');
        // Re-index remaining overlays above the removed one
        for (let i = index; i < this._stack.length; i++) {
            const entry = this._stack[i]!;
            entry.zIndex = BASE_Z_INDEX + i * Z_INCREMENT;
            entry.element.style.zIndex = String(entry.zIndex);
        }
    }

    /** Check whether the given element is the topmost overlay. */
    isTopmost(element: HTMLElement): boolean {
        if (this._stack.length === 0) return false;
        return this._stack[this._stack.length - 1]!.element === element;
    }

    /** Get the topmost overlay element, if any. */
    getTopmost(): HTMLElement | undefined {
        if (this._stack.length === 0) return undefined;
        return this._stack[this._stack.length - 1]!.element;
    }

    /** Get the z-index assigned to an element, or undefined if not in the stack. */
    getZIndex(element: HTMLElement): number | undefined {
        return this._stack.find(e => e.element === element)?.zIndex;
    }

    /**
     * Get the z-index for a backdrop that should sit behind the given overlay.
     * Returns a value one less than the overlay's z-index.
     */
    getBackdropZIndex(element: HTMLElement): number | undefined {
        const overlayZ = this.getZIndex(element);
        return overlayZ !== undefined ? overlayZ - 1 : undefined;
    }

    /** Remove all overlays from the stack. */
    clear(): void {
        for (const entry of this._stack) {
            entry.element.style.removeProperty('z-index');
        }
        this._stack = [];
    }
}

/** Singleton overlay manager instance. */
export const overlayManager = new OverlayManager();
