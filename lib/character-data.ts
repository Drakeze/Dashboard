import { prisma } from './prisma';
import type { Character } from './types';
import type { Character as PrismaCharacter } from '@prisma/client';

function toCharacter(row: PrismaCharacter): Character {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    race: row.race,
    level: row.level,
    experience: row.experience,
    imageUrl: row.imageUrl,
    bio: row.bio,
    alignment: row.alignment,
    stats: {
      strength: row.strength,
      dexterity: row.dexterity,
      constitution: row.constitution,
      intelligence: row.intelligence,
      wisdom: row.wisdom,
      charisma: row.charisma,
    },
    skills: row.skills,
    equipment: row.equipment,
    backstory: row.backstory,
    achievements: row.achievements,
    relationships: row.relationships as unknown as Character['relationships'],
  };
}

export async function getCharacters(): Promise<Character[]> {
  const rows = await prisma.character.findMany({
    where: { status: 'APPROVED' },
    orderBy: { name: 'asc' },
  });
  return rows.map(toCharacter);
}

const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

export async function getCharacterById(id: string): Promise<Character | null> {
  if (!OBJECT_ID_PATTERN.test(id)) return null;
  const row = await prisma.character.findUnique({ where: { id } });
  if (!row || row.status !== 'APPROVED') return null;
  return toCharacter(row);
}

export const getUniqueCategories = (characters: Character[]): string[] => {
  const categories = new Set(characters.map((char) => char.category));
  return Array.from(categories).sort();
};

export const getUniqueRaces = (characters: Character[]): string[] => {
  const races = new Set(characters.map((char) => char.race));
  return Array.from(races).sort();
};

export const getMaxLevel = (characters: Character[]): number => {
  if (characters.length === 0) return 1;
  return Math.max(...characters.map((char) => char.level));
};

export const filterCharacters = (
  characters: Character[],
  searchTerm: string,
  categoryFilter: string,
  raceFilter: string,
  levelRange: [number, number]
): Character[] => {
  return characters.filter((char) => {
    const matchesSearch =
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === '' || char.category === categoryFilter;
    const matchesRace = raceFilter === '' || char.race === raceFilter;
    const matchesLevel = char.level >= levelRange[0] && char.level <= levelRange[1];

    return matchesSearch && matchesCategory && matchesRace && matchesLevel;
  });
};
