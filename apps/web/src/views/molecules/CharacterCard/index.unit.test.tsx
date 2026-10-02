import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CharacterCard } from '.';
import style from './style.module.css';

const character = {
  name: 'Rick Sanchez',
  status: 'Alive',
  gender: 'Male',
  image: 'https://example.com/rick.png',
};

describe('CharacterCard', () => {
  it('renders the character image with an accessible description', () => {
    render(<CharacterCard {...character} />);

    const image = screen.getByRole('img', {
      name: character.name,
    }) as HTMLImageElement;

    expect(image.getAttribute('src')).toBe(character.image);
    expect(image.style.width).toBe('100%');
    expect(image.getAttribute('loading')).toBe('lazy');
    expect(image.getAttribute('decoding')).toBe('async');
  });

  it('renders the character information inside the styled card', () => {
    render(<CharacterCard {...character} />);

    const card = screen.getByRole('article');
    const heading = screen.getByRole('heading', {
      level: 3,
      name: character.name,
    });

    expect(card.className).toBe(style.card);
    expect(heading.parentElement?.className).toBe(style.content);
    expect(screen.getByText(`Status: ${character.status}`)).toBeTruthy();
    expect(screen.getByText(`Sexo: ${character.gender}`)).toBeTruthy();
  });
});
