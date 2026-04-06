import { useMemo, useState } from 'react';
import { ControlsPanel } from './components/ControlsPanel';
import { Reader } from './components/Reader';
import { fetchArticleText } from './lib/fetchArticle';
import { tokenizeText } from './lib/text';

const EXAMPLE =
  `Speed reading works best when your eyes don't jump around.\n\n` +
  `This app flashes one word at a time and highlights the middle character (ORP) right on a vertical center line. ` +
  `Start at 300 WPM and increase as you feel comfortable.`;

export default function App() {
  const [rawText, setRawText] = useState<string>(EXAMPLE);
  const [url, setUrl] = useState<string>('');
  const [urlStatus, setUrlStatus] = useState<
    { kind: 'ok' | 'error' | 'note'; message: string } | undefined
  >(undefined);
  const [loadingUrl, setLoadingUrl] = useState(false);

  const [wpm, setWpm] = useState(350);
  const [fontSize, setFontSize] = useState(56);

  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  const tokens = useMemo(() => tokenizeText(rawText), [rawText]);

  async function loadFromUrl() {
    setPlaying(false);
    setIndex(0);
    setUrlStatus(undefined);
    setLoadingUrl(true);
    const res = await fetchArticleText(url);
    setLoadingUrl(false);

    if (!res.ok) {
      setUrlStatus({ kind: 'error', message: res.error || 'Failed to load.' });
      return;
    }

    setRawText(res.text || '');
    if (res.note) setUrlStatus({ kind: 'note', message: res.note });
    else setUrlStatus({ kind: 'ok', message: 'Loaded.' });
  }

  return (
    <div className="min-h-dvh bg-[#070a12] text-zinc-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_50%_-10%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(900px_500px_at_20%_80%,rgba(59,130,246,0.12),transparent_60%)]" />

      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                <div className="h-6 w-px bg-emerald-300/80" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight">FlashRead</div>
                <div className="text-xs text-zinc-300/70">ORP-aligned speed reader (300+ WPM)</div>
              </div>
            </div>
            <div className="text-xs text-zinc-300/70 hidden sm:block">
              Tip: press <span className="text-zinc-100">Space</span> to play/pause
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <section className="order-2 lg:order-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Paste your content</div>
                  <div className="text-xs text-zinc-300/70">Words will be flashed one-by-one with the middle character on the center line.</div>
                </div>
                <div className="text-xs text-zinc-300/70">{tokens.length} words</div>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => {
                  setRawText(e.target.value);
                  setPlaying(false);
                  setIndex(0);
                }}
                className="mt-3 h-56 w-full resize-y rounded-xl bg-black/20 border border-white/10 px-3 py-3 text-sm leading-6 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                placeholder="Paste long text here…"
              />
            </div>

            <div className="mt-4">
              <ControlsPanel
                url={url}
                onUrlChange={setUrl}
                onLoadUrl={loadFromUrl}
                loadingUrl={loadingUrl}
                urlStatus={urlStatus}
                wpm={wpm}
                onWpmChange={(v) => {
                  setWpm(v);
                }}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                onPasteExample={() => {
                  setRawText(EXAMPLE);
                  setPlaying(false);
                  setIndex(0);
                  setUrlStatus(undefined);
                }}
              />
            </div>
          </section>

          <section className="order-1 lg:order-2">
            <Reader
              tokens={tokens}
              index={Math.min(index, Math.max(0, tokens.length - 1))}
              playing={playing}
              settings={{ wpm, fontSize, pauseOnSentence: true }}
              onIndexChange={setIndex}
              onPlayingChange={setPlaying}
            />

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-zinc-300/75">
              <div className="font-semibold text-zinc-100">How it works</div>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Vertical line stays fixed in the center.</li>
                <li>The highlighted middle character (ORP) is placed on that line, reducing eye movement.</li>
                <li>Commas and sentence endings add a small pause automatically.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
