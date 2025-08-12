'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, CheckCircle, RotateCcw, Info } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Match, Set } from '@/types';
import { SCORING_SYSTEM } from '@/utils/constants';
import { isSetCompleted, getSetWinner, isMatchCompleted, getMatchWinner } from '@/utils/tournament';
import { format } from 'date-fns';

interface ScoreboardProps {
  match: Match;
  onUpdateScore: (matchId: string, sets: Set[]) => void;
  onVerifyMatch: (matchId: string) => void;
  hasUmpireAccess: boolean;
}

export default function Scoreboard({ 
  match, 
  onUpdateScore, 
  onVerifyMatch, 
  hasUmpireAccess 
}: ScoreboardProps) {
  const [sets, setSets] = useState<Set[]>(match.sets || []);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [servingPlayer, setServingPlayer] = useState<1 | 2>(1);
  const [totalPoints, setTotalPoints] = useState({ player1: 0, player2: 0 });

  // Initialize first set if none exist
  useEffect(() => {
    if (sets.length === 0) {
      const newSet: Set = {
        id: `set-1`,
        setNumber: 1,
        player1Score: 0,
        player2Score: 0,
        isCompleted: false,
        serves: [],
      };
      setSets([newSet]);
    }
  }, []);

  // Calculate total points and determine serve
  useEffect(() => {
    if (sets.length > 0 && currentSetIndex < sets.length) {
      const currentSet = sets[currentSetIndex];
      const totalSetPoints = currentSet.player1Score + currentSet.player2Score;
      
      // In ping pong, serve changes every 2 points
      const servingPlayerCalc = Math.floor(totalSetPoints / 2) % 2 === 0 ? 1 : 2;
      setServingPlayer(servingPlayerCalc as 1 | 2);

      // Calculate total points across all sets
      const total = sets.reduce(
        (acc, set) => ({
          player1: acc.player1 + set.player1Score,
          player2: acc.player2 + set.player2Score,
        }),
        { player1: 0, player2: 0 }
      );
      setTotalPoints(total);
    }
  }, [sets, currentSetIndex]);

  const updateScore = (player: 1 | 2, increment: number) => {
    if (!hasUmpireAccess) return;

    setSets(prevSets => {
      const newSets = [...prevSets];
      const currentSet = { ...newSets[currentSetIndex] };

      if (player === 1) {
        currentSet.player1Score = Math.max(0, currentSet.player1Score + increment);
      } else {
        currentSet.player2Score = Math.max(0, currentSet.player2Score + increment);
      }

      // Check if set is completed
      if (isSetCompleted(currentSet.player1Score, currentSet.player2Score)) {
        currentSet.isCompleted = true;
        const winner = getSetWinner(currentSet.player1Score, currentSet.player2Score);
        if (winner === 1) {
          currentSet.winnerId = match.player1Id;
        } else if (winner === 2) {
          currentSet.winnerId = match.player2Id;
        }

        // Check if we need a new set (match not completed)
        newSets[currentSetIndex] = currentSet;
        if (!isMatchCompleted(newSets.map(s => ({ player1Score: s.player1Score, player2Score: s.player2Score }))) && 
            newSets.length < SCORING_SYSTEM.DEFAULT_BEST_OF) {
          const newSet: Set = {
            id: `set-${newSets.length + 1}`,
            setNumber: newSets.length + 1,
            player1Score: 0,
            player2Score: 0,
            isCompleted: false,
            serves: [],
          };
          newSets.push(newSet);
          setCurrentSetIndex(newSets.length - 1);
        }
      } else {
        newSets[currentSetIndex] = currentSet;
      }

      return newSets;
    });
  };

  const handleVerify = () => {
    if (isMatchCompleted(sets.map(s => ({ player1Score: s.player1Score, player2Score: s.player2Score })))) {
      onVerifyMatch(match.id);
    }
  };

  const resetCurrentSet = () => {
    if (!hasUmpireAccess) return;
    
    setSets(prevSets => {
      const newSets = [...prevSets];
      newSets[currentSetIndex] = {
        ...newSets[currentSetIndex],
        player1Score: 0,
        player2Score: 0,
        isCompleted: false,
        winnerId: undefined,
      };
      return newSets;
    });
  };

  // Calculate sets won by each player
  const setsWon = sets.reduce(
    (acc, set) => {
      if (set.isCompleted) {
        const winner = getSetWinner(set.player1Score, set.player2Score);
        if (winner === 1) acc.player1++;
        if (winner === 2) acc.player2++;
      }
      return acc;
    },
    { player1: 0, player2: 0 }
  );

  const matchCompleted = isMatchCompleted(sets.map(s => ({ player1Score: s.player1Score, player2Score: s.player2Score })));
  const matchWinner = getMatchWinner(sets.map(s => ({ player1Score: s.player1Score, player2Score: s.player2Score })));

  const currentSet = sets[currentSetIndex];
  const isCurrentSetCompleted = currentSet ? isSetCompleted(currentSet.player1Score, currentSet.player2Score) : false;

  // Get player names
  const player1Name = match.player1?.name || 'Player 1';
  const player2Name = match.player2?.name || 'Player 2';

  if (!hasUmpireAccess) {
    return (
      <Card>
        <CardContent className="text-center p-8">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Umpire Access Required</h3>
          <p className="text-gray-600">
            You need umpire access to manage the scoreboard for this match.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {match.round} - Match {match.matchNumber}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              {match.table && `Table ${match.table} • `}
              {format(new Date(), 'dd MMM yyyy, HH:mm')}
            </p>
          </div>

          {matchCompleted && (
            <div className="text-center mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">
                🏆 {matchWinner === 1 ? player1Name : player2Name} Wins!
              </h3>
              <p className="text-green-600">
                Final Score: {setsWon.player1} - {setsWon.player2}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Score Display */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Player 1 */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{player1Name}</h3>
              <div className="text-4xl font-bold mb-2">
                {currentSet?.player1Score || 0}
              </div>
              <div className="text-sm text-gray-600">
                Sets: {setsWon.player1} | Points: {totalPoints.player1}
              </div>
              {servingPlayer === 1 && !isCurrentSetCompleted && (
                <div className="mt-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-sm text-green-600">Serving</span>
                </div>
              )}
            </div>

            {/* Player 2 */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{player2Name}</h3>
              <div className="text-4xl font-bold mb-2">
                {currentSet?.player2Score || 0}
              </div>
              <div className="text-sm text-gray-600">
                Sets: {setsWon.player2} | Points: {totalPoints.player2}
              </div>
              {servingPlayer === 2 && !isCurrentSetCompleted && (
                <div className="mt-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-sm text-green-600">Serving</span>
                </div>
              )}
            </div>
          </div>

          {/* Score Controls */}
          {!matchCompleted && (
            <div className="grid grid-cols-2 gap-8">
              {/* Player 1 Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => updateScore(1, -1)}
                  disabled={!currentSet || currentSet.player1Score === 0}
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => updateScore(1, 1)}
                  disabled={isCurrentSetCompleted}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              {/* Player 2 Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => updateScore(2, -1)}
                  disabled={!currentSet || currentSet.player2Score === 0}
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => updateScore(2, 1)}
                  disabled={isCurrentSetCompleted}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Current Set Info */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Set {currentSetIndex + 1} of {Math.min(SCORING_SYSTEM.DEFAULT_BEST_OF, sets.length)}
              {currentSet && currentSet.player1Score >= SCORING_SYSTEM.DEUCE_POINT && 
               currentSet.player2Score >= SCORING_SYSTEM.DEUCE_POINT && (
                <span className="ml-2 text-orange-600 font-medium">• DEUCE</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sets Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Sets Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {sets.slice(0, SCORING_SYSTEM.DEFAULT_BEST_OF).map((set, index) => (
              <div
                key={set.id}
                className={`p-3 rounded-lg border text-center ${
                  index === currentSetIndex && !set.isCompleted
                    ? 'border-blue-500 bg-blue-50'
                    : set.isCompleted
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-sm font-medium mb-1">Set {set.setNumber}</div>
                <div className="text-lg font-bold">
                  {set.player1Score} - {set.player2Score}
                </div>
                {set.isCompleted && (
                  <div className="text-xs text-green-600 mt-1">✓ Complete</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        {!matchCompleted && (
          <Button
            variant="outline"
            onClick={resetCurrentSet}
            disabled={!currentSet || (currentSet.player1Score === 0 && currentSet.player2Score === 0)}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Set
          </Button>
        )}

        {matchCompleted && match.status !== 'VERIFIED' && (
          <Button onClick={handleVerify} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Verify Match
          </Button>
        )}
      </div>
    </div>
  );
}