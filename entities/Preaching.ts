export interface Preaching {
  id?: string;
  title: string;
  preacher: string;
  description?: string;
  bible_reference?: string;
  date?: string;
  media_type?: 'video' | 'audio' | 'texte';
  media_url?: string;
  thumbnail_url?: string;
  duration?: string;
  views_count?: number;
  is_featured?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type MediaType = 'video' | 'audio' | 'texte';

export interface PreachingWithStats extends Preaching {
  likes_count?: number;
  shares_count?: number;
  comments_count?: number;
}
