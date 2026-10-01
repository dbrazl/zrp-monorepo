import { Episode } from '@/domain/data-structures/types/episode.js';
import { EpisodesToSeasonEpisodesDtoMapper } from '@/application/mappers/episodes-to-season-episodes-dto.mapper.js';

describe('EpisodesToSeasonEpisodesDtoMapper', () => {
  describe('map', () => {
    it('should return an empty array when there are no episodes', () => {
      // Arrange
      const episodes: Episode[] = [];

      // Act
      const result = EpisodesToSeasonEpisodesDtoMapper.map(episodes);

      // Assert
      expect(result).toEqual([]);
    });

    it('should group episodes from the same season', () => {
      // Arrange
      const episodes: Episode[] = [
        {
          id: 1,
          name: 'Pilot',
          episode: 'Episode 01',
          season: 'Season 01',
        },
        {
          id: 2,
          name: 'Lawnmower Dog',
          episode: 'Episode 02',
          season: 'Season 01',
        },
      ];

      // Act
      const result = EpisodesToSeasonEpisodesDtoMapper.map(episodes);

      // Assert
      expect(result).toEqual([
        {
          season: 'Season 01',
          episodes,
        },
      ]);
    });

    it('should group episodes by season', () => {
      // Arrange
      const seasonOneEpisode: Episode = {
        id: 1,
        name: 'Pilot',
        episode: 'Episode 01',
        season: 'Season 01',
      };
      const seasonTwoEpisode: Episode = {
        id: 12,
        name: 'A Rickle in Time',
        episode: 'Episode 01',
        season: 'Season 02',
      };
      const anotherSeasonOneEpisode: Episode = {
        id: 2,
        name: 'Lawnmower Dog',
        episode: 'Episode 02',
        season: 'Season 01',
      };

      // Act
      const result = EpisodesToSeasonEpisodesDtoMapper.map([
        seasonOneEpisode,
        seasonTwoEpisode,
        anotherSeasonOneEpisode,
      ]);

      // Assert
      expect(result).toEqual([
        {
          season: 'Season 01',
          episodes: [seasonOneEpisode, anotherSeasonOneEpisode],
        },
        {
          season: 'Season 02',
          episodes: [seasonTwoEpisode],
        },
      ]);
    });
  });
});
