import React from 'react';
import { motion } from 'motion/react';

export const MelaAtmosphere: React.FC = () => {
  // Bulb colors representing Indian festive fair lighting (golden yellow, warm amber, soft red)
  const bulbColors = [
    '#f59e0b', '#fbbf24', '#ef4444', '#f59e0b', '#10b981', '#fbbf24', 
    '#ec4899', '#f59e0b', '#fbbf24', '#ef4444', '#fbbf24', '#3b82f6'
  ];

  // Bunting triangle flags (Carnival Toran)
  const flagColors = [
    'bg-rose-600', 'bg-amber-500', 'bg-emerald-600', 'bg-purple-600', 
    'bg-yellow-400', 'bg-red-500', 'bg-teal-500', 'bg-orange-500'
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Night Sky Gradient with warm mela haze */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0717] via-[#1a0c1e] to-[#2b1016]" />

      {/* Subtle Glowing Stars */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-amber-100"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 17) % 70}%`,
              left: `${(i * 23) % 98}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i * 0.3) % 2,
            }}
          />
        ))}
      </div>

      {/* Carnival Tent Awning Top Drapery */}
      <div className="absolute top-0 left-0 right-0 h-14 md:h-18 flex justify-between z-10 opacity-90">
        {[...Array(16)].map((_, i) => (
          <div
            key={`awning-${i}`}
            className={`flex-1 h-full rounded-b-2xl transform origin-top shadow-lg ${
              i % 2 === 0 ? 'bg-rose-800 border-b-2 border-amber-300/40' : 'bg-amber-600 border-b-2 border-yellow-200/40'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 85% 100%, 50% 88%, 15% 100%)',
            }}
          />
        ))}
      </div>

      {/* Decorative Festoon Toran / Flag Bunting Strings */}
      <div className="absolute top-10 md:top-14 left-0 right-0 flex justify-around px-2 z-10">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={`flag-${i}`}
            className={`w-5 h-7 md:w-7 md:h-9 ${flagColors[i % flagColors.length]} shadow-md`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top center',
            }}
            animate={{
              rotate: [i % 2 === 0 ? -4 : 4, i % 2 === 0 ? 4 : -4, i % 2 === 0 ? -4 : 4],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>

      {/* Glowing Warm Fair String Bulbs */}
      <div className="absolute top-16 md:top-20 left-0 right-0 flex justify-between px-3 md:px-8 z-15">
        {bulbColors.map((color, i) => (
          <div key={`bulb-${i}`} className="flex flex-col items-center">
            {/* Wire */}
            <div className="w-[1px] h-3 md:h-4 bg-amber-900/80" />
            {/* Bulb Base */}
            <div className="w-1.5 h-1 bg-amber-700 rounded-t-sm" />
            {/* Glowing Bulb */}
            <motion.div
              className="w-3.5 h-4.5 md:w-4.5 md:h-6 rounded-full shadow-lg"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 12px ${color}, 0 0 24px ${color}88`,
              }}
              animate={{
                opacity: [0.75, 1, 0.75],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 2.2 + (i % 4) * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * 0.2) % 1.5,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Warm Bokeh & Fireflies */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${(i % 3) * 6 + 6}px`,
              height: `${(i % 3) * 6 + 6}px`,
              backgroundColor: i % 2 === 0 ? 'rgba(251, 191, 36, 0.25)' : 'rgba(244, 63, 94, 0.25)',
              filter: 'blur(3px)',
              top: `${20 + (i * 13) % 70}%`,
              left: `${10 + (i * 17) % 80}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3) * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Mela Side Wooden Pillars with Carved Warm Fair Aesthetics */}
      <div className="absolute top-0 bottom-0 left-0 w-3 md:w-6 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950/40 border-r border-amber-700/30 opacity-75" />
      <div className="absolute top-0 bottom-0 right-0 w-3 md:w-6 bg-gradient-to-l from-amber-950 via-amber-900 to-amber-950/40 border-l border-amber-700/30 opacity-75" />
    </div>
  );
};
