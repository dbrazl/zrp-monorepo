import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { ProviderCharacterDto } from '@/application/dtos/inputs/provider-character.dto.js';
import { ISitcom } from '@/application/ports/services/sitcom.port.js';
import { EpisodeRickAndMortyDto } from '@/infrastructure/dtos/episode.rick-and-morty.dto.js';
import { SitcomRickAndMortyAdapter } from './sitcom.rick-and-morty.adapter.js';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('SitcomRickAndMortyAdapter', () => {
  let adapter: ISitcom;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new SitcomRickAndMortyAdapter();
  });

  describe('getAllEpisodes', () => {
    it('should return all episodes from Rick and Morty API', async () => {
      // Arrange
      const firstResponse: EpisodeRickAndMortyDto = {
        info: {
          count: 51,
          pages: 3,
          next: 'https://rickandmortyapi.com/api/episode?page=2',
          prev: null,
        },
        results: [
          {
            id: 1,
            name: 'Pilot',
            air_date: 'December 2, 2013',
            episode: 'S01E01',
            characters: [
              'https://rickandmortyapi.com/api/character/1',
              'https://rickandmortyapi.com/api/character/2',
            ],
            url: 'https://rickandmortyapi.com/api/episode/1',
            created: '2017-11-10T12:56:33.798Z',
          },
        ],
      };

      const secondResponse: EpisodeRickAndMortyDto = {
        info: {
          count: 51,
          pages: 3,
          next: 'https://rickandmortyapi.com/api/episode?page=3',
          prev: 'https://rickandmortyapi.com/api/episode?page=1',
        },
        results: [
          {
            id: 21,
            name: 'The Wedding Squanchers',
            air_date: 'October 4, 2015',
            episode: 'S02E10',
            characters: [
              'https://rickandmortyapi.com/api/character/1',
              'https://rickandmortyapi.com/api/character/2',
            ],
            url: 'https://rickandmortyapi.com/api/episode/21',
            created: '2017-11-10T12:56:33.798Z',
          },
        ],
      };

      const thirdResponse: EpisodeRickAndMortyDto = {
        info: {
          count: 51,
          pages: 3,
          next: null,
          prev: 'https://rickandmortyapi.com/api/episode?page=2',
        },
        results: [
          {
            id: 41,
            name: 'Star Mort: Rickturn of the Jerri',
            air_date: 'May 31, 2020',
            episode: 'S04E10',
            characters: [
              'https://rickandmortyapi.com/api/character/1',
              'https://rickandmortyapi.com/api/character/2',
            ],
            url: 'https://rickandmortyapi.com/api/episode/41',
            created: '2017-11-10T12:56:33.798Z',
          },
        ],
      };

      mockedAxios.get
        .mockResolvedValueOnce({
          data: firstResponse,
        } as AxiosResponse<EpisodeRickAndMortyDto>)
        .mockResolvedValueOnce({
          data: secondResponse,
        } as AxiosResponse<EpisodeRickAndMortyDto>)
        .mockResolvedValueOnce({
          data: thirdResponse,
        } as AxiosResponse<EpisodeRickAndMortyDto>);

      // Act
      const episodes = await adapter.getAllEpisodes();

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        1,
        'https://rickandmortyapi.com/api/episode',
      );
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        2,
        'https://rickandmortyapi.com/api/episode?page=2',
      );
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        3,
        'https://rickandmortyapi.com/api/episode?page=3',
      );
      expect(episodes).toEqual([
        ...firstResponse.results,
        ...secondResponse.results,
        ...thirdResponse.results,
      ]);
    });

    it('should propagate errors from Rick and Morty API', async () => {
      // Arrange
      const error = new Error('Rick and Morty API is unavailable');
      mockedAxios.get.mockRejectedValue(error);

      // Act and Assert
      await expect(adapter.getAllEpisodes()).rejects.toBe(error);
    });
  });

  describe('getCharacters', () => {
    const rick: ProviderCharacterDto = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    };

    const morty: ProviderCharacterDto = {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/2',
      created: '2017-11-04T18:50:21.651Z',
    };

    it('should return all characters requested from Rick and Morty API', async () => {
      // Arrange
      mockedAxios.get.mockResolvedValue({
        data: [rick, morty],
      } as AxiosResponse<ProviderCharacterDto[]>);

      // Act
      const characters = await adapter.getCharacters(['1', '2']);

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledOnce();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1,2',
      );
      expect(characters).toEqual([rick, morty]);
    });

    it('should wrap a single character response in an array', async () => {
      // Arrange
      mockedAxios.get.mockResolvedValue({
        data: rick,
      } as AxiosResponse<ProviderCharacterDto>);

      // Act
      const characters = await adapter.getCharacters(['1']);

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledOnce();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1',
      );
      expect(characters).toEqual([rick]);
    });

    it('should propagate errors from Rick and Morty API', async () => {
      // Arrange
      const error = new Error('Rick and Morty API is unavailable');
      mockedAxios.get.mockRejectedValue(error);

      // Act and Assert
      await expect(adapter.getCharacters(['1', '2'])).rejects.toBe(error);
    });
  });
});
