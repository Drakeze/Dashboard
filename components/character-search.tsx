'use client';

import { useState, useCallback } from 'react';
import { CHARACTERS } from '@/lib/character-data';
import { Character } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Search, Zap } from 'lucide-react';
import Link from 'next/link';

interface CharacterSearchProps {
  className?: string;
}

export function CharacterSearch({ className }: CharacterSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCharacters: Character[] = searchTerm
    ? CHARACTERS.filter(
        (char) =>
          char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          char.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
          char.race.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search characters, classes, races..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="pl-10 bg-input/80 border-border/50"
        />
      </div>

      {open && searchTerm && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-card/95 border-border/30 backdrop-blur-sm shadow-lg z-50 p-0 overflow-hidden">
          <Command>
            <CommandList>
              {filteredCharacters.length > 0 ? (
                <CommandGroup heading="Characters">
                  {filteredCharacters.map((character) => (
                    <Link
                      key={character.id}
                      href={`/character/${character.id}`}
                      onClick={() => {
                        setSearchTerm('');
                        setOpen(false);
                      }}
                    >
                      <CommandItem className="cursor-pointer px-4 py-3 flex items-center justify-between hover:bg-muted/30">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {character.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {character.race} • {character.class}
                          </p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Lvl {character.level}
                        </Badge>
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty className="px-4 py-6 text-center text-muted-foreground">
                  <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No characters found matching &quot;{searchTerm}&quot;</p>
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </Card>
      )}

      {open && !searchTerm && (
        <Card
          className="absolute top-full left-0 right-0 mt-2 bg-card/95 border-border/30 backdrop-blur-sm shadow-lg z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <p className="text-xs text-muted-foreground text-center">
            Type to search characters, classes, or races
          </p>
        </Card>
      )}
    </div>
  );
}
