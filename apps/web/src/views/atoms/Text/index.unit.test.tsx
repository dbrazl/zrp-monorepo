import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from '.';
import style from './style.module.css';

describe('Text', () => {
  it('renders its children with the default tag and styles', () => {
    render(<Text>Rick Sanchez</Text>);

    const text = screen.getByText('Rick Sanchez');

    expect(text.tagName).toBe('SPAN');
    expect(text.className).toBe(
      [style.base, style.md, style.left, style.regular, style.main].join(' '),
    );
  });

  it('renders the configured tag and styles', () => {
    render(
      <Text tag="h2" size="h1" align="center" weight="bold" color="brand">
        Portal heading
      </Text>,
    );

    const text = screen.getByRole('heading', {
      level: 2,
      name: 'Portal heading',
    });

    expect(text.className).toBe(
      [style.base, style.h1, style.center, style.bold, style.brand].join(' '),
    );
  });
});
