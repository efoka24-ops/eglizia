export interface ContactMessage {
  id?: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
  updated_at?: string;
}
