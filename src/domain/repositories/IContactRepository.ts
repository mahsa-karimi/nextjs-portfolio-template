import type { NewContactMessage } from "@/domain/entities/ContactMessage";

// Repository contracts enable dependency inversion between services and data access.
export interface IContactRepository {
  send(message: NewContactMessage): Promise<void>;
}
