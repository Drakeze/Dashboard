'use client';

import { Character } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCategoryAccent, CATEGORY_LABELS } from '@/lib/theme';
import { Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

const STAT_LABELS: { key: keyof Character['stats']; label: string }[] = [
  { key: 'strength', label: 'STR' },
  { key: 'intelligence', label: 'INT' },
  { key: 'charisma', label: 'CHA' },
];

export function CharacterCard({ character }: CharacterCardProps) {
  const accent = getCategoryAccent(character.category);

  return (
    <Link href={`/character/${character.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm py-0">
        <div
          className="h-1 w-full transition-opacity group-hover:opacity-100 opacity-80"
          style={{ backgroundColor: accent.color }}
        />

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
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom, ${accent.soft}, transparent)`,
                  }}
                >
                  <Users className="w-12 h-12" style={{ color: accent.color }} />
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className="bg-primary text-primary-foreground text-xs font-bold">
              Level {character.level}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <Badge
              variant="outline"
              className="text-xs font-medium border-0 bg-background/70 backdrop-blur-sm"
              style={{ color: accent.color }}
            >
              {CATEGORY_LABELS[character.category]}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground line-clamp-1">
              {character.name}
            </h3>
            <p className="text-sm text-muted-foreground">{character.race}</p>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {character.bio}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-border/30">
            {STAT_LABELS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-muted-foreground w-8 tabular-nums">
                  {label}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(character.stats[key] / 20) * 100}%`,
                      backgroundColor: accent.color,
                    }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-foreground w-4 text-right tabular-nums">
                  {character.stats[key]}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              {character.experience.toLocaleString()} XP
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
