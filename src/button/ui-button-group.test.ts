import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-button-group';
import './ui-button';

describe('ui-button-group', () => {
    it('renders slotted buttons', async () => {
        const el = await fixture(html`
            <ui-button-group>
                <ui-button>One</ui-button>
                <ui-button>Two</ui-button>
            </ui-button-group>
        `);

        expect(el.innerHTML).toContain('ui-button');
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
