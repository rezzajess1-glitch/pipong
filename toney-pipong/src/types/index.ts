// Tournament Types
export type TournamentType = 
  | 'ROUND_ROBIN'
  | 'ROUND_ROBIN_KNOCKOUT'
  | 'GROUP_ROUND_ROBIN'
  | 'SINGLE_ELIMINATION'
  | 'DOUBLE_ELIMINATION'
  | 'FRIENDLY';

export type GameType = 'SINGLE' | 'DOUBLE';

export type TournamentStatus = 'PENDING' | 'ONGOING' | 'FINISHED';

export type MatchStatus = 
  | 'NOT_STARTED'
  | 'ONGOING'
  | 'COMPLETED'
  | 'VERIFIED'
  | 'CANCELLED';

// User and Access Control
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  isGuest: boolean;
}

export interface UserRole {
  userId: string;
  tournamentId: string;
  role: 'CREATOR' | 'ADMIN' | 'USER_WITH_PIN' | 'USER';
  grantedAt: Date;
}

// Tournament Structure
export interface Tournament {
  id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  googleMapsLink?: string;
  securityPin: string;
  creatorId: string;
  status: TournamentStatus;
  tournamentType: TournamentType;
  gameType: GameType;
  startDate: Date;
  endDate?: Date;
  additionalDates?: Date[];
  banner?: string;
  clubLogo?: string;
  isITTFCompliant: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Player Structure
export interface Player {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  ranking?: number;
  category?: string;
  teamName?: string;
  groupId?: string;
  isActive: boolean;
  tournamentId: string;
  createdAt: Date;
}

export interface PlayerPair {
  id: string;
  player1Id: string;
  player2Id: string;
  player1: Player;
  player2: Player;
  teamName?: string;
  tournamentId: string;
}

// Match Structure
export interface Match {
  id: string;
  tournamentId: string;
  round: string;
  matchNumber: number;
  gameType: GameType;
  
  // Single players
  player1Id?: string;
  player2Id?: string;
  player1?: Player;
  player2?: Player;
  
  // Double players (pairs)
  pair1Id?: string;
  pair2Id?: string;
  pair1?: PlayerPair;
  pair2?: PlayerPair;
  
  status: MatchStatus;
  scheduledTime?: Date;
  startTime?: Date;
  endTime?: Date;
  table?: string;
  
  // Scoring
  sets: Set[];
  winnerId?: string;
  winnerPairId?: string;
  
  // Officials
  umpireId?: string;
  umpireName?: string;
  
  groupId?: string;
  stage?: string; // 'GROUP', 'QUARTERFINAL', 'SEMIFINAL', 'FINAL', etc.
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Set {
  id: string;
  setNumber: number;
  player1Score: number;
  player2Score: number;
  winnerId?: string;
  winnerPairId?: string;
  isCompleted: boolean;
  serves: ServeLog[];
}

export interface ServeLog {
  playerId?: string;
  pairId?: string;
  pointNumber: number;
  timestamp: Date;
}

// Group and Bracket Structure
export interface Group {
  id: string;
  name: string;
  tournamentId: string;
  players: Player[];
  playerPairs: PlayerPair[];
  matches: Match[];
}

export interface Bracket {
  id: string;
  name: string; // 'UPPER', 'LOWER', 'MAIN'
  tournamentId: string;
  rounds: BracketRound[];
}

export interface BracketRound {
  id: string;
  roundNumber: number;
  name: string; // 'QUARTERFINAL', 'SEMIFINAL', 'FINAL'
  matches: Match[];
}

// Results and Statistics
export interface PlayerStats {
  playerId: string;
  tournamentId: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  setsWon: number;
  setsLost: number;
  pointsWon: number;
  pointsLost: number;
  winPercentage: number;
  setRatio: number;
  pointRatio: number;
}

export interface TournamentResult {
  tournamentId: string;
  rankings: PlayerRanking[];
  champions: {
    first?: Player | PlayerPair;
    second?: Player | PlayerPair;
    third?: Player | PlayerPair;
  };
}

export interface PlayerRanking {
  position: number;
  playerId?: string;
  pairId?: string;
  player?: Player;
  pair?: PlayerPair;
  points: number;
  stats: PlayerStats;
  tieBreakData?: TieBreakData;
}

export interface TieBreakData {
  headToHead: Record<string, number>; // opponent ID -> result (1=win, 0=loss)
  setRatio: number;
  pointRatio: number;
}

// Access Logs
export interface ScoreboardAccessLog {
  id: string;
  matchId: string;
  userId: string;
  userName: string;
  accessType: 'UMPIRE' | 'ADMIN' | 'CREATOR';
  timestamp: Date;
  ipAddress?: string;
}

// Notifications
export interface Notification {
  id: string;
  type: 'TOURNAMENT_CREATED' | 'MATCH_COMPLETED' | 'TOURNAMENT_FINISHED';
  title: string;
  message: string;
  tournamentId?: string;
  matchId?: string;
  userId?: string;
  isRead: boolean;
  createdAt: Date;
}

// Form Types
export interface CreateTournamentForm {
  title: string;
  description: string;
  organization: string;
  location: string;
  googleMapsLink?: string;
  startDate: Date;
  additionalDates?: Date[];
  tournamentType: TournamentType;
  gameType: GameType;
  isITTFCompliant: boolean;
  banner?: File;
  clubLogo?: File;
}

export interface CreatePlayerForm {
  name: string;
  email?: string;
  phone?: string;
  teamName?: string;
  category?: string;
  ranking?: number;
  profileImage?: File;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}