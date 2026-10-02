type Status = 'Alive' | 'Dead' | 'unknown';
type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export type CharacterDto = {
  id: number;
  name: string;
  status: Status;
  gender: Gender;
  image: string;
};
