import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';

export interface ISitcom {
  getAllEpisodes(): Promise<ProviderEpisodeDto[]>;
}

export abstract class AbstractSitcom implements ISitcom {
  public abstract getAllEpisodes(): Promise<ProviderEpisodeDto[]>;
}
