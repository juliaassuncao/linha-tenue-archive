import type { ReactNode } from 'react';
import type { MediaAssetProps } from '@/constants/props';

export interface SocialIdentityProps {
  id: string;
  displayName: string;
  username: string;
  avatarMediaId: string;
  isPrivate?: boolean;
  verification?: 'blue' | 'gold';
}

export interface SocialPostMetricsProps {
  retweets?: string;
  quoteTweets?: string;
  likes?: string;
  replies?: string;
}

export interface SocialPostContentProps {
  id: string;
  authorId: string;
  text: ReactNode;
  timestamp?: string;
  relativeTimestamp?: string;
  views?: string;
  metrics?: SocialPostMetricsProps;
  mediaIds?: string[];
  source: string[];
  replyingTo?: {
    postId: string;
    username: string;
  };
  replies?: SocialPostContentProps[];
  quotedPostId?: string;
}

export interface SocialPostProps {
  post: SocialPostContentProps;
  posts: Record<string, SocialPostContentProps>;
  identities: Record<string, SocialIdentityProps>;
  media: Record<string, MediaAssetProps>;
  isReply?: boolean;
  isQuote?: boolean;
  connectsFromPreviousReply?: boolean;
  connectsToNextReply?: boolean;
}
