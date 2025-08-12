'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Settings, LogIn, LogOut, User, ChevronDown, Menu, X } from 'lucide-react';
import { LANGUAGES } from '@/utils/constants';

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  isGuest: boolean;
}

interface HeaderProps {
  user?: User;
  notifications?: number;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Header({ user, notifications = 0, onLogin, onLogout }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('BM');
  const [theme, setTheme] = useState('light');

  const handleLanguageChange = (langKey: string) => {
    setLanguage(langKey);
    // In a real app, this would trigger a language change
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // In a real app, this would trigger a theme change
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              {/* Ping Pong Icon */}
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏓</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Toney PiPong</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/tournaments" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tournaments
            </Link>
            <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create Tournament
            </Link>
          </nav>

          {/* Right side - Notifications and User */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {user ? (
                  <>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <span className="hidden sm:block text-gray-700">{user.name}</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="hidden sm:block text-gray-700">Guest</span>
                  </>
                )}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {/* User Info */}
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      {user.email && (
                        <p className="text-sm text-gray-500">{user.email}</p>
                      )}
                    </div>
                  )}

                  {/* Settings */}
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Settings</span>
                    </div>

                    {/* Language Selection */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-500 uppercase tracking-wide">Language</label>
                      <div className="flex space-x-2 mt-1">
                        {Object.entries(LANGUAGES).map(([key, lang]) => (
                          <button
                            key={key}
                            onClick={() => handleLanguageChange(key)}
                            className={`px-2 py-1 text-sm rounded ${
                              language === key
                                ? 'bg-blue-100 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {lang.flag} {lang.key}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-500 uppercase tracking-wide">Theme</label>
                      <button
                        onClick={handleThemeToggle}
                        className="flex items-center space-x-2 mt-1 text-sm text-gray-600 hover:text-gray-900"
                      >
                        <span>{theme === 'light' ? '🌙' : '☀️'}</span>
                        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Authentication */}
                  <div className="border-t border-gray-200 pt-1">
                    {user ? (
                      <button
                        onClick={onLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                      </button>
                    ) : (
                      <button
                        onClick={onLogin}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Sign in</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/tournaments" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tournaments
              </Link>
              <Link 
                href="/create" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Tournament
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}