import { IntroC, SynopsisC } from './constants';
import { Synopsis } from './synopsis';
import S from './styles.module.scss';

export function Intro() {
  return (
    <main className={S.wrapper}>
      <header className={S.header}>
        <h1 className={S.title}>{IntroC.header.title}</h1>
        <p className={S.subtitle}>{IntroC.header.subtitle}</p>
      </header>
      <div className={S.content}>
        <Synopsis
          title={SynopsisC.title}
          text={SynopsisC.text}
          media={[
            SynopsisC.media.lorena,
            SynopsisC.media.contract,
            SynopsisC.media.fakeKiss,
            SynopsisC.media.eduarda,
          ]}
        />
      </div>
    </main>
  );
}
