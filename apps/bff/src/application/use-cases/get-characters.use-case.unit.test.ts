import { ProviderCharacterDto } from '@/application/dtos/inputs/provider-character.dto.js';
import { ProviderCharacterDtoToCharacterMapper } from '@/application/mappers/provider-character-dto-to-character.mapper.js';
import {
  AbstractSitcom,
  ISitcom,
} from '@/application/ports/services/sitcom.port.js';
import { GetCharactersUseCase } from '@/application/use-cases/get-characters.use-case.js';
import { Character } from '@/domain/data-structures/types/character.js';
import { Mocked } from 'vitest';

describe('GetCharactersUseCase', () => {
  let useCase: GetCharactersUseCase;
  let sitcom: Mocked<Pick<AbstractSitcom, 'getCharacters'>>;

  beforeEach(() => {
    vi.clearAllMocks();
    sitcom = {
      getCharacters: vi.fn(),
    };
    useCase = new GetCharactersUseCase(sitcom as unknown as ISitcom);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('execute', () => {
    it('should return the characters of an episode', async () => {
      // Arrange
      const charactersIds = ['1', '2'];
      const charactersFromEpisode: ProviderCharacterDto[] = [
        {
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
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'unknown',
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
        },
      ];
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
          status: 'unknown',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        },
      ];

      sitcom.getCharacters.mockResolvedValue(charactersFromEpisode);
      vi.spyOn(
        ProviderCharacterDtoToCharacterMapper,
        'map',
      ).mockReturnValueOnce(characters);

      // Act
      const result = await useCase.execute(charactersIds);

      // Assert
      expect(sitcom.getCharacters).toHaveBeenCalledOnce();
      expect(sitcom.getCharacters).toHaveBeenCalledWith(charactersIds);
      expect(ProviderCharacterDtoToCharacterMapper.map).toHaveBeenCalledWith(
        charactersFromEpisode,
      );
      expect(result).toEqual(characters);
    });

    it('should return an empty list when the episode has no characters', async () => {
      // Arrange
      const charactersIds: string[] = [];
      sitcom.getCharacters.mockResolvedValue([]);
      vi.spyOn(
        ProviderCharacterDtoToCharacterMapper,
        'map',
      ).mockReturnValueOnce([]);

      // Act
      const result = await useCase.execute(charactersIds);

      // Assert
      expect(sitcom.getCharacters).toHaveBeenCalledOnce();
      expect(sitcom.getCharacters).toHaveBeenCalledWith(charactersIds);
      expect(ProviderCharacterDtoToCharacterMapper.map).toHaveBeenCalledWith(
        [],
      );
      expect(result).toEqual([]);
    });

    it('should propagate errors from the sitcom provider', async () => {
      // Arrange
      const charactersIds = ['1', '2'];
      const error = new Error('Sitcom provider is unavailable');
      sitcom.getCharacters.mockRejectedValue(error);
      vi.spyOn(ProviderCharacterDtoToCharacterMapper, 'map');

      // Act and Assert
      await expect(useCase.execute(charactersIds)).rejects.toBe(error);
      expect(sitcom.getCharacters).toHaveBeenCalledOnce();
      expect(sitcom.getCharacters).toHaveBeenCalledWith(charactersIds);
      expect(ProviderCharacterDtoToCharacterMapper.map).not.toHaveBeenCalled();
    });
  });
});
