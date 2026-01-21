export interface ChatMessage {
  id?: string;
  stream_id: string;
  user_name: string;
  message: string;
  timestamp?: string;
  is_pinned?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ChatMessageWithStats = ChatMessage & {
  likes_count?: number;
};
