import { Controller, Get } from '@nestjs/common';
import { EpisodesController } from '@/presentation/controllers/episodes.controller.js';

@Controller('/episodes')
export class EpisodesEndpoints {
  constructor(private readonly controller: EpisodesController) {}

  @Get()
  public async getAllEpisodes(): Promise<any> {
    return this.controller.getAllEpisodes();
  }
}
