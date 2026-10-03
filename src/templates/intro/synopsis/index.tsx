import { SynopsisPreviewC } from './constants';
import type { SynopsisProps } from './props';
import S from './styles.module.scss';

export function Synopsis({ title, text, media }: SynopsisProps) {
  return (
    <section>
      <h2 className={S.title}>{title}</h2>
      <p className={S.text}>{text}</p>
      <section className={S.test}>
        <div className={S.mediaLayout}>
          {media.map((asset) => (
            <details key={asset.id} className={S.mediaItem}>
              <summary className={S.summary}>
                <img
                  className={S.image}
                  src={`/assets/${asset.relativePath}`}
                  alt={asset.alt}
                />
                <span className={S.closeIndicator}>
                  {SynopsisPreviewC.closeLabel}
                </span>
              </summary>
            </details>
          ))}
        </div>
      </section>
      {/*
      <section className={S.test}>
        <h3 className={S.testTitle}>{SynopsisPreviewC.flowTestTitle}</h3>
        <div className={S.mediaLayout}>
          {media.map((asset) => (
            <div key={asset.id} className={S.flowItem}>
              <img
                className={S.image}
                src={`/assets/${asset.relativePath}`}
                alt={asset.alt}
              />
            </div>
          ))}
        </div>
      </section>
      */}
    </section>
  );
}
