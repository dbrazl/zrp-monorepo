import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCharacters, getEpisodes } from '@/models/services/bff';
import { EpisodePage } from '@/views/pages/Episode';

export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function Page({
  params,
}: PageProps<'/episode/[id]'>) {
  const episode = await getEpisode(params);

  if (!episode) {
    notFound();
  }

  const characters = await getCharacters(episode.characters);

  return <EpisodePage episode={episode} characters={characters} />;
}

async function getEpisode(params: Promise<{
  id: string;
}>) {
  const { id } = await params;
  const seasons = await getEpisodes();
  return seasons
    .flatMap(({ episodes }) => episodes)
    .find((episode) => episode.id === Number(id));
}

export async function generateStaticParams() {
  const seasons = await getEpisodes();

  return seasons.flatMap(({ episodes }) =>
    episodes.map(({ id }) => ({ id: id.toString() })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/episode/[id]'>): Promise<Metadata> {
  const episode = await getEpisode(params);

  return {
    title: episode
      ? `${episode.episode} | Rick and Morty`
      : 'Episódio | Rick and Morty',
  };
}
