import type { ReactiveController, ReactiveControllerHost } from 'lit';
import en from '../translations/en.js';

/**
 * SSR-safe browser detection. Cannot use Lit's `isServer` here because
 * it resolves to `true` in all Node processes (including jsdom test envs).
 */
const isBrowser = typeof document !== 'undefined' && typeof document.documentElement !== 'undefined';

export interface Translation {
  $code: string;   // BCP 47 language code, e.g. 'en', 'es', 'fr'
  $name: string;   // Human-readable name, e.g. 'English', 'Espanol'
  $dir: 'ltr' | 'rtl';

  // Component strings — simple strings or functions for interpolation
  close: string;
  copy: string;
  loading: string;
  noOptions: string;
  selectOption: string;
  search: string;
  clear: string;
  required: string;
  optional: string;

  // Functions for dynamic strings
  numOptionsSelected: (count: number) => string;
  currentPage: (page: number, total: number) => string;
  goToSlide: (slide: number, count: number) => string;

  // Date/time related
  previousMonth: string;
  nextMonth: string;
  today: string;

  // Dialog
  closeDialog: string;

  // Command
  noResults: string;
  searchPlaceholder: string;

  // Carousel
  previousSlide: string;
  nextSlide: string;

  // Pagination
  firstPage: string;
  lastPage: string;
  previousPage: string;
  nextPage: string;
  pageLabel: (page: number) => string;

  // Actions
  cancel: string;
  ok: string;

  // Command menu
  typeCommandOrSearch: string;
  searchCommands: string;
  noResultsFound: string;
  commandMenu: string;
  commandResults: string;

  // Date picker
  selectDate: string;
  selectDateRange: string;
  openDatePicker: string;
}

// Module-level translation registry
const translations = new Map<string, Translation>();

// Connectable hosts that need re-rendering when language changes
const connectedHosts = new Set<ReactiveControllerHost>();

// Shared MutationObserver watching <html lang> changes
let observer: MutationObserver | null = null;

function startObserving() {
  if (observer) return;
  observer = new MutationObserver(() => {
    // Language changed on <html> — request update on all connected hosts
    for (const host of connectedHosts) {
      host.requestUpdate();
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
}

function stopObserving() {
  if (connectedHosts.size > 0) return;
  observer?.disconnect();
  observer = null;
}

/**
 * Register a translation. Call at module load time.
 * Non-English translations can be `Partial<Translation>` — missing keys
 * fall back to English automatically during lookup.
 */
export function registerTranslation(...args: Translation[]): void {
  for (const t of args) {
    translations.set(t.$code.toLowerCase(), t);
  }
}

// English is always available as the default fallback
registerTranslation(en);

/**
 * Resolves the effective locale from a component's `lang` attribute,
 * falling back through `document.documentElement.lang` and `navigator.language`.
 * SSR-safe: returns `lang` or `'en'` on the server.
 */
export function resolveLocale(lang: string): string {
    if (lang) return lang;
    if (!isBrowser) return 'en';
    return document.documentElement.lang || navigator.language || 'en';
}

/**
 * Resolve a language code to a Translation, walking up the hierarchy.
 * e.g. 'es-PE' → 'es' → 'en'
 */
function resolveTranslation(lang: string): Translation | undefined {
  const code = lang.toLowerCase();
  // Exact match
  if (translations.has(code)) return translations.get(code)!;
  // Try base language (e.g. 'es-PE' → 'es')
  const base = code.split('-')[0]!;
  if (base !== code && translations.has(base)) return translations.get(base)!;
  return undefined;
}

/**
 * Reactive controller that provides string localization for Lit components.
 *
 * Usage:
 * ```ts
 * private _localize = new LocalizeController(this);
 * // in render():
 * this._localize.term('close')            // → 'Close'
 * this._localize.term('currentPage', 1, 5) // → 'Page 1 of 5'
 * ```
 */
export class LocalizeController implements ReactiveController {
  host: ReactiveControllerHost & HTMLElement;

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    connectedHosts.add(this.host);
    startObserving();
  }

  hostDisconnected(): void {
    connectedHosts.delete(this.host);
    stopObserving();
  }

  /**
   * Resolve the current language code using the standard fallback chain:
   * 1. `lang` attribute on the host element
   * 2. Closest ancestor with `lang` attribute
   * 3. `document.documentElement.lang`
   * 4. `navigator.language`
   * 5. `'en'`
   */
  lang(): string {
    // Check the host element's own lang
    if (this.host.lang) return this.host.lang;
    // SSR: no DOM tree to walk, fall back to 'en'
    if (!isBrowser) return 'en';
    // Walk ancestors
    const closest = this.host.closest<HTMLElement>('[lang]');
    if (closest?.lang) return closest.lang;
    // Document-level
    if (document.documentElement.lang) return document.documentElement.lang;
    // Browser language
    if (typeof navigator !== 'undefined' && navigator.language) return navigator.language;
    return 'en';
  }

  /** Get text direction for the current language. */
  dir(): 'ltr' | 'rtl' {
    const translation = resolveTranslation(this.lang());
    return translation?.$dir ?? 'ltr';
  }

  /**
   * Get a translated term. For function-valued translations,
   * pass the arguments after the key.
   */
  term<K extends keyof Translation>(
    key: K,
    ...args: Translation[K] extends (...a: infer A) => string ? A : []
  ): string {
    const lang = this.lang();
    const translation = resolveTranslation(lang);
    const fallback = translations.get('en');

    // Try resolved translation first, then fall back to English
    const value = translation?.[key] ?? fallback?.[key];

    if (typeof value === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (value as (...a: any[]) => string)(...args);
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }
}
