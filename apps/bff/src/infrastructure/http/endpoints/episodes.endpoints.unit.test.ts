import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { EpisodesEndpoints } from '@/infrastructure/http/endpoints/episodes.endpoints.js';
import { EpisodesController } from '@/presentation/controllers/episodes.controller.js';
import { Mocked } from 'vitest';

describe('EpisodesEndpoints', () => {
  let endpoints: EpisodesEndpoints;
  let controller: Mocked<Pick<EpisodesController, 'getAllEpisodes'>>;

  beforeEach(() => {
    controller = {
      getAllEpisodes: vi.fn(),
    };
    endpoints = new EpisodesEndpoints(controller as unknown as EpisodesController);
  });

  describe('getAllEpisodes', () => {
    it('should return the episodes provided by the controller', async () => {
      // Arrange
      const seasonEpisodes: SeasonEpisodesDto[] = [
        {
          season: 'Season 01',
          episodes: [
            {
              id: 1,
              name: 'Pilot',
              episode: 'Episode 01',
              season: 'Season 01',
            },
          ],
        },
      ];

      controller.getAllEpisodes.mockResolvedValue(seasonEpisodes);

      // Act
      const result = await endpoints.getAllEpisodes();

      // Assert
      expect(controller.getAllEpisodes).toHaveBeenCalledOnce();
      expect(controller.getAllEpisodes).toHaveBeenCalledWith();
      expect(result).toBe(seasonEpisodes);
    });

    it('should propagate errors from the controller', async () => {
      // Arrange
      const error = new Error('Unable to get episodes');
      controller.getAllEpisodes.mockRejectedValue(error);

      // Act and Assert
      await expect(endpoints.getAllEpisodes()).rejects.toBe(error);
      expect(controller.getAllEpisodes).toHaveBeenCalledOnce();
      expect(controller.getAllEpisodes).toHaveBeenCalledWith();
    });
  });
});
