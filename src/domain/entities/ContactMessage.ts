export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

export type NewContactMessage = Pick<
  ContactMessage,
  "name" | "email" | "message"
>;
