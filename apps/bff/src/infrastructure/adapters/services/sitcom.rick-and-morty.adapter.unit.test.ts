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
      const apiResponse: EpisodeRickAndMortyDto = {
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

      mockedAxios.get.mockResolvedValue({
        data: apiResponse,
      } as AxiosResponse<EpisodeRickAndMortyDto>);

      // Act
      const episodes = await adapter.getAllEpisodes();

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledOnce();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/episode',
      );
      expect(episodes).toEqual(apiResponse.results);
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
