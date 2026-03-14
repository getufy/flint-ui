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
}

export interface EventMeta {
    /** DOM event name, e.g. 'flint-switch-change' */
    domName: string;
    /** React event-handler prop name, e.g. 'onFlintSwitchChange' */
    reactProp: string;
    /** Key for the events constants object, e.g. 'CHANGE' */
    constKey: string;
}

export interface ComponentMeta {
    /** Custom-element tag name, e.g. 'flint-switch' */
    tagName: string;
    /** Class name, e.g. 'FlintSwitch' */
    className: string;
    props: PropMeta[];
    events: EventMeta[];
    /**
     * Source file path relative to project root (forward slashes),
     * e.g. 'src/switch/flint-switch.ts'
     */
    sourceFile: string;
}
