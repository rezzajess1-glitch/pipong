'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, MapPin, Calendar, Info, Shield } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TOURNAMENT_TYPES, GAME_TYPES, DEFAULT_TOURNAMENT_FORM } from '@/utils/constants';
import { generatePin } from '@/utils/tournament';
import { CreateTournamentForm, TournamentType, GameType } from '@/types';

export default function CreateTournamentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTournamentForm>({
    ...DEFAULT_TOURNAMENT_FORM,
    startDate: new Date(),
  });
  const [generatedPin] = useState(generatePin());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'date') {
      setFormData(prev => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'banner' | 'clubLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would normally send the data to your backend
      console.log('Creating tournament with data:', formData);
      console.log('Generated PIN:', generatedPin);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to tournament page (mock ID)
      router.push('/tournaments/new-tournament-id');
    } catch (error) {
      console.error('Error creating tournament:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTournamentType = TOURNAMENT_TYPES[formData.tournamentType];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create Tournament</h1>
          <p className="text-gray-600 mt-2">
            Set up your ping pong tournament with customizable formats and settings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Tournament Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Kejohanan Ping Pong Terbuka KL 2024"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization/Club *
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Kelab Ping Pong Kuala Lumpur"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your tournament, rules, and any special information..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    value={formData.startDate.toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Dewan Besar KLCC"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="googleMapsLink" className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Link (Optional)
                </label>
                <input
                  type="url"
                  id="googleMapsLink"
                  name="googleMapsLink"
                  value={formData.googleMapsLink || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Tournament Format */}
          <Card>
            <CardHeader>
              <CardTitle>Tournament Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="tournamentType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tournament Type *
                </label>
                <select
                  id="tournamentType"
                  name="tournamentType"
                  required
                  value={formData.tournamentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.values(TOURNAMENT_TYPES).map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.name} {type.important && '⭐'}
                    </option>
                  ))}
                </select>
                {selectedTournamentType && (
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedTournamentType.description}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="gameType" className="block text-sm font-medium text-gray-700 mb-2">
                  Game Type *
                </label>
                <select
                  id="gameType"
                  name="gameType"
                  required
                  value={formData.gameType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.values(GAME_TYPES).map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.name} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isITTFCompliant"
                  name="isITTFCompliant"
                  checked={formData.isITTFCompliant}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isITTFCompliant" className="ml-2 block text-sm text-gray-700">
                  Follow ITTF Laws & Regulations
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Security PIN */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security PIN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Your Tournament PIN</h4>
                    <div className="mt-2">
                      <span className="text-2xl font-mono font-bold text-yellow-900 bg-yellow-100 px-3 py-1 rounded">
                        {generatedPin}
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-2">
                      This PIN will be used to grant access to helpers (AJK) for managing players and acting as umpires. 
                      Only you and admins can see this PIN. You can change it later.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Media & Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-2">
                  Tournament Banner (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload tournament banner</p>
                  <input
                    type="file"
                    id="banner"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'banner')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div>
                <label htmlFor="clubLogo" className="block text-sm font-medium text-gray-700 mb-2">
                  Club Logo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload club logo</p>
                  <input
                    type="file"
                    id="clubLogo"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'clubLogo')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? 'Creating Tournament...' : 'Create Tournament'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}