import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Image } from '.';

describe('Image', () => {
  it('renders the image with its source and alternative text', () => {
    render(<Image src="/character.png" alt="Rick Sanchez" />);

    expect(
      screen.getByRole('img', { name: 'Rick Sanchez' }).getAttribute('src'),
    ).toBe('/character.png');
  });

  it('applies the provided dimensions', () => {
    render(
      <Image
        src="/character.png"
        alt="Rick Sanchez"
        width="120px"
        height="80px"
      />,
    );

    const image = screen.getByRole('img', {
      name: 'Rick Sanchez',
    }) as HTMLImageElement;

    expect(image.style.width).toBe('120px');
    expect(image.style.height).toBe('80px');
  });

  it('renders a round image when round is true', () => {
    render(<Image src="/character.png" alt="Rick Sanchez" round />);

    expect(
      screen.getByRole('img', { name: 'Rick Sanchez' }).style.borderRadius,
    ).toBe('50%');
  });

  it('renders a non-round image by default', () => {
    render(<Image src="/character.png" alt="Rick Sanchez" />);

    expect(
      screen.getByRole('img', { name: 'Rick Sanchez' }).style.borderRadius,
    ).toBe('unset');
  });
});
