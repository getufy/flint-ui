import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-kbd';
import type { UiKbd, UiKbdGroup } from './ui-kbd';

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd — rendering', () => {
    it('renders a <kbd> element in shadow DOM', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>Ctrl</ui-kbd>`);
        expect(el.shadowRoot!.querySelector('kbd')).not.toBeNull();
    });

    it('renders a slot inside the <kbd> element', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>Ctrl</ui-kbd>`);
        expect(el.shadowRoot!.querySelector('kbd slot')).not.toBeNull();
    });

    it('slots text content correctly', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>Ctrl</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('Ctrl');
    });

    it('slots unicode modifier symbols', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>⌘</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('⌘');
    });

    it('slots shift symbol ⇧', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>⇧</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('⇧');
    });

    it('slots option symbol ⌥', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>⌥</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('⌥');
    });

    it('slots control symbol ⌃', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>⌃</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('⌃');
    });

    it('slots return symbol ⏎', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>⏎</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('⏎');
    });

    it('slots multi-character text (e.g. "Shift")', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>Shift</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('Shift');
    });

    it('slots inline HTML elements', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd><strong id="strong">B</strong></ui-kbd>`);
        await el.updateComplete;
        expect(el.querySelector('#strong')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd — size prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd — size prop', () => {
    it('defaults to size="default"', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>K</ui-kbd>`);
        expect(el.size).toBe('default');
    });

    it('reflects size="default" as attribute', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>K</ui-kbd>`);
        expect(el.getAttribute('size')).toBe('default');
    });

    it('accepts size="sm" attribute', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd size="sm">K</ui-kbd>`);
        expect(el.size).toBe('sm');
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('accepts size="lg" attribute', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd size="lg">K</ui-kbd>`);
        expect(el.size).toBe('lg');
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('updates reflected attribute when size property changes to "sm"', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>K</ui-kbd>`);
        el.size = 'sm';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('updates reflected attribute when size property changes to "lg"', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>K</ui-kbd>`);
        el.size = 'lg';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('updates reflected attribute back to "default"', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd size="sm">K</ui-kbd>`);
        el.size = 'default';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('default');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd — variant prop', () => {
    it('defaults to variant="raised"', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>K</ui-kbd>`);
        expect(el.variant).toBe('raised');
    });

    it('reflects variant="raised" as attribute', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>K</ui-kbd>`);
        expect(el.getAttribute('variant')).toBe('raised');
    });

    it('accepts variant="flat" attribute', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd variant="flat">K</ui-kbd>`);
        expect(el.variant).toBe('flat');
        expect(el.getAttribute('variant')).toBe('flat');
    });

    it('updates reflected attribute when variant property changes to "flat"', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>K</ui-kbd>`);
        el.variant = 'flat';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('flat');
    });

    it('updates reflected attribute back to "raised"', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd variant="flat">K</ui-kbd>`);
        el.variant = 'raised';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('raised');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd — label / aria-label prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd — label prop', () => {
    it('does not set aria-label by default', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>⌘</ui-kbd>`);
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.hasAttribute('aria-label')).toBe(false);
    });

    it('forwards label as aria-label on the inner <kbd> element', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd label="Command">⌘</ui-kbd>`);
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.getAttribute('aria-label')).toBe('Command');
    });

    it('reflects label as host attribute', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd label="Shift">⇧</ui-kbd>`);
        expect(el.getAttribute('label')).toBe('Shift');
    });

    it('updates aria-label when label property changes', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd label="Command">⌘</ui-kbd>`);
        el.label = 'Option';
        await el.updateComplete;
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.getAttribute('aria-label')).toBe('Option');
    });

    it('removes aria-label when label is set back to empty string', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd label="Command">⌘</ui-kbd>`);
        el.label = '';
        await el.updateComplete;
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.hasAttribute('aria-label')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd — accessibility
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd — accessibility', () => {
    it('uses semantic <kbd> element in shadow DOM', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>Ctrl</ui-kbd>`);
        const kbdEl = el.shadowRoot!.querySelector('kbd');
        expect(kbdEl).not.toBeNull();
        expect(kbdEl!.tagName.toLowerCase()).toBe('kbd');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd — empty / edge cases
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd — edge cases', () => {
    it('renders with empty slot without errors', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd></ui-kbd>`);
        expect(el.shadowRoot!.querySelector('kbd')).not.toBeNull();
    });

    it('renders numeric key labels', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>1</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('1');
    });

    it('renders function key labels (F1, F12)', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>F12</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('F12');
    });

    it('renders arrow key symbols', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>↑</ui-kbd>`);
        expect(el.textContent!.trim()).toBe('↑');
    });

    it('updates slotted text content dynamically', async () => {
        const el = await fixture<UiKbd>(html`<ui-kbd>A</ui-kbd>`);
        el.textContent = 'B';
        await el.updateComplete;
        expect(el.textContent!.trim()).toBe('B');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd-group — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd-group — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiKbdGroup>(html`<ui-kbd-group></ui-kbd-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots multiple ui-kbd elements', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd>Ctrl</ui-kbd>
                <ui-kbd>B</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        const keys = el.querySelectorAll('ui-kbd');
        expect(keys.length).toBe(2);
    });

    it('slots separator text alongside keys', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd>Ctrl</ui-kbd>
                <span id="sep">+</span>
                <ui-kbd>K</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        expect(el.querySelector('#sep')).not.toBeNull();
        expect(el.querySelectorAll('ui-kbd').length).toBe(2);
        expect(el.children.length).toBe(3);
    });

    it('slots three modifier keys', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd>⌘</ui-kbd>
                <ui-kbd>⇧</ui-kbd>
                <ui-kbd>⌥</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('ui-kbd').length).toBe(3);
    });

    it('renders with a single key', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd>Esc</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('ui-kbd').length).toBe(1);
        expect(el.querySelector('ui-kbd')!.textContent!.trim()).toBe('Esc');
    });

    it('renders empty group without errors and has no children', async () => {
        const el = await fixture<UiKbdGroup>(html`<ui-kbd-group></ui-kbd-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
        expect(el.children.length).toBe(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-kbd-group — composition with ui-kbd
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-kbd-group — composition', () => {
    it('keys within a group render their <kbd> elements', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd>Ctrl</ui-kbd>
                <ui-kbd>C</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('ui-kbd')) as UiKbd[];
        for (const key of keys) {
            expect(key.shadowRoot!.querySelector('kbd')).not.toBeNull();
        }
    });

    it('each key in a group retains its text content', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd>⌘</ui-kbd>
                <ui-kbd>⇧</ui-kbd>
                <ui-kbd>Z</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('ui-kbd'));
        expect(keys[0].textContent!.trim()).toBe('⌘');
        expect(keys[1].textContent!.trim()).toBe('⇧');
        expect(keys[2].textContent!.trim()).toBe('Z');
    });

    it('sm-size keys in a group carry the size attribute', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd size="sm">⌘</ui-kbd>
                <ui-kbd size="sm">K</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('ui-kbd')) as UiKbd[];
        keys.forEach(k => expect(k.getAttribute('size')).toBe('sm'));
    });

    it('keys in a group can have different sizes', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd size="sm">Ctrl</ui-kbd>
                <ui-kbd size="lg">Enter</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('ui-kbd')) as UiKbd[];
        expect(keys[0].size).toBe('sm');
        expect(keys[1].size).toBe('lg');
    });

    it('flat-variant keys in a group carry the variant attribute', async () => {
        const el = await fixture<UiKbdGroup>(html`
            <ui-kbd-group>
                <ui-kbd variant="flat">⌘</ui-kbd>
                <ui-kbd variant="flat">K</ui-kbd>
            </ui-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('ui-kbd')) as UiKbd[];
        keys.forEach(k => expect(k.getAttribute('variant')).toBe('flat'));
    });
});
