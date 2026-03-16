import type { LitElement, PropertyValues } from 'lit';

/**
 * `@watch('propName')` decorator — calls the decorated method whenever the
 * specified reactive property changes.
 *
 * The method receives `(oldValue, newValue)` as arguments and is invoked
 * during `updated()`, meaning the DOM has already been rendered with the
 * new value.
 *
 * By default the watcher does NOT run on the first update (when the
 * component first renders). Pass `{ waitUntilFirstUpdate: false }` to
 * include the initial render.
 *
 * @example
 * ```ts
 * @watch('value')
 * _onValueChange(oldValue: string, newValue: string) {
 *   console.log('value changed from', oldValue, 'to', newValue);
 * }
 * ```
 */
export function watch(propName: string, options?: { waitUntilFirstUpdate?: boolean }) {
    const waitUntilFirstUpdate = options?.waitUntilFirstUpdate ?? true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (proto: any, methodName: string) => {
        const { updated } = proto;

        proto.updated = function (this: LitElement & { _watchFirstUpdateDone?: boolean }, changedProperties: PropertyValues) {
            // Call the original updated method first
            if (updated) {
                updated.call(this, changedProperties);
            }

            const isFirstUpdate = !this._watchFirstUpdateDone;
            this._watchFirstUpdateDone = true;

            if (changedProperties.has(propName)) {
                // Skip the first update if configured to wait
                if (waitUntilFirstUpdate && isFirstUpdate) {
                    return;
                }

                const oldValue = changedProperties.get(propName);
                const newValue = (this as unknown as Record<string, unknown>)[propName];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fn = (this as unknown as Record<string, any>)[methodName] as ((...args: unknown[]) => void) | undefined;
                if (fn) fn.call(this, oldValue, newValue);
            }
        };
    };
}
