import { Character } from '@/domain/data-structures/types/character.js';
import { CharacterFromEpisodeDto } from '@/application/dtos/inputs/character-from-episode.dto.js';

export class CharacterFromEpisodeDtoToCharacterMapper {
  public static map(
    charactersEpisodes: CharacterFromEpisodeDto[],
  ): Character[] {
    return charactersEpisodes.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      gender: character.gender,
      image: character.image,
    }));
  }
}
