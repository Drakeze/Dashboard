import type { CharacterCategory } from '@prisma/client';

export type { CharacterCategory };

export interface CharacterStat {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterRelationship {
  characterId: string;
  type:
    | 'mentor'
    | 'student'
    | 'ally'
    | 'rival'
    | 'enemy'
    | 'friend'
    | 'brother'
    | 'teammate';
  description: string;
}

export interface Character {
  id: string;
  name: string;
  category: CharacterCategory;
  race: string;
  level: number;
  experience: number;
  imageUrl: string;
  bio: string;
  alignment: string;
  stats: CharacterStat;
  skills: string[];
  equipment: string[];
  backstory: string;
  achievements: string[];
  relationships: CharacterRelationship[];
}

export interface FilterState {
  searchTerm: string;
  categoryFilter: string;
  raceFilter: string;
  levelRange: [number, number];
}
