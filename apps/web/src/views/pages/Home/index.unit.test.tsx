import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CardList } from '@/models/data-structures/card-list';

import { Homepage } from '.';

const seasons: CardList[] = [
  {
    title: 'Season 1',
    cards: [
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
    ],
  },
  {
    title: 'Season 2',
    cards: [
      {
        id: 12,
        upperLabel: 'Episode 1',
        label: 'A Rickle in Time',
      },
    ],
  },
];

describe('Homepage', () => {
  it('renders a card list for each season', () => {
    render(<Homepage data={seasons} />);

    const headings = screen.getAllByRole('heading', { level: 2 });
    const lists = screen.getAllByRole('list');
    const links = screen.getAllByRole('link');

    expect(headings.map((heading) => heading.textContent)).toEqual([
      'Season 1',
      'Season 2',
    ]);
    expect(lists).toHaveLength(seasons.length);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/episode/1',
      '/episode/2',
      '/episode/12',
    ]);
    expect(screen.getByText('Pilot')).toBeTruthy();
    expect(screen.getByText('A Rickle in Time')).toBeTruthy();
  });

  it('renders no content when there are no seasons', () => {
    const { container } = render(<Homepage data={[]} />);

    expect(container.childElementCount).toBe(0);
  });
});
