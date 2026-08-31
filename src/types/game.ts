export type GiftType = 'photo' | 'message' | 'memory' | 'album' | 'letter' | 'final';

export interface PhotoItem {
  url: string;
  caption?: string;
  date?: string;
}

export interface GiftContent {
  headline?: string;
  subheadline?: string;
  message?: string;
  date?: string;
  location?: string;
  image?: string;
  images?: PhotoItem[];
  letterBody?: string[];
  signature?: string;
  specialNote?: string;
  birthdayWishes?: string[];
}

export interface GiftColorTheme {
  name: string;
  boxGradient: string;
  boxBorder: string;
  ribbonColor: string;
  ribbonSecondary: string;
  glowColor: string;
  accentBg: string;
}

export interface GiftItem {
  id: string;
  number: number;
  tag: string;
  title: string;
  hintSubtitle: string;
  type: GiftType;
  colorTheme: GiftColorTheme;
  isWon: boolean;
  isOpen: boolean;
  // Position on the stall table (0 to 100 percentage)
  tableX: number;
  tableY: number;
  hitRadius: number;
  content: GiftContent;
}

export type GamePhase = 
  | 'welcome'
  | 'ready'
  | 'aiming'
  | 'throwing'
  | 'hit_result'
  | 'miss_result'
  | 'gift_opening'
  | 'gift_view'
  | 'finale';

export interface RingState {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  scale: number;
  rotation: number;
  isDragging: boolean;
  isFlying: boolean;
  wonGiftId: string | null;
  missMessage: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  recipientName: string;
  partnerName: string;
  attemptsCount: number;
}
