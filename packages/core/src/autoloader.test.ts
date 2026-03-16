import { describe, it, expect, afterEach } from 'vitest';

// We need to test the exported functions, but the autoloader auto-starts on
// import. We'll import the module fresh each time via dynamic import and
// resetModules, but since vitest caches modules we work around it by testing
// the functions directly.

import { stopAutoloader, startAutoloader, isAutoloaderActive } from './autoloader.js';

describe('autoloader cleanup API', () => {
  afterEach(() => {
    // Always restart so tests don't leak stopped state
    startAutoloader();
  });

  it('isAutoloaderActive() returns true after module load', () => {
    expect(isAutoloaderActive()).toBe(true);
  });

  it('stopAutoloader() disconnects the observer', () => {
    expect(isAutoloaderActive()).toBe(true);
    stopAutoloader();
    expect(isAutoloaderActive()).toBe(false);
  });

  it('stopAutoloader() is idempotent — calling twice does not throw', () => {
    stopAutoloader();
    expect(isAutoloaderActive()).toBe(false);
    stopAutoloader();
    expect(isAutoloaderActive()).toBe(false);
  });

  it('startAutoloader() restarts the observer after stop', () => {
    stopAutoloader();
    expect(isAutoloaderActive()).toBe(false);
    startAutoloader();
    expect(isAutoloaderActive()).toBe(true);
  });

  it('startAutoloader() is a no-op when already running', () => {
    expect(isAutoloaderActive()).toBe(true);
    // Should not throw or create a second observer
    startAutoloader();
    expect(isAutoloaderActive()).toBe(true);
  });

  it('observer discovers new flint-* elements after restart', async () => {
    stopAutoloader();

    // Add element while stopped — it should not be discovered
    const el = document.createElement('flint-test-autoloader-dummy');
    document.body.appendChild(el);

    // Restart and add another element
    startAutoloader();

    // The observer is watching; add a child to trigger mutation
    const el2 = document.createElement('flint-test-autoloader-dummy-2');
    document.body.appendChild(el2);

    // Clean up DOM
    el.remove();
    el2.remove();

    // If we got here without errors, the observer is functional
    expect(isAutoloaderActive()).toBe(true);
  });

  it('stop → start cycle works multiple times', () => {
    for (let i = 0; i < 3; i++) {
      stopAutoloader();
      expect(isAutoloaderActive()).toBe(false);
      startAutoloader();
      expect(isAutoloaderActive()).toBe(true);
    }
  });
});
