import { seasonEpisodeDtoToCardList } from '@/models/mappers/season-episode-dto-to-card-list';
import { getEpisodes } from '@/models/services/bff';
import { Homepage } from '@/views/pages/Home';

export const dynamic = 'force-static';

export default async function Page() {
  const episodes = await getEpisodes();
  const data = seasonEpisodeDtoToCardList(episodes);

  return <Homepage data={data} />;
}
