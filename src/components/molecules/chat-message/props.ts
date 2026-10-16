import type { MediaAssetProps } from '@/constants/props';

export interface ChatMessageContentProps {
  id: string;
  text?: string;
  direction: 'incoming' | 'outgoing';
  senderName?: string;
  avatarMediaId?: string;
  mediaId?: string;
}

export interface ChatMessageProps {
  message: ChatMessageContentProps;
  avatar?: MediaAssetProps;
  media?: MediaAssetProps;
  showSenderName?: boolean;
  showTail?: boolean;
  reserveAvatarSpace?: boolean;
}
