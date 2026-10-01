import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { Episode } from '@/domain/data-structures/types/episode.js';

export class EpisodesToSeasonEpisodesDtoMapper {
  public static map(episodes: Episode[]): SeasonEpisodesDto[] {
    const groups = Object.groupBy(episodes, ({ season }) => season);

    return Object.entries(groups).map<SeasonEpisodesDto>(
      ([season, episodes]) => ({ season, episodes: episodes ?? [] }),
    );
  }
}
