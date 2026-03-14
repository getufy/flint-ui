import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-kbd';
import type { FlintKbd, FlintKbdGroup } from './flint-kbd';

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd — rendering', () => {
    it('renders a <kbd> element in shadow DOM', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>Ctrl</flint-kbd>`);
        expect(el.shadowRoot!.querySelector('kbd')).not.toBeNull();
    });

    it('renders a slot inside the <kbd> element', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>Ctrl</flint-kbd>`);
        expect(el.shadowRoot!.querySelector('kbd slot')).not.toBeNull();
    });

    it('slots text content correctly', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>Ctrl</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('Ctrl');
    });

    it('slots unicode modifier symbols', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>⌘</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('⌘');
    });

    it('slots shift symbol ⇧', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>⇧</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('⇧');
    });

    it('slots option symbol ⌥', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>⌥</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('⌥');
    });

    it('slots control symbol ⌃', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>⌃</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('⌃');
    });

    it('slots return symbol ⏎', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>⏎</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('⏎');
    });

    it('slots multi-character text (e.g. "Shift")', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>Shift</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('Shift');
    });

    it('slots inline HTML elements', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd><strong id="strong">B</strong></flint-kbd>`);
        await el.updateComplete;
        expect(el.querySelector('#strong')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd — size prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd — size prop', () => {
    it('defaults to size="default"', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>K</flint-kbd>`);
        expect(el.size).toBe('default');
    });

    it('reflects size="default" as attribute', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>K</flint-kbd>`);
        expect(el.getAttribute('size')).toBe('default');
    });

    it('accepts size="sm" attribute', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd size="sm">K</flint-kbd>`);
        expect(el.size).toBe('sm');
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('accepts size="lg" attribute', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd size="lg">K</flint-kbd>`);
        expect(el.size).toBe('lg');
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('updates reflected attribute when size property changes to "sm"', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>K</flint-kbd>`);
        el.size = 'sm';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('updates reflected attribute when size property changes to "lg"', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>K</flint-kbd>`);
        el.size = 'lg';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('updates reflected attribute back to "default"', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd size="sm">K</flint-kbd>`);
        el.size = 'default';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('default');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd — variant prop', () => {
    it('defaults to variant="raised"', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>K</flint-kbd>`);
        expect(el.variant).toBe('raised');
    });

    it('reflects variant="raised" as attribute', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>K</flint-kbd>`);
        expect(el.getAttribute('variant')).toBe('raised');
    });

    it('accepts variant="flat" attribute', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd variant="flat">K</flint-kbd>`);
        expect(el.variant).toBe('flat');
        expect(el.getAttribute('variant')).toBe('flat');
    });

    it('updates reflected attribute when variant property changes to "flat"', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>K</flint-kbd>`);
        el.variant = 'flat';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('flat');
    });

    it('updates reflected attribute back to "raised"', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd variant="flat">K</flint-kbd>`);
        el.variant = 'raised';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('raised');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd — label / aria-label prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd — label prop', () => {
    it('does not set aria-label by default', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>⌘</flint-kbd>`);
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.hasAttribute('aria-label')).toBe(false);
    });

    it('forwards label as aria-label on the inner <kbd> element', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd label="Command">⌘</flint-kbd>`);
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.getAttribute('aria-label')).toBe('Command');
    });

    it('reflects label as host attribute', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd label="Shift">⇧</flint-kbd>`);
        expect(el.getAttribute('label')).toBe('Shift');
    });

    it('updates aria-label when label property changes', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd label="Command">⌘</flint-kbd>`);
        el.label = 'Option';
        await el.updateComplete;
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.getAttribute('aria-label')).toBe('Option');
    });

    it('removes aria-label when label is set back to empty string', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd label="Command">⌘</flint-kbd>`);
        el.label = '';
        await el.updateComplete;
        const kbd = el.shadowRoot!.querySelector('kbd')!;
        expect(kbd.hasAttribute('aria-label')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd — accessibility
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd — accessibility', () => {
    it('uses semantic <kbd> element in shadow DOM', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>Ctrl</flint-kbd>`);
        const kbdEl = el.shadowRoot!.querySelector('kbd');
        expect(kbdEl).not.toBeNull();
        expect(kbdEl!.tagName.toLowerCase()).toBe('kbd');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd — empty / edge cases
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd — edge cases', () => {
    it('renders with empty slot without errors', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd></flint-kbd>`);
        expect(el.shadowRoot!.querySelector('kbd')).not.toBeNull();
    });

    it('renders numeric key labels', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>1</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('1');
    });

    it('renders function key labels (F1, F12)', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>F12</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('F12');
    });

    it('renders arrow key symbols', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>↑</flint-kbd>`);
        expect(el.textContent!.trim()).toBe('↑');
    });

    it('updates slotted text content dynamically', async () => {
        const el = await fixture<FlintKbd>(html`<flint-kbd>A</flint-kbd>`);
        el.textContent = 'B';
        await el.updateComplete;
        expect(el.textContent!.trim()).toBe('B');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd-group — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd-group — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintKbdGroup>(html`<flint-kbd-group></flint-kbd-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots multiple flint-kbd elements', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd>Ctrl</flint-kbd>
                <flint-kbd>B</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        const keys = el.querySelectorAll('flint-kbd');
        expect(keys.length).toBe(2);
    });

    it('slots separator text alongside keys', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd>Ctrl</flint-kbd>
                <span id="sep">+</span>
                <flint-kbd>K</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        expect(el.querySelector('#sep')).not.toBeNull();
        expect(el.querySelectorAll('flint-kbd').length).toBe(2);
        expect(el.children.length).toBe(3);
    });

    it('slots three modifier keys', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd>⌘</flint-kbd>
                <flint-kbd>⇧</flint-kbd>
                <flint-kbd>⌥</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('flint-kbd').length).toBe(3);
    });

    it('renders with a single key', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd>Esc</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('flint-kbd').length).toBe(1);
        expect(el.querySelector('flint-kbd')!.textContent!.trim()).toBe('Esc');
    });

    it('renders empty group without errors and has no children', async () => {
        const el = await fixture<FlintKbdGroup>(html`<flint-kbd-group></flint-kbd-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
        expect(el.children.length).toBe(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-kbd-group — composition with flint-kbd
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-kbd-group — composition', () => {
    it('keys within a group render their <kbd> elements', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd>Ctrl</flint-kbd>
                <flint-kbd>C</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('flint-kbd')) as FlintKbd[];
        for (const key of keys) {
            expect(key.shadowRoot!.querySelector('kbd')).not.toBeNull();
        }
    });

    it('each key in a group retains its text content', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd>⌘</flint-kbd>
                <flint-kbd>⇧</flint-kbd>
                <flint-kbd>Z</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('flint-kbd'));
        expect(keys[0].textContent!.trim()).toBe('⌘');
        expect(keys[1].textContent!.trim()).toBe('⇧');
        expect(keys[2].textContent!.trim()).toBe('Z');
    });

    it('sm-size keys in a group carry the size attribute', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd size="sm">⌘</flint-kbd>
                <flint-kbd size="sm">K</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('flint-kbd')) as FlintKbd[];
        keys.forEach(k => expect(k.getAttribute('size')).toBe('sm'));
    });

    it('keys in a group can have different sizes', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd size="sm">Ctrl</flint-kbd>
                <flint-kbd size="lg">Enter</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('flint-kbd')) as FlintKbd[];
        expect(keys[0].size).toBe('sm');
        expect(keys[1].size).toBe('lg');
    });

    it('flat-variant keys in a group carry the variant attribute', async () => {
        const el = await fixture<FlintKbdGroup>(html`
            <flint-kbd-group>
                <flint-kbd variant="flat">⌘</flint-kbd>
                <flint-kbd variant="flat">K</flint-kbd>
            </flint-kbd-group>
        `);
        await el.updateComplete;
        const keys = Array.from(el.querySelectorAll('flint-kbd')) as FlintKbd[];
        keys.forEach(k => expect(k.getAttribute('variant')).toBe('flat'));
    });
});
