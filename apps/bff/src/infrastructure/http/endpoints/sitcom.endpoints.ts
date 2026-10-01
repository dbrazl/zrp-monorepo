import { Controller, Get, Param } from '@nestjs/common';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';
import { SeasonEpisodesDto } from '@/application/dtos/outputs/season-episode.dto.js';
import { Character } from '@/domain/data-structures/types/character.js';
import { ParseIdsPipe } from '@/infrastructure/http/pipes/parse-ids.pipe.js';

@Controller('/sitcom')
export class SitcomEndpoints {
  constructor(private readonly controller: SitcomController) { }

  @Get('/episodes')
  public async getAllEpisodes(): Promise<SeasonEpisodesDto[]> {
    return this.controller.getAllEpisodes();
  }

  @Get('/characters/:ids')
  public async getCharacters(
    @Param('ids', ParseIdsPipe) charactersIds: string[],
  ): Promise<Character[]> {
    return this.controller.getCharacters(charactersIds);
  }
}
