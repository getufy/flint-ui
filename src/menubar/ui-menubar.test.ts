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
