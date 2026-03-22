import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-menubar.js';
import { expectAccessible } from '../test-utils/axe.js';
import type {
    FlintMenubar,
    FlintMenubarMenu,
    FlintMenubarTrigger,
    FlintMenubarContent,
    FlintMenubarItem,
    FlintMenubarCheckboxItem,
    FlintMenubarRadioGroup,
    FlintMenubarRadioItem,
    FlintMenubarSub,
    FlintMenubarSubContent,
    FlintMenubarSubTrigger,
    FlintMenubarShortcut,
    FlintMenubarGroup,
} from './flint-menubar.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                            */
/* ─────────────────────────────────────────────────────────────────── */

async function settle(el: Element, ms = 30) {
    await (el as FlintMenubar).updateComplete;
    await new Promise((r) => setTimeout(r, ms));
}

function getMenus(bar: FlintMenubar): FlintMenubarMenu[] {
    return Array.from(bar.querySelectorAll(':scope > flint-menubar-menu'));
}

function getTrigger(menu: FlintMenubarMenu): FlintMenubarTrigger {
    return menu.querySelector('flint-menubar-trigger')!;
}

function getTriggerButton(trigger: FlintMenubarTrigger): HTMLButtonElement {
    return trigger.shadowRoot!.querySelector('button')!;
}

function getContent(menu: FlintMenubarMenu): FlintMenubarContent {
    return menu.querySelector('flint-menubar-content')!;
}

function getItems(content: FlintMenubarContent): FlintMenubarItem[] {
    return Array.from(content.querySelectorAll('flint-menubar-item'));
}

function getHighlighted(content: FlintMenubarContent): HTMLElement | undefined {
    const all = content.querySelectorAll<HTMLElement>(
        'flint-menubar-item, flint-menubar-checkbox-item, flint-menubar-radio-item, flint-menubar-sub-trigger'
    );
    return Array.from(all).find(el => (el as HTMLElement & { highlighted: boolean }).highlighted);
}

function fireKeyDown(target: HTMLElement, key: string) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Fixtures                                                           */
/* ─────────────────────────────────────────────────────────────────── */

const BASIC_FIXTURE = html`
    <flint-menubar>
        <flint-menubar-menu>
            <flint-menubar-trigger>File</flint-menubar-trigger>
            <flint-menubar-content>
                <flint-menubar-item>New Tab</flint-menubar-item>
                <flint-menubar-item>New Window</flint-menubar-item>
                <flint-menubar-item disabled>Incognito</flint-menubar-item>
                <flint-menubar-separator></flint-menubar-separator>
                <flint-menubar-item>Print</flint-menubar-item>
            </flint-menubar-content>
        </flint-menubar-menu>
        <flint-menubar-menu>
            <flint-menubar-trigger>Edit</flint-menubar-trigger>
            <flint-menubar-content>
                <flint-menubar-item>Undo</flint-menubar-item>
                <flint-menubar-item>Redo</flint-menubar-item>
            </flint-menubar-content>
        </flint-menubar-menu>
        <flint-menubar-menu>
            <flint-menubar-trigger>View</flint-menubar-trigger>
            <flint-menubar-content>
                <flint-menubar-item>Zoom In</flint-menubar-item>
            </flint-menubar-content>
        </flint-menubar-menu>
    </flint-menubar>
`;

const CHECKBOX_FIXTURE = html`
    <flint-menubar>
        <flint-menubar-menu>
            <flint-menubar-trigger>View</flint-menubar-trigger>
            <flint-menubar-content>
                <flint-menubar-checkbox-item>Bookmarks</flint-menubar-checkbox-item>
                <flint-menubar-checkbox-item checked>Full URLs</flint-menubar-checkbox-item>
            </flint-menubar-content>
        </flint-menubar-menu>
    </flint-menubar>
`;

const RADIO_FIXTURE = html`
    <flint-menubar>
        <flint-menubar-menu>
            <flint-menubar-trigger>Profiles</flint-menubar-trigger>
            <flint-menubar-content>
                <flint-menubar-radio-group value="benoit">
                    <flint-menubar-radio-item value="andy">Andy</flint-menubar-radio-item>
                    <flint-menubar-radio-item value="benoit">Benoit</flint-menubar-radio-item>
                    <flint-menubar-radio-item value="luis">Luis</flint-menubar-radio-item>
                </flint-menubar-radio-group>
            </flint-menubar-content>
        </flint-menubar-menu>
    </flint-menubar>
`;

const SUB_FIXTURE = html`
    <flint-menubar>
        <flint-menubar-menu>
            <flint-menubar-trigger>File</flint-menubar-trigger>
            <flint-menubar-content>
                <flint-menubar-item>New</flint-menubar-item>
                <flint-menubar-sub>
                    <flint-menubar-sub-trigger>Share</flint-menubar-sub-trigger>
                    <flint-menubar-sub-content>
                        <flint-menubar-item>Email</flint-menubar-item>
                        <flint-menubar-item>Messages</flint-menubar-item>
                    </flint-menubar-sub-content>
                </flint-menubar-sub>
                <flint-menubar-item>Print</flint-menubar-item>
            </flint-menubar-content>
        </flint-menubar-menu>
        <flint-menubar-menu>
            <flint-menubar-trigger>Edit</flint-menubar-trigger>
            <flint-menubar-content>
                <flint-menubar-item>Undo</flint-menubar-item>
            </flint-menubar-content>
        </flint-menubar-menu>
    </flint-menubar>
`;

/* ═══════════════════════════════════════════════════════════════════ */
/*  TESTS                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

describe('FlintMenubar — rendering', () => {
    it('renders all menu triggers', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(menus).toHaveLength(3);
        expect(getTrigger(menus[0]).textContent?.trim()).toBe('File');
        expect(getTrigger(menus[1]).textContent?.trim()).toBe('Edit');
        expect(getTrigger(menus[2]).textContent?.trim()).toBe('View');
    });

    it('has role="menubar" in shadow DOM', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const div = bar.shadowRoot!.querySelector('[role="menubar"]');
        expect(div).toBeTruthy();
    });

    it('renders items inside content', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const items = getItems(getContent(menus[0]));
        expect(items).toHaveLength(4); // 3 items + 1 disabled
    });

    it('all menus start closed', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        menus.forEach(menu => {
            expect(getContent(menu).open).toBe(false);
        });
    });

    it('renders separator element', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const seps = bar.querySelectorAll('flint-menubar-separator');
        expect(seps.length).toBeGreaterThan(0);
    });
});

describe('FlintMenubar — shortcut', () => {
    it('renders shortcut text', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item>New <flint-menubar-shortcut>⌘N</flint-menubar-shortcut></flint-menubar-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const shortcut = bar.querySelector<FlintMenubarShortcut>('flint-menubar-shortcut')!;
        expect(shortcut).toBeTruthy();
        expect(shortcut.textContent?.trim()).toBe('⌘N');
    });
});

describe('FlintMenubar — group', () => {
    it('renders heading when provided', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-group heading="Actions">
                            <flint-menubar-item>New</flint-menubar-item>
                        </flint-menubar-group>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarGroup>('flint-menubar-group')!;
        const heading = group.shadowRoot!.querySelector('.heading');
        expect(heading).toBeTruthy();
        expect(heading!.textContent?.trim()).toBe('Actions');
    });

    it('does not render heading when empty', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-group>
                            <flint-menubar-item>New</flint-menubar-item>
                        </flint-menubar-group>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarGroup>('flint-menubar-group')!;
        const heading = group.shadowRoot!.querySelector('.heading');
        expect(heading).toBeNull();
    });
});

describe('FlintMenubar — open / close', () => {
    it('opens menu on trigger click', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        btn.click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);
        expect(getTrigger(menus[0]).active).toBe(true);
    });

    it('closes menu on second trigger click (toggle)', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        btn.click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        btn.click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
        expect(getTrigger(menus[0]).active).toBe(false);
    });

    it('switches menu when clicking another trigger while open', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
        expect(getContent(menus[1]).open).toBe(true);
    });

    it('closeAll() closes all menus', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        bar.closeAll();
        await settle(bar);
        menus.forEach(menu => {
            expect(getContent(menu).open).toBe(false);
        });
    });

    it('closes on Escape key', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        fireKeyDown(bar, 'Escape');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
    });

    it('closes on outside click', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        document.body.click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
    });
});

describe('FlintMenubar — keyboard navigation between menus', () => {
    it('ArrowRight opens next menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
        expect(getContent(menus[1]).open).toBe(true);
    });

    it('ArrowLeft opens previous menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        expect(getContent(menus[1]).open).toBe(false);
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('ArrowRight wraps around to first menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[2])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        expect(getContent(menus[2]).open).toBe(false);
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('ArrowLeft wraps around to last menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
        expect(getContent(menus[2]).open).toBe(true);
    });
});

describe('FlintMenubar — keyboard navigation within items', () => {
    it('ArrowDown highlights next item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        const highlighted = getHighlighted(content);
        expect(highlighted).toBeTruthy();
        expect(highlighted!.textContent?.trim()).toBe('New Tab');
    });

    it('ArrowDown skips disabled items', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Arrow down to first (New Tab)
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        // Arrow down to second (New Window)
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        // Arrow down to third — but Incognito is disabled, so goes to Print
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted).toBeTruthy();
        expect(highlighted!.textContent?.trim()).toBe('Print');
    });

    it('ArrowUp highlights previous item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Go to end first
        fireKeyDown(bar, 'End');
        await settle(bar);

        fireKeyDown(bar, 'ArrowUp');
        await settle(bar);
        const highlighted = getHighlighted(content);
        expect(highlighted).toBeTruthy();
        // Before Print is the non-disabled New Window
        expect(highlighted!.textContent?.trim()).toBe('New Window');
    });

    it('Home highlights first item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'End');
        await settle(bar);
        fireKeyDown(bar, 'Home');
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted!.textContent?.trim()).toBe('New Tab');
    });

    it('End highlights last item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'End');
        await settle(bar);
        const highlighted = getHighlighted(content);
        expect(highlighted!.textContent?.trim()).toBe('Print');
    });

    it('ArrowDown wraps from last to first', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'End');
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted!.textContent?.trim()).toBe('New Tab');
    });

    it('ArrowUp wraps from first to last', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'Home');
        await settle(bar);
        fireKeyDown(bar, 'ArrowUp');
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted!.textContent?.trim()).toBe('Print');
    });
});

describe('FlintMenubar — item selection', () => {
    it('Enter activates highlighted item and fires event', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.value).toBe('New Tab');
    });

    it('Space activates highlighted item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, ' ');
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
    });

    it('clicking an item fires select and closes menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = getItems(getContent(menus[0]));
        items[0].click();
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
        // Menu should be closed after item click
        expect(getContent(menus[0]).open).toBe(false);
    });

    it('disabled item does not fire select', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const disabledItem = bar.querySelector('flint-menubar-item[disabled]') as FlintMenubarItem;
        disabledItem.select();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
    });
});

describe('FlintMenubar — inset items', () => {
    it('reflects inset attribute', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>View</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item inset>Reload</flint-menubar-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const item = bar.querySelector('flint-menubar-item') as FlintMenubarItem;
        expect(item.hasAttribute('inset')).toBe(true);
        expect(item.inset).toBe(true);
    });
});

describe('FlintMenubarCheckboxItem', () => {
    it('renders with initial checked state', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(true);
    });

    it('toggles checked state on click', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        items[0].click();
        await settle(bar);
        expect(items[0].checked).toBe(true);

        items[0].click();
        await settle(bar);
        expect(items[0].checked).toBe(false);
    });

    it('fires flint-menubar-checkbox-change event', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-checkbox-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        items[0].click();
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.checked).toBe(true);
    });

    it('does not toggle when disabled', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>View</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-checkbox-item disabled>Bookmarks</flint-menubar-checkbox-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const item = bar.querySelector<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item')!;
        item.toggle();
        expect(item.checked).toBe(false);
    });

    it('renders checkmark SVG when checked', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        const svg0 = items[0].shadowRoot!.querySelector('svg');
        const svg1 = items[1].shadowRoot!.querySelector('svg');
        expect(svg0).toBeNull(); // unchecked
        expect(svg1).toBeTruthy(); // checked
    });

    it('does not close menu on checkbox click', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        items[0].click();
        await settle(bar);

        // Menu should remain open after checkbox toggle
        expect(getContent(menus[0]).open).toBe(true);
    });
});

describe('FlintMenubarRadioGroup', () => {
    it('renders with initial value', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;
        expect(group.value).toBe('benoit');
    });

    it('syncs checked state to radio items', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        expect(items[0].checked).toBe(false); // andy
        expect(items[1].checked).toBe(true);  // benoit
        expect(items[2].checked).toBe(false); // luis
    });

    it('changes value on radio item click', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        items[0].click(); // click Andy
        await settle(bar);

        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;
        expect(group.value).toBe('andy');
        expect(items[0].checked).toBe(true);
        expect(items[1].checked).toBe(false);
    });

    it('fires flint-menubar-radio-change event', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-radio-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        items[2].click(); // click Luis
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.value).toBe('luis');
    });

    it('does not fire change for disabled radio item', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>P</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-radio-group value="a">
                            <flint-menubar-radio-item value="a">A</flint-menubar-radio-item>
                            <flint-menubar-radio-item value="b" disabled>B</flint-menubar-radio-item>
                        </flint-menubar-radio-group>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-radio-change', spy);

        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        items[1].select();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
    });

    it('renders dot SVG for checked radio item', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        const svg0 = items[0].shadowRoot!.querySelector('svg');
        const svg1 = items[1].shadowRoot!.querySelector('svg');
        expect(svg0).toBeNull();
        expect(svg1).toBeTruthy(); // benoit is checked
    });

    it('does not close menu on radio click', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        items[0].click();
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(true);
    });

    it('updates checked when value property changes programmatically', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;
        group.value = 'luis';
        await group.updateComplete;
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        expect(items[2].checked).toBe(true);
        expect(items[1].checked).toBe(false);
    });
});

describe('FlintMenubarSub', () => {
    it('renders sub-trigger with arrow icon', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subTrigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;
        const arrow = subTrigger.shadowRoot!.querySelector('.arrow');
        expect(arrow).toBeTruthy();
    });

    it('sub-content starts closed', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;
        expect(subContent.open).toBe(false);
    });

    it('show() opens sub-content', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.show();
        await new Promise(r => setTimeout(r, 100));

        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;
        expect(subContent.open).toBe(true);
    });

    it('hideImmediate() closes sub-content', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.show();
        await new Promise(r => setTimeout(r, 100));
        expect(sub.open).toBe(true);

        sub.hideImmediate();
        expect(sub.open).toBe(false);
    });

    it('closing parent menu closes sub-menus', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        // Open menu
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Open sub
        sub.show();
        await new Promise(r => setTimeout(r, 100));
        expect(sub.open).toBe(true);

        // Close menu
        menus[0].close();
        await settle(bar);
        expect(sub.open).toBe(false);
    });

    it('has role="menu" on sub-content panel', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;
        const panel = subContent.shadowRoot!.querySelector('.panel');
        expect(panel!.getAttribute('role')).toBe('menu');
    });
});

describe('FlintMenubar — trigger states', () => {
    it('trigger has aria-expanded false when closed', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('trigger has aria-expanded true when open', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        await getTrigger(menus[0]).updateComplete;

        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('trigger has role="menuitem"', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('role')).toBe('menuitem');
    });

    it('trigger has aria-haspopup', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('aria-haspopup')).toBe('true');
    });
});

describe('FlintMenubar — content role', () => {
    it('content panel has role="menu"', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const content = bar.querySelector<FlintMenubarContent>('flint-menubar-content')!;
        const panel = content.shadowRoot!.querySelector('.panel');
        expect(panel!.getAttribute('role')).toBe('menu');
    });
});

describe('FlintMenubar — item aria', () => {
    it('item has role="menuitem"', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<FlintMenubarItem>('flint-menubar-item')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('role')).toBe('menuitem');
    });

    it('disabled item has aria-disabled="true"', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<FlintMenubarItem>('flint-menubar-item[disabled]')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-disabled')).toBe('true');
    });

    it('checkbox item has role="menuitemcheckbox"', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('role')).toBe('menuitemcheckbox');
    });

    it('checkbox item has aria-checked', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        const div0 = items[0].shadowRoot!.querySelector('.item')!;
        const div1 = items[1].shadowRoot!.querySelector('.item')!;
        expect(div0.getAttribute('aria-checked')).toBe('false');
        expect(div1.getAttribute('aria-checked')).toBe('true');
    });

    it('radio item has role="menuitemradio"', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<FlintMenubarRadioItem>('flint-menubar-radio-item')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('role')).toBe('menuitemradio');
    });
});

describe('FlintMenubar — mouse highlight', () => {
    it('mouseover highlights the item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = getItems(content);
        items[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(items[1].highlighted).toBe(true);
        expect(items[0].highlighted).toBe(false);
    });

    it('moving mouse clears old highlight', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = getItems(content);
        items[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);
        expect(items[0].highlighted).toBe(true);

        items[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);
        expect(items[0].highlighted).toBe(false);
        expect(items[1].highlighted).toBe(true);
    });
});

describe('FlintMenubar — highlight reset on open', () => {
    it('resets highlight when menu is reopened', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        expect(getHighlighted(content)).toBeTruthy();

        // Close
        fireKeyDown(bar, 'Escape');
        await settle(bar);

        // Reopen
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getHighlighted(content)).toBeUndefined();
    });
});

describe('FlintMenubar — keyboard on checkbox/radio items', () => {
    it('Enter toggles checkbox item', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        expect(items[0].checked).toBe(true);
    });

    it('Enter selects radio item', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;
        expect(group.value).toBe('andy');
    });
});

describe('FlintMenubar — edge cases', () => {
    it('single menu works correctly', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>Only</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item>One</flint-menubar-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        // ArrowRight wraps to itself
        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('empty content does not crash on keyboard nav', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>Empty</flint-menubar-trigger>
                    <flint-menubar-content></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Should not throw
        fireKeyDown(bar, 'ArrowDown');
        fireKeyDown(bar, 'ArrowUp');
        fireKeyDown(bar, 'Home');
        fireKeyDown(bar, 'End');
        fireKeyDown(bar, 'Enter');
        await settle(bar);
    });

    it('disconnectedCallback cleans up listeners', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        bar.remove();
        // Should not throw when clicking document after removal
        document.body.click();
    });

    it('multiple rapid toggles do not break state', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));

        btn.click();
        btn.click();
        btn.click();
        await settle(bar);

        // Odd number of clicks → should be open
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('isOpen getter reflects current state', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        expect(menus[0].isOpen).toBe(false);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(menus[0].isOpen).toBe(true);

        bar.closeAll();
        await settle(bar);
        expect(menus[0].isOpen).toBe(false);
    });

    it('sub-trigger highlighted state follows sub open/close', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const subTrigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;

        sub.show();
        await new Promise(r => setTimeout(r, 100));
        expect(subTrigger.highlighted).toBe(true);

        sub.hideImmediate();
        expect(subTrigger.highlighted).toBe(false);
    });

    it('handles keyboard nav with mixed item types', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>Mix</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item>Item 1</flint-menubar-item>
                        <flint-menubar-checkbox-item>Check 1</flint-menubar-checkbox-item>
                        <flint-menubar-radio-group value="a">
                            <flint-menubar-radio-item value="a">Radio A</flint-menubar-radio-item>
                        </flint-menubar-radio-group>
                        <flint-menubar-sub>
                            <flint-menubar-sub-trigger>Sub</flint-menubar-sub-trigger>
                            <flint-menubar-sub-content>
                                <flint-menubar-item>SubItem</flint-menubar-item>
                            </flint-menubar-sub-content>
                        </flint-menubar-sub>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Navigate through all types
        fireKeyDown(bar, 'ArrowDown'); // Item 1
        await settle(bar);
        let h = getHighlighted(content);
        expect(h?.textContent?.trim()).toBe('Item 1');

        fireKeyDown(bar, 'ArrowDown'); // Check 1
        await settle(bar);
        h = getHighlighted(content);
        expect(h?.textContent?.trim()).toBe('Check 1');

        fireKeyDown(bar, 'ArrowDown'); // Radio A
        await settle(bar);
        h = getHighlighted(content);
        expect(h?.textContent?.trim()).toBe('Radio A');

        fireKeyDown(bar, 'ArrowDown'); // Sub trigger
        await settle(bar);
        h = getHighlighted(content);
        expect(h?.tagName).toBe('FLINT-MENUBAR-SUB-TRIGGER');
    });
});

describe('FlintMenubar — sub cleanup on disconnect', () => {
    it('sub clears timers on disconnect', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        // Start showing (queues timer)
        sub.show();
        // Disconnect immediately
        sub.remove();
        // Should not throw after timer fires
        await new Promise(r => setTimeout(r, 200));
    });
});

describe('FlintMenubar — radio group slotchange', () => {
    it('syncs checked on dynamic children', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>P</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-radio-group value="b">
                        </flint-menubar-radio-group>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;

        // Add items dynamically
        const item1 = document.createElement('flint-menubar-radio-item') as FlintMenubarRadioItem;
        item1.value = 'a';
        item1.textContent = 'A';
        const item2 = document.createElement('flint-menubar-radio-item') as FlintMenubarRadioItem;
        item2.value = 'b';
        item2.textContent = 'B';
        group.appendChild(item1);
        group.appendChild(item2);
        await settle(bar, 60);

        expect(item1.checked).toBe(false);
        expect(item2.checked).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════ */
/*  NEW TESTS — Improvements                                           */
/* ═══════════════════════════════════════════════════════════════════ */

describe('FlintMenubar — roving tabindex', () => {
    it('first trigger has tabIndex=0, others have -1 on initial render', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(getTriggerButton(getTrigger(menus[0])).tabIndex).toBe(0);
        expect(getTriggerButton(getTrigger(menus[1])).tabIndex).toBe(-1);
        expect(getTriggerButton(getTrigger(menus[2])).tabIndex).toBe(-1);
    });

    it('active trigger gets tabIndex=0 while open', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);

        expect(getTriggerButton(getTrigger(menus[0])).tabIndex).toBe(-1);
        expect(getTriggerButton(getTrigger(menus[1])).tabIndex).toBe(0);
    });

    it('first trigger retains tabIndex=0 after open/close cycle', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn0 = getTriggerButton(getTrigger(menus[0]));

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(btn0.tabIndex).toBe(0);

        bar.closeAll();
        await settle(bar);
        expect(btn0.tabIndex).toBe(0);
        expect(getTriggerButton(getTrigger(menus[1])).tabIndex).toBe(-1);
    });
});

describe('FlintMenubar — select event value excludes shortcut text', () => {
    it('item select event value is label only, not shortcut', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item>New Tab <flint-menubar-shortcut>⌘T</flint-menubar-shortcut></flint-menubar-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);
        bar.querySelector<FlintMenubarItem>('flint-menubar-item')!.select();
        await settle(bar);

        expect(spy.mock.calls[0][0].detail.value).toBe('New Tab');
    });

    it('explicit value prop takes precedence over label text', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item value="new-tab">New Tab</flint-menubar-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);
        bar.querySelector<FlintMenubarItem>('flint-menubar-item')!.select();
        await settle(bar);

        expect(spy.mock.calls[0][0].detail.value).toBe('new-tab');
    });

    it('checkbox change event value excludes shortcut text', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>View</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-checkbox-item>Show Bar <flint-menubar-shortcut>⌘B</flint-menubar-shortcut></flint-menubar-checkbox-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-checkbox-change', spy);
        bar.querySelector<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item')!.toggle();
        await settle(bar);

        expect(spy.mock.calls[0][0].detail.value).toBe('Show Bar');
    });
});

describe('FlintMenubar — label prop', () => {
    it('sets aria-label on the menubar div', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar label="Application Menu">
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const div = bar.shadowRoot!.querySelector('[role="menubar"]')!;
        expect(div.getAttribute('aria-label')).toBe('Application Menu');
    });

    it('defaults to "Menu bar" when label is not set', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const div = bar.shadowRoot!.querySelector('[role="menubar"]')!;
        expect(div.getAttribute('aria-label')).toBe('Menu bar');
    });
});

describe('FlintMenubar — activeIndex getter', () => {
    it('returns -1 when all closed', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });

    it('returns correct index when a menu is open', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);
        expect(bar.activeIndex).toBe(1);
    });

    it('returns -1 after closeAll', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        bar.closeAll();
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('FlintMenubar — Tab key', () => {
    it('Tab while menu is open closes it', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        fireKeyDown(bar, 'Tab');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
    });

    it('Tab when no menu is open is a no-op', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        // Should not throw
        fireKeyDown(bar, 'Tab');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('FlintMenubar — typeahead', () => {
    it('pressing a letter highlights the first matching item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Press 'p' — should jump to 'Print'
        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', bubbles: true, composed: true }));
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted?.textContent?.trim().toLowerCase()).toMatch(/^p/);
    });

    it('typeahead wraps around from current highlight position', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // End → highlight 'Print', then 'n' should find 'New Tab' (wraps)
        fireKeyDown(bar, 'End');
        await settle(bar);
        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true, composed: true }));
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted?.textContent?.trim().toLowerCase()).toMatch(/^n/);
    });

    it('typeahead is case-insensitive', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'P', bubbles: true, composed: true }));
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted?.textContent?.trim().toLowerCase()).toMatch(/^p/);
    });
});

describe('FlintMenubarSub — showImmediate', () => {
    it('showImmediate opens sub without delay', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.showImmediate();
        // No await — should be synchronous
        expect(sub.open).toBe(true);
        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;
        expect(subContent.open).toBe(true);
    });

    it('showImmediate cancels any pending timers', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.show(); // queues 80ms timer
        sub.showImmediate(); // should cancel and open immediately
        expect(sub.open).toBe(true);
    });

    it('ArrowRight on highlighted sub-trigger opens sub immediately', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Navigate to 'New', then 'Share' (sub-trigger)
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        const content = getContent(menus[0]);
        const highlighted = getHighlighted(content);
        expect(highlighted?.tagName).toBe('FLINT-MENUBAR-SUB-TRIGGER');

        // ArrowRight should open immediately (no timer)
        fireKeyDown(bar, 'ArrowRight');
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        expect(sub.open).toBe(true);
    });
});

describe('FlintMenubarSubTrigger — aria-expanded', () => {
    it('has aria-expanded=false when sub is closed', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subTrigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;
        await subTrigger.updateComplete;
        const div = subTrigger.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-expanded')).toBe('false');
    });

    it('has aria-expanded=true when sub is open', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const subTrigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;

        sub.showImmediate();
        await subTrigger.updateComplete;
        const div = subTrigger.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-expanded')).toBe('true');
    });

    it('aria-expanded resets to false after hideImmediate', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const subTrigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;

        sub.showImmediate();
        sub.hideImmediate();
        await subTrigger.updateComplete;
        const div = subTrigger.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-expanded')).toBe('false');
    });

    it('inset attribute reflects on sub-trigger', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-sub>
                            <flint-menubar-sub-trigger inset>Share</flint-menubar-sub-trigger>
                            <flint-menubar-sub-content><flint-menubar-item>Email</flint-menubar-item></flint-menubar-sub-content>
                        </flint-menubar-sub>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const subTrigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;
        expect(subTrigger.hasAttribute('inset')).toBe(true);
        expect(subTrigger.inset).toBe(true);
    });
});

describe('FlintMenubarMenu — disabled', () => {
    const DISABLED_FIXTURE = html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu disabled>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content><flint-menubar-item>Zoom</flint-menubar-item></flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `;

    it('disabled menu cannot be opened programmatically', async () => {
        const bar = await fixture<FlintMenubar>(DISABLED_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        menus[1].open();
        await settle(bar);
        expect(getContent(menus[1]).open).toBe(false);
    });

    it('disabled menu trigger has disabled attribute', async () => {
        const bar = await fixture<FlintMenubar>(DISABLED_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const trigger = getTrigger(menus[1]);
        await trigger.updateComplete;
        expect(trigger.disabled).toBe(true);
        expect(getTriggerButton(trigger).disabled).toBe(true);
    });

    it('keyboard nav skips disabled menu', async () => {
        const bar = await fixture<FlintMenubar>(DISABLED_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        // ArrowRight — should skip disabled Edit and jump to View
        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
        expect(getContent(menus[1]).open).toBe(false);
        expect(getContent(menus[2]).open).toBe(true);
    });

    it('disabled menu trigger is excluded from initial roving tabindex', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
                <flint-menubar-menu>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        // First non-disabled menu (Edit) should get tabIndex=0
        expect(getTriggerButton(getTrigger(menus[1])).tabIndex).toBe(0);
    });
});

describe('FlintMenubar — hover does not open when no menu is active', () => {
    it('hovering a trigger does not open it when no menu is open', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Hover over Edit trigger with no active menu
        getTrigger(menus[1]).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(getContent(menus[1]).open).toBe(false);
    });
});

describe('FlintMenubarMenu — getters', () => {
    it('trigger getter returns the direct trigger child', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(menus[0].trigger).toBe(getTrigger(menus[0]));
    });

    it('content getter returns the direct content child', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(menus[0].content).toBe(getContent(menus[0]));
    });
});

describe('FlintMenubarSeparator — hidden attribute', () => {
    it('hidden attribute is applied', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>F</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-separator hidden></flint-menubar-separator>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const sep = bar.querySelector('flint-menubar-separator')!;
        expect(sep.hasAttribute('hidden')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════ */
/*  COVERAGE TESTS — targeting uncovered branches                      */
/* ═══════════════════════════════════════════════════════════════════ */

describe('FlintMenubar — keyboard no-op when no menu is open', () => {
    it('ArrowRight is no-op when activeIndex is -1', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        // No menu open — ArrowRight should do nothing
        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
        expect(bar.activeIndex).toBe(-1);
    });

    it('ArrowLeft is no-op when activeIndex is -1', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
        expect(bar.activeIndex).toBe(-1);
    });

    it('Escape is no-op when no menu is open', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        // No active menu — Escape should not throw
        fireKeyDown(bar, 'Escape');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });

    it('ArrowUp is no-op when activeIndex is -1', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        fireKeyDown(bar, 'ArrowUp');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('FlintMenubar — ArrowLeft closes open sub-menu', () => {
    it('ArrowLeft closes open sub-menu instead of navigating to prev menu', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        sub.showImmediate();
        await settle(bar);
        expect(sub.open).toBe(true);

        // ArrowLeft — content has open sub, so it closes sub instead of navigating
        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        expect(sub.open).toBe(false);
        // Parent menu must still be open
        expect(getContent(menus[0]).open).toBe(true);
        // Should NOT have navigated to previous menu
        expect(getContent(menus[1]).open).toBe(false);
    });
});

describe('FlintMenubar — click event on non-trigger element', () => {
    it('clicking inside content area (not a trigger) does not open menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        // Click directly on the menubar container (not on a trigger)
        bar.click();
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
    });

    it('clicking on disabled menu trigger does not open', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
    });
});

describe('FlintMenubar — _handleClick with disabled items', () => {
    it('clicking a disabled item via content click handler fires no event', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Click the disabled 'Incognito' item
        const disabledItem = bar.querySelector<FlintMenubarItem>('flint-menubar-item[disabled]')!;
        disabledItem.click();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
        // Menu remains open since nothing closed it
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('clicking a disabled checkbox item via content click handler fires no event', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>View</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-checkbox-item disabled>Bookmarks</flint-menubar-checkbox-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-checkbox-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const cbItem = bar.querySelector<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item')!;
        cbItem.click();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
        expect(cbItem.checked).toBe(false);
    });

    it('clicking a disabled radio item via content click handler fires no event', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>P</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-radio-group value="a">
                            <flint-menubar-radio-item value="a">A</flint-menubar-radio-item>
                            <flint-menubar-radio-item value="b" disabled>B</flint-menubar-radio-item>
                        </flint-menubar-radio-group>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-radio-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        items[1].click(); // click disabled B
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;
        expect(group.value).toBe('a'); // unchanged
    });
});

describe('FlintMenubar — _handleMouseOver edge cases', () => {
    it('hovering a disabled item does not highlight it', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const disabledItem = bar.querySelector<FlintMenubarItem>('flint-menubar-item[disabled]')!;
        disabledItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(disabledItem.highlighted).toBe(false);
    });

    it('hovering same active trigger does not re-open or close menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        // Hover over the same (already active) trigger
        getTrigger(menus[0]).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        // Menu should still be open
        expect(getContent(menus[0]).open).toBe(true);
        expect(bar.activeIndex).toBe(0);
    });

    it('hovering a non-trigger, non-item element is ignored', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Mouseover on separator — not a navigable item, should not change highlight
        const sep = bar.querySelector('flint-menubar-separator')!;
        sep.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);
        // No item highlighted
        const content = getContent(menus[0]);
        const highlighted = getHighlighted(content);
        expect(highlighted).toBeUndefined();
    });
});

describe('FlintMenubarSub — timer cancellation', () => {
    it('show() cancels pending close timer', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.showImmediate();
        expect(sub.open).toBe(true);

        sub.hide(); // starts 60ms close timer
        sub.show(); // should cancel close timer, start 80ms open timer
        await new Promise(r => setTimeout(r, 120));
        // Sub should remain open (close timer was cancelled)
        expect(sub.open).toBe(true);
    });

    it('hide() cancels pending open timer', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.show(); // starts 80ms open timer
        sub.hide(); // should cancel open timer, start 60ms close timer
        await new Promise(r => setTimeout(r, 150));
        // Sub should remain closed (open timer was cancelled)
        expect(sub.open).toBe(false);
    });
});

describe('FlintMenubarContent — ArrowRight with empty sub-content', () => {
    it('ArrowRight on sub-trigger with no navigable sub-items does not throw', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-sub>
                            <flint-menubar-sub-trigger>Share</flint-menubar-sub-trigger>
                            <flint-menubar-sub-content></flint-menubar-sub-content>
                        </flint-menubar-sub>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown'); // highlight Share sub-trigger
        await settle(bar);
        fireKeyDown(bar, 'ArrowRight'); // open sub — no items to highlight
        await settle(bar);

        expect(sub.open).toBe(true);
    });
});

describe('FlintMenubarRadioGroup — disconnectedCallback', () => {
    it('disconnectedCallback removes flint-menubar-radio-select listener', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-radio-change', spy);

        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;
        // Disconnect the group
        group.remove();
        await settle(bar);

        // Dispatch the internal radio-select event directly on the detached group
        const item = group.querySelector<FlintMenubarRadioItem>('flint-menubar-radio-item')!;
        item.select();
        // Should not propagate to bar since group is removed
        expect(spy).not.toHaveBeenCalled();
    });
});

describe('FlintMenubar — ArrowDown with all menus disabled', () => {
    it('ArrowDown when all menus disabled is a no-op', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('FlintMenubar — Enter/Space opens focused trigger when no menu open', () => {
    // The component finds the trigger via 'flint-menubar-trigger[tabindex="0"]' selector
    // (light DOM attribute). We simulate this by setting the attribute manually.
    it('Enter opens the menu when trigger host has tabindex="0" attribute', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Simulate the trigger being "focused" by setting tabindex attribute on host
        getTrigger(menus[0]).setAttribute('tabindex', '0');

        fireKeyDown(bar, 'Enter');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('Space opens the menu when trigger host has tabindex="0" attribute', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTrigger(menus[0]).setAttribute('tabindex', '0');

        fireKeyDown(bar, ' ');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('Enter when no trigger has tabindex="0" does nothing', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Ensure no trigger has tabindex attribute (host level)
        getMenus(bar).forEach(m => getTrigger(m).removeAttribute('tabindex'));

        fireKeyDown(bar, 'Enter');
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
    });
});

describe('FlintMenubar — hover over disabled menu trigger when a menu is open', () => {
    it('hovering disabled menu trigger does not switch menus', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        // Hover the disabled Edit trigger
        getTrigger(menus[1]).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(true);
        expect(getContent(menus[1]).open).toBe(false);
    });
});

describe('FlintMenubar — _openMenu guard', () => {
    it('_openMenu does not open a disabled menu', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        // ArrowRight from open File menu skips disabled Edit
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Navigate to disabled menu directly via ArrowRight (with only 2 menus, should wrap)
        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        // Skips disabled Edit, wraps back to File
        expect(getContent(menus[0]).open).toBe(true);
        expect(getContent(menus[1]).open).toBe(false);
    });
});

describe('FlintMenubarContent — handleKeyDown with no highlighted item on Enter', () => {
    it('Enter/Space with no highlighted item does nothing', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        // No item highlighted — Enter should do nothing
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
    });
});

describe('FlintMenubar — ArrowRight from sub-trigger keeps menu open', () => {
    it('ArrowRight on sub-trigger does NOT navigate to next top-level menu', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Navigate to Share sub-trigger
        fireKeyDown(bar, 'ArrowDown'); // New
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown'); // Share
        await settle(bar);

        fireKeyDown(bar, 'ArrowRight'); // Opens sub-menu, must NOT switch to menus[1]
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(true);
        expect(getContent(menus[1]).open).toBe(false);
    });
});

describe('FlintMenubarSubContent — overflow detection', () => {
    it('does not overflow in jsdom (else branch clears styles)', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;

        sub.showImmediate();
        await subContent.updateComplete;
        // rAF fires — in jsdom rect.right is 0 which is less than window.innerWidth,
        // so the else branch executes (clears style.left/right)
        await new Promise(r => setTimeout(r, 50));

        expect(subContent.style.left).toBe('');
        expect(subContent.style.right).toBe('');
    });

    it('overflow detection sets left=auto right=100% when overflowing', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;

        // Mock getBoundingClientRect to simulate overflow
        const orig = subContent.getBoundingClientRect.bind(subContent);
        subContent.getBoundingClientRect = () => ({
            ...orig(),
            right: window.innerWidth + 100,
        } as DOMRect);

        sub.showImmediate();
        await subContent.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        expect(subContent.style.left).toBe('auto');
        expect(subContent.style.right).toBe('100%');

        // Restore
        subContent.getBoundingClientRect = orig;
    });
});

describe('FlintMenubar — typeahead with ctrl/meta/alt modifiers ignored', () => {
    it('Ctrl+key does not trigger typeahead', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', ctrlKey: true, bubbles: true, composed: true }));
        await settle(bar);

        expect(getHighlighted(content)).toBeUndefined();
    });

    it('Meta+key does not trigger typeahead', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', metaKey: true, bubbles: true, composed: true }));
        await settle(bar);

        expect(getHighlighted(content)).toBeUndefined();
    });
});

describe('FlintMenubar — navigate with no menus', () => {
    it('empty menubar does not crash on ArrowDown', async () => {
        const bar = await fixture<FlintMenubar>(html`<flint-menubar></flint-menubar>`);
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown');
        fireKeyDown(bar, 'ArrowRight');
        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('FlintMenubarContent — ArrowLeft when no sub is open', () => {
    it('ArrowLeft with no open sub does not prevent parent menubar from navigating', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Open second menu (Edit)
        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);
        expect(getContent(menus[1]).open).toBe(true);

        // ArrowLeft — no open sub in Edit's content, should navigate to File
        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        expect(getContent(menus[1]).open).toBe(false);
        expect(getContent(menus[0]).open).toBe(true);
    });
});

describe('FlintMenubar — _handleRequestClose returns focus', () => {
    it('Escape returns focus to the trigger element (or its shadow host)', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        fireKeyDown(bar, 'Escape');
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        // In jsdom, document.activeElement for shadow DOM focus resolves to the shadow host
        const trigger = getTrigger(menus[0]);
        const btn = getTriggerButton(trigger);
        const focused = document.activeElement;
        expect(focused === trigger || focused === btn).toBe(true);
    });
});

describe('FlintMenubar — _handleOutsideClick early return', () => {
    it('outside click when no menu is open is a no-op', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
        // Click outside — should not throw, activeIndex stays -1
        document.body.click();
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('FlintMenubar — _handleRequestClose via item click', () => {
    it('clicking an item fires _menubar-request-close and closes menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-request-close', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        const items = getItems(getContent(menus[0]));
        items[0].click();
        await settle(bar);

        expect(spy).toHaveBeenCalled();
        expect(getContent(menus[0]).open).toBe(false);
    });

    it('_handleRequestClose focuses the trigger after close', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Fire _menubar-request-close directly — simulates content requesting close
        bar.dispatchEvent(new CustomEvent('flint-menubar-request-close', { bubbles: true, composed: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        // Focus moved to trigger (shadow host or inner button)
        const trigger = getTrigger(menus[0]);
        const btn = getTriggerButton(trigger);
        const focused = document.activeElement;
        expect(focused === trigger || focused === btn || focused?.closest?.('flint-menubar-trigger') !== null).toBe(true);
    });
});

describe('FlintMenubar — item disabled branch in select()', () => {
    it('select() on disabled item does not dispatch event (disabled=true branch)', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        // Get disabled item and explicitly call select
        const disabledItem = bar.querySelector<FlintMenubarItem>('flint-menubar-item[disabled]')!;
        expect(disabledItem.disabled).toBe(true);
        disabledItem.select();

        expect(spy).not.toHaveBeenCalled();
    });
});

describe('FlintMenubar — hover switches menu while another is open', () => {
    it('hovering a different trigger while a menu is open switches to it', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Open first menu via click
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);

        // Hover over second trigger (different from active)
        getTrigger(menus[1]).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        expect(getContent(menus[1]).open).toBe(true);
    });
});

describe('FlintMenubar — ArrowDown opens first menu when none is open', () => {
    it('ArrowDown with no open menu opens the first non-disabled menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        expect(bar.activeIndex).toBe(-1);
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        // First menu should now be open
        expect(getContent(menus[0]).open).toBe(true);
        expect(bar.activeIndex).toBe(0);
    });

    it('ArrowDown with no open menu also moves highlight to first item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        // After ArrowDown opens menu, it also delegates ArrowDown to content
        const highlighted = getHighlighted(content);
        expect(highlighted).toBeTruthy();
        expect(highlighted!.textContent?.trim()).toBe('New Tab');
    });
});

describe('FlintMenubarContent — handleKeyDown called directly', () => {
    // These cover defensive branches in FlintMenubarContent.handleKeyDown that
    // are not reached through the normal FlintMenubar delegation path.

    it('Escape directly on content fires _menubar-request-close', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-request-close', spy);

        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await settle(bar);

        expect(spy).toHaveBeenCalled();
    });

    it('ArrowLeft directly on content with no open sub does nothing (break)', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // No open sub — ArrowLeft in content just breaks; no error
        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await settle(bar);
        // Menu remains open
        expect(content.open).toBe(true);
    });

    it('ArrowRight directly on content with highlighted non-sub-trigger item breaks without opening sub', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Highlight first item (a regular flint-menubar-item, not a sub-trigger)
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted?.tagName).toBe('FLINT-MENUBAR-ITEM');

        // ArrowRight directly on content — not a sub-trigger, so it just breaks
        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await settle(bar);
        // Menu remains open, no sub opened
        expect(content.open).toBe(true);
    });
});

describe('FlintMenubarContent — keyboard on sub-trigger via Enter', () => {
    it('Enter on sub-trigger opens the sub-menu immediately', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown'); // New
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown'); // Share (sub-trigger)
        await settle(bar);

        fireKeyDown(bar, 'Enter'); // Should open sub immediately
        await settle(bar);

        expect(sub.open).toBe(true);
    });

    it('Space on sub-trigger opens the sub-menu immediately', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown'); // New
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown'); // Share (sub-trigger)
        await settle(bar);

        fireKeyDown(bar, ' '); // Should open sub immediately
        await settle(bar);

        expect(sub.open).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════ */
/*  MUTATION-KILLING TESTS                                             */
/* ═══════════════════════════════════════════════════════════════════ */

describe('FlintMenubarShortcut — shadow DOM slot', () => {
    it('shadow DOM contains a slot element', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>F</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item>New <flint-menubar-shortcut>⌘N</flint-menubar-shortcut></flint-menubar-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const shortcut = bar.querySelector<FlintMenubarShortcut>('flint-menubar-shortcut')!;
        const slot = shortcut.shadowRoot!.querySelector('slot');
        expect(slot).toBeTruthy();
    });
});

describe('FlintMenubarGroup — aria-label on group div', () => {
    it('sets aria-label on role="group" div when heading is provided', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>F</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-group heading="Actions">
                            <flint-menubar-item>New</flint-menubar-item>
                        </flint-menubar-group>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarGroup>('flint-menubar-group')!;
        const groupDiv = group.shadowRoot!.querySelector('[role="group"]')!;
        expect(groupDiv.getAttribute('aria-label')).toBe('Actions');
    });

    it('aria-label is absent on role="group" div when no heading', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>F</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-group>
                            <flint-menubar-item>New</flint-menubar-item>
                        </flint-menubar-group>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarGroup>('flint-menubar-group')!;
        const groupDiv = group.shadowRoot!.querySelector('[role="group"]')!;
        const ariaLabel = groupDiv.getAttribute('aria-label');
        expect(!ariaLabel || ariaLabel === '').toBe(true);
    });
});

describe('FlintMenubarItem — _labelText with multiple text nodes', () => {
    it('joins multiple text nodes with empty string (not a separator)', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>F</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-item>Open <flint-menubar-shortcut>⌘O</flint-menubar-shortcut> File</flint-menubar-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);
        const item = bar.querySelector<FlintMenubarItem>('flint-menubar-item')!;
        item.select();
        const val: string = spy.mock.calls[0][0].detail.value;
        expect(val).not.toContain('Stryker');
        expect(val).toMatch(/open.*file/i);
    });

    it('checkbox _labelText joins multiple text nodes correctly', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>F</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-checkbox-item>Show <flint-menubar-shortcut>⌘B</flint-menubar-shortcut> Bar</flint-menubar-checkbox-item>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const spy = vi.fn();
        bar.addEventListener('flint-menubar-checkbox-change', spy);
        const item = bar.querySelector<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item')!;
        item.toggle();
        const val: string = spy.mock.calls[0][0].detail.value;
        expect(val).not.toContain('Stryker');
        expect(val).toMatch(/show.*bar/i);
    });
});

describe('FlintMenubarCheckboxItem — initial property values', () => {
    it('highlighted is false by default', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        expect(items[0].highlighted).toBe(false);
        expect(items[1].highlighted).toBe(false);
    });

    it('toggle() changes checked from false to true', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        expect(items[0].checked).toBe(false);
        items[0].toggle();
        expect(items[0].checked).toBe(true);
    });

    it('toggle() changes checked from true to false', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        expect(items[1].checked).toBe(true);
        items[1].toggle();
        expect(items[1].checked).toBe(false);
    });
});

describe('FlintMenubarRadioItem — initial property values', () => {
    it('highlighted is false by default', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        items.forEach(item => expect(item.highlighted).toBe(false));
    });

    it('checked radio item renders filled dot SVG with circle', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        const checkedSvg = items[1].shadowRoot!.querySelector('svg');
        expect(checkedSvg).toBeTruthy();
        const circle = checkedSvg!.querySelector('circle');
        expect(circle).toBeTruthy();
        expect(circle!.getAttribute('fill')).toBe('currentColor');
    });

    it('unchecked radio item renders no SVG', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<FlintMenubarRadioItem>('flint-menubar-radio-item');
        expect(items[0].shadowRoot!.querySelector('svg')).toBeNull();
    });
});

describe('FlintMenubarRadioGroup — group div exists', () => {
    it('renders role="group" div in shadow DOM', async () => {
        const bar = await fixture<FlintMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const group = bar.querySelector<FlintMenubarRadioGroup>('flint-menubar-radio-group')!;
        const groupDiv = group.shadowRoot!.querySelector('[role="group"]')!;
        expect(groupDiv).toBeTruthy();
    });
});

describe('FlintMenubarSubContent — overflow detection boundary', () => {
    it('does NOT flip when rect.right exactly equals window.innerWidth', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;

        const orig = subContent.getBoundingClientRect.bind(subContent);
        subContent.getBoundingClientRect = () => ({
            ...orig(),
            right: window.innerWidth,
        } as DOMRect);

        sub.showImmediate();
        await subContent.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        expect(subContent.style.left).toBe('');
        expect(subContent.style.right).toBe('');

        subContent.getBoundingClientRect = orig;
    });

    it('flips when rect.right is 1px beyond viewport', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const subContent = bar.querySelector<FlintMenubarSubContent>('flint-menubar-sub-content')!;

        const orig = subContent.getBoundingClientRect.bind(subContent);
        subContent.getBoundingClientRect = () => ({
            ...orig(),
            right: window.innerWidth + 1,
        } as DOMRect);

        sub.showImmediate();
        await subContent.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        expect(subContent.style.left).toBe('auto');
        expect(subContent.style.right).toBe('100%');

        subContent.getBoundingClientRect = orig;
    });
});

describe('FlintMenubarSubTrigger — highlighted/expanded reflect sub state', () => {
    it('highlighted is true when sub opens', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const trigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;

        sub.showImmediate();
        expect(trigger.highlighted).toBe(true);
        expect(trigger.expanded).toBe(true);
    });

    it('highlighted is false when sub closes', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        const trigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;

        sub.showImmediate();
        sub.hideImmediate();
        expect(trigger.highlighted).toBe(false);
        expect(trigger.expanded).toBe(false);
    });
});

describe('FlintMenubarSub — timer cancellation edge cases', () => {
    it('showImmediate cancels a pending close timer', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.showImmediate();
        sub.hide();          // start close timer (60ms)
        sub.showImmediate(); // should cancel close timer and keep open
        await new Promise(r => setTimeout(r, 120));
        expect(sub.open).toBe(true);
    });

    it('hideImmediate cancels a pending close timer and closes immediately', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.showImmediate();
        sub.hide();          // start close timer
        sub.hideImmediate(); // cancel close timer, close immediately
        expect(sub.open).toBe(false);
        await new Promise(r => setTimeout(r, 120));
        expect(sub.open).toBe(false);
    });

    it('show() cancels a pending open timer before starting another', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.show(); // 80ms open timer
        sub.show(); // cancels first, starts new 80ms timer
        await new Promise(r => setTimeout(r, 120));
        expect(sub.open).toBe(true);
    });

    it('hide() cancels a pending close timer before starting another', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.showImmediate();
        sub.hide();
        sub.hide();
        await new Promise(r => setTimeout(r, 120));
        expect(sub.open).toBe(false);
    });
});

describe('FlintMenubarSub — mouseenter and mouseleave events', () => {
    it('mouseenter triggers show() which opens sub after delay', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.dispatchEvent(new MouseEvent('mouseenter'));
        await new Promise(r => setTimeout(r, 120));
        expect(sub.open).toBe(true);
    });

    it('mouseleave triggers hide() which closes sub after delay', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.showImmediate();
        sub.dispatchEvent(new MouseEvent('mouseleave'));
        await new Promise(r => setTimeout(r, 120));
        expect(sub.open).toBe(false);
    });

    it('mouseenter then mouseleave cancels open', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.dispatchEvent(new MouseEvent('mouseenter'));
        sub.dispatchEvent(new MouseEvent('mouseleave'));
        await new Promise(r => setTimeout(r, 150));
        expect(sub.open).toBe(false);
    });

    it('disconnecting sub removes mouseenter/mouseleave listeners', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        sub.remove();
        sub.dispatchEvent(new MouseEvent('mouseenter'));
        sub.dispatchEvent(new MouseEvent('mouseleave'));
        await new Promise(r => setTimeout(r, 120));
        // No crash = pass
    });
});

describe('FlintMenubarMenu — isOpen without content child', () => {
    it('isOpen returns false when menu has no content element', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menu = bar.querySelector<FlintMenubarMenu>('flint-menubar-menu')!;
        expect(menu.content).toBeNull();
        expect(menu.isOpen).toBe(false);
    });
});

describe('FlintMenubarContent — typeahead altKey exclusion', () => {
    it('Alt+key in content does not trigger typeahead', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'n', altKey: true }));
        await settle(bar);
        expect(getHighlighted(content)).toBeUndefined();
    });

    it('Alt+key via bar does not trigger typeahead', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', altKey: true, bubbles: true, composed: true }));
        await settle(bar);
        expect(getHighlighted(content)).toBeUndefined();
    });
});

describe('FlintMenubarContent — typeahead start index', () => {
    it('typeahead starts from index 0 when no item is highlighted', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'n' }));
        await settle(bar);
        const h = getHighlighted(content);
        expect(h?.textContent?.trim().toLowerCase()).toMatch(/^n/);
    });
});

describe('FlintMenubar — _navigate with all menus disabled skips _openMenu', () => {
    it('navigate does not open when only disabled menus remain', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Disable the active menu so navigate loops back to disabled
        menus[0].disabled = true;
        await menus[0].updateComplete;

        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        expect(getContent(menus[1]).open).toBe(false);
    });
});

describe('FlintMenubar — ArrowDown opens first non-disabled menu when first is disabled', () => {
    it('ArrowDown skips disabled first menu and opens second', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu disabled>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
                <flint-menubar-menu>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        expect(getContent(menus[1]).open).toBe(true);
        expect(bar.activeIndex).toBe(1);
    });
});

describe('FlintMenubar — hover on bar (no trigger ancestor) is ignored', () => {
    it('mouseover on bar itself does not switch active menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        bar.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(true);
        expect(bar.activeIndex).toBe(0);
    });
});

describe('FlintMenubar — Escape key calls btn.focus()', () => {
    it('Escape invokes focus() on the trigger button', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const btn = getTriggerButton(getTrigger(menus[0]));
        const focusSpy = vi.spyOn(btn, 'focus');

        fireKeyDown(bar, 'Escape');
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        expect(focusSpy).toHaveBeenCalled();
        focusSpy.mockRestore();
    });
});

describe('FlintMenubar — _handleRequestClose calls btn.focus()', () => {
    it('_handleRequestClose invokes focus() on the trigger button', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const btn = getTriggerButton(getTrigger(menus[0]));
        const focusSpy = vi.spyOn(btn, 'focus');

        bar.dispatchEvent(new CustomEvent('flint-menubar-request-close', { bubbles: true, composed: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        expect(focusSpy).toHaveBeenCalled();
        focusSpy.mockRestore();
    });
});

describe('FlintMenubar — Tab closes active menu', () => {
    it('Tab when menu is open sets activeIndex to -1', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(bar.activeIndex).toBe(0);

        fireKeyDown(bar, 'Tab');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
        expect(getContent(menus[0]).open).toBe(false);
    });
});

describe('FlintMenubar — content?.handleKeyDown delegation', () => {
    it('typeahead delegates to active content.handleKeyDown', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const handleSpy = vi.spyOn(content, 'handleKeyDown');
        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true, composed: true }));
        await settle(bar);

        expect(handleSpy).toHaveBeenCalled();
        handleSpy.mockRestore();
    });

    it('ArrowDown when menu open calls content.handleKeyDown', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const handleSpy = vi.spyOn(content, 'handleKeyDown');
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        expect(handleSpy).toHaveBeenCalled();
        handleSpy.mockRestore();
    });
});

describe('FlintMenubarContent — highlight index wrapping', () => {
    it('ArrowUp from index 0 wraps to last item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'Home');
        await settle(bar);
        expect(getHighlighted(content)?.textContent?.trim()).toBe('New Tab');

        fireKeyDown(bar, 'ArrowUp');
        await settle(bar);
        expect(getHighlighted(content)?.textContent?.trim()).toBe('Print');
    });

    it('ArrowUp from -1 highlights a valid item via modulo', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // From _highlightIndex=-1: _highlightItem(-2), modulo 3 → index 1 = "New Window"
        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await settle(bar);
        const h = getHighlighted(content);
        expect(h).toBeTruthy();
    });
});

describe('FlintMenubarContent — Enter activates last item correctly', () => {
    it('Enter with highlightIndex at items.length-1 activates last item', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('flint-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'End');
        await settle(bar);
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0].detail.value).toBe('Print');
    });
});

describe('FlintMenubar — hover exact index check', () => {
    it('hovering trigger with same index as activeIndex stays open', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(bar.activeIndex).toBe(0);

        getTrigger(menus[0]).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(true);
        expect(bar.activeIndex).toBe(0);
    });

    it('hovering trigger with different index opens that menu', async () => {
        const bar = await fixture<FlintMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        getTrigger(menus[2]).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        expect(getContent(menus[2]).open).toBe(true);
        expect(bar.activeIndex).toBe(2);
    });
});

describe('FlintMenubarContent — ArrowRight with no highlighted item', () => {
    it('ArrowRight without highlighted item does not open sub', async () => {
        const bar = await fixture<FlintMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const content = getContent(menus[0]);
        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        await settle(bar);

        expect(sub.open).toBe(false);
    });
});

describe('FlintMenubarMenu — open/close without trigger or content', () => {
    it('open() with null trigger does not throw', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menu = bar.querySelector<FlintMenubarMenu>('flint-menubar-menu')!;
        expect(() => menu.open()).not.toThrow();
    });

    it('close() with null trigger does not throw', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menu = bar.querySelector<FlintMenubarMenu>('flint-menubar-menu')!;
        expect(() => menu.close()).not.toThrow();
    });
});

describe('FlintMenubarContent — mouseover on disabled sub-trigger', () => {
    it('hovering disabled sub-trigger does not highlight it', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-sub>
                            <flint-menubar-sub-trigger disabled>Share</flint-menubar-sub-trigger>
                            <flint-menubar-sub-content><flint-menubar-item>Email</flint-menubar-item></flint-menubar-sub-content>
                        </flint-menubar-sub>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const subTrigger = bar.querySelector<FlintMenubarSubTrigger>('flint-menubar-sub-trigger')!;
        subTrigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(subTrigger.highlighted).toBe(false);
    });
});

describe('FlintMenubarSub — _syncState with empty sub', () => {
    it('showImmediate on sub with no children does not throw', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>F</flint-menubar-trigger>
                    <flint-menubar-content>
                        <flint-menubar-sub></flint-menubar-sub>
                    </flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const sub = bar.querySelector<FlintMenubarSub>('flint-menubar-sub')!;
        expect(() => sub.showImmediate()).not.toThrow();
        expect(sub.open).toBe(true);
    });
});

describe('FlintMenubar — ArrowRight/Left optional chain on content', () => {
    it('ArrowRight when active menu has no content does not throw', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                </flint-menubar-menu>
                <flint-menubar-menu>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>Undo</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        expect(() => fireKeyDown(bar, 'ArrowRight')).not.toThrow();
    });

    it('ArrowLeft when active menu has no content does not throw', async () => {
        const bar = await fixture<FlintMenubar>(html`
            <flint-menubar>
                <flint-menubar-menu>
                    <flint-menubar-trigger>File</flint-menubar-trigger>
                    <flint-menubar-content><flint-menubar-item>New</flint-menubar-item></flint-menubar-content>
                </flint-menubar-menu>
                <flint-menubar-menu>
                    <flint-menubar-trigger>Edit</flint-menubar-trigger>
                </flint-menubar-menu>
            </flint-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);

        expect(() => fireKeyDown(bar, 'ArrowLeft')).not.toThrow();
    });
});

describe('FlintMenubarCheckboxItem — keyboard toggle does not close menu', () => {
    it('Enter on highlighted checkbox toggles it and keeps menu open', async () => {
        const bar = await fixture<FlintMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        const items = bar.querySelectorAll<FlintMenubarCheckboxItem>('flint-menubar-checkbox-item');
        const was = items[1].checked;
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        expect(items[1].checked).toBe(!was);
        expect(getContent(menus[0]).open).toBe(true);
    });
});

describe('flint-menubar — accessibility', () => {
    it('should be accessible', { timeout: 15_000 }, async () => {
        const el = await fixture(html`
            <flint-menubar aria-label="Main menu">
                <flint-menubar-item label="File"></flint-menubar-item>
                <flint-menubar-item label="Edit"></flint-menubar-item>
            </flint-menubar>
        `);
        await expectAccessible(el, { rules: { 'aria-command-name': { enabled: false }, 'aria-required-parent': { enabled: false } } });
    });
});
