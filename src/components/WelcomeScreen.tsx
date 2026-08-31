import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, Volume2 } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface WelcomeScreenProps {
  recipientName: string;
  onEnterMela: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  recipientName,
  onEnterMela,
}) => {
  const [step, setStep] = useState<number>(1);

  // Progressive story reveal sequence
  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 1200);
    const t2 = setTimeout(() => setStep(3), 2800);
    const t3 = setTimeout(() => setStep(4), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStart = () => {
    sound.playBoxOpen();
    sound.startBackgroundMusic();
    onEnterMela();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 z-30 select-none overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-rose-950/40 to-[#120716] pointer-events-none" />

      {/* Main Story Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-gradient-to-b from-amber-950/90 via-[#260f1c]/95 to-[#160814]/95 border border-amber-500/40 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-center flex flex-col items-center"
      >
        {/* Decorative Indian Mela Arch Header */}
        <div className="w-full flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-400/60" />
          <div className="px-3 py-1 bg-amber-900/60 border border-amber-500/40 rounded-full text-amber-300 text-xs tracking-widest uppercase flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Meri Chhoti Si Mela</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>

        {/* Big Romantic Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-rose-400">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-rose-300">Special Birthday Edition</span>
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-yellow-100 drop-shadow-md">
            HEY, {recipientName.toUpperCase()} ❤️
          </h1>
        </motion.div>

        {/* Narrative Progression */}
        <div className="w-full space-y-4 min-h-[160px] flex flex-col justify-center my-2 text-amber-100/90 font-serif text-base md:text-lg leading-relaxed">
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-amber-200 italic"
            >
              “Aaj tumhare liye ek chhota sa mela lagaya hai…”
            </motion.p>
          )}

          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-rose-200/90 text-sm md:text-base"
            >
              Lekin yahan gifts free mein nahi milenge… 😉
            </motion.p>
          )}

          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="py-2"
            >
              <span className="text-xl md:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-rose-300 to-amber-200 tracking-wider">
                “PEHLE JEETNA PADEGA.” ❤️
              </span>
            </motion.div>
          )}
        </div>

        {/* Golden Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 w-full flex flex-col items-center gap-3"
        >
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500 hover:from-amber-400 hover:via-rose-500 hover:to-amber-400 text-white font-bold font-display text-lg rounded-2xl shadow-[0_10px_30px_rgba(239,68,68,0.4)] border-2 border-yellow-200/70 active:scale-95 transition-all flex items-center justify-center gap-3 group cursor-pointer"
          >
            <Gift className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
            <span>ENTER THE MELA 🎪</span>
            <Sparkles className="w-5 h-5 text-yellow-200 group-hover:scale-125 transition-transform" />
          </button>

          <div className="flex items-center gap-1.5 text-xs text-amber-300/70">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Sound & background music will start on enter</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
