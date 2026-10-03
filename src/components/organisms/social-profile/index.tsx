import { Fragment } from 'react';
import { SocialProfileC } from './constants';
import S from './styles.module.scss';
import type { SocialProfileProps } from './props';

export const SocialProfile = ({
  account,
  avatar,
  banner,
}: SocialProfileProps) => {
  const avatarSrc = `/assets/${avatar.relativePath}`;
  const bannerSrc = `/assets/${banner.relativePath}`;

  return (
    <article className={S.profile}>
      <div className={S.cover}>
        <img src={bannerSrc} alt={banner.alt} />
        <span className={S.back} aria-hidden="true">
          <img src={SocialProfileC.icons.back} alt="" />
        </span>
      </div>

      <div className={S.main}>
        <div className={S.actions}>
          <div className={S.avatar}>
            <img src={avatarSrc} alt={avatar.alt} />
          </div>
          <span className={S.editProfile}>
            {SocialProfileC.labels.editProfile}
          </span>
        </div>

        <div className={S.info}>
          <h3 className={S.name}>
            {account.displayName}
            {account.verified && (
              <span className={S.verified}>
                <img
                  src={SocialProfileC.icons.verified}
                  alt={SocialProfileC.labels.verified}
                />
              </span>
            )}
            {account.kind === 'private' && (
              <span
                className={S.private}
                aria-label={SocialProfileC.labels.private}
              >
                <img
                  src={SocialProfileC.icons.private}
                  alt={SocialProfileC.labels.private}
                />
              </span>
            )}
          </h3>
          <p className={S.handle}>{account.username}</p>
          <p className={S.bio}>
            {account.bio
              .split(SocialProfileC.symbols.clapperboard)
              .map((text, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <img
                      className={S.bioIcon}
                      src={SocialProfileC.icons.clapperboard}
                      alt={SocialProfileC.labels.clapperboard}
                    />
                  )}
                  {text}
                </Fragment>
              ))}
          </p>
          {(account.location || account.websiteLabel) && (
            <div className={S.meta}>
              {account.location && (
                <span className={S.metaItem}>
                  <img src={SocialProfileC.icons.location} alt="" />
                  {account.location}
                </span>
              )}
              {account.websiteLabel && (
                <span className={S.website}>{account.websiteLabel}</span>
              )}
            </div>
          )}

          <div className={S.stats}>
            <span className={S.stat}>
              <strong>{account.following}</strong>{' '}
              {SocialProfileC.labels.following}
            </span>
            <span className={S.stat}>
              <strong>{account.followers}</strong>{' '}
              {SocialProfileC.labels.followers}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
