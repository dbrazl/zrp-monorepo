import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';

export class EpisodesController {
  constructor(private readonly getAllEpisodesUseCase: GetAllEpisodesUseCase) {}

  public async getAllEpisodes(): Promise<SeasonEpisodesDto[]> {
    return this.getAllEpisodesUseCase.execute();
  }
}
