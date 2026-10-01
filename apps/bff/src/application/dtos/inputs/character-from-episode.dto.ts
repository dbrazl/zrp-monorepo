type Status = 'Alive' | 'Dead' | 'unknown';
type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown';

type Location = {
  name: string;
  url: string;
};

export type CharacterFromEpisodeDto = {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: string;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};
