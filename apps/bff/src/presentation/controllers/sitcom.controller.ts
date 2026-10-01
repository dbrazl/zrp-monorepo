import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { GetCharactersUseCase } from '@/application/use-cases/get-characters.use-case.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { Character } from '@/domain/data-structures/types/character.js';

export class SitcomController {
  constructor(
    private readonly getAllEpisodesUseCase: GetAllEpisodesUseCase,
    private readonly getCharactersUseCase: GetCharactersUseCase,
  ) { }

  public async getAllEpisodes(): Promise<SeasonEpisodesDto[]> {
    return this.getAllEpisodesUseCase.execute();
  }

  public async getCharacters(charactersIds: string[]): Promise<Character[]> {
    return this.getCharactersUseCase.execute(charactersIds);
  }
}
