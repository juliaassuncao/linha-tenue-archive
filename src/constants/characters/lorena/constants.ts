import type { CharacterContentProps } from '@/constants/props';

export const LorenaC = {
  character: {
    id: 'lorena',
    name: 'Lorena Ferette',
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/003. Info Lorena.JPG',
    ],
  },
  accounts: {
    public: {
      id: 'lorena-public',
      characterId: 'lorena',
      kind: 'public',
      displayName: 'Lorena Ferette',
      username: '@lorena',
      bio: 'Modelo.',
      location: 'São Paulo',
      websiteLabel: '🔗 lorenamodel.com',
      verified: true,
      following: '55',
      followers: '81.7K',
      avatarMediaId: 'lorena-public-avatar',
      bannerMediaId: 'lorena-public-banner',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/003. Info Lorena.JPG',
      ],
    },
    private: {
      id: 'lorena-private',
      characterId: 'lorena',
      kind: 'private',
      displayName: 'lore',
      username: '@saparette',
      bio: 'veganismo e lesbianismo',
      verified: false,
      following: '7',
      followers: '10',
      avatarMediaId: 'lorena-private-avatar',
      bannerMediaId: 'lorena-private-banner',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/004. Info Lorena.JPG',
      ],
    },
  },
  squad: {
    id: 'lorena-squad',
    name: 'melhor squad do mundo',
    characterId: 'lorena',
    participants: [
      {
        id: 'lorena',
        text: 'lorena',
        direction: 'outgoing',
      },
      {
        id: 'leo',
        label: 'léo assessoria (e irmão)',
        text: 'léo',
        avatarMediaId: 'lorena-squad-leo-avatar',
        direction: 'incoming',
      },
      {
        id: 'maggye',
        label: 'maggye best',
        text: 'maggye',
        avatarMediaId: 'lorena-squad-maggye-avatar',
        direction: 'incoming',
      },
      {
        id: 'viviane',
        label: 'vi cunhadinha',
        text: 'viviane',
        avatarMediaId: 'lorena-squad-viviane-avatar',
        direction: 'incoming',
      },
    ],
    backgroundMediaId: 'lorena-squad-background',
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/005. Info Lorena.JPG',
    ],
  },
  media: {
    publicAvatar: {
      id: 'lorena-public-avatar',
      relativePath: 'intro/lorena/public/avatar.webp',
      alt: 'Retrato em preto e branco de uma mulher de cabelos escuros com a mão próxima ao rosto e jaqueta escura.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/003. Info Lorena.JPG',
      ],
    },
    publicBanner: {
      id: 'lorena-public-banner',
      relativePath: 'intro/lorena/public/banner.webp',
      alt: 'Fotografia em preto e branco de uma mulher de cabelos escuros, com enquadramento próximo do rosto.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/003. Info Lorena.JPG',
      ],
    },
    privateAvatar: {
      id: 'lorena-private-avatar',
      relativePath: 'intro/lorena/private/avatar.webp',
      alt: 'Selfie de uma mulher de cabelos escuros, com o rosto próximo à câmera.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/004. Info Lorena.JPG',
      ],
    },
    privateBanner: {
      id: 'lorena-private-banner',
      relativePath: 'intro/lorena/private/banner.webp',
      alt: 'Capa bege com as palavras the PRINCESS diary em lettering preto de estilos variados.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/004. Info Lorena.JPG',
      ],
    },
    squadLeoAvatar: {
      id: 'lorena-squad-leo-avatar',
      relativePath: 'intro/lorena/squad/leo.webp',
      alt: 'Retrato de um homem de terno e gravata segurando um celular diante de um espelho.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/005. Info Lorena.JPG',
      ],
    },
    squadMaggyeAvatar: {
      id: 'lorena-squad-maggye-avatar',
      relativePath: 'intro/lorena/squad/maggye.webp',
      alt: 'Retrato de uma mulher de cabelos escuros longos, fotografada de lado.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/005. Info Lorena.JPG',
      ],
    },
    squadVivianeAvatar: {
      id: 'lorena-squad-viviane-avatar',
      relativePath: 'intro/lorena/squad/viviane.webp',
      alt: 'Retrato de uma mulher de cabelos cacheados sorrindo e segurando um celular.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/005. Info Lorena.JPG',
      ],
    },
    squadBackground: {
      id: 'lorena-squad-background',
      relativePath: 'intro/lorena/squad/background.webp',
      alt: 'Fundo vinho escuro da apresentação do squad.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/005. Info Lorena.JPG',
      ],
    },
    wallpaper: {
      id: 'lorena-wallpaper',
      relativePath: 'intro/lorena/wallpaper.webp',
      alt: 'Wallpaper vinho escuro com a frase And, I will em letras cursivas.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/006. Info Lorena.JPG',
      ],
    },
  },
} satisfies CharacterContentProps;
