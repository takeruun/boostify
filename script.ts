import { ZodError } from 'zod';
import { FavoriteTweetResponseSchema, NewTweetApi } from './src';

async function main() {
  try {
    const api = NewTweetApi({ cookiePath: 'cookies.json' });
    const res = await api.favoriteTweet('1818200670505476378');
    FavoriteTweetResponseSchema.parse(res);
    console.log(res);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.log('parse error', error.errors);
    }
  }
}

main();
