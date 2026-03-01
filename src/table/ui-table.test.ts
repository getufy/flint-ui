import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-table.js';
import './ui-table-sort-label.js';
import './ui-table-pagination.js';
import type { UiTable, UiTableRow, UiTableCell } from './ui-table';

describe('ui-table system', () => {
    it('renders a simple table structure', async () => {
        const el = await fixture<UiTable>(html`
      <ui-table>
        <ui-table-head>
          <ui-table-row>
            <ui-table-cell header>Name</ui-table-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell>John Doe</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    `);

        expect(el.querySelector('ui-table-cell[header]')!.textContent).toBe('Name');
        expect(el.querySelector('ui-table-body ui-table-cell')!.textContent).toBe('John Doe');
    });

    it('applies selected state to rows', async () => {
        const el = await fixture<UiTableRow>(html`
      <ui-table-row selected></ui-table-row>
    `);
        expect(el.hasAttribute('selected')).toBe(true);
    });

    it('handles alignment in cells', async () => {
        const el = await fixture<UiTableCell>(html`
      <ui-table-cell align="right">Content</ui-table-cell>
    `);
        expect(el.getAttribute('align')).toBe('right');
    });

    it('renders sort label with direction', async () => {
        const el = await fixture(html`
      <ui-table-sort-label active direction="desc">Sort</ui-table-sort-label>
    `);
        expect(el.hasAttribute('active')).toBe(true);
        expect(el.getAttribute('direction')).toBe('desc');
    });

    it('pagination dispatches events', async () => {
        const pageHandler = vi.fn();
        const el = await fixture(html`
      <ui-table-pagination .count=${100} .page=${1} @page-change=${pageHandler}></ui-table-pagination>
    `);

        const nextBtn = el.shadowRoot!.querySelector('button[aria-label="Next page"]') as HTMLButtonElement;
        nextBtn.click();

        expect(pageHandler).toHaveBeenCalled();
        expect(pageHandler.mock.calls[0][0].detail.page).toBe(2);
    });
});
