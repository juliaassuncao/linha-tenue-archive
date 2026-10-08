import type { CharacterContentProps } from '@/constants/props';

export const EduardaC = {
  character: {
    id: 'eduarda',
    name: 'Eduarda Fragoso',
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/008. Info Eduarda.JPG',
    ],
  },
  accounts: {
    public: {
      id: 'eduarda-public',
      characterId: 'eduarda',
      kind: 'public',
      displayName: 'Eduarda Fragoso',
      username: '@eduarda',
      bio: 'Atriz 🎬',
      location: 'São Paulo',
      websiteLabel: '🔗 eduardafragoso.com',
      verified: true,
      following: '100',
      followers: '83.9K',
      avatarMediaId: 'eduarda-public-avatar',
      bannerMediaId: 'eduarda-public-banner',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/008. Info Eduarda.JPG',
      ],
    },
    private: {
      id: 'eduarda-private',
      characterId: 'eduarda',
      kind: 'private',
      displayName: 'duda',
      username: '@imnotduda',
      bio: 'tribunal de minúsculas causas',
      verified: false,
      following: '10',
      followers: '12',
      avatarMediaId: 'eduarda-private-avatar',
      bannerMediaId: 'eduarda-private-banner',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/009. Info Eduarda.JPG',
      ],
    },
  },
  squad: {
    id: 'eduarda-squad',
    title: 'quase sempre amigos',
    kind: 'group',
    headerAvatarMediaIds: [
      'eduarda-squad-gerluce-avatar',
      'eduarda-squad-paulinho-avatar',
      'eduarda-squad-isabela-avatar',
      'eduarda-squad-eduarda-avatar',
    ],
    messages: [
      {
        id: 'eduarda',
        text: 'eduarda',
        direction: 'outgoing',
      },
      {
        id: 'paulinho',
        senderName: 'paulinho assessoria',
        text: 'paulinho',
        avatarMediaId: 'eduarda-squad-paulinho-avatar',
        direction: 'incoming',
      },
      {
        id: 'isabela',
        senderName: 'isa alencar',
        text: 'isabela',
        avatarMediaId: 'eduarda-squad-isabela-avatar',
        direction: 'incoming',
      },
      {
        id: 'gerluce',
        senderName: 'gerluce cunhada',
        text: 'gerluce',
        avatarMediaId: 'eduarda-squad-gerluce-avatar',
        direction: 'incoming',
      },
    ],
    backgroundMediaId: 'eduarda-wallpaper',
    source: [
      'archive/Info Linha Tênue - Leth Medveguillen/010. Info Eduarda.JPG',
    ],
  },
  media: {
    publicAvatar: {
      id: 'eduarda-public-avatar',
      relativePath: 'intro/eduarda/public/avatar.webp',
      alt: 'Retrato de uma mulher ruiva com roupa preta e a mão sobre a cabeça.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/008. Info Eduarda.JPG',
      ],
    },
    publicBanner: {
      id: 'eduarda-public-banner',
      relativePath: 'intro/eduarda/public/banner.webp',
      alt: 'Fotografia de uma mulher ruiva com roupa preta e colares, enquadrada parcialmente no rosto e no tronco.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/008. Info Eduarda.JPG',
      ],
    },
    privateAvatar: {
      id: 'eduarda-private-avatar',
      relativePath: 'intro/eduarda/private/avatar.webp',
      alt: 'Fotografia de uma mulher ruiva com um recipiente grande de pipoca próximo ao rosto.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/009. Info Eduarda.JPG',
      ],
    },
    privateBanner: {
      id: 'eduarda-private-banner',
      relativePath: 'intro/eduarda/private/banner.webp',
      alt: 'Capa clara com lettering preto parcialmente cortado, mostrando CUPATION: ACTRESS.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/009. Info Eduarda.JPG',
      ],
    },
    squadPaulinhoAvatar: {
      id: 'eduarda-squad-paulinho-avatar',
      relativePath: 'intro/eduarda/squad/paulinho.webp',
      alt: 'Retrato de um homem de cabelos escuros e barba sorrindo.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/010. Info Eduarda.JPG',
      ],
    },
    squadIsabelaAvatar: {
      id: 'eduarda-squad-isabela-avatar',
      relativePath: 'intro/eduarda/squad/isabela.webp',
      alt: 'Retrato de uma mulher de cabelos escuros com o rosto apoiado na mão.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/010. Info Eduarda.JPG',
      ],
    },
    squadGerluceAvatar: {
      id: 'eduarda-squad-gerluce-avatar',
      relativePath: 'intro/eduarda/squad/gerluce.webp',
      alt: 'Retrato de uma mulher com a cabeça apoiada no braço, vestindo uma camisa clara.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/010. Info Eduarda.JPG',
      ],
    },
    squadEduardaAvatar: {
      id: 'eduarda-squad-eduarda-avatar',
      relativePath: 'intro/eduarda/squad/eduarda.webp',
      alt: 'Retrato de uma mulher ruiva com roupa clara, olhando por cima do ombro diante de folhagens.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/010. Info Eduarda.JPG',
      ],
    },
    wallpaper: {
      id: 'eduarda-wallpaper',
      relativePath: 'intro/eduarda/wallpaper.webp',
      alt: 'Fotografia vertical de cortinas e janela iluminadas por luz alaranjada, com parte de um móvel e almofadas no canto inferior esquerdo.',
      source: [
        'archive/Info Linha Tênue - Leth Medveguillen/011. Info Eduarda.JPG',
      ],
    },
  },
} satisfies CharacterContentProps;
