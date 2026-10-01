import style from './style.module.css';

type TextTag = 'span' | 'p' | 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1';

type FontSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'md' | 'sm' | 'xs';

type TextAlign = 'left' | 'center' | 'right' | 'justified';

type FontWeight = 'bold' | 'regular' | 'unset';

type Color = 'main' | 'secondary' | 'muted' | 'inverse' | 'brand';

interface Props {
  tag?: TextTag;
  size?: FontSize;
  align?: TextAlign;
  weight?: FontWeight;
  color?: Color;
  children: string;
}

export function Text({
  tag = 'span',
  size = 'md',
  align = 'left',
  weight = 'regular',
  color = 'main',
  children,
}: Props) {
  const HTMLTag = tag;

  return (
    <HTMLTag
      className={[
        style.base,
        style[size],
        style[align],
        style[weight],
        style[color],
      ].join(' ')}
    >
      {children}
    </HTMLTag>
  );
}
