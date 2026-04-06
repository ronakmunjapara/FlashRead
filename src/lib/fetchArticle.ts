import { stripHtml } from './text';

export type FetchResult = {
  ok: boolean;
  url: string;
  title?: string;
  text?: string;
  error?: string;
  note?: string;
};

export async function fetchArticleText(url: string): Promise<FetchResult> {
  const cleanedUrl = url.trim();
  if (!cleanedUrl) return { ok: false, url: cleanedUrl, error: 'Please enter a URL.' };

  // Use a public CORS-friendly readability proxy.
  // If the proxy is blocked for a site, user can still paste text manually.
  const endpoint = `https://r.jina.ai/http://${cleanedUrl.replace(/^https?:\/\//, '')}`;

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'text/html, text/plain;q=0.9, */*;q=0.8',
      },
    });

    if (!res.ok) {
      return {
        ok: false,
        url: cleanedUrl,
        error: `Fetch failed (${res.status}). Some sites block reading proxies. Paste text instead.`,
      };
    }

    const html = await res.text();
    const text = stripHtml(html);

    // Try to pull a title from the content.
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]) : undefined;

    return {
      ok: true,
      url: cleanedUrl,
      title,
      text,
      note: 'Loaded via a CORS-friendly proxy. If the article looks messy, try another source or paste text directly.'
    };
  } catch (e) {
    return {
      ok: false,
      url: cleanedUrl,
      error: e instanceof Error ? e.message : 'Unknown network error',
    };
  }
}
