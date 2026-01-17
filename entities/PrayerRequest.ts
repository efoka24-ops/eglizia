export interface PrayerRequest {
  id?: string;
  requester_name: string;
  requester_email?: string;
  requester_phone?: string;
  subject: string;
  details?: string;
  prayer_category?: 'santé' | 'famille' | 'travail' | 'finances' | 'spirituel' | 'autre';
  is_urgent?: boolean;
  is_private?: boolean;
  status?: 'nouvelle' | 'en_prière' | 'exaucée';
  assigned_to?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export type PrayerCategory = 'santé' | 'famille' | 'travail' | 'finances' | 'spirituel' | 'autre';
export type PrayerStatus = 'nouvelle' | 'en_prière' | 'exaucée';

export interface PrayerRequestSummary {
  total_requests: number;
  new_requests: number;
  praying_requests: number;
  answered_requests: number;
  urgent_requests: number;
}
