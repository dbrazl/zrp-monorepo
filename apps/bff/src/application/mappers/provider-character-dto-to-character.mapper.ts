import { Character } from '@/domain/data-structures/types/character.js';
import { ProviderCharacterDto } from '@/application/dtos/inputs/provider-character.dto.js';

export class ProviderCharacterDtoToCharacterMapper {
  public static map(charactersEpisodes: ProviderCharacterDto[]): Character[] {
    return charactersEpisodes.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      gender: character.gender,
      image: character.image,
    }));
  }
}
