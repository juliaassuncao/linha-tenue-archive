import { resolveAssetUrl } from '@/utils/resolve-asset-url';
import type { ChatMessageProps } from './props';
import S from './styles.module.scss';

export const ChatMessage = ({
  message,
  avatar,
  media,
  showSenderName = false,
  showTail = true,
}: ChatMessageProps) => {
  return (
    <div
      className={`${S.message} ${S[message.direction]} ${showTail ? S.withTail : ''} lt-chat-message lt-chat-message--${message.direction}${showTail ? ' lt-chat-message--with-tail' : ''}`}
    >
      {avatar && (
        <img
          className={`${S.avatar} lt-chat-message__avatar`}
          src={resolveAssetUrl(avatar.relativePath)}
          alt={avatar.alt}
        />
      )}
      <div className={`${S.content} lt-chat-message__content`}>
        {showSenderName && message.senderName && (
          <p className={`${S.senderName} lt-chat-message__sender`}>
            {message.senderName}
          </p>
        )}
        {message.text && (
          <p className={`${S.bubble} lt-chat-message__bubble`}>
            {message.text}
          </p>
        )}
        {media && (
          <figure className={`${S.media} lt-chat-message__media`}>
            <img
              className={`${S.mediaImage} lt-chat-message__media-image`}
              src={resolveAssetUrl(media.relativePath)}
              alt={media.alt}
            />
          </figure>
        )}
      </div>
    </div>
  );
};
