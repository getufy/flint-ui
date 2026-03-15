import { litPlugin } from '@custom-elements-manifest/analyzer/src/features/framework-plugins/lit/lit.js';

export default {
  globs: ['src/**/flint-*.component.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts', '**/*.css.ts', '**/*.styles.ts'],
  outdir: 'dist',
  litelement: true,
  plugins: [...litPlugin()],
};
