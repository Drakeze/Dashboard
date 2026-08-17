'use client';

import { useState, useMemo } from 'react';
import { getMaxLevel, getUniqueCategories, getUniqueRaces, filterCharacters } from '@/lib/character-data';
import { FilterState, Character } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/theme';
import { CharacterCard } from '@/components/character-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FieldLabel } from '@/components/ui/field';
import { Users, RotateCcw } from 'lucide-react';

interface CharacterBrowserProps {
  characters: Character[];
}

export function CharacterBrowser({ characters }: CharacterBrowserProps) {
  const maxLevel = useMemo(() => getMaxLevel(characters), [characters]);
  const categories = useMemo(() => getUniqueCategories(characters), [characters]);
  const races = useMemo(() => getUniqueRaces(characters), [characters]);

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    categoryFilter: '',
    raceFilter: '',
    levelRange: [1, maxLevel],
  });

  const filteredCharacters = useMemo(() => {
    return filterCharacters(
      characters,
      filters.searchTerm,
      filters.categoryFilter,
      filters.raceFilter,
      filters.levelRange
    );
  }, [characters, filters]);

  const handleReset = () => {
    setFilters({
      searchTerm: '',
      categoryFilter: '',
      raceFilter: '',
      levelRange: [1, maxLevel],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10">
        {/* Page intro — not sticky, AppHeader already owns the sticky nav */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Directory
          </h1>
          <p className="text-muted-foreground mt-1">
            {characters.length} characters tracked across the roster
          </p>
        </div>

        {/* Filters toolbar — single row, product-toolbar feel */}
        <Card className="p-4 mb-8 bg-card/50 border-border/30 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="flex-1 min-w-[180px] space-y-1.5">
              <FieldLabel htmlFor="search" className="text-xs">
                Search
              </FieldLabel>
              <Input
                id="search"
                placeholder="Character name..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                className="bg-input/80 border-border/50"
              />
            </div>

            <div className="w-full lg:w-44 space-y-1.5">
              <FieldLabel htmlFor="category" className="text-xs">
                Category
              </FieldLabel>
              <Select
                value={filters.categoryFilter || 'all'}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    categoryFilter: value === 'all' ? '' : value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-input/80 border-border/50">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full lg:w-44 space-y-1.5">
              <FieldLabel htmlFor="race" className="text-xs">
                Race
              </FieldLabel>
              <Select
                value={filters.raceFilter || 'all'}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    raceFilter: value === 'all' ? '' : value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-input/80 border-border/50">
                  <SelectValue placeholder="All Races" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Races</SelectItem>
                  {races.map((race) => (
                    <SelectItem key={race} value={race}>
                      {race}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full lg:w-48 space-y-1.5">
              <FieldLabel className="text-xs">
                Level: {filters.levelRange[0]} - {filters.levelRange[1]}
              </FieldLabel>
              <Slider
                min={1}
                max={maxLevel}
                step={1}
                value={filters.levelRange}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    levelRange: [value[0], value[1]],
                  })
                }
                className="w-full"
              />
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2 shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredCharacters.length}{' '}
              <span className="text-muted-foreground text-lg font-normal">
                {filteredCharacters.length === 1 ? 'character' : 'characters'}{' '}
                found
              </span>
            </h2>
          </div>

          {filteredCharacters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/50 border-border/30">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No characters found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to find the character you&apos;re
                looking for
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
