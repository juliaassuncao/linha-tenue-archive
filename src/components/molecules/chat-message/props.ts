import type {
  ChatMessageProps as ChatMessageData,
  MediaAssetProps,
} from '@/constants/props';

export interface ChatMessageProps {
  message: ChatMessageData;
  avatar?: MediaAssetProps;
  showSenderName?: boolean;
}
