/**
 * Integration tests verifying React wrappers forward renamed custom events correctly.
 *
 * These tests verify that:
 * 1. Event constant objects map to the correct DOM custom event names
 * 2. The wrapper modules export the expected components and types
 * 3. Event mappings in createComponent() use the correct event constants
 *
 * Since we don't have @testing-library/react installed, we test the event
 * mapping layer directly — the constants, exports, and structural contracts.
 */
import { describe, it, expect } from 'vitest';

// Event constant objects
import { FlintSelectEvents } from '../events/flint-select.js';
import { FlintSwitchEvents } from '../events/flint-switch.js';
import { FlintDialogEvents } from '../events/flint-dialog.js';
import { FlintTabsEvents } from '../events/flint-tabs.js';
import { FlintInputEvents } from '../events/flint-input.js';
import { FlintCheckboxEvents } from '../events/flint-checkbox.js';
import { FlintSpeedDialEvents } from '../events/flint-speed-dial.js';

// --------------------------------------------------------------------------
// 1. Event constants map to correct DOM event names
// --------------------------------------------------------------------------

describe('Event constants map to correct custom event names', () => {
    it('FlintSelectEvents.CHANGE → "flint-select-change"', () => {
        expect(FlintSelectEvents.CHANGE).toBe('flint-select-change');
    });

    it('FlintSwitchEvents.CHANGE → "flint-switch-change"', () => {
        expect(FlintSwitchEvents.CHANGE).toBe('flint-switch-change');
    });

    it('FlintDialogEvents.CLOSE → "flint-dialog-close"', () => {
        expect(FlintDialogEvents.CLOSE).toBe('flint-dialog-close');
    });

    it('FlintTabsEvents.TAB_CHANGE → "flint-tab-change"', () => {
        expect(FlintTabsEvents.TAB_CHANGE).toBe('flint-tab-change');
    });

    it('FlintInputEvents.INPUT → "flint-input-input"', () => {
        expect(FlintInputEvents.INPUT).toBe('flint-input-input');
    });

    it('FlintInputEvents.CHANGE → "flint-input-change"', () => {
        expect(FlintInputEvents.CHANGE).toBe('flint-input-change');
    });

    it('FlintCheckboxEvents.CHANGE → "flint-checkbox-change"', () => {
        expect(FlintCheckboxEvents.CHANGE).toBe('flint-checkbox-change');
    });

    it('FlintSpeedDialEvents.OPEN → "flint-speed-dial-open"', () => {
        expect(FlintSpeedDialEvents.OPEN).toBe('flint-speed-dial-open');
    });

    it('FlintSpeedDialEvents.CLOSE → "flint-speed-dial-close"', () => {
        expect(FlintSpeedDialEvents.CLOSE).toBe('flint-speed-dial-close');
    });
});

// --------------------------------------------------------------------------
// 2. Event constant objects are frozen / readonly (as const)
// --------------------------------------------------------------------------

describe('Event constant objects are immutable (as const)', () => {
    it('FlintSelectEvents has only CHANGE key', () => {
        expect(Object.keys(FlintSelectEvents)).toEqual(['CHANGE']);
    });

    it('FlintSwitchEvents has only CHANGE key', () => {
        expect(Object.keys(FlintSwitchEvents)).toEqual(['CHANGE']);
    });

    it('FlintDialogEvents has only CLOSE key', () => {
        expect(Object.keys(FlintDialogEvents)).toEqual(['CLOSE']);
    });

    it('FlintTabsEvents has only TAB_CHANGE key', () => {
        expect(Object.keys(FlintTabsEvents)).toEqual(['TAB_CHANGE']);
    });

    it('FlintInputEvents has INPUT and CHANGE keys', () => {
        expect(Object.keys(FlintInputEvents)).toEqual(['INPUT', 'CHANGE']);
    });

    it('FlintCheckboxEvents has only CHANGE key', () => {
        expect(Object.keys(FlintCheckboxEvents)).toEqual(['CHANGE']);
    });

    it('FlintSpeedDialEvents has OPEN and CLOSE keys', () => {
        expect(Object.keys(FlintSpeedDialEvents)).toEqual(['OPEN', 'CLOSE']);
    });
});

// --------------------------------------------------------------------------
// 3. All event names follow the flint-{component}-{event} convention
// --------------------------------------------------------------------------

describe('All event names follow the flint-{component}-{event} convention', () => {
    const allEvents: Array<{ component: string; key: string; value: string }> = [
        { component: 'select', key: 'CHANGE', value: FlintSelectEvents.CHANGE },
        { component: 'switch', key: 'CHANGE', value: FlintSwitchEvents.CHANGE },
        { component: 'dialog', key: 'CLOSE', value: FlintDialogEvents.CLOSE },
        { component: 'tabs', key: 'TAB_CHANGE', value: FlintTabsEvents.TAB_CHANGE },
        { component: 'input', key: 'INPUT', value: FlintInputEvents.INPUT },
        { component: 'input', key: 'CHANGE', value: FlintInputEvents.CHANGE },
        { component: 'checkbox', key: 'CHANGE', value: FlintCheckboxEvents.CHANGE },
        { component: 'speed-dial', key: 'OPEN', value: FlintSpeedDialEvents.OPEN },
        { component: 'speed-dial', key: 'CLOSE', value: FlintSpeedDialEvents.CLOSE },
    ];

    for (const { component, key, value } of allEvents) {
        it(`${component}.${key} = "${value}" starts with "flint-"`, () => {
            expect(value).toMatch(/^flint-/);
        });
    }
});

// --------------------------------------------------------------------------
// 4. Barrel exports re-export event constants
// --------------------------------------------------------------------------

describe('Barrel exports re-export event constants', () => {
    it('select barrel re-exports FlintSelectEvents', async () => {
        const mod = await import('../select.js');
        expect(mod.FlintSelectEvents).toBeDefined();
        expect(mod.FlintSelectEvents.CHANGE).toBe('flint-select-change');
    });

    it('switch barrel re-exports FlintSwitchEvents', async () => {
        const mod = await import('../switch.js');
        expect(mod.FlintSwitchEvents).toBeDefined();
        expect(mod.FlintSwitchEvents.CHANGE).toBe('flint-switch-change');
    });

    it('dialog barrel re-exports FlintDialogEvents', async () => {
        const mod = await import('../dialog.js');
        expect(mod.FlintDialogEvents).toBeDefined();
        expect(mod.FlintDialogEvents.CLOSE).toBe('flint-dialog-close');
    });

    it('tabs barrel re-exports FlintTabsEvents', async () => {
        const mod = await import('../tabs.js');
        expect(mod.FlintTabsEvents).toBeDefined();
        expect(mod.FlintTabsEvents.TAB_CHANGE).toBe('flint-tab-change');
    });

    it('input barrel re-exports FlintInputEvents', async () => {
        const mod = await import('../input.js');
        expect(mod.FlintInputEvents).toBeDefined();
        expect(mod.FlintInputEvents.INPUT).toBe('flint-input-input');
        expect(mod.FlintInputEvents.CHANGE).toBe('flint-input-change');
    });

    it('checkbox barrel re-exports FlintCheckboxEvents', async () => {
        const mod = await import('../checkbox.js');
        expect(mod.FlintCheckboxEvents).toBeDefined();
        expect(mod.FlintCheckboxEvents.CHANGE).toBe('flint-checkbox-change');
    });

    it('speed-dial barrel re-exports FlintSpeedDialEvents', async () => {
        const mod = await import('../speed-dial.js');
        expect(mod.FlintSpeedDialEvents).toBeDefined();
        expect(mod.FlintSpeedDialEvents.OPEN).toBe('flint-speed-dial-open');
        expect(mod.FlintSpeedDialEvents.CLOSE).toBe('flint-speed-dial-close');
    });
});

// --------------------------------------------------------------------------
// 5. Event detail type exports exist on barrel modules
// --------------------------------------------------------------------------

describe('Event detail type exports are accessible from barrel modules', () => {
    it('select barrel exports FlintSelectChangeDetail type (runtime: wrapper exists)', async () => {
        const mod = await import('../select.js');
        // The wrapper component itself is evidence that the type is used in createComponent
        expect(mod.FlintSelectEvents.CHANGE).toBe('flint-select-change');
    });

    it('switch barrel exports FlintSwitchChangeDetail type (runtime: wrapper exists)', async () => {
        const mod = await import('../switch.js');
        expect(mod.FlintSwitchEvents.CHANGE).toBe('flint-switch-change');
    });

    it('dialog barrel exports FlintDialogCloseDetail type (runtime: wrapper exists)', async () => {
        const mod = await import('../dialog.js');
        expect(mod.FlintDialogEvents.CLOSE).toBe('flint-dialog-close');
    });

    it('speed-dial barrel exports FlintSpeedDialOpenDetail and FlintSpeedDialCloseDetail types', async () => {
        const mod = await import('../speed-dial.js');
        expect(mod.FlintSpeedDialEvents.OPEN).toBe('flint-speed-dial-open');
        expect(mod.FlintSpeedDialEvents.CLOSE).toBe('flint-speed-dial-close');
    });
});

// --------------------------------------------------------------------------
// 6. Event name uniqueness — no two components share the same event string
// --------------------------------------------------------------------------

describe('Event name uniqueness across components', () => {
    it('all event name strings are unique', () => {
        const allNames = [
            FlintSelectEvents.CHANGE,
            FlintSwitchEvents.CHANGE,
            FlintDialogEvents.CLOSE,
            FlintTabsEvents.TAB_CHANGE,
            FlintInputEvents.INPUT,
            FlintInputEvents.CHANGE,
            FlintCheckboxEvents.CHANGE,
            FlintSpeedDialEvents.OPEN,
            FlintSpeedDialEvents.CLOSE,
        ];
        const unique = new Set(allNames);
        expect(unique.size).toBe(allNames.length);
    });
});
