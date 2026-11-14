const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requestsByClient = new Map<string, RateLimitEntry>();
let lastCleanupAt = 0;

export function checkContactRateLimit(
  clientIdentifier: string,
  now = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  if (now - lastCleanupAt >= RATE_LIMIT_WINDOW_MS) {
    for (const [identifier, entry] of requestsByClient) {
      if (entry.resetAt <= now) {
        requestsByClient.delete(identifier);
      }
    }

    lastCleanupAt = now;
  }

  const entry = requestsByClient.get(clientIdentifier);

  if (!entry || entry.resetAt <= now) {
    requestsByClient.set(clientIdentifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
