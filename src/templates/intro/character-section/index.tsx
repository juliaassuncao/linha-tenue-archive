import { SocialProfile } from '@/components/organisms/social-profile';
import type { CharacterSectionProps } from './props';
import S from './styles.module.scss';

export const CharacterSection = ({
  title,
  publicAccount,
  privateAccount,
  publicAvatar,
  publicBanner,
  privateAvatar,
  privateBanner,
}: CharacterSectionProps) => {
  return (
    <section className={S.section}>
      <h2 className={S.title}>{title}</h2>
      <SocialProfile
        account={publicAccount}
        avatar={publicAvatar}
        banner={publicBanner}
      />
      <SocialProfile
        account={privateAccount}
        avatar={privateAvatar}
        banner={privateBanner}
      />
    </section>
  );
};