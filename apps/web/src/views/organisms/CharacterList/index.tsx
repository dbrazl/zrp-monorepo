import { CharacterDto } from '@/models/dtos/character.dto';
import { Text } from '@/views/atoms/Text';
import { CharacterCard } from '@/views/molecules/CharacterCard';

import style from './style.module.css';

interface Props {
  characters: CharacterDto[];
}

export function CharacterList({ characters }: Props) {
  return (
    <section className={style.wrapper}>
      <Text tag="h2" size="h2" weight="bold">
        Personagens
      </Text>

      <ul className={style.list}>
        {characters.map((character) => (
          <li key={character.id} className={style.item}>
            <CharacterCard {...character} />
          </li>
        ))}
      </ul>
    </section>
  );
}
