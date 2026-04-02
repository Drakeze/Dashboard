import { getCharacterById, CHARACTERS } from '@/lib/character-data';
import { CharacterDetailClient } from '@/components/character-detail-client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return CHARACTERS.map((char) => ({
    id: char.id,
  }));
}

export default async function CharacterDetailPage({ params }: PageProps) {
  const { id } = await params;
  const character = getCharacterById(id) ?? null;

  return <CharacterDetailClient character={character} />;
}
