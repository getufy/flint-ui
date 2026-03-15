/**
 * generate-react-wrappers.ts
 *
 * Reads the Custom Elements Manifest (CEM) and generates:
 *   packages/react/src/components/<ClassName>.tsx  — React forwardRef wrapper
 *   packages/react/src/events/<tagname>.ts         — Event name constants
 *   packages/react/src/events/index.ts             — Re-exports all event constants
 *   packages/react/src/index.ts                    — Re-exports all components + events
 *   packages/react/src/custom-elements.d.ts        — JSX IntrinsicElements declarations
 *
 * Data source: packages/core/dist/custom-elements.json (run `npm run cem` first)
 * Event detail types are augmented via AST analysis of .component.ts files.
 *
 * Run with:
 *   npx tsx scripts/generate-react-wrappers.ts
 */

import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseCem, augmentDetailTypes } from './lib/parse-cem.js';
import {
    generateEventsFile,
    generateWrapper,
    generateIndex,
    generateEventsIndex,
    generateJsxDeclarations,
    groupByDirectory,
    generateComponentBarrel,
    generateExportsMap,
} from './lib/codegen.js';

// ─── config ──────────────────────────────────────────────────────────────────

const REPO_ROOT = resolve(new URL('.', import.meta.url).pathname, '..');
const CORE_ROOT = join(REPO_ROOT, 'packages/core');
const CEM_PATH = join(CORE_ROOT, 'dist/custom-elements.json');
const OUT_DIR = join(REPO_ROOT, 'packages/react/src');
const COMPONENTS_OUT = join(OUT_DIR, 'components');
const EVENTS_OUT = join(OUT_DIR, 'events');

// ─── helpers ─────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function write(filePath: string, content: string) {
    const rel = filePath.replace(REPO_ROOT + '/', '');
    writeFileSync(filePath, content, 'utf-8');
    console.log(`  wrote  ${rel}`);
}

// ─── main ────────────────────────────────────────────────────────────────────

function main() {
    ensureDir(COMPONENTS_OUT);
    ensureDir(EVENTS_OUT);

    console.log('\n--- Reading Custom Elements Manifest ---');
    const allComponents = parseCem({ cemPath: CEM_PATH });
    console.log(`  found ${allComponents.length} components in CEM`);

    console.log('\n--- Augmenting event detail types via AST ---');
    augmentDetailTypes(allComponents, CORE_ROOT);

    console.log(`\n--- Generating React wrappers (${allComponents.length} components) ---`);

    // Track which tag names already have an events file written
    const writtenEventFiles = new Set<string>();

    for (const meta of allComponents) {
        // Component wrapper
        const wrapperContent = generateWrapper(meta, COMPONENTS_OUT, EVENTS_OUT);
        write(join(COMPONENTS_OUT, `${meta.className}.tsx`), wrapperContent);

        // Event constants (one file per tag name; skip if already written)
        if (meta.events.length > 0 && !writtenEventFiles.has(meta.tagName)) {
            const eventsContent = generateEventsFile(meta);
            write(join(EVENTS_OUT, `${meta.tagName}.ts`), eventsContent);
            writtenEventFiles.add(meta.tagName);
        }
    }

    // Clean up stale event files (e.g. from components that no longer emit events)
    for (const f of readdirSync(EVENTS_OUT)) {
        if (f === 'index.ts' || !f.endsWith('.ts')) continue;
        const tagName = f.replace(/\.ts$/, '');
        if (!writtenEventFiles.has(tagName)) {
            unlinkSync(join(EVENTS_OUT, f));
            console.log(`  removed stale events/${f}`);
        }
    }

    // Barrel files
    write(join(OUT_DIR, 'index.ts'), generateIndex(allComponents));
    write(join(EVENTS_OUT, 'index.ts'), generateEventsIndex(allComponents));
    write(join(OUT_DIR, 'custom-elements.d.ts'), generateJsxDeclarations(allComponents));

    // Per-component barrel files for tree-shaking
    console.log('\n--- Generating per-component barrels ---');
    const groups = groupByDirectory(allComponents);
    for (const [dir, components] of groups) {
        write(join(OUT_DIR, `${dir}.ts`), generateComponentBarrel(components));
    }

    // Update package.json exports map
    console.log('\n--- Updating package.json exports ---');
    const pkgPath = join(REPO_ROOT, 'packages/react/package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    pkg.exports = generateExportsMap(allComponents);
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
    console.log('  updated packages/react/package.json exports');

    console.log('\nDone!\n');
}

main();
