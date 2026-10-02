import { Image } from '@/views/atoms/Image';
import { Text } from '@/views/atoms/Text';

import style from './style.module.css';

interface Props {
  name: string;
  status: string;
  gender: string;
  image: string;
}

export function CharacterCard({ name, status, gender, image }: Props) {
  return (
    <article className={style.card}>
      <Image src={image} alt={name} width="100%" />

      <div className={style.content}>
        <Text tag="h3" size="h5" weight="bold">
          {name}
        </Text>
        <Text color="secondary">{`Status: ${status}`}</Text>
        <Text color="secondary">{`Sexo: ${gender}`}</Text>
      </div>
    </article>
  );
}
