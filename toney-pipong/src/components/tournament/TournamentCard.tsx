import Link from 'next/link';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { Tournament, TournamentStatus } from '@/types';
import { TOURNAMENT_STATUS, TOURNAMENT_TYPES } from '@/utils/constants';
import Card, { CardContent, CardFooter } from '../ui/Card';
import { format } from 'date-fns';

interface TournamentCardProps {
  tournament: Tournament;
  showWinners?: boolean;
  winners?: {
    first?: { name: string; avatar?: string };
    second?: { name: string; avatar?: string };
    third?: { name: string; avatar?: string };
  };
}

export default function TournamentCard({ 
  tournament, 
  showWinners = false, 
  winners 
}: TournamentCardProps) {
  const statusConfig = TOURNAMENT_STATUS[tournament.status];
  const tournamentTypeConfig = TOURNAMENT_TYPES[tournament.tournamentType];

  return (
    <Link href={`/tournaments/${tournament.id}`}>
      <Card hover className="h-full">
        {/* Tournament Banner */}
        <div className="relative h-32 mb-4 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
          {tournament.banner ? (
            <img
              src={tournament.banner}
              alt={tournament.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white opacity-50" />
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.color}`}>
              {statusConfig.name}
            </span>
          </div>

          {/* Club Logo */}
          {tournament.clubLogo && (
            <div className="absolute bottom-2 left-2 w-10 h-10 bg-white rounded-full p-1">
              <img
                src={tournament.clubLogo}
                alt="Club logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <CardContent>
          {/* Tournament Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {tournament.title}
          </h3>

          {/* Tournament Type */}
          <div className="flex items-center space-x-1 mb-2">
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
              {tournamentTypeConfig.name}
            </span>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {tournament.gameType}
            </span>
          </div>

          {/* Organization */}
          <p className="text-sm text-gray-600 mb-3 font-medium">
            {tournament.organization}
          </p>

          {/* Tournament Info */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{format(tournament.startDate, 'dd MMM yyyy')}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="truncate">{tournament.location}</span>
            </div>
          </div>

          {/* Winners Display (for finished tournaments) */}
          {showWinners && tournament.status === 'FINISHED' && winners && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Winners</h4>
              <div className="space-y-1">
                {winners.first && (
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">🥇</span>
                    <span className="text-sm text-gray-700">{winners.first.name}</span>
                  </div>
                )}
                {winners.second && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">🥈</span>
                    <span className="text-sm text-gray-700">{winners.second.name}</span>
                  </div>
                )}
                {winners.third && (
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600">🥉</span>
                    <span className="text-sm text-gray-700">{winners.third.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span>View Details</span>
            </div>
            <div className="flex items-center space-x-1">
              {tournament.isITTFCompliant && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                  ITTF
                </span>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}