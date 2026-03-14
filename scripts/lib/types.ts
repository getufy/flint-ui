export interface PropMeta {
    /** camelCase property name as declared in the class */
    name: string;
    /** TypeScript type string, e.g. "'primary' | 'secondary'" or "boolean" */
    tsType: string;
    /** HTML attribute name (kebab-case). Empty string means attribute is disabled. */
    attribute: string;
    reflect: boolean;
    isBoolean: boolean;
    isNumber: boolean;
    /** Default value as source text, e.g. "'primary'" or "false" */
    defaultValue: string;
    /** JSDoc description (first line), if any */
    description: string;
}

export interface EventMeta {
    /** DOM event name, e.g. 'flint-switch-change' */
    domName: string;
    /** React event-handler prop name, e.g. 'onFlintSwitchChange' */
    reactProp: string;
    /** Key for the events constants object, e.g. 'CHANGE' */
    constKey: string;
    /** Description from @fires JSDoc tag */
    description: string;
}

export interface SlotMeta {
    /** Slot name (empty string for the default slot) */
    name: string;
    /** Description from @slot JSDoc tag */
    description: string;
}

export interface CssPropertyMeta {
    /** CSS custom property name, e.g. '--flint-primary-color' */
    name: string;
    /** Default value if declared, or '—' */
    defaultValue: string;
}

export interface MethodMeta {
    /** Method signature, e.g. 'inputElement(): HTMLInputElement' */
    signature: string;
    /** JSDoc description */
    description: string;
}

export interface ComponentMeta {
    /** Custom-element tag name, e.g. 'flint-switch' */
    tagName: string;
    /** Class name, e.g. 'FlintSwitch' */
    className: string;
    /** Class-level JSDoc description (first paragraph) */
    description: string;
    props: PropMeta[];
    events: EventMeta[];
    slots: SlotMeta[];
    cssProperties: CssPropertyMeta[];
    methods: MethodMeta[];
    /**
     * Source file path relative to project root (forward slashes),
     * e.g. 'src/switch/flint-switch.ts'
     */
    sourceFile: string;
}
