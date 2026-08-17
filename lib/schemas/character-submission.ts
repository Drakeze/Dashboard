import { z } from 'zod';

const baseFields = {
  name: z.string().min(1, 'Name is required').max(80),
  category: z.enum(['TV_SHOW', 'ANIME', 'VIDEO_GAME', 'COMIC_SUPERHERO']),
  race: z.string().min(1, 'Race/origin is required').max(60),
  level: z.coerce.number().int().min(1).max(100),
  experience: z.coerce.number().int().min(0),
  imageUrl: z.string().trim().max(300).optional().or(z.literal('')),
  bio: z.string().min(1, 'A short bio is required').max(300),
  alignment: z.string().min(1, 'Alignment is required').max(60),
  strength: z.coerce.number().int().min(1).max(20),
  dexterity: z.coerce.number().int().min(1).max(20),
  constitution: z.coerce.number().int().min(1).max(20),
  intelligence: z.coerce.number().int().min(1).max(20),
  wisdom: z.coerce.number().int().min(1).max(20),
  charisma: z.coerce.number().int().min(1).max(20),
  backstory: z.string().min(1, 'Backstory is required').max(2000),
};

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

// Used by the client form — skills/equipment/achievements stay as raw
// newline-separated text so react-hook-form's zodResolver doesn't transform
// them before the values are sent over the wire.
export const characterSubmissionFormSchema = z.object({
  ...baseFields,
  skills: z.string(),
  equipment: z.string(),
  achievements: z.string(),
});

// Used server-side — same shape over the wire, but splits the list fields
// into string[] for Prisma.
export const characterSubmissionSchema = z.object({
  ...baseFields,
  skills: z.string().transform(splitLines),
  equipment: z.string().transform(splitLines),
  achievements: z.string().transform(splitLines),
});

export type CharacterSubmissionInput = z.infer<typeof characterSubmissionFormSchema>;
