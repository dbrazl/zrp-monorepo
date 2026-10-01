import { EpisodeDto } from '@/application/dtos/inputs/episode.dto.js';

export interface ISitcom {
  getAllEpisodes(): Promise<EpisodeDto[]>;
}

export abstract class AbstractSitcom implements ISitcom {
  public abstract getAllEpisodes(): Promise<EpisodeDto[]>;
}
