import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CardList } from '.';
import style from './style.module.css';

const cards = [
  {
    id: 1,
    upperLabel: 'Episode 1',
    label: 'Pilot',
  },
  {
    id: 2,
    upperLabel: 'Episode 2',
    label: 'Lawnmower Dog',
  },
];

describe('CardList', () => {
  it('renders the title and a card for each item', () => {
    render(<CardList title="Season 1" data={cards} />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Season 1',
    });
    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    const links = screen.getAllByRole('link');

    expect(heading.parentElement?.className).toBe(style.wrapper);
    expect(list.className).toBe(style.list);
    expect(items).toHaveLength(cards.length);
    expect(items.every((item) => item.className === style.item)).toBe(true);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/episode/1',
      '/episode/2',
    ]);
    expect(screen.getByText('Pilot')).toBeTruthy();
    expect(screen.getByText('Lawnmower Dog')).toBeTruthy();
  });

  it('renders an empty list when there are no items', () => {
    render(<CardList title="Season without episodes" data={[]} />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Season without episodes',
      }),
    ).toBeTruthy();
    expect(screen.getByRole('list').className).toBe(style.list);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
