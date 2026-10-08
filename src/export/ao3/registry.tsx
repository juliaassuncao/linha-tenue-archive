import { Intro } from '@/templates/intro';
import type { Ao3TargetProps } from './types';

export const Ao3Registry: readonly Ao3TargetProps[] = [
  {
    id: 'intro',
    type: 'intro',
    filename: 'intro.html',
    previewFilename: 'intro-preview.html',
    render: Intro,
  },
];
