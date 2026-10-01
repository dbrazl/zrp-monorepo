import { ButtonHTMLAttributes } from 'react';

import { Text } from '@/views/atoms/Text';

import style from './style.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  upperLabel: string;
}

export function Card({ label, upperLabel, ...props }: Props) {
  return (
    <button className={style.card} {...props}>
      <Text size="sm" color="secondary" weight="bold">
        {upperLabel}
      </Text>
      <Text weight="bold">{label}</Text>
    </button>
  );
}
