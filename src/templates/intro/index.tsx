import { CharacterSectionsC, IntroC, SynopsisC } from './constants.tsx';
import { Synopsis } from './synopsis';
import S from './styles.module.scss';
import { CharacterSection } from './character-section';
import { ArchiveInfo } from './archive-info';
import type { IntroProps } from './props';

export const Intro = ({ showTestNotice = false }: IntroProps) => {
  return (
    <main className={`${S.wrapper} lt-intro`}>
      <header className={`${S.header} lt-intro__header`}>
        <h1 className={`${S.title} lt-intro__title`}>{IntroC.header.title}</h1>
        <p className={`${S.subtitle} lt-intro__subtitle`}>
          {IntroC.header.subtitle}
        </p>
      </header>
      <ArchiveInfo showTestNotice={showTestNotice} />
      <div className={`${S.content} lt-intro__content`}>
        <Synopsis
          text={SynopsisC.text}
          media={[
            SynopsisC.media.lorena,
            SynopsisC.media.contract,
            SynopsisC.media.fakeKiss,
            SynopsisC.media.eduarda,
          ]}
        />
        {CharacterSectionsC.map(({ id, title, data }) => (
          <CharacterSection
            key={id}
            title={title}
            labels={IntroC.contentLabels}
            publicAccount={data.accounts.public}
            publicAvatar={data.media.publicAvatar}
            publicBanner={data.media.publicBanner}
            privateAccount={data.accounts.private}
            privateAvatar={data.media.privateAvatar}
            privateBanner={data.media.privateBanner}
            squad={data.squad}
            media={data.media}
            wallpaper={data.media.wallpaper}
          />
        ))}
      </div>
    </main>
  );
};
