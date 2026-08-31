import React from 'react';
import { GiftItem } from '../types/game';
import { Volume2, VolumeX, Settings, RotateCcw, Check, Sparkles } from 'lucide-react';

interface HUDProps {
  gifts: GiftItem[];
  attempts: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSettings: () => void;
  onResetGame: () => void;
  onOpenFinaleDirect: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  gifts,
  attempts,
  isMuted,
  onToggleMute,
  onOpenSettings,
  onResetGame,
  onOpenFinaleDirect,
}) => {
  const wonCount = gifts.filter((g) => g.isWon).length;
  const totalCount = gifts.length;
  const allWon = wonCount === totalCount;

  return (
    <header className="relative w-full z-40 px-3 md:px-6 pt-3 pb-2 flex flex-col md:flex-row justify-between items-center gap-2 select-none pointer-events-auto">
      {/* Stall Banner Title */}
      <div className="flex items-center gap-2">
        <div className="px-3 py-1 bg-amber-950/85 border border-amber-500/50 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-2">
          <span className="text-base md:text-lg">🎪</span>
          <span className="font-mela font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-rose-300 text-sm md:text-base tracking-wide">
            MERI CHHOTI SI MELA ❤️
          </span>
        </div>
      </div>

      {/* Progress & Stat Badges */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Gifts Won Indicator */}
        <div className="px-3 py-1 bg-amber-950/85 border border-amber-500/50 rounded-xl text-xs md:text-sm font-semibold text-amber-200 flex items-center gap-1.5 shadow-md backdrop-blur-md">
          <span>GIFTS WON:</span>
          <span className="text-yellow-300 font-bold">{wonCount} / {totalCount}</span>
          <div className="flex items-center gap-0.5 ml-1">
            {gifts.map((g) => (
              <span
                key={`badge-${g.id}`}
                title={`${g.tag}: ${g.title}`}
                className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] transition-all ${
                  g.isWon
                    ? 'bg-emerald-500 text-black font-bold shadow-xs'
                    : 'bg-amber-900/60 border border-amber-700/60 text-amber-500'
                }`}
              >
                {g.isWon ? '✓' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Attempts */}
        <div className="px-2.5 py-1 bg-amber-950/85 border border-amber-600/40 rounded-xl text-xs text-amber-300/80 shadow-md backdrop-blur-md">
          Throws: <span className="font-bold text-amber-100">{attempts}</span>
        </div>

        {/* All Won Celebration Shortcut */}
        {allWon && (
          <button
            onClick={onOpenFinaleDirect}
            className="px-3 py-1 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white rounded-xl text-xs font-bold shadow-lg border border-yellow-200 flex items-center gap-1 animate-pulse cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grand Finale</span>
          </button>
        )}

        {/* Mute / Unmute Button */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute sound & music' : 'Mute sound & music'}
          className={`p-2 rounded-xl border transition-all cursor-pointer shadow-md backdrop-blur-md ${
            isMuted
              ? 'bg-red-950/80 border-red-500/50 text-red-300 hover:bg-red-900'
              : 'bg-amber-950/80 border-amber-500/50 text-yellow-300 hover:bg-amber-900'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Customization Settings Modal Button */}
        <button
          onClick={onOpenSettings}
          title="Personalize game photos & messages"
          className="p-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/50 transition-all cursor-pointer shadow-md backdrop-blur-md"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Reset Game Progress Button */}
        <button
          onClick={onResetGame}
          title="Reset game progress"
          className="p-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300/80 hover:text-amber-100 border border-amber-700/40 transition-all cursor-pointer shadow-md backdrop-blur-md"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
