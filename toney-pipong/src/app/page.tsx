'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Calculator, Activity, ArrowRight, Trophy, Users, Calendar } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import TournamentCard from '@/components/tournament/TournamentCard';
import { Tournament } from '@/types';

// Mock data for demonstration
const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Kejohanan Ping Pong Terbuka KL 2024',
    description: 'Tournament description',
    organization: 'Kelab Ping Pong Kuala Lumpur',
    location: 'Dewan Besar KLCC',
    securityPin: '1234',
    creatorId: 'user1',
    status: 'ONGOING',
    tournamentType: 'ROUND_ROBIN',
    gameType: 'SINGLE',
    startDate: new Date('2024-01-15'),
    isITTFCompliant: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Liga Ping Pong Sekolah',
    description: 'Tournament description',
    organization: 'Sekolah Menengah ABC',
    location: 'Dewan Sekolah ABC',
    securityPin: '5678',
    creatorId: 'user2',
    status: 'PENDING',
    tournamentType: 'GROUP_ROUND_ROBIN',
    gameType: 'DOUBLE',
    startDate: new Date('2024-02-01'),
    isITTFCompliant: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const recentActivities = [
  {
    id: '1',
    type: 'tournament_created',
    title: 'Tournament Baharu',
    description: 'Kejohanan Ping Pong Terbuka KL 2024 telah dicipta',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'match_completed',
    title: 'Perlawanan Tamat',
    description: 'Ahmad vs Budi - Ahmad menang 3-1',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
];

export default function Home() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = () => {
    // Mock login
    setUser({
      id: '1',
      name: 'Ahmad Rahman',
      email: 'ahmad@example.com',
      isGuest: false,
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <MainLayout
      user={user}
      notifications={3}
      onLogin={handleLogin}
      onLogout={handleLogout}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Toney PiPong
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Aplikasi pengurusan tournament ping pong yang mesra pengguna
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-2xl mx-auto">
              Mobile-first design dengan sokongan pelbagai format pertandingan untuk kemudahan penganjur dan peserta
            </p>
            
            {user ? (
              <Link href="/create">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Tournament
                </Button>
              </Link>
            ) : (
              <Button size="lg" onClick={handleLogin} className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="w-5 h-5 mr-2" />
                Sign In to Create Tournament
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tournament Calculator Widget */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tournament Calculator
                  </h3>
                  <p className="text-gray-600">
                    Kira bilangan perlawanan dan jadual tournament anda
                  </p>
                </div>
                <Button variant="outline">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <Link href="/activity" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {recentActivities.map((activity) => (
              <Card key={activity.id} hover>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {activity.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* My Tournaments (if user is logged in) */}
        {user && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Tournaments</h2>
              <Link href="/tournaments/my" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockTournaments.slice(0, 3).map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </section>
        )}

        {/* Other Tournaments */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Other Tournaments</h2>
            <Link href="/tournaments" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View More <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTournaments.map((tournament) => (
              <TournamentCard 
                key={tournament.id} 
                tournament={tournament}
                showWinners={tournament.status === 'FINISHED'}
                winners={{
                  first: { name: 'Ahmad Rahman' },
                  second: { name: 'Budi Santoso' },
                  third: { name: 'Charlie Wong' },
                }}
              />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Active Tournaments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">248</p>
                <p className="text-sm text-gray-600">Total Players</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center">
                <Calendar className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-gray-600">Matches Today</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
