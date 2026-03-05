/**
 * generate-react-wrappers.ts
 *
 * Scans every Lit component source file in src/ and generates:
 *   react/src/components/<ClassName>.tsx  — React forwardRef wrapper
 *   react/src/events/<tagname>.ts         — Event name constants
 *   react/src/events/index.ts             — Re-exports all event constants
 *   react/src/index.ts                    — Re-exports all components + events
 *   react/src/custom-elements.d.ts        — JSX IntrinsicElements declarations
 *
 * Run with:
 *   npx tsx scripts/generate-react-wrappers.ts
 */

import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseComponentFile } from './lib/parse-lit.js';
import {
    generateEventsFile,
    generateWrapper,
    generateIndex,
    generateEventsIndex,
    generateJsxDeclarations,
} from './lib/codegen.js';
import type { ComponentMeta } from './lib/types.js';

// ─── config ──────────────────────────────────────────────────────────────────

const PROJECT_ROOT = resolve(new URL('.', import.meta.url).pathname, '..');
const SRC_DIR = join(PROJECT_ROOT, 'src');
const OUT_DIR = join(PROJECT_ROOT, 'react', 'src');
const COMPONENTS_OUT = join(OUT_DIR, 'components');
const EVENTS_OUT = join(OUT_DIR, 'events');

// Relative paths (from project root) used in generated import statements
const COMPONENTS_OUT_REL = 'react/src/components';
const EVENTS_OUT_REL = 'react/src/events';

// ─── helpers ─────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function write(filePath: string, content: string) {
    writeFileSync(filePath, content, 'utf-8');
    const rel = filePath.replace(PROJECT_ROOT + '/', '');
    console.log(`  wrote  ${rel}`);
}

/** Recursively collect all component source files (exclude test/stories). */
function collectSourceFiles(dir: string): string[] {
    const result: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            result.push(...collectSourceFiles(full));
        } else if (
            entry.isFile() &&
            entry.name.endsWith('.ts') &&
            !entry.name.endsWith('.test.ts') &&
            !entry.name.endsWith('.stories.ts') &&
            // exclude helper/non-component files that have no @customElement
            !entry.name.startsWith('date-range-helpers')
        ) {
            result.push(full);
        }
    }
    return result;
}

// ─── main ────────────────────────────────────────────────────────────────────

function main() {
    ensureDir(COMPONENTS_OUT);
    ensureDir(EVENTS_OUT);

    const sourceFiles = collectSourceFiles(SRC_DIR);
    const allComponents: ComponentMeta[] = [];

    console.log('\n--- Parsing Lit components ---');

    for (const absPath of sourceFiles) {
        const rel = absPath.replace(PROJECT_ROOT + '/', '');
        const components = parseComponentFile(absPath, rel);
        if (components.length > 0) {
            console.log(`  parsed ${rel}  →  ${components.map(c => c.className).join(', ')}`);
            allComponents.push(...components);
        }
    }

    console.log(`\n--- Generating React wrappers (${allComponents.length} components) ---`);

    // Track which tag names already have an events file written
    const writtenEventFiles = new Set<string>();

    for (const meta of allComponents) {
        // Component wrapper
        const wrapperContent = generateWrapper(meta, COMPONENTS_OUT_REL, EVENTS_OUT_REL);
        write(join(COMPONENTS_OUT, `${meta.className}.tsx`), wrapperContent);

        // Event constants (one file per tag name; skip if already written)
        if (meta.events.length > 0 && !writtenEventFiles.has(meta.tagName)) {
            const eventsContent = generateEventsFile(meta);
            write(join(EVENTS_OUT, `${meta.tagName}.ts`), eventsContent);
            writtenEventFiles.add(meta.tagName);
        }
    }

    // Barrel files
    write(join(OUT_DIR, 'index.ts'), generateIndex(allComponents));
    write(join(EVENTS_OUT, 'index.ts'), generateEventsIndex(allComponents));
    write(join(OUT_DIR, 'custom-elements.d.ts'), generateJsxDeclarations(allComponents));

    // tsconfig for the react/ output
    const tsconfig = {
        compilerOptions: {
            target: 'ES2020',
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            jsx: 'react',
            jsxFactory: 'React.createElement',
            jsxFragmentFactory: 'React.Fragment',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            declaration: true,
            outDir: '../dist-react',
        },
        include: ['src/**/*.ts', 'src/**/*.tsx'],
    };

    const tsconfigPath = join(PROJECT_ROOT, 'react', 'tsconfig.json');
    if (!existsSync(tsconfigPath)) {
        writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n', 'utf-8');
        console.log('  wrote  react/tsconfig.json');
    }

    console.log('\nDone!\n');
}

main();
