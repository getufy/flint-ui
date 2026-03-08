import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-transfer-list';
import type { UiTransferList } from './ui-transfer-list';

describe('ui-transfer-list', () => {
    const defaultOptions = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
    ];

    // ─── Rendering ────────────────────────────────────────────────────────────

    it('renders correctly with options', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const leftItems = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        const rightItems = el.shadowRoot!.querySelectorAll('.list-wrapper:last-child .list-item');

        expect(leftItems.length).toBe(2);
        expect(rightItems.length).toBe(1);
    });

    it('renders default titles', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions}></ui-transfer-list>
        `);

        const titles = el.shadowRoot!.querySelectorAll('.list-title');
        expect(titles[0].textContent).toBe('Options');
        expect(titles[1].textContent).toBe('Selected');
    });

    it('renders custom titles', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} leftTitle="Available" rightTitle="Chosen"></ui-transfer-list>
        `);

        const titles = el.shadowRoot!.querySelectorAll('.list-title');
        expect(titles[0].textContent).toBe('Available');
        expect(titles[1].textContent).toBe('Chosen');
    });

    it('shows item counts in list headers', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const counts = el.shadowRoot!.querySelectorAll('.list-count');
        expect(counts[0].textContent).toBe('2');
        expect(counts[1].textContent).toBe('1');
    });

    it('renders empty right list gracefully', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const rightItems = el.shadowRoot!.querySelectorAll('.list-wrapper:last-child .list-item');
        expect(rightItems.length).toBe(0);
    });

    it('renders empty left list gracefully when all items selected', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const leftItems = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        expect(leftItems.length).toBe(0);
    });

    // ─── Toggle (covers all _toggleChecked branches) ──────────────────────────

    it('selects a left list item on click', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const firstItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        firstItem.click();
        await el.updateComplete;

        expect(firstItem.classList.contains('selected')).toBe(true);
    });

    it('deselects an already-selected left list item on second click', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const firstItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        firstItem.click();
        await el.updateComplete;
        expect(firstItem.classList.contains('selected')).toBe(true);

        // Second click — covers the idx > -1 branch in left toggle
        firstItem.click();
        await el.updateComplete;
        expect(firstItem.classList.contains('selected')).toBe(false);
    });

    it('selects a right list item on click', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const rightItem = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        // Covers the right-side else branch
        rightItem.click();
        await el.updateComplete;

        expect(rightItem.classList.contains('selected')).toBe(true);
    });

    it('deselects an already-selected right list item on second click', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const rightItem = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        rightItem.click();
        await el.updateComplete;
        expect(rightItem.classList.contains('selected')).toBe(true);

        // Second click — covers the idx > -1 branch in right toggle
        rightItem.click();
        await el.updateComplete;
        expect(rightItem.classList.contains('selected')).toBe(false);
    });

    // ─── Move operations ──────────────────────────────────────────────────────

    it('moves selected items from left to right', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        const firstItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        firstItem.click();
        await el.updateComplete;

        const moveRightBtn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        moveRightBtn.click();
        await el.updateComplete;

        expect(el.value).toEqual(['1']);
        expect(changeSpy).toHaveBeenCalled();
        const event = changeSpy.mock.calls[0][0] as CustomEvent;
        expect(event.detail.value).toEqual(['1']);
    });

    it('clears leftChecked after moving right', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const firstItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        firstItem.click();
        await el.updateComplete;

        const moveRightBtn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        moveRightBtn.click();
        await el.updateComplete;

        expect(moveRightBtn.disabled).toBe(true);
    });

    it('moves selected items from right to left', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2']}></ui-transfer-list>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        const rightItem = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        rightItem.click();
        await el.updateComplete;

        const moveLeftBtn = el.shadowRoot!.querySelector('button[title="Move selected left"]') as HTMLButtonElement;
        moveLeftBtn.click();
        await el.updateComplete;

        expect(el.value).toEqual(['2']);
        expect(changeSpy).toHaveBeenCalled();
        const event = changeSpy.mock.calls[0][0] as CustomEvent;
        expect(event.detail.value).toEqual(['2']);
    });

    it('clears rightChecked after moving left', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2']}></ui-transfer-list>
        `);

        const rightItem = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        rightItem.click();
        await el.updateComplete;

        const moveLeftBtn = el.shadowRoot!.querySelector('button[title="Move selected left"]') as HTMLButtonElement;
        moveLeftBtn.click();
        await el.updateComplete;

        expect(moveLeftBtn.disabled).toBe(true);
    });

    it('moves all items to the right', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const moveAllRightBtn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        moveAllRightBtn.click();
        await el.updateComplete;

        expect(el.value).toEqual(['1', '2', '3']);
    });

    it('moves all items to the left', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const moveAllLeftBtn = el.shadowRoot!.querySelector('button[title="Move all left"]') as HTMLButtonElement;
        moveAllLeftBtn.click();
        await el.updateComplete;

        expect(el.value.length).toBe(0);
    });

    // ─── Button disabled states ───────────────────────────────────────────────

    it('disables "Move selected right" button when no left items checked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const btn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it('disables "Move selected left" button when no right items checked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const btn = el.shadowRoot!.querySelector('button[title="Move selected left"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it('enables "Move selected right" button when a left item is checked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const firstItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        firstItem.click();
        await el.updateComplete;

        const btn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
    });

    it('enables "Move selected left" button when a right item is checked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const rightItem = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        rightItem.click();
        await el.updateComplete;

        const btn = el.shadowRoot!.querySelector('button[title="Move selected left"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
    });

    // ─── Disabled prop ────────────────────────────────────────────────────────

    it('ignores item clicks when disabled', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?disabled=${true}></ui-transfer-list>
        `);

        const firstItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        firstItem.click();
        await el.updateComplete;

        expect(firstItem.classList.contains('selected')).toBe(false);
    });

    it('disables all action buttons when disabled prop is set', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?disabled=${true}></ui-transfer-list>
        `);

        const buttons = el.shadowRoot!.querySelectorAll('button.action-button');
        expect(buttons.length).toBe(4);
        buttons.forEach(btn => {
            expect((btn as HTMLButtonElement).disabled).toBe(true);
        });
    });

    it('does not fire change event when disabled buttons are clicked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?disabled=${true}></ui-transfer-list>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        const moveAllRightBtn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        moveAllRightBtn.click();
        await el.updateComplete;

        expect(changeSpy).not.toHaveBeenCalled();
        expect(el.value).toEqual([]);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} ?disabled=${true}></ui-transfer-list>
        `);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    // ─── Searchable prop ──────────────────────────────────────────────────────

    it('does not render search inputs when searchable is false', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        expect(el.shadowRoot!.querySelectorAll('.list-search').length).toBe(0);
    });

    it('renders search inputs when searchable is true', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?searchable=${true}></ui-transfer-list>
        `);

        expect(el.shadowRoot!.querySelectorAll('.list-search').length).toBe(2);
    });

    it('filters left list by search query', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?searchable=${true}></ui-transfer-list>
        `);

        const leftSearch = el.shadowRoot!.querySelector('.list-wrapper:first-child .list-search') as HTMLInputElement;
        leftSearch.value = 'Item 1';
        leftSearch.dispatchEvent(new Event('input'));
        await el.updateComplete;

        const leftItems = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        expect(leftItems.length).toBe(1);
    });

    it('filters right list by search query', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']} ?searchable=${true}></ui-transfer-list>
        `);

        const rightSearch = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-search') as HTMLInputElement;
        rightSearch.value = 'Item 2';
        rightSearch.dispatchEvent(new Event('input'));
        await el.updateComplete;

        const rightItems = el.shadowRoot!.querySelectorAll('.list-wrapper:last-child .list-item');
        expect(rightItems.length).toBe(1);
    });

    it('search is case-insensitive', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?searchable=${true}></ui-transfer-list>
        `);

        const leftSearch = el.shadowRoot!.querySelector('.list-wrapper:first-child .list-search') as HTMLInputElement;
        leftSearch.value = 'item';
        leftSearch.dispatchEvent(new Event('input'));
        await el.updateComplete;

        const leftItems = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        expect(leftItems.length).toBe(3);
    });

    it('shows no items when search matches nothing', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?searchable=${true}></ui-transfer-list>
        `);

        const leftSearch = el.shadowRoot!.querySelector('.list-wrapper:first-child .list-search') as HTMLInputElement;
        leftSearch.value = 'zzz-no-match';
        leftSearch.dispatchEvent(new Event('input'));
        await el.updateComplete;

        const leftItems = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        expect(leftItems.length).toBe(0);
    });

    // ─── Event ────────────────────────────────────────────────────────────────

    it('fires change event with bubbles and composed flags', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        let capturedEvent: CustomEvent | null = null;
        document.addEventListener('change', (e) => { capturedEvent = e as CustomEvent; }, { once: true });

        const moveAllRightBtn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        moveAllRightBtn.click();
        await el.updateComplete;

        expect(capturedEvent).not.toBeNull();
        expect(capturedEvent!.bubbles).toBe(true);
        expect(capturedEvent!.composed).toBe(true);
        expect(capturedEvent!.detail.value).toEqual(['1', '2', '3']);
    });

    // ─── ARIA ─────────────────────────────────────────────────────────────────

    it('has role="listbox" on both list containers', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const listboxes = el.shadowRoot!.querySelectorAll('[role="listbox"]');
        expect(listboxes.length).toBe(2);
    });

    it('sets aria-label from leftTitle and rightTitle on listboxes', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} leftTitle="Available" rightTitle="Chosen"></ui-transfer-list>
        `);

        const listboxes = el.shadowRoot!.querySelectorAll('[role="listbox"]');
        expect(listboxes[0].getAttribute('aria-label')).toBe('Available');
        expect(listboxes[1].getAttribute('aria-label')).toBe('Chosen');
    });

    it('sets role="option" on list items', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const options = el.shadowRoot!.querySelectorAll('[role="option"]');
        expect(options.length).toBe(3);
    });

    it('sets aria-selected="false" on unselected items', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const firstItem = el.shadowRoot!.querySelector('[role="option"]') as HTMLElement;
        expect(firstItem.getAttribute('aria-selected')).toBe('false');
    });

    it('sets aria-selected="true" on selected items', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const firstItem = el.shadowRoot!.querySelector('[role="option"]') as HTMLElement;
        firstItem.click();
        await el.updateComplete;

        expect(firstItem.getAttribute('aria-selected')).toBe('true');
    });

    it('action buttons have aria-label attributes', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const buttons = el.shadowRoot!.querySelectorAll('button.action-button');
        buttons.forEach(btn => {
            expect(btn.getAttribute('aria-label')).toBeTruthy();
        });
    });
});
