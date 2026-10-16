import type { ReactNode } from 'react';
import type { MediaAssetProps } from '@/constants/props';
import type { ChatContentProps } from '@/components/organisms/chat/props';
import type { SocialPostContentProps } from '@/components/organisms/social-post/props';

export type Update001BlockProps = {
  id: string;
  source: string[];
} & (
  | {
      type: 'social-post';
      postId: string;
    }
  | {
      type: 'narrative';
      label: string;
      text: ReactNode;
    }
  | {
      type: 'chat';
      chatId: string;
    }
  | {
      type: 'time-jump';
      text: ReactNode;
    }
);

export interface Update001ContentProps {
  header: {
    title: string;
  };
  blocks: Update001BlockProps[];
  posts: Record<string, SocialPostContentProps>;
  chats: Record<string, ChatContentProps>;
  media: Record<string, MediaAssetProps>;
}
