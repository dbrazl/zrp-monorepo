import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';
import { ProviderEpisodeDtoToEpisodeMapper } from '@/application/mappers/provider-episode-dto-to-episode.mapper.js';
import { EpisodesToSeasonEpisodesDtoMapper } from '@/application/mappers/episodes-to-season-episodes-dto.mapper.js';

export class GetAllEpisodesUseCase {
  constructor(private readonly sitcom: AbstractSitcom) { }

  public async execute(): Promise<any> {
    const providerEpisodes: ProviderEpisodeDto[] =
      await this.sitcom.getAllEpisodes();
    const episodes = ProviderEpisodeDtoToEpisodeMapper.map(providerEpisodes);
    return EpisodesToSeasonEpisodesDtoMapper.map(episodes);
  }
}
