import { getCharacters } from '@/lib/character-data';
import { CharacterBrowser } from '@/components/character-browser';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const characters = await getCharacters();
  return <CharacterBrowser characters={characters} />;
}
