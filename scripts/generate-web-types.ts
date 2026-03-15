/**
 * generate-web-types.ts
 *
 * Reads the Custom Elements Manifest and generates a web-types.json file
 * for JetBrains WebStorm/IntelliJ HTML autocompletion.
 *
 * Output: packages/core/dist/web-types.json
 *
 * Referenced via package.json "web-types" field.
 *
 * Run with:
 *   npx tsx scripts/generate-web-types.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseCem } from './lib/parse-cem.js';

const REPO_ROOT = resolve(new URL('.', import.meta.url).pathname, '..');
const CEM_PATH = join(REPO_ROOT, 'packages/core/dist/custom-elements.json');
const OUT_PATH = join(REPO_ROOT, 'packages/core/dist/web-types.json');
const PKG_PATH = join(REPO_ROOT, 'packages/core/package.json');

interface WebTypesAttribute {
    name: string;
    description?: string;
    value?: { type?: string; default?: string };
    required?: boolean;
}

interface WebTypesEvent {
    name: string;
    description?: string;
}

interface WebTypesSlot {
    name: string;
    description?: string;
}

interface WebTypesCssProp {
    name: string;
    description?: string;
}

interface WebTypesElement {
    name: string;
    description?: string;
    'doc-url'?: string;
    attributes?: WebTypesAttribute[];
    events?: WebTypesEvent[];
    slots?: WebTypesSlot[];
    'css-properties'?: WebTypesCssProp[];
}

function main() {
    const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf-8'));
    const components = parseCem({ cemPath: CEM_PATH });

    const elements: WebTypesElement[] = [];
    const seen = new Set<string>();

    for (const comp of components) {
        if (seen.has(comp.tagName)) continue;
        seen.add(comp.tagName);

        const attributes: WebTypesAttribute[] = comp.props
            .filter(p => p.attribute)
            .map(p => ({
                name: p.attribute,
                description: p.description || undefined,
                value: {
                    type: p.tsType,
                    default: p.defaultValue || undefined,
                },
            }));

        const events: WebTypesEvent[] = comp.events.map(e => ({
            name: e.domName,
            description: e.description || undefined,
        }));

        const slots: WebTypesSlot[] = comp.slots.map(s => ({
            name: s.name || '(default)',
            description: s.description || undefined,
        }));

        const cssProperties: WebTypesCssProp[] = comp.cssProperties.map(c => ({
            name: c.name,
            description: undefined,
        }));

        const el: WebTypesElement = {
            name: comp.tagName,
            description: comp.description || undefined,
        };

        if (attributes.length > 0) el.attributes = attributes;
        if (events.length > 0) el.events = events;
        if (slots.length > 0) el.slots = slots;
        if (cssProperties.length > 0) el['css-properties'] = cssProperties;

        elements.push(el);
    }

    const webTypes = {
        $schema: 'https://raw.githubusercontent.com/nicolo-ribaudo/web-types/v2/schema/web-types.json',
        framework: 'web-components',
        name: pkg.name,
        version: pkg.version,
        'js-types-syntax': 'typescript',
        'description-markup': 'markdown',
        contributions: {
            html: {
                elements,
            },
        },
    };

    writeFileSync(OUT_PATH, JSON.stringify(webTypes, null, 2) + '\n', 'utf-8');

    console.log(`Wrote web-types: ${elements.length} elements → ${OUT_PATH.replace(REPO_ROOT + '/', '')}`);
}

main();
