'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sword, Home, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CharacterSearch } from '@/components/character-search';

export function AppHeader() {
  const pathname = usePathname();

  // Don't show header on detail pages
  if (pathname.startsWith('/character/')) {
    return null;
  }

  const navItems = [
    {
      href: '/',
      label: 'Directory',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      href: '/stats',
      label: 'Statistics',
      icon: BarChart3,
      isActive: pathname === '/stats',
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Sword className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">
              Compendium
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    item.isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-sm">
            <CharacterSearch />
          </div>
        </div>
      </div>
    </header>
  );
}
