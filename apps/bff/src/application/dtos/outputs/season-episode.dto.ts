import { Episode } from '@/domain/data-structures/types/episode.js';

export type SeasonEpisodesDto = {
  season: string;
  episodes: Episode[];
};
