'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Trophy, Users, Calendar, Award } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tournament', href: '/tournaments', icon: Trophy },
  { name: 'Player', href: '/players', icon: Users },
  { name: 'Matches', href: '/matches', icon: Calendar },
  { name: 'Result', href: '/results', icon: Award },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  // Don't show bottom navigation on certain pages
  const hiddenPaths = ['/create', '/login', '/signup'];
  const shouldHide = hiddenPaths.some(path => pathname?.startsWith(path));

  if (shouldHide) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="flex items-center justify-around h-16">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}