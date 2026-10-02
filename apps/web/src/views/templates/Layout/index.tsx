import { ReactNode } from 'react';
import style from './style.module.css';
import { Image } from '@/views/atoms/Image';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <main className={style.content}>
      <div className={style.imageWrapper}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original"
          width="250px"
        />
      </div>

      {children}
    </main>
  );
}
