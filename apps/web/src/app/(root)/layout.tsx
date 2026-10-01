import type { Metadata } from 'next';
import '@/views/global.css';

export const metadata: Metadata = {
  title: 'Episodios | Ricky and Morty',
  description: 'Descubra os personagens por episódio',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
