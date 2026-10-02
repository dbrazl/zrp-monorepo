import Link from 'next/link';

import { CharacterDto } from '@/models/dtos/character.dto';
import { Episode as EpisodeDto } from '@/models/dtos/season-episode.dto';
import { Text } from '@/views/atoms/Text';
import { CharacterList } from '@/views/organisms/CharacterList';

import style from './style.module.css';

interface Props {
  episode: EpisodeDto;
  characters: CharacterDto[];
}

export function EpisodePage({ episode, characters }: Props) {
  return (
    <div className={style.wrapper}>
      <Link className={style.backLink} href="/">
        Voltar para episódios
      </Link>

      <header className={style.header}>
        <Text color="secondary" weight="bold">
          {`${episode.season} · ${episode.episode}`}
        </Text>

        <Text tag="h1" size="h1" weight="bold">
          {episode.name}
        </Text>
      </header>

      <CharacterList characters={characters} />
    </div>
  );
}
