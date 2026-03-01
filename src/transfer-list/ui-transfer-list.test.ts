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

    it('renders correctly with options', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${['1']}></ui-transfer-list>
        `);

        const leftItems = el.shadowRoot!.querySelectorAll('.list-wrapper:first-child .list-item');
        const rightItems = el.shadowRoot!.querySelectorAll('.list-wrapper:last-child .list-item');

        expect(leftItems.length).toBe(2); // 2 and 3
        expect(rightItems.length).toBe(1); // 1
    });

    it('moves items from left to right', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        // Click first item in left list
        const firstItem = el.shadowRoot!.querySelector('.list-item') as HTMLElement;
        firstItem.click();
        await el.updateComplete;

        // Click move right button
        const moveRightBtn = el.shadowRoot!.querySelector('button[title="Move selected right"]') as HTMLButtonElement;
        moveRightBtn.click();
        await el.updateComplete;

        expect(el.value).toEqual(['1']);
        expect(changeSpy).toHaveBeenCalled();
    });

    it('moves all items to the right', async () => {
        const el = await fixture<UiTransferList>(html`
            <ui-transfer-list .options=${defaultOptions} .value=${[]}></ui-transfer-list>
        `);

        const moveAllRightBtn = el.shadowRoot!.querySelector('button[title="Move all right"]') as HTMLButtonElement;
        moveAllRightBtn.click();
        await el.updateComplete;

        expect(el.value.length).toBe(3);
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
});
