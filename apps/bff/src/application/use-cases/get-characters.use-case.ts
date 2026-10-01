import { Character } from '@/domain/data-structures/types/character.js';
import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { ProviderCharacterDtoToCharacterMapper } from '@/application/mappers/provider-character-dto-to-character.mapper.js';

export class GetCharactersUseCase {
  constructor(private readonly sitcom: AbstractSitcom) {}

  public async execute(charactersIds: string[]): Promise<Character[]> {
    const charactersEpisode = await this.sitcom.getCharacters(charactersIds);
    return ProviderCharacterDtoToCharacterMapper.map(charactersEpisode);
  }
}
