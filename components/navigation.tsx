'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sword, BarChart3, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

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
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border/30 bg-background/80 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-3 text-xs font-medium transition-colors',
                item.isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
