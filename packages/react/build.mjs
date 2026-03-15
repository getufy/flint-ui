import { execSync } from 'node:child_process';
import { rmSync, readdirSync } from 'node:fs';
import esbuild from 'esbuild';

// Clean
rmSync('dist', { recursive: true, force: true });

// Discover all entry points: index.ts + per-component barrels (button.ts, card.ts, etc.)
const barrelEntryPoints = readdirSync('src')
  .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'))
  .map(f => `src/${f}`);

// Also include individual component/event files so dist/components/*.js and dist/events/*.js
// exist alongside their .d.ts counterparts (required for TypeScript type resolution).
const componentEntryPoints = readdirSync('src/components')
  .filter(f => f.endsWith('.tsx'))
  .map(f => `src/components/${f}`);

const eventEntryPoints = readdirSync('src/events')
  .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'))
  .map(f => `src/events/${f}`);

const entryPoints = [...barrelEntryPoints, ...componentEntryPoints, ...eventEntryPoints];

// Bundle JS — multiple entry points, externalize all deps
await esbuild.build({
  entryPoints,
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  external: ['react', 'react-dom', '@lit/react', '@getufy/flint-ui'],
});

// Emit declarations only
execSync('tsc -p tsconfig.json', { stdio: 'inherit' });
