import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { registerIconResolver, clearIconCache, sanitizeSvg } from './flint-icon.component.js';
import './flint-icon.js';
import type { FlintIcon } from './flint-icon.js';

/* ── Helpers ────────────────────────────────────────────────────────────────── */

const SIMPLE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>';
const CIRCLE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>';

function mockFetchSuccess(svgContent: string) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(svgContent, { status: 200, headers: { 'Content-Type': 'image/svg+xml' } })
  );
}

function mockFetchFailure(status = 404) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response('Not Found', { status })
  );
}

function mockFetchNetworkError() {
  return vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Network error'));
}

/* ── Setup / Teardown ───────────────────────────────────────────────────────── */

beforeEach(() => {
  clearIconCache();
  // Reset resolver to null between tests
  registerIconResolver(null);
});

afterEach(() => {
  vi.restoreAllMocks();
});

/* ── Tests ──────────────────────────────────────────────────────────────────── */

describe('FlintIcon', () => {
  // ── Construction ─────────────────────────────────────────────────────────

  it('is defined', () => {
    const el = document.createElement('flint-icon');
    expect(el).toBeInstanceOf(HTMLElement);
  });

  // ── Default properties ────────────────────────────────────────────────────

  it('renders with default property values', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    expect(el.name).toBe('');
    expect(el.src).toBe('');
    expect(el.size).toBe('md');
    expect(el.label).toBe('');
  });

  it('reflects name and size to attributes', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon name="home" size="lg"></flint-icon>`);
    expect(el.getAttribute('name')).toBe('home');
    expect(el.getAttribute('size')).toBe('lg');
  });

  // ── Size variants ─────────────────────────────────────────────────────────

  it('sets --flint-icon-size to 16px for sm', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon size="sm"></flint-icon>`);
    expect(el.style.getPropertyValue('--flint-icon-size')).toBe('16px');
  });

  it('sets --flint-icon-size to 24px for md', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon size="md"></flint-icon>`);
    expect(el.style.getPropertyValue('--flint-icon-size')).toBe('24px');
  });

  it('sets --flint-icon-size to 32px for lg', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon size="lg"></flint-icon>`);
    expect(el.style.getPropertyValue('--flint-icon-size')).toBe('32px');
  });

  it('falls back to md size for unknown size value', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (el as any).size = 'xl';
    await el.updateComplete;
    expect(el.style.getPropertyValue('--flint-icon-size')).toBe('24px');
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  it('renders aria-hidden="true" when no label', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    const base = el.shadowRoot!.querySelector('.icon-base');
    expect(base!.getAttribute('aria-hidden')).toBe('true');
    expect(base!.hasAttribute('role')).toBe(false);
  });

  it('renders role="img" and aria-label when label is set', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon label="Home icon"></flint-icon>`);
    const base = el.shadowRoot!.querySelector('.icon-base');
    expect(base!.getAttribute('role')).toBe('img');
    expect(base!.getAttribute('aria-label')).toBe('Home icon');
    expect(base!.hasAttribute('aria-hidden')).toBe(false);
  });

  // ── CSS parts ─────────────────────────────────────────────────────────────

  it('exposes base and svg CSS parts', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    const base = el.shadowRoot!.querySelector('[part="base"]');
    const svg = el.shadowRoot!.querySelector('[part="svg"]');
    expect(base).not.toBeNull();
    expect(svg).not.toBeNull();
  });

  // ── Loading via src ───────────────────────────────────────────────────────

  it('fetches and renders SVG from src', async () => {
    const fetchMock = mockFetchSuccess(SIMPLE_SVG);
    const el = await fixture<FlintIcon>(html`<flint-icon src="/icons/home.svg"></flint-icon>`);
    // Wait for the async _loadIcon to complete (fetch + sanitize + re-render)
    await new Promise(r => setTimeout(r, 50));
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;

    expect(fetchMock).toHaveBeenCalledOnce();
    // After fetch, _svgContent should contain the sanitized SVG
    expect((el as unknown as { _svgContent: string })._svgContent).toContain('path');
  });

  it('fires flint-load event on successful load from src', async () => {
    mockFetchSuccess(SIMPLE_SVG);
    const handler = vi.fn();
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    el.addEventListener('flint-load', handler);
    el.src = '/icons/home.svg';
    await el.updateComplete;
    // Wait for async fetch
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;
    expect(handler).toHaveBeenCalled();
  });

  it('fires flint-error event on fetch failure', async () => {
    mockFetchFailure(404);
    const handler = vi.fn();
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    el.addEventListener('flint-error', handler);
    el.src = '/icons/missing.svg';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;
    expect(handler).toHaveBeenCalled();
  });

  it('fires flint-error on network error', async () => {
    mockFetchNetworkError();
    const handler = vi.fn();
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    el.addEventListener('flint-error', handler);
    el.src = '/icons/fail.svg';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;
    expect(handler).toHaveBeenCalled();
  });

  // ── Loading via resolver ──────────────────────────────────────────────────

  it('uses registered resolver to map name to URL', async () => {
    const fetchMock = mockFetchSuccess(CIRCLE_SVG);
    registerIconResolver((name) => `/icons/${name}.svg`);

    const el = await fixture<FlintIcon>(html`<flint-icon name="circle"></flint-icon>`);
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;

    expect(fetchMock).toHaveBeenCalledWith(
      '/icons/circle.svg',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    const container = el.shadowRoot!.querySelector('.icon-container');
    expect(container!.querySelector('svg')).not.toBeNull();
  });

  it('supports async resolvers', async () => {
    mockFetchSuccess(CIRCLE_SVG);
    registerIconResolver(async (name) => {
      return `/async-icons/${name}.svg`;
    });

    const el = await fixture<FlintIcon>(html`<flint-icon name="circle"></flint-icon>`);
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/async-icons/circle.svg',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it('fires flint-error when async resolver throws', async () => {
    registerIconResolver(async () => {
      throw new Error('resolver failed');
    });
    const handler = vi.fn();
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    el.addEventListener('flint-error', handler);
    el.name = 'broken';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;
    expect(handler).toHaveBeenCalled();
  });

  it('does not fetch when no resolver and name is set without src', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const el = await fixture<FlintIcon>(html`<flint-icon name="home"></flint-icon>`);
    await el.updateComplete;
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('src overrides resolver', async () => {
    const fetchMock = mockFetchSuccess(SIMPLE_SVG);
    registerIconResolver((name) => `/resolver/${name}.svg`);

    const el = await fixture<FlintIcon>(html`<flint-icon name="home" src="/direct/icon.svg"></flint-icon>`);
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;

    expect(fetchMock).toHaveBeenCalledWith(
      '/direct/icon.svg',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  // ── Sprite sheet ──────────────────────────────────────────────────────────

  it('renders <use> element for sprite sheet references', async () => {
    registerIconResolver((name) => `#icon-${name}`);
    const el = await fixture<FlintIcon>(html`<flint-icon name="home"></flint-icon>`);
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;

    const container = el.shadowRoot!.querySelector('.icon-container');
    const useEl = container!.querySelector('use');
    expect(useEl).not.toBeNull();
    expect(useEl!.getAttribute('href')).toBe('#icon-home');
  });

  it('fires flint-load for sprite sheet references', async () => {
    registerIconResolver((name) => `#icon-${name}`);
    const handler = vi.fn();
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    el.addEventListener('flint-load', handler);
    el.name = 'star';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el.updateComplete;
    expect(handler).toHaveBeenCalled();
  });

  // ── Caching ───────────────────────────────────────────────────────────────

  it('caches fetched SVGs — second request uses cache', async () => {
    const fetchMock = mockFetchSuccess(SIMPLE_SVG);
    registerIconResolver((name) => `/icons/${name}.svg`);

    const el1 = await fixture<FlintIcon>(html`<flint-icon name="home"></flint-icon>`);
    await el1.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el1.updateComplete;

    expect(fetchMock).toHaveBeenCalledOnce();

    // Second icon with same name should use cache
    const el2 = await fixture<FlintIcon>(html`<flint-icon name="home"></flint-icon>`);
    await el2.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    await el2.updateComplete;

    expect(fetchMock).toHaveBeenCalledOnce(); // still just 1 call
    const container = el2.shadowRoot!.querySelector('.icon-container');
    expect(container!.querySelector('svg')).not.toBeNull();
  });

  it('clearIconCache() forces re-fetch', async () => {
    const fetchMock = mockFetchSuccess(SIMPLE_SVG);
    registerIconResolver((name) => `/icons/${name}.svg`);

    const el1 = await fixture<FlintIcon>(html`<flint-icon name="home"></flint-icon>`);
    await el1.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    expect(fetchMock).toHaveBeenCalledOnce();

    clearIconCache();

    const el2 = await fixture<FlintIcon>(html`<flint-icon name="home"></flint-icon>`);
    await el2.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  // ── Dynamic property changes ──────────────────────────────────────────────

  it('re-fetches when name changes', async () => {
    const fetchMock = mockFetchSuccess(CIRCLE_SVG);
    registerIconResolver((name) => `/icons/${name}.svg`);

    const el = await fixture<FlintIcon>(html`<flint-icon name="home"></flint-icon>`);
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    expect(fetchMock).toHaveBeenCalledOnce();

    clearIconCache();
    el.name = 'star';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('re-fetches when src changes', async () => {
    const fetchMock = mockFetchSuccess(SIMPLE_SVG);

    const el = await fixture<FlintIcon>(html`<flint-icon src="/icons/a.svg"></flint-icon>`);
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    expect(fetchMock).toHaveBeenCalledOnce();

    clearIconCache();
    el.src = '/icons/b.svg';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 10));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  // ── Shadow DOM structure ──────────────────────────────────────────────────

  it('renders empty container when no icon is loaded', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    const container = el.shadowRoot!.querySelector('.icon-container');
    expect(container).not.toBeNull();
    expect(container!.querySelector('svg')).toBeNull();
  });

  it('has base wrapper with icon-base class', async () => {
    const el = await fixture<FlintIcon>(html`<flint-icon></flint-icon>`);
    const base = el.shadowRoot!.querySelector('.icon-base');
    expect(base).not.toBeNull();
  });
});

/* ── sanitizeSvg unit tests ────────────────────────────────────────────────── */

describe('sanitizeSvg', () => {
  it('returns valid SVG unchanged', () => {
    const result = sanitizeSvg(SIMPLE_SVG);
    expect(result).toContain('<svg');
    expect(result).toContain('<path');
  });

  it('returns empty string for non-SVG content', () => {
    expect(sanitizeSvg('<div>hello</div>')).toBe('');
    expect(sanitizeSvg('plain text')).toBe('');
    expect(sanitizeSvg('')).toBe('');
  });

  it('strips <script> elements', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg"><script>alert("xss")</script><circle cx="12" cy="12" r="10"></circle></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).toContain('<svg');
    expect(result).toContain('<circle');
    expect(result).not.toContain('<script');
    expect(result).not.toContain('alert');
  });

  it('strips onclick and other on* event handlers', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg"><circle onclick="alert(1)" onmouseover="evil()" cx="12" cy="12" r="10"></circle></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).toContain('<circle');
    expect(result).not.toContain('onclick');
    expect(result).not.toContain('onmouseover');
    expect(result).not.toContain('alert');
    expect(result).not.toContain('evil');
  });

  it('strips on* attributes from root <svg> element', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><rect width="10" height="10"></rect></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).toContain('<svg');
    expect(result).not.toContain('onload');
  });

  it('strips <iframe> elements', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><iframe src="evil.html"></iframe></foreignObject><rect width="10" height="10"></rect></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).not.toContain('<iframe');
  });

  it('strips <object> elements', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg"><object data="evil.swf"></object><rect width="10" height="10"></rect></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).not.toContain('<object');
  });

  it('strips <embed> elements', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg"><embed src="evil.swf"></embed><rect width="10" height="10"></rect></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).not.toContain('<embed');
  });

  it('strips <form> and form input elements', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><form action="evil"><input type="text"></input><button>Submit</button></form></foreignObject></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).not.toContain('<form');
    expect(result).not.toContain('<input');
    expect(result).not.toContain('<button');
  });

  it('preserves legitimate SVG attributes', () => {
    const clean = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14" stroke-width="2"></path></svg>';
    const result = sanitizeSvg(clean);
    expect(result).toContain('viewBox');
    expect(result).toContain('fill="none"');
    expect(result).toContain('stroke="currentColor"');
    expect(result).toContain('stroke-width');
  });

  it('handles multiple dangerous elements at once', () => {
    const dirty = '<svg xmlns="http://www.w3.org/2000/svg"><script>a</script><circle onclick="b" cx="12" cy="12" r="10"></circle><script>c</script></svg>';
    const result = sanitizeSvg(dirty);
    expect(result).toContain('<circle');
    expect(result).not.toContain('<script');
    expect(result).not.toContain('onclick');
  });
});
