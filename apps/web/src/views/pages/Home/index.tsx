import { CardList } from '@/views/organisms/CardList';
import { CardList as CardListType } from '@/models/data-structures/card-list';

interface Props {
  data: CardListType[];
}

export function Homepage({ data }: Props) {
  return (
    <>
      {data.map(({ title, cards }) => (
        <CardList key={title} title={title} data={cards} />
      ))}
    </>
  );
}
