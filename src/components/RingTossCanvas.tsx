import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GiftItem } from '../types/game';
import { sound } from '../audio/soundEngine';
import { MISS_MESSAGES } from '../data/defaultGifts';
import { Sparkles, Target, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RingTossCanvasProps {
  gifts: GiftItem[];
  onGiftWon: (gift: GiftItem) => void;
  onHoverGift: (giftId: string | null) => void;
  onAttempt: () => void;
}

export const RingTossCanvas: React.FC<RingTossCanvasProps> = ({
  gifts,
  onGiftWon,
  onHoverGift,
  onAttempt,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ring coordinates in percentages (0-100)
  const HOME_X = 50;
  const HOME_Y = 88;

  const [ringPos, setRingPos] = useState<{ x: number; y: number }>({ x: HOME_X, y: HOME_Y });
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  const [ringScale, setRingScale] = useState(1);
  const [ringRotation, setRingRotation] = useState(0);
  const [aimTarget, setAimTarget] = useState<{ x: number; y: number } | null>(null);
  const [missToast, setMissToast] = useState<string | null>(null);
  const [wonAnnouncement, setWonAnnouncement] = useState<GiftItem | null>(null);

  // Identify which gift is closest to current aim target
  const checkHoveredGift = useCallback((targetX: number, targetY: number) => {
    let closestGift: GiftItem | null = null;
    let minDistance = Infinity;

    for (const gift of gifts) {
      const dx = gift.tableX - targetX;
      const dy = gift.tableY - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < gift.hitRadius * 1.6 && dist < minDistance) {
        minDistance = dist;
        closestGift = gift;
      }
    }

    onHoverGift(closestGift ? closestGift.id : null);
    return closestGift;
  }, [gifts, onHoverGift]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isThrowing) return;
    setIsDragging(true);
    setMissToast(null);
    sound.playSpin();

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      const xPct = ((clientX - rect.left) / rect.width) * 100;
      const yPct = ((clientY - rect.top) / rect.height) * 100;
      setDragOffset({ x: xPct - HOME_X, y: yPct - HOME_Y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isThrowing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const currentXPct = ((clientX - rect.left) / rect.width) * 100;
    const currentYPct = ((clientY - rect.top) / rect.height) * 100;

    // Pullback vector (slingshot inverted or direct drag)
    const pullX = currentXPct - HOME_X;
    const pullY = currentYPct - HOME_Y;

    // Calculate projected target on table based on drag direction & intensity
    // Dragging down/back pulls slingshot forward; direct drag forward aims directly
    let targetX = HOME_X - pullX * 2.2;
    let targetY = Math.min(Math.max(20, HOME_Y - Math.max(10, Math.abs(pullY) * 2.5)), 82);

    // If pulling up directly
    if (pullY < 0) {
      targetX = currentXPct;
      targetY = Math.max(20, Math.min(currentYPct, 82));
    }

    targetX = Math.max(12, Math.min(88, targetX));

    setRingPos({
      x: Math.max(25, Math.min(75, HOME_X + pullX * 0.4)),
      y: Math.max(75, Math.min(95, HOME_Y + pullY * 0.4)),
    });

    setAimTarget({ x: targetX, y: targetY });
    checkHoveredGift(targetX, targetY);
  };

  const executeThrow = (targetX: number, targetY: number) => {
    setIsDragging(false);
    setIsThrowing(true);
    onAttempt();
    sound.playThrow();

    const startX = ringPos.x;
    const startY = ringPos.y;
    const startTime = performance.now();
    const duration = 650; // Flight time in ms

    const animateFlight = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Parabolic arc (quadratic bezier lift)
      const currentX = startX + (targetX - startX) * progress;
      const linearY = startY + (targetY - startY) * progress;
      const arcHeight = Math.sin(progress * Math.PI) * 22; // High throw curve
      const currentY = linearY - arcHeight;

      // Scale perspective (shrinks into distance)
      const scale = 1.0 - progress * 0.42;
      const rotation = progress * 720; // 2 full spins in flight

      setRingPos({ x: currentX, y: currentY });
      setRingScale(scale);
      setRingRotation(rotation);

      if (progress < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        // Landing & Collision Check
        handleLanding(targetX, targetY);
      }
    };

    requestAnimationFrame(animateFlight);
  };

  const handlePointerUp = () => {
    if (!isDragging || isThrowing) return;

    if (aimTarget) {
      executeThrow(aimTarget.x, aimTarget.y);
    } else {
      // Default soft toss forward
      executeThrow(50, 48);
    }
  };

  // Direct target click helper for smooth mobile gameplay
  const throwDirectToGift = (gift: GiftItem) => {
    if (isThrowing) return;
    onHoverGift(gift.id);
    setAimTarget({ x: gift.tableX, y: gift.tableY });
    executeThrow(gift.tableX, gift.tableY);
  };

  const handleLanding = (landX: number, landY: number) => {
    sound.playBounce();

    // Check hit against gifts
    let wonGift: GiftItem | null = null;
    for (const gift of gifts) {
      const dx = gift.tableX - landX;
      const dy = gift.tableY - landY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if ring landed within gift's hit target zone
      if (dist <= gift.hitRadius * 1.25) {
        wonGift = gift;
        break;
      }
    }

    if (wonGift) {
      // SUCCESS!
      sound.playHit();
      setWonAnnouncement(wonGift);
      onGiftWon(wonGift);

      // Throw confetti explosion
      try {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.6, x: landX / 100 },
          colors: ['#f59e0b', '#ec4899', '#ef4444', '#10b981', '#fbbf24'],
        });
      } catch {
        // Safe fallback
      }

      setTimeout(() => {
        resetRing();
        setWonAnnouncement(null);
      }, 1600);
    } else {
      // MISS!
      sound.playMiss();
      const randomMsg = MISS_MESSAGES[Math.floor(Math.random() * MISS_MESSAGES.length)];
      setMissToast(randomMsg);

      setTimeout(() => {
        resetRing();
      }, 1200);
    }
  };

  const resetRing = () => {
    setRingPos({ x: HOME_X, y: HOME_Y });
    setRingScale(1);
    setRingRotation(0);
    setIsThrowing(false);
    setIsDragging(false);
    setAimTarget(null);
    onHoverGift(null);
  };

  // Prevent default touch scrolling inside game canvas
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e: TouchEvent) => {
      if (e.target && (e.target as HTMLElement).closest('.scrollable-content')) return;
      e.preventDefault();
    };
    el.addEventListener('touchmove', prevent, { passive: false });
    return () => el.removeEventListener('touchmove', prevent);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 touch-none cursor-crosshair overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Visual Aiming Dotted Trajectory Arc */}
      {isDragging && aimTarget && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="aimGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d={`M ${ringPos.x}% ${ringPos.y}% Q ${((ringPos.x + aimTarget.x) / 2)}% ${Math.min(ringPos.y, aimTarget.y) - 18}% ${aimTarget.x}% ${aimTarget.y}%`}
            fill="none"
            stroke="url(#aimGrad)"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
          {/* Aim Target Reticle */}
          <circle
            cx={`${aimTarget.x}%`}
            cy={`${aimTarget.y}%`}
            r="16"
            fill="rgba(251, 191, 36, 0.2)"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        </svg>
      )}

      {/* The Physical Throwing Ring */}
      <div
        id="throwing-ring"
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 transition-shadow"
        style={{
          left: `${ringPos.x}%`,
          top: `${ringPos.y}%`,
          transform: `translate(-50%, -50%) scale(${ringScale}) rotate(${ringRotation}deg)`,
        }}
      >
        {/* Ring Shadow */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-8 rounded-[50%] bg-black/40 blur-sm pointer-events-none"
          style={{ opacity: 1 - (1 - ringScale) * 0.4 }}
        />

        {/* 2D Ring with Polished Brass / Ruby Carnival Metallic Finish */}
        <div className="relative w-22 h-22 md:w-26 md:h-26 flex items-center justify-center">
          {/* Outer Ring Glow */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-200 ${
              isDragging ? 'shadow-[0_0_25px_rgba(251,191,36,0.9)] bg-amber-400/15' : 'shadow-[0_0_15px_rgba(245,158,11,0.5)]'
            }`}
          />

          {/* Heavy Brass Ring Body */}
          <div
            className="w-full h-full rounded-full border-[7px] md:border-[9px] border-amber-300 shadow-xl flex items-center justify-center"
            style={{
              borderColor: '#fcd34d',
              boxShadow: 'inset 0 2px 6px #78350f, 0 4px 12px rgba(0,0,0,0.6)',
              background: 'radial-gradient(circle, transparent 55%, rgba(180, 83, 9, 0.4) 85%, #f59e0b 100%)',
            }}
          >
            {/* Red Festive Ribbon Wrap Accents around Ring */}
            <div className="absolute top-0 w-3 h-2 bg-rose-600 rounded-sm shadow-sm" />
            <div className="absolute bottom-0 w-3 h-2 bg-rose-600 rounded-sm shadow-sm" />
            <div className="absolute left-0 w-2 h-3 bg-rose-600 rounded-sm shadow-sm" />
            <div className="absolute right-0 w-2 h-3 bg-rose-600 rounded-sm shadow-sm" />

            {/* Specular Highlight */}
            <div className="absolute top-1 left-2 w-5 h-2 bg-white/70 rounded-full blur-[1px] transform -rotate-45" />
          </div>
        </div>
      </div>

      {/* Throw Control Drag Prompt Hint */}
      {!isDragging && !isThrowing && !missToast && !wonAnnouncement && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center gap-1 z-30">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="px-4 py-1.5 bg-amber-950/90 text-amber-200 border border-amber-500/50 rounded-full text-xs md:text-sm font-medium shadow-xl backdrop-blur-md flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Drag the ring & aim at a gift box!</span>
          </motion.div>
        </div>
      )}

      {/* Quick Aim Helper Buttons for Mobile Ease */}
      {!isThrowing && (
        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center pointer-events-none z-30 text-[11px] text-amber-200/80">
          <span className="hidden sm:inline bg-black/40 px-2 py-1 rounded-md backdrop-blur-xs">
            Tip: Pull back & release to toss
          </span>
          <div className="flex gap-1.5 pointer-events-auto ml-auto">
            {gifts.filter(g => !g.isWon).slice(0, 3).map(g => (
              <button
                key={`quick-aim-${g.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  throwDirectToGift(g);
                }}
                className="px-2.5 py-1 bg-amber-900/80 hover:bg-amber-800 text-amber-200 hover:text-white border border-amber-600/40 rounded-full shadow-md text-[10px] md:text-xs flex items-center gap-1 transition-all active:scale-95"
              >
                <Target className="w-3 h-3 text-yellow-400" />
                <span>Aim {g.tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Won Toast Overlay Announcement */}
      <AnimatePresence>
        {wonAnnouncement && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute top-28 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white px-6 py-3 rounded-2xl shadow-2xl border-2 border-yellow-200 flex flex-col items-center text-center backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-sm md:text-base font-bold font-display tracking-wide">
              <span>🎉 YOU WON {wonAnnouncement.tag.toUpperCase()}! ❤️</span>
            </div>
            <p className="text-xs text-yellow-100 font-medium mt-0.5">
              “{wonAnnouncement.title}” is now unlocked!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playful Encouraging Miss Toast */}
      <AnimatePresence>
        {missToast && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute top-28 left-1/2 -translate-x-1/2 z-40 bg-amber-950/95 text-amber-200 px-5 py-2.5 rounded-xl shadow-xl border border-amber-600/60 text-xs md:text-sm font-medium flex items-center gap-2 backdrop-blur-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>{missToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
