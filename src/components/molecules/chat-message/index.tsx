import type { ChatMessageProps } from './props';
import S from './styles.module.scss';

export const ChatMessage = ({
  message,
  avatar,
  showSenderName = false,
}: ChatMessageProps) => {
  return (
    <div className={`${S.message} ${S[message.direction]}`}>
      {avatar && (
        <img
          className={S.avatar}
          src={`/assets/${avatar.relativePath}`}
          alt={avatar.alt}
        />
      )}
      <div className={S.content}>
        {showSenderName && message.senderName && (
          <p className={S.senderName}>{message.senderName}</p>
        )}
        <p className={S.bubble}>{message.text}</p>
      </div>
    </div>
  );
};
