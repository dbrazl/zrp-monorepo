import { ProviderEpisodeDto } from "@/application/dtos/inputs/provider-episode.dto.js";
import { EpisodeDto } from "@/application/dtos/outputs/episode.dto.js";

export class ProviderEpisodeToEpisodeMapper {
  public static map(episodes: ProviderEpisodeDto[]): EpisodeDto[] {
    return episodes.map(
      episode => ({
        id: episode.id,
        name: episode.name,
        episode: this.getEpisode(episode.episode),
        season: this.getSeason(episode.episode),
      })
    );
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
