import { ArchiveInfoC } from '../constants';
import type { IntroProps } from '../props';
import S from './styles.module.scss';

export const ArchiveInfo = ({ showTestNotice = false }: IntroProps) => (
  <section className={`${S.section} lt-archive-info`}>
    {ArchiveInfoC.filter((item) => !item.testOnly || showTestNotice).map((item) => (
      <div key={item.id} className={`${S.item} lt-archive-info__item`}>
        <h2 className={`${S.label} lt-archive-info__label`}>{item.label}</h2>
        <p className={`${S.text} lt-archive-info__text`}>
          {item.text}
          {item.link && (
            <>
              {' '}
              <a className={`${S.link} lt-archive-info__link`} href={item.link.href}>
                {item.link.label}
              </a>
              .
            </>
          )}
        </p>
      </div>
    ))}
  </section>
);
