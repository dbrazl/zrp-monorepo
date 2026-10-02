import { SeasonEpisodesDto } from '@/models/dtos/season-episode.dto';
import { CardList } from '@/models/data-structures/card-list';

export function seasonEpisodeDtoToCardList(
  seasons: SeasonEpisodesDto[],
): CardList[] {
  return seasons.map((season) => ({
    title: season.season,
    cards: season.episodes.map((episode) => ({
      id: episode.id,
      label: episode.name,
      upperLabel: episode.episode,
    })),
  }));
}
