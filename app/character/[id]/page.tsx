import { getCharacterById } from '@/lib/character-data';
import { CharacterDetailClient } from '@/components/character-detail-client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CharacterDetailPage({ params }: PageProps) {
  const { id } = await params;
  const character = await getCharacterById(id);

  const relatedCharacters = character
    ? (
        await Promise.all(
          character.relationships.map(async (rel) => {
            const relatedChar = await getCharacterById(rel.characterId);
            if (!relatedChar) return null;
            return { character: relatedChar, type: rel.type, description: rel.description };
          })
        )
      ).filter((entry) => entry !== null)
    : [];

  return (
    <CharacterDetailClient character={character} relatedCharacters={relatedCharacters} />
  );
}
