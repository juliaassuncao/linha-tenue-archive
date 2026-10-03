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

export interface SquadParticipantProps {
  id: string;
  label?: string;
  text: string;
  avatarMediaId?: string;
  direction: 'incoming' | 'outgoing';
}

export interface SquadProps {
  id: string;
  name: string;
  characterId: string;
  participants: SquadParticipantProps[];
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
  squad: SquadProps;
  media: Record<string, MediaAssetProps>;
}
