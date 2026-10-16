import { LorenaC } from '@/constants/characters/lorena/constants';
import { EduardaC } from '@/constants/characters/eduarda/constants';
import type { CharacterContentProps } from '@/constants/characters/props';
import type { MediaAssetProps } from '@/constants/props';
import type { ArchiveInfoItemProps, IntroBlockProps } from './props';

export const ArchiveInfoC = [
  {
    id: 'credits',
    label: 'Créditos',
    text: <>Linha Tênue é uma AU escrita por Leth Medveguillen —</>,
    link: {
      label: '@medveguillen',
      href: 'https://x.com/medveguillen',
    },
  },
  {
    id: 'about',
    label: 'Sobre esta versão',
    text: (
      <>
        Esta adaptação foi pensada para leitura em telas digitais, versões baixadas para Kindle ou outros e-readers podem não preservar a formatação original.
      </>
    ),
  },
  {
    id: 'test-notice',
    label: 'Teste da adaptação',
    text: (
      <>
        Esta primeira atualização está publicada temporariamente na minha conta
        para testar responsividade e leitura em diferentes dispositivos. Se algo
        quebrar ou ficar estranho, o feedback é muito bem-vindo. Quando a Leth
        quiser, a ideia é migrar a adaptação para a conta dela.
      </>
    ),
    testOnly: true,
  },
  {
    id: 'for-leth',
    label: 'Pra Leth ♡',
    text: (
      <>
        <em>Linha Tênue</em> foi a primeira AU que eu li e acabou sendo minha
        porta de entrada para o fandom e para esse universo de fanfics que eu
        acompanho até hoje. Por isso, mesmo depois de tantas outras histórias,
        tenho um carinho especial por ela — e achei muito legal que justamente
        ela tenha virado meu primeiro projeto de adaptação e arquivo.
      </>
    ),
  },
] satisfies ArchiveInfoItemProps[];

export const SynopsisC = {
  title: 'linha tênue | au loquinha',
  text: (
    <>
      Uma atriz e uma modelo que não se suportam, Eduarda e Lorena assinam um
      contrato de namoro falso para preservar a imagem de ambas. Só esquecem que
      o ódio e o amor andam lado a lado.
    </>
  ),
  media: {
    lorena: {
      id: 'synopsis-lorena',
      relativePath: 'intro/synopsis/lorena.webp',
      alt: 'Retrato de Lorena, de cabelos escuros, com a mão junto ao rosto.',
      source: ['archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG'],
    },
    contract: {
      id: 'synopsis-contract',
      relativePath: 'intro/synopsis/contract.webp',
      alt: 'Mão assinando um documento com uma caneta-tinteiro.',
      source: ['archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG'],
    },
    fakeKiss: {
      id: 'synopsis-fake-kiss',
      relativePath: 'intro/synopsis/fake-kiss.webp',
      alt: 'Duas mulheres se beijando, com a palavra FAKE sobreposta em vermelho.',
      source: ['archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG'],
    },
    eduarda: {
      id: 'synopsis-eduarda',
      relativePath: 'intro/synopsis/eduarda.webp',
      alt: 'Retrato de Eduarda, ruiva e de óculos escuros, olhando por cima do ombro.',
      source: ['archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG'],
    },
  } satisfies Record<string, MediaAssetProps>,
};

export const CharacterSectionsC = [
  {
    id: LorenaC.character.id,
    title: 'Infos da Lorena',
    data: LorenaC,
  },
  {
    id: EduardaC.character.id,
    title: 'Infos da Eduarda',
    data: EduardaC,
  },
] satisfies {
  id: string;
  title: string;
  data: CharacterContentProps;
}[];

export const IntroC = {
  header: {
    title: 'Linha Tênue',
    subtitle: 'au loquinha | archive edition',
  },
  contentLabels: {
    publicProfile: 'perfil aberto',
    privateProfile: 'rant',
    squad: 'squad',
    wallpaper: 'wallpaper',
  },
  blocks: [
    {
      id: 'synopsis',
      type: 'synopsis',
      title: SynopsisC.title,
      text: SynopsisC.text,
      mediaIds: [
        SynopsisC.media.lorena.id,
        SynopsisC.media.contract.id,
        SynopsisC.media.fakeKiss.id,
        SynopsisC.media.eduarda.id,
      ],
      source: ['archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG'],
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
  ] satisfies IntroBlockProps[],
};
