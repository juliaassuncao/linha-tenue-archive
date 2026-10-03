import { CharacterSectionsC, IntroC, SynopsisC } from './constants';
import { Synopsis } from './synopsis';
import S from './styles.module.scss';
import { CharacterSection } from './character-section';

export const Intro = () => {
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
        {CharacterSectionsC.map(({ id, title, data }) => (
          <CharacterSection
            key={id}
            title={title}
            publicAccount={data.accounts.public}
            publicAvatar={data.media.publicAvatar}
            publicBanner={data.media.publicBanner}
            privateAccount={data.accounts.private}
            privateAvatar={data.media.privateAvatar}
            privateBanner={data.media.privateBanner}
          />
        ))}
      </div>
    </main>
  );
};
