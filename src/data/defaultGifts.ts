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
      image: "/images/Gemini_Generated_Image_ayqugeayqugeayqu.png",
      message: "Apko yaad hai hamne sabse pehli baar baat kab ki?  Usdin sirf hamne baat hi nhi ki hmare beech ek connection bna rhe the. Aapke aane se meri wo khoyi huyi dhadkane waps aa gyi kyuki mai agr dil hu to uski dhadkan to aap ho n.",
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
      message: "You are the most precious person in my world. Aapki smile aur chehra dekhke dil ko sukoon milta hai, apki aawaj sunke kaan aur dil ko raahat milti h. Thank you for choosing me every day. Thank you for being my safe space, my biggest cheerleader, and my favorite adventure.",
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
          url: "/images/03_01.png",
          caption: "Apka ye pyaara chehra",
          date: "Cutu face"
        },
        {
          url: "/images/03_02.jpeg",
          caption: "Subh subh apki wo pyaari si aawaj sunna",
          date: "Unstoppable Giggles"
        },
        {
          url: "/images/03_03.png",
          caption: "Apko yu saare m dekhna mujhe dewaana bna deta hai ",
          date: "Golden Hours "
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
      image: "/images/04.png",
      date: "Every single day",
      location: "Right here with you",
      message: "Apka yu saare baat btana, Apka yu mujhe care karna bacho ki trh, apka yu mereko datna, apka yu mujhe smjhana. I love everything jo apne diya mujhe. I LOVE YOU MERI SHONAAAA",
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
      image: "/images/ChatGPT Image Jun 27, 2026, 08_29_14 PM.png",
      message: "Mai babyyy apke sath hmesha tha hu aur rhunga chahe life ki kitti bhi tough phase ho y fr apki jo bhi ichha ho mai apke sath aur apke liye hmesha rhunga.",
      specialNote: "Meri raani ki khwaish aur iccha mere sar aankho par."
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
      subheadline: "EK LETTER LIKHA H DIL SE",
      letterBody: [
        "Meri jaan,",
        "Koi mujhse puchta h ki tujhe kya psnd h sabse jyada to mera jwab aap ho, Aur agr koi puche ki tumhe konsa jgh jyada psnd h to mera jwab hota h ki meri shonaaa k dil m.",
        "Life m chahe mere kitte hi tough phase kyu n chl rhe ho, kitte hi mushkile n chl rhi ho prrr ek chiz h jo mujhe har vkt chahiye aap aur apka sath shonaaaa.",
        "Thank you for being my anchor, my sweetest distraction, and my greatest blessing. I promise to keep making you smile, to stand with you through every high and low, and to love you more with every passing heartbeat.",
        "Happy Birthday, my beautiful wifeee. Aaj apka din hai."
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
      message: "And you won every single gift! But life ki sabse badi gift to mujhe mili h aaj k din. Bhagwan n meri shonaaa ko bheja mere liye.",
      birthdayWishes: [
        "🌟 Apko wo saari chize mile jo apko chahiyeeee ",
        "🌸 Aap aisi hi haste rha kroo, pyaari lagti ho ",
        "💖 Apka babuuu hmesha apke sath tha hai aur hmesha rhegaaa ",
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
