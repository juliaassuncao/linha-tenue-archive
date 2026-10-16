import { Intro } from '@/templates/intro';
import type { Ao3TargetProps } from './types';
import { Update001 } from '@/templates/updates/001';

export const Ao3Registry: readonly Ao3TargetProps[] = [
  {
    id: 'intro',
    type: 'intro',
    filename: 'intro.html',
    previewFilename: 'intro-preview.html',
    render: Intro,
  },
  {
    id: '001',
    type: 'chapter',
    chapterNumber: 1,
    updateId: '001',
    includeIntro: true,
    update: Update001,
    filename: 'chapters/001.html',
    previewFilename: 'chapters/001-preview.html',
  },
];
