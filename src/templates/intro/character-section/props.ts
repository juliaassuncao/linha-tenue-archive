import type { ChatContentProps } from '@/components/organisms/chat/props';
import type { MediaAssetProps } from '@/constants/props';
import type { SocialAccountProps } from '@/components/organisms/social-profile/props';

export interface CharacterSectionProps {
  title: string;
  labels: {
    publicProfile: string;
    privateProfile: string;
    squad: string;
    wallpaper: string;
  };
  publicAccount: SocialAccountProps;
  privateAccount: SocialAccountProps;
  publicAvatar: MediaAssetProps;
  publicBanner: MediaAssetProps;
  privateAvatar: MediaAssetProps;
  privateBanner: MediaAssetProps;
  squad: ChatContentProps;
  media: Record<string, MediaAssetProps>;
  wallpaper: MediaAssetProps;
}
