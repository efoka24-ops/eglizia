export interface Event {
  id?: string;
  title: string;
  description?: string;
  event_type?: 'culte' | 'jeûne' | 'croisade' | 'séminaire' | 'retraite' | 'autre';
  start_date: string;
  end_date?: string;
  location?: string;
  image_url?: string;
  is_recurring?: boolean;
  recurrence_pattern?: 'hebdomadaire' | 'mensuel' | 'annuel';
  created_at?: string;
  updated_at?: string;
}

export type EventType = 'culte' | 'jeûne' | 'croisade' | 'séminaire' | 'retraite' | 'autre';
export type RecurrencePattern = 'hebdomadaire' | 'mensuel' | 'annuel';

export interface EventWithAttendance extends Event {
  attendance?: number;
  status?: 'upcoming' | 'ongoing' | 'completed';
}
