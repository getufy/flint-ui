/**
 * Fuzzy scoring algorithm for command palette filtering.
 *
 * Scores a `text` against a `query` by finding how well the query characters
 * match within the text. Higher scores mean better matches.
 *
 * Scoring tiers (from best to worst):
 * 1. **Exact match** — text equals query
 * 2. **Prefix match** — text starts with query
 * 3. **Substring match** — query appears as contiguous substring
 * 4. **Fuzzy match** — query characters appear in order with gaps allowed
 *    - Consecutive character runs score higher
 *    - Matches at word boundaries (after `-`, `_`, space, or camelCase) score higher
 *    - Matches at the start of text score higher
 *    - Shorter texts rank higher for equivalent matches (less noise)
 * 5. **No match** — returns -1
 *
 * Both `text` and `query` are compared case-insensitively.
 *
 * @param text  - The candidate string to score (e.g. item value / label).
 * @param query - The search query typed by the user.
 * @returns A numeric score (higher = better match), or -1 if no match.
 */
export function fuzzyScore(text: string, query: string): number {
    if (query === '') return 1;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // Tier 1: exact match
    if (lowerText === lowerQuery) return 10000;

    // Tier 2: prefix match — text starts with query
    if (lowerText.startsWith(lowerQuery)) {
        // Shorter texts rank higher (more specific match)
        return 5000 + (1000 / text.length);
    }

    // Tier 3: contiguous substring match
    const substringIdx = lowerText.indexOf(lowerQuery);
    if (substringIdx !== -1) {
        // Reward word-boundary aligned substrings
        const atBoundary = substringIdx === 0 || _isWordBoundary(text, substringIdx);
        return 2000 + (atBoundary ? 500 : 0) + (1000 / text.length);
    }

    // Tier 4: fuzzy character-by-character matching
    return _fuzzyCharScore(lowerText, lowerQuery, text);
}

/**
 * Check if position `i` in `text` is a word boundary.
 * A word boundary is preceded by a separator (`-`, `_`, ` `) or is a
 * lowercase→uppercase transition (camelCase).
 */
function _isWordBoundary(text: string, i: number): boolean {
    if (i === 0) return true;
    const prev = text[i - 1]!;
    if (prev === '-' || prev === '_' || prev === ' ') return true;
    // camelCase boundary: lowercase followed by uppercase
    const curr = text[i]!;
    if (prev === prev.toLowerCase() && curr === curr.toUpperCase() && curr !== curr.toLowerCase()) {
        return true;
    }
    return false;
}

/**
 * Character-by-character fuzzy scorer.
 * Walks through `lowerText` trying to match each character of `lowerQuery`
 * in order. Awards bonuses for:
 * - Consecutive runs of matched characters
 * - Matches at word boundaries
 * - Matches near the start of text
 */
function _fuzzyCharScore(lowerText: string, lowerQuery: string, originalText: string): number {
    let ti = 0;
    let qi = 0;
    let score = 0;
    let consecutive = 0;

    while (ti < lowerText.length && qi < lowerQuery.length) {
        if (lowerText[ti] === lowerQuery[qi]) {
            qi++;
            consecutive++;

            // Base score per matched character
            let charScore = 1;

            // Bonus: consecutive matches (accelerating)
            charScore += consecutive * 3;

            // Bonus: match at word boundary
            if (_isWordBoundary(originalText, ti)) {
                charScore += 10;
            }

            // Bonus: match near start of text (first 5 chars get bonus)
            if (ti < 5) {
                charScore += 5 - ti;
            }

            score += charScore;
        } else {
            consecutive = 0;
        }
        ti++;
    }

    // All query characters must be matched
    if (qi < lowerQuery.length) return -1;

    // Bonus for shorter texts (more specific match)
    score += 100 / lowerText.length;

    return score;
}
