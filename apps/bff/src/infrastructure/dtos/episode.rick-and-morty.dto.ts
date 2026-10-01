import { ProviderEpisodeDto } from '@/application/dtos/inputs/provider-episode.dto.js';

type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type EpisodeRickAndMortyDto = {
  info: Info;
  results: ProviderEpisodeDto[];
};
