/**
 * Ref-counted body scroll lock utility.
 *
 * Multiple components (dialogs, drawers) can request a lock simultaneously.
 * The body scroll is only restored when ALL requesters have unlocked.
 */

const locks = new Set<Element>();
let savedScrollY = 0;

/**
 * Lock body scrolling. Safe to call multiple times with the same requester.
 * The body is locked on the first requester and stays locked until all requesters unlock.
 */
export function lockBodyScroll(requester: Element): void {
  if (typeof document === 'undefined') return;
  locks.add(requester);
  if (locks.size === 1) {
    savedScrollY = window.scrollY;
    const body = document.body;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${savedScrollY}px`;
    body.style.width = '100%';
  }
}

/**
 * Unlock body scrolling for a given requester.
 * Only restores body scroll when all requesters have unlocked.
 */
export function unlockBodyScroll(requester: Element): void {
  if (typeof document === 'undefined') return;
  locks.delete(requester);
  if (locks.size === 0) {
    const body = document.body;
    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    window.scrollTo(0, savedScrollY);
  }
}
