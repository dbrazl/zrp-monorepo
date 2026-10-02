import { notFound } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CharacterDto } from '@/models/dtos/character.dto';
import type {
  Episode,
  SeasonEpisodesDto,
} from '@/models/dtos/season-episode.dto';
import { getCharacters, getEpisodes } from '@/models/services/bff';
import { EpisodePage } from '@/views/pages/Episode';

import Page, {
  dynamic,
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from './page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/models/services/bff', () => ({
  getCharacters: vi.fn(),
  getEpisodes: vi.fn(),
}));

vi.mock('@/views/pages/Episode', () => ({
  EpisodePage: vi.fn(),
}));

const getCharactersMock = vi.mocked(getCharacters);
const getEpisodesMock = vi.mocked(getEpisodes);
const notFoundMock = vi.mocked(notFound);

const firstEpisode: Episode = {
  id: 1,
  name: 'Pilot',
  episode: 'E01',
  season: 'S01',
  characters: [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2',
  ],
};

const secondEpisode: Episode = {
  id: 12,
  name: 'A Rickle in Time',
  episode: 'E01',
  season: 'S02',
  characters: ['https://rickandmortyapi.com/api/character/1'],
};

const seasons: SeasonEpisodesDto[] = [
  { season: 'S01', episodes: [firstEpisode] },
  { season: 'S02', episodes: [secondEpisode] },
];

const characters: CharacterDto[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
    image: 'https://example.com/rick.png',
  },
];

function createPageProps(id: string): PageProps<'/episode/[id]'> {
  return {
    params: Promise.resolve({ id }),
    searchParams: Promise.resolve({}),
  };
}

describe('Episode route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uses static rendering without dynamic parameters', () => {
    expect(dynamic).toBe('force-static');
    expect(dynamicParams).toBe(false);
  });

  it('loads the episode characters and passes them to the page view', async () => {
    getEpisodesMock.mockResolvedValue(seasons);
    getCharactersMock.mockResolvedValue(characters);

    const result = await Page(createPageProps('12'));

    expect(getEpisodesMock).toHaveBeenCalledOnce();
    expect(getCharactersMock).toHaveBeenCalledOnce();
    expect(getCharactersMock).toHaveBeenCalledWith(secondEpisode.characters);
    expect(result.type).toBe(EpisodePage);
    expect(result.props).toEqual({
      episode: secondEpisode,
      characters,
    });
    expect(notFoundMock).not.toHaveBeenCalled();
  });

  it('calls notFound when the requested episode does not exist', async () => {
    getEpisodesMock.mockResolvedValue(seasons);
    notFoundMock.mockImplementation(() => {
      throw new Error('NEXT_NOT_FOUND');
    });

    await expect(Page(createPageProps('999'))).rejects.toMatchObject({
      message: 'NEXT_NOT_FOUND',
    });
    expect(notFoundMock).toHaveBeenCalledOnce();
    expect(getCharactersMock).not.toHaveBeenCalled();
  });

  it('generates a parameter for every episode', async () => {
    getEpisodesMock.mockResolvedValue(seasons);

    await expect(generateStaticParams()).resolves.toEqual([
      { id: '1' },
      { id: '12' },
    ]);
    expect(getEpisodesMock).toHaveBeenCalledOnce();
  });

  it('generates metadata with the episode code', async () => {
    getEpisodesMock.mockResolvedValue(seasons);

    await expect(generateMetadata(createPageProps('12'))).resolves.toEqual({
      title: 'E01 | Rick and Morty',
    });
  });

  it('generates fallback metadata when the episode does not exist', async () => {
    getEpisodesMock.mockResolvedValue(seasons);

    await expect(generateMetadata(createPageProps('999'))).resolves.toEqual({
      title: 'Episódio | Rick and Morty',
    });
  });
});
