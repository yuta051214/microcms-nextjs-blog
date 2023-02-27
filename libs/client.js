// クライアントの作成
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'czxul9vp3yuta',
  apiKey: process.env.API_KEY,
});
