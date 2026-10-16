import type { MediaAssetProps } from '@/constants/props';

export interface SocialAccountProps {
  id: string;
  characterId: string;
  kind: 'public' | 'private';
  displayName: string;
  username: string;
  bio: string;
  location?: string;
  websiteLabel?: string;
  verified: boolean;
  following: string;
  followers: string;
  avatarMediaId: string;
  bannerMediaId: string;
  source: string[];
}

export interface SocialProfileProps {
  account: SocialAccountProps;
  avatar: MediaAssetProps;
  banner: MediaAssetProps;
}
