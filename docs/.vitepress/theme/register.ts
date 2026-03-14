// Shared promise that resolves when all Lit components are registered.
// Demo.vue awaits this before injecting HTML via innerHTML.
export const componentsReady: Promise<void> =
  typeof window !== 'undefined'
    ? import('@getufy/flint-ui').then((m) => {
        // Expose toast on window so inline onclick handlers can use it
        // (dynamic import('@getufy/flint-ui') in innerHTML doesn't resolve Vite aliases)
        (window as any).__storybook_lit = m;
      })
    : Promise.resolve();
