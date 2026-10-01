import { Controller, Get } from '@nestjs/common';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';
import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';

@Controller('/sitcom')
export class SitcomEndpoints {
  constructor(private readonly controller: SitcomController) { }

  @Get('/episodes')
  public async getAllEpisodes(): Promise<SeasonEpisodesDto[]> {
    return this.controller.getAllEpisodes();
  }
}
