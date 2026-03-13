import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-button-group';
import './ui-button';
import type { UiButtonGroup } from './ui-button-group';

describe('ui-button-group', () => {
    it('renders a slot for child buttons', async () => {
        const el = await fixture<UiButtonGroup>(html`
            <ui-button-group>
                <ui-button>One</ui-button>
                <ui-button>Two</ui-button>
            </ui-button-group>
        `);

        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
        expect(el.innerHTML).toContain('ui-button');
    });

    it('distributes slotted content correctly', async () => {
        const el = await fixture<UiButtonGroup>(html`
            <ui-button-group>
                <ui-button>A</ui-button>
                <ui-button>B</ui-button>
            </ui-button-group>
        `);

        const slot = el.shadowRoot!.querySelector('slot')!;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(2);
    });

    it('can be created dynamically', async () => {
        const grouped = document.createElement('ui-button-group');
        const btn1 = document.createElement('ui-button');
        btn1.textContent = 'A';
        const btn2 = document.createElement('ui-button');
        btn2.textContent = 'B';
        grouped.appendChild(btn1);
        grouped.appendChild(btn2);

        const el = await fixture(grouped);
        expect(el.children.length).toBe(2);
    });
});
