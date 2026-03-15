import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LocalizeController, registerTranslation } from './localize.js';
import type { Translation } from './localize.js';

// ── Test host element ────────────────────────────────────────────────────────

@customElement('test-localize-host')
class TestLocalizeHost extends LitElement {
  localize = new LocalizeController(this);

  render() {
    return html`<span>${this.localize.term('close')}</span>`;
  }
}

// ── Spanish translation for testing ──────────────────────────────────────────

const es: Translation = {
  $code: 'es',
  $name: 'Espanol',
  $dir: 'ltr',
  close: 'Cerrar',
  copy: 'Copiar',
  loading: 'Cargando',
  noOptions: 'No se encontraron opciones',
  selectOption: 'Selecciona una opcion',
  search: 'Buscar',
  clear: 'Limpiar',
  required: 'Obligatorio',
  optional: 'Opcional',
  numOptionsSelected: (count: number) => {
    if (count === 0) return 'Ninguna opcion seleccionada';
    if (count === 1) return '1 opcion seleccionada';
    return `${count} opciones seleccionadas`;
  },
  currentPage: (page: number, total: number) => `Pagina ${page} de ${total}`,
  goToSlide: (slide: number, count: number) => `Ir a diapositiva ${slide} de ${count}`,
  previousMonth: 'Mes anterior',
  nextMonth: 'Mes siguiente',
  today: 'Hoy',
  closeDialog: 'Cerrar dialogo',
  noResults: 'No se encontraron resultados',
  searchPlaceholder: 'Buscar...',
  previousSlide: 'Diapositiva anterior',
  nextSlide: 'Diapositiva siguiente',
  firstPage: 'Primera pagina',
  lastPage: 'Ultima pagina',
  previousPage: 'Pagina anterior',
  nextPage: 'Pagina siguiente',
  pageLabel: (page: number) => `Pagina ${page}`,
  cancel: 'Cancelar',
  ok: 'Aceptar',
  typeCommandOrSearch: 'Escribe un comando o busca...',
  searchCommands: 'Buscar comandos',
  noResultsFound: 'No se encontraron resultados',
  commandMenu: 'Menu de comandos',
  commandResults: 'Resultados de comandos',
  selectDate: 'Seleccionar fecha',
  selectDateRange: 'Seleccionar rango de fechas',
  openDatePicker: 'Abrir selector de fecha',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

let originalLang: string;

beforeEach(() => {
  originalLang = document.documentElement.lang;
});

afterEach(() => {
  document.documentElement.lang = originalLang;
});

// ── Tests ────────────────────────────────────────────────────────────────────

describe('LocalizeController', () => {
  describe('default English', () => {
    it('returns English strings by default', async () => {
      document.documentElement.lang = 'en';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('close')).toBe('Close');
      expect(el.localize.term('copy')).toBe('Copy');
      expect(el.localize.term('loading')).toBe('Loading');
      expect(el.localize.term('noOptions')).toBe('No options found');
      expect(el.localize.term('selectOption')).toBe('Select an option');
    });

    it('lang() returns "en" when no lang is set', async () => {
      document.documentElement.lang = '';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      // Falls back to navigator.language or 'en' — in jsdom navigator.language may be empty
      const lang = el.localize.lang();
      expect(typeof lang).toBe('string');
      // Falls back to navigator.language (e.g. 'en-US') or 'en'
      expect(lang.startsWith('en')).toBe(true);
    });

    it('dir() returns "ltr" for English', async () => {
      document.documentElement.lang = 'en';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.dir()).toBe('ltr');
    });
  });

  describe('function-valued translations', () => {
    it('numOptionsSelected handles 0, 1, and many', async () => {
      document.documentElement.lang = 'en';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('numOptionsSelected', 0)).toBe('No options selected');
      expect(el.localize.term('numOptionsSelected', 1)).toBe('1 option selected');
      expect(el.localize.term('numOptionsSelected', 5)).toBe('5 options selected');
    });

    it('currentPage formats correctly', async () => {
      document.documentElement.lang = 'en';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('currentPage', 3, 10)).toBe('Page 3 of 10');
    });

    it('goToSlide formats correctly', async () => {
      document.documentElement.lang = 'en';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('goToSlide', 2, 5)).toBe('Go to slide 2 of 5');
    });
  });

  describe('registerTranslation', () => {
    it('adds a new language', async () => {
      registerTranslation(es);
      document.documentElement.lang = 'es';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('close')).toBe('Cerrar');
      expect(el.localize.term('loading')).toBe('Cargando');
    });

    it('function translations work for registered language', async () => {
      registerTranslation(es);
      document.documentElement.lang = 'es';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('numOptionsSelected', 3)).toBe('3 opciones seleccionadas');
      expect(el.localize.term('currentPage', 2, 8)).toBe('Pagina 2 de 8');
    });
  });

  describe('language resolution', () => {
    it('component lang attribute takes priority', async () => {
      registerTranslation(es);
      document.documentElement.lang = 'en';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host lang="es"></test-localize-host>`);
      expect(el.localize.term('close')).toBe('Cerrar');
    });

    it('ancestor lang attribute is used when host has none', async () => {
      registerTranslation(es);
      document.documentElement.lang = 'en';
      const container = await fixture<HTMLDivElement>(html`
        <div lang="es">
          <test-localize-host></test-localize-host>
        </div>
      `);
      const el = container.querySelector<TestLocalizeHost>('test-localize-host')!;
      expect(el.localize.term('close')).toBe('Cerrar');
    });

    it('document lang is used when no ancestors have lang', async () => {
      registerTranslation(es);
      document.documentElement.lang = 'es';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('close')).toBe('Cerrar');
    });

    it('falls back to English for unknown language', async () => {
      document.documentElement.lang = 'xx-UNKNOWN';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('close')).toBe('Close');
    });
  });

  describe('hierarchical fallback', () => {
    it('es-PE falls back to es', async () => {
      registerTranslation(es);
      document.documentElement.lang = 'es-PE';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('close')).toBe('Cerrar');
      expect(el.localize.lang()).toBe('es-PE');
    });

    it('unknown regional variant falls back to base then English', async () => {
      // 'fr-CA' with no 'fr' registered → falls back to English
      document.documentElement.lang = 'fr-CA';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      expect(el.localize.term('close')).toBe('Close');
    });
  });

  describe('unknown keys', () => {
    it('returns empty string for non-existent key', async () => {
      document.documentElement.lang = 'en';
      const el = await fixture<TestLocalizeHost>(html`<test-localize-host></test-localize-host>`);
      // Cast to bypass type safety for testing unknown keys
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((el.localize as any).term('nonExistentKey')).toBe('');
    });
  });
});
