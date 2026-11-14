import { describe, expect, it } from "vitest";
import { checkContactRateLimit } from "@/lib/contact/contact-rate-limiter";

describe("checkContactRateLimit", () => {
  it("allows up to five requests per client in a fifteen-minute window", () => {
    const now = 1_000_000;

    for (let request = 0; request < 5; request += 1) {
      expect(checkContactRateLimit("five-request-client", now)).toEqual({
        allowed: true,
        retryAfterSeconds: 0,
      });
    }

    expect(checkContactRateLimit("five-request-client", now)).toMatchObject({
      allowed: false,
      retryAfterSeconds: 900,
    });
  });

  it("allows a client again after the rate-limit window expires", () => {
    const now = 2_000_000;

    for (let request = 0; request < 5; request += 1) {
      checkContactRateLimit("expiring-client", now);
    }

    expect(
      checkContactRateLimit("expiring-client", now + 15 * 60 * 1000),
    ).toEqual({ allowed: true, retryAfterSeconds: 0 });
  });
});
