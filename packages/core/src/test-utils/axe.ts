import axe, { type RunOptions, type Spec } from 'axe-core';
import { expect } from 'vitest';

/**
 * Default axe-core rules to disable in jsdom.
 * These rules require a real rendering engine and produce false
 * positives (or simply cannot run) in jsdom / happy-dom.
 */
const JSDOM_DISABLED_RULES: string[] = [
    'color-contrast',         // needs computed styles
    'color-contrast-enhanced', // needs computed styles
    'link-in-text-block',     // needs computed styles
];

/**
 * Run axe-core accessibility checks on the given element and assert
 * that no violations are found.
 *
 * @param el - The element (or its container) to audit.
 * @param overrides - Extra axe RunOptions to merge (e.g. to disable
 *   additional rules for a specific component).
 *
 * @example
 * ```ts
 * it('should pass a11y checks', async () => {
 *   const el = await fixture(html`<flint-button>Click</flint-button>`);
 *   await expectAccessible(el);
 * });
 * ```
 */
export async function expectAccessible(
    el: HTMLElement,
    overrides: RunOptions = {},
): Promise<void> {
    // Build the disabled-rules map from our defaults + any caller overrides.
    const disabledRules: Record<string, { enabled: false }> = {};
    for (const id of JSDOM_DISABLED_RULES) {
        disabledRules[id] = { enabled: false };
    }

    const mergedRules = {
        ...disabledRules,
        ...(overrides.rules ?? {}),
    };

    // axe.configure is needed once per run to reset context.
    // Using a minimal spec keeps it lightweight.
    const spec: Spec = {};
    axe.configure(spec);

    const results = await axe.run(el, {
        ...overrides,
        rules: mergedRules,
    });

    // Format violations into a readable message.
    const violations = results.violations;

    if (violations.length > 0) {
        const messages = violations.map((v) => {
            const nodes = v.nodes
                .map((n) => `  - ${n.html}\n    ${n.failureSummary}`)
                .join('\n');
            return `[${v.id}] ${v.help} (${v.impact})\n${nodes}`;
        });
        expect.fail(
            `Expected no accessibility violations but found ${violations.length}:\n\n${messages.join('\n\n')}`,
        );
    }
}
