import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-toggle-button';
import './ui-toggle-button-group';
import type { UiToggleButtonGroup } from './ui-toggle-button-group';
import type { UiToggleButton } from './ui-toggle-button';

describe('ui-toggle-button-group', () => {
    it('renders correctly', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group value="left">
        <ui-toggle-button value="left">L</ui-toggle-button>
        <ui-toggle-button value="right">R</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const buttons = el.querySelectorAll('ui-toggle-button');
        expect((buttons[0] as UiToggleButton).selected).toBe(true);
        expect((buttons[1] as UiToggleButton).selected).toBe(false);
    });

    it('has default values', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group>
        <ui-toggle-button value="a">A</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        expect(el.value).toBe('');
        expect(el.exclusive).toBe(true);
        const btn = el.querySelector('ui-toggle-button') as UiToggleButton;
        expect(btn.selected).toBe(false);
    });

    it('handles exclusive selection correctly', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group value="left" exclusive>
        <ui-toggle-button value="left">L</ui-toggle-button>
        <ui-toggle-button value="right">R</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const rightBtn = el.querySelector('ui-toggle-button[value="right"]') as UiToggleButton;
        rightBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toBe('right');
        expect((el.querySelector('ui-toggle-button[value="left"]') as UiToggleButton).selected).toBe(false);
        expect(rightBtn.selected).toBe(true);
    });

    it('handles multiple selection correctly', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group .value=${['bold']} .exclusive=${false}>
        <ui-toggle-button value="bold">B</ui-toggle-button>
        <ui-toggle-button value="italic">I</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const italicBtn = el.querySelector('ui-toggle-button[value="italic"]') as UiToggleButton;
        italicBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toContain('bold');
        expect(el.value).toContain('italic');
        expect(italicBtn.selected).toBe(true);

        // Deselect bold
        const boldBtn = el.querySelector('ui-toggle-button[value="bold"]') as UiToggleButton;
        boldBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).not.toContain('bold');
        expect(el.value).toContain('italic');
    });

    it('does not duplicate values in non-exclusive mode when already present', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group .value=${['bold']} .exclusive=${false}>
        <ui-toggle-button value="bold">B</ui-toggle-button>
        <ui-toggle-button value="italic">I</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        // Manually fire a toggle event for "bold" as selected (already in values)
        el.querySelector('ui-toggle-button[value="bold"]')!.dispatchEvent(
            new CustomEvent('ui-toggle-button-change', {
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
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group .value=${['bold']} .exclusive=${false}>
        <ui-toggle-button value="bold">B</ui-toggle-button>
        <ui-toggle-button value="italic">I</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        // Fire deselect for "italic" which isn't in the array — indexOf returns -1
        el.querySelector('ui-toggle-button[value="italic"]')!.dispatchEvent(
            new CustomEvent('ui-toggle-button-change', {
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
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group @ui-toggle-button-group-change=${() => changed = true}>
        <ui-toggle-button value="1">1</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        el.querySelector('ui-toggle-button')!.shadowRoot!.querySelector('button')!.click();
        expect(changed).toBe(true);
    });

    it('change event detail contains the updated value', async () => {
        let detail: unknown;
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group @ui-toggle-button-group-change=${(e: CustomEvent) => { detail = e.detail.value; }}>
        <ui-toggle-button value="a">A</ui-toggle-button>
        <ui-toggle-button value="b">B</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        (el.querySelector('ui-toggle-button[value="b"]') as UiToggleButton)
            .shadowRoot!.querySelector('button')!.click();
        expect(detail).toBe('b');
    });

    it('change event bubbles and is composed', async () => {
        let captured: CustomEvent | null = null;
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group>
        <ui-toggle-button value="x">X</ui-toggle-button>
      </ui-toggle-button-group>
    `);
        el.addEventListener('ui-toggle-button-group-change', (e) => { captured = e as CustomEvent; });

        el.querySelector('ui-toggle-button')!.shadowRoot!.querySelector('button')!.click();

        expect(captured).not.toBeNull();
        expect(captured!.bubbles).toBe(true);
        expect(captured!.composed).toBe(true);
    });

    it('marks first and last children with data-first and data-last', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group value="a">
        <ui-toggle-button value="a">A</ui-toggle-button>
        <ui-toggle-button value="b">B</ui-toggle-button>
        <ui-toggle-button value="c">C</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const buttons = el.querySelectorAll('ui-toggle-button');
        expect(buttons[0].hasAttribute('data-first')).toBe(true);
        expect(buttons[0].hasAttribute('data-last')).toBe(false);
        expect(buttons[1].hasAttribute('data-first')).toBe(false);
        expect(buttons[1].hasAttribute('data-last')).toBe(false);
        expect(buttons[2].hasAttribute('data-first')).toBe(false);
        expect(buttons[2].hasAttribute('data-last')).toBe(true);
    });

    it('removes stale data-first/data-last when children change', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group>
        <ui-toggle-button value="a">A</ui-toggle-button>
        <ui-toggle-button value="b">B</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const btnA = el.querySelector('ui-toggle-button[value="a"]') as UiToggleButton;
        const btnB = el.querySelector('ui-toggle-button[value="b"]') as UiToggleButton;
        expect(btnA.hasAttribute('data-first')).toBe(true);
        expect(btnA.hasAttribute('data-last')).toBe(false);
        expect(btnB.hasAttribute('data-last')).toBe(true);
        expect(btnB.hasAttribute('data-first')).toBe(false);

        // Add a new button at the end — btnB should lose data-last
        const btnC = document.createElement('ui-toggle-button') as UiToggleButton;
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
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group value="left">
        <ui-toggle-button value="left">Left</ui-toggle-button>
        <ui-toggle-button value="right">Right</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const leftBtn = el.querySelector('ui-toggle-button[value="left"]') as UiToggleButton;
        leftBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toBe('');
        expect(leftBtn.selected).toBe(false);
    });

    it('does not respond to clicks on disabled buttons', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group value="a">
        <ui-toggle-button value="a">A</ui-toggle-button>
        <ui-toggle-button value="b" disabled>B</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const disabledBtn = el.querySelector('ui-toggle-button[value="b"]') as UiToggleButton;
        disabledBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toBe('a');
    });

    it('renders a slot element', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group>
        <ui-toggle-button value="a">A</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
    });

    it('updates children when value property changes programmatically', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group value="a">
        <ui-toggle-button value="a">A</ui-toggle-button>
        <ui-toggle-button value="b">B</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        expect((el.querySelector('ui-toggle-button[value="a"]') as UiToggleButton).selected).toBe(true);
        expect((el.querySelector('ui-toggle-button[value="b"]') as UiToggleButton).selected).toBe(false);

        el.value = 'b';
        await el.updateComplete;

        expect((el.querySelector('ui-toggle-button[value="a"]') as UiToggleButton).selected).toBe(false);
        expect((el.querySelector('ui-toggle-button[value="b"]') as UiToggleButton).selected).toBe(true);
    });

    it('handles non-exclusive mode with string value converting to array', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group value="bold" .exclusive=${false}>
        <ui-toggle-button value="bold">B</ui-toggle-button>
        <ui-toggle-button value="italic">I</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const italicBtn = el.querySelector('ui-toggle-button[value="italic"]') as UiToggleButton;
        italicBtn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(Array.isArray(el.value)).toBe(true);
        expect(el.value).toContain('bold');
        expect(el.value).toContain('italic');
    });

    it('non-exclusive with empty string value treats it as empty array', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group .exclusive=${false}>
        <ui-toggle-button value="bold">B</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const btn = el.querySelector('ui-toggle-button') as UiToggleButton;
        btn.shadowRoot!.querySelector('button')!.click();
        await el.updateComplete;

        expect(el.value).toEqual(['bold']);
    });

    it('cleans up event listener on disconnect', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group>
        <ui-toggle-button value="a">A</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        el.remove();

        // After removal, dispatching the event should not change value
        const btn = el.querySelector('ui-toggle-button') as UiToggleButton;
        btn.dispatchEvent(
            new CustomEvent('ui-toggle-button-change', {
                detail: { value: 'a', selected: true },
                bubbles: true,
            })
        );
        expect(el.value).toBe('');
    });

    it('handles single-child data-first and data-last', async () => {
        const el = await fixture<UiToggleButtonGroup>(html`
      <ui-toggle-button-group>
        <ui-toggle-button value="only">Only</ui-toggle-button>
      </ui-toggle-button-group>
    `);

        const btn = el.querySelector('ui-toggle-button')!;
        expect(btn.hasAttribute('data-first')).toBe(true);
        expect(btn.hasAttribute('data-last')).toBe(true);
    });
});
