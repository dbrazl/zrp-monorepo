type Status = 'Alive' | 'Dead' | 'unknown';
type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown';

type Location = {
  name: string;
  url: string;
};

export type ProviderCharacterDto = {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};
