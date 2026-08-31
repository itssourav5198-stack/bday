import React from 'react';
import { motion } from 'motion/react';
import { GiftItem } from '../types/game';
import { Sparkles, Check, Lock, Gift as GiftIcon } from 'lucide-react';

interface GiftsTableProps {
  gifts: GiftItem[];
  hoveredGiftId: string | null;
  onOpenGift: (gift: GiftItem) => void;
  isAiming: boolean;
}

export const GiftsTable: React.FC<GiftsTableProps> = ({
  gifts,
  hoveredGiftId,
  onOpenGift,
  isAiming,
}) => {
  return (
    <div className="relative w-full h-full select-none">
      {/* Wooden Table Top Surface (Perspective trapezoid) */}
      <div 
        className="absolute inset-x-2 md:inset-x-6 top-8 bottom-0 rounded-2xl shadow-2xl border-t-4 border-amber-500/50 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #3e1e16 0%, #28120e 60%, #170907 100%)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 2px 15px rgba(251, 191, 36, 0.25)',
        }}
      >
        {/* Woodgrain Plank Lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div
              key={`plank-${i}`}
              className="w-full h-12 border-b border-amber-900/60"
              style={{ top: `${i * 12}%` }}
            />
          ))}
        </div>

        {/* Ambient Center Spotlight / Lamp Pool on Table */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-3/4 rounded-full pointer-events-none opacity-25 blur-2xl bg-amber-400"
        />

        {/* Velvet Table Cloth Runner Border */}
        <div className="absolute top-0 inset-x-8 h-2 bg-gradient-to-r from-red-800 via-rose-600 to-red-800 shadow-md" />
        <div className="absolute top-2 inset-x-10 h-0.5 bg-yellow-400/40" />

        {/* Ring Toss Target Circles around each gift (helpful aiming guide) */}
        {gifts.map((gift) => (
          <div
            key={`target-zone-${gift.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 flex items-center justify-center"
            style={{
              left: `${gift.tableX}%`,
              top: `${gift.tableY}%`,
              width: '100px',
              height: '56px',
            }}
          >
            <div
              className={`w-full h-full rounded-[50%] border-2 transition-all duration-300 ${
                hoveredGiftId === gift.id
                  ? 'border-yellow-300 bg-yellow-400/20 scale-110 shadow-[0_0_20px_rgba(253,224,71,0.6)]'
                  : isAiming
                  ? 'border-amber-400/40 border-dashed bg-amber-500/5'
                  : 'border-amber-600/20 border-dotted'
              }`}
            />
          </div>
        ))}
      </div>

      {/* The 7 Gift Boxes Positioned on the Table */}
      {gifts.map((gift) => {
        const isHovered = hoveredGiftId === gift.id;
        const isFinal = gift.type === 'final';

        return (
          <div
            key={gift.id}
            id={`gift-box-${gift.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 transition-transform duration-200"
            style={{
              left: `${gift.tableX}%`,
              top: `${gift.tableY}%`,
            }}
            onClick={() => {
              if (gift.isWon) {
                onOpenGift(gift);
              }
            }}
          >
            {/* Box Shadow on Table */}
            <div
              className={`absolute top-[75%] left-1/2 -translate-x-1/2 rounded-[50%] blur-sm pointer-events-none transition-all duration-300 ${
                isFinal ? 'w-28 h-10 bg-black/70' : 'w-20 h-8 bg-black/60'
              }`}
            />

            {/* Gift Box Container */}
            <motion.div
              animate={{
                y: isHovered ? -6 : 0,
                scale: isHovered ? 1.06 : 1,
              }}
              className="relative flex flex-col items-center"
            >
              {/* Floating Sparkles & Halo for Final Gift or Won Gifts */}
              {isFinal && (
                <div className="absolute -top-6 -inset-x-4 h-24 bg-gradient-to-t from-transparent via-amber-400/25 to-yellow-300/10 rounded-full blur-md pointer-events-none animate-pulse" />
              )}

              {/* Status Badge Pill (Locked / Won / Final) */}
              <div className="mb-1 flex items-center gap-1 z-20">
                <span
                  className={`px-2 py-0.5 text-[10px] md:text-xs font-semibold rounded-full shadow-md flex items-center gap-1 border transition-all ${
                    gift.isWon
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 shadow-emerald-900/50'
                      : isFinal
                      ? 'bg-amber-950/95 text-amber-300 border-yellow-400/80 animate-bounce'
                      : 'bg-amber-950/80 text-amber-300/80 border-amber-700/40'
                  }`}
                >
                  {gift.isWon ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>WON ✓</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 opacity-70" />
                      <span>{gift.tag}</span>
                    </>
                  )}
                </span>
              </div>

              {/* 3D Gift Box Body */}
              <div
                className={`relative rounded-xl border-2 shadow-xl overflow-hidden transition-all duration-300 ${
                  gift.colorTheme.boxBorder
                } ${
                  isFinal
                    ? 'w-22 h-20 md:w-26 md:h-24 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 shadow-yellow-500/30 ring-2 ring-yellow-300/60'
                    : `w-18 h-16 md:w-20 md:h-18 bg-gradient-to-br ${gift.colorTheme.boxGradient}`
                } ${
                  gift.isWon
                    ? 'ring-2 ring-emerald-400/70 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                    : isHovered
                    ? 'ring-2 ring-yellow-300 shadow-[0_0_25px_rgba(253,224,71,0.5)]'
                    : ''
                }`}
              >
                {/* Decorative Box Lid Lip */}
                <div className="w-full h-3 bg-white/20 border-b border-black/20" />

                {/* Vertical Ribbon */}
                <div
                  className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-5 ${gift.colorTheme.ribbonColor} shadow-inner flex items-center justify-center`}
                >
                  <div className="w-0.5 h-full bg-white/30" />
                </div>

                {/* Horizontal Ribbon */}
                <div
                  className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3.5 md:h-4 ${gift.colorTheme.ribbonSecondary} shadow-inner flex items-center justify-center`}
                >
                  <div className="w-full h-0.5 bg-white/30" />
                </div>

                {/* Ribbon Bow / Knot on Top */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div
                    className={`w-5 h-5 rounded-full ${gift.colorTheme.ribbonColor} border border-yellow-200/50 shadow-md flex items-center justify-center`}
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-200/70" />
                  </div>
                </div>

                {/* Specular Highlight Gloss */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

                {/* Final Box Special Crown/Stars Icon */}
                {isFinal && (
                  <div className="absolute bottom-1 right-1 opacity-70">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-100 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                )}
              </div>

              {/* Title label underneath box */}
              <div className="mt-1 text-center max-w-[110px] pointer-events-none">
                <p className="text-[11px] md:text-xs font-serif font-medium text-amber-100 drop-shadow-md truncate">
                  {gift.title}
                </p>
              </div>

              {/* Quick Action Button for Won Gifts */}
              {gift.isWon && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGift(gift);
                  }}
                  className="mt-1 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] md:text-[11px] font-bold rounded-full shadow-lg border border-yellow-200/60 flex items-center gap-1 animate-pulse"
                >
                  <GiftIcon className="w-3 h-3" />
                  <span>{gift.isOpen ? 'Re-open' : 'OPEN GIFT'}</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
