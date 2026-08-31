import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GiftItem } from '../types/game';
import { sound } from '../audio/soundEngine';
import { 
  X, 
  Sparkles, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Gift as GiftIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftModalProps {
  gift: GiftItem | null;
  onClose: () => void;
  onOpenFinalFinale: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({
  gift,
  onClose,
  onOpenFinalFinale,
}) => {
  const [openingState, setOpeningState] = useState<'closed' | 'opening' | 'revealed'>('closed');
  const [currentAlbumIdx, setCurrentAlbumIdx] = useState<number>(0);

  useEffect(() => {
    if (gift) {
      // If already opened previously, jump straight to revealed, otherwise play opening ceremony
      if (gift.isOpen) {
        setOpeningState('revealed');
      } else {
        setOpeningState('opening');
        sound.playRibbonUntie();

        const t1 = setTimeout(() => {
          sound.playBoxOpen();
          try {
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#f59e0b', '#ec4899', '#ef4444', '#10b981', '#fbbf24']
            });
          } catch {
            // Safe fallback
          }
          setOpeningState('revealed');
        }, 1100);

        return () => clearTimeout(t1);
      }
    } else {
      setOpeningState('closed');
      setCurrentAlbumIdx(0);
    }
  }, [gift]);

  if (!gift) return null;

  const isFinal = gift.type === 'final';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none overflow-y-auto">
        {/* Backdrop Dark Tint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-amber-950 via-[#230d1e] to-[#140612] border-2 border-amber-500/50 rounded-3xl p-5 md:p-8 shadow-[0_0_60px_rgba(245,158,11,0.25)] text-amber-50 z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-amber-300 hover:text-white border border-amber-600/40 transition-colors z-30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* OPENING ANIMATION PHASE */}
          {openingState === 'opening' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{
                  rotate: [-3, 3, -3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="relative w-28 h-28 md:w-32 md:h-32 mb-6"
              >
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse" />
                {/* Box body */}
                <div
                  className={`w-full h-full rounded-2xl border-2 ${gift.colorTheme.boxBorder} bg-gradient-to-br ${gift.colorTheme.boxGradient} shadow-2xl flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="w-6 h-full bg-yellow-300/80 shadow-inner" />
                  <div className="h-6 w-full bg-yellow-400/80 shadow-inner absolute" />
                  <Sparkles className="w-8 h-8 text-yellow-100 z-10 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </motion.div>

              <h3 className="text-xl md:text-2xl font-display font-bold text-amber-200 animate-pulse">
                Untying the ribbons... ✨
              </h3>
              <p className="text-xs md:text-sm text-amber-400/80 mt-1 font-serif">
                Unlocking your special surprise
              </p>
            </div>
          )}

          {/* REVEALED CONTENT PHASE */}
          {openingState === 'revealed' && (
            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-amber-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                    {gift.tag}
                  </span>
                  <h2 className="text-lg md:text-xl font-display font-bold text-amber-100">
                    {gift.title}
                  </h2>
                </div>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>

              {/* DYNAMIC CONTENT PER TYPE */}

              {/* 1. PHOTO TYPE */}
              {gift.type === 'photo' && gift.content.image && (
                <div className="space-y-4">
                  {/* Polaroid Frame */}
                  <div className="bg-[#fef9ee] p-3 md:p-4 rounded-xl shadow-2xl text-amber-950 border border-amber-200">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-amber-900/10">
                      <img
                        src={gift.content.image}
                        alt={gift.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="pt-3 pb-1 flex justify-between items-center text-xs md:text-sm font-handwritten text-stone-700">
                      <span className="text-base md:text-lg font-bold">{gift.content.date || "Cherished Memory"}</span>
                      {gift.content.location && (
                        <span className="flex items-center gap-1 opacity-80">
                          <MapPin className="w-3.5 h-3.5" />
                          {gift.content.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {gift.content.message && (
                    <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/40">
                      <p className="text-sm md:text-base text-amber-100 font-serif leading-relaxed">
                        {gift.content.message}
                      </p>
                    </div>
                  )}

                  {gift.content.specialNote && (
                    <p className="text-xs md:text-sm text-center text-rose-300 italic font-serif">
                      {gift.content.specialNote}
                    </p>
                  )}
                </div>
              )}

              {/* 2. LOVE MESSAGE TYPE */}
              {gift.type === 'message' && (
                <div className="space-y-4 text-center py-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-500 to-red-700 border-2 border-yellow-300/80 shadow-lg flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-yellow-200">
                    {gift.content.headline || "I LOVE YOU ❤️"}
                  </h3>

                  <div className="p-5 md:p-6 rounded-2xl bg-rose-950/50 border border-rose-600/40 shadow-inner">
                    <p className="text-sm md:text-base text-rose-100/90 font-serif leading-relaxed whitespace-pre-line">
                      {gift.content.message}
                    </p>
                  </div>

                  {gift.content.specialNote && (
                    <div className="px-4 py-2 bg-amber-500/15 rounded-xl border border-amber-400/30">
                      <p className="text-xs md:text-sm text-amber-200 font-serif italic">
                        {gift.content.specialNote}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 3. MEMORY TYPE */}
              {gift.type === 'memory' && (
                <div className="space-y-4">
                  {gift.content.image && (
                    <div className="relative h-44 md:h-52 w-full rounded-2xl overflow-hidden shadow-lg border border-amber-500/40">
                      <img
                        src={gift.content.image}
                        alt={gift.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-xs bg-amber-500/90 text-amber-950 font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                          {gift.content.date || "Special Memory"}
                        </span>
                        <h4 className="text-base md:text-lg font-display font-semibold">
                          {gift.content.headline}
                        </h4>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-600/40 space-y-2">
                    <p className="text-sm md:text-base text-amber-100 font-serif leading-relaxed">
                      {gift.content.message}
                    </p>
                  </div>

                  {gift.content.specialNote && (
                    <p className="text-xs md:text-sm text-center text-amber-300 italic font-serif">
                      {gift.content.specialNote}
                    </p>
                  )}
                </div>
              )}

              {/* 4. PHOTO ALBUM TYPE */}
              {gift.type === 'album' && gift.content.images && gift.content.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/50 bg-black">
                    <img
                      src={gift.content.images[currentAlbumIdx].url}
                      alt={`Memory ${currentAlbumIdx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Album Navigation Buttons */}
                    {gift.content.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentAlbumIdx((prev) =>
                              prev === 0 ? gift.content.images!.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentAlbumIdx((prev) =>
                              (prev + 1) % gift.content.images!.length
                            )
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Image Counter Badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-amber-300 text-xs font-semibold rounded-full border border-amber-500/30">
                      {currentAlbumIdx + 1} / {gift.content.images.length}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-700/40 text-center">
                    <p className="text-xs md:text-sm text-amber-100 font-serif italic">
                      “{gift.content.images[currentAlbumIdx].caption}”
                    </p>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-1.5 pt-1">
                    {gift.content.images.map((_, idx) => (
                      <button
                        key={`dot-${idx}`}
                        onClick={() => setCurrentAlbumIdx(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentAlbumIdx === idx ? 'w-6 bg-amber-400' : 'w-2 bg-amber-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 5. LETTER TYPE */}
              {gift.type === 'letter' && gift.content.letterBody && (
                <div className="bg-[#fcf5e5] text-amber-950 p-5 md:p-7 rounded-2xl shadow-2xl border-2 border-amber-300/80 relative overflow-hidden font-serif">
                  {/* Parchment texture effect */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-300/30 to-transparent pointer-events-none" />

                  <div className="space-y-3 font-handwritten text-lg md:text-xl text-stone-800 leading-relaxed max-h-[300px] overflow-y-auto pr-2 scrollable-content">
                    {gift.content.letterBody.map((paragraph, pIdx) => (
                      <p key={`para-${pIdx}`} className={pIdx === 0 ? "font-bold text-xl md:text-2xl text-rose-900" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {gift.content.signature && (
                    <div className="mt-4 pt-3 border-t border-amber-300/80 text-right font-handwritten text-xl md:text-2xl font-bold text-rose-900">
                      {gift.content.signature}
                    </div>
                  )}
                </div>
              )}

              {/* 6. FINAL GIFT TYPE */}
              {isFinal && (
                <div className="text-center space-y-4 py-3">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 border-2 border-yellow-200 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center animate-bounce">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-rose-200 to-amber-300">
                    YOU FOUND THE LAST GIFT! ❤️
                  </h3>

                  <p className="text-sm md:text-base text-amber-100 font-serif">
                    “Har gift jeetna padega… kyunki tum mere liye har gift se zyada special ho.”
                  </p>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenFinalFinale();
                    }}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500 hover:from-amber-400 hover:to-rose-500 text-white text-lg font-bold font-display rounded-2xl shadow-2xl border-2 border-yellow-200 cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>ENTER BIRTHDAY CELEBRATION 🎂</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Modal Footer Actions */}
              {!isFinal && (
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 text-xs md:text-sm font-medium border border-amber-600/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GiftIcon className="w-4 h-4" />
                    <span>Back to Mela Stall</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
