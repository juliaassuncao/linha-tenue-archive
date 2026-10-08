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
