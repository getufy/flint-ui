/**
 * Focus trap utility for modal components (Dialog, Drawer, CommandDialog).
 *
 * Traps Tab / Shift+Tab within a container by cycling from last → first
 * and first → last focusable element. Also supports setting `inert` on
 * sibling elements to prevent assistive-technology escape.
 */

/** Selector covering all natively focusable element types. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]:not([contenteditable="false"])',
  'details > summary:first-of-type',
  'audio[controls]',
  'video[controls]',
].join(',');

/**
 * Collect all focusable elements inside a root, piercing shadow boundaries.
 * Elements that are hidden (`display: none`, `visibility: hidden`, or the
 * `hidden` attribute) are excluded.
 */
export function getFocusableElements(root: HTMLElement | ShadowRoot): HTMLElement[] {
  const elements: HTMLElement[] = [];

  function walk(node: HTMLElement | ShadowRoot) {
    // If node is an element (not a ShadowRoot), check shadow root first
    if (node instanceof HTMLElement && node.shadowRoot) {
      walk(node.shadowRoot);
    }

    // Query focusable elements at this level
    const focusable = node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    for (const el of focusable) {
      // Skip hidden elements
      if (el.hidden || el.closest('[hidden]')) continue;
      // Skip elements inside inert subtrees
      if (el.closest('[inert]')) continue;
      elements.push(el);

      // Recurse into shadow roots of focusable elements
      if (el.shadowRoot) {
        walk(el.shadowRoot);
      }
    }

    // Also walk slotted content: check for slots and their assigned elements
    const slots = node.querySelectorAll('slot');
    for (const slot of slots) {
      const assigned = slot.assignedElements({ flatten: true });
      for (const assignedEl of assigned) {
        if (assignedEl instanceof HTMLElement) {
          // Check if the assigned element itself is focusable
          if (assignedEl.matches(FOCUSABLE_SELECTOR) && !assignedEl.hidden && !assignedEl.closest('[hidden]') && !assignedEl.closest('[inert]')) {
            if (!elements.includes(assignedEl)) elements.push(assignedEl);
          }
          // Recurse: check children of assigned elements
          const nested = assignedEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
          for (const nestedEl of nested) {
            if (!nestedEl.hidden && !nestedEl.closest('[hidden]') && !nestedEl.closest('[inert]')) {
              if (!elements.includes(nestedEl)) elements.push(nestedEl);
            }
          }
          // Recurse into shadow roots
          if (assignedEl.shadowRoot) {
            walk(assignedEl.shadowRoot);
          }
        }
      }
    }
  }

  walk(root);
  return elements;
}

/**
 * Handle Tab / Shift+Tab to trap focus within a container.
 * Call this from a `keydown` handler on the modal container.
 *
 * @param e - The keyboard event.
 * @param container - The root element (or shadow root) to trap focus within.
 */
export function handleFocusTrapKeyDown(e: KeyboardEvent, container: HTMLElement | ShadowRoot): void {
  if (e.key !== 'Tab') return;

  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    // No focusable elements — prevent Tab from escaping
    e.preventDefault();
    return;
  }

  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;

  // Determine the currently focused element (could be inside a shadow root)
  const active = getDeepActiveElement();

  if (e.shiftKey) {
    // Shift+Tab: if on first element (or before it), wrap to last
    if (active === first || !containsDeep(container, active)) {
      e.preventDefault();
      last.focus();
    }
  } else {
    // Tab: if on last element (or outside), wrap to first
    if (active === last || !containsDeep(container, active)) {
      e.preventDefault();
      first.focus();
    }
  }
}

/**
 * Get the deepest active element, traversing shadow roots.
 */
function getDeepActiveElement(): Element | null {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/**
 * Check if a container (Element or ShadowRoot) contains the target element,
 * accounting for shadow DOM boundaries and slotted content.
 */
function containsDeep(container: HTMLElement | ShadowRoot, target: Element | null): boolean {
  if (!target) return false;

  // Walk up from target through composed path
  let current: Node | null = target;
  while (current) {
    if (current === container) return true;
    // If we're at a shadow root boundary, jump to the host
    if (current instanceof ShadowRoot) {
      current = current.host;
    } else {
      // Try assignedSlot first (for slotted elements), then parentNode
      current = (current as Element).assignedSlot ?? current.parentNode;
    }
  }
  return false;
}
