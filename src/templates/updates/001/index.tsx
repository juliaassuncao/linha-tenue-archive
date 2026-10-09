import { SocialPost } from '@/components/organisms/social-post';
import { SocialIdentitiesC } from '@/constants/social-identities/constants';
import { Update001C } from './constants';
import type { Update001BlockProps } from './props';
import S from './styles.module.scss';

export const Update001 = () => {
  const renderBlock = (block: Update001BlockProps) => {
    if (block.type !== 'social-post') {
      throw new Error(`Formato ainda não implementado: ${block.type}.`);
    }

    return (
      <SocialPost
        key={block.id}
        post={Update001C.posts[block.postId]}
        identities={SocialIdentitiesC}
        media={Update001C.media}
      />
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
