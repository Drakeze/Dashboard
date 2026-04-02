'use client';

import { useState, useMemo } from 'react';
import { CHARACTERS, getMaxLevel, getUniqueClasses, getUniqueRaces, filterCharacters } from '@/lib/character-data';
import { FilterState } from '@/lib/types';
import { CharacterCard } from '@/components/character-card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FieldLabel } from '@/components/ui/field';
import { Sword, Filter, RotateCcw } from 'lucide-react';

const maxLevel = getMaxLevel();
const classes = getUniqueClasses();
const races = getUniqueRaces();

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    classFilter: '',
    raceFilter: '',
    levelRange: [1, maxLevel],
  });

  const filteredCharacters = useMemo(() => {
    return filterCharacters(
      CHARACTERS,
      filters.searchTerm,
      filters.classFilter,
      filters.raceFilter,
      filters.levelRange
    );
  }, [filters]);

  const handleReset = () => {
    setFilters({
      searchTerm: '',
      classFilter: '',
      raceFilter: '',
      levelRange: [1, maxLevel],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Sword className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Character Compendium
            </h1>
          </div>
          <p className="text-muted-foreground">
            Explore and manage legendary characters from across the realms
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <Card className="p-6 mb-8 bg-card/50 border-border/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Filter Characters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="space-y-2">
              <FieldLabel htmlFor="search">Search</FieldLabel>
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

            {/* Class Filter */}
            <div className="space-y-2">
              <FieldLabel htmlFor="class">Class</FieldLabel>
              <Select
                value={filters.classFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, classFilter: value })
                }
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </Select>
            </div>

            {/* Race Filter */}
            <div className="space-y-2">
              <FieldLabel htmlFor="race">Race</FieldLabel>
              <Select
                value={filters.raceFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, raceFilter: value })
                }
              >
                <option value="">All Races</option>
                {races.map((race) => (
                  <option key={race} value={race}>
                    {race}
                  </option>
                ))}
              </Select>
            </div>

            {/* Level Range */}
            <div className="space-y-2">
              <FieldLabel>
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
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Filters
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
              <Sword className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
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
