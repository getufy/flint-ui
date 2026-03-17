/**
 * Tree-shakable dev-mode validation utilities.
 * All functions are no-ops in production builds (guarded by import.meta.env.DEV).
 */

const _warned = new Set<string>();

/**
 * Emit a one-time console warning in dev mode.
 */
export function devWarn(tag: string, message: string): void {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
        const key = `${tag}:${message}`;
        if (_warned.has(key)) return;
        _warned.add(key);
        console.warn(`[flint-ui] <${tag}>: ${message}`);
    }
}

/**
 * Validate that a string prop value is one of the allowed values.
 * Emits a one-time console warning if not.
 */
export function validateEnum(
    tag: string,
    propName: string,
    value: unknown,
    allowed: readonly string[],
): void {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
        if (typeof value === 'string' && value !== '' && !allowed.includes(value)) {
            devWarn(tag, `Invalid "${propName}" value "${value}". Expected one of: ${allowed.join(', ')}`);
        }
    }
}
