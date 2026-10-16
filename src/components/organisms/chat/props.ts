import type { ChatMessageContentProps } from '@/components/molecules/chat-message/props';
import type { MediaAssetProps } from '@/constants/props';

export interface ChatContentProps {
  id: string;
  title: string;
  kind: 'group' | 'direct';
  headerAvatarMediaIds?: string[];
  messages: ChatMessageContentProps[];
  backgroundMediaId?: string;
  source: string[];
}

export interface ChatProps {
  content: ChatContentProps;
  media: Record<string, MediaAssetProps>;
}
