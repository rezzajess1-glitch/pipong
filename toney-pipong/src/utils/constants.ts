import { TournamentType, GameType, MatchStatus, TournamentStatus } from '@/types';

// Tournament Type Configurations
export const TOURNAMENT_TYPES = {
  ROUND_ROBIN: {
    key: 'ROUND_ROBIN' as TournamentType,
    name: 'Round Robin',
    description: 'Format liga - kumpul mata terbanyak menang',
    important: true,
    stages: ['GROUP'],
    supportsBrackets: false,
    supportsGroups: false,
  },
  ROUND_ROBIN_KNOCKOUT: {
    key: 'ROUND_ROBIN_KNOCKOUT' as TournamentType,
    name: 'Round Robin + Knockout',
    description: 'Fasa 1: Round Robin, Fasa 2: Auto-generate (1st vs 2nd, 3rd vs 4th)',
    important: false,
    stages: ['GROUP', 'KNOCKOUT'],
    supportsBrackets: true,
    supportsGroups: false,
  },
  GROUP_ROUND_ROBIN: {
    key: 'GROUP_ROUND_ROBIN' as TournamentType,
    name: 'Group Round Robin',
    description: 'Beberapa kumpulan dengan Quarterfinal, Semifinal, Final',
    important: true,
    stages: ['GROUP', 'QUARTERFINAL', 'SEMIFINAL', 'FINAL', 'THIRD_PLACE'],
    supportsBrackets: true,
    supportsGroups: true,
  },
  SINGLE_ELIMINATION: {
    key: 'SINGLE_ELIMINATION' as TournamentType,
    name: 'Single Elimination',
    description: 'Kalah sekali terus tersingkir',
    important: false,
    stages: ['BRACKET'],
    supportsBrackets: true,
    supportsGroups: false,
  },
  DOUBLE_ELIMINATION: {
    key: 'DOUBLE_ELIMINATION' as TournamentType,
    name: 'Double Elimination',
    description: 'Kalah sekali → masuk Lower Bracket, masih ada peluang kedua',
    important: false,
    stages: ['UPPER_BRACKET', 'LOWER_BRACKET', 'FINAL'],
    supportsBrackets: true,
    supportsGroups: false,
  },
  FRIENDLY: {
    key: 'FRIENDLY' as TournamentType,
    name: 'Friendly',
    description: 'Manual add matches dengan team system',
    important: true,
    stages: ['MATCHES'],
    supportsBrackets: false,
    supportsGroups: false,
  },
} as const;

export const GAME_TYPES = {
  SINGLE: {
    key: 'SINGLE' as GameType,
    name: 'Single',
    description: 'Permainan individu',
    minPlayers: 2,
  },
  DOUBLE: {
    key: 'DOUBLE' as GameType,
    name: 'Double',
    description: 'Permainan berpasangan',
    minPlayers: 4,
  },
} as const;

// Status Configurations
export const TOURNAMENT_STATUS = {
  PENDING: {
    key: 'PENDING' as TournamentStatus,
    name: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Belum bermula',
  },
  ONGOING: {
    key: 'ONGOING' as TournamentStatus,
    name: 'Ongoing',
    color: 'bg-green-100 text-green-800',
    description: 'Sedang berlangsung',
  },
  FINISHED: {
    key: 'FINISHED' as TournamentStatus,
    name: 'Finished',
    color: 'bg-gray-100 text-gray-800',
    description: 'Tamat',
  },
} as const;

export const MATCH_STATUS = {
  NOT_STARTED: {
    key: 'NOT_STARTED' as MatchStatus,
    name: 'Belum Bermula',
    color: 'bg-gray-100 text-gray-800',
    icon: '⏳',
  },
  ONGOING: {
    key: 'ONGOING' as MatchStatus,
    name: 'Sedang Bermain',
    color: 'bg-green-100 text-green-800',
    icon: '🏓',
  },
  COMPLETED: {
    key: 'COMPLETED' as MatchStatus,
    name: 'Tamat',
    color: 'bg-blue-100 text-blue-800',
    icon: '✅',
  },
  VERIFIED: {
    key: 'VERIFIED' as MatchStatus,
    name: 'Disahkan',
    color: 'bg-purple-100 text-purple-800',
    icon: '✔️',
  },
  CANCELLED: {
    key: 'CANCELLED' as MatchStatus,
    name: 'Dibatalkan',
    color: 'bg-red-100 text-red-800',
    icon: '❌',
  },
} as const;

// Scoring System
export const SCORING_SYSTEM = {
  POINTS_TO_WIN_SET: 11,
  DEUCE_POINT: 10,
  DEUCE_LEAD_REQUIRED: 2,
  DEFAULT_BEST_OF: 5, // Best of 5 sets
  MIN_SETS_TO_WIN: 3,
} as const;

// Tie-break priorities
export const TIE_BREAK_PRIORITIES = [
  'HEAD_TO_HEAD',
  'SET_RATIO',
  'POINT_RATIO',
  'DRAW',
] as const;

// UI Constants
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/', icon: 'Home', showInBottom: true },
  { name: 'Tournament', href: '/tournament', icon: 'Trophy', showInBottom: true },
  { name: 'Player', href: '/player', icon: 'Users', showInBottom: true },
  { name: 'Matches', href: '/matches', icon: 'Calendar', showInBottom: true },
  { name: 'Result', href: '/result', icon: 'Award', showInBottom: true },
] as const;

// Languages
export const LANGUAGES = {
  EN: {
    key: 'EN',
    name: 'English',
    flag: '🇺🇸',
  },
  BM: {
    key: 'BM',
    name: 'Bahasa Malaysia',
    flag: '🇲🇾',
  },
} as const;

// Default form values
export const DEFAULT_TOURNAMENT_FORM = {
  title: '',
  description: '',
  organization: '',
  location: '',
  googleMapsLink: '',
  startDate: new Date(),
  additionalDates: [],
  tournamentType: 'ROUND_ROBIN' as TournamentType,
  gameType: 'SINGLE' as GameType,
  isITTFCompliant: true,
};

export const DEFAULT_PLAYER_FORM = {
  name: '',
  email: '',
  phone: '',
  teamName: '',
  category: '',
  ranking: undefined,
};

// PIN system
export const PIN_CONFIG = {
  LENGTH: 4,
  PATTERN: /^\d{4}$/,
  PLACEHOLDER: '0000',
} as const;

// File upload limits
export const UPLOAD_LIMITS = {
  BANNER_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  LOGO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  PROFILE_IMAGE_MAX_SIZE: 1 * 1024 * 1024, // 1MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  TOURNAMENTS: '/api/tournaments',
  PLAYERS: '/api/players',
  MATCHES: '/api/matches',
  RESULTS: '/api/results',
  AUTH: '/api/auth',
  UPLOAD: '/api/upload',
} as const;