import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { GetCharactersUseCase } from '@/application/use-cases/get-characters.use-case.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';
import { Mocked } from 'vitest';

describe('SitcomController', () => {
  let controller: SitcomController;
  let getAllEpisodesUseCase: Mocked<Pick<GetAllEpisodesUseCase, 'execute'>>;
  let getCharactersUseCase: Mocked<Pick<GetCharactersUseCase, 'execute'>>;

  beforeEach(() => {
    getAllEpisodesUseCase = {
      execute: vi.fn(),
    };
    getCharactersUseCase = {
      execute: vi.fn(),
    };
    controller = new SitcomController(
      getAllEpisodesUseCase as unknown as GetAllEpisodesUseCase,
      getCharactersUseCase as unknown as GetCharactersUseCase,
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
