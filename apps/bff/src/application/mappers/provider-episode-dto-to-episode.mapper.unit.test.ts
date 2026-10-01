import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';
import { ProviderEpisodeDtoToEpisodeMapper } from '@/application/mappers/provider-episode-dto-to-episode.mapper.js';

describe('ProviderEpisodeDtoToEpisodeMapper', () => {
  describe('map', () => {
    it('should return an empty array when there are no episodes', () => {
      // Arrange
      const episodes: ProviderEpisodeDto[] = [];

      // Act
      const result = ProviderEpisodeDtoToEpisodeMapper.map(episodes);

      // Assert
      expect(result).toEqual([]);
    });

    it('should map provider episodes to episodes', () => {
      // Arrange
      const episodes: ProviderEpisodeDto[] = [
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
        {
          id: 12,
          name: 'A Rickle in Time',
          air_date: 'July 26, 2015',
          episode: 'S02E01',
          characters: [],
          url: 'https://rickandmortyapi.com/api/episode/12',
          created: '2017-11-10T12:56:33.916Z',
        },
      ];

      // Act
      const result = ProviderEpisodeDtoToEpisodeMapper.map(episodes);

      // Assert
      expect(result).toEqual([
        {
          id: 1,
          name: 'Pilot',
          episode: 'Episode 01',
          season: 'Season 01',
          characters: ['1', '2'],
        },
        {
          id: 12,
          name: 'A Rickle in Time',
          episode: 'Episode 01',
          season: 'Season 02',
          characters: [],
        },
      ]);
    });
  });
});
