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
    <section className={S.section}>
      <h2 className={S.title}>{title}</h2>
      <p className={S.contentLabel}>{labels.publicProfile}</p>
      <SocialProfile
        account={publicAccount}
        avatar={publicAvatar}
        banner={publicBanner}
      />
      <p className={S.contentLabel}>{labels.privateProfile}</p>
      <SocialProfile
        account={privateAccount}
        avatar={privateAvatar}
        banner={privateBanner}
      />
      <p className={`${S.contentLabel} ${S.chatLabel}`}>{labels.squad}</p>
      <Chat content={squad} media={media} />
      <p className={`${S.contentLabel} ${S.wallpaperLabel}`}>
        {labels.wallpaper}
      </p>
      <figure className={S.wallpaper}>
        <img
          src={`/assets/${wallpaper.relativePath}`}
          alt={wallpaper.alt}
        />
      </figure>
    </section>
  );
};
