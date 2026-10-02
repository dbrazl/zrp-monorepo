import { describe, expect, it } from 'vitest';

import type { SeasonEpisodesDto } from '@/models/dtos/season-episode.dto';

import { seasonEpisodeDtoToCardList } from './season-episode-dto-to-card-list';

describe('seasonEpisodeDtoToCardList', () => {
  it('maps seasons and their episodes to card lists', () => {
    const seasons: SeasonEpisodesDto[] = [
      {
        season: 'S01',
        episodes: [
          {
            id: 1,
            name: 'Pilot',
            episode: 'E01',
            season: 'S01',
            characters: ['https://example.com/character/1'],
          },
          {
            id: 2,
            name: 'Lawnmower Dog',
            episode: 'E02',
            season: 'S01',
            characters: ['https://example.com/character/1'],
          },
        ],
      },
      {
        season: 'S02',
        episodes: [
          {
            id: 12,
            name: 'A Rickle in Time',
            episode: 'E01',
            season: 'S02',
            characters: ['https://example.com/character/2'],
          },
        ],
      },
    ];

    expect(seasonEpisodeDtoToCardList(seasons)).toEqual([
      {
        title: 'S01',
        cards: [
          {
            id: 1,
            label: 'Pilot',
            upperLabel: 'E01',
          },
          {
            id: 2,
            label: 'Lawnmower Dog',
            upperLabel: 'E02',
          },
        ],
      },
      {
        title: 'S02',
        cards: [
          {
            id: 12,
            label: 'A Rickle in Time',
            upperLabel: 'E01',
          },
        ],
      },
    ]);
  });

  it('maps a season without episodes to an empty card list', () => {
    const seasons: SeasonEpisodesDto[] = [
      {
        season: 'S03',
        episodes: [],
      },
    ];

    expect(seasonEpisodeDtoToCardList(seasons)).toEqual([
      {
        title: 'S03',
        cards: [],
      },
    ]);
  });

  it('returns an empty list when there are no seasons', () => {
    expect(seasonEpisodeDtoToCardList([])).toEqual([]);
  });
});
