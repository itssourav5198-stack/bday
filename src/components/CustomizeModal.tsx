import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GiftItem } from '../types/game';
import { X, Save, Unlock, RotateCcw, Upload, Image as ImageIcon, Check } from 'lucide-react';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  partnerName: string;
  gifts: GiftItem[];
  onSave: (newName: string, newPartner: string, updatedGifts: GiftItem[]) => void;
  onUnlockAll: () => void;
  onResetProgress: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  recipientName: initialRecipient,
  partnerName: initialPartner,
  gifts: initialGifts,
  onSave,
  onUnlockAll,
  onResetProgress,
}) => {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [partner, setPartner] = useState(partnerNameState(initialPartner));
  const [editingGifts, setEditingGifts] = useState<GiftItem[]>(JSON.parse(JSON.stringify(initialGifts)));
  const [selectedGiftId, setSelectedGiftId] = useState<string>(initialGifts[0]?.id || 'gift-01');
  const [savedSuccess, setSavedSuccess] = useState(false);

  function partnerNameState(name: string) {
    return name || "Yours Always";
  }

  if (!isOpen) return null;

  const currentEditingGift = editingGifts.find((g) => g.id === selectedGiftId);

  const handleImageUpload = (giftId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      setEditingGifts((prev) =>
        prev.map((g) => {
          if (g.id === giftId) {
            return {
              ...g,
              content: {
                ...g.content,
                image: dataUrl,
              },
            };
          }
          return g;
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(recipient, partner, editingGifts);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 select-none overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-gradient-to-b from-amber-950 via-[#250d1d] to-[#140612] border-2 border-amber-500/50 rounded-3xl p-5 md:p-8 shadow-2xl text-amber-50 z-10 my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-3">
          <div>
            <h2 className="text-xl font-display font-bold text-amber-200">
              Personalize Mela Surprise 🎁
            </h2>
            <p className="text-xs text-amber-400/80 font-serif">
              Customize photos, messages, and memories for your special someone
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-amber-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollable-content pr-1">
          {/* Recipient & Partner Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                Birthday Girl / Wife / Girlfriend Name
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Priya, My Love, Birthday Girl"
                className="w-full px-3 py-2 rounded-xl bg-amber-950/80 border border-amber-700/60 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                Your Name / Signature
              </label>
              <input
                type="text"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                placeholder="e.g. Yours Forever, Aman, Rahul"
                className="w-full px-3 py-2 rounded-xl bg-amber-950/80 border border-amber-700/60 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Quick Testing Actions */}
          <div className="p-3 bg-amber-900/40 rounded-2xl border border-amber-700/40 flex flex-wrap gap-2 items-center justify-between">
            <span className="text-xs text-amber-300 font-semibold">
              Quick Testing Controls:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onUnlockAll}
                className="px-3 py-1 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/50 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Unlock className="w-3 h-3" />
                <span>Unlock All Gifts</span>
              </button>
              <button
                type="button"
                onClick={onResetProgress}
                className="px-3 py-1 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/50 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Lock All</span>
              </button>
            </div>
          </div>

          {/* Gift Tabs Selector */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-2">
              Select a Gift to Customize:
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-2">
              {editingGifts.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGiftId(g.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                    selectedGiftId === g.id
                      ? 'bg-amber-500 text-amber-950 border-yellow-200 font-bold shadow-md'
                      : 'bg-amber-950/80 text-amber-300 border-amber-800/60 hover:bg-amber-900'
                  }`}
                >
                  {g.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Gift Editor */}
          {currentEditingGift && (
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-display font-bold text-amber-200">
                  Editing: {currentEditingGift.title} ({currentEditingGift.tag})
                </span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-md bg-amber-900/60 text-amber-400 border border-amber-700">
                  Type: {currentEditingGift.type}
                </span>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-medium text-amber-400 mb-1">
                  Gift Box Label Title
                </label>
                <input
                  type="text"
                  value={currentEditingGift.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingGifts((prev) =>
                      prev.map((g) =>
                        g.id === currentEditingGift.id ? { ...g, title: val } : g
                      )
                    );
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-amber-700/60 text-amber-100 text-xs focus:outline-none"
                />
              </div>

              {/* Image Upload / URL if photo type */}
              {(currentEditingGift.type === 'photo' || currentEditingGift.type === 'memory') && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-medium text-amber-400">
                    Photo (Upload from Device or Paste Image URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL..."
                      value={currentEditingGift.content.image || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingGifts((prev) =>
                          prev.map((g) =>
                            g.id === currentEditingGift.id
                              ? { ...g, content: { ...g.content, image: val } }
                              : g
                          )
                        );
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-amber-700/60 text-amber-100 text-xs focus:outline-none"
                    />
                    <label className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(currentEditingGift.id, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {currentEditingGift.content.image && (
                    <div className="w-20 h-14 rounded-lg overflow-hidden border border-amber-600/50 mt-1">
                      <img
                        src={currentEditingGift.content.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Message / Letter Body */}
              {currentEditingGift.type !== 'letter' && (
                <div>
                  <label className="block text-[11px] font-medium text-amber-400 mb-1">
                    Romantic Message / Note
                  </label>
                  <textarea
                    rows={3}
                    value={currentEditingGift.content.message || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingGifts((prev) =>
                        prev.map((g) =>
                          g.id === currentEditingGift.id
                            ? { ...g, content: { ...g.content, message: val } }
                            : g
                        )
                      );
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-amber-700/60 text-amber-100 text-xs focus:outline-none"
                  />
                </div>
              )}

              {currentEditingGift.type === 'letter' && currentEditingGift.content.letterBody && (
                <div>
                  <label className="block text-[11px] font-medium text-amber-400 mb-1">
                    Letter Paragraphs (one per line)
                  </label>
                  <textarea
                    rows={5}
                    value={currentEditingGift.content.letterBody.join('\n\n')}
                    onChange={(e) => {
                      const paragraphs = e.target.value.split('\n\n');
                      setEditingGifts((prev) =>
                        prev.map((g) =>
                          g.id === currentEditingGift.id
                            ? { ...g, content: { ...g.content, letterBody: paragraphs } }
                            : g
                        )
                      );
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-amber-700/60 text-amber-100 text-xs focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Save Button */}
        <div className="pt-3 border-t border-amber-800/60 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Saved!' : 'Save Personalization'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
