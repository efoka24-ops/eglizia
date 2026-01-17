export interface EventSubscription {
  id?: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  numberOfPeople?: number;
  specialRequests?: string;
  subscribedAt?: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
}
