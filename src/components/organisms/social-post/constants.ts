export const SocialPostC = {
  labels: {
    verified: 'Conta verificada',
    verifiedGold: 'Verificação dourada',
    private: 'Conta privada',
    replyingTo: 'Replying to',
  },
  icons: {
    verified: 'ui/social-profile/verified.png',
    private: 'ui/social-profile/lock.png',
  },
  metrics: [
    { key: 'views', label: 'Views' },
    { key: 'retweets', label: 'Retweet' },
    { key: 'quoteTweets', label: 'Quote Tweets' },
    { key: 'likes', label: 'Likes' },
    { key: 'replies', label: 'Replies' },
  ],
} as const;
