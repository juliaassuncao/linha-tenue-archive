import type {
  MediaAssetProps,
  SocialPostContentProps,
} from '@/constants/props';

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
      text: string;
    }
  | {
      type: 'chat';
      chatId: string;
    }
  | {
      type: 'time-jump';
      text: string;
    }
);

export interface Update001ContentProps {
  header: {
    title: string;
  };
  blocks: Update001BlockProps[];
  posts: Record<string, SocialPostContentProps>;
  media: Record<string, MediaAssetProps>;
}
