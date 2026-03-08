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
});
