import { describe, it, expect, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { UiTooltip } from './ui-tooltip';

describe('ui-tooltip', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ── Definition ───────────────────────────────────────────────
    it('is defined', () => {
        const el = document.createElement('ui-tooltip');
        expect(el).toBeInstanceOf(UiTooltip);
    });

    // ── Default rendering ────────────────────────────────────────
    it('renders with default values', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Test"><button>Trigger</button></ui-tooltip>
        `);
        expect(el.label).toBe('Test');
        expect(el.placement).toBe('top');
        expect(el.arrow).toBe(false);
        expect(el.disabled).toBe(false);
        expect(el.openDelay).toBe(0);
        expect(el.closeDelay).toBe(0);

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup).toBeTruthy();
        expect(popup.classList.contains('visible')).toBe(false);
    });

    // ── Slot ─────────────────────────────────────────────────────
    it('renders slotted content', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Tip"><span class="child">Hello</span></ui-tooltip>
        `);
        const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        expect(slot).toBeTruthy();
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('Hello');
    });

    // ── Show / hide on hover ─────────────────────────────────────
    it('shows tooltip on mouseenter and hides on mouseleave', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Hover tip"><button>Hover</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        expect(popup.classList.contains('visible')).toBe(false);

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);
        expect(popup.textContent!.trim()).toBe('Hover tip');

        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    // ── Show / hide on focus ─────────────────────────────────────
    it('shows tooltip on focusin and hides on focusout', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Focus tip"><button>Focus</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new Event('focusin', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        container.dispatchEvent(new Event('focusout', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    // ── Disabled ─────────────────────────────────────────────────
    it('does not show when disabled', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="No show" disabled><button>Hover</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Test" disabled><button>B</button></ui-tooltip>
        `);
        expect(el.hasAttribute('disabled')).toBe(true);
        el.disabled = false;
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(false);
    });

    // ── Empty label ──────────────────────────────────────────────
    it('does not show when label is empty', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label=""><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    // ── Placements ───────────────────────────────────────────────
    it('applies top placement class by default', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Tip"><button>B</button></ui-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('top')).toBe(true);
    });

    it('applies bottom placement class', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Tip" placement="bottom"><button>B</button></ui-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('bottom')).toBe(true);
    });

    it('applies left placement class', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Tip" placement="left"><button>B</button></ui-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('left')).toBe(true);
    });

    it('applies right placement class', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Tip" placement="right"><button>B</button></ui-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('right')).toBe(true);
    });

    // ── Arrow ────────────────────────────────────────────────────
    it('renders arrow when arrow=true', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Tip" arrow><button>B</button></ui-tooltip>
        `);
        const arrow = el.shadowRoot!.querySelector('.arrow');
        expect(arrow).toBeTruthy();
    });

    it('does not render arrow by default', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Tip"><button>B</button></ui-tooltip>
        `);
        const arrow = el.shadowRoot!.querySelector('.arrow');
        expect(arrow).toBeFalsy();
    });

    // ── Accessibility ────────────────────────────────────────────
    it('has role=tooltip on popup', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="A11y"><button>B</button></ui-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('[role="tooltip"]');
        expect(popup).toBeTruthy();
    });

    it('has unique id on popup', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="ID"><button>B</button></ui-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.id).toBeTruthy();
        expect(popup.id).toMatch(/^ui-tooltip-\d+$/);
    });

    it('sets aria-hidden=true when not visible', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Hidden"><button>B</button></ui-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-hidden=false when visible', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Shown"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.getAttribute('aria-hidden')).toBe('false');
    });

    // ── Escape key ───────────────────────────────────────────────
    it('hides tooltip on Escape key', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Esc"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('ignores non-Escape keys', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Key"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);
    });

    // ── Open / close delay ───────────────────────────────────────
    it('delays showing tooltip with open-delay', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Delayed" open-delay="200"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);

        await vi.advanceTimersByTimeAsync(250);
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        vi.useRealTimers();
    });

    it('cancels open timer on mouseleave before delay expires', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Cancel" open-delay="200"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        // Leave before delay fires
        await vi.advanceTimersByTimeAsync(100);
        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;

        await vi.advanceTimersByTimeAsync(200);
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);

        vi.useRealTimers();
    });

    it('delays hiding tooltip with close-delay', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Delayed hide" close-delay="200"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        // Still visible during close delay
        expect(popup.classList.contains('visible')).toBe(true);

        await vi.advanceTimersByTimeAsync(250);
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);

        vi.useRealTimers();
    });

    it('cancels close timer on re-enter before close delay expires', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Re-enter" close-delay="200"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        // Show
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        // Start close
        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;

        // Re-enter before close fires
        await vi.advanceTimersByTimeAsync(100);
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        // Wait past original close time
        await vi.advanceTimersByTimeAsync(200);
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        vi.useRealTimers();
    });

    // ── Auto-flip ────────────────────────────────────────────────
    it('flips from top to bottom when no space above', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Flip" placement="top"><button>B</button></ui-tooltip>
        `);
        // Mock getBoundingClientRect to simulate element near top edge
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 5, bottom: 35, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 5, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('bottom')).toBe(true);
        expect(popup.classList.contains('top')).toBe(false);
    });

    it('flips from bottom to top when no space below', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Flip" placement="bottom"><button>B</button></ui-tooltip>
        `);
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 700, bottom: 795, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 700, toJSON: () => ({}),
        });
        // Mock window.innerHeight
        vi.stubGlobal('innerHeight', 800);

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('top')).toBe(true);
        expect(popup.classList.contains('bottom')).toBe(false);

        vi.unstubAllGlobals();
    });

    it('flips from left to right when no space on left', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Flip" placement="left"><button>B</button></ui-tooltip>
        `);
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 100, bottom: 130, left: 5, right: 105,
            width: 100, height: 30, x: 5, y: 100, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('right')).toBe(true);
        expect(popup.classList.contains('left')).toBe(false);
    });

    it('flips from right to left when no space on right', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Flip" placement="right"><button>B</button></ui-tooltip>
        `);
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 100, bottom: 130, left: 900, right: 1020,
            width: 100, height: 30, x: 900, y: 100, toJSON: () => ({}),
        });
        vi.stubGlobal('innerWidth', 1024);

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('left')).toBe(true);
        expect(popup.classList.contains('right')).toBe(false);

        vi.unstubAllGlobals();
    });

    it('keeps original placement when there is enough space', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="No flip" placement="top"><button>B</button></ui-tooltip>
        `);
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 200, bottom: 230, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 200, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('top')).toBe(true);
    });

    // ── Disconnect cleanup ───────────────────────────────────────
    it('clears timers on disconnect', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Cleanup" open-delay="200"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        el.remove();

        // Should not throw
        await vi.advanceTimersByTimeAsync(300);

        vi.useRealTimers();
    });

    // ── Dynamic label change ─────────────────────────────────────
    it('updates tooltip text when label changes', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Original"><button>B</button></ui-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.textContent!.trim()).toBe('Original');

        el.label = 'Updated';
        await el.updateComplete;
        expect(popup.textContent!.trim()).toBe('Updated');
    });
});
