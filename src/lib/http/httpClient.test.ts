import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { API_ENDPOINTS } from "@/config/api-endpoints";

vi.stubEnv("API_BASE_URL", "https://api.example.test/v1");

const { HttpClient, HttpError, httpClient } =
  await import("@/lib/http/httpClient");

const fetchMock = vi.fn<typeof fetch>();

describe("httpClient", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterAll(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("uses the singleton instance", () => {
    expect(HttpClient.getInstance()).toBe(httpClient);
  });

  it("posts JSON and returns a typed response body", async () => {
    const responseBody = { accepted: true };
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(responseBody), {
        status: 201,
        headers: { "content-type": "application/json" },
      }),
    );

    const result = await httpClient.post<
      { message: string },
      typeof responseBody
    >(
      API_ENDPOINTS.contactMessages,
      { message: "Hello" },
      { headers: { "x-request-id": "unit-test" } },
    );

    expect(result).toEqual(responseBody);
    const [url, request] = fetchMock.mock.calls[0] ?? [];
    expect(url).toEqual(
      new URL(
        API_ENDPOINTS.contactMessages.replace(/^\/+/, ""),
        "https://api.example.test/v1/",
      ),
    );
    expect(request?.method).toBe("POST");
    expect(request?.body).toBe(JSON.stringify({ message: "Hello" }));

    const headers = new Headers(request?.headers);
    expect(headers.get("accept")).toBe("application/json");
    expect(headers.get("content-type")).toBe("application/json");
    expect(headers.get("x-request-id")).toBe("unit-test");
  });

  it("surfaces non-success responses as HttpError with the response body", async () => {
    const responseBody = { message: "Invalid message" };
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(responseBody), {
        status: 422,
        statusText: "Unprocessable Entity",
        headers: { "content-type": "application/json" },
      }),
    );

    const request = httpClient.post(API_ENDPOINTS.contactMessages, {
      message: "",
    });

    await expect(request).rejects.toBeInstanceOf(HttpError);
    await expect(request).rejects.toMatchObject({
      name: "HttpError",
      status: 422,
      statusText: "Unprocessable Entity",
      responseBody,
    });
  });

  it("wraps network failures with an HttpError", async () => {
    fetchMock.mockRejectedValue(new TypeError("Connection refused"));

    await expect(
      httpClient.get(API_ENDPOINTS.contactMessages),
    ).rejects.toMatchObject({
      name: "HttpError",
      status: 0,
      statusText: "Network Error",
    });
  });
});
