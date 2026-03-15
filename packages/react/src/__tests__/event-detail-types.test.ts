/**
 * TypeScript compile-time + runtime tests for event detail types.
 *
 * These tests verify that the React wrapper event handler props accept
 * the correct CustomEvent<Detail> generic types. If the types are wrong,
 * this file will fail TypeScript type-checking before tests even run.
 */
import { describe, it, expect } from 'vitest';

// Import detail types from component wrappers (via barrel re-exports)
import type { FlintSelectChangeDetail } from '../components/FlintSelect.js';
import type { FlintSwitchChangeDetail } from '../components/FlintSwitch.js';
import type { FlintDialogCloseDetail } from '../components/FlintDialog.js';
import type { FlintSpeedDialOpenDetail, FlintSpeedDialCloseDetail } from '../components/FlintSpeedDial.js';

// --------------------------------------------------------------------------
// Compile-time type assertions (these fail tsc if types are wrong)
// --------------------------------------------------------------------------

// FlintSelectChangeDetail must have value: string[]
const _selectDetail: FlintSelectChangeDetail = { value: ['a', 'b'] };

// FlintSwitchChangeDetail must have checked: boolean
const _switchDetail: FlintSwitchChangeDetail = { checked: true };

// FlintDialogCloseDetail must have open: false
const _dialogDetail: FlintDialogCloseDetail = { open: false };

// FlintSpeedDialOpenDetail must have open: true
const _speedDialOpenDetail: FlintSpeedDialOpenDetail = { open: true };

// FlintSpeedDialCloseDetail must have open: false
const _speedDialCloseDetail: FlintSpeedDialCloseDetail = { open: false };

// Suppress unused variable warnings — these exist purely for type-checking
void _selectDetail;
void _switchDetail;
void _dialogDetail;
void _speedDialOpenDetail;
void _speedDialCloseDetail;

// --------------------------------------------------------------------------
// Runtime assertions for the same detail shapes
// --------------------------------------------------------------------------

describe('FlintSelectChangeDetail type shape', () => {
    it('has value as string[]', () => {
        const detail: FlintSelectChangeDetail = { value: ['option1'] };
        expect(detail.value).toBeInstanceOf(Array);
        expect(typeof detail.value[0]).toBe('string');
    });
});

describe('FlintSwitchChangeDetail type shape', () => {
    it('has checked as boolean', () => {
        const detail: FlintSwitchChangeDetail = { checked: false };
        expect(typeof detail.checked).toBe('boolean');
    });
});

describe('FlintDialogCloseDetail type shape', () => {
    it('has open set to false', () => {
        const detail: FlintDialogCloseDetail = { open: false };
        expect(detail.open).toBe(false);
    });
});

describe('FlintSpeedDialOpenDetail type shape', () => {
    it('has open set to true', () => {
        const detail: FlintSpeedDialOpenDetail = { open: true };
        expect(detail.open).toBe(true);
    });
});

describe('FlintSpeedDialCloseDetail type shape', () => {
    it('has open set to false', () => {
        const detail: FlintSpeedDialCloseDetail = { open: false };
        expect(detail.open).toBe(false);
    });
});

// --------------------------------------------------------------------------
// Verify CustomEvent can be constructed with the detail types
// --------------------------------------------------------------------------

describe('CustomEvent construction with detail types', () => {
    it('CustomEvent<FlintSelectChangeDetail> carries value in detail', () => {
        const event = new CustomEvent<FlintSelectChangeDetail>('flint-select-change', {
            detail: { value: ['opt1', 'opt2'] },
        });
        expect(event.type).toBe('flint-select-change');
        expect(event.detail.value).toEqual(['opt1', 'opt2']);
    });

    it('CustomEvent<FlintSwitchChangeDetail> carries checked in detail', () => {
        const event = new CustomEvent<FlintSwitchChangeDetail>('flint-switch-change', {
            detail: { checked: true },
        });
        expect(event.type).toBe('flint-switch-change');
        expect(event.detail.checked).toBe(true);
    });

    it('CustomEvent<FlintDialogCloseDetail> carries open: false in detail', () => {
        const event = new CustomEvent<FlintDialogCloseDetail>('flint-dialog-close', {
            detail: { open: false },
        });
        expect(event.type).toBe('flint-dialog-close');
        expect(event.detail.open).toBe(false);
    });

    it('CustomEvent<FlintSpeedDialOpenDetail> carries open: true in detail', () => {
        const event = new CustomEvent<FlintSpeedDialOpenDetail>('flint-speed-dial-open', {
            detail: { open: true },
        });
        expect(event.type).toBe('flint-speed-dial-open');
        expect(event.detail.open).toBe(true);
    });

    it('CustomEvent<FlintSpeedDialCloseDetail> carries open: false in detail', () => {
        const event = new CustomEvent<FlintSpeedDialCloseDetail>('flint-speed-dial-close', {
            detail: { open: false },
        });
        expect(event.type).toBe('flint-speed-dial-close');
        expect(event.detail.open).toBe(false);
    });
});
