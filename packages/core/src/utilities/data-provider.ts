import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Parameters for loading a page of data.
 */
export interface DataProviderParams {
    /** Zero-based page number. */
    page: number;
    /** Number of items per page. */
    pageSize: number;
    /** Optional sort field name. */
    sortField?: string;
    /** Optional sort direction. */
    sortDirection?: 'asc' | 'desc';
    /** Optional search/filter query. */
    query?: string;
}

/**
 * Result returned from the fetch function.
 */
export interface DataProviderResult<T> {
    /** The items for the requested page. */
    items: T[];
    /** Total item count (for pagination calculations). -1 if unknown. */
    totalCount?: number;
}

/**
 * A function that fetches data given pagination/sort/filter params.
 */
export type DataFetchFn<T> = (params: DataProviderParams) => Promise<DataProviderResult<T>>;

/**
 * A reactive controller for lazy-loading paginated data [§38.1].
 *
 * Manages loading state, pagination, and error handling for components
 * that need to fetch data from a remote source.
 *
 * @example
 * ```ts
 * class MyList extends LitElement {
 *   private _data = new DataProvider<User>(this, async (params) => {
 *     const res = await fetch(`/api/users?page=${params.page}&size=${params.pageSize}`);
 *     const json = await res.json();
 *     return { items: json.data, totalCount: json.total };
 *   });
 *
 *   async connectedCallback() {
 *     super.connectedCallback();
 *     await this._data.load({ page: 0, pageSize: 20 });
 *   }
 *
 *   render() {
 *     if (this._data.loading) return html`<flint-skeleton></flint-skeleton>`;
 *     if (this._data.error) return html`<p>Error: ${this._data.error.message}</p>`;
 *     return html`${this._data.items.map(u => html`<div>${u.name}</div>`)}`;
 *   }
 * }
 * ```
 */
export class DataProvider<T> implements ReactiveController {
    private _host: ReactiveControllerHost;
    private _fetchFn: DataFetchFn<T>;
    private _abortController: AbortController | null = null;

    /** The loaded items for the current page. */
    items: T[] = [];

    /** Whether a load operation is in progress. */
    loading = false;

    /** The error from the last failed load, if any. */
    error: Error | null = null;

    /** Total item count reported by the last fetch. -1 if unknown. */
    totalCount = -1;

    /** Current page number (zero-based). */
    page = 0;

    /** Current page size. */
    pageSize = 20;

    constructor(host: ReactiveControllerHost, fetchFn: DataFetchFn<T>) {
        this._host = host;
        this._fetchFn = fetchFn;
        host.addController(this);
    }

    hostConnected(): void {
        // no-op — data is loaded on demand via load()
    }

    hostDisconnected(): void {
        this.abort();
    }

    /**
     * Load a page of data. Triggers a host update when loading starts
     * and again when loading completes or fails.
     */
    async load(params?: Partial<DataProviderParams>): Promise<void> {
        // Abort any in-flight request
        this.abort();

        this.page = params?.page ?? this.page;
        this.pageSize = params?.pageSize ?? this.pageSize;
        this.loading = true;
        this.error = null;
        this._host.requestUpdate();

        this._abortController = new AbortController();
        const signal = this._abortController.signal;

        try {
            const result = await this._fetchFn({
                page: this.page,
                pageSize: this.pageSize,
                sortField: params?.sortField,
                sortDirection: params?.sortDirection,
                query: params?.query,
            });

            // Check if aborted while waiting (use local ref since abort() nulls the controller)
            if (signal.aborted) return;

            this.items = result.items;
            this.totalCount = result.totalCount ?? -1;
        } catch (err) {
            if (signal.aborted) return;
            this.error = err instanceof Error ? err : new Error(String(err));
            this.items = [];
        } finally {
            this.loading = false;
            this._abortController = null;
            this._host.requestUpdate();
        }
    }

    /** Load the next page. */
    async nextPage(): Promise<void> {
        await this.load({ page: this.page + 1 });
    }

    /** Load the previous page (clamped to 0). */
    async previousPage(): Promise<void> {
        await this.load({ page: Math.max(0, this.page - 1) });
    }

    /** Abort the current in-flight request, if any. */
    abort(): void {
        if (this._abortController) {
            this._abortController.abort();
            this._abortController = null;
        }
    }

    /** Reload the current page. */
    async reload(): Promise<void> {
        await this.load({ page: this.page, pageSize: this.pageSize });
    }

    /** Whether there are potentially more pages (based on totalCount). */
    get hasMore(): boolean {
        if (this.totalCount === -1) return this.items.length >= this.pageSize;
        return (this.page + 1) * this.pageSize < this.totalCount;
    }

    /** Total number of pages (based on totalCount). -1 if unknown. */
    get totalPages(): number {
        if (this.totalCount === -1) return -1;
        return Math.ceil(this.totalCount / this.pageSize);
    }
}
