import { GiftItem } from '../types/game';

export const DEFAULT_RECIPIENT_NAME = "Birthday Girl";
export const DEFAULT_PARTNER_NAME = "Yours Always";

export const DEFAULT_GIFTS: GiftItem[] = [
  {
    id: "gift-01",
    number: 1,
    tag: "GIFT 01",
    title: "For the Beginning",
    hintSubtitle: "Where our sweetest story started...",
    type: "photo",
    colorTheme: {
      name: "Rose Velvet",
      boxGradient: "from-rose-600 via-rose-700 to-rose-900",
      boxBorder: "border-rose-400",
      ribbonColor: "bg-amber-300",
      ribbonSecondary: "bg-amber-400",
      glowColor: "rgba(244, 63, 94, 0.6)",
      accentBg: "bg-rose-950/80"
    },
    isWon: false,
    isOpen: false,
    tableX: 18,
    tableY: 28,
    hitRadius: 12,
    content: {
      headline: "The First Chapter ❤️",
      subheadline: "Remember this day?",
      date: "When it all began",
      location: "Where our paths crossed",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
      message: "Do you remember the very first time we spoke? I never told you back then, but my heart skipped a beat. You brought a sudden burst of warmth into my life that has only grown brighter every single day since.",
      specialNote: "“Some people make the world more special just by being in it. You are that person for me.”"
    }
  },
  {
    id: "gift-02",
    number: 2,
    tag: "GIFT 02",
    title: "A Little Reminder",
    hintSubtitle: "Just in case you forgot today...",
    type: "message",
    colorTheme: {
      name: "Royal Peacock",
      boxGradient: "from-teal-600 via-emerald-700 to-teal-950",
      boxBorder: "border-teal-400",
      ribbonColor: "bg-yellow-400",
      ribbonSecondary: "bg-amber-300",
      glowColor: "rgba(20, 184, 166, 0.6)",
      accentBg: "bg-teal-950/80"
    },
    isWon: false,
    isOpen: false,
    tableX: 50,
    tableY: 22,
    hitRadius: 12,
    content: {
      headline: "I LOVE YOU ❤️",
      subheadline: "Always, unconditionally, completely.",
      message: "You are the most precious person in my world. Your smile is my favorite view, your laugh is the soundtrack of my happiest days, and holding your hand makes every worry disappear.\n\nThank you for choosing me every day. Thank you for being my safe space, my biggest cheerleader, and my favorite adventure.",
      specialNote: "1 universe • 8 billion people • and I still found my favorite one in you."
    }
  },
  {
    id: "gift-03",
    number: 3,
    tag: "GIFT 03",
    title: "Our Memory Box",
    hintSubtitle: "A pocketful of our favorite moments...",
    type: "album",
    colorTheme: {
      name: "Marigold Gold",
      boxGradient: "from-amber-500 via-orange-600 to-amber-900",
      boxBorder: "border-amber-300",
      ribbonColor: "bg-red-600",
      ribbonSecondary: "bg-red-500",
      glowColor: "rgba(245, 158, 11, 0.65)",
      accentBg: "bg-amber-950/80"
    },
    isWon: false,
    isOpen: false,
    tableX: 82,
    tableY: 28,
    hitRadius: 12,
    content: {
      headline: "Moments That Mean The World 📸",
      subheadline: "Swipe or tap through our journey",
      images: [
        {
          url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
          caption: "Our endless conversations where hours feel like minutes.",
          date: "Favorite Coffee Walks"
        },
        {
          url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
          caption: "That silly laughing fit over inside jokes no one else would understand.",
          date: "Unstoppable Giggles"
        },
        {
          url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
          caption: "Every quiet sunset, knowing I want to watch all of them with you.",
          date: "Golden Hours Together"
        }
      ]
    }
  },
  {
    id: "gift-04",
    number: 4,
    tag: "GIFT 04",
    title: "The Little Things",
    hintSubtitle: "Things about you that make my heart melt...",
    type: "memory",
    colorTheme: {
      name: "Deep Sapphire",
      boxGradient: "from-indigo-600 via-blue-700 to-indigo-950",
      boxBorder: "border-indigo-400",
      ribbonColor: "bg-pink-400",
      ribbonSecondary: "bg-rose-300",
      glowColor: "rgba(99, 102, 241, 0.6)",
      accentBg: "bg-indigo-950/80"
    },
    isWon: false,
    isOpen: false,
    tableX: 25,
    tableY: 60,
    hitRadius: 13,
    content: {
      headline: "The Things I Adore About You ✨",
      subheadline: "Do you know what makes you so irreplaceable?",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
      date: "Every single day",
      location: "Right here with you",
      message: "The way you excitedly tell a story with your hands. How caring you are even when you're tired. The way you look at me when you think I'm not noticing. Your kindness, your gentle heart, and the warmth you give to everyone around you.",
      specialNote: "“You don't have to do anything extraordinary to be loved. Just being you is more than enough.”"
    }
  },
  {
    id: "gift-05",
    number: 5,
    tag: "GIFT 05",
    title: "Just For You",
    hintSubtitle: "A heartfelt wish from my soul to yours...",
    type: "photo",
    colorTheme: {
      name: "Magenta Sunset",
      boxGradient: "from-fuchsia-600 via-purple-700 to-slate-950",
      boxBorder: "border-fuchsia-400",
      ribbonColor: "bg-emerald-400",
      ribbonSecondary: "bg-teal-300",
      glowColor: "rgba(217, 70, 239, 0.6)",
      accentBg: "bg-purple-950/80"
    },
    isWon: false,
    isOpen: false,
    tableX: 75,
    tableY: 60,
    hitRadius: 13,
    content: {
      headline: "To The Queen Of My Heart 👑",
      subheadline: "You deserve every ounce of magic in this universe.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      message: "I hope you know how deeply appreciated you are. May your year ahead be as radiant, joyful, and full of sweet surprises as you have made my life. Whatever your dreams are, I will always be right beside you cheering the loudest.",
      specialNote: "May all your wishes turn into reality today and forever."
    }
  },
  {
    id: "gift-06",
    number: 6,
    tag: "GIFT 06",
    title: "One More...",
    hintSubtitle: "A handwritten love letter on parchment...",
    type: "letter",
    colorTheme: {
      name: "Crimson Velvet",
      boxGradient: "from-red-600 via-rose-800 to-rose-950",
      boxBorder: "border-red-400",
      ribbonColor: "bg-amber-300",
      ribbonSecondary: "bg-yellow-200",
      glowColor: "rgba(239, 68, 68, 0.7)",
      accentBg: "bg-rose-950/90"
    },
    isWon: false,
    isOpen: false,
    tableX: 50,
    tableY: 48,
    hitRadius: 13,
    content: {
      headline: "My Dearest Love 💌",
      subheadline: "A letter from the bottom of my heart",
      letterBody: [
        "Meri jaan,",
        "If someone asked me to describe my happiest place, I wouldn't name a city or a mountain. I would describe the feeling of sitting next to you, hearing you laugh, and knowing we have each other.",
        "Life can get busy and days can fly past in a blur, but with you, every ordinary moment turns into a cherished memory. In your eyes, I found my home. In your heart, I found my peace.",
        "Thank you for being my anchor, my sweetest distraction, and my greatest blessing. I promise to keep making you smile, to stand with you through every high and low, and to love you more with every passing heartbeat.",
        "Happy Birthday, my beautiful girl. Today is a celebration of the day the world was blessed with you."
      ],
      signature: "Forever & Always Yours ❤️"
    }
  },
  {
    id: "gift-07",
    number: 7,
    tag: "FINAL GIFT",
    title: "The Grand Birthday Surprise ❤️",
    hintSubtitle: "The shining centerpiece of your mela...",
    type: "final",
    colorTheme: {
      name: "Royal Golden Mela Box",
      boxGradient: "from-amber-400 via-yellow-500 to-amber-700",
      boxBorder: "border-yellow-200",
      ribbonColor: "bg-red-600",
      ribbonSecondary: "bg-rose-500",
      glowColor: "rgba(251, 191, 36, 0.95)",
      accentBg: "bg-amber-950/95"
    },
    isWon: false,
    isOpen: false,
    tableX: 50,
    tableY: 82,
    hitRadius: 15,
    content: {
      headline: "HAPPY BIRTHDAY, MY LOVE! 🎂🎉",
      subheadline: "“Aaj tumhare liye ek chhota sa mela lagaya tha…”",
      message: "And you won every single gift! But the greatest prize has always been having you in my life. You light up every room you walk into, you make tough days soft, and you make happy days unforgettable.",
      birthdayWishes: [
        "🌟 May you achieve every single goal and dream you hold close to your heart.",
        "🌸 May your smile never lose its sparkle, and may laughter follow you everywhere.",
        "💖 May you always know how unconditionally and deeply you are cherished.",
        "🎂 And may our love grow sweeter, stronger, and more adventurous with every passing year."
      ],
      specialNote: "“You were always the real gift. ❤️ Happy Birthday!”"
    }
  }
];

export const MISS_MESSAGES = [
  "OHHH… almost there! Try again ❤️",
  "So close! Take a deep breath and aim again 🎯",
  "Close one! The gifts are waiting for you ✨",
  "A little more to the center! You got this ❤️",
  "Almost! Keep going, birthday girl 🎪",
  "Oooh just missed the edge! Give it another shot 💫"
];
