import type {
  ChatContentProps,
  MediaAssetProps,
  SocialAccountProps,
} from '@/constants/props';

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
