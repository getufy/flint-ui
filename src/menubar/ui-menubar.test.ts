import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-menubar.js';
import type {
    UiMenubar,
    UiMenubarMenu,
    UiMenubarTrigger,
    UiMenubarContent,
    UiMenubarItem,
    UiMenubarCheckboxItem,
    UiMenubarRadioGroup,
    UiMenubarRadioItem,
    UiMenubarSub,
    UiMenubarSubContent,
    UiMenubarSubTrigger,
    UiMenubarShortcut,
    UiMenubarGroup,
} from './ui-menubar.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                            */
/* ─────────────────────────────────────────────────────────────────── */

async function settle(el: Element, ms = 30) {
    await (el as UiMenubar).updateComplete;
    await new Promise((r) => setTimeout(r, ms));
}

function getMenus(bar: UiMenubar): UiMenubarMenu[] {
    return Array.from(bar.querySelectorAll(':scope > ui-menubar-menu'));
}

function getTrigger(menu: UiMenubarMenu): UiMenubarTrigger {
    return menu.querySelector('ui-menubar-trigger')!;
}

function getTriggerButton(trigger: UiMenubarTrigger): HTMLButtonElement {
    return trigger.shadowRoot!.querySelector('button')!;
}

function getContent(menu: UiMenubarMenu): UiMenubarContent {
    return menu.querySelector('ui-menubar-content')!;
}

function getItems(content: UiMenubarContent): UiMenubarItem[] {
    return Array.from(content.querySelectorAll('ui-menubar-item'));
}

function getHighlighted(content: UiMenubarContent): HTMLElement | undefined {
    const all = content.querySelectorAll<HTMLElement>(
        'ui-menubar-item, ui-menubar-checkbox-item, ui-menubar-radio-item, ui-menubar-sub-trigger'
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
    <ui-menubar>
        <ui-menubar-menu>
            <ui-menubar-trigger>File</ui-menubar-trigger>
            <ui-menubar-content>
                <ui-menubar-item>New Tab</ui-menubar-item>
                <ui-menubar-item>New Window</ui-menubar-item>
                <ui-menubar-item disabled>Incognito</ui-menubar-item>
                <ui-menubar-separator></ui-menubar-separator>
                <ui-menubar-item>Print</ui-menubar-item>
            </ui-menubar-content>
        </ui-menubar-menu>
        <ui-menubar-menu>
            <ui-menubar-trigger>Edit</ui-menubar-trigger>
            <ui-menubar-content>
                <ui-menubar-item>Undo</ui-menubar-item>
                <ui-menubar-item>Redo</ui-menubar-item>
            </ui-menubar-content>
        </ui-menubar-menu>
        <ui-menubar-menu>
            <ui-menubar-trigger>View</ui-menubar-trigger>
            <ui-menubar-content>
                <ui-menubar-item>Zoom In</ui-menubar-item>
            </ui-menubar-content>
        </ui-menubar-menu>
    </ui-menubar>
`;

const CHECKBOX_FIXTURE = html`
    <ui-menubar>
        <ui-menubar-menu>
            <ui-menubar-trigger>View</ui-menubar-trigger>
            <ui-menubar-content>
                <ui-menubar-checkbox-item>Bookmarks</ui-menubar-checkbox-item>
                <ui-menubar-checkbox-item checked>Full URLs</ui-menubar-checkbox-item>
            </ui-menubar-content>
        </ui-menubar-menu>
    </ui-menubar>
`;

const RADIO_FIXTURE = html`
    <ui-menubar>
        <ui-menubar-menu>
            <ui-menubar-trigger>Profiles</ui-menubar-trigger>
            <ui-menubar-content>
                <ui-menubar-radio-group value="benoit">
                    <ui-menubar-radio-item value="andy">Andy</ui-menubar-radio-item>
                    <ui-menubar-radio-item value="benoit">Benoit</ui-menubar-radio-item>
                    <ui-menubar-radio-item value="luis">Luis</ui-menubar-radio-item>
                </ui-menubar-radio-group>
            </ui-menubar-content>
        </ui-menubar-menu>
    </ui-menubar>
`;

const SUB_FIXTURE = html`
    <ui-menubar>
        <ui-menubar-menu>
            <ui-menubar-trigger>File</ui-menubar-trigger>
            <ui-menubar-content>
                <ui-menubar-item>New</ui-menubar-item>
                <ui-menubar-sub>
                    <ui-menubar-sub-trigger>Share</ui-menubar-sub-trigger>
                    <ui-menubar-sub-content>
                        <ui-menubar-item>Email</ui-menubar-item>
                        <ui-menubar-item>Messages</ui-menubar-item>
                    </ui-menubar-sub-content>
                </ui-menubar-sub>
                <ui-menubar-item>Print</ui-menubar-item>
            </ui-menubar-content>
        </ui-menubar-menu>
        <ui-menubar-menu>
            <ui-menubar-trigger>Edit</ui-menubar-trigger>
            <ui-menubar-content>
                <ui-menubar-item>Undo</ui-menubar-item>
            </ui-menubar-content>
        </ui-menubar-menu>
    </ui-menubar>
`;

/* ═══════════════════════════════════════════════════════════════════ */
/*  TESTS                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

describe('UiMenubar — rendering', () => {
    it('renders all menu triggers', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(menus).toHaveLength(3);
        expect(getTrigger(menus[0]).textContent?.trim()).toBe('File');
        expect(getTrigger(menus[1]).textContent?.trim()).toBe('Edit');
        expect(getTrigger(menus[2]).textContent?.trim()).toBe('View');
    });

    it('has role="menubar" in shadow DOM', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const div = bar.shadowRoot!.querySelector('[role="menubar"]');
        expect(div).toBeTruthy();
    });

    it('renders items inside content', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const items = getItems(getContent(menus[0]));
        expect(items).toHaveLength(4); // 3 items + 1 disabled
    });

    it('all menus start closed', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        menus.forEach(menu => {
            expect(getContent(menu).open).toBe(false);
        });
    });

    it('renders separator element', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const seps = bar.querySelectorAll('ui-menubar-separator');
        expect(seps.length).toBeGreaterThan(0);
    });
});

describe('UiMenubar — shortcut', () => {
    it('renders shortcut text', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-item>New <ui-menubar-shortcut>⌘N</ui-menubar-shortcut></ui-menubar-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const shortcut = bar.querySelector<UiMenubarShortcut>('ui-menubar-shortcut')!;
        expect(shortcut).toBeTruthy();
        expect(shortcut.textContent?.trim()).toBe('⌘N');
    });
});

describe('UiMenubar — group', () => {
    it('renders heading when provided', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-group heading="Actions">
                            <ui-menubar-item>New</ui-menubar-item>
                        </ui-menubar-group>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<UiMenubarGroup>('ui-menubar-group')!;
        const heading = group.shadowRoot!.querySelector('.heading');
        expect(heading).toBeTruthy();
        expect(heading!.textContent?.trim()).toBe('Actions');
    });

    it('does not render heading when empty', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-group>
                            <ui-menubar-item>New</ui-menubar-item>
                        </ui-menubar-group>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<UiMenubarGroup>('ui-menubar-group')!;
        const heading = group.shadowRoot!.querySelector('.heading');
        expect(heading).toBeNull();
    });
});

describe('UiMenubar — open / close', () => {
    it('opens menu on trigger click', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        btn.click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);
        expect(getTrigger(menus[0]).active).toBe(true);
    });

    it('closes menu on second trigger click (toggle)', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — keyboard navigation between menus', () => {
    it('ArrowRight opens next menu', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — keyboard navigation within items', () => {
    it('ArrowDown highlights next item', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — item selection', () => {
    it('Enter activates highlighted item and fires event', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);

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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, ' ');
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
    });

    it('clicking an item fires select and closes menu', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);

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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const disabledItem = bar.querySelector('ui-menubar-item[disabled]') as UiMenubarItem;
        disabledItem.select();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
    });
});

describe('UiMenubar — inset items', () => {
    it('reflects inset attribute', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>View</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-item inset>Reload</ui-menubar-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const item = bar.querySelector('ui-menubar-item') as UiMenubarItem;
        expect(item.hasAttribute('inset')).toBe(true);
        expect(item.inset).toBe(true);
    });
});

describe('UiMenubarCheckboxItem', () => {
    it('renders with initial checked state', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<UiMenubarCheckboxItem>('ui-menubar-checkbox-item');
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(true);
    });

    it('toggles checked state on click', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarCheckboxItem>('ui-menubar-checkbox-item');
        items[0].click();
        await settle(bar);
        expect(items[0].checked).toBe(true);

        items[0].click();
        await settle(bar);
        expect(items[0].checked).toBe(false);
    });

    it('fires ui-menubar-checkbox-change event', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-checkbox-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarCheckboxItem>('ui-menubar-checkbox-item');
        items[0].click();
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.checked).toBe(true);
    });

    it('does not toggle when disabled', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>View</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-checkbox-item disabled>Bookmarks</ui-menubar-checkbox-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const item = bar.querySelector<UiMenubarCheckboxItem>('ui-menubar-checkbox-item')!;
        item.toggle();
        expect(item.checked).toBe(false);
    });

    it('renders checkmark SVG when checked', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<UiMenubarCheckboxItem>('ui-menubar-checkbox-item');
        const svg0 = items[0].shadowRoot!.querySelector('svg');
        const svg1 = items[1].shadowRoot!.querySelector('svg');
        expect(svg0).toBeNull(); // unchecked
        expect(svg1).toBeTruthy(); // checked
    });

    it('does not close menu on checkbox click', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarCheckboxItem>('ui-menubar-checkbox-item');
        items[0].click();
        await settle(bar);

        // Menu should remain open after checkbox toggle
        expect(getContent(menus[0]).open).toBe(true);
    });
});

describe('UiMenubarRadioGroup', () => {
    it('renders with initial value', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const group = bar.querySelector<UiMenubarRadioGroup>('ui-menubar-radio-group')!;
        expect(group.value).toBe('benoit');
    });

    it('syncs checked state to radio items', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        expect(items[0].checked).toBe(false); // andy
        expect(items[1].checked).toBe(true);  // benoit
        expect(items[2].checked).toBe(false); // luis
    });

    it('changes value on radio item click', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        items[0].click(); // click Andy
        await settle(bar);

        const group = bar.querySelector<UiMenubarRadioGroup>('ui-menubar-radio-group')!;
        expect(group.value).toBe('andy');
        expect(items[0].checked).toBe(true);
        expect(items[1].checked).toBe(false);
    });

    it('fires ui-menubar-radio-change event', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-radio-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        items[2].click(); // click Luis
        await settle(bar);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.value).toBe('luis');
    });

    it('does not fire change for disabled radio item', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>P</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-radio-group value="a">
                            <ui-menubar-radio-item value="a">A</ui-menubar-radio-item>
                            <ui-menubar-radio-item value="b" disabled>B</ui-menubar-radio-item>
                        </ui-menubar-radio-group>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-radio-change', spy);

        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        items[1].select();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
    });

    it('renders dot SVG for checked radio item', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        const svg0 = items[0].shadowRoot!.querySelector('svg');
        const svg1 = items[1].shadowRoot!.querySelector('svg');
        expect(svg0).toBeNull();
        expect(svg1).toBeTruthy(); // benoit is checked
    });

    it('does not close menu on radio click', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        items[0].click();
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(true);
    });

    it('updates checked when value property changes programmatically', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const group = bar.querySelector<UiMenubarRadioGroup>('ui-menubar-radio-group')!;
        group.value = 'luis';
        await group.updateComplete;
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        expect(items[2].checked).toBe(true);
        expect(items[1].checked).toBe(false);
    });
});

describe('UiMenubarSub', () => {
    it('renders sub-trigger with arrow icon', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subTrigger = bar.querySelector<UiMenubarSubTrigger>('ui-menubar-sub-trigger')!;
        const arrow = subTrigger.shadowRoot!.querySelector('.arrow');
        expect(arrow).toBeTruthy();
    });

    it('sub-content starts closed', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subContent = bar.querySelector<UiMenubarSubContent>('ui-menubar-sub-content')!;
        expect(subContent.open).toBe(false);
    });

    it('show() opens sub-content', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        sub.show();
        await new Promise(r => setTimeout(r, 100));

        const subContent = bar.querySelector<UiMenubarSubContent>('ui-menubar-sub-content')!;
        expect(subContent.open).toBe(true);
    });

    it('hideImmediate() closes sub-content', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        sub.show();
        await new Promise(r => setTimeout(r, 100));
        expect(sub.open).toBe(true);

        sub.hideImmediate();
        expect(sub.open).toBe(false);
    });

    it('closing parent menu closes sub-menus', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

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
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subContent = bar.querySelector<UiMenubarSubContent>('ui-menubar-sub-content')!;
        const panel = subContent.shadowRoot!.querySelector('.panel');
        expect(panel!.getAttribute('role')).toBe('menu');
    });
});

describe('UiMenubar — trigger states', () => {
    it('trigger has aria-expanded false when closed', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('trigger has aria-expanded true when open', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        await getTrigger(menus[0]).updateComplete;

        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('trigger has role="menuitem"', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('role')).toBe('menuitem');
    });

    it('trigger has aria-haspopup', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const btn = getTriggerButton(getTrigger(menus[0]));
        expect(btn.getAttribute('aria-haspopup')).toBe('true');
    });
});

describe('UiMenubar — content role', () => {
    it('content panel has role="menu"', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const content = bar.querySelector<UiMenubarContent>('ui-menubar-content')!;
        const panel = content.shadowRoot!.querySelector('.panel');
        expect(panel!.getAttribute('role')).toBe('menu');
    });
});

describe('UiMenubar — item aria', () => {
    it('item has role="menuitem"', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<UiMenubarItem>('ui-menubar-item')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('role')).toBe('menuitem');
    });

    it('disabled item has aria-disabled="true"', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<UiMenubarItem>('ui-menubar-item[disabled]')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-disabled')).toBe('true');
    });

    it('checkbox item has role="menuitemcheckbox"', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<UiMenubarCheckboxItem>('ui-menubar-checkbox-item')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('role')).toBe('menuitemcheckbox');
    });

    it('checkbox item has aria-checked', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const items = bar.querySelectorAll<UiMenubarCheckboxItem>('ui-menubar-checkbox-item');
        const div0 = items[0].shadowRoot!.querySelector('.item')!;
        const div1 = items[1].shadowRoot!.querySelector('.item')!;
        expect(div0.getAttribute('aria-checked')).toBe('false');
        expect(div1.getAttribute('aria-checked')).toBe('true');
    });

    it('radio item has role="menuitemradio"', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const item = bar.querySelector<UiMenubarRadioItem>('ui-menubar-radio-item')!;
        const div = item.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('role')).toBe('menuitemradio');
    });
});

describe('UiMenubar — mouse highlight', () => {
    it('mouseover highlights the item', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — highlight reset on open', () => {
    it('resets highlight when menu is reopened', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — keyboard on checkbox/radio items', () => {
    it('Enter toggles checkbox item', async () => {
        const bar = await fixture<UiMenubar>(CHECKBOX_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarCheckboxItem>('ui-menubar-checkbox-item');
        expect(items[0].checked).toBe(true);
    });

    it('Enter selects radio item', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        const group = bar.querySelector<UiMenubarRadioGroup>('ui-menubar-radio-group')!;
        expect(group.value).toBe('andy');
    });
});

describe('UiMenubar — edge cases', () => {
    it('single menu works correctly', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>Only</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-item>One</ui-menubar-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
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
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>Empty</ui-menubar-trigger>
                    <ui-menubar-content></ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        bar.remove();
        // Should not throw when clicking document after removal
        document.body.click();
    });

    it('multiple rapid toggles do not break state', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;
        const subTrigger = bar.querySelector<UiMenubarSubTrigger>('ui-menubar-sub-trigger')!;

        sub.show();
        await new Promise(r => setTimeout(r, 100));
        expect(subTrigger.highlighted).toBe(true);

        sub.hideImmediate();
        expect(subTrigger.highlighted).toBe(false);
    });

    it('handles keyboard nav with mixed item types', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>Mix</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-item>Item 1</ui-menubar-item>
                        <ui-menubar-checkbox-item>Check 1</ui-menubar-checkbox-item>
                        <ui-menubar-radio-group value="a">
                            <ui-menubar-radio-item value="a">Radio A</ui-menubar-radio-item>
                        </ui-menubar-radio-group>
                        <ui-menubar-sub>
                            <ui-menubar-sub-trigger>Sub</ui-menubar-sub-trigger>
                            <ui-menubar-sub-content>
                                <ui-menubar-item>SubItem</ui-menubar-item>
                            </ui-menubar-sub-content>
                        </ui-menubar-sub>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
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
        expect(h?.tagName).toBe('UI-MENUBAR-SUB-TRIGGER');
    });
});

describe('UiMenubar — sub cleanup on disconnect', () => {
    it('sub clears timers on disconnect', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        // Start showing (queues timer)
        sub.show();
        // Disconnect immediately
        sub.remove();
        // Should not throw after timer fires
        await new Promise(r => setTimeout(r, 200));
    });
});

describe('UiMenubar — radio group slotchange', () => {
    it('syncs checked on dynamic children', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>P</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-radio-group value="b">
                        </ui-menubar-radio-group>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const group = bar.querySelector<UiMenubarRadioGroup>('ui-menubar-radio-group')!;

        // Add items dynamically
        const item1 = document.createElement('ui-menubar-radio-item') as UiMenubarRadioItem;
        item1.value = 'a';
        item1.textContent = 'A';
        const item2 = document.createElement('ui-menubar-radio-item') as UiMenubarRadioItem;
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

describe('UiMenubar — roving tabindex', () => {
    it('first trigger has tabIndex=0, others have -1 on initial render', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(getTriggerButton(getTrigger(menus[0])).tabIndex).toBe(0);
        expect(getTriggerButton(getTrigger(menus[1])).tabIndex).toBe(-1);
        expect(getTriggerButton(getTrigger(menus[2])).tabIndex).toBe(-1);
    });

    it('active trigger gets tabIndex=0 while open', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);

        expect(getTriggerButton(getTrigger(menus[0])).tabIndex).toBe(-1);
        expect(getTriggerButton(getTrigger(menus[1])).tabIndex).toBe(0);
    });

    it('first trigger retains tabIndex=0 after open/close cycle', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — select event value excludes shortcut text', () => {
    it('item select event value is label only, not shortcut', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-item>New Tab <ui-menubar-shortcut>⌘T</ui-menubar-shortcut></ui-menubar-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);
        bar.querySelector<UiMenubarItem>('ui-menubar-item')!.select();
        await settle(bar);

        expect(spy.mock.calls[0][0].detail.value).toBe('New Tab');
    });

    it('explicit value prop takes precedence over label text', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-item value="new-tab">New Tab</ui-menubar-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);
        bar.querySelector<UiMenubarItem>('ui-menubar-item')!.select();
        await settle(bar);

        expect(spy.mock.calls[0][0].detail.value).toBe('new-tab');
    });

    it('checkbox change event value excludes shortcut text', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>View</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-checkbox-item>Show Bar <ui-menubar-shortcut>⌘B</ui-menubar-shortcut></ui-menubar-checkbox-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-checkbox-change', spy);
        bar.querySelector<UiMenubarCheckboxItem>('ui-menubar-checkbox-item')!.toggle();
        await settle(bar);

        expect(spy.mock.calls[0][0].detail.value).toBe('Show Bar');
    });
});

describe('UiMenubar — label prop', () => {
    it('sets aria-label on the menubar div', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar label="Application Menu">
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>New</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const div = bar.shadowRoot!.querySelector('[role="menubar"]')!;
        expect(div.getAttribute('aria-label')).toBe('Application Menu');
    });

    it('defaults to "Menu bar" when label is not set', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const div = bar.shadowRoot!.querySelector('[role="menubar"]')!;
        expect(div.getAttribute('aria-label')).toBe('Menu bar');
    });
});

describe('UiMenubar — activeIndex getter', () => {
    it('returns -1 when all closed', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });

    it('returns correct index when a menu is open', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[1])).click();
        await settle(bar);
        expect(bar.activeIndex).toBe(1);
    });

    it('returns -1 after closeAll', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        bar.closeAll();
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('UiMenubar — Tab key', () => {
    it('Tab while menu is open closes it', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        // Should not throw
        fireKeyDown(bar, 'Tab');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('UiMenubar — typeahead', () => {
    it('pressing a letter highlights the first matching item', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubarSub — showImmediate', () => {
    it('showImmediate opens sub without delay', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        sub.showImmediate();
        // No await — should be synchronous
        expect(sub.open).toBe(true);
        const subContent = bar.querySelector<UiMenubarSubContent>('ui-menubar-sub-content')!;
        expect(subContent.open).toBe(true);
    });

    it('showImmediate cancels any pending timers', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        sub.show(); // queues 80ms timer
        sub.showImmediate(); // should cancel and open immediately
        expect(sub.open).toBe(true);
    });

    it('ArrowRight on highlighted sub-trigger opens sub immediately', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
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
        expect(highlighted?.tagName).toBe('UI-MENUBAR-SUB-TRIGGER');

        // ArrowRight should open immediately (no timer)
        fireKeyDown(bar, 'ArrowRight');
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;
        expect(sub.open).toBe(true);
    });
});

describe('UiMenubarSubTrigger — aria-expanded', () => {
    it('has aria-expanded=false when sub is closed', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const subTrigger = bar.querySelector<UiMenubarSubTrigger>('ui-menubar-sub-trigger')!;
        await subTrigger.updateComplete;
        const div = subTrigger.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-expanded')).toBe('false');
    });

    it('has aria-expanded=true when sub is open', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;
        const subTrigger = bar.querySelector<UiMenubarSubTrigger>('ui-menubar-sub-trigger')!;

        sub.showImmediate();
        await subTrigger.updateComplete;
        const div = subTrigger.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-expanded')).toBe('true');
    });

    it('aria-expanded resets to false after hideImmediate', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;
        const subTrigger = bar.querySelector<UiMenubarSubTrigger>('ui-menubar-sub-trigger')!;

        sub.showImmediate();
        sub.hideImmediate();
        await subTrigger.updateComplete;
        const div = subTrigger.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-expanded')).toBe('false');
    });

    it('inset attribute reflects on sub-trigger', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-sub>
                            <ui-menubar-sub-trigger inset>Share</ui-menubar-sub-trigger>
                            <ui-menubar-sub-content><ui-menubar-item>Email</ui-menubar-item></ui-menubar-sub-content>
                        </ui-menubar-sub>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const subTrigger = bar.querySelector<UiMenubarSubTrigger>('ui-menubar-sub-trigger')!;
        expect(subTrigger.hasAttribute('inset')).toBe(true);
        expect(subTrigger.inset).toBe(true);
    });
});

describe('UiMenubarMenu — disabled', () => {
    const DISABLED_FIXTURE = html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content><ui-menubar-item>New</ui-menubar-item></ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu disabled>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content><ui-menubar-item>Undo</ui-menubar-item></ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>View</ui-menubar-trigger>
                <ui-menubar-content><ui-menubar-item>Zoom</ui-menubar-item></ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `;

    it('disabled menu cannot be opened programmatically', async () => {
        const bar = await fixture<UiMenubar>(DISABLED_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        menus[1].open();
        await settle(bar);
        expect(getContent(menus[1]).open).toBe(false);
    });

    it('disabled menu trigger has disabled attribute', async () => {
        const bar = await fixture<UiMenubar>(DISABLED_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const trigger = getTrigger(menus[1]);
        await trigger.updateComplete;
        expect(trigger.disabled).toBe(true);
        expect(getTriggerButton(trigger).disabled).toBe(true);
    });

    it('keyboard nav skips disabled menu', async () => {
        const bar = await fixture<UiMenubar>(DISABLED_FIXTURE);
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
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu disabled>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>New</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
                <ui-menubar-menu>
                    <ui-menubar-trigger>Edit</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>Undo</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        // First non-disabled menu (Edit) should get tabIndex=0
        expect(getTriggerButton(getTrigger(menus[1])).tabIndex).toBe(0);
    });
});

describe('UiMenubar — hover does not open when no menu is active', () => {
    it('hovering a trigger does not open it when no menu is open', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Hover over Edit trigger with no active menu
        getTrigger(menus[1]).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(getContent(menus[1]).open).toBe(false);
    });
});

describe('UiMenubarMenu — getters', () => {
    it('trigger getter returns the direct trigger child', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(menus[0].trigger).toBe(getTrigger(menus[0]));
    });

    it('content getter returns the direct content child', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        expect(menus[0].content).toBe(getContent(menus[0]));
    });
});

describe('UiMenubarSeparator — hidden attribute', () => {
    it('hidden attribute is applied', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>F</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-separator hidden></ui-menubar-separator>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const sep = bar.querySelector('ui-menubar-separator')!;
        expect(sep.hasAttribute('hidden')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════ */
/*  COVERAGE TESTS — targeting uncovered branches                      */
/* ═══════════════════════════════════════════════════════════════════ */

describe('UiMenubar — keyboard no-op when no menu is open', () => {
    it('ArrowRight is no-op when activeIndex is -1', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        // No menu open — ArrowRight should do nothing
        fireKeyDown(bar, 'ArrowRight');
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
        expect(bar.activeIndex).toBe(-1);
    });

    it('ArrowLeft is no-op when activeIndex is -1', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
        expect(bar.activeIndex).toBe(-1);
    });

    it('Escape is no-op when no menu is open', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        // No active menu — Escape should not throw
        fireKeyDown(bar, 'Escape');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });

    it('ArrowUp is no-op when activeIndex is -1', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        fireKeyDown(bar, 'ArrowUp');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('UiMenubar — ArrowLeft closes open sub-menu', () => {
    it('ArrowLeft closes open sub-menu instead of navigating to prev menu', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

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

describe('UiMenubar — click event on non-trigger element', () => {
    it('clicking inside content area (not a trigger) does not open menu', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        // Click directly on the menubar container (not on a trigger)
        bar.click();
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
    });

    it('clicking on disabled menu trigger does not open', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu disabled>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>New</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(false);
    });
});

describe('UiMenubar — _handleClick with disabled items', () => {
    it('clicking a disabled item via content click handler fires no event', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Click the disabled 'Incognito' item
        const disabledItem = bar.querySelector<UiMenubarItem>('ui-menubar-item[disabled]')!;
        disabledItem.click();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
        // Menu remains open since nothing closed it
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('clicking a disabled checkbox item via content click handler fires no event', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>View</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-checkbox-item disabled>Bookmarks</ui-menubar-checkbox-item>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-checkbox-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const cbItem = bar.querySelector<UiMenubarCheckboxItem>('ui-menubar-checkbox-item')!;
        cbItem.click();
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
        expect(cbItem.checked).toBe(false);
    });

    it('clicking a disabled radio item via content click handler fires no event', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>P</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-radio-group value="a">
                            <ui-menubar-radio-item value="a">A</ui-menubar-radio-item>
                            <ui-menubar-radio-item value="b" disabled>B</ui-menubar-radio-item>
                        </ui-menubar-radio-group>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-radio-change', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const items = bar.querySelectorAll<UiMenubarRadioItem>('ui-menubar-radio-item');
        items[1].click(); // click disabled B
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
        const group = bar.querySelector<UiMenubarRadioGroup>('ui-menubar-radio-group')!;
        expect(group.value).toBe('a'); // unchanged
    });
});

describe('UiMenubar — _handleMouseOver edge cases', () => {
    it('hovering a disabled item does not highlight it', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const disabledItem = bar.querySelector<UiMenubarItem>('ui-menubar-item[disabled]')!;
        disabledItem.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);

        expect(disabledItem.highlighted).toBe(false);
    });

    it('hovering same active trigger does not re-open or close menu', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Mouseover on separator — not a navigable item, should not change highlight
        const sep = bar.querySelector('ui-menubar-separator')!;
        sep.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await settle(bar);
        // No item highlighted
        const content = getContent(menus[0]);
        const highlighted = getHighlighted(content);
        expect(highlighted).toBeUndefined();
    });
});

describe('UiMenubarSub — timer cancellation', () => {
    it('show() cancels pending close timer', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        sub.showImmediate();
        expect(sub.open).toBe(true);

        sub.hide(); // starts 60ms close timer
        sub.show(); // should cancel close timer, start 80ms open timer
        await new Promise(r => setTimeout(r, 120));
        // Sub should remain open (close timer was cancelled)
        expect(sub.open).toBe(true);
    });

    it('hide() cancels pending open timer', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        sub.show(); // starts 80ms open timer
        sub.hide(); // should cancel open timer, start 60ms close timer
        await new Promise(r => setTimeout(r, 150));
        // Sub should remain closed (open timer was cancelled)
        expect(sub.open).toBe(false);
    });
});

describe('UiMenubarContent — ArrowRight with empty sub-content', () => {
    it('ArrowRight on sub-trigger with no navigable sub-items does not throw', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content>
                        <ui-menubar-sub>
                            <ui-menubar-sub-trigger>Share</ui-menubar-sub-trigger>
                            <ui-menubar-sub-content></ui-menubar-sub-content>
                        </ui-menubar-sub>
                    </ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        fireKeyDown(bar, 'ArrowDown'); // highlight Share sub-trigger
        await settle(bar);
        fireKeyDown(bar, 'ArrowRight'); // open sub — no items to highlight
        await settle(bar);

        expect(sub.open).toBe(true);
    });
});

describe('UiMenubarRadioGroup — disconnectedCallback', () => {
    it('disconnectedCallback removes _menubar-radio-select listener', async () => {
        const bar = await fixture<UiMenubar>(RADIO_FIXTURE);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-radio-change', spy);

        const group = bar.querySelector<UiMenubarRadioGroup>('ui-menubar-radio-group')!;
        // Disconnect the group
        group.remove();
        await settle(bar);

        // Dispatch the internal radio-select event directly on the detached group
        const item = group.querySelector<UiMenubarRadioItem>('ui-menubar-radio-item')!;
        item.select();
        // Should not propagate to bar since group is removed
        expect(spy).not.toHaveBeenCalled();
    });
});

describe('UiMenubar — ArrowDown with all menus disabled', () => {
    it('ArrowDown when all menus disabled is a no-op', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu disabled>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>New</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
                <ui-menubar-menu disabled>
                    <ui-menubar-trigger>Edit</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>Undo</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
        `);
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('UiMenubar — Enter/Space opens focused trigger when no menu open', () => {
    // The component finds the trigger via 'ui-menubar-trigger[tabindex="0"]' selector
    // (light DOM attribute). We simulate this by setting the attribute manually.
    it('Enter opens the menu when trigger host has tabindex="0" attribute', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Simulate the trigger being "focused" by setting tabindex attribute on host
        getTrigger(menus[0]).setAttribute('tabindex', '0');

        fireKeyDown(bar, 'Enter');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('Space opens the menu when trigger host has tabindex="0" attribute', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTrigger(menus[0]).setAttribute('tabindex', '0');

        fireKeyDown(bar, ' ');
        await settle(bar);
        expect(getContent(menus[0]).open).toBe(true);
    });

    it('Enter when no trigger has tabindex="0" does nothing', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        // Ensure no trigger has tabindex attribute (host level)
        getMenus(bar).forEach(m => getTrigger(m).removeAttribute('tabindex'));

        fireKeyDown(bar, 'Enter');
        await settle(bar);
        menus.forEach(m => expect(getContent(m).open).toBe(false));
    });
});

describe('UiMenubar — hover over disabled menu trigger when a menu is open', () => {
    it('hovering disabled menu trigger does not switch menus', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>New</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
                <ui-menubar-menu disabled>
                    <ui-menubar-trigger>Edit</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>Undo</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
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

describe('UiMenubar — _openMenu guard', () => {
    it('_openMenu does not open a disabled menu', async () => {
        const bar = await fixture<UiMenubar>(html`
            <ui-menubar>
                <ui-menubar-menu>
                    <ui-menubar-trigger>File</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>New</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
                <ui-menubar-menu disabled>
                    <ui-menubar-trigger>Edit</ui-menubar-trigger>
                    <ui-menubar-content><ui-menubar-item>Undo</ui-menubar-item></ui-menubar-content>
                </ui-menubar-menu>
            </ui-menubar>
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

describe('UiMenubarContent — handleKeyDown with no highlighted item on Enter', () => {
    it('Enter/Space with no highlighted item does nothing', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);
        // No item highlighted — Enter should do nothing
        fireKeyDown(bar, 'Enter');
        await settle(bar);

        expect(spy).not.toHaveBeenCalled();
    });
});

describe('UiMenubar — ArrowRight from sub-trigger keeps menu open', () => {
    it('ArrowRight on sub-trigger does NOT navigate to next top-level menu', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
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

describe('UiMenubarSubContent — overflow detection', () => {
    it('does not overflow in jsdom (else branch clears styles)', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;
        const subContent = bar.querySelector<UiMenubarSubContent>('ui-menubar-sub-content')!;

        sub.showImmediate();
        await subContent.updateComplete;
        // rAF fires — in jsdom rect.right is 0 which is less than window.innerWidth,
        // so the else branch executes (clears style.left/right)
        await new Promise(r => setTimeout(r, 50));

        expect(subContent.style.left).toBe('');
        expect(subContent.style.right).toBe('');
    });

    it('overflow detection sets left=auto right=100% when overflowing', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;
        const subContent = bar.querySelector<UiMenubarSubContent>('ui-menubar-sub-content')!;

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

describe('UiMenubar — typeahead with ctrl/meta/alt modifiers ignored', () => {
    it('Ctrl+key does not trigger typeahead', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — navigate with no menus', () => {
    it('empty menubar does not crash on ArrowDown', async () => {
        const bar = await fixture<UiMenubar>(html`<ui-menubar></ui-menubar>`);
        await settle(bar);
        fireKeyDown(bar, 'ArrowDown');
        fireKeyDown(bar, 'ArrowRight');
        fireKeyDown(bar, 'ArrowLeft');
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('UiMenubarContent — ArrowLeft when no sub is open', () => {
    it('ArrowLeft with no open sub does not prevent parent menubar from navigating', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
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

describe('UiMenubar — _handleRequestClose returns focus', () => {
    it('Escape returns focus to the trigger element (or its shadow host)', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — _handleOutsideClick early return', () => {
    it('outside click when no menu is open is a no-op', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
        // Click outside — should not throw, activeIndex stays -1
        document.body.click();
        await settle(bar);
        expect(bar.activeIndex).toBe(-1);
    });
});

describe('UiMenubar — _handleRequestClose via item click', () => {
    it('clicking an item fires _menubar-request-close and closes menu', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        const spy = vi.fn();
        bar.addEventListener('_menubar-request-close', spy);

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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Fire _menubar-request-close directly — simulates content requesting close
        bar.dispatchEvent(new CustomEvent('_menubar-request-close', { bubbles: true, composed: true }));
        await settle(bar);

        expect(getContent(menus[0]).open).toBe(false);
        // Focus moved to trigger (shadow host or inner button)
        const trigger = getTrigger(menus[0]);
        const btn = getTriggerButton(trigger);
        const focused = document.activeElement;
        expect(focused === trigger || focused === btn || focused?.closest?.('ui-menubar-trigger') !== null).toBe(true);
    });
});

describe('UiMenubar — item disabled branch in select()', () => {
    it('select() on disabled item does not dispatch event (disabled=true branch)', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('ui-menubar-item-select', spy);

        // Get disabled item and explicitly call select
        const disabledItem = bar.querySelector<UiMenubarItem>('ui-menubar-item[disabled]')!;
        expect(disabledItem.disabled).toBe(true);
        disabledItem.select();

        expect(spy).not.toHaveBeenCalled();
    });
});

describe('UiMenubar — hover switches menu while another is open', () => {
    it('hovering a different trigger while a menu is open switches to it', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubar — ArrowDown opens first menu when none is open', () => {
    it('ArrowDown with no open menu opens the first non-disabled menu', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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

describe('UiMenubarContent — handleKeyDown called directly', () => {
    // These cover defensive branches in UiMenubarContent.handleKeyDown that
    // are not reached through the normal UiMenubar delegation path.

    it('Escape directly on content fires _menubar-request-close', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        const spy = vi.fn();
        bar.addEventListener('_menubar-request-close', spy);

        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await settle(bar);

        expect(spy).toHaveBeenCalled();
    });

    it('ArrowLeft directly on content with no open sub does nothing (break)', async () => {
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
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
        const bar = await fixture<UiMenubar>(BASIC_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const content = getContent(menus[0]);

        getTriggerButton(getTrigger(menus[0])).click();
        await settle(bar);

        // Highlight first item (a regular ui-menubar-item, not a sub-trigger)
        fireKeyDown(bar, 'ArrowDown');
        await settle(bar);

        const highlighted = getHighlighted(content);
        expect(highlighted?.tagName).toBe('UI-MENUBAR-ITEM');

        // ArrowRight directly on content — not a sub-trigger, so it just breaks
        content.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await settle(bar);
        // Menu remains open, no sub opened
        expect(content.open).toBe(true);
    });
});

describe('UiMenubarContent — keyboard on sub-trigger via Enter', () => {
    it('Enter on sub-trigger opens the sub-menu immediately', async () => {
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

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
        const bar = await fixture<UiMenubar>(SUB_FIXTURE);
        await settle(bar);
        const menus = getMenus(bar);
        const sub = bar.querySelector<UiMenubarSub>('ui-menubar-sub')!;

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
