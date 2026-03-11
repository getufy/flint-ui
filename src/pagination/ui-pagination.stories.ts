import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiPagination } from './ui-pagination';
import './ui-pagination';
import '../box/ui-box';
import '../paper/ui-paper';
import '../stack/ui-stack';

const meta: Meta = {
    title: 'Navigation/Pagination',
    component: 'ui-pagination',
    argTypes: {
        count: { control: { type: 'number', min: 1 } },
        page: { control: { type: 'number', min: 1 } },
        defaultPage: { control: { type: 'number', min: 1 } },
        label: { control: 'text' },
        variant: { control: { type: 'select' }, options: ['text', 'outlined'] },
        shape: { control: { type: 'select' }, options: ['circular', 'rounded', 'square'] },
        size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
        color: { control: { type: 'select' }, options: ['primary', 'secondary', 'standard'] },
        showFirstButton: { control: 'boolean' },
        showLastButton: { control: 'boolean' },
        hidePrevButton: { control: 'boolean' },
        hideNextButton: { control: 'boolean' },
        siblingCount: { control: { type: 'number', min: 0 } },
        boundaryCount: { control: { type: 'number', min: 0 } },
        disabled: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj;

const box = (title: string, content: unknown) => html`
    <ui-stack direction="column" gap="8px" p="0 0 4px">
        <span style="font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;">${title}</span>
        ${content}
    </ui-stack>
`;

const section = (content: unknown) => html`
    <ui-paper elevation="1">
        <ui-stack direction="column" gap="24px" p="24px" style="font-family:Inter,sans-serif;">
            ${content}
        </ui-stack>
    </ui-paper>
`;

/* ================================================================== */
/* Playground                                                           */
/* ================================================================== */
export const Playground: Story = {
    args: {
        count: 10, page: 1, variant: 'text', shape: 'circular',
        size: 'medium', color: 'primary', showFirstButton: false,
        showLastButton: false, hidePrevButton: false, hideNextButton: false,
        siblingCount: 1, boundaryCount: 1, disabled: false, label: '',
    },
    render: (args) => html`
        <ui-paper elevation="1" style="padding:24px;font-family:Inter,sans-serif;">
            <ui-pagination
                count=${args.count}
                page=${args.page}
                .variant=${args.variant}
                .shape=${args.shape}
                .size=${args.size}
                .color=${args.color}
                ?show-first-button=${args.showFirstButton}
                ?show-last-button=${args.showLastButton}
                ?hide-prev-button=${args.hidePrevButton}
                ?hide-next-button=${args.hideNextButton}
                .siblingCount=${args.siblingCount}
                .boundaryCount=${args.boundaryCount}
                ?disabled=${args.disabled}
                .label=${args.label}
                @ui-pagination-change=${(e: CustomEvent) => {
            (e.currentTarget as UiPagination).page = e.detail.page;
        }}
            ></ui-pagination>
        </ui-paper>
    `,
};

/* ================================================================== */
/* Basic                                                               */
/* ================================================================== */
export const Basic: Story = {
    render: () => section(html`
        ${box('Default (text)', html`
            <ui-pagination count="10" page="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Disabled', html`
            <ui-pagination count="10" page="3" disabled></ui-pagination>
        `)}
        ${box('No boundary (siblingCount=2)', html`
            <ui-pagination count="10" page="6" sibling-count="2"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Outlined                                                            */
/* ================================================================== */
export const Outlined: Story = {
    render: () => section(html`
        ${box('Outlined', html`
            <ui-pagination count="10" page="1" variant="outlined"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Outlined + Rounded', html`
            <ui-pagination count="10" page="4" variant="outlined" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Rounded                                                             */
/* ================================================================== */
export const Rounded: Story = {
    render: () => section(html`
        ${box('Text + Rounded', html`
            <ui-pagination count="10" page="1" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Outlined + Rounded', html`
            <ui-pagination count="10" page="3" variant="outlined" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Text + Square', html`
            <ui-pagination count="10" page="5" shape="square"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Sizes                                                               */
/* ================================================================== */
export const Sizes: Story = {
    render: () => section(html`
        ${box('Small', html`
            <ui-pagination count="10" page="1" size="small"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Medium (default)', html`
            <ui-pagination count="10" page="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Large', html`
            <ui-pagination count="10" page="1" size="large"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Buttons                                                             */
/* ================================================================== */
export const Buttons: Story = {
    render: () => section(html`
        ${box('Show first & last buttons', html`
            <ui-pagination count="10" page="5" show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Hide prev & next buttons', html`
            <ui-pagination count="10" page="5" hide-prev-button hide-next-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('All four navigation buttons', html`
            <ui-pagination count="10" page="5" show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Custom Icons (via slots)                                            */
/* ================================================================== */
export const CustomIcons: Story = {
    render: () => section(html`
        ${box('Emoji prev/next via slots', html`
            <ui-pagination count="10" page="5" show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
                <span slot="first-icon">⏮</span>
                <span slot="prev-icon">←</span>
                <span slot="next-icon">→</span>
                <span slot="last-icon">⏭</span>
            </ui-pagination>
        `)}
        ${box('Text labels via slots', html`
            <ui-pagination count="10" page="3" variant="outlined" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
                <span slot="prev-icon" style="font-size:.8rem;padding:0 4px;">‹ Prev</span>
                <span slot="next-icon" style="font-size:.8rem;padding:0 4px;">Next ›</span>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Pagination Ranges                                                   */
/* ================================================================== */
export const PaginationRanges: Story = {
    render: () => section(html`
        ${box('siblingCount=0', html`
            <ui-pagination count="11" page="6" sibling-count="0"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('siblingCount=1 (default)', html`
            <ui-pagination count="11" page="6" sibling-count="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('siblingCount=2', html`
            <ui-pagination count="11" page="6" sibling-count="2"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('boundaryCount=2', html`
            <ui-pagination count="11" page="6" boundary-count="2"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Controlled                                                          */
/* ================================================================== */
export const Controlled: Story = {
    render: () => {
        let page = 3;

        const handleChange = (e: CustomEvent) => {
            page = e.detail.page;
            const container = e.currentTarget as HTMLElement;
            const pagination = container.querySelector<UiPagination>('ui-pagination');
            const label = container.querySelector<HTMLElement>('#cp-label');
            const range = container.querySelector<HTMLElement>('#cp-range');
            if (pagination) pagination.page = page;
            if (label) label.textContent = String(page);
            if (range) range.textContent = `${(page - 1) * 10 + 1}–${Math.min(page * 10, 95)} of 95`;
        };

        return html`
            <ui-paper elevation="1" @ui-pagination-change=${handleChange}>
                <ui-stack direction="column" gap="16px" p="24px" style="font-family:Inter,sans-serif;">
                    <ui-stack direction="row" alignItems="center" gap="12px" fontSize=".875rem" color="#64748b">
                        <span>Current page:</span>
                        <strong id="cp-label" style="font-size:1.1rem;color:#1e293b;">${page}</strong>
                        <span style="color:#94a3b8;">/ 10</span>
                    </ui-stack>

                <ui-pagination
                    count="10"
                    page=${page}
                    variant="outlined"
                    show-first-button
                    show-last-button
                ></ui-pagination>

                    <ui-box bgcolor="var(--ui-muted-background, #f8fafc)" borderRadius="6px" p="12px 16px" style="font-size:.825rem;color:#64748b;border:1px solid #e2e8f0;">
                        Showing items <strong id="cp-range">${(page - 1) * 10 + 1}–${Math.min(page * 10, 95)} of 95</strong>
                    </ui-box>
                </ui-stack>
            </ui-paper>
        `;
    },
};

/* ================================================================== */
/* Uncontrolled (defaultPage)                                          */
/* ================================================================== */
export const Uncontrolled: Story = {
    render: () => section(html`
        ${box('defaultPage=5 — no event handler needed', html`
            <ui-pagination count="10" default-page="5"></ui-pagination>
        `)}
        ${box('defaultPage=3 + outlined', html`
            <ui-pagination count="10" default-page="3" variant="outlined" show-first-button show-last-button></ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Colors                                                              */
/* ================================================================== */
export const Colors: Story = {
    render: () => section(html`
        ${box('Primary (default)', html`
            <ui-pagination count="10" page="5" color="primary"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Secondary', html`
            <ui-pagination count="10" page="5" color="secondary"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Standard', html`
            <ui-pagination count="10" page="5" color="standard"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Secondary + Outlined', html`
            <ui-pagination count="10" page="5" color="secondary" variant="outlined"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Edge Cases                                                          */
/* ================================================================== */
export const EdgeCases: Story = {
    render: () => section(html`
        ${box('count=1 — single page, all nav disabled', html`
            <ui-pagination count="1" page="1" show-first-button show-last-button></ui-pagination>
        `)}
        ${box('count=2 — minimal', html`
            <ui-pagination count="2" page="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('count=100, page=50 — large range with both ellipses', html`
            <ui-pagination count="100" page="50" show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('count=100, page=1 — at start', html`
            <ui-pagination count="100" page="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('count=100, page=100 — at end', html`
            <ui-pagination count="100" page="100"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Accessibility Demo                                                  */
/* ================================================================== */
export const Accessibility: Story = {
    render: () => section(html`
        ${box('Custom aria-label for context (label prop)', html`
            <ui-pagination count="10" page="3" label="article pages"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Custom aria-label — search results', html`
            <ui-pagination count="20" page="5" label="search result pages" variant="outlined"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('All navigation buttons with descriptive label', html`
            <ui-pagination count="10" page="5"
                label="product listing pages"
                show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Table Pagination Style                                              */
/* ================================================================== */
export const TablePaginationStyle: Story = {
    render: () => {
        let page = 0;
        let rowsPerPage = 5;
        const totalRows = 23;
        const rows = Array.from({ length: totalRows }, (_, i) => ({
            id: i + 1,
            name: ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan', 'Fiona', 'George', 'Hannah',
                'Ivan', 'Julia', 'Kevin', 'Laura', 'Mike', 'Nora', 'Oscar', 'Pam',
                'Quinn', 'Ray', 'Sophia', 'Tom', 'Uma', 'Victor', 'Wendy'][i],
            role: ['Engineer', 'Designer', 'Manager', 'Engineer', 'Designer'][i % 5],
        }));

        function getRows() { return rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage); }
        const totalPages = () => Math.ceil(totalRows / rowsPerPage);

        // Single source of truth for all DOM updates
        function syncAll() {
            const pg = document.getElementById('tp-pg') as UiPagination | null;
            const range = document.getElementById('tp-range');
            const tbody = document.getElementById('tp-tbody');
            const prevBtn = document.getElementById('tp-prev') as HTMLButtonElement | null;
            const nextBtn = document.getElementById('tp-next') as HTMLButtonElement | null;
            const rowStr = getRows().map(r =>
                `<tr style="border-bottom:1px solid #f1f5f9;">` +
                `<td style="padding:10px 16px;color:#6b7280;">${r.id}</td>` +
                `<td style="padding:10px 16px;color:#111827;">${r.name}</td>` +
                `<td style="padding:10px 16px;color:#6b7280;">${r.role}</td></tr>`
            ).join('');
            if (pg) { pg.count = totalPages(); pg.page = page + 1; }
            if (range) range.textContent = `${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`;
            if (tbody) tbody.innerHTML = rowStr;
            if (prevBtn) prevBtn.disabled = page === 0;
            if (nextBtn) nextBtn.disabled = page >= totalPages() - 1;
        }

        return html`
            <ui-paper elevation="1" style="font-family:Inter,sans-serif;overflow:hidden;">
                <!-- Table -->
                <table style="width:100%;border-collapse:collapse;font-size:.875rem;">
                    <thead>
                        <tr style="background:var(--ui-muted-background, #f8fafc);border-bottom:1px solid #e2e8f0;">
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">#</th>
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">Name</th>
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">Role</th>
                        </tr>
                    </thead>
                    <tbody id="tp-tbody">
                        ${getRows().map(row => html`
                            <tr style="border-bottom:1px solid #f1f5f9;">
                                <td style="padding:10px 16px;color:#6b7280;">${row.id}</td>
                                <td style="padding:10px 16px;color:#111827;">${row.name}</td>
                                <td style="padding:10px 16px;color:#6b7280;">${row.role}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>

                <!-- Pagination bar -->
                <ui-stack direction="row" alignItems="center" justifyContent="flex-end" gap="16px" p="10px 16px" borderTop="1px solid #e2e8f0" fontSize=".8rem" color="#6b7280" style="flex-wrap:wrap;">
                    <ui-stack direction="row" alignItems="center" gap="8px">
                        <span>Rows per page:</span>
                        <select
                            style="border:1px solid #e2e8f0;border-radius:4px;padding:2px 6px;font-size:.8rem;outline:none;background:var(--ui-background, #fff);cursor:pointer;"
                            @change=${(e: Event) => {
                rowsPerPage = parseInt((e.target as HTMLSelectElement).value);
                page = 0;
                syncAll();
            }}
                        >
                            ${[5, 10, 25].map(n => html`<option value=${n} ?selected=${n === rowsPerPage}>${n}</option>`)}
                        </select>
                    </ui-stack>

                    <span id="tp-range">${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}</span>

                    <ui-pagination
                        id="tp-pg"
                        count=${totalPages()}
                        page=${page + 1}
                        size="small"
                        hide-prev-button
                        hide-next-button
                        @ui-pagination-change=${(e: CustomEvent) => {
                page = e.detail.page - 1;
                syncAll();
            }}
                    ></ui-pagination>

                    <ui-stack direction="row" gap="2px">
                        <button
                            id="tp-prev"
                            style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;color:#374151;"
                            ?disabled=${page === 0}
                            @click=${() => { if (page > 0) { page--; syncAll(); } }}
                        ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
                        <button
                            id="tp-next"
                            style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;color:#374151;"
                            ?disabled=${page >= totalPages() - 1}
                            @click=${() => { if (page < totalPages() - 1) { page++; syncAll(); } }}
                        ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
                    </ui-stack>
                </ui-stack>
            </ui-paper>
        `;
    },
};
