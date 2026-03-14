import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import esbuild from 'esbuild';

// Clean
rmSync('dist', { recursive: true, force: true });

// Bundle JS — single file, externalize all deps
await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  external: ['react', 'react-dom', '@lit/react', '@getufy/flint-ui'],
});

// Emit declarations only
execSync('tsc -p tsconfig.json', { stdio: 'inherit' });
