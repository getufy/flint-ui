import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-button';
import type { FlintButton } from './flint-button';
import { expectAccessible } from '../test-utils/axe';

describe('flint-button', () => {
    // ── Default behaviour ────────────────────────────────────────────────────

    it('renders with default properties', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click Me</flint-button>`);
        expect(el.appearance).toBe('filled');
        expect(el.color).toBe('primary');
        expect(el.size).toBe('md');
        expect(el.disabled).toBe(false);
        expect(el.loading).toBe(false);
        expect(el.type).toBe('button');
        expect(el.shape).toBe('default');
        expect(el.href).toBe('');
        expect(el.label).toBe('');

        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('filled');
        expect(button.className).toContain('primary');
        expect(button.className).toContain('md');
        expect(button.disabled).toBe(false);
    });

    it('applies appearance and color classes', async () => {
        const el = await fixture<FlintButton>(html`<flint-button appearance="outlined" color="destructive">Click</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('outlined');
        expect(button.className).toContain('destructive');
        expect(button.className).not.toContain('filled');
        expect(button.className).not.toContain('primary');
    });

    it('applies text appearance class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button appearance="text" color="primary">Text</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('text');
        expect(button.className).toContain('primary');
        expect(button.className).not.toContain('filled');
    });

    it('applies ghost appearance class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button appearance="ghost" color="neutral">Ghost</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('ghost');
        expect(button.className).toContain('neutral');
    });

    it('passes disabled state to native button', async () => {
        const el = await fixture<FlintButton>(html`<flint-button disabled></flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.disabled).toBe(true);
    });

    it('renders with type="button" to prevent form submission', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.type).toBe('button');
    });

    it('applies large size class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button size="lg">Large</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('lg');
        expect(button.className).not.toContain('sm');
        expect(button.className).not.toContain('md');
    });

    it('renders slotted content', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Hello World</flint-button>`);
        expect(el.textContent?.trim()).toBe('Hello World');
    });

    it('exposes CSS parts for external styling', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click</flint-button>`);
        expect(el.shadowRoot!.querySelector('[part="base"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="label"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="prefix"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="suffix"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="spinner"]')).not.toBeNull();
    });

    // ── Color variants ───────────────────────────────────────────────────────

    it('applies destructive color class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button color="destructive">Delete</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('destructive');
        expect(button.className).not.toContain('primary');
    });

    it('applies success color class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button color="success">OK</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('success');
        expect(button.className).not.toContain('primary');
    });

    it('applies warning color class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button color="warning">Warn</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('warning');
        expect(button.className).not.toContain('primary');
    });

    it('applies neutral color class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button color="neutral">Neutral</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('neutral');
        expect(button.className).not.toContain('primary');
    });

    it('reflects full-width attribute and switches host to block', async () => {
        const el = await fixture<FlintButton>(html`<flint-button full-width>Wide</flint-button>`);
        expect(el.hasAttribute('full-width')).toBe(true);
        expect(el.fullWidth).toBe(true);
    });

    it('does not have full-width attribute by default', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Default</flint-button>`);
        expect(el.hasAttribute('full-width')).toBe(false);
        expect(el.fullWidth).toBe(false);
    });

    // ── Deprecated variant backward compat ───────────────────────────────────

    it('maps legacy variant="primary" to appearance="filled" + color="primary"', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const el = await fixture<FlintButton>(html`<flint-button variant="primary">Go</flint-button>`);
        expect(el.appearance).toBe('filled');
        expect(el.color).toBe('primary');
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('filled');
        expect(button.className).toContain('primary');
        expect(warnSpy).toHaveBeenCalledOnce();
        expect(warnSpy.mock.calls[0]![0]).toContain('deprecated');
        warnSpy.mockRestore();
    });

    it('maps legacy variant="secondary" to appearance="outlined" + color="neutral"', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const el = await fixture<FlintButton>(html`<flint-button variant="secondary">Go</flint-button>`);
        expect(el.appearance).toBe('outlined');
        expect(el.color).toBe('neutral');
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('outlined');
        expect(button.className).toContain('neutral');
        warnSpy.mockRestore();
    });

    it('maps legacy variant="destructive" to appearance="filled" + color="destructive"', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const el = await fixture<FlintButton>(html`<flint-button variant="destructive">Delete</flint-button>`);
        expect(el.appearance).toBe('filled');
        expect(el.color).toBe('destructive');
        warnSpy.mockRestore();
    });

    it('warns only once per instance for deprecated variant', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const el = await fixture<FlintButton>(html`<flint-button variant="primary">Go</flint-button>`);
        el.variant = 'destructive';
        await el.updateComplete;
        expect(warnSpy).toHaveBeenCalledOnce();
        warnSpy.mockRestore();
    });

    // ── Label (aria-label) ───────────────────────────────────────────────────

    it('sets aria-label from label prop', async () => {
        const el = await fixture<FlintButton>(html`<flint-button label="Close dialog">X</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('aria-label')).toBe('Close dialog');
    });

    it('does not set aria-label when label prop is empty', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.hasAttribute('aria-label')).toBe(false);
    });

    // ── Loading state ────────────────────────────────────────────────────────

    it('disables the native button when loading', async () => {
        const el = await fixture<FlintButton>(html`<flint-button loading>Save</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.disabled).toBe(true);
    });

    it('applies is-loading class when loading', async () => {
        const el = await fixture<FlintButton>(html`<flint-button loading>Save</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('is-loading');
    });

    it('sets aria-busy when loading', async () => {
        const el = await fixture<FlintButton>(html`<flint-button loading>Save</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('does not set aria-busy when not loading', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Save</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.hasAttribute('aria-busy')).toBe(false);
    });

    it('renders the spinner element inside button', async () => {
        const el = await fixture<FlintButton>(html`<flint-button loading>Save</flint-button>`);
        const spinner = el.shadowRoot!.querySelector('[part="spinner"]');
        expect(spinner).not.toBeNull();
    });

    it('reflects loading attribute', async () => {
        const el = await fixture<FlintButton>(html`<flint-button loading>Save</flint-button>`);
        expect(el.hasAttribute('loading')).toBe(true);
    });

    // ── Icon slots (prefix/suffix) ───────────────────────────────────────────

    it('provides prefix and suffix slot elements', async () => {
        const el = await fixture<FlintButton>(html`
            <flint-button>
                <span slot="prefix">P</span>
                Label
                <span slot="suffix">S</span>
            </flint-button>
        `);
        const prefix = el.shadowRoot!.querySelector('slot[name="prefix"]');
        const suffix = el.shadowRoot!.querySelector('slot[name="suffix"]');
        expect(prefix).not.toBeNull();
        expect(suffix).not.toBeNull();
    });

    // ── href (link variant) ──────────────────────────────────────────────────

    it('renders an anchor tag when href is set', async () => {
        const el = await fixture<FlintButton>(html`<flint-button href="https://example.com">Link</flint-button>`);
        const anchor = el.shadowRoot!.querySelector('a');
        const button = el.shadowRoot!.querySelector('button');
        expect(anchor).not.toBeNull();
        expect(button).toBeNull();
        expect(anchor!.getAttribute('href')).toBe('https://example.com');
    });

    it('sets target and rel on anchor when target is provided', async () => {
        const el = await fixture<FlintButton>(html`<flint-button href="https://example.com" target="_blank">Link</flint-button>`);
        const anchor = el.shadowRoot!.querySelector('a')!;
        expect(anchor.getAttribute('target')).toBe('_blank');
        expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('does not set rel when no target is provided', async () => {
        const el = await fixture<FlintButton>(html`<flint-button href="https://example.com">Link</flint-button>`);
        const anchor = el.shadowRoot!.querySelector('a')!;
        expect(anchor.hasAttribute('rel')).toBe(false);
    });

    it('renders a button (not anchor) when href is empty', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click</flint-button>`);
        const button = el.shadowRoot!.querySelector('button');
        const anchor = el.shadowRoot!.querySelector('a');
        expect(button).not.toBeNull();
        expect(anchor).toBeNull();
    });

    it('applies appearance and color classes on anchor when href is set', async () => {
        const el = await fixture<FlintButton>(html`<flint-button href="#" appearance="outlined" color="neutral">Link</flint-button>`);
        const anchor = el.shadowRoot!.querySelector('a')!;
        expect(anchor.className).toContain('outlined');
        expect(anchor.className).toContain('neutral');
    });

    it('marks link as disabled via aria-disabled', async () => {
        const el = await fixture<FlintButton>(html`<flint-button href="https://example.com" disabled>Link</flint-button>`);
        const anchor = el.shadowRoot!.querySelector('a')!;
        expect(anchor.getAttribute('aria-disabled')).toBe('true');
    });

    // ── Shape variants ───────────────────────────────────────────────────────

    it('applies pill shape class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button shape="pill">Pill</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('pill');
    });

    it('applies circle shape class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button shape="circle" label="Add">+</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('circle');
    });

    it('does not apply shape classes by default', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).not.toContain('pill');
        expect(button.className).not.toContain('circle');
    });

    // ── Type prop (form participation) ───────────────────────────────────────

    it('renders a hidden proxy button when type="submit"', async () => {
        const el = await fixture<FlintButton>(html`<flint-button type="submit">Go</flint-button>`);
        const proxy = el.shadowRoot!.querySelector('.form-proxy') as HTMLButtonElement;
        expect(proxy).not.toBeNull();
        expect(proxy.type).toBe('submit');
    });

    it('renders a hidden proxy button when type="reset"', async () => {
        const el = await fixture<FlintButton>(html`<flint-button type="reset">Reset</flint-button>`);
        const proxy = el.shadowRoot!.querySelector('.form-proxy') as HTMLButtonElement;
        expect(proxy).not.toBeNull();
        expect(proxy.type).toBe('reset');
    });

    it('does not render a proxy button when type="button"', async () => {
        const el = await fixture<FlintButton>(html`<flint-button type="button">Click</flint-button>`);
        const proxy = el.shadowRoot!.querySelector('.form-proxy');
        expect(proxy).toBeNull();
    });

    it('clicks the hidden proxy on submit button click', async () => {
        const el = await fixture<FlintButton>(html`<flint-button type="submit">Submit</flint-button>`);
        const proxy = el.shadowRoot!.querySelector('.form-proxy') as HTMLButtonElement;
        const clickSpy = vi.fn();
        proxy.addEventListener('click', clickSpy);

        const button = el.shadowRoot!.querySelector('button[part="base"]') as HTMLButtonElement;
        button.click();

        expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('the main button always has type="button" regardless of prop', async () => {
        const el = await fixture<FlintButton>(html`<flint-button type="submit">Submit</flint-button>`);
        const button = el.shadowRoot!.querySelector('button[part="base"]') as HTMLButtonElement;
        expect(button.type).toBe('button');
    });

    // ── Accessibility ─────────────────────────────────────────────────────────

    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`<flint-button>Click me</flint-button>`);
        await expectAccessible(el);
    }, 15000);

    it('should pass a11y checks when disabled', async () => {
        const el = await fixture(html`<flint-button disabled>Disabled</flint-button>`);
        await expectAccessible(el);
    }, 15000);

    it('should pass a11y checks with label on icon-only button', async () => {
        const el = await fixture(html`<flint-button label="Add item" shape="circle">+</flint-button>`);
        await expectAccessible(el);
    }, 15000);

    it('should pass a11y checks when loading', async () => {
        const el = await fixture(html`<flint-button loading>Loading</flint-button>`);
        await expectAccessible(el);
    }, 15000);

    it('should pass a11y checks for link variant', async () => {
        const el = await fixture(html`<flint-button href="https://example.com">Link</flint-button>`);
        await expectAccessible(el);
    }, 15000);
});
