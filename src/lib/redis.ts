import { Redis } from "@upstash/redis";

/** Vercel Redis (KV) or Upstash REST. Null when unset — file store is used. */
export function getRedis(): Redis | null {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (kvUrl && kvToken) {
    return new Redis({ url: kvUrl, token: kvToken });
  }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    return new Redis({ url: upstashUrl, token: upstashToken });
  }

  return null;
}

export function redisConfigured() {
  return Boolean(getRedis());
}
