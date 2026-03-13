"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeImport = relativeImport;
exports.generateEventsFile = generateEventsFile;
exports.generateWrapper = generateWrapper;
exports.generateIndex = generateIndex;
exports.generateEventsIndex = generateEventsIndex;
exports.generateJsxDeclarations = generateJsxDeclarations;
// ─── helpers ────────────────────────────────────────────────────────────────
/**
 * Build the relative path from an output file to the source file.
 *
 * outDir:    'react/src/components'
 * sourceFile: 'src/switch/ui-switch.ts'  (relative to project root)
 * → '../../../src/switch/ui-switch.js'
 */
function relativeImport(fromDir, toFile) {
    var fromParts = fromDir.split('/');
    var toParts = toFile.replace(/\.ts$/, '.js').split('/');
    var common = 0;
    while (common < fromParts.length &&
        common < toParts.length &&
        fromParts[common] === toParts[common]) {
        common++;
    }
    var ups = fromParts.length - common;
    var downs = toParts.slice(common);
    var prefix = ups === 0 ? './' : '../'.repeat(ups);
    return prefix + downs.join('/');
}
// ─── event constants file ────────────────────────────────────────────────────
/**
 * Generate the content of `react/src/events/<tagname>.ts`.
 * Contains a const object mapping short keys → DOM event name strings.
 *
 * Example output:
 *   export const UiSwitchEvents = {
 *     CHANGE: 'ui-switch-change',
 *   } as const;
 */
function generateEventsFile(meta) {
    if (meta.events.length === 0)
        return '';
    var constName = meta.className + 'Events';
    var entries = meta.events
        .map(function (e) { return "    ".concat(e.constKey, ": '").concat(e.domName, "',"); })
        .join('\n');
    return ("// Auto-generated \u2014 do not edit\n" +
        "export const ".concat(constName, " = {\n").concat(entries, "\n} as const;\n"));
}
// ─── React wrapper component ─────────────────────────────────────────────────
/**
 * Generate the content of `react/src/components/<ClassName>.tsx`.
 *
 * Produces a fully typed React.forwardRef wrapper that:
 * - Imports and side-effect-registers the Lit custom element
 * - Syncs all @property values using useEffect
 * - Attaches/detaches custom event listeners using useEffect
 */
function generateWrapper(meta, 
/** outDir relative to project root, e.g. 'react/src/components' */
outDir, 
/** events outDir relative to project root, e.g. 'react/src/events' */
eventsDir) {
    var tagName = meta.tagName, className = meta.className, props = meta.props, events = meta.events, sourceFile = meta.sourceFile;
    var srcImport = relativeImport(outDir, sourceFile);
    var hasEvents = events.length > 0;
    var eventsConstName = className + 'Events';
    var eventsImport = hasEvents
        ? relativeImport(outDir, "".concat(eventsDir, "/").concat(tagName, ".ts"))
        : null;
    // Build props interface
    var propLines = props.map(function (p) { return "    ".concat(p.name, "?: ").concat(p.tsType, ";"); });
    var eventLines = events.map(function (e) { return "    ".concat(e.reactProp, "?: (event: CustomEvent) => void;"); });
    // Names of all Lit-specific prop keys (to destructure from incoming props)
    var litPropNames = props.map(function (p) { return p.name; });
    var eventPropNames = events.map(function (e) { return e.reactProp; });
    // Property sync effect deps
    var propDeps = litPropNames.length > 0 ? "[".concat(litPropNames.join(', '), "]") : '[]';
    // Property sync body
    var propSyncLines = props.map(function (p) { return "        if (".concat(p.name, " !== undefined) (el as unknown as ").concat(className, "Element).").concat(p.name, " = ").concat(p.name, ";"); });
    // Event listener useEffect blocks (one per event for clean deps)
    var eventEffects = events.map(function (e) {
        var evRef = hasEvents ? "".concat(eventsConstName, ".").concat(e.constKey) : "'".concat(e.domName, "'");
        return ("    React.useEffect(() => {\n" +
            "        const el = elRef.current;\n" +
            "        if (!el || !".concat(e.reactProp, ") return;\n") +
            "        const fn = ".concat(e.reactProp, " as EventListener;\n") +
            "        el.addEventListener(".concat(evRef, ", fn);\n") +
            "        return () => el.removeEventListener(".concat(evRef, ", fn);\n") +
            "    }, [".concat(e.reactProp, "]);\n"));
    });
    // Destructure list for the forwardRef body
    var allDestructured = __spreadArray(__spreadArray(__spreadArray([], litPropNames, true), eventPropNames, true), ['children', '...htmlProps'], false);
    var lines = [];
    lines.push("// Auto-generated by scripts/generate-react-wrappers.ts \u2014 do not edit");
    lines.push("// Source: ".concat(sourceFile));
    lines.push('');
    lines.push("import React from 'react';");
    lines.push("import type { ".concat(className, " as ").concat(className, "Element } from '").concat(srcImport, "';"));
    if (hasEvents && eventsImport) {
        lines.push("import { ".concat(eventsConstName, " } from '").concat(eventsImport, "';"));
    }
    lines.push("// Register the custom element");
    lines.push("import '".concat(srcImport, "';"));
    lines.push('');
    // Props interface
    if (propLines.length > 0 || eventLines.length > 0) {
        lines.push("export interface ".concat(className, "Props extends React.HTMLAttributes<HTMLElement> {"));
        propLines.forEach(function (l) { return lines.push(l); });
        eventLines.forEach(function (l) { return lines.push(l); });
        lines.push("}");
    }
    else {
        lines.push("export type ".concat(className, "Props = React.HTMLAttributes<HTMLElement>;"));
    }
    lines.push('');
    // forwardRef component
    lines.push("export const ".concat(className, " = React.forwardRef<").concat(className, "Element, ").concat(className, "Props>("));
    lines.push("    function ".concat(className, "("));
    lines.push("        { ".concat(allDestructured.join(', '), " }: ").concat(className, "Props,"));
    lines.push("        ref: React.ForwardedRef<".concat(className, "Element>,"));
    lines.push("    ) {");
    lines.push("        const innerRef = React.useRef<".concat(className, "Element>(null);"));
    lines.push("        const elRef = (ref as React.RefObject<".concat(className, "Element>) ?? innerRef;"));
    lines.push('');
    // Prop sync effect
    if (propSyncLines.length > 0) {
        lines.push("        React.useEffect(() => {");
        lines.push("            const el = elRef.current;");
        lines.push("            if (!el) return;");
        propSyncLines.forEach(function (l) { return lines.push(l); });
        lines.push("        }, ".concat(propDeps, ");"));
        lines.push('');
    }
    // Event effects
    eventEffects.forEach(function (block) {
        // Indent the block by 4 spaces (it already has 4 at the start)
        block.split('\n').forEach(function (l) { return lines.push('    ' + l); });
    });
    // JSX return — React 19 passes props to custom elements natively
    lines.push("        return (");
    lines.push("            <".concat(tagName, " ref={elRef} {...htmlProps}>"));
    lines.push("                {children}");
    lines.push("            </".concat(tagName, ">"));
    lines.push("        );");
    lines.push("    },");
    lines.push(");");
    lines.push('');
    lines.push("".concat(className, ".displayName = '").concat(className, "';"));
    lines.push('');
    return lines.join('\n');
}
// ─── barrel index ────────────────────────────────────────────────────────────
/** Generate `react/src/index.ts` re-exporting all components and events. */
function generateIndex(components) {
    var lines = [
        "// Auto-generated by scripts/generate-react-wrappers.ts \u2014 do not edit",
        '',
    ];
    // De-duplicate class names (multiple files could share a class name in edge cases)
    var seen = new Set();
    for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
        var c = components_1[_i];
        if (seen.has(c.className))
            continue;
        seen.add(c.className);
        lines.push("export { ".concat(c.className, ", type ").concat(c.className, "Props } from './components/").concat(c.className, ".js';"));
    }
    lines.push('');
    lines.push("export * from './events/index.js';");
    lines.push('');
    return lines.join('\n');
}
/** Generate `react/src/events/index.ts` re-exporting all event constants. */
function generateEventsIndex(components) {
    var lines = [
        "// Auto-generated by scripts/generate-react-wrappers.ts \u2014 do not edit",
        '',
    ];
    var seen = new Set();
    for (var _i = 0, components_2 = components; _i < components_2.length; _i++) {
        var c = components_2[_i];
        if (c.events.length === 0)
            continue;
        if (seen.has(c.tagName))
            continue;
        seen.add(c.tagName);
        lines.push("export { ".concat(c.className, "Events } from './").concat(c.tagName, ".js';"));
    }
    lines.push('');
    return lines.join('\n');
}
/**
 * Generate `react/src/custom-elements.d.ts`.
 * Augments the JSX namespace so TypeScript accepts custom-element tags.
 */
function generateJsxDeclarations(components) {
    var lines = [
        "// Auto-generated by scripts/generate-react-wrappers.ts \u2014 do not edit",
        "import React from 'react';",
        '',
        "declare global {",
        "    namespace JSX {",
        "        interface IntrinsicElements {",
    ];
    var seen = new Set();
    for (var _i = 0, components_3 = components; _i < components_3.length; _i++) {
        var c = components_3[_i];
        if (seen.has(c.tagName))
            continue;
        seen.add(c.tagName);
        lines.push("            '".concat(c.tagName, "': React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<unknown> };"));
    }
    lines.push("        }");
    lines.push("    }");
    lines.push("}");
    lines.push('');
    return lines.join('\n');
}
