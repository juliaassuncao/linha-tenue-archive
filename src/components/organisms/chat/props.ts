import type {
  ChatContentProps,
  MediaAssetProps,
} from '@/constants/props';

export interface ChatProps {
  content: ChatContentProps;
  media: Record<string, MediaAssetProps>;
}