/**
 * generate-vscode-data.ts
 *
 * Reads the Custom Elements Manifest and generates a VS Code HTML Custom Data
 * file for autocompletion of flint-* custom elements in HTML files.
 *
 * Output: packages/core/dist/vscode.html-custom-data.json
 *
 * Usage in VS Code: add to .vscode/settings.json:
 *   "html.customData": ["./packages/core/dist/vscode.html-custom-data.json"]
 *
 * Run with:
 *   npx tsx scripts/generate-vscode-data.ts
 */
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseCem } from './lib/parse-cem.js';

const REPO_ROOT = resolve(new URL('.', import.meta.url).pathname, '..');
const CEM_PATH = join(REPO_ROOT, 'packages/core/dist/custom-elements.json');
const OUT_PATH = join(REPO_ROOT, 'packages/core/dist/vscode.html-custom-data.json');

interface VsCodeTag {
    name: string;
    description?: string;
    attributes?: VsCodeAttribute[];
    references?: Array<{ name: string; url: string }>;
}

interface VsCodeAttribute {
    name: string;
    description?: string;
    values?: Array<{ name: string }>;
}

function main() {
    const components = parseCem({ cemPath: CEM_PATH });

    const tags: VsCodeTag[] = [];
    const seen = new Set<string>();

    for (const comp of components) {
        if (seen.has(comp.tagName)) continue;
        seen.add(comp.tagName);

        const attributes: VsCodeAttribute[] = [];

        for (const prop of comp.props) {
            if (!prop.attribute) continue;

            const attr: VsCodeAttribute = {
                name: prop.attribute,
                description: prop.description || undefined,
            };

            // Add value hints for union/boolean types
            if (prop.isBoolean) {
                attr.values = [{ name: 'true' }, { name: 'false' }];
            } else if (prop.tsType.includes("'") && prop.tsType.includes('|')) {
                // Extract string literal union values: 'a' | 'b' | 'c'
                const values = prop.tsType
                    .split('|')
                    .map(v => v.trim().replace(/^'|'$/g, '').replace(/^"|"$/g, ''))
                    .filter(v => v && !v.includes(' '));
                if (values.length > 0) {
                    attr.values = values.map(name => ({ name }));
                }
            }

            attributes.push(attr);
        }

        const tag: VsCodeTag = {
            name: comp.tagName,
            description: comp.description || undefined,
            attributes: attributes.length > 0 ? attributes : undefined,
        };

        tags.push(tag);
    }

    const customData = {
        version: 1.1,
        tags,
    };

    writeFileSync(OUT_PATH, JSON.stringify(customData, null, 2) + '\n', 'utf-8');

    console.log(`Wrote VS Code custom data: ${tags.length} tags → ${OUT_PATH.replace(REPO_ROOT + '/', '')}`);
}

main();
