interface Props {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  round?: boolean;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
}

export function Image({
  src,
  alt,
  width,
  height,
  round,
  loading,
  decoding,
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      style={{ width, height, borderRadius: round ? '50%' : 'unset' }}
    />
  );
}
