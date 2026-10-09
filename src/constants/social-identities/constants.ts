import { LorenaC } from '@/constants/characters/lorena/constants';
import { EduardaC } from '@/constants/characters/eduarda/constants';
import type { SocialIdentityProps } from '@/constants/props';

export const SocialIdentitiesC = {
  [LorenaC.accounts.public.id]: {
    id: LorenaC.accounts.public.id,
    displayName: LorenaC.accounts.public.displayName,
    username: LorenaC.accounts.public.username,
    avatarMediaId: LorenaC.accounts.public.avatarMediaId,
    verification: LorenaC.accounts.public.verified ? 'blue' : undefined,
  },
  [LorenaC.accounts.private.id]: {
    id: LorenaC.accounts.private.id,
    displayName: LorenaC.accounts.private.displayName,
    username: LorenaC.accounts.private.username,
    avatarMediaId: LorenaC.accounts.private.avatarMediaId,
    isPrivate: LorenaC.accounts.private.kind === 'private',
  },
  [EduardaC.accounts.public.id]: {
    id: EduardaC.accounts.public.id,
    displayName: EduardaC.accounts.public.displayName,
    username: EduardaC.accounts.public.username,
    avatarMediaId: EduardaC.accounts.public.avatarMediaId,
    verification: EduardaC.accounts.public.verified ? 'blue' : undefined,
  },
  [EduardaC.accounts.private.id]: {
    id: EduardaC.accounts.private.id,
    displayName: EduardaC.accounts.private.displayName,
    username: EduardaC.accounts.private.username,
    avatarMediaId: EduardaC.accounts.private.avatarMediaId,
    isPrivate: EduardaC.accounts.private.kind === 'private',
  },
  'the-news': {
    id: 'the-news',
    displayName: 'THE NEWS',
    username: '@thenews',
    avatarMediaId: 'the-news-avatar',
    verification: 'blue',
  },
  bebel: {
    id: 'bebel',
    displayName: 'bebel',
    username: '@juqslore',
    avatarMediaId: 'bebel-avatar',
  },
  jules: {
    id: 'jules',
    displayName: 'jules',
    username: '@sourzini',
    avatarMediaId: 'jules-avatar',
  },
  lottie: {
    id: 'lottie',
    displayName: 'lottie',
    username: '@jbuckleyoc',
    avatarMediaId: 'lottie-avatar',
  },
  'juridico-lorena-ferette': {
    id: 'juridico-lorena-ferette',
    displayName: 'jurídico lorena ferette',
    username: '@ringsmyoui',
    avatarMediaId: 'juridico-lorena-ferette-avatar',
  },
  'leleo-private': {
    id: 'leleo-private',
    displayName: 'leléo',
    username: '@leorette',
    avatarMediaId: 'leleo-avatar',
    isPrivate: true,
  },
  'paulinho-private': {
    id: 'paulinho-private',
    displayName: 'paulinho',
    username: '@otaldopaulinho',
    avatarMediaId: 'paulinho-social-avatar',
    isPrivate: true,
  },
  'gerlu-private': {
    id: 'gerlu-private',
    displayName: 'gerlu',
    username: '@gerlucando',
    avatarMediaId: 'gerlu-social-avatar',
    isPrivate: true,
  },
} satisfies Record<string, SocialIdentityProps>;
