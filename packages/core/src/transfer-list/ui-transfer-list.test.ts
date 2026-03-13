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

    it('list items have tabindex="0" for keyboard accessibility', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const items = el.shadowRoot!.querySelectorAll('.list-item');
        items.forEach(item => {
            expect((item as HTMLElement).tabIndex).toBe(0);
        });
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

    it('deselects a second left item (idx > 0) — kills idx > -1 vs idx > 0 mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const items = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        // Select both item 0 and item 1
        (items[0] as HTMLElement).click();
        await el.updateComplete;
        (items[1] as HTMLElement).click();
        await el.updateComplete;

        // Deselect item 1 (idx=1 in leftChecked) — distinguishes > -1 from > 0
        (items[1] as HTMLElement).click();
        await el.updateComplete;

        expect(items[0].classList.contains('selected')).toBe(true);
        expect(items[1].classList.contains('selected')).toBe(false);
    });

    it('deselects a second right item (idx > 0) — kills idx > -1 vs idx > 0 mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const items = el.shadowRoot!.querySelectorAll('.list-wrapper:last-child .list-item');
        (items[0] as HTMLElement).click();
        await el.updateComplete;
        (items[1] as HTMLElement).click();
        await el.updateComplete;

        // Deselect item 1 (idx=1 in rightChecked)
        (items[1] as HTMLElement).click();
        await el.updateComplete;

        expect(items[0].classList.contains('selected')).toBe(true);
        expect(items[1].classList.contains('selected')).toBe(false);
    });

    // ─── Keyboard toggle ──────────────────────────────────────────────────────

    it('toggles left item with Space key', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const item = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;

        expect(item.classList.contains('selected')).toBe(true);
    });

    it('toggles left item with Enter key', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const item = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(item.classList.contains('selected')).toBe(true);
    });

    it('toggles right item with Space key', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const item = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;

        expect(item.classList.contains('selected')).toBe(true);
    });

    it('ignores non-Space/Enter keys on list items', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const item = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        item.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        expect(item.classList.contains('selected')).toBe(false);
    });

    it('Space key does nothing on left item when disabled', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?disabled=${true}></ui-transfer-list>
        `);

        const item = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;

        expect(item.classList.contains('selected')).toBe(false);
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

    it('moveAllRight clears leftChecked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        // Check first left item
        const item = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        item.click();
        await el.updateComplete;

        const moveAllRightBtn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        moveAllRightBtn.click();
        await el.updateComplete;

        // Move selected right button should be disabled (leftChecked cleared)
        const moveRightBtn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        expect(moveRightBtn.disabled).toBe(true);
    });

    it('moveAllRight clears rightChecked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        // Check a right item
        const rightItem = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        rightItem.click();
        await el.updateComplete;

        const moveAllRightBtn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        moveAllRightBtn.click();
        await el.updateComplete;

        // Move selected left button should be disabled (rightChecked cleared)
        const moveLeftBtn = el.shadowRoot!.querySelector('button[title="Move selected left"]') as HTMLButtonElement;
        expect(moveLeftBtn.disabled).toBe(true);
    });

    it('moveAllLeft clears rightChecked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        // Check a right item
        const rightItem = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        rightItem.click();
        await el.updateComplete;

        const moveAllLeftBtn = el.shadowRoot!.querySelector('button[title="Move all left"]') as HTMLButtonElement;
        moveAllLeftBtn.click();
        await el.updateComplete;

        // Move selected left button should be disabled (rightChecked cleared)
        const moveLeftBtn = el.shadowRoot!.querySelector('button[title="Move selected left"]') as HTMLButtonElement;
        expect(moveLeftBtn.disabled).toBe(true);
    });

    it('moveAllLeft clears leftChecked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        // Check a left item
        const leftItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        leftItem.click();
        await el.updateComplete;

        const moveAllLeftBtn = el.shadowRoot!.querySelector('button[title="Move all left"]') as HTMLButtonElement;
        moveAllLeftBtn.click();
        await el.updateComplete;

        // Move selected right button should be disabled (leftChecked cleared)
        const moveRightBtn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        expect(moveRightBtn.disabled).toBe(true);
    });

    it('preserves existing right items when moving more right', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const leftItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        leftItem.click();
        await el.updateComplete;

        const moveRightBtn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        moveRightBtn.click();
        await el.updateComplete;

        expect(el.value).toContain('1');
        expect(el.value).toContain('2');
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

    it('"Move all right" is disabled when left list is empty', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const btn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it('"Move all left" is disabled when right list is empty', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const btn = el.shadowRoot!.querySelector('button[title="Move all left"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it('"Move all right" is enabled when left list has items', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const btn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
    });

    it('"Move all left" is enabled when right list has items', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const btn = el.shadowRoot!.querySelector('button[title="Move all left"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
    });

    it('"Move selected right" stays disabled when disabled=true even with left items checked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        // Check a left item while not disabled
        const item = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        item.click();
        await el.updateComplete;

        // Now disable
        el.disabled = true;
        await el.updateComplete;

        const btn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it('"Move selected left" stays disabled when disabled=true even with right items checked', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        // Check a right item while not disabled
        const item = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-item') as HTMLElement;
        item.click();
        await el.updateComplete;

        // Now disable
        el.disabled = true;
        await el.updateComplete;

        const btn = el.shadowRoot!.querySelector('button[title="Move selected left"]') as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
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
            <ui-transfer-list .options=${defaultOptions} .value=${['1']} ?disabled=${true}></ui-transfer-list>
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

    // ─── Disabled guards — direct method invocation ───────────────────────────
    // These tests call private methods directly to cover the `if (this.disabled) return;`
    // branches that are unreachable via button clicks (disabled buttons suppress click events).

    it('_moveRight: disabled guard prevents value mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?disabled=${true}></ui-transfer-list>
        `);
        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._moveRight();
        await el.updateComplete;

        expect(el.value).toEqual([]);
        expect(changeSpy).not.toHaveBeenCalled();
    });

    it('_moveLeft: disabled guard prevents value mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2']} ?disabled=${true}></ui-transfer-list>
        `);
        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._moveLeft();
        await el.updateComplete;

        expect(el.value).toEqual(['1', '2']);
        expect(changeSpy).not.toHaveBeenCalled();
    });

    it('_moveAllRight: disabled guard prevents value mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?disabled=${true}></ui-transfer-list>
        `);
        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._moveAllRight();
        await el.updateComplete;

        expect(el.value).toEqual([]);
        expect(changeSpy).not.toHaveBeenCalled();
    });

    it('_moveAllLeft: disabled guard prevents value mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2']} ?disabled=${true}></ui-transfer-list>
        `);
        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._moveAllLeft();
        await el.updateComplete;

        expect(el.value).toEqual(['1', '2']);
        expect(changeSpy).not.toHaveBeenCalled();
    });

    // ─── defaultValue prop ────────────────────────────────────────────────────

    it('applies defaultValue as initial right list on first render', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .defaultValue=${['1', '2']}></ui-transfer-list>
        `);

        expect(el.value).toEqual(['1', '2']);
        const rightItems = el.shadowRoot!.querySelectorAll('.list-wrapper:last-child .list-item');
        expect(rightItems.length).toBe(2);
    });

    it('defaultValue is ignored when value is already set', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['3']} .defaultValue=${['1', '2']}></ui-transfer-list>
        `);

        // value was already set to ['3'], defaultValue should NOT override it
        expect(el.value).toEqual(['3']);
    });

    it('empty defaultValue leaves value as empty', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .defaultValue=${[]}></ui-transfer-list>
        `);

        expect(el.value).toEqual([]);
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

    it('search is case-insensitive for label (mixed case label, lowercase query)', async () => {
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

    it('left search is case-insensitive for query (UPPERCASE query) — kills toLowerCase mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?searchable=${true}></ui-transfer-list>
        `);

        const leftSearch = el.shadowRoot!.querySelector('.list-wrapper:first-child .list-search') as HTMLInputElement;
        // Uppercase query: 'ITEM 1' should still match 'Item 1' because both are lowercased
        leftSearch.value = 'ITEM 1';
        leftSearch.dispatchEvent(new Event('input'));
        await el.updateComplete;

        const leftItems = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        expect(leftItems.length).toBe(1);
    });

    it('right search is case-insensitive for query (UPPERCASE query) — kills toLowerCase mutation', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']} ?searchable=${true}></ui-transfer-list>
        `);

        const rightSearch = el.shadowRoot!.querySelector('.list-wrapper:last-child .list-search') as HTMLInputElement;
        // Uppercase query: 'ITEM 2' should still match 'Item 2'
        rightSearch.value = 'ITEM 2';
        rightSearch.dispatchEvent(new Event('input'));
        await el.updateComplete;

        const rightItems = el.shadowRoot!.querySelectorAll('.list-wrapper:last-child .list-item');
        expect(rightItems.length).toBe(1);
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

    it('search inputs are disabled when component is disabled', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]} ?searchable=${true} ?disabled=${true}></ui-transfer-list>
        `);

        const searchInputs = el.shadowRoot!.querySelectorAll('.list-search');
        searchInputs.forEach(input => {
            expect((input as HTMLInputElement).disabled).toBe(true);
        });
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

    it('change event detail reflects current value after moveLeft', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1', '2', '3']}></ui-transfer-list>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        const moveAllLeftBtn = el.shadowRoot!.querySelector('button[title="Move all left"]') as HTMLButtonElement;
        moveAllLeftBtn.click();
        await el.updateComplete;

        const event = changeSpy.mock.calls[0][0] as CustomEvent;
        expect(event.detail.value).toEqual([]);
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

    it('sets aria-multiselectable="true" on listboxes', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const listboxes = el.shadowRoot!.querySelectorAll('[role="listbox"]');
        listboxes.forEach(lb => {
            expect(lb.getAttribute('aria-multiselectable')).toBe('true');
        });
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
