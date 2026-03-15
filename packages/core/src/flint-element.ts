import { LitElement } from 'lit';

export class FlintElement extends LitElement {
  static dependencies: Record<string, typeof FlintElement> = {};

  static define(
    name: string,
    elementClass: typeof FlintElement = this as unknown as typeof FlintElement,
    options?: ElementDefinitionOptions
  ) {
    if (typeof customElements === 'undefined') return;
    const currentlyRegisteredClass = customElements.get(name);
    if (!currentlyRegisteredClass) {
      try {
        customElements.define(name, elementClass, options);
      } catch {
        // If registration fails (e.g. in test environments), log a warning
        customElements.define(
          name,
          class extends elementClass {} as unknown as CustomElementConstructor,
          options
        );
      }
    }
  }

  constructor() {
    super();
    // Auto-register dependencies
    const ctor = this.constructor as typeof FlintElement;
    for (const [name, depClass] of Object.entries(ctor.dependencies)) {
      (ctor as typeof FlintElement).define(name, depClass);
    }
  }
}
