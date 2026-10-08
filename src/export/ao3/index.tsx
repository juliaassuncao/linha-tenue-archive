import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Intro } from '@/templates/intro';
import type { Ao3ChapterCompositionProps, Ao3TargetProps } from './types';

export const renderAo3Chapter = ({
  update,
  includeIntro,
}: Ao3ChapterCompositionProps) => createElement(
  Fragment,
  null,
  includeIntro ? createElement(Intro) : null,
  createElement(update),
);

export const renderAo3Target = (target: Ao3TargetProps): string =>
  renderToStaticMarkup(
    target.type === 'intro'
      ? createElement(target.render)
      : renderAo3Chapter(target),
  );
