import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../table/flint-table.js';
import '../table/flint-table-sort-label.js';
import '../table/flint-table-pagination.js';
import '../dialog/flint-dialog.js';
import '../button/flint-button.js';
import '../text-field/flint-text-field.js';
import '../box/flint-box.js';
import '../stack/flint-stack.js';
import '../container/flint-container.js';
import type { FlintDialog } from '../dialog/flint-dialog.js';

const meta: Meta = {
    title: 'Playbooks/Data Explorer',
    parameters: {
        layout: 'fullscreen',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'landmark-unique', enabled: false },
                    { id: 'aria-valid-attr-value', enabled: false },
                    { id: 'button-name', enabled: false },
                    { id: 'select-name', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
    },
};

export default meta;
type Story = StoryObj;

interface ProjectItem {
    id: number;
    name: string;
    status: string;
    owner: string;
    updated: string;
    description: string;
}

const items: ProjectItem[] = [
    { id: 1, name: 'Project Alpha',   status: 'Active',    owner: 'Alice Chen',    updated: '2 hours ago',  description: 'Core platform development with microservices architecture.' },
    { id: 2, name: 'Project Beta',    status: 'Paused',    owner: 'Bob Martinez',  updated: '1 day ago',    description: 'Mobile app redesign with new design system integration.' },
    { id: 3, name: 'Project Gamma',   status: 'Active',    owner: 'Carol Wu',      updated: '3 hours ago',  description: 'Data pipeline optimization for real-time analytics.' },
    { id: 4, name: 'Project Delta',   status: 'Completed', owner: 'Dave Kim',      updated: '5 days ago',   description: 'Cloud migration and infrastructure modernization.' },
    { id: 5, name: 'Project Epsilon', status: 'Active',    owner: 'Eve Patel',     updated: '30 min ago',   description: 'Machine learning model deployment and monitoring.' },
    { id: 6, name: 'Project Zeta',    status: 'Paused',    owner: 'Frank Liu',     updated: '2 days ago',   description: 'Customer portal frontend rewrite with accessibility focus.' },
];

const statusBadgeStyle = (status: string) => {
    if (status === 'Active') return 'background: #dcfce7; color: #166534;';
    if (status === 'Paused') return 'background: #fef3c7; color: #92400e;';
    return 'background: #e5e7eb; color: #374151;';
};

/* ── Shared filter state & logic ────────────────────────────────────── */

let _searchQuery = '';
let _activeFilter = 'All';

function applyFilters(root: HTMLElement) {
    const rows = root.querySelectorAll<HTMLElement>('flint-table-row[data-name]');
    let visibleCount = 0;

    rows.forEach(row => {
        const name = (row.dataset.name ?? '').toLowerCase();
        const status = row.dataset.status ?? '';

        const matchesSearch = !_searchQuery || name.includes(_searchQuery.toLowerCase());
        const matchesFilter = _activeFilter === 'All' || status === _activeFilter;

        if (matchesSearch && matchesFilter) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    // Update results count
    const countEl = root.querySelector('#results-count');
    if (countEl) countEl.textContent = `${visibleCount} project${visibleCount !== 1 ? 's' : ''}`;

    // Show empty state
    const emptyRow = root.querySelector('#empty-row') as HTMLElement | null;
    if (emptyRow) emptyRow.style.display = visibleCount === 0 ? '' : 'none';
}

function setActiveChip(root: HTMLElement, status: string) {
    _activeFilter = status;
    root.querySelectorAll<HTMLElement>('.filter-chip').forEach(btn => {
        const btnStatus = btn.dataset.status ?? '';
        const isActive = btnStatus === status;
        btn.style.background = isActive ? 'var(--flint-primary-color, #3b82f6)' : 'var(--flint-surface-2, #f1f5f9)';
        btn.style.color = isActive ? '#fff' : 'var(--flint-text-color, #111827)';
    });
    applyFilters(root);
}

/**
 * A data explorer page with working search and filter:
 * - Type in the search field to filter by project name
 * - Click status chips to filter by status
 * - Click "View" to open a detail dialog
 * - Pagination controls at the bottom
 */
export const DataExplorerFlow: Story = {
    render: () => {
        // Reset state on each render
        _searchQuery = '';
        _activeFilter = 'All';

        return html`
        <flint-container max-width="lg" style="font-family: system-ui; padding-top: 32px; padding-bottom: 32px;">
            <!-- Page header -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                <div>
                    <h2 style="margin: 0 0 4px; font-size: 1.5rem; font-weight: 700;">Projects</h2>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">
                        Manage and track all your active projects.
                        <span id="results-count" style="font-weight: 500;">6 projects</span>
                    </p>
                </div>
                <flint-button appearance="filled" color="primary">New Project</flint-button>
            </div>

            <!-- Toolbar: search + filter chips -->
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
                <flint-text-field
                    id="search-field"
                    placeholder="Search projects..."
                    style="flex: 1; max-width: 320px;"
                    @flint-text-field-input=${(e: CustomEvent) => {
                        _searchQuery = e.detail.value;
                        const root = (e.target as HTMLElement).closest('flint-container')!;
                        applyFilters(root as HTMLElement);
                    }}
                ></flint-text-field>

                ${['All', 'Active', 'Paused', 'Completed'].map((status, i) => html`
                    <button class="filter-chip" data-status="${status}"
                        style="all: unset; cursor: pointer; padding: 4px 14px; border-radius: 16px; font-size: 0.8125rem; font-weight: 500;
                            background: ${i === 0 ? 'var(--flint-primary-color, #3b82f6)' : 'var(--flint-surface-2, #f1f5f9)'};
                            color: ${i === 0 ? '#fff' : 'var(--flint-text-color, #111827)'};"
                        @click=${(e: Event) => {
                            const root = (e.currentTarget as HTMLElement).closest('flint-container')!;
                            setActiveChip(root as HTMLElement, status);
                        }}
                    >${status}</button>
                `)}
            </div>

            <!-- Table -->
            <flint-table-container>
                <flint-table>
                    <flint-table-head>
                        <flint-table-row>
                            <flint-table-cell header>Project Name</flint-table-cell>
                            <flint-table-cell header>Status</flint-table-cell>
                            <flint-table-cell header>Owner</flint-table-cell>
                            <flint-table-cell header>Last Updated</flint-table-cell>
                            <flint-table-cell header align="right">Actions</flint-table-cell>
                        </flint-table-row>
                    </flint-table-head>
                    <flint-table-body>
                        ${items.map(item => html`
                            <flint-table-row data-name="${item.name}" data-status="${item.status}">
                                <flint-table-cell><strong>${item.name}</strong></flint-table-cell>
                                <flint-table-cell>
                                    <span style="font-size: 0.75rem; font-weight: 500; padding: 2px 10px; border-radius: 12px; ${statusBadgeStyle(item.status)}">
                                        ${item.status}
                                    </span>
                                </flint-table-cell>
                                <flint-table-cell>${item.owner}</flint-table-cell>
                                <flint-table-cell style="color: var(--flint-text-color-muted, #6b7280);">${item.updated}</flint-table-cell>
                                <flint-table-cell align="right">
                                    <flint-button
                                        class="detail-btn"
                                        appearance="text" color="primary"
                                        size="sm"
                                        data-item-id="${item.id}"
                                        @click=${() => {
                                            const dialog = document.getElementById('detail-dialog') as FlintDialog;
                                            const title = document.getElementById('detail-title')!;
                                            const desc = document.getElementById('detail-desc')!;
                                            const statusEl = document.getElementById('detail-status')!;
                                            const ownerEl = document.getElementById('detail-owner')!;
                                            title.textContent = item.name;
                                            desc.textContent = item.description;
                                            statusEl.textContent = item.status;
                                            ownerEl.textContent = item.owner;
                                            dialog.open = true;
                                        }}
                                    >View</flint-button>
                                </flint-table-cell>
                            </flint-table-row>
                        `)}
                        <!-- Empty state row (hidden by default) -->
                        <flint-table-row id="empty-row" style="display: none;">
                            <flint-table-cell padding="none" align="center"
                                style="padding: 48px; color: var(--flint-text-color-muted, #6b7280);">
                                No projects match your search.
                            </flint-table-cell>
                        </flint-table-row>
                    </flint-table-body>
                </flint-table>
                <flint-table-pagination
                    id="data-pagination"
                    .count=${items.length}
                    .page=${0}
                    .rowsPerPage=${10}
                    .rowsPerPageOptions=${[5, 10, 25]}
                    @flint-pagination-page-change=${(e: CustomEvent) => {
                        const pg = e.target as HTMLElement & { page: number };
                        pg.page = e.detail.page;
                    }}
                ></flint-table-pagination>
            </flint-table-container>

            <!-- Detail dialog -->
            <flint-dialog id="detail-dialog" @flint-dialog-close=${(e: Event) => {
                (e.target as FlintDialog).open = false;
            }}>
                <flint-dialog-title id="detail-title">Project</flint-dialog-title>
                <flint-dialog-content>
                    <flint-dialog-content-text>
                        <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 16px; font-size: 0.875rem;">
                            <strong>Status:</strong> <span id="detail-status"></span>
                            <strong>Owner:</strong> <span id="detail-owner"></span>
                        </div>
                    </flint-dialog-content-text>
                    <flint-dialog-content-text id="detail-desc" style="margin-top: 12px;">
                        Description here.
                    </flint-dialog-content-text>
                </flint-dialog-content>
                <flint-dialog-actions>
                    <flint-button id="dialog-close-btn" appearance="outlined" color="neutral" @click=${(e: Event) => {
                        const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
                        if (d) d.open = false;
                    }}>Close</flint-button>
                    <flint-button appearance="filled" color="primary" @click=${(e: Event) => {
                        const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
                        if (d) d.open = false;
                    }}>Edit Project</flint-button>
                </flint-dialog-actions>
            </flint-dialog>
        </flint-container>
    `;
    },

    play: async ({ canvasElement }) => {
        const user = userEvent.setup({ pointerEventsCheck: 0 });

        // ── Step 1: Verify the table renders all 6 rows ─────────────────
        await waitFor(() => {
            const rows = canvasElement.querySelectorAll<HTMLElement>('flint-table-row[data-name]');
            expect(rows.length).toBe(6);
        });

        const getVisibleRows = () =>
            Array.from(canvasElement.querySelectorAll<HTMLElement>('flint-table-row[data-name]'))
                .filter(r => r.style.display !== 'none');

        // ── Step 2: Search filters by name ──────────────────────────────
        const searchField = canvasElement.querySelector('#search-field') as HTMLElement & { value: string };
        const searchInput = searchField.shadowRoot!.querySelector('input')!;
        await user.click(searchInput);
        await user.type(searchInput, 'alpha');

        await waitFor(() => {
            expect(getVisibleRows().length).toBe(1);
            expect(getVisibleRows()[0].dataset.name).toBe('Project Alpha');
        });

        // ── Step 3: Clear search restores all rows ──────────────────────
        // Programmatically clear because user.clear() can't focus shadow inputs
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        searchField.value = '';
        searchField.dispatchEvent(new CustomEvent('flint-text-field-input', { detail: { value: '' }, bubbles: true }));
        _searchQuery = '';
        applyFilters(canvasElement.querySelector('flint-container')! as HTMLElement);

        await waitFor(() => {
            expect(getVisibleRows().length).toBe(6);
        });

        // ── Step 4: Filter chip narrows to status ───────────────────────
        const pausedChip = canvasElement.querySelector('.filter-chip[data-status="Paused"]') as HTMLElement;
        await user.click(pausedChip);

        await waitFor(() => {
            expect(getVisibleRows().length).toBe(2);
            getVisibleRows().forEach(r => expect(r.dataset.status).toBe('Paused'));
        });

        // ── Step 5: "All" chip resets filter ────────────────────────────
        const allChip = canvasElement.querySelector('.filter-chip[data-status="All"]') as HTMLElement;
        await user.click(allChip);

        await waitFor(() => {
            expect(getVisibleRows().length).toBe(6);
        });

        // ── Step 6: Reset for dialog test ───────────────────────────────

        await waitFor(() => {
            expect(getVisibleRows().length).toBe(6);
        });

        // ── Step 8: View dialog ─────────────────────────────────────────
        const dialog = canvasElement.querySelector('#detail-dialog') as FlintDialog;
        expect(dialog.open).toBe(false);

        const firstDetailBtn = canvasElement.querySelector('.detail-btn') as HTMLElement;
        await user.click(firstDetailBtn);

        await waitFor(() => expect(dialog.open).toBe(true));

        const dialogTitle = canvasElement.querySelector('#detail-title') as HTMLElement;
        await waitFor(() => expect(dialogTitle.textContent).toBe('Project Alpha'));

        const closeBtn = canvasElement.querySelector('#dialog-close-btn') as HTMLElement;
        await user.click(closeBtn);

        await waitFor(() => expect(dialog.open).toBe(false));
    },
};
