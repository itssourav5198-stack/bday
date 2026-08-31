import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GiftItem } from '../types/game';
import { sound } from '../audio/soundEngine';
import { Heart, Sparkles, Flame, RotateCcw, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayFinaleProps {
  recipientName: string;
  partnerName: string;
  gifts: GiftItem[];
  onBackToStall: () => void;
}

export const BirthdayFinale: React.FC<BirthdayFinaleProps> = ({
  recipientName,
  partnerName,
  gifts,
  onBackToStall,
}) => {
  const [candleBlown, setCandleBlown] = useState<boolean>(false);
  const [activeMontageIdx, setActiveMontageIdx] = useState<number>(0);
  const [showFinalQuote, setShowFinalQuote] = useState<boolean>(false);

  // Collect all photos from gifts for the romantic photo montage
  const memoryPhotos: { url: string; caption: string }[] = [];
  gifts.forEach(g => {
    if (g.content.image) {
      memoryPhotos.push({ url: g.content.image, caption: g.title });
    }
    if (g.content.images) {
      g.content.images.forEach(img => {
        memoryPhotos.push({ url: img.url, caption: img.caption || g.title });
      });
    }
  });

  useEffect(() => {
    sound.playFanfare();

    // Trigger grand confetti shower
    const end = Date.now() + 3000;
    const colors = ['#f59e0b', '#ec4899', '#ef4444', '#10b981', '#fbbf24', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    sound.playBoxOpen();

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899']
      });
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setShowFinalQuote(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-4 py-8 md:py-12 z-30 select-none overflow-y-auto">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0c0414] via-[#21091a] to-[#170512] pointer-events-none" />

      {/* Main Birthday Scroll Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-2xl bg-gradient-to-b from-amber-950/90 via-[#2a0e22]/95 to-[#160613]/95 border-2 border-amber-500/50 rounded-3xl p-6 md:p-10 shadow-[0_0_80px_rgba(245,158,11,0.3)] text-amber-50 text-center space-y-8 backdrop-blur-xl z-10 my-auto"
      >
        {/* Decorative Top Banner */}
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
            Grand Finale • Meri Chhoti Si Mela
          </span>
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Big Headline */}
        <div className="space-y-2">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-rose-300 to-amber-200 drop-shadow-lg"
          >
            HAPPY BIRTHDAY, MY LOVE ❤️
          </motion.h1>
          <p className="text-lg md:text-xl font-serif text-amber-200/90 italic">
            “Aaj ka din sirf tumhara hai…”
          </p>
        </div>

        {/* Interactive Birthday Cake & Candle */}
        <div className="py-4 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBlowCandle}
            className="relative cursor-pointer group flex flex-col items-center"
          >
            {/* Candle Flame or Wish Smoke */}
            <div className="h-10 flex items-center justify-center">
              {!candleBlown ? (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1],
                    y: [0, -2, 0],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="flex flex-col items-center"
                >
                  <Flame className="w-8 h-8 text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,1)]" />
                  <div className="w-1.5 h-3 bg-stone-300 rounded-xs" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: -8 }}
                  className="flex items-center gap-1 text-xs text-yellow-300 font-semibold"
                >
                  <Stars className="w-4 h-4 text-yellow-300 animate-spin" />
                  <span>Wish Made! ✨</span>
                </motion.div>
              )}
            </div>

            {/* 2D Layered Birthday Cake */}
            <div className="w-40 md:w-48 h-24 bg-gradient-to-b from-rose-400 via-rose-500 to-rose-700 rounded-2xl shadow-2xl border-2 border-yellow-200/80 relative flex items-center justify-center overflow-hidden">
              {/* Icing Frosting Drips */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-amber-100 rounded-b-xl border-b border-rose-300 shadow-inner flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-amber-100 rounded-full -mb-2 shadow-xs" />
                ))}
              </div>

              {/* Cherry / Strawberry Toppings */}
              <div className="absolute top-2 flex justify-around w-3/4 z-10">
                <div className="w-3 h-3 rounded-full bg-red-600 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-red-600 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-red-600 shadow-sm" />
              </div>

              {/* Cake Message Label */}
              <span className="text-xs md:text-sm font-handwritten font-bold text-white z-10 mt-3 drop-shadow">
                Happy Birthday {recipientName} ❤️
              </span>

              {/* Cake Stand Base */}
              <div className="absolute bottom-0 inset-x-0 h-3 bg-amber-900/50" />
            </div>

            <p className="text-xs text-amber-300/80 font-medium mt-3">
              {candleBlown ? "✨ Candle blown • Your wish is on its way!" : "👆 Tap the cake to make a wish & blow the candle!"}
            </p>
          </motion.div>
        </div>

        {/* Photo Memory Montage Carousel */}
        {memoryPhotos.length > 0 && (
          <div className="p-4 md:p-6 rounded-3xl bg-amber-950/60 border border-amber-700/40 space-y-3">
            <h3 className="text-base md:text-lg font-display font-semibold text-amber-200">
              Moments We Will Treasure Forever 📸
            </h3>

            <div className="relative aspect-[16/9] w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={memoryPhotos[activeMontageIdx].url}
                  src={memoryPhotos[activeMontageIdx].url}
                  alt="Memory"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-center">
                <p className="text-xs md:text-sm text-yellow-200 font-serif italic">
                  “{memoryPhotos[activeMontageIdx].caption}”
                </p>
              </div>
            </div>

            {/* Mini Carousel Thumbnails */}
            <div className="flex justify-center gap-2 pt-2 overflow-x-auto py-1">
              {memoryPhotos.map((photo, pIdx) => (
                <button
                  key={`thumb-${pIdx}`}
                  onClick={() => setActiveMontageIdx(pIdx)}
                  className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeMontageIdx === pIdx ? 'border-yellow-400 scale-105 shadow-md' : 'border-amber-800 opacity-60'
                  }`}
                >
                  <img src={photo.url} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wishes from Heart */}
        <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-b from-rose-950/60 to-purple-950/60 border border-rose-600/40 text-left space-y-3">
          <h4 className="text-base md:text-lg font-display font-bold text-center text-rose-200">
            My Birthday Wishes For You 🌸
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-rose-100/90 font-serif leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-400">✦</span>
              <span>May every single dream you have held in your heart turn into your reality this year.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">✦</span>
              <span>May your laugh always remain this loud, pure, and contagious.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">✦</span>
              <span>No matter what storms come, you will always have my hand to hold and my shoulder to lean on.</span>
            </li>
          </ul>
        </div>

        {/* Final Emotional Reveal Quote */}
        <div className="space-y-4 pt-4 border-t border-amber-800/60">
          <div className="inline-flex items-center gap-2 text-amber-300">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="text-xs uppercase tracking-widest font-semibold">THANK YOU FOR PLAYING</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </div>

          <div className="space-y-2 font-serif">
            <p className="text-sm md:text-base text-amber-200/80 italic">
              “But honestly…”
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-rose-300 to-amber-200">
              “You were always the real gift.” ❤️
            </h2>
          </div>

          <p className="font-handwritten text-2xl md:text-3xl text-yellow-200 font-bold">
            {partnerName}
          </p>
        </div>

        {/* Replay / Return Controls */}
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onBackToStall}
            className="py-3 px-6 rounded-2xl bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-600/50 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Return to Mela Stall & Re-explore Gifts</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
