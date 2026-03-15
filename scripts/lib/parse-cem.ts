/**
 * parse-cem.ts
 *
 * Reads the Custom Elements Manifest (custom-elements.json) and converts it
 * into ComponentMeta[] — the same shape used by the React wrapper generator,
 * docs generator, and IDE tooling generators.
 *
 * For event detail types, falls back to scanning source files with the
 * existing parse-lit.ts AST parser when CEM descriptions don't contain
 * explicit detail type annotations.
 */
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import type { ComponentMeta, PropMeta, EventMeta, SlotMeta, CssPropertyMeta, MethodMeta } from './types.js';

// ─── CEM types (subset of the Custom Elements Manifest spec) ────────────────

interface CEMMember {
    kind: 'field' | 'method';
    name: string;
    privacy?: 'private' | 'protected' | 'public';
    type?: { text: string };
    default?: string;
    description?: string;
    attribute?: string;
    reflects?: boolean;
    readonly?: boolean;
    parameters?: Array<{
        name: string;
        type?: { text: string };
        optional?: boolean;
        default?: string;
        description?: string;
    }>;
    return?: { type?: { text: string } };
}

interface CEMEvent {
    name: string;
    type?: { text: string };
    description?: string;
}

interface CEMSlot {
    name: string;
    description?: string;
}

interface CEMCssProperty {
    name: string;
    description?: string;
    default?: string;
    type?: { text: string };
}

interface CEMDeclaration {
    kind: string;
    name: string;
    description?: string;
    tagName?: string;
    customElement?: boolean;
    members?: CEMMember[];
    events?: CEMEvent[];
    slots?: CEMSlot[];
    cssProperties?: CEMCssProperty[];
    attributes?: Array<{
        name: string;
        type?: { text: string };
        default?: string;
        description?: string;
        fieldName?: string;
    }>;
}

interface CEMModule {
    kind: string;
    path: string;
    declarations?: CEMDeclaration[];
}

interface CEM {
    schemaVersion: string;
    modules: CEMModule[];
}

// ─── string helpers ─────────────────────────────────────────────────────────

/** 'flint-switch-change' → 'onFlintSwitchChange' */
function domEventToReactProp(name: string): string {
    return (
        'on' +
        name
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')
    );
}

/**
 * Compute SCREAMING_SNAKE_CASE constant key for an event.
 * Strips the tag-name prefix if present, or a leading 'flint-'.
 */
function eventConstKey(tagName: string, domName: string): string {
    let stripped = domName;
    const tagPrefix = tagName + '-';
    if (domName.startsWith(tagPrefix)) {
        stripped = domName.slice(tagPrefix.length);
    } else if (domName.startsWith('flint-')) {
        stripped = domName.slice('flint-'.length);
    }
    return stripped.replace(/-/g, '_').toUpperCase();
}

// ─── event detail type extraction from CEM descriptions ─────────────────────

/**
 * Try to extract a detail type from an event's description.
 * Supports multiple patterns found in the codebase:
 *   - `detail: \`{ key: type }\``
 *   - `Detail: \`{ key: type }\``
 *   - `{ detail: { key: type } }`
 *   - `detail: { key: type }`
 *   - `(detail: { key: type })`
 */
function extractDetailFromDescription(desc: string): string | undefined {
    if (!desc) return undefined;

    // Pattern 1: detail: `{ ... }` or Detail: `{ ... }`
    const backtickMatch = desc.match(/[Dd]etail:\s*`\{([^}]+)\}`/);
    if (backtickMatch) {
        return `{ ${backtickMatch[1].trim()} }`;
    }

    // Pattern 2: { detail: { ... } }
    const wrappedMatch = desc.match(/\{\s*detail:\s*\{([^}]+)\}\s*\}/);
    if (wrappedMatch) {
        return `{ ${wrappedMatch[1].trim()} }`;
    }

    // Pattern 3: detail: { ... } (without backticks)
    const plainMatch = desc.match(/[Dd]etail:\s*\{([^}]+)\}/);
    if (plainMatch) {
        return `{ ${plainMatch[1].trim()} }`;
    }

    // Pattern 4: (detail: { ... })
    const parenMatch = desc.match(/\([Dd]etail:\s*\{([^}]+)\}/);
    if (parenMatch) {
        return `{ ${parenMatch[1].trim()} }`;
    }

    return undefined;
}

// ─── CEM to ComponentMeta conversion ────────────────────────────────────────

function convertMember(member: CEMMember, attrMap: Map<string, CEMDeclaration['attributes']>): PropMeta | null {
    if (member.kind !== 'field') return null;
    if (member.privacy === 'private' || member.privacy === 'protected') return null;
    if (member.name.startsWith('_')) return null;
    // Skip readonly fields (not settable as props)
    if (member.readonly) return null;
    // Skip kebab-case entries (CEM sometimes emits attribute names as separate members)
    if (member.name.includes('-')) return null;

    const tsType = member.type?.text ?? 'string';
    const isBoolean = tsType === 'boolean';
    const isNumber = tsType === 'number';

    return {
        name: member.name,
        tsType,
        attribute: member.attribute ?? member.name,
        reflect: member.reflects ?? false,
        isBoolean,
        isNumber,
        defaultValue: member.default ?? '',
        description: member.description?.split('\n')[0]?.trim() ?? '',
    };
}

function convertEvent(event: CEMEvent, tagName: string): EventMeta | null {
    // Skip internal events
    if (!event.name || event.name.startsWith('_') || event.name === 'undefined') return null;
    // Skip native DOM events (not prefixed with flint-)
    if (!event.name.startsWith('flint-')) return null;

    const detailType = extractDetailFromDescription(event.description ?? '');

    return {
        domName: event.name,
        reactProp: domEventToReactProp(event.name),
        constKey: eventConstKey(tagName, event.name),
        description: event.description?.split('\n')[0]?.trim() ?? '',
        detailType,
    };
}

function convertSlot(slot: CEMSlot): SlotMeta {
    return {
        name: slot.name ?? '',
        description: slot.description ?? '',
    };
}

function convertCssProperty(cssProp: CEMCssProperty): CssPropertyMeta {
    return {
        name: cssProp.name,
        defaultValue: cssProp.default ?? '—',
    };
}

function convertMethod(member: CEMMember): MethodMeta | null {
    if (member.kind !== 'method') return null;
    if (member.privacy === 'private' || member.privacy === 'protected') return null;
    if (member.name.startsWith('_')) return null;

    // Skip lifecycle and internal methods
    const skip = new Set([
        'render', 'connectedCallback', 'disconnectedCallback', 'willUpdate',
        'updated', 'firstUpdated', 'focus', 'blur',
        'formResetCallback', 'formStateRestoreCallback',
        'formDisabledCallback', 'formAssociatedCallback',
    ]);
    if (skip.has(member.name)) return null;

    const params = (member.parameters ?? [])
        .map(p => `${p.name}: ${p.type?.text ?? 'unknown'}`)
        .join(', ');
    const returnType = member.return?.type?.text ?? 'void';

    return {
        signature: `${member.name}(${params}): ${returnType}`,
        description: member.description?.split('\n')[0]?.trim() ?? '',
    };
}

// ─── public API ─────────────────────────────────────────────────────────────

export interface ParseCemOptions {
    /** Absolute path to custom-elements.json */
    cemPath: string;
}

/**
 * Parse the Custom Elements Manifest and return ComponentMeta[] for all
 * registered custom elements.
 */
export function parseCem(options: ParseCemOptions): ComponentMeta[] {
    const cem: CEM = JSON.parse(readFileSync(options.cemPath, 'utf-8'));
    const components: ComponentMeta[] = [];

    for (const mod of cem.modules) {
        for (const decl of mod.declarations ?? []) {
            if (decl.kind !== 'class') continue;
            // Only include classes that have a tag name (registered custom elements)
            if (!decl.tagName) continue;

            const tagName = decl.tagName;
            const className = decl.name;

            // Build attribute map for reference
            const attrMap = new Map<string, typeof decl.attributes>();

            // Convert members to props
            const props: PropMeta[] = [];
            for (const member of decl.members ?? []) {
                const prop = convertMember(member, attrMap);
                if (prop) props.push(prop);
            }

            // Convert events
            const events: EventMeta[] = [];
            for (const event of decl.events ?? []) {
                const ev = convertEvent(event, tagName);
                if (ev) events.push(ev);
            }

            // Convert slots
            const slots: SlotMeta[] = (decl.slots ?? []).map(convertSlot);

            // Convert CSS properties
            const cssProperties: CssPropertyMeta[] = (decl.cssProperties ?? []).map(convertCssProperty);

            // Convert methods
            const methods: MethodMeta[] = [];
            for (const member of decl.members ?? []) {
                const method = convertMethod(member);
                if (method) methods.push(method);
            }

            // Source file path relative to packages/core/
            const sourceFile = mod.path;

            components.push({
                tagName,
                className,
                description: decl.description?.split('\n\n')[0]?.trim() ?? '',
                props,
                events,
                slots,
                cssProperties,
                methods,
                sourceFile,
            });
        }
    }

    return components;
}

/**
 * Augment CEM-derived ComponentMeta with event detail types from the
 * existing parse-lit.ts AST parser. This is a hybrid approach: CEM provides
 * the component catalog, while AST analysis fills in precise event detail types.
 *
 * The AST parser requires `@customElement` to identify components, which is
 * only in registration files. We try both the .component.ts (CEM source) and
 * the registration .ts file.
 */
export function augmentDetailTypes(
    components: ComponentMeta[],
    coreRoot: string,
): void {
    // Dynamic import to avoid issues with CJS/ESM
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { parseComponentFile } = require('./parse-lit.js') as typeof import('./parse-lit.js');

    for (const comp of components) {
        // Only process components that have events needing detail types
        const needsAugment = comp.events.some(e => !e.detailType);
        if (!needsAugment) continue;

        // Try both the .component.ts and the registration .ts file
        const paths = [
            comp.sourceFile,
            comp.sourceFile.replace('.component.ts', '.ts'),
        ];

        for (const relPath of paths) {
            const absPath = resolve(coreRoot, relPath);
            try {
                const astComponents = parseComponentFile(absPath, relPath);
                const astComp = astComponents.find(c => c.className === comp.className);
                if (!astComp) continue;

                // Merge detail types from AST into CEM events
                let augmented = false;
                for (const ev of comp.events) {
                    if (ev.detailType) continue;
                    const astEvent = astComp.events.find(e => e.domName === ev.domName);
                    if (astEvent?.detailType && astEvent.detailType !== 'unknown') {
                        ev.detailType = astEvent.detailType;
                        augmented = true;
                    }
                }
                if (augmented) break;
            } catch {
                // If AST parsing fails, try next path
            }
        }
    }

    // Final pass: clear any detail types that reference unresolvable external types
    for (const comp of components) {
        for (const ev of comp.events) {
            if (ev.detailType && hasUnresolvableType(ev.detailType)) {
                ev.detailType = undefined;
            }
        }
    }
}

/** Check if a detail type string references types that would need imports. */
function hasUnresolvableType(detailType: string): boolean {
    // Strip the outer braces and check each field
    const inner = detailType.replace(/^\{\s*/, '').replace(/\s*\}$/, '');
    // Split on `;` or `,` (detail descriptions use both)
    const fields = inner.split(/[;,]/).filter(s => s.trim());

    for (const field of fields) {
        const colonIdx = field.indexOf(':');
        if (colonIdx < 0) return true; // No type annotation = unresolvable
        const type = field.slice(colonIdx + 1).trim();
        if (!type) return true; // Empty type annotation
        if (!isResolvedType(type)) return true;
    }
    return false;
}

/** Check if a type string is fully resolved (no external type references). */
function isResolvedType(t: string): boolean {
    const trimmed = t.trim();
    const primitives = ['string', 'number', 'boolean', 'void', 'null', 'undefined', 'unknown', 'any', 'never', 'object'];

    if (primitives.includes(trimmed)) return true;
    if (trimmed.endsWith('[]') && isResolvedType(trimmed.slice(0, -2))) return true;
    if (/^'[^']*'$/.test(trimmed) || /^"[^"]*"$/.test(trimmed) || /^\d+$/.test(trimmed)) return true;
    if (trimmed === 'true' || trimmed === 'false') return true;
    if (trimmed.includes('|')) {
        return trimmed.split('|').every(part => isResolvedType(part.trim()));
    }
    // Tuple types like [number, number]
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        const inner = trimmed.slice(1, -1);
        return inner.split(',').every(part => isResolvedType(part.trim()));
    }
    return false;
}
