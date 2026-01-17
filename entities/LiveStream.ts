export interface LiveStream {
  id?: string;
  title: string;
  description?: string;
  youtube_url?: string;
  facebook_url?: string;
  is_live?: boolean;
  start_time?: string;
  end_time?: string;
  viewers_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LiveStreamWithStatus extends LiveStream {
  status?: 'scheduled' | 'live' | 'ended';
  duration?: number;
  chat_enabled?: boolean;
}
