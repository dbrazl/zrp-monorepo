interface Props {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

export function Image({ src, alt, width, height }: Props) {
  return <img src={src} alt={alt} style={{ width, height }} />;
}
