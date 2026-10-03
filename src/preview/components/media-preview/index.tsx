import { useState } from 'react';
import type { MediaPreviewProps } from './props';
import styles from './styles.module.scss';

function MediaPreviewImage({ media }: MediaPreviewProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={styles.placeholder} role="status">
        <strong>ASSET PENDENTE</strong>
        <dl>
          <dt>ID:</dt>
          <dd>{media.id}</dd>
          <dt>ARQUIVO ESPERADO:</dt>
          <dd>public/assets/{media.relativePath}</dd>
          <dt>FONTE:</dt>
          <dd>{media.source[0] ?? 'Não informada'}</dd>
        </dl>
      </div>
    );
  }

  return (
    <img
      className={styles.image}
      src={`/assets/${media.relativePath}`}
      alt={media.alt}
      onError={() => setFailed(true)}
    />
  );
}

export function MediaPreview({ media }: MediaPreviewProps) {
  return (
    <MediaPreviewImage
      key={`${media.id}:${media.relativePath}`}
      media={media}
    />
  );
}
