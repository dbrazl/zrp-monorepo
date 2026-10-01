import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';
import { Episode } from '@/domain/data-structures/types/episode.js';

export class ProviderEpisodeDtoToEpisodeMapper {
  public static map(episodes: ProviderEpisodeDto[]): Episode[] {
    return episodes.map((episode) => ({
      id: episode.id,
      name: episode.name,
      episode: this.getEpisode(episode.episode),
      season: this.getSeason(episode.episode),
    }));
  }

  private static getEpisode(sentence: string): string {
    const [_, episode] = sentence.split('E');
    return `Episode ${episode}`;
  }

  private static getSeason(sentence: string): string {
    const [season, _] = sentence.split('E');
    return `Season ${season.slice(1)}`;
  }
}
