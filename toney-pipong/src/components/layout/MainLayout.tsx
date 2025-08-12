'use client';

import { ReactNode } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  isGuest: boolean;
}

interface MainLayoutProps {
  children: ReactNode;
  user?: User;
  notifications?: number;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function MainLayout({ 
  children, 
  user, 
  notifications = 0, 
  onLogin, 
  onLogout 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        notifications={notifications} 
        onLogin={onLogin} 
        onLogout={onLogout} 
      />
      
      <main className="pb-16 md:pb-0">
        {children}
      </main>
      
      <BottomNavigation />
    </div>
  );
}