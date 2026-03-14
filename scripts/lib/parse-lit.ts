/**
 * Parse a Lit component TypeScript source file using the TypeScript compiler
 * API and extract metadata for every class decorated with @customElement.
 */
import ts from 'typescript';
import { readFileSync } from 'node:fs';
import type { ComponentMeta, EventMeta, PropMeta } from './types.js';

// ─── string helpers ──────────────────────────────────────────────────────────

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
 * Compute the SCREAMING_SNAKE_CASE constant key for an event.
 *
 * Strategy:
 *   - If the event name starts with `<tagName>-`, strip that prefix:
 *       tag='flint-switch'  event='flint-switch-change'  → 'CHANGE'
 *   - Otherwise strip a leading 'flint-':
 *       event='flint-otp-change'  → 'OTP_CHANGE'
 *       event='change'         → 'CHANGE'
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

/** camelCase → kebab-case (default attribute name) */
function camelToKebab(str: string): string {
    return str.replace(/([A-Z])/g, c => '-' + c.toLowerCase());
}

// ─── TS decorator compat helper ──────────────────────────────────────────────

function getDecoratorsOf(node: ts.Node): readonly ts.Decorator[] {
    // TypeScript 4.8+ exposes ts.getDecorators(); older builds store them on
    // modifiers. Handle both.
    if (typeof (ts as unknown as Record<string, unknown>)['getDecorators'] === 'function') {
        return (ts as unknown as { getDecorators: (n: ts.Node) => readonly ts.Decorator[] }).getDecorators(node) ?? [];
    }
    const modifiers = (node as ts.HasModifiers).modifiers;
    if (!modifiers) return [];
    return Array.from(modifiers).filter(
        (m): m is ts.Decorator => m.kind === ts.SyntaxKind.Decorator,
    ) as ts.Decorator[];
}

// ─── public API ─────────────────────────────────────────────────────────────

export function parseComponentFile(
    absolutePath: string,
    relativeSourcePath: string,
): ComponentMeta[] {
    const content = readFileSync(absolutePath, 'utf-8');
    const sf = ts.createSourceFile(
        absolutePath,
        content,
        ts.ScriptTarget.Latest,
        /* setParentNodes */ true,
    );

    const components: ComponentMeta[] = [];

    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node)) {
            const meta = parseClass(node, sf, relativeSourcePath);
            if (meta) components.push(meta);
        }
        ts.forEachChild(node, visit);
    }

    visit(sf);
    return components;
}

// ─── class-level parser ──────────────────────────────────────────────────────

function parseClass(
    node: ts.ClassDeclaration,
    sf: ts.SourceFile,
    sourceFile: string,
): ComponentMeta | null {
    // 1. Require @customElement('tag-name') decorator
    let tagName: string | null = null;

    for (const d of getDecoratorsOf(node)) {
        if (!ts.isCallExpression(d.expression)) continue;
        const expr = d.expression;
        if (
            ts.isIdentifier(expr.expression) &&
            expr.expression.text === 'customElement' &&
            expr.arguments.length > 0 &&
            ts.isStringLiteral(expr.arguments[0])
        ) {
            tagName = (expr.arguments[0] as ts.StringLiteral).text;
            break;
        }
    }

    if (!tagName) return null;

    const className = node.name?.text ?? '';

    // 2. Collect @property decorated members
    const props: PropMeta[] = [];

    for (const member of node.members) {
        if (!ts.isPropertyDeclaration(member)) continue;

        const propDec = getDecoratorsOf(member).find(d => {
            if (!ts.isCallExpression(d.expression)) return false;
            return (
                ts.isIdentifier(d.expression.expression) &&
                d.expression.expression.text === 'property'
            );
        });

        if (!propDec) continue;

        const propName = ts.isIdentifier(member.name) ? member.name.text : '';
        if (!propName || propName.startsWith('_')) continue;

        // Parse options object: { type, reflect, attribute }
        let isBoolean = false;
        let isNumber = false;
        let reflect = false;
        let attribute = camelToKebab(propName);

        if (ts.isCallExpression(propDec.expression)) {
            const optionsArg = propDec.expression.arguments[0];
            if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
                for (const p of optionsArg.properties) {
                    if (!ts.isPropertyAssignment(p)) continue;
                    const key = ts.isIdentifier(p.name) ? p.name.text : '';

                    if (key === 'type' && ts.isIdentifier(p.initializer)) {
                        isBoolean = p.initializer.text === 'Boolean';
                        isNumber = p.initializer.text === 'Number';
                    } else if (key === 'reflect') {
                        reflect = p.initializer.kind === ts.SyntaxKind.TrueKeyword;
                    } else if (key === 'attribute') {
                        if (ts.isStringLiteral(p.initializer)) {
                            attribute = p.initializer.text;
                        } else if (p.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                            attribute = ''; // no attribute binding
                        }
                    }
                }
            }
        }

        // Determine TypeScript type
        let tsType: string;
        if (member.type) {
            tsType = member.type.getText(sf);
        } else if (isBoolean) {
            tsType = 'boolean';
        } else if (isNumber) {
            tsType = 'number';
        } else {
            tsType = 'string';
        }

        props.push({ name: propName, tsType, attribute, reflect, isBoolean, isNumber });
    }

    // 3. Find CustomEvent instantiations within this class body only
    const seenEvents = new Set<string>();
    const events: EventMeta[] = [];

    function findEvents(n: ts.Node) {
        if (
            ts.isNewExpression(n) &&
            ts.isIdentifier(n.expression) &&
            n.expression.text === 'CustomEvent' &&
            n.arguments &&
            n.arguments.length > 0 &&
            ts.isStringLiteral(n.arguments[0])
        ) {
            const domName = (n.arguments[0] as ts.StringLiteral).text;
            // Skip internal events (prefixed with _)
            if (!domName.startsWith('_') && !seenEvents.has(domName)) {
                seenEvents.add(domName);
                events.push({
                    domName,
                    reactProp: domEventToReactProp(domName),
                    constKey: eventConstKey(tagName!, domName),
                });
            }
        }
        ts.forEachChild(n, findEvents);
    }

    // Walk only within the class body to avoid cross-class pollution
    ts.forEachChild(node, findEvents);

    return { tagName, className, props, events, sourceFile };
}
