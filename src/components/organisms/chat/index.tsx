import { ChatMessage } from '@/components/molecules/chat-message';
import type { MediaAssetProps } from '@/constants/props';
import { resolveAssetUrl } from '@/utils/resolve-asset-url';
import { ChatC } from './constants';
import type { ChatProps } from './props';
import S from './styles.module.scss';

export const Chat = ({ content, media }: ChatProps) => {
  const mediaById: Record<string, MediaAssetProps> = Object.fromEntries(
    Object.values(media).map((asset) => [asset.id, asset]),
  );
  const background = content.backgroundMediaId
    ? mediaById[content.backgroundMediaId]
    : undefined;
  const headerAvatars = (content.headerAvatarMediaIds ?? [])
    .map((mediaId) => mediaById[mediaId])
    .filter((asset): asset is MediaAssetProps => Boolean(asset));

  return (
    <article className={`${S.chat} lt-chat`} aria-label={content.title}>
      <header className={`${S.header} lt-chat__header`}>
        <img
          className="lt-chat__icon"
          src={resolveAssetUrl(ChatC.icons.back)}
          alt=""
        />
        <div className={`${S.titleContainer} lt-chat__title-container`}>
          <div className={`${S.avatarsContainer} lt-chat__header-avatars`}>
            {headerAvatars.toReversed().map((avatar) => (
              <span
                key={avatar.id}
                className={`${S.headerAvatar} lt-chat__header-avatar`}
              >
                <img
                  className="lt-chat__header-avatar-image"
                  src={resolveAssetUrl(avatar.relativePath)}
                  alt={avatar.alt}
                />
              </span>
            ))}
          </div>
          <h3 className={`${S.title} lt-chat__title`}>{content.title}</h3>
        </div>
        <img
          className="lt-chat__icon"
          src={resolveAssetUrl(ChatC.icons.info)}
          alt=""
        />
      </header>
      <div className={`${S.messagesArea} lt-chat__messages-area`}>
        {background && (
          <img
            className={`${S.background} lt-chat__background`}
            src={resolveAssetUrl(background.relativePath)}
            alt=""
          />
        )}
        <div
          className={`${S.messages} lt-chat__messages`}
          role="region"
          aria-label={content.title}
        >
          {content.messages.map((message) => {
            const avatar = message.avatarMediaId
              ? mediaById[message.avatarMediaId]
              : undefined;

            return (
              <ChatMessage
                key={message.id}
                message={message}
                avatar={avatar}
                showSenderName={
                  content.kind === 'group' && message.direction === 'incoming'
                }
              />
            );
          })}
        </div>
      </div>
    </article>
  );
};
