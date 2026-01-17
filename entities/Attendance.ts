export interface Attendance {
  id?: string;
  event_id: string;
  event_name: string;
  date: string;
  total_attendance: number;
  men_count?: number;
  women_count?: number;
  children_count?: number;
  visitors_count?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AttendanceStats {
  total_events: number;
  total_attendees: number;
  average_attendance: number;
  by_event: Record<string, number>;
}

export interface AttendanceDetail {
  date: string;
  event_name: string;
  total: number;
  breakdown: {
    men: number;
    women: number;
    children: number;
    visitors: number;
  };
  percentage_growth?: number;
}
