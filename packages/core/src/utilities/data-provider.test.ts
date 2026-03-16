import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fixture } from '@open-wc/testing';
import { DataProvider } from './data-provider.js';
import type { DataFetchFn, DataProviderResult } from './data-provider.js';

// ── Test host element ───────────────────────────────────────────────────────

interface TestItem {
    id: number;
    name: string;
}

let fetchFn: ReturnType<typeof vi.fn<DataFetchFn<TestItem>>>;

@customElement('test-data-provider-host')
class TestDataProviderHost extends LitElement {
    provider!: DataProvider<TestItem>;

    connectedCallback() {
        super.connectedCallback();
        this.provider = new DataProvider<TestItem>(this, fetchFn);
    }

    render() {
        return html`<slot></slot>`;
    }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function makeResult(items: TestItem[], totalCount?: number): DataProviderResult<TestItem> {
    return { items, totalCount };
}

const sampleItems: TestItem[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
];

// ── Tests ───────────────────────────────────────────────────────────────────

describe('DataProvider', () => {
    beforeEach(() => {
        fetchFn = vi.fn<DataFetchFn<TestItem>>().mockResolvedValue(makeResult(sampleItems, 100));
    });

    async function createHost(): Promise<TestDataProviderHost> {
        return fixture<TestDataProviderHost>(html`<test-data-provider-host></test-data-provider-host>`);
    }

    // ── Initial state ───────────────────────────────────────────────────────

    it('items starts empty', async () => {
        const el = await createHost();
        expect(el.provider.items).toEqual([]);
    });

    it('loading starts false', async () => {
        const el = await createHost();
        expect(el.provider.loading).toBe(false);
    });

    it('error starts null', async () => {
        const el = await createHost();
        expect(el.provider.error).toBeNull();
    });

    // ── load() ──────────────────────────────────────────────────────────────

    it('load() sets loading=true then false', async () => {
        const el = await createHost();
        const loadingStates: boolean[] = [];

        const originalRequestUpdate = el.requestUpdate.bind(el);
        vi.spyOn(el, 'requestUpdate').mockImplementation(() => {
            loadingStates.push(el.provider.loading);
            return originalRequestUpdate();
        });

        await el.provider.load();

        // First requestUpdate: loading=true, second: loading=false
        expect(loadingStates[0]).toBe(true);
        expect(loadingStates[loadingStates.length - 1]).toBe(false);
    });

    it('load() stores fetched items', async () => {
        const el = await createHost();
        await el.provider.load();
        expect(el.provider.items).toEqual(sampleItems);
    });

    it('load() stores totalCount', async () => {
        const el = await createHost();
        await el.provider.load();
        expect(el.provider.totalCount).toBe(100);
    });

    it('load() defaults totalCount to -1 when not provided', async () => {
        fetchFn.mockResolvedValueOnce({ items: sampleItems });
        const el = await createHost();
        await el.provider.load();
        expect(el.provider.totalCount).toBe(-1);
    });

    it('load() handles fetch errors (sets error, clears items)', async () => {
        fetchFn.mockRejectedValueOnce(new Error('Network failure'));
        const el = await createHost();
        await el.provider.load();

        expect(el.provider.error).toBeInstanceOf(Error);
        expect(el.provider.error!.message).toBe('Network failure');
        expect(el.provider.items).toEqual([]);
    });

    it('load() wraps non-Error throws into Error', async () => {
        fetchFn.mockRejectedValueOnce('string error');
        const el = await createHost();
        await el.provider.load();

        expect(el.provider.error).toBeInstanceOf(Error);
        expect(el.provider.error!.message).toBe('string error');
    });

    it('load() updates page and pageSize from params', async () => {
        const el = await createHost();
        await el.provider.load({ page: 2, pageSize: 10 });

        expect(el.provider.page).toBe(2);
        expect(el.provider.pageSize).toBe(10);
        expect(fetchFn).toHaveBeenCalledWith(
            expect.objectContaining({ page: 2, pageSize: 10 }),
        );
    });

    // ── Pagination ──────────────────────────────────────────────────────────

    it('nextPage() increments page', async () => {
        const el = await createHost();
        await el.provider.load({ page: 0 });
        await el.provider.nextPage();
        expect(el.provider.page).toBe(1);
    });

    it('previousPage() decrements page (clamped to 0)', async () => {
        const el = await createHost();
        await el.provider.load({ page: 0 });
        await el.provider.previousPage();
        expect(el.provider.page).toBe(0);
    });

    it('previousPage() decrements from a higher page', async () => {
        const el = await createHost();
        await el.provider.load({ page: 3 });
        await el.provider.previousPage();
        expect(el.provider.page).toBe(2);
    });

    // ── abort() ─────────────────────────────────────────────────────────────

    it('abort() cancels in-flight requests', async () => {
        let resolveFetch!: (value: DataProviderResult<TestItem>) => void;
        fetchFn.mockImplementationOnce(() => new Promise(resolve => { resolveFetch = resolve; }));

        const el = await createHost();
        const loadPromise = el.provider.load();

        // Abort while still loading
        el.provider.abort();
        expect(el.provider.loading).toBe(true); // still true until finally block

        // Resolve the fetch (should be ignored since aborted)
        resolveFetch(makeResult(sampleItems, 100));
        await loadPromise;

        // Items should remain empty since the request was aborted
        expect(el.provider.items).toEqual([]);
    });

    // ── reload() ────────────────────────────────────────────────────────────

    it('reload() re-fetches current page', async () => {
        const el = await createHost();
        await el.provider.load({ page: 2, pageSize: 15 });

        fetchFn.mockClear();
        await el.provider.reload();

        expect(fetchFn).toHaveBeenCalledWith(
            expect.objectContaining({ page: 2, pageSize: 15 }),
        );
    });

    // ── Computed properties ─────────────────────────────────────────────────

    it('hasMore correctly computes based on totalCount and pageSize', async () => {
        fetchFn.mockResolvedValueOnce(makeResult(sampleItems, 100));
        const el = await createHost();
        el.provider.pageSize = 20;
        await el.provider.load({ page: 0 });

        // 100 items, page 0, pageSize 20 → (0+1)*20 = 20 < 100 → true
        expect(el.provider.hasMore).toBe(true);
    });

    it('hasMore returns false on last page', async () => {
        fetchFn.mockResolvedValueOnce(makeResult(sampleItems, 20));
        const el = await createHost();
        el.provider.pageSize = 20;
        await el.provider.load({ page: 0 });

        // 20 items, page 0, pageSize 20 → (0+1)*20 = 20 < 20 → false
        expect(el.provider.hasMore).toBe(false);
    });

    it('hasMore uses items.length heuristic when totalCount is unknown', async () => {
        fetchFn.mockResolvedValueOnce({ items: sampleItems }); // no totalCount
        const el = await createHost();
        el.provider.pageSize = 20;
        await el.provider.load({ page: 0 });

        // 3 items < pageSize 20 → false (likely no more)
        expect(el.provider.hasMore).toBe(false);
    });

    it('totalPages correctly computes', async () => {
        fetchFn.mockResolvedValueOnce(makeResult(sampleItems, 100));
        const el = await createHost();
        el.provider.pageSize = 20;
        await el.provider.load();

        expect(el.provider.totalPages).toBe(5); // ceil(100/20)
    });

    it('totalPages returns -1 when totalCount is unknown', async () => {
        fetchFn.mockResolvedValueOnce({ items: sampleItems });
        const el = await createHost();
        await el.provider.load();

        expect(el.provider.totalPages).toBe(-1);
    });

    // ── hostDisconnected ────────────────────────────────────────────────────

    it('hostDisconnected aborts in-flight request', async () => {
        let resolveFetch!: (value: DataProviderResult<TestItem>) => void;
        fetchFn.mockImplementationOnce(() => new Promise(resolve => { resolveFetch = resolve; }));

        const el = await createHost();
        const loadPromise = el.provider.load();

        // Simulate disconnect
        el.provider.hostDisconnected();

        resolveFetch(makeResult(sampleItems, 100));
        await loadPromise;

        // Items should remain empty since aborted on disconnect
        expect(el.provider.items).toEqual([]);
    });
});
