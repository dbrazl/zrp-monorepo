import { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

import { Text } from '@/views/atoms/Text';

import style from './style.module.css';

interface Props {
  label: string;
  upperLabel: string;
  href?: string;
}

export function Card({ label, upperLabel, href = '' }: Props) {
  return (
    <Link className={style.card} href={href}>
      <Text size="sm" color="secondary" weight="bold">
        {upperLabel}
      </Text>
      <Text weight="bold">{label}</Text>
    </Link>
  );

}
