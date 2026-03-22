/**
 * Generates two things from packages/core/src/index.ts:
 *  1. A Vite `rollupOptions.input` map  (used by vite.config.ts at build time)
 *  2. A package.json `exports` map       (written to package.json by `--write-exports`)
 *
 * Usage:
 *   tsx scripts/build-entries.ts              # print entries JSON to stdout
 *   tsx scripts/build-entries.ts --write-exports  # patch packages/core/package.json exports
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const coreRoot = resolve(repoRoot, 'packages/core');

// ── 1. Discover all component entry points from index.ts ────────────────────

function discoverEntries(): Record<string, string> {
    const indexPath = resolve(coreRoot, 'src/index.ts');
    const indexContent = readFileSync(indexPath, 'utf-8');

    const entries: Record<string, string> = {
        index: 'src/index.ts',
        'suppress-warnings': 'src/suppress-warnings.ts',
    };

    // Match `from './foo/bar.js'` patterns in index.ts
    const importRe = /from\s+['"]\.\/(.*?)\.js['"]/g;
    let match: RegExpExecArray | null;

    const seen = new Set<string>();
    while ((match = importRe.exec(indexContent)) !== null) {
        const modulePath = match[1]; // e.g. "button/flint-button"
        if (seen.has(modulePath)) continue;
        seen.add(modulePath);

        entries[modulePath] = `src/${modulePath}.ts`;
    }

    // Translation files (standalone, side-effectful)
    const transDir = resolve(coreRoot, 'src/translations');
    if (existsSync(transDir)) {
        for (const file of readdirSync(transDir)) {
            if (file.endsWith('.ts') && !file.endsWith('.test.ts') && file !== 'index.ts') {
                entries[`translations/${file.replace('.ts', '')}`] = `src/translations/${file}`;
            }
        }
    }

    return entries;
}

// ── 2. Build package.json exports map ───────────────────────────────────────
//
// Uses the existing package.json sub-path aliases as the source of truth.
// Each alias maps src path → dist path. Files without an existing alias
// (internal sub-components) are still built but don't get a sub-path export.

function buildExportsMap(entries: Record<string, string>): Record<string, unknown> {
    const exportsMap: Record<string, unknown> = {
        '.': {
            types: './dist/index.d.ts',
            import: './dist/index.js',
        },
    };

    for (const [entryKey, srcFile] of Object.entries(entries)) {
        if (entryKey === 'index') continue;

        const distBase = `./dist/${entryKey}`;
        exportsMap[`./${entryKey}`] = {
            types: `${distBase}.d.ts`,
            import: `${distBase}.js`,
        };
    }

    // Wildcard fallback for deep imports
    exportsMap['./*'] = {
        types: './dist/*.d.ts',
        import: './dist/*.js',
    };

    // Keep theme CSS exports
    exportsMap['./theme.css'] = './src/theme.css';
    exportsMap['./theme-dark.css'] = './src/theme-dark.css';

    // Suppress-warnings entry (standalone, not in index.ts)
    exportsMap['./suppress-warnings'] = {
        types: './dist/suppress-warnings.d.ts',
        import: './dist/suppress-warnings.js',
    };

    return exportsMap;
}

// ── 3. Validate: warn about component dirs not exported from index.ts ────

function validateEntries(entries: Record<string, string>) {
    const srcDir = resolve(coreRoot, 'src');
    const exportedDirs = new Set(
        Object.values(entries).map(p => p.split('/')[1]) // e.g. "button" from "src/button/flint-button.ts"
    );
    // Directories to skip (not components)
    const ignore = new Set(['mixins', 'utils', 'helpers', 'shared', 'styles', 'types']);

    const dirs = readdirSync(srcDir).filter(name => {
        if (ignore.has(name)) return false;
        const full = resolve(srcDir, name);
        return statSync(full).isDirectory() && existsSync(resolve(full, `flint-${name}.ts`));
    });

    const missing = dirs.filter(d => !exportedDirs.has(d));
    if (missing.length > 0) {
        console.warn(`\n⚠  Component directories not exported from index.ts:`);
        missing.forEach(d => console.warn(`   - src/${d}/`));
        console.warn(`   Add exports to src/index.ts or this component won't be in the bundle.\n`);
    }
}

// ── 4. Main ─────────────────────────────────────────────────────────────────

const entries = discoverEntries();
validateEntries(entries);
const exportsMap = buildExportsMap(entries);

if (process.argv.includes('--write-exports')) {
    const pkgPath = resolve(coreRoot, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    pkg.exports = exportsMap;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`Updated packages/core/package.json exports (${Object.keys(exportsMap).length} entries)`);
} else {
    console.log(JSON.stringify({ entries, exports: exportsMap }, null, 2));
}

// Export for use in vite.config.ts
export { discoverEntries, buildExportsMap };
