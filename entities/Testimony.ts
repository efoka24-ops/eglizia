export interface Testimony {
  id?: string;
  author_name: string;
  author_photo?: string;
  title: string;
  content: string;
  testimony_type?: 'guérison' | 'délivrance' | 'provision' | 'salut' | 'autre';
  video_url?: string;
  date?: string;
  is_approved?: boolean;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type TestimonyType = 'guérison' | 'délivrance' | 'provision' | 'salut' | 'autre';

export interface TestimonyWithEngagement extends Testimony {
  likes_count?: number;
  shares_count?: number;
  views_count?: number;
}
