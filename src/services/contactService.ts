import type { NewContactMessage } from "@/domain/entities/ContactMessage";
import type { IContactRepository } from "@/domain/repositories/IContactRepository";

// Facade provides a focused contact API and depends on its domain repository interface.
export class ContactService {
  constructor(private readonly contactRepository: IContactRepository) {}

  sendContactMessage(message: NewContactMessage): Promise<void> {
    return this.contactRepository.send(message);
  }
}
