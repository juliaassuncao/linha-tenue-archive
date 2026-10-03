import type { MediaAssetProps, SocialAccountProps } from '@/constants/props';

export interface CharacterSectionProps {
  title: string;
  publicAccount: SocialAccountProps;
  privateAccount: SocialAccountProps;
  publicAvatar: MediaAssetProps;
  publicBanner: MediaAssetProps;
  privateAvatar: MediaAssetProps;
  privateBanner: MediaAssetProps;
}