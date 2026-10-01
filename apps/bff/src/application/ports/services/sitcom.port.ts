import { ProviderCharacterDto } from '@/application/dtos/inputs/provider-character.dto.js';
import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';

export interface ISitcom {
  getAllEpisodes(): Promise<ProviderEpisodeDto[]>;
  getCharacters(charactersIds: string[]): Promise<ProviderCharacterDto[]>;
}

export abstract class AbstractSitcom implements ISitcom {
  public abstract getAllEpisodes(): Promise<ProviderEpisodeDto[]>;
  public abstract getCharacters(
    charactersIds: string[],
  ): Promise<ProviderCharacterDto[]>;
}
