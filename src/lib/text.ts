export type Token = {
  raw: string;
  word: string;
};

const defaultAbbrev = new Set([
  'mr',
  'mrs',
  'ms',
  'dr',
  'prof',
  'sr',
  'jr',
  'st',
  'vs',
  'etc',
]);

export function normalizeWhitespace(input: string) {
  return input.replace(/\s+/g, ' ').trim();
}

export function stripHtml(html: string): string {
  // Very small, safe-enough HTML -> text conversion for reader input.
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');

  const withoutTags = withoutScripts
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');

  const decoded = withoutTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return normalizeWhitespace(decoded.replace(/\n+/g, '\n'));
}

export function tokenizeText(text: string): Token[] {
  const cleaned = normalizeWhitespace(text);
  if (!cleaned) return [];

  // Split on spaces but keep punctuation attached to the token.
  const parts = cleaned.split(' ');
  return parts
    .map((p) => p.trim())
    .filter(Boolean)
    .map((raw) => {
      // Word part used for ORP calculation: remove leading/trailing punctuation.
      const word = raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
      return { raw, word: word || raw };
    });
}

export function isSentenceEnd(tokenRaw: string): boolean {
  const t = tokenRaw.trim();
  if (!t) return false;

  // Detect abbreviations like "Dr." and "etc." -> not end.
  const lower = t.toLowerCase();
  if (lower.endsWith('.')) {
    const core = lower.replace(/[^a-z.]/g, '').replace(/\.+$/g, '');
    if (defaultAbbrev.has(core)) return false;
    // Single-letter initials like "A." shouldn't count as end.
    if (/^[a-z]$/.test(core)) return false;
  }

  return /[.!?]["')\]]?$/.test(t);
}

export function computeORPIndex(word: string): number {
  // Spritz-like ORP (optimal recognition point)
  const len = word.length;
  if (len <= 1) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  if (len <= 13) return 3;
  return 4;
}

export function splitByORP(rawToken: string): { left: string; orp: string; right: string; orpIndex: number } {
  const raw = rawToken;
  const trimmed = raw.trim();
  if (!trimmed) return { left: '', orp: '', right: '', orpIndex: 0 };

  // Identify leading/trailing punctuation to keep visual stability.
  const leadingMatch = raw.match(/^[^\p{L}\p{N}]*/u);
  const trailingMatch = raw.match(/[^\p{L}\p{N}]*$/u);
  const leading = leadingMatch ? leadingMatch[0] : '';
  const trailing = trailingMatch ? trailingMatch[0] : '';

  const coreStart = leading.length;
  const coreEnd = raw.length - trailing.length;
  const core = raw.slice(coreStart, coreEnd) || raw;

  const orpInCore = computeORPIndex(core);
  const orpIndex = Math.min(coreStart + orpInCore, raw.length - 1);

  const left = raw.slice(0, orpIndex);
  const orp = raw.slice(orpIndex, orpIndex + 1);
  const right = raw.slice(orpIndex + 1);
  return { left, orp, right, orpIndex };
}

export function wpmToMs(wpm: number): number {
  const clamped = Math.max(50, Math.min(2000, wpm));
  return Math.round(60000 / clamped);
}

export function computeTokenDelayMs(baseMs: number, tokenRaw: string): number {
  // Add pauses for punctuation/sentence boundaries.
  const isEnd = isSentenceEnd(tokenRaw);
  const hasComma = /[,;:]["')\]]?$/.test(tokenRaw.trim());

  let mult = 1;
  if (hasComma) mult += 0.35;
  if (isEnd) mult += 0.9;

  // Longer tokens get a tiny extra time.
  const letters = tokenRaw.replace(/[^\p{L}\p{N}]/gu, '').length;
  if (letters >= 9) mult += 0.15;
  if (letters >= 13) mult += 0.25;

  return Math.round(baseMs * mult);
}
