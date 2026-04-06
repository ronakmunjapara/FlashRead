import { useEffect, useMemo, useRef } from 'react';
import { computeTokenDelayMs, splitByORP, wpmToMs, type Token } from '../lib/text';

export type ReaderSettings = {
  wpm: number;
  fontSize: number;
  pauseOnSentence: boolean;
};

export function Reader(props: {
  tokens: Token[];
  index: number;
  playing: boolean;
  settings: ReaderSettings;
  onIndexChange: (next: number) => void;
  onPlayingChange: (next: boolean) => void;
}) {
  const { tokens, index, playing, settings, onIndexChange, onPlayingChange } = props;
  const timerRef = useRef<number | null>(null);

  const token = tokens[index]?.raw ?? '';

  const parts = useMemo(() => splitByORP(token), [token]);

  useEffect(() => {
    if (!playing) return;
    if (tokens.length === 0) return;

    const base = wpmToMs(settings.wpm);
    const delay = computeTokenDelayMs(base, token);

    timerRef.current = window.setTimeout(() => {
      const next = index + 1;
      if (next >= tokens.length) {
        onPlayingChange(false);
        onIndexChange(Math.max(0, tokens.length - 1));
      } else {
        onIndexChange(next);
      }
    }, delay);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [playing, index, tokens.length, settings.wpm, token, onIndexChange, onPlayingChange]);

  // Keyboard controls
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === ' ') {
        e.preventDefault();
        onPlayingChange(!playing);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onPlayingChange(false);
        onIndexChange(Math.min(tokens.length - 1, index + 1));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPlayingChange(false);
        onIndexChange(Math.max(0, index - 1));
      }
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        onPlayingChange(false);
        onIndexChange(0);
      }
    }

    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', onKeyDown as any);
  }, [playing, index, tokens.length, onIndexChange, onPlayingChange]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_-30px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* ORP vertical line */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-emerald-300/70 to-transparent" />

        <div className="px-6 sm:px-10 py-10 sm:py-14">
          <div
            className="relative mx-auto grid grid-cols-[1fr_auto_1fr] items-baseline select-none"
            style={{ fontSize: settings.fontSize }}
            aria-label="Speed reader display"
          >
            <div className="text-right pr-0.5 text-zinc-200/90 tabular-nums">{parts.left}</div>
            <div className="px-0.5 font-semibold text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">{parts.orp || ' '}</div>
            <div className="text-left pl-0.5 text-zinc-200/90 tabular-nums">{parts.right}</div>

            {/* Invisible marker to ensure ORP is exactly centered */}
            <div className="pointer-events-none absolute inset-0 flex justify-center" aria-hidden="true">
              <div className="w-px" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 text-xs text-zinc-300/70">
            <div>
              <span className="text-zinc-200/90">{tokens.length ? index + 1 : 0}</span>
              <span className="mx-1">/</span>
              <span>{tokens.length}</span>
            </div>
            <div className="hidden sm:block">Space: play/pause · ←/→: step · R: restart</div>
            <div className="text-zinc-200/90">{settings.wpm} WPM</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          className="rounded-xl px-4 py-2 text-sm font-medium bg-emerald-400/15 hover:bg-emerald-400/20 border border-emerald-300/20 text-emerald-200 transition"
          onClick={() => onPlayingChange(!playing)}
          disabled={tokens.length === 0}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          className="rounded-xl px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 transition"
          onClick={() => {
            onPlayingChange(false);
            onIndexChange(0);
          }}
          disabled={tokens.length === 0}
        >
          Restart
        </button>
        <button
          className="rounded-xl px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 transition"
          onClick={() => {
            onPlayingChange(false);
            onIndexChange(Math.max(0, index - 10));
          }}
          disabled={tokens.length === 0}
        >
          -10
        </button>
        <button
          className="rounded-xl px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 transition"
          onClick={() => {
            onPlayingChange(false);
            onIndexChange(Math.min(tokens.length - 1, index + 10));
          }}
          disabled={tokens.length === 0}
        >
          +10
        </button>
      </div>
    </div>
  );
}
