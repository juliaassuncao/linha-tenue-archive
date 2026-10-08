import { Fragment } from 'react';
import { resolveAssetUrl } from '@/utils/resolve-asset-url';
import { SocialProfileC } from './constants';
import S from './styles.module.scss';
import type { SocialProfileProps } from './props';

export const SocialProfile = ({
  account,
  avatar,
  banner,
}: SocialProfileProps) => {
  const avatarSrc = resolveAssetUrl(avatar.relativePath);
  const bannerSrc = resolveAssetUrl(banner.relativePath);

  return (
    <article className={`${S.profile} lt-social-profile`}>
      <div className={`${S.cover} lt-social-profile__cover`}>
        <img
          className="lt-social-profile__banner"
          src={bannerSrc}
          alt={banner.alt}
        />
        <span className={`${S.back} lt-social-profile__back`} aria-hidden="true">
          <img src={resolveAssetUrl(SocialProfileC.icons.back)} alt="" />
        </span>
      </div>

      <div className={`${S.main} lt-social-profile__main`}>
        <div className={`${S.actions} lt-social-profile__actions`}>
          <div className={`${S.avatar} lt-social-profile__avatar`}>
            <img src={avatarSrc} alt={avatar.alt} />
          </div>
          <span className={`${S.editProfile} lt-social-profile__edit`}>
            {SocialProfileC.labels.editProfile}
          </span>
        </div>

        <div className={`${S.info} lt-social-profile__info`}>
          <h3 className={`${S.name} lt-social-profile__name`}>
            {account.displayName}
            {account.verified && (
              <span className={`${S.verified} lt-social-profile__verified`}>
                <img
                  src={resolveAssetUrl(SocialProfileC.icons.verified)}
                  alt={SocialProfileC.labels.verified}
                />
              </span>
            )}
            {account.kind === 'private' && (
              <span
                className={`${S.private} lt-social-profile__private`}
                aria-label={SocialProfileC.labels.private}
              >
                <img
                  src={resolveAssetUrl(SocialProfileC.icons.private)}
                  alt={SocialProfileC.labels.private}
                />
              </span>
            )}
          </h3>
          <p className={`${S.handle} lt-social-profile__handle`}>
            {account.username}
          </p>
          <p className={`${S.bio} lt-social-profile__bio`}>
            {account.bio
              .split(SocialProfileC.symbols.clapperboard)
              .map((text, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <img
                      className={`${S.bioIcon} lt-social-profile__bio-icon`}
                      src={resolveAssetUrl(SocialProfileC.icons.clapperboard)}
                      alt={SocialProfileC.labels.clapperboard}
                    />
                  )}
                  {text}
                </Fragment>
              ))}
          </p>
          {(account.location || account.websiteLabel) && (
            <div className={`${S.meta} lt-social-profile__meta`}>
              {account.location && (
                <span className={`${S.metaItem} lt-social-profile__meta-item`}>
                  <img
                    src={resolveAssetUrl(SocialProfileC.icons.location)}
                    alt=""
                  />
                  {account.location}
                </span>
              )}
              {account.websiteLabel && (
                <span className={`${S.website} lt-social-profile__website`}>
                  {account.websiteLabel}
                </span>
              )}
            </div>
          )}

          <div className={`${S.stats} lt-social-profile__stats`}>
            <span className={`${S.stat} lt-social-profile__stat`}>
              <strong>{account.following}</strong>{' '}
              {SocialProfileC.labels.following}
            </span>
            <span className={`${S.stat} lt-social-profile__stat`}>
              <strong>{account.followers}</strong>{' '}
              {SocialProfileC.labels.followers}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
