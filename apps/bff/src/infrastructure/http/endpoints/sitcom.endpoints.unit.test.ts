import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { Character } from '@/domain/data-structures/types/character.js';
import { SitcomEndpoints } from '@/infrastructure/http/endpoints/sitcom.endpoints.js';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';
import { Mocked } from 'vitest';

describe('SitcomEndpoints', () => {
  let endpoints: SitcomEndpoints;
  let controller: Mocked<
    Pick<SitcomController, 'getAllEpisodes' | 'getCharacters'>
  >;

  beforeEach(() => {
    controller = {
      getAllEpisodes: vi.fn(),
      getCharacters: vi.fn(),
    };
    endpoints = new SitcomEndpoints(controller as unknown as SitcomController);
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
              characters: ['1'],
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

  describe('getCharacters', () => {
    it('should return the characters provided by the controller', async () => {
      // Arrange
      const charactersIds = ['1', '2'];
      const characters: Character[] = [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        },
      ];

      controller.getCharacters.mockResolvedValue(characters);

      // Act
      const result = await endpoints.getCharacters(charactersIds);

      // Assert
      expect(controller.getCharacters).toHaveBeenCalledOnce();
      expect(controller.getCharacters).toHaveBeenCalledWith(charactersIds);
      expect(result).toBe(characters);
    });

    it('should return an empty list provided by the controller', async () => {
      // Arrange
      const charactersIds: string[] = [];
      controller.getCharacters.mockResolvedValue([]);

      // Act
      const result = await endpoints.getCharacters(charactersIds);

      // Assert
      expect(controller.getCharacters).toHaveBeenCalledOnce();
      expect(controller.getCharacters).toHaveBeenCalledWith(charactersIds);
      expect(result).toEqual([]);
    });

    it('should propagate errors from the controller', async () => {
      // Arrange
      const charactersIds = ['1', '2'];
      const error = new Error('Unable to get characters');
      controller.getCharacters.mockRejectedValue(error);

      // Act and Assert
      await expect(endpoints.getCharacters(charactersIds)).rejects.toBe(error);
      expect(controller.getCharacters).toHaveBeenCalledOnce();
      expect(controller.getCharacters).toHaveBeenCalledWith(charactersIds);
    });
  });
});
