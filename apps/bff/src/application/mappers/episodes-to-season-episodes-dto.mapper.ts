import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { Episode } from '@/domain/data-structures/types/episode.js';

export class EpisodesToSeasonEpisodesDtoMapper {
  public static map(episodes: Episode[]): SeasonEpisodesDto[] {
    const groups = Object.groupBy(episodes, ({ season }) => season);
    const entries = Object.entries(groups) as Array<[string, Episode[]]>;

    return entries.map<SeasonEpisodesDto>(
      ([season, episodes]) => ({ season, episodes: episodes }),
    );
  }
}
