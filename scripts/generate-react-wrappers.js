"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var parse_lit_js_1 = require("./lib/parse-lit.js");
var codegen_js_1 = require("./lib/codegen.js");
// ─── config ──────────────────────────────────────────────────────────────────
var PROJECT_ROOT = (0, node_path_1.resolve)(new URL('.', import.meta.url).pathname, '..');
var SRC_DIR = (0, node_path_1.join)(PROJECT_ROOT, 'src');
var OUT_DIR = (0, node_path_1.join)(PROJECT_ROOT, 'react', 'src');
var COMPONENTS_OUT = (0, node_path_1.join)(OUT_DIR, 'components');
var EVENTS_OUT = (0, node_path_1.join)(OUT_DIR, 'events');
// Relative paths (from project root) used in generated import statements
var COMPONENTS_OUT_REL = 'react/src/components';
var EVENTS_OUT_REL = 'react/src/events';
// ─── helpers ─────────────────────────────────────────────────────────────────
function ensureDir(dir) {
    if (!(0, node_fs_1.existsSync)(dir))
        (0, node_fs_1.mkdirSync)(dir, { recursive: true });
}
function write(filePath, content) {
    (0, node_fs_1.writeFileSync)(filePath, content, 'utf-8');
    var rel = filePath.replace(PROJECT_ROOT + '/', '');
    console.log("  wrote  ".concat(rel));
}
/** Recursively collect all component source files (exclude test/stories). */
function collectSourceFiles(dir) {
    var result = [];
    for (var _i = 0, _a = (0, node_fs_1.readdirSync)(dir, { withFileTypes: true }); _i < _a.length; _i++) {
        var entry = _a[_i];
        var full = (0, node_path_1.join)(dir, entry.name);
        if (entry.isDirectory()) {
            result.push.apply(result, collectSourceFiles(full));
        }
        else if (entry.isFile() &&
            entry.name.endsWith('.ts') &&
            !entry.name.endsWith('.test.ts') &&
            !entry.name.endsWith('.stories.ts') &&
            // exclude helper/non-component files that have no @customElement
            !entry.name.startsWith('date-range-helpers')) {
            result.push(full);
        }
    }
    return result;
}
// ─── main ────────────────────────────────────────────────────────────────────
function main() {
    ensureDir(COMPONENTS_OUT);
    ensureDir(EVENTS_OUT);
    var sourceFiles = collectSourceFiles(SRC_DIR);
    var allComponents = [];
    console.log('\n--- Parsing Lit components ---');
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var absPath = sourceFiles_1[_i];
        var rel = absPath.replace(PROJECT_ROOT + '/', '');
        var components = (0, parse_lit_js_1.parseComponentFile)(absPath, rel);
        if (components.length > 0) {
            console.log("  parsed ".concat(rel, "  \u2192  ").concat(components.map(function (c) { return c.className; }).join(', ')));
            allComponents.push.apply(allComponents, components);
        }
    }
    console.log("\n--- Generating React wrappers (".concat(allComponents.length, " components) ---"));
    // Track which tag names already have an events file written
    var writtenEventFiles = new Set();
    for (var _a = 0, allComponents_1 = allComponents; _a < allComponents_1.length; _a++) {
        var meta = allComponents_1[_a];
        // Component wrapper
        var wrapperContent = (0, codegen_js_1.generateWrapper)(meta, COMPONENTS_OUT_REL, EVENTS_OUT_REL);
        write((0, node_path_1.join)(COMPONENTS_OUT, "".concat(meta.className, ".tsx")), wrapperContent);
        // Event constants (one file per tag name; skip if already written)
        if (meta.events.length > 0 && !writtenEventFiles.has(meta.tagName)) {
            var eventsContent = (0, codegen_js_1.generateEventsFile)(meta);
            write((0, node_path_1.join)(EVENTS_OUT, "".concat(meta.tagName, ".ts")), eventsContent);
            writtenEventFiles.add(meta.tagName);
        }
    }
    // Barrel files
    write((0, node_path_1.join)(OUT_DIR, 'index.ts'), (0, codegen_js_1.generateIndex)(allComponents));
    write((0, node_path_1.join)(EVENTS_OUT, 'index.ts'), (0, codegen_js_1.generateEventsIndex)(allComponents));
    write((0, node_path_1.join)(OUT_DIR, 'custom-elements.d.ts'), (0, codegen_js_1.generateJsxDeclarations)(allComponents));
    // tsconfig for the react/ output
    var tsconfig = {
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
    var tsconfigPath = (0, node_path_1.join)(PROJECT_ROOT, 'react', 'tsconfig.json');
    if (!(0, node_fs_1.existsSync)(tsconfigPath)) {
        (0, node_fs_1.writeFileSync)(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n', 'utf-8');
        console.log('  wrote  react/tsconfig.json');
    }
    console.log('\nDone!\n');
}
main();
