import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-hover-card';
import type { UiHoverCard, UiHoverCardTrigger, UiHoverCardContent } from './ui-hover-card';

/* ── helpers ────────────────────────────────────────────────────────── */

interface MakeOpts {
    openDelay?: number;
    closeDelay?: number;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

async function make({ openDelay = 100, closeDelay = 100, side = 'bottom', align = 'center' }: MakeOpts = {}) {
    const el = await fixture<UiHoverCard>(html`
        <ui-hover-card .openDelay=${openDelay} .closeDelay=${closeDelay}>
            <ui-hover-card-trigger>Hover me</ui-hover-card-trigger>
            <ui-hover-card-content .side=${side} .align=${align}>
                Card content
            </ui-hover-card-content>
        </ui-hover-card>
    `);
    await el.updateComplete;
    return el;
}

function getTrigger(el: UiHoverCard) {
    return el.querySelector('ui-hover-card-trigger') as UiHoverCardTrigger;
}

function getContent(el: UiHoverCard) {
    return el.querySelector('ui-hover-card-content') as UiHoverCardContent;
}

function getTriggerDiv(el: UiHoverCard) {
    return getTrigger(el).shadowRoot!.querySelector('div') as HTMLElement;
}

function getCard(el: UiHoverCard) {
    return getContent(el).shadowRoot!.querySelector('.card') as HTMLElement;
}

function enter(target: HTMLElement) {
    target.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
}

function leave(target: HTMLElement) {
    target.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
}

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('content defaults to open=false', async () => {
        const el = await make();
        expect(getContent(el).open).toBe(false);
    });

    it('isOpen getter returns false by default', async () => {
        const el = await make();
        expect(el.isOpen).toBe(false);
    });

    it('trigger renders a div wrapper in shadow DOM', async () => {
        const el = await make();
        expect(getTriggerDiv(el)).not.toBeNull();
    });

    it('content renders .card div in shadow DOM', async () => {
        const el = await make();
        expect(getCard(el)).not.toBeNull();
    });

    it('content has a slot inside .card', async () => {
        const el = await make();
        const content = getContent(el);
        await content.updateComplete;
        expect(content.shadowRoot!.querySelector('.card slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card — open / close timing
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card — open / close timing', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('opens after openDelay on trigger mouseenter', async () => {
        const el = await make({ openDelay: 100 });
        enter(getTriggerDiv(el));
        expect(getContent(el).open).toBe(false);
        vi.advanceTimersByTime(100);
        expect(getContent(el).open).toBe(true);
    });

    it('content stays closed before openDelay elapses', async () => {
        const el = await make({ openDelay: 200 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(100);
        expect(getContent(el).open).toBe(false);
    });

    it('does not open if mouseleave before openDelay elapses', async () => {
        const el = await make({ openDelay: 200, closeDelay: 100 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(100);
        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(300);
        expect(getContent(el).open).toBe(false);
    });

    it('closes after closeDelay on trigger mouseleave', async () => {
        const el = await make({ openDelay: 50, closeDelay: 100 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(true);

        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(100);
        expect(getContent(el).open).toBe(false);
    });

    it('stays open during closeDelay window', async () => {
        const el = await make({ openDelay: 50, closeDelay: 200 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);

        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(100); // partial close delay
        expect(getContent(el).open).toBe(true);
    });

    it('re-entering trigger during closeDelay cancels close', async () => {
        const el = await make({ openDelay: 50, closeDelay: 200 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(true);

        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(100); // half of close delay
        enter(getTriggerDiv(el));    // re-enter before close fires
        vi.advanceTimersByTime(300); // past original close delay
        expect(getContent(el).open).toBe(true);
    });

    it('stays open when moving from trigger to card content', async () => {
        const el = await make({ openDelay: 50, closeDelay: 200 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(true);

        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(100);        // half of close delay
        enter(getCard(el));                  // hover the card
        vi.advanceTimersByTime(300);         // past original close deadline
        expect(getContent(el).open).toBe(true);
    });

    it('closes after closeDelay on card mouseleave', async () => {
        const el = await make({ openDelay: 50, closeDelay: 100 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(true);

        leave(getCard(el));
        vi.advanceTimersByTime(100);
        expect(getContent(el).open).toBe(false);
    });

    it('isOpen getter reflects open state', async () => {
        const el = await make({ openDelay: 50 });
        expect(el.isOpen).toBe(false);
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(el.isOpen).toBe(true);
    });

    it('openDelay=0 opens after 0ms', async () => {
        const el = await make({ openDelay: 0 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(0);
        expect(getContent(el).open).toBe(true);
    });

    it('repeated trigger leaves do not stack close timers', async () => {
        const el = await make({ openDelay: 50, closeDelay: 100 });
        const spy = vi.fn();
        el.addEventListener('ui-hover-card-close', spy);

        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(true);

        // Leave twice rapidly — only the second timer should matter
        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(50); // halfway through first timer
        leave(getTriggerDiv(el));   // resets the timer
        vi.advanceTimersByTime(60); // < 100ms from first leave, but > 0ms from second — old timer would have fired here
        expect(getContent(el).open).toBe(true); // still open; second timer not elapsed yet
        vi.advanceTimersByTime(50); // now 110ms after second leave → timer fires
        expect(getContent(el).open).toBe(false);
        expect(spy).toHaveBeenCalledOnce();
    });

    it('card leave resets close delay when trigger-leave timer is already running', async () => {
        const el = await make({ openDelay: 50, closeDelay: 200 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);

        leave(getTriggerDiv(el));   // starts close timer at t=0
        vi.advanceTimersByTime(100); // half of close delay
        leave(getCard(el));          // should reset the 200ms timer from now
        vi.advanceTimersByTime(150); // 250ms from first leave — old timer would have fired; new timer not yet done
        expect(getContent(el).open).toBe(true);
        vi.advanceTimersByTime(60);  // 210ms from card leave — new timer fires
        expect(getContent(el).open).toBe(false);
    });

    it('syncs open attribute on ui-hover-card-content', async () => {
        const el = await make({ openDelay: 50 });
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        // attribute reflection happens after Lit's update cycle
        const content = getContent(el);
        await content.updateComplete;
        expect(content.hasAttribute('open')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card — events
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card — events', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('fires ui-hover-card-open when opening', async () => {
        const el = await make({ openDelay: 100 });
        const spy = vi.fn();
        el.addEventListener('ui-hover-card-open', spy);

        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(100);
        expect(spy).toHaveBeenCalledOnce();
    });

    it('fires ui-hover-card-close when closing', async () => {
        const el = await make({ openDelay: 50, closeDelay: 100 });
        const openSpy = vi.fn();
        const closeSpy = vi.fn();
        el.addEventListener('ui-hover-card-open', openSpy);
        el.addEventListener('ui-hover-card-close', closeSpy);

        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(openSpy).toHaveBeenCalledOnce();

        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(100);
        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('does not fire open event twice when already open', async () => {
        const el = await make({ openDelay: 50 });
        const spy = vi.fn();
        el.addEventListener('ui-hover-card-open', spy);

        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        // Enter again while open
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does not fire close event if already closed', async () => {
        const el = await make({ openDelay: 50, closeDelay: 50 });
        const spy = vi.fn();
        el.addEventListener('ui-hover-card-close', spy);

        // Open then close
        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        expect(spy).toHaveBeenCalledOnce();

        // Leave again — already closed, should not fire again
        leave(getTriggerDiv(el));
        vi.advanceTimersByTime(100);
        expect(spy).toHaveBeenCalledOnce();
    });

    it('event bubbles (composed)', async () => {
        const el = await make({ openDelay: 50 });
        const spy = vi.fn();
        document.addEventListener('ui-hover-card-open', spy);

        enter(getTriggerDiv(el));
        vi.advanceTimersByTime(50);
        document.removeEventListener('ui-hover-card-open', spy);
        expect(spy).toHaveBeenCalledOnce();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card-content — positioning
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card-content — positioning', () => {
    it('side=bottom align=center: sets top and left=50% with translateX', async () => {
        const el = await make({ side: 'bottom', align: 'center' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('top')).not.toBe('');
        expect(c.style.getPropertyValue('bottom')).toBe('');
        expect(c.style.getPropertyValue('left')).toBe('50%');
        expect(c.style.getPropertyValue('transform')).toBe('translateX(-50%)');
    });

    it('side=top align=center: sets bottom and left=50% with translateX', async () => {
        const el = await make({ side: 'top', align: 'center' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('bottom')).not.toBe('');
        expect(c.style.getPropertyValue('top')).toBe('');
        expect(c.style.getPropertyValue('left')).toBe('50%');
        expect(c.style.getPropertyValue('transform')).toBe('translateX(-50%)');
    });

    it('side=right align=center: sets left and top=50% with translateY', async () => {
        const el = await make({ side: 'right', align: 'center' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('left')).not.toBe('');
        expect(c.style.getPropertyValue('right')).toBe('');
        expect(c.style.getPropertyValue('top')).toBe('50%');
        expect(c.style.getPropertyValue('transform')).toBe('translateY(-50%)');
    });

    it('side=left align=center: sets right and top=50% with translateY', async () => {
        const el = await make({ side: 'left', align: 'center' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('right')).not.toBe('');
        expect(c.style.getPropertyValue('left')).toBe('');
        expect(c.style.getPropertyValue('top')).toBe('50%');
        expect(c.style.getPropertyValue('transform')).toBe('translateY(-50%)');
    });

    it('align=start on bottom side: sets left=0, no transform', async () => {
        const el = await make({ side: 'bottom', align: 'start' });
        const c = getContent(el);
        await c.updateComplete;
        // happy-dom normalises '0' → '0px' for zero-length values
        expect(c.style.getPropertyValue('left')).toBe('0px');
        expect(c.style.getPropertyValue('right')).toBe('');
        expect(c.style.getPropertyValue('transform')).toBe('');
    });

    it('align=end on bottom side: sets right=0, no transform', async () => {
        const el = await make({ side: 'bottom', align: 'end' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('right')).toBe('0px');
        expect(c.style.getPropertyValue('left')).toBe('');
        expect(c.style.getPropertyValue('transform')).toBe('');
    });

    it('align=start on right side: sets top=0, no transform', async () => {
        const el = await make({ side: 'right', align: 'start' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('top')).toBe('0px');
        expect(c.style.getPropertyValue('transform')).toBe('');
    });

    it('align=end on left side: sets bottom=0, no transform', async () => {
        const el = await make({ side: 'left', align: 'end' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('bottom')).toBe('0px');
        expect(c.style.getPropertyValue('transform')).toBe('');
    });

    it('reapplies position when side changes', async () => {
        const el = await make({ side: 'bottom', align: 'center' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('top')).not.toBe('');

        c.side = 'top';
        await c.updateComplete;
        expect(c.style.getPropertyValue('bottom')).not.toBe('');
        expect(c.style.getPropertyValue('top')).toBe('');
    });

    it('side and align can be set via HTML attributes', async () => {
        const el = await fixture<UiHoverCard>(html`
            <ui-hover-card>
                <ui-hover-card-trigger>T</ui-hover-card-trigger>
                <ui-hover-card-content side="top" align="end">C</ui-hover-card-content>
            </ui-hover-card>
        `);
        const c = getContent(el);
        await c.updateComplete;
        expect(c.side).toBe('top');
        expect(c.align).toBe('end');
        expect(c.style.getPropertyValue('bottom')).not.toBe('');
        expect(c.style.getPropertyValue('right')).toBe('0px');
    });

    it('reapplies position when align changes', async () => {
        const el = await make({ side: 'bottom', align: 'center' });
        const c = getContent(el);
        await c.updateComplete;
        expect(c.style.getPropertyValue('transform')).toBe('translateX(-50%)');

        c.align = 'start';
        await c.updateComplete;
        expect(c.style.getPropertyValue('transform')).toBe('');
        expect(c.style.getPropertyValue('left')).toBe('0px');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card — keyboard focus
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card — keyboard focus', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('opens on focusin inside trigger', async () => {
        const el = await make({ openDelay: 50 });
        const triggerDiv = getTriggerDiv(el);
        triggerDiv.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(true);
    });

    it('closes on focusout inside trigger', async () => {
        const el = await make({ openDelay: 50, closeDelay: 50 });
        const triggerDiv = getTriggerDiv(el);
        triggerDiv.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(true);

        triggerDiv.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
        vi.advanceTimersByTime(50);
        expect(getContent(el).open).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card — slotchange sync
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card — slotchange sync', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('syncs dynamically added content', async () => {
        const el = await fixture<UiHoverCard>(html`
            <ui-hover-card .openDelay=${50} .closeDelay=${50}>
                <ui-hover-card-trigger>Hover</ui-hover-card-trigger>
            </ui-hover-card>
        `);
        await el.updateComplete;

        // Open first
        const triggerDiv = (el.querySelector('ui-hover-card-trigger') as UiHoverCardTrigger)
            .shadowRoot!.querySelector('div') as HTMLElement;
        triggerDiv.dispatchEvent(new MouseEvent('mouseenter'));
        vi.advanceTimersByTime(50);

        // Add content dynamically
        const content = document.createElement('ui-hover-card-content') as UiHoverCardContent;
        el.appendChild(content);
        await el.updateComplete;
        await content.updateComplete;
        expect(content.open).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card — disconnect cleanup
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card — disconnect cleanup', () => {
    it('clears pending open timer on disconnect', async () => {
        vi.useFakeTimers();
        const el = await fixture<UiHoverCard>(html`
            <ui-hover-card .openDelay=${1000} .closeDelay=${1000}>
                <ui-hover-card-trigger>T</ui-hover-card-trigger>
                <ui-hover-card-content>C</ui-hover-card-content>
            </ui-hover-card>
        `);
        const triggerDiv = (el.querySelector('ui-hover-card-trigger') as UiHoverCardTrigger)
            .shadowRoot!.querySelector('div') as HTMLElement;
        triggerDiv.dispatchEvent(new MouseEvent('mouseenter'));
        el.remove();
        expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
        vi.useRealTimers();
    });

    it('clears pending close timer on disconnect', async () => {
        vi.useFakeTimers();
        const el = await fixture<UiHoverCard>(html`
            <ui-hover-card .openDelay=${50} .closeDelay=${1000}>
                <ui-hover-card-trigger>T</ui-hover-card-trigger>
                <ui-hover-card-content>C</ui-hover-card-content>
            </ui-hover-card>
        `);
        const triggerDiv = (el.querySelector('ui-hover-card-trigger') as UiHoverCardTrigger)
            .shadowRoot!.querySelector('div') as HTMLElement;
        triggerDiv.dispatchEvent(new MouseEvent('mouseenter'));
        vi.advanceTimersByTime(50);
        triggerDiv.dispatchEvent(new MouseEvent('mouseleave'));
        el.remove();
        expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
        vi.useRealTimers();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-hover-card — nested isolation
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-hover-card — nested isolation', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('inner trigger only opens inner card', async () => {
        const el = await fixture<UiHoverCard>(html`
            <ui-hover-card .openDelay=${50} .closeDelay=${50} id="outer">
                <ui-hover-card-trigger id="outer-trigger">Outer</ui-hover-card-trigger>
                <ui-hover-card-content id="outer-content">
                    <ui-hover-card .openDelay=${50} .closeDelay=${50} id="inner">
                        <ui-hover-card-trigger id="inner-trigger">Inner</ui-hover-card-trigger>
                        <ui-hover-card-content id="inner-content">Inner</ui-hover-card-content>
                    </ui-hover-card>
                </ui-hover-card-content>
            </ui-hover-card>
        `);
        await el.updateComplete;

        const innerTrigger = el.querySelector('#inner-trigger') as UiHoverCardTrigger;
        const innerTriggerDiv = innerTrigger.shadowRoot!.querySelector('div') as HTMLElement;
        innerTriggerDiv.dispatchEvent(new MouseEvent('mouseenter'));
        vi.advanceTimersByTime(50);

        const outerContent = el.querySelector('#outer-content') as UiHoverCardContent;
        const innerContent = el.querySelector('#inner-content') as UiHoverCardContent;
        expect(outerContent.open).toBe(false);
        expect(innerContent.open).toBe(true);
    });
});
