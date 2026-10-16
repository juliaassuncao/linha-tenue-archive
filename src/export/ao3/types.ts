import type { ComponentType } from 'react';
import type { IntroProps } from '@/templates/intro/props';

export interface Ao3ChapterCompositionProps extends IntroProps {
  update: ComponentType;
  includeIntro: boolean;
}

export interface Ao3IntroTargetProps {
  id: 'intro';
  type: 'intro';
  filename: 'intro.html';
  previewFilename: 'intro-preview.html';
  render: ComponentType<IntroProps>;
}

export interface Ao3ChapterTargetProps extends Ao3ChapterCompositionProps {
  id: string;
  type: 'chapter';
  chapterNumber: number;
  updateId: string;
  filename: string;
  previewFilename?: string;
}

export type Ao3TargetProps = Ao3IntroTargetProps | Ao3ChapterTargetProps;
