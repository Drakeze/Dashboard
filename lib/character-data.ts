import { Character } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'char_001',
    name: 'Gumball Watterson',
    class: 'Trickster',
    race: 'Cat',
    level: 10,
    experience: 52000,
    imageUrl: '/characters/gumball.jpg',
    bio: 'A blue cat with an optimistic personality and a talent for getting into ridiculous situations.',
    alignment: 'Chaotic Good',
    stats: {
      strength: 9,
      dexterity: 14,
      constitution: 11,
      intelligence: 12,
      wisdom: 10,
      charisma: 15,
    },
    skills: ['Comedy', 'Problem Solving', 'Luck', 'Adaptability'],
    equipment: ['Striped Shirt', 'Rubber Shoes', 'Optimism'],
    backstory:
      'Gumball is a blue cat living in Elmore with his adopted brother Darwin. He navigates the absurdities of his world with humor and heart, always trying to do the right thing despite constant chaos.',
    achievements: ['Survivor', 'Friend Keeper', 'Chaos Navigator'],
    relationships: [
      {
        characterId: 'char_002',
        type: 'brother',
        description: 'Adopted brother of Darwin',
      },
    ],
  },
  {
    id: 'char_002',
    name: 'Darwin Watterson',
    class: 'Paladin',
    race: 'Fish',
    level: 11,
    experience: 58000,
    imageUrl: '/characters/darwin.jpg',
    bio: 'A loyal and morally upright goldfish with legs, who serves as Gumball&apos;s moral compass.',
    alignment: 'Lawful Good',
    stats: {
      strength: 10,
      dexterity: 13,
      constitution: 12,
      intelligence: 13,
      wisdom: 16,
      charisma: 14,
    },
    skills: ['Morality', 'Loyalty', 'Compassion', 'Gentle Strength'],
    equipment: ['Water-Filled Helmet', 'Tank Top', 'Pure Heart'],
    backstory:
      'Once a wild goldfish, Darwin evolved legs and joined the Watterson family. His unwavering sense of right and wrong often puts him at odds with chaos, but his loyalty to Gumball is unshakeable.',
    achievements: ['Moral Guardian', 'Loyal Friend', 'Evolved One'],
    relationships: [
      {
        characterId: 'char_001',
        type: 'brother',
        description: 'Adopted brother of Gumball',
      },
    ],
  },
  {
    id: 'char_003',
    name: 'Finn the Human',
    class: 'Hero',
    race: 'Human',
    level: 13,
    experience: 71500,
    imageUrl: '/characters/finn.jpg',
    bio: 'A young adventurer with a white hat and pure heart, dedicated to helping others.',
    alignment: 'Lawful Good',
    stats: {
      strength: 14,
      dexterity: 15,
      constitution: 13,
      intelligence: 12,
      wisdom: 13,
      charisma: 15,
    },
    skills: ['Sword Mastery', 'Adventure', 'Problem Solving', 'Heroism'],
    equipment: ['Golden Sword', 'White Hood', 'Adventure Backpack'],
    backstory:
      'Finn is a human boy in a magical land of Ooo. With his adopted brother Jake, he goes on dangerous quests to fight evil, protect the innocent, and discover the mysteries of his world.',
    achievements: ['Evil Defeater', 'Adventure Champion', 'Pure-Hearted Hero'],
    relationships: [
      {
        characterId: 'char_004',
        type: 'brother',
        description: 'Adopted brother of Jake',
      },
    ],
  },
  {
    id: 'char_004',
    name: 'Jake the Dog',
    class: 'Bard',
    race: 'Dog',
    level: 12,
    experience: 64000,
    imageUrl: '/characters/jake.jpg',
    bio: 'A magical dog with shape-shifting powers, who values fun and friendship above all else.',
    alignment: 'Chaotic Good',
    stats: {
      strength: 13,
      dexterity: 16,
      constitution: 14,
      intelligence: 14,
      wisdom: 12,
      charisma: 16,
    },
    skills: ['Shape Shifting', 'Music', 'Combat', 'Humor'],
    equipment: ['Brown Shirt', 'Magic Amulet', 'Wisdom'],
    backstory:
      'Jake is Finn&apos;s adoptive brother and best friend. His magical abilities and laid-back personality help balance Finn&apos;s seriousness, though he&apos;s shown to be incredibly brave when it matters.',
    achievements: ['Magic Master', 'Best Friend', 'Shape Shifter'],
    relationships: [
      {
        characterId: 'char_003',
        type: 'brother',
        description: 'Adopted brother of Finn',
      },
    ],
  },
  {
    id: 'char_005',
    name: 'Scout',
    class: 'Assassin',
    race: 'Human',
    level: 11,
    experience: 58000,
    imageUrl: '/characters/scout.jpg',
    bio: 'The fastest mercenary alive, armed with dual pistols and a cocky attitude.',
    alignment: 'Chaotic Neutral',
    stats: {
      strength: 11,
      dexterity: 18,
      constitution: 12,
      intelligence: 11,
      wisdom: 10,
      charisma: 13,
    },
    skills: ['Speed', 'Gun Mastery', 'Evasion', 'Trash Talk'],
    equipment: ['Scattergun', 'Pistols', 'Boston Accent'],
    backstory:
      'Scout is a mercenary from Boston who works for the team. His incredible speed and quick reflexes make him one of the most dangerous fighters, despite his cocky and impulsive nature.',
    achievements: ['Fastest Mercenary', 'Gun Expert', 'Trash Talk Master'],
    relationships: [
      {
        characterId: 'char_006',
        type: 'teammate',
        description: 'Works with Spy',
      },
    ],
  },
  {
    id: 'char_006',
    name: 'Spy',
    class: 'Spy',
    race: 'Human',
    level: 12,
    experience: 64000,
    imageUrl: '/characters/spy.jpg',
    bio: 'A sophisticated French mercenary with a talent for deception and stealth.',
    alignment: 'Neutral',
    stats: {
      strength: 10,
      dexterity: 16,
      constitution: 11,
      intelligence: 15,
      wisdom: 14,
      charisma: 16,
    },
    skills: ['Disguise', 'Stealth', 'Backstab', 'Seduction'],
    equipment: ['Revolver', 'Knife', 'Disguise Kit', 'Accent'],
    backstory:
      'Spy is a refined and mysterious mercenary with a French accent. He uses intelligence, disguises, and backstabs to eliminate enemies. His true loyalties and past remain enigmatic.',
    achievements: ['Master of Disguise', 'Stealth Expert', 'Heartbreaker'],
    relationships: [
      {
        characterId: 'char_005',
        type: 'teammate',
        description: 'Works with Scout',
      },
    ],
  },
];

export const getCharacterById = (id: string): Character | undefined => {
  return CHARACTERS.find((char) => char.id === id);
};

export const getUniqueClasses = (): string[] => {
  const classes = new Set(CHARACTERS.map((char) => char.class));
  return Array.from(classes).sort();
};

export const getUniqueRaces = (): string[] => {
  const races = new Set(CHARACTERS.map((char) => char.race));
  return Array.from(races).sort();
};

export const getMaxLevel = (): number => {
  return Math.max(...CHARACTERS.map((char) => char.level));
};

export const filterCharacters = (
  characters: Character[],
  searchTerm: string,
  classFilter: string,
  raceFilter: string,
  levelRange: [number, number]
): Character[] => {
  return characters.filter((char) => {
    const matchesSearch =
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = classFilter === '' || char.class === classFilter;
    const matchesRace = raceFilter === '' || char.race === raceFilter;
    const matchesLevel = char.level >= levelRange[0] && char.level <= levelRange[1];

    return matchesSearch && matchesClass && matchesRace && matchesLevel;
  });
};
