import React, { useState, useEffect } from 'react';
import { GiftItem, GamePhase } from './types/game';
import { DEFAULT_GIFTS, DEFAULT_RECIPIENT_NAME, DEFAULT_PARTNER_NAME } from './data/defaultGifts';
import { sound } from './audio/soundEngine';
import { MelaAtmosphere } from './components/MelaAtmosphere';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GiftsTable } from './components/GiftsTable';
import { RingTossCanvas } from './components/RingTossCanvas';
import { GiftModal } from './components/GiftModal';
import { BirthdayFinale } from './components/BirthdayFinale';
import { CustomizeModal } from './components/CustomizeModal';
import { HUD } from './components/HUD';

const STORAGE_KEY_GIFTS = 'meri_mela_gifts_v1';
const STORAGE_KEY_RECIPIENT = 'meri_mela_recipient_v1';
const STORAGE_KEY_PARTNER = 'meri_mela_partner_v1';
const STORAGE_KEY_ATTEMPTS = 'meri_mela_attempts_v1';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('welcome');
  const [gifts, setGifts] = useState<GiftItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GIFTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_GIFTS;
  });

  const [recipientName, setRecipientName] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_RECIPIENT) || DEFAULT_RECIPIENT_NAME;
  });

  const [partnerName, setPartnerName] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PARTNER) || DEFAULT_PARTNER_NAME;
  });

  const [attempts, setAttempts] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [activeModalGift, setActiveModalGift] = useState<GiftItem | null>(null);
  const [hoveredGiftId, setHoveredGiftId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);

  // Sync gifts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GIFTS, JSON.stringify(gifts));
    } catch {
      // Safe fallback
    }
  }, [gifts]);

  // Sync names to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RECIPIENT, recipientName);
    localStorage.setItem(STORAGE_KEY_PARTNER, partnerName);
  }, [recipientName, partnerName]);

  // Sync attempts
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, attempts.toString());
  }, [attempts]);

  // Handle gift won by ring toss
  const handleGiftWon = (wonGift: GiftItem) => {
    setGifts((prev) =>
      prev.map((g) => (g.id === wonGift.id ? { ...g, isWon: true } : g))
    );

    // Auto-open modal after brief celebratory pause
    setTimeout(() => {
      setActiveModalGift({ ...wonGift, isWon: true });
    }, 900);
  };

  // Open modal manually from table
  const handleOpenGiftModal = (gift: GiftItem) => {
    setActiveModalGift(gift);
  };

  // Close modal and mark as viewed/open
  const handleCloseModal = () => {
    if (activeModalGift) {
      setGifts((prev) =>
        prev.map((g) => (g.id === activeModalGift.id ? { ...g, isOpen: true } : g))
      );
    }
    setActiveModalGift(null);
  };

  // Switch to birthday finale
  const handleOpenFinale = () => {
    setActiveModalGift(null);
    setPhase('finale');
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Increment Throw Attempts
  const handleAttempt = () => {
    setAttempts((prev) => prev + 1);
  };

  // Save customizations
  const handleSaveCustomization = (
    newRecipient: string,
    newPartner: string,
    updatedGifts: GiftItem[]
  ) => {
    setRecipientName(newRecipient);
    setPartnerName(newPartner);
    setGifts(updatedGifts);
  };

  // Unlock all gifts for creator preview
  const handleUnlockAll = () => {
    setGifts((prev) => prev.map((g) => ({ ...g, isWon: true, isOpen: true })));
  };

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm('Reset all gifts and toss progress?')) {
      const resetList = DEFAULT_GIFTS.map((g) => ({ ...g, isWon: false, isOpen: false }));
      setGifts(resetList);
      setAttempts(0);
      localStorage.setItem(STORAGE_KEY_GIFTS, JSON.stringify(resetList));
      localStorage.setItem(STORAGE_KEY_ATTEMPTS, '0');
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#110512] text-amber-50 flex flex-col justify-between overflow-hidden font-sans-clean select-none">
      {/* Dynamic Mela Fair Atmosphere & Lighting */}
      <MelaAtmosphere />

      {/* PHASE 1: WELCOME SCREEN */}
      {phase === 'welcome' && (
        <WelcomeScreen
          recipientName={recipientName}
          onEnterMela={() => setPhase('ready')}
        />
      )}

      {/* PHASE 2: ACTIVE MELA RING TOSS STALL */}
      {phase === 'ready' && (
        <div className="relative flex-1 flex flex-col justify-between w-full max-w-5xl mx-auto z-10">
          {/* Top Heads Up Display */}
          <HUD
            gifts={gifts}
            attempts={attempts}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenSettings={() => setIsCustomizeOpen(true)}
            onResetGame={handleResetProgress}
            onOpenFinaleDirect={handleOpenFinale}
          />

          {/* Main Ring Toss Carnival Area */}
          <div className="relative flex-1 flex flex-col justify-center items-center px-2 py-1 my-auto">
            {/* Shared coordinate box: table + ring throwing area share the SAME box now,
                so the ring's home/target positions line up with the gift boxes. */}
            <div className="relative w-full max-w-4xl mx-auto h-[440px] md:h-[500px]">
              {/* The 3D Wooden Table with Gift Boxes */}
              <GiftsTable
                gifts={gifts}
                hoveredGiftId={hoveredGiftId}
                onOpenGift={handleOpenGiftModal}
                isAiming={hoveredGiftId !== null}
              />

              {/* Interactive Ring Throw Physics Engine */}
              <RingTossCanvas
                gifts={gifts}
                onGiftWon={handleGiftWon}
                onHoverGift={setHoveredGiftId}
                onAttempt={handleAttempt}
              />
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: GRAND BIRTHDAY FINALE */}
      {phase === 'finale' && (
        <BirthdayFinale
          recipientName={recipientName}
          partnerName={partnerName}
          gifts={gifts}
          onBackToStall={() => setPhase('ready')}
        />
      )}

      {/* GIFT OPENING & MEMORY REVEAL MODAL */}
      <GiftModal
        gift={activeModalGift}
        onClose={handleCloseModal}
        onOpenFinalFinale={handleOpenFinale}
      />

      {/* PERSONALIZATION & SURPRISE CUSTOMIZER MODAL */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        recipientName={recipientName}
        partnerName={partnerName}
        gifts={gifts}
        onSave={handleSaveCustomization}
        onUnlockAll={handleUnlockAll}
        onResetProgress={handleResetProgress}
      />
    </main>
  );
}
