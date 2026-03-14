import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-button-group';
import './flint-button';
import type { FlintButtonGroup } from './flint-button-group';

describe('flint-button-group', () => {
    it('renders a slot for child buttons', async () => {
        const el = await fixture<FlintButtonGroup>(html`
            <flint-button-group>
                <flint-button>One</flint-button>
                <flint-button>Two</flint-button>
            </flint-button-group>
        `);

        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
        expect(el.innerHTML).toContain('flint-button');
    });

    it('distributes slotted content correctly', async () => {
        const el = await fixture<FlintButtonGroup>(html`
            <flint-button-group>
                <flint-button>A</flint-button>
                <flint-button>B</flint-button>
            </flint-button-group>
        `);

        const slot = el.shadowRoot!.querySelector('slot')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(2);
    });

    it('can be created dynamically', async () => {
        const grouped = document.createElement('flint-button-group');
        const btn1 = document.createElement('flint-button');
        btn1.textContent = 'A';
        const btn2 = document.createElement('flint-button');
        btn2.textContent = 'B';
        grouped.appendChild(btn1);
        grouped.appendChild(btn2);

        const el = await fixture(grouped);
        expect(el.children.length).toBe(2);
    });

    it('is defined', () => {
        const el = document.createElement('flint-button-group');
        expect(el).toBeInstanceOf(HTMLElement);
        expect(el.localName).toBe('flint-button-group');
    });

    it('has role="group" on the host', async () => {
        const el = await fixture<FlintButtonGroup>(html`
            <flint-button-group>
                <flint-button>One</flint-button>
            </flint-button-group>
        `);

        expect(el.getAttribute('role')).toBe('group');
    });

    it('renders with a single unnamed slot', async () => {
        const el = await fixture<FlintButtonGroup>(html`
            <flint-button-group></flint-button-group>
        `);

        const slot = el.shadowRoot!.querySelector('slot')!;
        expect(slot).not.toBeNull();
        expect(slot.hasAttribute('name')).toBe(false);
    });

    it('accepts non-button children gracefully', async () => {
        const el = await fixture<FlintButtonGroup>(html`
            <flint-button-group>
                <span>Not a button</span>
            </flint-button-group>
        `);

        const slot = el.shadowRoot!.querySelector('slot')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].tagName.toLowerCase()).toBe('span');
    });
});
