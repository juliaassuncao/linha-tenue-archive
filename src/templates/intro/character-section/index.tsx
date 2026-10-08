import { resolveAssetUrl } from '@/utils/resolve-asset-url';
import { SocialProfile } from '@/components/organisms/social-profile';
import type { CharacterSectionProps } from './props';
import S from './styles.module.scss';
import { Chat } from '@/components/organisms/chat';

export const CharacterSection = ({
  title,
  labels,
  publicAccount,
  privateAccount,
  publicAvatar,
  publicBanner,
  privateAvatar,
  privateBanner,
  squad,
  media,
  wallpaper,
}: CharacterSectionProps) => {
  return (
    <section className={`${S.section} lt-character-section`}>
      <h2 className={`${S.title} lt-character-section__title`}>{title}</h2>
      <p className={`${S.contentLabel} lt-character-section__label`}>
        {labels.publicProfile}
      </p>
      <SocialProfile
        account={publicAccount}
        avatar={publicAvatar}
        banner={publicBanner}
      />
      <p className={`${S.contentLabel} lt-character-section__label`}>
        {labels.privateProfile}
      </p>
      <SocialProfile
        account={privateAccount}
        avatar={privateAvatar}
        banner={privateBanner}
      />
      <p
        className={`${S.contentLabel} ${S.chatLabel} lt-character-section__label lt-character-section__label--chat`}
      >
        {labels.squad}
      </p>
      <Chat content={squad} media={media} />
      <p
        className={`${S.contentLabel} ${S.wallpaperLabel} lt-character-section__label lt-character-section__label--wallpaper`}
      >
        {labels.wallpaper}
      </p>
      <figure className={`${S.wallpaper} lt-wallpaper`}>
        <img
          className="lt-wallpaper__image"
          src={resolveAssetUrl(wallpaper.relativePath)}
          alt={wallpaper.alt}
        />
      </figure>
    </section>
  );
};
