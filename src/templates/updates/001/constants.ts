import { LorenaC } from '@/constants/characters/lorena/constants';
import { EduardaC } from '@/constants/characters/eduarda/constants';
import type { Update001ContentProps } from './props';

export const Update001C: Update001ContentProps = {
  header: {
    title: 'Atualização 001',
  },
  blocks: [
    {
      id: 'update-001-block-001',
      type: 'social-post',
      postId: 'update-001-post-001',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/001.JPG',
      ],
    },
    {
      id: 'update-001-block-002-1',
      type: 'social-post',
      postId: 'update-001-post-002-1',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
      ],
    },
    {
      id: 'update-001-block-002-2',
      type: 'social-post',
      postId: 'update-001-post-002-2',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
      ],
    },
    {
      id: 'update-001-block-003-1',
      type: 'social-post',
      postId: 'update-001-post-003-1',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.1.JPG',
      ],
    },
    {
      id: 'update-001-block-003-2',
      type: 'social-post',
      postId: 'update-001-post-003-2',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.2.JPG',
      ],
    },
  ],
  posts: {
    'update-001-post-001': {
      id: 'update-001-post-001',
      authorId: 'the-news',
      text: 'É HOJE!\n\nChegou o dia do maior evento de gala do país, Gala Lumière, que ocorre anualmente no Hotel Elysée.\n\nO evento é conhecido pela extrema sofisticação, pelo prestígio e por reunir celebridades de todos os ramos!\n\nAnsiosos? 👀',
      timestamp: '12:55 PM · 26 Jan 26',
      metrics: {
        views: '30.8K',
        retweets: '125',
        quoteTweets: '188',
        likes: '15K',
      },
      mediaIds: [
        'update-001-gala-hotel',
        'update-001-gala-red-carpet',
      ],
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/001.JPG',
      ],
    },
    'update-001-post-002-1': {
      id: 'update-001-post-002-1',
      authorId: LorenaC.accounts.public.id,
      text: 'Pronta para mais um #GalaLumière ✨',
      timestamp: '12:09 AM · 26 Jan 26',
      metrics: {
        views: '62.5K',
        retweets: '185',
        quoteTweets: '104',
        likes: '59K',
      },
      mediaIds: [
        'update-001-lorena-gala-front',
        'update-001-lorena-gala-side',
      ],
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
      ],
      replies: [
        {
          id: 'update-001-post-002-1-bebel',
          authorId: 'bebel',
          text: 'LINDA MEU AMOR vai ser a estrela da noite como sempre',
          timestamp: '12h',
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-002-1',
            username: '@lorena',
          },
        },
        {
          id: 'update-001-post-002-1-jules',
          authorId: 'jules',
          text: 'me sinto tão honrada por respirar o mesmo ar que você',
          timestamp: '12h',
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-002-1',
            username: '@lorena',
          },
        },
      ],
    },
    'update-001-post-002-2': {
      id: 'update-001-post-002-2',
      authorId: EduardaC.accounts.public.id,
      text: 'Primeira vez no Gala Lumière! 🖤',
      timestamp: '12:06 AM · 26 Jan 26',
      metrics: {
        views: '23.5K',
        retweets: '25',
        quoteTweets: '36',
        likes: '12.9K',
      },
      mediaIds: [
        'update-001-eduarda-gala-standing',
        'update-001-eduarda-gala-seated',
      ],
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
      ],
      replies: [
        {
          id: 'update-001-post-002-2-lottie',
          authorId: 'lottie',
          text: 'a primeira atriz ruiva do mundo',
          timestamp: '12h',
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-002-2',
            username: '@eduarda',
          },
        },
        {
          id: 'update-001-post-002-2-juridico',
          authorId: 'juridico-lorena-ferette',
          text: 'primeira de muitas você é a maioral',
          timestamp: '12h',
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-002-2',
            username: '@eduarda',
          },
        },
      ],
    },
    'update-001-post-003-1': {
      id: 'update-001-post-003-1',
      authorId: LorenaC.accounts.private.id,
      text: 'chegou o evento do ano bbs meu momento de brilhar',
      timestamp: '01:07 AM · 26 Jan 26',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.1.JPG',
      ],
      replies: [
        {
          id: 'update-001-post-003-1-leleo-1',
          authorId: 'leleo-private',
          text: 'não faz nenhuma merda lorena eu te imploro de joelhos',
          timestamp: '12h',
          metrics: {
            replies: '1',
          },
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.1.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-003-1',
            username: '@saparette',
          },
        },
        {
          id: 'update-001-post-003-1-lore',
          authorId: LorenaC.accounts.private.id,
          text: '? se liga eu vou nesse evento todo ano e nunca me meti em UMA polêmica',
          timestamp: '12h',
          metrics: {
            replies: '1',
          },
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.1.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-003-1-leleo-1',
            username: '@leorette',
          },
        },
        {
          id: 'update-001-post-003-1-leleo-2',
          authorId: 'leleo-private',
          text: 'acho bom pq eu já to cheio de b.o seu pra resolver e não preciso de mais um',
          timestamp: '12h',
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.1.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-003-1-lore',
            username: '@saparette',
          },
        },
      ],
    },
    'update-001-post-003-2': {
      id: 'update-001-post-003-2',
      authorId: EduardaC.accounts.private.id,
      text: 'até agora não acredito que fui convidada pro gala lumière que SONHO',
      timestamp: '01:09 AM · 26 Jan 26',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.2.JPG',
      ],
      replies: [
        {
          id: 'update-001-post-003-2-paulinho',
          authorId: 'paulinho-private',
          text: 'lembra do que eu te falei, entrevistas rápidas e objetivas',
          timestamp: '12h',
          metrics: {
            replies: '1',
          },
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.2.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-003-2',
            username: '@imnotduda',
          },
        },
        {
          id: 'update-001-post-003-2-duda',
          authorId: EduardaC.accounts.private.id,
          text: 'pqp tá falando isso DE NOVO me erra',
          timestamp: '12h',
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.2.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-003-2-paulinho',
            username: '@otaldopaulinho',
          },
        },
        {
          id: 'update-001-post-003-2-gerlu',
          authorId: 'gerlu-private',
          text: 'você vai arrasar tanto!!!',
          timestamp: '12h',
          source: [
            'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.2.JPG',
          ],
          replyingTo: {
            postId: 'update-001-post-003-2',
            username: '@imnotduda',
          },
        },
      ],
    },
  },
  media: {
    [LorenaC.media.publicAvatar.id]: LorenaC.media.publicAvatar,
    [LorenaC.media.privateAvatar.id]: LorenaC.media.privateAvatar,
    [EduardaC.media.publicAvatar.id]: EduardaC.media.publicAvatar,
    [EduardaC.media.privateAvatar.id]: EduardaC.media.privateAvatar,
    'update-001-gala-hotel': {
      id: 'update-001-gala-hotel',
      relativePath: 'updates/001/photos/gala-hotel.webp',
      alt: 'Fachada iluminada de um edifício à noite, com o letreiro COPACABANA PALACE.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/001.JPG',
      ],
    },
    'update-001-gala-red-carpet': {
      id: 'update-001-gala-red-carpet',
      relativePath: 'updates/001/photos/gala-red-carpet.webp',
      alt: 'Tapete vermelho diante de um painel azul-escuro com logotipos, com fotógrafos e pessoas ao lado.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/001.JPG',
      ],
    },
    'update-001-lorena-gala-front': {
      id: 'update-001-lorena-gala-front',
      relativePath: 'updates/001/photos/lorena-gala-front.webp',
      alt: 'Mulher de cabelos escuros presos, vista de frente, usando vestido dourado com detalhe azul-claro.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
      ],
    },
    'update-001-lorena-gala-side': {
      id: 'update-001-lorena-gala-side',
      relativePath: 'updates/001/photos/lorena-gala-over-shoulder.webp',
      alt: 'Mulher de cabelos escuros presos olhando sobre o ombro, com vestido dourado e detalhe azul-claro nas costas.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
      ],
    },
    'update-001-eduarda-gala-standing': {
      id: 'update-001-eduarda-gala-standing',
      relativePath: 'updates/001/photos/eduarda-gala-standing.webp',
      alt: 'Mulher ruiva em pé, usando vestido preto, meia-calça e sapatos pretos, com uma mão apoiada na parede.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
      ],
    },
    'update-001-eduarda-gala-seated': {
      id: 'update-001-eduarda-gala-seated',
      relativePath: 'updates/001/photos/eduarda-gala-seated.webp',
      alt: 'Mulher ruiva sentada no chão, usando vestido preto, meia-calça e sapatos pretos.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
      ],
    },
    'the-news-avatar': {
      id: 'the-news-avatar',
      relativePath: 'updates/001/avatars/the-news.webp',
      alt: 'Logotipo circular azul-escuro com as palavras The News em branco.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/001.JPG',
      ],
    },
    'bebel-avatar': {
      id: 'bebel-avatar',
      relativePath: 'updates/001/avatars/bebel.webp',
      alt: 'Retrato de uma mulher de cabelos escuros presos, olhando para a câmera.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
      ],
    },
    'jules-avatar': {
      id: 'jules-avatar',
      relativePath: 'updates/001/avatars/jules.webp',
      alt: 'Retrato de uma mulher de cabelos castanhos soltos e roupa estampada, com a cabeça inclinada.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.1.JPG',
      ],
    },
    'lottie-avatar': {
      id: 'lottie-avatar',
      relativePath: 'updates/001/avatars/lottie.webp',
      alt: 'Selfie no espelho de uma mulher ruiva com roupa preta segurando um celular.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
      ],
    },
    'juridico-lorena-ferette-avatar': {
      id: 'juridico-lorena-ferette-avatar',
      relativePath: 'updates/001/avatars/juridico-lorena-ferette.webp',
      alt: 'Selfie no espelho de uma mulher ruiva com camisa jeans segurando um celular.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/002.2.JPG',
      ],
    },
    'leleo-avatar': {
      id: 'leleo-avatar',
      relativePath: 'updates/001/avatars/leleo.webp',
      alt: 'Retrato de um homem dentro de um carro, com o rosto iluminado pelo sol.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.1.JPG',
      ],
    },
    'paulinho-social-avatar': {
      id: 'paulinho-social-avatar',
      relativePath: 'updates/001/avatars/paulinho.webp',
      alt: 'Retrato de um homem de barba e boné preto, usando camisa listrada.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.2.JPG',
      ],
    },
    'gerlu-social-avatar': {
      id: 'gerlu-social-avatar',
      relativePath: 'updates/001/avatars/gerlu.webp',
      alt: 'Retrato de uma mulher de cabelos escuros sorrindo ao lado de um homem.',
      source: [
        'archive/Linha Tênue - Leth Medveguillen (001 - 100)/003.2.JPG',
      ],
    },
  },
};
