import { CharacterFromEpisodeDto } from '@/application/dtos/inputs/character-from-episode.dto.js';
import { CharacterFromEpisodeDtoToCharacterMapper } from '@/application/mappers/character-from-episode-dto-to-character.mapper.js';

describe('CharacterFromEpisodeDtoToCharacterMapper', () => {
  describe('map', () => {
    it('should return an empty array when there are no characters', () => {
      // Arrange
      const characters: CharacterFromEpisodeDto[] = [];

      // Act
      const result = CharacterFromEpisodeDtoToCharacterMapper.map(characters);

      // Assert
      expect(result).toEqual([]);
    });

    it('should map characters from episode DTOs to characters', () => {
      // Arrange
      const characters: CharacterFromEpisodeDto[] = [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: 'Earth (C-137)',
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
          origin: 'unknown',
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
      const result = CharacterFromEpisodeDtoToCharacterMapper.map(characters);

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
