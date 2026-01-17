export interface Department {
  id?: string;
  name: string;
  description?: string;
  icon?: string;
  leader_name?: string;
  leader_photo?: string;
  meeting_day?: string;
  meeting_time?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type DepartmentWithMembers = Department & {
  members_count?: number;
};
