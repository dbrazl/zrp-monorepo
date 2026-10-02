import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CardList } from '@/models/data-structures/card-list';
import type { SeasonEpisodesDto } from '@/models/dtos/season-episode.dto';
import { seasonEpisodeDtoToCardList } from '@/models/mappers/season-episode-dto-to-card-list';
import { getEpisodes } from '@/models/services/bff';
import { Homepage } from '@/views/pages/Home';

import Page, { dynamic } from './page';

vi.mock('@/models/mappers/season-episode-dto-to-card-list', () => ({
  seasonEpisodeDtoToCardList: vi.fn(),
}));

vi.mock('@/models/services/bff', () => ({
  getEpisodes: vi.fn(),
}));

vi.mock('@/views/pages/Home', () => ({
  Homepage: vi.fn(),
}));

const getEpisodesMock = vi.mocked(getEpisodes);
const seasonEpisodeDtoToCardListMock = vi.mocked(
  seasonEpisodeDtoToCardList,
);

describe('Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uses static rendering', () => {
    expect(dynamic).toBe('force-static');
  });

  it('maps the episodes and passes the result to the homepage', async () => {
    const episodes: SeasonEpisodesDto[] = [
      {
        season: 'S01',
        episodes: [],
      },
    ];
    const data: CardList[] = [
      {
        title: 'S01',
        cards: [],
      },
    ];
    getEpisodesMock.mockResolvedValue(episodes);
    seasonEpisodeDtoToCardListMock.mockReturnValue(data);

    const result = await Page();

    expect(getEpisodesMock).toHaveBeenCalledOnce();
    expect(seasonEpisodeDtoToCardListMock).toHaveBeenCalledOnce();
    expect(seasonEpisodeDtoToCardListMock).toHaveBeenCalledWith(episodes);
    expect(result.type).toBe(Homepage);
    expect(result.props).toEqual({ data });
  });

  it('propagates errors from the BFF without mapping data', async () => {
    getEpisodesMock.mockRejectedValue(new Error('Episodes unavailable'));

    await expect(Page()).rejects.toMatchObject({
      message: 'Episodes unavailable',
    });
    expect(seasonEpisodeDtoToCardListMock).not.toHaveBeenCalled();
  });
});
