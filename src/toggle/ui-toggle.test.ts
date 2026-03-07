import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { UiToggle } from './ui-toggle';

/* ── helpers ────────────────────────────────────────────────────────── */

interface MakeOpts {
    pressed?: boolean;
    disabled?: boolean;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'default' | 'lg';
    defaultPressed?: boolean;
}

async function make({
    pressed = false,
    disabled = false,
    variant = 'default',
    size = 'default',
    defaultPressed = false,
}: MakeOpts = {}) {
    const el = await fixture<UiToggle>(html`
        <ui-toggle
            .pressed=${pressed}
            .disabled=${disabled}
            .variant=${variant}
            .size=${size}
            .defaultPressed=${defaultPressed}
        >Toggle</ui-toggle>
    `);
    await el.updateComplete;
    return el;
}

function getButton(el: UiToggle) {
    return el.shadowRoot!.querySelector('button') as HTMLButtonElement;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — definition
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — definition', () => {
    it('is defined as a custom element', () => {
        const el = document.createElement('ui-toggle');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('is an instance of UiToggle', async () => {
        const el = await make();
        expect(el).toBeInstanceOf(UiToggle);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — rendering', () => {
    it('renders a button in shadow DOM', async () => {
        const el = await make();
        expect(getButton(el)).not.toBeNull();
    });

    it('button has type="button"', async () => {
        const el = await make();
        expect(getButton(el).getAttribute('type')).toBe('button');
    });

    it('renders a slot inside the button', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('defaults: pressed=false, disabled=false, variant=default, size=default', async () => {
        const el = await make();
        expect(el.pressed).toBe(false);
        expect(el.disabled).toBe(false);
        expect(el.variant).toBe('default');
        expect(el.size).toBe('default');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — aria
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — aria', () => {
    it('aria-pressed is "false" when not pressed', async () => {
        const el = await make();
        expect(getButton(el).getAttribute('aria-pressed')).toBe('false');
    });

    it('aria-pressed is "true" when pressed', async () => {
        const el = await make({ pressed: true });
        expect(getButton(el).getAttribute('aria-pressed')).toBe('true');
    });

    it('aria-pressed updates after programmatic change', async () => {
        const el = await make();
        el.pressed = true;
        await el.updateComplete;
        expect(getButton(el).getAttribute('aria-pressed')).toBe('true');
    });

    it('button has disabled attribute when disabled', async () => {
        const el = await make({ disabled: true });
        expect(getButton(el).disabled).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — attribute reflection
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — attribute reflection', () => {
    it('reflects pressed attribute', async () => {
        const el = await make();
        el.pressed = true;
        await el.updateComplete;
        expect(el.hasAttribute('pressed')).toBe(true);

        el.pressed = false;
        await el.updateComplete;
        expect(el.hasAttribute('pressed')).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await make();
        el.disabled = true;
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects variant attribute', async () => {
        const el = await make({ variant: 'outline' });
        expect(el.getAttribute('variant')).toBe('outline');
    });

    it('reflects size attribute', async () => {
        const el = await make({ size: 'sm' });
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects size="lg" attribute', async () => {
        const el = await make({ size: 'lg' });
        expect(el.getAttribute('size')).toBe('lg');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — click behaviour
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — click behaviour', () => {
    it('clicking toggles pressed from false to true', async () => {
        const el = await make();
        getButton(el).click();
        await el.updateComplete;
        expect(el.pressed).toBe(true);
    });

    it('clicking toggles pressed back to false on second click', async () => {
        const el = await make();
        getButton(el).click();
        await el.updateComplete;
        getButton(el).click();
        await el.updateComplete;
        expect(el.pressed).toBe(false);
    });

    it('fires ui-toggle-change with correct detail on click', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-toggle-change', spy);

        getButton(el).click();
        await el.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ pressed: true });
    });

    it('does NOT toggle when disabled', async () => {
        const el = await make({ disabled: true });
        getButton(el).click();
        await el.updateComplete;
        expect(el.pressed).toBe(false);
    });

    it('does NOT fire event when disabled', async () => {
        const el = await make({ disabled: true });
        const spy = vi.fn();
        el.addEventListener('ui-toggle-change', spy);

        getButton(el).click();
        await el.updateComplete;

        expect(spy).not.toHaveBeenCalled();
    });

    it('event bubbles and is composed', async () => {
        const el = await make();
        let captured: CustomEvent | null = null;
        document.addEventListener('ui-toggle-change', (e) => { captured = e as CustomEvent; }, { once: true });

        getButton(el).click();
        await el.updateComplete;

        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — keyboard behaviour
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — keyboard behaviour', () => {
    it('Space key toggles pressed', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-toggle-change', spy);

        getButton(el).dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;

        expect(el.pressed).toBe(true);
        expect(spy).toHaveBeenCalledOnce();
    });

    it('Enter key toggles pressed', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-toggle-change', spy);

        getButton(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(el.pressed).toBe(true);
        expect(spy).toHaveBeenCalledOnce();
    });

    it('other keys do not toggle', async () => {
        const el = await make();
        getButton(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await el.updateComplete;
        expect(el.pressed).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — defaultPressed (uncontrolled)
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — defaultPressed', () => {
    it('defaultPressed=true initialises pressed to true', async () => {
        const el = await make({ defaultPressed: true });
        await el.updateComplete;
        expect(el.pressed).toBe(true);
    });

    it('defaultPressed=false leaves pressed as false', async () => {
        const el = await make({ defaultPressed: false });
        expect(el.pressed).toBe(false);
    });

    it('after defaultPressed init, button continues to toggle normally', async () => {
        const el = await make({ defaultPressed: true });
        await el.updateComplete;
        getButton(el).click();
        await el.updateComplete;
        expect(el.pressed).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-toggle — controlled mode
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-toggle — controlled mode', () => {
    it('setting pressed=true programmatically reflects to aria-pressed', async () => {
        const el = await make();
        el.pressed = true;
        await el.updateComplete;
        expect(getButton(el).getAttribute('aria-pressed')).toBe('true');
    });

    it('setting pressed=false programmatically reflects to aria-pressed', async () => {
        const el = await make({ pressed: true });
        el.pressed = false;
        await el.updateComplete;
        expect(getButton(el).getAttribute('aria-pressed')).toBe('false');
    });
});
