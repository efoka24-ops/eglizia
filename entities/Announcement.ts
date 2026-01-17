export interface Announcement {
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  priority?: 'normale' | 'importante' | 'urgente';
  target_audience?: 'tous' | 'membres' | 'leaders' | 'département';
  start_date?: string;
  end_date?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type AnnouncementPriority = 'normale' | 'importante' | 'urgente';
export type TargetAudience = 'tous' | 'membres' | 'leaders' | 'département';

export interface AnnouncementWithStatus extends Announcement {
  is_active?: boolean;
  views_count?: number;
}
