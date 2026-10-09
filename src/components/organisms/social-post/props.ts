import type {
  MediaAssetProps,
  SocialIdentityProps,
  SocialPostContentProps,
} from '@/constants/props';

export interface SocialPostProps {
  post: SocialPostContentProps;
  identities: Record<string, SocialIdentityProps>;
  media: Record<string, MediaAssetProps>;
  isReply?: boolean;
}
