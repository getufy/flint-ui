let _counter = 0;

/** Returns a unique ID string like `flint-input-1`, `flint-input-2`, etc. */
export function generateId(prefix: string): string {
  return `${prefix}-${++_counter}`;
}
