"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseComponentFile = parseComponentFile;
/**
 * Parse a Lit component TypeScript source file using the TypeScript compiler
 * API and extract metadata for every class decorated with @customElement.
 */
var typescript_1 = require("typescript");
var node_fs_1 = require("node:fs");
// ─── string helpers ──────────────────────────────────────────────────────────
/** 'ui-switch-change' → 'onUiSwitchChange' */
function domEventToReactProp(name) {
    return ('on' +
        name
            .split('-')
            .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })
            .join(''));
}
/**
 * Compute the SCREAMING_SNAKE_CASE constant key for an event.
 *
 * Strategy:
 *   - If the event name starts with `<tagName>-`, strip that prefix:
 *       tag='ui-switch'  event='ui-switch-change'  → 'CHANGE'
 *   - Otherwise strip a leading 'ui-':
 *       event='ui-otp-change'  → 'OTP_CHANGE'
 *       event='change'         → 'CHANGE'
 */
function eventConstKey(tagName, domName) {
    var stripped = domName;
    var tagPrefix = tagName + '-';
    if (domName.startsWith(tagPrefix)) {
        stripped = domName.slice(tagPrefix.length);
    }
    else if (domName.startsWith('ui-')) {
        stripped = domName.slice('ui-'.length);
    }
    return stripped.replace(/-/g, '_').toUpperCase();
}
/** camelCase → kebab-case (default attribute name) */
function camelToKebab(str) {
    return str.replace(/([A-Z])/g, function (c) { return '-' + c.toLowerCase(); });
}
// ─── TS decorator compat helper ──────────────────────────────────────────────
function getDecoratorsOf(node) {
    var _a;
    // TypeScript 4.8+ exposes ts.getDecorators(); older builds store them on
    // modifiers. Handle both.
    if (typeof typescript_1.default['getDecorators'] === 'function') {
        return (_a = typescript_1.default.getDecorators(node)) !== null && _a !== void 0 ? _a : [];
    }
    var modifiers = node.modifiers;
    if (!modifiers)
        return [];
    return Array.from(modifiers).filter(function (m) { return m.kind === typescript_1.default.SyntaxKind.Decorator; });
}
// ─── public API ─────────────────────────────────────────────────────────────
function parseComponentFile(absolutePath, relativeSourcePath) {
    var content = (0, node_fs_1.readFileSync)(absolutePath, 'utf-8');
    var sf = typescript_1.default.createSourceFile(absolutePath, content, typescript_1.default.ScriptTarget.Latest, 
    /* setParentNodes */ true);
    var components = [];
    function visit(node) {
        if (typescript_1.default.isClassDeclaration(node)) {
            var meta = parseClass(node, sf, relativeSourcePath);
            if (meta)
                components.push(meta);
        }
        typescript_1.default.forEachChild(node, visit);
    }
    visit(sf);
    return components;
}
// ─── class-level parser ──────────────────────────────────────────────────────
function parseClass(node, sf, sourceFile) {
    var _a, _b;
    // 1. Require @customElement('tag-name') decorator
    var tagName = null;
    for (var _i = 0, _c = getDecoratorsOf(node); _i < _c.length; _i++) {
        var d = _c[_i];
        if (!typescript_1.default.isCallExpression(d.expression))
            continue;
        var expr = d.expression;
        if (typescript_1.default.isIdentifier(expr.expression) &&
            expr.expression.text === 'customElement' &&
            expr.arguments.length > 0 &&
            typescript_1.default.isStringLiteral(expr.arguments[0])) {
            tagName = expr.arguments[0].text;
            break;
        }
    }
    if (!tagName)
        return null;
    var className = (_b = (_a = node.name) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : '';
    // 2. Collect @property decorated members
    var props = [];
    for (var _d = 0, _e = node.members; _d < _e.length; _d++) {
        var member = _e[_d];
        if (!typescript_1.default.isPropertyDeclaration(member))
            continue;
        var propDec = getDecoratorsOf(member).find(function (d) {
            if (!typescript_1.default.isCallExpression(d.expression))
                return false;
            return (typescript_1.default.isIdentifier(d.expression.expression) &&
                d.expression.expression.text === 'property');
        });
        if (!propDec)
            continue;
        var propName = typescript_1.default.isIdentifier(member.name) ? member.name.text : '';
        if (!propName || propName.startsWith('_'))
            continue;
        // Parse options object: { type, reflect, attribute }
        var isBoolean = false;
        var isNumber = false;
        var reflect = false;
        var attribute = camelToKebab(propName);
        if (typescript_1.default.isCallExpression(propDec.expression)) {
            var optionsArg = propDec.expression.arguments[0];
            if (optionsArg && typescript_1.default.isObjectLiteralExpression(optionsArg)) {
                for (var _f = 0, _g = optionsArg.properties; _f < _g.length; _f++) {
                    var p = _g[_f];
                    if (!typescript_1.default.isPropertyAssignment(p))
                        continue;
                    var key = typescript_1.default.isIdentifier(p.name) ? p.name.text : '';
                    if (key === 'type' && typescript_1.default.isIdentifier(p.initializer)) {
                        isBoolean = p.initializer.text === 'Boolean';
                        isNumber = p.initializer.text === 'Number';
                    }
                    else if (key === 'reflect') {
                        reflect = p.initializer.kind === typescript_1.default.SyntaxKind.TrueKeyword;
                    }
                    else if (key === 'attribute') {
                        if (typescript_1.default.isStringLiteral(p.initializer)) {
                            attribute = p.initializer.text;
                        }
                        else if (p.initializer.kind === typescript_1.default.SyntaxKind.FalseKeyword) {
                            attribute = ''; // no attribute binding
                        }
                    }
                }
            }
        }
        // Determine TypeScript type
        var tsType = void 0;
        if (member.type) {
            tsType = member.type.getText(sf);
        }
        else if (isBoolean) {
            tsType = 'boolean';
        }
        else if (isNumber) {
            tsType = 'number';
        }
        else {
            tsType = 'string';
        }
        props.push({ name: propName, tsType: tsType, attribute: attribute, reflect: reflect, isBoolean: isBoolean, isNumber: isNumber });
    }
    // 3. Find CustomEvent instantiations within this class body only
    var seenEvents = new Set();
    var events = [];
    function findEvents(n) {
        if (typescript_1.default.isNewExpression(n) &&
            typescript_1.default.isIdentifier(n.expression) &&
            n.expression.text === 'CustomEvent' &&
            n.arguments &&
            n.arguments.length > 0 &&
            typescript_1.default.isStringLiteral(n.arguments[0])) {
            var domName = n.arguments[0].text;
            // Skip internal events (prefixed with _)
            if (!domName.startsWith('_') && !seenEvents.has(domName)) {
                seenEvents.add(domName);
                events.push({
                    domName: domName,
                    reactProp: domEventToReactProp(domName),
                    constKey: eventConstKey(tagName, domName),
                });
            }
        }
        typescript_1.default.forEachChild(n, findEvents);
    }
    // Walk only within the class body to avoid cross-class pollution
    typescript_1.default.forEachChild(node, findEvents);
    return { tagName: tagName, className: className, props: props, events: events, sourceFile: sourceFile };
}
