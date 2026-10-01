import { CharacterFromEpisodeDto } from '@/application/dtos/inputs/character-from-episode.dto.js';
import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';

export interface ISitcom {
  getAllEpisodes(): Promise<ProviderEpisodeDto[]>;
  getAllCharactersOfAnEpisode(
    charactersIds: string[],
  ): Promise<CharacterFromEpisodeDto[]>;
}

export abstract class AbstractSitcom implements ISitcom {
  public abstract getAllEpisodes(): Promise<ProviderEpisodeDto[]>;
  public abstract getAllCharactersOfAnEpisode(
    charactersIds: string[],
  ): Promise<CharacterFromEpisodeDto[]>;
}
