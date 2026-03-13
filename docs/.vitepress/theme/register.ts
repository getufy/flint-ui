// Shared promise that resolves when all Lit components are registered.
// Demo.vue awaits this before injecting HTML via innerHTML.
export const componentsReady: Promise<void> =
  typeof window !== 'undefined'
    ? import('storybook-lit').then(() => {})
    : Promise.resolve();
