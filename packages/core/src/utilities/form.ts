/**
 * Convert form data to a plain object.
 * Multiple values with the same name become arrays.
 */
export function serialize(form: HTMLFormElement): Record<string, string | string[]> {
    const data = new FormData(form);
    const result: Record<string, string | string[]> = {};

    for (const [key, value] of data.entries()) {
        const str = String(value);
        const existing = result[key];
        if (existing === undefined) {
            result[key] = str;
        } else if (Array.isArray(existing)) {
            existing.push(str);
        } else {
            result[key] = [existing, str];
        }
    }

    return result;
}
