import { resolveAssetUrl } from '@/utils/resolve-asset-url';
import { SocialPostC } from './constants';
import type { SocialPostProps } from './props';
import S from './styles.module.scss';

export const SocialPost = ({
  post,
  identities,
  media,
  isReply = false,
}: SocialPostProps) => {
  if (post.quotedPostId) {
    throw new Error(`SocialPost ${post.id}: quoted posts are not supported yet.`);
  }

  const author = identities[post.authorId];

  if (!author) {
    throw new Error(`SocialPost ${post.id}: unknown author ${post.authorId}.`);
  }

  const avatar = media[author.avatarMediaId];

  if (!avatar) {
    throw new Error(
      `SocialPost ${post.id}: unknown avatar ${author.avatarMediaId}.`,
    );
  }

  const postMedia = (post.mediaIds ?? []).map((id) => {
    const asset = media[id];

    if (!asset) {
      throw new Error(`SocialPost ${post.id}: unknown media ${id}.`);
    }

    return asset;
  });
  const metrics = SocialPostC.metrics.filter(
    ({ key }) => post.metrics?.[key] !== undefined,
  );

  return (
    <article
      className={`${S.post} lt-social-post${isReply ? ` ${S.reply} lt-social-post__reply` : ''}`}
    >
      <div className={`${S.header} lt-social-post__header`}>
        <div className={`${S.avatar} lt-social-post__avatar`}>
          <img
            className={`${S.avatarImage} lt-social-post__avatar-image`}
            src={resolveAssetUrl(avatar.relativePath)}
            alt=""
          />
        </div>
        <div className={`${S.identity} lt-social-post__identity`}>
          <p className={`${S.author} lt-social-post__author`}>
            <strong>{author.displayName}</strong>
            {author.verification === 'blue' && (
              <span className={`${S.badge} lt-social-post__badge`}>
                <img
                  className={`${S.badgeImage} lt-social-post__badge-image`}
                  src={resolveAssetUrl(SocialPostC.icons.verified)}
                  alt={SocialPostC.labels.verified}
                />
              </span>
            )}
            {author.verification === 'gold' && (
              <span className={`${S.goldBadge} lt-social-post__gold-badge`}>
                {SocialPostC.labels.verifiedGold}
              </span>
            )}
            {author.isPrivate && (
              <span className={`${S.badge} lt-social-post__badge`}>
                <img
                  className={`${S.badgeImage} lt-social-post__badge-image`}
                  src={resolveAssetUrl(SocialPostC.icons.private)}
                  alt={SocialPostC.labels.private}
                />
              </span>
            )}
          </p>
          <p className={`${S.username} lt-social-post__username`}>
            {author.username}
          </p>
        </div>
      </div>

      {post.replyingTo && (
        <p className={`${S.replyingTo} lt-social-post__replying-to`}>
          {SocialPostC.labels.replyingTo}{' '}
          <span className={`${S.replyTarget} lt-social-post__reply-target`}>
            {post.replyingTo.username}
          </span>
        </p>
      )}

      <p className={`${S.body} lt-social-post__body`}>{post.text}</p>

      {postMedia.length > 0 && (
        <div className={`${S.media} lt-social-post__media`}>
          {postMedia.map((asset) => (
            <figure
              key={asset.id}
              className={`${S.mediaItem} lt-social-post__media-item`}
            >
              <img
                className={`${S.mediaImage} lt-social-post__media-image`}
                src={resolveAssetUrl(asset.relativePath)}
                alt={asset.alt}
              />
            </figure>
          ))}
        </div>
      )}

      {post.timestamp && (
        <p className={`${S.timestamp} lt-social-post__timestamp`}>
          {post.timestamp}
        </p>
      )}

      {metrics.length > 0 && (
        <div className={`${S.metrics} lt-social-post__metrics`}>
          {metrics.map(({ key, label }) => (
            <p key={key} className={`${S.metric} lt-social-post__metric`}>
              <strong className={`${S.metricValue} lt-social-post__metric-value`}>
                {post.metrics?.[key]}
              </strong>{' '}
              {label}
            </p>
          ))}
        </div>
      )}

      {post.replies && post.replies.length > 0 && (
        <div className={`${S.replies} lt-social-post__replies`}>
          {post.replies.map((reply) => (
            <SocialPost
              key={reply.id}
              post={reply}
              identities={identities}
              media={media}
              isReply
            />
          ))}
        </div>
      )}
    </article>
  );
};
