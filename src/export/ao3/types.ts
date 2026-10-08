import type { ComponentType } from 'react';

export interface Ao3ChapterCompositionProps {
  update: ComponentType;
  includeIntro: boolean;
}

export interface Ao3IntroTargetProps {
  id: 'intro';
  type: 'intro';
  filename: 'intro.html';
  previewFilename: 'intro-preview.html';
  render: ComponentType;
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
