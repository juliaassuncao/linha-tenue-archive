import { ChatMessage } from '@/components/molecules/chat-message';
import type { MediaAssetProps } from '@/constants/props';
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
    <article className={S.chat} aria-label={content.title}>
      <header className={S.header}>
        <img src={ChatC.icons.back} alt="" />
        <div className={S.titleContainer}>
          <div className={S.avatarsContainer}>
            {headerAvatars.map((avatar, index) => (
              <span
                key={avatar.id}
                className={S.headerAvatar}
                style={{ zIndex: headerAvatars.length - index }}
              >
                <img
                  src={`${ChatC.assetBasePath}${avatar.relativePath}`}
                  alt={avatar.alt}
                />
              </span>
            ))}
          </div>
          <h3 className={S.title}>{content.title}</h3>
        </div>
        <img src={ChatC.icons.info} alt="" />
      </header>
      <div
        className={S.messages}
        role="region"
        aria-label={content.title}
        style={
          background
            ? {
                backgroundImage: `url('${ChatC.assetBasePath}${background.relativePath}')`,
              }
            : undefined
        }
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
    </article>
  );
};
