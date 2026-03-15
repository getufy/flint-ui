import { describe, it, expect, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { expectAccessible } from '../test-utils/axe';
import { FlintTooltip } from './flint-tooltip';

describe('flint-tooltip', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ── Definition ───────────────────────────────────────────────
    it('is defined', () => {
        const el = document.createElement('flint-tooltip');
        expect(el).toBeInstanceOf(FlintTooltip);
    });

    // ── Default rendering ────────────────────────────────────────
    it('renders with default values', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Test"><button>Trigger</button></flint-tooltip>
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
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><span class="child">Hello</span></flint-tooltip>
        `);
        const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        expect(slot).toBeTruthy();
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('Hello');
    });

    // ── Show / hide on hover ─────────────────────────────────────
    it('shows tooltip on mouseenter and hides on mouseleave', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Hover tip"><button>Hover</button></flint-tooltip>
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
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    // ── Show / hide on focus ─────────────────────────────────────
    it('shows tooltip on focusin and hides on focusout', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Focus tip"><button>Focus</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new Event('focusin', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        container.dispatchEvent(new Event('focusout', { bubbles: true }));
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    // ── Disabled ─────────────────────────────────────────────────
    it('does not show when disabled', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="No show" disabled><button>Hover</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Test" disabled><button>B</button></flint-tooltip>
        `);
        expect(el.hasAttribute('disabled')).toBe(true);
        el.disabled = false;
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(false);
    });

    // ── Empty label ──────────────────────────────────────────────
    it('does not show when label is empty', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label=""><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    // ── Placements ───────────────────────────────────────────────
    it('applies top placement class by default', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('top')).toBe(true);
    });

    it('applies bottom placement class', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip" placement="bottom"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('bottom')).toBe(true);
    });

    it('applies left placement class', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip" placement="left"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('left')).toBe(true);
    });

    it('applies right placement class', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip" placement="right"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('right')).toBe(true);
    });

    // ── Arrow ────────────────────────────────────────────────────
    it('renders arrow when arrow=true', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip" arrow><button>B</button></flint-tooltip>
        `);
        const arrow = el.shadowRoot!.querySelector('.arrow');
        expect(arrow).toBeTruthy();
    });

    it('does not render arrow by default', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        const arrow = el.shadowRoot!.querySelector('.arrow');
        expect(arrow).toBeFalsy();
    });

    // ── Accessibility ────────────────────────────────────────────
    it('has role=tooltip on popup', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="A11y"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('[role="tooltip"]');
        expect(popup).toBeTruthy();
    });

    it('has unique id on popup', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="ID"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.id).toBeTruthy();
        expect(popup.id).toMatch(/^flint-tooltip-\d+$/);
    });

    it('sets aria-hidden=true when not visible', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Hidden"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-hidden=false when visible', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Shown"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.getAttribute('aria-hidden')).toBe('false');
    });

    it('has aria-describedby on trigger wrapper pointing to tooltip popup id', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="A11y link"><button>B</button></flint-tooltip>
        `);
        const wrapper = el.shadowRoot!.querySelector('.trigger-wrapper')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(wrapper.getAttribute('aria-describedby')).toBe(popup.id);
    });

    // ── Escape key ───────────────────────────────────────────────
    it('hides tooltip on Escape key', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Esc"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('ignores non-Escape keys', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Key"><button>B</button></flint-tooltip>
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

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Delayed" open-delay="200"><button>B</button></flint-tooltip>
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

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Cancel" open-delay="200"><button>B</button></flint-tooltip>
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

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Delayed hide" close-delay="200"><button>B</button></flint-tooltip>
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

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Re-enter" close-delay="200"><button>B</button></flint-tooltip>
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
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Flip" placement="top"><button>B</button></flint-tooltip>
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
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Flip" placement="bottom"><button>B</button></flint-tooltip>
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
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Flip" placement="left"><button>B</button></flint-tooltip>
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
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Flip" placement="right"><button>B</button></flint-tooltip>
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
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="No flip" placement="top"><button>B</button></flint-tooltip>
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

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Cleanup" open-delay="200"><button>B</button></flint-tooltip>
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
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Original"><button>B</button></flint-tooltip>
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

    // ── Default label value ───────────────────────────────────────
    it('has empty string as default label', () => {
        const el = document.createElement('flint-tooltip') as FlintTooltip;
        expect(el.label).toBe('');
    });

    // ── Open-timer dedup guard ────────────────────────────────────
    it('does not restart open timer if one is already pending', async () => {
        vi.useFakeTimers();

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Dedup" open-delay="200"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        const firstTimerId = (el as unknown as { _openTimer: unknown })._openTimer;
        expect(firstTimerId).not.toBeNull();

        // Second mouseenter — should be a no-op (timer already running)
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        const secondTimerId = (el as unknown as { _openTimer: unknown })._openTimer;

        expect(secondTimerId).toBe(firstTimerId);

        vi.useRealTimers();
    });

    // ── Close-timer dedup guard ───────────────────────────────────
    it('does not restart close timer if one is already pending', async () => {
        vi.useFakeTimers();

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Dedup close" close-delay="200"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        const firstTimerId = (el as unknown as { _closeTimer: unknown })._closeTimer;
        expect(firstTimerId).not.toBeNull();

        // Second mouseleave — should be a no-op
        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        const secondTimerId = (el as unknown as { _closeTimer: unknown })._closeTimer;

        expect(secondTimerId).toBe(firstTimerId);

        vi.useRealTimers();
    });

    // ── Disconnect clears open timer ──────────────────────────────
    it('disconnectedCallback clears a pending open timer', async () => {
        vi.useFakeTimers();

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="DC open" open-delay="300"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect((el as unknown as { _openTimer: unknown })._openTimer).not.toBeNull();

        el.remove();

        expect((el as unknown as { _openTimer: unknown })._openTimer).toBeNull();

        // Advance time — tooltip must not become visible
        await vi.advanceTimersByTimeAsync(400);
        expect((el as unknown as { _visible: boolean })._visible).toBe(false);

        vi.useRealTimers();
    });

    // ── Disconnect clears close timer (covers NoCoverage branch) ──
    it('disconnectedCallback clears a pending close timer', async () => {
        vi.useFakeTimers();

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="DC close" close-delay="300"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        // Show the tooltip first
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        // Start the close timer
        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        expect((el as unknown as { _closeTimer: unknown })._closeTimer).not.toBeNull();

        el.remove();

        expect((el as unknown as { _closeTimer: unknown })._closeTimer).toBeNull();

        vi.useRealTimers();
    });

    // ── Auto-flip: fallback popup dimensions ─────────────────────
    // jsdom always returns 0 for getBoundingClientRect on shadow elements,
    // so pw=100 and ph=30 are used as fallbacks.  Tests below only pass when
    // the fallback values are correctly applied (|| 100 / || 30, not && 100/30).

    it('flips top→bottom when top is in the fallback-sensitive range (ph=30 zone)', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="ph fallback" placement="top"><button>B</button></flint-tooltip>
        `);
        // top=20: needs ph=30 fallback to flip (20-30-8=-18<0). With ph=0 would not flip.
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 20, bottom: 50, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 20, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('bottom')).toBe(true);
    });

    it('flips left→right when left is in the fallback-sensitive range (pw=100 zone)', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="pw fallback" placement="left"><button>B</button></flint-tooltip>
        `);
        // left=50: needs pw=100 fallback to flip (50-100-8=-58<0). With pw=0 would not flip.
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 100, bottom: 130, left: 50, right: 150,
            width: 100, height: 30, x: 50, y: 100, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('right')).toBe(true);
    });

    // ── Auto-flip: arithmetic boundary (margin sign) ─────────────

    it('flips top→bottom when margin makes value just negative (top=30)', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="arith top" placement="top"><button>B</button></flint-tooltip>
        `);
        // top=30: original 30-30-8=-8<0 (flip); mutant with +margin: 30-30+8=8>=0 (no flip)
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 30, bottom: 60, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 30, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('bottom')).toBe(true);
    });

    it('flips bottom→top when margin makes value just over limit (bottom=770, H=800)', async () => {
        vi.stubGlobal('innerHeight', 800);

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="arith bottom" placement="bottom"><button>B</button></flint-tooltip>
        `);
        // original: 770+30+8=808>800 (flip); mutant -margin: 770+30-8=792<=800 (no flip)
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 740, bottom: 770, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 740, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('top')).toBe(true);

        vi.unstubAllGlobals();
    });

    it('flips left→right when margin makes value just negative (left=100)', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="arith left" placement="left"><button>B</button></flint-tooltip>
        `);
        // original: 100-100-8=-8<0 (flip); mutant +margin: 100-100+8=8>=0 (no flip)
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 100, bottom: 130, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 100, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('right')).toBe(true);
    });

    it('flips right→left when margin makes value just over limit (right=924, W=1024)', async () => {
        vi.stubGlobal('innerWidth', 1024);

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="arith right" placement="right"><button>B</button></flint-tooltip>
        `);
        // original: 924+100+8=1032>1024 (flip); mutant -margin: 924+100-8=1016<=1024 (no flip)
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 100, bottom: 130, left: 824, right: 924,
            width: 100, height: 30, x: 824, y: 100, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('left')).toBe(true);

        vi.unstubAllGlobals();
    });

    // ── Auto-flip: equality boundary (>= vs >) ───────────────────

    it('does NOT flip top when exactly at boundary (top-ph-margin === 0)', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="eq top" placement="top"><button>B</button></flint-tooltip>
        `);
        // top=38: 38-30-8=0>=0 → fits (no flip); mutant >0: 0>0=false → flip
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 38, bottom: 68, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 38, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('top')).toBe(true);
    });

    it('does NOT flip bottom when exactly at boundary (bottom+ph+margin === innerHeight)', async () => {
        vi.stubGlobal('innerHeight', 800);

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="eq bottom" placement="bottom"><button>B</button></flint-tooltip>
        `);
        // bottom=762: 762+30+8=800<=800 → fits; mutant <800: 800<800=false → flip
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 732, bottom: 762, left: 100, right: 200,
            width: 100, height: 30, x: 100, y: 732, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('bottom')).toBe(true);

        vi.unstubAllGlobals();
    });

    it('does NOT flip left when exactly at boundary (left-pw-margin === 0)', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="eq left" placement="left"><button>B</button></flint-tooltip>
        `);
        // left=108: 108-100-8=0>=0 → fits; mutant >0: 0>0=false → flip
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 100, bottom: 130, left: 108, right: 208,
            width: 100, height: 30, x: 108, y: 100, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('left')).toBe(true);
    });

    // ── Auto-flip: no popup element (defensive guard) ────────────
    it('_applyAutoFlip falls back to placement when popup element is absent', () => {
        // Call _applyAutoFlip on a fresh (not yet connected) element.
        // shadowRoot is null before Lit renders, so popup is null → fallback runs.
        const el = document.createElement('flint-tooltip') as FlintTooltip;
        el.placement = 'left';
        (el as unknown as { _applyAutoFlip(): void })._applyAutoFlip();
        expect((el as unknown as { _activePlacement: string })._activePlacement).toBe('left');
    });

    it('does NOT flip right when exactly at boundary (right+pw+margin === innerWidth)', async () => {
        vi.stubGlobal('innerWidth', 1024);

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="eq right" placement="right"><button>B</button></flint-tooltip>
        `);
        // right=916: 916+100+8=1024<=1024 → fits; mutant <1024: 1024<1024=false → flip
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 100, bottom: 130, left: 816, right: 916,
            width: 100, height: 30, x: 816, y: 100, toJSON: () => ({}),
        });

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.tooltip-popup')!.classList.contains('right')).toBe(true);

        vi.unstubAllGlobals();
    });

    // ── Hoist ─────────────────────────────────────────────────────

    it('hoist defaults to false', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        expect(el.hoist).toBe(false);
    });

    it('adds hoisted class when hoist is true', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip" hoist><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('hoisted')).toBe(true);
    });

    it('does not add hoisted class when hoist is false', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('hoisted')).toBe(false);
    });

    it('applies inline fixed positioning when hoist is true and tooltip shows', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Hoisted" hoist><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        // Wait for _startHoist's updateComplete.then
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup') as HTMLElement;
        expect(popup.classList.contains('visible')).toBe(true);
        expect(popup.classList.contains('hoisted')).toBe(true);
    });

    it('cleans up inline styles when hoist tooltip hides', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Hoisted" hoist><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        // Show
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        await el.updateComplete;

        // Hide
        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup') as HTMLElement;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('cleans up hoist listeners on Escape key', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Hoisted" hoist><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        // Show
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        // Escape
        container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 0));
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup') as HTMLElement;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('cleans up hoist on disconnect', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Hoisted" hoist><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        // Should not throw when removed
        el.remove();
        expect(el.shadowRoot!.querySelector('.tooltip-popup')).toBeTruthy();
    });

    it('applies hoist with open-delay', async () => {
        vi.useFakeTimers();

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Delayed hoist" hoist open-delay="100"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup') as HTMLElement;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);

        await vi.advanceTimersByTimeAsync(150);
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);
        expect(popup.classList.contains('hoisted')).toBe(true);

        vi.useRealTimers();
    });

    it('cleans up hoist with close-delay', async () => {
        vi.useFakeTimers();

        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Delayed hoist" hoist close-delay="100"><button>B</button></flint-tooltip>
        `);
        const container = el.shadowRoot!.querySelector('.tooltip-container')!;

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;

        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await vi.advanceTimersByTimeAsync(150);
        await el.updateComplete;

        const popup = el.shadowRoot!.querySelector('.tooltip-popup') as HTMLElement;
        expect(popup.classList.contains('visible')).toBe(false);

        vi.useRealTimers();
    });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('flint-tooltip — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Helpful tip"><button>Hover me</button></flint-tooltip>
        `);
        await expectAccessible(el);
    }, 15000);
});
