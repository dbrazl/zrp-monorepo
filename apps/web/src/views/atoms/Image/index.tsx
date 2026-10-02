interface Props {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  round?: boolean;
}

export function Image({ src, alt, width, height, round }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height, borderRadius: round ? '50%' : 'unset' }}
    />
  );
}
