import { describe, it, expect, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { expectAccessible } from '../test-utils/axe';
import { FlintTooltip } from './flint-tooltip';
import type { FlintPopup } from '../popup/flint-popup';

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

    // ── Disconnect clears close timer ──────────────────────────────
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

    // ── flint-popup integration ───────────────────────────────────

    it('contains a flint-popup element', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        const flintPopup = el.shadowRoot!.querySelector('flint-popup');
        expect(flintPopup).toBeTruthy();
    });

    it('sets flint-popup active when tooltip is visible', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        const flintPopup = el.shadowRoot!.querySelector('flint-popup') as FlintPopup;
        expect(flintPopup.active).toBe(false);

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await el.updateComplete;
        expect(flintPopup.active).toBe(true);
    });

    it('passes placement to flint-popup', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip" placement="bottom"><button>B</button></flint-tooltip>
        `);
        const flintPopup = el.shadowRoot!.querySelector('flint-popup') as FlintPopup;
        expect(flintPopup.getAttribute('placement')).toBe('bottom');
    });

    it('enables flip on flint-popup', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        const flintPopup = el.shadowRoot!.querySelector('flint-popup') as FlintPopup;
        expect(flintPopup.flip).toBe(true);
    });

    it('sets flint-popup distance to 8', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        const flintPopup = el.shadowRoot!.querySelector('flint-popup') as FlintPopup;
        expect(flintPopup.distance).toBe(8);
    });

    it('hoist defaults to false', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip"><button>B</button></flint-tooltip>
        `);
        expect(el.hoist).toBe(false);
        const flintPopup = el.shadowRoot!.querySelector('flint-popup') as FlintPopup;
        expect(flintPopup.strategy).toBe('absolute');
    });

    it('sets flint-popup strategy to fixed when hoist is true', async () => {
        const el = await fixture<FlintTooltip>(html`
            <flint-tooltip label="Tip" hoist><button>B</button></flint-tooltip>
        `);
        const flintPopup = el.shadowRoot!.querySelector('flint-popup') as FlintPopup;
        expect(flintPopup.strategy).toBe('fixed');
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
