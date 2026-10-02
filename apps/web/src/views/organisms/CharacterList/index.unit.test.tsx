import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CharacterDto } from '@/models/dtos/character.dto';

import { CharacterList } from '.';
import style from './style.module.css';

const characters: CharacterDto[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
    image: 'https://example.com/rick.png',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'unknown',
    gender: 'Male',
    image: 'https://example.com/morty.png',
  },
];

describe('CharacterList', () => {
  it('renders a card for each character', () => {
    render(<CharacterList characters={characters} />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Personagens',
    });
    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    const cards = screen.getAllByRole('article');
    const images = screen.getAllByRole('img') as HTMLImageElement[];

    expect(heading.parentElement?.className).toBe(style.wrapper);
    expect(list.className).toBe(style.list);
    expect(items).toHaveLength(characters.length);
    expect(items.every((item) => item.className === style.item)).toBe(true);
    expect(cards).toHaveLength(characters.length);
    expect(images.map((image) => image.getAttribute('src'))).toEqual([
      characters[0].image,
      characters[1].image,
    ]);
    expect(screen.getByText('Status: Alive')).toBeTruthy();
    expect(screen.getByText('Status: unknown')).toBeTruthy();
    expect(screen.getAllByText('Sexo: Male')).toHaveLength(2);
  });

  it('renders an empty list when there are no characters', () => {
    render(<CharacterList characters={[]} />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Personagens',
      }),
    ).toBeTruthy();
    expect(screen.getByRole('list').className).toBe(style.list);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
