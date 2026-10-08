import { resolveAssetUrl } from '@/utils/resolve-asset-url';
import type { ChatMessageProps } from './props';
import S from './styles.module.scss';

export const ChatMessage = ({
  message,
  avatar,
  showSenderName = false,
}: ChatMessageProps) => {
  return (
    <div
      className={`${S.message} ${S[message.direction]} lt-chat-message lt-chat-message--${message.direction}`}
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
        <p className={`${S.bubble} lt-chat-message__bubble`}>{message.text}</p>
      </div>
    </div>
  );
};
