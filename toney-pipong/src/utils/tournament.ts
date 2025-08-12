import { Player, PlayerPair, PlayerStats, TieBreakData, Match, TournamentType } from '@/types';
import { TIE_BREAK_PRIORITIES, SCORING_SYSTEM } from './constants';

// Generate a random 4-digit PIN
export function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Validate PIN format
export function validatePin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

// Calculate player statistics from matches
export function calculatePlayerStats(
  playerId: string,
  matches: Match[],
  isDouble = false
): PlayerStats {
  const playerMatches = matches.filter(match => {
    if (isDouble) {
      return match.pair1?.player1Id === playerId || 
             match.pair1?.player2Id === playerId ||
             match.pair2?.player1Id === playerId || 
             match.pair2?.player2Id === playerId;
    } else {
      return match.player1Id === playerId || match.player2Id === playerId;
    }
  });

  let matchesWon = 0;
  let setsWon = 0;
  let setsLost = 0;
  let pointsWon = 0;
  let pointsLost = 0;

  playerMatches.forEach(match => {
    const isWinner = isDouble 
      ? match.winnerPairId && (
          (match.pair1?.player1Id === playerId || match.pair1?.player2Id === playerId) && 
          match.winnerPairId === match.pair1Id
        ) || (
          (match.pair2?.player1Id === playerId || match.pair2?.player2Id === playerId) && 
          match.winnerPairId === match.pair2Id
        )
      : match.winnerId === playerId;

    if (isWinner) {
      matchesWon++;
    }

    match.sets.forEach(set => {
      const playerIsPlayer1 = isDouble
        ? match.pair1?.player1Id === playerId || match.pair1?.player2Id === playerId
        : match.player1Id === playerId;

      if (playerIsPlayer1) {
        pointsWon += set.player1Score;
        pointsLost += set.player2Score;
        if (set.player1Score > set.player2Score) {
          setsWon++;
        } else {
          setsLost++;
        }
      } else {
        pointsWon += set.player2Score;
        pointsLost += set.player1Score;
        if (set.player2Score > set.player1Score) {
          setsWon++;
        } else {
          setsLost++;
        }
      }
    });
  });

  const matchesPlayed = playerMatches.length;
  const matchesLost = matchesPlayed - matchesWon;
  const winPercentage = matchesPlayed > 0 ? (matchesWon / matchesPlayed) * 100 : 0;
  const setRatio = setsLost > 0 ? setsWon / setsLost : setsWon;
  const pointRatio = pointsLost > 0 ? pointsWon / pointsLost : pointsWon;

  return {
    playerId,
    tournamentId: matches[0]?.tournamentId || '',
    matchesPlayed,
    matchesWon,
    matchesLost,
    setsWon,
    setsLost,
    pointsWon,
    pointsLost,
    winPercentage,
    setRatio,
    pointRatio,
  };
}

// Calculate tie-break data for a player
export function calculateTieBreakData(
  playerId: string,
  matches: Match[],
  isDouble = false
): TieBreakData {
  const headToHead: Record<string, number> = {};
  const stats = calculatePlayerStats(playerId, matches, isDouble);

  matches.forEach(match => {
    let opponentId: string | undefined;
    let playerWon = false;

    if (isDouble) {
      const isInPair1 = match.pair1?.player1Id === playerId || match.pair1?.player2Id === playerId;
      const isInPair2 = match.pair2?.player1Id === playerId || match.pair2?.player2Id === playerId;
      
      if (isInPair1) {
        opponentId = match.pair2?.id;
        playerWon = match.winnerPairId === match.pair1Id;
      } else if (isInPair2) {
        opponentId = match.pair1?.id;
        playerWon = match.winnerPairId === match.pair2Id;
      }
    } else {
      if (match.player1Id === playerId) {
        opponentId = match.player2Id;
        playerWon = match.winnerId === playerId;
      } else if (match.player2Id === playerId) {
        opponentId = match.player1Id;
        playerWon = match.winnerId === playerId;
      }
    }

    if (opponentId) {
      if (!headToHead[opponentId]) {
        headToHead[opponentId] = 0;
      }
      headToHead[opponentId] += playerWon ? 1 : -1;
    }
  });

  return {
    headToHead,
    setRatio: stats.setRatio,
    pointRatio: stats.pointRatio,
  };
}

// Resolve tie between players using tie-break system
export function resolveTie(
  players: { playerId: string; points: number; stats: PlayerStats; tieBreakData: TieBreakData }[]
): { playerId: string; points: number; stats: PlayerStats; tieBreakData: TieBreakData }[] {
  if (players.length <= 1) return players;

  // Sort by tie-break priorities
  return players.sort((a, b) => {
    // 1. Head-to-Head
    const h2hA = Object.values(a.tieBreakData.headToHead).reduce((sum, val) => sum + val, 0);
    const h2hB = Object.values(b.tieBreakData.headToHead).reduce((sum, val) => sum + val, 0);
    if (h2hA !== h2hB) return h2hB - h2hA;

    // 2. Set Ratio
    if (a.tieBreakData.setRatio !== b.tieBreakData.setRatio) {
      return b.tieBreakData.setRatio - a.tieBreakData.setRatio;
    }

    // 3. Point Ratio
    if (a.tieBreakData.pointRatio !== b.tieBreakData.pointRatio) {
      return b.tieBreakData.pointRatio - a.tieBreakData.pointRatio;
    }

    // 4. Random (in real implementation, this would be a draw/lottery)
    return Math.random() - 0.5;
  });
}

// Generate round robin matches for a group of players
export function generateRoundRobinMatches(
  players: Player[],
  tournamentId: string,
  groupId?: string
): Partial<Match>[] {
  const matches: Partial<Match>[] = [];
  let matchNumber = 1;

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matches.push({
        tournamentId,
        round: 'Round Robin',
        matchNumber: matchNumber++,
        gameType: 'SINGLE',
        player1Id: players[i].id,
        player2Id: players[j].id,
        status: 'NOT_STARTED',
        sets: [],
        groupId,
        stage: 'GROUP',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return matches;
}

// Generate round robin matches for doubles
export function generateRoundRobinMatchesDoubles(
  pairs: PlayerPair[],
  tournamentId: string,
  groupId?: string
): Partial<Match>[] {
  const matches: Partial<Match>[] = [];
  let matchNumber = 1;

  for (let i = 0; i < pairs.length; i++) {
    for (let j = i + 1; j < pairs.length; j++) {
      matches.push({
        tournamentId,
        round: 'Round Robin',
        matchNumber: matchNumber++,
        gameType: 'DOUBLE',
        pair1Id: pairs[i].id,
        pair2Id: pairs[j].id,
        status: 'NOT_STARTED',
        sets: [],
        groupId,
        stage: 'GROUP',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return matches;
}

// Generate single elimination bracket
export function generateSingleEliminationBracket(
  players: Player[]
): { rounds: { name: string; matches: Partial<Match>[] }[] } {
  const rounds: { name: string; matches: Partial<Match>[] }[] = [];
  let currentPlayers = [...players];
  let roundNumber = 1;

  while (currentPlayers.length > 1) {
    const matches: Partial<Match>[] = [];
    const nextRoundPlayers: Player[] = [];
    
    // Pair up players for this round
    for (let i = 0; i < currentPlayers.length; i += 2) {
      if (i + 1 < currentPlayers.length) {
        matches.push({
          round: `Round ${roundNumber}`,
          matchNumber: Math.floor(i / 2) + 1,
          gameType: 'SINGLE',
          player1Id: currentPlayers[i].id,
          player2Id: currentPlayers[i + 1].id,
          status: 'NOT_STARTED',
          sets: [],
          stage: getRoundName(currentPlayers.length),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // Bye for odd number of players
        nextRoundPlayers.push(currentPlayers[i]);
      }
    }

    rounds.push({
      name: getRoundName(currentPlayers.length),
      matches,
    });

    currentPlayers = nextRoundPlayers;
    roundNumber++;
  }

  return { rounds };
}

// Get round name based on number of players
function getRoundName(playerCount: number): string {
  if (playerCount <= 2) return 'FINAL';
  if (playerCount <= 4) return 'SEMIFINAL';
  if (playerCount <= 8) return 'QUARTERFINAL';
  if (playerCount <= 16) return 'ROUND_OF_16';
  if (playerCount <= 32) return 'ROUND_OF_32';
  return `ROUND_${playerCount}`;
}

// Calculate points for round robin (3 points for win, 1 for draw, 0 for loss)
export function calculateRoundRobinPoints(matches: Match[], playerId: string): number {
  let points = 0;
  
  matches.forEach(match => {
    if (match.status === 'COMPLETED' || match.status === 'VERIFIED') {
      if (match.player1Id === playerId || match.player2Id === playerId) {
        if (match.winnerId === playerId) {
          points += 3; // Win
        } else if (!match.winnerId) {
          points += 1; // Draw (if implemented)
        }
        // 0 points for loss
      }
    }
  });

  return points;
}

// Check if a set is completed
export function isSetCompleted(player1Score: number, player2Score: number): boolean {
  const { POINTS_TO_WIN_SET, DEUCE_POINT, DEUCE_LEAD_REQUIRED } = SCORING_SYSTEM;
  
  // Regular win (11 points, opponent has less than 10)
  if ((player1Score >= POINTS_TO_WIN_SET && player2Score < DEUCE_POINT) ||
      (player2Score >= POINTS_TO_WIN_SET && player1Score < DEUCE_POINT)) {
    return true;
  }
  
  // Deuce situation (both players have 10 or more points)
  if (player1Score >= DEUCE_POINT && player2Score >= DEUCE_POINT) {
    return Math.abs(player1Score - player2Score) >= DEUCE_LEAD_REQUIRED;
  }
  
  return false;
}

// Get set winner
export function getSetWinner(player1Score: number, player2Score: number): 1 | 2 | null {
  if (!isSetCompleted(player1Score, player2Score)) {
    return null;
  }
  
  return player1Score > player2Score ? 1 : 2;
}

// Check if match is completed
export function isMatchCompleted(sets: { player1Score: number; player2Score: number }[]): boolean {
  const { MIN_SETS_TO_WIN } = SCORING_SYSTEM;
  
  let player1Sets = 0;
  let player2Sets = 0;
  
  sets.forEach(set => {
    const winner = getSetWinner(set.player1Score, set.player2Score);
    if (winner === 1) player1Sets++;
    if (winner === 2) player2Sets++;
  });
  
  return player1Sets >= MIN_SETS_TO_WIN || player2Sets >= MIN_SETS_TO_WIN;
}

// Get match winner
export function getMatchWinner(sets: { player1Score: number; player2Score: number }[]): 1 | 2 | null {
  if (!isMatchCompleted(sets)) {
    return null;
  }
  
  const { MIN_SETS_TO_WIN } = SCORING_SYSTEM;
  
  let player1Sets = 0;
  let player2Sets = 0;
  
  sets.forEach(set => {
    const winner = getSetWinner(set.player1Score, set.player2Score);
    if (winner === 1) player1Sets++;
    if (winner === 2) player2Sets++;
  });
  
  if (player1Sets >= MIN_SETS_TO_WIN) return 1;
  if (player2Sets >= MIN_SETS_TO_WIN) return 2;
  
  return null;
}

// Format player name for display
export function formatPlayerName(player: Player): string {
  return player.name;
}

// Format pair name for display
export function formatPairName(pair: PlayerPair): string {
  return `${pair.player1.name} / ${pair.player2.name}`;
}

// Generate tournament bracket based on type
export function generateTournamentStructure(
  tournamentType: TournamentType,
  players: Player[],
  pairs: PlayerPair[] = [],
  numberOfGroups?: number
) {
  switch (tournamentType) {
    case 'ROUND_ROBIN':
      return {
        groups: [{
          id: 'main',
          name: 'Main Group',
          players: players,
          playerPairs: pairs,
          matches: pairs.length > 0 
            ? generateRoundRobinMatchesDoubles(pairs, '', 'main')
            : generateRoundRobinMatches(players, '', 'main')
        }],
        brackets: []
      };
      
    case 'GROUP_ROUND_ROBIN':
      const groupSize = Math.ceil(players.length / (numberOfGroups || 2));
      const groups = [];
      
      for (let i = 0; i < (numberOfGroups || 2); i++) {
        const groupPlayers = players.slice(i * groupSize, (i + 1) * groupSize);
        if (groupPlayers.length > 0) {
          groups.push({
            id: `group-${i + 1}`,
            name: `Group ${String.fromCharCode(65 + i)}`, // A, B, C, etc.
            players: groupPlayers,
            playerPairs: [],
            matches: generateRoundRobinMatches(groupPlayers, '', `group-${i + 1}`)
          });
        }
      }
      
      return { groups, brackets: [] };
      
    case 'SINGLE_ELIMINATION':
      return {
        groups: [],
        brackets: [generateSingleEliminationBracket(players)]
      };
      
    default:
      return { groups: [], brackets: [] };
  }
}