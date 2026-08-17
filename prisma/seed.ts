import { PrismaClient, CharacterCategory } from '@prisma/client';

const prisma = new PrismaClient();

interface SeedRelationship {
  key: string;
  type: string;
  description: string;
}

interface SeedCharacter {
  key: string;
  name: string;
  category: CharacterCategory;
  race: string;
  level: number;
  experience: number;
  imageUrl: string;
  bio: string;
  alignment: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  skills: string[];
  equipment: string[];
  backstory: string;
  achievements: string[];
  relationships: SeedRelationship[];
}

const CHARACTERS: SeedCharacter[] = [
  {
    key: 'char_001',
    name: 'Gumball Watterson',
    category: 'TV_SHOW',
    race: 'Cat',
    level: 10,
    experience: 52000,
    imageUrl: '/characters/gumball.jpg',
    bio: 'A blue cat with an optimistic personality and a talent for getting into ridiculous situations.',
    alignment: 'Chaotic Good',
    strength: 9,
    dexterity: 14,
    constitution: 11,
    intelligence: 12,
    wisdom: 10,
    charisma: 15,
    skills: ['Comedy', 'Problem Solving', 'Luck', 'Adaptability'],
    equipment: ['Striped Shirt', 'Rubber Shoes', 'Optimism'],
    backstory:
      'Gumball is a blue cat living in Elmore with his adopted brother Darwin. He navigates the absurdities of his world with humor and heart, always trying to do the right thing despite constant chaos.',
    achievements: ['Survivor', 'Friend Keeper', 'Chaos Navigator'],
    relationships: [
      { key: 'char_002', type: 'brother', description: 'Adopted brother of Darwin' },
    ],
  },
  {
    key: 'char_002',
    name: 'Darwin Watterson',
    category: 'TV_SHOW',
    race: 'Fish',
    level: 11,
    experience: 58000,
    imageUrl: '/characters/darwin.jpg',
    bio: "A loyal and morally upright goldfish with legs, who serves as Gumball's moral compass.",
    alignment: 'Lawful Good',
    strength: 10,
    dexterity: 13,
    constitution: 12,
    intelligence: 13,
    wisdom: 16,
    charisma: 14,
    skills: ['Morality', 'Loyalty', 'Compassion', 'Gentle Strength'],
    equipment: ['Water-Filled Helmet', 'Tank Top', 'Pure Heart'],
    backstory:
      'Once a wild goldfish, Darwin evolved legs and joined the Watterson family. His unwavering sense of right and wrong often puts him at odds with chaos, but his loyalty to Gumball is unshakeable.',
    achievements: ['Moral Guardian', 'Loyal Friend', 'Evolved One'],
    relationships: [
      { key: 'char_001', type: 'brother', description: 'Adopted brother of Gumball' },
    ],
  },
  {
    key: 'char_003',
    name: 'Finn the Human',
    category: 'TV_SHOW',
    race: 'Human',
    level: 13,
    experience: 71500,
    imageUrl: '/characters/finn.jpg',
    bio: 'A young adventurer with a white hat and pure heart, dedicated to helping others.',
    alignment: 'Lawful Good',
    strength: 14,
    dexterity: 15,
    constitution: 13,
    intelligence: 12,
    wisdom: 13,
    charisma: 15,
    skills: ['Sword Mastery', 'Adventure', 'Problem Solving', 'Heroism'],
    equipment: ['Golden Sword', 'White Hood', 'Adventure Backpack'],
    backstory:
      'Finn is a human boy in a magical land of Ooo. With his adopted brother Jake, he goes on dangerous quests to fight evil, protect the innocent, and discover the mysteries of his world.',
    achievements: ['Evil Defeater', 'Adventure Champion', 'Pure-Hearted Hero'],
    relationships: [
      { key: 'char_004', type: 'brother', description: 'Adopted brother of Jake' },
    ],
  },
  {
    key: 'char_004',
    name: 'Jake the Dog',
    category: 'TV_SHOW',
    race: 'Dog',
    level: 12,
    experience: 64000,
    imageUrl: '/characters/jake.jpg',
    bio: 'A magical dog with shape-shifting powers, who values fun and friendship above all else.',
    alignment: 'Chaotic Good',
    strength: 13,
    dexterity: 16,
    constitution: 14,
    intelligence: 14,
    wisdom: 12,
    charisma: 16,
    skills: ['Shape Shifting', 'Music', 'Combat', 'Humor'],
    equipment: ['Brown Shirt', 'Magic Amulet', 'Wisdom'],
    backstory:
      "Jake is Finn's adoptive brother and best friend. His magical abilities and laid-back personality help balance Finn's seriousness, though he's shown to be incredibly brave when it matters.",
    achievements: ['Magic Master', 'Best Friend', 'Shape Shifter'],
    relationships: [
      { key: 'char_003', type: 'brother', description: 'Adopted brother of Finn' },
    ],
  },
  {
    key: 'char_005',
    name: 'Scout',
    category: 'VIDEO_GAME',
    race: 'Human',
    level: 11,
    experience: 58000,
    imageUrl: '/characters/scout.jpg',
    bio: 'The fastest mercenary alive, armed with dual pistols and a cocky attitude.',
    alignment: 'Chaotic Neutral',
    strength: 11,
    dexterity: 18,
    constitution: 12,
    intelligence: 11,
    wisdom: 10,
    charisma: 13,
    skills: ['Speed', 'Gun Mastery', 'Evasion', 'Trash Talk'],
    equipment: ['Scattergun', 'Pistols', 'Boston Accent'],
    backstory:
      'Scout is a mercenary from Boston who works for the team. His incredible speed and quick reflexes make him one of the most dangerous fighters, despite his cocky and impulsive nature.',
    achievements: ['Fastest Mercenary', 'Gun Expert', 'Trash Talk Master'],
    relationships: [
      { key: 'char_006', type: 'teammate', description: 'Works with Spy' },
    ],
  },
  {
    key: 'char_006',
    name: 'Spy',
    category: 'VIDEO_GAME',
    race: 'Human',
    level: 12,
    experience: 64000,
    imageUrl: '/characters/spy.jpg',
    bio: 'A sophisticated French mercenary with a talent for deception and stealth.',
    alignment: 'Neutral',
    strength: 10,
    dexterity: 16,
    constitution: 11,
    intelligence: 15,
    wisdom: 14,
    charisma: 16,
    skills: ['Disguise', 'Stealth', 'Backstab', 'Seduction'],
    equipment: ['Revolver', 'Knife', 'Disguise Kit', 'Accent'],
    backstory:
      'Spy is a refined and mysterious mercenary with a French accent. He uses intelligence, disguises, and backstabs to eliminate enemies. His true loyalties and past remain enigmatic.',
    achievements: ['Master of Disguise', 'Stealth Expert', 'Heartbreaker'],
    relationships: [
      { key: 'char_005', type: 'teammate', description: 'Works with Scout' },
    ],
  },
];

async function main() {
  const keyToId = new Map<string, string>();

  for (const char of CHARACTERS) {
    const { key, relationships: _relationships, ...data } = char;
    const created = await prisma.character.create({
      data: { ...data, relationships: [], status: 'APPROVED' },
    });
    keyToId.set(key, created.id);
  }

  for (const char of CHARACTERS) {
    const id = keyToId.get(char.key)!;
    await prisma.character.update({
      where: { id },
      data: {
        relationships: char.relationships.map((rel) => ({
          characterId: keyToId.get(rel.key),
          type: rel.type,
          description: rel.description,
        })),
      },
    });
  }

  console.log(`Seeded ${CHARACTERS.length} characters.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
