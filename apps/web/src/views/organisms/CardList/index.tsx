import style from './style.module.css';
import { Card } from '@/views/molecules/Card';
import { Text } from '@/views/atoms/Text';

type Item = {
  id: number;
  label: string;
  upperLabel: string;
};

interface Props {
  title: string;
  data: Item[];
}

export function CardList({ title, data }: Props) {
  return (
    <div className={style.wrapper}>
      <Text tag="h2" size="h2" weight="bold">
        {title}
      </Text>

      <ul className={style.list}>
        {data.map((item) => (
          <li key={item.id} className={style.item}>
            <Card
              label={item.label}
              upperLabel={item.upperLabel}
              href={`/episode/${item.id}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
