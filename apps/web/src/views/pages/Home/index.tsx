import { CardList } from '@/views/organisms/CardList';

import { CardList as CardListType } from '@/models/data-structures/card-list';
import { Layout } from '@/views/templates/Layout';

interface Props {
  data: CardListType[];
}

export function Homepage({ data }: Props) {
  return (
    <Layout>
      {data.map(({ title, cards }) =>
        <CardList key={title} title={title} data={cards} />
      )}
    </Layout>
  );
}
