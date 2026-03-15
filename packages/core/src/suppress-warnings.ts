/**
 * Suppresses the Lit dev-mode console warning:
 *   "Lit is in dev mode. Not recommended for production!"
 *
 * Lit checks `globalThis.litIssuedWarnings` before printing each warning and
 * skips any warning key that is already in the Set. Populating the Set with
 * 'dev-mode' before any Lit module is evaluated prevents the message from
 * ever appearing.
 *
 * Usage — import this module at the very top of your application entry point,
 * before any other @getufy/flint-ui imports:
 *
 *   import '@getufy/flint-ui/suppress-warnings';
 *   import { FlintButton } from '@getufy/flint-ui';
 *
 * This module is safe to import multiple times (idempotent) and works in both
 * browser and SSR environments because it targets `globalThis` rather than
 * `window`.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).litIssuedWarnings ??= new Set();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).litIssuedWarnings.add('dev-mode');
