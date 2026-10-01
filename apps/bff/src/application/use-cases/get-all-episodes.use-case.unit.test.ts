import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';
import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { ProviderEpisodeDtoToEpisodeMapper } from '@/application/mappers/provider-episode-dto-to-episode.mapper.js';
import { EpisodesToSeasonEpisodesDtoMapper } from '@/application/mappers/episodes-to-season-episodes-dto.mapper.js';
import { Episode } from '@/domain/data-structures/types/episode.js';
import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { Mocked } from 'vitest';

describe('GetAllEpisodesUseCase', () => {
  let useCase: GetAllEpisodesUseCase;
  let sitcom: Mocked<AbstractSitcom>;

  beforeEach(() => {
    vi.clearAllMocks();
    sitcom = {
      getAllEpisodes: vi.fn(),
    };
    useCase = new GetAllEpisodesUseCase(sitcom);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('execute', () => {
    it('should return episodes grouped by season', async () => {
      // Arrange
      const providerEpisodes: ProviderEpisodeDto[] = [
        {
          id: 1,
          name: 'Pilot',
          air_date: 'December 2, 2013',
          episode: 'S01E01',
          characters: ['https://rickandmortyapi.com/api/character/1'],
          url: 'https://rickandmortyapi.com/api/episode/1',
          created: '2017-11-10T12:56:33.798Z',
        },
        {
          id: 2,
          name: 'Lawnmower Dog',
          air_date: 'December 9, 2013',
          episode: 'S01E02',
          characters: ['https://rickandmortyapi.com/api/character/1'],
          url: 'https://rickandmortyapi.com/api/episode/2',
          created: '2017-11-10T12:56:33.916Z',
        },
        {
          id: 12,
          name: 'A Rickle in Time',
          air_date: 'July 26, 2015',
          episode: 'S02E01',
          characters: ['https://rickandmortyapi.com/api/character/1'],
          url: 'https://rickandmortyapi.com/api/episode/12',
          created: '2017-11-10T12:56:33.916Z',
        },
      ];

      const episodes: Episode[] = [
        {
          id: 1,
          name: 'Pilot',
          episode: 'Episode 01',
          season: 'Season 01',
          characters: ['1'],
        },
        {
          id: 2,
          name: 'Lawnmower Dog',
          episode: 'Episode 02',
          season: 'Season 01',
          characters: ['1'],
        },
        {
          id: 12,
          name: 'A Rickle in Time',
          episode: 'Episode 01',
          season: 'Season 02',
          characters: ['1'],
        },
      ];

      const seasonEpisodes: SeasonEpisodesDto[] = [
        {
          season: 'Season 01',
          episodes: [
            {
              id: 1,
              name: 'Pilot',
              episode: 'Episode 01',
              season: 'Season 01',
              characters: ['1'],
            },
            {
              id: 2,
              name: 'Lawnmower Dog',
              episode: 'Episode 02',
              season: 'Season 01',
              characters: ['1'],
            },
          ],
        },
        {
          season: 'Season 02',
          episodes: [
            {
              id: 12,
              name: 'A Rickle in Time',
              episode: 'Episode 01',
              season: 'Season 02',
              characters: ['1'],
            },
          ],
        },
      ];

      sitcom.getAllEpisodes.mockResolvedValue(providerEpisodes);
      vi.spyOn(ProviderEpisodeDtoToEpisodeMapper, 'map').mockReturnValueOnce(
        episodes,
      );
      vi.spyOn(EpisodesToSeasonEpisodesDtoMapper, 'map').mockReturnValueOnce(
        seasonEpisodes,
      );

      // Act
      const result = await useCase.execute();

      // Assert
      expect(sitcom.getAllEpisodes).toHaveBeenCalledOnce();
      expect(ProviderEpisodeDtoToEpisodeMapper.map).toHaveBeenCalledWith(
        providerEpisodes,
      );
      expect(EpisodesToSeasonEpisodesDtoMapper.map).toHaveBeenCalledWith(
        episodes,
      );
      expect(result).toEqual(seasonEpisodes);
    });

    it('should return an empty list when the provider has no episodes', async () => {
      // Arrange
      sitcom.getAllEpisodes.mockResolvedValue([]);
      vi.spyOn(ProviderEpisodeDtoToEpisodeMapper, 'map').mockReturnValueOnce(
        [],
      );
      vi.spyOn(EpisodesToSeasonEpisodesDtoMapper, 'map').mockReturnValueOnce(
        [],
      );

      // Act
      const result = await useCase.execute();

      // Assert
      expect(sitcom.getAllEpisodes).toHaveBeenCalledOnce();
      expect(ProviderEpisodeDtoToEpisodeMapper.map).toHaveBeenCalledWith([]);
      expect(EpisodesToSeasonEpisodesDtoMapper.map).toHaveBeenCalledWith([]);
      expect(result).toEqual([]);
    });

    it('should propagate errors from the sitcom provider', async () => {
      // Arrange
      const error = new Error('Sitcom provider is unavailable');
      sitcom.getAllEpisodes.mockRejectedValue(error);
      vi.spyOn(ProviderEpisodeDtoToEpisodeMapper, 'map');
      vi.spyOn(EpisodesToSeasonEpisodesDtoMapper, 'map');

      // Act and Assert
      await expect(useCase.execute()).rejects.toBe(error);
      expect(sitcom.getAllEpisodes).toHaveBeenCalledOnce();
      expect(ProviderEpisodeDtoToEpisodeMapper.map).not.toHaveBeenCalled();
      expect(EpisodesToSeasonEpisodesDtoMapper.map).not.toHaveBeenCalled();
    });
  });
});
