export type Operation = {
  HomeTimeline: [string, string];
  HomeLatestTimeline: [string, string];
  CreateDraftTweet: [string, string];
  CreateTweet: [string, string];
  DeleteTweet: [string, string];
  FavoriteTweet: [string, string];
  UnfavoriteTweet: [string, string];
  SearchTimeline: [string, string];
  TweetDetail: [string, string];
};

const Operations: Operation = {
  HomeTimeline: ['y_uKFuMFMkuAXTSipw2KNA', 'HomeTimeline'],
  HomeLatestTimeline: ['swa5tm06UZNTKxtXsCwz8A-0ce56A', 'HomeLatestTimeline'],
  CreateDraftTweet: ['cH9HZWz_EW9gnswvA4ZRiQ', 'CreateDraftTweet'],
  CreateTweet: ['FcQ8KP1fbPXkq2AugbyXGw', 'CreateTweet'],
  DeleteTweet: ['VaenaVgh5q5ih7kvyVjgtg', 'DeleteTweet'],
  FavoriteTweet: ['lI07N6Otwv1PhnEgXILM7A', 'FavoriteTweet'],
  UnfavoriteTweet: ['ZYKSe-w7KEslx3JhSIk5LA', 'UnfavoriteTweet'],
  SearchTimeline: ['bbQx1-LgtAQiGBicdX1ECw', 'SearchTimeline'],
  TweetDetail: ['OxXXs7fqOlx3mGlIjbzfaw', 'TweetDetail'],
};

export { Operations };
