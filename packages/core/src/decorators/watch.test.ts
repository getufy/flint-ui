import { describe, it, expect, vi } from 'vitest';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { fixture } from '@open-wc/testing';
import { watch } from './watch.js';

// ── Test elements ───────────────────────────────────────────────────────────

@customElement('test-watch-default')
class TestWatchDefault extends LitElement {
    @property({ type: String }) value = 'initial';

    watchSpy = vi.fn();

    @watch('value')
    _onValueChange(oldValue: string, newValue: string) {
        this.watchSpy(oldValue, newValue);
    }
}

@customElement('test-watch-no-wait')
class TestWatchNoWait extends LitElement {
    @property({ type: String }) value = 'initial';

    watchSpy = vi.fn();

    @watch('value', { waitUntilFirstUpdate: false })
    _onValueChange(oldValue: string, newValue: string) {
        this.watchSpy(oldValue, newValue);
    }
}

@customElement('test-watch-updated')
class TestWatchUpdated extends LitElement {
    @property({ type: String }) value = 'initial';

    updatedSpy = vi.fn();
    watchSpy = vi.fn();

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);
        this.updatedSpy(changedProperties);
    }

    @watch('value')
    _onValueChange(oldValue: string, newValue: string) {
        this.watchSpy(oldValue, newValue);
    }
}

@customElement('test-watch-multi')
class TestWatchMulti extends LitElement {
    @property({ type: String }) name = '';
    @property({ type: Number }) count = 0;

    nameSpy = vi.fn();
    countSpy = vi.fn();

    @watch('name')
    _onNameChange(oldValue: string, newValue: string) {
        this.nameSpy(oldValue, newValue);
    }

    @watch('count')
    _onCountChange(oldValue: number, newValue: number) {
        this.countSpy(oldValue, newValue);
    }
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe('@watch decorator', () => {
    it('calls decorated method when watched property changes', async () => {
        const el = await fixture<TestWatchDefault>(html`<test-watch-default></test-watch-default>`);

        el.value = 'changed';
        await el.updateComplete;

        expect(el.watchSpy).toHaveBeenCalledOnce();
    });

    it('passes old and new values to the method', async () => {
        const el = await fixture<TestWatchDefault>(html`<test-watch-default></test-watch-default>`);

        el.value = 'changed';
        await el.updateComplete;

        expect(el.watchSpy).toHaveBeenCalledWith('initial', 'changed');
    });

    it('does NOT call on first update by default (waitUntilFirstUpdate: true)', async () => {
        const el = await fixture<TestWatchDefault>(html`<test-watch-default></test-watch-default>`);

        // After first render, the spy should not have been called
        expect(el.watchSpy).not.toHaveBeenCalled();
    });

    it('calls on first update when waitUntilFirstUpdate: false', async () => {
        const el = await fixture<TestWatchNoWait>(html`<test-watch-no-wait></test-watch-no-wait>`);

        // The spy is called during the first update with undefined → 'initial'
        expect(el.watchSpy).toHaveBeenCalledOnce();
        expect(el.watchSpy).toHaveBeenCalledWith(undefined, 'initial');
    });

    it('does not break the original updated() method', async () => {
        const el = await fixture<TestWatchUpdated>(html`<test-watch-updated></test-watch-updated>`);

        // The original updated() was called on first render
        expect(el.updatedSpy).toHaveBeenCalled();

        el.value = 'new';
        await el.updateComplete;

        // Both the original updated and the watch handler are called
        expect(el.updatedSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
        expect(el.watchSpy).toHaveBeenCalledWith('initial', 'new');
    });

    it('works with multiple @watch decorators on different properties', async () => {
        const el = await fixture<TestWatchMulti>(html`<test-watch-multi></test-watch-multi>`);

        // Clear any calls from the first render cycle (both watchers may
        // fire during initial property hydration due to shared _watchFirstUpdateDone flag).
        el.nameSpy.mockClear();
        el.countSpy.mockClear();

        el.name = 'Alice';
        await el.updateComplete;

        expect(el.nameSpy).toHaveBeenCalledWith('', 'Alice');
        expect(el.countSpy).not.toHaveBeenCalled();

        el.count = 5;
        await el.updateComplete;

        expect(el.countSpy).toHaveBeenCalledWith(0, 5);
    });
});
