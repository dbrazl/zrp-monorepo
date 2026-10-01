import { ProviderCharacterDto } from '@/application/dtos/inputs/provider-character.dto.js';
import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';
import { ISitcom } from '@/application/ports/services/sitcom.port.js';
import { EpisodeRickAndMortyDto } from '@/infrastructure/dtos/episode.rick-and-morty.dto.js';
import axios from 'axios';

export class SitcomRickAndMortyAdapter implements ISitcom {
  private readonly HOST = 'https://rickandmortyapi.com/api';

  public async getAllEpisodes(): Promise<ProviderEpisodeDto[]> {
    const response = await axios.get<EpisodeRickAndMortyDto>(
      `${this.HOST}/episode`,
    );

    const firstPage: EpisodeRickAndMortyDto = response.data;
    const remainingPages: number = firstPage.info.pages - 1;

    const requests = Array.from({ length: remainingPages }, (_, index) =>
      axios.get<EpisodeRickAndMortyDto>(
        `${this.HOST}/episode?page=${index + 2}`,
      ),
    );

    const remainingResponses = await Promise.all(requests);

    return [
      ...firstPage.results,
      ...remainingResponses.flatMap((response) => response.data.results),
    ];
  }

  public async getCharacters(
    charactersIds: string[],
  ): Promise<ProviderCharacterDto[]> {
    const response = await axios.get<
      ProviderCharacterDto[] | ProviderCharacterDto
    >(`${this.HOST}/character/${charactersIds.join(',')}`);

    const { data } = response;
    return Array.isArray(data) ? data : [data];
  }
}
