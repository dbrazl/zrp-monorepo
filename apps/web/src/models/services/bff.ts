import { SeasonEpisodesDto } from '@/models/dtos/season-episode.dto';
import { CharacterDto } from '@/models/dtos/character.dto';

const HOST = 'http://localhost:3000/api/v1/sitcom';

export async function getEpisodes(): Promise<SeasonEpisodesDto[]> {
  const response = await fetch(`${HOST}/episodes`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? 'Unknown error - BFF');
  }

  return response.json();
}

export async function getCharacters(
  charactersIds: string[],
): Promise<CharacterDto[]> {
  const response = await fetch(
    `${HOST}/characters/${charactersIds.join(',')}`,
    {
      cache: 'force-cache',
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? 'Unknown error - BFF');
  }

  return response.json();
}
