import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';

export class EpisodesController {
  constructor(private readonly getAllEpisodesUseCase: GetAllEpisodesUseCase) {}

  public async getAllEpisodes(): Promise<any> {
    return this.getAllEpisodesUseCase.execute();
  }
}
