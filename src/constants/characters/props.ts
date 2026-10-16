import type { ChatContentProps } from '@/components/organisms/chat/props';
import type { SocialAccountProps } from '@/components/organisms/social-profile/props';
import type { MediaAssetProps } from '@/constants/props';

export interface CharacterProps {
  id: string;
  name: string;
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
