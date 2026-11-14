import { API_ENDPOINTS } from "@/config/api-endpoints";
import type { NewContactMessage } from "@/domain/entities/ContactMessage";
import type { IContactRepository } from "@/domain/repositories/IContactRepository";
import { httpClient } from "@/lib/http/httpClient";

// Repository pattern adapts the contact API to the contact repository contract.
export class ApiContactRepository implements IContactRepository {
  async send(message: NewContactMessage): Promise<void> {
    await httpClient.post<NewContactMessage, void>(
      API_ENDPOINTS.contactMessages,
      message,
    );
  }
}
