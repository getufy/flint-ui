/**
 * Parse a Lit component TypeScript source file using the TypeScript compiler
 * API and extract metadata for every class decorated with @customElement.
 */
import ts from 'typescript';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import type { ComponentMeta, EventMeta, PropMeta, SlotMeta, CssPropertyMeta, MethodMeta } from './types.js';

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

// ─── JSDoc helpers ───────────────────────────────────────────────────────────

/** Extract the first line of a JSDoc comment on a node. */
function getJsDocDescription(node: ts.Node): string {
    const jsDocs = (node as unknown as { jsDoc?: ts.JSDoc[] }).jsDoc;
    if (!jsDocs || jsDocs.length === 0) return '';
    const doc = jsDocs[0];
    if (!doc.comment) return '';
    if (typeof doc.comment === 'string') return doc.comment.split('\n')[0].trim();
    // NodeArray<JSDocText | JSDocLink>
    return doc.comment
        .map(c => ('text' in c ? c.text : ''))
        .join('')
        .split('\n')[0]
        .trim();
}

/** Extract @fires tags from a class JSDoc → EventMeta descriptions. */
function getFiresTags(node: ts.ClassDeclaration): Map<string, string> {
    const map = new Map<string, string>();
    const jsDocs = (node as unknown as { jsDoc?: ts.JSDoc[] }).jsDoc;
    if (!jsDocs) return map;
    for (const doc of jsDocs) {
        if (!doc.tags) continue;
        for (const tag of doc.tags) {
            if (tag.tagName.text !== 'fires') continue;
            const text = typeof tag.comment === 'string'
                ? tag.comment
                : (tag.comment?.map(c => ('text' in c ? c.text : '')).join('') ?? '');
            // Format: "event-name - Description" or just "event-name"
            const trimmed = text.trim();
            const dashIdx = trimmed.indexOf(' - ');
            if (dashIdx >= 0) {
                const evName = trimmed.slice(0, dashIdx).trim();
                const desc = trimmed.slice(dashIdx + 3).trim();
                map.set(evName, desc);
            } else {
                map.set(trimmed.split(/\s/)[0], '');
            }
        }
    }
    return map;
}

/** Extract @slot tags from a class JSDoc. */
function getSlotTags(node: ts.ClassDeclaration): SlotMeta[] {
    const slots: SlotMeta[] = [];
    const jsDocs = (node as unknown as { jsDoc?: ts.JSDoc[] }).jsDoc;
    if (!jsDocs) return slots;
    for (const doc of jsDocs) {
        if (!doc.tags) continue;
        for (const tag of doc.tags) {
            if (tag.tagName.text !== 'slot') continue;
            const text = typeof tag.comment === 'string'
                ? tag.comment
                : (tag.comment?.map(c => ('text' in c ? c.text : '')).join('') ?? '');
            const trimmed = text.trim();
            const dashIdx = trimmed.indexOf(' - ');
            if (dashIdx >= 0) {
                slots.push({
                    name: trimmed.slice(0, dashIdx).trim(),
                    description: trimmed.slice(dashIdx + 3).trim(),
                });
            } else if (trimmed) {
                slots.push({ name: trimmed, description: '' });
            }
        }
    }
    return slots;
}

/** Extract class-level description (non-tag text) from JSDoc. */
function getClassDescription(node: ts.ClassDeclaration): string {
    const jsDocs = (node as unknown as { jsDoc?: ts.JSDoc[] }).jsDoc;
    if (!jsDocs || jsDocs.length === 0) return '';
    const doc = jsDocs[0];
    if (!doc.comment) return '';
    const text = typeof doc.comment === 'string'
        ? doc.comment
        : doc.comment.map(c => ('text' in c ? c.text : '')).join('');
    // Take the first paragraph (up to double newline or @tag)
    return text.split(/\n\n/)[0].trim();
}

// ─── CSS custom properties ──────────────────────────────────────────────────

/** Scan CSS file(s) next to the source for --flint-* custom properties. */
function extractCssProperties(absoluteTsPath: string): CssPropertyMeta[] {
    const dir = dirname(absoluteTsPath);
    const baseName = absoluteTsPath.replace(/\.ts$/, '');

    // Try to find CSS file(s) with matching name patterns
    const cssFiles: string[] = [];
    const possibleNames = [
        baseName + '.css',
        // Some components import multiple CSS files
    ];
    for (const f of possibleNames) {
        if (existsSync(f)) cssFiles.push(f);
    }

    // Also check for any CSS imports in the TS file
    const tsContent = readFileSync(absoluteTsPath, 'utf-8');
    const cssImportRe = /from\s+['"]\.\/([\w-]+\.css)\?inline['"]/g;
    let m;
    while ((m = cssImportRe.exec(tsContent)) !== null) {
        const cssPath = join(dir, m[1]);
        if (existsSync(cssPath) && !cssFiles.includes(cssPath)) {
            cssFiles.push(cssPath);
        }
    }

    const seen = new Set<string>();
    const props: CssPropertyMeta[] = [];

    for (const cssFile of cssFiles) {
        const css = readFileSync(cssFile, 'utf-8');
        // Match var(--flint-*) references
        const varRe = /var\(\s*(--flint-[\w-]+)(?:\s*,\s*([^)]+))?\)/g;
        let vm;
        while ((vm = varRe.exec(css)) !== null) {
            const name = vm[1];
            if (seen.has(name)) continue;
            seen.add(name);
            props.push({ name, defaultValue: '—' });
        }
    }

    return props;
}

// ─── public methods parser ──────────────────────────────────────────────────

function extractPublicMethods(node: ts.ClassDeclaration, sf: ts.SourceFile): MethodMeta[] {
    const methods: MethodMeta[] = [];
    for (const member of node.members) {
        // Check getters (public accessors like `get inputElement()`)
        if (ts.isGetAccessorDeclaration(member)) {
            const name = ts.isIdentifier(member.name) ? member.name.text : '';
            if (!name || name.startsWith('_')) continue;
            // Skip if private/protected
            if (member.modifiers?.some(m =>
                m.kind === ts.SyntaxKind.PrivateKeyword || m.kind === ts.SyntaxKind.ProtectedKeyword
            )) continue;
            const returnType = member.type ? member.type.getText(sf) : 'unknown';
            methods.push({
                signature: `${name}(): ${returnType}`,
                description: getJsDocDescription(member),
            });
        }
        // Check regular methods
        if (ts.isMethodDeclaration(member)) {
            const name = ts.isIdentifier(member.name) ? member.name.text : '';
            if (!name || name.startsWith('_')) continue;
            // Skip private/protected and lifecycle methods
            if (member.modifiers?.some(m =>
                m.kind === ts.SyntaxKind.PrivateKeyword || m.kind === ts.SyntaxKind.ProtectedKeyword
            )) continue;
            // Skip Lit lifecycle and standard overrides
            if (['render', 'connectedCallback', 'disconnectedCallback', 'willUpdate',
                 'updated', 'firstUpdated', 'focus', 'blur',
                 'formResetCallback', 'formStateRestoreCallback'].includes(name)) continue;
            const params = member.parameters
                .map(p => {
                    const pName = p.name.getText(sf);
                    const pType = p.type ? p.type.getText(sf) : 'unknown';
                    return `${pName}: ${pType}`;
                })
                .join(', ');
            const returnType = member.type ? member.type.getText(sf) : 'void';
            methods.push({
                signature: `${name}(${params}): ${returnType}`,
                description: getJsDocDescription(member),
            });
        }
    }
    return methods;
}

// ─── event detail type extraction ───────────────────────────────────────────

/** Check whether a TS type string is a "simple" type that needs no imports. */
function isSimpleType(t: string): boolean {
    const trimmed = t.trim();
    const primitives = ['string', 'number', 'boolean', 'void', 'null', 'undefined', 'unknown', 'any', 'never', 'object'];

    if (primitives.includes(trimmed)) return true;
    if (trimmed.endsWith('[]') && isSimpleType(trimmed.slice(0, -2))) return true;
    if (/^'[^']*'$/.test(trimmed) || /^"[^"]*"$/.test(trimmed) || /^\d+$/.test(trimmed)) return true;
    if (trimmed === 'true' || trimmed === 'false') return true;
    if (trimmed.includes('|')) {
        return trimmed.split('|').every(part => isSimpleType(part.trim()));
    }
    // Object type literals are safe (they contain their own types)
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) return true;
    return false;
}

/** Resolve the TypeScript type of `this.propName` from class members. */
function resolveThisPropertyType(
    propName: string,
    props: PropMeta[],
    classNode: ts.ClassDeclaration,
    sf: ts.SourceFile,
): string {
    // Check @property props first
    const prop = props.find(p => p.name === propName);
    if (prop) return prop.tsType;

    // Check class fields (including private ones)
    for (const member of classNode.members) {
        if (ts.isPropertyDeclaration(member) &&
            ts.isIdentifier(member.name) &&
            member.name.text === propName) {
            if (member.type) return member.type.getText(sf);
            if (member.initializer) {
                if (ts.isStringLiteral(member.initializer)) return 'string';
                if (ts.isNumericLiteral(member.initializer)) return 'number';
                if (member.initializer.kind === ts.SyntaxKind.TrueKeyword ||
                    member.initializer.kind === ts.SyntaxKind.FalseKeyword) return 'boolean';
                if (ts.isArrayLiteralExpression(member.initializer)) return 'unknown[]';
            }
        }
    }
    return 'unknown';
}

/** Resolve a TS expression to its approximate type string. */
function resolveExprType(
    expr: ts.Expression,
    props: PropMeta[],
    classNode: ts.ClassDeclaration,
    sf: ts.SourceFile,
): string {
    // this.propName
    if (ts.isPropertyAccessExpression(expr) &&
        expr.expression.kind === ts.SyntaxKind.ThisKeyword) {
        return resolveThisPropertyType(expr.name.text, props, classNode, sf);
    }

    // Object literal
    if (ts.isObjectLiteralExpression(expr)) {
        const entries: string[] = [];
        for (const prop of expr.properties) {
            if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                const type = resolveExprType(prop.initializer, props, classNode, sf);
                entries.push(`${prop.name.text}: ${type}`);
            } else if (ts.isShorthandPropertyAssignment(prop)) {
                const type = resolveThisPropertyType(prop.name.text, props, classNode, sf);
                entries.push(`${prop.name.text}: ${type}`);
            }
        }
        return entries.length > 0 ? `{ ${entries.join('; ')} }` : 'unknown';
    }

    // Literals
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return 'string';
    if (ts.isNumericLiteral(expr)) return 'number';
    if (expr.kind === ts.SyntaxKind.TrueKeyword || expr.kind === ts.SyntaxKind.FalseKeyword) return 'boolean';
    if (expr.kind === ts.SyntaxKind.NullKeyword) return 'null';
    if (expr.kind === ts.SyntaxKind.UndefinedKeyword) return 'undefined';

    // Array literal
    if (ts.isArrayLiteralExpression(expr)) {
        if (expr.elements.length === 1 && ts.isSpreadElement(expr.elements[0])) {
            const spreadType = resolveExprType(expr.elements[0].expression, props, classNode, sf);
            if (spreadType.endsWith('[]')) return spreadType;
        }
        return 'unknown[]';
    }

    return 'unknown';
}

/**
 * Resolve the type of an expression with a fallback: if the expression is
 * unresolvable but the property key matches a known @property name, use that
 * property's type.
 */
function resolveExprTypeWithKeyHint(
    expr: ts.Expression,
    keyName: string,
    props: PropMeta[],
    classNode: ts.ClassDeclaration,
    sf: ts.SourceFile,
): string {
    const resolved = resolveExprType(expr, props, classNode, sf);
    if (resolved !== 'unknown') return resolved;
    // Fallback: match the detail key name to a known @property or class field
    return resolveThisPropertyType(keyName, props, classNode, sf);
}

/**
 * Extract the detail type from a `new CustomEvent(name, { detail: ... })` call.
 * Returns a type string like `{ value: number }` or undefined.
 */
function extractDetailType(
    newExpr: ts.NewExpression,
    props: PropMeta[],
    classNode: ts.ClassDeclaration,
    sf: ts.SourceFile,
): string | undefined {
    if (!newExpr.arguments || newExpr.arguments.length < 2) return undefined;
    const optionsArg = newExpr.arguments[1];
    if (!ts.isObjectLiteralExpression(optionsArg)) return undefined;

    const detailProp = optionsArg.properties.find(p =>
        ts.isPropertyAssignment(p) &&
        ts.isIdentifier(p.name) &&
        p.name.text === 'detail'
    );
    if (!detailProp || !ts.isPropertyAssignment(detailProp)) return undefined;

    const detailValue = detailProp.initializer;

    // Special handling: if detail is an object literal, use key-name heuristic
    if (ts.isObjectLiteralExpression(detailValue)) {
        const entries: string[] = [];
        for (const prop of detailValue.properties) {
            if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                const key = prop.name.text;
                let type = resolveExprTypeWithKeyHint(prop.initializer, key, props, classNode, sf);
                // Reject custom type references that would need imports
                if (!isSimpleType(type)) type = 'unknown';
                entries.push(`${key}: ${type}`);
            } else if (ts.isShorthandPropertyAssignment(prop)) {
                const key = prop.name.text;
                let type = resolveThisPropertyType(key, props, classNode, sf);
                if (!isSimpleType(type)) type = 'unknown';
                entries.push(`${key}: ${type}`);
            }
        }
        if (entries.length > 0) {
            const hasUnknown = entries.some(e => e.endsWith(': unknown'));
            return hasUnknown ? undefined : `{ ${entries.join('; ')} }`;
        }
        return undefined;
    }

    const type = resolveExprType(detailValue, props, classNode, sf);
    return type !== 'unknown' ? type : undefined;
}

export { isSimpleType };

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
            const meta = parseClass(node, sf, absolutePath, relativeSourcePath);
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
    absolutePath: string,
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

    // 2. Extract class-level JSDoc
    const description = getClassDescription(node);
    const firesMap = getFiresTags(node);
    const slots = getSlotTags(node);

    // 3. Collect @property decorated members
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

        // Extract default value from initializer
        let defaultValue = '';
        if (member.initializer) {
            defaultValue = member.initializer.getText(sf);
        }

        // Extract JSDoc description
        const propDescription = getJsDocDescription(member);

        props.push({
            name: propName, tsType, attribute, reflect, isBoolean, isNumber,
            defaultValue, description: propDescription,
        });
    }

    // 4. Find CustomEvent instantiations within this class body only
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
                const detailType = extractDetailType(n, props, node, sf);
                events.push({
                    domName,
                    reactProp: domEventToReactProp(domName),
                    constKey: eventConstKey(tagName!, domName),
                    description: firesMap.get(domName) ?? '',
                    detailType,
                });
            }
        }
        ts.forEachChild(n, findEvents);
    }

    // Walk only within the class body to avoid cross-class pollution
    ts.forEachChild(node, findEvents);

    // 5. Extract CSS custom properties
    const cssProperties = extractCssProperties(absolutePath);

    // 6. Extract public methods
    const methods = extractPublicMethods(node, sf);

    return {
        tagName, className, description, props, events, slots,
        cssProperties, methods, sourceFile,
    };
}
