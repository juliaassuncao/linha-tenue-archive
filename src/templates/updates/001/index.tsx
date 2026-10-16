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
          key={block.id}
          post={Update001C.posts[block.postId]}
          posts={Update001C.posts}
          identities={SocialIdentitiesC}
          media={Update001C.media}
        />
      );
    }

    if (block.type === 'narrative') {
      return (
        <article key={block.id} className={`${S.narrative} lt-update__narrative`}>
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
          key={block.id}
          content={Update001C.chats[block.chatId]}
          media={Update001C.media}
        />
      );
    }

    return (
      <div key={block.id} className={`${S.timeJump} lt-update__time-jump`}>
        {block.text}
      </div>
    );
  };

  return (
    <section className={`${S.update} lt-update`}>
      <h2 className={`${S.title} lt-update__title`}>
        {Update001C.header.title}
      </h2>
      <div className={`${S.blocks} lt-update__blocks`}>
        {Update001C.blocks.map(renderBlock)}
      </div>
    </section>
  );
};
