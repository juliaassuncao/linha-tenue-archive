import type { ReactNode } from 'react';
import type { MediaAssetProps } from '@/constants/props';

export interface SynopsisProps {
  text: ReactNode;
  media: MediaAssetProps[];
}
