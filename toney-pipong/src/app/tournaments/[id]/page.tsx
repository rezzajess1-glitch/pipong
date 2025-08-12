'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Users, Calendar, Award, Settings, MapPin, Share2, Shield, Key } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TOURNAMENT_STATUS, TOURNAMENT_TYPES, GAME_TYPES } from '@/utils/constants';
import { validatePin } from '@/utils/tournament';
import { Tournament } from '@/types';
import { format } from 'date-fns';

// Mock tournament data
const mockTournament: Tournament = {
  id: '1',
  title: 'Kejohanan Ping Pong Terbuka KL 2024',
  description: 'Tournament terbuka untuk semua peringkat pemain. Format Round Robin dengan sistem mata terkumpul. Pemenang ditentukan berdasarkan jumlah mata terbanyak selepas semua perlawanan tamat.',
  organization: 'Kelab Ping Pong Kuala Lumpur',
  location: 'Dewan Besar KLCC',
  googleMapsLink: 'https://maps.google.com/klcc',
  securityPin: '1234',
  creatorId: 'user1',
  status: 'ONGOING',
  tournamentType: 'ROUND_ROBIN',
  gameType: 'SINGLE',
  startDate: new Date('2024-01-15'),
  endDate: new Date('2024-01-17'),
  isITTFCompliant: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-10'),
};

export default function TournamentDetailPage() {
  const params = useParams();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [pinError, setPinError] = useState('');
  const [user] = useState({ id: 'user1', name: 'Ahmad Rahman', isGuest: false }); // Mock user

  const tournamentId = params?.id as string;
  const tournament = mockTournament; // In real app, fetch by ID
  
  const statusConfig = TOURNAMENT_STATUS[tournament.status];
  const tournamentTypeConfig = TOURNAMENT_TYPES[tournament.tournamentType];
  const gameTypeConfig = GAME_TYPES[tournament.gameType];
  
  const isCreator = user?.id === tournament.creatorId;

  const handlePinSubmit = () => {
    if (validatePin(pinInput) && pinInput === tournament.securityPin) {
      setHasAccess(true);
      setShowPinModal(false);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Invalid PIN. Please try again.');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tournament.title,
        text: `Join the ${tournament.title} tournament`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <MainLayout user={user}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{tournament.title}</h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusConfig.color}`}>
                  {statusConfig.name}
                </span>
              </div>
              <p className="text-gray-600">{tournament.organization}</p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              {isCreator && (
                <Link href={`/tournaments/${tournament.id}/edit`}>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tournament Info */}
            <Card>
              <CardHeader>
                <CardTitle>Tournament Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{tournament.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Tournament Type</h4>
                    <p className="text-gray-600">{tournamentTypeConfig.name}</p>
                    <p className="text-sm text-gray-500">{tournamentTypeConfig.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Game Type</h4>
                    <p className="text-gray-600">{gameTypeConfig.name}</p>
                    <p className="text-sm text-gray-500">{gameTypeConfig.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Start Date</h4>
                    <p className="text-gray-600">{format(tournament.startDate, 'dd MMMM yyyy')}</p>
                  </div>
                  
                  {tournament.endDate && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">End Date</h4>
                      <p className="text-gray-600">{format(tournament.endDate, 'dd MMMM yyyy')}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{tournament.location}</span>
                    {tournament.googleMapsLink && (
                      <a 
                        href={tournament.googleMapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        (View on Maps)
                      </a>
                    )}
                  </div>
                </div>
                
                {tournament.isITTFCompliant && (
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    ✓ ITTF Compliant
                  </div>
                )}
              </CardContent>
            </Card>

            {/* PIN Access Section */}
            {!isCreator && !hasAccess && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Access Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    To view players, manage matches, or act as an umpire, you need access from the tournament organizer.
                  </p>
                  <Button onClick={() => setShowPinModal(true)}>
                    <Shield className="w-4 h-4 mr-2" />
                    Enter PIN
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link 
                  href={`/tournaments/${tournament.id}/players`}
                  className={`flex items-center p-3 rounded-lg border transition-colors ${
                    hasAccess || isCreator 
                      ? 'hover:bg-gray-50 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Players</p>
                    <p className="text-sm text-gray-500">View all participants</p>
                  </div>
                </Link>
                
                <Link 
                  href={`/tournaments/${tournament.id}/matches`}
                  className={`flex items-center p-3 rounded-lg border transition-colors ${
                    hasAccess || isCreator 
                      ? 'hover:bg-gray-50 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Matches</p>
                    <p className="text-sm text-gray-500">Schedule & results</p>
                  </div>
                </Link>
                
                <Link 
                  href={`/tournaments/${tournament.id}/results`}
                  className="flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Award className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium">Results</p>
                    <p className="text-sm text-gray-500">Standings & rankings</p>
                  </div>
                </Link>
                
                {isCreator && (
                  <Link 
                    href={`/tournaments/${tournament.id}/settings`}
                    className="flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-sm text-gray-500">Manage tournament</p>
                    </div>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Tournament Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Tournament Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Players</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Matches Played</span>
                  <span className="font-medium">8/15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium">53%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* PIN Modal */}
        {showPinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Enter Tournament PIN</h3>
              <p className="text-gray-600 mb-4">
                Ask the tournament organizer for the 4-digit PIN to get access.
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="0000"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-xl"
                />
                
                {pinError && (
                  <p className="text-red-600 text-sm">{pinError}</p>
                )}
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowPinModal(false);
                      setPinInput('');
                      setPinError('');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePinSubmit}
                    disabled={pinInput.length !== 4}
                    className="flex-1"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}