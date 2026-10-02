export type Episode = {
  id: number;
  name: string;
  episode: string;
  season: string;
  characters: string[];
};

export type SeasonEpisodesDto = {
  season: string;
  episodes: Episode[];
};
