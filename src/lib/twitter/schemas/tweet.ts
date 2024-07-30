import { FavoriteTweetResponse } from 'src/lib/twitter/types/tweet';
import { z } from 'zod';

export const FavoriteTweetResponseSchema = z.object({
  data: z.object({ favorite_tweet: z.literal('Done') }),
}) satisfies z.ZodType<FavoriteTweetResponse>;
