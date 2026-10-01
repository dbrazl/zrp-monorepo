import style from './style.module.css';
import { Card } from '@/views/molecules/Card';

type Item = {
  id: number;
  label: string;
  upperLabel: string;
};

interface Props {
  data: Item[];
}

export function CardList({ data }: Props) {
  return (
    <ul className={style.list}>
      {data.map((item) => (
        <li key={item.id} className={style.item}>
          <Card label={item.label} upperLabel={item.upperLabel} />
        </li>
      ))}
    </ul>
  );
}
