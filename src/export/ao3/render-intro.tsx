import { renderToStaticMarkup } from 'react-dom/server';
import { Intro } from '@/templates/intro';

export const renderIntro = (): string => renderToStaticMarkup(<Intro />);
