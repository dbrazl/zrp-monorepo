import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Layout } from '.';
import style from './style.module.css';

describe('Layout', () => {
  it('renders the application logo inside the layout structure', () => {
    render(<Layout>Page content</Layout>);

    const main = screen.getByRole('main');
    const image = screen.getByRole('img');

    expect(main.className).toBe(style.content);
    expect(image.parentElement?.className).toBe(style.imageWrapper);
    expect(image.getAttribute('src')).toBe(
      'https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original',
    );
    expect(image.style.width).toBe('250px');
  });

  it('renders its children inside the main content', () => {
    render(
      <Layout>
        <section aria-label="Page content">Rendered child</section>
      </Layout>,
    );

    const main = screen.getByRole('main');
    const child = screen.getByRole('region', { name: 'Page content' });

    expect(main.contains(child)).toBe(true);
    expect(screen.getByText('Rendered child')).toBeTruthy();
  });
});
