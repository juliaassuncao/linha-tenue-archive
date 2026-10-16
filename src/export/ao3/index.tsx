import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Intro } from '@/templates/intro';
import type { Ao3ChapterCompositionProps, Ao3TargetProps } from './types';

export const renderAo3Chapter = ({
  update,
  includeIntro,
  showTestNotice = false,
}: Ao3ChapterCompositionProps) => createElement(
  Fragment,
  null,
  includeIntro ? createElement(Intro, { showTestNotice }) : null,
  createElement(update),
);

export const renderAo3Target = (target: Ao3TargetProps, showTestNotice = false): string =>
  renderToStaticMarkup(
    target.type === 'intro'
      ? createElement(target.render, { showTestNotice })
      : renderAo3Chapter({ ...target, showTestNotice }),
  );
