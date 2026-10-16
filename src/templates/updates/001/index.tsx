import { Chat } from '@/components/organisms/chat';
import { SocialPost } from '@/components/organisms/social-post';
import { SocialIdentitiesC } from '@/constants/social-identities/constants';
import { Update001C } from './constants.tsx';
import type { Update001BlockProps } from './props';
import S from './styles.module.scss';

export const Update001 = () => {
  const renderBlock = (block: Update001BlockProps) => {
    if (block.type === 'social-post') {
      return (
        <SocialPost
          post={Update001C.posts[block.postId]}
          posts={Update001C.posts}
          identities={SocialIdentitiesC}
          media={Update001C.media}
        />
      );
    }

    if (block.type === 'narrative') {
      return (
        <article className={`${S.narrative} lt-update__narrative`}>
          <p className={`${S.narrativeLabel} lt-update__narrative-label`}>
            <strong>
              <em>{block.label}</em>
            </strong>
          </p>
          <p className={`${S.narrativeText} lt-update__narrative-text`}>
            {block.text}
          </p>
        </article>
      );
    }

    if (block.type === 'chat') {
      return (
        <Chat
          content={Update001C.chats[block.chatId]}
          media={Update001C.media}
        />
      );
    }

    return (
      <div className={`${S.timeJump} lt-update__time-jump`}>
        <div className={`${S.timeJumpLabel} lt-update__time-jump-label`}>
          {block.text}
        </div>
      </div>
    );
  };

  return (
    <section className={`${S.update} lt-update`}>
      <header className={`${S.header} lt-update__header`}>
        <h2 className={`${S.title} lt-update__title`}>
          {Update001C.header.title}
        </h2>
        <span
          className={`${S.divider} lt-update__divider`}
          aria-hidden="true"
        />
      </header>
      <div className={`${S.blocks} lt-update__blocks`}>
        {Update001C.blocks.map((block) => (
          <div key={block.id} className={`${S.block} lt-update__block`}>
            {renderBlock(block)}
          </div>
        ))}
      </div>
    </section>
  );
};
