import { useMemo } from 'react';
import { Gauge, Type, Link2, ClipboardPaste } from 'lucide-react';

export function ControlsPanel(props: {
  url: string;
  onUrlChange: (v: string) => void;
  onLoadUrl: () => void;
  loadingUrl: boolean;
  urlStatus?: { kind: 'ok' | 'error' | 'note'; message: string };

  wpm: number;
  onWpmChange: (v: number) => void;
  fontSize: number;
  onFontSizeChange: (v: number) => void;

  onPasteExample: () => void;
}) {
  const wpmLabel = useMemo(() => {
    if (props.wpm < 200) return 'Comfort';
    if (props.wpm < 350) return 'Fast';
    if (props.wpm < 500) return 'Very fast';
    return 'Blazing';
  }, [props.wpm]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <Link2 className="h-4 w-4 text-emerald-300" />
            Load text from a web page
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={props.url}
              onChange={(e) => props.onUrlChange(e.target.value)}
              placeholder="https://example.com/article"
              className="min-w-0 flex-1 rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            />
            <button
              onClick={props.onLoadUrl}
              disabled={props.loadingUrl}
              className="rounded-xl px-4 py-2 text-sm font-medium bg-emerald-400/15 hover:bg-emerald-400/20 border border-emerald-300/20 text-emerald-200 transition disabled:opacity-50"
            >
              {props.loadingUrl ? 'Loading…' : 'Load'}
            </button>
          </div>
          {props.urlStatus && (
            <div
              className={
                'mt-2 text-xs ' +
                (props.urlStatus.kind === 'error'
                  ? 'text-rose-200/90'
                  : props.urlStatus.kind === 'ok'
                    ? 'text-emerald-200/90'
                    : 'text-zinc-300/80')
              }
            >
              {props.urlStatus.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-zinc-100">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-emerald-300" />
                Speed
              </div>
              <div className="text-xs text-zinc-300/70">{props.wpm} WPM · {wpmLabel}</div>
            </div>
            <input
              type="range"
              min={300}
              max={1200}
              step={10}
              value={props.wpm}
              onChange={(e) => props.onWpmChange(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-zinc-100">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-emerald-300" />
                Font size
              </div>
              <div className="text-xs text-zinc-300/70">{props.fontSize}px</div>
            </div>
            <input
              type="range"
              min={28}
              max={92}
              step={1}
              value={props.fontSize}
              onChange={(e) => props.onFontSizeChange(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <div className="pt-1">
            <button
              onClick={props.onPasteExample}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 transition"
            >
              <ClipboardPaste className="h-4 w-4" />
              Paste example text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
