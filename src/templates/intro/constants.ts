import { LorenaC } from '@/constants/characters/lorena/constants';
import { EduardaC } from '@/constants/characters/eduarda/constants';
import type { MediaAssetProps } from '@/constants/props';
import type { IntroBlockProps } from './props';

export const SynopsisC = {
  title: 'linha tênue | au loquinha',
  text: 'Uma atriz e uma modelo que não se suportam, Eduarda e Lorena assinam um contrato de namoro falso para preservar a imagem de ambas. Só esquecem que o ódio e o amor andam lado a lado.',
  media: {
    id: 'synopsis-montage',
    relativePath: 'intro/synopsis/montage.webp',
    alt: 'Montagem de quatro imagens: uma mulher de cabelos escuros, uma mão assinando um documento, duas mulheres se beijando com a palavra FAKE sobreposta e uma mulher ruiva de óculos escuros.',
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG',
    ],
  } satisfies MediaAssetProps,
};

export const IntroC: IntroBlockProps[] = [
  {
    id: 'synopsis',
    type: 'synopsis',
    title: SynopsisC.title,
    text: SynopsisC.text,
    mediaId: SynopsisC.media.id,
    source: SynopsisC.media.source,
  },
  {
    id: 'lorena-opening',
    type: 'character-opening',
    characterId: LorenaC.character.id,
    text: 'infos da lorena:\n\nperfil aberto / rant / squad / wallpaper',
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/002. Info Lorena.PNG',
    ],
  },
  {
    id: 'lorena-public-profile',
    type: 'profile',
    accountId: LorenaC.accounts.public.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/003. Info Lorena.JPG',
    ],
  },
  {
    id: 'lorena-private-profile',
    type: 'profile',
    accountId: LorenaC.accounts.private.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/004. Info Lorena.JPG',
    ],
  },
  {
    id: 'lorena-squad',
    type: 'squad',
    squadId: LorenaC.squad.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/005. Info Lorena.JPG',
    ],
  },
  {
    id: 'lorena-wallpaper',
    type: 'wallpaper',
    characterId: LorenaC.character.id,
    mediaId: LorenaC.media.wallpaper.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/006. Info Lorena.JPG',
    ],
  },
  {
    id: 'eduarda-opening',
    type: 'character-opening',
    characterId: EduardaC.character.id,
    text: 'infos da eduarda:\n\nperfil aberto / rant / squad / wallpaper',
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/007. Info Eduarda.PNG',
    ],
  },
  {
    id: 'eduarda-public-profile',
    type: 'profile',
    accountId: EduardaC.accounts.public.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/008. Info Eduarda.JPG',
    ],
  },
  {
    id: 'eduarda-private-profile',
    type: 'profile',
    accountId: EduardaC.accounts.private.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/009. Info Eduarda.JPG',
    ],
  },
  {
    id: 'eduarda-squad',
    type: 'squad',
    squadId: EduardaC.squad.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/010. Info Eduarda.JPG',
    ],
  },
  {
    id: 'eduarda-wallpaper',
    type: 'wallpaper',
    characterId: EduardaC.character.id,
    mediaId: EduardaC.media.wallpaper.id,
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/011. Info Eduarda.JPG',
    ],
  },
];
