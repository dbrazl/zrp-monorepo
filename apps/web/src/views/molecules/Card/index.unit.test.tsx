import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from '.';
import style from './style.module.css';

describe('Card', () => {
  it('renders its labels as a link to the provided destination', () => {
    render(<Card upperLabel="Episode 1" label="Pilot" href="/episodes/1" />);

    const card = screen.getByRole('link');

    expect(card.getAttribute('href')).toBe('/episodes/1');
    expect(card.className).toBe(style.card);
    expect(screen.getByText('Episode 1').tagName).toBe('SPAN');
    expect(screen.getByText('Pilot').tagName).toBe('SPAN');
  });

  it('uses an empty destination by default', () => {
    render(<Card upperLabel="Episode 2" label="Lawnmower Dog" />);

    const card = screen.getByText('Episode 2').closest('a');

    expect(card?.getAttribute('href')).toBe('');
  });
});
