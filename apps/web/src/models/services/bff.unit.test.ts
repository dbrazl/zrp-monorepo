import { afterEach, describe, expect, it, vi } from 'vitest';

import { getCharacters, getEpisodes } from './bff';

const HOST = 'http://localhost:3000/api/v1/sitcom';

function createFetchMock(response: Partial<Response>) {
  return vi.fn<typeof fetch>().mockResolvedValue(response as Response);
}

describe('BFF service', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getEpisodes', () => {
    it('returns the episodes from the BFF', async () => {
      const episodes = [{ season: 1, episodes: [] }];
      const fetchMock = createFetchMock({
        ok: true,
        json: vi.fn().mockResolvedValue(episodes),
      });
      vi.stubGlobal('fetch', fetchMock);

      await expect(getEpisodes()).resolves.toEqual(episodes);
      expect(fetchMock).toHaveBeenCalledOnce();
      expect(fetchMock).toHaveBeenCalledWith(`${HOST}/episodes`, {
        cache: 'force-cache',
      });
    });

    it('throws the error message returned by the BFF', async () => {
      vi.stubGlobal(
        'fetch',
        createFetchMock({
          ok: false,
          json: vi.fn().mockResolvedValue({ message: 'Episodes unavailable' }),
        }),
      );

      await expect(getEpisodes()).rejects.toMatchObject({
        message: 'Episodes unavailable',
      });
    });

    it('throws a fallback error when the error response is not valid JSON', async () => {
      vi.stubGlobal(
        'fetch',
        createFetchMock({
          ok: false,
          json: vi.fn().mockRejectedValue(new SyntaxError('Invalid JSON')),
        }),
      );

      await expect(getEpisodes()).rejects.toMatchObject({
        message: 'Unknown error - BFF',
      });
    });
  });

  describe('getCharacters', () => {
    it('returns the characters from the BFF', async () => {
      const characters = [{ id: 1, name: 'Rick Sanchez' }];
      const fetchMock = createFetchMock({
        ok: true,
        json: vi.fn().mockResolvedValue(characters),
      });
      vi.stubGlobal('fetch', fetchMock);

      await expect(getCharacters(['1', '42'])).resolves.toEqual(characters);
      expect(fetchMock).toHaveBeenCalledOnce();
      expect(fetchMock).toHaveBeenCalledWith(`${HOST}/characters/1,42`, {
        cache: 'force-cache',
      });
    });

    it('throws the error message returned by the BFF', async () => {
      vi.stubGlobal(
        'fetch',
        createFetchMock({
          ok: false,
          json: vi
            .fn()
            .mockResolvedValue({ message: 'Characters unavailable' }),
        }),
      );

      await expect(getCharacters(['1'])).rejects.toMatchObject({
        message: 'Characters unavailable',
      });
    });

    it('throws a fallback error when the error response is not valid JSON', async () => {
      vi.stubGlobal(
        'fetch',
        createFetchMock({
          ok: false,
          json: vi.fn().mockRejectedValue(new SyntaxError('Invalid JSON')),
        }),
      );

      await expect(getCharacters(['1'])).rejects.toMatchObject({
        message: 'Unknown error - BFF',
      });
    });
  });
});
