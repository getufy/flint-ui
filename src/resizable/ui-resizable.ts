import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/* ------------------------------------------------------------------ */
/*  ui-resizable-group                                                */
/* ------------------------------------------------------------------ */

@customElement('ui-resizable-group')
export class UiResizableGroup extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;
      /* Internal: total pixel width/height of all handles — set by JS. */
      --_rg-handle-total: 0px;
    }
    :host([orientation='vertical']) {
      flex-direction: column;
    }
  `;

  /** Layout direction — 'horizontal' (row) or 'vertical' (column). */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Text direction for RTL support. */
  @property({ reflect: true }) dir: 'ltr' | 'rtl' = 'ltr';

  /* ---- internal bookkeeping ---- */
  private _panels: UiResizablePanel[] = [];
  private _handles: UiResizableHandle[] = [];
  /** Collapsible panels eligible to collapse in the current drag session. */
  private _collapsibleAtDragStart = new Set<UiResizablePanel>();
  /** Accumulated overshoot past minSize per panel (percentage points) in current drag. */
  private _collapseOvershoot = new Map<UiResizablePanel, number>();

  /* ---- public API ---- */

  /** Returns a snapshot of panel sizes as percentages (0-100). */
  getLayout(): number[] {
    return this._panels.map(p => p.size);
  }

  /* ---- child management ---- */

  private _collectChildren() {
    const panels: UiResizablePanel[] = [];
    const handles: UiResizableHandle[] = [];
    const children = this.querySelectorAll<UiResizablePanel | UiResizableHandle>(
      'ui-resizable-panel, ui-resizable-handle',
    );
    for (const child of children) {
      if ((child as Element).closest('ui-resizable-group') !== this) continue;
      if (child instanceof UiResizablePanel) panels.push(child);
      else if (child instanceof UiResizableHandle) handles.push(child);
    }
    this._panels = panels;
    this._handles = handles;
    this._syncChildren();
  }

  private _syncChildren() {
    for (const panel of this._panels) {
      panel._orientation = this.orientation;
    }
    for (const handle of this._handles) {
      handle.orientation = this.orientation;
      handle._dir = this.dir;
    }
    // Update the CSS custom property used by panels to account for handle widths.
    this.style.setProperty('--_rg-handle-total', this._computeHandleTotal());
    this._distributeDefaultSizes();
    this._syncAriaOnHandles();
  }

  /**
   * Builds the CSS value for `--_rg-handle-total` — the sum of all handle
   * pixel sizes (honouring `with-handle` vs plain).  Panels use this in
   * `calc()` so their `flex-basis` never pushes a handle off-screen.
   */
  private _computeHandleTotal(): string {
    if (this._handles.length === 0) return '0px';
    const parts = this._handles.map(h =>
      h.withHandle
        ? 'var(--ui-resizable-handle-active-size, 12px)'
        : 'var(--ui-resizable-handle-size, 4px)',
    );
    return parts.length === 1 ? parts[0] : `calc(${parts.join(' + ')})`;
  }

  private _distributeDefaultSizes() {
    // Resolve defaultSize → size for panels that haven't done their first Lit update yet
    for (const p of this._panels) {
      if (!p._hasExplicitSize && p.defaultSize > 0) {
        p.size = p.defaultSize;
        p._hasExplicitSize = true;
      } else if (p.size > 0) {
        p._hasExplicitSize = true;
      }
    }

    let claimed = 0;
    let unclaimed = 0;
    for (const p of this._panels) {
      if (p._hasExplicitSize) {
        claimed += p.size;
      } else {
        unclaimed++;
      }
    }
    if (unclaimed > 0) {
      const remaining = Math.max(0, 100 - claimed);
      const each = remaining / unclaimed;
      for (const p of this._panels) {
        if (!p._hasExplicitSize) {
          p.size = each;
          p._hasExplicitSize = true;
        }
      }
    }

    // Apply sizes
    for (const p of this._panels) {
      p._applySize();
    }
  }

  private _syncAriaOnHandles() {
    for (let i = 0; i < this._handles.length; i++) {
      const h = this._handles[i];
      const before = this._panels[i];
      const after = this._panels[i + 1];
      if (!before || !after) continue;
      // aria-valuenow = size of the panel before the handle (0–100)
      h.setAttribute('aria-valuenow', String(Math.round(before.size)));
      h.setAttribute('aria-valuemin', String(Math.round(before.minSize)));
      h.setAttribute('aria-valuemax', String(Math.round(before.maxSize)));
      h.setAttribute('aria-orientation', this.orientation);
    }
  }

  /* ---- drag session tracking ---- */

  /** @internal – called by handle on pointerdown */
  _startDrag() {
    this._collapsibleAtDragStart.clear();
    this._collapseOvershoot.clear();
    for (const p of this._panels) {
      if (p.collapsible) {
        this._collapsibleAtDragStart.add(p);
      }
    }
  }

  /** @internal – called by handle on pointerup / cancel / lost */
  _endDrag() {
    this._collapsibleAtDragStart.clear();
    this._collapseOvershoot.clear();
  }

  /* ---- collapse / expand API ---- */

  /** @internal – called by UiResizablePanel.collapse() */
  _collapsePanel(panel: UiResizablePanel) {
    const idx = this._panels.indexOf(panel);
    if (idx === -1 || panel.collapsed) return;

    // Prefer giving space to next sibling, fall back to prev
    const sibling = this._panels[idx + 1] ?? this._panels[idx - 1];
    if (!sibling) return;

    sibling.size += panel.size;
    panel.size = 0;
    panel.collapsed = true;
    panel._applySize();
    sibling._applySize();
    this._syncAriaOnHandles();

    this._fireChange();
    this.dispatchEvent(
      new CustomEvent('ui-resizable-collapse', {
        bubbles: true,
        composed: true,
        detail: { index: idx, layout: this.getLayout() },
      }),
    );
  }

  /** @internal – called by UiResizablePanel.expand() */
  _expandPanel(panel: UiResizablePanel) {
    const idx = this._panels.indexOf(panel);
    if (idx === -1 || !panel.collapsed) return;

    const sibling = this._panels[idx + 1] ?? this._panels[idx - 1];
    if (!sibling) return;

    const restoreSize =
      panel._restoreSize > 0
        ? panel._restoreSize
        : Math.max(panel.minSize > 0 ? panel.minSize : 0, panel.defaultSize > 0 ? panel.defaultSize : 20);

    const available = sibling.size - sibling.minSize;
    const actual = Math.min(restoreSize, Math.max(0, available));
    if (actual <= 0) return;

    panel.size = actual;
    sibling.size = Math.max(sibling.minSize, sibling.size - actual);
    panel.collapsed = false;
    panel._applySize();
    sibling._applySize();
    this._syncAriaOnHandles();

    this._fireChange();
    this.dispatchEvent(
      new CustomEvent('ui-resizable-expand', {
        bubbles: true,
        composed: true,
        detail: { index: idx, layout: this.getLayout() },
      }),
    );
  }

  /* ---- resize logic (called from handle) ---- */

  /** @internal */
  _handleResize(handle: UiResizableHandle, delta: number) {
    const idx = this._handles.indexOf(handle);
    if (idx === -1) return;

    const before = this._panels[idx];
    const after = this._panels[idx + 1];
    if (!before || !after) return;

    // For RTL horizontal, reverse the delta
    const effectiveDelta =
      this.orientation === 'horizontal' && this.dir === 'rtl' ? -delta : delta;

    const totalPx = this.orientation === 'horizontal'
      ? this.getBoundingClientRect().width
      : this.getBoundingClientRect().height;

    if (totalPx === 0) return;

    const deltaPct = (effectiveDelta / totalPx) * 100;

    let newBefore = before.size + deltaPct;
    let newAfter = after.size - deltaPct;

    // Enforce min/max constraints.
    // Collapse: accumulate "overshoot" distance dragged past minSize each event.
    //   Once overshoot >= minSize/2, snap to 0. Resets if user drags back above minSize.
    // Expand: when panel is already at 0, clamp to minSize (snap open).
    if (newBefore < before.minSize) {
      if (before.size === 0) {
        // Panel already collapsed — stay at 0 while dragging further in collapse direction;
        // snap back to minSize when user drags the other way (newBefore > 0).
        if (newBefore <= 0) {
          newAfter += newBefore; // transfer overshoot to sibling
          newBefore = 0;
        } else {
          const diff = before.minSize - newBefore;
          newBefore = before.minSize;
          newAfter -= diff;
        }
      } else if (this._collapsibleAtDragStart.has(before)) {
        const overshoot = (this._collapseOvershoot.get(before) ?? 0) + (before.minSize - newBefore);
        if (overshoot >= before.minSize / 2) {
          newAfter += newBefore;
          newBefore = 0;
          this._collapseOvershoot.delete(before);
        } else {
          this._collapseOvershoot.set(before, overshoot);
          const diff = before.minSize - newBefore;
          newBefore = before.minSize;
          newAfter -= diff;
        }
      } else {
        const diff = before.minSize - newBefore;
        newBefore = before.minSize;
        newAfter -= diff;
      }
    } else {
      this._collapseOvershoot.delete(before);
    }
    if (newAfter < after.minSize) {
      if (after.size === 0) {
        // Panel already collapsed — stay at 0 while dragging further in collapse direction;
        // snap back to minSize when user drags the other way (newAfter > 0).
        if (newAfter <= 0) {
          newBefore += newAfter; // transfer overshoot to sibling
          newAfter = 0;
        } else {
          const diff = after.minSize - newAfter;
          newAfter = after.minSize;
          newBefore -= diff;
        }
      } else if (this._collapsibleAtDragStart.has(after)) {
        const overshoot = (this._collapseOvershoot.get(after) ?? 0) + (after.minSize - newAfter);
        if (overshoot >= after.minSize / 2) {
          newBefore += newAfter;
          newAfter = 0;
          this._collapseOvershoot.delete(after);
        } else {
          this._collapseOvershoot.set(after, overshoot);
          const diff = after.minSize - newAfter;
          newAfter = after.minSize;
          newBefore -= diff;
        }
      } else {
        const diff = after.minSize - newAfter;
        newAfter = after.minSize;
        newBefore -= diff;
      }
    } else {
      this._collapseOvershoot.delete(after);
    }

    if (before.maxSize < 100 && newBefore > before.maxSize) {
      const diff = newBefore - before.maxSize;
      newBefore = before.maxSize;
      newAfter += diff;
    }
    if (after.maxSize < 100 && newAfter > after.maxSize) {
      const diff = newAfter - after.maxSize;
      newAfter = after.maxSize;
      newBefore += diff;
    }

    // Final clamp
    newBefore = Math.max(0, Math.min(100, newBefore));
    newAfter = Math.max(0, Math.min(100, newAfter));

    before.size = newBefore;
    after.size = newAfter;
    before._applySize();
    after._applySize();
    this._syncAriaOnHandles();

    this._fireChange();
  }

  /** @internal – keyboard step resize */
  _handleKeyResize(handle: UiResizableHandle, direction: number) {
    const step =
      getComputedStyle(this).getPropertyValue('--ui-resizable-step').trim();
    const stepPct = step ? parseFloat(step) : 5;
    this._handleResize(handle, direction * ((this.orientation === 'horizontal'
      ? this.getBoundingClientRect().width
      : this.getBoundingClientRect().height) * stepPct / 100));
  }

  private _fireChange() {
    this.dispatchEvent(
      new CustomEvent('ui-resizable-change', {
        bubbles: true,
        composed: true,
        detail: { layout: this.getLayout() },
      }),
    );
  }

  /* ---- lifecycle ---- */

  override updated(changed: PropertyValues) {
    if (changed.has('orientation') || changed.has('dir')) {
      this._syncChildren();
    }
  }

  override render() {
    return html`<slot @slotchange=${() => this._collectChildren()}></slot>`;
  }
}

/* ------------------------------------------------------------------ */
/*  ui-resizable-panel                                                */
/* ------------------------------------------------------------------ */

@customElement('ui-resizable-panel')
export class UiResizablePanel extends LitElement {
  static override styles = css`
    :host {
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      flex-grow: 0;
      min-width: 0;
      min-height: 0;
    }
  `;

  /** Current size as percentage (0–100). */
  @property({ type: Number }) size = 0;

  /** Default size — applied once on first update. */
  @property({ type: Number, attribute: 'default-size' }) defaultSize = 0;

  /** Minimum size percentage (0–100). */
  @property({ type: Number, attribute: 'min-size' }) minSize = 0;

  /** Maximum size percentage (0–100). */
  @property({ type: Number, attribute: 'max-size' }) maxSize = 100;

  /** Whether the panel can collapse to zero size via drag. */
  @property({ type: Boolean }) collapsible = false;

  /**
   * Whether the panel is currently collapsed via the programmatic API.
   * Set automatically by `collapse()` / `expand()` / `toggle()`.
   */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  /** @internal – last non-zero size, used by expand() to restore. */
  _restoreSize = 0;

  /** @internal */
  _orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** @internal */
  _hasExplicitSize = false;

  private _firstUpdate = true;

  override willUpdate(changed: PropertyValues) {
    if (this._firstUpdate) {
      this._firstUpdate = false;
      if (this.defaultSize > 0 && this.size === 0) {
        this.size = this.defaultSize;
        this._hasExplicitSize = true;
      }
    }
    if (changed.has('size')) {
      this._applySize();
    }
  }

  /** @internal */
  _applySize() {
    // Track last non-zero size for expand() restore.
    if (this.size > 0) this._restoreSize = this.size;
    // calc(size * (1% - handleTotal/100)) distributes handle space proportionally,
    // so at size=100 the panel is exactly (100% - handleTotal), leaving the handle
    // on-screen instead of being pushed past overflow:hidden.
    this.style.flexBasis =
      `calc(${this.size} * (1% - var(--_rg-handle-total, 0px) / 100))`;
  }

  override connectedCallback() {
    super.connectedCallback();
    if (this.size > 0) {
      this._hasExplicitSize = true;
      this._applySize();
    }
  }

  /* ---- programmatic collapse / expand API ---- */

  /**
   * Collapse this panel to zero size, transferring its space to the adjacent
   * sibling. Sets `collapsed = true` and stores the current size for `expand()`.
   * No-op if already collapsed.
   */
  collapse() {
    (this.closest('ui-resizable-group') as UiResizableGroup | null)?._collapsePanel(this);
  }

  /**
   * Expand this panel back to its previous size (or `defaultSize` as fallback).
   * Sets `collapsed = false`. No-op if not currently collapsed.
   */
  expand() {
    (this.closest('ui-resizable-group') as UiResizableGroup | null)?._expandPanel(this);
  }

  /**
   * Toggle between collapsed and expanded states.
   */
  toggle() {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

/* ------------------------------------------------------------------ */
/*  ui-resizable-handle                                               */
/* ------------------------------------------------------------------ */

@customElement('ui-resizable-handle')
export class UiResizableHandle extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      outline: none;
      background: var(--ui-resizable-handle-bg, var(--ui-border-color, #e4e4e7));
      border-radius: var(--ui-resizable-handle-border-radius, 0px);
      transition: background var(--ui-resizable-handle-transition, 150ms) ease;
    }
    :host(:hover) {
      background: var(--ui-resizable-handle-hover-bg, var(--ui-primary-color, #3b82f6));
    }
    :host(:focus-visible) {
      background: var(--ui-resizable-handle-focus-bg, var(--ui-primary-color, #3b82f6));
      outline: 2px solid var(--ui-resizable-handle-focus-bg, var(--ui-primary-color, #3b82f6));
      outline-offset: 1px;
    }
    :host([orientation='horizontal']) {
      width: var(--ui-resizable-handle-size, 4px);
      cursor: col-resize;
      touch-action: none;
    }
    :host([orientation='vertical']) {
      height: var(--ui-resizable-handle-size, 4px);
      cursor: row-resize;
      touch-action: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: var(--ui-resizable-handle-disabled-opacity, 0.5);
    }

    .grip {
      display: none;
      border-radius: var(--ui-border-radius-sm, 2px);
      background: var(--ui-resizable-grip-bg, var(--ui-background, #fff));
      z-index: 1;
    }
    :host([with-handle]) .grip {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host([orientation='horizontal'][with-handle]) .grip {
      width: var(--ui-resizable-grip-width, 12px);
      height: var(--ui-resizable-grip-height, 24px);
    }
    :host([orientation='vertical'][with-handle]) .grip {
      width: var(--ui-resizable-grip-height, 24px);
      height: var(--ui-resizable-grip-width, 12px);
    }
    :host([orientation='horizontal'][with-handle]) {
      width: var(--ui-resizable-handle-active-size, 12px);
    }
    :host([orientation='vertical'][with-handle]) {
      height: var(--ui-resizable-handle-active-size, 12px);
    }

    .grip-dots {
      display: flex;
      gap: var(--ui-resizable-grip-dot-gap, 1px);
    }
    :host([orientation='horizontal']) .grip-dots {
      flex-direction: column;
    }
    :host([orientation='vertical']) .grip-dots {
      flex-direction: row;
    }
    .grip-dot {
      width: var(--ui-resizable-grip-dot-size, 2px);
      height: var(--ui-resizable-grip-dot-size, 2px);
      border-radius: 50%;
      background: var(--ui-resizable-grip-dot-color, var(--ui-text-color-muted, #71717a));
    }
  `;

  /** Show a visible drag grip. */
  @property({ type: Boolean, reflect: true, attribute: 'with-handle' }) withHandle = false;

  /** Disable interaction. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** @internal – set by parent group, reflects to attribute for CSS. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** @internal */
  _dir: 'ltr' | 'rtl' = 'ltr';

  private _dragging = false;
  private _startPos = 0;

  /* ---- pointer handling ---- */

  private _onPointerDown = (e: PointerEvent) => {
    if (this.disabled || e.button !== 0) return;
    e.preventDefault();
    this._dragging = true;
    this._startPos = this.orientation === 'horizontal' ? e.clientX : e.clientY;
    this.setPointerCapture(e.pointerId);
    (this.closest('ui-resizable-group') as UiResizableGroup | null)?._startDrag();
  };

  private _onPointerMove = (e: PointerEvent) => {
    if (!this._dragging) return;
    // Safety: if no buttons are pressed, the drag ended without a proper pointerup
    if (e.buttons === 0) {
      this._dragging = false;
      return;
    }
    const current = this.orientation === 'horizontal' ? e.clientX : e.clientY;
    const delta = current - this._startPos;
    this._startPos = current;
    const group = this.closest('ui-resizable-group') as UiResizableGroup | null;
    group?._handleResize(this, delta);
  };

  private _onPointerUp = (e: PointerEvent) => {
    if (!this._dragging) return;
    this._dragging = false;
    this.releasePointerCapture(e.pointerId);
    (this.closest('ui-resizable-group') as UiResizableGroup | null)?._endDrag();
  };

  private _onPointerCancel = (e: PointerEvent) => {
    if (!this._dragging) return;
    this._dragging = false;
    this.releasePointerCapture(e.pointerId);
    (this.closest('ui-resizable-group') as UiResizableGroup | null)?._endDrag();
  };

  private _onLostPointerCapture = () => {
    this._dragging = false;
    (this.closest('ui-resizable-group') as UiResizableGroup | null)?._endDrag();
  };

  /* ---- keyboard handling ---- */

  private _onKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    const group = this.closest('ui-resizable-group') as UiResizableGroup | null;
    if (!group) return;

    let direction = 0;
    if (this.orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') direction = -1;
      else if (e.key === 'ArrowRight') direction = 1;
    } else {
      if (e.key === 'ArrowUp') direction = -1;
      else if (e.key === 'ArrowDown') direction = 1;
    }
    if (e.key === 'Home') direction = -100;
    else if (e.key === 'End') direction = 100;

    if (direction !== 0) {
      e.preventDefault();
      group._handleKeyResize(this, direction);
    }
  };

  /* ---- lifecycle ---- */

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
    this.setAttribute('tabindex', '0');
    this.addEventListener('pointerdown', this._onPointerDown);
    this.addEventListener('pointermove', this._onPointerMove);
    this.addEventListener('pointerup', this._onPointerUp);
    this.addEventListener('pointercancel', this._onPointerCancel);
    this.addEventListener('lostpointercapture', this._onLostPointerCapture);
    this.addEventListener('keydown', this._onKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerdown', this._onPointerDown);
    this.removeEventListener('pointermove', this._onPointerMove);
    this.removeEventListener('pointerup', this._onPointerUp);
    this.removeEventListener('pointercancel', this._onPointerCancel);
    this.removeEventListener('lostpointercapture', this._onLostPointerCapture);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  override render() {
    return html`<div class="grip"><div class="grip-dots">${this._renderDots()}</div></div>`;
  }

  private _renderDots() {
    const count = 5;
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(html`<div class="grip-dot"></div>`);
    }
    return dots;
  }
}

/* ------------------------------------------------------------------ */
/*  Type declarations                                                 */
/* ------------------------------------------------------------------ */

declare global {
  interface HTMLElementTagNameMap {
    'ui-resizable-group': UiResizableGroup;
    'ui-resizable-panel': UiResizablePanel;
    'ui-resizable-handle': UiResizableHandle;
  }
}
