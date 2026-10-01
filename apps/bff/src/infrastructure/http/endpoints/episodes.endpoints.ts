import { Controller, Get } from '@nestjs/common';
import { EpisodesController } from '@/presentation/controllers/episodes.controller.js';
import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';

@Controller('/episodes')
export class EpisodesEndpoints {
  constructor(private readonly controller: EpisodesController) { }

  @Get()
  public async getAllEpisodes(): Promise<SeasonEpisodesDto[]> {
    return this.controller.getAllEpisodes();
  }
}
