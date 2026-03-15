import { litPlugin } from '@custom-elements-manifest/analyzer/src/features/framework-plugins/lit/lit.js';
import fs from 'node:fs';
import path from 'node:path';

/**
 * CEM plugin: resolve tag names from registration files.
 *
 * Component `.component.ts` files contain pure classes (no @customElement).
 * Tag names are defined in the sibling `.ts` registration file via either:
 *   - `ClassName.define('flint-tag-name')`
 *   - `@customElement('flint-tag-name')`
 *
 * This plugin reads those registration files after analysis and adds
 * `tagName` + `customElement: true` to matching CEM declarations.
 */
function tagNameResolverPlugin() {
  return {
    name: 'tag-name-resolver',
    packageLinkPhase({ customElementsManifest }) {
      for (const mod of customElementsManifest.modules) {
        // mod.path is e.g. "src/accordion/flint-accordion.component.ts"
        const regPath = mod.path.replace('.component.ts', '.ts');
        const absPath = path.resolve(regPath);

        if (!fs.existsSync(absPath)) continue;

        const content = fs.readFileSync(absPath, 'utf-8');

        for (const decl of mod.declarations || []) {
          if (decl.kind !== 'class') continue;

          // Pattern 1: ClassName.define('flint-tag-name')
          const defineRe = new RegExp(`${decl.name}\\.define\\(['"]([^'"]+)['"]\\)`);
          const defineMatch = content.match(defineRe);
          if (defineMatch) {
            decl.tagName = defineMatch[1];
            decl.customElement = true;
            continue;
          }

          // Pattern 2: @customElement('flint-tag-name') before class ClassName
          const decoratorRe = new RegExp(`@customElement\\(['"]([^'"]+)['"]\\)[\\s\\S]*?class\\s+${decl.name}\\b`);
          const decoratorMatch = content.match(decoratorRe);
          if (decoratorMatch) {
            decl.tagName = decoratorMatch[1];
            decl.customElement = true;
          }
        }
      }
    },
  };
}

export default {
  globs: ['src/**/flint-*.component.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts', '**/*.css.ts', '**/*.styles.ts'],
  outdir: 'dist',
  litelement: true,
  plugins: [...litPlugin(), tagNameResolverPlugin()],
};
