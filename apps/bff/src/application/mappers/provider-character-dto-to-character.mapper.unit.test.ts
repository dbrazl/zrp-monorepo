import { ProviderCharacterDto } from '@/application/dtos/inputs/provider-character.dto.js';
import { ProviderCharacterDtoToCharacterMapper } from '@/application/mappers/provider-character-dto-to-character.mapper.js';

describe('ProviderCharacterDtoToCharacterMapper', () => {
  describe('map', () => {
    it('should return an empty array when there are no characters', () => {
      // Arrange
      const characters: ProviderCharacterDto[] = [];

      // Act
      const result = ProviderCharacterDtoToCharacterMapper.map(characters);

      // Assert
      expect(result).toEqual([]);
    });

    it('should map characters from episode DTOs to characters', () => {
      // Arrange
      const characters: ProviderCharacterDto[] = [
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

      // Act
      const result = ProviderCharacterDtoToCharacterMapper.map(characters);

      // Assert
      expect(result).toEqual([
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
      ]);
    });
  });
});
