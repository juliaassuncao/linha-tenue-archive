import type { ReactNode } from 'react';

export type IntroBlockProps =
  | {
      id: string;
      type: 'synopsis';
      title: string;
      text: ReactNode;
      mediaIds: string[];
      source: string[];
    }
  | {
      id: string;
      type: 'character-opening';
      characterId: string;
      text: string;
      source: string[];
    }
  | {
      id: string;
      type: 'profile';
      accountId: string;
      source: string[];
    }
  | {
      id: string;
      type: 'squad';
      squadId: string;
      source: string[];
    }
  | {
      id: string;
      type: 'wallpaper';
      characterId: string;
      mediaId: string;
      source: string[];
    };
