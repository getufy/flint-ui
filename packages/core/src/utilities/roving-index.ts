// ─── Roving-index keyboard navigation utility ───────────────────────────────
// Shared logic for ArrowUp/Down/Home/End navigation across list-like components.

export interface RovingKeyResult {
    index: number;
    handled: boolean;
}

/**
 * Given a keyboard event key and the current state, returns the next index.
 *
 * @param key       - The keyboard event key ('ArrowDown', 'ArrowUp', 'Home', 'End')
 * @param current   - Current index (-1 if nothing selected)
 * @param count     - Total number of navigable items
 * @param options   - Configuration
 * @param options.wrap       - Wrap around from last→first and first→last (default: true)
 * @param options.horizontal - Use ArrowLeft/ArrowRight instead of Up/Down (default: false)
 *
 * @returns `{ index, handled }` — `handled` is true if the key was a navigation key
 */
export function rovingIndex(
    key: string,
    current: number,
    count: number,
    options?: { wrap?: boolean; horizontal?: boolean },
): RovingKeyResult {
    if (count === 0) return { index: current, handled: false };

    const wrap = options?.wrap ?? true;
    const prev = options?.horizontal ? 'ArrowLeft' : 'ArrowUp';
    const next = options?.horizontal ? 'ArrowRight' : 'ArrowDown';

    switch (key) {
        case next: {
            if (current < 0) return { index: 0, handled: true };
            const idx = wrap
                ? (current + 1) % count
                : Math.min(current + 1, count - 1);
            return { index: idx, handled: true };
        }
        case prev: {
            if (current < 0) return { index: wrap ? count - 1 : 0, handled: true };
            const idx = wrap
                ? (current - 1 + count) % count
                : Math.max(current - 1, 0);
            return { index: idx, handled: true };
        }
        case 'Home':
            return { index: 0, handled: true };
        case 'End':
            return { index: count - 1, handled: true };
        default:
            return { index: current, handled: false };
    }
}
