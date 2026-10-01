import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';
import { Mocked } from 'vitest';

describe('SitcomController', () => {
  let controller: SitcomController;
  let getAllEpisodesUseCase: Mocked<Pick<GetAllEpisodesUseCase, 'execute'>>;

  beforeEach(() => {
    getAllEpisodesUseCase = {
      execute: vi.fn(),
    };
    controller = new SitcomController(
      getAllEpisodesUseCase as unknown as GetAllEpisodesUseCase,
    );
  });

  describe('getAllEpisodes', () => {
    it('should return the episodes provided by the use case', async () => {
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
              characters: ['1'],
            },
          ],
        },
      ];

      getAllEpisodesUseCase.execute.mockResolvedValue(seasonEpisodes);

      // Act
      const result = await controller.getAllEpisodes();

      // Assert
      expect(getAllEpisodesUseCase.execute).toHaveBeenCalledOnce();
      expect(getAllEpisodesUseCase.execute).toHaveBeenCalledWith();
      expect(result).toBe(seasonEpisodes);
    });

    it('should propagate errors from the use case', async () => {
      // Arrange
      const error = new Error('Unable to get episodes');
      getAllEpisodesUseCase.execute.mockRejectedValue(error);

      // Act and Assert
      await expect(controller.getAllEpisodes()).rejects.toBe(error);
      expect(getAllEpisodesUseCase.execute).toHaveBeenCalledOnce();
      expect(getAllEpisodesUseCase.execute).toHaveBeenCalledWith();
    });
  });
});
