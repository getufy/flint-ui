import { LitElement, css } from 'lit';
import type { CSSResultGroup, CSSResultOrNative } from 'lit';

/** Shared styles injected into every FlintElement shadow root. */
const sharedStyles = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export class FlintElement extends LitElement {
  static dependencies: Record<string, typeof FlintElement> = {};
  private static _themeChecked = false;

  /** Appends shared styles (e.g. reduced-motion) to every subclass. */
  protected static finalizeStyles(styles?: CSSResultGroup): CSSResultOrNative[] {
    return [...super.finalizeStyles(styles), sharedStyles];
  }

  /** ElementInternals instance — used for form association and ARIA. */
  _internals: ElementInternals | null = null;

  static define(
    name: string,
    elementClass: typeof FlintElement = this as unknown as typeof FlintElement,
    options?: ElementDefinitionOptions
  ) {
    if (typeof customElements === 'undefined') return;
    const currentlyRegisteredClass = customElements.get(name);
    if (!currentlyRegisteredClass) {
      try {
        customElements.define(name, elementClass, options);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'NotSupportedError') {
          console.warn(`[flint-ui] "${name}" is already registered. Skipping.`);
        } else {
          throw err;
        }
      }
    }
  }

  /** Dispatch a CustomEvent with `bubbles` and `composed` true by default. */
  emit(name: string, detail?: unknown): boolean {
    return this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
    // Auto-register dependencies
    const ctor = this.constructor as typeof FlintElement;
    for (const [name, depClass] of Object.entries(ctor.dependencies)) {
      (ctor as typeof FlintElement).define(name, depClass);
    }
    // Dev-mode: warn once if theme CSS is not loaded
    if (import.meta.env?.DEV && typeof window !== 'undefined' && !FlintElement._themeChecked) {
      FlintElement._themeChecked = true;
      requestAnimationFrame(() => {
        const val = getComputedStyle(document.documentElement).getPropertyValue('--flint-primary-color');
        if (!val?.trim()) {
          console.warn(
            '[flint-ui] Theme CSS variables not detected. ' +
            'Import "@getufy/flint-ui/theme.css" (and "@getufy/flint-ui/theme-dark.css" for dark mode) in your entry file.'
          );
        }
      });
    }
  }
}
