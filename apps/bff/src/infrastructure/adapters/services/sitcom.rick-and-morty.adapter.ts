import { EpisodeDto } from "@/application/dtos/inputs/episode.dto.js";
import { ISitcom } from "@/application/ports/services/sitcom.port.js";
import { EpisodeRickAndMortyDto } from "@/infrastructure/dtos/episode.rick-and-morty.dto.js";
import axios from "axios";

export class SitcomRickAndMortyAdapter implements ISitcom {
  private readonly HOST = 'https://rickandmortyapi.com/api';

  public async getAllEpisodes(): Promise<EpisodeDto[]> {
    const response = await axios.get<EpisodeRickAndMortyDto>(
      `${this.HOST}/episode`
    );
    return response.data.results;
  }
}
