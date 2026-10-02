import { render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';

import RootLayout, { metadata } from './layout';

vi.mock('@/views/templates/Layout', () => ({
  Layout: ({ children }: PropsWithChildren) => (
    <main data-testid="application-layout">{children}</main>
  ),
}));

describe('RootLayout', () => {
  it('exports the application metadata', () => {
    expect(metadata).toEqual({
      title: 'Episodios | Ricky and Morty',
      description: 'Descubra os personagens por episódio',
    });
  });

  it('renders the page content inside the application layout', () => {
    render(
      <RootLayout params={Promise.resolve({})}>
        <section>Page content</section>
      </RootLayout>,
      { container: document },
    );

    const applicationLayout = screen.getByTestId('application-layout');
    const pageContent = screen.getByText('Page content');

    expect(document.documentElement.lang).toBe('pt-BR');
    expect(document.body.contains(applicationLayout)).toBe(true);
    expect(applicationLayout.contains(pageContent)).toBe(true);
  });
});
