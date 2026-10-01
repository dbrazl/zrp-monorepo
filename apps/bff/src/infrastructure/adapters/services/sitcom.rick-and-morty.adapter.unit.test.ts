import axios from 'axios';
import type { AxiosResponse } from 'axios';
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
});
