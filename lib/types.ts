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
  type: 'mentor' | 'student' | 'ally' | 'rival' | 'enemy' | 'friend';
  description: string;
}

export interface Character {
  id: string;
  name: string;
  class: string;
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
  classFilter: string;
  raceFilter: string;
  levelRange: [number, number];
}
