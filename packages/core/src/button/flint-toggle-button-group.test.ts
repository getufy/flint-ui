import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-toggle-button';
import './flint-toggle-button-group';
import type { FlintToggleButtonGroup } from './flint-toggle-button-group';
import type { FlintToggleButton } from './flint-toggle-button';

describe('flint-toggle-button-group', () => {
    it('renders correctly', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group value="left">
        <flint-toggle-button value="left">L</flint-toggle-button>
        <flint-toggle-button value="right">R</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const buttons = el.querySelectorAll('flint-toggle-button');
        expect((buttons[0] as FlintToggleButton).selected).toBe(true);
        expect((buttons[1] as FlintToggleButton).selected).toBe(false);
    });

    it('has default values', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group>
        <flint-toggle-button value="a">A</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        expect(el.value).toBe('');
        expect(el.exclusive).toBe(true);
        const btn = el.querySelector('flint-toggle-button') as FlintToggleButton;
        expect(btn.selected).toBe(false);
    });

    it('handles exclusive selection correctly', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group value="left" exclusive>
        <flint-toggle-button value="left">L</flint-toggle-button>
        <flint-toggle-button value="right">R</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const rightBtn = el.querySelector('flint-toggle-button[value="right"]') as FlintToggleButton;
        rightBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toBe('right');
        expect((el.querySelector('flint-toggle-button[value="left"]') as FlintToggleButton).selected).toBe(false);
        expect(rightBtn.selected).toBe(true);
    });

    it('handles multiple selection correctly', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group .value=${['bold']} .exclusive=${false}>
        <flint-toggle-button value="bold">B</flint-toggle-button>
        <flint-toggle-button value="italic">I</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const italicBtn = el.querySelector('flint-toggle-button[value="italic"]') as FlintToggleButton;
        italicBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toContain('bold');
        expect(el.value).toContain('italic');
        expect(italicBtn.selected).toBe(true);

        // Deselect bold
        const boldBtn = el.querySelector('flint-toggle-button[value="bold"]') as FlintToggleButton;
        boldBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).not.toContain('bold');
        expect(el.value).toContain('italic');
    });

    it('does not duplicate values in non-exclusive mode when already present', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group .value=${['bold']} .exclusive=${false}>
        <flint-toggle-button value="bold">B</flint-toggle-button>
        <flint-toggle-button value="italic">I</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        // Manually fire a toggle event for "bold" as selected (already in values)
        el.querySelector('flint-toggle-button[value="bold"]')!.dispatchEvent(
            new CustomEvent('flint-toggle-button-change', {
                detail: { value: 'bold', selected: true },
                bubbles: true,
                composed: true,
            })
        );
        await el.updateComplete;

        const values = el.value as string[];
        const boldCount = values.filter(v => v === 'bold').length;
        expect(boldCount).toBe(1);
    });

    it('handles deselection in non-exclusive mode when value not in array', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group .value=${['bold']} .exclusive=${false}>
        <flint-toggle-button value="bold">B</flint-toggle-button>
        <flint-toggle-button value="italic">I</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        // Fire deselect for "italic" which isn't in the array — indexOf returns -1
        el.querySelector('flint-toggle-button[value="italic"]')!.dispatchEvent(
            new CustomEvent('flint-toggle-button-change', {
                detail: { value: 'italic', selected: false },
                bubbles: true,
                composed: true,
            })
        );
        await el.updateComplete;

        expect(el.value).toEqual(['bold']);
    });

    it('dispatches change event', async () => {
        let changed = false;
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group @flint-toggle-button-group-change=${() => changed = true}>
        <flint-toggle-button value="1">1</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        el.querySelector('flint-toggle-button')!.shadowRoot!.querySelector('button')!.click();
        expect(changed).toBe(true);
    });

    it('change event detail contains the updated value', async () => {
        let detail: unknown;
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group @flint-toggle-button-group-change=${(e: CustomEvent) => { detail = e.detail.value; }}>
        <flint-toggle-button value="a">A</flint-toggle-button>
        <flint-toggle-button value="b">B</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        (el.querySelector('flint-toggle-button[value="b"]') as FlintToggleButton)
            .shadowRoot!.querySelector('button')!.click();
        expect(detail).toBe('b');
    });

    it('change event bubbles and is composed', async () => {
        let captured: CustomEvent | null = null;
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group>
        <flint-toggle-button value="x">X</flint-toggle-button>
      </flint-toggle-button-group>
    `);
        el.addEventListener('flint-toggle-button-group-change', (e) => { captured = e as CustomEvent; });

        el.querySelector('flint-toggle-button')!.shadowRoot!.querySelector('button')!.click();

        expect(captured).not.toBeNull();
        expect(captured!.bubbles).toBe(true);
        expect(captured!.composed).toBe(true);
    });

    it('marks first and last children with data-first and data-last', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group value="a">
        <flint-toggle-button value="a">A</flint-toggle-button>
        <flint-toggle-button value="b">B</flint-toggle-button>
        <flint-toggle-button value="c">C</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const buttons = el.querySelectorAll('flint-toggle-button');
        expect(buttons[0].hasAttribute('data-first')).toBe(true);
        expect(buttons[0].hasAttribute('data-last')).toBe(false);
        expect(buttons[1].hasAttribute('data-first')).toBe(false);
        expect(buttons[1].hasAttribute('data-last')).toBe(false);
        expect(buttons[2].hasAttribute('data-first')).toBe(false);
        expect(buttons[2].hasAttribute('data-last')).toBe(true);
    });

    it('removes stale data-first/data-last when children change', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group>
        <flint-toggle-button value="a">A</flint-toggle-button>
        <flint-toggle-button value="b">B</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const btnA = el.querySelector('flint-toggle-button[value="a"]') as FlintToggleButton;
        const btnB = el.querySelector('flint-toggle-button[value="b"]') as FlintToggleButton;
        expect(btnA.hasAttribute('data-first')).toBe(true);
        expect(btnA.hasAttribute('data-last')).toBe(false);
        expect(btnB.hasAttribute('data-last')).toBe(true);
        expect(btnB.hasAttribute('data-first')).toBe(false);

        // Add a new button at the end — btnB should lose data-last
        const btnC = document.createElement('flint-toggle-button') as FlintToggleButton;
        btnC.value = 'c';
        btnC.textContent = 'C';
        el.appendChild(btnC);

        // Trigger _updateChildren via value change
        el.value = 'a';
        await el.updateComplete;

        expect(btnB.hasAttribute('data-last')).toBe(false);
        expect(btnC.hasAttribute('data-last')).toBe(true);
        expect(btnA.hasAttribute('data-first')).toBe(true);
    });

    it('deselects current value in exclusive mode when same button clicked', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group value="left">
        <flint-toggle-button value="left">Left</flint-toggle-button>
        <flint-toggle-button value="right">Right</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const leftBtn = el.querySelector('flint-toggle-button[value="left"]') as FlintToggleButton;
        leftBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toBe('');
        expect(leftBtn.selected).toBe(false);
    });

    it('does not respond to clicks on disabled buttons', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group value="a">
        <flint-toggle-button value="a">A</flint-toggle-button>
        <flint-toggle-button value="b" disabled>B</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const disabledBtn = el.querySelector('flint-toggle-button[value="b"]') as FlintToggleButton;
        disabledBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toBe('a');
    });

    it('renders a slot element', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group>
        <flint-toggle-button value="a">A</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
    });

    it('updates children when value property changes programmatically', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group value="a">
        <flint-toggle-button value="a">A</flint-toggle-button>
        <flint-toggle-button value="b">B</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        expect((el.querySelector('flint-toggle-button[value="a"]') as FlintToggleButton).selected).toBe(true);
        expect((el.querySelector('flint-toggle-button[value="b"]') as FlintToggleButton).selected).toBe(false);

        el.value = 'b';
        await el.updateComplete;

        expect((el.querySelector('flint-toggle-button[value="a"]') as FlintToggleButton).selected).toBe(false);
        expect((el.querySelector('flint-toggle-button[value="b"]') as FlintToggleButton).selected).toBe(true);
    });

    it('handles non-exclusive mode with string value converting to array', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group value="bold" .exclusive=${false}>
        <flint-toggle-button value="bold">B</flint-toggle-button>
        <flint-toggle-button value="italic">I</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const italicBtn = el.querySelector('flint-toggle-button[value="italic"]') as FlintToggleButton;
        italicBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(Array.isArray(el.value)).toBe(true);
        expect(el.value).toContain('bold');
        expect(el.value).toContain('italic');
    });

    it('non-exclusive with empty string value treats it as empty array', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group .exclusive=${false}>
        <flint-toggle-button value="bold">B</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const btn = el.querySelector('flint-toggle-button') as FlintToggleButton;
        btn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toEqual(['bold']);
    });

    it('cleans up event listener on disconnect', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group>
        <flint-toggle-button value="a">A</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        el.remove();

        // After removal, dispatching the event should not change value
        const btn = el.querySelector('flint-toggle-button') as FlintToggleButton;
        btn.dispatchEvent(
            new CustomEvent('flint-toggle-button-change', {
                detail: { value: 'a', selected: true },
                bubbles: true,
            })
        );
        expect(el.value).toBe('');
    });

    it('handles single-child data-first and data-last', async () => {
        const el = await fixture<FlintToggleButtonGroup>(html`
      <flint-toggle-button-group>
        <flint-toggle-button value="only">Only</flint-toggle-button>
      </flint-toggle-button-group>
    `);

        const btn = el.querySelector('flint-toggle-button')!;
        expect(btn.hasAttribute('data-first')).toBe(true);
        expect(btn.hasAttribute('data-last')).toBe(true);
    });
});
