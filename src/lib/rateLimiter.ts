import { Redis } from "@upstash/redis";

export class RateLimiter {
  private redis: Redis;
  private rateLimit: number;
  private windowSeconds: number;

  constructor(rateLimit: number = 10, windowSeconds: number = 60) {
    this.rateLimit = rateLimit;
    this.windowSeconds = windowSeconds;
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    });
  }

  async limit(identifier: string): Promise<{ success: boolean }> {
    const key = `rate_limit:${identifier}`;

    const pipeline = this.redis.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, this.windowSeconds, "NX");

    const results = await pipeline.exec<[number, number]>();
    const requestCount = results[0] ?? 0;

    return { success: requestCount <= this.rateLimit };
  }
}
