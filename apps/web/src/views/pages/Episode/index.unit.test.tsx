import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CharacterDto } from '@/models/dtos/character.dto';
import type { Episode as EpisodeDto } from '@/models/dtos/season-episode.dto';

import { EpisodePage } from '.';
import style from './style.module.css';

const episode: EpisodeDto = {
  id: 1,
  name: 'Pilot',
  episode: 'E01',
  season: 'S01',
  characters: ['https://example.com/character/1'],
};

const characters: CharacterDto[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
    image: 'https://example.com/rick.png',
  },
];

describe('EpisodePage', () => {
  it('renders the navigation and episode header', () => {
    render(<EpisodePage episode={episode} characters={characters} />);

    const backLink = screen.getByRole('link', {
      name: 'Voltar para episódios',
    });
    const heading = screen.getByRole('heading', {
      level: 1,
      name: episode.name,
    });

    expect(backLink.getAttribute('href')).toBe('/');
    expect(backLink.className).toBe(style.backLink);
    expect(backLink.parentElement?.className).toBe(style.wrapper);
    expect(heading.parentElement?.className).toBe(style.header);
    expect(screen.getByText('S01 · E01')).toBeTruthy();
  });

  it('renders the episode characters', () => {
    render(<EpisodePage episode={episode} characters={characters} />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Personagens',
      }),
    ).toBeTruthy();
    expect(screen.getAllByRole('article')).toHaveLength(characters.length);
    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toBeTruthy();
    expect(screen.getByText('Status: Alive')).toBeTruthy();
    expect(screen.getByText('Sexo: Male')).toBeTruthy();
  });
});
