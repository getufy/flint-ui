import { execSync } from 'node:child_process';
import { rmSync, readdirSync } from 'node:fs';
import esbuild from 'esbuild';

// Clean
rmSync('dist', { recursive: true, force: true });

// Discover all entry points: index.ts + per-component barrels (button.ts, card.ts, etc.)
const entryPoints = readdirSync('src')
  .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'))
  .map(f => `src/${f}`);

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
