'use client';

import { Character } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sword, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/character/${character.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="relative h-48 bg-gradient-to-b from-primary/20 to-transparent">
          <div className="absolute inset-0 flex items-center justify-center bg-muted/40">
            <div className="relative w-full h-full">
              {character.imageUrl.startsWith('/') ? (
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  className="object-cover"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary/30 to-secondary/30 flex items-center justify-center">
                  <Sword className="w-12 h-12 text-primary/50" />
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className="bg-primary text-primary-foreground text-xs font-bold">
              Level {character.level}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground line-clamp-1">
              {character.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {character.race} {character.class}
            </p>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {character.bio}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Sword className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  {character.stats.strength}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-foreground">
                  {character.stats.constitution}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-secondary" />
                <span className="text-xs font-semibold text-foreground">
                  {character.stats.intelligence}
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {character.experience.toLocaleString()} XP
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
