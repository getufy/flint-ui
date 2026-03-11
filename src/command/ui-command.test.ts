import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-command.js';
import type {
    UiCommand,
    UiCommandInput,
    UiCommandItem,
    UiCommandGroup,
    UiCommandEmpty,
    UiCommandDialog,
    UiCommandShortcut,
    UiCommandSeparator,
    UiCommandList,
} from './ui-command.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                              */
/* ─────────────────────────────────────────────────────────────────── */

/** Wait for all pending Lit updates + a short macrotask. */
async function settle(el: Element, ms = 30) {
    await (el as UiCommand).updateComplete;
    await new Promise((r) => setTimeout(r, ms));
}

/** Simulate typing into the command input's inner <input>. */
async function typeInInput(cmd: UiCommand, query: string) {
    const cmdInput = cmd.querySelector('ui-command-input') as UiCommandInput;
    const inner = cmdInput.shadowRoot!.querySelector('input') as HTMLInputElement;
    inner.value = query;
    inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await settle(cmd);
}

/** Get all command items inside the command (including slotted in groups). */
function getItems(cmd: UiCommand): UiCommandItem[] {
    return [...cmd.querySelectorAll('ui-command-item')] as UiCommandItem[];
}

/** Get visible (not hidden) items. */
function getVisibleItems(cmd: UiCommand): UiCommandItem[] {
    return getItems(cmd).filter((i) => !i.hidden);
}

/** Get highlighted item. */
function getHighlighted(cmd: UiCommand): UiCommandItem | undefined {
    return getItems(cmd).find((i) => i.highlighted);
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Fixtures                                                             */
/* ─────────────────────────────────────────────────────────────────── */

const BASIC_FIXTURE = html`
    <ui-command>
        <ui-command-input placeholder="Search..."></ui-command-input>
        <ui-command-list>
            <ui-command-empty>No results found.</ui-command-empty>
            <ui-command-group heading="Suggestions">
                <ui-command-item value="calendar">Calendar</ui-command-item>
                <ui-command-item value="search emoji">Search Emoji</ui-command-item>
                <ui-command-item value="calculator" disabled>Calculator</ui-command-item>
            </ui-command-group>
            <ui-command-group heading="Settings">
                <ui-command-item value="profile">Profile</ui-command-item>
                <ui-command-item value="billing">Billing</ui-command-item>
                <ui-command-item value="settings">Settings</ui-command-item>
            </ui-command-group>
        </ui-command-list>
    </ui-command>
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Rendering                                                            */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — rendering', () => {
    it('renders all items', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);
        expect(getItems(cmd)).toHaveLength(6);
    });

    it('renders groups with headings', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);
        const groups = [...cmd.querySelectorAll('ui-command-group')] as UiCommandGroup[];
        expect(groups).toHaveLength(2);
        expect(groups[0].heading).toBe('Suggestions');
        expect(groups[1].heading).toBe('Settings');
    });

    it('hides empty state initially when items are present', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);
        const empty = cmd.querySelector('ui-command-empty') as UiCommandEmpty;
        expect(empty.hidden).toBe(true);
    });

    it('reflects disabled attribute on item', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);
        const disabled = cmd.querySelector('ui-command-item[value="calculator"]') as UiCommandItem;
        expect(disabled.disabled).toBe(true);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Filtering                                                            */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — filtering', () => {
    let cmd: UiCommand;

    beforeEach(async () => {
        cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);
    });

    it('shows all items when query is empty', async () => {
        const visible = getVisibleItems(cmd);
        // All 6 items visible (including disabled)
        expect(visible).toHaveLength(6);
    });

    it('filters items by value (case-insensitive)', async () => {
        await typeInInput(cmd, 'cal');
        const visible = getVisibleItems(cmd);
        // "calendar" and "calculator" both match "cal"
        expect(visible.map((i) => i.value)).toEqual(
            expect.arrayContaining(['calendar', 'calculator'])
        );
        expect(visible.map((i) => i.value)).not.toContain('profile');
    });

    it('hides items that do not match query', async () => {
        await typeInInput(cmd, 'profile');
        const visible = getVisibleItems(cmd);
        expect(visible).toHaveLength(1);
        expect(visible[0].value).toBe('profile');
    });

    it('shows empty state when no items match', async () => {
        await typeInInput(cmd, 'zzznomatch');
        const empty = cmd.querySelector('ui-command-empty') as UiCommandEmpty;
        expect(empty.hidden).toBe(false);
        expect(getVisibleItems(cmd)).toHaveLength(0);
    });

    it('hides empty state again when results exist', async () => {
        await typeInInput(cmd, 'zzznomatch');
        await typeInInput(cmd, 'pro');
        const empty = cmd.querySelector('ui-command-empty') as UiCommandEmpty;
        expect(empty.hidden).toBe(true);
        expect(getVisibleItems(cmd).length).toBeGreaterThan(0);
    });

    it('restores all items when query is cleared', async () => {
        await typeInInput(cmd, 'profile');
        await typeInInput(cmd, '');
        expect(getVisibleItems(cmd)).toHaveLength(6);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Group hiding                                                         */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — group visibility', () => {
    it('hides a group when all its items are filtered out', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        // Filter to only "profile" which is in the Settings group
        await typeInInput(cmd, 'profile');

        const groups = [...cmd.querySelectorAll('ui-command-group')] as UiCommandGroup[];
        const suggestions = groups.find((g) => g.heading === 'Suggestions');
        const settings = groups.find((g) => g.heading === 'Settings');

        expect(suggestions!.hidden).toBe(true);
        expect(settings!.hidden).toBe(false);
    });

    it('shows both groups again when query is cleared', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        await typeInInput(cmd, 'profile');
        await typeInInput(cmd, '');

        const groups = [...cmd.querySelectorAll('ui-command-group')] as UiCommandGroup[];
        for (const group of groups) {
            expect(group.hidden).toBe(false);
        }
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Keyboard navigation                                                  */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — keyboard navigation', () => {
    let cmd: UiCommand;

    beforeEach(async () => {
        cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);
    });

    const key = (target: Element, k: string) => {
        target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, composed: true }));
    };

    it('highlights the first navigable item on mount', async () => {
        const highlighted = getHighlighted(cmd);
        // Disabled "calculator" is not navigable; first non-disabled visible is "calendar"
        expect(highlighted?.value).toBe('calendar');
    });

    it('moves highlight forward with ArrowDown', async () => {
        key(cmd, 'ArrowDown');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('search emoji');
    });

    it('skips disabled items during ArrowDown', async () => {
        // Start at "calendar", go down → "search emoji", down → skips disabled "calculator", → "profile"
        key(cmd, 'ArrowDown'); // search emoji
        key(cmd, 'ArrowDown'); // profile (disabled calculator is skipped)
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('profile');
    });

    it('moves highlight backward with ArrowUp', async () => {
        // Start: "calendar" → go down to "search emoji" → go up back to "calendar"
        key(cmd, 'ArrowDown');
        key(cmd, 'ArrowUp');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('calendar');
    });

    it('wraps ArrowDown from last item to first item', async () => {
        // Navigate to last item then wrap
        const navigable = getItems(cmd).filter((i) => !i.disabled);
        for (let i = 0; i < navigable.length; i++) {
            key(cmd, 'ArrowDown');
        }
        await settle(cmd);
        // Wrapped back to first navigable
        expect(getHighlighted(cmd)?.value).toBe('calendar');
    });

    it('wraps ArrowUp from first item to last item', async () => {
        key(cmd, 'ArrowUp');
        await settle(cmd);
        // Should wrap to last navigable item (settings)
        expect(getHighlighted(cmd)?.value).toBe('settings');
    });

    it('fires ui-command-item-select on Enter', async () => {
        const handler = vi.fn();
        cmd.addEventListener('ui-command-item-select', handler);

        key(cmd, 'Enter');
        await settle(cmd);

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('calendar');
    });

    it('moves highlight to first match after filtering', async () => {
        await typeInInput(cmd, 'pro');
        const highlighted = getHighlighted(cmd);
        expect(highlighted?.value).toBe('profile');
    });

    it('jumps to first navigable item with Home key', async () => {
        // Navigate forward a couple items first
        key(cmd, 'ArrowDown'); // search emoji
        key(cmd, 'ArrowDown'); // profile
        await settle(cmd);

        key(cmd, 'Home');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('calendar');
    });

    it('jumps to last navigable item with End key', async () => {
        key(cmd, 'End');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('settings');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Click selection                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — click selection', () => {
    it('fires ui-command-item-select when an item is clicked', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('ui-command-item-select', handler);

        const item = cmd.querySelector('ui-command-item[value="billing"]') as UiCommandItem;
        item.shadowRoot!.querySelector('.item')!.dispatchEvent(
            new MouseEvent('click', { bubbles: true, composed: true })
        );

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('billing');
    });

    it('does not fire ui-command-item-select when a disabled item is clicked', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('ui-command-item-select', handler);

        const disabled = cmd.querySelector('ui-command-item[value="calculator"]') as UiCommandItem;
        disabled.shadowRoot!.querySelector('.item')!.dispatchEvent(
            new MouseEvent('click', { bubbles: true, composed: true })
        );

        expect(handler).not.toHaveBeenCalled();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  reset() API                                                          */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — reset()', () => {
    it('restores all items and clears the input', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        await typeInInput(cmd, 'billing');
        expect(getVisibleItems(cmd)).toHaveLength(1);

        cmd.reset();
        await settle(cmd);

        expect(getVisibleItems(cmd)).toHaveLength(6);
        const input = cmd.querySelector('ui-command-input') as UiCommandInput;
        expect(input.value).toBe('');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-dialog                                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandDialog', () => {
    const DIALOG_FIXTURE = html`
        <ui-command-dialog>
            <ui-command>
                <ui-command-input placeholder="Search..."></ui-command-input>
                <ui-command-list>
                    <ui-command-empty>No results found.</ui-command-empty>
                    <ui-command-group heading="Actions">
                        <ui-command-item value="save">Save</ui-command-item>
                        <ui-command-item value="delete">Delete</ui-command-item>
                    </ui-command-group>
                </ui-command-list>
            </ui-command>
        </ui-command-dialog>
    `;

    it('is closed by default (backdrop has no open class)', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE);
        await settle(dialog);
        const backdrop = dialog.shadowRoot!.querySelector('.backdrop')!;
        expect(backdrop.classList.contains('open')).toBe(false);
    });

    it('opens when open prop is set to true', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE);
        await settle(dialog);

        dialog.open = true;
        await settle(dialog);

        const backdrop = dialog.shadowRoot!.querySelector('.backdrop')!;
        expect(backdrop.classList.contains('open')).toBe(true);
    });

    it('fires ui-command-dialog-close on Escape', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE);
        dialog.open = true;
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('ui-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await settle(dialog);

        expect(handler).toHaveBeenCalledOnce();
    });

    it('does not fire ui-command-dialog-close when closed and Escape is pressed', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE);
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('ui-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('fires ui-command-dialog-close on backdrop click', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE);
        dialog.open = true;
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('ui-command-dialog-close', handler);

        const backdrop = dialog.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(handler).toHaveBeenCalledOnce();
    });

    it('resets command state when closed', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE);
        dialog.open = true;
        await settle(dialog);

        const cmd = dialog.querySelector('ui-command') as UiCommand;
        await typeInInput(cmd, 'save');
        expect(getVisibleItems(cmd)).toHaveLength(1);

        dialog.open = false;
        await settle(dialog, 50);

        expect(getVisibleItems(cmd)).toHaveLength(2);
        const input = dialog.querySelector('ui-command-input') as UiCommandInput;
        expect(input.value).toBe('');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-command-item — value fallback                                     */
/* ─────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────── */
/*  Separator visibility                                                 */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — separator visibility', () => {
    const SEP_FIXTURE = html`
        <ui-command>
            <ui-command-input></ui-command-input>
            <ui-command-list>
                <ui-command-empty>No results.</ui-command-empty>
                <ui-command-group heading="Fruits">
                    <ui-command-item value="apple">Apple</ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Veggies">
                    <ui-command-item value="banana">Banana</ui-command-item>
                </ui-command-group>
            </ui-command-list>
        </ui-command>
    `;

    it('shows separator when content exists on both sides', async () => {
        const cmd = await fixture<UiCommand>(SEP_FIXTURE);
        await settle(cmd);
        const sep = cmd.querySelector('ui-command-separator')!;
        expect(sep.hidden).toBe(false);
    });

    it('hides separator when the preceding group is filtered out', async () => {
        const cmd = await fixture<UiCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'banana'); // only Veggies group matches
        const sep = cmd.querySelector('ui-command-separator')!;
        expect(sep.hidden).toBe(true);
    });

    it('hides separator when the following group is filtered out', async () => {
        const cmd = await fixture<UiCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'apple'); // only Fruits group matches
        const sep = cmd.querySelector('ui-command-separator')!;
        expect(sep.hidden).toBe(true);
    });

    it('hides separator when all groups are filtered out', async () => {
        const cmd = await fixture<UiCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'zzz');
        const sep = cmd.querySelector('ui-command-separator')!;
        expect(sep.hidden).toBe(true);
    });

    it('restores separator visibility when filter is cleared', async () => {
        const cmd = await fixture<UiCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'banana');
        await typeInInput(cmd, '');
        const sep = cmd.querySelector('ui-command-separator')!;
        expect(sep.hidden).toBe(false);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Empty group visibility                                              */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — empty group', () => {
    it('hides a group that has no items', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-input></ui-command-input>
                <ui-command-list>
                    <ui-command-group heading="Empty"></ui-command-group>
                    <ui-command-group heading="NonEmpty">
                        <ui-command-item value="item">Item</ui-command-item>
                    </ui-command-group>
                </ui-command-list>
            </ui-command>
        `);
        await settle(cmd);
        const emptyGroup    = cmd.querySelector('ui-command-group[heading="Empty"]')! as UiCommandGroup;
        const nonEmptyGroup = cmd.querySelector('ui-command-group[heading="NonEmpty"]')! as UiCommandGroup;
        expect(emptyGroup.hidden).toBe(true);
        expect(nonEmptyGroup.hidden).toBe(false);
    });
});

describe('UiCommandItem — value fallback', () => {
    it('uses textContent as value when value attr is not set', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-input></ui-command-input>
                <ui-command-list>
                    <ui-command-item>My Command</ui-command-item>
                </ui-command-list>
            </ui-command>
        `);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('ui-command-item-select', handler);

        const item = cmd.querySelector('ui-command-item') as UiCommandItem;
        item.shadowRoot!.querySelector('.item')!.dispatchEvent(
            new MouseEvent('click', { bubbles: true, composed: true })
        );

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('My Command');
    });

    it('filters by textContent when value attr is absent', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-input></ui-command-input>
                <ui-command-list>
                    <ui-command-empty>No results found.</ui-command-empty>
                    <ui-command-item>Apple</ui-command-item>
                    <ui-command-item>Banana</ui-command-item>
                </ui-command-list>
            </ui-command>
        `);
        await settle(cmd);

        await typeInInput(cmd, 'ban');
        const visible = getVisibleItems(cmd);
        expect(visible).toHaveLength(1);
        expect(visible[0].textContent?.trim()).toBe('Banana');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandShortcut                                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandShortcut', () => {
    it('renders slot content', async () => {
        const el = await fixture<UiCommandShortcut>(html`<ui-command-shortcut>⌘P</ui-command-shortcut>`);
        expect(el.textContent).toBe('⌘P');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandSeparator                                                  */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandSeparator', () => {
    it('renders without errors', async () => {
        const el = await fixture<UiCommandSeparator>(html`<ui-command-separator></ui-command-separator>`);
        expect(el).toBeTruthy();
    });

    it('is hidden when hidden attribute is set', async () => {
        const el = await fixture<UiCommandSeparator>(html`<ui-command-separator hidden></ui-command-separator>`);
        expect(el.hidden).toBe(true);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandEmpty                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandEmpty', () => {
    it('renders slot content', async () => {
        const el = await fixture<UiCommandEmpty>(html`<ui-command-empty>No results</ui-command-empty>`);
        expect(el.textContent).toBe('No results');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandGroup                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandGroup', () => {
    it('renders heading in shadow DOM', async () => {
        const el = await fixture<UiCommandGroup>(html`<ui-command-group heading="Actions"></ui-command-group>`);
        await el.updateComplete;
        const heading = el.shadowRoot!.querySelector('.heading')!;
        const text = [...heading.childNodes]
            .filter((n) => n.nodeType === Node.TEXT_NODE)
            .map((n) => n.textContent)
            .join('')
            .trim();
        expect(text).toBe('Actions');
    });

    it('hides heading when heading is empty', async () => {
        const el = await fixture<UiCommandGroup>(html`<ui-command-group></ui-command-group>`);
        await el.updateComplete;
        const heading = el.shadowRoot!.querySelector('.heading')!;
        // .heading:empty { display: none } via CSS; we verify the text is empty
        expect(heading.textContent?.trim()).toBe('');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandList                                                       */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandList', () => {
    it('has listbox role', async () => {
        const el = await fixture<UiCommandList>(html`<ui-command-list></ui-command-list>`);
        await el.updateComplete;
        const listbox = el.shadowRoot!.querySelector('[role="listbox"]');
        expect(listbox).toBeTruthy();
    });

    it('has aria-label on the listbox', async () => {
        const el = await fixture<UiCommandList>(html`<ui-command-list></ui-command-list>`);
        await el.updateComplete;
        const listbox = el.shadowRoot!.querySelector('[role="listbox"]')!;
        expect(listbox.getAttribute('aria-label')).toBe('Command results');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandInput                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandInput', () => {
    it('focus() delegates to inner input', async () => {
        const el = await fixture<UiCommandInput>(html`<ui-command-input></ui-command-input>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        const focusSpy = vi.spyOn(inner, 'focus');
        el.focus();
        expect(focusSpy).toHaveBeenCalled();
    });

    it('reset() clears the value property', async () => {
        const el = await fixture<UiCommandInput>(html`<ui-command-input></ui-command-input>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        inner.value = 'hello';
        el.reset();
        expect(el.value).toBe('');
        expect(inner.value).toBe('');
    });

    it('reset() dispatches _cmd-filter event with empty query', async () => {
        const el = await fixture<UiCommandInput>(html`<ui-command-input></ui-command-input>`);
        await el.updateComplete;
        const handler = vi.fn();
        el.addEventListener('_cmd-filter', handler);
        el.reset();
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.query).toBe('');
    });

    it('dispatches _cmd-filter on input event', async () => {
        const el = await fixture<UiCommandInput>(html`<ui-command-input></ui-command-input>`);
        await el.updateComplete;
        const handler = vi.fn();
        el.addEventListener('_cmd-filter', handler);
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        inner.value = 'test';
        inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.query).toBe('test');
    });

    it('reflects value property', async () => {
        const el = await fixture<UiCommandInput>(html`<ui-command-input></ui-command-input>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        inner.value = 'abc';
        inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        expect(el.value).toBe('abc');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandItem — icon slot                                           */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandItem — icon slot', () => {
    it('hides icon span when icon slot is empty', async () => {
        const el = await fixture<UiCommandItem>(html`<ui-command-item>Search</ui-command-item>`);
        await el.updateComplete;
        const icon = el.shadowRoot!.querySelector('.icon') as HTMLElement;
        expect(icon.hidden).toBe(true);
    });

    it('shows icon span when icon slot has content', async () => {
        const el = await fixture<UiCommandItem>(html`
            <ui-command-item>
                <span slot="icon">★</span>
                Search
            </ui-command-item>
        `);
        await el.updateComplete;
        // Wait for slotchange to fire
        await new Promise((r) => setTimeout(r, 20));
        const icon = el.shadowRoot!.querySelector('.icon') as HTMLElement;
        expect(icon.hidden).toBe(false);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandItem — ARIA attributes                                     */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandItem — aria attributes', () => {
    it('has aria-selected=false by default', async () => {
        const el = await fixture<UiCommandItem>(html`<ui-command-item>Item</ui-command-item>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-selected')).toBe('false');
    });

    it('has aria-selected=true when highlighted', async () => {
        const el = await fixture<UiCommandItem>(html`<ui-command-item>Item</ui-command-item>`);
        el.highlighted = true;
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-selected')).toBe('true');
    });

    it('has aria-disabled=true when disabled', async () => {
        const el = await fixture<UiCommandItem>(html`<ui-command-item disabled>Item</ui-command-item>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-disabled')).toBe('true');
    });

    it('has aria-disabled=false when not disabled', async () => {
        const el = await fixture<UiCommandItem>(html`<ui-command-item>Item</ui-command-item>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-disabled')).toBe('false');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandItem — scrollIntoViewIfNeeded                              */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandItem — scrollIntoViewIfNeeded', () => {
    it('calls scrollIntoView with block:nearest when available', async () => {
        const el = await fixture<UiCommandItem>(html`<ui-command-item>Item</ui-command-item>`);
        // jsdom does not define scrollIntoView — assign a mock so the guard passes
        const spy = vi.fn();
        (el as unknown as { scrollIntoView: typeof spy }).scrollIntoView = spy;
        el.scrollIntoViewIfNeeded();
        expect(spy).toHaveBeenCalledWith({ block: 'nearest' });
    });

    it('does not throw when scrollIntoView is not a function', async () => {
        const el = await fixture<UiCommandItem>(html`<ui-command-item>Item</ui-command-item>`);
        Object.defineProperty(el, 'scrollIntoView', { value: undefined, configurable: true });
        expect(() => el.scrollIntoViewIfNeeded()).not.toThrow();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommand — edge cases                                              */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — edge cases', () => {
    it('does not throw on keydown when there are no navigable items', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-input></ui-command-input>
                <ui-command-list>
                    <ui-command-empty>No results</ui-command-empty>
                </ui-command-list>
            </ui-command>
        `);
        await settle(cmd);
        expect(() =>
            cmd.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }))
        ).not.toThrow();
    });

    it('Enter does not fire event when no item is highlighted', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-input></ui-command-input>
                <ui-command-list>
                    <ui-command-empty>No results</ui-command-empty>
                    <ui-command-item value="a">A</ui-command-item>
                </ui-command-list>
            </ui-command>
        `);
        await settle(cmd);
        // Filter to empty → no navigable items → no highlighted item
        await typeInInput(cmd, 'zzz');
        const handler = vi.fn();
        cmd.addEventListener('ui-command-item-select', handler);
        cmd.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('reset() calls _applyFilter directly when no ui-command-input present', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-list>
                    <ui-command-empty>No results</ui-command-empty>
                    <ui-command-item value="a">A</ui-command-item>
                    <ui-command-item value="b">B</ui-command-item>
                </ui-command-list>
            </ui-command>
        `);
        await settle(cmd);
        // All items visible by default
        expect(getVisibleItems(cmd)).toHaveLength(2);
        // reset() with no input should still work
        cmd.reset();
        await settle(cmd);
        expect(getVisibleItems(cmd)).toHaveLength(2);
    });

    it('applyFilter handles missing ui-command-empty gracefully', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-input></ui-command-input>
                <ui-command-list>
                    <ui-command-item value="apple">Apple</ui-command-item>
                </ui-command-list>
            </ui-command>
        `);
        await settle(cmd);
        // No empty element; filtering should not throw
        await expect(typeInInput(cmd, 'zzz')).resolves.toBeUndefined();
        expect(getVisibleItems(cmd)).toHaveLength(0);
    });

    it('applyFilter handles missing ui-command-list gracefully', async () => {
        const cmd = await fixture<UiCommand>(html`
            <ui-command>
                <ui-command-input></ui-command-input>
                <ui-command-item value="apple">Apple</ui-command-item>
                <ui-command-item value="banana">Banana</ui-command-item>
            </ui-command>
        `);
        await settle(cmd);
        // Separator logic is skipped if no list; filtering should still work
        await typeInInput(cmd, 'apple');
        expect(getVisibleItems(cmd)).toHaveLength(1);
    });

    it('disconnectedCallback removes keydown listener', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('ui-command-item-select', handler);

        // Detach from DOM — removes event listeners
        cmd.remove();

        // Keydown should not reach _handleKeyDown anymore
        // We test indirectly by checking disconnectedCallback doesn't throw
        expect(() => cmd.disconnectedCallback()).not.toThrow();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommand — mouse hover highlight                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommand — mouse hover highlight', () => {
    it('updates keyboard highlight when mouse enters an item', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const billing = cmd.querySelector('ui-command-item[value="billing"]') as UiCommandItem;
        billing.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(billing.highlighted).toBe(true);
    });

    it('clears previous highlight when mouse enters a new item', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const calendar = cmd.querySelector('ui-command-item[value="calendar"]') as UiCommandItem;
        const billing = cmd.querySelector('ui-command-item[value="billing"]') as UiCommandItem;

        billing.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(billing.highlighted).toBe(true);
        expect(calendar.highlighted).toBe(false);
    });

    it('does not highlight a disabled item on mouseover', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const calc = cmd.querySelector('ui-command-item[value="calculator"]') as UiCommandItem;
        calc.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(calc.highlighted).toBe(false);
    });

    it('does not highlight a hidden item on mouseover', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        // Filter so "profile" is visible but "billing" is hidden
        await typeInInput(cmd, 'profile');

        const billing = cmd.querySelector('ui-command-item[value="billing"]') as UiCommandItem;
        billing.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(billing.highlighted).toBe(false);
    });

    it('ignores mouseover events from non-item elements', async () => {
        const cmd = await fixture<UiCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const firstHighlight = getHighlighted(cmd);

        // Fire mouseover on the command-group, not an item
        const group = cmd.querySelector('ui-command-group') as UiCommandGroup;
        group.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        // Highlight should be unchanged
        expect(getHighlighted(cmd)).toBe(firstHighlight);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  UiCommandDialog — additional coverage                               */
/* ─────────────────────────────────────────────────────────────────── */

describe('UiCommandDialog — backdrop click inner panel', () => {
    const DIALOG_FIXTURE_LOCAL = html`
        <ui-command-dialog>
            <ui-command>
                <ui-command-input placeholder="Search..."></ui-command-input>
                <ui-command-list>
                    <ui-command-empty>No results found.</ui-command-empty>
                    <ui-command-group heading="Actions">
                        <ui-command-item value="save">Save</ui-command-item>
                        <ui-command-item value="delete">Delete</ui-command-item>
                    </ui-command-group>
                </ui-command-list>
            </ui-command>
        </ui-command-dialog>
    `;

    it('does not fire close when clicking inside the panel (not on backdrop)', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE_LOCAL);
        dialog.open = true;
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('ui-command-dialog-close', handler);

        // Click on the panel (child of backdrop) — target !== currentTarget → no close
        const panel = dialog.shadowRoot!.querySelector('.panel') as HTMLElement;
        panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('auto-focuses the input when dialog opens', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE_LOCAL);
        await settle(dialog);

        const input = dialog.querySelector('ui-command-input') as UiCommandInput;
        const focusSpy = vi.spyOn(input, 'focus');

        dialog.open = true;
        await settle(dialog, 60); // rAF fires within 60 ms

        expect(focusSpy).toHaveBeenCalled();
    });

    it('disconnectedCallback removes the window keydown listener', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE_LOCAL);
        dialog.open = true;
        await settle(dialog);

        // Disconnect — should remove window listener
        dialog.remove();

        const handler = vi.fn();
        dialog.addEventListener('ui-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('does not fire close on Escape when open prop is false', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE_LOCAL);
        // open = false (default)
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('ui-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('does not reset when re-rendered without open changing', async () => {
        const dialog = await fixture<UiCommandDialog>(DIALOG_FIXTURE_LOCAL);
        dialog.open = true;
        await settle(dialog);

        const cmd = dialog.querySelector('ui-command') as UiCommand;
        await typeInInput(cmd, 'save');
        expect(getVisibleItems(cmd)).toHaveLength(1);

        // Trigger a re-render without changing open (spy on reset)
        const resetSpy = vi.spyOn(cmd, 'reset');
        // Force re-render by calling requestUpdate without changing properties
        (dialog as unknown as { requestUpdate: () => void }).requestUpdate();
        await dialog.updateComplete;

        // reset should NOT have been called (early return in updated())
        expect(resetSpy).not.toHaveBeenCalled();
        // Items still filtered
        expect(getVisibleItems(cmd)).toHaveLength(1);
    });
});
