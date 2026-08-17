import { getCharacters } from '@/lib/character-data';
import { StatsDashboard } from '@/components/stats-dashboard';

export const dynamic = 'force-dynamic';

export default async function StatsPage() {
  const characters = await getCharacters();
  return <StatsDashboard characters={characters} />;
}
