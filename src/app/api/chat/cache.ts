// cache.ts
import NodeCache from 'node-cache';

// Cache for storing repeated requests/results
// You can tweak the TTL (Time To Live) and check period as needed
export const localCache = new NodeCache({
  stdTTL: 60,        // default 60 seconds
  checkperiod: 120,  // check expired keys every 2 minutes
});
