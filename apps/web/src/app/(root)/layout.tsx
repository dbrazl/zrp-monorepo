import type { Metadata } from 'next';
import '@/views/global.css';
import { Layout } from '@/views/templates/Layout';

export const metadata: Metadata = {
  title: 'Episodios | Ricky and Morty',
  description: 'Descubra os personagens por episódio',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
