import { env } from "../../config/env";

type HttpErrorDetails = {
  status: number;
  statusText?: string;
  responseBody?: unknown;
  cause?: unknown;
};

export class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly responseBody: unknown;

  constructor(message: string, details: HttpErrorDetails) {
    super(message, { cause: details.cause });
    this.name = "HttpError";
    this.status = details.status;
    this.statusText = details.statusText ?? "";
    this.responseBody = details.responseBody;
  }
}

type RequestOptions = Omit<RequestInit, "body" | "method">;

// Singleton ensures requests share one configured HTTP client.
export class HttpClient {
  private static instance: HttpClient | undefined;

  private constructor(private readonly baseUrl: string | undefined) {}

  static getInstance(): HttpClient {
    HttpClient.instance ??= new HttpClient(env.API_BASE_URL);
    return HttpClient.instance;
  }

  async get<TResponse>(
    path: string,
    options: RequestOptions = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(path, { ...options, method: "GET" });
  }

  async post<TBody, TResponse>(
    path: string,
    body: TBody,
    options: RequestOptions = {},
  ): Promise<TResponse> {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    return this.request<TResponse>(path, {
      ...options,
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  private async request<TResponse>(
    path: string,
    options: RequestInit,
  ): Promise<TResponse> {
    const url = this.baseUrl
      ? new URL(
          path.replace(/^\/+/, ""),
          `${this.baseUrl.replace(/\/+$/, "")}/`,
        )
      : path;
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");

    let response: Response;

    try {
      // Centralized transport keeps fetch out of repositories and services.
      response = await fetch(url, { ...options, headers });
    } catch (cause) {
      throw new HttpError("The API request could not be completed.", {
        status: 0,
        statusText: "Network Error",
        cause,
      });
    }

    let responseText: string;

    try {
      responseText = await response.text();
    } catch (cause) {
      throw new HttpError("The API response could not be read.", {
        status: response.status,
        statusText: response.statusText,
        cause,
      });
    }

    const responseBody = this.parseResponseBody(response, responseText);

    if (!response.ok) {
      throw new HttpError(
        `The API request failed with status ${response.status}.`,
        {
          status: response.status,
          statusText: response.statusText,
          responseBody,
        },
      );
    }

    return responseBody as TResponse;
  }

  private parseResponseBody(response: Response, responseText: string): unknown {
    if (!responseText) {
      return undefined;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (
      !contentType.includes("application/json") &&
      !contentType.includes("+json")
    ) {
      return responseText;
    }

    try {
      return JSON.parse(responseText) as unknown;
    } catch (cause) {
      throw new HttpError("The API returned invalid JSON.", {
        status: response.status,
        statusText: response.statusText,
        responseBody: responseText,
        cause,
      });
    }
  }
}

export const httpClient = HttpClient.getInstance();
