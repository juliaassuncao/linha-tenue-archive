export interface CharacterProps {
  id: string;
  name: string;
  source: string[];
}

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

export interface SocialIdentityProps {
  id: string;
  displayName: string;
  username: string;
  avatarMediaId: string;
  isPrivate?: boolean;
  verification?: 'blue' | 'gold';
}

export interface SocialPostMetricsProps {
  views?: string;
  retweets?: string;
  quoteTweets?: string;
  likes?: string;
  replies?: string;
}

export interface SocialPostContentProps {
  id: string;
  authorId: string;
  text: string;
  timestamp?: string;
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

export interface ChatMessageProps {
  id: string;
  text: string;
  direction: 'incoming' | 'outgoing';
  senderName?: string;
  avatarMediaId?: string;
}

export interface ChatContentProps {
  id: string;
  title: string;
  kind: 'group' | 'direct';
  headerAvatarMediaIds?: string[];
  messages: ChatMessageProps[];
  backgroundMediaId?: string;
  source: string[];
}

export interface MediaAssetProps {
  id: string;
  relativePath: string;
  alt: string;
  source: string[];
}

export interface CharacterContentProps {
  character: CharacterProps;
  accounts: {
    public: SocialAccountProps;
    private: SocialAccountProps;
  };
  squad: ChatContentProps;
  media: Record<string, MediaAssetProps>;
}
