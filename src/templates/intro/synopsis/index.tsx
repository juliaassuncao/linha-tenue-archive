import { resolveAssetUrl } from '@/utils/resolve-asset-url';
import { SynopsisPreviewC } from './constants';
import type { SynopsisProps } from './props';
import S from './styles.module.scss';

export function Synopsis({ text, media }: SynopsisProps) {
  return (
    <section className="lt-synopsis">
      <p className={`${S.text} lt-synopsis__text`}>{text}</p>
      <section className={`${S.test} lt-synopsis__media`}>
        <div className={`${S.mediaLayout} lt-synopsis__layout`}>
          {media.map((asset) => (
            <details
              key={asset.id}
              className={`${S.mediaItem} lt-synopsis__item`}
            >
              <summary className={`${S.summary} lt-synopsis__summary`}>
                <img
                  className={`${S.image} lt-synopsis__image`}
                  src={resolveAssetUrl(asset.relativePath)}
                  alt={asset.alt}
                />
                <span className={`${S.closeIndicator} lt-synopsis__close`}>
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
                src={resolveAssetUrl(asset.relativePath)}
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
