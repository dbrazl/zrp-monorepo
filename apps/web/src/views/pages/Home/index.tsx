import { Image } from '@/views/atoms/Image';
import { Text } from '@/views/atoms/Text';
import { CardList } from '@/views/organisms/CardList';

import style from './style.module.css';
import { CardList as CardListType } from '@/models/data-structures/card-list';

interface Props {
  data: CardListType[];
}

export function Homepage({ data }: Props) {
  return (
    <main className={style.content}>
      <div className={style.imageWrapper}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original"
          width="300px"
        />
      </div>

      {data.map(({ title, cards }) =>
        <CardList title={title} data={cards} />
      )}
    </main>
  );
}
